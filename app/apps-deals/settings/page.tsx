"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft,
  Settings,
  Bell,
  Eye,
  Shield,
  Palette,
  Globe,
  User,
  Lock,
  Key,
  Database,
  Download,
  Upload,
  Save,
  RefreshCw,
  X
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function AppsDealsSettingsPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("general")
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    darkMode: false,
    autoRefresh: true,
    language: "English",
    timezone: "UTC",
    currency: "USD",
    privacy: "public",
    twoFactorAuth: false
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/apps-deals">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Apps & Deals
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Settings</h1>
                <p className="text-sm text-gray-600">Manage your preferences</p>
              </div>
            </div>
            
            <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90" onClick={handleSaveSettings}>
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>Configure your general preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Dark Mode</Label>
                      <p className="text-sm text-gray-500">Switch to dark theme</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.darkMode}
                      onChange={(e) => handleSettingChange("darkMode", e.target.checked)}
                      className="rounded"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto Refresh</Label>
                      <p className="text-sm text-gray-500">Automatically refresh data</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.autoRefresh}
                      onChange={(e) => handleSettingChange("autoRefresh", e.target.checked)}
                      className="rounded"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Configure how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
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
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-gray-500">Receive push notifications</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.pushNotifications}
                      onChange={(e) => handleSettingChange("pushNotifications", e.target.checked)}
                      className="rounded"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>Control your privacy and visibility</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Profile Visibility</Label>
                      <p className="text-sm text-gray-500">Control who can see your profile</p>
                    </div>
                    <select
                      value={settings.privacy}
                      onChange={(e) => handleSettingChange("privacy", e.target.value)}
                      className="rounded border px-3 py-1"
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                      <option value="friends">Friends Only</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your account security</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-gray-500">Add an extra layer of security</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.twoFactorAuth}
                      onChange={(e) => handleSettingChange("twoFactorAuth", e.target.checked)}
                      className="rounded"
                    />
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
