# MCP News Generator Server

An MCP (Model Context Protocol) server that fetches the latest motorcycle news and generates 3-second video clips to update your autoclip project's news tiles.

## Features

- **Fetch Motorcycle News**: Aggregates latest news from multiple RSS feeds including Motorcycle News, Cycle World, RideApart, and RevZilla
- **Generate Video Clips**: Creates 3-second video clips with text overlays from news content
- **Update News Tiles**: Automatically updates the autoclip project's script.js with new video entries
- **List Current Videos**: View all currently configured videos in your project

## Installation

### Prerequisites

- Python 3.10 or higher
- uv (Python package manager)

### Setup

1. Install the server and its dependencies:

```bash
cd mcp-news-generator
uv venv
uv pip install -e ".[dev]"
```

2. Activate the virtual environment:

```bash
# On Windows
.venv\Scripts\activate

# On macOS/Linux
source .venv/bin/activate
```

## Usage

### Running the Server

The server runs using stdio transport:

```bash
uv run python src/mcp_news_generator/server.py
```

### Configuring with Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "news-generator": {
      "command": "uv",
      "args": [
        "--directory",
        "C:\\Users\\bhanupratapsingh.bh\\github-repos\\autoclip\\mcp-news-generator",
        "run",
        "python",
        "src/mcp_news_generator/server.py"
      ]
    }
  }
}
```

### Configuring with VS Code

Create or update `.vscode/mcp.json` in the autoclip directory:

```json
{
  "servers": {
    "news-generator": {
      "type": "stdio",
      "command": "uv",
      "args": [
        "--directory",
        "C:\\Users\\bhanupratapsingh.bh\\github-repos\\autoclip\\mcp-news-generator",
        "run",
        "python",
        "src/mcp_news_generator/server.py"
      ]
    }
  }
}
```

## Available Tools

### 1. fetch_motorcycle_news

Fetches the latest motorcycle news from various RSS feeds.

**Parameters:**
- `source` (string): News source to fetch from ('motorcyclenews', 'cycleworld', 'rideapart', 'revzilla', or 'all')
- `limit` (integer): Maximum number of news items to fetch (default: 10)

**Example:**
```
Fetch the latest 5 news items from all sources
```

### 2. generate_news_video

Generates a 3-second video clip with text overlay.

**Parameters:**
- `title` (string, required): Video title/headline
- `description` (string, required): Brief description
- `category` (string, required): One of: electric, racing, luxury, tech, classic, industry
- `background_color` (string): Hex color code (default: #1a1a1a)

**Example:**
```
Generate a video with title "BMW R 1300 GS Launch" and description "New flagship adventure bike unveiled"
```

### 3. update_news_tiles

Updates the autoclip script.js with new video entries.

**Parameters:**
- `videos` (array, required): Array of video objects with title, description, category, videoUrl, date
- `mode` (string): 'append' to add new videos or 'replace' to replace all (default: append)

**Example:**
```
Update news tiles with the generated videos in append mode
```

### 4. list_current_videos

Lists all currently configured videos in the autoclip project.

**Example:**
```
Show me all current videos
```

## Workflow Example

Here's a typical workflow using the MCP server with an AI assistant:

1. **Fetch latest news:**
   ```
   "Fetch the latest 10 motorcycle news from all sources"
   ```

2. **Generate videos for interesting news:**
   ```
   "Generate a video for the BMW R 1300 GS story with category 'racing'"
   ```

3. **Update the tiles:**
   ```
   "Update the news tiles with the newly generated video"
   ```

4. **Verify the update:**
   ```
   "List the current videos to confirm the update"
   ```

## Development

### Running Tests

```bash
uv run pytest
```

### Code Formatting

```bash
uv run black src/
uv run ruff check src/
```

## Architecture

The server is built using:
- **MCP SDK**: For implementing the Model Context Protocol
- **httpx**: For async HTTP requests to RSS feeds
- **feedparser**: For parsing RSS/Atom feeds
- **moviepy**: For video generation
- **Pillow**: For image processing

## Troubleshooting

### Common Issues

1. **Module not found errors**: Ensure you're in the virtual environment and all dependencies are installed
2. **Path errors**: Make sure the autoclip project paths in server.py are correct
3. **Video generation fails**: Check that you have sufficient disk space and write permissions

### Logs

The server logs to stderr. Check logs for detailed error messages:

```bash
python src/mcp_news_generator/server.py 2> error.log
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
