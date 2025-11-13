"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MetricCard } from "@/components/dashboard/metric-card"
import { AreaChart } from "@/components/dashboard/area-chart"
import { BarChartComponent } from "@/components/dashboard/bar-chart"
import { Badge } from "@/components/ui/badge"
import { Activity, Clock, MessageSquare, Users } from "lucide-react"

interface UserEngagementProps {
  timeframe: string
}

export function UserEngagement({ timeframe }: UserEngagementProps) {
  // Mock data - in a real app, this would come from an API
  const engagementMetrics = [
    {
      title: "DAU/MAU Ratio",
      value: "42%",
      description: "Daily to monthly active users",
      icon: Activity,
      trend: { value: 3, isPositive: true },
    },
    {
      title: "Avg. Session",
      value: "8.5m",
      description: "Average session duration",
      icon: Clock,
      trend: { value: 0.8, isPositive: true },
    },
    {
      title: "Messages",
      value: "12.4K",
      description: "Messages exchanged",
      icon: MessageSquare,
      trend: { value: 15, isPositive: true },
    },
    {
      title: "Retention",
      value: "68%",
      description: "30-day retention rate",
      icon: Users,
      trend: { value: 4, isPositive: true },
    },
  ]

  const dailyActiveUsersData = [
    { name: "Mon", value: 1245 },
    { name: "Tue", value: 1320 },
    { name: "Wed", value: 1410 },
    { name: "Thu", value: 1380 },
    { name: "Fri", value: 1290 },
    { name: "Sat", value: 980 },
    { name: "Sun", value: 920 },
  ]

  const retentionCohortData = [
    { name: "Week 1", value: 100 },
    { name: "Week 2", value: 82 },
    { name: "Week 3", value: 74 },
    { name: "Week 4", value: 68 },
    { name: "Week 5", value: 64 },
    { name: "Week 6", value: 62 },
    { name: "Week 7", value: 60 },
    { name: "Week 8", value: 58 },
  ]

  const topEngagingContent = [
    {
      title: "How to Secure Seed Funding in Singapore",
      type: "Article",
      views: 3842,
      engagement: "High",
      comments: 56,
      shares: 128,
    },
    {
      title: "Building a Technical Co-founder Relationship",
      type: "Webinar",
      views: 2156,
      engagement: "Very High",
      comments: 42,
      shares: 95,
    },
    {
      title: "Singapore Startup Ecosystem Guide 2025",
      type: "Guide",
      views: 1845,
      engagement: "Medium",
      comments: 28,
      shares: 76,
    },
    {
      title: "Navigating Regulatory Challenges for Fintech Startups",
      type: "Workshop",
      views: 1620,
      engagement: "High",
      comments: 34,
      shares: 62,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {engagementMetrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            description={metric.description}
            icon={metric.icon}
            trend={metric.trend}
          />
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <AreaChart
          title="Daily Active Users"
          description="Active users by day of week"
          data={dailyActiveUsersData}
          color="#0F7377"
        />

        <BarChartComponent
          title="User Retention"
          description="Cohort retention over 8 weeks"
          data={retentionCohortData}
          valueSuffix="%"
          color="#0F7377"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Engaging Content</CardTitle>
          <CardDescription>Content with highest user engagement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topEngagingContent.map((content, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium">{content.title}</h3>
                        <Badge variant="outline">{content.type}</Badge>
                      </div>

                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Users className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{content.views.toLocaleString()} views</span>
                        </div>
                        <div>
                          <Badge
                            variant="outline"
                            className={
                              content.engagement === "Very High"
                                ? "bg-green-50 text-green-700"
                                : content.engagement === "High"
                                  ? "bg-blue-50 text-blue-700"
                                  : "bg-amber-50 text-amber-700"
                            }
                          >
                            {content.engagement} Engagement
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{content.comments} comments</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Activity className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{content.shares} shares</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-gray-50">
                        {timeframe}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
