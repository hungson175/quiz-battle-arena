# Sprint 3 - Game Design Specifications
## GD Design Specs - 2025-12-30

---

## 1. Wave Difficulty Curve

### Design Philosophy
- **Early waves**: Teach mechanics, build confidence
- **Mid waves**: Introduce challenge, require strategy
- **Final wave**: Test mastery, intense but fair

### Wave Configuration

| Wave | Zombies | Spawn Interval | Speed Modifier | Notes |
|------|---------|----------------|----------------|-------|
| 1 | 3 | 4.0 sec | 1.0x (normal) | Tutorial wave - easy win |
| 2 | 5 | 3.5 sec | 1.0x | Slight pressure |
| 3 | 7 | 3.0 sec | 1.1x (10% faster) | Challenge begins |
| 4 | 9 | 2.5 sec | 1.2x (20% faster) | Stressful |
| 5 | 12 | 2.0 sec | 1.3x (30% faster) | Final boss wave |

**Total zombies**: 36 across 5 waves

### Lane Distribution Strategy
- **Random but balanced**: Each wave distributes zombies across all 3 lanes
- **No lane stacking**: Max 2 consecutive zombies in same lane
- **Final wave**: Can stack more aggressively

### Inter-Wave Pause
- **Duration**: 5 seconds between waves
- **Display**: "Wave X Complete!" then "Wave X+1 Starting..."
- **Purpose**: Let player breathe, place plants, prepare

---

## 2. Question Timing Strategy

### Design Intent
Questions should **interrupt** gameplay at inconvenient moments to create frustration and urgency. Wrong answers hurt badly (-30 money).

### Timing Rules

| Trigger | When | Pressure Level |
|---------|------|----------------|
| First question | 15 sec after Wave 1 starts | Low |
| Subsequent | Every 12-15 seconds (randomized) | Medium |
| Critical moment | When zombie is 2 tiles from house | HIGH |

### Time Limit Per Question
- **Duration**: 12 seconds countdown
- **Visual**: Countdown bar shrinking (green → yellow → red)
- **Timeout**: Counts as wrong answer (-30 money)
- **Sound**: Tick-tick-tick sound in final 3 seconds

### Strategic Interruption
```
IF zombie_distance_to_house <= 2 tiles:
    INCREASE question_chance by 50%
    // Creates panic moments - answer fast or lose!
```

### Question Frequency by Wave

| Wave | Question Interval | Rationale |
|------|-------------------|-----------|
| 1 | Every 15 sec | Gentle introduction |
| 2 | Every 12 sec | Increasing pressure |
| 3 | Every 10 sec | Challenging |
| 4 | Every 10 sec | Maintain pressure |
| 5 | Every 8 sec | Maximum stress |

---

## 3. Victory/Defeat Stats Display

### Victory Screen

```
╔══════════════════════════════════════╗
║          🏆 VICTORY! 🏆              ║
╠══════════════════════════════════════╣
║  Waves Survived:     5/5             ║
║  Questions Answered: 12              ║
║  Correct Answers:    9               ║
║  Accuracy:           75%             ║
║  Final Money:        180             ║
║  Plants Placed:      8               ║
║  Zombies Defeated:   36              ║
╠══════════════════════════════════════╣
║        [ PLAY AGAIN ]                ║
╚══════════════════════════════════════╝
```

### Defeat Screen

```
╔══════════════════════════════════════╗
║          💀 GAME OVER 💀             ║
╠══════════════════════════════════════╣
║  Wave Reached:       3/5             ║
║  Questions Answered: 7               ║
║  Correct Answers:    3               ║
║  Accuracy:           43%             ║
║  Final Money:        -20             ║
║  Plants Placed:      4               ║
║  Zombies Defeated:   12              ║
╠══════════════════════════════════════╣
║  💡 Tip: Answer more questions      ║
║     correctly to earn money!         ║
║                                      ║
║        [ TRY AGAIN ]                 ║
╚══════════════════════════════════════╝
```

### Stats to Track (for DEV)

```javascript
const GameStats = {
  wavesCompleted: 0,
  totalWaves: 5,
  questionsAnswered: 0,
  questionsCorrect: 0,
  questionsWrong: 0,
  questionsTimeout: 0,
  moneyEarned: 0,
  moneyLost: 0,
  finalMoney: 0,
  plantsPlaced: 0,
  zombiesKilled: 0,
  gameResult: 'playing' // 'victory' | 'defeat'
};
```

### Defeat Tips (Random)
Show one random tip on defeat:
1. "Answer questions correctly to earn money for plants!"
2. "Each wrong answer costs you 30 money!"
3. "Cover all lanes with plants to stop zombies!"
4. "Faster answers = more time for strategy!"
5. "Don't let zombies reach your house!"

---

## 4. Game Balance Summary

### Target Difficulty
- **First attempt win rate**: 20-30%
- **After 3 attempts**: 60-70%
- **Skilled player**: 90%+

### Balance Levers (for S3-004 tuning)

| Parameter | Min | Default | Max | Effect |
|-----------|-----|---------|-----|--------|
| Zombie HP | 8 | 10 | 15 | Easier ← → Harder |
| Zombie Speed | 6s/tile | 5s/tile | 4s/tile | Easier ← → Harder |
| Fire Rate | 1.0s | 1.5s | 2.0s | Easier ← → Harder |
| Question Interval | 15s | 12s | 8s | Easier ← → Harder |
| Time Limit | 15s | 12s | 8s | Easier ← → Harder |
| Wrong Penalty | -20 | -30 | -50 | Easier ← → Harder |

---

## Summary

| Area | Key Recommendation |
|------|-------------------|
| Wave curve | 3→5→7→9→12 zombies, speed increases 10%/wave |
| Question timing | Every 10-15 sec, 12 sec time limit, panic triggers |
| Victory stats | 7 metrics: waves, questions, accuracy, money, plants, kills |
| Defeat screen | Stats + random tip + try again |

---

**GD Status**: Design specs complete. Ready for DEV implementation.
