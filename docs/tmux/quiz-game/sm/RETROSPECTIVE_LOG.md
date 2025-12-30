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
