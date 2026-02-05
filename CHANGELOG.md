# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

[1.0.0]: https://github.com/prillcode/start-work/releases/tag/v1.0.0
