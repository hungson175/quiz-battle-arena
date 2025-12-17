#!/bin/bash
# Watchdog Control Script - Manage the Quiz Game Team Watchdog

SESSION_NAME="watchdog-edu-game"
SCRIPT_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/watchdog-start.sh"

case "$1" in
    start)
        echo "Starting watchdog..."
        if tmux has-session -t "$SESSION_NAME" 2>/dev/null; then
            echo "❌ Watchdog already running!"
            echo "   View: tmux attach -t $SESSION_NAME"
            echo "   Stop: $0 stop"
            exit 1
        fi

        # Create new tmux session running watchdog
        tmux new-session -d -s "$SESSION_NAME" "bash '$SCRIPT_PATH'"

        echo "✅ Watchdog started in tmux session: $SESSION_NAME"
        echo ""
        echo "The watchdog will send reminders to PM every 15 minutes."
        echo ""
        echo "Commands:"
        echo "  View logs:  tmux attach -t $SESSION_NAME"
        echo "  Stop:       $0 stop"
        echo "  Status:     $0 status"
        ;;

    stop)
        echo "Stopping watchdog..."
        if ! tmux has-session -t "$SESSION_NAME" 2>/dev/null; then
            echo "❌ Watchdog not running!"
            exit 1
        fi

        tmux kill-session -t "$SESSION_NAME"
        echo "✅ Watchdog stopped"
        ;;

    restart)
        echo "Restarting watchdog..."
        $0 stop
        sleep 1
        $0 start
        ;;

    status)
        if tmux has-session -t "$SESSION_NAME" 2>/dev/null; then
            echo "✅ Watchdog is RUNNING"
            echo ""
            echo "Session: $SESSION_NAME"
            echo ""
            echo "Recent activity:"
            tmux capture-pane -t "$SESSION_NAME" -p | tail -10
            echo ""
            echo "Commands:"
            echo "  View logs:  tmux attach -t $SESSION_NAME"
            echo "  Stop:       $0 stop"
        else
            echo "❌ Watchdog is NOT running"
            echo ""
            echo "Start with: $0 start"
        fi
        ;;

    logs)
        if ! tmux has-session -t "$SESSION_NAME" 2>/dev/null; then
            echo "❌ Watchdog not running!"
            exit 1
        fi

        echo "Watchdog logs (last 30 lines):"
        echo "────────────────────────────────────────────"
        tmux capture-pane -t "$SESSION_NAME" -p -S -30
        echo "────────────────────────────────────────────"
        echo ""
        echo "Live view: tmux attach -t $SESSION_NAME"
        ;;

    *)
        echo "Quiz Game Team Watchdog Control"
        echo ""
        echo "Usage: $0 {start|stop|restart|status|logs}"
        echo ""
        echo "Commands:"
        echo "  start    - Start the watchdog (sends PM reminders every 15 min)"
        echo "  stop     - Stop the watchdog"
        echo "  restart  - Restart the watchdog"
        echo "  status   - Check if watchdog is running"
        echo "  logs     - View recent watchdog logs"
        echo ""
        exit 1
        ;;
esac
