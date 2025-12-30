// tests/pea.test.js
// TDD: RED phase - Write failing tests first

import { Pea, PEA_CONFIG } from '../src/entities/Pea.js';

describe('Pea', () => {
  let pea;

  beforeEach(() => {
    pea = new Pea({ lane: 1, x: 200, damage: 1 });
  });

  describe('Configuration', () => {
    test('should have speed of 400 pixels per second', () => {
      expect(PEA_CONFIG.speed).toBe(400);
    });
  });

  describe('Initialization', () => {
    test('should initialize at specified lane', () => {
      expect(pea.lane).toBe(1);
    });

    test('should initialize at specified x position', () => {
      expect(pea.x).toBe(200);
    });

    test('should initialize with specified damage', () => {
      expect(pea.damage).toBe(1);
    });

    test('should start active', () => {
      expect(pea.isActive()).toBe(true);
    });
  });

  describe('Movement', () => {
    test('should move right over time', () => {
      const initialX = pea.x;
      pea.update(0.5); // 0.5 seconds
      expect(pea.x).toBe(initialX + PEA_CONFIG.speed * 0.5);
    });

    test('should calculate distance traveled', () => {
      pea.update(1); // 1 second
      expect(pea.x).toBe(200 + 400); // 600
    });
  });

  describe('Deactivation', () => {
    test('should deactivate when hitting target', () => {
      pea.hit();
      expect(pea.isActive()).toBe(false);
    });

    test('should deactivate when going off screen', () => {
      pea.deactivate();
      expect(pea.isActive()).toBe(false);
    });

    test('should check if past screen boundary', () => {
      const screenWidth = 960;
      pea.x = screenWidth + 50;
      expect(pea.isOffScreen(screenWidth)).toBe(true);
    });

    test('should not be off screen when within bounds', () => {
      expect(pea.isOffScreen(960)).toBe(false);
    });
  });

  describe('Collision', () => {
    test('should provide collision bounds', () => {
      const bounds = pea.getBounds();
      expect(bounds).toHaveProperty('x');
      expect(bounds).toHaveProperty('y');
      expect(bounds).toHaveProperty('width');
      expect(bounds).toHaveProperty('height');
    });
  });
});

describe('Pea Creation', () => {
  test('should create peas with unique IDs', () => {
    const pea1 = new Pea({ lane: 0, x: 100, damage: 1 });
    const pea2 = new Pea({ lane: 0, x: 100, damage: 1 });
    expect(pea1.id).not.toBe(pea2.id);
  });
});
