"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Activity, 
  Server, 
  Database, 
  Wifi, 
  HardDrive, 
  Cpu, 
  MemoryStick, 
  Network, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Zap, 
  Globe, 
  Shield, 
  RefreshCw, 
  Download, 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  Settings, 
  Bell, 
  Monitor, 
  Smartphone, 
  Users, 
  FileText, 
  Cloud,
  BarChart3,
  Timer,
  Target,
  Gauge
} from "lucide-react"

interface SystemMetric {
  name: string
  value: number
  unit: string
  status: "healthy" | "warning" | "critical"
  trend: "up" | "down" | "stable"
  threshold: { warning: number; critical: number }
}

interface Service {
  name: string
  status: "running" | "stopped" | "error"
  uptime: string
  memory: number
  cpu: number
  version: string
  lastRestart: string
}

interface Alert {
  id: string
  type: "info" | "warning" | "error" | "critical"
  title: string
  message: string
  timestamp: string
  acknowledged: boolean
  service?: string
}

export function ComprehensiveSystemMonitoring() {
  const [timeRange, setTimeRange] = useState("1h")
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [autoRefresh, setAutoRefresh] = useState(true)

  // System metrics
  const [systemMetrics, setSystemMetrics] = useState<SystemMetric[]>([
    {
      name: "CPU Usage",
      value: 23.5,
      unit: "%",
      status: "healthy",
      trend: "stable",
      threshold: { warning: 70, critical: 90 }
    },
    {
      name: "Memory Usage",
      value: 45.2,
      unit: "%",
      status: "healthy",
      trend: "up",
      threshold: { warning: 80, critical: 95 }
    },
    {
      name: "Disk Usage",
      value: 67.8,
      unit: "%",
      status: "warning",
      trend: "up",
      threshold: { warning: 80, critical: 95 }
    },
    {
      name: "Network I/O",
      value: 12.3,
      unit: "MB/s",
      status: "healthy",
      trend: "stable",
      threshold: { warning: 100, critical: 150 }
    },
    {
      name: "Response Time",
      value: 145,
      unit: "ms",
      status: "healthy",
      trend: "down",
      threshold: { warning: 500, critical: 1000 }
    },
    {
      name: "Error Rate",
      value: 0.02,
      unit: "%",
      status: "healthy",
      trend: "stable",
      threshold: { warning: 1, critical: 5 }
    },
    {
      name: "Throughput",
      value: 2340,
      unit: "req/min",
      status: "healthy",
      trend: "up",
      threshold: { warning: 5000, critical: 8000 }
    },
    {
      name: "Queue Depth",
      value: 15,
      unit: "jobs",
      status: "healthy",
      trend: "stable",
      threshold: { warning: 100, critical: 500 }
    }
  ])

  // Services
  const [services, setServices] = useState<Service[]>([
    {
      name: "Web Server (Next.js)",
      status: "running",
      uptime: "7d 14h 23m",
      memory: 512,
      cpu: 23.5,
      version: "14.2.5",
      lastRestart: "2024-01-13 09:15:00"
    },
    {
      name: "Database (PostgreSQL)",
      status: "running",
      uptime: "15d 8h 45m",
      memory: 1024,
      cpu: 15.2,
      version: "15.4",
      lastRestart: "2024-01-05 14:30:00"
    },
    {
      name: "Redis Cache",
      status: "running",
      uptime: "12d 6h 12m",
      memory: 256,
      cpu: 5.8,
      version: "7.2.0",
      lastRestart: "2024-01-08 11:45:00"
    },
    {
      name: "Socket.IO Server",
      status: "running",
      uptime: "7d 14h 20m",
      memory: 128,
      cpu: 8.3,
      version: "4.7.4",
      lastRestart: "2024-01-13 09:18:00"
    },
    {
      name: "Background Jobs",
      status: "running",
      uptime: "5d 22h 15m",
      memory: 64,
      cpu: 3.2,
      version: "1.0.0",
      lastRestart: "2024-01-15 02:30:00"
    },
    {
      name: "LibreTranslate",
      status: "error",
      uptime: "0m",
      memory: 0,
      cpu: 0,
      version: "1.3.11",
      lastRestart: "2024-01-20 08:00:00"
    }
  ])

  // Alerts
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      type: "warning",
      title: "High Disk Usage",
      message: "Disk usage has reached 67.8%. Consider cleaning up or adding more storage.",
      timestamp: "2024-01-20 15:30:00",
      acknowledged: false,
      service: "File System"
    },
    {
      id: "2",
      type: "error",
      title: "LibreTranslate Service Down",
      message: "Translation service is not responding. Using fallback mock service.",
      timestamp: "2024-01-20 14:45:00",
      acknowledged: false,
      service: "LibreTranslate"
    },
    {
      id: "3",
      type: "info",
      title: "Scheduled Backup Completed",
      message: "Daily database backup completed successfully. 2.1GB backed up.",
      timestamp: "2024-01-20 02:00:00",
      acknowledged: true,
      service: "Backup Service"
    },
    {
      id: "4",
      type: "warning",
      title: "High Memory Usage",
      message: "Memory usage has increased to 45.2%. Monitor for potential leaks.",
      timestamp: "2024-01-20 13:15:00",
      acknowledged: false,
      service: "Web Server"
    }
  ])

  // Performance data
  const [performanceData, setPerformanceData] = useState({
    requestsPerSecond: 39.2,
    averageResponseTime: 145,
    concurrentUsers: 1247,
    errorRate: 0.02,
    cacheHitRate: 94.7,
    databaseConnections: 24,
    queueSize: 15,
    bandwidthUsage: 67.3
  })

  // Initialize timestamp on client side only
  useEffect(() => {
    setLastUpdated(new Date())
  }, [])

  // Auto refresh
  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(() => {
      refreshData()
    }, 30000) // Refresh every 30 seconds

    return () => clearInterval(interval)
  }, [autoRefresh])

  const refreshData = () => {
    setIsLoading(true)
    
    // Simulate data refresh with random variations
    setTimeout(() => {
      setSystemMetrics(prev => prev.map(metric => ({
        ...metric,
        value: Math.max(0, metric.value + (Math.random() - 0.5) * 5),
        trend: Math.random() > 0.5 ? "up" : Math.random() > 0.5 ? "down" : "stable"
      })))

      setPerformanceData(prev => ({
        ...prev,
        requestsPerSecond: Math.max(0, prev.requestsPerSecond + (Math.random() - 0.5) * 5),
        averageResponseTime: Math.max(50, prev.averageResponseTime + (Math.random() - 0.5) * 20),
        concurrentUsers: Math.max(0, prev.concurrentUsers + Math.floor((Math.random() - 0.5) * 100)),
        errorRate: Math.max(0, prev.errorRate + (Math.random() - 0.5) * 0.01)
      }))

      setLastUpdated(new Date())
      setIsLoading(false)
    }, 1000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
      case "running":
        return "text-green-600"
      case "warning":
        return "text-yellow-600"
      case "critical":
      case "error":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
      case "running":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "critical":
      case "error":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3 text-green-600" />
      case "down":
        return <TrendingDown className="h-3 w-3 text-red-600" />
      default:
        return <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
    }
  }

  const acknowledgeAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ))
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "info":
        return <CheckCircle className="h-4 w-4 text-blue-600" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "error":
      case "critical":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Bell className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">System Monitoring</h2>
          <p className="text-muted-foreground">
            Real-time system health, performance metrics, and service monitoring
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5m">5m</SelectItem>
              <SelectItem value="15m">15m</SelectItem>
              <SelectItem value="1h">1h</SelectItem>
              <SelectItem value="6h">6h</SelectItem>
              <SelectItem value="24h">24h</SelectItem>
            </SelectContent>
          </Select>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={autoRefresh ? "bg-green-50 border-green-200" : ""}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${autoRefresh ? "animate-spin" : ""}`} />
            Auto Refresh
          </Button>
          
          <Button variant="outline" onClick={refreshData} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          
          <div className="text-xs text-muted-foreground">
            Last updated: {lastUpdated ? lastUpdated.toLocaleTimeString() : "Loading..."}
          </div>
        </div>
      </div>

      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {services.filter(s => s.status === "running").length}/{services.length}
                </div>
                <div className="text-sm text-muted-foreground">Services Running</div>
              </div>
              <Server className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">{performanceData.requestsPerSecond.toFixed(1)}</div>
                <div className="text-sm text-muted-foreground">Requests/sec</div>
              </div>
              <Activity className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">{performanceData.averageResponseTime}ms</div>
                <div className="text-sm text-muted-foreground">Avg Response Time</div>
              </div>
              <Timer className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-600">
                  {alerts.filter(a => !a.acknowledged).length}
                </div>
                <div className="text-sm text-muted-foreground">Active Alerts</div>
              </div>
              <Bell className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monitoring Tabs */}
      <Tabs defaultValue="metrics" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="metrics">System Metrics</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        {/* System Metrics Tab */}
        <TabsContent value="metrics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {systemMetrics.map((metric, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow duration-200">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(metric.status)}
                      {getTrendIcon(metric.trend)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${getStatusColor(metric.status)}`}>
                    {metric.value.toFixed(metric.unit === "%" ? 1 : 0)}{metric.unit}
                  </div>
                  <Progress 
                    value={metric.unit === "%" ? metric.value : (metric.value / metric.threshold.critical) * 100} 
                    className="mt-2" 
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    Warning: {metric.threshold.warning}{metric.unit} | Critical: {metric.threshold.critical}{metric.unit}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Services Tab */}
        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Service Status</CardTitle>
              <CardDescription>Monitor all platform services and their health</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(service.status)}
                        <div>
                          <div className="font-medium">{service.name}</div>
                          <div className="text-sm text-muted-foreground">v{service.version}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-sm">
                        <div className="font-medium">Uptime</div>
                        <div className="text-muted-foreground">{service.uptime}</div>
                      </div>
                      <div className="text-sm">
                        <div className="font-medium">Memory</div>
                        <div className="text-muted-foreground">{service.memory}MB</div>
                      </div>
                      <div className="text-sm">
                        <div className="font-medium">CPU</div>
                        <div className="text-muted-foreground">{service.cpu}%</div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                        {service.status === "running" ? (
                          <Button variant="outline" size="sm">
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm">
                            <Zap className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Concurrent Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{performanceData.concurrentUsers}</div>
                <div className="text-xs text-muted-foreground">Active sessions</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Cache Hit Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{performanceData.cacheHitRate}%</div>
                <div className="text-xs text-muted-foreground">Cache efficiency</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">DB Connections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{performanceData.databaseConnections}</div>
                <div className="text-xs text-muted-foreground">Active connections</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Queue Size</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{performanceData.queueSize}</div>
                <div className="text-xs text-muted-foreground">Pending jobs</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
              <CardDescription>Real-time performance metrics and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Response Time</span>
                      <span className="text-sm text-muted-foreground">{performanceData.averageResponseTime}ms</span>
                    </div>
                    <Progress value={(performanceData.averageResponseTime / 500) * 100} />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Error Rate</span>
                      <span className="text-sm text-muted-foreground">{performanceData.errorRate.toFixed(3)}%</span>
                    </div>
                    <Progress value={performanceData.errorRate * 20} />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Bandwidth Usage</span>
                      <span className="text-sm text-muted-foreground">{performanceData.bandwidthUsage}%</span>
                    </div>
                    <Progress value={performanceData.bandwidthUsage} />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Requests per Second</span>
                      <span className="text-sm text-muted-foreground">{performanceData.requestsPerSecond.toFixed(1)}</span>
                    </div>
                    <Progress value={(performanceData.requestsPerSecond / 100) * 100} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Alerts Tab */}
        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
              <CardDescription>Monitor system alerts and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div 
                    key={alert.id} 
                    className={`p-4 border rounded-lg ${
                      alert.acknowledged ? "bg-gray-50 opacity-60" : "bg-white"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        {getAlertIcon(alert.type)}
                        <div>
                          <div className="font-medium">{alert.title}</div>
                          <div className="text-sm text-muted-foreground mt-1">{alert.message}</div>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span>{alert.timestamp}</span>
                            {alert.service && <span>Service: {alert.service}</span>}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge variant={alert.acknowledged ? "secondary" : "destructive"}>
                          {alert.acknowledged ? "Acknowledged" : alert.type}
                        </Badge>
                        {!alert.acknowledged && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => acknowledgeAlert(alert.id)}
                          >
                            Acknowledge
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="h-5 w-5" />
                  CPU Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600 mb-2">23.5%</div>
                <Progress value={23.5} className="mb-2" />
                <div className="text-sm text-muted-foreground">4 cores available</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MemoryStick className="h-5 w-5" />
                  Memory Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600 mb-2">45.2%</div>
                <Progress value={45.2} className="mb-2" />
                <div className="text-sm text-muted-foreground">8GB available</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HardDrive className="h-5 w-5" />
                  Disk Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-600 mb-2">67.8%</div>
                <Progress value={67.8} className="mb-2" />
                <div className="text-sm text-muted-foreground">3.2TB total</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Network Activity</CardTitle>
              <CardDescription>Real-time network monitoring and bandwidth usage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Inbound Traffic</span>
                    <span className="text-sm text-muted-foreground">8.3 MB/s</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Outbound Traffic</span>
                    <span className="text-sm text-muted-foreground">12.7 MB/s</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Total Bandwidth</span>
                    <span className="text-sm text-muted-foreground">21.0 MB/s</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Active Connections</span>
                    <span className="text-sm text-muted-foreground">1,247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">WebSocket Connections</span>
                    <span className="text-sm text-muted-foreground">892</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">API Requests</span>
                    <span className="text-sm text-muted-foreground">2,340/min</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
