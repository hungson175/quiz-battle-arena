# Recommended Asset Sources for Sprint 1

## Status: Ready for Download

DEV should download these assets and place them in `src/assets/sprites/`.

---

## Zombie Sprites (Priority 1)

### Option A: Urban Zombie Pack (Recommended)
- **URL**: https://free-game-assets.itch.io/free-urban-zombie-sprite-sheet-pixel-art-pack
- **Format**: PNG/PSD, spritesheet
- **Animations**: idle, walk, attack, hurt, dead
- **Size**: 882 KB
- **License**: Check page for details

### Option B: 2D Animated Zombie 32x32
- **URL**: https://tinymuse.itch.io/2d-animated-zombie
- **Format**: PNG spritesheet
- **Size**: 32x32 pixels (good for prototype)

---

## Tower/Plant Sprites (Priority 1)

### Option A: Tiny Tower Defense Assets
- **URL**: https://itch.io/game-assets/free/tag-pixel-art/tag-tower-defense
- **Content**: Complete 16-bit TD asset pack
- **Search for**: "Tiny Tower Defense Assets" by Ilustra Mundo Games

### Option B: Archer Towers Pack
- **URL**: Search itch.io for "Archer Towers Pixel Art for TD Free Pack"
- **Creator**: Free Game Assets

### Fallback: Simple colored shapes
- Create simple 64x64 green circle for Peashooter
- Create 16x16 green circle for pea projectile
- Can be replaced later with proper sprites

---

## Grass/Lawn Background (Priority 2)

### Option A: OpenGameArt Grass Tileset
- **URL**: https://opengameart.org/content/grass-tileset-16x16
- **Format**: PNG tileset
- **License**: Check OGA for details (usually CC0 or CC-BY)

### Option B: Pixel Art Grass Tileset
- **URL**: https://opengameart.org/content/pixel-art-grass-tileset
- **Format**: 112 tiles PNG
- **License**: CC-BY 4.0

### Fallback: Solid green background
- Use `backgroundColor: '#4a8f3c'` in Phaser config
- Draw grid lines programmatically

---

## Quick Start for DEV

If assets are hard to find or license is unclear, use **placeholder sprites**:

```javascript
// In GameScene create():
// Placeholder zombie - red rectangle
this.add.rectangle(x, y, 40, 60, 0xff0000);

// Placeholder plant - green circle
this.add.circle(x, y, 30, 0x00ff00);

// Placeholder pea - small green circle
this.add.circle(x, y, 8, 0x00aa00);
```

**Priority**: Get game mechanics working first. Pretty sprites can come later.

---

## File Organization

```
src/assets/
├── sprites/
│   ├── zombie.png        # Zombie spritesheet
│   ├── peashooter.png    # Plant sprite
│   └── pea.png           # Projectile
├── backgrounds/
│   └── lawn.png          # Grass tileset or solid
└── audio/
    └── (M2 - not needed for Sprint 1)
```

---

**TL Recommendation**: Start with placeholders to unblock development. Replace with real sprites when found/downloaded.
