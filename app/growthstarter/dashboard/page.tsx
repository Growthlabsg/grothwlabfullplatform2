"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Rocket, 
  Users, 
  DollarSign, 
  Calendar,
  Star,
  TrendingUp,
  Target,
  Lightbulb,
  Zap,
  ArrowRight,
  Heart,
  Eye,
  Share2,
  Clock,
  CheckCircle,
  MessageCircle,
  Globe,
  Shield,
  Gift,
  AlertCircle,
  User,
  Building2,
  Code,
  BarChart3,
  ShoppingCart,
  CreditCard,
  FileText,
  Handshake,
  Briefcase,
  MapPin,
  Bell,
  Settings,
  Edit,
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
  MoreHorizontal,
  ThumbsUp,
  ThumbsDown,
  Reply,
  Send,
  Filter,
  Search,
  Download,
  PieChart,
  TrendingUp as TrendingUpIcon,
  TrendingDown,
  Activity,
  Target as TargetIcon,
  Award,
  Gift as GiftIcon,
  Users as UsersIcon,
  MessageSquare,
  Bell as BellIcon,
  Share as ShareIcon,
  Heart as HeartIcon,
  Eye as EyeIcon,
  BarChart3 as BarChart3Icon,
  Calendar as CalendarIcon,
  Clock as ClockIcon2,
  CheckCircle as CheckCircleIcon,
  AlertCircle as AlertCircleIcon2,
  Star as StarIcon,
  StarOff,
  StarHalf,
  Plus,
  Upload,
  Play,
  MessageSquare as MessageSquareIcon,
  Share2 as Share2Icon,
  Heart as HeartIcon2,
  Eye as EyeIcon2,
  BarChart3 as BarChart3Icon2,
  Calendar as CalendarIcon2,
  Clock as ClockIcon3,
  CheckCircle as CheckCircleIcon2,
  AlertCircle as AlertCircleIcon3,
  Star as StarIcon2,
  StarOff as StarOffIcon,
  StarHalf as StarHalfIcon,
  Star as StarIcon3,
  StarOff as StarOffIcon2,
  StarHalf as StarHalfIcon2,
  Star as StarIcon4,
  StarOff as StarOffIcon3,
  StarHalf as StarHalfIcon3,
  Star as StarIcon5,
  StarOff as StarOffIcon4,
  StarHalf as StarHalfIcon4,
  Star as StarIcon6,
  StarOff as StarOffIcon5,
  StarHalf as StarHalfIcon5,
  Star as StarIcon7,
  StarOff as StarOffIcon6,
  StarHalf as StarHalfIcon6,
  Star as StarIcon8,
  StarOff as StarOffIcon7,
  StarHalf as StarHalfIcon7,
  Star as StarIcon9,
  StarOff as StarOffIcon8,
  StarHalf as StarHalfIcon8,
  Star as StarIcon10,
  StarOff as StarOffIcon9,
  StarHalf as StarHalfIcon9,
  Star as StarIcon11,
  StarOff as StarOffIcon10,
  StarHalf as StarHalfIcon10,
  Star as StarIcon12,
  StarOff as StarOffIcon11,
  StarHalf as StarHalfIcon11,
  Star as StarIcon13,
  StarOff as StarOffIcon12,
  StarHalf as StarHalfIcon12,
  Star as StarIcon14,
  StarOff as StarOffIcon13,
  StarHalf as StarHalfIcon13,
  Star as StarIcon15,
  StarOff as StarOffIcon14,
  StarHalf as StarHalfIcon14,
  Star as StarIcon16,
  StarOff as StarOffIcon15,
  StarHalf as StarHalfIcon15,
  Star as StarIcon17,
  StarOff as StarOffIcon16,
  StarHalf as StarHalfIcon16,
  Star as StarIcon18,
  StarOff as StarOffIcon17,
  StarHalf as StarHalfIcon17,
  Star as StarIcon19,
  StarOff as StarOffIcon18,
  StarHalf as StarHalfIcon18,
  Star as StarIcon20,
  StarOff as StarOffIcon19,
  StarHalf as StarHalfIcon19,
  Star as StarIcon21,
  StarOff as StarOffIcon20,
  StarHalf as StarHalfIcon20,
  Star as StarIcon22,
  StarOff as StarOffIcon21,
  StarHalf as StarHalfIcon21,
  Star as StarIcon23,
  StarOff as StarOffIcon22,
  StarHalf as StarHalfIcon22,
  Star as StarIcon24,
  StarOff as StarOffIcon23,
  StarHalf as StarHalfIcon23,
  Star as StarIcon25,
  StarOff as StarOffIcon24,
  StarHalf as StarHalfIcon24,
  Star as StarIcon26,
  StarOff as StarOffIcon25,
  StarHalf as StarHalfIcon25,
  Star as StarIcon27,
  StarOff as StarOffIcon26,
  StarHalf as StarHalfIcon26,
  Star as StarIcon28,
  StarOff as StarOffIcon27,
  StarHalf as StarHalfIcon27,
  Star as StarIcon29,
  StarOff as StarOffIcon28,
  StarHalf as StarHalfIcon28,
  Star as StarIcon30,
  StarOff as StarOffIcon29,
  StarHalf as StarHalfIcon29,
  Star as StarIcon31,
  StarOff as StarOffIcon30,
  StarHalf as StarHalfIcon30,
  Star as StarIcon32,
  StarOff as StarOffIcon31,
  StarHalf as StarHalfIcon31,
  Star as StarIcon33,
  StarOff as StarOffIcon32,
  StarHalf as StarHalfIcon32,
  Star as StarIcon34,
  StarOff as StarOffIcon33,
  StarHalf as StarHalfIcon33,
  Star as StarIcon35,
  StarOff as StarOffIcon34,
  StarHalf as StarHalfIcon34,
  Star as StarIcon36,
  StarOff as StarOffIcon35,
  StarHalf as StarHalfIcon35,
  Star as StarIcon37,
  StarOff as StarOffIcon36,
  StarHalf as StarHalfIcon36,
  Star as StarIcon38,
  StarOff as StarOffIcon37,
  StarHalf as StarHalfIcon37,
  Star as StarIcon39,
  StarOff as StarOffIcon38,
  StarHalf as StarHalfIcon38,
  Star as StarIcon40,
  StarOff as StarOffIcon39,
  StarHalf as StarHalfIcon39,
  Star as StarIcon41,
  StarOff as StarOffIcon40,
  StarHalf as StarHalfIcon40,
  Star as StarIcon42,
  StarOff as StarOffIcon41,
  StarHalf as StarHalfIcon41,
  Star as StarIcon43,
  StarOff as StarOffIcon42,
  StarHalf as StarHalfIcon42,
  Star as StarIcon44,
  StarOff as StarOffIcon43,
  StarHalf as StarHalfIcon43,
  Star as StarIcon45,
  StarOff as StarOffIcon44,
  StarHalf as StarHalfIcon44,
  Star as StarIcon46,
  StarOff as StarOffIcon45,
  StarHalf as StarHalfIcon45,
  Star as StarIcon47,
  StarOff as StarOffIcon46,
  StarHalf as StarHalfIcon46,
  Star as StarIcon48,
  StarOff as StarOffIcon47,
  StarHalf as StarHalfIcon47,
  Star as StarIcon49,
  StarOff as StarOffIcon48,
  StarHalf as StarHalfIcon48,
  Star as StarIcon50,
  StarOff as StarOffIcon49,
  StarHalf as StarHalfIcon49,
  Star as StarIcon51,
  StarOff as StarOffIcon50,
  StarHalf as StarHalfIcon50,
  Star as StarIcon52,
  StarOff as StarOffIcon51,
  StarHalf as StarHalfIcon51,
  Star as StarIcon53,
  StarOff as StarOffIcon52,
  StarHalf as StarHalfIcon52,
  Star as StarIcon54,
  StarOff as StarOffIcon53,
  StarHalf as StarHalfIcon53,
  Star as StarIcon55,
  StarOff as StarOffIcon54,
  StarHalf as StarHalfIcon54,
  Star as StarIcon56,
  StarOff as StarOffIcon55,
  StarHalf as StarHalfIcon55,
  Star as StarIcon57,
  StarOff as StarOffIcon56,
  StarHalf as StarHalfIcon56,
  Star as StarIcon58,
  StarOff as StarOffIcon57,
  StarHalf as StarHalfIcon57,
  Star as StarIcon59,
  StarOff as StarOffIcon58,
  StarHalf as StarHalfIcon58,
  Star as StarIcon60,
  StarOff as StarOffIcon59,
  StarHalf as StarHalfIcon59,
  Star as StarIcon61,
  StarOff as StarOffIcon60,
  StarHalf as StarHalfIcon60,
  Star as StarIcon62,
  StarOff as StarOffIcon61,
  StarHalf as StarHalfIcon61,
  Star as StarIcon63,
  StarOff as StarOffIcon62,
  StarHalf as StarHalfIcon62,
  Star as StarIcon64,
  StarOff as StarOffIcon63,
  StarHalf as StarHalfIcon63,
  Star as StarIcon65,
  StarOff as StarOffIcon64,
  StarHalf as StarHalfIcon64,
  Star as StarIcon66,
  StarOff as StarOffIcon65,
  StarHalf as StarHalfIcon65,
  Star as StarIcon67,
  StarOff as StarOffIcon66,
  StarHalf as StarHalfIcon66,
  Star as StarIcon68,
  StarOff as StarOffIcon67,
  StarHalf as StarHalfIcon67,
  Star as StarIcon69,
  StarOff as StarOffIcon68,
  StarHalf as StarHalfIcon68,
  Star as StarIcon70,
  StarOff as StarOffIcon69,
  StarHalf as StarHalfIcon69,
  Star as StarIcon71,
  StarOff as StarOffIcon70,
  StarHalf as StarHalfIcon70,
  Star as StarIcon72,
  StarOff as StarOffIcon71,
  StarHalf as StarHalfIcon71,
  Star as StarIcon73,
  StarOff as StarOffIcon72,
  StarHalf as StarHalfIcon72,
  Star as StarIcon74,
  StarOff as StarOffIcon73,
  StarHalf as StarHalfIcon73,
  Star as StarIcon75,
  StarOff as StarOffIcon74,
  StarHalf as StarHalfIcon74,
  Star as StarIcon76,
  StarOff as StarOffIcon75,
  StarHalf as StarHalfIcon75,
  Star as StarIcon77,
  StarOff as StarOffIcon76,
  StarHalf as StarHalfIcon76,
  Star as StarIcon78,
  StarOff as StarOffIcon77,
  StarHalf as StarHalfIcon77,
  Star as StarIcon79,
  StarOff as StarOffIcon78,
  StarHalf as StarHalfIcon78,
  Star as StarIcon80,
  StarOff as StarOffIcon79,
  StarHalf as StarHalfIcon79,
  Star as StarIcon81,
  StarOff as StarOffIcon80,
  StarHalf as StarHalfIcon80,
  Star as StarIcon82,
  StarOff as StarOffIcon81,
  StarHalf as StarHalfIcon81,
  Star as StarIcon83,
  StarOff as StarOffIcon82,
  StarHalf as StarHalfIcon82,
  Star as StarIcon84,
  StarOff as StarOffIcon83,
  StarHalf as StarHalfIcon83,
  Star as StarIcon85,
  StarOff as StarOffIcon84,
  StarHalf as StarHalfIcon84,
  Star as StarIcon86,
  StarOff as StarOffIcon85,
  StarHalf as StarHalfIcon85,
  Star as StarIcon87,
  StarOff as StarOffIcon86,
  StarHalf as StarHalfIcon86,
  Star as StarIcon88,
  StarOff as StarOffIcon87,
  StarHalf as StarHalfIcon87,
  Star as StarIcon89,
  StarOff as StarOffIcon88,
  StarHalf as StarHalfIcon88,
  Star as StarIcon90,
  StarOff as StarOffIcon89,
  StarHalf as StarHalfIcon89,
  Star as StarIcon91,
  StarOff as StarOffIcon90,
  StarHalf as StarHalfIcon90,
  Star as StarIcon92,
  StarOff as StarOffIcon91,
  StarHalf as StarHalfIcon91,
  Star as StarIcon93,
  StarOff as StarOffIcon92,
  StarHalf as StarHalfIcon92,
  Star as StarIcon94,
  StarOff as StarOffIcon93,
  StarHalf as StarHalfIcon93,
  Star as StarIcon95,
  StarOff as StarOffIcon94,
  StarHalf as StarHalfIcon94,
  Star as StarIcon96,
  StarOff as StarOffIcon95,
  StarHalf as StarHalfIcon95,
  Star as StarIcon97,
  StarOff as StarOffIcon96,
  StarHalf as StarHalfIcon96,
  Star as StarIcon98,
  StarOff as StarOffIcon97,
  StarHalf as StarHalfIcon97,
  Star as StarIcon99,
  StarOff as StarOffIcon98,
  StarHalf as StarHalfIcon98,
  Star as StarIcon100,
  StarOff as StarOffIcon99,
  StarHalf as StarHalfIcon99
} from "lucide-react"
export default function CampaignDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedCampaign, setSelectedCampaign] = useState("all")
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [loading, user, router])

  if (loading || !user) {
    return <div>Loading...</div>
  }

  // Mock campaigns data
  const campaigns = [
    {
      id: 1,
      title: "EcoTech - Smart Home Energy Monitor",
      status: "active",
      goal: 25000,
      raised: 18750,
      backers: 234,
      daysLeft: 12,
      progress: 75,
      category: "Technology",
      image: "/ecotech-project.jpg",
      kpis: {
        conversionRate: 12.5,
        avgPledge: 80.12,
        socialShares: 156,
        emailSignups: 89,
        websiteVisits: 1247,
        engagementRate: 8.7
      },
      budget: {
        marketing: 35,
        development: 40,
        manufacturing: 15,
        operations: 10
      },
      notifications: [
        { id: 1, type: "backer", message: "New backer: John Doe pledged $100", time: "2 hours ago" },
        { id: 2, type: "comment", message: "New comment on your campaign", time: "4 hours ago" },
        { id: 3, type: "milestone", message: "75% funding milestone reached!", time: "1 day ago" }
      ]
    },
    {
      id: 2,
      title: "Artisan Coffee Roasting Kit",
      status: "funded",
      goal: 15000,
      raised: 22000,
      backers: 189,
      daysLeft: 0,
      progress: 147,
      category: "Creative",
      image: "/coffee-roasting-kit.jpg",
      kpis: {
        conversionRate: 15.2,
        avgPledge: 116.40,
        socialShares: 203,
        emailSignups: 134,
        websiteVisits: 2156,
        engagementRate: 12.3
      },
      budget: {
        marketing: 30,
        development: 25,
        manufacturing: 35,
        operations: 10
      },
      notifications: [
        { id: 1, type: "funded", message: "Campaign successfully funded!", time: "3 days ago" },
        { id: 2, type: "milestone", message: "100% funding milestone reached!", time: "5 days ago" }
      ]
    },
    {
      id: 3,
      title: "Digital Literacy for Rural Communities",
      status: "active",
      goal: 8000,
      raised: 6500,
      backers: 89,
      daysLeft: 18,
      progress: 81,
      category: "Social Impact",
      image: "/digital-literacy.jpg",
      kpis: {
        conversionRate: 8.9,
        avgPledge: 73.03,
        socialShares: 78,
        emailSignups: 45,
        websiteVisits: 567,
        engagementRate: 6.2
      },
      budget: {
        marketing: 40,
        development: 20,
        implementation: 30,
        operations: 10
      },
      notifications: [
        { id: 1, type: "backer", message: "New backer: Community Collective pledged $500", time: "1 hour ago" },
        { id: 2, type: "comment", message: "New comment on your campaign", time: "6 hours ago" }
      ]
    }
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800"
      case "funded": return "bg-blue-100 text-blue-800"
      case "draft": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <Activity className="w-4 h-4" />
      case "funded": return <CheckCircle className="w-4 h-4" />
      case "draft": return <Edit className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const renderCampaignCard = (campaign: any) => (
    <Card key={campaign.id} className="hover:shadow-lg transition-all duration-200">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Badge className={getStatusColor(campaign.status)}>
              {getStatusIcon(campaign.status)}
              {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
            </Badge>
            <Badge variant="outline">{campaign.category}</Badge>
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
        <CardTitle className="text-lg">{campaign.title}</CardTitle>
        <p className="text-sm text-muted-foreground">
          {formatCurrency(campaign.raised)} raised of {formatCurrency(campaign.goal)} goal
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{campaign.progress}%</span>
            </div>
            <Progress value={campaign.progress} className="h-2" />
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-lg font-bold text-[#0F7377]">{campaign.backers}</p>
              <p className="text-xs text-muted-foreground">Backers</p>
            </div>
            <div>
              <p className="text-lg font-bold text-[#0F7377]">{campaign.daysLeft}</p>
              <p className="text-xs text-muted-foreground">Days Left</p>
            </div>
            <div>
              <p className="text-lg font-bold text-[#0F7377]">{campaign.kpis.avgPledge}</p>
              <p className="text-xs text-muted-foreground">Avg Pledge</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button size="sm" className="flex-1">
              <Eye className="w-4 h-4 mr-2" />
              View Campaign
            </Button>
            <Button size="sm" variant="outline">
              <Edit className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderKPICard = (title: string, value: string | number, icon: any, change?: string) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {change && (
              <p className="text-xs text-green-600 mt-1">{change}</p>
            )}
          </div>
          <div className="p-2 bg-[#0F7377]/10 rounded-lg">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderNotificationCard = (notification: any) => (
    <Card key={notification?.id} className="mb-3">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-[#0F7377]/10 rounded-lg">
            <Bell className="w-4 h-4 text-[#0F7377]" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{notification?.message}</p>
            <p className="text-xs text-muted-foreground">{notification?.time}</p>
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#1E293B]">Campaign Dashboard</h1>
              <p className="text-muted-foreground">Manage your crowdfunding campaigns</p>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create New Campaign
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {renderKPICard("Total Raised", formatCurrency(47250), <DollarSign className="w-6 h-6 text-[#0F7377]" />, "+18% this month")}
              {renderKPICard("Active Campaigns", "2", <Rocket className="w-6 h-6 text-[#0F7377]" />, "+1 this week")}
              {renderKPICard("Total Backers", "512", <Users className="w-6 h-6 text-[#0F7377]" />, "+23 this week")}
              {renderKPICard("Avg Conversion", "12.2%", <Target className="w-6 h-6 text-[#0F7377]" />, "+2.1% this month")}
            </div>

            {/* Recent Campaigns */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Campaigns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {campaigns.slice(0, 3).map(renderCampaignCard)}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Button variant="outline" className="h-20 flex-col">
                    <Plus className="w-6 h-6 mb-2" />
                    Create Campaign
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <BarChart3 className="w-6 h-6 mb-2" />
                    View Analytics
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <MessageSquare className="w-6 h-6 mb-2" />
                    Respond to Comments
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Share2 className="w-6 h-6 mb-2" />
                    Share Campaign
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#1E293B]">All Campaigns</h2>
                <p className="text-muted-foreground">Manage and track your crowdfunding campaigns</p>
              </div>
              <div className="flex gap-2">
                <Input placeholder="Search campaigns..." className="w-64" />
                <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="funded">Funded</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {campaigns.map(renderCampaignCard)}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Performance Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Performance Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {campaigns.map((campaign) => (
                      <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{campaign.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {campaign.progress}% funded • {campaign.backers} backers
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{formatCurrency(campaign.raised)}</p>
                          <p className="text-xs text-muted-foreground">raised</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Budget Allocation */}
              <Card>
                <CardHeader>
                  <CardTitle>Budget Allocation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {(campaigns[0] ? campaigns[0].budget : undefined) && Object.entries((campaigns[0] ? campaigns[0].budget : undefined)).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="capitalize">{key}</span>
                        <div className="flex items-center gap-2">
                          <Progress value={value as number} className="w-20 h-2" />
                          <span className="text-sm font-medium">{value}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed KPIs */}
            <Card>
              <CardHeader>
                <CardTitle>Detailed KPIs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {(campaigns[0] ? campaigns[0].kpis : undefined) && Object.entries((campaigns[0] ? campaigns[0].kpis : undefined)).map(([key, value]) => (
                    <div key={key} className="text-center p-4 border rounded-lg">
                      <p className="text-sm text-muted-foreground capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="text-2xl font-bold text-[#0F7377]">{value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#1E293B]">Notifications</h2>
                <p className="text-muted-foreground">Stay updated on your campaign activities</p>
              </div>
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Notification Settings
              </Button>
            </div>

            <div className="space-y-4">
              {campaigns.flatMap(campaign => campaign.notifications).map(renderNotificationCard)}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Email Notifications</label>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">New backer notifications</span>
                        <Button variant="outline" size="sm">Enabled</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Comment notifications</span>
                        <Button variant="outline" size="sm">Enabled</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Milestone notifications</span>
                        <Button variant="outline" size="sm">Enabled</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 