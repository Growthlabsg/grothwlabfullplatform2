"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader2, TrendingUp, TrendingDown, Users, Eye, RefreshCw } from "lucide-react"
import { getRealTimeAnalytics, type AnalyticsReport, type AnalyticsTimeSeriesData } from "@/lib/real-time-analytics"
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart as RechartsBarChart,
  Bar,
} from "recharts"
import { format } from "date-fns"

export function RealTimeDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsReport | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [refreshInterval, setRefreshInterval] = useState<number | null>(30000) // 30 seconds
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  // Load analytics data
  const loadAnalytics = async () => {
    setLoading(true)
    try {
      const data = getRealTimeAnalytics()
      setAnalytics(data)
      setLastUpdated(new Date())
    } catch (error) {
      console.error("Error loading analytics:", error)
    } finally {
      setLoading(false)
    }
  }

  // Load analytics on mount and when refresh interval changes
  useEffect(() => {
    loadAnalytics()

    // Set up refresh interval
    if (refreshInterval) {
      const interval = setInterval(loadAnalytics, refreshInterval)
      return () => clearInterval(interval)
    }
  }, [refreshInterval])

  // Format time series data for charts
  const formatTimeSeriesData = (data: AnalyticsTimeSeriesData[] | undefined) => {
    if (!data) return []

    return data.map((item) => ({
      time: format(new Date(item.timestamp), "HH:mm"),
      value: item.value,
    }))
  }

  if (loading && !analytics) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Real-Time Analytics</h2>
          <p className="text-muted-foreground">Last updated: {format(lastUpdated, "MMM d, yyyy HH:mm:ss")}</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            className="px-2 py-1 border rounded-md text-sm"
            value={refreshInterval?.toString() || "0"}
            onChange={(e) => setRefreshInterval(Number(e.target.value) || null)}
          >
            <option value="0">Manual refresh</option>
            <option value="5000">5 seconds</option>
            <option value="15000">15 seconds</option>
            <option value="30000">30 seconds</option>
            <option value="60000">1 minute</option>
          </select>
          <Button size="sm" variant="outline" onClick={loadAnalytics} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      {analytics && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {analytics.metrics.slice(0, 4).map((metric) => (
              <Card key={metric.name}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        {metric.name.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                      </p>
                      <p className="text-2xl font-bold">{metric.value.toLocaleString()}</p>
                    </div>
                    {metric.changePercentage !== undefined && (
                      <Badge
                        className={
                          metric.changePercentage >= 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }
                      >
                        {metric.changePercentage >= 0 ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(metric.changePercentage)}%
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="h-5 w-5 mr-2 text-primary" />
                      Active Users
                    </CardTitle>
                    <CardDescription>Real-time active users over the last 24 hours</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart
                        data={formatTimeSeriesData(analytics.timeSeriesData?.activeUsers)}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#0F7377" activeDot={{ r: 8 }} />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Eye className="h-5 w-5 mr-2 text-primary" />
                      Page Views
                    </CardTitle>
                    <CardDescription>Page views over the last 24 hours</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={formatTimeSeriesData(analytics.timeSeriesData?.pageViews)}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#0F7377" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="users" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>User Activity</CardTitle>
                  <CardDescription>Active users by time of day</CardDescription>
                </CardHeader>
                <CardContent className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart
                      data={formatTimeSeriesData(analytics.timeSeriesData?.activeUsers)}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#0F7377" activeDot={{ r: 8 }} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Content Performance</CardTitle>
                  <CardDescription>Post views and engagements</CardDescription>
                </CardHeader>
                <CardContent className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="postViews" stroke="#0F7377" name="Post Views" />
                      <Line type="monotone" dataKey="postEngagements" stroke="#82ca9d" name="Engagements" />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="engagement" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Engagement Metrics</CardTitle>
                  <CardDescription>Likes, comments, and shares over time</CardDescription>
                </CardHeader>
                <CardContent className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="likes" fill="#0F7377" name="Likes" />
                      <Bar dataKey="comments" fill="#82ca9d" name="Comments" />
                      <Bar dataKey="shares" fill="#ffc658" name="Shares" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  )
}
