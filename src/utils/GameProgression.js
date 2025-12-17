/**
 * Game Progression Manager - Sprint 2A
 * Manages question progression and victory conditions
 */

/**
 * Check if should progress to next question
 * @param {number} currentIndex - Current question index (0-based)
 * @param {number} totalQuestions - Total number of questions
 * @returns {boolean} True if can progress to next question
 */
export function shouldProgressToNextQuestion(currentIndex, totalQuestions) {
  // Can progress if not at last question
  return (currentIndex + 1) < totalQuestions;
}

/**
 * Check if victory condition is met (all questions answered)
 * @param {number} currentIndex - Current question index (0-based after increment)
 * @param {number} totalQuestions - Total number of questions
 * @returns {boolean} True if all questions answered
 */
export function shouldTriggerVictory(currentIndex, totalQuestions) {
  // Victory if reached or passed last question index
  return (currentIndex + 1) >= totalQuestions;
}
