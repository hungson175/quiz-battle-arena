// tests/waveManager.test.js
// TDD: RED phase - WaveManager tests

import { WaveManager, WAVE_CONFIG } from '../src/utils/WaveManager.js';

describe('WaveManager', () => {
  let manager;

  beforeEach(() => {
    manager = new WaveManager();
  });

  describe('Configuration', () => {
    test('should have 5 waves defined', () => {
      expect(WAVE_CONFIG.waves.length).toBe(5);
    });

    test('should have wave zombie counts: 3, 5, 7, 9, 12', () => {
      expect(WAVE_CONFIG.waves).toEqual([3, 5, 7, 9, 12]);
    });

    test('should have 5 second pause between waves', () => {
      expect(WAVE_CONFIG.pauseBetweenWavesMs).toBe(5000);
    });

    test('should have spawn intervals per wave', () => {
      expect(WAVE_CONFIG.spawnIntervals).toEqual([4000, 3500, 3000, 2500, 2000]);
    });

    test('should have speed multipliers per wave', () => {
      expect(WAVE_CONFIG.speedMultipliers).toEqual([1.0, 1.0, 1.1, 1.2, 1.3]);
    });

    test('should have quiz intervals per wave (15s, 12s, 10s, 10s, 8s)', () => {
      expect(WAVE_CONFIG.quizIntervals).toEqual([15000, 12000, 10000, 10000, 8000]);
    });
  });

  describe('Initialization', () => {
    test('should start at wave 0 (not started)', () => {
      expect(manager.getCurrentWave()).toBe(0);
    });

    test('should not be active initially', () => {
      expect(manager.isActive()).toBe(false);
    });

    test('should not be complete initially', () => {
      expect(manager.isComplete()).toBe(false);
    });

    test('should have total wave count', () => {
      expect(manager.getTotalWaves()).toBe(5);
    });
  });

  describe('Starting Waves', () => {
    test('should start first wave', () => {
      manager.startWaves();
      expect(manager.getCurrentWave()).toBe(1);
      expect(manager.isActive()).toBe(true);
    });

    test('should get zombie count for current wave', () => {
      manager.startWaves();
      expect(manager.getZombiesForCurrentWave()).toBe(3); // Wave 1: 3 zombies
    });

    test('should track zombies spawned in current wave', () => {
      manager.startWaves();
      expect(manager.getZombiesSpawned()).toBe(0);
    });

    test('should track zombies remaining to spawn', () => {
      manager.startWaves();
      expect(manager.getZombiesRemaining()).toBe(3);
    });
  });

  describe('Spawning Zombies', () => {
    beforeEach(() => {
      manager.startWaves();
    });

    test('should record zombie spawn', () => {
      manager.recordSpawn();
      expect(manager.getZombiesSpawned()).toBe(1);
      expect(manager.getZombiesRemaining()).toBe(2);
    });

    test('should know when wave spawning is complete', () => {
      expect(manager.isWaveSpawnComplete()).toBe(false);
      manager.recordSpawn();
      manager.recordSpawn();
      manager.recordSpawn();
      expect(manager.isWaveSpawnComplete()).toBe(true);
    });

    test('should not spawn more than wave allows', () => {
      manager.recordSpawn();
      manager.recordSpawn();
      manager.recordSpawn();
      expect(manager.canSpawn()).toBe(false);
    });
  });

  describe('Wave Progression', () => {
    beforeEach(() => {
      manager.startWaves();
    });

    test('should advance to next wave', () => {
      // Complete wave 1 spawning
      for (let i = 0; i < 3; i++) manager.recordSpawn();

      manager.advanceWave();
      expect(manager.getCurrentWave()).toBe(2);
      expect(manager.getZombiesForCurrentWave()).toBe(5); // Wave 2: 5 zombies
    });

    test('should reset spawn count on wave advance', () => {
      // Complete wave 1 spawning first
      for (let i = 0; i < 3; i++) manager.recordSpawn();
      manager.advanceWave();
      expect(manager.getZombiesSpawned()).toBe(0);
    });

    test('should complete after all waves', () => {
      // Progress through all 5 waves
      for (let wave = 0; wave < 5; wave++) {
        const zombieCount = WAVE_CONFIG.waves[wave];
        for (let i = 0; i < zombieCount; i++) {
          manager.recordSpawn();
        }
        if (wave < 4) {
          manager.advanceWave();
        }
      }

      manager.advanceWave(); // Try to advance past wave 5
      expect(manager.isComplete()).toBe(true);
    });

    test('should not advance if not all zombies spawned', () => {
      manager.recordSpawn(); // Only 1 of 3
      const advanced = manager.advanceWave();
      expect(advanced).toBe(false);
      expect(manager.getCurrentWave()).toBe(1);
    });
  });

  describe('Wave State', () => {
    test('should be in "waiting" state before start', () => {
      expect(manager.getState()).toBe('waiting');
    });

    test('should be in "spawning" state during wave', () => {
      manager.startWaves();
      expect(manager.getState()).toBe('spawning');
    });

    test('should be in "clearing" state after spawning complete', () => {
      manager.startWaves();
      for (let i = 0; i < 3; i++) manager.recordSpawn();
      expect(manager.getState()).toBe('clearing');
    });

    test('should be in "paused" state between waves', () => {
      manager.startWaves();
      for (let i = 0; i < 3; i++) manager.recordSpawn();
      manager.startPause();
      expect(manager.getState()).toBe('paused');
    });

    test('should be in "complete" state after all waves', () => {
      manager.startWaves();
      // Complete all waves
      for (let wave = 0; wave < 5; wave++) {
        const zombieCount = WAVE_CONFIG.waves[wave];
        for (let i = 0; i < zombieCount; i++) {
          manager.recordSpawn();
        }
        manager.advanceWave();
      }
      expect(manager.getState()).toBe('complete');
    });
  });

  describe('Pause Between Waves', () => {
    beforeEach(() => {
      manager.startWaves();
      for (let i = 0; i < 3; i++) manager.recordSpawn();
    });

    test('should start pause timer', () => {
      manager.startPause();
      expect(manager.isPaused()).toBe(true);
    });

    test('should end pause and start next wave', () => {
      manager.startPause();
      manager.endPause();
      expect(manager.isPaused()).toBe(false);
      expect(manager.getCurrentWave()).toBe(2);
    });
  });

  describe('Stats', () => {
    test('should provide wave stats', () => {
      manager.startWaves();
      const stats = manager.getStats();

      expect(stats.currentWave).toBe(1);
      expect(stats.totalWaves).toBe(5);
      expect(stats.zombiesSpawned).toBe(0);
      expect(stats.zombiesInWave).toBe(3);
      expect(stats.state).toBe('spawning');
    });
  });

  describe('Reset', () => {
    test('should reset to initial state', () => {
      manager.startWaves();
      manager.recordSpawn();
      manager.advanceWave();

      manager.reset();

      expect(manager.getCurrentWave()).toBe(0);
      expect(manager.isActive()).toBe(false);
      expect(manager.getZombiesSpawned()).toBe(0);
    });
  });

  describe('Quiz Intervals', () => {
    test('should return quiz interval for wave 1', () => {
      manager.startWaves();
      expect(manager.getQuizInterval()).toBe(15000);
    });

    test('should return quiz interval for wave 2', () => {
      manager.startWaves();
      for (let i = 0; i < 3; i++) manager.recordSpawn();
      manager.advanceWave();
      expect(manager.getQuizInterval()).toBe(12000);
    });

    test('should return quiz interval for wave 3', () => {
      manager.startWaves();
      for (let i = 0; i < 3; i++) manager.recordSpawn();
      manager.advanceWave();
      for (let i = 0; i < 5; i++) manager.recordSpawn();
      manager.advanceWave();
      expect(manager.getQuizInterval()).toBe(10000);
    });

    test('should return quiz interval for wave 5', () => {
      manager.startWaves();
      // Advance to wave 5
      for (let wave = 0; wave < 4; wave++) {
        const zombieCount = WAVE_CONFIG.waves[wave];
        for (let i = 0; i < zombieCount; i++) manager.recordSpawn();
        manager.advanceWave();
      }
      expect(manager.getQuizInterval()).toBe(8000);
    });

    test('should return default interval before waves start', () => {
      expect(manager.getQuizInterval()).toBe(15000);
    });
  });
});
