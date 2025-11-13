"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Flag,
  Search,
  Filter,
  BarChart2,
  Users,
  FileText,
  Calendar,
  ArrowUpDown,
  ThumbsDown,
  Ban,
  AlertOctagon,
  Shield,
  Eye,
  UserPlus,
  Download,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"

// Mock data for reported content
const REPORTED_CONTENT = [
  {
    id: 1,
    type: "post",
    content: "Check out this amazing investment opportunity! 1000% returns guaranteed in just 30 days!",
    author: {
      name: "John Smith",
      avatar: "/thoughtful-man-profile.png",
      verified: false,
    },
    reportCount: 12,
    reportReason: "spam",
    status: "pending",
    reportedAt: "2023-10-15T14:30:00Z",
  },
  {
    id: 2,
    type: "comment",
    content: "This is completely useless advice. You clearly have no idea what you're talking about.",
    author: {
      name: "Alice Johnson",
      avatar: "/serene-woman-gaze.png",
      verified: true,
    },
    reportCount: 5,
    reportReason: "harassment",
    status: "pending",
    reportedAt: "2023-10-14T09:15:00Z",
  },
  {
    id: 3,
    type: "post",
    content: "Looking for partners for my new crypto project. Send me your wallet details to participate!",
    author: {
      name: "Robert Davis",
      avatar: "/confident-executive.png",
      verified: false,
    },
    reportCount: 18,
    reportReason: "scam",
    status: "removed",
    reportedAt: "2023-10-13T16:45:00Z",
  },
  {
    id: 4,
    type: "profile",
    content: "Profile reported for impersonation",
    author: {
      name: "Elon Musk (Fake)",
      avatar: "/cool-city-dweller.png",
      verified: false,
    },
    reportCount: 24,
    reportReason: "impersonation",
    status: "banned",
    reportedAt: "2023-10-12T11:20:00Z",
  },
]

// Mock data for moderation actions
const MODERATION_LOGS = [
  {
    id: 1,
    action: "content_removed",
    contentType: "post",
    moderator: "Admin User",
    reason: "Violated community guidelines - Spam",
    timestamp: "2023-10-15T15:30:00Z",
  },
  {
    id: 2,
    action: "user_warned",
    contentType: "comment",
    moderator: "Moderator Team",
    reason: "Harassment - First warning",
    timestamp: "2023-10-14T10:15:00Z",
  },
  {
    id: 3,
    action: "user_banned",
    contentType: "profile",
    moderator: "System",
    reason: "Impersonation - Automatic ban",
    timestamp: "2023-10-12T12:20:00Z",
  },
  {
    id: 4,
    action: "content_approved",
    contentType: "post",
    moderator: "Senior Moderator",
    reason: "Reviewed and approved - False report",
    timestamp: "2023-10-11T09:45:00Z",
  },
]

// Mock data for content overview
const CONTENT_OVERVIEW = {
  totalReported: 87,
  pendingReview: 32,
  removedContent: 41,
  falseReports: 14,
  reportsByType: {
    spam: 28,
    harassment: 19,
    scam: 15,
    impersonation: 12,
    inappropriate: 8,
    other: 5,
  },
  contentByType: {
    posts: 45,
    comments: 23,
    profiles: 12,
    messages: 7,
  },
}

// Mock data for moderation team
const MODERATION_TEAM = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@growthlab.com",
    role: "Admin",
    avatar: "/thoughtful-man-profile.png",
    actionsToday: 24,
    lastActive: "2023-10-15T15:30:00Z",
  },
  {
    id: 2,
    name: "Moderator Team",
    email: "mod@growthlab.com",
    role: "Moderator",
    avatar: "/serene-woman-gaze.png",
    actionsToday: 18,
    lastActive: "2023-10-15T14:45:00Z",
  },
  {
    id: 3,
    name: "Senior Moderator",
    email: "senior@growthlab.com",
    role: "Senior Moderator",
    avatar: "/confident-executive.png",
    actionsToday: 32,
    lastActive: "2023-10-15T16:10:00Z",
  },
]

export function EnhancedModerationDashboard() {
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredContent = REPORTED_CONTENT.filter((item) => {
    const matchesSearch =
      item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === "all" || item.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> Pending Review
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" /> Approved
          </Badge>
        )
      case "removed":
        return (
          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 flex items-center gap-1">
            <XCircle className="h-3 w-3" /> Removed
          </Badge>
        )
      case "banned":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1">
            <Ban className="h-3 w-3" /> User Banned
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getReasonBadge = (reason: string) => {
    switch (reason) {
      case "spam":
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <AlertOctagon className="h-3 w-3" /> Spam
          </Badge>
        )
      case "harassment":
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <ThumbsDown className="h-3 w-3" /> Harassment
          </Badge>
        )
      case "scam":
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" /> Scam
          </Badge>
        )
      case "impersonation":
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <Shield className="h-3 w-3" /> Impersonation
          </Badge>
        )
      default:
        return <Badge variant="secondary">{reason}</Badge>
    }
  }

  return (
    <Tabs defaultValue="reported">
      <TabsList className="grid grid-cols-4 mb-6">
        <TabsTrigger value="reported" className="flex items-center gap-1">
          <Flag className="h-4 w-4" />
          Reported Content
        </TabsTrigger>
        <TabsTrigger value="overview" className="flex items-center gap-1">
          <BarChart2 className="h-4 w-4" />
          Overview
        </TabsTrigger>
        <TabsTrigger value="logs" className="flex items-center gap-1">
          <FileText className="h-4 w-4" />
          Moderation Logs
        </TabsTrigger>
        <TabsTrigger value="settings" className="flex items-center gap-1">
          <Users className="h-4 w-4" />
          Team & Settings
        </TabsTrigger>
      </TabsList>

      <TabsContent value="reported">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reported content"
                className="pl-8 w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="removed">Removed</SelectItem>
                <SelectItem value="banned">User Banned</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Last 7 days
            </Button>
            <Button variant="outline" className="flex items-center gap-1">
              <ArrowUpDown className="h-4 w-4" />
              Sort
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredContent.length > 0 ? (
            filteredContent.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarImage src={item.author.avatar || "/placeholder.svg"} alt={item.author.name} />
                        <AvatarFallback>{item.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{item.author.name}</span>
                          {item.author.verified && (
                            <Badge variant="outline" className="text-xs px-1 py-0 h-5 bg-primary/10 text-primary">
                              Verified
                            </Badge>
                          )}
                          <Badge variant="outline" className="text-xs px-1 py-0 h-5">
                            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Reported {new Date(item.reportedAt).toLocaleDateString()} • {item.reportCount} reports
                        </div>
                        <div className="mt-2">{item.content}</div>
                        <div className="flex items-center gap-2 mt-2">
                          {getStatusBadge(item.status)}
                          {getReasonBadge(item.reportReason)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <CheckCircle className="h-4 w-4" />
                        Approve
                      </Button>
                      <Button variant="destructive" size="sm" className="flex items-center gap-1">
                        <XCircle className="h-4 w-4" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Flag className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No reported content found</h3>
                <p className="text-muted-foreground text-center">
                  {searchQuery ? "Try a different search term or filter" : "All reported content will appear here"}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </TabsContent>

      <TabsContent value="overview">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col items-center">
                <div className="text-4xl font-bold">{CONTENT_OVERVIEW.totalReported}</div>
                <div className="text-sm text-muted-foreground">Total Reported Content</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col items-center">
                <div className="text-4xl font-bold text-amber-500">{CONTENT_OVERVIEW.pendingReview}</div>
                <div className="text-sm text-muted-foreground">Pending Review</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col items-center">
                <div className="text-4xl font-bold text-red-500">{CONTENT_OVERVIEW.removedContent}</div>
                <div className="text-sm text-muted-foreground">Removed Content</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col items-center">
                <div className="text-4xl font-bold text-green-500">{CONTENT_OVERVIEW.falseReports}</div>
                <div className="text-sm text-muted-foreground">False Reports</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Reports by Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(CONTENT_OVERVIEW.reportsByType).map(([type, count]) => (
                  <div key={type} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="capitalize">{type}</span>
                      <span>{count}</span>
                    </div>
                    <Progress value={(count / CONTENT_OVERVIEW.totalReported) * 100} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Content by Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(CONTENT_OVERVIEW.contentByType).map(([type, count]) => (
                  <div key={type} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="capitalize">{type}</span>
                      <span>{count}</span>
                    </div>
                    <Progress value={(count / CONTENT_OVERVIEW.totalReported) * 100} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="logs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search logs" className="pl-8 w-[300px]" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Last 7 days
            </Button>
            <Button variant="outline" className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Action</th>
                    <th className="text-left p-4">Content Type</th>
                    <th className="text-left p-4">Moderator</th>
                    <th className="text-left p-4">Reason</th>
                    <th className="text-left p-4">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {MODERATION_LOGS.map((log) => (
                    <tr key={log?.id} className="border-b hover:bg-muted/50">
                      <td className="p-4">
                        <Badge
                          variant="outline"
                          className={
                            log?.action === "content_removed" || log?.action === "user_banned"
                              ? "bg-red-50 text-red-700 border-red-200"
                              : log?.action === "user_warned"
                                ? "bg-amber-50 text-amber-700 border-amber-200"
                                : "bg-green-50 text-green-700 border-green-200"
                          }
                        >
                          {log?.action.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                        </Badge>
                      </td>
                      <td className="p-4 capitalize">{log?.contentType}</td>
                      <td className="p-4">{log?.moderator}</td>
                      <td className="p-4">{log?.reason}</td>
                      <td className="p-4">{new Date(log?.timestamp).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="settings">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Moderation Team</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {MODERATION_TEAM.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-2 border rounded-md">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">{member.name}</div>
                          <div className="text-sm text-muted-foreground">{member.email}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">{member.role}</Badge>
                            <span className="text-xs text-muted-foreground">
                              Last active: {new Date(member.lastActive).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{member.actionsToday} actions today</Badge>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end mt-4">
                  <Button className="flex items-center gap-1">
                    <UserPlus className="h-4 w-4" />
                    Add Team Member
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Moderation Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="font-medium">Auto-moderation</div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Enable AI content screening</span>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="font-medium">Report Thresholds</div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Auto-review threshold</span>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="font-medium">Community Guidelines</div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Edit guidelines</span>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="font-medium">Notification Settings</div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Moderator alerts</span>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}
