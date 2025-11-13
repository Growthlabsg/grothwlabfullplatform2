"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MetricCard } from "@/components/dashboard/metric-card"
import { AreaChart } from "@/components/dashboard/area-chart"
import { BarChartComponent } from "@/components/dashboard/bar-chart"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, Users, Building, Calendar, CreditCard } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface PlatformOverviewProps {
  timeframe: string
}

export function PlatformOverview({ timeframe }: PlatformOverviewProps) {
  // Mock data - in a real app, this would come from an API
  const platformMetrics = [
    {
      title: "Total Users",
      value: "4,652",
      description: "Registered users",
      icon: Users,
      trend: { value: 12, isPositive: true },
    },
    {
      title: "Total Startups",
      value: "842",
      description: "Registered startups",
      icon: Building,
      trend: { value: 8, isPositive: true },
    },
    {
      title: "Events Hosted",
      value: "124",
      description: "Total events",
      icon: Calendar,
      trend: { value: 15, isPositive: true },
    },
    {
      title: "Revenue",
      value: "$248K",
      description: "Total revenue",
      icon: CreditCard,
      trend: { value: 18, isPositive: true },
    },
  ]

  const userGrowthData = [
    { name: "Jan", value: 3200 },
    { name: "Feb", value: 3400 },
    { name: "Mar", value: 3600 },
    { name: "Apr", value: 3800 },
    { name: "May", value: 4000 },
    { name: "Jun", value: 4200 },
    { name: "Jul", value: 4300 },
    { name: "Aug", value: 4400 },
    { name: "Sep", value: 4500 },
    { name: "Oct", value: 4600 },
    { name: "Nov", value: 4700 },
    { name: "Dec", value: 4800 },
  ]

  const revenueData = [
    { name: "Jan", value: 18000 },
    { name: "Feb", value: 19500 },
    { name: "Mar", value: 21000 },
    { name: "Apr", value: 22500 },
    { name: "May", value: 24000 },
    { name: "Jun", value: 25500 },
    { name: "Jul", value: 27000 },
    { name: "Aug", value: 28500 },
    { name: "Sep", value: 30000 },
    { name: "Oct", value: 31500 },
    { name: "Nov", value: 33000 },
    { name: "Dec", value: 34500 },
  ]

  const userTypeData = [
    { name: "Founders", value: 45 },
    { name: "Job Seekers", value: 25 },
    { name: "Investors", value: 15 },
    { name: "Mentors", value: 10 },
    { name: "Service Providers", value: 5 },
  ]

  const revenueSourceData = [
    { name: "Premium Subscriptions", value: 55 },
    { name: "Event Tickets", value: 20 },
    { name: "Job Postings", value: 15 },
    { name: "Sponsorships", value: 10 },
  ]

  const platformHealth = [
    {
      metric: "System Uptime",
      value: "99.98%",
      status: "Excellent",
      trend: "Stable",
    },
    {
      metric: "Average Response Time",
      value: "245ms",
      status: "Good",
      trend: "Improving",
    },
    {
      metric: "Error Rate",
      value: "0.12%",
      status: "Excellent",
      trend: "Stable",
    },
    {
      metric: "Database Performance",
      value: "98.5%",
      status: "Good",
      trend: "Stable",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {platformMetrics.map((metric, index) => (
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

        <AreaChart title="Revenue" description="Monthly revenue" data={revenueData} valuePrefix="$" color="#0F7377" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>User Distribution</CardTitle>
            <CardDescription>Breakdown of users by type</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChartComponent data={userTypeData} valueSuffix="%" color="#0F7377" hideTitle height={250} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Sources</CardTitle>
            <CardDescription>Breakdown of revenue by source</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChartComponent data={revenueSourceData} valueSuffix="%" color="#0F7377" hideTitle height={250} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Platform Health</CardTitle>
          <CardDescription>System performance and reliability metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {platformHealth.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="text-sm font-medium text-muted-foreground">{item.metric}</div>
                  <div className="mt-1 flex items-center justify-between">
                    <div className="text-2xl font-bold">{item.value}</div>
                    <Badge
                      className={
                        item.status === "Excellent"
                          ? "bg-green-100 text-green-800"
                          : item.status === "Good"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-amber-100 text-amber-800"
                      }
                    >
                      {item.status}
                    </Badge>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    {item.trend === "Improving" ? (
                      <span className="flex items-center text-green-600">
                        <ArrowUpRight className="mr-1 h-3 w-3" />
                        Improving
                      </span>
                    ) : (
                      <span>Stable</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Key Performance Indicators</CardTitle>
          <CardDescription>Progress towards platform goals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">User Growth</div>
                  <div className="text-sm text-muted-foreground">Goal: 5,000 users by end of year</div>
                </div>
                <div className="text-sm font-medium">93% Complete</div>
              </div>
              <Progress value={93} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Revenue Target</div>
                  <div className="text-sm text-muted-foreground">Goal: $300K annual revenue</div>
                </div>
                <div className="text-sm font-medium">82% Complete</div>
              </div>
              <Progress value={82} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Startup Registrations</div>
                  <div className="text-sm text-muted-foreground">Goal: 1,000 startups</div>
                </div>
                <div className="text-sm font-medium">84% Complete</div>
              </div>
              <Progress value={84} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Event Attendance</div>
                  <div className="text-sm text-muted-foreground">Goal: 5,000 attendees</div>
                </div>
                <div className="text-sm font-medium">78% Complete</div>
              </div>
              <Progress value={78} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
