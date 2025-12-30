// src/entities/Plant.js
// Base Plant class extending Phaser.Container (S9-002)

import Phaser from 'phaser';

export default class Plant extends Phaser.GameObjects.Container {
  constructor(scene, x, y, type, config) {
    super(scene, x, y);

    // Add to scene
    scene.add.existing(this);
    this.setDepth(20);

    // Store plant data from config
    this.type = type;
    this.config = { ...config };  // Clone to avoid mutation
    this.hp = config.hp;
    this.maxHp = config.hp;
    this.lane = null;
    this.col = null;
    this.lastFireTime = 0;
    this.isActive = true;

    // Create sprite (placeholder rectangle for now - sprites TBD)
    this.createSprite();

    // Create health bar
    this.createHealthBar();
  }

  createSprite() {
    // Use colored rectangle as placeholder until sprites are added
    const color = this.type === 'PEASHOOTER' ? 0x00ff00 :
                  this.type === 'WALLNUT' ? 0x8b4513 :
                  this.type === 'SUNFLOWER' ? 0xffff00 : 0x00ff00;

    this.sprite = this.scene.add.rectangle(0, 0, 50, 50, color);
    this.add(this.sprite);
  }

  createHealthBar() {
    const barWidth = 40;
    const barHeight = 6;

    this.healthBarBg = this.scene.add.rectangle(0, -30, barWidth, barHeight, 0x333333);
    this.healthBar = this.scene.add.rectangle(0, -30, barWidth, barHeight, 0x00ff00);

    this.add(this.healthBarBg);
    this.add(this.healthBar);
  }

  update(time, delta) {
    if (!this.isActive) return;

    // Handle money generation for Sunflower
    if (this.config.moneyGeneration && this.config.generationInterval) {
      this.handleMoneyGeneration(time);
    }
  }

  handleMoneyGeneration(time) {
    if (!this.lastGenerationTime) {
      this.lastGenerationTime = time;
    }

    if (time > this.lastGenerationTime + this.config.generationInterval) {
      this.lastGenerationTime = time;
      this.scene.events.emit('money:add', this.config.moneyGeneration);
    }
  }

  takeDamage(amount) {
    this.hp -= amount;
    this.updateHealthBar();

    if (this.hp <= 0) {
      this.die();
    }
  }

  updateHealthBar() {
    const ratio = Math.max(0, this.hp / this.maxHp);
    this.healthBar.setScale(ratio, 1);

    // Color based on HP
    if (ratio > 0.5) {
      this.healthBar.setFillStyle(0x00ff00);
    } else if (ratio > 0.25) {
      this.healthBar.setFillStyle(0xffff00);
    } else {
      this.healthBar.setFillStyle(0xff0000);
    }
  }

  canFire(time) {
    if (!this.config.fireRate || this.config.fireRate <= 0) return false;
    return time > this.lastFireTime + this.config.fireRate;
  }

  fire(time, target) {
    this.lastFireTime = time;
    // Emit event for ProjectileManager to handle
    this.scene.events.emit('plant:fire', {
      plant: this,
      target: target,
      damage: this.config.damage,
      speed: this.config.projectileSpeed
    });
  }

  die() {
    this.isActive = false;
    this.scene.events.emit('plant:died', this);
    this.destroy();
  }

  destroy(fromScene) {
    if (this.healthBar) this.healthBar.destroy();
    if (this.healthBarBg) this.healthBarBg.destroy();
    if (this.sprite) this.sprite.destroy();
    super.destroy(fromScene);
  }

  // Getters for compatibility with existing code
  isAlive() {
    return this.isActive && this.hp > 0;
  }

  getGridKey() {
    return `${this.lane},${this.col}`;
  }

  isAtCell(lane, col) {
    return this.lane === lane && this.col === col;
  }
}
