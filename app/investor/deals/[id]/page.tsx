"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Calendar, Download, FileText, MessageCircle, User } from "lucide-react"
import { formatCurrency, formatDate } from "@/utils/format"
import { DealEvaluation } from "@/components/investor/deal-evaluation"
import { Footer } from "@/components/layout/footer"
import type { Deal, DealStage, EvaluationCriteria } from "@/types/investor-dashboard"

// Sample data for the deal
const deal: Deal = {
  id: "deal-1",
  companyName: "FinEdge",
  logo: "/placeholder.svg?height=40&width=40",
  industry: "FinTech",
  stage: "Seed",
  description:
    "FinEdge is a digital payment platform for Southeast Asian SMEs with a focus on cross-border transactions. The platform enables businesses to send and receive payments, manage invoices, and track expenses in multiple currencies with lower fees than traditional banks.",
  askAmount: 1000000,
  location: "Singapore",
  founderName: "Sarah Chen",
  founderEmail: "sarah@finedge.com",
  dateReceived: "2025-04-10",
  dealStage: "due-diligence",
  lastActivity: "Completed technical due diligence",
  nextSteps: "Schedule follow-up meeting with technical team",
  notes:
    "Strong founding team with previous fintech experience. Product has good traction with 150+ SMEs using the platform. Technology stack is solid and scalable.",
  evaluationScores: {
    team: 8,
    product: 7,
    market: 9,
    traction: 6,
    "business-model": 7,
    competition: 6,
    financials: 7,
    valuation: 6,
  },
  documents: [
    {
      name: "FinEdge_Pitch_Deck.pdf",
      url: "#",
      type: "Pitch Deck",
      dateUploaded: "2025-04-10",
    },
    {
      name: "FinEdge_Financial_Projections.xlsx",
      url: "#",
      type: "Financial Projections",
      dateUploaded: "2025-04-10",
    },
    {
      name: "FinEdge_Business_Plan.pdf",
      url: "#",
      type: "Business Plan",
      dateUploaded: "2025-04-12",
    },
    {
      name: "FinEdge_Technical_Architecture.pdf",
      url: "#",
      type: "Technical Documentation",
      dateUploaded: "2025-04-15",
    },
  ],
  meetings: [
    {
      id: "meeting-1",
      date: "2025-04-12",
      time: "10:00 AM - 11:30 AM",
      type: "Initial Screening",
      notes: "Discussed business model, traction, and funding needs. Team has strong domain expertise.",
      attendees: ["John Smith", "Sarah Chen", "Michael Tan"],
      completed: true,
    },
    {
      id: "meeting-2",
      date: "2025-04-18",
      time: "2:00 PM - 3:30 PM",
      type: "Technical Deep Dive",
      notes: "Reviewed technical architecture and scalability plans. Tech stack is solid and well-designed.",
      attendees: ["Amanda Tan", "Sarah Chen", "David Wong"],
      completed: true,
    },
    {
      id: "meeting-3",
      date: "2025-05-10",
      time: "10:00 AM - 11:00 AM",
      type: "Follow-up",
      attendees: ["John Smith", "Sarah Chen", "Michael Lee"],
      completed: false,
    },
  ],
  tags: ["cross-border", "payments", "sme", "b2b", "fintech"],
}

export default function DealDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [dealStage, setDealStage] = useState<DealStage>(deal.dealStage)
  const [notes, setNotes] = useState(deal.notes || "")
  const [nextSteps, setNextSteps] = useState(deal.nextSteps || "")
  const [isSaving, setIsSaving] = useState(false)

  const handleSaveNotes = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
    }, 1000)
  }

  const handleStageChange = (value: string) => {
    setDealStage(value as DealStage)
  }

  const handleEvaluationSave = (evaluationScores: Record<EvaluationCriteria, number>, evaluationNotes: string) => {
    // In a real app, you would save this to your backend
    console.log("Evaluation saved:", { evaluationScores, evaluationNotes })
  }

  const getDealStageLabel = (stage: DealStage): string => {
    switch (stage) {
      case "new":
        return "New"
      case "screening":
        return "Screening"
      case "meeting":
        return "Meeting"
      case "due-diligence":
        return "Due Diligence"
      case "committee":
        return "Investment Committee"
      case "term-sheet":
        return "Term Sheet"
      case "closed":
        return "Closed"
      case "rejected":
        return "Rejected"
      default:
        return stage
    }
  }

  const getDealStageColor = (stage: DealStage): string => {
    switch (stage) {
      case "new":
        return "bg-blue-100 text-blue-800"
      case "screening":
        return "bg-purple-100 text-purple-800"
      case "meeting":
        return "bg-indigo-100 text-indigo-800"
      case "due-diligence":
        return "bg-amber-100 text-amber-800"
      case "committee":
        return "bg-orange-100 text-orange-800"
      case "term-sheet":
        return "bg-green-100 text-green-800"
      case "closed":
        return "bg-emerald-100 text-emerald-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div>
      <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
          <Link href="/investor/dashboard" className="mb-4 inline-flex items-center text-[#0F7377] hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>

          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-md">
                <Image src={deal.logo || "/placeholder.svg"} alt={deal.companyName} fill className="object-contain" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-[#1E293B]">{deal.companyName}</h1>
                <div className="flex flex-wrap items-center gap-2 text-[#334155]">
                  <span>{deal.industry}</span>
                  <span>•</span>
                  <span>{deal.stage}</span>
                  <span>•</span>
                  <span>{deal.location}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Badge className={getDealStageColor(dealStage)}>{getDealStageLabel(dealStage)}</Badge>
              <Badge variant="outline">{formatCurrency(deal.askAmount)}</Badge>
              <Badge variant="outline">{formatDate(deal.dateReceived)}</Badge>
            </div>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-6 w-full justify-start">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="meetings">Meetings</TabsTrigger>
                <TabsTrigger value="evaluation">Evaluation</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Company Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-6 text-[#334155]">{deal.description}</p>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <h3 className="mb-2 font-medium text-[#1E293B]">Company Details</h3>
                        <div className="space-y-1">
                          <p className="text-sm text-[#334155]">
                            <span className="font-medium">Industry:</span> {deal.industry}
                          </p>
                          <p className="text-sm text-[#334155]">
                            <span className="font-medium">Stage:</span> {deal.stage}
                          </p>
                          <p className="text-sm text-[#334155]">
                            <span className="font-medium">Location:</span> {deal.location}
                          </p>
                          <p className="text-sm text-[#334155]">
                            <span className="font-medium">Ask Amount:</span> {formatCurrency(deal.askAmount)}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="mb-2 font-medium text-[#1E293B]">Founder Information</h3>
                        <div className="space-y-1">
                          <p className="text-sm text-[#334155]">
                            <span className="font-medium">Name:</span> {deal.founderName}
                          </p>
                          <p className="text-sm text-[#334155]">
                            <span className="font-medium">Email:</span>{" "}
                            <a href={`mailto:${deal.founderEmail}`} className="text-[#0F7377] hover:underline">
                              {deal.founderEmail}
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>

                    {deal.tags && deal.tags.length > 0 && (
                      <div className="mt-6">
                        <h3 className="mb-2 font-medium text-[#1E293B]">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                          {deal.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {deal.documents && deal.documents.length > 0 ? (
                      <div className="space-y-4">
                        {deal.documents.map((document) => (
                          <div key={document.name} className="flex items-center justify-between rounded-lg border p-4">
                            <div className="flex items-center gap-3">
                              <FileText className="h-5 w-5 text-[#0F7377]" />
                              <div>
                                <p className="font-medium text-[#1E293B]">{document.name}</p>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <span>{document.type}</span>
                                  <span>•</span>
                                  <span>Uploaded on {formatDate(document.dateUploaded)}</span>
                                </div>
                              </div>
                            </div>
                            <Button variant="outline" size="sm" asChild>
                              <a href={document.url} download>
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </a>
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
                        <p className="text-muted-foreground">No documents available</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="meetings" className="mt-0">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Meetings</CardTitle>
                    <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                      Schedule Meeting
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {deal.meetings && deal.meetings.length > 0 ? (
                      <div className="space-y-4">
                        {deal.meetings.map((meeting) => (
                          <div
                            key={meeting.id}
                            className={`rounded-lg border p-4 ${
                              meeting.completed ? "" : "border-[#0F7377] bg-[#0F7377]/5"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium text-[#1E293B]">{meeting.type || "Meeting"}</h3>
                              <Badge variant={meeting.completed ? "outline" : "default"}>
                                {meeting.completed ? "Completed" : "Upcoming"}
                              </Badge>
                            </div>
                            <div className="mt-2 space-y-1">
                              <div className="flex items-center text-sm text-[#334155]">
                                <Calendar className="mr-2 h-4 w-4 text-[#0F7377]" />
                                {formatDate(meeting.date)} • {meeting.time}
                              </div>
                              <div className="flex items-center text-sm text-[#334155]">
                                <User className="mr-2 h-4 w-4 text-[#0F7377]" />
                                Attendees: {meeting.attendees.join(", ")}
                              </div>
                            </div>
                            {meeting.notes && (
                              <div className="mt-3 rounded-md bg-muted p-3">
                                <div className="flex items-center text-sm font-medium text-[#1E293B]">
                                  <MessageCircle className="mr-2 h-4 w-4 text-[#0F7377]" />
                                  Notes
                                </div>
                                <p className="mt-1 text-sm text-[#334155]">{meeting.notes}</p>
                              </div>
                            )}
                            {!meeting.completed && (
                              <div className="mt-3 flex justify-end gap-2">
                                <Button variant="outline" size="sm">
                                  Reschedule
                                </Button>
                                <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                                  Join Meeting
                                </Button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
                        <p className="text-muted-foreground">No meetings scheduled</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="evaluation" className="mt-0">
                <DealEvaluation deal={deal} onSave={handleEvaluationSave} />
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Deal Stage</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={dealStage} onValueChange={handleStageChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select deal stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="screening">Screening</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="due-diligence">Due Diligence</SelectItem>
                    <SelectItem value="committee">Investment Committee</SelectItem>
                    <SelectItem value="term-sheet">Term Sheet</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add your notes here..."
                  rows={5}
                />
                <Button
                  onClick={handleSaveNotes}
                  disabled={isSaving}
                  className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90"
                >
                  {isSaving ? "Saving..." : "Save Notes"}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Next Steps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={nextSteps}
                  onChange={(e) => setNextSteps(e.target.value)}
                  placeholder="Add next steps here..."
                  rows={3}
                />
                <Button
                  onClick={handleSaveNotes}
                  disabled={isSaving}
                  className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90"
                >
                  {isSaving ? "Saving..." : "Save Next Steps"}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">Schedule Meeting</Button>
                <Button variant="outline" className="w-full">
                  Request More Information
                </Button>
                <Button variant="outline" className="w-full">
                  Contact Founder
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
