'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Lock, 
  Database, 
  Globe,
  RefreshCw,
  Download,
  Settings,
  Users,
  Activity,
  Server,
  Network,
  Key,
  FileText,
  Clock,
  TrendingUp,
  AlertCircle
} from 'lucide-react'

interface SecurityEvent {
  id: string
  timestamp: string
  event: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  source: string
  ipAddress: string
  userId?: string
  details: string
}

interface SecurityMetrics {
  totalEvents: number
  criticalEvents: number
  highEvents: number
  mediumEvents: number
  lowEvents: number
  blockedAttempts: number
  successfulLogins: number
  failedLogins: number
  suspiciousActivities: number
  last24Hours: number
  last7Days: number
  last30Days: number
}

interface SecurityStatus {
  overall: 'secure' | 'warning' | 'critical'
  authentication: 'secure' | 'warning' | 'critical'
  network: 'secure' | 'warning' | 'critical'
  data: 'secure' | 'warning' | 'critical'
  compliance: 'secure' | 'warning' | 'critical'
}

export default function SecurityDashboard() {
  const [isLoading, setIsLoading] = useState(false)
  const [securityMetrics, setSecurityMetrics] = useState<SecurityMetrics>({
    totalEvents: 0,
    criticalEvents: 0,
    highEvents: 0,
    mediumEvents: 0,
    lowEvents: 0,
    blockedAttempts: 0,
    successfulLogins: 0,
    failedLogins: 0,
    suspiciousActivities: 0,
    last24Hours: 0,
    last7Days: 0,
    last30Days: 0
  })
  
  const [securityStatus, setSecurityStatus] = useState<SecurityStatus>({
    overall: 'secure',
    authentication: 'secure',
    network: 'secure',
    data: 'secure',
    compliance: 'secure'
  })
  
  const [recentEvents, setRecentEvents] = useState<SecurityEvent[]>([])
  const [activeThreats, setActiveThreats] = useState<SecurityEvent[]>([])

  // Mock data - replace with actual API calls
  useEffect(() => {
    loadSecurityData()
  }, [])

  const loadSecurityData = async () => {
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock security metrics
      setSecurityMetrics({
        totalEvents: 1247,
        criticalEvents: 3,
        highEvents: 12,
        mediumEvents: 45,
        lowEvents: 1187,
        blockedAttempts: 89,
        successfulLogins: 2341,
        failedLogins: 156,
        suspiciousActivities: 23,
        last24Hours: 45,
        last7Days: 234,
        last30Days: 1247
      })
      
      // Mock security status
      setSecurityStatus({
        overall: 'secure',
        authentication: 'secure',
        network: 'secure',
        data: 'secure',
        compliance: 'warning'
      })
      
      // Mock recent events
      setRecentEvents([
        {
          id: '1',
          timestamp: new Date().toISOString(),
          event: 'Failed login attempt',
          severity: 'medium',
          source: 'API',
          ipAddress: '192.168.1.100',
          userId: 'user123',
          details: 'Multiple failed login attempts from suspicious IP'
        },
        {
          id: '2',
          timestamp: new Date(Date.now() - 300000).toISOString(),
          event: 'Rate limit exceeded',
          severity: 'low',
          source: 'API',
          ipAddress: '10.0.0.50',
          details: 'API rate limit exceeded for authentication endpoint'
        },
        {
          id: '3',
          timestamp: new Date(Date.now() - 600000).toISOString(),
          event: 'Suspicious file upload',
          severity: 'high',
          source: 'Web',
          ipAddress: '172.16.0.25',
          userId: 'user456',
          details: 'Potential malware detected in uploaded file'
        }
      ])
      
      // Mock active threats
      setActiveThreats([
        {
          id: '1',
          timestamp: new Date().toISOString(),
          event: 'Brute force attack',
          severity: 'critical',
          source: 'API',
          ipAddress: '203.0.113.45',
          details: 'Multiple authentication attempts from single IP'
        }
      ])
      
    } catch (error) {
      console.error('Failed to load security data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500 text-white'
      case 'high': return 'bg-orange-500 text-white'
      case 'medium': return 'bg-yellow-500 text-white'
      case 'low': return 'bg-blue-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'secure': return 'text-green-600 bg-green-100'
      case 'warning': return 'text-yellow-600 bg-yellow-100'
      case 'critical': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'secure': return <CheckCircle className="w-4 h-4" />
      case 'warning': return <AlertTriangle className="w-4 h-4" />
      case 'critical': return <XCircle className="w-4 h-4" />
      default: return <AlertCircle className="w-4 h-4" />
    }
  }

  const exportSecurityReport = () => {
    const report = {
      timestamp: new Date().toISOString(),
      metrics: securityMetrics,
      status: securityStatus,
      recentEvents,
      activeThreats
    }
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `security-report-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Security Dashboard</h2>
          <p className="text-gray-600">Monitor and manage platform security</p>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" onClick={loadSecurityData} disabled={isLoading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline" onClick={exportSecurityReport}>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <Settings className="w-4 h-4 mr-2" />
            Security Settings
          </Button>
        </div>
      </div>

      {/* Security Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overall Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`flex items-center space-x-2 p-2 rounded-lg ${getStatusColor(securityStatus.overall)}`}>
              {getStatusIcon(securityStatus.overall)}
              <span className="font-medium capitalize">{securityStatus.overall}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Authentication</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`flex items-center space-x-2 p-2 rounded-lg ${getStatusColor(securityStatus.authentication)}`}>
              {getStatusIcon(securityStatus.authentication)}
              <span className="font-medium capitalize">{securityStatus.authentication}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Network</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`flex items-center space-x-2 p-2 rounded-lg ${getStatusColor(securityStatus.network)}`}>
              {getStatusIcon(securityStatus.network)}
              <span className="font-medium capitalize">{securityStatus.network}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Data Protection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`flex items-center space-x-2 p-2 rounded-lg ${getStatusColor(securityStatus.data)}`}>
              {getStatusIcon(securityStatus.data)}
              <span className="font-medium capitalize">{securityStatus.data}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Compliance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`flex items-center space-x-2 p-2 rounded-lg ${getStatusColor(securityStatus.compliance)}`}>
              {getStatusIcon(securityStatus.compliance)}
              <span className="font-medium capitalize">{securityStatus.compliance}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Security Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{securityMetrics.totalEvents.toLocaleString()}</div>
            <p className="text-xs text-gray-600">All time</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Critical Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{securityMetrics.criticalEvents}</div>
            <p className="text-xs text-gray-600">Requires immediate attention</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Blocked Attempts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{securityMetrics.blockedAttempts}</div>
            <p className="text-xs text-gray-600">Successfully prevented</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Suspicious Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{securityMetrics.suspiciousActivities}</div>
            <p className="text-xs text-gray-600">Under investigation</p>
          </CardContent>
        </Card>
      </div>

      {/* Event Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Security Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Recent Security Events
            </CardTitle>
            <CardDescription>Latest security events from the last 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentEvents.map((event) => (
                <div key={event.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <Badge className={getSeverityColor(event.severity)}>
                    {event.severity}
                  </Badge>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{event.event}</p>
                    <p className="text-xs text-gray-600">{event.details}</p>
                    <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                      <span>{event.source}</span>
                      <span>{event.ipAddress}</span>
                      <span>{new Date(event.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Threats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              Active Threats
            </CardTitle>
            <CardDescription>Currently active security threats</CardDescription>
          </CardHeader>
          <CardContent>
            {activeThreats.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <CheckCircle className="w-12 h-12 mx-auto mb-2 text-green-500" />
                <p>No active threats detected</p>
              </div>
            ) : (
              <div className="space-y-3">
                {activeThreats.map((threat) => (
                  <div key={threat.id} className="p-3 border border-red-200 rounded-lg bg-red-50">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className="bg-red-600 text-white">
                        {threat.severity}
                      </Badge>
                      <span className="text-sm font-medium text-red-800">{threat.event}</span>
                    </div>
                    <p className="text-sm text-red-700 mb-2">{threat.details}</p>
                    <div className="flex items-center justify-between text-xs text-red-600">
                      <span>IP: {threat.ipAddress}</span>
                      <span>{new Date(threat.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <Button size="sm" className="mt-2 w-full" variant="destructive">
                      Investigate
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Security Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Security Trends
          </CardTitle>
          <CardDescription>Security event trends over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-2">Last 24 Hours</h4>
              <div className="text-2xl font-bold text-blue-600">{securityMetrics.last24Hours}</div>
              <Progress value={(securityMetrics.last24Hours / 100) * 100} className="mt-2" />
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Last 7 Days</h4>
              <div className="text-2xl font-bold text-green-600">{securityMetrics.last7Days}</div>
              <Progress value={(securityMetrics.last7Days / 500) * 100} className="mt-2" />
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Last 30 Days</h4>
              <div className="text-2xl font-bold text-purple-600">{securityMetrics.last30Days}</div>
              <Progress value={(securityMetrics.last30Days / 2000) * 100} className="mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Security Actions</CardTitle>
          <CardDescription>Common security management tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <Users className="w-6 h-6 mb-2" />
              <span>User Access Review</span>
            </Button>
            
            <Button variant="outline" className="h-20 flex-col">
              <Server className="w-6 h-6 mb-2" />
              <span>System Health Check</span>
            </Button>
            
            <Button variant="outline" className="h-20 flex-col">
              <Network className="w-6 h-6 mb-2" />
              <span>Network Monitoring</span>
            </Button>
            
            <Button variant="outline" className="h-20 flex-col">
              <Key className="w-6 h-6 mb-2" />
              <span>API Key Management</span>
            </Button>
            
            <Button variant="outline" className="h-20 flex-col">
              <FileText className="w-6 h-6 mb-2" />
              <span>Audit Logs</span>
            </Button>
            
            <Button variant="outline" className="h-20 flex-col">
              <Clock className="w-6 h-6 mb-2" />
              <span>Backup Status</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
