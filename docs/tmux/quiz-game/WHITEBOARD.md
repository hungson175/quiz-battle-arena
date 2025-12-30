# Team Whiteboard

**Sprint:** 9
**Goal:** Phase 1: Foundation - Config-driven architecture + Base classes
**Status:** **IN PROGRESS** - Sprint 9 execution started

**Sprint 8 COMPLETE** - Boss Approved ✅ (59bcef0)

**Sprint 7 SKIPPED** - Boss directive: buggy, move on
**Sprint 6 COMPLETE** - PO Accepted ✅, Boss found issues

**Sprint 5 COMPLETE** - Boss Accepted ✅ (via PO), Retro Done
**Sprint 4 COMPLETE** - Boss Accepted ✅, Retro Done
**Sprint 3 COMPLETE** - Boss Accepted ✅, Retro Done
**Sprint 2 COMPLETE** - Boss Accepted
**Sprint 1 COMPLETE** - Boss Accepted, Retro Done

---

## Sprint 9 Items (Phase 1: Foundation)

| ID | Item | Owner | Status |
|----|------|-------|--------|
| S9-001 | Create config JSON files (plants, zombies, waves, difficulty) | TL | **COMPLETE** ✓ |
| S9-002 | Implement base Plant class (Phaser.Container) | DEV | **TL APPROVED** ✓ |
| S9-003 | Implement base Zombie class (Phaser.Container) | DEV | **TL APPROVED** ✓ |
| S9-004 | Refactor PlantManager for new pattern | DEV | **TL APPROVED** ✓ |
| S9-005 | Refactor ZombieManager for new pattern | DEV | **TL APPROVED** ✓ |

**Acceptance:** Peashooter, Wallnut, BasicZombie work with new architecture. All tests pass.

**📄 TL SPECS READY:** `docs/team/sprint-9/PHASE1_IMPLEMENTATION_SPEC.md`
- Config files: `public/assets/config/*.json`
- Full implementation details for S9-002 through S9-005
- DEV UNBLOCKED

---

## Sprint 8 Items (COMPLETE)

| ID | Item | Owner | Status |
|----|------|-------|--------|
| S8-001 | Study reference project - Phaser patterns, architecture | TL | **COMPLETE** ✓ |
| S8-002 | Study reference project - Game design, balance, progression | GD | **COMPLETE** ✓ |
| S8-003 | Joint summary of learnings | TL+GD | **COMPLETE** ✓ |
| S8-004 | Formal restructure spec | TL+GD | **COMPLETE** ✓ |

**Reference Project:** `sample_codes/tower-defence/`

**TL Findings:**
1. Config-driven architecture (all balance in JSON)
2. 10 manager classes for separation of concerns
3. Separate GameScene + UIScene (parallel scenes)
4. Entity inheritance (base → specialized subclasses)
5. Robust cleanup patterns

**GD Findings:**
1. Config-driven balance (JSON files)
2. 5 difficulty levels with multipliers
3. 9 enemy types, 6 tower types
4. 10+ waves with gradual progression
5. Lives system (20 lives, not instant loss)

**JOINT RESTRUCTURE PLAN:**
1. Config-driven design (JSON for all balance)
2. Separate GameScene + UIScene + React Quiz
3. Manager-per-entity pattern
4. Entity inheritance for variety
5. Lives system (3-5 lives)
6. Difficulty selector
7. Gradual wave progression

**📄 FORMAL SPEC:** `docs/team/sprint-8/RESTRUCTURE_SPEC.md`
- ✅ GD APPROVED (19:52)
- ✅ PO APPROVED (59bcef0)
- 4-phase implementation plan included
- Acceptance criteria defined
- Awaiting Boss review

---

## Sprint 7 Items (SKIPPED)

| ID | Item | Owner | Status |
|----|------|-------|--------|
| S7-001 | Wall-nut collision bugs (effectiveCol + simultaneous damage) | DEV | **PO ACCEPTED** ✓ (85f3760) |
| S7-002 | Debug UI overlay (zombies per lane + HP) | DEV | **PO ACCEPTED** ✓ (9cf0552) |
| S7-003 | React quiz side-panel (70/30 layout) | DEV+TL | **PO ACCEPTED** ✓ (6c59bba) |

---

## Sprint 6 Items (COMPLETE)

| ID | Item | Owner | Status |
|----|------|-------|--------|
| S6-001 | Wall-nut must BLOCK zombies | DEV | **PO ACCEPTED** ✓ (869a25d) |
| S6-002 | Faster question intervals | DEV+GD | **PO ACCEPTED** ✓ (39a8bdc) |
| S6-003 | Level balance - make beatable | DEV+GD | **PO ACCEPTED** ✓ (39a8bdc) |

---

## GD Analysis (Sprint 7) - ROOT CAUSE FOUND

**Level 2 Unbeatable: UX PROBLEM, NOT NUMBERS**
- Quiz appears → Player can't see game
- Zombies KEEP MOVING during quiz
- Player returns → Zombies too close → DEATH
- Wave config [2,3,4,6,8] is FINE if quiz doesn't interrupt

**Wall-nut Dies Instantly: HP TOO LOW**
- Current: HP 20, Zombie DPS 2
- 3 zombies pile up → 20/6 = 3.3s death
- FIX: HP 20 → 40 (gives 6.6s with 3 zombies)

**Quiz UX Options:**
| Option | Description | Complexity |
|--------|-------------|------------|
| A | Pause game during quiz | Simple |
| B | Quiz between waves only | Medium |
| C | Side-panel React quiz (Boss pref) | Complex |

**GD RECOMMENDATION:** Option A immediate, Option C long-term

---

## TL Technical Analysis (Sprint 7)

**Wall-nut Instant Death - 2 CODE BUGS:**
1. effectiveCol calculation triggers early
2. ALL zombies damage Wall-nut simultaneously (3x damage)

**Debug Overlay:** ~30 min effort

**React Quiz Architecture:**
- Side-by-side: Game 70% left, Quiz 30% right
- Phaser emits events → React listens
- Effort: ~1 day

**TL + GD ALIGNED:** UX is the root cause, not balance numbers

---

## Boss Feedback for Sprint 7 (CRITICAL)

| Priority | Issue | Description |
|----------|-------|-------------|
| **BUG** | Level 2 STILL unbeatable | S6-003 fix insufficient - seems like a bug |
| **BUG** | Wall-nut dies instantly | Useless - dies on touch |
| **DEBUG** | Add debug UI overlay | Show zombies per lane/column + HP for each zombie |
| **DESIGN** | Questions obscure gameplay | Zombies move while question shows |
| **DESIGN** | Quiz should NOT overlap game | Use REACT for questions (separate from Phaser) |
| **DESIGN** | Quiz in separate place | Don't mix with gameplay |

**REQUIRED:** TL + GD full review before implementation. Design too sloppy.

---

## Sprint 4 Summary (COMPLETE)

All 3 items Boss Accepted ✅

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
| PO   | Reviewing | RESTRUCTURE_SPEC approval | 19:52 |
| SM   | Active | Sprint 8 coordination | 19:52 |
| GD   | Done | Joint restructure spec | 19:50 |
| TL   | Done | RESTRUCTURE_SPEC complete | 19:52 |
| DEV  | Standby | Awaiting Phase 1 tasks | 19:52 |
| QA   | Standby | Awaiting implementation | 19:52 |

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
