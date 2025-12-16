# MCP Servers for Game Graphic Resources - Research Report

**Research Date**: 2025-12-17
**Researcher**: FE (Frontend Developer)
**Purpose**: Identify MCP servers for obtaining sprites, images, and visual assets for Quiz Battle Arena game

---

## Executive Summary

The MCP ecosystem offers **6,970+ servers** with multiple options for game asset generation and management. Key finding: **Game Asset Generator MCP Server** is purpose-built for game development and recommended as the primary solution.

---

## Recommended MCP Servers

### 🎮 1. Game Asset Generator MCP Server (RECOMMENDED)

**Best for**: Game sprites, robots, targets, pixel art

**Repository**: https://github.com/MubarakHAlketbi/game-asset-mcp

**Features**:
- Creates 2D pixel art and sprites using Hugging Face's Flux-2D-Game-Assets-LoRA model
- Generates 3D models in OBJ and GLB formats
- Direct integration with Claude Code
- Subject-agnostic visuals suitable for educational games

**Installation for Claude Code CLI**:

```bash
# Step 1: Clone and setup the server
git clone https://github.com/MubarakHAlketbi/game-asset-mcp
cd game-asset-mcp
npm install

# Step 2: Get your Hugging Face API token from https://huggingface.co/settings/tokens

# Step 3: Add to Claude Code (replace with actual path and token)
# Method A: Using CLI command
claude mcp add --transport stdio game-asset-generator \
  --env HUGGING_FACE_API_KEY=your_hf_token_here \
  -- node /absolute/path/to/game-asset-mcp/src/index.js

# Method B: Edit ~/.claude.json directly and add:
# {
#   "mcpServers": {
#     "game-asset-generator": {
#       "type": "stdio",
#       "command": "node",
#       "args": ["/absolute/path/to/game-asset-mcp/src/index.js"],
#       "env": {
#         "HUGGING_FACE_API_KEY": "your_hf_token_here"
#       }
#     }
#   }
# }

# Step 4: Verify installation
claude mcp list
```

**Cost**: Free (MIT License) - minimal Hugging Face API usage costs
**Licensing**: Check Hugging Face model terms for AI-generated assets

---

### 📸 2. Stock Images MCP Server

**Best for**: Backgrounds, UI elements, general imagery

**Repository**: https://github.com/Zulelee/stock-images-mcp

**Features**:
- Unified access to Unsplash, Pexels, and Pixabay
- Search and download stock photos
- Free for commercial/educational use

**Installation for Claude Code CLI**:

```bash
# Step 1: Get API keys (all free)
# - Unsplash: https://unsplash.com/developers
# - Pexels: https://www.pexels.com/api/
# - Pixabay: https://pixabay.com/api/docs/

# Step 2: Add to Claude Code
# Method A: Using CLI command
claude mcp add --transport stdio stock-images \
  --env UNSPLASH_API_KEY=your_unsplash_key \
  --env PEXELS_API_KEY=your_pexels_key \
  --env PIXABAY_API_KEY=your_pixabay_key \
  -- uvx git+https://github.com/Zulelee/stock-images-mcp

# Method B: Edit ~/.claude.json directly and add:
# {
#   "mcpServers": {
#     "stock-images": {
#       "type": "stdio",
#       "command": "uvx",
#       "args": ["git+https://github.com/Zulelee/stock-images-mcp"],
#       "env": {
#         "UNSPLASH_API_KEY": "your_unsplash_key",
#         "PEXELS_API_KEY": "your_pexels_key",
#         "PIXABAY_API_KEY": "your_pixabay_key"
#       }
#     }
#   }
# }

# Step 3: Verify installation
claude mcp list
```

**Cost**: Free (API keys required)
**Licensing**:
- Unsplash: Free commercial use, attribution appreciated
- Pexels: Free commercial use, no attribution required
- Pixabay: Free with some restrictions

---

### 🎨 3. Pixel Plugin for Claude Code

**Best for**: Professional pixel art with animation

**Repository**: https://github.com/willibrandon/pixel-plugin

**Features**:
- 40+ tools for pixel art operations
- Aseprite integration
- Animation support with retro palettes
- Game engine export

**Best Use Case**: High-quality pixel art workflows when professional animation is required

---

### 🖼️ 4. AI Image Generation MCP Servers

**Options**:

#### DALL-E MCP Server
- **Repository**: https://www.pulsemcp.com/servers/sammyl720-dall-e-image-generator
- **Cost**: $0.04 per 1024x1024 image (DALL-E 3)
- **Pros**: High quality, reliable
- **Cons**: More expensive

#### Stable Diffusion MCP Servers
- **mcp-server-stability-ai**: https://github.com/tadasant/mcp-server-stability-ai
- **Cost**:
  - **Free**: Run locally on your hardware (requires GPU)
  - **API**: $0.03 per image (10x cheaper than DALL-E)
- **Pros**: Budget-friendly, can run offline
- **Cons**: Local setup requires technical knowledge and GPU

#### Multi-Provider Options
- **CometAPI**: Access to Midjourney, Flux, Kling (https://mcp.so)
- **Freepik MCP**: Image generation via Freepik API

---

## Image Manipulation MCP Servers

### MCP-Images
- **Repository**: https://github.com/IA-Programming/mcp-images
- **Features**: Enterprise-grade image processing (resize, crop, compress)

### Imagician MCP Server
- **Site**: https://www.scriptbyai.com/imagician-mcp/
- **Features**: Image operations with natural language commands

### Image Toolkit MCP
- **Site**: https://www.magicslides.app/mcps/kira-pgr-image-toolkit
- **Features**: Dimension retrieval, TinyPNG compression

---

## Installation & Discovery

### MCP Registry

- **Official Registry**: https://registry.modelcontextprotocol.io
- **6,970+ servers** available
- **API Access**: Programmatic discovery via REST endpoints

### Claude Code Installation Commands

**Method 1: CLI Commands** (Quick setup)

```bash
# List installed servers
claude mcp list

# Add HTTP server
claude mcp add --transport http <name> <url>
claude mcp add --transport http secure-api https://api.example.com/mcp \
  --header "Authorization: Bearer your-token"

# Add SSE server
claude mcp add --transport sse <name> <url>

# Add Stdio server (local tools like npx packages)
claude mcp add --transport stdio <name> [args...]
claude mcp add --transport stdio game-assets --env HUGGING_FACE_API_KEY=your_key \
  -- npx -y @modelcontextprotocol/server-game-assets

# Remove a server
claude mcp remove [name]

# Test a server
claude mcp get [name]

# Verify servers
/mcp
```

**Method 2: Direct JSON Editing** (Recommended for complex configs)

Edit `~/.claude.json` directly for full control and visibility.

### ~/.claude.json File Structure

The `~/.claude.json` file in your home directory contains all Claude Code CLI configuration:

```json
{
  "numStartups": 34,
  "autoUpdaterStatus": "enabled",
  "theme": "dark-daltonized",
  "mcpServers": {
    "game-asset-generator": {
      "type": "stdio",
      "command": "node",
      "args": ["/full/path/to/game-asset-mcp/src/index.js"],
      "env": {
        "HUGGING_FACE_API_KEY": "your-api-key-here"
      }
    },
    "stock-images": {
      "type": "stdio",
      "command": "uvx",
      "args": ["git+https://github.com/Zulelee/stock-images-mcp"],
      "env": {
        "UNSPLASH_API_KEY": "${UNSPLASH_API_KEY}",
        "PEXELS_API_KEY": "${PEXELS_API_KEY}",
        "PIXABAY_API_KEY": "${PIXABAY_API_KEY}"
      }
    },
    "stability-ai": {
      "type": "http",
      "url": "https://api.stability.ai/v1/mcp",
      "headers": {
        "Authorization": "Bearer ${STABILITY_API_KEY}"
      }
    }
  },
  "projects": {}
}
```

**Supported Server Types**:
- **stdio**: Local executables (npx, node, python scripts)
- **http**: HTTP-based remote servers
- **sse**: Server-Sent Events servers

**Environment Variable Expansion**:
- `${VAR}` - Expands to environment variable value
- `${VAR:-default}` - Uses default if VAR not set
- Works in: `command`, `args`, `env`, `url`, `headers`

### Configuration Locations for Claude Code CLI

**IMPORTANT**: This project uses **Claude Code CLI** (terminal/command-line), NOT Claude Desktop (GUI app). Configuration paths are different:

**Claude Code CLI Configuration Files**:
- **User scope** (recommended, cross-project): `~/.claude.json`
- **Project scope** (team-shared, version-controlled): `.mcp.json` (at project root)
- **Local scope** (project-specific, private): `.claude/settings.local.json`

**Claude Desktop Configuration** (NOT applicable to this project):
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

**For this project, use**: `~/.claude.json` for user-scoped MCP servers

---

## Recommendations for Quiz Battle Arena

### Setup Strategy

1. **Primary Asset Source**: Install **Game Asset Generator MCP Server**
   - Generate robots, targets, enemy sprites
   - Create subject-agnostic game elements
   - 2D pixel art style fits educational game aesthetic

2. **Background & UI**: Install **Stock Images MCP Server**
   - Unsplash for abstract backgrounds
   - Pexels for UI element inspiration
   - Free licensing for educational use

3. **Optional Enhancement**: **Stable Diffusion API** (if budget allows)
   - Generate custom themed backgrounds
   - Create power-up icons
   - Cost: ~$3 for 100 high-quality images

### Cost Analysis

| Option | Setup Cost | Per-Asset Cost | Best For |
|--------|------------|----------------|----------|
| Game Asset Generator | Free | ~$0.001 (HuggingFace) | Sprites, robots, targets |
| Stock Images MCP | Free | Free | Backgrounds, UI |
| Local Stable Diffusion | Free | Free | Full control, offline |
| Stability AI API | Free | $0.03/image | High-quality custom assets |
| DALL-E 3 | Free | $0.04/image | Premium quality |

**Estimated Total**: $0-10 for complete asset set (100-200 assets)

---

## Subject-Agnostic Considerations

✅ **Compatible with Subject-Agnostic Design**:
- Game Asset Generator creates generic robots/shapes (not subject-specific)
- Stock photos offer abstract patterns and backgrounds
- AI generation allows prompts like "abstract robot character" or "geometric target"

❌ **Avoid**:
- Subject-specific imagery (pyramids for history, equations for math)
- Culturally-specific characters or symbols
- Text-heavy assets (questions.json handles all text)

---

## Licensing Summary

| Source | Commercial Use | Attribution | Notes |
|--------|----------------|-------------|-------|
| Game Asset Generator | ✅ | Check model terms | AI-generated, Hugging Face license |
| Unsplash | ✅ | Appreciated | Free commercial use |
| Pexels | ✅ | Not required | Free commercial use |
| Pixabay | ✅ | Not required | Some restrictions apply |
| Stable Diffusion (local) | ✅ | Not required | Open-source model |
| DALL-E 3 | ✅ | OpenAI owns | Check OpenAI terms |

---

## Next Steps

1. **Install Game Asset Generator MCP Server** (primary asset source)
2. **Install Stock Images MCP Server** (backgrounds and UI)
3. **Test asset generation** with prompts like:
   - "pixel art robot character for educational game"
   - "abstract geometric target with bright colors"
   - "colorful explosion effect sprite sheet"
4. **Verify subject-agnostic design** (no history/math-specific imagery)
5. **Document asset workflow** in development process

---

## Additional Resources

- **MCP Official Documentation**: https://docs.anthropic.com/en/docs/agents-and-tools/mcp
- **MCP Registry**: https://registry.modelcontextprotocol.io
- **Anthropic MCP Course**: https://anthropic.skilljar.com/introduction-to-model-context-protocol
- **Awesome MCP Servers**: https://github.com/wong2/awesome-mcp-servers
- **Official MCP Servers**: https://github.com/modelcontextprotocol/servers

---

## Research Sources

1. [Model Context Protocol Documentation](https://docs.anthropic.com/en/docs/agents-and-tools/mcp)
2. [Game Asset Generator MCP Server](https://github.com/MubarakHAlketbi/game-asset-mcp)
3. [Stock Images MCP Server](https://github.com/Zulelee/stock-images-mcp)
4. [MCP Registry](https://registry.modelcontextprotocol.io)
5. [PulseMCP Server Directory](https://www.pulsemcp.com/servers)
6. [Pixel Plugin Repository](https://github.com/willibrandon/pixel-plugin)
7. [Stability AI MCP Server](https://github.com/tadasant/mcp-server-stability-ai)
8. [Claude Code MCP Setup Guide](https://docs.claude.com/en/docs/claude-code/mcp)
9. [Official MCP Course](https://anthropic.skilljar.com/introduction-to-model-context-protocol)
10. [Awesome MCP Servers](https://github.com/wong2/awesome-mcp-servers)

---

**Report Prepared By**: FE (Frontend Developer)
**For**: Quiz Game Team - Sprint Planning
**Status**: ✅ Research Complete - Ready for PM review and implementation decision
