export type FounderSkill =
  | "engineering"
  | "product"
  | "design"
  | "marketing"
  | "sales"
  | "finance"
  | "operations"
  | "legal"
  | "hr"
  | "other"

export type FounderIndustry =
  | "fintech"
  | "healthtech"
  | "edtech"
  | "ecommerce"
  | "saas"
  | "ai"
  | "blockchain"
  | "cleantech"
  | "hardware"
  | "consumer"
  | "enterprise"
  | "other"

export type FounderGoal = "build-mvp" | "product-market-fit" | "raise-funding" | "scale" | "exit" | "other"

export interface FounderProfile {
  id: string
  name: string
  avatar: string
  location: string
  skills: FounderSkill[]
  industry: FounderIndustry
  experience: number // years
  goal: FounderGoal
  bio: string
  linkedin?: string
  email?: string
  matchScore?: number // 0-100
}

export interface FounderTeam {
  id: string
  name?: string
  founders: FounderProfile[]
  industry: FounderIndustry
  idea: string
  stage: "ideation" | "mvp" | "validation" | "scaling"
  matchScore: number // 0-100
  createdAt: string
  savedByInvestor?: boolean
}

export interface TeamCompatibility {
  score: number // 0-100
  skillsCompleteness: number // 0-100
  experienceLevel: number // 0-100
  industryAlignment: number // 0-100
  locationProximity: number // 0-100
}
