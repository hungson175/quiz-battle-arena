// src/utils/WaveManager.js
// Wave system for zombie spawning

/**
 * Wave configuration per GD specs
 * 5 waves with increasing zombie counts and difficulty
 */
export const WAVE_CONFIG = {
  waves: [3, 3, 7, 9, 12],  // Zombie count per wave (Wave 2: 5→3 for S5-002)
  spawnIntervals: [4000, 4500, 3000, 2500, 2000],  // Spawn interval per wave (ms) (Wave 2: 3500→4500)
  speedMultipliers: [1.0, 1.0, 1.1, 1.2, 1.3],  // Speed modifier per wave
  quizIntervals: [15000, 12000, 10000, 10000, 8000],  // Quiz interval per wave (ms)
  pauseBetweenWavesMs: 5000,  // 5 seconds between waves (per GD spec)
};

/**
 * WaveManager handles wave progression and zombie spawning logic
 */
export class WaveManager {
  constructor() {
    this.currentWave = 0;  // 0 = not started, 1-5 = wave number
    this.zombiesSpawned = 0;
    this.active = false;
    this.complete = false;
    this.paused = false;
  }

  /**
   * Get current wave number (1-5, or 0 if not started)
   * @returns {number}
   */
  getCurrentWave() {
    return this.currentWave;
  }

  /**
   * Get total number of waves
   * @returns {number}
   */
  getTotalWaves() {
    return WAVE_CONFIG.waves.length;
  }

  /**
   * Check if wave system is active
   * @returns {boolean}
   */
  isActive() {
    return this.active;
  }

  /**
   * Check if all waves are complete
   * @returns {boolean}
   */
  isComplete() {
    return this.complete;
  }

  /**
   * Check if paused between waves
   * @returns {boolean}
   */
  isPaused() {
    return this.paused;
  }

  /**
   * Start the wave system
   */
  startWaves() {
    this.currentWave = 1;
    this.zombiesSpawned = 0;
    this.active = true;
    this.complete = false;
    this.paused = false;
  }

  /**
   * Get zombie count for current wave
   * @returns {number}
   */
  getZombiesForCurrentWave() {
    if (this.currentWave === 0 || this.currentWave > WAVE_CONFIG.waves.length) {
      return 0;
    }
    return WAVE_CONFIG.waves[this.currentWave - 1];
  }

  /**
   * Get number of zombies spawned in current wave
   * @returns {number}
   */
  getZombiesSpawned() {
    return this.zombiesSpawned;
  }

  /**
   * Get number of zombies remaining to spawn in current wave
   * @returns {number}
   */
  getZombiesRemaining() {
    return this.getZombiesForCurrentWave() - this.zombiesSpawned;
  }

  /**
   * Record a zombie spawn
   */
  recordSpawn() {
    if (this.canSpawn()) {
      this.zombiesSpawned++;
    }
  }

  /**
   * Check if more zombies can be spawned in current wave
   * @returns {boolean}
   */
  canSpawn() {
    return this.zombiesSpawned < this.getZombiesForCurrentWave();
  }

  /**
   * Check if all zombies for current wave have been spawned
   * @returns {boolean}
   */
  isWaveSpawnComplete() {
    return this.zombiesSpawned >= this.getZombiesForCurrentWave();
  }

  /**
   * Advance to next wave
   * @returns {boolean} True if advanced, false if not allowed
   */
  advanceWave() {
    // Don't advance if spawning not complete (unless forcing for pause end)
    if (!this.isWaveSpawnComplete() && !this.paused) {
      return false;
    }

    this.currentWave++;
    this.zombiesSpawned = 0;
    this.paused = false;

    if (this.currentWave > WAVE_CONFIG.waves.length) {
      this.complete = true;
      this.active = false;
    }

    return true;
  }

  /**
   * Start pause between waves
   */
  startPause() {
    this.paused = true;
  }

  /**
   * End pause and advance to next wave
   */
  endPause() {
    this.paused = false;
    this.advanceWave();
  }

  /**
   * Get current state of wave system
   * @returns {'waiting'|'spawning'|'clearing'|'paused'|'complete'}
   */
  getState() {
    if (this.complete) return 'complete';
    if (!this.active) return 'waiting';
    if (this.paused) return 'paused';
    if (this.isWaveSpawnComplete()) return 'clearing';
    return 'spawning';
  }

  /**
   * Get speed multiplier for current wave
   * @returns {number} Multiplier (1.0, 1.1, 1.2, etc.)
   */
  getSpeedMultiplier() {
    if (this.currentWave === 0) return 1.0;
    return WAVE_CONFIG.speedMultipliers[this.currentWave - 1] || 1.0;
  }

  /**
   * Get spawn interval for current wave (ms)
   * @returns {number}
   */
  getSpawnInterval() {
    if (this.currentWave === 0) return WAVE_CONFIG.spawnIntervals[0];
    return WAVE_CONFIG.spawnIntervals[this.currentWave - 1] || WAVE_CONFIG.spawnIntervals[0];
  }

  /**
   * Get quiz interval for current wave (ms)
   * @returns {number}
   */
  getQuizInterval() {
    if (this.currentWave === 0) return WAVE_CONFIG.quizIntervals[0];
    return WAVE_CONFIG.quizIntervals[this.currentWave - 1] || WAVE_CONFIG.quizIntervals[0];
  }

  /**
   * Get wave stats
   * @returns {Object}
   */
  getStats() {
    return {
      currentWave: this.currentWave,
      totalWaves: this.getTotalWaves(),
      zombiesSpawned: this.zombiesSpawned,
      zombiesInWave: this.getZombiesForCurrentWave(),
      state: this.getState(),
      speedMultiplier: this.getSpeedMultiplier()
    };
  }

  /**
   * Reset wave manager to initial state
   */
  reset() {
    this.currentWave = 0;
    this.zombiesSpawned = 0;
    this.active = false;
    this.complete = false;
    this.paused = false;
  }
}
