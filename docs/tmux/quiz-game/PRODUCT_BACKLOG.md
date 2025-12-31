# Product Backlog - Quiz Tower Defense

**Product Owner:** PO
**Last Updated:** 2025-12-31
**Game Style:** Tower Defense (sample clone) + Educational Quiz

---

## Vision

Build a **Tower Defense game** (clone of sample_codes/tower-defence/) with an educational quiz panel. Players earn gold ONLY by answering quiz questions correctly.

**Core Loop:**
- Enemies attack → Player needs towers to defend
- Answer quiz correctly → +30 gold
- Answer wrong → -10 gold
- Build towers with earned gold
- Survive all waves

---

## Reference Project

**IMPORTANT:** This game imitates sample_codes/tower-defence/

All team members should reference this codebase for:
- Tower behaviors
- Enemy behaviors
- Wave progression
- Game mechanics

---

## Completed Sprints

### Sprint 10 (DONE)
- ✅ Clone sample tower defense as base
- ✅ React quiz panel (30% right side)
- ✅ 70/30 layout (Phaser | React)
- ✅ Gold only from quiz (correct +30, wrong -10)
- ✅ Auto-start waves (10s countdown)
- ✅ Money bridge (React → Phaser)
- ✅ Tower selection in React

---

## Backlog Items

### P0 - Critical (Next Sprint)

#### [PBI-001]: Tower Behaviors from Sample
**Priority:** P0
**Status:** Ready for Sprint 11
**Estimate:** M

**Description:**
Implement different behaviors for each tower type, exactly as in sample_codes/tower-defence/

**Acceptance Criteria:**
- [ ] BASIC tower: Standard single-target damage
- [ ] AOE tower: Splash damage in radius
- [ ] SLOW tower: Slows enemies
- [ ] SNIPER tower: High damage, long range, slow fire
- [ ] MULTISHOT tower: Hits multiple targets
- [ ] SUPPORT tower: Buffs nearby towers

**Reference:** sample_codes/tower-defence/src/entities/Tower.js

---

#### [PBI-002]: Enemy Behaviors from Sample
**Priority:** P0
**Status:** Ready
**Estimate:** M

**Description:**
Implement different enemy types with unique behaviors from sample.

**Acceptance Criteria:**
- [ ] BASIC enemy: Normal walk
- [ ] FAST enemy: Faster speed
- [ ] ARMORED enemy: Damage reduction
- [ ] FLYING enemy: Different path
- [ ] HEALER enemy: Heals nearby enemies
- [ ] SHIELD enemy: Temporary invulnerability
- [ ] SPLIT enemy: Splits on death
- [ ] TELEPORT enemy: Jumps forward
- [ ] BOSS enemy: High HP, high damage

**Reference:** sample_codes/tower-defence/src/entities/Enemy.js

---

### P1 - High Priority

#### [PBI-003]: Tower Upgrade System
**Priority:** P1
**Status:** Ready
**Estimate:** M

**Description:**
Allow towers to be upgraded (3 levels max) as in sample.

**Acceptance Criteria:**
- [ ] Click tower to show upgrade option
- [ ] Pay gold to upgrade
- [ ] Stats improve with each level
- [ ] Visual change on upgrade

---

#### [PBI-004]: Difficulty Selection
**Priority:** P1
**Status:** Ready
**Estimate:** S

**Description:**
Allow player to select Easy/Normal/Hard before game.

**Acceptance Criteria:**
- [ ] Difficulty selection screen
- [ ] Each difficulty affects: enemy HP, speed, gold rewards
- [ ] Starting gold varies by difficulty

---

### P2 - Medium Priority

#### [PBI-005]: Better Assets
**Priority:** P2
**Status:** Ready
**Estimate:** M

**Description:**
Replace placeholder graphics with proper assets from research.

**Reference:** docs/research/GAME_ASSETS.md

---

#### [PBI-006]: Sound Effects
**Priority:** P2
**Status:** Ready
**Estimate:** S

**Description:**
Add sound effects for tower fire, enemy death, etc.

---

### P3 - Low Priority (Future)

#### [PBI-007]: Multiple Question Sets
**Priority:** P3
**Status:** New
**Estimate:** S

**Description:**
Support different question JSON files for different subjects.

---

#### [PBI-008]: Vietnamese Language Support
**Priority:** P3
**Status:** New
**Estimate:** S

**Description:**
Full Vietnamese localization.

---

## Sprint 11 Recommendation

**Sprint 11 Goal:** Tower behaviors match sample project

**Items for Sprint 11:**
1. PBI-001: Tower Behaviors from Sample (P0)

**Deliverable:** All 6 tower types have correct unique behaviors

---

## Notes

- Sample code location: `sample_codes/tower-defence/`
- Always reference sample for behavior questions
- Game asset research: `docs/research/GAME_ASSETS.md`
