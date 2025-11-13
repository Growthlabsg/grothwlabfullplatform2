export interface StartupGuide {
  id: string
  title: string
  category: 'market-research' | 'business-planning' | 'funding' | 'marketing' | 'scaling' | 'legal' | 'operations' | 'team-building'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  readTime: string
  author: string
  lastUpdated: string
  description: string
  keyTakeaways: string[]
  sections: GuideSection[]
  caseStudies: CaseStudy[]
  resources: Resource[]
  tags: string[]
  featured: boolean
}

export interface GuideSection {
  id: string
  title: string
  content: string
  subsections: SubSection[]
  tips: string[]
  warnings: string[]
  examples: Example[]
}

export interface SubSection {
  id: string
  title: string
  content: string
  tips: string[]
}

export interface Example {
  title: string
  description: string
  outcome: string
  lessons: string[]
}

export interface CaseStudy {
  id: string
  company: string
  industry: string
  challenge: string
  solution: string
  results: string
  keyLearnings: string[]
  year: number
}

export interface Resource {
  id: string
  title: string
  type: 'tool' | 'template' | 'checklist' | 'calculator' | 'video' | 'article'
  url: string
  description: string
}

export class StartupGuidesService {
  private static instance: StartupGuidesService
  private guides: StartupGuide[] = []

  constructor() {
    this.initializeGuides()
  }

  static getInstance(): StartupGuidesService {
    if (!StartupGuidesService.instance) {
      StartupGuidesService.instance = new StartupGuidesService()
    }
    return StartupGuidesService.instance
  }

  private initializeGuides() {
    this.guides = [
      this.createMarketResearchGuide(),
      this.createBusinessPlanningGuide(),
      this.createFundingGuide(),
      this.createMarketingGuide(),
      this.createScalingGuide(),
      this.createLegalGuide(),
      this.createOperationsGuide(),
      this.createTeamBuildingGuide()
    ]
  }

  getAllGuides(): StartupGuide[] {
    return this.guides
  }

  getGuidesByCategory(category: string): StartupGuide[] {
    return this.guides.filter(guide => guide.category === category)
  }

  getFeaturedGuides(): StartupGuide[] {
    return this.guides.filter(guide => guide.featured)
  }

  getGuideById(id: string): StartupGuide | undefined {
    return this.guides.find(guide => guide.id === id)
  }

  private createMarketResearchGuide(): StartupGuide {
    return {
      id: "market-research-complete-guide",
      title: "Complete Market Research Guide for Startups",
      category: "market-research",
      difficulty: "intermediate",
      readTime: "45 min",
      author: "GrowthLab Strategy Team",
      lastUpdated: "2025-01-15",
      description: "Master the art of market research with our comprehensive guide covering competitive analysis, customer validation, and market sizing strategies.",
      keyTakeaways: [
        "Learn to identify and analyze your target market effectively",
        "Master competitive analysis techniques",
        "Understand market sizing methodologies (TAM/SAM/SOM)",
        "Develop customer validation strategies",
        "Create actionable market research reports"
      ],
      sections: [
        {
          id: "understanding-your-market",
          title: "Understanding Your Market",
          content: "Market research is the foundation of any successful startup. It helps you understand your customers, competitors, and market dynamics.",
          subsections: [
            {
              id: "market-definition",
              title: "Defining Your Market",
              content: "Start by clearly defining your target market. Consider factors like demographics, psychographics, geographic location, and behavioral patterns.",
              tips: [
                "Use multiple data sources to validate market size",
                "Consider both primary and secondary research methods",
                "Focus on actionable market segments"
              ]
            }
          ],
          tips: [
            "Start with secondary research to understand the market landscape",
            "Use multiple research methods for comprehensive insights",
            "Focus on actionable insights rather than just data collection"
          ],
          warnings: [
            "Don't rely solely on online research - conduct primary research",
            "Avoid confirmation bias in your research",
            "Don't ignore competitor analysis"
          ],
          examples: [
            {
              title: "Airbnb's Market Research",
              description: "Airbnb conducted extensive market research to understand the sharing economy and identify market opportunities.",
              outcome: "Successfully identified and captured a new market segment in the hospitality industry.",
              lessons: [
                "Look for underserved market segments",
                "Validate assumptions through customer research",
                "Adapt to market feedback quickly"
              ]
            }
          ]
        }
      ],
      caseStudies: [
        {
          id: "dropbox-market-research",
          company: "Dropbox",
          industry: "Cloud Storage",
          challenge: "Understanding market demand for cloud storage solutions",
          solution: "Conducted extensive market research including customer interviews, competitive analysis, and market sizing",
          results: "Successfully identified market opportunity and positioned product effectively",
          keyLearnings: [
            "Customer interviews are invaluable for market validation",
            "Competitive analysis reveals market gaps",
            "Market sizing helps with fundraising and planning"
          ],
          year: 2007
        }
      ],
      resources: [
        {
          id: "market-sizing-calculator",
          title: "Market Sizing Calculator",
          type: "calculator",
          url: "/startup/market-research",
          description: "Calculate TAM, SAM, and SOM for your market"
        }
      ],
      tags: ["market-research", "competitive-analysis", "customer-validation", "market-sizing"],
      featured: true
    }
  }

  private createBusinessPlanningGuide(): StartupGuide {
    return {
      id: "business-planning-complete-guide",
      title: "Complete Business Planning Guide for Startups",
      category: "business-planning",
      difficulty: "intermediate",
      readTime: "60 min",
      author: "GrowthLab Strategy Team",
      lastUpdated: "2025-01-15",
      description: "Learn how to create a comprehensive business plan that attracts investors and guides your startup's growth strategy.",
      keyTakeaways: [
        "Master the essential components of a business plan",
        "Learn to create realistic financial projections",
        "Develop effective go-to-market strategies",
        "Create compelling value propositions",
        "Build investor-ready business plans"
      ],
      sections: [
        {
          id: "business-plan-structure",
          title: "Business Plan Structure",
          content: "A well-structured business plan is essential for startup success. This section covers the key components and best practices.",
          subsections: [
            {
              id: "executive-summary",
              title: "Executive Summary",
              content: "The executive summary is the most important part of your business plan. It should clearly articulate your value proposition, market opportunity, and business model in 1-2 pages.",
              tips: [
                "Write the executive summary last, after completing all sections",
                "Keep it concise and compelling",
                "Include key metrics and projections"
              ]
            }
          ],
          tips: [
            "Keep your business plan concise and focused",
            "Use data and evidence to support claims",
            "Update your plan regularly as your business evolves"
          ],
          warnings: [
            "Don't make unrealistic projections",
            "Avoid generic market research",
            "Don't ignore competitive threats"
          ],
          examples: [
            {
              title: "Tesla's Business Plan",
              description: "Tesla's business plan focused on disrupting the automotive industry through electric vehicles and sustainable energy.",
              outcome: "Successfully positioned itself as a technology company, not just an automaker.",
              lessons: [
                "Clear vision and mission are crucial",
                "Innovation can create new markets",
                "Sustainability can be a competitive advantage"
              ]
            }
          ]
        }
      ],
      caseStudies: [
        {
          id: "airbnb-business-plan",
          company: "Airbnb",
          industry: "Sharing Economy",
          challenge: "Creating a business plan for a new market category",
          solution: "Developed a comprehensive plan focusing on market creation and community building",
          results: "Successfully raised funding and built a global platform",
          keyLearnings: [
            "New markets require education and trust building",
            "Community is as important as the product",
            "Scalability should be built into the business model"
          ],
          year: 2008
        }
      ],
      resources: [
        {
          id: "business-plan-template",
          title: "Business Plan Template",
          type: "template",
          url: "/startup/business-planning",
          description: "Comprehensive business plan template"
        }
      ],
      tags: ["business-planning", "financial-projections", "go-to-market", "value-proposition"],
      featured: true
    }
  }

  private createFundingGuide(): StartupGuide {
    return {
      id: "funding-strategies-complete-guide",
      title: "Complete Funding Strategies Guide for Startups",
      category: "funding",
      difficulty: "intermediate",
      readTime: "50 min",
      author: "GrowthLab Finance Team",
      lastUpdated: "2025-01-15",
      description: "Navigate the complex world of startup funding with our comprehensive guide covering all funding stages, investor types, and fundraising strategies.",
      keyTakeaways: [
        "Understand different funding stages and requirements",
        "Learn effective fundraising strategies",
        "Master investor pitch preparation",
        "Navigate equity and valuation discussions",
        "Build relationships with investors"
      ],
      sections: [
        {
          id: "funding-stages",
          title: "Understanding Funding Stages",
          content: "Startup funding follows a predictable progression from bootstrapping to IPO. Understanding each stage helps you prepare effectively.",
          subsections: [
            {
              id: "pre-seed-funding",
              title: "Pre-seed and Seed Funding",
              content: "Early-stage funding focuses on validating your idea and building initial traction. Investors look for strong founding teams and market opportunities.",
              tips: [
                "Focus on building a strong founding team",
                "Demonstrate market validation",
                "Show early traction and customer interest"
              ]
            }
          ],
          tips: [
            "Start fundraising before you need the money",
            "Build relationships with investors early",
            "Focus on the right metrics for your stage"
          ],
          warnings: [
            "Don't raise more money than you need",
            "Avoid giving up too much equity early",
            "Don't ignore investor alignment with your vision"
          ],
          examples: [
            {
              title: "Stripe's Funding Journey",
              description: "Stripe raised funding strategically, focusing on product development and market expansion at each stage.",
              outcome: "Built a $95B company through strategic funding rounds.",
              lessons: [
                "Focus on product and market fit before scaling",
                "Choose investors who add strategic value",
                "Maintain control while growing rapidly"
              ]
            }
          ]
        }
      ],
      caseStudies: [
        {
          id: "uber-funding",
          company: "Uber",
          industry: "Transportation",
          challenge: "Raising massive funding for global expansion",
          solution: "Strategic fundraising focusing on market opportunity and growth potential",
          results: "Raised over $25B across multiple funding rounds",
          keyLearnings: [
            "Market size matters for large funding rounds",
            "Growth metrics are crucial for later-stage funding",
            "Global expansion requires significant capital"
          ],
          year: 2009
        }
      ],
      resources: [
        {
          id: "pitch-deck-template",
          title: "Pitch Deck Template",
          type: "template",
          url: "/startup/funding",
          description: "Professional pitch deck template"
        }
      ],
      tags: ["funding", "investors", "pitch-deck", "valuation", "equity"],
      featured: true
    }
  }

  private createMarketingGuide(): StartupGuide {
    return {
      id: "marketing-strategies-complete-guide",
      title: "Complete Marketing Strategies Guide for Startups",
      category: "marketing",
      difficulty: "intermediate",
      readTime: "55 min",
      author: "GrowthLab Marketing Team",
      lastUpdated: "2025-01-15",
      description: "Master startup marketing with our comprehensive guide covering digital marketing, growth hacking, brand building, and customer acquisition strategies.",
      keyTakeaways: [
        "Develop effective digital marketing strategies",
        "Master growth hacking techniques",
        "Build strong brand identity",
        "Optimize customer acquisition costs",
        "Create viral marketing campaigns"
      ],
      sections: [
        {
          id: "digital-marketing",
          title: "Digital Marketing Fundamentals",
          content: "Digital marketing is essential for startup success. This section covers the fundamentals of online marketing and how to build effective campaigns.",
          subsections: [
            {
              id: "content-marketing",
              title: "Content Marketing Strategy",
              content: "Content marketing helps you build authority and attract customers organically. Focus on creating valuable, relevant content that addresses customer pain points.",
              tips: [
                "Create content that solves customer problems",
                "Focus on quality over quantity",
                "Use SEO to increase visibility"
              ]
            }
          ],
          tips: [
            "Focus on customer acquisition cost (CAC)",
            "Test different channels and strategies",
            "Measure and optimize continuously"
          ],
          warnings: [
            "Don't spread resources too thin across channels",
            "Avoid vanity metrics - focus on conversions",
            "Don't ignore customer retention"
          ],
          examples: [
            {
              title: "Slack's Marketing Strategy",
              description: "Slack used content marketing and word-of-mouth to build a strong brand and acquire customers.",
              outcome: "Built a $27B company through effective marketing.",
              lessons: [
                "Product-led growth can be powerful",
                "Word-of-mouth is the best marketing",
                "Focus on user experience and satisfaction"
              ]
            }
          ]
        }
      ],
      caseStudies: [
        {
          id: "dropbox-marketing",
          company: "Dropbox",
          industry: "Cloud Storage",
          challenge: "Acquiring customers in a competitive market",
          solution: "Used referral marketing and freemium model to drive growth",
          results: "Achieved viral growth and built a $10B+ company",
          keyLearnings: [
            "Referral programs can drive viral growth",
            "Freemium models can reduce customer acquisition costs",
            "Product quality drives word-of-mouth marketing"
          ],
          year: 2007
        }
      ],
      resources: [
        {
          id: "marketing-plan-template",
          title: "Marketing Plan Template",
          type: "template",
          url: "/startup/marketing",
          description: "Comprehensive marketing plan template"
        }
      ],
      tags: ["marketing", "digital-marketing", "growth-hacking", "brand-building", "customer-acquisition"],
      featured: true
    }
  }

  private createScalingGuide(): StartupGuide {
    return {
      id: "scaling-operations-complete-guide",
      title: "Complete Scaling Operations Guide for Startups",
      category: "scaling",
      difficulty: "advanced",
      readTime: "65 min",
      author: "GrowthLab Operations Team",
      lastUpdated: "2025-01-15",
      description: "Learn how to scale your startup operations effectively while maintaining quality, culture, and profitability.",
      keyTakeaways: [
        "Develop scalable operational processes",
        "Build high-performing teams",
        "Maintain culture during rapid growth",
        "Optimize for efficiency and quality",
        "Prepare for international expansion"
      ],
      sections: [
        {
          id: "operational-scaling",
          title: "Operational Scaling Strategies",
          content: "Scaling operations requires careful planning and execution. This section covers strategies for scaling your business while maintaining quality and efficiency.",
          subsections: [
            {
              id: "process-automation",
              title: "Process Automation",
              content: "Automate repetitive tasks to improve efficiency and reduce errors. Focus on high-impact processes that can be standardized and automated.",
              tips: [
                "Start with high-volume, repetitive tasks",
                "Use technology to improve efficiency",
                "Maintain quality while automating"
              ]
            }
          ],
          tips: [
            "Scale processes before scaling people",
            "Maintain quality standards during growth",
            "Invest in technology and automation"
          ],
          warnings: [
            "Don't scale too fast without proper processes",
            "Avoid losing company culture during growth",
            "Don't ignore operational efficiency"
          ],
          examples: [
            {
              title: "Amazon's Scaling Strategy",
              description: "Amazon scaled operations through technology, automation, and process optimization.",
              outcome: "Built a $1.7T company through effective scaling.",
              lessons: [
                "Technology can drive operational efficiency",
                "Customer focus should remain central",
                "Innovation should continue during scaling"
              ]
            }
          ]
        }
      ],
      caseStudies: [
        {
          id: "netflix-scaling",
          company: "Netflix",
          industry: "Entertainment",
          challenge: "Scaling from DVD rentals to global streaming",
          solution: "Built scalable technology infrastructure and content delivery systems",
          results: "Successfully scaled to 200M+ subscribers globally",
          keyLearnings: [
            "Technology infrastructure is crucial for scaling",
            "Content and technology must scale together",
            "Global expansion requires local adaptation"
          ],
          year: 1997
        }
      ],
      resources: [
        {
          id: "scaling-checklist",
          title: "Scaling Checklist",
          type: "checklist",
          url: "/startup/scaling",
          description: "Comprehensive scaling preparation checklist"
        }
      ],
      tags: ["scaling", "operations", "team-building", "process-automation", "culture"],
      featured: true
    }
  }

  private createLegalGuide(): StartupGuide {
    return {
      id: "legal-essentials-complete-guide",
      title: "Complete Legal Essentials Guide for Startups",
      category: "legal",
      difficulty: "intermediate",
      readTime: "40 min",
      author: "GrowthLab Legal Team",
      lastUpdated: "2025-01-15",
      description: "Navigate the legal complexities of starting and running a business with our comprehensive legal guide.",
      keyTakeaways: [
        "Understand essential legal requirements",
        "Protect your intellectual property",
        "Navigate employment and contract law",
        "Ensure compliance and risk management",
        "Build strong legal foundations"
      ],
      sections: [
        {
          id: "legal-foundations",
          title: "Legal Foundations",
          content: "Building strong legal foundations is crucial for startup success. This section covers essential legal requirements and best practices.",
          subsections: [
            {
              id: "business-formation",
              title: "Business Formation",
              content: "Choose the right business structure for your startup. Consider factors like liability protection, tax implications, and fundraising requirements.",
              tips: [
                "Consult with legal professionals early",
                "Consider future fundraising needs",
                "Protect personal assets from business liabilities"
              ]
            }
          ],
          tips: [
            "Invest in legal counsel early",
            "Document all agreements and contracts",
            "Stay compliant with regulations"
          ],
          warnings: [
            "Don't ignore legal requirements",
            "Avoid DIY legal work for complex matters",
            "Don't delay IP protection"
          ],
          examples: [
            {
              title: "Google's Legal Strategy",
              description: "Google built strong legal foundations and protected its IP effectively.",
              outcome: "Successfully defended against numerous legal challenges.",
              lessons: [
                "Strong legal foundations support growth",
                "IP protection is crucial for technology companies",
                "Compliance supports long-term success"
              ]
            }
          ]
        }
      ],
      caseStudies: [
        {
          id: "facebook-legal",
          company: "Facebook",
          industry: "Social Media",
          challenge: "Navigating complex legal and regulatory environments",
          solution: "Built strong legal team and compliance processes",
          results: "Successfully navigated numerous legal challenges",
          keyLearnings: [
            "Legal compliance is crucial for global companies",
            "Strong legal teams support growth",
            "Regulatory challenges require proactive management"
          ],
          year: 2004
        }
      ],
      resources: [
        {
          id: "legal-document-generator",
          title: "Legal Document Generator",
          type: "tool",
          url: "/startup/legal-documents",
          description: "Generate essential legal documents"
        }
      ],
      tags: ["legal", "compliance", "intellectual-property", "contracts", "employment-law"],
      featured: false
    }
  }

  private createOperationsGuide(): StartupGuide {
    return {
      id: "operations-management-complete-guide",
      title: "Complete Operations Management Guide for Startups",
      category: "operations",
      difficulty: "intermediate",
      readTime: "50 min",
      author: "GrowthLab Operations Team",
      lastUpdated: "2025-01-15",
      description: "Master startup operations with our comprehensive guide covering process optimization, quality management, and operational efficiency.",
      keyTakeaways: [
        "Develop efficient operational processes",
        "Implement quality management systems",
        "Optimize resource allocation",
        "Build scalable operations",
        "Measure and improve performance"
      ],
      sections: [
        {
          id: "operational-efficiency",
          title: "Operational Efficiency",
          content: "Operational efficiency is crucial for startup success. This section covers strategies for optimizing processes and improving performance.",
          subsections: [
            {
              id: "process-optimization",
              title: "Process Optimization",
              content: "Optimize your business processes to improve efficiency and reduce costs. Focus on high-impact processes that affect customer experience.",
              tips: [
                "Map out all key processes",
                "Identify bottlenecks and inefficiencies",
                "Implement continuous improvement"
              ]
            }
          ],
          tips: [
            "Focus on customer-facing processes first",
            "Measure and track key metrics",
            "Continuously improve processes"
          ],
          warnings: [
            "Don't optimize processes that don't matter",
            "Avoid over-engineering simple processes",
            "Don't ignore customer feedback"
          ],
          examples: [
            {
              title: "Toyota's Operations",
              description: "Toyota's lean manufacturing principles revolutionized operations management.",
              outcome: "Built one of the most efficient manufacturing operations globally.",
              lessons: [
                "Continuous improvement drives efficiency",
                "Employee involvement improves processes",
                "Quality and efficiency go hand in hand"
              ]
            }
          ]
        }
      ],
      caseStudies: [
        {
          id: "zara-operations",
          company: "Zara",
          industry: "Retail",
          challenge: "Building fast and efficient supply chain operations",
          solution: "Implemented vertical integration and fast fashion model",
          results: "Achieved industry-leading operational efficiency",
          keyLearnings: [
            "Vertical integration can improve efficiency",
            "Speed to market is a competitive advantage",
            "Operational excellence supports growth"
          ],
          year: 1975
        }
      ],
      resources: [
        {
          id: "process-mapping-tool",
          title: "Process Mapping Tool",
          type: "tool",
          url: "/startup/operations",
          description: "Map and optimize business processes"
        }
      ],
      tags: ["operations", "process-optimization", "quality-management", "efficiency", "performance"],
      featured: false
    }
  }

  private createTeamBuildingGuide(): StartupGuide {
    return {
      id: "team-building-complete-guide",
      title: "Complete Team Building Guide for Startups",
      category: "team-building",
      difficulty: "intermediate",
      readTime: "45 min",
      author: "GrowthLab HR Team",
      lastUpdated: "2025-01-15",
      description: "Build high-performing teams with our comprehensive guide covering hiring, culture building, leadership, and team management.",
      keyTakeaways: [
        "Develop effective hiring strategies",
        "Build strong company culture",
        "Master leadership and management",
        "Retain top talent",
        "Scale teams effectively"
      ],
      sections: [
        {
          id: "hiring-strategies",
          title: "Hiring Strategies",
          content: "Building the right team is crucial for startup success. This section covers effective hiring strategies and best practices.",
          subsections: [
            {
              id: "recruitment-process",
              title: "Recruitment Process",
              content: "Develop a structured recruitment process that attracts top talent. Focus on cultural fit, skills, and potential for growth.",
              tips: [
                "Define clear job requirements",
                "Use multiple assessment methods",
                "Focus on cultural fit and values"
              ]
            }
          ],
          tips: [
            "Hire for cultural fit and potential",
            "Invest in employee development",
            "Build strong employer brand"
          ],
          warnings: [
            "Don't hire too fast without proper processes",
            "Avoid hiring for skills over culture fit",
            "Don't ignore employee retention"
          ],
          examples: [
            {
              title: "Netflix's Culture",
              description: "Netflix built a strong culture focused on freedom and responsibility.",
              outcome: "Attracted and retained top talent globally.",
              lessons: [
                "Strong culture attracts top talent",
                "Freedom and responsibility work together",
                "Culture should support business goals"
              ]
            }
          ]
        }
      ],
      caseStudies: [
        {
          id: "google-team-building",
          company: "Google",
          industry: "Technology",
          challenge: "Building and scaling high-performing teams",
          solution: "Developed strong hiring processes and company culture",
          results: "Built one of the most desirable workplaces globally",
          keyLearnings: [
            "Strong culture attracts top talent",
            "Employee development drives retention",
            "Innovation requires diverse teams"
          ],
          year: 1998
        }
      ],
      resources: [
        {
          id: "hiring-template",
          title: "Hiring Process Template",
          type: "template",
          url: "/startup/team-building",
          description: "Structured hiring process template"
        }
      ],
      tags: ["team-building", "hiring", "culture", "leadership", "retention"],
      featured: false
    }
  }
} 