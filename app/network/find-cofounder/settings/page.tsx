"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft, 
  Save, 
  Bell, 
  Shield, 
  Eye, 
  Globe, 
  MessageSquare, 
  Users, 
  Mail,
  Smartphone,
  Calendar,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface NotificationSettings {
  email: {
    newMatches: boolean
    messages: boolean
    profileViews: boolean
    weeklyDigest: boolean
    marketing: boolean
  }
  push: {
    newMatches: boolean
    messages: boolean
    profileViews: boolean
    reminders: boolean
  }
  frequency: {
    digest: "daily" | "weekly" | "monthly" | "never"
    reminders: "immediate" | "hourly" | "daily" | "never"
  }
}

interface PrivacySettings {
  profileVisibility: "public" | "connections" | "private"
  showOnlineStatus: boolean
  showLastActive: boolean
  allowMessages: "everyone" | "connections" | "none"
  showLocation: boolean
  showContactInfo: boolean
  searchable: boolean
}

interface MatchingSettings {
  maxDistance: number
  minCompatibility: number
  experienceLevels: string[]
  industries: string[]
  workStyles: string[]
  timeCommitments: string[]
  ageRange: {
    min: number
    max: number
  }
  autoMatch: boolean
}

export default function CoFounderSettings() {
  const { toast } = useToast()
  
  const [notifications, setNotifications] = useState<NotificationSettings>({
    email: {
      newMatches: true,
      messages: true,
      profileViews: false,
      weeklyDigest: true,
      marketing: false
    },
    push: {
      newMatches: true,
      messages: true,
      profileViews: false,
      reminders: true
    },
    frequency: {
      digest: "weekly",
      reminders: "hourly"
    }
  })

  const [privacy, setPrivacy] = useState<PrivacySettings>({
    profileVisibility: "public",
    showOnlineStatus: true,
    showLastActive: true,
    allowMessages: "everyone",
    showLocation: true,
    showContactInfo: false,
    searchable: true
  })

  const [matching, setMatching] = useState<MatchingSettings>({
    maxDistance: 50,
    minCompatibility: 70,
    experienceLevels: ["expert", "senior", "mid-level"],
    industries: ["technology", "fintech", "healthcare", "saas"],
    workStyles: ["remote", "hybrid", "flexible"],
    timeCommitments: ["full-time", "part-time"],
    ageRange: { min: 25, max: 45 },
    autoMatch: true
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    })
  }

  const handleReset = () => {
    toast({
      title: "Settings Reset",
      description: "All settings have been reset to default values.",
    })
  }

  const updateNotification = (category: keyof NotificationSettings, key: string, value: any) => {
    setNotifications(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }))
  }

  const updatePrivacy = (key: keyof PrivacySettings, value: any) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const updateMatching = (key: keyof MatchingSettings, value: any) => {
    setMatching(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" asChild>
              <Link href="/network/find-cofounder">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Find Co-founder
              </Link>
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600 mt-2">
                Manage your co-founder matching preferences and account settings
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleReset}>
                Reset to Default
              </Button>
              <Button onClick={handleSave} disabled={isLoading} className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="notifications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="matching">Matching</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Email Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="new-matches">New Matches</Label>
                      <p className="text-sm text-gray-500">Get notified when you have new potential co-founder matches</p>
                    </div>
                    <Switch
                      id="new-matches"
                      checked={notifications.email.newMatches}
                      onCheckedChange={(checked) => updateNotification("email", "newMatches", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="messages">Messages</Label>
                      <p className="text-sm text-gray-500">Get notified when you receive new messages</p>
                    </div>
                    <Switch
                      id="messages"
                      checked={notifications.email.messages}
                      onCheckedChange={(checked) => updateNotification("email", "messages", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="profile-views">Profile Views</Label>
                      <p className="text-sm text-gray-500">Get notified when someone views your profile</p>
                    </div>
                    <Switch
                      id="profile-views"
                      checked={notifications.email.profileViews}
                      onCheckedChange={(checked) => updateNotification("email", "profileViews", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="weekly-digest">Weekly Digest</Label>
                      <p className="text-sm text-gray-500">Receive a weekly summary of your activity</p>
                    </div>
                    <Switch
                      id="weekly-digest"
                      checked={notifications.email.weeklyDigest}
                      onCheckedChange={(checked) => updateNotification("email", "weeklyDigest", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="marketing">Marketing Updates</Label>
                      <p className="text-sm text-gray-500">Receive updates about new features and tips</p>
                    </div>
                    <Switch
                      id="marketing"
                      checked={notifications.email.marketing}
                      onCheckedChange={(checked) => updateNotification("email", "marketing", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  Push Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-matches">New Matches</Label>
                    <p className="text-sm text-gray-500">Get push notifications for new matches</p>
                  </div>
                  <Switch
                    id="push-matches"
                    checked={notifications.push.newMatches}
                    onCheckedChange={(checked) => updateNotification("push", "newMatches", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-messages">Messages</Label>
                    <p className="text-sm text-gray-500">Get push notifications for new messages</p>
                  </div>
                  <Switch
                    id="push-messages"
                    checked={notifications.push.messages}
                    onCheckedChange={(checked) => updateNotification("push", "messages", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-views">Profile Views</Label>
                    <p className="text-sm text-gray-500">Get push notifications for profile views</p>
                  </div>
                  <Switch
                    id="push-views"
                    checked={notifications.push.profileViews}
                    onCheckedChange={(checked) => updateNotification("push", "profileViews", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-reminders">Reminders</Label>
                    <p className="text-sm text-gray-500">Get reminders to check your matches</p>
                  </div>
                  <Switch
                    id="push-reminders"
                    checked={notifications.push.reminders}
                    onCheckedChange={(checked) => updateNotification("push", "reminders", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Notification Frequency
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="digest-frequency">Digest Frequency</Label>
                  <Select 
                    value={notifications.frequency.digest} 
                    onValueChange={(value) => updateNotification("frequency", "digest", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="reminder-frequency">Reminder Frequency</Label>
                  <Select 
                    value={notifications.frequency.reminders} 
                    onValueChange={(value) => updateNotification("frequency", "reminders", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Profile Visibility
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="profile-visibility">Who can see your profile?</Label>
                  <Select 
                    value={privacy.profileVisibility} 
                    onValueChange={(value) => updatePrivacy("profileVisibility", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Everyone</SelectItem>
                      <SelectItem value="connections">Connections only</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="show-online">Show Online Status</Label>
                      <p className="text-sm text-gray-500">Let others see when you're online</p>
                    </div>
                    <Switch
                      id="show-online"
                      checked={privacy.showOnlineStatus}
                      onCheckedChange={(checked) => updatePrivacy("showOnlineStatus", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="show-last-active">Show Last Active</Label>
                      <p className="text-sm text-gray-500">Show when you were last active</p>
                    </div>
                    <Switch
                      id="show-last-active"
                      checked={privacy.showLastActive}
                      onCheckedChange={(checked) => updatePrivacy("showLastActive", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="show-location">Show Location</Label>
                      <p className="text-sm text-gray-500">Show your location in your profile</p>
                    </div>
                    <Switch
                      id="show-location"
                      checked={privacy.showLocation}
                      onCheckedChange={(checked) => updatePrivacy("showLocation", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="show-contact">Show Contact Info</Label>
                      <p className="text-sm text-gray-500">Show your contact information</p>
                    </div>
                    <Switch
                      id="show-contact"
                      checked={privacy.showContactInfo}
                      onCheckedChange={(checked) => updatePrivacy("showContactInfo", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="searchable">Make Profile Searchable</Label>
                      <p className="text-sm text-gray-500">Allow others to find you in search results</p>
                    </div>
                    <Switch
                      id="searchable"
                      checked={privacy.searchable}
                      onCheckedChange={(checked) => updatePrivacy("searchable", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Messaging Preferences
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="allow-messages">Who can message you?</Label>
                  <Select 
                    value={privacy.allowMessages} 
                    onValueChange={(value) => updatePrivacy("allowMessages", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="everyone">Everyone</SelectItem>
                      <SelectItem value="connections">Connections only</SelectItem>
                      <SelectItem value="none">No one</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Matching Tab */}
          <TabsContent value="matching" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Matching Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="max-distance">Maximum Distance (miles)</Label>
                    <Input
                      id="max-distance"
                      type="number"
                      value={matching.maxDistance}
                      onChange={(e) => updateMatching("maxDistance", parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="min-compatibility">Minimum Compatibility (%)</Label>
                    <Input
                      id="min-compatibility"
                      type="number"
                      value={matching.minCompatibility}
                      onChange={(e) => updateMatching("minCompatibility", parseInt(e.target.value))}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="min-age">Minimum Age</Label>
                    <Input
                      id="min-age"
                      type="number"
                      value={matching.ageRange.min}
                      onChange={(e) => updateMatching("ageRange", { ...matching.ageRange, min: parseInt(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="max-age">Maximum Age</Label>
                    <Input
                      id="max-age"
                      type="number"
                      value={matching.ageRange.max}
                      onChange={(e) => updateMatching("ageRange", { ...matching.ageRange, max: parseInt(e.target.value) })}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-match">Auto-Match</Label>
                    <p className="text-sm text-gray-500">Automatically show compatible profiles</p>
                  </div>
                  <Switch
                    id="auto-match"
                    checked={matching.autoMatch}
                    onCheckedChange={(checked) => updateMatching("autoMatch", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Experience Levels</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {["expert", "senior", "mid-level", "junior"].map((level) => (
                    <div key={level} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={level}
                        checked={matching.experienceLevels.includes(level)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            updateMatching("experienceLevels", [...matching.experienceLevels, level])
                          } else {
                            updateMatching("experienceLevels", matching.experienceLevels.filter(l => l !== level))
                          }
                        }}
                        className="rounded"
                      />
                      <Label htmlFor={level} className="text-sm capitalize">{level}</Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Industries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {["technology", "fintech", "healthcare", "saas", "ai", "blockchain", "ecommerce", "education"].map((industry) => (
                    <div key={industry} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={industry}
                        checked={matching.industries.includes(industry)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            updateMatching("industries", [...matching.industries, industry])
                          } else {
                            updateMatching("industries", matching.industries.filter(i => i !== industry))
                          }
                        }}
                        className="rounded"
                      />
                      <Label htmlFor={industry} className="text-sm capitalize">{industry}</Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Work Styles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {["remote", "in-person", "hybrid", "flexible"].map((style) => (
                    <div key={style} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={style}
                        checked={matching.workStyles.includes(style)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            updateMatching("workStyles", [...matching.workStyles, style])
                          } else {
                            updateMatching("workStyles", matching.workStyles.filter(s => s !== style))
                          }
                        }}
                        className="rounded"
                      />
                      <Label htmlFor={style} className="text-sm capitalize">{style}</Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Account Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Change Password</h4>
                    <p className="text-sm text-gray-500">Update your account password</p>
                  </div>
                  <Button variant="outline">Change Password</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-gray-500">Add an extra layer of security</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-green-600 border-green-200">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Enabled
                    </Badge>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Login Sessions</h4>
                    <p className="text-sm text-gray-500">Manage your active sessions</p>
                  </div>
                  <Button variant="outline">View Sessions</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Danger Zone
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                  <h4 className="font-medium text-red-800">Deactivate Account</h4>
                  <p className="text-sm text-red-600 mb-3">
                    Temporarily deactivate your account. You can reactivate it anytime.
                  </p>
                  <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-100">
                    Deactivate Account
                  </Button>
                </div>
                <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                  <h4 className="font-medium text-red-800">Delete Account</h4>
                  <p className="text-sm text-red-600 mb-3">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-100">
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
