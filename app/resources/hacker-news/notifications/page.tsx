"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft,
  Bell,
  BellOff,
  Check,
  X,
  MoreHorizontal,
  MessageCircle,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Reply,
  Flag,
  User,
  Clock,
  Calendar,
  Tag,
  Globe,
  Code,
  Zap,
  Star,
  Eye,
  Share2,
  Bookmark,
  ExternalLink,
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
  ChevronDown,
  ChevronUp,
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
  RefreshCw,
  Save,
  Copy,
  Download,
  Upload,
  Trash2,
  Edit,
  Archive,
  Search,
  Filter,
  TrendingUp,
  TrendingDown
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function NotificationsPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("all")
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "comment",
      title: "New comment on your story",
      message: "sarahchen commented on 'OpenAI releases GPT-4.5 with improved reasoning capabilities'",
      time: "2 hours ago",
      read: false,
      priority: "high",
      action: "view_comment",
      storyId: 1,
      userId: "sarahchen"
    },
    {
      id: 2,
      type: "upvote",
      title: "Your story reached 100 points",
      message: "Your story 'Show HN: I built a real-time collaborative code editor' reached 100 points!",
      time: "4 hours ago",
      read: false,
      priority: "medium",
      action: "view_story",
      storyId: 2,
      userId: null
    },
    {
      id: 3,
      type: "reply",
      title: "New reply to your comment",
      message: "tech_critic replied to your comment on 'Rust 1.75 released with improved async performance'",
      time: "6 hours ago",
      read: true,
      priority: "low",
      action: "view_reply",
      storyId: 4,
      userId: "tech_critic"
    },
    {
      id: 4,
      type: "mention",
      title: "You were mentioned in a comment",
      message: "ai_researcher mentioned you in a comment on 'The hidden costs of technical debt in startups'",
      time: "1 day ago",
      read: true,
      priority: "medium",
      action: "view_mention",
      storyId: 5,
      userId: "ai_researcher"
    },
    {
      id: 5,
      type: "follow",
      title: "New follower",
      message: "startup_founder started following you",
      time: "2 days ago",
      read: true,
      priority: "low",
      action: "view_profile",
      storyId: null,
      userId: "startup_founder"
    },
    {
      id: 6,
      type: "bookmark",
      title: "Your story was bookmarked",
      message: "devmaker bookmarked your story 'Ask HN: What's the best way to learn system design?'",
      time: "3 days ago",
      read: true,
      priority: "low",
      action: "view_story",
      storyId: 3,
      userId: "devmaker"
    }
  ])

  const notificationTypes = [
    { id: "all", name: "All", count: notifications.length },
    { id: "unread", name: "Unread", count: notifications.filter(n => !n.read).length },
    { id: "comments", name: "Comments", count: notifications.filter(n => n.type === "comment").length },
    { id: "upvotes", name: "Upvotes", count: notifications.filter(n => n.type === "upvote").length },
    { id: "mentions", name: "Mentions", count: notifications.filter(n => n.type === "mention").length },
    { id: "social", name: "Social", count: notifications.filter(n => ["follow", "bookmark"].includes(n.type)).length }
  ]

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notification.read
    if (activeTab === "comments") return notification.type === "comment"
    if (activeTab === "upvotes") return notification.type === "upvote"
    if (activeTab === "mentions") return notification.type === "mention"
    if (activeTab === "social") return ["follow", "bookmark"].includes(notification.type)
    return true
  })

  const handleMarkAsRead = (notificationId: number) => {
    setNotifications(notifications.map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    ))
    toast({
      title: "Marked as Read",
      description: "Notification marked as read.",
    })
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
    toast({
      title: "All Notifications Read",
      description: "All notifications have been marked as read.",
    })
  }

  const handleDeleteNotification = (notificationId: number) => {
    setNotifications(notifications.filter(n => n.id !== notificationId))
    toast({
      title: "Notification Deleted",
      description: "Notification has been deleted.",
    })
  }

  const handleClearAll = () => {
    setNotifications([])
    toast({
      title: "All Notifications Cleared",
      description: "All notifications have been cleared.",
    })
  }

  const handleNotificationAction = (notification: any) => {
    switch (notification.action) {
      case "view_comment":
        toast({
          title: "Viewing Comment",
          description: "Opening comment section...",
        })
        break
      case "view_story":
        toast({
          title: "Viewing Story",
          description: "Opening story details...",
        })
        break
      case "view_reply":
        toast({
          title: "Viewing Reply",
          description: "Opening reply context...",
        })
        break
      case "view_mention":
        toast({
          title: "Viewing Mention",
          description: "Opening mention context...",
        })
        break
      case "view_profile":
        toast({
          title: "Viewing Profile",
          description: "Opening user profile...",
        })
        break
      default:
        toast({
          title: "Opening Notification",
          description: "Loading notification details...",
        })
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "comment":
        return <MessageCircle className="h-5 w-5 text-blue-500" />
      case "upvote":
        return <ThumbsUp className="h-5 w-5 text-green-500" />
      case "reply":
        return <Reply className="h-5 w-5 text-purple-500" />
      case "mention":
        return <User className="h-5 w-5 text-orange-500" />
      case "follow":
        return <User className="h-5 w-5 text-indigo-500" />
      case "bookmark":
        return <Bookmark className="h-5 w-5 text-pink-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-gray-100 text-gray-800"
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
                <Link href="/resources/hacker-news">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Hacker News
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Notifications</h1>
                <p className="text-sm text-gray-600">Stay updated with your activity</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
                <Check className="h-4 w-4 mr-2" />
                Mark All Read
              </Button>
              <Button variant="outline" size="sm" onClick={handleClearAll}>
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-6">
              {notificationTypes.map((type) => (
                <TabsTrigger key={type.id} value={type.id}>
                  {type.name} ({type.count})
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-12">
                  <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Notifications</h3>
                  <p className="text-gray-500 mb-4">
                    {activeTab === "unread" 
                      ? "You're all caught up! No unread notifications."
                      : "No notifications to display."
                    }
                  </p>
                  <Button className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              ) : (
                filteredNotifications.map((notification) => (
                  <Card key={notification.id} className={`border-0 shadow-sm hover:shadow-md transition-all duration-200 ${!notification.read ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        {/* Notification Icon */}
                        <div className="flex-shrink-0">
                          {getNotificationIcon(notification.type)}
                        </div>

                        {/* Notification Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h3 className="text-sm font-medium text-gray-900">{notification.title}</h3>
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                )}
                                <Badge className={getPriorityColor(notification.priority)}>
                                  {notification.priority}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                              <div className="flex items-center space-x-4 text-xs text-gray-500">
                                <span>{notification.time}</span>
                                {notification.userId && (
                                  <span>by {notification.userId}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Notification Actions */}
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleNotificationAction(notification)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleMarkAsRead(notification.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteNotification(notification.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
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
    </div>
  )
}
