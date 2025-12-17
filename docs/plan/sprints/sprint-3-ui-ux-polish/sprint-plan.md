# Sprint 3: UI/UX & Polish
**Quiz Battle Arena - Educational Quiz Game**

**PM**: Project Manager
**Date Created**: 2025-12-17
**Sprint Status**: 🟡 Ready to Start
**Assigned To**: FE (Frontend Developer)

---

## Sprint Overview

**Sprint Number**: Sprint 3
**Sprint Name**: UI/UX & Polish
**Sprint Goal**: Complete playable experience with menu navigation, audio feedback, and professional UI polish

**Milestone Alignment**: M1 - Core MVP (Final Sprint - completes M1!)
**Previous Sprint**: Sprint 2B (Polish - Game Over & Celebrations) ✅
**Next Milestone**: M2 - Polish & Enhancements (MCP Asset Integration)

---

## Sprint Goal (1-2 Sentences)

Transform the functional game (Sprint 1+2A+2B) into a **complete, polished experience** ready for user testing by adding main menu navigation, audio feedback, particle effects, and consistent HUD styling.

---

## Deliverables

### 1. Main Menu Screen (FR-009)

**Outcome**: Professional main menu with navigation

**Requirements**:
- **MenuScene** (new Phaser scene)
- **UI Elements**:
  - Game title: "Trò Chơi Đố Vui" (Vietnamese) + "Quiz Battle Arena" (English subtitle)
  - Robot icon 🤖 (96px) with gentle bob animation
  - "CHƠI NGAY" button (280×80px, primary CTA, bright blue)
  - "Hướng dẫn" button (160×60px, secondary, white with blue border)
  - "Cài đặt" button (160×60px, secondary, white with yellow border)
- **Overlays**:
  - Instructions overlay (600×500px modal, 6 Vietnamese instructions)
  - Settings overlay (400×300px modal, sound toggle)
- **Animations**:
  - Entry animation (title slides, robot bounces, buttons fade in)
  - Button hover/click effects
  - Smooth scene transitions (Menu ↔ Game)
- **Background**: Solid color `#F7F9FC` (light blue-gray)

**Files**:
- NEW: `src/scenes/MenuScene.js` - Main menu scene
- MODIFY: `src/main.js` - Register MenuScene, set as initial scene
- NEW: `src/components/InstructionsOverlay.js` (optional - can be in MenuScene)
- NEW: `src/components/SettingsOverlay.js` (optional - can be in MenuScene)

### 2. HUD (Heads-Up Display) Polish (FR-010)

**Outcome**: Consistent, professional HUD styling

**Requirements** (enhance existing elements from Sprint 1+2A):
- **Score Display** (top-left):
  - Container: White background with blue border, rounded corners, shadow
  - Icon: ⭐ star before score number
  - Animation: Twinkle on score increase
- **Health Display** (top-right):
  - Container: White background with red border, rounded corners, shadow
  - Hearts: 5 hearts (❤️ full, 💔 broken)
  - Enhancement: Particle burst on heart break
- **Question Display** (top-center):
  - Container: White background with blue border, rounded corners, shadow
  - Icon: ❓ question mark at left
  - Consistent styling with other HUD elements

**Files**:
- MODIFY: `src/scenes/GameScene.js` - Update HUD containers styling
- MODIFY: `src/components/HealthDisplay.js` (if exists) - Add particle effect
- MAY CREATE: `src/components/HUDContainer.js` - Reusable styled container

### 3. Sound Effects (FR-003)

**Outcome**: Age-appropriate audio feedback for all game actions

**Requirements**:
- **AudioManager class** (manage sound state, localStorage)
- **Sound Files** (8 audio files):
  1. `correct.mp3` - Cheerful chime (0.5-0.8s, high pitch, volume 0.7)
  2. `wrong.mp3` - Friendly boop (0.3-0.5s, medium pitch, volume 0.5)
  3. `milestone_5.mp3` - Short celebration (2-note, C→E)
  4. `milestone_10.mp3` - Medium celebration (3-note, C→E→G)
  5. `milestone_15.mp3` - Longer celebration (4-note, C→E→G→C)
  6. `gameover_victory.mp3` - Triumphant fanfare (2.0s, volume 0.7)
  7. `gameover_defeat.mp3` - Supportive try-again (1.0s, volume 0.5)
  8. `button_click.mp3` - Soft click (0.1-0.2s, volume 0.4)
- **Sound Integration**:
  - Play appropriate sound for each action
  - Settings overlay: Sound on/off toggle
  - LocalStorage: Save sound preference
  - Default: Sound enabled

**Critical**: All sounds encouraging, NOT punishing
- Wrong answer: Friendly "boop", NOT harsh buzzer
- Defeat: Supportive "try again", NOT sad descending scale

**Audio Sources**:
- Free: Freesound.org (CC0), Zapsplat.com, Bfxr.net (retro generator)
- Paid: AudioJungle.net ($1-5 per sound)

**Files**:
- NEW: `src/utils/AudioManager.js` - Sound management class
- NEW: `src/assets/audio/` folder with 8 MP3 files
- MODIFY: `src/scenes/MenuScene.js` - Preload/create sounds
- MODIFY: `src/scenes/GameScene.js` - Play sounds on actions
- MODIFY: `src/scenes/GameOverScene.js` - Play victory/defeat sounds

### 4. Visual Feedback Enhancements

**Outcome**: Satisfying particle effects for all game actions

**Requirements**:
- **Correct Answer Confetti**:
  - 15-25 small rectangles (5×5px)
  - Colors: Blue, yellow, green mix
  - Radial burst from target
  - Duration: 1.5s, with gravity and rotation
  - Screen flash: Blue tint (0.15s)
- **Wrong Answer Sparks**:
  - 8-12 small lines (2×8px)
  - Colors: Coral red to dark red
  - Fast burst, quick dissipate
  - Duration: 0.5s
  - Target shake: 3 vibrations
- **Health Loss Particles**:
  - 5-8 tiny red particles from breaking heart
  - Duration: 0.3s
  - Subtle screen shake (2px horizontal, 0.2s)
- **Milestone Confetti** (enhanced from Sprint 2B):
  - 30-50 confetti particles
  - Full color palette
  - Fall from top of modal
  - Duration: 2.0s
  - White background flash (0.2s)
- **Explanation Text**:
  - Container: White with yellow border (learning theme)
  - Light bulb icon 💡 (32px) at left
  - Slide up animation (0.3s), stay 3s, fade out (0.3s)
  - Skip: Click anywhere or "Tiếp tục" button

**Files**:
- NEW or MODIFY: `src/utils/ParticleEffects.js` - Particle emitter configurations
- MODIFY: `src/scenes/GameScene.js` - Trigger particles on actions
- NEW: Create 5×5px white square particle image
- NEW: Create 2×8px red line particle image

### 5. Unit Tests (TDD Approach)

**Outcome**: 2+ new unit tests for Sprint 3 logic

**Requirements**:
- Test 11: Sound toggle functionality
- Test 12: LocalStorage sound preference (save/load)
- All previous tests still passing (39 tests from Sprint 1+2A+2B)
- Total expected: 41+ tests passing

**Files**:
- NEW or MODIFY: `tests/audioManager.test.js` - Sound management tests

---

## Success Criteria

Sprint 3 is **COMPLETE** when all of the following are verified:

### Functional ✅
- [ ] Main menu displays correctly on game load
- [ ] "CHƠI NGAY" button starts game (MenuScene → GameScene)
- [ ] "Hướng dẫn" opens instructions overlay with 6 Vietnamese instructions
- [ ] "Cài đặt" opens settings overlay with sound toggle
- [ ] Instructions "Start" button starts game
- [ ] Settings sound toggle works (on/off)
- [ ] All 8 sound effects play correctly:
  - [ ] Correct answer: Cheerful chime
  - [ ] Wrong answer: Friendly boop
  - [ ] Milestones (5, 10, 15): Celebration sounds
  - [ ] Game over (victory/defeat): Appropriate sounds
  - [ ] Button click: Soft click
- [ ] Sound toggle mutes/unmutes all sounds
- [ ] Sound preference persists (LocalStorage)
- [ ] All particle effects work:
  - [ ] Correct answer confetti explodes
  - [ ] Wrong answer sparks appear
  - [ ] Health loss particles burst
  - [ ] Milestone confetti enhanced
- [ ] Explanation text displays with slide animation

### Visual ✅
- [ ] Main menu looks professional (clean, age-appropriate)
- [ ] HUD has consistent styling (score, health, question all match)
- [ ] Containers have shadows, borders, rounded corners
- [ ] Icons display correctly (⭐, ❤️, ❓, 💡)
- [ ] Confetti and spark particles look good (not laggy)
- [ ] Scene transitions smooth (no flickering or jumping)
- [ ] Vietnamese text displays correctly throughout
- [ ] Button hover effects work
- [ ] Robot icon bobs gently

### Child-Friendly ✅
- [ ] All sounds encouraging, not punishing or scary
- [ ] Wrong answer sound supportive (friendly boop, NOT harsh buzzer)
- [ ] Defeat sound encouraging (try again, NOT sad music)
- [ ] Visual effects exciting but not overwhelming
- [ ] Large buttons easy to click (280×80px primary, 160×60px secondary)
- [ ] Instructions clear and understandable for ages 8-12
- [ ] Progressive disclosure (Play button most prominent)

### Technical ✅
- [ ] 41+ unit tests passing (39 previous + 2 new minimum)
- [ ] No console errors during testing
- [ ] Performance good (60 FPS with particles)
- [ ] LocalStorage saves/loads correctly
- [ ] MenuScene registered correctly in main.js
- [ ] All Sprint 1+2A+2B features still work
- [ ] Audio files load correctly
- [ ] Particle images load correctly

### Polish ✅
- [ ] Game feels complete and professional
- [ ] UI consistent across all screens (Menu, Game, GameOver)
- [ ] Animations smooth and satisfying
- [ ] Ready for user testing (M1 complete!)
- [ ] Subject-agnostic design maintained

---

## Definition of Done

Sprint 3 is **DONE** when:

1. **All deliverables complete** (MenuScene, HUD polish, sounds, particles, tests)
2. **All success criteria verified** (functional, visual, child-friendly, technical, polish)
3. **Manual testing passed**:
   - Play through full game session from menu to game over to menu
   - Test all sounds with toggle on/off
   - Verify all particle effects work
   - Check HUD styling consistency
   - Test instructions and settings overlays
   - Verify Vietnamese text throughout
4. **Tests passing**: 41+ unit tests (100% pass rate)
5. **No console errors**: Clean browser console during testing
6. **Git commits**: Progressive commits showing TDD approach
7. **FE reports completion** to PM with commit hashes
8. **CR approval**: Code review passed with no critical issues

---

## Estimated Duration

**Estimated Time**: 4-6 hours

**Breakdown** (time-boxed per component):
- MenuScene implementation: 1.5-2 hours
- HUD polish: 30-45 minutes
- Audio integration: 1-1.5 hours (includes finding/testing sounds)
- Particle effects: 1-1.5 hours
- Unit tests (TDD approach): 30 minutes
- Manual testing and polish: 30-45 minutes

**Based On**: Sprint 2A completed in ~1 hour, Sprint 2B in ~1 hour

**Time-Boxing Critical**: Use memory pattern - 2-4 hours MAX per component to prevent endless polish

---

## Design Reference

**Full Design Document**: `docs/plan/sprints/sprint-3-ui-ux-polish/design.md` (1,232 lines)

**Key Design Sections**:
1. Main Menu Screen (FR-009) - Lines 48-201
   - Layout, buttons, overlays, animations
2. Instructions Overlay (FR-011) - Lines 204-267
   - 6 Vietnamese instructions, visual diagram
3. HUD Polish (FR-010) - Lines 270-397
   - Score, health, question display consistency
4. Sound Effects (FR-003) - Lines 400-523
   - 8 sound files with specifications
5. Visual Feedback - Lines 526-668
   - Confetti, sparks, particles, explanation text
6. Settings Overlay - Lines 670-723
   - Sound toggle, LocalStorage
7. Technical Specifications - Lines 755-878
   - Scene management, AudioManager class, particle system code

**Research Foundation**:
- Progressive disclosure (4-6 elements max, memory pattern)
- Visual variety (mix animations, sounds, visual cues)
- Age-appropriate design (8-12 years, large buttons, simple language)
- Child psychology (encouraging sounds, NOT punishing)

---

## Technical Notes

### Scene Flow

```
MenuScene (NEW - Sprint 3)
  ├─→ "CHƠI NGAY" → GameScene
  ├─→ "Hướng dẫn" → Instructions overlay (same scene)
  └─→ "Cài đặt" → Settings overlay (same scene)

GameScene (Sprint 1+2A+2B, enhanced Sprint 3)
  └─→ Game over → GameOverScene

GameOverScene (Sprint 2B, enhanced Sprint 3)
  ├─→ "Chơi lại" → GameScene (restart)
  └─→ "Menu chính" → MenuScene (NEW in Sprint 3)
```

### File Structure Changes

```
src/
  ├── scenes/
  │   ├── MenuScene.js           # NEW - Sprint 3
  │   ├── GameScene.js           # MODIFY: HUD polish, sounds, particles
  │   └── GameOverScene.js       # MODIFY: Victory/defeat sounds
  ├── components/
  │   ├── HealthDisplay.js       # MODIFY: Particle burst on heart break
  │   ├── (InstructionsOverlay.js)  # OPTIONAL: Can be in MenuScene
  │   └── (SettingsOverlay.js)      # OPTIONAL: Can be in MenuScene
  ├── utils/
  │   ├── AudioManager.js        # NEW: Sound management
  │   ├── ParticleEffects.js     # NEW: Particle configurations
  │   ├── Milestones.js          # Sprint 2B (no changes)
  │   └── GameStats.js           # Sprint 2B (no changes)
  ├── assets/
  │   ├── audio/                 # NEW folder
  │   │   ├── correct.mp3
  │   │   ├── wrong.mp3
  │   │   ├── milestone_5.mp3
  │   │   ├── milestone_10.mp3
  │   │   ├── milestone_15.mp3
  │   │   ├── gameover_victory.mp3
  │   │   ├── gameover_defeat.mp3
  │   │   └── button_click.mp3
  │   └── images/
  │       ├── particle.png       # NEW: 5×5 white square
  │       └── spark.png          # NEW: 2×8 red line
  └── tests/
      └── audioManager.test.js   # NEW: Sound toggle tests
```

### Vietnamese Text Constants (Reference)

```javascript
const MENU_TEXT = {
  title: {
    main: "Trò Chơi Đố Vui",
    subtitle: "Quiz Battle Arena"
  },
  buttons: {
    play: "CHƠI NGAY",
    instructions: "Hướng dẫn",
    settings: "Cài đặt",
    start: "Bắt đầu",
    continue: "Tiếp tục"
  },
  instructions: [
    "Đọc câu hỏi ở trên màn hình",
    "Nhấp vào robot có câu trả lời đúng",
    "Bạn có 5 trái tim ❤️❤️❤️❤️❤️",
    "Trả lời sai mất 1 trái tim 💔",
    "Trả lời đúng được điểm +100",
    "Trả lời sai vẫn học được +25"
  ],
  settings: {
    title: "Cài đặt",
    sound: "Âm thanh",
    on: "Bật",
    off: "Tắt"
  }
};
```

### AudioManager Class (Reference)

```javascript
class AudioManager {
  constructor(scene) {
    this.scene = scene;
    this.sounds = {};
    this.enabled = true;
    this.loadSoundPreference();
  }

  preload() {
    // Load all 8 audio files
    this.scene.load.audio('correct', 'assets/audio/correct.mp3');
    this.scene.load.audio('wrong', 'assets/audio/wrong.mp3');
    // ... etc
  }

  create() {
    // Create sound objects
    this.sounds.correct = this.scene.sound.add('correct');
    // ... etc
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

---

## Dependencies

**Requires (Must be complete before starting)**:
- ✅ Sprint 1 complete (core mechanics)
- ✅ Sprint 2A complete (game loop, health system)
- ✅ Sprint 2B complete (game over, milestones)
- ✅ 39 tests passing from Sprint 1+2A+2B
- ✅ GameScene properly manages game state

**Provides (Enables future work)**:
- Complete M1 MVP (playable game ready for user testing)
- Foundation for M2 (custom sprites, background music, volume sliders)
- Professional UI baseline for advanced features
- Audio system ready for expansion

---

## Deferred to Future Sprints/Milestones

**M2** (Phase 2: Polish & Enhancements):
- Background music (menu, gameplay)
- Volume sliders (master, music, SFX separate)
- Custom robot sprites (replacing colored rectangles)
- Professional heart sprites
- Animated backgrounds
- Enhanced particle effects

**M3** (Advanced Features):
- Settings in-game (pause menu)
- Statistics screen
- Achievement system
- Subject selection
- Enhanced milestone celebrations

---

## Testing Checklist (Manual)

**Main Menu**:
- [ ] Menu displays on game load
- [ ] Game title: "Trò Chơi Đố Vui" + "Quiz Battle Arena" subtitle
- [ ] Robot icon 🤖 bobs gently
- [ ] "CHƠI NGAY" button largest, bright blue
- [ ] "Hướng dẫn" button white with blue border
- [ ] "Cài đặt" button white with yellow border
- [ ] Button hover effects (scale, color change)
- [ ] Click "CHƠI NGAY" → starts game
- [ ] Background solid color light blue-gray
- [ ] Entry animation smooth (title slides, robot bounces)

**Instructions Overlay**:
- [ ] Opens from "Hướng dẫn" button
- [ ] Modal 600×500px, centered
- [ ] 6 instructions in Vietnamese
- [ ] Light bulb icon in instructions
- [ ] "Bắt đầu" button starts game
- [ ] Close button (X) returns to menu
- [ ] Click outside closes overlay
- [ ] Vietnamese text clear and readable

**Settings Overlay**:
- [ ] Opens from "Cài đặt" button
- [ ] Modal 400×300px, centered
- [ ] "Âm thanh" label with toggle
- [ ] "Bật" (On) button works
- [ ] "Tắt" (Off) button works
- [ ] Active state highlighted (blue)
- [ ] Preference saves to LocalStorage
- [ ] Close button works
- [ ] Vietnamese text correct

**HUD Polish**:
- [ ] Score container: White background, blue border, shadow
- [ ] Star icon ⭐ before score
- [ ] Health container: White background, red border, shadow
- [ ] Hearts: 5 full, broken on health loss
- [ ] Question container: White background, blue border, shadow
- [ ] Question mark icon ❓ at left
- [ ] All containers match styling (consistent)

**Sound Effects**:
- [ ] Correct answer: Cheerful chime (NOT harsh)
- [ ] Wrong answer: Friendly boop (NOT buzzer)
- [ ] Milestone 5: Short celebration (2-note)
- [ ] Milestone 10: Medium celebration (3-note)
- [ ] Milestone 15: Longer celebration (4-note)
- [ ] Game over victory: Triumphant fanfare
- [ ] Game over defeat: Supportive try-again (NOT sad)
- [ ] Button click: Soft click
- [ ] Sound toggle mutes all sounds
- [ ] Volume levels appropriate (not too loud)
- [ ] Sounds are encouraging, child-friendly

**Visual Effects**:
- [ ] Correct answer confetti explodes (15-25 particles)
- [ ] Confetti: Blue, yellow, green mix
- [ ] Confetti: Radial burst, gravity, rotation
- [ ] Screen flash on correct (blue tint, brief)
- [ ] Wrong answer sparks (8-12 red lines)
- [ ] Sparks: Fast burst, quick dissipate
- [ ] Target shake on wrong (3 vibrations)
- [ ] Health loss particles (5-8 red particles)
- [ ] Milestone confetti enhanced (30-50 particles)
- [ ] Explanation text slides up
- [ ] Light bulb icon 💡 in explanation
- [ ] Explanation stays 3s, fades out
- [ ] Click to skip explanation works

**Scene Transitions**:
- [ ] Menu → Game smooth (0.5s fade)
- [ ] Game → GameOver smooth
- [ ] GameOver → Menu smooth ("Menu chính" button)
- [ ] GameOver → Game smooth ("Chơi lại" button)
- [ ] No flickering or jumping
- [ ] All transitions professional

**Integration**:
- [ ] All Sprint 1 features work (questions, targets, scoring)
- [ ] All Sprint 2A features work (health, progression)
- [ ] All Sprint 2B features work (game over, milestones)
- [ ] Sound plays during gameplay
- [ ] Particles don't cause lag
- [ ] Settings persist across sessions
- [ ] No console errors

**Performance**:
- [ ] Game runs at 60 FPS
- [ ] Particles don't slow down game
- [ ] Audio loads without delay
- [ ] Scene transitions smooth
- [ ] No memory leaks (test long sessions)

---

## TDD Reminder (CRITICAL)

**FE MUST follow TDD approach**:

1. **Write tests FIRST** - Before writing any implementation code
2. **Run tests** - Verify they fail (red)
3. **Write minimal code** - Make tests pass (green)
4. **Refactor** - Improve code while keeping tests passing
5. **Repeat** - For each new feature/fix

**Example TDD Workflow for AudioManager**:
```bash
# 1. Write test first
# Edit: tests/audioManager.test.js
# Add test: "should toggle sound on and off"

# 2. Run test - should FAIL (red)
npm test

# 3. Write minimal implementation
# Edit: src/utils/AudioManager.js
# Add toggle() method

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
- ✅ After MenuScene implementation
- ✅ After HUD polish complete
- ✅ After audio integration (with sound files found/tested)
- ✅ After particle effects working
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
tm-send %12 "FE [15:30]: MenuScene COMPLETE.
- Feature: Main menu with Play/Instructions/Settings, Vietnamese text
- Tests: 40/40 passing (1 new test for sound toggle)
- Commits: abc123, def456
- Next: Implementing HUD polish"
```

---

## Time-Boxing Reminders (from Memory Patterns)

**Critical Constraint**: Prevent "polish drift" where iterations never end

**Time Boxes**:
- MenuScene: 2 hours MAX
- HUD polish: 45 minutes MAX
- Audio integration: 1.5 hours MAX
- Particle effects: 1.5 hours MAX
- Tests: 30 minutes MAX
- Manual testing: 45 minutes MAX

**Red Flags**:
- Spending >2 hours on single component
- Adding features not in design.md
- Refactoring existing Sprint 1+2A+2B code unnecessarily

**If Time Box Exceeded**:
- STOP and review with PM
- Document what works, what doesn't
- Add remaining polish to backlog
- Graduate learnings, move forward

**Remember**: "Productivity ≠ Progress" - can polish forever without shipping

---

## Sprint Completion Report (Template for FE)

When Sprint 3 is complete, FE should send this summary to PM:

```
FE [HH:mm]: Sprint 3 COMPLETE ✅

**Deliverables**:
✅ Main menu screen (MenuScene, overlays, animations)
✅ HUD polish (consistent styling, icons, shadows)
✅ Sound effects (8 audio files, AudioManager, toggle)
✅ Visual feedback (confetti, sparks, particles, enhanced)
✅ Unit tests (41+ passing)

**Tests**: 41/41 passing (TDD approach followed)
**Manual Testing**: All checklist items verified
**Commits**: [list 4-6 key commit hashes]
**Audio Files**: 8 MP3s found and integrated (cheerful, supportive tones)
**Performance**: 60 FPS with all particles
**No Console Errors**: Clean browser console
**Vietnamese Text**: All UI elements localized

**Ready for CR review**
```

---

## References

- **Design Specification**: `docs/plan/sprints/sprint-3-ui-ux-polish/design.md` (1,232 lines)
- **Game Research**: `docs/research/research-game-research.md` (child psychology, gamification)
- **Main Milestones**: `docs/plan/main-milestones.md` (M1 → 80% after Sprint 3)
- **Sprint 2B Review**: `docs/plan/sprints/sprint-2b-polish/review.md` (good example)
- **README**: TDD section for development workflow
- **Memory Patterns**: Progressive disclosure, time-boxing, integration testing

---

## Notes

- Sprint 3 completes M1 Core MVP (80% → 100% after CR approval and merge)
- Subject-agnostic design maintained (no history/math/literature-specific graphics)
- Age-appropriate for 8-12 years (large buttons, simple language, encouraging sounds)
- Progressive disclosure (Play button 2x larger than secondary buttons)
- Time-boxing critical (prevent endless polish iterations)
- Audio: Cheerful and supportive, NOT punishing or scary
- Ready for user testing after Sprint 3 merge

---

**Created By**: PM (Project Manager)
**Date**: 2025-12-17
**Sprint Status**: 🟡 Ready to Start
**Next Action**: PM assigns to FE via tm-send
