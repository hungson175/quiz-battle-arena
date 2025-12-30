// src/entities/ZombieNew.js
// Base Zombie class extending Phaser.Container (S9-003)
// Named ZombieNew to avoid conflict during transition

import Phaser from 'phaser';

export default class ZombieNew extends Phaser.GameObjects.Container {
  constructor(scene, x, y, type, config, lane, difficultyMultipliers = {}) {
    super(scene, x, y);

    // Add to scene
    scene.add.existing(this);
    this.setDepth(15);

    // Store zombie data
    this.type = type;
    this.config = { ...config };
    this.lane = lane;
    this.col = this.calculateCol(x);

    // Apply difficulty multipliers
    const healthMult = difficultyMultipliers.zombieHealthMultiplier || 1.0;
    const speedMult = difficultyMultipliers.zombieSpeedMultiplier || 1.0;

    this.hp = Math.round(config.hp * healthMult);
    this.maxHp = this.hp;
    this.speed = config.speed / speedMult;  // Lower = faster (seconds per tile)

    // State management
    this.state = 'walking';  // walking, attacking, dead
    this.targetPlant = null;
    this.attackTimer = 0;
    this.isActive = true;

    // Unique ID for tracking
    this.id = ZombieNew.nextId++;

    // Create sprite (placeholder rectangle for now)
    this.createSprite();

    // Create health bar
    this.createHealthBar();
  }

  createSprite() {
    // Use colored rectangle as placeholder until sprites are added
    const color = this.type === 'FAST' ? 0x00ffff :
                  this.type === 'ARMORED' ? 0x808080 : 0x8b0000;

    this.sprite = this.scene.add.rectangle(0, 0, 40, 60, color);
    this.add(this.sprite);
  }

  createHealthBar() {
    const barWidth = 40;
    const barHeight = 6;

    this.healthBarBg = this.scene.add.rectangle(0, -35, barWidth, barHeight, 0x333333);
    this.healthBar = this.scene.add.rectangle(0, -35, barWidth, barHeight, 0xff0000);

    this.add(this.healthBarBg);
    this.add(this.healthBar);
  }

  calculateCol(x) {
    const gridConfig = this.scene.gridConfig;
    if (!gridConfig) return 8;  // Default to rightmost column
    return Math.floor((x - gridConfig.gridMarginLeft) / gridConfig.cellWidth);
  }

  update(time, delta) {
    if (!this.isActive || this.state === 'dead') return;

    // Update column position
    this.col = this.calculateCol(this.x);

    if (this.state === 'walking') {
      this.move(delta);
    } else if (this.state === 'attacking') {
      this.attack(time, delta);
    }
  }

  move(delta) {
    // Speed is in seconds per tile
    // pixelSpeed = tileWidth / speed (seconds)
    const tileWidth = this.scene.gridConfig?.cellWidth || 97.7;
    const pixelSpeed = tileWidth / this.speed;

    // Move left
    this.x -= pixelSpeed * (delta / 1000);

    // Check if reached house
    if (this.hasReachedHouse()) {
      this.scene.events.emit('zombie:reachedHouse', this);
      this.die();
    }
  }

  attack(time, delta) {
    if (!this.targetPlant || !this.targetPlant.isActive) {
      this.stopAttacking();
      return;
    }

    // Attack every second (DPS)
    this.attackTimer += delta;
    if (this.attackTimer >= 1000) {
      this.attackTimer = 0;
      this.targetPlant.takeDamage(this.config.attackDps);
    }
  }

  startAttacking(plant) {
    this.state = 'attacking';
    this.targetPlant = plant;
    this.attackTimer = 0;
  }

  stopAttacking() {
    this.state = 'walking';
    this.targetPlant = null;
    this.attackTimer = 0;
  }

  takeDamage(amount) {
    // Apply armor if present
    const armor = this.config.armor || 0;
    const effectiveDamage = amount * (1 - armor);

    this.hp -= effectiveDamage;
    this.updateHealthBar();

    if (this.hp <= 0) {
      this.die();
    }
  }

  updateHealthBar() {
    const ratio = Math.max(0, this.hp / this.maxHp);
    this.healthBar.setScale(ratio, 1);
  }

  hasReachedHouse() {
    const houseX = this.scene.gridConfig?.gridMarginLeft || 100;
    return this.x <= houseX;
  }

  isDead() {
    return this.state === 'dead' || !this.isActive;
  }

  isAlive() {
    return this.isActive && this.hp > 0 && this.state !== 'dead';
  }

  die() {
    this.state = 'dead';
    this.isActive = false;
    this.scene.events.emit('zombie:died', this);
    this.destroy();
  }

  destroy(fromScene) {
    if (this.healthBar) this.healthBar.destroy();
    if (this.healthBarBg) this.healthBarBg.destroy();
    if (this.sprite) this.sprite.destroy();
    super.destroy(fromScene);
  }

  // Compatibility methods for existing code
  getDps() {
    return this.config.attackDps;
  }

  getPositionX() {
    return this.x;
  }
}

// Static ID counter for unique zombie IDs
ZombieNew.nextId = 1;
