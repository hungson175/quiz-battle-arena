/**
 * QuestionLoader utility
 * Handles loading and validating questions from JSON
 */

/**
 * Load questions from JSON file
 * @param {string} filePath - Path to questions.json
 * @returns {Promise<Array>} Array of question objects
 */
export async function loadQuestions(filePath = '/src/assets/data/questions.json') {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error('Không thể tải câu hỏi');
    }
    const data = await response.json();
    return data.questions || [];
  } catch (error) {
    console.error('Error loading questions:', error);
    throw error;
  }
}

/**
 * Validate question structure
 * @param {Object} question - Question object to validate
 * @returns {boolean} True if valid
 */
export function validateQuestion(question) {
  return (
    question &&
    typeof question.id === 'number' &&
    typeof question.question === 'string' &&
    Array.isArray(question.answers) &&
    question.answers.length === 4 &&
    typeof question.correct === 'number' &&
    question.correct >= 0 &&
    question.correct < 4 &&
    typeof question.explanation === 'string'
  );
}

/**
 * Shuffle answers using Fisher-Yates algorithm
 * Preserves correct answer tracking
 * @param {Object} question - Question with answers array and correct index
 * @returns {Array} Shuffled answer objects with isCorrect flag
 */
export function shuffleAnswers(question) {
  // Create answer objects
  const answerObjects = question.answers.map((text, index) => ({
    text: text,
    isCorrect: index === question.correct
  }));

  // Fisher-Yates shuffle
  for (let i = answerObjects.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [answerObjects[i], answerObjects[j]] = [answerObjects[j], answerObjects[i]];
  }

  return answerObjects;
}
