# Sprint 2 Backlog

**Sprint Goal:** Quiz Integration - Earn money by answering questions
**Sprint Start:** 2025-12-30
**Sprint End:** TBD

---

## Sprint Scope

Add quiz mechanics to the tower defense:
- Questions appear during gameplay
- Correct answer = earn money
- Wrong answer = lose money (PUNISHING)
- Money required to buy plants

**Core differentiator:** Learning through frustration - wrong answers hurt!

---

## PO Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Correct answer | +50 money | Reward for learning |
| Wrong answer | -30 money | HARSH punishment |
| Starting money | 100 | Just enough for 2 plants |
| Quiz UI | Phaser native | TL decided in ADR-001 |

---

## Sprint Items

### [S2-001]: Money System
**Owner:** DEV
**Status:** TODO
**Priority:** FIRST - Foundation for quiz mechanics

**Tasks:**
- [ ] Create MoneyManager utility
- [ ] Display money counter in game UI
- [ ] Plants require money to place
- [ ] Cannot place plant if insufficient money
- [ ] Starting money: 100

**Acceptance Criteria:**
- [ ] Money counter visible on screen
- [ ] Plant placement checks money
- [ ] Money deducted when plant placed
- [ ] Clear feedback when can't afford

---

### [S2-002]: Question Loading from JSON
**Owner:** DEV
**Status:** TODO
**Depends On:** None (can parallel with S2-001)

**Tasks:**
- [ ] Create QuestionManager utility
- [ ] Load questions from JSON file
- [ ] Support Vietnamese text
- [ ] Shuffle/randomize questions
- [ ] Track answered questions

**Acceptance Criteria:**
- [ ] Questions load from `src/assets/data/questions.json`
- [ ] Vietnamese displays correctly
- [ ] No repeat questions until pool exhausted
- [ ] Graceful handling when questions run out

**Note:** Need to create sample questions JSON (use Claude or manually)

---

### [S2-003]: Question Display UI
**Owner:** DEV
**Status:** TODO
**Depends On:** S2-002

**Tasks:**
- [ ] Create QuizPanel Phaser container
- [ ] Display question text (Vietnamese support)
- [ ] 4 answer buttons
- [ ] Visual styling (readable, game-feel)
- [ ] Panel appears/disappears smoothly

**Acceptance Criteria:**
- [ ] Question panel displays over game
- [ ] 4 clickable answer options
- [ ] Clear, readable typography
- [ ] Smooth show/hide animation

---

### [S2-004]: Quiz-for-Money Mechanic
**Owner:** DEV
**Status:** TODO
**Depends On:** S2-001, S2-002, S2-003

**Tasks:**
- [ ] Trigger question at intervals (every 10-15 seconds)
- [ ] Game pauses or slows when question appears
- [ ] Correct answer: +50 money, success feedback
- [ ] Wrong answer: -30 money, failure feedback
- [ ] Visual/audio feedback for both outcomes

**Acceptance Criteria:**
- [ ] Questions appear periodically during gameplay
- [ ] Correct = +50 money with green flash/sound
- [ ] Wrong = -30 money with red flash/sound
- [ ] Money can go to 0 or negative (can't buy plants)
- [ ] Game resumes after answering

**Design Intent:** FRUSTRATING - wrong answers should hurt badly!

---

### [S2-005]: Sample Questions JSON
**Owner:** GD (with TL support)
**Status:** TODO
**Depends On:** None

**Tasks:**
- [ ] Create 30-50 Vietnamese history questions
- [ ] Based on outline in `data/output/DC_lichsu.md`
- [ ] Format: question, 4 answers, correct index, explanation
- [ ] Mix of difficulty levels

**Acceptance Criteria:**
- [ ] Valid JSON file at `src/assets/data/questions.json`
- [ ] 30+ questions minimum
- [ ] All Vietnamese text correct
- [ ] Variety of topics from outline

**Note:** Can use Claude to generate from outline

---

## Definition of Done (Sprint Level)

- [ ] All items completed
- [ ] TL code review passed
- [ ] QA black-box testing passed
- [ ] Game runs without errors (`npm run dev`)
- [ ] Tests pass (`npm test`)
- [ ] PO accepts demo

---

## Progress Tracking

| Item | Status | Owner | Notes |
|------|--------|-------|-------|
| S2-001 | TODO | DEV | Money system |
| S2-002 | TODO | DEV | Question loading |
| S2-003 | TODO | DEV | Quiz UI |
| S2-004 | TODO | DEV | Quiz mechanics |
| S2-005 | TODO | GD | Sample questions |

---

## Dependencies

```
S2-001 (Money) ─────────────────┐
                                 │
S2-002 (Question Loading) ──────┼──> S2-004 (Quiz Mechanic)
                                 │
S2-003 (Quiz UI) ───────────────┘
       │
       └── Depends on S2-002

S2-005 (Questions JSON) ── Independent, GD can work in parallel
```

---

## Notes

- ADR-001 decided: Use Phaser UI (not React) for quiz panel
- Questions appear every 10-15 seconds (GD to tune)
- Wrong answer penalty is HARSH by design (-30 vs +50)
- Vietnamese text support required
