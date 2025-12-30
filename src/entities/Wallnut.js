// src/entities/Wallnut.js
// Wallnut plant entity - defensive plant with high HP, no attack

// Wallnut configuration
export const WALLNUT_CONFIG = {
  cost: 50,         // Sun cost (cheap defensive option)
  hp: 20,           // High HP - can absorb many zombie hits
  canAttack: false  // Wallnut cannot attack, only defends
};

/**
 * Wallnut plant entity class
 * Defensive plant that blocks zombies but cannot attack
 * Note: This is a pure logic class - rendering is handled by PlantManager
 */
export class Wallnut {
  /**
   * Create a new Wallnut
   * @param {Object} options
   * @param {number} options.lane - Lane index (0-2)
   * @param {number} options.col - Column index (1-8, not house zone)
   */
  constructor(options = {}) {
    this.lane = options.lane ?? 0;
    this.col = options.col ?? 1;
    this.hp = WALLNUT_CONFIG.hp;
    this.maxHp = this.hp;

    // Unique ID for tracking
    this.id = Wallnut.nextId++;

    // Plant type identifier
    this.type = 'wallnut';
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
   * Check if plant can fire (wallnut cannot)
   * @returns {boolean}
   */
  canFire() {
    return false;
  }

  /**
   * Fire attempt (wallnut cannot fire)
   * @returns {number} Always 0
   */
  fire() {
    return 0;
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
}

// Static ID counter for unique plant IDs
Wallnut.nextId = 1;
