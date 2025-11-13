"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import { 
  Search, 
  Filter, 
  Star, 
  MessageSquare, 
  Calendar, 
  MapPin, 
  Briefcase, 
  GraduationCap,
  Award,
  Users,
  Clock,
  Globe,
  BookOpen,
  Lightbulb,
  Target,
  TrendingUp,
  Heart,
  ArrowRight,
  Plus,
  Eye,
  Phone,
  Video,
  Mail,
  DollarSign,
  Send,
  X,
  CheckCircle,
  AlertCircle,
  Shield,
  Eye as EyeIcon,
  SortAsc,
  SortDesc,
  RefreshCw,
  Download,
  Upload,
  Bell,
  LinkIcon,
  FileText,
  BarChart3,
  Zap,
  Settings,
  Lock,
  User,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Bookmark,
  Share2,
  PieChart,
  TrendingDown,
  Activity,
  Handshake,
  Target as TargetIcon,
  Zap as ZapIcon,
  Brain,
  Compass,
  Rocket,
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
  Sigma
} from "lucide-react"
import Link from "next/link"

// Mock data for mentors
const MOCK_MENTORS = [
  {
    id: "1",
    name: "Dr. Sarah Chen",
    title: "Former Google Engineering Director",
    company: "TechStart Ventures",
    location: "Singapore",
    expertise: ["AI/ML", "Product Strategy", "Scaling"],
    experience: "15+ years",
    rating: 4.9,
    sessions: 127,
    hourlyRate: "$500",
    availability: "Available",
    languages: ["English", "Mandarin"],
    education: "PhD Computer Science, Stanford",
            achievements: ["Built $2B ARR SaaS", "GrowthLab Mentor", "500+ Startups Advised"],
    bio: "Former Google engineering director with 15+ years of experience building and scaling technology companies. Expert in AI/ML, product strategy, and helping startups scale from 0 to 1000+ employees.",
    specialties: ["Technical Architecture", "Team Building", "Fundraising"],
    availabilitySlots: ["Mon 2-4pm", "Wed 10-12pm", "Fri 3-5pm"],
    isVerified: true,
    isPremium: true,
    avatar: "/confident-professional.png"
  },
  {
    id: "2",
    name: "Michael Rodriguez",
    title: "Serial Entrepreneur & Angel Investor",
    company: "Innovation Capital",
    location: "Singapore",
    expertise: ["Business Strategy", "Fundraising", "Market Entry"],
    experience: "12+ years",
    rating: 4.8,
    sessions: 89,
    hourlyRate: "$400",
    availability: "Available",
    languages: ["English", "Spanish"],
    education: "MBA, Harvard Business School",
    achievements: ["3 Successful Exits", "Angel Investor in 50+ Startups", "Forbes 30 Under 30"],
    bio: "Serial entrepreneur with 3 successful exits and angel investor in 50+ startups. Expert in business strategy, fundraising, and helping startups enter new markets successfully.",
    specialties: ["Business Model", "Pitch Decks", "Investor Relations"],
    availabilitySlots: ["Tue 1-3pm", "Thu 2-4pm", "Sat 10-12pm"],
    isVerified: true,
    isPremium: true,
    avatar: "/professional-connections.png"
  },
  {
    id: "3",
    name: "Dr. Priya Patel",
    title: "Healthcare Innovation Expert",
    company: "HealthTech Solutions",
    location: "Singapore",
    expertise: ["Healthcare Tech", "Regulatory Compliance", "Clinical Trials"],
    experience: "18+ years",
    rating: 4.7,
    sessions: 156,
    hourlyRate: "$600",
    availability: "Available",
    languages: ["English", "Hindi"],
    education: "MD, Johns Hopkins University",
    achievements: ["FDA Approvals", "Clinical Trial Design", "Healthcare Innovation Awards"],
    bio: "Healthcare innovation expert with 18+ years in medical technology. Specialized in regulatory compliance, clinical trials, and bringing healthcare products to market.",
    specialties: ["Regulatory Strategy", "Clinical Development", "Market Access"],
    availabilitySlots: ["Mon 3-5pm", "Wed 1-3pm", "Fri 2-4pm"],
    isVerified: true,
    isPremium: true,
    avatar: "/healthcare-professional.png"
  },
  {
    id: "4",
    name: "Alex Thompson",
    title: "Fintech & Payments Expert",
    company: "Digital Payments Inc",
    location: "Singapore",
    expertise: ["Fintech", "Payment Systems", "Compliance"],
    experience: "10+ years",
    rating: 4.6,
    sessions: 94,
    hourlyRate: "$450",
    availability: "Available",
    languages: ["English"],
    education: "MSc Finance, London School of Economics",
    achievements: ["Built $1B Payment Platform", "Regulatory Expert", "Fintech Innovation Award"],
    bio: "Fintech expert with deep experience in payment systems, regulatory compliance, and building scalable financial technology solutions.",
    specialties: ["Payment Infrastructure", "Regulatory Compliance", "Financial Modeling"],
    availabilitySlots: ["Tue 2-4pm", "Thu 10-12pm", "Sat 1-3pm"],
    isVerified: true,
    isPremium: false,
    avatar: "/fintech-expert.png"
  },
  {
    id: "5",
    name: "Lisa Wang",
    title: "Marketing & Growth Strategist",
    company: "Growth Marketing Pro",
    location: "Singapore",
    expertise: ["Digital Marketing", "Growth Hacking", "Brand Strategy"],
    experience: "8+ years",
    rating: 4.5,
    sessions: 203,
    hourlyRate: "$350",
    availability: "Available",
    languages: ["English", "Mandarin"],
    education: "MBA Marketing, INSEAD",
    achievements: ["10x Growth for 20+ Startups", "Marketing Innovation Award", "Top 100 Marketers"],
    bio: "Growth marketing expert who has helped 20+ startups achieve 10x growth. Specialized in digital marketing, growth hacking, and brand strategy.",
    specialties: ["Growth Strategy", "Digital Marketing", "Brand Building"],
    availabilitySlots: ["Mon 1-3pm", "Wed 3-5pm", "Fri 10-12pm"],
    isVerified: true,
    isPremium: false,
    avatar: "/marketing-expert.png"
  }
]

const EXPERTISE_OPTIONS = [
  "AI/ML", "Product Strategy", "Scaling", "Business Strategy", 
  "Fundraising", "Market Entry", "Healthcare Tech", "Regulatory Compliance",
  "Fintech", "Payment Systems", "Digital Marketing", "Growth Hacking",
  "Brand Strategy", "Technical Architecture", "Team Building"
]

const LOCATION_OPTIONS = ["Singapore", "Remote", "Asia Pacific", "Global"]

export default function MentorsPage() {
  const { toast } = useToast()
  const [mentors, setMentors] = useState(MOCK_MENTORS)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedExpertise, setSelectedExpertise] = useState<string>("")
  const [selectedLocation, setSelectedLocation] = useState<string>("")
  const [selectedExperience, setSelectedExperience] = useState<string>("")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedMentor, setSelectedMentor] = useState<any>(null)
  const [showMentorDetails, setShowMentorDetails] = useState(false)
  
  // Communication Hub Integration
  const [activeConversation, setActiveConversation] = useState<any>(null)
  const [conversations, setConversations] = useState<any[]>([])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  
  // User Profile
  const [hasMentorProfile, setHasMentorProfile] = useState(false)
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
    const profile = localStorage.getItem('mentorProfile')
    if (profile) {
      setHasMentorProfile(true)
      setUserProfile(JSON.parse(profile))
    }
  }, [])

  // Communication handlers
  const handleConnect = async (mentor: any) => {
    try {
      const conversation = {
        id: `conv-${mentor.id}`,
        participant: mentor,
        lastMessage: null,
        unreadCount: 0,
        createdAt: new Date(),
        status: 'connected',
        type: 'mentor'
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
        description: `Connection request sent to ${mentor.name}. Conversation started.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send connection request. Please try again.",
        variant: "destructive"
      })
    }
  }

  const handleMessage = async (mentor: any) => {
    try {
      const conversation = {
        id: `conv-${mentor.id}`,
        participant: mentor,
        lastMessage: null,
        unreadCount: 0,
        createdAt: new Date(),
        status: 'messaging',
        type: 'mentor'
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
        description: `Started conversation with ${mentor.name}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start conversation. Please try again.",
        variant: "destructive"
      })
    }
  }

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mentor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mentor.expertise.some(exp => exp.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesExpertise = !selectedExpertise || mentor.expertise.includes(selectedExpertise)
    const matchesLocation = !selectedLocation || mentor.location === selectedLocation
    const matchesExperience = !selectedExperience || mentor.experience.includes(selectedExperience)
    
    return matchesSearch && matchesExpertise && matchesLocation && matchesExperience
  })

  const handleBookSession = (mentor: any) => {
    // Handle booking logic
    console.log("Booking session with:", mentor.name)
  }

  const handleContact = (mentor: any) => {
    // Handle contact logic
    console.log("Contacting:", mentor.name)
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-green-600"
    if (rating >= 4.0) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-lg font-bold text-gray-900">Mentors</h1>
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

      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Desktop Header */}
        <div className="hidden lg:block mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-[#1E293B] mb-2">Find Your Perfect Mentor</h1>
              <p className="text-lg text-[#64748B]">
                Connect with experienced mentors who can guide your startup journey
              </p>
            </div>
            <Link href="/network/mentors/create-profile">
              <Button className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                <Plus className="h-4 w-4 mr-2" />
                Become a Mentor
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Description */}
        <div className="lg:hidden mb-6">
          <p className="text-gray-600 text-sm">
            Connect with experienced mentors who can guide your startup journey.
          </p>
        </div>

        {/* User's Mentor Profile Status */}
        {hasMentorProfile && userProfile && (
          <Card className="mb-8 bg-gradient-to-r from-[#0F7377] to-[#0F7377]/90 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-full">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Your Mentor Profile</h3>
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
                    onClick={() => window.location.href = '/network/mentors/create-profile'}
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
                  <p className="font-medium">Mentoring Style</p>
                  <p className="text-white/80">
                    {userProfile.mentoringStyle?.slice(0, 2).join(', ')}
                    {userProfile.mentoringStyle?.length > 2 && '...'}
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

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search mentors by name, expertise, or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="lg:w-auto"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <Select value={selectedExpertise} onValueChange={setSelectedExpertise}>
              <SelectTrigger>
                <SelectValue placeholder="Select Expertise" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Expertise</SelectItem>
                {EXPERTISE_OPTIONS.map(expertise => (
                  <SelectItem key={expertise} value={expertise}>{expertise}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Select Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Locations</SelectItem>
                {LOCATION_OPTIONS.map(location => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedExperience} onValueChange={setSelectedExperience}>
              <SelectTrigger>
                <SelectValue placeholder="Experience Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Experience</SelectItem>
                <SelectItem value="5+ years">5+ years</SelectItem>
                <SelectItem value="10+ years">10+ years</SelectItem>
                <SelectItem value="15+ years">15+ years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-[#0F7377]">{filteredMentors.length}</div>
              <div className="text-sm text-gray-600">Available Mentors</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-[#0F7377]">4.7</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-[#0F7377]">1,247</div>
              <div className="text-sm text-gray-600">Sessions Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-[#0F7377]">98%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mentors Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredMentors.map((mentor) => (
          <Card key={mentor.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={mentor.avatar} />
                                         <AvatarFallback>{mentor.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">{mentor.name}</h3>
                    <p className="text-sm text-gray-600">{mentor.title}</p>
                    <p className="text-xs text-gray-500">{mentor.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className={`h-4 w-4 ${getRatingColor(mentor.rating)} fill-current`} />
                  <span className="text-sm font-medium">{mentor.rating}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  {mentor.location}
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Briefcase className="h-4 w-4" />
                  {mentor.experience} experience
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  {mentor.sessions} sessions
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <DollarSign className="h-4 w-4" />
                  {mentor.hourlyRate}/hour
                </div>

                <div className="flex flex-wrap gap-1 mt-3">
                  {mentor.expertise.slice(0, 3).map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {mentor.expertise.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{mentor.expertise.length - 3} more
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <Badge 
                    variant={mentor.availability === "Available" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {mentor.availability}
                  </Badge>
                  {mentor.isVerified && (
                    <Badge variant="outline" className="text-xs">
                      Verified
                    </Badge>
                  )}
                  {mentor.isPremium && (
                    <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700">
                      Premium
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2 mt-4">
                  <Button 
                    size="sm" 
                    className="flex-1 bg-[#0F7377] hover:bg-[#0F7377]/90"
                    onClick={() => handleBookSession(mentor)}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Session
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleConnect(mentor)}
                    className="text-[#0F7377] border-[#0F7377] hover:bg-[#0F7377] hover:text-white"
                  >
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleMessage(mentor)}
                    className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      setSelectedMentor(mentor)
                      setShowMentorDetails(true)
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mentor Details Modal */}
      {showMentorDetails && selectedMentor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedMentor.avatar} />
                                         <AvatarFallback>{selectedMentor.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedMentor.name}</h2>
                    <p className="text-lg text-gray-600">{selectedMentor.title}</p>
                    <p className="text-gray-500">{selectedMentor.company}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMentorDetails(false)}
                >
                  ×
                </Button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">About</h3>
                  <p className="text-gray-600">{selectedMentor.bio}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedMentor.expertise.map((skill: string) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Achievements</h3>
                  <ul className="space-y-1">
                    {selectedMentor.achievements.map((achievement: string, index: number) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <Award className="h-4 w-4 text-yellow-600" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Availability</h3>
                  <div className="space-y-2">
                    {selectedMentor.availabilitySlots.map((slot: string, index: number) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        {slot}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t">
                  <Button 
                    className="flex-1 bg-[#0F7377] hover:bg-[#0F7377]/90"
                    onClick={() => handleBookSession(selectedMentor)}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Session
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* No Results */}
      {filteredMentors.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No mentors found</h3>
          <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
        </div>
      )}

      {/* Communication Hub Integration */}
      {activeConversation && (
        <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          {/* Conversation Header */}
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-[#0F7377] to-[#0F7377]/90 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <GraduationCap className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{activeConversation.participant.name}</h3>
                  <p className="text-xs text-white/80">{activeConversation.participant.title} • {activeConversation.participant.location}</p>
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
                    <GraduationCap className="h-3 w-3 text-[#0F7377]" />
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                    <p className="text-sm text-gray-700">
                      Hi! I'm interested in learning from your experience in {activeConversation.participant.expertise?.slice(0, 2).join(' and ')}. 
                      Could you tell me about your mentoring approach?
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Just now</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2 justify-end">
                  <div className="bg-[#0F7377] text-white rounded-lg p-3 max-w-xs">
                    <p className="text-sm">
                      Hello! I'd be happy to share my experience and help guide you. 
                      I typically focus on {activeConversation.participant.expertise?.slice(0, 2).join(' and ')} mentoring.
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
                    <GraduationCap className="h-4 w-4 text-[#0F7377]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {conversation.participant.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {conversation.participant.title} • {conversation.participant.location}
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
            <GraduationCap className="w-5 h-5 text-gray-600" />
            <span className="text-xs font-medium text-gray-600">Mentors</span>
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