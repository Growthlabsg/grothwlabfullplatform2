"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Database,
  Server,
  Activity,
  BarChart3,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  Plus,
  Edit,
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock,
  HardDrive,
  Cpu,
  MemoryStick,
  Network,
  Zap,
  Shield,
  FileText,
  Settings,
  Play,
  Pause,
  Square,
  RotateCcw,
  Save,
  Copy,
  Search,
  Filter,
  Calendar,
  TrendingUp,
  TrendingDown,
  Minus,
  Info
} from "lucide-react"

interface DatabaseConnection {
  id: string
  name: string
  type: "postgresql" | "mysql" | "mongodb" | "redis"
  host: string
  port: number
  database: string
  status: "connected" | "disconnected" | "error" | "maintenance"
  connections: {
    active: number
    idle: number
    total: number
    max: number
  }
  performance: {
    responseTime: number
    throughput: number
    errorRate: number
    uptime: number
  }
  size: {
    used: string
    total: string
    percentage: number
  }
  lastBackup: string
  nextBackup: string
}

interface DatabaseQuery {
  id: string
  query: string
  duration: number
  timestamp: string
  status: "completed" | "running" | "failed"
  rows: number
  database: string
  user: string
}

interface BackupJob {
  id: string
  name: string
  database: string
  type: "full" | "incremental" | "differential"
  schedule: string
  status: "running" | "completed" | "failed" | "scheduled"
  size: string
  duration: string
  timestamp: string
  retention: number
}

const mockConnections: DatabaseConnection[] = [
  {
    id: "main-postgres",
    name: "Main PostgreSQL",
    type: "postgresql",
    host: "db-primary.growthlab.com",
    port: 5432,
    database: "growthlab_production",
    status: "connected",
    connections: { active: 24, idle: 6, total: 30, max: 100 },
    performance: { responseTime: 12, throughput: 2400, errorRate: 0.02, uptime: 99.9 },
    size: { used: "2.1TB", total: "3.2TB", percentage: 65.6 },
    lastBackup: "2 hours ago",
    nextBackup: "in 22 hours"
  },
  {
    id: "analytics-postgres",
    name: "Analytics DB",
    type: "postgresql",
    host: "db-analytics.growthlab.com",
    port: 5432,
    database: "growthlab_analytics",
    status: "connected",
    connections: { active: 12, idle: 3, total: 15, max: 50 },
    performance: { responseTime: 8, throughput: 1200, errorRate: 0.01, uptime: 99.8 },
    size: { used: "856GB", total: "1.5TB", percentage: 57.1 },
    lastBackup: "4 hours ago",
    nextBackup: "in 20 hours"
  },
  {
    id: "cache-redis",
    name: "Redis Cache",
    type: "redis",
    host: "cache.growthlab.com",
    port: 6379,
    database: "cache_db",
    status: "connected",
    connections: { active: 156, idle: 44, total: 200, max: 1000 },
    performance: { responseTime: 0.8, throughput: 15000, errorRate: 0.001, uptime: 99.99 },
    size: { used: "24GB", total: "64GB", percentage: 37.5 },
    lastBackup: "1 hour ago",
    nextBackup: "in 23 hours"
  }
]

const mockQueries: DatabaseQuery[] = [
  {
    id: "q1",
    query: "SELECT * FROM users WHERE status = 'active' ORDER BY created_at DESC LIMIT 100",
    duration: 12,
    timestamp: "2024-01-20 14:30:25",
    status: "completed",
    rows: 100,
    database: "growthlab_production",
    user: "app_user"
  },
  {
    id: "q2",
    query: "INSERT INTO activity_logs (user_id, action, timestamp) VALUES ($1, $2, $3)",
    duration: 3,
    timestamp: "2024-01-20 14:30:20",
    status: "completed",
    rows: 1,
    database: "growthlab_production",
    user: "app_user"
  },
  {
    id: "q3",
    query: "UPDATE user_profiles SET last_login = NOW() WHERE user_id = $1",
    duration: 5,
    timestamp: "2024-01-20 14:30:15",
    status: "completed",
    rows: 1,
    database: "growthlab_production",
    user: "app_user"
  }
]

const mockBackups: BackupJob[] = [
  {
    id: "backup1",
    name: "Daily Full Backup",
    database: "growthlab_production",
    type: "full",
    schedule: "Daily at 2:00 AM",
    status: "completed",
    size: "2.1TB",
    duration: "45 minutes",
    timestamp: "2024-01-20 02:00:00",
    retention: 30
  },
  {
    id: "backup2",
    name: "Hourly Incremental",
    database: "growthlab_production",
    type: "incremental",
    schedule: "Every hour",
    status: "completed",
    size: "156MB",
    duration: "2 minutes",
    timestamp: "2024-01-20 14:00:00",
    retention: 7
  },
  {
    id: "backup3",
    name: "Analytics Backup",
    database: "growthlab_analytics",
    type: "full",
    schedule: "Daily at 3:00 AM",
    status: "scheduled",
    size: "856GB",
    duration: "25 minutes",
    timestamp: "2024-01-21 03:00:00",
    retention: 14
  }
]

export function DatabaseManagement() {
  const [connections, setConnections] = useState<DatabaseConnection[]>(mockConnections)
  const [queries, setQueries] = useState<DatabaseQuery[]>(mockQueries)
  const [backups, setBackups] = useState<BackupJob[]>(mockBackups)
  const [selectedConnection, setSelectedConnection] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [showBackupDialog, setShowBackupDialog] = useState(false)
  const [showQueryDialog, setShowQueryDialog] = useState(false)
  const [customQuery, setCustomQuery] = useState("")
  const [queryResults, setQueryResults] = useState<any[]>([])
  const [lastUpdated, setLastUpdated] = useState("")

  useEffect(() => {
    const updateTime = () => {
      setLastUpdated(new Date().toLocaleTimeString())
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const showAlert = (message: string) => {
    if (typeof window !== 'undefined') {
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Database Management', { body: message })
      } else {
        alert(message)
      }
    }
  }

  const handleRefreshConnections = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Update connection stats with random variations
      const updatedConnections = connections.map(conn => ({
        ...conn,
        connections: {
          ...conn.connections,
          active: Math.max(1, conn.connections.active + Math.floor(Math.random() * 10) - 5)
        },
        performance: {
          ...conn.performance,
          responseTime: Math.max(1, conn.performance.responseTime + Math.floor(Math.random() * 4) - 2),
          throughput: Math.max(100, conn.performance.throughput + Math.floor(Math.random() * 200) - 100)
        }
      }))
      
      setConnections(updatedConnections)
      showAlert("Database connections refreshed successfully!")
    } catch (error) {
      showAlert("Failed to refresh connections")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateBackup = async (connectionId: string, type: "full" | "incremental") => {
    setIsLoading(true)
    try {
      const connection = connections.find(c => c.id === connectionId)
      if (!connection) throw new Error("Connection not found")

      await new Promise(resolve => setTimeout(resolve, 2000))

      const newBackup: BackupJob = {
        id: `backup_${Date.now()}`,
        name: `Manual ${type} Backup`,
        database: connection.database,
        type,
        schedule: "Manual",
        status: "completed",
        size: type === "full" ? "2.1TB" : "156MB",
        duration: type === "full" ? "45 minutes" : "2 minutes",
        timestamp: new Date().toISOString(),
        retention: 30
      }

      setBackups(prev => [newBackup, ...prev])
      showAlert(`${type} backup created successfully!`)
    } catch (error) {
      showAlert("Failed to create backup")
    } finally {
      setIsLoading(false)
      setShowBackupDialog(false)
    }
  }

  const handleExecuteQuery = async () => {
    if (!customQuery.trim()) {
      showAlert("Please enter a query")
      return
    }

    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Simulate query execution
      const newQuery: DatabaseQuery = {
        id: `query_${Date.now()}`,
        query: customQuery,
        duration: Math.floor(Math.random() * 50) + 5,
        timestamp: new Date().toISOString(),
        status: "completed",
        rows: Math.floor(Math.random() * 1000) + 1,
        database: selectedConnection || "growthlab_production",
        user: "admin"
      }

      setQueries(prev => [newQuery, ...prev.slice(0, 9)])
      
      // Mock results
      setQueryResults([
        { id: 1, name: "John Doe", email: "john@example.com", status: "active" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", status: "active" },
        { id: 3, name: "Bob Johnson", email: "bob@example.com", status: "inactive" }
      ])

      showAlert("Query executed successfully!")
    } catch (error) {
      showAlert("Query execution failed")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRestartConnection = async (connectionId: string) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setConnections(prev => prev.map(conn => 
        conn.id === connectionId 
          ? { ...conn, status: "connected" as const, connections: { ...conn.connections, active: 0 } }
          : conn
      ))
      
      showAlert("Database connection restarted successfully!")
    } catch (error) {
      showAlert("Failed to restart connection")
    } finally {
      setIsLoading(false)
    }
  }

  const handleOptimizeDatabase = async (connectionId: string) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      setConnections(prev => prev.map(conn => 
        conn.id === connectionId 
          ? { 
              ...conn, 
              performance: { 
                ...conn.performance, 
                responseTime: Math.max(1, conn.performance.responseTime * 0.8),
                throughput: conn.performance.throughput * 1.2
              }
            }
          : conn
      ))
      
      showAlert("Database optimization completed!")
    } catch (error) {
      showAlert("Database optimization failed")
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected": return "text-green-600 bg-green-50"
      case "disconnected": return "text-red-600 bg-red-50"
      case "error": return "text-red-600 bg-red-50"
      case "maintenance": return "text-yellow-600 bg-yellow-50"
      case "running": return "text-blue-600 bg-blue-50"
      case "completed": return "text-green-600 bg-green-50"
      case "failed": return "text-red-600 bg-red-50"
      case "scheduled": return "text-gray-600 bg-gray-50"
      default: return "text-gray-600 bg-gray-50"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected": return <CheckCircle className="h-4 w-4" />
      case "disconnected": return <AlertTriangle className="h-4 w-4" />
      case "error": return <AlertTriangle className="h-4 w-4" />
      case "maintenance": return <Settings className="h-4 w-4" />
      case "running": return <Play className="h-4 w-4" />
      case "completed": return <CheckCircle className="h-4 w-4" />
      case "failed": return <AlertTriangle className="h-4 w-4" />
      case "scheduled": return <Clock className="h-4 w-4" />
      default: return <Minus className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Database Management</h2>
          <p className="text-muted-foreground">
            Monitor and manage database connections, performance, and backups
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleRefreshConnections}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={() => setShowBackupDialog(true)}>
            <Download className="h-4 w-4 mr-2" />
            Create Backup
          </Button>
          <Button onClick={() => setShowQueryDialog(true)}>
            <Database className="h-4 w-4 mr-2" />
            Execute Query
          </Button>
          <div className="text-xs text-muted-foreground">
            Last updated: {lastUpdated}
          </div>
        </div>
      </div>

      <Tabs defaultValue="connections" className="space-y-4">
        <TabsList>
          <TabsTrigger value="connections">Connections</TabsTrigger>
          <TabsTrigger value="queries">Query Monitor</TabsTrigger>
          <TabsTrigger value="backups">Backups</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="connections" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {connections.map((connection) => (
              <Card key={connection.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{connection.name}</CardTitle>
                    <Badge className={getStatusColor(connection.status)}>
                      {getStatusIcon(connection.status)}
                      <span className="ml-1 capitalize">{connection.status}</span>
                    </Badge>
                  </div>
                  <CardDescription>
                    {connection.type.toUpperCase()} • {connection.host}:{connection.port}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Connection Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium">Connections</div>
                      <div className="text-2xl font-bold text-blue-600">
                        {connection.connections.active}/{connection.connections.max}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {connection.connections.idle} idle
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Response Time</div>
                      <div className="text-2xl font-bold text-green-600">
                        {connection.performance.responseTime}ms
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {connection.performance.uptime}% uptime
                      </div>
                    </div>
                  </div>

                  {/* Storage Usage */}
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Storage Usage</span>
                      <span>{connection.size.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${connection.size.percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {connection.size.used} of {connection.size.total}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleRestartConnection(connection.id)}
                      disabled={isLoading}
                    >
                      <RotateCcw className="h-3 w-3 mr-1" />
                      Restart
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleOptimizeDatabase(connection.id)}
                      disabled={isLoading}
                    >
                      <Zap className="h-3 w-3 mr-1" />
                      Optimize
                    </Button>
                  </div>

                  {/* Last Backup */}
                  <div className="pt-2 border-t">
                    <div className="text-xs text-muted-foreground">
                      Last backup: {connection.lastBackup}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Next backup: {connection.nextBackup}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="queries" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Database Queries</CardTitle>
              <CardDescription>
                Monitor recent database operations and performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Query</TableHead>
                    <TableHead>Database</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Rows</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {queries.map((query) => (
                    <TableRow key={query.id}>
                      <TableCell className="max-w-md">
                        <code className="text-xs bg-gray-100 p-1 rounded">
                          {query.query.length > 60 ? query.query.substring(0, 60) + "..." : query.query}
                        </code>
                      </TableCell>
                      <TableCell>{query.database}</TableCell>
                      <TableCell>{query.duration}ms</TableCell>
                      <TableCell>{query.rows}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(query.status)}>
                          {getStatusIcon(query.status)}
                          <span className="ml-1 capitalize">{query.status}</span>
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {new Date(query.timestamp).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Query Results */}
          {queryResults.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Query Results</CardTitle>
                <CardDescription>
                  Results from the last executed query
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      {Object.keys(queryResults[0] || {}).map((key) => (
                        <TableHead key={key} className="capitalize">{key}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {queryResults.map((row, index) => (
                      <TableRow key={index}>
                        {Object.values(row).map((value, i) => (
                          <TableCell key={i}>{String(value)}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="backups" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Backup Jobs</CardTitle>
              <CardDescription>
                Manage database backups and restore points
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Database</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {backups.map((backup) => (
                    <TableRow key={backup.id}>
                      <TableCell className="font-medium">{backup.name}</TableCell>
                      <TableCell>{backup.database}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {backup.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{backup.size}</TableCell>
                      <TableCell>{backup.duration}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(backup.status)}>
                          {getStatusIcon(backup.status)}
                          <span className="ml-1 capitalize">{backup.status}</span>
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {new Date(backup.timestamp).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            <Download className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Upload className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Total Queries/min</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">2,847</div>
                <p className="text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3 inline mr-1" />
                  +12% from last hour
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Avg Response Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">8.5ms</div>
                <p className="text-xs text-muted-foreground">
                  <TrendingDown className="h-3 w-3 inline mr-1" />
                  -5% from last hour
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Error Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">0.02%</div>
                <p className="text-xs text-muted-foreground">
                  <Minus className="h-3 w-3 inline mr-1" />
                  No change
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Active Connections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">192</div>
                <p className="text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3 inline mr-1" />
                  +8% from last hour
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>
                Real-time database performance monitoring
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {connections.map((connection) => (
                  <div key={connection.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{connection.name}</h4>
                      <Badge className={getStatusColor(connection.status)}>
                        {connection.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Response Time</div>
                        <div className="text-lg font-bold">{connection.performance.responseTime}ms</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Throughput</div>
                        <div className="text-lg font-bold">{connection.performance.throughput.toLocaleString()}/min</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Error Rate</div>
                        <div className="text-lg font-bold">{connection.performance.errorRate}%</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Uptime</div>
                        <div className="text-lg font-bold">{connection.performance.uptime}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create Backup Dialog */}
      <Dialog open={showBackupDialog} onOpenChange={setShowBackupDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Database Backup</DialogTitle>
            <DialogDescription>
              Create a new backup for the selected database
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="backup-connection">Database Connection</Label>
              <Select value={selectedConnection} onValueChange={setSelectedConnection}>
                <SelectTrigger>
                  <SelectValue placeholder="Select database connection" />
                </SelectTrigger>
                <SelectContent>
                  {connections.map((conn) => (
                    <SelectItem key={conn.id} value={conn.id}>
                      {conn.name} ({conn.database})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBackupDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={() => handleCreateBackup(selectedConnection, "incremental")}
              disabled={!selectedConnection || isLoading}
            >
              <Download className="h-4 w-4 mr-2" />
              Incremental Backup
            </Button>
            <Button 
              onClick={() => handleCreateBackup(selectedConnection, "full")}
              disabled={!selectedConnection || isLoading}
            >
              <Database className="h-4 w-4 mr-2" />
              Full Backup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Execute Query Dialog */}
      <Dialog open={showQueryDialog} onOpenChange={setShowQueryDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Execute Database Query</DialogTitle>
            <DialogDescription>
              Execute a custom SQL query on the selected database
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="query-connection">Database Connection</Label>
              <Select value={selectedConnection} onValueChange={setSelectedConnection}>
                <SelectTrigger>
                  <SelectValue placeholder="Select database connection" />
                </SelectTrigger>
                <SelectContent>
                  {connections.map((conn) => (
                    <SelectItem key={conn.id} value={conn.id}>
                      {conn.name} ({conn.database})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="custom-query">SQL Query</Label>
              <Textarea
                id="custom-query"
                placeholder="Enter your SQL query here..."
                value={customQuery}
                onChange={(e) => setCustomQuery(e.target.value)}
                rows={6}
                className="font-mono"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowQueryDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleExecuteQuery}
              disabled={!customQuery.trim() || isLoading}
            >
              <Play className="h-4 w-4 mr-2" />
              Execute Query
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
