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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Settings,
  Database,
  Globe,
  Shield,
  Mail,
  Bell,
  FileText,
  Key,
  Server,
  Network,
  Cloud,
  Lock,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
  Download,
  Upload,
  Plus,
  Trash2,
  Edit,
  Copy,
  CheckCircle,
  AlertTriangle,
  Info,
  ExternalLink,
  Zap,
  Users,
  Calendar,
  MapPin,
  Building,
  CreditCard,
  BarChart3
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ConfigSection {
  id: string
  name: string
  description: string
  icon: any
  settings: ConfigSetting[]
}

interface ConfigSetting {
  id: string
  name: string
  description: string
  type: "text" | "number" | "boolean" | "select" | "textarea" | "password"
  value: any
  required: boolean
  category: string
  options?: string[]
  validation?: {
    min?: number
    max?: number
    pattern?: string
  }
}

const mockConfigSections: ConfigSection[] = [
  {
    id: "general",
    name: "General Settings",
    description: "Basic platform configuration and branding",
    icon: Settings,
    settings: [
      {
        id: "platform_name",
        name: "Platform Name",
        description: "The name displayed throughout the platform",
        type: "text",
        value: "GrowthLab",
        required: true,
        category: "branding"
      },
      {
        id: "platform_domain",
        name: "Platform Domain",
        description: "Primary domain for the platform",
        type: "text",
        value: "growthlab.sg",
        required: true,
        category: "branding"
      },
      {
        id: "timezone",
        name: "Default Timezone",
        description: "Default timezone for the platform",
        type: "select",
        value: "Asia/Singapore",
        required: true,
        category: "localization",
        options: ["Asia/Singapore", "UTC", "America/New_York", "Europe/London"]
      },
      {
        id: "default_language",
        name: "Default Language",
        description: "Primary language for the platform",
        type: "select",
        value: "en",
        required: true,
        category: "localization",
        options: ["en", "zh", "ms", "ta"]
      },
      {
        id: "maintenance_mode",
        name: "Maintenance Mode",
        description: "Enable maintenance mode to restrict access",
        type: "boolean",
        value: false,
        required: false,
        category: "system"
      }
    ]
  },
  {
    id: "database",
    name: "Database Configuration",
    description: "Database connection and performance settings",
    icon: Database,
    settings: [
      {
        id: "db_host",
        name: "Database Host",
        description: "Database server hostname or IP address",
        type: "text",
        value: "localhost",
        required: true,
        category: "connection"
      },
      {
        id: "db_port",
        name: "Database Port",
        description: "Database server port number",
        type: "number",
        value: 5432,
        required: true,
        category: "connection",
        validation: { min: 1, max: 65535 }
      },
      {
        id: "db_name",
        name: "Database Name",
        description: "Name of the database to connect to",
        type: "text",
        value: "growthlab_production",
        required: true,
        category: "connection"
      },
      {
        id: "db_pool_size",
        name: "Connection Pool Size",
        description: "Maximum number of database connections",
        type: "number",
        value: 20,
        required: true,
        category: "performance",
        validation: { min: 1, max: 100 }
      },
      {
        id: "db_ssl",
        name: "SSL Connection",
        description: "Enable SSL for database connections",
        type: "boolean",
        value: true,
        required: false,
        category: "security"
      }
    ]
  },
  {
    id: "email",
    name: "Email Configuration",
    description: "Email service and notification settings",
    icon: Mail,
    settings: [
      {
        id: "smtp_host",
        name: "SMTP Host",
        description: "SMTP server hostname",
        type: "text",
        value: "smtp.gmail.com",
        required: true,
        category: "smtp"
      },
      {
        id: "smtp_port",
        name: "SMTP Port",
        description: "SMTP server port",
        type: "number",
        value: 587,
        required: true,
        category: "smtp",
        validation: { min: 1, max: 65535 }
      },
      {
        id: "smtp_username",
        name: "SMTP Username",
        description: "SMTP authentication username",
        type: "text",
        value: "noreply@growthlab.sg",
        required: true,
        category: "smtp"
      },
      {
        id: "smtp_password",
        name: "SMTP Password",
        description: "SMTP authentication password",
        type: "password",
        value: "********",
        required: true,
        category: "smtp"
      },
      {
        id: "email_from",
        name: "From Email Address",
        description: "Default sender email address",
        type: "text",
        value: "noreply@growthlab.sg",
        required: true,
        category: "smtp"
      },
      {
        id: "email_verification",
        name: "Email Verification",
        description: "Require email verification for new users",
        type: "boolean",
        value: true,
        required: false,
        category: "security"
      }
    ]
  },
  {
    id: "security",
    name: "Security Settings",
    description: "Security and authentication configuration",
    icon: Shield,
    settings: [
      {
        id: "session_timeout",
        name: "Session Timeout",
        description: "User session timeout in minutes",
        type: "number",
        value: 1440,
        required: true,
        category: "authentication",
        validation: { min: 15, max: 10080 }
      },
      {
        id: "password_min_length",
        name: "Minimum Password Length",
        description: "Minimum required password length",
        type: "number",
        value: 8,
        required: true,
        category: "authentication",
        validation: { min: 6, max: 32 }
      },
      {
        id: "password_complexity",
        name: "Password Complexity",
        description: "Require complex passwords",
        type: "boolean",
        value: true,
        required: false,
        category: "authentication"
      },
      {
        id: "two_factor_required",
        name: "Two-Factor Authentication",
        description: "Require 2FA for all users",
        type: "boolean",
        value: false,
        required: false,
        category: "authentication"
      },
      {
        id: "rate_limiting",
        name: "Rate Limiting",
        description: "Enable API rate limiting",
        type: "boolean",
        value: true,
        required: false,
        category: "security"
      },
      {
        id: "max_login_attempts",
        name: "Max Login Attempts",
        description: "Maximum failed login attempts before lockout",
        type: "number",
        value: 5,
        required: true,
        category: "security",
        validation: { min: 1, max: 20 }
      }
    ]
  },
  {
    id: "notifications",
    name: "Notification Settings",
    description: "System notification and alert configuration",
    icon: Bell,
    settings: [
      {
        id: "email_notifications",
        name: "Email Notifications",
        description: "Enable email notifications",
        type: "boolean",
        value: true,
        required: false,
        category: "email"
      },
      {
        id: "push_notifications",
        name: "Push Notifications",
        description: "Enable push notifications",
        type: "boolean",
        value: true,
        required: false,
        category: "push"
      },
      {
        id: "admin_alerts",
        name: "Admin Alerts",
        description: "Send alerts to administrators",
        type: "boolean",
        value: true,
        required: false,
        category: "admin"
      },
      {
        id: "alert_email",
        name: "Alert Email Address",
        description: "Email address for system alerts",
        type: "text",
        value: "alerts@growthlab.sg",
        required: true,
        category: "admin"
      }
    ]
  },
  {
    id: "api",
    name: "API Configuration",
    description: "API settings and external integrations",
    icon: Network,
    settings: [
      {
        id: "api_rate_limit",
        name: "API Rate Limit",
        description: "Requests per minute per user",
        type: "number",
        value: 100,
        required: true,
        category: "rate_limiting",
        validation: { min: 10, max: 1000 }
      },
      {
        id: "api_timeout",
        name: "API Timeout",
        description: "API request timeout in seconds",
        type: "number",
        value: 30,
        required: true,
        category: "performance",
        validation: { min: 5, max: 300 }
      },
      {
        id: "cors_enabled",
        name: "CORS Enabled",
        description: "Enable Cross-Origin Resource Sharing",
        type: "boolean",
        value: true,
        required: false,
        category: "security"
      },
      {
        id: "cors_origins",
        name: "CORS Origins",
        description: "Allowed CORS origins (comma-separated)",
        type: "textarea",
        value: "https://growthlab.sg,https://app.growthlab.sg",
        required: false,
        category: "security"
      }
    ]
  }
]

export function SystemConfiguration() {
  const { toast } = useToast()
  const [configSections, setConfigSections] = useState<ConfigSection[]>(mockConfigSections)
  const [selectedSection, setSelectedSection] = useState<string>("general")
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({})
  const [hasChanges, setHasChanges] = useState(false)
  const [showSaveDialog, setShowSaveDialog] = useState(false)

  const handleSettingChange = (sectionId: string, settingId: string, value: any) => {
    setConfigSections(prev => 
      prev.map(section => 
        section.id === sectionId 
          ? {
              ...section,
              settings: section.settings.map(setting =>
                setting.id === settingId ? { ...setting, value } : setting
              )
            }
          : section
      )
    )
    setHasChanges(true)
  }

  const handleSaveConfiguration = () => {
    // Simulate saving configuration
    setTimeout(() => {
      setHasChanges(false)
      toast({
        title: "Configuration Saved",
        description: "System configuration has been updated successfully",
      })
      setShowSaveDialog(false)
    }, 1000)
  }

  const handleResetConfiguration = () => {
    setConfigSections(mockConfigSections)
    setHasChanges(false)
    toast({
      title: "Configuration Reset",
      description: "Configuration has been reset to default values",
    })
  }

  const handleExportConfiguration = () => {
    const config = configSections.reduce((acc, section) => {
      acc[section.id] = section.settings.reduce((sectionAcc, setting) => {
        sectionAcc[setting.id] = setting.value
        return sectionAcc
      }, {} as Record<string, any>)
      return acc
    }, {} as Record<string, any>)

    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'growthlab-config.json'
    a.click()
    URL.revokeObjectURL(url)

    toast({
      title: "Configuration Exported",
      description: "Configuration has been exported to JSON file",
    })
  }

  const renderSettingInput = (setting: ConfigSetting, sectionId: string) => {
    const commonProps = {
      id: setting.id,
      value: setting.value,
      onChange: (e: any) => handleSettingChange(sectionId, setting.id, e.target.value),
      className: "w-full"
    }

    switch (setting.type) {
      case "text":
        return <Input {...commonProps} placeholder={`Enter ${setting.name.toLowerCase()}`} />
      
      case "number":
        return (
          <Input 
            {...commonProps}
            type="number"
            min={setting.validation?.min}
            max={setting.validation?.max}
            placeholder={`Enter ${setting.name.toLowerCase()}`}
          />
        )
      
      case "password":
        return (
          <div className="relative">
            <Input 
              {...commonProps}
              type={showPassword[setting.id] ? "text" : "password"}
              placeholder="Enter password"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(prev => ({ ...prev, [setting.id]: !prev[setting.id] }))}
            >
              {showPassword[setting.id] ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
        )
      
      case "select":
        return (
          <Select value={setting.value} onValueChange={(value) => handleSettingChange(sectionId, setting.id, value)}>
            <SelectTrigger>
              <SelectValue placeholder={`Select ${setting.name.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {setting.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      
      case "textarea":
        return (
          <Textarea 
            {...commonProps}
            rows={3}
            placeholder={`Enter ${setting.name.toLowerCase()}`}
          />
        )
      
      case "boolean":
        return (
          <Switch
            checked={setting.value}
            onCheckedChange={(checked) => handleSettingChange(sectionId, setting.id, checked)}
          />
        )
      
      default:
        return <Input {...commonProps} />
    }
  }

  const currentSection = configSections.find(section => section.id === selectedSection)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">System Configuration</h2>
          <p className="text-muted-foreground">
            Configure platform settings, environment variables, and system behavior
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {hasChanges && (
            <Badge variant="destructive">
              <AlertTriangle className="w-3 h-3 mr-1" />
              Unsaved Changes
            </Badge>
          )}
          <Button variant="outline" onClick={handleResetConfiguration}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button variant="outline" onClick={handleExportConfiguration}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button 
            onClick={() => setShowSaveDialog(true)}
            disabled={!hasChanges}
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Configuration Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Configuration Sections</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {configSections.map((section) => {
                  const Icon = section.icon
                  return (
                    <button type="button"
                      key={section.id}
                      onClick={() => setSelectedSection(section.id)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                        selectedSection === section.id
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <div>
                        <div className="font-medium">{section.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {section.settings.length} settings
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {currentSection && (
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <currentSection.icon className="w-6 h-6" />
                  <div>
                    <CardTitle>{currentSection.name}</CardTitle>
                    <CardDescription>{currentSection.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {currentSection.settings.map((setting) => (
                    <div key={setting.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor={setting.id} className="text-base font-medium">
                            {setting.name}
                            {setting.required && <span className="text-red-500 ml-1">*</span>}
                          </Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            {setting.description}
                          </p>
                        </div>
                        {setting.type === "boolean" && (
                          <div className="flex items-center space-x-2">
                            <Label htmlFor={setting.id} className="text-sm">
                              {setting.value ? "Enabled" : "Disabled"}
                            </Label>
                            {renderSettingInput(setting, currentSection.id)}
                          </div>
                        )}
                      </div>
                      
                      {setting.type !== "boolean" && (
                        <div className="max-w-md">
                          {renderSettingInput(setting, currentSection.id)}
                        </div>
                      )}
                      
                      {setting.validation && (
                        <div className="text-xs text-muted-foreground">
                          {setting.validation.min && setting.validation.max && (
                            <span>Range: {setting.validation.min} - {setting.validation.max}</span>
                          )}
                          {setting.validation.pattern && (
                            <span>Pattern: {setting.validation.pattern}</span>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Save Configuration Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Configuration Changes</DialogTitle>
            <DialogDescription>
              Are you sure you want to save the configuration changes? This will update the system settings and may require a restart.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveConfiguration}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 