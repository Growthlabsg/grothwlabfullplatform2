"use client"

import { useState } from "react"
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
  Shield,
  Lock,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  Key,
  Server,
  Network,
  Database,
  FileText,
  Download,
  Upload,
  Plus,
  Trash2,
  Edit,
  Copy,
  RefreshCw,
  Search,
  Filter,
  BarChart3,
  Activity,
  Users,
  Settings,
  Bell,
  Zap,
  Globe,
  Building,
  Calendar,
  MapPin
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface SecurityEvent {
  id: string
  timestamp: string
  eventType: "login" | "logout" | "failed_login" | "password_change" | "permission_change" | "data_access" | "system_change"
  severity: "low" | "medium" | "high" | "critical"
  user: string
  ipAddress: string
  userAgent: string
  description: string
  status: "pending" | "investigated" | "resolved" | "false_positive"
}

interface SecurityPolicy {
  id: string
  name: string
  description: string
  enabled: boolean
  category: "authentication" | "authorization" | "data_protection" | "network" | "monitoring"
  rules: SecurityRule[]
  lastModified: string
  modifiedBy: string
}

interface SecurityRule {
  id: string
  name: string
  condition: string
  action: "allow" | "deny" | "alert" | "block"
  enabled: boolean
}

interface IPWhitelist {
  id: string
  ipAddress: string
  description: string
  addedBy: string
  addedDate: string
  expiresAt?: string
}

const mockSecurityEvents: SecurityEvent[] = [
  {
    id: "1",
    timestamp: "2024-01-20T10:30:00Z",
    eventType: "failed_login",
    severity: "high",
    user: "unknown",
    ipAddress: "203.0.113.45",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    description: "Multiple failed login attempts detected",
    status: "pending"
  },
  {
    id: "2",
    timestamp: "2024-01-20T10:25:00Z",
    eventType: "login",
    severity: "low",
    user: "admin.user",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    description: "Successful login from trusted IP",
    status: "resolved"
  },
  {
    id: "3",
    timestamp: "2024-01-20T10:20:00Z",
    eventType: "permission_change",
    severity: "medium",
    user: "super.admin",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    description: "User role changed from 'user' to 'admin'",
    status: "investigated"
  },
  {
    id: "4",
    timestamp: "2024-01-20T10:15:00Z",
    eventType: "data_access",
    severity: "medium",
    user: "data.analyst",
    ipAddress: "203.0.113.67",
    userAgent: "Mozilla/5.0 (Linux; x86_64)",
    description: "Bulk data export initiated",
    status: "pending"
  },
  {
    id: "5",
    timestamp: "2024-01-20T10:10:00Z",
    eventType: "system_change",
    severity: "high",
    user: "super.admin",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    description: "Security policy configuration modified",
    status: "resolved"
  }
]

const mockSecurityPolicies: SecurityPolicy[] = [
  {
    id: "1",
    name: "Strong Password Policy",
    description: "Enforce strong password requirements",
    enabled: true,
    category: "authentication",
    rules: [
      {
        id: "1-1",
        name: "Minimum Length",
        condition: "password.length >= 8",
        action: "deny",
        enabled: true
      },
      {
        id: "1-2",
        name: "Complexity Requirements",
        condition: "password.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]/)",
        action: "deny",
        enabled: true
      }
    ],
    lastModified: "2024-01-19T15:30:00Z",
    modifiedBy: "super.admin"
  },
  {
    id: "2",
    name: "Rate Limiting",
    description: "Limit API requests per user",
    enabled: true,
    category: "network",
    rules: [
      {
        id: "2-1",
        name: "API Rate Limit",
        condition: "requests_per_minute > 100",
        action: "block",
        enabled: true
      }
    ],
    lastModified: "2024-01-18T10:15:00Z",
    modifiedBy: "admin.user"
  },
  {
    id: "3",
    name: "IP Whitelist",
    description: "Restrict access to specific IP addresses",
    enabled: false,
    category: "network",
    rules: [
      {
        id: "3-1",
        name: "Admin Access Only",
        condition: "ip_address in whitelist",
        action: "allow",
        enabled: false
      }
    ],
    lastModified: "2024-01-17T09:45:00Z",
    modifiedBy: "super.admin"
  }
]

const mockIPWhitelist: IPWhitelist[] = [
  {
    id: "1",
    ipAddress: "192.168.1.100",
    description: "Admin office network",
    addedBy: "super.admin",
    addedDate: "2024-01-15T10:00:00Z"
  },
  {
    id: "2",
    ipAddress: "203.0.113.45",
    description: "VPN endpoint",
    addedBy: "admin.user",
    addedDate: "2024-01-14T14:30:00Z",
    expiresAt: "2024-02-14T14:30:00Z"
  }
]

const severityColors = {
  low: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-orange-100 text-orange-800",
  critical: "bg-red-100 text-red-800"
}

const eventTypeColors = {
  login: "bg-blue-100 text-blue-800",
  logout: "bg-gray-100 text-gray-800",
  failed_login: "bg-red-100 text-red-800",
  password_change: "bg-purple-100 text-purple-800",
  permission_change: "bg-orange-100 text-orange-800",
  data_access: "bg-indigo-100 text-indigo-800",
  system_change: "bg-yellow-100 text-yellow-800"
}

export function SecuritySettings() {
  const { toast } = useToast()
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>(mockSecurityEvents)
  const [securityPolicies, setSecurityPolicies] = useState<SecurityPolicy[]>(mockSecurityPolicies)
  const [ipWhitelist, setIpWhitelist] = useState<IPWhitelist[]>(mockIPWhitelist)
  const [selectedEvent, setSelectedEvent] = useState<SecurityEvent | null>(null)
  const [showEventDialog, setShowEventDialog] = useState(false)
  const [showAddIPDialog, setShowAddIPDialog] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [severityFilter, setSeverityFilter] = useState<string>("all")

  const filteredEvents = securityEvents.filter(event => {
    const matchesSearch = event.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.ipAddress.includes(searchTerm)
    const matchesSeverity = severityFilter === "all" || event.severity === severityFilter
    return matchesSearch && matchesSeverity
  })

  const handleUpdateEventStatus = (eventId: string, status: SecurityEvent["status"]) => {
    setSecurityEvents(events => 
      events.map(event => 
        event.id === eventId ? { ...event, status } : event
      )
    )
    toast({
      title: "Event Status Updated",
      description: `Event status changed to ${status}`,
    })
  }

  const handleTogglePolicy = (policyId: string, enabled: boolean) => {
    setSecurityPolicies(policies => 
      policies.map(policy => 
        policy.id === policyId ? { ...policy, enabled } : policy
      )
    )
    toast({
      title: "Policy Updated",
      description: `Policy ${enabled ? "enabled" : "disabled"} successfully`,
    })
  }

  const handleAddIPToWhitelist = (ipAddress: string, description: string) => {
    const newIP: IPWhitelist = {
      id: Date.now().toString(),
      ipAddress,
      description,
      addedBy: "super.admin",
      addedDate: new Date().toISOString()
    }
    setIpWhitelist(prev => [...prev, newIP])
    toast({
      title: "IP Added to Whitelist",
      description: `${ipAddress} has been added to the whitelist`,
    })
    setShowAddIPDialog(false)
  }

  const handleRemoveIPFromWhitelist = (ipId: string) => {
    setIpWhitelist(prev => prev.filter(ip => ip.id !== ipId))
    toast({
      title: "IP Removed from Whitelist",
      description: "IP address has been removed from the whitelist",
    })
  }

  const securityStats = {
    totalEvents: securityEvents.length,
    critical: securityEvents.filter(e => e.severity === "critical").length,
    high: securityEvents.filter(e => e.severity === "high").length,
    pending: securityEvents.filter(e => e.status === "pending").length,
    activePolicies: securityPolicies.filter(p => p.enabled).length,
    whitelistedIPs: ipWhitelist.length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Security Settings</h2>
          <p className="text-muted-foreground">
            Manage security policies, monitor threats, and control access
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Logs
          </Button>
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Security Settings
          </Button>
          <Button>
            <Shield className="w-4 h-4 mr-2" />
            Security Scan
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{securityStats.totalEvents}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{securityStats.critical}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Severity</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{securityStats.high}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{securityStats.pending}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Policies</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{securityStats.activePolicies}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Whitelisted IPs</CardTitle>
            <Network className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{securityStats.whitelistedIPs}</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="events" className="space-y-4">
        <TabsList>
          <TabsTrigger value="events">Security Events</TabsTrigger>
          <TabsTrigger value="policies">Security Policies</TabsTrigger>
          <TabsTrigger value="whitelist">IP Whitelist</TabsTrigger>
          <TabsTrigger value="monitoring">Security Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Security Events</CardTitle>
                  <CardDescription>
                    Monitor security events and potential threats
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search events..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Select value={severityFilter} onValueChange={setSeverityFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell>
                        <div className="text-sm">
                          {new Date(event.timestamp).toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Badge className={eventTypeColors[event.eventType]}>
                            {event.eventType.replace("_", " ")}
                          </Badge>
                          <span className="text-sm">{event.description}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm font-medium">{event.user}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm font-mono">{event.ipAddress}</div>
                      </TableCell>
                      <TableCell>
                        <Badge className={severityColors[event.severity]}>
                          {event.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={event.status === "resolved" ? "default" : "secondary"}>
                          {event.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedEvent(event)
                            setShowEventDialog(true)
                          }}
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
        </TabsContent>

        <TabsContent value="policies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Policies</CardTitle>
              <CardDescription>
                Configure security policies and access controls
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {securityPolicies.map((policy) => (
                  <div key={policy.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{policy.name}</h3>
                        <p className="text-sm text-muted-foreground">{policy.description}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant="outline">{policy.category}</Badge>
                          <span className="text-xs text-muted-foreground">
                            {policy.rules.length} rules
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={policy.enabled}
                          onCheckedChange={(checked) => handleTogglePolicy(policy.id, checked)}
                        />
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {policy.rules.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <h4 className="text-sm font-medium">Rules:</h4>
                        {policy.rules.map((rule) => (
                          <div key={rule.id} className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded">
                            <div>
                              <span className="font-medium">{rule.name}:</span> {rule.condition}
                            </div>
                            <Badge variant={rule.action === "allow" ? "default" : "destructive"}>
                              {rule.action}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="whitelist" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>IP Whitelist</CardTitle>
                  <CardDescription>
                    Manage trusted IP addresses for secure access
                  </CardDescription>
                </div>
                <Button onClick={() => setShowAddIPDialog(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add IP
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Added By</TableHead>
                    <TableHead>Added Date</TableHead>
                    <TableHead>Expires</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ipWhitelist.map((ip) => (
                    <TableRow key={ip.id}>
                      <TableCell>
                        <div className="font-mono">{ip.ipAddress}</div>
                      </TableCell>
                      <TableCell>{ip.description}</TableCell>
                      <TableCell>{ip.addedBy}</TableCell>
                      <TableCell>
                        {new Date(ip.addedDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {ip.expiresAt ? (
                          new Date(ip.expiresAt).toLocaleDateString()
                        ) : (
                          <span className="text-muted-foreground">Never</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveIPFromWhitelist(ip.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Real-time Monitoring</CardTitle>
                <CardDescription>
                  Live security monitoring dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Active Sessions</span>
                    <Badge variant="default">1,247</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Failed Login Attempts</span>
                    <Badge variant="destructive">23</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Blocked IPs</span>
                    <Badge variant="secondary">5</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Security Alerts</span>
                    <Badge variant="destructive">3</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Metrics</CardTitle>
                <CardDescription>
                  Security performance indicators
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <span>System Security Score</span>
                      <span className="font-medium">92/100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "92%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Vulnerability Assessment</span>
                      <span className="font-medium">Low Risk</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "15%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Compliance Status</span>
                      <span className="font-medium">Compliant</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "100%" }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Event Details Dialog */}
      <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Security Event Details</DialogTitle>
            <DialogDescription>
              Detailed information about the security event
            </DialogDescription>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Event Type</Label>
                  <Input value={selectedEvent.eventType.replace("_", " ")} readOnly />
                </div>
                <div>
                  <Label>Severity</Label>
                  <Input value={selectedEvent.severity} readOnly />
                </div>
                <div>
                  <Label>User</Label>
                  <Input value={selectedEvent.user} readOnly />
                </div>
                <div>
                  <Label>IP Address</Label>
                  <Input value={selectedEvent.ipAddress} readOnly />
                </div>
                <div className="col-span-2">
                  <Label>Description</Label>
                  <Textarea value={selectedEvent.description} readOnly rows={3} />
                </div>
                <div className="col-span-2">
                  <Label>User Agent</Label>
                  <Input value={selectedEvent.userAgent} readOnly />
                </div>
              </div>

              <div>
                <Label>Status</Label>
                <Select 
                  value={selectedEvent.status} 
                  onValueChange={(value) => handleUpdateEventStatus(selectedEvent.id, value as SecurityEvent["status"])}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="investigated">Investigated</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="false_positive">False Positive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEventDialog(false)}>
              Close
            </Button>
            <Button>Take Action</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add IP Dialog */}
      <Dialog open={showAddIPDialog} onOpenChange={setShowAddIPDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add IP to Whitelist</DialogTitle>
            <DialogDescription>
              Add a trusted IP address to the whitelist
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="ipAddress">IP Address</Label>
              <Input 
                id="ipAddress" 
                placeholder="192.168.1.100"
                type="text"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input 
                id="description" 
                placeholder="e.g., Admin office network"
                type="text"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddIPDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              const ipInput = document.getElementById("ipAddress") as HTMLInputElement
              const descInput = document.getElementById("description") as HTMLInputElement
              if (ipInput && descInput) {
                handleAddIPToWhitelist(ipInput.value, descInput.value)
              }
            }}>
              Add IP
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 