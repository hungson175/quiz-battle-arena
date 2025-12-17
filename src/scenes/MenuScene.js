import Phaser from 'phaser';
import { AudioManager } from '../utils/AudioManager.js';

/**
 * MenuScene - Sprint 3
 * Main menu with navigation, instructions, and settings
 *
 * Features:
 * - Vietnamese title + English subtitle
 * - Play, Instructions, Settings buttons
 * - Modals for instructions and settings
 * - Sound toggle with LocalStorage
 * - Progressive disclosure (Play button 2x larger)
 * - Entry animations
 */
export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });

    // Vietnamese text constants
    this.TEXT = {
      title: {
        main: 'Trò Chơi Đố Vui',
        subtitle: 'Quiz Battle Arena'
      },
      buttons: {
        play: 'CHƠI NGAY',
        instructions: 'Hướng dẫn',
        settings: 'Cài đặt',
        start: 'Bắt đầu',
        close: '✕'
      },
      instructions: {
        title: 'Cách chơi',
        steps: [
          'Đọc câu hỏi ở trên màn hình',
          'Nhấp vào robot có câu trả lời đúng',
          'Bạn có 5 trái tim ❤️❤️❤️❤️❤️',
          'Trả lời sai mất 1 trái tim 💔',
          'Trả lời đúng được điểm +100',
          'Trả lời sai vẫn học được +25'
        ]
      },
      settings: {
        title: 'Cài đặt',
        sound: 'Âm thanh',
        on: 'Bật',
        off: 'Tắt'
      }
    };

    // Design constants
    this.COLORS = {
      primary: '#4ECDC4',      // Bright blue
      coral: '#FF6B6B',
      yellow: '#FFD93D',
      mint: '#95E1D3',
      background: '#F7F9FC',   // Light blue-gray
      white: '#FFFFFF',
      darkGray: '#333333',
      mediumGray: '#666666',
      lightGray: '#F0F0F0'
    };
  }

  preload() {
    // AudioManager will handle audio preloading
    this.audioManager = new AudioManager(this);
    this.audioManager.preload();
  }

  create() {
    // Create audio manager
    this.audioManager.create();

    // Create menu elements
    this.createBackground();
    this.createTitle();
    this.createRobotIcon();
    this.createButtons();

    // Entry animations
    this.animateEntry();
  }

  /**
   * Create background
   */
  createBackground() {
    this.add.rectangle(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      800, 600,
      Phaser.Display.Color.HexStringToColor(this.COLORS.background).color
    );
  }

  /**
   * Create game title (Vietnamese + English)
   */
  createTitle() {
    const centerX = this.cameras.main.centerX;

    // English subtitle (small)
    this.subtitleText = this.add.text(
      centerX, 60,
      this.TEXT.title.subtitle,
      {
        fontSize: '24px',
        color: this.COLORS.mediumGray,
        fontFamily: 'Arial, sans-serif'
      }
    );
    this.subtitleText.setOrigin(0.5);
    this.subtitleText.setAlpha(0); // For animation

    // Vietnamese main title (large, bold)
    this.titleText = this.add.text(
      centerX, 100,
      this.TEXT.title.main,
      {
        fontSize: '48px',
        fontStyle: 'bold',
        color: this.COLORS.primary,
        fontFamily: 'Arial, sans-serif'
      }
    );
    this.titleText.setOrigin(0.5);
    this.titleText.setY(50); // Start above for slide animation
    this.titleText.setAlpha(0);
  }

  /**
   * Create robot icon with bob animation
   */
  createRobotIcon() {
    const centerX = this.cameras.main.centerX;

    this.robotIcon = this.add.text(
      centerX, 180,
      '🤖',
      {
        fontSize: '96px'
      }
    );
    this.robotIcon.setOrigin(0.5);
    this.robotIcon.setScale(0); // For bounce-in animation

    // Gentle bob animation (continuous)
    this.tweens.add({
      targets: this.robotIcon,
      y: 180 + 10,
      duration: 1000,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1,
      delay: 800 // Start after entry animation
    });
  }

  /**
   * Create all buttons (Play, Instructions, Settings)
   */
  createButtons() {
    const centerX = this.cameras.main.centerX;

    // "CHƠI NGAY" button (primary, 280×80px)
    this.playButton = this.createPrimaryButton(
      centerX, 300,
      280, 80,
      this.TEXT.buttons.play,
      () => this.startGame()
    );

    // "Hướng dẫn" button (secondary, 160×60px, blue border)
    this.instructionsButton = this.createSecondaryButton(
      centerX - 90, 420,
      160, 60,
      this.TEXT.buttons.instructions,
      this.COLORS.primary, // Blue border
      () => this.showInstructions()
    );

    // "Cài đặt" button (secondary, 160×60px, yellow border)
    this.settingsButton = this.createSecondaryButton(
      centerX + 90, 420,
      160, 60,
      this.TEXT.buttons.settings,
      this.COLORS.yellow, // Yellow border
      () => this.showSettings()
    );
  }

  /**
   * Create primary button (large, blue background)
   */
  createPrimaryButton(x, y, width, height, text, callback) {
    const button = this.add.rectangle(x, y, width, height, 0x4ECDC4);
    button.setInteractive({ useHandCursor: true });
    button.setAlpha(0); // For fade-in animation

    const buttonText = this.add.text(x, y, text, {
      fontSize: '28px',
      fontStyle: 'bold',
      color: this.COLORS.white,
      fontFamily: 'Arial, sans-serif'
    });
    buttonText.setOrigin(0.5);
    buttonText.setAlpha(0);

    // Click handler
    button.on('pointerdown', () => {
      this.audioManager.play('button_click', 0.4);
      callback();
    });

    // Hover effects
    button.on('pointerover', () => {
      button.setFillStyle(0x3BA99C); // Darker blue
      this.tweens.add({
        targets: [button, buttonText],
        scale: 1.08,
        duration: 100
      });
    });

    button.on('pointerout', () => {
      button.setFillStyle(0x4ECDC4);
      this.tweens.add({
        targets: [button, buttonText],
        scale: 1.0,
        duration: 100
      });
    });

    return { button, text: buttonText };
  }

  /**
   * Create secondary button (white background, colored border)
   */
  createSecondaryButton(x, y, width, height, text, borderColor, callback) {
    const button = this.add.rectangle(x, y, width, height, 0xFFFFFF);
    button.setStrokeStyle(2, Phaser.Display.Color.HexStringToColor(borderColor).color);
    button.setInteractive({ useHandCursor: true });
    button.setAlpha(0); // For fade-in animation

    const buttonText = this.add.text(x, y, text, {
      fontSize: '20px',
      fontStyle: '600',
      color: borderColor,
      fontFamily: 'Arial, sans-serif'
    });
    buttonText.setOrigin(0.5);
    buttonText.setAlpha(0);

    // Click handler
    button.on('pointerdown', () => {
      this.audioManager.play('button_click', 0.4);
      callback();
    });

    // Hover effects
    button.on('pointerover', () => {
      const lightColor = borderColor === this.COLORS.primary ? 0xF0F9F8 : 0xFFFDF0;
      button.setFillStyle(lightColor);
      button.setStrokeStyle(3, Phaser.Display.Color.HexStringToColor(borderColor).color);
      this.tweens.add({
        targets: [button, buttonText],
        scale: 1.05,
        duration: 100
      });
    });

    button.on('pointerout', () => {
      button.setFillStyle(0xFFFFFF);
      button.setStrokeStyle(2, Phaser.Display.Color.HexStringToColor(borderColor).color);
      this.tweens.add({
        targets: [button, buttonText],
        scale: 1.0,
        duration: 100
      });
    });

    return { button, text: buttonText };
  }

  /**
   * Entry animation sequence
   */
  animateEntry() {
    // 1. Fade in background (instant)

    // 2. Title slides down (0.4s, from -50px)
    this.tweens.add({
      targets: this.titleText,
      y: 100,
      alpha: 1,
      duration: 400,
      ease: 'Back.easeOut'
    });

    // 3. Subtitle fades in
    this.tweens.add({
      targets: this.subtitleText,
      alpha: 1,
      duration: 300,
      delay: 200
    });

    // 4. Robot bounces in (0.5s, scale 0 → 1.2 → 1.0)
    this.tweens.add({
      targets: this.robotIcon,
      scale: 1.0,
      duration: 500,
      ease: 'Back.easeOut',
      delay: 400
    });

    // 5. Play button fades in (0.6s)
    this.tweens.add({
      targets: [this.playButton.button, this.playButton.text],
      alpha: 1,
      duration: 300,
      delay: 600
    });

    // 6. Secondary buttons fade in (0.7s)
    this.tweens.add({
      targets: [
        this.instructionsButton.button,
        this.instructionsButton.text,
        this.settingsButton.button,
        this.settingsButton.text
      ],
      alpha: 1,
      duration: 300,
      delay: 700
    });
  }

  /**
   * Start game (transition to GameScene)
   */
  startGame() {
    // Fade out and transition
    this.cameras.main.fade(300, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start('GameScene');
    });
  }

  /**
   * Show instructions overlay
   */
  showInstructions() {
    // Semi-transparent overlay
    const overlay = this.add.rectangle(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      800, 600,
      0x000000, 0.8
    );
    overlay.setInteractive(); // Blocks clicks to menu

    // Modal container (600×500px)
    const modal = this.add.rectangle(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      600, 500,
      Phaser.Display.Color.HexStringToColor(this.COLORS.white).color
    );
    modal.setStrokeStyle(3, Phaser.Display.Color.HexStringToColor(this.COLORS.primary).color);

    // Title
    const title = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY - 200,
      this.TEXT.instructions.title,
      {
        fontSize: '32px',
        fontStyle: 'bold',
        color: this.COLORS.primary,
        fontFamily: 'Arial, sans-serif'
      }
    );
    title.setOrigin(0.5);

    // Instructions (6 steps)
    const instructions = [];
    const startY = this.cameras.main.centerY - 140;
    const lineHeight = 40;

    this.TEXT.instructions.steps.forEach((step, index) => {
      const text = this.add.text(
        this.cameras.main.centerX - 250,
        startY + index * lineHeight,
        `${index + 1}. ${step}`,
        {
          fontSize: '18px',
          color: this.COLORS.darkGray,
          fontFamily: 'Arial, sans-serif',
          wordWrap: { width: 500 }
        }
      );
      instructions.push(text);
    });

    // "Bắt đầu" button
    const startButton = this.add.rectangle(
      this.cameras.main.centerX,
      this.cameras.main.centerY + 180,
      180, 60,
      Phaser.Display.Color.HexStringToColor(this.COLORS.primary).color
    );
    startButton.setInteractive({ useHandCursor: true });

    const startText = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY + 180,
      this.TEXT.buttons.start,
      {
        fontSize: '22px',
        fontStyle: 'bold',
        color: this.COLORS.white,
        fontFamily: 'Arial, sans-serif'
      }
    );
    startText.setOrigin(0.5);

    startButton.on('pointerdown', () => {
      this.audioManager.play('button_click', 0.4);
      overlay.destroy();
      modal.destroy();
      title.destroy();
      instructions.forEach(t => t.destroy());
      startButton.destroy();
      startText.destroy();
      closeButton.destroy();
      closeText.destroy();
      this.startGame();
    });

    // Close button (X)
    const closeButton = this.add.rectangle(
      this.cameras.main.centerX + 270,
      this.cameras.main.centerY - 220,
      40, 40,
      0xFF6B6B
    );
    closeButton.setInteractive({ useHandCursor: true });

    const closeText = this.add.text(
      this.cameras.main.centerX + 270,
      this.cameras.main.centerY - 220,
      this.TEXT.buttons.close,
      {
        fontSize: '24px',
        color: this.COLORS.white,
        fontFamily: 'Arial, sans-serif'
      }
    );
    closeText.setOrigin(0.5);

    closeButton.on('pointerdown', () => {
      this.audioManager.play('button_click', 0.4);
      overlay.destroy();
      modal.destroy();
      title.destroy();
      instructions.forEach(t => t.destroy());
      startButton.destroy();
      startText.destroy();
      closeButton.destroy();
      closeText.destroy();
    });

    // Animate modal entry
    modal.setScale(0.9);
    modal.setAlpha(0);
    title.setAlpha(0);
    instructions.forEach(t => t.setAlpha(0));
    startButton.setAlpha(0);
    startText.setAlpha(0);
    closeButton.setAlpha(0);
    closeText.setAlpha(0);

    this.tweens.add({
      targets: [modal, title, ...instructions, startButton, startText, closeButton, closeText],
      scale: 1.0,
      alpha: 1,
      duration: 300,
      ease: 'Back.easeOut'
    });
  }

  /**
   * Show settings overlay
   */
  showSettings() {
    // Semi-transparent overlay
    const overlay = this.add.rectangle(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      800, 600,
      0x000000, 0.8
    );
    overlay.setInteractive();

    // Modal container (400×300px)
    const modal = this.add.rectangle(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      400, 300,
      Phaser.Display.Color.HexStringToColor(this.COLORS.white).color
    );
    modal.setStrokeStyle(3, Phaser.Display.Color.HexStringToColor(this.COLORS.yellow).color);

    // Title
    const title = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY - 100,
      this.TEXT.settings.title,
      {
        fontSize: '28px',
        fontStyle: 'bold',
        color: this.COLORS.primary,
        fontFamily: 'Arial, sans-serif'
      }
    );
    title.setOrigin(0.5);

    // Sound label
    const soundLabel = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY - 30,
      this.TEXT.settings.sound,
      {
        fontSize: '20px',
        color: this.COLORS.darkGray,
        fontFamily: 'Arial, sans-serif'
      }
    );
    soundLabel.setOrigin(0.5);

    // Sound toggle buttons
    const onButton = this.add.rectangle(
      this.cameras.main.centerX - 60,
      this.cameras.main.centerY + 20,
      100, 50,
      this.audioManager.enabled ? 0x4ECDC4 : 0xF0F0F0
    );
    onButton.setInteractive({ useHandCursor: true });

    const onText = this.add.text(
      this.cameras.main.centerX - 60,
      this.cameras.main.centerY + 20,
      this.TEXT.settings.on,
      {
        fontSize: '20px',
        fontStyle: 'bold',
        color: this.audioManager.enabled ? this.COLORS.white : this.COLORS.mediumGray,
        fontFamily: 'Arial, sans-serif'
      }
    );
    onText.setOrigin(0.5);

    const offButton = this.add.rectangle(
      this.cameras.main.centerX + 60,
      this.cameras.main.centerY + 20,
      100, 50,
      this.audioManager.enabled ? 0xF0F0F0 : 0x4ECDC4
    );
    offButton.setInteractive({ useHandCursor: true });

    const offText = this.add.text(
      this.cameras.main.centerX + 60,
      this.cameras.main.centerY + 20,
      this.TEXT.settings.off,
      {
        fontSize: '20px',
        fontStyle: 'bold',
        color: this.audioManager.enabled ? this.COLORS.mediumGray : this.COLORS.white,
        fontFamily: 'Arial, sans-serif'
      }
    );
    offText.setOrigin(0.5);

    // Update toggle state
    const updateToggle = () => {
      if (this.audioManager.enabled) {
        onButton.setFillStyle(0x4ECDC4);
        onText.setColor(this.COLORS.white);
        offButton.setFillStyle(0xF0F0F0);
        offText.setColor(this.COLORS.mediumGray);
      } else {
        onButton.setFillStyle(0xF0F0F0);
        onText.setColor(this.COLORS.mediumGray);
        offButton.setFillStyle(0x4ECDC4);
        offText.setColor(this.COLORS.white);
      }
    };

    onButton.on('pointerdown', () => {
      if (!this.audioManager.enabled) {
        this.audioManager.toggle();
        updateToggle();
        this.audioManager.play('button_click', 0.4);
      }
    });

    offButton.on('pointerdown', () => {
      if (this.audioManager.enabled) {
        this.audioManager.play('button_click', 0.4);
        this.audioManager.toggle();
        updateToggle();
      }
    });

    // Close button (X)
    const closeButton = this.add.rectangle(
      this.cameras.main.centerX + 170,
      this.cameras.main.centerY - 120,
      40, 40,
      0xFF6B6B
    );
    closeButton.setInteractive({ useHandCursor: true });

    const closeText = this.add.text(
      this.cameras.main.centerX + 170,
      this.cameras.main.centerY - 120,
      this.TEXT.buttons.close,
      {
        fontSize: '24px',
        color: this.COLORS.white,
        fontFamily: 'Arial, sans-serif'
      }
    );
    closeText.setOrigin(0.5);

    closeButton.on('pointerdown', () => {
      this.audioManager.play('button_click', 0.4);
      overlay.destroy();
      modal.destroy();
      title.destroy();
      soundLabel.destroy();
      onButton.destroy();
      onText.destroy();
      offButton.destroy();
      offText.destroy();
      closeButton.destroy();
      closeText.destroy();
    });

    // Animate modal entry
    modal.setScale(0.9);
    modal.setAlpha(0);
    title.setAlpha(0);
    soundLabel.setAlpha(0);
    onButton.setAlpha(0);
    onText.setAlpha(0);
    offButton.setAlpha(0);
    offText.setAlpha(0);
    closeButton.setAlpha(0);
    closeText.setAlpha(0);

    this.tweens.add({
      targets: [modal, title, soundLabel, onButton, onText, offButton, offText, closeButton, closeText],
      scale: 1.0,
      alpha: 1,
      duration: 300,
      ease: 'Back.easeOut'
    });
  }
}
