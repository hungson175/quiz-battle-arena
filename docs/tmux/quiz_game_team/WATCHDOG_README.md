# Watchdog - Auto-Reminder for Quiz Game Team

The watchdog is an automated monitoring system that sends periodic reminders to the PM to keep the team active, especially when Boss is away.

## What It Does

Every **15 minutes**, the watchdog sends a reminder message to PM (pane %12) with the following:

- Read your PM prompt and team README
- Remind all other roles to read their prompts
- Check if any agent is stuck (missing 2nd enter)
- Continue working autonomously
- Use tm-send command for tmux messages

## Quick Commands

```bash
# Start watchdog
bash docs/tmux/quiz_game_team/watchdog-control.sh start

# Check status
bash docs/tmux/quiz_game_team/watchdog-control.sh status

# View logs
bash docs/tmux/quiz_game_team/watchdog-control.sh logs

# Stop watchdog
bash docs/tmux/quiz_game_team/watchdog-control.sh stop

# Restart watchdog
bash docs/tmux/quiz_game_team/watchdog-control.sh restart
```

## How It Works

1. **Tmux Session**: Runs in separate tmux session `watchdog-edu-game`
2. **Loop**: Infinite loop with 15-minute sleep intervals
3. **Message**: Sends comprehensive reminder to PM using `tm-send` command
4. **Logging**: Logs each reminder with timestamp

## Message Content

The watchdog sends this message to PM every 15 minutes:

```
AUTO-REMINDER [HH:MM]: Boss is away, you are the PM. Read your .md prompt
(docs/tmux/quiz_game_team/prompts/PM_PROMPT.md) and team's README
(docs/tmux/quiz_game_team/README.md) to understand your role. Remind all
other roles to read README & their own .md role prompts. Continue to work
please, I trust your decision. Check all other roles - if someone is stuck
because we forgot to send 2nd enter, then send enter. Remember to remind
them to send tmux messages using tm-send (not the original tmux command).
```

## Files

- `watchdog-start.sh` - Main watchdog script (runs the loop)
- `watchdog-control.sh` - Control script (start/stop/status)
- `WATCHDOG_README.md` - This file

## When to Use

**Start watchdog when**:
- You need to step away for extended period
- Team is working autonomously on sprint
- You want to ensure PM stays active and coordinated

**Stop watchdog when**:
- You're actively monitoring the team
- Sprint is complete and team is idle
- Debugging team communication issues

## Viewing Live Logs

To see the watchdog in action:

```bash
# Attach to watchdog session (read-only view)
tmux attach -t watchdog-edu-game

# Detach: Ctrl+b, then d
```

You'll see:
- Startup message with configuration
- Timestamp of each reminder sent
- Success/failure status for each send

## Troubleshooting

### "Watchdog not running"

**Check tmux sessions**:
```bash
tmux list-sessions | grep watchdog-edu-game
```

**Start manually**:
```bash
bash docs/tmux/quiz_game_team/watchdog-control.sh start
```

### "Failed to send reminder"

**Check if quiz_game_team session exists**:
```bash
tmux list-sessions | grep quiz_game_team
```

**Verify PM pane ID**:
```bash
tmux list-panes -t quiz_game_team -F "#{pane_id} #{@role_name}"
# Should show: %12 PM (or similar)
```

**Check tm-send is installed**:
```bash
which tm-send
# Should output: /Users/yourname/.local/bin/tm-send
```

### Reminders too frequent/infrequent

Edit interval in `watchdog-start.sh`:
```bash
INTERVAL=900  # Change this (in seconds)
# 900 = 15 minutes
# 1800 = 30 minutes
# 600 = 10 minutes
```

Then restart:
```bash
bash docs/tmux/quiz_game_team/watchdog-control.sh restart
```

## Integration with Team Workflow

The watchdog complements the team workflow by:

1. **Preventing PM from going idle** after compacts/restarts
2. **Reminding PM of their coordination role**
3. **Ensuring all agents stay active** via PM delegation
4. **Catching stuck agents** (missing 2nd enter)
5. **Promoting use of tm-send** command

**Note**: Watchdog sends to PM only. PM is responsible for delegating to other agents.

## Monitoring Watchdog Activity

### Check Last Reminder Time

```bash
bash docs/tmux/quiz_game_team/watchdog-control.sh logs | tail -5
```

### Calculate Next Reminder

If last reminder was at `14:30`, next reminder will be at `14:45` (15 minutes later).

### Verify PM Received Message

```bash
# Check PM pane output
tmux capture-pane -t quiz_game_team:0.0 -p | grep "AUTO-REMINDER"
```

## Best Practices

1. **Start watchdog when leaving**: `bash docs/tmux/quiz_game_team/watchdog-control.sh start`
2. **Check status occasionally**: See if reminders are being sent
3. **Review PM responses**: Check WHITEBOARD to see if PM is acting on reminders
4. **Stop when back**: No need for reminders when Boss is active
5. **Adjust interval if needed**: 15 min default, but customize per needs

## Example Usage

### Scenario: Boss Steps Away for Lunch

```bash
# Before leaving
bash docs/tmux/quiz_game_team/watchdog-control.sh start

# Go to lunch (1 hour)
# Watchdog sends 4 reminders during this time (every 15 min)

# After returning
bash docs/tmux/quiz_game_team/watchdog-control.sh status
# Check logs to see reminders sent

# Optionally stop
bash docs/tmux/quiz_game_team/watchdog-control.sh stop
```

### Scenario: Overnight Sprint

```bash
# Before bed
bash docs/tmux/quiz_game_team/watchdog-control.sh start

# Team works overnight with reminders every 15 minutes

# Next morning
bash docs/tmux/quiz_game_team/watchdog-control.sh logs
# Review what happened overnight

cat docs/tmux/quiz_game_team/WHITEBOARD.md
# Check PM's progress updates
```

## Summary

✅ **Automated**: Runs independently in tmux session
✅ **Periodic**: Sends reminders every 15 minutes
✅ **Comprehensive**: Reminds PM of all responsibilities
✅ **Logged**: Timestamps every reminder
✅ **Easy Control**: Simple start/stop/status commands
✅ **Safe**: Only sends to PM, doesn't interfere with workflow

The watchdog ensures your Quiz Game Team stays active and productive even when you're away! 🐕🎮📚
