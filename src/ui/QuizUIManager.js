// src/ui/QuizUIManager.js
// Phaser integration for QuizUI

import { QuizUI, QUIZ_UI_CONFIG } from './QuizUI.js';

/**
 * QuizUIManager handles Phaser rendering and input for QuizUI
 * Note: Timer removed per S4-003 - quizzes have no time limit
 */
export class QuizUIManager {
  constructor(scene, gridConfig) {
    this.scene = scene;
    this.gridConfig = gridConfig;
    this.quizUI = new QuizUI({
      gameWidth: scene.scale.width,
      gameHeight: scene.scale.height
    });

    // Phaser game objects
    this.container = null;
    this.panelBg = null;
    this.questionText = null;
    this.answerButtons = [];
    this.explanationText = null;
    this.continueButton = null;

    // Callbacks
    this.onAnswerSubmit = null;
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
    const result = this.quizUI.submitAnswer();

    if (result) {
      result.isTimeout = false;  // No timer means no timeout
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
    if (this.container) {
      this.container.destroy(true);
      this.container = null;
    }
    this.panelBg = null;
    this.questionText = null;
    this.answerButtons = [];
    this.explanationText = null;
    this.continueButton = null;
  }

  /**
   * Check if quiz is currently active
   * @returns {boolean}
   */
  isActive() {
    return this.quizUI.isActive();
  }
}
