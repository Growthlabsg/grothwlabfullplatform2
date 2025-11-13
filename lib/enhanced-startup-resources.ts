/**
 * Enhanced Startup Resources Collection
 * 
 * A comprehensive collection of startup-related resources including:
 * - Funding strategies and investor relations
 * - Market research and validation tools
 * - Business planning and strategy guides
 * - Networking and community building
 * - Legal and compliance resources
 * - Technology and development tools
 * - Marketing and growth strategies
 * - Financial planning and management
 */

export interface StartupResource {
  id: string
  title: string
  type: 'guide' | 'template' | 'tool' | 'video' | 'webinar' | 'article' | 'checklist' | 'calculator'
  format: 'pdf' | 'xlsx' | 'docx' | 'pptx' | 'mp4' | 'html' | 'interactive'
  thumbnail: string
  description: string
  author: string
  date: string
  readTime: string
  categories: string[]
  topics: string[]
  featured: boolean
  popular: boolean
  targetAudience: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  tags: string[]
  downloadUrl?: string
  externalUrl?: string
}

// Funding Strategies & Investor Relations
export const fundingResources: StartupResource[] = [
  {
    id: "funding-guide-1",
    title: "Complete Guide to Startup Funding in Singapore",
    type: "guide",
    format: "pdf",
    thumbnail: "/funding-singapore-guide.png",
    description: "Comprehensive guide covering all funding options available to Singapore startups, from government grants to venture capital.",
    author: "GrowthLab Investment Team",
    date: "Apr 20, 2025",
    readTime: "45 min read",
    categories: ["Funding", "Investment"],
    topics: ["Government Grants", "VC Funding", "Angel Investment", "Crowdfunding"],
    featured: true,
    popular: true,
    targetAudience: ["startups", "founders"],
    difficulty: "intermediate",
    tags: ["funding", "singapore", "grants", "investment"]
  },
  {
    id: "funding-template-1",
    title: "Investor Pitch Deck Template (Singapore Market)",
    type: "template",
    format: "pptx",
    thumbnail: "/pitch-deck-template.png",
    description: "Professional pitch deck template optimized for Singapore investors with local market insights and regulatory considerations.",
    author: "GrowthLab Design Team",
    date: "Apr 18, 2025",
    readTime: "15 min setup",
    categories: ["Funding", "Pitching"],
    topics: ["Pitch Deck", "Investor Relations", "Singapore Market"],
    featured: true,
    popular: true,
    targetAudience: ["startups", "founders"],
    difficulty: "beginner",
    tags: ["pitch-deck", "investors", "singapore"]
  },
  {
    id: "funding-tool-1",
    title: "Funding Readiness Assessment Tool",
    type: "tool",
    format: "interactive",
    thumbnail: "/funding-assessment.png",
    description: "Interactive assessment tool to evaluate your startup's funding readiness and identify areas for improvement.",
    author: "GrowthLab Analytics Team",
    date: "Apr 15, 2025",
    readTime: "10 min assessment",
    categories: ["Funding", "Assessment"],
    topics: ["Funding Readiness", "Due Diligence", "Investor Preparation"],
    featured: false,
    popular: true,
    targetAudience: ["startups", "founders"],
    difficulty: "beginner",
    tags: ["assessment", "funding-readiness", "due-diligence"]
  },
  {
    id: "funding-calculator-1",
    title: "Startup Valuation Calculator",
    type: "calculator",
    format: "interactive",
    thumbnail: "/valuation-calculator.png",
    description: "Advanced valuation calculator using multiple methodologies including DCF, comparables, and industry benchmarks.",
    author: "GrowthLab Finance Team",
    date: "Apr 12, 2025",
    readTime: "20 min setup",
    categories: ["Funding", "Finance"],
    topics: ["Valuation", "Financial Modeling", "Investor Negotiation"],
    featured: true,
    popular: true,
    targetAudience: ["startups", "founders", "investors"],
    difficulty: "intermediate",
    tags: ["valuation", "financial-modeling", "investor-relations"]
  }
]

// Market Research & Validation
export const marketResearchResources: StartupResource[] = [
  {
    id: "market-guide-1",
    title: "Market Research Methodology for Startups",
    type: "guide",
    format: "pdf",
    thumbnail: "/market-research-guide.png",
    description: "Step-by-step guide to conducting effective market research on a startup budget with practical tools and techniques.",
    author: "GrowthLab Research Team",
    date: "Apr 22, 2025",
    readTime: "35 min read",
    categories: ["Market Research", "Validation"],
    topics: ["Customer Discovery", "Competitive Analysis", "Market Sizing"],
    featured: true,
    popular: true,
    targetAudience: ["startups", "founders"],
    difficulty: "intermediate",
    tags: ["market-research", "customer-discovery", "validation"]
  },
  {
    id: "market-template-1",
    title: "Customer Interview Scripts & Templates",
    type: "template",
    format: "docx",
    thumbnail: "/customer-interview.png",
    description: "Comprehensive collection of customer interview scripts for different stages of product development and validation.",
    author: "GrowthLab UX Team",
    date: "Apr 20, 2025",
    readTime: "10 min setup",
    categories: ["Market Research", "Customer Development"],
    topics: ["User Interviews", "Customer Feedback", "Product Validation"],
    featured: false,
    popular: true,
    targetAudience: ["startups", "founders"],
    difficulty: "beginner",
    tags: ["customer-interviews", "user-research", "validation"]
  },
  {
    id: "market-tool-1",
    title: "Competitive Analysis Framework",
    type: "tool",
    format: "interactive",
    thumbnail: "/competitive-analysis.png",
    description: "Interactive framework to analyze competitors, identify market gaps, and position your startup effectively.",
    author: "GrowthLab Strategy Team",
    date: "Apr 18, 2025",
    readTime: "25 min analysis",
    categories: ["Market Research", "Strategy"],
    topics: ["Competitive Analysis", "Market Positioning", "Differentiation"],
    featured: true,
    popular: false,
    targetAudience: ["startups", "founders"],
    difficulty: "intermediate",
    tags: ["competitive-analysis", "market-positioning", "strategy"]
  },
  {
    id: "market-calculator-1",
    title: "Market Size Calculator (TAM/SAM/SOM)",
    type: "calculator",
    format: "interactive",
    thumbnail: "/market-size-calculator.png",
    description: "Tool to calculate Total Addressable Market (TAM), Serviceable Addressable Market (SAM), and Serviceable Obtainable Market (SOM).",
    author: "GrowthLab Analytics Team",
    date: "Apr 15, 2025",
    readTime: "15 min setup",
    categories: ["Market Research", "Finance"],
    topics: ["Market Sizing", "TAM/SAM/SOM", "Investor Pitch"],
    featured: false,
    popular: true,
    targetAudience: ["startups", "founders"],
    difficulty: "intermediate",
    tags: ["market-sizing", "tam-sam-som", "investor-pitch"]
  }
]

// Business Planning & Strategy
export const businessPlanningResources: StartupResource[] = [
  {
    id: "planning-guide-1",
    title: "Strategic Business Planning for Startups",
    type: "guide",
    format: "pdf",
    thumbnail: "/business-planning-guide.png",
    description: "Comprehensive guide to creating strategic business plans that align with your startup's vision and market opportunities.",
    author: "GrowthLab Strategy Team",
    date: "Apr 25, 2025",
    readTime: "40 min read",
    categories: ["Business Planning", "Strategy"],
    topics: ["Strategic Planning", "Business Model", "Go-to-Market"],
    featured: true,
    popular: true,
    targetAudience: ["startups", "founders"],
    difficulty: "intermediate",
    tags: ["business-planning", "strategy", "go-to-market"]
  },
  {
    id: "planning-template-1",
    title: "Business Model Canvas Template",
    type: "template",
    format: "xlsx",
    thumbnail: "/business-model-canvas.png",
    description: "Interactive Business Model Canvas template with guided prompts and examples for startup business models.",
    author: "GrowthLab Innovation Team",
    date: "Apr 23, 2025",
    readTime: "20 min setup",
    categories: ["Business Planning", "Innovation"],
    topics: ["Business Model Canvas", "Value Proposition", "Revenue Streams"],
    featured: true,
    popular: true,
    targetAudience: ["startups", "founders"],
    difficulty: "beginner",
    tags: ["business-model-canvas", "value-proposition", "revenue-streams"]
  },
  {
    id: "planning-tool-1",
    title: "Go-to-Market Strategy Builder",
    type: "tool",
    format: "interactive",
    thumbnail: "/gtm-strategy-builder.png",
    description: "Interactive tool to build comprehensive go-to-market strategies with step-by-step guidance and templates.",
    author: "GrowthLab Marketing Team",
    date: "Apr 20, 2025",
    readTime: "30 min setup",
    categories: ["Business Planning", "Marketing"],
    topics: ["Go-to-Market", "Customer Acquisition", "Channel Strategy"],
    featured: true,
    popular: false,
    targetAudience: ["startups", "founders"],
    difficulty: "intermediate",
    tags: ["go-to-market", "customer-acquisition", "channel-strategy"]
  },
  {
    id: "planning-checklist-1",
    title: "Startup Launch Checklist",
    type: "checklist",
    format: "interactive",
    thumbnail: "/launch-checklist.png",
    description: "Comprehensive checklist covering all aspects of launching a startup, from legal setup to marketing launch.",
    author: "GrowthLab Operations Team",
    date: "Apr 18, 2025",
    readTime: "15 min review",
    categories: ["Business Planning", "Operations"],
    topics: ["Launch Preparation", "Legal Setup", "Marketing Launch"],
    featured: false,
    popular: true,
    targetAudience: ["startups", "founders"],
    difficulty: "beginner",
    tags: ["launch-checklist", "legal-setup", "marketing-launch"]
  }
]

// Networking & Community Building
export const networkingResources: StartupResource[] = [
  {
    id: "networking-guide-1",
    title: "Building Your Startup Network in Singapore",
    type: "guide",
    format: "pdf",
    thumbnail: "/networking-singapore.png",
    description: "Complete guide to building meaningful connections in Singapore's startup ecosystem, including events, communities, and platforms.",
    author: "GrowthLab Community Team",
    date: "Apr 28, 2025",
    readTime: "25 min read",
    categories: ["Networking", "Community"],
    topics: ["Networking Strategy", "Singapore Ecosystem", "Community Building"],
    featured: true,
    popular: true,
    targetAudience: ["startups", "founders"],
    difficulty: "beginner",
    tags: ["networking", "singapore-ecosystem", "community-building"]
  },
  {
    id: "networking-template-1",
    title: "Networking Follow-up Email Templates",
    type: "template",
    format: "docx",
    thumbnail: "/follow-up-templates.png",
    description: "Professional email templates for following up after networking events, investor meetings, and mentor sessions.",
    author: "GrowthLab Communication Team",
    date: "Apr 25, 2025",
    readTime: "10 min setup",
    categories: ["Networking", "Communication"],
    topics: ["Email Templates", "Follow-up Strategy", "Professional Communication"],
    featured: false,
    popular: true,
    targetAudience: ["startups", "founders"],
    difficulty: "beginner",
    tags: ["email-templates", "follow-up", "professional-communication"]
  },
  {
    id: "networking-tool-1",
    title: "Startup Event Calendar & Tracker",
    type: "tool",
    format: "interactive",
    thumbnail: "/event-calendar.png",
    description: "Interactive calendar of startup events in Singapore with tracking tools for networking goals and follow-ups.",
    author: "GrowthLab Events Team",
    date: "Apr 22, 2025",
    readTime: "5 min setup",
    categories: ["Networking", "Events"],
    topics: ["Event Planning", "Networking Goals", "Follow-up Tracking"],
    featured: true,
    popular: false,
    targetAudience: ["startups", "founders"],
    difficulty: "beginner",
    tags: ["event-calendar", "networking-goals", "follow-up-tracking"]
  },
  {
    id: "networking-video-1",
    title: "Effective Networking for Introverts",
    type: "video",
    format: "mp4",
    thumbnail: "/networking-introverts.png",
    description: "Video guide on networking strategies specifically designed for introverted founders and startup team members.",
    author: "GrowthLab Psychology Team",
    date: "Apr 20, 2025",
    readTime: "18 min watch",
    categories: ["Networking", "Personal Development"],
    topics: ["Introvert Networking", "Social Skills", "Confidence Building"],
    featured: false,
    popular: true,
    targetAudience: ["startups", "founders"],
    difficulty: "beginner",
    tags: ["introvert-networking", "social-skills", "confidence-building"]
  }
]

// Legal & Compliance Resources
export const legalResources: StartupResource[] = [
  {
    id: "legal-guide-1",
    title: "Startup Legal Framework in Singapore",
    type: "guide",
    format: "pdf",
    thumbnail: "/legal-framework.png",
    description: "Comprehensive guide to Singapore's legal framework for startups, including incorporation, compliance, and regulatory requirements.",
    author: "GrowthLab Legal Team",
    date: "Apr 30, 2025",
    readTime: "50 min read",
    categories: ["Legal", "Compliance"],
    topics: ["Incorporation", "Regulatory Compliance", "Singapore Law"],
    featured: true,
    popular: true,
    targetAudience: ["startups", "founders"],
    difficulty: "intermediate",
    tags: ["legal-framework", "incorporation", "compliance"]
  },
  {
    id: "legal-template-1",
    title: "Founder Agreement Template",
    type: "template",
    format: "docx",
    thumbnail: "/founder-agreement.png",
    description: "Comprehensive founder agreement template covering equity splits, roles, responsibilities, and exit scenarios.",
    author: "GrowthLab Legal Team",
    date: "Apr 28, 2025",
    readTime: "30 min setup",
    categories: ["Legal", "Founder Relations"],
    topics: ["Founder Agreements", "Equity Splits", "Roles & Responsibilities"],
    featured: true,
    popular: true,
    targetAudience: ["startups", "founders"],
    difficulty: "intermediate",
    tags: ["founder-agreements", "equity-splits", "roles-responsibilities"]
  },
  {
    id: "legal-tool-1",
    title: "IP Protection Assessment Tool",
    type: "tool",
    format: "interactive",
    thumbnail: "/ip-protection.png",
    description: "Interactive assessment tool to evaluate your startup's intellectual property protection needs and create an IP strategy.",
    author: "GrowthLab IP Team",
    date: "Apr 25, 2025",
    readTime: "20 min assessment",
    categories: ["Legal", "Intellectual Property"],
    topics: ["IP Protection", "Patent Strategy", "Trademark Registration"],
    featured: false,
    popular: true,
    targetAudience: ["startups", "founders"],
    difficulty: "intermediate",
    tags: ["ip-protection", "patent-strategy", "trademark-registration"]
  },
  {
    id: "legal-checklist-1",
    title: "Startup Compliance Checklist",
    type: "checklist",
    format: "interactive",
    thumbnail: "/compliance-checklist.png",
    description: "Comprehensive checklist covering all legal and compliance requirements for Singapore startups at different stages.",
    author: "GrowthLab Compliance Team",
    date: "Apr 22, 2025",
    readTime: "15 min review",
    categories: ["Legal", "Compliance"],
    topics: ["Regulatory Compliance", "Tax Requirements", "Employment Law"],
    featured: false,
    popular: true,
    targetAudience: ["startups", "founders"],
    difficulty: "beginner",
    tags: ["compliance", "tax-requirements", "employment-law"]
  }
]

// Technology & Development Resources
export const technologyResources: StartupResource[] = [
  {
    id: "tech-guide-1",
    title: "Technology Stack Selection for Startups",
    type: "guide",
    format: "pdf",
    thumbnail: "/tech-stack-guide.png",
    description: "Guide to choosing the right technology stack for your startup based on team size, budget, and scalability needs.",
    author: "GrowthLab Tech Team",
    date: "May 2, 2025",
    readTime: "35 min read",
    categories: ["Technology", "Development"],
    topics: ["Tech Stack", "Scalability", "Cost Optimization"],
    featured: true,
    popular: true,
    targetAudience: ["startups", "founders", "developers"],
    difficulty: "intermediate",
    tags: ["tech-stack", "scalability", "cost-optimization"]
  },
  {
    id: "tech-template-1",
    title: "Technical Architecture Template",
    type: "template",
    format: "pptx",
    thumbnail: "/tech-architecture.png",
    description: "Template for documenting technical architecture decisions, system design, and technology choices.",
    author: "GrowthLab Architecture Team",
    date: "Apr 30, 2025",
    readTime: "25 min setup",
    categories: ["Technology", "Architecture"],
    topics: ["System Design", "Technical Documentation", "Architecture Decisions"],
    featured: false,
    popular: true,
    targetAudience: ["startups", "founders", "developers"],
    difficulty: "advanced",
    tags: ["system-design", "technical-documentation", "architecture-decisions"]
  },
  {
    id: "tech-tool-1",
    title: "Development Cost Calculator",
    type: "calculator",
    format: "interactive",
    thumbnail: "/dev-cost-calculator.png",
    description: "Tool to estimate development costs for different technology stacks, team sizes, and project scopes.",
    author: "GrowthLab Finance Team",
    date: "Apr 28, 2025",
    readTime: "15 min setup",
    categories: ["Technology", "Finance"],
    topics: ["Development Costs", "Budget Planning", "Resource Allocation"],
    featured: true,
    popular: false,
    targetAudience: ["startups", "founders"],
    difficulty: "intermediate",
    tags: ["development-costs", "budget-planning", "resource-allocation"]
  },
  {
    id: "tech-video-1",
    title: "MVP Development Best Practices",
    type: "video",
    format: "mp4",
    thumbnail: "/mvp-development.png",
    description: "Video guide on building minimum viable products efficiently with modern development practices and tools.",
    author: "GrowthLab Product Team",
    date: "Apr 25, 2025",
    readTime: "32 min watch",
    categories: ["Technology", "Product Development"],
    topics: ["MVP Development", "Agile Methodology", "User Testing"],
    featured: false,
    popular: true,
    targetAudience: ["startups", "founders", "developers"],
    difficulty: "intermediate",
    tags: ["mvp-development", "agile-methodology", "user-testing"]
  }
]

// Marketing & Growth Resources
export const marketingResources: StartupResource[] = [
  {
    id: "marketing-guide-1",
    title: "Startup Marketing on a Budget",
    type: "guide",
    format: "pdf",
    thumbnail: "/marketing-budget.png",
    description: "Comprehensive guide to effective marketing strategies for startups with limited budgets and resources.",
    author: "GrowthLab Marketing Team",
    date: "May 5, 2025",
    readTime: "40 min read",
    categories: ["Marketing", "Growth"],
    topics: ["Budget Marketing", "Growth Hacking", "Customer Acquisition"],
    featured: true,
    popular: true,
    targetAudience: ["startups", "founders"],
    difficulty: "intermediate",
    tags: ["budget-marketing", "growth-hacking", "customer-acquisition"]
  },
  {
    id: "marketing-template-1",
    title: "Marketing Strategy Template",
    type: "template",
    format: "xlsx",
    thumbnail: "/marketing-strategy.png",
    description: "Comprehensive marketing strategy template with budget planning, channel selection, and KPI tracking.",
    author: "GrowthLab Strategy Team",
    date: "May 3, 2025",
    readTime: "30 min setup",
    categories: ["Marketing", "Strategy"],
    topics: ["Marketing Strategy", "Channel Planning", "KPI Tracking"],
    featured: true,
    popular: true,
    targetAudience: ["startups", "founders"],
    difficulty: "intermediate",
    tags: ["marketing-strategy", "channel-planning", "kpi-tracking"]
  },
  {
    id: "marketing-tool-1",
    title: "Customer Acquisition Cost Calculator",
    type: "calculator",
    format: "interactive",
    thumbnail: "/cac-calculator.png",
    description: "Interactive calculator to track customer acquisition costs across different marketing channels and campaigns.",
    author: "GrowthLab Analytics Team",
    date: "May 1, 2025",
    readTime: "20 min setup",
    categories: ["Marketing", "Analytics"],
    topics: ["CAC Calculation", "Marketing ROI", "Channel Optimization"],
    featured: false,
    popular: true,
    targetAudience: ["startups", "founders"],
    difficulty: "intermediate",
    tags: ["cac-calculation", "marketing-roi", "channel-optimization"]
  },
  {
    id: "marketing-video-1",
    title: "Content Marketing for Startups",
    type: "video",
    format: "mp4",
    thumbnail: "/content-marketing.png",
    description: "Video guide on creating effective content marketing strategies that build brand awareness and generate leads.",
    author: "GrowthLab Content Team",
    date: "Apr 28, 2025",
    readTime: "28 min watch",
    categories: ["Marketing", "Content"],
    topics: ["Content Strategy", "Brand Building", "Lead Generation"],
    featured: false,
    popular: true,
    targetAudience: ["startups", "founders"],
    difficulty: "beginner",
    tags: ["content-strategy", "brand-building", "lead-generation"]
  }
]

// Financial Planning & Management
export const financialResources: StartupResource[] = [
  {
    id: "finance-guide-1",
    title: "Startup Financial Management Guide",
    type: "guide",
    format: "pdf",
    thumbnail: "/financial-management.png",
    description: "Complete guide to managing startup finances, from cash flow management to financial reporting and investor relations.",
    author: "GrowthLab Finance Team",
    date: "May 8, 2025",
    readTime: "45 min read",
    categories: ["Finance", "Management"],
    topics: ["Cash Flow Management", "Financial Reporting", "Investor Relations"],
    featured: true,
    popular: true,
    targetAudience: ["startups", "founders"],
    difficulty: "intermediate",
    tags: ["cash-flow", "financial-reporting", "investor-relations"]
  },
  {
    id: "finance-template-1",
    title: "Startup Financial Model Template",
    type: "template",
    format: "xlsx",
    thumbnail: "/financial-model.png",
    description: "Comprehensive financial model template with 3-year projections, scenario analysis, and investor-ready formatting.",
    author: "GrowthLab Finance Team",
    date: "May 6, 2025",
    readTime: "40 min setup",
    categories: ["Finance", "Modeling"],
    topics: ["Financial Modeling", "Projections", "Scenario Analysis"],
    featured: true,
    popular: true,
    targetAudience: ["startups", "founders"],
    difficulty: "advanced",
    tags: ["financial-modeling", "projections", "scenario-analysis"]
  },
  {
    id: "finance-tool-1",
    title: "Runway Calculator",
    type: "calculator",
    format: "interactive",
    thumbnail: "/runway-calculator.png",
    description: "Interactive tool to calculate your startup's runway based on current burn rate and funding scenarios.",
    author: "GrowthLab Analytics Team",
    date: "May 4, 2025",
    readTime: "15 min setup",
    categories: ["Finance", "Planning"],
    topics: ["Runway Calculation", "Burn Rate", "Funding Planning"],
    featured: false,
    popular: true,
    targetAudience: ["startups", "founders"],
    difficulty: "intermediate",
    tags: ["runway-calculation", "burn-rate", "funding-planning"]
  },
  {
    id: "finance-checklist-1",
    title: "Monthly Financial Review Checklist",
    type: "checklist",
    format: "interactive",
    thumbnail: "/financial-review.png",
    description: "Comprehensive checklist for monthly financial reviews covering cash flow, expenses, revenue, and investor updates.",
    author: "GrowthLab Operations Team",
    date: "May 2, 2025",
    readTime: "10 min review",
    categories: ["Finance", "Operations"],
    topics: ["Financial Review", "Monthly Reporting", "Investor Updates"],
    featured: false,
    popular: true,
    targetAudience: ["startups", "founders"],
    difficulty: "beginner",
    tags: ["financial-review", "monthly-reporting", "investor-updates"]
  }
]

// Combine all enhanced resources
export const getAllEnhancedStartupResources = (): StartupResource[] => {
  return [
    ...fundingResources,
    ...marketResearchResources,
    ...businessPlanningResources,
    ...networkingResources,
    ...legalResources,
    ...technologyResources,
    ...marketingResources,
    ...financialResources
  ]
}

// Get resources by category
export const getEnhancedResourcesByCategory = (category: string): StartupResource[] => {
  const allResources = getAllEnhancedStartupResources()
  return allResources.filter(resource => 
    resource.categories.some(cat => cat.toLowerCase() === category.toLowerCase())
  )
}

// Get resources by difficulty level
export const getEnhancedResourcesByDifficulty = (difficulty: string): StartupResource[] => {
  const allResources = getAllEnhancedStartupResources()
  return allResources.filter(resource => resource.difficulty === difficulty)
}

// Get featured resources
export const getFeaturedEnhancedResources = (): StartupResource[] => {
  const allResources = getAllEnhancedStartupResources()
  return allResources.filter(resource => resource.featured)
}

// Get popular resources
export const getPopularEnhancedResources = (): StartupResource[] => {
  const allResources = getAllEnhancedStartupResources()
  return allResources.filter(resource => resource.popular)
}

// Search enhanced resources
export const searchEnhancedResources = (query: string): StartupResource[] => {
  const allResources = getAllEnhancedStartupResources()
  const lowerCaseQuery = query.toLowerCase()

  return allResources.filter(resource =>
    resource.title.toLowerCase().includes(lowerCaseQuery) ||
    resource.description.toLowerCase().includes(lowerCaseQuery) ||
    resource.author.toLowerCase().includes(lowerCaseQuery) ||
    resource.categories.some(cat => cat.toLowerCase().includes(lowerCaseQuery)) ||
    resource.topics.some(topic => topic.toLowerCase().includes(lowerCaseQuery)) ||
    resource.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery))
  )
}

// Get all categories from enhanced resources
export const getAllEnhancedCategories = (): string[] => {
  const allResources = getAllEnhancedStartupResources()
  const categories = new Set<string>()
  
  allResources.forEach(resource => {
    resource.categories.forEach(category => categories.add(category))
  })
  
  return Array.from(categories).sort()
}

// Get all topics from enhanced resources
export const getAllEnhancedTopics = (): string[] => {
  const allResources = getAllEnhancedStartupResources()
  const topics = new Set<string>()
  
  allResources.forEach(resource => {
    resource.topics.forEach(topic => topics.add(topic))
  })
  
  return Array.from(topics).sort()
} 