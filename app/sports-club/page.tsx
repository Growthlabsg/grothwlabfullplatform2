"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { 
  Users, 
  Target, 
  BarChart3, 
  Award, 
  Zap, 
  TrendingUp, 
  Star,
  Calendar,
  MapPin,
  Clock,
  Trophy,
  Users2,
  Activity,
  Heart,
  Target as TargetIcon,
  TrendingUp as TrendingUpIcon,
  Plus,
  Search,
  Filter,
  Settings,
  Bell,
  Camera,
  QrCode,
  Share2,
  MessageSquare,
  Phone,
  Mail,
  Globe,
  Building,
  MapPin as LocationIcon,
  Clock as TimeIcon,
  User,
  UserPlus,
  UserCheck,
  UserX,
  Crown,
  Shield,
  Flag,
  Gamepad2,
  Target as Football,
  Target as Basketball,
  Target as Tennis,
  Target as Volleyball,
  Target as Badminton,
  Target as TableTennis,
  Target as Swimming,
  Target as Running,
  Target as Cycling,
  Target as Golf,
  Target as Baseball,
  Target as Hockey,
  Target as Cricket,
  Target as Rugby,
  Target as Boxing,
  Target as MartialArts,
  Target as Yoga,
  Target as Fitness,
  Target as Dance,
  Target as Climbing,
  Target as Skiing,
  Target as Snowboarding,
  Target as Surfing,
  Target as Skating,
  Target as Archery,
  Target as Shooting,
  Target as Darts,
  Target as Billiards,
  Target as Chess,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  MoreVertical,
  CreditCard,
  AlertCircle,
  Edit,
  Trash2,
  Save,
  Send,
  Download,
  Upload,
  Copy,
  ExternalLink,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  RefreshCw,
  RotateCcw,
  Maximize2,
  Minimize2,
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
  Compass,
  Map,
  Navigation,
  Route,
  Pin,
  Crosshair,
  Focus,
  ZoomIn,
  ZoomOut,
  Move,
  Move3D,
  Rotate3D,
  Scale,
  Expand,
  Minus,
  Percent,
  Infinity,
  Pi,
  Sigma,
  BookOpen,
  GraduationCap,
  Briefcase,
  Lightbulb,
  Rocket,
  Sparkles,
  Workflow,
  Headphones,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Play,
  Pause,
  StopCircle,
  Archive,
  Flag as FlagIcon,
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
import { TeamManagement } from "@/components/sports-club/team-management"
import { TournamentManagement } from "@/components/sports-club/tournament-management"
import { SportsAnalytics } from "@/components/sports-club/sports-analytics"
import { SportsEvents } from "@/components/sports-club/sports-events"
import { CreateEventForm } from "@/components/sports-club/create-event-form"
import { CreateCommunityForm } from "@/components/sports-club/create-community-form"
import { StripeAccountSetup } from "@/components/payments/stripe-account-setup"
import { PaymentDashboard } from "@/components/payments/payment-dashboard"
import { TranslatableText } from "@/components/ui/translatable-text"
import { LanguageSelector } from "@/components/ui/language-selector"
import { useLanguage } from "@/contexts/language-context"
import { useSharedEvents, SharedEventsProvider } from "@/contexts/SharedEventsContext"
import { AttendanceProvider } from "@/contexts/AttendanceContext"
import Link from "next/link"

function SportsClubPageContent() {
  const { language, translate, isTranslating, translationError } = useLanguage()
  const { getSportsEvents } = useSharedEvents()
  const { toast } = useToast()
  
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isMobile, setIsMobile] = useState(false)
  const [showCreateCommunity, setShowCreateCommunity] = useState(false)
  const [showCreateEvent, setShowCreateEvent] = useState(false)
  const [showQRCode, setShowQRCode] = useState(false)
  const [showPhotoShare, setShowPhotoShare] = useState(false)
  const [showStripeSetup, setShowStripeSetup] = useState(false)
  const [showPaymentDashboard, setShowPaymentDashboard] = useState(false)
  const [stripeAccountId, setStripeAccountId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSport, setSelectedSport] = useState("all")
  const [viewMode, setViewMode] = useState("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [notifications, setNotifications] = useState<any[]>([])
  const [communities, setCommunities] = useState<any[]>([])
  const [savedEvents, setSavedEvents] = useState<number[]>([])
  const [userProfile, setUserProfile] = useState({
    name: "Alex Wong",
    level: "Gold",
    points: 1250,
    rank: 8,
    sports: ["Soccer", "Basketball", "Tennis"],
    achievements: 12,
    eventsAttended: 24
  })

  // Screen size detection
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Load saved events and communities
  useEffect(() => {
    const saved = localStorage.getItem('savedSportsEvents')
    if (saved) {
      setSavedEvents(JSON.parse(saved))
    }
    
    const comms = localStorage.getItem('sportsCommunities')
    if (comms) {
      setCommunities(JSON.parse(comms))
    }
  }, [])

  // Comprehensive sports categories with icons (inspired by Reclub)
  const sportsCategories = [
    // Team Sports
    { id: "football", name: "Football", icon: Target, color: "bg-green-500", category: "Team Sports" },
    { id: "basketball", name: "Basketball", icon: Target, color: "bg-orange-500", category: "Team Sports" },
    { id: "volleyball", name: "Volleyball", icon: Target, color: "bg-blue-500", category: "Team Sports" },
    { id: "rugby", name: "Rugby", icon: Target, color: "bg-emerald-500", category: "Team Sports" },
    { id: "hockey", name: "Hockey", icon: Target, color: "bg-gray-500", category: "Team Sports" },
    { id: "ice-hockey", name: "Ice Hockey", icon: Target, color: "bg-blue-600", category: "Team Sports" },
    { id: "field-hockey", name: "Field Hockey", icon: Target, color: "bg-green-600", category: "Team Sports" },
    { id: "lacrosse", name: "Lacrosse", icon: Target, color: "bg-purple-600", category: "Team Sports" },
    { id: "water-polo", name: "Water Polo", icon: Target, color: "bg-cyan-600", category: "Team Sports" },
    { id: "handball", name: "Handball", icon: Target, color: "bg-red-600", category: "Team Sports" },
    { id: "netball", name: "Netball", icon: Target, color: "bg-pink-600", category: "Team Sports" },
    { id: "futsal", name: "Futsal", icon: Target, color: "bg-green-700", category: "Team Sports" },
    { id: "gaelic-football", name: "Gaelic Football", icon: Target, color: "bg-emerald-700", category: "Team Sports" },
    { id: "american-football", name: "American Football", icon: Target, color: "bg-red-700", category: "Team Sports" },
    { id: "australian-football", name: "Australian Football", icon: Target, color: "bg-yellow-700", category: "Team Sports" },
    { id: "ultimate-frisbee", name: "Ultimate Frisbee", icon: Target, color: "bg-blue-700", category: "Team Sports" },
    { id: "dodgeball", name: "Dodgeball", icon: Target, color: "bg-red-500", category: "Team Sports" },
    { id: "kickball", name: "Kickball", icon: Target, color: "bg-orange-600", category: "Team Sports" },
    { id: "quadball-quidditch", name: "Quadball (Quidditch)", icon: Target, color: "bg-purple-700", category: "Team Sports" },
    { id: "roundnet-spikeball", name: "Roundnet (Spikeball)", icon: Target, color: "bg-yellow-600", category: "Team Sports" },
    { id: "wiffle-ball", name: "Wiffle Ball", icon: Target, color: "bg-green-800", category: "Team Sports" },
    { id: "floorball", name: "Floorball", icon: Target, color: "bg-blue-800", category: "Team Sports" },
    { id: "roller-derby", name: "Roller Derby", icon: Target, color: "bg-pink-700", category: "Team Sports" },
    { id: "dragon-boat", name: "Dragon Boat", icon: Target, color: "bg-red-800", category: "Team Sports" },

    // Racket Sports
    { id: "tennis", name: "Tennis", icon: Target, color: "bg-yellow-500", category: "Racket Sports" },
    { id: "badminton", name: "Badminton", icon: Target, color: "bg-purple-500", category: "Racket Sports" },
    { id: "table-tennis", name: "Table Tennis", icon: Target, color: "bg-pink-500", category: "Racket Sports" },
    { id: "squash", name: "Squash", icon: Target, color: "bg-orange-700", category: "Racket Sports" },
    { id: "beach-tennis", name: "Beach Tennis", icon: Target, color: "bg-yellow-600", category: "Racket Sports" },
    { id: "padel", name: "Padel", icon: Target, color: "bg-green-600", category: "Racket Sports" },
    { id: "pickleball", name: "Pickleball", icon: Target, color: "bg-lime-600", category: "Racket Sports" },

    // Water Sports
    { id: "swimming", name: "Swimming", icon: Target, color: "bg-cyan-500", category: "Water Sports" },
    { id: "surfing", name: "Surfing", icon: Target, color: "bg-blue-500", category: "Water Sports" },
    { id: "kayaking", name: "Kayaking", icon: Target, color: "bg-cyan-600", category: "Water Sports" },
    { id: "standup-paddle", name: "Standup Paddle", icon: Target, color: "bg-cyan-700", category: "Water Sports" },
    { id: "underwater-diving", name: "Underwater Diving", icon: Target, color: "bg-blue-800", category: "Water Sports" },

    // Individual Sports
    { id: "running", name: "Running", icon: Target, color: "bg-red-500", category: "Individual Sports" },
    { id: "cycling", name: "Cycling", icon: Target, color: "bg-indigo-500", category: "Individual Sports" },
    { id: "golf", name: "Golf", icon: Target, color: "bg-green-600", category: "Individual Sports" },
    { id: "archery", name: "Archery", icon: Target, color: "bg-amber-600", category: "Individual Sports" },
    { id: "climbing", name: "Climbing", icon: Target, color: "bg-stone-500", category: "Individual Sports" },
    { id: "hiking", name: "Hiking", icon: Target, color: "bg-amber-700", category: "Individual Sports" },
    { id: "skateboarding", name: "Skateboarding", icon: Target, color: "bg-gray-600", category: "Individual Sports" },
    { id: "rollerskating", name: "Rollerskating", icon: Target, color: "bg-pink-500", category: "Individual Sports" },
    { id: "paragliding", name: "Paragliding", icon: Target, color: "bg-sky-500", category: "Individual Sports" },

    // Combat Sports
    { id: "boxing", name: "Boxing", icon: Target, color: "bg-rose-500", category: "Combat Sports" },
    { id: "martial-arts", name: "Martial Arts", icon: Target, color: "bg-violet-500", category: "Combat Sports" },
    { id: "fencing", name: "Fencing", icon: Target, color: "bg-slate-600", category: "Combat Sports" },
    { id: "wrestling", name: "Wrestling", icon: Target, color: "bg-amber-800", category: "Combat Sports" },

    // Fitness & Wellness
    { id: "fitness", name: "Fitness", icon: Target, color: "bg-orange-600", category: "Fitness & Wellness" },
    { id: "yoga", name: "Yoga", icon: Target, color: "bg-teal-500", category: "Fitness & Wellness" },
    { id: "pilates", name: "Pilates", icon: Target, color: "bg-purple-600", category: "Fitness & Wellness" },
    { id: "dance", name: "Dance", icon: Target, color: "bg-pink-600", category: "Fitness & Wellness" },

    // Precision Sports
    { id: "bowling", name: "Bowling", icon: Target, color: "bg-amber-500", category: "Precision Sports" },
    { id: "darts", name: "Darts", icon: Target, color: "bg-red-600", category: "Precision Sports" },
    { id: "billiards", name: "Billiards", icon: Target, color: "bg-green-700", category: "Precision Sports" },
    { id: "curling", name: "Curling", icon: Target, color: "bg-blue-700", category: "Precision Sports" },
    { id: "cornhole", name: "Cornhole", icon: Target, color: "bg-yellow-700", category: "Precision Sports" },

    // Motorsports
    { id: "motorsports", name: "Motorsports", icon: Target, color: "bg-red-800", category: "Motorsports" },
    { id: "karting", name: "Karting", icon: Target, color: "bg-red-700", category: "Motorsports" },
    { id: "motocross", name: "Motocross", icon: Target, color: "bg-orange-800", category: "Motorsports" },

    // Specialized Sports
    { id: "paintball", name: "Paintball", icon: Target, color: "bg-yellow-800", category: "Specialized Sports" },
    { id: "airsoft", name: "Airsoft", icon: Target, color: "bg-gray-700", category: "Specialized Sports" },
    { id: "disc-golf", name: "Disc Golf", icon: Target, color: "bg-green-800", category: "Specialized Sports" },
    { id: "hurling", name: "Hurling", icon: Target, color: "bg-emerald-800", category: "Specialized Sports" },
    { id: "cricket", name: "Cricket", icon: Target, color: "bg-lime-500", category: "Specialized Sports" },
    { id: "baseball", name: "Baseball", icon: Target, color: "bg-amber-500", category: "Specialized Sports" },
    { id: "softball", name: "Softball", icon: Target, color: "bg-amber-600", category: "Specialized Sports" },

    // Mind Sports
    { id: "chess", name: "Chess", icon: Target, color: "bg-slate-500", category: "Mind Sports" },
    { id: "poker", name: "Poker", icon: Target, color: "bg-red-900", category: "Mind Sports" },
    { id: "bridge", name: "Bridge", icon: Target, color: "bg-blue-900", category: "Mind Sports" },

    // Others
    { id: "others", name: "Others", icon: Target, color: "bg-gray-500", category: "Others" }
  ]

  // Event handlers
  const handleCreateCommunity = (communityData: any) => {
    const newCommunity = {
      id: Date.now(),
      ...communityData,
      members: 1,
      createdAt: new Date().toISOString(),
      createdBy: userProfile.name
    }
    setCommunities([...communities, newCommunity])
    localStorage.setItem('sportsCommunities', JSON.stringify([...communities, newCommunity]))
    toast({
      title: "Community Created!",
      description: `${communityData.name} has been created successfully.`,
    })
    setShowCreateCommunity(false)
  }

  const handleCreateEvent = (eventData: any) => {
    const newEvent = {
      id: Date.now(),
      ...eventData,
      participants: 0,
      createdAt: new Date().toISOString(),
      createdBy: userProfile.name,
      status: "open"
    }
    // In a real app, this would be saved to a database
    // For now, we'll just show a success message
    toast({
      title: "Event Created!",
      description: `${eventData.title} has been created and will appear in the events page.`,
    })
    setShowCreateEvent(false)
  }

  const handleSaveEvent = (eventId: number) => {
    const newSaved = savedEvents.includes(eventId)
      ? savedEvents.filter(id => id !== eventId)
      : [...savedEvents, eventId]
    
    setSavedEvents(newSaved)
    localStorage.setItem('savedSportsEvents', JSON.stringify(newSaved))
    
    toast({
      title: savedEvents.includes(eventId) ? "Removed from Saved" : "Added to Saved",
      description: savedEvents.includes(eventId) 
        ? "Event removed from your saved list" 
        : "Event added to your saved list",
    })
  }

  const handleJoinCommunity = (communityId: number) => {
    setCommunities(communities.map(comm => 
      comm.id === communityId 
        ? { ...comm, members: comm.members + 1, joined: true }
        : comm
    ))
    toast({
      title: "Joined Community!",
      description: "You've successfully joined the community.",
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

  // Mock data for dashboard
  const userStats = {
    totalEvents: userProfile.eventsAttended,
    totalPoints: userProfile.points,
    rank: userProfile.rank,
    level: userProfile.level,
    nextLevel: "Platinum",
    progress: 75
  }

  const upcomingEvents = getSportsEvents().slice(0, 3).map((event: any) => ({
    id: event.id,
    name: event.title,
    date: event.date,
    time: event.time,
    location: event.location,
    participants: event.participants || 0,
    type: event.category || "Event"
  }))

  const recentAchievements = [
    {
      id: 1,
      title: "Tournament Champion",
      description: "Won the Startup Soccer League",
      date: "Dec 10, 2024",
      points: 100,
      icon: Trophy
    },
    {
      id: 2,
      title: "Team Player",
      description: "Participated in 10 team events",
      date: "Dec 8, 2024",
      points: 50,
      icon: Users2
    },
    {
      id: 3,
      title: "Fitness Goal",
      description: "Completed 30-day fitness challenge",
      date: "Dec 5, 2024",
      points: 75,
      icon: Target
    }
  ]

  const leaderboard = [
    { rank: 1, name: "Alex Wong", points: 2450, sport: "Soccer", trend: "up" },
    { rank: 2, name: "Sarah Chen", points: 2180, sport: "Basketball", trend: "up" },
    { rank: 3, name: "David Kumar", points: 1950, sport: "Running", trend: "stable" },
    { rank: 4, name: "Mei Lin", points: 1820, sport: "Tennis", trend: "down" },
    { rank: 5, name: "James Lee", points: 1680, sport: "Swimming", trend: "up" }
  ]

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
              <h1 className="text-lg font-bold text-gray-900">Sports Club</h1>
              <p className="text-xs text-gray-500">{getSportsEvents().length} events available</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 relative"
            >
              <Bell className="h-5 w-5" />
              {notifications.length > 0 && (
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
              placeholder="Search sports events, communities..."
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
                <Trophy className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-3xl lg:text-4xl xl:text-6xl font-bold mb-6">
              Powering The Global Sports Community
              </h1>
            <p className="text-lg lg:text-xl xl:text-2xl text-blue-100 mb-8 leading-relaxed">
              World class tools for players, organizers and coaches. Connect with fellow founders through sports, tournaments, and networking activities.
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
              <Button
                onClick={() => setShowCreateCommunity(true)}
                className="bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                <Users className="h-4 w-4 mr-2" />
                Start a Club
              </Button>
              <Button
                onClick={() => setShowCreateEvent(true)}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-[#0F7377] transition-colors"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Create Meet
              </Button>
              <Button
                onClick={() => setActiveTab('competitions')}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-[#0F7377] transition-colors"
              >
                <Trophy className="h-4 w-4 mr-2" />
                Join Competition
              </Button>
              <Button
                onClick={() => setActiveTab('sports')}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-[#0F7377] transition-colors"
              >
                <Target className="h-4 w-4 mr-2" />
                Explore Sports
              </Button>
              <Button
                asChild
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-[#0F7377] transition-colors"
              >
                <Link href="/sports-club/community-standards">
                  <Shield className="h-4 w-4 mr-2" />
                  Community Standards
                </Link>
          </Button>
            </div>
            </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="border-b">
            <TabsList className="grid w-full grid-cols-5 lg:grid-cols-8">
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
              <TabsTrigger value="meets" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="hidden sm:inline">Meets</span>
            </TabsTrigger>
              <TabsTrigger value="communities" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Clubs</span>
            </TabsTrigger>
              <TabsTrigger value="competitions" className="flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                <span className="hidden sm:inline">Competitions</span>
            </TabsTrigger>
              <TabsTrigger value="sports" className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                <span className="hidden sm:inline">Sports</span>
          </TabsTrigger>
              <TabsTrigger value="networking" className="flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Network</span>
          </TabsTrigger>
              <TabsTrigger value="checkin" className="flex items-center gap-2">
                <QrCode className="w-4 h-4" />
                <span className="hidden sm:inline">Check-in</span>
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
        </TabsList>
          </div>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="py-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Events</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userStats.totalEvents}</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Points</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userStats.totalPoints}</div>
                  <p className="text-xs text-muted-foreground">Lifetime score</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Current Rank</CardTitle>
                  <Trophy className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">#{userStats.rank}</div>
                  <p className="text-xs text-muted-foreground">Out of 150+ members</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Level</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userStats.level}</div>
                  <p className="text-xs text-muted-foreground">Next: {userStats.nextLevel}</p>
                </CardContent>
              </Card>
            </div>

            {/* Progress to Next Level */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Progress to {userStats.nextLevel}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span>Current Level: {userStats.level}</span>
                  <span>{userStats.progress}%</span>
                </div>
                <Progress value={userStats.progress} className="w-full" />
                <p className="text-xs text-muted-foreground">
                  Keep participating in events to level up!
                </p>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => setShowCreateEvent(true)}>
                    <Calendar className="h-6 w-6" />
                    Create Event
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => setShowCreateCommunity(true)}>
                    <Users className="h-6 w-6" />
                    Create Community
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => setActiveTab("sports")}>
                    <Trophy className="h-6 w-6" />
                    Browse Sports
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events and Recent Achievements */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upcoming Events */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{event.name}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                          <Clock className="h-3 w-3" />
                          <span>{event.date} at {event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <MapPin className="h-3 w-3" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <Badge variant="secondary">{event.participants} participants</Badge>
                        <p className="text-xs text-gray-500 mt-1">{event.type}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Recent Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentAchievements.map((achievement) => (
                    <div key={achievement.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                          <achievement.icon className="h-5 w-5 text-yellow-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{achievement.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{achievement.description}</p>
                        <p className="text-xs text-gray-400">{achievement.date}</p>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <Badge variant="default">+{achievement.points}</Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Leaderboard */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Leaderboard
                </CardTitle>
                <CardDescription>Top performers this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((player, index) => (
                    <div key={player.rank} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          index === 0 ? 'bg-yellow-100 text-yellow-800' :
                          index === 1 ? 'bg-gray-100 text-gray-800' :
                          index === 2 ? 'bg-orange-100 text-orange-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {player.rank}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{player.name}</p>
                        <p className="text-xs text-gray-500">{player.sport}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{player.points} points</span>
                        <div className={`w-2 h-2 rounded-full ${
                          player.trend === 'up' ? 'bg-green-500' :
                          player.trend === 'down' ? 'bg-red-500' : 'bg-gray-500'
                        }`} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Meets Tab - Similar to Reclub's meet management */}
          <TabsContent value="meets" className="py-8">
            <div className="mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Sports Meets</h2>
                  <p className="text-gray-600">It's game time! Instantly setup details and manage your players with team assignments, RSVP's + waitlists.</p>
                </div>
                <Button 
                  onClick={() => setShowCreateEvent(true)}
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Meet
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">24</div>
                    <div className="text-sm text-gray-600">Upcoming Meets</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">156</div>
                    <div className="text-sm text-gray-600">Total Participants</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">8</div>
                    <div className="text-sm text-gray-600">Your Meets</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600">12</div>
                    <div className="text-sm text-gray-600">This Week</div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Meets List */}
            <div className="space-y-6">
              {getSportsEvents().map((meet: any) => (
                <Card key={meet.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="secondary">{meet.category || "Sports Meet"}</Badge>
                          <Badge variant="outline">{meet.skillLevel || "All Levels"}</Badge>
                          {meet.requiresRegistration && (
                            <Badge variant="destructive">Registration Required</Badge>
                          )}
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{meet.title}</h3>
                        <p className="text-gray-600 mb-4">{meet.description}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{meet.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{meet.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{meet.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            <span>{meet.participants || 0} / {meet.maxParticipants || "∞"}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSaveEvent(meet.id)}
                          >
                            <Heart className={`h-4 w-4 ${savedEvents.includes(meet.id) ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleShareEvent(meet)}
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button 
                          className="w-full"
                          onClick={() => {
                            toast({
                              title: "RSVP Success",
                              description: "You've successfully RSVP'd to this meet!",
                            })
                          }}
                        >
                          <UserPlus className="h-4 w-4 mr-2" />
                          RSVP Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Empty State */}
              {getSportsEvents().length === 0 && (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Meets Scheduled</h3>
                  <p className="text-gray-600 mb-6">Be the first to create a sports meet!</p>
                  <Button onClick={() => setShowCreateEvent(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Meet
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Competitions Tab */}
          <TabsContent value="competitions" className="py-8">
            <div className="mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Competitions</h2>
                  <p className="text-gray-600">There's never been an easier way to register, seed, draw, and track matches. No excel required.</p>
                </div>
                <Button className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700">
                  <Trophy className="h-4 w-4 mr-2" />
                  Create Competition
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">Basketball</Badge>
                    <Badge variant="outline">Ongoing</Badge>
                  </div>
                  <CardTitle>Startup Basketball League</CardTitle>
                  <CardDescription>Weekly basketball tournament for founders and entrepreneurs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Teams</span>
                    <span className="font-semibold">8 / 16</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Matches Played</span>
                    <span className="font-semibold">24 / 56</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Prize Pool</span>
                    <span className="font-semibold">$5,000</span>
                  </div>
                  <Button className="w-full">
                    <Trophy className="h-4 w-4 mr-2" />
                    View Bracket
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">Tennis</Badge>
                    <Badge variant="outline">Registration Open</Badge>
                  </div>
                  <CardTitle>Founders Tennis Championship</CardTitle>
                  <CardDescription>Annual tennis championship for the startup community</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Players</span>
                    <span className="font-semibold">32 / 64</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Registration Ends</span>
                    <span className="font-semibold">Dec 31, 2024</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Entry Fee</span>
                    <span className="font-semibold">$50</span>
                  </div>
                  <Button className="w-full">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Register Now
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">Soccer</Badge>
                    <Badge variant="outline">Completed</Badge>
                  </div>
                  <CardTitle>Startup World Cup</CardTitle>
                  <CardDescription>International soccer tournament for startup teams</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Winner</span>
                    <span className="font-semibold">Tech Titans FC</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Final Score</span>
                    <span className="font-semibold">3-1</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Prize Won</span>
                    <span className="font-semibold">$10,000</span>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Trophy className="h-4 w-4 mr-2" />
                    View Results
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="py-8">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-2/3">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Sports Events</h2>
                  <div className="flex gap-2">
                    <Button
                      variant={viewMode === "grid" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getSportsEvents().map((event: any) => (
                      <Card key={event.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <Badge variant="secondary">{event.category || "Sports"}</Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleSaveEvent(event.id)}
                            >
                              <Heart className={`h-4 w-4 ${savedEvents.includes(event.id) ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
                            </Button>
                          </div>
                          <CardTitle className="text-lg">{event.title}</CardTitle>
                          <CardDescription>{event.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="h-4 w-4" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="h-4 w-4" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline">{event.participants || 0} participants</Badge>
                            <Button size="sm" onClick={() => handleShareEvent(event)}>
                              <Share2 className="h-4 w-4 mr-1" />
                              Share
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {getSportsEvents().map((event: any) => (
                      <Card key={event.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-lg font-semibold">{event.title}</h3>
                                <Badge variant="secondary">{event.category || "Sports"}</Badge>
                              </div>
                              <p className="text-gray-600 mb-3">{event.description}</p>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  <span>{event.date}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  <span>{event.time}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  <span>{event.location}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users className="h-4 w-4" />
                                  <span>{event.participants || 0} participants</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleSaveEvent(event.id)}
                              >
                                <Heart className={`h-4 w-4 ${savedEvents.includes(event.id) ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
                              </Button>
                              <Button size="sm" onClick={() => handleShareEvent(event)}>
                                <Share2 className="h-4 w-4 mr-1" />
                                Share
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              <div className="lg:w-1/3">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button 
                      className="w-full" 
                      onClick={() => setShowCreateEvent(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create Event
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setActiveTab("communities")}
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Browse Communities
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setActiveTab("sports")}
                    >
                      <Trophy className="h-4 w-4 mr-2" />
                      Explore Sports
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Communities Tab */}
          <TabsContent value="communities" className="py-8">
            <div className="mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Sports Communities</h2>
                  <p className="text-gray-600">Connect with fellow athletes and join communities that share your passion</p>
                </div>
                <Button 
                  onClick={() => setShowCreateCommunity(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Start a Club
                </Button>
              </div>

              {/* Search and Filter */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search communities..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedSport} onValueChange={setSelectedSport}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by sport" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sports</SelectItem>
                    {Array.from(new Set(sportsCategories.map(s => s.category))).map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Communities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {communities.map((community: any) => (
                <Card key={community.id} className="hover:shadow-lg transition-all duration-300 group">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="secondary" className="text-xs">{community.sport}</Badge>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleJoinCommunity(community.id)}
                          className="h-8 w-8 p-0"
                        >
                          {community.joined ? (
                            <UserCheck className="h-4 w-4 text-green-600" />
                          ) : (
                            <UserPlus className="h-4 w-4 text-blue-600" />
                          )}
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                      {community.name}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {community.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="h-4 w-4" />
                        <span>{community.members} members</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{community.frequency || "Weekly"}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{community.location || "Online"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <User className="h-4 w-4" />
                        <span>by {community.createdBy}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      <Badge variant="outline" className="text-xs">
                        {community.skillLevel || "All Levels"}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {community.ageGroup || "All Ages"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Empty State */}
              {communities.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Communities Yet</h3>
                  <p className="text-gray-600 mb-6">Be the first to start a sports community!</p>
                  <Button onClick={() => setShowCreateCommunity(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Community
                  </Button>
                </div>
              )}
            </div>

            {/* Community Stats */}
            <div className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Community Impact</h3>
                <p className="text-gray-600 mb-6">See how our communities are making a difference</p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{communities.length}</div>
                    <div className="text-sm text-gray-600">Active Communities</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">
                      {communities.reduce((sum, comm) => sum + (comm.members || 0), 0)}
                    </div>
                    <div className="text-sm text-gray-600">Total Members</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">
                      {communities.filter(comm => comm.joined).length}
                    </div>
                    <div className="text-sm text-gray-600">Your Communities</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">50+</div>
                    <div className="text-sm text-gray-600">Events This Month</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Sports Tab */}
          <TabsContent value="sports" className="py-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">All Sports</h2>
              <p className="text-gray-600 mb-6">Explore different sports and join communities. Find your passion!</p>
              
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 mb-6">
                <Button
                  variant={selectedSport === "all" ? "default" : "outline"}
                  onClick={() => setSelectedSport("all")}
                  className="mb-2"
                >
                  All Sports
                </Button>
                {Array.from(new Set(sportsCategories.map(s => s.category))).map((category) => (
                  <Button
                    key={category}
                    variant={selectedSport === category ? "default" : "outline"}
                    onClick={() => setSelectedSport(category)}
                    className="mb-2"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Sports Grid */}
            <div className="space-y-8">
              {Array.from(new Set(sportsCategories.map(s => s.category))).map((category) => {
                const categorySports = sportsCategories.filter(s => s.category === category)
                if (selectedSport !== "all" && selectedSport !== category) return null
                
                return (
                  <div key={category}>
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">{category}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                      {categorySports.map((sport) => {
                        const IconComponent = sport.icon
                        return (
                          <Card 
                            key={sport.id} 
                            className="hover:shadow-lg transition-all cursor-pointer hover:scale-105 group"
                            onClick={() => {
                              setSelectedSport(sport.id)
                              setActiveTab("communities")
                            }}
                          >
                            <CardContent className="p-4 text-center">
                              <div className={`w-12 h-12 ${sport.color} rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                                <IconComponent className="h-6 w-6 text-white" />
                              </div>
                              <h4 className="font-semibold text-sm text-gray-800 group-hover:text-blue-600 transition-colors">
                                {sport.name}
                              </h4>
                              <p className="text-xs text-gray-500 mt-1">Join Community</p>
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Quick Stats */}
            <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Play?</h3>
                <p className="text-gray-600 mb-6">Join thousands of athletes in the Founders Sports Club community</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{sportsCategories.length}</div>
                    <div className="text-sm text-gray-600">Sports Available</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">500+</div>
                    <div className="text-sm text-gray-600">Active Communities</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">10K+</div>
                    <div className="text-sm text-gray-600">Members</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Networking Tab */}
          <TabsContent value="networking" className="py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="h-5 w-5" />
                    Photo Sharing
                  </CardTitle>
                  <CardDescription>Share photos from sports events</CardDescription>
              </CardHeader>
              <CardContent>
                  <Button 
                    className="w-full" 
                    onClick={() => setShowPhotoShare(true)}
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Share Photos
                  </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <QrCode className="h-5 w-5" />
                    QR Check-in
                  </CardTitle>
                  <CardDescription>Check in to events with QR codes</CardDescription>
              </CardHeader>
              <CardContent>
                  <Button 
                    className="w-full" 
                    onClick={() => setShowQRCode(true)}
                  >
                    <QrCode className="h-4 w-4 mr-2" />
                    Generate QR Code
                  </Button>
              </CardContent>
            </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Chat
                  </CardTitle>
                  <CardDescription>Connect with other members</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Open Chat
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Share2 className="h-5 w-5" />
                    Share Profile
                  </CardTitle>
                  <CardDescription>Share your sports profile</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Profile
                  </Button>
                </CardContent>
              </Card>
            </div>
        </TabsContent>

          {/* Check-in Tab */}
          <TabsContent value="checkin" className="py-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="h-5 w-5" />
                  Event Check-in
                </CardTitle>
                <CardDescription>Scan QR code to check in to events</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="w-64 h-64 bg-gray-100 rounded-lg mx-auto flex items-center justify-center">
                  <QrCode className="h-32 w-32 text-gray-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Scan QR Code</h3>
                  <p className="text-gray-600">Point your camera at the QR code to check in</p>
                </div>
                <Button size="lg" onClick={() => setShowQRCode(true)}>
                  <Camera className="h-4 w-4 mr-2" />
                  Open Camera
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <User className="h-10 w-10 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold">{userProfile.name}</h3>
                      <p className="text-gray-600">Level {userProfile.level}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Points</span>
                        <span className="font-semibold">{userProfile.points}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Rank</span>
                        <span className="font-semibold">#{userProfile.rank}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Events Attended</span>
                        <span className="font-semibold">{userProfile.eventsAttended}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Achievements</span>
                        <span className="font-semibold">{userProfile.achievements}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Sports Interests</CardTitle>
              </CardHeader>
              <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {userProfile.sports.map((sport) => (
                        <Badge key={sport} variant="secondary">{sport}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Management */}
                <Card className="mt-6">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        <CardTitle>Payment Management</CardTitle>
                      </div>
                      <Button onClick={handleSetupPayment} variant="outline">
                        {stripeAccountId ? 'Manage Payments' : 'Set Up Payments'}
                      </Button>
                    </div>
                    <CardDescription>
                      Manage your Stripe account and payment settings for events
                    </CardDescription>
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
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <AlertCircle className="h-4 w-4" />
                          <span className="font-medium">No payment account</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Set up a Stripe account to start accepting payments for your events.
                        </p>
                      </div>
                    )}
              </CardContent>
            </Card>
              </div>
            </div>
        </TabsContent>
      </Tabs>
      </div>

      {/* Modals */}
      <Dialog open={showCreateEvent} onOpenChange={setShowCreateEvent}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Sports Event</DialogTitle>
            <DialogDescription>Create a new sports event for the community</DialogDescription>
          </DialogHeader>
          <CreateEventForm onSubmit={handleCreateEvent} />
        </DialogContent>
      </Dialog>

      <Dialog open={showCreateCommunity} onOpenChange={setShowCreateCommunity}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Sports Community</DialogTitle>
            <DialogDescription>Create a new sports community</DialogDescription>
          </DialogHeader>
          <CreateCommunityForm onSubmit={handleCreateCommunity} />
        </DialogContent>
      </Dialog>

      <Dialog open={showQRCode} onOpenChange={setShowQRCode}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>QR Code Check-in</DialogTitle>
            <DialogDescription>Scan QR code to check in to events</DialogDescription>
          </DialogHeader>
          <div className="text-center space-y-4">
            <div className="w-64 h-64 bg-gray-100 rounded-lg mx-auto flex items-center justify-center">
              <QrCode className="h-32 w-32 text-gray-400" />
            </div>
            <p className="text-sm text-gray-600">QR code functionality would be implemented here</p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showPhotoShare} onOpenChange={setShowPhotoShare}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Photos</DialogTitle>
            <DialogDescription>Share photos from sports events</DialogDescription>
          </DialogHeader>
          <div className="text-center space-y-4">
            <div className="w-64 h-64 bg-gray-100 rounded-lg mx-auto flex items-center justify-center">
              <Camera className="h-32 w-32 text-gray-400" />
            </div>
            <p className="text-sm text-gray-600">Photo sharing functionality would be implemented here</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="flex justify-around py-2">
          <Button 
            variant="ghost" 
            className={`flex flex-col items-center space-y-1 p-2 ${activeTab === 'dashboard' ? 'text-[#0F7377]' : 'text-gray-600'}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <BarChart3 className="w-4 h-4" />
            <span className="text-xs font-semibold">Dashboard</span>
          </Button>
          <Button 
            variant="ghost" 
            className={`flex flex-col items-center space-y-1 p-2 ${activeTab === 'meets' ? 'text-[#0F7377]' : 'text-gray-600'}`}
            onClick={() => setActiveTab('meets')}
          >
            <Calendar className="w-4 h-4" />
            <span className="text-xs font-semibold">Meets</span>
          </Button>
          <Button 
            variant="ghost" 
            className={`flex flex-col items-center space-y-1 p-2 ${activeTab === 'communities' ? 'text-[#0F7377]' : 'text-gray-600'}`}
            onClick={() => setActiveTab('communities')}
          >
            <Users className="w-4 h-4" />
            <span className="text-xs font-semibold">Clubs</span>
          </Button>
          <Button 
            variant="ghost" 
            className={`flex flex-col items-center space-y-1 p-2 ${activeTab === 'competitions' ? 'text-[#0F7377]' : 'text-gray-600'}`}
            onClick={() => setActiveTab('competitions')}
          >
            <Trophy className="w-4 h-4" />
            <span className="text-xs font-semibold">Compete</span>
          </Button>
          <Button 
            variant="ghost" 
            className={`flex flex-col items-center space-y-1 p-2 ${activeTab === 'sports' ? 'text-[#0F7377]' : 'text-gray-600'}`}
            onClick={() => setActiveTab('sports')}
          >
            <Target className="w-4 h-4" />
            <span className="text-xs font-semibold">Sports</span>
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

      {/* Bottom padding for mobile navigation */}
      <div className="lg:hidden h-20"></div>
    </div>
  )
}

export default function SportsClubPage() {
  return (
    <SharedEventsProvider>
      <SportsClubPageContent />
    </SharedEventsProvider>
  )
}
