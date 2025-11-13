'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  MessageSquare, 
  Phone, 
  Users, 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Copy, 
  ExternalLink, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Star,
  Zap,
  Shield,
  Bell,
  FileText,
  Image,
  Video,
  File,
  Send,
  Download,
  Upload,
  RefreshCw,
  QrCode,
  Smartphone,
  Globe,
  Key,
  Eye,
  EyeOff
} from 'lucide-react'

interface WhatsAppBusinessConfig {
  phoneNumber: string
  businessName: string
  businessDescription: string
  webhookUrl: string
  accessToken: string
  isConnected: boolean
  lastSync: Date
  messageTemplates: MessageTemplate[]
  autoReplies: AutoReply[]
  businessHours: BusinessHours
  awayMessage: string
  isAwayModeEnabled: boolean
}

interface MessageTemplate {
  id: string
  name: string
  content: string
  category: string
  language: string
  status: 'approved' | 'pending' | 'rejected'
  createdAt: Date
}

interface AutoReply {
  id: string
  name: string
  trigger: string
  message: string
  isEnabled: boolean
}

interface BusinessHours {
  enabled: boolean
  schedule: {
    [key: string]: {
      open: string
      close: string
      isOpen: boolean
    }
  }
}

export function WhatsAppBusinessIntegration() {
  const [config, setConfig] = useState<WhatsAppBusinessConfig>({
    phoneNumber: '+65 9123 4567',
    businessName: 'GrowthLab',
    businessDescription: 'Startup accelerator and innovation hub',
    webhookUrl: 'https://api.growthlab.sg/webhooks/whatsapp',
    accessToken: '••••••••••••••••••••••••••••••••',
    isConnected: true,
    lastSync: new Date(),
    messageTemplates: [
      {
        id: '1',
        name: 'Welcome Message',
        content: 'Welcome to GrowthLab! We\'re excited to help you grow your startup. How can we assist you today?',
        category: 'greeting',
        language: 'en',
        status: 'approved',
        createdAt: new Date()
      },
      {
        id: '2',
        name: 'Appointment Confirmation',
        content: 'Your appointment with GrowthLab has been confirmed for {date} at {time}. We look forward to meeting you!',
        category: 'appointment',
        language: 'en',
        status: 'approved',
        createdAt: new Date()
      },
      {
        id: '3',
        name: 'Business Hours',
        content: 'Our business hours are Monday-Friday 9:00 AM - 6:00 PM. We\'ll respond to your message during these hours.',
        category: 'business',
        language: 'en',
        status: 'pending',
        createdAt: new Date()
      }
    ],
    autoReplies: [
      {
        id: '1',
        name: 'Out of Hours Reply',
        trigger: 'business_hours',
        message: 'Thank you for your message. We\'re currently outside business hours and will respond when we return.',
        isEnabled: true
      },
      {
        id: '2',
        name: 'Quick Response',
        trigger: 'immediate',
        message: 'Thanks for reaching out! We\'ll get back to you shortly.',
        isEnabled: true
      }
    ],
    businessHours: {
      enabled: true,
      schedule: {
        monday: { open: '09:00', close: '18:00', isOpen: true },
        tuesday: { open: '09:00', close: '18:00', isOpen: true },
        wednesday: { open: '09:00', close: '18:00', isOpen: true },
        thursday: { open: '09:00', close: '18:00', isOpen: true },
        friday: { open: '09:00', close: '18:00', isOpen: true },
        saturday: { open: '10:00', close: '16:00', isOpen: true },
        sunday: { open: '00:00', close: '00:00', isOpen: false }
      }
    },
    awayMessage: 'We\'re currently away and will respond when we return. For urgent matters, please call us at +65 9123 4567.',
    isAwayModeEnabled: false
  })

  const [showAccessToken, setShowAccessToken] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  const daysOfWeek = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' }
  ]

  const handleSaveConfig = () => {
    // Save configuration to backend
    console.log('Saving WhatsApp Business configuration:', config)
  }

  const handleSyncContacts = () => {
    // Sync contacts from WhatsApp Business API
    console.log('Syncing contacts...')
  }

  const handleTestWebhook = () => {
    // Test webhook endpoint
    console.log('Testing webhook...')
  }

  const copyAccessToken = () => {
    navigator.clipboard.writeText(config.accessToken)
  }

  const generateQRCode = () => {
    // Generate QR code for WhatsApp Business setup
    console.log('Generating QR code...')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-green-500 rounded-lg flex items-center justify-center">
            <MessageSquare className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">WhatsApp Business Integration</h1>
            <p className="text-muted-foreground">Manage your WhatsApp Business account and communications</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant={config.isConnected ? 'default' : 'destructive'}>
            {config.isConnected ? 'Connected' : 'Disconnected'}
          </Badge>
          <Button onClick={handleSaveConfig}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Connection Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-green-500" />
            Connection Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <div className="h-3 w-3 bg-green-500 rounded-full"></div>
              <div>
                <p className="font-medium">API Status</p>
                <p className="text-sm text-muted-foreground">Connected</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <div className="h-3 w-3 bg-green-500 rounded-full"></div>
              <div>
                <p className="font-medium">Webhook</p>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <div className="h-3 w-3 bg-green-500 rounded-full"></div>
              <div>
                <p className="font-medium">Last Sync</p>
                <p className="text-sm text-muted-foreground">
                  {config.lastSync.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleSyncContacts}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Sync Contacts
            </Button>
            <Button variant="outline" onClick={handleTestWebhook}>
              <Globe className="h-4 w-4 mr-2" />
              Test Webhook
            </Button>
            <Button variant="outline" onClick={generateQRCode}>
              <QrCode className="h-4 w-4 mr-2" />
              Generate QR Code
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Configuration */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="auto-replies">Auto Replies</TabsTrigger>
          <TabsTrigger value="business-hours">Business Hours</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Business Information */}
            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
                <CardDescription>Update your business details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="business-name">Business Name</Label>
                  <Input
                    id="business-name"
                    value={config.businessName}
                    onChange={(e) => setConfig({ ...config, businessName: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="business-description">Business Description</Label>
                  <Textarea
                    id="business-description"
                    value={config.businessDescription}
                    onChange={(e) => setConfig({ ...config, businessDescription: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone-number">Phone Number</Label>
                  <Input
                    id="phone-number"
                    value={config.phoneNumber}
                    onChange={(e) => setConfig({ ...config, phoneNumber: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* API Configuration */}
            <Card>
              <CardHeader>
                <CardTitle>API Configuration</CardTitle>
                <CardDescription>Manage your WhatsApp Business API settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <Input
                    id="webhook-url"
                    value={config.webhookUrl}
                    onChange={(e) => setConfig({ ...config, webhookUrl: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="access-token">Access Token</Label>
                  <div className="flex gap-2">
                    <Input
                      id="access-token"
                      type={showAccessToken ? 'text' : 'password'}
                      value={config.accessToken}
                      onChange={(e) => setConfig({ ...config, accessToken: e.target.value })}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setShowAccessToken(!showAccessToken)}
                    >
                      {showAccessToken ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button variant="outline" size="icon" onClick={copyAccessToken}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Message Templates</h3>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Template
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {config.messageTemplates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{template.name}</CardTitle>
                    <Badge variant={
                      template.status === 'approved' ? 'default' : 
                      template.status === 'pending' ? 'secondary' : 'destructive'
                    }>
                      {template.status}
                    </Badge>
                  </div>
                  <CardDescription>
                    {template.category} • {template.language}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                    {template.content}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Created {template.createdAt.toLocaleDateString()}</span>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Auto Replies Tab */}
        <TabsContent value="auto-replies" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Auto Replies</h3>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Auto Reply
            </Button>
          </div>
          
          <div className="space-y-4">
            {config.autoReplies.map((reply) => (
              <Card key={reply.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{reply.name}</h4>
                        <Badge variant="outline">{reply.trigger}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{reply.message}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={reply.isEnabled}
                        onCheckedChange={(checked) => {
                          setConfig({
                            ...config,
                            autoReplies: config.autoReplies.map(r =>
                              r.id === reply.id ? { ...r, isEnabled: checked } : r
                            )
                          })
                        }}
                      />
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Business Hours Tab */}
        <TabsContent value="business-hours" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Business Hours</h3>
            <Switch
              checked={config.businessHours.enabled}
              onCheckedChange={(checked) => {
                setConfig({
                  ...config,
                  businessHours: { ...config.businessHours, enabled: checked }
                })
              }}
            />
          </div>
          
          <div className="space-y-4">
            {daysOfWeek.map((day) => (
              <Card key={day.key}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Switch
                        checked={config.businessHours.schedule[day.key as keyof typeof config.businessHours.schedule]?.isOpen}
                        onCheckedChange={(checked) => {
                          setConfig({
                            ...config,
                            businessHours: {
                              ...config.businessHours,
                              schedule: {
                                ...config.businessHours.schedule,
                                [day.key]: {
                                  ...config.businessHours.schedule[day.key as keyof typeof config.businessHours.schedule],
                                  isOpen: checked
                                }
                              }
                            }
                          })
                        }}
                      />
                      <span className="font-medium min-w-[80px]">{day.label}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Input
                        type="time"
                        value={config.businessHours.schedule[day.key as keyof typeof config.businessHours.schedule]?.open}
                        onChange={(e) => {
                          setConfig({
                            ...config,
                            businessHours: {
                              ...config.businessHours,
                              schedule: {
                                ...config.businessHours.schedule,
                                [day.key]: {
                                  ...config.businessHours.schedule[day.key as keyof typeof config.businessHours.schedule],
                                  open: e.target.value
                                }
                              }
                            }
                          })
                        }}
                        className="w-24"
                      />
                      <span>to</span>
                      <Input
                        type="time"
                        value={config.businessHours.schedule[day.key as keyof typeof config.businessHours.schedule]?.close}
                        onChange={(e) => {
                          setConfig({
                            ...config,
                            businessHours: {
                              ...config.businessHours,
                              schedule: {
                                ...config.businessHours.schedule,
                                [day.key]: {
                                  ...config.businessHours.schedule[day.key as keyof typeof config.businessHours.schedule],
                                  close: e.target.value
                                }
                              }
                            }
                          })
                        }}
                        className="w-24"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Away Mode */}
            <Card>
              <CardHeader>
                <CardTitle>Away Mode</CardTitle>
                <CardDescription>Configure automatic away messages</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="away-mode">Enable Away Mode</Label>
                  <Switch
                    id="away-mode"
                    checked={config.isAwayModeEnabled}
                    onCheckedChange={(checked) => setConfig({ ...config, isAwayModeEnabled: checked })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="away-message">Away Message</Label>
                  <Textarea
                    id="away-message"
                    value={config.awayMessage}
                    onChange={(e) => setConfig({ ...config, awayMessage: e.target.value })}
                    placeholder="Enter your away message..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Manage notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="message-notifications">Message Notifications</Label>
                  <Switch id="message-notifications" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="mention-notifications">Mention Notifications</Label>
                  <Switch id="mention-notifications" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <Switch id="email-notifications" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
