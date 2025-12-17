import { validateQuestion, shuffleAnswers } from '../src/utils/QuestionLoader.js';

describe('Question Loader', () => {
  // Test 1: Question validation
  test('validates question structure correctly', () => {
    const validQuestion = {
      id: 1,
      category: 'Lịch sử',
      question: 'Con sông nào đóng vai trò quan trọng với nền văn minh Ai Cập cổ đại?',
      answers: ['Sông Nin', 'Sông Tigris', 'Sông Euphrates', 'Sông Amazon'],
      correct: 0,
      explanation: 'Sông Nin cung cấp nước và phù sa màu mỡ giúp phát triển nông nghiệp.'
    };

    expect(validateQuestion(validQuestion)).toBeTruthy();
  });

  test('rejects invalid question structure', () => {
    const invalidQuestion = {
      id: 1,
      question: 'Test question',
      // Missing answers array
      correct: 0
    };

    expect(validateQuestion(invalidQuestion)).toBeFalsy();
  });

  // Test 2: Answer shuffling
  test('shuffles answers while preserving correct answer', () => {
    const question = {
      answers: ['A', 'B', 'C', 'D'],
      correct: 0
    };

    const shuffled = shuffleAnswers(question);

    // Should return 4 answer objects
    expect(shuffled).toHaveLength(4);

    // Correct answer should be marked correctly
    const correctAnswer = shuffled.find(a => a.isCorrect);
    expect(correctAnswer.text).toBe('A');

    // Only one answer should be marked correct
    const correctCount = shuffled.filter(a => a.isCorrect).length;
    expect(correctCount).toBe(1);
  });

  test('Fisher-Yates shuffle produces different orders', () => {
    const question = {
      answers: ['A', 'B', 'C', 'D'],
      correct: 0
    };

    // Run shuffle multiple times
    const results = [];
    for (let i = 0; i < 10; i++) {
      const shuffled = shuffleAnswers(question);
      const order = shuffled.map(a => a.text).join('');
      results.push(order);
    }

    // At least some results should be different (high probability)
    const uniqueResults = new Set(results);
    expect(uniqueResults.size).toBeGreaterThan(1);
  });
});
