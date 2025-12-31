# Sprint 13 Backlog

**Sprint Goal:** Remove gold sync + fix wave bug
**Sprint Start:** 2026-01-01
**Sprint End:** TBD

---

## Reference Project

**IMPORTANT:** Sample code location: `sample_codes/tower-defence/`

---

## Sprint Items

### [S13-001]: Remove Gold Display from React UI
**Owner:** DEV
**Status:** TODO
**Priority:** P1

**Description:**
Remove ONLY the gold display from React UI. Keep quiz panel, tower selector - just remove gold sync.

**Boss Clarification:**
- Keep React quiz UI - it's good as is
- Only remove gold display from React
- Gold should only show in Phaser game UI
- No more React/Phaser sync needed for gold

**Changes Required:**
- [ ] Remove gold display from QuizPanel.jsx or App.jsx
- [ ] Remove gold-related event listeners (if any)
- [ ] Keep quiz panel, tower selector, all other React UI

**Acceptance Criteria:**
- [ ] Gold display removed from React UI
- [ ] Gold still shows in Phaser game UI
- [ ] Quiz panel still works
- [ ] Tower selector still works
- [ ] TL code review approved
- [ ] QA verification passed
- [ ] Boss acceptance

---

### [S13-002]: Wave Stuck at 1 Second Bug
**Owner:** DEV
**Status:** TODO
**Priority:** P0 - Game breaking

**Description:**
Boss found: Wave countdown stops at 1 second, next wave doesn't spawn. This is a regression from S12-001 fix.

**Investigation Needed:**
- [ ] Check countdown logic in WaveManager.startAutoWaveCountdown()
- [ ] Verify countdown reaches 0 and triggers startNextWave()
- [ ] Compare with sample project countdown behavior

**Acceptance Criteria:**
- [ ] Wave countdown reaches 0
- [ ] Next wave spawns automatically
- [ ] All waves progress correctly
- [ ] TL code review approved
- [ ] QA verification passed
- [ ] Boss acceptance

---

## Definition of Done

- [ ] Gold removed from React UI only
- [ ] Wave progression works
- [ ] All game mechanics still work
- [ ] TL code review approved
- [ ] QA testing passed
- [ ] Pushed to remote
- [ ] Boss acceptance

---

## Progress Tracking

| Item | Status | Owner | Priority | Notes |
|------|--------|-------|----------|-------|
| S13-001 | TODO | DEV | P1 | Remove gold from React |
| S13-002 | TODO | DEV | P0 | Wave countdown bug |

---

## Sprint 12 Summary (COMPLETED)

**All items BOSS ACCEPTED:**
- ✅ S12-001: Wave progression fix (e481812)

---

## Notes

- S13-002 is P0 (game breaking) - should be fixed first
- S13-001 is simplification only - not full React removal
- Quiz feature stays in React
