// tests/wallnut.test.js
// TDD: RED phase - Wallnut tests

import { Wallnut, WALLNUT_CONFIG } from '../src/entities/Wallnut.js';

describe('Wallnut', () => {
  let plant;

  beforeEach(() => {
    plant = new Wallnut({ lane: 1, col: 3 });
  });

  describe('Configuration', () => {
    test('should have cost of 50 sun', () => {
      expect(WALLNUT_CONFIG.cost).toBe(50);
    });

    test('should have HP of 20', () => {
      expect(WALLNUT_CONFIG.hp).toBe(20);
    });

    test('should not have attack capability', () => {
      expect(WALLNUT_CONFIG.canAttack).toBe(false);
    });
  });

  describe('Initialization', () => {
    test('should initialize at specified lane', () => {
      expect(plant.lane).toBe(1);
    });

    test('should initialize at specified column', () => {
      expect(plant.col).toBe(3);
    });

    test('should initialize with full HP', () => {
      expect(plant.hp).toBe(WALLNUT_CONFIG.hp);
    });

    test('should start alive', () => {
      expect(plant.isAlive()).toBe(true);
    });

    test('should have type wallnut', () => {
      expect(plant.type).toBe('wallnut');
    });
  });

  describe('Damage', () => {
    test('should take damage and reduce HP', () => {
      plant.takeDamage(5);
      expect(plant.hp).toBe(15);
    });

    test('should die when HP reaches 0', () => {
      plant.takeDamage(20);
      expect(plant.hp).toBe(0);
      expect(plant.isAlive()).toBe(false);
    });

    test('should not go below 0 HP', () => {
      plant.takeDamage(25);
      expect(plant.hp).toBe(0);
    });

    test('should survive multiple hits', () => {
      // Wallnut should survive 10 zombie hits (2 DPS * 1s = 2 damage each)
      for (let i = 0; i < 9; i++) {
        plant.takeDamage(2);
      }
      expect(plant.isAlive()).toBe(true);
      expect(plant.hp).toBe(2); // 20 - 18 = 2
    });
  });

  describe('No Attack', () => {
    test('should not be able to fire', () => {
      expect(plant.canFire()).toBe(false);
    });

    test('should return 0 damage on fire attempt', () => {
      expect(plant.fire()).toBe(0);
    });
  });

  describe('Grid Position', () => {
    test('should return grid key for tracking', () => {
      expect(plant.getGridKey()).toBe('1,3');
    });

    test('should identify as same cell', () => {
      expect(plant.isAtCell(1, 3)).toBe(true);
      expect(plant.isAtCell(0, 3)).toBe(false);
    });
  });
});

describe('Wallnut Unique IDs', () => {
  test('should create wallnuts with unique IDs', () => {
    const plant1 = new Wallnut({ lane: 0, col: 1 });
    const plant2 = new Wallnut({ lane: 0, col: 2 });
    expect(plant1.id).not.toBe(plant2.id);
  });
});
