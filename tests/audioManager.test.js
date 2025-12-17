/**
 * AudioManager Tests - Sprint 3 (TDD RED Phase)
 * Tests for sound management, toggle functionality, and LocalStorage persistence
 */

import { AudioManager } from '../src/utils/AudioManager.js';

describe('AudioManager (Sprint 3)', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  test('initializes with sound enabled by default', () => {
    const audioManager = new AudioManager(null);
    expect(audioManager.enabled).toBe(true);
  });

  test('toggles sound on and off', () => {
    const audioManager = new AudioManager(null);
    expect(audioManager.enabled).toBe(true);

    audioManager.toggle();
    expect(audioManager.enabled).toBe(false);

    audioManager.toggle();
    expect(audioManager.enabled).toBe(true);
  });

  test('saves sound preference to LocalStorage when toggled', () => {
    const audioManager = new AudioManager(null);

    audioManager.toggle(); // Turn off
    expect(localStorage.getItem('quizBattleArena_soundEnabled')).toBe('false');

    audioManager.toggle(); // Turn on
    expect(localStorage.getItem('quizBattleArena_soundEnabled')).toBe('true');
  });

  test('loads sound preference from LocalStorage on initialization', () => {
    // Set preference to false before creating AudioManager
    localStorage.setItem('quizBattleArena_soundEnabled', 'false');

    const audioManager = new AudioManager(null);
    expect(audioManager.enabled).toBe(false);
  });

  test('defaults to enabled when no LocalStorage preference exists', () => {
    // Ensure no preference exists
    localStorage.removeItem('quizBattleArena_soundEnabled');

    const audioManager = new AudioManager(null);
    expect(audioManager.enabled).toBe(true);
  });
});
