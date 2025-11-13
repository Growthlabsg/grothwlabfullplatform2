"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft,
  Settings,
  User,
  Bell,
  Shield,
  Globe,
  Palette,
  Download,
  Upload,
  Trash2,
  Save,
  Eye,
  EyeOff,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Languages,
  Volume2,
  VolumeX
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function SettingsPage() {
  const { toast } = useToast()
  const [isMobile, setIsMobile] = useState(false)
  const [settings, setSettings] = useState({
    profile: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      bio: "Passionate entrepreneur learning to build the next big thing.",
      location: "San Francisco, CA",
      timezone: "PST",
      language: "English"
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      courseUpdates: true,
      newCourses: true,
      certificates: true,
      reminders: true,
      marketing: false
    },
    privacy: {
      profileVisibility: "public",
      showProgress: true,
      showAchievements: true,
      allowMessages: true,
      dataSharing: false
    },
    appearance: {
      theme: "light",
      fontSize: "medium",
      compactMode: false,
      animations: true
    },
    learning: {
      autoPlay: false,
      playbackSpeed: "1x",
      subtitles: true,
      quality: "auto",
      downloadQuality: "high"
    }
  })

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    })
  }

  const handleExport = () => {
    toast({
      title: "Data Exported",
      description: "Your data has been exported successfully.",
    })
  }

  const handleDelete = () => {
    toast({
      title: "Account Deleted",
      description: "Your account has been deleted successfully.",
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
                <Link href="/resources/startup-school">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Startup School
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Settings</h1>
                <p className="text-sm text-gray-600">Manage your account and preferences</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="learning">Learning</TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={settings.profile.firstName}
                      onChange={(e) => setSettings({
                        ...settings,
                        profile: { ...settings.profile, firstName: e.target.value }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={settings.profile.lastName}
                      onChange={(e) => setSettings({
                        ...settings,
                        profile: { ...settings.profile, lastName: e.target.value }
                      })}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.profile.email}
                    onChange={(e) => setSettings({
                      ...settings,
                      profile: { ...settings.profile, email: e.target.value }
                    })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={settings.profile.phone}
                    onChange={(e) => setSettings({
                      ...settings,
                      profile: { ...settings.profile, phone: e.target.value }
                    })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input
                    id="bio"
                    value={settings.profile.bio}
                    onChange={(e) => setSettings({
                      ...settings,
                      profile: { ...settings.profile, bio: e.target.value }
                    })}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={settings.profile.location}
                      onChange={(e) => setSettings({
                        ...settings,
                        profile: { ...settings.profile, location: e.target.value }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select value={settings.profile.timezone} onValueChange={(value) => setSettings({
                      ...settings,
                      profile: { ...settings.profile, timezone: value }
                    })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PST">Pacific Standard Time</SelectItem>
                        <SelectItem value="MST">Mountain Standard Time</SelectItem>
                        <SelectItem value="CST">Central Standard Time</SelectItem>
                        <SelectItem value="EST">Eastern Standard Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose how you want to be notified about updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-gray-600">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={settings.notifications.emailNotifications}
                    onCheckedChange={(checked) => setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, emailNotifications: checked }
                    })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-gray-600">Receive push notifications on your device</p>
                  </div>
                  <Switch
                    checked={settings.notifications.pushNotifications}
                    onCheckedChange={(checked) => setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, pushNotifications: checked }
                    })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Course Updates</Label>
                    <p className="text-sm text-gray-600">Get notified when your courses are updated</p>
                  </div>
                  <Switch
                    checked={settings.notifications.courseUpdates}
                    onCheckedChange={(checked) => setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, courseUpdates: checked }
                    })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>New Courses</Label>
                    <p className="text-sm text-gray-600">Be notified about new courses in your interests</p>
                  </div>
                  <Switch
                    checked={settings.notifications.newCourses}
                    onCheckedChange={(checked) => setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, newCourses: checked }
                    })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Certificates</Label>
                    <p className="text-sm text-gray-600">Get notified when you earn certificates</p>
                  </div>
                  <Switch
                    checked={settings.notifications.certificates}
                    onCheckedChange={(checked) => setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, certificates: checked }
                    })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Learning Reminders</Label>
                    <p className="text-sm text-gray-600">Receive reminders to continue learning</p>
                  </div>
                  <Switch
                    checked={settings.notifications.reminders}
                    onCheckedChange={(checked) => setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, reminders: checked }
                    })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Marketing Emails</Label>
                    <p className="text-sm text-gray-600">Receive promotional emails and updates</p>
                  </div>
                  <Switch
                    checked={settings.notifications.marketing}
                    onCheckedChange={(checked) => setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, marketing: checked }
                    })}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Settings */}
          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>Control your privacy and data sharing preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Profile Visibility</Label>
                  <Select value={settings.privacy.profileVisibility} onValueChange={(value) => setSettings({
                    ...settings,
                    privacy: { ...settings.privacy, profileVisibility: value }
                  })}>
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
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Learning Progress</Label>
                    <p className="text-sm text-gray-600">Allow others to see your course progress</p>
                  </div>
                  <Switch
                    checked={settings.privacy.showProgress}
                    onCheckedChange={(checked) => setSettings({
                      ...settings,
                      privacy: { ...settings.privacy, showProgress: checked }
                    })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Achievements</Label>
                    <p className="text-sm text-gray-600">Display your certificates and achievements</p>
                  </div>
                  <Switch
                    checked={settings.privacy.showAchievements}
                    onCheckedChange={(checked) => setSettings({
                      ...settings,
                      privacy: { ...settings.privacy, showAchievements: checked }
                    })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Allow Messages</Label>
                    <p className="text-sm text-gray-600">Let other users send you messages</p>
                  </div>
                  <Switch
                    checked={settings.privacy.allowMessages}
                    onCheckedChange={(checked) => setSettings({
                      ...settings,
                      privacy: { ...settings.privacy, allowMessages: checked }
                    })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Data Sharing</Label>
                    <p className="text-sm text-gray-600">Share anonymized data for platform improvement</p>
                  </div>
                  <Switch
                    checked={settings.privacy.dataSharing}
                    onCheckedChange={(checked) => setSettings({
                      ...settings,
                      privacy: { ...settings.privacy, dataSharing: checked }
                    })}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Settings */}
          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>Customize the look and feel of your learning experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <Select value={settings.appearance.theme} onValueChange={(value) => setSettings({
                    ...settings,
                    appearance: { ...settings.appearance, theme: value }
                  })}>
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
                  <Select value={settings.appearance.fontSize} onValueChange={(value) => setSettings({
                    ...settings,
                    appearance: { ...settings.appearance, fontSize: value }
                  })}>
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
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Compact Mode</Label>
                    <p className="text-sm text-gray-600">Use a more compact interface</p>
                  </div>
                  <Switch
                    checked={settings.appearance.compactMode}
                    onCheckedChange={(checked) => setSettings({
                      ...settings,
                      appearance: { ...settings.appearance, compactMode: checked }
                    })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Animations</Label>
                    <p className="text-sm text-gray-600">Enable interface animations</p>
                  </div>
                  <Switch
                    checked={settings.appearance.animations}
                    onCheckedChange={(checked) => setSettings({
                      ...settings,
                      appearance: { ...settings.appearance, animations: checked }
                    })}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Learning Settings */}
          <TabsContent value="learning" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Learning Preferences</CardTitle>
                <CardDescription>Customize your learning experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-play Videos</Label>
                    <p className="text-sm text-gray-600">Automatically play the next video in a course</p>
                  </div>
                  <Switch
                    checked={settings.learning.autoPlay}
                    onCheckedChange={(checked) => setSettings({
                      ...settings,
                      learning: { ...settings.learning, autoPlay: checked }
                    })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Playback Speed</Label>
                  <Select value={settings.learning.playbackSpeed} onValueChange={(value) => setSettings({
                    ...settings,
                    learning: { ...settings.learning, playbackSpeed: value }
                  })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.5x">0.5x</SelectItem>
                      <SelectItem value="0.75x">0.75x</SelectItem>
                      <SelectItem value="1x">1x</SelectItem>
                      <SelectItem value="1.25x">1.25x</SelectItem>
                      <SelectItem value="1.5x">1.5x</SelectItem>
                      <SelectItem value="2x">2x</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Subtitles</Label>
                    <p className="text-sm text-gray-600">Show subtitles by default</p>
                  </div>
                  <Switch
                    checked={settings.learning.subtitles}
                    onCheckedChange={(checked) => setSettings({
                      ...settings,
                      learning: { ...settings.learning, subtitles: checked }
                    })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Video Quality</Label>
                  <Select value={settings.learning.quality} onValueChange={(value) => setSettings({
                    ...settings,
                    learning: { ...settings.learning, quality: value }
                  })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto</SelectItem>
                      <SelectItem value="low">Low (480p)</SelectItem>
                      <SelectItem value="medium">Medium (720p)</SelectItem>
                      <SelectItem value="high">High (1080p)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Download Quality</Label>
                  <Select value={settings.learning.downloadQuality} onValueChange={(value) => setSettings({
                    ...settings,
                    learning: { ...settings.learning, downloadQuality: value }
                  })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low (480p)</SelectItem>
                      <SelectItem value="medium">Medium (720p)</SelectItem>
                      <SelectItem value="high">High (1080p)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Danger Zone */}
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600">Danger Zone</CardTitle>
            <CardDescription>Irreversible actions that affect your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
              <div>
                <h4 className="font-medium text-red-600">Delete Account</h4>
                <p className="text-sm text-gray-600">Permanently delete your account and all data</p>
              </div>
              <Button variant="destructive" onClick={handleDelete}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
