"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { 
  Handshake, 
  Users, 
  Calendar, 
  Award, 
  Rocket, 
  Globe, 
  Building2,
  Lightbulb,
  ArrowRight,
  CheckCircle,
  Clock,
  MapPin,
  BarChart3,
  Target,
  Star,
  Zap,
  Shield,
  Briefcase,
  GraduationCap,
  Link2,
  Network,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Heart,
  Share2,
  Bookmark,
  Eye,
  Download,
  ExternalLink,
  Phone,
  Mail,
  MessageSquare,
  Send,
  X,
  Plus,
  Check,
  AlertCircle,
  Info,
  Settings,
  Bell,
  BookOpen,
  User,
  Users2,
  Building,
  Landmark,
  Scale,
  FileText,
  TrendingUp,
  Activity,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Bookmark as BookmarkIcon,
  PieChart,
  TrendingDown,
  Activity as ActivityIcon,
  Handshake as HandshakeIcon,
  Lightbulb as LightbulbIcon,
  Target as TargetIcon,
  Zap as ZapIcon,
  GraduationCap as GraduationCapIcon,
  BookOpen as BookOpenIcon,
  Brain,
  Compass,
  Rocket as RocketIcon,
  Shield as ShieldIcon2,
  Sparkles,
  Trophy,
  UserCheck,
  Workflow,
  Headphones,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Play,
  Pause,
  StopCircle,
  Download as DownloadIcon,
  Upload as UploadIcon,
  Copy,
  Edit,
  Trash2,
  Archive,
  Flag as FlagIcon,
  MoreVertical,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Maximize2,
  Minimize2,
  RotateCcw,
  Grid,
  List,
  Layout,
  Sidebar,
  PanelLeft,
  PanelRight,
  Split,
  Columns,
  Rows,
  Square,
  Circle,
  Triangle,
  Hexagon,
  Octagon,
  Diamond,
  Smile,
  Frown,
  Meh,
  Laugh,
  Angry,
  Glasses,
  HardHat,
  Construction,
  Wrench,
  Hammer,
  Drill,
  Ruler,
  Compass as CompassIcon,
  Map,
  Navigation,
  Route,
  MapPin as MapPinIcon,
  Pin,
  Flag as FlagIcon2,
  Crosshair,
  Target as TargetIcon2,
  Focus,
  ZoomIn,
  ZoomOut,
  Move,
  Move3D,
  Rotate3D,
  Scale as ScaleIcon,
  Expand,
  Plus as PlusIcon,
  Minus,
  Percent,
  Infinity,
  Pi,
  Sigma
} from "lucide-react"

export default function PartnershipProgrammesPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("corporate")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState("grid")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [savedProgrammes, setSavedProgrammes] = useState<number[]>([])
  const [showFilters, setShowFilters] = useState(false)

  // Screen size detection
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Load saved programmes
  useEffect(() => {
    const saved = localStorage.getItem('savedPartnershipProgrammes')
    if (saved) {
      setSavedProgrammes(JSON.parse(saved))
    }
  }, [])

  const handleSaveProgramme = (programmeId: number) => {
    const newSaved = savedProgrammes.includes(programmeId)
      ? savedProgrammes.filter(id => id !== programmeId)
      : [...savedProgrammes, programmeId]
    
    setSavedProgrammes(newSaved)
    localStorage.setItem('savedPartnershipProgrammes', JSON.stringify(newSaved))
    
    toast({
      title: savedProgrammes.includes(programmeId) ? "Removed from Saved" : "Added to Saved",
      description: savedProgrammes.includes(programmeId) 
        ? "Programme removed from your saved list" 
        : "Programme added to your saved list",
    })
  }

  const handleShareProgramme = (programme: any) => {
    if (navigator.share) {
      navigator.share({
        title: programme.title,
        text: programme.description,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link Copied",
        description: "Programme link copied to clipboard",
      })
    }
  }

  const handleExplorePartnership = (programme: any) => {
    toast({
      title: "Partnership Exploration Started",
      description: `Starting partnership exploration for ${programme.title}`,
    })
    // Here you would typically redirect to partnership exploration form
  }

  const handleLearnMore = (programme: any) => {
    toast({
      title: "Programme Details",
      description: `Loading detailed information for ${programme.title}`,
    })
    // Here you would typically open a detailed modal or redirect to details page
  }

  // Partnership programmes data
  const partnershipProgrammes = {
    corporate: [
      {
        id: 1,
        title: "Corporate Innovation Partnership",
        subtitle: "Bridging Startups and Enterprise",
        description: "Strategic partnerships between innovative startups and established corporations to drive digital transformation, innovation, and mutual growth opportunities.",
        duration: "12-24 months",
        investment: "SGD 100K - 1M",
        equity: "5-15%",
        spots: "20 partnerships/year",
        status: "Open for Applications",
        highlights: [
          "Corporate pilot programs",
          "Market access support",
          "Technology validation",
          "Strategic mentorship",
          "Joint go-to-market"
        ],
        requirements: [
          "Proven technology solution",
          "Corporate market fit",
          "Strong team",
          "Scalable business model",
          "Commitment to partnership"
        ],
        partners: [
          "DBS Bank",
          "Singtel",
          "Keppel Corporation",
          "Sembcorp",
          "CapitaLand"
        ],
        focusAreas: ["Fintech", "Telecom", "Real Estate", "Energy", "Healthcare"],
        benefits: [
          "Corporate customer access",
          "Technology validation",
          "Strategic guidance",
          "Network expansion",
          "Investment opportunities"
        ],
        applicationProcess: [
          "Partnership proposal",
          "Corporate review",
          "Technology assessment",
          "Pilot program design",
          "Partnership agreement"
        ],
        deadline: "Rolling basis",
        featured: true,
        category: "Corporate"
      },
      {
        id: 2,
        title: "Enterprise Digital Transformation",
        subtitle: "Modernizing Traditional Industries",
        description: "Collaborative programs to help traditional enterprises embrace digital transformation through startup partnerships and innovative technology solutions.",
        duration: "18-36 months",
        investment: "SGD 500K - 2M",
        equity: "10-20%",
        spots: "15 partnerships/year",
        status: "Open for Applications",
        highlights: [
          "Digital transformation focus",
          "Industry expertise",
          "Change management support",
          "Technology integration",
          "Performance measurement"
        ],
        requirements: [
          "Industry-specific solution",
          "Digital transformation expertise",
          "Proven track record",
          "Scalable platform",
          "Change management skills"
        ],
        partners: [
          "Manufacturing companies",
          "Logistics firms",
          "Retail chains",
          "Healthcare providers",
          "Financial institutions"
        ],
        focusAreas: ["Industry 4.0", "Supply Chain", "Retail Tech", "Health Tech", "Fintech"],
        benefits: [
          "Industry expertise",
          "Market validation",
          "Strategic partnerships",
          "Investment support",
          "Global expansion"
        ],
        applicationProcess: [
          "Industry analysis",
          "Solution assessment",
          "Enterprise matching",
          "Pilot program",
          "Partnership scaling"
        ],
        deadline: "Rolling basis",
        featured: false,
        category: "Corporate"
      }
    ],
    academic: [
      {
        id: 3,
        title: "University-Startup Collaboration",
        subtitle: "Academic Innovation Partnerships",
        description: "Partnerships between startups and universities to commercialize research, develop new technologies, and create innovative solutions for real-world challenges.",
        duration: "24-48 months",
        investment: "SGD 200K - 800K",
        equity: "8-18%",
        spots: "25 partnerships/year",
        status: "Open for Applications",
        highlights: [
          "Research collaboration",
          "IP commercialization",
          "Student engagement",
          "Industry connections",
          "Publication opportunities"
        ],
        requirements: [
          "University affiliation",
          "Research-based innovation",
          "Commercial potential",
          "Experienced team",
          "IP ownership"
        ],
        partners: [
          "National University of Singapore",
          "Nanyang Technological University",
          "Singapore Management University",
          "Singapore University of Technology and Design",
          "International universities"
        ],
        focusAreas: ["Biotechnology", "AI/ML", "Clean Energy", "Materials Science", "Digital Health"],
        benefits: [
          "Research collaboration",
          "IP protection",
          "Academic credibility",
          "Student talent",
          "Government support"
        ],
        applicationProcess: [
          "University endorsement",
          "Research proposal",
          "Commercial assessment",
          "Partnership agreement",
          "Project execution"
        ],
        deadline: "Rolling basis",
        featured: true,
        category: "Academic"
      }
    ],
    international: [
      {
        id: 4,
        title: "Global Market Access",
        subtitle: "International Expansion Support",
        description: "Partnerships to help startups expand into international markets through local partnerships, market access, and regulatory support.",
        duration: "12-24 months",
        investment: "SGD 100K - 500K",
        equity: "5-12%",
        spots: "30 partnerships/year",
        status: "Open for Applications",
        highlights: [
          "Market entry support",
          "Local partnerships",
          "Regulatory guidance",
          "Cultural adaptation",
          "Network expansion"
        ],
        requirements: [
          "Proven local success",
          "International potential",
          "Adaptable solution",
          "Strong team",
          "Market research"
        ],
        partners: [
          "Southeast Asian markets",
          "European markets",
          "North American markets",
          "Australian market",
          "Middle Eastern markets"
        ],
        focusAreas: ["All sectors", "Technology", "E-commerce", "Fintech", "Healthtech"],
        benefits: [
          "Market access",
          "Local expertise",
          "Regulatory support",
          "Network expansion",
          "Investment opportunities"
        ],
        applicationProcess: [
          "Market assessment",
          "Local partner matching",
          "Regulatory review",
          "Pilot program",
          "Market expansion"
        ],
        deadline: "Rolling basis",
        featured: true,
        category: "International"
      },
      {
        id: 5,
        title: "Cross-Border Innovation Hub",
        subtitle: "Regional Innovation Networks",
        description: "Regional innovation hubs connecting startups across borders to share knowledge, resources, and opportunities for collaborative growth.",
        duration: "Ongoing",
        investment: "SGD 50K - 200K",
        equity: "3-8%",
        spots: "50 partnerships/year",
        status: "Open for Applications",
        highlights: [
          "Regional networks",
          "Knowledge sharing",
          "Resource pooling",
          "Collaborative projects",
          "Joint funding"
        ],
        requirements: [
          "Regional presence",
          "Innovation focus",
          "Collaborative mindset",
          "Strong network",
          "Growth potential"
        ],
        partners: [
          "ASEAN startups",
          "Asian innovation hubs",
          "European accelerators",
          "American incubators",
          "African tech hubs"
        ],
        focusAreas: ["All sectors", "Technology transfer", "Knowledge sharing", "Collaborative R&D"],
        benefits: [
          "Regional networks",
          "Knowledge access",
          "Resource sharing",
          "Collaborative opportunities",
          "International exposure"
        ],
        applicationProcess: [
          "Network assessment",
          "Partnership matching",
          "Collaboration design",
          "Project execution",
          "Network expansion"
        ],
        deadline: "Rolling basis",
        featured: false,
        category: "International"
      }
    ]
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open for Applications": return "bg-green-100 text-green-800"
      case "Accepting Applications": return "bg-blue-100 text-blue-800"
      case "Coming Soon": return "bg-yellow-100 text-yellow-800"
      case "Closed": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Corporate": return <Building2 className="w-5 h-5" />
      case "Academic": return <GraduationCap className="w-5 h-5" />
      case "International": return <Globe className="w-5 h-5" />
      default: return <Handshake className="w-5 h-5" />
    }
  }

  const getInvestmentColor = (range: string) => {
    if (range.includes("50K") || range.includes("100K")) return "bg-blue-100 text-blue-800"
    if (range.includes("200K") || range.includes("300K")) return "bg-green-100 text-green-800"
    if (range.includes("500K") || range.includes("800K")) return "bg-yellow-100 text-yellow-800"
    if (range.includes("1M") || range.includes("2M")) return "bg-purple-100 text-purple-800"
    return "bg-gray-100 text-gray-800"
  }

  const allProgrammes = Object.values(partnershipProgrammes).flat()
  
  const filteredProgrammes = allProgrammes.filter(programme => {
    const matchesSearch = programme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         programme.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         programme.category.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = selectedCategory === "all" || programme.category.toLowerCase() === selectedCategory.toLowerCase()
    
    return matchesSearch && matchesCategory
  })

  const sortedProgrammes = filteredProgrammes.sort((a, b) => {
    switch (sortBy) {
      case "investment":
        return parseInt(b.investment.replace(/[^\d]/g, '')) - parseInt(a.investment.replace(/[^\d]/g, ''))
      case "equity":
        return parseInt(a.equity.replace(/[^\d]/g, '')) - parseInt(b.equity.replace(/[^\d]/g, ''))
      case "deadline":
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
      case "featured":
      default:
        return b.featured ? 1 : -1
    }
  })

  const categories = ["all", "Corporate", "Academic", "International"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              onClick={() => window.history.back()}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Partnership Programmes</h1>
              <p className="text-xs text-gray-500">{filteredProgrammes.length} programmes found</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#0F7377] to-[#0F7377]/90 text-white">
        <div className="container mx-auto px-4 py-8 lg:py-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-4 rounded-full">
                <Handshake className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-3xl lg:text-4xl xl:text-6xl font-bold mb-6">
              Partnership Programmes
            </h1>
            <p className="text-lg lg:text-xl xl:text-2xl text-blue-100 mb-8 leading-relaxed">
              Forge strategic partnerships and collaborations to accelerate growth and expand your market reach
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/programmes"
                className="bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                View All Programmes
              </Link>
              <Link
                href="/programmes/partnership/explore"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-[#0F7377] transition-colors"
              >
                Explore Partnerships
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Partnership Statistics */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-2xl md:text-3xl font-bold text-[#0F7377]">200+</div>
              <div className="text-sm md:text-base text-gray-600">Active Partnerships</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl md:text-3xl font-bold text-[#0F7377]">50+</div>
              <div className="text-sm md:text-base text-gray-600">Corporate Partners</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl md:text-3xl font-bold text-[#0F7377]">25+</div>
              <div className="text-sm md:text-base text-gray-600">Countries</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl md:text-3xl font-bold text-[#0F7377]">SGD 100M+</div>
              <div className="text-sm md:text-base text-gray-600">Partnership Value</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search partnership programmes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-md text-sm font-medium bg-white shadow-sm focus:ring-2 focus:ring-[#0F7377] focus:border-[#0F7377]"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-md text-sm font-medium bg-white shadow-sm focus:ring-2 focus:ring-[#0F7377] focus:border-[#0F7377]"
              >
                <option value="featured">Featured</option>
                <option value="investment">Highest Investment</option>
                <option value="equity">Lowest Equity</option>
                <option value="deadline">Application Deadline</option>
              </select>
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden mb-6 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm font-medium bg-white shadow-sm focus:ring-2 focus:ring-[#0F7377] focus:border-[#0F7377]"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm font-medium bg-white shadow-sm focus:ring-2 focus:ring-[#0F7377] focus:border-[#0F7377]"
                  >
                    <option value="featured">Featured</option>
                    <option value="investment">Highest Investment</option>
                    <option value="equity">Lowest Equity</option>
                    <option value="deadline">Application Deadline</option>
                  </select>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedCategory("all")
                      setSortBy("featured")
                    }}
                  >
                    Clear All
                  </Button>
                  <Button
                    className="flex-1 bg-[#0F7377] hover:bg-[#0F7377]/90"
                    onClick={() => setShowFilters(false)}
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Partnership Categories and Content */}
      <div className="bg-white">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="corporate" className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Corporate
                </TabsTrigger>
                <TabsTrigger value="academic" className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Academic
                </TabsTrigger>
                <TabsTrigger value="international" className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  International
                </TabsTrigger>
              </TabsList>
            </div>
            
            {/* Partnership Programmes Content */}
            <div className="py-12">
              {Object.entries(partnershipProgrammes).map(([category, programmes]) => (
                <TabsContent key={category} value={category} className="space-y-8">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      {category === "corporate" ? "Corporate" : category === "academic" ? "Academic" : "International"} Partnership Programmes
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                      {category === "corporate" 
                        ? "Strategic partnerships with established corporations for innovation and growth"
                        : category === "academic"
                        ? "Collaborations with universities to commercialize research and innovation"
                        : "International partnerships for global market expansion and collaboration"
                      }
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {programmes.map((programme) => (
                      <Card key={programme.id} className="border-2 border-[#0F7377]/20 hover:border-[#0F7377]/40 transition-all hover:shadow-lg">
                        <CardHeader className="pb-4">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-[#0F7377]/10 rounded-lg">
                                {getCategoryIcon(programme.category)}
                              </div>
                              <div>
                                <Badge className={getStatusColor(programme.status)}>
                                  {programme.status}
                                </Badge>
                              </div>
                            </div>
                            {programme.featured && (
                              <Star className="w-6 h-6 text-yellow-500 fill-current" />
                            )}
                          </div>
                          
                          <CardTitle className="text-2xl mb-2">{programme.title}</CardTitle>
                          <CardDescription className="text-lg font-medium text-[#0F7377] mb-3">
                            {programme.subtitle}
                          </CardDescription>
                          <p className="text-gray-600 leading-relaxed">
                            {programme.description}
                          </p>
                        </CardHeader>

                        <CardContent className="space-y-6">
                          {/* Partnership Details */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <div className="text-sm text-gray-500">Duration</div>
                              <div className="text-sm font-medium">{programme.duration}</div>
                            </div>
                            <div className="space-y-2">
                              <div className="text-sm text-gray-500">Investment</div>
                              <Badge className={getInvestmentColor(programme.investment)}>
                                {programme.investment}
                              </Badge>
                            </div>
                            <div className="space-y-2">
                              <div className="text-sm text-gray-500">Equity</div>
                              <Badge variant="outline">{programme.equity}</Badge>
                            </div>
                            <div className="space-y-2">
                              <div className="text-sm text-gray-500">Spots</div>
                              <div className="text-sm font-medium">{programme.spots}</div>
                            </div>
                          </div>

                          {/* Highlights */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                              <Lightbulb className="w-4 h-4 text-[#0F7377]" />
                              Key Highlights
                            </h4>
                            <ul className="space-y-2">
                              {programme.highlights.map((highlight, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  {highlight}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Requirements */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                              <Target className="w-4 h-4 text-[#0F7377]" />
                              Requirements
                            </h4>
                            <ul className="space-y-2">
                              {programme.requirements.map((requirement, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  {requirement}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Partners */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                              <Network className="w-4 h-4 text-[#0F7377]" />
                              Partners
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {programme.partners.map((partner, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {partner}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Focus Areas */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                              <Globe className="w-4 h-4 text-[#0F7377]" />
                              Focus Areas
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {programme.focusAreas.map((area, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {area}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Benefits */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                              <Award className="w-4 h-4 text-[#0F7377]" />
                              Benefits
                            </h4>
                            <ul className="space-y-2">
                              {programme.benefits.map((benefit, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Application Process */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                              <Briefcase className="w-4 h-4 text-[#0F7377]" />
                              Application Process
                            </h4>
                            <div className="space-y-2">
                              {programme.applicationProcess.map((step, index) => (
                                <div key={index} className="flex items-center gap-3 text-sm text-gray-600">
                                  <div className="w-6 h-6 bg-[#0F7377] text-white rounded-full flex items-center justify-center text-xs font-bold">
                                    {index + 1}
                                  </div>
                                  {step}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Application Deadline */}
                          {programme.deadline && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                              <div className="flex items-center gap-2 text-yellow-800">
                                <Clock className="w-4 h-4" />
                                <span className="font-medium">Application Deadline: {programme.deadline}</span>
                              </div>
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <Button 
                              className="flex-1 bg-[#0F7377] hover:bg-[#0F7377]/90"
                              onClick={() => handleExplorePartnership(programme)}
                            >
                              Explore Partnership
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                            <Button 
                              variant="outline" 
                              className="flex-1"
                              onClick={() => handleLearnMore(programme)}
                            >
                              Learn More
                            </Button>
                          </div>

                          {/* Additional Action Buttons */}
                          <div className="flex gap-2 pt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleSaveProgramme(programme.id)}
                              className="flex-1"
                            >
                              <Heart className={`h-4 w-4 mr-1 ${savedProgrammes.includes(programme.id) ? 'fill-red-500 text-red-500' : ''}`} />
                              Save
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleShareProgramme(programme)}
                              className="flex-1"
                            >
                              <Share2 className="h-4 w-4 mr-1" />
                              Share
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View Details
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-[#0F7377] to-[#0F7377]/90 text-white py-12 lg:py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">Ready to Build Strategic Partnerships?</h2>
          <p className="text-lg lg:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Connect with our network of partners and unlock new opportunities for growth and innovation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/programmes/partnership/explore"
              className="bg-[#F59E0B] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#F59E0B]/90 transition-colors"
            >
              Explore Partnerships
            </Link>
            <Link
              href="/programmes"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-[#0F7377] transition-colors"
            >
              View All Programmes
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="flex justify-around py-2">
          <Button 
            variant="ghost" 
            className="flex flex-col items-center space-y-1 p-3 text-[#0F7377] hover:bg-[#0F7377]/10 active:bg-[#0F7377]/20"
          >
            <Handshake className="w-5 h-5" />
            <span className="text-xs font-semibold">Partnerships</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex flex-col items-center space-y-1 p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 active:bg-gray-200"
            onClick={() => {
              const searchInput = document.querySelector('input[placeholder="Search partnership programmes..."]') as HTMLInputElement
              if (searchInput) {
                searchInput.focus()
                searchInput.scrollIntoView({ behavior: 'smooth' })
              }
            }}
          >
            <Search className="w-5 h-5" />
            <span className="text-xs font-semibold">Search</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex flex-col items-center space-y-1 p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 active:bg-gray-200 relative"
            onClick={() => {
              toast({
                title: "Saved Programmes",
                description: `You have ${savedProgrammes.length} saved programmes`,
              })
            }}
          >
            <Heart className="w-5 h-5" />
            <span className="text-xs font-semibold">Saved</span>
            {savedProgrammes.length > 0 && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {savedProgrammes.length}
              </div>
            )}
          </Button>
          <Button 
            variant="ghost" 
            className="flex flex-col items-center space-y-1 p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 active:bg-gray-200"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Settings className="w-5 h-5" />
            <span className="text-xs font-semibold">Filters</span>
          </Button>
        </div>
      </div>

      {/* Bottom padding for mobile navigation */}
      <div className="lg:hidden h-20"></div>
    </div>
  )
}
