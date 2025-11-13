"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AreaChart } from "@/components/dashboard/area-chart"
import { BarChartComponent } from "@/components/dashboard/bar-chart"
import { Building, Calendar, GraduationCap, TrendingUp, Users, DollarSign } from "lucide-react"

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("30days")

  // Sample data for the dashboard
  const platformMetrics = [
    {
      title: "Total Users",
      value: "2,845",
      change: "+12.5%",
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
      trend: "up",
    },
    {
      title: "Active Startups",
      value: "342",
      change: "+8.2%",
      icon: <Building className="h-4 w-4 text-muted-foreground" />,
      trend: "up",
    },
    {
      title: "Upcoming Events",
      value: "24",
      change: "+4.0%",
      icon: <Calendar className="h-4 w-4 text-muted-foreground" />,
      trend: "up",
    },
    {
      title: "Active Courses",
      value: "18",
      change: "+15.3%",
      icon: <GraduationCap className="h-4 w-4 text-muted-foreground" />,
      trend: "up",
    },
    {
      title: "Total Funding",
      value: "$12.4M",
      change: "+22.5%",
      icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
      trend: "up",
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      change: "+0.8%",
      icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
      trend: "up",
    },
  ]

  const userGrowthData = [
    { name: "Jan", value: 1200 },
    { name: "Feb", value: 1400 },
    { name: "Mar", value: 1600 },
    { name: "Apr", value: 1800 },
    { name: "May", value: 2100 },
    { name: "Jun", value: 2400 },
    { name: "Jul", value: 2700 },
    { name: "Aug", value: 2845 },
  ]

  const userTypeData = [
    { name: "Founders", value: 1450 },
    { name: "Investors", value: 580 },
    { name: "Mentors", value: 420 },
    { name: "Teachers", value: 245 },
    { name: "Admins", value: 150 },
  ]

  const fundingData = [
    { name: "Pre-Seed", value: 2500000 },
    { name: "Seed", value: 4800000 },
    { name: "Series A", value: 3200000 },
    { name: "Series B", value: 1900000 },
  ]

  const eventAttendanceData = [
    { name: "Jan", value: 120 },
    { name: "Feb", value: 180 },
    { name: "Mar", value: 250 },
    { name: "Apr", value: 310 },
    { name: "May", value: 280 },
    { name: "Jun", value: 420 },
    { name: "Jul", value: 390 },
    { name: "Aug", value: 450 },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h2>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="90days">Last 90 days</SelectItem>
            <SelectItem value="year">Last year</SelectItem>
            <SelectItem value="all">All time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="startups">Startups</TabsTrigger>
          <TabsTrigger value="funding">Funding</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {platformMetrics.map((metric, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                  {metric.icon}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <p
                    className={`text-xs ${metric.trend === "up" ? "text-green-500" : "text-red-500"} flex items-center`}
                  >
                    <TrendingUp className="mr-1 h-3 w-3" />
                    {metric.change} from last period
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>Total user growth over time</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <AreaChart
                  data={userGrowthData}
                  categories={["value"]}
                  index="name"
                  colors={["#0F7377"]}
                  valueFormatter={(value) => `${value.toLocaleString()}`}
                  className="h-[300px]"
                />
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>User Distribution</CardTitle>
                <CardDescription>Breakdown of users by type</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <BarChartComponent
                  data={userTypeData}
                  categories={["value"]}
                  index="name"
                  colors={["#0F7377"]}
                  valueFormatter={(value) => `${value.toLocaleString()}`}
                  className="h-[300px]"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>Total user growth over time</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <AreaChart
                  data={userGrowthData}
                  categories={["value"]}
                  index="name"
                  colors={["#0F7377"]}
                  valueFormatter={(value) => `${value.toLocaleString()}`}
                  className="h-[300px]"
                />
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>User Distribution</CardTitle>
                <CardDescription>Breakdown of users by type</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <BarChartComponent
                  data={userTypeData}
                  categories={["value"]}
                  index="name"
                  colors={["#0F7377"]}
                  valueFormatter={(value) => `${value.toLocaleString()}`}
                  className="h-[300px]"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="funding" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Funding Distribution</CardTitle>
              <CardDescription>Total funding by stage</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <BarChartComponent
                data={fundingData}
                categories={["value"]}
                index="name"
                colors={["#0F7377"]}
                valueFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                className="h-[400px]"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Event Attendance</CardTitle>
              <CardDescription>Monthly event attendance</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <AreaChart
                data={eventAttendanceData}
                categories={["value"]}
                index="name"
                colors={["#0F7377"]}
                valueFormatter={(value) => `${value} attendees`}
                className="h-[400px]"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
