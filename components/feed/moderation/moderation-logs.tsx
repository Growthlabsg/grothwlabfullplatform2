"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Download, Clock, User, FileText, AlertTriangle } from "lucide-react"

// Sample moderation log data
const moderationLogs = [
  {
    id: "log-1",
    timestamp: "2023-09-15T14:30:00Z",
    action: "Post Removed",
    reason: "Violates community guidelines",
    contentType: "Post",
    contentId: "post-123",
    moderator: "John Doe",
    severity: "High",
  },
  {
    id: "log-2",
    timestamp: "2023-09-15T13:45:00Z",
    action: "Comment Hidden",
    reason: "Spam content",
    contentType: "Comment",
    contentId: "comment-456",
    moderator: "Jane Smith",
    severity: "Medium",
  },
  {
    id: "log-3",
    timestamp: "2023-09-15T12:15:00Z",
    action: "User Warned",
    reason: "Inappropriate language",
    contentType: "Comment",
    contentId: "comment-789",
    moderator: "John Doe",
    severity: "Low",
  },
  {
    id: "log-4",
    timestamp: "2023-09-15T11:30:00Z",
    action: "Post Flagged",
    reason: "Potential misinformation",
    contentType: "Post",
    contentId: "post-234",
    moderator: "Jane Smith",
    severity: "Medium",
  },
  {
    id: "log-5",
    timestamp: "2023-09-15T10:45:00Z",
    action: "User Suspended",
    reason: "Multiple violations",
    contentType: "User",
    contentId: "user-345",
    moderator: "John Doe",
    severity: "High",
  },
]

export function ModerationLogs() {
  const [searchQuery, setSearchQuery] = useState("")
  const [actionFilter, setActionFilter] = useState("All")
  const [severityFilter, setSeverityFilter] = useState("All")

  // Filter logs based on search query and filters
  const filteredLogs = moderationLogs.filter((log) => {
    const matchesSearch =
      searchQuery === "" ||
      log?.contentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log?.moderator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log?.reason.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesAction = actionFilter === "All" || log?.action === actionFilter
    const matchesSeverity = severityFilter === "All" || log?.severity === severityFilter

    return matchesSearch && matchesAction && matchesSeverity
  })

  // Format timestamp to readable date and time
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString()
  }

  // Get severity badge color
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Moderation Logs</CardTitle>
        <CardDescription>View a history of all moderation actions taken on the platform</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search by ID, moderator, or reason..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex space-x-2">
              <div className="w-40">
                <Select value={actionFilter} onValueChange={setActionFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Actions</SelectItem>
                    <SelectItem value="Post Removed">Post Removed</SelectItem>
                    <SelectItem value="Comment Hidden">Comment Hidden</SelectItem>
                    <SelectItem value="User Warned">User Warned</SelectItem>
                    <SelectItem value="Post Flagged">Post Flagged</SelectItem>
                    <SelectItem value="User Suspended">User Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-40">
                <Select value={severityFilter} onValueChange={setSeverityFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Severities</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>Timestamp</span>
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center space-x-1">
                      <AlertTriangle className="h-4 w-4" />
                      <span>Action</span>
                    </div>
                  </TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>
                    <div className="flex items-center space-x-1">
                      <FileText className="h-4 w-4" />
                      <span>Content</span>
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>Moderator</span>
                    </div>
                  </TableHead>
                  <TableHead>Severity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log?.id}>
                    <TableCell className="font-mono text-xs">{formatTimestamp(log?.timestamp)}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{log?.action}</Badge>
                    </TableCell>
                    <TableCell>{log?.reason}</TableCell>
                    <TableCell>
                      <span className="font-medium">{log?.contentType}: </span>
                      <span className="font-mono text-xs">{log?.contentId}</span>
                    </TableCell>
                    <TableCell>{log?.moderator}</TableCell>
                    <TableCell>
                      <Badge className={getSeverityColor(log?.severity)}>{log?.severity}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
