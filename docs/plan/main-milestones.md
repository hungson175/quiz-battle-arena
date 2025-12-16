# Main Milestones - Quiz Battle Arena

**Project**: Educational Quiz Game (Subject-Agnostic)
**Last Updated**: 2025-12-17 01:40
**Current Milestone**: M0 - Project Setup
**Overall Progress**: 5% (M0 Started - BOSS Approved)

---

## Milestone Overview

| Milestone | Name | Sprints | Duration | Status |
|-----------|------|---------|----------|--------|
| **M0** | Project Setup & Foundation | Pre-Sprint | 1 week | 🟡 In Progress |
| **M1** | Core MVP - Playable Game | Sprint 1-3 | 3-4 weeks | ⚪ Pending |
| **M2** | Polish & Enhancements | Sprint 4-6 | 4-5 weeks | ⚪ Pending |
| **M3** | Advanced Features | Sprint 7-9 | 4-5 weeks | ⚪ Pending |
| **M4** | Production Ready | Sprint 10+ | 2-3 weeks | ⚪ Pending |

**Total Estimated Timeline**: 14-18 weeks (~3.5-4.5 months)

---

## Progressive Development Philosophy

**Core Principle**: Ship working software incrementally. Each milestone delivers VALUE that can be tested, demonstrated, and potentially deployed.

**Key Rules**:
1. **No big bang releases** - Deploy playable versions at end of each milestone
2. **Test with real users** - Get feedback after M1 (MVP), M2 (Polish), M3 (Advanced)
3. **Subject-agnostic validation** - Test with 3+ subjects at each milestone
4. **Git commits prove progress** - Frequent commits (30-60 min) show incremental work
5. **Working software > comprehensive docs** - Prioritize playable game over perfect specs

---

## Milestone M0: Project Setup & Foundation

**Goal**: Establish development environment, tooling, and project structure before first sprint

**Duration**: 1 week
**Status**: 🟡 In Progress (Started: 2025-12-17 01:40)
**Owner**: PM + FE + GD

### Deliverables

#### 1. Git Repository Setup
- [ ] Initialize Git repository
- [ ] Create `.gitignore` (node_modules, .env, build artifacts)
- [ ] Set up branch strategy (main, feature branches)
- [ ] First commit: "Initial project setup"

#### 2. Development Environment
- [ ] Install Node.js and npm
- [ ] Install Phaser 3 (via npm)
- [ ] Install Vite (build tool)
- [ ] Install Jest (testing framework)
- [ ] Verify environment: `npm run dev` works

#### 3. Project Structure
- [ ] Create folder structure:
  ```
  src/
    ├── scenes/
    ├── components/
    ├── utils/
    ├── assets/
    └── main.js
  tests/
  docs/
  ```
- [ ] Create basic HTML entry point
- [ ] Configure Vite for Phaser 3

#### 4. Asset Pipeline Setup (MCP Integration)
- [ ] **NOT IN M0** - Asset generation deferred to M2 (Polish phase)
- [ ] Use placeholder graphics in M1 (colored shapes, basic sprites)
- [ ] Document MCP installation plan for M2

**Rationale**: Progressive development means we start with placeholders and upgrade to professional assets in Phase 2 when game mechanics are proven.

#### 5. Sample Question Data
- [ ] Create `questions.json` with 15 test questions **IN VIETNAMESE**
  - 5 history questions (extracted from data/output/DC_lichsu.md - Vietnamese history)
  - 5 math questions (arithmetic - Vietnamese language)
  - 5 literature questions (book characters - Vietnamese language)
- [ ] Validates subject-agnostic design from day 1
- [ ] **CRITICAL**: Game is Vietnamese language, sample must be Vietnamese

#### 6. Documentation
- [ ] README.md (setup instructions, how to run)
- [ ] Architecture overview (Phaser scenes, component structure)
- [ ] Contribution guidelines

### Success Criteria
- ✅ FE can run `npm run dev` and see blank Phaser canvas
- ✅ FE can run `npm test` and see 0/0 tests passing
- ✅ Git repository has 3+ commits showing progressive setup
- ✅ 15 test questions load without errors

### Exit Gate
**PM Checklist Before M1**:
- [ ] Development environment working on FE's machine
- [ ] Project structure matches technical architecture (PRD Section 9.2)
- [ ] Sample questions validate subject-agnostic approach
- [ ] GD has reviewed and approved placeholder graphics approach

---

## Milestone M1: Core MVP - Playable Game

**Goal**: Deliver a PLAYABLE core game loop - the minimum experience that proves the concept works

**Duration**: 3-4 weeks (Sprint 1-3)
**Status**: ⚪ Pending
**Owner**: FE (implementation), GD (design specs), CR (review)

### Reference
**PRD Section**: Phase 1 (Section 10.1)
**GD Feedback**: Recommendations #1, #2, #3 (MVP enhancements)

### Deliverables

#### Sprint 1: Core Mechanics (Week 1-1.5)
- [ ] Question display system (FR-001)
- [ ] 4 target system with answer text (FR-002)
  - **Includes GD Rec #1**: Forgiving click detection (5-10px grace area)
- [ ] Basic answer validation (FR-003)
- [ ] Score tracking (base 100 points correct, 25 points learning)
  - **Includes GD Rec #2**: +25 Learning Points for wrong answers
  - **Includes GD Rec #2**: Supportive messages ("Not quite! But you learned something valuable!")
- [ ] Tests: 5 unit tests for game logic

**Deliverable**: Can answer 1 question, see score, get feedback

#### Sprint 2: Game Loop & Health (Week 2-2.5)
- [ ] Health system (5 hearts, -1 per wrong answer) (FR-005)
- [ ] Question progression (load next question after answer)
- [ ] Game over screen (0 health or questions exhausted) (FR-006)
  - Display final score, correct/incorrect count
  - "Try Again" and "Main Menu" buttons
- [ ] **NEW - GD Rec #3**: Milestone celebrations
  - Celebrations at 5, 10, 15, 20 questions answered
  - Messages: "Quarter Way! 🎯", "Halfway Champion! 🏆", etc.
- [ ] Tests: 10 total unit tests

**Deliverable**: Can play full game session from start to game over

#### Sprint 3: UI/UX & Polish (Week 3-4)
- [ ] Main menu screen (FR-009)
  - "Play" button, "How to Play" button, game title
- [ ] HUD (Heads-Up Display) (FR-010)
  - Score counter (top-left)
  - Health hearts (top-right)
  - Question text box (top-center)
- [ ] Basic sound effects (FR-003)
  - Correct answer: cheerful chime
  - Wrong answer: friendly boop (not harsh)
- [ ] Visual feedback
  - Target explosion on correct (simple particle effect)
  - Error spark on wrong (red effect)
- [ ] Explanation text display (3 seconds on wrong answer)
- [ ] Tests: 15 total unit tests

**Deliverable**: Complete playable experience with UI and audio feedback

### Asset Strategy for M1
**Graphics**: Use PLACEHOLDERS
- Targets: Colored rectangles or circles (no custom sprites yet)
- Background: Solid color or simple gradient
- UI elements: Basic shapes and text

**Rationale**: Progressive development means we validate game mechanics BEFORE investing in professional assets. If core loop isn't fun with placeholders, fancy graphics won't fix it.

**MCP Assets**: Deferred to M2 (Phase 2: Polish)

### Success Criteria
- ✅ 15 questions playable end-to-end (5 history, 5 math, 5 literature)
- ✅ All FR-001 through FR-006 functional requirements met
- ✅ GD Recommendations #1, #2, #3 implemented (forgiving clicks, learning points, milestones)
- ✅ 15+ unit tests passing (100% pass rate)
- ✅ No crashes during normal gameplay
- ✅ Subject-agnostic: Swapping questions.json works without code changes
- ✅ Game runs in Chrome 90+, Firefox 85+, Safari 14+
- ✅ Average session: 5-10 minutes (playtest validation)

### Exit Gate - PM Review
**PM Must Verify**:
1. **Progressive Commits**:
   - 10+ Git commits showing incremental development
   - Commits every 30-60 minutes of work
   - Clear commit messages (e.g., "feat: add scoring system")

2. **Subject-Agnostic Validation**:
   - Test with history questions → works
   - Swap to math questions → works without code changes
   - Swap to literature questions → works without code changes

3. **Playtest Results**:
   - 2-3 users (target age 8-12) play for 10 minutes
   - Collect feedback: Is it fun? Is it clear? What's confusing?

4. **CR Code Review**:
   - CR approves code quality
   - No critical bugs
   - Tests comprehensive

5. **Alignment with Milestones**:
   - All M1 deliverables complete
   - Ready to proceed to M2

**Blocker Resolution**: If any item fails, resolve before M2

---

## Milestone M2: Polish & Enhancements

**Goal**: Transform MVP into a POLISHED game with professional visuals, animations, and advanced mechanics

**Duration**: 4-5 weeks (Sprint 4-6)
**Status**: ⚪ Pending
**Owner**: FE + GD (robot designs)

### Reference
**PRD Section**: Phase 2 (Section 10.2)
**GD Feedback**: Recommendations #4, #5 (combo feedback, near-miss)

### MCP Asset Integration Point
**THIS IS WHERE WE INSTALL MCP SERVERS**

#### Before Sprint 4 Starts
- [ ] Install **Game Asset Generator MCP** (primary)
  - Repository: https://github.com/MubarakHAlketbi/game-asset-mcp
  - Generate robot sprites (Robo-1, Robo-2, Robo-3, Robo-4)
  - Create explosion effects, particle sprites
  - Cost: ~$0-2 for full asset set

- [ ] Install **Stock Images MCP** (backgrounds)
  - Repository: https://github.com/Zulelee/stock-images-mcp
  - Get abstract backgrounds from Unsplash/Pexels
  - Cost: $0 (free with API keys)

- [ ] Optional: **Stable Diffusion API** (custom assets)
  - Only if Game Asset Generator doesn't meet quality bar
  - Budget: ~$3-5 for 100 images
  - BOSS approved budget for best quality

#### Asset Generation Workflow
1. GD creates detailed robot character specs (docs/specs/robot-characters-design.md)
2. FE uses MCP to generate assets based on GD specs
3. GD reviews generated assets, provides feedback
4. FE iterates until GD approves
5. FE integrates assets into game

**Timeline**: 2-3 days for asset generation and approval before Sprint 4 coding starts

### Deliverables

#### Sprint 4: Visual Upgrade (Week 1-1.5)
- [ ] Replace placeholder graphics with MCP-generated assets
  - 4 robot character sprites (circle, square, triangle, hexagon)
  - Custom backgrounds (abstract, colorful, subject-neutral)
  - UI elements (buttons, score displays, health hearts)
- [ ] Animation polish
  - Target explosion (confetti particles)
  - Error spark effect (red electrical)
  - Floating score text (+100, +25)
  - Screen effects (flash, shake)
- [ ] Tests: Add visual regression tests

**Deliverable**: Game looks professional, not like placeholders

#### Sprint 5: Advanced Mechanics (Week 2-3.5)
- [ ] Combo multiplier system (Section 6.1)
  - 5 streak: 2x, 10 streak: 3x, 15 streak: 5x
  - **GD Rec #4**: Immediate combo visual feedback
    - 3 correct: Small stars around score
    - 5 correct: "🔥 ON FIRE!" text + screen glow
    - 10 correct: Full-screen particle burst + special sound
- [ ] **GD Rec #5**: Near-miss feedback (Phase 2)
  - Add "near_miss_answers" field to questions.json
  - Show contextual feedback for close-but-wrong answers
- [ ] Power-ups (Section 6.3)
  - Freeze Time (pause timer for 5s)
  - Smart Bomb (eliminate 2 wrong answers)
  - Hint Arrow (highlight correct for 2s)
  - Earned through correct answers
- [ ] Comeback mechanics
  - At 1 heart, next correct restores 2 hearts
  - Every 10 correct: easy bonus question restores 1 heart
- [ ] Tests: 25+ unit tests total

**Deliverable**: Engaging mechanics that reward skill and comebacks

#### Sprint 6: Complete Audio & Settings (Week 4-5)
- [ ] Complete audio suite (Section 8)
  - Multiple correct sounds (vary, not repetitive)
  - Voice clips: "Great job!", "Excellent!", "Perfect!" (rotated)
  - Wrong answer voices: "Try again!", "Keep going!", "Almost!"
  - Combo milestone sounds (special jingles at streaks)
  - Low health warning (gentle beep)
  - Game over / victory music (5-10 second stingers)
  - Background music (upbeat menu, ambient gameplay)
- [ ] Settings screen
  - Master volume slider
  - Music on/off toggle
  - SFX on/off toggle
  - Save settings to LocalStorage
- [ ] Instructions screen (FR-011)
  - How to play, scoring rules, health system
  - Visual diagrams with minimal text
- [ ] High score persistence (FR-014)
  - Save high score to LocalStorage
  - Display "Best Score: X" on main menu
- [ ] Tests: 30+ unit tests total

**Deliverable**: Polished game with complete audio/visual experience and settings

### Success Criteria
- ✅ Visual quality comparable to commercial casual games
- ✅ Professional robot sprites and animations (MCP-generated, GD-approved)
- ✅ Combo system engaging with escalating visual feedback
- ✅ Power-ups functional and rewarding
- ✅ Complete audio suite with varied sounds
- ✅ Settings screen saves preferences
- ✅ High score persistence works
- ✅ 30+ unit tests passing
- ✅ Playtest: 15+ minute average session length (engagement metric)
- ✅ Subject-agnostic still validated (test with 3 subjects)

### Exit Gate - PM Review
**PM Must Verify**:
1. **Asset Quality**:
   - GD approves all MCP-generated graphics
   - Robots are subject-neutral (not history/math-specific)
   - Visuals meet "Robo Academy" theme (PRD Section 7)

2. **Engagement Metrics**:
   - Playtest with 5-10 users
   - Measure: Average session duration (target: 15+ min)
   - Feedback: Is combo system motivating? Are power-ups fun?

3. **Progressive Commits**:
   - 15+ commits for Sprints 4-6
   - Clear progression: visuals → mechanics → audio

4. **CR Approval**:
   - Code review passed
   - No performance issues (60 FPS maintained)

5. **Milestone Alignment**:
   - All M2 deliverables complete
   - Ready for M3 (advanced features)

---

## Milestone M3: Advanced Features

**Goal**: Add mobile support, adaptive difficulty, and learning metrics to make game production-ready

**Duration**: 4-5 weeks (Sprint 7-9)
**Status**: ⚪ Pending
**Owner**: FE

### Reference
**PRD Section**: Phase 3 (Section 10.3)
**GD Feedback**: Recommendations #6, #7 (learning metrics, spaced repetition)

### Deliverables

#### Sprint 7: Mobile & Responsive (Week 1-1.5)
- [ ] Mobile responsive design (FR-013)
  - Portrait and landscape support
  - Touch controls (tap targets)
  - Responsive layout adapts to screen size
  - Tap target minimum 44x44px
- [ ] Browser testing
  - iOS Safari (tablets, phones)
  - Android Chrome (tablets, phones)
  - Responsive breakpoints tested
- [ ] Performance optimization
  - Maintain 60 FPS on mid-range devices
  - Asset optimization (compressed images)
  - Sprite pooling (reuse objects)
- [ ] Tests: Mobile-specific tests

**Deliverable**: Game works seamlessly on tablets and phones

#### Sprint 8: Adaptive Difficulty & Game Modes (Week 2-3.5)
- [ ] Adaptive difficulty system (Section 6.4)
  - Track accuracy: correct/total
  - If >80% accuracy → increase difficulty (faster, harder questions)
  - If <50% accuracy → decrease difficulty (slower, easier questions)
  - Flow theory: challenge matches ability
- [ ] Multiple game modes (Section 3.2)
  - Practice Mode (MVP - already exists)
  - Timed Challenge (speed bonus for fast answers)
  - Survival Mode (endless questions, increasing difficulty)
- [ ] Question randomization (FR-008)
  - Shuffle question order
  - Shuffle answer order (preserve correct index)
- [ ] Subject selection
  - Load different question files (history.json, math.json, literature.json)
  - Select subject from main menu
- [ ] Tests: Adaptive difficulty algorithms, game mode logic

**Deliverable**: Multiple ways to play, difficulty adapts to skill level

#### Sprint 9: Learning Metrics & Analytics (Week 4-5)
- [ ] **GD Rec #7**: Spaced repetition system
  - Track wrong answers
  - Re-ask missed questions after 5-10 new questions
  - Label as "Review Question" with message
  - Research shows 50%+ better recall
- [ ] **GD Rec #6**: Learning metrics (pre/post-test)
  - Optional: 10-question pre-test before first play
  - Track accuracy over sessions
  - Optional: 10-question post-test after 3 sessions
  - Display improvement percentage
  - Proves educational value
- [ ] Statistics tracking
  - Accuracy over time (per session)
  - Subject-specific performance (history vs math vs literature)
  - Streak records (longest combo)
  - Questions attempted/mastered
- [ ] Accessibility improvements
  - Keyboard navigation (arrow keys + Enter)
  - Color-blind mode (shapes differentiate, not just colors)
  - Screen reader labels (ARIA)
- [ ] Tests: Analytics tracking, spaced repetition logic

**Deliverable**: Game tracks learning progress and adapts to help mastery

### Success Criteria
- ✅ Works on 95% of modern tablets/phones (iOS 14+, Android 10+)
- ✅ 60 FPS maintained on mid-range devices
- ✅ Adaptive difficulty maintains flow state (playtest validation)
- ✅ Spaced repetition improves retention (test with repeated questions)
- ✅ Learning metrics show 30%+ improvement after 3 sessions
- ✅ Multiple game modes tested and functional
- ✅ Subject selection works (test with 3+ subjects)
- ✅ 40+ unit tests passing
- ✅ Accessibility: Keyboard navigation works, color-blind friendly

### Exit Gate - PM Review
**PM Must Verify**:
1. **Mobile Performance**:
   - Test on 3+ devices (iOS, Android, various screen sizes)
   - No lag, 60 FPS maintained
   - Touch controls feel natural

2. **Educational Effectiveness**:
   - Conduct pre/post-test with 5 users
   - Measure accuracy improvement (target: 30%+)
   - Validate spaced repetition improves recall

3. **Subject-Agnostic Final Check**:
   - Test with 5+ subjects (history, math, literature, science, civics)
   - Zero code changes needed to swap subjects
   - Graphics remain neutral across all subjects

4. **CR Final Review**:
   - Code quality high
   - No technical debt
   - Ready for production deployment

5. **Milestone Alignment**:
   - All M3 deliverables complete
   - Ready for M4 (production release)

---

## Milestone M4: Production Ready

**Goal**: Final testing, deployment, and documentation for public/production release

**Duration**: 2-3 weeks (Sprint 10+)
**Status**: ⚪ Pending
**Owner**: PM + FE + CR

### Deliverables

#### Sprint 10: Final Testing & Bug Fixes
- [ ] Comprehensive testing
  - Cross-browser testing (Chrome, Firefox, Safari, Edge)
  - Cross-device testing (desktop, tablet, phone)
  - Performance testing (load time, FPS, memory usage)
  - Edge case testing (empty questions, malformed JSON)
- [ ] Bug bash
  - CR runs extensive manual testing
  - FE fixes all critical and high-priority bugs
  - No P0/P1 bugs remaining
- [ ] User acceptance testing
  - 10+ users (mix of kids 8-12 and parents)
  - Collect feedback, prioritize improvements
  - Implement critical UX fixes
- [ ] Polish pass
  - Fix typos, alignment issues, minor visual glitches
  - Ensure consistent theming across all screens
- [ ] Final test suite
  - 50+ unit tests covering all features
  - Integration tests for full game sessions
  - 100% pass rate

**Deliverable**: Bug-free, polished game ready for users

#### Sprint 11: Deployment & Documentation
- [ ] Deployment
  - Choose hosting (GitHub Pages, Netlify, Vercel, or custom)
  - Configure build process (Vite production build)
  - Deploy to production URL
  - Test deployed version (not just local)
- [ ] Documentation
  - User guide (how to play, how to customize questions)
  - Developer documentation (architecture, how to contribute)
  - Question creation guide (for parents/educators)
    - JSON structure explained
    - Best practices for writing questions
    - Example questions provided
  - Deployment guide (how to host your own instance)
- [ ] Question libraries
  - Provide 5 question sets (50+ questions each):
    1. Ancient History (Egypt, Greece, Rome)
    2. Basic Math (arithmetic, fractions, geometry)
    3. Classic Literature (characters, plots, authors)
    4. Science (biology, physics, chemistry basics)
    5. Civics (government, rights, citizenship)
  - Demonstrates subject-agnostic capability
- [ ] License and legal
  - Choose open-source license (MIT recommended)
  - Credit MCP asset sources (follow licensing terms)
  - Privacy statement (no data collection in MVP)

**Deliverable**: Deployed game with documentation and sample content

### Success Criteria
- ✅ Zero critical bugs (P0/P1)
- ✅ Deployed to production URL and accessible
- ✅ 50+ unit tests passing (100% pass rate)
- ✅ Comprehensive documentation (users + developers)
- ✅ 5 question libraries provided (250+ total questions)
- ✅ User acceptance: 8/10+ satisfaction rating (playtest)
- ✅ Performance: <3s load time on 10 Mbps, 60 FPS gameplay
- ✅ Cross-browser: Works in Chrome 90+, Firefox 85+, Safari 14+, Edge 90+
- ✅ Subject-agnostic: Proven with 5+ subjects

### Exit Gate - BOSS Final Approval
**BOSS Reviews**:
1. Play the deployed game
2. Review documentation (can you customize questions easily?)
3. Test with target user (child 8-12)
4. Approve for release or request final changes

**If Approved**: 🎉 **PROJECT COMPLETE** → Merge to main, tag v1.0.0 release

---

## Backlog Management

**PM Responsibilities**:

### After Each Sprint
1. **Review Sprint Deliverables**:
   - Did we complete all items in sprint scope?
   - What was deferred? Why?
   - Add deferred items to backlog

2. **Update Milestones**:
   - Mark completed deliverables with ✅
   - Update milestone status (Not Started → In Progress → Complete)
   - Update "Last Updated" timestamp

3. **Backlog Grooming**:
   - Review backlog items
   - Prioritize: Critical → High → Medium → Low
   - Estimate: Small (1-2 days), Medium (3-5 days), Large (1+ week)
   - Assign to future sprints or milestones

4. **Milestone Alignment Check**:
   - Are we on track for current milestone?
   - Do we need to adjust scope to hit milestone deadline?
   - Are there blockers preventing milestone completion?

5. **Next Sprint Planning**:
   - Which milestone are we in?
   - What's next in that milestone's deliverables?
   - Pull items from backlog if needed

### Backlog Categories

**Feature Backlog**: New features not yet assigned to milestones
- Subject-specific themes (optional)
- Multiplayer mode (future)
- Teacher dashboard (future)
- Question sharing platform (future)

**Bug Backlog**: Known issues not yet fixed
- Priority: P0 (critical) → P1 (high) → P2 (medium) → P3 (low)
- P0/P1 must be fixed before milestone exit gate
- P2/P3 can be deferred to next milestone or backlog

**Tech Debt Backlog**: Code improvements, refactoring
- Defer to end of milestones when time allows
- Don't let tech debt block new features

**Research Backlog**: Investigations, spikes, prototypes
- Example: "Research best audio codec for mobile"
- Time-boxed (max 1-2 days)
- Decide: proceed, defer, or cancel

### Backlog File Location
**File**: `docs/backlog.md`

**Structure**:
```markdown
# Backlog - Quiz Battle Arena

## Sprint X Deferred Items
- [ ] Item 1 (Medium priority, 3 days estimate)
- [ ] Item 2 (Low priority, 1 day estimate)

## Feature Backlog
- [ ] Feature A (High priority, 1 week estimate)
- [ ] Feature B (Medium priority, 3 days estimate)

## Bug Backlog
- [ ] [P1] Critical bug (blocker for M2)
- [ ] [P2] Medium bug (can defer)

## Tech Debt Backlog
- [ ] Refactor GameScene (Medium, 2 days)

## Research Backlog
- [ ] Investigate audio codec options (1 day spike)
```

---

## Milestone Tracking Dashboard

**PM Updates This After Each Sprint**

| Milestone | Start Date | Target End | Actual End | Status | Completion % |
|-----------|------------|------------|------------|--------|--------------|
| M0 | TBD | TBD | - | 🔵 Not Started | 0% |
| M1 | TBD | TBD | - | ⚪ Pending | 0% |
| M2 | TBD | TBD | - | ⚪ Pending | 0% |
| M3 | TBD | TBD | - | ⚪ Pending | 0% |
| M4 | TBD | TBD | - | ⚪ Pending | 0% |

**Legend**:
- 🔵 Not Started
- 🟡 In Progress
- 🟢 Complete
- 🔴 Blocked
- ⚪ Pending (waiting for previous milestone)

---

## Critical Success Factors

### Throughout All Milestones

**1. Subject-Agnostic Validation** (CRITICAL)
- Test with 3+ subjects at EVERY milestone
- Zero code changes when swapping questions.json
- Graphics/UI must remain neutral

**2. Progressive Development**
- Each milestone delivers working software
- Frequent commits (30-60 min) prove progress
- No "almost done" sprints - ship or defer

**3. Research-Backed Design**
- All decisions align with child psychology (ages 8-12)
- Gamification based on proven patterns (research doc)
- User testing validates assumptions

**4. Quality Gates**
- CR approves code at end of each sprint
- Tests pass 100% before milestone completion
- PM verifies milestone deliverables independently

**5. BOSS Engagement**
- Demo after each milestone (not just at end)
- Get feedback early and often
- Course-correct based on BOSS priorities

---

## Risk Management by Milestone

### M1 Risks
- **Phaser 3 learning curve** → Mitigation: PM provides tutorials, GD gives clear specs
- **Core loop not fun** → Mitigation: Playtest early, iterate on mechanics

### M2 Risks
- **MCP asset quality insufficient** → Mitigation: Budget approved for Stable Diffusion API as backup
- **Animation performance issues** → Mitigation: Profile early, optimize or simplify

### M3 Risks
- **Mobile performance problems** → Mitigation: Test on real devices early, optimize assets
- **Adaptive difficulty too complex** → Mitigation: Start simple, iterate based on playtests

### M4 Risks
- **Deployment issues** → Mitigation: Test deployment early (don't wait until end)
- **User acceptance fails** → Mitigation: Get feedback throughout, not just at end

---

## Appendix: Sprint-to-Milestone Mapping

| Sprint | Milestone | Focus | Deliverable |
|--------|-----------|-------|-------------|
| Pre-Sprint | M0 | Setup | Dev environment ready |
| Sprint 1 | M1 | Core mechanics | Answer questions, see score |
| Sprint 2 | M1 | Game loop | Full session playable |
| Sprint 3 | M1 | UI/UX | Complete MVP experience |
| Sprint 4 | M2 | Visual upgrade | Professional graphics (MCP) |
| Sprint 5 | M2 | Advanced mechanics | Combos, power-ups, comebacks |
| Sprint 6 | M2 | Audio & settings | Complete polish |
| Sprint 7 | M3 | Mobile | Responsive, touch controls |
| Sprint 8 | M3 | Adaptive & modes | Difficulty, game modes |
| Sprint 9 | M3 | Learning metrics | Spaced repetition, analytics |
| Sprint 10 | M4 | Testing | Bug-free, polished |
| Sprint 11 | M4 | Deployment | Live, documented, released |

---

**Document Owner**: PM (Project Manager)
**Review Frequency**: After every sprint
**Next Review**: After Sprint 1 completion

---

**Status Legend**:
- 🔵 Not Started - Milestone not yet begun
- 🟡 In Progress - Currently working on this milestone
- 🟢 Complete - All deliverables finished and approved
- 🔴 Blocked - Cannot proceed due to blocker
- ⚪ Pending - Waiting for prerequisite milestone

**This document is the SINGLE SOURCE OF TRUTH for project progress. PM updates after every sprint.**
