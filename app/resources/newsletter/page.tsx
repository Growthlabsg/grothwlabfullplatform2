"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft,
  Mail,
  Send,
  Search,
  Filter,
  Calendar,
  Clock,
  Eye,
  ThumbsUp,
  Share2,
  Bookmark,
  BookmarkCheck,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  Users,
  TrendingUp,
  BarChart3,
  Target,
  Star,
  Download,
  ExternalLink,
  Bell,
  BellOff,
  Settings,
  User,
  Globe,
  Lock,
  Unlock,
  CheckCircle,
  AlertCircle,
  Info,
  FileText,
  Image,
  Video,
  Link as LinkIcon,
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
  Heart,
  MessageCircle,
  Reply,
  Flag,
  Archive,
  Tag,
  Folder,
  FolderOpen,
  Upload,
  RefreshCw,
  Save,
  Copy,
  Cut,
  Paste,
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
  XCircle,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Lightbulb,
  Zap,
  Award,
  Trophy,
  Medal,
  Crown,
  Gem,
  Sparkles
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function NewsletterPage() {
  const { toast } = useToast()
  const [isMobile, setIsMobile] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showCreateNewsletter, setShowCreateNewsletter] = useState(false)
  const [showNewsletterSettings, setShowNewsletterSettings] = useState(false)
  const [showSubscribers, setShowSubscribers] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [showTemplates, setShowTemplates] = useState(false)
  const [showCampaigns, setShowCampaigns] = useState(false)
  const [showSegments, setShowSegments] = useState(false)
  const [showAutomation, setShowAutomation] = useState(false)
  const [showIntegrations, setShowIntegrations] = useState(false)
  const [showReports, setShowReports] = useState(false)
  const [showHelp, setShowHelp] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const stats = [
    { label: "Total Subscribers", value: "12,547", icon: Users, change: "+12.5%", trend: "up" },
    { label: "Open Rate", value: "24.8%", icon: Eye, change: "+2.1%", trend: "up" },
    { label: "Click Rate", value: "8.3%", icon: Target, change: "+0.8%", trend: "up" },
    { label: "Unsubscribe Rate", value: "0.3%", icon: User, change: "-0.1%", trend: "down" },
    { label: "Newsletters Sent", value: "156", icon: Send, change: "+23", trend: "up" },
    { label: "Avg. Engagement", value: "18.7%", icon: TrendingUp, change: "+3.2%", trend: "up" }
  ]

  const categories = [
    { id: "all", name: "All Newsletters", count: 156 },
    { id: "weekly", name: "Weekly Updates", count: 52 },
    { id: "monthly", name: "Monthly Reports", count: 12 },
    { id: "special", name: "Special Events", count: 8 },
    { id: "product", name: "Product Updates", count: 24 },
    { id: "industry", name: "Industry News", count: 36 },
    { id: "tips", name: "Tips & Tricks", count: 20 },
    { id: "announcements", name: "Announcements", count: 4 }
  ]

  const newsletters = [
    {
      id: 1,
      title: "Weekly Startup Digest",
      description: "Your weekly roundup of startup news, funding updates, and industry insights",
      category: "weekly",
      status: "published",
      publishDate: "2024-01-15",
      subscribers: 1247,
      openRate: 28.5,
      clickRate: 9.2,
      unsubscribes: 3,
      isBookmarked: false,
      isDraft: false,
      tags: ["Startup", "Funding", "Industry"],
      author: "GrowthLab Team",
      lastModified: "2024-01-15T10:30:00Z"
    },
    {
      id: 2,
      title: "Product Launch Announcement",
      description: "Exciting news about our new features and platform updates",
      category: "announcements",
      status: "scheduled",
      publishDate: "2024-01-20",
      subscribers: 1247,
      openRate: 0,
      clickRate: 0,
      unsubscribes: 0,
      isBookmarked: true,
      isDraft: false,
      tags: ["Product", "Announcement", "Update"],
      author: "Product Team",
      lastModified: "2024-01-18T14:20:00Z"
    },
    {
      id: 3,
      title: "Funding Roundup - January 2024",
      description: "Comprehensive analysis of startup funding trends and major deals",
      category: "monthly",
      status: "published",
      publishDate: "2024-01-10",
      subscribers: 1247,
      openRate: 32.1,
      clickRate: 12.8,
      unsubscribes: 1,
      isBookmarked: false,
      isDraft: false,
      tags: ["Funding", "Analysis", "Trends"],
      author: "Research Team",
      lastModified: "2024-01-10T09:15:00Z"
    },
    {
      id: 4,
      title: "Growth Hacking Tips",
      description: "Proven strategies for scaling your startup and acquiring customers",
      category: "tips",
      status: "draft",
      publishDate: null,
      subscribers: 0,
      openRate: 0,
      clickRate: 0,
      unsubscribes: 0,
      isBookmarked: true,
      isDraft: true,
      tags: ["Growth", "Marketing", "Tips"],
      author: "Growth Team",
      lastModified: "2024-01-19T16:45:00Z"
    }
  ]

  const templates = [
    {
      id: 1,
      name: "Weekly Digest Template",
      description: "Clean, professional template for weekly newsletters",
      category: "weekly",
      preview: "/newsletter-templates/weekly-digest.jpg",
      isPopular: true,
      downloads: 234,
      rating: 4.8
    },
    {
      id: 2,
      name: "Product Announcement",
      description: "Eye-catching template for product launches and updates",
      category: "announcements",
      preview: "/newsletter-templates/product-announcement.jpg",
      isPopular: false,
      downloads: 156,
      rating: 4.6
    },
    {
      id: 3,
      name: "Event Invitation",
      description: "Engaging template for event invitations and reminders",
      category: "special",
      preview: "/newsletter-templates/event-invitation.jpg",
      isPopular: true,
      downloads: 189,
      rating: 4.9
    }
  ]

  const campaigns = [
    {
      id: 1,
      name: "Welcome Series",
      description: "Automated welcome emails for new subscribers",
      status: "active",
      subscribers: 1247,
      openRate: 45.2,
      clickRate: 18.7,
      lastSent: "2024-01-15",
      nextSend: "2024-01-22"
    },
    {
      id: 2,
      name: "Re-engagement Campaign",
      description: "Win back inactive subscribers with special offers",
      status: "paused",
      subscribers: 234,
      openRate: 12.3,
      clickRate: 4.1,
      lastSent: "2024-01-10",
      nextSend: null
    }
  ]

  const segments = [
    {
      id: 1,
      name: "Active Subscribers",
      description: "Subscribers who opened emails in the last 30 days",
      count: 892,
      criteria: "opened_email_last_30_days",
      isActive: true
    },
    {
      id: 2,
      name: "High Value Users",
      description: "Subscribers with high engagement and conversion rates",
      count: 234,
      criteria: "high_engagement_and_conversion",
      isActive: true
    },
    {
      id: 3,
      name: "Inactive Subscribers",
      description: "Subscribers who haven't opened emails in 90+ days",
      count: 121,
      criteria: "no_opens_90_days",
      isActive: false
    }
  ]

  const filteredNewsletters = newsletters.filter(newsletter => {
    const matchesSearch = newsletter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         newsletter.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         newsletter.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || newsletter.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleCreateNewsletter = () => {
    toast({
      title: "Creating Newsletter",
      description: "Redirecting to newsletter creation page...",
    })
  }

  const handleBookmark = (newsletterId: number) => {
    toast({
      title: "Bookmarked",
      description: "Newsletter added to your bookmarks.",
    })
  }

  const handleShare = (newsletterId: number) => {
    toast({
      title: "Shared",
      description: "Newsletter link copied to clipboard.",
    })
  }

  const handleDuplicate = (newsletterId: number) => {
    toast({
      title: "Duplicated",
      description: "Newsletter duplicated successfully.",
    })
  }

  const handleDelete = (newsletterId: number) => {
    toast({
      title: "Deleted",
      description: "Newsletter deleted successfully.",
    })
  }

  const handlePublish = (newsletterId: number) => {
    toast({
      title: "Published",
      description: "Newsletter published successfully.",
    })
  }

  const handleSchedule = (newsletterId: number) => {
    toast({
      title: "Scheduled",
      description: "Newsletter scheduled for publication.",
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
                  Back to Resources
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Newsletter Management</h1>
                <p className="text-sm text-gray-600">Create, manage, and analyze your newsletters</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowCreateNewsletter(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Newsletter
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowNewsletterSettings(true)}>
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-xs ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </p>
                  </div>
                  <div className="p-2 bg-[#0F7377]/10 rounded-lg">
                    <stat.icon className="h-6 w-6 text-[#0F7377]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="newsletters">Newsletters</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="segments">Segments</TabsTrigger>
            <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Newsletters */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Newsletters</CardTitle>
                  <CardDescription>Your latest newsletter activity</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {newsletters.slice(0, 3).map((newsletter) => (
                    <div key={newsletter.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold">{newsletter.title}</h4>
                        <p className="text-sm text-gray-600">{newsletter.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <span>{newsletter.publishDate}</span>
                          <span>{newsletter.subscribers} subscribers</span>
                          <span>{newsletter.openRate}% open rate</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={newsletter.status === 'published' ? 'default' : 'secondary'}>
                          {newsletter.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common newsletter tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" onClick={() => setShowCreateNewsletter(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Newsletter
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => setShowTemplates(true)}>
                    <FileText className="h-4 w-4 mr-2" />
                    Browse Templates
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => setShowSubscribers(true)}>
                    <Users className="h-4 w-4 mr-2" />
                    Manage Subscribers
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => setShowAnalytics(true)}>
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Newsletters Tab */}
          <TabsContent value="newsletters" className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search newsletters..."
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

            {/* Newsletters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNewsletters.map((newsletter) => (
                <Card key={newsletter.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{newsletter.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{newsletter.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={newsletter.status === 'published' ? 'default' : 'secondary'}>
                          {newsletter.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Category</span>
                        <Badge variant="outline">{newsletter.category}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Subscribers</span>
                        <span>{newsletter.subscribers.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Open Rate</span>
                        <span>{newsletter.openRate}%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Click Rate</span>
                        <span>{newsletter.clickRate}%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Publish Date</span>
                        <span>{newsletter.publishDate || 'Not scheduled'}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {newsletter.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handlePublish(newsletter.id)}
                          className="bg-[#0F7377] hover:bg-[#0F7377]/90"
                        >
                          <Send className="h-4 w-4 mr-1" />
                          {newsletter.status === 'published' ? 'View' : 'Publish'}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleBookmark(newsletter.id)}
                        >
                          {newsletter.isBookmarked ? (
                            <BookmarkCheck className="h-4 w-4" />
                          ) : (
                            <Bookmark className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleShare(newsletter.id)}
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <Card key={template.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{template.name}</h3>
                        <p className="text-gray-600 text-sm mb-3">{template.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {template.isPopular && (
                          <Badge className="bg-[#F59E0B] text-white">Popular</Badge>
                        )}
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Category</span>
                        <Badge variant="outline">{template.category}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Downloads</span>
                        <span>{template.downloads.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Rating</span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span>{template.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                        <Eye className="h-4 w-4 mr-1" />
                        Preview
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Use Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {campaigns.map((campaign) => (
                <Card key={campaign.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{campaign.name}</h3>
                        <p className="text-gray-600 text-sm mb-3">{campaign.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'}>
                          {campaign.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Subscribers</span>
                        <span>{campaign.subscribers.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Open Rate</span>
                        <span>{campaign.openRate}%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Click Rate</span>
                        <span>{campaign.clickRate}%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Last Sent</span>
                        <span>{campaign.lastSent}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Next Send</span>
                        <span>{campaign.nextSend || 'Not scheduled'}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit Campaign
                      </Button>
                      <Button variant="outline" size="sm">
                        <BarChart3 className="h-4 w-4 mr-1" />
                        View Analytics
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Segments Tab */}
          <TabsContent value="segments" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {segments.map((segment) => (
                <Card key={segment.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{segment.name}</h3>
                        <p className="text-gray-600 text-sm mb-3">{segment.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={segment.isActive ? 'default' : 'secondary'}>
                          {segment.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Subscribers</span>
                        <span>{segment.count.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Criteria</span>
                        <span className="text-xs">{segment.criteria}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit Segment
                      </Button>
                      <Button variant="outline" size="sm">
                        <Users className="h-4 w-4 mr-1" />
                        View Subscribers
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Subscribers Tab */}
          <TabsContent value="subscribers" className="space-y-6">
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Subscriber Management</h3>
              <p className="text-gray-500 mb-4">Manage your newsletter subscribers and segments</p>
              <Button className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                <Users className="h-4 w-4 mr-2" />
                Manage Subscribers
              </Button>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="text-center py-12">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Newsletter Analytics</h3>
              <p className="text-gray-500 mb-4">Detailed insights into your newsletter performance</p>
              <Button className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="text-center py-12">
              <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Newsletter Settings</h3>
              <p className="text-gray-500 mb-4">Configure your newsletter preferences and integrations</p>
              <Button className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                <Settings className="h-4 w-4 mr-2" />
                Open Settings
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
