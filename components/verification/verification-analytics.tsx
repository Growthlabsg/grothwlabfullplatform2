"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar, Download, BarChart2, Clock, CheckCircle, AlertCircle } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"

interface VerificationRequest {
  id: string
  companyName: string
  dateSubmitted: string
  status: string
  industry: string
  stage: string
  reviewedAt?: string
  expiryDate?: string
  priority?: "low" | "medium" | "high"
  tags?: string[]
}

interface VerificationAnalyticsProps {
  requests: VerificationRequest[]
}

export function VerificationAnalytics({ requests }: VerificationAnalyticsProps) {
  const [timeRange, setTimeRange] = useState<"7days" | "30days" | "90days" | "1year" | "all">("30days")

  // Filter requests based on time range
  const getFilteredRequests = () => {
    if (timeRange === "all") return requests

    const now = new Date()
    let startDate: Date

    switch (timeRange) {
      case "7days":
        startDate = new Date(now.setDate(now.getDate() - 7))
        break
      case "30days":
        startDate = new Date(now.setDate(now.getDate() - 30))
        break
      case "90days":
        startDate = new Date(now.setDate(now.getDate() - 90))
        break
      case "1year":
        startDate = new Date(now.setFullYear(now.getFullYear() - 1))
        break
      default:
        startDate = new Date(now.setDate(now.getDate() - 30))
    }

    return requests.filter((request) => new Date(request.dateSubmitted) >= startDate)
  }

  const filteredRequests = getFilteredRequests()

  // Calculate key metrics
  const totalRequests = filteredRequests.length
  const pendingRequests = filteredRequests.filter((r) => r.status === "pending").length
  const approvedRequests = filteredRequests.filter((r) => r.status === "approved").length
  const rejectedRequests = filteredRequests.filter((r) => r.status === "rejected").length
  const additionalInfoRequests = filteredRequests.filter((r) => r.status === "additional_info").length
  const expiredRequests = filteredRequests.filter((r) => r.status === "expired").length

  // Calculate average processing time (in days)
  const processedRequests = filteredRequests.filter((r) => r.reviewedAt && r.dateSubmitted)
  const avgProcessingTime =
    processedRequests.length > 0
      ? processedRequests.reduce((sum, r) => {
          const submittedDate = new Date(r.dateSubmitted)
          const reviewedDate = new Date(r.reviewedAt!)
          return sum + (reviewedDate.getTime() - submittedDate.getTime()) / (1000 * 60 * 60 * 24)
        }, 0) / processedRequests.length
      : 0

  // Prepare data for charts
  const statusData = [
    { name: "Pending", value: pendingRequests, color: "#f59e0b" },
    { name: "Approved", value: approvedRequests, color: "#10b981" },
    { name: "Rejected", value: rejectedRequests, color: "#ef4444" },
    { name: "Info Requested", value: additionalInfoRequests, color: "#3b82f6" },
    { name: "Expired", value: expiredRequests, color: "#6b7280" },
  ]

  // Industry distribution
  const industryData = Array.from(
    filteredRequests.reduce((acc, request) => {
      const industry = request.industry
      acc.set(industry, (acc.get(industry) || 0) + 1)
      return acc
    }, new Map<string, number>()),
  ).map(([name, value]) => ({ name, value }))

  // Stage distribution
  const stageData = Array.from(
    filteredRequests.reduce((acc, request) => {
      const stage = request.stage
      acc.set(stage, (acc.get(stage) || 0) + 1)
      return acc
    }, new Map<string, number>()),
  ).map(([name, value]) => ({ name, value }))

  // Requests over time
  const requestsOverTime = Array.from(
    filteredRequests.reduce((acc, request) => {
      const date = request.dateSubmitted.split("T")[0]
      acc.set(date, (acc.get(date) || 0) + 1)
      return acc
    }, new Map<string, number>()),
  )
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  // Approval rate over time
  const approvalRateOverTime = Array.from(
    filteredRequests
      .filter((r) => r.reviewedAt)
      .reduce((acc, request) => {
        const date = request.reviewedAt!.split("T")[0]
        const current = acc.get(date) || { approved: 0, total: 0 }
        if (request.status === "approved") {
          current.approved += 1
        }
        current.total += 1
        acc.set(date, current)
        return acc
      }, new Map<string, { approved: number; total: number }>()),
  )
    .map(([date, { approved, total }]) => ({
      date,
      rate: Math.round((approved / total) * 100),
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-medium">Verification Analytics</h3>
          <p className="text-sm text-muted-foreground">
            Insights and metrics about verification requests and processing
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={(value) => setTimeRange(value as any)}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRequests}</div>
            <p className="text-xs text-muted-foreground">
              {timeRange === "all"
                ? "All time"
                : `Last ${timeRange === "7days" ? "7 days" : timeRange === "30days" ? "30 days" : timeRange === "90days" ? "90 days" : "year"}`}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalRequests > 0 ? Math.round((approvedRequests / totalRequests) * 100) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              {approvedRequests} out of {totalRequests} requests approved
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Processing Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgProcessingTime.toFixed(1)} days</div>
            <p className="text-xs text-muted-foreground">From submission to decision</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingRequests}</div>
            <p className="text-xs text-muted-foreground">
              {pendingRequests > 0
                ? `${Math.round((pendingRequests / totalRequests) * 100)}% of total requests`
                : "No pending requests"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Verification Status</CardTitle>
                <CardDescription>Distribution of verification request statuses</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </RePieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Industry Distribution</CardTitle>
                <CardDescription>Verification requests by industry</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={industryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="trends" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Verification Requests Over Time</CardTitle>
                <CardDescription>Number of verification requests submitted over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={requestsOverTime}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} name="Requests" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Approval Rate Over Time</CardTitle>
                <CardDescription>Percentage of verification requests approved over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={approvalRateOverTime}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="rate"
                      stroke="#10b981"
                      activeDot={{ r: 8 }}
                      name="Approval Rate (%)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="distribution" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Stage Distribution</CardTitle>
                <CardDescription>Verification requests by startup stage</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Processing Time Distribution</CardTitle>
                <CardDescription>Time taken to process verification requests</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Clock className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>Average processing time: {avgProcessingTime.toFixed(1)} days</p>
                  <p className="text-sm mt-2">
                    Min:{" "}
                    {Math.min(
                      ...processedRequests.map((r) => {
                        const submittedDate = new Date(r.dateSubmitted)
                        const reviewedDate = new Date(r.reviewedAt!)
                        return (reviewedDate.getTime() - submittedDate.getTime()) / (1000 * 60 * 60 * 24)
                      }),
                    ).toFixed(1)}{" "}
                    days
                  </p>
                  <p className="text-sm">
                    Max:{" "}
                    {Math.max(
                      ...processedRequests.map((r) => {
                        const submittedDate = new Date(r.dateSubmitted)
                        const reviewedDate = new Date(r.reviewedAt!)
                        return (reviewedDate.getTime() - submittedDate.getTime()) / (1000 * 60 * 60 * 24)
                      }),
                    ).toFixed(1)}{" "}
                    days
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
