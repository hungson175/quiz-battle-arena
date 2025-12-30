// tests/plantSelector.test.js
// TDD: RED phase - PlantSelector tests

import { PlantSelector, PLANT_SELECTOR_CONFIG } from '../src/ui/PlantSelector.js';

describe('PlantSelector', () => {
  let selector;

  beforeEach(() => {
    selector = new PlantSelector({ gameWidth: 800, gameHeight: 600 });
  });

  describe('Configuration', () => {
    test('should have button size of 60px', () => {
      expect(PLANT_SELECTOR_CONFIG.buttonSize).toBe(60);
    });

    test('should have two plant types defined', () => {
      expect(PLANT_SELECTOR_CONFIG.plants.length).toBe(2);
    });

    test('should have peashooter as first plant', () => {
      expect(PLANT_SELECTOR_CONFIG.plants[0].type).toBe('peashooter');
      expect(PLANT_SELECTOR_CONFIG.plants[0].cost).toBe(75);
      expect(PLANT_SELECTOR_CONFIG.plants[0].icon).toBe('🌱');
    });

    test('should have wallnut as second plant', () => {
      expect(PLANT_SELECTOR_CONFIG.plants[1].type).toBe('wallnut');
      expect(PLANT_SELECTOR_CONFIG.plants[1].cost).toBe(50);
      expect(PLANT_SELECTOR_CONFIG.plants[1].icon).toBe('🧱');
    });
  });

  describe('Initialization', () => {
    test('should start with no plant selected', () => {
      expect(selector.getSelectedPlant()).toBe(null);
    });

    test('should calculate button positions in top-left', () => {
      const positions = selector.getButtonPositions();
      expect(positions.length).toBe(2);
      // Top-left corner with padding
      expect(positions[0].x).toBeLessThan(100);
      expect(positions[0].y).toBeLessThan(100);
    });
  });

  describe('Plant Selection', () => {
    test('should select peashooter', () => {
      selector.selectPlant('peashooter');
      expect(selector.getSelectedPlant()).toBe('peashooter');
    });

    test('should select wallnut', () => {
      selector.selectPlant('wallnut');
      expect(selector.getSelectedPlant()).toBe('wallnut');
    });

    test('should toggle off if same plant selected twice', () => {
      selector.selectPlant('peashooter');
      selector.selectPlant('peashooter');
      expect(selector.getSelectedPlant()).toBe(null);
    });

    test('should switch to new plant if different selected', () => {
      selector.selectPlant('peashooter');
      selector.selectPlant('wallnut');
      expect(selector.getSelectedPlant()).toBe('wallnut');
    });

    test('should reject invalid plant type', () => {
      selector.selectPlant('invalid');
      expect(selector.getSelectedPlant()).toBe(null);
    });
  });

  describe('Clear Selection', () => {
    test('should clear selected plant', () => {
      selector.selectPlant('peashooter');
      selector.clearSelection();
      expect(selector.getSelectedPlant()).toBe(null);
    });
  });

  describe('Plant Info', () => {
    test('should get cost for peashooter', () => {
      expect(selector.getPlantCost('peashooter')).toBe(75);
    });

    test('should get cost for wallnut', () => {
      expect(selector.getPlantCost('wallnut')).toBe(50);
    });

    test('should return null cost for invalid plant', () => {
      expect(selector.getPlantCost('invalid')).toBe(null);
    });

    test('should get selected plant cost', () => {
      selector.selectPlant('wallnut');
      expect(selector.getSelectedPlantCost()).toBe(50);
    });

    test('should return null for selected cost when nothing selected', () => {
      expect(selector.getSelectedPlantCost()).toBe(null);
    });
  });

  describe('Affordability Check', () => {
    test('should check if plant is affordable', () => {
      expect(selector.canAfford('peashooter', 100)).toBe(true);
      expect(selector.canAfford('peashooter', 50)).toBe(false);
      expect(selector.canAfford('wallnut', 50)).toBe(true);
      expect(selector.canAfford('wallnut', 40)).toBe(false);
    });
  });

  describe('Button Hit Detection', () => {
    test('should detect click on peashooter button', () => {
      const positions = selector.getButtonPositions();
      const peaPos = positions[0];
      // Click in center of button
      const result = selector.getPlantAtPosition(peaPos.x, peaPos.y);
      expect(result).toBe('peashooter');
    });

    test('should detect click on wallnut button', () => {
      const positions = selector.getButtonPositions();
      const wallPos = positions[1];
      const result = selector.getPlantAtPosition(wallPos.x, wallPos.y);
      expect(result).toBe('wallnut');
    });

    test('should return null for click outside buttons', () => {
      const result = selector.getPlantAtPosition(500, 500);
      expect(result).toBe(null);
    });
  });
});
