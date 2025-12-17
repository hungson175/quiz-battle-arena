import { calculateHealth, shouldTriggerGameOver } from '../src/utils/HealthManager.js';

describe('Health Manager (Sprint 2A)', () => {
  // Test 1: Initial health
  test('health starts at 5', () => {
    const initialHealth = 5;
    expect(initialHealth).toBe(5);
  });

  // Test 2: Health loss on wrong answer
  test('loses 1 health on wrong answer', () => {
    const initialHealth = 5;
    const newHealth = calculateHealth(initialHealth, false);
    expect(newHealth).toBe(4);
  });

  // Test 3: Health remains on correct answer
  test('health stays same on correct answer', () => {
    const initialHealth = 5;
    const newHealth = calculateHealth(initialHealth, true);
    expect(newHealth).toBe(5);
  });

  // Test 4: Multiple wrong answers
  test('health decreases correctly over multiple wrong answers', () => {
    let health = 5;

    // First wrong answer
    health = calculateHealth(health, false);
    expect(health).toBe(4);

    // Second wrong answer
    health = calculateHealth(health, false);
    expect(health).toBe(3);

    // Third wrong answer
    health = calculateHealth(health, false);
    expect(health).toBe(2);
  });

  // Test 5: Game over trigger at 0 health
  test('triggers game over when health reaches 0', () => {
    const health = 0;
    const gameOver = shouldTriggerGameOver(health, 10, 15); // health=0, index=10, total=15
    expect(gameOver).toBeTruthy();
  });

  // Test 6: No game over with health remaining
  test('does not trigger game over when health > 0', () => {
    const health = 3;
    const gameOver = shouldTriggerGameOver(health, 5, 15); // health=3, index=5, total=15
    expect(gameOver).toBeFalsy();
  });

  // Test 7: Health cannot go below 0
  test('health does not go below 0', () => {
    const initialHealth = 0;
    const newHealth = calculateHealth(initialHealth, false);
    expect(newHealth).toBe(0);
  });
});
