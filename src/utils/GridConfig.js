// src/utils/GridConfig.js
// Grid configuration for 3-lane tower defense game board

export class GridConfig {
  constructor(options = {}) {
    // Grid dimensions (from GD balance values)
    this.lanes = options.lanes || 3;
    this.columns = options.columns || 9;

    // Screen dimensions (match Phaser config)
    this.gameWidth = options.gameWidth || 960;
    this.gameHeight = options.gameHeight || 540;

    // Calculate cell dimensions
    // Leave margin for UI elements
    this.gridMarginTop = options.gridMarginTop || 60;
    this.gridMarginBottom = options.gridMarginBottom || 40;
    this.gridMarginLeft = options.gridMarginLeft || 40;
    this.gridMarginRight = options.gridMarginRight || 40;

    // Playable area
    this.gridWidth = this.gameWidth - this.gridMarginLeft - this.gridMarginRight;
    this.gridHeight = this.gameHeight - this.gridMarginTop - this.gridMarginBottom;

    // Cell size
    this.cellWidth = this.gridWidth / this.columns;
    this.cellHeight = this.gridHeight / this.lanes;

    // House zone (leftmost column)
    this.houseColumn = 0;
  }

  /**
   * Get the center position of a grid cell in screen coordinates
   * @param {number} lane - Lane index (0-2, top to bottom)
   * @param {number} col - Column index (0-8, left to right)
   * @returns {{x: number, y: number}} Screen position
   */
  getCellCenter(lane, col) {
    const x = this.gridMarginLeft + (col * this.cellWidth) + (this.cellWidth / 2);
    const y = this.gridMarginTop + (lane * this.cellHeight) + (this.cellHeight / 2);
    return { x, y };
  }

  /**
   * Convert screen position to grid coordinates
   * @param {number} screenX - Screen X position
   * @param {number} screenY - Screen Y position
   * @returns {{lane: number, col: number}|null} Grid coordinates or null if outside grid
   */
  screenToGrid(screenX, screenY) {
    const col = Math.floor((screenX - this.gridMarginLeft) / this.cellWidth);
    const lane = Math.floor((screenY - this.gridMarginTop) / this.cellHeight);

    if (this.isValidCell(lane, col)) {
      return { lane, col };
    }
    return null;
  }

  /**
   * Check if grid coordinates are valid
   * @param {number} lane - Lane index
   * @param {number} col - Column index
   * @returns {boolean}
   */
  isValidCell(lane, col) {
    return lane >= 0 && lane < this.lanes && col >= 0 && col < this.columns;
  }

  /**
   * Check if position is in the house zone (left edge)
   * @param {number} lane - Lane index
   * @param {number} col - Column index
   * @returns {boolean}
   */
  isHouseZone(lane, col) {
    return this.isValidCell(lane, col) && col === this.houseColumn;
  }

  /**
   * Check if a cell is plantable (not house zone)
   * @param {number} lane - Lane index
   * @param {number} col - Column index
   * @returns {boolean}
   */
  isPlantable(lane, col) {
    return this.isValidCell(lane, col) && col > this.houseColumn;
  }

  /**
   * Get the bounds of a grid cell
   * @param {number} lane - Lane index
   * @param {number} col - Column index
   * @returns {{x: number, y: number, width: number, height: number}}
   */
  getCellBounds(lane, col) {
    const x = this.gridMarginLeft + (col * this.cellWidth);
    const y = this.gridMarginTop + (lane * this.cellHeight);
    return {
      x,
      y,
      width: this.cellWidth,
      height: this.cellHeight
    };
  }

  /**
   * Get grid origin (top-left corner)
   * @returns {{x: number, y: number}}
   */
  getGridOrigin() {
    return {
      x: this.gridMarginLeft,
      y: this.gridMarginTop
    };
  }
}
