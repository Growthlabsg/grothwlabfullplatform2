"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/contexts/auth-context"

interface ConnectionAnalyticsProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ConnectionAnalytics({ open, onOpenChange }: ConnectionAnalyticsProps) {
  const [activeTab, setActiveTab] = useState<"growth" | "engagement" | "industry">("growth")
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("month")
  const { user } = useAuth()

  // Mock data for network growth
  const growthData = {
    week: [
      { date: "Mon", connections: 2 },
      { date: "Tue", connections: 1 },
      { date: "Wed", connections: 3 },
      { date: "Thu", connections: 0 },
      { date: "Fri", connections: 2 },
      { date: "Sat", connections: 1 },
      { date: "Sun", connections: 0 },
    ],
    month: [
      { date: "Week 1", connections: 5 },
      { date: "Week 2", connections: 8 },
      { date: "Week 3", connections: 3 },
      { date: "Week 4", connections: 7 },
    ],
    year: [
      { date: "Jan", connections: 12 },
      { date: "Feb", connections: 19 },
      { date: "Mar", connections: 15 },
      { date: "Apr", connections: 22 },
      { date: "May", connections: 18 },
      { date: "Jun", connections: 25 },
      { date: "Jul", connections: 30 },
      { date: "Aug", connections: 28 },
      { date: "Sep", connections: 35 },
      { date: "Oct", connections: 40 },
      { date: "Nov", connections: 48 },
      { date: "Dec", connections: 52 },
    ],
  }

  // Mock data for engagement
  const engagementData = {
    week: [
      { date: "Mon", messages: 5, profile_views: 3 },
      { date: "Tue", messages: 8, profile_views: 4 },
      { date: "Wed", messages: 3, profile_views: 2 },
      { date: "Thu", messages: 7, profile_views: 5 },
      { date: "Fri", messages: 10, profile_views: 6 },
      { date: "Sat", messages: 4, profile_views: 2 },
      { date: "Sun", messages: 2, profile_views: 1 },
    ],
    month: [
      { date: "Week 1", messages: 20, profile_views: 15 },
      { date: "Week 2", messages: 25, profile_views: 18 },
      { date: "Week 3", messages: 18, profile_views: 12 },
      { date: "Week 4", messages: 30, profile_views: 22 },
    ],
    year: [
      { date: "Jan", messages: 50, profile_views: 35 },
      { date: "Feb", messages: 65, profile_views: 40 },
      { date: "Mar", messages: 55, profile_views: 30 },
      { date: "Apr", messages: 70, profile_views: 45 },
      { date: "May", messages: 60, profile_views: 38 },
      { date: "Jun", messages: 80, profile_views: 50 },
      { date: "Jul", messages: 90, profile_views: 55 },
      { date: "Aug", messages: 85, profile_views: 52 },
      { date: "Sep", messages: 100, profile_views: 60 },
      { date: "Oct", messages: 110, profile_views: 65 },
      { date: "Nov", messages: 120, profile_views: 70 },
      { date: "Dec", messages: 130, profile_views: 75 },
    ],
  }

  // Mock data for industry breakdown
  const industryData = [
    { industry: "Technology", percentage: 35 },
    { industry: "Finance", percentage: 20 },
    { industry: "Healthcare", percentage: 15 },
    { industry: "Education", percentage: 10 },
    { industry: "Manufacturing", percentage: 8 },
    { industry: "Retail", percentage: 7 },
    { industry: "Other", percentage: 5 },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Network Analytics</DialogTitle>
          <DialogDescription>Insights about your professional network and connections</DialogDescription>
        </DialogHeader>

        <div className="flex justify-end">
          <Select value={timeRange} onValueChange={(value) => setTimeRange(value as any)}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last 7 days</SelectItem>
              <SelectItem value="month">Last 30 days</SelectItem>
              <SelectItem value="year">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="growth" value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="growth">Network Growth</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="industry">Industry Breakdown</TabsTrigger>
          </TabsList>

          <TabsContent value="growth">
            <Card>
              <CardHeader>
                <CardTitle>Network Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <p className="text-muted-foreground">Chart visualization would go here</p>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold">
                        {(growthData[timeRange] ? growthData[timeRange].reduce : undefined)((sum, item) => sum + item.connections, 0)}
                      </div>
                      <p className="text-sm text-muted-foreground">New connections</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold">
                        {Math.round(
                          (growthData[timeRange] ? growthData[timeRange].reduce : undefined)((sum, item) => sum + item.connections, 0) /
                            (growthData[timeRange] ? growthData[timeRange].length : undefined),
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Avg. connections per {timeRange === "week" ? "day" : timeRange === "month" ? "week" : "month"}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="engagement">
            <Card>
              <CardHeader>
                <CardTitle>Network Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <p className="text-muted-foreground">Chart visualization would go here</p>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold">
                        {(engagementData[timeRange] ? engagementData[timeRange].reduce : undefined)((sum, item) => sum + item.messages, 0)}
                      </div>
                      <p className="text-sm text-muted-foreground">Messages exchanged</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold">
                        {(engagementData[timeRange] ? engagementData[timeRange].reduce : undefined)((sum, item) => sum + item.profile_views, 0)}
                      </div>
                      <p className="text-sm text-muted-foreground">Profile views</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="industry">
            <Card>
              <CardHeader>
                <CardTitle>Industry Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <p className="text-muted-foreground">Pie chart visualization would go here</p>
                </div>
                <div className="space-y-2 mt-4">
                  {industryData.map((item) => (
                    <div key={item.industry} className="flex items-center justify-between">
                      <span>{item.industry}</span>
                      <span className="font-medium">{item.percentage}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
