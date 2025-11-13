"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { 
  ChevronLeft, 
  Briefcase, 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit, 
  Star, 
  MapPin, 
  DollarSign, 
  Building, 
  TrendingUp, 
  Calendar,
  Clock,
  BarChart3,
  Settings,
  CheckCircle,
  AlertCircle,
  XCircle,
  MoreHorizontal,
  Trash2,
  ExternalLink
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { useJobs } from "@/contexts/JobContext"
import { ComprehensiveJobForm } from "@/components/jobs/comprehensive-job-form"

export default function HireTalentsPage() {
  const { toast } = useToast()
  const { 
    jobs, 
    addJob, 
    updateJob, 
    deleteJob, 
    getJobsByCreator 
  } = useJobs()
  
  const [isMobile, setIsMobile] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [showCreateJob, setShowCreateJob] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [selectedJob, setSelectedJob] = useState<any>(null)
  const [userJobs, setUserJobs] = useState<any[]>([])
  const [isEditing, setIsEditing] = useState(false)

  // Get jobs created by current user
  useEffect(() => {
    // In a real app, you'd get the current user ID from auth context
    const currentUserId = "user1" // Mock user ID
    const jobs = getJobsByCreator(currentUserId)
    setUserJobs(jobs)
  }, [jobs, getJobsByCreator])

  // Check mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleCreateJob = (jobData: any) => {
    const newJob = {
      ...jobData,
      id: Date.now().toString(),
      companyId: "user1", // Mock company ID
      companyLogo: jobData.company.substring(0, 2).toUpperCase(),
      posted: "Just now",
      postedDate: new Date(),
      applications: 0,
      views: 0,
      matchScore: Math.floor(Math.random() * 30) + 70, // Random match score
      createdBy: "user1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: jobData.skills.slice(0, 5) // Use first 5 skills as tags
    }
    
    addJob(newJob)
    setShowCreateJob(false)
    setIsEditing(false)
    setSelectedJob(null)
  }

  const handleEditJob = (job: any) => {
    setSelectedJob(job)
    setIsEditing(true)
    setShowCreateJob(true)
  }

  const handleUpdateJob = (jobData: any) => {
    updateJob(selectedJob.id, {
      ...jobData,
      updatedAt: new Date().toISOString()
    })
    setShowCreateJob(false)
    setIsEditing(false)
    setSelectedJob(null)
  }

  const handleDeleteJob = (jobId: string) => {
    deleteJob(jobId)
    toast({
      title: "Job Deleted",
      description: "The job posting has been deleted successfully.",
    })
  }

  const filteredJobs = userJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || job.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800'
      case 'draft': return 'bg-gray-100 text-gray-800'
      case 'paused': return 'bg-yellow-100 text-yellow-800'
      case 'closed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (showCreateJob) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto max-w-6xl px-4 py-8">
          <div className="mb-6">
            <Button 
              variant="outline" 
              onClick={() => {
                setShowCreateJob(false)
                setIsEditing(false)
                setSelectedJob(null)
              }}
              className="mb-4"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Jobs
            </Button>
          </div>
          <ComprehensiveJobForm
            onSubmit={isEditing ? handleUpdateJob : handleCreateJob}
            onCancel={() => {
              setShowCreateJob(false)
              setIsEditing(false)
              setSelectedJob(null)
            }}
            initialData={selectedJob}
            isEditing={isEditing}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Hire Talents</h1>
              <p className="text-gray-600 mt-2">
                Create and manage job postings to find the best talent for your startup
              </p>
            </div>
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <Button 
                variant="outline"
                onClick={() => setShowAnalytics(true)}
                className="flex items-center gap-2"
              >
                <BarChart3 className="h-4 w-4" />
                Analytics
              </Button>
              <Button 
                variant="outline"
                onClick={() => setShowSettings(true)}
                className="flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Button>
              <Button 
                className="bg-[#0F7377] hover:bg-[#0F7377]/90"
                onClick={() => setShowCreateJob(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Job
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Jobs</p>
                    <p className="text-2xl font-bold">{userJobs.length}</p>
                  </div>
                  <Briefcase className="h-8 w-8 text-[#0F7377]" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Published</p>
                    <p className="text-2xl font-bold">
                      {userJobs.filter(job => job.status === 'published').length}
                    </p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Drafts</p>
                    <p className="text-2xl font-bold">
                      {userJobs.filter(job => job.status === 'draft').length}
                    </p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Applications</p>
                    <p className="text-2xl font-bold">
                      {userJobs.reduce((sum, job) => sum + job.applications, 0)}
                    </p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search jobs..." 
                  className="pl-9" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {filteredJobs.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="mb-4">
                  <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No jobs found</h3>
                  <p className="text-gray-600 mb-4">
                    {userJobs.length === 0 
                      ? "Create your first job posting to get started."
                      : "Try adjusting your search or filters."
                    }
                  </p>
                  {userJobs.length === 0 && (
                    <Button 
                      onClick={() => setShowCreateJob(true)}
                      className="bg-[#0F7377] hover:bg-[#0F7377]/90"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create Your First Job
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            filteredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#0F7377] rounded-lg flex items-center justify-center text-white font-bold">
                        {job.companyLogo}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{job.title}</h3>
                        <p className="text-gray-600">{job.company}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {job.type}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3" />
                            {job.salary}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <Badge className={getStatusColor(job.status)}>
                          {job.status}
                        </Badge>
                        <div className="text-sm text-gray-500 mt-1">
                          {job.applications} applications • {job.views} views
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEditJob(job)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteJob(job.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            // Navigate to job details
                            window.open(`/jobs/find-startup-jobs`, '_blank')
                          }}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}