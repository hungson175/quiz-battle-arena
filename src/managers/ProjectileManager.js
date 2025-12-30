// src/managers/ProjectileManager.js
// Manages pea projectiles in the game scene

import { Pea, PEA_CONFIG } from '../entities/Pea.js';

/**
 * ProjectileManager handles all projectile-related game logic
 * Creation, movement, collision detection, and cleanup
 */
export class ProjectileManager {
  /**
   * @param {Phaser.Scene} scene - The game scene
   * @param {GridConfig} gridConfig - Grid configuration
   */
  constructor(scene, gridConfig) {
    this.scene = scene;
    this.gridConfig = gridConfig;

    // Active peas: Map of pea.id -> { pea, sprite }
    this.peas = new Map();
  }

  /**
   * Create a pea projectile from a plant
   * @param {number} lane - Lane index
   * @param {number} col - Column where plant is
   * @param {number} damage - Damage dealt
   * @returns {Pea}
   */
  firePea(lane, col, damage) {
    const pos = this.gridConfig.getCellCenter(lane, col);

    const pea = new Pea({
      lane,
      x: pos.x + 30,  // Start slightly right of plant center
      y: pos.y,
      damage
    });

    // Create placeholder sprite (small green circle)
    const sprite = this.scene.add.circle(pea.x, pea.y, PEA_CONFIG.radius, 0x00aa00);
    sprite.setStrokeStyle(1, 0x006600);

    // Store pea data on sprite
    sprite.setData('peaId', pea.id);
    sprite.setData('lane', lane);

    this.peas.set(pea.id, { pea, sprite });

    return pea;
  }

  /**
   * Update all peas (call in scene update loop)
   * @param {number} delta - Time since last frame in ms
   * @returns {Pea[]} Peas that went off screen (for cleanup)
   */
  update(delta) {
    const deltaSeconds = delta / 1000;
    const offScreenPeas = [];

    for (const [id, { pea, sprite }] of this.peas) {
      if (!pea.isActive()) continue;

      // Update pea position
      pea.update(deltaSeconds);
      sprite.x = pea.x;

      // Check if off screen
      if (pea.isOffScreen(this.scene.scale.width)) {
        offScreenPeas.push(pea);
      }
    }

    // Clean up off-screen peas
    for (const pea of offScreenPeas) {
      this.removePea(pea.id);
    }

    return offScreenPeas;
  }

  /**
   * Get all active peas in a specific lane
   * @param {number} lane
   * @returns {Pea[]}
   */
  getPeasInLane(lane) {
    return Array.from(this.peas.values())
      .filter(({ pea }) => pea.isActive() && pea.lane === lane)
      .map(({ pea }) => pea);
  }

  /**
   * Check collision between a pea and a zombie
   * Simple distance-based collision
   * @param {Pea} pea
   * @param {number} zombieX - Zombie X position
   * @param {number} zombieWidth - Zombie width
   * @returns {boolean}
   */
  checkCollision(pea, zombieX, zombieWidth) {
    const peaBounds = pea.getBounds();
    const zombieLeft = zombieX - zombieWidth / 2;
    const zombieRight = zombieX + zombieWidth / 2;

    // Simple horizontal overlap check (same lane already verified)
    return pea.x >= zombieLeft && pea.x <= zombieRight;
  }

  /**
   * Handle pea hitting a target
   * @param {number} peaId
   */
  hitTarget(peaId) {
    const data = this.peas.get(peaId);
    if (!data) return;

    const { pea, sprite } = data;
    pea.hit();

    // Hit animation - quick flash and destroy
    this.scene.tweens.add({
      targets: sprite,
      scale: 1.5,
      alpha: 0,
      duration: 100,
      onComplete: () => {
        sprite.destroy();
        this.peas.delete(peaId);
      }
    });
  }

  /**
   * Remove a pea
   * @param {number} peaId
   */
  removePea(peaId) {
    const data = this.peas.get(peaId);
    if (!data) return;

    data.sprite.destroy();
    this.peas.delete(peaId);
  }

  /**
   * Get count of active peas
   * @returns {number}
   */
  getActiveCount() {
    return this.peas.size;
  }

  /**
   * Clear all peas
   */
  clearAll() {
    for (const [id, { sprite }] of this.peas) {
      sprite.destroy();
    }
    this.peas.clear();
  }
}
