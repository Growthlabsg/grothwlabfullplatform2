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
  Send,
  X,
  Plus,
  CheckCircle,
  AlertCircle,
  Shield,
  Eye as EyeIcon,
  SortAsc,
  SortDesc,
  RefreshCw,
  Bell,
  LinkIcon,
  BarChart3,
  Settings,
  Lock,
  User,
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
  Sigma as SigmaIcon
} from "lucide-react"
import Link from "next/link"

// Mock data for industry experts
const EXPERTS = [
  {
    id: "1",
    name: "Dr. Sarah Chen",
    avatar: "/fintech-expert.png",
    title: "Chief Technology Officer",
    company: "FinTech Innovations Ltd",
    industry: "Financial Technology",
    location: "Singapore",
    experience: "15+ years",
    expertise: ["Blockchain", "Digital Payments", "RegTech", "AI in Finance"],
    bio: "Leading fintech expert with experience in building scalable payment solutions and regulatory technology. Former VP at major banks with deep knowledge of Southeast Asian markets.",
    insights: [
      "Focus on regulatory compliance from day one",
      "Build partnerships with traditional financial institutions",
      "Invest in security and fraud prevention early",
      "Understand local payment preferences and behaviors"
    ],
    contactEmail: "sarah.chen@fintechinnovations.com",
    linkedin: "https://linkedin.com/in/sarahchen",
    website: "https://fintechinnovations.com",
    verified: true,
    rating: 4.9,
    reviews: 127,
    availability: "Available for consultation",
    hourlyRate: "$500",
    languages: ["English", "Mandarin", "Malay"],
    certifications: ["CFA", "CISSP", "AWS Solutions Architect"],
    featured: true
  },
  {
    id: "2",
    name: "Dr. Michael Rodriguez",
    avatar: "/healthcare-professional.png",
    title: "Healthcare Innovation Director",
    company: "MedTech Solutions",
    industry: "Healthcare Technology",
    location: "Singapore",
    experience: "12+ years",
    expertise: ["Telemedicine", "Medical AI", "Health Data Analytics", "Regulatory Compliance"],
    bio: "Healthcare technology pioneer with experience in developing AI-powered diagnostic tools and telemedicine platforms. Expert in navigating healthcare regulations across Asia-Pacific.",
    insights: [
      "Patient privacy and data security are non-negotiable",
      "Build trust with healthcare providers and institutions",
      "Focus on solving real clinical problems, not just technology",
      "Understand the healthcare reimbursement landscape"
    ],
    contactEmail: "michael.rodriguez@medtechsolutions.com",
    linkedin: "https://linkedin.com/in/michaelrodriguez",
    website: "https://medtechsolutions.com",
    verified: true,
    rating: 4.8,
    reviews: 89,
    availability: "Available for consultation",
    hourlyRate: "$450",
    languages: ["English", "Spanish"],
    certifications: ["MD", "MBA", "Health Informatics"],
    featured: false
  },
  {
    id: "3",
    name: "Priya Patel",
    avatar: "/marketing-expert.png",
    title: "Digital Marketing Strategist",
    company: "Growth Marketing Pro",
    industry: "Marketing & Growth",
    location: "Singapore",
    experience: "10+ years",
    expertise: ["Growth Hacking", "Digital Marketing", "Customer Acquisition", "Brand Strategy"],
    bio: "Digital marketing expert specializing in growth hacking and customer acquisition strategies. Helped 50+ startups scale their marketing efforts and achieve sustainable growth.",
    insights: [
      "Focus on customer acquisition cost (CAC) from the start",
      "Build a strong brand foundation before scaling",
      "Use data to drive marketing decisions",
      "Test multiple channels before committing to one"
    ],
    contactEmail: "priya.patel@growthmarketingpro.com",
    linkedin: "https://linkedin.com/in/priyapatel",
    website: "https://growthmarketingpro.com",
    verified: true,
    rating: 4.7,
    reviews: 156,
    availability: "Available for consultation",
    hourlyRate: "$350",
    languages: ["English", "Hindi"],
    certifications: ["Google Ads", "Facebook Blueprint", "HubSpot"],
    featured: true
  },
  {
    id: "4",
    name: "James Wilson",
    avatar: "/confident-professional.png",
    title: "Supply Chain Optimization Expert",
    company: "LogiTech Solutions",
    industry: "Logistics & Supply Chain",
    location: "Singapore",
    experience: "18+ years",
    expertise: ["Supply Chain Management", "Logistics Optimization", "E-commerce Fulfillment", "International Trade"],
    bio: "Supply chain expert with deep experience in optimizing logistics operations for e-commerce and manufacturing companies. Specialist in Southeast Asian supply chain networks.",
    insights: [
      "Build redundancy into your supply chain",
      "Understand customs and trade regulations",
      "Invest in technology for real-time tracking",
      "Develop strong relationships with logistics partners"
    ],
    contactEmail: "james.wilson@logitechsolutions.com",
    linkedin: "https://linkedin.com/in/jameswilson",
    website: "https://logitechsolutions.com",
    verified: true,
    rating: 4.6,
    reviews: 73,
    availability: "Available for consultation",
    hourlyRate: "$400",
    languages: ["English", "Mandarin"],
    certifications: ["CSCP", "CPIM", "Six Sigma Black Belt"],
    featured: false
  },
  {
    id: "5",
    name: "Dr. Emily Zhang",
    avatar: "/professional-connections.png",
    title: "AI Research Director",
    company: "AI Research Institute",
    industry: "Artificial Intelligence",
    location: "Singapore",
    experience: "14+ years",
    expertise: ["Machine Learning", "Computer Vision", "Natural Language Processing", "AI Ethics"],
    bio: "AI researcher and entrepreneur with expertise in developing practical AI solutions for businesses. Focus on responsible AI development and ethical implementation.",
    insights: [
      "Start with a clear problem definition before applying AI",
      "Invest in data quality and infrastructure",
      "Consider ethical implications of AI decisions",
      "Build explainable AI systems for trust"
    ],
    contactEmail: "emily.zhang@airesearchinstitute.com",
    linkedin: "https://linkedin.com/in/emilyzhang",
    website: "https://airesearchinstitute.com",
    verified: true,
    rating: 4.9,
    reviews: 94,
    availability: "Available for consultation",
    hourlyRate: "$550",
    languages: ["English", "Mandarin"],
    certifications: ["PhD Computer Science", "TensorFlow Developer", "AWS Machine Learning"],
    featured: true
  }
]

const INDUSTRIES = [
  "Financial Technology",
  "Healthcare Technology", 
  "Marketing & Growth",
  "Logistics & Supply Chain",
  "Artificial Intelligence",
  "Education Technology",
  "Clean Technology",
  "E-commerce",
  "SaaS",
  "Cybersecurity"
]

export default function IndustryExpertsPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([])
  const [selectedExperience, setSelectedExperience] = useState<string[]>([])
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false)
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)
  const [sortBy, setSortBy] = useState("rating")
  
  // Communication Hub Integration
  const [activeConversation, setActiveConversation] = useState<any>(null)
  const [conversations, setConversations] = useState<any[]>([])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  
  // User Profile
  const [hasExpertProfile, setHasExpertProfile] = useState(false)
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
    const profile = localStorage.getItem('expertProfile')
    if (profile) {
      setHasExpertProfile(true)
      setUserProfile(JSON.parse(profile))
    }
  }, [])

  // Communication handlers
  const handleConnect = async (expert: any) => {
    try {
      const conversation = {
        id: `conv-${expert.id}`,
        participant: expert,
        lastMessage: null,
        unreadCount: 0,
        createdAt: new Date(),
        status: 'connected',
        type: 'expert'
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
        description: `Connection request sent to ${expert.name}. Conversation started.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send connection request. Please try again.",
        variant: "destructive"
      })
    }
  }

  const handleMessage = async (expert: any) => {
    try {
      const conversation = {
        id: `conv-${expert.id}`,
        participant: expert,
        lastMessage: null,
        unreadCount: 0,
        createdAt: new Date(),
        status: 'messaging',
        type: 'expert'
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
        description: `Started conversation with ${expert.name}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start conversation. Please try again.",
        variant: "destructive"
      })
    }
  }

  const handleIndustryToggle = (industry: string) => {
    setSelectedIndustries(prev => 
      prev.includes(industry) 
        ? prev.filter(i => i !== industry)
        : [...prev, industry]
    )
  }

  const handleExperienceToggle = (experience: string) => {
    setSelectedExperience(prev => 
      prev.includes(experience) 
        ? prev.filter(e => e !== experience)
        : [...prev, experience]
    )
  }

  const clearAllFilters = () => {
    setSearchQuery("")
    setSelectedIndustries([])
    setSelectedExperience([])
    setShowVerifiedOnly(false)
    setShowFeaturedOnly(false)
  }

  const filteredExperts = EXPERTS.filter(expert => {
    const matchesSearch = expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         expert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         expert.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         expert.expertise.some(exp => exp.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesIndustry = selectedIndustries.length === 0 || selectedIndustries.includes(expert.industry)
    const matchesExperience = selectedExperience.length === 0 || 
                             selectedExperience.some(exp => expert.experience.includes(exp))
    const matchesVerified = !showVerifiedOnly || expert.verified
    const matchesFeatured = !showFeaturedOnly || expert.featured

    return matchesSearch && matchesIndustry && matchesExperience && matchesVerified && matchesFeatured
  })

  const sortedExperts = [...filteredExperts].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating
      case "experience":
        return parseInt(b.experience) - parseInt(a.experience)
      case "name":
        return a.name.localeCompare(b.name)
      case "hourlyRate":
        return parseInt(b.hourlyRate.replace("$", "")) - parseInt(a.hourlyRate.replace("$", ""))
      default:
        return 0
    }
  })

  const hasActiveFilters = searchQuery || selectedIndustries.length > 0 || 
                          selectedExperience.length > 0 || showVerifiedOnly || showFeaturedOnly

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-lg font-bold text-gray-900">Industry Experts</h1>
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
              <h1 className="text-3xl font-bold mb-2">Industry Experts Directory</h1>
              <p className="text-[#334155] max-w-3xl">
                Connect with experienced industry professionals who can guide your startup journey. 
                Find mentors, advisors, and consultants across various sectors to accelerate your growth.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/network/industry-experts/create-profile">
                <Button className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Become an Expert
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
            Connect with experienced industry professionals who can guide your startup journey.
          </p>
        </div>

        {/* User's Expert Profile Status */}
        {hasExpertProfile && userProfile && (
          <Card className="mb-8 bg-gradient-to-r from-[#0F7377] to-[#0F7377]/90 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-full">
                    <Target className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Your Expert Profile</h3>
                    <p className="text-white/80 text-sm">
                      {userProfile.firstName} {userProfile.lastName} • {userProfile.company}
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
                    onClick={() => window.location.href = '/network/industry-experts/create-profile'}
                  >
                    Edit Profile
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-medium">Expertise Areas</p>
                  <p className="text-white/80">
                    {userProfile.expertiseAreas?.slice(0, 3).join(', ')}
                    {userProfile.expertiseAreas?.length > 3 && '...'}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Industry Experience</p>
                  <p className="text-white/80">
                    {userProfile.industryExperience?.slice(0, 2).join(', ')}
                    {userProfile.industryExperience?.length > 2 && '...'}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Time Commitment</p>
                  <p className="text-white/80">{userProfile.timeCommitment}</p>
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
                  <p className="text-sm text-[#334155]">Total Experts</p>
                  <p className="text-2xl font-bold">{EXPERTS.length}</p>
                </div>
                <Users className="h-8 w-8 text-[#0F7377]" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#334155]">Verified</p>
                  <p className="text-2xl font-bold">{EXPERTS.filter(e => e.verified).length}</p>
                </div>
                <Award className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#334155]">Featured</p>
                  <p className="text-2xl font-bold">{EXPERTS.filter(e => e.featured).length}</p>
                </div>
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#334155]">Avg Rating</p>
                  <p className="text-2xl font-bold">4.8</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
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
                      {filteredExperts.length} results
                    </Badge>
                  )}
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Industry</label>
                    <div className="space-y-2">
                      {INDUSTRIES.map((industry) => (
                        <div key={industry} className="flex items-center space-x-2">
                          <Checkbox
                            id={industry}
                            checked={selectedIndustries.includes(industry)}
                            onCheckedChange={() => handleIndustryToggle(industry)}
                          />
                          <label htmlFor={industry} className="text-sm">
                            {industry}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Experience Level</label>
                    <div className="space-y-2">
                      {["5+ years", "10+ years", "15+ years", "20+ years"].map((experience) => (
                        <div key={experience} className="flex items-center space-x-2">
                          <Checkbox
                            id={experience}
                            checked={selectedExperience.includes(experience)}
                            onCheckedChange={() => handleExperienceToggle(experience)}
                          />
                          <label htmlFor={experience} className="text-sm">
                            {experience}
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
                      <label htmlFor="featured" className="text-sm">Featured Experts</label>
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
                  placeholder="Search experts by name, expertise, or company..."
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
                <option value="experience">Sort by Experience</option>
                <option value="name">Sort by Name</option>
                <option value="hourlyRate">Sort by Rate</option>
              </select>
            </div>
          </div>

          <div className="space-y-6">
            {sortedExperts.map((expert) => (
              <Card key={expert.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="h-20 w-20 relative rounded-lg overflow-hidden border border-gray-200 bg-white flex-shrink-0">
                      <img
                        src={expert.avatar}
                        alt={expert.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <h3 className="text-xl font-semibold mr-2">{expert.name}</h3>
                          {expert.verified && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100 text-xs">
                              <Award className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                          {expert.featured && (
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
                            onClick={() => handleConnect(expert)}
                            className="text-[#0F7377] border-[#0F7377] hover:bg-[#0F7377] hover:text-white"
                          >
                            <MessageSquare className="h-3 w-3 mr-1" />
                            Connect
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleMessage(expert)}
                            className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white"
                          >
                            <Send className="h-3 w-3 mr-1" />
                            Message
                          </Button>
                          <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90" asChild>
                            <Link href={`/network/industry-experts/${expert.id}`}>
                              View Profile
                              <ArrowUpRight className="ml-1 h-3 w-3" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-[#334155] mt-1">
                        <span className="font-medium">{expert.title}</span>
                        <span>•</span>
                        <span>{expert.company}</span>
                        <span>•</span>
                        <span>{expert.location}</span>
                      </div>
                      
                      <p className="text-[#334155] mt-2">{expert.bio}</p>
                      
                      <div className="flex flex-wrap gap-2 mt-3">
                        {expert.expertise.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex flex-wrap gap-4 mt-4 text-xs text-[#334155]">
                        <div className="flex items-center">
                          <Star className="h-3 w-3 mr-1 text-yellow-500" />
                          {expert.rating} ({expert.reviews} reviews)
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {expert.experience}
                        </div>
                        <div className="flex items-center">
                          <Zap className="h-3 w-3 mr-1" />
                          {expert.hourlyRate}/hr
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {expert.availability}
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">Key Insights:</h4>
                        <ul className="text-xs text-[#334155] space-y-1">
                          {expert.insights.slice(0, 2).map((insight, index) => (
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

            {sortedExperts.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="mb-4">
                    <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No experts found</h3>
                    <p className="text-[#334155] mb-4">
                      Try adjusting your search criteria or filters to find more experts.
                    </p>
                    <Button onClick={clearAllFilters} variant="outline">
                      Clear All Filters
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {sortedExperts.length > 0 && (
              <div className="flex justify-center mt-8">
                <Button variant="outline" className="gap-2">
                  View More Experts
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
                  <Target className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{activeConversation.participant.name}</h3>
                  <p className="text-xs text-white/80">{activeConversation.participant.title} • {activeConversation.participant.company}</p>
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
                    <Target className="h-3 w-3 text-[#0F7377]" />
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                    <p className="text-sm text-gray-700">
                      Hi! I'm interested in getting expert advice on {activeConversation.participant.expertise?.slice(0, 2).join(' and ')}. 
                      Could you tell me about your consultation approach?
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Just now</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2 justify-end">
                  <div className="bg-[#0F7377] text-white rounded-lg p-3 max-w-xs">
                    <p className="text-sm">
                      Hello! I'd be happy to help you with expert consultation. 
                      I typically focus on {activeConversation.participant.expertise?.slice(0, 2).join(' and ')} expertise.
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
                    <Target className="h-4 w-4 text-[#0F7377]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {conversation.participant.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {conversation.participant.title} • {conversation.participant.company}
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
            <Target className="w-5 h-5 text-gray-600" />
            <span className="text-xs font-medium text-gray-600">Experts</span>
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