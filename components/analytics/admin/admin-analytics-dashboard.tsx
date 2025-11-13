"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, RefreshCw } from "lucide-react"
import { PlatformOverview } from "@/components/analytics/admin/platform-overview"
import { UserEngagement } from "@/components/analytics/admin/user-engagement"
import { ContentAnalytics } from "@/components/analytics/admin/content-analytics"
import { CommunityHealth } from "@/components/analytics/admin/community-health"

export function AdminAnalyticsDashboard() {
  const [timeframe, setTimeframe] = useState("90days")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1500)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Platform Overview</TabsTrigger>
            <TabsTrigger value="engagement">User Engagement</TabsTrigger>
            <TabsTrigger value="content">Content Analytics</TabsTrigger>
            <TabsTrigger value="health">Community Health</TabsTrigger>
          </TabsList>

          <div className="flex items-center justify-between mt-6 mb-4">
            <h2 className="text-xl font-semibold">Community Analytics</h2>
            <div className="flex items-center gap-2">
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="90days">Last 90 days</SelectItem>
                  <SelectItem value="6months">Last 6 months</SelectItem>
                  <SelectItem value="1year">Last 12 months</SelectItem>
                  <SelectItem value="all">All time</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" onClick={handleRefresh} disabled={isRefreshing}>
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                <span className="sr-only">Refresh data</span>
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          <TabsContent value="overview" className="space-y-6">
            <PlatformOverview timeframe={timeframe} />
          </TabsContent>

          <TabsContent value="engagement" className="space-y-6">
            <UserEngagement timeframe={timeframe} />
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <ContentAnalytics timeframe={timeframe} />
          </TabsContent>

          <TabsContent value="health" className="space-y-6">
            <CommunityHealth timeframe={timeframe} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
