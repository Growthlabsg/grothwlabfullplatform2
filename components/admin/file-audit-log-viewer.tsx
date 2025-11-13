"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { fileTrackingService, type FileAccessType, type SecurityLevel } from "@/lib/file-tracking-service"
import {
  Calendar,
  Download,
  FileText,
  Filter,
  Search,
  Shield,
  User,
  AlertTriangle,
  Eye,
  Edit,
  Trash,
  Share,
  Upload,
  Lock,
  FileIcon,
  BarChart4,
  Clock,
} from "lucide-react"

export function FileAuditLogViewer() {
  const [searchQuery, setSearchQuery] = useState("")
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // 30 days ago
    end: new Date().toISOString().split("T")[0], // Today
  })
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [selectedAccessType, setSelectedAccessType] = useState<FileAccessType | null>(null)
  const [selectedSecurityLevel, setSelectedSecurityLevel] = useState<SecurityLevel | null>(null)
  const [activeTab, setActiveTab] = useState<"logs" | "analytics">("logs")

  // Get filtered logs
  const logs = fileTrackingService.getAllAccessLogs({
    userId: selectedUser || undefined,
    accessType: selectedAccessType || undefined,
    startDate: dateRange.start ? new Date(dateRange.start) : undefined,
    endDate: dateRange.end ? new Date(dateRange.end) : undefined,
    securityLevel: selectedSecurityLevel || undefined,
  })

  // Further filter by search query
  const filteredLogs = logs.filter(
    (log) =>
      log?.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log?.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log?.userEmail.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Generate analytics data
  const generateAnalytics = () => {
    // Group by access type
    const accessTypeCount: Record<string, number> = {}
    filteredLogs.forEach((log) => {
      accessTypeCount[log?.accessType] = (accessTypeCount[log?.accessType] || 0) + 1
    })

    // Group by security level
    const securityLevelCount: Record<string, number> = {}
    filteredLogs.forEach((log) => {
      securityLevelCount[log?.securityLevel] = (securityLevelCount[log?.securityLevel] || 0) + 1
    })

    // Group by user
    const userCount: Record<string, number> = {}
    filteredLogs.forEach((log) => {
      userCount[log?.userName] = (userCount[log?.userName] || 0) + 1
    })

    // Group by day
    const activityByDay: Record<string, number> = {}
    filteredLogs.forEach((log) => {
      const day = log?.timestamp.toISOString().split("T")[0]
      activityByDay[day] = (activityByDay[day] || 0) + 1
    })

    return {
      accessTypeCount,
      securityLevelCount,
      userCount,
      activityByDay,
      totalLogs: filteredLogs.length,
    }
  }

  const analytics = generateAnalytics()

  // Get access type icon
  const getAccessTypeIcon = (type: FileAccessType) => {
    switch (type) {
      case "upload":
        return <Upload className="h-4 w-4" />
      case "download":
        return <Download className="h-4 w-4" />
      case "view":
        return <Eye className="h-4 w-4" />
      case "edit":
        return <Edit className="h-4 w-4" />
      case "share":
        return <Share className="h-4 w-4" />
      case "delete":
        return <Trash className="h-4 w-4" />
      case "security_change":
        return <Lock className="h-4 w-4" />
      default:
        return <FileIcon className="h-4 w-4" />
    }
  }

  // Get security level badge
  const getSecurityLevelBadge = (level: SecurityLevel) => {
    switch (level) {
      case "standard":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Standard</Badge>
      case "confidential":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Confidential</Badge>
      case "restricted":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Restricted</Badge>
    }
  }

  // Format access type for display
  const formatAccessType = (type: string) => {
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">File Access Audit Logs</h2>
        <Button variant="outline" onClick={() => console.log("Exporting logs...")}>
          <Download className="h-4 w-4 mr-2" />
          Export Logs
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "logs" | "analytics")}>
        <TabsList>
          <TabsTrigger value="logs">
            <FileText className="h-4 w-4 mr-2" />
            Access Logs
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart4 className="h-4 w-4 mr-2" />
            Analytics
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by file name, user, or email..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <Input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="w-auto"
            />
            <span>to</span>
            <Input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="w-auto"
            />
          </div>

          <Select
            value={selectedAccessType || ""}
            onValueChange={(value) => setSelectedAccessType((value as FileAccessType) || null)}
          >
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Action Type" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Actions</SelectItem>
              <SelectItem value="upload">Upload</SelectItem>
              <SelectItem value="download">Download</SelectItem>
              <SelectItem value="view">View</SelectItem>
              <SelectItem value="edit">Edit</SelectItem>
              <SelectItem value="share">Share</SelectItem>
              <SelectItem value="delete">Delete</SelectItem>
              <SelectItem value="security_change">Security Change</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={selectedSecurityLevel || ""}
            onValueChange={(value) => setSelectedSecurityLevel((value as SecurityLevel) || null)}
          >
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Security Level" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="confidential">Confidential</SelectItem>
              <SelectItem value="restricted">Restricted</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedUser || ""} onValueChange={(value) => setSelectedUser(value || null)}>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <SelectValue placeholder="User" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              <SelectItem value="user-1">John Doe</SelectItem>
              <SelectItem value="user-2">Sarah Chen</SelectItem>
              <SelectItem value="user-3">David Wong</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {activeTab === "logs" ? (
        <>
          {/* Results summary */}
          <div className="text-sm text-muted-foreground">
            Showing {filteredLogs.length} {filteredLogs.length === 1 ? "log" : "logs"} from {dateRange.start} to{" "}
            {dateRange.end}
          </div>

          {/* Logs table */}
          <div className="border rounded-md">
            <ScrollArea className="h-[600px]">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-3 font-medium">Timestamp</th>
                    <th className="text-left p-3 font-medium">User</th>
                    <th className="text-left p-3 font-medium">Action</th>
                    <th className="text-left p-3 font-medium">File</th>
                    <th className="text-left p-3 font-medium">Security Level</th>
                    <th className="text-left p-3 font-medium">IP Address</th>
                    <th className="text-left p-3 font-medium">Device</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-4 text-center text-muted-foreground">
                        No logs found matching your filters.
                      </td>
                    </tr>
                  ) : (
                    filteredLogs.map((log) => (
                      <tr key={log?.id} className="border-b hover:bg-muted/50">
                        <td className="p-3">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{log?.timestamp.toLocaleString()}</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-2 text-muted-foreground" />
                            <div>
                              <div>{log?.userName}</div>
                              <div className="text-xs text-muted-foreground">{log?.userEmail}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge variant="outline" className="flex items-center gap-1">
                            {getAccessTypeIcon(log?.accessType)}
                            <span>{formatAccessType(log?.accessType)}</span>
                          </Badge>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center">
                            <FileIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="truncate max-w-[200px]">{log?.fileName}</span>
                          </div>
                        </td>
                        <td className="p-3">{getSecurityLevelBadge(log?.securityLevel)}</td>
                        <td className="p-3">{log?.ipAddress}</td>
                        <td className="p-3 truncate max-w-[150px]">{log?.deviceInfo}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </ScrollArea>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Total activity card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Activity</CardTitle>
              <CardDescription>File access events in selected period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{analytics.totalLogs}</div>
              <div className="text-sm text-muted-foreground mt-2">
                From {dateRange.start} to {dateRange.end}
              </div>
            </CardContent>
          </Card>

          {/* Activity by security level */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Activity by Security Level</CardTitle>
              <CardDescription>Distribution of access by security level</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(analytics.securityLevelCount).map(([level, count]) => (
                  <div key={level} className="flex items-center justify-between">
                    <div className="flex items-center">
                      {level === "standard" && <Shield className="h-4 w-4 text-green-500 mr-2" />}
                      {level === "confidential" && <Shield className="h-4 w-4 text-yellow-500 mr-2" />}
                      {level === "restricted" && <Shield className="h-4 w-4 text-red-500 mr-2" />}
                      <span className="capitalize">{level}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">{count}</span>
                      <span className="text-xs text-muted-foreground ml-1">
                        ({Math.round((count / analytics.totalLogs) * 100)}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Activity by action type */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Activity by Action Type</CardTitle>
              <CardDescription>Distribution of actions performed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(analytics.accessTypeCount).map(([type, count]) => (
                  <div key={type} className="flex items-center justify-between">
                    <div className="flex items-center">
                      {getAccessTypeIcon(type as FileAccessType)}
                      <span className="ml-2 capitalize">{formatAccessType(type)}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">{count}</span>
                      <span className="text-xs text-muted-foreground ml-1">
                        ({Math.round((count / analytics.totalLogs) * 100)}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top users */}
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Top Users</CardTitle>
              <CardDescription>Users with most file activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(analytics.userCount)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 5)
                  .map(([user, count]) => (
                    <div key={user} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{user}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium">{count}</span>
                        <span className="text-xs text-muted-foreground ml-1">
                          ({Math.round((count / analytics.totalLogs) * 100)}%)
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Security alerts */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Security Alerts</CardTitle>
              <CardDescription>Potential security concerns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                  <div>
                    <div className="font-medium">Multiple downloads</div>
                    <div className="text-sm text-muted-foreground">
                      User "Sarah Chen" downloaded 5 restricted files in the last 24 hours
                    </div>
                  </div>
                </div>
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                  <div>
                    <div className="font-medium">Unusual access pattern</div>
                    <div className="text-sm text-muted-foreground">
                      User "David Wong" accessed files outside normal working hours
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
