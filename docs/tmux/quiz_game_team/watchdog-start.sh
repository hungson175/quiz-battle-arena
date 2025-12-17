#!/bin/bash
# Watchdog for Quiz Game Team - Sends periodic reminders to PM
# This ensures the team stays active even when Boss is away

PM_PANE="quiz_game_team:0.0"  # PM pane in quiz_game_team session
INTERVAL=900  # 15 minutes (900 seconds)

echo "════════════════════════════════════════════"
echo "  Quiz Game Team Watchdog Started"
echo "════════════════════════════════════════════"
echo ""
echo "PM Pane: $PM_PANE"
echo "Interval: $INTERVAL seconds (15 minutes)"
echo "Started: $(date '+%Y-%m-%d %H:%M:%S')"
echo ""
echo "Watchdog will send reminders to PM every 15 minutes."
echo "Press Ctrl+C to stop (or kill tmux session)"
echo ""
echo "────────────────────────────────────────────"

while true; do
    # Wait 15 minutes
    sleep $INTERVAL

    # Get current timestamp
    TIMESTAMP=$(date +%H:%M)

    # Construct reminder message
    MESSAGE="AUTO-REMINDER [$TIMESTAMP]: Boss is away, you are the PM. Read your .md prompt (docs/tmux/quiz_game_team/prompts/PM_PROMPT.md) and team's README (docs/tmux/quiz_game_team/README.md) to understand your role. Remind all other roles to read README & their own .md role prompts. Continue to work please, I trust your decision. Check all other roles - if someone is stuck because we forgot to send 2nd enter, then send enter. Remember to remind them to send tmux messages using tm-send (not the original tmux command)."

    # Send reminder to PM using tm-send
    if tm-send "$PM_PANE" "$MESSAGE" 2>/dev/null; then
        echo "[$(date '+%Y-%m-%d %H:%M:%S')] ✅ Sent reminder to PM"
    else
        echo "[$(date '+%Y-%m-%d %H:%M:%S')] ❌ Failed to send reminder (is quiz_game_team session running?)"
    fi
done
