// src/ui/PlantSelector.js
// Plant selection UI for choosing which plant to place

// Plant selector configuration
export const PLANT_SELECTOR_CONFIG = {
  buttonSize: 60,     // 60x60px buttons per GD spec
  padding: 10,        // Padding from screen edge
  gap: 10,            // Gap between buttons
  plants: [
    { type: 'peashooter', cost: 75, icon: '🌱' },
    { type: 'wallnut', cost: 50, icon: '🧱' }
  ]
};

/**
 * PlantSelector handles plant type selection logic
 * Click-to-select-then-place flow
 * Note: This is a pure logic class - rendering handled by GameScene
 */
export class PlantSelector {
  /**
   * @param {Object} options
   * @param {number} options.gameWidth - Game width
   * @param {number} options.gameHeight - Game height
   */
  constructor(options = {}) {
    this.gameWidth = options.gameWidth ?? 800;
    this.gameHeight = options.gameHeight ?? 600;

    // Currently selected plant type (null = none)
    this.selectedPlant = null;

    // Build plant lookup map
    this.plantMap = new Map();
    for (const plant of PLANT_SELECTOR_CONFIG.plants) {
      this.plantMap.set(plant.type, plant);
    }
  }

  /**
   * Get button positions for rendering
   * @returns {Array<{x: number, y: number, type: string, cost: number, icon: string}>}
   */
  getButtonPositions() {
    const { buttonSize, padding, gap, plants } = PLANT_SELECTOR_CONFIG;

    return plants.map((plant, index) => ({
      x: padding + buttonSize / 2 + index * (buttonSize + gap),
      y: padding + buttonSize / 2,
      type: plant.type,
      cost: plant.cost,
      icon: plant.icon
    }));
  }

  /**
   * Get currently selected plant type
   * @returns {string|null}
   */
  getSelectedPlant() {
    return this.selectedPlant;
  }

  /**
   * Select a plant type
   * @param {string} plantType
   */
  selectPlant(plantType) {
    // Validate plant type
    if (!this.plantMap.has(plantType)) {
      return;
    }

    // Toggle off if same plant selected
    if (this.selectedPlant === plantType) {
      this.selectedPlant = null;
    } else {
      this.selectedPlant = plantType;
    }
  }

  /**
   * Clear current selection
   */
  clearSelection() {
    this.selectedPlant = null;
  }

  /**
   * Get cost for a plant type
   * @param {string} plantType
   * @returns {number|null}
   */
  getPlantCost(plantType) {
    const plant = this.plantMap.get(plantType);
    return plant ? plant.cost : null;
  }

  /**
   * Get cost of currently selected plant
   * @returns {number|null}
   */
  getSelectedPlantCost() {
    if (!this.selectedPlant) return null;
    return this.getPlantCost(this.selectedPlant);
  }

  /**
   * Check if player can afford a plant
   * @param {string} plantType
   * @param {number} currentMoney
   * @returns {boolean}
   */
  canAfford(plantType, currentMoney) {
    const cost = this.getPlantCost(plantType);
    if (cost === null) return false;
    return currentMoney >= cost;
  }

  /**
   * Get plant type at screen position (for hit detection)
   * @param {number} x
   * @param {number} y
   * @returns {string|null}
   */
  getPlantAtPosition(x, y) {
    const { buttonSize } = PLANT_SELECTOR_CONFIG;
    const halfSize = buttonSize / 2;

    for (const button of this.getButtonPositions()) {
      if (x >= button.x - halfSize && x <= button.x + halfSize &&
          y >= button.y - halfSize && y <= button.y + halfSize) {
        return button.type;
      }
    }

    return null;
  }
}
