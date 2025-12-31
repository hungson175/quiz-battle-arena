# Sprint 15 Backlog

**Sprint Goal:** Fix freeze bug + research better visuals
**Sprint Start:** 2026-01-01
**Sprint End:** TBD

---

## Reference Project

**IMPORTANT:** Sample code location: `sample_codes/tower-defence/`
**Asset Research:** `docs/research/GAME_ASSETS.md`

---

## Sprint Items

### [S15-002]: Game Freeze on Restart
**Owner:** DEV
**Status:** TODO
**Priority:** P0 - Game breaking

**Description:**
After dying first time, second game freezes. Restart/replay logic broken.

**Investigation Needed:**
- [ ] Check game restart flow
- [ ] Look for state not being reset
- [ ] Check timer/event cleanup on game over
- [ ] Compare with sample project restart logic

**Acceptance Criteria:**
- [ ] Can restart game after dying
- [ ] Second game plays normally (no freeze)
- [ ] All game state properly reset
- [ ] TL code review approved
- [ ] QA verification passed
- [ ] Boss acceptance

---

### [S15-001]: Better Visual Assets (Research)
**Owner:** GD
**Status:** TODO
**Priority:** P1 - Visual improvement

**Description:**
Boss says towers are UGLY. Research prettier tower sprites.

**Task:**
- [ ] Review existing research: docs/research/GAME_ASSETS.md
- [ ] If not sufficient, research more options:
  - Tower sprites (castles, turrets, cannons)
  - Airplane/aircraft sprites
  - General/soldier sprites
  - Other thematic options
- [ ] Provide specific recommendations with:
  - Asset source URLs
  - License info (CC0/free commercial preferred)
  - Which tiles map to which tower types

**Acceptance Criteria:**
- [ ] Research document updated with better asset options
- [ ] Clear recommendations for 6 tower types
- [ ] License-compliant assets
- [ ] PO approval of recommendations

---

## Definition of Done

- [ ] Game restart works (no freeze)
- [ ] Asset research complete with recommendations
- [ ] All TL reviews approved (for code changes)
- [ ] All QA tests passed
- [ ] Pushed to remote
- [ ] Boss acceptance

---

### [S15-003]: Tower Upgrade System Design
**Owner:** GD
**Status:** TODO
**Priority:** P1 - New feature

**Description:**
Boss wants tower upgrades. GD must design how the system works.

**Design Questions (GD to answer):**
- [ ] How to trigger upgrade? (click tower? button? menu?)
- [ ] Cost scaling? (e.g., 1.5x base cost per level?)
- [ ] What stats improve? (damage, range, fire rate, all?)
- [ ] Visual change on upgrade? (color, size, effects?)
- [ ] Max upgrade levels? (2? 3? 5?)

**Reference:**
- Check sample project: sample_codes/tower-defence/
- Boss said: "GD figure it out themselves"

**Acceptance Criteria:**
- [ ] Design document with upgrade system specs
- [ ] Clear answers to all design questions
- [ ] PO approval before DEV implements

---

## Progress Tracking

| Item | Status | Owner | Priority | Notes |
|------|--------|-------|----------|-------|
| S15-002 | TODO | DEV | P0 | Freeze bug |
| S15-001 | TODO | GD | P1 | Asset research |
| S15-003 | TODO | GD | P1 | Upgrade design |

---

## Sprint 14 Summary (COMPLETED)

**All items BOSS ACCEPTED:**
- ✅ S14-002: Lives 20 → 3 (f83018e)
- ✅ S14-001: Sprites (scope reduced - Boss accepted current state)

---

## Notes

- S15-002 is P0 - DEV should start immediately
- S15-001 is GD research task - no code changes
- Apply Sprint 14 lesson: Asset tasks need specific specs
