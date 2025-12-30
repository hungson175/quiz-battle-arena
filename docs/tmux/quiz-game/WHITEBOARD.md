# Team Whiteboard

**Sprint:** 2
**Goal:** Quiz Integration - Earn sun by answering questions
**Status:** IN PROGRESS

**Sprint 1 COMPLETE** - Boss Accepted, Retro Done
**Active Improvement (IMP-001):** ALWAYS REPORT BACK after completing any task

---

## PO Decisions Made - Sprint 2

| Decision | Choice |
|----------|--------|
| Correct answer | +50 money |
| Wrong answer | -30 money (HARSH) |
| Starting money | 100 |
| Quiz UI | Phaser native |

---

## Current Status

| Role | Status | Current Task | Last Update |
|------|--------|--------------|-------------|
| PO   | Active | Awaiting QA re-test | 10:57 |
| SM   | Active | Coordinating hotfix review | 10:57 |
| GD   | DONE   | S2-005: COMPLETE (35 questions) | 10:30 |
| TL   | Active | Reviewing hotfix fc81c6b | 10:57 |
| DEV  | DONE   | Hotfix fc81c6b committed | 10:57 |
| QA   | Waiting | Awaiting TL review for re-test | 10:57 |

---

## Research Tasks (Before Implementation)

### TL - Technical Research

**Watch:** Search YouTube for "Phaser 3 tower defense tutorial" or "Phaser PvZ clone"

**Research Items:**
1. Phaser 3 sprite sheets and animations
2. Phaser arcade physics for collision
3. Grid-based game in Phaser
4. Free PvZ-style sprite packs (itch.io, opengameart.org)

**Decide:**
- Phaser UI vs React overlay for quiz display (M2)

---

### GD - Game Design Research

**Watch:** Search YouTube for "Plants vs Zombies game design analysis" or "PvZ GDC talk"

**Recommended:**
- "Why Plants vs Zombies Works" analysis videos
- PvZ balance and difficulty curve discussions

**Research Items:**
1. Core PvZ mechanics breakdown
2. What makes PvZ "feel good"
3. Difficulty curve - how to make it HARD but fair
4. Lane-based tower defense balance

**Provide Input On:**
- Zombie walk speed
- Peashooter fire rate
- Damage values (pea damage, zombie HP)
- Spawn rate for zombies

---

## Sprint 2 Items

| Item | Owner | Status | Blocker? |
|------|-------|--------|----------|
| S2-001: Money System | DEV | **TL APPROVED** ✅ | Ready for QA |
| S2-002: Question Loading | DEV | **TL APPROVED** ✅ | Ready for QA |
| S2-003: Quiz UI | DEV | **TL APPROVED** ✅ | c4b404f - 25 tests |
| S2-004: Quiz Mechanic | DEV | **TL APPROVED** ✅ | c4b404f |
| S2-005: Sample Questions | GD | **DONE** ✅ | 35 questions ready |

**See:** `SPRINT_BACKLOG.md` for full details

---

## Blockers

| Role | Blocker | Status |
|------|---------|--------|
| ~~DEV~~ | ~~Need assets from TL~~ | **RESOLVED** - see docs/adr/ASSET_SOURCES.md |
| ~~ALL~~ | ~~Need GD input on game values~~ | **RESOLVED** - see gd/SPRINT1_BALANCE_VALUES.md |
| QA | questions.json 404 - returns HTML not JSON | **ACTIVE** - DEV fixing |

**⚠️ ACTIVE BLOCKER: questions.json path/loading issue**

---

## TL Review Tracking

| Story | Commit | Date | Status |
|-------|--------|------|--------|
| S1-002 | 19da01e | 02:37 | **APPROVED** - QA Passed, PO Accepted |
| S1-003 | f9aa0a8 | 08:47 | **APPROVED** - QA Passed, PO Accepted |
| S2-001 | c4b404f | 10:35 | **APPROVED** - Ready for QA |
| S2-002 | c4b404f | 10:35 | **APPROVED** - Ready for QA |
| S2-003 | c4b404f | 10:50 | **APPROVED** - Ready for QA |
| S2-004 | c4b404f | 10:50 | **APPROVED** - Ready for QA |

---

## Asset Sources to Check

- **itch.io** - Search "zombie sprites", "plant sprites", "tower defense assets"
- **opengameart.org** - Free CC0 game assets
- **kenney.nl** - Free game assets (might have suitable sprites)
- **craftpix.net** - Some free packs

**DO NOT create sprites from scratch** - find existing ones.

---

## Quick Links

| Doc | Purpose |
|-----|---------|
| `SPRINT_BACKLOG.md` | Sprint 1 detailed tasks |
| `PRODUCT_BACKLOG.md` | Full backlog with M1-M5 |
| `docs/product/prd.md` | Product requirements |

---

## Notes

- Progressive development: M1 = playable tower defense, M2 = add quiz
- Port: 3336
- Sprint 1 has NO quiz - focus on core mechanics
- Player gets unlimited money in M1 to test plant placement
