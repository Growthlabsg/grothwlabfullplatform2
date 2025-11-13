"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { 
  AppWindow, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Search, 
  Filter,
  Calendar,
  Building,
  Globe,
  Phone,
  Mail,
  Star,
  Users,
  TrendingUp,
  AlertCircle,
  FileText,
  Shield,
  Award
} from "lucide-react"

interface AppSubmission {
  id: string
  type: "app" | "deal"
  title: string
  company: string
  description: string
  website: string
  contactEmail: string
  contactPhone?: string
  status: "pending" | "approved" | "rejected" | "needs_revision"
  submittedAt: string
  reviewedAt?: string
  reviewedBy?: string
  reviewNotes?: string
  // App specific fields
  appType?: string
  trialPeriod?: string
  pricing?: string
  category?: string
  targetAudience?: string
  keyFeatures?: string
  foundedYear?: string
  teamSize?: string
  uniqueValue?: string
  // Deal specific fields
  dealType?: string
  dealCategory?: string
  value?: string
  discount?: string
  deadline?: string
  location?: string
  industry?: string
  requirements?: string
  eligibility?: string
  benefits?: string
  additionalValue?: string
  companySize?: string
  testimonials?: string
  couponCode?: string
  additionalInfo?: string
}

export default function ReviewPage() {
  const { toast } = useToast()
  const [submissions, setSubmissions] = useState<AppSubmission[]>([])
  const [filteredSubmissions, setFilteredSubmissions] = useState<AppSubmission[]>([])
  const [selectedSubmission, setSelectedSubmission] = useState<AppSubmission | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [showReviewDialog, setShowReviewDialog] = useState(false)
  const [reviewNotes, setReviewNotes] = useState("")
  const [reviewAction, setReviewAction] = useState<"approve" | "reject" | "needs_revision">("approve")

  // Sample data - in a real app, this would come from an API
  useEffect(() => {
    const sampleSubmissions: AppSubmission[] = [
      {
        id: "1",
        type: "app",
        title: "StartupCRM Pro",
        company: "TechStart Solutions",
        description: "A comprehensive CRM solution designed specifically for startups to manage their sales pipeline and customer relationships.",
        website: "https://startupcrm.com",
        contactEmail: "contact@startupcrm.com",
        contactPhone: "+1 (555) 123-4567",
        status: "pending",
        submittedAt: "2024-01-15T10:30:00Z",
        appType: "trial",
        trialPeriod: "30 days",
        pricing: "Free trial, $29/month after",
        category: "CRM",
        targetAudience: "Small to medium startups",
        keyFeatures: "Sales pipeline management\nCustomer relationship tracking\nAnalytics dashboard\nTeam collaboration",
        foundedYear: "2022",
        teamSize: "6-20",
        uniqueValue: "Built specifically for startup workflows with AI-powered insights"
      },
      {
        id: "2",
        type: "deal",
        title: "50% Off Cloud Infrastructure",
        company: "CloudScale Inc",
        description: "Exclusive 50% discount on cloud infrastructure services for qualifying startups.",
        website: "https://cloudscale.com",
        contactEmail: "deals@cloudscale.com",
        contactPhone: "+1 (555) 987-6543",
        status: "pending",
        submittedAt: "2024-01-14T14:20:00Z",
        dealType: "discount",
        dealCategory: "software",
        value: "5000",
        discount: "50",
        deadline: "2024-03-31",
        location: "Global",
        industry: "Cloud Services",
        requirements: "Must be a registered startup\nMinimum 6 months in business\nRevenue under $1M annually",
        benefits: "50% off first year\nFree migration support\n24/7 technical support\nDedicated account manager",
        additionalValue: "Free consultation session worth $500",
        companySize: "medium",
        foundedYear: "2020",
        testimonials: "CloudScale helped us reduce our infrastructure costs by 60% while improving performance.",
        couponCode: "STARTUP50"
      },
      {
        id: "3",
        type: "app",
        title: "Analytics Dashboard",
        company: "DataViz Solutions",
        description: "Real-time analytics dashboard for startup metrics and KPIs.",
        website: "https://dataviz.com",
        contactEmail: "hello@dataviz.com",
        status: "approved",
        submittedAt: "2024-01-10T09:15:00Z",
        reviewedAt: "2024-01-12T16:45:00Z",
        reviewedBy: "John Smith",
        appType: "free",
        trialPeriod: "N/A",
        pricing: "Free tier available, $19/month for premium",
        category: "Analytics",
        targetAudience: "Data-driven startups",
        keyFeatures: "Real-time metrics\nCustom dashboards\nTeam collaboration\nExport capabilities",
        foundedYear: "2021",
        teamSize: "1-5",
        uniqueValue: "Simplified analytics without the complexity of enterprise tools"
      }
    ]
    setSubmissions(sampleSubmissions)
    setFilteredSubmissions(sampleSubmissions)
  }, [])

  useEffect(() => {
    let filtered = submissions

    if (searchTerm) {
      filtered = filtered.filter(submission => 
        submission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(submission => submission.status === statusFilter)
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter(submission => submission.type === typeFilter)
    }

    setFilteredSubmissions(filtered)
  }, [submissions, searchTerm, statusFilter, typeFilter])

  const handleReview = (submission: AppSubmission, action: "approve" | "reject" | "needs_revision") => {
    setSelectedSubmission(submission)
    setReviewAction(action)
    setReviewNotes("")
    setShowReviewDialog(true)
  }

  const submitReview = () => {
    if (!selectedSubmission) return

    const updatedSubmissions = submissions.map(submission => {
      if (submission.id === selectedSubmission.id) {
        return {
          ...submission,
          status: reviewAction === "approve" ? "approved" : reviewAction === "reject" ? "rejected" : "needs_revision",
          reviewedAt: new Date().toISOString(),
          reviewedBy: "Current Reviewer", // In real app, get from auth context
          reviewNotes: reviewNotes
        }
      }
      return submission
    })

    setSubmissions(updatedSubmissions)
    setShowReviewDialog(false)
    setSelectedSubmission(null)

    toast({
      title: "Review Submitted",
      description: `Submission has been ${reviewAction === "approve" ? "approved" : reviewAction === "reject" ? "rejected" : "marked for revision"}.`
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-green-100 text-green-800"
      case "rejected": return "bg-red-100 text-red-800"
      case "needs_revision": return "bg-yellow-100 text-yellow-800"
      default: return "bg-blue-100 text-blue-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved": return <CheckCircle className="w-4 h-4" />
      case "rejected": return <XCircle className="w-4 h-4" />
      case "needs_revision": return <AlertCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const renderSubmissionCard = (submission: AppSubmission) => (
    <Card key={submission.id} className="hover:shadow-lg transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {submission.type === "app" ? (
              <AppWindow className="w-8 h-8 text-blue-600" />
            ) : (
              <DollarSign className="w-8 h-8 text-green-600" />
            )}
            <div>
              <CardTitle className="text-lg">{submission.title}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Building className="w-4 h-4" />
                {submission.company}
              </CardDescription>
            </div>
          </div>
          <Badge className={getStatusColor(submission.status)}>
            <div className="flex items-center gap-1">
              {getStatusIcon(submission.status)}
              {submission.status.replace("_", " ").toUpperCase()}
            </div>
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600 line-clamp-2">{submission.description}</p>
        
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {new Date(submission.submittedAt).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-1">
            <Globe className="w-4 h-4" />
            {submission.website}
          </div>
        </div>

        {submission.reviewedAt && (
          <div className="text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              Reviewed by {submission.reviewedBy} on {new Date(submission.reviewedAt).toLocaleDateString()}
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedSubmission(submission)}
          >
            <Eye className="w-4 h-4 mr-1" />
            View Details
          </Button>
          
          {submission.status === "pending" && (
            <>
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => handleReview(submission, "approve")}
              >
                <CheckCircle className="w-4 h-4 mr-1" />
                Approve
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleReview(submission, "reject")}
              >
                <XCircle className="w-4 h-4 mr-1" />
                Reject
              </Button>
              <Button
                size="sm"
                className="bg-yellow-600 hover:bg-yellow-700"
                onClick={() => handleReview(submission, "needs_revision")}
              >
                <AlertCircle className="w-4 h-4 mr-1" />
                Needs Revision
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )

  const renderSubmissionDetails = (submission: AppSubmission) => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="text-sm font-medium">Title</Label>
              <p className="text-sm">{submission.title}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Company</Label>
              <p className="text-sm">{submission.company}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Description</Label>
              <p className="text-sm">{submission.description}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Website</Label>
              <p className="text-sm">
                <a href={submission.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {submission.website}
                </a>
              </p>
            </div>
            <div>
              <Label className="text-sm font-medium">Contact Email</Label>
              <p className="text-sm">
                <a href={`mailto:${submission.contactEmail}`} className="text-blue-600 hover:underline">
                  {submission.contactEmail}
                </a>
              </p>
            </div>
            {submission.contactPhone && (
              <div>
                <Label className="text-sm font-medium">Contact Phone</Label>
                <p className="text-sm">
                  <a href={`tel:${submission.contactPhone}`} className="text-blue-600 hover:underline">
                    {submission.contactPhone}
                  </a>
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {submission.type === "app" ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AppWindow className="w-5 h-5" />
                App Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-sm font-medium">Type</Label>
                <p className="text-sm">{submission.appType}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Trial Period</Label>
                <p className="text-sm">{submission.trialPeriod}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Pricing</Label>
                <p className="text-sm">{submission.pricing}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Category</Label>
                <p className="text-sm">{submission.category}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Target Audience</Label>
                <p className="text-sm">{submission.targetAudience}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Key Features</Label>
                <p className="text-sm whitespace-pre-line">{submission.keyFeatures}</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Deal Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-sm font-medium">Deal Type</Label>
                <p className="text-sm">{submission.dealType}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Category</Label>
                <p className="text-sm">{submission.dealCategory}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Value</Label>
                <p className="text-sm">${submission.value}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Discount</Label>
                <p className="text-sm">{submission.discount}%</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Deadline</Label>
                <p className="text-sm">{submission.deadline}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Location</Label>
                <p className="text-sm">{submission.location}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Industry</Label>
                <p className="text-sm">{submission.industry}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Business Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Founded Year</Label>
              <p className="text-sm">{submission.foundedYear || "N/A"}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Team Size</Label>
              <p className="text-sm">{submission.teamSize || submission.companySize || "N/A"}</p>
            </div>
          </div>
          <div>
            <Label className="text-sm font-medium">Unique Value Proposition</Label>
            <p className="text-sm">{submission.uniqueValue || "N/A"}</p>
          </div>
          {submission.testimonials && (
            <div>
              <Label className="text-sm font-medium">Testimonials</Label>
              <p className="text-sm">{submission.testimonials}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {submission.requirements && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Requirements & Benefits
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="text-sm font-medium">Requirements</Label>
              <p className="text-sm whitespace-pre-line">{submission.requirements}</p>
            </div>
            {submission.eligibility && (
              <div>
                <Label className="text-sm font-medium">Eligibility</Label>
                <p className="text-sm">{submission.eligibility}</p>
              </div>
            )}
            {submission.benefits && (
              <div>
                <Label className="text-sm font-medium">Benefits</Label>
                <p className="text-sm whitespace-pre-line">{submission.benefits}</p>
              </div>
            )}
            {submission.additionalValue && (
              <div>
                <Label className="text-sm font-medium">Additional Value</Label>
                <p className="text-sm">{submission.additionalValue}</p>
              </div>
            )}
            {submission.couponCode && (
              <div>
                <Label className="text-sm font-medium">Coupon Code</Label>
                <p className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{submission.couponCode}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {submission.reviewNotes && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Review Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{submission.reviewNotes}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )

  const pendingCount = submissions.filter(s => s.status === "pending").length
  const approvedCount = submissions.filter(s => s.status === "approved").length
  const rejectedCount = submissions.filter(s => s.status === "rejected").length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">App & Deal Reviews</h1>
              <p className="text-sm text-gray-600">Review and approve submissions from the community</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-blue-600">
                <Clock className="w-4 h-4 mr-1" />
                {pendingCount} Pending
              </Badge>
              <Badge variant="outline" className="text-green-600">
                <CheckCircle className="w-4 h-4 mr-1" />
                {approvedCount} Approved
              </Badge>
              <Badge variant="outline" className="text-red-600">
                <XCircle className="w-4 h-4 mr-1" />
                {rejectedCount} Rejected
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Submissions</TabsTrigger>
            <TabsTrigger value="pending">Pending Review</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search submissions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="needs_revision">Needs Revision</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="app">Apps</SelectItem>
                  <SelectItem value="deal">Deals</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Submissions Grid */}
            <div className="grid gap-6">
              {filteredSubmissions.map(renderSubmissionCard)}
            </div>
          </TabsContent>

          <TabsContent value="pending" className="space-y-6">
            <div className="grid gap-6">
              {filteredSubmissions.filter(s => s.status === "pending").map(renderSubmissionCard)}
            </div>
          </TabsContent>

          <TabsContent value="approved" className="space-y-6">
            <div className="grid gap-6">
              {filteredSubmissions.filter(s => s.status === "approved").map(renderSubmissionCard)}
            </div>
          </TabsContent>

          <TabsContent value="rejected" className="space-y-6">
            <div className="grid gap-6">
              {filteredSubmissions.filter(s => s.status === "rejected").map(renderSubmissionCard)}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Submission Details Dialog */}
      <Dialog open={!!selectedSubmission} onOpenChange={() => setSelectedSubmission(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedSubmission?.type === "app" ? (
                <AppWindow className="w-5 h-5" />
              ) : (
                <DollarSign className="w-5 h-5" />
              )}
              {selectedSubmission?.title}
            </DialogTitle>
            <DialogDescription>
              Review submission details and make a decision
            </DialogDescription>
          </DialogHeader>
          
          {selectedSubmission && renderSubmissionDetails(selectedSubmission)}
        </DialogContent>
      </Dialog>

      {/* Review Dialog */}
      <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {reviewAction === "approve" ? "Approve Submission" : 
               reviewAction === "reject" ? "Reject Submission" : 
               "Request Revision"}
            </DialogTitle>
            <DialogDescription>
              {reviewAction === "approve" ? "This submission will be approved and made visible to users." :
               reviewAction === "reject" ? "This submission will be rejected and the submitter will be notified." :
               "This submission will be marked for revision with your feedback."}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="review-notes">Review Notes</Label>
              <Textarea
                id="review-notes"
                placeholder="Add your review notes here..."
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowReviewDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={submitReview}
              className={
                reviewAction === "approve" ? "bg-green-600 hover:bg-green-700" :
                reviewAction === "reject" ? "bg-red-600 hover:bg-red-700" :
                "bg-yellow-600 hover:bg-yellow-700"
              }
            >
              {reviewAction === "approve" ? "Approve" :
               reviewAction === "reject" ? "Reject" :
               "Request Revision"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
