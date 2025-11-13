"use client"

// Import necessary components and hooks
import { useSearchParams } from "next/navigation"
import { Suspense, useState, useEffect } from "react"
import { DealPipeline } from "@/components/investor/deal-pipeline"
import { DealFlowMetrics } from "@/components/investor/deal-flow-metrics"
import { UpcomingMeetings } from "@/components/investor/upcoming-meetings"
import { PortfolioOverview } from "@/components/investor/portfolio-overview"
import { DealFlowAnalytics } from "@/components/investor/deal-flow-analytics"
import { RecentActivity } from "@/components/investor/recent-activity"
import { CoFounderMatchingCard } from "@/components/investor/co-founder-matching-card"
import { TeamProgressCard } from "@/components/investor/team-progress-card"
import { Footer } from "@/components/layout/footer"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import type { TeamWithProgress } from "@/types/team-progress"
import type { DealFlowMetrics as DealFlowMetricsType } from "@/types/investor-dashboard"

// Sample data for deal flow metrics (fallback data)
const fallbackDealFlowMetrics: DealFlowMetricsType = {
  newDeals: 24,
  inProgress: 15,
  closed: 8,
  rejected: 12,
  totalDeals: 59,
  averageDealSize: 250000,
  conversionRate: 0.14,
  averageDaysToClose: 45,
}

// Sample data for meetings
const mockMeetings = [
  {
    id: "meeting-1",
    companyName: "TechStartup Inc",
    date: "2024-01-25",
    time: "10:00 AM",
    type: "video" as const,
    attendees: ["John Doe", "Jane Smith", "Mike Johnson"]
  },
  {
    id: "meeting-2", 
    companyName: "InnovateCorp",
    date: "2024-01-26",
    time: "2:00 PM",
    type: "in-person" as const,
    attendees: ["John Doe", "Sarah Wilson"]
  }
]

// Sample data for deals
const mockDeals = [
  {
    id: "deal-1",
    companyName: "TechStartup Inc",
    logo: "/placeholder.svg?height=40&width=40",
    industry: "fintech",
    stage: "screening" as const,
    dealStage: "screening" as const,
    askAmount: 500000,
    amount: 5000000,
    valuation: 5000000,
    location: "San Francisco, CA",
    founderName: "John Smith",
    founderEmail: "john@techstartup.com",
    dateReceived: "2024-01-20",
    dateAdded: "2024-01-20",
    lastActivity: "2024-01-22",
    status: "active" as const,
    description: "AI-powered financial planning platform"
  }
]

// Sample data for portfolio companies
const mockPortfolioCompanies = [
  {
    id: "company-1",
    name: "PortfolioCorp",
    logo: "/placeholder.svg?height=40&width=40",
    industry: "healthtech",
    status: "active" as const,
    investmentAmount: 1000000,
    currentValuation: 8000000,
    returnMultiple: 8.0,
    investmentDate: "2023-06-15",
    equityPercentage: 15.5,
    valuation: 8000000
  }
]

// Sample data for activities
const mockActivities = [
  {
    id: "activity-1",
    type: "new-deal" as const,
    companyName: "TechStartup Inc",
    description: "New deal added to pipeline",
    date: "2024-01-22",
    user: "John Doe"
  },
  {
    id: "activity-2",
    type: "meeting" as const,
    companyName: "InnovateCorp",
    description: "Scheduled meeting with founders",
    date: "2024-01-21",
    user: "Jane Smith"
  }
]

// Sample data for teams with progress tracking
const fallbackTeamsWithProgress: TeamWithProgress[] = [
  {
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
        bio: "Former business development lead at a major payment processor.",
      },
    ],
    industry: "fintech",
    idea: "Digital payment platform for Southeast Asian SMEs with focus on cross-border transactions and multi-currency support.",
    stage: "mvp",
    matchScore: 82,
    createdAt: "2025-04-15",
    savedByInvestor: true,
    progressData: {
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
        },
        {
          id: "pilot_customers",
          name: "Pilot Customers",
          description: "Number of customers in pilot program",
          type: "market_validation",
          unit: "count",
          isKey: true,
          targetValue: 10,
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
      ],
      snapshots: [
        {
          id: "snapshot-1",
          teamId: "team-1",
          date: "2025-01-15",
          metrics: {
            product_completion: { date: "2025-01-15", value: 10 },
            pilot_customers: { date: "2025-01-15", value: 0 },
            funding_raised: { date: "2025-01-15", value: 0 },
          },
          notes: "Team has just started working on the MVP.",
        },
        {
          id: "snapshot-2",
          teamId: "team-1",
          date: "2025-04-15",
          metrics: {
            product_completion: { date: "2025-04-15", value: 60 },
            pilot_customers: { date: "2025-04-15", value: 3 },
            funding_raised: { date: "2025-04-15", value: 150000 },
          },
          notes: "Team has made significant progress with payment gateway integrations.",
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
      ],
    },
  },
  {
    id: "team-5",
    founders: [
      {
        id: "founder-9",
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        location: "Singapore",
        skills: ["engineering", "product", "design"],
        industry: "ai",
        experience: 7,
        goal: "raise-funding",
        bio: "AI researcher with experience in computer vision and natural language processing. PhD from NUS.",
      },
      {
        id: "founder-10",
        name: "Leong Kai Wen",
        avatar: "/placeholder.svg?height=40&width=40",
        location: "Singapore",
        skills: ["operations", "sales", "finance"],
        industry: "ai",
        experience: 9,
        goal: "raise-funding",
        bio: "Serial entrepreneur with two successful exits. Strong background in commercializing AI technologies.",
      },
    ],
    industry: "ai",
    idea: "Generative AI platform for creative professionals, helping designers and content creators enhance their workflow and output quality.",
    stage: "mvp",
    matchScore: 92,
    createdAt: "2025-04-20",
    savedByInvestor: true,
    progressData: {
      teamId: "team-5",
      metricDefinitions: [
        {
          id: "product_completion",
          name: "Product Completion",
          description: "Percentage of planned MVP features completed",
          type: "product_development",
          unit: "percentage",
          isKey: true,
          targetValue: 100,
        },
        {
          id: "pilot_customers",
          name: "Pilot Customers",
          description: "Number of customers in pilot program",
          type: "market_validation",
          unit: "count",
          isKey: true,
          targetValue: 15,
        },
        {
          id: "funding_raised",
          name: "Funding Raised",
          description: "Total funding raised to date",
          type: "funding",
          unit: "currency",
          isKey: true,
          targetValue: 750000,
        },
      ],
      snapshots: [
        {
          id: "snapshot-1",
          teamId: "team-5",
          date: "2025-03-01",
          metrics: {
            product_completion: { date: "2025-03-01", value: 30 },
            pilot_customers: { date: "2025-03-01", value: 0 },
            funding_raised: { date: "2025-03-01", value: 100000 },
          },
          notes: "Team has completed initial AI model training.",
        },
        {
          id: "snapshot-2",
          teamId: "team-5",
          date: "2025-04-15",
          metrics: {
            product_completion: { date: "2025-04-15", value: 70 },
            pilot_customers: { date: "2025-04-15", value: 5 },
            funding_raised: { date: "2025-04-15", value: 250000 },
          },
          notes: "Team has secured 5 design agencies as pilot customers.",
        },
      ],
      milestones: [
        {
          id: "milestone-1",
          title: "AI Model Optimization",
          description: "Optimize AI model for production use",
          dueDate: "2025-05-15",
          status: "in_progress",
        },
        {
          id: "milestone-2",
          title: "Public Beta Launch",
          description: "Launch public beta version of the platform",
          dueDate: "2025-07-30",
          status: "not_started",
        },
      ],
    },
  },
]

// Simulated API fetch function for deal flow metrics
const fetchDealFlowMetrics = async (): Promise<DealFlowMetricsType> => {
  // In a real application, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate real-time data with slight variations from the fallback data
      resolve({
        ...fallbackDealFlowMetrics,
        newDeals: fallbackDealFlowMetrics.newDeals + Math.floor(Math.random() * 5),
        inProgress: fallbackDealFlowMetrics.inProgress + Math.floor(Math.random() * 3),
        closed: fallbackDealFlowMetrics.closed + Math.floor(Math.random() * 2),
        totalDeals: fallbackDealFlowMetrics.totalDeals + Math.floor(Math.random() * 10),
      })
    }, 1500)
  })
}

// Simulated API fetch function for teams with progress
const fetchTeamsWithProgress = async (): Promise<TeamWithProgress[]> => {
  // In a real application, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fallbackTeamsWithProgress)
    }, 1800)
  })
}

// Add a loading fallback component for the Suspense boundary
function DashboardContent() {
  const searchParams = useSearchParams()
  const [dealFlowMetrics, setDealFlowMetrics] = useState<DealFlowMetricsType | null>(null)
  const [teamsWithProgress, setTeamsWithProgress] = useState<TeamWithProgress[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchData = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const [metricsData, teamsData] = await Promise.all([fetchDealFlowMetrics(), fetchTeamsWithProgress()])

      setDealFlowMetrics(metricsData)
      setTeamsWithProgress(teamsData)
      setLastUpdated(new Date())
    } catch (err) {
      console.error("Error fetching dashboard data:", err)
      setError("Failed to load dashboard data. Please try again.")

      // Use fallback data if API fails
      if (!dealFlowMetrics) setDealFlowMetrics(fallbackDealFlowMetrics)
      if (!teamsWithProgress) setTeamsWithProgress(fallbackTeamsWithProgress)
    } finally {
      setIsLoading(false)
    }
  }

  // Initial data fetch
  useEffect(() => {
    fetchData()

    // Set up polling for real-time updates (every 5 minutes)
    const intervalId = setInterval(fetchData, 5 * 60 * 1000)

    return () => clearInterval(intervalId)
  }, [searchParams]) // Re-fetch when filter changes

  // Use searchParams as needed
  // ...

  // Render loading state
  if (isLoading && !dealFlowMetrics && !teamsWithProgress) {
    return (
              <div>
              <div className="container mx-auto max-w-7xl px-4 py-8">
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-[#1E293B] md:text-4xl">Investor Dashboard</h1>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="md:col-span-2 lg:col-span-2">
              <Skeleton className="h-[250px] w-full rounded-lg" />
            </div>
            <Skeleton className="h-[250px] w-full rounded-lg" />
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="h-[300px] w-full rounded-lg md:col-span-2 lg:col-span-2" />
            <div className="space-y-6 md:col-span-1 lg:col-span-1">
              <Skeleton className="h-[140px] w-full rounded-lg" />
              <Skeleton className="h-[140px] w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-3xl font-bold tracking-tight text-[#1E293B] md:text-4xl">Investor Dashboard</h1>

        <div className="flex items-center gap-2">
          {lastUpdated && (
            <span className="text-sm text-muted-foreground">Last updated: {lastUpdated.toLocaleTimeString()}</span>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={fetchData}
            disabled={isLoading}
            className="flex items-center gap-1"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            {isLoading ? "Updating..." : "Refresh"}
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <DealFlowMetrics
          className="md:col-span-2 lg:col-span-2"
          metrics={dealFlowMetrics || fallbackDealFlowMetrics}
          isLoading={isLoading}
        />
        <UpcomingMeetings meetings={mockMeetings} className="md:col-span-1 lg:col-span-1" />
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <DealPipeline deals={mockDeals} className="md:col-span-2 lg:col-span-2" />
        <div className="space-y-6 md:col-span-1 lg:col-span-1">
          <PortfolioOverview companies={mockPortfolioCompanies} />
          <RecentActivity activities={mockActivities} />
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <DealFlowAnalytics />
        <TeamProgressCard teams={teamsWithProgress || fallbackTeamsWithProgress} isLoading={isLoading} />
      </div>

      <div className="mt-6">
        <CoFounderMatchingCard />
      </div>
    </div>
  )
}

export default function InvestorDashboardPage() {
  return (
    <div>
      <Suspense fallback={<p>Loading dashboard...</p>}>
        <DashboardContent />
      </Suspense>
      <Footer />
    </div>
  )
}
