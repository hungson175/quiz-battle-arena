#!/bin/bash
# Quiz Game Team - Automated Setup Script
# This script sets up a tmux session with 4 Claude Code instances

set -e  # Exit on error

PROJECT_ROOT="/Users/sonph36/dev/education/ontap"
SESSION_NAME="quiz_game_team"
PROMPTS_DIR="$PROJECT_ROOT/docs/tmux/quiz_game_team/prompts"

echo "Starting Quiz Game Team Setup..."

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

# 2. Start new tmux session in detached mode
echo "Creating tmux session '$SESSION_NAME'..."
cd "$PROJECT_ROOT"
tmux new-session -d -s $SESSION_NAME

# 3. Create 4-pane horizontal layout
echo "Creating 4-pane layout..."
tmux split-window -h -t $SESSION_NAME  # Split into 2 panes
tmux split-window -h -t $SESSION_NAME  # Split right pane into 2 (now 3 panes)
tmux split-window -h -t $SESSION_NAME  # Split rightmost into 2 (now 4 panes)
tmux select-layout -t $SESSION_NAME even-horizontal  # Even distribution

# 4. Set pane titles (visual) and @role_name (stable)
echo "Setting pane roles..."
tmux select-pane -t $SESSION_NAME:0.0 -T "PM"
tmux select-pane -t $SESSION_NAME:0.1 -T "GD"
tmux select-pane -t $SESSION_NAME:0.2 -T "FE"
tmux select-pane -t $SESSION_NAME:0.3 -T "CR"

# CRITICAL: Set stable @role_name options (won't be overwritten by Claude Code)
tmux set-option -p -t $SESSION_NAME:0.0 @role_name "PM"
tmux set-option -p -t $SESSION_NAME:0.1 @role_name "GD"
tmux set-option -p -t $SESSION_NAME:0.2 @role_name "FE"
tmux set-option -p -t $SESSION_NAME:0.3 @role_name "CR"

# 5. Get pane IDs FIRST (before starting Claude Code)
echo "Getting pane IDs..."
PANE_IDS=$(tmux list-panes -t $SESSION_NAME -F "#{pane_id}")
PM_PANE=$(echo "$PANE_IDS" | sed -n '1p')
GD_PANE=$(echo "$PANE_IDS" | sed -n '2p')
FE_PANE=$(echo "$PANE_IDS" | sed -n '3p')
CR_PANE=$(echo "$PANE_IDS" | sed -n '4p')

echo "Pane IDs:"
echo "  PM: $PM_PANE"
echo "  GD: $GD_PANE"
echo "  FE: $FE_PANE"
echo "  CR: $CR_PANE"

# 6. Update ALL prompt files with pane IDs BEFORE starting Claude Code
echo "Updating prompt files with pane IDs..."

# Update PM prompt with all agent pane IDs
sed -i.bak "s/%GD_PANE_ID\` = %[0-9]*/%GD_PANE_ID\` = $GD_PANE/g" "$PROMPTS_DIR/PM_PROMPT.md"
sed -i.bak "s/%FE_PANE_ID\` = %[0-9]*/%FE_PANE_ID\` = $FE_PANE/g" "$PROMPTS_DIR/PM_PROMPT.md"
sed -i.bak "s/%CR_PANE_ID\` = %[0-9]*/%CR_PANE_ID\` = $CR_PANE/g" "$PROMPTS_DIR/PM_PROMPT.md"

# Update GD, FE, CR prompts with PM pane ID and tm-send patterns
for role in GD FE CR; do
    sed -i.bak "s/%PM_PANE_ID\` = %[0-9]*/%PM_PANE_ID\` = $PM_PANE/g" "$PROMPTS_DIR/${role}_PROMPT.md"
    sed -i.bak "s/tm-send %[0-9]*/tm-send $PM_PANE/g" "$PROMPTS_DIR/${role}_PROMPT.md"
done

# Update WHITEBOARD with pane IDs
if [ -f "$PROJECT_ROOT/docs/tmux/quiz_game_team/WHITEBOARD.md" ]; then
    sed -i.bak "s/| PM   | %[0-9]*  |/| PM   | $PM_PANE  |/g" "$PROJECT_ROOT/docs/tmux/quiz_game_team/WHITEBOARD.md"
    sed -i.bak "s/| GD   | %[0-9]*  |/| GD   | $GD_PANE  |/g" "$PROJECT_ROOT/docs/tmux/quiz_game_team/WHITEBOARD.md"
    sed -i.bak "s/| FE   | %[0-9]*  |/| FE   | $FE_PANE  |/g" "$PROJECT_ROOT/docs/tmux/quiz_game_team/WHITEBOARD.md"
    sed -i.bak "s/| CR   | %[0-9]*  |/| CR   | $CR_PANE  |/g" "$PROJECT_ROOT/docs/tmux/quiz_game_team/WHITEBOARD.md"
fi

# Clean up backup files
rm -f "$PROMPTS_DIR"/*.bak
rm -f "$PROJECT_ROOT/docs/tmux/quiz_game_team"/*.bak

echo "All pane IDs updated"

# 7. Start Claude Code in each pane
echo "Starting Claude Code in all panes..."
tmux send-keys -t $SESSION_NAME:0.0 "cd $PROJECT_ROOT && claude" C-m
sleep 1
tmux send-keys -t $SESSION_NAME:0.1 "cd $PROJECT_ROOT && claude" C-m
sleep 1
tmux send-keys -t $SESSION_NAME:0.2 "cd $PROJECT_ROOT && claude" C-m
sleep 1
tmux send-keys -t $SESSION_NAME:0.3 "cd $PROJECT_ROOT && claude" C-m

# 8. Wait for Claude Code to initialize
echo "Waiting 25 seconds for Claude Code initialization..."
sleep 25

# 9. Check if tm-send is available
if ! command -v tm-send &> /dev/null; then
    echo ""
    echo "WARNING: 'tm-send' command not found in PATH!"
    echo "Please install tm-send to ~/.local/bin/tm-send"
    echo "See docs/tmux/quiz_game_team/README.md for instructions"
    echo ""
    echo "Continuing with manual initialization instructions..."
    echo ""
    echo "After Claude Code finishes initializing, manually run in each pane:"
    echo "  Pane 0 (PM): /init-role PM"
    echo "  Pane 1 (GD): /init-role GD"
    echo "  Pane 2 (FE): /init-role FE"
    echo "  Pane 3 (CR): /init-role CR"
    echo ""
else
    # 9. Initialize roles using tm-send (CRITICAL: must be in PATH)
    echo "Initializing agent roles..."
    tm-send $SESSION_NAME:0.0 "/init-role PM"
    sleep 3
    tm-send $SESSION_NAME:0.1 "/init-role GD"
    sleep 3
    tm-send $SESSION_NAME:0.2 "/init-role FE"
    sleep 3
    tm-send $SESSION_NAME:0.3 "/init-role CR"
    sleep 3

    # 10. Wait for role initialization
    echo "Waiting 15 seconds for role initialization..."
    sleep 15
fi

# 11. Summary
echo ""
echo "════════════════════════════════════════════"
echo "  Quiz Game Team Setup Complete!"
echo "════════════════════════════════════════════"
echo ""
echo "Session: $SESSION_NAME"
echo ""
echo "Pane Layout:"
echo "  ┌──────┬──────┬──────┬──────┐"
echo "  │  PM  │  GD  │  FE  │  CR  │"
echo "  │  $PM_PANE │ $GD_PANE │ $FE_PANE │ $CR_PANE │"
echo "  └──────┴──────┴──────┴──────┘"
echo ""
echo "Attach: tmux attach -t $SESSION_NAME"
echo ""
echo "Next Steps:"
echo "1. Attach to session: tmux attach -t $SESSION_NAME"
echo "2. Verify all agents show 'Ready' status"
echo "3. Check WHITEBOARD: cat docs/tmux/quiz_game_team/WHITEBOARD.md"
echo "4. From Boss terminal, send first sprint idea:"
echo "   tm-send $SESSION_NAME:0.0 \"BOSS [\$(date +%H:%M)]: [your sprint idea]\""
echo ""
echo "Happy coding! 🎮📚"
echo ""
