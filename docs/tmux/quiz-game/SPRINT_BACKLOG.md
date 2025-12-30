# Sprint 3 Backlog

**Sprint Goal:** Full Game Loop - Waves, Victory, Strategic Timing
**Sprint Start:** 2025-12-30
**Sprint End:** TBD

---

## Sprint Scope

Complete the game loop:
- Wave system with increasing difficulty
- Victory condition (survive all waves)
- Strategic question timing (adds tension)

**Design Intent:** Make it a complete, playable game with win/lose conditions!

---

## PO Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Number of waves | 5 waves | Good for testing, can adjust later |
| Difficulty ramp | +1 zombie per wave | Simple, clear progression |
| Victory reward | Stats screen | Show questions answered, accuracy |
| Question timing | During waves | Adds pressure/frustration |

---

## Sprint Items

### [S3-001]: Wave System
**Owner:** DEV
**Status:** TODO
**Priority:** FIRST - Foundation for game loop

**Tasks:**
- [ ] Create WaveManager utility
- [ ] Configure wave definitions (zombies per wave, spawn rate)
- [ ] Wave counter display in UI
- [ ] Brief pause between waves
- [ ] Difficulty increases each wave (more/faster zombies)

**Acceptance Criteria:**
- [ ] Wave number visible on screen
- [ ] Each wave spawns configured zombies
- [ ] Pause between waves (3-5 seconds)
- [ ] Later waves are harder
- [ ] Clear "Wave X Starting" message

**Wave Config Suggestion:**
- Wave 1: 3 zombies, slow spawn
- Wave 2: 5 zombies
- Wave 3: 7 zombies
- Wave 4: 9 zombies
- Wave 5: 12 zombies (final wave)

---

### [S3-002]: Victory Condition
**Owner:** DEV
**Status:** TODO
**Depends On:** S3-001

**Tasks:**
- [ ] Detect when all waves completed
- [ ] Victory screen with stats
- [ ] Show: waves survived, questions answered, accuracy %
- [ ] Restart/play again button
- [ ] Victory sound/effect (if available)

**Acceptance Criteria:**
- [ ] Game ends in victory after wave 5
- [ ] Victory screen displays
- [ ] Stats shown (waves, questions, accuracy)
- [ ] Can restart game

---

### [S3-003]: Question Timing Strategy
**Owner:** DEV
**Status:** TODO
**Depends On:** S3-001

**Tasks:**
- [ ] Questions trigger during zombie waves (not just timer)
- [ ] Optional: Time limit per question (10-15 seconds)
- [ ] Unanswered question = counts as wrong
- [ ] Questions can interrupt critical moments

**Acceptance Criteria:**
- [ ] Questions appear strategically during gameplay
- [ ] Time pressure on answering (visual countdown)
- [ ] Timeout = wrong answer (-30 money)
- [ ] Adds tension/frustration

**Design Intent:** Questions interrupt at inconvenient times - FRUSTRATING!

---

### [S3-004]: Game Balance Tuning
**Owner:** GD
**Status:** TODO
**Depends On:** S3-001, S3-002

**Tasks:**
- [ ] Test and tune wave difficulty
- [ ] Balance zombie speed vs plant fire rate
- [ ] Ensure game is HARD but beatable
- [ ] Document final balance values

**Acceptance Criteria:**
- [ ] Most players fail first 2-3 attempts
- [ ] Game is beatable with good answers + strategy
- [ ] Feels challenging, not impossible
- [ ] Balance doc updated

---

## Definition of Done (Sprint Level)

- [ ] All items completed
- [ ] TL code review passed
- [ ] QA black-box testing passed
- [ ] Game runs without errors (`npm run dev`)
- [ ] Tests pass (`npm test`)
- [ ] PO accepts demo
- [ ] Game is playable from start to victory/defeat

---

## Progress Tracking

| Item | Status | Owner | Notes |
|------|--------|-------|-------|
| S3-001 | TODO | DEV | Wave system |
| S3-002 | TODO | DEV | Victory condition |
| S3-003 | TODO | DEV | Question timing |
| S3-004 | TODO | GD | Balance tuning |

---

## Dependencies

```
S3-001 (Waves) ─────┬──> S3-002 (Victory)
                    │
                    └──> S3-003 (Question Timing)

S3-004 (Balance) ── Depends on S3-001, S3-002 being testable
```

---

## Notes

- After Sprint 3, game should be COMPLETE and PLAYABLE
- Sprint 4 (M4) will add polish: more plants, zombies, sound, effects
- Assets still placeholder - acceptable for now
- Focus on gameplay, not graphics
