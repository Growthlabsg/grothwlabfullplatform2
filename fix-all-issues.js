#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing All GrowthLab Platform Issues');
console.log('=======================================\n');

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

// Fix 1: HTML Entity Encoding Issues
console.log('🔧 Fix 1: HTML Entity Encoding Issues');
console.log('-------------------------------------');

const filesToFix = [
  // Web components
  'components/chat/chat-window.tsx',
  'components/chat/smart-discovery.tsx',
  'components/feed/guest-feed.tsx',
  'components/profile/linkedin-integration.tsx',
  
  // Mobile app files
  'mobile-app/GrowthLabMobile/App.tsx',
  'mobile-app/GrowthLabMobile/index.ts',
  'mobile-app/GrowthLabMobile/src/constants/theme.ts',
  'mobile-app/GrowthLabMobile/src/contexts/AuthContext.tsx',
  'mobile-app/GrowthLabMobile/src/contexts/LanguageContext.tsx',
  'mobile-app/GrowthLabMobile/src/contexts/NotificationContext.tsx',
  'mobile-app/GrowthLabMobile/src/contexts/ThemeContext.tsx',
  'mobile-app/GrowthLabMobile/src/navigation/RootNavigator.tsx',
  'mobile-app/GrowthLabMobile/src/screens/auth/EmailVerificationScreen.tsx',
  'mobile-app/GrowthLabMobile/src/screens/auth/ForgotPasswordScreen.tsx',
  'mobile-app/GrowthLabMobile/src/screens/auth/LoginScreen.tsx',
  'mobile-app/GrowthLabMobile/src/screens/auth/RegisterScreen.tsx',
  'mobile-app/GrowthLabMobile/src/screens/auth/ResetPasswordScreen.tsx',
  'mobile-app/GrowthLabMobile/src/screens/common/LoadingScreen.tsx',
  'mobile-app/GrowthLabMobile/src/screens/features/CalendarScreen.tsx',
  'mobile-app/GrowthLabMobile/src/screens/features/ChatScreen.tsx',
  'mobile-app/GrowthLabMobile/src/screens/features/EventDetailsScreen.tsx',
  'mobile-app/GrowthLabMobile/src/screens/features/FundingDetailsScreen.tsx',
  'mobile-app/GrowthLabMobile/src/screens/features/JobDetailsScreen.tsx',
  'mobile-app/GrowthLabMobile/src/screens/features/MentorshipScreen.tsx',
  'mobile-app/GrowthLabMobile/src/screens/features/QRCodeScreen.tsx',
  'mobile-app/GrowthLabMobile/src/screens/features/SearchScreen.tsx',
  'mobile-app/GrowthLabMobile/src/screens/features/StartupSchoolScreen.tsx',
  'mobile-app/GrowthLabMobile/src/screens/features/UserProfileScreen.tsx',
  'mobile-app/GrowthLabMobile/src/screens/main/DashboardScreen.tsx',
  'mobile-app/GrowthLabMobile/src/screens/main/EventsScreen.tsx',
  'mobile-app/GrowthLabMobile/src/screens/main/FundingScreen.tsx',
  'mobile-app/GrowthLabMobile/src/screens/main/HomeScreen.tsx',
  'mobile-app/GrowthLabMobile/src/screens/main/JobsScreen.tsx',
  'mobile-app/GrowthLabMobile/src/screens/main/MessagesScreen.tsx',
  'mobile-app/GrowthLabMobile/src/screens/main/NetworkScreen.tsx',
  'mobile-app/GrowthLabMobile/src/screens/main/NotificationsScreen.tsx',
  'mobile-app/GrowthLabMobile/src/screens/main/ProfileScreen.tsx',
  'mobile-app/GrowthLabMobile/src/screens/main/ResourcesScreen.tsx',
  'mobile-app/GrowthLabMobile/src/screens/main/SettingsScreen.tsx'
];

let fixedFiles = 0;
let totalFiles = 0;

filesToFix.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    totalFiles++;
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
          fixedFiles++;
        }
      } else {
        console.log(`ℹ️  No changes needed: ${filePath}`);
      }
    }
  } else {
    console.log(`⚠️  File not found: ${filePath}`);
  }
});

console.log(`\n📊 HTML Entity Fix Summary: ${fixedFiles}/${totalFiles} files fixed\n`);

// Fix 2: React Hooks Violations
console.log('🔧 Fix 2: React Hooks Violations');
console.log('--------------------------------');

const hooksFixes = [
  {
    file: 'components/feed/ai-post-generator.tsx',
    pattern: /const \{ useTemplate \} = useTemplate\(\);/g,
    replacement: 'const useTemplateHook = useTemplate();'
  },
  {
    file: 'components/qr-code/persistent-qr-button.tsx',
    pattern: /if \(.*\) \{\s*const \{ qrCode \} = useQRCode\(\);/g,
    replacement: (match) => {
      return match.replace('const { qrCode } = useQRCode();', 'const qrCodeHook = useQRCode();');
    }
  },
  {
    file: 'components/sidebar/growthlab-sidebar.tsx',
    pattern: /const initializeQRCode = \(\) => \{\s*const \{ qrCode \} = useQRCode\(\);/g,
    replacement: (match) => {
      return match.replace('const { qrCode } = useQRCode();', 'const qrCodeHook = useQRCode();');
    }
  }
];

hooksFixes.forEach(fix => {
  if (fs.existsSync(fix.file)) {
    const content = readFile(fix.file);
    if (content) {
      let fixedContent = content;
      if (typeof fix.replacement === 'function') {
        fixedContent = content.replace(fix.pattern, fix.replacement);
      } else {
        fixedContent = content.replace(fix.pattern, fix.replacement);
      }
      
      if (content !== fixedContent) {
        if (writeFile(fix.file, fixedContent)) {
          console.log(`✅ Fixed React Hooks: ${fix.file}`);
        }
      }
    }
  }
});

// Fix 3: Missing Icon Imports
console.log('\n🔧 Fix 3: Missing Icon Imports');
console.log('-------------------------------');

const iconFixes = [
  {
    file: 'components/communication/google-meet-integration.tsx',
    imports: [
      'Signal',
      'BatteryCharging', 
      'Battery',
      'Wifi',
      'Plus',
      'Download',
      'Link'
    ],
    source: 'lucide-react'
  }
];

iconFixes.forEach(fix => {
  if (fs.existsSync(fix.file)) {
    const content = readFile(fix.file);
    if (content) {
      // Check if lucide-react import exists
      const lucideImportMatch = content.match(/import \{ ([^}]+) \} from ['"]lucide-react['"]/);
      
      if (lucideImportMatch) {
        const existingIcons = lucideImportMatch[1].split(',').map(icon => icon.trim());
        const missingIcons = fix.imports.filter(icon => !existingIcons.includes(icon));
        
        if (missingIcons.length > 0) {
          const newIcons = [...existingIcons, ...missingIcons].join(', ');
          const fixedContent = content.replace(
            /import \{ ([^}]+) \} from ['"]lucide-react['"]/,
            `import { ${newIcons} } from 'lucide-react'`
          );
          
          if (writeFile(fix.file, fixedContent)) {
            console.log(`✅ Added missing icons to ${fix.file}: ${missingIcons.join(', ')}`);
          }
        }
      } else {
        // Add new import if none exists
        const importStatement = `import { ${fix.imports.join(', ')} } from 'lucide-react';\n`;
        const fixedContent = importStatement + content;
        
        if (writeFile(fix.file, fixedContent)) {
          console.log(`✅ Added icon import to ${fix.file}`);
        }
      }
    }
  }
});

// Fix 4: ESLint Unescaped Entities
console.log('\n🔧 Fix 4: ESLint Unescaped Entities');
console.log('-----------------------------------');

const entityFixes = [
  {
    file: 'app/legal/privacy/page.tsx',
    patterns: [
      { from: /'/g, to: '&apos;' },
      { from: /"/g, to: '&quot;' }
    ]
  },
  {
    file: 'app/legal/terms/page.tsx',
    patterns: [
      { from: /'/g, to: '&apos;' },
      { from: /"/g, to: '&quot;' }
    ]
  }
];

entityFixes.forEach(fix => {
  if (fs.existsSync(fix.file)) {
    const content = readFile(fix.file);
    if (content) {
      let fixedContent = content;
      fix.patterns.forEach(pattern => {
        fixedContent = fixedContent.replace(pattern.from, pattern.to);
      });
      
      if (content !== fixedContent) {
        if (writeFile(fix.file, fixedContent)) {
          console.log(`✅ Fixed unescaped entities: ${fix.file}`);
        }
      }
    }
  }
});

// Fix 5: Update TypeScript Configuration
console.log('\n🔧 Fix 5: TypeScript Configuration');
console.log('----------------------------------');

const tsConfigPath = 'tsconfig.json';
if (fs.existsSync(tsConfigPath)) {
  const tsConfig = readFile(tsConfigPath);
  if (tsConfig) {
    try {
      const config = JSON.parse(tsConfig);
      
      // Add strict mode and other recommended settings
      config.compilerOptions = {
        ...config.compilerOptions,
        strict: true,
        noImplicitAny: true,
        strictNullChecks: true,
        strictFunctionTypes: true,
        noImplicitReturns: true,
        noFallthroughCasesInSwitch: true,
        noUncheckedIndexedAccess: true
      };
      
      if (writeFile(tsConfigPath, JSON.stringify(config, null, 2))) {
        console.log('✅ Updated TypeScript configuration');
      }
    } catch (error) {
      console.log(`⚠️  Could not parse tsconfig.json: ${error.message}`);
    }
  }
}

// Fix 6: Add Missing Alt Attributes
console.log('\n🔧 Fix 6: Add Missing Alt Attributes');
console.log('------------------------------------');

const altFixes = [
  {
    file: 'components/business/business-page-manager.tsx',
    patterns: [
      { from: /<img([^>]*)\/>/g, to: '<img$1 alt="" />' }
    ]
  }
];

altFixes.forEach(fix => {
  if (fs.existsSync(fix.file)) {
    const content = readFile(fix.file);
    if (content) {
      let fixedContent = content;
      fix.patterns.forEach(pattern => {
        fixedContent = fixedContent.replace(pattern.from, pattern.to);
      });
      
      if (content !== fixedContent) {
        if (writeFile(fix.file, fixedContent)) {
          console.log(`✅ Added alt attributes: ${fix.file}`);
        }
      }
    }
  }
});

// Fix 7: Update package.json scripts
console.log('\n🔧 Fix 7: Update Package Scripts');
console.log('--------------------------------');

const packagePath = 'package.json';
if (fs.existsSync(packagePath)) {
  const packageContent = readFile(packagePath);
  if (packageContent) {
    try {
      const packageJson = JSON.parse(packageContent);
      
      // Add test script if missing
      if (!packageJson.scripts.test) {
        packageJson.scripts.test = 'jest';
      }
      
      // Add type-check script
      if (!packageJson.scripts['type-check']) {
        packageJson.scripts['type-check'] = 'tsc --noEmit';
      }
      
      // Add lint-fix script
      if (!packageJson.scripts['lint-fix']) {
        packageJson.scripts['lint-fix'] = 'next lint --fix';
      }
      
      if (writeFile(packagePath, JSON.stringify(packageJson, null, 2))) {
        console.log('✅ Updated package.json scripts');
      }
    } catch (error) {
      console.log(`⚠️  Could not parse package.json: ${error.message}`);
    }
  }
}

console.log('\n🎉 All fixes completed!');
console.log('\n📋 Next Steps:');
console.log('1. Run: npm run type-check (to verify TypeScript fixes)');
console.log('2. Run: npm run lint (to check remaining ESLint issues)');
console.log('3. Run: npm run build (to test the build)');
console.log('4. Test the application to ensure everything works correctly');

console.log('\n⚠️  Note: Some manual review may be needed for:');
console.log('- React Hook dependency arrays');
console.log('- Complex component logic');
console.log('- Mobile app specific functionality');
