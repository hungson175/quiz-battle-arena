// tests/quizTimer.test.js
// TDD: RED phase - QuizTimer tests

import { QuizTimer, TIMER_CONFIG } from '../src/utils/QuizTimer.js';

describe('QuizTimer', () => {
  let timer;

  beforeEach(() => {
    timer = new QuizTimer();
  });

  describe('Configuration', () => {
    test('should have 12 second time limit', () => {
      expect(TIMER_CONFIG.timeLimitMs).toBe(12000);
    });

    test('should have warning threshold at 3 seconds', () => {
      expect(TIMER_CONFIG.warningThresholdMs).toBe(3000);
    });

    test('should have caution threshold at 6 seconds', () => {
      expect(TIMER_CONFIG.cautionThresholdMs).toBe(6000);
    });
  });

  describe('Initialization', () => {
    test('should start inactive', () => {
      expect(timer.isActive()).toBe(false);
    });

    test('should have full time remaining when not started', () => {
      expect(timer.getTimeRemaining()).toBe(TIMER_CONFIG.timeLimitMs);
    });

    test('should not be expired when not started', () => {
      expect(timer.isExpired()).toBe(false);
    });
  });

  describe('Starting Timer', () => {
    test('should become active when started', () => {
      timer.start();
      expect(timer.isActive()).toBe(true);
    });

    test('should have full time when just started', () => {
      timer.start();
      expect(timer.getTimeRemaining()).toBe(TIMER_CONFIG.timeLimitMs);
    });
  });

  describe('Timer Updates', () => {
    test('should reduce time remaining on update', () => {
      timer.start();
      timer.update(1000); // 1 second
      expect(timer.getTimeRemaining()).toBe(11000);
    });

    test('should track elapsed time', () => {
      timer.start();
      timer.update(5000);
      expect(timer.getElapsedMs()).toBe(5000);
    });

    test('should not update when inactive', () => {
      timer.update(5000);
      expect(timer.getTimeRemaining()).toBe(TIMER_CONFIG.timeLimitMs);
    });

    test('should not reduce below zero', () => {
      timer.start();
      timer.update(15000); // More than limit
      expect(timer.getTimeRemaining()).toBe(0);
    });
  });

  describe('Timer Expiration', () => {
    test('should expire when time runs out', () => {
      timer.start();
      timer.update(12000);
      expect(timer.isExpired()).toBe(true);
    });

    test('should not expire before time runs out', () => {
      timer.start();
      timer.update(11999);
      expect(timer.isExpired()).toBe(false);
    });

    test('should stop being active when expired', () => {
      timer.start();
      timer.update(12000);
      expect(timer.isActive()).toBe(false);
    });
  });

  describe('Progress Percentage', () => {
    test('should return 1.0 when just started', () => {
      timer.start();
      expect(timer.getProgress()).toBe(1.0);
    });

    test('should return 0.5 at half time', () => {
      timer.start();
      timer.update(6000);
      expect(timer.getProgress()).toBe(0.5);
    });

    test('should return 0.0 when expired', () => {
      timer.start();
      timer.update(12000);
      expect(timer.getProgress()).toBe(0);
    });
  });

  describe('Timer State (for visual feedback)', () => {
    test('should be in "safe" state when plenty of time', () => {
      timer.start();
      timer.update(4000); // 8 seconds left
      expect(timer.getState()).toBe('safe');
    });

    test('should be in "caution" state below 6 seconds', () => {
      timer.start();
      timer.update(7000); // 5 seconds left
      expect(timer.getState()).toBe('caution');
    });

    test('should be in "warning" state below 3 seconds', () => {
      timer.start();
      timer.update(10000); // 2 seconds left
      expect(timer.getState()).toBe('warning');
    });

    test('should be in "expired" state when time up', () => {
      timer.start();
      timer.update(12000);
      expect(timer.getState()).toBe('expired');
    });
  });

  describe('Stop', () => {
    test('should become inactive when stopped', () => {
      timer.start();
      timer.update(5000);
      timer.stop();
      expect(timer.isActive()).toBe(false);
    });

    test('should preserve time remaining when stopped', () => {
      timer.start();
      timer.update(5000);
      timer.stop();
      expect(timer.getTimeRemaining()).toBe(7000);
    });
  });

  describe('Reset', () => {
    test('should restore full time on reset', () => {
      timer.start();
      timer.update(10000);
      timer.reset();
      expect(timer.getTimeRemaining()).toBe(TIMER_CONFIG.timeLimitMs);
    });

    test('should become inactive on reset', () => {
      timer.start();
      timer.reset();
      expect(timer.isActive()).toBe(false);
    });

    test('should clear expired state on reset', () => {
      timer.start();
      timer.update(12000);
      timer.reset();
      expect(timer.isExpired()).toBe(false);
    });
  });

  describe('Time Display', () => {
    test('should format time as seconds remaining', () => {
      timer.start();
      timer.update(4500); // 7.5 seconds left
      expect(timer.getDisplayTime()).toBe('8'); // Ceiling
    });

    test('should show 0 when expired', () => {
      timer.start();
      timer.update(12000);
      expect(timer.getDisplayTime()).toBe('0');
    });

    test('should show full time when just started', () => {
      timer.start();
      expect(timer.getDisplayTime()).toBe('12');
    });
  });
});
