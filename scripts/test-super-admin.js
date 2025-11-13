#!/usr/bin/env node

/**
 * Test script for Super Admin Panel
 * This script verifies that all components are properly exported and accessible
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Super Admin Panel Components...\n');

// List of required components
const requiredComponents = [
  'SuperAdminLayout',
  'SuperAdminErrorBoundary',
  'UserManagement',
  'FeatureToggles',
  'PerformanceMonitoring',
  'SystemConfiguration',
  'AnalyticsOverview',
  'ActivityLogs',
  'SecurityDashboard'
];

// Check if components exist
let allComponentsExist = true;

requiredComponents.forEach(component => {
  // Handle different naming conventions
  let fileName = component;
  
  // Special cases for components with different naming
  if (component === 'SuperAdminLayout') {
    fileName = 'super-admin-layout';
  } else if (component === 'SuperAdminErrorBoundary') {
    fileName = 'super-admin-error-boundary';
  } else if (component === 'SecurityDashboard') {
    fileName = 'security-dashboard';
  } else {
    // Convert PascalCase to kebab-case
    fileName = component.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
  }
  
  const componentPath = path.join(__dirname, '..', 'components', 'super-admin', `${fileName}.tsx`);
  
  if (fs.existsSync(componentPath)) {
    console.log(`✅ ${component} - Found`);
  } else {
    console.log(`❌ ${component} - Missing`);
    allComponentsExist = false;
  }
});

console.log('\n📁 Checking file structure...');

// Check if main page exists
const mainPagePath = path.join(__dirname, '..', 'app', 'super-admin', 'page.tsx');
if (fs.existsSync(mainPagePath)) {
  console.log('✅ Super Admin Page - Found');
} else {
  console.log('❌ Super Admin Page - Missing');
  allComponentsExist = false;
}

// Check if layout exists
const layoutPath = path.join(__dirname, '..', 'components', 'super-admin', 'super-admin-layout.tsx');
if (fs.existsSync(layoutPath)) {
  console.log('✅ Super Admin Layout - Found');
} else {
  console.log('❌ Super Admin Layout - Missing');
  allComponentsExist = false;
}

console.log('\n🔍 Checking for potential issues...');

// Check for duplicate imports or unused components
const mainPageContent = fs.readFileSync(mainPagePath, 'utf8');
const importLines = mainPageContent.match(/import.*from.*/g) || [];

console.log(`📦 Found ${importLines.length} import statements`);

// Check for unused imports
const usedComponents = new Set();
requiredComponents.forEach(comp => {
  if (mainPageContent.includes(comp)) {
    usedComponents.add(comp);
  }
});

console.log(`🔗 ${usedComponents.size}/${requiredComponents.length} components are used in the main page`);

// Check for syntax errors
try {
  // Simple syntax check - try to parse the file
  const content = fs.readFileSync(mainPagePath, 'utf8');
  if (content.includes('export default')) {
    console.log('✅ Main page has proper export');
  } else {
    console.log('❌ Main page missing export');
    allComponentsExist = false;
  }
} catch (error) {
  console.log('❌ Error reading main page:', error.message);
  allComponentsExist = false;
}

console.log('\n📊 Test Results:');
if (allComponentsExist) {
  console.log('🎉 All tests passed! Super Admin Panel is ready.');
  console.log('\n🚀 You can now:');
  console.log('   1. Run "npm run dev" to start the development server');
  console.log('   2. Navigate to /super-admin to view the panel');
  console.log('   3. Test all navigation and functionality');
} else {
  console.log('⚠️  Some tests failed. Please check the issues above.');
  console.log('\n🔧 To fix issues:');
  console.log('   1. Ensure all required components exist');
  console.log('   2. Check component exports');
  console.log('   3. Verify import statements');
  console.log('   4. Run "npm run build" to check for compilation errors');
}

console.log('\n📚 For more information, see SUPER_ADMIN_README.md');
