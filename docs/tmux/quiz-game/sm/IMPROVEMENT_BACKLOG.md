# Improvement Backlog

**SM maintains this file during sprints.**

---

## Active Improvement

*Currently being monitored and enforced by SM.*

| ID | Description | Started Sprint | Evidence |
|----|-------------|----------------|----------|
| IMP-002 | TL must write Technical Spec BEFORE DEV implements | Sprint 7 | Prompts updated - monitoring compliance |

**IMP-002 Details:**
- TL writes spec with Acceptance Criteria
- DEV uses spec for TDD tests
- QA uses spec for black-box testing
- No spec = no implementation allowed

---

## Observed (Log During Sprint)

*SM logs issues here during sprint. Address at retrospective.*

| ID | Observation | Sprint | Source | Impact |
|----|-------------|--------|--------|--------|
| OBS-001 | ✅ POSITIVE: All agents (TL, DEV, QA) explicitly acknowledged IMP-001 at sprint start | 2 | SM | High - Good compliance |
| OBS-002 | ✅ POSITIVE: DEV reported progress without being asked (S2-001/S2-002 done, 29 tests) | 2 | SM | High - IMP-001 working |
| OBS-003 | ✅ POSITIVE: GD reported S2-005 completion with full details (35 questions, topics, format) | 2 | SM | High - IMP-001 working |
| OBS-004 | ✅ POSITIVE: TL reported detailed review results (S2-001/S2-002 APPROVED with summary) | 2 | SM | High - IMP-001 working |
| OBS-005 | ✅ POSITIVE: QA asked for test criteria before starting (good practice) | 2 | SM | Med - Proactive communication |
| OBS-006 | ✅ POSITIVE: QA reported clear PARTIAL/BLOCKED results with reasoning (dependency awareness) | 2 | SM | High - IMP-001 + Good process |
| OBS-007 | ✅ POSITIVE: DEV reported S2-003+S2-004 completion with commit hash, test count, details | 2 | SM | High - IMP-001 working |
| OBS-008 | ✅ POSITIVE: TL reported detailed S2-003/S2-004 review with architecture notes | 2 | SM | High - IMP-001 working |
| OBS-009 | ✅ POSITIVE: QA found critical bug (questions.json 404) with clear error, impact, what works | 2 | SM | High - QA process working |
| OBS-010 | ✅ POSITIVE: TL proactively identified root cause + fix options for QA bug | 2 | SM | High - Collaboration |
| OBS-011 | ✅ POSITIVE: DEV fixed bug in ~2 min, reported with commit hash (fc81c6b) | 2 | SM | High - IMP-001 + Fast response |
| OBS-012 | ✅ POSITIVE: DEV completed P3 cleanup proactively, reported with commit (0a651f5) | 2 | SM | Med - IMP-001 + Good housekeeping |
| OBS-013 | ✅ POSITIVE: QA reported comprehensive pass results with all items verified | 2 | SM | High - IMP-001 working |
| OBS-014 | ✅ RESOLVED: Game loading issue was browser cache on Boss's side - QA verified working | 2 | SM | Med - False alarm |
| OBS-015 | ✅ POSITIVE: QA quickly re-verified with screenshot evidence when issue reported | 2 | SM | High - Fast response |
| OBS-016 | ⚠️ ISSUE: DEV killed server during investigation - caused second outage | 2 | SM | Med - Process gap |
| OBS-017 | ✅ POSITIVE: QA accepted smoke test reminder for Sprint 3 - learning from incident | 3 | SM | High - Process improvement |
| OBS-018 | ✅ POSITIVE: GD proactively delivered SPRINT3_DESIGN_SPECS.md without being asked | 3 | SM | High - IMP-001 + Initiative |
| OBS-019 | ✅ POSITIVE: DEV completed S3-001 quickly (7 min), reported with commit + test count | 3 | SM | High - IMP-001 working |
| OBS-020 | ✅ POSITIVE: TL detailed review of S3-001 with architecture notes (178 tests) | 3 | SM | High - IMP-001 working |
| OBS-021 | ✅ POSITIVE: QA explicitly confirmed "SMOKE TEST FIRST" before testing | 3 | SM | High - Learning applied |
| OBS-022 | ✅ POSITIVE: DEV completed S3-002 quickly, detailed report with 7 metrics list | 3 | SM | High - IMP-001 working |
| OBS-023 | ✅ POSITIVE: TL reviewed S3-002 in ~2 min with detailed architecture notes | 3 | SM | High - IMP-001 working |
| OBS-024 | ✅ POSITIVE: QA acknowledged S3-002 queued, continuing S3-001 systematically | 3 | SM | Med - Good process |
| OBS-025 | ✅ POSITIVE: DEV completed S3-003 with 36 tests, ALL dev items done, detailed report | 3 | SM | High - IMP-001 working |
| OBS-026 | ✅ POSITIVE: QA provided structured partial results (verified vs needs verification) | 3 | SM | High - Good process |
| OBS-027 | ✅ POSITIVE: TL clarified wave progression logic for QA (kills required, not just spawns) | 3 | SM | High - Collaboration |
| OBS-028 | ✅ POSITIVE: TL approved S3-003 with detailed architecture notes (214 tests total) | 3 | SM | High - IMP-001 working |
| OBS-029 | ✅ RESOLVED: Voice feedback too noisy - fixed hook to PO-only (was all roles) | 3 | SM | High - Config fix |
| OBS-030 | ✅ POSITIVE: QA confirmed "smoke test first" before integration testing | 3 | SM | High - Learning applied |
| OBS-031 | ✅ POSITIVE: QA comprehensive integration report with clear PASS/BLOCKED/ISSUE | 3 | SM | High - Good process |
| OBS-032 | ⚠️ BUG: Plants not killing zombies - wave stuck at 1/5 (QA found) | 3 | SM | Critical - Blocking S3-001/S3-002 |
| OBS-033 | ✅ POSITIVE: TL immediately started investigating upon escalation | 3 | SM | High - Fast response |
| OBS-034 | ✅ POSITIVE: TL detailed root cause analysis (lane mismatch theory) with test plan | 3 | SM | High - IMP-001 working |
| OBS-035 | ✅ POSITIVE: DEV added comprehensive debug logging for QA investigation | 3 | SM | High - IMP-001 + Collaboration |
| OBS-036 | ✅ POSITIVE: QA found root cause via debug analysis (zombie HP/death broken) | 3 | SM | Critical - Unblocks S3-001/S3-002 |
| OBS-037 | ✅ POSITIVE: QA HP tracking revealed HP reduction WORKS - not a bug, likely balance | 3 | SM | High - Shifts from bug to balance |
| OBS-038 | ✅ POSITIVE: TL math analysis confirmed balance issue (15s to kill with quiz pauses) | 3 | SM | High - IMP-001 working |
| OBS-039 | ✅ POSITIVE: GD provided refined combo fix (HP 10→8 + money 150) - rewards studying | 3 | SM | High - Good design |
| OBS-040 | ✅ POSITIVE: PO revised decision based on GD+TL expertise - "Trust the experts" | 3 | SM | High - Good process |
| OBS-041 | ⚠️ ISSUE: DEV committed balance fix (bdb2b49) but DIDN'T REPORT BACK - team stalled | 3 | SM | High - IMP-001 violation |
| OBS-042 | ⚠️ ISSUE: SM had to check git log manually to discover commit - process gap | 3 | SM | Med - SM should monitor proactively |
| OBS-043 | 💡 IMPROVEMENT: SM should include "Report back when done" in EVERY task message | 3 | Boss | High - Proactive coaching |
| OBS-044 | ✅ POSITIVE: TL approved S3-004 with detailed technical notes (kill time math) | 3 | SM | High - IMP-001 working |
| OBS-045 | ✅ FIX: Updated DEV_PROMPT.md with prompting best practices (XML tags, WHY, examples) | 3 | SM | High - Systemic fix |
| OBS-046 | ✅ POSITIVE: QA verified zombie death works + identified next balance issue (money) | 3 | SM | High - Good testing |
| OBS-047 | ✅ POSITIVE: TL provided detailed economy analysis with 4 options | 3 | SM | High - IMP-001 working |
| OBS-048 | ✅ POSITIVE: GD quick recommendation (Option B: 200 starting) with rationale | 3 | SM | High - IMP-001 working |
| OBS-049 | ✅ POSITIVE: DEV reported S3-005 completion with commit, test count, details | 3 | SM | High - IMP-001 working |
| OBS-050 | ✅ POSITIVE: TL fast review of S3-005 (~1 min) with clear APPROVED status | 3 | SM | High - IMP-001 working |
| OBS-051 | ✅ POSITIVE: QA comprehensive report - smoke test, unit tests, all S3 items verified | 3 | SM | High - IMP-001 + Good process |
| OBS-052 | ✅ POSITIVE: PO accepted all S3 items, updated WHITEBOARD proactively | 3 | SM | High - IMP-001 working |
| OBS-053 | ✅ POSITIVE: Boss provided detailed Sprint 4 feedback (balance, new plant, timer) | 3 | Boss | High - Clear direction |
| OBS-054 | ✅ POSITIVE: PO relayed all Boss feedback with WHITEBOARD updates | 3 | SM | High - IMP-001 working |
| OBS-055 | ✅ PROCESS: Boss directive - push to remote at end of each sprint (prevents code loss) | 4 | Boss | High - Added to DoD |
| OBS-056 | ✅ POSITIVE: Sprint 4 kickoff smooth - all roles acknowledged and ready | 4 | SM | Med - Good coordination |
| OBS-057 | ✅ POSITIVE: GD delivered comprehensive S6-002/S6-003 analysis in ~5 min | 6 | SM | High - Fast turnaround |
| OBS-058 | ✅ POSITIVE: QA acknowledged sprint start, confirmed understanding of items | 6 | SM | Med - Good communication |
| OBS-059 | ✅ POSITIVE: DEV fixed S6-001 quickly with clear root cause explanation | 6 | SM | High - Fast bug fix |
| OBS-060 | ✅ POSITIVE: PO decided quickly on GD recommendations (~2 min) | 6 | SM | High - Fast decisions |
| OBS-061 | ✅ POSITIVE: TL fast review of S6-001 with clear approval | 6 | SM | High - Fast turnaround |
| OBS-062 | ✅ POSITIVE: QA caught test failures, correctly identified as S6-002/S6-003 values | 6 | SM | High - Good analysis |
| OBS-063 | ✅ POSITIVE: DEV fixed tests quickly after QA feedback (~1 min) | 6 | SM | High - Fast response |
| OBS-064 | ✅ POSITIVE: TL approved S6-002/S6-003 with verification against GD specs | 6 | SM | High - Thorough review |
| OBS-065 | ✅ POSITIVE: QA comprehensive re-test with all 3 items verified | 6 | SM | High - Good coverage |
| OBS-066 | ✅ POSITIVE: Sprint 6 completed in ~17 min (fast turnaround) | 6 | SM | High - Efficient sprint |
| OBS-067 | ✅ POSITIVE: PO accepted all items quickly after QA pass | 6 | SM | High - Good pipeline |
| OBS-068 | ⚠️ ISSUE: Boss found Level 2 STILL unbeatable despite S6-003 balance fix | 6 | Boss | Critical - Bug persists |
| OBS-069 | ⚠️ ISSUE: Wall-nut dies instantly - S6-001 may have DPS bug | 6 | Boss | Critical - Feature broken |
| OBS-070 | 💡 DESIGN: Boss wants quiz separated from game (React, not Phaser overlay) | 6 | Boss | Major - Architecture change |
| OBS-071 | ✅ POSITIVE: GD excellent root cause - Level 2 is UX problem (zombies move during quiz), not numbers | 7 | SM | Critical - Shifts focus to UX fix |
| OBS-072 | ✅ POSITIVE: GD identified Wall-nut HP 20→40 fix with clear math | 7 | SM | High - Clear solution |
| OBS-073 | ✅ POSITIVE: TL found 2 code bugs in Wall-nut (effectiveCol + simultaneous damage) | 7 | SM | High - Root cause found |
| OBS-074 | ✅ POSITIVE: TL + GD analysis aligned - UX is root cause, not balance | 7 | SM | High - Clear direction |
| OBS-075 | ✅ POSITIVE: QA acknowledged Sprint 7 items promptly | 7 | SM | Med - Good communication |
| OBS-076 | ✅ POSITIVE: TL proactively sent S7-003 architecture guidance to DEV | 7 | SM | High - Good collaboration |
| OBS-077 | ⚠️ PROCESS GAP: TL gives verbal guidance to DEV but NO WRITTEN SPEC | 7 | Boss | CRITICAL - No spec = no TDD basis, no QA test criteria |
| OBS-078 | 💡 IMP-002: TL must write Technical Spec BEFORE DEV implements - serves as TDD + QA basis | 7 | Boss | CRITICAL - Process update needed |
| OBS-079 | ✅ POSITIVE: IMP-002 first use - TL wrote S7-003 spec with 8 Acceptance Criteria | 7 | SM | High - New process working |
| OBS-080 | 💡 PROCESS: Sprint docs should be in docs/team/sprint-N/ folders (not scattered) | 7 | Boss | Med - Organization improvement |
| OBS-081 | 📋 RETRO TASK: After Sprint 7 retro, move ALL scattered docs to corresponding sprint folders (Sprint 1-7) | 7 | Boss | Med - Cleanup before Sprint 8 |
| OBS-082 | ✅ POSITIVE: IMP-002 full cycle success - S7-003 spec → DEV TDD → TL review against spec → QA test against spec | 7 | SM | High - Process validated |
| OBS-083 | ✅ POSITIVE: QA verified all 8 Acceptance Criteria from spec - spec served as test checklist | 7 | SM | High - IMP-002 working |
| OBS-084 | ⚠️ CRITICAL BUG: S7-003 passed QA but game not rendering in Boss review - Phaser empty | 7 | Boss | CRITICAL - QA missed visual rendering |
| OBS-085 | ✅ FIX: React StrictMode caused double Phaser mount - removed StrictMode + added guard (313b76d) | 7 | DEV | High - Fast hotfix |
| OBS-086 | ⚠️ DECISION: Sprint 7 SKIPPED - Boss directive due to persistent bugs. Moving to Sprint 8 (restructure) | 7 | Boss | Critical - Major pivot |
| OBS-087 | 💡 PIVOT: Sprint 8 goal = learn from reference project (sample_codes/tower-defence/) + plan restructure | 8 | Boss | Major - Fresh start approach |
| OBS-088 | ✅ POSITIVE: TL quick initial findings - 5 key patterns (config-driven, 10 managers, parallel scenes, inheritance, cleanup) | 8 | SM | High - Fast analysis |
| OBS-089 | ✅ POSITIVE: GD study complete with 5 findings + joint restructure plan (7 improvements) in ~3 min | 8 | SM | High - Excellent collaboration |
| OBS-090 | ✅ POSITIVE: TL+GD aligned on restructure plan before formal spec - good coordination | 8 | SM | High - IMP-002 working |
| OBS-091 | ✅ POSITIVE: Sprint 8 complete in ~5 min - TL+GD delivered comprehensive RESTRUCTURE_SPEC with 4-phase plan | 8 | SM | High - Fast delivery |
| OBS-092 | ✅ POSITIVE: Boss APPROVED restructure plan - proceeding to implementation sprints | 8 | Boss | High - Green light |
| OBS-093 | 💡 PROCESS: Boss directive - always reference sample_codes/ before starting sprints | 8 | Boss | High - Added to workflow |

---

## Discussed (Not Selected)

*Reviewed at retrospective but not selected for active improvement.*

| ID | Description | Sprint Discussed | Reason Not Selected |
|----|-------------|------------------|---------------------|
| | | | |

---

## Completed

*Successfully integrated into prompts or no longer needed.*

| ID | Description | Completed Sprint | Outcome |
|----|-------------|------------------|---------|
| IMP-001 | ALWAYS REPORT BACK after completing any task | Sprint 3 | EFFECTIVE - Team internalized behavior. Prompts updated in Sprint 1. |

---

## How to Use This File

### During Sprint
1. Observe process friction, confusion, mistakes
2. Add to "Observed" section with details
3. Continue with current work
4. Address at retrospective

### At Retrospective
1. Review all "Observed" items
2. Team picks 1-2 highest impact
3. Move selected to "Active Improvement"
4. Move others to "Discussed (Not Selected)"

### After 2-3 Sprints of Success
1. Add to relevant prompt
2. Move to "Completed"
