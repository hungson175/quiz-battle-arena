// tests/moneyManager.test.js
// TDD: RED phase - MoneyManager tests

import { MoneyManager, MONEY_CONFIG } from '../src/utils/MoneyManager.js';

describe('MoneyManager', () => {
  let manager;

  beforeEach(() => {
    manager = new MoneyManager();
  });

  describe('Configuration', () => {
    test('should have starting money of 200', () => {
      expect(MONEY_CONFIG.startingMoney).toBe(200);
    });

    test('should have correct answer reward of 50', () => {
      expect(MONEY_CONFIG.correctReward).toBe(50);
    });

    test('should have wrong answer penalty of 30', () => {
      expect(MONEY_CONFIG.wrongPenalty).toBe(30);
    });

    test('should have plant cost of 75', () => {
      expect(MONEY_CONFIG.plantCost).toBe(75);
    });
  });

  describe('Initialization', () => {
    test('should start with starting money', () => {
      expect(manager.getMoney()).toBe(MONEY_CONFIG.startingMoney);
    });
  });

  describe('Spending', () => {
    test('should deduct money when spending', () => {
      manager.spend(50);
      expect(manager.getMoney()).toBe(150); // 200 - 50 = 150
    });

    test('should allow spending all money', () => {
      manager.spend(200);
      expect(manager.getMoney()).toBe(0);
    });

    test('should check if can afford amount', () => {
      expect(manager.canAfford(200)).toBe(true);
      expect(manager.canAfford(201)).toBe(false);
    });

    test('should not allow spending more than available', () => {
      const result = manager.spend(250);
      expect(result).toBe(false);
      expect(manager.getMoney()).toBe(200); // Unchanged
    });

    test('should return true on successful spend', () => {
      const result = manager.spend(50);
      expect(result).toBe(true);
    });
  });

  describe('Earning', () => {
    test('should add money when earning', () => {
      manager.earn(50);
      expect(manager.getMoney()).toBe(250); // 200 + 50 = 250
    });
  });

  describe('Quiz Rewards', () => {
    test('should reward correct answer with +50', () => {
      manager.correctAnswer();
      expect(manager.getMoney()).toBe(250); // 200 + 50 = 250
    });

    test('should penalize wrong answer with -30', () => {
      manager.wrongAnswer();
      expect(manager.getMoney()).toBe(170); // 200 - 30 = 170
    });

    test('should allow money to go negative', () => {
      manager.spend(200); // 0
      manager.wrongAnswer(); // -30
      expect(manager.getMoney()).toBe(-30);
    });
  });

  describe('Plant Purchase', () => {
    test('should check if can buy plant', () => {
      expect(manager.canBuyPlant()).toBe(true);
      manager.spend(150); // 200 - 150 = 50, can't afford 75
      expect(manager.canBuyPlant()).toBe(false);
    });

    test('should buy plant and deduct cost', () => {
      const result = manager.buyPlant();
      expect(result).toBe(true);
      expect(manager.getMoney()).toBe(125); // 200 - 75 = 125
    });

    test('should not buy plant if cannot afford', () => {
      manager.spend(150); // 200 - 150 = 50
      const result = manager.buyPlant();
      expect(result).toBe(false);
      expect(manager.getMoney()).toBe(50); // Unchanged
    });
  });

  describe('Reset', () => {
    test('should reset to starting money', () => {
      manager.spend(50);
      manager.reset();
      expect(manager.getMoney()).toBe(MONEY_CONFIG.startingMoney);
    });
  });
});
