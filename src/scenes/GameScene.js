// src/scenes/GameScene.js
// Main game scene with 3-lane grid

import Phaser from 'phaser';
import { GridConfig } from '../utils/GridConfig.js';
import { ZombieManager } from '../managers/ZombieManager.js';
import { PlantManager } from '../managers/PlantManager.js';
import { ProjectileManager } from '../managers/ProjectileManager.js';

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    this.gridConfig = null;
    this.gridCells = [];  // 2D array of cell graphics
    this.zombieManager = null;
    this.plantManager = null;
    this.projectileManager = null;
    this.gameOver = false;
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

    // Setup input handling
    this.setupInputHandling();

    // Start spawning zombies (for testing)
    this.startZombieSpawning();
  }

  update(time, delta) {
    if (this.gameOver) return;

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

    // Check for game over
    if (zombieEvents.reachedHouse.length > 0) {
      this.handleGameOver(zombieEvents.reachedHouse[0]);
    }
  }

  startZombieSpawning() {
    // Spawn a zombie every 3 seconds for testing
    this.time.addEvent({
      delay: 3000,
      callback: () => {
        if (!this.gameOver) {
          this.zombieManager.spawnRandomZombie();
        }
      },
      loop: true
    });

    // Spawn first zombie immediately
    this.zombieManager.spawnRandomZombie();
  }

  handleGameOver(zombie) {
    this.gameOver = true;
    console.log(`Game Over! Zombie ${zombie.id} reached the house in lane ${zombie.lane}`);

    // Display game over overlay
    this.add.rectangle(
      this.scale.width / 2,
      this.scale.height / 2,
      400,
      200,
      0x000000,
      0.8
    );

    this.add.text(
      this.scale.width / 2,
      this.scale.height / 2 - 50,
      'GAME OVER',
      { fontSize: '48px', fill: '#ff0000', fontStyle: 'bold' }
    ).setOrigin(0.5);

    this.add.text(
      this.scale.width / 2,
      this.scale.height / 2,
      'Zombie reached your house!',
      { fontSize: '20px', fill: '#ffffff' }
    ).setOrigin(0.5);

    // Restart button
    const restartButton = this.add.rectangle(
      this.scale.width / 2,
      this.scale.height / 2 + 60,
      200,
      50,
      0x4CAF50
    );
    restartButton.setStrokeStyle(2, 0x2E7D32);
    restartButton.setInteractive({ useHandCursor: true });

    const restartText = this.add.text(
      this.scale.width / 2,
      this.scale.height / 2 + 60,
      'RESTART',
      { fontSize: '24px', fill: '#ffffff', fontStyle: 'bold' }
    ).setOrigin(0.5);

    // Hover effects
    restartButton.on('pointerover', () => {
      restartButton.setFillStyle(0x66BB6A);
    });

    restartButton.on('pointerout', () => {
      restartButton.setFillStyle(0x4CAF50);
    });

    // Restart game on click
    restartButton.on('pointerdown', () => {
      this.restartGame();
    });
  }

  restartGame() {
    // Clear all managers
    this.zombieManager.clearAll();
    this.plantManager.clearAll();
    this.projectileManager.clearAll();

    // Reset game state
    this.gameOver = false;

    // Restart scene
    this.scene.restart();
  }

  handlePlantFiring(delta) {
    // For each lane, check if there are zombies
    // If so, make plants in that lane fire
    for (let lane = 0; lane < this.gridConfig.lanes; lane++) {
      const zombiesInLane = this.zombieManager.getZombiesInLane(lane);

      if (zombiesInLane.length > 0) {
        // Get plants in this lane
        const plantsInLane = this.plantManager.getPlantsInLane(lane);

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
              console.log(`Zombie ${zombie.id} killed by pea!`);
            }

            break; // Pea can only hit one zombie
          }
        }
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
    // Use PlantManager to place plant
    const plant = this.plantManager.placePlant(lane, col);

    if (plant) {
      // Remove hover effect from this cell
      const cell = this.gridCells[lane][col];
      cell.setStrokeStyle(0);
      cell.disableInteractive();
    }
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
