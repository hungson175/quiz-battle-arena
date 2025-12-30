# Quiz Tower Defense - Technical Implementation Plan

**Sprint:** 10
**Author:** TL
**Date:** 2025-12-30
**Status:** FINAL - React Architecture
**Revision:** 3.0

---

## Executive Summary

Build Quiz Tower Defense by cloning `sample_codes/tower-defence/` **EXACTLY AS-IS** with only **2 changes**:

1. **Remove gold from enemy kills** - Comment out reward in EconomyManager
2. **Add React quiz panel** - Side panel (30%) for continuous quizzes

**CRITICAL: The game is an EXACT clone. NO modifications to:**
- Tower types, stats, or behavior
- Enemy types, stats, or behavior
- Wave progression or timing
- Combat mechanics
- Maps or UI elements
- Any existing game logic

This is MUCH simpler than v2.0 - we don't touch the game at all!

---

## 1. Architecture Overview

### 1.1 Layout (70/30 Split)

```
┌─────────────────────────────────────────────────────────────────┐
│                        Browser Window                            │
├─────────────────────────────────────┬───────────────────────────┤
│                                     │                           │
│     PHASER GAME (70%)               │   REACT QUIZ (30%)        │
│                                     │                           │
│   - Exact clone of tower-defence    │   - Question text         │
│   - No modifications                │   - 4 answer buttons      │
│   - Only change: no kill rewards    │   - Gold display          │
│                                     │   - Streak counter        │
│                                     │   - Result feedback       │
│                                     │                           │
└─────────────────────────────────────┴───────────────────────────┘
```

### 1.2 Technology Stack

| Component | Technology | Notes |
|-----------|------------|-------|
| Game | Phaser 3 | Exact clone of sample project |
| Quiz UI | React | Separate from Phaser |
| Communication | Custom Events | window.dispatchEvent / addEventListener |
| Styling | CSS/Tailwind | Quiz panel styling |

---

## 2. Communication Bridge (Phaser ↔ React)

### 2.1 Event Types

| Event | Direction | Payload | Description |
|-------|-----------|---------|-------------|
| `quiz:show` | Phaser → React | `{ question, streak, gold }` | Display new question |
| `quiz:answer` | React → Phaser | `{ answerIndex }` | Player selected answer |
| `quiz:result` | Phaser → React | `{ correct, correctIndex, goldChange, streak, gold }` | Show result |
| `game:goldUpdate` | Phaser → React | `{ gold }` | Gold changed (sync display) |

### 2.2 Implementation

**Phaser side (QuizBridge.js):**
```javascript
// Emit events to React
export function emitToReact(eventName, data) {
  window.dispatchEvent(new CustomEvent(eventName, { detail: data }));
}

// Listen for events from React
export function listenFromReact(eventName, callback) {
  window.addEventListener(eventName, (e) => callback(e.detail));
}
```

**React side (useQuizEvents.js):**
```javascript
import { useEffect, useState } from 'react';

export function useQuizEvents() {
  const [question, setQuestion] = useState(null);
  const [result, setResult] = useState(null);
  const [gold, setGold] = useState(100);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const handleShow = (e) => {
      setQuestion(e.detail.question);
      setStreak(e.detail.streak);
      setGold(e.detail.gold);
      setResult(null);
    };

    const handleResult = (e) => {
      setResult(e.detail);
      setGold(e.detail.gold);
      setStreak(e.detail.streak);
    };

    window.addEventListener('quiz:show', handleShow);
    window.addEventListener('quiz:result', handleResult);

    return () => {
      window.removeEventListener('quiz:show', handleShow);
      window.removeEventListener('quiz:result', handleResult);
    };
  }, []);

  const submitAnswer = (answerIndex) => {
    window.dispatchEvent(new CustomEvent('quiz:answer', {
      detail: { answerIndex }
    }));
  };

  return { question, result, gold, streak, submitAnswer };
}
```

---

## 3. New Components

### 3.1 QuestionManager (src/systems/QuestionManager.js)

**Purpose:** Load, shuffle, and serve questions continuously

```javascript
export default class QuestionManager {
  constructor() {
    this.questions = [];
    this.currentIndex = 0;
  }

  async loadFromFile(path) {
    const response = await fetch(path);
    const data = await response.json();
    this.questions = data.questions;
    this.shuffle();
  }

  shuffle() {
    for (let i = this.questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
    }
  }

  getNextQuestion() {
    if (this.currentIndex >= this.questions.length) {
      this.currentIndex = 0;
      this.shuffle();
    }
    return this.questions[this.currentIndex++];
  }
}
```

### 3.2 QuizManager (src/systems/QuizManager.js)

**Purpose:** Orchestrate quiz flow, handle answers, update economy

```javascript
import { emitToReact, listenFromReact } from './QuizBridge';

export default class QuizManager {
  constructor(questionManager, economyManager) {
    this.questionManager = questionManager;
    this.economyManager = economyManager;
    this.currentQuestion = null;
    this.streak = 0;
    this.correctReward = 30;
    this.wrongPenalty = 10;
    this.resultDisplayTime = 1500;

    // Listen for answers from React
    listenFromReact('quiz:answer', (data) => {
      this.handleAnswer(data.answerIndex);
    });
  }

  start() {
    this.showNextQuestion();
  }

  showNextQuestion() {
    this.currentQuestion = this.questionManager.getNextQuestion();
    emitToReact('quiz:show', {
      question: this.currentQuestion,
      streak: this.streak,
      gold: this.economyManager.getMoney()
    });
  }

  handleAnswer(answerIndex) {
    const isCorrect = answerIndex === this.currentQuestion.correctIndex;

    if (isCorrect) {
      this.economyManager.addMoney(this.correctReward);
      this.streak++;
    } else {
      this.economyManager.spendMoney(this.wrongPenalty);
      this.streak = 0;
    }

    emitToReact('quiz:result', {
      correct: isCorrect,
      correctIndex: this.currentQuestion.correctIndex,
      goldChange: isCorrect ? this.correctReward : -this.wrongPenalty,
      streak: this.streak,
      gold: this.economyManager.getMoney()
    });

    // Auto-advance after delay
    setTimeout(() => this.showNextQuestion(), this.resultDisplayTime);
  }
}
```

### 3.3 QuizBridge (src/systems/QuizBridge.js)

**Purpose:** Bridge between Phaser and React via window events

```javascript
// Emit event to React
export function emitToReact(eventName, data) {
  window.dispatchEvent(new CustomEvent(eventName, { detail: data }));
}

// Listen for event from React
export function listenFromReact(eventName, callback) {
  window.addEventListener(eventName, (e) => callback(e.detail));
}
```

### 3.4 React QuizPanel Component (src/components/QuizPanel.jsx)

**Purpose:** React component for quiz display

```jsx
import React from 'react';
import { useQuizEvents } from '../hooks/useQuizEvents';

export default function QuizPanel() {
  const { question, result, gold, streak, submitAnswer } = useQuizEvents();

  if (!question) {
    return <div className="quiz-panel loading">Loading quiz...</div>;
  }

  return (
    <div className="quiz-panel">
      <h2>QUIZ</h2>

      <div className="question">
        {question.question}
      </div>

      <div className="answers">
        {question.answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => submitAnswer(index)}
            disabled={result !== null}
            className={
              result !== null
                ? index === result.correctIndex
                  ? 'correct'
                  : 'disabled'
                : ''
            }
          >
            {answer}
          </button>
        ))}
      </div>

      {result && (
        <div className={`result ${result.correct ? 'correct' : 'wrong'}`}>
          {result.correct ? '+30 Gold!' : '-10 Gold'}
        </div>
      )}

      <div className="stats">
        <div className="gold">Gold: ${gold}</div>
        <div className="streak">Streak: {streak}</div>
      </div>
    </div>
  );
}
```

---

## 4. Integration (Minimal Changes)

### 4.1 EconomyManager - ONLY Change to Game

**File:** `src/systems/EconomyManager.js`

**Change:** Comment out ONE line

```javascript
// In handleEnemyDeath or onEnemyKilled:
// BEFORE:
this.addMoney(enemy.reward);

// AFTER:
// this.addMoney(enemy.reward);  // REMOVED - Gold only from quizzes
```

**This is the ONLY modification to existing game code!**

### 4.2 Entry Point (index.js or App.jsx)

**Add:** Mount both Phaser and React side by side

```jsx
// App.jsx
import React, { useEffect } from 'react';
import QuizPanel from './components/QuizPanel';

function App() {
  useEffect(() => {
    // Initialize Phaser game in the game container
    // Phaser config should target '#game-container'
    import('./game').then(module => module.initGame());
  }, []);

  return (
    <div className="app-container">
      <div id="game-container" style={{ width: '70%' }}></div>
      <QuizPanel />
    </div>
  );
}
```

### 4.3 Game Initialization

**Add:** Initialize QuizManager after game starts

```javascript
// In GameScene.js create() or a new init file
import QuestionManager from './systems/QuestionManager';
import QuizManager from './systems/QuizManager';

// After EconomyManager is initialized:
const questionManager = new QuestionManager();
await questionManager.loadFromFile('assets/data/questions.json');

const quizManager = new QuizManager(questionManager, this.economyManager);
quizManager.start();
```

---

## 5. File Structure

### 5.1 New Files (6 total)

| File | Purpose |
|------|---------|
| `src/systems/QuestionManager.js` | Question loading/shuffling |
| `src/systems/QuizManager.js` | Quiz orchestration |
| `src/systems/QuizBridge.js` | Phaser ↔ React events |
| `src/components/QuizPanel.jsx` | React quiz UI |
| `src/hooks/useQuizEvents.js` | React event hook |
| `public/assets/data/questions.json` | Question bank |

### 5.2 Modified Files (2 total)

| File | Change |
|------|--------|
| `src/systems/EconomyManager.js` | Comment out 1 line (kill reward) |
| `src/index.js` or `App.jsx` | Mount React + Phaser side by side |

---

## 6. Implementation Phases

### Phase 1: Setup (0.5 day)
- [ ] Clone tower-defence to project
- [ ] Set up React alongside Phaser (70/30 layout)
- [ ] Verify game runs unchanged

### Phase 2: Quiz System (1 day)
- [ ] Create QuestionManager
- [ ] Create QuizManager
- [ ] Create QuizBridge
- [ ] Create questions.json (30+ questions)

### Phase 3: React Panel (0.5 day)
- [ ] Create QuizPanel component
- [ ] Create useQuizEvents hook
- [ ] Style the quiz panel

### Phase 4: Integration (0.5 day)
- [ ] Comment out kill reward in EconomyManager
- [ ] Initialize QuizManager in game
- [ ] Test full flow

**Total Estimated Effort: 2.5 days**

---

## 7. Acceptance Criteria

- [ ] Game is EXACT clone of sample project (verify visually)
- [ ] No gold from enemy kills
- [ ] Quiz panel visible on right (30% width)
- [ ] Questions auto-load on game start
- [ ] Correct answer = +30 gold
- [ ] Wrong answer = -10 gold
- [ ] Next question loads 1.5s after answer
- [ ] Streak counter works
- [ ] Gold display syncs with game

---

## 8. Definition of Done

- [ ] Game unchanged (only kill reward removed)
- [ ] React quiz panel functional
- [ ] Event bridge working
- [ ] 30+ questions in JSON
- [ ] TL code review approved
- [ ] QA testing passed
- [ ] Boss demo approved

---

## 9. Key Principles

1. **DON'T TOUCH THE GAME** - Clone exactly, only remove kill reward
2. **React for UI** - Quiz panel is 100% React, not Phaser
3. **Event Bridge** - Clean separation via window events
4. **Minimal Changes** - Less code = fewer bugs

---

**Approved by:**
- [ ] TL (Technical Lead)
- [ ] GD (Game Designer)
- [ ] SM (Scrum Master)
- [ ] PO (Product Owner)
