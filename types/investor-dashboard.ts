export type DealStage =
  | "new"
  | "screening"
  | "meeting"
  | "due-diligence"
  | "committee"
  | "term-sheet"
  | "closed"
  | "rejected"

export type EvaluationCriteria =
  | "team"
  | "product"
  | "market"
  | "traction"
  | "business-model"
  | "competition"
  | "financials"
  | "valuation"

export interface Deal {
  id: string
  companyName: string
  logo: string
  industry: string
  stage: string
  description: string
  askAmount: number
  location: string
  founderName: string
  founderEmail: string
  dateReceived: string
  dealStage: DealStage
  lastActivity: string
  nextSteps?: string
  notes?: string
  evaluationScores?: Record<EvaluationCriteria, number>
  documents?: {
    name: string
    url: string
    type: string
    dateUploaded: string
  }[]
  meetings?: {
    id: string
    date: string
    time: string
    type: string
    notes?: string
    attendees: string[]
    completed: boolean
  }[]
  tags?: string[]
}

export interface PortfolioCompany {
  id: string
  name: string
  logo: string
  industry: string
  investmentDate: string
  investmentAmount: number
  equityPercentage: number
  valuation: number
  currentValuation?: number
  status: "active" | "acquired" | "ipo" | "closed"
  kpis?: {
    revenue: number
    growth: number
    burn: number
    runway: number
    customers: number
  }
  team?: {
    name: string
    role: string
    email: string
  }[]
  boardMeetings?: {
    date: string
    documents: {
      name: string
      url: string
    }[]
  }[]
  followOnFunding?: {
    date: string
    amount: number
    investors: string[]
    valuation: number
  }[]
}

export interface DealFlowMetrics {
  newDeals: number
  inProgress: number
  closed: number
  rejected: number
  totalDeals: number
  averageDealSize: number
  conversionRate: number
  averageDaysToClose: number
}

export interface InvestorProfile {
  id: string
  name: string
  email: string
  role: string
  organization: string
  investmentThesis: string
  investmentCriteria: {
    stages: string[]
    industries: string[]
    ticketSize: {
      min: number
      max: number
    }
    geographies: string[]
  }
  portfolio: {
    totalCompanies: number
    totalInvested: number
    averageInvestment: number
    returns: number
  }
}
