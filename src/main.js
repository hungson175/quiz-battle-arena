import Phaser from 'phaser';

// Game configuration
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game-container',
  backgroundColor: '#34495e',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

// Create game instance
const game = new Phaser.Game(config);

function preload() {
  // Assets will be loaded here
}

function create() {
  // Display welcome message
  const centerX = this.cameras.main.centerX;
  const centerY = this.cameras.main.centerY;

  this.add.text(centerX, centerY - 50, 'Quiz Battle Arena', {
    fontSize: '48px',
    color: '#ffffff',
    fontStyle: 'bold'
  }).setOrigin(0.5);

  this.add.text(centerX, centerY + 20, 'Educational Quiz Game', {
    fontSize: '24px',
    color: '#ecf0f1'
  }).setOrigin(0.5);

  this.add.text(centerX, centerY + 80, 'Development Environment Ready ✓', {
    fontSize: '18px',
    color: '#2ecc71'
  }).setOrigin(0.5);

  // Success indicator for M0
  console.log('✅ Phaser 3 initialized successfully');
  console.log('✅ Canvas rendering working');
  console.log('✅ M0 Development environment ready');
}

function update() {
  // Game loop logic will go here
}

export { game };
