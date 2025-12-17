# Sprint 2: Game Loop & Health

**Sprint Number**: 2
**Sprint Name**: Game Loop & Health
**Created**: 2025-12-17
**Milestone**: M1 - Core MVP (Playable Game)
**Status**: 🟡 Planning - Awaiting GD Design Specs
**Assigned To**: TBD (FE after design complete)
**Estimated Duration**: 1-1.5 weeks

---

## Sprint Goal

Transform Sprint 1's single-question demo into a full game session with health system, question progression, game over conditions, and milestone celebrations.

**One-Sentence Goal**: Player can play through all 15 questions with health tracking, see celebrations at milestones, and reach a game over screen with final stats.

---

## Milestone Alignment

**Current Milestone**: M1 - Core MVP (Playable Game)
**Milestone Progress**: Sprint 2 of 3 (Sprint 1✅, Sprint 2🟡, Sprint 3⏳)
**Previous Sprint**: Sprint 1 - Core Mechanics ✅ Complete (2025-12-17)

**M1 Goal**: Deliver a PLAYABLE core game loop - the minimum experience that proves the concept works

---

## Deliverables

### 1. Health System (FR-005)
**Description**: Implement 5-heart health system where wrong answers reduce health

**Requirements**:
- Player starts with 5 hearts (❤️❤️❤️❤️❤️)
- Each wrong answer: -1 heart
- Correct answers: no health change (health restoration in Sprint 5 - M2)
- Display hearts visually (top-right corner of HUD)
- Visual feedback when losing a heart (heart turns gray/empty)
- Game over when health reaches 0

**Health Display** (from GD design.md):
- Position: Top-right (see GD specs for exact coordinates)
- Visual: Heart icons (❤️ for full, 🖤 for empty)
- Size: Large enough for children to see clearly
- Animation: Heart "breaks" or fades when lost

**Success Criteria**:
- 5 hearts displayed at game start
- Heart count decreases on wrong answer
- Game over triggers at 0 hearts
- Heart loss is visually clear and child-friendly

---

### 2. Question Progression
**Description**: Automatically load next question after player answers current question

**Requirements**:
- After answer validation (correct or wrong):
  1. Show feedback for 2-3 seconds (existing from Sprint 1)
  2. Check milestone celebration trigger (see Deliverable #4)
  3. Clear current question and targets
  4. Load next question from questions.json
  5. Display new question and shuffled answers
- Track question index (currentQuestionIndex)
- Handle end of questions array (trigger game over)

**Edge Cases**:
- Last question (index 14 for 15 questions) → Game over
- Questions exhausted before health depleted → Game over (victory)

**Success Criteria**:
- Questions progress automatically (1 → 2 → 3 ... → 15)
- No manual "Next" button needed (automatic flow)
- Question index tracks correctly
- End of questions triggers game over

---

### 3. Game Over Screen (FR-006)
**Description**: Display final game statistics and options when game ends

**Triggers**:
1. Health reaches 0 (defeat)
2. All questions answered (victory)

**Game Over Screen Elements** (from GD design.md):
- **Header**: "Game Over!" or "Victory!" (based on trigger)
- **Final Score**: Display total score
- **Statistics**:
  - Correct answers: X/15
  - Wrong answers: Y/15
  - Learning Points earned: Z
  - Questions answered: N/15
- **Buttons**:
  - "Try Again" (restart game from question 1, reset health/score)
  - "Main Menu" (return to main menu - Sprint 3)

**Visual Design** (see GD design.md):
- Centered on screen
- Large, clear text (child-friendly fonts)
- Celebratory colors for victory (green/gold)
- Neutral/supportive colors for defeat (blue/gray, NOT red/harsh)

**Success Criteria**:
- Game over triggers correctly (0 health or questions exhausted)
- All statistics display accurately
- "Try Again" button restarts game (health=5, score=0, question=1)
- Screen is visually appealing and child-appropriate

---

### 4. Milestone Celebrations (GD Rec #3)
**Description**: Celebrate player progress at question milestones (5, 10, 15, 20)

**GD Recommendation #3** (from gd-prd-feedback.md):
- Research shows milestone celebrations increase engagement by 40%
- Provides psychological rewards and motivation to continue
- Acknowledges effort and progress, not just correctness

**Celebration Triggers**:
- **5 questions**: "Quarter Way! 🎯"
- **10 questions**: "Halfway Champion! 🏆"
- **15 questions**: "Victory! All Questions Complete! 🎉"
- **20 questions**: (for future expansion with larger question sets)

**Celebration Display** (see GD design.md):
- Modal overlay (semi-transparent background)
- Large celebration message
- Confetti or particle animation (simple, performant)
- Display for 2-3 seconds, then auto-dismiss
- Continue to next question after dismissal

**Implementation Notes**:
- Check after each answer: `if (questionsAnswered === 5 || === 10 || === 15)`
- Track total questions answered (not just current index)
- Celebrations show regardless of correct/wrong answers (celebrate progress!)

**Success Criteria**:
- Celebrations trigger at exactly 5, 10, 15 questions answered
- Messages display correctly in Vietnamese
- Visual effects are child-friendly and celebratory
- Flow continues smoothly after celebration

---

### 5. Unit Tests (10 total minimum)
**Description**: Write automated tests for new game loop logic

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
   - Game over triggers when questions exhausted

3. **Game Over**:
   - Defeat condition (0 health) triggers game over
   - Victory condition (questions exhausted) triggers game over
   - Final statistics calculate correctly
   - "Try Again" resets game state (health=5, score=0, index=0)

4. **Milestone Celebrations**:
   - Celebrations trigger at 5, 10, 15 questions
   - Celebrations don't trigger at other counts
   - Celebration messages match question counts

**Testing Framework**: Jest (existing from Sprint 1)

**Success Criteria**:
- Minimum 10 tests passing (100% pass rate)
- Sprint 1 tests still passing (16 tests)
- Total: 26+ tests by end of Sprint 2
- No test execution errors

---

## Technical Specifications

### Technology Stack
- **Game Framework**: Phaser 3.70.0
- **Build Tool**: Vite 5.0.0 (dev server on port 3335)
- **Testing**: Jest 29.7.0
- **Language**: JavaScript ES6+

### File Structure (Updated)
```
src/
├── scenes/
│   ├── GameScene.js          # Updated: Add health, progression, game over
│   └── GameOverScene.js      # NEW: Game over screen
├── components/
│   ├── Question.js           # Existing (Sprint 1)
│   ├── Target.js             # Existing (Sprint 1)
│   ├── ScoreDisplay.js       # Existing (Sprint 1)
│   ├── HealthDisplay.js      # NEW: Health hearts display
│   └── CelebrationModal.js   # NEW: Milestone celebrations
├── utils/
│   ├── questionLoader.js     # Existing (Sprint 1)
│   ├── scoreManager.js       # Existing (Sprint 1)
│   ├── ClickDetection.js     # Existing (Sprint 1)
│   ├── healthManager.js      # NEW: Health tracking logic
│   └── gameStateManager.js   # NEW: Game state (questions answered, etc.)
├── data/
│   └── questions.json        # Existing (15 Vietnamese questions)
└── main.js                   # Updated: Add GameOverScene

tests/
├── questionLoader.test.js    # Existing (Sprint 1)
├── scoreManager.test.js      # Existing (Sprint 1)
├── clickDetection.test.js    # Existing (Sprint 1)
├── healthManager.test.js     # NEW: Health system tests
├── gameProgression.test.js   # NEW: Question progression tests
└── celebrations.test.js      # NEW: Milestone celebration tests
```

### Game State Management
```javascript
// GameScene state tracking
{
  score: 0,
  health: 5,
  currentQuestionIndex: 0,
  questionsAnswered: 0,  // NEW: For milestone celebrations
  correctCount: 0,       // NEW: For game over stats
  wrongCount: 0,         // NEW: For game over stats
  questions: [],
  isGameOver: false      // NEW: Game over flag
}
```

---

## Design Specifications

**See**: `design.md` (GD will create with detailed specs)

**Key Design Considerations**:
- **Health hearts**: Child-friendly visual, clear when lost
- **Question transitions**: Smooth, not jarring
- **Game over screen**: Celebratory (victory) or supportive (defeat), never harsh
- **Milestone celebrations**: Exciting but not distracting, quick dismissal
- **Vietnamese text**: All messages in Vietnamese (UTF-8 support)

**GD Recommendation Integrated**:
- ✅ **GD Rec #3**: Milestone celebrations at 5, 10, 15, 20 questions

---

## Definition of Done

**Sprint 2 is complete when**:

### Functional Requirements
- [x] Player starts with 5 hearts
- [x] Health decreases on wrong answers
- [x] Questions progress automatically after answer
- [x] Game over triggers at 0 health or questions exhausted
- [x] Game over screen displays final stats
- [x] "Try Again" button restarts game
- [x] Milestone celebrations trigger at 5, 10, 15 questions
- [x] All celebrations display correct Vietnamese messages

### Quality Requirements
- [x] 10+ unit tests written and passing (100% pass rate)
- [x] Sprint 1 tests still passing (16 tests)
- [x] Total: 26+ tests passing
- [x] No console errors during gameplay
- [x] Vietnamese text displays correctly (no encoding issues)
- [x] Code follows project conventions (see README.md)
- [x] Git commits show progressive development (6-10 commits expected)

### Documentation
- [x] Code comments explain key logic (health, progression, celebrations)
- [x] Test files document expected behavior
- [x] Commit messages are clear (e.g., "feat: add health system")

### Code Review
- [x] CR (Code Reviewer) approves Sprint 2 implementation
- [x] No critical bugs or performance issues
- [x] Ready to merge and proceed to Sprint 3

---

## Success Criteria

**Minimum Viable Sprint 2**:
- ✅ Can play through all 15 questions
- ✅ Health system functional (5 hearts → 0 = game over)
- ✅ Game over screen with "Try Again"
- ✅ Milestone celebrations at 5, 10, 15 questions
- ✅ 10+ tests passing

**Ideal Sprint 2** (if time allows):
- ✨ Health loss animation polished (heart "breaks")
- ✨ Question transition animation smooth
- ✨ Celebration confetti/particles impressive
- ✨ Game over screen visually beautiful
- ✨ Statistics display comprehensive

---

## Dependencies

**Blockers**:
- ⏳ Awaiting GD design specs (design.md)

**Prerequisites**:
- ✅ Sprint 1 complete (question display, targets, scoring)
- ✅ 15 Vietnamese questions in questions.json
- ⏳ GD design specs for health, game over, celebrations
- ✅ PRD reference (docs/product/prd.md - sections 6, 10.1)

**External Dependencies**: None

---

## Risk Assessment

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Game loop complexity | Medium | Medium | Break into smaller steps (health → progression → celebrations) |
| Milestone celebration timing | Low | Low | Test with 5-question mock data first |
| Game over stats calculation | Low | Low | Unit tests for all stat calculations |
| Vietnamese celebration messages | Low | Very Low | GD provides exact text, UTF-8 validated |

---

## References

**PRD Sections**:
- Section 6: Game Mechanics (Health system, progression)
- Section 10.1: Phase 1 - Minimum Viable Product (M1 deliverables)

**GD Feedback**:
- docs/product/gd-prd-feedback.md
- Recommendation #3: Milestone celebrations (5, 10, 15, 20 questions)

**Research**:
- docs/research/research-game-research.md (child psychology, gamification)
- Milestone celebrations: 40% engagement increase

**Sprint 1 Reference**:
- docs/plan/sprints/sprint-1-core-mechanics/ (completed implementation)

---

## Next Steps After Sprint 2

**Sprint 3: UI/UX & Polish**:
- Main menu screen
- Complete HUD (health + score integrated)
- Sound effects (correct, wrong, celebrations)
- Visual polish (explosions, particles)

**M1 Completion**:
- After Sprint 3, M1 (Core MVP) is complete
- Playtest with 2-3 users (ages 8-12)
- Get BOSS approval for M1
- Proceed to M2 (Polish & Enhancements)

---

## Notes for FE

**Start When**:
- GD completes design.md with detailed specs
- PM assigns Sprint 2 officially

**Implementation Order** (recommended):
1. **Health System** (simplest addition):
   - Add health state tracking
   - Display 5 hearts (top-right)
   - Decrease on wrong answer
   - Game over at 0 health

2. **Question Progression**:
   - Track question index
   - Auto-load next question after answer
   - Handle end of questions

3. **Game Over Screen**:
   - Create GameOverScene
   - Display stats (score, correct/wrong)
   - "Try Again" button functionality

4. **Milestone Celebrations**:
   - Track questions answered
   - Trigger celebrations at 5, 10, 15
   - Display celebration modal with confetti

5. **Tests**:
   - Write tests for each feature
   - Ensure Sprint 1 tests still pass

**Progressive Development**:
- Commit every 30-60 minutes
- Start with MVP (basic health display, simple game over)
- Add polish incrementally (animations, effects)
- Run tests frequently (`npm test`)

**Communication**:
- Questions? Ask PM (who will coordinate with GD if design clarification needed)
- Blockers? Report to PM immediately
- Progress? PM will check Git commits regularly

---

**Document Owner**: PM (Project Manager)
**Last Updated**: 2025-12-17
**Status**: 🟡 Planning - Awaiting GD design specs
