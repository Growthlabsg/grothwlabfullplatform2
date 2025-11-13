"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft,
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  Target,
  Users,
  Building2,
  Globe,
  Shield,
  Award,
  Trophy,
  Medal,
  Crown,
  Gem,
  Sparkles,
  Star,
  Heart,
  Eye,
  MousePointer,
  Calendar,
  Clock,
  Mail,
  Send,
  Download,
  Upload,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  Settings,
  HelpCircle,
  Info,
  AlertCircle,
  CheckCircle,
  XCircle,
  Lightbulb,
  Zap,
  FileText,
  Image,
  Video,
  Link as LinkIcon,
  ChevronDown,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw,
  RotateCw,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  MessageCircle,
  Reply,
  Flag,
  Archive,
  Tag,
  Folder,
  FolderOpen,
  RefreshCw,
  Save,
  Copy,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Move,
  Grid,
  List,
  Layout,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Quote,
  Link2,
  Unlink,
  Table,
  Columns,
  Rows,
  PlusCircle,
  MinusCircle,
  XCircle as XCircleIcon,
  CheckCircle2,
  AlertTriangle,
  User,
  UserPlus,
  UserMinus,
  UserCheck,
  UserX,
  Bell,
  BellOff,
  Lock,
  Unlock,
  ExternalLink,
  Share2,
  Bookmark,
  BookmarkCheck,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  BookOpen,
  Rocket,
  Code2,
  Database,
  Server,
  Cloud,
  Wifi,
  WifiOff,
  Database as DatabaseIcon,
  Server as ServerIcon,
  Cloud as CloudIcon,
  Wifi as WifiIcon,
  WifiOff as WifiOffIcon
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function ForInvestorsPage() {
  const { toast } = useToast()
  const [isMobile, setIsMobile] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showInvestmentOpportunities, setShowInvestmentOpportunities] = useState(false)
  const [showPortfolio, setShowPortfolio] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [showReports, setShowReports] = useState(false)
  const [showDueDiligence, setShowDueDiligence] = useState(false)
  const [showDealFlow, setShowDealFlow] = useState(false)
  const [showMarketInsights, setShowMarketInsights] = useState(false)
  const [showEvents, setShowEvents] = useState(false)
  const [showResources, setShowResources] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const stats = [
    { label: "Total Investments", value: "$2.4B", icon: DollarSign, change: "+15.2%", trend: "up" },
    { label: "Portfolio Companies", value: "156", icon: Building2, change: "+8", trend: "up" },
    { label: "Active Deals", value: "23", icon: Target, change: "+3", trend: "up" },
    { label: "Success Rate", value: "78%", icon: Trophy, change: "+5%", trend: "up" },
    { label: "Avg. ROI", value: "12.4x", icon: TrendingUp, change: "+2.1x", trend: "up" },
    { label: "Exit Events", value: "34", icon: Award, change: "+7", trend: "up" }
  ]

  const categories = [
    { id: "all", name: "All Opportunities", count: 156 },
    { id: "seed", name: "Seed Stage", count: 45 },
    { id: "series-a", name: "Series A", count: 32 },
    { id: "series-b", name: "Series B", count: 28 },
    { id: "growth", name: "Growth Stage", count: 25 },
    { id: "late", name: "Late Stage", count: 18 },
    { id: "exit", name: "Exit Opportunities", count: 8 }
  ]

  const investmentOpportunities = [
    {
      id: 1,
      company: "TechFlow AI",
      description: "AI-powered workflow automation platform for enterprise clients",
      stage: "Series A",
      category: "series-a",
      fundingGoal: "$15M",
      currentRaise: "$8.2M",
      valuation: "$45M",
      investors: ["Accel", "Sequoia", "Andreessen Horowitz"],
      location: "San Francisco, CA",
      founded: "2021",
      employees: 45,
      revenue: "$2.1M ARR",
      growth: "+340% YoY",
      status: "Active",
      deadline: "2024-03-15",
      minInvestment: "$100K",
      maxInvestment: "$2M",
      expectedROI: "8-12x",
      riskLevel: "Medium",
      sector: "AI/ML",
      tags: ["AI", "Enterprise", "SaaS", "Automation"],
      pitchDeck: "/pitch-decks/techflow-ai.pdf",
      financialModel: "/financial-models/techflow-ai.xlsx",
      dueDiligence: "/due-diligence/techflow-ai.pdf"
    },
    {
      id: 2,
      company: "GreenEnergy Solutions",
      description: "Renewable energy storage and management systems",
      stage: "Series B",
      category: "series-b",
      fundingGoal: "$25M",
      currentRaise: "$18.5M",
      valuation: "$120M",
      investors: ["Kleiner Perkins", "General Catalyst", "Bessemer"],
      location: "Austin, TX",
      founded: "2020",
      employees: 78,
      revenue: "$8.7M ARR",
      growth: "+280% YoY",
      status: "Active",
      deadline: "2024-04-20",
      minInvestment: "$250K",
      maxInvestment: "$5M",
      expectedROI: "6-10x",
      riskLevel: "Medium-High",
      sector: "CleanTech",
      tags: ["Renewable Energy", "Storage", "Sustainability", "B2B"],
      pitchDeck: "/pitch-decks/greenenergy-solutions.pdf",
      financialModel: "/financial-models/greenenergy-solutions.xlsx",
      dueDiligence: "/due-diligence/greenenergy-solutions.pdf"
    },
    {
      id: 3,
      company: "HealthTech Innovations",
      description: "AI-driven diagnostic tools for early disease detection",
      stage: "Growth",
      category: "growth",
      fundingGoal: "$40M",
      currentRaise: "$32M",
      valuation: "$200M",
      investors: ["GV", "Lightspeed", "Index Ventures"],
      location: "Boston, MA",
      founded: "2019",
      employees: 120,
      revenue: "$15.2M ARR",
      growth: "+420% YoY",
      status: "Active",
      deadline: "2024-05-10",
      minInvestment: "$500K",
      maxInvestment: "$10M",
      expectedROI: "10-15x",
      riskLevel: "Low-Medium",
      sector: "HealthTech",
      tags: ["Healthcare", "AI", "Diagnostics", "Medical Devices"],
      pitchDeck: "/pitch-decks/healthtech-innovations.pdf",
      financialModel: "/financial-models/healthtech-innovations.xlsx",
      dueDiligence: "/due-diligence/healthtech-innovations.pdf"
    },
    {
      id: 4,
      company: "FinTech Pro",
      description: "Blockchain-based payment processing and financial services",
      stage: "Series A",
      category: "series-a",
      fundingGoal: "$20M",
      currentRaise: "$12M",
      valuation: "$80M",
      investors: ["Andreessen Horowitz", "Coinbase Ventures", "Paradigm"],
      location: "New York, NY",
      founded: "2022",
      employees: 35,
      revenue: "$1.8M ARR",
      growth: "+520% YoY",
      status: "Active",
      deadline: "2024-03-30",
      minInvestment: "$150K",
      maxInvestment: "$3M",
      expectedROI: "12-20x",
      riskLevel: "High",
      sector: "FinTech",
      tags: ["Blockchain", "Payments", "Crypto", "Financial Services"],
      pitchDeck: "/pitch-decks/fintech-pro.pdf",
      financialModel: "/financial-models/fintech-pro.xlsx",
      dueDiligence: "/due-diligence/fintech-pro.pdf"
    }
  ]

  const portfolioCompanies = [
    {
      id: 1,
      name: "DataFlow Analytics",
      stage: "Series B",
      investmentDate: "2022-03-15",
      investmentAmount: "$5M",
      currentValuation: "$45M",
      ownership: "12.5%",
      currentValue: "$5.6M",
      multiple: "1.12x",
      status: "Active",
      sector: "Data Analytics",
      location: "Seattle, WA",
      employees: 65,
      revenue: "$8.2M ARR",
      growth: "+180% YoY"
    },
    {
      id: 2,
      name: "CloudSecure",
      stage: "Growth",
      investmentDate: "2021-08-20",
      investmentAmount: "$8M",
      currentValuation: "$120M",
      ownership: "8.3%",
      currentValue: "$10M",
      multiple: "1.25x",
      status: "Active",
      sector: "Cybersecurity",
      location: "San Francisco, CA",
      employees: 95,
      revenue: "$18.5M ARR",
      growth: "+220% YoY"
    },
    {
      id: 3,
      name: "EcoTech Solutions",
      stage: "Exit",
      investmentDate: "2020-05-10",
      investmentAmount: "$3M",
      exitValuation: "$85M",
      ownership: "15%",
      exitValue: "$12.75M",
      multiple: "4.25x",
      status: "Exited",
      sector: "CleanTech",
      location: "Denver, CO",
      employees: 45,
      revenue: "$12.3M ARR",
      growth: "+150% YoY"
    }
  ]

  const marketInsights = [
    {
      id: 1,
      title: "AI Investment Trends Q1 2024",
      description: "Analysis of AI startup funding patterns and market opportunities",
      category: "Market Research",
      publishDate: "2024-01-15",
      author: "Investment Team",
      readTime: "8 min",
      views: 1247,
      likes: 89,
      tags: ["AI", "Market Analysis", "Trends"],
      content: "Comprehensive analysis of AI investment trends..."
    },
    {
      id: 2,
      title: "CleanTech Sector Outlook",
      description: "Growth opportunities in renewable energy and sustainability",
      category: "Sector Analysis",
      publishDate: "2024-01-10",
      author: "Research Team",
      readTime: "12 min",
      views: 892,
      likes: 67,
      tags: ["CleanTech", "Sustainability", "Energy"],
      content: "Deep dive into CleanTech investment opportunities..."
    },
    {
      id: 3,
      title: "FinTech Regulatory Update",
      description: "Impact of new regulations on FinTech investments",
      category: "Regulatory",
      publishDate: "2024-01-08",
      author: "Legal Team",
      readTime: "6 min",
      views: 634,
      likes: 45,
      tags: ["FinTech", "Regulation", "Compliance"],
      content: "Latest regulatory changes affecting FinTech investments..."
    }
  ]

  const events = [
    {
      id: 1,
      title: "Investor Summit 2024",
      description: "Annual gathering of top investors and portfolio companies",
      date: "2024-03-15",
      time: "9:00 AM - 6:00 PM",
      location: "San Francisco, CA",
      type: "Conference",
      attendees: 500,
      status: "Upcoming",
      registrationUrl: "/events/investor-summit-2024"
    },
    {
      id: 2,
      title: "Portfolio Company Demo Day",
      description: "Showcase of latest innovations from portfolio companies",
      date: "2024-02-28",
      time: "2:00 PM - 5:00 PM",
      location: "Virtual",
      type: "Demo Day",
      attendees: 200,
      status: "Upcoming",
      registrationUrl: "/events/demo-day-feb-2024"
    },
    {
      id: 3,
      title: "Market Trends Webinar",
      description: "Discussion on emerging market trends and opportunities",
      date: "2024-02-15",
      time: "11:00 AM - 12:00 PM",
      location: "Virtual",
      type: "Webinar",
      attendees: 150,
      status: "Upcoming",
      registrationUrl: "/events/market-trends-webinar"
    }
  ]

  const filteredOpportunities = investmentOpportunities.filter(opportunity => {
    const matchesSearch = opportunity.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         opportunity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         opportunity.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         opportunity.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || opportunity.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleViewOpportunity = (opportunityId: number) => {
    toast({
      title: "Viewing Opportunity",
      description: "Opening investment opportunity details...",
    })
  }

  const handleDownloadPitchDeck = (opportunityId: number) => {
    toast({
      title: "Downloading Pitch Deck",
      description: "Pitch deck download started...",
    })
  }

  const handleDownloadFinancialModel = (opportunityId: number) => {
    toast({
      title: "Downloading Financial Model",
      description: "Financial model download started...",
    })
  }

  const handleDownloadDueDiligence = (opportunityId: number) => {
    toast({
      title: "Downloading Due Diligence",
      description: "Due diligence report download started...",
    })
  }

  const handleExpressInterest = (opportunityId: number) => {
    toast({
      title: "Interest Expressed",
      description: "Your interest has been recorded. We'll contact you soon.",
    })
  }

  const handleScheduleCall = (opportunityId: number) => {
    toast({
      title: "Scheduling Call",
      description: "Opening calendar to schedule a call...",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/resources">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Resources
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">For Investors</h1>
                <p className="text-sm text-gray-600">Investment opportunities and portfolio management</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowPortfolio(true)}>
                <Building2 className="h-4 w-4 mr-2" />
                My Portfolio
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowAnalytics(true)}>
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-xs ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </p>
                  </div>
                  <div className="p-2 bg-[#0F7377]/10 rounded-lg">
                    <stat.icon className="h-6 w-6 text-[#0F7377]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Opportunities */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Investment Opportunities</CardTitle>
                  <CardDescription>Latest deals available for investment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {investmentOpportunities.slice(0, 3).map((opportunity) => (
                    <div key={opportunity.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold">{opportunity.company}</h4>
                        <p className="text-sm text-gray-600">{opportunity.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <span>{opportunity.stage}</span>
                          <span>{opportunity.fundingGoal} goal</span>
                          <span>{opportunity.expectedROI} ROI</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={opportunity.status === 'Active' ? 'default' : 'secondary'}>
                          {opportunity.status}
                        </Badge>
                        <Button variant="ghost" size="sm" onClick={() => handleViewOpportunity(opportunity.id)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Portfolio Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Performance</CardTitle>
                  <CardDescription>Your investment portfolio overview</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {portfolioCompanies.slice(0, 3).map((company) => (
                    <div key={company.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold">{company.name}</h4>
                        <p className="text-sm text-gray-600">{company.sector}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <span>{company.stage}</span>
                          <span>{company.multiple} multiple</span>
                          <span>{company.growth}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={company.status === 'Active' ? 'default' : 'secondary'}>
                          {company.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Opportunities Tab */}
          <TabsContent value="opportunities" className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search investment opportunities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name} ({category.count})
                    </option>
                  ))}
                </select>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>

            {/* Investment Opportunities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOpportunities.map((opportunity) => (
                <Card key={opportunity.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-[#0F7377] transition-colors">
                          {opportunity.company}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">{opportunity.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={opportunity.status === 'Active' ? 'default' : 'secondary'}>
                          {opportunity.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Stage</span>
                        <Badge variant="outline">{opportunity.stage}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Funding Goal</span>
                        <span className="font-medium">{opportunity.fundingGoal}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Current Raise</span>
                        <span className="font-medium">{opportunity.currentRaise}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Valuation</span>
                        <span className="font-medium">{opportunity.valuation}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Expected ROI</span>
                        <span className="font-medium text-green-600">{opportunity.expectedROI}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Risk Level</span>
                        <Badge variant={opportunity.riskLevel === 'Low' ? 'default' : opportunity.riskLevel === 'Medium' ? 'secondary' : 'destructive'}>
                          {opportunity.riskLevel}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Deadline</span>
                        <span>{opportunity.deadline}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {opportunity.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Button
                          size="sm"
                          onClick={() => handleViewOpportunity(opportunity.id)}
                          className="bg-[#0F7377] hover:bg-[#0F7377]/90 flex-1 mr-2"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleExpressInterest(opportunity.id)}
                          className="flex-1"
                        >
                          <Heart className="h-4 w-4 mr-1" />
                          Express Interest
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadPitchDeck(opportunity.id)}
                          className="flex-1 mr-1"
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Pitch Deck
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadFinancialModel(opportunity.id)}
                          className="flex-1 mr-1"
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          Financial Model
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleScheduleCall(opportunity.id)}
                          className="flex-1"
                        >
                          <Phone className="h-4 w-4 mr-1" />
                          Schedule Call
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Investment Portfolio</CardTitle>
                <CardDescription>Your current investment portfolio and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Company</th>
                        <th className="text-left py-3 px-4">Stage</th>
                        <th className="text-left py-3 px-4">Investment</th>
                        <th className="text-left py-3 px-4">Current Value</th>
                        <th className="text-left py-3 px-4">Multiple</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {portfolioCompanies.map((company) => (
                        <tr key={company.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium">{company.name}</p>
                              <p className="text-sm text-gray-600">{company.sector}</p>
                              <p className="text-xs text-gray-500">{company.location}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4">{company.stage}</td>
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium">{company.investmentAmount}</p>
                              <p className="text-xs text-gray-600">{company.ownership} ownership</p>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium">{company.currentValue}</p>
                              <p className="text-xs text-gray-600">{company.currentValuation} valuation</p>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{company.multiple}</span>
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-green-500 h-2 rounded-full" 
                                  style={{ width: `${Math.min(parseFloat(company.multiple) * 20, 100)}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant={company.status === 'Active' ? 'default' : 'secondary'}>
                              {company.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {marketInsights.map((insight) => (
                <Card key={insight.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{insight.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{insight.description}</p>
                      </div>
                      <Badge variant="outline">{insight.category}</Badge>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Author</span>
                        <span>{insight.author}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Published</span>
                        <span>{insight.publishDate}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Read Time</span>
                        <span>{insight.readTime}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Views</span>
                        <span>{insight.views.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {insight.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                        <Eye className="h-4 w-4 mr-1" />
                        Read More
                      </Button>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <Card key={event.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                      </div>
                      <Badge variant={event.status === 'Upcoming' ? 'default' : 'secondary'}>
                        {event.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Date</span>
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Time</span>
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Location</span>
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Type</span>
                        <Badge variant="outline">{event.type}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Attendees</span>
                        <span>{event.attendees.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                        <Calendar className="h-4 w-4 mr-1" />
                        Register
                      </Button>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Investment Resources</h3>
              <p className="text-gray-500 mb-4">Access investment guides, templates, and tools</p>
              <Button className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                <FileText className="h-4 w-4 mr-2" />
                Browse Resources
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
