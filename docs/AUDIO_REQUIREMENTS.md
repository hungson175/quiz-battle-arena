# Audio Requirements for Sprint 3

## Overview
8 audio files needed for Quiz Battle Arena M1 MVP. All sounds must be **child-friendly** (ages 8-12) and **encouraging**, not punishing.

## Required Files

### 1. correct.mp3
- **Purpose**: Correct answer feedback
- **Style**: Cheerful, uplifting (coin pickup, success chime, happy bell)
- **Duration**: 0.5-1.5 seconds
- **Volume**: Medium-high
- **Examples**: Coin pickup, success jingle, cheerful chime

### 2. wrong.mp3
- **Purpose**: Wrong answer feedback
- **Style**: Friendly boop/boop, NOT harsh buzzer
- **Duration**: 0.3-0.8 seconds
- **Volume**: Medium-soft
- **IMPORTANT**: Must be supportive, not punishing (think "oops" not "fail")
- **Examples**: Soft boop, gentle blip, friendly "try again" sound

### 3. milestone_5.mp3
- **Purpose**: 5 questions completed celebration
- **Style**: Encouraging milestone achievement
- **Duration**: 1-2 seconds
- **Volume**: Medium
- **Examples**: Ascending notes, small fanfare, achievement unlock

### 4. milestone_10.mp3
- **Purpose**: 10 questions completed celebration
- **Style**: Bigger achievement than milestone_5
- **Duration**: 1.5-2.5 seconds
- **Volume**: Medium-high
- **Examples**: Bigger fanfare, level up sound, victory jingle

### 5. milestone_15.mp3
- **Purpose**: All 15 questions completed celebration
- **Style**: Victory/completion sound
- **Duration**: 2-3 seconds
- **Volume**: High
- **Examples**: Full victory fanfare, completion sound, triumph jingle

### 6. gameover_victory.mp3
- **Purpose**: Victory screen (all questions answered, health remaining)
- **Style**: Triumphant, celebratory music
- **Duration**: 3-5 seconds
- **Volume**: Medium-high
- **Examples**: Victory theme, success music, celebration tune

### 7. gameover_defeat.mp3
- **Purpose**: Defeat screen (health depleted)
- **Style**: Supportive "try again" music, NOT sad/punishing
- **Duration**: 2-4 seconds
- **Volume**: Medium
- **IMPORTANT**: Must encourage retry, not discourage (think "let's try again!" not "you failed")
- **Examples**: Gentle powerdown, supportive "next time", encouraging retry sound

### 8. button_click.mp3
- **Purpose**: UI button clicks (menu, settings, modals)
- **Style**: Clean, professional click/tap
- **Duration**: 0.1-0.3 seconds
- **Volume**: Low-medium
- **Examples**: UI click, button tap, menu select

## Technical Specifications

- **Format**: MP3
- **Sample Rate**: 44.1 kHz (standard)
- **Bit Rate**: 128-192 kbps
- **Channels**: Mono or Stereo
- **File Location**: `src/assets/audio/`
- **Naming**: Exact filenames as listed above (lowercase, underscores)

## Sourcing Options

### Browser-Based Generation (FASTEST - 20 min)
**Bfxr.net** (http://bfxr.net) - Browser-based sound generator
1. Open Bfxr in browser
2. Use presets and tweak:
   - `correct`: Pickup/Coin preset (high pitch)
   - `wrong`: Blip/Hit preset (medium pitch, soft)
   - `milestone_5/10/15`: Powerup preset (ascending variants)
   - `gameover_victory`: Fanfare preset
   - `gameover_defeat`: Powerdown preset (neutral tone)
   - `button_click`: Blip preset (very short)
3. Export each as MP3
4. Rename to match exact filenames

### Free Audio Libraries (30-45 min)
- **Freesound.org** - CC0/Creative Commons library
- **Mixkit.co** - Free game sound effects
- **Kenney.nl** - CC0 game asset packs (UI Audio, Digital Audio)
- **Pixabay.com** - Royalty-free sound effects

### Search Terms
- "game correct answer sound"
- "friendly boop sound effect"
- "victory fanfare game"
- "supportive try again sound"
- "UI button click sound"

## Child Psychology Guidelines

**DO**:
- Use cheerful, uplifting sounds
- Make feedback encouraging
- Use playful, friendly tones
- Create sense of achievement

**DON'T**:
- Use harsh buzzers or alarms
- Create anxiety with sounds
- Use sad or discouraging music
- Punish mistakes with harsh feedback

## Integration

Once audio files are sourced:
```bash
# Copy to assets directory
cp *.mp3 src/assets/audio/

# AudioManager will automatically load them
# No code changes needed - AudioManager already implemented
```

## Testing

```bash
npm run dev
# Open http://localhost:3336
# Test:
# 1. Menu button clicks
# 2. Correct answer sound + confetti
# 3. Wrong answer sound + sparks
# 4. Milestone celebrations (5, 10, 15)
# 5. Victory screen sound
# 6. Defeat screen sound
```

## License Requirement

All audio must be:
- CC0 (public domain), OR
- Creative Commons licensed, OR
- Royalty-free for commercial use

Document source/license in commit message.
