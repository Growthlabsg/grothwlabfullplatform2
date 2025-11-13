"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Zap,
  Cpu,
  HardDrive,
  Network,
  Database,
  Server,
  Activity,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw,
  Settings,
  Bell,
  BarChart3,
  Gauge,
  Thermometer,
  Wifi,
  Globe,
  Shield,
  Eye,
  Download,
  Upload,
  Play,
  Pause,
  RotateCcw,
  Trash2
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PerformanceMetric {
  id: string
  name: string
  value: number
  unit: string
  status: "normal" | "warning" | "critical" | "offline"
  trend: "up" | "down" | "stable"
  threshold: {
    warning: number
    critical: number
  }
  history: Array<{
    timestamp: string
    value: number
  }>
}

interface SystemAlert {
  id: string
  type: "info" | "warning" | "error" | "critical"
  message: string
  timestamp: string
  acknowledged: boolean
  component: string
  severity: "low" | "medium" | "high" | "critical"
}

const mockMetrics: PerformanceMetric[] = [
  {
    id: "cpu-usage",
    name: "CPU Usage",
    value: 23.5,
    unit: "%",
    status: "normal",
    trend: "up",
    threshold: { warning: 70, critical: 90 },
    history: Array.from({ length: 24 }, (_, i) => ({
      timestamp: new Date(Date.now() - (23 - i) * 3600000).toISOString(),
      value: Math.random() * 50 + 10
    }))
  },
  {
    id: "memory-usage",
    name: "Memory Usage",
    value: 67.2,
    unit: "%",
    status: "warning",
    trend: "up",
    threshold: { warning: 75, critical: 90 },
    history: Array.from({ length: 24 }, (_, i) => ({
      timestamp: new Date(Date.now() - (23 - i) * 3600000).toISOString(),
      value: Math.random() * 30 + 50
    }))
  },
  {
    id: "disk-usage",
    name: "Disk Usage",
    value: 45.8,
    unit: "%",
    status: "normal",
    trend: "stable",
    threshold: { warning: 80, critical: 95 },
    history: Array.from({ length: 24 }, (_, i) => ({
      timestamp: new Date(Date.now() - (23 - i) * 3600000).toISOString(),
      value: Math.random() * 20 + 40
    }))
  },
  {
    id: "network-throughput",
    name: "Network Throughput",
    value: 125.6,
    unit: "Mbps",
    status: "normal",
    trend: "down",
    threshold: { warning: 500, critical: 800 },
    history: Array.from({ length: 24 }, (_, i) => ({
      timestamp: new Date(Date.now() - (23 - i) * 3600000).toISOString(),
      value: Math.random() * 200 + 100
    }))
  },
  {
    id: "database-connections",
    name: "Database Connections",
    value: 89,
    unit: "connections",
    status: "normal",
    trend: "stable",
    threshold: { warning: 150, critical: 200 },
    history: Array.from({ length: 24 }, (_, i) => ({
      timestamp: new Date(Date.now() - (23 - i) * 3600000).toISOString(),
      value: Math.random() * 50 + 70
    }))
  },
  {
    id: "response-time",
    name: "API Response Time",
    value: 245,
    unit: "ms",
    status: "normal",
    trend: "up",
    threshold: { warning: 500, critical: 1000 },
    history: Array.from({ length: 24 }, (_, i) => ({
      timestamp: new Date(Date.now() - (23 - i) * 3600000).toISOString(),
      value: Math.random() * 300 + 150
    }))
  }
]

const mockAlerts: SystemAlert[] = [
  {
    id: "1",
    type: "warning",
    message: "Memory usage approaching threshold (67.2%)",
    timestamp: "2024-01-20T10:30:00Z",
    acknowledged: false,
    component: "Memory",
    severity: "medium"
  },
  {
    id: "2",
    type: "info",
    message: "Database backup completed successfully",
    timestamp: "2024-01-20T09:15:00Z",
    acknowledged: true,
    component: "Database",
    severity: "low"
  },
  {
    id: "3",
    type: "error",
    message: "High CPU usage detected on server-02",
    timestamp: "2024-01-20T08:45:00Z",
    acknowledged: false,
    component: "CPU",
    severity: "high"
  },
  {
    id: "4",
    type: "critical",
    message: "Database connection pool exhausted",
    timestamp: "2024-01-20T07:30:00Z",
    acknowledged: false,
    component: "Database",
    severity: "critical"
  }
]

const statusColors = {
  normal: "bg-green-100 text-green-800",
  warning: "bg-yellow-100 text-yellow-800",
  critical: "bg-red-100 text-red-800",
  offline: "bg-gray-100 text-gray-800"
}

const alertColors = {
  info: "bg-blue-100 text-blue-800",
  warning: "bg-yellow-100 text-yellow-800",
  error: "bg-orange-100 text-orange-800",
  critical: "bg-red-100 text-red-800"
}

export function PerformanceMonitoring() {
  const { toast } = useToast()
  const [metrics, setMetrics] = useState<PerformanceMetric[]>(mockMetrics)
  const [alerts, setAlerts] = useState<SystemAlert[]>(mockAlerts)
  const [isMonitoring, setIsMonitoring] = useState(true)
  const [selectedMetric, setSelectedMetric] = useState<PerformanceMetric | null>(null)
  const [showMetricDialog, setShowMetricDialog] = useState(false)
  const [timeRange, setTimeRange] = useState("24h")

  // Simulate real-time updates
  useEffect(() => {
    if (!isMonitoring) return

    const interval = setInterval(() => {
      setMetrics(prevMetrics => 
        prevMetrics.map(metric => ({
          ...metric,
          value: metric.value + (Math.random() - 0.5) * 10,
          history: [
            ...metric.history.slice(1),
            {
              timestamp: new Date().toISOString(),
              value: metric.value + (Math.random() - 0.5) * 10
            }
          ]
        }))
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [isMonitoring])

  const getStatusColor = (metric: PerformanceMetric) => {
    if (metric.value >= metric.threshold.critical) return "critical"
    if (metric.value >= metric.threshold.warning) return "warning"
    return "normal"
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-red-500" />
      case "down":
        return <TrendingDown className="w-4 h-4 text-green-500" />
      default:
        return <Activity className="w-4 h-4 text-gray-500" />
    }
  }

  const handleAcknowledgeAlert = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ))
    toast({
      title: "Alert Acknowledged",
      description: "Alert has been marked as acknowledged",
    })
  }

  const handleClearAlert = (alertId: string) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId))
    toast({
      title: "Alert Cleared",
      description: "Alert has been removed from the list",
    })
  }

  const performanceStats = {
    totalMetrics: metrics.length,
    normal: metrics.filter(m => getStatusColor(m) === "normal").length,
    warning: metrics.filter(m => getStatusColor(m) === "warning").length,
    critical: metrics.filter(m => getStatusColor(m) === "critical").length,
    activeAlerts: alerts.filter(a => !a.acknowledged).length,
    uptime: "99.9%"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Performance Monitoring</h2>
          <p className="text-muted-foreground">
            Real-time system performance metrics and monitoring
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={isMonitoring ? "default" : "outline"}
            onClick={() => setIsMonitoring(!isMonitoring)}
          >
            {isMonitoring ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pause Monitoring
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Start Monitoring
              </>
            )}
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Metrics</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceStats.totalMetrics}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Normal</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{performanceStats.normal}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Warning</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{performanceStats.warning}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{performanceStats.critical}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{performanceStats.activeAlerts}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uptime</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{performanceStats.uptime}</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="metrics" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
            <TabsTrigger value="alerts">System Alerts</TabsTrigger>
            <TabsTrigger value="logs">System Logs</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center space-x-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">1 Hour</SelectItem>
                <SelectItem value="6h">6 Hours</SelectItem>
                <SelectItem value="24h">24 Hours</SelectItem>
                <SelectItem value="7d">7 Days</SelectItem>
                <SelectItem value="30d">30 Days</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="metrics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {metrics.map((metric) => {
              const status = getStatusColor(metric)
              const progressValue = (metric.value / metric.threshold.critical) * 100
              
              return (
                <Card 
                  key={metric.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => {
                    setSelectedMetric(metric)
                    setShowMetricDialog(true)
                  }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{metric.name}</CardTitle>
                      {getTrendIcon(metric.trend)}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={statusColors[status]}>
                        {status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {metric.threshold.warning}{metric.unit} / {metric.threshold.critical}{metric.unit}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">
                        {metric.value.toFixed(1)}{metric.unit}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Current
                      </span>
                    </div>
                    
                    <Progress value={progressValue} className="h-2" />
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>0{metric.unit}</span>
                      <span>{metric.threshold.critical}{metric.unit}</span>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
              <CardDescription>
                Active system alerts and notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`flex items-center justify-between p-4 rounded-lg border ${
                      alert.acknowledged ? 'bg-gray-50' : 'bg-white'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        alertColors[alert.type].split(' ')[0]
                      }`} />
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{alert.message}</span>
                          <Badge className={alertColors[alert.type]}>
                            {alert.severity}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {alert.component} • {new Date(alert.timestamp).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {!alert.acknowledged && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAcknowledgeAlert(alert.id)}
                        >
                          Acknowledge
                        </Button>
                      )}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Clear Alert</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to clear this alert? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleClearAlert(alert.id)}>
                              Clear Alert
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
                
                {alerts.length === 0 && (
                  <div className="text-center py-8">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium">No Active Alerts</h3>
                    <p className="text-muted-foreground">
                      All systems are running normally
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Logs</CardTitle>
              <CardDescription>
                Recent system activity and performance logs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Array.from({ length: 10 }, (_, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <div>
                        <div className="font-medium">Performance metric updated</div>
                        <div className="text-sm text-muted-foreground">
                          CPU usage: 23.5% → 24.1%
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(Date.now() - i * 60000).toLocaleTimeString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Metric Details Dialog */}
      <Dialog open={showMetricDialog} onOpenChange={setShowMetricDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedMetric?.name} - Performance Details</DialogTitle>
            <DialogDescription>
              Detailed performance metrics and historical data
            </DialogDescription>
          </DialogHeader>
          {selectedMetric && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">{selectedMetric.value.toFixed(1)}{selectedMetric.unit}</div>
                  <div className="text-sm text-muted-foreground">Current Value</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">{selectedMetric.threshold.warning}{selectedMetric.unit}</div>
                  <div className="text-sm text-muted-foreground">Warning Threshold</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">{selectedMetric.threshold.critical}{selectedMetric.unit}</div>
                  <div className="text-sm text-muted-foreground">Critical Threshold</div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Historical Data (Last 24 Hours)</h4>
                <div className="h-64 bg-gray-50 rounded-lg p-4">
                  <div className="text-center text-muted-foreground">
                    Chart visualization would be implemented here
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Recent History</h4>
                <div className="max-h-40 overflow-y-auto space-y-2">
                  {selectedMetric.history.slice(-10).reverse().map((point, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">{point.value.toFixed(1)}{selectedMetric.unit}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(point.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMetricDialog(false)}>
              Close
            </Button>
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 