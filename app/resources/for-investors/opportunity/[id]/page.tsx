"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft,
  Download,
  Share2,
  Bookmark,
  BookmarkCheck,
  Heart,
  Phone,
  Mail,
  Calendar,
  Clock,
  MapPin,
  Users,
  Building2,
  DollarSign,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Target,
  Shield,
  Award,
  Trophy,
  Medal,
  Crown,
  Gem,
  Sparkles,
  Star,
  Eye,
  MousePointer,
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
  Upload,
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
  XCircle,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Minus,
  Edit,
  Trash2,
  MoreHorizontal,
  Settings,
  HelpCircle,
  Info,
  AlertCircle,
  CheckCircle,
  XCircle as XCircleIcon,
  Lightbulb,
  Zap,
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
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
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
  Globe,
  Send,
  CheckCircle as CheckCircleIcon,
  AlertCircle as AlertCircleIcon,
  Info as InfoIcon
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function InvestmentOpportunityPage({ params }: { params: { id: string } }) {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("overview")
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isInterested, setIsInterested] = useState(false)

  // Mock data - in real app, this would come from API
  const opportunity = {
    id: params.id,
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
    dueDiligence: "/due-diligence/techflow-ai.pdf",
    website: "https://techflow-ai.com",
    linkedin: "https://linkedin.com/company/techflow-ai",
    twitter: "https://twitter.com/techflow_ai",
    founders: [
      {
        name: "Sarah Chen",
        title: "CEO & Co-Founder",
        background: "Former Google AI researcher, PhD in Computer Science from Stanford",
        linkedin: "https://linkedin.com/in/sarah-chen"
      },
      {
        name: "Michael Rodriguez",
        title: "CTO & Co-Founder",
        background: "Former Microsoft engineer, 10+ years in enterprise software",
        linkedin: "https://linkedin.com/in/michael-rodriguez"
      }
    ],
    businessModel: "SaaS subscription with enterprise licensing",
    marketSize: "$45B TAM",
    competitiveAdvantage: "Proprietary AI algorithms and enterprise-grade security",
    useOfFunds: "Product development (40%), Sales & Marketing (35%), Operations (25%)",
    milestones: [
      "Q1 2024: Launch enterprise security features",
      "Q2 2024: Expand to European markets",
      "Q3 2024: Achieve $5M ARR",
      "Q4 2024: Series B preparation"
    ],
    financials: {
      revenue: {
        "2021": "$0.2M",
        "2022": "$0.8M",
        "2023": "$2.1M",
        "2024": "$5.0M (projected)"
      },
      customers: {
        "2021": 5,
        "2022": 25,
        "2023": 78,
        "2024": 150
      },
      employees: {
        "2021": 8,
        "2022": 18,
        "2023": 45,
        "2024": 85
      }
    },
    risks: [
      "Competition from established players",
      "Regulatory changes in AI space",
      "Customer acquisition costs",
      "Technology scalability challenges"
    ],
    opportunities: [
      "Large addressable market",
      "Strong product-market fit",
      "Experienced founding team",
      "Growing enterprise AI adoption"
    ]
  }

  const handleDownloadPitchDeck = () => {
    toast({
      title: "Downloading Pitch Deck",
      description: "Pitch deck download started...",
    })
  }

  const handleDownloadFinancialModel = () => {
    toast({
      title: "Downloading Financial Model",
      description: "Financial model download started...",
    })
  }

  const handleDownloadDueDiligence = () => {
    toast({
      title: "Downloading Due Diligence",
      description: "Due diligence report download started...",
    })
  }

  const handleExpressInterest = () => {
    setIsInterested(!isInterested)
    toast({
      title: isInterested ? "Interest Removed" : "Interest Expressed",
      description: isInterested ? "Your interest has been removed." : "Your interest has been recorded. We'll contact you soon.",
    })
  }

  const handleScheduleCall = () => {
    toast({
      title: "Scheduling Call",
      description: "Opening calendar to schedule a call...",
    })
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    toast({
      title: isBookmarked ? "Bookmark Removed" : "Bookmarked",
      description: isBookmarked ? "Opportunity removed from bookmarks." : "Opportunity added to bookmarks.",
    })
  }

  const handleShare = () => {
    toast({
      title: "Shared",
      description: "Opportunity link copied to clipboard.",
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
                <Link href="/resources/for-investors">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Opportunities
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{opportunity.company}</h1>
                <p className="text-sm text-gray-600">{opportunity.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleBookmark}>
                {isBookmarked ? (
                  <BookmarkCheck className="h-4 w-4 mr-2" />
                ) : (
                  <Bookmark className="h-4 w-4 mr-2" />
                )}
                {isBookmarked ? 'Bookmarked' : 'Bookmark'}
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90" onClick={handleExpressInterest}>
                <Heart className="h-4 w-4 mr-2" />
                {isInterested ? 'Interested' : 'Express Interest'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
                <TabsTrigger value="business">Business</TabsTrigger>
                <TabsTrigger value="financials">Financials</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Company Overview</CardTitle>
                    <CardDescription>Key information about the investment opportunity</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-600">Stage</span>
                          <Badge variant="outline">{opportunity.stage}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-600">Sector</span>
                          <span className="text-sm">{opportunity.sector}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-600">Location</span>
                          <span className="text-sm">{opportunity.location}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-600">Founded</span>
                          <span className="text-sm">{opportunity.founded}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-600">Employees</span>
                          <span className="text-sm">{opportunity.employees}</span>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-600">Funding Goal</span>
                          <span className="text-sm font-semibold">{opportunity.fundingGoal}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-600">Current Raise</span>
                          <span className="text-sm font-semibold">{opportunity.currentRaise}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-600">Valuation</span>
                          <span className="text-sm font-semibold">{opportunity.valuation}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-600">Expected ROI</span>
                          <span className="text-sm font-semibold text-green-600">{opportunity.expectedROI}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-600">Risk Level</span>
                          <Badge variant={opportunity.riskLevel === 'Low' ? 'default' : opportunity.riskLevel === 'Medium' ? 'secondary' : 'destructive'}>
                            {opportunity.riskLevel}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Revenue & Growth</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">Current Revenue</p>
                            <p className="text-2xl font-bold text-[#0F7377]">{opportunity.revenue}</p>
                          </div>
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">Growth Rate</p>
                            <p className="text-2xl font-bold text-green-600">{opportunity.growth}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Investment Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">Minimum Investment</p>
                            <p className="text-xl font-bold">{opportunity.minInvestment}</p>
                          </div>
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">Maximum Investment</p>
                            <p className="text-xl font-bold">{opportunity.maxInvestment}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Current Investors</h4>
                        <div className="flex flex-wrap gap-2">
                          {opportunity.investors.map((investor) => (
                            <Badge key={investor} variant="secondary">
                              {investor}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Tags</h4>
                        <div className="flex flex-wrap gap-2">
                          {opportunity.tags.map((tag) => (
                            <Badge key={tag} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Team Tab */}
              <TabsContent value="team" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Founding Team</CardTitle>
                    <CardDescription>Meet the founders and key team members</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {opportunity.founders.map((founder, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg">
                        <div className="w-16 h-16 bg-[#0F7377] rounded-full flex items-center justify-center">
                          <User className="h-8 w-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg">{founder.name}</h4>
                          <p className="text-[#0F7377] font-medium">{founder.title}</p>
                          <p className="text-gray-600 text-sm mt-2">{founder.background}</p>
                          <div className="flex items-center space-x-2 mt-3">
                            <Button variant="outline" size="sm" asChild>
                              <a href={founder.linkedin} target="_blank" rel="noopener noreferrer">
                                <LinkIcon className="h-4 w-4 mr-1" />
                                LinkedIn
                              </a>
                            </Button>
                            <Button variant="outline" size="sm">
                              <Mail className="h-4 w-4 mr-1" />
                              Contact
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Business Tab */}
              <TabsContent value="business" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Business Model & Market</CardTitle>
                    <CardDescription>Understanding the business and market opportunity</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Business Model</h4>
                        <p className="text-gray-600">{opportunity.businessModel}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Market Size</h4>
                        <p className="text-gray-600">{opportunity.marketSize}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Competitive Advantage</h4>
                        <p className="text-gray-600">{opportunity.competitiveAdvantage}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Use of Funds</h4>
                        <p className="text-gray-600">{opportunity.useOfFunds}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Key Milestones</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {opportunity.milestones.map((milestone, index) => (
                            <li key={index} className="text-gray-600">{milestone}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-2">Risks</h4>
                          <ul className="list-disc list-inside space-y-1">
                            {opportunity.risks.map((risk, index) => (
                              <li key={index} className="text-gray-600">{risk}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Opportunities</h4>
                          <ul className="list-disc list-inside space-y-1">
                            {opportunity.opportunities.map((opportunity, index) => (
                              <li key={index} className="text-gray-600">{opportunity}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Financials Tab */}
              <TabsContent value="financials" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Financial Performance</CardTitle>
                    <CardDescription>Revenue, customer, and employee growth over time</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-semibold mb-4">Revenue Growth</h4>
                        <div className="space-y-2">
                          {Object.entries(opportunity.financials.revenue).map(([year, revenue]) => (
                            <div key={year} className="flex justify-between">
                              <span className="text-sm text-gray-600">{year}</span>
                              <span className="text-sm font-medium">{revenue}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-4">Customer Growth</h4>
                        <div className="space-y-2">
                          {Object.entries(opportunity.financials.customers).map(([year, customers]) => (
                            <div key={year} className="flex justify-between">
                              <span className="text-sm text-gray-600">{year}</span>
                              <span className="text-sm font-medium">{customers}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-4">Team Growth</h4>
                        <div className="space-y-2">
                          {Object.entries(opportunity.financials.employees).map(([year, employees]) => (
                            <div key={year} className="flex justify-between">
                              <span className="text-sm text-gray-600">{year}</span>
                              <span className="text-sm font-medium">{employees}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Documents Tab */}
              <TabsContent value="documents" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Investment Documents</CardTitle>
                    <CardDescription>Download pitch deck, financial model, and due diligence materials</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center space-x-3 mb-3">
                          <FileText className="h-8 w-8 text-[#0F7377]" />
                          <div>
                            <h4 className="font-semibold">Pitch Deck</h4>
                            <p className="text-sm text-gray-600">Company presentation</p>
                          </div>
                        </div>
                        <Button 
                          className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90"
                          onClick={handleDownloadPitchDeck}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </Button>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center space-x-3 mb-3">
                          <BarChart3 className="h-8 w-8 text-[#0F7377]" />
                          <div>
                            <h4 className="font-semibold">Financial Model</h4>
                            <p className="text-sm text-gray-600">Financial projections</p>
                          </div>
                        </div>
                        <Button 
                          className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90"
                          onClick={handleDownloadFinancialModel}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download Excel
                        </Button>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center space-x-3 mb-3">
                          <Shield className="h-8 w-8 text-[#0F7377]" />
                          <div>
                            <h4 className="font-semibold">Due Diligence</h4>
                            <p className="text-sm text-gray-600">Legal & financial review</p>
                          </div>
                        </div>
                        <Button 
                          className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90"
                          onClick={handleDownloadDueDiligence}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90" 
                  onClick={handleExpressInterest}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  {isInterested ? 'Interested' : 'Express Interest'}
                </Button>
                <Button variant="outline" className="w-full" onClick={handleScheduleCall}>
                  <Phone className="h-4 w-4 mr-2" />
                  Schedule Call
                </Button>
                <Button variant="outline" className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline" className="w-full" onClick={handleBookmark}>
                  {isBookmarked ? (
                    <BookmarkCheck className="h-4 w-4 mr-2" />
                  ) : (
                    <Bookmark className="h-4 w-4 mr-2" />
                  )}
                  {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Investment Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Status</span>
                  <Badge variant={opportunity.status === 'Active' ? 'default' : 'secondary'}>
                    {opportunity.status}
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Deadline</span>
                  <span className="font-medium">{opportunity.deadline}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Min Investment</span>
                  <span className="font-medium">{opportunity.minInvestment}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Max Investment</span>
                  <span className="font-medium">{opportunity.maxInvestment}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Expected ROI</span>
                  <span className="font-medium text-green-600">{opportunity.expectedROI}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Risk Level</span>
                  <Badge variant={opportunity.riskLevel === 'Low' ? 'default' : opportunity.riskLevel === 'Medium' ? 'secondary' : 'destructive'}>
                    {opportunity.riskLevel}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Company Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full" asChild>
                  <a href={opportunity.website} target="_blank" rel="noopener noreferrer">
                    <Globe className="h-4 w-4 mr-2" />
                    Website
                  </a>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <a href={opportunity.linkedin} target="_blank" rel="noopener noreferrer">
                    <LinkIcon className="h-4 w-4 mr-2" />
                    LinkedIn
                  </a>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <a href={opportunity.twitter} target="_blank" rel="noopener noreferrer">
                    <LinkIcon className="h-4 w-4 mr-2" />
                    Twitter
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
