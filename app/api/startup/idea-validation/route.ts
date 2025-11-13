/**
 * API route for idea validation toolkit
 */

import { type NextRequest, NextResponse } from "next/server"

// Interface for market research data
interface MarketResearch {
  id: string
  startupId: string
  title: string
  description: string
  methodology: string
  findings: {
    key: string
    value: string
  }[]
  conclusion: string
  createdAt: string
  updatedAt: string
  tags: string[]
}

// Interface for target customer data
interface TargetCustomer {
  id: string
  startupId: string
  name: string
  demographics: {
    ageRange?: string
    gender?: string
    income?: string
    education?: string
    location?: string
    occupation?: string
    industry?: string
    companySize?: string
    jobTitle?: string
    decisionMaker?: boolean
  }
  psychographics: {
    challenges: string[]
    goals: string[]
    values: string[]
    interests: string[]
    behaviors: string[]
  }
  buyingCriteria: string[]
  customerJourney: {
    stage: string
    touchpoints: string[]
    actions: string[]
  }[]
  createdAt: string
  updatedAt: string
}

// Interface for MVP data
interface MVP {
  id: string
  startupId: string
  name: string
  description: string
  status: "planning" | "development" | "testing" | "launched"
  keyFeatures: string[]
  coreProblem: string
  proposedSolution: string
  successMetrics: {
    metric: string
    target: string
    current?: string
  }[]
  developmentTimeline: {
    milestone: string
    targetDate: string
    completedDate?: string
    status: "pending" | "in-progress" | "completed" | "delayed"
  }[]
  budget: {
    estimated: number
    actual?: number
    currency: string
  }
  resources: {
    url: string
    type: string
    description: string
  }[]
  createdAt: string
  updatedAt: string
}

// Interface for user feedback data
interface UserFeedback {
  id: string
  startupId: string
  mvpId?: string
  source: "interview" | "survey" | "testing" | "email" | "other"
  user: {
    id?: string
    name?: string
    demographics?: Record<string, string>
  }
  feedback: string
  rating?: number
  category?: string
  sentiment: "positive" | "neutral" | "negative"
  createdAt: string
  actionTaken?: string
  tags: string[]
}

/**
 * Get idea validation data
 */
export async function GET(req: NextRequest) {
  try {
    // Get query parameters
    const searchParams = req.nextUrl.searchParams
    const startupId = searchParams.get("startupId")
    const type = searchParams.get("type") // 'market-research', 'target-customers', 'mvp', 'user-feedback'

    if (!startupId) {
      return NextResponse.json({ error: "Missing startupId parameter" }, { status: 400 })
    }

    // Determine what data to return based on type
    switch (type) {
      case "market-research":
        return NextResponse.json(getMockMarketResearch(startupId))
      case "target-customers":
        return NextResponse.json(getMockTargetCustomers(startupId))
      case "mvp":
        return NextResponse.json(getMockMVP(startupId))
      case "user-feedback":
        return NextResponse.json(getMockUserFeedback(startupId))
      default:
        // Return all data types
        return NextResponse.json({
          marketResearch: getMockMarketResearch(startupId).marketResearch,
          targetCustomers: getMockTargetCustomers(startupId).targetCustomers,
          mvp: getMockMVP(startupId).mvp,
          userFeedback: getMockUserFeedback(startupId).userFeedback,
        })
    }
  } catch (error) {
    console.error("Idea validation fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch idea validation data" }, { status: 500 })
  }
}

/**
 * Create new idea validation data
 */
export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const data = await req.json()

    // Validate data has startupId and type
    if (!data.startupId || !data.type) {
      return NextResponse.json({ error: "Missing required fields (startupId, type)" }, { status: 400 })
    }

    // Process based on type
    switch (data.type) {
      case "market-research":
        // Validate market research data
        if (!data.title || !data.methodology || !data.findings) {
          return NextResponse.json({ error: "Invalid market research data" }, { status: 400 })
        }

        // In a real implementation, this would save to a database
        return NextResponse.json({
          success: true,
          id: `mr-${Date.now()}`,
          createdAt: new Date().toISOString(),
          marketResearch: {
            id: `mr-${Date.now()}`,
            startupId: data.startupId,
            title: data.title,
            description: data.description || "",
            methodology: data.methodology,
            findings: data.findings,
            conclusion: data.conclusion || "",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            tags: data.tags || [],
          },
        })

      case "target-customer":
        // Validate target customer data
        if (!data.name || !data.demographics || !data.psychographics) {
          return NextResponse.json({ error: "Invalid target customer data" }, { status: 400 })
        }

        // In a real implementation, this would save to a database
        return NextResponse.json({
          success: true,
          id: `tc-${Date.now()}`,
          createdAt: new Date().toISOString(),
          targetCustomer: {
            id: `tc-${Date.now()}`,
            startupId: data.startupId,
            name: data.name,
            demographics: data.demographics,
            psychographics: data.psychographics,
            buyingCriteria: data.buyingCriteria || [],
            customerJourney: data.customerJourney || [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        })

      case "mvp":
        // Validate MVP data
        if (!data.name || !data.description || !data.keyFeatures) {
          return NextResponse.json({ error: "Invalid MVP data" }, { status: 400 })
        }

        // In a real implementation, this would save to a database
        return NextResponse.json({
          success: true,
          id: `mvp-${Date.now()}`,
          createdAt: new Date().toISOString(),
          mvp: {
            id: `mvp-${Date.now()}`,
            startupId: data.startupId,
            name: data.name,
            description: data.description,
            status: data.status || "planning",
            keyFeatures: data.keyFeatures,
            coreProblem: data.coreProblem || "",
            proposedSolution: data.proposedSolution || "",
            successMetrics: data.successMetrics || [],
            developmentTimeline: data.developmentTimeline || [],
            budget: data.budget || { estimated: 0, currency: "SGD" },
            resources: data.resources || [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        })

      case "user-feedback":
        // Validate user feedback data
        if (!data.feedback || !data.source) {
          return NextResponse.json({ error: "Invalid user feedback data" }, { status: 400 })
        }

        // In a real implementation, this would save to a database
        return NextResponse.json({
          success: true,
          id: `uf-${Date.now()}`,
          createdAt: new Date().toISOString(),
          userFeedback: {
            id: `uf-${Date.now()}`,
            startupId: data.startupId,
            mvpId: data.mvpId,
            source: data.source,
            user: data.user || {},
            feedback: data.feedback,
            rating: data.rating,
            category: data.category,
            sentiment: data.sentiment || "neutral",
            createdAt: new Date().toISOString(),
            actionTaken: data.actionTaken,
            tags: data.tags || [],
          },
        })

      default:
        return NextResponse.json(
          { error: "Invalid type. Must be one of: market-research, target-customer, mvp, user-feedback" },
          { status: 400 },
        )
    }
  } catch (error) {
    console.error("Idea validation create error:", error)
    return NextResponse.json({ error: "Failed to create idea validation item" }, { status: 500 })
  }
}

/**
 * Update existing idea validation data
 */
export async function PUT(req: NextRequest) {
  try {
    // Parse request body
    const data = await req.json()

    // Validate data has id and type
    if (!data.id || !data.type) {
      return NextResponse.json({ error: "Missing required fields (id, type)" }, { status: 400 })
    }

    // In a real implementation, this would update the database entry
    // For now, we're just returning success with the updated data

    return NextResponse.json({
      success: true,
      id: data.id,
      updatedAt: new Date().toISOString(),
      [data.type === "target-customer"
        ? "targetCustomer"
        : data.type === "market-research"
          ? "marketResearch"
          : data.type === "user-feedback"
            ? "userFeedback"
            : "mvp"]: {
        ...data,
        updatedAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error("Idea validation update error:", error)
    return NextResponse.json({ error: "Failed to update idea validation item" }, { status: 500 })
  }
}

/**
 * Delete idea validation data
 */
export async function DELETE(req: NextRequest) {
  try {
    // Get query parameters
    const searchParams = req.nextUrl.searchParams
    const id = searchParams.get("id")
    const type = searchParams.get("type")

    if (!id || !type) {
      return NextResponse.json({ error: "Missing required parameters (id, type)" }, { status: 400 })
    }

    // In a real implementation, this would delete from the database
    // For now, we're just returning success

    return NextResponse.json({
      success: true,
      id,
      type,
      deletedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Idea validation delete error:", error)
    return NextResponse.json({ error: "Failed to delete idea validation item" }, { status: 500 })
  }
}

/**
 * Generate mock market research data
 */
function getMockMarketResearch(startupId: string) {
  const marketResearch: MarketResearch[] = [
    {
      id: "1",
      startupId,
      title: "SaaS Market Trends 2023",
      description: "Analysis of current trends in the SaaS market with focus on SMB segment",
      methodology: "Secondary research using industry reports, competitor analysis, and market sizing calculations",
      findings: [
        {
          key: "Market Size",
          value: "The global SaaS market is projected to reach $220.21 billion by 2022, growing at a CAGR of 13.1%.",
        },
        {
          key: "Key Segments",
          value:
            "Customer Relationship Management (CRM), Enterprise Resource Planning (ERP), and Human Resource Management (HRM) are the largest segments.",
        },
        {
          key: "SMB Adoption",
          value: "73% of SMBs have already invested in SaaS solutions and plan to increase their spending.",
        },
        {
          key: "Pricing Trends",
          value:
            "Shift towards value-based pricing models with flexible tiers to accommodate different business sizes.",
        },
      ],
      conclusion:
        "The SaaS market shows strong growth potential, particularly in the SMB segment. Key opportunities include specialized solutions for underserved industries and integration capabilities with existing systems.",
      createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
      tags: ["SaaS", "Market Trends", "SMB", "Growth Opportunity"],
    },
    {
      id: "2",
      startupId,
      title: "Competitor Analysis: Project Management Tools",
      description: "Detailed analysis of existing project management solutions in the market",
      methodology:
        "Feature comparison, pricing analysis, user reviews analysis, and SWOT analysis of top 10 competitors",
      findings: [
        {
          key: "Feature Gaps",
          value: "Most solutions lack specialized features for creative teams and agencies.",
        },
        {
          key: "Pricing Analysis",
          value:
            "Average pricing ranges from $8-25 per user per month, with enterprise solutions starting at $25k annually.",
        },
        {
          key: "User Pain Points",
          value: "Complex setup, poor mobile experience, and limited customization are the most common complaints.",
        },
        {
          key: "Market Leaders",
          value: "Asana, Monday.com, and ClickUp dominate with 65% market share combined.",
        },
      ],
      conclusion:
        "There is an opportunity to differentiate by focusing on creative teams with specialized workflows, better mobile experience, and simple onboarding while maintaining robust functionality.",
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
      tags: ["Competitor Analysis", "Project Management", "Market Gap", "Differentiation"],
    },
  ]

  return { marketResearch }
}

/**
 * Generate mock target customer data
 */
function getMockTargetCustomers(startupId: string) {
  const targetCustomers: TargetCustomer[] = [
    {
      id: "1",
      startupId,
      name: "Creative Agency Project Manager",
      demographics: {
        ageRange: "30-45",
        gender: "Any",
        education: "Bachelor's degree or higher",
        location: "Urban centers",
        occupation: "Project Manager",
        industry: "Creative Services",
        companySize: "10-50 employees",
        jobTitle: "Project Manager / Creative Director",
        decisionMaker: true,
      },
      psychographics: {
        challenges: [
          "Managing multiple client projects simultaneously",
          "Coordinating diverse creative teams",
          "Meeting tight deadlines",
          "Tracking billable hours accurately",
          "Maintaining client communication",
        ],
        goals: [
          "Streamline project workflows",
          "Reduce administrative overhead",
          "Improve team collaboration",
          "Increase project profitability",
          "Deliver consistent quality",
        ],
        values: ["Efficiency", "Creativity", "Quality", "Collaboration", "Client satisfaction"],
        interests: ["Design", "Creative tools", "Project methodologies", "Team management", "Industry trends"],
        behaviors: [
          "Early technology adopter",
          "Relies heavily on digital tools",
          "Frequently attends industry events",
          "Active on professional networks",
          "Seeks recommendations from peers",
        ],
      },
      buyingCriteria: [
        "Ease of use for creative teams",
        "Visual project mapping and planning",
        "Client approval workflows",
        "Integration with design tools",
        "Customizable templates for creative projects",
        "Time tracking and budget monitoring",
        "Value for money",
      ],
      customerJourney: [
        {
          stage: "Awareness",
          touchpoints: ["Industry publications", "Social media", "Professional networks", "Conferences"],
          actions: [
            "Searches for solutions to project management challenges",
            "Reads articles about improving agency efficiency",
            "Discusses tools with peers",
          ],
        },
        {
          stage: "Consideration",
          touchpoints: ["Product review sites", "Comparison articles", "Webinars", "Free trials"],
          actions: ["Compares different solutions", "Watches demo videos", "Reads user reviews", "Tests free versions"],
        },
        {
          stage: "Decision",
          touchpoints: ["Sales demos", "Pricing pages", "Case studies", "ROI calculators"],
          actions: [
            "Involves team in evaluation",
            "Calculates potential ROI",
            "Negotiates pricing",
            "Makes final decision",
          ],
        },
      ],
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "2",
      startupId,
      name: "Independent Freelance Designer",
      demographics: {
        ageRange: "25-40",
        gender: "Any",
        education: "Design degree or certification",
        location: "Global, remote work",
        occupation: "Freelance Designer",
        industry: "Design Services",
        companySize: "1",
        jobTitle: "Owner / Designer",
        decisionMaker: true,
      },
      psychographics: {
        challenges: [
          "Managing multiple clients without support staff",
          "Balancing creative work with business administration",
          "Maintaining consistent income",
          "Setting appropriate pricing",
          "Working alone without team collaboration",
        ],
        goals: [
          "Maximize billable hours",
          "Simplify client management",
          "Automate administrative tasks",
          "Build professional reputation",
          "Maintain work-life balance",
        ],
        values: ["Independence", "Creativity", "Professional growth", "Client relationships", "Work flexibility"],
        interests: [
          "Design trends",
          "Productivity tools",
          "Freelance business management",
          "Continuous learning",
          "Personal branding",
        ],
        behaviors: [
          "Price-sensitive but willing to invest in essential tools",
          "Self-taught on new technologies",
          "Active in online design communities",
          "Works non-traditional hours",
          "Seeks all-in-one solutions",
        ],
      },
      buyingCriteria: [
        "Affordable monthly subscription",
        "No team member minimums",
        "Client communication features",
        "Invoicing and payment tracking",
        "Portfolio showcase capabilities",
        "Low learning curve",
        "Mobile access",
      ],
      customerJourney: [
        {
          stage: "Awareness",
          touchpoints: ["Design blogs", "YouTube tutorials", "Freelancer communities", "Social media"],
          actions: [
            "Searches for freelancer productivity tips",
            "Follows influencers who review tools",
            "Joins freelancer forums",
          ],
        },
        {
          stage: "Consideration",
          touchpoints: ["Free trials", "Tutorial videos", "Pricing comparison", "User reviews"],
          actions: [
            "Tests free versions with actual client work",
            "Calculates cost against potential time savings",
            "Reads reviews from other freelancers",
          ],
        },
        {
          stage: "Decision",
          touchpoints: ["Pricing page", "Feature list", "Customer support", "Cancellation policy"],
          actions: [
            "Evaluates monthly cost impact on business",
            "Checks for long-term commitments",
            "Tests customer support responsiveness",
            "Makes purchase decision",
          ],
        },
      ],
      createdAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ]

  return { targetCustomers }
}

/**
 * Generate mock MVP data
 */
function getMockMVP(startupId: string) {
  const mvp: MVP = {
    id: "1",
    startupId,
    name: "CreativeFlow - Project Management for Creative Teams",
    description:
      "A streamlined project management solution specifically designed for creative agencies and freelancers, focusing on visual workflows, client approvals, and integration with design tools.",
    status: "development",
    keyFeatures: [
      "Visual kanban board with custom statuses",
      "Client review and approval portal",
      "Time tracking with billable hours calculation",
      "Integration with Adobe Creative Suite",
      "Project templates for common creative workflows",
      "Mobile app for on-the-go updates",
      "Automated status reports for clients",
    ],
    coreProblem:
      "Creative teams struggle with generic project management tools that don't account for their unique workflows, client approval processes, and integration needs with design tools.",
    proposedSolution:
      "A project management platform built specifically for creative work that simplifies client collaboration, integrates with design tools, and provides visual workflow management tailored to creative processes.",
    successMetrics: [
      {
        metric: "User Signups",
        target: "100 within first month",
        current: "0",
      },
      {
        metric: "Active Projects",
        target: "250 within first quarter",
        current: "0",
      },
      {
        metric: "User Retention",
        target: "80% after 3 months",
        current: "0",
      },
      {
        metric: "NPS Score",
        target: "40+ after first quarter",
        current: "0",
      },
    ],
    developmentTimeline: [
      {
        milestone: "Core platform architecture",
        targetDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        completedDate: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
        status: "completed",
      },
      {
        milestone: "Visual kanban board development",
        targetDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        completedDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        status: "completed",
      },
      {
        milestone: "Client portal and approval system",
        targetDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        status: "in-progress",
      },
      {
        milestone: "Adobe Creative Suite integration",
        targetDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
        status: "pending",
      },
      {
        milestone: "Beta testing with selected agencies",
        targetDate: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000).toISOString(),
        status: "pending",
      },
      {
        milestone: "Public launch",
        targetDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
        status: "pending",
      },
    ],
    budget: {
      estimated: 75000,
      actual: 35000,
      currency: "SGD",
    },
    resources: [
      {
        url: "https://github.com/yourcompany/creativeflow-prototype",
        type: "code",
        description: "Prototype repository",
      },
      {
        url: "https://www.figma.com/file/prototype-designs",
        type: "design",
        description: "UI/UX designs in Figma",
      },
      {
        url: "https://docs.google.com/spreadsheets/user-research",
        type: "research",
        description: "User research findings",
      },
    ],
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  }

  return { mvp }
}

/**
 * Generate mock user feedback data
 */
function getMockUserFeedback(startupId: string) {
  const userFeedback: UserFeedback[] = [
    {
      id: "1",
      startupId,
      mvpId: "1",
      source: "testing",
      user: {
        name: "Alex Johnson",
        demographics: {
          role: "Creative Director",
          company: "DesignLab Agency",
          experience: "8 years",
        },
      },
      feedback:
        "The visual kanban board is exactly what our team needs! Much more intuitive than text-based lists for our creative projects. Would love to see more customization options for the cards like color coding based on project type.",
      rating: 4,
      category: "UI/UX",
      sentiment: "positive",
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      actionTaken: "Added color coding feature to development backlog",
      tags: ["Visual Board", "Positive", "Feature Request"],
    },
    {
      id: "2",
      startupId,
      mvpId: "1",
      source: "interview",
      user: {
        name: "Sarah Miller",
        demographics: {
          role: "Freelance Designer",
          experience: "5 years",
        },
      },
      feedback:
        "I love the client approval portal, but it requires too many steps for clients to review work. Older clients might get confused. The process should be simplified to one click from the email notification.",
      rating: 3,
      category: "Client Portal",
      sentiment: "neutral",
      createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      actionTaken: "Redesigned client approval flow to simplify the process",
      tags: ["Client Portal", "Usability Issue", "Workflow"],
    },
    {
      id: "3",
      startupId,
      mvpId: "1",
      source: "survey",
      user: {
        demographics: {
          role: "Project Manager",
          company: "Creative Solutions Inc",
          experience: "10+ years",
        },
      },
      feedback:
        "The time tracking feature doesn't allow for easy editing of entries. When team members forget to stop their timers, it becomes a hassle to correct the time.",
      rating: 2,
      category: "Time Tracking",
      sentiment: "negative",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      actionTaken: "Prioritized time entry editing feature for next sprint",
      tags: ["Time Tracking", "Negative", "Usability Issue"],
    },
    {
      id: "4",
      startupId,
      mvpId: "1",
      source: "testing",
      user: {
        name: "Miguel Rodriguez",
        demographics: {
          role: "UI/UX Designer",
          company: "Freelance",
          experience: "3 years",
        },
      },
      feedback:
        "The Adobe integration is a game-changer! Being able to upload designs directly from Photoshop and Illustrator saves me so much time. Would love to see Figma integration as well.",
      rating: 5,
      category: "Integrations",
      sentiment: "positive",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      actionTaken: "Added Figma integration to product roadmap",
      tags: ["Integrations", "Positive", "Feature Request"],
    },
    {
      id: "5",
      startupId,
      mvpId: "1",
      source: "email",
      user: {
        name: "Lisa Chen",
        demographics: {
          role: "Agency Owner",
          company: "Bright Ideas Creative",
          experience: "12 years",
        },
      },
      feedback:
        "The mobile app is missing crucial functionality compared to the web version. As someone who's often meeting clients, I need to be able to do everything from my phone.",
      rating: 2,
      category: "Mobile App",
      sentiment: "negative",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      tags: ["Mobile App", "Negative", "Feature Gap"],
    },
  ]

  return { userFeedback }
}
