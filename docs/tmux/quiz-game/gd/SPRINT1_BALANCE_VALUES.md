# Sprint 1 - Game Balance Values
## GD Research Results - 2025-12-30

### Research Sources
- [PvZ Wiki - Peashooter Stats](https://plantsvszombies.wiki.gg/wiki/Peashooter_(PvZ))
- [PvZ Strategy Wiki - Plant Stats](https://pvzstrategy.fandom.com/wiki/Plant_Stats)
- [PvZ Strategy Wiki - Zombie Stats](https://pvzstrategy.fandom.com/wiki/Zombie_Stats)
- [GDC 2012 - George Fan Talk](https://www.gdcvault.com/play/1015541/How-I-Got-My-Mom)

---

## Original PvZ Reference Values

| Stat | Original PvZ Value |
|------|-------------------|
| Peashooter fire rate | 1 pea / 1.425 seconds |
| Pea damage | 20 HP |
| Basic zombie HP | ~200 HP (10 peas to kill) |
| Zombie walk speed | ~4.7 sec/tile |
| Zombie DPS | 100 (eats plant in 3 sec) |
| Conehead HP | 2.5x basic zombie |
| Buckethead HP | 5x basic zombie |

---

## Recommended M1 Values (Simplified)

For our 3-lane prototype, I recommend **simplified integer values** that are easy to tune:

### Core Unit: 1 Pea = 1 Damage

| Parameter | Value | Rationale |
|-----------|-------|-----------|
| **Pea Damage** | 1 | Simple base unit |
| **Basic Zombie HP** | 10 | Dies in 10 shots (satisfying) |
| **Peashooter Fire Rate** | 1 pea / 1.5 sec | Matches PvZ feel |
| **Zombie Walk Speed** | 5 sec / tile | Slow enough to react |
| **Zombie Attack DPS** | 1 HP / 0.5 sec | Eats plant in 3 sec (6 HP) |
| **Plant HP** | 6 | Standard plant durability |

### Calculated Time-to-Kill

- **1 Peashooter vs 1 Basic Zombie**: 10 peas × 1.5 sec = **15 seconds**
- If zombie walks 9 tiles to reach house: 9 × 5 sec = **45 seconds**
- Player has ~30 seconds to kill zombie after it enters lane

### Spawn Rate Recommendations

| Wave | Zombies/Lane | Spawn Interval | Total Zombies |
|------|--------------|----------------|---------------|
| Wave 1 | 1 per lane | 8 sec apart | 3 |
| Wave 2 | 2 per lane | 6 sec apart | 6 |
| Wave 3 | 3 per lane | 4 sec apart | 9 |

**Total M1 Demo**: 3 waves, 18 zombies, ~2 minute game

---

## Game Feel Principles (from George Fan GDC Talk)

1. **Immediate feedback** - Pea hits should feel impactful
2. **Clear cause-effect** - Zombie dies = visible death animation
3. **Player agency** - Always feel in control, not luck-based
4. **Gradual ramp** - Wave 1 is easy, Wave 3 is challenging

### What Makes PvZ "Feel Good"

1. **Satisfying destruction** - Zombies explode/collapse on death
2. **Audio feedback** - Distinct sounds for hit, kill, danger
3. **Visual clarity** - Easy to see zombie HP (optional health bars)
4. **Predictability** - Zombies walk in straight lines, no surprises
5. **Fair challenge** - If you lose, you know why

---

## M1 Difficulty Curve

For **3 lanes** and **3 waves**:

```
Wave 1: EASY
- 1 zombie per lane, staggered entry
- Player learns mechanics
- Should win easily with 1 plant per lane

Wave 2: MEDIUM
- 2 zombies per lane, faster spawns
- May need 2 plants per lane
- Some lanes might get stressed

Wave 3: HARD
- 3 zombies per lane, fastest spawns
- Requires good plant placement
- Possible to lose if not prepared
```

**Target**: 70-80% win rate for first-time players

---

## Summary: Recommended Values for DEV

```javascript
// Game Balance Constants
const BALANCE = {
  // Damage System
  PEA_DAMAGE: 1,
  PLANT_HP: 6,

  // Zombie Types
  ZOMBIE_BASIC: {
    hp: 10,
    speed: 5,        // seconds per tile
    attackDps: 2     // damage per second
  },

  // Peashooter
  PEASHOOTER: {
    fireRate: 1.5,   // seconds between shots
    cost: 100        // sun cost (M2)
  },

  // Spawn System
  SPAWN: {
    wave1Interval: 8,  // seconds between spawns
    wave2Interval: 6,
    wave3Interval: 4
  },

  // Grid
  GRID: {
    lanes: 3,
    columns: 9       // tiles from left to right
  }
};
```

---

## Open Questions for TL/DEV

1. **Zombie death animation** - Fade out or ragdoll physics?
2. **Pea projectile speed** - Instant hit or visible travel time?
3. **Collision detection** - First zombie in lane or any zombie?

---

**GD Status**: Research complete. Values ready for implementation.
