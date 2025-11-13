"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Download, MoreHorizontal, CheckCircle, XCircle, AlertCircle, Clock, FileText, Eye } from "lucide-react"

// Define verification status types
type VerificationStatus = "pending" | "approved" | "rejected" | "additional_info"

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
  },
]

export function VerificationDashboard() {
  const [requests, setRequests] = useState<VerificationRequest[]>(sampleVerificationRequests)
  const [filteredRequests, setFilteredRequests] = useState<VerificationRequest[]>(sampleVerificationRequests)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedRequest, setSelectedRequest] = useState<VerificationRequest | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)
  const [reviewNotes, setReviewNotes] = useState("")
  const [reviewAction, setReviewAction] = useState<"approve" | "reject" | "request_info" | null>(null)

  // Handle search and filtering
  const handleSearch = (term: string) => {
    setSearchTerm(term)
    filterRequests(term, statusFilter)
  }

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status)
    filterRequests(searchTerm, status)
  }

  const filterRequests = (term: string, status: string) => {
    let filtered = [...requests]

    // Apply search term filter
    if (term) {
      filtered = filtered.filter(
        (request) =>
          request.companyName.toLowerCase().includes(term.toLowerCase()) ||
          request.id.toLowerCase().includes(term.toLowerCase()) ||
          request.industry.toLowerCase().includes(term.toLowerCase()) ||
          request.foundingTeam.some((member) => member.toLowerCase().includes(term.toLowerCase())),
      )
    }

    // Apply status filter
    if (status !== "all") {
      filtered = filtered.filter((request) => request.status === status)
    }

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

    const updatedRequests = requests.map((request) => {
      if (request.id === selectedRequest.id) {
        return {
          ...request,
          status: reviewAction === "approve" ? "approved" : reviewAction === "reject" ? "rejected" : "additional_info",
          notes: reviewNotes,
          reviewedBy: "Admin User",
          reviewedAt: new Date().toISOString().split("T")[0],
        }
      }
      return request
    })

    setRequests(updatedRequests)
    filterRequests(searchTerm, statusFilter)
    setIsReviewDialogOpen(false)
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
      default:
        return <Badge>{status}</Badge>
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Startup Verification</h2>
          <p className="text-muted-foreground">Manage and review verification requests from startups</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button className="w-full sm:w-auto">Verification Settings</Button>
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
          </TabsList>
          <div className="flex items-center mt-2 sm:mt-0">
            <Search className="h-4 w-4 text-muted-foreground mr-2" />
            <Input
              placeholder="Search requests..."
              className="w-full sm:w-64"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Date Submitted</TableHead>
                    <TableHead>Founders</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center h-24">
                        No verification requests found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredRequests.map((request) => (
                      <TableRow key={request.id}>
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
    </div>
  )
}
