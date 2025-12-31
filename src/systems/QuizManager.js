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
    this.resultTimeout = null; // Track setTimeout for cleanup

    // Listen for answers from React (store unsubscribe for cleanup)
    this.unsubscribeAnswer = listenFromReact('quiz:answer', (data) => {
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
    const originalQuestion = this.questionManager.getNextQuestion();
    this.isWaitingForResult = false;

    if (!originalQuestion) {
      console.warn('[QuizManager] No questions available');
      return;
    }

    // Shuffle answers and track new correct index
    const shuffledQuestion = this.shuffleAnswers(originalQuestion);
    this.currentQuestion = shuffledQuestion;

    emitToReact('quiz:show', {
      question: shuffledQuestion,
      streak: this.streak,
      gold: this.economyManager.getMoney()
    });
  }

  /**
   * Shuffle answers and update correctIndex
   * @param {object} question - Original question with answers and correctIndex
   * @returns {object} Question with shuffled answers and updated correctIndex
   */
  shuffleAnswers(question) {
    // Create array of {answer, isCorrect} pairs
    const answerPairs = question.answers.map((answer, index) => ({
      answer,
      isCorrect: index === question.correctIndex
    }));

    // Fisher-Yates shuffle
    for (let i = answerPairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answerPairs[i], answerPairs[j]] = [answerPairs[j], answerPairs[i]];
    }

    // Reconstruct question with shuffled answers
    return {
      ...question,
      answers: answerPairs.map(pair => pair.answer),
      correctIndex: answerPairs.findIndex(pair => pair.isCorrect)
    };
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

    // Auto-advance after delay (track for cleanup)
    this.resultTimeout = setTimeout(() => this.showNextQuestion(), this.resultDisplayTime);
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
    // Clear any pending timeout
    if (this.resultTimeout) {
      clearTimeout(this.resultTimeout);
      this.resultTimeout = null;
    }
    this.streak = 0;
    this.currentQuestion = null;
    this.isWaitingForResult = false;
    this.questionManager.reset();
  }

  /**
   * Destroy manager and clean up event listeners
   * Must be called before scene restart to prevent duplicate listeners
   */
  destroy() {
    this.reset();
    // Remove window event listener to prevent duplicates on restart
    if (this.unsubscribeAnswer) {
      this.unsubscribeAnswer();
      this.unsubscribeAnswer = null;
    }
    console.log('[QuizManager] Destroyed');
  }
}
