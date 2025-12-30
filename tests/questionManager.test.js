// tests/questionManager.test.js
// TDD: RED phase - QuestionManager tests

import { QuestionManager } from '../src/utils/QuestionManager.js';

// Sample questions for testing
const sampleQuestions = [
  {
    id: 1,
    question: "Câu hỏi 1?",
    answers: ["A", "B", "C", "D"],
    correctIndex: 0,
    explanation: "Giải thích 1"
  },
  {
    id: 2,
    question: "Câu hỏi 2?",
    answers: ["A", "B", "C", "D"],
    correctIndex: 1,
    explanation: "Giải thích 2"
  },
  {
    id: 3,
    question: "Câu hỏi 3?",
    answers: ["A", "B", "C", "D"],
    correctIndex: 2,
    explanation: "Giải thích 3"
  }
];

describe('QuestionManager', () => {
  let manager;

  beforeEach(() => {
    manager = new QuestionManager();
    manager.loadQuestions(sampleQuestions);
  });

  describe('Loading', () => {
    test('should load questions from array', () => {
      expect(manager.getTotalCount()).toBe(3);
    });

    test('should handle empty questions array', () => {
      const emptyManager = new QuestionManager();
      emptyManager.loadQuestions([]);
      expect(emptyManager.getTotalCount()).toBe(0);
    });
  });

  describe('Getting Questions', () => {
    test('should get next question', () => {
      const question = manager.getNextQuestion();
      expect(question).toHaveProperty('question');
      expect(question).toHaveProperty('answers');
      expect(question).toHaveProperty('correctIndex');
    });

    test('should not repeat questions until pool exhausted', () => {
      const asked = new Set();
      for (let i = 0; i < 3; i++) {
        const q = manager.getNextQuestion();
        expect(asked.has(q.id)).toBe(false);
        asked.add(q.id);
      }
    });

    test('should track answered questions count', () => {
      expect(manager.getAnsweredCount()).toBe(0);
      manager.getNextQuestion();
      expect(manager.getAnsweredCount()).toBe(1);
    });

    test('should return null when all questions exhausted', () => {
      manager.getNextQuestion();
      manager.getNextQuestion();
      manager.getNextQuestion();
      const q = manager.getNextQuestion();
      expect(q).toBeNull();
    });

    test('should report when questions available', () => {
      expect(manager.hasMoreQuestions()).toBe(true);
      manager.getNextQuestion();
      manager.getNextQuestion();
      manager.getNextQuestion();
      expect(manager.hasMoreQuestions()).toBe(false);
    });
  });

  describe('Answer Checking', () => {
    test('should check if answer is correct', () => {
      const q = manager.getNextQuestion();
      expect(manager.checkAnswer(q, q.correctIndex)).toBe(true);
      expect(manager.checkAnswer(q, (q.correctIndex + 1) % 4)).toBe(false);
    });
  });

  describe('Shuffling', () => {
    test('should shuffle questions on load', () => {
      // Load same questions multiple times and check order varies
      // (statistical test - may rarely fail)
      const orders = [];
      for (let i = 0; i < 10; i++) {
        const m = new QuestionManager();
        m.loadQuestions([...sampleQuestions]);
        m.shuffle();
        const q1 = m.getNextQuestion();
        orders.push(q1.id);
        m.reset();
      }
      // At least some variation expected
      const uniqueFirstIds = new Set(orders);
      expect(uniqueFirstIds.size).toBeGreaterThan(1);
    });
  });

  describe('Reset', () => {
    test('should reset to allow questions again', () => {
      manager.getNextQuestion();
      manager.getNextQuestion();
      manager.getNextQuestion();
      expect(manager.hasMoreQuestions()).toBe(false);

      manager.reset();
      expect(manager.hasMoreQuestions()).toBe(true);
      expect(manager.getAnsweredCount()).toBe(0);
    });
  });

  describe('Vietnamese Support', () => {
    test('should handle Vietnamese text correctly', () => {
      const vnQuestions = [{
        id: 1,
        question: "Việt Nam độc lập năm nào?",
        answers: ["1945", "1954", "1975", "1986"],
        correctIndex: 0,
        explanation: "Ngày 2/9/1945"
      }];

      const vnManager = new QuestionManager();
      vnManager.loadQuestions(vnQuestions);
      const q = vnManager.getNextQuestion();

      expect(q.question).toBe("Việt Nam độc lập năm nào?");
      expect(q.answers[0]).toBe("1945");
    });
  });
});
