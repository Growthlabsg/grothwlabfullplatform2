"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft,
  Search,
  Filter,
  FileText,
  Download,
  Eye,
  Star,
  Heart,
  Share2,
  Bookmark,
  BookmarkCheck,
  MoreHorizontal,
  Settings,
  HelpCircle,
  Info,
  AlertCircle,
  CheckCircle,
  XCircle,
  Lightbulb,
  Zap,
  Rocket,
  Target,
  TrendingUp,
  BarChart3,
  Building2,
  DollarSign,
  Award,
  Trophy,
  Medal,
  Crown,
  Gem,
  Sparkles,
  MousePointer,
  Calendar,
  Clock,
  Mail,
  Send,
  Upload,
  Plus,
  Edit,
  Trash2,
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
  MessageSquare,
  Reply,
  Flag,
  Archive,
  Tag,
  Folder,
  FolderOpen,
  RefreshCw,
  Save,
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
  XCircle as XCircleIcon,
  CheckCircle2,
  AlertTriangle,
  User,
  UserPlus,
  UserMinus,
  UserCheck,
  UserX,
  Bell,
  BellOff,
  Lock,
  Unlock,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  Globe,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  BookOpen,
  Database,
  Server,
  Cloud,
  Wifi,
  WifiOff,
  Image,
  Video,
  Link as LinkIcon,
  ChevronUp,
  X,
  Users,
  MessageCircle as MessageCircleIcon,
  TrendingDown,
  PieChart,
  Activity,
  LineChart,
  BarChart,
  TrendingUp as TrendingUpIcon
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function ReportSettingsPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("general")
  const [settings, setSettings] = useState({
    // General Settings
    defaultLanguage: "English",
    defaultCategory: "Financial Reports",
    defaultType: "Quarterly Report",
    autoSave: true,
    autoSaveInterval: 5,
    showPreview: true,
    showWordCount: true,
    showPageCount: true,
    
    // Notification Settings
    emailNotifications: true,
    downloadNotifications: true,
    commentNotifications: true,
    ratingNotifications: true,
    weeklyDigest: true,
    monthlyReport: true,
    
    // Privacy Settings
    profileVisibility: "public",
    showEmail: false,
    showPhone: false,
    showLocation: false,
    allowDirectMessages: true,
    allowComments: true,
    allowRatings: true,
    
    // Display Settings
    theme: "light",
    fontSize: "medium",
    showSidebar: true,
    showToolbar: true,
    showStatusBar: true,
    compactMode: false,
    
    // Content Settings
    defaultTags: ["Research", "Analysis", "Report"],
    autoTagging: true,
    contentFiltering: "moderate",
    allowExternalLinks: true,
    allowFileUploads: true,
    maxFileSize: 10,
    allowedFormats: ["PDF", "DOC", "DOCX", "XLS", "XLSX", "PPT", "PPTX"],
    
    // Security Settings
    twoFactorAuth: false,
    sessionTimeout: 30,
    loginNotifications: true,
    deviceManagement: true,
    dataRetention: 365,
    backupFrequency: "weekly"
  })

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been saved successfully.",
    })
  }

  const handleResetSettings = () => {
    toast({
      title: "Settings Reset",
      description: "Settings have been reset to default values.",
    })
  }

  const renderGeneralTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Configure your default report settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="defaultLanguage">Default Language</Label>
              <Select value={settings.defaultLanguage} onValueChange={(value) => handleSettingChange("defaultLanguage", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Spanish">Spanish</SelectItem>
                  <SelectItem value="French">French</SelectItem>
                  <SelectItem value="German">German</SelectItem>
                  <SelectItem value="Chinese">Chinese</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="defaultCategory">Default Category</Label>
              <Select value={settings.defaultCategory} onValueChange={(value) => handleSettingChange("defaultCategory", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Financial Reports">Financial Reports</SelectItem>
                  <SelectItem value="Market Analysis">Market Analysis</SelectItem>
                  <SelectItem value="Startup Reports">Startup Reports</SelectItem>
                  <SelectItem value="Industry Insights">Industry Insights</SelectItem>
                  <SelectItem value="Research Papers">Research Papers</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto Save</Label>
                <p className="text-sm text-gray-500">Automatically save your work as you type</p>
              </div>
              <input
                type="checkbox"
                checked={settings.autoSave}
                onChange={(e) => handleSettingChange("autoSave", e.target.checked)}
                className="rounded"
              />
            </div>
            
            {settings.autoSave && (
              <div className="space-y-2">
                <Label htmlFor="autoSaveInterval">Auto Save Interval (minutes)</Label>
                <Select value={settings.autoSaveInterval.toString()} onValueChange={(value) => handleSettingChange("autoSaveInterval", parseInt(value))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 minute</SelectItem>
                    <SelectItem value="5">5 minutes</SelectItem>
                    <SelectItem value="10">10 minutes</SelectItem>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Show Preview</Label>
                <p className="text-sm text-gray-500">Show live preview while editing</p>
              </div>
              <input
                type="checkbox"
                checked={settings.showPreview}
                onChange={(e) => handleSettingChange("showPreview", e.target.checked)}
                className="rounded"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Show Word Count</Label>
                <p className="text-sm text-gray-500">Display word count in the editor</p>
              </div>
              <input
                type="checkbox"
                checked={settings.showWordCount}
                onChange={(e) => handleSettingChange("showWordCount", e.target.checked)}
                className="rounded"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Show Page Count</Label>
                <p className="text-sm text-gray-500">Display page count in the editor</p>
              </div>
              <input
                type="checkbox"
                checked={settings.showPageCount}
                onChange={(e) => handleSettingChange("showPageCount", e.target.checked)}
                className="rounded"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>Configure how you receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Email Notifications</Label>
                <p className="text-sm text-gray-500">Receive notifications via email</p>
              </div>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => handleSettingChange("emailNotifications", e.target.checked)}
                className="rounded"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Download Notifications</Label>
                <p className="text-sm text-gray-500">Get notified when someone downloads your report</p>
              </div>
              <input
                type="checkbox"
                checked={settings.downloadNotifications}
                onChange={(e) => handleSettingChange("downloadNotifications", e.target.checked)}
                className="rounded"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Comment Notifications</Label>
                <p className="text-sm text-gray-500">Get notified when someone comments on your report</p>
              </div>
              <input
                type="checkbox"
                checked={settings.commentNotifications}
                onChange={(e) => handleSettingChange("commentNotifications", e.target.checked)}
                className="rounded"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Rating Notifications</Label>
                <p className="text-sm text-gray-500">Get notified when someone rates your report</p>
              </div>
              <input
                type="checkbox"
                checked={settings.ratingNotifications}
                onChange={(e) => handleSettingChange("ratingNotifications", e.target.checked)}
                className="rounded"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Weekly Digest</Label>
                <p className="text-sm text-gray-500">Receive a weekly summary of your report performance</p>
              </div>
              <input
                type="checkbox"
                checked={settings.weeklyDigest}
                onChange={(e) => handleSettingChange("weeklyDigest", e.target.checked)}
                className="rounded"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Monthly Report</Label>
                <p className="text-sm text-gray-500">Receive a monthly analytics report</p>
              </div>
              <input
                type="checkbox"
                checked={settings.monthlyReport}
                onChange={(e) => handleSettingChange("monthlyReport", e.target.checked)}
                className="rounded"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderPrivacyTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Privacy Settings</CardTitle>
          <CardDescription>Control your privacy and visibility</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="profileVisibility">Profile Visibility</Label>
            <Select value={settings.profileVisibility} onValueChange={(value) => handleSettingChange("profileVisibility", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="private">Private</SelectItem>
                <SelectItem value="friends">Friends Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Show Email</Label>
                <p className="text-sm text-gray-500">Display your email address on your profile</p>
              </div>
              <input
                type="checkbox"
                checked={settings.showEmail}
                onChange={(e) => handleSettingChange("showEmail", e.target.checked)}
                className="rounded"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Show Phone</Label>
                <p className="text-sm text-gray-500">Display your phone number on your profile</p>
              </div>
              <input
                type="checkbox"
                checked={settings.showPhone}
                onChange={(e) => handleSettingChange("showPhone", e.target.checked)}
                className="rounded"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Show Location</Label>
                <p className="text-sm text-gray-500">Display your location on your profile</p>
              </div>
              <input
                type="checkbox"
                checked={settings.showLocation}
                onChange={(e) => handleSettingChange("showLocation", e.target.checked)}
                className="rounded"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Allow Direct Messages</Label>
                <p className="text-sm text-gray-500">Allow other users to send you direct messages</p>
              </div>
              <input
                type="checkbox"
                checked={settings.allowDirectMessages}
                onChange={(e) => handleSettingChange("allowDirectMessages", e.target.checked)}
                className="rounded"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Allow Comments</Label>
                <p className="text-sm text-gray-500">Allow users to comment on your reports</p>
              </div>
              <input
                type="checkbox"
                checked={settings.allowComments}
                onChange={(e) => handleSettingChange("allowComments", e.target.checked)}
                className="rounded"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Allow Ratings</Label>
                <p className="text-sm text-gray-500">Allow users to rate your reports</p>
              </div>
              <input
                type="checkbox"
                checked={settings.allowRatings}
                onChange={(e) => handleSettingChange("allowRatings", e.target.checked)}
                className="rounded"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderDisplayTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Display Settings</CardTitle>
          <CardDescription>Customize your interface appearance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="theme">Theme</Label>
              <Select value={settings.theme} onValueChange={(value) => handleSettingChange("theme", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="auto">Auto</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fontSize">Font Size</Label>
              <Select value={settings.fontSize} onValueChange={(value) => handleSettingChange("fontSize", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Show Sidebar</Label>
                <p className="text-sm text-gray-500">Display the sidebar navigation</p>
              </div>
              <input
                type="checkbox"
                checked={settings.showSidebar}
                onChange={(e) => handleSettingChange("showSidebar", e.target.checked)}
                className="rounded"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Show Toolbar</Label>
                <p className="text-sm text-gray-500">Display the editing toolbar</p>
              </div>
              <input
                type="checkbox"
                checked={settings.showToolbar}
                onChange={(e) => handleSettingChange("showToolbar", e.target.checked)}
                className="rounded"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Show Status Bar</Label>
                <p className="text-sm text-gray-500">Display the status bar at the bottom</p>
              </div>
              <input
                type="checkbox"
                checked={settings.showStatusBar}
                onChange={(e) => handleSettingChange("showStatusBar", e.target.checked)}
                className="rounded"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Compact Mode</Label>
                <p className="text-sm text-gray-500">Use a more compact interface layout</p>
              </div>
              <input
                type="checkbox"
                checked={settings.compactMode}
                onChange={(e) => handleSettingChange("compactMode", e.target.checked)}
                className="rounded"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderContentTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Content Settings</CardTitle>
          <CardDescription>Configure content creation and management</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Default Tags</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {settings.defaultTags.map((tag, index) => (
                <div key={index} className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded">
                  <span className="text-sm">{tag}</span>
                  <button
                    onClick={() => {
                      const newTags = settings.defaultTags.filter((_, i) => i !== index)
                      handleSettingChange("defaultTags", newTags)
                    }}
                    className="hover:text-red-500"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex space-x-2">
              <Input
                placeholder="Add a default tag"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    const value = e.currentTarget.value.trim()
                    if (value && !settings.defaultTags.includes(value)) {
                      handleSettingChange("defaultTags", [...settings.defaultTags, value])
                      e.currentTarget.value = ''
                    }
                  }
                }}
              />
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto Tagging</Label>
                <p className="text-sm text-gray-500">Automatically suggest tags based on content</p>
              </div>
              <input
                type="checkbox"
                checked={settings.autoTagging}
                onChange={(e) => handleSettingChange("autoTagging", e.target.checked)}
                className="rounded"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contentFiltering">Content Filtering</Label>
              <Select value={settings.contentFiltering} onValueChange={(value) => handleSettingChange("contentFiltering", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="strict">Strict</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="lenient">Lenient</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Allow External Links</Label>
                <p className="text-sm text-gray-500">Allow links to external websites</p>
              </div>
              <input
                type="checkbox"
                checked={settings.allowExternalLinks}
                onChange={(e) => handleSettingChange("allowExternalLinks", e.target.checked)}
                className="rounded"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Allow File Uploads</Label>
                <p className="text-sm text-gray-500">Allow users to upload files</p>
              </div>
              <input
                type="checkbox"
                checked={settings.allowFileUploads}
                onChange={(e) => handleSettingChange("allowFileUploads", e.target.checked)}
                className="rounded"
              />
            </div>
            
            {settings.allowFileUploads && (
              <div className="space-y-2">
                <Label htmlFor="maxFileSize">Maximum File Size (MB)</Label>
                <Input
                  id="maxFileSize"
                  type="number"
                  value={settings.maxFileSize}
                  onChange={(e) => handleSettingChange("maxFileSize", parseInt(e.target.value))}
                  min="1"
                  max="100"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
          <CardDescription>Manage your account security and privacy</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
              </div>
              <input
                type="checkbox"
                checked={settings.twoFactorAuth}
                onChange={(e) => handleSettingChange("twoFactorAuth", e.target.checked)}
                className="rounded"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Select value={settings.sessionTimeout.toString()} onValueChange={(value) => handleSettingChange("sessionTimeout", parseInt(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                  <SelectItem value="480">8 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Login Notifications</Label>
                <p className="text-sm text-gray-500">Get notified when someone logs into your account</p>
              </div>
              <input
                type="checkbox"
                checked={settings.loginNotifications}
                onChange={(e) => handleSettingChange("loginNotifications", e.target.checked)}
                className="rounded"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Device Management</Label>
                <p className="text-sm text-gray-500">Manage devices that can access your account</p>
              </div>
              <input
                type="checkbox"
                checked={settings.deviceManagement}
                onChange={(e) => handleSettingChange("deviceManagement", e.target.checked)}
                className="rounded"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dataRetention">Data Retention (days)</Label>
              <Select value={settings.dataRetention.toString()} onValueChange={(value) => handleSettingChange("dataRetention", parseInt(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="180">180 days</SelectItem>
                  <SelectItem value="365">1 year</SelectItem>
                  <SelectItem value="730">2 years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="backupFrequency">Backup Frequency</Label>
              <Select value={settings.backupFrequency} onValueChange={(value) => handleSettingChange("backupFrequency", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/resources/reports">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Reports
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Report Settings</h1>
                <p className="text-sm text-gray-600">Manage your report preferences and settings</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleResetSettings}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90" onClick={handleSaveSettings}>
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="display">Display</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6">
              {renderGeneralTab()}
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              {renderNotificationsTab()}
            </TabsContent>

            <TabsContent value="privacy" className="space-y-6">
              {renderPrivacyTab()}
            </TabsContent>

            <TabsContent value="display" className="space-y-6">
              {renderDisplayTab()}
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              {renderSecurityTab()}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
