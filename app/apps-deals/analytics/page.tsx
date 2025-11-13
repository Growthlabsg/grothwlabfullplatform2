"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft,
  BarChart3,
  PieChart,
  Activity,
  TrendingUp,
  TrendingDown,
  Users,
  Download,
  Eye,
  Heart,
  Star,
  AppWindow,
  DollarSign,
  Calendar,
  Clock,
  Target,
  Award,
  Trophy,
  Medal,
  Crown,
  Gem,
  Sparkles,
  MousePointer,
  RefreshCw,
  Settings,
  HelpCircle,
  Info,
  AlertCircle,
  CheckCircle,
  XCircle,
  Lightbulb,
  Zap,
  Rocket,
  Building2,
  Code,
  Gift,
  MapPin,
  Search,
  Filter,
  Plus,
  Upload,
  Handshake,
  Share2,
  Bookmark,
  BookmarkCheck,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Archive,
  Tag,
  Folder,
  FolderOpen,
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
  Code as CodeIcon,
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
  ThumbsUp as ThumbsUpIcon,
  ThumbsDown as ThumbsDownIcon,
  Briefcase,
  GraduationCap,
  BookOpen,
  Database,
  Server,
  Cloud,
  Wifi,
  WifiOff,
  Image,
  Video,
  Link as LinkIcon,
  ChevronUp,
  X,
  MessageSquare,
  Reply,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw,
  RotateCw,
  LineChart,
  BarChart
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function AppsDealsAnalyticsPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("overview")
  const [timeRange, setTimeRange] = useState("30d")

  const analytics = {
    totalApps: 156,
    totalDeals: 89,
    totalUsers: 2500,
    totalSavings: 2500000,
    monthlyGrowth: 12.5,
    userEngagement: 78.3,
    conversionRate: 23.4,
    bounceRate: 22.1,
    avgTimeOnPage: 4.2,
    returnVisitors: 65.2
  }

  const topApps = [
    { name: "GrowthLab CRM Pro", downloads: 1247, rating: 4.8, category: "CRM" },
    { name: "Startup Analytics Dashboard", downloads: 892, rating: 4.9, category: "Analytics" },
    { name: "Marketing Automation Suite", downloads: 567, rating: 4.7, category: "Marketing" },
    { name: "Financial Planning Tool", downloads: 234, rating: 4.6, category: "Finance" }
  ]

  const topDeals = [
    { name: "AWS Cloud Credits", views: 1247, likes: 156, value: 10000, category: "Cloud Services" },
    { name: "Stripe Payment Processing", views: 892, likes: 203, value: 5000, category: "Payments" },
    { name: "Google Cloud Platform", views: 567, likes: 89, value: 300, category: "Cloud Services" },
    { name: "HubSpot CRM", views: 1234, likes: 234, value: 0, category: "CRM" }
  ]

  const categoryStats = [
    { name: "CRM", apps: 45, deals: 12, totalValue: 150000 },
    { name: "Analytics", apps: 32, deals: 8, totalValue: 120000 },
    { name: "Marketing", apps: 28, deals: 15, totalValue: 180000 },
    { name: "Finance", apps: 25, deals: 10, totalValue: 90000 },
    { name: "Cloud Services", apps: 18, deals: 25, totalValue: 300000 },
    { name: "Payments", apps: 8, deals: 19, totalValue: 200000 }
  ]

  const userEngagement = [
    { metric: "Page Views", value: "45,678", change: "+12.5%", trend: "up" },
    { metric: "Unique Visitors", value: "23,456", change: "+8.3%", trend: "up" },
    { metric: "Download Rate", value: "23.4%", change: "+2.1%", trend: "up" },
    { metric: "Bounce Rate", value: "22.1%", change: "-1.2%", trend: "down" },
    { metric: "Avg. Time on Page", value: "4.2 min", change: "+0.3 min", trend: "up" },
    { metric: "Return Visitors", value: "65.2%", change: "+5.7%", trend: "up" }
  ]

  const handleExportData = () => {
    toast({
      title: "Data Exported",
      description: "Analytics data has been exported successfully.",
    })
  }

  const handleRefreshData = () => {
    toast({
      title: "Data Refreshed",
      description: "Analytics data has been refreshed.",
    })
  }

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Apps</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.totalApps}</p>
                <p className="text-xs text-green-600">+{analytics.monthlyGrowth}% this month</p>
              </div>
              <div className="p-2 bg-[#0F7377]/10 rounded-lg">
                <AppWindow className="h-6 w-6 text-[#0F7377]" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Deals</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.totalDeals}</p>
                <p className="text-xs text-green-600">+8.3% this month</p>
              </div>
              <div className="p-2 bg-[#F59E0B]/10 rounded-lg">
                <DollarSign className="h-6 w-6 text-[#F59E0B]" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.totalUsers.toLocaleString()}</p>
                <p className="text-xs text-green-600">+12.5% this month</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Savings</p>
                <p className="text-2xl font-bold text-gray-900">${(analytics.totalSavings / 1000000).toFixed(1)}M</p>
                <p className="text-xs text-green-600">+15.2% this month</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Trophy className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Engagement Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userEngagement.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{metric.metric}</p>
                  <p className="text-xl font-bold text-gray-900">{metric.value}</p>
                  <p className={`text-xs ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.change}
                  </p>
                </div>
                <div className={`p-2 rounded-lg ${metric.trend === 'up' ? 'bg-green-100' : 'bg-red-100'}`}>
                  {metric.trend === 'up' ? (
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-red-600" />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Top Performing Apps */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Apps</CardTitle>
          <CardDescription>Apps with highest downloads and ratings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topApps.map((app, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <AppWindow className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{app.name}</h4>
                    <p className="text-sm text-gray-600">{app.category} • {app.downloads} downloads</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">Rating: {app.rating}</p>
                    <p className="text-xs text-gray-500">{app.downloads} downloads</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderAppsTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>App Performance</CardTitle>
          <CardDescription>Detailed performance metrics for all apps</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">App</th>
                  <th className="text-left py-2">Category</th>
                  <th className="text-left py-2">Downloads</th>
                  <th className="text-left py-2">Rating</th>
                  <th className="text-left py-2">Views</th>
                </tr>
              </thead>
              <tbody>
                {topApps.map((app, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3">
                      <div>
                        <p className="font-medium">{app.name}</p>
                      </div>
                    </td>
                    <td className="py-3">
                      <Badge variant="outline">{app.category}</Badge>
                    </td>
                    <td className="py-3">{app.downloads.toLocaleString()}</td>
                    <td className="py-3">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span>{app.rating}</span>
                      </div>
                    </td>
                    <td className="py-3">{Math.floor(app.downloads * 2.3).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderDealsTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Deal Performance</CardTitle>
          <CardDescription>Detailed performance metrics for all deals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Deal</th>
                  <th className="text-left py-2">Category</th>
                  <th className="text-left py-2">Value</th>
                  <th className="text-left py-2">Views</th>
                  <th className="text-left py-2">Likes</th>
                </tr>
              </thead>
              <tbody>
                {topDeals.map((deal, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3">
                      <div>
                        <p className="font-medium">{deal.name}</p>
                      </div>
                    </td>
                    <td className="py-3">
                      <Badge variant="outline">{deal.category}</Badge>
                    </td>
                    <td className="py-3">${deal.value.toLocaleString()}</td>
                    <td className="py-3">{deal.views.toLocaleString()}</td>
                    <td className="py-3">{deal.likes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderCategoriesTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Category Performance</CardTitle>
          <CardDescription>Performance metrics by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categoryStats.map((category, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Folder className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{category.name}</h4>
                    <p className="text-sm text-gray-600">{category.apps} apps, {category.deals} deals</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">${(category.totalValue / 1000).toFixed(0)}K</p>
                  <p className="text-xs text-gray-500">Total Value</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/apps-deals">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Apps & Deals
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Analytics</h1>
                <p className="text-sm text-gray-600">Comprehensive analytics and insights</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleRefreshData}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportData}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="apps">Apps</TabsTrigger>
            <TabsTrigger value="deals">Deals</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {renderOverviewTab()}
          </TabsContent>

          <TabsContent value="apps" className="space-y-6">
            {renderAppsTab()}
          </TabsContent>

          <TabsContent value="deals" className="space-y-6">
            {renderDealsTab()}
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            {renderCategoriesTab()}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
