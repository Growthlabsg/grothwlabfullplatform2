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
  Star, 
  Users, 
  Calendar, 
  DollarSign, 
  Award, 
  Rocket, 
  Globe, 
  Building2,
  TrendingUp,
  Lightbulb,
  ArrowRight,
  CheckCircle,
  Clock,
  MapPin,
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
  Shield,
  Target,
  Zap,
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
  Star as StarIcon,
  Heart as HeartIcon,
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
  Scale,
  Expand,
  Plus as PlusIcon,
  Minus,
  Percent,
  Infinity,
  Pi,
  Sigma,
  Building,
  Factory,
  Warehouse,
  Store,
  ShoppingCart,
  CreditCard,
  Banknote,
  Coins,
  PiggyBank,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  BarChart,
  LineChart,
  PieChart,
  Activity as ActivityIcon,
  Zap as ZapIcon,
  Lightbulb as LightbulbIcon,
  Target as TargetIcon2,
  Compass as CompassIcon2,
  Rocket as RocketIcon,
  Shield as ShieldIcon,
  Sparkles as SparklesIcon,
  Trophy as TrophyIcon,
  UserCheck as UserCheckIcon,
  Workflow as WorkflowIcon,
  Headphones as HeadphonesIcon,
  Mic as MicIcon,
  MicOff as MicOffIcon,
  Volume2 as Volume2Icon,
  VolumeX as VolumeXIcon,
  Play as PlayIcon,
  Pause as PauseIcon,
  StopCircle as StopCircleIcon,
  Download as DownloadIcon2,
  Upload as UploadIcon2,
  Copy as CopyIcon,
  Edit as EditIcon,
  Trash2 as Trash2Icon,
  Archive as ArchiveIcon,
  Flag as FlagIcon2,
  MoreHorizontal as MoreHorizontalIcon,
  MoreVertical as MoreVerticalIcon,
  ChevronDown as ChevronDownIcon,
  ChevronUp as ChevronUpIcon,
  ArrowRight as ArrowRightIcon,
  ArrowLeft as ArrowLeftIcon,
  ArrowUp as ArrowUpIcon,
  ArrowDown as ArrowDownIcon,
  Maximize2 as Maximize2Icon,
  Minimize2 as Minimize2Icon,
  RotateCcw as RotateCcwIcon,
  Grid as GridIcon,
  List as ListIcon,
  Layout as LayoutIcon,
  Sidebar as SidebarIcon,
  PanelLeft as PanelLeftIcon,
  PanelRight as PanelRightIcon,
  Split as SplitIcon,
  Columns as ColumnsIcon,
  Rows as RowsIcon,
  Square as SquareIcon,
  Circle as CircleIcon,
  Triangle as TriangleIcon,
  Hexagon as HexagonIcon,
  Octagon as OctagonIcon,
  Diamond as DiamondIcon,
  Star as StarIcon2,
  Heart as HeartIcon2,
  Smile as SmileIcon,
  Frown as FrownIcon,
  Meh as MehIcon,
  Laugh as LaughIcon,
  Angry as AngryIcon,
  Glasses as GlassesIcon,
  HardHat as HardHatIcon,
  Construction as ConstructionIcon,
  Wrench as WrenchIcon,
  Hammer as HammerIcon,
  Drill as DrillIcon,
  Ruler as RulerIcon,
  Compass as CompassIcon3,
  Map as MapIcon,
  Navigation as NavigationIcon,
  Route as RouteIcon,
  MapPin as MapPinIcon2,
  Pin as PinIcon,
  Flag as FlagIcon3,
  Crosshair as CrosshairIcon,
  Target as TargetIcon3,
  Focus as FocusIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  Move as MoveIcon,
  Move3D as Move3DIcon,
  Rotate3D as Rotate3DIcon,
  Scale as ScaleIcon,
  Expand as ExpandIcon,
  Plus as PlusIcon2,
  Minus as MinusIcon,
  Percent as PercentIcon,
  Infinity as InfinityIcon,
  Pi as PiIcon,
  Sigma as SigmaIcon,
  Settings,
  Bell,
  BookOpen,
  GraduationCap,
  Briefcase,
  Handshake,
  User,
  Users2,
  Building as BuildingIcon,
  Landmark,
  Scale as ScaleIcon2,
  FileText,
  Phone as PhoneIcon,
  Mail as MailIcon,
  Globe as GlobeIcon,
  Building as BuildingIcon2,
  Shield as ShieldIcon2,
  Award as AwardIcon,
  Star as StarIcon3,
  MessageSquare as MessageSquareIcon,
  Send as SendIcon,
  Plus as PlusIcon3,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  MoreHorizontal as MoreHorizontalIcon2,
  ThumbsUp,
  ThumbsDown,
  Flag as FlagIcon4,
  Bookmark as BookmarkIcon,
  PieChart as PieChartIcon,
  TrendingDown,
  Activity,
  Handshake as HandshakeIcon,
  Lightbulb as LightbulbIcon2,
  Target as TargetIcon4,
  Zap as ZapIcon2,
  GraduationCap as GraduationCapIcon,
  BookOpen as BookOpenIcon,
  Brain as BrainIcon,
  Compass as CompassIcon4,
  Rocket as RocketIcon2,
  Shield as ShieldIcon3,
  Sparkles as SparklesIcon2,
  Trophy as TrophyIcon2,
  UserCheck as UserCheckIcon2,
  Workflow as WorkflowIcon2,
  Headphones as HeadphonesIcon2,
  Mic as MicIcon2,
  MicOff as MicOffIcon2,
  Volume2 as Volume2Icon2,
  VolumeX as VolumeXIcon2,
  Play as PlayIcon2,
  Pause as PauseIcon2,
  StopCircle as StopCircleIcon2,
  Download as DownloadIcon3,
  Upload as UploadIcon3,
  Copy as CopyIcon2,
  Edit as EditIcon2,
  Trash2 as Trash2Icon2,
  Archive as ArchiveIcon2,
  Flag as FlagIcon5,
  MoreVertical as MoreVerticalIcon2,
  ChevronDown as ChevronDownIcon2,
  ChevronUp as ChevronUpIcon2,
  ArrowRight as ArrowRightIcon2,
  ArrowLeft as ArrowLeftIcon2,
  ArrowUp as ArrowUpIcon2,
  ArrowDown as ArrowDownIcon2,
  Maximize2 as Maximize2Icon2,
  Minimize2 as Minimize2Icon2,
  RotateCcw as RotateCcwIcon2,
  Grid as GridIcon2,
  List as ListIcon2,
  Layout as LayoutIcon2,
  Sidebar as SidebarIcon2,
  PanelLeft as PanelLeftIcon2,
  PanelRight as PanelRightIcon2,
  Split as SplitIcon2,
  Columns as ColumnsIcon2,
  Rows as RowsIcon2,
  Square as SquareIcon2,
  Circle as CircleIcon2,
  Triangle as TriangleIcon2,
  Hexagon as HexagonIcon2,
  Octagon as OctagonIcon2,
  Diamond as DiamondIcon2,
  Star as StarIcon4,
  Smile as SmileIcon2,
  Frown as FrownIcon2,
  Meh as MehIcon2,
  Laugh as LaughIcon2,
  Angry as AngryIcon2,
  Glasses as GlassesIcon2,
  HardHat as HardHatIcon2,
  Construction as ConstructionIcon2,
  Wrench as WrenchIcon2,
  Hammer as HammerIcon2,
  Drill as DrillIcon2,
  Ruler as RulerIcon2,
  Compass as CompassIcon5,
  Map as MapIcon2,
  Navigation as NavigationIcon2,
  Route as RouteIcon2,
  MapPin as MapPinIcon3,
  Pin as PinIcon2,
  Flag as FlagIcon6,
  Crosshair as CrosshairIcon2,
  Target as TargetIcon5,
  Focus as FocusIcon2,
  ZoomIn as ZoomInIcon2,
  ZoomOut as ZoomOutIcon2,
  Move as MoveIcon2,
  Move3D as Move3DIcon2,
  Rotate3D as Rotate3DIcon2,
  Scale as ScaleIcon3,
  Expand as ExpandIcon2,
  Plus as PlusIcon4,
  Minus as MinusIcon2,
  Percent as PercentIcon2,
  Infinity as InfinityIcon2,
  Pi as PiIcon2,
  Sigma as SigmaIcon2
} from "lucide-react"

export default function FeaturedProgrammesPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("accelerator")
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
    const saved = localStorage.getItem('savedProgrammes')
    if (saved) {
      setSavedProgrammes(JSON.parse(saved))
    }
  }, [])

  const handleSaveProgramme = (programmeId: number) => {
    const newSaved = savedProgrammes.includes(programmeId)
      ? savedProgrammes.filter(id => id !== programmeId)
      : [...savedProgrammes, programmeId]
    
    setSavedProgrammes(newSaved)
    localStorage.setItem('savedProgrammes', JSON.stringify(newSaved))
    
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

  // Featured programmes data
  const featuredProgrammes = {
    accelerator: [
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
        category: "Accelerator",
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
      },
      {
        id: 2,
        title: "TechStars Singapore",
        subtitle: "Global Accelerator Network",
        description: "Join the world's most successful startup accelerator with a proven track record of helping entrepreneurs build great companies.",
        duration: "3 months",
        funding: "SGD 120K",
        equity: "6%",
        spots: "10 startups",
        status: "Open for Applications",
        category: "Accelerator",
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
    ],
    incubator: [
      {
        id: 3,
        title: "Singapore Incubator Hub",
        subtitle: "Early Stage Startup Support",
        description: "A comprehensive incubator program providing early-stage startups with workspace, mentorship, and resources to build and validate their ideas.",
        duration: "12 months",
        funding: "SGD 50K",
        equity: "2-5%",
        spots: "25 startups",
        status: "Open for Applications",
        category: "Incubator",
        difficulty: "Beginner",
        rating: 4.7,
        reviews: 156,
        location: "Singapore",
        startDate: "2024-02-01",
        endDate: "2025-01-31",
        applicationDeadline: "2024-01-15",
        highlights: [
          "SGD 50K funding",
          "12-month program",
          "Co-working space",
          "Mentorship network",
          "Resource library"
        ],
        requirements: [
          "Idea stage startup",
          "Founding team",
          "Business plan",
          "Commitment to program"
        ],
        benefits: [
          "SGD 50K funding for 2-5% equity",
          "12 months co-working space",
          "Access to mentor network",
          "Legal and accounting support",
          "Resource library access"
        ],
        curriculum: [
          "Month 1-3: Idea validation and market research",
          "Month 4-6: Product development and MVP",
          "Month 7-9: Market testing and iteration",
          "Month 10-12: Growth planning and fundraising"
        ],
        mentors: [
          "Dr. Lim Wei Ming - NUS Professor",
          "Jennifer Tan - Former Grab Executive",
          "Robert Kim - Angel Investor"
        ],
        alumni: [
          "StartupA - Raised $2M Seed",
          "StartupB - Acquired by Google",
          "StartupC - Successful exit"
        ],
        partners: [
          "National University of Singapore",
          "Enterprise Singapore",
          "Singapore Economic Development Board"
        ],
        image: "/incubator-program.jpg",
        logo: "/incubator-logo.png",
        featured: true,
        verified: true
      }
    ],
    mentorship: [
      {
        id: 4,
        title: "Executive Mentorship Program",
        subtitle: "1-on-1 Executive Guidance",
        description: "Connect with seasoned executives and entrepreneurs for personalized mentorship and guidance on your startup journey.",
        duration: "6 months",
        funding: "N/A",
        equity: "N/A",
        spots: "50 startups",
        status: "Open for Applications",
        category: "Mentorship",
        difficulty: "All Levels",
        rating: 4.9,
        reviews: 203,
        location: "Virtual",
        startDate: "2024-02-01",
        endDate: "2024-07-31",
        applicationDeadline: "2024-01-20",
        highlights: [
          "1-on-1 mentorship",
          "Industry experts",
          "Flexible scheduling",
          "6-month program",
          "Network access"
        ],
        requirements: [
          "Active startup",
          "Clear goals",
          "Commitment to program",
          "Open to feedback"
        ],
        benefits: [
          "1-on-1 mentorship sessions",
          "Access to industry experts",
          "Flexible scheduling",
          "Network introductions",
          "Ongoing support"
        ],
        curriculum: [
          "Month 1: Goal setting and relationship building",
          "Month 2-5: Regular mentorship sessions",
          "Month 6: Review and future planning"
        ],
        mentors: [
          "Dr. Sarah Johnson - Former Microsoft VP",
          "Mark Chen - Sequoia Capital Partner",
          "Lisa Wang - Successful Entrepreneur"
        ],
        alumni: [
          "MenteeA - Raised $5M Series A",
          "MenteeB - Successful exit",
          "MenteeC - Scaled to 100+ employees"
        ],
        partners: [
          "Microsoft",
          "Sequoia Capital",
          "Andreessen Horowitz"
        ],
        image: "/mentorship-program.jpg",
        logo: "/mentorship-logo.png",
        featured: true,
        verified: true
      }
    ],
    funding: [
      {
        id: 5,
        title: "Government Grant Program",
        subtitle: "Startup SG Grant",
        description: "Access up to SGD 250K in government grants to support your startup's growth and development.",
        duration: "12 months",
        funding: "SGD 250K",
        equity: "0%",
        spots: "100 startups",
        status: "Open for Applications",
        category: "Funding",
        difficulty: "Intermediate",
        rating: 4.6,
        reviews: 78,
        location: "Singapore",
        startDate: "2024-01-01",
        endDate: "2024-12-31",
        applicationDeadline: "2024-01-31",
        highlights: [
          "SGD 250K grant",
          "No equity required",
          "Government support",
          "12-month program",
          "Mentorship included"
        ],
        requirements: [
          "Singapore registered company",
          "Innovative business model",
          "Growth potential",
          "Compliance requirements"
        ],
        benefits: [
          "SGD 250K non-dilutive funding",
          "Government support and recognition",
          "Access to mentor network",
          "Resource library access",
          "Networking opportunities"
        ],
        curriculum: [
          "Month 1-3: Grant application and approval",
          "Month 4-9: Fund utilization and reporting",
          "Month 10-12: Review and renewal planning"
        ],
        mentors: [
          "Government officials",
          "Industry experts",
          "Successful entrepreneurs"
        ],
        alumni: [
          "GranteeA - Raised $10M Series A",
          "GranteeB - Successful IPO",
          "GranteeC - International expansion"
        ],
        partners: [
          "Enterprise Singapore",
          "Singapore Economic Development Board",
          "Ministry of Trade and Industry"
        ],
        image: "/grant-program.jpg",
        logo: "/government-logo.png",
        featured: true,
        verified: true
      }
    ]
  }

  const allProgrammes = Object.values(featuredProgrammes).flat()
  
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

  const categories = ["all", "Accelerator", "Incubator", "Mentorship", "Funding"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
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
              <h1 className="text-lg font-bold text-gray-900">Featured Programmes</h1>
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

      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Desktop Header */}
        <div className="hidden lg:block mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Featured Programmes</h1>
              <p className="text-xl text-gray-600 max-w-3xl">
                Discover the most prestigious and impactful programmes designed to accelerate your startup journey. 
                From accelerators to funding opportunities, find the perfect program to fuel your growth.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline" onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}>
                {viewMode === "grid" ? <List className="h-4 w-4 mr-2" /> : <Grid className="h-4 w-4 mr-2" />}
                {viewMode === "grid" ? "List View" : "Grid View"}
              </Button>
            </div>
          </div>
            </div>
            
        {/* Mobile Description */}
        <div className="lg:hidden mb-6">
          <p className="text-gray-600 text-sm">
            Discover the most prestigious and impactful programmes designed to accelerate your startup journey.
                    </p>
                  </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search programmes..."
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
                          
        {/* Programmes Grid */}
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

        {/* No Results */}
        {sortedProgrammes.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No programmes found</h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your search criteria or filters to find more programmes.
            </p>
            <Button onClick={() => {
              setSearchQuery("")
              setSelectedCategory("all")
            }}>
              Clear Filters
            </Button>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-[#0F7377] to-[#0F7377]/90 rounded-2xl p-6 lg:p-8 text-white">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">Ready to Accelerate Your Startup?</h2>
            <p className="text-lg lg:text-xl text-white/90 mb-6 max-w-2xl mx-auto">
              Join thousands of successful entrepreneurs who have transformed their ideas into thriving businesses through our featured programmes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary" 
                className="text-[#0F7377] bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-200 font-semibold"
              >
                <Rocket className="h-5 w-5 mr-2" />
                Apply Now
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-white border-2 border-white hover:bg-white hover:text-[#0F7377] shadow-lg hover:shadow-xl transition-all duration-200 font-semibold bg-white/20 backdrop-blur-sm"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '2px solid white',
                  color: 'white',
                  fontWeight: '600'
                }}
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                Schedule Consultation
              </Button>
            </div>
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
            <Star className="w-5 h-5" />
            <span className="text-xs font-semibold">Featured</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex flex-col items-center space-y-1 p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 active:bg-gray-200"
            onClick={() => {
              const searchInput = document.querySelector('input[placeholder="Search programmes..."]') as HTMLInputElement
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