"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { 
  AppWindow, 
  DollarSign, 
  Star,
  Heart,
  Eye,
  Share2,
  Clock,
  CheckCircle,
  Download,
  Play,
  Cloud,
  ExternalLink,
  Copy,
  Plus,
  Upload,
  Handshake,
  Building2,
  Code,
  Gift,
  MapPin,
  Search,
  Filter,
  Users,
  TrendingUp,
  ArrowLeft,
  MoreHorizontal,
  X,
  Bookmark,
  BookmarkCheck,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Flag,
  AlertCircle,
  Info,
  Settings,
  HelpCircle,
  Calendar,
  Globe,
  Phone,
  Mail,
  Link as LinkIcon,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Zap,
  Rocket,
  Award,
  Trophy,
  Medal,
  Crown,
  Gem,
  Sparkles,
  MousePointer,
  RefreshCw,
  Save,
  Edit,
  Trash2,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Maximize2,
  Minimize2,
  RotateCcw,
  RotateCw,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  MessageSquare,
  Reply,
  Archive,
  Tag,
  Folder,
  FolderOpen,
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
  ThumbsUp as ThumbsUpIcon,
  ThumbsDown as ThumbsDownIcon,
  Briefcase,
  GraduationCap,
  BookOpen,
  Database,
  Server,
  Wifi,
  WifiOff,
  Image,
  Video,
  TrendingDown,
  LineChart,
  BarChart,
  TrendingUp as TrendingUpIcon
} from "lucide-react"
import Link from "next/link"

export default function AppsDealsPage() {
  const { toast } = useToast()
  const [isMobile, setIsMobile] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [showSubmitApp, setShowSubmitApp] = useState(false)
  const [showSubmitDeal, setShowSubmitDeal] = useState(false)
  const [appFormData, setAppFormData] = useState({
    // Basic Information
    title: "",
    company: "",
    description: "",
    website: "",
    contactEmail: "",
    contactPhone: "",
    
    // App Details
    type: "",
    trialPeriod: "",
    pricing: "",
    category: "",
    targetAudience: "",
    keyFeatures: "",
    screenshots: [],
    
    // Technical Information
    platform: [],
    integrations: "",
    apiAvailable: false,
    dataSecurity: "",
    compliance: [],
    
    // Business Information
    foundedYear: "",
    teamSize: "",
    funding: "",
    revenue: "",
    competitors: "",
    uniqueValue: "",
    
    // Marketing Information
    socialMedia: {
      linkedin: "",
      twitter: "",
      facebook: "",
      instagram: ""
    },
    marketingMaterials: "",
    pressReleases: "",
    caseStudies: "",
    
    // Support Information
    supportChannels: [],
    documentation: "",
    training: "",
    onboarding: "",
    
    // Additional Information
    tags: "",
    additionalInfo: "",
    termsAccepted: false,
    privacyAccepted: false
  })
  
  const [dealFormData, setDealFormData] = useState({
    // Basic Information
    title: "",
    company: "",
    description: "",
    website: "",
    contactEmail: "",
    contactPhone: "",
    
    // Deal Details
    type: "",
    value: "",
    discount: "",
    deadline: "",
    location: "",
    category: "",
    industry: "",
    
    // Requirements
    requirements: "",
    eligibility: "",
    verification: "",
    restrictions: "",
    
    // Benefits
    benefits: "",
    additionalValue: "",
    support: "",
    terms: "",
    
    // Business Information
    companySize: "",
    foundedYear: "",
    teamSize: "",
    revenue: "",
    clients: "",
    testimonials: "",
    
    // Marketing Information
    socialMedia: {
      linkedin: "",
      twitter: "",
      facebook: "",
      instagram: ""
    },
    marketingMaterials: "",
    pressReleases: "",
    caseStudies: "",
    
    // Additional Information
    couponCode: "",
    additionalInfo: "",
    termsAccepted: false,
    privacyAccepted: false
  })
  const [favorites, setFavorites] = useState<Set<number>>(new Set())
  const [bookmarks, setBookmarks] = useState<Set<number>>(new Set())
  const [showFilters, setShowFilters] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [sortBy, setSortBy] = useState("newest")
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Sample data
  const apps = [
    {
      id: 1,
      title: "GrowthLab CRM Pro",
      company: "GrowthLab Team",
      description: "Complete customer relationship management for startups with AI-powered insights",
      type: "trial",
      trialPeriod: "30 days",
      pricing: "Free trial, $29/month after",
      rating: 4.8,
      downloads: 1247,
      likes: 156,
      views: 2891,
      featured: true,
      category: "CRM",
      status: "active",
      lastUpdated: "2024-01-15",
      website: "https://growthlab-crm.com",
      supportEmail: "support@growthlab-crm.com",
      tags: ["CRM", "Sales", "AI", "Analytics"],
      features: ["Lead Management", "Pipeline Tracking", "AI Insights", "Team Collaboration"],
      screenshots: ["/screenshots/crm-1.png", "/screenshots/crm-2.png"],
      reviews: 89,
      verified: true
    },
    {
      id: 2,
      title: "Startup Analytics Dashboard",
      company: "DataFlow Solutions",
      description: "Real-time analytics and reporting dashboard for startup metrics and KPIs",
      type: "beta",
      trialPeriod: "14 days",
      pricing: "Free during beta, $49/month after",
      rating: 4.9,
      downloads: 892,
      likes: 203,
      views: 2134,
      featured: true,
      category: "Analytics",
      status: "active",
      lastUpdated: "2024-01-10",
      website: "https://dataflow-analytics.com",
      supportEmail: "support@dataflow.com",
      tags: ["Analytics", "Dashboard", "KPIs", "Real-time"],
      features: ["Real-time Metrics", "Custom Dashboards", "Team Reports", "API Integration"],
      screenshots: ["/screenshots/analytics-1.png", "/screenshots/analytics-2.png"],
      reviews: 67,
      verified: true
    },
    {
      id: 3,
      title: "Marketing Automation Suite",
      company: "GrowthTech Inc",
      description: "Comprehensive marketing automation platform for startups and growing businesses",
      type: "trial",
      trialPeriod: "21 days",
      pricing: "Free trial, $39/month after",
      rating: 4.7,
      downloads: 567,
      likes: 134,
      views: 1456,
      featured: false,
      category: "Marketing",
      status: "active",
      lastUpdated: "2024-01-05",
      website: "https://growthtech-marketing.com",
      supportEmail: "hello@growthtech.com",
      tags: ["Marketing", "Automation", "Email", "Campaigns"],
      features: ["Email Campaigns", "Lead Scoring", "A/B Testing", "Social Media Integration"],
      screenshots: ["/screenshots/marketing-1.png"],
      reviews: 45,
      verified: false
    },
    {
      id: 4,
      title: "Financial Planning Tool",
      company: "FinanceFlow",
      description: "AI-powered financial planning and budgeting tool for startups",
      type: "free",
      trialPeriod: "Unlimited",
      pricing: "Free forever",
      rating: 4.6,
      downloads: 234,
      likes: 78,
      views: 892,
      featured: false,
      category: "Finance",
      status: "active",
      lastUpdated: "2024-01-01",
      website: "https://financeflow.io",
      supportEmail: "support@financeflow.io",
      tags: ["Finance", "Budgeting", "Planning", "AI"],
      features: ["Budget Tracking", "Financial Forecasting", "Expense Management", "Investment Planning"],
      screenshots: ["/screenshots/finance-1.png"],
      reviews: 23,
      verified: true
    }
  ]

  const deals = [
    {
      id: 1,
      title: "AWS Cloud Credits - 50% Off for Startups",
      company: "Amazon Web Services",
      description: "Exclusive AWS cloud credits offering 50% discount on cloud services for qualifying startups",
      type: "discount",
      value: 10000,
      discount: 50,
      location: "Global",
      deadline: "2024-12-31",
      views: 1247,
      likes: 156,
      featured: true,
      category: "Cloud Services",
      status: "active",
      lastUpdated: "2024-01-15",
      website: "https://aws.amazon.com",
      contactEmail: "startups@aws.com",
      requirements: ["Startup must be less than 2 years old", "Valid business registration"],
      benefits: ["50% off cloud services", "Free technical support", "Dedicated account manager"],
      couponCode: "STARTUP50",
      terms: "Valid for 12 months from activation",
      verified: true
    },
    {
      id: 2,
      title: "Stripe Payment Processing - Zero Fees for 6 Months",
      company: "Stripe",
      description: "Special offer from Stripe: zero processing fees for the first 6 months for new startups",
      type: "discount",
      value: 5000,
      discount: 100,
      location: "Global",
      deadline: "2024-06-30",
      views: 892,
      likes: 203,
      featured: true,
      category: "Payments",
      status: "active",
      lastUpdated: "2024-01-10",
      website: "https://stripe.com",
      contactEmail: "startups@stripe.com",
      requirements: ["New Stripe account", "Startup verification"],
      benefits: ["Zero processing fees", "Priority support", "Custom integration help"],
      couponCode: "ZEROFEES",
      terms: "Valid for 6 months from account creation",
      verified: true
    },
    {
      id: 3,
      title: "Google Cloud Platform - $300 Credits",
      company: "Google Cloud",
      description: "Free $300 in Google Cloud credits for new startup accounts",
      type: "credits",
      value: 300,
      discount: 100,
      location: "Global",
      deadline: "2024-12-31",
      views: 567,
      likes: 89,
      featured: false,
      category: "Cloud Services",
      status: "active",
      lastUpdated: "2024-01-05",
      website: "https://cloud.google.com",
      contactEmail: "startups@google.com",
      requirements: ["New Google Cloud account", "Credit card verification"],
      benefits: ["$300 free credits", "Free tier access", "Technical support"],
      couponCode: "GCP300",
      terms: "Credits expire after 12 months",
      verified: true
    },
    {
      id: 4,
      title: "HubSpot CRM - Free Forever Plan",
      company: "HubSpot",
      description: "Free forever CRM plan with advanced features for startups",
      type: "free",
      value: 0,
      discount: 100,
      location: "Global",
      deadline: "2024-12-31",
      views: 1234,
      likes: 234,
      featured: false,
      category: "CRM",
      status: "active",
      lastUpdated: "2024-01-01",
      website: "https://hubspot.com",
      contactEmail: "startups@hubspot.com",
      requirements: ["Business email address", "Company information"],
      benefits: ["Unlimited contacts", "Email tracking", "Deal pipeline", "Custom properties"],
      couponCode: "HUBSPOTFREE",
      terms: "No credit card required",
      verified: true
    }
  ]

  const categories = [
    { id: "all", name: "All Items", count: apps.length + deals.length },
    { id: "apps", name: "Apps & Software", count: apps.length },
    { id: "deals", name: "Deals & Discounts", count: deals.length },
    { id: "crm", name: "CRM", count: apps.filter(app => app.category === "CRM").length + deals.filter(deal => deal.category === "CRM").length },
    { id: "analytics", name: "Analytics", count: apps.filter(app => app.category === "Analytics").length },
    { id: "marketing", name: "Marketing", count: apps.filter(app => app.category === "Marketing").length },
    { id: "finance", name: "Finance", count: apps.filter(app => app.category === "Finance").length },
    { id: "cloud", name: "Cloud Services", count: deals.filter(deal => deal.category === "Cloud Services").length },
    { id: "payments", name: "Payments", count: deals.filter(deal => deal.category === "Payments").length }
  ]

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
    toast({ title: favorites.has(id) ? "Removed from favorites" : "Added to favorites" })
  }

  const toggleBookmark = (id: number) => {
    setBookmarks((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
    toast({ title: bookmarks.has(id) ? "Removed from bookmarks" : "Added to bookmarks" })
  }

  const shareItem = (item: any) => {
    const url = `${typeof window !== 'undefined' ? window.location.origin : ''}/apps-deals?id=${item.id}`
    navigator.clipboard.writeText(url)
    toast({ title: "Link copied to clipboard" })
  }

  const copyCoupon = (code: string) => {
    navigator.clipboard.writeText(code)
    toast({ title: "Coupon copied", description: `Code: ${code}` })
  }

  const handleAppFormChange = (field: string, value: any) => {
    setAppFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleDealFormChange = (field: string, value: any) => {
    setDealFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmitApp = () => {
    // Validate required fields
    if (!appFormData.title || !appFormData.company || !appFormData.description || !appFormData.contactEmail) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields marked with *",
        variant: "destructive"
      })
      return
    }

    if (!appFormData.termsAccepted || !appFormData.privacyAccepted) {
      toast({
        title: "Terms Not Accepted",
        description: "Please accept the terms and conditions and privacy policy",
        variant: "destructive"
      })
      return
    }

    toast({ 
      title: "🎉 App submitted successfully!", 
      description: "Your app has been submitted for review. GrowthLab employees will review and approve it within 24-48 hours. You'll receive an email notification once it's live!" 
    })
    setShowSubmitApp(false)
    setAppFormData({
      title: "",
      company: "",
      description: "",
      website: "",
      contactEmail: "",
      contactPhone: "",
      type: "",
      trialPeriod: "",
      pricing: "",
      category: "",
      targetAudience: "",
      keyFeatures: "",
      screenshots: [],
      platform: [],
      integrations: "",
      apiAvailable: false,
      dataSecurity: "",
      compliance: [],
      foundedYear: "",
      teamSize: "",
      funding: "",
      revenue: "",
      competitors: "",
      uniqueValue: "",
      socialMedia: {
        linkedin: "",
        twitter: "",
        facebook: "",
        instagram: ""
      },
      marketingMaterials: "",
      pressReleases: "",
      caseStudies: "",
      supportChannels: [],
      documentation: "",
      training: "",
      onboarding: "",
      tags: "",
      additionalInfo: "",
      termsAccepted: false,
      privacyAccepted: false
    })
  }

  const handleSubmitDeal = () => {
    // Validate required fields
    if (!dealFormData.title || !dealFormData.company || !dealFormData.description || !dealFormData.contactEmail) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields marked with *",
        variant: "destructive"
      })
      return
    }

    if (!dealFormData.termsAccepted || !dealFormData.privacyAccepted) {
      toast({
        title: "Terms Not Accepted",
        description: "Please accept the terms and conditions and privacy policy",
        variant: "destructive"
      })
      return
    }

    toast({ 
      title: "🎉 Deal submitted successfully!", 
      description: "Your deal has been submitted for review. GrowthLab employees will review and approve it within 24-48 hours. You'll receive an email notification once it's live!" 
    })
    setShowSubmitDeal(false)
    setDealFormData({
      title: "",
      company: "",
      description: "",
      website: "",
      contactEmail: "",
      contactPhone: "",
      type: "",
      value: "",
      discount: "",
      deadline: "",
      location: "",
      category: "",
      industry: "",
      requirements: "",
      eligibility: "",
      verification: "",
      restrictions: "",
      benefits: "",
      additionalValue: "",
      support: "",
      terms: "",
      companySize: "",
      foundedYear: "",
      teamSize: "",
      revenue: "",
      clients: "",
      testimonials: "",
      socialMedia: {
        linkedin: "",
        twitter: "",
        facebook: "",
        instagram: ""
      },
      marketingMaterials: "",
      pressReleases: "",
      caseStudies: "",
      couponCode: "",
      additionalInfo: "",
      termsAccepted: false,
      privacyAccepted: false
    })
  }

  const renderAppCard = (app: any) => (
    <Card key={app.id} className="hover:shadow-lg transition-all duration-200 group">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className={`${app.type === "trial" ? "bg-green-100 text-green-800" : app.type === "beta" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"}`}>
              <Play className="w-4 h-4" />
              {app.type === "trial" ? "Free Trial" : app.type === "beta" ? "Beta Testing" : "Free"}
              </Badge>
            {app.featured && (
                <Badge variant="secondary" className="bg-[#F59E0B] text-white">
                  <Star className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
              )}
            {app.verified && (
              <Badge variant="outline" className="text-green-600 border-green-600">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            )}
            </div>
          <div className="flex items-center gap-1">
            <button 
              type="button" 
              className={`p-1 rounded hover:bg-gray-100 ${bookmarks.has(app.id) ? 'text-blue-500' : 'text-gray-500'}`} 
              onClick={() => toggleBookmark(app.id)} 
            >
              {bookmarks.has(app.id) ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </button>
          <button 
            type="button" 
            className={`p-1 rounded hover:bg-gray-100 ${favorites.has(app.id) ? 'text-rose-500' : 'text-gray-500'}`} 
            onClick={() => toggleFavorite(app.id)} 
          >
            <Heart className={`w-4 h-4 ${favorites.has(app.id) ? 'fill-rose-500' : ''}`} />
              </button>
              </div>
        </div>
        <CardTitle className="text-lg group-hover:text-[#0F7377] transition-colors">{app.title}</CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-2">{app.description}</p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Building2 className="w-3 h-3" />
          {app.company}
          <span className="text-gray-400">•</span>
          <span>{app.category}</span>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-1 mb-4">
          {app.tags.slice(0, 3).map((tag: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          {app.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{app.tags.length - 3} more
            </Badge>
          )}
          </div>
        
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Trial Period:</span>
            <span className="font-medium">{app.trialPeriod}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Pricing:</span>
            <span className="font-medium">{app.pricing}</span>
              </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Last Updated:</span>
            <span className="font-medium">{new Date(app.lastUpdated).toISOString().split('T')[0]}</span>
              </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Download className="w-4 h-4" />
              {app.downloads.toLocaleString()}
              </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              {app.rating}
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              {app.likes}
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {app.views}
          </div>
        </div>
        </div>
        
        <div className="space-y-2">
          <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90" size="sm">
            <ExternalLink className="w-4 h-4 mr-2" />
            Visit App
          </Button>
          <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" onClick={() => shareItem(app)}>
              <Share2 className="w-4 h-4 mr-1" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <MessageCircle className="w-4 h-4 mr-1" />
              Discuss
          </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderDealCard = (deal: any) => (
    <Card key={deal.id} className="hover:shadow-lg transition-all duration-200 group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className={`${deal.type === "discount" ? "bg-orange-100 text-orange-800" : deal.type === "credits" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}`}>
              <Gift className="w-4 h-4" />
              {deal.type === "discount" ? "Discount" : deal.type === "credits" ? "Credits" : "Free Offer"}
            </Badge>
            {deal.featured && (
              <Badge variant="secondary" className="bg-[#F59E0B] text-white">
                <Star className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            )}
            {deal.verified && (
              <Badge variant="outline" className="text-green-600 border-green-600">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1">
            <button 
              type="button" 
              className={`p-1 rounded hover:bg-gray-100 ${bookmarks.has(deal.id) ? 'text-blue-500' : 'text-gray-500'}`} 
              onClick={() => toggleBookmark(deal.id)} 
            >
              {bookmarks.has(deal.id) ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            </button>
          <button 
            type="button" 
            className={`p-1 rounded hover:bg-gray-100 ${favorites.has(deal.id) ? 'text-rose-500' : 'text-gray-500'}`} 
            onClick={() => toggleFavorite(deal.id)} 
          >
            <Heart className={`w-4 h-4 ${favorites.has(deal.id) ? 'fill-rose-500' : ''}`} />
          </button>
        </div>
        </div>
        <CardTitle className="text-lg group-hover:text-[#0F7377] transition-colors">{deal.title}</CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-2">{deal.description}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Building2 className="w-3 h-3" />
          {deal.company}
          <span className="text-gray-400">•</span>
          <span>{deal.category}</span>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-4 mb-4">
                 <div>
                   <p className="text-xs text-muted-foreground">Deal Value</p>
            <p className="text-lg font-bold text-[#0F7377]">${deal.value.toLocaleString()}</p>
                 </div>
                 <div>
                   <p className="text-xs text-muted-foreground">Discount</p>
            <p className="text-lg font-bold text-green-600">{deal.discount}%</p>
                 </div>
               </div>
        
        <div className="space-y-2 mb-4">
                 <div className="flex items-center justify-between text-sm">
                   <span className="text-muted-foreground">Location:</span>
                   <span className="flex items-center gap-1">
                     <MapPin className="w-3 h-3" />
              {deal.location}
                   </span>
                 </div>
                 <div className="flex items-center justify-between text-sm">
                   <span className="text-muted-foreground">Deadline:</span>
            <span>{new Date(deal.deadline).toISOString().split('T')[0]}</span>
                 </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Last Updated:</span>
            <span>{new Date(deal.lastUpdated).toISOString().split('T')[0]}</span>
                 </div>
        </div>
        
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {deal.views}
              </div>
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
              {deal.likes}
              </div>
            </div>
          <div className="flex items-center gap-1 text-sm text-orange-600">
                <Clock className="w-4 h-4" />
            <span suppressHydrationWarning>
            {Math.ceil((new Date(deal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left
            </span>
              </div>
          </div>
        
        {deal.couponCode && (
          <div className="mb-4 p-2 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Coupon Code:</span>
              <div className="flex items-center gap-2">
                <code className="text-sm font-mono bg-white px-2 py-1 rounded border">{deal.couponCode}</code>
                <Button size="sm" variant="outline" onClick={() => copyCoupon(deal.couponCode)}>
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        )}
        
        <div className="space-y-2">
          <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </Button>
          <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" onClick={() => shareItem(deal)}>
              <Share2 className="w-4 h-4 mr-1" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <MessageCircle className="w-4 h-4 mr-1" />
              Discuss
            </Button>
          </div>
          </div>
        </CardContent>
      </Card>
    )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  {isMobile ? "" : "Back to Home"}
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Apps & Deals</h1>
                <p className="text-sm text-gray-600 hidden md:block">Discover apps and exclusive deals</p>
              </div>
            </div>
            
            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowAnalytics(true)}>
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowSettings(true)}>
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                <Plus className="h-4 w-4 mr-2" />
                Submit
              </Button>
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowMobileMenu(true)}>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
              <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

        {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#0F7377] to-[#0F7377]/90 text-white">
        <div className="container mx-auto px-4 py-12 md:py-16">
                      <div className="text-center max-w-4xl mx-auto">
              <div className="flex justify-center mb-6">
                <div className="bg-white/20 p-4 rounded-full animate-pulse">
                <AppWindow className="w-8 h-8 md:w-12 md:h-12 text-white" />
                </div>
              </div>
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Apps & Deals Marketplace
              </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-blue-100 mb-6 md:mb-8 leading-relaxed">
                Discover innovative apps, software solutions, and exclusive startup deals. 
                Try new tools, validate products, and access exclusive discounts.
              </p>
              <div className="flex justify-center mb-6">
                <div className="flex items-center gap-2 text-blue-100 text-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Live Marketplace</span>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>
              </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-[#F59E0B] text-white hover:bg-[#F59E0B]/90 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-lg px-6 md:px-8 py-3 md:py-4" 
                onClick={() => setShowSubmitApp(true)}
              >
                <AppWindow className="w-5 h-5 mr-2" />
                  Submit Your App
                </Button>
              <Button 
                size="lg" 
                className="bg-white text-[#0F7377] hover:bg-gray-100 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-lg px-6 md:px-8 py-3 md:py-4 border-2 border-white" 
                onClick={() => setShowSubmitDeal(true)}
              >
                <DollarSign className="w-5 h-5 mr-2" />
                  Submit Deal
                </Button>
              </div>
            </div>
          </div>
      </div>

      {/* Enhanced Stats Section */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
            <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#0F7377] mb-2">Marketplace Statistics</h2>
            <p className="text-gray-600">Real-time data from our apps and deals community</p>
            </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group cursor-pointer hover:scale-105 transition-transform duration-200">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg mb-3 mx-auto w-16 h-16 flex items-center justify-center">
                <AppWindow className="w-8 h-8 text-[#0F7377]" />
                </div>
              <div className="text-3xl font-bold text-[#0F7377] mb-2">{apps.length}+</div>
              <div className="text-gray-600">Apps Available</div>
              </div>
            <div className="text-center group cursor-pointer hover:scale-105 transition-transform duration-200">
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg mb-3 mx-auto w-16 h-16 flex items-center justify-center">
                <DollarSign className="w-8 h-8 text-green-600" />
                </div>
              <div className="text-3xl font-bold text-[#0F7377] mb-2">{deals.length}+</div>
              <div className="text-gray-600">Active Deals</div>
              </div>
            <div className="text-center group cursor-pointer hover:scale-105 transition-transform duration-200">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg mb-3 mx-auto w-16 h-16 flex items-center justify-center">
                <Users className="w-8 h-8 text-purple-600" />
                </div>
              <div className="text-3xl font-bold text-[#0F7377] mb-2">2.5K+</div>
              <div className="text-gray-600">Active Users</div>
              </div>
            <div className="text-center group cursor-pointer hover:scale-105 transition-transform duration-200">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg mb-3 mx-auto w-16 h-16 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-orange-600" />
                </div>
              <div className="text-3xl font-bold text-[#0F7377] mb-2">$2.5M+</div>
              <div className="text-gray-600">Total Savings</div>
              </div>
            </div>
          </div>
      </div>

      {/* Quick Actions Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-[#0F7377] mb-2">Quick Actions</h2>
            <p className="text-gray-600">Get started quickly with these popular actions</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <Button 
              className="bg-white text-[#0F7377] hover:bg-gray-50 shadow-md hover:shadow-lg transition-all duration-200 h-16 text-lg font-medium border-2 border-gray-200 hover:border-[#0F7377]" 
              onClick={() => setShowSubmitApp(true)}
            >
              <AppWindow className="w-5 h-5 mr-3" />
              Submit Your App
            </Button>
            <Button 
              className="bg-white text-[#0F7377] hover:bg-gray-50 shadow-md hover:shadow-lg transition-all duration-200 h-16 text-lg font-medium border-2 border-gray-200 hover:border-[#0F7377]" 
              onClick={() => setShowSubmitDeal(true)}
            >
              <DollarSign className="w-5 h-5 mr-3" />
              Submit a Deal
            </Button>
            <Button 
              className="bg-white text-[#0F7377] hover:bg-gray-50 shadow-md hover:shadow-lg transition-all duration-200 h-16 text-lg font-medium border-2 border-gray-200 hover:border-[#0F7377]" 
              onClick={() => setShowFilters(true)}
            >
              <Filter className="w-5 h-5 mr-3" />
              Browse & Filter
            </Button>
          </div>
        </div>
      </div>

        {/* Main Content */}
      <div className="bg-gray-50 py-8 md:py-16">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                <TabsTrigger value="all">All Items</TabsTrigger>
                <TabsTrigger value="apps">Apps & Software</TabsTrigger>
                <TabsTrigger value="deals">Startup Deals</TabsTrigger>
                <TabsTrigger value="submit">Submit</TabsTrigger>
              </TabsList>
              
              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search apps and deals..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-64 pl-10 pr-4"
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    className="border-2 border-gray-300 hover:border-gray-400" 
                    onClick={() => setShowFilters(true)}
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                  <div className="flex border rounded-lg">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="rounded-r-none"
                    >
                      <Grid className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="rounded-l-none"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={selectedCategory === category.id ? "bg-[#0F7377] hover:bg-[#0F7377]/90" : ""}
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>

              {/* All Items Tab */}
              <TabsContent value="all" className="space-y-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                  <h2 className="text-2xl font-bold text-gray-900">Apps & Deals Marketplace</h2>
                  <p className="text-gray-600">Discover apps, software, and exclusive discounts</p>
                  </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search apps and deals..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-64 pl-10 pr-4"
                    />
                            </div>
                  <Button 
                    className="bg-[#F59E0B] text-white hover:bg-[#F59E0B]/90 shadow-md hover:shadow-lg transition-all duration-200" 
                    onClick={() => setShowSubmitApp(true)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Submit App
                  </Button>
                  <Button 
                    className="bg-[#0F7377] text-white hover:bg-[#0F7377]/90 shadow-md hover:shadow-lg transition-all duration-200" 
                    onClick={() => setShowSubmitDeal(true)}
                  >
                    <Handshake className="w-4 h-4 mr-2" />
                    Submit Deal
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-2 border-gray-300 hover:border-gray-400 shadow-md hover:shadow-lg transition-all duration-200" 
                    onClick={() => setShowFilters(true)}
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                  </div>
                </div>

                <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
                {apps.map((app) => renderAppCard(app))}
                {deals.map((deal) => renderDealCard(deal))}
                </div>
              </TabsContent>

              {/* Apps Tab */}
              <TabsContent value="apps" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Apps & Software</h2>
                  <p className="text-gray-600">Discover innovative tools and software solutions</p>
                  </div>
                <Button 
                  className="bg-[#F59E0B] text-white hover:bg-[#F59E0B]/90 shadow-md hover:shadow-lg transition-all duration-200" 
                  onClick={() => setShowSubmitApp(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Submit App
                </Button>
              </div>
              <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
                {apps.map((app) => renderAppCard(app))}
                </div>
              </TabsContent>

              {/* Deals Tab */}
              <TabsContent value="deals" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Startup Deals & Discounts</h2>
                  <p className="text-gray-600">Exclusive offers and discounts for startups</p>
                  </div>
                <Button 
                  className="bg-[#0F7377] text-white hover:bg-[#0F7377]/90 shadow-md hover:shadow-lg transition-all duration-200" 
                  onClick={() => setShowSubmitDeal(true)}
                >
                  <Handshake className="w-4 h-4 mr-2" />
                  Submit Deal
                </Button>
              </div>
              <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
                {deals.map((deal) => renderDealCard(deal))}
                </div>
              </TabsContent>

              {/* Submit Tab */}
              <TabsContent value="submit" className="space-y-6">
                <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Submit Your Item</h2>
                  <div className="grid gap-6 md:grid-cols-2">
                  <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <AppWindow className="w-5 h-5" />
                          Submit App
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">
                          Submit your app for community testing and validation. Get valuable feedback from real users.
                        </p>
                      <Button 
                        className="w-full bg-[#F59E0B] text-white hover:bg-[#F59E0B]/90 shadow-md hover:shadow-lg transition-all duration-200" 
                        onClick={() => setShowSubmitApp(true)}
                      >
                          <Upload className="w-4 h-4 mr-2" />
                          Submit App
                        </Button>
                      </CardContent>
                    </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <DollarSign className="w-5 h-5" />
                          Submit Deal
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">
                          Submit your discount or offer for startups to connect with our network.
                        </p>
                      <Button 
                        className="w-full bg-[#0F7377] text-white hover:bg-[#0F7377]/90 shadow-md hover:shadow-lg transition-all duration-200" 
                        onClick={() => setShowSubmitDeal(true)}
                      >
                          <Handshake className="w-4 h-4 mr-2" />
                          Submit Deal
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
      </div>

      {/* Enhanced Submit App Dialog */}
      <Dialog open={showSubmitApp} onOpenChange={setShowSubmitApp}>
        <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
              <AppWindow className="w-5 h-5" />
              Submit Your App
              </DialogTitle>
            <DialogDescription>
              Complete the comprehensive form below. GrowthLab employees will review and approve your app within 24-48 hours.
            </DialogDescription>
            </DialogHeader>

          <div className="space-y-6">
            {/* Basic Information */}
              <div className="space-y-4">
              <h3 className="text-lg font-semibold">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="app-title">App Title *</Label>
                  <Input 
                    id="app-title" 
                    placeholder="Enter your app name" 
                    value={appFormData.title}
                    onChange={(e) => handleAppFormChange("title", e.target.value)}
                  />
                    </div>
              <div className="space-y-2">
                <Label htmlFor="app-company">Company *</Label>
                  <Input 
                    id="app-company" 
                    placeholder="Your company name" 
                    value={appFormData.company}
                    onChange={(e) => handleAppFormChange("company", e.target.value)}
                  />
                    </div>
                    </div>
            
            <div className="space-y-2">
              <Label htmlFor="app-description">Description *</Label>
              <Textarea 
                id="app-description" 
                placeholder="Describe what your app does and its key features"
                rows={3}
                  value={appFormData.description}
                  onChange={(e) => handleAppFormChange("description", e.target.value)}
              />
                    </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                  <Label htmlFor="app-website">Website *</Label>
                  <Input 
                    id="app-website" 
                    placeholder="https://your-app.com" 
                    value={appFormData.website}
                    onChange={(e) => handleAppFormChange("website", e.target.value)}
                  />
                      </div>
                <div className="space-y-2">
                  <Label htmlFor="app-contact-email">Contact Email *</Label>
                  <Input 
                    id="app-contact-email" 
                    placeholder="contact@yourcompany.com" 
                    value={appFormData.contactEmail}
                    onChange={(e) => handleAppFormChange("contactEmail", e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="app-contact-phone">Contact Phone</Label>
                <Input 
                  id="app-contact-phone" 
                  placeholder="+1 (555) 123-4567" 
                  value={appFormData.contactPhone}
                  onChange={(e) => handleAppFormChange("contactPhone", e.target.value)}
                />
              </div>
            </div>

            {/* App Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">App Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="app-type">Type *</Label>
                  <Select value={appFormData.type} onValueChange={(value) => handleAppFormChange("type", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="trial">Free Trial</SelectItem>
                    <SelectItem value="beta">Beta Testing</SelectItem>
                    <SelectItem value="validation">Validation</SelectItem>
                    <SelectItem value="free">Free Offer</SelectItem>
                  </SelectContent>
                </Select>
                  </div>
                <div className="space-y-2">
                  <Label htmlFor="app-category">Category *</Label>
                  <Select value={appFormData.category} onValueChange={(value) => handleAppFormChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CRM">CRM</SelectItem>
                      <SelectItem value="Analytics">Analytics</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Productivity">Productivity</SelectItem>
                      <SelectItem value="Communication">Communication</SelectItem>
                      <SelectItem value="Development">Development</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
            </div>
            
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="app-trial">Trial Period</Label>
                  <Input 
                    id="app-trial" 
                    placeholder="e.g., 30 days" 
                    value={appFormData.trialPeriod}
                    onChange={(e) => handleAppFormChange("trialPeriod", e.target.value)}
                  />
                    </div>
              <div className="space-y-2">
                <Label htmlFor="app-pricing">Pricing</Label>
                  <Input 
                    id="app-pricing" 
                    placeholder="e.g., Free trial, $29/month after" 
                    value={appFormData.pricing}
                    onChange={(e) => handleAppFormChange("pricing", e.target.value)}
                  />
                    </div>
                  </div>
            
            <div className="space-y-2">
                <Label htmlFor="app-target-audience">Target Audience *</Label>
                <Textarea 
                  id="app-target-audience" 
                  placeholder="Who is your target audience? (e.g., Small businesses, Enterprise, Developers, etc.)"
                  rows={2}
                  value={appFormData.targetAudience}
                  onChange={(e) => handleAppFormChange("targetAudience", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="app-key-features">Key Features *</Label>
                <Textarea 
                  id="app-key-features" 
                  placeholder="List the main features of your app (one per line)"
                  rows={3}
                  value={appFormData.keyFeatures}
                  onChange={(e) => handleAppFormChange("keyFeatures", e.target.value)}
                />
              </div>
            </div>

            {/* Business Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Business Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="app-founded-year">Founded Year</Label>
                  <Input 
                    id="app-founded-year" 
                    placeholder="2020" 
                    value={appFormData.foundedYear}
                    onChange={(e) => handleAppFormChange("foundedYear", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="app-team-size">Team Size</Label>
                  <Select value={appFormData.teamSize} onValueChange={(value) => handleAppFormChange("teamSize", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select team size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-5">1-5 employees</SelectItem>
                      <SelectItem value="6-20">6-20 employees</SelectItem>
                      <SelectItem value="21-50">21-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="200+">200+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="app-unique-value">Unique Value Proposition *</Label>
                <Textarea 
                  id="app-unique-value" 
                  placeholder="What makes your app unique? How does it solve problems differently?"
                  rows={2}
                  value={appFormData.uniqueValue}
                  onChange={(e) => handleAppFormChange("uniqueValue", e.target.value)}
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Terms and Conditions</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="app-terms"
                    checked={appFormData.termsAccepted}
                    onChange={(e) => handleAppFormChange("termsAccepted", e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="app-terms">I accept the Terms and Conditions *</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="app-privacy"
                    checked={appFormData.privacyAccepted}
                    onChange={(e) => handleAppFormChange("privacyAccepted", e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="app-privacy">I accept the Privacy Policy *</Label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setShowSubmitApp(false)}>
              Cancel
                    </Button>
            <Button 
              className="bg-[#F59E0B] text-white hover:bg-[#F59E0B]/90 shadow-md hover:shadow-lg transition-all duration-200" 
              onClick={handleSubmitApp}
            >
              <Upload className="w-4 h-4 mr-2" />
              Submit App
                  </Button>
                </div>
          </DialogContent>
        </Dialog>

      {/* Enhanced Submit Deal Dialog */}
      <Dialog open={showSubmitDeal} onOpenChange={setShowSubmitDeal}>
        <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Submit Your Deal
            </DialogTitle>
            <DialogDescription>
              Complete the comprehensive form below. GrowthLab employees will review and approve your deal within 24-48 hours.
            </DialogDescription>
            </DialogHeader>
          
          <div className="space-y-6">
            {/* Basic Information */}
          <div className="space-y-4">
              <h3 className="text-lg font-semibold">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="deal-title">Deal Title *</Label>
                  <Input 
                    id="deal-title" 
                    placeholder="Enter your deal name" 
                    value={dealFormData.title}
                    onChange={(e) => handleDealFormChange("title", e.target.value)}
                  />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deal-company">Company *</Label>
                  <Input 
                    id="deal-company" 
                    placeholder="Your company name" 
                    value={dealFormData.company}
                    onChange={(e) => handleDealFormChange("company", e.target.value)}
                  />
              </div>
              </div>
            
            <div className="space-y-2">
              <Label htmlFor="deal-description">Description *</Label>
              <Textarea 
                id="deal-description" 
                  placeholder="Describe your deal and its benefits"
                rows={3}
                  value={dealFormData.description}
                  onChange={(e) => handleDealFormChange("description", e.target.value)}
              />
            </div>
            
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                  <Label htmlFor="deal-website">Website *</Label>
                  <Input 
                    id="deal-website" 
                    placeholder="https://yourcompany.com" 
                    value={dealFormData.website}
                    onChange={(e) => handleDealFormChange("website", e.target.value)}
                  />
              </div>
              <div className="space-y-2">
                  <Label htmlFor="deal-contact-email">Contact Email *</Label>
                  <Input 
                    id="deal-contact-email" 
                    placeholder="contact@yourcompany.com" 
                    value={dealFormData.contactEmail}
                    onChange={(e) => handleDealFormChange("contactEmail", e.target.value)}
                  />
              </div>
              </div>
            </div>

            {/* Deal Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Deal Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                  <Label htmlFor="deal-type">Deal Type *</Label>
                  <Select value={dealFormData.type} onValueChange={(value) => handleDealFormChange("type", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select deal type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="discount">Discount</SelectItem>
                      <SelectItem value="free-trial">Free Trial</SelectItem>
                      <SelectItem value="consultation">Free Consultation</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="investment">Investment</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deal-category">Category *</Label>
                  <Select value={dealFormData.category} onValueChange={(value) => handleDealFormChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="software">Software</SelectItem>
                      <SelectItem value="services">Services</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="funding">Funding</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                  <Label htmlFor="deal-value">Deal Value ($) *</Label>
                  <Input 
                    id="deal-value" 
                    placeholder="1000" 
                    type="number" 
                    value={dealFormData.value}
                    onChange={(e) => handleDealFormChange("value", e.target.value)}
                  />
              </div>
              <div className="space-y-2">
                  <Label htmlFor="deal-discount">Discount (%) *</Label>
                  <Input 
                    id="deal-discount" 
                    placeholder="50" 
                    type="number" 
                    value={dealFormData.discount}
                    onChange={(e) => handleDealFormChange("discount", e.target.value)}
                  />
              </div>
            </div>
            
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                  <Label htmlFor="deal-location">Location *</Label>
                  <Input 
                    id="deal-location" 
                    placeholder="Global, US, Europe, etc." 
                    value={dealFormData.location}
                    onChange={(e) => handleDealFormChange("location", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deal-deadline">Deadline *</Label>
                  <Input 
                    id="deal-deadline" 
                    type="date" 
                    value={dealFormData.deadline}
                    onChange={(e) => handleDealFormChange("deadline", e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="deal-industry">Target Industry</Label>
                <Input 
                  id="deal-industry" 
                  placeholder="e.g., Fintech, Healthcare, E-commerce" 
                  value={dealFormData.industry}
                  onChange={(e) => handleDealFormChange("industry", e.target.value)}
                />
              </div>
            </div>

            {/* Requirements and Benefits */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Requirements and Benefits</h3>
              <div className="space-y-2">
                <Label htmlFor="deal-requirements">Requirements *</Label>
              <Textarea 
                id="deal-requirements" 
                  placeholder="Any requirements to qualify for this deal (one per line)"
                  rows={3}
                  value={dealFormData.requirements}
                  onChange={(e) => handleDealFormChange("requirements", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="deal-eligibility">Eligibility Criteria</Label>
                <Textarea 
                  id="deal-eligibility" 
                  placeholder="Who is eligible for this deal?"
                rows={2}
                  value={dealFormData.eligibility}
                  onChange={(e) => handleDealFormChange("eligibility", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
                <Label htmlFor="deal-benefits">Benefits *</Label>
              <Textarea 
                id="deal-benefits" 
                  placeholder="What benefits do users get? (one per line)"
                  rows={3}
                  value={dealFormData.benefits}
                  onChange={(e) => handleDealFormChange("benefits", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="deal-additional-value">Additional Value</Label>
                <Textarea 
                  id="deal-additional-value" 
                  placeholder="Any additional value or perks included"
                rows={2}
                  value={dealFormData.additionalValue}
                  onChange={(e) => handleDealFormChange("additionalValue", e.target.value)}
              />
              </div>
            </div>
            
            {/* Business Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Business Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                  <Label htmlFor="deal-company-size">Company Size</Label>
                  <Select value={dealFormData.companySize} onValueChange={(value) => handleDealFormChange("companySize", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="startup">Startup (1-10)</SelectItem>
                      <SelectItem value="small">Small (11-50)</SelectItem>
                      <SelectItem value="medium">Medium (51-200)</SelectItem>
                      <SelectItem value="large">Large (200+)</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deal-founded-year">Founded Year</Label>
                  <Input 
                    id="deal-founded-year" 
                    placeholder="2020" 
                    value={dealFormData.foundedYear}
                    onChange={(e) => handleDealFormChange("foundedYear", e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="deal-testimonials">Client Testimonials</Label>
                <Textarea 
                  id="deal-testimonials" 
                  placeholder="Share testimonials from satisfied clients"
                  rows={3}
                  value={dealFormData.testimonials}
                  onChange={(e) => handleDealFormChange("testimonials", e.target.value)}
                />
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Additional Information</h3>
              <div className="space-y-2">
                <Label htmlFor="deal-coupon">Coupon Code</Label>
                <Input 
                  id="deal-coupon" 
                  placeholder="e.g., GROWTHLAB50" 
                  value={dealFormData.couponCode}
                  onChange={(e) => handleDealFormChange("couponCode", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="deal-additional-info">Additional Information</Label>
                <Textarea 
                  id="deal-additional-info" 
                  placeholder="Any additional information about the deal"
                  rows={3}
                  value={dealFormData.additionalInfo}
                  onChange={(e) => handleDealFormChange("additionalInfo", e.target.value)}
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Terms and Conditions</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="deal-terms"
                    checked={dealFormData.termsAccepted}
                    onChange={(e) => handleDealFormChange("termsAccepted", e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="deal-terms">I accept the Terms and Conditions *</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="deal-privacy"
                    checked={dealFormData.privacyAccepted}
                    onChange={(e) => handleDealFormChange("privacyAccepted", e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="deal-privacy">I accept the Privacy Policy *</Label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setShowSubmitDeal(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-[#0F7377] text-white hover:bg-[#0F7377]/90 shadow-md hover:shadow-lg transition-all duration-200" 
              onClick={handleSubmitDeal}
            >
              <Handshake className="w-4 h-4 mr-2" />
              Submit Deal
            </Button>
            </div>
          </DialogContent>
        </Dialog>



      {/* Enhanced Filter Panel */}
      {showFilters && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Filters & Sorting</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowFilters(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Sort By</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Price Range</Label>
                <div className="flex gap-2 items-center">
                  <Input 
                    type="number" 
                    placeholder="Min" 
                    value={priceRange[0]} 
                    onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1] || 10000])}
                  />
                  <span className="text-gray-500">to</span>
                  <Input 
                    type="number" 
                    placeholder="Max" 
                    value={priceRange[1]} 
                    onChange={(e) => setPriceRange([priceRange[0] || 0, parseInt(e.target.value) || 10000])}
                  />
              </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Tags</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["CRM", "Sales", "AI", "Analytics", "Marketing", "Finance", "HR", "Productivity"].map((tag) => (
                    <Badge 
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "outline"}
                      className={`cursor-pointer ${selectedTags.includes(tag) ? 'bg-[#0F7377] text-white' : ''}`}
                      onClick={() => setSelectedTags(prev => 
                        prev.includes(tag) 
                          ? prev.filter(t => t !== tag)
                          : [...prev, tag]
                      )}
                    >
                      {tag}
                    </Badge>
                  ))}
            </div>
            </div>
      </div>

            <div className="flex gap-2 mt-6">
              <Button 
                variant="outline" 
                className="flex-1" 
                onClick={() => {
                  setSortBy("newest")
                  setPriceRange([0, 10000])
                  setSelectedTags([])
                }}
              >
                Reset
              </Button>
              <Button 
                className="flex-1 bg-[#0F7377] text-white hover:bg-[#0F7377]/90" 
                onClick={() => setShowFilters(false)}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Modal */}
      {showMobileMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Menu</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowMobileMenu(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start" onClick={() => setShowSubmitApp(true)}>
                <AppWindow className="h-4 w-4 mr-2" />
                Submit App
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => setShowSubmitDeal(true)}>
                <DollarSign className="h-4 w-4 mr-2" />
                Submit Deal
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => setShowAnalytics(true)}>
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => setShowSettings(true)}>
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Modal */}
      {showAnalytics && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Analytics</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowAnalytics(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#0F7377] mb-2">2.5K+</div>
                <div className="text-gray-600">Total Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#0F7377] mb-2">156</div>
                <div className="text-gray-600">Apps Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#0F7377] mb-2">89</div>
                <div className="text-gray-600">Active Deals</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#0F7377] mb-2">$2.5M+</div>
                <div className="text-gray-600">Total Savings</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Settings</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowSettings(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Email Notifications</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span>Push Notifications</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span>Dark Mode</span>
                <input type="checkbox" className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span>Auto-refresh</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
