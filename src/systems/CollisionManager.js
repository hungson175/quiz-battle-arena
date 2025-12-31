export default class CollisionManager {
  constructor(scene) {
    this.scene = scene;
  }

  checkCollisions() {
    // Use manager accessors to get arrays
    const projectiles = this.scene.projectileManager.getAll();
    const enemies = this.scene.enemyManager.getAll();
    for (let i = projectiles.length - 1; i >= 0; i--) {
      const projectile = projectiles[i];
      for (let j = enemies.length - 1; j >= 0; j--) {
        const enemy = enemies[j];
        if (enemy.data.flying && !projectile.projectileData.canHitFlying) continue;
        if (
          Phaser.Geom.Intersects.RectangleToRectangle(
            projectile.getBounds(),
            enemy.getBounds()
          )
        ) {
          // Handle projectile hit logic here
          // 1. Spawn hit effect
          if (this.scene.effectSpawner) {
            this.scene.effectSpawner.createHitEffect(enemy.x, enemy.y);
          }

          // 2. Handle AOE splash damage
          if (projectile.projectileData.aoeRadius) {
            this.applyAOEDamage(
              enemy.x,
              enemy.y,
              projectile.projectileData.aoeRadius,
              projectile.projectileData.damage,
              projectile.projectileData.canHitFlying
            );
          } else {
            // Single-target damage
            if (typeof enemy.takeDamage === 'function') {
              enemy.takeDamage(projectile.projectileData.damage);
            }
          }

          // 3. Apply slow effect if projectile has it
          if (projectile.projectileData.slowFactor && projectile.projectileData.slowDuration) {
            if (typeof enemy.applySlowEffect === 'function') {
              enemy.applySlowEffect(
                projectile.projectileData.slowFactor,
                projectile.projectileData.slowDuration
              );
            }
          }
          // 4. Play sound
          if (this.scene.audioManager) {
            this.scene.audioManager.playSound('attack');
          }

          // 5. Award money/score if enemy is killed (skip for AOE - handled in applyAOEDamage)
          if (!projectile.projectileData.aoeRadius && enemy.isDead && enemy.isDead()) {
            if (this.scene.economyManager) {
              this.scene.economyManager.enemiesKilled++;
              // Award +10 gold per enemy kill
              this.scene.economyManager.addMoney(10);
              this.scene.economyManager.updateScore && this.scene.economyManager.updateScore();
              // Emit UI update event for money and score
              this.scene.events.emit('updateUI', {
                money: this.scene.economyManager.money,
                score: this.scene.economyManager.score,
                lives: this.scene.economyManager.lives
              });
            }
            // Remove enemy from group
            this.scene.enemyManager.removeEnemy(enemy);
            if (this.scene.effectSpawner) {
              this.scene.effectSpawner.createExplosionEffect(enemy.x, enemy.y, 32);
            }
            if (this.scene.audioManager) {
              this.scene.audioManager.playSound('enemy_death');
            }
          }
          // Remove projectile
          projectile.destroy();
          this.scene.projectileManager.removeProjectile(projectile);
          break;
        }
      }
    }
  }

  /**
   * Apply AOE (Area of Effect) damage to all enemies within radius
   * @param {number} x - Center X position
   * @param {number} y - Center Y position
   * @param {number} radius - Splash damage radius
   * @param {number} damage - Damage to apply
   * @param {boolean} canHitFlying - Whether this can damage flying enemies
   */
  applyAOEDamage(x, y, radius, damage, canHitFlying) {
    const enemies = this.scene.enemyManager.getAll();
    const enemiesToRemove = [];

    for (const enemy of enemies) {
      // Skip flying enemies if projectile can't hit them
      if (enemy.data.flying && !canHitFlying) continue;

      // Calculate distance from impact point
      const distance = Phaser.Math.Distance.Between(x, y, enemy.x, enemy.y);

      // Damage enemies within radius
      if (distance <= radius) {
        if (typeof enemy.takeDamage === 'function') {
          enemy.takeDamage(damage);
        }

        // Spawn hit effect for each affected enemy
        if (this.scene.effectSpawner) {
          this.scene.effectSpawner.createHitEffect(enemy.x, enemy.y);
        }

        // Check if enemy died from AOE damage
        if (enemy.isDead && enemy.isDead()) {
          enemiesToRemove.push(enemy);
        }
      }
    }

    // Handle deaths from AOE damage
    for (const enemy of enemiesToRemove) {
      if (this.scene.economyManager) {
        this.scene.economyManager.enemiesKilled++;
        // Award +10 gold per enemy kill
        this.scene.economyManager.addMoney(10);
        this.scene.economyManager.updateScore && this.scene.economyManager.updateScore();
        this.scene.events.emit('updateUI', {
          money: this.scene.economyManager.money,
          score: this.scene.economyManager.score,
          lives: this.scene.economyManager.lives
        });
      }
      this.scene.enemyManager.removeEnemy(enemy);
      if (this.scene.effectSpawner) {
        this.scene.effectSpawner.createExplosionEffect(enemy.x, enemy.y, 32);
      }
      if (this.scene.audioManager) {
        this.scene.audioManager.playSound('enemy_death');
      }
    }

    // Create explosion effect at impact point
    if (this.scene.effectSpawner) {
      this.scene.effectSpawner.createExplosionEffect(x, y, radius);
    }
  }
}
