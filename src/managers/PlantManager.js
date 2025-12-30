// src/managers/PlantManager.js
// Manages plant placement, rendering, and updates in the game scene

import { Peashooter } from '../entities/Peashooter.js';

/**
 * PlantManager handles all plant-related game logic
 * Placement, firing updates, rendering, and cleanup
 */
export class PlantManager {
  /**
   * @param {Phaser.Scene} scene - The game scene
   * @param {GridConfig} gridConfig - Grid configuration
   */
  constructor(scene, gridConfig) {
    this.scene = scene;
    this.gridConfig = gridConfig;

    // Active plants: Map of "lane,col" -> { plant, sprite }
    this.plants = new Map();

    // Plant sprites group for collision detection
    this.spriteGroup = scene.add.group();
  }

  /**
   * Place a plant at specified grid cell
   * @param {number} lane - Lane index (0-2)
   * @param {number} col - Column index (1-8)
   * @returns {Peashooter|null} The placed plant or null if invalid
   */
  placePlant(lane, col) {
    // Validate placement
    if (!this.gridConfig.isPlantable(lane, col)) {
      console.log(`Cannot place plant at (${lane}, ${col}) - not plantable`);
      return null;
    }

    if (this.hasPlantAt(lane, col)) {
      console.log(`Cannot place plant at (${lane}, ${col}) - already occupied`);
      return null;
    }

    // Create plant
    const plant = new Peashooter({ lane, col });

    // Get screen position
    const pos = this.gridConfig.getCellCenter(lane, col);

    // Create placeholder sprite (green circle)
    const sprite = this.scene.add.circle(pos.x, pos.y, 25, 0x00ff00);
    sprite.setStrokeStyle(2, 0x006600);

    // Add to sprite group
    this.spriteGroup.add(sprite);

    // Store plant data on sprite
    sprite.setData('plantId', plant.id);
    sprite.setData('lane', lane);
    sprite.setData('col', col);

    // Track plant by grid key
    const key = plant.getGridKey();
    this.plants.set(key, { plant, sprite });

    console.log(`Placed plant ${plant.id} at lane ${lane}, col ${col}`);

    return plant;
  }

  /**
   * Check if there's a plant at specified cell
   * @param {number} lane
   * @param {number} col
   * @returns {boolean}
   */
  hasPlantAt(lane, col) {
    return this.plants.has(`${lane},${col}`);
  }

  /**
   * Get plant at specified cell
   * @param {number} lane
   * @param {number} col
   * @returns {Peashooter|null}
   */
  getPlantAt(lane, col) {
    const data = this.plants.get(`${lane},${col}`);
    return data ? data.plant : null;
  }

  /**
   * Update all plants (call in scene update loop)
   * @param {number} delta - Time since last frame in ms
   * @returns {{ fired: Array<{plant: Peashooter, lane: number}> }} Events that occurred
   */
  update(delta) {
    const deltaSeconds = delta / 1000;
    const events = { fired: [] };

    for (const [key, { plant, sprite }] of this.plants) {
      if (!plant.isAlive()) {
        continue;
      }

      // Update cooldown
      plant.updateCooldown(deltaSeconds);
    }

    return events;
  }

  /**
   * Make a plant fire (called by game logic when zombies in lane)
   * @param {number} lane
   * @param {number} col
   * @returns {number} Damage of fired pea (0 if didn't fire)
   */
  tryFire(lane, col) {
    const plant = this.getPlantAt(lane, col);
    if (!plant) return 0;

    const damage = plant.fire();

    if (damage > 0) {
      // Visual feedback - brief pulse
      const data = this.plants.get(`${lane},${col}`);
      if (data) {
        this.scene.tweens.add({
          targets: data.sprite,
          scale: 1.2,
          duration: 100,
          yoyo: true
        });
      }
    }

    return damage;
  }

  /**
   * Damage a plant at specified cell
   * @param {number} lane
   * @param {number} col
   * @param {number} damage
   * @returns {boolean} True if plant died
   */
  damagePlant(lane, col, damage) {
    const data = this.plants.get(`${lane},${col}`);
    if (!data) return false;

    const { plant, sprite } = data;
    plant.takeDamage(damage);

    // Visual feedback - flash red
    sprite.setFillStyle(0xff0000);
    this.scene.time.delayedCall(100, () => {
      if (plant.isAlive()) {
        sprite.setFillStyle(0x00ff00);
      }
    });

    if (!plant.isAlive()) {
      this.removePlant(lane, col);
      return true;
    }

    return false;
  }

  /**
   * Remove a plant from the grid
   * @param {number} lane
   * @param {number} col
   */
  removePlant(lane, col) {
    const key = `${lane},${col}`;
    const data = this.plants.get(key);
    if (!data) return;

    const { plant, sprite } = data;

    // Death animation
    this.scene.tweens.add({
      targets: sprite,
      alpha: 0,
      scale: 0.5,
      duration: 200,
      onComplete: () => {
        sprite.destroy();
      }
    });

    this.plants.delete(key);
    console.log(`Plant ${plant.id} destroyed at lane ${lane}, col ${col}`);
  }

  /**
   * Get all plants in a specific lane
   * @param {number} lane
   * @returns {Peashooter[]}
   */
  getPlantsInLane(lane) {
    const result = [];
    for (const [key, { plant }] of this.plants) {
      if (plant.lane === lane && plant.isAlive()) {
        result.push(plant);
      }
    }
    return result;
  }

  /**
   * Get all active plants
   * @returns {Peashooter[]}
   */
  getAllPlants() {
    return Array.from(this.plants.values())
      .filter(({ plant }) => plant.isAlive())
      .map(({ plant }) => plant);
  }

  /**
   * Get count of placed plants
   * @returns {number}
   */
  getPlantCount() {
    return this.plants.size;
  }

  /**
   * Get the sprite group for collision detection
   * @returns {Phaser.GameObjects.Group}
   */
  getSpriteGroup() {
    return this.spriteGroup;
  }

  /**
   * Clear all plants
   */
  clearAll() {
    for (const [key, { sprite }] of this.plants) {
      sprite.destroy();
    }
    this.plants.clear();
  }
}
