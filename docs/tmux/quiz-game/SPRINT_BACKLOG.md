# Sprint 5 Backlog

**Sprint Goal:** Critical Bug Fixes - Wall-nut & Balance
**Sprint Start:** 2025-12-30
**Sprint End:** TBD

---

## Sprint Scope

Fix critical bugs found in Boss review:
- Wall-nut placement crashes/hangs the game
- Level 2 unbeatable due to enemy spawning issues (overlap)

**Design Intent:** Make the game stable and winnable!

---

## PO Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Priority | Bugs first | Game must be playable |
| Wall-nut fix | HIGH | Core feature broken |
| Balance fix | HIGH | Game unwinnable |

---

## Sprint Items

### [S5-001]: Fix Wall-nut Placement Hang
**Owner:** DEV
**Status:** TODO
**Priority:** HIGH - Critical bug

**Problem:** Game hangs/freezes when placing Wall-nut on grid.

**Tasks:**
- [ ] Reproduce the bug
- [ ] Debug Wall-nut entity creation
- [ ] Check PlantManager integration
- [ ] Fix the hang issue
- [ ] Add test to prevent regression

**Acceptance Criteria:**
- [ ] Wall-nut can be placed without game hanging
- [ ] Wall-nut functions correctly (blocks zombies)
- [ ] No console errors on placement
- [ ] Tests pass

---

### [S5-002]: Fix Level 2 Balance - Enemy Overlap
**Owner:** DEV (with GD input)
**Status:** TODO
**Priority:** HIGH - Game unwinnable

**Problem:** Level 2 has too many enemies and they overlap, making it unbeatable.

**Tasks:**
- [ ] Investigate zombie spawning logic
- [ ] Check for overlapping spawn positions
- [ ] GD: Review wave 2 zombie count and spawn rate
- [ ] Fix spawn overlap issue
- [ ] Rebalance wave 2 if needed
- [ ] Test that level 2 is beatable

**Acceptance Criteria:**
- [ ] Zombies don't overlap on spawn
- [ ] Wave 2 is challenging but beatable
- [ ] Spawn timing is correct
- [ ] Game feels fair

---

## Definition of Done (Sprint Level)

- [ ] All items completed
- [ ] TL code review passed
- [ ] QA black-box testing passed
- [ ] Game runs without errors (`npm run dev`)
- [ ] Tests pass (`npm test`)
- [ ] PO accepts demo
- [ ] Game is stable and winnable
- [ ] Pushed to remote before Boss review
- [ ] Run with `--host` for Boss review

---

## Progress Tracking

| Item | Status | Owner | Notes |
|------|--------|-------|-------|
| S5-001 | TODO | DEV | Wall-nut hang bug |
| S5-002 | TODO | DEV/GD | Level 2 balance/overlap |

---

## Notes

- These are CRITICAL bugs - fix before adding new features
- After Sprint 5: Game should be stable and playable
- Boss reviews on different machine - use `npm run dev -- --host`
- Port 3336 required
