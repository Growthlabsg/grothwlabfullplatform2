export type Permission =
  | "founder:all" // Access to everything
  | "founder:platform" // Platform-level control
  | "founder:features" // Feature management
  | "founder:employees" // Employee management
  | "founder:revenue" // Revenue and financial control
  | "founder:strategy" // Strategic decisions
  | "founder:infrastructure" // Server, database, scaling
  | "founder:security" // Security settings, access control
  | "founder:integrations" // Third-party integrations
  | "founder:api" // API management and rate limiting
  | "founder:business" // Business logic and rules
  | "founder:pricing" // Pricing strategies and models
  | "founder:content" // All content management
  | "founder:moderation" // Content moderation rules
  | "founder:guidelines" // Community guidelines
  | "founder:reports" // User reports and violations
  | "founder:analytics" // All analytics and metrics
  | "founder:users" // Complete user management
  | "founder:startups" // Startup management
  | "founder:investors" // Investor management
  | "founder:mentors" // Mentor management
  | "founder:events" // Event management
  | "founder:courses" // Course management
  | "founder:funding" // Funding management
  | "founder:applications" // Application management
  | "founder:system" // System management
  | "founder:communication" // Communication management
  | "founder:cofounder" // Co-founder matching management
  | "founder:growthstarter" // GrowthStarter management
  | "founder:network" // Network management
  | "founder:resources" // Resources management
  | "founder:mentorship" // Mentorship management
  | "founder:jobs" // Jobs management
  | "founder:feed" // Feed management
  | "founder:files" // Files management

export interface Founder {
  id: string
  email: string
  displayName: string
  role: "founder"
  emailVerified: boolean
  createdAt: string
  profileCompleted: boolean
  designation: string
  avatarUrl: string
  permissions: Permission[]
  isFounder: true
  lastActive: string
  status: "active" | "suspended" | "banned"
  
  // Founder-specific properties
  companyOwnership: number // Percentage ownership
  decisionAuthority: "absolute" | "delegated" | "shared"
  platformAccess: "complete" | "restricted" | "limited"
  revenueShare: number // Percentage of revenue
  strategicControl: "full" | "partial" | "consultative"
  
  // Additional founder metadata
  foundingDate: string
  equityStake: number
  votingRights: number
  boardPosition: string
  investmentContribution: number
}

export interface PlatformFeature {
  id: string
  name: string
  description: string
  category: string
  status: "live" | "development" | "testing" | "deprecated" | "planned"
  phase: "phase1" | "phase2" | "future" | "premium" | "enterprise"
  launchDate: string
  cost: number
  revenue: number
  roi: number
  isVisible: boolean
  isEnabled: boolean
  isPremium: boolean
  pricing: {
    free: boolean
    basic: number
    premium: number
    enterprise: number
  }
  dependencies: string[]
  impact: "high" | "medium" | "low"
  priority: "critical" | "high" | "medium" | "low"
  tags: string[]
  metadata: Record<string, any>
}

export interface PlatformContent {
  id: string
  type: "article" | "video" | "course" | "template" | "tool" | "resource" | "event" | "mentorship" | "investment" | "partnership"
  title: string
  description: string
  content: string
  author: string
  category: string
  tags: string[]
  status: "draft" | "published" | "archived" | "premium"
  visibility: "public" | "members" | "premium" | "enterprise"
  pricing: {
    free: boolean
    basic: number
    premium: number
    enterprise: number
  }
  accessLevel: "free" | "basic" | "premium" | "enterprise"
  createdAt: string
  updatedAt: string
  views: number
  downloads: number
  revenue: number
  metadata: Record<string, any>
}

export interface PlatformResource {
  id: string
  name: string
  type: "template" | "tool" | "database" | "api" | "integration" | "service" | "marketplace" | "directory"
  description: string
  category: string
  status: "active" | "inactive" | "maintenance" | "deprecated"
  accessLevel: "free" | "basic" | "premium" | "enterprise"
  pricing: {
    free: boolean
    basic: number
    premium: number
    enterprise: number
  }
  usage: {
    current: number
    limit: number
    unit: string
  }
  revenue: number
  cost: number
  roi: number
  metadata: Record<string, any>
}

export interface PlatformMonetization {
  id: string
  type: "subscription" | "one-time" | "usage-based" | "commission" | "advertising" | "licensing" | "marketplace" | "consulting"
  name: string
  description: string
  pricing: {
    model: "tiered" | "per-user" | "per-usage" | "percentage" | "fixed"
    tiers: Array<{
      name: string
      price: number
      features: string[]
      limits: Record<string, any>
    }>
  }
  status: "active" | "inactive" | "testing" | "planned"
  revenue: number
  cost: number
  profit: number
  conversionRate: number
  targetAudience: string[]
  metadata: Record<string, any>
}

export interface PlatformIntegration {
  id: string
  name: string
  type: "payment" | "analytics" | "communication" | "storage" | "ai" | "marketing" | "crm" | "accounting" | "legal" | "custom"
  provider: string
  description: string
  status: "active" | "inactive" | "testing" | "planned"
  cost: number
  revenue: number
  roi: number
  apiKey: string
  webhookUrl: string
  settings: Record<string, any>
  metadata: Record<string, any>
}

export interface PlatformUser {
  id: string
  email: string
  name: string
  role: "user" | "premium" | "enterprise" | "admin" | "founder"
  subscription: {
    plan: "free" | "basic" | "premium" | "enterprise"
    status: "active" | "inactive" | "cancelled" | "expired"
    startDate: string
    endDate: string
    price: number
  }
  permissions: string[]
  usage: {
    features: Record<string, number>
    storage: number
    apiCalls: number
  }
  revenue: number
  metadata: Record<string, any>
}

export interface PlatformAnalytics {
  id: string
  metric: string
  value: number
  unit: string
  category: "user" | "revenue" | "performance" | "engagement" | "technical"
  period: "daily" | "weekly" | "monthly" | "quarterly" | "yearly"
  date: string
  trend: "up" | "down" | "stable"
  target: number
  metadata: Record<string, any>
}

export interface LaunchPhase {
  id: string
  name: string
  description: string
  startDate: string
  endDate?: string
  features: string[]
  targetMetrics: Record<string, number>
  status: "planned" | "active" | "completed" | "paused" | "cancelled"
  notes: string
  
  // Enhanced phase properties
  budget: number
  teamSize: number
  riskAssessment: string
  successCriteria: string[]
  dependencies: string[]
  stakeholders: string[]
  
  // Phase timeline
  timeline: {
    planning: { start: string; end: string }
    development: { start: string; end: string }
    testing: { start: string; end: string }
    deployment: { start: string; end: string }
    monitoring: { start: string; end: string }
  }
  
  // Phase metrics
  metrics: {
    planned: Record<string, number>
    actual: Record<string, number>
    variance: Record<string, number>
  }
  
  // Phase risks and issues
  risks: Array<{
    id: string
    description: string
    probability: "low" | "medium" | "high"
    impact: "low" | "medium" | "high"
    mitigation: string
    owner: string
  }>
  
  issues: Array<{
    id: string
    description: string
    severity: "low" | "medium" | "high" | "critical"
    status: "open" | "in-progress" | "resolved" | "closed"
    assignedTo: string
    dueDate: string
  }>
}

export interface Employee {
  id: string
  email: string
  displayName: string
  role: "employee" | "admin" | "manager" | "specialist"
  department: string
  position: string
  hireDate: string
  permissions: Permission[]
  managerId?: string
  isActive: boolean
  
  // Employee details
  phoneNumber?: string
  address?: string
  emergencyContact?: {
    name: string
    relationship: string
    phone: string
  }
  employmentType: "full-time" | "part-time" | "contract" | "intern"
  salary: number
  benefits: string[]
  
  // Performance tracking
  performance: {
    rating: number
    lastReview: string
    nextReview: string
    notes: string
    goals: string[]
    achievements: string[]
    areasForImprovement: string[]
  }
  
  // Access control
  access: {
    canManageUsers: boolean
    canManageContent: boolean
    canViewAnalytics: boolean
    canManageFeatures: boolean
    canManageEmployees: boolean
    canManageSystem: boolean
    canManageSecurity: boolean
    canManageIntegrations: boolean
    canManageAPI: boolean
    canManageBusiness: boolean
    canManagePricing: boolean
    canManageRevenue: boolean
  }
  
  // Work schedule
  schedule: {
    workDays: string[]
    workHours: {
      start: string
      end: string
    }
    timezone: string
    remoteWork: boolean
    officeLocation?: string
  }
  
  // Training and development
  training: {
    completedCourses: string[]
    currentCourses: string[]
    certifications: string[]
    skills: string[]
    interests: string[]
  }
  
  // Employment history
  history: Array<{
    position: string
    department: string
    startDate: string
    endDate?: string
    reason: string
  }>
}

export interface SystemConfiguration {
  id: string
  category: string
  key: string
  value: any
  description: string
  isEditable: boolean
  requiresRestart: boolean
  lastModified: string
  modifiedBy: string
  version: string
  
  // Configuration metadata
  dataType: "string" | "number" | "boolean" | "object" | "array"
  validation: {
    required: boolean
    min?: number
    max?: number
    pattern?: string
    enum?: any[]
  }
  dependencies: string[]
  impact: "low" | "medium" | "high" | "critical"
}

export interface SecuritySettings {
  id: string
  category: string
  name: string
  description: string
  currentValue: any
  recommendedValue: any
  status: "secure" | "warning" | "critical" | "unknown"
  lastAudit: string
  nextAudit: string
  
  // Security metadata
  riskLevel: "low" | "medium" | "high" | "critical"
  compliance: string[]
  remediation: string
  owner: string
  priority: "low" | "medium" | "high" | "critical"
}

export interface RevenueMetrics {
  id: string
  period: string
  date: string
  
  // Revenue metrics
  monthlyRecurringRevenue: number
  annualRecurringRevenue: number
  totalRevenue: number
  grossProfit: number
  netProfit: number
  
  // Growth metrics
  revenueGrowth: number
  customerGrowth: number
  churnRate: number
  expansionRate: number
  
  // Customer metrics
  totalCustomers: number
  activeCustomers: number
  newCustomers: number
  churnedCustomers: number
  customerLifetimeValue: number
  
  // Cost metrics
  customerAcquisitionCost: number
  totalOperatingCosts: number
  marketingSpend: number
  developmentCosts: number
  
  // Performance metrics
  grossMargin: number
  netMargin: number
  burnRate: number
  runway: number
}
