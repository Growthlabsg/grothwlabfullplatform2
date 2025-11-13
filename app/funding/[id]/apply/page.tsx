import { FundingApplicationForm } from "@/components/funding/funding-application-form"
import { Footer } from "@/components/layout/footer"
import type { FundingOpportunity } from "@/types/funding"

// Sample data for the funding opportunity
const opportunity: FundingOpportunity = {
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
}

export default async function FundingApplicationPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  return (
          <div>
          <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-[#1E293B] md:text-4xl">Apply for Funding</h1>
          <p className="text-lg text-[#334155]">
            Complete the application form to apply for funding from {opportunity.organization}.
          </p>
        </div>

        <FundingApplicationForm opportunity={opportunity} />
      </div>

      <Footer />
    </div>
  )
}
