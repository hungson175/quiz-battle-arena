# Phase 1 Implementation Specification

**Sprint:** 9
**Author:** TL
**Date:** 2025-12-30
**Status:** Ready for DEV

---

## Overview

This spec covers S9-002 through S9-005: implementing base entity classes and refactoring managers to use the new config-driven architecture.

**Config files created (S9-001):** `public/assets/config/`
- `plants.json` - Plant types and stats
- `zombies.json` - Zombie types and stats
- `waves.json` - Wave definitions
- `difficulty.json` - Difficulty multipliers
- `game.json` - Global settings

---

## S9-002: Base Plant Class

### File: `src/entities/Plant.js`

### Requirements

1. Extend `Phaser.GameObjects.Container`
2. Load config from `plants.json`
3. Support all plant types via single class (for now)

### Implementation

```javascript
import Phaser from 'phaser';

export default class Plant extends Phaser.GameObjects.Container {
  constructor(scene, x, y, type, config) {
    super(scene, x, y);

    // Add to scene
    scene.add.existing(this);
    this.setDepth(20);

    // Store plant data from config
    this.type = type;
    this.config = { ...config };  // Clone to avoid mutation
    this.hp = config.hp;
    this.maxHp = config.hp;
    this.lane = null;
    this.col = null;
    this.lastFireTime = 0;
    this.isActive = true;

    // Create sprite
    this.sprite = scene.add.image(0, 0, `plant_${type.toLowerCase()}`);
    this.add(this.sprite);

    // Create health bar
    this.createHealthBar();
  }

  createHealthBar() {
    const barWidth = 40;
    const barHeight = 6;

    this.healthBarBg = this.scene.add.rectangle(0, -30, barWidth, barHeight, 0x333333);
    this.healthBar = this.scene.add.rectangle(0, -30, barWidth, barHeight, 0x00ff00);

    this.add(this.healthBarBg);
    this.add(this.healthBar);
  }

  update(time, delta) {
    if (!this.isActive) return;

    // Subclass-specific behavior (firing, money generation)
    // Override in subclasses or handle via type check
  }

  takeDamage(amount) {
    this.hp -= amount;
    this.updateHealthBar();

    if (this.hp <= 0) {
      this.die();
    }
  }

  updateHealthBar() {
    const ratio = Math.max(0, this.hp / this.maxHp);
    this.healthBar.setScale(ratio, 1);

    // Color based on HP
    if (ratio > 0.5) {
      this.healthBar.setFillStyle(0x00ff00);
    } else if (ratio > 0.25) {
      this.healthBar.setFillStyle(0xffff00);
    } else {
      this.healthBar.setFillStyle(0xff0000);
    }
  }

  canFire(time) {
    if (this.config.fireRate <= 0) return false;
    return time > this.lastFireTime + this.config.fireRate;
  }

  fire(time, target) {
    this.lastFireTime = time;
    // Emit event for ProjectileManager to handle
    this.scene.events.emit('plant:fire', {
      plant: this,
      target: target,
      damage: this.config.damage,
      speed: this.config.projectileSpeed
    });
  }

  die() {
    this.isActive = false;
    this.scene.events.emit('plant:died', this);
    this.destroy();
  }

  destroy(fromScene) {
    if (this.healthBar) this.healthBar.destroy();
    if (this.healthBarBg) this.healthBarBg.destroy();
    if (this.sprite) this.sprite.destroy();
    super.destroy(fromScene);
  }
}
```

### Key Patterns (from reference project)

1. **Config cloning:** `{ ...config }` prevents accidental mutation
2. **Event emission:** `plant:fire`, `plant:died` for loose coupling
3. **Health bar as child:** Added to Container, moves with plant
4. **Cleanup in destroy():** Explicit child destruction

---

## S9-003: Base Zombie Class

### File: `src/entities/Zombie.js`

### Requirements

1. Extend `Phaser.GameObjects.Container`
2. Load config from `zombies.json`
3. Apply difficulty multipliers
4. Support states: `walking`, `attacking`, `dead`

### Implementation

```javascript
import Phaser from 'phaser';

export default class Zombie extends Phaser.GameObjects.Container {
  constructor(scene, x, y, type, config, lane, difficultyMultipliers = {}) {
    super(scene, x, y);

    // Add to scene
    scene.add.existing(this);
    this.setDepth(15);

    // Store zombie data
    this.type = type;
    this.config = { ...config };
    this.lane = lane;
    this.col = this.calculateCol(x);

    // Apply difficulty multipliers
    const healthMult = difficultyMultipliers.zombieHealthMultiplier || 1.0;
    const speedMult = difficultyMultipliers.zombieSpeedMultiplier || 1.0;

    this.hp = Math.round(config.hp * healthMult);
    this.maxHp = this.hp;
    this.speed = config.speed / speedMult;  // Lower = faster (seconds per tile)

    // State management
    this.state = 'walking';  // walking, attacking, dead
    this.targetPlant = null;
    this.attackTimer = 0;
    this.isActive = true;

    // Create sprite
    this.sprite = scene.add.image(0, 0, `zombie_${type.toLowerCase()}`);
    this.add(this.sprite);

    // Create health bar
    this.createHealthBar();
  }

  createHealthBar() {
    const barWidth = 40;
    const barHeight = 6;

    this.healthBarBg = this.scene.add.rectangle(0, -35, barWidth, barHeight, 0x333333);
    this.healthBar = this.scene.add.rectangle(0, -35, barWidth, barHeight, 0xff0000);

    this.add(this.healthBarBg);
    this.add(this.healthBar);
  }

  calculateCol(x) {
    const gridConfig = this.scene.gridConfig;
    if (!gridConfig) return 0;
    return Math.floor((x - gridConfig.offsetX) / gridConfig.tileWidth);
  }

  update(time, delta) {
    if (!this.isActive || this.state === 'dead') return;

    // Update column position
    this.col = this.calculateCol(this.x);

    if (this.state === 'walking') {
      this.move(delta);
    } else if (this.state === 'attacking') {
      this.attack(time, delta);
    }
  }

  move(delta) {
    // Speed is in seconds per tile
    // pixelSpeed = tileWidth / speed (seconds)
    const tileWidth = this.scene.gridConfig?.tileWidth || 97.7;
    const pixelSpeed = tileWidth / this.speed;

    // Move left
    this.x -= pixelSpeed * (delta / 1000);

    // Check if reached house
    if (this.hasReachedHouse()) {
      this.scene.events.emit('zombie:reachedHouse', this);
      this.die();
    }
  }

  attack(time, delta) {
    if (!this.targetPlant || !this.targetPlant.isActive) {
      this.stopAttacking();
      return;
    }

    // Attack every second (DPS)
    this.attackTimer += delta;
    if (this.attackTimer >= 1000) {
      this.attackTimer = 0;
      this.targetPlant.takeDamage(this.config.attackDps);
    }
  }

  startAttacking(plant) {
    this.state = 'attacking';
    this.targetPlant = plant;
    this.attackTimer = 0;
  }

  stopAttacking() {
    this.state = 'walking';
    this.targetPlant = null;
    this.attackTimer = 0;
  }

  takeDamage(amount) {
    // Apply armor if present
    const armor = this.config.armor || 0;
    const effectiveDamage = amount * (1 - armor);

    this.hp -= effectiveDamage;
    this.updateHealthBar();

    if (this.hp <= 0) {
      this.die();
    }
  }

  updateHealthBar() {
    const ratio = Math.max(0, this.hp / this.maxHp);
    this.healthBar.setScale(ratio, 1);
  }

  hasReachedHouse() {
    const houseX = this.scene.gridConfig?.offsetX || 100;
    return this.x <= houseX;
  }

  isDead() {
    return this.state === 'dead' || !this.isActive;
  }

  die() {
    this.state = 'dead';
    this.isActive = false;
    this.scene.events.emit('zombie:died', this);
    this.destroy();
  }

  destroy(fromScene) {
    if (this.healthBar) this.healthBar.destroy();
    if (this.healthBarBg) this.healthBarBg.destroy();
    if (this.sprite) this.sprite.destroy();
    super.destroy(fromScene);
  }
}
```

### Key Patterns

1. **Difficulty multipliers:** Applied at construction, stored as modified values
2. **State machine:** Simple string-based (`walking`, `attacking`, `dead`)
3. **Speed formula:** `pixelSpeed = tileWidth / secondsPerTile` (from GD)
4. **Armor reduction:** `effectiveDamage = amount * (1 - armor)`

---

## S9-004: PlantManager Refactor

### File: `src/managers/PlantManager.js`

### Requirements

1. Load plant configs from JSON
2. Manage plant lifecycle (create, update, destroy)
3. Provide grid-based queries (`getAt(lane, col)`)

### Implementation

```javascript
import Plant from '../entities/Plant.js';

export default class PlantManager {
  constructor(scene) {
    this.scene = scene;
    this.plants = [];
    this.plantConfigs = null;

    // Load configs
    this.loadConfigs();

    // Listen for plant events
    this.scene.events.on('plant:died', this.handlePlantDied, this);
  }

  async loadConfigs() {
    try {
      const response = await fetch('/assets/config/plants.json');
      this.plantConfigs = await response.json();
      console.log('[PlantManager] Loaded plant configs:', Object.keys(this.plantConfigs));
    } catch (error) {
      console.error('[PlantManager] Failed to load configs:', error);
      // Fallback to hardcoded defaults
      this.plantConfigs = this.getDefaultConfigs();
    }
  }

  getDefaultConfigs() {
    return {
      PEASHOOTER: { name: 'Peashooter', cost: 75, hp: 10, damage: 1, fireRate: 1500, range: 400, projectileSpeed: 300 },
      WALLNUT: { name: 'Wall-nut', cost: 50, hp: 40, damage: 0, fireRate: 0 },
      SUNFLOWER: { name: 'Sunflower', cost: 50, hp: 5, damage: 0, moneyGeneration: 25, generationInterval: 10000 }
    };
  }

  getConfig(type) {
    return this.plantConfigs?.[type] || this.getDefaultConfigs()[type];
  }

  getCost(type) {
    return this.getConfig(type)?.cost || 100;
  }

  add(type, lane, col) {
    const config = this.getConfig(type);
    if (!config) {
      console.error(`[PlantManager] Unknown plant type: ${type}`);
      return null;
    }

    // Calculate position from grid
    const { x, y } = this.scene.gridConfig.getCellCenter(lane, col);

    // Create plant
    const plant = new Plant(this.scene, x, y, type, config);
    plant.lane = lane;
    plant.col = col;

    this.plants.push(plant);

    console.log(`[PlantManager] Added ${type} at lane ${lane}, col ${col}`);
    return plant;
  }

  remove(plant) {
    const index = this.plants.indexOf(plant);
    if (index !== -1) {
      this.plants.splice(index, 1);
    }
  }

  handlePlantDied(plant) {
    this.remove(plant);
  }

  getAll() {
    return this.plants.filter(p => p.isActive);
  }

  getAt(lane, col) {
    return this.plants.find(p => p.isActive && p.lane === lane && p.col === col);
  }

  getInLane(lane) {
    return this.plants.filter(p => p.isActive && p.lane === lane);
  }

  update(time, delta) {
    for (const plant of this.plants) {
      if (plant.isActive) {
        plant.update(time, delta);
      }
    }
  }

  clear() {
    for (const plant of this.plants) {
      plant.destroy();
    }
    this.plants = [];
  }

  destroy() {
    this.scene.events.off('plant:died', this.handlePlantDied, this);
    this.clear();
  }
}
```

---

## S9-005: ZombieManager Refactor

### File: `src/managers/ZombieManager.js`

### Requirements

1. Load zombie configs from JSON
2. Apply difficulty multipliers
3. Manage zombie lifecycle
4. Provide lane-based queries

### Implementation

```javascript
import Zombie from '../entities/Zombie.js';

export default class ZombieManager {
  constructor(scene, difficulty = 'NORMAL') {
    this.scene = scene;
    this.zombies = [];
    this.zombieConfigs = null;
    this.difficultySettings = null;
    this.difficulty = difficulty;

    // Load configs
    this.loadConfigs();

    // Listen for zombie events
    this.scene.events.on('zombie:died', this.handleZombieDied, this);
  }

  async loadConfigs() {
    try {
      const [zombiesRes, difficultyRes] = await Promise.all([
        fetch('/assets/config/zombies.json'),
        fetch('/assets/config/difficulty.json')
      ]);

      this.zombieConfigs = await zombiesRes.json();
      const allDifficulty = await difficultyRes.json();
      this.difficultySettings = allDifficulty[this.difficulty] || allDifficulty.NORMAL;

      console.log('[ZombieManager] Loaded configs, difficulty:', this.difficulty);
    } catch (error) {
      console.error('[ZombieManager] Failed to load configs:', error);
      this.zombieConfigs = this.getDefaultConfigs();
      this.difficultySettings = { zombieHealthMultiplier: 1, zombieSpeedMultiplier: 1 };
    }
  }

  getDefaultConfigs() {
    return {
      BASIC: { name: 'Basic Zombie', hp: 8, speed: 5, attackDps: 2, reward: 10, damage: 1 },
      FAST: { name: 'Fast Zombie', hp: 4, speed: 3, attackDps: 1, reward: 8, damage: 1 },
      ARMORED: { name: 'Armored Zombie', hp: 20, speed: 7, attackDps: 3, reward: 20, damage: 1, armor: 0.3 }
    };
  }

  getConfig(type) {
    return this.zombieConfigs?.[type] || this.getDefaultConfigs()[type];
  }

  spawn(type, lane) {
    const config = this.getConfig(type);
    if (!config) {
      console.error(`[ZombieManager] Unknown zombie type: ${type}`);
      return null;
    }

    // Spawn at right edge of screen
    const { x, y } = this.scene.gridConfig.getSpawnPosition(lane);

    // Create zombie with difficulty multipliers
    const zombie = new Zombie(
      this.scene, x, y, type, config, lane, this.difficultySettings
    );

    this.zombies.push(zombie);

    console.log(`[ZombieManager] Spawned ${type} in lane ${lane}`);
    return zombie;
  }

  remove(zombie) {
    const index = this.zombies.indexOf(zombie);
    if (index !== -1) {
      this.zombies.splice(index, 1);
    }
  }

  handleZombieDied(zombie) {
    // Emit reward event
    this.scene.events.emit('money:add', zombie.config.reward);
    this.remove(zombie);
  }

  getAll() {
    return this.zombies.filter(z => z.isActive);
  }

  getInLane(lane) {
    return this.zombies
      .filter(z => z.isActive && z.lane === lane)
      .sort((a, b) => a.x - b.x);  // Sort by position (leftmost first)
  }

  getClosestInLane(lane, x) {
    const inLane = this.getInLane(lane);
    if (inLane.length === 0) return null;

    // Find closest zombie to the left of x
    return inLane.find(z => z.x > x) || null;
  }

  update(time, delta) {
    for (const zombie of this.zombies) {
      if (zombie.isActive) {
        zombie.update(time, delta);
      }
    }
  }

  clear() {
    for (const zombie of this.zombies) {
      zombie.destroy();
    }
    this.zombies = [];
  }

  destroy() {
    this.scene.events.off('zombie:died', this.handleZombieDied, this);
    this.clear();
  }
}
```

---

## Integration Notes

### GameScene Changes

```javascript
// In GameScene.create()

// Load configs first
this.gameConfig = await this.loadGameConfig();

// Initialize managers with config
this.plantManager = new PlantManager(this);
this.zombieManager = new ZombieManager(this, this.difficulty);

// Wait for async config loading
await Promise.all([
  this.plantManager.loadConfigs(),
  this.zombieManager.loadConfigs()
]);
```

### GridConfig Helper Methods

Add to `src/utils/GridConfig.js`:

```javascript
getCellCenter(lane, col) {
  return {
    x: this.offsetX + (col * this.tileWidth) + (this.tileWidth / 2),
    y: this.offsetY + (lane * this.tileHeight) + (this.tileHeight / 2)
  };
}

getSpawnPosition(lane) {
  return {
    x: this.offsetX + (this.columns * this.tileWidth) + 50,  // Right edge + buffer
    y: this.offsetY + (lane * this.tileHeight) + (this.tileHeight / 2)
  };
}
```

---

## Testing Requirements

### Acceptance Criteria

1. **Peashooter works:** Can place, fires at zombies, takes damage, dies
2. **Wallnut works:** Can place, blocks zombies, takes damage, dies
3. **BasicZombie works:** Spawns, walks, attacks plants, dies when HP=0
4. **Config changes reflect in game:** Modify JSON, refresh, see new values
5. **All existing tests pass:** No regression

### Test Files to Update

- `tests/plant.test.js` - Update for new Plant class
- `tests/zombie.test.js` - Update for new Zombie class
- `tests/plantManager.test.js` - Update for refactored manager
- `tests/zombieManager.test.js` - Update for refactored manager

---

## Definition of Done

- [ ] Plant.js implements all methods from spec
- [ ] Zombie.js implements all methods from spec
- [ ] PlantManager.js loads from JSON, manages lifecycle
- [ ] ZombieManager.js loads from JSON, applies difficulty
- [ ] All existing tests pass or updated
- [ ] Game runs without errors
- [ ] TL code review passed
- [ ] QA testing passed

---

**Ready for DEV implementation.**
