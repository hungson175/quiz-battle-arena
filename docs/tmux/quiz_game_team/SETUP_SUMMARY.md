# Quiz Game Team - Setup Complete! ✅

Your multi-agent tmux team has been successfully created and is ready to build the educational quiz game!

---

## What Was Created

### 1. Team Documentation

**Main Documentation**:
- `README.md` - Complete team workflow, communication protocols, 10-step sprint process
- `WHITEBOARD.md` - Living document for current sprint status (PM maintains)
- `SETUP_SUMMARY.md` - This file - setup overview and next steps

**Installation Guide**:
- `INSTALL_TM_SEND.md` - How to install the required tm-send command

### 2. Role Prompts (4 Agents)

**Location**: `docs/tmux/quiz_game_team/prompts/`

- `PM_PROMPT.md` - Project Manager (central coordinator, maintains WHITEBOARD)
- `GD_PROMPT.md` - Game Designer (mechanics, UX, gamification for kids 8-12)
- `FE_PROMPT.md` - Frontend Developer (implements with Phaser 3, progressive commits)
- `CR_PROMPT.md` - Code Reviewer (quality gate, verifies specs)

### 3. Automation Scripts

- `setup-team.sh` - Automated team setup (creates session, initializes agents)

**Location**: `docs/tmux/quiz_game_team/`

### 4. Claude Code Integration

**Slash Command**:
- `.claude/commands/init-role.md` - `/init-role [PM|GD|FE|CR]` command for agent initialization

**Hooks**:
- `.claude/hooks/post_compact_tmux_reminder.sh` - Auto-recovery after compacts/restarts
- `.claude/settings.json` - Hook configuration

---

## Team Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     BOSS (You - Human User)                 │
│                  [Separate Terminal Outside Tmux]           │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
              ┌──────────────────────┐
              │   PM (Pane 0)        │ ◄── Central Coordinator
              │   Project Manager    │     All messages flow here
              └──┬───────┬───────┬───┘
                 │       │       │
         ┌───────┘       │       └────────┐
         ▼               ▼                ▼
    ┌─────────┐    ┌─────────┐    ┌──────────┐
    │ GD      │    │ FE      │    │ CR       │
    │ (Pane 1)│    │ (Pane 2)│    │ (Pane 3) │
    │ Designer│    │Developer│    │ Reviewer │
    └─────────┘    └─────────┘    └──────────┘
```

**Communication Rule**: All messages flow through PM. No direct agent-to-agent communication.

---

## BEFORE YOU START: Install tm-send (REQUIRED)

The `tm-send` command is **mandatory** for reliable tmux communication.

### Quick Install

```bash
# Create the command
mkdir -p ~/.local/bin
cat > ~/.local/bin/tm-send << 'EOF'
#!/bin/bash
if [ $# -lt 2 ]; then
    echo "Usage: tm-send <pane_id> \"message\""
    exit 1
fi
tmux send-keys -t "$1" "$2" C-m
sleep 0.3
tmux send-keys -t "$1" C-m
EOF
chmod +x ~/.local/bin/tm-send

# Add to PATH (if needed)
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc  # or ~/.bashrc
source ~/.zshrc  # or source ~/.bashrc

# Verify
which tm-send
# Should output: /Users/yourname/.local/bin/tm-send
```

**Full details**: See `INSTALL_TM_SEND.md`

---

## How to Start the Team

### Step 1: Run Setup Script

```bash
cd /Users/sonph36/dev/education/ontap
bash docs/tmux/quiz_game_team/setup-team.sh
```

**What the script does**:
1. Creates tmux session `quiz_game_team` with 4 panes
2. Sets stable role names (PM, GD, FE, CR)
3. Gets pane IDs and updates all prompt files
4. Starts Claude Code in each pane
5. Initializes each agent with `/init-role` command
6. Total time: ~60 seconds

### Step 2: Verify Setup

```bash
# Attach to the session
tmux attach -t quiz_game_team

# You should see 4 panes:
# ┌──────┬──────┬──────┬──────┐
# │  PM  │  GD  │  FE  │  CR  │
# └──────┴──────┴──────┴──────┘

# Detach (to observe from outside)
# Press: Ctrl+b, then d
```

**Check pane IDs**:
```bash
tmux list-panes -t quiz_game_team -F "#{pane_id} #{@role_name} #{pane_title}"
```

**Check WHITEBOARD**:
```bash
cat docs/tmux/quiz_game_team/WHITEBOARD.md
```

All agents should show "Ready" status.

### Step 3: Start First Sprint

From your **Boss terminal** (outside tmux), send the first sprint idea to PM:

```bash
# Example: Start with MVP
tm-send quiz_game_team:0.0 "BOSS [$(date +%H:%M)]: Start Sprint 1 - Build MVP of Quiz Battle Arena. Core game loop: display question, show 4 clickable targets with answers, validate selection, update score/health. Use Phaser 3. Make it subject-agnostic (works for any questions.json). Focus on functionality over graphics."
```

### Step 4: Observe the Team

**Option A - Attach and Watch** (see all agents working):
```bash
tmux attach -t quiz_game_team
# Detach: Ctrl+b, then d
```

**Option B - Monitor from Boss Terminal** (stay outside):
```bash
# Watch PM pane
tmux capture-pane -t quiz_game_team:0.0 -p | tail -50

# Watch WHITEBOARD
watch -n 10 cat docs/tmux/quiz_game_team/WHITEBOARD.md

# Check Git progress
watch -n 30 'git log --oneline -10'
```

---

## 10-Step Sprint Workflow

The team follows this autonomous workflow:

**Planning (Steps 1-3)**:
1. BOSS → PM: Sprint idea
2. PM ↔ GD: Design discussion
3. GD creates specification → PM finalizes

**Implementation (Steps 4-8)**:
4. PM → FE: Sprint assignment
5-7. FE implements progressively (MVP → features)
8. FE → PM: Completion report

**Review (Steps 9-10)**:
9. PM → CR: Review request
10. CR ↔ PM ↔ FE: Review loop until approved

**After Step 10**: PM prepares Sprint Summary for BOSS approval.

---

## Boss Responsibilities

### During Sprint (Steps 1-10)

**DO NOT INTERVENE** - Let the team self-coordinate!

The team will:
- PM coordinates everything
- GD designs mechanics
- FE implements progressively
- CR reviews and approves
- All communicate through PM

### After Sprint (Post Step 10)

When PM sends Sprint Summary, you review:

✅ **Git Commits** (primary progress proof):
```bash
git log --oneline -10
# Should show progressive development (MVP → features → polish)
```

✅ **Test Results**:
```bash
npm test
# All tests should pass
```

✅ **Manual Testing**:
```bash
npm run dev  # Or however game runs
# Play the game yourself!
```

✅ **Code Review**: CR's approval report in `docs/reviews/`

✅ **WHITEBOARD**: Check sprint status

**Then decide**:
- ✅ **Approve**: Merge to main, start next sprint
- ❌ **Request Changes**: Send feedback to PM
- 🔍 **Request Validator**: Get external review (if needed)

### Sending Messages to PM

Always use `tm-send` from Boss terminal:

```bash
# General message
tm-send quiz_game_team:0.0 "BOSS [$(date +%H:%M)]: your message here"

# Approve sprint
tm-send quiz_game_team:0.0 "BOSS [$(date +%H:%M)]: Sprint 1 approved! Excellent work. Merge to main and start Sprint 2 - implement power-ups system."

# Request changes
tm-send quiz_game_team:0.0 "BOSS [$(date +%H:%M)]: Sprint 1 needs changes: 1) Game crashes with empty questions.json, 2) Subject name is hardcoded to 'History'. Please fix and re-review."
```

---

## Key Project Requirements

### Game: "Quiz Battle Arena"

**Core Concept**: Subject-agnostic action quiz game for children ages 8-12

**Gameplay**:
- Question displays at top
- 4 targets/enemies show answer choices
- Player clicks correct target
- Correct = explosion + points | Wrong = lose health
- Must work for ANY subject (history, math, literature, etc.)

**Tech Stack**:
- Phaser 3 (2D game framework)
- HTML5/CSS3/JavaScript ES6+
- Jest (testing)
- LocalStorage (save data)

**Key Requirements**:
1. **Subject-Agnostic**: Same code/graphics for all subjects
2. **Simple Customization**: Just swap questions.json
3. **Age-Appropriate**: Simple controls, clear feedback, forgiving gameplay
4. **Educational**: Show explanations for wrong answers
5. **Progressive Development**: MVP first, then features

**Research Available**: See `docs/research-game-research.md` for:
- Educational game design patterns
- Gamification techniques
- Child psychology for ages 8-12
- Adaptive difficulty systems

---

## Session Management

### Daily Usage

```bash
# Start team (first time or after killing session)
bash docs/tmux/quiz_game_team/setup-team.sh

# Attach to existing session
tmux attach -t quiz_game_team

# Detach (keep session running)
# Inside tmux: Ctrl+b, then d

# List sessions
tmux list-sessions

# Kill session (stop team)
tmux kill-session -t quiz_game_team
```

### After Compact/Restart

The `post_compact_tmux_reminder.sh` hook automatically reminds agents to:
1. Re-read README.md
2. Re-read their role prompt
3. Check WHITEBOARD for current status
4. Verify pane IDs
5. Review recent Git commits
6. Continue from "Next Steps"

**No manual intervention needed** - agents recover automatically!

---

## File Locations Quick Reference

```
ontap/
├── docs/
│   ├── tmux/
│   │   └── quiz_game_team/
│   │       ├── README.md               ◄ Team workflow
│   │       ├── WHITEBOARD.md           ◄ Current status (PM maintains)
│   │       ├── SETUP_SUMMARY.md        ◄ This file
│   │       ├── INSTALL_TM_SEND.md     ◄ tm-send installation
│   │       ├── setup-team.sh           ◄ Start the team
│   │       └── prompts/
│   │           ├── PM_PROMPT.md
│   │           ├── GD_PROMPT.md
│   │           ├── FE_PROMPT.md
│   │           └── CR_PROMPT.md
│   ├── specs/                          ◄ Sprint specs (PM creates)
│   ├── reviews/                        ◄ Code reviews (CR creates)
│   └── research-game-research.md       ◄ Educational game research
├── .claude/
│   ├── commands/
│   │   └── init-role.md                ◄ /init-role command
│   ├── hooks/
│   │   └── post_compact_tmux_reminder.sh
│   └── settings.json
└── [game source code created by FE]
```

---

## Troubleshooting

### "tm-send: command not found"

**Problem**: tm-send not installed or not in PATH

**Solution**: See `INSTALL_TM_SEND.md` for installation

### "Session 'quiz_game_team' already exists"

**Problem**: Previous session still running

**Solution**:
```bash
# Kill existing session
tmux kill-session -t quiz_game_team

# Run setup again
bash docs/tmux/quiz_game_team/setup-team.sh
```

### Agents not responding to messages

**Problem**: Pane IDs might have changed or agents not initialized

**Solution**:
```bash
# Check pane IDs
tmux list-panes -t quiz_game_team -F "#{pane_id} #{@role_name}"

# Re-run setup script (safest)
tmux kill-session -t quiz_game_team
bash docs/tmux/quiz_game_team/setup-team.sh
```

### WHITEBOARD shows wrong status

**Problem**: PM hasn't updated WHITEBOARD recently

**Solution**: Send reminder to PM:
```bash
tm-send quiz_game_team:0.0 "BOSS [$(date +%H:%M)]: Please update WHITEBOARD with current sprint status."
```

---

## Success Indicators

✅ **Setup Successful** when:
- All 4 panes show Claude Code running
- Each agent reports "Ready" status
- WHITEBOARD shows pane IDs correctly
- `tm-send` command works

✅ **Sprint Successful** when:
- All tests passing (100%)
- Git commits show progressive development (MVP → features)
- Code Review approved by CR
- Game works for multiple subjects (history, math, etc.)
- Meets specifications exactly
- No critical bugs

✅ **Team Healthy** when:
- All agents responsive
- Communication flows through PM
- WHITEBOARD up-to-date
- Progressive commits every hour
- Clear specs before implementation
- Review loops efficient (< 2 iterations)

---

## Next Steps

1. ✅ **Install tm-send**: See `INSTALL_TM_SEND.md`
2. ✅ **Run setup script**: `bash docs/tmux/quiz_game_team/setup-team.sh`
3. ✅ **Verify all agents "Ready"**: Check WHITEBOARD
4. ✅ **Send first sprint idea** to PM from Boss terminal
5. ✅ **Let team work autonomously** (steps 1-10)
6. ✅ **Review Sprint Summary** after step 10
7. ✅ **Approve and continue** to next sprint

---

## Resources

- **Team Workflow**: `README.md`
- **Current Status**: `WHITEBOARD.md` (updated by PM)
- **Role Prompts**: `prompts/` directory
- **Research**: `docs/research-game-research.md`
- **Setup Guide**: This file
- **Install tm-send**: `INSTALL_TM_SEND.md`

---

## Quick Commands Cheat Sheet

```bash
# Start team
bash docs/tmux/quiz_game_team/setup-team.sh

# Attach/detach
tmux attach -t quiz_game_team
# Ctrl+b, then d (to detach)

# Send message to PM
tm-send quiz_game_team:0.0 "BOSS [$(date +%H:%M)]: message"

# Check status
cat docs/tmux/quiz_game_team/WHITEBOARD.md

# Check progress
git log --oneline -10

# Run tests
npm test

# Kill session
tmux kill-session -t quiz_game_team
```

---

## Summary

You now have a fully configured multi-agent AI team ready to build the educational quiz game!

**The team will**:
- Design game mechanics age-appropriate for 8-12 year olds
- Implement progressively (MVP → features → polish)
- Maintain quality through code reviews
- Ensure subject-agnostic design (works for any subject)
- Communicate transparently through WHITEBOARD
- Prove progress through Git commits

**You (BOSS) will**:
- Provide sprint ideas
- Let team self-coordinate (steps 1-10)
- Review Sprint Summaries
- Approve/reject based on deliverables
- Guide overall project direction

**Ready to build an amazing educational game! 🎮📚**

---

**Questions?** Check `README.md` for detailed workflow information.

**Problems?** See Troubleshooting section above or refer to `INSTALL_TM_SEND.md`.
