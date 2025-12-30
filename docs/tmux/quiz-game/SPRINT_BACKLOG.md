# Sprint 4 Backlog

**Sprint Goal:** Game Balance + Plant Variety
**Sprint Start:** 2025-12-30
**Sprint End:** TBD

---

## Sprint Scope

Make the game HARD but WINNABLE, add defensive plant option:
- Rebalance waves so game is challenging but beatable
- Add Wall-nut defensive plant (cheap at 50 gold)
- Remove question timer (zombies moving = natural pressure)

**Design Intent:** Players should fail 2-3 times but feel they CAN win with better strategy!

---

## PO Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Wall-nut cost | 50 gold | Cheap defensive option |
| Peashooter cost | 100 gold | Offensive plants more expensive |
| Question timer | REMOVE | Zombies moving = natural pressure |
| Balance target | Wave 2 beatable | Currently impossible |

---

## Sprint Items

### [S4-001]: Game Balance Fix
**Owner:** GD (design) → DEV (implement)
**Status:** TODO
**Priority:** HIGH - Critical for playability

**Problem:** Wave 2 is currently impossible to win.

**Tasks:**
- [ ] GD: Analyze current balance values
- [ ] GD: Recommend new values (spawn rate, zombie count, etc.)
- [ ] DEV: Implement balance changes
- [ ] Test: Verify game is hard but winnable

**Acceptance Criteria:**
- [ ] Wave 2 is beatable with good strategy
- [ ] All 5 waves are beatable (hard but possible)
- [ ] Players fail 2-3 times before winning (learning curve)
- [ ] Game still feels challenging

---

### [S4-002]: Wall-nut Defensive Plant
**Owner:** DEV
**Status:** TODO
**Priority:** HIGH - Adds strategic depth

**Description:**
Add Wall-nut plant that blocks zombies. Cheap alternative to Peashooter.

**Tasks:**
- [ ] Create Wall-nut entity (high HP, no attack)
- [ ] Add Wall-nut to plant selection UI
- [ ] Set cost to 50 gold
- [ ] Wall-nut blocks zombies (zombies attack it)
- [ ] Visual feedback when Wall-nut takes damage
- [ ] Wall-nut dies when HP depleted

**Acceptance Criteria:**
- [ ] Wall-nut placeable on grid
- [ ] Costs 50 gold
- [ ] Blocks zombies (they stop and attack it)
- [ ] Has HP and can be destroyed
- [ ] Player can place multiple Wall-nuts

**Balance Suggestion (GD to confirm):**
- Wall-nut HP: 20-30 (survives 3-4 zombie hits)
- Zombie damage per hit: 5-8

---

### [S4-003]: Remove Question Timer
**Owner:** DEV
**Status:** TODO
**Priority:** LOW - Simple change

**Description:**
Remove the 12-second countdown timer from questions. Zombies moving during questions provides natural pressure.

**Tasks:**
- [ ] Remove countdown timer from QuizUI
- [ ] Remove timeout logic (no auto-wrong on timeout)
- [ ] Keep question appearing during gameplay
- [ ] Update tests

**Acceptance Criteria:**
- [ ] No timer shown on questions
- [ ] Player can take time to answer
- [ ] Zombies still move during questions (natural pressure)
- [ ] No timeout penalty

---

## Definition of Done (Sprint Level)

- [ ] All items completed
- [ ] TL code review passed
- [ ] QA black-box testing passed
- [ ] Game runs without errors (`npm run dev`)
- [ ] Tests pass (`npm test`)
- [ ] PO accepts demo
- [ ] Game is winnable (all 5 waves)

---

## Progress Tracking

| Item | Status | Owner | Notes |
|------|--------|-------|-------|
| S4-001 | TODO | GD→DEV | Balance fix |
| S4-002 | TODO | DEV | Wall-nut plant |
| S4-003 | TODO | DEV | Remove timer |

---

## Dependencies

```
S4-001 (Balance) ──> Must be done first to test winnability
S4-002 (Wall-nut) ──> Can be parallel with S4-001
S4-003 (Timer) ──> Independent, can be done anytime
```

---

## Notes

- Focus on balance FIRST - game must be winnable
- Wall-nut adds strategic depth without complexity
- Timer removal simplifies gameplay
- After Sprint 4: Consider sound effects, more plants (M4 polish)
