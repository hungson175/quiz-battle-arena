import Phaser from 'phaser';
import { calculateAccuracy, getAccuracyColor } from '../utils/GameStats.js';

/**
 * GameOverScene - Dedicated game over screen (Sprint 2B)
 * Two states: defeat (health depleted) vs victory (all questions answered)
 * Displays detailed statistics and provides restart/menu options
 */
export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' });

    // Vietnamese text constants
    this.MESSAGES = {
      gameOver: {
        healthDepleted: 'Hết cơ hội! Thử lại nhé!',
        victory: 'Hoàn thành! Xuất sắc!'
      },
      stats: {
        score: 'Điểm số cuối cùng',
        correct: 'Câu đúng',
        wrong: 'Câu sai',
        accuracy: 'Tỷ lệ chính xác'
      },
      buttons: {
        tryAgain: 'Chơi lại',
        mainMenu: 'Menu chính'
      }
    };

    // Design constants
    this.COLORS = {
      primary: '#4ECDC4',
      coral: '#FF6B6B',
      mint: '#95E1D3',
      yellow: '#FFD93D',
      darkGray: '#333333',
      mediumGray: '#666666',
      white: '#FFFFFF'
    };
  }

  /**
   * Initialize with data from GameScene
   * @param {Object} data - Game data from GameScene
   */
  init(data) {
    this.finalScore = data.score || 0;
    this.correctCount = data.correctCount || 0;
    this.wrongCount = data.wrongCount || 0;
    this.totalQuestions = data.totalQuestions || 15;
    this.reason = data.reason || 'health_depleted'; // 'health_depleted' or 'victory'
  }

  create() {
    // Calculate accuracy
    this.accuracy = calculateAccuracy(this.correctCount, this.totalQuestions);
    this.accuracyColor = getAccuracyColor(this.accuracy);

    // Create UI elements
    this.createBackground();
    this.createModalBox();
    this.createTitle();
    this.createScoreDisplay();
    this.createStats();
    this.createButtons();

    // Staggered animations
    this.animateContent();
  }

  /**
   * Create semi-transparent background overlay
   */
  createBackground() {
    this.overlay = this.add.rectangle(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      800, 600,
      0x000000, 0.7
    );
  }

  /**
   * Create modal box container
   * GD Spec: 500px × 400px, white background, color-coded border
   */
  createModalBox() {
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    // Border color based on game over reason
    const borderColor = this.reason === 'victory' ? 0x4ECDC4 : 0xFF6B6B;

    this.modalBox = this.add.rectangle(
      centerX, centerY,
      500, 400,
      0xFFFFFF
    );
    this.modalBox.setStrokeStyle(4, borderColor);

    // Initial state for animation
    this.modalBox.setScale(0.8);
    this.modalBox.setAlpha(0);
  }

  /**
   * Create title section
   * Different message and color based on defeat vs victory
   */
  createTitle() {
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    const titleText = this.reason === 'victory'
      ? this.MESSAGES.gameOver.victory
      : this.MESSAGES.gameOver.healthDepleted;

    const titleColor = this.reason === 'victory'
      ? this.COLORS.primary
      : this.COLORS.coral;

    this.titleText = this.add.text(centerX, centerY - 100, titleText, {
      fontSize: '32px',
      fontStyle: 'bold',
      color: titleColor,
      fontFamily: 'Arial, sans-serif'
    });
    this.titleText.setOrigin(0.5);
    this.titleText.setAlpha(0); // For staggered animation
  }

  /**
   * Create score display with background container
   * GD Spec: Large score number, light gray background
   */
  createScoreDisplay() {
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    // Score container background
    this.scoreBg = this.add.rectangle(
      centerX, centerY - 40,
      400, 80,
      0xF7F7F7
    );
    this.scoreBg.setStrokeStyle(0);

    // Score label
    this.scoreLabel = this.add.text(centerX, centerY - 55, this.MESSAGES.stats.score + ':', {
      fontSize: '20px',
      color: this.COLORS.mediumGray,
      fontFamily: 'Arial, sans-serif'
    });
    this.scoreLabel.setOrigin(0.5);

    // Score number
    this.scoreNumber = this.add.text(centerX, centerY - 25, this.finalScore.toString(), {
      fontSize: '48px',
      fontStyle: 'bold',
      color: this.COLORS.primary,
      fontFamily: 'Arial, sans-serif'
    });
    this.scoreNumber.setOrigin(0.5);

    // Set alpha for staggered animation
    this.scoreBg.setAlpha(0);
    this.scoreLabel.setAlpha(0);
    this.scoreNumber.setAlpha(0);
  }

  /**
   * Create statistics section
   * GD Spec: Correct/wrong counts, accuracy percentage with color coding
   */
  createStats() {
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    const statsY = centerY + 40;
    const lineHeight = 30;

    // Correct count
    this.correctStat = this.add.text(
      centerX,
      statsY,
      `• ${this.MESSAGES.stats.correct}: ${this.correctCount} / ${this.totalQuestions}`,
      {
        fontSize: '20px',
        color: this.COLORS.mint,
        fontFamily: 'Arial, sans-serif'
      }
    );
    this.correctStat.setOrigin(0.5);
    this.correctStat.setAlpha(0);

    // Wrong count
    this.wrongStat = this.add.text(
      centerX,
      statsY + lineHeight,
      `• ${this.MESSAGES.stats.wrong}: ${this.wrongCount} / ${this.totalQuestions}`,
      {
        fontSize: '20px',
        color: this.COLORS.coral,
        fontFamily: 'Arial, sans-serif'
      }
    );
    this.wrongStat.setOrigin(0.5);
    this.wrongStat.setAlpha(0);

    // Accuracy with color coding
    this.accuracyStat = this.add.text(
      centerX,
      statsY + lineHeight * 2,
      `• ${this.MESSAGES.stats.accuracy}: ${this.accuracy}%`,
      {
        fontSize: '20px',
        color: this.accuracyColor,
        fontFamily: 'Arial, sans-serif'
      }
    );
    this.accuracyStat.setOrigin(0.5);
    this.accuracyStat.setAlpha(0);
  }

  /**
   * Create action buttons
   * GD Spec: "Try Again" (primary) and "Main Menu" (secondary)
   */
  createButtons() {
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    const buttonY = centerY + 140;
    const spacing = 100;

    // "Try Again" button (primary)
    this.tryAgainButton = this.add.rectangle(
      centerX - spacing,
      buttonY,
      180, 60,
      0x4ECDC4
    );
    this.tryAgainButton.setInteractive({ useHandCursor: true });
    this.tryAgainButton.on('pointerdown', () => this.restartGame());

    // Hover effects
    this.tryAgainButton.on('pointerover', () => {
      this.tryAgainButton.setFillStyle(0x3BA99C);
      this.tweens.add({
        targets: this.tryAgainButton,
        scaleX: 1.05,
        scaleY: 1.05,
        duration: 100
      });
    });
    this.tryAgainButton.on('pointerout', () => {
      this.tryAgainButton.setFillStyle(0x4ECDC4);
      this.tweens.add({
        targets: this.tryAgainButton,
        scaleX: 1.0,
        scaleY: 1.0,
        duration: 100
      });
    });

    this.tryAgainText = this.add.text(
      centerX - spacing,
      buttonY,
      this.MESSAGES.buttons.tryAgain,
      {
        fontSize: '22px',
        fontStyle: 'bold',
        color: this.COLORS.white,
        fontFamily: 'Arial, sans-serif'
      }
    );
    this.tryAgainText.setOrigin(0.5);

    // "Main Menu" button (secondary - placeholder)
    this.mainMenuButton = this.add.rectangle(
      centerX + spacing,
      buttonY,
      180, 60,
      0xFFFFFF
    );
    this.mainMenuButton.setStrokeStyle(2, 0x4ECDC4);
    this.mainMenuButton.setInteractive({ useHandCursor: true });
    this.mainMenuButton.on('pointerdown', () => this.goToMainMenu());

    // Hover effects
    this.mainMenuButton.on('pointerover', () => {
      this.mainMenuButton.setFillStyle(0xF0F9F8);
      this.mainMenuButton.setStrokeStyle(3, 0x4ECDC4);
      this.tweens.add({
        targets: this.mainMenuButton,
        scaleX: 1.05,
        scaleY: 1.05,
        duration: 100
      });
    });
    this.mainMenuButton.on('pointerout', () => {
      this.mainMenuButton.setFillStyle(0xFFFFFF);
      this.mainMenuButton.setStrokeStyle(2, 0x4ECDC4);
      this.tweens.add({
        targets: this.mainMenuButton,
        scaleX: 1.0,
        scaleY: 1.0,
        duration: 100
      });
    });

    this.mainMenuText = this.add.text(
      centerX + spacing,
      buttonY,
      this.MESSAGES.buttons.mainMenu,
      {
        fontSize: '22px',
        fontStyle: 'bold',
        color: this.COLORS.primary,
        fontFamily: 'Arial, sans-serif'
      }
    );
    this.mainMenuText.setOrigin(0.5);

    // Set alpha for staggered animation
    this.tryAgainButton.setAlpha(0);
    this.tryAgainText.setAlpha(0);
    this.mainMenuButton.setAlpha(0);
    this.mainMenuText.setAlpha(0);
  }

  /**
   * Animate content with staggered timing
   * GD Spec: Modal → title → score → stats → buttons
   */
  animateContent() {
    // Modal box zoom in
    this.tweens.add({
      targets: this.modalBox,
      scale: 1.0,
      alpha: 1,
      duration: 400,
      ease: 'Back.easeOut'
    });

    // Title (immediate after modal)
    this.tweens.add({
      targets: this.titleText,
      alpha: 1,
      duration: 300,
      delay: 100
    });

    // Score display (200ms delay)
    this.tweens.add({
      targets: [this.scoreBg, this.scoreLabel, this.scoreNumber],
      alpha: 1,
      duration: 300,
      delay: 300
    });

    // Victory sparkle animation (if victory)
    if (this.reason === 'victory') {
      this.time.delayedCall(500, () => {
        this.createSparkleEffect();
      });
    }

    // Stats (400ms delay)
    this.tweens.add({
      targets: [this.correctStat, this.wrongStat, this.accuracyStat],
      alpha: 1,
      duration: 300,
      delay: 500
    });

    // Buttons (600ms delay)
    this.tweens.add({
      targets: [this.tryAgainButton, this.tryAgainText, this.mainMenuButton, this.mainMenuText],
      alpha: 1,
      duration: 300,
      delay: 700
    });
  }

  /**
   * Create sparkle effect for victory (optional enhancement)
   * GD Spec: Small stars around score number
   */
  createSparkleEffect() {
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY - 25;

    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI * 2 * i) / 6;
      const radius = 60;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      const star = this.add.text(x, y, '✨', {
        fontSize: '20px'
      });
      star.setOrigin(0.5);
      star.setAlpha(0);

      // Sparkle animation (fade in, float up, fade out)
      this.tweens.add({
        targets: star,
        alpha: 1,
        y: y - 20,
        duration: 800,
        ease: 'Sine.easeOut',
        yoyo: true,
        repeat: 2,
        onComplete: () => star.destroy()
      });
    }
  }

  /**
   * Restart game
   * Return to GameScene with reset state
   */
  restartGame() {
    this.scene.start('GameScene');
  }

  /**
   * Go to main menu (Sprint 3)
   * Transition back to MenuScene
   */
  goToMainMenu() {
    // Sprint 3: Navigate to MenuScene
    this.cameras.main.fade(300, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start('MenuScene');
    });
  }
}
