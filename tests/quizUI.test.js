// tests/quizUI.test.js
// TDD: RED phase - QuizUI tests

import { QuizUI, QUIZ_UI_CONFIG } from '../src/ui/QuizUI.js';

// Mock question for testing
const mockQuestion = {
  id: 1,
  question: "Ai Cập cổ đại nằm ở đâu?",
  answers: [
    "Phía Đông Bắc châu Phi",
    "Phía Tây châu Phi",
    "Phía Nam châu Á",
    "Phía Bắc châu Âu"
  ],
  correctIndex: 0,
  explanation: "Ai Cập cổ đại nằm ở phía Đông Bắc châu Phi."
};

describe('QuizUI', () => {
  let quizUI;

  beforeEach(() => {
    quizUI = new QuizUI({ gameWidth: 800, gameHeight: 600 });
  });

  describe('Configuration', () => {
    test('should have default panel dimensions', () => {
      expect(QUIZ_UI_CONFIG.panelWidth).toBeDefined();
      expect(QUIZ_UI_CONFIG.panelHeight).toBeDefined();
    });

    test('should have button dimensions', () => {
      expect(QUIZ_UI_CONFIG.buttonWidth).toBeDefined();
      expect(QUIZ_UI_CONFIG.buttonHeight).toBeDefined();
    });

    test('should have colors for correct/wrong feedback', () => {
      expect(QUIZ_UI_CONFIG.correctColor).toBeDefined();
      expect(QUIZ_UI_CONFIG.wrongColor).toBeDefined();
    });
  });

  describe('Initialization', () => {
    test('should initialize with game dimensions', () => {
      expect(quizUI.gameWidth).toBe(800);
      expect(quizUI.gameHeight).toBe(600);
    });

    test('should start with no active question', () => {
      expect(quizUI.isActive()).toBe(false);
    });

    test('should start with no selected answer', () => {
      expect(quizUI.getSelectedAnswer()).toBe(null);
    });
  });

  describe('Showing Question', () => {
    test('should activate when showing question', () => {
      quizUI.showQuestion(mockQuestion);
      expect(quizUI.isActive()).toBe(true);
    });

    test('should store current question', () => {
      quizUI.showQuestion(mockQuestion);
      expect(quizUI.getCurrentQuestion()).toEqual(mockQuestion);
    });

    test('should clear previous selection when showing new question', () => {
      quizUI.showQuestion(mockQuestion);
      quizUI.selectAnswer(2);
      quizUI.showQuestion({ ...mockQuestion, id: 2 });
      expect(quizUI.getSelectedAnswer()).toBe(null);
    });
  });

  describe('Answer Selection', () => {
    beforeEach(() => {
      quizUI.showQuestion(mockQuestion);
    });

    test('should allow selecting an answer', () => {
      quizUI.selectAnswer(1);
      expect(quizUI.getSelectedAnswer()).toBe(1);
    });

    test('should validate answer index bounds', () => {
      expect(quizUI.selectAnswer(-1)).toBe(false);
      expect(quizUI.selectAnswer(4)).toBe(false);
      expect(quizUI.selectAnswer(0)).toBe(true);
      expect(quizUI.selectAnswer(3)).toBe(true);
    });

    test('should not allow selection when locked', () => {
      quizUI.lockSelection();
      expect(quizUI.selectAnswer(1)).toBe(false);
    });
  });

  describe('Answer Checking', () => {
    beforeEach(() => {
      quizUI.showQuestion(mockQuestion);
    });

    test('should check if selected answer is correct', () => {
      quizUI.selectAnswer(0); // Correct answer
      expect(quizUI.isAnswerCorrect()).toBe(true);
    });

    test('should check if selected answer is wrong', () => {
      quizUI.selectAnswer(1); // Wrong answer
      expect(quizUI.isAnswerCorrect()).toBe(false);
    });

    test('should return null if no answer selected', () => {
      expect(quizUI.isAnswerCorrect()).toBe(null);
    });
  });

  describe('Submission', () => {
    beforeEach(() => {
      quizUI.showQuestion(mockQuestion);
    });

    test('should submit and lock selection', () => {
      quizUI.selectAnswer(0);
      const result = quizUI.submitAnswer();
      expect(result).toEqual({
        selectedIndex: 0,
        correctIndex: 0,
        isCorrect: true,
        question: mockQuestion
      });
      expect(quizUI.isLocked()).toBe(true);
    });

    test('should not submit if no answer selected', () => {
      const result = quizUI.submitAnswer();
      expect(result).toBe(null);
    });

    test('should not submit if already locked', () => {
      quizUI.selectAnswer(0);
      quizUI.submitAnswer();
      const secondResult = quizUI.submitAnswer();
      expect(secondResult).toBe(null);
    });
  });

  describe('Hiding/Closing', () => {
    test('should deactivate when hiding', () => {
      quizUI.showQuestion(mockQuestion);
      quizUI.hide();
      expect(quizUI.isActive()).toBe(false);
    });

    test('should reset state when hiding', () => {
      quizUI.showQuestion(mockQuestion);
      quizUI.selectAnswer(1);
      quizUI.hide();
      expect(quizUI.getSelectedAnswer()).toBe(null);
      expect(quizUI.getCurrentQuestion()).toBe(null);
    });
  });

  describe('Panel Position', () => {
    test('should calculate centered panel position', () => {
      const pos = quizUI.getPanelPosition();
      expect(pos.x).toBe(400); // Center of 800
      expect(pos.y).toBe(300); // Center of 600
    });
  });

  describe('Button Positions', () => {
    test('should calculate positions for 4 answer buttons', () => {
      const positions = quizUI.getAnswerButtonPositions();
      expect(positions.length).toBe(4);
    });

    test('should arrange buttons in 2x2 grid', () => {
      const positions = quizUI.getAnswerButtonPositions();
      // Top row (buttons 0 and 1) should have same Y
      expect(positions[0].y).toBe(positions[1].y);
      // Bottom row (buttons 2 and 3) should have same Y
      expect(positions[2].y).toBe(positions[3].y);
      // Left column (buttons 0 and 2) should have same X
      expect(positions[0].x).toBe(positions[2].x);
      // Right column (buttons 1 and 3) should have same X
      expect(positions[1].x).toBe(positions[3].x);
    });
  });

  describe('Vietnamese Text Support', () => {
    test('should handle Vietnamese question text', () => {
      const vnQuestion = {
        id: 1,
        question: "Việt Nam độc lập năm nào?",
        answers: ["1945", "1954", "1975", "1986"],
        correctIndex: 0,
        explanation: "Ngày 2/9/1945"
      };
      quizUI.showQuestion(vnQuestion);
      expect(quizUI.getCurrentQuestion().question).toBe("Việt Nam độc lập năm nào?");
    });

    test('should handle Vietnamese answer text', () => {
      const vnQuestion = {
        id: 1,
        question: "Thủ đô của Việt Nam?",
        answers: ["Hà Nội", "Sài Gòn", "Đà Nẵng", "Huế"],
        correctIndex: 0,
        explanation: "Hà Nội là thủ đô."
      };
      quizUI.showQuestion(vnQuestion);
      expect(quizUI.getCurrentQuestion().answers[0]).toBe("Hà Nội");
    });
  });
});
