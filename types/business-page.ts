// import type { Post } from "./post"

export interface BusinessPage {
  id: string
  name: string
  handle: string
  description: string
  industry: string
  size: string
  website?: string
  logo?: string
  coverImage?: string
  location?: string
  foundedYear?: number
  followers: number
  admins: string[] // User IDs of admins
  employees: number
  createdAt: string
  updatedAt: string
  // Enhanced fields
  tagline?: string
  mission?: string
  vision?: string
  values?: string[]
  specialties?: string[]
  services?: string[]
  targetAudience?: string
  businessModel?: string
  fundingStage?: string
  revenue?: string
  socialMedia?: {
    linkedin?: string
    twitter?: string
    facebook?: string
    instagram?: string
  }
  contactInfo?: {
    email?: string
    phone?: string
    address?: string
  }
  certifications?: string[]
  awards?: string[]
  partnerships?: string[]
  keyMetrics?: {
    customers?: number
    revenue?: number
    growth?: number
  }
  companyStage?: string
  legalStructure?: string
  headquarters?: string
  remoteWork?: boolean
  languages?: string[]
  timezone?: string
  // Startup profile fields
  longDescription?: string
  tags?: string[]
  featured?: boolean
  verified?: boolean
  funding?: string
  founders?: {
    name: string
    title: string
    bio: string
    avatar?: string
    linkedin?: string
  }[]
  investors?: {
    name: string
    type: string
    logo?: string
  }[]
  team?: {
    name: string
    role: string
    department: string
    avatar?: string
  }[]
  jobs?: {
    id: string
    title: string
    department: string
    type: string
    location: string
    description: string
    requirements: string[]
    posted: string
  }[]
  updates?: {
    id: string
    title: string
    content: string
    date: string
    author: string
  }[]
  milestones?: {
    title: string
    date: string
    description: string
  }[]
  // Additional comprehensive startup details
  businessModel?: string
  targetMarket?: string
  competitiveAdvantage?: string
  technologyStack?: string[]
  patents?: string[]
  officeLocations?: {
    city: string
    address: string
    type: string
    employees: number
  }[]
  culture?: {
    values?: string[]
    perks?: string[]
    teamSize?: number
    averageAge?: number
    diversity?: {
      gender?: { male: number; female: number }
      ethnicity?: { asian: number; caucasian: number; other: number }
    }
  }
  product?: {
    name?: string
    description?: string
    features?: string[]
    pricing?: {
      starter?: string
      professional?: string
      enterprise?: string
    }
    integrations?: string[]
  }
  market?: {
    totalAddressableMarket?: number
    serviceableAddressableMarket?: number
    serviceableObtainableMarket?: number
    marketGrowth?: number
    competition?: string[]
  }
}

export interface BusinessPagePost {
  businessPageId: string
}

export type BusinessPageRole = "admin" | "editor" | "analyst" | "viewer"

export interface BusinessPageMember {
  userId: string
  businessPageId: string
  role: BusinessPageRole
  joinedAt: string
}

export interface CreateBusinessPageFormData {
  name: string
  handle: string
  description: string
  industry: string
  size: string
  website?: string
  location?: string
  foundedYear?: number
  // Enhanced fields
  tagline?: string
  mission?: string
  vision?: string
  values?: string[]
  specialties?: string[]
  services?: string[]
  targetAudience?: string
  businessModel?: string
  fundingStage?: string
  revenue?: string
  socialMedia?: {
    linkedin?: string
    twitter?: string
    facebook?: string
    instagram?: string
  }
  contactInfo?: {
    email?: string
    phone?: string
    address?: string
  }
  certifications?: string[]
  awards?: string[]
  partnerships?: string[]
  keyMetrics?: {
    customers?: number
    revenue?: number
    growth?: number
  }
  companyStage?: string
  legalStructure?: string
  headquarters?: string
  remoteWork?: boolean
  languages?: string[]
  timezone?: string
  // Startup profile fields
  longDescription?: string
  tags?: string[]
  featured?: boolean
  verified?: boolean
  funding?: string
  founders?: {
    name: string
    title: string
    bio: string
    avatar?: string
    linkedin?: string
  }[]
  investors?: {
    name: string
    type: string
    logo?: string
  }[]
  team?: {
    name: string
    role: string
    department: string
    avatar?: string
  }[]
  jobs?: {
    id: string
    title: string
    department: string
    type: string
    location: string
    description: string
    requirements: string[]
    posted: string
  }[]
  updates?: {
    id: string
    title: string
    content: string
    date: string
    author: string
  }[]
  milestones?: {
    title: string
    date: string
    description: string
  }[]
  // Additional comprehensive startup details
  businessModel?: string
  targetMarket?: string
  competitiveAdvantage?: string
  technologyStack?: string[]
  patents?: string[]
  officeLocations?: {
    city: string
    address: string
    type: string
    employees: number
  }[]
  culture?: {
    values?: string[]
    perks?: string[]
    teamSize?: number
    averageAge?: number
    diversity?: {
      gender?: { male: number; female: number }
      ethnicity?: { asian: number; caucasian: number; other: number }
    }
  }
  product?: {
    name?: string
    description?: string
    features?: string[]
    pricing?: {
      starter?: string
      professional?: string
      enterprise?: string
    }
    integrations?: string[]
  }
  market?: {
    totalAddressableMarket?: number
    serviceableAddressableMarket?: number
    serviceableObtainableMarket?: number
    marketGrowth?: number
    competition?: string[]
  }
}

export interface BusinessPageAnalytics {
  followers: {
    total: number
    growth: number
    history: { date: string; count: number }[]
  }
  engagement: {
    impressions: number
    clicks: number
    reactions: number
    comments: number
    shares: number
  }
  demographics: {
    industries: { name: string; percentage: number }[]
    jobTitles: { title: string; percentage: number }[]
    locations: { location: string; percentage: number }[]
  }
}
