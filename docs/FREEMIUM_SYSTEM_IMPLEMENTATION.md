# GrowthLab Freemium System Implementation

## Overview

GrowthLab has implemented a comprehensive freemium model similar to LinkedIn, with three subscription tiers: Free, Premium, and Enterprise. This system provides feature restrictions, usage tracking, and upgrade prompts throughout the platform.

## Subscription Tiers

### Free Tier
- **Price**: $0/month
- **Target**: Startups, investors, mentors, and other users getting started
- **Key Limitations**:
  - 8 connection requests per month
  - 10 messages to unconnected users per month
  - 5 job applications per month
  - 3 co-founder matches per month
  - 3 event registrations per month
  - 3 downloadable templates per month
  - 60 call minutes per month
  - Basic search filters (3 filters)
  - Limited course access
  - Standard support (48-hour response)

### Premium Tier
- **Price**: $29/month
- **Target**: Active users who need unlimited access
- **Benefits**:
  - Unlimited connection requests
  - Unlimited messaging to anyone
  - Unlimited job applications and posting (10 posts)
  - Unlimited co-founder matches
  - Unlimited event registrations
  - Unlimited downloadable templates
  - Unlimited call minutes
  - Full advanced search filters
  - Full course access
  - Advanced analytics
  - Priority support (4-hour response)
  - Data export capabilities
  - Personalized recommendations

### Enterprise Tier
- **Price**: $99/month
- **Target**: Large organizations and teams
- **Benefits**:
  - Everything in Premium
  - AI-powered advanced search
  - Advanced job management and analytics
  - AI-powered co-founder matching
  - Custom learning paths and certifications
  - Event management and analytics
  - Advanced business intelligence
  - Dedicated account manager
  - Custom integrations
  - White-label options
  - Advanced automation features

## Technical Implementation

### 1. Subscription Context (`contexts/subscription-context.tsx`)

The subscription context manages the entire freemium system:

```typescript
import { useSubscription } from "@/contexts/subscription-context"

const { 
  currentTier, 
  canUseFeature, 
  getFeatureLimit, 
  getCurrentUsage,
  incrementUsage,
  upgradeSubscription 
} = useSubscription()
```

**Key Functions**:
- `canUseFeature(feature, requiredTier)`: Check if user can access a feature
- `getFeatureLimit(feature)`: Get the limit for a specific feature
- `getCurrentUsage(feature)`: Get current usage for a feature
- `incrementUsage(feature)`: Increment usage counter
- `upgradeSubscription(planId)`: Upgrade to a different plan

### 2. Feature Access Hook (`hooks/use-feature-access.ts`)

A custom hook that provides easy feature access control:

```typescript
import { useFeatureAccess } from "@/hooks/use-feature-access"

const { 
  checkFeatureAccess, 
  useFeatureWithLimit, 
  showUpgradeModal 
} = useFeatureAccess()

// Check if user can access a premium feature
const canAccess = checkFeatureAccess("advancedSearch", "premium")

// Use a feature with usage limits
const connectionFeature = useFeatureWithLimit("connectionRequests")
if (connectionFeature.canExecute) {
  connectionFeature.executeFeature(() => {
    // Send connection request
    sendConnectionRequest()
  })
}
```

### 3. Subscription Status Component (`components/subscription/subscription-status.tsx`)

A reusable component that shows the user's current plan and usage:

```typescript
import { SubscriptionStatus } from "@/components/subscription/subscription-status"

// Use in dashboard or profile pages
<SubscriptionStatus />
```

## Integration Examples

### 1. Connection Requests

```typescript
import { useFeatureAccess } from "@/hooks/use-feature-access"

function ConnectionButton() {
  const connectionFeature = useFeatureAccess().useFeatureWithLimit("connectionRequests")
  
  const handleConnectionRequest = () => {
    connectionFeature.executeFeature(() => {
      // Send connection request logic
      sendConnectionRequest()
      toast.success("Connection request sent!")
    })
  }
  
  return (
    <Button 
      onClick={handleConnectionRequest}
      disabled={!connectionFeature.canExecute}
    >
      Connect
      {!connectionFeature.isUnlimited && (
        <span className="ml-2 text-xs">
          ({connectionFeature.remaining} left)
        </span>
      )}
    </Button>
  )
}
```

### 2. Premium Feature Access

```typescript
import { useFeatureAccess } from "@/hooks/use-feature-access"

function AdvancedSearchFilters() {
  const { checkFeatureAccess, showUpgradeModal } = useFeatureAccess()
  
  const handleAdvancedSearch = () => {
    if (checkFeatureAccess("advancedSearch", "premium")) {
      // Execute advanced search
      performAdvancedSearch()
    } else {
      showUpgradeModal("advancedSearch", "premium")
    }
  }
  
  return (
    <Button onClick={handleAdvancedSearch}>
      Advanced Search
    </Button>
  )
}
```

### 3. Usage Tracking

```typescript
import { useSubscription } from "@/contexts/subscription-context"

function JobApplicationButton() {
  const { incrementUsage, getCurrentUsage, getFeatureLimit } = useSubscription()
  
  const handleJobApplication = () => {
    const current = getCurrentUsage("jobApplications")
    const limit = getFeatureLimit("jobApplications")
    
    if (limit === -1 || current < limit) {
      incrementUsage("jobApplications")
      submitJobApplication()
    } else {
      // Show upgrade prompt
      showUpgradePrompt()
    }
  }
  
  return (
    <Button onClick={handleJobApplication}>
      Apply for Job
      {limit !== -1 && (
        <span className="ml-2 text-xs">
          ({current}/{limit})
        </span>
      )}
    </Button>
  )
}
```

## Upgrade Prompts

The system automatically shows upgrade prompts when users reach their limits:

```typescript
// Automatic upgrade prompt when limit is reached
const { showUpgradePrompt } = useSubscription()

if (currentUsage >= limit) {
  showUpgradePrompt(feature, currentUsage, limit)
}
```

## Subscription Management

### 1. Subscription Plans Page (`/subscription/plans`)

Users can view and upgrade their subscription plans:

```typescript
import { useSubscription } from "@/contexts/subscription-context"

const { upgradeSubscription, currentTier } = useSubscription()

const handleUpgrade = async (planId: string) => {
  try {
    await upgradeSubscription(planId)
    toast.success("Successfully upgraded!")
  } catch (error) {
    toast.error("Upgrade failed. Please try again.")
  }
}
```

### 2. Usage Monitoring

Track usage across different features:

```typescript
const { getCurrentUsage, getFeatureLimit, getUsagePercentage } = useSubscription()

const usage = {
  connections: getCurrentUsage("connectionRequests"),
  jobs: getCurrentUsage("jobApplications"),
  matches: getCurrentUsage("cofounderMatches"),
  events: getCurrentUsage("eventRegistrations")
}

const percentages = {
  connections: getUsagePercentage("connectionRequests"),
  jobs: getUsagePercentage("jobApplications"),
  matches: getUsagePercentage("cofounderMatches"),
  events: getUsagePercentage("eventRegistrations")
}
```

## Best Practices

### 1. Feature Gating

Always check feature access before allowing users to use premium features:

```typescript
// ❌ Don't do this
function PremiumFeature() {
  return <div>Premium content</div>
}

// ✅ Do this
function PremiumFeature() {
  const { checkFeatureAccess } = useFeatureAccess()
  
  if (!checkFeatureAccess("premiumFeature", "premium")) {
    return <UpgradePrompt feature="premiumFeature" />
  }
  
  return <div>Premium content</div>
}
```

### 2. Usage Limits

Show remaining usage to users:

```typescript
function FeatureWithLimit() {
  const { getCurrentUsage, getFeatureLimit } = useSubscription()
  const current = getCurrentUsage("feature")
  const limit = getFeatureLimit("feature")
  
  return (
    <div>
      <span>Usage: {current}/{limit === -1 ? '∞' : limit}</span>
      {limit !== -1 && (
        <Progress value={(current / limit) * 100} />
      )}
    </div>
  )
}
```

### 3. Upgrade CTAs

Place upgrade prompts strategically:

```typescript
function UpgradeCTA() {
  const { currentTier } = useSubscription()
  
  if (currentTier === "free") {
    return (
      <div className="bg-[#F59E0B]/10 p-4 rounded-lg">
        <h3>Upgrade to Premium</h3>
        <p>Unlock unlimited access to all features</p>
        <Button asChild>
          <Link href="/subscription/plans">View Plans</Link>
        </Button>
      </div>
    )
  }
  
  return null
}
```

## Configuration

### 1. Feature Limits

Configure feature limits in `types/subscription.ts`:

```typescript
export const DEFAULT_SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: "free",
    limits: {
      connectionRequests: 8,
      jobApplications: 5,
      cofounderMatches: 3,
      // ... other limits
    }
  }
]
```

### 2. New Features

To add a new feature with restrictions:

1. Add the feature to the `FeatureLimits` interface
2. Update the subscription plans with limits
3. Use the feature access hooks in your components

```typescript
// In types/subscription.ts
export interface FeatureLimits {
  // ... existing features
  newFeature: number // Add new feature
}

// In your component
const { checkFeatureAccess } = useFeatureAccess()
if (checkFeatureAccess("newFeature", "premium")) {
  // Execute premium feature
}
```

## Testing

### 1. Mock Data

The system uses mock data for development:

```typescript
// In subscription-context.tsx
const mockUserSubscription: UserSubscription = {
  tier: "free",
  usage: {
    connectionRequests: 3,
    jobApplications: 1,
    // ... other usage data
  }
}
```

### 2. Testing Different Tiers

To test different subscription tiers, modify the mock data:

```typescript
// Test premium tier
const mockUserSubscription: UserSubscription = {
  tier: "premium",
  // ... premium limits
}

// Test enterprise tier
const mockUserSubscription: UserSubscription = {
  tier: "enterprise",
  // ... enterprise limits
}
```

## Deployment Considerations

### 1. Environment Variables

Set up environment variables for production:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 2. Database Integration

Replace mock data with real database calls:

```typescript
// In subscription-context.tsx
const loadSubscription = async () => {
  try {
    const response = await fetch('/api/subscription')
    const subscription = await response.json()
    setCurrentSubscription(subscription)
  } catch (error) {
    console.error('Failed to load subscription:', error)
  }
}
```

### 3. Payment Processing

Integrate with Stripe or other payment processors:

```typescript
const upgradeSubscription = async (planId: string) => {
  try {
    const response = await fetch('/api/subscription/upgrade', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ planId })
    })
    
    if (response.ok) {
      // Handle successful upgrade
    }
  } catch (error) {
    // Handle error
  }
}
```

## Monitoring and Analytics

### 1. Usage Tracking

Track feature usage for business insights:

```typescript
// Log feature usage
const { incrementUsage } = useSubscription()

const handleFeatureUse = () => {
  incrementUsage("featureName")
  // Execute feature logic
}
```

### 2. Upgrade Funnel

Monitor conversion rates:

```typescript
// Track upgrade attempts
const trackUpgradeAttempt = (fromTier: string, toTier: string) => {
  analytics.track('upgrade_attempted', {
    fromTier,
    toTier,
    timestamp: new Date().toISOString()
  })
}
```

## Support and Maintenance

### 1. Common Issues

- **Feature not working**: Check if user has required subscription tier
- **Usage not updating**: Ensure `incrementUsage` is called correctly
- **Upgrade not working**: Verify payment integration and API endpoints

### 2. Debugging

Enable debug logging:

```typescript
// In subscription-context.tsx
const DEBUG = process.env.NODE_ENV === 'development'

if (DEBUG) {
  console.log('Feature access check:', { feature, requiredTier, hasAccess })
}
```

## Conclusion

The GrowthLab freemium system provides a robust foundation for monetizing the platform while maintaining a great user experience. By following the patterns and best practices outlined in this document, developers can easily integrate feature restrictions and upgrade prompts throughout the application.

For questions or support, contact the development team or refer to the code examples in the repository.
