# Sprint 2A: Game Loop

**Sprint Number**: 2A
**Sprint Name**: Game Loop (Core Mechanics)
**Created**: 2025-12-17
**Milestone**: M1 - Core MVP (Playable Game)
**Status**: 🟡 Pending - Awaiting GD Design Split
**Assigned To**: FE (Frontend Developer)
**Estimated Duration**: 2-3 hours

---

## Sprint Goal

Implement the core game loop that allows players to play through multiple questions with health tracking and reach a game over state.

**One-Sentence Goal**: Player can play through all 15 questions with health decreasing on wrong answers, reaching game over when health hits 0 or questions are exhausted.

---

## Milestone Alignment

**Current Milestone**: M1 - Core MVP (Playable Game)
**Milestone Progress**: Sprint 2A of 5 (Sprint 1✅, Sprint 2A🟡, Sprint 2B⏳, Sprint 3⏳)
**Previous Sprint**: Sprint 1 - Core Mechanics ✅ Complete (2025-12-17)

**M1 Goal**: Deliver a PLAYABLE core game loop - the minimum experience that proves the concept works

**Why Sprint 2 Was Split**:
- Original Sprint 2: 5 features, 650-line design doc (too large)
- Split into Sprint 2A (core loop) + Sprint 2B (polish)
- More manageable scope per sprint (2-3 hours each)

---

## Deliverables

### 1. Health System (FR-005)
**Description**: Implement 5-heart health system with visual display and tracking

**Requirements**:
- Player starts with 5 hearts (❤️❤️❤️❤️❤️)
- Each wrong answer: -1 heart
- Correct answers: no health change
- Display hearts visually (top-right corner of HUD)
- Visual feedback when losing a heart (heart turns gray/empty, fade animation)
- Game over trigger when health reaches 0

**Health Display** (from GD design.md):
- Position: Top-right (see GD specs for exact coordinates)
- Visual: Heart icons (❤️ for full, 🖤 for empty) - use Unicode or simple colored shapes
- Size: Large enough for children to see clearly (24-32px per heart)
- Layout: Horizontal row
- Animation: Heart "breaks" or fades when lost (simple opacity transition)

**Success Criteria**:
- ✅ 5 hearts displayed at game start
- ✅ Heart count decreases on wrong answer only
- ✅ Heart loss is visually clear and child-friendly
- ✅ Game over triggers at 0 hearts
- ✅ Heart display updates immediately after answer validation

---

### 2. Question Progression
**Description**: Automatically load next question after player answers current question

**Requirements**:
- After answer validation (correct or wrong):
  1. Show feedback for 2-3 seconds (existing from Sprint 1)
  2. Clear current question and targets
  3. Increment question index
  4. Load next question from questions.json
  5. Display new question with shuffled answers
- Track question index (currentQuestionIndex)
- Handle end of questions array (trigger game over)
- No "Next" button needed - automatic progression

**Flow**:
```
Answer Click → Validate → Show Feedback (2-3s) →
Clear Screen → Load Next Question → Display → Repeat
```

**Edge Cases**:
- Last question (index 14 for 15 questions) → Trigger game over (victory)
- Questions exhausted before health depleted → Game over (victory)
- Health hits 0 mid-game → Game over (defeat)

**Success Criteria**:
- ✅ Questions progress automatically (1 → 2 → 3 ... → 15)
- ✅ No manual "Next" button needed
- ✅ Question index tracks correctly
- ✅ Smooth transition between questions (no flash/jarring)
- ✅ End of questions triggers game over

---

### 3. Basic Game Over Trigger
**Description**: Detect game over conditions and display simple "Game Over" message

**Triggers**:
1. Health reaches 0 (defeat)
2. All questions answered (victory - questions exhausted)

**Sprint 2A Implementation** (Simplified):
- Display simple "Game Over!" text message centered on screen
- Show final score
- Freeze game (no more interaction)
- **Note**: Full game over screen with stats + buttons in Sprint 2B

**Success Criteria**:
- ✅ Game over triggers correctly (0 health OR questions exhausted)
- ✅ "Game Over!" message displays centered
- ✅ Final score shows
- ✅ Game freezes (no more clicks accepted)
- ✅ Clear visual distinction from normal gameplay

**What's Deferred to Sprint 2B**:
- Full game over screen layout
- Defeat vs victory states
- Detailed statistics (correct/wrong counts)
- "Try Again" button
- "Main Menu" button

---

### 4. Unit Tests (6 minimum)
**Description**: Write automated tests for game loop logic

**Required Tests**:
1. **Health System**:
   - Health starts at 5
   - Health decreases by 1 on wrong answer
   - Health stays same on correct answer
   - Game over triggers at 0 health

2. **Question Progression**:
   - Current question index increments after answer
   - Next question loads correctly
   - Questions exhaust at index 14 (for 15 questions)

3. **Game Over**:
   - Defeat condition (0 health) triggers game over
   - Victory condition (questions exhausted) triggers game over

**Testing Framework**: Jest (existing from Sprint 1)

**Success Criteria**:
- ✅ Minimum 6 new tests passing (100% pass rate)
- ✅ Sprint 1 tests still passing (16 tests)
- ✅ Total: 22+ tests by end of Sprint 2A
- ✅ No test execution errors

---

## Technical Specifications

### Technology Stack
- **Game Framework**: Phaser 3.70.0
- **Build Tool**: Vite 5.0.0 (dev server on port 3335)
- **Testing**: Jest 29.7.0
- **Language**: JavaScript ES6+

### File Structure (Updated from Sprint 1)
```
src/
├── scenes/
│   └── GameScene.js          # UPDATED: Add health, progression, game over
├── components/
│   ├── Question.js           # Existing (Sprint 1)
│   ├── Target.js             # Existing (Sprint 1)
│   ├── ScoreDisplay.js       # Existing (Sprint 1)
│   └── HealthDisplay.js      # NEW: Health hearts HUD
├── utils/
│   ├── questionLoader.js     # Existing (Sprint 1)
│   ├── scoreManager.js       # Existing (Sprint 1)
│   ├── ClickDetection.js     # Existing (Sprint 1)
│   └── healthManager.js      # NEW: Health tracking logic
├── data/
│   └── questions.json        # Existing (15 Vietnamese questions)
└── main.js                   # Existing (Sprint 1)

tests/
├── questionLoader.test.js    # Existing (Sprint 1)
├── scoreManager.test.js      # Existing (Sprint 1)
├── clickDetection.test.js    # Existing (Sprint 1)
├── healthManager.test.js     # NEW: Health system tests
└── gameProgression.test.js   # NEW: Progression + game over tests
```

### Game State Management (Updated)
```javascript
// GameScene state tracking (expanded from Sprint 1)
{
  score: 0,                    // Existing (Sprint 1)
  health: 5,                   // NEW: Current health
  currentQuestionIndex: 0,     // UPDATED: Track current question
  questions: [],               // Existing (Sprint 1)
  currentQuestion: null,       // Existing (Sprint 1)
  shuffledAnswers: [],         // Existing (Sprint 1)
  targets: [],                 // Existing (Sprint 1)
  isAnswering: false,          // Existing (Sprint 1)
  isGameOver: false            // NEW: Game over flag
}
```

---

## Design Specifications

**See**: `design.md` (GD will create by splitting Sprint 2 design.md)

**Key Design Considerations**:
- **Health hearts**: Child-friendly visual, clear when lost
- **Question transitions**: Smooth, not jarring (fade out/in)
- **Game over message**: Simple, centered, clear
- **Vietnamese text**: All messages in Vietnamese (UTF-8 support)
- **Placeholder graphics OK**: Still using colored shapes (Sprint 1 style)

---

## Definition of Done

**Sprint 2A is complete when**:

### Functional Requirements
- [x] Player starts with 5 hearts displayed
- [x] Health decreases on wrong answers
- [x] Questions progress automatically after answer
- [x] Game over triggers at 0 health or questions exhausted
- [x] Simple "Game Over!" message displays with final score
- [x] Game freezes after game over (no more interaction)

### Quality Requirements
- [x] 6+ unit tests written and passing (100% pass rate)
- [x] Sprint 1 tests still passing (16 tests)
- [x] Total: 22+ tests passing
- [x] No console errors during gameplay
- [x] Vietnamese text displays correctly (no encoding issues)
- [x] Code follows project conventions (see README.md)
- [x] Git commits show progressive development (4-6 commits expected)

### Documentation
- [x] Code comments explain key logic (health, progression)
- [x] Test files document expected behavior
- [x] Commit messages are clear (e.g., "feat: add health system")

### Code Review
- [x] CR (Code Reviewer) approves Sprint 2A implementation
- [x] No critical bugs or performance issues
- [x] Ready to merge and proceed to Sprint 2B

---

## Success Criteria

**Minimum Viable Sprint 2A**:
- ✅ Can play through all 15 questions
- ✅ Health system functional (5 hearts → 0 = game over)
- ✅ Automatic question progression
- ✅ Simple game over message
- ✅ 6+ tests passing

**Ideal Sprint 2A** (if time allows):
- ✨ Health loss animation polished (heart fade effect)
- ✨ Question transition animation smooth (fade in/out)
- ✨ Low health warning visual (hearts flash red at 1-2 hearts)

---

## Dependencies

**Blockers**:
- ⏳ Awaiting GD design split (design.md → sprint-2a-game-loop/design.md)

**Prerequisites**:
- ✅ Sprint 1 complete (question display, targets, scoring)
- ✅ 15 Vietnamese questions in questions.json
- ⏳ GD design specs for health display, progression flow
- ✅ PRD reference (docs/product/prd.md - sections 6, 10.1)

**External Dependencies**: None

---

## Risk Assessment

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Health display unclear | Medium | Low | Use clear heart icons, test with children |
| Question transition jarring | Low | Medium | Add fade effect, test smooth timing |
| Game over missed (edge cases) | High | Low | Unit tests for all triggers, manual testing |
| Sprint 1 tests break | Medium | Very Low | Run tests frequently, fix immediately |

---

## References

**PRD Sections**:
- Section 6: Game Mechanics (Health system, progression)
- Section 10.1: Phase 1 - Minimum Viable Product (M1 deliverables)

**Sprint 1 Reference**:
- docs/plan/sprints/sprint-1-core-mechanics/ (completed implementation)
- Sprint 1 taught us: Comprehensive design specs = fast implementation

**Main Milestones**:
- docs/plan/main-milestones.md (M1 Sprint 2A section)

---

## Next Steps After Sprint 2A

**Sprint 2B: Polish (Game Over & Celebrations)**:
- Full game over screen (defeat/victory states, detailed stats)
- "Try Again" button functionality
- Milestone celebrations (5, 10, 15 questions answered)
- Confetti/particle effects
- 6+ unit tests

**Timeline**:
- Sprint 2A complete → PM verifies → CR reviews → Merge
- Sprint 2B planning → GD design ready → Assign to FE
- Both Sprint 2A + 2B = Original Sprint 2 scope

---

## Notes for FE

**Start When**:
- GD completes Sprint 2A design.md split
- PM assigns Sprint 2A officially

**Implementation Order** (recommended):
1. **Health System** (simplest addition):
   - Add health state variable
   - Create HealthDisplay component (5 hearts top-right)
   - Decrease health on wrong answer
   - Test: Health decreases correctly

2. **Question Progression**:
   - Track currentQuestionIndex
   - Auto-load next question after feedback delay
   - Test: Questions progress 1→2→3...→15

3. **Basic Game Over**:
   - Add isGameOver flag
   - Check triggers (health=0 OR questions exhausted)
   - Display simple "Game Over!" text + final score
   - Test: Game over triggers correctly

4. **Tests**:
   - Write tests for each feature
   - Ensure Sprint 1 tests still pass

**Progressive Development**:
- Commit every 30-60 minutes
- Branch: feature_sprint2a_game_loop
- Start with MVP (basic health, simple game over)
- Add polish incrementally (animations, effects)
- Run tests frequently (`npm test`)

**Communication**:
- Questions? Ask PM (who will coordinate with GD if design clarification needed)
- Blockers? Report to PM immediately
- Progress? PM will check Git commits regularly

---

**Document Owner**: PM (Project Manager)
**Last Updated**: 2025-12-17
**Status**: 🟡 Pending - Awaiting GD design split
