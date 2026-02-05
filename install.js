#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  bold: '\x1b[1m'
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function logSuccess(message) {
  log(`✓ ${message}`, colors.green);
}

function logInfo(message) {
  log(`ℹ ${message}`, colors.blue);
}

function logWarning(message) {
  log(`⚠ ${message}`, colors.yellow);
}

function logError(message) {
  log(`✗ ${message}`, colors.red);
}

function logHeader(message) {
  log(`\n${colors.bold}${message}${colors.reset}`);
}

function copyRecursive(src, dest) {
  if (fs.statSync(src).isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(file => {
      copyRecursive(path.join(src, file), path.join(dest, file));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

function backupIfExists(targetPath, name) {
  if (fs.existsSync(targetPath)) {
    logWarning(`${name} already exists`);
    logInfo(`Backing up existing ${name}...`);
    const backupPath = `${targetPath}.backup.${Date.now()}`;
    fs.renameSync(targetPath, backupPath);
    logSuccess(`Backed up to ${backupPath}`);
    return true;
  }
  return false;
}

function install() {
  logHeader('📦 Installing Start Work Planning Suite');
  console.log();
  logInfo('This package includes:');
  console.log('  • start-work skill - Initialize work items');
  console.log('  • create-plans skill - Hierarchical project planning');
  console.log('  • /start-work, /create-plan, /run-plan commands');
  console.log();

  const homeDir = os.homedir();
  const claudeDir = path.join(homeDir, '.claude');
  const skillsDir = path.join(claudeDir, 'skills');
  const commandsDir = path.join(claudeDir, 'commands');

  // Source paths
  const sourceSkillsDir = path.join(__dirname, 'skills');
  const sourceCommandsDir = path.join(__dirname, 'commands');

  // Step 1: Check Claude Code installation
  logInfo('Checking Claude Code installation...');
  if (!fs.existsSync(claudeDir)) {
    logWarning(`Claude Code directory not found at ${claudeDir}`);
    logInfo('Creating .claude directory...');
    fs.mkdirSync(claudeDir, { recursive: true });
  }

  // Step 2: Create directories
  logInfo('Creating directories...');
  if (!fs.existsSync(skillsDir)) {
    fs.mkdirSync(skillsDir, { recursive: true });
    logSuccess('Created ~/.claude/skills/');
  }
  if (!fs.existsSync(commandsDir)) {
    fs.mkdirSync(commandsDir, { recursive: true });
    logSuccess('Created ~/.claude/commands/');
  }

  // Step 3: Install create-plans skill
  logHeader('📚 Installing create-plans Skill');
  const createPlansSource = path.join(sourceSkillsDir, 'create-plans');
  const createPlansTarget = path.join(skillsDir, 'create-plans');

  backupIfExists(createPlansTarget, 'create-plans skill');

  try {
    copyRecursive(createPlansSource, createPlansTarget);
    logSuccess(`Installed create-plans to ${createPlansTarget}`);
  } catch (error) {
    logError(`Failed to install create-plans: ${error.message}`);
    process.exit(1);
  }

  // Step 4: Install start-work skill
  logHeader('🚀 Installing start-work Skill');
  const startWorkSource = path.join(sourceSkillsDir, 'start-work');
  const startWorkTarget = path.join(skillsDir, 'start-work');

  backupIfExists(startWorkTarget, 'start-work skill');

  try {
    copyRecursive(startWorkSource, startWorkTarget);
    logSuccess(`Installed start-work to ${startWorkTarget}`);
  } catch (error) {
    logError(`Failed to install start-work: ${error.message}`);
    process.exit(1);
  }

  // Step 5: Install slash commands
  logHeader('⚡ Installing Slash Commands');

  const commands = ['create-plan.md', 'run-plan.md', 'start-work.md'];
  let commandsInstalled = 0;

  commands.forEach(cmd => {
    const source = path.join(sourceCommandsDir, cmd);
    const target = path.join(commandsDir, cmd);

    if (!fs.existsSync(source)) {
      logWarning(`Command ${cmd} not found in package, skipping`);
      return;
    }

    try {
      if (fs.existsSync(target)) {
        logInfo(`Overwriting existing /${cmd.replace('.md', '')} command`);
      }
      fs.copyFileSync(source, target);
      logSuccess(`Installed /${cmd.replace('.md', '')} command`);
      commandsInstalled++;
    } catch (error) {
      logError(`Failed to install ${cmd}: ${error.message}`);
    }
  });

  // Step 6: Verify installation
  logHeader('🔍 Verifying Installation');

  const checks = [
    { path: path.join(createPlansTarget, 'SKILL.md'), name: 'create-plans SKILL.md' },
    { path: path.join(startWorkTarget, 'SKILL.md'), name: 'start-work SKILL.md' },
    { path: path.join(startWorkTarget, 'templates'), name: 'start-work templates' },
    { path: path.join(commandsDir, 'create-plan.md'), name: '/create-plan command' },
    { path: path.join(commandsDir, 'run-plan.md'), name: '/run-plan command' },
    { path: path.join(commandsDir, 'start-work.md'), name: '/start-work command' }
  ];

  let allChecksPass = true;
  checks.forEach(check => {
    if (fs.existsSync(check.path)) {
      logSuccess(check.name);
    } else {
      logError(`${check.name} not found`);
      allChecksPass = false;
    }
  });

  // Step 7: Success message
  if (allChecksPass) {
    logHeader('✅ Installation Complete!');
    console.log();
    logInfo('You now have access to:');
    console.log();
    console.log(`  ${colors.bold}/start-work${colors.reset} - Initialize new work items`);
    console.log(`    Example: ${colors.bold}/start-work mdo-123 api-refactor${colors.reset}`);
    console.log(`    Example: ${colors.bold}/start-work "" my-feature${colors.reset} (auto-number)`);
    console.log();
    console.log(`  ${colors.bold}/create-plan${colors.reset} - Create detailed phase plans`);
    console.log(`    Example: ${colors.bold}/create-plan${colors.reset}`);
    console.log();
    console.log(`  ${colors.bold}/run-plan${colors.reset} - Execute PLAN.md files`);
    console.log(`    Example: ${colors.bold}/run-plan .planning/ID-01-feature/phases/01-01-PLAN.md${colors.reset}`);
    console.log();
    logInfo('Quick start workflow:');
    console.log(`  1. ${colors.bold}/start-work${colors.reset} - Initialize work item`);
    console.log(`  2. ${colors.bold}/create-plan${colors.reset} - Create detailed plans`);
    console.log(`  3. ${colors.bold}/run-plan <path>${colors.reset} - Execute plans`);
    console.log();
    logInfo('Documentation:');
    console.log('  https://github.com/prillcode/start-work');
    console.log();
  } else {
    logHeader('⚠️  Installation Completed with Warnings');
    console.log();
    logWarning('Some components may not have installed correctly.');
    logInfo('Please check the error messages above and try again if needed.');
    console.log();
  }
}

// Run installation
try {
  install();
} catch (error) {
  logError(`Installation failed: ${error.message}`);
  console.error(error);
  process.exit(1);
}
