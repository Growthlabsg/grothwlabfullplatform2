"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { 
  ChevronLeft, 
  Briefcase, 
  Users, 
  Eye, 
  Edit, 
  Trash2, 
  MoreHorizontal,
  Play,
  Pause,
  Archive,
  Star,
  Search,
  Filter,
  Calendar,
  MapPin,
  DollarSign,
  Building,
  CheckCircle,
  AlertCircle,
  XCircle,
  Clock
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

interface Job {
  id: string
  title: string
  company: string
  location: string
  type: string
  experience: string
  salary: string
  currency: string
  status: "draft" | "published" | "paused" | "closed" | "archived"
  applications: number
  views: number
  createdAt: string
  publishedAt?: string
  featured: boolean
  remoteWork: string
  department: string
  description: string
  requirements: string[]
  skills: string[]
  benefits: string[]
}

export default function JobManagePage() {
  const { toast } = useToast()
  const [jobs, setJobs] = useState<Job[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedJobs, setSelectedJobs] = useState<string[]>([])
  const [showBulkActions, setShowBulkActions] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [jobToDelete, setJobToDelete] = useState<Job | null>(null)

  // Sample job data
  useEffect(() => {
    const sampleJobs: Job[] = [
      {
        id: "1",
        title: "Senior Full Stack Developer",
        company: "TechNova Solutions",
        location: "Singapore",
        type: "Full-time",
        experience: "Senior",
        salary: "$8,000 - $12,000",
        currency: "SGD",
        status: "published",
        applications: 24,
        views: 156,
        createdAt: "2024-01-15T10:30:00Z",
        publishedAt: "2024-01-15T11:00:00Z",
        featured: true,
        remoteWork: "Hybrid",
        department: "Engineering",
        description: "We're looking for a senior full-stack developer to join our growing team...",
        requirements: ["5+ years experience", "React & Node.js", "Database design"],
        skills: ["React", "Node.js", "TypeScript", "PostgreSQL"],
        benefits: ["Health Insurance", "Flexible Hours", "Stock Options"]
      },
      {
        id: "2",
        title: "Product Manager",
        company: "StartupXYZ",
        location: "Remote",
        type: "Full-time",
        experience: "Mid Level",
        salary: "$6,000 - $9,000",
        currency: "SGD",
        status: "published",
        applications: 18,
        views: 98,
        createdAt: "2024-01-14T14:20:00Z",
        publishedAt: "2024-01-14T15:00:00Z",
        featured: false,
        remoteWork: "Remote",
        department: "Product",
        description: "Join our product team to drive innovation and growth...",
        requirements: ["3+ years PM experience", "Analytics skills", "User research"],
        skills: ["Product Management", "Analytics", "Figma", "SQL"],
        benefits: ["Remote Work", "Learning Budget", "Equity"]
      },
      {
        id: "3",
        title: "Marketing Specialist",
        company: "GrowthLab",
        location: "Singapore",
        type: "Contract",
        experience: "Junior",
        salary: "$3,000 - $5,000",
        currency: "SGD",
        status: "draft",
        applications: 0,
        views: 0,
        createdAt: "2024-01-13T09:15:00Z",
        featured: false,
        remoteWork: "On-site",
        department: "Marketing",
        description: "Help us grow our brand and reach new customers...",
        requirements: ["1+ years marketing", "Social media", "Content creation"],
        skills: ["Digital Marketing", "Social Media", "Content Writing"],
        benefits: ["Flexible Schedule", "Team Events"]
      },
      {
        id: "4",
        title: "UX Designer",
        company: "DesignCo",
        location: "Singapore",
        type: "Full-time",
        experience: "Mid Level",
        salary: "$5,000 - $8,000",
        currency: "SGD",
        status: "paused",
        applications: 12,
        views: 67,
        createdAt: "2024-01-12T11:30:00Z",
        publishedAt: "2024-01-12T12:00:00Z",
        featured: false,
        remoteWork: "Hybrid",
        department: "Design",
        description: "Create amazing user experiences for our products...",
        requirements: ["3+ years UX design", "Figma expertise", "User research"],
        skills: ["Figma", "User Research", "Prototyping", "UI Design"],
        benefits: ["Design Budget", "Conference Allowance", "Flexible Hours"]
      }
    ]
    setJobs(sampleJobs)
  }, [])

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || job.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published": return "bg-green-100 text-green-800"
      case "draft": return "bg-gray-100 text-gray-800"
      case "paused": return "bg-yellow-100 text-yellow-800"
      case "closed": return "bg-red-100 text-red-800"
      case "archived": return "bg-purple-100 text-purple-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "published": return <CheckCircle className="w-4 h-4" />
      case "draft": return <Edit className="w-4 h-4" />
      case "paused": return <Pause className="w-4 h-4" />
      case "closed": return <XCircle className="w-4 h-4" />
      case "archived": return <Archive className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const handleJobAction = (jobId: string, action: string) => {
    const job = jobs.find(j => j.id === jobId)
    if (!job) return

    let newStatus = job.status
    let message = ""

    switch (action) {
      case "publish":
        newStatus = "published"
        message = "Job published successfully"
        break
      case "pause":
        newStatus = "paused"
        message = "Job paused successfully"
        break
      case "close":
        newStatus = "closed"
        message = "Job closed successfully"
        break
      case "archive":
        newStatus = "archived"
        message = "Job archived successfully"
        break
      case "feature":
        // Toggle featured status
        setJobs(prev => prev.map(j => 
          j.id === jobId ? { ...j, featured: !j.featured } : j
        ))
        message = job.featured ? "Job unfeatured" : "Job featured"
        break
      case "delete":
        setJobToDelete(job)
        setShowDeleteDialog(true)
        return
    }

    if (action !== "feature") {
      setJobs(prev => prev.map(j => 
        j.id === jobId ? { ...j, status: newStatus } : j
      ))
    }

    toast({
      title: "Action Completed",
      description: message
    })
  }

  const handleBulkAction = (action: string) => {
    if (selectedJobs.length === 0) {
      toast({
        title: "No Jobs Selected",
        description: "Please select jobs to perform bulk actions",
        variant: "destructive"
      })
      return
    }

    let message = ""
    switch (action) {
      case "publish":
        setJobs(prev => prev.map(job => 
          selectedJobs.includes(job.id) ? { ...job, status: "published" } : job
        ))
        message = `${selectedJobs.length} jobs published`
        break
      case "pause":
        setJobs(prev => prev.map(job => 
          selectedJobs.includes(job.id) ? { ...job, status: "paused" } : job
        ))
        message = `${selectedJobs.length} jobs paused`
        break
      case "close":
        setJobs(prev => prev.map(job => 
          selectedJobs.includes(job.id) ? { ...job, status: "closed" } : job
        ))
        message = `${selectedJobs.length} jobs closed`
        break
      case "archive":
        setJobs(prev => prev.map(job => 
          selectedJobs.includes(job.id) ? { ...job, status: "archived" } : job
        ))
        message = `${selectedJobs.length} jobs archived`
        break
      case "delete":
        setJobs(prev => prev.filter(job => !selectedJobs.includes(job.id)))
        message = `${selectedJobs.length} jobs deleted`
        break
    }

    setSelectedJobs([])
    setShowBulkActions(false)
    toast({
      title: "Bulk Action Completed",
      description: message
    })
  }

  const handleSelectJob = (jobId: string) => {
    setSelectedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    )
  }

  const handleSelectAll = () => {
    if (selectedJobs.length === filteredJobs.length) {
      setSelectedJobs([])
    } else {
      setSelectedJobs(filteredJobs.map(job => job.id))
    }
  }

  const confirmDelete = () => {
    if (jobToDelete) {
      setJobs(prev => prev.filter(job => job.id !== jobToDelete.id))
      toast({
        title: "Job Deleted",
        description: `${jobToDelete.title} has been deleted`
      })
    }
    setShowDeleteDialog(false)
    setJobToDelete(null)
  }

  const renderJobCard = (job: Job) => (
    <Card key={job.id} className="hover:shadow-lg transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={selectedJobs.includes(job.id)}
              onChange={() => handleSelectJob(job.id)}
              className="rounded"
            />
            <div className="p-2 bg-[#0F7377]/10 rounded-lg">
              <Briefcase className="w-6 h-6 text-[#0F7377]" />
            </div>
            <div>
              <CardTitle className="text-lg">{job.title}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Building className="w-4 h-4" />
                {job.company}
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={getStatusColor(job.status)}>
              <div className="flex items-center gap-1">
                {getStatusIcon(job.status)}
                {job.status.toUpperCase()}
              </div>
            </Badge>
            {job.featured && (
              <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                <Star className="w-3 h-3 mr-1" />
                FEATURED
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">{job.type}</Badge>
          <Badge variant="outline">{job.experience}</Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {job.location}
          </Badge>
          <Badge variant="outline">{job.remoteWork}</Badge>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2">{job.description}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              {job.salary} {job.currency}
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {job.applications} applications
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {job.views} views
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {new Date(job.createdAt).toLocaleDateString()}
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleJobAction(job.id, "publish")}
            disabled={job.status === "published"}
          >
            <Play className="w-4 h-4 mr-1" />
            Publish
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleJobAction(job.id, "pause")}
            disabled={job.status !== "published"}
          >
            <Pause className="w-4 h-4 mr-1" />
            Pause
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleJobAction(job.id, "feature")}
          >
            <Star className="w-4 h-4 mr-1" />
            {job.featured ? "Unfeature" : "Feature"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleJobAction(job.id, "edit")}
          >
            <Edit className="w-4 h-4 mr-1" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleJobAction(job.id, "delete")}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const stats = [
    { label: "Total Jobs", value: jobs.length, icon: Briefcase, color: "text-blue-600" },
    { label: "Published", value: jobs.filter(j => j.status === "published").length, icon: CheckCircle, color: "text-green-600" },
    { label: "Drafts", value: jobs.filter(j => j.status === "draft").length, icon: Edit, color: "text-gray-600" },
    { label: "Paused", value: jobs.filter(j => j.status === "paused").length, icon: Pause, color: "text-yellow-600" }
  ]

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
                <h1 className="text-2xl font-bold text-gray-900">Manage Jobs</h1>
                <p className="text-sm text-gray-600">Manage and organize your job postings</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {selectedJobs.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{selectedJobs.length} selected</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowBulkActions(true)}
                  >
                    <MoreHorizontal className="w-4 h-4 mr-1" />
                    Bulk Actions
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-all duration-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <TabsList className="grid w-full grid-cols-5 sm:w-auto">
              <TabsTrigger value="all">All Jobs</TabsTrigger>
              <TabsTrigger value="published">Published</TabsTrigger>
              <TabsTrigger value="draft">Drafts</TabsTrigger>
              <TabsTrigger value="paused">Paused</TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>
            
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowBulkActions(true)}
                className="hidden sm:flex"
              >
                <Filter className="w-4 h-4 mr-1" />
                Bulk Actions
              </Button>
            </div>
          </div>

          <TabsContent value="all" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedJobs.length === filteredJobs.length && filteredJobs.length > 0}
                  onChange={handleSelectAll}
                  className="rounded"
                />
                <Label className="text-sm font-medium">
                  Select All ({filteredJobs.length} jobs)
                </Label>
              </div>
            </div>
            <div className="grid gap-6">
              {filteredJobs.map(renderJobCard)}
            </div>
          </TabsContent>

          <TabsContent value="published" className="space-y-6">
            <div className="grid gap-6">
              {filteredJobs.filter(job => job.status === "published").map(renderJobCard)}
            </div>
          </TabsContent>

          <TabsContent value="draft" className="space-y-6">
            <div className="grid gap-6">
              {filteredJobs.filter(job => job.status === "draft").map(renderJobCard)}
            </div>
          </TabsContent>

          <TabsContent value="paused" className="space-y-6">
            <div className="grid gap-6">
              {filteredJobs.filter(job => job.status === "paused").map(renderJobCard)}
            </div>
          </TabsContent>

          <TabsContent value="archived" className="space-y-6">
            <div className="grid gap-6">
              {filteredJobs.filter(job => job.status === "archived").map(renderJobCard)}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Bulk Actions Dialog */}
      <Dialog open={showBulkActions} onOpenChange={setShowBulkActions}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bulk Actions</DialogTitle>
            <DialogDescription>
              Perform actions on {selectedJobs.length} selected jobs
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <Button
              onClick={() => handleBulkAction("publish")}
              className="w-full justify-start"
              variant="outline"
            >
              <Play className="w-4 h-4 mr-2" />
              Publish Selected Jobs
            </Button>
            <Button
              onClick={() => handleBulkAction("pause")}
              className="w-full justify-start"
              variant="outline"
            >
              <Pause className="w-4 h-4 mr-2" />
              Pause Selected Jobs
            </Button>
            <Button
              onClick={() => handleBulkAction("close")}
              className="w-full justify-start"
              variant="outline"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Close Selected Jobs
            </Button>
            <Button
              onClick={() => handleBulkAction("archive")}
              className="w-full justify-start"
              variant="outline"
            >
              <Archive className="w-4 h-4 mr-2" />
              Archive Selected Jobs
            </Button>
            <Button
              onClick={() => handleBulkAction("delete")}
              className="w-full justify-start text-red-600 hover:text-red-700"
              variant="outline"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Selected Jobs
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Job</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{jobToDelete?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
