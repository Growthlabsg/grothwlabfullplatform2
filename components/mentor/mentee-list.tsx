"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Calendar, MoreHorizontal, Clock } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Mentee } from "@/types/mentor"

// Sample data
const MENTEES: Mentee[] = [
  {
    id: "mentee-1",
    name: "Alex Wong",
    avatar: "/placeholder.svg?height=40&width=40",
    company: "FinTech Innovators",
    title: "Co-Founder & CEO",
    industry: "FinTech",
    stage: "Seed",
    goals: ["Fundraising", "Team Building", "Product Strategy"],
    challenges: ["Cash Flow Management", "User Acquisition"],
    sessionsCompleted: 4,
    activeSession: "session-1",
    joinedDate: "2025-02-15",
  },
  {
    id: "mentee-2",
    name: "Sarah Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    company: "EduTech Solutions",
    title: "Founder",
    industry: "EdTech",
    stage: "Pre-seed",
    goals: ["Product-Market Fit", "MVP Development", "Marketing Strategy"],
    challenges: ["Technical Development", "Market Validation"],
    sessionsCompleted: 2,
    activeSession: "session-2",
    joinedDate: "2025-03-10",
  },
  {
    id: "mentee-3",
    name: "Raj Patel",
    avatar: "/placeholder.svg?height=40&width=40",
    company: "HealthAI",
    title: "CTO",
    industry: "HealthTech",
    stage: "Seed",
    goals: ["Technical Architecture", "Team Scaling", "Data Strategy"],
    challenges: ["Regulatory Compliance", "Technical Debt"],
    sessionsCompleted: 3,
    joinedDate: "2025-02-20",
  },
  {
    id: "mentee-4",
    name: "Lisa Tan",
    avatar: "/placeholder.svg?height=40&width=40",
    company: "GreenLogistics",
    title: "Co-Founder & COO",
    industry: "Supply Chain",
    stage: "Pre-seed",
    goals: ["Operations Strategy", "Supply Chain Optimization", "Sustainability Metrics"],
    challenges: ["Scaling Operations", "Partner Management"],
    sessionsCompleted: 1,
    joinedDate: "2025-04-05",
  },
]

export function MenteeList() {
  const [mentees] = useState<Mentee[]>(MENTEES)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Your Mentees</CardTitle>
        <CardDescription>Currently active mentoring relationships</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mentees.map((mentee) => (
            <div key={mentee.id} className="flex items-start gap-4 rounded-lg border p-4">
              <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
                <Image src={mentee.avatar || "/placeholder.svg"} alt={mentee.name} fill className="object-cover" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{mentee.name}</h3>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Schedule Session</DropdownMenuItem>
                      <DropdownMenuItem>Send Message</DropdownMenuItem>
                      <DropdownMenuItem>Share Resources</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <p className="text-sm text-muted-foreground">
                  {mentee.title} at {mentee.company}
                </p>
                <div className="flex flex-wrap gap-1 pt-1">
                  <Badge variant="secondary" className="text-xs">
                    {mentee.industry}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {mentee.stage}
                  </Badge>
                </div>
                <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="mr-1 h-3 w-3" />
                    <span>{mentee.sessionsCompleted} sessions</span>
                  </div>
                  {mentee.activeSession && (
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-3 w-3" />
                      <span>Next: May 15</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-shrink-0">
                <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
