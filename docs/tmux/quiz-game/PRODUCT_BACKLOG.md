# Product Backlog - Quiz Tower Defense

**Product Owner:** PO
**Last Updated:** 2026-01-01
**Game Style:** Tower Defense (sample clone) + Educational Quiz

---

## Vision

Build a **Tower Defense game** (clone of sample_codes/tower-defence/) with an educational quiz panel. Players earn gold ONLY by answering quiz questions correctly.

**Core Loop:**
- Enemies attack → Player needs towers to defend
- Answer quiz correctly → +30 gold
- Answer wrong → -10 gold
- Build towers with earned gold
- Survive all waves

---

## Reference Project

**IMPORTANT:** This game imitates sample_codes/tower-defence/

All team members should reference this codebase for:
- Tower behaviors
- Enemy behaviors
- Wave progression
- Game mechanics

---

## Completed Sprints

### Sprint 15 (IN PROGRESS)
- ✅ S15-002: Game freeze on restart fix
- ✅ S15-009: HEALER house damage (set to 0)
- ✅ S15-006: Tower icons in React selector
- ✅ S15-010: Expand to 50 Vietnamese history questions

### Sprint 14 (DONE)
- ✅ Lives 20 → 3

### Sprint 13 (DONE)
- ✅ Remove gold display from React
- ✅ Wave countdown timer fix

### Sprint 12 (DONE)
- ✅ Wave auto-progression fix

### Sprint 11 (DONE)
- ✅ PBI-001: Tower behaviors match sample (all 6 types)
- ✅ +10 gold on enemy kill (balance fix)

### Sprint 10 (DONE)
- ✅ Clone sample tower defense as base
- ✅ React quiz panel (30% right side)
- ✅ 70/30 layout (Phaser | React)
- ✅ Gold only from quiz (correct +30, wrong -10)
- ✅ Auto-start waves (10s countdown)
- ✅ Money bridge (React → Phaser)
- ✅ Tower selection in React

---

## Backlog Items

### P0 - Critical (Next Sprint)

#### [BUG-002]: Game Hangs on Restart
**Priority:** P0
**Status:** ✅ HOTFIX (12172b1) - race condition in scene restart
**Estimate:** M

**Description:**
After playing the game and clicking restart, the game hangs/freezes instead of properly restarting. This may be a regression of S15-002 fix or a new issue.

**Previous Related Fix:**
S15-002 attempted to fix game freeze on restart via event listener cleanup.

**Possible Causes:**
- Event listeners not properly cleaned up
- Scene not properly destroyed/restarted
- Managers holding stale references
- Timer/interval not cleared

**Acceptance Criteria:**
- [ ] Game restarts cleanly after defeat
- [ ] Game restarts cleanly after victory
- [ ] No console errors on restart
- [ ] All game state properly reset

**Files to Investigate:**
- `src/scenes/GameScene.js` (scene lifecycle, destroy/create)
- `src/systems/*.js` (manager cleanup)
- `src/systems/QuizManager.js` (event listener cleanup)
- `src/systems/WaveManager.js` (timer cleanup)

---

#### [BUG-001]: Towers Still Targeting HEALER Enemy
**Priority:** P0
**Status:** ✅ FIXED (f4b1269) - case 'HEALER' → 'healer'
**Estimate:** S

**Description:**
HEALER enemy (green circle, appears wave 8) is a support unit that heals other enemies but doesn't attack. Towers should NOT target HEALER - it wastes ammo and prevents killing actual threats, making game unwinnable.

**Root Cause (suspected):**
Case sensitivity mismatch in Tower.js:
- Tower.js checks: `enemy.type === 'HEALER'` (uppercase)
- Enemy type stored as: `'healer'` (lowercase)

**Previous Fix Attempt:**
Commit 4e7f752 added skip logic but used wrong case.

**Acceptance Criteria:**
- [ ] Towers ignore HEALER enemies completely
- [ ] Towers target other enemies while HEALER is in range
- [ ] HEALER walks through to end (does 0 damage - already fixed)
- [ ] Game is winnable on wave 8+

**Files to Check:**
- `src/entities/Tower.js` (lines 109-112, 140-141)
- `src/scenes/GameScene.js` (enemy spawn, check type case)

---

#### [PBI-001]: Tower Behaviors from Sample
**Priority:** P0
**Status:** ✅ DONE (Sprint 11)
**Estimate:** M

**Description:**
Implement different behaviors for each tower type, exactly as in sample_codes/tower-defence/

**Acceptance Criteria:**
- [x] BASIC tower: Standard single-target damage
- [x] AOE tower: Splash damage in radius
- [x] SLOW tower: Slows enemies
- [x] SNIPER tower: High damage, long range, slow fire
- [x] MULTISHOT tower: Hits multiple targets
- [x] SUPPORT tower: Buffs nearby towers

**Reference:** sample_codes/tower-defence/src/entities/Tower.js

---

#### [PBI-NEW]: Wave Auto-Spawn Bug
**Priority:** P0
**Status:** Sprint 12
**Estimate:** S

**Description:**
Wave 2 doesn't spawn automatically after Wave 1 ends. Game progression is broken.

**Acceptance Criteria:**
- [ ] Verify sample wave behavior first
- [ ] All waves spawn automatically after previous wave ends
- [ ] Boss re-test passed

---

#### [PBI-002]: Enemy Behaviors from Sample
**Priority:** P0
**Status:** Ready
**Estimate:** M

**Description:**
Implement different enemy types with unique behaviors from sample.

**Acceptance Criteria:**
- [ ] BASIC enemy: Normal walk
- [ ] FAST enemy: Faster speed
- [ ] ARMORED enemy: Damage reduction
- [ ] FLYING enemy: Different path
- [ ] HEALER enemy: Heals nearby enemies
- [ ] SHIELD enemy: Temporary invulnerability
- [ ] SPLIT enemy: Splits on death
- [ ] TELEPORT enemy: Jumps forward
- [ ] BOSS enemy: High HP, high damage

**Reference:** sample_codes/tower-defence/src/entities/Enemy.js

---

### P1 - High Priority

#### [PBI-003]: Tower Upgrade System
**Priority:** P1
**Status:** Ready (Already in sample clone)
**Estimate:** S (Verify only)

**Description:**
Verify tower upgrade system works correctly from sample clone.

**Acceptance Criteria:**
- [ ] Click tower to show upgrade option
- [ ] Pay gold to upgrade
- [ ] Stats improve with each level
- [ ] Visual change on upgrade

---

#### [PBI-010]: Remove Difficulty Modes
**Priority:** P1
**Status:** New (From Sprint 15)
**Estimate:** S

**Description:**
Boss wants single difficulty mode, not multiple options. Remove difficulty selector.

**Acceptance Criteria:**
- [ ] Remove difficulty selection UI
- [ ] Use single balanced difficulty setting
- [ ] Clean up difficulty-related code

---

#### [PBI-011]: Rebalance Waves
**Priority:** P1
**Status:** New (From Sprint 15)
**Estimate:** M

**Description:**
Rebalance wave progression for better gameplay experience.

**Acceptance Criteria:**
- [ ] Review current wave difficulty curve
- [ ] Adjust enemy counts and types per wave
- [ ] Progressive difficulty (easier early, harder later)
- [ ] Playtest and verify balance

---

#### [PBI-012]: Enemy Hints System
**Priority:** P1
**Status:** New (From Sprint 15)
**Estimate:** M

**Description:**
Show player hints about new enemy types when they first appear. Pause game briefly to explain enemy abilities.

**Acceptance Criteria:**
- [ ] Detect first appearance of each enemy type
- [ ] Pause game and show info popup
- [ ] Explain enemy abilities clearly
- [ ] Player dismisses to continue

---

### P2 - Medium Priority

#### [PBI-005]: Better Assets
**Priority:** P2
**Status:** Ready
**Estimate:** M

**Description:**
Replace placeholder graphics with proper assets from research. Use Kenney TD Top-Down assets.

**Specific Improvements Needed:**
- Background: Nicer grass texture for playable area
- Path: Distinct visual for enemy movement path (dirt/stone road)
- Enemies: Replace zombie sprites with new opponent designs
- Overall: More polished, child-friendly aesthetic

**Reference:** docs/research/GAME_ASSETS.md

---

#### [PBI-006]: Sound Effects
**Priority:** P2
**Status:** Ready
**Estimate:** S

**Description:**
Add sound effects for tower fire, enemy death, etc.

---

#### [PBI-013]: HEALER Health Bar Display
**Priority:** P2
**Status:** New (From Sprint 15)
**Estimate:** S

**Description:**
HEALER enemy health bar not displaying correctly. Visual bug.

**Acceptance Criteria:**
- [ ] Investigate health bar rendering for HEALER enemy
- [ ] Fix health bar position/visibility
- [ ] Test with other special enemy types

---

#### [PBI-014]: Shuffle Quiz Answer Order
**Priority:** P1
**Status:** New
**Estimate:** S

**Description:**
Randomize the order of 4 answers for each question. Same answers, different positions each time. Prevents players from memorizing answer positions.

**Acceptance Criteria:**
- [ ] Shuffle answer array before displaying
- [ ] Track correct answer index after shuffle
- [ ] Same question shows different answer order each time

---

### P1 - High Priority (Epic)

#### [EPIC-001]: AI Document-to-Quiz Pipeline
**Priority:** P1 (Epic - Multiple Sprints)
**Status:** New
**Estimate:** XL (Break into sub-items)

**Description:**
Allow users to upload documents (docs, MD, PDF) and use AI/LLM to automatically generate quiz questions. This enables subject-agnostic gameplay where any educational content can become a quiz.

**Scope:**
- File upload: Support .docx, .md, .pdf formats only
- Reject unsupported formats with clear error message
- AI generates 5-10 questions per page → 50-100 questions per document
- Output: JSON format compatible with existing quiz system
- Deduplication: Prevent reprocessing identical files
- Storage: PostgreSQL database for files, hashes, and generated questions

**Sub-Items (to be refined):**

**[EPIC-001-A]: File Upload & Validation**
- Accept .docx, .md, .pdf only
- Reject other formats with "Format not supported" message
- **v1 Limit: Max 100 pages** - reject files over 100 pages immediately
- Extract text content from each format
- Estimate: M

**[EPIC-001-B]: Deduplication System**
- Content-based check: Compare file bytes before storing
- Hash-based check: SHA-256 hash after upload, skip if duplicate exists
- Both checks required (efficiency + accuracy)
- Estimate: M

**[EPIC-001-C]: PostgreSQL Database Setup**
- Store uploaded files (or references)
- Store file hashes for dedup lookup
- Store generated questions linked to source file
- Estimate: M

**[EPIC-001-D]: AI/LLM Question Generation**
- Parse document page by page → convert all to unified MD format
- **v1 Simplification:** Feed entire text to LLM in one call (not page-by-page)
- Generate 5-10 questions per page worth of content (50-100 total)
- Output JSON format matching `public/assets/data/questions.json`
- Handle rate limiting and API costs
- Estimate: L

**[EPIC-001-E]: Integration with Game**
- Load questions from database instead of static JSON
- Select question set before game starts
- Estimate: S

**Acceptance Criteria:**
- [ ] Upload .docx → generates 50-100 questions
- [ ] Upload .md → generates 50-100 questions
- [ ] Upload .pdf → generates 50-100 questions
- [ ] Upload .txt → shows "Format not supported"
- [ ] Upload 101+ page file → shows "File too large (max 100 pages)"
- [ ] Upload same file twice → skips processing, uses cached questions
- [ ] Questions stored in PostgreSQL
- [ ] Game can load and play with generated questions

**Technical Notes:**
- Use xAI API for question generation
- Skip images in documents (v1 limitation) - text extraction only, no OCR
- Use standard libraries only (pdf-parse, mammoth, markdown-it, etc.)
- Implement async processing for large files
- Add progress indicator for long operations
- **Progressive development:** Start simple (single LLM call), optimize later if needed
- **Reference:** Use `/llm-apps-creator` skill for sample code (LangChain, xAI, tool call, structured output patterns)

---

### P3 - Low Priority (Future)

#### [PBI-007]: Multiple Question Sets
**Priority:** P3
**Status:** New
**Estimate:** S

**Description:**
Support different question JSON files for different subjects.

---

#### [PBI-008]: Vietnamese Language Support
**Priority:** P3
**Status:** New
**Estimate:** S

**Description:**
Full Vietnamese localization.

---

## Sprint 11 Recommendation

**Sprint 11 Goal:** Tower behaviors match sample project

**Items for Sprint 11:**
1. PBI-001: Tower Behaviors from Sample (P0)

**Deliverable:** All 6 tower types have correct unique behaviors

---

## Notes

- Sample code location: `sample_codes/tower-defence/`
- Always reference sample for behavior questions
- Game asset research: `docs/research/GAME_ASSETS.md`
