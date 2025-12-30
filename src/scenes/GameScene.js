// src/scenes/GameScene.js
// Main game scene with 3-lane grid

import Phaser from 'phaser';
import { GridConfig } from '../utils/GridConfig.js';

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    this.gridConfig = null;
    this.gridCells = [];  // 2D array of cell graphics
    this.occupiedCells = new Set();  // Track occupied cells "lane,col"
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

    // Setup input handling
    this.setupInputHandling();
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
    if (this.isCellOccupied(lane, col)) {
      console.log(`Cell (${lane}, ${col}) is already occupied`);
      return;
    }

    if (!this.gridConfig.isPlantable(lane, col)) {
      console.log(`Cell (${lane}, ${col}) is not plantable`);
      return;
    }

    console.log(`Clicked plantable cell: lane=${lane}, col=${col}`);

    // Visual feedback - mark cell as "selected" (placeholder for plant placement)
    const center = this.gridConfig.getCellCenter(lane, col);

    // Placeholder plant (green circle)
    const placeholder = this.add.circle(center.x, center.y, 25, 0x00ff00);
    placeholder.setStrokeStyle(2, 0x006600);

    // Mark cell as occupied
    this.setCellOccupied(lane, col, true);

    // Remove hover effect from this cell
    const cell = this.gridCells[lane][col];
    cell.setStrokeStyle(0);
    cell.disableInteractive();
  }

  isCellOccupied(lane, col) {
    return this.occupiedCells.has(`${lane},${col}`);
  }

  setCellOccupied(lane, col, occupied) {
    const key = `${lane},${col}`;
    if (occupied) {
      this.occupiedCells.add(key);
    } else {
      this.occupiedCells.delete(key);
    }
  }

  /**
   * Get the grid configuration (for other scenes/modules)
   * @returns {GridConfig}
   */
  getGridConfig() {
    return this.gridConfig;
  }
}
