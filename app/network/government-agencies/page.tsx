"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { 
  Search, 
  Filter, 
  MapPin, 
  Building, 
  Users, 
  TrendingUp, 
  Eye, 
  Lightbulb, 
  Target, 
  Globe, 
  Mail, 
  ArrowUpRight, 
  ChevronRight,
  Rocket,
  Award,
  Download,
  Star,
  MessageSquare,
  ExternalLink,
  Calendar,
  Clock,
  Briefcase,
  GraduationCap,
  Zap,
  Heart,
  Share2,
  Phone,
  FileText,
  Shield,
  Gavel,
  DollarSign,
  BookOpen,
  Users2,
  CheckCircle,
  AlertCircle,
  Info,
  Send,
  X,
  Plus,
  ChevronLeft,
  MoreHorizontal,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Bookmark,
  PieChart,
  TrendingDown,
  Activity,
  Handshake,
  Target as TargetIcon,
  Zap as ZapIcon,
  Brain,
  Compass,
  Shield as ShieldIcon,
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
  Record,
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
  Flag as FlagIcon2,
  Crosshair,
  Target as TargetIcon2,
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
  Building2,
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
  PieChart as PieChartIcon,
  Activity as ActivityIcon,
  Zap as ZapIcon2,
  Lightbulb as LightbulbIcon,
  Target as TargetIcon3,
  Compass as CompassIcon2,
  Rocket as RocketIcon,
  Shield as ShieldIcon2,
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
  Record as RecordIcon,
  Download as DownloadIcon2,
  Upload as UploadIcon2,
  Copy as CopyIcon,
  Edit as EditIcon,
  Trash2 as Trash2Icon,
  Archive as ArchiveIcon,
  Flag as FlagIcon3,
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
  Flag as FlagIcon4,
  Crosshair as CrosshairIcon,
  Target as TargetIcon4,
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
  Landmark,
  Scale as ScaleIcon2,
  FileText as FileTextIcon,
  Phone as PhoneIcon,
  Mail as MailIcon,
  Globe as GlobeIcon,
  Building as BuildingIcon,
  Shield as ShieldIcon3,
  Award as AwardIcon,
  Star as StarIcon3,
  MessageSquare as MessageSquareIcon,
  Send as SendIcon,
  Plus as PlusIcon3,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  MoreHorizontal as MoreHorizontalIcon2,
  ThumbsUp as ThumbsUpIcon,
  ThumbsDown as ThumbsDownIcon,
  Flag as FlagIcon5,
  Bookmark as BookmarkIcon,
  PieChart as PieChartIcon2,
  TrendingDown as TrendingDownIcon,
  Activity as ActivityIcon2,
  Handshake as HandshakeIcon,
  Lightbulb as LightbulbIcon2,
  Target as TargetIcon5,
  Zap as ZapIcon3,
  GraduationCap as GraduationCapIcon,
  BookOpen as BookOpenIcon,
  Brain as BrainIcon,
  Compass as CompassIcon4,
  Rocket as RocketIcon2,
  Shield as ShieldIcon4,
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
  Record as RecordIcon2,
  Download as DownloadIcon3,
  Upload as UploadIcon3,
  Copy as CopyIcon2,
  Edit as EditIcon2,
  Trash2 as Trash2Icon2,
  Archive as ArchiveIcon2,
  Flag as FlagIcon6,
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
  Heart as HeartIcon2,
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
  Flag as FlagIcon7,
  Crosshair as CrosshairIcon2,
  Target as TargetIcon6,
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
  Sigma as SigmaIcon2,
  Settings
} from "lucide-react"
import Link from "next/link"

// Mock data for government agencies
const AGENCIES = [
  {
    id: "1",
    name: "Enterprise Singapore",
    logo: "/enterprise-sg-logo.png",
    description: "Singapore's government agency championing enterprise development",
    category: "Economic Development",
    location: "Singapore",
    website: "https://www.enterprisesg.gov.sg",
    contactEmail: "info@enterprisesg.gov.sg",
    contactPhone: "+65 6898 1800",
    verified: true,
    rating: 4.8,
    reviews: 156,
    featured: true,
    programs: [
      {
        name: "Startup SG Founder",
        description: "Mentorship and funding for first-time entrepreneurs",
        funding: "Up to $50,000",
        duration: "6 months",
        status: "Active"
      },
      {
        name: "Startup SG Tech",
        description: "Proof-of-concept and market validation grants",
        funding: "Up to $250,000",
        duration: "18 months",
        status: "Active"
      },
      {
        name: "Startup SG Accelerator",
        description: "Accelerator program for high-potential startups",
        funding: "Up to $500,000",
        duration: "12 months",
        status: "Active"
      }
    ],
    regulations: [
      "Business Registration Requirements",
      "Foreign Investment Guidelines",
      "Intellectual Property Protection",
      "Employment Pass Regulations"
    ],
    insights: [
      "Focus on building strong local partnerships before expanding",
      "Ensure compliance with MAS regulations for fintech startups",
      "Leverage government grants to reduce initial capital requirements",
      "Build relationships with local universities for R&D collaboration"
    ],
    employeeTestimonials: [
      {
        name: "Sarah Lim",
        position: "Senior Manager, Startup Development",
        experience: "8 years",
        insight: "The most successful startups are those that understand the local market first before scaling regionally. Take advantage of our mentorship programs."
      },
      {
        name: "David Tan",
        position: "Director, Innovation Programs",
        experience: "12 years",
        insight: "Many startups underestimate the importance of regulatory compliance. Start early and build it into your business model from day one."
      }
    ],
    resources: [
      "Startup Guide Singapore",
      "Funding Application Templates",
      "Regulatory Compliance Checklist",
      "Market Research Reports"
    ]
  },
  {
    id: "2",
    name: "Monetary Authority of Singapore (MAS)",
    logo: "/mas-logo.png",
    description: "Singapore's central bank and financial regulatory authority",
    category: "Financial Regulation",
    location: "Singapore",
    website: "https://www.mas.gov.sg",
    contactEmail: "fintech@mas.gov.sg",
    contactPhone: "+65 6225 5577",
    verified: true,
    rating: 4.6,
    reviews: 89,
    featured: true,
    programs: [
      {
        name: "FinTech Regulatory Sandbox",
        description: "Controlled environment for testing innovative financial services",
        funding: "Regulatory support",
        duration: "12-24 months",
        status: "Active"
      },
      {
        name: "MAS Innovation Lab",
        description: "Collaboration space for fintech innovation",
        funding: "Free access",
        duration: "Ongoing",
        status: "Active"
      }
    ],
    regulations: [
      "Payment Services Act",
      "Securities and Futures Act",
      "Insurance Act",
      "Banking Act"
    ],
    insights: [
      "Always engage with MAS early in your fintech journey",
      "Understand the regulatory framework before building your product",
      "Consider the regulatory sandbox for testing innovative solutions",
      "Build strong compliance and risk management systems"
    ],
    employeeTestimonials: [
      {
        name: "Dr. James Wong",
        position: "Assistant Managing Director, FinTech",
        experience: "15 years",
        insight: "The regulatory sandbox is not just about compliance - it's about building trust with regulators and customers. Use it wisely."
      }
    ],
    resources: [
      "FinTech Regulatory Guide",
      "Sandbox Application Guide",
      "Compliance Framework Documents",
      "Industry Consultation Papers"
    ]
  },
  {
    id: "3",
    name: "Singapore Economic Development Board (EDB)",
    logo: "/edb-logo.png",
    description: "Government agency driving Singapore's economic growth",
    category: "Economic Development",
    location: "Singapore",
    website: "https://www.edb.gov.sg",
    contactEmail: "info@edb.gov.sg",
    contactPhone: "+65 6832 6832",
    verified: true,
    rating: 4.7,
    reviews: 124,
    featured: false,
    programs: [
      {
        name: "Global Innovation Alliance",
        description: "International market access and partnership opportunities",
        funding: "Travel and setup grants",
        duration: "12-24 months",
        status: "Active"
      },
      {
        name: "Research & Development Incentives",
        description: "Tax incentives for R&D activities",
        funding: "Up to 400% tax deduction",
        duration: "Ongoing",
        status: "Active"
      }
    ],
    regulations: [
      "Corporate Tax Regulations",
      "R&D Tax Incentive Guidelines",
      "International Trade Regulations",
      "Investment Promotion Policies"
    ],
    insights: [
      "Leverage Singapore's strategic location for regional expansion",
      "Take advantage of R&D tax incentives to reduce costs",
      "Build relationships with multinational corporations",
      "Consider Singapore as a launchpad for ASEAN markets"
    ],
    employeeTestimonials: [
      {
        name: "Michelle Chen",
        position: "Director, Startup Ecosystem",
        experience: "10 years",
        insight: "Singapore's strategic location and strong IP protection make it ideal for tech startups looking to scale regionally."
      }
    ],
    resources: [
      "Investment Guide Singapore",
      "R&D Tax Incentive Guide",
      "Market Entry Strategies",
      "Partnership Opportunities"
    ]
  },
  {
    id: "4",
    name: "Infocomm Media Development Authority (IMDA)",
    logo: "/imda-logo.png",
    description: "Singapore's digital economy and media regulator",
    category: "Digital Economy",
    location: "Singapore",
    website: "https://www.imda.gov.sg",
    contactEmail: "info@imda.gov.sg",
    contactPhone: "+65 6377 3800",
    verified: true,
    rating: 4.5,
    reviews: 67,
    featured: false,
    programs: [
      {
        name: "Pixel Innovation Programme",
        description: "Support for media and digital content startups",
        funding: "Up to $100,000",
        duration: "12 months",
        status: "Active"
      },
      {
        name: "Digital Readiness Programme",
        description: "Digital transformation support for SMEs",
        funding: "Up to $10,000",
        duration: "6 months",
        status: "Active"
      }
    ],
    regulations: [
      "Broadcasting Act",
      "Telecommunications Act",
      "Personal Data Protection Act",
      "Cybersecurity Act"
    ],
    insights: [
      "Focus on data protection and cybersecurity from the start",
      "Understand media licensing requirements for content startups",
      "Leverage Singapore's digital infrastructure for innovation",
      "Build strong data governance practices"
    ],
    employeeTestimonials: [
      {
        name: "Alex Tan",
        position: "Senior Director, Digital Innovation",
        experience: "12 years",
        insight: "Digital startups must prioritize cybersecurity and data protection. These are not afterthoughts but core business requirements."
      }
    ],
    resources: [
      "Digital Media Guidelines",
      "Cybersecurity Framework",
      "Data Protection Guide",
      "Content Licensing Guide"
    ]
  },
  {
    id: "5",
    name: "Ministry of Trade and Industry (MTI)",
    logo: "/mti-logo.png",
    description: "Singapore's ministry responsible for trade and industry policies",
    category: "Policy & Regulation",
    location: "Singapore",
    website: "https://www.mti.gov.sg",
    contactEmail: "mti_feedback@mti.gov.sg",
    contactPhone: "+65 6438 2000",
    verified: true,
    rating: 4.4,
    reviews: 45,
    featured: false,
    programs: [
      {
        name: "Trade Policy Support",
        description: "Guidance on international trade regulations",
        funding: "Free consultation",
        duration: "Ongoing",
        status: "Active"
      },
      {
        name: "Industry Development Grants",
        description: "Support for strategic industry development",
        funding: "Up to $1 million",
        duration: "24 months",
        status: "Active"
      }
    ],
    regulations: [
      "Trade Agreements and Tariffs",
      "Industry Standards and Regulations",
      "Export Control Regulations",
      "Competition Law"
    ],
    insights: [
      "Stay informed about trade agreements and their impact on your business",
      "Understand competition law implications for your business model",
      "Leverage Singapore's trade agreements for market access",
      "Build compliance into your international expansion strategy"
    ],
    employeeTestimonials: [
      {
        name: "Dr. Robert Lee",
        position: "Deputy Director, Trade Policy",
        experience: "18 years",
        insight: "Singapore's extensive trade agreements provide startups with unique market access opportunities. Understand how to leverage these effectively."
      }
    ],
    resources: [
      "Trade Policy Guide",
      "Industry Development Roadmap",
      "Competition Law Guidelines",
      "Export Control Handbook"
    ]
  }
]

const CATEGORIES = [
  "Economic Development",
  "Financial Regulation", 
  "Digital Economy",
  "Policy & Regulation",
  "Innovation & Technology",
  "Trade & Investment",
  "Healthcare & Life Sciences",
  "Education & Skills"
]

export default function GovernmentAgenciesPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false)
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)
  const [sortBy, setSortBy] = useState("rating")
  
  // Communication Hub Integration
  const [activeConversation, setActiveConversation] = useState<any>(null)
  const [conversations, setConversations] = useState<any[]>([])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  
  // User Profile
  const [hasAgencyProfile, setHasAgencyProfile] = useState(false)
  const [userProfile, setUserProfile] = useState<any>(null)

  // Screen size detection
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Load user profile
  useEffect(() => {
    const profile = localStorage.getItem('agencyProfile')
    if (profile) {
      setHasAgencyProfile(true)
      setUserProfile(JSON.parse(profile))
    }
  }, [])

  // Communication handlers
  const handleConnect = async (agency: any) => {
    try {
      const conversation = {
        id: `conv-${agency.id}`,
        participant: agency,
        lastMessage: null,
        unreadCount: 0,
        createdAt: new Date(),
        status: 'connected',
        type: 'gov_agency'
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
        description: `Connection request sent to ${agency.name}. Conversation started.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send connection request. Please try again.",
        variant: "destructive"
      })
    }
  }

  const handleMessage = async (agency: any) => {
    try {
      const conversation = {
        id: `conv-${agency.id}`,
        participant: agency,
        lastMessage: null,
        unreadCount: 0,
        createdAt: new Date(),
        status: 'messaging',
        type: 'gov_agency'
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
        description: `Started conversation with ${agency.name}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start conversation. Please try again.",
        variant: "destructive"
      })
    }
  }

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const clearAllFilters = () => {
    setSearchQuery("")
    setSelectedCategories([])
    setShowVerifiedOnly(false)
    setShowFeaturedOnly(false)
  }

  const filteredAgencies = AGENCIES.filter(agency => {
    const matchesSearch = agency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agency.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agency.programs.some(prog => prog.name.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(agency.category)
    const matchesVerified = !showVerifiedOnly || agency.verified
    const matchesFeatured = !showFeaturedOnly || agency.featured

    return matchesSearch && matchesCategory && matchesVerified && matchesFeatured
  })

  const sortedAgencies = [...filteredAgencies].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating
      case "name":
        return a.name.localeCompare(b.name)
      case "reviews":
        return b.reviews - a.reviews
      default:
        return 0
    }
  })

  const hasActiveFilters = searchQuery || selectedCategories.length > 0 || showVerifiedOnly || showFeaturedOnly

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-lg font-bold text-gray-900">Government Agencies</h1>
          </div>
          <div className="flex items-center gap-2">
            {conversations.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveConversation(conversations[0])}
                className="relative"
              >
                <MessageSquare className="h-4 w-4" />
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

    <div className="container mx-auto max-w-7xl px-4 py-12">
        {/* Desktop Header */}
        <div className="hidden lg:block mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Government Agencies Directory</h1>
            <p className="text-[#334155] max-w-3xl">
              Connect with government agencies and access their programs, regulations, and insights to support your startup journey. 
              Find official guidance, funding opportunities, and regulatory information from Singapore's government bodies.
            </p>
          </div>
          <div className="flex items-center gap-2">
              <Link href="/network/government-agencies/create-profile">
                <Button className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Register Agency
                </Button>
              </Link>
            <Button variant="outline" size="sm" onClick={clearAllFilters} disabled={!hasActiveFilters}>
              Clear Filters
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            </div>
          </div>
        </div>

        {/* Mobile Description */}
        <div className="lg:hidden mb-6">
          <p className="text-gray-600 text-sm">
            Connect with government agencies and access their programs, regulations, and insights to support your startup journey.
          </p>
        </div>

        {/* User's Agency Profile Status */}
        {hasAgencyProfile && userProfile && (
          <Card className="mb-8 bg-gradient-to-r from-[#0F7377] to-[#0F7377]/90 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-full">
                    <Building className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Your Agency Profile</h3>
                    <p className="text-white/80 text-sm">
                      {userProfile.agencyName} • {userProfile.agencyType}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-500 text-white">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Active
                  </Badge>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => window.location.href = '/network/government-agencies/create-profile'}
                  >
                    Edit Profile
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-medium">Sectors</p>
                  <p className="text-white/80">
                    {userProfile.sectors?.slice(0, 3).join(', ')}
                    {userProfile.sectors?.length > 3 && '...'}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Programs</p>
                  <p className="text-white/80">
                    {userProfile.programs?.slice(0, 2).join(', ')}
                    {userProfile.programs?.length > 2 && '...'}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Geographic Scope</p>
                  <p className="text-white/80">{userProfile.geographicScope}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#334155]">Total Agencies</p>
                  <p className="text-2xl font-bold">{AGENCIES.length}</p>
                </div>
                <Building className="h-8 w-8 text-[#0F7377]" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#334155]">Verified</p>
                  <p className="text-2xl font-bold">{AGENCIES.filter(a => a.verified).length}</p>
                </div>
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#334155]">Active Programs</p>
                  <p className="text-2xl font-bold">{AGENCIES.reduce((acc, agency) => acc + agency.programs.filter(p => p.status === "Active").length, 0)}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#334155]">Avg Rating</p>
                  <p className="text-2xl font-bold">4.6</p>
                </div>
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <div className="sticky top-24 space-y-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Filters</h3>
                  {hasActiveFilters && (
                    <Badge variant="secondary" className="text-xs">
                      {filteredAgencies.length} results
                    </Badge>
                  )}
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Agency Category</label>
                    <div className="space-y-2">
                      {CATEGORIES.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox
                            id={category}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => handleCategoryToggle(category)}
                          />
                          <label htmlFor={category} className="text-sm">
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="verified"
                        checked={showVerifiedOnly}
                        onCheckedChange={(checked) => setShowVerifiedOnly(checked as boolean)}
                      />
                      <label htmlFor="verified" className="text-sm">Verified Only</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="featured"
                        checked={showFeaturedOnly}
                        onCheckedChange={(checked) => setShowFeaturedOnly(checked as boolean)}
                      />
                      <label htmlFor="featured" className="text-sm">Featured Agencies</label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="mb-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search agencies by name, programs, or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0F7377]"
              >
                <option value="rating">Sort by Rating</option>
                <option value="name">Sort by Name</option>
                <option value="reviews">Sort by Reviews</option>
              </select>
            </div>
          </div>

          <div className="space-y-6">
            {sortedAgencies.map((agency) => (
              <Card key={agency.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="h-20 w-20 relative rounded-lg overflow-hidden border border-gray-200 bg-white flex-shrink-0">
                      <img
                        src={agency.logo}
                        alt={agency.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <h3 className="text-xl font-semibold mr-2">{agency.name}</h3>
                          {agency.verified && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100 text-xs">
                              <Shield className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                          {agency.featured && (
                            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-100 text-xs">
                              <Star className="h-3 w-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleConnect(agency)}
                            className="text-[#0F7377] border-[#0F7377] hover:bg-[#0F7377] hover:text-white"
                          >
                            <MessageSquare className="h-3 w-3 mr-1" />
                            Connect
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleMessage(agency)}
                            className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white"
                          >
                            <Send className="h-3 w-3 mr-1" />
                            Message
                          </Button>
                          <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90" asChild>
                            <Link href={`/network/government-agencies/${agency.id}`}>
                              View Details
                              <ArrowUpRight className="ml-1 h-3 w-3" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-[#334155] mt-1">
                        <span className="font-medium">{agency.category}</span>
                        <span>•</span>
                        <span>{agency.location}</span>
                      </div>
                      
                      <p className="text-[#334155] mt-2">{agency.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mt-3">
                        {agency.programs.slice(0, 2).map((program) => (
                          <Badge key={program.name} variant="secondary" className="text-xs">
                            {program.name}
                          </Badge>
                        ))}
                        {agency.programs.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{agency.programs.length - 2} more
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-4 mt-4 text-xs text-[#334155]">
                        <div className="flex items-center">
                          <Star className="h-3 w-3 mr-1 text-yellow-500" />
                          {agency.rating} ({agency.reviews} reviews)
                        </div>
                        <div className="flex items-center">
                          <FileText className="h-3 w-3 mr-1" />
                          {agency.programs.length} programs
                        </div>
                        <div className="flex items-center">
                          <Gavel className="h-3 w-3 mr-1" />
                          {agency.regulations.length} regulations
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {agency.contactPhone}
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">Key Insights:</h4>
                        <ul className="text-xs text-[#334155] space-y-1">
                          {agency.insights.slice(0, 2).map((insight, index) => (
                            <li key={index} className="flex items-start">
                              <Lightbulb className="h-3 w-3 mr-2 mt-0.5 text-yellow-500 flex-shrink-0" />
                              {insight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {sortedAgencies.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="mb-4">
                    <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No agencies found</h3>
                    <p className="text-[#334155] mb-4">
                      Try adjusting your search criteria or filters to find more government agencies.
                    </p>
                    <Button onClick={clearAllFilters} variant="outline">
                      Clear All Filters
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {sortedAgencies.length > 0 && (
              <div className="flex justify-center mt-8">
                <Button variant="outline" className="gap-2">
                  View More Agencies
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Communication Hub Integration */}
      {activeConversation && (
        <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          {/* Conversation Header */}
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-[#0F7377] to-[#0F7377]/90 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Building className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{activeConversation.participant.name}</h3>
                  <p className="text-xs text-white/80">{activeConversation.participant.category} • {activeConversation.participant.location}</p>
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
                    <Building className="h-3 w-3 text-[#0F7377]" />
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                    <p className="text-sm text-gray-700">
                      Hi! I'm interested in learning about your {activeConversation.participant.programs?.slice(0, 2).join(' and ')} programs. 
                      Could you provide more information about eligibility requirements?
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Just now</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2 justify-end">
                  <div className="bg-[#0F7377] text-white rounded-lg p-3 max-w-xs">
                    <p className="text-sm">
                      Hello! I'd be happy to help you with information about our programs. 
                      We offer various {activeConversation.participant.programs?.slice(0, 2).join(' and ')} programs for startups.
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
                    <Building className="h-4 w-4 text-[#0F7377]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {conversation.participant.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {conversation.participant.category} • {conversation.participant.location}
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
              <MessageSquare className="h-6 w-6 text-[#0F7377]" />
              {conversations.length > 1 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#0F7377] text-white rounded-full flex items-center justify-center">
                  <span className="text-xs font-semibold">{conversations.length}</span>
                </div>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50">
        <div className="flex justify-around">
          <Button variant="ghost" className="flex flex-col items-center space-y-1 p-2">
            <Building className="w-5 h-5 text-gray-600" />
            <span className="text-xs font-medium text-gray-600">Agencies</span>
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
            <MessageSquare className="w-5 h-5 text-gray-600" />
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