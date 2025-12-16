---
description: Initialize agent role in Quiz Game Team
argument-hint: "[PM|GD|FE|CR]"
---

# Initialize Agent Role - Quiz Game Team

You are initializing as a member of the **Quiz Game Team** Multi-Agent System.

## Step 1: Read System Documentation

First, read the system overview to understand the multi-agent workflow:

**File**: `docs/tmux/quiz_game_team/README.md`

This contains:
- Team structure and communication flow
- 10-step sprint workflow
- Communication protocol (two-enter rule, tm-send usage)
- Project context (Quiz Battle Arena game)
- Session resumption procedures

## Step 2: Read Your Role Prompt

Based on the role argument `$ARGUMENTS`, read your specific role prompt:

- **PM** (Project Manager): `docs/tmux/quiz_game_team/prompts/PM_PROMPT.md`
- **GD** (Game Designer): `docs/tmux/quiz_game_team/prompts/GD_PROMPT.md`
- **FE** (Frontend Developer): `docs/tmux/quiz_game_team/prompts/FE_PROMPT.md`
- **CR** (Code Reviewer): `docs/tmux/quiz_game_team/prompts/CR_PROMPT.md`

## Step 3: Read WHITEBOARD

Check the current team status:

**File**: `docs/tmux/quiz_game_team/WHITEBOARD.md`

This contains:
- Current sprint status
- Pane IDs (verify yours is correct)
- Recent communication log
- Next steps

## Step 4: Verify Your Setup

After reading both files:

1. **Confirm your role**: "I am $ARGUMENTS for the Quiz Game Team"
2. **Verify pane IDs**: Check your communication targets are configured
3. **Check sprint status**: Read WHITEBOARD to see if sprint is active
4. **Report ready**: If PM, wait for BOSS. If other role, report to PM:

```bash
# For GD, FE, CR (not PM)
tm-send %PM_PANE_ID "$ARGUMENTS [HH:mm]: Role initialized. Read README and WHITEBOARD. Status: Ready and waiting for assignments."
```

## Step 5: Be Ready

You are now part of the team. Your responsibilities:

- **PM**: Central coordinator, maintain WHITEBOARD, route all communication
- **GD**: Design game mechanics, UX for children, gamification systems
- **FE**: Implement web game progressively (MVP → features → polish)
- **CR**: Review code quality, verify specifications, approve/reject

**Remember**:
- All communication flows through PM (no direct agent-to-agent)
- Use `tm-send` command for tmux messages (enforces two-enter rule)
- Git commits are truth (progressive development proof)
- WHITEBOARD is team memory (PM maintains)
- Subject-agnostic requirement is CRITICAL (works for any subject)

## Initialization Complete

You are now ready to execute your role in the workflow. Wait for PM to assign tasks (or if you are PM, wait for BOSS to provide first sprint idea).

**Good luck building an amazing educational game! 🎮📚**
