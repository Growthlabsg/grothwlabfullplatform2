"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EngagementOverview } from "./engagement-overview"
import { ContentPerformance } from "./content-performance"
import { UserActivity } from "./user-activity"
import { Calendar, Download, RefreshCw } from "lucide-react"

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("30d")
  const [isLoading, setIsLoading] = useState(false)

  const handleRefresh = () => {
    setIsLoading(true)
    // Simulate data refresh
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
          <p className="text-muted-foreground">Track your performance and engagement metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="12m">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleRefresh}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
            <CardDescription>Total profile views in selected period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,248</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 mr-1"
              >
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                <polyline points="16 7 22 7 22 13" />
              </svg>
              12.5% from previous period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Post Impressions</CardTitle>
            <CardDescription>Total impressions across all posts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8,543</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 mr-1"
              >
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                <polyline points="16 7 22 7 22 13" />
              </svg>
              23.8% from previous period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
            <CardDescription>Average engagement across all content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">4.7%</div>
            <p className="text-xs text-red-500 flex items-center mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 mr-1"
              >
                <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
                <polyline points="16 17 22 17 22 11" />
              </svg>
              2.3% from previous period
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="engagement">
        <TabsList>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="engagement" className="mt-4">
          <EngagementOverview timeRange={timeRange} />
        </TabsContent>
        <TabsContent value="content" className="mt-4">
          <ContentPerformance timeRange={timeRange} />
        </TabsContent>
        <TabsContent value="activity" className="mt-4">
          <UserActivity timeRange={timeRange} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
