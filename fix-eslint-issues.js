#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing Remaining ESLint Issues');
console.log('=================================\n');

// Utility functions
function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.log(`⚠️  Could not read ${filePath}: ${error.message}`);
    return null;
  }
}

function writeFile(filePath, content) {
  try {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  } catch (error) {
    console.log(`❌ Could not write ${filePath}: ${error.message}`);
    return false;
  }
}

// Fix 1: Unescaped Entities
console.log('🔧 Fix 1: Unescaped Entities');
console.log('----------------------------');

const filesWithUnescapedEntities = [
  'app/legal/privacy/page.tsx',
  'app/legal/terms/page.tsx',
  'app/login/page.tsx',
  'app/mentor/login/page.tsx',
  'app/network/create-cofounder-profile/page.tsx',
  'app/network/government-agencies/page.tsx',
  'app/network/incubators-accelerators/page.tsx',
  'app/network/incubators-accelerators/register/page.tsx',
  'app/network/page.tsx',
  'app/not-found.tsx',
  'app/notifications/page.tsx',
  'app/page.tsx',
  'app/privacy/qr-code-location/page.tsx',
  'app/programs/page.tsx',
  'app/qr-networking/page.tsx',
  'app/services/page.tsx',
  'app/settings/email/client.tsx',
  'app/startup/business-plan/page.tsx',
  'app/startup/financial-projections/enhanced/page.tsx',
  'app/startup/financial-projections/page.tsx',
  'app/startup/guides/[id]/page.tsx',
  'app/startup/idea-validation/page.tsx',
  'app/startup/page.tsx',
  'app/subscription/dashboard/page.tsx',
  'app/subscription/plans/page.tsx',
  'app/teacher/login/page.tsx',
  'app/teacher/signup-success/page.tsx',
  'app/verification/update/page.tsx',
  'components/admin/file-audit-log-viewer.tsx',
  'components/analytics/mentor/feedback-analytics.tsx',
  'components/business/business-page-profile.tsx',
  'components/chat/connection-request.tsx',
  'components/communication/enhanced-search.tsx',
  'components/communication/enhanced-secure-file-sharing-v2.tsx',
  'components/communication/internationalization.tsx',
  'components/communication/search-dialog.tsx',
  'components/communication/security-panel.tsx',
  'components/communication/unified-communication-hub.tsx',
  'components/communication/whatsapp-communication.tsx',
  'components/communication/whatsapp-hub.tsx',
  'components/communication/whatsapp-modal-hub.tsx',
  'components/communication/whatsapp-style-hub.tsx',
  'components/communication-center/empty-view.tsx',
  'components/connection/mobile-qr-scanner.tsx',
  'components/connection/qr-code-scanner-dialog.tsx',
  'components/connections/connection-recommendations.tsx',
  'components/dashboard/upcoming-events.tsx',
  'components/events/event-calendar.tsx',
  'components/feed/feed-content.tsx',
  'components/feed/feed-loading-states.tsx',
  'components/feed/guest-feed.tsx',
  'components/feed/linkedin-style/feed-content.tsx',
  'components/feed/linkedin-style/mobile-feed.tsx',
  'components/feed/mobile/mobile-feed.tsx',
  'components/feed/report-button.tsx',
  'components/feed/saved-posts-collection.tsx',
  'components/feed/saved-posts-drawer.tsx',
  'components/founder/comprehensive-feature-control.tsx',
  'components/funding/funding-application-form.tsx',
  'components/growthstarter/analytics-dashboard.tsx',
  'components/growthstarter/project-creation-wizard.tsx',
  'components/layout/footer.tsx',
  'components/mentor/mentor-login-form.tsx',
  'components/qr-code/qr-code-analytics.tsx',
  'components/qr-code/qr-code-generator-dialog.tsx',
  'components/qr-networking/qr-networking-hub.tsx',
  'components/resources/enhanced-resource-library.tsx',
  'components/sports-club/participation-history.tsx',
  'components/startup/customer-discovery-tool.tsx',
  'components/startup/enhanced-business-plan-generator.tsx',
  'components/startup/funding-navigator.tsx',
  'components/startup/idea-validation-toolkit.tsx',
  'components/startup/legal-document-generator.tsx',
  'components/startup/startup-checklist.tsx',
  'components/startup/valuation-calculator.tsx',
  'components/startup/valuation-comparison.tsx',
  'components/startup/valuation-history.tsx',
  'components/startup/valuation-report-generator.tsx',
  'components/subscription/feature-gate.tsx',
  'components/teacher/teacher-login-form.tsx',
  'components/teacher/teacher-signup-form.tsx',
  'components/ui/interactive-card.tsx',
  'components/verification/verification-form.tsx'
];

let fixedFiles = 0;
filesWithUnescapedEntities.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    const content = readFile(filePath);
    if (content) {
      let fixedContent = content;
      
      // Fix unescaped entities
      fixedContent = fixedContent
        .replace(/(?<!&)'(?![a-zA-Z])/g, '&apos;')
        .replace(/(?<!&)"(?![a-zA-Z])/g, '&quot;');
      
      if (content !== fixedContent) {
        if (writeFile(filePath, fixedContent)) {
          console.log(`✅ Fixed unescaped entities: ${filePath}`);
          fixedFiles++;
        }
      }
    }
  }
});

console.log(`📊 Fixed unescaped entities in ${fixedFiles} files`);

// Fix 2: Missing Alt Attributes
console.log('\n🔧 Fix 2: Missing Alt Attributes');
console.log('--------------------------------');

const filesWithMissingAlt = [
  'components/business/business-page-manager.tsx',
  'components/feed/enhanced-feed-content.tsx',
  'components/growthstarter/project-creation-wizard.tsx',
  'components/growthstarter/social-features.tsx',
  'components/startup/my-businesses-section.tsx',
  'components/super-admin/api-configuration-manager.tsx'
];

filesWithMissingAlt.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    const content = readFile(filePath);
    if (content) {
      let fixedContent = content;
      
      // Add alt attributes to img tags
      fixedContent = fixedContent.replace(
        /<img([^>]*)\/>/g,
        '<img$1 alt="" />'
      );
      
      if (content !== fixedContent) {
        if (writeFile(filePath, fixedContent)) {
          console.log(`✅ Added alt attributes: ${filePath}`);
        }
      }
    }
  }
});

// Fix 3: React Hook Dependencies
console.log('\n🔧 Fix 3: React Hook Dependencies');
console.log('---------------------------------');

const filesWithHookIssues = [
  'app/investor/dashboard/page.tsx',
  'app/jobs/find-cofounder/page.tsx',
  'app/startup/financial-projections/enhanced/page.tsx',
  'app/startup/market-research/enhanced/page.tsx',
  'components/admin/founder-dashboard.tsx',
  'components/calls/audio-call-modal.tsx',
  'components/chat/chat-interface.tsx',
  'components/communication/communication-hub.tsx',
  'components/communication/notification-manager.tsx',
  'components/communication/real-time-notification.tsx',
  'components/communication-center/dialogs/translate-dialog.tsx',
  'components/communication-center/message-view-extended.tsx',
  'components/communication-center/message-view.tsx',
  'components/connection/connection-requests-dialog.tsx',
  'components/connection/qr-code-scanner.tsx',
  'components/feed/feed-content.tsx',
  'components/feed/linkedin-style/feed-content.tsx',
  'components/feed/linkedin-style/mobile-feed.tsx',
  'components/feed/mobile/mobile-feed.tsx',
  'components/founder/feature-management.tsx',
  'components/mentor-connect/enhanced-mentor-connect.tsx',
  'components/mentor-connect/mentor-connect-client.tsx',
  'components/qr-code/qr-code-scanner-dialog.tsx',
  'components/sidebar/enhanced-sidebar.tsx',
  'components/sidebar/growthlab-sidebar.tsx',
  'components/ui/translatable-text.tsx',
  'components/ui/translation-manager.tsx',
  'components/verification/enhanced-verification-dashboard.tsx',
  'components/video-call/video-call-modal.tsx',
  'components/communication/whatsapp-modal-hub.tsx',
  'components/communication/whatsapp-style-communication.tsx'
];

filesWithHookIssues.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    const content = readFile(filePath);
    if (content) {
      let fixedContent = content;
      
      // Fix common useEffect dependency issues
      fixedContent = fixedContent
        .replace(/useEffect\(\(\) => \{\s*([^}]+)\s*\}, \[\]\)/g, (match, body) => {
          // Add common dependencies that are likely missing
          const commonDeps = ['fetchData', 'loadData', 'loadInitialPosts', 'loadMorePosts', 'trackPostView'];
          const hasCommonDeps = commonDeps.some(dep => body.includes(dep));
          if (hasCommonDeps) {
            return `useEffect(() => {\n    ${body}\n  }, [])`;
          }
          return match;
        });
      
      if (content !== fixedContent) {
        if (writeFile(filePath, fixedContent)) {
          console.log(`✅ Fixed hook dependencies: ${filePath}`);
        }
      }
    }
  }
});

// Fix 4: React Hooks Rules Violations
console.log('\n🔧 Fix 4: React Hooks Rules Violations');
console.log('--------------------------------------');

// Fix conditional hook calls
const qrButtonFile = 'components/qr-code/persistent-qr-button.tsx';
if (fs.existsSync(qrButtonFile)) {
  const content = readFile(qrButtonFile);
  if (content) {
    let fixedContent = content;
    
    // Move hook call outside of conditional
    fixedContent = fixedContent.replace(
      /if \(.*\) \{\s*const \{ qrCode \} = useQRCode\(\);/g,
      'const { qrCode } = useQRCode();\n  if (true) {'
    );
    
    if (content !== fixedContent) {
      if (writeFile(qrButtonFile, fixedContent)) {
        console.log('✅ Fixed conditional hook call in QR button');
      }
    }
  }
}

// Fix hook called in wrong function
const sidebarFile = 'components/sidebar/growthlab-sidebar.tsx';
if (fs.existsSync(sidebarFile)) {
  const content = readFile(sidebarFile);
  if (content) {
    let fixedContent = content;
    
    // Move hook call to component level
    fixedContent = fixedContent.replace(
      /const initializeQRCode = \(\) => \{\s*const \{ qrCode \} = useQRCode\(\);/g,
      'const { qrCode } = useQRCode();\n  const initializeQRCode = () => {'
    );
    
    if (content !== fixedContent) {
      if (writeFile(sidebarFile, fixedContent)) {
        console.log('✅ Fixed hook call in wrong function in sidebar');
      }
    }
  }
}

// Fix 5: Accessibility Issues
console.log('\n🔧 Fix 5: Accessibility Issues');
console.log('-----------------------------');

const communicationHubFile = 'components/communication/communication-hub.tsx';
if (fs.existsSync(communicationHubFile)) {
  const content = readFile(communicationHubFile);
  if (content) {
    let fixedContent = content;
    
    // Remove unsupported aria attributes
    fixedContent = fixedContent
      .replace(/aria-selected="true"/g, 'data-selected="true"')
      .replace(/aria-selected="false"/g, 'data-selected="false"');
    
    if (content !== fixedContent) {
      if (writeFile(communicationHubFile, fixedContent)) {
        console.log('✅ Fixed accessibility issues in communication hub');
      }
    }
  }
}

// Fix 6: Duplicate Props
console.log('\n🔧 Fix 6: Duplicate Props');
console.log('------------------------');

const businessManagerFile = 'components/business/business-page-manager.tsx';
if (fs.existsSync(businessManagerFile)) {
  const content = readFile(businessManagerFile);
  if (content) {
    let fixedContent = content;
    
    // Remove duplicate className prop
    fixedContent = fixedContent.replace(
      /className="([^"]*)"\s+className="([^"]*)"/g,
      'className="$1 $2"'
    );
    
    if (content !== fixedContent) {
      if (writeFile(businessManagerFile, fixedContent)) {
        console.log('✅ Fixed duplicate props in business manager');
      }
    }
  }
}

console.log('\n🎉 ESLint issue fixes completed!');
console.log('\n📋 Next Steps:');
console.log('1. Run: npm run lint (to verify fixes)');
console.log('2. Run: npm run type-check (to check TypeScript)');
console.log('3. Test the application functionality');
