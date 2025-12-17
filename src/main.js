import Phaser from 'phaser';
import MenuScene from './scenes/MenuScene.js';
import GameScene from './scenes/GameScene.js';
import GameOverScene from './scenes/GameOverScene.js';

// Game configuration for Quiz Battle Arena
// Sprint 1: Core Mechanics
// Sprint 2A: Game Loop & Health
// Sprint 2B: Polish & Celebrations
// Sprint 3: UI/UX & Polish
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game-container',
  backgroundColor: '#34495e',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [MenuScene, GameScene, GameOverScene] // MenuScene is initial scene
};

// Create game instance
const game = new Phaser.Game(config);

// Log initialization
console.log('✅ Quiz Battle Arena initialized');
console.log('✅ Sprint 1: Core Mechanics');
console.log('✅ Sprint 2A: Game Loop & Health');
console.log('✅ Sprint 2B: Polish & Celebrations');
console.log('✅ Sprint 3: UI/UX & Polish (In Progress)');

export { game };
