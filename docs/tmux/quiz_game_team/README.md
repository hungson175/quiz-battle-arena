# Quiz Game Team - Multi-Agent Workflow

**Project**: Educational Quiz Game ("Quiz Battle Arena")
**Team Size**: 4 agents (PM, GD, FE, CR)
**Working Directory**: `/Users/sonph36/dev/education/ontap`
**Session Name**: `quiz_game_team`

---

## Team Structure

```
BOSS (User) ──────→ PM (Project Manager)
                     ├──→ GD (Game Designer)
                     ├──→ FE (Frontend Developer)
                     └──→ CR (Code Reviewer)
```

**Communication Flow**: All messages flow through PM. No direct agent-to-agent communication.

---

## Team Roles

### PM (Project Manager)
**Pane**: 0 (Left-most)
**Prompt**: `docs/tmux/quiz_game_team/prompts/PM_PROMPT.md`

**Responsibilities**:
- Receive sprint ideas from BOSS
- Coordinate with GD for design
- Create specifications in docs/specs/
- Assign sprints to FE
- Monitor progress via Git commits
- Maintain WHITEBOARD
- Request code reviews from CR
- Prepare sprint summaries for BOSS

### GD (Game Designer)
**Pane**: 1
**Prompt**: `docs/tmux/quiz_game_team/prompts/GD_PROMPT.md`

**Responsibilities**:
- Design game mechanics and UX
- Ensure age-appropriate (8-12 years old)
- Gamification systems (scoring, health, power-ups)
- Subject-agnostic design (works for any subject)
- Research-backed decisions
- Create design docs in docs/specs/

### FE (Frontend Developer)
**Pane**: 2
**Prompt**: `docs/tmux/quiz_game_team/prompts/FE_PROMPT.md`

**Responsibilities**:
- Implement web game (Phaser 3, HTML/CSS/JS)
- Progressive development (MVP → features → polish)
- Write automated tests (Jest)
- Frequent Git commits (every 30-60 min)
- Subject-agnostic implementation
- Request clarifications via PM

### CR (Code Reviewer)
**Pane**: 3 (Right-most)
**Prompt**: `docs/tmux/quiz_game_team/prompts/CR_PROMPT.md`

**Responsibilities**:
- Review FE implementations
- Run tests and manual testing
- Verify subject-agnostic requirement
- Write review docs in docs/reviews/
- Approve or request changes
- Constructive feedback with examples

---

## 10-Step Sprint Workflow

### Planning Phase (Steps 1-3)

**Step 1: Ideas → PM**
- BOSS provides sprint idea to PM (from separate terminal)
- PM reads and clarifies requirements with BOSS if needed

**Step 2: PM → GD**
- PM forwards requirements to GD
- GD and PM discuss strategy and design approach

**Step 3: GD → PM**
- GD creates design specification in docs/specs/
- PM reviews and finalizes specification

### Implementation Phase (Steps 4-8)

**Step 4: PM → FE**
- PM assigns sprint to FE with clear specification
- FE acknowledges and estimates timeline

**Step 5-7: Implementation Loop**
- FE implements progressively (MVP first, then features)
- FE commits frequently with clear messages
- PM monitors Git commits for progress
- If FE needs clarification: FE ↔ PM ↔ GD loop

**Step 8: FE → PM**
- FE completes sprint and reports to PM
- Includes: test results, Git commit range, deliverables
- PM verifies claims independently (runs tests, checks Git)

### Review Phase (Steps 9-10)

**Step 9: PM → CR**
- PM requests code review from CR
- Provides: spec, design docs, commit range, FE report

**Step 10: Review Loop**
- CR reviews code, tests, and manual testing
- CR creates review document in docs/reviews/
- If approved: Sprint complete, move to BOSS review
- If changes requested: CR ↔ PM ↔ FE loop until approved

### After Step 10: BOSS Review

**PM prepares Sprint Summary** for BOSS:
- Deliverables achieved
- Git commit evidence (progressive development)
- Test results
- Decisions made
- CR approval report

**BOSS evaluates**:
- Approve sprint → merge to main
- Request changes → back to team
- Prioritize next sprint

---

## Communication Protocol

### The Two-Enter Rule (CRITICAL)

All tmux messages require **two separate Enter commands**. Always use the `tm-send` command (installed globally in PATH):

```bash
# ✅ CORRECT - Use tm-send command
tm-send %26 "PM [10:30]: Sprint 1 assigned. See docs/specs/sprint-1.md"

# ❌ WRONG - Never use raw tmux send-keys
tmux send-keys -t %26 "message" C-m C-m  # Silently fails!
```

**tm-send location**: `~/.local/bin/tm-send` (must be in PATH)

### Message Format

`[ROLE] [HH:mm]: [Brief message]. See [reference].`

**Examples**:
- `PM [10:30]: Sprint assigned to FE. See docs/specs/sprint-1.md`
- `FE [15:45]: MVP complete. Tests: 15/15 passing. See commits abc123..def456`
- `GD [11:20]: Design complete. See docs/specs/game-mechanics-design.md`
- `CR [17:00]: ✅ APPROVED. See docs/reviews/sprint-1-review.md`

### Update-Then-Notify Order

**Always write files FIRST, then notify**:

1. Write/update document (spec, code, review)
2. Commit to Git (if applicable)
3. THEN send notification via tm-send

### Pane ID Management

**Stable Role Names** using tmux user options:
```bash
# Set during setup
tmux set-option -p -t %26 @role_name "PM"

# Read role name
tmux show-option -p -t %26 -v @role_name  # Returns: PM
```

**Verify Pane IDs** after restarts:
```bash
tmux list-panes -F "#{pane_id} #{@role_name}"
```

---

## Project Context

### Goal
Build a **subject-agnostic educational quiz game** for children ages 8-12 that works for ANY subject (history, math, literature, civic ed) by simply swapping the questions.json file.

### Selected Game: "Quiz Battle Arena"

**Gameplay**:
1. Question appears at top of screen
2. Four targets (enemies/robots) show answer choices
3. Player clicks the target with correct answer
4. Correct → explosion animation + points + next question
5. Wrong → lose 1 health + error feedback + explanation
6. Game ends when health reaches 0 or questions exhausted

**Key Features**:
- Scoring system with combo multipliers
- Health/lives system (5 hearts, restore via bonus questions)
- Power-ups (Freeze Time, Smart Bomb, Hint Arrow)
- Adaptive difficulty (speed, question difficulty)
- Visual/audio feedback (dopamine triggers)
- Subject-agnostic visuals (robots, abstract shapes)

### Tech Stack

- **Frontend**: Phaser 3 (2D game framework)
- **Languages**: HTML5, CSS3, JavaScript ES6+
- **Styling**: Tailwind CSS (optional)
- **Testing**: Jest
- **Storage**: LocalStorage (game state, high scores)
- **No Backend**: Everything client-side

### Key Requirements

1. **Subject-Agnostic**: Same game/graphics for all subjects
2. **Simple Customization**: Just swap questions.json file
3. **Age-Appropriate**: Simple controls, clear feedback, forgiving
4. **Educational**: Wrong answers show explanations
5. **Progressive Development**: MVP → features → polish
6. **Limited Resources**: Keep it simple, no over-engineering

### Research Document

**File**: `docs/research-game-research.md`

Contains research on:
- Educational game design patterns
- Gamification techniques (points, badges, health, power-ups)
- Child psychology for ages 8-12
- Adaptive difficulty systems
- Visual feedback and motivation

**All agents should reference this** when making decisions.

---

## Git Workflow

### Commit Standards

**Frequency**: Commit every 30-60 minutes of work
**Message Format**: `<type>: <description>`

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `refactor`: Code restructuring
- `test`: Add/update tests
- `docs`: Documentation changes
- `style`: Formatting (no logic change)

**Examples**:
```
feat: add core game loop with question display
feat: implement scoring system with combo multipliers
fix: handle empty questions array gracefully
test: add 15 unit tests for game logic
refactor: extract target creation into separate function
```

### Progressive Commits

FE should commit incrementally to prove progressive development:

```
Sprint 1 Commits (Example):
1. feat: setup Phaser project structure
2. feat: add question loading from JSON
3. feat: create target sprites with answer text
4. feat: implement click detection for targets
5. feat: add scoring system (base 100 points)
6. feat: add health system (5 hearts)
7. test: add 15 unit tests for game logic
8. fix: handle edge case for empty questions
```

**Why**: Git commits are PRIMARY progress measure. Chat logs fade, code commits are truth.

---

## File Structure

```
ontap/
├── docs/
│   ├── plan/                           # Project planning (PM maintains)
│   │   ├── main-milestones.md         # Main milestones roadmap (SINGLE SOURCE OF TRUTH)
│   │   ├── backlog.md                  # Backlog items
│   │   └── sprints/                    # Sprint-specific documentation
│   │       ├── sprint-1-setup/
│   │       │   ├── sprint-plan.md      # Sprint plan (PM creates)
│   │       │   ├── design.md           # Design specs (GD creates if needed)
│   │       │   └── review.md           # Code review (CR creates)
│   │       ├── sprint-2-core-mechanics/
│   │       │   └── ...
│   │       └── sprint-N-{description}/
│   │           └── ...
│   ├── product/
│   │   ├── prd.md                      # Product Requirements Document
│   │   └── gd-prd-feedback.md          # GD feedback on PRD
│   ├── research/
│   │   ├── research-game-research.md   # Educational game research
│   │   └── research-mcp-graphic-resources.md  # MCP server research
│   ├── tmux/
│   │   └── quiz_game_team/
│   │       ├── README.md              # This file - team workflow
│   │       ├── WHITEBOARD.md          # PM maintains - current status
│   │       ├── prompts/
│   │       │   ├── PM_PROMPT.md       # PM role
│   │       │   ├── GD_PROMPT.md       # Game Designer role
│   │       │   ├── FE_PROMPT.md       # Frontend Developer role
│   │       │   └── CR_PROMPT.md       # Code Reviewer role
│   │       ├── scripts/
│   │       │   └── tm-send.sh         # Deprecated: Use global tm-send instead
│   │       └── setup-team.sh          # Automated team setup
├── src/                               # Game source code (FE implements)
├── tests/                             # Automated tests (FE writes)
├── .claude/
│   ├── commands/
│   │   └── init-role.md               # Slash command for agent init
│   ├── hooks/
│   │   └── post_compact_tmux_reminder.sh
│   └── settings.json                  # Hook configuration
└── package.json
```

### Sprint Folder Naming Convention

**Format**: `sprint-{number}-{short-description}`

**Rules**:
- Use lowercase
- Use hyphens for spaces
- Keep description short (2-4 words max)
- Description should indicate sprint focus

**Examples**:
- `sprint-1-setup` - Project setup and foundation
- `sprint-2-core-mechanics` - Core gameplay mechanics
- `sprint-3-ui-ux` - UI/UX polish for MVP
- `sprint-4-visual-upgrade` - MCP asset integration
- `sprint-5-advanced-mechanics` - Combos, power-ups, comebacks
- `sprint-6-audio-settings` - Complete audio suite and settings

### Sprint Documentation Files

**Each sprint folder contains up to 3 files**:

1. **sprint-plan.md** (PM creates - REQUIRED)
   - Sprint number, name, goal
   - Milestone alignment
   - Deliverables and success criteria
   - Assigned to whom
   - Estimated duration

2. **design.md** (GD creates - OPTIONAL, for design-heavy sprints)
   - Game design specifications
   - Visual/interaction design
   - Research-backed decisions

3. **review.md** (CR creates - REQUIRED at sprint end)
   - Code review findings
   - Test results
   - Approval status
   - Issues to address

**Who Creates What**:
- PM: Creates sprint folder + sprint-plan.md at sprint start
- GD: Adds design.md if sprint requires design work
- CR: Adds review.md at sprint completion

**File Locations Summary**:
- **Milestones**: `docs/plan/main-milestones.md` (PM updates after each sprint)
- **Backlog**: `docs/plan/backlog.md` (PM adds deferred items, new features, bugs)
- **Sprint Plans**: `docs/plan/sprints/sprint-{N}-{description}/sprint-plan.md`
- **PRD**: `docs/product/prd.md` (updated when GD provides feedback)
- **WHITEBOARD**: `docs/tmux/quiz_game_team/WHITEBOARD.md` (PM updates frequently)

---

## Team Setup

### Initial Setup

```bash
# 1. Ensure tm-send is in PATH
which tm-send  # Should output: /Users/yourusername/.local/bin/tm-send

# 2. Run setup script
cd /Users/sonph36/dev/education/ontap
bash docs/tmux/quiz_game_team/setup-team.sh

# 3. Script will:
#    - Create tmux session 'quiz_game_team'
#    - Create 4 panes (PM, GD, FE, CR)
#    - Get pane IDs
#    - Update all prompt files with correct IDs
#    - Start Claude Code in each pane
#    - Initialize roles via /init-role command

# 4. Attach to session
tmux attach -t quiz_game_team
```

### Session Management

```bash
# List sessions
tmux list-sessions

# Attach to existing session
tmux attach -t quiz_game_team

# Detach from session (keep running)
# Inside tmux: Ctrl+b, then d

# Kill session (stop team)
tmux kill-session -t quiz_game_team

# List panes and roles
tmux list-panes -t quiz_game_team -F "#{pane_id} #{@role_name} #{pane_title}"
```

### Verify Setup

After setup completes:

1. **Check pane IDs**: `tmux list-panes -F "#{pane_id} #{@role_name}"`
2. **Read WHITEBOARD**: All agents should read WHITEBOARD to verify pane IDs
3. **Test communication**: PM sends test message to each agent
4. **Ready indicator**: All agents report "Ready" status to PM

---

## Session Resumption

**After tmux compact or restart**, each agent should:

1. **Read WHITEBOARD**: `docs/tmux/quiz_game_team/WHITEBOARD.md`
   - Current sprint status
   - Last completed tasks
   - Recent communication

2. **Read Your Role Prompt**: `docs/tmux/quiz_game_team/prompts/{ROLE}_PROMPT.md`
   - Responsibilities
   - Communication protocol

3. **Verify Pane IDs**: `tmux list-panes -F "#{pane_id} #{@role_name}"`
   - Confirm pane IDs match WHITEBOARD
   - Update if changed (rare but possible)

4. **Check Git History**: `git log --oneline -10`
   - What was last completed?
   - Where did we leave off?

5. **Resume Work**: Continue from "Next Steps" in WHITEBOARD

**Hook Support**: `post_compact_tmux_reminder.sh` automatically reminds agents to follow these steps after SessionStart event.

---

## Boss Terminal (Human User)

The Boss operates from a **separate terminal outside tmux** (typically where a Claude Code instance assists Boss).

### Boss Communication

When Boss types `>>> [message]`, it's sent to PM with prefix:
```
BOSS [HH:MM]: [original_message]
```

**Implementation**: Uses `tm-send` command to send to PM pane (%0):
```bash
tm-send quiz_game_team:0.0 "BOSS [$(date +%H:%M)]: start sprint 1"
```

### Boss Responsibilities

1. **Provide sprint ideas** to PM (before step 1)
2. **Do NOT intervene during steps 1-10** (let team self-coordinate)
3. **Review after step 10**: Sprint summary from PM
4. **Approve or reject**: Based on deliverables, Git commits, CR approval
5. **Prioritize next sprint**: Guide team direction

### Boss Commands

```bash
# Send message to PM
tm-send quiz_game_team:0.0 "BOSS [$(date +%H:%M)]: your message here"

# View PM output
tmux capture-pane -t quiz_game_team:0.0 -p | tail -50

# View WHITEBOARD
cat docs/tmux/quiz_game_team/WHITEBOARD.md

# Check Git progress
git log --oneline -10

# Attach to session (observe all agents)
tmux attach -t quiz_game_team
```

---

## Best Practices

### For All Agents

1. **PM is Hub**: All communication flows through PM
2. **WHITEBOARD is Truth**: PM maintains, all agents reference
3. **Git is Progress**: Commits prove work, not chat logs
4. **Use tm-send**: ALWAYS use `tm-send` command (never raw tmux send-keys)
5. **Update-Then-Notify**: Write files before notifying
6. **Subject-Agnostic**: Test with multiple question sets
7. **Progressive Development**: MVP → features → polish
8. **Read Specifications**: Don't guess, read docs
9. **Ask When Unclear**: Better to clarify than implement wrong
10. **Trust But Verify**: Check claims independently

### For PM Specifically

- Update WHITEBOARD after every major event
- Verify FE progress via Git commits
- Run tests independently (don't just trust FE report)
- Keep Communication Log to last 15 messages
- Archive completed sprints to keep WHITEBOARD focused

### For FE Specifically

- Commit every 30-60 minutes (small, incremental)
- Test before committing
- All tests must pass before notifying PM
- Manual test the game (actually play it!)
- Request clarifications early (don't guess)

### For CR Specifically

- Be constructive, not critical
- Distinguish critical vs. nice-to-have
- Provide examples with feedback
- Test thoroughly (run tests + manual + edge cases)
- Document reviews in docs/reviews/

### For GD Specifically

- Research-backed decisions (cite docs/research-game-research.md)
- Subject-agnostic designs (works for any subject)
- Child-centric (ages 8-12)
- Clear specs for FE (no ambiguity)
- Balance fun with feasibility

---

## Troubleshooting

### Pane IDs Changed After Restart

Rare, but if it happens:

1. Get new pane IDs: `tmux list-panes -F "#{pane_id} #{@role_name}"`
2. Update WHITEBOARD with new IDs
3. Update prompt files (or re-run setup-team.sh)
4. Notify all agents to re-read WHITEBOARD

### Agent Not Receiving Messages

1. Verify pane ID is correct: `tmux list-panes`
2. Ensure using `tm-send` command (not raw tmux send-keys)
3. Check if agent's Claude Code is active (not crashed)
4. Verify message format (no typos in pane ID)
5. Try manual send: `tm-send {pane_id} "test message"`

### Session Compacted/Lost Context

This is normal with Claude Code. The `post_compact_tmux_reminder.sh` hook helps recovery:

1. Agent reads WHITEBOARD for current status
2. Agent reads own role prompt
3. Agent checks Git commits for recent work
4. Agent continues from "Next Steps"

### Tests Failing

FE should:
1. Fix tests immediately (don't notify PM with failing tests)
2. If stuck, ask PM for clarification
3. PM may consult with GD about design issue

---

## Success Metrics

### Sprint Success

- ✅ Tests passing (100%)
- ✅ Git commits show progressive development
- ✅ Code Review approved by CR
- ✅ Works for multiple subjects (history, math, literature)
- ✅ Meets GD specifications exactly
- ✅ No critical bugs
- ✅ Boss approves deliverables

### Team Health

- ✅ All agents responsive
- ✅ Communication flowing through PM
- ✅ WHITEBOARD up-to-date
- ✅ No long-term blockers
- ✅ Progressive commits every hour
- ✅ Clear specifications before implementation
- ✅ Review loop efficient (< 2 iterations)

---

## Resources

- **Role Prompts**: `docs/tmux/quiz_game_team/prompts/`
- **WHITEBOARD**: `docs/tmux/quiz_game_team/WHITEBOARD.md`
- **Research**: `docs/research-game-research.md`
- **Specs**: `docs/specs/` (PM creates during sprints)
- **Reviews**: `docs/reviews/` (CR creates during reviews)
- **Global tm-send**: `~/.local/bin/tm-send`

---

## Ready to Start

1. **Run setup script**: `bash docs/tmux/quiz_game_team/setup-team.sh`
2. **Verify setup**: All agents report "Ready"
3. **BOSS provides first sprint idea** to PM
4. **Team executes 10-step workflow**
5. **Progressive development** with frequent commits
6. **CR reviews and approves**
7. **BOSS reviews sprint summary** and approves
8. **Repeat for next sprint**

**Remember**: PM is the central nervous system. WHITEBOARD is the team memory. Git commits are the truth. Communication flows through PM. Progressive development proves progress. Trust the process.

Good luck building an amazing educational game! 🎮📚
