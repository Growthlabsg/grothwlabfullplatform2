"use client"

import { useState } from "react"
import Link from "next/link"
import { Footer } from "@/components/layout/footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Users } from "lucide-react"
import { TeamProgressChart } from "@/components/investor/team-progress-chart"
import { TeamProgressMetrics } from "@/components/investor/team-progress-metrics"
import { TeamProgressSnapshots } from "@/components/investor/team-progress-snapshots"
import { AddProgressSnapshot } from "@/components/investor/add-progress-snapshot"
import type { FounderTeam } from "@/types/co-founder-matching"
import type { TeamProgressData, TeamProgressSnapshot } from "@/types/team-progress"

// Sample team data
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

// Sample progress data
const initialProgressData: TeamProgressData = {
  teamId: "team-1",
  metricDefinitions: [
    {
      id: "product_completion",
      name: "Product Completion",
      description: "Percentage of planned MVP features completed",
      type: "product_development",
      unit: "percentage",
      isKey: true,
      targetValue: 100,
      targetDate: "2025-08-15",
    },
    {
      id: "user_testing",
      name: "User Testing Sessions",
      description: "Number of user testing sessions conducted",
      type: "product_development",
      unit: "count",
      isKey: true,
      targetValue: 20,
    },
    {
      id: "pilot_customers",
      name: "Pilot Customers",
      description: "Number of customers in pilot program",
      type: "market_validation",
      unit: "count",
      isKey: true,
      targetValue: 10,
      targetDate: "2025-09-30",
    },
    {
      id: "customer_feedback_score",
      name: "Customer Feedback Score",
      description: "Average customer satisfaction score (0-10)",
      type: "market_validation",
      unit: "rating",
      isKey: true,
      targetValue: 8,
    },
    {
      id: "team_size",
      name: "Team Size",
      description: "Number of team members",
      type: "team_growth",
      unit: "count",
      isKey: false,
      targetValue: 5,
    },
    {
      id: "technical_skills_coverage",
      name: "Technical Skills Coverage",
      description: "Percentage of required technical skills covered by the team",
      type: "skill_development",
      unit: "percentage",
      isKey: true,
      targetValue: 90,
    },
    {
      id: "funding_raised",
      name: "Funding Raised",
      description: "Total funding raised to date",
      type: "funding",
      unit: "currency",
      isKey: true,
      targetValue: 500000,
    },
    {
      id: "investor_meetings",
      name: "Investor Meetings",
      description: "Number of investor meetings conducted",
      type: "investor_interest",
      unit: "count",
      isKey: false,
      targetValue: 15,
    },
    {
      id: "mentor_sessions",
      name: "Mentor Sessions",
      description: "Number of mentor sessions completed",
      type: "mentor_engagement",
      unit: "count",
      isKey: false,
      targetValue: 12,
    },
  ],
  snapshots: [
    {
      id: "snapshot-1",
      teamId: "team-1",
      date: "2025-01-15",
      metrics: {
        product_completion: { value: 10, note: "Initial wireframes and architecture" },
        user_testing: { value: 0 },
        pilot_customers: { value: 0 },
        customer_feedback_score: { value: 0 },
        team_size: { value: 2 },
        technical_skills_coverage: { value: 60 },
        funding_raised: { value: 0 },
        investor_meetings: { value: 2 },
        mentor_sessions: { value: 1 },
      },
      notes: "Team has just started working on the MVP. Initial focus on product architecture and wireframes.",
      evaluatorId: "mentor-1",
    },
    {
      id: "snapshot-2",
      teamId: "team-1",
      date: "2025-02-15",
      metrics: {
        product_completion: { value: 25, note: "Core payment processing module in development" },
        user_testing: { value: 2 },
        pilot_customers: { value: 0 },
        customer_feedback_score: { value: 6 },
        team_size: { value: 2 },
        technical_skills_coverage: { value: 65 },
        funding_raised: { value: 50000, note: "Friends and family round" },
        investor_meetings: { value: 5 },
        mentor_sessions: { value: 3 },
      },
      notes:
        "Team has made good progress on the core payment processing module. Initial user testing with potential customers has begun.",
      evaluatorId: "mentor-1",
    },
    {
      id: "snapshot-3",
      teamId: "team-1",
      date: "2025-03-15",
      metrics: {
        product_completion: { date: "2025-03-15", value: 40, note: "User interface implementation started" },
        user_testing: { date: "2025-03-15", value: 5 },
        pilot_customers: { date: "2025-03-15", value: 1, note: "First pilot customer signed" },
        customer_feedback_score: { date: "2025-03-15", value: 7 },
        team_size: { date: "2025-03-15", value: 3, note: "Added UI/UX designer" },
        technical_skills_coverage: { date: "2025-03-15", value: 75 },
        funding_raised: { date: "2025-03-15", value: 50000 },
        investor_meetings: { date: "2025-03-15", value: 8 },
        mentor_sessions: { date: "2025-03-15", value: 6 },
      },
      notes:
        "Team has added a UI/UX designer and started implementing the user interface. First pilot customer has signed up.",
      evaluatorId: "mentor-2",
    },
    {
      id: "snapshot-4",
      teamId: "team-1",
      date: "2025-04-15",
      metrics: {
        product_completion: { date: "2025-04-15", value: 60, note: "Integration with payment gateways" },
        user_testing: { date: "2025-04-15", value: 10 },
        pilot_customers: { date: "2025-04-15", value: 3 },
        customer_feedback_score: { date: "2025-04-15", value: 7.5 },
        team_size: { date: "2025-04-15", value: 3 },
        technical_skills_coverage: { date: "2025-04-15", value: 80 },
        funding_raised: { date: "2025-04-15", value: 150000, note: "Angel investment" },
        investor_meetings: { date: "2025-04-15", value: 12 },
        mentor_sessions: { date: "2025-04-15", value: 8 },
      },
      notes:
        "Team has made significant progress with payment gateway integrations. Three pilot customers are now using the platform.",
      evaluatorId: "investor-1",
    },
  ],
  milestones: [
    {
      id: "milestone-1",
      title: "MVP Launch",
      description: "Launch minimum viable product with core payment processing features",
      dueDate: "2025-06-30",
      status: "in_progress",
    },
    {
      id: "milestone-2",
      title: "10 Pilot Customers",
      description: "Onboard 10 pilot customers to validate product-market fit",
      dueDate: "2025-09-30",
      status: "not_started",
    },
    {
      id: "milestone-3",
      title: "Seed Funding",
      description: "Raise $500K in seed funding",
      dueDate: "2025-10-31",
      status: "not_started",
    },
    {
      id: "milestone-4",
      title: "Team Expansion",
      description: "Expand team to 5 members including backend, frontend, and sales roles",
      dueDate: "2025-08-15",
      status: "not_started",
    },
    {
      id: "milestone-5",
      title: "Initial Technical Architecture",
      description: "Complete initial technical architecture and wireframes",
      dueDate: "2025-01-31",
      status: "completed",
      completedDate: "2025-01-25",
    },
  ],
}

export default function TeamProgressPage({ params }: { params: { id: string } }) {
  const [progressData, setProgressData] = useState<TeamProgressData>(initialProgressData)
  const [activeTab, setActiveTab] = useState<"overview" | "metrics" | "snapshots">("overview")

  // Add a new progress snapshot
  const handleAddSnapshot = (snapshot: TeamProgressSnapshot) => {
    setProgressData((prev) => ({
      ...prev,
      snapshots: [...prev.snapshots, snapshot],
    }))
  }

  return (
    <div>
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <Link
            href={`/investor/co-founder-matching/${params.id}`}
            className="mb-4 inline-flex items-center text-[#0F7377] hover:underline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Team Details
          </Link>

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-[#1E293B]">Team Progress Tracking</h1>
              <p className="text-lg text-[#334155]">
                Monitor the development and progress of this founding team over time
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-lg border p-2 text-sm">
              <Users className="h-4 w-4 text-[#0F7377]" />
              <span>
                <span className="font-medium">{team.founders.length} founders</span> · {team.industry} · {team.stage}
              </span>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "overview" | "metrics" | "snapshots")}>
          <div className="mb-6">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
              <TabsTrigger value="snapshots">Progress History</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <TeamProgressMetrics progressData={progressData} className="md:col-span-2" />
              <AddProgressSnapshot
                progressData={progressData}
                onAddSnapshot={handleAddSnapshot}
                className="md:col-span-1"
              />
            </div>

            <TeamProgressChart progressData={progressData} />
          </TabsContent>

          <TabsContent value="metrics" className="space-y-6">
            <TeamProgressMetrics progressData={progressData} />
            <TeamProgressChart progressData={progressData} />
          </TabsContent>

          <TabsContent value="snapshots" className="space-y-6">
            <TeamProgressSnapshots progressData={progressData} />
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  )
}
