# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2026-02-05

### Added
- Domain expertise system for framework-specific planning patterns
- Sample domain expertise: `angular-aws-fullstack` (Angular + Fastify + AWS)
- Domain field in project BRIEF.md template for specifying expertise
- CREATE-DOMAIN-EXPERTISE.md prompt for generating custom domain skills
- Version display in installer header (shows current package version)
- Context detection in create-plans workflows (work item vs project mode)

### Changed
- Installer now prompts for backups instead of auto-creating them (default: no backup)
- create-plans workflows detect context and use appropriate base paths
- All workflow file paths now use `${PLANNING_BASE}` variable for flexibility

### Fixed
- Nested `.planning/` directory creation when using start-work with create-plans
- Domain expertise scanning no longer defaults to iOS/macOS (scans available domains)
- Backup directory pollution (only creates backups when user confirms)

## [1.1.0] - 2026-02-05

### Added
- User prompt for relevant file paths in `start-work` skill
- Three options: provide paths manually, scan automatically with confirmation, or skip
- "Relevant Files" section in BRIEF.md with markdown links to specified files
- Validation and warning for non-existent file paths

### Changed
- Automatic codebase scanning now requires user confirmation before including files
- File gathering moved to Step 5 (before BRIEF.md generation) to prevent false assumptions

### Fixed
- Eliminated false assumptions about relevant files from automatic keyword-based scanning
- User now has control over which files are included in work context

## [1.0.0] - 2026-02-05

### Added
- Initial release of start-work planning suite
- `start-work` skill for initializing work items
- `create-plans` skill for hierarchical project planning
- Three slash commands: `/start-work`, `/create-plan`, `/run-plan`
- NPX installer for easy installation
- Auto-numbering support (ID-01, ID-02, etc.)
- Custom identifier support (JIRA, GitHub, etc.)
- Work-level and project-level templates
- Duplicate detection with auto-suffixing
- Comprehensive documentation

### Features
- **start-work skill:**
  - Auto-numbered identifiers
  - Custom identifier support
  - Duplicate handling
  - Work and project templates
  - Context-aware commit behavior

- **create-plans skill:**
  - Plans as executable prompts
  - Hierarchical planning structure
  - Research workflow for unknowns
  - Checkpoint management
  - Verification-first approach

- **run-plan command:**
  - Intelligent execution strategies
  - Segmented execution support
  - Checkpoint handling
  - Automated SUMMARY generation

### Documentation
- Comprehensive README
- Installation guide
- Complete workflow examples
- Troubleshooting section

[1.2.0]: https://github.com/prillcode/start-work/releases/tag/v1.2.0
[1.1.0]: https://github.com/prillcode/start-work/releases/tag/v1.1.0
[1.0.0]: https://github.com/prillcode/start-work/releases/tag/v1.0.0
