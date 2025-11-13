"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { 
  Search, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Users, 
  Building2, 
  Star,
  Clock,
  Award,
  ExternalLink,
  ArrowRight,
  MessageCircle,
  Send,
  X,
  Plus,
  CheckCircle,
  AlertCircle,
  Shield,
  Eye,
  Filter,
  SortAsc,
  SortDesc,
  RefreshCw,
  Download,
  Upload,
  Bell,
  Mail,
  Phone,
  Video,
  Globe,
  FileText,
  BarChart3,
  TrendingUp,
  Zap,
  Heart,
  Settings,
  Lock,
  User,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Bookmark,
  Share2,
  LinkIcon
} from "lucide-react"
import Link from "next/link"

export default function IncubatorsAcceleratorsPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [selectedStage, setSelectedStage] = useState("all")
  const [selectedIndustry, setSelectedIndustry] = useState("all")
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [viewMode, setViewMode] = useState<"cards" | "list">("cards")
  const [sortBy, setSortBy] = useState<"rating" | "successRate" | "alumni" | "name">("rating")
  const [selectedProgram, setSelectedProgram] = useState<any>(null)
  const [showProgramDetails, setShowProgramDetails] = useState(false)
  
  // Communication Hub Integration
  const [activeConversation, setActiveConversation] = useState<any>(null)
  const [conversations, setConversations] = useState<any[]>([])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  
  // Vetting System
  const [showVettingPanel, setShowVettingPanel] = useState(false)
  const [vettingProgram, setVettingProgram] = useState<any>(null)
  const [vettingNotes, setVettingNotes] = useState("")
  const [vettingStatus, setVettingStatus] = useState("pending") // pending, approved, rejected

  // Screen size detection
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Communication handlers
  const handleConnect = async (program: any) => {
    try {
      const conversation = {
        id: `conv-${program.id}`,
        participant: program,
        lastMessage: null,
        unreadCount: 0,
        createdAt: new Date(),
        status: 'connected',
        type: 'program'
      }
      
      setConversations(prev => {
        const existing = prev.find(conv => conv.id === conversation.id)
        if (!existing) {
          return [...prev, conversation]
        }
        return prev
      })
      
      setActiveConversation(conversation)
      
      toast({
        title: "Connection Request Sent",
        description: `Connection request sent to ${program.name}. Conversation started.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send connection request. Please try again.",
        variant: "destructive"
      })
    }
  }

  const handleMessage = async (program: any) => {
    try {
      const conversation = {
        id: `conv-${program.id}`,
        participant: program,
        lastMessage: null,
        unreadCount: 0,
        createdAt: new Date(),
        status: 'messaging',
        type: 'program'
      }
      
      setConversations(prev => {
        const existing = prev.find(conv => conv.id === conversation.id)
        if (!existing) {
          return [...prev, conversation]
        }
        return prev
      })
      
      setActiveConversation(conversation)
      
      toast({
        title: "Conversation Started",
        description: `Started conversation with ${program.name}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start conversation. Please try again.",
        variant: "destructive"
      })
    }
  }

  const handleVetProgram = (program: any) => {
    setVettingProgram(program)
    setShowVettingPanel(true)
  }

  const handleVettingSubmit = () => {
    // In a real app, this would update the program status in the database
    toast({
      title: "Vetting Complete",
      description: `Program ${vettingProgram.name} has been ${vettingStatus}.`,
    })
    setShowVettingPanel(false)
    setVettingProgram(null)
    setVettingNotes("")
  }

  // Enhanced mock data for incubators and accelerators
  const programs = [
    {
      id: 1,
      name: "GrowthLab",
      type: "Accelerator",
      location: "Singapore",
      duration: "12 weeks",
      investment: "$150K for 6-8% equity",
      cohortSize: 15,
      description: "Leading startup accelerator focused on Southeast Asian startups with global potential. We provide intensive mentorship, funding, and access to our extensive network of investors and industry experts.",
      focus: ["Fintech", "E-commerce", "SaaS", "Healthtech"],
      rating: 4.9,
      verified: true,
      image: "/placeholder.svg?height=80&width=80&query=growthlab logo",
      nextCohort: "September 2025",
      successRate: "85%",
      alumni: 120,
      website: "https://growthlab.sg",
      applicationDeadline: "August 15, 2025",
      requirements: ["MVP ready", "2+ founders", "Full-time commitment"],
      benefits: ["$150K funding", "Mentorship", "Office space", "Investor network"],
      industries: ["Fintech", "E-commerce", "SaaS", "Healthtech"],
      stage: "Seed to Series A",
      teamSize: "2-5 founders",
      timezone: "UTC+8",
      languages: ["English"],
      contactEmail: "apply@growthlab.sg",
      linkedin: "https://linkedin.com/company/growthlab-sg",
      twitter: "https://twitter.com/growthlab_sg"
    },
    {
      id: 2,
      name: "Block71 Singapore",
      type: "Incubator",
      location: "Singapore",
      duration: "6-12 months",
      investment: "No equity, workspace provided",
      cohortSize: 50,
      description: "NUS Enterprise's flagship startup incubator supporting early-stage tech companies. We provide workspace, mentorship, and access to NUS research and talent pool.",
      focus: ["Deep Tech", "AI/ML", "Biotech", "Clean Tech"],
      rating: 4.7,
      verified: true,
      image: "/placeholder.svg?height=80&width=80&query=block71 logo",
      nextCohort: "Rolling admission",
      successRate: "78%",
      alumni: 300,
      website: "https://block71.sg",
      applicationDeadline: "Rolling",
      requirements: ["Innovative tech", "NUS affiliation preferred", "Team of 2+"],
      benefits: ["Free workspace", "Mentorship", "Research access", "Talent pool"],
      industries: ["Deep Tech", "AI/ML", "Biotech", "Clean Tech"],
      stage: "Idea to MVP",
      teamSize: "1-4 founders",
      timezone: "UTC+8",
      languages: ["English"],
      contactEmail: "hello@block71.sg",
      linkedin: "https://linkedin.com/company/block71",
      twitter: "https://twitter.com/block71sg"
    },
    {
      id: 3,
      name: "Antler Singapore",
      type: "Accelerator",
      location: "Singapore",
      duration: "6 months",
      investment: "$25K for 10% equity",
      cohortSize: 25,
      description: "Global startup generator and early-stage venture capital firm. We help founders build and scale their startups from day one with funding, mentorship, and global network access.",
      focus: ["AI/ML", "SaaS", "Marketplace", "Fintech"],
      rating: 4.6,
      verified: true,
      image: "/placeholder.svg?height=80&width=80&query=antler logo",
      nextCohort: "October 2025",
      successRate: "82%",
      alumni: 200,
      website: "https://antler.co",
      applicationDeadline: "September 30, 2025",
      requirements: ["Strong team", "Innovative idea", "Global ambition"],
      benefits: ["$25K funding", "Global network", "Mentorship", "Co-working space"],
      industries: ["AI/ML", "SaaS", "Marketplace", "Fintech"],
      stage: "Pre-seed to Seed",
      teamSize: "2-4 founders",
      timezone: "UTC+8",
      languages: ["English"],
      contactEmail: "singapore@antler.co",
      linkedin: "https://linkedin.com/company/antler-co",
      twitter: "https://twitter.com/antler_co"
    },
    {
      id: 4,
      name: "500 Startups SEA",
      type: "Accelerator",
      location: "Singapore",
      duration: "4 months",
      investment: "$50K for 5% equity",
      cohortSize: 30,
      description: "Global venture capital firm and seed accelerator with focus on emerging markets. We provide intensive mentorship, funding, and access to our global network of founders and investors.",
      focus: ["B2B", "Marketplace", "AI/ML", "E-commerce"],
      rating: 4.8,
      verified: true,
      image: "/placeholder.svg?height=80&width=80&query=500 startups logo",
      nextCohort: "November 2025",
      successRate: "80%",
      alumni: 150,
      website: "https://500.co",
      applicationDeadline: "October 15, 2025",
      requirements: ["Traction", "Revenue", "Team of 2+", "Global potential"],
      benefits: ["$50K funding", "Global network", "Mentorship", "Demo day"],
      industries: ["B2B", "Marketplace", "AI/ML", "E-commerce"],
      stage: "Seed to Series A",
      teamSize: "2-6 founders",
      timezone: "UTC+8",
      languages: ["English"],
      contactEmail: "sea@500.co",
      linkedin: "https://linkedin.com/company/500-startups",
      twitter: "https://twitter.com/500startups"
    },
    {
      id: 5,
      name: "JTC LaunchPad",
      type: "Incubator",
      location: "Singapore",
      duration: "12-24 months",
      investment: "No equity, subsidized workspace",
      cohortSize: 100,
      description: "JTC's innovation hub supporting startups in advanced manufacturing and urban solutions. We provide specialized facilities, industry connections, and government support for hardware and manufacturing startups.",
      focus: ["Manufacturing", "Urban Tech", "IoT", "Robotics"],
      rating: 4.5,
      verified: true,
      image: "/placeholder.svg?height=80&width=80&query=jtc logo",
      nextCohort: "Rolling admission",
      successRate: "75%",
      alumni: 500,
      website: "https://launchpad.jtc.gov.sg",
      applicationDeadline: "Rolling",
      requirements: ["Hardware focus", "Manufacturing innovation", "Singapore-based"],
      benefits: ["Subsidized workspace", "Industry connections", "Government support", "Prototyping facilities"],
      industries: ["Manufacturing", "Urban Tech", "IoT", "Robotics"],
      stage: "Prototype to MVP",
      teamSize: "1-8 founders",
      timezone: "UTC+8",
      languages: ["English"],
      contactEmail: "launchpad@jtc.gov.sg",
      linkedin: "https://linkedin.com/company/jtc-corporation",
      twitter: "https://twitter.com/jtc_corp"
    },
    {
      id: 6,
      name: "Plug and Play Singapore",
      type: "Accelerator",
      location: "Singapore",
      duration: "3 months",
      investment: "No equity, corporate connections",
      cohortSize: 20,
      description: "Global innovation platform connecting startups with corporate partners. We facilitate partnerships between startups and Fortune 500 companies for pilot programs and commercial opportunities.",
      focus: ["Fintech", "Insurtech", "Supply Chain", "Retail"],
      rating: 4.4,
      verified: true,
      image: "/placeholder.svg?height=80&width=80&query=plug and play logo",
      nextCohort: "December 2025",
      successRate: "70%",
      alumni: 80,
      website: "https://plugandplaytechcenter.com",
      applicationDeadline: "November 30, 2025",
      requirements: ["B2B focus", "Corporate-ready", "Proven technology"],
      benefits: ["Corporate partnerships", "Pilot opportunities", "Global network", "No equity taken"],
      industries: ["Fintech", "Insurtech", "Supply Chain", "Retail"],
      stage: "Series A to B",
      teamSize: "3-10 founders",
      timezone: "UTC+8",
      languages: ["English"],
      contactEmail: "singapore@plugandplaytechcenter.com",
      linkedin: "https://linkedin.com/company/plug-and-play-tech-center",
      twitter: "https://twitter.com/plugandplay"
    }
  ]

  const types = [
    { value: "all", label: "All Types" },
    { value: "accelerator", label: "Accelerators" },
    { value: "incubator", label: "Incubators" },
    { value: "pre-accelerator", label: "Pre-Accelerators" }
  ]

  const locations = [
    { value: "all", label: "All Locations" },
    { value: "singapore", label: "Singapore" },
    { value: "indonesia", label: "Indonesia" },
    { value: "malaysia", label: "Malaysia" },
    { value: "thailand", label: "Thailand" },
    { value: "vietnam", label: "Vietnam" },
    { value: "philippines", label: "Philippines" }
  ]

  const stages = [
    { value: "all", label: "All Stages" },
    { value: "idea", label: "Idea Stage" },
    { value: "mvp", label: "MVP Stage" },
    { value: "seed", label: "Seed Stage" },
    { value: "series a", label: "Series A" },
    { value: "series b", label: "Series B" }
  ]

  const industries = [
    { value: "all", label: "All Industries" },
    { value: "fintech", label: "Fintech" },
    { value: "ai/ml", label: "AI/ML" },
    { value: "saas", label: "SaaS" },
    { value: "e-commerce", label: "E-commerce" },
    { value: "healthtech", label: "Healthtech" },
    { value: "biotech", label: "Biotech" },
    { value: "manufacturing", label: "Manufacturing" },
    { value: "iot", label: "IoT" },
    { value: "marketplace", label: "Marketplace" }
  ]

  const filteredPrograms = programs.filter(program => {
    const matchesSearch = searchTerm === "" || 
                         program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.focus.some(focus => focus.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesType = selectedType === "all" || program.type.toLowerCase().includes(selectedType)
    const matchesLocation = selectedLocation === "all" || program.location.toLowerCase().includes(selectedLocation)
    const matchesStage = selectedStage === "all" || program.stage.toLowerCase().includes(selectedStage)
    const matchesIndustry = selectedIndustry === "all" || 
                           program.industries.some(industry => industry.toLowerCase().includes(selectedIndustry))
    
    return matchesSearch && matchesType && matchesLocation && matchesStage && matchesIndustry
  }).sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating
      case "successRate":
        return parseFloat(b.successRate) - parseFloat(a.successRate)
      case "alumni":
        return b.alumni - a.alumni
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-lg font-bold text-gray-900">Incubators & Accelerators</h1>
          </div>
          <div className="flex items-center gap-2">
            {conversations.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveConversation(conversations[0])}
                className="relative"
              >
                <MessageCircle className="h-4 w-4" />
                {conversations.length > 1 && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#0F7377] text-white rounded-full flex items-center justify-center">
                    <span className="text-xs font-semibold">{conversations.length}</span>
                  </div>
                )}
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-4">Incubators & Accelerators</h1>
            <p className="text-lg text-gray-600 mb-6">
              Discover incubators and accelerators in Southeast Asia that can help your startup grow and succeed. 
              Find the right program that matches your stage, industry, and goals.
            </p>
          </div>
          <Button 
            size="lg" 
            className="bg-green-600 hover:bg-green-700"
            onClick={() => window.location.href = '/network/incubators-accelerators/register'}
          >
            <Building2 className="w-5 h-5 mr-2" />
            Register Your Program
          </Button>
        </div>
      </div>

      {/* Enhanced Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search programs by name, focus area, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Program Type" />
            </SelectTrigger>
            <SelectContent>
              {types.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => (
                <SelectItem key={location.value} value={location.value}>
                  {location.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="flex items-center gap-2"
          >
            <Search className="h-4 w-4" />
            Advanced Filters
          </Button>
        </div>

        {/* Advanced Filters Panel */}
        {showAdvancedFilters && (
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Stage</label>
                <Select value={selectedStage} onValueChange={setSelectedStage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {stages.map((stage) => (
                      <SelectItem key={stage.value} value={stage.value}>
                        {stage.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Industry</label>
                <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry.value} value={industry.value}>
                        {industry.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Sort By</label>
                <Select value={sortBy} onValueChange={(value) => setSortBy(value as "rating" | "successRate" | "alumni" | "name")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rating</SelectItem>
                    <SelectItem value="successRate">Success Rate</SelectItem>
                    <SelectItem value="alumni">Most Alumni</SelectItem>
                    <SelectItem value="name">Name A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Building2 className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Total Programs</p>
                <p className="text-2xl font-bold">{programs.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Active Startups</p>
                <p className="text-2xl font-bold">240+</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Award className="w-8 h-8 text-purple-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold">78%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <DollarSign className="w-8 h-8 text-yellow-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Total Funding</p>
                <p className="text-2xl font-bold">$2.1B</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrograms.map((program) => (
          <Card key={program.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={program.image}
                    alt={program.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {program.name}
                      {program.verified && (
                        <Badge variant="secondary" className="text-xs">Verified</Badge>
                      )}
                    </CardTitle>
                    <p className="text-sm text-gray-600 capitalize">{program.type}</p>
                  </div>
                </div>
                <div className="flex items-center text-sm">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  {program.rating}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-700">{program.description}</p>
              
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-1" />
                {program.location}
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-1" />
                {program.duration}
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <DollarSign className="w-4 h-4 mr-1" />
                {program.investment}
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <Users className="w-4 h-4 mr-1" />
                {program.cohortSize} startups per cohort
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-1" />
                Next: {program.nextCohort}
              </div>
              
              <div className="flex flex-wrap gap-1">
                {program.focus.map((focus) => (
                  <Badge key={focus} variant="outline" className="text-xs">
                    {focus}
                  </Badge>
                ))}
              </div>
              
              <div className="pt-2 space-y-2">
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Success Rate: {program.successRate}</span>
                  <span>{program.alumni} alumni</span>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => {
                      setSelectedProgram(program)
                      setShowProgramDetails(true)
                    }}
                  >
                    View Details
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleConnect(program)}
                    className="text-[#0F7377] border-[#0F7377] hover:bg-[#0F7377] hover:text-white"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleMessage(program)}
                    className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredPrograms.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No programs found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search criteria or filters to find more programs.
          </p>
          <Button onClick={() => {
            setSearchTerm("")
            setSelectedType("all")
            setSelectedLocation("all")
          }}>
            Clear Filters
          </Button>
        </div>
      )}

      {/* Program Comparison */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Compare Programs</h2>
        <div className="bg-gray-50 rounded-lg p-6">
          <p className="text-gray-600 mb-4">
            Not sure which program is right for you? Compare different accelerators and incubators 
            based on your specific needs and goals.
          </p>
          <Button>
            Compare Programs
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Accelerate Your Startup?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Get personalized recommendations for incubators and accelerators that match your startup's 
          stage, industry, and funding needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-green-600 hover:bg-green-700">
            Get Program Recommendations
          </Button>
          <Button size="lg" variant="outline">
            Schedule a Consultation
          </Button>
        </div>
      </div>
      </div>
      {/* Program Details Modal */}
      {selectedProgram && (
        <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 ${showProgramDetails ? 'block' : 'hidden'}`}>
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedProgram.image}
                      alt={selectedProgram.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h2 className="text-2xl font-bold">{selectedProgram.name}</h2>
                        {selectedProgram.verified && (
                          <Badge variant="secondary" className="text-xs">Verified</Badge>
                        )}
                      </div>
                      <p className="text-gray-600 capitalize">{selectedProgram.type}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {selectedProgram.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          {selectedProgram.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setShowProgramDetails(false)}>
                    ✕
                  </Button>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">About</h3>
                  <p className="text-gray-700">{selectedProgram.description}</p>
                </div>

                {/* Key Information Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-semibold mb-3">Program Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span>{selectedProgram.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Investment:</span>
                        <span>{selectedProgram.investment}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Cohort Size:</span>
                        <span>{selectedProgram.cohortSize} startups</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Next Cohort:</span>
                        <span>{selectedProgram.nextCohort}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Success Rate:</span>
                        <span>{selectedProgram.successRate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Alumni:</span>
                        <span>{selectedProgram.alumni} companies</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Requirements & Benefits</h3>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium mb-1">Requirements</h4>
                        <div className="flex flex-wrap gap-1">
                          {selectedProgram.requirements.map((req: string) => (
                            <Badge key={req} variant="outline" className="text-xs">
                              {req}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-1">Benefits</h4>
                        <div className="flex flex-wrap gap-1">
                          {selectedProgram.benefits.map((benefit: string) => (
                            <Badge key={benefit} variant="secondary" className="text-xs">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Focus Areas */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Focus Areas</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProgram.focus.map((focus: string) => (
                      <Badge key={focus} variant="outline">
                        {focus}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Contact & Links */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Contact & Links</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-600" />
                        <span className="text-sm">Deadline: {selectedProgram.applicationDeadline}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-600" />
                        <span className="text-sm">Team Size: {selectedProgram.teamSize}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-600" />
                        <span className="text-sm">Timezone: {selectedProgram.timezone}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {selectedProgram.website && (
                        <div className="flex items-center gap-2">
                          <ExternalLink className="h-4 w-4 text-blue-600" />
                          <a href={selectedProgram.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                            Visit Website
                          </a>
                        </div>
                      )}
                      {selectedProgram.linkedin && (
                        <div className="flex items-center gap-2">
                          <ExternalLink className="h-4 w-4 text-blue-600" />
                          <a href={selectedProgram.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                            LinkedIn
                          </a>
                        </div>
                      )}
                      {selectedProgram.twitter && (
                        <div className="flex items-center gap-2">
                          <ExternalLink className="h-4 w-4 text-blue-600" />
                          <a href={selectedProgram.twitter} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                            Twitter
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 pt-6 border-t">
                  <Button variant="outline" onClick={() => setShowProgramDetails(false)}>
                    Close
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => handleConnect(selectedProgram)}
                    className="text-[#0F7377] border-[#0F7377] hover:bg-[#0F7377] hover:text-white"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Connect
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => handleMessage(selectedProgram)}
                    className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700">
                    Apply Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Communication Hub Integration */}
      {activeConversation && (
        <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          {/* Conversation Header */}
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-[#0F7377] to-[#0F7377]/90 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Building2 className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{activeConversation.participant.name}</h3>
                  <p className="text-xs text-white/80">{activeConversation.participant.type} • {activeConversation.participant.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                  onClick={() => setActiveConversation(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Conversation Content */}
          <div className="h-64 flex flex-col">
            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 bg-[#0F7377]/10 rounded-full flex items-center justify-center">
                    <Building2 className="h-3 w-3 text-[#0F7377]" />
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                    <p className="text-sm text-gray-700">
                      Hi! I'm interested in learning more about your {activeConversation.participant.type.toLowerCase()} program. 
                      Could you tell me more about the application process?
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Just now</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2 justify-end">
                  <div className="bg-[#0F7377] text-white rounded-lg p-3 max-w-xs">
                    <p className="text-sm">
                      Hello! I'd be happy to provide more information about our program. 
                      We focus on {activeConversation.participant.focus?.join(', ')} startups.
                    </p>
                    <p className="text-xs text-white/80 mt-1">Just now</p>
                  </div>
                  <div className="w-6 h-6 bg-[#0F7377] rounded-full flex items-center justify-center">
                    <span className="text-xs font-semibold text-white">You</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Conversations List - Mobile */}
      {conversations.length > 0 && (
        <div className="lg:hidden fixed bottom-20 right-4 w-72 bg-white rounded-lg shadow-xl border border-gray-200 z-40">
          <div className="p-3 border-b border-gray-200">
            <h3 className="font-semibold text-sm text-gray-900">Active Conversations</h3>
          </div>
          <div className="max-h-48 overflow-y-auto">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                  activeConversation?.id === conversation.id ? 'bg-[#0F7377]/5' : ''
                }`}
                onClick={() => setActiveConversation(conversation)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#0F7377]/10 rounded-full flex items-center justify-center">
                    <Building2 className="h-4 w-4 text-[#0F7377]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {conversation.participant.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {conversation.participant.type} • {conversation.participant.location}
                    </p>
                  </div>
                  {conversation.unreadCount > 0 && (
                    <div className="w-5 h-5 bg-[#0F7377] text-white rounded-full flex items-center justify-center">
                      <span className="text-xs font-semibold">{conversation.unreadCount}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Desktop Conversation Indicator */}
      {conversations.length > 0 && (
        <div className="hidden lg:block fixed bottom-6 right-6 z-40">
          <div className="bg-white rounded-full shadow-lg border border-gray-200 p-3">
            <Button
              variant="ghost"
              size="sm"
              className="relative"
              onClick={() => setActiveConversation(conversations[0])}
            >
              <MessageCircle className="h-6 w-6 text-[#0F7377]" />
              {conversations.length > 1 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#0F7377] text-white rounded-full flex items-center justify-center">
                  <span className="text-xs font-semibold">{conversations.length}</span>
                </div>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Vetting Panel - GrowthLab Employee Only */}
      {showVettingPanel && vettingProgram && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Vet Program</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowVettingPanel(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">{vettingProgram.name}</h3>
                <p className="text-gray-600">{vettingProgram.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Program Type</Label>
                  <p className="text-sm text-gray-600">{vettingProgram.type}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Location</Label>
                  <p className="text-sm text-gray-600">{vettingProgram.location}</p>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Vetting Notes</Label>
                <textarea
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
                  rows={4}
                  value={vettingNotes}
                  onChange={(e) => setVettingNotes(e.target.value)}
                  placeholder="Add your vetting notes here..."
                />
              </div>
              
              <div>
                <Label className="text-sm font-medium">Status</Label>
                <div className="flex gap-2 mt-2">
                  <Button
                    variant={vettingStatus === 'approved' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setVettingStatus('approved')}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                  <Button
                    variant={vettingStatus === 'rejected' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setVettingStatus('rejected')}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowVettingPanel(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleVettingSubmit}
                className="bg-[#0F7377] hover:bg-[#0F7377]/90"
              >
                Submit Vetting
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50">
        <div className="flex justify-around">
          <Button variant="ghost" className="flex flex-col items-center space-y-1 p-2">
            <Building2 className="w-5 h-5 text-gray-600" />
            <span className="text-xs font-medium text-gray-600">Programs</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center space-y-1 p-2">
            <Search className="w-5 h-5 text-gray-600" />
            <span className="text-xs font-medium text-gray-600">Search</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex flex-col items-center space-y-1 p-2 relative"
            onClick={() => setActiveConversation(conversations[0])}
          >
            <MessageCircle className="w-5 h-5 text-gray-600" />
            <span className="text-xs font-medium text-gray-600">Messages</span>
            {conversations.length > 0 && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#0F7377] text-white rounded-full flex items-center justify-center">
                <span className="text-xs font-semibold">{conversations.length}</span>
              </div>
            )}
          </Button>
          <Button variant="ghost" className="flex flex-col items-center space-y-1 p-2">
            <Settings className="w-5 h-5 text-gray-600" />
            <span className="text-xs font-medium text-gray-600">Settings</span>
          </Button>
        </div>
      </div>

      {/* Bottom padding for mobile navigation */}
      <div className="lg:hidden h-20"></div>
    </div>
  )
}
