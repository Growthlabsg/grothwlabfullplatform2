"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Activity,
  Search,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Clock,
  User,
  Settings,
  Shield,
  Database,
  Network,
  FileText,
  AlertTriangle,
  CheckCircle,
  Info,
  Trash2,
  Edit,
  Plus,
  Calendar,
  MapPin,
  Building,
  Globe,
  Zap,
  Bell,
  BarChart3
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ActivityLog {
  id: string
  timestamp: string
  user: string
  action: string
  category: "system" | "user" | "security" | "data" | "admin" | "api"
  severity: "low" | "medium" | "high" | "critical"
  details: string
  ipAddress: string
  userAgent: string
  status: "success" | "warning" | "error" | "info"
  metadata?: Record<string, any>
}

interface LogFilter {
  category: string
  severity: string
  user: string
  dateRange: string
  status: string
}

const mockActivityLogs: ActivityLog[] = [
  {
    id: "1",
    timestamp: "2024-01-20T10:30:00Z",
    user: "super.admin",
    action: "Configuration Updated",
    category: "admin",
    severity: "medium",
    details: "Updated system configuration settings",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    status: "success",
    metadata: {
      changes: ["email_settings", "security_policy"],
      previousValues: { email_verification: false },
      newValues: { email_verification: true }
    }
  },
  {
    id: "2",
    timestamp: "2024-01-20T10:25:00Z",
    user: "admin.user",
    action: "User Created",
    category: "user",
    severity: "low",
    details: "Created new user account: john.doe@example.com",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    status: "success",
    metadata: {
      userId: "user_12345",
      role: "startup",
      email: "john.doe@example.com"
    }
  },
  {
    id: "3",
    timestamp: "2024-01-20T10:20:00Z",
    user: "system",
    action: "Database Backup",
    category: "system",
    severity: "low",
    details: "Automated database backup completed successfully",
    ipAddress: "127.0.0.1",
    userAgent: "System/BackupService",
    status: "success",
    metadata: {
      backupSize: "2.1GB",
      duration: "5m 23s",
      tables: 45
    }
  },
  {
    id: "4",
    timestamp: "2024-01-20T10:15:00Z",
    user: "unknown",
    action: "Failed Login Attempt",
    category: "security",
    severity: "high",
    details: "Multiple failed login attempts from suspicious IP",
    ipAddress: "203.0.113.45",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    status: "error",
    metadata: {
      attempts: 5,
      targetUser: "admin.user",
      blocked: true
    }
  },
  {
    id: "5",
    timestamp: "2024-01-20T10:10:00Z",
    user: "data.analyst",
    action: "Data Export",
    category: "data",
    severity: "medium",
    details: "Bulk data export initiated for user analytics",
    ipAddress: "203.0.113.67",
    userAgent: "Mozilla/5.0 (Linux; x86_64)",
    status: "success",
    metadata: {
      exportType: "user_analytics",
      recordCount: 15420,
      fileSize: "45MB"
    }
  },
  {
    id: "6",
    timestamp: "2024-01-20T10:05:00Z",
    user: "api.client",
    action: "API Rate Limit Exceeded",
    category: "api",
    severity: "medium",
    details: "API rate limit exceeded for client application",
    ipAddress: "198.51.100.123",
    userAgent: "GrowthLab-API-Client/1.0",
    status: "warning",
    metadata: {
      endpoint: "/api/users",
      limit: 100,
      actual: 125,
      clientId: "client_67890"
    }
  },
  {
    id: "7",
    timestamp: "2024-01-20T10:00:00Z",
    user: "super.admin",
    action: "Feature Toggle Updated",
    category: "admin",
    severity: "medium",
    details: "Updated feature toggle: AI Recommendations",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    status: "success",
    metadata: {
      feature: "ai_recommendations",
      previousState: "disabled",
      newState: "enabled",
      scope: "beta_users"
    }
  },
  {
    id: "8",
    timestamp: "2024-01-20T09:55:00Z",
    user: "system",
    action: "Performance Alert",
    category: "system",
    severity: "high",
    details: "High CPU usage detected on server-02",
    ipAddress: "127.0.0.1",
    userAgent: "System/MonitoringService",
    status: "warning",
    metadata: {
      server: "server-02",
      cpuUsage: "87%",
      memoryUsage: "76%",
      threshold: "80%"
    }
  }
]

const categoryColors = {
  system: "bg-blue-100 text-blue-800",
  user: "bg-green-100 text-green-800",
  security: "bg-red-100 text-red-800",
  data: "bg-purple-100 text-purple-800",
  admin: "bg-orange-100 text-orange-800",
  api: "bg-indigo-100 text-indigo-800"
}

const severityColors = {
  low: "bg-gray-100 text-gray-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-orange-100 text-orange-800",
  critical: "bg-red-100 text-red-800"
}

const statusColors = {
  success: "bg-green-100 text-green-800",
  warning: "bg-yellow-100 text-yellow-800",
  error: "bg-red-100 text-red-800",
  info: "bg-blue-100 text-blue-800"
}

export function ActivityLogs() {
  const { toast } = useToast()
  const [logs, setLogs] = useState<ActivityLog[]>(mockActivityLogs)
  const [filters, setFilters] = useState<LogFilter>({
    category: "all",
    severity: "all",
    user: "",
    dateRange: "24h",
    status: "all"
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLog, setSelectedLog] = useState<ActivityLog | null>(null)

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log?.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log?.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log?.details.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filters.category === "all" || log?.category === filters.category
    const matchesSeverity = filters.severity === "all" || log?.severity === filters.severity
    const matchesUser = !filters.user || log?.user.toLowerCase().includes(filters.user.toLowerCase())
    const matchesStatus = filters.status === "all" || log?.status === filters.status
    return matchesSearch && matchesCategory && matchesSeverity && matchesUser && matchesStatus
  })

  const handleExportLogs = () => {
    const csvContent = [
      "Timestamp,User,Action,Category,Severity,Details,IP Address,Status",
      ...filteredLogs.map(log => 
        `"${log?.timestamp}","${log?.user}","${log?.action}","${log?.category}","${log?.severity}","${log?.details}","${log?.ipAddress}","${log?.status}"`
      )
    ].join("\n")

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `activity-logs-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)

    toast({
      title: "Logs Exported",
      description: "Activity logs have been exported to CSV file",
    })
  }

  const handleClearLogs = () => {
    setLogs([])
    toast({
      title: "Logs Cleared",
      description: "All activity logs have been cleared",
      variant: "destructive",
    })
  }

  const logStats = {
    total: logs.length,
    system: logs.filter(l => l.category === "system").length,
    security: logs.filter(l => l.category === "security").length,
    admin: logs.filter(l => l.category === "admin").length,
    errors: logs.filter(l => l.status === "error").length,
    warnings: logs.filter(l => l.status === "warning").length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Activity Logs</h2>
          <p className="text-muted-foreground">
            Comprehensive audit trail and system activity monitoring
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleExportLogs}>
            <Download className="w-4 h-4 mr-2" />
            Export Logs
          </Button>
          <Button variant="outline" onClick={handleClearLogs}>
            <Trash2 className="w-4 h-4 mr-2" />
            Clear Logs
          </Button>
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Logs</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{logStats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{logStats.system}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{logStats.security}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admin</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{logStats.admin}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Errors</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{logStats.errors}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Warnings</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{logStats.warnings}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filters.category} onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="system">System</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="data">Data</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="api">API</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.severity} onValueChange={(value) => setFilters(prev => ({ ...prev, severity: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="info">Info</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.dateRange} onValueChange={(value) => setFilters(prev => ({ ...prev, dateRange: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">Last Hour</SelectItem>
                <SelectItem value="24h">Last 24 Hours</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>

            <Input
              placeholder="Filter by user..."
              value={filters.user}
              onChange={(e) => setFilters(prev => ({ ...prev, user: e.target.value }))}
            />
          </div>
        </CardContent>
      </Card>

      {/* Logs Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Activity Logs ({filteredLogs.length})</CardTitle>
              <CardDescription>
                Detailed audit trail of all system activities
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log?.id}>
                  <TableCell>
                    <div className="text-sm">
                      {new Date(log?.timestamp).toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-medium">{log?.user}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{log?.action}</div>
                    <div className="text-xs text-muted-foreground max-w-xs truncate">
                      {log?.details}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={categoryColors[log?.category]}>
                      {log?.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={severityColors[log?.severity]}>
                      {log?.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[log?.status]}>
                      {log?.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-mono">{log?.ipAddress}</div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedLog(log)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Log Details Dialog */}
      {selectedLog && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Log Details</CardTitle>
            <CardDescription>
              Detailed information about the selected activity log
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Basic Information</h4>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Timestamp:</span>
                      <span className="text-sm">{new Date(selectedLog.timestamp).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">User:</span>
                      <span className="text-sm font-medium">{selectedLog.user}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Action:</span>
                      <span className="text-sm">{selectedLog.action}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Category:</span>
                      <Badge className={categoryColors[selectedLog.category]}>
                        {selectedLog.category}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium">Details</h4>
                  <p className="text-sm text-muted-foreground mt-2">{selectedLog.details}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Technical Information</h4>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">IP Address:</span>
                      <span className="text-sm font-mono">{selectedLog.ipAddress}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">User Agent:</span>
                      <span className="text-sm max-w-xs truncate">{selectedLog.userAgent}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Severity:</span>
                      <Badge className={severityColors[selectedLog.severity]}>
                        {selectedLog.severity}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Status:</span>
                      <Badge className={statusColors[selectedLog.status]}>
                        {selectedLog.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                {selectedLog.metadata && (
                  <div>
                    <h4 className="font-medium">Metadata</h4>
                    <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                      <pre className="text-xs overflow-auto">
                        {JSON.stringify(selectedLog.metadata, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 