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
  Star,
  Heart,
  Share2,
  Bookmark,
  BookmarkCheck,
  MoreHorizontal,
  Settings,
  HelpCircle,
  Info,
  AlertCircle,
  CheckCircle,
  XCircle,
  Lightbulb,
  Zap,
  FileText,
  Image,
  Video,
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
  MessageSquare,
  Reply,
  Flag,
  Archive,
  Tag,
  Folder,
  FolderOpen,
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
  ExternalLink,
  Phone,
  Briefcase,
  GraduationCap,
  BookOpen,
  Rocket,
  Database,
  Server,
  Cloud,
  Wifi,
  WifiOff,
  Globe,
  Mail,
  Send,
  Download,
  Upload,
  Plus,
  Edit,
  Trash2,
  X,
  Target,
  TrendingUp,
  BarChart3,
  Building2,
  DollarSign,
  Award,
  Trophy,
  Medal,
  Crown,
  Gem,
  Sparkles,
  ThumbsUp,
  ThumbsDown
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function EventsPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [showFilters, setShowFilters] = useState(false)
  const [activeTab, setActiveTab] = useState("upcoming")

  const categories = [
    { id: "all", name: "All Categories", count: 24 },
    { id: "workshop", name: "Workshops", count: 8 },
    { id: "masterclass", name: "Masterclasses", count: 6 },
    { id: "networking", name: "Networking", count: 5 },
    { id: "conference", name: "Conferences", count: 3 },
    { id: "webinar", name: "Webinars", count: 2 }
  ]

  const events = [
    {
      id: 1,
      title: "Startup Funding Workshop",
      description: "Learn how to secure funding for your startup with expert guidance and networking opportunities. This comprehensive workshop covers everything from preparing your pitch to negotiating with investors.",
      category: "workshop",
      type: "Workshop",
      date: "2024-02-15",
      time: "2:00 PM - 5:00 PM",
      location: "San Francisco, CA",
      venue: "GrowthLab Innovation Center",
      attendees: 75,
      maxAttendees: 100,
      price: "Free",
      status: "Upcoming",
      isBookmarked: false,
      isRegistered: false,
      rating: 4.8,
      reviews: 23,
      organizer: "GrowthLab Team",
      speakers: ["Sarah Chen", "Michael Rodriguez", "Lisa Wang"],
      tags: ["Funding", "Startups", "Investors", "Pitch"],
      requirements: ["Laptop", "Business Plan Draft"],
      materials: ["Funding Guide", "Pitch Template", "Investor List"]
    },
    {
      id: 2,
      title: "Business Strategy Masterclass",
      description: "Master the fundamentals of business strategy and growth planning with industry experts. This intensive masterclass will help you develop a comprehensive strategy for your business.",
      category: "masterclass",
      type: "Masterclass",
      date: "2024-02-20",
      time: "9:00 AM - 12:00 PM",
      location: "Virtual",
      venue: "Online Event",
      attendees: 150,
      maxAttendees: 200,
      price: "$99",
      status: "Upcoming",
      isBookmarked: true,
      isRegistered: true,
      rating: 4.9,
      reviews: 45,
      organizer: "GrowthLab Consulting",
      speakers: ["David Kim", "Jennifer Martinez"],
      tags: ["Strategy", "Planning", "Growth", "Business"],
      requirements: ["Stable Internet", "Notebook"],
      materials: ["Strategy Framework", "Case Studies", "Templates"]
    },
    {
      id: 3,
      title: "Networking Mixer for Entrepreneurs",
      description: "Connect with fellow entrepreneurs, investors, and industry experts in a relaxed networking environment. Perfect for building relationships and finding potential partners.",
      category: "networking",
      type: "Networking",
      date: "2024-02-25",
      time: "6:00 PM - 9:00 PM",
      location: "New York, NY",
      venue: "The Innovation Hub",
      attendees: 120,
      maxAttendees: 150,
      price: "$25",
      status: "Upcoming",
      isBookmarked: false,
      isRegistered: false,
      rating: 4.7,
      reviews: 18,
      organizer: "Entrepreneur Network",
      speakers: ["Various Industry Leaders"],
      tags: ["Networking", "Entrepreneurs", "Partnerships"],
      requirements: ["Business Cards"],
      materials: ["Attendee List", "Contact Information"]
    },
    {
      id: 4,
      title: "Digital Marketing Conference 2024",
      description: "Join industry leaders for a comprehensive conference on digital marketing trends, strategies, and best practices. Learn from successful marketers and grow your business online.",
      category: "conference",
      type: "Conference",
      date: "2024-03-10",
      time: "9:00 AM - 5:00 PM",
      location: "Los Angeles, CA",
      venue: "Convention Center",
      attendees: 500,
      maxAttendees: 600,
      price: "$299",
      status: "Upcoming",
      isBookmarked: true,
      isRegistered: false,
      rating: 4.6,
      reviews: 67,
      organizer: "Marketing Association",
      speakers: ["15+ Industry Experts"],
      tags: ["Marketing", "Digital", "SEO", "Social Media"],
      requirements: ["Laptop", "Notebook"],
      materials: ["Conference Materials", "Digital Resources"]
    },
    {
      id: 5,
      title: "Legal Essentials for Startups",
      description: "Learn about essential legal requirements for startups, including entity formation, contracts, IP protection, and compliance. Get expert advice from experienced startup lawyers.",
      category: "webinar",
      type: "Webinar",
      date: "2024-02-28",
      time: "2:00 PM - 3:30 PM",
      location: "Virtual",
      venue: "Online Event",
      attendees: 89,
      maxAttendees: 100,
      price: "Free",
      status: "Upcoming",
      isBookmarked: false,
      isRegistered: true,
      rating: 4.5,
      reviews: 12,
      organizer: "Legal Team",
      speakers: ["Robert Johnson", "Legal Experts"],
      tags: ["Legal", "Startups", "Compliance", "Contracts"],
      requirements: ["Stable Internet"],
      materials: ["Legal Checklist", "Templates", "Resources"]
    },
    {
      id: 6,
      title: "Tech Stack Optimization Workshop",
      description: "Learn how to optimize your technology stack for better performance, security, and scalability. Perfect for technical founders and CTOs.",
      category: "workshop",
      type: "Workshop",
      date: "2024-01-20",
      time: "10:00 AM - 4:00 PM",
      location: "Austin, TX",
      venue: "Tech Innovation Center",
      attendees: 45,
      maxAttendees: 50,
      price: "$150",
      status: "Completed",
      isBookmarked: false,
      isRegistered: false,
      rating: 4.8,
      reviews: 15,
      organizer: "Tech Team",
      speakers: ["David Kim", "Tech Experts"],
      tags: ["Technology", "Optimization", "Performance", "Security"],
      requirements: ["Laptop", "Development Environment"],
      materials: ["Workshop Materials", "Code Examples"]
    }
  ]

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || 
      (selectedStatus === "upcoming" && event.status === "Upcoming") ||
      (selectedStatus === "completed" && event.status === "Completed")
    return matchesSearch && matchesCategory && matchesStatus
  })

  const upcomingEvents = filteredEvents.filter(event => event.status === "Upcoming")
  const completedEvents = filteredEvents.filter(event => event.status === "Completed")
  const myEvents = filteredEvents.filter(event => event.isRegistered)

  const handleRegisterEvent = (eventId: number) => {
    toast({
      title: "Event Registered",
      description: "You have been registered for the event. Confirmation details will be sent via email.",
    })
  }

  const handleBookmarkEvent = (eventId: number) => {
    toast({
      title: "Event Bookmarked",
      description: "Event added to your bookmarks.",
    })
  }

  const handleViewEvent = (eventId: number) => {
    toast({
      title: "Opening Event",
      description: "Loading event details...",
    })
  }

  const handleShareEvent = (eventId: number) => {
    toast({
      title: "Event Shared",
      description: "Event link copied to clipboard.",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Upcoming":
        return "bg-green-100 text-green-800"
      case "Completed":
        return "bg-gray-100 text-gray-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "workshop":
        return <Settings className="h-5 w-5 text-blue-500" />
      case "masterclass":
        return <GraduationCap className="h-5 w-5 text-purple-500" />
      case "networking":
        return <Users className="h-5 w-5 text-green-500" />
      case "conference":
        return <Building2 className="h-5 w-5 text-orange-500" />
      case "webinar":
        return <Video className="h-5 w-5 text-red-500" />
      default:
        return <Calendar className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/resources/business-support">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Business Support
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Business Events</h1>
                <p className="text-sm text-gray-600">Workshops, conferences, and networking events</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                <Plus className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="space-y-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search events by title, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-white rounded-lg border">
              <div>
                <label className="text-sm font-medium text-gray-700">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name} ({category.count})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="date">Date</option>
                  <option value="popularity">Popularity</option>
                  <option value="rating">Rating</option>
                  <option value="price">Price</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Location</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="all">All Locations</option>
                  <option value="virtual">Virtual</option>
                  <option value="san-francisco">San Francisco</option>
                  <option value="new-york">New York</option>
                  <option value="los-angeles">Los Angeles</option>
                </select>
              </div>
            </div>
          )}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upcoming">Upcoming ({upcomingEvents.length})</TabsTrigger>
            <TabsTrigger value="my-events">My Events ({myEvents.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedEvents.length})</TabsTrigger>
          </TabsList>

          {/* Upcoming Events Tab */}
          <TabsContent value="upcoming" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {getCategoryIcon(event.category)}
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg group-hover:text-[#0F7377] transition-colors">
                            {event.title}
                          </h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {event.type}
                            </Badge>
                            <Badge className={getStatusColor(event.status)}>
                              {event.status}
                            </Badge>
                            {event.price === "Free" && (
                              <Badge className="text-xs bg-green-100 text-green-800">
                                Free
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleBookmarkEvent(event.id)}>
                          {event.isBookmarked ? (
                            <BookmarkCheck className="h-4 w-4" />
                          ) : (
                            <Bookmark className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 text-sm mb-4 line-clamp-3">{event.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Date & Time</span>
                        <div className="text-right">
                          <div>{event.date}</div>
                          <div>{event.time}</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Location</span>
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Attendees</span>
                        <span>{event.attendees}/{event.maxAttendees}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Price</span>
                        <span className="font-semibold text-green-600">{event.price}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Rating</span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span>{event.rating}</span>
                          <span>({event.reviews})</span>
                        </div>
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
                      {event.isRegistered ? (
                        <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Registered
                        </Button>
                      ) : (
                        <Button 
                          size="sm" 
                          className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90"
                          onClick={() => handleRegisterEvent(event.id)}
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          Register
                        </Button>
                      )}
                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewEvent(event.id)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Details
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleShareEvent(event.id)}
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

          {/* My Events Tab */}
          <TabsContent value="my-events" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myEvents.map((event) => (
                <Card key={event.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {getCategoryIcon(event.category)}
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg group-hover:text-[#0F7377] transition-colors">
                            {event.title}
                          </h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {event.type}
                            </Badge>
                            <Badge className="bg-green-100 text-green-800">
                              Registered
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 text-sm mb-4 line-clamp-3">{event.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Date & Time</span>
                        <div className="text-right">
                          <div>{event.date}</div>
                          <div>{event.time}</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Location</span>
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Price</span>
                        <span className="font-semibold text-green-600">{event.price}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Registered
                      </Button>
                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewEvent(event.id)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Details
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleShareEvent(event.id)}
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

          {/* Completed Events Tab */}
          <TabsContent value="completed" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedEvents.map((event) => (
                <Card key={event.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {getCategoryIcon(event.category)}
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg group-hover:text-[#0F7377] transition-colors">
                            {event.title}
                          </h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {event.type}
                            </Badge>
                            <Badge className="bg-gray-100 text-gray-800">
                              Completed
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 text-sm mb-4 line-clamp-3">{event.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Date & Time</span>
                        <div className="text-right">
                          <div>{event.date}</div>
                          <div>{event.time}</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Location</span>
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Rating</span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span>{event.rating}</span>
                          <span>({event.reviews})</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Button size="sm" className="w-full bg-gray-600 hover:bg-gray-700">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Completed
                      </Button>
                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewEvent(event.id)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Details
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleShareEvent(event.id)}
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
        </Tabs>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            <RefreshCw className="h-4 w-4 mr-2" />
            Load More Events
          </Button>
        </div>
      </div>
    </div>
  )
}
