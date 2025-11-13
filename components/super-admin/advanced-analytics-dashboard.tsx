"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Activity, 
  Eye,
  Clock,
  Target,
  Globe,
  Smartphone,
  Monitor,
  Calendar,
  Download,
  RefreshCw,
  Filter,
  Zap,
  Star,
  MessageCircle,
  Share2,
  Heart
} from "lucide-react"

export function AdvancedAnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("7d")
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  // Comprehensive analytics data
  const [analyticsData, setAnalyticsData] = useState({
    // User Analytics
    totalUsers: 15420,
    activeUsers: 8932,
    newUsers: 342,
    retentionRate: 84.2,
    userGrowthRate: 12.5,
    avgSessionDuration: "8m 32s",
    bounceRate: 23.1,
    
    // Revenue Analytics
    totalRevenue: 127850,
    monthlyRecurringRevenue: 45230,
    averageRevenuePerUser: 42.30,
    conversionRate: 3.2,
    churnRate: 2.1,
    
    // Platform Analytics
    totalStartups: 2847,
    fundedStartups: 156,
    totalFunding: 47200000,
    averageFundingAmount: 302564,
    successfulConnections: 8943,
    totalEvents: 1205,
    
    // Content Analytics
    totalPosts: 23456,
    totalComments: 67890,
    totalShares: 12345,
    totalLikes: 98765,
    engagementRate: 6.8,
    
    // Device Analytics
    desktop: 52.3,
    mobile: 41.2,
    tablet: 6.5,
    
    // Geographic Analytics
    topCountries: [
      { country: "Singapore", users: 4521, percentage: 29.3 },
      { country: "Malaysia", users: 3842, percentage: 24.9 },
      { country: "Indonesia", users: 2156, percentage: 14.0 },
      { country: "Thailand", users: 1876, percentage: 12.2 },
      { country: "Vietnam", users: 1543, percentage: 10.0 },
      { country: "Philippines", users: 982, percentage: 6.4 },
      { country: "Others", users: 500, percentage: 3.2 }
    ],
    
    // Feature Usage
    featureUsage: [
      { feature: "Communication Hub", usage: 89.2, growth: 12.3 },
      { feature: "QR Networking", usage: 76.8, growth: 8.5 },
      { feature: "Feed", usage: 84.1, growth: 15.2 },
      { feature: "GrowthStarter", usage: 45.7, growth: 23.1 },
      { feature: "Jobs Portal", usage: 67.3, growth: 9.8 },
      { feature: "Mentorship", usage: 52.4, growth: 18.9 },
      { feature: "Events", usage: 71.2, growth: 6.7 },
      { feature: "Resources", usage: 58.9, growth: 11.4 }
    ],
    
    // Real-time Metrics
    realTimeMetrics: {
      activeNow: 1247,
      requestsPerMinute: 2340,
      errorRate: 0.02,
      responseTime: 145,
      bandwidthUsage: 67.3,
      serverLoad: 23.1
    }
  })

  // Initialize timestamp on client side only
  useEffect(() => {
    setLastUpdated(new Date())
  }, [])

  const handleRefresh = () => {
    setIsLoading(true)
    // Simulate data refresh
    setTimeout(() => {
      setAnalyticsData(prev => ({
        ...prev,
        activeUsers: Math.floor(Math.random() * 1000) + 8000,
        realTimeMetrics: {
          ...prev.realTimeMetrics,
          activeNow: Math.floor(Math.random() * 500) + 1000,
          requestsPerMinute: Math.floor(Math.random() * 1000) + 2000,
          responseTime: Math.floor(Math.random() * 50) + 120
        }
      }))
      setLastUpdated(new Date())
      setIsLoading(false)
    }, 1000)
  }

  const handleExport = () => {
    // Simulate data export
    const dataStr = JSON.stringify(analyticsData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `analytics-${timeRange}-${new Date().toISOString().split('T')[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Advanced Analytics Dashboard</h2>
          <p className="text-muted-foreground">
            Comprehensive platform analytics and business intelligence
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1d">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          
          <div className="text-xs text-muted-foreground">
            Last updated: {lastUpdated ? lastUpdated.toLocaleTimeString() : "Loading..."}
          </div>
        </div>
      </div>

      {/* Real-time Metrics Bar */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-l-blue-500">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{analyticsData.realTimeMetrics.activeNow}</div>
              <div className="text-xs text-muted-foreground">Active Now</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{analyticsData.realTimeMetrics.requestsPerMinute}</div>
              <div className="text-xs text-muted-foreground">Requests/min</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{analyticsData.realTimeMetrics.errorRate}%</div>
              <div className="text-xs text-muted-foreground">Error Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{analyticsData.realTimeMetrics.responseTime}ms</div>
              <div className="text-xs text-muted-foreground">Avg Response</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">{analyticsData.realTimeMetrics.bandwidthUsage}%</div>
              <div className="text-xs text-muted-foreground">Bandwidth</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{analyticsData.realTimeMetrics.serverLoad}%</div>
              <div className="text-xs text-muted-foreground">Server Load</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="platform">Platform</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="hover:shadow-md transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{analyticsData.totalUsers.toLocaleString()}</div>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +{analyticsData.userGrowthRate}% this month
                </div>
                <Progress value={75} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{analyticsData.activeUsers.toLocaleString()}</div>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +8.2% this week
                </div>
                <Progress value={60} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">${analyticsData.totalRevenue.toLocaleString()}</div>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +15.3% this month
                </div>
                <Progress value={85} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{analyticsData.conversionRate}%</div>
                <div className="flex items-center text-xs text-red-600 mt-1">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  -0.3% this week
                </div>
                <Progress value={32} className="mt-2" />
              </CardContent>
            </Card>
          </div>

          {/* Geographic Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Geographic Distribution
              </CardTitle>
              <CardDescription>User distribution by country</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analyticsData.topCountries.map((country, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {index + 1}
                      </div>
                      <span className="font-medium">{country.country}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${country.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-muted-foreground w-16 text-right">
                        {country.users.toLocaleString()}
                      </span>
                      <Badge variant="secondary" className="w-16 text-center">
                        {country.percentage}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Device Analytics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                Device Analytics
              </CardTitle>
              <CardDescription>User device preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <Monitor className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-2xl font-bold text-blue-600">{analyticsData.desktop}%</div>
                  <div className="text-sm text-muted-foreground">Desktop</div>
                  <Progress value={analyticsData.desktop} className="mt-2" />
                </div>
                <div className="text-center">
                  <Smartphone className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <div className="text-2xl font-bold text-green-600">{analyticsData.mobile}%</div>
                  <div className="text-sm text-muted-foreground">Mobile</div>
                  <Progress value={analyticsData.mobile} className="mt-2" />
                </div>
                <div className="text-center">
                  <Monitor className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <div className="text-2xl font-bold text-purple-600">{analyticsData.tablet}%</div>
                  <div className="text-sm text-muted-foreground">Tablet</div>
                  <Progress value={analyticsData.tablet} className="mt-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">New Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{analyticsData.newUsers}</div>
                <p className="text-xs text-muted-foreground">Last 7 days</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Retention Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{analyticsData.retentionRate}%</div>
                <p className="text-xs text-muted-foreground">30-day retention</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Session Duration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{analyticsData.avgSessionDuration}</div>
                <p className="text-xs text-muted-foreground">Average session</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Bounce Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{analyticsData.bounceRate}%</div>
                <p className="text-xs text-muted-foreground">Single page visits</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Revenue Tab */}
        <TabsContent value="revenue" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">MRR</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">${analyticsData.monthlyRecurringRevenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Monthly recurring revenue</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">ARPU</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">${analyticsData.averageRevenuePerUser}</div>
                <p className="text-xs text-muted-foreground">Average revenue per user</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Conversion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{analyticsData.conversionRate}%</div>
                <p className="text-xs text-muted-foreground">Free to paid conversion</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Churn Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{analyticsData.churnRate}%</div>
                <p className="text-xs text-muted-foreground">Monthly churn rate</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Platform Tab */}
        <TabsContent value="platform" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Total Startups</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{analyticsData.totalStartups.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Registered startups</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Funded Startups</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{analyticsData.fundedStartups}</div>
                <p className="text-xs text-muted-foreground">Successfully funded</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Total Funding</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">${(analyticsData.totalFunding / 1000000).toFixed(1)}M</div>
                <p className="text-xs text-muted-foreground">Platform funding volume</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Connections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{analyticsData.successfulConnections.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Successful connections</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Content Tab */}
        <TabsContent value="content" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{analyticsData.totalPosts.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Total posts</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Comments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{analyticsData.totalComments.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Total comments</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Shares</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{analyticsData.totalShares.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Total shares</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Likes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{analyticsData.totalLikes.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Total likes</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{analyticsData.engagementRate}%</div>
                <p className="text-xs text-muted-foreground">Engagement rate</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Features Tab */}
        <TabsContent value="features" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Feature Usage Analytics
              </CardTitle>
              <CardDescription>Platform feature adoption and usage statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.featureUsage.map((feature, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{feature.feature}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{feature.usage}% adoption</Badge>
                        <Badge variant={feature.growth > 10 ? "default" : "outline"} className="text-green-600">
                          +{feature.growth}% growth
                        </Badge>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${feature.usage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
