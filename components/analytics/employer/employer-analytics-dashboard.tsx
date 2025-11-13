"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, RefreshCw } from "lucide-react"
import { JobPostingPerformance } from "@/components/analytics/employer/job-posting-performance"
import { CandidateEngagement } from "@/components/analytics/employer/candidate-engagement"
import { HiringFunnel } from "@/components/analytics/employer/hiring-funnel"
import { HiringTrends } from "@/components/analytics/employer/hiring-trends"

export function EmployerAnalyticsDashboard() {
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
        <Tabs defaultValue="postings" className="w-full">
          <TabsList>
            <TabsTrigger value="postings">Job Postings</TabsTrigger>
            <TabsTrigger value="candidates">Candidate Engagement</TabsTrigger>
            <TabsTrigger value="funnel">Hiring Funnel</TabsTrigger>
            <TabsTrigger value="trends">Hiring Trends</TabsTrigger>
          </TabsList>

          <div className="flex items-center justify-between mt-6 mb-4">
            <h2 className="text-xl font-semibold">Recruitment Analytics</h2>
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

          <TabsContent value="postings" className="space-y-6">
            <JobPostingPerformance timeframe={timeframe} />
          </TabsContent>

          <TabsContent value="candidates" className="space-y-6">
            <CandidateEngagement timeframe={timeframe} />
          </TabsContent>

          <TabsContent value="funnel" className="space-y-6">
            <HiringFunnel timeframe={timeframe} />
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <HiringTrends timeframe={timeframe} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
