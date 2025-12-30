// src/entities/Zombie.js
// Zombie entity for tower defense game

// Zombie configuration from GD balance values
export const ZOMBIE_CONFIG = {
  hp: 8,            // Dies in 8 pea hits (balanced for better gameplay)
  speed: 5,         // Seconds per tile
  attackDps: 2      // Damage per second when attacking plants
};

/**
 * Zombie entity class
 * Handles zombie state, movement logic, and damage
 * Note: This is a pure logic class - rendering is handled by GameScene
 */
export class Zombie {
  /**
   * Create a new zombie
   * @param {Object} options
   * @param {number} options.lane - Lane index (0-2)
   * @param {number} [options.col=8] - Starting column (default: rightmost)
   * @param {number} [options.hp] - Override HP (for testing)
   * @param {number} [options.speedMultiplier=1.0] - Speed multiplier for wave difficulty
   */
  constructor(options = {}) {
    this.lane = options.lane ?? 0;
    this.col = options.col ?? 8;  // Spawn at right edge
    this.hp = options.hp ?? ZOMBIE_CONFIG.hp;
    this.maxHp = this.hp;
    this.speedMultiplier = options.speedMultiplier ?? 1.0;

    // Movement tracking
    this.tileProgress = 0;  // 0 to 1, progress through current tile

    // State: 'walking', 'attacking', 'dead'
    this.state = 'walking';

    // Unique ID for tracking
    this.id = Zombie.nextId++;
  }

  /**
   * Check if zombie is still alive
   * @returns {boolean}
   */
  isAlive() {
    return this.hp > 0;
  }

  /**
   * Apply damage to the zombie
   * @param {number} amount - Damage amount
   */
  takeDamage(amount) {
    this.hp = Math.max(0, this.hp - amount);

    if (!this.isAlive()) {
      this.state = 'dead';
    }
  }

  /**
   * Calculate pixel speed based on tile width
   * @param {number} pixelsPerTile - Width of one tile in pixels
   * @returns {number} Pixels per second
   */
  getPixelSpeed(pixelsPerTile) {
    return pixelsPerTile / ZOMBIE_CONFIG.speed;
  }

  /**
   * Update movement progress
   * @param {number} deltaSeconds - Time elapsed in seconds
   * @returns {boolean} True if zombie moved to a new tile
   */
  updateProgress(deltaSeconds) {
    if (this.state !== 'walking') {
      return false;
    }

    // Progress is fraction of tile crossed
    // 1 tile takes ZOMBIE_CONFIG.speed seconds, modified by speedMultiplier
    // Higher multiplier = faster zombie (less time per tile)
    const effectiveSpeed = ZOMBIE_CONFIG.speed / this.speedMultiplier;
    const progressDelta = deltaSeconds / effectiveSpeed;
    this.tileProgress += progressDelta;

    // Check if we've crossed into the next tile
    if (this.tileProgress >= 1) {
      this.col -= 1;  // Move left
      this.tileProgress -= 1;  // Keep remainder
      return true;
    }

    return false;
  }

  /**
   * Get the current X position as a float (col + progress)
   * @returns {number} Current column position with fractional progress
   */
  getPositionX() {
    return this.col + (1 - this.tileProgress);  // Progress goes right-to-left
  }

  /**
   * Check if zombie has reached the house zone
   * @returns {boolean}
   */
  hasReachedHouse() {
    return this.col <= 0;
  }

  /**
   * Start attacking (when reaching a plant)
   */
  startAttacking() {
    if (this.isAlive()) {
      this.state = 'attacking';
    }
  }

  /**
   * Stop attacking and resume walking
   */
  stopAttacking() {
    if (this.isAlive()) {
      this.state = 'walking';
    }
  }

  /**
   * Get attack damage for this frame
   * @param {number} deltaSeconds - Time elapsed
   * @returns {number} Damage dealt
   */
  getAttackDamage(deltaSeconds) {
    if (this.state !== 'attacking') {
      return 0;
    }
    return ZOMBIE_CONFIG.attackDps * deltaSeconds;
  }

  /**
   * Get attack DPS (damage per second)
   * @returns {number}
   */
  getDps() {
    return ZOMBIE_CONFIG.attackDps;
  }
}

// Static ID counter for unique zombie IDs
Zombie.nextId = 1;
