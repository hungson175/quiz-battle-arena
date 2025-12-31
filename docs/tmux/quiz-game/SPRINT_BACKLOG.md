# Sprint 11 Backlog

**Sprint Goal:** Tower behaviors match sample project
**Sprint Start:** 2025-12-31
**Sprint End:** TBD

---

## Reference Project

**IMPORTANT:** Sample code location: `sample_codes/tower-defence/`

All tower behaviors should match this reference exactly.

---

## Sprint Items

### [S11-001]: Implement Tower Behaviors from Sample
**Owner:** DEV
**Status:** TODO
**Priority:** P0 - Critical

**Description:**
Each tower type should have unique behavior exactly as in sample project.

**Reference Files:**
- `sample_codes/tower-defence/src/entities/Tower.js`
- `sample_codes/tower-defence/src/entities/MultiShotTower.js`
- `sample_codes/tower-defence/src/entities/SupportTower.js`
- `sample_codes/tower-defence/src/assets/config/towers.json`

**Tasks:**
- [ ] Study sample tower implementations
- [ ] BASIC tower: Standard single-target damage
- [ ] AOE tower: Splash damage in radius (50px)
- [ ] SLOW tower: Slows enemies 50% for 2s
- [ ] SNIPER tower: High damage (80), long range (350), slow fire (2500ms)
- [ ] MULTISHOT tower: Hits 3 targets per shot
- [ ] SUPPORT tower: Buffs nearby towers +20% fire rate

**Acceptance Criteria:**
- [ ] All 6 tower types have unique behaviors
- [ ] Behaviors match sample project exactly
- [ ] TL code review approved
- [ ] QA testing passed (compare with sample on port 3337)
- [ ] Boss acceptance

---

## Definition of Done

- [ ] All tower behaviors implemented
- [ ] Matches sample project behavior
- [ ] TL code review approved
- [ ] QA visual comparison with sample passed
- [ ] Game is playable
- [ ] Pushed to remote
- [ ] Boss acceptance

---

## Progress Tracking

| Item | Status | Owner | Notes |
|------|--------|-------|-------|
| S11-001 | TODO | DEV | Tower behaviors |

---

## Sprint 10 Summary (COMPLETED)

**All items done:**
- ✅ S10-001: Remove old code (49bf0e3)
- ✅ S10-002: Clone sample + 70/30 layout (49bf0e3)
- ✅ S10-003: React quiz panel (e3b83f6)
- ✅ S10-004: Quiz-only gold (e3b83f6)
- ✅ S10-005: Continuous quiz (e3b83f6)
- ✅ Layout fixes (f20be59, 4e06b1f)
- ✅ Auto-start + money bridge (f220819)
- ✅ Tower selection in React (d6238b4, c417ef5)

**Boss Accepted:** Yes

---

## Notes

- Reference sample_codes/tower-defence/ for ALL behavior questions
- QA must compare with sample project side-by-side
- Tower stats from sample's towers.json config
