# Start-Work for Claude Code

**Start-Work** is a complete Claude Code planning solution for solo developers and small teams. Initialize work items, create detailed phase plans, and execute with integrated workflows.

Not sure how to start with Claude Code? Just **Start-Work**!

## Overview

This package includes two complementary Claude Code skills:

- **`start-work`** - Initialize structured work items (like JIRA issues) with auto-numbering
- **`create-plans`** - Create hierarchical, executable project plans optimized for Claude

Plus three slash commands: `/start-work`, `/create-plan`, and `/run-plan`

## Quick Install

```bash
npx @prillcode/start-work
```

That's it! The installer will:
- Install both skills to `~/.claude/skills/`
- Install slash commands to `~/.claude/commands/`
- Back up any existing installations
- Verify everything is working

## What You Get

### 📋 `/start-work` - Work Item Initialization

Creates structured planning directories for features, bugs, refactors, and enhancements.

**Features:**
- Auto-numbered identifiers (`ID-01`, `ID-02`) or custom (`mdo-123`, `gh-456`)
- Work-level BRIEF.md and ROADMAP.md templates
- Integration with external tracking systems (JIRA, GitHub, etc.)
- Duplicate detection with auto-suffixing
- Optional project-level documentation

**Usage:**
```bash
# Interactive mode
/start-work

# With arguments
/start-work mdo-123 api-refactor              # Custom ID
/start-work "" parallels-ui-updates           # Auto-number
/start-work gh-456 performance-optimization   # GitHub issue
```

**Creates:**
```
.planning/
└── mdo-123-api-refactor/
    ├── BRIEF.md         # Work scope and vision
    ├── ROADMAP.md       # Phase breakdown
    └── phases/          # Execution plans go here
```

### 📚 `/create-plan` - Hierarchical Planning

Create executable plans that Claude can run, not enterprise documentation that sits unused.

**Philosophy:**
- Plans are written **AS prompts** (PLAN.md IS the execution prompt)
- Optimized for solo developer + Claude (no teams, no stakeholders)
- Scope control keeps plans within ~50% context usage

**Features:**
- BRIEF.md → Human vision (what and why)
- ROADMAP.md → Phase structure
- PLAN.md → Claude-executable prompts
- SUMMARY.md → Execution outcomes
- Research workflow for unknowns
- Checkpoint management for human input

**Usage:**
```bash
# Interactive planning
/create-plan

# The skill guides you through:
# - Scanning existing structure
# - Creating briefs and roadmaps
# - Generating executable plans
```

### ⚡ `/run-plan` - Plan Execution

Execute PLAN.md files with intelligent segmentation for optimal quality.

**Strategies:**
- **Fully Autonomous** - No checkpoints, spawn single subagent
- **Segmented Execution** - Verify-only checkpoints, parallel segments
- **Decision-Dependent** - Action checkpoints, sequential in main context

**Usage:**
```bash
/run-plan .planning/mdo-123-api-refactor/phases/01-01-PLAN.md
```

## Complete Workflow

### 1. Initialize Work Item w/ Short Description
```bash
/start-work mdo-123 "API Refactor"
```

Creates `.planning/mdo-123-api-refactor/` with BRIEF.md and ROADMAP.md

### 2. Review and Refine
Edit the generated files:
- Update BRIEF.md with specific scope and success criteria
- Refine ROADMAP.md with phase breakdown

### 3. Create Detailed Plans
```bash
cd .planning/mdo-123-api-refactor
/create-plan
```

Generates executable PLAN.md files in `phases/` directory

### 4. Execute Plans
```bash
/run-plan .planning/mdo-123-api-refactor/phases/01-01-PLAN.md
```

Claude executes the plan, creates SUMMARY.md, and commits changes

## Directory Structure

```
.planning/
├── BRIEF.md                         # Project-level (optional)
├── ROADMAP.md                       # Project-level (optional)
├── ID-01-feature/                   # Auto-numbered work
│   ├── BRIEF.md
│   ├── ROADMAP.md
│   └── phases/
│       ├── 01-01-PLAN.md
│       └── 01-01-SUMMARY.md
├── mdo-123-api-refactor/            # Custom identifier
│   ├── BRIEF.md
│   ├── ROADMAP.md
│   └── phases/
│       ├── 01-01-PLAN.md
│       ├── 01-01-SUMMARY.md
│       ├── 01-02-PLAN.md
│       └── 01-02-SUMMARY.md
└── ID-02-bug-fix/                   # Another auto-numbered work
    ├── BRIEF.md
    ├── ROADMAP.md
    └── phases/
```

## Identifier Examples

| User Input | Work Name | Generated Directory |
|------------|-----------|---------------------|
| _(blank)_ | `parallels-ui-updates` | `ID-01-parallels-ui-updates/` |
| _(blank)_ | `fix-auth-bug` | `ID-02-fix-auth-bug/` |
| `mdo-123` | `api-refactor` | `mdo-123-api-refactor/` |
| `gh-456` | `performance-optimization` | `gh-456-performance-optimization/` |
| `JIRA-789` | `database-migration` | `JIRA-789-database-migration/` |

## Features in Detail

### Start-Work Features

✅ **Auto-numbering** - Scans `.planning/` for `ID-[nn]` patterns, generates next number
✅ **Custom identifiers** - Support for JIRA, GitHub, or any tracking system
✅ **Duplicate handling** - Auto-appends `-02`, `-03` if directory exists
✅ **Templates** - Work-level and project-level BRIEF/ROADMAP templates
✅ **Context detection** - Different commit behavior for user vs subagent invocation

### Create-Plans Features

✅ **Plans are prompts** - PLAN.md IS the execution prompt, not documentation
✅ **Scope control** - Plans complete within ~50% context for consistent quality
✅ **Research workflow** - Optional RESEARCH.md for unknowns
✅ **Checkpoints** - Human verification, decision, and action checkpoints
✅ **Verification** - All tasks include verification criteria
✅ **Summaries** - Structured SUMMARY.md documents outcomes

## Installation Details

### What Gets Installed

**Skills:**
- `~/.claude/skills/start-work/` - Work item initialization skill
- `~/.claude/skills/create-plans/` - Hierarchical planning skill

**Commands:**
- `~/.claude/commands/start-work.md` - Invokes start-work skill
- `~/.claude/commands/create-plan.md` - Invokes create-plans skill
- `~/.claude/commands/run-plan.md` - Executes PLAN.md files (standalone)

**Templates:**
- Work-level BRIEF.md and ROADMAP.md
- Project-level BRIEF.md and ROADMAP.md
- Planning references and workflows

### Verify Installation

```bash
# Check skills
ls ~/.claude/skills/start-work/SKILL.md
ls ~/.claude/skills/create-plans/SKILL.md

# Check commands
ls ~/.claude/commands/start-work.md
ls ~/.claude/commands/create-plan.md
ls ~/.claude/commands/run-plan.md
```

### Update to Latest Version

Simply run the installer again:

```bash
npx @prillcode/start-work
```

Existing installations are automatically backed up before updating.

## Commit Conventions

### User-Invoked (Manual)
```bash
feat: implement new feature
fix: resolve authentication bug
refactor: improve code structure
docs: update documentation
```

### Subagent-Invoked (Auto-commit from /run-plan)
```bash
feat(mdo-123-01): implement API endpoint
fix(ID-02-01): resolve authentication bug
refactor(gh-456-02): optimize database queries
```

## Requirements

- Claude Code CLI installed with compatible Node version
- Git (recommended for version control)

## Troubleshooting

### Skills not found after installation
```bash
# Verify installation
ls ~/.claude/skills/start-work/
ls ~/.claude/skills/create-plans/

# If missing, reinstall
npx @prillcode/start-work
```

### Commands not working
```bash
# Check if commands exist
ls ~/.claude/commands/*.md

# Make sure you're using forward slashes
/start-work (not \start-work)
```

### .planning/ directory not created
The directory is created automatically when you run `/start-work`. Check file permissions in your working directory.

## Philosophy

**For solo developers and small teams**, not enterprise planning processes.

- Plans are **prompts**, not documentation
- **Scope control** prevents context bloat
- **Human checkpoints** for critical decisions
- **Verification-first** approach ensures quality
- **Executable** from day one

## Contributing

Issues and pull requests welcome at [github.com/prillcode/start-work](https://github.com/prillcode/start-work)

## License

MIT

## Credits

- **create-plans** skill originally from [glittercowboy/taches-cc-resources](https://github.com/glittercowboy/taches-cc-resources)
- Maintained and enhanced by [prillcode](https://github.com/prillcode)

## Links

- **GitHub:** [github.com/prillcode/start-work](https://github.com/prillcode/start-work)
- **Issues:** [github.com/prillcode/start-work/issues](https://github.com/prillcode/start-work/issues)
- **NPM:** [@prillcode/start-work](https://www.npmjs.com/package/@prillcode/start-work)

---

Made with ❤️ for Claude Code developers
