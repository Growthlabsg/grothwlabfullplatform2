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
  Users,
  Star,
  Calendar,
  MessageCircle,
  Eye,
  Bookmark,
  BookmarkCheck,
  Award,
  Trophy,
  Medal,
  Crown,
  Gem,
  Sparkles,
  Target,
  TrendingUp,
  BarChart3,
  Building2,
  DollarSign,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Share2,
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
  MapPin,
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
  Clock,
  Mail,
  Send,
  Download,
  Upload,
  Plus,
  Edit,
  Trash2,
  X
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function MentorsPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedExpertise, setSelectedExpertise] = useState("all")
  const [selectedAvailability, setSelectedAvailability] = useState("all")
  const [sortBy, setSortBy] = useState("rating")
  const [showFilters, setShowFilters] = useState(false)

  const expertiseAreas = [
    { id: "all", name: "All Expertise", count: 45 },
    { id: "strategy", name: "Business Strategy", count: 12 },
    { id: "funding", name: "Fundraising", count: 8 },
    { id: "marketing", name: "Marketing", count: 10 },
    { id: "technology", name: "Technology", count: 6 },
    { id: "operations", name: "Operations", count: 5 },
    { id: "legal", name: "Legal", count: 4 }
  ]

  const mentors = [
    {
      id: 1,
      name: "Sarah Chen",
      title: "Former VP of Product at Google",
      company: "Google",
      experience: "15+ years",
      rating: 4.9,
      sessions: 234,
      availability: "Available",
      responseTime: "Within 2 hours",
      hourlyRate: "$300",
      bio: "Experienced product leader with expertise in scaling tech companies and AI product development. Led product teams at Google and helped scale multiple startups from seed to IPO.",
      expertise: ["Product Management", "Scaling", "AI/ML", "Leadership"],
      achievements: ["Led 50+ product launches", "Scaled team from 10 to 500+", "2 successful exits"],
      image: "/mentors/sarah-chen.jpg",
      isBookmarked: false,
      verified: true
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      title: "Serial Entrepreneur & Investor",
      company: "Multiple Startups",
      experience: "20+ years",
      rating: 4.8,
      sessions: 189,
      availability: "Available",
      responseTime: "Within 4 hours",
      hourlyRate: "$250",
      bio: "Founded 3 successful startups and invested in 50+ companies. Expert in fundraising, business strategy, and scaling operations. Currently managing a $100M venture fund.",
      expertise: ["Startups", "Fundraising", "Strategy", "Venture Capital"],
      achievements: ["3 successful exits", "Invested in 50+ companies", "$100M fund manager"],
      image: "/mentors/michael-rodriguez.jpg",
      isBookmarked: true,
      verified: true
    },
    {
      id: 3,
      name: "Lisa Wang",
      title: "Marketing Director at Microsoft",
      company: "Microsoft",
      experience: "12+ years",
      rating: 4.9,
      sessions: 156,
      availability: "Available",
      responseTime: "Within 3 hours",
      hourlyRate: "$200",
      bio: "Marketing expert with experience in B2B and B2C growth strategies across multiple industries. Led marketing teams at Microsoft and helped scale several startups.",
      expertise: ["Marketing", "Branding", "Growth", "Digital Strategy"],
      achievements: ["Led 100+ campaigns", "10x growth for 3 startups", "Award-winning campaigns"],
      image: "/mentors/lisa-wang.jpg",
      isBookmarked: false,
      verified: true
    },
    {
      id: 4,
      name: "David Kim",
      title: "CTO & Co-founder",
      company: "TechFlow",
      experience: "18+ years",
      rating: 4.7,
      sessions: 98,
      availability: "Limited",
      responseTime: "Within 6 hours",
      hourlyRate: "$350",
      bio: "Technology leader with expertise in building scalable systems and leading engineering teams. Co-founded TechFlow and led technical strategy for multiple startups.",
      expertise: ["Technology", "Engineering", "Architecture", "Team Building"],
      achievements: ["Built 10+ products", "Led 200+ engineers", "2 successful exits"],
      image: "/mentors/david-kim.jpg",
      isBookmarked: true,
      verified: true
    },
    {
      id: 5,
      name: "Jennifer Martinez",
      title: "Former CFO at Stripe",
      company: "Stripe",
      experience: "14+ years",
      rating: 4.8,
      sessions: 142,
      availability: "Available",
      responseTime: "Within 2 hours",
      hourlyRate: "$400",
      bio: "Financial executive with expertise in scaling finance operations and fundraising. Led finance teams at Stripe and helped multiple startups with financial strategy.",
      expertise: ["Finance", "Fundraising", "Operations", "Strategy"],
      achievements: ["Led $1B+ fundraising", "Scaled finance team 10x", "3 successful exits"],
      image: "/mentors/jennifer-martinez.jpg",
      isBookmarked: false,
      verified: true
    },
    {
      id: 6,
      name: "Robert Johnson",
      title: "Legal Partner",
      company: "TechLaw Partners",
      experience: "16+ years",
      rating: 4.6,
      sessions: 87,
      availability: "Available",
      responseTime: "Within 4 hours",
      hourlyRate: "$300",
      bio: "Legal expert specializing in startup law, IP protection, and corporate transactions. Helped 200+ startups with legal strategy and compliance.",
      expertise: ["Legal", "IP Protection", "Corporate Law", "Compliance"],
      achievements: ["200+ startups helped", "Expert in startup law", "Patent attorney"],
      image: "/mentors/robert-johnson.jpg",
      isBookmarked: false,
      verified: true
    }
  ]

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mentor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mentor.expertise.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesExpertise = selectedExpertise === "all" || mentor.expertise.some(skill => 
      expertiseAreas.find(area => area.id === selectedExpertise)?.name.toLowerCase().includes(skill.toLowerCase())
    )
    const matchesAvailability = selectedAvailability === "all" || 
      (selectedAvailability === "available" && mentor.availability === "Available")
    return matchesSearch && matchesExpertise && matchesAvailability
  })

  const handleBookMentor = (mentorId: number) => {
    toast({
      title: "Mentor Session Booked",
      description: "Your mentoring session has been scheduled. Details will be sent via email.",
    })
  }

  const handleBookmarkMentor = (mentorId: number) => {
    toast({
      title: "Mentor Bookmarked",
      description: "Mentor added to your bookmarks.",
    })
  }

  const handleMessageMentor = (mentorId: number) => {
    toast({
      title: "Message Sent",
      description: "Your message has been sent to the mentor.",
    })
  }

  const handleViewProfile = (mentorId: number) => {
    toast({
      title: "Opening Profile",
      description: "Loading mentor profile...",
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
                <Link href="/resources/business-support">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Business Support
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Expert Mentors</h1>
                <p className="text-sm text-gray-600">Connect with industry experts and successful entrepreneurs</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                <Plus className="h-4 w-4 mr-2" />
                Become a Mentor
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
              placeholder="Search mentors by name, expertise, or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white rounded-lg border">
              <div>
                <label className="text-sm font-medium text-gray-700">Expertise Area</label>
                <select
                  value={selectedExpertise}
                  onChange={(e) => setSelectedExpertise(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {expertiseAreas.map((area) => (
                    <option key={area.id} value={area.id}>
                      {area.name} ({area.count})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Availability</label>
                <select
                  value={selectedAvailability}
                  onChange={(e) => setSelectedAvailability(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Availability</option>
                  <option value="available">Available Now</option>
                  <option value="limited">Limited Availability</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="rating">Highest Rating</option>
                  <option value="sessions">Most Sessions</option>
                  <option value="rate">Lowest Rate</option>
                  <option value="response">Fastest Response</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor) => (
            <Card key={mentor.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-[#0F7377] rounded-full flex items-center justify-center relative">
                      <User className="h-8 w-8 text-white" />
                      {mentor.verified && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg group-hover:text-[#0F7377] transition-colors">
                        {mentor.name}
                      </h3>
                      <p className="text-[#0F7377] font-medium text-sm">{mentor.title}</p>
                      <p className="text-gray-600 text-sm">{mentor.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={mentor.availability === 'Available' ? 'default' : 'secondary'}>
                      {mentor.availability}
                    </Badge>
                    <Button variant="ghost" size="sm" onClick={() => handleBookmarkMentor(mentor.id)}>
                      {mentor.isBookmarked ? (
                        <BookmarkCheck className="h-4 w-4" />
                      ) : (
                        <Bookmark className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                
                <p className="text-gray-700 text-sm mb-4 line-clamp-3">{mentor.bio}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Rating</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span>{mentor.rating}</span>
                      <span>({mentor.sessions} sessions)</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Response Time</span>
                    <span>{mentor.responseTime}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Hourly Rate</span>
                    <span className="font-semibold text-green-600">{mentor.hourlyRate}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Experience</span>
                    <span>{mentor.experience}</span>
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
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewProfile(mentor.id)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Profile
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleMessageMentor(mentor.id)}
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Message
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            <RefreshCw className="h-4 w-4 mr-2" />
            Load More Mentors
          </Button>
        </div>
      </div>
    </div>
  )
}
