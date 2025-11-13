"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FundingCard } from "@/components/funding/funding-card"
import { InvestorCard } from "@/components/funding/investor-card"
import { FundingFilters, type FundingFilters as FilterType } from "@/components/funding/funding-filters"
import { SuccessStory } from "@/components/funding/success-story"
import { Search } from "lucide-react"
import type { FundingOpportunity, Investor } from "@/types/funding"
import { Footer } from "@/components/layout/footer"

// Sample data for the funding marketplace
const fundingOpportunities: FundingOpportunity[] = [
  {
    id: "fund-1",
    title: "GrowthLab Seed Fund",
    organization: "GrowthLab Ventures",
    logo: "/placeholder.svg?height=48&width=48",
    type: "vc",
    stage: ["pre-seed", "seed"],
    minAmount: 250000,
    maxAmount: 1000000,
    industries: ["fintech", "healthtech", "saas", "ai"],
    description:
      "GrowthLab Ventures is looking to invest in early-stage startups with strong founding teams and innovative solutions in our focus areas.",
    requirements: [
      "Strong founding team with technical expertise",
      "MVP with some traction",
      "Addressing a large market opportunity",
      "Based in Southeast Asia",
    ],
    applicationDeadline: "Rolling basis",
    location: "Singapore",
    contactEmail: "investments@growthlabventures.com",
    website: "https://growthlabventures.com",
    featured: true,
  },
  {
    id: "fund-2",
    title: "Enterprise Singapore Startup SG Founder Grant",
    organization: "Enterprise Singapore",
    logo: "/placeholder.svg?height=48&width=48",
    type: "grant",
    stage: ["pre-seed"],
    minAmount: 30000,
    maxAmount: 50000,
    industries: ["fintech", "healthtech", "edtech", "cleantech", "other"],
    description:
      "The Startup SG Founder grant provides mentorship and startup capital for first-time entrepreneurs with innovative business ideas.",
    requirements: [
      "First-time entrepreneurs",
      "Singapore citizens or permanent residents",
      "Innovative business concept",
      "Commitment to Singapore-based business",
    ],
    applicationDeadline: "2025-06-30",
    location: "Singapore",
    website: "https://www.startupsg.gov.sg",
  },
  {
    id: "fund-3",
    title: "DBS Innovation Fund",
    organization: "DBS Bank",
    logo: "/placeholder.svg?height=48&width=48",
    type: "corporate",
    stage: ["seed", "series-a"],
    minAmount: 500000,
    maxAmount: 2000000,
    industries: ["fintech", "blockchain", "ai"],
    description:
      "DBS Innovation Fund invests in startups that are developing innovative solutions in financial technology and digital banking.",
    requirements: [
      "Innovative fintech solution",
      "Product-market fit with some traction",
      "Potential for integration with DBS services",
      "Based in Asia",
    ],
    location: "Singapore, Hong Kong, India",
    website: "https://www.dbs.com/innovation",
  },
  {
    id: "fund-4",
    title: "500 Global Southeast Asia Fund",
    organization: "500 Global",
    logo: "/placeholder.svg?height=48&width=48",
    type: "vc",
    stage: ["seed", "series-a"],
    minAmount: 100000,
    maxAmount: 500000,
    industries: ["ecommerce", "saas", "fintech", "consumer", "enterprise"],
    description:
      "500 Global invests in fast-growing technology companies in Southeast Asia, with a focus on digital businesses with regional or global potential.",
    requirements: [
      "Strong growth metrics",
      "Scalable business model",
      "Southeast Asia focus",
      "Potential for regional/global expansion",
    ],
    location: "Singapore, Southeast Asia",
    website: "https://500.co",
  },
  {
    id: "fund-5",
    title: "SGInnovate Deep Tech Fund",
    organization: "SGInnovate",
    logo: "/placeholder.svg?height=48&width=48",
    type: "vc",
    stage: ["seed", "series-a"],
    minAmount: 500000,
    maxAmount: 3000000,
    industries: ["ai", "healthtech", "cleantech", "hardware"],
    description:
      "SGInnovate invests in deep tech startups working on frontier technologies that address global challenges.",
    requirements: [
      "Deep technology focus (AI, biotech, quantum, etc.)",
      "Strong scientific or technical foundation",
      "IP-driven innovation",
      "Singapore connection",
    ],
    location: "Singapore",
    website: "https://www.sginnovate.com",
    featured: true,
  },
  {
    id: "fund-6",
    title: "Temasek Bridge Funding",
    organization: "Temasek Holdings",
    logo: "/placeholder.svg?height=48&width=48",
    type: "vc",
    stage: ["series-a", "series-b", "series-c"],
    minAmount: 2000000,
    maxAmount: 10000000,
    industries: ["fintech", "healthtech", "cleantech", "enterprise", "consumer"],
    description:
      "Temasek's Bridge Funding program provides growth capital for promising startups with proven business models and strong growth potential.",
    requirements: [
      "Proven business model with significant traction",
      "Strong revenue growth",
      "Clear path to profitability",
      "Potential for regional/global leadership",
    ],
    location: "Singapore, Southeast Asia",
    website: "https://www.temasek.com.sg",
  },
]

const investors: Investor[] = [
  {
    id: "investor-1",
    name: "Sarah Chen",
    organization: "GrowthLab Ventures",
    title: "Managing Partner",
    avatar: "/placeholder.svg?height=64&width=64",
    bio: "Sarah is a seasoned investor with over 15 years of experience in venture capital and startup ecosystems across Asia. She focuses on early-stage investments in technology-enabled businesses.",
    investmentFocus: {
      stages: ["pre-seed", "seed", "series-a"],
      industries: ["fintech", "saas", "ai", "ecommerce"],
      ticketSize: {
        min: 250000,
        max: 1000000,
      },
    },
    portfolio: ["PayNow", "HealthTech AI", "EduLearn", "LogisticsX"],
    location: "Singapore",
    linkedin: "https://linkedin.com/in/sarahchen",
    twitter: "https://twitter.com/sarahchen",
  },
  {
    id: "investor-2",
    name: "Michael Tan",
    organization: "Horizon Capital",
    title: "Investment Director",
    avatar: "/placeholder.svg?height=64&width=64",
    bio: "Michael specializes in Series A and B investments in enterprise software and B2B startups. He previously founded and exited a SaaS company and brings operational expertise to his portfolio companies.",
    investmentFocus: {
      stages: ["series-a", "series-b"],
      industries: ["saas", "enterprise", "ai", "fintech"],
      ticketSize: {
        min: 1000000,
        max: 5000000,
      },
    },
    portfolio: ["EnterpriseOS", "CloudSecure", "DataInsights", "SalesAI"],
    location: "Singapore",
    linkedin: "https://linkedin.com/in/michaeltan",
  },
  {
    id: "investor-3",
    name: "Priya Sharma",
    organization: "Lotus Ventures",
    title: "Partner",
    avatar: "/placeholder.svg?height=64&width=64",
    bio: "Priya focuses on investments in healthtech, biotech, and sustainability. With a background in healthcare and an MBA from INSEAD, she brings domain expertise and a global network to her portfolio companies.",
    investmentFocus: {
      stages: ["seed", "series-a"],
      industries: ["healthtech", "cleantech", "ai"],
      ticketSize: {
        min: 500000,
        max: 3000000,
      },
    },
    portfolio: ["MedTech Solutions", "GreenEnergy", "BioInnovate", "HealthAI"],
    location: "Singapore, India",
    linkedin: "https://linkedin.com/in/priyasharma",
  },
  {
    id: "investor-4",
    name: "David Wong",
    organization: "Angel Investor",
    title: "Independent Angel Investor",
    avatar: "/placeholder.svg?height=64&width=64",
    bio: "David is a serial entrepreneur who has founded and exited three successful tech companies. He now invests in early-stage startups and provides hands-on mentorship to founders.",
    investmentFocus: {
      stages: ["pre-seed", "seed"],
      industries: ["fintech", "ecommerce", "consumer", "saas"],
      ticketSize: {
        min: 50000,
        max: 250000,
      },
    },
    portfolio: ["ShopNow", "FinanceApp", "TravelTech", "FoodDelivery"],
    location: "Singapore, Hong Kong",
    linkedin: "https://linkedin.com/in/davidwong",
    twitter: "https://twitter.com/davidwong",
  },
]

const successStories = [
  {
    id: "success-1",
    companyName: "FinEdge",
    logo: "/placeholder.svg?height=64&width=64",
    description:
      "Raised SGD 2M Series A after participating in GrowthLab's funding marketplace. Their payment platform now processes over $10M monthly across Southeast Asia.",
    fundingAmount: 2000000,
    fundingType: "Series A",
    investors: ["GrowthLab Ventures", "DBS Innovation Fund"],
    industry: "FinTech",
  },
  {
    id: "success-2",
    companyName: "MediConnect",
    logo: "/placeholder.svg?height=64&width=64",
    description:
      "Secured SGD 500K seed funding through connections made on the GrowthLab platform. Their healthcare scheduling platform now serves 50+ clinics across Southeast Asia.",
    fundingAmount: 500000,
    fundingType: "Seed",
    investors: ["SGInnovate", "Lotus Ventures"],
    industry: "HealthTech",
  },
  {
    id: "success-3",
    companyName: "GreenSupply",
    logo: "/placeholder.svg?height=64&width=64",
    description:
      "Received SGD 1.5M in funding after connecting with investors through GrowthLab. Their sustainable supply chain verification platform has partnered with major retailers.",
    fundingAmount: 1500000,
    fundingType: "Series A",
    investors: ["Temasek Holdings", "500 Global"],
    industry: "CleanTech",
  },
]

export default function FundingMarketplaceClient() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<FilterType>({
    types: [],
    stages: [],
    industries: [],
    fundingRange: [0, 10000000],
  })

  const handleFilterChange = (filters: FilterType) => {
    setActiveFilters(filters)
  }

  const filteredOpportunities = fundingOpportunities.filter((opportunity) => {
    // Search filter
    if (
      searchQuery &&
      !opportunity.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !opportunity.organization.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !opportunity.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Type filter
    if (activeFilters.types.length > 0 && !activeFilters.types.includes(opportunity.type)) {
      return false
    }

    // Stage filter
    if (activeFilters.stages.length > 0 && !opportunity.stage.some((stage) => activeFilters.stages.includes(stage))) {
      return false
    }

    // Industry filter
    if (
      activeFilters.industries.length > 0 &&
      !opportunity.industries.some((industry) => activeFilters.industries.includes(industry))
    ) {
      return false
    }

    // Funding range filter
    if (
      opportunity.maxAmount < activeFilters.fundingRange[0] ||
      opportunity.minAmount > activeFilters.fundingRange[1]
    ) {
      return false
    }

    return true
  })

  const filteredInvestors = investors.filter((investor) => {
    // Search filter
    if (
      searchQuery &&
      !investor.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !investor.organization.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !investor.bio.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Stage filter
    if (
      activeFilters.stages.length > 0 &&
      !investor.investmentFocus.stages.some((stage) => activeFilters.stages.includes(stage))
    ) {
      return false
    }

    // Industry filter
    if (
      activeFilters.industries.length > 0 &&
      !investor.investmentFocus.industries.some((industry) => activeFilters.industries.includes(industry))
    ) {
      return false
    }

    // Funding range filter
    if (
      investor.investmentFocus.ticketSize.max < activeFilters.fundingRange[0] ||
      investor.investmentFocus.ticketSize.min > activeFilters.fundingRange[1]
    ) {
      return false
    }

    return true
  })

  return (
          <div>
          {/* Hero Section */}
      <section className="bg-[#0F7377] py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl">Funding Marketplace</h1>
            <p className="mb-8 text-lg text-white/90">
              Connect with investors, apply for grants, and find the perfect funding opportunity for your startup.
            </p>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="search"
                placeholder="Search for funding opportunities or investors..."
                className="bg-white/10 pl-10 text-white placeholder:text-white/70 focus-visible:ring-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <Tabs defaultValue="opportunities" className="w-full">
            <TabsList className="mb-8 w-full justify-center">
              <TabsTrigger value="opportunities">Funding Opportunities</TabsTrigger>
              <TabsTrigger value="investors">Investors</TabsTrigger>
              <TabsTrigger value="success-stories">Success Stories</TabsTrigger>
            </TabsList>

            <div className="grid gap-8 md:grid-cols-4">
              <div className="md:col-span-1">
                <FundingFilters onFilterChange={handleFilterChange} className="sticky top-24" />
              </div>

              <div className="md:col-span-3">
                <TabsContent value="opportunities" className="mt-0">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-[#1E293B]">Available Opportunities</h2>
                    <p className="text-sm text-[#334155]">
                      Showing {filteredOpportunities.length} of {fundingOpportunities.length} opportunities
                    </p>
                  </div>

                  {filteredOpportunities.length === 0 ? (
                    <div className="rounded-lg border border-dashed p-8 text-center">
                      <h3 className="mb-2 text-lg font-medium text-[#1E293B]">No matching opportunities found</h3>
                      <p className="text-[#334155]">Try adjusting your filters or search query</p>
                    </div>
                  ) : (
                    <div className="grid gap-6">
                      {filteredOpportunities.map((opportunity) => (
                        <FundingCard key={opportunity.id} opportunity={opportunity} />
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="investors" className="mt-0">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-[#1E293B]">Active Investors</h2>
                    <p className="text-sm text-[#334155]">
                      Showing {filteredInvestors.length} of {investors.length} investors
                    </p>
                  </div>

                  {filteredInvestors.length === 0 ? (
                    <div className="rounded-lg border border-dashed p-8 text-center">
                      <h3 className="mb-2 text-lg font-medium text-[#1E293B]">No matching investors found</h3>
                      <p className="text-[#334155]">Try adjusting your filters or search query</p>
                    </div>
                  ) : (
                    <div className="grid gap-6">
                      {filteredInvestors.map((investor) => (
                        <InvestorCard key={investor.id} investor={investor} />
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="success-stories" className="mt-0">
                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-[#1E293B]">Success Stories</h2>
                    <p className="text-[#334155]">
                      Startups that successfully raised funding through GrowthLab's marketplace
                    </p>
                  </div>

                  <div className="grid gap-6">
                    {successStories.map((story) => (
                      <SuccessStory key={story.id} story={story} />
                    ))}
                  </div>
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#F8FAFC] py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#1E293B]">Ready to Secure Funding?</h2>
            <p className="mb-8 text-lg text-[#334155]">
              Whether you're looking for seed capital, growth funding, or strategic investors, GrowthLab's funding
              marketplace connects you with the right opportunities.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                Apply for Funding
              </Button>
              <Button size="lg" variant="outline">
                Schedule Funding Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#1E293B]">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-lg text-[#334155]">
              Common questions about the funding process and marketplace
            </p>
          </div>

          <div className="mx-auto max-w-3xl">
            <div className="space-y-6">
              <div className="rounded-lg border p-6">
                <h3 className="mb-2 text-lg font-medium text-[#1E293B]">How does the funding marketplace work?</h3>
                <p className="text-[#334155]">
                  Our funding marketplace connects startups with investors and funding opportunities. You can browse
                  available opportunities, filter by criteria like funding type and stage, and apply directly through
                  the platform. We also facilitate introductions to investors who match your startup's profile.
                </p>
              </div>

              <div className="rounded-lg border p-6">
                <h3 className="mb-2 text-lg font-medium text-[#1E293B]">What types of funding are available?</h3>
                <p className="text-[#334155]">
                  We offer various funding types including venture capital, angel investment, grants, accelerator
                  programs, corporate investment, and debt financing. Each has different requirements, terms, and
                  application processes.
                </p>
              </div>

              <div className="rounded-lg border p-6">
                <h3 className="mb-2 text-lg font-medium text-[#1E293B]">How do I prepare for investor meetings?</h3>
                <p className="text-[#334155]">
                  Prepare a concise pitch deck, know your metrics and market inside out, and research the investor
                  beforehand. GrowthLab offers pitch preparation workshops and one-on-one coaching to help you make the
                  best impression.
                </p>
              </div>

              <div className="rounded-lg border p-6">
                <h3 className="mb-2 text-lg font-medium text-[#1E293B]">What fees does GrowthLab charge?</h3>
                <p className="text-[#334155]">
                  The funding marketplace is free for startups to browse and apply. We don't charge any fees or take
                  equity for making connections. Some premium services like funding readiness assessments and pitch
                  coaching may have associated costs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
