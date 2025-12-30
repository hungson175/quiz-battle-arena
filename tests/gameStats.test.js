// tests/gameStats.test.js
// TDD: RED phase - GameStats tests

import { GameStats, DEFEAT_TIPS } from '../src/utils/GameStats.js';

describe('GameStats', () => {
  let stats;

  beforeEach(() => {
    stats = new GameStats();
  });

  describe('Initialization', () => {
    test('should start with zero values', () => {
      expect(stats.wavesCompleted).toBe(0);
      expect(stats.questionsAnswered).toBe(0);
      expect(stats.questionsCorrect).toBe(0);
      expect(stats.plantsPlaced).toBe(0);
      expect(stats.zombiesKilled).toBe(0);
    });

    test('should set total waves', () => {
      stats.setTotalWaves(5);
      expect(stats.totalWaves).toBe(5);
    });

    test('should start with playing status', () => {
      expect(stats.gameResult).toBe('playing');
    });
  });

  describe('Wave Tracking', () => {
    test('should record wave completion', () => {
      stats.recordWaveComplete();
      expect(stats.wavesCompleted).toBe(1);
    });

    test('should track multiple waves', () => {
      stats.recordWaveComplete();
      stats.recordWaveComplete();
      stats.recordWaveComplete();
      expect(stats.wavesCompleted).toBe(3);
    });
  });

  describe('Question Tracking', () => {
    test('should record correct answer', () => {
      stats.recordCorrectAnswer();
      expect(stats.questionsAnswered).toBe(1);
      expect(stats.questionsCorrect).toBe(1);
    });

    test('should record wrong answer', () => {
      stats.recordWrongAnswer();
      expect(stats.questionsAnswered).toBe(1);
      expect(stats.questionsCorrect).toBe(0);
    });

    test('should record timeout', () => {
      stats.recordTimeout();
      expect(stats.questionsAnswered).toBe(1);
      expect(stats.questionsTimeout).toBe(1);
    });

    test('should calculate accuracy', () => {
      stats.recordCorrectAnswer();
      stats.recordCorrectAnswer();
      stats.recordCorrectAnswer();
      stats.recordWrongAnswer();
      expect(stats.getAccuracy()).toBe(75);
    });

    test('should return 0 accuracy when no questions', () => {
      expect(stats.getAccuracy()).toBe(0);
    });
  });

  describe('Money Tracking', () => {
    test('should track money earned', () => {
      stats.recordMoneyEarned(50);
      stats.recordMoneyEarned(50);
      expect(stats.moneyEarned).toBe(100);
    });

    test('should track money lost', () => {
      stats.recordMoneyLost(30);
      expect(stats.moneyLost).toBe(30);
    });

    test('should set final money', () => {
      stats.setFinalMoney(150);
      expect(stats.finalMoney).toBe(150);
    });

    test('should handle negative final money', () => {
      stats.setFinalMoney(-20);
      expect(stats.finalMoney).toBe(-20);
    });
  });

  describe('Plant Tracking', () => {
    test('should record plant placement', () => {
      stats.recordPlantPlaced();
      expect(stats.plantsPlaced).toBe(1);
    });
  });

  describe('Zombie Tracking', () => {
    test('should record zombie kill', () => {
      stats.recordZombieKilled();
      expect(stats.zombiesKilled).toBe(1);
    });

    test('should track multiple kills', () => {
      stats.recordZombieKilled();
      stats.recordZombieKilled();
      stats.recordZombieKilled();
      expect(stats.zombiesKilled).toBe(3);
    });
  });

  describe('Game Result', () => {
    test('should record victory', () => {
      stats.recordVictory();
      expect(stats.gameResult).toBe('victory');
    });

    test('should record defeat', () => {
      stats.recordDefeat();
      expect(stats.gameResult).toBe('defeat');
    });
  });

  describe('Stats Summary', () => {
    test('should return complete stats object', () => {
      stats.setTotalWaves(5);
      stats.recordWaveComplete();
      stats.recordWaveComplete();
      stats.recordCorrectAnswer();
      stats.recordWrongAnswer();
      stats.recordPlantPlaced();
      stats.recordZombieKilled();
      stats.setFinalMoney(120);

      const summary = stats.getSummary();

      expect(summary.wavesCompleted).toBe(2);
      expect(summary.totalWaves).toBe(5);
      expect(summary.questionsAnswered).toBe(2);
      expect(summary.questionsCorrect).toBe(1);
      expect(summary.accuracy).toBe(50);
      expect(summary.finalMoney).toBe(120);
      expect(summary.plantsPlaced).toBe(1);
      expect(summary.zombiesKilled).toBe(1);
    });
  });

  describe('Defeat Tips', () => {
    test('should have multiple defeat tips', () => {
      expect(DEFEAT_TIPS.length).toBeGreaterThanOrEqual(5);
    });

    test('should get random defeat tip', () => {
      const tip = stats.getRandomDefeatTip();
      expect(DEFEAT_TIPS).toContain(tip);
    });
  });

  describe('Reset', () => {
    test('should reset all stats', () => {
      stats.recordWaveComplete();
      stats.recordCorrectAnswer();
      stats.recordPlantPlaced();
      stats.recordZombieKilled();
      stats.setFinalMoney(100);

      stats.reset();

      expect(stats.wavesCompleted).toBe(0);
      expect(stats.questionsAnswered).toBe(0);
      expect(stats.plantsPlaced).toBe(0);
      expect(stats.zombiesKilled).toBe(0);
      expect(stats.finalMoney).toBe(0);
      expect(stats.gameResult).toBe('playing');
    });
  });
});
