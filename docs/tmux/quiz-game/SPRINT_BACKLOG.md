# Sprint 14 Backlog

**Sprint Goal:** Improvement Phase - Balance, Visuals, UX
**Sprint Start:** 2026-01-01
**Sprint End:** TBD

---

## Reference Project

**IMPORTANT:** Sample code location: `sample_codes/tower-defence/`
**Asset Research:** `docs/research/GAME_ASSETS.md`

---

## Sprint Items

### [S14-002]: Reduce Lives 20 → 3
**Owner:** DEV
**Status:** TODO
**Priority:** P0 - Balance (game too easy)

**Description:**
Game is too easy with 20 lives. Reduce to 3 lives for more challenge.

**Changes Required:**
- [ ] Find lives config (likely in GameScene or config file)
- [ ] Change starting lives from 20 to 3
- [ ] Verify UI shows correct lives count

**Acceptance Criteria:**
- [ ] Game starts with 3 lives
- [ ] Lives display shows 3
- [ ] Game over triggers after 3 enemies pass
- [ ] TL code review approved
- [ ] QA verification passed
- [ ] Boss acceptance

---

### [S14-001]: Add Visual Sprites/Assets
**Owner:** DEV
**Status:** TODO
**Priority:** P1 - Visual improvement

**Description:**
Replace placeholder graphics with proper sprites.

**Asset Sources (from research):**
- Zombies: CraftPix zombie sprites
- Towers: Kenney tower assets
- Reference: docs/research/GAME_ASSETS.md

**Changes Required:**
- [ ] Download/integrate zombie sprites
- [ ] Download/integrate tower sprites
- [ ] Update sprite references in game code
- [ ] Ensure animations work if applicable

**Acceptance Criteria:**
- [ ] Zombies have proper sprite graphics
- [ ] Towers have proper sprite graphics
- [ ] No placeholder rectangles visible
- [ ] Game runs without errors
- [ ] TL code review approved
- [ ] QA verification passed
- [ ] Boss acceptance

---

### [S14-003]: Tower Guidance/Tips
**Owner:** DEV
**Status:** TODO
**Priority:** P1 - UX improvement

**Description:**
Add help for new players to understand tower types.

**Options (Boss to decide):**
A) Question mark button with tower info popup
B) Tooltips on hover for each tower
C) Tips displayed at wave start explaining towers
D) Combination of above

**Requirements:**
- [ ] Include 'never show again' option
- [ ] Explain what each tower type does
- [ ] Non-intrusive to gameplay

**Acceptance Criteria:**
- [ ] Tower guidance implemented
- [ ] 'Never show again' checkbox works
- [ ] Information is clear and helpful
- [ ] TL code review approved
- [ ] QA verification passed
- [ ] Boss acceptance

---

## Definition of Done

- [ ] Lives reduced to 3
- [ ] Visual sprites added
- [ ] Tower guidance implemented
- [ ] All TL reviews approved
- [ ] All QA tests passed
- [ ] Pushed to remote
- [ ] Boss acceptance

---

## Progress Tracking

| Item | Status | Owner | Priority | Notes |
|------|--------|-------|----------|-------|
| S14-002 | TODO | DEV | P0 | Lives balance |
| S14-001 | TODO | DEV | P1 | Sprites |
| S14-003 | TODO | DEV | P1 | Tower tips |

---

## Sprint 13 Summary (COMPLETED)

**All items BOSS ACCEPTED:**
- ✅ S13-002: Wave countdown timer fix (0db2934)
- ✅ S13-001: Gold display removed from React (e22d23e)

---

## Notes

- S14-002 is P0 - do first (balance fix)
- S14-001 and S14-003 are P1 - visual/UX improvements
- Check GAME_ASSETS.md for sprite sources
