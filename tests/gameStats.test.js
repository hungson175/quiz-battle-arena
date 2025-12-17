import { calculateAccuracy, getAccuracyColor } from '../src/utils/GameStats.js';

describe('Game Statistics (Sprint 2B)', () => {
  // Test 10: Accuracy percentage calculation
  test('calculates accuracy percentage correctly', () => {
    // 7 correct out of 15 = 46.67% → rounds to 47%
    expect(calculateAccuracy(7, 15)).toBe(47);

    // 10 correct out of 15 = 66.67% → rounds to 67%
    expect(calculateAccuracy(10, 15)).toBe(67);

    // 12 correct out of 15 = 80% → exact
    expect(calculateAccuracy(12, 15)).toBe(80);
  });

  test('handles edge cases for accuracy calculation', () => {
    // All correct
    expect(calculateAccuracy(15, 15)).toBe(100);

    // None correct
    expect(calculateAccuracy(0, 15)).toBe(0);

    // 1 correct out of 15 = 6.67% → rounds to 7%
    expect(calculateAccuracy(1, 15)).toBe(7);
  });

  test('returns color code based on accuracy percentage', () => {
    // Red: < 50%
    expect(getAccuracyColor(0)).toBe('#FF6B6B');
    expect(getAccuracyColor(30)).toBe('#FF6B6B');
    expect(getAccuracyColor(49)).toBe('#FF6B6B');

    // Yellow: 50-79%
    expect(getAccuracyColor(50)).toBe('#FFD93D');
    expect(getAccuracyColor(65)).toBe('#FFD93D');
    expect(getAccuracyColor(79)).toBe('#FFD93D');

    // Blue: ≥ 80%
    expect(getAccuracyColor(80)).toBe('#4ECDC4');
    expect(getAccuracyColor(95)).toBe('#4ECDC4');
    expect(getAccuracyColor(100)).toBe('#4ECDC4');
  });

  test('calculates accuracy for different question totals', () => {
    // 10 questions total
    expect(calculateAccuracy(7, 10)).toBe(70);

    // 20 questions total
    expect(calculateAccuracy(15, 20)).toBe(75);

    // 5 questions total
    expect(calculateAccuracy(4, 5)).toBe(80);
  });
});
