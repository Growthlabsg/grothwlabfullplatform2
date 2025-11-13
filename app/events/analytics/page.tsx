"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Calendar, 
  Eye, 
  Heart, 
  Share2, 
  Download,
  ArrowLeft,
  Filter,
  Search,
  MoreHorizontal
} from "lucide-react"
import Link from "next/link"

interface EventAnalytics {
  totalEvents: number
  totalAttendees: number
  totalViews: number
  totalShares: number
  averageRating: number
  topEvents: Array<{
    id: number
    title: string
    attendees: number
    views: number
    rating: number
  }>
  monthlyStats: Array<{
    month: string
    events: number
    attendees: number
    revenue: number
  }>
  categoryBreakdown: Array<{
    category: string
    count: number
    percentage: number
  }>
}

export default function EventsAnalyticsPage() {
  const [analytics, setAnalytics] = useState<EventAnalytics | null>(null)
  const [selectedPeriod, setSelectedPeriod] = useState("30d")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading analytics data
    setTimeout(() => {
      setAnalytics({
        totalEvents: 45,
        totalAttendees: 2840,
        totalViews: 15600,
        totalShares: 320,
        averageRating: 4.7,
        topEvents: [
          { id: 1, title: "Tech Startup Pitch Night", attendees: 250, views: 1200, rating: 4.8 },
          { id: 2, title: "AI Workshop Series", attendees: 180, views: 950, rating: 4.6 },
          { id: 3, title: "Founder Networking Mixer", attendees: 120, views: 800, rating: 4.5 },
          { id: 4, title: "Demo Day: Cohort 4", attendees: 300, views: 1500, rating: 4.9 },
          { id: 5, title: "FinTech Pitch Night", attendees: 200, views: 1100, rating: 4.7 }
        ],
        monthlyStats: [
          { month: "Jan", events: 8, attendees: 450, revenue: 2500 },
          { month: "Feb", events: 12, attendees: 680, revenue: 3200 },
          { month: "Mar", events: 15, attendees: 920, revenue: 4100 },
          { month: "Apr", events: 10, attendees: 790, revenue: 2800 }
        ],
        categoryBreakdown: [
          { category: "Workshop", count: 15, percentage: 33.3 },
          { category: "Networking", count: 12, percentage: 26.7 },
          { category: "Pitch Night", count: 10, percentage: 22.2 },
          { category: "Demo Day", count: 5, percentage: 11.1 },
          { category: "Fireside Chat", count: 3, percentage: 6.7 }
        ]
      })
      setIsLoading(false)
    }, 1000)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0F7377] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/events">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Events
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Event Analytics</h1>
                <p className="text-gray-600">Comprehensive insights into your events performance</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Events</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics?.totalEvents}</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Attendees</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics?.totalAttendees.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +18% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics?.totalViews.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +25% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics?.averageRating}/5.0</div>
              <p className="text-xs text-muted-foreground">
                +0.2 from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="events">Top Events</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Performance</CardTitle>
                  <CardDescription>Events and attendees over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics?.monthlyStats.map((stat, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-[#0F7377] rounded-full"></div>
                          <span className="font-medium">{stat.month}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{stat.events} events</div>
                          <div className="text-sm text-gray-500">{stat.attendees} attendees</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Engagement Metrics</CardTitle>
                  <CardDescription>Social engagement and sharing</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Total Shares</span>
                      <Badge variant="secondary">{analytics?.totalShares}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Average Views per Event</span>
                      <Badge variant="secondary">
                        {Math.round((analytics?.totalViews || 0) / (analytics?.totalEvents || 1))}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Average Attendees per Event</span>
                      <Badge variant="secondary">
                        {Math.round((analytics?.totalAttendees || 0) / (analytics?.totalEvents || 1))}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Events</CardTitle>
                <CardDescription>Events ranked by attendance and engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics?.topEvents.map((event, index) => (
                    <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-[#0F7377] text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-semibold">{event.title}</h3>
                          <p className="text-sm text-gray-500">{event.attendees} attendees • {event.views} views</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{event.rating}/5.0</Badge>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Trends</CardTitle>
                  <CardDescription>Monthly attendance patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                      <p>Chart visualization would go here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trends</CardTitle>
                  <CardDescription>Monthly revenue from paid events</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <TrendingUp className="h-12 w-12 mx-auto mb-2" />
                      <p>Revenue chart would go here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Category Breakdown</CardTitle>
                <CardDescription>Distribution of events by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics?.categoryBreakdown.map((category, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-[#0F7377] rounded"></div>
                        <span className="font-medium">{category.category}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">{category.count} events</span>
                        <Badge variant="outline">{category.percentage}%</Badge>
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
