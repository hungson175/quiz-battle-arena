// src/systems/QuizBridge.js
// Bridge between Phaser game and React quiz panel via window events

/**
 * Emit event to React
 * @param {string} eventName - Event name (e.g., 'quiz:show', 'quiz:result')
 * @param {object} data - Event payload
 */
export function emitToReact(eventName, data) {
  window.dispatchEvent(new CustomEvent(eventName, { detail: data }));
}

/**
 * Listen for event from React
 * @param {string} eventName - Event name (e.g., 'quiz:answer')
 * @param {function} callback - Handler function receiving event detail
 */
export function listenFromReact(eventName, callback) {
  window.addEventListener(eventName, (e) => callback(e.detail));
}

/**
 * Remove event listener
 * @param {string} eventName
 * @param {function} callback
 */
export function removeListener(eventName, callback) {
  window.removeEventListener(eventName, callback);
}
