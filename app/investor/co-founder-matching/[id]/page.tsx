"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, LineChart } from "lucide-react"
import { TeamDetails } from "@/components/investor/team-details"
import { Footer } from "@/components/layout/footer"
import type { FounderTeam, TeamCompatibility } from "@/types/co-founder-matching"

// Sample data for a founder team
const team: FounderTeam = {
  id: "team-1",
  founders: [
    {
      id: "founder-1",
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "Singapore",
      skills: ["engineering", "product"],
      industry: "fintech",
      experience: 5,
      goal: "raise-funding",
      bio: "Full-stack developer with 5 years of experience in fintech. Previously at DBS Innovation Group.",
      linkedin: "https://linkedin.com/in/sarahchen",
      email: "sarah@example.com",
      matchScore: 85,
    },
    {
      id: "founder-2",
      name: "Michael Tan",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "Singapore",
      skills: ["sales", "marketing"],
      industry: "fintech",
      experience: 7,
      goal: "raise-funding",
      bio: "Former business development lead at a major payment processor. Expertise in go-to-market strategy for fintech products.",
      linkedin: "https://linkedin.com/in/michaeltan",
      email: "michael@example.com",
      matchScore: 78,
    },
  ],
  industry: "fintech",
  idea: "Digital payment platform for Southeast Asian SMEs with focus on cross-border transactions and multi-currency support.",
  stage: "mvp",
  matchScore: 82,
  createdAt: "2025-04-15",
  savedByInvestor: true,
}

// Sample compatibility data
const compatibility: TeamCompatibility = {
  score: 82,
  skillsCompleteness: 90,
  experienceLevel: 75,
  industryAlignment: 85,
  locationProximity: 95,
}

export default function TeamDetailsPage({ params }: { params: { id: string } }) {
  return (
          <div>
          <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <Link
            href="/investor/co-founder-matching"
            className="mb-4 inline-flex items-center text-[#0F7377] hover:underline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Co-founder Matching
          </Link>

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <h1 className="text-3xl font-bold tracking-tight text-[#1E293B]">Team Details</h1>
            <Button asChild className="bg-[#0F7377] hover:bg-[#0F7377]/90">
              <Link href={`/investor/co-founder-matching/${params.id}/progress`}>
                <LineChart className="mr-2 h-4 w-4" />
                Track Progress
              </Link>
            </Button>
          </div>
        </div>

        <TeamDetails team={team} compatibility={compatibility} />
      </div>

      <Footer />
    </div>
  )
}
