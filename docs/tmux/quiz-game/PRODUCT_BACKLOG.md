# Product Backlog - Quiz Battle Arena (PvZ Edition)

**Product Owner:** PO
**Last Updated:** 2025-12-30
**Game Style:** Plants vs Zombies + Educational Quiz Hybrid

---

## Vision

Build a **Plants vs Zombies-style tower defense game** where players earn money by answering quiz questions correctly. The game should be **HARD and FRUSTRATING** by design. Subject-agnostic - works for history, math, literature by swapping question JSON.

**Core Loop:**
- Zombies attack → Player needs plants to defend
- Answer quiz correctly → Earn money to buy plants
- Answer wrong → Lose money
- Survive waves while answering questions

---

## Progressive Development Approach

We build **incrementally**, making the game **playable and visible at each milestone**.

| Milestone | Goal | Playable State |
|-----------|------|----------------|
| M1 | Basic PvZ mechanics | Place plants, zombies walk, plants shoot |
| M2 | Quiz integration | Questions appear, earn money for plants |
| M3 | Full game loop | Win/lose conditions, waves, difficulty |
| M4 | Polish & Content | More plants/zombies, sound, effects |
| M5 | Content Pipeline | Question generation from outlines |

---

## Backlog Items

### M1 - Core PvZ Mechanics (Must Have First)

#### [PBI-M1-001]: Game Board with Lanes
**Priority:** P0
**Status:** Ready
**Estimate:** M
**Milestone:** M1

**Description:**
Display a PvZ-style game board with lanes (3-5 lanes). Simple grid-based layout.

**Acceptance Criteria:**
- [ ] Game board displays with clear lanes (recommend 3 lanes for simplicity)
- [ ] Grid cells visible where plants can be placed
- [ ] Lawn/grass visual theme
- [ ] Responsive to screen size

**Tech Notes:** Phaser Scene, tilemap or simple grid

---

#### [PBI-M1-002]: Basic Zombie Movement
**Priority:** P0
**Status:** Ready
**Estimate:** M
**Milestone:** M1

**Description:**
Zombies spawn on right side and walk left across lanes.

**Acceptance Criteria:**
- [ ] Zombies spawn at right edge of a lane
- [ ] Zombies walk left at constant speed
- [ ] Zombie sprite animates while walking
- [ ] Zombies stay in their lane

**Assets Needed:** Zombie sprite pack (walk animation)

---

#### [PBI-M1-003]: Basic Plant Placement
**Priority:** P0
**Status:** Ready
**Estimate:** M
**Milestone:** M1

**Description:**
Player can place plants on grid cells. Start with one plant type: Peashooter.

**Acceptance Criteria:**
- [ ] Click/tap grid cell to place plant
- [ ] Plant appears on selected cell
- [ ] Cannot place on occupied cell
- [ ] Plant selection UI (even if just one plant)

**Assets Needed:** Peashooter sprite

---

#### [PBI-M1-004]: Plants Shoot Projectiles
**Priority:** P0
**Status:** Ready
**Estimate:** M
**Milestone:** M1

**Description:**
Peashooters fire projectiles at zombies in their lane.

**Acceptance Criteria:**
- [ ] Peashooter fires peas periodically
- [ ] Peas travel rightward in the lane
- [ ] Peas hit zombies and deal damage
- [ ] Zombies die after taking enough damage

---

#### [PBI-M1-005]: Zombie Reaches House = Lose
**Priority:** P0
**Status:** Ready
**Estimate:** S
**Milestone:** M1

**Description:**
If zombie reaches left edge, player loses.

**Acceptance Criteria:**
- [ ] Zombie reaching left edge triggers game over
- [ ] Game over screen displays
- [ ] Option to restart

---

### M2 - Quiz Integration (Core Differentiator)

#### [PBI-M2-001]: Question Display UI
**Priority:** P0
**Status:** New
**Estimate:** M
**Milestone:** M2

**Description:**
Display quiz questions with 4 multiple-choice answers. Questions appear at intervals or triggered by events.

**Acceptance Criteria:**
- [ ] Question modal/panel appears
- [ ] 4 answer buttons displayed
- [ ] Game pauses or slows when question appears
- [ ] Vietnamese text support
- [ ] Clear, readable typography

**Tech Decision:** TL to decide - Phaser UI or React overlay

---

#### [PBI-M2-002]: Money System
**Priority:** P0
**Status:** New
**Estimate:** S
**Milestone:** M2

**Description:**
Player has money (sun equivalent) to buy plants.

**Acceptance Criteria:**
- [ ] Money counter displayed
- [ ] Plants have costs
- [ ] Cannot buy plant if insufficient money
- [ ] Starting money configurable

---

#### [PBI-M2-003]: Quiz-for-Money Mechanic
**Priority:** P0
**Status:** New
**Estimate:** M
**Milestone:** M2

**Description:**
Answer correctly = earn money. Answer wrong = lose money. Make it PUNISHING.

**Acceptance Criteria:**
- [ ] Correct answer: +50 money (configurable)
- [ ] Wrong answer: -30 money (configurable) - HARSH
- [ ] Visual/audio feedback for correct/wrong
- [ ] Money can go to zero or negative (no plants buyable)

**Design Intent:** Frustrating. Wrong answers hurt badly.

---

#### [PBI-M2-004]: Question Loading from JSON
**Priority:** P0
**Status:** New
**Estimate:** S
**Milestone:** M2

**Description:**
Load questions from external JSON file.

**Acceptance Criteria:**
- [ ] Questions load from JSON file
- [ ] Support Vietnamese text
- [ ] Questions shuffle or randomize
- [ ] Handle edge cases (no questions left)

**Sample JSON already exists or use Claude to generate from outline**

---

### M3 - Full Game Loop

#### [PBI-M3-001]: Wave System
**Priority:** P1
**Status:** New
**Estimate:** M
**Milestone:** M3

**Description:**
Zombies come in waves with increasing difficulty.

**Acceptance Criteria:**
- [ ] Wave counter displayed
- [ ] Each wave spawns more/faster zombies
- [ ] Brief pause between waves
- [ ] Difficulty ramps up significantly

---

#### [PBI-M3-002]: Victory Condition
**Priority:** P1
**Status:** New
**Estimate:** S
**Milestone:** M3

**Description:**
Player wins by surviving all waves.

**Acceptance Criteria:**
- [ ] Configurable number of waves
- [ ] Victory screen after last wave
- [ ] Stats displayed (questions answered, accuracy)

---

#### [PBI-M3-003]: Question Timing Strategy
**Priority:** P1
**Status:** New
**Estimate:** M
**Milestone:** M3

**Description:**
Questions appear at strategic moments - adds tension.

**Acceptance Criteria:**
- [ ] Questions triggered periodically
- [ ] Questions may appear during zombie attacks
- [ ] Time limit on answering (optional - adds pressure)
- [ ] Unanswered = counts as wrong

**Design Intent:** Questions interrupt gameplay, adding stress. FRUSTRATING.

---

### M4 - Content & Polish

#### [PBI-M4-001]: Additional Plant Types
**Priority:** P2
**Status:** New
**Estimate:** M
**Milestone:** M4

**Description:**
Add more plant types: Wall-nut (defense), Sunflower (passive income).

**Acceptance Criteria:**
- [ ] Wall-nut: Blocks zombies, high HP
- [ ] Sunflower: Generates money over time
- [ ] Plant selection menu
- [ ] Different costs for each plant

---

#### [PBI-M4-002]: Zombie Variety
**Priority:** P2
**Status:** New
**Estimate:** M
**Milestone:** M4

**Description:**
Add zombie types: Fast zombie, Tank zombie.

**Acceptance Criteria:**
- [ ] Regular zombie (baseline)
- [ ] Fast zombie (faster, less HP)
- [ ] Tank zombie (slow, high HP)
- [ ] Visual distinction between types

---

#### [PBI-M4-003]: Sound Effects & Music
**Priority:** P2
**Status:** New
**Estimate:** S
**Milestone:** M4

**Description:**
Add sound effects and background music.

**Acceptance Criteria:**
- [ ] Background music (looping)
- [ ] Plant shooting sound
- [ ] Zombie death sound
- [ ] Correct/wrong answer sounds
- [ ] Game over / victory sounds

---

#### [PBI-M4-004]: Visual Polish
**Priority:** P2
**Status:** New
**Estimate:** M
**Milestone:** M4

**Description:**
Add visual effects and animations.

**Acceptance Criteria:**
- [ ] Plant placement animation
- [ ] Zombie death animation
- [ ] Projectile hit effects
- [ ] UI transitions

---

### M5 - Content Pipeline (Low Priority - Future)

#### [PBI-M5-001]: Question Generation from Outline
**Priority:** P3
**Status:** New
**Estimate:** L
**Milestone:** M5

**Description:**
Generate quiz questions from outline/markdown files using LLM.

**Acceptance Criteria:**
- [ ] Input: Markdown outline file
- [ ] Output: JSON with 30-50 multiple-choice questions
- [ ] Use Claude/Grok API for generation
- [ ] Vietnamese language support

**Notes:** Low priority. For now, manually create questions or use Claude to generate.

---

#### [PBI-M5-002]: PDF to Markdown Conversion
**Priority:** P3
**Status:** New
**Estimate:** M
**Milestone:** M5

**Description:**
Convert PDF outline files to Markdown for processing.

**Acceptance Criteria:**
- [ ] PDF parsing
- [ ] Clean markdown output
- [ ] Handle Vietnamese text

---

#### [PBI-M5-003]: Multiple Question Sets/Subjects
**Priority:** P3
**Status:** New
**Estimate:** S
**Milestone:** M5

**Description:**
Support multiple JSON files for different subjects.

**Acceptance Criteria:**
- [ ] Menu to select subject/topic
- [ ] Load corresponding JSON file
- [ ] Remember last selection

---

## Immediate Sprint Recommendation

**Sprint 1 Goal:** Complete M1 - Basic PvZ Mechanics

**Items for Sprint 1:**
1. PBI-M1-001: Game Board with Lanes
2. PBI-M1-002: Basic Zombie Movement
3. PBI-M1-003: Basic Plant Placement
4. PBI-M1-004: Plants Shoot Projectiles
5. PBI-M1-005: Zombie Reaches House = Lose

**Deliverable:** Playable tower defense without quiz (test core mechanics first)

---

## Asset Requirements (TL to Research)

| Asset | Type | Priority |
|-------|------|----------|
| Zombie sprites (walk, attack, die) | Sprite sheet | P0 |
| Plant sprites (Peashooter, idle, attack) | Sprite sheet | P0 |
| Projectile (pea) | Sprite | P0 |
| Lawn/grid background | Tileset | P0 |
| Wall-nut, Sunflower sprites | Sprite sheet | P2 |
| UI elements | Graphics | P1 |
| Sound effects | Audio | P2 |
| Background music | Audio | P2 |

**Source:** Search online for free/CC0 PvZ-style sprite packs. Do NOT create from scratch.

---

## Tech Stack Decisions (For TL)

| Component | Options | Decision |
|-----------|---------|----------|
| Game Engine | Phaser 3 | Likely |
| UI Layer | Phaser UI vs React overlay | TL to decide |
| Build Tool | Vite | Likely |
| Testing | Jest | Likely |
| Physics | Simple Phaser arcade physics | Keep simple |

---

## Priority Definitions

| Priority | Meaning |
|----------|---------|
| P0 | Critical - Must be in current/next Sprint |
| P1 | High - Should be soon |
| P2 | Medium - When capacity allows |
| P3 | Low - Future/Nice to have |

---

## Size Estimates

| Size | Meaning |
|------|---------|
| S | Few hours, single file changes |
| M | 1-2 days, multiple files |
| L | 3-5 days, significant feature |
| XL | 1+ week, major feature, needs decomposition |
