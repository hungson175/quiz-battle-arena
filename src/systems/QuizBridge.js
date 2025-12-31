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

// ==================== TOWER SELECTION EVENTS ====================

/**
 * React → Phaser: User selected a tower type
 * @param {string} towerType - Tower type key (e.g., 'BASIC', 'SNIPER')
 */
export function selectTower(towerType) {
  window.dispatchEvent(new CustomEvent('tower:select', { detail: { type: towerType } }));
}

/**
 * Phaser → React: Tower selection confirmed, send current state
 * @param {object} state - { selectedTower, gold, towers }
 */
export function emitTowerState(state) {
  window.dispatchEvent(new CustomEvent('tower:state', { detail: state }));
}

/**
 * Listen for tower selection from React (use in Phaser)
 * @param {function} callback - Handler receiving { type }
 */
export function listenForTowerSelect(callback) {
  window.addEventListener('tower:select', (e) => callback(e.detail));
}
