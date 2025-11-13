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
  ChevronDown as ChevronDownIcon,
  ChevronUp as ChevronUpIcon,
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
  TrendingUp,
  TrendingDown
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function SearchPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("stories")
  const [sortBy, setSortBy] = useState("relevance")
  const [timeFilter, setTimeFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [showAdvanced, setShowAdvanced] = useState(false)

  const searchResults = {
    stories: [
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
        text: "OpenAI has announced the release of GPT-4.5, featuring significant improvements in reasoning, coding, and mathematical problem-solving capabilities.",
        relevance: 95
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
        text: "After 6 months of development, I'm excited to share my real-time collaborative code editor built with WebRTC and WebSockets.",
        relevance: 87
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
        text: "I'm a junior developer with 2 years of experience. I want to transition to senior roles but feel weak in system design.",
        relevance: 82
      }
    ],
    comments: [
      {
        id: 1,
        storyTitle: "OpenAI releases GPT-4.5 with improved reasoning capabilities",
        storyId: 1,
        user: "ai_researcher",
        text: "This is a significant improvement over GPT-4. The reasoning capabilities are particularly impressive - I've been testing it on complex mathematical proofs and it's performing much better.",
        points: 45,
        time: "1 hour ago",
        relevance: 91
      },
      {
        id: 2,
        storyTitle: "Show HN: I built a real-time collaborative code editor",
        storyId: 2,
        user: "startup_founder",
        text: "The safety improvements are crucial. We've been waiting for a model that can handle complex business logic without hallucinating. This could be a game-changer for our customer service automation.",
        points: 38,
        time: "2 hours ago",
        relevance: 78
      }
    ],
    users: [
      {
        id: 1,
        username: "sarahchen",
        displayName: "Sarah Chen",
        bio: "AI researcher and startup founder. Passionate about machine learning and building products that matter.",
        karma: 1247,
        submissions: 45,
        comments: 234,
        location: "San Francisco, CA",
        joined: "2020-03-15",
        relevance: 89
      },
      {
        id: 2,
        username: "ai_researcher",
        displayName: "AI Researcher",
        bio: "Machine learning engineer with expertise in NLP and computer vision. Working on AI safety and alignment.",
        karma: 892,
        submissions: 23,
        comments: 156,
        location: "Boston, MA",
        joined: "2021-08-20",
        relevance: 85
      }
    ]
  }

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Search Query Required",
        description: "Please enter a search term.",
        variant: "destructive"
      })
      return
    }
    toast({
      title: "Searching",
      description: `Searching for "${searchQuery}"...`,
    })
  }

  const handleViewStory = (storyId: number) => {
    toast({
      title: "Viewing Story",
      description: "Opening story details...",
    })
  }

  const handleViewComment = (commentId: number) => {
    toast({
      title: "Viewing Comment",
      description: "Opening comment context...",
    })
  }

  const handleViewUser = (userId: number) => {
    toast({
      title: "Viewing User",
      description: "Opening user profile...",
    })
  }

  const handleBookmark = (itemId: number, type: string) => {
    toast({
      title: "Bookmarked",
      description: `${type} added to bookmarks.`,
    })
  }

  const handleShare = (itemId: number) => {
    toast({
      title: "Shared",
      description: "Item link copied to clipboard.",
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
                <Link href="/resources/hacker-news">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Hacker News
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Search</h1>
                <p className="text-sm text-gray-600">Find stories, comments, and users</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowAdvanced(!showAdvanced)}>
                <Settings className="h-4 w-4 mr-2" />
                Advanced
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Search Bar */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search stories, comments, and users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="pl-10 pr-20"
                  />
                  <Button 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={handleSearch}
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>

                {/* Advanced Search Options */}
                {showAdvanced && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Sort By</label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="relevance">Relevance</option>
                        <option value="points">Points</option>
                        <option value="time">Time</option>
                        <option value="comments">Comments</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Time Range</label>
                      <select
                        value={timeFilter}
                        onChange={(e) => setTimeFilter(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="all">All Time</option>
                        <option value="today">Today</option>
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                        <option value="year">This Year</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Category</label>
                      <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="all">All Categories</option>
                        <option value="top">Top</option>
                        <option value="new">New</option>
                        <option value="ask">Ask HN</option>
                        <option value="show">Show HN</option>
                        <option value="jobs">Jobs</option>
                        <option value="polls">Polls</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Search Results */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="stories">Stories ({searchResults.stories.length})</TabsTrigger>
              <TabsTrigger value="comments">Comments ({searchResults.comments.length})</TabsTrigger>
              <TabsTrigger value="users">Users ({searchResults.users.length})</TabsTrigger>
            </TabsList>

            {/* Stories Tab */}
            <TabsContent value="stories" className="space-y-4">
              {searchResults.stories.map((story, index) => (
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
                        >
                          <ChevronUp className="h-4 w-4" />
                        </Button>
                        <span className="text-xs text-gray-600">{story.points}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 hover:bg-gray-100"
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
                            onClick={() => handleViewStory(story.id)}
                          >
                            <MessageCircle className="h-3 w-3 mr-1" />
                            {story.comments} comments
                          </Button>
                          <span className="text-green-600 font-medium">{story.relevance}% match</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Comments Tab */}
            <TabsContent value="comments" className="space-y-4">
              {searchResults.comments.map((comment) => (
                <Card key={comment.id} className="border-0 shadow-sm hover:shadow-md transition-all duration-200">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      {/* Comment Upvote/Downvote */}
                      <div className="flex-shrink-0 flex flex-col items-center space-y-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 hover:bg-gray-100"
                        >
                          <ChevronUp className="h-3 w-3" />
                        </Button>
                        <span className="text-xs text-gray-600">{comment.points}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 hover:bg-gray-100"
                        >
                          <ChevronDown className="h-3 w-3" />
                        </Button>
                      </div>

                      {/* Comment Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-medium text-sm">{comment.user}</span>
                          <span className="text-xs text-gray-500">{comment.time}</span>
                          <span className="text-green-600 font-medium text-xs">{comment.relevance}% match</span>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{comment.text}</p>
                        <div className="text-xs text-gray-500">
                          on: <span className="hover:text-[#0F7377] cursor-pointer" onClick={() => handleViewComment(comment.id)}>
                            {comment.storyTitle}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users" className="space-y-4">
              {searchResults.users.map((user) => (
                <Card key={user.id} className="border-0 shadow-sm hover:shadow-md transition-all duration-200">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      {/* User Avatar */}
                      <div className="w-12 h-12 bg-[#0F7377] rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-white" />
                      </div>

                      {/* User Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-base font-medium text-gray-900 hover:text-[#0F7377] cursor-pointer">
                              {user.displayName}
                            </h3>
                            <p className="text-sm text-gray-600">@{user.username}</p>
                            <p className="text-sm text-gray-700 mt-1">{user.bio}</p>
                            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                              <span>{user.karma} karma</span>
                              <span>{user.submissions} submissions</span>
                              <span>{user.comments} comments</span>
                              <span>{user.location}</span>
                              <span className="text-green-600 font-medium">{user.relevance}% match</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* User Actions */}
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewUser(user.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleBookmark(user.id, 'user')}
                        >
                          <Bookmark className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
