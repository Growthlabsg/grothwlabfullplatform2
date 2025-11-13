"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { 
  Search, 
  Filter, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  FileText,
  Image,
  Video,
  Users,
  DollarSign,
  Calendar,
  MapPin,
  Mail,
  Globe,
  Star,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Download,
  ExternalLink,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  RefreshCw
} from "lucide-react"
import Image from "next/image"

interface ProjectReview {
  id: string
  projectId: string
  title: string
  creator: string
  creatorEmail: string
  category: string
  goal: number
  raised: number
  status: 'pending' | 'under_review' | 'approved' | 'rejected' | 'needs_revision'
  submittedAt: string
  reviewedAt?: string
  reviewedBy?: string
  reviewNotes?: string
  rejectionReason?: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  riskLevel: 'low' | 'medium' | 'high'
  completeness: number
  businessPlan: string
  marketResearch: string
  financialProjections: string
  team: Array<{
    name: string
    role: string
    bio: string
    avatar: string
  }>
  rewards: Array<{
    amount: number
    title: string
    description: string
  }>
  images: string[]
  videos: string[]
  documents: string[]
  socialLinks: {
    website: string
    twitter: string
    facebook: string
    instagram: string
    linkedin: string
  }
  tags: string[]
  story: string
  risks: string
  timeline: string
  shippingInfo: string
  returnPolicy: string
  estimatedDelivery: string
  faq: Array<{
    question: string
    answer: string
  }>
}

interface Employee {
  id: string
  name: string
  email: string
  role: 'admin' | 'reviewer' | 'senior_reviewer' | 'manager'
  permissions: string[]
  assignedProjects: string[]
  reviewCount: number
  approvalRate: number
  avatar: string
}

export function ProjectReviewSystem() {
  const [projects, setProjects] = useState<ProjectReview[]>([])
  const [employees, setEmployees] = useState<Employee[]>([])
  const [selectedProject, setSelectedProject] = useState<ProjectReview | null>(null)
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [assignedToFilter, setAssignedToFilter] = useState("all")
  const [sortBy, setSortBy] = useState("submittedAt")
  const [reviewNotes, setReviewNotes] = useState("")
  const [rejectionReason, setRejectionReason] = useState("")
  const [selectedAction, setSelectedAction] = useState<"approve" | "reject" | "needs_revision">("approve")
  const [showEmployeeModal, setShowEmployeeModal] = useState(false)
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    role: "reviewer" as const,
    permissions: [] as string[]
  })

  // Mock data
  useEffect(() => {
    const mockProjects: ProjectReview[] = [
      {
        id: "1",
        projectId: "proj_001",
        title: "EcoTech Solutions - AI-Powered Energy Management",
        creator: "Sarah Chen",
        creatorEmail: "sarah@ecotech.com",
        category: "Technology",
        goal: 50000,
        raised: 0,
        status: "pending",
        submittedAt: "2024-01-15T10:30:00Z",
        priority: "high",
        riskLevel: "medium",
        completeness: 85,
        businessPlan: "Comprehensive business plan with 5-year projections...",
        marketResearch: "Detailed market analysis showing 40% growth potential...",
        financialProjections: "Conservative projections with 3-year break-even...",
        team: [
          { name: "Sarah Chen", role: "CEO", bio: "Former Tesla engineer", avatar: "/avatars/sarah.jpg" },
          { name: "Mike Johnson", role: "CTO", bio: "AI specialist with 10+ years", avatar: "/avatars/mike.jpg" }
        ],
        rewards: [
          { amount: 25, title: "Early Bird", description: "Get the product 30% off" },
          { amount: 100, title: "Premium", description: "Premium version with lifetime updates" }
        ],
        images: ["/images/ecotech-1.jpg", "/images/ecotech-2.jpg"],
        videos: ["/videos/ecotech-demo.mp4"],
        documents: ["/docs/ecotech-business-plan.pdf"],
        socialLinks: {
          website: "https://ecotech.com",
          twitter: "@ecotech",
          facebook: "ecotech",
          instagram: "@ecotech",
          linkedin: "ecotech-solutions"
        },
        tags: ["AI", "Sustainability", "Energy", "Green Tech"],
        story: "We're revolutionizing energy management with AI...",
        risks: "Main risks include regulatory changes and competition...",
        timeline: "6-month development, 3-month testing, 3-month launch",
        shippingInfo: "Free shipping worldwide",
        returnPolicy: "30-day money-back guarantee",
        estimatedDelivery: "2024-08-15",
        faq: [
          { question: "When will it ship?", answer: "August 2024" },
          { question: "What's the warranty?", answer: "2 years" }
        ]
      },
      {
        id: "2",
        projectId: "proj_002",
        title: "Sustainable Fashion Revolution",
        creator: "Emma Rodriguez",
        creatorEmail: "emma@sustainablefashion.com",
        category: "Fashion",
        goal: 25000,
        raised: 0,
        status: "under_review",
        submittedAt: "2024-01-14T14:20:00Z",
        reviewedAt: "2024-01-15T09:15:00Z",
        reviewedBy: "john.doe@growthlab.com",
        priority: "medium",
        riskLevel: "low",
        completeness: 92,
        businessPlan: "Fashion industry disruption with sustainable materials...",
        marketResearch: "Growing demand for sustainable fashion (25% annually)...",
        financialProjections: "Break-even in 18 months...",
        team: [
          { name: "Emma Rodriguez", role: "Founder", bio: "Fashion designer with sustainability focus", avatar: "/avatars/emma.jpg" }
        ],
        rewards: [
          { amount: 50, title: "Basic", description: "One sustainable item" },
          { amount: 150, title: "Bundle", description: "Complete sustainable outfit" }
        ],
        images: ["/images/fashion-1.jpg"],
        videos: [],
        documents: ["/docs/fashion-business-plan.pdf"],
        socialLinks: {
          website: "https://sustainablefashion.com",
          instagram: "@sustainablefashion",
          linkedin: "sustainable-fashion-revolution"
        },
        tags: ["Fashion", "Sustainability", "Ethical"],
        story: "Creating a sustainable fashion brand...",
        risks: "Supply chain challenges and material costs...",
        timeline: "4-month production, 2-month launch",
        shippingInfo: "Carbon-neutral shipping",
        returnPolicy: "Full refund within 14 days",
        estimatedDelivery: "2024-06-01",
        faq: [
          { question: "Are materials certified?", answer: "Yes, all organic certified" }
        ]
      }
    ]

    const mockEmployees: Employee[] = [
      {
        id: "emp_001",
        name: "John Doe",
        email: "john.doe@growthlab.com",
        role: "senior_reviewer",
        permissions: ["review_projects", "approve_projects", "assign_reviewers"],
        assignedProjects: ["proj_002"],
        reviewCount: 45,
        approvalRate: 78,
        avatar: "/avatars/john.jpg"
      },
      {
        id: "emp_002",
        name: "Jane Smith",
        email: "jane.smith@growthlab.com",
        role: "reviewer",
        permissions: ["review_projects"],
        assignedProjects: [],
        reviewCount: 23,
        approvalRate: 82,
        avatar: "/avatars/jane.jpg"
      }
    ]

    setProjects(mockProjects)
    setEmployees(mockEmployees)
  }, [])

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.creator.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.category.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    const matchesPriority = priorityFilter === "all" || project.priority === priorityFilter
    const matchesAssigned = assignedToFilter === "all" || 
                           (assignedToFilter === "unassigned" && !project.reviewedBy) ||
                           project.reviewedBy === assignedToFilter

    return matchesSearch && matchesStatus && matchesPriority && matchesAssigned
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'under_review': return 'bg-blue-100 text-blue-800'
      case 'approved': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      case 'needs_revision': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleReview = (project: ProjectReview) => {
    setSelectedProject(project)
    setShowReviewModal(true)
    setReviewNotes("")
    setRejectionReason("")
    setSelectedAction("approve")
  }

  const handleSubmitReview = () => {
    if (!selectedProject) return

    const updatedProject = {
      ...selectedProject,
      status: selectedAction === "approve" ? "approved" : 
              selectedAction === "reject" ? "rejected" : "needs_revision",
      reviewedAt: new Date().toISOString(),
      reviewedBy: "current.user@growthlab.com",
      reviewNotes: reviewNotes,
      rejectionReason: selectedAction === "reject" ? rejectionReason : undefined
    }

    setProjects(prev => prev.map(p => p.id === selectedProject.id ? updatedProject : p))
    setShowReviewModal(false)
    setSelectedProject(null)
  }

  const handleAssignReviewer = (projectId: string, reviewerEmail: string) => {
    setProjects(prev => prev.map(p => 
      p.id === projectId 
        ? { ...p, reviewedBy: reviewerEmail, status: 'under_review' as const }
        : p
    ))
  }

  const handleAddEmployee = () => {
    const newEmp: Employee = {
      id: `emp_${Date.now()}`,
      ...newEmployee,
      assignedProjects: [],
      reviewCount: 0,
      approvalRate: 0,
      avatar: "/avatars/default.jpg"
    }
    setEmployees(prev => [...prev, newEmp])
    setNewEmployee({ name: "", email: "", role: "reviewer", permissions: [] })
    setShowEmployeeModal(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Project Review System</h2>
          <p className="text-gray-600 dark:text-gray-400">Review and approve submitted projects</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setShowEmployeeModal(true)} variant="outline">
            <Users className="h-4 w-4 mr-2" />
            Manage Employees
          </Button>
          <Button>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {projects.filter(p => p.status === 'pending').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Under Review</p>
                <p className="text-2xl font-bold text-blue-600">
                  {projects.filter(p => p.status === 'under_review').length}
                </p>
              </div>
              <Eye className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600">
                  {projects.filter(p => p.status === 'approved').length}
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
                <p className="text-sm text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-red-600">
                  {projects.filter(p => p.status === 'rejected').length}
                </p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="needs_revision">Needs Revision</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={assignedToFilter} onValueChange={setAssignedToFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Assigned To" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Assignments</SelectItem>
                <SelectItem value="unassigned">Unassigned</SelectItem>
                {employees.map(emp => (
                  <SelectItem key={emp.id} value={emp.email}>{emp.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="submittedAt">Submitted Date</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
                <SelectItem value="completeness">Completeness</SelectItem>
                <SelectItem value="title">Title</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Projects List */}
      <div className="space-y-4">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {project.title}
                    </h3>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                    <Badge className={getPriorityColor(project.priority)}>
                      {project.priority.toUpperCase()}
                    </Badge>
                    <Badge className={getRiskColor(project.riskLevel)}>
                      {project.riskLevel.toUpperCase()} RISK
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Creator</p>
                      <p className="font-medium">{project.creator}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Category</p>
                      <p className="font-medium">{project.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Goal</p>
                      <p className="font-medium">${project.goal.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Completeness</p>
                      <div className="flex items-center gap-2">
                        <Progress value={project.completeness} className="flex-1" />
                        <span className="text-sm font-medium">{project.completeness}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>Submitted: {new Date(project.submittedAt).toLocaleDateString()}</span>
                    {project.reviewedBy && (
                      <span>Assigned to: {employees.find(e => e.email === project.reviewedBy)?.name || project.reviewedBy}</span>
                    )}
                    <span>Team: {project.team.length} members</span>
                    <span>Rewards: {project.rewards.length} tiers</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-3">
                    {project.tags.slice(0, 5).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 5 && (
                      <Badge variant="secondary" className="text-xs">
                        +{project.tags.length - 5} more
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 ml-4">
                  <Button
                    onClick={() => handleReview(project)}
                    size="sm"
                    className="w-full"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Review
                  </Button>
                  
                  {!project.reviewedBy && (
                    <Select onValueChange={(value) => handleAssignReviewer(project.id, value)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Assign to..." />
                      </SelectTrigger>
                      <SelectContent>
                        {employees.filter(emp => emp.permissions.includes('review_projects')).map(emp => (
                          <SelectItem key={emp.id} value={emp.email}>{emp.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  
                  <Button variant="outline" size="sm" className="w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Project
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Review Modal */}
      <Dialog open={showReviewModal} onOpenChange={setShowReviewModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Review Project: {selectedProject?.title}</DialogTitle>
          </DialogHeader>
          
          {selectedProject && (
            <div className="space-y-6">
              {/* Project Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Project Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Creator</p>
                      <p className="font-medium">{selectedProject.creator} ({selectedProject.creatorEmail})</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Category</p>
                      <p className="font-medium">{selectedProject.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Funding Goal</p>
                      <p className="font-medium">${selectedProject.goal.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Completeness</p>
                      <div className="flex items-center gap-2">
                        <Progress value={selectedProject.completeness} className="flex-1" />
                        <span className="text-sm font-medium">{selectedProject.completeness}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Business Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Business Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">Business Plan</p>
                    <p className="text-sm text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 p-3 rounded">
                      {selectedProject.businessPlan}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">Market Research</p>
                    <p className="text-sm text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 p-3 rounded">
                      {selectedProject.marketResearch}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">Financial Projections</p>
                    <p className="text-sm text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 p-3 rounded">
                      {selectedProject.financialProjections}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Team Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Team Members</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedProject.team.map((member, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded">
                        <Avatar>
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-gray-600">{member.role}</p>
                          <p className="text-xs text-gray-500">{member.bio}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Review Action */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Review Decision</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4">
                    <Button
                      onClick={() => setSelectedAction("approve")}
                      variant={selectedAction === "approve" ? "default" : "outline"}
                      className="flex-1"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      onClick={() => setSelectedAction("needs_revision")}
                      variant={selectedAction === "needs_revision" ? "default" : "outline"}
                      className="flex-1"
                    >
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Needs Revision
                    </Button>
                    <Button
                      onClick={() => setSelectedAction("reject")}
                      variant={selectedAction === "reject" ? "destructive" : "outline"}
                      className="flex-1"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Review Notes
                    </label>
                    <Textarea
                      value={reviewNotes}
                      onChange={(e) => setReviewNotes(e.target.value)}
                      placeholder="Add your review notes..."
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  {selectedAction === "reject" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Rejection Reason
                      </label>
                      <Textarea
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        placeholder="Explain why the project is being rejected..."
                        className="min-h-[80px]"
                      />
                    </div>
                  )}
                  
                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleSubmitReview} className="flex-1">
                      Submit Review
                    </Button>
                    <Button onClick={() => setShowReviewModal(false)} variant="outline">
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Employee Management Modal */}
      <Dialog open={showEmployeeModal} onOpenChange={setShowEmployeeModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Employee</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Name
              </label>
              <Input
                value={newEmployee.name}
                onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                placeholder="Employee name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Email
              </label>
              <Input
                type="email"
                value={newEmployee.email}
                onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                placeholder="employee@growthlab.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Role
              </label>
              <Select value={newEmployee.role} onValueChange={(value: any) => setNewEmployee({...newEmployee, role: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="reviewer">Reviewer</SelectItem>
                  <SelectItem value="senior_reviewer">Senior Reviewer</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button onClick={handleAddEmployee} className="flex-1">
                Add Employee
              </Button>
              <Button onClick={() => setShowEmployeeModal(false)} variant="outline">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
