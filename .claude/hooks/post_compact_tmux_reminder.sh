#!/bin/bash
cat <<'EOF'
{
  "hookSpecificOutput": {
    "hookEventName": "SessionStart",
    "additionalContext": "If in tmux team session:\n\n1. Re-read team overview: docs/tmux/quiz-game/workflow.md\n2. Re-read your role prompt from docs/tmux/quiz-game/prompts/\n3. Check WHITEBOARD for current status: docs/tmux/quiz-game/WHITEBOARD.md\n4. Verify tmux pane IDs in PANE_ROLES.md\n5. Continue previous task"
  }
}
EOF
exit 0
