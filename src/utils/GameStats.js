// src/utils/GameStats.js
// Game statistics tracking for victory/defeat display

/**
 * Random tips to show on defeat screen
 */
export const DEFEAT_TIPS = [
  "Answer questions correctly to earn money for plants!",
  "Each wrong answer costs you 30 money!",
  "Cover all lanes with plants to stop zombies!",
  "Faster answers = more time for strategy!",
  "Don't let zombies reach your house!",
  "Place plants early to build up defenses!",
  "Watch the timer - timeouts count as wrong answers!"
];

/**
 * GameStats tracks all game metrics for end-game display
 */
export class GameStats {
  constructor() {
    this.reset();
  }

  /**
   * Reset all stats to initial values
   */
  reset() {
    this.wavesCompleted = 0;
    this.totalWaves = 5;
    this.questionsAnswered = 0;
    this.questionsCorrect = 0;
    this.questionsWrong = 0;
    this.questionsTimeout = 0;
    this.moneyEarned = 0;
    this.moneyLost = 0;
    this.finalMoney = 0;
    this.plantsPlaced = 0;
    this.zombiesKilled = 0;
    this.gameResult = 'playing'; // 'playing' | 'victory' | 'defeat'
  }

  /**
   * Set total number of waves
   * @param {number} total
   */
  setTotalWaves(total) {
    this.totalWaves = total;
  }

  /**
   * Record wave completion
   */
  recordWaveComplete() {
    this.wavesCompleted++;
  }

  /**
   * Record a correct answer
   */
  recordCorrectAnswer() {
    this.questionsAnswered++;
    this.questionsCorrect++;
  }

  /**
   * Record a wrong answer
   */
  recordWrongAnswer() {
    this.questionsAnswered++;
    this.questionsWrong++;
  }

  /**
   * Record a timeout (counts as wrong)
   */
  recordTimeout() {
    this.questionsAnswered++;
    this.questionsTimeout++;
  }

  /**
   * Calculate accuracy percentage
   * @returns {number} 0-100
   */
  getAccuracy() {
    if (this.questionsAnswered === 0) return 0;
    return Math.round((this.questionsCorrect / this.questionsAnswered) * 100);
  }

  /**
   * Record money earned
   * @param {number} amount
   */
  recordMoneyEarned(amount) {
    this.moneyEarned += amount;
  }

  /**
   * Record money lost
   * @param {number} amount
   */
  recordMoneyLost(amount) {
    this.moneyLost += amount;
  }

  /**
   * Set final money amount
   * @param {number} amount
   */
  setFinalMoney(amount) {
    this.finalMoney = amount;
  }

  /**
   * Record plant placement
   */
  recordPlantPlaced() {
    this.plantsPlaced++;
  }

  /**
   * Record zombie kill
   */
  recordZombieKilled() {
    this.zombiesKilled++;
  }

  /**
   * Record victory
   */
  recordVictory() {
    this.gameResult = 'victory';
  }

  /**
   * Record defeat
   */
  recordDefeat() {
    this.gameResult = 'defeat';
  }

  /**
   * Get a random defeat tip
   * @returns {string}
   */
  getRandomDefeatTip() {
    const index = Math.floor(Math.random() * DEFEAT_TIPS.length);
    return DEFEAT_TIPS[index];
  }

  /**
   * Get complete stats summary
   * @returns {Object}
   */
  getSummary() {
    return {
      wavesCompleted: this.wavesCompleted,
      totalWaves: this.totalWaves,
      questionsAnswered: this.questionsAnswered,
      questionsCorrect: this.questionsCorrect,
      questionsWrong: this.questionsWrong,
      questionsTimeout: this.questionsTimeout,
      accuracy: this.getAccuracy(),
      moneyEarned: this.moneyEarned,
      moneyLost: this.moneyLost,
      finalMoney: this.finalMoney,
      plantsPlaced: this.plantsPlaced,
      zombiesKilled: this.zombiesKilled,
      gameResult: this.gameResult
    };
  }
}
