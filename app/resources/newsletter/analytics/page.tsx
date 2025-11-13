"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  MousePointer,
  Mail,
  Calendar,
  Clock,
  Target,
  Award,
  Trophy,
  Medal,
  Crown,
  Gem,
  Sparkles,
  Download,
  RefreshCw,
  Filter,
  Search,
  Settings,
  HelpCircle,
  Info,
  AlertCircle,
  CheckCircle,
  XCircle,
  Plus,
  Minus,
  Edit,
  Trash2,
  MoreHorizontal,
  Save,
  Copy,
  Share2,
  ExternalLink,
  Globe,
  Lock,
  Unlock,
  Bell,
  BellOff,
  Star,
  Heart,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Reply,
  Flag,
  Archive,
  Tag,
  Folder,
  FolderOpen,
  Upload,
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
  Lightbulb,
  Zap,
  Award as AwardIcon,
  Trophy as TrophyIcon,
  Medal as MedalIcon,
  Crown as CrownIcon,
  Gem as GemIcon,
  Sparkles as SparklesIcon
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function NewsletterAnalyticsPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedPeriod, setSelectedPeriod] = useState("30d")
  const [selectedNewsletter, setSelectedNewsletter] = useState("all")

  const overviewStats = [
    {
      label: "Total Subscribers",
      value: "12,547",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "text-blue-600"
    },
    {
      label: "Open Rate",
      value: "24.8%",
      change: "+2.1%",
      trend: "up",
      icon: Eye,
      color: "text-green-600"
    },
    {
      label: "Click Rate",
      value: "8.3%",
      change: "+0.8%",
      trend: "up",
      icon: MousePointer,
      color: "text-purple-600"
    },
    {
      label: "Unsubscribe Rate",
      value: "0.3%",
      change: "-0.1%",
      trend: "down",
      icon: Users,
      color: "text-red-600"
    },
    {
      label: "Bounce Rate",
      value: "2.1%",
      change: "-0.3%",
      trend: "down",
      icon: Mail,
      color: "text-orange-600"
    },
    {
      label: "Avg. Engagement",
      value: "18.7%",
      change: "+3.2%",
      trend: "up",
      icon: TrendingUp,
      color: "text-indigo-600"
    }
  ]

  const newsletterPerformance = [
    {
      id: 1,
      title: "Weekly Startup Digest",
      sentDate: "2024-01-15",
      subscribers: 1247,
      opens: 309,
      clicks: 103,
      unsubscribes: 3,
      bounces: 12,
      openRate: 24.8,
      clickRate: 8.3,
      unsubscribeRate: 0.24,
      bounceRate: 0.96,
      engagement: 18.7
    },
    {
      id: 2,
      title: "Product Launch Announcement",
      sentDate: "2024-01-10",
      subscribers: 1247,
      opens: 374,
      clicks: 149,
      unsubscribes: 1,
      bounces: 8,
      openRate: 30.0,
      clickRate: 12.0,
      unsubscribeRate: 0.08,
      bounceRate: 0.64,
      engagement: 22.4
    },
    {
      id: 3,
      title: "Funding Roundup - January 2024",
      sentDate: "2024-01-05",
      subscribers: 1247,
      opens: 399,
      clicks: 159,
      unsubscribes: 2,
      bounces: 15,
      openRate: 32.0,
      clickRate: 12.8,
      unsubscribeRate: 0.16,
      bounceRate: 1.20,
      engagement: 25.1
    }
  ]

  const subscriberGrowth = [
    { month: "Jan", subscribers: 11200, growth: 0 },
    { month: "Feb", subscribers: 11500, growth: 2.7 },
    { month: "Mar", subscribers: 11800, growth: 2.6 },
    { month: "Apr", subscribers: 12100, growth: 2.5 },
    { month: "May", subscribers: 12400, growth: 2.5 },
    { month: "Jun", subscribers: 12547, growth: 1.2 }
  ]

  const topContent = [
    { title: "Startup Funding Trends", clicks: 45, opens: 120, ctr: 37.5 },
    { title: "Product Launch Updates", clicks: 38, opens: 95, ctr: 40.0 },
    { title: "Industry News Roundup", clicks: 32, opens: 88, ctr: 36.4 },
    { title: "Growth Hacking Tips", clicks: 28, opens: 76, ctr: 36.8 },
    { title: "Market Analysis", clicks: 25, opens: 68, ctr: 36.8 }
  ]

  const deviceBreakdown = [
    { device: "Desktop", percentage: 45, opens: 562 },
    { device: "Mobile", percentage: 40, opens: 500 },
    { device: "Tablet", percentage: 15, opens: 188 }
  ]

  const locationData = [
    { country: "United States", subscribers: 4520, percentage: 36.1 },
    { country: "United Kingdom", subscribers: 1890, percentage: 15.1 },
    { country: "Canada", subscribers: 1247, percentage: 9.9 },
    { country: "Australia", subscribers: 998, percentage: 8.0 },
    { country: "Germany", subscribers: 748, percentage: 6.0 },
    { country: "Other", subscribers: 3144, percentage: 25.1 }
  ]

  const handleExport = () => {
    toast({
      title: "Exporting Data",
      description: "Preparing analytics report for download...",
    })
  }

  const handleRefresh = () => {
    toast({
      title: "Refreshing Data",
      description: "Updating analytics with latest information...",
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
                <Link href="/resources/newsletter">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Newsletters
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Newsletter Analytics</h1>
                <p className="text-sm text-gray-600">Detailed insights into your newsletter performance</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleRefresh}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Period Selector */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <select
              value={selectedNewsletter}
              onChange={(e) => setSelectedNewsletter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Newsletters</option>
              <option value="weekly">Weekly Updates</option>
              <option value="monthly">Monthly Reports</option>
              <option value="special">Special Events</option>
            </select>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {overviewStats.map((stat, index) => (
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
                      <div className={`p-2 rounded-lg ${stat.color.replace('text-', 'bg-').replace('-600', '-100')}`}>
                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Subscriber Growth</CardTitle>
                  <CardDescription>Monthly subscriber growth over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end justify-between space-x-2">
                    {subscriberGrowth.map((data, index) => (
                      <div key={index} className="flex flex-col items-center space-y-2">
                        <div 
                          className="bg-[#0F7377] rounded-t"
                          style={{ height: `${(data.subscribers / 13000) * 200}px`, width: '40px' }}
                        ></div>
                        <span className="text-xs text-gray-600">{data.month}</span>
                        <span className="text-xs font-medium">{data.subscribers.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Engagement Trends</CardTitle>
                  <CardDescription>Open and click rates over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                      <p>Engagement chart will be displayed here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Newsletter Performance</CardTitle>
                <CardDescription>Detailed performance metrics for each newsletter</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Newsletter</th>
                        <th className="text-left py-3 px-4">Sent Date</th>
                        <th className="text-left py-3 px-4">Subscribers</th>
                        <th className="text-left py-3 px-4">Opens</th>
                        <th className="text-left py-3 px-4">Clicks</th>
                        <th className="text-left py-3 px-4">Open Rate</th>
                        <th className="text-left py-3 px-4">Click Rate</th>
                        <th className="text-left py-3 px-4">Engagement</th>
                      </tr>
                    </thead>
                    <tbody>
                      {newsletterPerformance.map((newsletter) => (
                        <tr key={newsletter.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium">{newsletter.title}</p>
                              <p className="text-sm text-gray-600">{newsletter.sentDate}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4">{newsletter.sentDate}</td>
                          <td className="py-3 px-4">{newsletter.subscribers.toLocaleString()}</td>
                          <td className="py-3 px-4">{newsletter.opens.toLocaleString()}</td>
                          <td className="py-3 px-4">{newsletter.clicks.toLocaleString()}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <span>{newsletter.openRate}%</span>
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-green-500 h-2 rounded-full" 
                                  style={{ width: `${newsletter.openRate}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <span>{newsletter.clickRate}%</span>
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-500 h-2 rounded-full" 
                                  style={{ width: `${newsletter.clickRate}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <span>{newsletter.engagement}%</span>
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-purple-500 h-2 rounded-full" 
                                  style={{ width: `${newsletter.engagement}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Subscribers Tab */}
          <TabsContent value="subscribers" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Subscriber Growth</CardTitle>
                  <CardDescription>Monthly subscriber growth trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {subscriberGrowth.map((data, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{data.month}</span>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-gray-600">{data.subscribers.toLocaleString()}</span>
                          <span className={`text-xs ${data.growth > 0 ? 'text-green-600' : 'text-gray-600'}`}>
                            {data.growth > 0 ? `+${data.growth}%` : '0%'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Device Breakdown</CardTitle>
                  <CardDescription>How subscribers access your newsletters</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {deviceBreakdown.map((device, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{device.device}</span>
                        <div className="flex items-center space-x-4">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-[#0F7377] h-2 rounded-full" 
                              style={{ width: `${device.percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">{device.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Content</CardTitle>
                <CardDescription>Most clicked content in your newsletters</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topContent.map((content, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{content.title}</h4>
                        <p className="text-sm text-gray-600">{content.clicks} clicks from {content.opens} opens</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-[#0F7377]">{content.ctr}%</p>
                        <p className="text-xs text-gray-600">CTR</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Demographics Tab */}
          <TabsContent value="demographics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
                <CardDescription>Subscriber locations around the world</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {locationData.map((location, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{location.country}</span>
                      <div className="flex items-center space-x-4">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-[#0F7377] h-2 rounded-full" 
                            style={{ width: `${location.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{location.percentage}%</span>
                        <span className="text-sm text-gray-500">({location.subscribers.toLocaleString()})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
