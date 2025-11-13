"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Lock, 
  Unlock, 
  Key, 
  Activity, 
  Globe, 
  Users, 
  Clock, 
  TrendingUp, 
  TrendingDown, 
  Zap, 
  RefreshCw, 
  Download, 
  Filter, 
  Search, 
  Bell, 
  Wifi, 
  Server, 
  Database, 
  FileText, 
  Ban, 
  UserX, 
  Target, 
  Radar,
  Skull,
  Bug,
  Fingerprint,
  Settings,
  Monitor
} from "lucide-react"

interface SecurityThreat {
  id: string
  type: "malware" | "phishing" | "ddos" | "brute_force" | "injection" | "unauthorized_access"
  severity: "low" | "medium" | "high" | "critical"
  title: string
  description: string
  source: string
  targetResource: string
  timestamp: string
  status: "active" | "investigating" | "resolved" | "false_positive"
  affectedUsers: number
  riskScore: number
}

interface SecurityEvent {
  id: string
  type: "login" | "logout" | "permission_change" | "data_access" | "api_call" | "file_upload"
  user: string
  action: string
  resource: string
  ip: string
  location: string
  timestamp: string
  status: "success" | "failed" | "suspicious"
  riskLevel: "low" | "medium" | "high"
}

interface SecurityMetric {
  name: string
  value: number
  unit: string
  trend: "up" | "down" | "stable"
  status: "good" | "warning" | "critical"
  description: string
}

export function AdvancedSecurityMonitoring() {
  const [timeRange, setTimeRange] = useState("24h")
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  // Security metrics
  const [securityMetrics, setSecurityMetrics] = useState<SecurityMetric[]>([
    {
      name: "Security Score",
      value: 95,
      unit: "/100",
      trend: "stable",
      status: "good",
      description: "Overall platform security health"
    },
    {
      name: "Failed Login Attempts",
      value: 23,
      unit: "",
      trend: "down",
      status: "good",
      description: "Login failures in last 24h"
    },
    {
      name: "Blocked Threats",
      value: 156,
      unit: "",
      trend: "up",
      status: "warning",
      description: "Threats blocked this week"
    },
    {
      name: "Vulnerability Score",
      value: 2.1,
      unit: "/10",
      trend: "down",
      status: "good",
      description: "Known vulnerabilities severity"
    },
    {
      name: "Data Breach Risk",
      value: 15,
      unit: "%",
      trend: "stable",
      status: "good",
      description: "Risk assessment score"
    },
    {
      name: "SSL Certificate Health",
      value: 100,
      unit: "%",
      trend: "stable",
      status: "good",
      description: "Certificate validity status"
    }
  ])

  // Security threats
  const [threats, setThreats] = useState<SecurityThreat[]>([
    {
      id: "1",
      type: "brute_force",
      severity: "high",
      title: "Brute Force Attack Detected",
      description: "Multiple failed login attempts from IP 192.168.1.100",
      source: "192.168.1.100",
      targetResource: "/api/auth/login",
      timestamp: "2024-01-20 15:45:00",
      status: "active",
      affectedUsers: 0,
      riskScore: 85
    },
    {
      id: "2",
      type: "injection",
      severity: "critical",
      title: "SQL Injection Attempt",
      description: "Suspicious SQL query patterns detected in user input",
      source: "203.45.67.89",
      targetResource: "/api/users/search",
      timestamp: "2024-01-20 14:30:00",
      status: "investigating",
      affectedUsers: 1,
      riskScore: 95
    },
    {
      id: "3",
      type: "unauthorized_access",
      severity: "medium",
      title: "Unusual Admin Access Pattern",
      description: "Admin user accessing system from new location",
      source: "45.123.78.90",
      targetResource: "/super-admin",
      timestamp: "2024-01-20 13:15:00",
      status: "resolved",
      affectedUsers: 0,
      riskScore: 65
    },
    {
      id: "4",
      type: "ddos",
      severity: "high",
      title: "DDoS Attack Mitigated",
      description: "High volume of requests detected and blocked",
      source: "Multiple IPs",
      targetResource: "/api/*",
      timestamp: "2024-01-20 12:00:00",
      status: "resolved",
      affectedUsers: 0,
      riskScore: 80
    }
  ])

  // Security events
  const [events, setEvents] = useState<SecurityEvent[]>([
    {
      id: "1",
      type: "login",
      user: "admin@growthlab.sg",
      action: "Admin login",
      resource: "/super-admin",
      ip: "203.45.67.89",
      location: "Singapore",
      timestamp: "2024-01-20 16:00:00",
      status: "success",
      riskLevel: "low"
    },
    {
      id: "2",
      type: "permission_change",
      user: "john.doe@example.com",
      action: "Role change: user -> startup",
      resource: "/api/users/update-role",
      ip: "192.168.1.50",
      location: "Malaysia",
      timestamp: "2024-01-20 15:30:00",
      status: "success",
      riskLevel: "medium"
    },
    {
      id: "3",
      type: "login",
      user: "suspicious@email.com",
      action: "Failed login attempt",
      resource: "/api/auth/login",
      ip: "192.168.1.100",
      location: "Unknown",
      timestamp: "2024-01-20 15:45:00",
      status: "failed",
      riskLevel: "high"
    },
    {
      id: "4",
      type: "data_access",
      user: "sarah.chen@venture.com",
      action: "Bulk user data export",
      resource: "/api/admin/export-users",
      ip: "10.0.0.15",
      location: "Singapore",
      timestamp: "2024-01-20 14:15:00",
      status: "success",
      riskLevel: "medium"
    },
    {
      id: "5",
      type: "api_call",
      user: "api_user_123",
      action: "High frequency API calls",
      resource: "/api/analytics",
      ip: "45.67.89.12",
      location: "Thailand",
      timestamp: "2024-01-20 13:45:00",
      status: "suspicious",
      riskLevel: "high"
    }
  ])

  // Initialize timestamp on client side only
  useEffect(() => {
    setLastUpdated(new Date())
  }, [])

  const refreshData = () => {
    setIsLoading(true)
    setTimeout(() => {
      // Simulate data refresh
      setSecurityMetrics(prev => prev.map(metric => ({
        ...metric,
        value: Math.max(0, metric.value + (Math.random() - 0.5) * 5),
        trend: Math.random() > 0.5 ? "up" : Math.random() > 0.5 ? "down" : "stable"
      })))
      setLastUpdated(new Date())
      setIsLoading(false)
    }, 1000)
  }

  const getThreatSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-blue-100 text-blue-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "critical":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getThreatStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-red-100 text-red-800"
      case "investigating":
        return "bg-yellow-100 text-yellow-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      case "false_positive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case "low":
        return "text-green-600"
      case "medium":
        return "text-yellow-600"
      case "high":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getEventStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "suspicious":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getThreatIcon = (type: string) => {
    switch (type) {
      case "malware":
        return <Bug className="h-5 w-5 text-red-600" />
      case "phishing":
        return <Target className="h-5 w-5 text-orange-600" />
      case "ddos":
        return <Zap className="h-5 w-5 text-purple-600" />
      case "brute_force":
        return <Key className="h-5 w-5 text-yellow-600" />
      case "injection":
        return <Skull className="h-5 w-5 text-red-600" />
      case "unauthorized_access":
        return <Unlock className="h-5 w-5 text-orange-600" />
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Advanced Security Monitoring</h2>
          <p className="text-muted-foreground">
            Comprehensive security monitoring, threat detection, and incident response
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">1h</SelectItem>
              <SelectItem value="6h">6h</SelectItem>
              <SelectItem value="24h">24h</SelectItem>
              <SelectItem value="7d">7d</SelectItem>
              <SelectItem value="30d">30d</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" onClick={refreshData} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          
          <div className="text-xs text-muted-foreground">
            Last updated: {lastUpdated ? lastUpdated.toLocaleTimeString() : "Loading..."}
          </div>
        </div>
      </div>

      {/* Security Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {securityMetrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
                <Shield className={`h-4 w-4 ${
                  metric.status === "good" ? "text-green-600" :
                  metric.status === "warning" ? "text-yellow-600" : "text-red-600"
                }`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${
                metric.status === "good" ? "text-green-600" :
                metric.status === "warning" ? "text-yellow-600" : "text-red-600"
              }`}>
                {metric.value}{metric.unit}
              </div>
              <div className="flex items-center text-xs mt-1">
                {metric.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                ) : metric.trend === "down" ? (
                  <TrendingDown className="h-3 w-3 mr-1 text-red-600" />
                ) : (
                  <div className="w-3 h-3 bg-gray-400 rounded-full mr-1"></div>
                )}
                <span className="text-muted-foreground">{metric.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Active Threats Alert */}
      {threats.filter(t => t.status === "active").length > 0 && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>{threats.filter(t => t.status === "active").length} active threats</strong> require immediate attention. 
            Review the threats tab for details and recommended actions.
          </AlertDescription>
        </Alert>
      )}

      {/* Security Tabs */}
      <Tabs defaultValue="threats" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="threats">Threats</TabsTrigger>
          <TabsTrigger value="events">Security Events</TabsTrigger>
          <TabsTrigger value="access">Access Control</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        {/* Threats Tab */}
        <TabsContent value="threats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Radar className="h-5 w-5" />
                Active Security Threats
              </CardTitle>
              <CardDescription>
                Real-time threat detection and incident management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {threats.map((threat) => (
                  <div key={threat.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        {getThreatIcon(threat.type)}
                        <div className="flex-1">
                          <div className="font-semibold text-lg">{threat.title}</div>
                          <div className="text-sm text-muted-foreground mt-1">{threat.description}</div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 text-sm">
                            <div>
                              <span className="font-medium">Source:</span>
                              <div className="text-muted-foreground">{threat.source}</div>
                            </div>
                            <div>
                              <span className="font-medium">Target:</span>
                              <div className="text-muted-foreground font-mono text-xs">{threat.targetResource}</div>
                            </div>
                            <div>
                              <span className="font-medium">Timestamp:</span>
                              <div className="text-muted-foreground">{threat.timestamp}</div>
                            </div>
                            <div>
                              <span className="font-medium">Risk Score:</span>
                              <div className={getRiskLevelColor(threat.severity)}>{threat.riskScore}/100</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Badge className={getThreatSeverityColor(threat.severity)}>
                          {threat.severity}
                        </Badge>
                        <Badge className={getThreatStatusColor(threat.status)}>
                          {threat.status.replace('_', ' ')}
                        </Badge>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {threat.status === "active" && (
                            <Button variant="outline" size="sm">
                              <Ban className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Events Tab */}
        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Security Event Log
              </CardTitle>
              <CardDescription>
                Detailed log of all security-related events and user activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {events.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-4">
                      {getEventStatusIcon(event.status)}
                      <div>
                        <div className="font-medium">{event.action}</div>
                        <div className="text-sm text-muted-foreground">
                          User: {event.user} | Resource: <span className="font-mono text-xs">{event.resource}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {event.timestamp} | IP: {event.ip} | Location: {event.location}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Badge className={`${getRiskLevelColor(event.riskLevel)} bg-transparent border`}>
                        {event.riskLevel} risk
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Access Control Tab */}
        <TabsContent value="access" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Fingerprint className="h-5 w-5" />
                  Authentication Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Two-Factor Authentication</span>
                  <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Password Policy</span>
                  <Badge className="bg-green-100 text-green-800">Strong</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Session Timeout</span>
                  <Badge className="bg-blue-100 text-blue-800">30 minutes</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Login Rate Limiting</span>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  API Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">API Rate Limiting</span>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">API Key Rotation</span>
                  <Badge className="bg-blue-100 text-blue-800">90 days</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Request Validation</span>
                  <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">CORS Policy</span>
                  <Badge className="bg-green-100 text-green-800">Configured</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Access Patterns
              </CardTitle>
              <CardDescription>Monitor unusual user access patterns and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">1,247</div>
                    <div className="text-sm text-muted-foreground">Active Sessions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">23</div>
                    <div className="text-sm text-muted-foreground">Admin Sessions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">5</div>
                    <div className="text-sm text-muted-foreground">Suspicious Logins</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">2</div>
                    <div className="text-sm text-muted-foreground">Blocked IPs</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Compliance Tab */}
        <TabsContent value="compliance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>GDPR Compliance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Data Processing Consent</span>
                  <Badge className="bg-green-100 text-green-800">Compliant</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Data Retention Policy</span>
                  <Badge className="bg-green-100 text-green-800">Implemented</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Right to be Forgotten</span>
                  <Badge className="bg-green-100 text-green-800">Available</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Data Breach Reporting</span>
                  <Badge className="bg-green-100 text-green-800">Automated</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Standards</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">ISO 27001</span>
                  <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">SOC 2 Type II</span>
                  <Badge className="bg-green-100 text-green-800">Certified</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">PCI DSS</span>
                  <Badge className="bg-green-100 text-green-800">Compliant</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">OWASP Top 10</span>
                  <Badge className="bg-green-100 text-green-800">Mitigated</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Security Reports
              </CardTitle>
              <CardDescription>Generate and download comprehensive security reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Shield className="h-8 w-8 text-blue-600" />
                      <div>
                        <div className="font-medium">Security Overview</div>
                        <div className="text-sm text-muted-foreground">Daily security summary</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-3">
                      <Download className="h-4 w-4 mr-2" />
                      Generate
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Bug className="h-8 w-8 text-red-600" />
                      <div>
                        <div className="font-medium">Threat Analysis</div>
                        <div className="text-sm text-muted-foreground">Detailed threat report</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-3">
                      <Download className="h-4 w-4 mr-2" />
                      Generate
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Activity className="h-8 w-8 text-green-600" />
                      <div>
                        <div className="font-medium">Audit Log</div>
                        <div className="text-sm text-muted-foreground">Complete activity log</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-3">
                      <Download className="h-4 w-4 mr-2" />
                      Generate
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Users className="h-8 w-8 text-purple-600" />
                      <div>
                        <div className="font-medium">User Access Report</div>
                        <div className="text-sm text-muted-foreground">User permissions audit</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-3">
                      <Download className="h-4 w-4 mr-2" />
                      Generate
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-orange-600" />
                      <div>
                        <div className="font-medium">Compliance Report</div>
                        <div className="text-sm text-muted-foreground">Regulatory compliance</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-3">
                      <Download className="h-4 w-4 mr-2" />
                      Generate
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Monitor className="h-8 w-8 text-indigo-600" />
                      <div>
                        <div className="font-medium">Vulnerability Scan</div>
                        <div className="text-sm text-muted-foreground">Security vulnerability assessment</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-3">
                      <Download className="h-4 w-4 mr-2" />
                      Generate
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
