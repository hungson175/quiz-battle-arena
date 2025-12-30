# Sprint 9 Backlog

**Sprint Goal:** Phase 1 - Config-Driven Architecture + Base Classes
**Sprint Start:** 2025-12-30
**Sprint End:** TBD

---

## Sprint Scope

Implement Phase 1 of the restructure:
- Config-driven architecture with JSON files
- Base entity classes using Phaser.Container
- Refactored managers for new pattern

**Reference:** sample_codes/tower-defence/

---

## Sprint Items

### [S9-001]: Create Config JSON Files
**Owner:** DEV
**Status:** TODO
**Priority:** HIGH - Foundation for everything

**Tasks:**
- [ ] Create public/assets/config/plants.json
- [ ] Create public/assets/config/zombies.json
- [ ] Create public/assets/config/waves.json
- [ ] Create public/assets/config/difficulty.json
- [ ] Create public/assets/config/game.json
- [ ] Implement ConfigLoader utility

**Acceptance Criteria:**
- [ ] All config files created per RESTRUCTURE_SPEC
- [ ] Configs loadable at runtime
- [ ] Fallback to defaults if load fails

---

### [S9-002]: Implement Base Plant Class
**Owner:** DEV
**Status:** TODO
**Priority:** HIGH

**Tasks:**
- [ ] Create Plant base class extending Phaser.GameObjects.Container
- [ ] Implement hp, maxHp, lane, col properties
- [ ] Implement takeDamage(), destroy() methods
- [ ] Implement canFire(), fire() for shooting plants
- [ ] Add health bar display
- [ ] Migrate Peashooter to new pattern
- [ ] Migrate Wallnut to new pattern

**Acceptance Criteria:**
- [ ] Plant extends Phaser.GameObjects.Container
- [ ] Peashooter works with new base class
- [ ] Wallnut works with new base class
- [ ] Config-driven stats

---

### [S9-003]: Implement Base Zombie Class
**Owner:** DEV
**Status:** TODO
**Priority:** HIGH

**Tasks:**
- [ ] Create Zombie base class extending Phaser.GameObjects.Container
- [ ] Implement hp, speed, lane, state properties
- [ ] Implement states: walking, attacking, dead
- [ ] Implement takeDamage(), startAttacking(), stopAttacking()
- [ ] Add health bar display
- [ ] Migrate BasicZombie to new pattern

**Acceptance Criteria:**
- [ ] Zombie extends Phaser.GameObjects.Container
- [ ] BasicZombie works with new base class
- [ ] States properly tracked (walking/attacking/dead)
- [ ] Config-driven stats

---

### [S9-004]: Refactor PlantManager
**Owner:** DEV
**Status:** TODO
**Priority:** HIGH

**Tasks:**
- [ ] Update PlantManager for new Plant pattern
- [ ] Implement add(), remove(), getAll(), getAt()
- [ ] Update plant creation to use configs
- [ ] Ensure collision detection still works
- [ ] Update tests

**Acceptance Criteria:**
- [ ] PlantManager works with new Plant classes
- [ ] Config-driven plant creation
- [ ] All plant tests pass

---

### [S9-005]: Refactor ZombieManager
**Owner:** DEV
**Status:** TODO
**Priority:** HIGH

**Tasks:**
- [ ] Update ZombieManager for new Zombie pattern
- [ ] Implement add(), remove(), getAll()
- [ ] Update zombie creation to use configs
- [ ] Update spawning logic for config-driven waves
- [ ] Update tests

**Acceptance Criteria:**
- [ ] ZombieManager works with new Zombie classes
- [ ] Config-driven zombie creation
- [ ] All zombie tests pass

---

## Definition of Done (Sprint Level)

- [ ] All config files created
- [ ] Base Plant class implemented
- [ ] Base Zombie class implemented
- [ ] Peashooter works with new pattern
- [ ] Wallnut works with new pattern
- [ ] BasicZombie works with new pattern
- [ ] All existing tests pass
- [ ] TL code review approved
- [ ] QA black-box testing passed
- [ ] Game is playable
- [ ] Pushed to remote before Boss review
- [ ] Run with `npm run dev -- --host` for Boss review

---

## Progress Tracking

| Item | Status | Owner | Notes |
|------|--------|-------|-------|
| S9-001 | TODO | DEV | Config JSON files |
| S9-002 | TODO | DEV | Base Plant class |
| S9-003 | TODO | DEV | Base Zombie class |
| S9-004 | TODO | DEV | PlantManager refactor |
| S9-005 | TODO | DEV | ZombieManager refactor |

---

## Notes

- Reference sample_codes/tower-defence/ for patterns
- Incremental migration - keep tests passing
- Config fallbacks for safety
- This is Phase 1 of 4 in the restructure
