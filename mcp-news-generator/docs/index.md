# MCP News Generator

Welcome to the MCP News Generator documentation! This MCP (Model Context Protocol) server helps you automatically fetch the latest motorcycle news and generate 3-second video clips to update your autoclip project's news tiles.

## Features

- **🔍 Fetch Motorcycle News**: Aggregates latest news from multiple RSS feeds
- **🎬 Generate Video Clips**: Creates 3-second video clips with text overlays
- **📝 Update News Tiles**: Automatically updates your project's news configuration
- **📋 List Videos**: View all currently configured videos

## Quick Links

- [Installation Guide](getting-started/installation.md) - Get started quickly
- [Tools Overview](guide/tools.md) - Learn about available tools
- [Workflows](guide/workflows.md) - Common usage patterns
- [API Reference](api/server.md) - Technical details

## News Sources

The server fetches news from:

- **Motorcycle News** - Latest industry news and reviews
- **Cycle World** - Comprehensive motorcycle coverage
- **RideApart** - Riding tips and motorcycle culture
- **RevZilla** - Gear reviews and how-to guides

## Supported Categories

Videos can be categorized as:

- `electric` - Electric motorcycle news
- `racing` - Racing and track news
- `luxury` - Premium and superbike content
- `tech` - Technology and innovation
- `classic` - Vintage and classic bikes
- `industry` - Market and business news

## Getting Started

Jump right in with our [Quick Start Guide](getting-started/quickstart.md) or check out the [Installation](getting-started/installation.md) instructions.

## Example Usage

```
1. "Fetch the latest 10 motorcycle news from all sources"
2. "Generate a video for the top BMW story with category 'racing'"
3. "Update the news tiles with the newly generated video"
```

## Architecture

The MCP News Generator is built with:

- **MCP SDK** - Model Context Protocol implementation
- **httpx** - Async HTTP client for RSS feeds
- **feedparser** - RSS/Atom feed parsing
- **moviepy** - Video generation and editing
- **Pillow** - Image processing

## Support

For issues, questions, or contributions, please visit the [GitHub repository](https://github.com/yourusername/mcp-news-generator).
