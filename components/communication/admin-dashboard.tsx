"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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
} from "recharts"
import {
  Users,
  Activity,
  Calendar,
  FileText,
  Bell,
  Settings,
  Shield,
  Database,
  Server,
  HardDrive,
  Cpu,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Search,
  Filter,
  Download,
  RefreshCw,
} from "lucide-react"

interface AdminDashboardProps {
  className?: string
}

// Mock data for charts
const userActivityData = [
  { name: "Mon", value: 120 },
  { name: "Tue", value: 150 },
  { name: "Wed", value: 180 },
  { name: "Thu", value: 210 },
  { name: "Fri", value: 190 },
  { name: "Sat", value: 160 },
  { name: "Sun", value: 140 },
]

const userTypeData = [
  { name: "Founders", value: 45 },
  { name: "Investors", value: 20 },
  { name: "Mentors", value: 15 },
  { name: "Partners", value: 10 },
  { name: "Others", value: 10 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

const systemMetricsData = [
  { name: "00:00", cpu: 25, memory: 40, requests: 10 },
  { name: "04:00", cpu: 20, memory: 35, requests: 5 },
  { name: "08:00", cpu: 35, memory: 45, requests: 20 },
  { name: "12:00", cpu: 55, memory: 60, requests: 45 },
  { name: "16:00", cpu: 70, memory: 75, requests: 65 },
  { name: "20:00", cpu: 45, memory: 55, requests: 30 },
  { name: "23:59", cpu: 30, memory: 45, requests: 15 },
]

// Mock data for recent activities
const recentActivities = [
  {
    id: "act1",
    user: {
      name: "Sarah Chen",
      avatar: "/abstract-geometric-shapes.png",
      role: "Founder",
    },
    action: "created a new post",
    target: "The Future of AI in Healthcare",
    time: "10 minutes ago",
  },
  {
    id: "act2",
    user: {
      name: "Alex Wong",
      avatar: "/abstract-geometric-aw.png",
      role: "Investor",
    },
    action: "connected with",
    target: "David Lee",
    time: "1 hour ago",
  },
  {
    id: "act3",
    user: {
      name: "Mei Lin",
      avatar: "/machine-learning-concept.png",
      role: "Mentor",
    },
    action: "scheduled a mentorship session with",
    target: "3 founders",
    time: "2 hours ago",
  },
  {
    id: "act4",
    user: {
      name: "David Lee",
      avatar: "/thoughtful-portrait.png",
      role: "Founder",
    },
    action: "applied for",
    target: "Seed Funding Program",
    time: "3 hours ago",
  },
  {
    id: "act5",
    user: {
      name: "System",
      avatar: "",
      role: "Automated",
    },
    action: "detected unusual login activity for user",
    target: "john.smith@example.com",
    time: "4 hours ago",
  },
]

// Mock data for system alerts
const systemAlerts = [
  {
    id: "alert1",
    type: "warning",
    message: "High CPU usage detected on main server",
    time: "15 minutes ago",
    resolved: false,
  },
  {
    id: "alert2",
    type: "error",
    message: "Database connection timeout - 3 failed attempts",
    time: "45 minutes ago",
    resolved: false,
  },
  {
    id: "alert3",
    type: "info",
    message: "Scheduled maintenance in 24 hours",
    time: "2 hours ago",
    resolved: false,
  },
  {
    id: "alert4",
    type: "success",
    message: "System backup completed successfully",
    time: "3 hours ago",
    resolved: true,
  },
  {
    id: "alert5",
    type: "warning",
    message: "Memory usage approaching threshold (85%)",
    time: "5 hours ago",
    resolved: true,
  },
]

export function AdminDashboard({ className }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-xl font-semibold">Admin Dashboard</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="icon" size-sm>
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="px-4 border-b">
          <TabsList className="w-full justify-start p-0 h-auto bg-transparent border-b-0">
            <TabsTrigger value="overview" className="text-sm py-2 px-4 h-10 data-[state=active]:bg-transparent">
              <Activity className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="users" className="text-sm py-2 px-4 h-10 data-[state=active]:bg-transparent">
              <Users className="h-4 w-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="content" className="text-sm py-2 px-4 h-10 data-[state=active]:bg-transparent">
              <FileText className="h-4 w-4 mr-2" />
              Content
            </TabsTrigger>
            <TabsTrigger value="events" className="text-sm py-2 px-4 h-10 data-[state=active]:bg-transparent">
              <Calendar className="h-4 w-4 mr-2" />
              Events
            </TabsTrigger>
            <TabsTrigger value="system" className="text-sm py-2 px-4 h-10 data-[state=active]:bg-transparent">
              <Server className="h-4 w-4 mr-2" />
              System
            </TabsTrigger>
            <TabsTrigger value="security" className="text-sm py-2 px-4 h-10 data-[state=active]:bg-transparent">
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
          </TabsList>
        </div>

        <ScrollArea className="flex-1">
          <TabsContent value="overview" className="p-4 m-0">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <Card>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Users</p>
                    <p className="text-2xl font-bold">2,543</p>
                    <div className="flex items-center text-xs text-green-500 mt-1">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      <span>+12% this month</span>
                    </div>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Sessions</p>
                    <p className="text-2xl font-bold">187</p>
                    <div className="flex items-center text-xs text-green-500 mt-1">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      <span>+5% today</span>
                    </div>
                  </div>
                  <div className="bg-blue-500/10 p-3 rounded-full">
                    <Activity className="h-6 w-6 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">New Content</p>
                    <p className="text-2xl font-bold">43</p>
                    <div className="flex items-center text-xs text-green-500 mt-1">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      <span>+18% this week</span>
                    </div>
                  </div>
                  <div className="bg-purple-500/10 p-3 rounded-full">
                    <FileText className="h-6 w-6 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">System Health</p>
                    <p className="text-2xl font-bold">98%</p>
                    <div className="flex items-center text-xs text-red-500 mt-1">
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                      <span>-2% from yesterday</span>
                    </div>
                  </div>
                  <div className="bg-green-500/10 p-3 rounded-full">
                    <Zap className="h-6 w-6 text-green-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <Card className="md:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">User Activity</CardTitle>
                  <CardDescription>Daily active users over the past week</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={userActivityData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">User Distribution</CardTitle>
                  <CardDescription>Breakdown by user type</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={userTypeData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {userTypeData.map((entry, index) => (
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Recent Activity</CardTitle>
                  <CardDescription>Latest actions across the platform</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[300px]">
                    <div className="p-4 space-y-4">
                      {recentActivities.map((activity) => (
                        <div key={activity.id} className="flex items-start gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
                            <AvatarFallback>{activity.user.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-1">
                              <span className="font-medium">{activity.user.name}</span>
                              <Badge variant="outline" className="text-xs">
                                {activity.user.role}
                              </Badge>
                            </div>
                            <p className="text-sm">
                              {activity.action} <span className="font-medium">{activity.target}</span>
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">System Alerts</CardTitle>
                  <CardDescription>Warnings and notifications</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[300px]">
                    <div className="p-4 space-y-4">
                      {systemAlerts.map((alert) => (
                        <div
                          key={alert.id}
                          className={`flex items-start gap-3 p-3 border rounded-md ${
                            alert.type === "error"
                              ? "bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800/30"
                              : alert.type === "warning"
                                ? "bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-800/30"
                                : alert.type === "success"
                                  ? "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800/30"
                                  : "bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-800/30"
                          }`}
                        >
                          <div
                            className={`p-2 rounded-full ${
                              alert.type === "error"
                                ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                                : alert.type === "warning"
                                  ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                                  : alert.type === "success"
                                    ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                                    : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                            }`}
                          >
                            {alert.type === "error" ? (
                              <AlertTriangle className="h-4 w-4" />
                            ) : alert.type === "warning" ? (
                              <AlertTriangle className="h-4 w-4" />
                            ) : alert.type === "success" ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : (
                              <Bell className="h-4 w-4" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{alert.message}</p>
                            <div className="flex items-center justify-between mt-1">
                              <p className="text-xs text-muted-foreground">{alert.time}</p>
                              {alert.resolved ? (
                                <Badge
                                  variant="outline"
                                  className="text-xs bg-green-100 text-green-600 border-green-200"
                                >
                                  Resolved
                                </Badge>
                              ) : (
                                <Badge
                                  variant="outline"
                                  className="text-xs bg-amber-100 text-amber-600 border-amber-200"
                                >
                                  Active
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="system" className="p-4 m-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Cpu className="h-5 w-5 mr-2 text-muted-foreground" />
                      <h3 className="font-medium">CPU Usage</h3>
                    </div>
                    <Badge variant="outline">65%</Badge>
                  </div>
                  <Progress value={65} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">4 cores @ 2.3GHz</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <HardDrive className="h-5 w-5 mr-2 text-muted-foreground" />
                      <h3 className="font-medium">Memory Usage</h3>
                    </div>
                    <Badge variant="outline">72%</Badge>
                  </div>
                  <Progress value={72} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">11.5 GB / 16 GB</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Database className="h-5 w-5 mr-2 text-muted-foreground" />
                      <h3 className="font-medium">Storage</h3>
                    </div>
                    <Badge variant="outline">43%</Badge>
                  </div>
                  <Progress value={43} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">215 GB / 500 GB</p>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">System Metrics</CardTitle>
                <CardDescription>24-hour performance monitoring</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={systemMetricsData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="cpu" stroke="#8884d8" name="CPU %" />
                      <Line type="monotone" dataKey="memory" stroke="#82ca9d" name="Memory %" />
                      <Line type="monotone" dataKey="requests" stroke="#ffc658" name="Requests/s" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Server Status</CardTitle>
                  <CardDescription>Current state of all servers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Web Server 1", status: "Operational", uptime: "45 days", load: 65 },
                      { name: "Web Server 2", status: "Operational", uptime: "45 days", load: 58 },
                      { name: "Database Primary", status: "Operational", uptime: "30 days", load: 72 },
                      { name: "Database Replica", status: "Operational", uptime: "30 days", load: 45 },
                      { name: "Cache Server", status: "Operational", uptime: "15 days", load: 35 },
                    ].map((server, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{server.name}</p>
                          <div className="flex items-center text-xs text-muted-foreground mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>Uptime: {server.uptime}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center">
                            <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className={`h-full ${
                                  server.load > 80 ? "bg-red-500" : server.load > 60 ? "bg-amber-500" : "bg-green-500"
                                }`}
                                style={{ width: `${server.load}%` }}
                              ></div>
                            </div>
                            <span className="text-xs ml-2">{server.load}%</span>
                          </div>
                          <Badge
                            variant="outline"
                            className="bg-green-100 text-green-600 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800/30"
                          >
                            {server.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Recent Deployments</CardTitle>
                  <CardDescription>Latest system updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        version: "v2.5.3",
                        date: "Today, 09:15 AM",
                        status: "Successful",
                        changes: "Bug fixes and performance improvements",
                      },
                      {
                        version: "v2.5.2",
                        date: "Yesterday, 2:30 PM",
                        status: "Successful",
                        changes: "Updated user authentication system",
                      },
                      {
                        version: "v2.5.1",
                        date: "3 days ago",
                        status: "Failed",
                        changes: "New messaging features",
                      },
                      {
                        version: "v2.5.0",
                        date: "5 days ago",
                        status: "Successful",
                        changes: "Major release with new dashboard",
                      },
                    ].map((deployment, index) => (
                      <div key={index} className="border rounded-md p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Badge variant="outline" className="mr-2">
                              {deployment.version}
                            </Badge>
                            <p className="text-sm font-medium">{deployment.changes}</p>
                          </div>
                          <Badge
                            variant="outline"
                            className={
                              deployment.status === "Successful"
                                ? "bg-green-100 text-green-600 border-green-200"
                                : "bg-red-100 text-red-600 border-red-200"
                            }
                          >
                            {deployment.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">{deployment.date}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="p-4 m-0">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="pl-10 pr-4 py-2 text-sm rounded-md border border-input bg-background"
                  />
                </div>
                <Button variant="outline" size="sm" className="gap-1">
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </div>
              <Button>Add User</Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Email</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Role</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Joined</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      {[
                        {
                          name: "Sarah Chen",
                          email: "sarah@healthtech.co",
                          avatar: "/abstract-geometric-shapes.png",
                          role: "Founder",
                          status: "Active",
                          joined: "Jan 15, 2023",
                        },
                        {
                          name: "Alex Wong",
                          email: "alex@techstart.com",
                          avatar: "/abstract-geometric-aw.png",
                          role: "Investor",
                          status: "Active",
                          joined: "Feb 3, 2023",
                        },
                        {
                          name: "David Lee",
                          email: "david@example.com",
                          avatar: "/thoughtful-portrait.png",
                          role: "Founder",
                          status: "Inactive",
                          joined: "Mar 20, 2023",
                        },
                        {
                          name: "Mei Lin",
                          email: "mei@dataco.ai",
                          avatar: "/machine-learning-concept.png",
                          role: "Mentor",
                          status: "Active",
                          joined: "Apr 5, 2023",
                        },
                        {
                          name: "John Smith",
                          email: "john.smith@example.com",
                          avatar: "",
                          role: "Partner",
                          status: "Pending",
                          joined: "May 12, 2023",
                        },
                      ].map((user, index) => (
                        <tr
                          key={index}
                          className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                        >
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                                <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <span>{user.name}</span>
                            </div>
                          </td>
                          <td className="p-4 align-middle">{user.email}</td>
                          <td className="p-4 align-middle">
                            <Badge variant="outline">{user.role}</Badge>
                          </td>
                          <td className="p-4 align-middle">
                            <Badge
                              variant="outline"
                              className={
                                user.status === "Active"
                                  ? "bg-green-100 text-green-600 border-green-200"
                                  : user.status === "Inactive"
                                    ? "bg-gray-100 text-gray-600 border-gray-200"
                                    : "bg-amber-100 text-amber-600 border-amber-200"
                              }
                            >
                              {user.status}
                            </Badge>
                          </td>
                          <td className="p-4 align-middle">{user.joined}</td>
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-4 w-4"
                                >
                                  <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                                  <path d="m15 5 4 4"></path>
                                </svg>
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-4 w-4"
                                >
                                  <path d="M3 6h18"></path>
                                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                </svg>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="p-4 m-0">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search content..."
                    className="pl-10 pr-4 py-2 text-sm rounded-md border border-input bg-background"
                  />
                </div>
                <Button variant="outline" size="sm" className="gap-1">
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </div>
              <Button>Add Content</Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Title</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Type</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Author</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                          Published
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Views</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      {[
                        {
                          title: "The Future of AI in Healthcare",
                          type: "Article",
                          author: "Sarah Chen",
                          status: "Published",
                          published: "2 days ago",
                          views: 1245,
                        },
                        {
                          title: "Fundraising Strategies for Deep Tech",
                          type: "Guide",
                          author: "David Lee",
                          status: "Published",
                          published: "1 week ago",
                          views: 3567,
                        },
                        {
                          title: "Building a Successful Startup Team",
                          type: "Video",
                          author: "Alex Wong",
                          status: "Draft",
                          published: "-",
                          views: 0,
                        },
                        {
                          title: "Pitch Deck Workshop",
                          type: "Event",
                          author: "Mei Lin",
                          status: "Scheduled",
                          published: "In 3 days",
                          views: 89,
                        },
                        {
                          title: "Investor Relations Best Practices",
                          type: "Webinar",
                          author: "John Smith",
                          status: "Published",
                          published: "3 days ago",
                          views: 756,
                        },
                      ].map((content, index) => (
                        <tr
                          key={index}
                          className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                        >
                          <td className="p-4 align-middle font-medium">{content.title}</td>
                          <td className="p-4 align-middle">
                            <Badge variant="outline">{content.type}</Badge>
                          </td>
                          <td className="p-4 align-middle">{content.author}</td>
                          <td className="p-4 align-middle">
                            <Badge
                              variant="outline"
                              className={
                                content.status === "Published"
                                  ? "bg-green-100 text-green-600 border-green-200"
                                  : content.status === "Draft"
                                    ? "bg-gray-100 text-gray-600 border-gray-200"
                                    : "bg-blue-100 text-blue-600 border-blue-200"
                              }
                            >
                              {content.status}
                            </Badge>
                          </td>
                          <td className="p-4 align-middle">{content.published}</td>
                          <td className="p-4 align-middle">{content.views.toLocaleString()}</td>
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-4 w-4"
                                >
                                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                                  <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-4 w-4"
                                >
                                  <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                                  <path d="m15 5 4 4"></path>
                                </svg>
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-4 w-4"
                                >
                                  <path d="M3 6h18"></path>
                                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                </svg>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  )
}
