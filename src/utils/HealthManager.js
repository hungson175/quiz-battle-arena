/**
 * Health Manager - Sprint 2A
 * Manages player health system (5 hearts)
 */

/**
 * Calculate new health after an answer
 * @param {number} currentHealth - Current health (0-5)
 * @param {boolean} isCorrect - Was the answer correct?
 * @returns {number} New health value
 */
export function calculateHealth(currentHealth, isCorrect) {
  if (isCorrect) {
    // Correct answer: health stays same (no restoration in Sprint 2A)
    return currentHealth;
  } else {
    // Wrong answer: lose 1 heart (but never go below 0)
    return Math.max(0, currentHealth - 1);
  }
}

/**
 * Check if game over should trigger based on health or victory
 * @param {number} health - Current health
 * @param {number} currentQuestionIndex - Current question index (0-based)
 * @param {number} totalQuestions - Total number of questions
 * @returns {boolean} True if game over should trigger
 */
export function shouldTriggerGameOver(health, currentQuestionIndex, totalQuestions) {
  // Game over if health depleted
  if (health <= 0) {
    return true;
  }

  // Game over if all questions answered (victory)
  if (currentQuestionIndex >= totalQuestions) {
    return true;
  }

  return false;
}
