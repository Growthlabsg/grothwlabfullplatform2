"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Bell,
  Mail,
  MessageSquare,
  Users,
  DollarSign,
  Target,
  CheckCircle,
  AlertCircle,
  Clock,
  Star,
  Heart,
  Share2,
  Eye,
  TrendingUp,
  Settings,
  Plus,
  Trash2,
  Edit,
  Copy,
  Send,
  Download,
  Upload,
  Filter,
  Search,
  MoreHorizontal,
  X,
  Check,
  Zap,
  Gift,
  Calendar,
  MapPin,
  User,
  Building2,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Save
} from "lucide-react"

interface Notification {
  id: string
  type: 'backer' | 'comment' | 'milestone' | 'update' | 'system'
  title: string
  message: string
  timestamp: string
  isRead: boolean
  isUrgent: boolean
  action?: string
  data?: any
}

interface EmailTemplate {
  id: string
  name: string
  subject: string
  content: string
  variables: string[]
  category: 'backer' | 'update' | 'milestone' | 'general'
}

interface NotificationSettings {
  email: {
    newBacker: boolean
    newComment: boolean
    milestone: boolean
    projectUpdate: boolean
    dailyDigest: boolean
  }
  push: {
    newBacker: boolean
    newComment: boolean
    milestone: boolean
    projectUpdate: boolean
  }
  sms: {
    urgent: boolean
    milestone: boolean
  }
}

export function NotificationSystem() {
  const [activeTab, setActiveTab] = useState("notifications")
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null)
  const [settings, setSettings] = useState<NotificationSettings>({
    email: {
      newBacker: true,
      newComment: true,
      milestone: true,
      projectUpdate: true,
      dailyDigest: false
    },
    push: {
      newBacker: true,
      newComment: false,
      milestone: true,
      projectUpdate: true
    },
    sms: {
      urgent: true,
      milestone: true
    }
  })

  const notifications: Notification[] = [
    {
      id: "1",
      type: "backer",
      title: "New Backer: Sarah Johnson",
      message: "Sarah Johnson backed your project with $200",
      timestamp: "2 hours ago",
      isRead: false,
      isUrgent: false,
      action: "View Profile"
    },
    {
      id: "2",
      type: "milestone",
      title: "Milestone Reached: 80% Funded!",
      message: "Congratulations! You've reached 80% of your funding goal",
      timestamp: "4 hours ago",
      isRead: false,
      isUrgent: true,
      action: "Share Milestone"
    },
    {
      id: "3",
      type: "comment",
      title: "New Comment from Michael Chen",
      message: "Michael Chen commented: 'Great progress! When do you expect to start shipping?'",
      timestamp: "6 hours ago",
      isRead: true,
      isUrgent: false,
      action: "Reply"
    },
    {
      id: "4",
      type: "update",
      title: "Project Update Published",
      message: "Your update 'Prototype Testing Complete!' was published successfully",
      timestamp: "1 day ago",
      isRead: true,
      isUrgent: false,
      action: "View Update"
    },
    {
      id: "5",
      type: "system",
      title: "Campaign Ending Soon",
      message: "Your campaign ends in 12 days. Consider extending or promoting more actively",
      timestamp: "2 days ago",
      isRead: true,
      isUrgent: true,
      action: "Extend Campaign"
    }
  ]

  const emailTemplates: EmailTemplate[] = [
    {
      id: "1",
      name: "Welcome New Backer",
      subject: "Welcome to [ProjectName] - Thank you for your support!",
      content: `Hi [BackerName],

Thank you for backing [ProjectName]! Your support means the world to us.

Your pledge: $[PledgeAmount]
Reward: [RewardName]
Estimated delivery: [DeliveryDate]

We'll keep you updated on our progress. You can track your reward status in your dashboard.

Best regards,
[CreatorName]`,
      variables: ["BackerName", "ProjectName", "PledgeAmount", "RewardName", "DeliveryDate", "CreatorName"],
      category: "backer"
    },
    {
      id: "2",
      name: "Milestone Celebration",
      subject: "🎉 [ProjectName] - We reached [MilestonePercentage]% funded!",
      content: `Dear Backers,

We're thrilled to announce that [ProjectName] has reached [MilestonePercentage]% of our funding goal!

This incredible milestone wouldn't be possible without your support. Thank you to all [BackerCount] backers who believe in our vision.

What's next:
- [NextMilestone]%: [NextMilestoneReward]
- Production planning begins
- Regular updates on progress

Stay tuned for more exciting updates!

Best regards,
[CreatorName]`,
      variables: ["ProjectName", "MilestonePercentage", "BackerCount", "NextMilestone", "NextMilestoneReward", "CreatorName"],
      category: "milestone"
    },
    {
      id: "3",
      name: "Project Update",
      subject: "📢 [ProjectName] - [UpdateTitle]",
      content: `Hi Backers,

We have exciting news to share about [ProjectName]!

[UpdateContent]

Key highlights:
- [Highlight1]
- [Highlight2]
- [Highlight3]

We're [ProgressPercentage]% funded with [DaysLeft] days remaining.

Thank you for your continued support!

Best regards,
[CreatorName]`,
      variables: ["ProjectName", "UpdateTitle", "UpdateContent", "Highlight1", "Highlight2", "Highlight3", "ProgressPercentage", "DaysLeft", "CreatorName"],
      category: "update"
    }
  ]

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "backer": return <Users className="w-4 h-4" />
      case "comment": return <MessageSquare className="w-4 h-4" />
      case "milestone": return <Target className="w-4 h-4" />
      case "update": return <Bell className="w-4 h-4" />
      case "system": return <Settings className="w-4 h-4" />
      default: return <Bell className="w-4 h-4" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "backer": return "bg-green-100 text-green-800"
      case "comment": return "bg-blue-100 text-blue-800"
      case "milestone": return "bg-yellow-100 text-yellow-800"
      case "update": return "bg-purple-100 text-purple-800"
      case "system": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
    return date.toLocaleDateString()
  }

  const renderNotification = (notification: Notification) => (
    <Card key={notification?.id} className={`mb-3 ${!notification?.isRead ? 'border-l-4 border-l-[#0F7377]' : ''}`}>
      <CardContent className="pt-4">
        <div className="flex items-start gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getNotificationColor(notification?.type)}`}>
            {getNotificationIcon(notification?.type)}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium">{notification?.title}</h3>
                  {notification?.isUrgent && (
                    <Badge className="bg-red-100 text-red-800">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Urgent
                    </Badge>
                  )}
                  {!notification?.isRead && (
                    <Badge className="bg-[#0F7377] text-white">
                      New
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-2">{notification?.message}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{formatTimestamp(notification?.timestamp)}</span>
                  {notification?.action && (
                    <Button variant="ghost" size="sm">
                      {notification?.action}
                    </Button>
                  )}
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderEmailTemplate = (template: EmailTemplate) => (
    <Card key={template.id} className="mb-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{template.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{template.category} template</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium">Subject</label>
            <p className="text-sm text-muted-foreground">{template.subject}</p>
          </div>
          <div>
            <label className="text-sm font-medium">Variables</label>
            <div className="flex flex-wrap gap-1 mt-1">
              {template.variables.map((variable) => (
                <Badge key={variable} variant="secondary" className="text-xs">
                  {variable}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Preview</label>
            <div className="mt-1 p-3 bg-gray-50 rounded-lg text-sm">
              {template.content.substring(0, 150)}...
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]">Notification System</h1>
          <p className="text-[#64748B]">Manage notifications and communication</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Logs
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Template
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#0F7377]">
                {notifications.filter(n => !n.isRead).length}
              </div>
              <div className="text-sm text-muted-foreground">Unread</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#0F7377]">
                {notifications.filter(n => n.isUrgent).length}
              </div>
              <div className="text-sm text-muted-foreground">Urgent</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#0F7377]">
                {emailTemplates.length}
              </div>
              <div className="text-sm text-muted-foreground">Templates</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#0F7377]">
                24h
              </div>
              <div className="text-sm text-muted-foreground">Response Time</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="templates">Email Templates</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Input
                placeholder="Search notifications..."
                className="w-64"
              />
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="backer">Backers</SelectItem>
                  <SelectItem value="comment">Comments</SelectItem>
                  <SelectItem value="milestone">Milestones</SelectItem>
                  <SelectItem value="update">Updates</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Mark All Read
              </Button>
              <Button variant="outline" size="sm">
                <Trash2 className="w-4 h-4 mr-2" />
                Clear
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {notifications.map(renderNotification)}
          </div>
        </TabsContent>

        {/* Email Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Email Templates</h2>
              <p className="text-sm text-muted-foreground">Manage your email communication templates</p>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Template
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Templates</h3>
              <div className="space-y-4">
                {emailTemplates.map(renderEmailTemplate)}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Template Editor</h3>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Template Name</label>
                      <Input placeholder="Enter template name" className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Category</label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="backer">Backer</SelectItem>
                          <SelectItem value="update">Update</SelectItem>
                          <SelectItem value="milestone">Milestone</SelectItem>
                          <SelectItem value="general">General</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Subject</label>
                      <Input placeholder="Email subject" className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Content</label>
                      <Textarea 
                        placeholder="Email content with variables like [BackerName]"
                        className="mt-1"
                        rows={8}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button>
                        <Save className="w-4 h-4 mr-2" />
                        Save Template
                      </Button>
                      <Button variant="outline">
                        <Send className="w-4 h-4 mr-2" />
                        Test Send
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
                  <div className="space-y-3">
                    {Object.entries(settings.email).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <label className="font-medium">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
                          <p className="text-sm text-muted-foreground">
                            Receive email notifications for {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) => setSettings(prev => ({
                            ...prev,
                            email: { ...prev.email, [key]: e.target.checked }
                          }))}
                          className="w-4 h-4"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Push Notifications</h3>
                  <div className="space-y-3">
                    {Object.entries(settings.push).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <label className="font-medium">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
                          <p className="text-sm text-muted-foreground">
                            Receive push notifications for {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) => setSettings(prev => ({
                            ...prev,
                            push: { ...prev.push, [key]: e.target.checked }
                          }))}
                          className="w-4 h-4"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">SMS Notifications</h3>
                  <div className="space-y-3">
                    {Object.entries(settings.sms).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <label className="font-medium">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
                          <p className="text-sm text-muted-foreground">
                            Receive SMS for {key.replace(/([A-Z])/g, ' $1').toLowerCase()} events
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) => setSettings(prev => ({
                            ...prev,
                            sms: { ...prev.sms, [key]: e.target.checked }
                          }))}
                          className="w-4 h-4"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Email Open Rate</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-[#0F7377] h-2 rounded-full" style={{ width: '68%' }} />
                      </div>
                      <span className="text-sm font-medium">68%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Click Rate</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-[#0F7377] h-2 rounded-full" style={{ width: '42%' }} />
                      </div>
                      <span className="text-sm font-medium">42%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Response Rate</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-[#0F7377] h-2 rounded-full" style={{ width: '85%' }} />
                      </div>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Backer Notifications</span>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Comment Notifications</span>
                    <span className="text-sm font-medium">28%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Milestone Notifications</span>
                    <span className="text-sm font-medium">15%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">System Notifications</span>
                    <span className="text-sm font-medium">12%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 