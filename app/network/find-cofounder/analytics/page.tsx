"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft, 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Eye, 
  Heart, 
  Share2, 
  Download,
  Calendar,
  MapPin,
  Clock,
  Target,
  BarChart3,
  PieChart,
  Activity
} from "lucide-react"
import Link from "next/link"

interface AnalyticsData {
  profileViews: {
    total: number
    thisWeek: number
    thisMonth: number
    trend: number
  }
  connections: {
    total: number
    pending: number
    accepted: number
    trend: number
  }
  messages: {
    total: number
    unread: number
    responseRate: number
    trend: number
  }
  engagement: {
    profileCompleteness: number
    responseTime: string
    matchQuality: number
    activityScore: number
  }
  demographics: {
    topLocations: Array<{ location: string; count: number; percentage: number }>
    topIndustries: Array<{ industry: string; count: number; percentage: number }>
    experienceLevels: Array<{ level: string; count: number; percentage: number }>
  }
  timeSeries: Array<{
    date: string
    views: number
    connections: number
    messages: number
  }>
  topMatches: Array<{
    id: string
    name: string
    compatibility: number
    location: string
    industry: string
    lastActive: string
  }>
}

export default function CoFounderAnalytics() {
  const [timeRange, setTimeRange] = useState("30d")
  
  const analyticsData: AnalyticsData = {
    profileViews: {
      total: 1247,
      thisWeek: 89,
      thisMonth: 342,
      trend: 12.5
    },
    connections: {
      total: 156,
      pending: 23,
      accepted: 133,
      trend: 8.3
    },
    messages: {
      total: 89,
      unread: 7,
      responseRate: 94.2,
      trend: 15.7
    },
    engagement: {
      profileCompleteness: 87,
      responseTime: "2.3 hours",
      matchQuality: 8.4,
      activityScore: 92
    },
    demographics: {
      topLocations: [
        { location: "San Francisco", count: 45, percentage: 28.8 },
        { location: "New York", count: 32, percentage: 20.5 },
        { location: "London", count: 28, percentage: 17.9 },
        { location: "Singapore", count: 24, percentage: 15.4 },
        { location: "Berlin", count: 18, percentage: 11.5 },
        { location: "Other", count: 9, percentage: 5.8 }
      ],
      topIndustries: [
        { industry: "Technology", count: 67, percentage: 42.9 },
        { industry: "Fintech", count: 34, percentage: 21.8 },
        { industry: "Healthcare", count: 28, percentage: 17.9 },
        { industry: "SaaS", count: 19, percentage: 12.2 },
        { industry: "AI/ML", count: 8, percentage: 5.1 }
      ],
      experienceLevels: [
        { level: "Expert (10+ years)", count: 45, percentage: 28.8 },
        { level: "Senior (5-10 years)", count: 67, percentage: 42.9 },
        { level: "Mid-level (2-5 years)", count: 32, percentage: 20.5 },
        { level: "Junior (0-2 years)", count: 12, percentage: 7.7 }
      ]
    },
    timeSeries: [
      { date: "2024-01-01", views: 23, connections: 5, messages: 3 },
      { date: "2024-01-02", views: 31, connections: 8, messages: 7 },
      { date: "2024-01-03", views: 28, connections: 6, messages: 4 },
      { date: "2024-01-04", views: 35, connections: 9, messages: 6 },
      { date: "2024-01-05", views: 42, connections: 12, messages: 8 },
      { date: "2024-01-06", views: 38, connections: 10, messages: 5 },
      { date: "2024-01-07", views: 45, connections: 14, messages: 9 }
    ],
    topMatches: [
      {
        id: "1",
        name: "Sarah Chen",
        compatibility: 94,
        location: "San Francisco",
        industry: "Technology",
        lastActive: "2 hours ago"
      },
      {
        id: "2",
        name: "Michael Rodriguez",
        compatibility: 91,
        location: "New York",
        industry: "Fintech",
        lastActive: "1 day ago"
      },
      {
        id: "3",
        name: "Emma Thompson",
        compatibility: 89,
        location: "London",
        industry: "Healthcare",
        lastActive: "3 hours ago"
      },
      {
        id: "4",
        name: "David Kim",
        compatibility: 87,
        location: "Singapore",
        industry: "SaaS",
        lastActive: "5 hours ago"
      },
      {
        id: "5",
        name: "Lisa Wang",
        compatibility: 85,
        location: "Berlin",
        industry: "AI/ML",
        lastActive: "1 day ago"
      }
    ]
  }

  const getTrendColor = (trend: number) => {
    return trend > 0 ? "text-green-600" : trend < 0 ? "text-red-600" : "text-gray-600"
  }

  const getTrendIcon = (trend: number) => {
    return trend > 0 ? "↗" : trend < 0 ? "↘" : "→"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" asChild>
              <Link href="/network/find-cofounder">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Find Co-founder
              </Link>
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Co-founder Analytics</h1>
              <p className="text-gray-600 mt-2">
                Track your profile performance and connection insights
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Profile Views</p>
                  <p className="text-2xl font-bold text-gray-900">{analyticsData.profileViews.total.toLocaleString()}</p>
                  <div className="flex items-center mt-1">
                    <span className={`text-sm ${getTrendColor(analyticsData.profileViews.trend)}`}>
                      {getTrendIcon(analyticsData.profileViews.trend)} {Math.abs(analyticsData.profileViews.trend)}%
                    </span>
                    <span className="text-sm text-gray-500 ml-1">vs last month</span>
                  </div>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Eye className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Connections</p>
                  <p className="text-2xl font-bold text-gray-900">{analyticsData.connections.total}</p>
                  <div className="flex items-center mt-1">
                    <span className={`text-sm ${getTrendColor(analyticsData.connections.trend)}`}>
                      {getTrendIcon(analyticsData.connections.trend)} {Math.abs(analyticsData.connections.trend)}%
                    </span>
                    <span className="text-sm text-gray-500 ml-1">vs last month</span>
                  </div>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Messages</p>
                  <p className="text-2xl font-bold text-gray-900">{analyticsData.messages.total}</p>
                  <div className="flex items-center mt-1">
                    <span className={`text-sm ${getTrendColor(analyticsData.messages.trend)}`}>
                      {getTrendIcon(analyticsData.messages.trend)} {Math.abs(analyticsData.messages.trend)}%
                    </span>
                    <span className="text-sm text-gray-500 ml-1">vs last month</span>
                  </div>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Response Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{analyticsData.messages.responseRate}%</p>
                  <div className="flex items-center mt-1">
                    <span className="text-sm text-gray-500">Avg response time: {analyticsData.engagement.responseTime}</span>
                  </div>
                </div>
                <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Activity className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Engagement Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Profile Engagement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Profile Completeness</span>
                  <span className="text-sm font-bold">{analyticsData.engagement.profileCompleteness}%</span>
                </div>
                <Progress value={analyticsData.engagement.profileCompleteness} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Activity Score</span>
                  <span className="text-sm font-bold">{analyticsData.engagement.activityScore}/100</span>
                </div>
                <Progress value={analyticsData.engagement.activityScore} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Match Quality</span>
                  <span className="text-sm font-bold">{analyticsData.engagement.matchQuality}/10</span>
                </div>
                <Progress value={analyticsData.engagement.matchQuality * 10} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Connection Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium">Accepted</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold">{analyticsData.connections.accepted}</span>
                    <span className="text-sm text-gray-500 ml-1">
                      ({Math.round((analyticsData.connections.accepted / analyticsData.connections.total) * 100)}%)
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm font-medium">Pending</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold">{analyticsData.connections.pending}</span>
                    <span className="text-sm text-gray-500 ml-1">
                      ({Math.round((analyticsData.connections.pending / analyticsData.connections.total) * 100)}%)
                    </span>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Total Connections</span>
                    <span className="text-lg font-bold">{analyticsData.connections.total}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics */}
        <Tabs defaultValue="demographics" className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="matches">Top Matches</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="demographics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Top Locations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analyticsData.demographics.topLocations.map((location, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{location.location}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-[#0F7377] h-2 rounded-full" 
                              style={{ width: `${location.percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600 w-12 text-right">{location.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Industries
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analyticsData.demographics.topIndustries.map((industry, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{industry.industry}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: `${industry.percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600 w-12 text-right">{industry.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Experience Levels
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analyticsData.demographics.experienceLevels.map((level, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{level.level}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${level.percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600 w-12 text-right">{level.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Activity Over Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Activity chart would be displayed here</p>
                    <p className="text-sm">Integration with charting library needed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="matches" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Top Matches
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.topMatches.map((match) => (
                    <div key={match.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-[#0F7377]/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-[#0F7377]">
                            {match.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-medium">{match.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {match.location}
                            </span>
                            <span>{match.industry}</span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {match.lastActive}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-[#0F7377]">{match.compatibility}%</div>
                        <div className="text-sm text-gray-500">Compatibility</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Optimization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-medium text-green-800">✓ Profile Complete</h4>
                      <p className="text-sm text-green-600">Your profile is 87% complete, which is above average.</p>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-medium text-blue-800">💡 Add More Skills</h4>
                      <p className="text-sm text-blue-600">Consider adding 2-3 more technical skills to improve matches.</p>
                    </div>
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <h4 className="font-medium text-yellow-800">📸 Add Profile Photo</h4>
                      <p className="text-sm text-yellow-600">Profiles with photos get 3x more views.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Engagement Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-medium text-green-800">✓ Great Response Rate</h4>
                      <p className="text-sm text-green-600">Your 94% response rate is excellent!</p>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-medium text-blue-800">⚡ Quick Responses</h4>
                      <p className="text-sm text-blue-600">Responding within 2 hours increases connection success by 40%.</p>
                    </div>
                    <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                      <h4 className="font-medium text-purple-800">🎯 Targeted Outreach</h4>
                      <p className="text-sm text-purple-600">Focus on profiles with 80%+ compatibility for better results.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
