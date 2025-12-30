# Initialize Agent Role

You are initializing as a member of the **Quiz Game Multi-Agent Team**.

## Step 1: Read System Documentation

First, read the system overview to understand the multi-agent workflow:

**File**: `docs/tmux/quiz-game/tmux_team_overview.md`

Read this file completely to understand:
- Team structure and roles
- Communication protocols (use tm-send!)
- Sprint workflow
- Definition of Done

## Step 2: Read Your Role Prompt

Based on the role argument `$ARGUMENTS`, read your specific role prompt:

| Role | Prompt File |
|------|-------------|
| **PO** (Product Owner) | `docs/tmux/quiz-game/prompts/PO_PROMPT.md` |
| **SM** (Scrum Master) | `docs/tmux/quiz-game/prompts/SM_PROMPT.md` |
| **GD** (Game Designer) | `docs/tmux/quiz-game/prompts/GD_PROMPT.md` |
| **TL** (Tech Lead) | `docs/tmux/quiz-game/prompts/TL_PROMPT.md` |
| **DEV** (Game Developer) | `docs/tmux/quiz-game/prompts/DEV_PROMPT.md` |
| **QA** (Quality Assurance) | `docs/tmux/quiz-game/prompts/QA_PROMPT.md` |

## Step 3: Check Current Status

After reading both files:

1. Check `docs/tmux/quiz-game/WHITEBOARD.md` for current Sprint status
2. Check `docs/tmux/quiz-game/PANE_ROLES.md` for your pane ID and team structure
3. If you are SM, also check `docs/tmux/quiz-game/sm/IMPROVEMENT_BACKLOG.md`

## Step 4: Confirm Initialization

After reading all documentation:

1. Confirm your role and responsibilities
2. Verify you understand the communication protocol (tm-send)
3. State you are ready to execute your role

**Example confirmation:**
```
I am initialized as [ROLE] for the Quiz Game Team.

My responsibilities:
- [Key responsibility 1]
- [Key responsibility 2]

Communication: I will use `tm-send [ROLE] "message"` for all tmux messages.

Current status: [From WHITEBOARD]

I am ready to execute my role.
```

## Important Reminders

- **NEVER** use raw `tmux send-keys` - always use `tm-send`
- All communication flows through SM (process) or TL (technical)
- Update WHITEBOARD when your status changes
- Follow TDD practices (DEV)
- Black-box testing only (QA)
