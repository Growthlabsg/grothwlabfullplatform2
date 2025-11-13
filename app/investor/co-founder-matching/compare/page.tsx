import type { Metadata } from "next"
import Link from "next/link"
import { Footer } from "@/components/layout/footer"
import { TeamComparisonView } from "@/components/investor/team-comparison-view"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import type { FounderTeam, TeamCompatibility } from "@/types/co-founder-matching"

export const metadata: Metadata = {
  title: "Team Comparison | GrowthLab.sg",
  description: "Compare founding teams side by side to identify the best investment opportunities.",
}

// Sample data for founder teams
const founderTeams: FounderTeam[] = [
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
  },
  {
    id: "team-2",
    founders: [
      {
        id: "founder-3",
        name: "Priya Sharma",
        avatar: "/placeholder.svg?height=40&width=40",
        location: "Singapore",
        skills: ["product", "design"],
        industry: "healthtech",
        experience: 4,
        goal: "product-market-fit",
        bio: "Product manager with experience in healthcare applications. Passionate about improving patient outcomes through technology.",
        linkedin: "https://linkedin.com/in/priyasharma",
        email: "priya@example.com",
        matchScore: 92,
      },
      {
        id: "founder-4",
        name: "David Wong",
        avatar: "/placeholder.svg?height=40&width=40",
        location: "Singapore",
        skills: ["engineering", "operations"],
        industry: "healthtech",
        experience: 6,
        goal: "product-market-fit",
        bio: "Software engineer with a background in healthcare systems. Previously built EMR systems for hospitals in Southeast Asia.",
        linkedin: "https://linkedin.com/in/davidwong",
        email: "david@example.com",
        matchScore: 88,
      },
    ],
    industry: "healthtech",
    idea: "AI-powered diagnostic tools for healthcare providers in Southeast Asia, focusing on early disease detection and prevention.",
    stage: "validation",
    matchScore: 90,
    createdAt: "2025-04-10",
    savedByInvestor: false,
  },
  {
    id: "team-3",
    founders: [
      {
        id: "founder-5",
        name: "Lim Wei Jie",
        avatar: "/placeholder.svg?height=40&width=40",
        location: "Singapore",
        skills: ["operations", "finance"],
        industry: "cleantech",
        experience: 8,
        goal: "scale",
        bio: "Operations expert with experience in supply chain management. Passionate about sustainability and circular economy.",
        linkedin: "https://linkedin.com/in/limweijie",
        email: "weijie@example.com",
        matchScore: 75,
      },
      {
        id: "founder-6",
        name: "Ananya Patel",
        avatar: "/placeholder.svg?height=40&width=40",
        location: "Singapore",
        skills: ["engineering", "product"],
        industry: "cleantech",
        experience: 5,
        goal: "scale",
        bio: "Environmental engineer with expertise in renewable energy solutions. Previously worked on smart grid projects.",
        linkedin: "https://linkedin.com/in/ananyapatel",
        email: "ananya@example.com",
        matchScore: 82,
      },
    ],
    industry: "cleantech",
    idea: "Renewable energy solutions for commercial buildings with IoT integration for optimal energy management and carbon footprint reduction.",
    stage: "scaling",
    matchScore: 78,
    createdAt: "2025-04-05",
    savedByInvestor: false,
  },
  {
    id: "team-4",
    founders: [
      {
        id: "founder-7",
        name: "James Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        location: "Singapore",
        skills: ["marketing", "sales"],
        industry: "edtech",
        experience: 6,
        goal: "build-mvp",
        bio: "Marketing professional with experience in educational technology. Passionate about making education accessible to all.",
        linkedin: "https://linkedin.com/in/jamesrodriguez",
        email: "james@example.com",
        matchScore: 70,
      },
      {
        id: "founder-8",
        name: "Li Mei",
        avatar: "/placeholder.svg?height=40&width=40",
        location: "Singapore",
        skills: ["design", "product"],
        industry: "edtech",
        experience: 4,
        goal: "build-mvp",
        bio: "UX designer with a background in educational psychology. Focused on creating engaging learning experiences.",
        linkedin: "https://linkedin.com/in/limei",
        email: "mei@example.com",
        matchScore: 65,
      },
    ],
    industry: "edtech",
    idea: "Personalized learning platform for K-12 students with adaptive curriculum based on individual learning styles and progress.",
    stage: "ideation",
    matchScore: 68,
    createdAt: "2025-04-18",
    savedByInvestor: false,
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
        linkedin: "https://linkedin.com/in/alexjohnson",
        email: "alex@example.com",
        matchScore: 88,
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
        linkedin: "https://linkedin.com/in/leongkaiwen",
        email: "kaiwen@example.com",
        matchScore: 92,
      },
    ],
    industry: "ai",
    idea: "Generative AI platform for creative professionals, helping designers and content creators enhance their workflow and output quality.",
    stage: "mvp",
    matchScore: 92,
    createdAt: "2025-04-20",
    savedByInvestor: true,
  },
]

// Sample compatibility data
const teamCompatibilityData: Record<string, TeamCompatibility> = {
  "team-1": {
    score: 82,
    skillsCompleteness: 76,
    experienceLevel: 85,
    industryAlignment: 90,
    locationProximity: 95,
  },
  "team-2": {
    score: 90,
    skillsCompleteness: 82,
    experienceLevel: 80,
    industryAlignment: 88,
    locationProximity: 92,
  },
  "team-3": {
    score: 78,
    skillsCompleteness: 74,
    experienceLevel: 88,
    industryAlignment: 72,
    locationProximity: 90,
  },
  "team-4": {
    score: 68,
    skillsCompleteness: 65,
    experienceLevel: 70,
    industryAlignment: 68,
    locationProximity: 85,
  },
  "team-5": {
    score: 92,
    skillsCompleteness: 92,
    experienceLevel: 94,
    industryAlignment: 90,
    locationProximity: 95,
  },
}

export default function TeamComparisonPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <div className="mb-4">
            <Button variant="outline" size="sm" asChild className="mb-4">
              <Link href="/investor/co-founder-matching">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Teams
              </Link>
            </Button>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[#1E293B] md:text-4xl">Team Comparison</h1>
          <p className="text-lg text-[#334155]">
            Compare founding teams side by side to identify the best investment opportunities.
          </p>
        </div>
      </div>

      <TeamComparisonView teams={founderTeams} teamCompatibility={teamCompatibilityData} />
      
      <Footer />
    </div>
  )
}
