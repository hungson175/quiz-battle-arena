# Product Requirements Document (PRD)
## Quiz Battle Arena - Educational Quiz Game

**Version**: 1.1
**Date**: December 17, 2025
**Author**: PM (Project Manager), Quiz Game Team
**Status**: Updated with GD Recommendations - Ready for Implementation
**Changelog**: v1.1 - Incorporated 7 design recommendations from GD review

---

## Executive Summary

**Quiz Battle Arena** is a subject-agnostic, action-style educational quiz game designed for children ages 8-12. The game transforms multiple-choice questions into an engaging shooting experience where players click targets displaying answer choices. The core innovation is complete subject neutrality—the same game, graphics, and mechanics work for history, mathematics, literature, civic education, or any subject simply by swapping the question data file.

**Target Market**: Parents and educators seeking engaging, customizable educational tools for elementary and middle school students.

**Key Differentiator**: Unlike subject-specific educational games, Quiz Battle Arena requires zero code changes to adapt to any curriculum, making it a universal learning platform.

---

## 1. Product Vision

### 1.1 Problem Statement

Children ages 8-12 need engaging ways to practice curriculum knowledge across multiple subjects, but:
- **Existing educational games are subject-specific** (e.g., "Math Blaster" only for math)
- **Creating separate games for each subject is costly** and time-consuming
- **Bare quiz applications lack engagement** (59% preference for game-integrated quizzes per research)
- **Parents/educators want simple customization** without technical expertise

### 1.2 Solution

A **single game engine** with engaging action mechanics that works universally across subjects. Questions and content come from easily editable JSON files, while game mechanics, graphics, and progression systems remain constant.

**Analogy**: Like a projector (game engine) that can display any content (subject questions) on the same screen.

### 1.3 Success Metrics

- **Engagement**: 10+ minutes average session length
- **Learning**: 70%+ quiz accuracy after 3 play sessions
- **Retention**: 24% improvement over traditional quiz methods (research baseline)
- **Reusability**: Works with history, math, literature questions without code changes
- **Satisfaction**: 8/10+ parent/child rating

---

## 2. User Personas

### Primary Persona: Elementary Student (Ages 8-12)

**Name**: Mai (10 years old)
**Background**: 4th grade student preparing for exams
**Tech Skills**: Basic (plays mobile games, uses tablets)
**Learning Style**: Visual learner, short attention span, motivated by rewards
**Pain Points**:
- Traditional quizzes are boring
- Gets frustrated with repeated failures
- Needs immediate feedback to stay engaged
- Wants fun, not "work"

**Goals**:
- Practice school subjects without feeling like studying
- See progress and achievements
- Play in short bursts (5-15 minutes)
- Compete with own high scores

### Secondary Persona: Parent/Educator

**Name**: Mr. Phong (38 years old, parent)
**Background**: Working parent, limited technical skills
**Pain Points**:
- Expensive educational apps for each subject
- Complex setup/customization
- Tracking child's learning progress
- Finding age-appropriate, safe content

**Goals**:
- One tool for multiple subjects (history today, math tomorrow)
- Easy to add custom questions for specific topics
- Monitor child's performance
- Affordable (free or one-time purchase, no subscriptions)

---

## 3. Product Overview

### 3.1 Core Gameplay Loop

```
┌─────────────────────────────────────────────────────────┐
│  1. Question Displays at Top                            │
│     "What river was crucial to Ancient Egypt?"          │
├─────────────────────────────────────────────────────────┤
│  2. Four Targets Appear                                 │
│     [Target A]  [Target B]  [Target C]  [Target D]     │
│     Nile River  Tigris      Euphrates   Red River       │
├─────────────────────────────────────────────────────────┤
│  3. Player Clicks Target                                │
│     → Correct: Explosion + Points + Next Question       │
│     → Wrong: Error Effect + Lose Health + Explanation   │
├─────────────────────────────────────────────────────────┤
│  4. Repeat Until:                                       │
│     → Health reaches 0 (Game Over)                      │
│     → Questions exhausted (Victory)                     │
└─────────────────────────────────────────────────────────┘
```

### 3.2 Game Modes

**MVP (Phase 1)**:
- **Practice Mode**: Answer questions, no time pressure, 5 starting health

**Future (Phase 2-3)**:
- **Timed Challenge**: Speed bonus for fast answers
- **Survival Mode**: Endless questions, increasing difficulty
- **Custom Quiz**: Load specific question sets (e.g., "Chapter 3 History")

### 3.3 Subject-Agnostic Design

**CRITICAL REQUIREMENT**: Game must function identically regardless of subject.

| Element | History Example | Math Example | Implementation |
|---------|----------------|--------------|----------------|
| Question | "What river helped Egypt?" | "What is 5 + 7?" | `question.text` |
| Targets | 4 geographic names | 4 numbers | `question.answers[]` |
| Graphics | Generic robots/shapes | Same robots/shapes | **No change** |
| Background | Abstract pattern | Same pattern | **No change** |
| Scoring | 100 points | 100 points | **No change** |
| Health | 5 hearts | 5 hearts | **No change** |

**To Switch Subjects**: Replace `questions.json` → Done.

---

## 4. Functional Requirements

### 4.1 Core Mechanics

#### FR-001: Question Display
- **Priority**: P0 (MVP)
- **Description**: Display question text prominently at top of screen
- **Acceptance Criteria**:
  - Question text readable from 1 meter distance (large font, high contrast)
  - Text wraps gracefully for long questions (max 2 lines preferred)
  - Displays for entire question duration (until answered)
- **Research Basis**: Clear text critical for ages 8-12 reading levels

#### FR-002: Target System
- **Priority**: P0 (MVP)
- **Description**: Display 4 clickable targets, each showing one answer choice
- **Acceptance Criteria**:
  - 4 targets appear simultaneously (no waves in MVP)
  - Each target displays one answer text clearly
  - Targets have distinct colors/shapes for identification
  - Click/tap area minimum 44x44px (mobile accessibility)
  - **NEW (GD Rec #1)**: Forgiving click detection with 5-10px grace area around targets
  - Visual feedback on hover/touch (highlight, glow)
- **Research Basis**: Simple, intuitive controls for children
- **GD Enhancement**: Grace area accommodates developing motor skills (ages 8-10)

#### FR-003: Answer Validation
- **Priority**: P0 (MVP)
- **Description**: Validate player's answer and provide immediate feedback
- **Acceptance Criteria**:
  - **Correct Answer**:
    - Target explodes (animation)
    - "+100" points floating text
    - Cheerful sound effect
    - Load next question immediately
  - **Wrong Answer**:
    - Error spark effect
    - "-1 ❤️" health with heart icon
    - **NEW (GD Rec #2)**: "+25 Learning Points" (positive reinforcement)
    - **NEW (GD Rec #2)**: Supportive message: "Not quite! But you learned something valuable!"
    - Error buzz sound (friendly, not harsh)
    - Show explanation text (3 seconds)
    - Then load next question
- **Research Basis**: Immediate feedback triggers dopamine (research finding), explanations aid learning

#### FR-004: Scoring System
- **Priority**: P0 (MVP)
- **Description**: Track and display player score
- **Acceptance Criteria**:
  - Base score: 100 points per correct answer
  - **NEW (GD Rec #2)**: Learning Points: +25 per wrong answer (positive reinforcement)
  - Display score prominently (top corner)
  - Score persists across questions
  - Final score shown at game over
  - **NEW (GD Rec #3)**: Milestone celebrations at 5, 10, 15, 20 questions
    - 5 questions: "Quarter Way! 🎯"
    - 10 questions: "Halfway Champion! 🏆"
    - 15 questions: "Almost There! 🚀"
    - 20 questions: "Victory!!!! 🎉"
  - MVP: No combo multipliers (Phase 2 feature)
- **Research Basis**: Points provide tracking and unlock motivation (24% retention boost)
- **GD Enhancement**: Milestone celebrations maintain motivation during longer sessions

#### FR-005: Health System
- **Priority**: P0 (MVP)
- **Description**: Track player health, game ends at 0
- **Acceptance Criteria**:
  - Start with 5 hearts (health points)
  - Lose 1 heart per wrong answer
  - Display hearts visually (icon row)
  - Game over at 0 hearts
  - MVP: No health restoration (Phase 2 feature)
  - Use "hearts" or "chances" (not "lives" - child-friendly terminology)
- **Research Basis**: Lives system gives novices learning chances while allowing expert risk-taking

#### FR-006: Game Over / Victory
- **Priority**: P0 (MVP)
- **Description**: End game and show results
- **Acceptance Criteria**:
  - **Game Over (0 health)**:
    - Show final score
    - Show correct/incorrect count
    - "Try Again" button
    - "Main Menu" button
  - **Victory (all questions answered)**:
    - Show final score
    - Show correct/incorrect count
    - "Play Again" button
    - "Main Menu" button
- **Research Basis**: Concrete results provide sense of accomplishment

### 4.2 Content Management

#### FR-007: Question Loading
- **Priority**: P0 (MVP)
- **Description**: Load questions from JSON file
- **Acceptance Criteria**:
  - Load from `questions.json` file in `/assets/data/`
  - Parse JSON structure correctly
  - Validate: non-empty questions array, valid indices
  - Handle errors gracefully (show user-friendly message)
  - Question structure:
    ```json
    {
      "subject": "History - Ancient Egypt",
      "questions": [
        {
          "id": 1,
          "question": "Question text here?",
          "answers": ["Answer A", "Answer B", "Answer C", "Answer D"],
          "correct": 0,
          "explanation": "Explanation for educational value"
        }
      ]
    }
    ```
- **Research Basis**: Subject-agnostic requirement

#### FR-008: Question Randomization
- **Priority**: P1 (MVP optional, Phase 2)
- **Description**: Shuffle questions for replayability
- **Acceptance Criteria**:
  - Option to randomize question order
  - Option to randomize answer order (shuffle A/B/C/D)
  - Preserve correct answer index after shuffle
- **Research Basis**: Prevents memorization of patterns

### 4.3 User Interface

#### FR-009: Main Menu
- **Priority**: P0 (MVP)
- **Description**: Entry screen with game options
- **Acceptance Criteria**:
  - "Play" button (primary action)
  - "How to Play" button (instructions)
  - Game title display
  - Subject display (from questions.json)
- **Design Note**: Keep minimal, child-friendly, large buttons

#### FR-010: HUD (Heads-Up Display)
- **Priority**: P0 (MVP)
- **Description**: In-game UI elements
- **Acceptance Criteria**:
  - Score counter (top-left)
  - Health hearts (top-right)
  - Question text box (top-center, large)
  - Clear visual hierarchy
  - No clutter (distracting for kids)
- **Research Basis**: Simple UI critical for ages 8-12

#### FR-011: Instructions Screen
- **Priority**: P1 (MVP optional)
- **Description**: Explain game rules
- **Acceptance Criteria**:
  - How to play (click correct target)
  - Scoring rules
  - Health system
  - Visual diagrams (icons + text)
  - "Start Game" button
- **Research Basis**: Minimal text, use visuals for children

### 4.4 Technical

#### FR-012: Browser Compatibility
- **Priority**: P0 (MVP)
- **Description**: Work in modern browsers
- **Acceptance Criteria**:
  - Chrome 90+ (primary target)
  - Firefox 85+
  - Safari 14+
  - Edge 90+
- **Implementation**: Use Phaser 3 (cross-browser 2D framework)

#### FR-013: Mobile Responsiveness
- **Priority**: P1 (Phase 2)
- **Description**: Work on tablets and phones
- **Acceptance Criteria**:
  - Touch controls (tap targets)
  - Portrait and landscape support
  - Responsive layout (adapts to screen size)
  - Tap target minimum 44x44px
- **Research Basis**: Kids often use tablets

#### FR-014: Save Progress
- **Priority**: P2 (Phase 3)
- **Description**: Remember high scores
- **Acceptance Criteria**:
  - Save high score to LocalStorage
  - Display "Best Score: X" on main menu
  - Optional: Save per-subject scores
- **Implementation**: LocalStorage (no backend needed)

---

## 5. Non-Functional Requirements

### 5.1 Performance

**NFR-001: Load Time**
- Game loads in < 3 seconds on 10 Mbps connection
- Assets optimized (compressed images, minified code)
- **Research Basis**: Kids have short attention spans

**NFR-002: Frame Rate**
- Maintain 60 FPS during gameplay
- No lag on target clicks
- Smooth animations
- **Research Basis**: Snappy experience critical for engagement

**NFR-003: Asset Size**
- Total game size < 10 MB
- Questions.json < 100 KB (typical)
- **Reason**: Fast download, works on limited bandwidth

### 5.2 Usability

**NFR-004: Learning Curve**
- Child can start playing within 30 seconds (no tutorial required for basic play)
- Instructions screen optional (game is intuitive)
- **Research Basis**: Ease of access critical for casual games

**NFR-005: Accessibility**
- Text readable from 1 meter
- High contrast (text on background)
- Color-blind friendly (not relying solely on color)
- Keyboard navigation support (arrow keys + Enter)
- **Research Basis**: Inclusive design

### 5.3 Maintainability

**NFR-006: Subject Customization**
- Parent/educator can add questions by editing JSON file
- No code changes required
- JSON validation provides clear error messages
- **Business Goal**: Universal learning platform

**NFR-007: Code Quality**
- Clean, commented code
- Modular structure (scenes, components, utils)
- Comprehensive unit tests (Jest)
- **Reason**: Limited resources, need maintainable codebase

---

## 6. Game Mechanics (Detailed)

### 6.1 Scoring System

**MVP (Phase 1)**:
- Base: 100 points per correct answer
- No deductions for wrong answers (encourages trying)

**Phase 2 Enhancements**:
- **Combo Multiplier**: Consecutive correct answers
  - 5 streak: 2x multiplier (200 points)
  - 10 streak: 3x multiplier (300 points)
  - 15 streak: 5x multiplier (500 points)
- **NEW (GD Rec #4)**: Immediate combo visual feedback
  - 3 correct: Small stars around score
  - 5 correct: "🔥 ON FIRE!" text + screen glow
  - 10 correct: Full-screen particle burst + special sound
- **Speed Bonus**: +50 points if answered < 5 seconds
- **Perfect Wave**: +500 bonus for 10 questions without mistake

**NEW (GD Rec #5)**: Near-Miss Feedback (Phase 2)
- Optional "near_miss_answers" field in questions.json
- When player answers wrong but close:
  - Example: Question about Egypt, answer "Euphrates" (also ancient river)
  - Feedback: "Close! Euphrates was important to Mesopotamia, but Egypt relied on the Nile."
- Validates partial knowledge, reduces frustration

**Research Basis**:
- Combo systems increase engagement (research finding)
- No negative points prevents discouragement in children
- Immediate visual feedback triggers dopamine release (GD recommendation)

### 6.2 Health/Lives System

**MVP (Phase 1)**:
- Start: 5 hearts
- Wrong answer: -1 heart
- Game over: 0 hearts → show results screen

**Phase 2 Enhancements**:
- **Comeback Mechanic**: At 1 heart, next correct answer restores 2 hearts
- **Bonus Questions**: Every 10 correct answers, easy bonus question restores 1 heart
- **Power-Up**: Health boost power-up (rare, earned randomly)

**Research Basis**:
- Comeback mechanics prevent frustration spirals (proven effective)
- Positive reinforcement (restoration) better than just punishment

### 6.3 Power-Ups (Phase 2)

**Freeze Time**:
- Effect: Pause timer for 5 seconds (if timed mode)
- Earned: Every 5 correct answers
- Visual: Clock icon with blue glow

**Smart Bomb**:
- Effect: Eliminate 2 wrong answers, leave correct + 1 decoy
- Earned: Every 10 correct answers
- Visual: Light bulb icon with yellow glow

**Hint Arrow**:
- Effect: Highlight correct answer for 2 seconds
- Earned: One per game (use strategically)
- Visual: Arrow pointing to correct target

**Research Basis**: Power-ups as positive reinforcement (research finding)

### 6.4 Difficulty Progression (Phase 3)

**Adaptive Difficulty**:
- Track accuracy: correct/total
- If accuracy > 80% → increase difficulty
  - Faster target animations
  - More complex questions (from higher difficulty pool)
- If accuracy < 50% → decrease difficulty
  - Slower pace
  - Easier questions

**NEW (GD Rec #7)**: Spaced Repetition (Phase 3)
- Track wrong answers
- Re-ask missed questions after 5-10 new questions
- Label as "Review Question" with note: "You missed this before - let's try again!"
- Significantly improves retention (research shows 50%+ better recall)

**NEW (GD Rec #6)**: Learning Metrics (Phase 3)
- Pre-test/post-test: Simple 10-question quiz before/after 3 play sessions
- Target: 30% accuracy improvement vs. pre-test
- Proves educational value, not just entertainment

**Research Basis**:
- Flow theory: optimal engagement when challenge matches ability
- Prevents boredom (too easy) and frustration (too hard)
- Spaced repetition proven to improve long-term retention

---

## 7. Visual Design

### 7.1 Art Style

**Theme**: **"Robo Academy"** - Friendly robots in abstract learning environment

**Color Palette**:
- Primary: Bright blue (#4ECDC4)
- Secondary: Coral (#FF6B6B)
- Accent: Yellow (#FFD93D)
- Background: Light gray (#F7F7F7)
- Text: Dark gray (#333333)

**Rationale**:
- Subject-neutral (robots work for any topic)
- Vibrant colors engage children
- High contrast for readability

### 7.2 Target Design

**Four Robot Characters**:
1. **Robo-1**: Round blue robot (circle shape)
2. **Robo-2**: Square red robot (square shape)
3. **Robo-3**: Triangle green robot (triangle shape)
4. **Robo-4**: Hexagon orange robot (hexagon shape)

**Features**:
- Friendly faces (big eyes, smile)
- Answer text displayed on chest screen
- Idle animation (gentle bob up/down)
- Hover effect (glow outline)

**Why Robots**: Generic, subject-neutral, appealing to kids

### 7.3 Feedback Animations

**Correct Answer**:
- Target robot explodes in confetti particles
- "+100" text floats up and fades
- Screen flash (brief white overlay, 0.1s)
- Particle burst (colorful stars)

**Wrong Answer**:
- Target robot sparks (red electrical effect)
- "-1 ❤️" text appears
- Screen shake (subtle, 0.2s)
- Explanation text box slides in from bottom

**Research Basis**:
- Visual feedback triggers dopamine (immediate reward)
- Celebration animations encourage continued effort

### 7.4 UI Elements

**Buttons**:
- Large (minimum 120x60px on desktop)
- Rounded corners (child-friendly)
- High contrast text
- Hover effect (slight scale up, color change)

**Text**:
- Question: 24-28px bold
- Answers: 18-22px regular
- Score/Health: 20-24px bold
- Body text: 16-18px regular

**Icons**:
- Heart for health (♥️)
- Star for points (⭐)
- Trophy for high score (🏆)
- Bolt for power-ups (⚡)

---

## 8. Audio Design

### 8.1 Sound Effects

**Correct Answer**:
- Explosion (whoosh + pop)
- Cheerful chime (ding-ding-ding ascending)
- Voice: "Great job!" / "Excellent!" / "Perfect!" (rotated)

**Wrong Answer**:
- Error buzz (friendly boop, not harsh)
- Supportive voice: "Try again!" / "Keep going!" / "Almost!"

**UI Interactions**:
- Button click: Soft click
- Menu transition: Whoosh
- Power-up activation: Power-up charge sound

**Game Events**:
- Combo milestone: Special jingle
- Health low (1-2 hearts): Warning beep (gentle)
- Game over: Sad trombone (brief)
- Victory: Triumphant fanfare (5 seconds)

**Volume Controls**:
- Master volume slider
- Music on/off toggle
- SFX on/off toggle

### 8.2 Background Music

**Main Menu**:
- Upbeat, friendly loop (60-90 seconds)
- Moderately paced, not distracting

**Gameplay**:
- Focus-friendly ambient (gentle, no lyrics)
- Can be muted without affecting experience

**Game Over/Victory**:
- Brief stinger (5-10 seconds)
- No looping

**Research Basis**:
- Audio feedback reinforces learning
- Child-friendly tones (not harsh or scary)
- Optional music respects different learning styles

---

## 9. Technical Architecture

### 9.1 Tech Stack

**Core**:
- HTML5 (semantic markup)
- CSS3 (Tailwind for utility styling)
- JavaScript ES6+ (modern syntax, modules)

**Game Engine**:
- **Phaser 3** (version 3.55+)
  - Mature, well-documented 2D framework
  - Built-in: sprites, animations, physics, input handling
  - Large community, many examples
  - Cross-browser compatible

**Testing**:
- **Jest** (unit tests for game logic)
- Manual testing (play the game!)

**Build**:
- **Vite** (fast dev server, hot reload, build optimization)

**Storage**:
- **LocalStorage** (high scores, settings)
- No backend required (MVP)

### 9.2 Project Structure

```
ontap/
├── src/
│   ├── index.html              # Entry point
│   ├── main.js                 # Game initialization
│   ├── config.js               # Phaser configuration
│   ├── scenes/
│   │   ├── MenuScene.js        # Main menu
│   │   ├── GameScene.js        # Core gameplay
│   │   ├── GameOverScene.js    # Results screen
│   │   └── InstructionsScene.js # How to play
│   ├── components/
│   │   ├── QuestionDisplay.js  # Question text UI
│   │   ├── Target.js           # Robot target object
│   │   ├── ScoreDisplay.js     # Score HUD
│   │   └── HealthDisplay.js    # Hearts HUD
│   ├── utils/
│   │   ├── QuestionLoader.js   # JSON parsing
│   │   ├── AudioManager.js     # Sound management
│   │   └── ScoreManager.js     # High score persistence
│   ├── assets/
│   │   ├── images/             # Sprites, backgrounds
│   │   ├── audio/              # Sound effects, music
│   │   └── data/
│   │       └── questions.json  # Question data
│   └── styles.css              # Global styles
├── tests/
│   └── *.test.js               # Jest unit tests
├── docs/
│   ├── product/
│   │   └── prd.md              # This document
│   ├── research/
│   │   └── research-game-research.md
│   └── specs/                  # Sprint specifications
├── package.json
├── vite.config.js
└── README.md
```

### 9.3 Phaser Scenes

**MenuScene**:
- Display: Title, "Play" button, "How to Play" button
- Load: Questions from JSON (validate)
- Transition: To GameScene or InstructionsScene

**GameScene** (Main Gameplay):
```javascript
class GameScene extends Phaser.Scene {
  create() {
    // Initialize game state
    this.score = 0;
    this.health = 5;
    this.currentQuestionIndex = 0;

    // Load questions
    this.questions = this.loadQuestions();

    // Setup UI
    this.createHUD(); // Score, health
    this.createQuestionDisplay();
    this.createTargets(); // 4 robot targets

    // Display first question
    this.showQuestion(0);
  }

  showQuestion(index) {
    // Display question text
    // Assign answers to targets (randomize positions)
    // Enable target clicks
  }

  selectTarget(targetIndex) {
    // Validate answer
    if (correct) {
      this.score += 100;
      // Explosion animation
      // Play correct sound
      // Next question
    } else {
      this.health -= 1;
      // Error effect
      // Play wrong sound
      // Show explanation
      if (this.health === 0) {
        this.scene.start('GameOverScene', { score: this.score });
      } else {
        // Next question
      }
    }
  }
}
```

**GameOverScene**:
- Display: Final score, correct/incorrect count
- Buttons: "Try Again", "Main Menu"
- Save: High score to LocalStorage

### 9.4 Data Model

**Question Object**:
```javascript
{
  id: Number,           // Unique identifier
  question: String,     // Question text (max 200 chars recommended)
  answers: String[4],   // Exactly 4 answer choices
  correct: Number,      // Index of correct answer (0-3)
  explanation: String,  // Why this answer (shown on wrong answer)
  difficulty: String    // Optional: "easy", "medium", "hard"
}
```

**Game State**:
```javascript
{
  score: Number,
  health: Number,
  currentQuestionIndex: Number,
  questions: Question[],
  correctCount: Number,
  incorrectCount: Number,
  startTime: Number,    // For time tracking
}
```

**Save Data (LocalStorage)**:
```javascript
{
  highScore: Number,
  settings: {
    musicVolume: Number,  // 0-1
    sfxVolume: Number,    // 0-1
  }
}
```

---

## 10. Development Phases

### Phase 1: MVP (Sprint 1-3)

**Goal**: Playable core game loop

**Features**:
- ✅ Question loading from JSON
- ✅ Display question + 4 targets
- ✅ Click detection with forgiving grace area (GD Rec #1)
- ✅ Answer validation
- ✅ Scoring system (100 points correct, 25 points learning) (GD Rec #2)
- ✅ Milestone celebrations (5, 10, 15, 20 questions) (GD Rec #3)
- ✅ Health system (5 hearts)
- ✅ Game over / victory screens
- ✅ Basic UI (score, health, question display)
- ✅ Simple target graphics (can use placeholders)
- ✅ Basic sounds (correct/wrong feedback with supportive messages)

**Success Criteria**:
- 10-15 questions playable end-to-end
- All tests passing
- No crashes on common scenarios
- Subject-agnostic (test with history + math questions)

**Estimate**: 3-4 weeks (FE implementation + CR review)

### Phase 2: Polish & Enhancements (Sprint 4-6)

**Features**:
- ✅ Combo multiplier system with visual feedback (GD Rec #4)
  - Escalating effects: stars → "ON FIRE!" → particle burst
- ✅ Near-miss feedback for partial knowledge (GD Rec #5)
- ✅ Power-ups (Freeze Time, Smart Bomb, Hint Arrow)
- ✅ Comeback mechanics (health restoration)
- ✅ Improved graphics (custom robot sprites via MCP)
- ✅ Animation polish (explosions, particles, screen effects)
- ✅ Complete audio suite (multiple SFX, voice clips, music)
- ✅ Instructions screen
- ✅ Settings screen (volume controls)
- ✅ High score persistence

**Success Criteria**:
- Engaging 15-minute gameplay sessions
- Visual polish on par with commercial casual games
- 40-50 questions fully integrated

**Estimate**: 4-5 weeks

### Phase 3: Mobile & Advanced Features (Sprint 7-9)

**Features**:
- ✅ Mobile responsive design
- ✅ Touch controls
- ✅ Adaptive difficulty
- ✅ Spaced repetition system (GD Rec #7)
- ✅ Learning metrics with pre/post-test (GD Rec #6)
- ✅ Multiple game modes (Practice, Timed, Survival)
- ✅ Question randomization
- ✅ Subject selection (load different question files)
- ✅ Statistics tracking (accuracy over time)
- ✅ Accessibility improvements

**Success Criteria**:
- Works on tablets and phones
- Adaptive difficulty maintains flow state
- Performance optimized (60 FPS on mid-range devices)

**Estimate**: 4-5 weeks

---

## 11. Success Metrics & KPIs

### 11.1 Engagement Metrics

**Session Duration**:
- Target: 10+ minutes average
- Measure: Track play time per session
- Why: Indicates sustained engagement

**Replay Rate**:
- Target: 60% of players play 3+ sessions
- Measure: LocalStorage tracking
- Why: Indicates game is fun, not just novelty

**Questions Attempted**:
- Target: 20+ questions per session average
- Measure: Track in-game
- Why: More practice = better learning

### 11.2 Learning Metrics

**Quiz Accuracy**:
- Baseline: 50% (random guessing on 4 choices)
- Target: 70%+ after 3 play sessions
- Measure: Correct/total ratio
- Why: Shows knowledge retention

**Improvement Rate**:
- Target: 24% accuracy gain vs. first session
- Measure: Compare session 1 vs. session 3
- Why: Research baseline for game-based learning

**Explanation Views**:
- Target: 80%+ of wrong answers viewed
- Measure: Track if player reads explanation
- Why: Learning from mistakes

### 11.3 Usability Metrics

**Time to First Game**:
- Target: < 30 seconds from page load
- Measure: Time from load to first question answered
- Why: Ease of access critical for casual games

**Crash Rate**:
- Target: < 1% of sessions
- Measure: Error tracking
- Why: Quality benchmark

**Mobile Usability**:
- Target: Works on 95% of modern tablets/phones
- Measure: Device compatibility testing
- Why: Kids use tablets frequently

### 11.4 Customization Metrics

**Subject Swap Success**:
- Target: 100% of question files load correctly
- Measure: JSON validation testing
- Why: Core value proposition

**Parent Question Creation**:
- Target: 80% of parents can add questions without help
- Measure: User testing
- Why: Usability of core feature

---

## 12. Risks & Mitigation

### 12.1 Technical Risks

**Risk**: Phaser 3 learning curve for FE developer
**Impact**: Medium (delays Phase 1)
**Mitigation**:
- PM provides Phaser 3 tutorials and examples
- GD creates detailed design specs (less ambiguity)
- Start with minimal features (MVP), learn incrementally

**Risk**: Performance issues on older devices
**Impact**: Low (game is simple 2D)
**Mitigation**:
- Profile performance early (Phase 1)
- Optimize assets (compress images)
- Use sprite pooling (reuse objects)
- Set minimum browser requirements

**Risk**: JSON validation complexity
**Impact**: Low
**Mitigation**:
- Clear error messages for invalid JSON
- Provide example questions.json
- Validate during development (tests)

### 12.2 Design Risks

**Risk**: Game not engaging enough for kids
**Impact**: High (defeats purpose)
**Mitigation**:
- User testing with target age group (Phase 1 MVP)
- Iterate based on feedback
- Reference research findings (proven mechanics)
- GD designs with child psychology in mind

**Risk**: Subject-agnostic design too generic (lacks theme)
**Impact**: Medium (less appealing)
**Mitigation**:
- Robo Academy theme still has personality
- Vibrant colors and animations add polish
- Focus on gameplay fun, not theme

**Risk**: Difficulty not appropriate for age range
**Impact**: Medium
**Mitigation**:
- Adaptive difficulty (Phase 3)
- Question difficulty tagging (easy/medium/hard)
- Play testing with 8-12 year-olds

### 12.3 Scope Risks

**Risk**: Feature creep (too many enhancements)
**Impact**: High (delays MVP)
**Mitigation**:
- PM enforces phase boundaries
- MVP must ship before Phase 2 features
- CR reviews for unnecessary complexity
- "Progressive development" philosophy

**Risk**: Limited resources (no over-engineering)
**Impact**: Medium
**Mitigation**:
- Keep code simple and maintainable
- Avoid premature optimization
- Focus on core gameplay loop
- Defer nice-to-have features to Phase 3

---

## 13. Dependencies & Assumptions

### 13.1 Dependencies

**External**:
- Phaser 3 framework (stable, actively maintained)
- Browser support for HTML5 Canvas
- LocalStorage API (all modern browsers)

**Internal**:
- Questions content (Parent/BOSS provides initial set)
- Design assets (GD creates specifications)
- Test questions (15+ for MVP, 40-50 for Phase 2)

### 13.2 Assumptions

**User Assumptions**:
- Target users have modern browsers (Chrome 90+, Firefox 85+, Safari 14+)
- Target users can read at 3rd-4th grade level (ages 8-12)
- Parents have basic technical skills (edit JSON with text editor)

**Product Assumptions**:
- Subject-agnostic design is sufficient (no subject-specific mechanics needed)
- Same graphics work across all subjects (robots are universally appealing)
- LocalStorage is adequate (no cloud sync needed for MVP)

**Business Assumptions**:
- Educational game market is viable (research shows $20B by 2030)
- Parents value customizable tools (research supports this)
- Single universal game is more valuable than multiple subject-specific games

---

## 14. Open Questions

### For BOSS (User):

1. **Question Content**:
   - Do you want to provide initial question sets, or should team generate from DC_lichsu.md?
   - How many questions per subject minimum?

2. **Target Subjects**:
   - Priority: History (confirmed), Math (yes/no?), Literature (yes/no?), Other?

3. **Deployment**:
   - Where will game be hosted? (Local file, web server, GitHub Pages?)
   - Do you need simple instructions for non-technical users?

4. **Success Definition**:
   - What specific outcome for your daughter? (e.g., "Score 80%+ on history quiz after 5 play sessions")

5. **Phase 2/3 Priority**:
   - Which enhancements are most important? (Mobile support? Power-ups? Adaptive difficulty?)

### For Team:

1. **GD**: What specific robot character designs? (Sketches or detailed descriptions needed)
2. **FE**: Preference for state management approach? (Plain JS objects or class-based?)
3. **CR**: What test coverage threshold? (80%? 90%? Focus areas?)

---

## 15. Approval & Sign-Off

**Created By**: PM (Project Manager), Quiz Game Team
**Date**: December 17, 2025

**Pending Approvals**:
- [ ] **BOSS (User)**: Approve product vision and scope
- [ ] **GD (Game Designer)**: Approve game mechanics and design direction
- [ ] **FE (Frontend Developer)**: Confirm technical feasibility and estimates
- [ ] **CR (Code Reviewer)**: Confirm quality standards and testing approach

**Next Steps After Approval**:
1. **GD**: Create Sprint 1 game mechanics design (docs/specs/sprint-1-design.md)
2. **PM**: Create Sprint 1 specification based on GD design (docs/specs/sprint-1.md)
3. **FE**: Set up development environment (Phaser 3, Vite, Jest)
4. **Team**: Execute 10-step sprint workflow (MVP delivery)

---

## Appendix A: Research Summary

This PRD is based on comprehensive research documented in `docs/research/research-game-research.md`, including:

- **Market Context**: $4.19B → $20.58B (2030), 23% CAGR
- **Effectiveness**: 24% retention boost, 93% on-task time with game-based learning
- **Action Games**: Time pressure + immediate feedback = engagement (Kahoot: 1B+ users)
- **Gamification**: Points (24% retention), comebacks prevent frustration, dopamine triggers
- **Child Psychology**: Ages 8-12 need fast feedback, visual rewards, forgiving gameplay
- **Adaptive Difficulty**: Flow theory - challenge matches ability for optimal engagement

**54 research sources** cited in full research document.

---

## Appendix B: Competitive Analysis

**Direct Competitors** (Subject-Specific):
- **Prodigy Math**: RPG, subject-specific (math only)
- **Kahoot**: Quiz platform, no game mechanics (bare quiz)
- **Math Blaster**: Action game, subject-specific (math only)

**Our Advantage**:
- ✅ **Subject-agnostic**: Works for ANY curriculum
- ✅ **No setup**: Load different question file = instant new game
- ✅ **Simple customization**: Parents can add questions easily
- ✅ **Engaging mechanics**: Action gameplay > bare quiz (59% preference)
- ✅ **Open/free**: No subscription, no expensive license

**Positioning**: "Universal Learning Platform - One Game, Every Subject"

---

## Appendix C: Glossary

**Subject-Agnostic**: Game functions identically regardless of educational subject (history, math, literature, etc.)

**MVP (Minimum Viable Product)**: Smallest feature set that delivers core value (playable game loop)

**Phaser 3**: Open-source 2D game framework for HTML5 games

**LocalStorage**: Browser API for persistent client-side data storage

**Flow Theory**: Psychological state of optimal engagement when challenge matches skill level

**Gamification**: Application of game mechanics to non-game contexts (learning)

**Combo Multiplier**: Increasing score bonus for consecutive correct answers (streak)

**Comeback Mechanic**: Game feature that helps struggling players recover (prevents frustration spiral)

**Adaptive Difficulty**: System that automatically adjusts challenge based on player performance

---

**END OF PRD**

---

**Document Status**: 📝 Draft - Awaiting BOSS Approval
**Last Updated**: December 17, 2025
**Next Review**: After BOSS feedback received
