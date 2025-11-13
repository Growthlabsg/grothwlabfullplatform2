"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Video, Users, MessageSquare } from "lucide-react"
import type { MentorSession } from "@/types/mentor"

// Sample data
const SESSIONS: MentorSession[] = [
  {
    id: "session-1",
    menteeId: "mentee-1",
    menteeName: "Alex Wong",
    menteeAvatar: "/placeholder.svg?height=40&width=40",
    menteeCompany: "FinTech Innovators",
    status: "scheduled",
    type: "one-on-one",
    topic: "Fundraising Strategy",
    description: "Discuss fundraising strategy for Series A round",
    date: "2025-05-15",
    time: "14:00",
    duration: 60,
    goals: ["Refine pitch deck", "Identify potential investors", "Create fundraising timeline"],
  },
  {
    id: "session-2",
    menteeId: "mentee-2",
    menteeName: "Sarah Chen",
    menteeAvatar: "/placeholder.svg?height=40&width=40",
    menteeCompany: "EduTech Solutions",
    status: "scheduled",
    type: "one-on-one",
    topic: "Product-Market Fit",
    description: "Evaluate current product-market fit and discuss strategies to improve it",
    date: "2025-05-17",
    time: "10:00",
    duration: 45,
    goals: ["Review user feedback", "Identify core value proposition", "Define target market segments"],
  },
  {
    id: "session-3",
    menteeId: "mentee-3",
    menteeName: "Startup Founders Group",
    menteeAvatar: "/placeholder.svg?height=40&width=40",
    status: "scheduled",
    type: "group",
    topic: "Go-to-Market Strategies",
    description: "Group session on GTM strategies for early-stage startups",
    date: "2025-05-20",
    time: "16:00",
    duration: 90,
    goals: ["Discuss various GTM approaches", "Share success stories", "Address common challenges"],
  },
]

export function UpcomingSessions() {
  const [sessions] = useState<MentorSession[]>(SESSIONS)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Upcoming Sessions</CardTitle>
        <CardDescription>Your scheduled mentoring sessions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sessions.map((session) => (
            <Card key={session.id} className="overflow-hidden">
              <div className="border-l-4 border-[#0F7377] p-4">
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">{session.topic}</h3>
                    <p className="text-sm text-muted-foreground">with {session.menteeName}</p>
                  </div>
                  <Badge variant="outline" className="bg-blue-50">
                    {session.type === "one-on-one" ? (
                      <div className="flex items-center">
                        <MessageSquare className="mr-1 h-3 w-3" />
                        <span>1:1</span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Users className="mr-1 h-3 w-3" />
                        <span>Group</span>
                      </div>
                    )}
                  </Badge>
                </div>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="mr-1 h-4 w-4" />
                    <span>{format(new Date(session.date), "MMM d, yyyy")}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="mr-1 h-4 w-4" />
                    <span>
                      {session.time} ({session.duration} min)
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                    <Video className="mr-2 h-4 w-4" />
                    Join Meeting
                  </Button>
                  <Button size="sm" variant="outline">
                    Reschedule
                  </Button>
                </div>
              </div>
            </Card>
          ))}
          <div className="text-center">
            <Button variant="link" className="text-[#0F7377]">
              View All Sessions
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
