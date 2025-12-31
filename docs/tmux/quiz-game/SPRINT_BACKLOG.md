# Sprint 10 Backlog

**Sprint Goal:** Quiz Tower Defense - Foundation
**Sprint Start:** 2025-12-31
**Sprint End:** TBD (Est. 2.5 days)

---

## Sprint Scope

Clone exact tower defense game from sample_codes/tower-defence/ and add React quiz panel.

**CRITICAL Requirements:**
- Game is EXACT clone - NO modifications to game logic
- Quiz is separate React panel (30% right side)
- Gold ONLY from quiz answers (not enemy kills)
- NO React.StrictMode (breaks Phaser)

**Reference:** `sample_codes/tower-defence/` and `docs/team/sprint-10/TECHNICAL_SPEC.md`

---

## Sprint Items

### [S10-001]: Remove Old Code
**Owner:** DEV
**Status:** TODO
**Priority:** CRITICAL - Must be first

**Tasks:**
- [ ] Remove all files in src/ directory
- [ ] Keep public/assets/data/questions.json (quiz questions)
- [ ] Clean package.json if needed

**Acceptance Criteria:**
- [ ] src/ directory empty except for new code
- [ ] questions.json preserved
- [ ] No old Quiz Battle Arena code remains

---

### [S10-002]: Clone Sample Tower Defense
**Owner:** DEV
**Status:** TODO
**Priority:** CRITICAL - Foundation

**Tasks:**
- [ ] Copy entire sample_codes/tower-defence/src/ to src/
- [ ] Copy sample_codes/tower-defence/public/assets/ to public/assets/
- [ ] Verify game runs exactly as sample (`npm run dev`)
- [ ] Game must work on port 3336

**Acceptance Criteria:**
- [ ] Game loads and plays identically to sample
- [ ] All towers, enemies, waves work
- [ ] No modifications to game logic

---

### [S10-003]: Add React Quiz Panel (70/30 Layout)
**Owner:** DEV
**Status:** TODO
**Priority:** HIGH

**Tasks:**
- [ ] Create 70/30 flex layout (game left, quiz right)
- [ ] Create QuizPanel React component
- [ ] Display question + 4 answer buttons
- [ ] Style quiz panel (readable, child-friendly)
- [ ] NO React.StrictMode in main.jsx

**Acceptance Criteria:**
- [ ] Game renders in 70% left panel
- [ ] Quiz renders in 30% right panel
- [ ] Quiz shows question and 4 clickable answers
- [ ] No StrictMode causing double renders

---

### [S10-004]: Quiz-Only Gold Economy
**Owner:** DEV
**Status:** TODO
**Priority:** HIGH

**Tasks:**
- [ ] Create QuizBridge for Phaser↔React communication
- [ ] Comment out gold from enemy kills in EconomyManager
- [ ] Correct answer: +30 gold via QuizBridge
- [ ] Wrong answer: -10 gold via QuizBridge
- [ ] Display gold in game HUD (existing)

**Acceptance Criteria:**
- [ ] Enemy kills give 0 gold
- [ ] Correct quiz answer: +30 gold
- [ ] Wrong quiz answer: -10 gold
- [ ] Gold displays correctly in game

---

### [S10-005]: Continuous Quiz Auto-Load
**Owner:** DEV
**Status:** TODO
**Priority:** HIGH

**Tasks:**
- [ ] Create QuestionManager to load/manage questions
- [ ] Create QuizManager to handle quiz state
- [ ] Auto-load next question after answer
- [ ] Show brief feedback (correct/wrong) before next question
- [ ] Loop questions when exhausted

**Acceptance Criteria:**
- [ ] Questions load from questions.json
- [ ] Next question appears automatically after answering
- [ ] Visual feedback for correct/wrong (1-2 seconds)
- [ ] Quiz never runs out of questions (loops)

---

## Definition of Done (Sprint Level)

- [ ] Old src/ code removed
- [ ] Tower defense game cloned and working
- [ ] React quiz panel displays (30% right)
- [ ] Gold ONLY from quiz answers
- [ ] Continuous quiz with auto-load
- [ ] NO React.StrictMode
- [ ] TL code review approved
- [ ] QA visual verification passed
- [ ] Game runs on port 3336
- [ ] Pushed to remote before Boss review
- [ ] Run with `npm run dev -- --host` for Boss review

---

## Progress Tracking

| Item | Status | Owner | Notes |
|------|--------|-------|-------|
| S10-001 | **DONE** ✅ | DEV | Remove old code (49bf0e3) |
| S10-002 | **DONE** ✅ | DEV | Clone sample + 70/30 layout (49bf0e3) |
| S10-003 | **DONE** ✅ | DEV | React quiz panel (e3b83f6) |
| S10-004 | **DONE** ✅ | DEV | Quiz-only gold (e3b83f6) |
| S10-005 | **DONE** ✅ | DEV | Continuous quiz (e3b83f6) |

**ALL ITEMS COMPLETE**
- ✅ TL Code Review: APPROVED
- ✅ QA Visual Verification: PASSED
- ⏳ PO Acceptance: PENDING

**Note:** Old unit tests need cleanup (expected after project pivot) - added to backlog

---

## Technical Notes

**Communication Pattern (Phaser↔React):**
```javascript
// React → Phaser (gold change)
window.dispatchEvent(new CustomEvent('quiz-answer', {
  detail: { correct: true, goldChange: 30 }
}));

// Phaser listens
window.addEventListener('quiz-answer', (e) => {
  this.economy.addGold(e.detail.goldChange);
});
```

**No StrictMode:**
```jsx
// main.jsx - NO StrictMode wrapper
createRoot(document.getElementById('root')).render(<App />);
```

---

## Notes

- Reference TECHNICAL_SPEC v3.0 for implementation details
- Reference GAME_DESIGN_SPEC for quiz behavior
- DON'T TOUCH THE GAME - quiz is separate layer
- Test game works BEFORE adding quiz
