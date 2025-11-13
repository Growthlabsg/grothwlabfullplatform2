"use client"

import { useState, useEffect } from "react"
import type { Metadata } from "next"

import { EventCalendar } from "@/components/events/event-calendar"
import { FeaturedEvent } from "@/components/events/featured-event"
import { EventCategories } from "@/components/events/event-categories"
import { UpcomingEvents } from "@/components/events/upcoming-events"
import { LumaIntegration, LumaCalendarWidget } from "@/components/events/luma-integration"
import { QRCheckIn } from "@/components/events/qr-checkin"
import { VirtualNameCard } from "@/components/events/virtual-name-card"
import { DemeritSystem } from "@/components/events/demerit-system"
import { AttendanceProvider } from "@/contexts/AttendanceContext"
import { SharedEventsProvider, useSharedEvents } from "@/contexts/SharedEventsContext"
import { StripeAccountSetup } from "@/components/payments/stripe-account-setup"
import { PaymentDashboard } from "@/components/payments/payment-dashboard"
import { PaymentForm } from "@/components/payments/payment-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { 
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
  AlertTriangle, 
  Info, 
  Settings, 
  Bell, 
  BookOpen, 
  User, 
  Users2, 
  Building, 
  Landmark,
  CreditCard,
  DollarSign,
  Scale,
  QrCode, 
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
  Sigma,
  Calendar,
  Clock,
  MapPin,
  Users,
  Calendar as CalendarIcon,
  Star,
  Award,
  Globe,
  Building2,
  Lightbulb,
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  Briefcase,
  GraduationCap,
  Link2,
  Network,
  Handshake,
  Target,
  BarChart3,
  Trophy as TrophyIcon,
  Sparkles as SparklesIcon,
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
  Flag as FlagIcon3,
  MoreVertical as MoreVerticalIcon,
  ChevronDown as ChevronDownIcon,
  ChevronUp as ChevronUpIcon,
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
  Compass as CompassIcon2,
  Map as MapIcon,
  Navigation as NavigationIcon,
  Route as RouteIcon,
  MapPin as MapPinIcon2,
  Pin as PinIcon,
  Flag as FlagIcon4,
  Crosshair as CrosshairIcon,
  Target as TargetIcon3,
  Focus as FocusIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  Move as MoveIcon,
  Move3D as Move3DIcon,
  Rotate3D as Rotate3DIcon,
  Scale as ScaleIcon2,
  Expand as ExpandIcon,
  Plus as PlusIcon2,
  Minus as MinusIcon,
  Percent as PercentIcon,
  Infinity as InfinityIcon,
  Pi as PiIcon,
  Sigma as SigmaIcon
} from "lucide-react"

function EventsPageContent() {
  const { toast } = useToast()
  const { getAllEvents, getSportsEvents } = useSharedEvents()
  const [activeTab, setActiveTab] = useState("calendar")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("upcoming")
  const [viewMode, setViewMode] = useState("grid")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [savedEvents, setSavedEvents] = useState<number[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [selectedDateRange, setSelectedDateRange] = useState("all")
  const [selectedPriceRange, setSelectedPriceRange] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [showNotifications, setShowNotifications] = useState(false)
  const [favoriteCategories, setFavoriteCategories] = useState<string[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [showStripeSetup, setShowStripeSetup] = useState(false)
  const [showPaymentDashboard, setShowPaymentDashboard] = useState(false)
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [stripeAccountId, setStripeAccountId] = useState<string | null>(null)
  const [selectedEventForPayment, setSelectedEventForPayment] = useState<any>(null)

  // Screen size detection
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Load saved events
  useEffect(() => {
    const saved = localStorage.getItem('savedEvents')
    if (saved) {
      setSavedEvents(JSON.parse(saved))
    }
  }, [])

  const handleSaveEvent = (eventId: number) => {
    const newSaved = savedEvents.includes(eventId)
      ? savedEvents.filter(id => id !== eventId)
      : [...savedEvents, eventId]
    
    setSavedEvents(newSaved)
    localStorage.setItem('savedEvents', JSON.stringify(newSaved))
    
    toast({
      title: savedEvents.includes(eventId) ? "Removed from Saved" : "Added to Saved",
      description: savedEvents.includes(eventId) 
        ? "Event removed from your saved list" 
        : "Event added to your saved list",
    })
  }

  const handleShareEvent = (event: any) => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link Copied",
        description: "Event link copied to clipboard",
      })
    }
  }

  const handleStripeAccountComplete = (accountId: string) => {
    setStripeAccountId(accountId)
    setShowStripeSetup(false)
    toast({
      title: "Stripe Account Connected",
      description: "You can now accept payments for your events!",
    })
  }

  const handleSetupPayment = () => {
    if (stripeAccountId) {
      setShowPaymentDashboard(true)
    } else {
      setShowStripeSetup(true)
    }
  }

  const handleEventPayment = (event: any) => {
    setSelectedEventForPayment(event)
    setShowPaymentForm(true)
  }

  const handleRSVP = (event: any) => {
    toast({
      title: "Redirecting to Registration",
      description: `Opening Luma registration for ${event.title}`,
    })
    // This would trigger the Luma checkout
    const lumaButton = document.querySelector(`[data-luma-event-id="${event.lumaEventId}"]`) as HTMLButtonElement
    if (lumaButton) {
      lumaButton.click()
    }
  }

  const handleAddToCalendar = (event: any) => {
    toast({
      title: "Added to Calendar",
      description: `${event.title} has been added to your calendar`,
    })
  }

  const renderLumaButton = (event: any) => {
    return (
      <button
        className="luma-checkout--button bg-[#0F7377] hover:bg-[#0F7377]/90 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
        type="button"
        data-luma-action="checkout"
        data-luma-event-id={event.lumaEventId}
        onClick={() => {
          toast({
            title: "Redirecting to Registration",
            description: `Opening registration for ${event.title}`,
          })
        }}
      >
        <Calendar className="h-4 w-4" />
        Register for Event
      </button>
    )
  }

  const handleViewDetails = (event: any) => {
    window.location.href = `/events/${event.id}`
  }

  // Get sports events from shared context
  const sportsEvents = getSportsEvents()
  
  // Sample events data with Luma integration
  const regularEvents = [
    {
      id: 1,
      title: "GrowthLab Demo Day: Cohort 4",
      description: "Join us for an exciting showcase of innovative startups from our latest accelerator cohort.",
      date: "April 28, 2025",
      time: "6:00 PM - 9:00 PM SGT",
      location: "BASH, 79 Ayer Rajah Crescent, Singapore",
      attendees: "250+ Attendees Expected",
      category: "Demo Day",
      featured: true,
      image: "/startup-demo-day.png",
      price: "Free",
      status: "Open for RSVP",
      lumaEventId: "evt-demo-day-cohort-4",
      duration: "3 hours",
      capacity: 300,
      organizer: "GrowthLab",
      tags: ["demo", "startup", "pitch", "showcase"],
      virtual: false,
      language: "English",
      difficulty: "Beginner",
      requirements: "None"
    },
    {
      id: 2,
      title: "Founder Networking Mixer",
      description: "Connect with fellow entrepreneurs and investors in a relaxed networking environment.",
      date: "May 5, 2025",
      time: "7:00 PM - 9:00 PM",
      location: "GrowthLab HQ, Singapore",
      attendees: "100+ Attendees Expected",
      category: "Networking",
      featured: false,
      image: "/networking-event.png",
      price: "Free",
      status: "Open for RSVP",
      lumaEventId: "evt-founder-networking-mixer"
    },
    {
      id: 3,
      title: "AI for Startups Workshop",
      description: "Learn how to integrate AI into your startup and gain a competitive advantage.",
      date: "May 12, 2025",
      time: "2:00 PM - 5:00 PM",
      location: "Online",
      attendees: "50+ Attendees Expected",
      category: "Workshop",
      featured: false,
      image: "/ai-workshop.png",
      price: "SGD 50",
      status: "Open for Registration",
      lumaEventId: "evt-ai-workshop-startups"
    },
    {
      id: 4,
      title: "Pitch Night: FinTech Edition",
      description: "Watch innovative fintech startups pitch their ideas to a panel of investors.",
      date: "May 19, 2025",
      time: "6:30 PM - 9:30 PM",
      location: "Marina Bay Sands, Singapore",
      attendees: "200+ Attendees Expected",
      category: "Pitch Night",
      featured: true,
      image: "/pitch-night.png",
      price: "Free",
      status: "Open for RSVP",
      lumaEventId: "evt-pitch-night-fintech"
    },
    {
      id: 5,
      title: "Fundraising Masterclass",
      description: "Learn the ins and outs of startup fundraising from successful entrepreneurs and VCs.",
      date: "May 26, 2025",
      time: "10:00 AM - 12:00 PM",
      location: "GrowthLab HQ, Singapore",
      attendees: "30+ Attendees Expected",
      category: "Workshop",
      featured: false,
      image: "/fundraising-masterclass.png",
      price: "SGD 100",
      status: "Open for Registration",
      lumaEventId: "evt-fundraising-masterclass"
    },
    {
      id: 6,
      title: "Startup Hackathon 2025",
      description: "48-hour hackathon to build innovative solutions for real-world problems.",
      date: "June 1-2, 2025",
      time: "9:00 AM - 9:00 PM",
      location: "Singapore University of Technology and Design",
      attendees: "500+ Attendees Expected",
      category: "Hackathon",
      featured: true,
      image: "/hackathon.png",
      price: "Free",
      status: "Open for Registration",
      lumaEventId: "evt-startup-hackathon-2025"
    }
  ]

  // Combine regular events with sports events
  const events = [...regularEvents, ...sportsEvents]

  const categories = ["all", "Demo Day", "Networking", "Workshop", "Pitch Night", "Hackathon", "Fireside Chat", "Sports"]
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = selectedCategory === "all" || event.category.toLowerCase() === selectedCategory.toLowerCase()
    
    const matchesDateRange = selectedDateRange === "all" || 
      (selectedDateRange === "today" && event.date === new Date().toISOString().split('T')[0]) ||
      (selectedDateRange === "week" && new Date(event.date) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)) ||
      (selectedDateRange === "month" && new Date(event.date) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000))
    
    const matchesPriceRange = selectedPriceRange === "all" ||
      (selectedPriceRange === "free" && event.price === "Free") ||
      (selectedPriceRange === "paid" && event.price !== "Free")
    
    const matchesLocation = selectedLocation === "all" ||
      (selectedLocation === "virtual" && event.virtual) ||
      (selectedLocation === "in-person" && !event.virtual)
    
    return matchesSearch && matchesCategory && matchesDateRange && matchesPriceRange && matchesLocation
  })

  const sortedEvents = filteredEvents.sort((a, b) => {
    switch (sortBy) {
      case "date":
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      case "price":
        return a.price === "Free" ? -1 : b.price === "Free" ? 1 : 0
      case "featured":
      default:
        return b.featured ? 1 : -1
    }
  })

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
              <h1 className="text-lg font-bold text-gray-900">Events</h1>
              <p className="text-xs text-gray-500">{filteredEvents.length} events found</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="h-5 w-5" />
              {showNotifications && (
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></div>
              )}
            </Button>
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
        
        {/* Mobile Search Bar */}
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search events, topics, or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#0F7377] to-[#0F7377]/90 text-white">
        <div className="container mx-auto px-4 py-8 lg:py-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-4 rounded-full">
                <Calendar className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-3xl lg:text-4xl xl:text-6xl font-bold mb-6">
              Events & Workshops
            </h1>
            <p className="text-lg lg:text-xl xl:text-2xl text-blue-100 mb-8 leading-relaxed">
              Join our weekly events, workshops, and pitch nights to connect with the GrowthLab community
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm text-blue-100">Events This Year</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold">10K+</div>
                <div className="text-sm text-blue-100">Attendees</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm text-blue-100">Cities</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold">95%</div>
                <div className="text-sm text-blue-100">Satisfaction</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/events/calendar"
                className="bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                View Calendar
              </Link>
              <Link
                href="/events/search"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-[#0F7377] transition-colors"
              >
                Search Events
              </Link>
              <Link
                href="/events/create"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-[#0F7377] transition-colors"
              >
                Create Event
              </Link>
              <Link
                href="/events/manage"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-[#0F7377] transition-colors"
              >
                Manage Events
              </Link>
              <Link
                href="/events/analytics"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-[#0F7377] transition-colors"
              >
                Analytics
              </Link>
              <Link
                href="/events/settings"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-[#0F7377] transition-colors"
              >
                Settings
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Event Statistics */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-2xl md:text-3xl font-bold text-[#0F7377]">50+</div>
              <div className="text-sm md:text-base text-gray-600">Events This Year</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl md:text-3xl font-bold text-[#0F7377]">2,500+</div>
              <div className="text-sm md:text-base text-gray-600">Attendees</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl md:text-3xl font-bold text-[#0F7377]">15+</div>
              <div className="text-sm md:text-base text-gray-600">Partners</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl md:text-3xl font-bold text-[#0F7377]">6</div>
              <div className="text-sm md:text-base text-gray-600">Categories</div>
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
                placeholder="Search events..."
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
                <option value="date">Date</option>
                <option value="price">Price</option>
              </select>
              <Button
                variant="outline"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="px-4 py-3 border border-gray-300 rounded-md text-sm font-medium bg-white shadow-sm hover:bg-gray-50"
              >
                <Filter className="h-4 w-4 mr-2" />
                Advanced
              </Button>
            </div>
          </div>
          
          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Advanced Filters</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                  <select
                    value={selectedDateRange}
                    onChange={(e) => setSelectedDateRange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#0F7377] focus:border-[#0F7377]"
                  >
                    <option value="all">All Dates</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <select
                    value={selectedPriceRange}
                    onChange={(e) => setSelectedPriceRange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#0F7377] focus:border-[#0F7377]"
                  >
                    <option value="all">All Prices</option>
                    <option value="free">Free Events</option>
                    <option value="paid">Paid Events</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#0F7377] focus:border-[#0F7377]"
                  >
                    <option value="all">All Locations</option>
                    <option value="virtual">Virtual Events</option>
                    <option value="in-person">In-Person Events</option>
                  </select>
                </div>
              </div>
            </div>
          )}

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
                    <option value="date">Date</option>
                    <option value="price">Price</option>
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

      {/* Events Content */}
      <div className="bg-white">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b">
              <TabsList className="grid w-full grid-cols-7">
                <TabsTrigger value="calendar" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Calendar
                </TabsTrigger>
                <TabsTrigger value="featured" className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Featured
                </TabsTrigger>
                <TabsTrigger value="categories" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Categories
                </TabsTrigger>
                <TabsTrigger value="checkin" className="flex items-center gap-2">
                  <QrCode className="w-4 h-4" />
                  Check-in
                </TabsTrigger>
                <TabsTrigger value="networking" className="flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Networking
                </TabsTrigger>
                <TabsTrigger value="payments" className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Payments
                </TabsTrigger>
                <TabsTrigger value="demerits" className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Demerits
                </TabsTrigger>
          </TabsList>
            </div>

            {/* Calendar Tab */}
            <TabsContent value="calendar" className="py-8">
            <div className="mb-8">
                <LumaCalendarWidget />
              </div>
              
              {/* Featured Events with Luma Integration */}
              <div className="mt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Events</h3>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {sortedEvents.slice(0, 6).map((event) => (
                    <LumaIntegration
                      key={event.id}
                      event={{
                        id: String(event.lumaEventId || event.id),
                        title: event.title,
                        description: event.description,
                        date: event.date,
                        time: event.time,
                        location: event.location,
                        price: event.price,
                        status: event.status || 'Open for Registration',
                        attendees: parseInt(event.attendees.replace(/[^\d]/g, '')) || 0,
                        category: event.category,
                        featured: event.featured
                      }}
                      variant="card"
                      showDetails={true}
                    />
                  ))}
                </div>
            </div>
          </TabsContent>

            {/* Featured Events Tab */}
            <TabsContent value="featured" className="py-8">
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                  <div className="space-y-6">
                    {sortedEvents.filter(event => event.featured).map((event) => (
                      <LumaIntegration
                        key={event.id}
                        event={{
                          id: String(event.lumaEventId || event.id),
                          title: event.title,
                          description: event.description,
                          date: event.date,
                          time: event.time,
                          location: event.location,
                          price: event.price,
                          status: event.status || 'Open for Registration',
                          attendees: parseInt(event.attendees.replace(/[^\d]/g, '')) || 0,
                          category: event.category,
                          featured: event.featured
                        }}
                        variant="card"
                        showDetails={true}
                      />
                    ))}
                  </div>
              </div>
              <div>
                <UpcomingEvents />
              </div>
            </div>
          </TabsContent>

            {/* Categories Tab */}
            <TabsContent value="categories" className="py-8">
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {["Pitch Nights", "Workshops", "Networking", "Demo Days", "Hackathons", "Fireside Chats"].map(
                    (category) => (
                        <Card key={category} className="p-6 text-card-foreground shadow-sm hover:shadow-md transition-shadow">
                          <CardHeader className="p-0 mb-4">
                            <CardTitle className="text-lg font-semibold">{category}</CardTitle>
                            <CardDescription className="text-sm text-muted-foreground">
                          Join our {category.toLowerCase()} to connect with the community.
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="p-0">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/events/category/${category.toLowerCase().replace(" ", "-")}`}>View Events</Link>
                        </Button>
                          </CardContent>
                        </Card>
                    ),
                  )}
                </div>
              </div>
              <div>
                <EventCategories />
              </div>
            </div>
          </TabsContent>

          {/* Check-in Tab */}
          <TabsContent value="checkin" className="py-8">
            <QRCheckIn
              eventId={1}
              eventTitle="GrowthLab Demo Day: Cohort 4"
              eventDate="April 28, 2025"
              eventTime="6:00 PM - 9:00 PM SGT"
              eventLocation="BASH, 79 Ayer Rajah Crescent, Singapore"
              isHost={true}
            />
          </TabsContent>

          {/* Networking Tab */}
          <TabsContent value="networking" className="py-8">
            <VirtualNameCard
              eventId={1}
              eventTitle="GrowthLab Demo Day: Cohort 4"
              eventDate="April 28, 2025"
              eventLocation="BASH, 79 Ayer Rajah Crescent, Singapore"
            />
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="py-8">
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Payment Management</h2>
                  <p className="text-gray-600">Manage your Stripe account and payment settings for events</p>
                </div>
                <Button onClick={handleSetupPayment} variant="outline">
                  {stripeAccountId ? 'Manage Payments' : 'Set Up Payments'}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Payment Account Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Account Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {stripeAccountId ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span className="font-medium">Stripe account connected</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        You can now accept payments for your events. Click "Manage Payments" to view your dashboard.
                      </p>
                      <div className="pt-4 border-t">
                        <Button onClick={() => setShowPaymentDashboard(true)} className="w-full">
                          <DollarSign className="h-4 w-4 mr-2" />
                          View Payment Dashboard
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="font-medium">No payment account</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Set up a Stripe account to start accepting payments for your events.
                      </p>
                      <div className="pt-4 border-t">
                        <Button onClick={() => setShowStripeSetup(true)} className="w-full">
                          <CreditCard className="h-4 w-4 mr-2" />
                          Set Up Stripe Account
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Payment Features */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Features</CardTitle>
                  <CardDescription>What you can do with payments enabled</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Accept credit card payments</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Set event pricing and discounts</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Track revenue and transactions</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Manage refunds and cancellations</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Generate payment reports</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Transactions */}
            {stripeAccountId && (
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Your latest payment activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <div>
                          <h4 className="font-medium">Basketball Tournament</h4>
                          <p className="text-sm text-gray-600">Dec 15, 2024 • 25 participants</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">$2,500.00</p>
                        <Badge variant="default" className="bg-green-100 text-green-800">Completed</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Clock className="h-4 w-4 text-yellow-600" />
                        <div>
                          <h4 className="font-medium">Tennis Meet</h4>
                          <p className="text-sm text-gray-600">Dec 14, 2024 • 12 participants</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">$1,200.00</p>
                        <Badge variant="secondary">Pending</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Demerits Tab */}
          <TabsContent value="demerits" className="py-8">
            <DemeritSystem showAppealForm={true} />
          </TabsContent>
        </Tabs>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-[#0F7377] to-[#0F7377]/90 text-white py-12 lg:py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">Want to Host an Event?</h2>
          <p className="text-lg lg:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Partner with GrowthLab to host events like hackathons, pitch nights, or workshops for the startup community
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/events/collaborate"
              className="bg-[#F59E0B] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#F59E0B]/90 transition-colors"
            >
              Collaborate on an Event
            </Link>
            <Link
              href="/events/create"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-[#0F7377] transition-colors"
            >
              Create Your Event
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
            <Calendar className="w-5 h-5" />
            <span className="text-xs font-semibold">Events</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex flex-col items-center space-y-1 p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 active:bg-gray-200"
            onClick={() => {
              const searchInput = document.querySelector('input[placeholder="Search events..."]') as HTMLInputElement
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
                title: "Saved Events",
                description: `You have ${savedEvents.length} saved events`,
              })
            }}
          >
            <Heart className="w-5 h-5" />
            <span className="text-xs font-semibold">Saved</span>
            {savedEvents.length > 0 && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {savedEvents.length}
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
          <Button 
            variant="ghost" 
            className="flex flex-col items-center space-y-1 p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 active:bg-gray-200"
            asChild
          >
            <Link href="/events/dashboard">
              <BarChart3 className="w-5 h-5" />
              <span className="text-xs font-semibold">Dashboard</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Payment Modals */}
      <Dialog open={showStripeSetup} onOpenChange={setShowStripeSetup}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Set Up Stripe Account</DialogTitle>
            <DialogDescription>
              Connect your Stripe account to start accepting payments for your events
            </DialogDescription>
          </DialogHeader>
          <StripeAccountSetup 
            onComplete={handleStripeAccountComplete}
            onCancel={() => setShowStripeSetup(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showPaymentDashboard} onOpenChange={setShowPaymentDashboard}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Payment Dashboard</DialogTitle>
            <DialogDescription>
              Manage your payments, transactions, and Stripe account
            </DialogDescription>
          </DialogHeader>
          <PaymentDashboard 
            stripeAccountId={stripeAccountId || undefined}
            onSetupAccount={() => {
              setShowPaymentDashboard(false)
              setShowStripeSetup(true)
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showPaymentForm} onOpenChange={setShowPaymentForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Set Up Event Payment</DialogTitle>
            <DialogDescription>
              Configure payment options for {selectedEventForPayment?.title}
            </DialogDescription>
          </DialogHeader>
          <PaymentForm 
            onSave={(data) => {
              toast({
                title: "Payment Settings Saved",
                description: "Payment configuration has been updated for this event.",
              })
              setShowPaymentForm(false)
            }}
            onCancel={() => setShowPaymentForm(false)}
            initialData={selectedEventForPayment?.payment}
          />
        </DialogContent>
      </Dialog>

      {/* Bottom padding for mobile navigation */}
      <div className="lg:hidden h-20"></div>
      </div>
  )
}

export default function EventsPage() {
  return (
    <SharedEventsProvider>
      <AttendanceProvider>
        <EventsPageContent />
      </AttendanceProvider>
    </SharedEventsProvider>
  )
}
