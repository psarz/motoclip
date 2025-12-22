# Installation

This guide will help you install and set up the MCP News Generator server.

## Prerequisites

Before installing, ensure you have:

- **Python 3.10 or higher** - [Download Python](https://www.python.org/downloads/)
- **uv** - Python package manager
- **Git** - For cloning the repository

## Installing uv

If you don't have `uv` installed:

=== "Windows"
    ```powershell
    powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
    ```

=== "macOS/Linux"
    ```bash
    curl -LsSf https://astral.sh/uv/install.sh | sh
    ```

After installation, restart your terminal.

## Installation Steps

### 1. Navigate to the Project Directory

```bash
cd C:\Users\bhanupratapsingh.bh\github-repos\autoclip\mcp-news-generator
```

### 2. Create Virtual Environment

```bash
uv venv
```

This creates a `.venv` directory with an isolated Python environment.

### 3. Install Dependencies

```bash
uv pip install -e ".[dev]"
```

This installs:

- Core dependencies (mcp, httpx, feedparser, moviepy, pillow)
- Development tools (pytest, black, ruff)

### 4. Verify Installation

```bash
uv run python src/mcp_news_generator/server.py --help
```

If installed correctly, the server should start without errors.

## Installing Documentation Tools

To build and serve documentation:

```bash
uv pip install -e ".[docs]"
```

This installs MkDocs and related plugins.

## Platform-Specific Notes

### Windows

- Make sure Python is added to your PATH
- Use PowerShell or Command Prompt for running commands
- File paths use backslashes: `C:\path\to\file`

### macOS/Linux

- You might need to use `python3` instead of `python`
- File paths use forward slashes: `/path/to/file`
- Some operations might require `sudo`

## Troubleshooting

### "uv: command not found"

Restart your terminal after installing uv, or add it to your PATH manually.

### "Python version not supported"

Ensure Python 3.10+ is installed:

```bash
python --version
```

### Permission Errors

Run with appropriate permissions or use a virtual environment (recommended).

## Next Steps

- [Quick Start Guide](quickstart.md) - Get started using the server
- [Configuration](configuration.md) - Configure the server for your setup
