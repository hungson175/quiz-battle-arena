// src/managers/ZombieManager.js
// Manages zombie spawning, rendering, and updates in the game scene

import { Zombie, ZOMBIE_CONFIG } from '../entities/Zombie.js';

/**
 * ZombieManager handles all zombie-related game logic
 * Spawning, movement updates, rendering, and cleanup
 */
export class ZombieManager {
  /**
   * @param {Phaser.Scene} scene - The game scene
   * @param {GridConfig} gridConfig - Grid configuration
   */
  constructor(scene, gridConfig) {
    this.scene = scene;
    this.gridConfig = gridConfig;

    // Active zombies: Map of zombie.id -> { zombie, sprite }
    this.zombies = new Map();

    // Zombie sprites group for collision detection
    this.spriteGroup = scene.add.group();
  }

  /**
   * Spawn a zombie in a specific lane
   * @param {number} lane - Lane index (0-2)
   * @param {number} [speedMultiplier=1.0] - Speed multiplier for wave difficulty
   * @returns {Zombie} The spawned zombie
   */
  spawnZombie(lane, speedMultiplier = 1.0) {
    const zombie = new Zombie({ lane, speedMultiplier });

    // Get screen position for spawn point (right edge of grid)
    const pos = this.gridConfig.getCellCenter(lane, 8);

    // Create placeholder sprite (red rectangle)
    const sprite = this.scene.add.rectangle(
      pos.x,
      pos.y,
      40,  // width
      60,  // height
      0xff0000  // red color
    );
    sprite.setStrokeStyle(2, 0x880000);

    // Add to sprite group
    this.spriteGroup.add(sprite);

    // Store zombie data on sprite for collision handling
    sprite.setData('zombieId', zombie.id);
    sprite.setData('lane', zombie.lane);

    // Track zombie
    this.zombies.set(zombie.id, { zombie, sprite });

    console.log(`Spawned zombie ${zombie.id} in lane ${lane}`);

    return zombie;
  }

  /**
   * Spawn zombie in a random lane
   * @param {number} [speedMultiplier=1.0] - Speed multiplier for wave difficulty
   * @returns {Zombie}
   */
  spawnRandomZombie(speedMultiplier = 1.0) {
    const lane = Math.floor(Math.random() * this.gridConfig.lanes);
    return this.spawnZombie(lane, speedMultiplier);
  }

  /**
   * Get count of active zombies (alias for getActiveCount)
   * @returns {number}
   */
  getActiveZombieCount() {
    return this.getActiveCount();
  }

  /**
   * Update all zombies (call in scene update loop)
   * @param {number} delta - Time since last frame in ms
   * @returns {{ reachedHouse: Zombie[], died: Zombie[] }} Events that occurred
   */
  update(delta) {
    const deltaSeconds = delta / 1000;
    const events = { reachedHouse: [], died: [] };

    for (const [id, { zombie, sprite }] of this.zombies) {
      // Skip dead zombies (they should be removed)
      if (!zombie.isAlive()) {
        continue;
      }

      // Update zombie movement
      if (zombie.state === 'walking') {
        zombie.updateProgress(deltaSeconds);

        // Update sprite position
        const pos = this.getZombieScreenPosition(zombie);
        sprite.x = pos.x;
        sprite.y = pos.y;

        // Check if reached house
        if (zombie.hasReachedHouse()) {
          events.reachedHouse.push(zombie);
        }
      }
    }

    return events;
  }

  /**
   * Get screen position for a zombie based on its grid position
   * @param {Zombie} zombie
   * @returns {{x: number, y: number}}
   */
  getZombieScreenPosition(zombie) {
    // Calculate x position with fractional progress
    const progress = zombie.tileProgress;
    const cellWidth = this.gridConfig.cellWidth;

    // Start at current column center, move left based on progress
    const basePos = this.gridConfig.getCellCenter(zombie.lane, zombie.col);
    const offsetX = progress * cellWidth;  // How far into next tile

    return {
      x: basePos.x - offsetX,
      y: basePos.y
    };
  }

  /**
   * Apply damage to a zombie by ID
   * @param {number} zombieId
   * @param {number} damage
   * @returns {boolean} True if zombie died
   */
  damageZombie(zombieId, damage) {
    const data = this.zombies.get(zombieId);
    if (!data) {
      return false;
    }

    const { zombie, sprite } = data;
    zombie.takeDamage(damage);

    // Visual feedback - flash white
    sprite.setFillStyle(0xffffff);
    this.scene.time.delayedCall(100, () => {
      if (zombie.isAlive()) {
        sprite.setFillStyle(0xff0000);
      }
    });

    if (!zombie.isAlive()) {
      this.killZombie(zombieId);
      return true;
    }

    return false;
  }

  /**
   * Kill and remove a zombie with death animation
   * @param {number} zombieId
   */
  killZombie(zombieId) {
    const data = this.zombies.get(zombieId);
    if (!data) return;

    const { zombie, sprite } = data;
    zombie.state = 'dead';

    // Death animation: fade out with slight drop
    this.scene.tweens.add({
      targets: sprite,
      alpha: 0,
      y: sprite.y + 10,
      duration: 300,
      onComplete: () => {
        sprite.destroy();
        this.zombies.delete(zombieId);
      }
    });

    console.log(`Zombie ${zombieId} killed`);
  }

  /**
   * Get zombie by ID
   * @param {number} zombieId
   * @returns {Zombie|null}
   */
  getZombie(zombieId) {
    const data = this.zombies.get(zombieId);
    return data ? data.zombie : null;
  }

  /**
   * Get all active zombies
   * @returns {Zombie[]}
   */
  getActiveZombies() {
    return Array.from(this.zombies.values())
      .filter(({ zombie }) => zombie.isAlive())
      .map(({ zombie }) => zombie);
  }

  /**
   * Get zombies in a specific lane
   * @param {number} lane
   * @returns {Zombie[]}
   */
  getZombiesInLane(lane) {
    return this.getActiveZombies().filter(z => z.lane === lane);
  }

  /**
   * Get the sprite group for collision detection
   * @returns {Phaser.GameObjects.Group}
   */
  getSpriteGroup() {
    return this.spriteGroup;
  }

  /**
   * Get count of active zombies
   * @returns {number}
   */
  getActiveCount() {
    return this.getActiveZombies().length;
  }

  /**
   * Clear all zombies
   */
  clearAll() {
    for (const [id, { sprite }] of this.zombies) {
      sprite.destroy();
    }
    this.zombies.clear();
  }
}
