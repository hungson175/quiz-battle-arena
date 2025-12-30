#!/bin/bash

# Quiz Game Team - Automated Setup Script
# Creates a tmux session with 6 Claude Code instances (PO, SM, GD, TL, DEV, QA)

set -e  # Exit on error

PROJECT_ROOT="${PROJECT_ROOT:-/home/hungson175/dev/quiz-battle-arena}"
SESSION_NAME="${SESSION_NAME:-quiz_game}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROMPTS_DIR="$SCRIPT_DIR/prompts"

echo "Starting Quiz Game Team Setup..."
echo "Project Root: $PROJECT_ROOT"
echo "Session Name: $SESSION_NAME"

# 1. Check if session already exists
if tmux has-session -t $SESSION_NAME 2>/dev/null; then
    echo "Session '$SESSION_NAME' already exists!"
    read -p "Kill existing session and create new one? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        tmux kill-session -t $SESSION_NAME
        echo "Killed existing session"
    else
        echo "Aborted. Use 'tmux attach -t $SESSION_NAME' to attach"
        exit 0
    fi
fi

# 2. Start new tmux session
echo "Creating tmux session '$SESSION_NAME'..."
cd "$PROJECT_ROOT"
tmux new-session -d -s $SESSION_NAME

# 3. Create 6-pane layout
echo "Creating 6-pane layout..."
tmux split-window -h -t $SESSION_NAME
tmux split-window -h -t $SESSION_NAME
tmux split-window -h -t $SESSION_NAME
tmux split-window -h -t $SESSION_NAME
tmux split-window -h -t $SESSION_NAME
tmux select-layout -t $SESSION_NAME even-horizontal

# 4. Resize for proper pane widths
echo "Resizing window..."
tmux resize-window -t $SESSION_NAME -x 600 -y 50

# 5. Set pane titles and role names
tmux select-pane -t $SESSION_NAME:0.0 -T "PO"
tmux select-pane -t $SESSION_NAME:0.1 -T "SM"
tmux select-pane -t $SESSION_NAME:0.2 -T "GD"
tmux select-pane -t $SESSION_NAME:0.3 -T "TL"
tmux select-pane -t $SESSION_NAME:0.4 -T "DEV"
tmux select-pane -t $SESSION_NAME:0.5 -T "QA"

tmux set-option -p -t $SESSION_NAME:0.0 @role_name "PO"
tmux set-option -p -t $SESSION_NAME:0.1 @role_name "SM"
tmux set-option -p -t $SESSION_NAME:0.2 @role_name "GD"
tmux set-option -p -t $SESSION_NAME:0.3 @role_name "TL"
tmux set-option -p -t $SESSION_NAME:0.4 @role_name "DEV"
tmux set-option -p -t $SESSION_NAME:0.5 @role_name "QA"

# 6. Get pane IDs
echo "Getting pane IDs..."
PANE_IDS=$(tmux list-panes -t $SESSION_NAME -F "#{pane_id}")
PO_PANE=$(echo "$PANE_IDS" | sed -n '1p')
SM_PANE=$(echo "$PANE_IDS" | sed -n '2p')
GD_PANE=$(echo "$PANE_IDS" | sed -n '3p')
TL_PANE=$(echo "$PANE_IDS" | sed -n '4p')
DEV_PANE=$(echo "$PANE_IDS" | sed -n '5p')
QA_PANE=$(echo "$PANE_IDS" | sed -n '6p')

echo "Pane IDs:"
echo "  PO (Pane 0): $PO_PANE"
echo "  SM (Pane 1): $SM_PANE"
echo "  GD (Pane 2): $GD_PANE"
echo "  TL (Pane 3): $TL_PANE"
echo "  DEV (Pane 4): $DEV_PANE"
echo "  QA (Pane 5): $QA_PANE"

# 7. Verify tm-send is installed globally (dynamic role lookup, no PANE_ROLES.md needed)
echo "Verifying tm-send..."
if ! command -v tm-send >/dev/null 2>&1; then
    echo "ERROR: tm-send is not installed!"
    echo "tm-send is a GLOBAL tool at ~/.local/bin/tm-send"
    echo "Install it first, then re-run this script."
    exit 1
fi
echo "tm-send is installed at: $(which tm-send)"
echo "Role lookup uses @role_name pane options (dynamic, no PANE_ROLES.md needed)"

# 9. Start Claude Code in each pane
echo "Starting Claude Code in all panes..."
tmux send-keys -t $SESSION_NAME:0.0 "cd $PROJECT_ROOT && claude" C-m
tmux send-keys -t $SESSION_NAME:0.1 "cd $PROJECT_ROOT && claude" C-m
tmux send-keys -t $SESSION_NAME:0.2 "cd $PROJECT_ROOT && claude" C-m
tmux send-keys -t $SESSION_NAME:0.3 "cd $PROJECT_ROOT && claude" C-m
tmux send-keys -t $SESSION_NAME:0.4 "cd $PROJECT_ROOT && claude" C-m
tmux send-keys -t $SESSION_NAME:0.5 "cd $PROJECT_ROOT && claude" C-m

# 10. Wait for Claude Code to start
echo "Waiting 20 seconds for Claude Code instances..."
sleep 20

# 11. Initialize roles (Two-Enter Rule: separate C-m commands)
echo "Initializing agent roles..."
tmux send-keys -t $SESSION_NAME:0.0 "/init-role PO" C-m
tmux send-keys -t $SESSION_NAME:0.0 C-m
sleep 2
tmux send-keys -t $SESSION_NAME:0.1 "/init-role SM" C-m
tmux send-keys -t $SESSION_NAME:0.1 C-m
sleep 2
tmux send-keys -t $SESSION_NAME:0.2 "/init-role GD" C-m
tmux send-keys -t $SESSION_NAME:0.2 C-m
sleep 2
tmux send-keys -t $SESSION_NAME:0.3 "/init-role TL" C-m
tmux send-keys -t $SESSION_NAME:0.3 C-m
sleep 2
tmux send-keys -t $SESSION_NAME:0.4 "/init-role DEV" C-m
tmux send-keys -t $SESSION_NAME:0.4 C-m
sleep 2
tmux send-keys -t $SESSION_NAME:0.5 "/init-role QA" C-m
tmux send-keys -t $SESSION_NAME:0.5 C-m

# 12. Wait for initialization
echo "Waiting 15 seconds for role initialization..."
sleep 15

# 13. Summary
echo ""
echo "Setup Complete!"
echo ""
echo "Session: $SESSION_NAME"
echo "Project: $PROJECT_ROOT"
echo ""
echo "Quiz Game Team Roles:"
echo "  +--------+--------+--------+--------+--------+--------+"
echo "  | PO     | SM     | GD     | TL     | DEV    | QA     |"
echo "  | Pane 0 | Pane 1 | Pane 2 | Pane 3 | Pane 4 | Pane 5 |"
echo "  +--------+--------+--------+--------+--------+--------+"
echo ""
echo "Team Structure:"
echo "  - PO: Product Owner (backlog, priorities)"
echo "  - SM: Scrum Master (process, improvement)"
echo "  - GD: Game Designer (domain expert)"
echo "  - TL: Tech Lead (architecture, code review)"
echo "  - DEV: Game Developer (implementation)"
echo "  - QA: Quality Assurance (testing)"
echo ""
echo "Next steps:"
echo "  1. Attach: tmux attach -t $SESSION_NAME"
echo "  2. Boss provides Sprint Goal to PO"
echo "  3. Team executes Sprint"
echo "  4. SM facilitates Retrospective"
echo ""
echo "To detach: Ctrl+B, then D"
echo "To kill: tmux kill-session -t $SESSION_NAME"
echo ""

# 14. Move cursor to PO pane
tmux select-pane -t $SESSION_NAME:0.0
echo "Cursor in Pane 0 (PO)."
