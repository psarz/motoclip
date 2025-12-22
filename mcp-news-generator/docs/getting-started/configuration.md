# Configuration

Configure the MCP News Generator for your specific setup.

## Environment Variables

The server supports the following environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `AUTOCLIP_PATH` | Path to autoclip project | Auto-detected |
| `VIDEOS_PATH` | Path to videos directory | `{AUTOCLIP_PATH}/videos` |
| `SCRIPT_JS_PATH` | Path to script.js | `{AUTOCLIP_PATH}/script.js` |

### Setting Environment Variables

=== "Windows (PowerShell)"
    ```powershell
    $env:AUTOCLIP_PATH = "C:\path\to\autoclip"
    ```

=== "macOS/Linux"
    ```bash
    export AUTOCLIP_PATH="/path/to/autoclip"
    ```

## Client Configuration

### VS Code Setup

Configure in `.vscode/mcp.json`:

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

**Important**: Update the `--directory` path to match your installation location.

### Claude Desktop Setup

Configure in `claude_desktop_config.json`:

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

## News Sources

The server is pre-configured with these RSS feeds:

```python
NEWS_SOURCES = {
    "motorcyclenews": "https://www.motorcyclenews.com/feed/",
    "cycleworld": "https://www.cycleworld.com/rss/",
    "rideapart": "https://www.rideapart.com/rss/",
    "revzilla": "https://www.revzilla.com/common-tread/feed",
}
```

### Adding Custom News Sources

Edit `src/mcp_news_generator/server.py`:

```python
NEWS_SOURCES = {
    # ... existing sources ...
    "your_source": "https://example.com/feed/",
}
```

## Video Generation Settings

### Default Settings

- **Duration**: 3 seconds
- **Resolution**: 1920x1080 (Full HD)
- **FPS**: 24
- **Codec**: libx264
- **Background Color**: #1a1a1a

### Customizing Video Generation

Modify parameters when calling `generate_news_video`:

```
Generate a video with:
- Title: "Your Title"
- Description: "Your description"
- Category: racing
- Background color: #2a2a2a
```

## Supported Video Categories

Configure your videos with these categories:

- `electric` - Electric motorcycles
- `racing` - Racing content
- `luxury` - Premium bikes
- `tech` - Technology news
- `classic` - Vintage bikes
- `industry` - Market news

## Path Configuration

### Auto-Detection

The server automatically detects paths relative to its location:

```python
AUTOCLIP_PATH = Path(__file__).parent.parent.parent.parent
VIDEOS_PATH = AUTOCLIP_PATH / "videos"
SCRIPT_JS_PATH = AUTOCLIP_PATH / "script.js"
```

### Manual Path Configuration

For custom locations, edit the path constants in `server.py`:

```python
AUTOCLIP_PATH = Path("C:/your/custom/path")
VIDEOS_PATH = AUTOCLIP_PATH / "custom_videos"
SCRIPT_JS_PATH = AUTOCLIP_PATH / "custom_script.js"
```

## Logging Configuration

The server uses Python's logging module. Configure verbosity:

```python
logging.basicConfig(level=logging.INFO)  # INFO, DEBUG, WARNING, ERROR
```

## Performance Tuning

### HTTP Timeouts

Adjust fetch timeout for slow connections:

```python
response = await client.get(feed_url, timeout=30.0)  # Default: 10.0
```

### News Fetch Limits

Control how many items to fetch per source:

```python
for entry in feed.entries[:limit]:  # Default: 10
```

## Troubleshooting

### Path Issues

If paths aren't detected correctly, set them explicitly:

```powershell
$env:AUTOCLIP_PATH = "C:\Users\bhanupratapsingh.bh\github-repos\autoclip"
```

### Permission Errors

Ensure the videos directory is writable:

```bash
chmod 755 videos/  # macOS/Linux
```

## Next Steps

- [Quick Start Guide](quickstart.md) - Start using the server
- [Tools Overview](../guide/tools.md) - Learn about available tools
