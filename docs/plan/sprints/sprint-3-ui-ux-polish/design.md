# Sprint 3 Design: UI/UX & Polish
**Quiz Battle Arena - Complete Playable Experience**

**Designer**: GD (Game Designer)
**Date**: December 17, 2025
**Sprint Duration**: Week 3-4
**Milestone**: M1 - Core MVP (Final Sprint)
**Depends On**: Sprint 2A ✅, Sprint 2B ✅

---

## Executive Summary

Sprint 3 completes the M1 MVP by adding the **final polish layer**: a main menu for navigation, consistent HUD styling, audio feedback, and visual effects. This transforms the functional game (Sprint 1+2A+2B) into a complete, polished experience ready for user testing.

**Deliverable**: Fully playable game with menu navigation, audio feedback, particle effects, and professional UI polish.

**Key Focus**: Age-appropriate design (8-12 years), progressive disclosure, and sensory feedback without overwhelming children.

---

## Design Philosophy

### Progressive Disclosure (Critical Constraint)
- **Main gameplay prominent**: Play button is largest, most obvious
- **Secondary features subtle**: Help, settings are accessible but not distracting
- **Clean, minimal UI**: Children need focus, not clutter
- **Maximum 4-6 key UI elements** per screen

### Visual Variety (Critical Constraint)
- **Mix feedback types**: Animations, sounds, text, colors
- **Not all animations**: Some feedback is instant (color changes)
- **Not all sounds**: Some feedback is visual only
- **Scannable in ~1 minute**: Child can understand UI quickly

### Age-Appropriate Design (8-12 Years)
- **Large, clear buttons**: 180px+ width, 60px+ height
- **Simple Vietnamese language**: Short phrases, no complex terms
- **Encouraging, not punishing**: Supportive messages, friendly sounds
- **Bright but not overwhelming**: Colorful palette, clean contrast

### Subject-Agnostic Continuity
- **Generic visuals**: No history/math/literature-specific graphics
- **Universal icons**: Hearts (health), stars (celebration), arrows (navigation)
- **Vietnamese language**: Maintained throughout

---

## 1. Main Menu Screen (FR-009)

### Layout

**Canvas**: 800px × 600px
**Background**: Solid color or simple gradient

```
┌─────────────────────────────────────────────────┐
│                                                   │
│                  [Game Title]                     │
│              Quiz Battle Arena                    │
│              Trò Chơi Đố Vui                     │
│                                                   │
│                  [Robot Icon]                     │
│                   🤖 (96px)                       │
│                                                   │
│              ┌─────────────────┐                 │
│              │   CHƠI NGAY    │                 │
│              │   (Play Now)    │                 │
│              └─────────────────┘                 │
│                                                   │
│          ┌──────────┐    ┌──────────┐           │
│          │ Hướng dẫn │    │ Cài đặt │           │
│          │ (How to)  │    │(Settings)│           │
│          └──────────┘    └──────────┘           │
│                                                   │
└─────────────────────────────────────────────────┘
```

### Game Title

**Text**:
- Primary: "Quiz Battle Arena" (English subtitle, small)
- Main: "Trò Chơi Đố Vui" (Vietnamese main title)
- Translation: "Quiz Game" (simple, clear)

**Typography**:
- Primary (English): 24px, regular, `#666666` (light gray)
- Main (Vietnamese): 48px, bold, `#4ECDC4` (bright blue)
- Alignment: Center
- Position: 80px from top

**Icon/Logo**:
- Robot emoji 🤖 or simple robot graphic (96px × 96px)
- Position: Center, 160px from top
- Animation: Gentle bob up/down (1s cycle, subtle)
- **Purpose**: Friendly, welcoming, subject-neutral

### "Play Now" Button (Primary CTA)

**Dimensions**: 280px × 80px (LARGE - most important button)
**Background**: `#4ECDC4` (bright blue - primary color)
**Text**: "CHƠI NGAY" (Play Now)
**Font**: 28px, bold, white color
**Border radius**: 16px (rounded, friendly)
**Shadow**: `0 6px 12px rgba(78, 205, 196, 0.4)` (prominent depth)
**Position**: Center, 280px from top

**Hover State**:
- Background: `#3BA99C` (darker blue)
- Scale: 1.08 (noticeable growth)
- Cursor: pointer
- Shadow: `0 8px 16px rgba(78, 205, 196, 0.6)` (stronger)
- Transition: 0.2s

**Click Animation**:
- Scale: 0.95 (brief squish)
- Duration: 0.1s
- Then transition to GameScene

**Action**: Start game
- Transition to GameScene
- Load first question
- Initialize score/health
- Fade transition (0.5s)

### "How to Play" Button (Secondary)

**Dimensions**: 160px × 60px
**Background**: `#FFFFFF` (white)
**Border**: 2px solid `#4ECDC4`
**Text**: "Hướng dẫn" (How to Play)
**Font**: 20px, semi-bold, `#4ECDC4` (blue text)
**Border radius**: 12px
**Position**: Left of center, 420px from top, 20px spacing from Settings

**Hover State**:
- Background: `#F0F9F8` (very light blue)
- Border: 3px solid `#4ECDC4`
- Scale: 1.05

**Action**: Show instructions overlay
- Modal overlay (similar to milestone celebration)
- Instructions in Vietnamese
- Close button to return to menu

### "Settings" Button (Secondary)

**Dimensions**: 160px × 60px
**Background**: `#FFFFFF` (white)
**Border**: 2px solid `#FFD93D` (yellow - different from blue)
**Text**: "Cài đặt" (Settings)
**Font**: 20px, semi-bold, `#FFD93D` (yellow text)
**Border radius**: 12px
**Position**: Right of center, 420px from top

**Hover State**:
- Background: `#FFFDF0` (very light yellow)
- Border: 3px solid `#FFD93D`
- Scale: 1.05

**Action**: Show settings overlay (Sprint 3 - basic version)
- Sound on/off toggle (simple)
- Close button
- **Deferred to M2**: Volume sliders, music toggle

### Menu Background

**Style**: Clean, simple, not busy

**Option 1 - Solid Color** (Recommended for MVP):
- Background: `#F7F9FC` (very light blue-gray)
- Subtle texture: None (clean)
- **Pros**: Simple, fast, professional

**Option 2 - Subtle Gradient**:
- Top: `#E8F4F8` (light blue)
- Bottom: `#F7F9FC` (light gray)
- Direction: Top to bottom
- **Pros**: Slight depth, still clean

**Option 3 - Pattern** (Optional):
- Very faint dots or grid pattern
- Opacity: 0.05 (barely visible)
- Color: `#4ECDC4` (blue)
- **Pros**: Adds texture without distraction
- **Cons**: More complex, test with children first

**Recommendation**: Option 1 (solid color) for Sprint 3. Test with users, upgrade to gradient/pattern in M2 if desired.

### Menu Scene Animation

**Entry Animation** (page load or return from game):
1. **Fade In Background** (0.3s)
2. **Title Slides Down** (0.4s, from -50px)
3. **Robot Icon Bounces In** (0.5s, scale 0 → 1.2 → 1.0)
4. **Play Button Fades In** (0.6s)
5. **Secondary Buttons Fade In** (0.7s)

**Total**: ~0.8s for complete menu appearance

**Purpose**: Professional entry, not instant/jarring

---

## 2. Instructions Overlay (FR-011)

### Trigger

**From Main Menu**: Click "Hướng dẫn" (How to Play) button

### Layout

**Overlay**: Semi-transparent black `rgba(0, 0, 0, 0.8)`
**Modal**: 600px × 500px, centered, white background

```
┌─────────────────────────────────────┐
│  [X] Close                           │
│                                      │
│  Cách chơi (How to Play)            │
│                                      │
│  1. Đọc câu hỏi ở trên màn hình    │
│  2. Nhấp vào robot có câu trả lời đúng │
│  3. Bạn có 5 trái tim ❤️            │
│  4. Trả lời sai mất 1 trái tim      │
│  5. Trả lời đúng được điểm          │
│                                      │
│  [Visual Diagram - Simple]           │
│                                      │
│  ┌──────────┐                       │
│  │  Bắt đầu │                       │
│  └──────────┘                       │
└─────────────────────────────────────┘
```

### Content (Vietnamese)

**Title**: "Cách chơi" (How to Play)
**Font**: 32px, bold, `#4ECDC4`

**Instructions** (numbered list):
1. "Đọc câu hỏi ở trên màn hình" (Read the question on screen)
2. "Nhấp vào robot có câu trả lời đúng" (Click the robot with correct answer)
3. "Bạn có 5 trái tim ❤️❤️❤️❤️❤️" (You have 5 hearts)
4. "Trả lời sai mất 1 trái tim 💔" (Wrong answer loses 1 heart)
5. "Trả lời đúng được điểm +100" (Correct answer earns +100 points)
6. "Trả lời sai vẫn học được +25" (Wrong answer still learns +25)

**Font**: 20px, regular, `#333333`
**Line height**: 1.8 (spacing for readability)

**Visual Diagram** (optional, simple):
- Question box → 4 robots → Click → Score/Hearts
- Arrows showing flow
- Simple icons, minimal text

**"Start" Button**:
- 180px × 60px
- Background: `#4ECDC4`
- Text: "Bắt đầu" (Start)
- Action: Close overlay, start game immediately

**Close Button**:
- Position: Top-right, 20px from edge
- Icon: ✕ (X symbol, 24px)
- Hover: Scale 1.2, color `#FF6B6B`
- Action: Close overlay, return to menu

---

## 3. HUD (Heads-Up Display) Polish (FR-010)

### Current State (Sprint 2A)

**Already Implemented**:
- ✅ Score display (top-left)
- ✅ Health hearts (top-right)
- ✅ Question text box (top-center)

**Sprint 3 Goal**: Visual consistency and polish, NOT rebuilding

### Score Display (Top-Left) - Polish

**Current**: Basic text with container (Sprint 1)

**Polish Enhancements**:

1. **Container Styling**:
   - Background: `rgba(255, 255, 255, 0.95)` (semi-transparent)
   - Border: 2px solid `#4ECDC4` (blue border)
   - Border radius: 10px
   - Padding: 12px 18px
   - Shadow: `0 3px 6px rgba(0, 0, 0, 0.15)` (subtle depth)

2. **Icon Addition**:
   - Star icon ⭐ before score number
   - Size: 24px
   - Color: `#FFD93D` (yellow - matches milestone trophy)
   - Animation: Twinkle on score increase (scale pulse)

3. **Score Number Animation** (enhanced from Sprint 1):
   - Count-up effect: Smooth number increment
   - Scale pulse: 1.0 → 1.15 → 1.0 when score increases
   - Color flash: Brief gold `#FFD93D`, then return to blue
   - Duration: 0.5s

4. **Typography**:
   - Label: "Điểm" (Score) - 16px, `#666666`
   - Number: 28px, bold, `#4ECDC4`
   - Spacing: 8px between label and number

### Health Display (Top-Right) - Polish

**Current**: Hearts with container (Sprint 2A)

**Polish Enhancements**:

1. **Container Styling** (match Score):
   - Background: `rgba(255, 255, 255, 0.95)`
   - Border: 2px solid `#FF6B6B` (red border - health theme)
   - Border radius: 10px
   - Padding: 12px 18px
   - Shadow: `0 3px 6px rgba(0, 0, 0, 0.15)`

2. **Heart Icons** (enhanced):
   - Full: ❤️ (32px, or sprite if available)
   - Empty: 💔 (32px, gray)
   - Spacing: 6px between hearts
   - **New**: Subtle glow on full hearts (pulse animation)

3. **Low Health Animation** (enhanced from Sprint 2A):
   - At 2 hearts: Container border pulses red
   - At 1 heart: Screen vignette (red tint at edges), hearts shake gently
   - Purpose: Clear warning without being scary

### Question Box (Top-Center) - Polish

**Current**: Text container with border (Sprint 1)

**Polish Enhancements**:

1. **Container Styling** (match Score/Health):
   - Background: `rgba(255, 255, 255, 0.98)` (more opaque - content focus)
   - Border: 3px solid `#4ECDC4` (thicker - emphasis)
   - Border radius: 12px
   - Padding: 20px
   - Shadow: `0 4px 8px rgba(0, 0, 0, 0.2)` (stronger depth)

2. **Icon Addition**:
   - Question mark icon ❓ in top-left corner of box
   - Size: 28px
   - Color: `#4ECDC4`
   - Subtle bounce animation when new question loads

3. **Typography** (already good, minor enhancement):
   - Font size: 24px (keep)
   - Line height: 1.4 (keep)
   - Color: `#333333` (keep)
   - **New**: Slight drop shadow on text for readability
     - Shadow: `0 1px 2px rgba(0, 0, 0, 0.1)`

### HUD Consistency Summary

**Common Design Language**:
- All containers: Semi-transparent white backgrounds
- All containers: Colored borders (blue/red based on function)
- All containers: 10-12px border radius
- All containers: Subtle shadows for depth
- All icons: 24-32px, matching color themes
- All text: Sans-serif, clear hierarchy

**Purpose**: Cohesive, professional UI that feels designed, not random

---

## 4. Sound Effects (FR-003)

### Design Principles

**Age-Appropriate (8-12 Years)**:
- **NOT harsh or scary**: No buzzers, sirens, alarms
- **Encouraging**: Supportive tones, even for errors
- **Clear but not annoying**: Short duration, pleasant tones
- **Volume**: Moderate (0.5-0.7), never loud

**Audio Feedback Rules**:
- **Every click gets feedback**: Visual OR audio (not always both)
- **Important actions get both**: Correct answer, milestone
- **Subtle actions get visual only**: Hover states, text changes

### Sound Effect Specifications

#### 1. Correct Answer Sound

**Type**: Cheerful chime
**Duration**: 0.5-0.8 seconds
**Pitch**: Medium-high (pleasant, uplifting)
**Volume**: 0.7 (clear but not loud)
**Tone**: Major chord progression (C → E → G)

**Reference Examples**:
- "Success" sound from mobile games
- Gentle xylophone "ding"
- Bell chime (not heavy bell, light chime)

**Timing**: Plays when target clicked AND validated as correct

**Variations** (nice-to-have):
- 3-4 slight variations to prevent repetition fatigue
- Rotate through variations
- All same pitch/tone, slight timbre differences

#### 2. Wrong Answer Sound

**Type**: Friendly boop (NOT harsh buzzer)
**Duration**: 0.3-0.5 seconds
**Pitch**: Medium-low (neutral, not sad)
**Tone**: Single note, rounded tone
**Volume**: 0.5 (quieter than correct - less emphasis)

**Reference Examples**:
- "Pop" sound (like bubble pop)
- Soft "boop" (like button press)
- Gentle "thud" (soft, not harsh)

**Timing**: Plays when target clicked AND validated as wrong

**Critical**: Must NOT sound punishing
- Avoid: Buzzers, sirens, descending scales (sad)
- Goal: "Try again!" feeling, not "You failed!"

#### 3. Milestone Celebration Sound

**Type**: Celebration chime
**Duration**: 1.0-1.5 seconds
**Pitch**: High (exciting, energetic)
**Tone**: Ascending scale (C → E → G → C)
**Volume**: 0.6 (noticeable but not startling)

**Reference Examples**:
- "Level up" sound
- Victory fanfare (short version)
- Sparkle/magic sound

**Timing**: Plays when milestone modal appears (5, 10, 15 questions)

**Variations by Milestone**:
- 5 questions: Short 2-note chime (C → E)
- 10 questions: Medium 3-note (C → E → G)
- 15 questions: Longer 4-note (C → E → G → C high)
- Purpose: Escalating celebration

#### 4. Game Over Sounds

**Victory Sound**:
- Type: Triumphant fanfare
- Duration: 2.0 seconds
- Pitch: Full range (low → high)
- Tone: Major key, celebratory
- Volume: 0.7

**Defeat Sound**:
- Type: Supportive "try again" tone
- Duration: 1.0 seconds
- Pitch: Medium (neutral, not sad)
- Tone: Gentle, encouraging
- Volume: 0.5
- **NOT**: Sad descending scale, game over buzzer

**Timing**: Plays when game over modal appears

#### 5. UI Interaction Sounds (Buttons)

**Button Click** (Play, Restart, etc.):
- Type: Soft click
- Duration: 0.1-0.2 seconds
- Volume: 0.4 (subtle)
- Timing: On button press

**Button Hover** (optional):
- Type: Very soft "whoosh"
- Duration: 0.1 seconds
- Volume: 0.3 (very quiet)
- Timing: On mouse enter

**Recommendation**: Start with click only, add hover in M2 if desired

### Audio Implementation

**Format**: MP3 (primary), OGG (fallback)
**Loading**: Preload all sounds on MenuScene create
**Playback**: Phaser AudioManager or Howler.js

**Volume Control** (Sprint 3 - basic):
- Settings menu: Sound on/off toggle
- Default: On
- LocalStorage: Save preference

**Deferred to M2**:
- Master volume slider
- Separate music/SFX volume
- Background music

### Audio File Structure

```
src/assets/audio/
  ├── correct.mp3          # Correct answer chime
  ├── wrong.mp3            # Wrong answer boop
  ├── milestone_5.mp3      # 5-question celebration
  ├── milestone_10.mp3     # 10-question celebration
  ├── milestone_15.mp3     # 15-question celebration
  ├── gameover_victory.mp3 # Victory fanfare
  ├── gameover_defeat.mp3  # Supportive try-again
  └── button_click.mp3     # UI button click
```

**Audio Sources** (Recommendations):
1. **Free**: Freesound.org (CC0 license)
2. **Free**: Zapsplat.com (free with attribution)
3. **Paid**: AudioJungle.net ($1-5 per sound)
4. **Generate**: Bfxr.net (retro sound generator, free)

---

## 5. Visual Feedback Enhancements

### Correct Answer Explosion

**Current State**: Sprint 1 shows green flash

**Enhancement** (Sprint 3):

**Particle Effect**:
- **Type**: Confetti explosion
- **Particles**: 15-25 small rectangles (5px × 5px)
- **Colors**: Mix of `#4ECDC4` (blue), `#FFD93D` (yellow), `#95E1D3` (green)
- **Origin**: Clicked target center
- **Direction**: Radial burst (360° spread)
- **Speed**: Fast initial, gravity slows down
- **Duration**: 1.5 seconds (fade out)
- **Rotation**: Each particle rotates as it falls

**Screen Flash**:
- Color: `rgba(78, 205, 196, 0.2)` (blue tint)
- Duration: 0.15 seconds (brief)
- Timing: Simultaneous with explosion

**Target Animation** (enhanced from Sprint 1):
- Scale: 1.0 → 1.2 → 1.0 (bounce)
- Rotation: 360° spin
- Duration: 0.8 seconds
- Color: Brief bright glow (white overlay, fade out)

**Purpose**: Celebrate correct answer with satisfying visual feedback

### Wrong Answer Spark Effect

**Current State**: Sprint 1 shows red shake

**Enhancement** (Sprint 3):

**Spark Particles**:
- **Type**: Error sparks (like electrical sparks)
- **Particles**: 8-12 small lines (2px × 8px)
- **Color**: `#FF6B6B` (coral red) to `#FF0000` (darker red)
- **Origin**: Clicked target edges
- **Direction**: Random angles, short distance
- **Speed**: Fast burst, quick dissipate
- **Duration**: 0.5 seconds
- **Style**: Sharp, quick (not scary, just "oops" feeling)

**Target Animation** (enhanced from Sprint 1):
- Shake: 3 horizontal vibrations (5px each)
- Duration: 0.3 seconds
- Border: Briefly change to red (flash)

**Screen Effect** (subtle):
- Very brief red tint at edges (vignette)
- Duration: 0.2 seconds
- Opacity: 0.1 (barely visible, not scary)

**Purpose**: Clear "incorrect" feedback without being harsh or punishing

### Explanation Text Display

**Current State**: Sprint 1 shows text in container

**Enhancement** (Sprint 3):

**Container**:
- Background: `rgba(255, 255, 255, 0.98)`
- Border: 2px solid `#FFD93D` (yellow - learning theme)
- Border radius: 10px
- Padding: 18px
- Shadow: `0 4px 8px rgba(0, 0, 0, 0.2)`
- Position: Bottom-center, 80px from bottom
- Width: 600px
- Max height: 120px (scroll if longer)

**Icon**:
- Light bulb 💡 (32px) at left side
- Purpose: "Learning moment" visual cue

**Typography**:
- Font size: 18px
- Line height: 1.5
- Color: `#333333`
- Alignment: Left

**Animation**:
- Slide up from bottom (0.3s)
- Stay visible: 3 seconds
- Fade out: 0.3s
- Total: ~3.6 seconds

**Skip Functionality**:
- Click anywhere to skip (dismiss early)
- Button: "Tiếp tục" (Continue) at bottom-right
- 120px × 40px, blue background

**Purpose**: Educational moment, but skippable if player wants to move fast

### Health Loss Animation (Enhanced)

**Current State**: Sprint 2A - heart breaks, container pulses

**Enhancement** (Sprint 3):

**Heart Break Effect**:
- Small particles burst from breaking heart
- 5-8 tiny red particles
- Brief animation (0.3s)
- Purpose: Makes health loss more tangible

**Screen Shake** (subtle):
- Entire canvas shakes 2px horizontally
- Duration: 0.2 seconds
- Only on health loss, not every wrong answer
- Purpose: Physical feedback for important event

### Milestone Celebration Effects (Enhanced)

**Current State**: Sprint 2B - modal with progress bar

**Enhancement** (Sprint 3):

**Confetti Burst**:
- 30-50 confetti particles (larger than correct answer)
- Colors: Full palette (blue, yellow, green, red, coral)
- Origin: Top of modal
- Animation: Fall with gravity, rotation
- Duration: 2.0 seconds
- Purpose: Big celebration moment

**Icon Animation** (enhanced):
- Bounce in: Scale 0 → 1.3 → 1.0 (bigger bounce)
- Rotation: 0° → 360° during bounce
- Glow effect: Bright white outline, fade out
- Purpose: Draw attention to milestone

**Background Flash**:
- White flash: `rgba(255, 255, 255, 0.3)`
- Duration: 0.2s
- Timing: When icon bounces in
- Purpose: Screen-wide celebration

---

## 6. Settings Overlay (Sprint 3 - Basic)

### Layout

**Overlay**: Semi-transparent black `rgba(0, 0, 0, 0.8)`
**Modal**: 400px × 300px, centered, white background

```
┌──────────────────────────────┐
│  [X] Close                    │
│                               │
│  Cài đặt (Settings)          │
│                               │
│  Âm thanh (Sound):            │
│  [🔊 Bật] [🔇 Tắt]         │
│                               │
│                               │
│  (Placeholder for M2)         │
│  - Âm lượng (Volume)         │
│  - Nhạc nền (Music)          │
│                               │
└──────────────────────────────┘
```

### Content

**Title**: "Cài đặt" (Settings)
**Font**: 28px, bold, `#4ECDC4`

**Sound Toggle**:
- Label: "Âm thanh" (Sound)
- Font: 20px, `#333333`
- Buttons: Two toggle buttons
  - "Bật" (On) - 100px × 50px
  - "Tắt" (Off) - 100px × 50px
- Active state: Blue background `#4ECDC4`, white text
- Inactive state: Light gray `#F0F0F0`, dark gray text
- Action: Toggle sound on/off globally

**LocalStorage**:
- Key: `quizBattleArena_soundEnabled`
- Value: `true` / `false`
- Default: `true`

**Close Button**:
- Top-right, 20px from edge
- Icon: ✕ (X symbol, 24px)
- Action: Close overlay, return to menu or game

**Deferred to M2** (show as placeholder):
- "Âm lượng: [Slider]" (Volume slider)
- "Nhạc nền: [On/Off]" (Background music toggle)
- Text: "(Sắp có)" (Coming soon)

---

## 7. Scene Transitions

### Menu → Game Transition

**Animation** (0.5 seconds):
1. Menu fades out (0.3s)
2. Brief black screen (0.1s)
3. Game fades in (0.3s with 0.2s overlap)

**Purpose**: Smooth context switch, not jarring

### Game → Menu Transition (Game Over → Restart)

**Animation** (0.4 seconds):
1. Game over modal fades out (0.2s)
2. Game scene fades out (0.2s)
3. Menu fades in (0.3s with 0.1s overlap)

**Purpose**: Clean reset, ready to play again

### Settings/Instructions Overlay

**Entry**: Modal scales in (0.3s, scale 0.9 → 1.0)
**Exit**: Modal scales out (0.2s, scale 1.0 → 0.8), then fade

**Purpose**: Layer effect, doesn't navigate away

---

## 8. Technical Specifications

### Scene Management

**New Scene** (Sprint 3): `MenuScene`

**Scene List**:
```javascript
const config = {
  scene: [
    MenuScene,       // NEW - Sprint 3
    GameScene,       // Sprint 1 + 2A + milestone checks
    GameOverScene    // Sprint 2B
  ]
};
```

**Scene Flow**:
```
MenuScene
  ├─→ Play button → GameScene
  ├─→ How to Play → Instructions overlay (same scene)
  └─→ Settings → Settings overlay (same scene)

GameScene
  └─→ Game over → GameOverScene

GameOverScene
  ├─→ Try Again → GameScene (restart)
  └─→ Main Menu → MenuScene
```

### Audio Management

**AudioManager Class** (recommended):
```javascript
class AudioManager {
  constructor(scene) {
    this.scene = scene;
    this.sounds = {};
    this.enabled = true;
    this.loadSoundPreference();
  }

  preload() {
    // Load all audio files
    this.scene.load.audio('correct', 'assets/audio/correct.mp3');
    this.scene.load.audio('wrong', 'assets/audio/wrong.mp3');
    // ... other sounds
  }

  create() {
    // Create sound objects
    this.sounds.correct = this.scene.sound.add('correct');
    this.sounds.wrong = this.scene.sound.add('wrong');
    // ... other sounds
  }

  play(soundName, volume = 0.7) {
    if (this.enabled && this.sounds[soundName]) {
      this.sounds[soundName].play({ volume });
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    this.saveSoundPreference();
  }

  loadSoundPreference() {
    const saved = localStorage.getItem('quizBattleArena_soundEnabled');
    this.enabled = saved === null ? true : saved === 'true';
  }

  saveSoundPreference() {
    localStorage.setItem('quizBattleArena_soundEnabled', this.enabled);
  }
}
```

### Particle System (Phaser)

**Confetti Particles** (Correct Answer / Milestone):
```javascript
// Create particle emitter
const particles = this.add.particles('particle'); // 5x5 white square

// Configure emitter
const emitter = particles.createEmitter({
  x: targetX,
  y: targetY,
  speed: { min: 150, max: 300 },
  angle: { min: 0, max: 360 },
  scale: { start: 1, end: 0 },
  alpha: { start: 1, end: 0 },
  lifespan: 1500,
  gravityY: 300,
  tint: [0x4ECDC4, 0xFFD93D, 0x95E1D3, 0xFF6B6B],
  quantity: 20,
  blendMode: 'ADD'
});

emitter.explode();
```

**Spark Particles** (Wrong Answer):
```javascript
const sparks = this.add.particles('spark'); // 2x8 red line

const sparkEmitter = sparks.createEmitter({
  x: targetX,
  y: targetY,
  speed: { min: 100, max: 200 },
  angle: { min: 0, max: 360 },
  scale: { start: 1, end: 0.3 },
  alpha: { start: 1, end: 0 },
  lifespan: 500,
  tint: [0xFF6B6B, 0xFF0000],
  quantity: 10,
  blendMode: 'NORMAL'
});

sparkEmitter.explode();
```

---

## 9. Testing Requirements

### Unit Tests (Sprint 3 - 2 new tests = 12 total)

**Continuing from Sprint 1 + 2A + 2B**: 10 tests

**New Tests for Sprint 3**:

**Test 11: Sound Toggle**
```javascript
test('toggles sound on and off', () => {
  const audioManager = new AudioManager();
  expect(audioManager.enabled).toBe(true);

  audioManager.toggle();
  expect(audioManager.enabled).toBe(false);

  audioManager.toggle();
  expect(audioManager.enabled).toBe(true);
});
```

**Test 12: LocalStorage Sound Preference**
```javascript
test('saves and loads sound preference', () => {
  const audioManager = new AudioManager();

  // Save as disabled
  audioManager.enabled = false;
  audioManager.saveSoundPreference();

  // Create new instance (simulates page reload)
  const audioManager2 = new AudioManager();
  audioManager2.loadSoundPreference();

  expect(audioManager2.enabled).toBe(false);
});
```

### Manual Testing Checklist (Sprint 3)

**Main Menu**:
- [ ] Menu displays correctly on load
- [ ] "Play Now" button starts game
- [ ] "How to Play" opens instructions
- [ ] "Settings" opens settings overlay
- [ ] Button hover effects work
- [ ] Robot icon animates (gentle bob)
- [ ] Vietnamese text displays correctly

**Instructions Overlay**:
- [ ] Opens from menu
- [ ] Displays 6 instructions in Vietnamese
- [ ] "Start" button starts game
- [ ] Close button returns to menu
- [ ] Click outside closes overlay

**Settings Overlay**:
- [ ] Opens from menu (and game if in M2)
- [ ] Sound toggle switches on/off
- [ ] Preference saves to LocalStorage
- [ ] Close button works
- [ ] Vietnamese text correct

**HUD Polish**:
- [ ] Score container has consistent styling
- [ ] Health container matches design
- [ ] Question box matches design
- [ ] Icons display correctly (star, hearts, question mark)
- [ ] All containers have shadows and borders

**Sound Effects**:
- [ ] Correct answer plays cheerful chime
- [ ] Wrong answer plays friendly boop
- [ ] Milestone plays celebration sound
- [ ] Game over plays appropriate sound (victory/defeat)
- [ ] Button clicks play sound
- [ ] Sound toggle mutes all sounds
- [ ] Volume levels appropriate (not too loud)

**Visual Effects**:
- [ ] Correct answer confetti explodes
- [ ] Wrong answer sparks appear
- [ ] Health loss shows particle burst
- [ ] Milestone confetti falls
- [ ] Screen flashes subtle (not harsh)
- [ ] Explanation text slides up smoothly

**Scene Transitions**:
- [ ] Menu → Game transition smooth
- [ ] Game → Game Over → Menu smooth
- [ ] No flickering or jumping
- [ ] All transitions feel professional

**Integration**:
- [ ] All Sprint 1+2A+2B features still work
- [ ] Sound plays during gameplay
- [ ] Particles don't cause lag
- [ ] Settings persist across sessions

---

## 10. Success Criteria (Sprint 3)

**Sprint 3 is COMPLETE when**:

✅ **Functional**:
1. Main menu works (play, instructions, settings)
2. Instructions overlay displays correctly
3. Settings overlay toggles sound
4. Sound effects play for all actions
5. Visual effects (particles) work
6. Scene transitions smooth
7. All Sprint 1+2A+2B features still work

✅ **Visual**:
1. Main menu looks professional
2. HUD has consistent styling (score, health, question)
3. Confetti and spark particles look good
4. Explanation text displays nicely
5. Settings/instructions overlays look polished

✅ **Audio**:
1. Correct answer sound is cheerful
2. Wrong answer sound is supportive (not harsh)
3. Milestone sound is celebratory
4. Game over sounds match tone (victory/defeat)
5. Volume levels appropriate
6. Sound toggle works

✅ **Child-Friendly**:
1. All sounds encouraging, not scary
2. Visual effects exciting, not overwhelming
3. Vietnamese text clear and simple
4. Buttons large and easy to click
5. Instructions understandable

✅ **Technical**:
1. 12+ unit tests passing
2. No console errors
3. No performance issues (60 FPS with particles)
4. LocalStorage works
5. All scenes navigate correctly

✅ **Polish**:
1. Game feels complete and professional
2. UI consistent across all screens
3. Animations smooth
4. Ready for user testing (M1 complete)

---

## 11. Deferred to M2 (Phase 2: Polish & Enhancements)

**M2 - Audio Enhancements**:
- Background music (menu, gameplay)
- Volume sliders (master, music, SFX separate)
- More sound variations

**M2 - Visual Enhancements**:
- Custom robot sprites (replacing colored rectangles)
- Professional heart sprites
- Animated backgrounds
- Enhanced particle effects (more elaborate)

**M2 - UI Enhancements**:
- Combo multiplier visual effects
- Power-ups UI
- Comeback mechanic effects
- Enhanced milestone celebrations

**M3 - Advanced Features**:
- Settings in-game (pause menu)
- Statistics screen
- Achievement system
- Subject selection

---

## 12. Design Rationale

### Why Progressive Disclosure?

**Research**: Children 8-12 need focus, not overwhelm
- Main action (Play) is 2x larger than secondary buttons
- Instructions/Settings subtle, but accessible
- Game starts immediately (no required tutorial)
- Help available when needed, not forced

### Why Simple Sound Toggle (Not Sliders)?

**Sprint 3 Scope**: MVP needs on/off, not fine-tuning
- Most children: "sounds yes or no"
- Parents: "turn it off in class"
- Fine control (volume sliders) = M2 enhancement
- Simplicity = faster implementation, less testing

### Why Particles for Feedback?

**Research**: "Visual feedback triggers dopamine"
- Confetti = celebration (universal positive)
- Sparks = "oops" (clear but not harsh)
- Particles add juice without complexity
- Proven in successful games (Duolingo, Kahoot)

### Why "Supportive" Wrong Answer Sound?

**Child Psychology**: Failure anxiety prevents trying
- Harsh buzzer = "you're wrong, feel bad"
- Friendly boop = "try again, it's okay"
- Research shows positive reinforcement > punishment
- Goal: Encourage learning, not discourage trying

---

## 13. Implementation Notes for FE

### File Structure Addition

```
src/
  ├── scenes/
  │   ├── MenuScene.js              # NEW - Sprint 3
  │   ├── GameScene.js              # Sprint 1+2A + audio calls
  │   └── GameOverScene.js          # Sprint 2B + audio calls
  ├── components/
  │   ├── InstructionsOverlay.js    # NEW - Sprint 3
  │   ├── SettingsOverlay.js        # NEW - Sprint 3
  │   └── (Sprint 1+2 components)
  ├── utils/
  │   ├── AudioManager.js           # NEW - Sprint 3
  │   └── (Sprint 1+2 utils)
  ├── assets/
  │   ├── audio/                    # NEW - Sprint 3
  │   │   ├── correct.mp3
  │   │   ├── wrong.mp3
  │   │   ├── milestone_*.mp3
  │   │   ├── gameover_*.mp3
  │   │   └── button_click.mp3
  │   └── particles/                # NEW - Sprint 3
  │       ├── confetti.png (5x5 white square)
  │       └── spark.png (2x8 red line)
```

### Vietnamese Text Constants

```javascript
const MESSAGES = {
  menu: {
    title: 'Trò Chơi Đố Vui',
    subtitle: 'Quiz Battle Arena',
    play: 'CHƠI NGAY',
    howToPlay: 'Hướng dẫn',
    settings: 'Cài đặt'
  },
  instructions: {
    title: 'Cách chơi',
    steps: [
      'Đọc câu hỏi ở trên màn hình',
      'Nhấp vào robot có câu trả lời đúng',
      'Bạn có 5 trái tim ❤️❤️❤️❤️❤️',
      'Trả lời sai mất 1 trái tim 💔',
      'Trả lời đúng được điểm +100',
      'Trả lời sai vẫn học được +25'
    ],
    start: 'Bắt đầu',
    close: 'Đóng'
  },
  settings: {
    title: 'Cài đặt',
    sound: 'Âm thanh',
    on: 'Bật',
    off: 'Tắt',
    comingSoon: '(Sắp có)'
  },
  explanation: {
    continue: 'Tiếp tục'
  }
};
```

### Color Constants (Complete Palette)

```javascript
const COLORS = {
  primary: '#4ECDC4',      // Bright blue (main theme)
  coral: '#FF6B6B',        // Coral red (health, errors)
  mint: '#95E1D3',         // Mint green (positive)
  yellow: '#FFD93D',       // Yellow (celebration, learning)
  darkGray: '#333333',     // Text color
  mediumGray: '#666666',   // Label color
  lightGray: '#F7F7F7',    // Background
  white: '#FFFFFF',        // Containers
  black: '#000000'         // Overlays
};
```

---

## 14. Design Approval

**GD Approval**: ✅ Ready for implementation

**Confidence Level**: HIGH
- Main menu follows best practices (progressive disclosure)
- HUD polish creates visual consistency
- Sound effects age-appropriate and encouraging
- Visual effects add polish without complexity
- All design research-backed

**Expected Player Experience (Complete M1)**:
1. See welcoming main menu
2. Understand how to play (optional instructions)
3. Click "Play Now" - game starts smoothly
4. Play with audio/visual feedback
5. Hear encouraging sounds
6. See satisfying particle effects
7. Complete game with milestone celebrations
8. See professional game over screen
9. Easily restart or return to menu
10. Feel motivated to improve

**M1 MVP Complete After Sprint 3**:
- ✅ Playable game (Sprint 1+2A+2B)
- ✅ Professional UI/UX (Sprint 3)
- ✅ Audio feedback (Sprint 3)
- ✅ Visual polish (Sprint 3)
- ✅ Ready for user testing

**Next Steps**:
1. FE implements Sprint 3 features
2. Test main menu and navigation
3. Test audio effects with children (age-appropriate?)
4. Test visual effects (not overwhelming?)
5. CR reviews complete M1 (Sprint 1+2+3)
6. User testing with 8-12 year-olds
7. Iterate based on feedback
8. Then proceed to M2 (Phase 2: Polish & Enhancements)

---

**Document Status**: ✅ Complete - Ready for Implementation
**Previous Sprints**: Sprint 1 ✅, Sprint 2A ✅, Sprint 2B ✅
**Next Phase**: M2 - Polish & Enhancements (Sprints 4-6)

---

**Game Designer**: GD
**Date**: December 17, 2025
**Version**: 1.0
**Time**: ~2.5 hours design work
