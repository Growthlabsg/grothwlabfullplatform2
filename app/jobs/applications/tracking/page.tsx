"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  ChevronLeft,
  MapPin,
  Clock,
  Calendar,
  CheckCircle2,
  XCircle,
  AlertCircle,
  FileText,
  MessageSquare,
  Search,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

// Mock data for application tracking
const mockApplications = [
  {
    id: "app1",
    jobTitle: "Senior Full Stack Developer",
    company: "TechNova Solutions",
    companyLogo: "/Tennessee_Landscape.png",
    location: "Singapore",
    jobType: "Full-time",
    appliedDate: "2023-06-15T08:00:00Z",
    status: "interviewing",
    statusHistory: [
      { status: "applied", date: "2023-06-15T08:00:00Z" },
      { status: "reviewed", date: "2023-06-17T10:30:00Z" },
      { status: "interviewing", date: "2023-06-20T14:00:00Z" },
    ],
    interviews: [
      {
        type: "Technical Interview",
        date: "2023-06-25T10:00:00Z",
        duration: 60,
        location: "Video Call",
        interviewers: ["John Smith (CTO)", "Sarah Lee (Senior Developer)"],
        notes: "Prepare to discuss system design and coding challenges.",
      },
    ],
    notes: "Great company culture. The role involves working with React, Node.js, and AWS.",
  },
  {
    id: "app2",
    jobTitle: "Product Manager",
    company: "InnovateSG",
    companyLogo: "/abstract-geometric-shapes.png",
    location: "Singapore",
    jobType: "Full-time",
    appliedDate: "2023-06-10T14:20:00Z",
    status: "offered",
    statusHistory: [
      { status: "applied", date: "2023-06-10T14:20:00Z" },
      { status: "reviewed", date: "2023-06-12T09:15:00Z" },
      { status: "interviewing", date: "2023-06-15T11:00:00Z" },
      { status: "offered", date: "2023-06-22T16:30:00Z" },
    ],
    interviews: [
      {
        type: "Initial Screening",
        date: "2023-06-15T11:00:00Z",
        duration: 30,
        location: "Phone Call",
        interviewers: ["HR Representative"],
        notes: "Basic screening about experience and expectations.",
      },
      {
        type: "Panel Interview",
        date: "2023-06-18T14:00:00Z",
        duration: 90,
        location: "InnovateSG Office",
        interviewers: ["CEO", "Head of Product", "UX Lead"],
        notes: "Prepare to discuss previous product launches and methodologies.",
      },
    ],
    notes: "Offer received: $120,000 annual salary with 15 days PTO and health benefits.",
  },
  {
    id: "app3",
    jobTitle: "UX Designer",
    company: "DesignHub Asia",
    companyLogo: "/intertwined-letters.png",
    location: "Remote",
    jobType: "Contract",
    appliedDate: "2023-06-05T11:45:00Z",
    status: "rejected",
    statusHistory: [
      { status: "applied", date: "2023-06-05T11:45:00Z" },
      { status: "reviewed", date: "2023-06-08T13:20:00Z" },
      { status: "rejected", date: "2023-06-12T15:45:00Z" },
    ],
    interviews: [],
    notes: "Received feedback that they were looking for someone with more experience in mobile app design.",
  },
  {
    id: "app4",
    jobTitle: "Data Scientist",
    company: "AnalyticsPro",
    companyLogo: "/abstract-purple-swirl.png",
    location: "Hybrid",
    jobType: "Full-time",
    appliedDate: "2023-06-01T09:30:00Z",
    status: "applied",
    statusHistory: [{ status: "applied", date: "2023-06-01T09:30:00Z" }],
    interviews: [],
    notes: "Position requires expertise in Python, R, and machine learning frameworks.",
  },
  {
    id: "app5",
    jobTitle: "Marketing Manager",
    company: "GrowthGenius",
    companyLogo: "/intertwined-grasses.png",
    location: "Singapore",
    jobType: "Full-time",
    appliedDate: "2023-05-28T13:10:00Z",
    status: "reviewed",
    statusHistory: [
      { status: "applied", date: "2023-05-28T13:10:00Z" },
      { status: "reviewed", date: "2023-06-02T10:15:00Z" },
    ],
    interviews: [],
    notes: "Looking for someone to lead digital marketing initiatives for SaaS products.",
  },
]

export default function ApplicationTrackingPage() {
  const [applications, setApplications] = useState(mockApplications)
  const [selectedApplication, setSelectedApplication] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.company.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || app.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "applied":
        return (
          <Badge variant="outline" className="capitalize">
            Applied
          </Badge>
        )
      case "reviewed":
        return (
          <Badge variant="secondary" className="capitalize">
            Reviewed
          </Badge>
        )
      case "interviewing":
        return <Badge className="bg-blue-500 capitalize">Interviewing</Badge>
      case "offered":
        return <Badge className="bg-green-500 capitalize">Offered</Badge>
      case "rejected":
        return (
          <Badge variant="destructive" className="capitalize">
            Rejected
          </Badge>
        )
      case "accepted":
        return <Badge className="bg-[#0F7377] capitalize">Accepted</Badge>
      case "declined":
        return (
          <Badge variant="outline" className="capitalize">
            Declined
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="capitalize">
            {status}
          </Badge>
        )
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "applied":
        return <Clock className="h-4 w-4 text-muted-foreground" />
      case "reviewed":
        return <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
      case "interviewing":
        return <MessageSquare className="h-4 w-4 text-blue-500" />
      case "offered":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-destructive" />
      case "accepted":
        return <CheckCircle2 className="h-4 w-4 text-[#0F7377]" />
      case "declined":
        return <XCircle className="h-4 w-4 text-muted-foreground" />
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
  }

  const getApplicationProgress = (app: (typeof applications)[0]) => {
    const stages = ["applied", "reviewed", "interviewing", "offered", "accepted"]
    const currentIndex = stages.indexOf(app.status)
    if (currentIndex === -1 || app.status === "rejected" || app.status === "declined") {
      return 0
    }
    return ((currentIndex + 1) / stages.length) * 100
  }

  const selectedApp = applications.find((app) => app.id === selectedApplication)

  return (
          <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8">
          <Link href="/jobs" className="flex items-center text-[#0F7377] hover:underline mb-4">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Jobs
          </Link>
          <h1 className="text-3xl font-bold mb-4">Application Tracking</h1>
          <p className="text-[#334155] max-w-3xl">
            Track the status of your job applications, manage interviews, and keep notes on your job search progress.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="sticky top-24 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Filter Applications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search jobs or companies..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="status-filter">Status</Label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger id="status-filter">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="applied">Applied</SelectItem>
                        <SelectItem value="reviewed">Reviewed</SelectItem>
                        <SelectItem value="interviewing">Interviewing</SelectItem>
                        <SelectItem value="offered">Offered</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                        <SelectItem value="accepted">Accepted</SelectItem>
                        <SelectItem value="declined">Declined</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-2">
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/jobs/find-startup-jobs">Browse More Jobs</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Application Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Total Applications</span>
                        <span className="text-sm font-medium">{applications.length}</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">In Progress</span>
                        <span className="text-sm font-medium">
                          {
                            applications.filter((app) => ["applied", "reviewed", "interviewing"].includes(app.status))
                              .length
                          }
                        </span>
                      </div>
                      <Progress
                        value={
                          (applications.filter((app) => ["applied", "reviewed", "interviewing"].includes(app.status))
                            .length /
                            applications.length) *
                          100
                        }
                        className="h-2"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Interviews</span>
                        <span className="text-sm font-medium">
                          {applications.filter((app) => app.status === "interviewing").length}
                        </span>
                      </div>
                      <Progress
                        value={
                          (applications.filter((app) => app.status === "interviewing").length / applications.length) *
                          100
                        }
                        className="h-2 bg-blue-100"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Offers</span>
                        <span className="text-sm font-medium">
                          {
                            applications.filter((app) => ["offered", "accepted", "declined"].includes(app.status))
                              .length
                          }
                        </span>
                      </div>
                      <Progress
                        value={
                          (applications.filter((app) => ["offered", "accepted", "declined"].includes(app.status))
                            .length /
                            applications.length) *
                          100
                        }
                        className="h-2 bg-green-100"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Rejected</span>
                        <span className="text-sm font-medium">
                          {applications.filter((app) => app.status === "rejected").length}
                        </span>
                      </div>
                      <Progress
                        value={
                          (applications.filter((app) => app.status === "rejected").length / applications.length) * 100
                        }
                        className="h-2 bg-red-100"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="md:col-span-2">
            <Tabs defaultValue="applications">
              <TabsList className="mb-6">
                <TabsTrigger value="applications">Applications</TabsTrigger>
                <TabsTrigger value="interviews">Upcoming Interviews</TabsTrigger>
              </TabsList>

              <TabsContent value="applications">
                {filteredApplications.length > 0 ? (
                  <div className="space-y-4">
                    {filteredApplications.map((app) => (
                      <Card
                        key={app.id}
                        className={`transition-all hover:shadow-md ${selectedApplication === app.id ? "ring-2 ring-[#0F7377]" : ""}`}
                        onClick={() => setSelectedApplication(app.id === selectedApplication ? null : app.id)}
                      >
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                              <div className="flex items-start gap-4">
                                <div className="h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden">
                                  <img
                                    src={app.companyLogo || "/placeholder.svg"}
                                    alt={app.company}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <div>
                                  <h3 className="font-medium">{app.jobTitle}</h3>
                                  <p className="text-sm text-[#334155]">{app.company}</p>
                                  <div className="flex flex-wrap gap-3 mt-1">
                                    <div className="flex items-center text-xs text-[#334155]">
                                      <MapPin className="h-3 w-3 mr-1" />
                                      {app.location}
                                    </div>
                                    <div className="flex items-center text-xs text-[#334155]">
                                      <Clock className="h-3 w-3 mr-1" />
                                      {app.jobType}
                                    </div>
                                    <div className="flex items-center text-xs text-[#334155]">
                                      <Calendar className="h-3 w-3 mr-1" />
                                      Applied {formatDate(app.appliedDate)}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="mt-4">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    {getStatusIcon(app.status)}
                                    <span className="text-sm font-medium">Status: {getStatusBadge(app.status)}</span>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setSelectedApplication(app.id === selectedApplication ? null : app.id)
                                    }}
                                  >
                                    {selectedApplication === app.id ? "Hide Details" : "View Details"}
                                  </Button>
                                </div>
                                <Progress value={getApplicationProgress(app)} className="h-2" />
                              </div>
                            </div>
                          </div>

                          {selectedApplication === app.id && (
                            <div className="mt-6 pt-6 border-t">
                              <div className="space-y-6">
                                <div>
                                  <h4 className="text-sm font-medium mb-2">Application Timeline</h4>
                                  <div className="space-y-3">
                                    {app.statusHistory.map((history, index) => (
                                      <div key={index} className="flex items-start gap-3">
                                        <div className="mt-0.5">{getStatusIcon(history.status)}</div>
                                        <div>
                                          <p className="text-sm font-medium capitalize">{history.status}</p>
                                          <p className="text-xs text-[#334155]">
                                            {formatDate(history.date)} at {formatTime(history.date)}
                                          </p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {app.interviews.length > 0 && (
                                  <div>
                                    <h4 className="text-sm font-medium mb-2">Scheduled Interviews</h4>
                                    <div className="space-y-3">
                                      {app.interviews.map((interview, index) => (
                                        <div key={index} className="bg-muted p-3 rounded-md">
                                          <div className="flex justify-between mb-1">
                                            <p className="text-sm font-medium">{interview.type}</p>
                                            <Badge variant="outline" className="text-xs">
                                              {interview.duration} min
                                            </Badge>
                                          </div>
                                          <p className="text-xs text-[#334155] mb-1">
                                            <Calendar className="h-3 w-3 inline mr-1" />
                                            {formatDate(interview.date)} at {formatTime(interview.date)}
                                          </p>
                                          <p className="text-xs text-[#334155] mb-1">
                                            <MapPin className="h-3 w-3 inline mr-1" />
                                            {interview.location}
                                          </p>
                                          <p className="text-xs text-[#334155] mb-1">
                                            <MessageSquare className="h-3 w-3 inline mr-1" />
                                            With: {interview.interviewers.join(", ")}
                                          </p>
                                          {interview.notes && (
                                            <p className="text-xs mt-2 pt-2 border-t border-muted-foreground/20">
                                              <FileText className="h-3 w-3 inline mr-1" />
                                              Notes: {interview.notes}
                                            </p>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {app.notes && (
                                  <div>
                                    <h4 className="text-sm font-medium mb-2">Notes</h4>
                                    <p className="text-sm text-[#334155] bg-muted p-3 rounded-md">{app.notes}</p>
                                  </div>
                                )}

                                <div className="flex justify-end gap-2">
                                  <Button variant="outline" size="sm" asChild>
                                    <Link href={`/jobs/applications/${app.id}`}>Edit Application</Link>
                                  </Button>
                                  <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90" asChild>
                                    <Link href={`/jobs/applications/${app.id}/notes`}>Add Notes</Link>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Applications Found</h3>
                      <p className="text-[#334155] mb-4">
                        {searchQuery || statusFilter !== "all"
                          ? "No applications match your current filters. Try adjusting your search criteria."
                          : "You haven't applied to any jobs yet. Start browsing jobs to begin your application process."}
                      </p>
                      <Button className="bg-[#0F7377] hover:bg-[#0F7377]/90" asChild>
                        <Link href="/jobs/find-startup-jobs">Browse Jobs</Link>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="interviews">
                {applications.some((app) => app.interviews.length > 0) ? (
                  <div className="space-y-4">
                    {applications
                      .filter((app) => app.interviews.length > 0)
                      .map((app) => (
                        <Card key={app.id}>
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4 mb-4">
                              <div className="h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden">
                                <img
                                  src={app.companyLogo || "/placeholder.svg"}
                                  alt={app.company}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div>
                                <h3 className="font-medium">{app.jobTitle}</h3>
                                <p className="text-sm text-[#334155]">{app.company}</p>
                              </div>
                            </div>

                            <div className="space-y-3">
                              {app.interviews.map((interview, index) => (
                                <div key={index} className="bg-muted p-3 rounded-md">
                                  <div className="flex justify-between mb-1">
                                    <p className="text-sm font-medium">{interview.type}</p>
                                    <Badge variant="outline" className="text-xs">
                                      {interview.duration} min
                                    </Badge>
                                  </div>
                                  <p className="text-xs text-[#334155] mb-1">
                                    <Calendar className="h-3 w-3 inline mr-1" />
                                    {formatDate(interview.date)} at {formatTime(interview.date)}
                                  </p>
                                  <p className="text-xs text-[#334155] mb-1">
                                    <MapPin className="h-3 w-3 inline mr-1" />
                                    {interview.location}
                                  </p>
                                  <p className="text-xs text-[#334155] mb-1">
                                    <MessageSquare className="h-3 w-3 inline mr-1" />
                                    With: {interview.interviewers.join(", ")}
                                  </p>
                                  {interview.notes && (
                                    <p className="text-xs mt-2 pt-2 border-t border-muted-foreground/20">
                                      <FileText className="h-3 w-3 inline mr-1" />
                                      Notes: {interview.notes}
                                    </p>
                                  )}
                                </div>
                              ))}
                            </div>

                            <div className="flex justify-end gap-2 mt-4">
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/jobs/applications/${app.id}`}>View Application</Link>
                              </Button>
                              <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90" asChild>
                                <Link href={`/jobs/applications/${app.id}/prepare`}>Prepare for Interview</Link>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Upcoming Interviews</h3>
                      <p className="text-[#334155] mb-4">
                        You don't have any scheduled interviews at the moment. Keep applying to jobs to secure
                        interviews.
                      </p>
                      <Button className="bg-[#0F7377] hover:bg-[#0F7377]/90" asChild>
                        <Link href="/jobs/find-startup-jobs">Browse Jobs</Link>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    )
}
