"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Activity, 
  Server, 
  Database, 
  Globe, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Zap, 
  Cpu, 
  Network, 
  HardDrive,
  MemoryStick,
  Wifi,
  Gauge,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Settings,
  Bell
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useFounderAuth } from "@/contexts/founder-auth-context"

// Mock system health data
const mockSystemHealth = {
  overallStatus: "healthy",
  uptime: 99.97,
  lastUpdated: new Date().toISOString(),
  services: [
    { name: "Web Server", status: "healthy", responseTime: 45, uptime: 99.99, lastCheck: new Date().toISOString() },
    { name: "Database", status: "healthy", responseTime: 12, uptime: 99.95, lastCheck: new Date().toISOString() },
    { name: "API Gateway", status: "healthy", responseTime: 23, uptime: 99.98, lastCheck: new Date().toISOString() },
    { name: "File Storage", status: "warning", responseTime: 89, uptime: 99.85, lastCheck: new Date().toISOString() },
    { name: "Email Service", status: "healthy", responseTime: 34, uptime: 99.97, lastCheck: new Date().toISOString() },
    { name: "Payment Gateway", status: "healthy", responseTime: 67, uptime: 99.92, lastCheck: new Date().toISOString() }
  ],
  performance: {
    cpuUsage: 23,
    memoryUsage: 67,
    diskUsage: 45,
    networkLatency: 12,
    activeConnections: 1247,
    requestsPerSecond: 89
  },
  alerts: [
    { id: "1", level: "warning", message: "File storage response time increased", timestamp: new Date(Date.now() - 300000).toISOString() },
    { id: "2", level: "info", message: "Scheduled maintenance completed", timestamp: new Date(Date.now() - 3600000).toISOString() },
    { id: "3", level: "info", message: "Backup completed successfully", timestamp: new Date(Date.now() - 7200000).toISOString() }
  ],
  incidents: [
    { id: "1", title: "Database connection timeout", status: "resolved", severity: "medium", createdAt: new Date(Date.now() - 86400000).toISOString(), resolvedAt: new Date(Date.now() - 82800000).toISOString() },
    { id: "2", title: "API rate limiting exceeded", status: "investigating", severity: "low", createdAt: new Date(Date.now() - 3600000).toISOString() }
  ],
  metrics: {
    responseTime: { current: 45, average: 42, trend: "stable" },
    errorRate: { current: 0.12, average: 0.15, trend: "improving" },
    throughput: { current: 89, average: 87, trend: "increasing" },
    availability: { current: 99.97, average: 99.95, trend: "stable" }
  }
}

export default function SystemHealth() {
  const { toast } = useToast()
  const [systemHealth, setSystemHealth] = useState(mockSystemHealth)
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false)
  const [isIncidentDialogOpen, setIsIncidentDialogOpen] = useState(false)
  const [selectedIncident, setSelectedIncident] = useState<any>(null)
  const [newAlert, setNewAlert] = useState({ level: "info", message: "" })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy": return "bg-green-500"
      case "warning": return "bg-yellow-500"
      case "critical": return "bg-red-500"
      case "maintenance": return "bg-blue-500"
      default: return "bg-gray-500"
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "healthy": return "default"
      case "warning": return "secondary"
      case "critical": return "destructive"
      case "maintenance": return "outline"
      default: return "secondary"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "text-red-600"
      case "high": return "text-orange-600"
      case "medium": return "text-yellow-600"
      case "low": return "text-blue-600"
      default: return "text-gray-600"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "increasing": return <TrendingUp className="h-4 w-4 text-green-600" />
      case "decreasing": return <TrendingDown className="h-4 w-4 text-red-600" />
      case "stable": return <Activity className="h-4 w-4 text-blue-600" />
      case "improving": return <TrendingUp className="h-4 w-4 text-green-600" />
      default: return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  const handleCreateAlert = () => {
    if (!newAlert.message) return
    
    const alert = {
      id: Date.now().toString(),
      level: newAlert.level,
      message: newAlert.message,
      timestamp: new Date().toISOString()
    }
    
    setSystemHealth(prev => ({
      ...prev,
      alerts: [alert, ...prev.alerts]
    }))
    
    setNewAlert({ level: "info", message: "" })
    setIsAlertDialogOpen(false)
    toast({ title: "Alert Created", description: "System alert has been created successfully" })
  }

  const handleUpdateIncidentStatus = (incidentId: string, status: string) => {
    setSystemHealth(prev => ({
      ...prev,
      incidents: prev.incidents.map(incident => 
        incident.id === incidentId 
          ? { ...incident, status, resolvedAt: status === "resolved" ? new Date().toISOString() : undefined }
          : incident
      )
    }))
    
    toast({ title: "Incident Updated", description: `Incident status updated to ${status}` })
  }

  const formatUptime = (uptime: number) => {
    return `${uptime.toFixed(2)}%`
  }

  const formatResponseTime = (time: number) => {
    return `${time}ms`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">System Health & Monitoring</h2>
          <p className="text-gray-300">Real-time system status, performance metrics, and incident management</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Dialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Create Alert
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create System Alert</DialogTitle>
                <DialogDescription>Create a new system alert for monitoring purposes</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="alert-level">Alert Level</Label>
                  <Select value={newAlert.level} onValueChange={(value) => setNewAlert(prev => ({ ...prev, level: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="alert-message">Message</Label>
                  <Input
                    id="alert-message"
                    value={newAlert.message}
                    onChange={(e) => setNewAlert(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Enter alert message..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAlertDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleCreateAlert}>Create Alert</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Overall Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white/5 border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Overall Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${getStatusColor(systemHealth.overallStatus)}`} />
              <span className="text-lg font-semibold text-white capitalize">{systemHealth.overallStatus}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/5 border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Uptime</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold text-white">{formatUptime(systemHealth.uptime)}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/5 border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Active Connections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold text-white">{systemHealth.performance.activeConnections.toLocaleString()}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/5 border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Requests/sec</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold text-white">{systemHealth.performance.requestsPerSecond}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5 bg-white/10 border-white/20">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="incidents">Incidents</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Key Metrics */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Key Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(systemHealth.metrics).map(([key, metric]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">
                        {key === 'availability' ? `${metric.current}%` : 
                         key === 'errorRate' ? `${metric.current}%` : 
                         key === 'responseTime' ? `${metric.current}ms` : metric.current}
                      </span>
                      {getTrendIcon(metric.trend)}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Alerts */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Recent Alerts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {systemHealth.alerts.slice(0, 5).map((alert) => (
                  <div key={alert.id} className="flex items-center gap-3 p-2 rounded bg-white/5">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(alert.level)}`} />
                    <span className="text-sm text-gray-300 flex-1">{alert.message}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(alert.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Services Tab */}
        <TabsContent value="services" className="space-y-4">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Service Status</CardTitle>
              <CardDescription>Real-time status of all platform services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {systemHealth.services.map((service) => (
                  <div key={service.name} className="flex items-center justify-between p-3 rounded bg-white/5">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(service.status)}`} />
                      <span className="text-white font-medium">{service.name}</span>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-gray-300">
                        <span className="text-gray-500">Response:</span> {formatResponseTime(service.responseTime)}
                      </div>
                      <div className="text-gray-300">
                        <span className="text-gray-500">Uptime:</span> {formatUptime(service.uptime)}
                      </div>
                      <Badge variant={getStatusBadgeVariant(service.status)}>
                        {service.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* System Resources */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">System Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">CPU Usage</span>
                    <span className="text-white">{systemHealth.performance.cpuUsage}%</span>
                  </div>
                  <Progress value={systemHealth.performance.cpuUsage} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Memory Usage</span>
                    <span className="text-white">{systemHealth.performance.memoryUsage}%</span>
                  </div>
                  <Progress value={systemHealth.performance.memoryUsage} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Disk Usage</span>
                    <span className="text-white">{systemHealth.performance.diskUsage}%</span>
                  </div>
                  <Progress value={systemHealth.performance.diskUsage} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Network & Performance */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Network & Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded bg-white/5">
                    <div className="text-2xl font-bold text-white">{systemHealth.performance.networkLatency}ms</div>
                    <div className="text-sm text-gray-300">Network Latency</div>
                  </div>
                  <div className="text-center p-3 rounded bg-white/5">
                    <div className="text-2xl font-bold text-white">{systemHealth.performance.activeConnections.toLocaleString()}</div>
                    <div className="text-sm text-gray-300">Active Connections</div>
                  </div>
                  <div className="text-center p-3 rounded bg-white/5">
                    <div className="text-2xl font-bold text-white">{systemHealth.performance.requestsPerSecond}</div>
                    <div className="text-sm text-gray-300">Requests/sec</div>
                  </div>
                  <div className="text-center p-3 rounded bg-white/5">
                    <div className="text-2xl font-bold text-white">{formatUptime(systemHealth.uptime)}</div>
                    <div className="text-sm text-gray-300">Uptime</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Alerts Tab */}
        <TabsContent value="alerts" className="space-y-4">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">System Alerts</CardTitle>
              <CardDescription>Recent system alerts and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {systemHealth.alerts.map((alert) => (
                  <div key={alert.id} className="flex items-center gap-3 p-3 rounded bg-white/5">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(alert.level)}`} />
                    <div className="flex-1">
                      <p className="text-white">{alert.message}</p>
                      <p className="text-sm text-gray-400">
                        {new Date(alert.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <Badge variant={getStatusBadgeVariant(alert.level)}>
                      {alert.level}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Incidents Tab */}
        <TabsContent value="incidents" className="space-y-4">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Incident Management</CardTitle>
              <CardDescription>Track and manage system incidents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {systemHealth.incidents.map((incident) => (
                  <div key={incident.id} className="p-3 rounded bg-white/5">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-medium">{incident.title}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant={getStatusBadgeVariant(incident.status)}>
                          {incident.status}
                        </Badge>
                        <span className={`text-sm font-medium ${getSeverityColor(incident.severity)}`}>
                          {incident.severity}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>Created: {new Date(incident.createdAt).toLocaleString()}</span>
                      {incident.resolvedAt && (
                        <span>Resolved: {new Date(incident.resolvedAt).toLocaleString()}</span>
                      )}
                    </div>
                    {incident.status !== "resolved" && (
                      <div className="mt-3 flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleUpdateIncidentStatus(incident.id, "investigating")}
                        >
                          Investigating
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleUpdateIncidentStatus(incident.id, "resolved")}
                        >
                          Mark Resolved
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
