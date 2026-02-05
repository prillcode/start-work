# Setup and Publishing Guide

## Repository Structure

```
start-work/                          (rename from start-work-skill)
├── README.md                        ✅ Complete documentation
├── package.json                     ✅ NPM package config
├── install.js                       ✅ Installation script
├── LICENSE                          ✅ MIT license
├── CHANGELOG.md                     ✅ Version history
├── .gitignore                       ✅ Git ignore rules
├── skills/                          ✅ Skill files
│   ├── start-work/
│   │   ├── SKILL.md
│   │   └── templates/
│   │       ├── work-brief.md
│   │       ├── work-roadmap.md
│   │       ├── project-brief.md
│   │       └── project-roadmap.md
│   └── create-plans/
│       ├── SKILL.md
│       ├── references/              (10 reference files)
│       ├── templates/               (8 template files)
│       └── workflows/               (8 workflow files)
└── commands/                        ✅ Slash commands
    ├── start-work.md
    ├── create-plan.md
    └── run-plan.md
```

## Next Steps

### 1. Rename Directory

```bash
mv ~/dev/start-work-skill ~/dev/start-work
cd ~/dev/start-work
```

### 2. Initialize Git Repository (if not already done)

```bash
cd ~/dev/start-work
git init
git add .
git commit -m "feat: initial commit of start-work planning suite"
```

### 3. Create GitHub Repository

**Option A: Via GitHub CLI**
```bash
gh repo create prillcode/start-work --public --source=. --remote=origin
git push -u origin main
```

**Option B: Via GitHub Web**
1. Go to https://github.com/new
2. Repository name: `start-work`
3. Description: "Complete Claude Code planning suite"
4. Public repository
5. Don't initialize with README (we have one)
6. Create repository

Then push:
```bash
git remote add origin https://github.com/prillcode/start-work.git
git branch -M main
git push -u origin main
```

### 4. Test Installation Locally

Before publishing to NPM, test the installer locally:

```bash
cd ~/dev/start-work

# Link package locally
npm link

# Test installation (will install to your ~/.claude)
start-work

# Or test with npx
npx .
```

Verify:
```bash
ls ~/.claude/skills/start-work/
ls ~/.claude/skills/create-plans/
ls ~/.claude/commands/start-work.md
ls ~/.claude/commands/create-plan.md
ls ~/.claude/commands/run-plan.md
```

### 5. Publish to NPM

**First time setup:**
```bash
# Login to NPM (if not already)
npm login

# Verify you're logged in
npm whoami
```

**Publish:**
```bash
cd ~/dev/start-work

# Dry run to see what will be published
npm publish --dry-run

# Actually publish
npm publish --access public
```

**Note:** For scoped packages like `@prillcode/start-work`, you need `--access public` for first publish.

### 6. Test from NPM

After publishing, test the real installation:

```bash
# Remove local installation for clean test
rm -rf ~/.claude/skills/start-work
rm -rf ~/.claude/skills/create-plans
rm ~/.claude/commands/start-work.md
rm ~/.claude/commands/create-plan.md
rm ~/.claude/commands/run-plan.md

# Install from NPM
npx @prillcode/start-work

# Verify it worked
/start-work
```

## Publishing Updates

### 1. Make Changes

Edit files as needed (skills, templates, installer, etc.)

### 2. Update Version

```bash
# For patches (bug fixes)
npm version patch

# For minor features
npm version minor

# For breaking changes
npm version major
```

This automatically:
- Updates package.json version
- Creates a git commit
- Creates a git tag

### 3. Update CHANGELOG.md

Add your changes to CHANGELOG.md under the new version.

### 4. Commit and Push

```bash
git add .
git commit -m "chore: update changelog for v1.0.1"
git push
git push --tags
```

### 5. Publish to NPM

```bash
npm publish
```

### 6. Create GitHub Release

```bash
# Via GitHub CLI
gh release create v1.0.1 --title "v1.0.1" --notes "See CHANGELOG.md"

# Or manually at:
# https://github.com/prillcode/start-work/releases/new
```

## Package Configuration

**package.json key fields:**
- `name`: `@prillcode/start-work` (NPM package name)
- `version`: `1.0.0` (Semantic versioning)
- `bin`: Maps `start-work` command to `install.js`
- `files`: Specifies what gets published to NPM
- `repository`: Links to GitHub repo

**What gets published:**
- `install.js` - Installation script
- `skills/` - Both skills with all files
- `commands/` - All slash commands
- `README.md` - Documentation
- `LICENSE` - MIT license

**What doesn't get published:**
- `.git/` - Git history
- `node_modules/` - Dependencies
- Files in `.gitignore`

## Troubleshooting

### NPM publish fails with 403

You need to be logged in and have permissions:
```bash
npm login
npm whoami
```

### Package name already taken

Change the name in package.json:
```json
{
  "name": "@prillcode/start-work-planning"
}
```

### Installation fails locally

Check file permissions:
```bash
chmod +x install.js
```

### Users can't install

Verify package is public:
```bash
npm view @prillcode/start-work
```

## Installation for Users

Once published, users install with:

```bash
npx @prillcode/start-work
```

That's it! The installer:
- ✅ Copies skills to `~/.claude/skills/`
- ✅ Copies commands to `~/.claude/commands/`
- ✅ Backs up existing installations
- ✅ Verifies everything works
- ✅ Shows next steps

## Support

After publishing:
- Users report issues at: https://github.com/prillcode/start-work/issues
- Update README with examples and FAQs
- Monitor for installation problems
- Release patches as needed

## Marketing

Consider:
- Tweet about the release
- Post in Claude Code community
- Share in developer forums
- Add to awesome-claude-code lists
- Create video walkthrough

---

**Ready to publish?**
1. Rename directory to `start-work`
2. Push to GitHub
3. Test locally with `npm link`
4. Publish to NPM with `npm publish --access public`
5. Test installation with `npx @prillcode/start-work`
