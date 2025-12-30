// tests/peashooter.test.js
// TDD: RED phase - Write failing tests first

import { Peashooter, PEASHOOTER_CONFIG } from '../src/entities/Peashooter.js';

describe('Peashooter', () => {
  let plant;

  beforeEach(() => {
    plant = new Peashooter({ lane: 1, col: 3 });
  });

  describe('Configuration', () => {
    test('should have fire rate of 1.5 seconds', () => {
      expect(PEASHOOTER_CONFIG.fireRate).toBe(1.5);
    });

    test('should have cost of 100 sun', () => {
      expect(PEASHOOTER_CONFIG.cost).toBe(100);
    });

    test('should have HP of 6', () => {
      expect(PEASHOOTER_CONFIG.hp).toBe(6);
    });

    test('should have pea damage of 1', () => {
      expect(PEASHOOTER_CONFIG.peaDamage).toBe(1);
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
      expect(plant.hp).toBe(PEASHOOTER_CONFIG.hp);
    });

    test('should start alive', () => {
      expect(plant.isAlive()).toBe(true);
    });

    test('should start with zero fire cooldown', () => {
      expect(plant.fireCooldown).toBe(0);
    });
  });

  describe('Damage', () => {
    test('should take damage and reduce HP', () => {
      plant.takeDamage(2);
      expect(plant.hp).toBe(4);
    });

    test('should die when HP reaches 0', () => {
      plant.takeDamage(6);
      expect(plant.hp).toBe(0);
      expect(plant.isAlive()).toBe(false);
    });

    test('should not go below 0 HP', () => {
      plant.takeDamage(10);
      expect(plant.hp).toBe(0);
    });
  });

  describe('Firing', () => {
    test('should be ready to fire initially', () => {
      expect(plant.canFire()).toBe(true);
    });

    test('should set cooldown after firing', () => {
      plant.fire();
      expect(plant.fireCooldown).toBe(PEASHOOTER_CONFIG.fireRate);
    });

    test('should not be ready to fire during cooldown', () => {
      plant.fire();
      expect(plant.canFire()).toBe(false);
    });

    test('should reduce cooldown over time', () => {
      plant.fire();
      plant.updateCooldown(0.5); // 0.5 seconds
      expect(plant.fireCooldown).toBe(1.0);
    });

    test('should be ready to fire after cooldown expires', () => {
      plant.fire();
      plant.updateCooldown(1.5); // Full cooldown
      expect(plant.canFire()).toBe(true);
    });

    test('should not fire if dead', () => {
      plant.takeDamage(6);
      expect(plant.canFire()).toBe(false);
    });

    test('should return pea damage when firing', () => {
      const damage = plant.fire();
      expect(damage).toBe(PEASHOOTER_CONFIG.peaDamage);
    });

    test('should return 0 damage if cannot fire', () => {
      plant.fire(); // First shot
      const damage = plant.fire(); // On cooldown
      expect(damage).toBe(0);
    });
  });

  describe('Grid Position', () => {
    test('should return grid key for tracking', () => {
      expect(plant.getGridKey()).toBe('1,3');
    });

    test('should identify as same cell', () => {
      expect(plant.isAtCell(1, 3)).toBe(true);
      expect(plant.isAtCell(0, 3)).toBe(false);
      expect(plant.isAtCell(1, 2)).toBe(false);
    });
  });
});

describe('Plant Placement Validation', () => {
  test('should create plant with unique ID', () => {
    const plant1 = new Peashooter({ lane: 0, col: 1 });
    const plant2 = new Peashooter({ lane: 0, col: 2 });
    expect(plant1.id).not.toBe(plant2.id);
  });
});
