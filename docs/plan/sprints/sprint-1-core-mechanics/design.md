# Sprint 1 Design: Core Mechanics
**Quiz Battle Arena - MVP Foundation**

**Designer**: GD (Game Designer)
**Date**: December 17, 2025
**Sprint Duration**: Week 1-1.5
**Milestone**: M1 - Core MVP

---

## Executive Summary

Sprint 1 establishes the **fundamental game loop**: display question → player clicks target → validate answer → show feedback → update score. This is the CORE experience that all future features build upon.

**Deliverable**: Player can answer 1 question, see their score update, and receive immediate feedback.

**Key Innovation**: Incorporates GD Recommendations #1 and #2 from PRD feedback for child-friendly interactions.

---

## Design Philosophy

### Child-Centric Principles (Ages 8-12)
1. **Forgiving Interactions**: Grace areas prevent accidental misclicks
2. **Positive Reinforcement**: Even wrong answers earn "Learning Points"
3. **Clear Visual Hierarchy**: Question is obvious, targets are distinct
4. **Immediate Feedback**: No waiting - instant response to every action
5. **Simple Controls**: Click/tap only - no complex inputs

### Subject-Agnostic Validation
- All text content comes from `questions.json`
- Graphics are generic (colored rectangles for MVP)
- No hardcoded subject-specific terminology
- Vietnamese language support (UTF-8)

---

## 1. Question Display System (FR-001)

### Layout

```
┌─────────────────────────────────────────────────────────┐
│                    GAME CANVAS (800x600)                 │
│                                                           │
│   ┌─────────────────────────────────────────────────┐  │
│   │         QUESTION DISPLAY AREA                    │  │
│   │  Top: 60px from canvas top                       │  │
│   │  Width: 700px (centered)                         │  │
│   │  Height: Auto (max 120px)                        │  │
│   │  ┌───────────────────────────────────────────┐  │  │
│   │  │ Con sông nào đóng vai trò quan trọng     │  │  │
│   │  │ với nền văn minh Ai Cập cổ đại?          │  │  │
│   │  └───────────────────────────────────────────┘  │  │
│   └─────────────────────────────────────────────────┘  │
│                                                           │
│   ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│   │ Target 1 │ │ Target 2 │ │ Target 3 │ │ Target 4 │ │
│   │ (150x80) │ │ (150x80) │ │ (150x80) │ │ (150x80) │ │
│   └──────────┘ └──────────┘ └──────────┘ └──────────┘ │
│     Y: 250px     spacing: 20px between targets          │
└─────────────────────────────────────────────────────────┘
```

### Typography

**Font**: Sans-serif (system default for Vietnamese character support)
**Size**: 24px (readable from 1 meter distance)
**Color**: #333333 (dark gray - high contrast)
**Weight**: 600 (semi-bold)
**Line Height**: 1.4 (comfortable reading)
**Alignment**: Center

### Text Wrapping

**Maximum Characters per Line**: ~50-55 Vietnamese characters
**Maximum Lines**: 2 lines preferred, 3 lines maximum
**Overflow Handling**: If question exceeds 3 lines, reduce font size to 22px

**Example Questions**:
- Short (1 line): "Tính 9 × 8 = ?" (15 chars)
- Medium (2 lines): "Con sông nào đóng vai trò quan trọng / với nền văn minh Ai Cập cổ đại?" (~70 chars)
- Long (3 lines): Handle gracefully with slight font reduction

### Background

**Container**:
- Background color: `rgba(255, 255, 255, 0.95)` (semi-transparent white)
- Border: 3px solid #4ECDC4 (bright blue from PRD color palette)
- Border radius: 12px (rounded corners, child-friendly)
- Padding: 20px (internal spacing)
- Shadow: `0 4px 6px rgba(0,0,0,0.1)` (subtle depth)

### Animation

**Question Appearance**:
- Fade in: 0.3 seconds
- Slide down: 20px from initial position
- Easing: `ease-out`

**Question Change**:
- Current question: Fade out (0.2s)
- New question: Fade in (0.3s) with 0.1s delay
- Total transition: 0.6 seconds

---

## 2. Four-Target System (FR-002)

### Target Layout

**Grid Configuration**: 4 targets in a horizontal row
**Target Dimensions**: 150px width × 80px height (each)
**Spacing**: 20px between targets
**Total Width**: (150 × 4) + (20 × 3) = 660px
**Horizontal Position**: Centered (70px margin from each side of 800px canvas)
**Vertical Position**: 250px from top

### Target Positions (Absolute Coordinates)

```javascript
// Canvas size: 800px × 600px
const targetY = 250; // All targets at same Y
const targetWidth = 150;
const targetHeight = 80;
const spacing = 20;

const positions = [
  { x: 70, y: 250 },   // Target 1 (left)
  { x: 240, y: 250 },  // Target 2
  { x: 410, y: 250 },  // Target 3
  { x: 580, y: 250 }   // Target 4 (right)
];
```

### Target Visual Design (MVP Placeholders)

**Four Distinct Colors** (from PRD color palette):
- Target 1: `#4ECDC4` (Bright Blue) - Circle theme
- Target 2: `#FF6B6B` (Coral Red) - Square theme
- Target 3: `#95E1D3` (Mint Green) - Triangle theme
- Target 4: `#FFD93D` (Yellow) - Hexagon theme

**Shape**: Rounded rectangles (border-radius: 8px)

**Border**: 2px solid darker shade of target color
- Blue target: border `#3BA99C`
- Red target: border `#E05555`
- Green target: border `#7AC9BB`
- Yellow target: border `#E6C235`

**Shadow**: `0 2px 4px rgba(0,0,0,0.15)` (subtle depth)

**Note**: In M2, these will be replaced with robot sprite graphics. Colors chosen to be distinct for colorblind players.

### Answer Text Display

**Font**: Sans-serif
**Size**: 18px
**Color**: #333333 (dark gray)
**Weight**: 500 (medium)
**Alignment**: Center (both horizontal and vertical)
**Line Height**: 1.2
**Padding**: 10px (internal)

**Text Wrapping**:
- Maximum 2 lines per target
- If answer text exceeds 20 characters, reduce font to 16px
- If still overflows, truncate with "..." (rare - questions should have short answers)

**Vietnamese Character Support**: Ensure font supports diacritics (à, ả, ã, á, ạ, â, ă, etc.)

### Target States

#### 1. Default State
- Colors as specified above
- No special effects
- Idle state

#### 2. Hover State (Mouse) / Touch Highlight
- Border width: 3px (thicker)
- Border glow: `box-shadow: 0 0 8px rgba(78, 205, 196, 0.6)` (bright blue glow)
- Scale: 1.02 (slight enlarge, 0.1s transition)
- Cursor: `pointer`

**Purpose**: Provides visual feedback that target is interactive

#### 3. Clicked State (Momentary)
- Scale: 0.98 (slight shrink for 0.1s)
- Then trigger validation immediately

#### 4. Disabled State (After Answer)
- All targets: Opacity 0.5
- No hover effects
- Cursor: `default`
- Prevents double-clicking

### Click Detection with Grace Area (GD Recommendation #1)

**Standard Hitbox**: 150px × 80px (visual boundary)

**Grace Area Extension**: +10px on all sides
**Total Interactive Hitbox**: 170px × 100px

```javascript
// Visual boundaries
const visualRect = {
  x: targetX,
  y: targetY,
  width: 150,
  height: 80
};

// Interactive hitbox (with grace area)
const hitbox = {
  x: targetX - 10,  // Extend 10px left
  y: targetY - 10,  // Extend 10px up
  width: 170,       // 150 + 20px
  height: 100       // 80 + 20px
};

// Click detection
function isClicked(mouseX, mouseY, hitbox) {
  return (
    mouseX >= hitbox.x &&
    mouseX <= hitbox.x + hitbox.width &&
    mouseY >= hitbox.y &&
    mouseY <= hitbox.y + hitbox.height
  );
}
```

**Rationale**: Children ages 8-10 have developing motor skills and may mis-click near target edges. 10px grace area prevents frustration from accidental misses.

**Visual Indication**: Grace area is INVISIBLE to player - they perceive target as 150×80, but system accepts clicks slightly outside.

### Answer Assignment

**Randomization**: Shuffle answer positions for each question
- Correct answer appears in random position (0-3)
- Prevents pattern memorization ("answer is always third target")

```javascript
// Example: Question has answers [A, B, C, D] with correct = 0 (A)
// Shuffle to new order: [C, A, D, B]
// Correct answer (A) now at index 1 instead of 0
```

**Implementation**: Fisher-Yates shuffle algorithm

---

## 3. Answer Validation & Feedback (FR-003)

### Validation Flow

```
Player clicks target
    ↓
Disable all targets (prevent double-click)
    ↓
Check if clicked target has correct answer
    ↓
    ├─→ CORRECT ────→ Show success feedback ───→ Update score (+100)
    │                                            ↓
    │                                     Celebrate visually
    │                                            ↓
    └─→ WRONG ──────→ Show error feedback ─────→ Update score (+25 Learning)
                                                 ↓
                                          Show explanation text
                                                 ↓
                                          (Both paths merge)
                                                 ↓
                                          Wait 1.5 seconds
                                                 ↓
                                          Load next question
```

### Correct Answer Feedback

#### Visual
1. **Target Animation**:
   - Clicked target: Scale to 1.1 (grow), rotate 360° (1 second)
   - Background flash: Green overlay `rgba(78, 205, 196, 0.3)` on canvas (0.2s)
   - Other targets: Fade out to opacity 0.3

2. **Score Display**:
   - Floating text "+100" appears above clicked target
   - Color: `#4ECDC4` (bright blue)
   - Font size: 32px, bold
   - Animation: Float up 50px over 1 second, fade out

#### Audio
- **Sound**: Cheerful chime (short, 0.5s duration)
- **Volume**: 0.7 (not too loud)
- **Format**: MP3 or OGG
- **Fallback**: If no audio support, visual-only

#### Message
- **Text**: "Chính xác! 🎯" or "Tuyệt vời! ⭐" or "Xuất sắc! 🏆" (randomized)
- **Position**: Top-center of canvas, below question box
- **Font size**: 28px
- **Color**: `#4ECDC4` (bright blue)
- **Duration**: 1.5 seconds, then fade out

### Wrong Answer Feedback (GD Recommendation #2)

**CRITICAL DESIGN PRINCIPLE**: Wrong answers are LEARNING OPPORTUNITIES, not punishments. Positive reinforcement prevents anxiety.

#### Visual
1. **Target Animation**:
   - Clicked target: Shake horizontally (3 small vibrations, 0.3s)
   - Border color: Change to red `#FF6B6B` briefly
   - No explosion - we're not "destroying" wrong answers

2. **Score Display**:
   - Floating text "+25 Điểm học tập" appears above clicked target
   - Color: `#FFD93D` (yellow - positive but different from correct)
   - Font size: 24px, medium weight
   - Animation: Float up 40px over 1 second, fade out

3. **Correct Answer Reveal**:
   - Correct target: Border glow green `#95E1D3` (highlight)
   - Scale correct target to 1.05 for 0.5s (draw attention)
   - **Purpose**: Show which was correct without being harsh

#### Audio
- **Sound**: Gentle "boop" (NOT harsh buzzer)
- **Volume**: 0.5 (quieter than correct sound)
- **Tone**: Neutral, not punishing

#### Supportive Message (GD Recommendation #2)
- **Text**: "Chưa đúng rồi! Nhưng bạn đã học được điều gì đó có giá trị! 📚"
  - Translation: "Not quite! But you learned something valuable! 📚"
- **Position**: Top-center of canvas
- **Font size**: 20px
- **Color**: `#FF6B6B` (coral red, friendly tone)
- **Duration**: 2 seconds

#### Explanation Display

**Container**:
- Background: `rgba(255, 255, 255, 0.98)` (semi-transparent white)
- Border: 2px solid `#FFD93D` (yellow)
- Border radius: 8px
- Padding: 15px
- Position: Bottom-center of canvas
- Width: 600px
- Shadow: `0 4px 8px rgba(0,0,0,0.2)`

**Explanation Text**:
- Font size: 18px
- Color: `#333333`
- Line height: 1.5
- Alignment: Left
- Maximum lines: 3

**Icon**: 💡 (light bulb) before explanation text

**Example**:
```
💡 Sông Nin cung cấp nước và phù sa màu mỡ giúp phát triển
nông nghiệp. Nhờ lũ sông Nin hằng năm tạo nên những đồng
bằng tươi tốt nuôi sống cư dân Ai Cập.
```

**Display Duration**: 3 seconds
**User Control**: Click anywhere to skip and proceed immediately

### Feedback Timing

```
Correct Answer Path:
  Click → Disable targets (instant)
       → Show success animation (0.5s)
       → Display +100 score (1s float up)
       → Success message (1.5s)
       → Load next question (0.5s fade)
  Total: ~3.5 seconds

Wrong Answer Path:
  Click → Disable targets (instant)
       → Show error animation (0.3s)
       → Display +25 score (1s float up)
       → Supportive message (2s)
       → Show explanation (3s or until clicked)
       → Highlight correct answer (0.5s)
       → Load next question (0.5s fade)
  Total: ~7-10 seconds (allows reading explanation)
```

**Design Rationale**: Wrong answer path is LONGER to encourage reading explanation. This is intentional - learning takes time.

---

## 4. Scoring System (FR-004)

### Score Values

**Correct Answer**: +100 points
**Wrong Answer**: +25 "Learning Points"

**No Negative Points**: Research shows penalties discourage children from trying. All interactions earn points.

### Score Display (HUD)

**Position**: Top-left corner of canvas
**Layout**:
```
┌─────────────────┐
│  Điểm số: 325   │
└─────────────────┘
```

**Container**:
- Background: `rgba(255, 255, 255, 0.9)`
- Border: 2px solid `#4ECDC4`
- Border radius: 8px
- Padding: 10px 15px
- Position: 20px from left, 20px from top

**Text**:
- Label "Điểm số:" (Score:)
- Font size: 20px
- Color: `#666666` (medium gray)
- Score number: Font size 24px, bold, color `#4ECDC4` (bright blue)

### Score Update Animation

When score changes:
1. **Scale Pulse**: Score number scales to 1.3x, then back to 1.0 (0.3s)
2. **Color Flash**: Briefly change color to gold `#FFD93D`, then return to blue (0.3s)
3. **Number Counter**: Animate from old value to new value (count up effect, 0.5s)

**Example**: 100 → 125
- Numbers increment: 100, 105, 110, 115, 120, 125
- Duration: 0.5 seconds
- Easing: `ease-out`

**Rationale**: Animation makes score increase TANGIBLE and satisfying (dopamine trigger from research).

### Score Persistence

**MVP (Sprint 1)**: Score exists only during current game session
- Resets to 0 on page reload
- No LocalStorage yet (deferred to Sprint 3)

**Initial State**: Score = 0 when game starts

### Score Range

**Minimum**: 0 (start of game)
**Maximum (15 questions)**:
- All correct: 15 × 100 = 1500 points
- All wrong: 15 × 25 = 375 points
- Mixed: 375 - 1500 range

**Display Format**:
- No commas for numbers < 1000 (simpler for children)
- Show comma for 1000+ (e.g., "1,325")

---

## 5. Game State Management

### State Machine

```
LOADING
  ↓
READY (showing first question)
  ↓
AWAITING_ANSWER (targets active, clickable)
  ↓
ANSWER_GIVEN (targets disabled)
  ↓
SHOWING_FEEDBACK (animations, score update)
  ↓
  ├─→ [More questions] → READY (load next question)
  └─→ [No more questions] → GAME_OVER (Sprint 2 feature)
```

### Question Management

**Question Index**: Tracks current question (0-based)
**Total Questions**: Read from `questions.json`
**Current Question**: questions[currentIndex]

**Question Progression**:
```javascript
let currentQuestionIndex = 0;
const totalQuestions = questions.length;

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < totalQuestions) {
    showQuestion(questions[currentQuestionIndex]);
  } else {
    // Game over (Sprint 2)
    showGameOver();
  }
}
```

### Answer Shuffling

**Implementation**:
```javascript
function shuffleAnswers(question) {
  // Create array of answer objects
  const answerObjects = question.answers.map((text, index) => ({
    text: text,
    isCorrect: index === question.correct
  }));

  // Fisher-Yates shuffle
  for (let i = answerObjects.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [answerObjects[i], answerObjects[j]] = [answerObjects[j], answerObjects[i]];
  }

  return answerObjects;
}
```

**Result**: Correct answer appears in random position each time.

---

## 6. Technical Specifications

### Phaser Scene Structure

**Scene Name**: `GameScene`

**Scene Methods**:
```javascript
class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  create() {
    // Initialize game state
    this.score = 0;
    this.currentQuestionIndex = 0;
    this.questions = loadQuestions();

    // Create UI elements
    this.createQuestionDisplay();
    this.createTargets();
    this.createScoreDisplay();

    // Show first question
    this.showQuestion(this.questions[0]);
  }

  createQuestionDisplay() {
    // Create question text container
  }

  createTargets() {
    // Create 4 clickable target rectangles
  }

  createScoreDisplay() {
    // Create score counter HUD
  }

  showQuestion(question) {
    // Display question text
    // Shuffle and assign answers to targets
  }

  handleTargetClick(targetIndex) {
    // Validate answer
    // Show feedback
    // Update score
    // Load next question after delay
  }

  updateScore(points) {
    // Increment score with animation
  }
}
```

### Input Handling

**Mouse Click**:
```javascript
target.setInteractive();
target.on('pointerdown', () => {
  this.handleTargetClick(targetIndex);
});
```

**Hover Effect**:
```javascript
target.on('pointerover', () => {
  // Apply hover state (border glow, scale)
});

target.on('pointerout', () => {
  // Remove hover state
});
```

**Touch Support** (basic - full mobile in Sprint 7):
- Tap events treated as pointer events
- No special touch handling in MVP

### Question Loading

**File**: `src/assets/data/questions.json`

**Loading Method**:
```javascript
async function loadQuestions() {
  const response = await fetch('assets/data/questions.json');
  const data = await response.json();
  return data.questions;
}
```

**Error Handling**:
- If fetch fails: Show error message "Không thể tải câu hỏi" (Cannot load questions)
- If JSON invalid: Show error message "Dữ liệu câu hỏi không hợp lệ" (Question data invalid)
- If questions array empty: Show error message "Không có câu hỏi nào" (No questions available)

### Performance Targets

**Frame Rate**: 60 FPS (smooth animations)
**Load Time**: < 1 second (from page load to first question visible)
**Memory Usage**: < 100 MB (lightweight)

**Asset Optimization**:
- No images in Sprint 1 (just colored rectangles)
- Minimal audio files (2 sounds: correct, wrong)
- Text rendering only

---

## 7. Testing Requirements

### Unit Tests (5 minimum for Sprint 1)

**Test 1: Question Loading**
```javascript
test('loads questions from JSON correctly', () => {
  const questions = loadQuestions();
  expect(questions).toHaveLength(15);
  expect(questions[0]).toHaveProperty('question');
  expect(questions[0]).toHaveProperty('answers');
  expect(questions[0]).toHaveProperty('correct');
  expect(questions[0]).toHaveProperty('explanation');
});
```

**Test 2: Answer Shuffling**
```javascript
test('shuffles answers while preserving correct answer', () => {
  const question = {
    answers: ['A', 'B', 'C', 'D'],
    correct: 0
  };
  const shuffled = shuffleAnswers(question);

  // Correct answer should be marked correctly
  const correctAnswer = shuffled.find(a => a.isCorrect);
  expect(correctAnswer.text).toBe('A');

  // Order should be different (with high probability)
  const isShuffled = shuffled.some((a, i) =>
    a.text !== question.answers[i]
  );
  expect(isShuffled).toBeTruthy();
});
```

**Test 3: Score Calculation (Correct Answer)**
```javascript
test('awards 100 points for correct answer', () => {
  const initialScore = 0;
  const newScore = calculateScore(initialScore, true);
  expect(newScore).toBe(100);
});
```

**Test 4: Score Calculation (Wrong Answer)**
```javascript
test('awards 25 points for wrong answer', () => {
  const initialScore = 100;
  const newScore = calculateScore(initialScore, false);
  expect(newScore).toBe(125);
});
```

**Test 5: Click Detection with Grace Area**
```javascript
test('detects clicks within grace area', () => {
  const hitbox = { x: 70, y: 250, width: 170, height: 100 };

  // Click inside visual boundary
  expect(isClicked(100, 280, hitbox)).toBeTruthy();

  // Click in grace area (5px outside visual)
  expect(isClicked(65, 250, hitbox)).toBeTruthy(); // Left grace
  expect(isClicked(235, 280, hitbox)).toBeTruthy(); // Right grace

  // Click way outside grace area
  expect(isClicked(50, 280, hitbox)).toBeFalsy();
});
```

### Manual Testing Checklist

- [ ] Question displays correctly (Vietnamese characters render)
- [ ] All 4 targets are visible and clickable
- [ ] Clicking correct target shows success feedback
- [ ] Clicking wrong target shows error feedback + explanation
- [ ] Score updates correctly (+100 correct, +25 wrong)
- [ ] Hover effects work on targets
- [ ] Grace area allows clicks slightly outside target
- [ ] Cannot double-click targets (disabled after first click)
- [ ] Next question loads after feedback completes
- [ ] Game handles all 15 questions without errors
- [ ] Vietnamese text displays correctly (no character encoding issues)
- [ ] Animations are smooth (60 FPS)

---

## 8. Success Criteria

**Sprint 1 is COMPLETE when**:

✅ **Functional**:
1. 15 questions load from `questions.json`
2. Player can click targets to answer
3. Score updates correctly (100 correct, 25 wrong)
4. Feedback animations work (correct, wrong)
5. Explanation text displays for wrong answers
6. Progresses through all 15 questions

✅ **Visual**:
1. Question text readable and properly formatted
2. 4 targets distinct and evenly spaced
3. Score display visible in top-left
4. Hover effects provide clear feedback
5. Animations smooth (no jank)

✅ **Child-Friendly (GD Recommendations)**:
1. Grace area implemented (10px extension)
2. Learning Points (+25) awarded for wrong answers
3. Supportive message shown ("You learned something valuable!")
4. No harsh sounds or punishing visuals

✅ **Technical**:
1. 5+ unit tests passing
2. No console errors
3. Runs in Chrome 90+, Firefox 85+, Safari 14+
4. Vietnamese text renders correctly

✅ **Subject-Agnostic**:
1. Swap questions.json with different subject → works without code changes
2. No hardcoded subject-specific text in game code
3. Graphics are generic (colored rectangles)

---

## 9. Deferred to Future Sprints

**Sprint 2** (Game Loop & Health):
- Health system (5 hearts)
- Game over screen
- Milestone celebrations

**Sprint 3** (UI/UX & Polish):
- Main menu
- Sound effects
- Visual polish (particles, explosions)

**Sprint 4-6** (M2 - Polish):
- Robot sprite graphics (MCP-generated)
- Combo multipliers
- Power-ups

**Sprint 7-9** (M3 - Advanced):
- Mobile responsive
- Adaptive difficulty
- Spaced repetition

---

## 10. Implementation Notes for FE

### Phaser Configuration

**Canvas Size**: 800px × 600px (desktop MVP)
**Renderer**: WebGL (fallback to Canvas if unavailable)
**Physics**: None needed for Sprint 1 (just click detection)
**Scale Mode**: `Phaser.Scale.FIT` (maintains aspect ratio)

### File Structure

```
src/
  ├── scenes/
  │   └── GameScene.js          # Main game scene
  ├── utils/
  │   ├── QuestionLoader.js     # Load questions.json
  │   └── ScoreManager.js       # Score calculation
  ├── components/
  │   ├── QuestionDisplay.js    # Question text component
  │   ├── Target.js             # Target button component
  │   └── ScoreDisplay.js       # Score HUD component
  ├── assets/
  │   ├── audio/
  │   │   ├── correct.mp3       # Success sound
  │   │   └── wrong.mp3         # Error sound
  │   └── data/
  │       └── questions.json    # Question data (already created)
  └── main.js                   # Phaser game initialization
```

### Vietnamese Font Support

**Font Loading**:
```javascript
// Use system font that supports Vietnamese
WebFontConfig = {
  google: {
    families: ['Roboto:400,600,700'] // Has full Vietnamese support
  }
};
```

**Test Diacritics**: à, ả, ã, á, ạ, â, ă, ê, ô, ơ, ư, đ

### Color Constants

```javascript
const COLORS = {
  primary: '#4ECDC4',     // Bright blue
  coral: '#FF6B6B',       // Coral red
  mint: '#95E1D3',        // Mint green
  yellow: '#FFD93D',      // Yellow
  darkGray: '#333333',    // Text color
  mediumGray: '#666666',  // Label color
  lightGray: '#F7F7F7'    // Background
};
```

### Audio Loading

**Format**: MP3 (primary), OGG (fallback)
**Volume**: 0.7 (correct), 0.5 (wrong)
**Placeholder**: Use free sounds from freesound.org or create simple tones

---

## 11. Design Approval

**GD Approval**: ✅ Ready for implementation

**Confidence Level**: HIGH
- All mechanics are simple and proven
- Child-friendly design incorporates research-backed patterns
- Subject-agnostic validation built into requirements
- Clear specifications with minimal ambiguity

**Next Steps**:
1. FE reviews this design document
2. FE asks clarifying questions (if any)
3. PM creates Sprint 1 specification (technical requirements)
4. FE begins implementation
5. GD available for design questions during sprint

---

**Document Status**: ✅ Complete - Ready for PM Review
**Next Review**: After Sprint 1 implementation begins
**Contact**: GD for design questions, PM for scope questions

---

**Game Designer**: GD
**Date**: December 17, 2025
**Version**: 1.0
