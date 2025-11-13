"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  ArrowLeft,
  Search,
  Filter,
  FileText,
  Download,
  Eye,
  Star,
  Heart,
  Share2,
  Bookmark,
  BookmarkCheck,
  MoreHorizontal,
  Settings,
  HelpCircle,
  Info,
  AlertCircle,
  CheckCircle,
  XCircle,
  Lightbulb,
  Zap,
  Rocket,
  Target,
  TrendingUp,
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
  Calendar,
  Clock,
  Mail,
  Send,
  Upload,
  Plus,
  Edit,
  Trash2,
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
  MessageSquare,
  Reply,
  Flag,
  Archive,
  Tag,
  Folder,
  FolderOpen,
  RefreshCw,
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
  Code,
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
  ThumbsUp,
  ThumbsDown,
  Globe,
  Phone,
  MapPin,
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
  Users,
  MessageCircle as MessageCircleIcon,
  TrendingDown,
  PieChart,
  Activity,
  LineChart,
  BarChart,
  TrendingUp as TrendingUpIcon
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function ReportAnalyticsPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("overview")
  const [timeRange, setTimeRange] = useState("30d")
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const analytics = {
    totalReports: 156,
    totalDownloads: 12450,
    totalViews: 45678,
    averageRating: 4.7,
    monthlyGrowth: 12.5,
    userEngagement: 78.3,
    topCategory: "Financial Reports",
    topReport: "Q4 2024 Startup Funding Report",
    conversionRate: 23.4,
    bounceRate: 22.1,
    avgTimeOnPage: 4.2,
    returnVisitors: 65.2
  }

  const reportPerformance = [
    {
      id: 1,
      title: "Q4 2024 Startup Funding Report",
      downloads: 1247,
      views: 2891,
      rating: 4.8,
      revenue: 0,
      growth: 15.2,
      category: "Financial"
    },
    {
      id: 2,
      title: "AI Market Trends 2024",
      downloads: 892,
      views: 2134,
      rating: 4.7,
      revenue: 0,
      growth: 8.3,
      category: "Market"
    },
    {
      id: 3,
      title: "Startup Ecosystem Report 2024",
      downloads: 567,
      views: 1876,
      rating: 4.9,
      revenue: 0,
      growth: 22.1,
      category: "Startup"
    },
    {
      id: 4,
      title: "Fintech Industry Analysis",
      downloads: 743,
      views: 1456,
      rating: 4.6,
      revenue: 0,
      growth: 5.7,
      category: "Industry"
    },
    {
      id: 5,
      title: "Climate Tech Investment Trends",
      downloads: 456,
      views: 1234,
      rating: 4.8,
      revenue: 0,
      growth: 18.9,
      category: "Research"
    }
  ]

  const categoryStats = [
    { name: "Financial Reports", count: 45, downloads: 5234, growth: 12.3 },
    { name: "Market Analysis", count: 32, downloads: 3891, growth: 8.7 },
    { name: "Startup Reports", count: 28, downloads: 2156, growth: 15.2 },
    { name: "Industry Insights", count: 25, downloads: 1876, growth: 6.4 },
    { name: "Research Papers", count: 18, downloads: 1234, growth: 9.8 },
    { name: "Trend Analysis", count: 8, downloads: 567, growth: 22.1 }
  ]

  const userEngagement = [
    { metric: "Page Views", value: "45,678", change: "+12.5%", trend: "up" },
    { metric: "Unique Visitors", value: "23,456", change: "+8.3%", trend: "up" },
    { metric: "Download Rate", value: "23.4%", change: "+2.1%", trend: "up" },
    { metric: "Bounce Rate", value: "22.1%", change: "-1.2%", trend: "down" },
    { metric: "Avg. Time on Page", value: "4.2 min", change: "+0.3 min", trend: "up" },
    { metric: "Return Visitors", value: "65.2%", change: "+5.7%", trend: "up" }
  ]

  const topCountries = [
    { country: "United States", visitors: 12345, percentage: 52.6 },
    { country: "United Kingdom", visitors: 3456, percentage: 14.7 },
    { country: "Canada", visitors: 2345, percentage: 10.0 },
    { country: "Germany", visitors: 1876, percentage: 8.0 },
    { country: "Australia", visitors: 1234, percentage: 5.3 },
    { country: "France", visitors: 987, percentage: 4.2 },
    { country: "Japan", visitors: 654, percentage: 2.8 },
    { country: "Other", visitors: 1234, percentage: 5.3 }
  ]

  const deviceStats = [
    { device: "Desktop", visitors: 15678, percentage: 66.8 },
    { device: "Mobile", visitors: 6234, percentage: 26.6 },
    { device: "Tablet", visitors: 1566, percentage: 6.6 }
  ]

  const timeRanges = [
    { value: "7d", label: "Last 7 days" },
    { value: "30d", label: "Last 30 days" },
    { value: "90d", label: "Last 90 days" },
    { value: "1y", label: "Last year" }
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
                <p className="text-sm text-gray-600">Total Reports</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.totalReports}</p>
                <p className="text-xs text-green-600">+{analytics.monthlyGrowth}% this month</p>
              </div>
              <div className="p-2 bg-[#0F7377]/10 rounded-lg">
                <FileText className="h-6 w-6 text-[#0F7377]" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Downloads</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.totalDownloads.toLocaleString()}</p>
                <p className="text-xs text-green-600">+8.3% this month</p>
              </div>
              <div className="p-2 bg-[#F59E0B]/10 rounded-lg">
                <Download className="h-6 w-6 text-[#F59E0B]" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.totalViews.toLocaleString()}</p>
                <p className="text-xs text-green-600">+12.5% this month</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <Eye className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.averageRating}</p>
                <p className="text-xs text-green-600">+0.2 this month</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Star className="h-6 w-6 text-purple-600" />
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

      {/* Top Performing Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Reports</CardTitle>
          <CardDescription>Reports with highest downloads and engagement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reportPerformance.slice(0, 5).map((report) => (
              <div key={report.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <FileText className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{report.title}</h4>
                    <p className="text-sm text-gray-600">{report.category} • {report.downloads} downloads</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">{report.views} views</p>
                    <p className="text-xs text-gray-500">Rating: {report.rating}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-600">+{report.growth}%</p>
                    <p className="text-xs text-gray-500">Growth</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderReportsTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Report Performance</CardTitle>
          <CardDescription>Detailed performance metrics for all reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Report</th>
                  <th className="text-left py-2">Category</th>
                  <th className="text-left py-2">Downloads</th>
                  <th className="text-left py-2">Views</th>
                  <th className="text-left py-2">Rating</th>
                  <th className="text-left py-2">Growth</th>
                </tr>
              </thead>
              <tbody>
                {reportPerformance.map((report) => (
                  <tr key={report.id} className="border-b">
                    <td className="py-3">
                      <div>
                        <p className="font-medium">{report.title}</p>
                        <p className="text-sm text-gray-500">ID: {report.id}</p>
                      </div>
                    </td>
                    <td className="py-3">
                      <Badge variant="outline">{report.category}</Badge>
                    </td>
                    <td className="py-3">{report.downloads.toLocaleString()}</td>
                    <td className="py-3">{report.views.toLocaleString()}</td>
                    <td className="py-3">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span>{report.rating}</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className="text-green-600">+{report.growth}%</span>
                    </td>
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
          <CardDescription>Performance metrics by report category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categoryStats.map((category, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <FileText className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{category.name}</h4>
                    <p className="text-sm text-gray-600">{category.count} reports</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="text-sm font-medium">{category.downloads.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Downloads</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-600">+{category.growth}%</p>
                    <p className="text-xs text-gray-500">Growth</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderAudienceTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Countries</CardTitle>
            <CardDescription>Visitor distribution by country</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topCountries.map((country, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{country.country}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-[#0F7377] h-2 rounded-full" 
                        style={{ width: `${country.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">{country.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Device Usage</CardTitle>
            <CardDescription>Visitor distribution by device type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {deviceStats.map((device, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{device.device}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-[#0F7377] h-2 rounded-full" 
                        style={{ width: `${device.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">{device.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
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
                <Link href="/resources/reports">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Reports
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Report Analytics</h1>
                <p className="text-sm text-gray-600">Comprehensive analytics and insights</p>
              </div>
            </div>
            
            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timeRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={handleRefreshData}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportData}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleRefreshData}>
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowMobileMenu(true)}>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportData}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="audience">Audience</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {renderOverviewTab()}
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            {renderReportsTab()}
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            {renderCategoriesTab()}
          </TabsContent>

          <TabsContent value="audience" className="space-y-6">
            {renderAudienceTab()}
          </TabsContent>
        </Tabs>

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
                <Button variant="outline" className="w-full justify-start" onClick={handleRefreshData}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh Data
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={handleExportData}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
