"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { 
  Server, 
  Shield, 
  Database, 
  Globe, 
  Settings, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Activity,
  Zap,
  Lock,
  Eye,
  Users,
  HardDrive,
  Network,
  Cpu
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { SystemConfiguration, SecuritySettings } from "@/types/founder"
import { useFounderAuth } from "@/contexts/founder-auth-context"

// Mock system configuration data
const mockSystemConfig: SystemConfiguration = {
  id: "main",
  environment: "production",
  version: "2.1.0",
  lastDeployment: "2024-12-19T08:00:00Z",
  nextScheduledDeployment: "2024-12-26T08:00:00Z",
  autoScaling: {
    enabled: true,
    minInstances: 3,
    maxInstances: 10,
    targetCpuUtilization: 70
  },
  database: {
    type: "PostgreSQL",
    version: "15.4",
    size: "500GB",
    backupFrequency: "daily",
    retentionDays: 30
  },
  cdn: {
    enabled: true,
    provider: "Cloudflare",
    regions: ["US", "EU", "APAC"]
  },
  monitoring: {
    enabled: true,
    uptime: 99.98,
    responseTime: 120,
    errorRate: 0.02
  },
  maintenance: {
    enabled: false,
    nextWindow: "2024-12-22T02:00:00Z",
    duration: "2 hours"
  }
}

// Mock security settings data
const mockSecuritySettings: SecuritySettings = {
  id: "security",
  twoFactorAuth: {
    enabled: true,
    requiredForAdmins: true,
    requiredForUsers: false
  },
  passwordPolicy: {
    minLength: 12,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    expirationDays: 90
  },
  sessionManagement: {
    maxConcurrentSessions: 3,
    sessionTimeoutMinutes: 480,
    rememberMeDays: 30
  },
  ipWhitelist: {
    enabled: false,
    allowedIPs: ["192.168.1.0/24", "10.0.0.0/8"]
  },
  rateLimiting: {
    enabled: true,
    requestsPerMinute: 100,
    burstLimit: 200
  },
  auditLogging: {
    enabled: true,
    retentionDays: 365,
    logLevel: "info"
  }
}

export default function PlatformControl() {
  const { toast } = useToast()
  const [systemConfig, setSystemConfig] = useState<SystemConfiguration>(mockSystemConfig)
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>(mockSecuritySettings)
  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false)
  const [isSecurityDialogOpen, setIsSecurityDialogOpen] = useState(false)
  const [isMaintenanceDialogOpen, setIsMaintenanceDialogOpen] = useState(false)
  const [maintenanceConfig, setMaintenanceConfig] = useState({
    enabled: false,
    startTime: "",
    duration: "2 hours",
    message: "Scheduled maintenance in progress"
  })

  const handleUpdateSystemConfig = (updates: Partial<SystemConfiguration>) => {
    setSystemConfig({ ...systemConfig, ...updates })
    toast({
      title: "System Configuration Updated",
      description: "System settings have been updated successfully",
    })
  }

  const handleUpdateSecuritySettings = (updates: Partial<SecuritySettings>) => {
    setSecuritySettings({ ...securitySettings, ...updates })
    toast({
      title: "Security Settings Updated",
      description: "Security configuration has been updated successfully",
    })
  }

  const handleToggleMaintenance = () => {
    if (maintenanceConfig.enabled) {
      setSystemConfig({
        ...systemConfig,
        maintenance: {
          ...systemConfig.maintenance,
          enabled: false
        }
      })
      toast({
        title: "Maintenance Mode Disabled",
        description: "Platform is now accessible to users",
      })
    } else {
      setIsMaintenanceDialogOpen(true)
    }
  }

  const handleScheduleMaintenance = () => {
    if (!maintenanceConfig.startTime) {
      toast({
        title: "Validation Error",
        description: "Please select a start time for maintenance",
        variant: "destructive"
      })
      return
    }

    setSystemConfig({
      ...systemConfig,
      maintenance: {
        enabled: true,
        nextWindow: maintenanceConfig.startTime,
        duration: maintenanceConfig.duration
      }
    })

    setIsMaintenanceDialogOpen(false)
    toast({
      title: "Maintenance Scheduled",
      description: `Maintenance mode will be enabled at ${new Date(maintenanceConfig.startTime).toLocaleString()}`,
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational": return "bg-green-100 text-green-800"
      case "degraded": return "bg-yellow-100 text-yellow-800"
      case "outage": return "bg-red-100 text-red-800"
      case "maintenance": return "bg-blue-100 text-blue-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getUptimeColor = (uptime: number) => {
    if (uptime >= 99.9) return "text-green-600"
    if (uptime >= 99.5) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Platform Control</h2>
          <p className="text-muted-foreground">
            Manage system configurations, security settings, and infrastructure controls
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant={systemConfig.maintenance.enabled ? "destructive" : "outline"}
            onClick={handleToggleMaintenance}
          >
            {systemConfig.maintenance.enabled ? "Disable Maintenance" : "Enable Maintenance"}
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsConfigDialogOpen(true)}
          >
            System Settings
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsSecurityDialogOpen(true)}
          >
            Security Settings
          </Button>
        </div>
      </div>

      {/* System Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${systemConfig.maintenance.enabled ? 'bg-blue-500' : 'bg-green-500'}`} />
              <span className="text-sm font-medium">
                {systemConfig.maintenance.enabled ? "Maintenance" : "Operational"}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Version {systemConfig.version}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uptime</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getUptimeColor(systemConfig.monitoring.uptime)}`}>
              {systemConfig.monitoring.uptime}%
            </div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {systemConfig.monitoring.responseTime}ms
            </div>
            <p className="text-xs text-muted-foreground">
              Average
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {systemConfig.monitoring.errorRate}%
            </div>
            <p className="text-xs text-muted-foreground">
              Last 24 hours
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5" />
                  <span>Environment Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Environment</span>
                  <Badge variant="outline">{systemConfig.environment}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Version</span>
                  <span className="font-medium">{systemConfig.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Last Deployment</span>
                  <span className="font-medium">
                    {new Date(systemConfig.lastDeployment).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Next Deployment</span>
                  <span className="font-medium">
                    {new Date(systemConfig.nextScheduledDeployment).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5" />
                  <span>Database Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Type</span>
                  <span className="font-medium">{systemConfig.database.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Version</span>
                  <span className="font-medium">{systemConfig.database.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Size</span>
                  <span className="font-medium">{systemConfig.database.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Backup</span>
                  <span className="font-medium">{systemConfig.database.backupFrequency}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="infrastructure" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Cpu className="h-5 w-5" />
                  <span>Auto Scaling</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Auto Scaling</span>
                  <Switch
                    checked={systemConfig.autoScaling.enabled}
                    onCheckedChange={(enabled) => 
                      handleUpdateSystemConfig({
                        autoScaling: { ...systemConfig.autoScaling, enabled }
                      })
                    }
                  />
                </div>
                {systemConfig.autoScaling.enabled && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm">Min Instances</Label>
                        <Input
                          type="number"
                          value={systemConfig.autoScaling.minInstances}
                          onChange={(e) => 
                            handleUpdateSystemConfig({
                              autoScaling: { 
                                ...systemConfig.autoScaling, 
                                minInstances: parseInt(e.target.value) || 1 
                              }
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label className="text-sm">Max Instances</Label>
                        <Input
                          type="number"
                          value={systemConfig.autoScaling.maxInstances}
                          onChange={(e) => 
                            handleUpdateSystemConfig({
                              autoScaling: { 
                                ...systemConfig.autoScaling, 
                                maxInstances: parseInt(e.target.value) || 10 
                              }
                            })
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm">Target CPU Utilization (%)</Label>
                      <Input
                        type="number"
                        value={systemConfig.autoScaling.targetCpuUtilization}
                        onChange={(e) => 
                          handleUpdateSystemConfig({
                            autoScaling: { 
                              ...systemConfig.autoScaling, 
                              targetCpuUtilization: parseInt(e.target.value) || 70 
                            }
                          })
                        }
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Network className="h-5 w-5" />
                  <span>CDN Configuration</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">CDN Enabled</span>
                  <Switch
                    checked={systemConfig.cdn.enabled}
                    onCheckedChange={(enabled) => 
                      handleUpdateSystemConfig({
                        cdn: { ...systemConfig.cdn, enabled }
                      })
                    }
                  />
                </div>
                {systemConfig.cdn.enabled && (
                  <>
                    <div>
                      <Label className="text-sm">Provider</Label>
                      <Input
                        value={systemConfig.cdn.provider}
                        onChange={(e) => 
                          handleUpdateSystemConfig({
                            cdn: { ...systemConfig.cdn, provider: e.target.value }
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Regions</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {systemConfig.cdn.regions.map((region, index) => (
                          <Badge key={index} variant="outline">
                            {region}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lock className="h-5 w-5" />
                  <span>Two-Factor Authentication</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">2FA Enabled</span>
                  <Switch
                    checked={securitySettings.twoFactorAuth.enabled}
                    onCheckedChange={(enabled) => 
                      handleUpdateSecuritySettings({
                        twoFactorAuth: { ...securitySettings.twoFactorAuth, enabled }
                      })
                    }
                  />
                </div>
                {securitySettings.twoFactorAuth.enabled && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Required for Admins</span>
                      <Switch
                        checked={securitySettings.twoFactorAuth.requiredForAdmins}
                        onCheckedChange={(required) => 
                          handleUpdateSecuritySettings({
                            twoFactorAuth: { ...securitySettings.twoFactorAuth, requiredForAdmins: required }
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Required for Users</span>
                      <Switch
                        checked={securitySettings.twoFactorAuth.requiredForUsers}
                        onCheckedChange={(required) => 
                          handleUpdateSecuritySettings({
                            twoFactorAuth: { ...securitySettings.twoFactorAuth, requiredForUsers: required }
                          })
                        }
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Password Policy</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm">Min Length</Label>
                    <Input
                      type="number"
                      value={securitySettings.passwordPolicy.minLength}
                      onChange={(e) => 
                        handleUpdateSecuritySettings({
                          passwordPolicy: { 
                            ...securitySettings.passwordPolicy, 
                            minLength: parseInt(e.target.value) || 8 
                          }
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Expiration (days)</Label>
                    <Input
                      type="number"
                      value={securitySettings.passwordPolicy.expirationDays}
                      onChange={(e) => 
                        handleUpdateSecuritySettings({
                          passwordPolicy: { 
                            ...securitySettings.passwordPolicy, 
                            expirationDays: parseInt(e.target.value) || 90 
                          }
                        })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={securitySettings.passwordPolicy.requireUppercase}
                      onCheckedChange={(required) => 
                        handleUpdateSecuritySettings({
                          passwordPolicy: { ...securitySettings.passwordPolicy, requireUppercase: required }
                        })
                      }
                    />
                    <Label className="text-sm">Require Uppercase</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={securitySettings.passwordPolicy.requireLowercase}
                      onCheckedChange={(required) => 
                        handleUpdateSecuritySettings({
                          passwordPolicy: { ...securitySettings.passwordPolicy, requireLowercase: required }
                        })
                      }
                    />
                    <Label className="text-sm">Require Lowercase</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={securitySettings.passwordPolicy.requireNumbers}
                      onCheckedChange={(required) => 
                        handleUpdateSecuritySettings({
                          passwordPolicy: { ...securitySettings.passwordPolicy, requireNumbers: required }
                        })
                      }
                    />
                    <Label className="text-sm">Require Numbers</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={securitySettings.passwordPolicy.requireSpecialChars}
                      onCheckedChange={(required) => 
                        handleUpdateSecuritySettings({
                          passwordPolicy: { ...securitySettings.passwordPolicy, requireSpecialChars: required }
                        })
                      }
                    />
                    <Label className="text-sm">Require Special Characters</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Performance Metrics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {systemConfig.monitoring.uptime}%
                  </div>
                  <p className="text-sm text-muted-foreground">Uptime</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    {systemConfig.monitoring.responseTime}ms
                  </div>
                  <p className="text-sm text-muted-foreground">Response Time</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">
                    {systemConfig.monitoring.errorRate}%
                  </div>
                  <p className="text-sm text-muted-foreground">Error Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Maintenance Mode Dialog */}
      <Dialog open={isMaintenanceDialogOpen} onOpenChange={setIsMaintenanceDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule Maintenance Mode</DialogTitle>
            <DialogDescription>
              Configure when maintenance mode should be enabled
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Start Time</Label>
              <Input
                type="datetime-local"
                value={maintenanceConfig.startTime}
                onChange={(e) => setMaintenanceConfig({...maintenanceConfig, startTime: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Duration</Label>
              <Select value={maintenanceConfig.duration} onValueChange={(value) => setMaintenanceConfig({...maintenanceConfig, duration: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1 hour">1 hour</SelectItem>
                  <SelectItem value="2 hours">2 hours</SelectItem>
                  <SelectItem value="4 hours">4 hours</SelectItem>
                  <SelectItem value="8 hours">8 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Message for Users</Label>
              <Input
                value={maintenanceConfig.message}
                onChange={(e) => setMaintenanceConfig({...maintenanceConfig, message: e.target.value})}
                placeholder="Scheduled maintenance in progress..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsMaintenanceDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleScheduleMaintenance}>Schedule Maintenance</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* System Configuration Dialog */}
      <Dialog open={isConfigDialogOpen} onOpenChange={setIsConfigDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>System Configuration</DialogTitle>
            <DialogDescription>
              Update system-wide configuration settings
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Environment</Label>
                <Select value={systemConfig.environment} onValueChange={(value) => handleUpdateSystemConfig({ environment: value as any })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="staging">Staging</SelectItem>
                    <SelectItem value="production">Production</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Version</Label>
                <Input
                  value={systemConfig.version}
                  onChange={(e) => handleUpdateSystemConfig({ version: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Next Scheduled Deployment</Label>
              <Input
                type="datetime-local"
                value={systemConfig.nextScheduledDeployment.replace('Z', '')}
                onChange={(e) => handleUpdateSystemConfig({ nextScheduledDeployment: e.target.value + 'Z' })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfigDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsConfigDialogOpen(false)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Security Settings Dialog */}
      <Dialog open={isSecurityDialogOpen} onOpenChange={setIsSecurityDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Security Settings</DialogTitle>
            <DialogDescription>
              Configure security and access control settings
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Max Concurrent Sessions</Label>
                <Input
                  type="number"
                  value={securitySettings.sessionManagement.maxConcurrentSessions}
                  onChange={(e) => 
                    handleUpdateSecuritySettings({
                      sessionManagement: { 
                        ...securitySettings.sessionManagement, 
                        maxConcurrentSessions: parseInt(e.target.value) || 3 
                      }
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Session Timeout (minutes)</Label>
                <Input
                  type="number"
                  value={securitySettings.sessionManagement.sessionTimeoutMinutes}
                  onChange={(e) => 
                    handleUpdateSecuritySettings({
                      sessionManagement: { 
                        ...securitySettings.sessionManagement, 
                        sessionTimeoutMinutes: parseInt(e.target.value) || 480 
                      }
                    })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Rate Limiting (requests per minute)</Label>
              <Input
                type="number"
                value={securitySettings.rateLimiting.requestsPerMinute}
                onChange={(e) => 
                  handleUpdateSecuritySettings({
                    rateLimiting: { 
                      ...securitySettings.rateLimiting, 
                      requestsPerMinute: parseInt(e.target.value) || 100 
                    }
                  })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSecurityDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsSecurityDialogOpen(false)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
