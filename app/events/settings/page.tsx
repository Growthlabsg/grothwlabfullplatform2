"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft,
  Save,
  Bell,
  Mail,
  Shield,
  Globe,
  Users,
  Calendar,
  Settings as SettingsIcon,
  Check
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function EventsSettingsPage() {
  const { toast } = useToast()
  const [settings, setSettings] = useState({
    // Notification Settings
    emailNotifications: true,
    eventReminders: true,
    newEventAlerts: true,
    cancellationAlerts: true,
    weeklyDigest: true,
    pushNotifications: false,
    
    // Privacy Settings
    showProfile: true,
    showAttendance: true,
    allowDirectMessages: true,
    showContactInfo: false,
    
    // Event Settings
    autoAcceptRSVP: false,
    requireApproval: true,
    maxAttendees: 100,
    allowWaitlist: true,
    requirePayment: false,
    
    // Display Settings
    timezone: "SGT",
    dateFormat: "MM/DD/YYYY",
    language: "English",
    theme: "light",
    
    // Integration Settings
    calendarSync: true,
    socialSharing: true,
    analyticsTracking: true,
    
    // Organization Settings
    organizationName: "GrowthLab",
    contactEmail: "events@growthlab.com",
    website: "https://growthlab.com",
    description: "Empowering startups through events and networking"
  })

  const handleSave = () => {
    // Simulate saving settings
    toast({
      title: "Settings Saved",
      description: "Your event settings have been updated successfully.",
    })
  }

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/events">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Events
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Event Settings</h1>
                <p className="text-gray-600">Manage your event preferences and configurations</p>
              </div>
            </div>
            <Button onClick={handleSave} className="bg-[#0F7377] hover:bg-[#0F7377]/90">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="notifications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="display">Display</TabsTrigger>
            <TabsTrigger value="organization">Organization</TabsTrigger>
          </TabsList>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Choose how you want to be notified about events and updates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Email Notifications</Label>
                    <p className="text-sm text-gray-500">
                      Receive event updates via email
                    </p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Event Reminders</Label>
                    <p className="text-sm text-gray-500">
                      Get reminded before events you're attending
                    </p>
                  </div>
                  <Switch
                    checked={settings.eventReminders}
                    onCheckedChange={(checked) => handleSettingChange('eventReminders', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">New Event Alerts</Label>
                    <p className="text-sm text-gray-500">
                      Be notified when new events are posted
                    </p>
                  </div>
                  <Switch
                    checked={settings.newEventAlerts}
                    onCheckedChange={(checked) => handleSettingChange('newEventAlerts', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Cancellation Alerts</Label>
                    <p className="text-sm text-gray-500">
                      Get notified when events are cancelled
                    </p>
                  </div>
                  <Switch
                    checked={settings.cancellationAlerts}
                    onCheckedChange={(checked) => handleSettingChange('cancellationAlerts', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Weekly Digest</Label>
                    <p className="text-sm text-gray-500">
                      Receive a weekly summary of events
                    </p>
                  </div>
                  <Switch
                    checked={settings.weeklyDigest}
                    onCheckedChange={(checked) => handleSettingChange('weeklyDigest', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Push Notifications</Label>
                    <p className="text-sm text-gray-500">
                      Receive push notifications on your device
                    </p>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Privacy Settings
                </CardTitle>
                <CardDescription>
                  Control what information is visible to other users
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Show Profile</Label>
                    <p className="text-sm text-gray-500">
                      Make your profile visible to other event attendees
                    </p>
                  </div>
                  <Switch
                    checked={settings.showProfile}
                    onCheckedChange={(checked) => handleSettingChange('showProfile', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Show Attendance</Label>
                    <p className="text-sm text-gray-500">
                      Let others see which events you're attending
                    </p>
                  </div>
                  <Switch
                    checked={settings.showAttendance}
                    onCheckedChange={(checked) => handleSettingChange('showAttendance', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Allow Direct Messages</Label>
                    <p className="text-sm text-gray-500">
                      Let other users send you direct messages
                    </p>
                  </div>
                  <Switch
                    checked={settings.allowDirectMessages}
                    onCheckedChange={(checked) => handleSettingChange('allowDirectMessages', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Show Contact Information</Label>
                    <p className="text-sm text-gray-500">
                      Display your contact information on your profile
                    </p>
                  </div>
                  <Switch
                    checked={settings.showContactInfo}
                    onCheckedChange={(checked) => handleSettingChange('showContactInfo', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Event Management
                </CardTitle>
                <CardDescription>
                  Configure how events are created and managed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Auto-Accept RSVP</Label>
                    <p className="text-sm text-gray-500">
                      Automatically accept RSVP requests
                    </p>
                  </div>
                  <Switch
                    checked={settings.autoAcceptRSVP}
                    onCheckedChange={(checked) => handleSettingChange('autoAcceptRSVP', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Require Approval</Label>
                    <p className="text-sm text-gray-500">
                      Require approval for new event submissions
                    </p>
                  </div>
                  <Switch
                    checked={settings.requireApproval}
                    onCheckedChange={(checked) => handleSettingChange('requireApproval', checked)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxAttendees">Maximum Attendees</Label>
                  <Input
                    id="maxAttendees"
                    type="number"
                    value={settings.maxAttendees}
                    onChange={(e) => handleSettingChange('maxAttendees', parseInt(e.target.value))}
                    className="w-32"
                  />
                  <p className="text-sm text-gray-500">
                    Default maximum number of attendees per event
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Allow Waitlist</Label>
                    <p className="text-sm text-gray-500">
                      Enable waitlist when events are full
                    </p>
                  </div>
                  <Switch
                    checked={settings.allowWaitlist}
                    onCheckedChange={(checked) => handleSettingChange('allowWaitlist', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Require Payment</Label>
                    <p className="text-sm text-gray-500">
                      Require payment for event registration
                    </p>
                  </div>
                  <Switch
                    checked={settings.requirePayment}
                    onCheckedChange={(checked) => handleSettingChange('requirePayment', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Display Tab */}
          <TabsContent value="display" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <SettingsIcon className="h-5 w-5 mr-2" />
                  Display Preferences
                </CardTitle>
                <CardDescription>
                  Customize how events are displayed and formatted
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={settings.timezone}
                    onValueChange={(value) => handleSettingChange('timezone', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SGT">Singapore Time (SGT)</SelectItem>
                      <SelectItem value="PST">Pacific Time (PST)</SelectItem>
                      <SelectItem value="EST">Eastern Time (EST)</SelectItem>
                      <SelectItem value="GMT">Greenwich Mean Time (GMT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Select
                    value={settings.dateFormat}
                    onValueChange={(value) => handleSettingChange('dateFormat', value)}
                  >
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
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={settings.language}
                    onValueChange={(value) => handleSettingChange('language', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Spanish">Spanish</SelectItem>
                      <SelectItem value="French">French</SelectItem>
                      <SelectItem value="German">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select
                    value={settings.theme}
                    onValueChange={(value) => handleSettingChange('theme', value)}
                  >
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
              </CardContent>
            </Card>
          </TabsContent>

          {/* Organization Tab */}
          <TabsContent value="organization" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Organization Settings
                </CardTitle>
                <CardDescription>
                  Configure your organization's event settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="organizationName">Organization Name</Label>
                  <Input
                    id="organizationName"
                    value={settings.organizationName}
                    onChange={(e) => handleSettingChange('organizationName', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => handleSettingChange('contactEmail', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={settings.website}
                    onChange={(e) => handleSettingChange('website', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={settings.description}
                    onChange={(e) => handleSettingChange('description', e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Calendar Sync</Label>
                    <p className="text-sm text-gray-500">
                      Sync events with external calendars
                    </p>
                  </div>
                  <Switch
                    checked={settings.calendarSync}
                    onCheckedChange={(checked) => handleSettingChange('calendarSync', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Social Sharing</Label>
                    <p className="text-sm text-gray-500">
                      Enable social media sharing for events
                    </p>
                  </div>
                  <Switch
                    checked={settings.socialSharing}
                    onCheckedChange={(checked) => handleSettingChange('socialSharing', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Analytics Tracking</Label>
                    <p className="text-sm text-gray-500">
                      Track event analytics and performance
                    </p>
                  </div>
                  <Switch
                    checked={settings.analyticsTracking}
                    onCheckedChange={(checked) => handleSettingChange('analyticsTracking', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
