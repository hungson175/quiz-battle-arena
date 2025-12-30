import Phaser from 'phaser';
import { GameScene } from './scenes/GameScene.js';

// Game configuration
const config = {
  type: Phaser.AUTO,
  width: 960,
  height: 540,
  parent: 'game-container',
  backgroundColor: '#87ceeb',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: [GameScene]
};

// Create game instance
const game = new Phaser.Game(config);

export default game;
