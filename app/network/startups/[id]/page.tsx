"use client"

import { useState, useEffect, use } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { useJobs } from "@/contexts/JobContext"
import {
  Building,
  Globe,
  Users,
  TrendingUp,
  Calendar,
  MapPin,
  Mail,
  ExternalLink,
  Briefcase,
  Star,
  Share2,
  MessageSquare,
  ChevronLeft,
  Zap,
  Award,
  BarChart3,
  Layers,
  Clock,
  Heart,
  Bookmark,
  Send,
  Phone,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  DollarSign,
  Target,
  CheckCircle,
  ArrowRight,
  Eye,
  ThumbsUp,
  MessageCircle,
  Plus,
  Minus,
  ChevronDown,
  ChevronUp,
  Download,
  Filter,
  Search
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Enhanced mock data for startup profiles
const STARTUPS = {
  "1": {
    id: "1",
    name: "TechNova Solutions",
    logo: "/Tennessee_Landscape.png",
    description: "AI-powered solutions for enterprise workflow automation and productivity enhancement.",
    longDescription:
      "TechNova Solutions is at the forefront of enterprise AI innovation, developing cutting-edge solutions that transform how businesses operate. Our flagship product, AutoFlow AI, uses machine learning to automate complex workflows, reducing manual tasks by up to 80% and significantly improving operational efficiency. Founded by a team of AI researchers and enterprise software veterans, TechNova is backed by leading venture capital firms and has been recognized as one of the most promising AI startups in Southeast Asia.",
    industry: "Artificial Intelligence",
    location: "Singapore",
    founded: "2020",
    funding: "$5.2M",
    employees: "25-50",
    stage: "Series A",
    website: "https://technova.ai",
    email: "contact@technova.ai",
    phone: "+65 6123 4567",
    tags: ["AI", "Enterprise", "SaaS", "Automation", "Machine Learning"],
    featured: true,
    verified: true,
    trending: true,
    socialMedia: {
      linkedin: "https://linkedin.com/company/technova-solutions",
      twitter: "https://twitter.com/technova_sg",
      facebook: "https://facebook.com/technova.solutions"
    },
    keyMetrics: {
      customers: 150,
      revenue: 2500000,
      growth: 45,
      satisfaction: 4.8,
      retention: 92,
      mrr: 208333, // Monthly Recurring Revenue
      arr: 2500000, // Annual Recurring Revenue
      churn: 2.1, // Monthly churn rate
      ltv: 12500, // Customer Lifetime Value
      cac: 850, // Customer Acquisition Cost
      burnRate: 45000, // Monthly burn rate
      runway: 18, // Months of runway
      valuation: 25000000, // Company valuation
      lastFundingDate: "2024-01-20",
      nextMilestone: "Series B by Q3 2024"
    },
    founders: [
      {
        name: "Dr. Sarah Chen",
        title: "CEO & Co-founder",
        bio: "Former Google AI researcher with 10+ years in machine learning",
        avatar: "/placeholder.svg?height=100&width=100&query=sarah+chen",
        linkedin: "https://linkedin.com/in/sarahchen"
      },
      {
        name: "Michael Wong",
        title: "CTO & Co-founder",
        bio: "Ex-Microsoft engineer specializing in enterprise software architecture",
        avatar: "/placeholder.svg?height=100&width=100&query=michael+wong",
        linkedin: "https://linkedin.com/in/michaelwong"
      }
    ],
    investors: [
      {
        name: "Sequoia Capital",
        type: "VC",
        logo: "/placeholder.svg?height=60&width=120&query=sequoia+capital",
        website: "https://sequoiacap.com"
      },
      {
        name: "Temasek",
        type: "Sovereign Fund",
        logo: "/placeholder.svg?height=60&width=120&query=temasek",
        website: "https://temasek.com.sg"
      }
    ],
    team: [
      {
        name: "Dr. Lisa Ng",
        role: "Head of AI Research",
        department: "Engineering",
        avatar: "/placeholder.svg?height=60&width=60&query=lisa+ng"
      },
      {
        name: "James Tan",
        role: "VP of Sales",
        department: "Sales",
        avatar: "/placeholder.svg?height=60&width=60&query=james+tan"
      },
      {
        name: "Priya Sharma",
        role: "Head of Product",
        department: "Product",
        avatar: "/placeholder.svg?height=60&width=60&query=priya+sharma"
      }
    ],
    jobs: [
      {
        id: "1",
        title: "Senior AI Engineer",
        department: "Engineering",
        type: "Full-time",
        location: "Singapore",
        description: "Lead development of machine learning models for workflow automation",
        requirements: ["PhD in AI/ML", "5+ years Python experience", "TensorFlow/PyTorch expertise"],
        posted: "2024-01-15",
        salary: "$8,000 - $12,000"
      },
      {
        id: "2", 
        title: "Product Manager",
        department: "Product",
        type: "Full-time",
        location: "Singapore",
        description: "Drive product strategy and roadmap for AI automation platform",
        requirements: ["3+ years PM experience", "B2B SaaS background", "AI/ML knowledge preferred"],
        posted: "2024-01-10",
        salary: "$7,000 - $10,000"
      }
    ],
    updates: [
      {
        id: "1",
        title: "Series A Funding Round Complete",
        content: "We're excited to announce the successful completion of our $5.2M Series A funding round led by Sequoia Capital. This investment will accelerate our product development and market expansion across Southeast Asia.",
        author: "Dr. Sarah Chen",
        date: "2024-01-20",
        type: "funding"
      },
      {
        id: "2",
        title: "New AI Model Release",
        content: "Our latest AutoFlow AI model shows 40% improvement in workflow automation accuracy. The new model is now available for all enterprise customers.",
        author: "Michael Wong",
        date: "2024-01-15",
        type: "product"
      }
    ],
    milestones: [
      {
        title: "Company Founded",
        date: "2020-03-15",
        description: "TechNova Solutions officially launched"
      },
      {
        title: "First Customer",
        date: "2020-08-20",
        description: "Secured first enterprise client"
      },
      {
        title: "Seed Funding",
        date: "2021-06-10",
        description: "Raised $1.2M in seed funding"
      },
      {
        title: "Product Launch",
        date: "2022-01-15",
        description: "AutoFlow AI platform officially launched"
      },
      {
        title: "Series A Funding",
        date: "2024-01-20",
        description: "Raised $5.2M in Series A funding"
      }
    ],
    similarStartups: [
      {
        id: "2",
        name: "FinFlow Pro",
        logo: "/fintech-flow.png",
        description: "Next-generation financial technology platform",
        industry: "Financial Technology",
        stage: "Seed",
        funding: "$500K"
      },
      {
    id: "3",
        name: "HealthTech Innovations",
    logo: "/machine-learning-concept.png",
        description: "Revolutionary healthcare technology solutions",
        industry: "Healthcare Technology",
        stage: "Series B",
        funding: "$8.2M"
      }
    ],
    // Additional comprehensive details
    businessModel: "SaaS (Software as a Service)",
    targetMarket: "Enterprise companies with 500+ employees",
    competitiveAdvantage: "Proprietary AI algorithms with 40% better accuracy than competitors",
    technologyStack: ["Python", "TensorFlow", "React", "AWS", "Docker", "Kubernetes"],
    patents: ["US Patent 11,234,567 - Automated Workflow Optimization", "US Patent 11,234,568 - AI-Powered Process Discovery"],
    awards: [
      "Best AI Startup 2023 - Singapore Tech Awards",
      "Innovation Excellence Award - Enterprise Software",
      "Top 10 Startups to Watch - TechCrunch"
    ],
    partnerships: [
      "Microsoft Azure Partner",
      "AWS Advanced Technology Partner", 
      "Salesforce AppExchange Partner"
    ],
    certifications: [
      "ISO 27001 - Information Security Management",
      "SOC 2 Type II - Security Compliance",
      "GDPR Compliant"
    ],
    officeLocations: [
      {
        city: "Singapore",
        address: "1 Marina Bay Sands, Singapore 018956",
        type: "Headquarters",
        employees: 25
      },
      {
        city: "San Francisco",
        address: "123 Market Street, San Francisco, CA 94105",
        type: "Sales Office", 
        employees: 8
      }
    ],
    culture: {
      values: ["Innovation", "Transparency", "Customer Success", "Continuous Learning"],
      perks: ["Flexible work hours", "Remote work options", "Learning budget", "Health insurance", "Stock options"],
      teamSize: 33,
      averageAge: 28,
      diversity: {
        gender: { male: 60, female: 40 },
        ethnicity: { asian: 70, caucasian: 20, other: 10 }
      }
    },
    product: {
      name: "AutoFlow AI",
      description: "Enterprise workflow automation platform powered by artificial intelligence",
      features: [
        "Automated process discovery",
        "Intelligent workflow optimization", 
        "Real-time performance analytics",
        "Custom AI model training",
        "API integrations",
        "Mobile app support"
      ],
      pricing: {
        starter: "$99/user/month",
        professional: "$199/user/month", 
        enterprise: "Custom pricing"
      },
      integrations: ["Salesforce", "Microsoft 365", "Slack", "Jira", "ServiceNow", "Workday"]
    },
    market: {
      totalAddressableMarket: 50000000000, // $50B
      serviceableAddressableMarket: 5000000000, // $5B
      serviceableObtainableMarket: 500000000, // $500M
      marketGrowth: 15, // 15% annual growth
      competition: ["UiPath", "Automation Anywhere", "Blue Prism", "Microsoft Power Automate"]
    }
  }
}

export default function StartupProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { getJobsByCompany } = useJobs()
  const [activeTab, setActiveTab] = useState("overview")
  const [isFollowing, setIsFollowing] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [showAllJobs, setShowAllJobs] = useState(false)
  const [showAllUpdates, setShowAllUpdates] = useState(false)
  const [startupJobs, setStartupJobs] = useState<any[]>([])
  const [jobsLoading, setJobsLoading] = useState(false)

  // Use React's use hook to unwrap the params Promise
  const { id: startupId } = use(params)
  const startup = STARTUPS[startupId as keyof typeof STARTUPS]

  // Mock jobs data for TechNova Solutions (startup ID: 1)
  const mockStartupJobs = [
    {
      id: "1",
        title: "AI Research Engineer",
      company: "TechNova Solutions",
      companyId: "1",
      companyLogo: "TN",
        location: "Singapore",
      type: "Full-time" as const,
      experience: "Senior" as const,
      salary: "$10,000 - $15,000",
      salaryMin: 10000,
      salaryMax: 15000,
      currency: "SGD",
      visaSponsorship: true,
      remoteWork: "Hybrid" as const,
      description: "Join our AI research team to develop cutting-edge machine learning algorithms for enterprise workflow automation.",
      requirements: [
        "PhD in Computer Science, AI, or related field",
        "5+ years of experience in machine learning research",
        "Strong background in deep learning and neural networks",
        "Experience with TensorFlow, PyTorch, and MLOps"
      ],
      skills: ["Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "Python", "Research"],
      benefits: ["Health Insurance", "Stock Options", "Research Budget", "Conference Attendance", "Flexible Hours"],
      posted: "3 days ago",
      postedDate: new Date("2024-01-13"),
      applications: 28,
      views: 156,
      companySize: "25-50",
      fundingStage: "Series A",
      industry: "Artificial Intelligence",
      matchScore: 95,
      urgency: "High" as const,
      featured: true,
      status: "Active" as const,
      applicationMethod: "Platform" as const,
      createdBy: "user1",
      createdAt: "2024-01-13T14:00:00Z",
      updatedAt: "2024-01-13T14:00:00Z",
      department: "Research & Development",
      reportingTo: "Head of AI Research",
      teamSize: 6,
      workSchedule: "Flexible",
      travelRequired: true,
      travelPercentage: 10,
      equityOffered: true,
      equityDetails: "0.2% - 0.8% equity based on experience and impact",
      stockOptions: true,
      education: ["PhD in Computer Science, AI, or related field"],
      workAuthorization: ["Singapore Citizen", "PR", "EP"],
      backgroundCheck: true,
      companyValues: ["Innovation", "Excellence", "Collaboration", "Impact"],
      workEnvironment: "Research-focused with access to cutting-edge hardware",
      teamCulture: "We foster a culture of intellectual curiosity and breakthrough innovation",
      growthOpportunities: ["Lead research projects", "Mentor junior researchers", "Patent development"],
      learningBudget: 5000,
      conferenceBudget: 3000,
      applicationSteps: [
        "Submit application with research portfolio",
        "Initial technical screening",
        "Research presentation",
        "Technical deep-dive interview",
        "Team fit interview",
        "Final interview with leadership"
      ],
      interviewProcess: ["Initial screening", "Technical interview", "Research presentation", "Team fit interview", "Final interview"],
      timeline: "Hiring within 6-8 weeks",
      tags: ["AI Research", "Machine Learning", "Deep Learning", "Senior", "PhD"],
      keywords: ["ai research", "machine learning", "deep learning", "tensorflow", "pytorch", "phd"]
    },
    {
      id: "2",
      title: "Frontend Developer",
      company: "TechNova Solutions",
      companyId: "1",
      companyLogo: "TN",
      location: "Singapore",
      type: "Full-time" as const,
      experience: "Mid Level" as const,
      salary: "$6,500 - $9,500",
      salaryMin: 6500,
      salaryMax: 9500,
      currency: "SGD",
      visaSponsorship: true,
      remoteWork: "Hybrid" as const,
      description: "Build beautiful and intuitive user interfaces for our AutoFlow AI platform. Work closely with our AI team to create seamless user experiences for enterprise clients.",
      requirements: [
        "3+ years of frontend development experience",
        "Strong proficiency in React, TypeScript, and modern CSS",
        "Experience with state management (Redux, Zustand, or similar)",
        "Knowledge of responsive design and accessibility",
        "Experience with testing frameworks (Jest, React Testing Library)",
        "Familiarity with design systems and component libraries"
      ],
      skills: ["React", "TypeScript", "CSS", "Redux", "Jest", "Figma"],
      benefits: ["Health Insurance", "Stock Options", "Learning Budget", "Flexible Hours", "Work from Home"],
      posted: "1 day ago",
      postedDate: new Date("2024-01-16"),
      applications: 42,
      views: 198,
      companySize: "25-50",
      fundingStage: "Series A",
      industry: "Artificial Intelligence",
      matchScore: 88,
      urgency: "Medium" as const,
      featured: false,
      status: "Active" as const,
      applicationMethod: "Platform" as const,
      createdBy: "user1",
      createdAt: "2024-01-16T10:30:00Z",
      updatedAt: "2024-01-16T10:30:00Z",
      department: "Engineering",
      reportingTo: "Frontend Lead",
      teamSize: 4,
      workSchedule: "Flexible",
      travelRequired: false,
      equityOffered: true,
      equityDetails: "0.05% - 0.2% equity based on experience",
      education: ["Bachelor's degree in Computer Science or related field"],
      workAuthorization: ["Singapore Citizen", "PR", "EP", "S-Pass"],
      backgroundCheck: true,
      companyValues: ["Innovation", "User-Centric", "Quality", "Collaboration"],
      workEnvironment: "Modern office with latest development tools",
      teamCulture: "We value clean code, user experience, and continuous learning",
      growthOpportunities: ["Technical leadership", "UI/UX collaboration", "Mentoring"],
      learningBudget: 2000,
      conferenceBudget: 1000,
      applicationSteps: [
        "Submit application with portfolio",
        "Initial phone screening",
        "Technical coding challenge",
        "Frontend architecture discussion",
        "Team fit interview"
      ],
      interviewProcess: ["Initial screening", "Technical challenge", "Architecture discussion", "Team fit interview"],
      timeline: "Hiring within 4-5 weeks",
      tags: ["Frontend", "React", "TypeScript", "Mid Level", "UI/UX"],
      keywords: ["frontend", "react", "typescript", "ui", "ux", "javascript"]
    }
  ]

  // Load jobs for this startup from shared context
  useEffect(() => {
    setJobsLoading(true)
    try {
      const jobs = getJobsByCompany(startupId)
      setStartupJobs(jobs)
    } catch (error) {
      console.error('Error loading jobs:', error)
      setStartupJobs([])
    } finally {
      setJobsLoading(false)
    }
  }, [startupId, getJobsByCompany])

  if (!startup) {
  return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Startup Not Found</h1>
          <p className="text-gray-600 mb-4">The startup you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/network/startups">Back to Startups</Link>
          </Button>
        </div>
      </div>
    )
  }

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: startup.name,
          text: startup.description,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#0F7377] via-[#0F7377]/95 to-[#0F7377]/90 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" asChild className="text-white hover:bg-white/20">
              <Link href="/network/startups">
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to Startups
          </Link>
            </Button>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl">
                  <Image
                    src={startup.logo}
                    alt={startup.name}
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                  />
                </div>
                {startup.verified && (
                  <div className="absolute -top-2 -right-2 bg-blue-500 rounded-full p-1">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                )}
              </div>
              </div>
              
            <div className="flex-1">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-4xl font-bold">{startup.name}</h1>
                    {startup.featured && (
                      <Badge className="bg-yellow-500 text-yellow-900">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                    {startup.trending && (
                      <Badge className="bg-orange-500 text-orange-900">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                </div>
                
                  <p className="text-xl text-white/90 mb-4 max-w-3xl">{startup.description}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      {startup.industry}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {startup.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Founded {startup.founded}
                  </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      {startup.employees} employees
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      {startup.funding} raised
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={handleFollow}
                    variant={isFollowing ? "secondary" : "default"}
                    className={`${isFollowing 
                      ? "bg-gray-200 text-gray-800 hover:bg-gray-300 border-gray-300" 
                      : "bg-white text-[#0F7377] hover:bg-white/90 border-white"
                    } font-semibold shadow-lg`}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                  <Button
                    onClick={handleSave}
                    variant="outline"
                    className="border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-[#0F7377] font-semibold shadow-lg"
                  >
                    <Bookmark className="h-4 w-4 mr-2" />
                    {isSaved ? "Saved" : "Save"}
                  </Button>
                  <Button
                    onClick={handleShare}
                    variant="outline"
                    className="border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-[#0F7377] font-semibold shadow-lg"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button asChild className="bg-white text-[#0F7377] hover:bg-white/90 font-semibold shadow-lg">
                      <a href={startup.website} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                        Website
                      </a>
                    </Button>
                </div>
              </div>
            </div>
                  </div>
                </div>
              </div>
              
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Key Metrics */}
              <Card>
                <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Key Metrics
                </CardTitle>
                </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-[#0F7377]">{startup.keyMetrics.customers.toLocaleString()}</div>
                    <div className="text-xs text-gray-600">Customers</div>
                        </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">${(startup.keyMetrics.revenue / 1000000).toFixed(1)}M</div>
                    <div className="text-xs text-gray-600">ARR</div>
                      </div>
            </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Growth Rate</span>
                    <span className="font-semibold text-green-600">+{startup.keyMetrics.growth}%</span>
                      </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">MRR</span>
                    <span className="font-semibold">${startup.keyMetrics.mrr.toLocaleString()}</span>
                    </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Churn Rate</span>
                    <span className="font-semibold text-red-600">{startup.keyMetrics.churn}%</span>
                      </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">LTV</span>
                    <span className="font-semibold">${startup.keyMetrics.ltv.toLocaleString()}</span>
                    </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">CAC</span>
                    <span className="font-semibold">${startup.keyMetrics.cac.toLocaleString()}</span>
                      </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Runway</span>
                    <span className="font-semibold">{startup.keyMetrics.runway} months</span>
                    </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Valuation</span>
                    <span className="font-semibold">${(startup.keyMetrics.valuation / 1000000).toFixed(0)}M</span>
                      </div>
                    </div>
                
                <div className="pt-3 border-t">
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">Customer Satisfaction</span>
                      </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-500 h-2 rounded-full" 
                        style={{ width: `${(startup.keyMetrics.satisfaction / 5) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold">{startup.keyMetrics.satisfaction}/5</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

            {/* Contact Information */}
              <Card>
                <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Contact
                </CardTitle>
                </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <a href={`mailto:${startup.email}`} className="text-sm hover:text-[#0F7377]">
                    {startup.email}
                  </a>
                        </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <a href={`tel:${startup.phone}`} className="text-sm hover:text-[#0F7377]">
                    {startup.phone}
                  </a>
                      </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-gray-500" />
                  <a href={startup.website} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-[#0F7377]">
                            {startup.website}
                          </a>
                        </div>
                
                {/* Social Media */}
                <div className="pt-4 border-t">
                  <h4 className="text-sm font-medium mb-3">Social Media</h4>
                  <div className="flex gap-3">
                    {startup.socialMedia.linkedin && (
                      <Button size="sm" variant="outline" asChild>
                        <a href={startup.socialMedia.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {startup.socialMedia.twitter && (
                      <Button size="sm" variant="outline" asChild>
                        <a href={startup.socialMedia.twitter} target="_blank" rel="noopener noreferrer">
                          <Twitter className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {startup.socialMedia.facebook && (
                      <Button size="sm" variant="outline" asChild>
                        <a href={startup.socialMedia.facebook} target="_blank" rel="noopener noreferrer">
                          <Facebook className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                  </div>
                </CardContent>
              </Card>

            {/* Business Model & Target Market */}
              <Card>
                <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Business Model
                </CardTitle>
                </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-600">Model</span>
                  <p className="text-sm">{startup.businessModel}</p>
                      </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Target Market</span>
                  <p className="text-sm">{startup.targetMarket}</p>
                  </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Competitive Advantage</span>
                  <p className="text-sm">{startup.competitiveAdvantage}</p>
            </div>
                </CardContent>
              </Card>

            {/* Awards & Recognition */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Awards & Recognition
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {startup.awards.map((award, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Award className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{award}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Office Locations */}
              <Card>
                <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Office Locations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                <div className="space-y-3">
                  {startup.officeLocations.map((office, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-medium text-sm">{office.city}</h4>
                        <Badge variant="outline" className="text-xs">{office.type}</Badge>
                    </div>
                      <p className="text-xs text-gray-600 mb-1">{office.address}</p>
                      <p className="text-xs text-gray-500">{office.employees} employees</p>
                    </div>
                  ))}
                  </div>
                </CardContent>
              </Card>

            {/* Tags */}
              <Card>
                <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="h-5 w-5" />
                  Tags
                  </CardTitle>
                </CardHeader>
                <CardContent>
                <div className="flex flex-wrap gap-2">
                  {startup.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                      </Badge>
                  ))}
                    </div>
                  </CardContent>
                </Card>
            </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-8">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="product">Product</TabsTrigger>
                <TabsTrigger value="market">Market</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
                <TabsTrigger value="culture">Culture</TabsTrigger>
                <TabsTrigger value="jobs">Jobs</TabsTrigger>
                <TabsTrigger value="updates">Updates</TabsTrigger>
                <TabsTrigger value="investors">Investors</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Company Description */}
              <Card>
                <CardHeader>
                    <CardTitle>About {startup.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-700 leading-relaxed">{startup.longDescription}</p>
                </CardContent>
              </Card>

                {/* Founders */}
              <Card>
                <CardHeader>
                    <CardTitle>Founders</CardTitle>
                    <CardDescription>Meet the visionaries behind {startup.name}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {startup.founders.map((founder, index) => (
                        <div key={index} className="flex gap-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={founder.avatar} alt={founder.name} />
                            <AvatarFallback>{founder.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                        <div className="flex-1">
                            <h4 className="font-semibold">{founder.name}</h4>
                            <p className="text-sm text-gray-600 mb-2">{founder.title}</p>
                            <p className="text-sm text-gray-700">{founder.bio}</p>
                            {founder.linkedin && (
                              <Button size="sm" variant="outline" className="mt-2 border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377] hover:text-white" asChild>
                                <a href={founder.linkedin} target="_blank" rel="noopener noreferrer">
                                  <Linkedin className="h-3 w-3 mr-1" />
                                  LinkedIn
                                </a>
                        </Button>
              )}
            </div>
                    </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Milestones */}
                <Card>
                  <CardHeader>
                    <CardTitle>Company Milestones</CardTitle>
                    <CardDescription>Key moments in {startup.name}'s journey</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {startup.milestones.map((milestone, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 rounded-full bg-[#0F7377] flex items-center justify-center text-white text-sm font-semibold">
                              {index + 1}
                    </div>
                    </div>
                          <div className="flex-1">
                            <h4 className="font-semibold">{milestone.title}</h4>
                            <p className="text-sm text-gray-600">{milestone.date}</p>
                            <p className="text-sm text-gray-700 mt-1">{milestone.description}</p>
                    </div>
                          </div>
                        ))}
                  </div>
                </CardContent>
              </Card>
        </TabsContent>

              <TabsContent value="product" className="space-y-6">
            <Card>
              <CardHeader>
                    <CardTitle>{startup.product.name}</CardTitle>
                    <CardDescription>{startup.product.description}</CardDescription>
              </CardHeader>
                  <CardContent className="space-y-6">
                      <div>
                      <h4 className="font-semibold mb-3">Key Features</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {startup.product.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
          </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Pricing</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="border rounded-lg p-4">
                          <h5 className="font-medium">Starter</h5>
                          <p className="text-2xl font-bold text-[#0F7377]">{startup.product.pricing.starter}</p>
            </div>
                        <div className="border rounded-lg p-4">
                          <h5 className="font-medium">Professional</h5>
                          <p className="text-2xl font-bold text-[#0F7377]">{startup.product.pricing.professional}</p>
                      </div>
                        <div className="border rounded-lg p-4">
                          <h5 className="font-medium">Enterprise</h5>
                          <p className="text-2xl font-bold text-[#0F7377]">{startup.product.pricing.enterprise}</p>
                        </div>
                      </div>
            </div>

                    <div>
                      <h4 className="font-semibold mb-3">Integrations</h4>
                      <div className="flex flex-wrap gap-2">
                        {startup.product.integrations.map((integration, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {integration}
                          </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
              </TabsContent>

              <TabsContent value="market" className="space-y-6">
            <Card>
                  <CardHeader>
                    <CardTitle>Market Analysis</CardTitle>
                    <CardDescription>Market opportunity and competitive landscape</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-[#0F7377]">${(startup.market.totalAddressableMarket / 1000000000).toFixed(0)}B</div>
                        <div className="text-sm text-gray-600">TAM</div>
                </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">${(startup.market.serviceableAddressableMarket / 1000000000).toFixed(0)}B</div>
                        <div className="text-sm text-gray-600">SAM</div>
          </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">${(startup.market.serviceableObtainableMarket / 1000000).toFixed(0)}M</div>
                        <div className="text-sm text-gray-600">SOM</div>
              </div>
            </div>

                    <div>
                      <h4 className="font-semibold mb-3">Target Market</h4>
                      <p className="text-gray-700">{startup.targetMarket}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Competitive Advantage</h4>
                      <p className="text-gray-700">{startup.competitiveAdvantage}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Key Competitors</h4>
                      <div className="flex flex-wrap gap-2">
                        {startup.market.competition.map((competitor, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {competitor}
                          </Badge>
                        ))}
                    </div>
                  </div>

                    <div>
                      <h4 className="font-semibold mb-3">Technology Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {startup.technologyStack.map((tech, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              </TabsContent>

              <TabsContent value="team" className="space-y-6">
              <Card>
                <CardHeader>
                    <CardTitle>Our Team</CardTitle>
                    <CardDescription>Meet the talented people behind {startup.name}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {startup.team.map((member, index) => (
                        <div key={index} className="text-center">
                          <Avatar className="h-20 w-20 mx-auto mb-3">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <h4 className="font-semibold">{member.name}</h4>
                          <p className="text-sm text-gray-600">{member.role}</p>
                          <p className="text-xs text-gray-500">{member.department}</p>
                    </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
              </TabsContent>

              <TabsContent value="culture" className="space-y-6">
              <Card>
                <CardHeader>
                    <CardTitle>Company Culture</CardTitle>
                    <CardDescription>Our values, perks, and team diversity</CardDescription>
                </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3">Core Values</h4>
                      <div className="flex flex-wrap gap-2">
                        {startup.culture.values.map((value, index) => (
                          <Badge key={index} variant="outline" className="text-sm">
                            {value}
                          </Badge>
                        ))}
                    </div>
                  </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Employee Perks</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {startup.culture.perks.map((perk, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm">{perk}</span>
                          </div>
                        ))}
                      </div>
            </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-[#0F7377]">{startup.culture.teamSize}</div>
                        <div className="text-sm text-gray-600">Team Size</div>
                  </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{startup.culture.averageAge}</div>
                        <div className="text-sm text-gray-600">Avg Age</div>
                  </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{startup.culture.diversity.gender.female}%</div>
                        <div className="text-sm text-gray-600">Female</div>
                  </div>
                </div>
              </CardContent>
            </Card>
              </TabsContent>

              <TabsContent value="jobs" className="space-y-6">
            <Card>
              <CardHeader>
                    <CardTitle>Open Positions</CardTitle>
                    <CardDescription>Join our growing team at {startup.name}</CardDescription>
              </CardHeader>
              <CardContent>
                    {jobsLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0F7377]"></div>
                        <span className="ml-2 text-gray-600">Loading jobs...</span>
                    </div>
                    ) : startupJobs.length === 0 ? (
                      <div className="text-center py-8">
                        <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Open Positions</h3>
                        <p className="text-gray-600 mb-4">This startup doesn't have any active job postings at the moment.</p>
                        <Button asChild>
                          <Link href="/jobs/find-startup-jobs">Browse All Jobs</Link>
              </Button>
                  </div>
                    ) : (
                      <div className="space-y-4">
                        {startupJobs.slice(0, showAllJobs ? startupJobs.length : 2).map((job) => (
                          <div key={job.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-3">
                      <div>
                                <h4 className="font-semibold text-lg">{job.title}</h4>
                                <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                                  <span className="flex items-center gap-1">
                                    <Briefcase className="h-4 w-4" />
                                    {job.department}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    {job.type}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    {job.location}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <DollarSign className="h-4 w-4" />
                                    {job.salary}
                                  </span>
                    </div>
                  </div>
                    <div className="flex items-center gap-2 mb-3">
                      {job.visaSponsorship && (
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Visa Sponsorship
                        </Badge>
                      )}
                      {job.featured && (
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                    </div>
                              <Button 
                                size="sm" 
                                className="bg-[#0F7377] hover:bg-[#0F7377]/90 text-white font-semibold"
                                asChild
                              >
                                <Link href={`/jobs/find-startup-jobs?job=${job.id}`}>
                                  Apply Now
                                </Link>
              </Button>
            </div>
                            <p className="text-gray-700 mb-3">{job.description}</p>
                      <div>
                              <h5 className="font-medium mb-2">Requirements:</h5>
                              <ul className="text-sm text-gray-600 space-y-1">
                        {job.requirements.map((req: string, index: number) => (
                                  <li key={index} className="flex items-center gap-2">
                                    <CheckCircle className="h-3 w-3 text-green-500" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                            <div className="mt-3 text-xs text-gray-500">
                              Posted on {job.posted}
                    </div>
                          </div>
                        ))}
                        
                        {startupJobs.length > 2 && (
                          <div className="text-center mt-4">
                            <Button
                              variant="outline"
                              onClick={() => setShowAllJobs(!showAllJobs)}
                              className="border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377] hover:text-white font-semibold"
                            >
                              {showAllJobs ? "Show Less" : `View All ${startupJobs.length} Positions`}
                              {showAllJobs ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
                            </Button>
            </div>
                        )}
          </div>
                    )}
                  </CardContent>
                </Card>
        </TabsContent>

              <TabsContent value="updates" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Company Updates</CardTitle>
                    <CardDescription>Latest news and announcements from {startup.name}</CardDescription>
                  </CardHeader>
                  <CardContent>
          <div className="space-y-6">
                      {startup.updates.slice(0, showAllUpdates ? startup.updates.length : 2).map((update) => (
                        <div key={update.id} className="border-l-4 border-[#0F7377] pl-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold">{update.title}</h4>
                            <Badge variant="outline" className="text-xs">
                              {update.type}
                            </Badge>
            </div>
                          <p className="text-gray-700 mb-2">{update.content}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>By {update.author}</span>
                          <span>•</span>
                          <span>{update.date}</span>
                      </div>
                    </div>
                      ))}
                    </div>
                    {startup.updates.length > 2 && (
                      <div className="text-center mt-4">
                        <Button
                          variant="outline"
                          onClick={() => setShowAllUpdates(!showAllUpdates)}
                          className="border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377] hover:text-white font-semibold"
                        >
                          {showAllUpdates ? "Show Less" : `View All ${startup.updates.length} Updates`}
                          {showAllUpdates ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
                      </Button>
                    </div>
                    )}
                  </CardContent>
                </Card>
        </TabsContent>

              <TabsContent value="investors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Investors</CardTitle>
                <CardDescription>Companies and individuals backing {startup.name}</CardDescription>
              </CardHeader>
              <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {startup.investors.map((investor, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                        <Image
                              src={investor.logo}
                          alt={investor.name}
                              width={64}
                              height={64}
                              className="object-contain"
                        />
                      </div>
                          <div className="flex-1">
                            <h4 className="font-semibold">{investor.name}</h4>
                            <p className="text-sm text-gray-600">{investor.type}</p>
                            {investor.website && (
                              <Button size="sm" variant="outline" className="mt-2 border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377] hover:text-white" asChild>
                                <a href={investor.website} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-3 w-3 mr-1" />
                                  Website
                                </a>
                              </Button>
                            )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
          </div>
        </div>

        {/* Similar Startups */}
        <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Similar Startups</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {startup.similarStartups.map((similarStartup) => (
              <Card key={similarStartup.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={similarStartup.logo}
                        alt={similarStartup.name}
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">{similarStartup.name}</h4>
                      <p className="text-sm text-gray-600">{similarStartup.industry}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-4">{similarStartup.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      {similarStartup.stage} • {similarStartup.funding}
                  </div>
                    <Button size="sm" variant="outline" className="border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377] hover:text-white font-semibold" asChild>
                      <Link href={`/network/startups/${similarStartup.id}`}>
                        View Profile
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </Link>
                  </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}