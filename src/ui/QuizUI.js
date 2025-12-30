// src/ui/QuizUI.js
// Quiz UI component for displaying questions and answers

/**
 * Quiz UI configuration
 */
export const QUIZ_UI_CONFIG = {
  panelWidth: 600,
  panelHeight: 400,
  buttonWidth: 250,
  buttonHeight: 60,
  buttonGap: 20,
  correctColor: 0x4CAF50,   // Green
  wrongColor: 0xF44336,     // Red
  normalColor: 0x2196F3,    // Blue
  hoverColor: 0x42A5F5,     // Light blue
  selectedColor: 0x1976D2,  // Dark blue
  panelColor: 0x1a1a2e,     // Dark panel
  textColor: '#ffffff'
};

/**
 * QuizUI handles question display and answer selection logic
 * This is a pure JS class for testability
 * Phaser rendering is done by QuizUIManager
 */
export class QuizUI {
  constructor(options = {}) {
    this.gameWidth = options.gameWidth || 800;
    this.gameHeight = options.gameHeight || 600;

    this.currentQuestion = null;
    this.selectedAnswer = null;
    this.active = false;
    this.locked = false;
  }

  /**
   * Check if quiz panel is currently active/visible
   * @returns {boolean}
   */
  isActive() {
    return this.active;
  }

  /**
   * Check if selection is locked (after submission)
   * @returns {boolean}
   */
  isLocked() {
    return this.locked;
  }

  /**
   * Get the currently selected answer index
   * @returns {number|null}
   */
  getSelectedAnswer() {
    return this.selectedAnswer;
  }

  /**
   * Get the current question object
   * @returns {Object|null}
   */
  getCurrentQuestion() {
    return this.currentQuestion;
  }

  /**
   * Show a question in the quiz panel
   * @param {Object} question - Question object with question, answers, correctIndex
   */
  showQuestion(question) {
    this.currentQuestion = question;
    this.selectedAnswer = null;
    this.active = true;
    this.locked = false;
  }

  /**
   * Select an answer by index
   * @param {number} index - Answer index (0-3)
   * @returns {boolean} True if selection was valid
   */
  selectAnswer(index) {
    // Validate bounds
    if (index < 0 || index > 3) {
      return false;
    }

    // Don't allow selection if locked
    if (this.locked) {
      return false;
    }

    this.selectedAnswer = index;
    return true;
  }

  /**
   * Lock the current selection (prevent further changes)
   */
  lockSelection() {
    this.locked = true;
  }

  /**
   * Check if the selected answer is correct
   * @returns {boolean|null} True if correct, false if wrong, null if no selection
   */
  isAnswerCorrect() {
    if (this.selectedAnswer === null || !this.currentQuestion) {
      return null;
    }
    return this.selectedAnswer === this.currentQuestion.correctIndex;
  }

  /**
   * Submit the current answer
   * @returns {Object|null} Result object or null if cannot submit
   */
  submitAnswer() {
    // Cannot submit without selection
    if (this.selectedAnswer === null) {
      return null;
    }

    // Cannot submit if already locked
    if (this.locked) {
      return null;
    }

    // Lock selection
    this.lockSelection();

    // Return result
    return {
      selectedIndex: this.selectedAnswer,
      correctIndex: this.currentQuestion.correctIndex,
      isCorrect: this.isAnswerCorrect(),
      question: this.currentQuestion
    };
  }

  /**
   * Hide the quiz panel
   */
  hide() {
    this.active = false;
    this.currentQuestion = null;
    this.selectedAnswer = null;
    this.locked = false;
  }

  /**
   * Get the centered panel position
   * @returns {{x: number, y: number}}
   */
  getPanelPosition() {
    return {
      x: this.gameWidth / 2,
      y: this.gameHeight / 2
    };
  }

  /**
   * Get positions for the 4 answer buttons in a 2x2 grid
   * @returns {Array<{x: number, y: number, index: number}>}
   */
  getAnswerButtonPositions() {
    const panelPos = this.getPanelPosition();
    const { buttonWidth, buttonHeight, buttonGap } = QUIZ_UI_CONFIG;

    // Calculate grid layout
    const totalWidth = buttonWidth * 2 + buttonGap;
    const totalHeight = buttonHeight * 2 + buttonGap;
    const startX = panelPos.x - totalWidth / 2 + buttonWidth / 2;
    const startY = panelPos.y + 50; // Below question text

    return [
      { x: startX, y: startY, index: 0 },                                    // Top-left
      { x: startX + buttonWidth + buttonGap, y: startY, index: 1 },          // Top-right
      { x: startX, y: startY + buttonHeight + buttonGap, index: 2 },         // Bottom-left
      { x: startX + buttonWidth + buttonGap, y: startY + buttonHeight + buttonGap, index: 3 }  // Bottom-right
    ];
  }
}
