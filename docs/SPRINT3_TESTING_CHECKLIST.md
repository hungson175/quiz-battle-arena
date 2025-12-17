# Sprint 3 Manual Testing Checklist

## Setup
- [x] Dev server running at http://localhost:3336
- [x] All 44 tests passing
- [x] All Sprint 3 code committed (commits: 022c27d, eb6ea26, a67e64f, c6a36bf, 6c597fa, 2053d0d, a355c8b)

## Test Environment
- Browser: Chrome/Firefox/Safari
- URL: http://localhost:3336
- Sound: Enable/disable to test both states

---

## 1. Menu Scene Testing

### Initial Load
- [ ] Page loads without console errors
- [ ] Menu scene appears with Vietnamese title "Trò Chơi Đố Vui"
- [ ] English subtitle "Quiz Battle Arena" visible
- [ ] Robot icon 🤖 visible and bobbing animation smooth

### Menu Buttons
- [ ] "CHƠI NGAY" button is largest (280×80px)
- [ ] "Hướng dẫn" button visible (160×60px, blue)
- [ ] "Cài đặt" button visible (160×60px, yellow)
- [ ] All buttons have hover effects (scale + color change)
- [ ] All buttons show cursor pointer on hover

### Entrance Animations
- [ ] Menu elements fade in sequentially
- [ ] Title appears first
- [ ] Robot icon bounces in
- [ ] Buttons stagger in order

---

## 2. Instructions Modal Testing

### Opening Instructions
- [ ] Click "Hướng dẫn" button
- [ ] Semi-transparent dark overlay appears
- [ ] White modal box (600×500px) appears with blue border
- [ ] Modal title "Hướng dẫn chơi" visible

### Instructions Content
- [ ] All 6 Vietnamese instructions visible and readable
- [ ] Instructions numbered 1-6
- [ ] Text properly wrapped within modal

### Modal Buttons
- [ ] "Bắt đầu" button (green) visible at bottom left
- [ ] "Đóng" button (red) visible at bottom right
- [ ] Both buttons have hover effects

### Navigation
- [ ] Click "Bắt đầu" → Game starts (transitions to GameScene)
- [ ] Click "Đóng" → Returns to menu (modal closes)
- [ ] Click overlay background → Modal closes

---

## 3. Settings Modal Testing

### Opening Settings
- [ ] Click "Cài đặt" button from menu
- [ ] Semi-transparent dark overlay appears
- [ ] White modal box (400×300px) appears with yellow border
- [ ] Modal title "Cài đặt" visible

### Sound Toggle
- [ ] "Âm thanh" label visible
- [ ] Two toggle buttons: "Bật" and "Tắt"
- [ ] Default state: "Bật" highlighted (blue background)
- [ ] Click "Tắt" → button turns blue, "Bật" turns gray
- [ ] Click "Bật" → button turns blue, "Tắt" turns gray
- [ ] Toggle state persists (refresh page and check)

### LocalStorage Verification
- [ ] Open DevTools → Application → LocalStorage
- [ ] Key: `quizBattleArena_soundEnabled`
- [ ] Value: `"true"` when enabled, `"false"` when disabled
- [ ] Value persists across page refreshes

### Navigation
- [ ] Click "Đóng" button → Returns to menu
- [ ] Click overlay → Returns to menu

---

## 4. Game Scene Testing

### Game Start
- [ ] Click "CHƠI NGAY" from menu
- [ ] Game scene loads without errors
- [ ] Fade transition from menu to game

### HUD Polish (Sprint 3)
**Score Display**:
- [ ] ⭐ Star icon visible next to score
- [ ] White container with blue border (180×70px)
- [ ] "Điểm số:" label visible
- [ ] Score number starts at 0
- [ ] Score animation on update (scale pulse + twinkle)

**Question Display**:
- [ ] ❓ Question mark icon visible
- [ ] White container with blue border (700×80px)
- [ ] Question text properly wrapped
- [ ] Vietnamese questions load correctly

**Health Display**:
- [ ] 5 hearts visible at top right
- [ ] Red hearts (❤️) for remaining health
- [ ] Gray hearts (🖤) for lost health

**Timer**:
- [ ] Timer visible and counting down
- [ ] Color changes (green → yellow → red)

---

## 5. Visual Feedback Testing (Sprint 3)

### Correct Answer Feedback
- [ ] Click correct answer target
- [ ] **Screen flash** appears (blue tint, 150ms)
- [ ] **Confetti particles** burst from target (15-25 particles)
  - [ ] Mix of emojis (🎉⭐✨🎊💫) and colored squares
  - [ ] Particles radiate outward
  - [ ] Colors: Blue, yellow, green
  - [ ] Particles fade and disappear (~1.5s)
- [ ] Target spins 360° and scales to 1.2
- [ ] Floating "+100" text appears in teal
- [ ] Success message appears (Vietnamese, randomized)
- [ ] Score updates with animation (star twinkles)

### Wrong Answer Feedback
- [ ] Click wrong answer target
- [ ] **Screen shake** occurs (subtle, 2px, 200ms)
- [ ] **Spark particles** burst from target (8-12 particles)
  - [ ] Mix of emojis (💥⚡✖️) and red lines
  - [ ] Particles burst quickly
  - [ ] Coral/red colors
  - [ ] Particles fade fast (~0.5s)
- [ ] Target shakes horizontally (±8px)
- [ ] Floating "+25 Học tập" text appears in yellow
- [ ] Supportive message appears (Vietnamese)
- [ ] Correct answer highlights (green border, scales 1.05)
- [ ] Heart lost (red → gray animation)
- [ ] Explanation appears at bottom

---

## 6. Audio Testing (Placeholder)

**Note**: Current audio files are simple sine wave placeholders. Test that audio SYSTEM works, not audio quality.

### Audio Playback
- [ ] Open Settings → Enable sound ("Bật")
- [ ] Play game with sound enabled
- [ ] Correct answer → hear tone (~800Hz, 0.5s)
- [ ] Wrong answer → hear tone (~400Hz, 0.3s)
- [ ] Milestone 5 → hear tone (~600Hz, 1.0s)
- [ ] Milestone 10 → hear tone (~700Hz, 1.5s)
- [ ] Milestone 15 → hear tone (~750Hz, 2.0s)
- [ ] Button clicks → hear short blip (~1000Hz, 0.1s)

### Sound Toggle
- [ ] Disable sound in Settings ("Tắt")
- [ ] Play game with sound disabled
- [ ] No audio plays for any action
- [ ] Visual feedback still works (confetti, sparks, animations)
- [ ] Re-enable sound → audio returns

### Volume
- [ ] Audio not too loud (default 0.7 for most, 0.4 for clicks)
- [ ] No audio clipping or distortion
- [ ] No overlapping audio issues

---

## 7. Milestone Celebrations

### Milestone 5 (5 questions answered)
- [ ] Answer 5 questions
- [ ] Modal overlay appears
- [ ] "Đang tiến bộ! 🎯" message
- [ ] Progress bar shows 5/15
- [ ] Animated entrance (zoom + fade)
- [ ] Auto-dismisses after 2.5s OR click to skip
- [ ] Milestone audio plays (if sound enabled)

### Milestone 10 (10 questions answered)
- [ ] Answer 10 questions
- [ ] Modal overlay appears
- [ ] "Xuất sắc! 🏆" message
- [ ] Progress bar shows 10/15
- [ ] Auto-dismisses after 2.5s OR click to skip
- [ ] Milestone audio plays (if sound enabled)

### Milestone 15 (All questions answered - Victory)
- [ ] Answer all 15 questions (with health > 0)
- [ ] **Victory confetti** (GameOverScene bonus)
- [ ] "Hoàn thành! ⭐" message
- [ ] Progress bar shows 15/15
- [ ] Transitions to GameOverScene (victory state)

---

## 8. Game Over Scene Testing

### Victory State
**Trigger**: Answer all 15 questions with health remaining
- [ ] Screen transitions to GameOverScene
- [ ] Semi-transparent dark overlay
- [ ] White modal with **teal border** (500×400px)
- [ ] Title: "Hoàn thành! Xuất sắc!" (teal color)
- [ ] Final score displayed large (48px)
- [ ] Stats section shows:
  - [ ] Correct: X / 15 (teal)
  - [ ] Wrong: Y / 15 (coral)
  - [ ] Accuracy: Z% (color coded: green/yellow/coral)
- [ ] **Sparkle effect** around score (6 ✨ in circle)
- [ ] Victory audio plays (if sound enabled, ~900Hz, 3s)
- [ ] "Chơi lại" button (green, 180×60px)
- [ ] "Menu chính" button (white border, 180×60px)
- [ ] Staggered animations (modal → title → score → stats → buttons)

### Defeat State
**Trigger**: Health reaches 0
- [ ] Screen transitions to GameOverScene
- [ ] Semi-transparent dark overlay
- [ ] White modal with **coral border** (500×400px)
- [ ] Title: "Hết cơ hội! Thử lại nhé!" (coral color)
- [ ] Final score displayed
- [ ] Stats section shows correct/wrong/accuracy
- [ ] NO sparkle effect
- [ ] Defeat audio plays (if sound enabled, ~500Hz, 2s)
- [ ] "Chơi lại" button visible
- [ ] "Menu chính" button visible

### Navigation from Game Over
- [ ] Click "Chơi lại" → New game starts (GameScene resets)
- [ ] Click "Menu chính" → Returns to MenuScene with fade
- [ ] All states reset properly on restart

---

## 9. Complete Game Flow Test

### Full Victory Path
1. [ ] Menu → Instructions → Start
2. [ ] Answer questions correctly (aim for high accuracy)
3. [ ] Verify visual feedback on each answer
4. [ ] Reach milestone 5 → celebration
5. [ ] Reach milestone 10 → celebration
6. [ ] Answer all 15 correctly → Victory screen
7. [ ] Victory screen → Menu → Settings → Toggle sound
8. [ ] Play again with sound disabled
9. [ ] Verify visual feedback still works without audio

### Full Defeat Path
1. [ ] Menu → Play
2. [ ] Answer questions incorrectly (lose all 5 hearts)
3. [ ] Verify shake/spark effects on wrong answers
4. [ ] Verify heart depletion animation
5. [ ] Trigger defeat at health = 0
6. [ ] Defeat screen appears with supportive message
7. [ ] Click "Chơi lại"
8. [ ] Verify game resets properly

### Mixed Path (Realistic Play)
1. [ ] Menu → Play
2. [ ] Answer mix of correct/wrong questions
3. [ ] Verify different feedback types
4. [ ] Reach milestone 5 with some health lost
5. [ ] Continue to milestone 10
6. [ ] Finish all 15 questions with 1-2 hearts remaining
7. [ ] Victory screen with stats showing mixed accuracy
8. [ ] Return to menu → close browser
9. [ ] Reopen → verify sound preference persisted

---

## 10. Performance & Polish

### Performance
- [ ] No lag during animations
- [ ] Particle effects smooth (30-60 FPS)
- [ ] No memory leaks (particles destroyed after animation)
- [ ] Transitions smooth (fade, zoom, etc.)

### Visual Polish
- [ ] All text legible and properly sized
- [ ] Vietnamese characters render correctly
- [ ] No visual clipping or overflow
- [ ] Animations feel responsive and polished
- [ ] Color scheme consistent (teal, coral, mint, yellow)

### Browser Console
- [ ] Open DevTools → Console
- [ ] No red errors during gameplay
- [ ] No warnings about missing assets
- [ ] Audio files load without 404 errors

---

## 11. Regression Testing

### Sprint 1 Features (Still Working)
- [ ] Question display and shuffled answers
- [ ] Target click detection with grace area
- [ ] Score tracking (+100 correct, +25 wrong)
- [ ] Floating score animations

### Sprint 2A Features (Still Working)
- [ ] Health system (5 hearts, lose 1 per wrong answer)
- [ ] Game progression (15 questions total)
- [ ] Victory condition (all questions answered)
- [ ] Defeat condition (health = 0)
- [ ] Explanations on wrong answers

### Sprint 2B Features (Still Working)
- [ ] Milestone celebrations (5, 10, 15)
- [ ] GameOverScene with stats
- [ ] Accuracy calculation and color coding
- [ ] Victory vs defeat differentiation

---

## Known Issues / Expected Behavior

### Placeholder Audio
- ✅ **EXPECTED**: Audio is simple sine wave tones, not polished game sounds
- ✅ **EXPECTED**: Audio quality will improve in M2
- ✅ **GOAL**: Verify audio SYSTEM works (toggle, playback, LocalStorage)

### Visual Feedback
- ✅ Confetti may overlap with UI elements (intentional for celebration effect)
- ✅ Spark effect is quick and subtle (intentional for wrong answer feedback)

### Browser Compatibility
- ✅ Tested on: Chrome, Firefox, Safari (macOS)
- ✅ Mobile: Not optimized yet (M2 goal)

---

## Sign-Off Checklist

### Sprint 3 Deliverables
- [x] Main Menu Screen (MenuScene) ✅
- [x] Instructions Modal ✅
- [x] Settings Modal with Sound Toggle ✅
- [x] HUD Polish (icons, animations) ✅
- [x] Visual Feedback (confetti, sparks, camera effects) ✅
- [x] Audio System (AudioManager + 8 placeholder files) ✅
- [x] Unit Tests (5 new AudioManager tests, 44/44 total) ✅
- [x] Documentation (AUDIO_REQUIREMENTS.md) ✅

### Quality Gates
- [ ] All manual tests pass
- [ ] 44/44 automated tests pass
- [ ] No console errors
- [ ] Smooth performance
- [ ] Professional polish

### Ready for CR Review
- [ ] All commits on feature_sprint3_ui_ux_polish branch
- [ ] Commit messages clear and descriptive
- [ ] Code follows project conventions
- [ ] All tests passing
- [ ] Manual testing complete

---

## Testing Notes

**Date**: ___________
**Tester**: ___________
**Browser**: ___________
**Test Duration**: ___________

**Issues Found**:
1.
2.
3.

**Overall Assessment**:
- [ ] PASS - Ready for CR review
- [ ] PASS with minor issues - Document and proceed
- [ ] FAIL - Critical issues found, needs fixes

**Tester Signature**: ___________
