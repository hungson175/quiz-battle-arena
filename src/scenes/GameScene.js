import Phaser from 'phaser';
import { calculateHealth, shouldTriggerGameOver } from '../utils/HealthManager.js';
import { shouldProgressToNextQuestion, shouldTriggerVictory } from '../utils/GameProgression.js';
import { isMilestone, getMilestoneMessage, getMilestoneIcon } from '../utils/Milestones.js';

/**
 * GameScene - Main game scene for Quiz Battle Arena
 * Sprint 1: Core Mechanics - Question display and answer validation
 * Sprint 2A: Game Loop - Health system, question progression, basic game over
 * Sprint 2B: Polish - GameOverScene, milestone celebrations
 */
export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });

    // Game state (Sprint 1)
    this.score = 0;
    this.currentQuestionIndex = 0;
    this.questions = [];
    this.currentQuestion = null;
    this.shuffledAnswers = [];
    this.targets = [];
    this.isAnswering = false;

    // Sprint 2A: Health system
    this.maxHealth = 5;
    this.currentHealth = 5;
    this.healthHearts = [];

    // Sprint 2A: Game progression tracking
    this.questionsAnswered = 0;
    this.correctCount = 0;
    this.wrongCount = 0;
    this.isGameOver = false;

    // Sprint 2B: Milestone celebrations
    this.milestonesReached = []; // Track which milestones have been celebrated

    // Design constants from GD specs
    this.COLORS = {
      primary: '#4ECDC4',     // Bright blue
      coral: '#FF6B6B',       // Coral red
      mint: '#95E1D3',        // Mint green
      yellow: '#FFD93D',      // Yellow
      darkGray: '#333333',    // Text color
      mediumGray: '#666666',  // Label color
      white: '#FFFFFF'
    };
  }

  async create() {
    // Set background color
    this.cameras.main.setBackgroundColor('#34495e');

    // Load questions
    await this.loadQuestions();

    if (this.questions.length === 0) {
      this.showError('Không có câu hỏi nào');
      return;
    }

    // Create UI elements
    this.createScoreDisplay();
    this.createHealthDisplay(); // Sprint 2A: Health HUD
    this.createQuestionDisplay();
    this.createTargets();

    // Show first question
    this.showQuestion(0);
  }

  /**
   * Load questions from JSON file
   */
  async loadQuestions() {
    try {
      const response = await fetch('/src/assets/data/questions.json');
      if (!response.ok) {
        throw new Error('Không thể tải câu hỏi');
      }
      const data = await response.json();
      this.questions = data.questions || [];
    } catch (error) {
      console.error('Error loading questions:', error);
      this.showError('Lỗi tải câu hỏi');
    }
  }

  /**
   * Create question display container at top of screen
   * Position: 60px from top, 700px wide, centered
   * Font: 24px, semi-bold, Vietnamese UTF-8 support
   */
  createQuestionDisplay() {
    const centerX = this.cameras.main.centerX;

    // Question container background (Sprint 3 polish: enhanced styling)
    this.questionBg = this.add.rectangle(
      centerX,
      100, // 60px + half height
      700,
      80,
      0xffffff,
      0.98 // More opaque for content focus
    );
    this.questionBg.setStrokeStyle(3, 0x4ECDC4); // Blue border (emphasis)

    // Question mark icon ❓ (Sprint 3 polish)
    this.questionIcon = this.add.text(centerX - 320, 100, '❓', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '28px'
    });
    this.questionIcon.setOrigin(0.5);

    // Question text (with left padding for icon)
    this.questionText = this.add.text(centerX, 100, '', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '24px',
      fontStyle: '600',
      color: this.COLORS.darkGray,
      align: 'center',
      wordWrap: { width: 620 } // Reduced width to account for icon
    });
    this.questionText.setOrigin(0.5);
  }

  /**
   * Create 4 target buttons in horizontal row
   * Positions: x=[70, 240, 410, 580], y=250
   * Size: 150px × 80px with 10px grace area extension
   * Colors: Blue, Red, Green, Yellow (distinct for colorblind)
   */
  createTargets() {
    const targetPositions = [
      { x: 70, color: 0x4ECDC4, borderColor: 0x3BA99C },   // Blue
      { x: 240, color: 0xFF6B6B, borderColor: 0xE05555 },  // Red
      { x: 410, color: 0x95E1D3, borderColor: 0x7AC9BB },  // Green
      { x: 580, color: 0xFFD93D, borderColor: 0xE6C235 }   // Yellow
    ];

    const targetY = 250;
    const targetWidth = 150;
    const targetHeight = 80;
    const graceArea = 10; // GD Rec #1: Forgiving click detection

    this.targets = targetPositions.map((pos, index) => {
      // Visual target (rounded rectangle)
      const target = this.add.rectangle(
        pos.x + targetWidth / 2,
        targetY + targetHeight / 2,
        targetWidth,
        targetHeight,
        pos.color
      );
      target.setStrokeStyle(2, pos.borderColor);

      // Answer text on target
      const answerText = this.add.text(
        pos.x + targetWidth / 2,
        targetY + targetHeight / 2,
        '',
        {
          fontFamily: 'Arial, sans-serif',
          fontSize: '18px',
          fontStyle: '500',
          color: this.COLORS.darkGray,
          align: 'center',
          wordWrap: { width: targetWidth - 20 }
        }
      );
      answerText.setOrigin(0.5);

      // Interactive hitbox with grace area (+10px on all sides)
      const hitbox = this.add.rectangle(
        pos.x + targetWidth / 2,
        targetY + targetHeight / 2,
        targetWidth + (graceArea * 2),  // 170px total
        targetHeight + (graceArea * 2),  // 100px total
        0x000000,
        0 // Invisible
      );
      hitbox.setInteractive({ useHandCursor: true });

      // Click handler
      hitbox.on('pointerdown', () => this.handleTargetClick(index));

      // Hover effects (GD design specs)
      hitbox.on('pointerover', () => {
        target.setStrokeStyle(3, pos.borderColor);
        this.tweens.add({
          targets: [target, answerText],
          scale: 1.02,
          duration: 100
        });
      });

      hitbox.on('pointerout', () => {
        target.setStrokeStyle(2, pos.borderColor);
        this.tweens.add({
          targets: [target, answerText],
          scale: 1.0,
          duration: 100
        });
      });

      return {
        visual: target,
        text: answerText,
        hitbox: hitbox,
        isCorrect: false
      };
    });
  }

  /**
   * Create score display HUD in top-left corner
   * Position: 20px from left, 20px from top
   * Format: "Điểm số: XXX"
   */
  createScoreDisplay() {
    // Score container background (Sprint 3 polish: enhanced styling)
    this.scoreBg = this.add.rectangle(20, 20, 180, 70, 0xffffff, 0.95);
    this.scoreBg.setOrigin(0, 0);
    this.scoreBg.setStrokeStyle(2, 0x4ECDC4); // Blue border

    // Star icon ⭐ (Sprint 3 polish)
    this.scoreIcon = this.add.text(30, 30, '⭐', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '28px'
    });
    this.scoreIcon.setOrigin(0, 0);

    // Score label
    this.scoreLabel = this.add.text(60, 32, 'Điểm số:', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '16px',
      color: this.COLORS.mediumGray
    });
    this.scoreLabel.setOrigin(0, 0);

    // Score number
    this.scoreText = this.add.text(60, 54, '0', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '28px',
      fontStyle: 'bold',
      color: this.COLORS.primary
    });
    this.scoreText.setOrigin(0, 0);
  }

  /**
   * Create health display HUD in top-right corner (Sprint 2A)
   * Position: 20px from right, 20px from top
   * Visual: 5 hearts (❤️ for full, 🖤 for empty)
   * GD Spec: Top-right corner, horizontal row, clear for children
   */
  createHealthDisplay() {
    const canvasWidth = this.cameras.main.width;
    const heartSize = 32;
    const heartSpacing = 8;
    const totalWidth = (this.maxHealth * heartSize) + ((this.maxHealth - 1) * heartSpacing) + 30;

    // Health container background
    this.healthBg = this.add.rectangle(
      canvasWidth - 20 - totalWidth / 2,
      20 + 35, // Centered vertically
      totalWidth,
      70,
      0xffffff,
      0.9
    );
    this.healthBg.setStrokeStyle(2, 0xFF6B6B); // Red border (health theme)

    // Create 5 heart sprites/text
    this.healthHearts = [];
    const startX = canvasWidth - 20 - totalWidth + 15;

    for (let i = 0; i < this.maxHealth; i++) {
      const heartX = startX + (i * (heartSize + heartSpacing));
      const heartY = 20 + 35;

      // Use text emojis for hearts (placeholder - will use sprites in Sprint 3)
      const heart = this.add.text(heartX, heartY, '❤️', {
        fontSize: `${heartSize}px`,
        fontFamily: 'Arial, sans-serif'
      });
      heart.setOrigin(0.5);

      this.healthHearts.push(heart);
    }
  }

  /**
   * Update health display (Sprint 2A)
   * Changes hearts from full ❤️ to empty 🖤 when health lost
   */
  updateHealthDisplay() {
    for (let i = 0; i < this.maxHealth; i++) {
      if (i < this.currentHealth) {
        // Full heart
        this.healthHearts[i].setText('❤️');
        this.healthHearts[i].setAlpha(1);
      } else {
        // Empty/broken heart
        this.healthHearts[i].setText('🖤');
        this.healthHearts[i].setAlpha(0.5);
      }
    }
  }

  /**
   * Lose health with animation (Sprint 2A)
   * GD Spec: Heart breaks with shake animation, then update display
   */
  loseHealth() {
    if (this.currentHealth > 0) {
      // Animate the heart being lost (rightmost full heart)
      const lostHeartIndex = this.currentHealth - 1;
      const lostHeart = this.healthHearts[lostHeartIndex];

      // Heart break animation
      this.tweens.add({
        targets: lostHeart,
        scaleX: 1.2,
        scaleY: 1.2,
        angle: 15,
        duration: 200,
        yoyo: true,
        onComplete: () => {
          // Update health value
          this.currentHealth = calculateHealth(this.currentHealth, false);
          this.updateHealthDisplay();

          // Low health warning (1-2 hearts)
          if (this.currentHealth <= 2 && this.currentHealth > 0) {
            this.showLowHealthWarning();
          }

          // Check game over
          if (this.currentHealth === 0) {
            this.triggerGameOver('health_depleted');
          }
        }
      });

      // Health container pulse (red flash)
      this.tweens.add({
        targets: this.healthBg,
        alpha: 0.5,
        duration: 150,
        yoyo: true
      });
    }
  }

  /**
   * Show low health warning (Sprint 2A)
   * GD Spec: Hearts pulse, red border when 1-2 hearts left
   */
  showLowHealthWarning() {
    // Pulse remaining hearts
    this.healthHearts.forEach((heart, index) => {
      if (index < this.currentHealth) {
        this.tweens.add({
          targets: heart,
          scale: 1.1,
          duration: 500,
          yoyo: true,
          repeat: 2
        });
      }
    });

    // Red border pulse
    this.healthBg.setStrokeStyle(3, 0xFF0000); // Bright red
  }

  /**
   * Display question and shuffle answers to targets
   * Sprint 2A: Added fade-in animation for transitions
   */
  showQuestion(index) {
    if (index >= this.questions.length) {
      // Sprint 2A: Victory condition - trigger game over
      this.triggerGameOver('victory');
      return;
    }

    this.currentQuestionIndex = index;
    this.currentQuestion = this.questions[index];
    this.isAnswering = false;

    // Update question text
    this.questionText.setText(this.currentQuestion.question);

    // Shuffle answers (Fisher-Yates algorithm)
    this.shuffledAnswers = this.shuffleAnswers(this.currentQuestion);

    // Assign shuffled answers to targets
    this.targets.forEach((target, i) => {
      const answer = this.shuffledAnswers[i];
      target.text.setText(answer.text);
      target.isCorrect = answer.isCorrect;

      // Re-enable targets
      target.hitbox.setInteractive();
      target.visual.setAlpha(1);
      target.text.setAlpha(1);

      // Reset visual state
      target.visual.setScale(1.0);
      target.text.setScale(1.0);
      target.visual.setStrokeStyle(2, this.targets[i].visual.strokeColor);
    });

    // Sprint 2A: Fade in animation (if coming from transition)
    if (index > 0) {
      this.questionText.setAlpha(0);
      this.questionBg.setAlpha(0);

      this.tweens.add({
        targets: [this.questionText, this.questionBg, ...this.targets.map(t => t.visual), ...this.targets.map(t => t.text)],
        alpha: 1,
        duration: 300,
        ease: 'Power2'
      });
    }
  }

  /**
   * Shuffle answers while preserving which is correct
   * Uses Fisher-Yates algorithm
   */
  shuffleAnswers(question) {
    // Create answer objects
    const answerObjects = question.answers.map((text, index) => ({
      text: text,
      isCorrect: index === question.correct
    }));

    // Fisher-Yates shuffle
    for (let i = answerObjects.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answerObjects[i], answerObjects[j]] = [answerObjects[j], answerObjects[i]];
    }

    return answerObjects;
  }

  /**
   * Handle target click and validate answer
   * Implements GD Rec #2: +25 Learning Points for wrong answers
   */
  handleTargetClick(targetIndex) {
    if (this.isAnswering) return; // Prevent double-click
    this.isAnswering = true;

    const clickedTarget = this.targets[targetIndex];
    const isCorrect = clickedTarget.isCorrect;

    // Disable all targets
    this.targets.forEach(target => {
      target.hitbox.disableInteractive();
      target.visual.setAlpha(0.5);
      target.text.setAlpha(0.5);
    });

    if (isCorrect) {
      this.handleCorrectAnswer(targetIndex);
    } else {
      this.handleWrongAnswer(targetIndex);
    }
  }

  /**
   * Handle correct answer feedback
   * Awards +100 points, shows success animation
   * Sprint 2A: Track correct count and progress to next question
   */
  handleCorrectAnswer(targetIndex) {
    const target = this.targets[targetIndex];

    // Sprint 2A: Track correct answer
    this.correctCount++;
    this.questionsAnswered++;

    // Update score (+100 points)
    this.updateScore(100);

    // Show floating +100 text
    this.showFloatingScore(target, '+100', this.COLORS.primary);

    // Success message
    const messages = ['Chính xác! 🎯', 'Tuyệt vời! ⭐', 'Xuất sắc! 🏆'];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    this.showMessage(randomMessage, this.COLORS.primary);

    // Sprint 3: Screen flash (blue tint)
    this.cameras.main.flash(150, 78, 205, 196, false, null, 0.2);

    // Sprint 3: Confetti explosion (simple emoji-based)
    this.createConfettiEffect(target.visual.x, target.visual.y);

    // Target celebration animation
    this.tweens.add({
      targets: [target.visual, target.text],
      scale: 1.2, // Enhanced from 1.1
      angle: 360,
      duration: 800,
      ease: 'Back.easeOut',
      onComplete: () => {
        // Sprint 2A: Check victory condition, then progress
        this.time.delayedCall(500, () => {
          this.progressToNextQuestion();
        });
      }
    });
  }

  /**
   * Handle wrong answer feedback
   * Awards +25 Learning Points (GD Rec #2), shows supportive message + explanation
   * Sprint 2A: Lose health, check game over, then progress
   */
  handleWrongAnswer(targetIndex) {
    const target = this.targets[targetIndex];

    // Sprint 2A: Track wrong answer
    this.wrongCount++;
    this.questionsAnswered++;

    // Update score (+25 Learning Points)
    this.updateScore(25);

    // Show floating +25 text
    this.showFloatingScore(target, '+25 Học tập', this.COLORS.yellow);

    // Supportive message (GD Rec #2)
    this.showMessage(
      'Chưa đúng rồi! Nhưng bạn đã học được điều gì đó có giá trị! 📚',
      this.COLORS.coral
    );

    // Sprint 3: Subtle screen shake (2px horizontal)
    this.cameras.main.shake(200, 0.002);

    // Sprint 3: Spark effect (simple emoji-based)
    this.createSparkEffect(target.visual.x, target.visual.y);

    // Target shake animation (enhanced)
    this.tweens.add({
      targets: [target.visual, target.text],
      x: '+=8', // Enhanced from +=5
      yoyo: true,
      repeat: 3,
      duration: 80
    });

    // Highlight correct answer
    const correctTarget = this.targets.find(t => t.isCorrect);
    if (correctTarget) {
      correctTarget.visual.setAlpha(1);
      correctTarget.text.setAlpha(1);
      correctTarget.visual.setStrokeStyle(3, 0x95E1D3);

      this.tweens.add({
        targets: [correctTarget.visual, correctTarget.text],
        scale: 1.05,
        duration: 500
      });
    }

    // Sprint 2A: Lose health (with animation)
    this.loseHealth();

    // Sprint 2A: Only show explanation and progress if health > 0
    // If health = 0, game over will trigger automatically from loseHealth()
    if (this.currentHealth > 0) {
      // Show explanation
      this.showExplanation(this.currentQuestion.explanation);

      // Progress to next question after delay
      this.time.delayedCall(5000, () => {
        this.progressToNextQuestion();
      });
    }
  }

  /**
   * Update score with animation
   * GD spec: Scale pulse, color flash, counter animation
   */
  updateScore(points) {
    this.score += points;

    // Animate score number
    this.tweens.add({
      targets: this.scoreText,
      scale: 1.3,
      duration: 150,
      yoyo: true,
      onUpdate: () => {
        this.scoreText.setText(this.score.toString());
      }
    });

    // Color flash to gold, then back to blue
    this.scoreText.setColor(this.COLORS.yellow);
    this.time.delayedCall(300, () => {
      this.scoreText.setColor(this.COLORS.primary);
    });

    // Twinkle star icon (Sprint 3 polish)
    if (this.scoreIcon) {
      this.tweens.add({
        targets: this.scoreIcon,
        scale: 1.4,
        duration: 150,
        yoyo: true
      });
    }
  }

  /**
   * Show floating score text above target
   */
  showFloatingScore(target, text, color) {
    const floatingText = this.add.text(
      target.visual.x,
      target.visual.y - 40,
      text,
      {
        fontFamily: 'Arial, sans-serif',
        fontSize: '24px',
        fontStyle: 'bold',
        color: color
      }
    );
    floatingText.setOrigin(0.5);

    this.tweens.add({
      targets: floatingText,
      y: floatingText.y - 50,
      alpha: 0,
      duration: 1000,
      onComplete: () => floatingText.destroy()
    });
  }

  /**
   * Show message at top-center
   */
  showMessage(text, color) {
    if (this.messageText) {
      this.messageText.destroy();
    }

    this.messageText = this.add.text(
      this.cameras.main.centerX,
      180,
      text,
      {
        fontFamily: 'Arial, sans-serif',
        fontSize: '20px',
        color: color,
        align: 'center',
        wordWrap: { width: 600 }
      }
    );
    this.messageText.setOrigin(0.5);

    // Auto-remove after 2 seconds
    this.time.delayedCall(2000, () => {
      if (this.messageText) {
        this.messageText.destroy();
        this.messageText = null;
      }
    });
  }

  /**
   * Show explanation text at bottom of screen
   * GD spec: Bottom-center, 600px wide, yellow border
   */
  showExplanation(text) {
    const explanationBg = this.add.rectangle(
      this.cameras.main.centerX,
      500,
      600,
      120,
      0xffffff,
      0.98
    );
    explanationBg.setStrokeStyle(2, 0xFFD93D);

    const explanationText = this.add.text(
      this.cameras.main.centerX,
      500,
      `💡 ${text}`,
      {
        fontFamily: 'Arial, sans-serif',
        fontSize: '18px',
        color: this.COLORS.darkGray,
        align: 'left',
        wordWrap: { width: 560 }
      }
    );
    explanationText.setOrigin(0.5);

    // Auto-remove after 3 seconds
    this.time.delayedCall(3000, () => {
      explanationBg.destroy();
      explanationText.destroy();
    });
  }

  /**
   * Show error message
   */
  showError(message) {
    this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      message,
      {
        fontFamily: 'Arial, sans-serif',
        fontSize: '24px',
        color: this.COLORS.coral
      }
    ).setOrigin(0.5);
  }

  /**
   * Progress to next question with transition animation (Sprint 2A/2B)
   * GD Spec: Fade out (0.3s) → pause (0.2s) → fade in (0.3s)
   * Sprint 2B: Check for milestone celebration before progressing
   * Checks victory condition before progressing
   */
  progressToNextQuestion() {
    if (this.isGameOver) return; // Don't progress if game is over

    // Check victory condition (all questions answered)
    if (shouldTriggerVictory(this.currentQuestionIndex, this.questions.length)) {
      this.triggerGameOver('victory');
      return;
    }

    // Sprint 2B: Check for milestone celebration
    if (this.checkMilestone()) {
      // Milestone celebration will handle progression after dismissal
      return;
    }

    // Fade out current question
    this.tweens.add({
      targets: [this.questionText, this.questionBg, ...this.targets.map(t => t.visual), ...this.targets.map(t => t.text)],
      alpha: 0,
      duration: 300,
      onComplete: () => {
        // Brief pause
        this.time.delayedCall(200, () => {
          // Load next question
          this.currentQuestionIndex++;
          this.showQuestion(this.currentQuestionIndex);
        });
      }
    });
  }

  /**
   * Check for milestone celebration (Sprint 2B)
   * GD Spec: Celebrate at 5, 10, 15, 20 questions
   * @returns {boolean} True if milestone shown, false otherwise
   */
  checkMilestone() {
    const count = this.questionsAnswered;

    // Check if this is a milestone and not already celebrated
    if (isMilestone(count) && !this.milestonesReached.includes(count)) {
      this.milestonesReached.push(count);
      this.showMilestoneCelebration(count);
      return true; // Celebration shown
    }

    return false; // No celebration
  }

  /**
   * Show milestone celebration modal (Sprint 2B)
   * GD Spec: 400×250px modal, icon, message, progress bar
   * Auto-dismiss after 2.5s or click to skip
   * @param {number} count - Number of questions answered
   */
  showMilestoneCelebration(count) {
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    // Background overlay (semi-transparent)
    const overlay = this.add.rectangle(
      centerX, centerY,
      800, 600,
      0x000000, 0.5
    );

    // Modal container
    const modal = this.add.container(centerX, centerY);

    // Modal background with color theme
    const bg = this.add.rectangle(
      0, 0,
      400, 250,
      0x4ECDC4, 0.95
    );
    bg.setStrokeStyle(3, 0xFFFFFF);
    modal.add(bg);

    // Animated icon (Sprint 2B milestone icons)
    const icon = this.add.text(0, -80, getMilestoneIcon(count), {
      fontSize: '64px',
      fontFamily: 'Arial, sans-serif'
    });
    icon.setOrigin(0.5);
    icon.setScale(0);
    modal.add(icon);

    // Message text
    const message = this.add.text(0, -20, getMilestoneMessage(count), {
      fontSize: '28px',
      fontStyle: 'bold',
      color: this.COLORS.white,
      fontFamily: 'Arial, sans-serif',
      shadow: { offsetX: 0, offsetY: 2, color: 'rgba(0,0,0,0.3)', blur: 4, fill: true }
    });
    message.setOrigin(0.5);
    message.setAlpha(0);
    modal.add(message);

    // Progress bar container
    const progressBarBg = this.add.rectangle(
      0, 50,
      300, 20,
      0xFFFFFF, 0.3
    );
    progressBarBg.setStrokeStyle(1, 0xFFFFFF, 0.5);
    modal.add(progressBarBg);

    // Progress bar fill
    const progressPercent = (count / this.questions.length) * 100;
    const progressWidth = (300 * progressPercent) / 100;
    const progressFill = this.add.rectangle(
      -150, 50, // Start from left edge
      0, 20, // Start with 0 width
      0xFFFFFF
    );
    progressFill.setOrigin(0, 0.5);
    modal.add(progressFill);

    // Progress text
    const progressText = this.add.text(
      0, 75,
      `${count} / ${this.questions.length} câu`,
      {
        fontSize: '16px',
        color: this.COLORS.white,
        fontFamily: 'Arial, sans-serif'
      }
    );
    progressText.setOrigin(0.5);
    progressText.setAlpha(0);
    modal.add(progressText);

    // Initial state for animations
    modal.setScale(0.8);
    modal.setAlpha(0);

    // Animation sequence
    // 1. Modal zoom in
    this.tweens.add({
      targets: modal,
      scale: 1.0,
      alpha: 1,
      duration: 300,
      ease: 'Back.easeOut'
    });

    // 2. Icon bounce in
    this.tweens.add({
      targets: icon,
      scale: 1.2,
      duration: 200,
      delay: 200,
      ease: 'Back.easeOut',
      onComplete: () => {
        this.tweens.add({
          targets: icon,
          scale: 1.0,
          duration: 200,
          ease: 'Bounce.easeOut'
        });
      }
    });

    // 3. Message fade in
    this.tweens.add({
      targets: message,
      alpha: 1,
      duration: 300,
      delay: 400
    });

    // 4. Progress bar animate
    this.tweens.add({
      targets: progressFill,
      width: progressWidth,
      duration: 600,
      delay: 600,
      ease: 'Power2'
    });

    // 5. Progress text fade in
    this.tweens.add({
      targets: progressText,
      alpha: 1,
      duration: 300,
      delay: 800
    });

    // Auto-dismiss after 2.5 seconds
    const autoDismissTimer = this.time.delayedCall(2500, () => {
      this.dismissMilestone(overlay, modal);
    });

    // Click to skip
    overlay.setInteractive({ useHandCursor: true });
    overlay.on('pointerdown', () => {
      autoDismissTimer.remove(); // Cancel auto-dismiss
      this.dismissMilestone(overlay, modal);
    });
  }

  /**
   * Dismiss milestone celebration and continue to next question
   * @param {Phaser.GameObjects.Rectangle} overlay - Background overlay
   * @param {Phaser.GameObjects.Container} modal - Modal container
   */
  dismissMilestone(overlay, modal) {
    // Fade out and destroy
    this.tweens.add({
      targets: [overlay, modal],
      alpha: 0,
      duration: 200,
      onComplete: () => {
        overlay.destroy();
        modal.destroy();
        // Continue to next question
        this.currentQuestionIndex++;
        this.showQuestion(this.currentQuestionIndex);
      }
    });
  }

  /**
   * Create confetti particle effect for correct answers (Sprint 3)
   * @param {number} x - X position of the effect
   * @param {number} y - Y position of the effect
   * Uses emoji-based particles with radial burst pattern
   */
  createConfettiEffect(x, y) {
    const confettiEmojis = ['🎉', '⭐', '✨', '🎊', '💫'];
    const confettiColors = ['#4ECDC4', '#FFD93D', '#95E1D3']; // Blue, yellow, green
    const particleCount = Phaser.Math.Between(15, 25);

    for (let i = 0; i < particleCount; i++) {
      // Random emoji or colored circle
      const useEmoji = Math.random() > 0.3;
      let particle;

      if (useEmoji) {
        const emoji = Phaser.Utils.Array.GetRandom(confettiEmojis);
        particle = this.add.text(x, y, emoji, {
          fontSize: '20px'
        });
        particle.setOrigin(0.5);
      } else {
        const color = Phaser.Utils.Array.GetRandom(confettiColors);
        particle = this.add.rectangle(x, y, 8, 8, parseInt(color.replace('#', '0x')));
      }

      // Random direction for radial burst
      const angle = Math.random() * Math.PI * 2;
      const velocity = Phaser.Math.Between(100, 200);
      const targetX = x + Math.cos(angle) * velocity;
      const targetY = y + Math.sin(angle) * velocity;

      // Animate particle
      this.tweens.add({
        targets: particle,
        x: targetX,
        y: targetY,
        alpha: 0,
        rotation: Phaser.Math.Between(-2, 2),
        scale: Phaser.Math.FloatBetween(0.5, 1.5),
        duration: 1500,
        ease: 'Cubic.easeOut',
        onComplete: () => particle.destroy()
      });
    }
  }

  /**
   * Create spark particle effect for wrong answers (Sprint 3)
   * @param {number} x - X position of the effect
   * @param {number} y - Y position of the effect
   * Uses emoji-based particles with quick burst pattern
   */
  createSparkEffect(x, y) {
    const sparkEmojis = ['💥', '⚡', '✖️'];
    const particleCount = Phaser.Math.Between(8, 12);

    for (let i = 0; i < particleCount; i++) {
      // Random spark emoji or small red line
      const useEmoji = Math.random() > 0.5;
      let particle;

      if (useEmoji) {
        const emoji = Phaser.Utils.Array.GetRandom(sparkEmojis);
        particle = this.add.text(x, y, emoji, {
          fontSize: '16px'
        });
        particle.setOrigin(0.5);
      } else {
        // Small red rectangle for spark line
        particle = this.add.rectangle(x, y, 2, 8, 0xFF6B6B);
      }

      // Random direction for quick burst
      const angle = Math.random() * Math.PI * 2;
      const velocity = Phaser.Math.Between(40, 80);
      const targetX = x + Math.cos(angle) * velocity;
      const targetY = y + Math.sin(angle) * velocity;

      // Animate spark (faster, shorter duration)
      this.tweens.add({
        targets: particle,
        x: targetX,
        y: targetY,
        alpha: 0,
        rotation: Phaser.Math.Between(-3, 3),
        duration: 500,
        ease: 'Power2.easeOut',
        onComplete: () => particle.destroy()
      });
    }
  }

  /**
   * Trigger game over screen (Sprint 2B)
   * @param {string} reason - 'health_depleted' or 'victory'
   * Transitions to GameOverScene with game data
   */
  triggerGameOver(reason) {
    if (this.isGameOver) return; // Prevent multiple triggers
    this.isGameOver = true;

    // Freeze game
    this.targets.forEach(target => {
      target.hitbox.disableInteractive();
    });

    // Wait a moment, then transition to GameOverScene
    this.time.delayedCall(1000, () => {
      this.scene.start('GameOverScene', {
        score: this.score,
        correctCount: this.correctCount,
        wrongCount: this.wrongCount,
        totalQuestions: this.questions.length,
        reason: reason
      });
    });
  }
}
