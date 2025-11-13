"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft,
  Save,
  RefreshCw,
  TestTube,
  Mail,
  Send,
  Users,
  Settings,
  Globe,
  Lock,
  Unlock,
  Bell,
  BellOff,
  Shield,
  Key,
  Database,
  Cloud,
  Server,
  Wifi,
  WifiOff,
  CheckCircle,
  AlertCircle,
  Info,
  HelpCircle,
  Lightbulb,
  Zap,
  Award,
  Trophy,
  Medal,
  Crown,
  Gem,
  Sparkles,
  Target,
  Calendar,
  Clock,
  FileText,
  Image,
  Video,
  Link as LinkIcon,
  ChevronDown,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw,
  RotateCw,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Heart,
  MessageCircle,
  Reply,
  Flag,
  Archive,
  Tag,
  Folder,
  FolderOpen,
  Upload,
  Download,
  Copy,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Move,
  Grid,
  List,
  Layout,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Quote,
  Link2,
  Unlink,
  Table,
  Columns,
  Rows,
  PlusCircle,
  MinusCircle,
  XCircle,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Minus,
  Edit,
  Trash2,
  MoreHorizontal,
  Star,
  Share2,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  Search,
  Filter,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Eye,
  MousePointer,
  User,
  UserPlus,
  UserMinus,
  UserCheck,
  UserX
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function NewsletterSettingsPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("general")
  const [settings, setSettings] = useState({
    // General Settings
    newsletterName: "GrowthLab Newsletter",
    newsletterDescription: "Stay updated with the latest startup news, funding updates, and industry insights",
    senderName: "GrowthLab Team",
    senderEmail: "newsletter@growthlab.com",
    replyToEmail: "support@growthlab.com",
    websiteUrl: "https://growthlab.com",
    logoUrl: "",
    timezone: "UTC",
    language: "en",
    
    // Email Settings
    fromName: "GrowthLab",
    fromEmail: "newsletter@growthlab.com",
    replyTo: "support@growthlab.com",
    unsubscribeUrl: "https://growthlab.com/unsubscribe",
    webVersionUrl: "https://growthlab.com/newsletter",
    
    // Design Settings
    primaryColor: "#0F7377",
    secondaryColor: "#F59E0B",
    backgroundColor: "#FFFFFF",
    textColor: "#333333",
    linkColor: "#0F7377",
    fontFamily: "Arial, sans-serif",
    fontSize: "16px",
    
    // Notification Settings
    emailNotifications: true,
    newSubscriberNotification: true,
    unsubscribeNotification: true,
    bounceNotification: true,
    complaintNotification: true,
    weeklyReport: true,
    monthlyReport: true,
    
    // Security Settings
    twoFactorAuth: false,
    apiKey: "sk-1234567890abcdef",
    webhookUrl: "https://growthlab.com/webhook",
    allowedDomains: ["growthlab.com", "app.growthlab.com"],
    rateLimit: 1000,
    
    // Integration Settings
    googleAnalytics: true,
    googleAnalyticsId: "GA-123456789",
    facebookPixel: false,
    facebookPixelId: "",
    twitterCard: true,
    openGraph: true,
    
    // Advanced Settings
    autoResponder: true,
    doubleOptIn: true,
    spamCheck: true,
    bounceHandling: true,
    listCleaning: true,
    segmentation: true,
    personalization: true,
    aBTesting: true
  })

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your newsletter settings have been updated successfully.",
    })
  }

  const handleTest = () => {
    toast({
      title: "Test Email Sent",
      description: "A test email has been sent to your email address.",
    })
  }

  const handleReset = () => {
    toast({
      title: "Settings Reset",
      description: "Settings have been reset to default values.",
    })
  }

  const handleExport = () => {
    toast({
      title: "Settings Exported",
      description: "Your settings have been exported to a JSON file.",
    })
  }

  const handleImport = () => {
    toast({
      title: "Settings Imported",
      description: "Settings have been imported successfully.",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/resources/newsletter">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Newsletters
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Newsletter Settings</h1>
                <p className="text-sm text-gray-600">Configure your newsletter preferences and integrations</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleTest}>
                <TestTube className="h-4 w-4 mr-2" />
                Test Email
              </Button>
              <Button variant="outline" size="sm" onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>

          {/* General Settings Tab */}
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Basic newsletter configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="newsletterName">Newsletter Name</Label>
                    <Input
                      id="newsletterName"
                      value={settings.newsletterName}
                      onChange={(e) => setSettings({...settings, newsletterName: e.target.value})}
                      placeholder="Enter newsletter name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="senderName">Sender Name</Label>
                    <Input
                      id="senderName"
                      value={settings.senderName}
                      onChange={(e) => setSettings({...settings, senderName: e.target.value})}
                      placeholder="Enter sender name"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="newsletterDescription">Description</Label>
                  <Textarea
                    id="newsletterDescription"
                    value={settings.newsletterDescription}
                    onChange={(e) => setSettings({...settings, newsletterDescription: e.target.value})}
                    placeholder="Enter newsletter description"
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="senderEmail">Sender Email</Label>
                    <Input
                      id="senderEmail"
                      type="email"
                      value={settings.senderEmail}
                      onChange={(e) => setSettings({...settings, senderEmail: e.target.value})}
                      placeholder="Enter sender email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="replyToEmail">Reply-To Email</Label>
                    <Input
                      id="replyToEmail"
                      type="email"
                      value={settings.replyToEmail}
                      onChange={(e) => setSettings({...settings, replyToEmail: e.target.value})}
                      placeholder="Enter reply-to email"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="websiteUrl">Website URL</Label>
                    <Input
                      id="websiteUrl"
                      value={settings.websiteUrl}
                      onChange={(e) => setSettings({...settings, websiteUrl: e.target.value})}
                      placeholder="Enter website URL"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="logoUrl">Logo URL</Label>
                    <Input
                      id="logoUrl"
                      value={settings.logoUrl}
                      onChange={(e) => setSettings({...settings, logoUrl: e.target.value})}
                      placeholder="Enter logo URL"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <select
                      id="timezone"
                      value={settings.timezone}
                      onChange={(e) => setSettings({...settings, timezone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">Eastern Time</option>
                      <option value="America/Chicago">Central Time</option>
                      <option value="America/Denver">Mountain Time</option>
                      <option value="America/Los_Angeles">Pacific Time</option>
                      <option value="Europe/London">London</option>
                      <option value="Europe/Paris">Paris</option>
                      <option value="Asia/Tokyo">Tokyo</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <select
                      id="language"
                      value={settings.language}
                      onChange={(e) => setSettings({...settings, language: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                      <option value="it">Italian</option>
                      <option value="pt">Portuguese</option>
                      <option value="ru">Russian</option>
                      <option value="ja">Japanese</option>
                      <option value="ko">Korean</option>
                      <option value="zh">Chinese</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Email Settings Tab */}
          <TabsContent value="email" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Settings</CardTitle>
                <CardDescription>Configure email delivery and formatting</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fromName">From Name</Label>
                    <Input
                      id="fromName"
                      value={settings.fromName}
                      onChange={(e) => setSettings({...settings, fromName: e.target.value})}
                      placeholder="Enter from name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fromEmail">From Email</Label>
                    <Input
                      id="fromEmail"
                      type="email"
                      value={settings.fromEmail}
                      onChange={(e) => setSettings({...settings, fromEmail: e.target.value})}
                      placeholder="Enter from email"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="replyTo">Reply-To</Label>
                    <Input
                      id="replyTo"
                      type="email"
                      value={settings.replyTo}
                      onChange={(e) => setSettings({...settings, replyTo: e.target.value})}
                      placeholder="Enter reply-to email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unsubscribeUrl">Unsubscribe URL</Label>
                    <Input
                      id="unsubscribeUrl"
                      value={settings.unsubscribeUrl}
                      onChange={(e) => setSettings({...settings, unsubscribeUrl: e.target.value})}
                      placeholder="Enter unsubscribe URL"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="webVersionUrl">Web Version URL</Label>
                  <Input
                    id="webVersionUrl"
                    value={settings.webVersionUrl}
                    onChange={(e) => setSettings({...settings, webVersionUrl: e.target.value})}
                    placeholder="Enter web version URL"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Design Settings Tab */}
          <TabsContent value="design" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Design Settings</CardTitle>
                <CardDescription>Customize the visual appearance of your newsletters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="primaryColor"
                        type="color"
                        value={settings.primaryColor}
                        onChange={(e) => setSettings({...settings, primaryColor: e.target.value})}
                        className="w-16 h-10 p-1"
                      />
                      <Input
                        value={settings.primaryColor}
                        onChange={(e) => setSettings({...settings, primaryColor: e.target.value})}
                        placeholder="#0F7377"
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondaryColor">Secondary Color</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="secondaryColor"
                        type="color"
                        value={settings.secondaryColor}
                        onChange={(e) => setSettings({...settings, secondaryColor: e.target.value})}
                        className="w-16 h-10 p-1"
                      />
                      <Input
                        value={settings.secondaryColor}
                        onChange={(e) => setSettings({...settings, secondaryColor: e.target.value})}
                        placeholder="#F59E0B"
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="backgroundColor">Background Color</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="backgroundColor"
                        type="color"
                        value={settings.backgroundColor}
                        onChange={(e) => setSettings({...settings, backgroundColor: e.target.value})}
                        className="w-16 h-10 p-1"
                      />
                      <Input
                        value={settings.backgroundColor}
                        onChange={(e) => setSettings({...settings, backgroundColor: e.target.value})}
                        placeholder="#FFFFFF"
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="textColor">Text Color</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="textColor"
                        type="color"
                        value={settings.textColor}
                        onChange={(e) => setSettings({...settings, textColor: e.target.value})}
                        className="w-16 h-10 p-1"
                      />
                      <Input
                        value={settings.textColor}
                        onChange={(e) => setSettings({...settings, textColor: e.target.value})}
                        placeholder="#333333"
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fontFamily">Font Family</Label>
                    <select
                      id="fontFamily"
                      value={settings.fontFamily}
                      onChange={(e) => setSettings({...settings, fontFamily: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Arial, sans-serif">Arial</option>
                      <option value="Helvetica, sans-serif">Helvetica</option>
                      <option value="Georgia, serif">Georgia</option>
                      <option value="Times New Roman, serif">Times New Roman</option>
                      <option value="Verdana, sans-serif">Verdana</option>
                      <option value="Trebuchet MS, sans-serif">Trebuchet MS</option>
                      <option value="Courier New, monospace">Courier New</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fontSize">Font Size</Label>
                    <select
                      id="fontSize"
                      value={settings.fontSize}
                      onChange={(e) => setSettings({...settings, fontSize: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="14px">14px</option>
                      <option value="16px">16px</option>
                      <option value="18px">18px</option>
                      <option value="20px">20px</option>
                      <option value="22px">22px</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure email notifications for newsletter events</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailNotifications">Email Notifications</Label>
                      <p className="text-sm text-gray-600">Receive email notifications for newsletter events</p>
                    </div>
                    <input
                      id="emailNotifications"
                      type="checkbox"
                      checked={settings.emailNotifications}
                      onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})}
                      className="rounded"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="newSubscriberNotification">New Subscriber Notification</Label>
                      <p className="text-sm text-gray-600">Get notified when someone subscribes</p>
                    </div>
                    <input
                      id="newSubscriberNotification"
                      type="checkbox"
                      checked={settings.newSubscriberNotification}
                      onChange={(e) => setSettings({...settings, newSubscriberNotification: e.target.checked})}
                      className="rounded"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="unsubscribeNotification">Unsubscribe Notification</Label>
                      <p className="text-sm text-gray-600">Get notified when someone unsubscribes</p>
                    </div>
                    <input
                      id="unsubscribeNotification"
                      type="checkbox"
                      checked={settings.unsubscribeNotification}
                      onChange={(e) => setSettings({...settings, unsubscribeNotification: e.target.checked})}
                      className="rounded"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="bounceNotification">Bounce Notification</Label>
                      <p className="text-sm text-gray-600">Get notified when emails bounce</p>
                    </div>
                    <input
                      id="bounceNotification"
                      type="checkbox"
                      checked={settings.bounceNotification}
                      onChange={(e) => setSettings({...settings, bounceNotification: e.target.checked})}
                      className="rounded"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="complaintNotification">Complaint Notification</Label>
                      <p className="text-sm text-gray-600">Get notified when someone marks as spam</p>
                    </div>
                    <input
                      id="complaintNotification"
                      type="checkbox"
                      checked={settings.complaintNotification}
                      onChange={(e) => setSettings({...settings, complaintNotification: e.target.checked})}
                      className="rounded"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="weeklyReport">Weekly Report</Label>
                      <p className="text-sm text-gray-600">Receive weekly performance reports</p>
                    </div>
                    <input
                      id="weeklyReport"
                      type="checkbox"
                      checked={settings.weeklyReport}
                      onChange={(e) => setSettings({...settings, weeklyReport: e.target.checked})}
                      className="rounded"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="monthlyReport">Monthly Report</Label>
                      <p className="text-sm text-gray-600">Receive monthly performance reports</p>
                    </div>
                    <input
                      id="monthlyReport"
                      type="checkbox"
                      checked={settings.monthlyReport}
                      onChange={(e) => setSettings({...settings, monthlyReport: e.target.checked})}
                      className="rounded"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Configure security and access controls</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                      <p className="text-sm text-gray-600">Enable 2FA for additional security</p>
                    </div>
                    <input
                      id="twoFactorAuth"
                      type="checkbox"
                      checked={settings.twoFactorAuth}
                      onChange={(e) => setSettings({...settings, twoFactorAuth: e.target.checked})}
                      className="rounded"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="apiKey">API Key</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="apiKey"
                        value={settings.apiKey}
                        onChange={(e) => setSettings({...settings, apiKey: e.target.value})}
                        type="password"
                        className="flex-1"
                      />
                      <Button variant="outline" size="sm">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="webhookUrl">Webhook URL</Label>
                    <Input
                      id="webhookUrl"
                      value={settings.webhookUrl}
                      onChange={(e) => setSettings({...settings, webhookUrl: e.target.value})}
                      placeholder="Enter webhook URL"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="allowedDomains">Allowed Domains</Label>
                    <Textarea
                      id="allowedDomains"
                      value={settings.allowedDomains.join('\n')}
                      onChange={(e) => setSettings({...settings, allowedDomains: e.target.value.split('\n')})}
                      placeholder="Enter allowed domains (one per line)"
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="rateLimit">Rate Limit (emails per hour)</Label>
                    <Input
                      id="rateLimit"
                      type="number"
                      value={settings.rateLimit}
                      onChange={(e) => setSettings({...settings, rateLimit: parseInt(e.target.value)})}
                      placeholder="1000"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integrations Tab */}
          <TabsContent value="integrations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Integration Settings</CardTitle>
                <CardDescription>Connect with third-party services and analytics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="googleAnalytics">Google Analytics</Label>
                      <p className="text-sm text-gray-600">Track newsletter performance with Google Analytics</p>
                    </div>
                    <input
                      id="googleAnalytics"
                      type="checkbox"
                      checked={settings.googleAnalytics}
                      onChange={(e) => setSettings({...settings, googleAnalytics: e.target.checked})}
                      className="rounded"
                    />
                  </div>
                  
                  {settings.googleAnalytics && (
                    <div className="space-y-2">
                      <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
                      <Input
                        id="googleAnalyticsId"
                        value={settings.googleAnalyticsId}
                        onChange={(e) => setSettings({...settings, googleAnalyticsId: e.target.value})}
                        placeholder="GA-123456789"
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="facebookPixel">Facebook Pixel</Label>
                      <p className="text-sm text-gray-600">Track conversions with Facebook Pixel</p>
                    </div>
                    <input
                      id="facebookPixel"
                      type="checkbox"
                      checked={settings.facebookPixel}
                      onChange={(e) => setSettings({...settings, facebookPixel: e.target.checked})}
                      className="rounded"
                    />
                  </div>
                  
                  {settings.facebookPixel && (
                    <div className="space-y-2">
                      <Label htmlFor="facebookPixelId">Facebook Pixel ID</Label>
                      <Input
                        id="facebookPixelId"
                        value={settings.facebookPixelId}
                        onChange={(e) => setSettings({...settings, facebookPixelId: e.target.value})}
                        placeholder="123456789012345"
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="twitterCard">Twitter Card</Label>
                      <p className="text-sm text-gray-600">Enable Twitter Card previews</p>
                    </div>
                    <input
                      id="twitterCard"
                      type="checkbox"
                      checked={settings.twitterCard}
                      onChange={(e) => setSettings({...settings, twitterCard: e.target.checked})}
                      className="rounded"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="openGraph">Open Graph</Label>
                      <p className="text-sm text-gray-600">Enable Open Graph previews for social sharing</p>
                    </div>
                    <input
                      id="openGraph"
                      type="checkbox"
                      checked={settings.openGraph}
                      onChange={(e) => setSettings({...settings, openGraph: e.target.checked})}
                      className="rounded"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
