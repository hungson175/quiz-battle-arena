// src/managers/PlantManagerNew.js
// Refactored PlantManager with config-driven architecture (S9-004)

import Plant from '../entities/Plant.js';

export default class PlantManagerNew {
  constructor(scene) {
    this.scene = scene;
    this.plants = [];
    this.plantConfigs = null;
    this.configsLoaded = false;

    // Listen for plant events
    this.scene.events.on('plant:died', this.handlePlantDied, this);
  }

  async loadConfigs() {
    try {
      const response = await fetch('/assets/config/plants.json');
      this.plantConfigs = await response.json();
      this.configsLoaded = true;
      console.log('[PlantManager] Loaded plant configs:', Object.keys(this.plantConfigs));
    } catch (error) {
      console.error('[PlantManager] Failed to load configs:', error);
      // Fallback to hardcoded defaults
      this.plantConfigs = this.getDefaultConfigs();
      this.configsLoaded = true;
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
    const upperType = type.toUpperCase();
    return this.plantConfigs?.[upperType] || this.getDefaultConfigs()[upperType];
  }

  getCost(type) {
    return this.getConfig(type)?.cost || 100;
  }

  add(type, lane, col) {
    const upperType = type.toUpperCase();
    const config = this.getConfig(upperType);
    if (!config) {
      console.error(`[PlantManager] Unknown plant type: ${type}`);
      return null;
    }

    // Check if cell is occupied
    if (this.getAt(lane, col)) {
      console.log(`[PlantManager] Cell (${lane}, ${col}) already occupied`);
      return null;
    }

    // Calculate position from grid
    const pos = this.scene.gridConfig.getCellCenter(lane, col);

    // Create plant
    const plant = new Plant(this.scene, pos.x, pos.y, upperType, config);
    plant.lane = lane;
    plant.col = col;

    this.plants.push(plant);

    console.log(`[PlantManager] Added ${upperType} at lane ${lane}, col ${col}`);
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

  hasPlantAt(lane, col) {
    return !!this.getAt(lane, col);
  }

  getInLane(lane) {
    return this.plants.filter(p => p.isActive && p.lane === lane);
  }

  // Compatibility method for existing code
  getPlantAt(lane, col) {
    return this.getAt(lane, col);
  }

  // Compatibility method for existing code
  getPlantsInLane(lane) {
    return this.getInLane(lane);
  }

  // Compatibility method: placePlant (alias for add with different param order)
  placePlant(lane, col, type) {
    return this.add(type, lane, col);
  }

  // Compatibility method for existing code
  getAllPlants() {
    return this.getAll();
  }

  // Compatibility: damage plant at location
  damagePlant(lane, col, damage) {
    const plant = this.getAt(lane, col);
    if (!plant) return false;

    plant.takeDamage(damage);

    if (!plant.isActive) {
      return true; // Plant died
    }
    return false;
  }

  // Compatibility: try to fire
  tryFire(lane, col) {
    const plant = this.getAt(lane, col);
    if (!plant) return 0;
    if (!plant.canFire(this.scene.time.now)) return 0;

    // Find target zombie in lane
    const zombies = this.scene.zombieManager?.getInLane?.(lane) || [];
    const target = zombies.find(z => z.isActive && z.x > plant.x);

    if (target) {
      plant.fire(this.scene.time.now, target);
      return plant.config.damage;
    }

    return 0;
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

  // Compatibility alias
  clearAll() {
    this.clear();
  }

  destroy() {
    this.scene.events.off('plant:died', this.handlePlantDied, this);
    this.clear();
  }
}
