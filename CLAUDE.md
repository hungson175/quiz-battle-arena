# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Quiz Battle Arena is a **Plants vs Zombies-style tower defense game** combined with educational quizzes built with Phaser 3. Players defend their house from zombie waves by placing plants, with money earned by answering quiz questions correctly. Wrong answers lose money. The game is designed to be challenging and educational for children ages 8-12.

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

```
src/
├── main.js              # Phaser game config and entry point
├── scenes/
│   └── GameScene.js     # Main game scene - orchestrates all gameplay
├── entities/            # Game objects
│   ├── Peashooter.js    # Plant that shoots peas
│   ├── Pea.js           # Projectile fired by peashooter
│   └── Zombie.js        # Enemy that walks toward house
├── managers/            # Game object lifecycle management
│   ├── PlantManager.js      # Plant placement and updates
│   ├── ZombieManager.js     # Zombie spawning and state
│   └── ProjectileManager.js # Pea movement and collisions
├── utils/               # Game systems and configuration
│   ├── GridConfig.js     # 3-lane grid layout (lanes x columns)
│   ├── MoneyManager.js   # Economy (+50 correct, -30 wrong)
│   ├── QuestionManager.js # Question loading and shuffling
│   ├── WaveManager.js    # 5 progressive waves with timing
│   ├── QuizTimer.js      # Countdown timer for questions
│   └── GameStats.js      # Victory/defeat statistics
└── ui/
    ├── QuizUI.js         # Quiz display component
    └── QuizUIManager.js  # Quiz lifecycle and callbacks
```

### Game Flow

1. **GameScene.create()** initializes all managers and starts wave system
2. **WaveManager** controls zombie spawn rate and wave progression (5 waves total)
3. **QuizUIManager** interrupts gameplay periodically with questions
4. **MoneyManager** tracks economy - plants cost 50, correct answers +50, wrong -30
5. **GameScene.update()** handles plant firing, collisions, and win/lose conditions

### Key Patterns

- **Entity pattern**: Entities (Peashooter, Zombie, Pea) are plain objects with state, rendered via managers
- **Manager pattern**: Managers own entity lifecycle and Phaser graphics/sprites
- **Grid system**: 3 lanes x 9 columns, column 0 is house zone (not plantable)
- **TDD approach**: All game logic has corresponding test files in `tests/`

## Question Data Format

Questions are loaded from `public/assets/data/questions.json`:

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
