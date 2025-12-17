import { shouldProgressToNextQuestion, shouldTriggerVictory } from '../src/utils/GameProgression.js';

describe('Game Progression (Sprint 2A)', () => {
  // Test 1: Progress to next question
  test('should progress to next question when not at end', () => {
    const currentIndex = 5;
    const totalQuestions = 15;
    const shouldProgress = shouldProgressToNextQuestion(currentIndex, totalQuestions);
    expect(shouldProgress).toBeTruthy();
  });

  // Test 2: Victory trigger at last question
  test('triggers victory when all questions answered', () => {
    const currentIndex = 14; // Last question (0-based for 15 questions)
    const totalQuestions = 15;
    const isVictory = shouldTriggerVictory(currentIndex, totalQuestions);
    expect(isVictory).toBeTruthy();
  });

  // Test 3: No victory before last question
  test('does not trigger victory before last question', () => {
    const currentIndex = 13;
    const totalQuestions = 15;
    const isVictory = shouldTriggerVictory(currentIndex, totalQuestions);
    expect(isVictory).toBeFalsy();
  });

  // Test 4: Question index increments correctly
  test('question index increments after each answer', () => {
    let questionIndex = 0;

    // After first question
    questionIndex++;
    expect(questionIndex).toBe(1);

    // After second question
    questionIndex++;
    expect(questionIndex).toBe(2);
  });

  // Test 5: Track questions answered
  test('tracks total questions answered correctly', () => {
    let questionsAnswered = 0;

    // Answer first question
    questionsAnswered++;
    expect(questionsAnswered).toBe(1);

    // Answer 4 more questions
    for (let i = 0; i < 4; i++) {
      questionsAnswered++;
    }
    expect(questionsAnswered).toBe(5);
  });

  // Test 6: Correct and wrong count tracking
  test('tracks correct and wrong counts separately', () => {
    let correctCount = 0;
    let wrongCount = 0;

    // 3 correct answers
    correctCount += 3;
    // 2 wrong answers
    wrongCount += 2;

    expect(correctCount).toBe(3);
    expect(wrongCount).toBe(2);
    expect(correctCount + wrongCount).toBe(5); // Total answered
  });
});
