# Team Whiteboard

**Sprint:** 4
**Goal:** Game Balance + Plant Variety
**Status:** IN PROGRESS - DEV implementing

**Sprint 3 COMPLETE** - Boss Accepted ✅, Retro Done
**Sprint 2 COMPLETE** - Boss Accepted
**Sprint 1 COMPLETE** - Boss Accepted, Retro Done

---

## Sprint 4 Items

| ID | Item | Owner | Status |
|----|------|-------|--------|
| S4-001 | Peashooter cost 100→75 | DEV | **PO ACCEPTED** ✅ |
| S4-002 | Wall-nut plant (cost 50, HP 20) + Selection UI | DEV | **QA PASSED** ✅ (28507ae) |
| S4-003 | Remove QuizTimer | DEV | **IN PROGRESS** |

**IMP-001 COMPLETED** - Team internalized report-back behavior

---

## PO Decisions Made - Sprint 2/3

| Decision | Choice |
|----------|--------|
| Correct answer | +50 money |
| Wrong answer | -30 money (HARSH) |
| Starting money | 200 (updated S3-004 v2) |
| Quiz UI | Phaser native |
| Zombie HP | 8 (updated S3-004) |
| Plant cost | 100 (allows 2 plants at start) |

---

## Current Status

| Role | Status | Current Task | Last Update |
|------|--------|--------------|-------------|
| PO   | Monitoring | Sprint 4 in progress | 14:15 |
| SM   | Active | Monitoring Sprint 4 execution | 14:21 |
| GD   | Standby | Available for design questions | 14:16 |
| TL   | Done | S4-002 APPROVED | 14:37 |
| DEV  | Working | S4-003 Remove QuizTimer | 14:35 |
| QA   | Testing | S4-002 Wall-nut + UI | 14:37 |

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

| Item | Owner | Status | Notes |
|------|-------|--------|-------|
| S3-001: Wave System | DEV | **PO ACCEPTED** ✅ | 5 waves, progressive difficulty |
| S3-002: Victory Condition | DEV | **PO ACCEPTED** ✅ | Stats display with 7 metrics |
| S3-003: Question Timing | DEV | **PO ACCEPTED** ✅ | 12s countdown |
| S3-004: Balance Tuning | GD | **PO ACCEPTED** ✅ | HP 8, Money 200, Plant 100 |
| S3-005: Money 200 | DEV | **PO ACCEPTED** ✅ | Allows 2 plants at start |

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
| ~~QA~~ | ~~questions.json 404~~ | **FIXED** - fc81c6b |
| ~~QA~~ | ~~Zombie HP/death logic broken~~ | **NOT A BUG** - Balance issue |
| ~~S3-004~~ | ~~Balance tuning: HP 10→8, Money 100→150~~ | **COMMITTED** bdb2b49 |
| ~~S3-004 v2~~ | ~~Money 150→200 (2 plants at start)~~ | **COMMITTED** 4d2c632, TL REVIEWING |

**BALANCE STATUS:**
- ✅ HP 10→8 (bdb2b49) - QA PASSED
- ✅ Money 150→200 (4d2c632) - QA PASSED
- ✅ All balance values verified by QA

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
| S3-001 | 0888673 | 11:38 | **PO ACCEPTED** ✅ |
| S3-002 | 92d0acf | 11:47 | **PO ACCEPTED** ✅ |
| S3-003 | 8b18b30 | 12:08 | **PO ACCEPTED** ✅ |
| S3-004 | bdb2b49 | 13:05 | **PO ACCEPTED** ✅ |
| S3-005 | 4d2c632 | 13:35 | **PO ACCEPTED** ✅ |

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
