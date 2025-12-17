# Sprint 2A Design: Game Loop & Health System
**Quiz Battle Arena - Core Loop Foundation**

**Designer**: GD (Game Designer)
**Date**: December 17, 2025
**Sprint Duration**: Week 2-2.5 (Part 1)
**Milestone**: M1 - Core MVP
**Depends On**: Sprint 1 (Core Mechanics) ✅

---

## Executive Summary

Sprint 2A establishes the **fundamental game loop** with health management and question progression. Players now have limited health (5 hearts), lose health on wrong answers, and progress through questions with smooth transitions. This sprint creates the continuous gameplay loop that transforms individual questions into a complete gaming experience.

**Deliverable**: Players can play through multiple questions with health tracking, and reach a basic game over state when health depletes or questions complete.

**Deferred to Sprint 2B**: Full game over screen polish, milestone celebrations, comprehensive statistics.

---

## Design Philosophy

### Psychological Foundations (Ages 8-12)

**1. Health as Learning Currency**
- Health represents "chances to learn," not "lives to lose"
- Losing health is natural part of learning process
- 5 hearts = forgiving (allows 5 mistakes before game over)

**2. Smooth Progression**
- Question transitions prevent jarring jumps
- Visual continuity maintains immersion
- Pre-loading prevents lag between questions

**3. Basic Game Over (Sprint 2A Scope)**
- Simple trigger: health = 0 OR all questions answered
- Temporary screen with basic stats and restart button
- Full polish deferred to Sprint 2B

### Subject-Agnostic Continuity
- Health hearts (universal symbol), not subject-specific icons
- All text from questions.json or constants
- Vietnamese language support continues

---

## 1. Health System (FR-005)

### Health Representation

**Visual**: Hearts (❤️)
**Starting Health**: 5 hearts
**Loss Condition**: -1 heart per wrong answer
**Restoration**: None in Sprint 2A/2B (comeback mechanics in Sprint 5, M2)

### Health Display (HUD)

**Position**: Top-right corner of canvas

**Layout**:
```
┌─────────────────────────────────┐
│  ❤️ ❤️ ❤️ ❤️ ❤️              │  Full health (5 hearts)
└─────────────────────────────────┘

┌─────────────────────────────────┐
│  ❤️ ❤️ ❤️ 💔 💔              │  3 hearts remaining
└─────────────────────────────────┘

┌─────────────────────────────────┐
│  💔 💔 💔 💔 💔              │  0 hearts (GAME OVER)
└─────────────────────────────────┘
```

**Container**:
- Background: `rgba(255, 255, 255, 0.9)` (semi-transparent white)
- Border: 2px solid `#FF6B6B` (coral red - health theme)
- Border radius: 8px
- Padding: 10px 15px
- Position: 20px from right, 20px from top
- Width: Auto (adjusts to heart count)

**Heart Icons**:
- **Full Heart**: ❤️ (Red) - Use Unicode emoji or simple sprite
- **Empty Heart**: 💔 (Gray) - Broken heart or hollow heart
- Size: 32px × 32px (each heart)
- Spacing: 8px between hearts
- Arrangement: Horizontal row, left to right

**Alternative Text Fallback** (if emojis not supported):
- Full: "♥" (filled heart character)
- Empty: "♡" (hollow heart character)
- Font size: 28px
- Color: Full = `#FF6B6B`, Empty = `#CCCCCC`

### Health Loss Animation

**Trigger**: Wrong answer validation

**Sequence**:
1. **Identify Lost Heart**:
   - Rightmost full heart (last in row)
   - Example: 5 hearts → lose 5th heart → becomes empty

2. **Break Animation** (0.5 seconds):
   - Heart scales to 1.2x (grow)
   - Rotate 15° clockwise, then -15° counterclockwise (shake)
   - Color transition: Red → Gray (fade out color)
   - Change to empty heart icon 💔
   - Scale back to 1.0x

3. **Screen Feedback**:
   - Entire health container pulses red briefly
   - Border glows: `box-shadow: 0 0 12px rgba(255, 107, 107, 0.8)`
   - Duration: 0.3 seconds
   - Syncs with wrong answer feedback from Sprint 1

4. **Low Health Warning** (1-2 hearts remaining):
   - Health container border turns bright red `#FF0000`
   - Hearts pulse gently (scale 1.0 → 1.05 → 1.0, repeating)
   - Subtle screen vignette (red tint at edges)
   - **Purpose**: Alert player they're close to game over

### Health State Tracking

**Game State Variables**:
```javascript
class GameScene {
  constructor() {
    this.maxHealth = 5;
    this.currentHealth = 5;
    this.healthHearts = []; // Array of heart sprites
  }

  loseHealth() {
    if (this.currentHealth > 0) {
      this.currentHealth--;
      this.updateHealthDisplay();

      if (this.currentHealth === 0) {
        this.triggerGameOver('health_depleted');
      } else if (this.currentHealth <= 2) {
        this.showLowHealthWarning();
      }
    }
  }

  updateHealthDisplay() {
    // Update visual hearts (full → empty)
    for (let i = 0; i < this.maxHealth; i++) {
      if (i < this.currentHealth) {
        this.healthHearts[i].setTexture('heart_full');
      } else {
        this.healthHearts[i].setTexture('heart_empty');
      }
    }
  }
}
```

### Health and Wrong Answer Integration

**From Sprint 1**: Wrong answer shows explanation, awards +25 Learning Points

**New in Sprint 2A**: Wrong answer ALSO loses 1 heart

**Combined Flow**:
```
Wrong Answer
    ↓
1. Show error feedback (Sprint 1)
    ↓
2. Award +25 Learning Points (Sprint 1)
    ↓
3. Lose 1 heart (NEW - Sprint 2A)
    ↓
4. Check if health = 0
    ↓
    ├─→ Health > 0: Show explanation → Next question
    └─→ Health = 0: SKIP explanation → Basic Game Over
```

**Design Decision**: If health reaches 0, skip explanation and go straight to game over. Player has lost and should see results immediately, not read another explanation.

---

## 2. Question Progression System

### Progression Logic

**Question Flow**:
```
Start Game (Question 1)
    ↓
Answer Question
    ↓
Show Feedback (1.5s correct, 3-7s wrong with explanation)
    ↓
Check Conditions:
    ├─→ Health = 0? → BASIC GAME OVER (health depleted)
    ├─→ All questions answered? → BASIC GAME OVER (victory)
    └─→ Otherwise → Next question
```

**Question Counter**:
- Track: `currentQuestionIndex` (0-based)
- Total: `totalQuestions` (from questions.json, default 15)
- Display: Not shown to player in Sprint 2A

### Question Transition Animation

**Purpose**: Smooth visual flow between questions, not jarring jumps

**Transition Sequence** (Total: 0.8 seconds):

1. **Fade Out Current Question** (0.3s):
   - Question text: Opacity 1.0 → 0.0
   - Targets: Opacity 1.0 → 0.0
   - Simultaneous fade

2. **Brief Pause** (0.2s):
   - Blank canvas (just score and health visible)
   - Gives visual "reset" moment

3. **Fade In Next Question** (0.3s):
   - Question text: Opacity 0.0 → 1.0
   - Targets: Opacity 0.0 → 1.0
   - Slide down 20px (same as Sprint 1 initial appearance)

**Optimization**: Pre-load next question data during feedback display to prevent lag.

### Transition Implementation

```javascript
function transitionToNextQuestion() {
  // Fade out current question
  this.tweens.add({
    targets: [this.questionText, ...this.targets],
    alpha: 0,
    duration: 300,
    onComplete: () => {
      // Brief pause
      this.time.delayedCall(200, () => {
        // Load next question
        this.currentQuestionIndex++;
        if (this.currentQuestionIndex < this.questions.length) {
          this.showQuestion(this.questions[this.currentQuestionIndex]);
        } else {
          this.triggerGameOver('victory');
        }
      });
    }
  });
}

function showQuestion(question) {
  // Update question text and targets
  this.questionText.setText(question.question);
  // ... assign answers to targets

  // Fade in with slide down
  this.questionText.setAlpha(0);
  this.questionText.setY(this.questionText.y - 20);
  this.targets.forEach(t => t.setAlpha(0));

  this.tweens.add({
    targets: [this.questionText, ...this.targets],
    alpha: 1,
    y: '+=20',
    duration: 300,
    ease: 'Power2'
  });
}
```

---

## 3. Basic Game Over (Sprint 2A Scope)

### Game Over Triggers

**Two Paths to Game Over**:

1. **Health Depleted** (0 hearts):
   - Trigger: Wrong answer reduces health to 0
   - Action: Immediate game over

2. **Victory** (All questions answered):
   - Trigger: Last question answered
   - Action: Immediate game over

### Basic Game Over Screen (Temporary - Sprint 2A)

**Purpose**: Minimal functional screen for Sprint 2A testing. Full polish in Sprint 2B.

**Layout**: Simple overlay modal

**Container**:
- Width: 400px
- Height: 300px
- Background: `#FFFFFF`
- Border: 3px solid `#4ECDC4`
- Position: Centered
- Shadow: `0 8px 16px rgba(0, 0, 0, 0.3)`

**Content**:
```
┌──────────────────────────┐
│   Game Over              │
│                          │
│   Score: 825             │
│   Correct: 7 / 15        │
│   Wrong: 8 / 15          │
│                          │
│   [Restart Button]       │
└──────────────────────────┘
```

**Title**:
- Text: "Game Over" (simple, placeholder)
- Font: 28px, bold
- Color: `#333333`

**Stats** (basic):
- Score display
- Correct/wrong counts
- Font: 20px
- Color: `#666666`

**Restart Button**:
- Width: 180px × 60px
- Background: `#4ECDC4`
- Text: "Chơi lại" (Play Again)
- Font: 22px, bold, white
- Action: Restart game

**Note for Sprint 2B**: This will be replaced with full game over screen including:
- Victory/defeat states with different messages
- Accuracy percentage
- Professional styling
- Main Menu button
- Animations

---

## 4. Integration with Sprint 1

### Score System Integration

**Sprint 1**: Score displayed in top-left HUD
**Sprint 2A**: Score persists through game over

**Basic Game Over Display**:
- Final score shown in game over screen
- Score value carried from gameplay
- No reset between questions and game over

### Question Display Integration

**Sprint 1**: Single question display with targets
**Sprint 2A**: Question progression, transitions

**Continuity**:
- Same question display format (Sprint 1)
- Same target system (Sprint 1)
- Same feedback animations (Sprint 1)
- **New**: Transitions between questions
- **New**: Health loss on wrong answers

### Feedback System Integration

**Sprint 1**: Immediate feedback (correct/wrong)
**Sprint 2A**: Health check after wrong feedback

**Combined Flow**:
```
Sprint 1: Click → Validate → Feedback → Score Update
Sprint 2A: Click → Validate → Feedback → Score Update → Health Update → Next Question or Game Over
```

---

## 5. Technical Specifications

### Game State Extension

**New State Variables**:
```javascript
class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });

    // Sprint 1 variables
    this.score = 0;
    this.currentQuestionIndex = 0;
    this.questions = [];

    // Sprint 2A NEW variables
    this.currentHealth = 5;
    this.maxHealth = 5;
    this.questionsAnswered = 0;
    this.correctCount = 0;
    this.wrongCount = 0;
  }

  // Sprint 2A NEW methods
  loseHealth() { /* ... */ }
  checkGameOver() { /* ... */ }
  showBasicGameOver(reason) { /* ... */ }
  transitionToNextQuestion() { /* ... */ }
  restartGame() { /* ... */ }
}
```

### Health Sprite Management

**Heart Sprites**:
```javascript
// Create hearts
createHealthDisplay() {
  this.healthHearts = [];

  for (let i = 0; i < this.maxHealth; i++) {
    const heart = this.add.sprite(
      700 + (i * 40), // X position (spacing: 40px)
      30,             // Y position (top-right)
      'heart_full'    // Texture key
    );
    heart.setScale(0.8); // Size adjustment
    this.healthHearts.push(heart);
  }
}

// Update hearts
updateHealthDisplay() {
  for (let i = 0; i < this.maxHealth; i++) {
    if (i < this.currentHealth) {
      this.healthHearts[i].setTexture('heart_full');
      this.healthHearts[i].setTint(0xFFFFFF); // No tint (full color)
    } else {
      this.healthHearts[i].setTexture('heart_empty');
      this.healthHearts[i].setTint(0x999999); // Gray tint
    }
  }
}
```

**Placeholder Hearts** (MVP - no custom sprites yet):
- Use text emojis: "❤️" and "💔"
- Or use Phaser shapes: Red circles (full), gray circles (empty)
- Upgrade to sprite graphics in Sprint 3 (early asset integration)

### Basic Game Over Implementation

```javascript
showBasicGameOver(reason) {
  // Create simple overlay
  const overlay = this.add.rectangle(400, 300, 800, 600, 0x000000, 0.7);

  // Create modal container
  const modal = this.add.container(400, 300);

  // Background
  const bg = this.add.rectangle(0, 0, 400, 300, 0xFFFFFF);
  bg.setStrokeStyle(3, 0x4ECDC4);
  modal.add(bg);

  // Title
  const title = this.add.text(0, -100, 'Game Over', {
    fontSize: '28px',
    fontStyle: 'bold',
    color: '#333333'
  });
  title.setOrigin(0.5);
  modal.add(title);

  // Stats
  const scoreText = this.add.text(0, -40, `Score: ${this.score}`, {
    fontSize: '20px',
    color: '#666666'
  });
  scoreText.setOrigin(0.5);
  modal.add(scoreText);

  const correctText = this.add.text(0, -10, `Correct: ${this.correctCount} / ${this.questions.length}`, {
    fontSize: '20px',
    color: '#666666'
  });
  correctText.setOrigin(0.5);
  modal.add(correctText);

  const wrongText = this.add.text(0, 20, `Wrong: ${this.wrongCount} / ${this.questions.length}`, {
    fontSize: '20px',
    color: '#666666'
  });
  wrongText.setOrigin(0.5);
  modal.add(wrongText);

  // Restart button
  const button = this.add.rectangle(0, 90, 180, 60, 0x4ECDC4);
  button.setInteractive({ useHandCursor: true });
  button.on('pointerdown', () => this.restartGame());
  modal.add(button);

  const buttonText = this.add.text(0, 90, 'Chơi lại', {
    fontSize: '22px',
    fontStyle: 'bold',
    color: '#FFFFFF'
  });
  buttonText.setOrigin(0.5);
  modal.add(buttonText);
}

restartGame() {
  // Reset all game state
  this.score = 0;
  this.currentHealth = 5;
  this.currentQuestionIndex = 0;
  this.correctCount = 0;
  this.wrongCount = 0;
  this.questionsAnswered = 0;

  // Restart scene
  this.scene.restart();
}
```

---

## 6. Testing Requirements

### Unit Tests (Sprint 2A - 3 new tests)

**Continuing from Sprint 1**: 5 tests (question loading, shuffling, score, click detection)

**New Tests for Sprint 2A** (3 additional):

**Test 6: Health Loss**
```javascript
test('loses 1 health on wrong answer', () => {
  const initialHealth = 5;
  const newHealth = calculateHealth(initialHealth, false);
  expect(newHealth).toBe(4);
});
```

**Test 7: Game Over Trigger (Health)**
```javascript
test('triggers game over when health reaches 0', () => {
  let health = 1;
  let gameOver = false;

  // Wrong answer
  health = calculateHealth(health, false);
  if (health === 0) gameOver = true;

  expect(health).toBe(0);
  expect(gameOver).toBeTruthy();
});
```

**Test 8: Game Over Trigger (Victory)**
```javascript
test('triggers game over when all questions answered', () => {
  const currentIndex = 14; // Last question (0-based)
  const totalQuestions = 15;
  const isVictory = (currentIndex + 1) >= totalQuestions;

  expect(isVictory).toBeTruthy();
});
```

### Manual Testing Checklist (Sprint 2A)

- [ ] Health starts at 5 hearts
- [ ] Health decreases by 1 on wrong answer
- [ ] Health display updates correctly (hearts turn gray)
- [ ] Low health warning shows (1-2 hearts)
- [ ] Game over triggers at 0 health
- [ ] Game over triggers after last question
- [ ] Basic game over shows score and counts
- [ ] Restart button resets game correctly
- [ ] Question transitions are smooth (no lag)
- [ ] Health loss animation plays correctly
- [ ] No crashes during full 15-question session
- [ ] Vietnamese text displays correctly in health HUD

---

## 7. Success Criteria (Sprint 2A)

**Sprint 2A is COMPLETE when**:

✅ **Functional**:
1. Health system works (5 hearts, -1 per wrong, game over at 0)
2. Question progression works (all 15 questions playable with transitions)
3. Basic game over screen shows (health depleted or victory)
4. Restart functionality works
5. All Sprint 1 features still work

✅ **Visual**:
1. Health hearts display in top-right HUD
2. Hearts update visually when health lost
3. Low health warning shows (pulsing hearts, red border)
4. Question transitions are smooth
5. Basic game over modal displays correctly

✅ **Technical**:
1. 8+ unit tests passing (5 from Sprint 1 + 3 new)
2. No console errors
3. Smooth transitions (no lag or jank)
4. Vietnamese text renders in health HUD

✅ **Integration**:
1. Sprint 1 mechanics still work (scoring, feedback, clicks)
2. Health integrates with wrong answer feedback
3. Score carries through to game over

---

## 8. Deferred to Sprint 2B

**Full Game Over Screen**:
- Victory/defeat state messages
- Accuracy percentage calculation
- Professional modal styling
- Main Menu button (placeholder in 2A)
- Staggered content animations

**Milestone Celebrations**:
- Progress celebrations at 5, 10, 15 questions
- Animated icons and progress bars
- Confetti effects
- Encouragement messages

**Enhanced Testing**:
- Milestone detection tests
- Accuracy calculation tests
- Full manual testing checklist

---

## 9. Implementation Notes for FE

### File Structure Addition

```
src/
  ├── scenes/
  │   └── GameScene.js              # Sprint 1 + Sprint 2A additions
  ├── components/
  │   ├── HealthDisplay.js          # NEW - Sprint 2A
  │   └── (Sprint 1 components)
  ├── utils/
  │   └── (Sprint 1 utils)
  └── assets/
      └── (placeholder hearts)
```

### Timing Constants

```javascript
const TIMINGS = {
  questionTransition: 800,      // Total transition time (ms)
  questionFadeOut: 300,
  questionPause: 200,
  questionFadeIn: 300,
  healthLossAnimation: 500,     // Heart break animation
  lowHealthPulse: 1000          // Heart pulse cycle
};
```

### Vietnamese Text Constants

```javascript
const MESSAGES = {
  gameOver: {
    title: 'Game Over'  // Temporary for Sprint 2A
  },
  stats: {
    score: 'Score',
    correct: 'Correct',
    wrong: 'Wrong'
  },
  buttons: {
    restart: 'Chơi lại'
  }
};
```

---

## 10. Design Approval

**GD Approval**: ✅ Ready for implementation

**Confidence Level**: HIGH
- Health system is proven game mechanic
- Question transitions follow established patterns
- Basic game over provides functional MVP
- All mechanics integrate cleanly with Sprint 1

**Sprint 2A Focus**: Core loop mechanics working end-to-end
**Sprint 2B Focus**: Polish, celebrations, statistics

**Next Steps**:
1. FE implements Sprint 2A features
2. Test health system and transitions
3. Validate basic game over works
4. Then proceed to Sprint 2B for polish

---

**Document Status**: ✅ Complete - Ready for Implementation
**Next Sprint**: Sprint 2B (polish, milestones, full game over)

---

**Game Designer**: GD
**Date**: December 17, 2025
**Version**: 1.0 (Split from Sprint 2 original design)
