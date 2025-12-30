// src/utils/MoneyManager.js
// Money management for quiz-based tower defense

// Money configuration from PO decisions
export const MONEY_CONFIG = {
  startingMoney: 200,   // Enough for 2 plants or 1 plant + quiz mistakes
  correctReward: 50,    // Reward for correct answer
  wrongPenalty: 30,     // HARSH penalty for wrong answer
  plantCost: 100        // Cost per plant (Peashooter)
};

/**
 * MoneyManager handles player's money/currency
 * Used for buying plants and quiz rewards/penalties
 */
export class MoneyManager {
  constructor() {
    this.money = MONEY_CONFIG.startingMoney;
  }

  /**
   * Get current money amount
   * @returns {number}
   */
  getMoney() {
    return this.money;
  }

  /**
   * Check if player can afford an amount
   * @param {number} amount
   * @returns {boolean}
   */
  canAfford(amount) {
    return this.money >= amount;
  }

  /**
   * Spend money (deduct from balance)
   * @param {number} amount
   * @returns {boolean} True if successful, false if insufficient funds
   */
  spend(amount) {
    if (!this.canAfford(amount)) {
      return false;
    }
    this.money -= amount;
    return true;
  }

  /**
   * Earn money (add to balance)
   * @param {number} amount
   */
  earn(amount) {
    this.money += amount;
  }

  /**
   * Handle correct quiz answer - earn reward
   */
  correctAnswer() {
    this.earn(MONEY_CONFIG.correctReward);
  }

  /**
   * Handle wrong quiz answer - lose money (can go negative!)
   */
  wrongAnswer() {
    this.money -= MONEY_CONFIG.wrongPenalty;
  }

  /**
   * Check if player can buy a plant
   * @returns {boolean}
   */
  canBuyPlant() {
    return this.canAfford(MONEY_CONFIG.plantCost);
  }

  /**
   * Buy a plant (deduct plant cost)
   * @returns {boolean} True if successful
   */
  buyPlant() {
    return this.spend(MONEY_CONFIG.plantCost);
  }

  /**
   * Reset money to starting amount
   */
  reset() {
    this.money = MONEY_CONFIG.startingMoney;
  }
}
