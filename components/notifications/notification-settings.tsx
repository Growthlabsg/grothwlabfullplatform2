"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquare, Users, Heart, Award, Calendar, AtSign, Repeat } from "lucide-react"

export function NotificationSettings() {
  const [emailFrequency, setEmailFrequency] = useState("daily")

  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Notification Settings</h1>

      <Tabs defaultValue="push" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="push">Push Notifications</TabsTrigger>
          <TabsTrigger value="email">Email Notifications</TabsTrigger>
          <TabsTrigger value="inapp">In-App Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="push">
          <Card>
            <CardHeader>
              <CardTitle>Push Notification Preferences</CardTitle>
              <CardDescription>Configure which push notifications you want to receive on your devices</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Social Interactions</h3>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Heart className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="push-likes">Likes on your posts</Label>
                    </div>
                    <Switch id="push-likes" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="push-comments">Comments on your posts</Label>
                    </div>
                    <Switch id="push-comments" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Repeat className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="push-reposts">Reposts of your content</Label>
                    </div>
                    <Switch id="push-reposts" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AtSign className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="push-mentions">Mentions</Label>
                    </div>
                    <Switch id="push-mentions" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Network</h3>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="push-connections">Connection requests</Label>
                    </div>
                    <Switch id="push-connections" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="push-accepted">Accepted connections</Label>
                    </div>
                    <Switch id="push-accepted" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Events & Achievements</h3>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="push-events">Upcoming events</Label>
                    </div>
                    <Switch id="push-events" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Award className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="push-badges">New badges earned</Label>
                    </div>
                    <Switch id="push-badges" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button>Save preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Notification Preferences</CardTitle>
              <CardDescription>Configure which email notifications you want to receive and how often</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-digest">Email digest frequency</Label>
                  <Select value={emailFrequency} onValueChange={setEmailFrequency}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Real-time</SelectItem>
                      <SelectItem value="daily">Daily digest</SelectItem>
                      <SelectItem value="weekly">Weekly digest</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Social Interactions</h3>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Heart className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="email-likes">Likes on your posts</Label>
                    </div>
                    <Switch id="email-likes" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="email-comments">Comments on your posts</Label>
                    </div>
                    <Switch id="email-comments" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AtSign className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="email-mentions">Mentions</Label>
                    </div>
                    <Switch id="email-mentions" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Network & Events</h3>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="email-connections">Connection activity</Label>
                    </div>
                    <Switch id="email-connections" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="email-events">Event reminders</Label>
                    </div>
                    <Switch id="email-events" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button>Save preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inapp">
          <Card>
            <CardHeader>
              <CardTitle>In-App Notification Preferences</CardTitle>
              <CardDescription>Configure which notifications appear in your in-app notification center</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Social Interactions</h3>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Heart className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="inapp-likes">Likes on your posts</Label>
                    </div>
                    <Switch id="inapp-likes" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="inapp-comments">Comments on your posts</Label>
                    </div>
                    <Switch id="inapp-comments" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Repeat className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="inapp-reposts">Reposts of your content</Label>
                    </div>
                    <Switch id="inapp-reposts" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AtSign className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="inapp-mentions">Mentions</Label>
                    </div>
                    <Switch id="inapp-mentions" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Network</h3>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="inapp-connections">Connection requests</Label>
                    </div>
                    <Switch id="inapp-connections" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="inapp-accepted">Accepted connections</Label>
                    </div>
                    <Switch id="inapp-accepted" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Events & Achievements</h3>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="inapp-events">Upcoming events</Label>
                    </div>
                    <Switch id="inapp-events" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Award className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="inapp-badges">New badges earned</Label>
                    </div>
                    <Switch id="inapp-badges" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button>Save preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
