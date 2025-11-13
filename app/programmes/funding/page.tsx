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
  DollarSign, 
  TrendingUp, 
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
  Phone as PhoneIcon,
  Mail as MailIcon,
  Globe as GlobeIcon,
  Building as BuildingIcon,
  Shield as ShieldIcon,
  Award as AwardIcon,
  Star as StarIcon,
  MessageSquare as MessageSquareIcon,
  Send as SendIcon,
  Plus as PlusIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  MoreHorizontal as MoreHorizontalIcon,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Bookmark as BookmarkIcon,
  PieChart,
  TrendingDown,
  Activity,
  Handshake,
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
  Plus as PlusIcon2,
  Minus,
  Percent,
  Infinity,
  Pi,
  Sigma
} from "lucide-react"

export default function FundingProgrammesPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("seed")
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
    const saved = localStorage.getItem('savedFundingProgrammes')
    if (saved) {
      setSavedProgrammes(JSON.parse(saved))
    }
  }, [])

  const handleSaveProgramme = (programmeId: number) => {
    const newSaved = savedProgrammes.includes(programmeId)
      ? savedProgrammes.filter(id => id !== programmeId)
      : [...savedProgrammes, programmeId]
    
    setSavedProgrammes(newSaved)
    localStorage.setItem('savedFundingProgrammes', JSON.stringify(newSaved))
    
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

  const handleApplyForFunding = (programme: any) => {
    toast({
      title: "Application Started",
      description: `Starting application process for ${programme.title}`,
    })
    // Here you would typically redirect to application form
  }

  const handleLearnMore = (programme: any) => {
    toast({
      title: "Programme Details",
      description: `Loading detailed information for ${programme.title}`,
    })
    // Here you would typically open a detailed modal or redirect to details page
  }

  // Funding programmes data
  const fundingProgrammes = {
    seed: [
      {
        id: 1,
        title: "Seed Investment Program",
        subtitle: "Early-Stage Capital for Promising Startups",
        description: "Our flagship seed investment program provides early-stage startups with the capital, mentorship, and network access needed to validate their ideas and achieve product-market fit.",
        investmentRange: "SGD 50K - 200K",
        equity: "8-15%",
        duration: "12-18 months",
        spots: "25 startups/year",
        status: "Open for Applications",
        highlights: [
          "Flexible investment amounts",
          "Hands-on mentorship",
          "Network introductions",
          "Follow-on funding support",
          "Strategic guidance"
        ],
        requirements: [
          "MVP or early prototype",
          "Strong founding team",
          "Clear market opportunity",
          "Commitment to growth",
          "Singapore-based or expanding to Singapore"
        ],
        focusAreas: ["Fintech", "Healthtech", "Edtech", "SaaS", "Marketplace"],
        benefits: [
          "Direct access to investors",
          "Corporate partnership opportunities",
          "International market expansion",
          "Technical infrastructure support",
          "Legal and compliance guidance"
        ],
        applicationProcess: [
          "Initial application submission",
          "Pitch deck review",
          "Founder interviews",
          "Due diligence",
          "Investment committee review"
        ],
        deadline: "Rolling basis",
        featured: true,
        category: "Seed"
      },
      {
        id: 2,
        title: "University Spinout Fund",
        subtitle: "Supporting Academic Innovation",
        description: "Specialized funding for university spinouts and research-based startups, helping academic innovations reach commercial markets.",
        investmentRange: "SGD 100K - 300K",
        equity: "10-20%",
        duration: "18-24 months",
        spots: "15 startups/year",
        status: "Open for Applications",
        highlights: [
          "Academic innovation focus",
          "IP protection support",
          "Research collaboration",
          "Industry partnerships",
          "Commercialization guidance"
        ],
        requirements: [
          "University affiliation",
          "Research-based innovation",
          "IP ownership",
          "Commercial potential",
          "Experienced team"
        ],
        focusAreas: ["Biotech", "AI/ML", "Clean Energy", "Materials Science", "Digital Health"],
        benefits: [
          "IP strategy support",
          "Research collaboration",
          "Industry partnerships",
          "Regulatory guidance",
          "Market access support"
        ],
        applicationProcess: [
          "University endorsement",
          "Technology assessment",
          "Market validation",
          "Team evaluation",
          "Investment review"
        ],
        deadline: "Rolling basis",
        featured: false,
        category: "Seed"
      }
    ],
    seriesA: [
      {
        id: 3,
        title: "Series A Growth Fund",
        subtitle: "Scaling Successful Startups",
        description: "Growth-stage funding for startups that have achieved product-market fit and are ready to scale their operations and market presence.",
        investmentRange: "SGD 500K - 2M",
        equity: "15-25%",
        duration: "24-36 months",
        spots: "15 startups/year",
        status: "Open for Applications",
        highlights: [
          "Growth-stage focus",
          "Strategic partnerships",
          "International expansion",
          "Team scaling support",
          "Exit strategy planning"
        ],
        requirements: [
          "Proven product-market fit",
          "Strong revenue growth",
          "Experienced team",
          "Clear scaling plan",
          "Market leadership potential"
        ],
        focusAreas: ["High-growth sectors", "Technology", "E-commerce", "Fintech", "Healthtech"],
        benefits: [
          "Strategic capital",
          "Board representation",
          "Network access",
          "Exit planning support",
          "International expansion"
        ],
        applicationProcess: [
          "Business review",
          "Financial analysis",
          "Market assessment",
          "Team evaluation",
          "Investment committee"
        ],
        deadline: "Rolling basis",
        featured: true,
        category: "Series A"
      }
    ],
    specialized: [
      {
        id: 4,
        title: "Sustainability Innovation Fund",
        subtitle: "Green Technology Investment",
        description: "Dedicated funding for startups developing sustainable technologies and solutions to address climate change and environmental challenges.",
        investmentRange: "SGD 200K - 1M",
        equity: "10-20%",
        duration: "18-30 months",
        spots: "20 startups/year",
        status: "Open for Applications",
        highlights: [
          "Sustainability focus",
          "Impact measurement",
          "ESG compliance",
          "Government partnerships",
          "International collaboration"
        ],
        requirements: [
          "Environmental impact",
          "Scalable solution",
          "Strong team",
          "Market potential",
          "Regulatory compliance"
        ],
        focusAreas: ["Clean Energy", "Circular Economy", "Carbon Capture", "Sustainable Agriculture", "Green Building"],
        benefits: [
          "Impact investment",
          "ESG guidance",
          "Government support",
          "International markets",
          "Sustainability certification"
        ],
        applicationProcess: [
          "Impact assessment",
          "Technology review",
          "Market validation",
          "ESG evaluation",
          "Investment decision"
        ],
        deadline: "Rolling basis",
        featured: true,
        category: "Specialized"
      },
      {
        id: 5,
        title: "Women-Led Startup Fund",
        subtitle: "Empowering Female Entrepreneurs",
        description: "Dedicated funding and support for women-led startups, addressing the gender gap in entrepreneurship and investment.",
        investmentRange: "SGD 100K - 500K",
        equity: "8-15%",
        duration: "18-24 months",
        spots: "30 startups/year",
        status: "Open for Applications",
        highlights: [
          "Women-led focus",
          "Mentorship programs",
          "Network building",
          "Leadership development",
          "Community support"
        ],
        requirements: [
          "Women in leadership",
          "Strong business model",
          "Growth potential",
          "Commitment to success",
          "Innovation focus"
        ],
        focusAreas: ["All sectors", "Technology", "Healthcare", "Education", "Consumer"],
        benefits: [
          "Dedicated support",
          "Mentorship access",
          "Network expansion",
          "Leadership training",
          "Community connection"
        ],
        applicationProcess: [
          "Application submission",
          "Business review",
          "Founder interviews",
          "Due diligence",
          "Investment decision"
        ],
        deadline: "Rolling basis",
        featured: false,
        category: "Specialized"
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
      case "Seed": return <Rocket className="w-5 h-5" />
      case "Series A": return <TrendingUp className="w-5 h-5" />
      case "Specialized": return <Star className="w-5 h-5" />
      default: return <DollarSign className="w-5 h-5" />
    }
  }

  const getInvestmentColor = (range: string) => {
    if (range.includes("50K") || range.includes("100K")) return "bg-blue-100 text-blue-800"
    if (range.includes("200K") || range.includes("300K")) return "bg-green-100 text-green-800"
    if (range.includes("500K") || range.includes("1M")) return "bg-yellow-100 text-yellow-800"
    if (range.includes("2M")) return "bg-purple-100 text-purple-800"
    return "bg-gray-100 text-gray-800"
  }

  const allProgrammes = Object.values(fundingProgrammes).flat()
  
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
        return parseInt(b.investmentRange.replace(/[^\d]/g, '')) - parseInt(a.investmentRange.replace(/[^\d]/g, ''))
      case "equity":
        return parseInt(a.equity.replace(/[^\d]/g, '')) - parseInt(b.equity.replace(/[^\d]/g, ''))
      case "deadline":
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
      case "featured":
      default:
        return b.featured ? 1 : -1
    }
  })

  const categories = ["all", "Seed", "Series A", "Specialized"]

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
              <h1 className="text-lg font-bold text-gray-900">Funding Programmes</h1>
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
                <DollarSign className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-3xl lg:text-4xl xl:text-6xl font-bold mb-6">
              Funding Programmes
            </h1>
            <p className="text-lg lg:text-xl xl:text-2xl text-blue-100 mb-8 leading-relaxed">
              Access strategic capital and investment support to fuel your startup's growth and success
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/programmes"
                className="bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                View All Programmes
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-[#0F7377] transition-colors"
              >
                Apply for Funding
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Investment Statistics */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-2xl md:text-3xl font-bold text-[#0F7377]">SGD 50M+</div>
              <div className="text-sm md:text-base text-gray-600">Total Capital Deployed</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl md:text-3xl font-bold text-[#0F7377]">150+</div>
              <div className="text-sm md:text-base text-gray-600">Startups Funded</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl md:text-3xl font-bold text-[#0F7377]">85%</div>
              <div className="text-sm md:text-base text-gray-600">Success Rate</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl md:text-3xl font-bold text-[#0F7377]">SGD 2.5B</div>
              <div className="text-sm md:text-base text-gray-600">Portfolio Value</div>
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
                placeholder="Search funding programmes..."
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

      {/* Funding Categories and Content */}
      <div className="bg-white">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="seed" className="flex items-center gap-2">
                  <Rocket className="w-4 h-4" />
                  Seed Stage
                </TabsTrigger>
                <TabsTrigger value="seriesA" className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Series A
                </TabsTrigger>
                <TabsTrigger value="specialized" className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Specialized
                </TabsTrigger>
              </TabsList>
            </div>
            
            {/* Funding Programmes Content */}
            <div className="py-12">
              {Object.entries(fundingProgrammes).map(([category, programmes]) => (
                <TabsContent key={category} value={category} className="space-y-8">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      {category === "seed" ? "Seed Stage" : category === "seriesA" ? "Series A" : "Specialized"} Funding Programmes
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                      {category === "seed" 
                        ? "Early-stage funding to help you validate ideas and achieve product-market fit"
                        : category === "seriesA"
                        ? "Growth-stage capital to scale your successful startup"
                        : "Specialized funding for unique opportunities and underserved markets"
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
                          {/* Investment Details */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <div className="text-sm text-gray-500">Investment Range</div>
                              <Badge className={getInvestmentColor(programme.investmentRange)}>
                                {programme.investmentRange}
                              </Badge>
                            </div>
                            <div className="space-y-2">
                              <div className="text-sm text-gray-500">Equity</div>
                              <Badge variant="outline">{programme.equity}</Badge>
                            </div>
                            <div className="space-y-2">
                              <div className="text-sm text-gray-500">Duration</div>
                              <div className="text-sm font-medium">{programme.duration}</div>
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
                              onClick={() => handleApplyForFunding(programme)}
                            >
                              Apply for Funding
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
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">Ready to Secure Funding?</h2>
          <p className="text-lg lg:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of successful startups that have grown with GrowthLab's funding and support
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-[#F59E0B] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#F59E0B]/90 transition-colors"
            >
              Apply for Funding
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
            <DollarSign className="w-5 h-5" />
            <span className="text-xs font-semibold">Funding</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex flex-col items-center space-y-1 p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 active:bg-gray-200"
            onClick={() => {
              const searchInput = document.querySelector('input[placeholder="Search funding programmes..."]') as HTMLInputElement
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
