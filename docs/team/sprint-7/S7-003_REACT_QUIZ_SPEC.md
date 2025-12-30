# Technical Spec: S7-003 React Quiz Side-Panel

**Author:** TL
**Date:** 2025-12-30
**Status:** Ready for Implementation

---

## Overview

Replace Phaser quiz overlay with React side-panel. Game always visible during quiz.

**Problem:** Current quiz overlay blocks game view. Player can't see zombies advancing while answering questions, causing frustration and unfair losses.

**Solution:** Side-by-side layout with Phaser game (70%) on left, React quiz panel (30%) on right.

---

## Requirements

### R1: Layout
- Game canvas takes 70% of viewport width (left side)
- Quiz panel takes 30% of viewport width (right side)
- Both sections are always visible
- Responsive: minimum game width 560px, minimum quiz width 240px

### R2: Quiz Panel Content
- Money display (current balance)
- Wave info (current/total)
- Question area (when quiz active)
- Answer buttons (4 options, A/B/C/D)
- Feedback display (correct/wrong + explanation)

### R3: Event Bridge
- Phaser emits events to React
- React emits answer back to Phaser
- No direct coupling between Phaser and React code

### R4: Quiz Flow
- Quiz appears in right panel (no overlay on game)
- Game continues running while quiz is displayed
- Player can see game while answering
- Answer submission sends result back to game

### R5: Styling
- Child-friendly UI (ages 8-12)
- Large buttons (minimum 48px touch target)
- Clear visual feedback (correct=green, wrong=red)
- Vietnamese text support

---

## Acceptance Criteria

### AC1: Layout Structure
- [ ] Browser shows 70/30 split layout
- [ ] Phaser game renders in left container (70% width)
- [ ] React panel renders in right container (30% width)
- [ ] Game is fully playable (plant placement, zombie movement)
- [ ] No horizontal scrollbar on standard viewport (1280px+)

### AC2: Money Display
- [ ] Shows current money balance
- [ ] Updates in real-time when money changes
- [ ] Format: "$XXX" or "XXX gold"

### AC3: Wave Display
- [ ] Shows current wave number
- [ ] Shows total waves
- [ ] Format: "Wave X/5"
- [ ] Updates when wave advances

### AC4: Quiz Display
- [ ] Question text displays in panel
- [ ] 4 answer buttons visible (A, B, C, D)
- [ ] Buttons are clickable
- [ ] Vietnamese text renders correctly

### AC5: Answer Submission
- [ ] Clicking answer button submits answer
- [ ] Correct answer shows green feedback
- [ ] Wrong answer shows red feedback
- [ ] Explanation displays after answer
- [ ] "Continue" button dismisses quiz

### AC6: Event Bridge
- [ ] `quiz:show` event displays question in React
- [ ] `money:update` event updates money display
- [ ] `wave:update` event updates wave display
- [ ] `quiz:answer` event sends answer to Phaser
- [ ] No console errors during event flow

### AC7: Game Continuity
- [ ] Zombies continue moving during quiz
- [ ] Plants continue firing during quiz
- [ ] Player can see zombie positions while answering
- [ ] Game does NOT pause during quiz

### AC8: Phaser Cleanup
- [ ] QuizUIManager no longer creates Phaser UI elements
- [ ] No quiz overlay rendered in Phaser canvas
- [ ] Game scene uses events instead of direct quiz calls

---

## Technical Approach

### File Structure

```
src/
├── index.html               # MODIFY - add React root
├── main.jsx                 # NEW - React entry point
├── App.jsx                  # NEW - Layout container
├── App.css                  # NEW - Layout styles
├── components/              # NEW - React components
│   ├── QuizPanel.jsx        # Quiz container
│   ├── QuizPanel.css
│   ├── MoneyDisplay.jsx     # Money counter
│   ├── WaveInfo.jsx         # Wave progress
│   ├── QuestionCard.jsx     # Question + answers
│   └── AnswerButton.jsx     # Single answer button
├── hooks/
│   └── useGameBridge.js     # NEW - Phaser↔React events
├── phaser/                  # MOVE existing Phaser code
│   └── main.js
├── scenes/
│   └── GameScene.js         # MODIFY - emit events
└── ui/
    └── QuizUIManager.js     # MODIFY - remove Phaser UI
```

### Event Definitions

| Event | Direction | Payload |
|-------|-----------|---------|
| `quiz:show` | Phaser → React | `{ question, answers, correctIndex }` |
| `quiz:answer` | React → Phaser | `{ selectedIndex, isCorrect }` |
| `money:update` | Phaser → React | `number` (current money) |
| `wave:update` | Phaser → React | `{ current, total }` |
| `game:over` | Phaser → React | `{ won, stats }` |

### React Component Tree

```
<App>
  <div className="game-container">      <!-- 70% -->
    <PhaserGame ref={gameRef} />
  </div>
  <div className="quiz-container">      <!-- 30% -->
    <QuizPanel>
      <MoneyDisplay money={200} />
      <WaveInfo current={1} total={5} />
      <QuestionCard
        question={...}
        onAnswer={handleAnswer}
      />
    </QuizPanel>
  </div>
</App>
```

### CSS Layout

```css
.app-container {
  display: flex;
  width: 100vw;
  height: 100vh;
}

.game-container {
  flex: 7;
  min-width: 560px;
}

.quiz-container {
  flex: 3;
  min-width: 240px;
  background: #2a2a3e;
  padding: 16px;
}
```

### Implementation Steps

1. **Setup React** (30 min)
   - Add React dependencies to package.json
   - Create main.jsx entry point
   - Update vite.config.js if needed

2. **Create Layout** (30 min)
   - App.jsx with flex container
   - Mount Phaser in left div
   - Empty quiz panel on right

3. **Build Quiz Components** (1 hr)
   - MoneyDisplay.jsx
   - WaveInfo.jsx
   - QuestionCard.jsx
   - AnswerButton.jsx

4. **Create Event Bridge** (30 min)
   - useGameBridge.js hook
   - Test event emission/reception

5. **Modify GameScene** (1 hr)
   - Add event emissions
   - Remove QuizUIManager UI calls
   - Keep quiz logic, remove Phaser rendering

6. **Integration Testing** (30 min)
   - Verify events flow correctly
   - Test quiz interaction
   - Verify game continuity

### Dependencies to Add

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
```

---

## Testing Notes

### For DEV (TDD)
- Write component tests for QuizPanel, MoneyDisplay, WaveInfo
- Test useGameBridge hook with mock events
- Test event payloads match spec

### For QA (Black-box)
- Use AC1-AC8 as test checklist
- Test on different viewport sizes
- Test Vietnamese question content
- Verify game doesn't pause during quiz

---

## Risks and Mitigations

| Risk | Mitigation |
|------|------------|
| Phaser/React timing issues | Use React refs for game instance |
| Event memory leaks | Cleanup listeners in useEffect return |
| Layout breaks on small screens | Set minimum widths, test responsive |

---

## Definition of Done

- [ ] All AC1-AC8 pass
- [ ] No console errors
- [ ] Tests pass (existing + new)
- [ ] Game playable from Wave 1-5
- [ ] TL code review approved
- [ ] QA testing passed
