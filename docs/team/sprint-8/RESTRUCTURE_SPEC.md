# Quiz Battle Arena - Restructure Specification

**Sprint:** 8
**Authors:** TL + GD (Joint)
**Date:** 2025-12-30
**Status:** Ready for Review

---

## Executive Summary

Complete architectural restructure of Quiz Battle Arena based on analysis of reference tower defense project (rupertgermann/tower-defence). Goal: Create a maintainable, config-driven, extensible game architecture.

---

## 1. Config-Driven Architecture

### 1.1 Configuration Files

```
public/assets/config/
├── game.json          # Global game settings
├── plants.json        # Plant types and stats
├── zombies.json       # Zombie types and stats
├── waves.json         # Wave definitions
├── difficulty.json    # Difficulty multipliers
└── quiz.json          # Quiz timing settings
```

### 1.2 Example: plants.json
```json
{
  "PEASHOOTER": {
    "name": "Peashooter",
    "cost": 75,
    "hp": 10,
    "damage": 1,
    "fireRate": 1500,
    "range": 400,
    "projectileSpeed": 300,
    "description": "Shoots peas at zombies"
  },
  "WALLNUT": {
    "name": "Wall-nut",
    "cost": 50,
    "hp": 20,
    "damage": 0,
    "fireRate": 0,
    "description": "Blocks zombies with high HP"
  },
  "SUNFLOWER": {
    "name": "Sunflower",
    "cost": 50,
    "hp": 5,
    "damage": 0,
    "moneyGeneration": 25,
    "generationInterval": 10000,
    "description": "Generates money over time"
  }
}
```

### 1.3 Example: zombies.json
```json
{
  "BASIC": {
    "name": "Basic Zombie",
    "hp": 8,
    "speed": 5,
    "attackDps": 2,
    "reward": 10,
    "damage": 1
  },
  "FAST": {
    "name": "Fast Zombie",
    "hp": 4,
    "speed": 8,
    "attackDps": 1,
    "reward": 8,
    "damage": 1
  },
  "ARMORED": {
    "name": "Armored Zombie",
    "hp": 20,
    "speed": 3,
    "attackDps": 3,
    "reward": 20,
    "damage": 1,
    "armor": 0.3
  }
}
```

### 1.4 Example: waves.json
```json
{
  "waves": [
    { "enemies": ["BASIC"], "count": 2, "interval": 5000 },
    { "enemies": ["BASIC"], "count": 3, "interval": 4500 },
    { "enemies": ["BASIC", "FAST"], "count": 4, "interval": 4000 },
    { "enemies": ["BASIC", "FAST"], "count": 6, "interval": 3500 },
    { "enemies": ["BASIC", "FAST", "ARMORED"], "count": 8, "interval": 3000 }
  ],
  "pauseBetweenWaves": 5000
}
```

### 1.5 Example: difficulty.json
```json
{
  "EASY": {
    "name": "Easy",
    "zombieHealthMultiplier": 1.0,
    "zombieSpeedMultiplier": 1.0,
    "zombieCountMultiplier": 1.0,
    "moneyMultiplier": 1.2,
    "startingLives": 5
  },
  "NORMAL": {
    "name": "Normal",
    "zombieHealthMultiplier": 1.2,
    "zombieSpeedMultiplier": 1.1,
    "zombieCountMultiplier": 1.2,
    "moneyMultiplier": 1.0,
    "startingLives": 3
  },
  "HARD": {
    "name": "Hard",
    "zombieHealthMultiplier": 1.5,
    "zombieSpeedMultiplier": 1.2,
    "zombieCountMultiplier": 1.4,
    "moneyMultiplier": 0.8,
    "startingLives": 2
  }
}
```

---

## 2. Scene Architecture

### 2.1 Scene Separation

```
┌─────────────────────────────────────────────────────────────┐
│                      Browser Window                          │
├─────────────────────────────────────────────────────────────┤
│  Phaser Container (70%)           │  React Container (30%)  │
│  ┌────────────────────────────┐   │  ┌──────────────────┐   │
│  │      GameScene             │   │  │   React App      │   │
│  │  - Grid, plants, zombies   │   │  │   - Money/Wave   │   │
│  │  - Projectiles, effects    │   │  │   - Quiz Panel   │   │
│  │  - No UI elements          │   │  │   - Plant Select │   │
│  └────────────────────────────┘   │  └──────────────────┘   │
│  ┌────────────────────────────┐   │                         │
│  │      UIScene (overlay)     │   │                         │
│  │  - Debug overlay only      │   │                         │
│  └────────────────────────────┘   │                         │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Scene Responsibilities

| Scene | Responsibility |
|-------|----------------|
| GameScene | Game logic, entities, physics, collisions |
| UIScene | Debug overlay (optional) |
| React App | Quiz panel, money display, wave info, plant selection |

---

## 3. Manager Pattern

### 3.1 Manager Classes

```
src/systems/
├── PlantManager.js      # Plant lifecycle, placement, updates
├── ZombieManager.js     # Zombie spawning, movement, attacks
├── ProjectileManager.js # Projectile creation, movement, cleanup
├── WaveManager.js       # Wave progression, spawning logic
├── MoneyManager.js      # Economy, transactions
├── CollisionManager.js  # Collision detection between entities
├── GridManager.js       # Grid layout, cell occupancy
└── AudioManager.js      # Sound effects, music (future)
```

### 3.2 Manager Interface

Each manager implements:
```javascript
class EntityManager {
  constructor(scene) { }
  add(entity) { }           // Add entity to manager
  remove(entity) { }        // Remove entity from manager
  getAll() { }              // Get all active entities
  getAt(lane, col) { }      // Get entity at position
  update(time, delta) { }   // Update all entities
  clear() { }               // Destroy all entities
}
```

---

## 4. Entity Architecture

### 4.1 Entity Hierarchy

```
Plant (base class extends Phaser.GameObjects.Container)
├── Peashooter
├── Wallnut
├── Sunflower (NEW - generates money)
├── SnowPea (NEW - slows zombies)
└── Repeater (NEW - double shot)

Zombie (base class extends Phaser.GameObjects.Container)
├── BasicZombie
├── FastZombie
├── ArmoredZombie
└── FlyingZombie (FUTURE)

Projectile (base class extends Phaser.GameObjects.Container)
├── Pea
└── SnowPea (slow effect)
```

### 4.2 Base Plant Class

```javascript
class Plant extends Phaser.GameObjects.Container {
  constructor(scene, x, y, type, data) {
    super(scene, x, y);
    this.type = type;
    this.data = { ...data };  // Clone config
    this.hp = data.hp;
    this.maxHp = data.hp;
    this.lane = null;
    this.col = null;
    // ... sprite, health bar setup
  }

  update(time, delta) { }
  takeDamage(amount) { }
  canFire() { }
  fire(target) { }
  destroy() { }
}
```

### 4.3 Base Zombie Class

```javascript
class Zombie extends Phaser.GameObjects.Container {
  constructor(scene, x, y, type, data, lane) {
    super(scene, x, y);
    this.type = type;
    this.data = { ...data };
    this.hp = data.hp;
    this.lane = lane;
    this.state = 'walking';  // walking, attacking, dead
    // ... sprite, health bar setup
  }

  update(time, delta) { }
  takeDamage(amount) { }
  startAttacking() { }
  stopAttacking() { }
  isDead() { }
  hasReachedHouse() { }
}
```

---

## 5. Lives System (NEW)

### 5.1 Lives Mechanic

| Difficulty | Starting Lives |
|------------|----------------|
| Easy | 5 |
| Normal | 3 |
| Hard | 2 |

- Zombie reaching house = -1 life
- Lives = 0 → Game Over
- More forgiving than instant loss

### 5.2 Implementation

```javascript
// GameScene
this.lives = GAME_CONFIG.DIFFICULTY[difficulty].startingLives;

handleZombieReachHouse(zombie) {
  this.lives--;
  this.events.emit('lives:update', this.lives);

  if (this.lives <= 0) {
    this.gameOver(false);
  }
}
```

---

## 6. File Structure

```
src/
├── main.jsx                    # React entry point
├── App.jsx                     # Layout container
├── components/                 # React components
│   ├── QuizPanel.jsx
│   ├── MoneyDisplay.jsx
│   ├── WaveInfo.jsx
│   ├── LivesDisplay.jsx        # NEW
│   ├── PlantSelector.jsx
│   └── DifficultySelect.jsx    # NEW
├── hooks/
│   └── useGameBridge.js        # Phaser ↔ React events
├── scenes/
│   ├── GameScene.js            # Main game scene
│   └── UIScene.js              # Debug overlay (optional)
├── entities/
│   ├── Plant.js                # Base plant class
│   ├── Peashooter.js
│   ├── Wallnut.js
│   ├── Sunflower.js            # NEW
│   ├── Zombie.js               # Base zombie class
│   ├── FastZombie.js           # NEW
│   ├── ArmoredZombie.js        # NEW
│   └── Projectile.js
├── systems/
│   ├── PlantManager.js
│   ├── ZombieManager.js
│   ├── ProjectileManager.js
│   ├── WaveManager.js
│   ├── MoneyManager.js
│   ├── CollisionManager.js
│   └── GridManager.js
├── utils/
│   ├── GridConfig.js
│   └── GameStats.js
└── styles/
    └── app.css

public/assets/
├── config/
│   ├── game.json
│   ├── plants.json
│   ├── zombies.json
│   ├── waves.json
│   ├── difficulty.json
│   └── quiz.json
├── data/
│   └── questions.json
└── images/
    ├── plants/
    ├── zombies/
    └── effects/
```

---

## 7. Event Bridge

### 7.1 Phaser → React Events

| Event | Payload | Description |
|-------|---------|-------------|
| `money:update` | `{ current, earned, lost }` | Money changed |
| `wave:update` | `{ current, total, state }` | Wave status |
| `lives:update` | `number` | Lives changed |
| `quiz:show` | `{ question, answers, ... }` | Show quiz |
| `quiz:result` | `{ correct, correctIndex }` | Quiz answered |
| `game:over` | `{ won, stats }` | Game ended |

### 7.2 React → Phaser Events

| Event | Payload | Description |
|-------|---------|-------------|
| `quiz:answer` | `number` | Answer index selected |
| `quiz:continue` | - | Dismiss quiz |
| `plant:select` | `string` | Plant type selected |
| `difficulty:set` | `string` | Difficulty selected |

---

## 8. Implementation Phases

### Phase 1: Foundation (Priority)
- [ ] Create config JSON files
- [ ] Implement base Plant class with Phaser.Container
- [ ] Implement base Zombie class with Phaser.Container
- [ ] Refactor PlantManager for new pattern
- [ ] Refactor ZombieManager for new pattern

### Phase 2: Core Mechanics
- [ ] Implement CollisionManager
- [ ] Implement WaveManager with config
- [ ] Add Lives system
- [ ] Update React components for lives

### Phase 3: Entity Variety
- [ ] Implement Sunflower (money generation)
- [ ] Implement FastZombie
- [ ] Implement ArmoredZombie
- [ ] Update plant selector for new types

### Phase 4: Polish
- [ ] Add difficulty selector
- [ ] Implement SnowPea (slow effect)
- [ ] Add Repeater plant
- [ ] Audio system (optional)

---

## 9. Acceptance Criteria

### Phase 1 Complete When:
- [ ] All config files created and loadable
- [ ] Plant base class extends Phaser.Container
- [ ] Zombie base class extends Phaser.Container
- [ ] Peashooter and Wallnut work with new pattern
- [ ] BasicZombie works with new pattern
- [ ] All existing tests pass

### Full Restructure Complete When:
- [ ] All phases implemented
- [ ] 3+ plant types functional
- [ ] 3+ zombie types functional
- [ ] Lives system working
- [ ] Difficulty selector working
- [ ] Game winnable on all difficulties
- [ ] TL code review approved
- [ ] QA testing passed

---

## 10. Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Breaking existing functionality | High | Incremental migration, keep tests passing |
| Config loading failures | Medium | Fallback to hardcoded defaults |
| Performance with many entities | Medium | Object pooling in managers |
| React-Phaser timing issues | Medium | Event debouncing, state guards |

---

## 11. Definition of Done

- [ ] Code follows new architecture
- [ ] Config-driven (no hardcoded values)
- [ ] Tests pass
- [ ] TL code review approved
- [ ] QA testing passed
- [ ] Game is playable and winnable

---

**Approved by:**
- [ ] TL (Technical Lead)
- [ ] GD (Game Designer)
- [ ] SM (Scrum Master)
- [ ] PO (Product Owner)
