// src/utils/QuestionManager.js
// Question management for educational quiz game

/**
 * QuestionManager handles loading, shuffling, and tracking questions
 * Supports Vietnamese text and prevents question repetition
 */
export class QuestionManager {
  constructor() {
    this.questions = [];      // All loaded questions
    this.availableQuestions = []; // Questions not yet asked
    this.answeredCount = 0;
  }

  /**
   * Load questions from an array
   * @param {Array} questions - Array of question objects
   */
  loadQuestions(questions) {
    this.questions = [...questions];
    this.availableQuestions = [...questions];
    this.answeredCount = 0;
  }

  /**
   * Load questions from a JSON file (async)
   * @param {string} path - Path to JSON file
   * @returns {Promise<void>}
   */
  async loadFromFile(path) {
    try {
      const response = await fetch(path);
      const data = await response.json();
      this.loadQuestions(data.questions || data);
    } catch (error) {
      console.error('Failed to load questions:', error);
      this.loadQuestions([]);
    }
  }

  /**
   * Shuffle the available questions
   */
  shuffle() {
    for (let i = this.availableQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.availableQuestions[i], this.availableQuestions[j]] =
        [this.availableQuestions[j], this.availableQuestions[i]];
    }
  }

  /**
   * Get the next question (removes from available pool)
   * @returns {Object|null} Question object or null if none available
   */
  getNextQuestion() {
    if (this.availableQuestions.length === 0) {
      return null;
    }

    const question = this.availableQuestions.shift();
    this.answeredCount++;
    return question;
  }

  /**
   * Check if an answer is correct
   * @param {Object} question - The question object
   * @param {number} answerIndex - The selected answer index
   * @returns {boolean}
   */
  checkAnswer(question, answerIndex) {
    return question.correctIndex === answerIndex;
  }

  /**
   * Check if there are more questions available
   * @returns {boolean}
   */
  hasMoreQuestions() {
    return this.availableQuestions.length > 0;
  }

  /**
   * Get total number of questions loaded
   * @returns {number}
   */
  getTotalCount() {
    return this.questions.length;
  }

  /**
   * Get number of questions answered
   * @returns {number}
   */
  getAnsweredCount() {
    return this.answeredCount;
  }

  /**
   * Get number of questions remaining
   * @returns {number}
   */
  getRemainingCount() {
    return this.availableQuestions.length;
  }

  /**
   * Reset to allow all questions again
   */
  reset() {
    this.availableQuestions = [...this.questions];
    this.answeredCount = 0;
    this.shuffle();
  }

  /**
   * Get current question stats
   * @returns {{total: number, answered: number, remaining: number}}
   */
  getStats() {
    return {
      total: this.getTotalCount(),
      answered: this.getAnsweredCount(),
      remaining: this.getRemainingCount()
    };
  }
}
