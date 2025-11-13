"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Users,
  Eye,
  Heart,
  Share2,
  MessageCircle,
  Calendar,
  Clock,
  Target,
  BarChart3,
  PieChart,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Filter,
  RefreshCw,
  Bell,
  AlertCircle,
  CheckCircle,
  Star,
  Gift,
  MapPin,
  Globe,
  Zap,
  Lightbulb,
  Award
} from "lucide-react"

interface AnalyticsData {
  overview: {
    totalRaised: number
    totalBackers: number
    totalViews: number
    totalLikes: number
    conversionRate: number
    avgPledge: number
  }
  trends: {
    daily: Array<{ date: string; raised: number; backers: number; views: number }>
    weekly: Array<{ week: string; raised: number; backers: number }>
    monthly: Array<{ month: string; raised: number; backers: number }>
  }
  demographics: {
    ageGroups: Array<{ age: string; percentage: number }>
    locations: Array<{ location: string; percentage: number }>
    devices: Array<{ device: string; percentage: number }>
  }
  rewards: Array<{
    id: string
    title: string
    amount: number
    claimed: number
    total: number
    revenue: number
  }>
  traffic: {
    sources: Array<{ source: string; percentage: number }>
    referrers: Array<{ referrer: string; visits: number }>
  }
  engagement: {
    comments: number
    shares: number
    updates: number
    messages: number
  }
}

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("7d")
  const [isLoading, setIsLoading] = useState(false)
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    overview: {
      totalRaised: 45620,
      totalBackers: 234,
      totalViews: 12470,
      totalLikes: 156,
      conversionRate: 1.88,
      avgPledge: 195
    },
    trends: {
      daily: [
        { date: "2024-01-01", raised: 1200, backers: 8, views: 450 },
        { date: "2024-01-02", raised: 1800, backers: 12, views: 520 },
        { date: "2024-01-03", raised: 2100, backers: 15, views: 680 },
        { date: "2024-01-04", raised: 1600, backers: 11, views: 590 },
        { date: "2024-01-05", raised: 2400, backers: 18, views: 720 },
        { date: "2024-01-06", raised: 2800, backers: 22, views: 890 },
        { date: "2024-01-07", raised: 3200, backers: 25, views: 1020 }
      ],
      weekly: [
        { week: "Week 1", raised: 8500, backers: 65 },
        { week: "Week 2", raised: 12000, backers: 89 },
        { week: "Week 3", raised: 15800, backers: 112 },
        { week: "Week 4", raised: 19200, backers: 134 }
      ],
      monthly: [
        { month: "Jan", raised: 45620, backers: 234 },
        { month: "Feb", raised: 52340, backers: 267 },
        { month: "Mar", raised: 61200, backers: 298 }
      ]
    },
    demographics: {
      ageGroups: [
        { age: "18-24", percentage: 15 },
        { age: "25-34", percentage: 35 },
        { age: "35-44", percentage: 28 },
        { age: "45-54", percentage: 16 },
        { age: "55+", percentage: 6 }
      ],
      locations: [
        { location: "United States", percentage: 45 },
        { location: "United Kingdom", percentage: 18 },
        { location: "Canada", percentage: 12 },
        { location: "Australia", percentage: 8 },
        { location: "Other", percentage: 17 }
      ],
      devices: [
        { device: "Desktop", percentage: 52 },
        { device: "Mobile", percentage: 38 },
        { device: "Tablet", percentage: 10 }
      ]
    },
    rewards: [
      {
        id: "1",
        title: "Early Bird - Basic Monitor",
        amount: 50,
        claimed: 45,
        total: 50,
        revenue: 2250
      },
      {
        id: "2",
        title: "Premium Monitor + App Access",
        amount: 100,
        claimed: 23,
        total: 30,
        revenue: 2300
      },
      {
        id: "3",
        title: "Complete Smart Home Kit",
        amount: 200,
        claimed: 12,
        total: 20,
        revenue: 2400
      }
    ],
    traffic: {
      sources: [
        { source: "Direct", percentage: 35 },
        { source: "Social Media", percentage: 28 },
        { source: "Search", percentage: 22 },
        { source: "Referral", percentage: 15 }
      ],
      referrers: [
        { referrer: "Facebook", visits: 2340 },
        { referrer: "Twitter", visits: 1890 },
        { referrer: "LinkedIn", visits: 1560 },
        { referrer: "Instagram", visits: 1230 },
        { referrer: "Reddit", visits: 890 }
      ]
    },
    engagement: {
      comments: 67,
      shares: 234,
      updates: 12,
      messages: 45
    }
  })

  const refreshData = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  const getPercentageChange = (current: number, previous: number) => {
    if (previous === 0) return 0
    return ((current - previous) / previous) * 100
  }

  const renderMetricCard = (title: string, value: string | number, icon: any, change?: number, subtitle?: string) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change !== undefined && (
          <div className={`flex items-center text-xs ${
            change >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {change >= 0 ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
            {Math.abs(change).toFixed(1)}%
          </div>
        )}
        {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
      </CardContent>
    </Card>
  )

  const renderTrendChart = (data: any[], title: string, valueKey: string) => (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {data.slice(-7).map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {item.date || item.week || item.month}
              </span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-[#0F7377] h-2 rounded-full" 
                    style={{ 
                      width: `${(item[valueKey] / Math.max(...data.map(d => d[valueKey]))) * 100}%` 
                    }}
                  />
                </div>
                <span className="text-sm font-medium">
                  {valueKey === 'raised' ? formatCurrency(item[valueKey]) : item[valueKey]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  const renderDemographicsChart = (data: any[], title: string) => (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm">{item.age || item.location || item.device}</span>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-[#0F7377] h-2 rounded-full" 
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="text-sm font-medium">{item.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]">Analytics Dashboard</h1>
          <p className="text-[#64748B]">Track your project's performance and insights</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={refreshData} disabled={isLoading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {renderMetricCard(
          "Total Raised",
          formatCurrency(analyticsData.overview.totalRaised),
          <DollarSign className="w-4 h-4 text-[#0F7377]" />,
          12.5,
          "vs last period"
        )}
        {renderMetricCard(
          "Total Backers",
          formatNumber(analyticsData.overview.totalBackers),
          <Users className="w-4 h-4 text-[#0F7377]" />,
          8.3,
          "vs last period"
        )}
        {renderMetricCard(
          "Total Views",
          formatNumber(analyticsData.overview.totalViews),
          <Eye className="w-4 h-4 text-[#0F7377]" />,
          15.2,
          "vs last period"
        )}
        {renderMetricCard(
          "Conversion Rate",
          `${analyticsData.overview.conversionRate}%`,
          <Target className="w-4 h-4 text-[#0F7377]" />,
          2.1,
          "vs last period"
        )}
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {renderTrendChart(analyticsData.trends.daily, "Daily Funding", "raised")}
            {renderTrendChart(analyticsData.trends.daily, "Daily Backers", "backers")}
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#0F7377]">
                    {formatCurrency(analyticsData.overview.avgPledge)}
                  </div>
                  <div className="text-sm text-muted-foreground">Average Pledge</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#0F7377]">
                    {analyticsData.engagement.comments}
                  </div>
                  <div className="text-sm text-muted-foreground">Comments</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#0F7377]">
                    {analyticsData.engagement.shares}
                  </div>
                  <div className="text-sm text-muted-foreground">Shares</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#0F7377]">
                    {analyticsData.engagement.updates}
                  </div>
                  <div className="text-sm text-muted-foreground">Updates</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trends Tab */}
        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {renderTrendChart(analyticsData.trends.weekly, "Weekly Funding", "raised")}
            {renderTrendChart(analyticsData.trends.monthly, "Monthly Funding", "raised")}
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Performance Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="font-medium">Strong Performance</span>
                  </div>
                  <span className="text-sm text-green-600">+15% vs last week</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span className="font-medium">Growing Community</span>
                  </div>
                  <span className="text-sm text-blue-600">+23 new backers</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-yellow-600" />
                    <span className="font-medium">High Engagement</span>
                  </div>
                  <span className="text-sm text-yellow-600">1,247 views today</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Demographics Tab */}
        <TabsContent value="demographics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {renderDemographicsChart(analyticsData.demographics.ageGroups, "Age Distribution")}
            {renderDemographicsChart(analyticsData.demographics.locations, "Geographic Distribution")}
            {renderDemographicsChart(analyticsData.demographics.devices, "Device Usage")}
          </div>
        </TabsContent>

        {/* Rewards Tab */}
        <TabsContent value="rewards" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Reward Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.rewards.map((reward) => (
                  <div key={reward.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium">{reward.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {reward.claimed}/{reward.total} claimed
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{formatCurrency(reward.amount)}</div>
                      <div className="text-sm text-muted-foreground">
                        {formatCurrency(reward.revenue)} revenue
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-[#0F7377] h-2 rounded-full" 
                          style={{ width: `${(reward.claimed / reward.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Traffic Tab */}
        <TabsContent value="traffic" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {renderDemographicsChart(analyticsData.traffic.sources, "Traffic Sources")}
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top Referrers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analyticsData.traffic.referrers.map((referrer, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{referrer.referrer}</span>
                      <span className="text-sm font-medium">{formatNumber(referrer.visits)} visits</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Engagement Tab */}
        <TabsContent value="engagement" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {renderMetricCard(
              "Comments",
              analyticsData.engagement.comments,
              <MessageCircle className="w-4 h-4 text-[#0F7377]" />
            )}
            {renderMetricCard(
              "Shares",
              analyticsData.engagement.shares,
              <Share2 className="w-4 h-4 text-[#0F7377]" />
            )}
            {renderMetricCard(
              "Updates",
              analyticsData.engagement.updates,
              <Bell className="w-4 h-4 text-[#0F7377]" />
            )}
            {renderMetricCard(
              "Messages",
              analyticsData.engagement.messages,
              <MessageCircle className="w-4 h-4 text-[#0F7377]" />
            )}
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Engagement Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-green-600" />
                    <span className="font-medium">High Engagement Rate</span>
                  </div>
                  <span className="text-sm text-green-600">4.2% engagement</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Share2 className="w-4 h-4 text-blue-600" />
                    <span className="font-medium">Viral Potential</span>
                  </div>
                  <span className="text-sm text-blue-600">234 shares this week</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-yellow-600" />
                    <span className="font-medium">Active Community</span>
                  </div>
                  <span className="text-sm text-yellow-600">67 comments today</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 