# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Quiz Battle Arena is a **tower defense game** combined with educational quizzes built with Phaser 3 and React. Players defend against enemy waves by placing towers, with money earned by answering quiz questions correctly. Wrong answers lose money. Designed for children ages 8-12.

**Key concept**: Subject-agnostic - swap the question JSON (`public/assets/data/questions.json`) to change from history to math to any subject.

## Commands

```bash
# Development server (port 3336)
npm run dev

# Run all tests
npm test

# Run single test file
npm test -- tests/zombie.test.js

# Build for production
npm run build
```

## Architecture

### Hybrid Phaser + React

The app uses a 70/30 split layout:
- **Left (70%)**: Phaser 3 game canvas - tower defense gameplay
- **Right (30%)**: React panel - quiz questions and answers

Communication between Phaser and React happens via `QuizBridge.js` using window CustomEvents.

**Important**: Do NOT use React.StrictMode - it causes double-mounting which destroys Phaser's WebGL context.

### Source Structure

```
src/
├── main.jsx             # React entry point (no StrictMode!)
├── App.jsx              # React wrapper with 70/30 layout
├── game.js              # Phaser game config and GAME_SETTINGS
├── scenes/
│   ├── MapSelectScene.js  # Map selection screen
│   ├── GameScene.js       # Main game scene - orchestrates gameplay
│   └── UIScene.js         # Phaser UI overlay (lives, money, wave)
├── entities/            # Game objects
│   ├── Tower.js           # Base tower class
│   ├── MultiShotTower.js  # Tower that shoots multiple targets
│   ├── SupportTower.js    # Buff/support tower
│   ├── Enemy.js           # Base enemy class
│   ├── HealerEnemy.js     # Heals nearby enemies
│   ├── ShieldEnemy.js     # Temporary invulnerability
│   ├── SplitEnemy.js      # Splits into smaller enemies on death
│   ├── TeleportEnemy.js   # Teleports forward on path
│   └── Projectile.js      # Tower projectiles
├── systems/             # Game systems (manager pattern)
│   ├── TowerManager.js      # Tower lifecycle and updates
│   ├── EnemyManager.js      # Enemy spawning and state
│   ├── ProjectileManager.js # Projectile movement/collisions
│   ├── WaveManager.js       # Wave progression and spawning
│   ├── EconomyManager.js    # Gold/score tracking
│   ├── CollisionManager.js  # Hit detection
│   ├── PathManager.js       # Enemy pathing
│   ├── MapManager.js        # Map loading and switching
│   ├── AudioManager.js      # Sound effects and music
│   ├── QuizManager.js       # Quiz timing and lifecycle
│   ├── QuestionManager.js   # Question loading/shuffling
│   └── QuizBridge.js        # Phaser <-> React communication
├── components/          # React components
│   └── QuizPanel.jsx      # Quiz display and answer buttons
└── hooks/
    └── useQuizEvents.js   # React hook for quiz state
```

### Key Patterns

- **Manager pattern**: Systems own entity lifecycle and Phaser graphics
- **Entity inheritance**: Specialized enemies/towers extend base classes
- **Event bridge**: Phaser emits to React via `QuizBridge.emitToReact()`, React responds via window events
- **Config-driven**: Game settings in `src/game.js` via `window.GAME_SETTINGS`

### Configuration Files

- `src/assets/config/towers.json` - Tower types, stats, upgrade paths
- `src/assets/config/waves.json` - Wave composition and timing
- `src/assets/config/extra-waves.json` - Additional waves for harder difficulties
- `public/assets/data/questions.json` - Quiz questions

## Question Data Format

```json
{
  "questions": [{
    "id": 1,
    "topic": "Topic name",
    "question": "Question text?",
    "answers": ["A", "B", "C", "D"],
    "correctIndex": 0,
    "explanation": "Why answer is correct"
  }]
}
```

## Team Workflow (Tmux Multi-Agent)

This project uses a Scrum-based multi-agent team via tmux. See `docs/tmux/quiz-game/tmux_team_overview.md` for roles (PO, SM, GD, TL, DEV, QA) and communication protocol.

Key artifacts:
- `docs/tmux/quiz-game/WHITEBOARD.md` - Current status
- `docs/tmux/quiz-game/SPRINT_BACKLOG.md` - Sprint work items
- `docs/tmux/quiz-game/PRODUCT_BACKLOG.md` - All work items

Use `tm-send <ROLE> "message"` for inter-agent communication.

### Restart the Team

When the user says "Restart the team":

1. **Save progress**: Tell SM to note current progress in WHITEBOARD
   ```bash
   tm-send SM "Boss -> SM: Please update WHITEBOARD with current progress before team restart."
   ```

2. **Wait for SM**: Loop every 15s checking WHITEBOARD until SM confirms update is complete

3. **Kill tmux session**:
   ```bash
   tmux kill-session -t quiz-game
   ```

4. **Restart team**: Read `docs/tmux/quiz-game/tmux_team_overview.md`, then run:
   ```bash
   bash docs/tmux/quiz-game/setup-team.sh
   ```
