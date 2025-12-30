# Similar Game Research - Reference Projects

**Date:** 2025-12-30
**Requested by:** Boss
**Purpose:** Find popular open-source projects similar to our PvZ-style tower defense game for learning and reference.

---

## Executive Summary

Research was conducted across GitHub to find popular open-source projects that could serve as architecture and implementation references for Quiz Battle Arena. Key finding: **There are no highly-starred (100+ stars) Phaser-based PvZ clones**, but several valuable references exist across different tech stacks.

---

## Top 3 Recommendations

### Option 1: BhavyaC16/Plants-Vs-Zombies (RECOMMENDED)

| Attribute | Details |
|-----------|---------|
| **Repository** | https://github.com/BhavyaC16/Plants-Vs-Zombies |
| **Stars** | 151+ |
| **Tech Stack** | Java, JavaFX 11, FXML |
| **License** | GPL-3.0 |

**What it is:**
Complete PvZ reimplementation with 5 progressive levels, 6 plant types (Sunflower, Pea Shooter, Cherry Bomb, Walnut, Repeater, Jalapeno), and 3 zombie variants.

**Why it's valuable:**
- **Complete feature set:** Save/load, level progression, day/night modes, audio
- **Clean OOP architecture:** Singleton, Iterator, Facade patterns
- **Educational project:** Similar goal to our quiz game
- **Well-documented:** Working demo on YouTube

**What we can learn:**
- Level progression and difficulty curve design
- Save/load game state architecture
- Plant/zombie variety implementation
- UI flow for educational games

---

### Option 2: Patoke/re-plants-vs-zombies

| Attribute | Details |
|-----------|---------|
| **Repository** | https://github.com/Patoke/re-plants-vs-zombies |
| **Stars** | 152+ |
| **Tech Stack** | C++, CMake, GLFW, SexyAppFramework |
| **License** | Varies |

**What it is:**
Reverse-engineered decompilation of Plants vs Zombies GOTY Edition. Active project modernizing the 2005-era codebase.

**Why it's valuable:**
- **Authentic game logic:** Mechanics are production-tested from actual PvZ
- **Engine insights:** Shows how the original game was structured
- **Balancing reference:** Real PvZ difficulty curves and values

**What we can learn:**
- Authentic zombie AI behavior
- Wave progression timing
- Combat balance values
- How professional PvZ handled lane-based mechanics

---

### Option 3: rupertgermann/tower-defence (Phaser 3)

| Attribute | Details |
|-----------|---------|
| **Repository** | https://github.com/rupertgermann/tower-defence |
| **Stars** | Low (but same tech stack) |
| **Tech Stack** | Phaser 3.88.2, JavaScript ES6, Webpack |
| **License** | MIT |

**What it is:**
Modern tower defense with 6 tower types, 9 enemy types (including healers, shields, bosses), wave progression, and gold economy.

**Why it's valuable:**
- **Same tech stack:** Phaser 3 + JavaScript + Webpack (matches our project)
- **Feature-rich:** Tower variety, upgrades, enemy archetypes
- **Config-driven:** Extensible architecture (aligns with our subject-agnostic approach)
- **Modern patterns:** Recent Phaser version, ES6 modules

**What we can learn:**
- Phaser 3 tower placement patterns
- Enemy variety implementation
- Economy/gold system design
- Config-driven game design

---

## Additional References

### Phaser Framework Examples
- **Repository:** https://github.com/phaserjs/phaser (37,800+ stars)
- **Examples:** https://phaser.io/examples
- **Use for:** Specific mechanics (collisions, sprites, physics)

### LittleJS (Lightweight Engine)
- **Repository:** https://github.com/KilledByAPixel/LittleJS (1,000+ stars)
- **Use for:** Performance optimization patterns, minimal architecture

### thilo-behnke/phaser3-tower-defense
- **Repository:** https://github.com/thilo-behnke/phaser3-tower-defense
- **Tech:** Phaser 3 + TypeScript + MatterJS
- **Use for:** TypeScript patterns, physics-based projectiles

---

## Recommendation Summary

| Priority | Project | Best For |
|----------|---------|----------|
| 1st | BhavyaC16/Plants-Vs-Zombies | Complete feature set, game design |
| 2nd | Patoke/re-plants-vs-zombies | Authentic mechanics, balance values |
| 3rd | rupertgermann/tower-defence | Same tech stack (Phaser 3) |

---

## Action Items

1. **TL:** Review Option 3 (rupertgermann/tower-defence) for Phaser 3 patterns
2. **GD:** Review Options 1 & 2 for game design, balance, progression
3. **Team Discussion:** Select best practices to adopt

---

## Sources

1. [BhavyaC16/Plants-Vs-Zombies](https://github.com/BhavyaC16/Plants-Vs-Zombies)
2. [Patoke/re-plants-vs-zombies](https://github.com/Patoke/re-plants-vs-zombies)
3. [rupertgermann/tower-defence](https://github.com/rupertgermann/tower-defence)
4. [phaserjs/phaser](https://github.com/phaserjs/phaser)
5. [KilledByAPixel/LittleJS](https://github.com/KilledByAPixel/LittleJS)
6. [thilo-behnke/phaser3-tower-defense](https://github.com/thilo-behnke/phaser3-tower-defense)
7. [GitHub Tower Defense Topic](https://github.com/topics/tower-defense?l=javascript)
8. [GitHub Plants vs Zombies Topic](https://github.com/topics/plants-vs-zombies)
