export type FundingType = "vc" | "angel" | "grant" | "accelerator" | "corporate" | "debt"

export type FundingStage = "pre-seed" | "seed" | "series-a" | "series-b" | "series-c" | "growth" | "late-stage"

export type Industry =
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

export interface FundingOpportunity {
  id: string
  title: string
  organization: string
  logo: string
  type: FundingType
  stage: FundingStage[]
  minAmount: number
  maxAmount: number
  industries: Industry[]
  description: string
  requirements: string[]
  applicationDeadline?: string
  location: string
  contactEmail?: string
  website: string
  featured?: boolean
}

export interface Investor {
  id: string
  name: string
  organization: string
  title: string
  avatar: string
  bio: string
  investmentFocus: {
    stages: FundingStage[]
    industries: Industry[]
    ticketSize: {
      min: number
      max: number
    }
  }
  portfolio?: string[]
  location: string
  contactEmail?: string
  linkedin?: string
  twitter?: string
}

export interface FundingApplication {
  opportunityId: string
  companyName: string
  website: string
  contactName: string
  contactEmail: string
  contactPhone: string
  foundingDate: string
  teamSize: number
  stage: FundingStage
  industry: Industry
  location: string
  fundingAmount: number
  pitchDeck: File | null
  businessPlan: File | null
  financials: File | null
  additionalInfo?: string
}
