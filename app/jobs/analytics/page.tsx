"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { 
  ChevronLeft, 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Eye, 
  Briefcase, 
  Calendar,
  Download,
  Filter,
  RefreshCw
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface JobAnalytics {
  id: string
  title: string
  company: string
  views: number
  applications: number
  conversionRate: number
  status: string
  createdAt: string
  publishedAt: string
  featured: boolean
}

export default function JobAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d")
  const [analytics, setAnalytics] = useState<JobAnalytics[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Sample analytics data
  useEffect(() => {
    const sampleAnalytics: JobAnalytics[] = [
      {
        id: "1",
        title: "Senior Full Stack Developer",
        company: "TechNova Solutions",
        views: 156,
        applications: 24,
        conversionRate: 15.4,
        status: "published",
        createdAt: "2024-01-15T10:30:00Z",
        publishedAt: "2024-01-15T11:00:00Z",
        featured: true
      },
      {
        id: "2",
        title: "Product Manager",
        company: "StartupXYZ",
        views: 98,
        applications: 18,
        conversionRate: 18.4,
        status: "published",
        createdAt: "2024-01-14T14:20:00Z",
        publishedAt: "2024-01-14T15:00:00Z",
        featured: false
      },
      {
        id: "3",
        title: "Marketing Specialist",
        company: "GrowthLab",
        views: 45,
        applications: 8,
        conversionRate: 17.8,
        status: "published",
        createdAt: "2024-01-13T09:15:00Z",
        publishedAt: "2024-01-13T10:00:00Z",
        featured: false
      }
    ]
    setAnalytics(sampleAnalytics)
  }, [])

  const totalViews = analytics.reduce((sum, job) => sum + job.views, 0)
  const totalApplications = analytics.reduce((sum, job) => sum + job.applications, 0)
  const averageConversionRate = analytics.length > 0 ? 
    analytics.reduce((sum, job) => sum + job.conversionRate, 0) / analytics.length : 0

  const topPerformingJobs = analytics
    .sort((a, b) => b.applications - a.applications)
    .slice(0, 5)

  const recentActivity = [
    { action: "New application", job: "Senior Full Stack Developer", time: "2 hours ago", type: "application" },
    { action: "Job viewed", job: "Product Manager", time: "4 hours ago", type: "view" },
    { action: "New application", job: "Marketing Specialist", time: "6 hours ago", type: "application" },
    { action: "Job published", job: "UX Designer", time: "1 day ago", type: "publish" },
    { action: "Job viewed", job: "Senior Full Stack Developer", time: "1 day ago", type: "view" }
  ]

  const getTrendIcon = (value: number, previousValue: number) => {
    if (value > previousValue) return <TrendingUp className="w-4 h-4 text-green-600" />
    if (value < previousValue) return <TrendingDown className="w-4 h-4 text-red-600" />
    return <div className="w-4 h-4 bg-gray-400 rounded-full" />
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "application": return <Users className="w-4 h-4 text-blue-600" />
      case "view": return <Eye className="w-4 h-4 text-green-600" />
      case "publish": return <Briefcase className="w-4 h-4 text-purple-600" />
      default: return <Calendar className="w-4 h-4 text-gray-600" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/jobs/hire-talents" className="flex items-center text-[#0F7377] hover:underline">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Hire Talents
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Job Analytics</h1>
                <p className="text-sm text-gray-600">Track the performance of your job postings</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-1" />
                Export
              </Button>
              <Button variant="outline" size="sm" onClick={() => setIsLoading(true)}>
                <RefreshCw className={`w-4 h-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Views</p>
                  <p className="text-3xl font-bold text-gray-900">{totalViews.toLocaleString()}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {getTrendIcon(totalViews, 250)}
                    <span className="text-sm text-green-600">+12.5%</span>
                    <span className="text-sm text-gray-500">vs last period</span>
                  </div>
                </div>
                <Eye className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Applications</p>
                  <p className="text-3xl font-bold text-gray-900">{totalApplications.toLocaleString()}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {getTrendIcon(totalApplications, 35)}
                    <span className="text-sm text-green-600">+8.2%</span>
                    <span className="text-sm text-gray-500">vs last period</span>
                  </div>
                </div>
                <Users className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                  <p className="text-3xl font-bold text-gray-900">{averageConversionRate.toFixed(1)}%</p>
                  <div className="flex items-center gap-1 mt-1">
                    {getTrendIcon(averageConversionRate, 14.2)}
                    <span className="text-sm text-green-600">+2.1%</span>
                    <span className="text-sm text-gray-500">vs last period</span>
                  </div>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                  <p className="text-3xl font-bold text-gray-900">{analytics.length}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {getTrendIcon(analytics.length, 2)}
                    <span className="text-sm text-green-600">+1</span>
                    <span className="text-sm text-gray-500">vs last period</span>
                  </div>
                </div>
                <Briefcase className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="jobs">Job Performance</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Jobs</CardTitle>
                  <CardDescription>Jobs with the highest number of applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topPerformingJobs.map((job, index) => (
                      <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-[#0F7377]/10 rounded-full flex items-center justify-center">
                            <span className="text-sm font-semibold text-[#0F7377]">{index + 1}</span>
                          </div>
                          <div>
                            <p className="font-medium">{job.title}</p>
                            <p className="text-sm text-gray-600">{job.company}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{job.applications} applications</p>
                          <p className="text-sm text-gray-600">{job.views} views</p>
                          <Badge variant="outline" className="text-xs">
                            {job.conversionRate.toFixed(1)}% conversion
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest actions on your job postings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                        <div className="p-2 bg-gray-100 rounded-full">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.action}</p>
                          <p className="text-sm text-gray-600">{activity.job}</p>
                        </div>
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="jobs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Job Performance Details</CardTitle>
                <CardDescription>Detailed analytics for each job posting</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.map((job) => (
                    <div key={job.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-medium">{job.title}</h3>
                          <p className="text-sm text-gray-600">{job.company}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{job.status}</Badge>
                          {job.featured && (
                            <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                              Featured
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <p className="text-2xl font-bold text-blue-600">{job.views}</p>
                          <p className="text-sm text-gray-600">Views</p>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <p className="text-2xl font-bold text-green-600">{job.applications}</p>
                          <p className="text-sm text-gray-600">Applications</p>
                        </div>
                        <div className="text-center p-3 bg-purple-50 rounded-lg">
                          <p className="text-2xl font-bold text-purple-600">{job.conversionRate.toFixed(1)}%</p>
                          <p className="text-sm text-gray-600">Conversion Rate</p>
                        </div>
                        <div className="text-center p-3 bg-orange-50 rounded-lg">
                          <p className="text-2xl font-bold text-orange-600">
                            {Math.ceil((new Date().getTime() - new Date(job.publishedAt).getTime()) / (1000 * 60 * 60 * 24))}
                          </p>
                          <p className="text-sm text-gray-600">Days Active</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Activity Timeline</CardTitle>
                <CardDescription>Complete timeline of all job-related activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="p-2 bg-gray-100 rounded-full">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{activity.action}</p>
                          <span className="text-sm text-gray-500">{activity.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{activity.job}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-800">Best Performing Job</h4>
                    <p className="text-sm text-green-600 mt-1">
                      "Product Manager" has the highest conversion rate at 18.4%
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800">Peak Viewing Time</h4>
                    <p className="text-sm text-blue-600 mt-1">
                      Most job views occur between 9-11 AM and 2-4 PM
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-purple-800">Application Trends</h4>
                    <p className="text-sm text-purple-600 mt-1">
                      Applications increase by 25% on Tuesdays and Wednesdays
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-medium text-yellow-800">Optimize Job Descriptions</h4>
                    <p className="text-sm text-yellow-600 mt-1">
                      Add more specific requirements to improve candidate quality
                    </p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-medium text-orange-800">Consider Featured Listings</h4>
                    <p className="text-sm text-orange-600 mt-1">
                      Featured jobs get 40% more views on average
                    </p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg">
                    <h4 className="font-medium text-red-800">Update Stale Listings</h4>
                    <p className="text-sm text-red-600 mt-1">
                      Jobs older than 30 days see 60% fewer applications
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}