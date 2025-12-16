# WHITEBOARD - Quiz Game Team

**Last Updated**: 2025-12-17 01:40 (PM - M0 STARTED)
**Current Sprint**: M0 - Project Setup
**Sprint Status**: 🟡 In Progress

---

## Pane IDs (Stable)

| Role | Pane ID | Status |
|------|---------|--------|
| PM   | %12     | 🟢 Ready |
| GD   | %13     | 🟢 Ready |
| FE   | %14     | 🟢 Ready |
| CR   | %15     | 🟢 Ready |

**Note**: These IDs are set by `setup-team.sh` during initialization. Verify after restarts with: `tmux list-panes -F "#{pane_id} #{@role_name}"`

---

## Current Sprint: M0 - Project Setup

**Milestone**: M0 - Project Setup & Foundation
**Sprint Number**: Pre-Sprint (Setup)
**Goal**: Establish development environment, tooling, and project structure
**Status**: 🟡 In Progress (BOSS approved - Let's go!)
**Duration**: 1 week (estimated)

**Key Documents**:
- **Main Milestones**: docs/plan/main-milestones.md
- **PRD**: docs/product/prd.md (v1.1 - GD recommendations incorporated)
- **GD Feedback**: docs/product/gd-prd-feedback.md
- **MCP Research**: docs/research-mcp-graphic-resources.md

---

## Sprint Progress

### Phase: Waiting for BOSS

**Current Step**: Pre-Sprint (Step 0)
**Next Step**: BOSS provides sprint idea to PM

**M0 Progress**:
- ✅ FE: MCP research document corrected for Claude Code CLI (~/.claude.json)
- 🟡 FE: Reading main-milestones.md and starting M0 tasks
- 🟡 FE: Git repository initialization (in progress)
- 🟡 FE: Dev environment setup (Node.js, Phaser 3, Vite, Jest) (pending)
- 🟡 FE: Project structure creation (src/, tests/, assets/) (pending)
- ✅ GD: Read DC_lichsu.md - Content includes Ai Cập, Lưỡng Hà, Văn Lang-Âu Lạc, Bắc thuộc
- 🟢 GD: Ready to create 15 Vietnamese questions (waiting for FE project structure)
- ⚪ PM: Will verify M0 exit gate after deliverables complete

**IMPORTANT NOTE**:
- ✅ Game language: VIETNAMESE (not English)
- ✅ History questions source: data/output/DC_lichsu.md
- ✅ Sample must validate subject-agnostic design in Vietnamese

**Team Coordination**:
- ✅ GD acknowledged M0 and ready to collaborate with FE
- ✅ FE corrected MCP documentation proactively
- ✅ GD waiting for FE setup before questions.json work (good coordination)

**Blockers**:
- None - Team executing M0 tasks

---

## Recent Git Commits

```
[No commits yet - project just initialized]
```

**Progressive Development Evidence**: N/A - Sprint not started

---

## Communication Log (Last 15 Messages)

**Format**: `[HH:mm] ROLE → ROLE: Message`

```
[01:38] BOSS → PM: Let's go!
[01:40] PM → FE: M0 STARTED - Git init, dev env, project structure.
[01:40] PM → GD: M0 STARTED - Need 15 sample questions (3 subjects).
[01:49] FE → PM: MCP research corrected for CLI. Starting M0 tasks.
[01:52] BOSS → PM: Vietnamese game! Use data/output/DC_lichsu.md for history questions.
[01:53] PM → GD: CORRECTION - Extract from DC_lichsu.md. All 15 questions in VIETNAMESE.
[01:52] GD → PM: CORRECTION acknowledged. Creating 15 Vietnamese questions from data.
[01:53] GD → PM: DC_lichsu.md read. Content ready. Waiting for FE project structure.
```

**Note**: PM maintains this log. Update after each significant communication.

---

## Decisions Made

**PRD & Design**:
- ✅ GD APPROVED PRD v1.0 with 7 design recommendations
- ✅ PRD updated to v1.1 with all recommendations incorporated
- 3 recommendations in MVP (P1): forgiving click detection, positive reinforcement, milestone celebrations
- 2 recommendations in Phase 2 (P2): combo visual feedback, near-miss feedback
- 2 recommendations in Phase 3 (P3): learning metrics, spaced repetition

**Asset Strategy**:
- ✅ MCP servers identified: Game Asset Generator (primary) + Stock Images (backgrounds)
- ✅ Install timing: M2 (Phase 2 - Polish), NOT in M1 MVP
- ✅ M1 uses placeholder graphics (progressive development)
- Budget approved for best quality assets (Stable Diffusion API backup if needed)

**Project Structure**:
- ✅ Created docs/plan/ for milestones and sprints
- ✅ Sprint naming: sprint-{number}-{short-description}
- ✅ PM responsible for milestone tracking after each sprint
- ✅ Backlog management documented in PM_PROMPT.md

**Language & Data**:
- ✅ **Game language: VIETNAMESE** (not English)
- ✅ History questions source: data/output/DC_lichsu.md (Vietnamese history content)
- ✅ Sample questions: 15 total in Vietnamese (5 history, 5 math, 5 literature)
- ✅ Subject-agnostic validation using Vietnamese content

---

## Next Steps

**Immediate (Awaiting BOSS Approval)**:
1. **BOSS**: Approve PRD v1.1 and begin M0 (Project Setup)

**M0 - Project Setup (1 week)**:
1. **FE**: Initialize Git repository
2. **FE**: Set up development environment (Node.js, Phaser 3, Vite, Jest)
3. **FE**: Create project folder structure (src/, tests/, assets/)
4. **GD + FE**: Create 15 sample questions (5 history, 5 math, 5 literature)
5. **PM**: Create docs/plan/sprints/sprint-1-core-mechanics/ folder
6. **PM**: Verify M0 exit gate criteria met

**After M0 Complete**:
7. **PM ↔ GD**: Discuss Sprint 1 (Core Mechanics) design
8. **PM**: Create Sprint 1 specification in docs/plan/sprints/sprint-1-core-mechanics/sprint-plan.md
9. **PM → FE**: Assign Sprint 1 implementation
10. **FE**: Implement Sprint 1 (progressive commits every 30-60 min)
11. **PM**: Monitor progress via Git commits
12. **CR**: Review Sprint 1 at completion
13. **PM**: Update main-milestones.md after Sprint 1
14. **PM**: Prepare Sprint 1 summary for BOSS

---

## Team Health

| Agent | Status | Last Activity |
|-------|--------|---------------|
| PM    | 🟡 Busy | Monitoring M0 progress. Tracking FE setup and GD questions. |
| GD    | 🟢 Ready | DC_lichsu.md read. Content ready. Waiting for FE structure + format. |
| FE    | 🟡 Busy | M0 in progress. Corrected MCP docs. Starting Git init + dev setup. |
| CR    | ⚪ Idle | Awaiting Sprint 1 code review assignment. |

**Legend**:
- 🟢 Ready - Active and responsive
- 🟡 Busy - Working on assigned task
- 🔴 Blocked - Waiting for input/clarification
- ⚪ Idle - No current assignment

---

## Project Context (Quick Reference)

**Project**: Educational Quiz Game - "Quiz Battle Arena"
**Goal**: Subject-agnostic web game for children ages 8-12
**Tech Stack**: Phaser 3, HTML5/CSS3/JavaScript ES6+, Jest
**Key Requirement**: Must work for ANY subject (history, math, literature) by swapping questions.json

**Game Concept**:
- Question displays at top
- 4 targets/enemies show answer choices
- Player clicks correct target
- Correct = explosion + points, Wrong = lose health
- Gamification: scoring, combos, health system, power-ups

---

## Notes for Session Resumption

**If you see this after compact/restart**:

1. **Read your role prompt** in `docs/tmux/quiz_game_team/prompts/{ROLE}_PROMPT.md`
2. **Check Pane IDs** above and verify they match: `tmux list-panes -F "#{pane_id} #{@role_name}"`
3. **Review Current Sprint** section to see what's in progress
4. **Check Communication Log** for recent context
5. **Review Git commits** to see what was last completed
6. **Continue from "Next Steps"** section

**PM**: Update this WHITEBOARD after every major event (sprint start, completion, blocker, etc.)

---

## Archive

### Completed Sprints

(None yet - will be added as sprints complete)

---

**Instructions for PM**:
1. Update this file after every significant event
2. Keep Communication Log to last 15 messages (delete older ones)
3. Update Sprint Progress and Next Steps frequently
4. Archive completed sprints to keep WHITEBOARD focused on current work
5. Verify Pane IDs after any tmux restarts/changes
6. Use this as the SINGLE SOURCE OF TRUTH for team coordination
