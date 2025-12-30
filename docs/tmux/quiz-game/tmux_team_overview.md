# Quiz Game Scrum Team

<context>
A Scrum-based multi-agent team for developing Quiz Battle Arena - an educational quiz game.
Claude Code instances collaborate via tmux following Scrum framework.
</context>

---

## Team Overview

**Project**: Quiz Battle Arena - Educational Quiz Game for kids ages 8-12
**Tech Stack**: Phaser 3 + Vite + JavaScript + Jest
**Port**: 3336

---

## Scrum Framework

### Three Pillars
1. **Transparency** - All work visible in Sprint Backlog and commits
2. **Inspection** - Regular reviews and retrospectives
3. **Adaptation** - Continuous improvement through prompt updates

### Two Products
Every Scrum team produces TWO products:
1. **The Game Product** - Quiz Battle Arena
2. **A Better Team** - Continuous team improvement via prompt updates

---

## Agent Roles

| Role | Pane | Category | Purpose |
|------|------|----------|---------|
| PO | 0 | Product Owner | Backlog management, priorities, stakeholder liaison |
| SM | 1 | Scrum Master | Team effectiveness, process improvement, prompt updates |
| GD | 2 | Developer | Game Designer - Domain expert for educational games |
| TL | 3 | Developer | Tech Lead - Architecture, code review, research solutions |
| DEV | 4 | Developer | Game Developer - Implementation (Phaser, UI, game logic) |
| QA | 5 | Developer | Quality Assurance - Black-box testing |
| Boss | Outside | Stakeholder | Sprint goals, feedback, acceptance |

---

## Communication Protocol

### Use tm-send for ALL Tmux Messages

```bash
# Correct - use tm-send with role name
tm-send SM "DEV -> SM: Task complete. Ready for review."

# Forbidden - never use raw tmux send-keys
tmux send-keys -t %16 "message" C-m C-m  # NEVER!
```

### Communication Patterns

| From | To | When |
|------|-----|------|
| Boss | PO | Sprint goals, priorities, feedback |
| PO | SM | Backlog updates, priority changes |
| SM | All Devs | Sprint coordination, retrospective |
| GD | SM/TL | Game design decisions, educational requirements |
| TL | SM | Architecture decisions, blockers |
| DEV | TL | Technical clarifications |
| QA | SM | Testing results, quality issues |
| All | SM | Impediments, process improvements |

**SM is the communication hub for process. TL is the hub for technical decisions. GD is the hub for game design decisions.**

---

## Scrum Events

### Sprint Planning
1. **PO** presents Sprint Goal and prioritized backlog items
2. **GD** provides game design input and educational requirements
3. **TL** provides technical input on feasibility
4. **Developers** commit to Sprint Backlog
5. **SM** facilitates and ensures understanding

### No Daily Scrum

AI teams don't need scheduled check-ins.

**Simple approach:**
- Developers message SM when they need help
- SM is available and responds
- If problem affects multiple roles -> SM calls a sync meeting

### Sprint Review
1. **Developers** demonstrate completed work
2. **PO** accepts/rejects based on Definition of Done
3. **Boss** provides feedback
4. **PO** updates backlog based on feedback

### Sprint Retrospective (SM's Key Event)

**Quick Check First:**
- If nothing significant: 5-10 min retro, continue as-is
- If issues exist: Full retrospective

**Full Retrospective:**
1. **SM** reviews sm/IMPROVEMENT_BACKLOG.md
2. Team discusses each observation
3. **SM + Team pick 1-2 action items**
4. **SM updates prompts only if issue recurring** (2-3 sprints)
5. **SM documents in RETROSPECTIVE_LOG.md**

---

## Sprint Workflow

### Phase 1: Sprint Planning

```
Boss -> PO: Sprint Goal
PO -> SM: Backlog items for Sprint
SM -> All: Sprint Planning facilitation
GD -> SM: Game design requirements
TL -> SM: Technical feasibility input
All Devs -> SM: Commitment to Sprint Backlog
```

### Phase 2: Sprint Execution

```
1. GD designs game features (educational, gameplay)
2. TL designs solution approach (architecture)
3. DEV implements with TDD
4. TL reviews code
5. QA performs black-box testing
6. SM monitors progress, removes impediments
7. PO available for clarifications
```

### Phase 3: Sprint Review

```
Developers -> PO: Demo completed work
PO -> Boss: Present for acceptance
Boss -> PO: Feedback
PO -> SM: Update backlog
```

### Phase 4: Sprint Retrospective

```
SM facilitates retrospective:
1. What went well?
2. What problems occurred?
3. What improvements to commit to?

SM -> Update prompts (if needed)
SM -> Document in RETROSPECTIVE_LOG.md
```

---

## Definition of Done

A Story is "Done" when:
- [ ] Code implemented and committed
- [ ] TDD tests pass
- [ ] TL code review approved
- [ ] QA black-box testing passed
- [ ] Game runs without errors (`npm run dev`)
- [ ] Lint passes (`npm run lint` if configured)
- [ ] Build passes (`npm run build`)
- [ ] PO accepts

---

## Artifacts

### Product Backlog
**Location:** `PRODUCT_BACKLOG.md`
- Owned by PO
- Ordered by priority
- Contains all work items

### Sprint Backlog
**Location:** `SPRINT_BACKLOG.md`
- Committed items for current Sprint
- Updated by developers
- SM monitors progress

### Retrospective Log
**Location:** `sm/RETROSPECTIVE_LOG.md`
- Historical record of retrospectives
- Lessons learned

---

## Role Boundaries

| Role | Responsibilities | Does NOT |
|------|------------------|----------|
| PO | Backlog, priorities, acceptance | Write code, make technical decisions |
| SM | Process, improvement, facilitation | Write code, make product decisions |
| GD | Game design, educational requirements | Write production code |
| TL | Architecture, review, guidance | Override PO on priorities |
| DEV | Game code with TDD | Make design decisions alone |
| QA | Black-box testing | Write production code |

---

## Development Commands

```bash
# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Lint (if configured)
npm run lint
```

---

## Git Workflow

```bash
# Sprint branch
git checkout -b sprint_{N}

# Feature branches off sprint
git checkout -b feature_{story_id}_{description}

# After TL review + QA pass
git checkout sprint_{N}
git merge feature_{story_id}_{description}

# After Sprint Review
git checkout main
git merge sprint_{N}
```

---

## Files in This Directory

```
quiz-game/
├── tmux_team_overview.md    # This file
├── WHITEBOARD.md            # Status updates
├── SPRINT_BACKLOG.md        # Current Sprint work
├── PRODUCT_BACKLOG.md       # All work items (PO owned)
├── setup-team.sh            # Automated setup (sets @role_name pane options)
├── sm/                      # SM's workspace
│   ├── IMPROVEMENT_BACKLOG.md  # Process issues
│   ├── RETROSPECTIVE_LOG.md    # Historical lessons
│   └── ACTION_ITEMS.md         # Improvement tracking
└── prompts/
    ├── PO_PROMPT.md         # Product Owner
    ├── SM_PROMPT.md         # Scrum Master
    ├── GD_PROMPT.md         # Game Designer
    ├── TL_PROMPT.md         # Tech Lead
    ├── DEV_PROMPT.md        # Game Developer
    └── QA_PROMPT.md         # Tester

Note: tm-send is installed globally at ~/.local/bin/tm-send
      Role lookup uses dynamic @role_name pane options (no static files)
```

---

## Key Principle

> "The Scrum Master is accountable for the Scrum Team's effectiveness."

In AI agent teams: **SM improves the team by improving the prompts.**

But be pragmatic:
- Log issues during sprint, don't stop work
- Pick 1-2 improvements per retrospective
- Only update prompts for recurring issues
- Quick retros when nothing is wrong

**A well-functioning team needs minimal prompts.**
