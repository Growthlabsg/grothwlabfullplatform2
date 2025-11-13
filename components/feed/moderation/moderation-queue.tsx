"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle, XCircle, Flag, MessageSquare, FileText, User } from "lucide-react"

type ContentType = "post" | "comment" | "profile"
type FlagReason = "spam" | "harassment" | "inappropriate" | "misinformation" | "other"

interface ModerationItem {
  id: string
  type: ContentType
  content: string
  user: {
    id: string
    name: string
    avatar?: string
  }
  timestamp: Date
  flagReason: FlagReason
  flagCount: number
  confidence: number
  status: "pending" | "approved" | "rejected"
}

export function ModerationQueue() {
  const [moderationItems, setModerationItems] = useState<ModerationItem[]>([
    {
      id: "1",
      type: "post",
      content:
        "Check out this amazing investment opportunity! Guaranteed 50% returns in just 3 months. DM me for details!",
      user: {
        id: "user1",
        name: "John Smith",
        avatar: "/abstract-geometric-aw.png",
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      flagReason: "spam",
      flagCount: 5,
      confidence: 0.85,
      status: "pending",
    },
    {
      id: "2",
      type: "comment",
      content: "This is completely wrong. You're an idiot and shouldn't be allowed to post here.",
      user: {
        id: "user2",
        name: "Alex Johnson",
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
      flagReason: "harassment",
      flagCount: 3,
      confidence: 0.92,
      status: "pending",
    },
    {
      id: "3",
      type: "post",
      content:
        "I've found a way to bypass the system and get unlimited access to premium features for free. Here's how...",
      user: {
        id: "user3",
        name: "Sarah Lee",
        avatar: "/abstract-geometric-shapes.png",
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      flagReason: "inappropriate",
      flagCount: 4,
      confidence: 0.78,
      status: "pending",
    },
    {
      id: "4",
      type: "profile",
      content: "Bio contains inappropriate content and links to adult websites",
      user: {
        id: "user4",
        name: "Anonymous User",
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 90), // 1.5 hours ago
      flagReason: "inappropriate",
      flagCount: 2,
      confidence: 0.65,
      status: "pending",
    },
    {
      id: "5",
      type: "comment",
      content: "This startup is a scam. They've been investigated for fraud multiple times.",
      user: {
        id: "user5",
        name: "Michael Wong",
        avatar: "/machine-learning-concept.png",
      },
      timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
      flagReason: "misinformation",
      flagCount: 1,
      confidence: 0.45,
      status: "pending",
    },
  ])

  const handleApprove = (id: string) => {
    setModerationItems((prev) => prev.map((item) => (item.id === id ? { ...item, status: "approved" } : item)))
  }

  const handleReject = (id: string) => {
    setModerationItems((prev) => prev.map((item) => (item.id === id ? { ...item, status: "rejected" } : item)))
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMin = Math.floor(diffMs / (1000 * 60))

    if (diffMin < 60) return `${diffMin}m ago`
    if (diffMin < 1440) return `${Math.floor(diffMin / 60)}h ago`
    return `${Math.floor(diffMin / 1440)}d ago`
  }

  const getFlagReasonBadge = (reason: FlagReason) => {
    switch (reason) {
      case "spam":
        return <Badge variant="outline">Spam</Badge>
      case "harassment":
        return <Badge variant="destructive">Harassment</Badge>
      case "inappropriate":
        return <Badge variant="destructive">Inappropriate</Badge>
      case "misinformation":
        return <Badge variant="secondary">Misinformation</Badge>
      case "other":
        return <Badge variant="outline">Other</Badge>
    }
  }

  const getContentTypeIcon = (type: ContentType) => {
    switch (type) {
      case "post":
        return <FileText className="h-4 w-4" />
      case "comment":
        return <MessageSquare className="h-4 w-4" />
      case "profile":
        return <User className="h-4 w-4" />
    }
  }

  const pendingItems = moderationItems.filter((item) => item.status === "pending")

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingItems.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">High Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingItems.filter((item) => item.confidence > 0.8).length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45m</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Moderation Queue</CardTitle>
          <CardDescription>Review and take action on flagged content</CardDescription>
        </CardHeader>
        <CardContent>
          {pendingItems.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-4" />
              <h3 className="text-lg font-medium">All caught up!</h3>
              <p className="text-muted-foreground">There are no items in the moderation queue.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingItems.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-lg p-4 space-y-3"
                  style={{
                    borderLeftWidth: "4px",
                    borderLeftColor:
                      item.confidence > 0.8
                        ? "var(--destructive)"
                        : item.confidence > 0.6
                          ? "var(--warning)"
                          : "var(--border)",
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={item.user.avatar || "/placeholder.svg"} alt={item.user.name} />
                        <AvatarFallback>{item.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{item.user.name}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          {getContentTypeIcon(item.type)}
                          <span className="capitalize">{item.type}</span> • {formatTime(item.timestamp)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getFlagReasonBadge(item.flagReason)}
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Flag className="h-3 w-3" />
                        {item.flagCount}
                      </Badge>
                      <Badge
                        variant={
                          item.confidence > 0.8 ? "destructive" : item.confidence > 0.6 ? "secondary" : "outline"
                        }
                      >
                        {Math.round(item.confidence * 100)}% confidence
                      </Badge>
                    </div>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-md text-sm">{item.content}</div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleApprove(item.id)}>
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleReject(item.id)}>
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
