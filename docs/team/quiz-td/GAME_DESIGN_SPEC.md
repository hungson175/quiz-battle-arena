# Quiz Tower Defense - Game Design Specification

**Version:** 1.1 (SIMPLIFIED DESIGN)
**Author:** GD (Game Designer)
**Date:** 2025-12-30
**Status:** Boss Approved - Simplified Version

---

## DESIGN SUMMARY (v1.1)

| Aspect | Design |
|--------|--------|
| **Base Game** | Exact clone of `sample_codes/tower-defence/` |
| **Layout** | 70% Phaser (game) + 30% React (quiz panel) |
| **Gold Source** | Quizzes ONLY - enemies give NO gold |
| **Quiz Flow** | Continuous - one ends, next appears immediately |
| **Correct Answer** | +30 gold |
| **Wrong Answer** | -10 gold |
| **Core Tension** | Divide attention between quiz and battlefield |

---

## Table of Contents

1. [Game Overview](#1-game-overview)
2. [Quiz Integration](#2-quiz-integration)
3. [Economy Balance](#3-economy-balance)
4. [Tower Types](#4-tower-types)
5. [Enemy Types](#5-enemy-types)
6. [Wave Progression](#6-wave-progression)
7. [Difficulty Settings](#7-difficulty-settings)
8. [Question Timing & Frequency](#8-question-timing--frequency)
9. [UI Layout](#9-ui-layout)
10. [Win/Lose Conditions](#10-winlose-conditions)

---

## 1. Game Overview

### 1.1 Concept

**Quiz Tower Defense** is an educational tower defense game that combines strategic gameplay with multiple-choice quiz questions. Players defend their base from waves of enemies by building and upgrading towers, with gold earned through both combat and correctly answering quiz questions.

### 1.2 Target Audience

- **Age:** 8-12 years old
- **Platform:** Web browser (desktop)
- **Session Length:** 15-25 minutes per game

### 1.3 Core Gameplay Loop (SIMPLIFIED)

```
┌─────────────────────────────────────────────────────────┐
│                    GAME START                            │
│         Select difficulty → Choose map                   │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│              SIMULTANEOUS GAMEPLAY                       │
│                                                          │
│   LEFT SIDE (70%):          RIGHT SIDE (30%):           │
│   ┌────────────────┐        ┌────────────────┐          │
│   │ Tower Defense  │   ←→   │ Continuous     │          │
│   │ - Place towers │ DIVIDE │ Quiz Panel     │          │
│   │ - Watch battle │ ATTN   │ - Answer for $ │          │
│   │ - Upgrade      │        │ - +30 correct  │          │
│   └────────────────┘        │ - -10 wrong    │          │
│                             └────────────────┘          │
│                                                          │
│   Gold ONLY from quiz (enemies give nothing)            │
└─────────────────────────────────────────────────────────┘
                           ↓
              ┌───────────────────────┐
              │  Wave 10 complete?    │
              │  YES → Victory!       │
              │  Lives = 0 → Defeat   │
              └───────────────────────┘
```

### 1.4 Key Design Principles (SIMPLIFIED)

1. **Attention is the resource** - Player divides focus between quiz and battlefield
2. **Gold from knowledge only** - Enemies give no gold; must answer questions
3. **No interruptions** - Game never pauses; quiz runs alongside combat
4. **Small penalty for wrong** - -10 discourages spam but isn't punishing
5. **Clone the proven base** - Tower/enemy balance from sample project works

---

## 2. Quiz Integration

### 2.1 Core Design: Continuous Quiz

**SIMPLIFIED DESIGN (Boss Approved)**

The quiz runs CONTINUOUSLY throughout gameplay. There is no pause - combat and quiz happen simultaneously.

| Aspect | Design |
|--------|--------|
| **Gold Source** | Quizzes ONLY - enemies give NO gold |
| **Quiz Flow** | Continuous - one ends, next appears immediately |
| **Correct Answer** | +30 gold |
| **Wrong Answer** | -10 gold (small penalty) |

### 2.2 Core Tension

```
┌─────────────────────────────────────────────────────────────┐
│                    THE PLAYER'S DILEMMA                      │
│                                                              │
│   ┌──────────────┐                    ┌──────────────┐       │
│   │   QUIZ PANEL │◄── ATTENTION ──►  │  BATTLEFIELD │       │
│   │              │                    │              │       │
│   │  Answer to   │                    │  Watch for   │       │
│   │  earn gold   │                    │  placement   │       │
│   │              │                    │  timing      │       │
│   └──────────────┘                    └──────────────┘       │
│                                                              │
│   More quiz focus = More gold, but miss tactical moments     │
│   More battle focus = Better tactics, but run out of gold   │
└─────────────────────────────────────────────────────────────┘
```

### 2.3 Quiz Flow

**Continuous Loop:**
1. Question appears in quiz panel (side of screen)
2. Player can answer anytime (no time limit)
3. On answer: Show result briefly (1 second)
4. Next question appears immediately
5. Repeat throughout entire game

**Key Points:**
- Game NEVER pauses for quiz
- Quiz panel is always visible on screen side
- Player chooses when to shift attention to quiz
- Wrong answers have small penalty to discourage random clicking

### 2.4 Quiz Panel Position

```
┌────────────────────────────────────────┬─────────────────┐
│                                        │   QUIZ PANEL    │
│          GAME BATTLEFIELD              │                 │
│          (Phaser Canvas)               │   Question?     │
│                                        │                 │
│   Towers, enemies, projectiles         │   [A] Answer 1  │
│                                        │   [B] Answer 2  │
│                                        │   [C] Answer 3  │
│                                        │   [D] Answer 4  │
│                                        │                 │
│                                        │   Gold: 150     │
└────────────────────────────────────────┴─────────────────┘
```

### 2.5 Design Rationale

1. **Simplicity** - One mechanic (continuous quiz) instead of three integration points
2. **Constant engagement** - Player is always making decisions
3. **Natural difficulty** - Harder waves = less time to look at quiz
4. **Educational value** - Many more questions per game session
5. **Unique gameplay** - "Attention economy" is the core mechanic

---

## 3. Economy Balance

### 3.1 Gold Sources (SIMPLIFIED)

**CRITICAL: Gold comes ONLY from quizzes. Enemies give NO gold.**

| Source | Gold Amount | Notes |
|--------|-------------|-------|
| Correct Answer | +30 | Only gold source in game |
| Wrong Answer | -10 | Small penalty to discourage spam |
| Starting Gold | varies | Based on difficulty |

### 3.2 Gold Costs

| Item | Cost | Notes |
|------|------|-------|
| Basic Tower | 100 | Standard damage |
| AOE Tower | 200 | Splash damage |
| Slow Tower | 150 | Slows enemies |
| Sniper Tower | 250 | High damage, long range |
| Multi-shot Tower | 220 | Hits multiple targets |
| Support Tower | 180 | Buffs nearby towers |
| Tower Upgrade (Lv2) | 60% of base cost | Per tower type |
| Tower Upgrade (Lv3) | 70% of Lv2 cost | Per tower type |

### 3.3 Starting Gold by Difficulty

| Difficulty | Starting Gold | Can Afford Initially |
|------------|---------------|---------------------|
| Easy | 300 | 3 basic towers |
| Normal | 200 | 2 basic towers |
| Hard | 100 | 1 basic tower |

### 3.4 Economy Math

**Questions needed per tower:**
- Basic Tower (100g): 4 correct answers (4 × 30 = 120, minus potential wrong = ~100 net)
- AOE Tower (200g): 7-8 correct answers
- Sniper Tower (250g): 9-10 correct answers

**Approximate questions per game:**
- Average game length: 15-20 minutes
- Average answer time: 8-10 seconds (glancing at quiz between battlefield checks)
- Questions answered: ~100-150 per game

**This creates natural pacing:**
- Early game: Answer many questions to afford initial towers
- Mid game: Balance attention between quiz and battlefield
- Late game: Critical moments require battlefield focus, gold becomes scarce

### 3.5 Economy Flow Example (Normal Difficulty)

```
START: 200 gold

Early Game (Wave 1 starting):
- Place Basic Tower: -100 → 100 gold
- Answer 4 questions correctly: +120 → 220 gold
- 1 wrong answer: -10 → 210 gold
- Place Basic Tower: -100 → 110 gold

Wave 1 Combat (enemies spawning):
- Focus on battlefield, answer 2 questions: +60 → 170 gold
- 1 wrong: -10 → 160 gold

Between Waves:
- More time for quiz, answer 5 questions: +150 → 310 gold
- Place Slow Tower: -150 → 160 gold

...pattern continues: quiz during calm, battlefield during action...
```

### 3.6 Anti-Spam Design

**Why -10 penalty for wrong answers:**
- Prevents random clicking through answers
- Makes each answer meaningful
- Still forgiving (3 correct = 1 wrong covered)
- Encourages reading questions carefully

---

## 4. Tower Types

**NOTE: All tower stats come from `sample_codes/tower-defence/` - DO NOT MODIFY**

### 4.1 Tower Summary (From Sample Project)

| Tower | Cost | Damage | Range | Fire Rate | Special |
|-------|------|--------|-------|-----------|---------|
| Basic | 100 | 20 | 150 | 1000ms | None |
| AOE | 200 | 15 | 120 | 1500ms | 50px splash |
| Slow | 150 | 10 | 180 | 1200ms | 50% slow, 2s |
| Sniper | 250 | 80 | 350 | 2500ms | Long range |
| Multi-shot | 220 | 18 | 170 | 1300ms | 3 targets |
| Support | 180 | 0 | 120 | - | +20% fire rate buff |

*Stats sourced from: `sample_codes/tower-defence/src/assets/config/towers.json`*

### 4.2 Tower Details

#### Basic Tower
- **Role:** Bread-and-butter damage dealer
- **Strategy:** Place early, upgrade for consistent damage
- **Upgrades:** +40% damage, +15% range, -15% fire rate per level

#### AOE Tower
- **Role:** Crowd control for grouped enemies
- **Strategy:** Place at path corners where enemies bunch up
- **Upgrades:** +35% damage, +12% range, +10% splash radius

#### Slow Tower
- **Role:** Utility - slow enemies for other towers
- **Strategy:** Place near high-damage towers
- **Upgrades:** +30% damage, stronger slow (60%→70%), longer duration

#### Sniper Tower
- **Role:** Priority target eliminator
- **Strategy:** Place to cover long path sections, target healers/bosses
- **Upgrades:** +50% damage, +10% range, -15% fire rate

#### Multi-shot Tower
- **Role:** Multi-target damage
- **Strategy:** Effective against fast, numerous enemies
- **Upgrades:** +35% damage, +1 target per level (3→4→5)

#### Support Tower
- **Role:** Force multiplier
- **Strategy:** Place surrounded by damage towers
- **Upgrades:** +5% buff amount, +15% buff radius per level
- **Note:** Does not attack, only buffs

### 4.3 Upgrade System

Each tower has 3 levels:
- **Level 1:** Base stats (purchase cost)
- **Level 2:** Enhanced stats (60% of base cost + quiz)
- **Level 3:** Maximum stats (70% of L2 cost + quiz)

**Upgrade Quiz Requirement:**
- Must answer 1 question correctly to upgrade
- Wrong answer = retry with new question (no penalty)
- Creates meaningful learning moment at strategic decision

---

## 5. Enemy Types

**NOTE: All enemy stats come from `sample_codes/tower-defence/` - DO NOT MODIFY**

**IMPORTANT: Enemy "Reward" column shows sample project values, but in Quiz TD enemies give NO gold. Gold comes only from quizzes.**

### 5.1 Enemy Summary (From Sample Project)

| Enemy | HP | Speed | ~~Reward~~ | Damage | Special |
|-------|-----|-------|--------|--------|---------|
| Basic | 100 | 100 | ~~20~~ 0 | 1 | None |
| Fast | 60 | 180 | ~~15~~ 0 | 1 | Quick |
| Armored | 250 | 70 | ~~30~~ 0 | 1 | 30% armor |
| Flying | 80 | 120 | ~~25~~ 0 | 1 | Ignores ground |
| Boss | 1000 | 50 | ~~100~~ 0 | 5 | 50% armor |
| Healer | 120 | 90 | ~~30~~ 0 | 1 | Heals nearby |
| Shield | 140 | 80 | ~~35~~ 0 | 1 | Temporary immunity |
| Split | 90 | 110 | ~~18~~ 0 | 1 | Splits on death |
| Teleport | 100 | 105 | ~~28~~ 0 | 1 | Jumps ahead |

*Stats sourced from: `sample_codes/tower-defence/src/index.js` GAME_SETTINGS.ENEMIES*

### 5.2 Enemy Details

#### Basic Enemy
- **Behavior:** Walks path at normal speed
- **Counter:** Any tower works
- **Introduced:** Wave 1

#### Fast Enemy
- **Behavior:** Moves 80% faster than Basic
- **Counter:** Slow towers, Multi-shot towers
- **Introduced:** Wave 2

#### Armored Enemy
- **Behavior:** Takes 30% reduced damage from all sources
- **Counter:** Sniper tower (high single-hit damage)
- **Introduced:** Wave 3

#### Flying Enemy
- **Behavior:** Ignores certain path restrictions
- **Counter:** AOE tower, Sniper tower
- **Introduced:** Wave 5

#### Boss Enemy
- **Behavior:** Very slow but extremely tanky, deals 5 damage to base
- **Counter:** Focus fire, Sniper tower, Support-boosted towers
- **Introduced:** Wave 10 (final wave)

#### Healer Enemy
- **Behavior:** Heals nearby enemies for 10 HP every 2 seconds
- **Counter:** Priority targeting (Sniper), kill first
- **Introduced:** Wave 6

#### Shield Enemy
- **Behavior:** Activates 1.5s immunity shield every 3.5s
- **Counter:** Slow tower (waste shield during slow), sustained fire
- **Introduced:** Wave 7

#### Split Enemy
- **Behavior:** Splits into 2 smaller enemies on death
- **Counter:** AOE tower (hits splits), plan for extras
- **Introduced:** Wave 8

#### Teleport Enemy
- **Behavior:** Teleports 2 tiles forward every 2.5 seconds
- **Counter:** Dense tower coverage, Slow tower
- **Introduced:** Wave 9

---

## 6. Wave Progression

### 6.1 Wave Configuration (Normal Difficulty)

| Wave | Enemies | Count | Interval | Special |
|------|---------|-------|----------|---------|
| 1 | BASIC | 10 | 1500ms | Tutorial wave |
| 2 | BASIC, FAST | 15 | 1200ms | Introduce Fast |
| 3 | BASIC, FAST, ARMORED | 20 | 1000ms | Introduce Armored |
| 4 | FAST, ARMORED | 15 | 900ms | No more Basic |
| 5 | ARMORED, FLYING | 15 | 1000ms | Introduce Flying |
| 6 | FAST, FLYING, HEALER | 20 | 800ms | Introduce Healer |
| 7 | ARMORED, FLYING, HEALER, SHIELD | 25 | 700ms | Introduce Shield |
| 8 | FAST, ARMORED, SHIELD, SPLIT | 20 | 600ms | Introduce Split |
| 9 | ALL except BOSS | 30 | 500ms | Introduce Teleport |
| 10 | BOSS + HEALER + SHIELD | 15 | 800ms | Boss Wave |

### 6.2 Wave Pause Timing

| Event | Duration |
|-------|----------|
| Wave complete banner | 2 seconds |
| Quiz questions | ~5-8 seconds per question |
| Post-quiz prep time | 5 seconds countdown |
| **Total between waves** | ~20-30 seconds |

### 6.3 Difficulty Scaling

Waves scale based on difficulty setting (see Section 7):
- Enemy count multiplied
- Enemy HP multiplied
- Enemy speed multiplied
- Gold rewards multiplied (to compensate)

---

## 7. Difficulty Settings

### 7.1 Difficulty Multipliers

| Setting | Enemy HP | Enemy Speed | Enemy Count | Gold Reward | Starting Gold | Lives |
|---------|----------|-------------|-------------|-------------|---------------|-------|
| Easy | 1.0x | 1.0x | 1.0x | 1.2x | 400 | 30 |
| Normal | 1.2x | 1.1x | 1.2x | 1.0x | 300 | 20 |
| Hard | 1.5x | 1.2x | 1.4x | 0.8x | 200 | 10 |

### 7.2 Question Difficulty Scaling

| Wave Range | Question Pool |
|------------|---------------|
| Waves 1-3 | Easy questions only |
| Waves 4-6 | Easy + Medium questions |
| Waves 7-10 | Medium + Hard questions |

### 7.3 Difficulty Selection UI

- Shown on main menu after "Play" clicked
- Three buttons: Easy (green), Normal (yellow), Hard (red)
- Each shows: Lives, Starting Gold, "For beginners/Average/Experts"
- Default selection: Normal

---

## 8. Question Timing & Frequency

### 8.1 Continuous Quiz Flow

**Questions appear continuously throughout gameplay:**
- One question always visible in quiz panel
- On answer (correct or wrong), next question appears after 1s feedback
- No pause, no interruption to gameplay
- Player divides attention between quiz and battlefield

### 8.2 Question Frequency

| Metric | Value | Notes |
|--------|-------|-------|
| Average answer time | 8-10 seconds | Player glances at quiz between actions |
| Game length | 15-20 minutes | 10 waves |
| Questions per game | 100-150 | High volume = more learning |
| No time limit | ∞ | Battlefield provides natural pressure |

### 8.3 Question Selection Algorithm

```
1. Shuffle all questions at game start
2. Present questions sequentially
3. On answer: mark as used, move to next
4. If all used: reshuffle and allow repeats
5. No difficulty filtering - random mix keeps players engaged
```

### 8.4 Question Data Format

```json
{
  "id": "q001",
  "topic": "History",
  "question": "Who was the first President of the United States?",
  "answers": [
    "George Washington",
    "Abraham Lincoln",
    "Thomas Jefferson",
    "John Adams"
  ],
  "correctIndex": 0,
  "explanation": "George Washington served as the first President from 1789 to 1797."
}
```

### 8.5 Feedback Display

| Result | Display | Duration |
|--------|---------|----------|
| Correct | Green flash + "+30" animation + "✓" | 1 second |
| Wrong | Red flash + "-10" animation + show correct answer | 1.5 seconds |

After feedback, next question appears immediately.

---

## 9. UI Layout

### 9.1 Screen Split (70/30)

**Layout: Phaser Canvas (70%) + React Quiz Panel (30%)**

```
┌──────────────────────────────────────────────┬──────────────────┐
│                                              │                  │
│              PHASER GAME AREA                │   REACT PANEL    │
│                  (70%)                       │     (30%)        │
│                                              │                  │
│  ┌────────────────────────────────────────┐  │  ┌────────────┐  │
│  │  [Gold: 150]  [Wave: 3/10]  [Lives: 18]│  │  │  QUESTION  │  │
│  ├────────────────────────────────────────┤  │  │            │  │
│  │                                        │  │  │  Who was   │  │
│  │         Tower Defense Game             │  │  │  the first │  │
│  │                                        │  │  │  president?│  │
│  │    Path, towers, enemies, projectiles  │  │  │            │  │
│  │                                        │  │  │  [A] Wash  │  │
│  │                                        │  │  │  [B] Adams │  │
│  │                                        │  │  │  [C] Jeff  │  │
│  ├────────────────────────────────────────┤  │  │  [D] Frank │  │
│  │ [Basic] [AOE] [Slow] [Sniper] [Multi]  │  │  │            │  │
│  │  $100   $200  $150    $250    $220     │  │  │  +30 / -10 │  │
│  └────────────────────────────────────────┘  │  └────────────┘  │
│                                              │                  │
└──────────────────────────────────────────────┴──────────────────┘
```

### 9.2 React Quiz Panel (Always Visible)

```
┌──────────────────────┐
│     💰 Gold: 150     │
│   ════════════════   │
│                      │
│   Question 47/200    │
│                      │
│   Who discovered     │
│   gravity when an    │
│   apple fell?        │
│                      │
│  ┌────────────────┐  │
│  │ A) Einstein    │  │
│  └────────────────┘  │
│  ┌────────────────┐  │
│  │ B) Newton      │  │
│  └────────────────┘  │
│  ┌────────────────┐  │
│  │ C) Galileo     │  │
│  └────────────────┘  │
│  ┌────────────────┐  │
│  │ D) Darwin      │  │
│  └────────────────┘  │
│                      │
│   ✓ Correct: +30     │
│   ✗ Wrong:  -10      │
└──────────────────────┘
```

### 9.3 Quiz Feedback (In-Panel)

**Correct Answer (1 second):**
```
┌──────────────────────┐
│     💰 Gold: 180     │
│   ════════════════   │
│                      │
│   ┌────────────────┐ │
│   │                │ │
│   │   ✓ CORRECT!   │ │
│   │                │ │
│   │    +30 Gold    │ │
│   │                │ │
│   └────────────────┘ │
│                      │
│   Newton discovered  │
│   gravity.           │
│                      │
│   Next question...   │
└──────────────────────┘
```

**Wrong Answer (1.5 seconds):**
```
┌──────────────────────┐
│     💰 Gold: 140     │
│   ════════════════   │
│                      │
│   ┌────────────────┐ │
│   │                │ │
│   │   ✗ WRONG      │ │
│   │                │ │
│   │    -10 Gold    │ │
│   │                │ │
│   └────────────────┘ │
│                      │
│   Correct: Newton    │
│                      │
│   He observed a      │
│   falling apple.     │
│                      │
│   Next question...   │
└──────────────────────┘
```

### 9.4 Phaser Game Area Components

| Component | Location | Source |
|-----------|----------|--------|
| Top HUD | Top of Phaser | Gold, wave, lives (from sample) |
| Tower Bar | Bottom of Phaser | Tower selection (from sample) |
| Game Map | Center | Path, towers, enemies (from sample) |
| Tower Info | Popup on click | Stats + upgrade (from sample) |

### 9.5 React Panel Components

| Component | Location | New for Quiz TD |
|-----------|----------|-----------------|
| GoldDisplay | Top of panel | Shows current gold |
| QuestionCard | Center | Question + 4 answers |
| FeedbackDisplay | Center | Correct/wrong feedback |
| StatsDisplay | Bottom | Questions answered, accuracy |

---

## 10. Win/Lose Conditions

### 10.1 Victory Condition

**Win when:** All enemies in Wave 10 are defeated AND lives > 0

**Victory Screen:**
```
┌──────────────────────────────────────┐
│           🏆 VICTORY! 🏆              │
│                                      │
│   You defended the base!             │
│                                      │
│   Final Score: 12,450                │
│   ─────────────────────────────────  │
│   📚 QUIZ STATS (Core Mechanic)      │
│   Questions Answered: 142            │
│   Correct: 118 (83%)                 │
│   Gold Earned: 3,540                 │
│   ─────────────────────────────────  │
│   🏰 BATTLE STATS                    │
│   Enemies Defeated: 185              │
│   Towers Built: 12                   │
│   Lives Remaining: 14                │
│                                      │
│   [Play Again]    [Main Menu]        │
└──────────────────────────────────────┘
```

### 10.2 Defeat Condition

**Lose when:** Lives reach 0 (enemies reached base)

**Defeat Screen:**
```
┌──────────────────────────────────────┐
│           💀 GAME OVER 💀             │
│                                      │
│   The enemies broke through!         │
│                                      │
│   Reached Wave: 7/10                 │
│   ─────────────────────────────────  │
│   📚 QUIZ STATS                      │
│   Questions Answered: 89             │
│   Correct: 71 (80%)                  │
│   ─────────────────────────────────  │
│   🏰 BATTLE STATS                    │
│   Enemies Defeated: 98               │
│   Towers Built: 8                    │
│                                      │
│   [Try Again]     [Main Menu]        │
└──────────────────────────────────────┘
```

### 10.3 Score Calculation

```
Score = (Enemies Killed × 10)
      + (Towers Built × 5)
      + (Waves Completed × 100)
      + (Questions Correct × 25)     ← Emphasized since quiz is core
      + (Accuracy Bonus × 50)        ← Bonus for high accuracy
      + (Lives Remaining × 50)
      + (Gold Remaining ÷ 10)

Accuracy Bonus:
  90%+ accuracy = 5 bonus points
  80%+ accuracy = 3 bonus points
  70%+ accuracy = 1 bonus point
```

### 10.4 Lives System

| Event | Lives Change |
|-------|--------------|
| Regular enemy reaches base | -1 |
| Boss enemy reaches base | -5 |
| Correct quiz answer | +0 (no life gain) |
| Wrong quiz answer | -0 (no life loss) |

---

## Appendix A: Config File Structure

```
public/assets/config/
├── game.json           # Global settings
├── towers.json         # Tower stats and upgrades
├── enemies.json        # Enemy stats and abilities
├── waves.json          # Wave progression
├── difficulty.json     # Difficulty multipliers
└── quiz.json           # Quiz timing settings

public/assets/data/
└── questions.json      # Question bank
```

---

## Appendix B: Architecture Alignment

| Sample Project Pattern | Quiz TD Implementation |
|------------------------|------------------------|
| Config-driven | All values in JSON configs |
| Manager pattern | TowerManager, EnemyManager, QuizManager |
| Entity inheritance | BaseTower→6 types, BaseEnemy→9 types |
| Wave progression | WaveManager with difficulty scaling |
| Economy system | EconomyManager (gold + quiz rewards) |
| Grid placement | GridManager for tower placement |
| Upgrade system | 3 levels per tower + quiz gate |

---

## Appendix C: Development Phases

### Phase 1: Core TD (No Quiz)
- Port sample tower defense mechanics
- All 6 tower types working
- All 9 enemy types working
- 10 wave progression
- Economy system

### Phase 2: Quiz Integration
- Between-wave quiz system
- Quiz panel UI (React)
- Question loading from JSON
- Gold rewards for correct answers

### Phase 3: Advanced Quiz
- Upgrade gate quiz
- Optional quiz button
- Question difficulty scaling
- Explanation display

### Phase 4: Polish
- Difficulty selector
- Score system
- Victory/defeat screens
- Sound effects
- Visual polish

---

**Document Status:** COMPLETE
**Approved by:** Boss (via PO)
**Ready for:** TL Technical Review → DEV Implementation
