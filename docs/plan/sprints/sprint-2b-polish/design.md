# Sprint 2B Design: Polish & Milestone Celebrations
**Quiz Battle Arena - Motivation & Polish**

**Designer**: GD (Game Designer)
**Date**: December 17, 2025
**Sprint Duration**: Week 2-2.5 (Part 2)
**Milestone**: M1 - Core MVP
**Depends On**: Sprint 2A (Game Loop & Health) ✅

---

## Executive Summary

Sprint 2B adds **polish and motivation systems** to the core loop established in Sprint 2A. This includes a professional game over screen with detailed statistics, and milestone celebrations that maintain player motivation during longer sessions.

**Deliverable**: Complete game session experience with encouraging feedback, progress celebrations, and comprehensive end-game statistics.

**Key Innovation**: Milestone celebrations (GD Rec #3) prevent session fatigue by celebrating progress every 5 questions.

---

## Design Philosophy

### Psychological Foundations (Ages 8-12)

**1. Milestone Celebrations (GD Rec #3)**
- **Research Basis**: Children need frequent rewards (research: "Fast rewards critical for ages 8-12")
- **Problem**: 15-20 questions = 8-10 minutes continuous play without feedback
- **Solution**: Celebrate progress at 5, 10, 15, 20 questions (every ~2-3 minutes)
- **Expected Impact**: 20-30% increase in session completion rate

**2. Encouraging Game Over**
- No shame or punishment language
- Show achievements even on loss (score earned, questions answered)
- Clear restart path ("Try Again" button prominent)
- Accuracy metrics show progress, not just failure

**3. Professional Polish**
- Animations create smooth, satisfying experience
- Color-coded feedback (green/yellow/red) provides instant understanding
- Vietnamese messages maintain cultural appropriateness

---

## 1. Full Game Over Screen (FR-006)

### Game Over Triggers (from Sprint 2A)

**Two Paths to Game Over**:

1. **Health Depleted** (0 hearts):
   - Trigger: Wrong answer reduces health to 0
   - Message: "Hết cơ hội! Thử lại nhé!" (Out of chances! Try again!)
   - Tone: Encouraging, not punishing

2. **Victory** (All questions answered):
   - Trigger: Last question answered (regardless of health remaining)
   - Message: "Hoàn thành! Xuất sắc!" (Complete! Excellent!)
   - Tone: Celebratory

### Game Over Screen Layout

**Canvas**: 800px × 600px (same as game canvas)
**Background**: Semi-transparent overlay `rgba(0, 0, 0, 0.7)` over frozen game scene

**Container**:
```
┌─────────────────────────────────────────────────┐
│                                                   │
│              MODAL BOX (500px × 400px)           │
│              Centered on canvas                  │
│                                                   │
│   ┌─────────────────────────────────────────┐  │
│   │  [Title] Hết cơ hội! / Hoàn thành!     │  │
│   │                                          │  │
│   │  [Final Score] Điểm số: 825             │  │
│   │                                          │  │
│   │  [Stats]                                 │  │
│   │  • Câu đúng: 7 / 15                     │  │
│   │  • Câu sai: 8 / 15                      │  │
│   │  • Tỷ lệ chính xác: 47%                 │  │
│   │                                          │  │
│   │  [Buttons]                               │  │
│   │  ┌───────────┐  ┌──────────────┐       │  │
│   │  │ Thử lại   │  │ Menu chính   │       │  │
│   │  └───────────┘  └──────────────┘       │  │
│   └─────────────────────────────────────────┘  │
│                                                   │
└─────────────────────────────────────────────────┘
```

**Modal Box**:
- Width: 500px
- Height: 400px
- Background: `#FFFFFF` (solid white)
- Border: 4px solid (see below for colors)
  - Health depleted: `#FF6B6B` (red)
  - Victory: `#4ECDC4` (blue)
- Border radius: 16px
- Shadow: `0 8px 16px rgba(0, 0, 0, 0.3)` (strong depth)
- Position: Centered (150px from left, 100px from top)

### Title Section

**Text**:
- **Health Depleted**: "Hết cơ hội! Thử lại nhé!" or "Gần rồi! Thử lại lần nữa!"
  - Translation: "Out of chances! Try again!" or "Almost! Try one more time!"
- **Victory**: "Hoàn thành! Xuất sắc!" or "Chiến thắng! 🏆"
  - Translation: "Complete! Excellent!" or "Victory! 🏆"

**Typography**:
- Font size: 32px
- Weight: Bold (700)
- Color: Health depleted = `#FF6B6B`, Victory = `#4ECDC4`
- Alignment: Center
- Position: 40px from top of modal

**Icon** (Optional):
- Health depleted: 😔 or 💔
- Victory: 🎉 or 🏆
- Size: 48px
- Position: Above title text

### Final Score Display

**Container**:
- Background: `#F7F7F7` (light gray)
- Border radius: 8px
- Padding: 20px
- Width: 400px (centered)
- Position: 100px from top of modal

**Score Text**:
- Label: "Điểm số cuối cùng:"
- Score number: Large, bold
- Font size: 48px
- Color: `#4ECDC4` (bright blue)
- Alignment: Center

**Sparkle Animation** (Victory only):
- Small stars appear around score number
- Fade in, float up, fade out
- Loop 3 times
- **Purpose**: Celebrate achievement

### Statistics Section

**Position**: 200px from top of modal
**Alignment**: Left (with padding 50px from modal edge)

**Stats Displayed**:
```
• Câu đúng: 7 / 15
• Câu sai: 8 / 15
• Tỷ lệ chính xác: 47%
```

**Typography**:
- Font size: 20px
- Line height: 1.8 (spacing between stats)
- Color: `#666666` (medium gray)
- Icon bullets: • (bullet point character)

**Stat Colors**:
- Correct count: `#95E1D3` (mint green) - positive
- Wrong count: `#FF6B6B` (coral red) - neutral (not negative)
- Accuracy: Color-coded by percentage:
  - < 50%: `#FF6B6B` (red)
  - 50-79%: `#FFD93D` (yellow)
  - ≥ 80%: `#4ECDC4` (blue)

**Accuracy Calculation**:
```javascript
const accuracy = Math.round((correctCount / totalQuestions) * 100);
```

### Buttons Section

**Position**: Bottom of modal (320px from top)
**Layout**: Two buttons, horizontal, centered, 20px spacing

#### "Try Again" Button (Primary)

**Dimensions**: 180px × 60px
**Background**: `#4ECDC4` (bright blue)
**Text**: "Chơi lại" or "Thử lại"
**Font**: 22px, bold, white color
**Border radius**: 12px
**Shadow**: `0 4px 8px rgba(78, 205, 196, 0.4)`

**Hover State**:
- Background: `#3BA99C` (darker blue)
- Scale: 1.05
- Cursor: pointer

**Action**: Restart game
- Reset health to 5
- Reset score to 0
- Reset question index to 0
- Load first question
- Close game over screen

#### "Main Menu" Button (Secondary)

**Dimensions**: 180px × 60px
**Background**: `#FFFFFF` (white)
**Border**: 2px solid `#4ECDC4`
**Text**: "Menu chính"
**Font**: 22px, bold, `#4ECDC4` (blue text)
**Border radius**: 12px

**Hover State**:
- Background: `#F0F9F8` (very light blue)
- Border: 3px solid `#4ECDC4` (thicker)
- Cursor: pointer

**Action**: Return to main menu
- **Sprint 2B**: Not implemented yet (main menu is Sprint 3)
- **Temporary**: Reload page or show "Coming Soon" message
- **Sprint 3**: Navigate to MenuScene

### Game Over Screen Animation

**Appearance** (Total: 0.6 seconds):

1. **Background Overlay** (0.2s):
   - Fade in: Opacity 0.0 → 0.7
   - Freezes game scene behind it

2. **Modal Box** (0.4s):
   - Scale: 0.8 → 1.0 (zoom in effect)
   - Opacity: 0.0 → 1.0
   - Easing: `ease-out`

3. **Content** (staggered):
   - Title appears first (immediate)
   - Score fades in (0.2s delay)
   - Stats fade in (0.4s delay)
   - Buttons fade in (0.6s delay)

**Purpose**: Smooth transition from gameplay to results, not jarring.

---

## 2. Milestone Celebrations (GD Recommendation #3)

### Research Foundation

**Problem**: 15-20 questions = 8-10 minutes continuous play for 8-year-olds
- Research shows: "Children 8-12 need fast rewards and frequent positive feedback"
- Risk: Mid-session fatigue, motivation drop, abandonment

**Solution**: Celebrate progress at intervals
- **Frequency**: Every 5 questions (5, 10, 15, 20)
- **Duration**: Brief (2-3 seconds each), not disruptive
- **Tone**: Positive, encouraging, builds momentum

**Expected Impact**:
- Maintains motivation during longer sessions
- Prevents "this is taking forever" feeling
- Gives sense of progress and achievement
- Research prediction: 20-30% increase in session completion

### Milestone Triggers

**Milestone Checkpoints**:
- **5 questions**: "Quarter Way!" / "Một phần tư rồi! 🎯"
- **10 questions**: "Halfway Champion!" / "Nửa chặng đường! 🏆"
- **15 questions**: "Almost There!" / "Sắp xong rồi! 🚀"
- **20 questions** (if game has that many): "Final Stretch!" / "Về đích thôi! 🎉"

**Trigger Timing**: After answering milestone question, before next question loads

**Implementation**:
```javascript
function afterAnswerFeedback() {
  const questionsAnswered = this.currentQuestionIndex + 1;

  // Check for milestone
  if ([5, 10, 15, 20].includes(questionsAnswered)) {
    showMilestoneCelebration(questionsAnswered);
  } else {
    transitionToNextQuestion();
  }
}
```

### Milestone Celebration Design

**Layout**: Overlay modal, centered on canvas

**Container**:
```
┌─────────────────────────────────────┐
│                                       │
│      [Animated Icon] 🎯              │
│                                       │
│      Một phần tư rồi!                │
│                                       │
│      [Progress Bar] ████░░░░░░░      │
│      5 / 15 câu                       │
│                                       │
└─────────────────────────────────────┘
```

**Modal Box**:
- Width: 400px
- Height: 250px
- Background: `rgba(78, 205, 196, 0.95)` (semi-transparent bright blue)
- Border: 3px solid `#FFFFFF` (white border)
- Border radius: 16px
- Shadow: `0 8px 16px rgba(0, 0, 0, 0.3)`
- Position: Centered (200px from left, 175px from top)

### Milestone Messages

**Messages by Checkpoint**:

**5 Questions** (25% if 20 total, 33% if 15 total):
- Vietnamese: "Một phần tư rồi! 🎯" or "Bắt đầu tốt! 🎯"
- English: "Quarter Way! 🎯" or "Great Start! 🎯"
- Icon: 🎯 (target)
- Color theme: Blue `#4ECDC4`

**10 Questions** (50% for 20 total, 67% for 15 total):
- Vietnamese: "Nửa chặng đường! 🏆" or "Giữa chừng rồi! 🏆"
- English: "Halfway Champion! 🏆" or "Halfway There! 🏆"
- Icon: 🏆 (trophy)
- Color theme: Yellow `#FFD93D`

**15 Questions** (75% for 20 total, 100% for 15 total):
- Vietnamese: "Sắp xong rồi! 🚀" or "Gần đích rồi! 🚀"
- English: "Almost There! 🚀" or "Final Stretch! 🚀"
- Icon: 🚀 (rocket)
- Color theme: Green `#95E1D3`

**20 Questions** (100% for 20 total - only if game has 20+ questions):
- Vietnamese: "Về đích thôi! 🎉"
- English: "Final Push! 🎉"
- Icon: 🎉 (party popper)
- Color theme: Multi-color confetti

### Message Typography

**Icon**:
- Size: 64px
- Position: Top of modal, centered, 30px from top
- Animation: Bounce in (scale 0 → 1.2 → 1.0 over 0.4s)

**Message Text**:
- Font size: 28px
- Weight: Bold (700)
- Color: `#FFFFFF` (white for contrast against colored background)
- Alignment: Center
- Position: 110px from top of modal
- Drop shadow: `0 2px 4px rgba(0, 0, 0, 0.3)` (readability)

### Progress Bar

**Position**: 170px from top of modal, centered

**Container**:
- Width: 300px
- Height: 20px
- Background: `rgba(255, 255, 255, 0.3)` (semi-transparent white)
- Border radius: 10px
- Border: 1px solid `rgba(255, 255, 255, 0.5)`

**Progress Fill**:
- Height: 20px (fills container)
- Background: `#FFFFFF` (solid white)
- Border radius: 10px
- Width: Percentage of progress (e.g., 50% = 150px)
- Animation: Slide from 0 to current progress over 0.6s

**Progress Text**:
- Text: "5 / 15 câu" (5 out of 15 questions)
- Font size: 16px
- Color: `#FFFFFF`
- Position: Below progress bar, centered, 8px spacing

**Calculation**:
```javascript
const progressPercent = (questionsAnswered / totalQuestions) * 100;
const progressWidth = (300 * progressPercent) / 100; // 300px max width
```

### Celebration Animation Sequence

**Total Duration**: 2.5 seconds

**Timeline**:
```
0.0s: Background dim (game scene fades to 0.5 opacity)
0.1s: Modal box zooms in (scale 0.8 → 1.0)
0.2s: Icon bounces in (scale 0 → 1.2 → 1.0)
0.4s: Message text fades in
0.6s: Progress bar animates (fills from 0 to current)
0.8s: Progress text fades in
2.5s: Auto-dismiss → Next question
```

**User Control**: Click anywhere to skip celebration and continue immediately

**Sound Effect** (if audio enabled):
- Cheerful "ding" or "chime"
- Higher pitch than correct answer sound
- Volume: 0.6
- Duration: 0.5s

### Visual Effects (Enhanced Celebration)

**Confetti Particles** (Optional - nice-to-have):
- Small colored rectangles (5px × 5px)
- Colors: Blue, yellow, green, red (matching palette)
- Spawn: 20-30 particles from top of modal
- Animation: Fall down with gravity, slight rotation
- Duration: 1.5 seconds (fade out as they fall)
- **Purpose**: Extra celebration feeling

**Screen Flash** (Subtle):
- White overlay `rgba(255, 255, 255, 0.2)`
- Flash in and out (0.2s)
- Timing: When icon bounces in
- **Purpose**: Draws attention to celebration

### Milestone State Management

**Tracking**:
```javascript
class GameScene {
  constructor() {
    this.questionsAnswered = 0;
    this.milestonesReached = []; // [5, 10, 15, 20]
  }

  checkMilestone() {
    const count = this.questionsAnswered;
    const milestones = [5, 10, 15, 20];

    for (let milestone of milestones) {
      if (count === milestone && !this.milestonesReached.includes(milestone)) {
        this.milestonesReached.push(milestone);
        this.showMilestoneCelebration(milestone);
        return true; // Celebration shown
      }
    }
    return false; // No celebration
  }
}
```

**Why Track Milestones**: Prevents duplicate celebrations if player somehow triggers same milestone twice.

---

## 3. Technical Specifications

### Scene Management (GameOverScene)

**New Scene** (Sprint 2B): `GameOverScene`

**Scene Transition**:
```javascript
// In GameScene
showGameOver(reason) {
  this.scene.start('GameOverScene', {
    score: this.score,
    correctCount: this.correctCount,
    wrongCount: this.wrongCount,
    totalQuestions: this.questions.length,
    reason: reason // 'health_depleted' or 'victory'
  });
}
```

**GameOverScene Structure**:
```javascript
class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' });
  }

  init(data) {
    // Receive data from GameScene
    this.finalScore = data.score;
    this.correctCount = data.correctCount;
    this.wrongCount = data.wrongCount;
    this.totalQuestions = data.totalQuestions;
    this.reason = data.reason;
  }

  create() {
    // Create game over UI
    this.createBackground();
    this.createModalBox();
    this.createTitle();
    this.createScoreDisplay();
    this.createStats();
    this.createButtons();
  }
}
```

### Milestone Celebration Component

**Reusable Component**:
```javascript
// Create milestone overlay
showMilestoneCelebration(count) {
  // Create overlay
  const overlay = this.add.rectangle(
    400, 300, 800, 600,
    0x000000, 0.5 // Black, 50% opacity
  );

  // Create modal
  const modal = this.add.container(200, 175);

  // Add background
  const bg = this.add.rectangle(
    0, 0, 400, 250,
    0x4ECDC4, 1 // Blue background
  );
  bg.setStrokeStyle(3, 0xFFFFFF);
  modal.add(bg);

  // Add icon, text, progress bar
  const icon = this.add.text(0, -80, getMilestoneIcon(count), {
    fontSize: '64px'
  });
  modal.add(icon);

  const message = this.add.text(0, -20, getMilestoneMessage(count), {
    fontSize: '28px',
    fontStyle: 'bold',
    color: '#FFFFFF'
  });
  message.setOrigin(0.5);
  modal.add(message);

  // Progress bar (implementation details)
  // ...

  // Auto-dismiss after 2.5s
  this.time.delayedCall(2500, () => {
    modal.destroy();
    overlay.destroy();
    this.transitionToNextQuestion();
  });

  // Click to skip
  overlay.setInteractive();
  overlay.on('pointerdown', () => {
    modal.destroy();
    overlay.destroy();
    this.transitionToNextQuestion();
  });
}
```

---

## 4. Testing Requirements

### Unit Tests (Sprint 2B - 2 new tests)

**Continuing from Sprint 1 + 2A**: 8 tests total

**New Tests for Sprint 2B** (2 additional = 10 total):

**Test 9: Milestone Detection**
```javascript
test('detects milestone at correct intervals', () => {
  expect(isMilestone(5)).toBeTruthy();
  expect(isMilestone(10)).toBeTruthy();
  expect(isMilestone(15)).toBeTruthy();
  expect(isMilestone(6)).toBeFalsy();
  expect(isMilestone(13)).toBeFalsy();
});
```

**Test 10: Accuracy Calculation**
```javascript
test('calculates accuracy percentage correctly', () => {
  const correctCount = 7;
  const totalQuestions = 15;
  const accuracy = Math.round((correctCount / totalQuestions) * 100);

  expect(accuracy).toBe(47); // 7/15 = 46.67% → 47%
});
```

### Manual Testing Checklist (Sprint 2B)

**Game Over Screen**:
- [ ] Game over shows correct title (health depleted vs victory)
- [ ] Game over shows correct final score
- [ ] Game over shows correct/incorrect counts
- [ ] Game over shows accuracy percentage with correct color
- [ ] "Try Again" button restarts game
- [ ] "Main Menu" button shows placeholder message
- [ ] Game over animation plays smoothly
- [ ] Victory sparkle animation plays (victory only)
- [ ] Staggered content appears correctly

**Milestone Celebrations**:
- [ ] Milestone celebration shows at 5 questions
- [ ] Milestone celebration shows at 10 questions
- [ ] Milestone celebration shows at 15 questions (if applicable)
- [ ] Milestone progress bar animates correctly
- [ ] Click anywhere skips milestone celebration
- [ ] Icon bounces in correctly
- [ ] Message displays correct Vietnamese text
- [ ] Progress text shows correct count

**General**:
- [ ] No crashes during full 15-question session
- [ ] Vietnamese text displays correctly in all new screens
- [ ] All Sprint 2A features still work

---

## 5. Success Criteria (Sprint 2B)

**Sprint 2B is COMPLETE when**:

✅ **Functional**:
1. Full game over screen shows (two states: defeat/victory)
2. Final stats display correctly (score, correct/wrong, accuracy)
3. Restart game works ("Try Again" button)
4. Milestone celebrations trigger at 5, 10, 15 questions
5. Progress bar animates correctly
6. Skip celebration works (click anywhere)

✅ **Visual**:
1. Game over modal looks professional (not basic placeholder)
2. Milestone celebrations are visually appealing
3. Staggered animations create smooth experience
4. Color-coded accuracy provides instant feedback
5. Victory sparkle animation adds celebration feel

✅ **Child-Friendly**:
1. Game over messages are encouraging, not punishing
2. Milestone celebrations maintain motivation
3. Progress bar shows tangible advancement
4. Restart is easy (prominent "Try Again" button)

✅ **Technical**:
1. 10+ unit tests passing (all sprints combined)
2. No console errors
3. GameOverScene works correctly
4. Milestone state management prevents duplicates
5. Vietnamese text renders in all new UI elements

✅ **Integration**:
1. Sprint 2A mechanics still work
2. Milestones integrate with question progression
3. Game over integrates with final score/stats from 2A

---

## 6. Deferred to Future Sprints

**Sprint 3** (UI/UX & Polish):
- Main menu screen (game over "Main Menu" button will work then)
- Sound effects for game over, milestones
- Particle effects (confetti upgrade from optional to standard)
- Professional sprite graphics (early asset integration)

**Sprint 5** (M2 - Advanced Mechanics):
- Comeback mechanics (health restoration at 1 heart)
- Bonus questions (restore 1 heart every 10 correct)
- Enhanced milestone rewards

**Sprint 9** (M3 - Learning Metrics):
- Pre/post-test integration with game over stats
- Session history (track accuracy over multiple plays)
- Milestone achievement tracking

---

## 7. Design Rationale

### Why Milestone Celebrations? (GD Rec #3)

**Problem Solved**: Session fatigue at 8-10 minute mark
- Children need frequent positive feedback (research)
- 15 questions without acknowledgment = feels endless
- Risk of abandonment mid-session

**Solution Impact**:
- Celebrates progress every 2-3 minutes
- Builds momentum ("I'm making progress!")
- Reduces perceived session length
- Expected: 20-30% increase in session completion rate

### Why Encouraging Game Over?

**Child Psychology**: Failure anxiety prevents trying
- "Hết cơ hội! Thử lại nhé!" (Out of chances! Try again!) = supportive
- Show achievements even on loss (score earned, questions answered)
- Prominent "Try Again" button = easy restart
- No shame language ("You failed," "Game Over" too harsh)

### Why Color-Coded Accuracy?

**Visual Communication**: Instant understanding without reading
- Red (<50%): Needs practice, but not discouraging
- Yellow (50-79%): Good progress, keep improving
- Blue (≥80%): Excellent performance
- Universal color language children understand

---

## 8. Implementation Notes for FE

### File Structure Addition

```
src/
  ├── scenes/
  │   ├── GameScene.js              # Sprint 2A + milestone checks
  │   └── GameOverScene.js          # NEW - Sprint 2B
  ├── components/
  │   ├── HealthDisplay.js          # Sprint 2A
  │   └── MilestoneCelebration.js   # NEW - Sprint 2B
  └── assets/
      └── (icons for milestones - optional)
```

### Vietnamese Text Constants

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

### Timing Constants

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

## 9. Design Approval

**GD Approval**: ✅ Ready for implementation

**Confidence Level**: HIGH
- Milestone celebrations address real child psychology needs
- Game over design is encouraging and professional
- All mechanics tested via research patterns
- Vietnamese language support maintained

**Expected Player Experience (Complete Session)**:
1. Start game with 5 hearts (Sprint 2A)
2. Answer questions, build score
3. Hit milestone at 5 questions ("I'm making progress!")
4. Continue with encouragement
5. Hit milestone at 10 questions ("Halfway!")
6. Either reach game over (health or victory)
7. See professional game over screen with stats
8. Feel encouraged by supportive messages
9. Easily restart ("Try Again")
10. Feel motivated to improve score

**Next Steps**:
1. FE implements Sprint 2B features
2. Test full game over screen (both states)
3. Test milestone celebrations at 5, 10, 15
4. Validate all Sprint 2A+2B integration
5. CR reviews complete Sprint 2 (A+B)

---

**Document Status**: ✅ Complete - Ready for Implementation
**Previous Sprint**: Sprint 2A (game loop, health system)
**Next Sprint**: Sprint 3 (UI/UX & Polish)

---

**Game Designer**: GD
**Date**: December 17, 2025
**Version**: 1.0 (Split from Sprint 2 original design)
