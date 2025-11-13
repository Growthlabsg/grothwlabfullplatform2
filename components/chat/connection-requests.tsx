"use client"

import { useChat } from "@/contexts/chat-context"
import { format } from "date-fns"
import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ConnectionRequests() {
  const { connectionRequests, respondToConnectionRequest } = useChat()

  // Filter only pending requests
  const pendingRequests = connectionRequests.filter((req) => req.status === "pending")

  // Mock function to get sender details
  const getSenderDetails = (senderId: string) => {
    const mockUsers: Record<string, { name: string; role: string; avatar: string }> = {
      "user-mentor-1": { name: "Sarah Chen", role: "Mentor", avatar: "/placeholder.svg?height=40&width=40" },
      "user-investor-1": { name: "Michael Wong", role: "Investor", avatar: "/placeholder.svg?height=40&width=40" },
      "user-founder-1": { name: "Raj Patel", role: "Founder", avatar: "/placeholder.svg?height=40&width=40" },
      "user-founder-2": { name: "Lisa Tan", role: "Founder", avatar: "/placeholder.svg?height=40&width=40" },
    }

    return mockUsers[senderId] || { name: "Unknown User", role: "", avatar: "/placeholder.svg?height=40&width=40" }
  }

  const getTopicLabel = (topic?: string) => {
    if (!topic) return null

    const topicMap: Record<string, string> = {
      investment_opportunity: "Investment Opportunity",
      seeking_mentorship: "Seeking Mentorship",
      partnership_proposal: "Partnership Proposal",
      general_networking: "General Networking",
      job_opportunity: "Job Opportunity",
      startup_advice: "Startup Advice",
      custom: "Custom Topic",
    }

    return topicMap[topic] || topic
  }

  const handleAccept = async (requestId: string) => {
    try {
      await respondToConnectionRequest(requestId, true)
    } catch (error) {
      console.error("Error accepting connection request:", error)
    }
  }

  const handleReject = async (requestId: string) => {
    try {
      await respondToConnectionRequest(requestId, false)
    } catch (error) {
      console.error("Error rejecting connection request:", error)
    }
  }

  if (pendingRequests.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Connection Requests</CardTitle>
          <CardDescription>You have no pending connection requests.</CardDescription>
        </CardHeader>
        <CardContent className="flex h-32 items-center justify-center text-center">
          <div className="text-sm text-muted-foreground">
            When someone wants to connect with you, their request will appear here.
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connection Requests</CardTitle>
        <CardDescription>
          You have {pendingRequests.length} pending connection {pendingRequests.length === 1 ? "request" : "requests"}.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[300px]">
          {pendingRequests.map((request) => {
            const sender = getSenderDetails(request.senderId)

            return (
              <div key={request.id} className="border-b p-4 last:border-0">
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={sender.avatar || "/placeholder.svg"} alt={sender.name} />
                    <AvatarFallback>
                      {sender.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="mb-1 flex items-center justify-between">
                      <div>
                        <span className="font-medium">{sender.name}</span>
                        <span className="ml-2 text-sm text-muted-foreground">{sender.role}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(request.createdAt || new Date()), "MMM d, yyyy")}
                      </span>
                    </div>

                    {request.topic || "general" && (
                      <Badge variant="outline" className="mb-2">
                        {getTopicLabel(request.topic || "general")}
                        {request.topic || "general" === "custom" && request.customTopic || "" && `: ${request.customTopic || ""}`}
                      </Badge>
                    )}

                    <p className="mb-3 text-sm">{request.message}</p>

                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleReject(request.id)}>
                        <X className="mr-1 h-4 w-4" />
                        Decline
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleAccept(request.id)}
                        className="bg-[#0F7377] hover:bg-[#0F7377]/90"
                      >
                        <Check className="mr-1 h-4 w-4" />
                        Accept
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
