# Quiz Battle Arena 🎮📚

An educational quiz game designed for children ages 8-12. The game is **subject-agnostic** - it works for any educational subject by simply swapping the question file.

## Project Status

**Current Milestone**: M0 - Project Setup ✅
**Overall Progress**: 5%

## Features

- ✅ Subject-agnostic design (works for any subject)
- ✅ Question-based gameplay with 4-answer format
- ✅ Educational focus with explanations for wrong answers
- 🚧 Progressive development (MVP → Polish → Advanced)

## Tech Stack

- **Game Framework**: Phaser 3 (v3.70.0)
- **Build Tool**: Vite (v5.0.0)
- **Testing**: Jest (v29.7.0)
- **Languages**: HTML5, CSS3, JavaScript ES6+

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd ontap

# Install dependencies
npm install
```

## Development

```bash
# Start development server (opens browser automatically on port 3335)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

**Note**: Development server runs on port **3335** (not 3000) to avoid conflicts.

## Development Workflow

### Test-Driven Development (TDD) - REQUIRED ⚠️

**All code MUST follow TDD approach**:

1. **Write tests FIRST** - Before writing any implementation code
2. **Run tests** - Verify they fail (red)
3. **Write minimal code** - Make tests pass (green)
4. **Refactor** - Improve code while keeping tests passing
5. **Repeat** - For each new feature/fix

**Example TDD Workflow**:
```bash
# 1. Write test first
# Edit: tests/healthManager.test.js
# Add test: "should decrease health by 1 on wrong answer"

# 2. Run test - should FAIL
npm test

# 3. Write minimal implementation
# Edit: src/utils/healthManager.js
# Add code to make test pass

# 4. Run test - should PASS
npm test

# 5. Refactor if needed, tests still pass
npm test
```

**Why TDD?**
- ✅ Prevents bugs before they're written
- ✅ Forces clear requirements thinking
- ✅ Provides built-in regression testing
- ✅ Makes refactoring safe
- ✅ Documents expected behavior

**TDD Rules**:
- ❌ NEVER write production code without a failing test first
- ❌ NEVER commit code with failing tests
- ✅ ALWAYS run full test suite before committing
- ✅ ALWAYS write tests for bug fixes (test fails → fix → test passes)

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Project Structure

```
ontap/
├── src/
│   ├── scenes/           # Phaser game scenes
│   ├── components/       # Game components (targets, UI, etc.)
│   ├── utils/           # Utility functions
│   ├── assets/          # Game assets
│   │   └── data/        # questions.json files
│   └── main.js          # Entry point
├── tests/               # Jest test files
├── docs/                # Documentation
│   ├── specs/          # Sprint specifications
│   ├── reviews/        # Code review documents
│   ├── plan/           # Project planning documents
│   └── research/       # Research documentation
├── index.html          # HTML entry point
├── vite.config.js      # Vite configuration
├── jest.config.js      # Jest configuration
└── package.json        # Project dependencies
```

## Question File Format

The game uses a JSON format for questions. To add new subjects, create a new question file in `src/assets/data/`:

```json
{
  "subject": "Your Subject Name",
  "version": "1.0.0",
  "totalQuestions": 15,
  "questions": [
    {
      "id": 1,
      "category": "subject",
      "question": "Your question here?",
      "answers": [
        "Answer 1",
        "Answer 2",
        "Answer 3",
        "Answer 4"
      ],
      "correct": 0,
      "explanation": "Why this is the correct answer."
    }
  ]
}
```

### Current Question Sets

- **questions.json** - Mixed (5 History + 5 Math + 5 Literature)

## Subject-Agnostic Design

This game is designed to work with **any educational subject** without code changes:

✅ **Supported**: History, Math, Literature, Science, Civics, Geography, etc.
✅ **How**: Simply swap the `questions.json` file
✅ **Graphics**: Generic robots/targets (not subject-specific)

## Development Guidelines

### Git Workflow

1. **Frequent commits** (every 30-60 minutes)
2. **Clear commit messages** following convention:
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `refactor:` - Code restructuring
   - `test:` - Add/update tests
   - `docs:` - Documentation changes
   - `chore:` - Maintenance tasks

### Testing Requirements

- Write tests for all game logic
- All tests must pass before commits
- Aim for >80% code coverage

### Code Style

- ES6+ modern JavaScript
- Clear variable names
- Comments for complex logic
- Keep functions small and focused

## Milestones

| Milestone | Name | Duration | Status |
|-----------|------|----------|--------|
| **M0** | Project Setup | 1 week | 🟡 In Progress |
| **M1** | Core MVP | 3-4 weeks | ⚪ Pending |
| **M2** | Polish & Assets | 4-5 weeks | ⚪ Pending |
| **M3** | Advanced Features | 4-5 weeks | ⚪ Pending |
| **M4** | Production Ready | 2-3 weeks | ⚪ Pending |

**Total Timeline**: 14-18 weeks (~3.5-4.5 months)

See `docs/plan/main-milestones.md` for detailed milestone breakdown.

## Team Structure

This is a multi-agent development project:

- **PM** (Project Manager) - Coordination and planning
- **GD** (Game Designer) - Game mechanics and UX design
- **FE** (Frontend Developer) - Implementation
- **CR** (Code Reviewer) - Quality assurance

Communication flows through PM using tmux-based workflow.

## Resources

- **Game Research**: `docs/research/research-game-research.md`
- **MCP Assets**: `docs/research/research-mcp-graphic-resources.md`
- **Main Milestones**: `docs/plan/main-milestones.md`
- **Team Workflow**: `docs/tmux/quiz_game_team/README.md`

## License

MIT License - See LICENSE file for details

## Support

For questions or issues, see the project documentation in `docs/` directory.

---

**Made with ❤️ by the Quiz Game Team**
**Progressive Development | Subject-Agnostic | Educational Focus**
