"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { SuperAdminLayout } from "@/components/super-admin/super-admin-layout"
import { SuperAdminErrorBoundary } from "@/components/super-admin/super-admin-error-boundary"
import { UserManagement } from "@/components/super-admin/user-management"
import { FeatureToggles } from "@/components/super-admin/feature-toggles"
import { PerformanceMonitoring } from "@/components/super-admin/performance-monitoring"
import { SystemConfiguration } from "@/components/super-admin/system-configuration"
import { AnalyticsOverview } from "@/components/super-admin/analytics-overview"
import { ActivityLogs } from "@/components/super-admin/activity-logs"
import { AdvancedAnalyticsDashboard } from "@/components/super-admin/advanced-analytics-dashboard"
import { EnhancedUserManagement } from "@/components/super-admin/enhanced-user-management"
import { ComprehensiveSystemMonitoring } from "@/components/super-admin/comprehensive-system-monitoring"
import { AdvancedSecurityMonitoring } from "@/components/super-admin/advanced-security-monitoring"
import { DatabaseManagement } from "@/components/super-admin/database-management"
import { NotificationCenter } from "@/components/super-admin/notification-center"
import { BackupRestoreSystem } from "@/components/super-admin/backup-restore-system"
import { ProjectReviewSystem } from "@/components/super-admin/project-review-system"
import { EmployeeAccessControl } from "@/components/super-admin/employee-access-control"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Users, 
  Settings, 
  Activity, 
  Shield, 
  BarChart3, 
  ToggleLeft, 
  Database,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Globe,
  Zap,
  RefreshCw,
  Network,
  Bell,
  Search,
  Menu
} from "lucide-react"

function SuperAdminContent() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("overview")
  const [isClient, setIsClient] = useState(false)
  
  // Handle URL parameters for redirects
  useEffect(() => {
    setIsClient(true)
    // Use window.location to get URL parameters as fallback
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const tab = urlParams.get('tab')
      if (tab) {
        setActiveTab(tab)
      }
    }
  }, [])
  
  // Also handle searchParams changes
  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab) {
      setActiveTab(tab)
    }
  }, [searchParams])
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Enhanced system status data with real-time updates
  const [systemStatus, setSystemStatus] = useState({
    overall: "healthy",
    uptime: "99.9%",
    lastIncident: "2024-01-15",
    activeUsers: 1247,
    totalUsers: 15420,
    systemLoad: "23%",
    databaseStatus: "operational",
    apiStatus: "operational",
    storageUsage: "67%",
    lastUpdated: "",
    // Enhanced metrics
    cpuUsage: "23%",
    memoryUsage: "45%",
    networkLatency: "12ms",
    errorRate: "0.02%",
    responseTime: "145ms",
    securityScore: 95,
    backupStatus: "completed",
    lastBackup: "2 hours ago"
  })

  // Update the time periodically to keep it current
  useEffect(() => {
    // Set initial time after component mounts (client-side only)
    const updateTime = () => {
      setSystemStatus(prev => ({
        ...prev,
        lastUpdated: new Date().toLocaleTimeString()
      }))
    }
    
    // Only update time on client side to avoid hydration mismatch
    updateTime()
    
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleRefresh = () => {
    try {
      setIsLoading(true)
      setError(null)
      // Simulate refresh with updated data
      setTimeout(() => {
        const now = new Date()
        setSystemStatus(prev => ({
          ...prev,
          activeUsers: Math.floor(Math.random() * 500) + 1000,
          systemLoad: `${Math.floor(Math.random() * 30) + 15}%`,
          storageUsage: `${Math.floor(Math.random() * 20) + 60}%`,
          cpuUsage: `${Math.floor(Math.random() * 30) + 15}%`,
          memoryUsage: `${Math.floor(Math.random() * 30) + 35}%`,
          networkLatency: `${Math.floor(Math.random() * 20) + 5}ms`,
          errorRate: `${(Math.random() * 0.05).toFixed(3)}%`,
          responseTime: `${Math.floor(Math.random() * 100) + 100}ms`,
          securityScore: Math.floor(Math.random() * 10) + 90,
          lastUpdated: now.toLocaleTimeString()
        }))
        setIsLoading(false)
      }, 1000)
    } catch (err) {
      console.error('Error in handleRefresh:', err)
      setError(err instanceof Error ? err.message : 'An error occurred while refreshing data')
      setIsLoading(false)
    }
  }



  // Quick actions aligned with sidebar navigation
  const quickActions = [
    { name: "User Management", icon: Users, href: "users", description: "Manage user accounts and permissions" },
    { name: "Project Review", icon: FileText, href: "project-review", description: "Review and approve submitted projects" },
    { name: "Employee Access", icon: Shield, href: "employee-access", description: "Manage employee permissions and access" },
    { name: "Feature Toggles", icon: ToggleLeft, href: "features", description: "Enable/disable platform features" },
    { name: "Performance", icon: Zap, href: "performance", description: "Monitor system performance" },
    { name: "System Config", icon: Settings, href: "config", description: "Configure system settings" },
    { name: "Security", icon: Shield, href: "security", description: "Security dashboard and settings" },
    { name: "Activity Logs", icon: Activity, href: "logs", description: "View system activity logs" },
    { name: "Database", icon: Database, href: "database", description: "Database management and monitoring" },
    { name: "API Management", icon: Network, href: "api", description: "Manage API configurations" },
    { name: "File Management", icon: FileText, href: "files", description: "Manage platform files" },
    { name: "Environment", icon: Globe, href: "environment", description: "Environment configuration" },
    { name: "Notifications", icon: Bell, href: "notifications", description: "Manage system notifications and alerts" },
    { name: "Backup & Restore", icon: RefreshCw, href: "backup", description: "Backup and restore system data" }
  ]

  const handleQuickAction = (href: string) => {
    try {
      setError(null)
      console.log('Quick action clicked:', href)
      setActiveTab(href)
    } catch (err) {
      console.error('Error in handleQuickAction:', err)
      setError(err instanceof Error ? err.message : 'An error occurred while executing quick action')
    }
  }

  // Debug: Always render the content for now
  console.log('Rendering SuperAdminContent, isClient:', isClient, 'activeTab:', activeTab)

  return (
    <SuperAdminErrorBoundary>
              <SuperAdminLayout activeTab={activeTab} onTabChange={handleTabChange}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Super Admin Dashboard</h1>
              <p className="text-muted-foreground">
                Complete control over GrowthLab platform operations
              </p>
                          <div className="mt-2">
              <Badge variant="outline" className="text-xs">
                Current Tab: {activeTab}
              </Badge>
            </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search admin functions..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-64"
                />
              </div>
              
              {/* Notifications */}
              <Button variant="outline" size="sm" className="relative">
                <Bell className="h-4 w-4 mr-2" />
                <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center absolute -top-2 -right-2">
                  3
                </span>
                Notifications
              </Button>
              
              <Badge variant={systemStatus.overall === "healthy" ? "default" : "destructive"}>
                {systemStatus.overall === "healthy" ? (
                  <CheckCircle className="w-3 h-3 mr-1" />
                ) : (
                  <AlertTriangle className="w-3 h-3 mr-1" />
                )}
                System {systemStatus.overall}
              </Badge>
              <Button variant="outline">
                <Clock className="w-4 h-4 mr-2" />
                Uptime: {systemStatus.uptime}
              </Button>
              <Button 
                variant="outline" 
                onClick={handleRefresh}
                disabled={isLoading}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <div className="text-xs text-muted-foreground" key={systemStatus.lastUpdated}>
                Last updated: {systemStatus.lastUpdated}
              </div>
            </div>
          </div>

          {/* Enhanced System Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="hover:shadow-md transition-shadow duration-200 cursor-pointer" onClick={() => setActiveTab("users")}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{systemStatus.activeUsers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  +12% from last hour
                </p>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(systemStatus.activeUsers / 2000) * 100}%` }}></div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow duration-200 cursor-pointer" onClick={() => setActiveTab("performance")}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">System Load</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{systemStatus.systemLoad}</div>
                <p className="text-xs text-muted-foreground">
                  CPU: {systemStatus.cpuUsage} | Memory: {systemStatus.memoryUsage}
                </p>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-600 h-2 rounded-full" style={{ width: systemStatus.systemLoad }}></div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow duration-200 cursor-pointer" onClick={() => setActiveTab("database")}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Database</CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold capitalize text-green-600">{systemStatus.databaseStatus}</div>
                <p className="text-xs text-muted-foreground">
                  Response: {systemStatus.responseTime} | Latency: {systemStatus.networkLatency}
                </p>
                <div className="mt-2 flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-xs text-green-600">Connected</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow duration-200 cursor-pointer" onClick={() => setActiveTab("files")}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Storage</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{systemStatus.storageUsage}</div>
                <p className="text-xs text-muted-foreground">
                  2.1TB of 3.2TB used
                </p>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: systemStatus.storageUsage }}></div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional System Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="hover:shadow-md transition-shadow duration-200 cursor-pointer" onClick={() => setActiveTab("security")}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Security Score</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{systemStatus.securityScore}/100</div>
                <p className="text-xs text-muted-foreground">
                  Error Rate: {systemStatus.errorRate}
                </p>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: `${systemStatus.securityScore}%` }}></div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow duration-200 cursor-pointer" onClick={() => setActiveTab("api")}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">API Status</CardTitle>
                <Network className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold capitalize text-green-600">{systemStatus.apiStatus}</div>
                <p className="text-xs text-muted-foreground">
                  Response: {systemStatus.responseTime} | Latency: {systemStatus.networkLatency}
                </p>
                <div className="mt-2 flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-xs text-green-600">Healthy</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow duration-200 cursor-pointer" onClick={() => setActiveTab("config")}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Backup Status</CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold capitalize text-green-600">{systemStatus.backupStatus}</div>
                <p className="text-xs text-muted-foreground">
                  Last: {systemStatus.lastBackup}
                </p>
                <div className="mt-2 flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-xs text-green-600">Up to date</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common administrative tasks - Click any button to navigate to the corresponding section
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {quickActions.map((action) => (
                  <Button
                    key={action.name}
                    variant="outline"
                    className="h-24 flex flex-col items-center justify-center space-y-2 hover:bg-primary hover:text-primary-foreground transition-all duration-200 group relative overflow-hidden"
                    onClick={() => handleQuickAction(action.href)}
                    title={action.description}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                    <action.icon className="h-6 w-6 group-hover:scale-110 transition-transform duration-200 relative z-10" />
                    <span className="text-xs text-center leading-tight relative z-10">{action.name}</span>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></div>
                  </Button>
                ))}
              </div>
              
              {/* Quick Stats Summary */}
              <div className="mt-6 pt-6 border-t">
                <h4 className="font-medium mb-3">Quick Stats Summary</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{systemStatus.activeUsers.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Active Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{systemStatus.securityScore}%</div>
                    <div className="text-xs text-muted-foreground">Security Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-600">{systemStatus.systemLoad}</div>
                    <div className="text-xs text-muted-foreground">System Load</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">{systemStatus.storageUsage}</div>
                    <div className="text-xs text-muted-foreground">Storage Used</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Error Display */}
          {error && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2 text-red-800">
                  <AlertTriangle className="h-5 w-5" />
                  <p className="font-medium">Error: {error}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Real-time Activity Feed */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Live System Activity
              </CardTitle>
              <CardDescription>
                Real-time monitoring of platform activities and events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { type: "user", message: "New user registration: john.doe@example.com", time: "2 minutes ago", status: "info" },
                  { type: "security", message: "Security scan completed - No threats detected", time: "5 minutes ago", status: "success" },
                  { type: "system", message: "Database backup completed successfully", time: "8 minutes ago", status: "success" },
                  { type: "api", message: "API rate limit exceeded for /api/analytics", time: "12 minutes ago", status: "warning" },
                  { type: "performance", message: "System load increased to 67%", time: "15 minutes ago", status: "info" }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.status === 'success' ? 'bg-green-500' : 
                      activity.status === 'warning' ? 'bg-yellow-500' : 
                      activity.status === 'error' ? 'bg-red-500' : 'bg-blue-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                    <Badge variant="outline" className="text-xs capitalize">{activity.type}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Main Content - Content changes based on sidebar navigation */}
          <div className="space-y-4">
            {activeTab === "overview" && (
              <div className="space-y-4">
                <AdvancedAnalyticsDashboard />
              </div>
            )}
            
            {activeTab === "admin-dashboard" && (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Admin Dashboard</CardTitle>
                    <CardDescription>
                      Centralized administration dashboard with all admin features
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <Card className="border-l-4 border-l-blue-500">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Total Users</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-blue-600">2.1k</div>
                          <p className="text-xs text-muted-foreground">Active users</p>
                        </CardContent>
                      </Card>
                      <Card className="border-l-4 border-l-green-500">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Startups</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-green-600">45</div>
                          <p className="text-xs text-muted-foreground">Registered startups</p>
                        </CardContent>
                      </Card>
                      <Card className="border-l-4 border-l-purple-500">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Events</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-purple-600">12</div>
                          <p className="text-xs text-muted-foreground">Upcoming events</p>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    All administration features are now available in the Super Admin Panel. 
                    Use the sidebar navigation to access specific admin functions.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "users" && (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>User Management Debug</CardTitle>
                    <CardDescription>
                      Active Tab: {activeTab} | Navigation is working!
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-green-600 font-medium">✅ User Management button is working correctly!</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      The navigation system is functioning properly. Loading Enhanced User Management component...
                    </p>
                  </CardContent>
                </Card>
                <EnhancedUserManagement />
              </div>
            )}
            
            {activeTab === "project-review" && (
              <div className="space-y-4">
                <ProjectReviewSystem />
              </div>
            )}
            
            {activeTab === "employee-access" && (
              <div className="space-y-4">
                <EmployeeAccessControl />
              </div>
            )}

            {activeTab === "startups" && (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Startup Management</CardTitle>
                    <CardDescription>
                      Manage startup registrations, verifications, and profiles
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="border-l-4 border-l-green-500">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Verified Startups</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-green-600">32</div>
                          <p className="text-xs text-muted-foreground">Fully verified</p>
                        </CardContent>
                      </Card>
                      <Card className="border-l-4 border-l-yellow-500">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Pending Review</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-yellow-600">13</div>
                          <p className="text-xs text-muted-foreground">Awaiting verification</p>
                        </CardContent>
                      </Card>
                      <Card className="border-l-4 border-l-blue-500">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Total Applications</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-blue-600">45</div>
                          <p className="text-xs text-muted-foreground">All time</p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-muted-foreground">
                        Startup management features are now integrated into the Super Admin Panel.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "events" && (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Event Management</CardTitle>
                    <CardDescription>
                      Manage platform events, workshops, and networking sessions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="border-l-4 border-l-blue-500">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Upcoming Events</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-blue-600">8</div>
                          <p className="text-xs text-muted-foreground">Scheduled</p>
                        </CardContent>
                      </Card>
                      <Card className="border-l-4 border-l-green-500">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Completed</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-green-600">24</div>
                          <p className="text-xs text-muted-foreground">This month</p>
                        </CardContent>
                      </Card>
                      <Card className="border-l-4 border-l-purple-500">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Total Attendees</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-purple-600">1.2k</div>
                          <p className="text-xs text-muted-foreground">All time</p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-muted-foreground">
                        Event management features are now integrated into the Super Admin Panel.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "courses" && (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Management</CardTitle>
                    <CardDescription>
                      Manage educational courses and learning materials
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="border-l-4 border-l-blue-500">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Active Courses</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-blue-600">6</div>
                          <p className="text-xs text-muted-foreground">Currently running</p>
                        </CardContent>
                      </Card>
                      <Card className="border-l-4 border-l-green-500">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Enrolled Students</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-green-600">342</div>
                          <p className="text-xs text-muted-foreground">Total enrollments</p>
                        </CardContent>
                      </Card>
                      <Card className="border-l-4 border-l-purple-500">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Completion Rate</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-purple-600">87%</div>
                          <p className="text-xs text-muted-foreground">Average completion</p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-muted-foreground">
                        Course management features are now integrated into the Super Admin Panel.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "verification" && (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Startup Verification</CardTitle>
                    <CardDescription>
                      Review and verify startup applications and documentation
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="border-l-4 border-l-yellow-500">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Pending Review</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-yellow-600">2</div>
                          <p className="text-xs text-muted-foreground">Awaiting verification</p>
                        </CardContent>
                      </Card>
                      <Card className="border-l-4 border-l-green-500">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Verified This Week</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-green-600">5</div>
                          <p className="text-xs text-muted-foreground">Successfully verified</p>
                        </CardContent>
                      </Card>
                      <Card className="border-l-4 border-l-red-500">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Rejected</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-red-600">1</div>
                          <p className="text-xs text-muted-foreground">This week</p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-muted-foreground">
                        Startup verification features are now integrated into the Super Admin Panel.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {activeTab === "features" && (
              <div className="space-y-4">
                <FeatureToggles />
              </div>
            )}
            
            {activeTab === "performance" && (
              <div className="space-y-4">
                <ComprehensiveSystemMonitoring />
              </div>
            )}
            
            {activeTab === "config" && (
              <div className="space-y-4">
                <SystemConfiguration />
              </div>
            )}
            
            {activeTab === "security" && (
              <div className="space-y-4">
                <AdvancedSecurityMonitoring />
              </div>
            )}
            
            {activeTab === "logs" && (
              <div className="space-y-4">
                <ActivityLogs />
              </div>
            )}
            
            {activeTab === "database" && (
              <div className="space-y-4">
                <DatabaseManagement />
              </div>
            )}
            
            {activeTab === "api" && (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>API Management</CardTitle>
                    <CardDescription>
                      Configure and monitor API endpoints, rate limits, and authentication
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <Card className="border-l-4 border-l-green-500">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Total Endpoints</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-green-600">47</div>
                          <p className="text-xs text-muted-foreground">Active APIs</p>
                        </CardContent>
                      </Card>
                      <Card className="border-l-4 border-l-blue-500">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Requests/min</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-blue-600">2.4k</div>
                          <p className="text-xs text-muted-foreground">Current load</p>
                        </CardContent>
                      </Card>
                      <Card className="border-l-4 border-l-orange-500">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Error Rate</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-orange-600">0.02%</div>
                          <p className="text-xs text-muted-foreground">Last hour</p>
                        </CardContent>
                      </Card>
                      <Card className="border-l-4 border-l-purple-500">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Avg Response</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-purple-600">145ms</div>
                          <p className="text-xs text-muted-foreground">Response time</p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-medium">API Endpoints Status</h4>
                      <div className="space-y-2">
                        {[
                          { endpoint: "/api/users", method: "GET", status: "healthy", calls: "1.2k/min", avgTime: "89ms" },
                          { endpoint: "/api/auth", method: "POST", status: "healthy", calls: "856/min", avgTime: "123ms" },
                          { endpoint: "/api/startups", method: "GET", status: "healthy", calls: "432/min", avgTime: "156ms" },
                          { endpoint: "/api/analytics", method: "POST", status: "warning", calls: "234/min", avgTime: "298ms" },
                          { endpoint: "/api/notifications", method: "GET", status: "healthy", calls: "678/min", avgTime: "67ms" }
                        ].map((api, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className={`w-2 h-2 rounded-full ${
                                api.status === 'healthy' ? 'bg-green-500' : 
                                api.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                              }`}></div>
                              <span className="font-mono text-sm">{api.endpoint}</span>
                              <Badge variant="outline" className="text-xs">{api.method}</Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {api.calls} • {api.avgTime}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {activeTab === "files" && (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>File Management</CardTitle>
                    <CardDescription>
                      Manage platform files, assets, and storage allocation
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <Card className="border-l-4 border-l-blue-500">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Total Files</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-blue-600">124.7k</div>
                          <p className="text-xs text-muted-foreground">Files stored</p>
                        </CardContent>
                      </Card>
                      <Card className="border-l-4 border-l-green-500">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Storage Used</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-green-600">2.1TB</div>
                          <p className="text-xs text-muted-foreground">Of 3.2TB total</p>
                        </CardContent>
                      </Card>
                      <Card className="border-l-4 border-l-purple-500">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">File Types</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-purple-600">24</div>
                          <p className="text-xs text-muted-foreground">Different formats</p>
                        </CardContent>
                      </Card>
                      <Card className="border-l-4 border-l-orange-500">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Backup Status</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-orange-600">2h ago</div>
                          <p className="text-xs text-muted-foreground">Last backup</p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-medium">Storage by File Type</h4>
                      <div className="space-y-2">
                        {[
                          { type: "Images (PNG/JPG)", size: "856GB", count: "89.2k", percentage: "40.8%" },
                          { type: "Documents (PDF/DOC)", size: "432GB", count: "18.5k", percentage: "20.6%" },
                          { type: "Videos (MP4/AVI)", size: "298GB", count: "8.9k", percentage: "14.2%" },
                          { type: "Audio (MP3/WAV)", size: "156GB", count: "4.2k", percentage: "7.4%" },
                          { type: "Other Files", size: "358GB", count: "3.9k", percentage: "17.0%" }
                        ].map((fileType, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-3 h-3 bg-blue-500 rounded"></div>
                              <span className="font-medium">{fileType.type}</span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {fileType.size} • {fileType.count} files
                            </div>
                            <Badge variant="secondary">{fileType.percentage}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {activeTab === "environment" && (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Environment Configuration</CardTitle>
                    <CardDescription>
                      Configure environment variables, settings, and deployment configurations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="border-l-4 border-l-green-500">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Environment</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-green-600">Production</div>
                          <p className="text-xs text-muted-foreground">Current deployment</p>
                        </CardContent>
                      </Card>
                      <Card className="border-l-4 border-l-blue-500">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Version</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-blue-600">v2.1.4</div>
                          <p className="text-xs text-muted-foreground">Latest release</p>
                        </CardContent>
                      </Card>
                      <Card className="border-l-4 border-l-purple-500">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Last Deploy</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-purple-600">3h ago</div>
                          <p className="text-xs text-muted-foreground">Deployment time</p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-medium">Environment Variables</h4>
                      <div className="space-y-2">
                        {[
                          { name: "NODE_ENV", value: "production", status: "active" },
                          { name: "DATABASE_URL", value: "postgresql://...", status: "active" },
                          { name: "API_KEY", value: "sk-...", status: "active" },
                          { name: "REDIS_URL", value: "redis://...", status: "active" },
                          { name: "S3_BUCKET", value: "growthlab-assets", status: "active" },
                          { name: "SMTP_HOST", value: "smtp.gmail.com", status: "active" }
                        ].map((env, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="font-mono text-sm font-medium">{env.name}</span>
                            </div>
                            <div className="text-sm text-muted-foreground font-mono">
                              {env.value.length > 20 ? env.value.substring(0, 20) + "..." : env.value}
                            </div>
                            <Badge variant="outline" className="text-xs">{env.status}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {activeTab === "notifications" && (
              <div className="space-y-4">
                <NotificationCenter />
              </div>
            )}
            
            {activeTab === "backup" && (
              <div className="space-y-4">
                <BackupRestoreSystem />
              </div>
            )}
          </div>
        </div>
      </SuperAdminLayout>
    </SuperAdminErrorBoundary>
  )
}

function SuperAdminPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Loading Super Admin Panel...</h2>
          <p className="text-muted-foreground">Please wait while we load the administration interface.</p>
        </div>
      </div>
    }>
      <SuperAdminContent />
    </Suspense>
  )
}

export default SuperAdminPage