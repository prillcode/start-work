---
name: start-work
description: Initializes a feature/task-level planning structure in .planning/ directory for organizing work items (features, refactors, bug fixes). Creates work directories with BRIEF.md, ROADMAP.md, and phases/ structure. Use when starting new work items similar to JIRA issues.
---

<objective>
Initialize a structured planning directory for organizing work items (features, refactors, bug fixes, enhancements) similar to JIRA issues. Creates a `.planning/[identifier]-[work-name]/` directory with BRIEF.md (scope/vision), ROADMAP.md (phases), and phases/ subdirectory for detailed execution plans.

Supports both auto-numbered work items (`ID-01`, `ID-02`) and custom identifiers (`mdo-123`, `gh-456`, `JIRA-789`) from external tracking systems.
</objective>

<quick_start>
**Usage:**
- `/start-work` - Interactive prompts for work details
- `/start-work [identifier] [work-name]` - With arguments

**Example:**
```bash
/start-work mdo-123 api-refactor
```

Creates: `.planning/mdo-123-api-refactor/` with BRIEF.md, ROADMAP.md, and phases/
</quick_start>

<workflow>
## Step 1: Gather Work Information

Accept arguments or prompt using AskUserQuestion:

1. **Work identifier** (optional):
   - Leave blank → auto-generate as `ID-[nn]` (scans existing directories)
   - Provide custom → use as-is (`mdo-123`, `gh-456`, `JIRA-789`)

2. **Work name** (required):
   - Short kebab-case description
   - Examples: `parallels-session-updates`, `fix-auth-bug`, `api-refactor`

3. **Brief description** (required):
   - What needs to be done and why
   - Used to populate BRIEF.md Objective section

4. **Work type** (required):
   - Options: Feature, Bug Fix, Refactor, Enhancement

## Step 2: Auto-Detect Next ID Number

If identifier is blank:
- Scan `.planning/` directory for `ID-[nn]` pattern directories
- Extract numbers, find max, increment by 1
- Format as `ID-[nn]` with zero-padding (`ID-01`, `ID-02`, ..., `ID-10`, etc.)
- Handle gaps gracefully (if ID-01, ID-03 exist → next is ID-04)
- Custom identifiers don't affect auto-numbering sequence

## Step 3: Check for Duplicate Directory

Check if `.planning/[identifier]-[work-name]/` already exists:
- If exists → auto-append `-02`, `-03`, etc. suffix
- Example: `mdo-123-api-refactor` exists → create `mdo-123-api-refactor-02`
- Note: Original directory is implicitly "-01" (no suffix)

## Step 4: Create Directory Structure

```bash
.planning/[identifier]-[work-name]/
  BRIEF.md           # Work-level scope/vision
  ROADMAP.md         # Work-level phases
  phases/            # Execution plans go here (01-01-PLAN.md, etc.)
```

Auto-create `.planning/` if it doesn't exist.

## Step 5: Generate BRIEF.md

Use template from `templates/work-brief.md`:
- Replace `[Work Name]` with provided work name
- Replace `[identifier]` with actual identifier (ID-01 or mdo-123)
- Replace `[Type]` with selected work type
- Replace `[What needs to be done and why]` with brief description
- Add planning instructions header with actual identifier

## Step 6: Generate ROADMAP.md

Use template from `templates/work-roadmap.md`:
- Replace `[Work Name]` with provided work name
- Replace `[identifier]` with actual identifier

## Step 7: Output Next Steps

Display to user:
```
✅ Created work structure: .planning/[identifier]-[work-name]/

Next steps:
1. Review and refine BRIEF.md and ROADMAP.md
2. Use `/create-plan` to create detailed phase plans in phases/ subdirectory
3. Use `/run-plan` to execute plans
4. Commits: Use standard prefixes (feat:, fix:, refactor:, docs:)
```

## Step 8: Offer Root-Level Docs (If Missing)

Check if root-level BRIEF.md and ROADMAP.md exist in `.planning/`:
- If missing → Use AskUserQuestion to offer creating them
- Use templates from `templates/project-brief.md` and `templates/project-roadmap.md`
- Always ask first, never auto-create
</workflow>

<commit_behavior>
## Invocation Context Detection

**Auto-detect invocation context:**
- **User-invoked:** Direct skill call → Manual commit workflow (user provides messages)
- **Subagent-invoked:** Called via Task tool → Allow auto-commit with identifier

**Commit format:**
- **User:** Standard prefixes only: `feat:`, `fix:`, `refactor:`, `docs:`
- **Subagent:** Include identifier: `feat([identifier]-01):`, `fix(mdo-123-02):`

**Implementation:** Check if running in subagent context and adjust behavior accordingly.
</commit_behavior>

<directory_conventions>
- **Always lowercase**
- **Use kebab-case** for work names
- **Format:** `[identifier]-[work-name]`
- **Identifier:** custom (`mdo-123`) or auto (`ID-01`)
- **Duplicate handling:** Append `-02`, `-03` suffix if exists
</directory_conventions>

<identifier_examples>
| User Input | Work Name | Generated Directory |
|------------|-----------|---------------------|
| _(blank)_ | `parallels-ui-updates` | `ID-01-parallels-ui-updates/` |
| _(blank)_ | `fix-auth-bug` | `ID-02-fix-auth-bug/` |
| `mdo-123` | `api-refactor` | `mdo-123-api-refactor/` |
| `gh-456` | `performance-optimization` | `gh-456-performance-optimization/` |
| `JIRA-789` | `database-migration` | `JIRA-789-database-migration/` |
</identifier_examples>

<integration>
## Works With Existing Skills

- **`/create-plan`** - Create detailed phase plans in `phases/` subdirectory
- **`/run-plan`** - Execute plans created in work directory

Plans are numbered `01-01`, `01-02`, etc. (phase-plan format) within the phases/ subdirectory.
</integration>

<success_criteria>
Skill execution is successful when:
- [ ] `.planning/[identifier]-[work-name]/` directory created
- [ ] BRIEF.md generated with correct identifier and work details
- [ ] ROADMAP.md generated with Phase 01 placeholder
- [ ] `phases/` subdirectory exists
- [ ] User informed of next steps
- [ ] Root-level docs offered if missing (always ask first)
- [ ] Duplicate directories handled (auto-append suffix)
- [ ] Auto-numbering works correctly (ID-01, ID-02, etc.)
</success_criteria>
