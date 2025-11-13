// Types for community guidelines
export interface GuidelineItem {
  id: string
  categoryId: string
  title: string
  description: string
  examples?: string[]
  consequences?: string[]
  severity: "low" | "medium" | "high" | "critical"
  order: number
}

export interface GuidelineCategory {
  id: string
  name: string
  description: string
  order: number
}

export interface CommunityGuidelines {
  name: string
  description: string
  version: string
  lastUpdated: string
  categories: GuidelineCategory[]
  items: GuidelineItem[]
}

export interface GuidelineViolation {
  guidelineId: string
  severity: "low" | "medium" | "high" | "critical"
  description: string
}

export interface GuidelineCheckResult {
  violatesGuidelines: boolean
  violations: GuidelineViolation[]
}

// Mock data for community guidelines
const mockGuidelines: CommunityGuidelines = {
  name: "GrowthLab Community Guidelines",
  description: "Standards and expectations for all members of the GrowthLab community",
  version: "1.2.0",
  lastUpdated: "2023-11-15T00:00:00Z",
  categories: [
    {
      id: "respect",
      name: "Respect & Civility",
      description: "Treat all community members with respect and engage in civil discourse",
      order: 1,
    },
    {
      id: "safety",
      name: "Safety & Security",
      description: "Ensure the safety and security of all community members",
      order: 2,
    },
    {
      id: "content",
      name: "Content Standards",
      description: "Guidelines for creating and sharing content",
      order: 3,
    },
    {
      id: "intellectual",
      name: "Intellectual Property",
      description: "Respect for intellectual property rights",
      order: 4,
    },
  ],
  items: [
    {
      id: "harassment",
      categoryId: "respect",
      title: "No Harassment or Bullying",
      description: "Do not engage in harassment, bullying, or intimidation of any kind.",
      examples: [
        "Sending unwanted messages repeatedly",
        "Making threats or personal attacks",
        "Posting content intended to shame or humiliate others",
      ],
      consequences: ["Content removal", "Temporary suspension", "Permanent ban for severe or repeated violations"],
      severity: "high",
      order: 1,
    },
    {
      id: "hate-speech",
      categoryId: "respect",
      title: "No Hate Speech",
      description:
        "Do not use language that promotes hatred or violence against individuals or groups based on attributes such as race, ethnicity, gender, religion, sexual orientation, or disability.",
      examples: [
        "Slurs or derogatory terms",
        "Content that dehumanizes or demonizes groups",
        "Promoting stereotypes that are harmful",
      ],
      consequences: ["Content removal", "Account suspension or termination"],
      severity: "critical",
      order: 2,
    },
    // More items would be defined here
  ],
}

// Function to get community guidelines
export function getCommunityGuidelines(): CommunityGuidelines {
  // In a real app, this might fetch from an API or database
  return mockGuidelines
}

// Function to check content against community guidelines
export function checkContentAgainstGuidelines(content: string): GuidelineCheckResult {
  // This is a simplified implementation
  // In a real app, this would use more sophisticated techniques

  const violations: GuidelineViolation[] = []
  const contentLower = content.toLowerCase()

  // Check for hate speech (very simplified)
  const hateTerms = ["hate", "slur", "racist", "discrimination"]
  if (hateTerms.some((term) => contentLower.includes(term))) {
    violations.push({
      guidelineId: "hate-speech",
      severity: "critical",
      description: "Potential hate speech detected",
    })
  }

  // Check for harassment (very simplified)
  const harassmentTerms = ["stupid", "idiot", "loser", "bully"]
  if (harassmentTerms.some((term) => contentLower.includes(term))) {
    violations.push({
      guidelineId: "harassment",
      severity: "high",
      description: "Potential harassment or bullying detected",
    })
  }

  return {
    violatesGuidelines: violations.length > 0,
    violations,
  }
}

// Function to update community guidelines
export function updateCommunityGuidelines(guidelines: Partial<CommunityGuidelines>): CommunityGuidelines {
  // In a real app, this would update the guidelines in a database
  // For now, we'll just return the mock data
  return {
    ...mockGuidelines,
    ...guidelines,
    lastUpdated: new Date().toISOString(),
  }
}
