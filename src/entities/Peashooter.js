// src/entities/Peashooter.js
// Peashooter plant entity for tower defense game

// Peashooter configuration from GD balance values
export const PEASHOOTER_CONFIG = {
  fireRate: 1.5,    // Seconds between shots
  cost: 100,        // Sun cost (for M2)
  hp: 6,            // Plant durability
  peaDamage: 1      // Damage per pea
};

/**
 * Peashooter plant entity class
 * Handles plant state, firing logic, and damage
 * Note: This is a pure logic class - rendering is handled by PlantManager
 */
export class Peashooter {
  /**
   * Create a new Peashooter
   * @param {Object} options
   * @param {number} options.lane - Lane index (0-2)
   * @param {number} options.col - Column index (1-8, not house zone)
   */
  constructor(options = {}) {
    this.lane = options.lane ?? 0;
    this.col = options.col ?? 1;
    this.hp = PEASHOOTER_CONFIG.hp;
    this.maxHp = this.hp;

    // Firing state
    this.fireCooldown = 0;  // Time until next shot available

    // Unique ID for tracking
    this.id = Peashooter.nextId++;

    // Plant type identifier
    this.type = 'peashooter';
  }

  /**
   * Check if plant is still alive
   * @returns {boolean}
   */
  isAlive() {
    return this.hp > 0;
  }

  /**
   * Apply damage to the plant
   * @param {number} amount - Damage amount
   */
  takeDamage(amount) {
    this.hp = Math.max(0, this.hp - amount);
  }

  /**
   * Check if plant can fire (not on cooldown and alive)
   * @returns {boolean}
   */
  canFire() {
    return this.isAlive() && this.fireCooldown <= 0;
  }

  /**
   * Fire a pea projectile
   * @returns {number} Damage dealt (0 if cannot fire)
   */
  fire() {
    if (!this.canFire()) {
      return 0;
    }

    // Set cooldown
    this.fireCooldown = PEASHOOTER_CONFIG.fireRate;

    return PEASHOOTER_CONFIG.peaDamage;
  }

  /**
   * Update fire cooldown
   * @param {number} deltaSeconds - Time elapsed in seconds
   */
  updateCooldown(deltaSeconds) {
    if (this.fireCooldown > 0) {
      this.fireCooldown = Math.max(0, this.fireCooldown - deltaSeconds);
    }
  }

  /**
   * Get grid key for cell tracking
   * @returns {string} "lane,col" format
   */
  getGridKey() {
    return `${this.lane},${this.col}`;
  }

  /**
   * Check if plant is at specified cell
   * @param {number} lane
   * @param {number} col
   * @returns {boolean}
   */
  isAtCell(lane, col) {
    return this.lane === lane && this.col === col;
  }

  /**
   * Get the fire rate for this plant
   * @returns {number} Seconds between shots
   */
  getFireRate() {
    return PEASHOOTER_CONFIG.fireRate;
  }

  /**
   * Get pea damage for this plant
   * @returns {number}
   */
  getPeaDamage() {
    return PEASHOOTER_CONFIG.peaDamage;
  }
}

// Static ID counter for unique plant IDs
Peashooter.nextId = 1;
