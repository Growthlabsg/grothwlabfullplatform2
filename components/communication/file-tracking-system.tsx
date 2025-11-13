"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { format } from "date-fns"
import {
  Activity,
  Clock,
  Download,
  Eye,
  FileText,
  Lock,
  ShieldAlert,
  ShieldCheck,
  User,
  Users,
  Monitor,
  Smartphone,
} from "lucide-react"
import { cn } from "@/lib/utils"

export interface FileAccessLog {
  id: string
  fileName: string
  userName: string
  userEmail: string
  accessType: "view" | "download" | "share" | "edit"
  timestamp: Date
  securityLevel: "standard" | "confidential" | "restricted"
  status: "success" | "denied" | "warning"
  deviceType: "desktop" | "mobile" | "tablet"
}

export function FileTrackingSystem() {
  const [searchQuery, setSearchQuery] = useState("")

  const accessLogs: FileAccessLog[] = [
    {
      id: "log1",
      fileName: "Q3_Financial_Report.pdf",
      userName: "Sarah Chen",
      userEmail: "sarah.chen@example.com",
      accessType: "view",
      timestamp: new Date("2024-01-15T10:30:00"),
      securityLevel: "confidential",
      status: "success",
      deviceType: "desktop"
    },
    {
      id: "log2",
      fileName: "Product_Roadmap_2024.pptx",
      userName: "David Wong",
      userEmail: "david.wong@example.com",
      accessType: "download",
      timestamp: new Date("2024-01-15T09:15:00"),
      securityLevel: "restricted",
      status: "success",
      deviceType: "mobile"
    }
  ]

  const getSecurityIcon = (level: string) => {
    switch (level) {
      case "standard":
        return <ShieldCheck className="h-4 w-4 text-green-500" />
      case "confidential":
        return <Lock className="h-4 w-4 text-amber-500" />
      case "restricted":
        return <ShieldAlert className="h-4 w-4 text-red-500" />
      default:
        return <ShieldCheck className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      success: "bg-green-100 text-green-800",
      denied: "bg-red-100 text-red-800",
      warning: "bg-yellow-100 text-yellow-800"
    }
    return <Badge className={cn("text-xs", variants[status as keyof typeof variants])}>{status}</Badge>
  }

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "desktop":
        return <Monitor className="h-4 w-4" />
      case "mobile":
        return <Smartphone className="h-4 w-4" />
      case "tablet":
        return <Smartphone className="h-4 w-4" />
      default:
        return <Monitor className="h-4 w-4" />
    }
  }

  const filteredLogs = accessLogs.filter(log => 
    log?.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log?.userName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">File Tracking System</h2>
          <p className="text-muted-foreground">
            Monitor file access and security events
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Activity className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activity Logs</CardTitle>
          <CardDescription>
            {filteredLogs.length} entries found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              placeholder="Search files or users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>File</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Security</TableHead>
                <TableHead>Device</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log?.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4" />
                      <span className="font-medium">{log?.fileName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <div>
                        <div className="font-medium">{log?.userName}</div>
                        <div className="text-sm text-muted-foreground">{log?.userEmail}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {log?.accessType === 'download' && <Download className="h-4 w-4" />}
                      {log?.accessType === 'view' && <Eye className="h-4 w-4" />}
                      {log?.accessType === 'share' && <Users className="h-4 w-4" />}
                      <span className="capitalize">{log?.accessType}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getSecurityIcon(log?.securityLevel)}
                      <span className="capitalize">{log?.securityLevel}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getDeviceIcon(log?.deviceType)}
                      <span className="text-sm capitalize">{log?.deviceType}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">
                        {format(log?.timestamp, "MMM dd, HH:mm")}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(log?.status)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
} 