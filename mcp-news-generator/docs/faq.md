# Frequently Asked Questions

## General Questions

### What is MCP?

MCP (Model Context Protocol) is an open standard that enables AI applications to connect to external data sources and tools. It allows language models to interact with your systems through a standardized interface.

### What does this server do?

The MCP News Generator fetches the latest motorcycle news from RSS feeds, generates 3-second video clips with text overlays, and updates your autoclip project's news tiles automatically.

### Do I need an API key?

No! All news sources are publicly available RSS feeds that don't require authentication.

## Installation & Setup

### What Python version do I need?

Python 3.10 or higher is required.

### Do I need to install dependencies manually?

No, `uv pip install -e ".[dev]"` installs all required dependencies automatically.

### Can I use this without VS Code or Claude?

Yes! The server communicates via stdio and can work with any MCP-compatible client.

### Where should I install the server?

Install it inside your autoclip project directory as `mcp-news-generator/` for automatic path detection.

## Usage Questions

### How many news sources are supported?

Four sources by default:
- Motorcycle News
- Cycle World
- RideApart  
- RevZilla Common Tread

You can add more by editing the `NEWS_SOURCES` dictionary in `server.py`.

### How long are the generated videos?

All videos are exactly 3 seconds long by default.

### What video format is used?

MP4 format with H.264 codec, 1920x1080 resolution at 24 FPS.

### Can I customize video styling?

Yes! You can customize:
- Background color
- Text content
- Category
- Font sizes (by editing the code)

### How does the "append" vs "replace" mode work?

- **Append**: Adds new videos to the existing list
- **Replace**: Removes all existing videos and adds only the new ones

### Will my existing videos be overwritten?

No! Videos are saved with unique timestamps in their filenames.

## Troubleshooting

### "Module not found" error

Activate your virtual environment:

```bash
# Windows
.venv\Scripts\activate

# macOS/Linux
source .venv/bin/activate
```

### Videos aren't being created

Check that:
1. The `videos/` directory exists
2. You have write permissions
3. There's sufficient disk space
4. moviepy dependencies are installed

### script.js isn't updating

Verify:
1. The path to script.js is correct
2. You have write permissions
3. The file contains a `videosData` array

### News fetch returns no results

This could be due to:
1. Network connectivity issues
2. RSS feed changes or downtime
3. Timeout (try increasing timeout value)

### "Permission denied" error

Run with appropriate permissions or check:
- File ownership
- Directory permissions
- Antivirus/security software blocking access

## Performance

### How fast is news fetching?

Fetching 10 items from all sources typically takes 2-5 seconds depending on network speed.

### How long does video generation take?

Each 3-second video takes approximately 3-5 seconds to generate.

### Can I fetch news from multiple sources simultaneously?

Yes! Using `source: "all"` fetches from all sources in parallel.

### Is there a limit on video file size?

No built-in limit, but each 3-second 1080p video is approximately 500KB-1MB.

## Integration

### Can I use this with other projects?

Yes! Just update the path constants to point to your project's structure.

### Does it work with other MCP clients?

Yes! Any MCP-compatible client can use this server.

### Can I host this remotely?

Currently configured for stdio (local) transport. For remote hosting, you'd need to implement SSE or HTTP transport.

### Can I add my own news sources?

Yes! Edit the `NEWS_SOURCES` dictionary in `server.py`:

```python
NEWS_SOURCES = {
    "your_source": "https://example.com/feed/",
}
```

## Development

### How can I contribute?

See the [Contributing Guide](development/contributing.md) for guidelines.

### Where can I report bugs?

Open an issue on the GitHub repository with:
- Description of the issue
- Steps to reproduce
- Error messages
- Environment details

### Can I modify the video generation?

Yes! The video generation code is in the `generate_news_video` function. You can customize:
- Dimensions
- Duration
- Text styling
- Animations
- Transitions

### How do I add new tools?

1. Define the tool in `list_tools()`
2. Implement the handler in `call_tool()`
3. Add documentation
4. Update tests

## Documentation

### How do I build the documentation?

```bash
uv pip install -e ".[docs]"
mkdocs serve
```

Then visit http://localhost:8000

### Can I contribute to the docs?

Yes! Documentation files are in the `docs/` directory as Markdown files.

### Where is the API reference?

See [API Reference](api/server.md) for detailed technical documentation.

## Still Have Questions?

- Check the [User Guide](guide/tools.md) for detailed information
- Review the [Architecture](development/architecture.md) documentation
- Open an issue on GitHub
- Join community discussions
