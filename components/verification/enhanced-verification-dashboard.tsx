"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Search,
  Download,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  FileText,
  Eye,
  Filter,
  RefreshCw,
  Settings,
  Webhook,
  BarChart2,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { VerificationAnalytics } from "./verification-analytics"
import { VerificationWebhooks } from "./verification-webhooks"
import { BatchVerificationProcessor } from "./batch-verification-processor"

// Define verification status types
type VerificationStatus = "pending" | "approved" | "rejected" | "additional_info" | "expired"

// Define document types
type DocumentType =
  | "business_registration"
  | "founding_team_id"
  | "pitch_deck"
  | "financial_statements"
  | "product_demo"
  | "other"

// Define document
interface Document {
  id: string
  type: DocumentType
  name: string
  url: string
  uploadedAt: string
  fileSize: string
  expiryDate?: string
}

// Define verification request
interface VerificationRequest {
  id: string
  companyName: string
  companyLogo?: string
  dateSubmitted: string
  status: VerificationStatus
  foundingTeam: string[]
  industry: string
  stage: string
  description: string
  documents: Document[]
  notes?: string
  reviewedBy?: string
  reviewedAt?: string
  expiryDate?: string
  priority?: "low" | "medium" | "high"
  tags?: string[]
}

// Sample verification requests data
const sampleVerificationRequests: VerificationRequest[] = [
  {
    id: "VR-001",
    companyName: "FinTech Flow",
    companyLogo: "/fintech-flow.png",
    dateSubmitted: "2023-12-10",
    status: "pending",
    foundingTeam: ["Alex Chen", "Sarah Wong"],
    industry: "Fintech",
    stage: "Seed",
    description: "AI-powered financial management platform for SMEs in Southeast Asia",
    documents: [
      {
        id: "doc-001",
        type: "business_registration",
        name: "Business Registration Certificate",
        url: "/documents/fintech-flow/registration.pdf",
        uploadedAt: "2023-12-10",
        fileSize: "2.4 MB",
        expiryDate: "2024-12-10",
      },
      {
        id: "doc-002",
        type: "founding_team_id",
        name: "Founding Team IDs",
        url: "/documents/fintech-flow/founder-ids.pdf",
        uploadedAt: "2023-12-10",
        fileSize: "5.2 MB",
      },
      {
        id: "doc-003",
        type: "pitch_deck",
        name: "Pitch Deck",
        url: "/documents/fintech-flow/pitch-deck.pdf",
        uploadedAt: "2023-12-10",
        fileSize: "8.7 MB",
      },
    ],
    priority: "high",
    tags: ["AI", "Fintech", "SME"],
  },
  {
    id: "VR-002",
    companyName: "GreenPath Logistics",
    companyLogo: "/green-path-logistics.png",
    dateSubmitted: "2023-12-08",
    status: "approved",
    foundingTeam: ["David Kumar", "Michelle Tan"],
    industry: "Logistics",
    stage: "Seed",
    description: "Sustainable last-mile delivery solutions using electric vehicles",
    documents: [
      {
        id: "doc-004",
        type: "business_registration",
        name: "Business Registration Certificate",
        url: "/documents/greenpath/registration.pdf",
        uploadedAt: "2023-12-08",
        fileSize: "1.8 MB",
        expiryDate: "2024-12-08",
      },
      {
        id: "doc-005",
        type: "founding_team_id",
        name: "Founding Team IDs",
        url: "/documents/greenpath/founder-ids.pdf",
        uploadedAt: "2023-12-08",
        fileSize: "4.5 MB",
      },
      {
        id: "doc-006",
        type: "financial_statements",
        name: "Financial Projections",
        url: "/documents/greenpath/financials.pdf",
        uploadedAt: "2023-12-08",
        fileSize: "3.2 MB",
      },
    ],
    reviewedBy: "Admin User",
    reviewedAt: "2023-12-09",
    expiryDate: "2024-12-09",
    priority: "medium",
    tags: ["Logistics", "Sustainability", "EV"],
  },
  {
    id: "VR-003",
    companyName: "MediHealth AI",
    companyLogo: "/AI-Healthcare-Integration.png",
    dateSubmitted: "2023-12-05",
    status: "additional_info",
    foundingTeam: ["Dr. Lisa Lim", "James Wong"],
    industry: "Healthtech",
    stage: "Series A",
    description: "AI diagnosis assistant for healthcare providers across APAC",
    documents: [
      {
        id: "doc-007",
        type: "business_registration",
        name: "Business Registration Certificate",
        url: "/documents/medihealth/registration.pdf",
        uploadedAt: "2023-12-05",
        fileSize: "2.1 MB",
        expiryDate: "2024-12-05",
      },
      {
        id: "doc-008",
        type: "pitch_deck",
        name: "Pitch Deck",
        url: "/documents/medihealth/pitch-deck.pdf",
        uploadedAt: "2023-12-05",
        fileSize: "12.4 MB",
      },
    ],
    notes: "Please provide additional information about medical certifications and data privacy compliance.",
    reviewedBy: "Admin User",
    reviewedAt: "2023-12-07",
    priority: "high",
    tags: ["AI", "Healthcare", "Diagnostics"],
  },
  {
    id: "VR-004",
    companyName: "EduSmart",
    companyLogo: "/smart-learning-tools.png",
    dateSubmitted: "2023-12-02",
    status: "rejected",
    foundingTeam: ["Robert Lee", "Emily Nguyen"],
    industry: "Edtech",
    stage: "Pre-seed",
    description: "Personalized learning platform for K-12 students",
    documents: [
      {
        id: "doc-009",
        type: "business_registration",
        name: "Business Registration Certificate",
        url: "/documents/edusmart/registration.pdf",
        uploadedAt: "2023-12-02",
        fileSize: "1.9 MB",
      },
    ],
    notes: "Insufficient documentation. Business model unclear and product still in concept stage.",
    reviewedBy: "Admin User",
    reviewedAt: "2023-12-04",
    priority: "low",
    tags: ["Education", "K-12", "Personalization"],
  },
  {
    id: "VR-005",
    companyName: "BlockSecure",
    companyLogo: "/interconnected-blocks.png",
    dateSubmitted: "2023-12-01",
    status: "pending",
    foundingTeam: ["Michael Zhang", "Jessica Lau"],
    industry: "Blockchain",
    stage: "Seed",
    description: "Blockchain security solutions for enterprises",
    documents: [
      {
        id: "doc-010",
        type: "business_registration",
        name: "Business Registration Certificate",
        url: "/documents/blocksecure/registration.pdf",
        uploadedAt: "2023-12-01",
        fileSize: "2.2 MB",
        expiryDate: "2024-12-01",
      },
      {
        id: "doc-011",
        type: "founding_team_id",
        name: "Founding Team IDs",
        url: "/documents/blocksecure/founder-ids.pdf",
        uploadedAt: "2023-12-01",
        fileSize: "3.8 MB",
      },
      {
        id: "doc-012",
        type: "product_demo",
        name: "Product Demo Video",
        url: "/documents/blocksecure/demo.mp4",
        uploadedAt: "2023-12-01",
        fileSize: "45.6 MB",
      },
    ],
    priority: "medium",
    tags: ["Blockchain", "Security", "Enterprise"],
  },
  {
    id: "VR-006",
    companyName: "TravelBuddy",
    companyLogo: "/travel-buddy.png",
    dateSubmitted: "2023-11-28",
    status: "expired",
    foundingTeam: ["John Smith", "Maria Garcia"],
    industry: "Travel",
    stage: "Series A",
    description: "AI-powered travel companion app for personalized recommendations",
    documents: [
      {
        id: "doc-013",
        type: "business_registration",
        name: "Business Registration Certificate",
        url: "/documents/travelbuddy/registration.pdf",
        uploadedAt: "2023-11-28",
        fileSize: "2.0 MB",
        expiryDate: "2023-11-28",
      },
      {
        id: "doc-014",
        type: "pitch_deck",
        name: "Pitch Deck",
        url: "/documents/travelbuddy/pitch-deck.pdf",
        uploadedAt: "2023-11-28",
        fileSize: "10.5 MB",
      },
    ],
    reviewedBy: "Admin User",
    reviewedAt: "2023-11-30",
    expiryDate: "2023-11-30",
    priority: "low",
    tags: ["Travel", "AI", "Mobile App"],
  },
]

export function EnhancedVerificationDashboard() {
  const [requests, setRequests] = useState<VerificationRequest[]>(sampleVerificationRequests)
  const [filteredRequests, setFilteredRequests] = useState<VerificationRequest[]>(sampleVerificationRequests)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedRequests, setSelectedRequests] = useState<string[]>([])
  const [selectedRequest, setSelectedRequest] = useState<VerificationRequest | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)
  const [isBatchProcessingOpen, setIsBatchProcessingOpen] = useState(false)
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false)
  const [isWebhooksOpen, setIsWebhooksOpen] = useState(false)
  const [reviewNotes, setReviewNotes] = useState("")
  const [reviewAction, setReviewAction] = useState<"approve" | "reject" | "request_info" | null>(null)
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false)
  const [filters, setFilters] = useState({
    industries: [] as string[],
    stages: [] as string[],
    priorities: [] as string[],
    dateRange: {
      start: "",
      end: "",
    },
    tags: [] as string[],
  })
  const [showExpiringOnly, setShowExpiringOnly] = useState(false)
  const [sortBy, setSortBy] = useState<string>("dateSubmitted")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  // Handle search and filtering
  const handleSearch = (term: string) => {
    setSearchTerm(term)
    applyFilters(term, statusFilter, filters, showExpiringOnly, sortBy, sortOrder)
  }

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status)
    applyFilters(searchTerm, status, filters, showExpiringOnly, sortBy, sortOrder)
  }

  const applyFilters = (
    term: string,
    status: string,
    filterOptions: typeof filters,
    expiringOnly: boolean,
    sort: string,
    order: "asc" | "desc",
  ) => {
    let filtered = [...requests]

    // Apply search term filter
    if (term) {
      filtered = filtered.filter(
        (request) =>
          request.companyName.toLowerCase().includes(term.toLowerCase()) ||
          request.id.toLowerCase().includes(term.toLowerCase()) ||
          request.industry.toLowerCase().includes(term.toLowerCase()) ||
          request.foundingTeam.some((member) => member.toLowerCase().includes(term.toLowerCase())) ||
          (request.tags && request.tags.some((tag) => tag.toLowerCase().includes(term.toLowerCase()))),
      )
    }

    // Apply status filter
    if (status !== "all") {
      filtered = filtered.filter((request) => request.status === status)
    }

    // Apply industry filter
    if (filterOptions.industries.length > 0) {
      filtered = filtered.filter((request) => filterOptions.industries.includes(request.industry))
    }

    // Apply stage filter
    if (filterOptions.stages.length > 0) {
      filtered = filtered.filter((request) => filterOptions.stages.includes(request.stage))
    }

    // Apply priority filter
    if (filterOptions.priorities.length > 0) {
      filtered = filtered.filter((request) => request.priority && filterOptions.priorities.includes(request.priority))
    }

    // Apply date range filter
    if (filterOptions.dateRange.start && filterOptions.dateRange.end) {
      const startDate = new Date(filterOptions.dateRange.start)
      const endDate = new Date(filterOptions.dateRange.end)
      filtered = filtered.filter((request) => {
        const submittedDate = new Date(request.dateSubmitted)
        return submittedDate >= startDate && submittedDate <= endDate
      })
    }

    // Apply tags filter
    if (filterOptions.tags.length > 0) {
      filtered = filtered.filter(
        (request) => request.tags && request.tags.some((tag) => filterOptions.tags.includes(tag)),
      )
    }

    // Apply expiring filter
    if (expiringOnly) {
      const today = new Date()
      const thirtyDaysFromNow = new Date()
      thirtyDaysFromNow.setDate(today.getDate() + 30)

      filtered = filtered.filter((request) => {
        if (!request.expiryDate) return false
        const expiryDate = new Date(request.expiryDate)
        return expiryDate <= thirtyDaysFromNow && expiryDate >= today
      })
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let valueA: any
      let valueB: any

      switch (sort) {
        case "companyName":
          valueA = a.companyName
          valueB = b.companyName
          break
        case "dateSubmitted":
          valueA = new Date(a.dateSubmitted)
          valueB = new Date(b.dateSubmitted)
          break
        case "priority":
          const priorityOrder = { high: 3, medium: 2, low: 1, undefined: 0 }
          valueA = priorityOrder[a.priority || "undefined"]
          valueB = priorityOrder[b.priority || "undefined"]
          break
        case "status":
          valueA = a.status
          valueB = b.status
          break
        default:
          valueA = a.dateSubmitted
          valueB = b.dateSubmitted
      }

      if (valueA < valueB) return order === "asc" ? -1 : 1
      if (valueA > valueB) return order === "asc" ? 1 : -1
      return 0
    })

    setFilteredRequests(filtered)
  }

  // Handle viewing request details
  const handleViewDetails = (request: VerificationRequest) => {
    setSelectedRequest(request)
    setIsDetailDialogOpen(true)
  }

  // Handle reviewing a request
  const handleReviewRequest = (request: VerificationRequest) => {
    setSelectedRequest(request)
    setReviewNotes(request.notes || "")
    setReviewAction(null)
    setIsReviewDialogOpen(true)
  }

  // Handle submission of review
  const handleSubmitReview = () => {
    if (!selectedRequest || !reviewAction) return

    const updatedRequests = requests.map((request): VerificationRequest => {
      if (request.id === selectedRequest.id) {
        const updatedRequest: VerificationRequest = {
          ...request,
          status: reviewAction === "approve" ? "approved" : reviewAction === "reject" ? "rejected" : "additional_info",
          notes: reviewNotes,
          reviewedBy: "Admin User",
          reviewedAt: new Date().toISOString().split("T")[0],
        }

        // Add expiry date if approved
        if (reviewAction === "approve") {
          const expiryDate = new Date()
          expiryDate.setFullYear(expiryDate.getFullYear() + 1)
          updatedRequest.expiryDate = expiryDate.toISOString().split("T")[0]
        }

        return updatedRequest
      }
      return request
    })

    setRequests(updatedRequests)
    applyFilters(searchTerm, statusFilter, filters, showExpiringOnly, sortBy, sortOrder)
    setIsReviewDialogOpen(false)
  }

  // Handle batch processing
  const handleBatchProcess = (action: "approve" | "reject" | "request_info", notes: string) => {
    if (selectedRequests.length === 0) return

    const updatedRequests = requests.map((request): VerificationRequest => {
      if (selectedRequests.includes(request.id)) {
        const updatedRequest: VerificationRequest = {
          ...request,
          status: action === "approve" ? "approved" : action === "reject" ? "rejected" : "additional_info",
          notes: notes,
          reviewedBy: "Admin User",
          reviewedAt: new Date().toISOString().split("T")[0],
        }

        // Add expiry date if approved
        if (action === "approve") {
          const expiryDate = new Date()
          expiryDate.setFullYear(expiryDate.getFullYear() + 1)
          updatedRequest.expiryDate = expiryDate.toISOString().split("T")[0]
        }

        return updatedRequest
      }
      return request
    })

    setRequests(updatedRequests)
    applyFilters(searchTerm, statusFilter, filters, showExpiringOnly, sortBy, sortOrder)
    setSelectedRequests([])
    setIsBatchProcessingOpen(false)
  }

  // Handle select all
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRequests(filteredRequests.map((request) => request.id))
    } else {
      setSelectedRequests([])
    }
  }

  // Handle select individual
  const handleSelectRequest = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedRequests((prev) => [...prev, id])
    } else {
      setSelectedRequests((prev) => prev.filter((requestId) => requestId !== id))
    }
  }

  // Get badge color based on status
  const getStatusBadge = (status: VerificationStatus) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
            <Clock className="mr-1 h-3 w-3" /> Pending
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
            <CheckCircle className="mr-1 h-3 w-3" /> Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
            <XCircle className="mr-1 h-3 w-3" /> Rejected
          </Badge>
        )
      case "additional_info":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
            <AlertCircle className="mr-1 h-3 w-3" /> Info Requested
          </Badge>
        )
      case "expired":
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">
            <AlertCircle className="mr-1 h-3 w-3" /> Expired
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  // Get priority badge
  const getPriorityBadge = (priority?: "low" | "medium" | "high") => {
    switch (priority) {
      case "high":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
            High
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
            Medium
          </Badge>
        )
      case "low":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
            Low
          </Badge>
        )
      default:
        return null
    }
  }

  // Get icon for document type
  const getDocumentIcon = (type: DocumentType) => {
    switch (type) {
      case "business_registration":
        return <FileText className="h-4 w-4" />
      case "founding_team_id":
        return <FileText className="h-4 w-4" />
      case "pitch_deck":
        return <FileText className="h-4 w-4" />
      case "financial_statements":
        return <FileText className="h-4 w-4" />
      case "product_demo":
        return <FileText className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  // Get friendly name for document type
  const getDocumentTypeName = (type: DocumentType): string => {
    switch (type) {
      case "business_registration":
        return "Business Registration"
      case "founding_team_id":
        return "Founding Team ID"
      case "pitch_deck":
        return "Pitch Deck"
      case "financial_statements":
        return "Financial Statements"
      case "product_demo":
        return "Product Demo"
      default:
        return "Other Document"
    }
  }

  // Check if document is expiring soon
  const isDocumentExpiringSoon = (expiryDate?: string): boolean => {
    if (!expiryDate) return false

    const today = new Date()
    const expiry = new Date(expiryDate)
    const thirtyDaysFromNow = new Date()
    thirtyDaysFromNow.setDate(today.getDate() + 30)

    return expiry <= thirtyDaysFromNow && expiry >= today
  }

  // Get unique industries, stages, and tags for filters
  const uniqueIndustries = Array.from(new Set(requests.map((request) => request.industry)))
  const uniqueStages = Array.from(new Set(requests.map((request) => request.stage)))
  const uniqueTags = Array.from(new Set(requests.flatMap((request) => request.tags || [])))

  // Apply filters when component mounts
  useEffect(() => {
    applyFilters(searchTerm, statusFilter, filters, showExpiringOnly, sortBy, sortOrder)
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Startup Verification</h2>
          <p className="text-muted-foreground">Manage and review verification requests from startups</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="w-full sm:w-auto" onClick={() => setIsAnalyticsOpen(true)}>
            <BarChart2 className="mr-2 h-4 w-4" /> Analytics
          </Button>
          <Button variant="outline" className="w-full sm:w-auto" onClick={() => setIsWebhooksOpen(true)}>
            <Webhook className="mr-2 h-4 w-4" /> Webhooks
          </Button>
          <Button variant="outline" className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button className="w-full sm:w-auto" asChild>
            <a href="/admin/verification/settings">
              <Settings className="mr-2 h-4 w-4" /> Settings
            </a>
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center w-full sm:w-auto">
          <Search className="h-4 w-4 text-muted-foreground mr-2" />
          <Input
            placeholder="Search requests..."
            className="w-full sm:w-64"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <Sheet open={isFilterSheetOpen} onOpenChange={setIsFilterSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                <Filter className="mr-2 h-4 w-4" /> Filters
                {(filters.industries.length > 0 ||
                  filters.stages.length > 0 ||
                  filters.priorities.length > 0 ||
                  filters.tags.length > 0 ||
                  (filters.dateRange.start && filters.dateRange.end) ||
                  showExpiringOnly) && (
                  <Badge variant="secondary" className="ml-2">
                    Active
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Filter Verification Requests</SheetTitle>
                <SheetDescription>Apply filters to narrow down verification requests</SheetDescription>
              </SheetHeader>
              <div className="py-4 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Industries</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {uniqueIndustries.map((industry) => (
                      <div key={industry} className="flex items-center space-x-2">
                        <Checkbox
                          id={`industry-${industry}`}
                          checked={filters.industries.includes(industry)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFilters({
                                ...filters,
                                industries: [...filters.industries, industry],
                              })
                            } else {
                              setFilters({
                                ...filters,
                                industries: filters.industries.filter((i) => i !== industry),
                              })
                            }
                          }}
                        />
                        <Label htmlFor={`industry-${industry}`}>{industry}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Stages</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {uniqueStages.map((stage) => (
                      <div key={stage} className="flex items-center space-x-2">
                        <Checkbox
                          id={`stage-${stage}`}
                          checked={filters.stages.includes(stage)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFilters({
                                ...filters,
                                stages: [...filters.stages, stage],
                              })
                            } else {
                              setFilters({
                                ...filters,
                                stages: filters.stages.filter((s) => s !== stage),
                              })
                            }
                          }}
                        />
                        <Label htmlFor={`stage-${stage}`}>{stage}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Priority</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {["high", "medium", "low"].map((priority) => (
                      <div key={priority} className="flex items-center space-x-2">
                        <Checkbox
                          id={`priority-${priority}`}
                          checked={filters.priorities.includes(priority)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFilters({
                                ...filters,
                                priorities: [...filters.priorities, priority],
                              })
                            } else {
                              setFilters({
                                ...filters,
                                priorities: filters.priorities.filter((p) => p !== priority),
                              })
                            }
                          }}
                        />
                        <Label htmlFor={`priority-${priority}`} className="capitalize">
                          {priority}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Date Range</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label htmlFor="date-start">Start Date</Label>
                      <Input
                        id="date-start"
                        type="date"
                        value={filters.dateRange.start}
                        onChange={(e) =>
                          setFilters({
                            ...filters,
                            dateRange: { ...filters.dateRange, start: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="date-end">End Date</Label>
                      <Input
                        id="date-end"
                        type="date"
                        value={filters.dateRange.end}
                        onChange={(e) =>
                          setFilters({
                            ...filters,
                            dateRange: { ...filters.dateRange, end: e.target.value },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Tags</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {uniqueTags.map((tag) => (
                      <div key={tag} className="flex items-center space-x-2">
                        <Checkbox
                          id={`tag-${tag}`}
                          checked={filters.tags.includes(tag)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFilters({
                                ...filters,
                                tags: [...filters.tags, tag],
                              })
                            } else {
                              setFilters({
                                ...filters,
                                tags: filters.tags.filter((t) => t !== tag),
                              })
                            }
                          }}
                        />
                        <Label htmlFor={`tag-${tag}`}>{tag}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="expiring-only"
                    checked={showExpiringOnly}
                    onCheckedChange={(checked) => setShowExpiringOnly(checked as boolean)}
                  />
                  <Label htmlFor="expiring-only">Show only expiring verifications (next 30 days)</Label>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Sort By</h3>
                  <div className="flex items-center gap-2">
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dateSubmitted">Date Submitted</SelectItem>
                        <SelectItem value="companyName">Company Name</SelectItem>
                        <SelectItem value="priority">Priority</SelectItem>
                        <SelectItem value="status">Status</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                    >
                      {sortOrder === "asc" ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4 rotate-90" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setFilters({
                        industries: [],
                        stages: [],
                        priorities: [],
                        dateRange: { start: "", end: "" },
                        tags: [],
                      })
                      setShowExpiringOnly(false)
                      setSortBy("dateSubmitted")
                      setSortOrder("desc")
                    }}
                  >
                    Reset Filters
                  </Button>
                  <Button
                    onClick={() => {
                      applyFilters(searchTerm, statusFilter, filters, showExpiringOnly, sortBy, sortOrder)
                      setIsFilterSheetOpen(false)
                    }}
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Select
            value={sortBy}
            onValueChange={(value) => {
              setSortBy(value)
              applyFilters(searchTerm, statusFilter, filters, showExpiringOnly, value, sortOrder)
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dateSubmitted">Date Submitted</SelectItem>
              <SelectItem value="companyName">Company Name</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
              <SelectItem value="status">Status</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              const newOrder = sortOrder === "asc" ? "desc" : "asc"
              setSortOrder(newOrder)
              applyFilters(searchTerm, statusFilter, filters, showExpiringOnly, sortBy, newOrder)
            }}
          >
            {sortOrder === "asc" ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4 rotate-90" />}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" onValueChange={handleStatusFilter}>
        <div className="flex flex-col sm:flex-row justify-between">
          <TabsList>
            <TabsTrigger value="all">All Requests</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
            <TabsTrigger value="additional_info">Info Requested</TabsTrigger>
            <TabsTrigger value="expired">Expired</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              {selectedRequests.length > 0 && (
                <div className="p-4 bg-muted/50 border-b flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{selectedRequests.length} items selected</span>
                    <Button variant="outline" size="sm" onClick={() => setSelectedRequests([])}>
                      Clear
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => setIsBatchProcessingOpen(true)}>
                      Batch Process
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          Actions <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleBatchProcess("approve", "Batch approved by admin.")}>
                          <CheckCircle className="mr-2 h-4 w-4" /> Approve Selected
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleBatchProcess("reject", "Batch rejected by admin.")}>
                          <XCircle className="mr-2 h-4 w-4" /> Reject Selected
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            // Export selected as CSV
                            const selectedData = requests.filter((request) => selectedRequests.includes(request.id))
                            console.log("Export data:", selectedData)
                            // Implement CSV export logic here
                          }}
                        >
                          <Download className="mr-2 h-4 w-4" /> Export Selected
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              )}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox
                        checked={filteredRequests.length > 0 && selectedRequests.length === filteredRequests.length}
                        onCheckedChange={handleSelectAll}
                        aria-label="Select all"
                      />
                    </TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Date Submitted</TableHead>
                    <TableHead>Founders</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center h-24">
                        No verification requests found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedRequests.includes(request.id)}
                            onCheckedChange={(checked) => handleSelectRequest(request.id, checked as boolean)}
                            aria-label={`Select ${request.companyName}`}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={request.companyLogo || "/placeholder.svg"} alt={request.companyName} />
                              <AvatarFallback>{request.companyName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{request.companyName}</div>
                              <div className="text-sm text-muted-foreground">{request.industry}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{request.id}</TableCell>
                        <TableCell>{request.dateSubmitted}</TableCell>
                        <TableCell>
                          <div className="text-sm">{request.foundingTeam.join(", ")}</div>
                        </TableCell>
                        <TableCell>{getPriorityBadge(request.priority)}</TableCell>
                        <TableCell>{getStatusBadge(request.status)}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleViewDetails(request)}>
                                <Eye className="mr-2 h-4 w-4" /> View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleReviewRequest(request)}>
                                <CheckCircle className="mr-2 h-4 w-4" /> Review
                              </DropdownMenuItem>
                              {request.status === "approved" && request.expiryDate && (
                                <DropdownMenuItem
                                  onClick={() => {
                                    // Renew verification
                                    const updatedRequests = requests.map((r) => {
                                      if (r.id === request.id) {
                                        const expiryDate = new Date()
                                        expiryDate.setFullYear(expiryDate.getFullYear() + 1)
                                        return {
                                          ...r,
                                          expiryDate: expiryDate.toISOString().split("T")[0],
                                        }
                                      }
                                      return r
                                    })
                                    setRequests(updatedRequests)
                                    applyFilters(searchTerm, statusFilter, filters, showExpiringOnly, sortBy, sortOrder)
                                  }}
                                >
                                  <RefreshCw className="mr-2 h-4 w-4" /> Renew Verification
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {/* Same table structure, filtered for pending */}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          {/* Same table structure, filtered for approved */}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          {/* Same table structure, filtered for rejected */}
        </TabsContent>

        <TabsContent value="additional_info" className="space-y-4">
          {/* Same table structure, filtered for additional_info */}
        </TabsContent>

        <TabsContent value="expired" className="space-y-4">
          {/* Same table structure, filtered for expired */}
        </TabsContent>
      </Tabs>

      {/* Details Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedRequest && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={selectedRequest.companyLogo || "/placeholder.svg"}
                      alt={selectedRequest.companyName}
                    />
                    <AvatarFallback>{selectedRequest.companyName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <DialogTitle className="text-xl">{selectedRequest.companyName}</DialogTitle>
                    <DialogDescription>
                      Verification Request {selectedRequest.id} • {selectedRequest.dateSubmitted}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Company Information</h3>
                    <div className="mt-2 space-y-2">
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-sm font-medium">Industry:</div>
                        <div className="text-sm col-span-2">{selectedRequest.industry}</div>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-sm font-medium">Stage:</div>
                        <div className="text-sm col-span-2">{selectedRequest.stage}</div>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-sm font-medium">Founding Team:</div>
                        <div className="text-sm col-span-2">{selectedRequest.foundingTeam.join(", ")}</div>
                      </div>
                      {selectedRequest.tags && selectedRequest.tags.length > 0 && (
                        <div className="grid grid-cols-3 gap-2">
                          <div className="text-sm font-medium">Tags:</div>
                          <div className="text-sm col-span-2 flex flex-wrap gap-1">
                            {selectedRequest.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="mr-1">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">Description</h3>
                    <p className="mt-2 text-sm">{selectedRequest.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">Documents</h3>
                    <div className="mt-2 space-y-2">
                      {selectedRequest.documents.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-2 border rounded-md">
                          <div className="flex items-center gap-2">
                            {getDocumentIcon(doc.type)}
                            <div>
                              <div className="font-medium text-sm">{doc.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {getDocumentTypeName(doc.type)} • {doc.fileSize} • Uploaded on {doc.uploadedAt}
                                {doc.expiryDate && (
                                  <span
                                    className={
                                      isDocumentExpiringSoon(doc.expiryDate) ? "text-yellow-600 font-medium" : ""
                                    }
                                  >
                                    {" "}
                                    • Expires on {doc.expiryDate}
                                    {isDocumentExpiringSoon(doc.expiryDate) && " (Expiring Soon)"}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <a href={doc.url} target="_blank" rel="noopener noreferrer">
                              <Eye className="mr-1 h-3 w-3" /> View
                            </a>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedRequest.notes && (
                    <div>
                      <h3 className="text-lg font-medium">Review Notes</h3>
                      <div className="mt-2 p-3 bg-muted rounded-md text-sm">{selectedRequest.notes}</div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-md">
                    <h3 className="text-lg font-medium">Status</h3>
                    <div className="mt-2">{getStatusBadge(selectedRequest.status)}</div>

                    {selectedRequest.priority && (
                      <div className="mt-4">
                        <div className="text-sm font-medium">Priority:</div>
                        <div className="mt-1">{getPriorityBadge(selectedRequest.priority)}</div>
                      </div>
                    )}

                    {selectedRequest.expiryDate && (
                      <div className="mt-4">
                        <div className="text-sm font-medium">Verification Expires:</div>
                        <div
                          className={`mt-1 text-sm ${
                            isDocumentExpiringSoon(selectedRequest.expiryDate) ? "text-yellow-600 font-medium" : ""
                          }`}
                        >
                          {selectedRequest.expiryDate}
                          {isDocumentExpiringSoon(selectedRequest.expiryDate) && " (Expiring Soon)"}
                        </div>
                      </div>
                    )}

                    {selectedRequest.reviewedBy && (
                      <div className="mt-4 text-sm">
                        <div className="font-medium">Reviewed by:</div>
                        <div>{selectedRequest.reviewedBy}</div>
                        <div className="text-xs text-muted-foreground mt-1">on {selectedRequest.reviewedAt}</div>
                      </div>
                    )}
                  </div>

                  <Button
                    className="w-full"
                    onClick={() => {
                      setIsDetailDialogOpen(false)
                      handleReviewRequest(selectedRequest)
                    }}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" /> Review Request
                  </Button>

                  {selectedRequest.status === "approved" && selectedRequest.expiryDate && (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        // Renew verification
                        const updatedRequests = requests.map((r) => {
                          if (r.id === selectedRequest.id) {
                            const expiryDate = new Date()
                            expiryDate.setFullYear(expiryDate.getFullYear() + 1)
                            return {
                              ...r,
                              expiryDate: expiryDate.toISOString().split("T")[0],
                            }
                          }
                          return r
                        })
                        setRequests(updatedRequests)
                        setSelectedRequest({
                          ...selectedRequest,
                          expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
                            .toISOString()
                            .split("T")[0],
                        })
                        applyFilters(searchTerm, statusFilter, filters, showExpiringOnly, sortBy, sortOrder)
                      }}
                    >
                      <RefreshCw className="mr-2 h-4 w-4" /> Renew Verification
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Review Dialog */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent>
          {selectedRequest && (
            <>
              <DialogHeader>
                <DialogTitle>Review Verification Request</DialogTitle>
                <DialogDescription>
                  {selectedRequest.companyName} ({selectedRequest.id})
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Current Status</h3>
                  <div>{getStatusBadge(selectedRequest.status)}</div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Action</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant={reviewAction === "approve" ? "default" : "outline"}
                      className={reviewAction === "approve" ? "bg-green-600 hover:bg-green-700" : ""}
                      onClick={() => setReviewAction("approve")}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" /> Approve
                    </Button>
                    <Button
                      variant={reviewAction === "reject" ? "default" : "outline"}
                      className={reviewAction === "reject" ? "bg-red-600 hover:bg-red-700" : ""}
                      onClick={() => setReviewAction("reject")}
                    >
                      <XCircle className="mr-2 h-4 w-4" /> Reject
                    </Button>
                    <Button
                      variant={reviewAction === "request_info" ? "default" : "outline"}
                      className={reviewAction === "request_info" ? "bg-blue-600 hover:bg-blue-700" : ""}
                      onClick={() => setReviewAction("request_info")}
                    >
                      <AlertCircle className="mr-2 h-4 w-4" /> Request Info
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Review Notes</h3>
                  <textarea
                    className="w-full min-h-[100px] p-2 border rounded-md"
                    placeholder="Add notes about this verification request..."
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsReviewDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitReview}
                  disabled={!reviewAction}
                  className={
                    reviewAction === "approve"
                      ? "bg-green-600 hover:bg-green-700"
                      : reviewAction === "reject"
                        ? "bg-red-600 hover:bg-red-700"
                        : reviewAction === "request_info"
                          ? "bg-blue-600 hover:bg-blue-700"
                          : ""
                  }
                >
                  Submit Review
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Batch Processing Dialog */}
      <Dialog open={isBatchProcessingOpen} onOpenChange={setIsBatchProcessingOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Batch Process Verification Requests</DialogTitle>
            <DialogDescription>Process {selectedRequests.length} selected verification requests</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Action</h3>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={reviewAction === "approve" ? "default" : "outline"}
                  className={reviewAction === "approve" ? "bg-green-600 hover:bg-green-700" : ""}
                  onClick={() => setReviewAction("approve")}
                >
                  <CheckCircle className="mr-2 h-4 w-4" /> Approve All
                </Button>
                <Button
                  variant={reviewAction === "reject" ? "default" : "outline"}
                  className={reviewAction === "reject" ? "bg-red-600 hover:bg-red-700" : ""}
                  onClick={() => setReviewAction("reject")}
                >
                  <XCircle className="mr-2 h-4 w-4" /> Reject All
                </Button>
                <Button
                  variant={reviewAction === "request_info" ? "default" : "outline"}
                  className={reviewAction === "request_info" ? "bg-blue-600 hover:bg-blue-700" : ""}
                  onClick={() => setReviewAction("request_info")}
                >
                  <AlertCircle className="mr-2 h-4 w-4" /> Request Info
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Batch Notes</h3>
              <textarea
                className="w-full min-h-[100px] p-2 border rounded-md"
                placeholder="Add notes for all selected verification requests..."
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
              />
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Important</AlertTitle>
              <AlertDescription>
                This action will apply to all {selectedRequests.length} selected verification requests.
              </AlertDescription>
            </Alert>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBatchProcessingOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (!reviewAction) return
                handleBatchProcess(reviewAction, reviewNotes)
              }}
              disabled={!reviewAction}
              className={
                reviewAction === "approve"
                  ? "bg-green-600 hover:bg-green-700"
                  : reviewAction === "reject"
                    ? "bg-red-600 hover:bg-red-700"
                    : reviewAction === "request_info"
                      ? "bg-blue-600 hover:bg-blue-700"
                      : ""
              }
            >
              Process Selected
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Analytics Dialog */}
      <Dialog open={isAnalyticsOpen} onOpenChange={setIsAnalyticsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Verification Analytics</DialogTitle>
            <DialogDescription>Insights and metrics about verification requests and processing</DialogDescription>
          </DialogHeader>
          <VerificationAnalytics requests={requests} />
        </DialogContent>
      </Dialog>

      {/* Webhooks Dialog */}
      <Dialog open={isWebhooksOpen} onOpenChange={setIsWebhooksOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Verification Webhooks</DialogTitle>
            <DialogDescription>
              Configure webhooks to notify external systems about verification status changes
            </DialogDescription>
          </DialogHeader>
          <VerificationWebhooks />
        </DialogContent>
      </Dialog>

      {/* Batch Verification Sheet */}
      <Sheet open={isBatchProcessingOpen} onOpenChange={setIsBatchProcessingOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Batch Verification</SheetTitle>
            <SheetDescription>Process multiple verification requests at once</SheetDescription>
          </SheetHeader>
          <BatchVerificationProcessor
            selectedRequests={selectedRequests.map((id) => requests.find((r) => r.id === id)!)}
            onProcess={(action, notes) => {
              handleBatchProcess(action, notes)
            }}
          />
        </SheetContent>
      </Sheet>
    </div>
  )
}
