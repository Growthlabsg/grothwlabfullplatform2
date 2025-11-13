"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Building2, 
  Users, 
  DollarSign, 
  Calendar, 
  MapPin, 
  Star,
  Award,
  ExternalLink,
  Eye,
  Edit,
  MessageSquare,
  TrendingUp,
  BarChart3,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  Plus,
  Filter,
  Search
} from "lucide-react"

export default function ProgramDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data for dashboard
  const programData = {
    name: "GrowthLab Accelerator",
    type: "Accelerator",
    location: "Singapore",
    status: "Active",
    rating: 4.9,
    verified: true,
    totalApplications: 156,
    pendingApplications: 23,
    acceptedApplications: 45,
    rejectedApplications: 88,
    successRate: "85%",
    totalAlumni: 120,
    totalFunding: "$2.1B"
  }

  const recentApplications = [
    {
      id: 1,
      startupName: "TechFlow Solutions",
      founderName: "Sarah Chen",
      stage: "Seed",
      industry: "SaaS",
      appliedDate: "2025-01-15",
      status: "Pending",
      matchScore: 92
    },
    {
      id: 2,
      startupName: "GreenEnergy Co",
      founderName: "Michael Wong",
      stage: "Series A",
      industry: "Clean Tech",
      appliedDate: "2025-01-14",
      status: "Accepted",
      matchScore: 88
    },
    {
      id: 3,
      startupName: "HealthAI Platform",
      founderName: "Dr. Lisa Tan",
      stage: "MVP",
      industry: "Healthtech",
      appliedDate: "2025-01-13",
      status: "Rejected",
      matchScore: 65
    },
    {
      id: 4,
      startupName: "FinTech Pro",
      founderName: "Alex Kumar",
      stage: "Seed",
      industry: "Fintech",
      appliedDate: "2025-01-12",
      status: "Pending",
      matchScore: 95
    }
  ]

  const analytics = {
    views: 1247,
    applications: 156,
    conversionRate: "12.5%",
    avgMatchScore: 78,
    topIndustries: ["SaaS", "Fintech", "Healthtech"],
    topLocations: ["Singapore", "Indonesia", "Malaysia"]
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Accepted": return "bg-green-100 text-green-800"
      case "Pending": return "bg-yellow-100 text-yellow-800"
      case "Rejected": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 80) return "text-blue-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Program Dashboard</h1>
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold text-gray-700">{programData.name}</h2>
              {programData.verified && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Verified
                </Badge>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Edit Program
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Cohort
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Total Applications</p>
                <p className="text-2xl font-bold">{programData.totalApplications}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-yellow-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold">{programData.pendingApplications}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Accepted</p>
                <p className="text-2xl font-bold">{programData.acceptedApplications}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-purple-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold">{programData.successRate}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="cohorts">Cohorts</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Program Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Program Views</span>
                  <span className="font-semibold">{analytics.views}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Application Rate</span>
                  <span className="font-semibold">{analytics.conversionRate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Avg Match Score</span>
                  <span className="font-semibold">{analytics.avgMatchScore}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Alumni</span>
                  <span className="font-semibold">{programData.totalAlumni}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Program Highlights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Top Industries</h4>
                  <div className="flex flex-wrap gap-1">
                    {analytics.topIndustries.map((industry) => (
                      <Badge key={industry} variant="outline" className="text-xs">
                        {industry}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Top Locations</h4>
                  <div className="flex flex-wrap gap-1">
                    {analytics.topLocations.map((location) => (
                      <Badge key={location} variant="outline" className="text-xs">
                        {location}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Total Funding Raised</h4>
                  <p className="text-lg font-bold text-green-600">{programData.totalFunding}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium">New application received</p>
                    <p className="text-xs text-gray-600">TechFlow Solutions applied 2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium">Program viewed 15 times today</p>
                    <p className="text-xs text-gray-600">Increased visibility in search results</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  <div>
                    <p className="text-sm font-medium">Application deadline approaching</p>
                    <p className="text-xs text-gray-600">Next cohort deadline in 5 days</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Applications Tab */}
        <TabsContent value="applications" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search applications..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Export</Button>
              <Button>Bulk Actions</Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Startup
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stage
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Industry
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Applied
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Match Score
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentApplications.map((application) => (
                      <tr key={application.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {application.startupName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {application.founderName}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant="outline" className="text-xs">
                            {application.stage}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant="outline" className="text-xs">
                            {application.industry}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {application.appliedDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`text-sm font-medium ${getMatchScoreColor(application.matchScore)}`}>
                            {application.matchScore}%
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={`text-xs ${getStatusColor(application.status)}`}>
                            {application.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <MessageSquare className="w-4 h-4" />
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

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Application Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Chart: Application trends over time</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Industry Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Chart: Applications by industry</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">12.5%</div>
                  <div className="text-sm text-gray-600">Conversion Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">78%</div>
                  <div className="text-sm text-gray-600">Avg Match Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">2.3 days</div>
                  <div className="text-sm text-gray-600">Avg Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">85%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cohorts Tab */}
        <TabsContent value="cohorts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Active Cohorts</span>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Cohort
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">Cohort 2025-01</h3>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Start Date:</span>
                      <span className="ml-2 font-medium">January 15, 2025</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Duration:</span>
                      <span className="ml-2 font-medium">12 weeks</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Participants:</span>
                      <span className="ml-2 font-medium">15 startups</span>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">Cohort 2024-03</h3>
                    <Badge className="bg-blue-100 text-blue-800">Completed</Badge>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Start Date:</span>
                      <span className="ml-2 font-medium">March 1, 2024</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Duration:</span>
                      <span className="ml-2 font-medium">12 weeks</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Participants:</span>
                      <span className="ml-2 font-medium">12 startups</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Program Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Program Visibility</h4>
                  <p className="text-sm text-gray-600">Make your program visible to startups</p>
                </div>
                <Button variant="outline">Edit</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Application Settings</h4>
                  <p className="text-sm text-gray-600">Configure application requirements and process</p>
                </div>
                <Button variant="outline">Edit</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Notification Preferences</h4>
                  <p className="text-sm text-gray-600">Manage email and push notifications</p>
                </div>
                <Button variant="outline">Edit</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Analytics & Reporting</h4>
                  <p className="text-sm text-gray-600">Configure analytics and reporting settings</p>
                </div>
                <Button variant="outline">Edit</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 