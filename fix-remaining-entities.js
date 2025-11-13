#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing All Remaining HTML Entity Issues');
console.log('==========================================\n');

// Utility functions
function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    return null;
  }
}

function writeFile(filePath, content) {
  try {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  } catch (error) {
    return false;
  }
}

// Function to fix HTML entities in a file
function fixHtmlEntities(content) {
  return content
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

// Get all TypeScript/TSX files
function getAllTsFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory() && !item.name.startsWith('.') && item.name !== 'node_modules') {
      files.push(...getAllTsFiles(fullPath));
    } else if (item.isFile() && (item.name.endsWith('.ts') || item.name.endsWith('.tsx'))) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Process all files
const allFiles = getAllTsFiles('.');
let fixedCount = 0;

console.log(`📁 Found ${allFiles.length} TypeScript/TSX files to check`);

allFiles.forEach(filePath => {
  const content = readFile(filePath);
  if (content) {
    const fixedContent = fixHtmlEntities(content);
    if (content !== fixedContent) {
      if (writeFile(filePath, fixedContent)) {
        console.log(`✅ Fixed: ${filePath}`);
        fixedCount++;
      }
    }
  }
});

console.log(`\n🎉 Fixed HTML entities in ${fixedCount} files`);
console.log('\n📋 Next Steps:');
console.log('1. Run: npm run type-check (to verify fixes)');
console.log('2. Run: npm run lint (to check ESLint issues)');
console.log('3. Test the application functionality');
