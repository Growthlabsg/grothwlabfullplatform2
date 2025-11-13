"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Activity,
  DollarSign,
  Calendar,
  MapPin,
  Building,
  Globe,
  Clock,
  Target,
  Award,
  Star,
  Heart,
  Eye,
  Download,
  RefreshCw,
  Settings,
  Zap,
  Shield,
  CheckCircle,
  AlertTriangle,
  Info
} from "lucide-react"

interface AnalyticsMetric {
  id: string
  name: string
  value: number
  change: number
  changeType: "increase" | "decrease" | "stable"
  unit: string
  target?: number
  category: string
}

interface UserActivity {
  id: string
  user: string
  action: string
  timestamp: string
  category: "login" | "content" | "interaction" | "system"
  impact: "low" | "medium" | "high"
}

const mockMetrics: AnalyticsMetric[] = [
  {
    id: "total_users",
    name: "Total Users",
    value: 15420,
    change: 12.5,
    changeType: "increase",
    unit: "users",
    target: 20000,
    category: "users"
  },
  {
    id: "active_users",
    name: "Active Users",
    value: 1247,
    change: 8.3,
    changeType: "increase",
    unit: "users",
    target: 1500,
    category: "users"
  },
  {
    id: "new_registrations",
    name: "New Registrations",
    value: 234,
    change: -5.2,
    changeType: "decrease",
    unit: "users",
    target: 300,
    category: "users"
  },
  {
    id: "engagement_rate",
    name: "Engagement Rate",
    value: 67.8,
    change: 2.1,
    changeType: "increase",
    unit: "%",
    target: 75,
    category: "engagement"
  },
  {
    id: "session_duration",
    name: "Avg Session Duration",
    value: 24.5,
    change: 1.8,
    changeType: "increase",
    unit: "minutes",
    target: 30,
    category: "engagement"
  },
  {
    id: "page_views",
    name: "Page Views",
    value: 45678,
    change: 15.7,
    changeType: "increase",
    unit: "views",
    target: 50000,
    category: "traffic"
  },
  {
    id: "conversion_rate",
    name: "Conversion Rate",
    value: 3.2,
    change: -0.5,
    changeType: "decrease",
    unit: "%",
    target: 5,
    category: "conversion"
  },
  {
    id: "revenue",
    name: "Revenue",
    value: 125000,
    change: 18.9,
    changeType: "increase",
    unit: "SGD",
    target: 150000,
    category: "revenue"
  }
]

const mockUserActivity: UserActivity[] = [
  {
    id: "1",
    user: "john.smith@growthlab.sg",
    action: "Logged in",
    timestamp: "2024-01-20T10:30:00Z",
    category: "login",
    impact: "low"
  },
  {
    id: "2",
    user: "sarah.chen@startup.com",
    action: "Created new startup profile",
    timestamp: "2024-01-20T10:25:00Z",
    category: "content",
    impact: "medium"
  },
  {
    id: "3",
    user: "michael@investor.com",
    action: "Viewed startup dashboard",
    timestamp: "2024-01-20T10:20:00Z",
    category: "interaction",
    impact: "low"
  },
  {
    id: "4",
    user: "emily.watson@mentor.com",
    action: "Scheduled mentoring session",
    timestamp: "2024-01-20T10:15:00Z",
    category: "interaction",
    impact: "medium"
  },
  {
    id: "5",
    user: "david.kim@user.com",
    action: "Joined sports club event",
    timestamp: "2024-01-20T10:10:00Z",
    category: "content",
    impact: "low"
  }
]

const categoryColors = {
  users: "bg-blue-100 text-blue-800",
  engagement: "bg-green-100 text-green-800",
  traffic: "bg-purple-100 text-purple-800",
  conversion: "bg-orange-100 text-orange-800",
  revenue: "bg-yellow-100 text-yellow-800"
}

const impactColors = {
  low: "bg-gray-100 text-gray-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-red-100 text-red-800"
}

export function AnalyticsOverview() {
  const [timeRange, setTimeRange] = useState("7d")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredMetrics = selectedCategory === "all" 
    ? mockMetrics 
    : mockMetrics.filter(metric => metric.category === selectedCategory)

  const getChangeIcon = (changeType: string) => {
    switch (changeType) {
      case "increase":
        return <TrendingUp className="w-4 h-4 text-green-500" />
      case "decrease":
        return <TrendingDown className="w-4 h-4 text-red-500" />
      default:
        return <Activity className="w-4 h-4 text-gray-500" />
    }
  }

  const getProgressValue = (metric: AnalyticsMetric) => {
    if (!metric.target) return 0
    return Math.min((metric.value / metric.target) * 100, 100)
  }

  const analyticsStats = {
    totalMetrics: mockMetrics.length,
    onTarget: mockMetrics.filter(m => m.target && m.value >= m.target).length,
    improving: mockMetrics.filter(m => m.changeType === "increase").length,
    declining: mockMetrics.filter(m => m.changeType === "decrease").length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Analytics Overview</h2>
          <p className="text-muted-foreground">
            Comprehensive platform analytics and performance insights
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1d">1 Day</SelectItem>
              <SelectItem value="7d">7 Days</SelectItem>
              <SelectItem value="30d">30 Days</SelectItem>
              <SelectItem value="90d">90 Days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Metrics</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsStats.totalMetrics}</div>
            <p className="text-xs text-muted-foreground">
              Tracked performance indicators
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Target</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{analyticsStats.onTarget}</div>
            <p className="text-xs text-muted-foreground">
              Meeting performance goals
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Improving</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{analyticsStats.improving}</div>
            <p className="text-xs text-muted-foreground">
              Positive trends
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Declining</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{analyticsStats.declining}</div>
            <p className="text-xs text-muted-foreground">
              Need attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="metrics" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
            <TabsTrigger value="activity">User Activity</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="users">Users</SelectItem>
              <SelectItem value="engagement">Engagement</SelectItem>
              <SelectItem value="traffic">Traffic</SelectItem>
              <SelectItem value="conversion">Conversion</SelectItem>
              <SelectItem value="revenue">Revenue</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <TabsContent value="metrics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMetrics.map((metric) => (
              <Card key={metric.id} className="relative">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{metric.name}</CardTitle>
                    {getChangeIcon(metric.changeType)}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={categoryColors[metric.category as keyof typeof categoryColors]}>
                      {metric.category}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {metric.change > 0 ? "+" : ""}{metric.change}%
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">
                      {metric.value.toLocaleString()}{metric.unit !== "%" && metric.unit !== "SGD" ? "" : ""} {metric.unit}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Current
                    </span>
                  </div>
                  
                  {metric.target && (
                    <>
                      <Progress value={getProgressValue(metric)} className="h-2" />
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>0 {metric.unit}</span>
                        <span>Target: {metric.target.toLocaleString()} {metric.unit}</span>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent User Activity</CardTitle>
              <CardDescription>
                Latest user interactions and platform usage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockUserActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        impactColors[activity.impact].split(' ')[0]
                      }`} />
                      <div>
                        <div className="font-medium">{activity.user}</div>
                        <div className="text-sm text-muted-foreground">{activity.action}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={impactColors[activity.impact]}>
                        {activity.impact}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {new Date(activity.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Insights</CardTitle>
                <CardDescription>
                  Key insights and recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Strong User Growth</h4>
                      <p className="text-sm text-muted-foreground">
                        User base growing at 12.5% month-over-month
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Conversion Rate Decline</h4>
                      <p className="text-sm text-muted-foreground">
                        Conversion rate dropped by 0.5% - investigate funnel
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Info className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Engagement Improving</h4>
                      <p className="text-sm text-muted-foreground">
                        Session duration increased by 1.8 minutes
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Recommended actions based on analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Eye className="w-4 h-4 mr-2" />
                    Review Conversion Funnel
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Analyze User Segments
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Target className="w-4 h-4 mr-2" />
                    Set Performance Targets
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Generate Custom Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance Summary</CardTitle>
              <CardDescription>
                Overall platform performance overview
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">85%</div>
                  <div className="text-sm text-muted-foreground">Overall Performance</div>
                  <div className="text-xs text-green-600 mt-1">+5% from last month</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">92%</div>
                  <div className="text-sm text-muted-foreground">User Satisfaction</div>
                  <div className="text-xs text-blue-600 mt-1">+2% from last month</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">78%</div>
                  <div className="text-sm text-muted-foreground">Goal Achievement</div>
                  <div className="text-xs text-purple-600 mt-1">+8% from last month</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 