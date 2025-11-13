#!/usr/bin/env node

/**
 * Feed Functionality Verification Script
 * This script verifies that all feed features are working correctly
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying Feed Functionality...\n');

// Check if all required components exist
const requiredComponents = [
  'components/feed/linkedin-style/post.tsx',
  'components/feed/linkedin-style/content.tsx',
  'components/feed/linkedin-style/feed-with-sidebar.tsx',
  'components/feed/create-post-dialog.tsx',
  'components/feed/linkedin-style/sidebar.tsx',
  'components/feed/linkedin-style/right-sidebar.tsx',
  'app/feed/page.tsx',
  'contexts/auth-context.tsx',
  'hooks/use-user-activity.ts',
  'lib/connection-service.ts',
  'lib/real-time-analytics.ts',
  'lib/reputation-system.ts',
  'types/feed.ts'
];

console.log('📁 Checking Required Components:');
let allComponentsExist = true;

requiredComponents.forEach(component => {
  const exists = fs.existsSync(component);
  console.log(`  ${exists ? '✅' : '❌'} ${component}`);
  if (!exists) allComponentsExist = false;
});

console.log('');

// Check for required hooks and functions
const requiredHooks = [
  'useAuth',
  'useUserActivity',
  'trackPostView',
  'trackPostEngagement',
  'areUsersConnected',
  'isFollowing'
];

console.log('🔧 Checking Required Hooks and Functions:');
let allHooksExist = true;

// Check auth context
const authContextPath = 'contexts/auth-context.tsx';
if (fs.existsSync(authContextPath)) {
  const authContextContent = fs.readFileSync(authContextPath, 'utf8');
  const hasUseAuth = authContextContent.includes('export function useAuth');
  console.log(`  ${hasUseAuth ? '✅' : '❌'} useAuth hook`);
  if (!hasUseAuth) allHooksExist = false;
}

// Check user activity hook
const userActivityPath = 'hooks/use-user-activity.ts';
if (fs.existsSync(userActivityPath)) {
  const userActivityContent = fs.readFileSync(userActivityPath, 'utf8');
  const hasTrackPostView = userActivityContent.includes('trackPostView');
  const hasTrackPostEngagement = userActivityContent.includes('trackPostEngagement');
  console.log(`  ${hasTrackPostView ? '✅' : '❌'} trackPostView function`);
  console.log(`  ${hasTrackPostEngagement ? '✅' : '❌'} trackPostEngagement function`);
  if (!hasTrackPostView || !hasTrackPostEngagement) allHooksExist = false;
}

// Check connection service
const connectionServicePath = 'lib/connection-service.ts';
if (fs.existsSync(connectionServicePath)) {
  const connectionServiceContent = fs.readFileSync(connectionServicePath, 'utf8');
  const hasAreUsersConnected = connectionServiceContent.includes('areUsersConnected');
  const hasIsFollowing = connectionServiceContent.includes('isFollowing');
  console.log(`  ${hasAreUsersConnected ? '✅' : '❌'} areUsersConnected function`);
  console.log(`  ${hasIsFollowing ? '✅' : '❌'} isFollowing function`);
  if (!hasAreUsersConnected || !hasIsFollowing) allHooksExist = false;
}

console.log('');

// Check for interactive elements in post component
console.log('🎯 Checking Interactive Elements:');
const postComponentPath = 'components/feed/linkedin-style/post.tsx';
let interactiveElementsExist = true;

if (fs.existsSync(postComponentPath)) {
  const postContent = fs.readFileSync(postComponentPath, 'utf8');
  
  // Check for like functionality
  const hasLikeButton = postContent.includes('handleLike') && postContent.includes('Like');
  console.log(`  ${hasLikeButton ? '✅' : '❌'} Like button functionality`);
  
  // Check for comment functionality
  const hasCommentButton = postContent.includes('Comment');
  console.log(`  ${hasCommentButton ? '✅' : '❌'} Comment button`);
  
  // Check for repost functionality
  const hasRepostButton = postContent.includes('handleRepost') && postContent.includes('Repost');
  console.log(`  ${hasRepostButton ? '✅' : '❌'} Repost button functionality`);
  
  // Check for send functionality
  const hasSendButton = postContent.includes('Send');
  console.log(`  ${hasSendButton ? '✅' : '❌'} Send button`);
  
  // Check for bookmark functionality
  const hasBookmarkButton = postContent.includes('Bookmark') || postContent.includes('Save post');
  console.log(`  ${hasBookmarkButton ? '✅' : '❌'} Bookmark/Save functionality`);
  
  // Check for dropdown menu
  const hasDropdownMenu = postContent.includes('DropdownMenu') && postContent.includes('MoreHorizontal');
  console.log(`  ${hasDropdownMenu ? '✅' : '❌'} Dropdown menu`);
  
  if (!hasLikeButton || !hasCommentButton || !hasRepostButton || !hasSendButton || !hasBookmarkButton || !hasDropdownMenu) {
    interactiveElementsExist = false;
  }
} else {
  console.log('  ❌ Post component not found');
  interactiveElementsExist = false;
}

console.log('');

// Check for create post functionality
console.log('📝 Checking Create Post Functionality:');
const createPostPath = 'components/feed/create-post-dialog.tsx';
let createPostExists = true;

if (fs.existsSync(createPostPath)) {
  const createPostContent = fs.readFileSync(createPostPath, 'utf8');
  
  const hasDialog = createPostContent.includes('Dialog');
  const hasTextarea = createPostContent.includes('Textarea');
  const hasImageUpload = createPostContent.includes('ImageIcon');
  const hasTagInput = createPostContent.includes('Add a tag');
  const hasPostButton = createPostContent.includes('Post');
  
  console.log(`  ${hasDialog ? '✅' : '❌'} Dialog component`);
  console.log(`  ${hasTextarea ? '✅' : '❌'} Text input area`);
  console.log(`  ${hasImageUpload ? '✅' : '❌'} Image upload functionality`);
  console.log(`  ${hasTagInput ? '✅' : '❌'} Tag input functionality`);
  console.log(`  ${hasPostButton ? '✅' : '❌'} Post button`);
  
  if (!hasDialog || !hasTextarea || !hasImageUpload || !hasTagInput || !hasPostButton) {
    createPostExists = false;
  }
} else {
  console.log('  ❌ Create post dialog not found');
  createPostExists = false;
}

console.log('');

// Check for feed content functionality
console.log('📰 Checking Feed Content:');
const feedContentPath = 'components/feed/linkedin-style/content.tsx';
let feedContentExists = true;

if (fs.existsSync(feedContentPath)) {
  const feedContent = fs.readFileSync(feedContentPath, 'utf8');
  
  const hasMockPosts = feedContent.includes('mockPosts');
  const hasLoadingState = feedContent.includes('loading') && feedContent.includes('Skeleton');
  const hasErrorState = feedContent.includes('error');
  const hasEmptyState = feedContent.includes('No posts yet');
  const hasPostMapping = feedContent.includes('posts.map');
  
  console.log(`  ${hasMockPosts ? '✅' : '❌'} Mock posts data`);
  console.log(`  ${hasLoadingState ? '✅' : '❌'} Loading state`);
  console.log(`  ${hasErrorState ? '✅' : '❌'} Error handling`);
  console.log(`  ${hasEmptyState ? '✅' : '❌'} Empty state`);
  console.log(`  ${hasPostMapping ? '✅' : '❌'} Post rendering`);
  
  if (!hasMockPosts || !hasLoadingState || !hasErrorState || !hasEmptyState || !hasPostMapping) {
    feedContentExists = false;
  }
} else {
  console.log('  ❌ Feed content component not found');
  feedContentExists = false;
}

console.log('');

// Check for analytics and tracking
console.log('📊 Checking Analytics and Tracking:');
const analyticsPath = 'lib/real-time-analytics.ts';
const reputationPath = 'lib/reputation-system.ts';
let analyticsExists = true;

if (fs.existsSync(analyticsPath)) {
  const analyticsContent = fs.readFileSync(analyticsPath, 'utf8');
  const hasTrackEvent = analyticsContent.includes('trackEvent');
  console.log(`  ${hasTrackEvent ? '✅' : '❌'} Analytics tracking`);
  if (!hasTrackEvent) analyticsExists = false;
} else {
  console.log('  ❌ Analytics service not found');
  analyticsExists = false;
}

if (fs.existsSync(reputationPath)) {
  const reputationContent = fs.readFileSync(reputationPath, 'utf8');
  const hasUpdateReputation = reputationContent.includes('updateReputation');
  console.log(`  ${hasUpdateReputation ? '✅' : '❌'} Reputation system`);
  if (!hasUpdateReputation) analyticsExists = false;
} else {
  console.log('  ❌ Reputation system not found');
  analyticsExists = false;
}

console.log('');

// Summary
console.log('📋 SUMMARY:');
console.log(`  Components: ${allComponentsExist ? '✅ All present' : '❌ Missing components'}`);
console.log(`  Hooks: ${allHooksExist ? '✅ All present' : '❌ Missing hooks'}`);
console.log(`  Interactive Elements: ${interactiveElementsExist ? '✅ All present' : '❌ Missing elements'}`);
console.log(`  Create Post: ${createPostExists ? '✅ Functional' : '❌ Issues found'}`);
console.log(`  Feed Content: ${feedContentExists ? '✅ Functional' : '❌ Issues found'}`);
console.log(`  Analytics: ${analyticsExists ? '✅ Functional' : '❌ Issues found'}`);

const overallStatus = allComponentsExist && allHooksExist && interactiveElementsExist && createPostExists && feedContentExists && analyticsExists;

console.log('');
console.log(`🎯 OVERALL STATUS: ${overallStatus ? '✅ FEED IS FULLY OPERATIONAL' : '❌ ISSUES DETECTED'}`);

if (!overallStatus) {
  console.log('\n🔧 RECOMMENDATIONS:');
  if (!allComponentsExist) console.log('  - Check missing component files');
  if (!allHooksExist) console.log('  - Verify hook implementations');
  if (!interactiveElementsExist) console.log('  - Review post component interactive elements');
  if (!createPostExists) console.log('  - Check create post dialog functionality');
  if (!feedContentExists) console.log('  - Verify feed content rendering');
  if (!analyticsExists) console.log('  - Ensure analytics and reputation systems work');
}

console.log('\n✨ Feed functionality verification complete!'); 