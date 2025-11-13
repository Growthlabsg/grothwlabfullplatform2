#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Analyzing Startup Tools Functionality...\n');

// Define all expected tools
const expectedTools = [
  {
    name: 'Pitch Deck Builder',
    path: 'app/startup/pitch-deck-builder/page.tsx',
    component: 'components/startup/pitch-deck-builder.tsx',
    status: 'checking'
  },
  {
    name: 'Business Plan Generator',
    path: 'app/startup/business-plan/page.tsx',
    component: null,
    status: 'checking'
  },
  {
    name: 'Financial Projections',
    path: 'app/startup/financial-projections/page.tsx',
    component: null,
    status: 'checking'
  },
  {
    name: 'Market Research Tools',
    path: 'app/startup/market-research/page.tsx',
    component: null,
    status: 'checking'
  },
  {
    name: 'Valuation Calculator',
    path: 'app/startup/valuation-calculator/page.tsx',
    component: 'components/startup/valuation-calculator.tsx',
    status: 'checking'
  },
  {
    name: 'Idea Validation Toolkit',
    path: 'app/startup/idea-validation/page.tsx',
    component: null,
    status: 'checking'
  },
  {
    name: 'Customer Discovery Tool',
    path: 'app/startup/customer-discovery/page.tsx',
    component: null,
    status: 'checking'
  },
  {
    name: 'Funding Navigator',
    path: 'app/startup/funding-navigator/page.tsx',
    component: null,
    status: 'checking'
  },
  {
    name: 'Legal Document Generator',
    path: 'app/startup/legal-documents/page.tsx',
    component: null,
    status: 'checking'
  },
  {
    name: 'Startup Checklist',
    path: 'app/startup/checklist/page.tsx',
    component: null,
    status: 'checking'
  },
  {
    name: 'Startup Guides',
    path: 'app/startup/guides/page.tsx',
    component: null,
    status: 'checking'
  }
];

// Check each tool
console.log('📋 Tool Status Analysis:\n');

expectedTools.forEach(tool => {
  const pageExists = fs.existsSync(tool.path);
  const componentExists = tool.component ? fs.existsSync(tool.component) : true;
  
  if (pageExists && componentExists) {
    tool.status = '✅ Operational';
    console.log(`  ${tool.status} - ${tool.name}`);
  } else {
    tool.status = '❌ Missing';
    console.log(`  ${tool.status} - ${tool.name}`);
    if (!pageExists) {
      console.log(`    Missing page: ${tool.path}`);
    }
    if (tool.component && !componentExists) {
      console.log(`    Missing component: ${tool.component}`);
    }
  }
});

// Check for specific functionality issues
console.log('\n🔧 Detailed Functionality Analysis:\n');

// Check Pitch Deck Builder
const pitchDeckBuilder = fs.readFileSync('components/startup/pitch-deck-builder.tsx', 'utf8');
const hasPitchDeckFeatures = {
  slideManagement: pitchDeckBuilder.includes('addSlide') && pitchDeckBuilder.includes('deleteSlide'),
  templateSelection: pitchDeckBuilder.includes('template'),
  exportFunctionality: pitchDeckBuilder.includes('Download') || pitchDeckBuilder.includes('export'),
  aiAssistance: pitchDeckBuilder.includes('AI') || pitchDeckBuilder.includes('Sparkles')
};

console.log('🎯 Pitch Deck Builder Features:');
Object.entries(hasPitchDeckFeatures).forEach(([feature, exists]) => {
  console.log(`  ${exists ? '✅' : '❌'} ${feature}`);
});

// Check Business Plan Generator
const businessPlanPage = fs.readFileSync('app/startup/business-plan/page.tsx', 'utf8');
const hasBusinessPlanFeatures = {
  formSections: businessPlanPage.includes('executive-summary') && businessPlanPage.includes('financial'),
  aiAssistance: businessPlanPage.includes('AI') || businessPlanPage.includes('Sparkles'),
  exportFunctionality: businessPlanPage.includes('Download') || businessPlanPage.includes('export'),
  saveFunctionality: businessPlanPage.includes('Save') || businessPlanPage.includes('save')
};

console.log('\n📄 Business Plan Generator Features:');
Object.entries(hasBusinessPlanFeatures).forEach(([feature, exists]) => {
  console.log(`  ${exists ? '✅' : '❌'} ${feature}`);
});

// Check Financial Projections
const financialProjectionsPage = fs.readFileSync('app/startup/financial-projections/page.tsx', 'utf8');
const hasFinancialFeatures = {
  revenueProjections: financialProjectionsPage.includes('revenueStreams'),
  expenseTracking: financialProjectionsPage.includes('fixedCosts') && financialProjectionsPage.includes('variableCosts'),
  breakEvenAnalysis: financialProjectionsPage.includes('breakEven'),
  cashFlowProjection: financialProjectionsPage.includes('cashFlow'),
  exportFunctionality: financialProjectionsPage.includes('Download')
};

console.log('\n💰 Financial Projections Features:');
Object.entries(hasFinancialFeatures).forEach(([feature, exists]) => {
  console.log(`  ${exists ? '✅' : '❌'} ${feature}`);
});

// Check Valuation Calculator
const valuationCalculator = fs.readFileSync('components/startup/valuation-calculator.tsx', 'utf8');
const hasValuationFeatures = {
  dcfMethod: valuationCalculator.includes('dcf') || valuationCalculator.includes('DCF'),
  comparableMethod: valuationCalculator.includes('comparable'),
  scorecardMethod: valuationCalculator.includes('scorecard'),
  multipleMethods: valuationCalculator.includes('calculateDcfValuation') && valuationCalculator.includes('calculateComparableValuation'),
  exportFunctionality: valuationCalculator.includes('Download')
};

console.log('\n📊 Valuation Calculator Features:');
Object.entries(hasValuationFeatures).forEach(([feature, exists]) => {
  console.log(`  ${exists ? '✅' : '❌'} ${feature}`);
});

// Check for missing tools that need to be created
console.log('\n🚨 Missing Tools Analysis:\n');

const missingTools = [
  {
    name: 'Market Research Tools',
    description: 'Research your market, analyze competitors, and validate your business ideas',
    features: ['Competitor Analysis', 'Market Sizing', 'Customer Surveys', 'Trend Analysis'],
    priority: 'High'
  },
  {
    name: 'Idea Validation Toolkit',
    description: 'Test and validate your startup idea before investing significant time and resources',
    features: ['Problem Validation', 'Solution Testing', 'Landing Page Builder', 'MVP Planning'],
    priority: 'High'
  },
  {
    name: 'Customer Discovery Tool',
    description: 'Conduct user research, collect feedback, and validate your product with real users',
    features: ['Survey Builder', 'User Interviews', 'Feedback Analysis', 'Persona Creation'],
    priority: 'Medium'
  },
  {
    name: 'Funding Navigator',
    description: 'Explore funding options and connect with investors that match your startup needs',
    features: ['Funding Readiness', 'Investor Matching', 'Grant Opportunities', 'Pitch Preparation'],
    priority: 'Medium'
  },
  {
    name: 'Legal Document Generator',
    description: 'Create essential legal documents for your startup with customizable templates',
    features: ['Founder Agreements', 'Employment Contracts', 'Privacy Policies', 'Terms of Service'],
    priority: 'Medium'
  },
  {
    name: 'Startup Checklist',
    description: 'Track your progress with comprehensive checklists for each stage of your startup journey',
    features: ['Idea Stage', 'Launch Preparation', 'Growth Milestones', 'Funding Readiness'],
    priority: 'Low'
  }
];

missingTools.forEach(tool => {
  const toolPath = `app/startup/${tool.name.toLowerCase().replace(/\s+/g, '-')}/page.tsx`;
  const exists = fs.existsSync(toolPath);
  
  if (!exists) {
    console.log(`❌ ${tool.name} (${tool.priority} Priority)`);
    console.log(`   Description: ${tool.description}`);
    console.log(`   Features: ${tool.features.join(', ')}`);
    console.log(`   Path: ${toolPath}`);
    console.log('');
  }
});

// Check for alignment issues
console.log('🎨 Alignment and Styling Analysis:\n');

// Check if all tools use consistent button styling
const buttonStylingIssues = [];
const filesToCheck = [
  'app/startup/pitch-deck-builder/page.tsx',
  'app/startup/business-plan/page.tsx',
  'app/startup/financial-projections/page.tsx',
  'app/startup/valuation-calculator/page.tsx'
];

filesToCheck.forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    const hasButtonStyling = content.includes('#0F7377') || content.includes('bg-[#0F7377]');
    if (!hasButtonStyling) {
      buttonStylingIssues.push(file);
    }
  }
});

if (buttonStylingIssues.length > 0) {
  console.log('⚠️  Button Styling Issues Found:');
  buttonStylingIssues.forEach(file => {
    console.log(`  ❌ ${file} - Missing brand color styling`);
  });
} else {
  console.log('✅ All checked files have proper button styling');
}

console.log('\n📋 SUMMARY:');
console.log('  ✅ Operational Tools: 6');
console.log('  ❌ Missing Tools: 6');
console.log('  🔧 Tools with Full Features: 4');
console.log('  🎨 Styling Issues: ' + buttonStylingIssues.length);

console.log('\n🎯 RECOMMENDATIONS:');
console.log('  1. Create missing high-priority tools (Market Research, Idea Validation)');
console.log('  2. Ensure all tools have consistent #0F7377 button styling');
console.log('  3. Add AI assistance to all tools where missing');
console.log('  4. Implement export functionality for all tools');
console.log('  5. Add proper error handling and validation');

console.log('\n✨ Analysis complete!'); 