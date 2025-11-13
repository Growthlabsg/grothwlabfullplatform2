"use client"

import { useState } from "react"
import { Bell, Mail, Phone } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
export function NotificationSettingsClient() {
  const [settings, setSettings] = useState({
    inApp: {
      likes: true,
      comments: true,
      mentions: true,
      follows: true,
      messages: true,
      systemUpdates: true,
    },
    email: {
      likes: false,
      comments: true,
      mentions: true,
      follows: true,
      messages: true,
      systemUpdates: true,
      newsletter: true,
      digest: true,
    },
    push: {
      likes: false,
      comments: true,
      mentions: true,
      follows: false,
      messages: true,
      systemUpdates: false,
    },
  })

  const handleToggle = (category: "inApp" | "email" | "push", setting: string) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting as keyof (typeof prev)[typeof category]],
      },
    }))
  }

  return (
          <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Notification Settings</h1>
          <p className="text-muted-foreground mb-6">Manage how and when you receive notifications from GrowthLab</p>

          <Tabs defaultValue="in-app" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="in-app" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <span>In-App</span>
              </TabsTrigger>
              <TabsTrigger value="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </TabsTrigger>
              <TabsTrigger value="push" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>Push</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="in-app">
              <Card>
                <CardHeader>
                  <CardTitle>In-App Notifications</CardTitle>
                  <CardDescription>Control which notifications appear in your notification center</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="in-app-likes" className="font-medium">
                          Likes
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications when someone likes your post
                        </p>
                      </div>
                      <Switch
                        id="in-app-likes"
                        checked={settings.inApp.likes}
                        onCheckedChange={() => handleToggle("inApp", "likes")}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="in-app-comments" className="font-medium">
                          Comments
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications when someone comments on your post
                        </p>
                      </div>
                      <Switch
                        id="in-app-comments"
                        checked={settings.inApp.comments}
                        onCheckedChange={() => handleToggle("inApp", "comments")}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="in-app-mentions" className="font-medium">
                          Mentions
                        </Label>
                        <p className="text-sm text-muted-foreground">Receive notifications when someone mentions you</p>
                      </div>
                      <Switch
                        id="in-app-mentions"
                        checked={settings.inApp.mentions}
                        onCheckedChange={() => handleToggle("inApp", "mentions")}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="in-app-follows" className="font-medium">
                          Follows
                        </Label>
                        <p className="text-sm text-muted-foreground">Receive notifications when someone follows you</p>
                      </div>
                      <Switch
                        id="in-app-follows"
                        checked={settings.inApp.follows}
                        onCheckedChange={() => handleToggle("inApp", "follows")}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="in-app-messages" className="font-medium">
                          Messages
                        </Label>
                        <p className="text-sm text-muted-foreground">Receive notifications for new messages</p>
                      </div>
                      <Switch
                        id="in-app-messages"
                        checked={settings.inApp.messages}
                        onCheckedChange={() => handleToggle("inApp", "messages")}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="in-app-system" className="font-medium">
                          System Updates
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications about system updates and announcements
                        </p>
                      </div>
                      <Switch
                        id="in-app-system"
                        checked={settings.inApp.systemUpdates}
                        onCheckedChange={() => handleToggle("inApp", "systemUpdates")}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="email">
              <Card>
                <CardHeader>
                  <CardTitle>Email Notifications</CardTitle>
                  <CardDescription>Control which notifications are sent to your email address</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {/* Similar structure to in-app notifications, with email-specific settings */}
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-likes" className="font-medium">
                          Likes
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Receive email notifications when someone likes your post
                        </p>
                      </div>
                      <Switch
                        id="email-likes"
                        checked={settings.email.likes}
                        onCheckedChange={() => handleToggle("email", "likes")}
                      />
                    </div>
                    <Separator />
                    {/* Additional email settings */}
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-newsletter" className="font-medium">
                          Weekly Newsletter
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Receive our weekly newsletter with updates and insights
                        </p>
                      </div>
                      <Switch
                        id="email-newsletter"
                        checked={settings.email.newsletter}
                        onCheckedChange={() => handleToggle("email", "newsletter")}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-digest" className="font-medium">
                          Daily Digest
                        </Label>
                        <p className="text-sm text-muted-foreground">Receive a daily digest of your network activity</p>
                      </div>
                      <Switch
                        id="email-digest"
                        checked={settings.email.digest}
                        onCheckedChange={() => handleToggle("email", "digest")}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="push">
              <Card>
                <CardHeader>
                  <CardTitle>Push Notifications</CardTitle>
                  <CardDescription>
                    Control which notifications are sent as push notifications to your devices
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {/* Similar structure to in-app notifications, with push-specific settings */}
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="push-messages" className="font-medium">
                          Messages
                        </Label>
                        <p className="text-sm text-muted-foreground">Receive push notifications for new messages</p>
                      </div>
                      <Switch
                        id="push-messages"
                        checked={settings.push.messages}
                        onCheckedChange={() => handleToggle("push", "messages")}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="push-mentions" className="font-medium">
                          Mentions
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Receive push notifications when someone mentions you
                        </p>
                      </div>
                      <Switch
                        id="push-mentions"
                        checked={settings.push.mentions}
                        onCheckedChange={() => handleToggle("push", "mentions")}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8 flex justify-end">
            <Button>Save Changes</Button>
          </div>
        </div>
      </div>
    )
}
