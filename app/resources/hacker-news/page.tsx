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
  TrendingUp,
  TrendingDown,
  Clock,
  MessageCircle,
  ExternalLink,
  Bookmark,
  BookmarkCheck,
  Heart,
  Share2,
  MoreHorizontal,
  ChevronUp,
  ChevronDown,
  User,
  Calendar,
  Tag,
  Globe,
  Code,
  Zap,
  Star,
  Eye,
  ThumbsUp,
  ThumbsDown,
  Reply,
  Flag,
  Archive,
  RefreshCw,
  Settings,
  Bell,
  BellOff,
  Plus,
  Edit,
  Trash2,
  Save,
  Copy,
  Download,
  Upload,
  Link as LinkIcon,
  Mail,
  Send,
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
  FileText,
  Image,
  Video,
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
  HelpCircle,
  Info,
  AlertCircle,
  CheckCircle,
  XCircle,
  Lightbulb,
  Target,
  BarChart3,
  Building2,
  DollarSign,
  Award,
  Trophy,
  Medal,
  Crown,
  Gem,
  Sparkles,
  MousePointer,
  ChevronRight,
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
  UserPlus,
  UserMinus,
  UserCheck,
  UserX,
  Lock,
  Unlock,
  ThumbsUp as ThumbsUpIcon,
  ThumbsDown as ThumbsDownIcon,
  X
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function HackerNewsPage() {
  const { toast } = useToast()
  const [isMobile, setIsMobile] = useState(false)
  const [activeTab, setActiveTab] = useState("top")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showSubmit, setShowSubmit] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showBookmarks, setShowBookmarks] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [sortBy, setSortBy] = useState("points")
  const [timeFilter, setTimeFilter] = useState("all")
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const categories = [
    { id: "all", name: "All", count: 1247 },
    { id: "top", name: "Top", count: 456 },
    { id: "new", name: "New", count: 234 },
    { id: "ask", name: "Ask", count: 89 },
    { id: "show", name: "Show", count: 156 },
    { id: "jobs", name: "Jobs", count: 45 },
    { id: "polls", name: "Polls", count: 23 },
    { id: "launch", name: "Launch", count: 67 }
  ]

  const stories = [
    {
      id: 1,
      title: "OpenAI releases GPT-4.5 with improved reasoning capabilities",
      url: "https://openai.com/blog/gpt-4-5",
      domain: "openai.com",
      points: 1247,
      user: "sama",
      time: "2 hours ago",
      comments: 234,
      category: "top",
      tags: ["AI", "OpenAI", "GPT-4.5", "Machine Learning"],
      text: "OpenAI has announced the release of GPT-4.5, featuring significant improvements in reasoning, coding, and mathematical problem-solving capabilities. The new model shows 40% better performance on complex reasoning tasks.",
      isBookmarked: false,
      isUpvoted: false,
      isDownvoted: false
    },
    {
      id: 2,
      title: "Show HN: I built a real-time collaborative code editor",
      url: "https://github.com/user/collab-editor",
      domain: "github.com",
      points: 892,
      user: "devmaker",
      time: "4 hours ago",
      comments: 156,
      category: "show",
      tags: ["Show HN", "Code Editor", "Collaboration", "Real-time"],
      text: "After 6 months of development, I'm excited to share my real-time collaborative code editor built with WebRTC and WebSockets. It supports syntax highlighting for 50+ languages and has built-in video chat.",
      isBookmarked: true,
      isUpvoted: true,
      isDownvoted: false
    },
    {
      id: 3,
      title: "Ask HN: What's the best way to learn system design?",
      url: "",
      domain: "",
      points: 567,
      user: "newbie_dev",
      time: "6 hours ago",
      comments: 89,
      category: "ask",
      tags: ["Ask HN", "System Design", "Learning", "Career"],
      text: "I'm a junior developer with 2 years of experience. I want to transition to senior roles but feel weak in system design. What resources, courses, or projects would you recommend for learning system design effectively?",
      isBookmarked: false,
      isUpvoted: false,
      isDownvoted: false
    },
    {
      id: 4,
      title: "Rust 1.75 released with improved async performance",
      url: "https://blog.rust-lang.org/2024/01/01/Rust-1.75.0.html",
      domain: "blog.rust-lang.org",
      points: 743,
      user: "rustacean",
      time: "8 hours ago",
      comments: 123,
      category: "top",
      tags: ["Rust", "Programming", "Performance", "Async"],
      text: "Rust 1.75 brings significant improvements to async performance, new language features, and enhanced error messages. The async runtime is now 30% faster in common workloads.",
      isBookmarked: false,
      isUpvoted: false,
      isDownvoted: false
    },
    {
      id: 5,
      title: "YC W24 Batch: 200+ startups selected for Winter 2024",
      url: "https://www.ycombinator.com/companies",
      domain: "ycombinator.com",
      points: 445,
      user: "ycombinator",
      time: "12 hours ago",
      comments: 67,
      category: "launch",
      tags: ["YC", "Startups", "Batch W24", "Accelerator"],
      text: "We're excited to announce the Winter 2024 batch with 200+ startups across various sectors including AI, biotech, fintech, and climate tech. Applications for S24 are now open.",
      isBookmarked: true,
      isUpvoted: false,
      isDownvoted: false
    },
    {
      id: 6,
      title: "The hidden costs of technical debt in startups",
      url: "https://engineering.blog/technical-debt-startups",
      domain: "engineering.blog",
      points: 678,
      user: "cto_insights",
      time: "1 day ago",
      comments: 145,
      category: "top",
      tags: ["Technical Debt", "Startups", "Engineering", "Management"],
      text: "A deep dive into how technical debt accumulates in fast-growing startups and strategies for managing it without slowing down product development. Based on interviews with 50+ CTOs.",
      isBookmarked: false,
      isUpvoted: true,
      isDownvoted: false
    },
    {
      id: 7,
      title: "Job: Senior Full-Stack Developer at TechCorp (Remote)",
      url: "https://techcorp.com/careers/senior-dev",
      domain: "techcorp.com",
      points: 23,
      user: "techcorp_hr",
      time: "2 days ago",
      comments: 12,
      category: "jobs",
      tags: ["Job", "Full-Stack", "Remote", "Senior"],
      text: "We're looking for a senior full-stack developer to join our growing team. 5+ years experience with React, Node.js, and AWS. Competitive salary and equity package.",
      isBookmarked: false,
      isUpvoted: false,
      isDownvoted: false
    },
    {
      id: 8,
      title: "Poll: What's your preferred programming language for 2024?",
      url: "",
      domain: "",
      points: 334,
      user: "poll_master",
      time: "3 days ago",
      comments: 78,
      category: "polls",
      tags: ["Poll", "Programming", "Languages", "2024"],
      text: "With 2024 underway, I'm curious about the community's preferred programming languages. Vote for your top 3 choices and share your reasoning in the comments.",
      isBookmarked: false,
      isUpvoted: false,
      isDownvoted: false
    }
  ]

  const filteredStories = stories.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         story.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         story.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || story.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleUpvote = (storyId: number) => {
    toast({
      title: "Upvoted",
      description: "Your upvote has been recorded.",
    })
  }

  const handleDownvote = (storyId: number) => {
    toast({
      title: "Downvoted",
      description: "Your downvote has been recorded.",
    })
  }

  const handleBookmark = (storyId: number) => {
    toast({
      title: "Bookmarked",
      description: "Story added to your bookmarks.",
    })
  }

  const handleShare = (storyId: number) => {
    toast({
      title: "Shared",
      description: "Story link copied to clipboard.",
    })
  }

  const handleComment = (storyId: number) => {
    toast({
      title: "Opening Comments",
      description: "Loading comment section...",
    })
  }

  const handleSubmitStory = () => {
    toast({
      title: "Submit Story",
      description: "Opening story submission form...",
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
                <h1 className="text-xl font-bold text-gray-900">Hacker News</h1>
                <p className="text-sm text-gray-600 hidden md:block">Technology news and discussions</p>
              </div>
            </div>
            
            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowSearch(true)}>
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowFilters(true)}>
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowBookmarks(true)}>
                <Bookmark className="h-4 w-4 mr-2" />
                Bookmarks
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowNotifications(true)}>
                <Bell className="h-4 w-4 mr-2" />
                <Badge className="ml-1 h-5 w-5 bg-red-500 text-white text-xs">3</Badge>
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowUserMenu(true)}>
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
              <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90" onClick={handleSubmitStory}>
                <Plus className="h-4 w-4 mr-2" />
                Submit
              </Button>
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowSearch(true)}>
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowMobileMenu(true)}>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
              <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90" onClick={handleSubmitStory}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="space-y-4 mb-8">
          {/* Main Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search stories, comments, and users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-20"
            />
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              onClick={() => setShowAdvancedSearch(true)}
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>

          {/* Filters Row */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-wrap gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[120px]"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[120px]"
              >
                <option value="points">Sort by Points</option>
                <option value="time">Sort by Time</option>
                <option value="comments">Sort by Comments</option>
                <option value="relevance">Sort by Relevance</option>
              </select>

              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[120px]"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowFilters(true)}>
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowAdvancedSearch(true)}>
                <Settings className="h-4 w-4 mr-2" />
                Advanced
              </Button>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {/* Desktop Tabs */}
          <TabsList className="hidden md:grid w-full grid-cols-8">
            <TabsTrigger value="top">Top</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
            <TabsTrigger value="ask">Ask</TabsTrigger>
            <TabsTrigger value="show">Show</TabsTrigger>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="polls">Polls</TabsTrigger>
            <TabsTrigger value="launch">Launch</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>

          {/* Mobile Tabs */}
          <div className="md:hidden">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="top">Top</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
              <TabsTrigger value="ask">Ask</TabsTrigger>
              <TabsTrigger value="show">Show</TabsTrigger>
            </TabsList>
            <div className="mt-2">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="jobs">Jobs</TabsTrigger>
                <TabsTrigger value="polls">Polls</TabsTrigger>
                <TabsTrigger value="launch">Launch</TabsTrigger>
                <TabsTrigger value="all">All</TabsTrigger>
              </TabsList>
            </div>
          </div>

          {/* Stories List */}
          <TabsContent value={activeTab} className="space-y-4">
            {filteredStories.map((story, index) => (
              <Card key={story.id} className="border-0 shadow-sm hover:shadow-md transition-all duration-200">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    {/* Story Number */}
                    <div className="flex-shrink-0 text-sm text-gray-500 font-mono">
                      {index + 1}.
                    </div>
                    
                    {/* Upvote/Downvote */}
                    <div className="flex-shrink-0 flex flex-col items-center space-y-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 hover:bg-gray-100"
                        onClick={() => handleUpvote(story.id)}
                      >
                        <ChevronUp className="h-4 w-4" />
                      </Button>
                      <span className="text-xs text-gray-600">{story.points}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 hover:bg-gray-100"
                        onClick={() => handleDownvote(story.id)}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Story Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-base font-medium text-gray-900 hover:text-[#0F7377] cursor-pointer">
                            {story.title}
                          </h3>
                          {story.url && (
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-xs text-gray-500">({story.domain})</span>
                              <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                                <ExternalLink className="h-3 w-3 mr-1" />
                                Visit
                              </Button>
                            </div>
                          )}
                          {story.text && (
                            <p className="text-sm text-gray-600 mt-2">{story.text}</p>
                          )}
                          <div className="flex flex-wrap gap-1 mt-2">
                            {story.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {/* Story Meta */}
                      <div className="flex items-center space-x-4 mt-3 text-xs text-gray-500">
                        <span>by {story.user}</span>
                        <span>{story.time}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-xs hover:bg-gray-100"
                          onClick={() => handleComment(story.id)}
                        >
                          <MessageCircle className="h-3 w-3 mr-1" />
                          {story.comments} comments
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-xs hover:bg-gray-100"
                          onClick={() => handleBookmark(story.id)}
                        >
                          {story.isBookmarked ? (
                            <BookmarkCheck className="h-3 w-3 mr-1" />
                          ) : (
                            <Bookmark className="h-3 w-3 mr-1" />
                          )}
                          {story.isBookmarked ? 'Saved' : 'Save'}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-xs hover:bg-gray-100"
                          onClick={() => handleShare(story.id)}
                        >
                          <Share2 className="h-3 w-3 mr-1" />
                          Share
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-xs hover:bg-gray-100"
                        >
                          <Flag className="h-3 w-3 mr-1" />
                          Flag
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            <RefreshCw className="h-4 w-4 mr-2" />
            Load More Stories
          </Button>
        </div>

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
                <Button variant="outline" className="w-full justify-start" onClick={() => setShowBookmarks(true)}>
                  <Bookmark className="h-4 w-4 mr-2" />
                  Bookmarks
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => setShowNotifications(true)}>
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => setShowProfile(true)}>
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => setShowSettings(true)}>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Search Modal */}
        {showSearch && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Search</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowSearch(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-4">
                <Input
                  placeholder="Search stories, comments, and users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="flex gap-2">
                  <Button className="flex-1 bg-[#0F7377] hover:bg-[#0F7377]/90">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                  <Button variant="outline" onClick={() => setShowAdvancedSearch(true)}>
                    <Settings className="h-4 w-4 mr-2" />
                    Advanced
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Modal */}
        {showNotifications && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Notifications</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowNotifications(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <p className="text-sm font-medium">New comment on your story</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="text-sm font-medium">Your story reached 100 points</p>
                  <p className="text-xs text-gray-500">4 hours ago</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="text-sm font-medium">New reply to your comment</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Advanced Search Modal */}
        {showAdvancedSearch && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-full max-w-lg mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Advanced Search</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowAdvancedSearch(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Search Query</label>
                  <Input
                    placeholder="Enter search terms..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Category</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Time Range</label>
                    <select
                      value={timeFilter}
                      onChange={(e) => setTimeFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="all">All Time</option>
                      <option value="today">Today</option>
                      <option value="week">This Week</option>
                      <option value="month">This Month</option>
                      <option value="year">This Year</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1 bg-[#0F7377] hover:bg-[#0F7377]/90">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                  <Button variant="outline" onClick={() => setShowAdvancedSearch(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
