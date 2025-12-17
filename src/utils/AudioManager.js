/**
 * AudioManager - Sprint 3
 * Manages game audio: loading, playing, toggling, and LocalStorage persistence
 *
 * Child-Friendly Audio Design:
 * - Cheerful, encouraging sounds (NOT punishing or scary)
 * - Wrong answer: Friendly boop (NOT harsh buzzer)
 * - Defeat: Supportive try-again (NOT sad music)
 * - Volume levels appropriate for children (0.4-0.7)
 */

export class AudioManager {
  /**
   * Create AudioManager instance
   * @param {Phaser.Scene} scene - Phaser scene for audio loading/creation
   */
  constructor(scene) {
    this.scene = scene;
    this.sounds = {};
    this.enabled = true;

    // Load sound preference from LocalStorage
    this.loadSoundPreference();
  }

  /**
   * Preload audio files in Phaser scene
   * Call this in scene's preload() method
   * Handles loading errors gracefully (Sprint 3 fix)
   */
  preload() {
    if (!this.scene) return;

    // Set up error handler for audio loading failures
    this.scene.load.on('loaderror', (fileObj) => {
      if (fileObj.type === 'audio') {
        console.warn(`[AudioManager] Failed to load audio file: ${fileObj.key}`);
      }
    });

    // Load 8 audio files
    this.scene.load.audio('correct', 'assets/audio/correct.mp3');
    this.scene.load.audio('wrong', 'assets/audio/wrong.mp3');
    this.scene.load.audio('milestone_5', 'assets/audio/milestone_5.mp3');
    this.scene.load.audio('milestone_10', 'assets/audio/milestone_10.mp3');
    this.scene.load.audio('milestone_15', 'assets/audio/milestone_15.mp3');
    this.scene.load.audio('gameover_victory', 'assets/audio/gameover_victory.mp3');
    this.scene.load.audio('gameover_defeat', 'assets/audio/gameover_defeat.mp3');
    this.scene.load.audio('button_click', 'assets/audio/button_click.mp3');
  }

  /**
   * Create sound objects in Phaser scene
   * Call this in scene's create() method
   * Handles corrupted/missing audio files gracefully (Sprint 3 fix)
   */
  create() {
    if (!this.scene) return;

    try {
      // Create sound objects with default volume levels
      this.sounds.correct = this.scene.sound.add('correct');
      this.sounds.wrong = this.scene.sound.add('wrong');
      this.sounds.milestone_5 = this.scene.sound.add('milestone_5');
      this.sounds.milestone_10 = this.scene.sound.add('milestone_10');
      this.sounds.milestone_15 = this.scene.sound.add('milestone_15');
      this.sounds.gameover_victory = this.scene.sound.add('gameover_victory');
      this.sounds.gameover_defeat = this.scene.sound.add('gameover_defeat');
      this.sounds.button_click = this.scene.sound.add('button_click');
    } catch (error) {
      console.warn('[AudioManager] Audio files not loaded properly, running in silent mode:', error.message);
      this.enabled = false; // Disable audio if files fail to load
      this.sounds = {}; // Clear sounds object
    }
  }

  /**
   * Play a sound if audio is enabled
   * @param {string} soundName - Name of sound to play (e.g., 'correct', 'wrong')
   * @param {number} volume - Volume level (0.0-1.0), defaults per sound type
   * Handles playback errors gracefully (Sprint 3 fix)
   */
  play(soundName, volume = 0.7) {
    if (this.enabled && this.sounds[soundName]) {
      try {
        this.sounds[soundName].play({ volume });
      } catch (error) {
        console.warn(`[AudioManager] Sound '${soundName}' failed to play:`, error.message);
      }
    }
  }

  /**
   * Toggle sound on/off and save preference
   */
  toggle() {
    this.enabled = !this.enabled;
    this.saveSoundPreference();
  }

  /**
   * Load sound preference from LocalStorage
   * Defaults to true (enabled) if no preference saved
   */
  loadSoundPreference() {
    const saved = localStorage.getItem('quizBattleArena_soundEnabled');

    // If null (no preference), default to enabled
    // Otherwise, parse 'true' / 'false' string to boolean
    this.enabled = saved === null ? true : saved === 'true';
  }

  /**
   * Save sound preference to LocalStorage
   */
  saveSoundPreference() {
    localStorage.setItem('quizBattleArena_soundEnabled', this.enabled.toString());
  }

  /**
   * Check if sound is currently enabled
   * @returns {boolean} True if sound is enabled
   */
  isEnabled() {
    return this.enabled;
  }
}
