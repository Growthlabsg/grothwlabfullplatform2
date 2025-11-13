"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft,
  Target,
  Search,
  Filter,
  Trophy,
  Award,
  Medal,
  Crown,
  Gem,
  Sparkles,
  Star,
  Heart,
  Eye,
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
  Rocket,
  TrendingUp,
  BarChart3,
  Building2,
  DollarSign,
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

export default function ChallengesPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("active")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  const categories = [
    { id: "all", name: "All Categories", count: 24 },
    { id: "ai-ml", name: "AI & Machine Learning", count: 8 },
    { id: "blockchain", name: "Blockchain", count: 5 },
    { id: "iot", name: "IoT & Hardware", count: 4 },
    { id: "biotech", name: "Biotech & Health", count: 3 },
    { id: "fintech", name: "Fintech", count: 2 },
    { id: "cleantech", name: "Clean Tech", count: 2 }
  ]

  const difficulties = [
    { id: "all", name: "All Levels", count: 24 },
    { id: "easy", name: "Easy", count: 8 },
    { id: "medium", name: "Medium", count: 10 },
    { id: "hard", name: "Hard", count: 6 }
  ]

  const challenges = [
    {
      id: 1,
      title: "Climate Change Solutions Challenge",
      description: "Develop innovative solutions to combat climate change and promote environmental sustainability. Focus on carbon reduction, renewable energy, or sustainable practices.",
      category: "cleantech",
      difficulty: "Hard",
      prize: "$100,000",
      participants: 156,
      deadline: "2024-06-30",
      status: "Active",
      isBookmarked: false,
      isJoined: false,
      organizer: "GreenTech Foundation",
      tags: ["Climate", "Sustainability", "Environment", "Innovation"],
      requirements: [
        "Working prototype or detailed technical proposal",
        "Environmental impact assessment",
        "Scalability analysis",
        "Team of 2-5 members"
      ],
      timeline: "6 months",
      judgingCriteria: [
        "Innovation and creativity (30%)",
        "Environmental impact (25%)",
        "Technical feasibility (20%)",
        "Market potential (15%)",
        "Scalability (10%)"
      ],
      resources: [
        "Technical mentorship",
        "Access to lab facilities",
        "Networking events",
        "Pitch training"
      ]
    },
    {
      id: 2,
      title: "Healthcare Accessibility Innovation",
      description: "Create solutions to improve healthcare access in underserved communities worldwide. Focus on telemedicine, mobile health, or diagnostic tools.",
      category: "biotech",
      difficulty: "Medium",
      prize: "$75,000",
      participants: 89,
      deadline: "2024-05-15",
      status: "Active",
      isBookmarked: true,
      isJoined: true,
      organizer: "HealthTech Initiative",
      tags: ["Healthcare", "Accessibility", "Social Impact", "Telemedicine"],
      requirements: [
        "Functional prototype or MVP",
        "User testing results",
        "Implementation plan",
        "Partnership with healthcare provider"
      ],
      timeline: "4 months",
      judgingCriteria: [
        "Impact on underserved communities (35%)",
        "Technical innovation (25%)",
        "Usability and accessibility (20%)",
        "Scalability and sustainability (20%)"
      ],
      resources: [
        "Healthcare expert mentors",
        "User testing support",
        "Regulatory guidance",
        "Pilot program opportunities"
      ]
    },
    {
      id: 3,
      title: "AI for Good Challenge",
      description: "Develop AI solutions that address social challenges and benefit humanity. Focus on education, poverty alleviation, or social justice.",
      category: "ai-ml",
      difficulty: "Medium",
      prize: "$50,000",
      participants: 234,
      deadline: "2024-04-20",
      status: "Active",
      isBookmarked: false,
      isJoined: false,
      organizer: "AI for Good Foundation",
      tags: ["AI", "Social Impact", "Ethics", "Machine Learning"],
      requirements: [
        "AI model or algorithm",
        "Ethical impact assessment",
        "Bias testing results",
        "Open source contribution"
      ],
      timeline: "3 months",
      judgingCriteria: [
        "Social impact potential (40%)",
        "Technical excellence (30%)",
        "Ethical considerations (20%)",
        "Innovation (10%)"
      ],
      resources: [
        "AI/ML mentorship",
        "Computing resources",
        "Ethics review panel",
        "Open source community support"
      ]
    },
    {
      id: 4,
      title: "Blockchain Transparency Initiative",
      description: "Build blockchain solutions that enhance transparency and trust in supply chains, voting systems, or financial transactions.",
      category: "blockchain",
      difficulty: "Hard",
      prize: "$80,000",
      participants: 67,
      deadline: "2024-07-10",
      status: "Active",
      isBookmarked: true,
      isJoined: false,
      organizer: "Blockchain Consortium",
      tags: ["Blockchain", "Transparency", "Trust", "Supply Chain"],
      requirements: [
        "Working blockchain application",
        "Security audit report",
        "Integration with existing systems",
        "Performance benchmarks"
      ],
      timeline: "5 months",
      judgingCriteria: [
        "Technical innovation (35%)",
        "Security and reliability (25%)",
        "Real-world applicability (25%)",
        "User experience (15%)"
      ],
      resources: [
        "Blockchain development tools",
        "Security audit services",
        "Industry partnerships",
        "Technical workshops"
      ]
    },
    {
      id: 5,
      title: "Smart City IoT Solutions",
      description: "Develop IoT solutions for smart cities that improve urban living, reduce energy consumption, or enhance public safety.",
      category: "iot",
      difficulty: "Medium",
      prize: "$60,000",
      participants: 123,
      deadline: "2024-05-30",
      status: "Active",
      isBookmarked: false,
      isJoined: false,
      organizer: "Smart City Alliance",
      tags: ["IoT", "Smart Cities", "Urban Planning", "Sustainability"],
      requirements: [
        "IoT prototype with sensors",
        "Data analytics dashboard",
        "Integration with city systems",
        "Privacy and security measures"
      ],
      timeline: "4 months",
      judgingCriteria: [
        "Urban impact (30%)",
        "Technical innovation (25%)",
        "Scalability (20%)",
        "Cost effectiveness (15%)",
        "User adoption (10%)"
      ],
      resources: [
        "IoT development kits",
        "City data access",
        "Urban planning experts",
        "Pilot testing support"
      ]
    },
    {
      id: 6,
      title: "Financial Inclusion Hackathon",
      description: "Create fintech solutions that promote financial inclusion for unbanked and underbanked populations worldwide.",
      category: "fintech",
      difficulty: "Easy",
      prize: "$40,000",
      participants: 189,
      deadline: "2024-03-15",
      status: "Active",
      isBookmarked: false,
      isJoined: true,
      organizer: "FinTech for Good",
      tags: ["Fintech", "Financial Inclusion", "Mobile Banking", "Accessibility"],
      requirements: [
        "Working mobile or web application",
        "User testing with target demographic",
        "Compliance with financial regulations",
        "Partnership with financial institution"
      ],
      timeline: "2 months",
      judgingCriteria: [
        "Financial inclusion impact (40%)",
        "User experience (25%)",
        "Technical implementation (20%)",
        "Regulatory compliance (15%)"
      ],
      resources: [
        "Fintech mentorship",
        "Regulatory guidance",
        "Banking partnerships",
        "User testing support"
      ]
    }
  ]

  const filteredChallenges = challenges.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         challenge.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         challenge.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || challenge.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === "all" || challenge.difficulty.toLowerCase() === selectedDifficulty
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const activeChallenges = filteredChallenges.filter(challenge => challenge.status === "Active")
  const myChallenges = filteredChallenges.filter(challenge => challenge.isJoined)
  const completedChallenges = filteredChallenges.filter(challenge => challenge.status === "Completed")

  const handleJoinChallenge = (challengeId: number) => {
    toast({
      title: "Challenge Joined",
      description: "You have successfully joined the challenge!",
    })
  }

  const handleBookmarkChallenge = (challengeId: number) => {
    toast({
      title: "Challenge Bookmarked",
      description: "Challenge added to your bookmarks.",
    })
  }

  const handleViewChallenge = (challengeId: number) => {
    toast({
      title: "Opening Challenge",
      description: "Loading challenge details...",
    })
  }

  const handleShareChallenge = (challengeId: number) => {
    toast({
      title: "Challenge Shared",
      description: "Challenge link copied to clipboard.",
    })
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
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
        return <Target className="h-5 w-5 text-gray-500" />
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
                <Link href="/resources/innovation">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Innovation Hub
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Innovation Challenges</h1>
                <p className="text-sm text-gray-600">Join challenges and win prizes for innovative solutions</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                <Plus className="h-4 w-4 mr-2" />
                Create Challenge
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
              placeholder="Search challenges by title, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white rounded-lg border">
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
                <label className="text-sm font-medium text-gray-700">Difficulty</label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {difficulties.map((difficulty) => (
                    <option key={difficulty.id} value={difficulty.id}>
                      {difficulty.name} ({difficulty.count})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Prize Range</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="all">All Prizes</option>
                  <option value="under-25k">Under $25,000</option>
                  <option value="25k-50k">$25,000 - $50,000</option>
                  <option value="50k-75k">$50,000 - $75,000</option>
                  <option value="over-75k">Over $75,000</option>
                </select>
              </div>
            </div>
          )}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">Active ({activeChallenges.length})</TabsTrigger>
            <TabsTrigger value="my-challenges">My Challenges ({myChallenges.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedChallenges.length})</TabsTrigger>
          </TabsList>

          {/* Active Challenges Tab */}
          <TabsContent value="active" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeChallenges.map((challenge) => (
                <Card key={challenge.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {getCategoryIcon(challenge.category)}
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg group-hover:text-[#0F7377] transition-colors">
                            {challenge.title}
                          </h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={getDifficultyColor(challenge.difficulty)}>
                              {challenge.difficulty}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {challenge.category}
                            </Badge>
                            <Badge className="bg-green-100 text-green-800">
                              {challenge.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleBookmarkChallenge(challenge.id)}>
                          {challenge.isBookmarked ? (
                            <BookmarkCheck className="h-4 w-4" />
                          ) : (
                            <Bookmark className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 text-sm mb-4 line-clamp-3">{challenge.description}</p>
                    
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
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Timeline</span>
                        <span>{challenge.timeline}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Organizer</span>
                        <span>{challenge.organizer}</span>
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
                      {challenge.isJoined ? (
                        <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Joined
                        </Button>
                      ) : (
                        <Button 
                          size="sm" 
                          className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90"
                          onClick={() => handleJoinChallenge(challenge.id)}
                        >
                          <Target className="h-4 w-4 mr-2" />
                          Join Challenge
                        </Button>
                      )}
                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewChallenge(challenge.id)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Details
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleShareChallenge(challenge.id)}
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

          {/* My Challenges Tab */}
          <TabsContent value="my-challenges" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myChallenges.map((challenge) => (
                <Card key={challenge.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {getCategoryIcon(challenge.category)}
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg group-hover:text-[#0F7377] transition-colors">
                            {challenge.title}
                          </h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={getDifficultyColor(challenge.difficulty)}>
                              {challenge.difficulty}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {challenge.category}
                            </Badge>
                            <Badge className="bg-green-100 text-green-800">
                              Joined
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 text-sm mb-4 line-clamp-3">{challenge.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Prize</span>
                        <span className="font-semibold text-green-600">{challenge.prize}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Deadline</span>
                        <span>{challenge.deadline}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Progress</span>
                        <span>In Progress</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        View Progress
                      </Button>
                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewChallenge(challenge.id)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Details
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

          {/* Completed Challenges Tab */}
          <TabsContent value="completed" className="space-y-6">
            <div className="text-center py-12">
              <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Completed Challenges</h3>
              <p className="text-gray-500 mb-4">
                Complete challenges to see them here and track your achievements.
              </p>
              <Button className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                <Target className="h-4 w-4 mr-2" />
                Browse Challenges
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
