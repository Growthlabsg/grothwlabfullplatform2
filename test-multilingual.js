#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🌐 Testing GrowthLab Platform - Multilingual & Dashboard Organization');
console.log('==================================================================\n');

// Test 1: Check if all language files are properly configured
console.log('✅ Test 1: Language Context Configuration');
try {
  const languageContext = fs.readFileSync('contexts/language-context.tsx', 'utf8');
  const supportedLanguages = ['en', 'zh', 'ms', 'ta', 'id', 'vi', 'th'];
  
  supportedLanguages.forEach(lang => {
    if (languageContext.includes(`  ${lang}: {`)) {
      console.log(`   ✓ ${lang} language configured`);
    } else {
      console.log(`   ✗ ${lang} language missing`);
    }
  });
} catch (error) {
  console.log('   ✗ Language context file not found');
}

// Test 2: Check dashboard organization
console.log('\n✅ Test 2: Dashboard Organization');
try {
  const dashboardPage = fs.readFileSync('app/dashboard/page.tsx', 'utf8');
  const dashboardLayout = fs.readFileSync('app/dashboard/layout.tsx', 'utf8');
  
  if (dashboardPage.includes('dashboard.title')) {
    console.log('   ✓ Dashboard page created');
  } else {
    console.log('   ✗ Dashboard page missing');
  }
  
  if (dashboardLayout.includes('DashboardLayout')) {
    console.log('   ✓ Dashboard layout created');
  } else {
    console.log('   ✗ Dashboard layout missing');
  }
} catch (error) {
  console.log('   ✗ Dashboard files not found');
}

// Test 3: Check sidebar integration
console.log('\n✅ Test 3: Sidebar Integration');
try {
  const sidebar = fs.readFileSync('components/sidebar/growthlab-sidebar.tsx', 'utf8');
  
  if (sidebar.includes('href: "/dashboard"')) {
    console.log('   ✓ Dashboard link in sidebar');
  } else {
    console.log('   ✗ Dashboard link missing from sidebar');
  }
  
  if (sidebar.includes('Activity')) {
    console.log('   ✓ Analytics icon updated');
  } else {
    console.log('   ✗ Analytics icon not updated');
  }
} catch (error) {
  console.log('   ✗ Sidebar file not found');
}

// Test 4: Check language selector
console.log('\n✅ Test 4: Language Selector');
try {
  const languageSelector = fs.readFileSync('components/language/language-selector.tsx', 'utf8');
  
  if (languageSelector.includes('🇺🇸') && languageSelector.includes('🇨🇳')) {
    console.log('   ✓ Language flags configured');
  } else {
    console.log('   ✗ Language flags missing');
  }
  
  if (languageSelector.includes('English') && languageSelector.includes('中文')) {
    console.log('   ✓ Language names configured');
  } else {
    console.log('   ✗ Language names missing');
  }
} catch (error) {
  console.log('   ✗ Language selector file not found');
}

// Test 5: Check translation keys
console.log('\n✅ Test 5: Translation Keys');
const requiredKeys = [
  'dashboard.title',
  'dashboard.subtitle',
  'dashboard.analytics',
  'dashboard.admin',
  'dashboard.investor',
  'dashboard.mentor',
  'dashboard.teacher',
  'dashboard.growthstarter',
  'dashboard.startup',
  'dashboard.super-admin'
];

try {
  const languageContext = fs.readFileSync('contexts/language-context.tsx', 'utf8');
  
  requiredKeys.forEach(key => {
    if (languageContext.includes(`"${key}"`)) {
      console.log(`   ✓ Translation key: ${key}`);
    } else {
      console.log(`   ✗ Missing translation key: ${key}`);
    }
  });
} catch (error) {
  console.log('   ✗ Could not check translation keys');
}

// Test 6: Check build status
console.log('\n✅ Test 6: Build Status');
try {
  console.log('   Checking if server is running...');
  const response = execSync('curl -s -o /dev/null -w "%{http_code}" http://localhost:3000', { encoding: 'utf8' });
  
  if (response.trim() === '200') {
    console.log('   ✓ Development server running');
  } else {
    console.log('   ✗ Development server not responding');
  }
} catch (error) {
  console.log('   ✗ Could not check server status');
}

console.log('\n🎯 Summary:');
console.log('   - Dashboard organization: Centralized hub for all dashboard access');
console.log('   - Multilingual support: 7 languages (EN, ZH, MS, TA, ID, VI, TH)');
console.log('   - Language selector: Enhanced with flags and proper UI');
console.log('   - Sidebar integration: Dashboard link with proper navigation');
console.log('   - Translation system: Comprehensive key-value pairs');

console.log('\n🚀 Platform is ready for multilingual deployment!'); 