# Sprint 16 Backlog

**Sprint Goal:** EPIC-001-A File Upload & Validation (Design Phase)
**Sprint Start:** 2026-01-01
**Sprint End:** TBD
**Epic:** EPIC-001 AI Document-to-Quiz Pipeline

---

## ⚠️ EPIC-001 Special Process

**Boss reviews TL design BEFORE DEV implementation.**

```
S16-001 (TL design) → STOP → Boss reviews → S16-002, S16-003, S16-004 (DEV)
```

---

## Sprint Items

### [S16-001]: Technical Design for File Upload Architecture
**Owner:** TL
**Status:** TODO
**Priority:** P0 - Must complete first
**Estimate:** M

**Description:**
Create technical design document for EPIC-001-A file upload system.

**Design Requirements:**
- [ ] Architecture: How files are uploaded, processed, stored
- [ ] API endpoints: Upload endpoint, validation responses
- [ ] File format handling: .docx, .md, .pdf extraction strategy
- [ ] Libraries/tools: What packages to use for each format
- [ ] Error handling: Invalid format, too large, extraction failure
- [ ] Security: File size limits, content validation

**Deliverable:**
Technical spec document in `docs/team/sprint-16/EPIC-001-A_DESIGN.md`

**Acceptance Criteria:**
- [ ] Design document complete
- [ ] All design questions answered
- [ ] **STOP** - Notify SM for Boss review
- [ ] Boss approval received
- [ ] Then proceed to S16-002

---

### [S16-002]: Accept .docx/.md/.pdf, Reject Others
**Owner:** DEV
**Status:** BLOCKED (waiting for S16-001 + Boss approval)
**Priority:** P1
**Estimate:** S

**Description:**
Implement file format validation. Accept only .docx, .md, .pdf files.

**Acceptance Criteria:**
- [ ] Upload .docx → accepted
- [ ] Upload .md → accepted
- [ ] Upload .pdf → accepted
- [ ] Upload .txt → rejected with "Format not supported"
- [ ] Upload .jpg → rejected with "Format not supported"
- [ ] Upload .exe → rejected with "Format not supported"

---

### [S16-003]: Page Count Validation (Max 100 Pages)
**Owner:** DEV
**Status:** BLOCKED (waiting for S16-001 + Boss approval)
**Priority:** P1
**Estimate:** S

**Description:**
Validate uploaded files don't exceed 100 pages.

**Acceptance Criteria:**
- [ ] 50-page PDF → accepted
- [ ] 100-page PDF → accepted
- [ ] 101-page PDF → rejected with "File too large (max 100 pages)"
- [ ] Page count works for all supported formats

---

### [S16-004]: Text Extraction from Formats
**Owner:** DEV
**Status:** BLOCKED (waiting for S16-001 + Boss approval)
**Priority:** P1
**Estimate:** M

**Description:**
Extract text content from each supported file format.

**Acceptance Criteria:**
- [ ] .docx → text extracted correctly
- [ ] .md → text extracted correctly (preserve structure)
- [ ] .pdf → text extracted correctly
- [ ] Handle extraction errors gracefully
- [ ] Output: Plain text or structured markdown

---

## Progress Tracking

| Item | Status | Owner | Priority | Notes |
|------|--------|-------|----------|-------|
| S16-001 | TODO | TL | P0 | Design first, then STOP for Boss |
| S16-002 | BLOCKED | DEV | P1 | Wait for S16-001 + Boss approval |
| S16-003 | BLOCKED | DEV | P1 | Wait for S16-001 + Boss approval |
| S16-004 | BLOCKED | DEV | P1 | Wait for S16-001 + Boss approval |

---

## Definition of Done

- [ ] S16-001: TL design approved by Boss
- [ ] S16-002: Format validation working
- [ ] S16-003: Page count validation working
- [ ] S16-004: Text extraction working
- [ ] All code reviewed by TL
- [ ] All QA tests passed
- [ ] Boss acceptance

---

## Sprint 15 Summary (COMPLETED)

**All items BOSS ACCEPTED:**
- ✅ S15-002: Game freeze on restart fix (2ee4866)
- ✅ S15-009: HEALER targeting fix (f4b1269)
- ✅ S15-006: Tower icons in React selector (7cfad9b)
- ✅ S15-010: 50 Vietnamese history questions (e816657)

---

## Notes

- S16-001 is the gate - nothing else starts until Boss approves design
- TL should reference PRODUCT_BACKLOG.md EPIC-001 for requirements
- Create design doc in docs/team/sprint-16/
