"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle, XCircle, Flag, MessageSquare, FileText, User, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type ContentType = "post" | "comment" | "profile"
type ReportReason = "spam" | "harassment" | "inappropriate" | "misinformation" | "other"

interface Report {
  id: string
  contentId: string
  reporter: {
    id: string
    name: string
    avatar?: string
  }
  timestamp: Date
  reason: ReportReason
  description?: string
}

interface ReportedItem {
  id: string
  type: ContentType
  content: string
  user: {
    id: string
    name: string
    avatar?: string
  }
  timestamp: Date
  reports: Report[]
  status: "pending" | "approved" | "rejected"
}

export function ReportedContent() {
  const [reportedItems, setReportedItems] = useState<ReportedItem[]>([
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
      reports: [
        {
          id: "r1",
          contentId: "1",
          reporter: {
            id: "reporter1",
            name: "Sarah Chen",
            avatar: "/abstract-geometric-shapes.png",
          },
          timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
          reason: "spam",
          description: "This looks like a scam post promoting unrealistic investment returns.",
        },
        {
          id: "r2",
          contentId: "1",
          reporter: {
            id: "reporter2",
            name: "Alex Wong",
          },
          timestamp: new Date(Date.now() - 1000 * 60 * 20), // 20 minutes ago
          reason: "spam",
        },
      ],
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
      reports: [
        {
          id: "r3",
          contentId: "2",
          reporter: {
            id: "reporter3",
            name: "David Kumar",
          },
          timestamp: new Date(Date.now() - 1000 * 60 * 40), // 40 minutes ago
          reason: "harassment",
          description: "This comment is insulting and adds nothing to the discussion.",
        },
      ],
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
      reports: [
        {
          id: "r4",
          contentId: "3",
          reporter: {
            id: "reporter4",
            name: "Michael Wong",
            avatar: "/machine-learning-concept.png",
          },
          timestamp: new Date(Date.now() - 1000 * 60 * 55), // 55 minutes ago
          reason: "inappropriate",
          description: "This post is promoting illegal activities.",
        },
        {
          id: "r5",
          contentId: "3",
          reporter: {
            id: "reporter5",
            name: "Lisa Tan",
          },
          timestamp: new Date(Date.now() - 1000 * 60 * 50), // 50 minutes ago
          reason: "inappropriate",
        },
      ],
      status: "pending",
    },
  ])

  const handleApprove = (id: string) => {
    setReportedItems((prev) => prev.map((item) => (item.id === id ? { ...item, status: "approved" } : item)))
  }

  const handleReject = (id: string) => {
    setReportedItems((prev) => prev.map((item) => (item.id === id ? { ...item, status: "rejected" } : item)))
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMin = Math.floor(diffMs / (1000 * 60))

    if (diffMin < 60) return `${diffMin}m ago`
    if (diffMin < 1440) return `${Math.floor(diffMin / 60)}h ago`
    return `${Math.floor(diffMin / 1440)}d ago`
  }

  const getReportReasonBadge = (reason: ReportReason) => {
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

  const pendingItems = reportedItems.filter((item) => item.status === "pending")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Reported Content</CardTitle>
          <CardDescription>Review content reported by users</CardDescription>
        </CardHeader>
        <CardContent>
          {pendingItems.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-4" />
              <h3 className="text-lg font-medium">All caught up!</h3>
              <p className="text-muted-foreground">There are no reported items to review.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {pendingItems.map((item) => (
                <div key={item.id} className="border rounded-lg overflow-hidden">
                  <div className="bg-muted/50 p-4">
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
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Flag className="h-3 w-3" />
                        {item.reports.length} reports
                      </Badge>
                    </div>
                    <div className="mt-3 p-3 bg-background rounded-md text-sm">{item.content}</div>
                  </div>
                  <div className="p-4">
                    <h4 className="text-sm font-medium mb-2">Reports</h4>
                    <div className="space-y-3">
                      {item.reports.map((report) => (
                        <div key={report.id} className="flex items-start gap-3 p-3 bg-muted/30 rounded-md">
                          <Avatar className="h-6 w-6">
                            <AvatarImage
                              src={report.reporter.avatar || "/placeholder.svg"}
                              alt={report.reporter.name}
                            />
                            <AvatarFallback>{report.reporter.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <div className="text-sm font-medium">{report.reporter.name}</div>
                              <div className="text-xs text-muted-foreground">{formatTime(report.timestamp)}</div>
                            </div>
                            <div className="flex items-center gap-2 mt-1">{getReportReasonBadge(report.reason)}</div>
                            {report.description && (
                              <p className="text-xs mt-1 text-muted-foreground">{report.description}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 bg-muted/30 flex justify-between items-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4 mr-1" />
                          Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuItem>Send warning to user</DropdownMenuItem>
                        <DropdownMenuItem>Restrict user account</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Ban user</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleApprove(item.id)}>
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleReject(item.id)}>
                        <XCircle className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
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
