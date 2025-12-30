// src/ui/QuizUIManager.js
// Phaser integration for QuizUI

import { QuizUI, QUIZ_UI_CONFIG } from './QuizUI.js';
import { QuizTimer, TIMER_CONFIG } from '../utils/QuizTimer.js';

/**
 * QuizUIManager handles Phaser rendering and input for QuizUI
 */
export class QuizUIManager {
  constructor(scene, gridConfig) {
    this.scene = scene;
    this.gridConfig = gridConfig;
    this.quizUI = new QuizUI({
      gameWidth: scene.scale.width,
      gameHeight: scene.scale.height
    });
    this.timer = new QuizTimer();

    // Phaser game objects
    this.container = null;
    this.panelBg = null;
    this.questionText = null;
    this.answerButtons = [];
    this.explanationText = null;
    this.continueButton = null;
    this.timerBar = null;
    this.timerBarBg = null;
    this.timerText = null;

    // Callbacks
    this.onAnswerSubmit = null;
    this.timerUpdateEvent = null;
  }

  /**
   * Show a question with full UI
   * @param {Object} question - Question object
   * @param {Function} onSubmit - Callback when answer is submitted: (result) => void
   */
  showQuestion(question, onSubmit) {
    this.quizUI.showQuestion(question);
    this.onAnswerSubmit = onSubmit;
    this.createUI();
    this.startTimer();
  }

  /**
   * Start the countdown timer
   */
  startTimer() {
    this.timer.start();

    // Update timer every 50ms for smooth animation
    this.timerUpdateEvent = this.scene.time.addEvent({
      delay: 50,
      callback: () => this.updateTimer(50),
      loop: true
    });
  }

  /**
   * Update timer and visual elements
   * @param {number} deltaMs
   */
  updateTimer(deltaMs) {
    if (!this.timer.isActive()) return;

    this.timer.update(deltaMs);
    this.updateTimerVisuals();

    // Check for timeout
    if (this.timer.isExpired()) {
      this.handleTimeout();
    }
  }

  /**
   * Update timer bar and text visuals
   */
  updateTimerVisuals() {
    if (!this.timerBar) return;

    const progress = this.timer.getProgress();
    const state = this.timer.getState();

    // Update bar width
    const maxWidth = QUIZ_UI_CONFIG.panelWidth - 60;
    this.timerBar.width = maxWidth * progress;

    // Update color based on state
    const colors = {
      safe: 0x4CAF50,     // Green
      caution: 0xFFC107,  // Yellow
      warning: 0xF44336,  // Red
      expired: 0x666666   // Gray
    };
    this.timerBar.setFillStyle(colors[state]);

    // Update text
    if (this.timerText) {
      this.timerText.setText(this.timer.getDisplayTime());
      this.timerText.setColor(state === 'warning' ? '#F44336' : '#ffffff');
    }
  }

  /**
   * Handle timer expiration (timeout)
   */
  handleTimeout() {
    // Stop timer updates
    if (this.timerUpdateEvent) {
      this.timerUpdateEvent.remove();
      this.timerUpdateEvent = null;
    }

    // Lock quiz and create timeout result
    this.quizUI.lockSelection();

    const question = this.quizUI.getCurrentQuestion();
    const result = {
      selectedIndex: -1,  // No selection
      correctIndex: question.correctIndex,
      isCorrect: false,
      isTimeout: true,
      question: question
    };

    // Show timeout feedback
    this.showTimeoutFeedback(result);
  }

  /**
   * Show timeout feedback
   * @param {Object} result
   */
  showTimeoutFeedback(result) {
    // Highlight correct answer
    const correctBtn = this.answerButtons[result.correctIndex];
    if (correctBtn) {
      correctBtn.button.setFillStyle(QUIZ_UI_CONFIG.correctColor);
    }

    // Show timeout message
    const panelPos = this.quizUI.getPanelPosition();
    const timeoutText = this.scene.add.text(
      panelPos.x,
      panelPos.y + QUIZ_UI_CONFIG.panelHeight / 2 - 80,
      'Hết giờ! (Time\'s up!)',
      {
        fontSize: '20px',
        fill: '#F44336',
        fontStyle: 'bold'
      }
    ).setOrigin(0.5);
    this.container.add(timeoutText);

    // Show continue button
    this.showContinueButton(result);
  }

  /**
   * Create the Phaser UI elements
   */
  createUI() {
    if (this.container) {
      this.destroyUI();
    }

    const { panelWidth, panelHeight, panelColor } = QUIZ_UI_CONFIG;
    const panelPos = this.quizUI.getPanelPosition();

    // Create container for all quiz elements
    this.container = this.scene.add.container(0, 0);
    this.container.setDepth(1000); // Ensure on top

    // Semi-transparent overlay
    const overlay = this.scene.add.rectangle(
      this.scene.scale.width / 2,
      this.scene.scale.height / 2,
      this.scene.scale.width,
      this.scene.scale.height,
      0x000000,
      0.7
    );
    this.container.add(overlay);

    // Panel background
    this.panelBg = this.scene.add.rectangle(
      panelPos.x,
      panelPos.y,
      panelWidth,
      panelHeight,
      panelColor
    );
    this.panelBg.setStrokeStyle(3, 0x4a4a6a);
    this.container.add(this.panelBg);

    // Timer bar background
    const timerBarWidth = panelWidth - 60;
    const timerBarHeight = 20;
    const timerBarY = panelPos.y - panelHeight / 2 + 30;

    this.timerBarBg = this.scene.add.rectangle(
      panelPos.x,
      timerBarY,
      timerBarWidth,
      timerBarHeight,
      0x333333
    );
    this.container.add(this.timerBarBg);

    // Timer bar (shrinking)
    this.timerBar = this.scene.add.rectangle(
      panelPos.x - timerBarWidth / 2,
      timerBarY,
      timerBarWidth,
      timerBarHeight - 4,
      0x4CAF50
    );
    this.timerBar.setOrigin(0, 0.5);
    this.container.add(this.timerBar);

    // Timer text
    this.timerText = this.scene.add.text(
      panelPos.x + timerBarWidth / 2 + 20,
      timerBarY,
      '12',
      { fontSize: '16px', fill: '#ffffff', fontStyle: 'bold' }
    ).setOrigin(0, 0.5);
    this.container.add(this.timerText);

    // Question text
    const question = this.quizUI.getCurrentQuestion();
    this.questionText = this.scene.add.text(
      panelPos.x,
      panelPos.y - panelHeight / 2 + 80,
      question.question,
      {
        fontSize: '22px',
        fill: QUIZ_UI_CONFIG.textColor,
        wordWrap: { width: panelWidth - 60 },
        align: 'center'
      }
    ).setOrigin(0.5);
    this.container.add(this.questionText);

    // Answer buttons
    this.createAnswerButtons();
  }

  /**
   * Create the 4 answer buttons
   */
  createAnswerButtons() {
    const question = this.quizUI.getCurrentQuestion();
    const positions = this.quizUI.getAnswerButtonPositions();
    const { buttonWidth, buttonHeight, normalColor, hoverColor } = QUIZ_UI_CONFIG;

    this.answerButtons = [];

    positions.forEach((pos, index) => {
      // Button background
      const button = this.scene.add.rectangle(
        pos.x,
        pos.y,
        buttonWidth,
        buttonHeight,
        normalColor
      );
      button.setStrokeStyle(2, 0x1565C0);
      button.setInteractive({ useHandCursor: true });

      // Button text
      const text = this.scene.add.text(
        pos.x,
        pos.y,
        question.answers[index],
        {
          fontSize: '16px',
          fill: '#ffffff',
          wordWrap: { width: buttonWidth - 20 },
          align: 'center'
        }
      ).setOrigin(0.5);

      // Store reference
      this.answerButtons.push({ button, text, index });
      this.container.add(button);
      this.container.add(text);

      // Hover effects
      button.on('pointerover', () => {
        if (!this.quizUI.isLocked()) {
          button.setFillStyle(hoverColor);
        }
      });

      button.on('pointerout', () => {
        if (!this.quizUI.isLocked()) {
          const isSelected = this.quizUI.getSelectedAnswer() === index;
          button.setFillStyle(isSelected ? QUIZ_UI_CONFIG.selectedColor : normalColor);
        }
      });

      // Click to select and submit
      button.on('pointerdown', () => {
        if (!this.quizUI.isLocked()) {
          this.handleAnswerClick(index);
        }
      });
    });
  }

  /**
   * Handle answer button click
   * @param {number} index - Answer index
   */
  handleAnswerClick(index) {
    // Select answer
    this.quizUI.selectAnswer(index);

    // Update button visuals
    this.updateButtonVisuals();

    // Submit answer immediately
    this.submitAnswer();
  }

  /**
   * Update button visuals based on selection
   */
  updateButtonVisuals() {
    const selectedIndex = this.quizUI.getSelectedAnswer();
    const { normalColor, selectedColor } = QUIZ_UI_CONFIG;

    this.answerButtons.forEach((btn, i) => {
      const isSelected = i === selectedIndex;
      btn.button.setFillStyle(isSelected ? selectedColor : normalColor);
    });
  }

  /**
   * Submit the selected answer
   */
  submitAnswer() {
    // Stop timer
    this.timer.stop();
    if (this.timerUpdateEvent) {
      this.timerUpdateEvent.remove();
      this.timerUpdateEvent = null;
    }

    const result = this.quizUI.submitAnswer();

    if (result) {
      result.isTimeout = false;  // Mark as not timeout
      this.showFeedback(result);
    }
  }

  /**
   * Show correct/wrong feedback
   * @param {Object} result - Submission result
   */
  showFeedback(result) {
    const { correctColor, wrongColor } = QUIZ_UI_CONFIG;

    // Highlight selected button
    const selectedBtn = this.answerButtons[result.selectedIndex];
    selectedBtn.button.setFillStyle(result.isCorrect ? correctColor : wrongColor);

    // If wrong, also highlight correct answer
    if (!result.isCorrect) {
      const correctBtn = this.answerButtons[result.correctIndex];
      correctBtn.button.setFillStyle(correctColor);
    }

    // Show explanation
    const question = this.quizUI.getCurrentQuestion();
    if (question.explanation) {
      const panelPos = this.quizUI.getPanelPosition();
      this.explanationText = this.scene.add.text(
        panelPos.x,
        panelPos.y + QUIZ_UI_CONFIG.panelHeight / 2 - 80,
        question.explanation,
        {
          fontSize: '14px',
          fill: result.isCorrect ? '#4CAF50' : '#F44336',
          wordWrap: { width: QUIZ_UI_CONFIG.panelWidth - 60 },
          align: 'center',
          fontStyle: 'italic'
        }
      ).setOrigin(0.5);
      this.container.add(this.explanationText);
    }

    // Show continue button
    this.showContinueButton(result);
  }

  /**
   * Show continue button after feedback
   * @param {Object} result - Submission result
   */
  showContinueButton(result) {
    const panelPos = this.quizUI.getPanelPosition();

    this.continueButton = this.scene.add.rectangle(
      panelPos.x,
      panelPos.y + QUIZ_UI_CONFIG.panelHeight / 2 - 30,
      150,
      40,
      0x607D8B
    );
    this.continueButton.setStrokeStyle(2, 0x455A64);
    this.continueButton.setInteractive({ useHandCursor: true });

    const continueText = this.scene.add.text(
      panelPos.x,
      panelPos.y + QUIZ_UI_CONFIG.panelHeight / 2 - 30,
      'Tiếp tục',
      { fontSize: '18px', fill: '#ffffff', fontStyle: 'bold' }
    ).setOrigin(0.5);

    this.container.add(this.continueButton);
    this.container.add(continueText);

    // Hover effects
    this.continueButton.on('pointerover', () => {
      this.continueButton.setFillStyle(0x78909C);
    });

    this.continueButton.on('pointerout', () => {
      this.continueButton.setFillStyle(0x607D8B);
    });

    // Click to continue
    this.continueButton.on('pointerdown', () => {
      this.hide();
      if (this.onAnswerSubmit) {
        this.onAnswerSubmit(result);
      }
    });
  }

  /**
   * Hide the quiz UI
   */
  hide() {
    this.quizUI.hide();
    this.destroyUI();
  }

  /**
   * Destroy all Phaser UI elements
   */
  destroyUI() {
    // Stop timer
    this.timer.reset();
    if (this.timerUpdateEvent) {
      this.timerUpdateEvent.remove();
      this.timerUpdateEvent = null;
    }

    if (this.container) {
      this.container.destroy(true);
      this.container = null;
    }
    this.panelBg = null;
    this.questionText = null;
    this.answerButtons = [];
    this.explanationText = null;
    this.continueButton = null;
    this.timerBar = null;
    this.timerBarBg = null;
    this.timerText = null;
  }

  /**
   * Check if quiz is currently active
   * @returns {boolean}
   */
  isActive() {
    return this.quizUI.isActive();
  }
}
