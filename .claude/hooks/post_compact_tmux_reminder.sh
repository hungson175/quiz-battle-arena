#!/bin/bash
# Post-Compact Tmux Reminder Hook
# Triggered on SessionStart to help agents recover context after compacts

# Check if we're in a tmux session
if [ -z "$TMUX" ]; then
    # Not in tmux, skip hook
    exit 0
fi

# Get current session name
SESSION_NAME=$(tmux display-message -p '#S')

# Only trigger for quiz_game_team session
if [ "$SESSION_NAME" != "quiz_game_team" ]; then
    exit 0
fi

# Output reminder in JSON format for Claude Code
cat <<'EOF'
{
  "hookSpecificOutput": {
    "hookEventName": "SessionStart",
    "additionalContext": "🔄 Session Resumed - Quiz Game Team\n\nYou are part of the Quiz Game Team multi-agent system. After a compact/restart, follow these steps:\n\n1️⃣ Re-read team overview:\n   docs/tmux/quiz_game_team/README.md\n\n2️⃣ Re-read your role prompt:\n   docs/tmux/quiz_game_team/prompts/{YOUR_ROLE}_PROMPT.md\n\n3️⃣ Check WHITEBOARD for current status:\n   docs/tmux/quiz_game_team/WHITEBOARD.md\n   - Current sprint and phase\n   - Your pending tasks\n   - Recent communication\n\n4️⃣ Verify tmux pane IDs:\n   tmux list-panes -F '#{pane_id} #{@role_name}'\n   - Confirm your communication targets are correct\n\n5️⃣ Review recent Git commits:\n   git log --oneline -10\n   - What was last completed?\n\n6️⃣ Continue from 'Next Steps' in WHITEBOARD\n\nRemember:\n✓ All communication through PM (use tm-send command)\n✓ Git commits are truth\n✓ WHITEBOARD is team memory\n✓ Subject-agnostic requirement is CRITICAL\n\nReady to resume work! 🎮📚"
  }
}
EOF

exit 0
