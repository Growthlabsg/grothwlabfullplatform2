#!/usr/bin/env node

const fs = require('fs');

console.log('🔧 Fixing Legal Pages HTML Entity Encoding');
console.log('==========================================\n');

// Utility function to read file content
function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.log(`⚠️  Could not read ${filePath}: ${error.message}`);
    return null;
  }
}

// Utility function to write file content
function writeFile(filePath, content) {
  try {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  } catch (error) {
    console.log(`❌ Could not write ${filePath}: ${error.message}`);
    return false;
  }
}

const legalFiles = [
  'app/legal/privacy/page.tsx',
  'app/legal/terms/page.tsx'
];

legalFiles.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    console.log(`🔧 Processing: ${filePath}`);
    const content = readFile(filePath);
    if (content) {
      // Fix HTML entity encoding
      let fixedContent = content
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&');
      
      if (content !== fixedContent) {
        if (writeFile(filePath, fixedContent)) {
          console.log(`✅ Fixed: ${filePath}`);
        }
      } else {
        console.log(`ℹ️  No changes needed: ${filePath}`);
      }
    }
  } else {
    console.log(`⚠️  File not found: ${filePath}`);
  }
});

console.log('\n🎉 Legal pages fix completed!');
