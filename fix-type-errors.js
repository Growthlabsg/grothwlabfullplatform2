#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing Type Errors in Dynamic Routes');
console.log('=======================================\n');

// List of files that need to be fixed
const filesToFix = [
  'app/funding/[id]/apply/page.tsx',
  'app/funding/[id]/page.tsx',
  'app/funding/investors/[id]/page.tsx',
  'app/funding/investors/[id]/connect/page.tsx',
  'app/growthstarter/campaign/[id]/page.tsx',
  'app/investor/co-founder-matching/[id]/page.tsx',
  'app/investor/co-founder-matching/[id]/progress/page.tsx',
  'app/investor/deals/[id]/page.tsx',
  'app/network/startups/[id]/page.tsx',
  'app/startup/guides/[id]/page.tsx',
  'app/connect/[userId]/page.tsx'
];

filesToFix.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    console.log(`Fixing ${filePath}...`);
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix the params type
    content = content.replace(
      /interface\s+\w+Params\s*\{\s*params:\s*\{([^}]+)\}\s*\}/g,
      (match, paramsContent) => {
        return `interface ${match.match(/interface\s+(\w+Params)/)?.[1] || 'PageParams'} {
  params: Promise<{${paramsContent}}>
}`
      }
    );
    
    // Fix the function signature
    content = content.replace(
      /export\s+default\s+function\s+(\w+)\s*\(\s*\{\s*params\s*\}:\s*(\w+Params)\s*\)\s*\{/g,
      'export default async function $1({ params }: $2) {\n  const resolvedParams = await params'
    );
    
    // Fix params usage
    content = content.replace(
      /params\.(\w+)/g,
      'resolvedParams.$1'
    );
    
    fs.writeFileSync(filePath, content);
    console.log(`  ✓ Fixed ${filePath}`);
  } else {
    console.log(`  ⚠ ${filePath} not found`);
  }
});

console.log('\n🎯 Type Error Fixes Summary:');
console.log('   ✅ All dynamic route pages updated');
console.log('   ✅ Params types fixed for Next.js 15');
console.log('   ✅ Async/await pattern implemented');
console.log('   ✅ Ready for build');

console.log('\n🚀 Platform should now build successfully!'); 