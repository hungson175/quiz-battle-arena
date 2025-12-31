// src/systems/QuizManager.js
// Orchestrates quiz flow, handles answers, updates economy

import { emitToReact, listenFromReact } from './QuizBridge.js';

export default class QuizManager {
  constructor(questionManager, economyManager) {
    this.questionManager = questionManager;
    this.economyManager = economyManager;
    this.currentQuestion = null;
    this.streak = 0;
    this.correctReward = 30;
    this.wrongPenalty = 10;
    this.resultDisplayTime = 1500; // ms to show result before next question
    this.isWaitingForResult = false;

    // Listen for answers from React
    listenFromReact('quiz:answer', (data) => {
      this.handleAnswer(data.answerIndex);
    });

    console.log('[QuizManager] Initialized');
  }

  /**
   * Start the quiz system
   */
  start() {
    console.log('[QuizManager] Starting quiz');
    this.showNextQuestion();
  }

  /**
   * Show the next question
   */
  showNextQuestion() {
    this.currentQuestion = this.questionManager.getNextQuestion();
    this.isWaitingForResult = false;

    if (!this.currentQuestion) {
      console.warn('[QuizManager] No questions available');
      return;
    }

    emitToReact('quiz:show', {
      question: this.currentQuestion,
      streak: this.streak,
      gold: this.economyManager.getMoney()
    });
  }

  /**
   * Handle answer from player
   * @param {number} answerIndex - Index of selected answer
   */
  handleAnswer(answerIndex) {
    if (!this.currentQuestion || this.isWaitingForResult) {
      return;
    }

    this.isWaitingForResult = true;
    const isCorrect = answerIndex === this.currentQuestion.correctIndex;

    if (isCorrect) {
      this.economyManager.addMoney(this.correctReward);
      this.streak++;
    } else {
      this.economyManager.spendMoney(this.wrongPenalty);
      this.streak = 0;
    }

    // CRITICAL: Emit UI update event to sync Phaser UI with new gold value
    this.economyManager.scene.events.emit('updateUI', {
      money: this.economyManager.getMoney(),
      score: this.economyManager.getScore(),
      lives: this.economyManager.getLives()
    });

    // Emit result to React
    emitToReact('quiz:result', {
      correct: isCorrect,
      correctIndex: this.currentQuestion.correctIndex,
      goldChange: isCorrect ? this.correctReward : -this.wrongPenalty,
      streak: this.streak,
      gold: this.economyManager.getMoney()
    });

    // Auto-advance after delay
    setTimeout(() => this.showNextQuestion(), this.resultDisplayTime);
  }

  /**
   * Get current stats
   * @returns {object}
   */
  getStats() {
    return {
      streak: this.streak,
      gold: this.economyManager.getMoney()
    };
  }

  /**
   * Reset quiz state
   */
  reset() {
    this.streak = 0;
    this.currentQuestion = null;
    this.isWaitingForResult = false;
    this.questionManager.reset();
  }
}
