# Sprint 2B: Polish (Game Over & Celebrations)
**Quiz Battle Arena - Educational Quiz Game**

**PM**: Project Manager
**Date Created**: 2025-12-17
**Sprint Status**: 🟡 Ready to Start
**Assigned To**: FE (Frontend Developer)

---

## Sprint Overview

**Sprint Number**: Sprint 2B
**Sprint Name**: Polish (Game Over & Celebrations)
**Sprint Goal**: Add polished game over screens and milestone celebrations to maintain player motivation and provide encouraging feedback

**Milestone Alignment**: M1 - Core MVP (Playable Game)
**Previous Sprint**: Sprint 2A (Game Loop - Core Mechanics) ✅
**Next Sprint**: Sprint 3 (UI/UX & Polish - MCP Asset Integration)

---

## Sprint Goal (1-2 Sentences)

Transform the basic game over experience into a professional, encouraging feedback system that celebrates player progress at key milestones (5, 10, 15 questions) and provides detailed statistics at session end.

---

## Deliverables

### 1. Full Game Over Screen (FR-006)

**Outcome**: Professional game over screen with two distinct states (defeat vs. victory)

**Requirements**:
- Two game over states:
  - **Defeat**: Health = 0, supportive message "Hết cơ hội! Thử lại nhé!"
  - **Victory**: All questions answered, celebration message "Hoàn thành! Xuất sắc!"
- Detailed statistics display:
  - Final score
  - Correct/wrong answer counts
  - Accuracy percentage with color coding:
    - Red (<50%): Needs practice
    - Yellow (50-79%): Good progress
    - Blue (≥80%): Excellent
- Interactive buttons:
  - "Chơi lại" (Try Again) - Restart game
  - "Menu chính" (Main Menu) - Placeholder for Sprint 3
- Professional modal design (500px × 400px, white background, color-coded borders)
- Staggered animations (title → score → stats → buttons)
- Victory sparkle animation for celebration feel

**Files**:
- NEW: `src/scenes/GameOverScene.js` - Dedicated Phaser scene for game over
- MODIFY: `src/scenes/GameScene.js` - Trigger game over on health=0 or victory

### 2. Milestone Celebrations (GD Rec #3)

**Outcome**: Motivational celebrations every 5 questions to prevent session fatigue

**Requirements**:
- Celebration triggers at 5, 10, 15 questions answered
- Modal overlay (400px × 250px, semi-transparent colored background)
- Display components:
  - Animated icon (🎯 🏆 🚀) bouncing in
  - Vietnamese message ("Một phần tư rồi!", "Nửa chặng đường!", "Sắp xong rồi!")
  - Animated progress bar showing completion percentage
  - Progress text ("5 / 15 câu")
- Auto-dismiss after 2.5 seconds
- Click anywhere to skip celebration immediately
- State management to prevent duplicate celebrations

**Files**:
- NEW: `src/components/MilestoneCelebration.js` - Reusable celebration component
- MODIFY: `src/scenes/GameScene.js` - Check for milestones after each answer

### 3. Vietnamese Text Constants

**Outcome**: All new UI text properly localized in Vietnamese

**Requirements**:
- Game over messages (defeat/victory)
- Milestone messages (5, 10, 15 questions)
- Statistics labels (score, correct, wrong, accuracy)
- Button labels (try again, main menu)

**Files**:
- MODIFY: `src/scenes/GameOverScene.js` - Include Vietnamese constants
- MODIFY: `src/components/MilestoneCelebration.js` - Include Vietnamese messages

### 4. Unit Tests (TDD Required)

**Outcome**: 2+ new unit tests for Sprint 2B logic

**Requirements**:
- Test 9: Milestone detection at 5, 10, 15 intervals
- Test 10: Accuracy percentage calculation
- All previous tests still passing (29 tests from Sprint 1 + 2A)
- Total expected: 31+ tests passing

**Files**:
- NEW or MODIFY: `tests/milestones.test.js` - Milestone logic tests
- NEW or MODIFY: `tests/gameStats.test.js` - Statistics calculation tests

---

## Success Criteria

Sprint 2B is **COMPLETE** when all of the following are verified:

### Functional ✅
- [ ] Game over screen shows on health = 0 (defeat state)
- [ ] Game over screen shows on all questions answered (victory state)
- [ ] Final score, correct/wrong counts, accuracy % display correctly
- [ ] Accuracy color coding works (red/yellow/blue based on %)
- [ ] "Chơi lại" button restarts game successfully
- [ ] "Menu chính" button shows placeholder message (Sprint 3 feature)
- [ ] Milestone celebration shows at 5 questions
- [ ] Milestone celebration shows at 10 questions
- [ ] Milestone celebration shows at 15 questions (if applicable)
- [ ] Progress bar animates correctly (0 → current progress)
- [ ] Click to skip celebration works immediately
- [ ] No duplicate celebrations for same milestone

### Visual ✅
- [ ] Game over modal looks professional (not basic placeholder)
- [ ] Staggered animations create smooth experience
- [ ] Victory sparkle animation plays (victory state only)
- [ ] Milestone icons bounce in correctly
- [ ] Progress bar fills smoothly with animation
- [ ] Vietnamese text renders correctly in all new UI elements

### Child-Friendly ✅
- [ ] Game over messages are encouraging, not punishing
- [ ] Defeat message is supportive ("Try again!" not "You failed")
- [ ] Victory message is celebratory
- [ ] Milestone celebrations maintain motivation
- [ ] Progress bar shows tangible advancement

### Technical ✅
- [ ] 31+ unit tests passing (29 previous + 2 new minimum)
- [ ] No console errors during full game session
- [ ] GameOverScene properly receives data from GameScene
- [ ] Milestone state management prevents duplicates
- [ ] All Sprint 2A features still work (health, progression, basic game over)
- [ ] TDD approach followed (tests written FIRST, then implementation)

---

## Definition of Done

Sprint 2B is **DONE** when:

1. **All deliverables complete** (game over screen, milestone celebrations, tests)
2. **All success criteria verified** (functional, visual, child-friendly, technical)
3. **Manual testing passed**:
   - Play through full 15-question session
   - Verify milestone celebrations at 5, 10, 15 questions
   - Trigger defeat state (lose all health)
   - Trigger victory state (answer all questions)
   - Test "Try Again" button restart
   - Verify Vietnamese text in all new screens
4. **Tests passing**: 31+ unit tests (100% pass rate)
5. **No console errors**: Clean browser console during testing
6. **Git commits**: Progressive commits showing TDD approach (tests first)
7. **FE reports completion** to PM with commit hashes
8. **CR approval**: Code review passed with no critical issues

---

## Estimated Duration

**Estimated Time**: 2-3 hours

**Breakdown**:
- GameOverScene implementation: 1 hour
- Milestone celebrations implementation: 45 minutes
- Vietnamese text constants: 15 minutes
- Unit tests (TDD approach): 30 minutes
- Manual testing and polish: 30 minutes

**Based On**: Sprint 2A completed in ~1 hour (estimated 2-3 hours, 50% faster)

---

## Design Reference

**Full Design Document**: `docs/plan/sprints/sprint-2b-polish/design.md` (815 lines)

**Key Design Sections**:
1. Full Game Over Screen (FR-006) - Lines 1-245
   - Layout specifications (500px × 400px modal)
   - Two states (defeat/victory)
   - Statistics display with color-coded accuracy
   - Button designs and actions
   - Staggered animation sequence
2. Milestone Celebrations (GD Rec #3) - Lines 246-456
   - Research foundation (child psychology)
   - Milestone triggers (5, 10, 15, 20 questions)
   - Modal design (400px × 250px)
   - Vietnamese messages and icons
   - Progress bar specifications
   - Animation sequence (2.5s total)
3. Technical Specifications - Lines 457-562
   - GameOverScene structure
   - Milestone celebration component
   - State management approach
4. Testing Requirements - Lines 564-621
   - Unit tests (2 new tests)
   - Manual testing checklist (comprehensive)

**Research Foundation**:
- Children 8-12 need frequent positive feedback (GD research)
- 15 questions = 8-10 minutes continuous play
- Milestone celebrations prevent mid-session fatigue
- Expected impact: 20-30% increase in session completion

---

## Technical Notes

### File Structure Changes

```
src/
  ├── scenes/
  │   ├── GameScene.js              # MODIFY: Add milestone checks, game over triggers
  │   └── GameOverScene.js          # NEW: Dedicated game over scene
  ├── components/
  │   ├── HealthDisplay.js          # Sprint 2A (no changes)
  │   └── MilestoneCelebration.js   # NEW: Reusable celebration component
  └── tests/
      ├── healthManager.test.js     # Sprint 2A (existing, 7 tests)
      ├── gameProgression.test.js   # Sprint 2A (existing, 6 tests)
      ├── milestones.test.js        # NEW: Milestone detection tests
      └── gameStats.test.js          # NEW: Statistics calculation tests
```

### Vietnamese Text Constants (Reference)

```javascript
const MESSAGES = {
  gameOver: {
    healthDepleted: 'Hết cơ hội! Thử lại nhé!',
    victory: 'Hoàn thành! Xuất sắc!'
  },
  milestones: {
    5: 'Một phần tư rồi! 🎯',
    10: 'Nửa chặng đường! 🏆',
    15: 'Sắp xong rồi! 🚀',
    20: 'Về đích thôi! 🎉'
  },
  stats: {
    score: 'Điểm số cuối cùng',
    correct: 'Câu đúng',
    wrong: 'Câu sai',
    accuracy: 'Tỷ lệ chính xác'
  },
  buttons: {
    tryAgain: 'Chơi lại',
    mainMenu: 'Menu chính'
  }
};
```

### Timing Constants (Reference)

```javascript
const TIMINGS = {
  milestoneDuration: 2500,          // Auto-dismiss milestone
  gameOverDelay: 1000,              // Delay before showing game over
  gameOverStagger: {
    title: 0,
    score: 200,
    stats: 400,
    buttons: 600
  }
};
```

---

## Dependencies

**Requires (Must be complete before starting)**:
- ✅ Sprint 2A complete (game loop, health system, basic game over)
- ✅ 29 tests passing from Sprint 1 + 2A
- ✅ GameScene properly tracks score, correctCount, wrongCount

**Provides (Enables future work)**:
- Complete game session experience for Sprint 3 asset integration
- Milestone system foundation for future enhancements (Sprint 5)
- Statistics tracking for learning metrics (Sprint 9, M3)

---

## Deferred to Future Sprints

**Sprint 3** (UI/UX & Polish):
- Main menu screen (game over "Main Menu" button functionality)
- Sound effects for game over and milestones
- Particle effects (confetti - currently optional)
- Professional sprite graphics (MCP asset integration)

**Sprint 5** (M2 - Advanced Mechanics):
- Comeback mechanics (health restoration at 1 heart)
- Bonus questions (restore 1 heart every 10 correct)
- Enhanced milestone rewards

**Sprint 9** (M3 - Learning Metrics):
- Pre/post-test integration with game over stats
- Session history tracking
- Milestone achievement tracking over time

---

## Testing Checklist (Manual)

**Game Over Screen**:
- [ ] Defeat state shows on health = 0
- [ ] Victory state shows on all questions answered
- [ ] Final score matches gameplay score
- [ ] Correct/wrong counts are accurate
- [ ] Accuracy percentage calculated correctly
- [ ] Accuracy color coding works (red <50%, yellow 50-79%, blue ≥80%)
- [ ] "Chơi lại" button restarts game
- [ ] "Menu chính" button shows placeholder
- [ ] Staggered animations play smoothly
- [ ] Victory sparkle animation plays (victory only)

**Milestone Celebrations**:
- [ ] Celebration at 5 questions
- [ ] Celebration at 10 questions
- [ ] Celebration at 15 questions (if applicable)
- [ ] Correct icon for each milestone (🎯 🏆 🚀)
- [ ] Vietnamese message displays correctly
- [ ] Progress bar animates from 0 to current
- [ ] Progress text shows correct count (e.g., "5 / 15 câu")
- [ ] Auto-dismiss after 2.5 seconds
- [ ] Click to skip works immediately
- [ ] No duplicate celebrations

**Integration**:
- [ ] All Sprint 2A features still work
- [ ] Health system works correctly
- [ ] Question progression works
- [ ] No console errors during full session
- [ ] Vietnamese text renders in all new UI

---

## TDD Reminder (CRITICAL)

**FE MUST follow TDD approach**:

1. **Write tests FIRST** - Before writing any implementation code
2. **Run tests** - Verify they fail (red)
3. **Write minimal code** - Make tests pass (green)
4. **Refactor** - Improve code while keeping tests passing
5. **Repeat** - For each new feature/fix

**Example TDD Workflow for Milestone Detection**:
```bash
# 1. Write test first
# Edit: tests/milestones.test.js
# Add test: "should detect milestone at 5, 10, 15 questions"

# 2. Run test - should FAIL (red)
npm test

# 3. Write minimal implementation
# Edit: src/components/MilestoneCelebration.js or src/utils/milestones.js
# Add isMilestone(count) function

# 4. Run test - should PASS (green)
npm test

# 5. Refactor if needed, tests still pass
npm test
```

**Commit Pattern**: Tests should be committed BEFORE implementation in Git history

---

## Reporting Protocol (CRITICAL)

**FE MUST report back to PM after completing each deliverable**:

**Report When**:
- ✅ After GameOverScene implementation
- ✅ After milestone celebrations implementation
- ✅ After tests passing
- ✅ After manual testing complete
- ✅ When encountering blockers (immediately)

**Report Format**:
```bash
tm-send %12 "FE [HH:mm]: [Deliverable name] COMPLETE.
- Feature: [what was implemented]
- Tests: X/X passing (TDD approach followed)
- Commits: [commit hashes]
- Next: [what you're working on next]"
```

**Example**:
```bash
tm-send %12 "FE [15:30]: GameOverScene COMPLETE.
- Feature: Two-state game over screen (defeat/victory) with statistics
- Tests: 30/30 passing (1 new test for accuracy calculation)
- Commits: abc123, def456
- Next: Implementing milestone celebrations"
```

---

## Sprint Completion Report (Template for FE)

When Sprint 2B is complete, FE should send this summary to PM:

```
FE [HH:mm]: Sprint 2B COMPLETE ✅

**Deliverables**:
✅ Full game over screen (defeat/victory states)
✅ Milestone celebrations (5, 10, 15 questions)
✅ Vietnamese text in all new UI
✅ Unit tests (31+ passing)

**Tests**: 31/31 passing (TDD approach followed)
**Manual Testing**: All checklist items verified
**Commits**: [list 3-5 key commit hashes]
**No Console Errors**: Clean browser console
**Vietnamese Text**: All new UI elements localized

**Ready for CR review**
```

---

## References

- **Design Specification**: `docs/plan/sprints/sprint-2b-polish/design.md` (815 lines)
- **Game Research**: `docs/research/research-game-research.md` (child psychology, gamification)
- **Main Milestones**: `docs/plan/main-milestones.md` (M1 progress tracking)
- **Sprint 2A Review**: `docs/plan/sprints/sprint-2a-game-loop/review.md` (CR's comprehensive review)
- **README**: TDD section for development workflow

---

## Notes

- Sprint 2 was split into 2A + 2B due to large scope (650-line original design)
- Sprint 2A completed in ~1 hour (50% faster than 2-3 hour estimate)
- Sprint 2B builds on 2A's foundation (health, progression, basic game over)
- Milestone celebrations are GD Recommendation #3 based on child psychology research
- Main Menu button is placeholder (Sprint 3 will implement MenuScene)

---

**Created By**: PM (Project Manager)
**Date**: 2025-12-17
**Sprint Status**: 🟡 Ready to Start
**Next Action**: PM assigns to FE via tm-send
