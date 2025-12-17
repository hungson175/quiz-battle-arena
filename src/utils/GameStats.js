/**
 * Game Statistics - Sprint 2B
 * Calculates accuracy percentage and provides color coding for feedback
 */

/**
 * Calculate accuracy percentage
 * @param {number} correctCount - Number of correct answers
 * @param {number} totalQuestions - Total number of questions
 * @returns {number} Accuracy percentage (0-100), rounded to nearest integer
 */
export function calculateAccuracy(correctCount, totalQuestions) {
  if (totalQuestions === 0) return 0;
  return Math.round((correctCount / totalQuestions) * 100);
}

/**
 * Get color code based on accuracy percentage
 * GD Design Spec:
 * - Red (<50%): Needs practice
 * - Yellow (50-79%): Good progress
 * - Blue (≥80%): Excellent
 *
 * @param {number} accuracy - Accuracy percentage (0-100)
 * @returns {string} Hex color code
 */
export function getAccuracyColor(accuracy) {
  if (accuracy < 50) {
    return '#FF6B6B'; // Red
  } else if (accuracy < 80) {
    return '#FFD93D'; // Yellow
  } else {
    return '#4ECDC4'; // Blue
  }
}
