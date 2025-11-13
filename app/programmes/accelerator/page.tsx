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
  Rocket, 
  Users, 
  Calendar, 
  DollarSign, 
  Award, 
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
  TrendingUp,
  Activity,
  Handshake,
  Brain,
  Compass,
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
  Flag,
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
  Flag as FlagIcon,
  Crosshair,
  Target as TargetIcon,
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

export default function AcceleratorProgrammesPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("early")
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
    const saved = localStorage.getItem('savedAcceleratorProgrammes')
    if (saved) {
      setSavedProgrammes(JSON.parse(saved))
    }
  }, [])

  const handleSaveProgramme = (programmeId: number) => {
    const newSaved = savedProgrammes.includes(programmeId)
      ? savedProgrammes.filter(id => id !== programmeId)
      : [...savedProgrammes, programmeId]
    
    setSavedProgrammes(newSaved)
    localStorage.setItem('savedAcceleratorProgrammes', JSON.stringify(newSaved))
    
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

  const handleApplyForAccelerator = (programme: any) => {
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

  // Accelerator programmes data
  const acceleratorProgrammes = {
    early: [
      {
        id: 1,
        title: "GrowthLab Accelerator",
        subtitle: "Asia's Premier Startup Accelerator",
        description: "A comprehensive 6-month program designed to transform promising startups into market-ready, scalable businesses with access to funding, mentorship, and global networks.",
        duration: "6 months",
        funding: "SGD 500K",
        equity: "5-8%",
        spots: "15 startups",
        status: "Open for Applications",
        category: "Early Stage",
        difficulty: "Advanced",
        rating: 4.9,
        reviews: 127,
        location: "Singapore",
        startDate: "2024-03-01",
        endDate: "2024-08-31",
        applicationDeadline: "2024-02-15",
        highlights: [
          "SGD 500K investment",
          "World-class mentorship",
          "Global network access",
          "Demo Day presentation",
          "Follow-on funding support"
        ],
        requirements: [
          "Seed to Series A stage",
          "Minimum 2 founders",
          "Working prototype",
          "Market validation",
          "Growth potential"
        ],
        benefits: [
          "SGD 500K investment for 5-8% equity",
          "Access to 100+ mentors",
          "Co-working space in Singapore",
          "Legal and accounting support",
          "Demo Day to 200+ investors",
          "Follow-on funding opportunities"
        ],
        curriculum: [
          "Week 1-2: Program orientation and team building",
          "Week 3-8: Product development and market fit",
          "Week 9-16: Growth strategies and scaling",
          "Week 17-20: Fundraising preparation",
          "Week 21-24: Demo Day preparation and presentation"
        ],
        mentors: [
          "John Smith - Former Google VP",
          "Sarah Chen - Sequoia Capital Partner",
          "Michael Lee - Stripe Co-founder"
        ],
        alumni: [
          "TechCorp - Raised $10M Series A",
          "DataFlow - Acquired by Microsoft",
          "CloudSync - IPO on NASDAQ"
        ],
        partners: [
          "Google Cloud",
          "AWS",
          "Stripe",
          "Salesforce"
        ],
        image: "/accelerator-program.jpg",
        logo: "/growthlab-logo.png",
        featured: true,
        verified: true
      }
    ],
    growth: [
      {
        id: 2,
        title: "Scale-Up Accelerator",
        subtitle: "Growth-Stage Startup Program",
        description: "Designed for startups that have achieved product-market fit and are ready to scale their operations and market presence.",
        duration: "4 months",
        funding: "SGD 200K",
        equity: "3-5%",
        spots: "10 startups",
        status: "Open for Applications",
        category: "Growth Stage",
        difficulty: "Advanced",
        rating: 4.8,
        reviews: 89,
        location: "Singapore",
        startDate: "2024-04-01",
        endDate: "2024-07-31",
        applicationDeadline: "2024-03-15",
        highlights: [
          "SGD 200K bridge funding",
          "Scaling strategies",
          "International expansion",
          "Team building support",
          "Exit preparation"
        ],
        requirements: [
          "Proven product-market fit",
          "Strong revenue growth",
          "Experienced team",
          "Clear scaling plan",
          "Market leadership potential"
        ],
        benefits: [
          "SGD 200K bridge funding for 3-5% equity",
          "Scaling mentorship",
          "International market access",
          "Team expansion support",
          "Exit strategy planning"
        ],
        curriculum: [
          "Month 1: Scaling assessment and planning",
          "Month 2: Growth strategies and execution",
          "Month 3: International expansion",
          "Month 4: Exit preparation and presentation"
        ],
        mentors: [
          "David Kim - Former Uber Executive",
          "Lisa Wang - Andreessen Horowitz Partner",
          "Robert Chen - Successful Serial Entrepreneur"
        ],
        alumni: [
          "ScaleUpA - Raised $50M Series B",
          "ScaleUpB - Acquired by Amazon",
          "ScaleUpC - Successful IPO"
        ],
        partners: [
          "Amazon Web Services",
          "Microsoft",
          "Google Cloud"
        ],
        image: "/scaleup-program.jpg",
        logo: "/scaleup-logo.png",
        featured: true,
        verified: true
      }
    ],
    specialized: [
      {
        id: 3,
        title: "TechStars Singapore",
        subtitle: "Global Accelerator Network",
        description: "Join the world's most successful startup accelerator with a proven track record of helping entrepreneurs build great companies.",
        duration: "3 months",
        funding: "SGD 120K",
        equity: "6%",
        spots: "10 startups",
        status: "Open for Applications",
        category: "Specialized",
        difficulty: "Advanced",
        rating: 4.8,
        reviews: 89,
        location: "Singapore",
        startDate: "2024-04-01",
        endDate: "2024-06-30",
        applicationDeadline: "2024-03-15",
        highlights: [
          "SGD 120K investment",
          "Global mentor network",
          "TechStars network access",
          "Demo Day presentation"
        ],
        requirements: [
          "Early stage startup",
          "Scalable business model",
          "Strong founding team",
          "Market opportunity"
        ],
        benefits: [
          "SGD 120K investment for 6% equity",
          "Access to TechStars global network",
          "Mentorship from successful entrepreneurs",
          "Co-working space",
          "Demo Day presentation"
        ],
        curriculum: [
          "Week 1-4: Program orientation and team building",
          "Week 5-8: Product development and validation",
          "Week 9-12: Growth and scaling strategies"
        ],
        mentors: [
          "David Cohen - TechStars Founder",
          "Brad Feld - Foundry Group",
          "Nicole Glaros - TechStars Managing Director"
        ],
        alumni: [
          "SendGrid - Acquired by Twilio",
          "DigitalOcean - Public company",
          "ClassPass - Valued at $1B+"
        ],
        partners: [
          "TechStars",
          "Microsoft",
          "Amazon Web Services"
        ],
        image: "/techstars-program.jpg",
        logo: "/techstars-logo.png",
        featured: true,
        verified: true
      }
    ]
  }

  const allProgrammes = Object.values(acceleratorProgrammes).flat()
  
  const filteredProgrammes = allProgrammes.filter(programme => {
    const matchesSearch = programme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         programme.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         programme.category.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = selectedCategory === "all" || programme.category.toLowerCase() === selectedCategory.toLowerCase()
    
    return matchesSearch && matchesCategory
  })

  const sortedProgrammes = filteredProgrammes.sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating
      case "funding":
        return parseInt(b.funding.replace(/[^\d]/g, '')) - parseInt(a.funding.replace(/[^\d]/g, ''))
      case "deadline":
        return new Date(a.applicationDeadline).getTime() - new Date(b.applicationDeadline).getTime()
      case "featured":
      default:
        return b.featured ? 1 : -1
    }
  })

  const categories = ["all", "Early Stage", "Growth Stage", "Specialized"]

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
              <h1 className="text-lg font-bold text-gray-900">Accelerator Programmes</h1>
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
                <Rocket className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-3xl lg:text-4xl xl:text-6xl font-bold mb-6">
              Accelerator Programmes
            </h1>
            <p className="text-lg lg:text-xl xl:text-2xl text-blue-100 mb-8 leading-relaxed">
              Transform your startup with our comprehensive accelerator programs designed for different growth stages
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/programmes"
                className="bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                View All Programmes
              </Link>
              <Link
                href="/programmes/accelerator/apply"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-[#0F7377] transition-colors"
              >
                Apply for Accelerator
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-2xl md:text-3xl font-bold text-[#0F7377]">200+</div>
              <div className="text-sm md:text-base text-gray-600">Startups Accelerated</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl md:text-3xl font-bold text-[#0F7377]">SGD 100M+</div>
              <div className="text-sm md:text-base text-gray-600">Total Funding Raised</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl md:text-3xl font-bold text-[#0F7377]">90%</div>
              <div className="text-sm md:text-base text-gray-600">Success Rate</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl md:text-3xl font-bold text-[#0F7377]">50+</div>
              <div className="text-sm md:text-base text-gray-600">Countries Reached</div>
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
                placeholder="Search accelerator programmes..."
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
                <option value="rating">Highest Rated</option>
                <option value="funding">Highest Funding</option>
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
                    <option value="rating">Highest Rated</option>
                    <option value="funding">Highest Funding</option>
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

      {/* Programmes Grid */}
      <div className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
            {sortedProgrammes.map((programme) => (
              <Card key={programme.id} className="hover:shadow-lg transition-all duration-300 group">
                <div className="relative">
                  <div className="h-48 bg-gradient-to-r from-[#0F7377] to-[#0F7377]/80 rounded-t-lg relative overflow-hidden">
                    <img
                      src={programme.image}
                      alt={programme.title}
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute top-4 left-4 flex gap-2">
                      {programme.featured && (
                        <Badge className="bg-yellow-500 text-white">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                      {programme.verified && (
                        <Badge className="bg-green-500 text-white">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/20"
                        onClick={() => handleSaveProgramme(programme.id)}
                      >
                        <Heart className={`h-4 w-4 ${savedProgrammes.includes(programme.id) ? 'fill-red-500 text-red-500' : ''}`} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/20"
                        onClick={() => handleShareProgramme(programme)}
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white mb-1">{programme.title}</h3>
                      <p className="text-white/90 text-sm">{programme.subtitle}</p>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-[#0F7377] border-[#0F7377]">
                        {programme.category}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{programme.rating}</span>
                        <span className="text-sm text-gray-500">({programme.reviews})</span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm line-clamp-3">{programme.description}</p>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span>{programme.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-gray-400" />
                        <span>{programme.funding}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span>{programme.spots}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span>{programme.location}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {programme.highlights.slice(0, 3).map((highlight, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                      {programme.highlights.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{programme.highlights.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={programme.status === "Open for Applications" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {programme.status}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSaveProgramme(programme.id)}
                        >
                          <Heart className={`h-4 w-4 mr-1 ${savedProgrammes.includes(programme.id) ? 'fill-red-500 text-red-500' : ''}`} />
                          Save
                        </Button>
                        <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-[#0F7377] to-[#0F7377]/90 text-white py-12 lg:py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">Ready to Accelerate Your Startup?</h2>
          <p className="text-lg lg:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of successful startups that have grown with GrowthLab's accelerator programs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/programmes/accelerator/apply"
              className="bg-[#F59E0B] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#F59E0B]/90 transition-colors"
            >
              Apply for Accelerator
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
            <Rocket className="w-5 h-5" />
            <span className="text-xs font-semibold">Accelerator</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex flex-col items-center space-y-1 p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 active:bg-gray-200"
            onClick={() => {
              const searchInput = document.querySelector('input[placeholder="Search accelerator programmes..."]') as HTMLInputElement
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
