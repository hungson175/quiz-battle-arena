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

### Sprint 15 (IN PROGRESS)
- ✅ S15-002: Game freeze on restart fix
- ✅ S15-009: HEALER house damage (set to 0)
- ✅ S15-006: Tower icons in React selector
- ✅ S15-010: Expand to 50 Vietnamese history questions

### Sprint 14 (DONE)
- ✅ Lives 20 → 3

### Sprint 13 (DONE)
- ✅ Remove gold display from React
- ✅ Wave countdown timer fix

### Sprint 12 (DONE)
- ✅ Wave auto-progression fix

### Sprint 11 (DONE)
- ✅ PBI-001: Tower behaviors match sample (all 6 types)
- ✅ +10 gold on enemy kill (balance fix)

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
**Status:** ✅ DONE (Sprint 11)
**Estimate:** M

**Description:**
Implement different behaviors for each tower type, exactly as in sample_codes/tower-defence/

**Acceptance Criteria:**
- [x] BASIC tower: Standard single-target damage
- [x] AOE tower: Splash damage in radius
- [x] SLOW tower: Slows enemies
- [x] SNIPER tower: High damage, long range, slow fire
- [x] MULTISHOT tower: Hits multiple targets
- [x] SUPPORT tower: Buffs nearby towers

**Reference:** sample_codes/tower-defence/src/entities/Tower.js

---

#### [PBI-NEW]: Wave Auto-Spawn Bug
**Priority:** P0
**Status:** Sprint 12
**Estimate:** S

**Description:**
Wave 2 doesn't spawn automatically after Wave 1 ends. Game progression is broken.

**Acceptance Criteria:**
- [ ] Verify sample wave behavior first
- [ ] All waves spawn automatically after previous wave ends
- [ ] Boss re-test passed

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
**Status:** Ready (Already in sample clone)
**Estimate:** S (Verify only)

**Description:**
Verify tower upgrade system works correctly from sample clone.

**Acceptance Criteria:**
- [ ] Click tower to show upgrade option
- [ ] Pay gold to upgrade
- [ ] Stats improve with each level
- [ ] Visual change on upgrade

---

#### [PBI-010]: Remove Difficulty Modes
**Priority:** P1
**Status:** New (From Sprint 15)
**Estimate:** S

**Description:**
Boss wants single difficulty mode, not multiple options. Remove difficulty selector.

**Acceptance Criteria:**
- [ ] Remove difficulty selection UI
- [ ] Use single balanced difficulty setting
- [ ] Clean up difficulty-related code

---

#### [PBI-011]: Rebalance Waves
**Priority:** P1
**Status:** New (From Sprint 15)
**Estimate:** M

**Description:**
Rebalance wave progression for better gameplay experience.

**Acceptance Criteria:**
- [ ] Review current wave difficulty curve
- [ ] Adjust enemy counts and types per wave
- [ ] Progressive difficulty (easier early, harder later)
- [ ] Playtest and verify balance

---

#### [PBI-012]: Enemy Hints System
**Priority:** P1
**Status:** New (From Sprint 15)
**Estimate:** M

**Description:**
Show player hints about new enemy types when they first appear. Pause game briefly to explain enemy abilities.

**Acceptance Criteria:**
- [ ] Detect first appearance of each enemy type
- [ ] Pause game and show info popup
- [ ] Explain enemy abilities clearly
- [ ] Player dismisses to continue

---

### P2 - Medium Priority

#### [PBI-005]: Better Assets
**Priority:** P2
**Status:** Ready
**Estimate:** M

**Description:**
Replace placeholder graphics with proper assets from research. Use Kenney TD Top-Down assets.

**Reference:** docs/research/GAME_ASSETS.md

---

#### [PBI-006]: Sound Effects
**Priority:** P2
**Status:** Ready
**Estimate:** S

**Description:**
Add sound effects for tower fire, enemy death, etc.

---

#### [PBI-013]: HEALER Health Bar Display
**Priority:** P2
**Status:** New (From Sprint 15)
**Estimate:** S

**Description:**
HEALER enemy health bar not displaying correctly. Visual bug.

**Acceptance Criteria:**
- [ ] Investigate health bar rendering for HEALER enemy
- [ ] Fix health bar position/visibility
- [ ] Test with other special enemy types

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
