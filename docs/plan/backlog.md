# Backlog - Quiz Battle Arena

**Project**: Educational Quiz Game (Subject-Agnostic)
**Last Updated**: 2025-12-17 02:31
**Owner**: PM (Project Manager)

---

## Overview

This backlog contains features, improvements, and tasks that are not yet assigned to specific sprints. PM reviews this backlog when planning each sprint, alongside milestone deliverables.

**Backlog Categories**:
1. **Feature Backlog**: New features not yet assigned to milestones
2. **Asset & Polish Backlog**: Visual/audio improvements
3. **Bug Backlog**: Known issues (P0/P1/P2/P3 priority)
4. **Tech Debt Backlog**: Code improvements, refactoring
5. **Research Backlog**: Investigations, spikes (time-boxed)

---

## Sprint Deferred Items

**From Sprint 2 Scope Adjustment**:
- ⏳ Sprint 2 was split into 2A + 2B (original scope too large)
- No deferred items yet - split before implementation started

---

## Feature Backlog

### High Priority

(None yet)

### Medium Priority

#### RAG-Based Q&A Generation from Study Materials (Medium Priority)

**Status**: Not Started
**Priority**: Medium (valuable feature for future milestones)
**Estimated Effort**: Large (1-2 weeks)
**Proposed Sprint**: M3 (Advanced Features) or M4 (Production Ready)
**Dependencies**:
- RAG (Retrieval Augmented Generation) system implementation
- Document upload UI
- Document parsing library (PDF, DOCX, TXT support)
- Q&A generation prompt engineering
- Current game mechanics stable (M1 complete)

**Description**:
Allow users to upload study materials (book chapters, study outlines, documents) and automatically generate quiz questions in the existing JSON format. This eliminates manual Q&A creation and enables rapid quiz generation from any educational content.

**User Flow**:
1. User uploads study document (PDF, DOCX, TXT, or book chapter)
2. System uses RAG to read and understand document content
3. System generates Q&A pairs in questions.json format:
   - Question text
   - 4 answer choices (1 correct, 3 plausible distractors)
   - Correct answer index
   - Explanation with context from source document
4. User reviews generated questions (edit/approve/reject)
5. System saves to questions.json for immediate gameplay

**Technical Approach**:
- Use RAG to extract key concepts and facts from documents
- Generate questions based on document content
- Include source context in explanations (for wrong answer feedback)
- Maintain subject-agnostic design (works for any subject)
- Support multiple document formats (PDF, DOCX, TXT)

**Acceptance Criteria**:
- [ ] UI for document upload (drag-drop or file picker)
- [ ] Document parsing for PDF, DOCX, TXT formats
- [ ] RAG integration for content understanding
- [ ] Q&A generation with 4-answer format
- [ ] Generated questions include explanations with source context
- [ ] User review/edit interface for generated questions
- [ ] Save to questions.json format (compatible with current game)
- [ ] Support for multiple subjects/documents
- [ ] Quality validation (questions make sense, distractors are plausible)

**Benefits**:
- Democratizes quiz creation (no manual writing needed)
- Enables rapid content generation for any subject
- Maintains educational quality with source-based explanations
- Scales to unlimited content (books, chapters, study guides)

**References**:
- Current questions.json format: src/assets/data/questions.json
- Subject-agnostic design: README.md
- Potential future milestone: M3 or M4

### Low Priority

(None yet)

---

## Asset & Polish Backlog

### AI-Generated Game Assets (High Priority)

**Status**: ✅ Research Complete
**Research Document**: docs/findings/huggingface-mcp-asset-generation.md
**Priority**: High (visual quality critical for engagement)
**Estimated Effort**: Medium (1-2 days for generation + integration)
**Proposed Sprint**: Sprint 3 (UI/UX & Polish) or Sprint 2C

**Summary**:
- **Finding**: Hugging Face PRO ($9/month) successfully generates game sprites
- **Outcome**: 13 production-ready sprites already generated in `/experiments/generated-sprites/`
- **Cost**: $9/month PRO + ~$0.01/sprite (negligible)
- **Speed**: 6-10 seconds per sprite
- **Quality**: High (1024x768, clean backgrounds)

**Assets Available** (13 sprites in /experiments/generated-sprites/):
- 4 robot characters (blue, red, green, yellow)
- UI elements (buttons, icons)
- Effects (explosions, particles)
- Backgrounds
- ⚠️ **NOTE**: These are in experiments folder - must COPY to src/assets/ when integrating

**Assets Needed** (to generate before Sprint 3):
- Heart icons (full/empty) for health display
- Celebration icons/effects for milestone celebrations
- Game over screen graphics (victory/defeat states)
- Main menu background/logo

**Action Items**:
1. [ ] GD: Create sprite specification list for missing assets
2. [ ] FE or PM: Generate missing sprites via Hugging Face API
3. [ ] GD: Review all sprites for consistency and quality
4. [ ] **COPY sprites from /experiments/ to src/assets/images/** (don't reference experiments directly)
5. [ ] FE: Integrate sprites into game (replace placeholders)
6. [ ] Delete or move experiments folder after copying (experiments are temporary)

**Dependencies**:
- Hugging Face PRO subscription active
- GD design specs for sprite requirements
- Sprint 2A/2B complete (placeholders in use until Sprint 3)

**Original Plan**: M2 (Phase 2 - Sprint 4)
**Revised Plan**: Sprint 3 (UI/UX & Polish) - early integration for better MVP quality

**References**:
- Findings: docs/findings/huggingface-mcp-asset-generation.md
- Research: docs/research/research-mcp-graphic-resources.md
- Generated assets: /experiments/generated-sprites/ (13 sprites)

---

## Bug Backlog

### P0 - Critical (Must fix immediately)

(None)

### P1 - High (Fix before milestone exit gate)

(None)

### P2 - Medium (Fix when capacity allows)

(None)

### P3 - Low (Nice to have)

(None)

---

## Tech Debt Backlog

(None yet - project just started)

---

## Research Backlog

### Completed Research

1. **✅ MCP Graphic Resources Research**
   - Completed: 2025-12-17
   - Document: docs/research/research-mcp-graphic-resources.md
   - Outcome: Recommended Game Asset Generator MCP + Stock Images MCP
   - Status: Findings superseded by Hugging Face direct API approach

2. **✅ Hugging Face Asset Generation Experiment**
   - Completed: 2025-12-17
   - Document: docs/findings/huggingface-mcp-asset-generation.md
   - Outcome: PRO tier works perfectly, 13 sprites generated
   - Status: Ready for integration in Sprint 3

### Pending Research

(None)

---

## Backlog Management Process

**PM Responsibilities**:

### After Each Sprint
1. Review completed sprint deliverables
2. Add any deferred items to backlog with reason
3. Prioritize backlog items (P0/P1/P2/P3)
4. Estimate effort (Small/Medium/Large)
5. Consider backlog items for next sprint planning

### Sprint Planning Process
1. **Check current milestone deliverables** (docs/plan/main-milestones.md)
2. **Review backlog** (this file)
3. **Decide sprint scope**:
   - Milestone deliverables (primary)
   - High-priority backlog items (if capacity allows)
   - Bug fixes (P0/P1 must be addressed)
4. **Create sprint plan** with selected items
5. **Update backlog** (mark items as assigned to sprint)

### Backlog Grooming (Weekly)
- Remove completed items
- Re-prioritize based on project needs
- Add new items from team suggestions
- Update effort estimates
- Archive low-priority items if no longer relevant

---

## Backlog Item Template

When adding items to backlog, use this format:

```markdown
### [Item Title] (Priority Level)

**Status**: Not Started / In Progress / Blocked
**Priority**: P0 / P1 / P2 / P3 (or High/Medium/Low for features)
**Estimated Effort**: Small (1-2 days) / Medium (3-5 days) / Large (1+ week)
**Proposed Sprint**: Sprint X or Milestone X
**Dependencies**: List any blockers or prerequisites

**Description**: What needs to be done and why

**Acceptance Criteria**:
- [ ] Criterion 1
- [ ] Criterion 2

**References**: Links to related docs, research, issues
```

---

## Notes

- Backlog is NOT a dumping ground - keep it curated and prioritized
- Low-priority items that sit for 2+ milestones should be archived or deleted
- High-priority items should be assigned to sprints within 1-2 sprints
- PM reviews this file weekly and before each sprint planning

---

**Document Owner**: PM (Project Manager)
**Review Frequency**: Weekly + before each sprint planning
**Next Review**: Before Sprint 2A planning
