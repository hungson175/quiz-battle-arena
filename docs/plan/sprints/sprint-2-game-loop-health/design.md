# Sprint 2 Design: Game Loop & Health System
**Quiz Battle Arena - Complete Game Session**

**Designer**: GD (Game Designer)
**Date**: December 17, 2025
**Sprint Duration**: Week 2-2.5
**Milestone**: M1 - Core MVP
**Depends On**: Sprint 1 (Core Mechanics) ✅

---

## Executive Summary

Sprint 2 transforms the single-question experience into a **complete game session**. Players now have limited health (5 hearts), must manage it carefully, and reach a definitive ending (game over or victory). This creates the full game loop that makes Quiz Battle Arena feel like a real game, not just a quiz.

**Deliverable**: Players can start a session, progress through all questions with health management, receive milestone encouragement, and see final results.

**Key Innovation**: Milestone celebrations (GD Rec #3) maintain motivation during longer sessions by providing frequent positive feedback at 5, 10, 15, and 20 questions.

---

## Design Philosophy

### Psychological Foundations (Ages 8-12)

**1. Health as Learning Currency**
- Health represents "chances to learn," not "lives to lose"
- Losing health is natural part of learning process
- Game over is "try again," not "failure"

**2. Milestone Celebrations (GD Rec #3)**
- **Research Basis**: Children need frequent rewards (research: "Fast rewards critical for ages 8-12")
- **Problem**: 15-20 questions is LONG for 8-year-olds without feedback
- **Solution**: Celebrate progress at 5, 10, 15, 20 questions (every ~2-3 minutes)
- **Impact**: Maintains motivation, prevents mid-session abandonment

**3. Forgiving Game Over**
- No shame or punishment language
- Clear restart path ("Try Again" button prominent)
- Show achievements even on loss (questions answered, score earned)

### Subject-Agnostic Continuity
- All new elements remain content-neutral
- Health hearts (universal symbol), not subject-specific icons
- Game over screen shows stats, not subject commentary
- Vietnamese language support continues

---

## 1. Health System (FR-005)

### Health Representation

**Visual**: Hearts (❤️)
**Starting Health**: 5 hearts
**Loss Condition**: -1 heart per wrong answer
**Restoration**: None in Sprint 2 (comeback mechanics in Sprint 5, M2)

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

**New in Sprint 2**: Wrong answer ALSO loses 1 heart

**Combined Flow**:
```
Wrong Answer
    ↓
1. Show error feedback (Sprint 1)
    ↓
2. Award +25 Learning Points (Sprint 1)
    ↓
3. Lose 1 heart (NEW - Sprint 2)
    ↓
4. Check if health = 0
    ↓
    ├─→ Health > 0: Show explanation → Next question
    └─→ Health = 0: SKIP explanation → Game Over immediately
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
    ├─→ Health = 0? → GAME OVER (health depleted)
    ├─→ All questions answered? → GAME OVER (victory)
    ├─→ Milestone reached (5, 10, 15, 20)? → CELEBRATION → Next question
    └─→ Otherwise → Next question
```

**Question Counter**:
- Track: `currentQuestionIndex` (0-based)
- Total: `totalQuestions` (from questions.json, default 15)
- Display: Not shown to player in Sprint 2 (milestone messages provide progress sense)

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

### Milestone Check Integration

**After Answer Feedback, Before Transition**:
```javascript
function afterAnswerFeedback() {
  // Check milestone BEFORE next question
  const questionsAnswered = this.currentQuestionIndex + 1;

  if (isMilestone(questionsAnswered)) {
    showMilestoneCelebration(questionsAnswered);
    // Celebration includes "Continue" → then transition
  } else {
    // No milestone, proceed directly
    transitionToNextQuestion();
  }
}

function isMilestone(count) {
  return [5, 10, 15, 20].includes(count);
}
```

**Why This Order**: Celebrate progress AFTER completing milestone question, BEFORE starting next question. Player feels accomplishment before continuing.

---

## 3. Game Over Screen (FR-006)

### Game Over Triggers

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
- **Sprint 2**: Not implemented yet (main menu is Sprint 3)
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

## 4. Milestone Celebrations (GD Recommendation #3)

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

## 5. Integration with Sprint 1

### Score System Integration

**Sprint 1**: Score displayed in top-left HUD
**Sprint 2**: Score persists through game over

**Game Over Display**:
- Final score shown prominently
- Score value carried from gameplay
- No reset between questions and game over

### Question Display Integration

**Sprint 1**: Single question display with targets
**Sprint 2**: Question progression, transitions

**Continuity**:
- Same question display format (Sprint 1)
- Same target system (Sprint 1)
- Same feedback animations (Sprint 1)
- **New**: Transitions between questions
- **New**: Health loss on wrong answers

### Feedback System Integration

**Sprint 1**: Immediate feedback (correct/wrong)
**Sprint 2**: Health check after wrong feedback

**Combined Flow**:
```
Sprint 1: Click → Validate → Feedback → Score Update
Sprint 2: Click → Validate → Feedback → Score Update → Health Update → Milestone Check → Next Question or Game Over
```

---

## 6. Technical Specifications

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

    // Sprint 2 NEW variables
    this.currentHealth = 5;
    this.maxHealth = 5;
    this.questionsAnswered = 0;
    this.correctCount = 0;
    this.wrongCount = 0;
    this.milestonesReached = [];
  }

  // Sprint 2 NEW methods
  loseHealth() { /* ... */ }
  checkGameOver() { /* ... */ }
  checkMilestone() { /* ... */ }
  showGameOver(reason) { /* ... */ }
  showMilestoneCelebration(count) { /* ... */ }
  transitionToNextQuestion() { /* ... */ }
  restartGame() { /* ... */ }
}
```

### Scene Management

**Current Scene**: `GameScene` (from Sprint 1)

**New Scene** (Sprint 2): `GameOverScene`

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
- Upgrade to sprite graphics in Sprint 4 (M2 - Polish)

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

## 7. Testing Requirements

### Unit Tests (10 total for Sprint 2)

**Continuing from Sprint 1**: 5 tests (question loading, shuffling, score, click detection)

**New Tests for Sprint 2** (5 additional):

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

### Manual Testing Checklist

- [ ] Health starts at 5 hearts
- [ ] Health decreases by 1 on wrong answer
- [ ] Health display updates correctly (hearts turn gray)
- [ ] Low health warning shows (1-2 hearts)
- [ ] Game over triggers at 0 health
- [ ] Game over triggers after last question
- [ ] Game over shows correct final score
- [ ] Game over shows correct/incorrect counts
- [ ] Game over shows accuracy percentage
- [ ] "Try Again" button restarts game
- [ ] Milestone celebration shows at 5 questions
- [ ] Milestone celebration shows at 10 questions
- [ ] Milestone celebration shows at 15 questions (if applicable)
- [ ] Milestone progress bar animates correctly
- [ ] Click anywhere skips milestone celebration
- [ ] Question transitions are smooth (no lag)
- [ ] Health loss animation plays correctly
- [ ] Game over animation plays correctly
- [ ] No crashes during full 15-question session
- [ ] Vietnamese text displays correctly in all new screens

---

## 8. Success Criteria

**Sprint 2 is COMPLETE when**:

✅ **Functional**:
1. Health system works (5 hearts, -1 per wrong, game over at 0)
2. Question progression works (all 15 questions playable)
3. Game over screen shows (health depleted or victory)
4. Final stats display correctly (score, correct/wrong, accuracy)
5. Restart game works ("Try Again" button)
6. Milestone celebrations trigger at 5, 10, 15 questions

✅ **Visual**:
1. Health hearts display in top-right HUD
2. Hearts update visually when health lost
3. Low health warning shows (pulsing hearts, red border)
4. Game over modal looks professional
5. Milestone celebrations are visually appealing
6. Question transitions are smooth

✅ **Child-Friendly**:
1. Game over messages are encouraging, not punishing
2. Milestone celebrations maintain motivation
3. Progress bar shows tangible advancement
4. Restart is easy (prominent "Try Again" button)

✅ **Technical**:
1. 10+ unit tests passing (5 from Sprint 1 + 5 new)
2. No console errors
3. Smooth transitions (no lag or jank)
4. Scene management works (GameScene ↔ GameOverScene)
5. Vietnamese text renders in all new UI elements

✅ **Integration**:
1. Sprint 1 mechanics still work (scoring, feedback, clicks)
2. Health integrates with wrong answer feedback
3. Milestones integrate with question progression
4. Game over integrates with final score/stats

---

## 9. Deferred to Future Sprints

**Sprint 3** (UI/UX & Polish):
- Main menu screen (game over "Main Menu" button will work then)
- HUD polish (visual upgrades for score/health displays)
- Sound effects for health loss, game over, milestones
- Particle effects (confetti, explosions)

**Sprint 5** (M2 - Advanced Mechanics):
- Comeback mechanics (health restoration at 1 heart)
- Bonus questions (restore 1 heart every 10 correct)
- Health boost power-up

**Sprint 9** (M3 - Learning Metrics):
- Pre/post-test integration with game over stats
- Session history (track accuracy over multiple plays)
- Spaced repetition integration

---

## 10. Design Rationale Summary

### Why Health System?

**Research Basis**: "Lives give novices more chances to learn while letting experts take risks"
- 5 hearts = forgiving (allows 5 mistakes)
- Prevents instant game over on first wrong answer
- Creates tension without harsh punishment
- Universal game mechanic (children understand hearts = chances)

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

### Why Skip Explanation at 0 Health?

**User Experience**: Player has lost, show results immediately
- If health = 0, player knows game is over
- Reading another explanation delays inevitable
- Get to game over screen faster = less frustration
- Can restart and try again immediately

---

## 11. Implementation Notes for FE

### File Structure Addition

```
src/
  ├── scenes/
  │   ├── GameScene.js              # Sprint 1 + Sprint 2 additions
  │   └── GameOverScene.js          # NEW - Sprint 2
  ├── components/
  │   ├── HealthDisplay.js          # NEW - Sprint 2
  │   ├── MilestoneCelebration.js   # NEW - Sprint 2
  │   └── (Sprint 1 components)
  ├── utils/
  │   ├── GameStateManager.js       # NEW - Sprint 2
  │   └── (Sprint 1 utils)
  └── assets/
      └── (placeholder hearts, icons)
```

### Phaser Scene Configuration

**Scene Registration**:
```javascript
// main.js
const config = {
  // ... other config
  scene: [
    GameScene,      // Main gameplay
    GameOverScene   // Results screen (NEW)
  ]
};
```

**Scene Data Passing**:
```javascript
// From GameScene to GameOverScene
this.scene.start('GameOverScene', {
  score: this.score,
  correctCount: this.correctCount,
  wrongCount: this.wrongCount,
  totalQuestions: this.questions.length,
  reason: 'health_depleted' // or 'victory'
});
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
  questionTransition: 800,      // Total transition time (ms)
  questionFadeOut: 300,
  questionPause: 200,
  questionFadeIn: 300,
  milestoneDuration: 2500,      // Auto-dismiss milestone
  gameOverDelay: 1000,          // Delay before showing game over
  healthLossAnimation: 500,     // Heart break animation
  lowHealthPulse: 1000          // Heart pulse cycle
};
```

---

## 12. Design Approval

**GD Approval**: ✅ Ready for implementation

**Confidence Level**: HIGH
- Health system is proven game mechanic
- Milestone celebrations address real child psychology needs
- Game over design is encouraging and clear
- All mechanics integrate cleanly with Sprint 1
- Vietnamese language support maintained

**Expected Player Experience**:
1. Start game with 5 hearts (feels safe)
2. Answer questions, build score
3. Hit milestone at 5 questions ("I'm making progress!")
4. Continue with encouragement
5. Hit milestone at 10 questions ("Halfway!")
6. Either reach game over (health or victory)
7. See accomplishments (score, stats)
8. Easily restart ("Try Again")
9. Feel motivated to improve score

**Next Steps**:
1. FE reviews this design document
2. FE asks clarifying questions (if any)
3. PM creates Sprint 2 specification (technical requirements)
4. FE implements Sprint 2 features
5. GD available for design questions during sprint
6. CR reviews implementation after completion

---

**Document Status**: ✅ Complete - Ready for PM Review
**Next Review**: After Sprint 2 implementation begins
**Contact**: GD for design questions, PM for scope questions

---

**Game Designer**: GD
**Date**: December 17, 2025
**Version**: 1.0
