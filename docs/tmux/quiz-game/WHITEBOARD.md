# Team Whiteboard

**Sprint:** 3
**Goal:** Full Game Loop - Waves, Victory, Question Timing
**Status:** IN PROGRESS

**Sprint 2 COMPLETE** - Boss Accepted
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
| PO   | Ready  | Available for clarifications | 11:29 |
| SM   | Active | Monitoring Sprint 3, IMP-001 | 11:29 |
| GD   | DONE   | Delivered SPRINT3_DESIGN_SPECS.md ✅ | 11:28 |
| TL   | Ready  | Awaiting S3-001 review | 11:28 |
| DEV  | Active | Starting S3-001 Wave System | 11:28 |
| QA   | Ready  | Standing by (smoke test first!) | 11:28 |

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

## Sprint 3 Items

| Item | Owner | Status | Blocker? |
|------|-------|--------|----------|
| S3-001: Wave System | DEV | TODO | - |
| S3-002: Victory Condition | DEV | TODO (needs S3-001) | - |
| S3-003: Question Timing | DEV | TODO (needs S3-001) | - |
| S3-004: Balance Tuning | GD | TODO (needs S3-001, S3-002) | - |

**See:** `SPRINT_BACKLOG.md` for full details

---

## Sprint 2 Summary (COMPLETE)

All 5 items PO ACCEPTED ✅

---

## Blockers

| Role | Blocker | Status |
|------|---------|--------|
| ~~DEV~~ | ~~Need assets from TL~~ | **RESOLVED** - see docs/adr/ASSET_SOURCES.md |
| ~~ALL~~ | ~~Need GD input on game values~~ | **RESOLVED** - see gd/SPRINT1_BALANCE_VALUES.md |
| ~~QA~~ | ~~questions.json 404~~ | **FIXED** - fc81c6b, QA verifying |

**Blocker fixed - QA re-testing**

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
