# Create Domain Expertise Skills

Create domain expertise skills for the Claude Code planning suite that provide framework-specific patterns and best practices for project planning.

## Objective

Generate one or more domain expertise skills in the `~/.claude/skills/expertise/` directory. Each domain skill provides:
- Core principles that apply to all work in that domain
- Reference file organization mapped to phase types
- Actionable patterns Claude can apply during planning

## Context

Domain expertise skills integrate with the `create-plans` skill to provide context-specific knowledge during roadmap and phase planning. They must be context-efficient (5-12k tokens) to leave room for project planning.

## Available Domains to Create

Generate SKILL.md files (and optionally reference files) for any of these domains:

1. **nextjs-ecommerce** - Next.js, React, Tailwind, Stripe, Vercel
2. **python-django-api** - Django REST Framework, PostgreSQL, Celery
3. **react-native-mobile** - React Native, Expo, mobile-first patterns
4. **nodejs-microservices** - Node.js, Express/Fastify, Docker, K8s
5. **vue-firebase** - Vue 3, Composition API, Firebase, Pinia
6. **dotnet-blazor** - Blazor, C#, Entity Framework, Azure
7. **rails-postgres** - Ruby on Rails, PostgreSQL, ActiveRecord
8. **flutter-mobile** - Flutter, Dart, Material Design
9. **unity-games** - Unity, C#, game development patterns
10. **fastapi-ml** - FastAPI, Python, ML models, data science

Or suggest your own based on the tech stack.

## Instructions

For each domain expertise:

### 1. Create Directory Structure
```bash
mkdir -p ~/.claude/skills/expertise/[domain-name]/references
```

### 2. Create SKILL.md

Use this template structure:

````markdown
---
name: [domain-name]
description: [Brief description of what this expertise covers]
---

<principles>
## Core Principles

### Project Structure
[Standard project structure for this domain]

### Framework Conventions
[Naming conventions, file organization, architectural patterns]

### Common Patterns
[Frequently used patterns that apply across the domain]

### Integration Patterns
[How to integrate with common services/tools]

### Best Practices
[TypeScript/language conventions, testing approaches]

### Common Gotchas
[Mistakes to avoid, known issues, workarounds]

</principles>

<references_index>
## Reference Loading Guide

When planning phases, load references based on phase type:

**For [phase-type-1] phases:**
- references/[file1].md - [What it contains]

**For [phase-type-2] phases:**
- references/[file2].md - [What it contains]

**Always useful (load for any phase):**
- references/[file3].md - [What it contains]

**Phase type examples:**
- "[Example phase goal]" → [which references to load]

</references_index>

<workflows>
## Optional Workflows

[If domain has specific workflows, list them; otherwise: "This domain does not provide custom workflows."]
</workflows>
````

### 3. Create Reference Files (Optional)

For more complex domains, create 2-4 reference files in `references/`:
- Each file: 500-2000 lines, focused on one concern
- Examples: `components.md`, `routing.md`, `api-design.md`, `deployment.md`
- Make them actionable with code examples and specific patterns

### 4. Test the Domain Skill

Create a test project brief:
```bash
mkdir -p /tmp/test-project/.planning
cat > /tmp/test-project/.planning/BRIEF.md << 'EOF'
# Project Brief

**Project:** Test Project
**Domain Expertise:** [domain-name]

## Tech Stack
[List the technologies for this domain]
EOF
```

Then use `/create-plan` to verify the domain loads correctly.

## Quality Criteria

Each domain expertise should:
- [ ] SKILL.md contains comprehensive principles (3-5k tokens)
- [ ] References_index maps phase types to reference files
- [ ] Avoids over-documenting (not a complete framework reference)
- [ ] Provides actionable patterns Claude can apply
- [ ] Total context load stays under 15k tokens
- [ ] File structure follows the standard pattern

## Output Format

After creating each domain expertise, provide:

```
✅ Created domain expertise: [domain-name]

Location: ~/.claude/skills/expertise/[domain-name]/

Files created:
- SKILL.md ([token-count] tokens)
- references/[file1].md ([token-count] tokens) [if created]
- references/[file2].md ([token-count] tokens) [if created]

To use this domain:
1. Add to project BRIEF.md: **Domain Expertise:** [domain-name]
2. Run /create-plan to create roadmap with domain context
```

## Installation Prompt

After creating domains, offer to install them:

```
Which domains would you like me to create?
1. All 10 domains
2. Select specific domains (provide comma-separated list)
3. Let me suggest based on your tech stack

Enter your choice:
```

## Notes

- Keep SKILL.md focused on principles that apply to most projects in that domain
- Reference files are optional - only create for complex domains needing more detail
- Don't duplicate general programming knowledge - focus on domain-specific patterns
- Test each domain by using it in an actual planning session

## Example Workflow

```
User: "Create domain expertises for Next.js e-commerce and Python Django"

1. Create ~/.claude/skills/expertise/nextjs-ecommerce/
2. Write SKILL.md with Next.js + Stripe + Vercel patterns
3. Create references/nextjs-routing.md, references/stripe-integration.md
4. Create ~/.claude/skills/expertise/python-django-api/
5. Write SKILL.md with Django + DRF + PostgreSQL patterns
6. Test both domains load correctly

✅ Created 2 domain expertises ready for use
```

---

**Ready to begin?** Which domains would you like me to create?
