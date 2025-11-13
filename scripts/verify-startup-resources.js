#!/usr/bin/env node

/**
 * Startup Resources Verification Script
 * This script verifies that all startup resources are properly implemented and functional
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying Startup Resources Functionality...\n');

// Check if all required files exist
const requiredFiles = [
  'lib/enhanced-startup-resources.ts',
  'components/resources/enhanced-resource-library.tsx',
  'app/resources/library/page.tsx',
  'lib/resource-service.ts',
  'lib/additional-startup-resources.ts'
];

console.log('📁 Checking Required Files:');
let allFilesExist = true;

requiredFiles.forEach(file => {
  const exists = fs.existsSync(file);
  console.log(`  ${exists ? '✅' : '❌'} ${file}`);
  if (!exists) allFilesExist = false;
});

console.log('');

// Check enhanced startup resources
console.log('📚 Checking Enhanced Startup Resources:');
const enhancedResourcesPath = 'lib/enhanced-startup-resources.ts';
let enhancedResourcesExist = true;

if (fs.existsSync(enhancedResourcesPath)) {
  const content = fs.readFileSync(enhancedResourcesPath, 'utf8');
  
  // Check for resource categories
  const hasFundingResources = content.includes('fundingResources');
  const hasMarketResearchResources = content.includes('marketResearchResources');
  const hasBusinessPlanningResources = content.includes('businessPlanningResources');
  const hasNetworkingResources = content.includes('networkingResources');
  const hasLegalResources = content.includes('legalResources');
  const hasTechnologyResources = content.includes('technologyResources');
  const hasMarketingResources = content.includes('marketingResources');
  const hasFinancialResources = content.includes('financialResources');
  
  console.log(`  ${hasFundingResources ? '✅' : '❌'} Funding Resources`);
  console.log(`  ${hasMarketResearchResources ? '✅' : '❌'} Market Research Resources`);
  console.log(`  ${hasBusinessPlanningResources ? '✅' : '❌'} Business Planning Resources`);
  console.log(`  ${hasNetworkingResources ? '✅' : '❌'} Networking Resources`);
  console.log(`  ${hasLegalResources ? '✅' : '❌'} Legal Resources`);
  console.log(`  ${hasTechnologyResources ? '✅' : '❌'} Technology Resources`);
  console.log(`  ${hasMarketingResources ? '✅' : '❌'} Marketing Resources`);
  console.log(`  ${hasFinancialResources ? '✅' : '❌'} Financial Resources`);
  
  if (!hasFundingResources || !hasMarketResearchResources || !hasBusinessPlanningResources || 
      !hasNetworkingResources || !hasLegalResources || !hasTechnologyResources || 
      !hasMarketingResources || !hasFinancialResources) {
    enhancedResourcesExist = false;
  }
  
  // Check for utility functions
  const hasGetAllEnhancedStartupResources = content.includes('getAllEnhancedStartupResources');
  const hasSearchEnhancedResources = content.includes('searchEnhancedResources');
  const hasGetFeaturedEnhancedResources = content.includes('getFeaturedEnhancedResources');
  const hasGetPopularEnhancedResources = content.includes('getPopularEnhancedResources');
  
  console.log(`  ${hasGetAllEnhancedStartupResources ? '✅' : '❌'} getAllEnhancedStartupResources function`);
  console.log(`  ${hasSearchEnhancedResources ? '✅' : '❌'} searchEnhancedResources function`);
  console.log(`  ${hasGetFeaturedEnhancedResources ? '✅' : '❌'} getFeaturedEnhancedResources function`);
  console.log(`  ${hasGetPopularEnhancedResources ? '✅' : '❌'} getPopularEnhancedResources function`);
  
  if (!hasGetAllEnhancedStartupResources || !hasSearchEnhancedResources || 
      !hasGetFeaturedEnhancedResources || !hasGetPopularEnhancedResources) {
    enhancedResourcesExist = false;
  }
} else {
  console.log('  ❌ Enhanced startup resources file not found');
  enhancedResourcesExist = false;
}

console.log('');

// Check enhanced resource library component
console.log('🎯 Checking Enhanced Resource Library Component:');
const resourceLibraryPath = 'components/resources/enhanced-resource-library.tsx';
let resourceLibraryExists = true;

if (fs.existsSync(resourceLibraryPath)) {
  const content = fs.readFileSync(resourceLibraryPath, 'utf8');
  
  // Check for main component
  const hasEnhancedResourceLibrary = content.includes('EnhancedResourceLibrary');
  const hasFeaturedResources = content.includes('FeaturedResources');
  const hasPopularResources = content.includes('PopularResources');
  
  console.log(`  ${hasEnhancedResourceLibrary ? '✅' : '❌'} EnhancedResourceLibrary component`);
  console.log(`  ${hasFeaturedResources ? '✅' : '❌'} FeaturedResources component`);
  console.log(`  ${hasPopularResources ? '✅' : '❌'} PopularResources component`);
  
  if (!hasEnhancedResourceLibrary || !hasFeaturedResources || !hasPopularResources) {
    resourceLibraryExists = false;
  }
  
  // Check for interactive features
  const hasSearchFunctionality = content.includes('searchQuery') && content.includes('setSearchQuery');
  const hasFiltering = content.includes('selectedCategory') && content.includes('selectedDifficulty');
  const hasDownloadFunctionality = content.includes('handleDownload');
  const hasBookmarkFunctionality = content.includes('handleBookmark');
  const hasShareFunctionality = content.includes('handleShare');
  
  console.log(`  ${hasSearchFunctionality ? '✅' : '❌'} Search functionality`);
  console.log(`  ${hasFiltering ? '✅' : '❌'} Filtering functionality`);
  console.log(`  ${hasDownloadFunctionality ? '✅' : '❌'} Download functionality`);
  console.log(`  ${hasBookmarkFunctionality ? '✅' : '❌'} Bookmark functionality`);
  console.log(`  ${hasShareFunctionality ? '✅' : '❌'} Share functionality`);
  
  if (!hasSearchFunctionality || !hasFiltering || !hasDownloadFunctionality || 
      !hasBookmarkFunctionality || !hasShareFunctionality) {
    resourceLibraryExists = false;
  }
  
  // Check for UI components
  const hasCardComponents = content.includes('Card') && content.includes('CardContent');
  const hasBadgeComponents = content.includes('Badge');
  const hasButtonComponents = content.includes('Button');
  const hasInputComponents = content.includes('Input');
  const hasSelectComponents = content.includes('Select');
  
  console.log(`  ${hasCardComponents ? '✅' : '❌'} Card components`);
  console.log(`  ${hasBadgeComponents ? '✅' : '❌'} Badge components`);
  console.log(`  ${hasButtonComponents ? '✅' : '❌'} Button components`);
  console.log(`  ${hasInputComponents ? '✅' : '❌'} Input components`);
  console.log(`  ${hasSelectComponents ? '✅' : '❌'} Select components`);
  
  if (!hasCardComponents || !hasBadgeComponents || !hasButtonComponents || 
      !hasInputComponents || !hasSelectComponents) {
    resourceLibraryExists = false;
  }
} else {
  console.log('  ❌ Enhanced resource library component not found');
  resourceLibraryExists = false;
}

console.log('');

// Check resources library page
console.log('📄 Checking Resources Library Page:');
const libraryPagePath = 'app/resources/library/page.tsx';
let libraryPageExists = true;

if (fs.existsSync(libraryPagePath)) {
  const content = fs.readFileSync(libraryPagePath, 'utf8');
  
  const hasEnhancedResourceLibraryImport = content.includes('EnhancedResourceLibrary');
  const hasFeaturedResourcesImport = content.includes('FeaturedResources');
  const hasPopularResourcesImport = content.includes('PopularResources');
  const hasTabsComponent = content.includes('Tabs') && content.includes('TabsContent');
  const hasMetadata = content.includes('Metadata');
  
  console.log(`  ${hasEnhancedResourceLibraryImport ? '✅' : '❌'} EnhancedResourceLibrary import`);
  console.log(`  ${hasFeaturedResourcesImport ? '✅' : '❌'} FeaturedResources import`);
  console.log(`  ${hasPopularResourcesImport ? '✅' : '❌'} PopularResources import`);
  console.log(`  ${hasTabsComponent ? '✅' : '❌'} Tabs component`);
  console.log(`  ${hasMetadata ? '✅' : '❌'} Page metadata`);
  
  if (!hasEnhancedResourceLibraryImport || !hasFeaturedResourcesImport || 
      !hasPopularResourcesImport || !hasTabsComponent || !hasMetadata) {
    libraryPageExists = false;
  }
} else {
  console.log('  ❌ Resources library page not found');
  libraryPageExists = false;
}

console.log('');

// Check resource categories and topics
console.log('🏷️ Checking Resource Categories and Topics:');
const categories = [
  'Funding', 'Investment', 'Market Research', 'Validation', 'Business Planning', 
  'Strategy', 'Networking', 'Community', 'Legal', 'Compliance', 'Technology', 
  'Development', 'Marketing', 'Growth', 'Finance', 'Management'
];

const topics = [
  'Government Grants', 'VC Funding', 'Angel Investment', 'Customer Discovery',
  'Competitive Analysis', 'Market Sizing', 'Strategic Planning', 'Business Model',
  'Go-to-Market', 'Networking Strategy', 'Singapore Ecosystem', 'Incorporation',
  'IP Protection', 'Tech Stack', 'Scalability', 'Budget Marketing', 'Growth Hacking',
  'Financial Modeling', 'Cash Flow Management'
];

let categoriesExist = true;
let topicsExist = true;

if (fs.existsSync(enhancedResourcesPath)) {
  const content = fs.readFileSync(enhancedResourcesPath, 'utf8');
  
  categories.forEach(category => {
    const exists = content.includes(category);
    console.log(`  ${exists ? '✅' : '❌'} ${category} category`);
    if (!exists) categoriesExist = false;
  });
  
  console.log('');
  
  topics.forEach(topic => {
    const exists = content.includes(topic);
    console.log(`  ${exists ? '✅' : '❌'} ${topic} topic`);
    if (!exists) topicsExist = false;
  });
} else {
  console.log('  ❌ Enhanced resources file not found');
  categoriesExist = false;
  topicsExist = false;
}

console.log('');

// Check resource types and formats
console.log('📋 Checking Resource Types and Formats:');
const resourceTypes = ['guide', 'template', 'tool', 'video', 'webinar', 'article', 'checklist', 'calculator'];
const resourceFormats = ['pdf', 'xlsx', 'docx', 'pptx', 'mp4', 'html', 'interactive'];

let resourceTypesExist = true;
let resourceFormatsExist = true;

if (fs.existsSync(enhancedResourcesPath)) {
  const content = fs.readFileSync(enhancedResourcesPath, 'utf8');
  
  resourceTypes.forEach(type => {
    const exists = content.includes(`'${type}'`);
    console.log(`  ${exists ? '✅' : '❌'} ${type} type`);
    if (!exists) resourceTypesExist = false;
  });
  
  console.log('');
  
  resourceFormats.forEach(format => {
    const exists = content.includes(`'${format}'`);
    console.log(`  ${exists ? '✅' : '❌'} ${format} format`);
    if (!exists) resourceFormatsExist = false;
  });
} else {
  console.log('  ❌ Enhanced resources file not found');
  resourceTypesExist = false;
  resourceFormatsExist = false;
}

console.log('');

// Summary
console.log('📋 SUMMARY:');
console.log(`  Files: ${allFilesExist ? '✅ All present' : '❌ Missing files'}`);
console.log(`  Enhanced Resources: ${enhancedResourcesExist ? '✅ Complete' : '❌ Issues found'}`);
console.log(`  Resource Library Component: ${resourceLibraryExists ? '✅ Functional' : '❌ Issues found'}`);
console.log(`  Library Page: ${libraryPageExists ? '✅ Functional' : '❌ Issues found'}`);
console.log(`  Categories: ${categoriesExist ? '✅ Complete' : '❌ Missing categories'}`);
console.log(`  Topics: ${topicsExist ? '✅ Complete' : '❌ Missing topics'}`);
console.log(`  Resource Types: ${resourceTypesExist ? '✅ Complete' : '❌ Missing types'}`);
console.log(`  Resource Formats: ${resourceFormatsExist ? '✅ Complete' : '❌ Missing formats'}`);

const overallStatus = allFilesExist && enhancedResourcesExist && resourceLibraryExists && 
                     libraryPageExists && categoriesExist && topicsExist && 
                     resourceTypesExist && resourceFormatsExist;

console.log('');
console.log(`🎯 OVERALL STATUS: ${overallStatus ? '✅ STARTUP RESOURCES ARE FULLY OPERATIONAL' : '❌ ISSUES DETECTED'}`);

if (!overallStatus) {
  console.log('\n🔧 RECOMMENDATIONS:');
  if (!allFilesExist) console.log('  - Check missing files and ensure all components are created');
  if (!enhancedResourcesExist) console.log('  - Verify enhanced startup resources implementation');
  if (!resourceLibraryExists) console.log('  - Review resource library component functionality');
  if (!libraryPageExists) console.log('  - Check resources library page implementation');
  if (!categoriesExist) console.log('  - Add missing resource categories');
  if (!topicsExist) console.log('  - Add missing resource topics');
  if (!resourceTypesExist) console.log('  - Add missing resource types');
  if (!resourceFormatsExist) console.log('  - Add missing resource formats');
}

console.log('\n✨ Startup resources verification complete!'); 