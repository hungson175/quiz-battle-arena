# Product Requirements Document (PRD)
## Quiz Battle Arena - PvZ Edition

**Version**: 2.0
**Date**: December 30, 2025
**Author**: PO (Product Owner), Quiz Game Team
**Status**: Major Pivot - Plants vs Zombies Style

---

## Executive Summary

**Quiz Battle Arena** is a **Plants vs Zombies-style tower defense game** combined with educational quizzes. Players defend their house from zombie waves by placing plants. The twist: **money to buy plants is earned by answering quiz questions correctly**. Wrong answers mean losing money. The game is designed to be **HARD and FRUSTRATING**.

**Target Market**: Children ages 8-12 and educators seeking engaging, challenging educational tools.

**Key Differentiator**: Subject-agnostic - swap the question JSON to change from history to math to any subject.

---

## 1. Product Vision

### 1.1 Core Concept

**Plants vs Zombies + Quiz = Learning Through Frustration**

- Zombies march toward your house
- You need plants to defend
- Plants cost money
- Money comes from answering quiz questions
- Wrong answers = lose money = can't buy plants = zombies win

### 1.2 Design Philosophy

**Make it HARD. Make it FRUSTRATING.**

- Wrong answers should hurt (lose money, not just "no reward")
- Questions interrupt gameplay at inconvenient moments
- Limited time to answer
- Difficulty ramps up aggressively

### 1.3 Success Metrics

- **Engagement**: Players want to retry despite frustration
- **Learning**: Repetition through failure drives memorization
- **Replayability**: Different subjects via JSON swap
- **Challenge**: Most players fail first few attempts

---

## 2. User Personas

### Primary Persona: Student (Ages 8-12)

**Name**: Mai (10 years old)
**Motivation**: Wants to beat the game, will learn to do so
**Experience**: Familiar with mobile games
**Pain Points**:
- Gets frustrated but keeps trying
- Competitive with self and friends

### Secondary Persona: Parent/Educator

**Name**: Mr. Phong (38 years old)
**Motivation**: Wants child to study but in engaging way
**Experience**: Basic tech skills
**Goals**:
- One game for multiple subjects
- Child voluntarily practices material
- Can customize questions

---

## 3. Core Gameplay

### 3.1 Game Loop

```
┌─────────────────────────────────────────────────────────────┐
│  WAVE STARTS                                                 │
│  Zombies spawn on right, walk left toward house             │
├─────────────────────────────────────────────────────────────┤
│  QUIZ POPS UP                                                │
│  "What river was crucial to Ancient Egypt?"                  │
│  [A] Nile [B] Tigris [C] Euphrates [D] Red River            │
│                                                              │
│  ✓ Correct: +50 money                                        │
│  ✗ Wrong: -30 money (HARSH!)                                │
├─────────────────────────────────────────────────────────────┤
│  PLACE PLANTS                                                │
│  Use money to buy Peashooters, Wall-nuts, etc.              │
│  Plants attack zombies in their lane                         │
├─────────────────────────────────────────────────────────────┤
│  SURVIVE OR DIE                                              │
│  Zombie reaches house = GAME OVER                            │
│  Survive all waves = VICTORY                                 │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Economy (Frustration by Design)

| Action | Money Change | Notes |
|--------|--------------|-------|
| Correct answer | +50 | Reward |
| Wrong answer | -30 | PUNISHMENT |
| Plant cost | -50 to -150 | Expensive |
| Starting money | 100 | Just enough for 2 cheap plants |

**Result**: One or two wrong answers = can't afford plants = zombies win.

### 3.3 Lanes

- **3 lanes** (simplified from classic PvZ 5 lanes)
- Each lane is independent
- Zombies stay in their lane
- Plants only attack zombies in their lane

---

## 4. Game Elements

### 4.1 Plants (Milestone 1 starts with Peashooter only)

| Plant | Cost | Function |
|-------|------|----------|
| Peashooter | 50 | Shoots peas, basic damage |
| Wall-nut | 75 | Blocks zombies, high HP (M4) |
| Sunflower | 50 | Generates money over time (M4) |

### 4.2 Zombies

| Zombie | Speed | HP | Notes |
|--------|-------|-----|-------|
| Regular | Normal | Normal | Baseline |
| Fast | Fast | Low | M4 |
| Tank | Slow | High | M4 |

### 4.3 Questions

- 4 multiple-choice answers
- Vietnamese language support
- Loaded from JSON file
- 30-50 questions per subject
- Subject-agnostic (history, math, literature, etc.)

---

## 5. Progressive Milestones

| Milestone | Goal | Playable State |
|-----------|------|----------------|
| **M1** | Basic PvZ mechanics | Place plants, zombies walk, plants shoot |
| **M2** | Quiz integration | Questions appear, earn money for plants |
| **M3** | Full game loop | Win/lose conditions, waves, difficulty |
| **M4** | Content & Polish | More plants/zombies, sound, effects |
| **M5** | Content Pipeline | Question generation from outlines |

---

## 6. Tech Stack

| Component | Technology | Decision By |
|-----------|------------|-------------|
| Game Engine | Phaser 3 | Confirmed |
| UI Layer | Phaser UI or React | TL decides |
| Build Tool | Vite | Confirmed |
| Testing | Jest | Confirmed |
| Physics | Phaser Arcade (simple) | Confirmed |

### 6.1 Assets

- **Source**: Free/CC0 sprite packs online
- **Do NOT create from scratch**
- Search for: "PvZ style sprite pack", "zombie game sprites free"

---

## 7. Question Content

### 7.1 Current State

- Outline exists: `data/output/DC_lichsu.md` (Vietnamese history)
- Format: Markdown study notes
- Needs conversion to Q&A JSON

### 7.2 Question JSON Format

```json
{
  "questions": [
    {
      "id": 1,
      "text": "Sông Nin có vai trò gì đối với Ai Cập cổ đại?",
      "answers": [
        "Cung cấp nước và phù sa cho nông nghiệp",
        "Làm biên giới phòng thủ",
        "Cung cấp vàng và khoáng sản",
        "Đường giao thông đến Hy Lạp"
      ],
      "correct": 0,
      "explanation": "Sông Nin cung cấp nước tưới và phù sa màu mỡ cho đất nông nghiệp."
    }
  ]
}
```

### 7.3 Question Generation (M5 - Future)

- Input: PDF outline → Markdown
- Process: LLM (Claude/Grok) generates Q&A
- Output: JSON with 30-50 questions
- **Low priority** - manually create questions for now

---

## 8. Definition of Done

A feature is "Done" when:
- [ ] Code implemented and committed
- [ ] TDD tests pass
- [ ] TL code review approved
- [ ] QA testing passed
- [ ] Game runs without errors
- [ ] PO accepts

---

## 9. Out of Scope (For Now)

- Multiplayer
- Leaderboards
- Account/login system
- In-app purchases
- Animated cutscenes
- Story mode

---

## 10. Open Questions

1. **Lanes**: 3 (simpler) vs 5 (classic)? → Recommend 3
2. **Question timing**: Fixed intervals or random?
3. **Time limit**: Per question? How long?

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 2.0 | 2025-12-30 | Major pivot to PvZ-style tower defense |
| 1.1 | 2025-12-17 | Added GD recommendations |
| 1.0 | 2025-12-16 | Initial PRD |
