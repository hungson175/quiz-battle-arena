/**
 * ScoreManager utility
 * Handles score calculation based on answer correctness
 * Implements GD Rec #2: +25 Learning Points for wrong answers
 */

/**
 * Calculate new score after answering a question
 * @param {number} currentScore - Current score
 * @param {boolean} isCorrect - Whether answer was correct
 * @returns {number} New score
 */
export function calculateScore(currentScore, isCorrect) {
  if (isCorrect) {
    return currentScore + 100; // Correct answer: +100 points
  } else {
    return currentScore + 25;  // Wrong answer: +25 Learning Points (GD Rec #2)
  }
}

/**
 * Format score for display
 * @param {number} score - Score to format
 * @returns {string} Formatted score (e.g., "1,325")
 */
export function formatScore(score) {
  if (score < 1000) {
    return score.toString();
  }
  return score.toLocaleString('vi-VN');
}

/**
 * Calculate potential score range for N questions
 * @param {number} questionCount - Number of questions
 * @returns {Object} Min and max possible scores
 */
export function calculateScoreRange(questionCount) {
  return {
    min: questionCount * 25,   // All wrong: 25 points each
    max: questionCount * 100   // All correct: 100 points each
  };
}
