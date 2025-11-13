/**
 * API route for funding navigator data
 */

import { type NextRequest, NextResponse } from "next/server"

// Interface for funding source data
interface FundingSource {
  id: string
  name: string
  type: string
  description: string
  eligibilityCriteria: string[]
  applicationProcess: string[]
  benefits: string[]
  drawbacks: string[]
  typicalAmount: {
    min: number
    max: number
    currency: string
  }
  equity: boolean
  equityRange?: {
    min: number
    max: number
  }
  term?: number
  interestRate?: {
    min: number
    max: number
  }
  timeline: string
  successRate?: number
  resources: {
    title: string
    url: string
  }[]
}

/**
 * Get funding navigator data
 */
export async function GET(req: NextRequest) {
  try {
    // Get query parameters
    const searchParams = req.nextUrl.searchParams
    const type = searchParams.get("type")
    const equity = searchParams.get("equity")
    const minAmount = searchParams.get("minAmount")
    const maxAmount = searchParams.get("maxAmount")

    // In a real implementation, these parameters would be used to filter data from a database
    // For now, we're returning mock data

    // Mock funding sources data
    const fundingSources: FundingSource[] = [
      {
        id: "1",
        name: "Angel Investment",
        type: "equity",
        description: "Funding from individual investors, typically in early stages.",
        eligibilityCriteria: [
          "Early-stage startup with MVP or prototype",
          "Potential for high growth",
          "Clear path to revenue",
          "Strong founding team",
        ],
        applicationProcess: [
          "Prepare pitch deck and executive summary",
          "Connect with angel networks or individual angels",
          "Present at pitch events or one-on-one meetings",
          "Due diligence process",
          "Negotiate term sheet",
          "Close investment",
        ],
        benefits: [
          "Smaller funding amounts suitable for early stages",
          "Access to investor's network and expertise",
          "Typically faster decision-making than VCs",
          "More flexible terms than institutional investors",
          "Often brings valuable industry expertise",
          "Can lead to follow-on investments",
        ],
        drawbacks: [
          "Smaller investment amounts than VCs",
          "May require managing multiple investors",
          "Varying levels of involvement and expectations",
          "Less structured support compared to accelerators",
        ],
        typicalAmount: {
          min: 10000,
          max: 250000,
          currency: "SGD",
        },
        equity: true,
        equityRange: {
          min: 5,
          max: 25,
        },
        timeline: "1-3 months",
        successRate: 10,
        resources: [
          {
            title: "Angel Investment Network Singapore",
            url: "https://www.angelinvestmentnetwork.com.sg/",
          },
          {
            title: "Business Angel Network of Southeast Asia (BANSEA)",
            url: "https://www.bansea.org/",
          },
        ],
      },
      {
        id: "2",
        name: "Venture Capital",
        type: "equity",
        description: "Institutional funding for high-growth startups in exchange for equity.",
        eligibilityCriteria: [
          "High-growth potential in large market",
          "Validated business model with some traction",
          "Strong founding team with domain expertise",
          "Clear competitive advantage or IP",
          "Potential for significant return on investment",
        ],
        applicationProcess: [
          "Research and target VCs that invest in your sector and stage",
          "Secure warm introduction to partners",
          "Submit pitch deck and materials",
          "Initial partner meeting",
          "Partner presentation",
          "Term sheet negotiation",
          "Due diligence",
          "Legal documentation and closing",
        ],
        benefits: [
          "Larger funding amounts",
          "Strategic guidance and mentorship",
          "Access to extensive networks and resources",
          "Credibility in the market",
          "Potential for follow-on funding in later rounds",
        ],
        drawbacks: [
          "Dilution of ownership and control",
          "Lengthy and competitive process",
          "High expectations for growth and returns",
          "Pressure to scale quickly",
          "May dictate exit timeline",
        ],
        typicalAmount: {
          min: 500000,
          max: 5000000,
          currency: "SGD",
        },
        equity: true,
        equityRange: {
          min: 10,
          max: 30,
        },
        timeline: "3-6 months",
        successRate: 5,
        resources: [
          {
            title: "Vertex Ventures Southeast Asia",
            url: "https://www.vertexventures.sg/",
          },
          {
            title: "Sequoia Capital India & SEA",
            url: "https://www.sequoiacap.com/india-sea/",
          },
        ],
      },
      {
        id: "3",
        name: "Enterprise Singapore Startup SG Founder",
        type: "grant",
        description: "Government grant program providing capital and mentorship for first-time entrepreneurs.",
        eligibilityCriteria: [
          "Singapore-registered company less than 6 months old",
          "At least 3 founders, with at least 2 Singapore citizens or PRs",
          "All founders must have at least 30% equity in total",
          "Company must not have received any Startup SG Founder grant previously",
          "Business idea must be innovative with potential for scalability",
        ],
        applicationProcess: [
          "Apply through an Accredited Mentor Partner (AMP)",
          "Submit business proposal and pitch to AMP",
          "If approved by AMP, Enterprise Singapore reviews application",
          "Sign agreement upon approval",
          "Complete milestones to receive grant disbursements",
        ],
        benefits: [
          "Non-dilutive funding up to SGD 50,000",
          "Mentorship from industry experts",
          "No equity taken",
          "Government backing provides credibility",
          "Access to broader Enterprise Singapore support ecosystem",
        ],
        drawbacks: [
          "Competitive application process",
          "Requires 10% co-matching by startup",
          "Milestone-based disbursement",
          "Limited to first-time entrepreneurs",
          "Intensive reporting requirements",
        ],
        typicalAmount: {
          min: 30000,
          max: 50000,
          currency: "SGD",
        },
        equity: false,
        timeline: "2-4 months",
        successRate: 30,
        resources: [
          {
            title: "Enterprise Singapore - Startup SG Founder",
            url: "https://www.enterprisesg.gov.sg/financial-assistance/grants/for-startups/startup-sg-founder",
          },
          {
            title: "List of Accredited Mentor Partners",
            url: "https://www.startupsg.gov.sg/programmes/4894/startup-sg-founder/accredited-mentor-partners",
          },
        ],
      },
      {
        id: "4",
        name: "Convertible Note",
        type: "debt",
        description: "Short-term debt that converts to equity in a future financing round.",
        eligibilityCriteria: [
          "Early-stage startup with promising growth",
          "Planning to raise equity financing in the near future",
          "Clear path to valuation increase",
          "Some business traction or validation",
        ],
        applicationProcess: [
          "Identify investors interested in convertible notes",
          "Negotiate key terms (discount rate, valuation cap, interest rate)",
          "Legal documentation preparation",
          "Signing and closing",
        ],
        benefits: [
          "Delays valuation discussion to later round",
          "Typically faster to close than equity rounds",
          "Less complex documentation than priced rounds",
          "Interest accrues until conversion",
          "Possible discount on future round",
        ],
        drawbacks: [
          "Still results in dilution when converted",
          "May have maturity date requiring repayment if no conversion",
          "Can create complex cap table with multiple conversion prices",
          "Potential for disagreement on conversion terms",
        ],
        typicalAmount: {
          min: 50000,
          max: 500000,
          currency: "SGD",
        },
        equity: false,
        timeline: "1-2 months",
        interestRate: {
          min: 5,
          max: 8,
        },
        term: 18,
        successRate: 15,
        resources: [
          {
            title: "GrowthLab SAFE Notes",
                          url: "https://growthlab.sg/documents/",
          },
          {
            title: "Convertible Note Primer",
            url: "https://500.co/startup-docs",
          },
        ],
      },
      {
        id: "5",
        name: "Crowdfunding",
        type: "varied",
        description: "Raising capital from a large number of individuals, typically via online platforms.",
        eligibilityCriteria: [
          "Consumer-facing product or service with broad appeal",
          "Compelling story and pitch",
          "Strong social media and marketing capabilities",
          "Ability to create engaging campaign content",
          "Clear use of funds and delivery timeline",
        ],
        applicationProcess: [
          "Select appropriate crowdfunding platform",
          "Prepare campaign materials (video, graphics, text)",
          "Set funding goal and timeline",
          "Launch and market campaign",
          "Regular updates to backers",
          "Deliver on promises post-campaign",
        ],
        benefits: [
          "Access to capital without giving up equity (reward-based)",
          "Market validation and early adopters",
          "Marketing exposure and community building",
          "Feedback on product before full launch",
          "No repayment obligation for reward-based campaigns",
        ],
        drawbacks: [
          "All-or-nothing funding model on many platforms",
          "Public failure if campaign doesn't reach goal",
          "Platform fees (typically 5-10%)",
          "Time and resource intensive marketing required",
          "Fulfillment challenges for reward-based campaigns",
        ],
        typicalAmount: {
          min: 5000,
          max: 300000,
          currency: "SGD",
        },
        equity: false,
        timeline: "1-3 months",
        successRate: 35,
        resources: [
          {
            title: "Kickstarter",
            url: "https://www.kickstarter.com/",
          },
          {
            title: "Indiegogo",
            url: "https://www.indiegogo.com/",
          },
          {
            title: "FundedHere (Singapore equity crowdfunding)",
            url: "https://www.fundedhere.com/",
          },
        ],
      },
    ]

    // Filter funding sources based on query parameters
    let filteredSources = fundingSources

    if (type) {
      filteredSources = filteredSources.filter((source) => source.type.toLowerCase() === type.toLowerCase())
    }

    if (equity) {
      const isEquity = equity.toLowerCase() === "true"
      filteredSources = filteredSources.filter((source) => source.equity === isEquity)
    }

    if (minAmount) {
      const minAmountValue = Number.parseInt(minAmount)
      filteredSources = filteredSources.filter((source) => source.typicalAmount.max >= minAmountValue)
    }

    if (maxAmount) {
      const maxAmountValue = Number.parseInt(maxAmount)
      filteredSources = filteredSources.filter((source) => source.typicalAmount.min <= maxAmountValue)
    }

    // Return filtered funding sources
    return NextResponse.json({
      fundingSources: filteredSources,
      types: Array.from(new Set(fundingSources.map((source) => source.type))),
    })
  } catch (error) {
    console.error("Funding navigator fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch funding navigator data" }, { status: 500 })
  }
}

/**
 * Submit funding application or request
 */
export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const applicationData = await req.json()

    // Validate application data
    if (!applicationData.fundingSourceId || !applicationData.startupId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In a real implementation, this would save to a database and potentially
    // notify the funding provider or create a connection
    // For now, we're just returning success

    return NextResponse.json({
      success: true,
      applicationId: `app-${Date.now()}`,
      status: "pending",
      submittedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Funding application error:", error)
    return NextResponse.json({ error: "Failed to submit funding application" }, { status: 500 })
  }
}
