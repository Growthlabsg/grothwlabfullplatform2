"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ApplicationPerformance } from "./application-performance"
import { SkillGapAnalysis } from "./skill-gap-analysis"
import { CareerPathRecommendations } from "./career-path-recommendations"
import { JobMarketInsights } from "./job-market-insights"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { Button } from "@/components/ui/button"
import { Download, RefreshCw } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function JobSeekerAnalyticsDashboard() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    to: new Date(),
  })

  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = () => {
    setRefreshing(true)
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Career Analytics</h2>
          <p className="text-muted-foreground">
            Track your job search progress and get insights to improve your career prospects
          </p>
        </div>
        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-x-2 md:space-y-0">
          <DateRangePicker value={dateRange} onChange={setDateRange} />
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by job type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Applications</SelectItem>
              <SelectItem value="fullTime">Full-time</SelectItem>
              <SelectItem value="partTime">Part-time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="internship">Internship</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" onClick={handleRefresh}>
              <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
              <span className="sr-only">Refresh data</span>
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
              <span className="sr-only">Download report</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications Submitted</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interview Invitations</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">+33% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">33%</div>
            <p className="text-xs text-muted-foreground">+18% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offer Conversion</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5%</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="performance">Application Performance</TabsTrigger>
          <TabsTrigger value="skills">Skill Gap Analysis</TabsTrigger>
          <TabsTrigger value="career">Career Path</TabsTrigger>
          <TabsTrigger value="market">Market Insights</TabsTrigger>
        </TabsList>
        <TabsContent value="performance" className="space-y-4">
          <ApplicationPerformance />
        </TabsContent>
        <TabsContent value="skills" className="space-y-4">
          <SkillGapAnalysis />
        </TabsContent>
        <TabsContent value="career" className="space-y-4">
          <CareerPathRecommendations />
        </TabsContent>
        <TabsContent value="market" className="space-y-4">
          <JobMarketInsights />
        </TabsContent>
      </Tabs>
    </div>
  )
}
