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
  Bell,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
  Plus,
  Send,
  Users,
  Settings,
  Filter,
  Search,
  RefreshCw,
  Eye,
  EyeOff,
  Trash2,
  Edit,
  Copy,
  ExternalLink,
  Clock,
  Calendar,
  Mail,
  MessageSquare,
  Smartphone,
  Globe,
  Zap,
  Shield,
  Database,
  Server,
  Activity,
  TrendingUp,
  TrendingDown,
  Minus,
  Volume2,
  VolumeX,
  Pause,
  Play
} from "lucide-react"

interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "warning" | "error" | "success" | "critical"
  priority: "low" | "medium" | "high" | "critical"
  category: "system" | "security" | "user" | "performance" | "backup" | "api" | "custom"
  status: "unread" | "read" | "archived" | "dismissed"
  timestamp: string
  source: string
  recipients: string[]
  channels: ("email" | "sms" | "push" | "webhook" | "slack")[]
  actions?: {
    label: string
    action: string
    variant?: "default" | "destructive" | "outline"
  }[]
  metadata?: Record<string, any>
  expiresAt?: string
  isSticky?: boolean
}

interface NotificationRule {
  id: string
  name: string
  description: string
  enabled: boolean
  conditions: {
    source: string[]
    type: string[]
    priority: string[]
    keywords: string[]
  }
  actions: {
    channels: string[]
    recipients: string[]
    template: string
    delay: number
    throttle: number
  }
  schedule: {
    enabled: boolean
    startTime: string
    endTime: string
    days: string[]
    timezone: string
  }
}

interface NotificationTemplate {
  id: string
  name: string
  subject: string
  body: string
  type: "email" | "sms" | "push" | "webhook"
  variables: string[]
}

const mockNotifications: Notification[] = [
  {
    id: "notif1",
    title: "High Memory Usage Alert",
    message: "System memory usage has exceeded 85% threshold on server db-primary.growthlab.com",
    type: "warning",
    priority: "high",
    category: "performance",
    status: "unread",
    timestamp: "2024-01-20T14:30:00Z",
    source: "System Monitor",
    recipients: ["admin@growthlab.com", "devops@growthlab.com"],
    channels: ["email", "push", "slack"],
    actions: [
      { label: "View Details", action: "view_performance", variant: "default" },
      { label: "Restart Services", action: "restart_services", variant: "destructive" }
    ],
    isSticky: true
  },
  {
    id: "notif2",
    title: "Security Scan Completed",
    message: "Daily security scan completed successfully. No threats detected.",
    type: "success",
    priority: "medium",
    category: "security",
    status: "read",
    timestamp: "2024-01-20T14:00:00Z",
    source: "Security Scanner",
    recipients: ["security@growthlab.com"],
    channels: ["email"],
    actions: [
      { label: "View Report", action: "view_security_report", variant: "outline" }
    ]
  },
  {
    id: "notif3",
    title: "Database Backup Failed",
    message: "Automated backup for growthlab_analytics database failed due to insufficient storage space",
    type: "error",
    priority: "critical",
    category: "backup",
    status: "unread",
    timestamp: "2024-01-20T13:45:00Z",
    source: "Backup Service",
    recipients: ["admin@growthlab.com", "dba@growthlab.com"],
    channels: ["email", "sms", "push"],
    actions: [
      { label: "Retry Backup", action: "retry_backup", variant: "default" },
      { label: "Check Storage", action: "check_storage", variant: "outline" }
    ],
    isSticky: true
  },
  {
    id: "notif4",
    title: "New User Registration Spike",
    message: "User registrations increased by 45% in the last hour. Current rate: 23 users/minute",
    type: "info",
    priority: "medium",
    category: "user",
    status: "unread",
    timestamp: "2024-01-20T13:30:00Z",
    source: "Analytics Service",
    recipients: ["marketing@growthlab.com", "product@growthlab.com"],
    channels: ["email", "slack"],
    actions: [
      { label: "View Analytics", action: "view_user_analytics", variant: "default" }
    ]
  },
  {
    id: "notif5",
    title: "API Rate Limit Exceeded",
    message: "API endpoint /api/analytics has exceeded rate limit. 156 requests blocked in the last 5 minutes",
    type: "warning",
    priority: "high",
    category: "api",
    status: "read",
    timestamp: "2024-01-20T13:15:00Z",
    source: "API Gateway",
    recipients: ["api-team@growthlab.com"],
    channels: ["email", "push"],
    actions: [
      { label: "Adjust Limits", action: "adjust_rate_limits", variant: "default" },
      { label: "View API Stats", action: "view_api_stats", variant: "outline" }
    ]
  }
]

const mockRules: NotificationRule[] = [
  {
    id: "rule1",
    name: "Critical System Alerts",
    description: "Immediate notification for critical system issues",
    enabled: true,
    conditions: {
      source: ["System Monitor", "Database", "Security Scanner"],
      type: ["error", "critical"],
      priority: ["critical", "high"],
      keywords: ["failed", "error", "critical", "down"]
    },
    actions: {
      channels: ["email", "sms", "push", "slack"],
      recipients: ["admin@growthlab.com", "oncall@growthlab.com"],
      template: "critical_alert_template",
      delay: 0,
      throttle: 300
    },
    schedule: {
      enabled: false,
      startTime: "00:00",
      endTime: "23:59",
      days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
      timezone: "UTC"
    }
  },
  {
    id: "rule2",
    name: "Performance Monitoring",
    description: "Monitor system performance metrics and thresholds",
    enabled: true,
    conditions: {
      source: ["System Monitor", "Performance Monitor"],
      type: ["warning", "info"],
      priority: ["medium", "high"],
      keywords: ["memory", "cpu", "disk", "performance"]
    },
    actions: {
      channels: ["email", "slack"],
      recipients: ["devops@growthlab.com", "monitoring@growthlab.com"],
      template: "performance_alert_template",
      delay: 60,
      throttle: 900
    },
    schedule: {
      enabled: true,
      startTime: "08:00",
      endTime: "18:00",
      days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
      timezone: "UTC"
    }
  }
]

const mockTemplates: NotificationTemplate[] = [
  {
    id: "critical_alert_template",
    name: "Critical Alert Template",
    subject: "🚨 CRITICAL: {{title}}",
    body: "A critical issue has been detected:\n\n{{message}}\n\nSource: {{source}}\nTime: {{timestamp}}\nPriority: {{priority}}\n\nImmediate action required.",
    type: "email",
    variables: ["title", "message", "source", "timestamp", "priority"]
  },
  {
    id: "performance_alert_template",
    name: "Performance Alert Template",
    subject: "⚠️ Performance Alert: {{title}}",
    body: "Performance issue detected:\n\n{{message}}\n\nSource: {{source}}\nTime: {{timestamp}}\n\nPlease investigate when convenient.",
    type: "email",
    variables: ["title", "message", "source", "timestamp"]
  }
]

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [rules, setRules] = useState<NotificationRule[]>(mockRules)
  const [templates, setTemplates] = useState<NotificationTemplate[]>(mockTemplates)
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([])
  const [filterType, setFilterType] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showRuleDialog, setShowRuleDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState("")
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [autoRefresh, setAutoRefresh] = useState(true)

  useEffect(() => {
    const updateTime = () => {
      setLastUpdated(new Date().toLocaleTimeString())
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  // Auto-refresh notifications
  useEffect(() => {
    if (!autoRefresh) return
    
    const interval = setInterval(() => {
      // Simulate new notifications
      if (Math.random() > 0.8) {
        const newNotification: Notification = {
          id: `notif_${Date.now()}`,
          title: "System Update",
          message: "Automated system check completed successfully",
          type: "info",
          priority: "low",
          category: "system",
          status: "unread",
          timestamp: new Date().toISOString(),
          source: "System Monitor",
          recipients: ["admin@growthlab.com"],
          channels: ["push"]
        }
        
        setNotifications(prev => [newNotification, ...prev.slice(0, 19)])
        
        if (soundEnabled && 'Notification' in window && Notification.permission === 'granted') {
          new Notification(newNotification.title, { body: newNotification.message })
        }
      }
    }, 30000) // Check every 30 seconds
    
    return () => clearInterval(interval)
  }, [autoRefresh, soundEnabled])

  const showAlert = (message: string) => {
    if (typeof window !== 'undefined') {
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Notification Center', { body: message })
      } else {
        alert(message)
      }
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "error": case "critical": return <AlertTriangle className="h-4 w-4" />
      case "warning": return <AlertTriangle className="h-4 w-4" />
      case "success": return <CheckCircle className="h-4 w-4" />
      case "info": default: return <Info className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string, priority: string) => {
    if (priority === "critical") return "text-red-600 bg-red-50 border-red-200"
    switch (type) {
      case "error": return "text-red-600 bg-red-50 border-red-200"
      case "warning": return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "success": return "text-green-600 bg-green-50 border-green-200"
      case "info": default: return "text-blue-600 bg-blue-50 border-blue-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "text-red-600 bg-red-100"
      case "high": return "text-orange-600 bg-orange-100"
      case "medium": return "text-yellow-600 bg-yellow-100"
      case "low": default: return "text-gray-600 bg-gray-100"
    }
  }

  const handleMarkAsRead = (notificationIds: string[]) => {
    setNotifications(prev => prev.map(notif => 
      notificationIds.includes(notif.id) 
        ? { ...notif, status: "read" as const }
        : notif
    ))
    showAlert(`${notificationIds.length} notification(s) marked as read`)
  }

  const handleArchive = (notificationIds: string[]) => {
    setNotifications(prev => prev.map(notif => 
      notificationIds.includes(notif.id) 
        ? { ...notif, status: "archived" as const }
        : notif
    ))
    showAlert(`${notificationIds.length} notification(s) archived`)
  }

  const handleDelete = (notificationIds: string[]) => {
    setNotifications(prev => prev.filter(notif => !notificationIds.includes(notif.id)))
    setSelectedNotifications([])
    showAlert(`${notificationIds.length} notification(s) deleted`)
  }

  const handleCreateNotification = async (notificationData: Partial<Notification>) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newNotification: Notification = {
        id: `custom_${Date.now()}`,
        title: notificationData.title || "Custom Notification",
        message: notificationData.message || "",
        type: notificationData.type || "info",
        priority: notificationData.priority || "medium",
        category: "custom",
        status: "unread",
        timestamp: new Date().toISOString(),
        source: "Admin Panel",
        recipients: notificationData.recipients || [],
        channels: notificationData.channels || ["push"]
      }
      
      setNotifications(prev => [newNotification, ...prev])
      showAlert("Custom notification created successfully!")
    } catch (error) {
      showAlert("Failed to create notification")
    } finally {
      setIsLoading(false)
      setShowCreateDialog(false)
    }
  }

  const handleToggleRule = (ruleId: string) => {
    setRules(prev => prev.map(rule => 
      rule.id === ruleId 
        ? { ...rule, enabled: !rule.enabled }
        : rule
    ))
    showAlert("Notification rule updated")
  }

  const handleExecuteAction = async (action: string, notificationId: string) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Simulate action execution
      switch (action) {
        case "view_performance":
          showAlert("Redirecting to performance dashboard...")
          break
        case "restart_services":
          showAlert("Services restart initiated...")
          break
        case "retry_backup":
          showAlert("Backup retry initiated...")
          break
        case "view_security_report":
          showAlert("Opening security report...")
          break
        default:
          showAlert(`Action "${action}" executed successfully`)
      }
      
      // Mark notification as read after action
      handleMarkAsRead([notificationId])
    } catch (error) {
      showAlert("Failed to execute action")
    } finally {
      setIsLoading(false)
    }
  }

  const filteredNotifications = notifications.filter(notif => {
    const matchesType = filterType === "all" || notif.type === filterType
    const matchesStatus = filterStatus === "all" || notif.status === filterStatus
    const matchesSearch = searchQuery === "" || 
      notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notif.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notif.source.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesType && matchesStatus && matchesSearch
  })

  const unreadCount = notifications.filter(n => n.status === "unread").length
  const criticalCount = notifications.filter(n => n.priority === "critical" && n.status === "unread").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Notification Center</h2>
          <p className="text-muted-foreground">
            Manage system notifications, alerts, and communication rules
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={criticalCount > 0 ? "destructive" : "secondary"}>
            {criticalCount} Critical
          </Badge>
          <Badge variant={unreadCount > 0 ? "default" : "secondary"}>
            {unreadCount} Unread
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSoundEnabled(!soundEnabled)}
          >
            {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setAutoRefresh(!autoRefresh)}
          >
            {autoRefresh ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Notification
          </Button>
          <div className="text-xs text-muted-foreground">
            Last updated: {lastUpdated}
          </div>
        </div>
      </div>

      <Tabs defaultValue="notifications" className="space-y-4">
        <TabsList>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="rules">Rules & Automation</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-4">
          {/* Filters and Actions */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search notifications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64"
                  />
                </div>
                
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="unread">Unread</SelectItem>
                    <SelectItem value="read">Read</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>

                {selectedNotifications.length > 0 && (
                  <div className="flex items-center gap-2 ml-auto">
                    <span className="text-sm text-muted-foreground">
                      {selectedNotifications.length} selected
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleMarkAsRead(selectedNotifications)}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      Mark Read
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleArchive(selectedNotifications)}
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Archive
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(selectedNotifications)}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Notifications List */}
          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
              <Card 
                key={notification?.id} 
                className={`transition-all duration-200 hover:shadow-md ${
                  notification?.status === "unread" ? "border-l-4 border-l-blue-500" : ""
                } ${notification?.isSticky ? "bg-yellow-50" : ""}`}
              >
                <CardContent className="pt-4">
                  <div className="flex items-start gap-4">
                    {/* Selection Checkbox */}
                    <input
                      type="checkbox"
                      checked={selectedNotifications.includes(notification?.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedNotifications(prev => [...prev, notification?.id])
                        } else {
                          setSelectedNotifications(prev => prev.filter(id => id !== notification?.id))
                        }
                      }}
                      className="mt-1"
                    />

                    {/* Notification Icon */}
                    <div className={`p-2 rounded-full ${getTypeColor(notification?.type, notification?.priority)}`}>
                      {getTypeIcon(notification?.type)}
                    </div>

                    {/* Notification Content */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-lg">{notification?.title}</h4>
                          <p className="text-muted-foreground">{notification?.message}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getPriorityColor(notification?.priority)}>
                            {notification?.priority}
                          </Badge>
                          <Badge variant="outline" className="capitalize">
                            {notification?.category}
                          </Badge>
                          {notification?.status === "unread" && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                      </div>

                      {/* Metadata */}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Source: {notification?.source}</span>
                        <span>•</span>
                        <span>{new Date(notification?.timestamp).toLocaleString()}</span>
                        <span>•</span>
                        <span>{notification?.channels.join(", ")}</span>
                      </div>

                      {/* Actions */}
                      {notification?.actions && notification?.actions.length > 0 && (
                        <div className="flex items-center gap-2 pt-2">
                          {notification?.actions.map((action, index) => (
                            <Button
                              key={index}
                              size="sm"
                              variant={action.variant || "outline"}
                              onClick={() => handleExecuteAction(action.action, notification?.id)}
                              disabled={isLoading}
                            >
                              {action.label}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Quick Actions */}
                    <div className="flex items-center gap-1">
                      {notification?.status === "unread" && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleMarkAsRead([notification?.id])}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleArchive([notification?.id])}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete([notification?.id])}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredNotifications.length === 0 && (
            <Card>
              <CardContent className="pt-6 text-center">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No notifications found</h3>
                <p className="text-muted-foreground">
                  {searchQuery || filterType !== "all" || filterStatus !== "all"
                    ? "Try adjusting your filters or search query"
                    : "All caught up! No new notifications at the moment."
                  }
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="rules" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Notification Rules</h3>
            <Button onClick={() => setShowRuleDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Rule
            </Button>
          </div>

          <div className="space-y-4">
            {rules.map((rule) => (
              <Card key={rule.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h4 className="font-medium">{rule.name}</h4>
                        <Switch
                          checked={rule.enabled}
                          onCheckedChange={() => handleToggleRule(rule.id)}
                        />
                        <Badge variant={rule.enabled ? "default" : "secondary"}>
                          {rule.enabled ? "Active" : "Disabled"}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">{rule.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Sources:</span>
                          <div className="text-muted-foreground">
                            {rule.conditions.source.join(", ")}
                          </div>
                        </div>
                        <div>
                          <span className="font-medium">Types:</span>
                          <div className="text-muted-foreground">
                            {rule.conditions.type.join(", ")}
                          </div>
                        </div>
                        <div>
                          <span className="font-medium">Channels:</span>
                          <div className="text-muted-foreground">
                            {rule.actions.channels.join(", ")}
                          </div>
                        </div>
                        <div>
                          <span className="font-medium">Recipients:</span>
                          <div className="text-muted-foreground">
                            {rule.actions.recipients.length} configured
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="destructive">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Notification Templates</h3>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Template
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <Badge variant="outline" className="capitalize">
                      {template.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium">Subject</Label>
                    <p className="text-sm text-muted-foreground font-mono bg-gray-50 p-2 rounded">
                      {template.subject}
                    </p>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Body Preview</Label>
                    <p className="text-sm text-muted-foreground bg-gray-50 p-2 rounded max-h-20 overflow-hidden">
                      {template.body}
                    </p>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Variables</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {template.variables.map((variable) => (
                        <Badge key={variable} variant="secondary" className="text-xs">
                          {variable}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      <Copy className="h-3 w-3 mr-1" />
                      Duplicate
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3 mr-1" />
                      Preview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Total Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{notifications.length}</div>
                <p className="text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3 inline mr-1" />
                  +12% from last week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Unread</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{unreadCount}</div>
                <p className="text-xs text-muted-foreground">
                  <Minus className="h-3 w-3 inline mr-1" />
                  No change
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Critical Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{criticalCount}</div>
                <p className="text-xs text-muted-foreground">
                  <TrendingDown className="h-3 w-3 inline mr-1" />
                  -25% from yesterday
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Active Rules</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {rules.filter(r => r.enabled).length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Of {rules.length} total rules
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Notification Distribution</CardTitle>
              <CardDescription>
                Breakdown of notifications by type and category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["info", "warning", "error", "success"].map((type) => {
                  const count = notifications.filter(n => n.type === type).length
                  const percentage = notifications.length > 0 ? (count / notifications.length * 100).toFixed(1) : "0"
                  
                  return (
                    <div key={type} className="text-center p-4 border rounded-lg">
                      <div className={`text-2xl font-bold ${
                        type === "error" ? "text-red-600" :
                        type === "warning" ? "text-yellow-600" :
                        type === "success" ? "text-green-600" :
                        "text-blue-600"
                      }`}>
                        {count}
                      </div>
                      <div className="text-sm font-medium capitalize">{type}</div>
                      <div className="text-xs text-muted-foreground">{percentage}%</div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create Notification Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Custom Notification</DialogTitle>
            <DialogDescription>
              Send a custom notification to selected recipients
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Notification title" />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Notification message" rows={3} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">Type</Label>
                <Select defaultValue="info">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select defaultValue="medium">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="recipients">Recipients</Label>
              <Textarea 
                id="recipients" 
                placeholder="Enter email addresses separated by commas"
                rows={2}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => handleCreateNotification({})} disabled={isLoading}>
              <Send className="h-4 w-4 mr-2" />
              Send Notification
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
