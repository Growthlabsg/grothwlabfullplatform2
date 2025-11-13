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
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  MessageCircle,
  ChevronUp,
  ChevronDown,
  Share2,
  Flag,
  MoreHorizontal,
  User,
  Clock,
  Calendar,
  Tag,
  Globe,
  Code,
  Zap,
  Star,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Reply,
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
  Plus,
  Minus,
  Settings,
  Bell,
  BellOff,
  Lock,
  Unlock,
  Archive,
  RefreshCw,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Move,
  Eye,
  TrendingUp,
  TrendingDown
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function BookmarksPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [activeTab, setActiveTab] = useState("stories")

  const categories = [
    { id: "all", name: "All Bookmarks", count: 24 },
    { id: "top", name: "Top Stories", count: 8 },
    { id: "ask", name: "Ask HN", count: 5 },
    { id: "show", name: "Show HN", count: 6 },
    { id: "jobs", name: "Jobs", count: 3 },
    { id: "polls", name: "Polls", count: 2 }
  ]

  const bookmarkedStories = [
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
      bookmarkedAt: "2024-01-15T10:30:00Z",
      isBookmarked: true
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
      bookmarkedAt: "2024-01-15T08:45:00Z",
      isBookmarked: true
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
      bookmarkedAt: "2024-01-15T06:20:00Z",
      isBookmarked: true
    },
    {
      id: 4,
      title: "YC W24 Batch: 200+ startups selected for Winter 2024",
      url: "https://www.ycombinator.com/companies",
      domain: "ycombinator.com",
      points: 445,
      user: "ycombinator",
      time: "12 hours ago",
      comments: 67,
      category: "launch",
      tags: ["YC", "Startups", "Batch W24", "Accelerator"],
      text: "We're excited to announce the Winter 2024 batch with 200+ startups across various sectors including AI, biotech, fintech, and climate tech.",
      bookmarkedAt: "2024-01-14T18:15:00Z",
      isBookmarked: true
    },
    {
      id: 5,
      title: "The hidden costs of technical debt in startups",
      url: "https://engineering.blog/technical-debt-startups",
      domain: "engineering.blog",
      points: 678,
      user: "cto_insights",
      time: "1 day ago",
      comments: 145,
      category: "top",
      tags: ["Technical Debt", "Startups", "Engineering", "Management"],
      text: "A deep dive into how technical debt accumulates in fast-growing startups and strategies for managing it without slowing down product development.",
      bookmarkedAt: "2024-01-14T14:30:00Z",
      isBookmarked: true
    }
  ]

  const bookmarkedComments = [
    {
      id: 1,
      storyTitle: "Rust 1.75 released with improved async performance",
      storyId: 4,
      user: "rustacean",
      text: "This is a significant improvement over the previous version. The async performance gains are particularly impressive, especially for I/O heavy applications.",
      points: 45,
      time: "1 hour ago",
      bookmarkedAt: "2024-01-15T09:15:00Z"
    },
    {
      id: 2,
      storyTitle: "The hidden costs of technical debt in startups",
      storyId: 5,
      user: "cto_insights",
      text: "Great article! I've seen this pattern in many startups. The key is finding the right balance between speed and quality, and having a plan to address technical debt.",
      points: 38,
      time: "4 hours ago",
      bookmarkedAt: "2024-01-15T05:30:00Z"
    },
    {
      id: 3,
      storyTitle: "YC W24 Batch: 200+ startups selected for Winter 2024",
      storyId: 4,
      user: "startup_founder",
      text: "Exciting to see so many innovative startups in this batch. The AI and biotech sectors are particularly strong this year, which reflects the current market trends.",
      points: 23,
      time: "1 day ago",
      bookmarkedAt: "2024-01-14T16:45:00Z"
    }
  ]

  const filteredStories = bookmarkedStories.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         story.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         story.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || story.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const filteredComments = bookmarkedComments.filter(comment => {
    const matchesSearch = comment.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         comment.storyTitle.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  const handleRemoveBookmark = (itemId: number, type: 'story' | 'comment') => {
    toast({
      title: "Bookmark Removed",
      description: `The ${type} has been removed from your bookmarks.`,
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

  const handleShare = (itemId: number) => {
    toast({
      title: "Shared",
      description: "Item link copied to clipboard.",
    })
  }

  const handleClearAllBookmarks = () => {
    toast({
      title: "All Bookmarks Cleared",
      description: "All bookmarks have been removed.",
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
                <h1 className="text-xl font-bold text-gray-900">My Bookmarks</h1>
                <p className="text-sm text-gray-600">Saved stories and comments</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleClearAllBookmarks}>
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search bookmarks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name} ({category.count})
                </option>
              ))}
            </select>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="stories">Stories ({bookmarkedStories.length})</TabsTrigger>
            <TabsTrigger value="comments">Comments ({bookmarkedComments.length})</TabsTrigger>
          </TabsList>

          {/* Bookmarked Stories Tab */}
          <TabsContent value="stories" className="space-y-4">
            {filteredStories.length === 0 ? (
              <div className="text-center py-12">
                <Bookmark className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Bookmarked Stories</h3>
                <p className="text-gray-500 mb-4">Stories you bookmark will appear here</p>
                <Button className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                  <Bookmark className="h-4 w-4 mr-2" />
                  Browse Stories
                </Button>
              </div>
            ) : (
              filteredStories.map((story) => (
                <Card key={story.id} className="border-0 shadow-sm hover:shadow-md transition-all duration-200">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
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
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
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
                            <span>Bookmarked {new Date(story.bookmarkedAt).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-2">
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
                              onClick={() => handleRemoveBookmark(story.id, 'story')}
                            >
                              <BookmarkCheck className="h-3 w-3 mr-1" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Bookmarked Comments Tab */}
          <TabsContent value="comments" className="space-y-4">
            {filteredComments.length === 0 ? (
              <div className="text-center py-12">
                <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Bookmarked Comments</h3>
                <p className="text-gray-500 mb-4">Comments you bookmark will appear here</p>
                <Button className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Browse Comments
                </Button>
              </div>
            ) : (
              filteredComments.map((comment) => (
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
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{comment.text}</p>
                        <div className="text-xs text-gray-500 mb-2">
                          on: <span className="hover:text-[#0F7377] cursor-pointer" onClick={() => handleViewComment(comment.id)}>
                            {comment.storyTitle}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>Bookmarked {new Date(comment.bookmarkedAt).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2 text-xs hover:bg-gray-100"
                              onClick={() => handleShare(comment.id)}
                            >
                              <Share2 className="h-3 w-3 mr-1" />
                              Share
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2 text-xs hover:bg-gray-100"
                              onClick={() => handleRemoveBookmark(comment.id, 'comment')}
                            >
                              <BookmarkCheck className="h-3 w-3 mr-1" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
