// src/scenes/GameScene.js
// Main game scene with 3-lane grid

import Phaser from 'phaser';
import { GridConfig } from '../utils/GridConfig.js';
import { ZombieManager } from '../managers/ZombieManager.js';
import { PlantManager } from '../managers/PlantManager.js';
import { ProjectileManager } from '../managers/ProjectileManager.js';
import { MoneyManager, MONEY_CONFIG } from '../utils/MoneyManager.js';
import { QuestionManager } from '../utils/QuestionManager.js';
// S7-003 AC8: QuizUIManager replaced by React panel
// import { QuizUIManager } from '../ui/QuizUIManager.js';
import { WaveManager, WAVE_CONFIG } from '../utils/WaveManager.js';
import { GameStats } from '../utils/GameStats.js';
import { PlantSelector, PLANT_SELECTOR_CONFIG } from '../ui/PlantSelector.js';

// Quiz timing configuration (per GD specs)
const QUIZ_CONFIG = {
  firstQuizDelayMs: 15000  // First quiz after 15 seconds (wave 1)
};

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    this.gridConfig = null;
    this.gridCells = [];  // 2D array of cell graphics
    this.zombieManager = null;
    this.plantManager = null;
    this.projectileManager = null;
    this.moneyManager = null;
    this.questionManager = null;
    // S7-003 AC8: QuizUIManager removed (React panel replaces it)
    // this.quizUIManager = null;
    this.waveManager = null;
    this.gameStats = null;
    this.plantSelector = null;
    this.plantButtons = [];  // UI button sprites
    this.moneyText = null;
    this.waveText = null;
    this.debugText = null;  // S7-002: Debug overlay
    this.gameOver = false;
    this.quizActive = false;
    this.spawnTimer = null;
    this.currentQuestion = null;  // S7-003: Current quiz question
  }

  create() {
    // Initialize grid configuration
    this.gridConfig = new GridConfig({
      gameWidth: this.scale.width,
      gameHeight: this.scale.height
    });

    // Draw lawn background
    this.createLawnBackground();

    // Draw grid
    this.createGrid();

    // Draw house zone
    this.createHouseZone();

    // Initialize managers
    this.zombieManager = new ZombieManager(this, this.gridConfig);
    this.plantManager = new PlantManager(this, this.gridConfig);
    this.projectileManager = new ProjectileManager(this, this.gridConfig);
    this.moneyManager = new MoneyManager();
    this.questionManager = new QuestionManager();
    // S7-003 AC8: QuizUIManager removed - React panel handles quiz UI
    this.waveManager = new WaveManager();
    this.gameStats = new GameStats();
    this.gameStats.setTotalWaves(this.waveManager.getTotalWaves());
    this.plantSelector = new PlantSelector({
      gameWidth: this.scale.width,
      gameHeight: this.scale.height
    });

    // Load questions
    this.loadQuestions();

    // Create UI
    this.createMoneyDisplay();
    this.createWaveDisplay();
    this.createPlantSelectorUI();
    this.createDebugUI();  // S7-002: Debug overlay

    // Setup input handling
    this.setupInputHandling();

    // Start wave system
    this.startWaveSystem();

    // Start quiz timer
    this.startQuizTimer();

    // S7-003: Setup React event bridge
    this.setupReactBridge();

    // S7-003: Initial state emit to React
    this.emitMoneyUpdate();
    this.emitWaveUpdate();
  }

  /**
   * Create wave counter display
   */
  createWaveDisplay() {
    // Wave display background
    this.add.rectangle(
      100,
      30,
      180,
      40,
      0x000000,
      0.7
    );

    // Wave text
    this.waveText = this.add.text(
      100,
      30,
      'Wave: 1/5',
      { fontSize: '22px', fill: '#ffffff', fontStyle: 'bold' }
    ).setOrigin(0.5);
  }

  /**
   * Update wave display
   */
  updateWaveDisplay() {
    if (this.waveText && this.waveManager) {
      const stats = this.waveManager.getStats();
      this.waveText.setText(`Wave: ${stats.currentWave}/${stats.totalWaves}`);
    }

    // S7-003: Emit to React
    this.emitWaveUpdate();
  }

  /**
   * S7-002: Create debug overlay showing zombie info per lane
   */
  createDebugUI() {
    // Debug panel background (top-right)
    const debugX = this.scale.width - 200;
    const debugY = 20;

    this.add.rectangle(
      debugX + 90,
      debugY + 60,
      180,
      120,
      0x000000,
      0.7
    );

    // Debug text (multiline, updated each frame)
    this.debugText = this.add.text(
      debugX,
      debugY,
      'Zombies:\nLane 0: -\nLane 1: -\nLane 2: -',
      { fontSize: '14px', fill: '#00ff00', fontFamily: 'monospace' }
    );
  }

  /**
   * S7-002: Update debug overlay with current zombie info
   */
  updateDebugUI() {
    if (!this.debugText || !this.zombieManager) return;

    const activeZombies = this.zombieManager.getActiveZombies();

    // Group zombies by lane
    const laneData = [[], [], []];
    for (const zombie of activeZombies) {
      if (zombie.lane >= 0 && zombie.lane < 3) {
        laneData[zombie.lane].push({
          col: zombie.col,
          hp: zombie.hp,
          state: zombie.state.charAt(0).toUpperCase() // W/A/D
        });
      }
    }

    // Build debug text
    let text = `Zombies (${activeZombies.length} total):\n`;
    for (let lane = 0; lane < 3; lane++) {
      const zombies = laneData[lane];
      if (zombies.length === 0) {
        text += `L${lane}: -\n`;
      } else {
        // Sort by column (frontmost first)
        zombies.sort((a, b) => a.col - b.col);
        const info = zombies.map(z => `c${z.col}:${z.hp}hp(${z.state})`).join(' ');
        text += `L${lane}: ${info}\n`;
      }
    }

    this.debugText.setText(text);
  }

  /**
   * Create plant selector UI (top-left buttons)
   */
  createPlantSelectorUI() {
    const positions = this.plantSelector.getButtonPositions();
    const { buttonSize } = PLANT_SELECTOR_CONFIG;

    positions.forEach((pos, index) => {
      // Button background
      const button = this.add.rectangle(
        pos.x, pos.y,
        buttonSize, buttonSize,
        0x333333
      ).setStrokeStyle(2, 0x666666);
      button.setInteractive({ useHandCursor: true });
      button.setData('plantType', pos.type);

      // Plant icon (emoji text)
      const icon = this.add.text(
        pos.x, pos.y - 8,
        pos.icon,
        { fontSize: '28px' }
      ).setOrigin(0.5);

      // Cost label
      const costLabel = this.add.text(
        pos.x, pos.y + 20,
        `$${pos.cost}`,
        { fontSize: '12px', fill: '#FFD700', fontStyle: 'bold' }
      ).setOrigin(0.5);

      // Store button data
      this.plantButtons.push({ button, icon, costLabel, type: pos.type, cost: pos.cost });

      // Click handler
      button.on('pointerdown', () => {
        this.handlePlantButtonClick(pos.type);
      });

      // Hover effects
      button.on('pointerover', () => {
        if (this.plantSelector.getSelectedPlant() !== pos.type) {
          button.setStrokeStyle(2, 0xFFFF00);
        }
      });

      button.on('pointerout', () => {
        if (this.plantSelector.getSelectedPlant() !== pos.type) {
          button.setStrokeStyle(2, 0x666666);
        }
      });
    });
  }

  /**
   * Handle plant selector button click
   * @param {string} plantType
   */
  handlePlantButtonClick(plantType) {
    this.plantSelector.selectPlant(plantType);
    this.updatePlantSelectorUI();
  }

  /**
   * Update plant selector UI visual state
   */
  updatePlantSelectorUI() {
    const selectedPlant = this.plantSelector.getSelectedPlant();
    const currentMoney = this.moneyManager.getMoney();

    this.plantButtons.forEach(({ button, costLabel, type, cost }) => {
      const isSelected = selectedPlant === type;
      const canAfford = currentMoney >= cost;

      // Update button appearance
      if (isSelected) {
        button.setFillStyle(0x4CAF50);  // Green when selected
        button.setStrokeStyle(3, 0xFFFF00);  // Yellow border
      } else {
        button.setFillStyle(canAfford ? 0x333333 : 0x1a1a1a);  // Darker if can't afford
        button.setStrokeStyle(2, 0x666666);
      }

      // Update cost label color
      costLabel.setColor(canAfford ? '#FFD700' : '#FF6666');
    });
  }

  /**
   * Start wave-based zombie spawning
   */
  startWaveSystem() {
    this.waveManager.startWaves();
    this.updateWaveDisplay();
    this.showWaveMessage(`Wave 1 Starting!`);

    // Start spawning for current wave
    this.scheduleNextSpawn();
  }

  /**
   * Schedule next zombie spawn based on wave timing
   */
  scheduleNextSpawn() {
    if (this.gameOver || !this.waveManager.canSpawn()) return;

    const interval = this.waveManager.getSpawnInterval();

    this.spawnTimer = this.time.delayedCall(interval, () => {
      if (this.gameOver || this.quizActive) {
        // Retry after quiz
        this.scheduleNextSpawn();
        return;
      }

      // Spawn zombie with wave speed modifier
      const speedMultiplier = this.waveManager.getSpeedMultiplier();
      this.zombieManager.spawnRandomZombie(speedMultiplier);
      this.waveManager.recordSpawn();

      // Check if wave spawning complete
      if (this.waveManager.isWaveSpawnComplete()) {
        // Wait for all zombies to be killed, then advance wave
        // This will be checked in update()
      } else {
        this.scheduleNextSpawn();
      }
    });
  }

  /**
   * Show wave message overlay
   */
  showWaveMessage(message) {
    const waveMessage = this.add.text(
      this.scale.width / 2,
      this.scale.height / 2,
      message,
      { fontSize: '36px', fill: '#ffffff', fontStyle: 'bold', stroke: '#000000', strokeThickness: 4 }
    ).setOrigin(0.5).setDepth(500);

    this.tweens.add({
      targets: waveMessage,
      alpha: 0,
      y: this.scale.height / 2 - 50,
      duration: 2000,
      onComplete: () => waveMessage.destroy()
    });
  }

  /**
   * Check and handle wave completion
   */
  checkWaveCompletion() {
    if (!this.waveManager.isActive()) return;

    // If spawning complete and all zombies killed
    if (this.waveManager.isWaveSpawnComplete() &&
        this.zombieManager.getActiveZombieCount() === 0) {

      if (this.waveManager.getCurrentWave() >= this.waveManager.getTotalWaves()) {
        // Victory!
        this.handleVictory();
      } else {
        // Start pause before next wave
        this.startWavePause();
      }
    }
  }

  /**
   * Start pause between waves
   */
  startWavePause() {
    this.waveManager.startPause();
    this.gameStats.recordWaveComplete();
    const nextWave = this.waveManager.getCurrentWave() + 1;

    this.showWaveMessage(`Wave ${this.waveManager.getCurrentWave()} Complete!`);

    this.time.delayedCall(WAVE_CONFIG.pauseBetweenWavesMs, () => {
      if (this.gameOver) return;

      this.waveManager.endPause();
      this.updateWaveDisplay();
      this.showWaveMessage(`Wave ${this.waveManager.getCurrentWave()} Starting!`);
      this.scheduleNextSpawn();
    });
  }

  /**
   * Handle victory (survived all waves)
   */
  handleVictory() {
    this.gameOver = true;
    this.gameStats.recordWaveComplete(); // Final wave
    this.gameStats.recordVictory();
    this.gameStats.setFinalMoney(this.moneyManager.getMoney());

    console.log('Victory! All waves survived!');

    this.showEndScreen(true);
  }

  /**
   * Show end game screen with stats
   * @param {boolean} isVictory
   */
  showEndScreen(isVictory) {
    const stats = this.gameStats.getSummary();
    const centerX = this.scale.width / 2;
    const centerY = this.scale.height / 2;
    const panelWidth = 400;
    const panelHeight = 380;

    // Overlay
    this.add.rectangle(
      centerX, centerY,
      this.scale.width, this.scale.height,
      0x000000, 0.8
    ).setDepth(1000);

    // Panel background
    this.add.rectangle(
      centerX, centerY,
      panelWidth, panelHeight,
      0x1a1a2e
    ).setDepth(1001).setStrokeStyle(3, isVictory ? 0x4CAF50 : 0xF44336);

    // Title
    const title = isVictory ? 'VICTORY!' : 'GAME OVER';
    const titleColor = isVictory ? '#4CAF50' : '#F44336';
    this.add.text(
      centerX, centerY - 160,
      title,
      { fontSize: '36px', fill: titleColor, fontStyle: 'bold' }
    ).setOrigin(0.5).setDepth(1002);

    // Stats display
    const statsY = centerY - 100;
    const lineHeight = 28;
    const statsLines = [
      `Waves Survived: ${stats.wavesCompleted}/${stats.totalWaves}`,
      `Questions Answered: ${stats.questionsAnswered}`,
      `Correct Answers: ${stats.questionsCorrect}`,
      `Accuracy: ${stats.accuracy}%`,
      `Final Money: $${stats.finalMoney}`,
      `Plants Placed: ${stats.plantsPlaced}`,
      `Zombies Defeated: ${stats.zombiesKilled}`
    ];

    statsLines.forEach((line, i) => {
      this.add.text(
        centerX, statsY + i * lineHeight,
        line,
        { fontSize: '18px', fill: '#ffffff' }
      ).setOrigin(0.5).setDepth(1002);
    });

    // Defeat tip
    if (!isVictory) {
      const tip = this.gameStats.getRandomDefeatTip();
      this.add.text(
        centerX, centerY + 100,
        tip,
        { fontSize: '14px', fill: '#FFA500', fontStyle: 'italic', wordWrap: { width: panelWidth - 40 }, align: 'center' }
      ).setOrigin(0.5).setDepth(1002);
    }

    // Restart button
    const buttonY = centerY + 150;
    const buttonText = isVictory ? 'PLAY AGAIN' : 'TRY AGAIN';
    const buttonColor = isVictory ? 0x2196F3 : 0x4CAF50;

    const restartButton = this.add.rectangle(
      centerX, buttonY,
      200, 50,
      buttonColor
    ).setDepth(1002);
    restartButton.setStrokeStyle(2, isVictory ? 0x1976D2 : 0x2E7D32);
    restartButton.setInteractive({ useHandCursor: true });

    this.add.text(
      centerX, buttonY,
      buttonText,
      { fontSize: '22px', fill: '#ffffff', fontStyle: 'bold' }
    ).setOrigin(0.5).setDepth(1003);

    restartButton.on('pointerover', () => restartButton.setFillStyle(isVictory ? 0x42A5F5 : 0x66BB6A));
    restartButton.on('pointerout', () => restartButton.setFillStyle(buttonColor));
    restartButton.on('pointerdown', () => this.restartGame());
  }

  /**
   * Load questions from JSON file
   */
  async loadQuestions() {
    await this.questionManager.loadFromFile('assets/data/questions.json');
    this.questionManager.shuffle();
    console.log(`Loaded ${this.questionManager.getTotalCount()} questions`);
  }

  /**
   * Start the periodic quiz timer (wave-based intervals)
   */
  startQuizTimer() {
    // First quiz after delay
    this.time.delayedCall(QUIZ_CONFIG.firstQuizDelayMs, () => {
      this.triggerQuiz();
      this.scheduleNextQuiz();
    });
  }

  /**
   * Schedule next quiz based on current wave interval
   */
  scheduleNextQuiz() {
    if (this.gameOver) return;

    const interval = this.waveManager.getQuizInterval();

    this.time.delayedCall(interval, () => {
      if (!this.gameOver && !this.quizActive) {
        this.triggerQuiz();
      }
      this.scheduleNextQuiz();
    });
  }

  /**
   * Trigger a quiz question
   */
  triggerQuiz() {
    if (this.quizActive || this.gameOver) return;

    const question = this.questionManager.getNextQuestion();
    if (!question) {
      // No more questions - reset and shuffle
      this.questionManager.reset();
      return;
    }

    this.quizActive = true;
    this.currentQuestion = question;

    // S7-003: Emit event to React instead of using old QuizUIManager
    this.events.emit('quiz:show', question);
  }

  /**
   * S7-003: Setup React event bridge listeners
   */
  setupReactBridge() {
    // Listen for quiz answers from React
    this.events.on('quiz:answer', (answerIndex) => {
      if (!this.quizActive || !this.currentQuestion) return;

      const isCorrect = answerIndex === this.currentQuestion.correctIndex;

      // Emit result back to React
      this.events.emit('quiz:result', {
        correct: isCorrect,
        correctIndex: this.currentQuestion.correctIndex
      });

      // Handle the result internally
      this.handleQuizResult({
        isCorrect,
        isTimeout: false
      });
    });

    // AC5: Listen for continue button press
    this.events.on('quiz:continue', () => {
      this.quizActive = false;
      this.currentQuestion = null;
      this.events.emit('quiz:hide');
    });
  }

  /**
   * S7-003: Emit money update to React
   */
  emitMoneyUpdate() {
    this.events.emit('money:update', {
      current: this.moneyManager.getMoney(),
      earned: this.gameStats.getStats().moneyEarned,
      lost: this.gameStats.getStats().moneyLost
    });
  }

  /**
   * S7-003: Emit wave update to React
   */
  emitWaveUpdate() {
    const stats = this.waveManager.getStats();
    this.events.emit('wave:update', {
      current: stats.currentWave,
      total: stats.totalWaves,
      state: stats.state
    });
  }

  /**
   * Handle quiz answer result
   * @param {Object} result - Quiz result from QuizUI
   */
  handleQuizResult(result) {
    if (result.isCorrect) {
      this.moneyManager.correctAnswer();
      this.gameStats.recordCorrectAnswer();
      this.gameStats.recordMoneyEarned(MONEY_CONFIG.correctReward);
      this.showQuizFeedback(true);
    } else if (result.isTimeout) {
      // Timeout counts as wrong answer per GD specs
      this.moneyManager.wrongAnswer();
      this.gameStats.recordTimeout();
      this.gameStats.recordMoneyLost(MONEY_CONFIG.wrongPenalty);
      this.showQuizFeedback(false);
    } else {
      this.moneyManager.wrongAnswer();
      this.gameStats.recordWrongAnswer();
      this.gameStats.recordMoneyLost(MONEY_CONFIG.wrongPenalty);
      this.showQuizFeedback(false);
    }

    this.updateMoneyDisplay();
    this.quizActive = false;
  }

  /**
   * Show visual feedback for quiz result
   * @param {boolean} correct
   */
  showQuizFeedback(correct) {
    const color = correct ? '#4CAF50' : '#F44336';
    const text = correct
      ? `+$${MONEY_CONFIG.correctReward}`
      : `-$${MONEY_CONFIG.wrongPenalty}`;

    const feedbackText = this.add.text(
      this.scale.width - 100,
      60,
      text,
      { fontSize: '20px', fill: color, fontStyle: 'bold' }
    ).setOrigin(0.5);

    // Animate and destroy
    this.tweens.add({
      targets: feedbackText,
      y: 40,
      alpha: 0,
      duration: 1500,
      onComplete: () => feedbackText.destroy()
    });
  }

  createMoneyDisplay() {
    // Money display background
    this.add.rectangle(
      this.scale.width - 100,
      30,
      180,
      40,
      0x000000,
      0.7
    );

    // Money icon (yellow circle as placeholder)
    this.add.circle(this.scale.width - 170, 30, 12, 0xFFD700);

    // Money text
    this.moneyText = this.add.text(
      this.scale.width - 150,
      30,
      `$${this.moneyManager.getMoney()}`,
      { fontSize: '24px', fill: '#FFD700', fontStyle: 'bold' }
    ).setOrigin(0, 0.5);
  }

  updateMoneyDisplay() {
    if (this.moneyText) {
      const money = this.moneyManager.getMoney();
      this.moneyText.setText(`$${money}`);

      // Color based on money amount (use cheapest plant cost = 50)
      const cheapestPlantCost = 50;  // Wallnut cost
      if (money < 0) {
        this.moneyText.setColor('#FF0000');
      } else if (money < cheapestPlantCost) {
        this.moneyText.setColor('#FFA500'); // Orange - can't afford any plant
      } else {
        this.moneyText.setColor('#FFD700'); // Gold - normal
      }
    }

    // Update plant selector affordability
    this.updatePlantSelectorUI();

    // S7-003: Emit to React
    this.emitMoneyUpdate();
  }

  update(time, delta) {
    if (this.gameOver) return;

    // S7-003 AC7: Game continues during quiz (removed quizActive pause)

    // Update plant cooldowns
    this.plantManager.update(delta);

    // Update zombies
    const zombieEvents = this.zombieManager.update(delta);

    // Plants fire at zombies in their lane
    this.handlePlantFiring(delta);

    // Update projectiles
    this.projectileManager.update(delta);

    // Check collisions
    this.handleCollisions();

    // Check zombie-plant collisions (blocking and attacking)
    this.handleZombiePlantCollisions(delta);

    // Check for game over
    if (zombieEvents.reachedHouse.length > 0) {
      this.handleGameOver(zombieEvents.reachedHouse[0]);
    }

    // Check for wave completion
    this.checkWaveCompletion();

    // S7-002: Update debug overlay
    this.updateDebugUI();
  }

  handleGameOver(zombie) {
    this.gameOver = true;
    this.gameStats.recordDefeat();
    this.gameStats.setFinalMoney(this.moneyManager.getMoney());

    console.log(`Game Over! Zombie ${zombie.id} reached the house in lane ${zombie.lane}`);

    this.showEndScreen(false);
  }

  restartGame() {
    // Clear all managers
    this.zombieManager.clearAll();
    this.plantManager.clearAll();
    this.projectileManager.clearAll();
    this.moneyManager.reset();
    this.questionManager.reset();
    this.waveManager.reset();
    this.gameStats.reset();

    // Cancel spawn timer
    if (this.spawnTimer) {
      this.spawnTimer.remove();
    }

    // Reset game state
    this.gameOver = false;
    this.quizActive = false;

    // Restart scene
    this.scene.restart();
  }

  handlePlantFiring(delta) {
    // For each lane, check if there are zombies
    // If so, make plants in that lane fire
    for (let lane = 0; lane < this.gridConfig.lanes; lane++) {
      const zombiesInLane = this.zombieManager.getZombiesInLane(lane);
      const plantsInLane = this.plantManager.getPlantsInLane(lane);

      if (zombiesInLane.length > 0 && plantsInLane.length > 0) {
        for (const plant of plantsInLane) {
          if (plant.canFire()) {
            const damage = plant.fire();
            if (damage > 0) {
              // Create pea projectile
              this.projectileManager.firePea(lane, plant.col, damage);
            }
          }
        }
      }
    }
  }

  handleCollisions() {
    // For each lane, check pea-zombie collisions
    for (let lane = 0; lane < this.gridConfig.lanes; lane++) {
      const peasInLane = this.projectileManager.getPeasInLane(lane);
      const zombiesInLane = this.zombieManager.getZombiesInLane(lane);

      if (peasInLane.length === 0 || zombiesInLane.length === 0) {
        continue;
      }

      // Sort zombies by x position (leftmost first - closest to house)
      zombiesInLane.sort((a, b) => a.col - b.col);

      for (const pea of peasInLane) {
        // Find first zombie that pea can hit
        for (const zombie of zombiesInLane) {
          const zombiePos = this.zombieManager.getZombieScreenPosition(zombie);

          if (this.projectileManager.checkCollision(pea, zombiePos.x, 40)) {
            // Pea hits zombie
            this.projectileManager.hitTarget(pea.id);
            const died = this.zombieManager.damageZombie(zombie.id, pea.damage);

            if (died) {
              this.gameStats.recordZombieKilled();
            }

            break; // Pea can only hit one zombie
          }
        }
      }
    }
  }

  /**
   * Handle zombie-plant collisions (zombies attack plants)
   * @param {number} delta - Time since last frame in ms
   */
  handleZombiePlantCollisions(delta) {
    const deltaSeconds = delta / 1000;

    // Track which plants are being attacked this frame (by grid key)
    // Only frontmost zombie (lowest col) attacks each plant
    const plantsBeingAttacked = new Map(); // gridKey -> zombie

    // Sort zombies by position (frontmost first = lowest col + progress)
    const sortedZombies = [...this.zombieManager.getActiveZombies()].sort((a, b) => {
      const posA = a.col - a.tileProgress;
      const posB = b.col - b.tileProgress;
      return posA - posB; // Frontmost (lowest position) first
    });

    for (const zombie of sortedZombies) {
      // Bug fix #1: Use actual zombie column, not anticipated
      const checkCol = Math.max(1, zombie.col); // Don't check house zone

      // Check if there's a plant in the zombie's current cell
      const plant = this.plantManager.getPlantAt(zombie.lane, checkCol);
      const gridKey = `${zombie.lane},${checkCol}`;

      if (plant && plant.isAlive()) {
        // Bug fix #2: Only frontmost zombie attacks each plant
        if (!plantsBeingAttacked.has(gridKey)) {
          // This zombie is the frontmost - it attacks
          plantsBeingAttacked.set(gridKey, zombie);

          if (zombie.state !== 'attacking') {
            zombie.startAttacking();
          }

          // Deal damage to plant (zombie DPS * delta time)
          const damage = zombie.getDps() * deltaSeconds;
          const plantDied = this.plantManager.damagePlant(zombie.lane, checkCol, damage);

          if (plantDied) {
            // Plant destroyed, zombie resumes walking
            zombie.stopAttacking();
          }
        } else {
          // Another zombie is already attacking this plant - wait (blocked)
          // Keep zombie in walking state but it won't move (blocked by plant)
          if (zombie.state === 'attacking') {
            zombie.stopAttacking();
          }
        }
      } else if (zombie.state === 'attacking') {
        // No plant here anymore, resume walking
        zombie.stopAttacking();
      }
    }
  }

  createLawnBackground() {
    // Solid green lawn background
    const lawnColor = 0x4a8f3c;
    const { gridMarginLeft, gridMarginTop, gridWidth, gridHeight } = this.gridConfig;

    this.add.rectangle(
      gridMarginLeft + gridWidth / 2,
      gridMarginTop + gridHeight / 2,
      gridWidth,
      gridHeight,
      lawnColor
    );
  }

  createGrid() {
    const { lanes, columns } = this.gridConfig;

    // Initialize 2D array
    this.gridCells = Array(lanes).fill(null).map(() => Array(columns).fill(null));

    // Create grid cells
    for (let lane = 0; lane < lanes; lane++) {
      for (let col = 0; col < columns; col++) {
        const cell = this.createGridCell(lane, col);
        this.gridCells[lane][col] = cell;
      }
    }

    // Draw grid lines for visual clarity
    this.drawGridLines();
  }

  createGridCell(lane, col) {
    const bounds = this.gridConfig.getCellBounds(lane, col);
    const isHouse = this.gridConfig.isHouseZone(lane, col);

    // Alternate cell colors for checkerboard pattern (lawn tiles)
    const isEven = (lane + col) % 2 === 0;
    const lawnLight = 0x5da142;
    const lawnDark = 0x4a8f3c;
    const houseColor = 0x8b4513;  // Brown for house zone

    const fillColor = isHouse ? houseColor : (isEven ? lawnLight : lawnDark);

    const cell = this.add.rectangle(
      bounds.x + bounds.width / 2,
      bounds.y + bounds.height / 2,
      bounds.width - 2,  // Small gap between cells
      bounds.height - 2,
      fillColor
    );

    // Make plantable cells interactive
    if (this.gridConfig.isPlantable(lane, col)) {
      cell.setInteractive({ useHandCursor: true });

      // Store grid coordinates on the cell
      cell.setData('lane', lane);
      cell.setData('col', col);

      // Hover effects
      cell.on('pointerover', () => {
        if (!this.isCellOccupied(lane, col)) {
          cell.setStrokeStyle(3, 0xffff00);  // Yellow highlight
        }
      });

      cell.on('pointerout', () => {
        cell.setStrokeStyle(0);
      });
    }

    return cell;
  }

  drawGridLines() {
    const graphics = this.add.graphics();
    graphics.lineStyle(1, 0x2d5a1e, 0.5);  // Dark green, semi-transparent

    const { lanes, columns, gridMarginLeft, gridMarginTop, cellWidth, cellHeight, gridWidth, gridHeight } = this.gridConfig;

    // Vertical lines
    for (let col = 0; col <= columns; col++) {
      const x = gridMarginLeft + (col * cellWidth);
      graphics.lineBetween(x, gridMarginTop, x, gridMarginTop + gridHeight);
    }

    // Horizontal lines
    for (let lane = 0; lane <= lanes; lane++) {
      const y = gridMarginTop + (lane * cellHeight);
      graphics.lineBetween(gridMarginLeft, y, gridMarginLeft + gridWidth, y);
    }
  }

  createHouseZone() {
    const { lanes, gridMarginLeft, gridMarginTop, cellWidth, cellHeight } = this.gridConfig;

    // Add "HOUSE" label for each lane in column 0
    for (let lane = 0; lane < lanes; lane++) {
      const center = this.gridConfig.getCellCenter(lane, 0);

      // House icon (placeholder - simple house shape)
      const houseGraphics = this.add.graphics();
      houseGraphics.fillStyle(0x654321, 1);  // Dark brown

      // Draw simple house shape
      const houseWidth = cellWidth * 0.6;
      const houseHeight = cellHeight * 0.5;
      const roofHeight = cellHeight * 0.25;

      // House body
      houseGraphics.fillRect(
        center.x - houseWidth / 2,
        center.y - houseHeight / 2 + roofHeight / 2,
        houseWidth,
        houseHeight
      );

      // Roof (triangle)
      houseGraphics.fillStyle(0x8b0000, 1);  // Dark red roof
      houseGraphics.beginPath();
      houseGraphics.moveTo(center.x, center.y - houseHeight / 2 - roofHeight / 2);
      houseGraphics.lineTo(center.x - houseWidth / 2 - 5, center.y - houseHeight / 2 + roofHeight / 2);
      houseGraphics.lineTo(center.x + houseWidth / 2 + 5, center.y - houseHeight / 2 + roofHeight / 2);
      houseGraphics.closePath();
      houseGraphics.fill();
    }

    // Add "DEFEND" label at top
    this.add.text(
      gridMarginLeft + cellWidth / 2,
      gridMarginTop - 20,
      'DEFEND',
      { fontSize: '14px', fill: '#ffffff', fontStyle: 'bold' }
    ).setOrigin(0.5);
  }

  setupInputHandling() {
    // Click on grid cell to place plant (placeholder for S1-004)
    this.input.on('gameobjectdown', (pointer, gameObject) => {
      const lane = gameObject.getData('lane');
      const col = gameObject.getData('col');

      if (lane !== undefined && col !== undefined) {
        this.handleCellClick(lane, col);
      }
    });
  }

  handleCellClick(lane, col) {
    // Check if a plant is selected
    const selectedPlant = this.plantSelector.getSelectedPlant();
    if (!selectedPlant) {
      this.showSelectPlantFeedback();
      return;
    }

    // Check if player can afford the selected plant
    const plantCost = this.plantSelector.getPlantCost(selectedPlant);
    if (!this.moneyManager.canAfford(plantCost)) {
      this.showCannotAffordFeedback();
      return;
    }

    // Use PlantManager to place plant with type
    const plant = this.plantManager.placePlant(lane, col, selectedPlant);

    if (plant) {
      // Deduct money for specific plant
      this.moneyManager.spend(plantCost);
      this.updateMoneyDisplay();

      // Track stat
      this.gameStats.recordPlantPlaced();

      // Clear selection after placing (click-to-select-then-place flow)
      this.plantSelector.clearSelection();
      this.updatePlantSelectorUI();

      // Remove hover effect from this cell
      const cell = this.gridCells[lane][col];
      cell.setStrokeStyle(0);
      cell.disableInteractive();
    }
  }

  /**
   * Show feedback when no plant is selected
   */
  showSelectPlantFeedback() {
    const warningText = this.add.text(
      this.scale.width / 2,
      100,
      'Select a plant first!',
      { fontSize: '24px', fill: '#FFA500', fontStyle: 'bold' }
    ).setOrigin(0.5);

    this.tweens.add({
      targets: warningText,
      alpha: 0,
      y: 80,
      duration: 1000,
      onComplete: () => warningText.destroy()
    });
  }

  showCannotAffordFeedback() {
    // Flash the money display red
    const originalColor = this.moneyText.style.color;
    this.moneyText.setColor('#FF0000');

    // Show "Not enough money!" text briefly
    const warningText = this.add.text(
      this.scale.width / 2,
      100,
      'Not enough money!',
      { fontSize: '24px', fill: '#FF0000', fontStyle: 'bold' }
    ).setOrigin(0.5);

    // Fade out and destroy
    this.tweens.add({
      targets: warningText,
      alpha: 0,
      y: 80,
      duration: 1000,
      onComplete: () => {
        warningText.destroy();
        this.moneyText.setColor(originalColor);
      }
    });
  }

  /**
   * Check if a cell is occupied by a plant
   * @param {number} lane
   * @param {number} col
   * @returns {boolean}
   */
  isCellOccupied(lane, col) {
    return this.plantManager.hasPlantAt(lane, col);
  }

  /**
   * Get the grid configuration (for other scenes/modules)
   * @returns {GridConfig}
   */
  getGridConfig() {
    return this.gridConfig;
  }
}
