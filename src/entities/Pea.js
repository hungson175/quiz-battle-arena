// src/entities/Pea.js
// Pea projectile entity for tower defense game

// Pea configuration from TL decisions (ADR-001)
export const PEA_CONFIG = {
  speed: 400,     // Pixels per second
  radius: 8       // Visual size
};

/**
 * Pea projectile entity class
 * Handles projectile movement and collision state
 * Note: This is a pure logic class - rendering is handled by ProjectileManager
 */
export class Pea {
  /**
   * Create a new Pea projectile
   * @param {Object} options
   * @param {number} options.lane - Lane index (0-2)
   * @param {number} options.x - Starting X position
   * @param {number} options.damage - Damage dealt on hit
   * @param {number} [options.y] - Y position (calculated from lane if not provided)
   */
  constructor(options = {}) {
    this.lane = options.lane ?? 0;
    this.x = options.x ?? 0;
    this.y = options.y ?? 0;
    this.damage = options.damage ?? 1;

    // State
    this.active = true;

    // Unique ID for tracking
    this.id = Pea.nextId++;
  }

  /**
   * Check if pea is still active
   * @returns {boolean}
   */
  isActive() {
    return this.active;
  }

  /**
   * Update pea position
   * @param {number} deltaSeconds - Time elapsed in seconds
   */
  update(deltaSeconds) {
    if (!this.active) return;

    // Move right
    this.x += PEA_CONFIG.speed * deltaSeconds;
  }

  /**
   * Mark pea as hit (deactivate after hitting target)
   */
  hit() {
    this.active = false;
  }

  /**
   * Deactivate pea (went off screen or other reason)
   */
  deactivate() {
    this.active = false;
  }

  /**
   * Check if pea is off screen
   * @param {number} screenWidth
   * @returns {boolean}
   */
  isOffScreen(screenWidth) {
    return this.x > screenWidth;
  }

  /**
   * Get collision bounds for this pea
   * @returns {{x: number, y: number, width: number, height: number}}
   */
  getBounds() {
    return {
      x: this.x - PEA_CONFIG.radius,
      y: this.y - PEA_CONFIG.radius,
      width: PEA_CONFIG.radius * 2,
      height: PEA_CONFIG.radius * 2
    };
  }
}

// Static ID counter for unique pea IDs
Pea.nextId = 1;
