"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft,
  Search,
  Filter,
  Building2,
  Users,
  Target,
  TrendingUp,
  DollarSign,
  BarChart3,
  Globe,
  Shield,
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
  Calendar,
  Clock,
  Mail,
  Send,
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
  MessageCircle,
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
  Share2,
  Bookmark,
  BookmarkCheck,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Phone,
  MapPin,
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
  ChevronUp,
  X
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function BusinessSupportPage() {
  const { toast } = useToast()
  const [isMobile, setIsMobile] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showConsultation, setShowConsultation] = useState(false)
  const [showResources, setShowResources] = useState(false)
  const [showMentors, setShowMentors] = useState(false)
  const [showEvents, setShowEvents] = useState(false)
  const [showCommunity, setShowCommunity] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const supportCategories = [
    { id: "all", name: "All Support", count: 156 },
    { id: "consulting", name: "Business Consulting", count: 45 },
    { id: "mentoring", name: "Mentoring", count: 32 },
    { id: "funding", name: "Funding Support", count: 28 },
    { id: "legal", name: "Legal Support", count: 25 },
    { id: "marketing", name: "Marketing", count: 18 },
    { id: "technology", name: "Technology", count: 8 }
  ]

  const supportServices = [
    {
      id: 1,
      title: "Business Strategy Consulting",
      description: "Get expert guidance on business strategy, market analysis, and growth planning from experienced consultants.",
      category: "consulting",
      type: "Consulting",
      duration: "1-3 months",
      price: "From $2,500/month",
      rating: 4.8,
      reviews: 124,
      provider: "GrowthLab Consulting",
      features: ["Market Analysis", "Business Planning", "Growth Strategy", "Financial Modeling"],
      status: "Available",
      isBookmarked: false
    },
    {
      id: 2,
      title: "Startup Mentoring Program",
      description: "Connect with successful entrepreneurs and industry experts for one-on-one mentoring sessions.",
      category: "mentoring",
      type: "Mentoring",
      duration: "6-12 months",
      price: "Free",
      rating: 4.9,
      reviews: 89,
      provider: "GrowthLab Mentors",
      features: ["1-on-1 Sessions", "Industry Expertise", "Network Access", "Ongoing Support"],
      status: "Available",
      isBookmarked: true
    },
    {
      id: 3,
      title: "Funding Application Support",
      description: "Get help with grant applications, investor pitches, and funding strategy development.",
      category: "funding",
      type: "Funding",
      duration: "2-4 weeks",
      price: "From $1,500",
      rating: 4.7,
      reviews: 67,
      provider: "GrowthLab Funding",
      features: ["Grant Writing", "Pitch Development", "Investor Relations", "Financial Planning"],
      status: "Available",
      isBookmarked: false
    },
    {
      id: 4,
      title: "Legal Compliance Support",
      description: "Ensure your business meets all legal requirements with expert legal guidance and documentation.",
      category: "legal",
      type: "Legal",
      duration: "1-2 weeks",
      price: "From $800",
      rating: 4.6,
      reviews: 43,
      provider: "GrowthLab Legal",
      features: ["Compliance Review", "Documentation", "Legal Advice", "Risk Assessment"],
      status: "Available",
      isBookmarked: false
    },
    {
      id: 5,
      title: "Digital Marketing Strategy",
      description: "Develop and implement comprehensive digital marketing strategies to grow your business online.",
      category: "marketing",
      type: "Marketing",
      duration: "3-6 months",
      price: "From $3,000/month",
      rating: 4.8,
      reviews: 91,
      provider: "GrowthLab Marketing",
      features: ["SEO/SEM", "Social Media", "Content Strategy", "Analytics"],
      status: "Available",
      isBookmarked: true
    },
    {
      id: 6,
      title: "Technology Implementation",
      description: "Get technical support for implementing business systems, software, and digital tools.",
      category: "technology",
      type: "Technology",
      duration: "2-8 weeks",
      price: "From $2,000",
      rating: 4.7,
      reviews: 56,
      provider: "GrowthLab Tech",
      features: ["System Setup", "Integration", "Training", "Support"],
      status: "Available",
      isBookmarked: false
    }
  ]

  const mentors = [
    {
      id: 1,
      name: "Sarah Chen",
      title: "Former VP of Product at Google",
      expertise: ["Product Management", "Scaling", "AI/ML"],
      experience: "15+ years",
      rating: 4.9,
      sessions: 234,
      availability: "Available",
      bio: "Experienced product leader with expertise in scaling tech companies and AI product development.",
      image: "/mentors/sarah-chen.jpg"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      title: "Serial Entrepreneur & Investor",
      expertise: ["Startups", "Fundraising", "Strategy"],
      experience: "20+ years",
      rating: 4.8,
      sessions: 189,
      availability: "Available",
      bio: "Founded 3 successful startups and invested in 50+ companies. Expert in fundraising and business strategy.",
      image: "/mentors/michael-rodriguez.jpg"
    },
    {
      id: 3,
      name: "Lisa Wang",
      title: "Marketing Director at Microsoft",
      expertise: ["Marketing", "Branding", "Growth"],
      experience: "12+ years",
      rating: 4.9,
      sessions: 156,
      availability: "Available",
      bio: "Marketing expert with experience in B2B and B2C growth strategies across multiple industries.",
      image: "/mentors/lisa-wang.jpg"
    }
  ]

  const resources = [
    {
      id: 1,
      title: "Business Plan Template",
      description: "Comprehensive business plan template with financial projections and market analysis.",
      type: "Template",
      category: "Planning",
      downloads: 1247,
      rating: 4.8,
      fileSize: "2.3 MB",
      format: "PDF"
    },
    {
      id: 2,
      title: "Funding Guide 2024",
      description: "Complete guide to funding options, grants, and investor relations for startups.",
      type: "Guide",
      category: "Funding",
      downloads: 892,
      rating: 4.7,
      fileSize: "5.1 MB",
      format: "PDF"
    },
    {
      id: 3,
      title: "Legal Checklist",
      description: "Essential legal requirements checklist for new businesses and startups.",
      type: "Checklist",
      category: "Legal",
      downloads: 567,
      rating: 4.6,
      fileSize: "1.2 MB",
      format: "PDF"
    }
  ]

  const events = [
    {
      id: 1,
      title: "Startup Funding Workshop",
      description: "Learn how to secure funding for your startup with expert guidance and networking opportunities.",
      date: "2024-02-15",
      time: "2:00 PM - 5:00 PM",
      location: "San Francisco, CA",
      type: "Workshop",
      attendees: 75,
      price: "Free",
      status: "Upcoming"
    },
    {
      id: 2,
      title: "Business Strategy Masterclass",
      description: "Master the fundamentals of business strategy and growth planning with industry experts.",
      date: "2024-02-20",
      time: "9:00 AM - 12:00 PM",
      location: "Virtual",
      type: "Masterclass",
      attendees: 150,
      price: "$99",
      status: "Upcoming"
    }
  ]

  const filteredServices = supportServices.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.features.some(feature => feature.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleBookService = (serviceId: number) => {
    toast({
      title: "Service Booked",
      description: "Your service booking has been confirmed. We'll contact you soon.",
    })
  }

  const handleBookmarkService = (serviceId: number) => {
    toast({
      title: "Service Bookmarked",
      description: "Service added to your bookmarks.",
    })
  }

  const handleBookMentor = (mentorId: number) => {
    toast({
      title: "Mentor Session Booked",
      description: "Your mentoring session has been scheduled. Details will be sent via email.",
    })
  }

  const handleDownloadResource = (resourceId: number) => {
    toast({
      title: "Resource Downloaded",
      description: "Resource download started successfully.",
    })
  }

  const handleRegisterEvent = (eventId: number) => {
    toast({
      title: "Event Registered",
      description: "You have been registered for the event. Confirmation details will be sent via email.",
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
                <Link href="/resources">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  {isMobile ? "" : "Back to Resources"}
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Business Support</h1>
                <p className="text-sm text-gray-600 hidden md:block">Comprehensive business support services</p>
              </div>
            </div>
            
            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowConsultation(true)}>
                <MessageCircle className="h-4 w-4 mr-2" />
                Book Consultation
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowResources(true)}>
                <FileText className="h-4 w-4 mr-2" />
                Resources
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowMentors(true)}>
                <Users className="h-4 w-4 mr-2" />
                Mentors
              </Button>
              <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90" onClick={() => setShowEvents(true)}>
                <Calendar className="h-4 w-4 mr-2" />
                Events
              </Button>
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowConsultation(true)}>
                <MessageCircle className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowMobileMenu(true)}>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
              <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90" onClick={() => setShowEvents(true)}>
                <Calendar className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Services</p>
                  <p className="text-2xl font-bold text-gray-900">24</p>
                </div>
                <div className="p-2 bg-[#0F7377]/10 rounded-lg">
                  <Building2 className="h-6 w-6 text-[#0F7377]" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Expert Mentors</p>
                  <p className="text-2xl font-bold text-gray-900">45</p>
                </div>
                <div className="p-2 bg-[#F59E0B]/10 rounded-lg">
                  <Users className="h-6 w-6 text-[#F59E0B]" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Resources</p>
                  <p className="text-2xl font-bold text-gray-900">156</p>
                </div>
                <div className="p-2 bg-green-100 rounded-lg">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Success Rate</p>
                  <p className="text-2xl font-bold text-gray-900">94%</p>
                </div>
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Trophy className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search business support services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {supportCategories.map((category) => (
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
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="mentors">Mentors</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Featured Services */}
              <Card>
                <CardHeader>
                  <CardTitle>Featured Services</CardTitle>
                  <CardDescription>Most popular business support services</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {supportServices.slice(0, 3).map((service) => (
                    <div key={service.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold">{service.title}</h4>
                        <p className="text-sm text-gray-600">{service.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <span>{service.type}</span>
                          <span>{service.duration}</span>
                          <span className="text-green-600">{service.price}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={service.status === 'Available' ? 'default' : 'secondary'}>
                          {service.status}
                        </Badge>
                        <Button variant="ghost" size="sm" onClick={() => handleBookService(service.id)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Upcoming Events */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>Business support workshops and events</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {events.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold">{event.title}</h4>
                        <p className="text-sm text-gray-600">{event.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <span>{event.date}</span>
                          <span>{event.time}</span>
                          <span>{event.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={event.status === 'Upcoming' ? 'default' : 'secondary'}>
                          {event.status}
                        </Badge>
                        <Button variant="ghost" size="sm" onClick={() => handleRegisterEvent(event.id)}>
                          <Calendar className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <Card key={service.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-[#0F7377] transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={service.status === 'Available' ? 'default' : 'secondary'}>
                          {service.status}
                        </Badge>
                        <Button variant="ghost" size="sm" onClick={() => handleBookmarkService(service.id)}>
                          {service.isBookmarked ? (
                            <BookmarkCheck className="h-4 w-4" />
                          ) : (
                            <Bookmark className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Provider</span>
                        <span>{service.provider}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Duration</span>
                        <span>{service.duration}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Price</span>
                        <span className="font-semibold text-green-600">{service.price}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Rating</span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span>{service.rating}</span>
                          <span>({service.reviews})</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {service.features.map((feature) => (
                        <Badge key={feature} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="space-y-2">
                      <Button 
                        size="sm" 
                        className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90"
                        onClick={() => handleBookService(service.id)}
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Book Service
                      </Button>
                      <div className="flex items-center justify-between">
                        <Button variant="outline" size="sm" className="flex-1 mr-2">
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Contact
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Mentors Tab */}
          <TabsContent value="mentors" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mentors.map((mentor) => (
                <Card key={mentor.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="w-16 h-16 bg-[#0F7377] rounded-full flex items-center justify-center">
                        <User className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg group-hover:text-[#0F7377] transition-colors">
                          {mentor.name}
                        </h3>
                        <p className="text-[#0F7377] font-medium">{mentor.title}</p>
                        <p className="text-gray-600 text-sm">{mentor.experience} experience</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 text-sm mb-4">{mentor.bio}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Rating</span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span>{mentor.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Sessions</span>
                        <span>{mentor.sessions}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Status</span>
                        <Badge variant={mentor.availability === 'Available' ? 'default' : 'secondary'}>
                          {mentor.availability}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {mentor.expertise.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="space-y-2">
                      <Button 
                        size="sm" 
                        className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90"
                        onClick={() => handleBookMentor(mentor.id)}
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Book Session
                      </Button>
                      <div className="flex items-center justify-between">
                        <Button variant="outline" size="sm" className="flex-1 mr-2">
                          <Eye className="h-4 w-4 mr-1" />
                          View Profile
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Message
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((resource) => (
                <Card key={resource.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-[#0F7377] transition-colors">
                          {resource.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
                      </div>
                      <Badge variant="outline">{resource.type}</Badge>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Category</span>
                        <span>{resource.category}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Downloads</span>
                        <span>{resource.downloads.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Rating</span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span>{resource.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>File Size</span>
                        <span>{resource.fileSize}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Button 
                        size="sm" 
                        className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90"
                        onClick={() => handleDownloadResource(resource.id)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <div className="flex items-center justify-between">
                        <Button variant="outline" size="sm" className="flex-1 mr-2">
                          <Eye className="h-4 w-4 mr-1" />
                          Preview
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
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
                <Button variant="outline" className="w-full justify-start" onClick={() => setShowConsultation(true)}>
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Book Consultation
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => setShowResources(true)}>
                  <FileText className="h-4 w-4 mr-2" />
                  Resources
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => setShowMentors(true)}>
                  <Users className="h-4 w-4 mr-2" />
                  Mentors
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => setShowEvents(true)}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Events
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
