# Sprint 12 Backlog

**Sprint Goal:** Fix wave progression bug
**Sprint Start:** 2026-01-01
**Sprint End:** TBD

---

## Reference Project

**IMPORTANT:** Sample code location: `sample_codes/tower-defence/`

**RETRO LESSON (Sprint 11):** Verify behavior against sample BEFORE implementing fixes.

---

## Sprint Items

### [S12-001]: Wave 2 Not Spawning After Wave 1
**Owner:** DEV
**Status:** TODO
**Priority:** P0 - Critical (game progression broken)

**Description:**
After Wave 1 ends, Wave 2 does not spawn automatically. Game becomes unplayable beyond wave 1.

**Boss Report:**
- Wave 1 completes (all enemies killed)
- Wave 2 never starts
- Player stuck with no enemies

**Investigation Steps:**
1. [ ] TL: Check sample WaveManager behavior
2. [ ] TL: Compare our WaveManager to sample
3. [ ] Identify gap between our code and sample

**Reference Files:**
- `sample_codes/tower-defence/src/managers/WaveManager.js`
- `src/managers/WaveManager.js` (our implementation)

**Acceptance Criteria:**
- [ ] Wave 2 spawns automatically after Wave 1 ends
- [ ] All 10 waves progress correctly (match sample)
- [ ] TL code review approved
- [ ] QA verification passed
- [ ] Boss acceptance

---

## Definition of Done

- [ ] Wave progression works for all waves
- [ ] Matches sample project behavior
- [ ] TL code review approved
- [ ] QA testing passed
- [ ] Game is playable through all waves
- [ ] Pushed to remote
- [ ] Boss acceptance

---

## Progress Tracking

| Item | Status | Owner | Notes |
|------|--------|-------|-------|
| S12-001 | TODO | DEV | Wave progression bug |

---

## Sprint 11 Summary (COMPLETED)

**All items BOSS ACCEPTED:**
- ✅ S11-001: Tower behaviors match sample (5f42535)
- ✅ SLOW tower confirmed correct
- ✅ +10 gold on kill balance fix (7fbfe2a)

---

## Notes

- Apply Sprint 11 retro lesson: verify against sample first
- P0 priority - game is unplayable beyond wave 1
- Reference sample_codes/tower-defence/ for correct behavior
