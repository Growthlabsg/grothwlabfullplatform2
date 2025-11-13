"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { 
  ArrowLeft,
  ExternalLink,
  Bookmark,
  BookmarkCheck,
  Share2,
  MessageCircle,
  ChevronUp,
  ChevronDown,
  Reply,
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
  Move
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function StoryDetailPage({ params }: { params: { id: string } }) {
  const { toast } = useToast()
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isUpvoted, setIsUpvoted] = useState(false)
  const [isDownvoted, setIsDownvoted] = useState(false)
  const [showComments, setShowComments] = useState(true)
  const [newComment, setNewComment] = useState("")
  const [replyTo, setReplyTo] = useState<number | null>(null)

  // Mock data - in real app, this would come from API
  const story = {
    id: params.id,
    title: "OpenAI releases GPT-4.5 with improved reasoning capabilities",
    url: "https://openai.com/blog/gpt-4-5",
    domain: "openai.com",
    points: 1247,
    user: "sama",
    time: "2 hours ago",
    comments: 234,
    category: "top",
    tags: ["AI", "OpenAI", "GPT-4.5", "Machine Learning"],
    text: "OpenAI has announced the release of GPT-4.5, featuring significant improvements in reasoning, coding, and mathematical problem-solving capabilities. The new model shows 40% better performance on complex reasoning tasks and includes enhanced safety measures.",
    isBookmarked: false,
    isUpvoted: false,
    isDownvoted: false
  }

  const comments = [
    {
      id: 1,
      user: "ai_researcher",
      time: "1 hour ago",
      text: "This is a significant improvement over GPT-4. The reasoning capabilities are particularly impressive - I've been testing it on complex mathematical proofs and it's performing much better.",
      points: 45,
      replies: [
        {
          id: 11,
          user: "math_prof",
          time: "45 minutes ago",
          text: "I agree, the mathematical reasoning is much more robust. Have you tried it on topology problems?",
          points: 12
        }
      ]
    },
    {
      id: 2,
      user: "startup_founder",
      time: "1 hour ago",
      text: "The safety improvements are crucial. We've been waiting for a model that can handle complex business logic without hallucinating. This could be a game-changer for our customer service automation.",
      points: 38,
      replies: []
    },
    {
      id: 3,
      user: "tech_critic",
      time: "2 hours ago",
      text: "While the improvements are notable, I'm concerned about the computational requirements. The model seems to require significantly more resources, which could limit its accessibility.",
      points: 23,
      replies: [
        {
          id: 31,
          user: "gpu_optimizer",
          time: "1 hour ago",
          text: "Good point. The inference costs are definitely higher, but the quality improvement might justify it for many use cases.",
          points: 8
        },
        {
          id: 32,
          user: "openai_engineer",
          time: "30 minutes ago",
          text: "We're working on optimization techniques to reduce computational requirements. The current version is just the beginning.",
          points: 15
        }
      ]
    }
  ]

  const handleUpvote = () => {
    setIsUpvoted(!isUpvoted)
    if (isDownvoted) setIsDownvoted(false)
    toast({
      title: isUpvoted ? "Upvote Removed" : "Upvoted",
      description: isUpvoted ? "Your upvote has been removed." : "Your upvote has been recorded.",
    })
  }

  const handleDownvote = () => {
    setIsDownvoted(!isDownvoted)
    if (isUpvoted) setIsUpvoted(false)
    toast({
      title: isDownvoted ? "Downvote Removed" : "Downvoted",
      description: isDownvoted ? "Your downvote has been removed." : "Your downvote has been recorded.",
    })
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    toast({
      title: isBookmarked ? "Bookmark Removed" : "Bookmarked",
      description: isBookmarked ? "Story removed from bookmarks." : "Story added to bookmarks.",
    })
  }

  const handleShare = () => {
    toast({
      title: "Shared",
      description: "Story link copied to clipboard.",
    })
  }

  const handleComment = () => {
    if (!newComment.trim()) {
      toast({
        title: "Comment Required",
        description: "Please enter a comment.",
        variant: "destructive"
      })
      return
    }

    toast({
      title: "Comment Posted",
      description: "Your comment has been posted.",
    })
    setNewComment("")
  }

  const handleReply = (commentId: number) => {
    setReplyTo(commentId)
  }

  const handleUpvoteComment = (commentId: number) => {
    toast({
      title: "Comment Upvoted",
      description: "Your upvote has been recorded.",
    })
  }

  const handleDownvoteComment = (commentId: number) => {
    toast({
      title: "Comment Downvoted",
      description: "Your downvote has been recorded.",
    })
  }

  const handleFlagComment = (commentId: number) => {
    toast({
      title: "Comment Flagged",
      description: "The comment has been flagged for review.",
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
                <h1 className="text-xl font-bold text-gray-900">Story Details</h1>
                <p className="text-sm text-gray-600">View and discuss the story</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleBookmark}>
                {isBookmarked ? (
                  <BookmarkCheck className="h-4 w-4 mr-2" />
                ) : (
                  <Bookmark className="h-4 w-4 mr-2" />
                )}
                {isBookmarked ? 'Bookmarked' : 'Bookmark'}
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Story Content */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                {/* Upvote/Downvote */}
                <div className="flex-shrink-0 flex flex-col items-center space-y-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-gray-100"
                    onClick={handleUpvote}
                  >
                    <ChevronUp className="h-5 w-5" />
                  </Button>
                  <span className="text-lg font-semibold text-gray-900">{story.points}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-gray-100"
                    onClick={handleDownvote}
                  >
                    <ChevronDown className="h-5 w-5" />
                  </Button>
                </div>

                {/* Story Content */}
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">{story.title}</h1>
                  
                  {story.url && (
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-sm text-gray-500">({story.domain})</span>
                      <Button variant="ghost" size="sm" asChild>
                        <a href={story.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Visit Link
                        </a>
                      </Button>
                    </div>
                  )}

                  {story.text && (
                    <div className="prose max-w-none mb-4">
                      <p className="text-gray-700 leading-relaxed">{story.text}</p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 mb-4">
                    {story.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Story Meta */}
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>by {story.user}</span>
                    <span>{story.time}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 px-2 text-xs hover:bg-gray-100"
                      onClick={() => setShowComments(!showComments)}
                    >
                      <MessageCircle className="h-3 w-3 mr-1" />
                      {story.comments} comments
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

          {/* Comments Section */}
          {showComments && (
            <div className="space-y-6">
              {/* Add Comment */}
              <Card>
                <CardHeader>
                  <CardTitle>Add Comment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Share your thoughts on this story..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      rows={4}
                      className="resize-none"
                    />
                    <div className="flex justify-end">
                      <Button 
                        className="bg-[#0F7377] hover:bg-[#0F7377]/90"
                        onClick={handleComment}
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Post Comment
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Comments List */}
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="space-y-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-4">
                          {/* Comment Upvote/Downvote */}
                          <div className="flex-shrink-0 flex flex-col items-center space-y-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 hover:bg-gray-100"
                              onClick={() => handleUpvoteComment(comment.id)}
                            >
                              <ChevronUp className="h-3 w-3" />
                            </Button>
                            <span className="text-xs text-gray-600">{comment.points}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 hover:bg-gray-100"
                              onClick={() => handleDownvoteComment(comment.id)}
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
                            <p className="text-sm text-gray-700 mb-3">{comment.text}</p>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 px-2 text-xs hover:bg-gray-100"
                                onClick={() => handleReply(comment.id)}
                              >
                                <Reply className="h-3 w-3 mr-1" />
                                Reply
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 px-2 text-xs hover:bg-gray-100"
                                onClick={() => handleFlagComment(comment.id)}
                              >
                                <Flag className="h-3 w-3 mr-1" />
                                Flag
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Replies */}
                    {comment.replies.map((reply) => (
                      <Card key={reply.id} className="ml-8">
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-4">
                            {/* Reply Upvote/Downvote */}
                            <div className="flex-shrink-0 flex flex-col items-center space-y-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 hover:bg-gray-100"
                                onClick={() => handleUpvoteComment(reply.id)}
                              >
                                <ChevronUp className="h-3 w-3" />
                              </Button>
                              <span className="text-xs text-gray-600">{reply.points}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 hover:bg-gray-100"
                                onClick={() => handleDownvoteComment(reply.id)}
                              >
                                <ChevronDown className="h-3 w-3" />
                              </Button>
                            </div>

                            {/* Reply Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="font-medium text-sm">{reply.user}</span>
                                <span className="text-xs text-gray-500">{reply.time}</span>
                              </div>
                              <p className="text-sm text-gray-700">{reply.text}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
