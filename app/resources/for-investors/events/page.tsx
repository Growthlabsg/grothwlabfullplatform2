"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft,
  Search,
  Filter,
  Calendar,
  Clock,
  MapPin,
  Users,
  Globe,
  Video,
  ExternalLink,
  Download,
  Upload,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  Settings,
  HelpCircle,
  Info,
  AlertCircle,
  CheckCircle,
  XCircle,
  Lightbulb,
  Zap,
  Award,
  Trophy,
  Medal,
  Crown,
  Gem,
  Sparkles,
  Star,
  Heart,
  Eye,
  MousePointer,
  Mail,
  Send,
  RefreshCw,
  Save,
  Copy,
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
  Code,
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
  Share2,
  Bookmark,
  BookmarkCheck,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Phone,
  Briefcase,
  GraduationCap,
  BookOpen,
  Rocket,
  Code2,
  Database,
  Server,
  Cloud,
  Wifi,
  WifiOff,
  FileText,
  Image,
  Link as LinkIcon,
  ChevronDown,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw,
  RotateCw,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  MessageCircle,
  Reply,
  Flag,
  Archive,
  Tag,
  Folder,
  FolderOpen,
  BarChart3,
  Target,
  Building2,
  DollarSign,
  TrendingUp,
  TrendingDown
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function InvestorEventsPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("upcoming")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")

  const eventTypes = [
    { id: "all", name: "All Events", count: 24 },
    { id: "conference", name: "Conference", count: 8 },
    { id: "webinar", name: "Webinar", count: 6 },
    { id: "demo-day", name: "Demo Day", count: 4 },
    { id: "networking", name: "Networking", count: 3 },
    { id: "workshop", name: "Workshop", count: 3 }
  ]

  const locations = [
    { id: "all", name: "All Locations", count: 24 },
    { id: "san-francisco", name: "San Francisco", count: 8 },
    { id: "new-york", name: "New York", count: 6 },
    { id: "virtual", name: "Virtual", count: 5 },
    { id: "boston", name: "Boston", count: 3 },
    { id: "austin", name: "Austin", count: 2 }
  ]

  const events = [
    {
      id: 1,
      title: "Investor Summit 2024",
      description: "Annual gathering of top investors, portfolio companies, and industry leaders to discuss market trends and investment opportunities.",
      date: "2024-03-15",
      time: "9:00 AM - 6:00 PM",
      location: "San Francisco, CA",
      type: "Conference",
      attendees: 500,
      status: "Upcoming",
      registrationUrl: "/events/investor-summit-2024",
      featured: true,
      price: "$299",
      speakers: ["Sarah Chen (Accel)", "Michael Rodriguez (Sequoia)", "Lisa Wang (Andreessen Horowitz)"],
      agenda: ["Keynote: Market Outlook", "Panel: AI Investment Trends", "Networking Lunch", "Portfolio Showcase"],
      tags: ["Investment", "Networking", "AI", "Market Trends"]
    },
    {
      id: 2,
      title: "Portfolio Company Demo Day",
      description: "Showcase of latest innovations and products from our portfolio companies. Meet the founders and see live demos.",
      date: "2024-02-28",
      time: "2:00 PM - 5:00 PM",
      location: "Virtual",
      type: "Demo Day",
      attendees: 200,
      status: "Upcoming",
      registrationUrl: "/events/demo-day-feb-2024",
      featured: true,
      price: "Free",
      speakers: ["TechFlow AI", "CloudSecure", "EcoTech Solutions", "HealthTech Innovations"],
      agenda: ["Company Presentations", "Live Demos", "Q&A Sessions", "Networking"],
      tags: ["Portfolio", "Demo", "Innovation", "Startups"]
    },
    {
      id: 3,
      title: "Market Trends Webinar",
      description: "Discussion on emerging market trends, investment opportunities, and regulatory changes affecting the startup ecosystem.",
      date: "2024-02-15",
      time: "11:00 AM - 12:00 PM",
      location: "Virtual",
      type: "Webinar",
      attendees: 150,
      status: "Upcoming",
      registrationUrl: "/events/market-trends-webinar",
      featured: false,
      price: "Free",
      speakers: ["Dr. James Wilson (Research Director)", "Maria Garcia (Market Analyst)"],
      agenda: ["Market Overview", "Trend Analysis", "Q&A Session"],
      tags: ["Market Analysis", "Trends", "Research", "Webinar"]
    },
    {
      id: 4,
      title: "AI Investment Workshop",
      description: "Hands-on workshop on evaluating AI startups, understanding technical due diligence, and assessing market opportunities.",
      date: "2024-02-10",
      time: "10:00 AM - 4:00 PM",
      location: "New York, NY",
      type: "Workshop",
      attendees: 50,
      status: "Upcoming",
      registrationUrl: "/events/ai-investment-workshop",
      featured: false,
      price: "$199",
      speakers: ["Dr. Sarah Chen (AI Expert)", "Mark Thompson (VC Partner)"],
      agenda: ["AI Fundamentals", "Technical Due Diligence", "Case Studies", "Hands-on Exercises"],
      tags: ["AI", "Workshop", "Due Diligence", "Technical"]
    },
    {
      id: 5,
      title: "CleanTech Investment Panel",
      description: "Panel discussion on CleanTech investment opportunities, sustainability trends, and environmental impact investing.",
      date: "2024-02-05",
      time: "3:00 PM - 5:00 PM",
      location: "Boston, MA",
      type: "Networking",
      attendees: 75,
      status: "Upcoming",
      registrationUrl: "/events/cleantech-panel",
      featured: false,
      price: "$99",
      speakers: ["Green Energy CEO", "Climate Tech VC", "Sustainability Expert"],
      agenda: ["Panel Discussion", "Networking", "Q&A"],
      tags: ["CleanTech", "Sustainability", "Panel", "Networking"]
    },
    {
      id: 6,
      title: "FinTech Regulatory Update",
      description: "Update on regulatory changes affecting FinTech investments and compliance requirements for portfolio companies.",
      date: "2024-01-25",
      time: "2:00 PM - 3:00 PM",
      location: "Virtual",
      type: "Webinar",
      attendees: 120,
      status: "Past",
      registrationUrl: "/events/fintech-regulatory-update",
      featured: false,
      price: "Free",
      speakers: ["Legal Team", "Compliance Expert"],
      agenda: ["Regulatory Overview", "Compliance Requirements", "Q&A"],
      tags: ["FinTech", "Regulatory", "Compliance", "Legal"]
    }
  ]

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesType = selectedType === "all" || event.type.toLowerCase().replace(' ', '-') === selectedType
    const matchesLocation = selectedLocation === "all" || event.location.toLowerCase().replace(' ', '-').replace(',', '') === selectedLocation
    return matchesSearch && matchesType && matchesLocation
  })

  const handleRegisterEvent = (eventId: number) => {
    toast({
      title: "Registering for Event",
      description: "Redirecting to event registration...",
    })
  }

  const handleViewEvent = (eventId: number) => {
    toast({
      title: "Viewing Event",
      description: "Opening event details...",
    })
  }

  const handleAddToCalendar = (eventId: number) => {
    toast({
      title: "Added to Calendar",
      description: "Event added to your calendar.",
    })
  }

  const handleShareEvent = (eventId: number) => {
    toast({
      title: "Shared",
      description: "Event link copied to clipboard.",
    })
  }

  const handleBookmarkEvent = (eventId: number) => {
    toast({
      title: "Bookmarked",
      description: "Event added to your bookmarks.",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/resources/for-investors">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to For Investors
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Investor Events</h1>
                <p className="text-sm text-gray-600">Conferences, webinars, and networking events</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Events
              </Button>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
            <TabsTrigger value="my-events">My Events</TabsTrigger>
          </TabsList>

          {/* Upcoming Events Tab */}
          <TabsContent value="upcoming" className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {eventTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name} ({type.count})
                    </option>
                  ))}
                </select>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {locations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.name} ({location.count})
                    </option>
                  ))}
                </select>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>

            {/* Featured Events */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredEvents
                .filter(event => event.featured && event.status === 'Upcoming')
                .map((event) => (
                <Card key={event.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className="bg-[#F59E0B] text-white">Featured</Badge>
                          <Badge variant="outline">{event.type}</Badge>
                          <Badge variant="outline">{event.price}</Badge>
                        </div>
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-[#0F7377] transition-colors">
                          {event.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Date</span>
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Time</span>
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Location</span>
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Attendees</span>
                        <span>{event.attendees.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {event.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Button 
                          size="sm" 
                          className="bg-[#0F7377] hover:bg-[#0F7377]/90 flex-1 mr-2"
                          onClick={() => handleRegisterEvent(event.id)}
                        >
                          <Calendar className="h-4 w-4 mr-1" />
                          Register
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewEvent(event.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleAddToCalendar(event.id)}
                          className="flex-1 mr-1"
                        >
                          <Clock className="h-4 w-4 mr-1" />
                          Add to Calendar
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleBookmarkEvent(event.id)}
                          className="flex-1 mr-1"
                        >
                          <Bookmark className="h-4 w-4 mr-1" />
                          Bookmark
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleShareEvent(event.id)}
                          className="flex-1"
                        >
                          <Share2 className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* All Upcoming Events */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents
                .filter(event => !event.featured && event.status === 'Upcoming')
                .map((event) => (
                <Card key={event.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline">{event.type}</Badge>
                          <Badge variant="outline">{event.price}</Badge>
                        </div>
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-[#0F7377] transition-colors">
                          {event.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Date</span>
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Time</span>
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Location</span>
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Attendees</span>
                        <span>{event.attendees.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {event.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Button 
                          size="sm" 
                          className="bg-[#0F7377] hover:bg-[#0F7377]/90 flex-1 mr-2"
                          onClick={() => handleRegisterEvent(event.id)}
                        >
                          <Calendar className="h-4 w-4 mr-1" />
                          Register
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewEvent(event.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleAddToCalendar(event.id)}
                          className="flex-1 mr-1"
                        >
                          <Clock className="h-4 w-4 mr-1" />
                          Calendar
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleBookmarkEvent(event.id)}
                          className="flex-1 mr-1"
                        >
                          <Bookmark className="h-4 w-4 mr-1" />
                          Save
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleShareEvent(event.id)}
                          className="flex-1"
                        >
                          <Share2 className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Past Events Tab */}
          <TabsContent value="past" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents
                .filter(event => event.status === 'Past')
                .map((event) => (
                <Card key={event.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="secondary">Past Event</Badge>
                          <Badge variant="outline">{event.type}</Badge>
                        </div>
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-[#0F7377] transition-colors">
                          {event.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Date</span>
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Time</span>
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Location</span>
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Attendees</span>
                        <span>{event.attendees.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {event.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewEvent(event.id)}
                        className="flex-1 mr-2"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleShareEvent(event.id)}
                        className="flex-1"
                      >
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* My Events Tab */}
          <TabsContent value="my-events" className="space-y-6">
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">My Events</h3>
              <p className="text-gray-500 mb-4">View your registered events and event history</p>
              <Button className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                <Calendar className="h-4 w-4 mr-2" />
                View My Events
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
