# Quick Start

Get started with MCP News Generator in minutes!

## Running the Server

Start the MCP server using:

```bash
uv run python src/mcp_news_generator/server.py
```

The server runs in stdio mode and communicates via JSON-RPC messages.

## Connecting to VS Code

The server is pre-configured for VS Code in `.vscode/mcp.json`:

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

To use with VS Code:

1. Open the autoclip project in VS Code
2. Ensure GitHub Copilot is installed and enabled
3. The MCP server will automatically connect
4. Start chatting with Copilot and use the tools!

## Connecting to Claude Desktop

Add to `claude_desktop_config.json`:

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

## Your First Workflow

### 1. Fetch News

Ask your AI assistant:

```
Fetch the latest 10 motorcycle news from all sources
```

This calls the `fetch_motorcycle_news` tool and returns the latest headlines.

### 2. Generate a Video

Pick an interesting story and generate a video:

```
Generate a video with:
- Title: "BMW R 1300 GS Unveiled"
- Description: "New flagship adventure bike with enhanced features"
- Category: racing
```

This creates a 3-second video clip in the `videos/` folder.

### 3. Update News Tiles

Add the video to your project:

```
Update the news tiles with the generated video in append mode
```

This updates `script.js` with the new video entry.

### 4. Verify the Update

```
List current videos
```

This shows all configured videos including your new one.

## Example Conversations

### Complete Workflow

```
User: Fetch the latest 5 news items from motorcyclenews