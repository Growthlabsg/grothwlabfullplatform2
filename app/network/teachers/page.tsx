"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import {
  Search,
  Filter,
  Star,
  MessageSquare,
  Calendar,
  MapPin,
  Users,
  Clock,
  DollarSign,
  Eye,
  Plus,
  Upload,
  Download,
  FileText,
  Video as VideoIcon,
  Send,
  X,
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
  Lightbulb,
  Target as TargetIcon,
  Zap as ZapIcon,
  GraduationCap,
  BookOpen,
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
  ArrowRight,
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
  Book,
  PenTool,
  Pencil,
  Eraser,
  Highlighter,
  Ruler as RulerIcon,
  Calculator,
  Microscope,
  FlaskConical,
  Atom,
  Dna,
  TestTube,
  Beaker,
  Flask,
  Pipette,
  Thermometer,
  Gauge,
  BarChart,
  LineChart,
  PieChart as PieChartIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
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
  Ruler as RulerIcon2,
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

// Mock data for teachers
const MOCK_TEACHERS = [
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
    bio: "Former Google engineering director with 15+ years of experience building and scaling technology companies.",
    isVerified: true,
    isPremium: true,
    avatar: "/confident-professional.png",
    resources: [
      {
        id: "1",
        title: "AI Startup Scaling Guide",
        type: "PDF",
        size: "2.3MB",
        downloads: 156,
        rating: 4.8,
        description: "Comprehensive guide for AI startups on scaling from 0 to 1000+ users"
      }
    ]
  },
  {
    id: "2",
    name: "Prof. Michael Rodriguez",
    title: "Business Strategy Professor",
    company: "Singapore Management University",
    location: "Singapore",
    expertise: ["Business Strategy", "Market Entry", "Growth Hacking"],
    experience: "12+ years",
    rating: 4.7,
    sessions: 89,
    hourlyRate: "$400",
    availability: "Available",
    bio: "Professor of Business Strategy with extensive experience in helping startups develop competitive strategies.",
    isVerified: true,
    isPremium: false,
    avatar: "/business-professor.png",
    resources: [
      {
        id: "2",
        title: "Market Entry Strategy Template",
        type: "PDF",
        size: "1.8MB",
        downloads: 203,
        rating: 4.7,
        description: "Complete template for developing market entry strategies"
      }
    ]
  }
]

export default function TeachersPage() {
  const { toast } = useToast()
  const [teachers, setTeachers] = useState(MOCK_TEACHERS)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null)
  const [showTeacherDetails, setShowTeacherDetails] = useState(false)
  const [activeTab, setActiveTab] = useState("teachers")
  
  // Communication Hub Integration
  const [activeConversation, setActiveConversation] = useState<any>(null)
  const [conversations, setConversations] = useState<any[]>([])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  
  // User Profile
  const [hasTeacherProfile, setHasTeacherProfile] = useState(false)
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
    const profile = localStorage.getItem('teacherProfile')
    if (profile) {
      setHasTeacherProfile(true)
      setUserProfile(JSON.parse(profile))
    }
  }, [])

  // Communication handlers
  const handleConnect = async (teacher: any) => {
    try {
      const conversation = {
        id: `conv-${teacher.id}`,
        participant: teacher,
        lastMessage: null,
        unreadCount: 0,
        createdAt: new Date(),
        status: 'connected',
        type: 'teacher'
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
        description: `Connection request sent to ${teacher.name}. Conversation started.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send connection request. Please try again.",
        variant: "destructive"
      })
    }
  }

  const handleMessage = async (teacher: any) => {
    try {
      const conversation = {
        id: `conv-${teacher.id}`,
        participant: teacher,
        lastMessage: null,
        unreadCount: 0,
        createdAt: new Date(),
        status: 'messaging',
        type: 'teacher'
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
        description: `Started conversation with ${teacher.name}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start conversation. Please try again.",
        variant: "destructive"
      })
    }
  }

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.expertise.some(exp => exp.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const handleBookSession = (teacher: any) => {
    console.log("Booking session with:", teacher.name)
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
            <h1 className="text-lg font-bold text-gray-900">Teachers</h1>
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
              <h1 className="text-3xl font-bold text-[#1E293B] mb-2">Network Teachers</h1>
              <p className="text-lg text-[#64748B]">
                Connect with expert teachers who volunteer to educate startup founders
              </p>
            </div>
            <Link href="/network/teachers/create-profile">
              <Button className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                <Plus className="h-4 w-4 mr-2" />
                Become a Teacher
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Description */}
        <div className="lg:hidden mb-6">
          <p className="text-gray-600 text-sm">
            Connect with expert teachers who volunteer to educate startup founders.
          </p>
        </div>

        {/* User's Teacher Profile Status */}
        {hasTeacherProfile && userProfile && (
          <Card className="mb-8 bg-gradient-to-r from-[#0F7377] to-[#0F7377]/90 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-full">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Your Teacher Profile</h3>
                    <p className="text-white/80 text-sm">
                      {userProfile.firstName} {userProfile.lastName} • {userProfile.institution}
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
                    onClick={() => window.location.href = '/network/teachers/create-profile'}
                  >
                    Edit Profile
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-medium">Subject Areas</p>
                  <p className="text-white/80">
                    {userProfile.subjectAreas?.slice(0, 3).join(', ')}
                    {userProfile.subjectAreas?.length > 3 && '...'}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Teaching Methods</p>
                  <p className="text-white/80">
                    {userProfile.teachingMethods?.slice(0, 2).join(', ')}
                    {userProfile.teachingMethods?.length > 2 && '...'}
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

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="teachers">Teachers Directory</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="forum">Forum</TabsTrigger>
          </TabsList>

          {/* Teachers Tab */}
          <TabsContent value="teachers" className="space-y-6">
            {/* Search */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search teachers by name, expertise, or company..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-[#0F7377]">{filteredTeachers.length}</div>
                  <div className="text-sm text-gray-600">Available Teachers</div>
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

            {/* Teachers Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredTeachers.map((teacher) => (
                <Card key={teacher.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={teacher.avatar} />
                          <AvatarFallback>{teacher.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-lg">{teacher.name}</h3>
                          <p className="text-sm text-gray-600">{teacher.title}</p>
                          <p className="text-xs text-gray-500">{teacher.company}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className={`h-4 w-4 ${getRatingColor(teacher.rating)} fill-current`} />
                        <span className="text-sm font-medium">{teacher.rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        {teacher.location}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        {teacher.sessions} sessions
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <DollarSign className="h-4 w-4" />
                        {teacher.hourlyRate}/hour
                      </div>

                      <div className="flex flex-wrap gap-1 mt-3">
                        {teacher.expertise.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {teacher.expertise.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{teacher.expertise.length - 3} more
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-2 mt-4">
                        <Badge
                          variant={teacher.availability === "Available" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {teacher.availability}
                        </Badge>
                        {teacher.isVerified && (
                          <Badge variant="outline" className="text-xs">
                            Verified
                          </Badge>
                        )}
                        {teacher.isPremium && (
                          <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700">
                            Premium
                          </Badge>
                        )}
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button
                          size="sm"
                          className="flex-1 bg-[#0F7377] hover:bg-[#0F7377]/90"
                          onClick={() => handleBookSession(teacher)}
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          Book Session
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleConnect(teacher)}
                          className="text-[#0F7377] border-[#0F7377] hover:bg-[#0F7377] hover:text-white"
                        >
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleMessage(teacher)}
                          className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedTeacher(teacher)
                            setShowTeacherDetails(true)
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

            {/* No Results */}
            {filteredTeachers.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No teachers found</h3>
                <p className="text-gray-500">Try adjusting your search criteria.</p>
              </div>
            )}
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#1E293B]">Educational Resources</h2>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Share Resource
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {teachers.flatMap(teacher => teacher.resources).map((resource) => (
                <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          {resource.type === "PDF" ? (
                            <FileText className="h-6 w-6 text-blue-600" />
                          ) : (
                            <VideoIcon className="h-6 w-6 text-blue-600" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{resource.title}</h3>
                          <p className="text-sm text-gray-600">{resource.size}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{resource.rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Download className="h-4 w-4" />
                        {resource.downloads} downloads
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Forum Tab */}
          <TabsContent value="forum" className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#1E293B]">Teacher-Student Forum</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Button>
            </div>

            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Forum Coming Soon</h3>
              <p className="text-gray-500">Interactive forum for teachers and students to discuss startup topics.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Teacher Details Modal */}
      {showTeacherDetails && selectedTeacher && (
        <Dialog open={showTeacherDetails} onOpenChange={setShowTeacherDetails}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={selectedTeacher.avatar} />
                  <AvatarFallback>{selectedTeacher.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold">{selectedTeacher.name}</h2>
                  <p className="text-lg text-gray-600">{selectedTeacher.title}</p>
                </div>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">About</h3>
                <p className="text-gray-600">{selectedTeacher.bio}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedTeacher.expertise.map((skill: string) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Button
                  className="flex-1 bg-[#0F7377] hover:bg-[#0F7377]/90"
                  onClick={() => handleBookSession(selectedTeacher)}
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
          </DialogContent>
        </Dialog>
      )}

      {/* Communication Hub Integration */}
      {activeConversation && (
        <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          {/* Conversation Header */}
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-[#0F7377] to-[#0F7377]/90 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <BookOpen className="h-4 w-4" />
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
                    <BookOpen className="h-3 w-3 text-[#0F7377]" />
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                    <p className="text-sm text-gray-700">
                      Hi! I'm interested in learning about {activeConversation.participant.expertise?.slice(0, 2).join(' and ')}. 
                      Could you tell me about your teaching approach?
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Just now</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2 justify-end">
                  <div className="bg-[#0F7377] text-white rounded-lg p-3 max-w-xs">
                    <p className="text-sm">
                      Hello! I'd be happy to help you learn. 
                      I typically focus on {activeConversation.participant.expertise?.slice(0, 2).join(' and ')} education.
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
                    <BookOpen className="h-4 w-4 text-[#0F7377]" />
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
            <BookOpen className="w-5 h-5 text-gray-600" />
            <span className="text-xs font-medium text-gray-600">Teachers</span>
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