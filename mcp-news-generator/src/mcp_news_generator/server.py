"""MCP News Generator Server

This MCP server provides tools for:
1. Fetching the latest motorcycle news from various RSS feeds
2. Generating 3-second video clips from news content
3. Updating the autoclip project's video tiles with new content
"""

import asyncio
import json
import logging
from pathlib import Path
from typing import Any

import httpx
import feedparser
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp.types import Tool, TextContent

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("mcp-news-generator")

# Initialize MCP server
app = Server("mcp-news-generator")

# Configuration
AUTOCLIP_PATH = Path(__file__).parent.parent.parent.parent
VIDEOS_PATH = AUTOCLIP_PATH / "videos"
SCRIPT_JS_PATH = AUTOCLIP_PATH / "script.js"

# News sources for motorcycles
NEWS_SOURCES = {
    "motorcyclenews": "https://www.motorcyclenews.com/feed/",
    "cycleworld": "https://www.cycleworld.com/rss/",
    "rideapart": "https://www.rideapart.com/rss/",
    "revzilla": "https://www.revzilla.com/common-tread/feed",
}


@app.list_tools()
async def list_tools() -> list[Tool]:
    """List available tools for the MCP server."""
    return [
        Tool(
            name="fetch_motorcycle_news",
            description="Fetch the latest motorcycle news from various RSS feeds",
            inputSchema={
                "type": "object",
                "properties": {
                    "source": {
                        "type": "string",
                        "description": f"News source to fetch from. Options: {', '.join(NEWS_SOURCES.keys())} or 'all'",
                        "default": "all",
                    },
                    "limit": {
                        "type": "integer",
                        "description": "Maximum number of news items to fetch",
                        "default": 10,
                    },
                },
            },
        ),
        Tool(
            name="generate_news_video",
            description="Generate a 3-second video clip from news content with text overlay",
            inputSchema={
                "type": "object",
                "properties": {
                    "title": {
                        "type": "string",
                        "description": "Title/headline for the video",
                    },
                    "description": {
                        "type": "string",
                        "description": "Brief description or summary",
                    },
                    "category": {
                        "type": "string",
                        "description": "Category: electric, racing, luxury, tech, classic, or industry",
                        "enum": ["electric", "racing", "luxury", "tech", "classic", "industry"],
                    },
                    "background_color": {
                        "type": "string",
                        "description": "Background color in hex format (e.g., #1a1a1a)",
                        "default": "#1a1a1a",
                    },
                },
                "required": ["title", "description", "category"],
            },
        ),
        Tool(
            name="update_news_tiles",
            description="Update the autoclip script.js file with new video entries",
            inputSchema={
                "type": "object",
                "properties": {
                    "videos": {
                        "type": "array",
                        "description": "Array of video objects to add to the news tiles",
                        "items": {
                            "type": "object",
                            "properties": {
                                "title": {"type": "string"},
                                "description": {"type": "string"},
                                "category": {"type": "string"},
                                "videoUrl": {"type": "string"},
                                "date": {"type": "string"},
                            },
                            "required": ["title", "description", "category", "videoUrl", "date"],
                        },
                    },
                    "mode": {
                        "type": "string",
                        "description": "Update mode: 'append' to add new videos, 'replace' to replace all videos",
                        "enum": ["append", "replace"],
                        "default": "append",
                    },
                },
                "required": ["videos"],
            },
        ),
        Tool(
            name="list_current_videos",
            description="List all current videos configured in the autoclip project",
            inputSchema={
                "type": "object",
                "properties": {},
            },
        ),
    ]


@app.call_tool()
async def call_tool(name: str, arguments: Any) -> list[TextContent]:
    """Handle tool execution requests."""
    try:
        if name == "fetch_motorcycle_news":
            return await fetch_motorcycle_news(arguments)
        elif name == "generate_news_video":
            return await generate_news_video(arguments)
        elif name == "update_news_tiles":
            return await update_news_tiles(arguments)
        elif name == "list_current_videos":
            return await list_current_videos()
        else:
            return [TextContent(type="text", text=f"Unknown tool: {name}")]
    except Exception as e:
        logger.error(f"Error executing tool {name}: {e}")
        return [TextContent(type="text", text=f"Error: {str(e)}")]


async def fetch_motorcycle_news(arguments: dict) -> list[TextContent]:
    """Fetch motorcycle news from RSS feeds."""
    source = arguments.get("source", "all")
    limit = arguments.get("limit", 10)

    all_news = []
    sources_to_fetch = NEWS_SOURCES.items() if source == "all" else [(source, NEWS_SOURCES.get(source))]

    async with httpx.AsyncClient() as client:
        for source_name, feed_url in sources_to_fetch:
            if feed_url is None:
                continue
            
            try:
                logger.info(f"Fetching from {source_name}: {feed_url}")
                response = await client.get(feed_url, timeout=10.0)
                feed = feedparser.parse(response.text)

                for entry in feed.entries[:limit]:
                    news_item = {
                        "source": source_name,
                        "title": entry.get("title", ""),
                        "description": entry.get("summary", "")[:200],
                        "link": entry.get("link", ""),
                        "published": entry.get("published", ""),
                    }
                    all_news.append(news_item)
            except Exception as e:
                logger.error(f"Error fetching from {source_name}: {e}")

    result_text = f"Fetched {len(all_news)} news items\n\n"
    result_text += json.dumps(all_news, indent=2)

    return [TextContent(type="text", text=result_text)]


async def generate_news_video(arguments: dict) -> list[TextContent]:
    """Generate a 3-second video with text overlay."""
    from moviepy.editor import ColorClip, TextClip, CompositeVideoClip
    from datetime import datetime
    import re

    title = arguments["title"]
    description = arguments["description"]
    category = arguments["category"]
    bg_color = arguments.get("background_color", "#1a1a1a")

    # Create safe filename
    safe_title = re.sub(r'[^a-z0-9]+', '_', title.lower())[:30]
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"{category}_{safe_title}_{timestamp}.mp4"
    output_path = VIDEOS_PATH / filename

    # Ensure videos directory exists
    VIDEOS_PATH.mkdir(exist_ok=True)

    try:
        # Create background clip (3 seconds)
        bg_clip = ColorClip(size=(1920, 1080), color=bg_color, duration=3)

        # Create title text
        title_txt = TextClip(
            title[:50],
            fontsize=70,
            color='white',
            font='Arial-Bold',
            size=(1800, None),
            method='caption'
        ).set_position(('center', 'center')).set_duration(3)

        # Create description text
        desc_txt = TextClip(
            description[:100],
            fontsize=40,
            color='white',
            font='Arial',
            size=(1800, None),
            method='caption'
        ).set_position(('center', 720)).set_duration(3)

        # Composite video
        video = CompositeVideoClip([bg_clip, title_txt, desc_txt])
        video.write_videofile(str(output_path), fps=24, codec='libx264', audio=False, verbose=False, logger=None)

        result = {
            "success": True,
            "filename": filename,
            "path": str(output_path),
            "videoUrl": f"videos/{filename}",
        }

        return [TextContent(type="text", text=json.dumps(result, indent=2))]

    except Exception as e:
        logger.error(f"Error generating video: {e}")
        return [TextContent(type="text", text=f"Error generating video: {str(e)}")]


async def update_news_tiles(arguments: dict) -> list[TextContent]:
    """Update script.js with new video entries."""
    from datetime import datetime

    videos = arguments["videos"]
    mode = arguments.get("mode", "append")

    try:
        # Read current script.js
        with open(SCRIPT_JS_PATH, 'r', encoding='utf-8') as f:
            content = f.read()

        # Find the videosData array
        start_marker = "const videosData = ["
        end_marker = "];"

        start_idx = content.find(start_marker)
        if start_idx == -1:
            return [TextContent(type="text", text="Error: Could not find videosData array in script.js")]

        start_idx += len(start_marker)
        end_idx = content.find(end_marker, start_idx)

        if mode == "replace":
            # Replace all videos
            new_videos = []
            for idx, video in enumerate(videos, start=1):
                new_videos.append({
                    "id": idx,
                    "title": video["title"],
                    "description": video["description"],
                    "category": video["category"],
                    "videoUrl": video["videoUrl"],
                    "date": video.get("date", datetime.now().strftime("%Y-%m-%d")),
                    "duration": "3s"
                })
        else:
            # Append to existing videos
            # Parse existing videos to get the last ID
            existing_data = content[start_idx:end_idx].strip()
            # Simple approach: count existing video objects
            last_id = existing_data.count('{ id:')
            
            new_videos = []
            for video in videos:
                last_id += 1
                new_videos.append({
                    "id": last_id,
                    "title": video["title"],
                    "description": video["description"],
                    "category": video["category"],
                    "videoUrl": video["videoUrl"],
                    "date": video.get("date", datetime.now().strftime("%Y-%m-%d")),
                    "duration": "3s"
                })

        # Format new entries
        new_entries = []
        for vid in new_videos:
            entry = f'''    {{ id: {vid["id"]}, title: "{vid["title"]}", description: "{vid["description"]}", category: "{vid["category"]}", videoUrl: "{vid["videoUrl"]}", date: "{vid["date"]}", duration: "{vid["duration"]}" }}'''
            new_entries.append(entry)

        if mode == "replace":
            new_content = content[:start_idx] + "\n" + ",\n".join(new_entries) + "\n" + content[end_idx:]
        else:
            # Append before the closing ]
            new_content = content[:end_idx] + ",\n" + ",\n".join(new_entries) + "\n" + content[end_idx:]

        # Write back
        with open(SCRIPT_JS_PATH, 'w', encoding='utf-8') as f:
            f.write(new_content)

        return [TextContent(type="text", text=f"Successfully {'replaced' if mode == 'replace' else 'added'} {len(new_videos)} video(s) to script.js")]

    except Exception as e:
        logger.error(f"Error updating news tiles: {e}")
        return [TextContent(type="text", text=f"Error: {str(e)}")]


async def list_current_videos() -> list[TextContent]:
    """List all current videos in the autoclip project."""
    try:
        with open(SCRIPT_JS_PATH, 'r', encoding='utf-8') as f:
            content = f.read()

        # Extract videosData array
        start_marker = "const videosData = ["
        end_marker = "];"
        
        start_idx = content.find(start_marker)
        if start_idx == -1:
            return [TextContent(type="text", text="Error: Could not find videosData array")]

        start_idx += len(start_marker)
        end_idx = content.find(end_marker, start_idx)
        
        videos_content = content[start_idx:end_idx].strip()
        video_count = videos_content.count('{ id:')

        result = f"Found {video_count} videos configured in script.js\n\nPreview:\n{videos_content[:500]}..."
        return [TextContent(type="text", text=result)]

    except Exception as e:
        return [TextContent(type="text", text=f"Error: {str(e)}")]


async def main():
    """Run the MCP server."""
    async with stdio_server() as (read_stream, write_stream):
        await app.run(read_stream, write_stream, app.create_initialization_options())


if __name__ == "__main__":
    asyncio.run(main())
