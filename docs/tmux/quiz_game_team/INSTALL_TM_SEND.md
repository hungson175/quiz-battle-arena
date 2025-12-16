# Installing tm-send Command (REQUIRED)

The `tm-send` command is **required** for reliable tmux communication in the Quiz Game Team. It enforces the critical "two-enter rule" for Claude Code message delivery.

## Why tm-send is Required

Claude Code in tmux panes requires **two separate Enter commands** to process messages:
1. First Enter: Submits the text
2. Second Enter: Triggers message processing

Combined Enters (`C-m C-m`) fail silently. The `tm-send` wrapper automates proper delivery.

---

## Installation Steps

### 1. Create the tm-send Script

```bash
# Create directory if it doesn't exist
mkdir -p ~/.local/bin

# Create the tm-send script
cat > ~/.local/bin/tm-send << 'EOF'
#!/bin/bash
# tm-send - Tmux send-keys wrapper with automatic two-enter rule
# Usage: tm-send <pane_id> "message"

if [ $# -lt 2 ]; then
    echo "Usage: tm-send <pane_id> \"message\""
    echo "Example: tm-send %26 \"PM -> FE: Please implement feature X\""
    exit 1
fi

PANE_ID="$1"
MESSAGE="$2"

# Send the message with first Enter
tmux send-keys -t "$PANE_ID" "$MESSAGE" C-m

# CRITICAL: Wait before sending second Enter (too fast = ignored)
sleep 0.3

# Send the second Enter
tmux send-keys -t "$PANE_ID" C-m
EOF

# Make it executable
chmod +x ~/.local/bin/tm-send
```

### 2. Add to PATH (if not already)

Check if `~/.local/bin` is in your PATH:

```bash
echo $PATH | grep -q "$HOME/.local/bin" && echo "✅ Already in PATH" || echo "❌ Not in PATH"
```

If not in PATH, add it to your shell configuration:

**For Bash** (`~/.bashrc` or `~/.bash_profile`):
```bash
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

**For Zsh** (`~/.zshrc`):
```bash
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

### 3. Verify Installation

```bash
# Check tm-send is available
which tm-send
# Should output: /Users/yourusername/.local/bin/tm-send

# Test it (if you have a tmux session)
tm-send %0 "test message"
```

---

## Usage Examples

### Basic Usage
```bash
# Send message to pane %26
tm-send %26 "PM [10:30]: Sprint 1 assigned. See docs/specs/sprint-1.md"
```

### With Session Name
```bash
# Send to specific session and pane
tm-send quiz_game_team:0.0 "BOSS [14:30]: Start implementing the core game loop"
```

### From Boss Terminal
```bash
# Send message from Boss to PM
tm-send quiz_game_team:0.0 "BOSS [$(date +%H:%M)]: your message here"
```

### In Scripts
```bash
#!/bin/bash
PM_PANE="%26"

# Send multiple messages
tm-send $PM_PANE "GD [10:00]: Design complete. See docs/specs/game-mechanics-design.md"
sleep 2
tm-send $PM_PANE "GD [10:01]: Ready for FE assignment."
```

---

## Troubleshooting

### "command not found: tm-send"

**Problem**: `tm-send` not in PATH

**Solution**:
```bash
# Check if file exists
ls -l ~/.local/bin/tm-send

# Check PATH
echo $PATH | grep "$HOME/.local/bin"

# If PATH is correct but still not working, reload shell
source ~/.zshrc  # or ~/.bashrc
```

### "Permission denied"

**Problem**: Script not executable

**Solution**:
```bash
chmod +x ~/.local/bin/tm-send
```

### Messages not being received

**Problem**: Pane ID incorrect or Claude Code not running

**Solution**:
```bash
# Verify pane exists
tmux list-panes -t quiz_game_team

# Check pane ID format (should be %NN like %26, %27)
# Try sending to correct pane

# Verify Claude Code is running in target pane
tmux capture-pane -t %26 -p | tail -20
```

---

## Alternative: Manual Two-Enter (Not Recommended)

If you can't install `tm-send`, you must manually enforce two-enter rule:

```bash
# Send message
tmux send-keys -t %26 "PM [10:30]: message" C-m

# WAIT (critical!)
sleep 0.3

# Send second Enter
tmux send-keys -t %26 C-m
```

**Why this is bad**: Easy to forget, error-prone, scripts become complex.

---

## Verification Test

After installation, test with a running quiz_game_team session:

```bash
# 1. Start team (if not running)
bash docs/tmux/quiz_game_team/setup-team.sh

# 2. Wait for initialization (30 seconds)
sleep 30

# 3. Send test message to PM
tm-send quiz_game_team:0.0 "System: tm-send installation test"

# 4. Verify message was received
tmux capture-pane -t quiz_game_team:0.0 -p | tail -20
# You should see your test message
```

---

## Summary

✅ Install `tm-send` to `~/.local/bin/`
✅ Make it executable (`chmod +x`)
✅ Ensure `~/.local/bin` in PATH
✅ Test with `which tm-send`
✅ Use in all tmux communications for Quiz Game Team

**This is required for the team to function correctly!**
