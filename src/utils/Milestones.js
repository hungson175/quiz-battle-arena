/**
 * Milestones - Sprint 2B
 * Manages milestone celebrations at 5, 10, 15, 20 questions
 * GD Recommendation #3: Maintain motivation during longer sessions
 */

/**
 * Milestone messages in Vietnamese
 * GD Design Spec: Encouraging messages for each milestone
 */
const MILESTONE_MESSAGES = {
  5: 'Một phần tư rồi! 🎯',
  10: 'Nửa chặng đường! 🏆',
  15: 'Sắp xong rồi! 🚀',
  20: 'Về đích thôi! 🎉'
};

/**
 * Milestone icons
 * GD Design Spec: Different icon for each milestone
 */
const MILESTONE_ICONS = {
  5: '🎯',    // Target
  10: '🏆',   // Trophy
  15: '🚀',   // Rocket
  20: '🎉'    // Party popper
};

/**
 * Check if a question count is a milestone
 * @param {number} count - Number of questions answered
 * @returns {boolean} True if count is a milestone (5, 10, 15, 20)
 */
export function isMilestone(count) {
  return [5, 10, 15, 20].includes(count);
}

/**
 * Get Vietnamese message for milestone
 * @param {number} count - Number of questions answered
 * @returns {string} Vietnamese milestone message
 */
export function getMilestoneMessage(count) {
  return MILESTONE_MESSAGES[count] || '';
}

/**
 * Get icon emoji for milestone
 * @param {number} count - Number of questions answered
 * @returns {string} Icon emoji
 */
export function getMilestoneIcon(count) {
  return MILESTONE_ICONS[count] || '';
}
