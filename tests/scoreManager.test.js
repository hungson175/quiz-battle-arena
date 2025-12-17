import { calculateScore, formatScore, calculateScoreRange } from '../src/utils/ScoreManager.js';

describe('Score Manager', () => {
  // Test 3: Score calculation for correct answer
  test('awards 100 points for correct answer', () => {
    const initialScore = 0;
    const newScore = calculateScore(initialScore, true);
    expect(newScore).toBe(100);
  });

  test('adds 100 points to existing score for correct answer', () => {
    const initialScore = 250;
    const newScore = calculateScore(initialScore, true);
    expect(newScore).toBe(350);
  });

  // Test 4: Score calculation for wrong answer (GD Rec #2)
  test('awards 25 Learning Points for wrong answer', () => {
    const initialScore = 0;
    const newScore = calculateScore(initialScore, false);
    expect(newScore).toBe(25);
  });

  test('adds 25 points to existing score for wrong answer', () => {
    const initialScore = 100;
    const newScore = calculateScore(initialScore, false);
    expect(newScore).toBe(125);
  });

  // Additional: Score formatting
  test('formats score without comma for numbers < 1000', () => {
    expect(formatScore(500)).toBe('500');
    expect(formatScore(999)).toBe('999');
  });

  test('formats score with comma for numbers >= 1000', () => {
    const formatted = formatScore(1325);
    // Vietnamese locale uses '.' as thousands separator
    expect(formatted).toMatch(/1[.,]325/);
  });

  // Score range calculation
  test('calculates correct score range for 15 questions', () => {
    const range = calculateScoreRange(15);
    expect(range.min).toBe(375);  // 15 × 25
    expect(range.max).toBe(1500); // 15 × 100
  });
});
