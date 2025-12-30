// tests/zombie.test.js
// TDD: RED phase - Write failing tests first

import { Zombie, ZOMBIE_CONFIG } from '../src/entities/Zombie.js';

describe('Zombie', () => {
  let zombie;

  beforeEach(() => {
    zombie = new Zombie({ lane: 1, col: 8 });
  });

  describe('Configuration', () => {
    test('should have default HP of 8', () => {
      expect(ZOMBIE_CONFIG.hp).toBe(8);
    });

    test('should have speed of 5 seconds per tile', () => {
      expect(ZOMBIE_CONFIG.speed).toBe(5);
    });

    test('should have attack DPS of 2', () => {
      expect(ZOMBIE_CONFIG.attackDps).toBe(2);
    });
  });

  describe('Initialization', () => {
    test('should initialize with full HP', () => {
      expect(zombie.hp).toBe(ZOMBIE_CONFIG.hp);
    });

    test('should initialize at specified lane', () => {
      expect(zombie.lane).toBe(1);
    });

    test('should initialize at specified column', () => {
      expect(zombie.col).toBe(8);
    });

    test('should start alive', () => {
      expect(zombie.isAlive()).toBe(true);
    });

    test('should start in walking state', () => {
      expect(zombie.state).toBe('walking');
    });
  });

  describe('Damage', () => {
    test('should take damage and reduce HP', () => {
      zombie.takeDamage(1);
      expect(zombie.hp).toBe(7); // 8 - 1 = 7
    });

    test('should die when HP reaches 0', () => {
      zombie.takeDamage(8);
      expect(zombie.hp).toBe(0);
      expect(zombie.isAlive()).toBe(false);
    });

    test('should not go below 0 HP', () => {
      zombie.takeDamage(20);
      expect(zombie.hp).toBe(0);
    });

    test('should change state to dead when killed', () => {
      zombie.takeDamage(8);
      expect(zombie.state).toBe('dead');
    });
  });

  describe('Movement', () => {
    test('should calculate pixels per second from tile speed', () => {
      // If zombie moves 1 tile per 5 seconds, and tile width is ~97.78 pixels
      // Then speed = ~19.56 pixels per second
      const pixelsPerTile = 97.78; // Approximate cell width
      const expectedSpeed = pixelsPerTile / ZOMBIE_CONFIG.speed;
      expect(zombie.getPixelSpeed(pixelsPerTile)).toBeCloseTo(expectedSpeed, 1);
    });

    test('should track progress within current tile', () => {
      expect(zombie.tileProgress).toBe(0);
    });

    test('should update tile progress on move', () => {
      zombie.updateProgress(0.5); // 0.5 seconds elapsed
      expect(zombie.tileProgress).toBeGreaterThan(0);
    });

    test('should move to next column when tile progress reaches 1', () => {
      zombie.updateProgress(5); // Full 5 seconds to cross one tile
      expect(zombie.col).toBe(7);
      expect(zombie.tileProgress).toBeCloseTo(0, 1);
    });

    test('should stay in same lane while moving', () => {
      zombie.updateProgress(5);
      expect(zombie.lane).toBe(1);
    });
  });

  describe('Reaching House', () => {
    test('should detect when zombie reaches house zone (col 0)', () => {
      const houseZombie = new Zombie({ lane: 0, col: 0 });
      expect(houseZombie.hasReachedHouse()).toBe(true);
    });

    test('should not be at house when still moving', () => {
      expect(zombie.hasReachedHouse()).toBe(false);
    });
  });

  describe('Attacking', () => {
    test('should change to attacking state when ordered to attack', () => {
      zombie.startAttacking();
      expect(zombie.state).toBe('attacking');
    });

    test('should return to walking when attack ends', () => {
      zombie.startAttacking();
      zombie.stopAttacking();
      expect(zombie.state).toBe('walking');
    });

    test('should not attack if dead', () => {
      zombie.takeDamage(10);
      zombie.startAttacking();
      expect(zombie.state).toBe('dead');
    });
  });
});

describe('Zombie Spawning', () => {
  test('should spawn at rightmost column (8)', () => {
    const zombie = new Zombie({ lane: 0 });
    expect(zombie.col).toBe(8);
  });

  test('should spawn in specified lane', () => {
    const zombie0 = new Zombie({ lane: 0 });
    const zombie1 = new Zombie({ lane: 1 });
    const zombie2 = new Zombie({ lane: 2 });

    expect(zombie0.lane).toBe(0);
    expect(zombie1.lane).toBe(1);
    expect(zombie2.lane).toBe(2);
  });
});
