/**
 * ClickDetection utility
 * Implements GD Rec #1: Forgiving click detection with grace area
 * Grace area: +10px on all sides of visual target
 */

/**
 * Check if click is within target hitbox (including grace area)
 * @param {number} mouseX - Click X coordinate
 * @param {number} mouseY - Click Y coordinate
 * @param {Object} hitbox - Hitbox definition { x, y, width, height }
 * @returns {boolean} True if click is within hitbox
 */
export function isClicked(mouseX, mouseY, hitbox) {
  return (
    mouseX >= hitbox.x &&
    mouseX <= hitbox.x + hitbox.width &&
    mouseY >= hitbox.y &&
    mouseY <= hitbox.y + hitbox.height
  );
}

/**
 * Create hitbox with grace area extension
 * @param {Object} visual - Visual boundary { x, y, width, height }
 * @param {number} graceArea - Pixels to extend on all sides (default: 10px)
 * @returns {Object} Extended hitbox
 */
export function createHitbox(visual, graceArea = 10) {
  return {
    x: visual.x - graceArea,
    y: visual.y - graceArea,
    width: visual.width + (graceArea * 2),
    height: visual.height + (graceArea * 2)
  };
}

/**
 * Check if point is within visual boundary (no grace area)
 * Used for testing grace area effectiveness
 * @param {number} mouseX - Click X coordinate
 * @param {number} mouseY - Click Y coordinate
 * @param {Object} visual - Visual boundary
 * @returns {boolean} True if within visual boundary
 */
export function isWithinVisual(mouseX, mouseY, visual) {
  return (
    mouseX >= visual.x &&
    mouseX <= visual.x + visual.width &&
    mouseY >= visual.y &&
    mouseY <= visual.y + visual.height
  );
}
