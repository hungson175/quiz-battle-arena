# Sprint 1: Core Mechanics

**Sprint Number**: 1
**Sprint Name**: Core Mechanics
**Created**: 2025-12-17
**Milestone**: M1 - Core MVP (Playable Game)
**Status**: 🟡 In Progress
**Assigned To**: FE (Frontend Developer)
**Estimated Duration**: 1-1.5 weeks

---

## Sprint Goal

Implement the foundational game mechanics that allow a player to answer a single question, receive immediate feedback, and see their score. This proves the core interaction loop works before building the full game session.

**One-Sentence Goal**: Player can answer 1 question, see if they're correct/wrong, and see their score update.

---

## Milestone Alignment

**Current Milestone**: M1 - Core MVP (Playable Game)
**Milestone Progress**: Sprint 1 of 3 (Sprints 1-3 complete M1)
**Previous Milestone**: M0 - Project Setup & Foundation ✅ Complete

**M1 Goal**: Deliver a PLAYABLE core game loop - the minimum experience that proves the concept works

---

## Deliverables

### 1. Question Display System (FR-001)
**Description**: Display a question from questions.json at the top of the game screen

**Requirements**:
- Load questions from `src/data/questions.json` (15 Vietnamese questions created in M0)
- Parse JSON structure: `{ id, subject, question, answers[], correctIndex, explanation }`
- Display question text in readable format (large font, clear contrast)
- Position: Top-center of game canvas
- Support Vietnamese text (UTF-8 encoding)

**Success Criteria**:
- Question text displays correctly without encoding issues
- Text is readable (font size 20-24px minimum)
- Question loads from first index (questions[0]) for MVP

---

### 2. Four Target System (FR-002)

**Description**: Display 4 targets/robots showing the 4 answer choices, arranged in a 2x2 grid

**Requirements**:
- Create 4 clickable target objects (Phaser sprites or shapes)
- Position targets in 2x2 grid layout (centered on screen, below question)
- Display answer text on each target (answers[0] through answers[3])
- **GD Rec #1**: Implement forgiving click detection
  - Click detection area extends 5-10px beyond visible target boundary
  - Makes clicking easier for younger children (ages 8-12)
  - See GD's design.md for exact implementation specs

**Visual Requirements** (Placeholders for Sprint 1):
- Use colored rectangles or circles (no custom sprites yet)
- Target colors: Red, Blue, Green, Yellow (distinct for visibility)
- Size: ~100x100px minimum (large enough for child hands)
- Answer text: Font size 16-18px, centered on target

**Interaction**:
- Targets respond to mouse click (desktop) or tap (mobile prep)
- Only one target can be clicked per question (disable others after click)
- Visual hover state (optional for Sprint 1, nice-to-have)

**Success Criteria**:
- All 4 answers display on separate targets
- Clicking a target triggers answer validation
- Click detection works reliably (forgiving area implemented)
- Vietnamese text displays correctly on targets

---

### 3. Answer Validation (FR-003)

**Description**: Check if clicked answer is correct and provide immediate feedback

**Requirements**:
- Compare clicked target index with question.correctIndex
- If correct:
  - Visual feedback: Target explodes (simple particle effect or color change)
  - Audio feedback: Cheerful sound (placeholder beep acceptable)
  - Award +100 base points
- If wrong:
  - Visual feedback: Error spark effect (red flash or shape)
  - Audio feedback: Friendly boop (not harsh/punishing)
  - Award +25 Learning Points (GD Rec #2)
  - Display supportive message: "Not quite! But you learned something valuable!" (GD Rec #2)
  - Show explanation text for 3 seconds

**GD Rec #2 Implementation**:
- Positive reinforcement even for wrong answers
- Messages rotate: "Great effort!", "You're learning!", "Keep going!", etc.
- Explanation text from question.explanation field
- No harsh sounds or visuals (child-friendly)

**Success Criteria**:
- Correct answer awards 100 points, shows positive feedback
- Wrong answer awards 25 points, shows supportive message + explanation
- Feedback is immediate (no delay)
- Messages are encouraging, not discouraging

---

### 4. Score Tracking System (FR-004)

**Description**: Track and display player's score in real-time

**Requirements**:
- Initialize score at 0 when game starts
- Award points based on answer validation:
  - Correct: +100 base points
  - Wrong: +25 Learning Points
- Display score on HUD (Heads-Up Display)
  - Position: Top-left corner
  - Format: "Score: XXXX"
  - Font size: 18-20px
  - Updates immediately after each answer

**GD Rec #3 Integration** (Deferred to Sprint 2):
- Milestone celebrations at 5, 10, 15, 20 questions (Sprint 2)
- Sprint 1 focuses on base scoring only

**Success Criteria**:
- Score starts at 0
- Score increases by 100 for correct answers
- Score increases by 25 for wrong answers
- Score display updates in real-time
- Score persists for the single question (full persistence in Sprint 2)

---

### 5. Unit Tests (5 minimum)

**Description**: Write automated tests for core game logic

**Required Tests**:
1. **Question Loading**: Verify questions.json loads correctly
2. **Answer Validation - Correct**: Correct answer awards 100 points
3. **Answer Validation - Wrong**: Wrong answer awards 25 points
4. **Score Calculation**: Score accumulates correctly
5. **Click Detection**: Forgiving click area works (boundary tests)

**Testing Framework**: Jest (configured in M0)

**Success Criteria**:
- All 5 tests pass (100% pass rate)
- Tests run via `npm test`
- No console errors during test execution

---

## Technical Specifications

### Technology Stack
- **Game Framework**: Phaser 3.70.0
- **Build Tool**: Vite 5.0.0 (dev server on port 3335)
- **Testing**: Jest 29.7.0
- **Language**: JavaScript ES6+

### File Structure
```
src/
├── scenes/
│   └── GameScene.js          # Main game scene (Sprint 1 focus)
├── components/
│   ├── Question.js           # Question display component
│   ├── Target.js             # Target/answer component
│   └── ScoreDisplay.js       # Score HUD component
├── utils/
│   ├── questionLoader.js     # Load/parse questions.json
│   └── scoreManager.js       # Score calculation logic
├── data/
│   └── questions.json        # 15 Vietnamese questions (from M0)
└── main.js                   # Phaser game config

tests/
├── questionLoader.test.js
├── scoreManager.test.js
└── answerValidation.test.js
```

### Data Format (questions.json)
```json
[
  {
    "id": 1,
    "subject": "Lịch sử",
    "question": "Sông nào được coi là cái nôi của nền văn minh Ai Cập cổ đại?",
    "answers": ["Sông Nin", "Sông Lưỡng Hà", "Sông Hoàng Hà", "Sông Amazon"],
    "correctIndex": 0,
    "explanation": "Sông Nin (Nile) là sông dài nhất thế giới..."
  }
]
```

---

## Design Specifications

**See**: `design.md` (GD will create with detailed specs)

**Key Design Considerations** (from PRD and GD Feedback):
- Child-centric design (ages 8-12): Large targets, clear text, forgiving interactions
- Positive reinforcement: Celebrate effort, not just correctness
- Subject-agnostic: Generic robot theme, no subject-specific graphics
- Vietnamese language support: UTF-8 encoding, appropriate fonts

**GD Recommendations Integrated**:
- ✅ **GD Rec #1**: Forgiving click detection (5-10px grace area)
- ✅ **GD Rec #2**: +25 Learning Points for wrong answers + supportive messages
- ⏸️ **GD Rec #3**: Milestone celebrations (deferred to Sprint 2 - needs multi-question flow)

---

## Definition of Done

**Sprint 1 is complete when**:

### Functional Requirements
- [x] Player can see a question displayed at top of screen
- [x] Player can see 4 answer choices on clickable targets
- [x] Player can click a target to submit answer
- [x] Correct answer: +100 points, positive feedback, visual effect
- [x] Wrong answer: +25 points, supportive message, explanation shown
- [x] Score displays and updates in real-time
- [x] Forgiving click detection implemented (GD Rec #1)

### Quality Requirements
- [x] 5 unit tests written and passing (100% pass rate)
- [x] No console errors during gameplay
- [x] Vietnamese text displays correctly (no encoding issues)
- [x] Code follows project conventions (see README.md)
- [x] Git commits show progressive development (5-8 commits expected)

### Documentation
- [x] Code comments explain key logic (especially forgiving click detection)
- [x] Test files document expected behavior
- [x] Commit messages are clear (e.g., "feat: add question display system")

### Code Review
- [x] CR (Code Reviewer) approves Sprint 1 implementation
- [x] No critical bugs or performance issues
- [x] Ready to merge and proceed to Sprint 2

---

## Success Criteria

**Minimum Viable Sprint 1**:
- ✅ Can answer 1 question from questions.json
- ✅ See immediate feedback (correct or wrong)
- ✅ Score updates (+100 or +25)
- ✅ 5 tests passing

**Ideal Sprint 1** (if time allows):
- ✨ Visual effects polished (smooth explosions, clear error states)
- ✨ Sound effects implemented (cheerful correct, friendly wrong)
- ✨ Hover states on targets (better UX)
- ✨ Question text formatting improved (line breaks, emphasis)

---

## Dependencies

**Blockers**: None - M0 complete, all prerequisites met

**Prerequisites**:
- ✅ M0 complete (dev environment, questions.json, project structure)
- ✅ GD design specs (GD will create design.md before FE starts coding)
- ✅ PRD reference (docs/product/prd.md - sections 5, 6, 10.1)

**External Dependencies**: None

---

## Risk Assessment

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Phaser 3 learning curve for FE | Medium | Medium | PM provides tutorials, GD gives clear specs |
| Vietnamese text encoding issues | Medium | Low | Test early with real data, UTF-8 enforced |
| Click detection too strict for kids | High | Medium | **GD Rec #1 addresses this** - forgiving area |
| Core loop not fun | High | Low | Playtest after Sprint 1, iterate in Sprint 2 |

---

## References

**PRD Sections**:
- Section 5: Core Gameplay Mechanics
- Section 6.1: Scoring System (base scoring only)
- Section 10.1: Phase 1 - Minimum Viable Product

**GD Feedback**:
- docs/product/gd-prd-feedback.md
- Recommendations #1 (forgiving clicks), #2 (learning points), #3 (milestones - Sprint 2)

**Research**:
- docs/research/research-game-research.md (child psychology, gamification)

**M0 Deliverables**:
- src/data/questions.json (15 Vietnamese questions)
- Development environment (Phaser 3, Vite, Jest)

---

## Next Steps After Sprint 1

**Sprint 2: Game Loop & Health**:
- Health system (5 hearts, -1 per wrong answer)
- Question progression (move to next question after answer)
- Game over screen
- **GD Rec #3**: Milestone celebrations (5, 10, 15, 20 questions)

**Sprint 3: UI/UX & Polish**:
- Main menu screen
- Complete HUD
- Sound effects and music
- Visual polish

---

## Notes for FE

**Start Here**:
1. Wait for GD to create design.md with detailed visual/interaction specs
2. Read PRD Section 5 (Core Gameplay Mechanics)
3. Review questions.json structure (src/data/questions.json)
4. Set up GameScene in Phaser 3
5. Implement in this order:
   - Question display (simplest)
   - Targets with answers (visual)
   - Click detection + validation (core logic)
   - Score display (HUD)
   - Tests (prove it works)

**Progressive Development**:
- Commit every 30-60 minutes
- Start with MVP (basic shapes, minimal effects)
- Add polish incrementally (better effects, sounds)
- Run tests frequently (`npm test`)

**Communication**:
- Questions? Ask PM (who will coordinate with GD if design clarification needed)
- Blockers? Report to PM immediately
- Progress? PM will check Git commits regularly

---

**Document Owner**: PM (Project Manager)
**Last Updated**: 2025-12-17
**Status**: 🟡 In Progress - Awaiting GD design specs
