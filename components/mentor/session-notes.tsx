"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Search, File, Clock } from "lucide-react"
import type { MentorSession } from "@/types/mentor"

// Sample data
const PAST_SESSIONS: MentorSession[] = [
  {
    id: "past-1",
    menteeId: "mentee-1",
    menteeName: "Alex Wong",
    menteeAvatar: "/placeholder.svg?height=40&width=40",
    menteeCompany: "FinTech Innovators",
    status: "completed",
    type: "one-on-one",
    topic: "Fundraising Strategy",
    description: "Discuss fundraising strategy for Series A round",
    date: "2025-04-30",
    time: "14:00",
    duration: 60,
    notes:
      "Alex has made good progress on his pitch deck. Suggested focusing more on market size and competitive advantage. Discussed potential investors in the fintech space.",
    feedback: {
      rating: 5,
      comments: "Very helpful session! Got great advice on my pitch deck and investor targeting.",
    },
  },
  {
    id: "past-2",
    menteeId: "mentee-2",
    menteeName: "Sarah Chen",
    menteeAvatar: "/placeholder.svg?height=40&width=40",
    menteeCompany: "EduTech Solutions",
    status: "completed",
    type: "one-on-one",
    topic: "Product-Market Fit",
    description: "Evaluate current product-market fit and discuss strategies to improve it",
    date: "2025-04-25",
    time: "10:00",
    duration: 45,
    notes:
      "Sarah is struggling to find PMF. Reviewed her user feedback and suggested focusing on the core problem her product solves. Recommended running more structured user interviews.",
    feedback: {
      rating: 4,
      comments: "Got some great insights on how to approach my user research more effectively.",
    },
  },
  {
    id: "past-3",
    menteeId: "mentee-3",
    menteeName: "Raj Patel",
    menteeAvatar: "/placeholder.svg?height=40&width=40",
    menteeCompany: "HealthAI",
    status: "completed",
    type: "one-on-one",
    topic: "Technical Architecture",
    description: "Review system architecture and scaling plans",
    date: "2025-04-22",
    time: "15:00",
    duration: 60,
    notes:
      "Reviewed Raj's architecture plans. Suggested implementing a microservices approach for better scalability. Discussed data security concerns in the healthcare space.",
    feedback: {
      rating: 5,
      comments: "Extremely valuable advice on our architecture decisions. Will implement the suggestions right away.",
    },
  },
]

export function SessionNotes() {
  const [sessions] = useState<MentorSession[]>(PAST_SESSIONS)
  const [selectedSession, setSelectedSession] = useState<MentorSession | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")

  const filteredSessions = sessions.filter((session) => {
    const matchesSearch =
      session.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.menteeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (session.notes && session.notes.toLowerCase().includes(searchTerm.toLowerCase()))

    if (filter === "all") return matchesSearch
    if (filter === "high-rated") return matchesSearch && session.feedback && session.feedback.rating >= 4
    return matchesSearch
  })

  const handleSessionSelect = (session: MentorSession) => {
    setSelectedSession(session)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Session Notes</CardTitle>
        <CardDescription>Review notes from previous mentoring sessions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="w-full md:w-1/3">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search sessions..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sessions</SelectItem>
                    <SelectItem value="high-rated">High Rated</SelectItem>
                    <SelectItem value="flagged">Flagged</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                {filteredSessions.map((session) => (
                  <div
                    key={session.id}
                    className={`rounded-md border p-3 cursor-pointer transition-colors hover:bg-muted ${
                      selectedSession?.id === session.id ? "border-[#0F7377] bg-[#0F7377]/5" : ""
                    }`}
                    onClick={() => handleSessionSelect(session)}
                  >
                    <div className="flex justify-between">
                      <h4 className="font-medium">{session.topic}</h4>
                      {session.feedback && (
                        <div className="flex items-center">
                          <span className="text-yellow-500">★</span>
                          <span className="text-sm">{session.feedback.rating}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">with {session.menteeName}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{new Date(session.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full md:w-2/3 border-l pl-4">
            {selectedSession ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold">{selectedSession.topic}</h3>
                  <p className="text-muted-foreground">
                    Session with {selectedSession.menteeName} on {new Date(selectedSession.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Session Notes</Label>
                  <Textarea value={selectedSession.notes || ""} className="min-h-[150px]" readOnly />
                </div>
                {selectedSession.feedback && (
                  <div className="space-y-2">
                    <Label>Feedback from Mentee</Label>
                    <div className="rounded-md border p-3 bg-muted/50">
                      <div className="flex items-center mb-2">
                        <span className="text-sm font-medium mr-2">Rating:</span>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span
                              key={i}
                              className={i < selectedSession.feedback!.rating ? "text-yellow-500" : "text-gray-300"}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm">{selectedSession.feedback.comments}</p>
                    </div>
                  </div>
                )}
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    <File className="mr-2 h-4 w-4" />
                    Export Notes
                  </Button>
                  <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                    Edit Notes
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center text-center p-8">
                <div>
                  <p className="text-muted-foreground mb-2">Select a session to view notes</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
