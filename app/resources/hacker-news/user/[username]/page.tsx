"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft,
  User,
  Calendar,
  Clock,
  MessageCircle,
  ExternalLink,
  Bookmark,
  BookmarkCheck,
  Share2,
  ChevronUp,
  ChevronDown,
  Reply,
  Flag,
  MoreHorizontal,
  Globe,
  Code,
  Zap,
  Star,
  Heart,
  ThumbsUp,
  ThumbsDown,
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
  Tag,
  Eye,
  TrendingUp,
  TrendingDown
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function UserProfilePage({ params }: { params: { username: string } }) {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("submissions")
  const [isFollowing, setIsFollowing] = useState(false)

  // Mock data - in real app, this would come from API
  const user = {
    username: params.username,
    displayName: "Sarah Chen",
    bio: "AI researcher and startup founder. Passionate about machine learning and building products that matter.",
    location: "San Francisco, CA",
    website: "https://sarahchen.dev",
    twitter: "@sarahchen_ai",
    github: "sarahchen",
    joined: "2020-03-15",
    karma: 1247,
    submissions: 45,
    comments: 234,
    bookmarks: 89,
    followers: 156,
    following: 78,
    isVerified: true,
    badges: ["Top Contributor", "AI Expert", "Startup Founder"],
    recentActivity: "2 hours ago"
  }

  const submissions = [
    {
      id: 1,
      title: "OpenAI releases GPT-4.5 with improved reasoning capabilities",
      url: "https://openai.com/blog/gpt-4-5",
      domain: "openai.com",
      points: 1247,
      time: "2 hours ago",
      comments: 234,
      category: "top",
      tags: ["AI", "OpenAI", "GPT-4.5", "Machine Learning"]
    },
    {
      id: 2,
      title: "Show HN: I built a real-time collaborative code editor",
      url: "https://github.com/sarahchen/collab-editor",
      domain: "github.com",
      points: 892,
      time: "1 day ago",
      comments: 156,
      category: "show",
      tags: ["Show HN", "Code Editor", "Collaboration", "Real-time"]
    },
    {
      id: 3,
      title: "Ask HN: What's the best way to learn system design?",
      url: "",
      domain: "",
      points: 567,
      time: "3 days ago",
      comments: 89,
      category: "ask",
      tags: ["Ask HN", "System Design", "Learning", "Career"]
    }
  ]

  const comments = [
    {
      id: 1,
      storyTitle: "Rust 1.75 released with improved async performance",
      storyId: 4,
      text: "This is a significant improvement over the previous version. The async performance gains are particularly impressive.",
      points: 45,
      time: "1 hour ago"
    },
    {
      id: 2,
      storyTitle: "The hidden costs of technical debt in startups",
      storyId: 6,
      text: "Great article! I've seen this pattern in many startups. The key is finding the right balance between speed and quality.",
      points: 38,
      time: "4 hours ago"
    },
    {
      id: 3,
      storyTitle: "YC W24 Batch: 200+ startups selected for Winter 2024",
      storyId: 5,
      text: "Exciting to see so many innovative startups in this batch. The AI and biotech sectors are particularly strong this year.",
      points: 23,
      time: "1 day ago"
    }
  ]

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
    toast({
      title: isFollowing ? "Unfollowed" : "Following",
      description: isFollowing ? `You unfollowed ${user.username}` : `You are now following ${user.username}`,
    })
  }

  const handleMessage = () => {
    toast({
      title: "Send Message",
      description: "Opening message composer...",
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
                <h1 className="text-xl font-bold text-gray-900">User Profile</h1>
                <p className="text-sm text-gray-600">@{user.username}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleMessage}>
                <Mail className="h-4 w-4 mr-2" />
                Message
              </Button>
              <Button 
                variant={isFollowing ? "outline" : "default"}
                size="sm" 
                onClick={handleFollow}
                className={isFollowing ? "" : "bg-[#0F7377] hover:bg-[#0F7377]/90"}
              >
                {isFollowing ? "Following" : "Follow"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* User Profile Header */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-start space-x-6">
                {/* Avatar */}
                <div className="w-20 h-20 bg-[#0F7377] rounded-full flex items-center justify-center">
                  <User className="h-10 w-10 text-white" />
                </div>

                {/* User Info */}
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h2 className="text-2xl font-bold text-gray-900">{user.displayName}</h2>
                    {user.isVerified && (
                      <Badge className="bg-blue-500 text-white">Verified</Badge>
                    )}
                  </div>
                  <p className="text-gray-600 mb-2">@{user.username}</p>
                  <p className="text-gray-700 mb-4">{user.bio}</p>
                  
                  {/* User Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      {user.location && (
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span>{user.location}</span>
                        </div>
                      )}
                      {user.website && (
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Globe className="h-4 w-4" />
                          <a href={user.website} target="_blank" rel="noopener noreferrer" className="hover:text-[#0F7377]">
                            {user.website}
                          </a>
                        </div>
                      )}
                      {user.twitter && (
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <LinkIcon className="h-4 w-4" />
                          <span>{user.twitter}</span>
                        </div>
                      )}
                      {user.github && (
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Code className="h-4 w-4" />
                          <a href={`https://github.com/${user.github}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#0F7377]">
                            github.com/{user.github}
                          </a>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>Joined {new Date(user.joined).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>Last active {user.recentActivity}</span>
                      </div>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {user.badges.map((badge) => (
                      <Badge key={badge} variant="secondary">
                        {badge}
                      </Badge>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#0F7377]">{user.karma}</div>
                      <div className="text-sm text-gray-600">Karma</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#0F7377]">{user.submissions}</div>
                      <div className="text-sm text-gray-600">Submissions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#0F7377]">{user.comments}</div>
                      <div className="text-sm text-gray-600">Comments</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#0F7377]">{user.followers}</div>
                      <div className="text-sm text-gray-600">Followers</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="submissions">Submissions</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
              <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
            </TabsList>

            {/* Submissions Tab */}
            <TabsContent value="submissions" className="space-y-4">
              {submissions.map((submission) => (
                <Card key={submission.id}>
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
                        <span className="text-xs text-gray-600">{submission.points}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 hover:bg-gray-100"
                        >
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Submission Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-base font-medium text-gray-900 hover:text-[#0F7377] cursor-pointer">
                              {submission.title}
                            </h3>
                            {submission.url && (
                              <div className="flex items-center space-x-2 mt-1">
                                <span className="text-xs text-gray-500">({submission.domain})</span>
                                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                                  <ExternalLink className="h-3 w-3 mr-1" />
                                  Visit
                                </Button>
                              </div>
                            )}
                            <div className="flex flex-wrap gap-1 mt-2">
                              {submission.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        {/* Submission Meta */}
                        <div className="flex items-center space-x-4 mt-3 text-xs text-gray-500">
                          <span>{submission.time}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 px-2 text-xs hover:bg-gray-100"
                            onClick={() => handleViewStory(submission.id)}
                          >
                            <MessageCircle className="h-3 w-3 mr-1" />
                            {submission.comments} comments
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Comments Tab */}
            <TabsContent value="comments" className="space-y-4">
              {comments.map((comment) => (
                <Card key={comment.id}>
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
                          <span className="text-sm text-gray-500">{comment.time}</span>
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

            {/* Bookmarks Tab */}
            <TabsContent value="bookmarks" className="space-y-4">
              <div className="text-center py-12">
                <Bookmark className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Bookmarks Yet</h3>
                <p className="text-gray-500 mb-4">Bookmarked stories will appear here</p>
                <Button className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                  <Bookmark className="h-4 w-4 mr-2" />
                  Browse Stories
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
