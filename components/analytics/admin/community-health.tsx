"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MetricCard } from "@/components/dashboard/metric-card"
import { AreaChart } from "@/components/dashboard/area-chart"
import { BarChartComponent } from "@/components/dashboard/bar-chart"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageSquare, Users, UserPlus, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"

interface CommunityHealthProps {
  timeframe: string
}

export function CommunityHealth({ timeframe }: CommunityHealthProps) {
  // Mock data - in a real app, this would come from an API
  const healthMetrics = [
    {
      title: "Active Users",
      value: "3,842",
      description: "Monthly active users",
      icon: Users,
      trend: { value: 12, isPositive: true },
    },
    {
      title: "New Members",
      value: "485",
      description: "New signups this month",
      icon: UserPlus,
      trend: { value: 8, isPositive: true },
    },
    {
      title: "Engagement Rate",
      value: "68%",
      description: "User participation",
      icon: MessageSquare,
      trend: { value: 5, isPositive: true },
    },
    {
      title: "Reported Issues",
      value: "12",
      description: "Open reports",
      icon: AlertTriangle,
      trend: { value: 3, isPositive: false },
    },
  ]

  const userGrowthData = [
    { name: "Jan", value: 2800 },
    { name: "Feb", value: 3100 },
    { name: "Mar", value: 3300 },
    { name: "Apr", value: 3500 },
    { name: "May", value: 3650 },
    { name: "Jun", value: 3800 },
    { name: "Jul", value: 3900 },
    { name: "Aug", value: 4050 },
    { name: "Sep", value: 4200 },
    { name: "Oct", value: 4350 },
    { name: "Nov", value: 4500 },
    { name: "Dec", value: 4650 },
  ]

  const retentionData = [
    { name: "Week 1", value: 100 },
    { name: "Week 2", value: 85 },
    { name: "Week 3", value: 72 },
    { name: "Week 4", value: 68 },
    { name: "Week 5", value: 65 },
    { name: "Week 6", value: 62 },
    { name: "Week 7", value: 60 },
    { name: "Week 8", value: 58 },
  ]

  const userSegments = [
    { name: "Founders", value: 45 },
    { name: "Investors", value: 15 },
    { name: "Job Seekers", value: 25 },
    { name: "Mentors", value: 10 },
    { name: "Service Providers", value: 5 },
  ]

  const communityIssues = [
    {
      id: 1,
      title: "Spam in Discussion Forums",
      category: "Content",
      severity: "Medium",
      status: "In Progress",
      reportCount: 8,
      lastReported: "2025-05-10",
    },
    {
      id: 2,
      title: "Inappropriate Messages",
      category: "Communication",
      severity: "High",
      status: "Under Review",
      reportCount: 5,
      lastReported: "2025-05-12",
    },
    {
      id: 3,
      title: "Fake Profiles",
      category: "Users",
      severity: "Medium",
      status: "In Progress",
      reportCount: 4,
      lastReported: "2025-05-08",
    },
    {
      id: 4,
      title: "Misleading Job Postings",
      category: "Jobs",
      severity: "Low",
      status: "New",
      reportCount: 2,
      lastReported: "2025-05-14",
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-amber-100 text-amber-800"
      case "Low":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved":
        return "bg-green-100 text-green-800"
      case "In Progress":
        return "bg-amber-100 text-amber-800"
      case "Under Review":
        return "bg-purple-100 text-purple-800"
      case "New":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {healthMetrics.map((metric, index) => (
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
        <AreaChart title="User Growth" description="Total users over time" data={userGrowthData} color="#0F7377" />

        <AreaChart
          title="User Retention"
          description="Cohort retention over 8 weeks"
          data={retentionData}
          valueSuffix="%"
          color="#0F7377"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>User Segments</CardTitle>
            <CardDescription>Distribution of users by role</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChartComponent data={userSegments} valueSuffix="%" color="#0F7377" hideTitle height={250} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Community Health Score</CardTitle>
            <CardDescription>Overall health of your community</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex flex-col items-center justify-center">
                <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-slate-50">
                  <div className="absolute inset-2 rounded-full bg-white"></div>
                  <div className="relative text-center">
                    <div className="text-5xl font-bold text-[#0F7377]">85</div>
                    <div className="text-sm font-medium text-muted-foreground">out of 100</div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <Badge className="bg-green-600">Good</Badge>
                  <p className="mt-1 text-sm text-muted-foreground">Your community is healthy and growing</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>Engagement</span>
                    <span className="font-medium">92/100</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>Growth</span>
                    <span className="font-medium">88/100</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>Retention</span>
                    <span className="font-medium">78/100</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>Safety</span>
                    <span className="font-medium">82/100</span>
                  </div>
                  <Progress value={82} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Community Issues</CardTitle>
          <CardDescription>Reported issues and moderation status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {communityIssues.map((issue) => (
              <div key={issue.id} className="rounded-lg border p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium">{issue.title}</h3>
                      <Badge variant="outline">{issue.category}</Badge>
                      <Badge className={getSeverityColor(issue.severity)}>{issue.severity}</Badge>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <div>
                        <Badge className={getStatusColor(issue.status)}>{issue.status}</Badge>
                      </div>
                      <div className="text-muted-foreground">
                        {issue.reportCount} reports • Last reported: {new Date(issue.lastReported).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href="#">View Details</Link>
                    </Button>
                    <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90" asChild>
                      <Link href="#">Take Action</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
