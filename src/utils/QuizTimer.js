// src/utils/QuizTimer.js
// Timer for quiz time limits

/**
 * Timer configuration from GD specs
 */
export const TIMER_CONFIG = {
  timeLimitMs: 12000,        // 12 seconds per question
  warningThresholdMs: 3000,  // Red warning state
  cautionThresholdMs: 6000   // Yellow caution state
};

/**
 * QuizTimer handles countdown logic for quiz questions
 */
export class QuizTimer {
  constructor() {
    this.reset();
  }

  /**
   * Reset timer to initial state
   */
  reset() {
    this.timeRemaining = TIMER_CONFIG.timeLimitMs;
    this.elapsed = 0;
    this.active = false;
    this.expired = false;
  }

  /**
   * Start the timer countdown
   */
  start() {
    this.active = true;
    this.expired = false;
    this.elapsed = 0;
    this.timeRemaining = TIMER_CONFIG.timeLimitMs;
  }

  /**
   * Stop the timer without resetting
   */
  stop() {
    this.active = false;
  }

  /**
   * Update timer with delta time
   * @param {number} deltaMs - Time elapsed since last update in milliseconds
   */
  update(deltaMs) {
    if (!this.active) return;

    this.elapsed += deltaMs;
    this.timeRemaining = Math.max(0, TIMER_CONFIG.timeLimitMs - this.elapsed);

    if (this.timeRemaining <= 0) {
      this.active = false;
      this.expired = true;
    }
  }

  /**
   * Check if timer is currently running
   * @returns {boolean}
   */
  isActive() {
    return this.active;
  }

  /**
   * Check if timer has expired (time ran out)
   * @returns {boolean}
   */
  isExpired() {
    return this.expired;
  }

  /**
   * Get time remaining in milliseconds
   * @returns {number}
   */
  getTimeRemaining() {
    return this.timeRemaining;
  }

  /**
   * Get elapsed time in milliseconds
   * @returns {number}
   */
  getElapsedMs() {
    return this.elapsed;
  }

  /**
   * Get progress as a fraction (1.0 = full, 0.0 = expired)
   * @returns {number}
   */
  getProgress() {
    return this.timeRemaining / TIMER_CONFIG.timeLimitMs;
  }

  /**
   * Get current timer state for visual feedback
   * @returns {'safe' | 'caution' | 'warning' | 'expired'}
   */
  getState() {
    if (this.expired || this.timeRemaining <= 0) {
      return 'expired';
    }
    if (this.timeRemaining <= TIMER_CONFIG.warningThresholdMs) {
      return 'warning';
    }
    if (this.timeRemaining <= TIMER_CONFIG.cautionThresholdMs) {
      return 'caution';
    }
    return 'safe';
  }

  /**
   * Get display time as string (seconds, ceiling)
   * @returns {string}
   */
  getDisplayTime() {
    const seconds = Math.ceil(this.timeRemaining / 1000);
    return String(seconds);
  }
}
