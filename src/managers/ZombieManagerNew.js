// src/managers/ZombieManagerNew.js
// Refactored ZombieManager with config-driven architecture (S9-005)

import ZombieNew from '../entities/ZombieNew.js';

export default class ZombieManagerNew {
  constructor(scene, difficulty = 'NORMAL') {
    this.scene = scene;
    this.zombies = [];
    this.zombieConfigs = null;
    this.difficultySettings = null;
    this.difficulty = difficulty;
    this.configsLoaded = false;

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
      this.configsLoaded = true;

      console.log('[ZombieManager] Loaded configs, difficulty:', this.difficulty);
    } catch (error) {
      console.error('[ZombieManager] Failed to load configs:', error);
      this.zombieConfigs = this.getDefaultConfigs();
      this.difficultySettings = { zombieHealthMultiplier: 1, zombieSpeedMultiplier: 1 };
      this.configsLoaded = true;
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
    const upperType = type.toUpperCase();
    return this.zombieConfigs?.[upperType] || this.getDefaultConfigs()[upperType];
  }

  spawn(type, lane) {
    const upperType = type.toUpperCase();
    const config = this.getConfig(upperType);
    if (!config) {
      console.error(`[ZombieManager] Unknown zombie type: ${type}`);
      return null;
    }

    // Spawn at right edge of screen
    const pos = this.getSpawnPosition(lane);

    // Create zombie with difficulty multipliers
    const zombie = new ZombieNew(
      this.scene, pos.x, pos.y, upperType, config, lane, this.difficultySettings
    );

    this.zombies.push(zombie);

    console.log(`[ZombieManager] Spawned ${upperType} in lane ${lane}`);
    return zombie;
  }

  getSpawnPosition(lane) {
    const gridConfig = this.scene.gridConfig;
    if (!gridConfig) {
      return { x: 900, y: 100 + lane * 150 };
    }

    return {
      x: gridConfig.gridMarginLeft + (gridConfig.columns * gridConfig.cellWidth) + 50,
      y: gridConfig.gridMarginTop + (lane * gridConfig.cellHeight) + (gridConfig.cellHeight / 2)
    };
  }

  remove(zombie) {
    const index = this.zombies.indexOf(zombie);
    if (index !== -1) {
      this.zombies.splice(index, 1);
    }
  }

  handleZombieDied(zombie) {
    // Emit reward event
    if (zombie.config?.reward) {
      this.scene.events.emit('money:add', zombie.config.reward);
    }
    this.remove(zombie);
  }

  getAll() {
    return this.zombies.filter(z => z.isActive);
  }

  // Compatibility alias
  getActiveZombies() {
    return this.getAll();
  }

  getInLane(lane) {
    return this.zombies
      .filter(z => z.isActive && z.lane === lane)
      .sort((a, b) => a.x - b.x);  // Sort by position (leftmost first)
  }

  getClosestInLane(lane, x) {
    const inLane = this.getInLane(lane);
    if (inLane.length === 0) return null;

    // Find closest zombie to the right of x
    return inLane.find(z => z.x > x) || null;
  }

  update(time, delta) {
    const events = {
      reachedHouse: []
    };

    for (const zombie of this.zombies) {
      if (zombie.isActive) {
        zombie.update(time, delta);
      }
    }

    // Return events for compatibility
    return events;
  }

  clear() {
    for (const zombie of this.zombies) {
      zombie.destroy();
    }
    this.zombies = [];
  }

  // Compatibility alias
  clearAll() {
    this.clear();
  }

  destroy() {
    this.scene.events.off('zombie:died', this.handleZombieDied, this);
    this.clear();
  }
}
