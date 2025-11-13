"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  MessageCircle,
  Heart,
  Share2,
  ThumbsUp,
  ThumbsDown,
  Reply,
  Send,
  Edit,
  Trash2,
  MoreHorizontal,
  Bell,
  Star,
  Users,
  Eye,
  TrendingUp,
  Calendar,
  Clock,
  User,
  Camera,
  Video,
  Image,
  Link,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Copy,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  Plus,
  Minus,
  Filter,
  Search,
  Download,
  Upload,
  Play,
  Pause,
  Volume2,
  VolumeX
} from "lucide-react"

interface Comment {
  id: string
  author: {
    name: string
    avatar: string
    isBacker: boolean
    pledgeAmount?: number
  }
  content: string
  timestamp: string
  likes: number
  replies: number
  isLiked: boolean
  isAuthor: boolean
}

interface Update {
  id: string
  title: string
  content: string
  author: {
    name: string
    avatar: string
  }
  timestamp: string
  likes: number
  comments: number
  shares: number
  images?: string[]
  video?: string
  isPublic: boolean
  isPinned: boolean
}

interface SocialStats {
  totalComments: number
  totalLikes: number
  totalShares: number
  totalViews: number
  engagementRate: number
  topCommenters: Array<{
    name: string
    avatar: string
    comments: number
    likes: number
  }>
}

export function SocialFeatures() {
  const [activeTab, setActiveTab] = useState("comments")
  const [newComment, setNewComment] = useState("")
  const [newUpdate, setNewUpdate] = useState({
    title: "",
    content: "",
    isPublic: true,
    images: [] as string[]
  })
  const [replyTo, setReplyTo] = useState<string | null>(null)
  const [showReplies, setShowReplies] = useState<Set<string>>(new Set())

  const comments: Comment[] = [
    {
      id: "1",
      author: {
        name: "Sarah Johnson",
        avatar: "/avatars/sarah.jpg",
        isBacker: true,
        pledgeAmount: 200
      },
      content: "This project looks amazing! I can't wait to see it come to life. The smart home integration is exactly what I've been looking for.",
      timestamp: "2024-01-22T10:30:00Z",
      likes: 12,
      replies: 3,
      isLiked: true,
      isAuthor: false
    },
    {
      id: "2",
      author: {
        name: "Michael Chen",
        avatar: "/avatars/michael.jpg",
        isBacker: true,
        pledgeAmount: 100
      },
      content: "Great progress! When do you expect to start shipping the rewards?",
      timestamp: "2024-01-21T15:45:00Z",
      likes: 8,
      replies: 1,
      isLiked: false,
      isAuthor: false
    },
    {
      id: "3",
      author: {
        name: "Emily Rodriguez",
        avatar: "/avatars/emily.jpg",
        isBacker: true,
        pledgeAmount: 150
      },
      content: "I love the design! Will there be different color options available?",
      timestamp: "2024-01-20T09:15:00Z",
      likes: 15,
      replies: 2,
      isLiked: true,
      isAuthor: false
    }
  ]

  const updates: Update[] = [
    {
      id: "1",
      title: "Prototype Testing Complete! 🎉",
      content: "We've successfully completed testing of our first prototype. The results exceeded our expectations! The energy monitoring accuracy is within 0.1% and the app integration is working flawlessly. We're now moving into production planning phase.",
      author: {
        name: "EcoTech Team",
        avatar: "/avatars/ecotech.jpg"
      },
      timestamp: "2024-01-22T14:00:00Z",
      likes: 45,
      comments: 12,
      shares: 23,
      images: ["/prototype-testing-1.jpg", "/prototype-testing-2.jpg"],
      isPublic: true,
      isPinned: true
    },
    {
      id: "2",
      title: "Manufacturing Partner Secured",
      content: "Great news! We've finalized our manufacturing partnership with a leading electronics manufacturer. This will ensure high-quality production and faster delivery times for all our backers.",
      author: {
        name: "EcoTech Team",
        avatar: "/avatars/ecotech.jpg"
      },
      timestamp: "2024-01-20T11:30:00Z",
      likes: 32,
      comments: 8,
      shares: 15,
      isPublic: true,
      isPinned: false
    },
    {
      id: "3",
      title: "Behind the Scenes: Design Process",
      content: "Take a look at our design journey! From initial sketches to final CAD models, here's how we developed the EcoTech Smart Home Energy Monitor. Every detail was carefully considered to create the perfect user experience.",
      author: {
        name: "EcoTech Team",
        avatar: "/avatars/ecotech.jpg"
      },
      timestamp: "2024-01-18T16:45:00Z",
      likes: 28,
      comments: 6,
      shares: 12,
      video: "/design-process-video.mp4",
      isPublic: true,
      isPinned: false
    }
  ]

  const socialStats: SocialStats = {
    totalComments: 67,
    totalLikes: 234,
    totalShares: 89,
    totalViews: 12470,
    engagementRate: 4.2,
    topCommenters: [
      {
        name: "Sarah Johnson",
        avatar: "/avatars/sarah.jpg",
        comments: 15,
        likes: 45
      },
      {
        name: "Michael Chen",
        avatar: "/avatars/michael.jpg",
        comments: 12,
        likes: 38
      },
      {
        name: "Emily Rodriguez",
        avatar: "/avatars/emily.jpg",
        comments: 8,
        likes: 32
      }
    ]
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
    return date.toLocaleDateString()
  }

  const handleLikeComment = (commentId: string) => {
    // Toggle like state
    console.log(`Liked comment ${commentId}`)
  }

  const handleReply = (commentId: string) => {
    setReplyTo(replyTo === commentId ? null : commentId)
  }

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      console.log("Submitting comment:", newComment)
      setNewComment("")
    }
  }

  const handleSubmitUpdate = () => {
    if (newUpdate.title.trim() && newUpdate.content.trim()) {
      console.log("Submitting update:", newUpdate)
      setNewUpdate({
        title: "",
        content: "",
        isPublic: true,
        images: []
      })
    }
  }

  const renderComment = (comment: Comment) => (
    <Card key={comment.id} className="mb-4">
      <CardContent className="pt-4">
        <div className="flex items-start gap-3">
          <Avatar>
            <AvatarImage src={comment.author.avatar} />
            <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium">{comment.author.name}</span>
              {comment.author.isBacker && (
                <Badge variant="secondary" className="text-xs">
                  <Star className="w-3 h-3 mr-1" />
                  Backer
                </Badge>
              )}
              {comment.author.pledgeAmount && (
                <Badge variant="outline" className="text-xs">
                  ${comment.author.pledgeAmount}
                </Badge>
              )}
              <span className="text-xs text-muted-foreground">
                {formatTimestamp(comment.timestamp)}
              </span>
            </div>
            <p className="text-sm mb-3">{comment.content}</p>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleLikeComment(comment.id)}
                className={comment.isLiked ? "text-red-500" : ""}
              >
                <Heart className={`w-4 h-4 mr-1 ${comment.isLiked ? "fill-current" : ""}`} />
                {comment.likes}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleReply(comment.id)}
              >
                <Reply className="w-4 h-4 mr-1" />
                Reply
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </Button>
              {comment.isAuthor && (
                <Button variant="ghost" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
              )}
            </div>
            {replyTo === comment.id && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                <Textarea
                  placeholder="Write a reply..."
                  className="mb-2"
                  rows={2}
                />
                <div className="flex gap-2">
                  <Button size="sm">
                    <Send className="w-4 h-4 mr-1" />
                    Reply
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setReplyTo(null)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderUpdate = (update: Update) => (
    <Card key={update.id} className="mb-6">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={update.author.avatar} />
              <AvatarFallback>{update.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{update.title}</h3>
                {update.isPinned && (
                  <Badge className="bg-[#F59E0B] text-white">
                    <Star className="w-3 h-3 mr-1" />
                    Pinned
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {update.author.name} • {formatTimestamp(update.timestamp)}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm mb-4">{update.content}</p>
        
        {update.images && update.images.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mb-4">
            {update.images.map((image, index) => (
              <div key={index} className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                <Image className="w-8 h-8 text-gray-400" />
              </div>
            ))}
          </div>
        )}

        {update.video && (
          <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-4">
            <Play className="w-12 h-12 text-gray-400" />
          </div>
        )}

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">
            <ThumbsUp className="w-4 h-4 mr-1" />
            {update.likes}
          </Button>
          <Button variant="ghost" size="sm">
            <MessageCircle className="w-4 h-4 mr-1" />
            {update.comments}
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="w-4 h-4 mr-1" />
            {update.shares}
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]">Community & Social</h1>
          <p className="text-[#64748B]">Engage with your backers and community</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Update
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#0F7377]">{socialStats.totalComments}</div>
              <div className="text-sm text-muted-foreground">Comments</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#0F7377]">{socialStats.totalLikes}</div>
              <div className="text-sm text-muted-foreground">Likes</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#0F7377]">{socialStats.totalShares}</div>
              <div className="text-sm text-muted-foreground">Shares</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#0F7377]">{socialStats.totalViews}</div>
              <div className="text-sm text-muted-foreground">Views</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#0F7377]">{socialStats.engagementRate}%</div>
              <div className="text-sm text-muted-foreground">Engagement</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="comments">Comments ({comments.length})</TabsTrigger>
          <TabsTrigger value="updates">Updates ({updates.length})</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="sharing">Sharing</TabsTrigger>
        </TabsList>

        {/* Comments Tab */}
        <TabsContent value="comments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add a Comment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <Avatar>
                  <AvatarFallback>Y</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="Share your thoughts..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="mb-3"
                    rows={3}
                  />
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Image className="w-4 h-4 mr-1" />
                        Image
                      </Button>
                      <Button variant="outline" size="sm">
                        <Link className="w-4 h-4 mr-1" />
                        Link
                      </Button>
                    </div>
                    <Button onClick={handleSubmitComment} disabled={!newComment.trim()}>
                      <Send className="w-4 h-4 mr-2" />
                      Post Comment
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {comments.map(renderComment)}
          </div>
        </TabsContent>

        {/* Updates Tab */}
        <TabsContent value="updates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create Update</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  placeholder="Update title..."
                  value={newUpdate.title}
                  onChange={(e) => setNewUpdate(prev => ({ ...prev, title: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Content</label>
                <Textarea
                  placeholder="Share your project update..."
                  value={newUpdate.content}
                  onChange={(e) => setNewUpdate(prev => ({ ...prev, content: e.target.value }))}
                  className="mt-1"
                  rows={4}
                />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isPublic"
                    checked={newUpdate.isPublic}
                    onChange={(e) => setNewUpdate(prev => ({ ...prev, isPublic: e.target.checked }))}
                    className="w-4 h-4"
                  />
                  <label htmlFor="isPublic" className="text-sm">Public update</label>
                </div>
                <Button variant="outline" size="sm">
                  <Camera className="w-4 h-4 mr-2" />
                  Add Images
                </Button>
                <Button variant="outline" size="sm">
                  <Video className="w-4 h-4 mr-2" />
                  Add Video
                </Button>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSubmitUpdate} disabled={!newUpdate.title.trim() || !newUpdate.content.trim()}>
                  <Send className="w-4 h-4 mr-2" />
                  Post Update
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {updates.map(renderUpdate)}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Commenters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {socialStats.topCommenters.map((commenter, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={commenter.avatar} />
                          <AvatarFallback>{commenter.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{commenter.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {commenter.comments} comments • {commenter.likes} likes
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary">{index + 1}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Engagement Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Comments</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-[#0F7377] h-2 rounded-full" style={{ width: '75%' }} />
                      </div>
                      <span className="text-sm font-medium">+12%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Likes</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-[#0F7377] h-2 rounded-full" style={{ width: '85%' }} />
                      </div>
                      <span className="text-sm font-medium">+18%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Shares</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-[#0F7377] h-2 rounded-full" style={{ width: '60%' }} />
                      </div>
                      <span className="text-sm font-medium">+8%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Sharing Tab */}
        <TabsContent value="sharing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Share Your Project</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4">
                  <Facebook className="w-6 h-6 text-blue-600" />
                  <span className="text-sm">Facebook</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4">
                  <Twitter className="w-6 h-6 text-blue-400" />
                  <span className="text-sm">Twitter</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4">
                  <Instagram className="w-6 h-6 text-pink-600" />
                  <span className="text-sm">Instagram</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4">
                  <Linkedin className="w-6 h-6 text-blue-700" />
                  <span className="text-sm">LinkedIn</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Share Links</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Input
                    value="https://growthlab.com/project/ecotech"
                    readOnly
                    className="flex-1"
                  />
                  <Button variant="outline" size="sm">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    value="https://growthlab.com/project/ecotech/embed"
                    readOnly
                    className="flex-1"
                  />
                  <Button variant="outline" size="sm">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 