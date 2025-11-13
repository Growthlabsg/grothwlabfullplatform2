export type UserRole =
  | "founder" // New founder role with complete control
  | "super.admin" // Enhanced super admin role
  | "admin" // Regular admin role
  | "startup"
  | "investor"
  | "mentor"
  | "teacher"
  | "accelerator"
  | "corporate"
  | "government"
  | "employee" // New employee role for your team

export type Permission =
  | "authenticated"
  // Founder-level permissions (complete control)
  | "founder:all" // Access to everything
  | "founder:platform" // Platform-level control
  | "founder:features" // Feature management
  | "founder:employees" // Employee management
  | "founder:revenue" // Revenue and financial control
  | "founder:strategy" // Strategic decisions
  
  // Feature management permissions
  | "manage:features" // Enable/disable platform features
  | "manage:phases" // Control feature launch phases
  | "manage:experiments" // A/B testing and feature experiments
  | "manage:rollouts" // Gradual feature rollouts
  
  // Employee management permissions
  | "manage:employees" // Hire, fire, manage employees
  | "assign:permissions" // Assign permissions to employees
  | "view:employee:performance" // View employee performance
  | "manage:employee:roles" // Manage employee roles
  
  // Platform infrastructure permissions
  | "manage:infrastructure" // Server, database, scaling
  | "manage:security" // Security settings, access control
  | "manage:integrations" // Third-party integrations
  | "manage:api" // API management and rate limiting
  
  // Business intelligence permissions
  | "view:business:metrics" // Revenue, growth, KPIs
  | "manage:business:rules" // Business logic and rules
  | "view:market:insights" // Market data and analytics
  | "manage:pricing" // Pricing strategies and models
  
  // Content and moderation permissions
  | "manage:content" // All content management
  | "manage:moderation" // Content moderation rules
  | "manage:guidelines" // Community guidelines
  | "manage:reports" // User reports and violations
  
  // Existing permissions
  | "view:users"
  | "edit:users"
  | "delete:users"
  | "view:startups"
  | "edit:startups"
  | "delete:startups"
  | "view:investors"
  | "edit:investors"
  | "delete:investors"
  | "view:mentors"
  | "edit:mentors"
  | "delete:mentors"
  | "view:events"
  | "create:events"
  | "edit:events"
  | "delete:events"
  | "view:courses"
  | "create:courses"
  | "edit:courses"
  | "delete:courses"
  | "view:funding"
  | "create:funding"
  | "edit:funding"
  | "delete:funding"
  | "view:applications"
  | "review:applications"
  | "approve:applications"
  | "reject:applications"
  | "view:analytics"
  | "export:data"
  | "import:data"
  | "manage:system"
  // Communication permissions
  | "view:communication"
  | "create:communication"
  | "edit:communication"
  | "delete:communication"
  // Co-founder matching permissions
  | "view:cofounder"
  | "create:cofounder"
  | "edit:cofounder"
  | "delete:cofounder"
  // GrowthStarter permissions
  | "view:growthstarter"
  | "create:growthstarter"
  | "edit:growthstarter"
  | "delete:growthstarter"
  // Business development permissions
  | "view:business"
  | "create:business"
  | "edit:business"
  | "delete:business"
  // Network permissions
  | "view:network"
  | "create:network"
  | "edit:network"
  | "delete:network"
  // Resources permissions
  | "view:resources"
  | "create:resources"
  | "edit:resources"
  | "delete:resources"
  // Mentorship permissions
  | "view:mentorship"
  | "create:mentorship"
  | "edit:mentorship"
  | "delete:mentorship"
  // Jobs permissions
  | "view:jobs"
  | "create:jobs"
  | "edit:jobs"
  | "delete:jobs"
  // Feed permissions
  | "view:feed"
  | "create:feed"
  | "edit:feed"
  | "delete:feed"
  // Files permissions
  | "view:files"
  | "create:files"
  | "edit:files"
  | "delete:files"

// Feature management types
export interface PlatformFeature {
  id: string
  name: string
  description: string
  category: "core" | "growth" | "engagement" | "monetization" | "analytics"
  status: "development" | "testing" | "beta" | "live" | "deprecated"
  phase: "phase1" | "phase2" | "phase3" | "phase4" | "phase5"
  launchDate?: string
  targetAudience: string[]
  dependencies: string[]
  metrics: string[]
  isEnabled: boolean
  isPublic: boolean
  requiresAuth: boolean
  permissions: Permission[]
  config: Record<string, any>
}

// Employee management types
export interface Employee {
  id: string
  email: string
  displayName: string
  role: UserRole
  department: string
  position: string
  hireDate: string
  permissions: Permission[]
  managerId?: string
  isActive: boolean
  performance: {
    rating: number
    lastReview: string
    notes: string
  }
  access: {
    canManageUsers: boolean
    canManageContent: boolean
    canViewAnalytics: boolean
    canManageFeatures: boolean
    canManageEmployees: boolean
  }
}

// Phase management types
export interface LaunchPhase {
  id: string
  name: string
  description: string
  startDate: string
  endDate?: string
  features: string[]
  targetMetrics: Record<string, number>
  status: "planned" | "active" | "completed" | "paused"
  notes: string
}

export interface User {
  id: string
  email: string
  displayName?: string
  role?: string
  emailVerified?: boolean
  createdAt: string
  profileCompleted?: boolean
  designation?: string
  avatarUrl?: string
  // Enhanced user properties
  permissions?: Permission[]
  isEmployee?: boolean
  employeeId?: string
  lastActive?: string
  status?: "active" | "suspended" | "banned"
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
}

export interface AuthContextType {
  user: User | null
  loading: boolean
  isLoading: boolean
  error: Error | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  signup: (email: string, password: string, name: string) => Promise<void>
  resetPassword: (email: string) => Promise<void>
  hasPermission: (permission: Permission) => boolean
  // Enhanced founder capabilities
  isFounder: () => boolean
  canManageFeatures: () => boolean
  canManageEmployees: () => boolean
  // Feature management
  getPlatformFeatures: () => Promise<PlatformFeature[]>
  toggleFeature: (featureId: string, enabled: boolean) => Promise<void>
  updateFeaturePhase: (featureId: string, phase: string) => Promise<void>
  // Employee management
  getEmployees: () => Promise<Employee[]>
  updateEmployeePermissions: (employeeId: string, permissions: Permission[]) => Promise<void>
  createEmployee: (employeeData: Omit<Employee, 'id'>) => Promise<Employee>
}
