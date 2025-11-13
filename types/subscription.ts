export type SubscriptionTier = "free" | "premium" | "enterprise"

export type SubscriptionStatus = "active" | "expired" | "cancelled" | "trial"

export interface SubscriptionPlan {
  id: string
  name: string
  tier: SubscriptionTier
  price: number
  currency: string
  billingCycle: "monthly" | "yearly"
  features: SubscriptionFeature[]
  limits: FeatureLimits
  isPopular?: boolean
  isRecommended?: boolean
}

export interface SubscriptionFeature {
  id: string
  name: string
  description: string
  category: FeatureCategory
  isUnlimited: boolean
  limit?: number
  currentUsage?: number
  isAvailable: boolean
}

export type FeatureCategory = 
  | "profile"
  | "connections"
  | "messaging"
  | "search"
  | "jobs"
  | "cofounder-matching"
  | "learning"
  | "events"
  | "communication"
  | "analytics"
  | "support"

export interface FeatureLimits {
  // Profile & Network
  profileViews: number
  connectionRequests: number
  endorsements: number
  
  // Search & Browse
  searchFilters: number
  advancedSearch: boolean
  
  // Messaging & Communication
  messagesToUnconnected: number
  groupChannels: number
  callMinutes: number
  
  // Jobs & Co-founder Matching
  jobApplications: number
  jobPostings: number
  cofounderMatches: number
  trialProjects: number
  
  // Learning & Resources
  courseAccess: "limited" | "full" | "premium"
  downloadableTemplates: number
  resourceLibrary: "basic" | "full" | "premium"
  
  // Events & Programmes
  eventRegistrations: number
  programmeApplications: number
  
  // Analytics & Dashboard
  analyticsDepth: "basic" | "advanced" | "premium"
  exportData: boolean
  personalizedRecommendations: boolean
  
  // Support
  supportLevel: "standard" | "priority" | "dedicated"
  responseTime: number // hours
}

export interface UserSubscription {
  id: string
  userId: string
  planId: string
  tier: SubscriptionTier
  status: SubscriptionStatus
  startDate: string
  endDate: string
  trialEndDate?: string
  autoRenew: boolean
  paymentMethod?: string
  nextBillingDate?: string
  usage: FeatureUsage
  features: SubscriptionFeature[]
}

export interface FeatureUsage {
  connectionRequests: number
  messagesToUnconnected: number
  jobApplications: number
  cofounderMatches: number
  eventRegistrations: number
  downloadableTemplates: number
  callMinutes: number
  lastResetDate: string
}

export interface UpgradePrompt {
  id: string
  userId: string
  feature: string
  currentLimit: number
  currentUsage: number
  premiumLimit: number
  message: string
  ctaText: string
  priority: "low" | "medium" | "high"
  isDismissed: boolean
  createdAt: string
}

export interface SubscriptionBenefits {
  free: string[]
  premium: string[]
  enterprise: string[]
}

// Default subscription plans
export const DEFAULT_SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: "free",
    name: "GrowthLab Free",
    tier: "free",
    price: 0,
    currency: "USD",
    billingCycle: "monthly",
    features: [
      {
        id: "profile-basic",
        name: "Basic Profile",
        description: "Create and maintain professional profile",
        category: "profile",
        isUnlimited: true,
        isAvailable: true
      },
      {
        id: "connections-limited",
        name: "Limited Connections",
        description: "8 connection requests per month",
        category: "connections",
        isUnlimited: false,
        limit: 8,
        isAvailable: true
      },
      {
        id: "messaging-basic",
        name: "Basic Messaging",
        description: "Message connected users + 10 unconnected per month",
        category: "messaging",
        isUnlimited: false,
        limit: 10,
        isAvailable: true
      },
      {
        id: "search-basic",
        name: "Basic Search",
        description: "Basic search with limited filters",
        category: "search",
        isUnlimited: true,
        isAvailable: true
      },
      {
        id: "jobs-limited",
        name: "Limited Job Access",
        description: "Browse and apply to jobs (5 applications)",
        category: "jobs",
        isUnlimited: false,
        limit: 5,
        isAvailable: true
      },
      {
        id: "cofounder-limited",
        name: "Limited Co-founder Matching",
        description: "Up to 3 matches per month",
        category: "cofounder-matching",
        isUnlimited: false,
        limit: 3,
        isAvailable: true
      },
      {
        id: "learning-basic",
        name: "Basic Learning",
        description: "Limited course access and 3 downloadable templates",
        category: "learning",
        isUnlimited: false,
        limit: 3,
        isAvailable: true
      },
      {
        id: "events-limited",
        name: "Limited Events",
        description: "Register for up to 3 events per month",
        category: "events",
        isUnlimited: false,
        limit: 3,
        isAvailable: true
      },
      {
        id: "analytics-basic",
        name: "Basic Analytics",
        description: "Basic personal activity analytics",
        category: "analytics",
        isUnlimited: true,
        isAvailable: true
      },
      {
        id: "support-standard",
        name: "Standard Support",
        description: "Standard customer support",
        category: "support",
        isUnlimited: true,
        isAvailable: true
      }
    ],
    limits: {
      profileViews: -1, // unlimited
      connectionRequests: 8,
      endorsements: -1,
      searchFilters: 3,
      advancedSearch: false,
      messagesToUnconnected: 10,
      groupChannels: -1,
      callMinutes: 60,
      jobApplications: 5,
      jobPostings: 0,
      cofounderMatches: 3,
      trialProjects: 1,
      courseAccess: "limited",
      downloadableTemplates: 3,
      resourceLibrary: "basic",
      eventRegistrations: 3,
      programmeApplications: 1,
      analyticsDepth: "basic",
      exportData: false,
      personalizedRecommendations: false,
      supportLevel: "standard",
      responseTime: 48
    }
  },
  {
    id: "premium",
    name: "GrowthLab Premium",
    tier: "premium",
    price: 29,
    currency: "USD",
    billingCycle: "monthly",
    isPopular: true,
    isRecommended: true,
    features: [
      {
        id: "profile-premium",
        name: "Premium Profile",
        description: "Enhanced profile with premium features",
        category: "profile",
        isUnlimited: true,
        isAvailable: true
      },
      {
        id: "connections-unlimited",
        name: "Unlimited Connections",
        description: "Unlimited connection requests",
        category: "connections",
        isUnlimited: true,
        isAvailable: true
      },
      {
        id: "messaging-unlimited",
        name: "Unlimited Messaging",
        description: "Message anyone without restrictions",
        category: "messaging",
        isUnlimited: true,
        isAvailable: true
      },
      {
        id: "search-advanced",
        name: "Advanced Search",
        description: "Full advanced search filters",
        category: "search",
        isUnlimited: true,
        isAvailable: true
      },
      {
        id: "jobs-unlimited",
        name: "Unlimited Job Access",
        description: "Unlimited job applications and posting",
        category: "jobs",
        isUnlimited: true,
        isAvailable: true
      },
      {
        id: "cofounder-unlimited",
        name: "Unlimited Co-founder Matching",
        description: "Unlimited matches and trial projects",
        category: "cofounder-matching",
        isUnlimited: true,
        isAvailable: true
      },
      {
        id: "learning-premium",
        name: "Premium Learning",
        description: "Full access to courses and resources",
        category: "learning",
        isUnlimited: true,
        isAvailable: true
      },
      {
        id: "events-unlimited",
        name: "Unlimited Events",
        description: "Unlimited event registrations",
        category: "events",
        isUnlimited: true,
        isAvailable: true
      },
      {
        id: "analytics-advanced",
        name: "Advanced Analytics",
        description: "Advanced analytics and insights",
        category: "analytics",
        isUnlimited: true,
        isAvailable: true
      },
      {
        id: "support-priority",
        name: "Priority Support",
        description: "Priority customer support",
        category: "support",
        isUnlimited: true,
        isAvailable: true
      }
    ],
    limits: {
      profileViews: -1,
      connectionRequests: -1,
      endorsements: -1,
      searchFilters: -1,
      advancedSearch: true,
      messagesToUnconnected: -1,
      groupChannels: -1,
      callMinutes: -1,
      jobApplications: -1,
      jobPostings: 10,
      cofounderMatches: -1,
      trialProjects: -1,
      courseAccess: "full",
      downloadableTemplates: -1,
      resourceLibrary: "full",
      eventRegistrations: -1,
      programmeApplications: -1,
      analyticsDepth: "advanced",
      exportData: true,
      personalizedRecommendations: true,
      supportLevel: "priority",
      responseTime: 4
    }
  },
  {
    id: "enterprise",
    name: "GrowthLab Enterprise",
    tier: "enterprise",
    price: 99,
    currency: "USD",
    billingCycle: "monthly",
    features: [
      {
        id: "profile-enterprise",
        name: "Enterprise Profile",
        description: "Enterprise-level profile features",
        category: "profile",
        isUnlimited: true,
        isAvailable: true
      },
      {
        id: "connections-enterprise",
        name: "Enterprise Connections",
        description: "Advanced connection management",
        category: "connections",
        isUnlimited: true,
        isAvailable: true
      },
      {
        id: "messaging-enterprise",
        name: "Enterprise Messaging",
        description: "Advanced messaging and automation",
        category: "messaging",
        isUnlimited: true,
        isAvailable: true
      },
      {
        id: "search-enterprise",
        name: "Enterprise Search",
        description: "AI-powered advanced search",
        category: "search",
        isUnlimited: true,
        isAvailable: true
      },
      {
        id: "jobs-enterprise",
        name: "Enterprise Jobs",
        description: "Advanced job management and analytics",
        category: "jobs",
        isUnlimited: true,
        isAvailable: true
      },
      {
        id: "cofounder-enterprise",
        name: "Enterprise Co-founder Matching",
        description: "AI-powered matching and analytics",
        category: "cofounder-matching",
        isUnlimited: true,
        isAvailable: true
      },
      {
        id: "learning-enterprise",
        name: "Enterprise Learning",
        description: "Custom learning paths and certifications",
        category: "learning",
        isUnlimited: true,
        isAvailable: true
      },
      {
        id: "events-enterprise",
        name: "Enterprise Events",
        description: "Event management and analytics",
        category: "events",
        isUnlimited: true,
        isAvailable: true
      },
      {
        id: "analytics-enterprise",
        name: "Enterprise Analytics",
        description: "Advanced business intelligence",
        category: "analytics",
        isUnlimited: true,
        isAvailable: true
      },
      {
        id: "support-dedicated",
        name: "Dedicated Support",
        description: "Dedicated account manager",
        category: "support",
        isUnlimited: true,
        isAvailable: true
      }
    ],
    limits: {
      profileViews: -1,
      connectionRequests: -1,
      endorsements: -1,
      searchFilters: -1,
      advancedSearch: true,
      messagesToUnconnected: -1,
      groupChannels: -1,
      callMinutes: -1,
      jobApplications: -1,
      jobPostings: -1,
      cofounderMatches: -1,
      trialProjects: -1,
      courseAccess: "premium",
      downloadableTemplates: -1,
      resourceLibrary: "premium",
      eventRegistrations: -1,
      programmeApplications: -1,
      analyticsDepth: "premium",
      exportData: true,
      personalizedRecommendations: true,
      supportLevel: "dedicated",
      responseTime: 1
    }
  }
]

export const SUBSCRIPTION_BENEFITS: SubscriptionBenefits = {
  free: [
    "Create and maintain professional profile",
    "8 connection requests per month",
    "Basic search functionality",
    "Browse and apply to jobs (5 applications)",
    "Up to 3 co-founder matches per month",
    "Limited course access",
    "3 downloadable templates",
    "Register for 3 events per month",
    "Basic analytics",
    "Standard support"
  ],
  premium: [
    "Everything in Free, plus:",
    "Unlimited connection requests",
    "Unlimited messaging to anyone",
    "Advanced search filters",
    "Unlimited job applications and posting",
    "Unlimited co-founder matches",
    "Full course access",
    "Unlimited downloadable templates",
    "Unlimited event registrations",
    "Advanced analytics and insights",
    "Priority support (4-hour response)",
    "Data export capabilities",
    "Personalized recommendations"
  ],
  enterprise: [
    "Everything in Premium, plus:",
    "AI-powered advanced search",
    "Advanced job management and analytics",
    "AI-powered co-founder matching",
    "Custom learning paths and certifications",
    "Event management and analytics",
    "Advanced business intelligence",
    "Dedicated account manager",
    "Custom integrations",
    "White-label options",
    "Advanced automation features"
  ]
}
