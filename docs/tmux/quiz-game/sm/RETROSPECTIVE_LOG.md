# Retrospective Log

**Historical record of team retrospectives and lessons learned.**

---

## Sprint 1 Retrospective

**Date:** 2025-12-30
**Duration:** 15 min (Quick)
**Facilitator:** SM

### Active Improvement Check
- **Previous:** N/A - First sprint
- **Status:** N/A
- **Evidence:** N/A

### What Went Well
- TDD approach (72 tests, caught issues early)
- Entity+Manager pattern kept code testable
- Parallel work on S1-004/S1-006 while waiting for reviews
- Clear GD balance values doc helped implementation
- Quick TL reviews kept momentum
- All 5 stories passed QA - zero bugs found
- Console logging helped QA verification
- ADR-001 decisions followed (pea speed, collision, death anim)
- Fast review turnaround - no rework needed

### What Problems Occurred
- tm-send tooling issues early (required full path, then migration to v2)
- Boss feedback: Agents not always reporting back - system stalls
- SM didn't take notes during sprint (no observations logged)

### Selected for Sprint 2 (1 item)
- **ALWAYS REPORT BACK after completing any task**
  - **Problem:** Multi-agent system stalls when agents don't report completion
  - **Action:** Updated all role prompts with ⚠️ CRITICAL section emphasizing report-back
  - **Verification:** SM will monitor during Sprint 2 - check if agents report immediately after task completion

### Not Selected (For Future)
- QA suggestion: Pre-document test criteria in Sprint Backlog (revisit Sprint 3)
- TL suggestion: Add integration tests (scene-level) (revisit Sprint 3)
- TL suggestion: Extract BALANCE constants to single file (revisit Sprint 2 if time)

### Prompt Updates
- Updated `SM_PROMPT.md`: Added "Retrospective Process (3 Phases)" section
- Updated `DEV_PROMPT.md`: Added ⚠️ CRITICAL: ALWAYS REPORT BACK section
- Updated `TL_PROMPT.md`: Added ⚠️ CRITICAL: ALWAYS REPORT BACK section
- Updated `QA_PROMPT.md`: Added ⚠️ CRITICAL: ALWAYS REPORT BACK section
- Updated `GD_PROMPT.md`: Added ⚠️ CRITICAL: ALWAYS REPORT BACK section
- Updated `PO_PROMPT.md`: Added ⚠️ CRITICAL: ALWAYS REPORT BACK section

---

## Sprint 2 Retrospective

**Date:** 2025-12-30
**Duration:** 5 min (Quick - part of Sprint 3)
**Facilitator:** SM

### Active Improvement Check
- **Previous:** IMP-001 - ALWAYS REPORT BACK after completing any task
- **Status:** Effective - Team following consistently
- **Evidence:** OBS-001 through OBS-015 all positive

### What Went Well
- All agents reported back without prompting
- QA found critical bug (404) and team fixed in 2 min
- Clear communication throughout sprint

### What Problems Occurred
- OBS-016: DEV killed server during investigation

### Selected for Sprint 3
- Continue monitoring IMP-001

### Prompt Updates
- None (continuing to monitor)

---

## Sprint 3 Retrospective

**Date:** 2025-12-30
**Duration:** 5 min (Quick)
**Facilitator:** SM

### Active Improvement Check
- **Previous:** IMP-001 - ALWAYS REPORT BACK after completing any task
- **Status:** **EFFECTIVE** - Ready to mark as completed
- **Evidence:** 54 observations, 45+ positive. One violation (OBS-041) addressed immediately.

### What Went Well
- IMP-001 working: DEV, TL, QA, PO all reporting back consistently
- QA smoke test learned from Sprint 2 incident (OBS-021, OBS-030)
- Fast turnaround: S3-005 from commit to Boss acceptance in ~20 min
- Team collaboration on balance issue (GD+TL+QA analysis)
- Boss feedback incorporated quickly

### What Problems Occurred
- OBS-041: DEV committed without reporting (one-time, addressed)
- OBS-032: Balance issue mistaken for bug initially (resolved via collaboration)

### Decision
- **IMP-001 COMPLETED** - Team has internalized "report back" behavior
- Prompts already updated in Sprint 1 - no further changes needed

### Selected for Sprint 4
- No new improvement needed - team is functioning well
- Continue current practices

### Prompt Updates
- None needed

---

## Sprint 4 Retrospective

**Date:** 2025-12-30
**Duration:** 5 min (Quick)
**Facilitator:** SM

### Active Improvement Check
- **Previous:** None (IMP-001 completed Sprint 3)
- **Status:** Team functioning well
- **Evidence:** Smooth sprint execution, all roles reported back consistently

### What Went Well
- Fast sprint: ~35 min from start to Boss acceptance
- Pipeline flowed smoothly: DEV → TL → QA → PO for each item
- DEV worked ahead (started next item while previous in review)
- Test count increased: 214 → 252 (+38 tests)
- New process rule (push at sprint end) followed correctly
- All team members reported back consistently (IMP-001 behavior internalized)

### What Problems Occurred
- Boss found bugs post-acceptance (Wall-nut hang, Level 2 balance)
- These are functional bugs, not process issues

### Decision
- No new improvement needed - team process is solid
- Focus Sprint 5 on fixing bugs

### Prompt Updates
- None needed

---

## Sprint 5 Retrospective

**Date:** 2025-12-30
**Duration:** 3 min (Quick)
**Facilitator:** SM

### Active Improvement Check
- **Previous:** None (IMP-001 completed Sprint 3)
- **Status:** Team functioning well
- **Evidence:** Fast bug fixes, smooth pipeline

### What Went Well
- Very fast sprint: ~17 min
- Both bugs fixed quickly
- GD provided excellent root cause analysis for S5-002
- Pipeline flowed smoothly

### What Problems Occurred
- S5-002 fix (Wave 2 balance) didn't fully resolve difficulty issue
- Boss found more bugs: Wall-nut collision, questions too slow
- Balance tuning is iterative - single fix rarely solves everything

### Decision
- No process improvement needed
- Bug fixes are working correctly through pipeline
- Balance issues require multiple iterations (expected for game dev)

### Prompt Updates
- None needed

---

## Sprint 10 Retrospective

**Date:** 2025-12-31
**Duration:** 15 min (Full - Major pivot sprint)
**Facilitator:** SM

### Active Improvement Check
- **Previous:** QA visual verification (from Sprint 9)
- **Status:** **EFFECTIVE** - QA used screenshot comparison this sprint
- **Evidence:** QA caught visual issues and compared against sample project

### What Went Well
- Major pivot executed successfully (Quiz Battle Arena → Quiz Tower Defense)
- Sample project reference approach worked well
- Event bridge pattern (React↔Phaser) established and working
- Team persisted through multiple rejections until Boss accepted
- QA screenshot comparison with sample project was valuable
- Fast fix turnaround for each rejection

### What Problems Occurred
1. **Multiple rejections before acceptance (5+ iterations)**
   - Layout overflow (canvas dimensions wrong)
   - Money bridge not connected (missing emit event)
   - Auto-start waves missing
   - Tower selection in Phaser (should be React)
   - TowerSelector not rendering (CSS collision + Phaser init wait)

2. **Architecture mistakes**
   - Put tower selection UI in Phaser game grid (should be React)
   - Changed game dimensions from 1280x720 to 896x720 (broke coordinates)
   - React component waited for Phaser init instead of importing data directly

3. **CSS class collision**
   - `.quiz-panel` used in both App.jsx and QuizPanel.jsx

### Key Lessons Learned
1. **Static UI in React, Dynamic in Phaser** - Tower buttons, menus, quiz panel = React. Game grid, physics = Phaser.
2. **Don't change game dimensions** - Keep original 1280x720, use Scale.FIT for containment
3. **React imports data directly** - Don't wait for window.GAME_SETTINGS from Phaser
4. **overflow:hidden + position:relative** - Required for canvas containment in flex layouts
5. **QA screenshot comparison** - Compare our game vs sample project side-by-side

### Selected for Sprint 11
- **Document sample code reference** - Add to team docs that sample_codes/tower-defence/ is our reference
- **Continue QA screenshot comparison** - Effective for visual verification

### Prompt Updates
- Updated `tmux_team_overview.md` with sample project reference (done earlier)
- Updated `QA_PROMPT.md` with mandatory screenshot comparison (done earlier)

### Sprint 10 Commits (8 total)
1. 49bf0e3: Clone + 70/30 layout
2. e3b83f6: Quiz system integration
3. f20be59: Layout overflow fix
4. 4e06b1f: Dimension fix (1280x720)
5. f220819: Money bridge + auto-start waves
6. da8a353: Bottom bar height adjustment
7. d6238b4: Tower selection → React
8. c417ef5: TowerSelector render fix

---

## Sprint 11 Retrospective

**Date:** 2026-01-01
**Duration:** 5 min (Quick)
**Facilitator:** SM

### Active Improvement Check
- **Previous:** Sample code reference + QA screenshot comparison (from Sprint 10)
- **Status:** **EFFECTIVE** - Team verified SLOW tower against sample before fixing
- **Evidence:** TL checked sample when Boss reported SLOW tower issue; confirmed our implementation was correct

### What Went Well
- Tower behaviors already implemented in clone (minimal new work needed)
- **Clarification before fixing saved effort** - SLOW tower reported as bug, but sample verification showed it was correct
- Fast pipeline for +10 gold fix: DEV → TL → QA in ~10 min
- Team reported back consistently (IMP-001 behavior maintained)
- QA visual verification worked despite Phaser gameplay limitations

### What Problems Occurred
1. **SLOW tower confusion** - Boss thought it shouldn't shoot, but sample shows it does
   - Wasted initial investigation time before TL verified against sample
   - Resolution: TL clarified with Boss, issue closed without code change

2. **QA Playwright limitation** - Cannot test Phaser canvas gameplay
   - +10 gold behavior required manual Boss testing
   - Known limitation, documented in Sprint 10

3. **Cache issue after file deletion** - SlowTower.js ghost error
   - DEV created then deleted file; Vite cache kept stale reference
   - Fix: Restart dev server

### Key Lesson
**Verify Boss feedback against sample before implementing fixes.**
- When stakeholder reports behavior as "wrong", first check if sample does the same thing
- This sprint: saved implementing unnecessary SLOW tower "fix"

### Selected for Sprint 12
- **Continue sample-first verification** - Before changing any behavior, verify against sample_codes/tower-defence/
- No prompt updates needed - team already following this pattern

### Prompt Updates
- None needed

### Sprint 11 Commits
1. 5f42535: S11-001 Tower behaviors (AOE/SLOW in CollisionManager)
2. 7fbfe2a: +10 gold on enemy kill fix

---

## Template

```markdown
## Sprint [N] Retrospective

**Date:** YYYY-MM-DD
**Duration:** [X] min (Quick/Full)
**Facilitator:** SM

### Active Improvement Check
- **Previous:** [What we were working on]
- **Status:** Effective / Still monitoring / Not working
- **Evidence:** [Compliance observations]

### What Went Well
-

### What Problems Occurred
-

### Selected for This Sprint (1-2 max)
-

### Not Selected (For Future)
-

### Prompt Updates
-
```
