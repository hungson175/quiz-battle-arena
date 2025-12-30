// src/systems/QuestionManager.js
// Loads, shuffles, and serves questions continuously

export default class QuestionManager {
  constructor() {
    this.questions = [];
    this.currentIndex = 0;
  }

  /**
   * Load questions from JSON file
   * @param {string} path - Path to questions JSON
   */
  async loadFromFile(path) {
    try {
      const response = await fetch(path);
      const data = await response.json();
      this.questions = data.questions || [];
      this.shuffle();
      console.log(`[QuestionManager] Loaded ${this.questions.length} questions`);
    } catch (error) {
      console.error('[QuestionManager] Failed to load questions:', error);
      this.questions = [];
    }
  }

  /**
   * Shuffle questions using Fisher-Yates algorithm
   */
  shuffle() {
    for (let i = this.questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
    }
    this.currentIndex = 0;
  }

  /**
   * Get next question (cycles through all questions)
   * @returns {object|null} Question object or null if no questions
   */
  getNextQuestion() {
    if (this.questions.length === 0) {
      return null;
    }

    // Reshuffle if we've gone through all questions
    if (this.currentIndex >= this.questions.length) {
      this.shuffle();
    }

    return this.questions[this.currentIndex++];
  }

  /**
   * Get total question count
   * @returns {number}
   */
  getTotalCount() {
    return this.questions.length;
  }

  /**
   * Reset to beginning
   */
  reset() {
    this.currentIndex = 0;
    this.shuffle();
  }
}
