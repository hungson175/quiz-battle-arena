# Sprint 6 Backlog

**Sprint Goal:** Wall-nut Collision + Question Flow + Balance
**Sprint Start:** 2025-12-30
**Sprint End:** TBD

---

## Sprint Scope

Fix critical issues from Boss review:
- Wall-nut must actually BLOCK zombies (not let them walk through)
- Questions appear faster after answering (earn gold + learn more)
- Level must be beatable with good strategy

**Design Intent:** Make Wall-nut useful, increase learning opportunities, game winnable!

---

## PO Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Wall-nut collision | Must stop zombie movement | Core feature - useless otherwise |
| Question interval | Faster after answering | More gold + more learning for kids |
| Balance target | All levels beatable | Game must be winnable |

---

## Sprint Items

### [S6-001]: Fix Wall-nut Zombie Collision
**Owner:** DEV
**Status:** TODO
**Priority:** HIGH - Core feature broken

**Problem:** Zombies walk through Wall-nut instead of stopping and attacking it.

**Tasks:**
- [ ] Debug zombie-wallnut collision detection
- [ ] Make zombie stop when hitting Wall-nut
- [ ] Zombie should attack Wall-nut (reduce HP)
- [ ] Wall-nut destroyed when HP = 0
- [ ] Test collision works correctly

**Acceptance Criteria:**
- [ ] Zombie stops when reaching Wall-nut
- [ ] Zombie attacks Wall-nut (visible damage)
- [ ] Wall-nut HP decreases
- [ ] Zombie resumes moving after Wall-nut destroyed
- [ ] Tests pass

---

### [S6-002]: Faster Question Intervals
**Owner:** DEV
**Status:** TODO
**Priority:** HIGH - Gameplay + Learning

**Problem:** Questions don't appear fast enough after answering. Player can't earn gold quickly enough, and kids don't get enough learning opportunities.

**Tasks:**
- [ ] Reduce interval between questions
- [ ] New question appears shortly after previous answered
- [ ] Balance: not too fast (overwhelming) but faster than now
- [ ] GD input on ideal interval timing

**Acceptance Criteria:**
- [ ] New question appears within 3-5 seconds of answering
- [ ] Player can earn gold at reasonable pace
- [ ] Feels engaging, not overwhelming
- [ ] Supports learning (more questions = more practice)

---

### [S6-003]: Level Balance - Make Beatable
**Owner:** DEV + GD
**Status:** TODO
**Priority:** HIGH - Game unwinnable

**Problem:** Level is still unbeatable even after S5-002 fix.

**Tasks:**
- [ ] GD: Analyze current wave config
- [ ] Identify why still too hard
- [ ] Adjust zombie count / spawn interval / speed
- [ ] Test each wave is beatable with good play
- [ ] Document final balance values

**Acceptance Criteria:**
- [ ] Wave 1 is easy (intro)
- [ ] Wave 2-4 are challenging but beatable
- [ ] Wave 5 is hard but possible
- [ ] Player can win with good answers + strategy
- [ ] Game feels HARD but FAIR

---

## Definition of Done (Sprint Level)

- [ ] All items completed
- [ ] TL code review passed
- [ ] QA black-box testing passed
- [ ] Game runs without errors (`npm run dev`)
- [ ] Tests pass (`npm test`)
- [ ] PO accepts demo
- [ ] Wall-nut blocks zombies
- [ ] Questions flow faster
- [ ] Game is beatable
- [ ] Pushed to remote before Boss review
- [ ] Run with `npm run dev -- --host` for Boss review

---

## Progress Tracking

| Item | Status | Owner | Notes |
|------|--------|-------|-------|
| S6-001 | TODO | DEV | Wall-nut collision |
| S6-002 | TODO | DEV | Question intervals |
| S6-003 | TODO | DEV+GD | Balance fix |

---

## Notes

- All 3 items are CRITICAL - game not fun without them
- Wall-nut is useless if it doesn't block zombies
- More questions = more learning for kids (educational goal)
- Boss will return to review - keep server running with --host
- Port 3336 required
