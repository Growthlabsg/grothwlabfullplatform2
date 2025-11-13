"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts"
import { BarChart2, TrendingUp, Users, MessageSquare, Clock, Download } from "lucide-react"

interface ChatAnalyticsProps {
  className?: string
}

// Mock data for message activity
const messageActivityData = [
  { date: "Mon", count: 45 },
  { date: "Tue", count: 72 },
  { date: "Wed", count: 58 },
  { date: "Thu", count: 93 },
  { date: "Fri", count: 65 },
  { date: "Sat", count: 42 },
  { date: "Sun", count: 38 },
]

// Mock data for message distribution
const messageDistributionData = [
  { name: "Direct Messages", value: 45 },
  { name: "Group Chats", value: 30 },
  { name: "Team Channels", value: 15 },
  { name: "Community", value: 10 },
]

// Mock data for response time
const responseTimeData = [
  { date: "Mon", time: 12 },
  { date: "Tue", time: 8 },
  { date: "Wed", time: 15 },
  { date: "Thu", time: 10 },
  { date: "Fri", time: 7 },
  { date: "Sat", time: 20 },
  { date: "Sun", time: 18 },
]

// Mock data for user engagement
const userEngagementData = [
  { name: "Sarah Chen", messages: 120, calls: 5, files: 12 },
  { name: "Alex Wong", messages: 85, calls: 3, files: 8 },
  { name: "Mei Lin", messages: 65, calls: 2, files: 5 },
  { name: "David Lee", messages: 45, calls: 1, files: 3 },
  { name: "Jessica Tan", messages: 30, calls: 0, files: 2 },
]

// Colors for pie chart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export function ChatAnalytics({ className }: ChatAnalyticsProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [timeRange, setTimeRange] = useState("7d")

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center">
          <BarChart2 className="h-5 w-5 mr-2" />
          Communication Analytics
        </h2>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="px-4 border-b">
          <TabsList className="w-full justify-start p-0 h-auto bg-transparent border-b-0">
            <TabsTrigger value="overview" className="text-sm py-2 px-4 h-10 data-[state=active]:bg-transparent">
              Overview
            </TabsTrigger>
            <TabsTrigger value="messages" className="text-sm py-2 px-4 h-10 data-[state=active]:bg-transparent">
              Messages
            </TabsTrigger>
            <TabsTrigger value="users" className="text-sm py-2 px-4 h-10 data-[state=active]:bg-transparent">
              Users
            </TabsTrigger>
            <TabsTrigger value="channels" className="text-sm py-2 px-4 h-10 data-[state=active]:bg-transparent">
              Channels
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-auto p-4">
          <TabsContent value="overview" className="m-0">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <Card>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Messages</p>
                    <p className="text-2xl font-bold">1,248</p>
                    <div className="flex items-center text-xs text-green-500 mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      <span>+12% this week</span>
                    </div>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-full">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Users</p>
                    <p className="text-2xl font-bold">42</p>
                    <div className="flex items-center text-xs text-green-500 mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      <span>+5% this week</span>
                    </div>
                  </div>
                  <div className="bg-blue-500/10 p-3 rounded-full">
                    <Users className="h-6 w-6 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Response Time</p>
                    <p className="text-2xl font-bold">12 min</p>
                    <div className="flex items-center text-xs text-red-500 mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      <span>+3 min this week</span>
                    </div>
                  </div>
                  <div className="bg-purple-500/10 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Channels</p>
                    <p className="text-2xl font-bold">18</p>
                    <div className="flex items-center text-xs text-green-500 mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      <span>+2 this week</span>
                    </div>
                  </div>
                  <div className="bg-green-500/10 p-3 rounded-full">
                    <MessageSquare className="h-6 w-6 text-green-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Message Activity</CardTitle>
                  <CardDescription>Daily message count over time</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={messageActivityData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Message Distribution</CardTitle>
                  <CardDescription>By channel type</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={messageDistributionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {messageDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Response Time Trends</CardTitle>
                <CardDescription>Average response time in minutes</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={responseTimeData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="time" stroke="#8884d8" name="Minutes" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="m-0">
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>Message Volume by Time</CardTitle>
                <CardDescription>Hourly distribution of messages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { hour: "00:00", count: 12 },
                        { hour: "02:00", count: 8 },
                        { hour: "04:00", count: 5 },
                        { hour: "06:00", count: 10 },
                        { hour: "08:00", count: 45 },
                        { hour: "10:00", count: 78 },
                        { hour: "12:00", count: 56 },
                        { hour: "14:00", count: 70 },
                        { hour: "16:00", count: 65 },
                        { hour: "18:00", count: 40 },
                        { hour: "20:00", count: 30 },
                        { hour: "22:00", count: 20 },
                      ]}
                      margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Message Types</CardTitle>
                  <CardDescription>Breakdown by content type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Text", value: 65 },
                            { name: "Images", value: 15 },
                            { name: "Files", value: 10 },
                            { name: "Links", value: 8 },
                            { name: "Other", value: 2 },
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {messageDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Message Length</CardTitle>
                  <CardDescription>Distribution by character count</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { length: "1-10", count: 120 },
                          { length: "11-50", count: 250 },
                          { length: "51-100", count: 180 },
                          { length: "101-200", count: 90 },
                          { length: "201+", count: 40 },
                        ]}
                        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="length" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="m-0">
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>User Engagement</CardTitle>
                <CardDescription>Top users by activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={userEngagementData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={100} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="messages" stackId="a" fill="#8884d8" name="Messages" />
                      <Bar dataKey="calls" stackId="a" fill="#82ca9d" name="Calls" />
                      <Bar dataKey="files" stackId="a" fill="#ffc658" name="Files Shared" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>User Activity Times</CardTitle>
                  <CardDescription>When users are most active</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={[
                          { time: "00:00", users: 5 },
                          { time: "03:00", users: 3 },
                          { time: "06:00", users: 8 },
                          { time: "09:00", users: 25 },
                          { time: "12:00", users: 18 },
                          { time: "15:00", users: 30 },
                          { time: "18:00", users: 22 },
                          { time: "21:00", users: 12 },
                        ]}
                        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="users" stroke="#8884d8" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                  <CardDescription>New users over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={[
                          { month: "Jan", users: 20 },
                          { month: "Feb", users: 25 },
                          { month: "Mar", users: 30 },
                          { month: "Apr", users: 32 },
                          { month: "May", users: 38 },
                          { month: "Jun", users: 42 },
                        ]}
                        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="users" stroke="#82ca9d" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="channels" className="m-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Card>
                <CardHeader>
                  <CardTitle>Channel Activity</CardTitle>
                  <CardDescription>Messages per channel</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: "General", messages: 450 },
                          { name: "Marketing", messages: 320 },
                          { name: "Product", messages: 280 },
                          { name: "Engineering", messages: 240 },
                          { name: "Sales", messages: 190 },
                          { name: "Random", messages: 120 },
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        layout="vertical"
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={100} />
                        <Tooltip />
                        <Bar dataKey="messages" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Channel Growth</CardTitle>
                  <CardDescription>New channels over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={[
                          { month: "Jan", channels: 5 },
                          { month: "Feb", channels: 8 },
                          { month: "Mar", channels: 10 },
                          { month: "Apr", channels: 12 },
                          { month: "May", channels: 15 },
                          { month: "Jun", channels: 18 },
                        ]}
                        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="channels" stroke="#82ca9d" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Channel Engagement</CardTitle>
                <CardDescription>Users per channel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: "General", users: 42, messages: 450 },
                        { name: "Marketing", users: 28, messages: 320 },
                        { name: "Product", users: 35, messages: 280 },
                        { name: "Engineering", users: 22, messages: 240 },
                        { name: "Sales", users: 18, messages: 190 },
                        { name: "Random", users: 38, messages: 120 },
                      ]}
                      margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="users" fill="#8884d8" name="Active Users" />
                      <Bar yAxisId="right" dataKey="messages" fill="#82ca9d" name="Messages" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
