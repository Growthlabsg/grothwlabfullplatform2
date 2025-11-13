"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft,
  User,
  Bell,
  Eye,
  Shield,
  Palette,
  Globe,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Settings,
  Save,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  Edit,
  Plus,
  Minus,
  Check,
  X,
  AlertCircle,
  Info,
  HelpCircle,
  ExternalLink,
  Link as LinkIcon,
  Code,
  Zap,
  Star,
  Heart,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Reply,
  Flag,
  Archive,
  Bookmark,
  Share2,
  MoreHorizontal,
  ChevronRight,
  ChevronDown,
  ChevronUp,
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
  Quote,
  Link2,
  Unlink,
  Table,
  Columns,
  Rows,
  PlusCircle,
  MinusCircle,
  XCircle,
  CheckCircle,
  AlertTriangle,
  Target,
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
  Briefcase,
  GraduationCap,
  BookOpen,
  Rocket,
  Database,
  Server,
  Cloud,
  Wifi,
  WifiOff,
  FileText,
  Image,
  Video,
  Search,
  Filter,
  Tag,
  Globe as GlobeIcon,
  Lock,
  Unlock,
  BellOff,
  EyeOff,
  Shield as ShieldIcon,
  Palette as PaletteIcon
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function SettingsPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("profile")
  const [settings, setSettings] = useState({
    // Profile Settings
    username: "sarahchen",
    displayName: "Sarah Chen",
    bio: "AI researcher and startup founder. Passionate about machine learning and building products that matter.",
    email: "sarah@example.com",
    location: "San Francisco, CA",
    website: "https://sarahchen.dev",
    twitter: "@sarahchen_ai",
    github: "sarahchen",
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    commentNotifications: true,
    storyNotifications: true,
    mentionNotifications: true,
    weeklyDigest: true,
    
    // Privacy Settings
    showEmail: false,
    showLocation: true,
    showWebsite: true,
    showSocialLinks: true,
    allowMessages: true,
    showOnlineStatus: true,
    
    // Display Settings
    theme: "light",
    fontSize: "medium",
    compactMode: false,
    showThumbnails: true,
    autoRefresh: true,
    refreshInterval: 30,
    
    // Content Settings
    language: "en",
    timezone: "America/Los_Angeles",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12h",
    
    // Security Settings
    twoFactorAuth: false,
    loginAlerts: true,
    sessionTimeout: 30,
    requirePasswordChange: false
  })

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully.",
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
      description: "Your settings have been exported to a file.",
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
                <Link href="/resources/hacker-news">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Hacker News
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Settings</h1>
                <p className="text-sm text-gray-600">Manage your account and preferences</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleReset}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90" onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="display">Display</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your public profile information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        value={settings.username}
                        onChange={(e) => setSettings({...settings, username: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="displayName">Display Name</Label>
                      <Input
                        id="displayName"
                        value={settings.displayName}
                        onChange={(e) => setSettings({...settings, displayName: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      value={settings.bio}
                      onChange={(e) => setSettings({...settings, bio: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={settings.email}
                        onChange={(e) => setSettings({...settings, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={settings.location}
                        onChange={(e) => setSettings({...settings, location: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={settings.website}
                        onChange={(e) => setSettings({...settings, website: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="twitter">Twitter</Label>
                      <Input
                        id="twitter"
                        value={settings.twitter}
                        onChange={(e) => setSettings({...settings, twitter: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub</Label>
                    <Input
                      id="github"
                      value={settings.github}
                      onChange={(e) => setSettings({...settings, github: e.target.value})}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Choose how you want to be notified</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-gray-500">Receive notifications via email</p>
                      </div>
                      <Switch
                        checked={settings.emailNotifications}
                        onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Push Notifications</Label>
                        <p className="text-sm text-gray-500">Receive push notifications in browser</p>
                      </div>
                      <Switch
                        checked={settings.pushNotifications}
                        onCheckedChange={(checked) => setSettings({...settings, pushNotifications: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Comment Notifications</Label>
                        <p className="text-sm text-gray-500">Get notified when someone comments on your stories</p>
                      </div>
                      <Switch
                        checked={settings.commentNotifications}
                        onCheckedChange={(checked) => setSettings({...settings, commentNotifications: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Story Notifications</Label>
                        <p className="text-sm text-gray-500">Get notified about story updates</p>
                      </div>
                      <Switch
                        checked={settings.storyNotifications}
                        onCheckedChange={(checked) => setSettings({...settings, storyNotifications: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Mention Notifications</Label>
                        <p className="text-sm text-gray-500">Get notified when someone mentions you</p>
                      </div>
                      <Switch
                        checked={settings.mentionNotifications}
                        onCheckedChange={(checked) => setSettings({...settings, mentionNotifications: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Weekly Digest</Label>
                        <p className="text-sm text-gray-500">Receive a weekly summary of activity</p>
                      </div>
                      <Switch
                        checked={settings.weeklyDigest}
                        onCheckedChange={(checked) => setSettings({...settings, weeklyDigest: checked})}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Privacy Tab */}
            <TabsContent value="privacy" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>Control what information is visible to others</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Show Email</Label>
                        <p className="text-sm text-gray-500">Make your email address visible to other users</p>
                      </div>
                      <Switch
                        checked={settings.showEmail}
                        onCheckedChange={(checked) => setSettings({...settings, showEmail: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Show Location</Label>
                        <p className="text-sm text-gray-500">Display your location on your profile</p>
                      </div>
                      <Switch
                        checked={settings.showLocation}
                        onCheckedChange={(checked) => setSettings({...settings, showLocation: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Show Website</Label>
                        <p className="text-sm text-gray-500">Display your website link on your profile</p>
                      </div>
                      <Switch
                        checked={settings.showWebsite}
                        onCheckedChange={(checked) => setSettings({...settings, showWebsite: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Show Social Links</Label>
                        <p className="text-sm text-gray-500">Display your social media links</p>
                      </div>
                      <Switch
                        checked={settings.showSocialLinks}
                        onCheckedChange={(checked) => setSettings({...settings, showSocialLinks: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Allow Messages</Label>
                        <p className="text-sm text-gray-500">Let other users send you direct messages</p>
                      </div>
                      <Switch
                        checked={settings.allowMessages}
                        onCheckedChange={(checked) => setSettings({...settings, allowMessages: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Show Online Status</Label>
                        <p className="text-sm text-gray-500">Display when you're online</p>
                      </div>
                      <Switch
                        checked={settings.showOnlineStatus}
                        onCheckedChange={(checked) => setSettings({...settings, showOnlineStatus: checked})}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Display Tab */}
            <TabsContent value="display" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Display Preferences</CardTitle>
                  <CardDescription>Customize how content is displayed</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Theme</Label>
                      <Select value={settings.theme} onValueChange={(value) => setSettings({...settings, theme: value})}>
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
                      <Label>Font Size</Label>
                      <Select value={settings.fontSize} onValueChange={(value) => setSettings({...settings, fontSize: value})}>
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
                        <Label>Compact Mode</Label>
                        <p className="text-sm text-gray-500">Use a more compact layout</p>
                      </div>
                      <Switch
                        checked={settings.compactMode}
                        onCheckedChange={(checked) => setSettings({...settings, compactMode: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Show Thumbnails</Label>
                        <p className="text-sm text-gray-500">Display story thumbnails when available</p>
                      </div>
                      <Switch
                        checked={settings.showThumbnails}
                        onCheckedChange={(checked) => setSettings({...settings, showThumbnails: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Auto Refresh</Label>
                        <p className="text-sm text-gray-500">Automatically refresh content</p>
                      </div>
                      <Switch
                        checked={settings.autoRefresh}
                        onCheckedChange={(checked) => setSettings({...settings, autoRefresh: checked})}
                      />
                    </div>
                  </div>
                  
                  {settings.autoRefresh && (
                    <div className="space-y-2">
                      <Label>Refresh Interval (seconds)</Label>
                      <Input
                        type="number"
                        value={settings.refreshInterval}
                        onChange={(e) => setSettings({...settings, refreshInterval: parseInt(e.target.value)})}
                        min="10"
                        max="300"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Content Tab */}
            <TabsContent value="content" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Content Preferences</CardTitle>
                  <CardDescription>Set your language and regional preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Language</Label>
                      <Select value={settings.language} onValueChange={(value) => setSettings({...settings, language: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                          <SelectItem value="zh">Chinese</SelectItem>
                          <SelectItem value="ja">Japanese</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Timezone</Label>
                      <Select value={settings.timezone} onValueChange={(value) => setSettings({...settings, timezone: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                          <SelectItem value="America/Denver">Mountain Time</SelectItem>
                          <SelectItem value="America/Chicago">Central Time</SelectItem>
                          <SelectItem value="America/New_York">Eastern Time</SelectItem>
                          <SelectItem value="Europe/London">London</SelectItem>
                          <SelectItem value="Europe/Paris">Paris</SelectItem>
                          <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Date Format</Label>
                      <Select value={settings.dateFormat} onValueChange={(value) => setSettings({...settings, dateFormat: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                          <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                          <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Time Format</Label>
                      <Select value={settings.timeFormat} onValueChange={(value) => setSettings({...settings, timeFormat: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="12h">12 Hour</SelectItem>
                          <SelectItem value="24h">24 Hour</SelectItem>
                        </SelectContent>
                      </Select>
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
                  <CardDescription>Manage your account security</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                      </div>
                      <Switch
                        checked={settings.twoFactorAuth}
                        onCheckedChange={(checked) => setSettings({...settings, twoFactorAuth: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Login Alerts</Label>
                        <p className="text-sm text-gray-500">Get notified of new login attempts</p>
                      </div>
                      <Switch
                        checked={settings.loginAlerts}
                        onCheckedChange={(checked) => setSettings({...settings, loginAlerts: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Require Password Change</Label>
                        <p className="text-sm text-gray-500">Force password change on next login</p>
                      </div>
                      <Switch
                        checked={settings.requirePasswordChange}
                        onCheckedChange={(checked) => setSettings({...settings, requirePasswordChange: checked})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Session Timeout (minutes)</Label>
                    <Input
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) => setSettings({...settings, sessionTimeout: parseInt(e.target.value)})}
                      min="5"
                      max="480"
                    />
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-4">Danger Zone</h4>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Account
                      </Button>
                      <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Reset All Settings
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
