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
  Lightbulb,
  Zap,
  Rocket,
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
  Share2,
  Bookmark,
  BookmarkCheck,
  ThumbsUp,
  ThumbsDown,
  Globe,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  BookOpen,
  Database,
  Server,
  Cloud,
  Wifi,
  WifiOff,
  FileText,
  Image,
  Video,
  Link as LinkIcon,
  ChevronUp,
  X,
  Users,
  MessageCircle as MessageCircleIcon
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function InnovationPage() {
  const { toast } = useToast()
  const [isMobile, setIsMobile] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showInnovationLab, setShowInnovationLab] = useState(false)
  const [showChallenges, setShowChallenges] = useState(false)
  const [showIdeas, setShowIdeas] = useState(false)
  const [showCollaboration, setShowCollaboration] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const innovationCategories = [
    { id: "all", name: "All Innovation", count: 89 },
    { id: "ai-ml", name: "AI & Machine Learning", count: 23 },
    { id: "blockchain", name: "Blockchain", count: 15 },
    { id: "iot", name: "IoT & Hardware", count: 18 },
    { id: "biotech", name: "Biotech & Health", count: 12 },
    { id: "fintech", name: "Fintech", count: 10 },
    { id: "cleantech", name: "Clean Tech", count: 8 },
    { id: "other", name: "Other", count: 3 }
  ]

  const innovationProjects = [
    {
      id: 1,
      title: "AI-Powered Customer Service Platform",
      description: "Revolutionary AI platform that provides 24/7 customer support with human-like interactions and multilingual capabilities.",
      category: "ai-ml",
      type: "Platform",
      stage: "MVP",
      funding: "$2.5M",
      team: 12,
      rating: 4.8,
      views: 1247,
      likes: 89,
      status: "Active",
      isBookmarked: false,
      tags: ["AI", "Customer Service", "NLP", "Automation"],
      founder: "Sarah Chen",
      company: "TechFlow AI",
      timeline: "6 months",
      market: "Global",
      impact: "High",
      innovation: "Breakthrough"
    },
    {
      id: 2,
      title: "Blockchain Supply Chain Tracker",
      description: "Transparent and immutable supply chain tracking system using blockchain technology to ensure product authenticity and traceability.",
      category: "blockchain",
      type: "Platform",
      stage: "Beta",
      funding: "$1.8M",
      team: 8,
      rating: 4.6,
      views: 892,
      likes: 67,
      status: "Active",
      isBookmarked: true,
      tags: ["Blockchain", "Supply Chain", "Transparency", "Traceability"],
      founder: "Michael Rodriguez",
      company: "ChainTrack",
      timeline: "4 months",
      market: "Global",
      impact: "Medium",
      innovation: "Disruptive"
    },
    {
      id: 3,
      title: "Smart City IoT Network",
      description: "Comprehensive IoT network for smart cities with real-time data collection, analysis, and automated response systems.",
      category: "iot",
      type: "Infrastructure",
      stage: "Pilot",
      funding: "$3.2M",
      team: 15,
      rating: 4.7,
      views: 1567,
      likes: 123,
      status: "Active",
      isBookmarked: false,
      tags: ["IoT", "Smart Cities", "Data Analytics", "Automation"],
      founder: "Lisa Wang",
      company: "SmartCity Solutions",
      timeline: "8 months",
      market: "Urban",
      impact: "High",
      innovation: "Transformative"
    },
    {
      id: 4,
      title: "Personalized Medicine AI",
      description: "AI-driven personalized medicine platform that analyzes genetic data to recommend optimal treatment plans for patients.",
      category: "biotech",
      type: "Platform",
      stage: "Research",
      funding: "$4.1M",
      team: 20,
      rating: 4.9,
      views: 2134,
      likes: 156,
      status: "Active",
      isBookmarked: true,
      tags: ["AI", "Medicine", "Genetics", "Personalization"],
      founder: "Dr. Jennifer Martinez",
      company: "MedAI Labs",
      timeline: "12 months",
      market: "Healthcare",
      impact: "Very High",
      innovation: "Revolutionary"
    },
    {
      id: 5,
      title: "Decentralized Finance Protocol",
      description: "Next-generation DeFi protocol with advanced yield farming, lending, and trading capabilities built on Ethereum.",
      category: "fintech",
      type: "Protocol",
      stage: "Live",
      funding: "$5.5M",
      team: 18,
      rating: 4.5,
      views: 1876,
      likes: 98,
      status: "Active",
      isBookmarked: false,
      tags: ["DeFi", "Ethereum", "Yield Farming", "Trading"],
      founder: "David Kim",
      company: "DeFiMax",
      timeline: "10 months",
      market: "Global",
      impact: "High",
      innovation: "Disruptive"
    },
    {
      id: 6,
      title: "Carbon Capture Technology",
      description: "Innovative carbon capture and storage technology that removes CO2 from the atmosphere at scale using renewable energy.",
      category: "cleantech",
      type: "Technology",
      stage: "Prototype",
      funding: "$6.8M",
      team: 25,
      rating: 4.8,
      views: 2341,
      likes: 187,
      status: "Active",
      isBookmarked: true,
      tags: ["Carbon Capture", "Climate", "Renewable Energy", "Sustainability"],
      founder: "Dr. Robert Johnson",
      company: "CleanAir Tech",
      timeline: "18 months",
      market: "Global",
      impact: "Very High",
      innovation: "Breakthrough"
    }
  ]

  const innovationChallenges = [
    {
      id: 1,
      title: "Climate Change Solutions",
      description: "Develop innovative solutions to combat climate change and promote environmental sustainability.",
      category: "cleantech",
      prize: "$100,000",
      participants: 156,
      deadline: "2024-06-30",
      status: "Active",
      difficulty: "Hard",
      tags: ["Climate", "Sustainability", "Environment"]
    },
    {
      id: 2,
      title: "Healthcare Accessibility",
      description: "Create solutions to improve healthcare access in underserved communities worldwide.",
      category: "biotech",
      prize: "$75,000",
      participants: 89,
      deadline: "2024-05-15",
      status: "Active",
      difficulty: "Medium",
      tags: ["Healthcare", "Accessibility", "Social Impact"]
    },
    {
      id: 3,
      title: "AI for Good",
      description: "Develop AI solutions that address social challenges and benefit humanity.",
      category: "ai-ml",
      prize: "$50,000",
      participants: 234,
      deadline: "2024-04-20",
      status: "Active",
      difficulty: "Medium",
      tags: ["AI", "Social Impact", "Ethics"]
    }
  ]

  const innovationIdeas = [
    {
      id: 1,
      title: "Virtual Reality Therapy Platform",
      description: "VR-based therapy platform for mental health treatment with immersive experiences and AI-guided sessions.",
      category: "ai-ml",
      votes: 45,
      comments: 12,
      author: "Alex Chen",
      status: "Idea",
      tags: ["VR", "Mental Health", "AI", "Therapy"]
    },
    {
      id: 2,
      title: "Quantum Computing Cloud Service",
      description: "Cloud-based quantum computing service for researchers and businesses to access quantum power.",
      category: "other",
      votes: 67,
      comments: 18,
      author: "Maria Garcia",
      status: "Idea",
      tags: ["Quantum Computing", "Cloud", "Research"]
    },
    {
      id: 3,
      title: "Autonomous Drone Delivery Network",
      description: "Network of autonomous drones for last-mile delivery in urban and rural areas.",
      category: "iot",
      votes: 34,
      comments: 8,
      author: "James Wilson",
      status: "Idea",
      tags: ["Drones", "Delivery", "Autonomous", "Logistics"]
    }
  ]

  const filteredProjects = innovationProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleViewProject = (projectId: number) => {
    toast({
      title: "Opening Project",
      description: "Loading project details...",
    })
  }

  const handleBookmarkProject = (projectId: number) => {
    toast({
      title: "Project Bookmarked",
      description: "Project added to your bookmarks.",
    })
  }

  const handleLikeProject = (projectId: number) => {
    toast({
      title: "Project Liked",
      description: "Thank you for your support!",
    })
  }

  const handleShareProject = (projectId: number) => {
    toast({
      title: "Project Shared",
      description: "Project link copied to clipboard.",
    })
  }

  const handleJoinChallenge = (challengeId: number) => {
    toast({
      title: "Challenge Joined",
      description: "You have successfully joined the challenge!",
    })
  }

  const handleVoteIdea = (ideaId: number) => {
    toast({
      title: "Idea Voted",
      description: "Your vote has been recorded.",
    })
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "ai-ml":
        return <Zap className="h-5 w-5 text-blue-500" />
      case "blockchain":
        return <Link2 className="h-5 w-5 text-purple-500" />
      case "iot":
        return <Wifi className="h-5 w-5 text-green-500" />
      case "biotech":
        return <Heart className="h-5 w-5 text-red-500" />
      case "fintech":
        return <DollarSign className="h-5 w-5 text-yellow-500" />
      case "cleantech":
        return <Globe className="h-5 w-5 text-emerald-500" />
      default:
        return <Lightbulb className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Completed":
        return "bg-gray-100 text-gray-800"
      case "Paused":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getInnovationLevel = (innovation: string) => {
    switch (innovation) {
      case "Revolutionary":
        return "bg-red-100 text-red-800"
      case "Breakthrough":
        return "bg-orange-100 text-orange-800"
      case "Disruptive":
        return "bg-yellow-100 text-yellow-800"
      case "Transformative":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
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
                <Link href="/resources">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  {isMobile ? "" : "Back to Resources"}
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Innovation Hub</h1>
                <p className="text-sm text-gray-600 hidden md:block">Discover, create, and collaborate on innovative projects</p>
              </div>
            </div>
            
            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowInnovationLab(true)}>
                <Rocket className="h-4 w-4 mr-2" />
                Innovation Lab
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowChallenges(true)}>
                <Target className="h-4 w-4 mr-2" />
                Challenges
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowIdeas(true)}>
                <Lightbulb className="h-4 w-4 mr-2" />
                Ideas
              </Button>
              <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90" onClick={() => setShowCollaboration(true)}>
                <Users className="h-4 w-4 mr-2" />
                Collaborate
              </Button>
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowInnovationLab(true)}>
                <Rocket className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowMobileMenu(true)}>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
              <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90" onClick={() => setShowCollaboration(true)}>
                <Users className="h-4 w-4" />
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
                  <p className="text-sm text-gray-600">Active Projects</p>
                  <p className="text-2xl font-bold text-gray-900">89</p>
                </div>
                <div className="p-2 bg-[#0F7377]/10 rounded-lg">
                  <Rocket className="h-6 w-6 text-[#0F7377]" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Innovation Challenges</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
                <div className="p-2 bg-[#F59E0B]/10 rounded-lg">
                  <Target className="h-6 w-6 text-[#F59E0B]" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Ideas Submitted</p>
                  <p className="text-2xl font-bold text-gray-900">234</p>
                </div>
                <div className="p-2 bg-green-100 rounded-lg">
                  <Lightbulb className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Collaborators</p>
                  <p className="text-2xl font-bold text-gray-900">1,247</p>
                </div>
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="h-6 w-6 text-purple-600" />
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
              placeholder="Search innovative projects, ideas, and challenges..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {innovationCategories.map((category) => (
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
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="ideas">Ideas</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Featured Projects */}
              <Card>
                <CardHeader>
                  <CardTitle>Featured Projects</CardTitle>
                  <CardDescription>Most innovative and trending projects</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {innovationProjects.slice(0, 3).map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getCategoryIcon(project.category)}
                        <div className="flex-1">
                          <h4 className="font-semibold">{project.title}</h4>
                          <p className="text-sm text-gray-600">{project.description}</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                            <span>{project.stage}</span>
                            <span>{project.funding}</span>
                            <span>{project.team} team</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                        <Button variant="ghost" size="sm" onClick={() => handleViewProject(project.id)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Active Challenges */}
              <Card>
                <CardHeader>
                  <CardTitle>Active Challenges</CardTitle>
                  <CardDescription>Join innovation challenges and win prizes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {innovationChallenges.map((challenge) => (
                    <div key={challenge.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold">{challenge.title}</h4>
                        <p className="text-sm text-gray-600">{challenge.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <span>Prize: {challenge.prize}</span>
                          <span>{challenge.participants} participants</span>
                          <span>Deadline: {challenge.deadline}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{challenge.difficulty}</Badge>
                        <Button variant="ghost" size="sm" onClick={() => handleJoinChallenge(challenge.id)}>
                          <Target className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {getCategoryIcon(project.category)}
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg group-hover:text-[#0F7377] transition-colors">
                            {project.title}
                          </h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {project.type}
                            </Badge>
                            <Badge className={getStatusColor(project.status)}>
                              {project.status}
                            </Badge>
                            <Badge className={getInnovationLevel(project.innovation)}>
                              {project.innovation}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleBookmarkProject(project.id)}>
                          {project.isBookmarked ? (
                            <BookmarkCheck className="h-4 w-4" />
                          ) : (
                            <Bookmark className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 text-sm mb-4 line-clamp-3">{project.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Stage</span>
                        <span>{project.stage}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Funding</span>
                        <span className="font-semibold text-green-600">{project.funding}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Team Size</span>
                        <span>{project.team} members</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Timeline</span>
                        <span>{project.timeline}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Rating</span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span>{project.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="space-y-2">
                      <Button 
                        size="sm" 
                        className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90"
                        onClick={() => handleViewProject(project.id)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Project
                      </Button>
                      <div className="grid grid-cols-3 gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleLikeProject(project.id)}
                        >
                          <Heart className="h-4 w-4 mr-1" />
                          {project.likes}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleShareProject(project.id)}
                        >
                          <Share2 className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                        >
                          <MessageCircleIcon className="h-4 w-4 mr-1" />
                          Discuss
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Challenges Tab */}
          <TabsContent value="challenges" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {innovationChallenges.map((challenge) => (
                <Card key={challenge.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg group-hover:text-[#0F7377] transition-colors">
                          {challenge.title}
                        </h3>
                        <p className="text-gray-700 text-sm mb-3">{challenge.description}</p>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {challenge.category}
                          </Badge>
                          <Badge className={getStatusColor(challenge.status)}>
                            {challenge.status}
                          </Badge>
                          <Badge variant="secondary">
                            {challenge.difficulty}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Prize</span>
                        <span className="font-semibold text-green-600">{challenge.prize}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Participants</span>
                        <span>{challenge.participants}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Deadline</span>
                        <span>{challenge.deadline}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {challenge.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="space-y-2">
                      <Button 
                        size="sm" 
                        className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90"
                        onClick={() => handleJoinChallenge(challenge.id)}
                      >
                        <Target className="h-4 w-4 mr-2" />
                        Join Challenge
                      </Button>
                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Details
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
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

          {/* Ideas Tab */}
          <TabsContent value="ideas" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {innovationIdeas.map((idea) => (
                <Card key={idea.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg group-hover:text-[#0F7377] transition-colors">
                          {idea.title}
                        </h3>
                        <p className="text-gray-700 text-sm mb-3">{idea.description}</p>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {idea.category}
                          </Badge>
                          <Badge className="bg-blue-100 text-blue-800">
                            {idea.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Author</span>
                        <span>{idea.author}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Votes</span>
                        <span>{idea.votes}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Comments</span>
                        <span>{idea.comments}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {idea.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="space-y-2">
                      <Button 
                        size="sm" 
                        className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90"
                        onClick={() => handleVoteIdea(idea.id)}
                      >
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        Vote for Idea
                      </Button>
                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Details
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                        >
                          <MessageCircleIcon className="h-4 w-4 mr-1" />
                          Comment
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
                <Button variant="outline" className="w-full justify-start" onClick={() => setShowInnovationLab(true)}>
                  <Rocket className="h-4 w-4 mr-2" />
                  Innovation Lab
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => setShowChallenges(true)}>
                  <Target className="h-4 w-4 mr-2" />
                  Challenges
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => setShowIdeas(true)}>
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Ideas
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => setShowCollaboration(true)}>
                  <Users className="h-4 w-4 mr-2" />
                  Collaborate
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
