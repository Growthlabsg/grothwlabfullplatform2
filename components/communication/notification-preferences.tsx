"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { NotificationSoundPlayer } from "./notification-sound-player"
import { Bell, Clock, Moon, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

interface NotificationPreferencesProps {
  channelId?: string
  className?: string
}

const NOTIFICATION_SOUNDS = [
  { id: "chime", name: "Chime", url: "/sounds/chime.mp3" },
  { id: "bell", name: "Bell", url: "/sounds/bell.mp3" },
  { id: "ping", name: "Ping", url: "/sounds/ping.mp3" },
  { id: "pop", name: "Pop", url: "/sounds/pop.mp3" },
  { id: "subtle", name: "Subtle", url: "/sounds/subtle.mp3" },
]

export function NotificationPreferences({ channelId, className }: NotificationPreferencesProps) {
  const [activeTab, setActiveTab] = useState("general")
  const [preferences, setPreferences] = useState({
    enabled: true,
    sound: true,
    desktop: true,
    mobile: true,
    email: false,
    doNotDisturb: {
      enabled: false,
      from: "22:00",
      to: "07:00",
    },
    channels: {
      [channelId || "default"]: {
        muted: false,
        mentions: true,
      },
    },
    mentions: true,
    directMessages: true,
    replies: true,
    reactions: false,
  })

  const updatePreference = (path: string[], value: any) => {
    setPreferences((prev) => {
      const newPreferences = { ...prev }
      let current = newPreferences

      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i] as keyof typeof current] as any
      }

      current[path[path.length - 1] as keyof typeof current] = value

      return newPreferences
    })
  }

  return (
    <div className={cn("border rounded-md overflow-hidden", className)}>
      <div className="p-4 border-b flex items-center">
        <Bell className="h-5 w-5 mr-2" />
        <h3 className="font-medium">Notification Preferences</h3>
      </div>

      <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab}>
        <div className="px-4 pt-4">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="sounds">Sounds</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="general" className="p-4 space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications-enabled">Enable Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications from this app</p>
              </div>
              <Switch
                id="notifications-enabled"
                checked={preferences.enabled}
                onCheckedChange={(checked) => updatePreference(["enabled"], checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="desktop-notifications">Desktop Notifications</Label>
                <p className="text-sm text-muted-foreground">Show notifications on your desktop</p>
              </div>
              <Switch
                id="desktop-notifications"
                checked={preferences.desktop}
                onCheckedChange={(checked) => updatePreference(["desktop"], checked)}
                disabled={!preferences.enabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="mobile-notifications">Mobile Notifications</Label>
                <p className="text-sm text-muted-foreground">Send notifications to your mobile device</p>
              </div>
              <Switch
                id="mobile-notifications"
                checked={preferences.mobile}
                onCheckedChange={(checked) => updatePreference(["mobile"], checked)}
                disabled={!preferences.enabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
              <Switch
                id="email-notifications"
                checked={preferences.email}
                onCheckedChange={(checked) => updatePreference(["email"], checked)}
                disabled={!preferences.enabled}
              />
            </div>
          </div>

          <div className="pt-4 border-t">
            <h4 className="font-medium mb-3 flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              Notification Types
            </h4>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="mentions-notifications">Mentions</Label>
                <Switch
                  id="mentions-notifications"
                  checked={preferences.mentions}
                  onCheckedChange={(checked) => updatePreference(["mentions"], checked)}
                  disabled={!preferences.enabled}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="dm-notifications">Direct Messages</Label>
                <Switch
                  id="dm-notifications"
                  checked={preferences.directMessages}
                  onCheckedChange={(checked) => updatePreference(["directMessages"], checked)}
                  disabled={!preferences.enabled}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="replies-notifications">Replies</Label>
                <Switch
                  id="replies-notifications"
                  checked={preferences.replies}
                  onCheckedChange={(checked) => updatePreference(["replies"], checked)}
                  disabled={!preferences.enabled}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="reactions-notifications">Reactions</Label>
                <Switch
                  id="reactions-notifications"
                  checked={preferences.reactions}
                  onCheckedChange={(checked) => updatePreference(["reactions"], checked)}
                  disabled={!preferences.enabled}
                />
              </div>
            </div>
          </div>

          {channelId && (
            <div className="pt-4 border-t">
              <h4 className="font-medium mb-3">Channel-specific Settings</h4>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="channel-muted">Mute this channel</Label>
                  <Switch
                    id="channel-muted"
                    checked={preferences.channels[channelId]?.muted}
                    onCheckedChange={(checked) => updatePreference(["channels", channelId, "muted"], checked)}
                    disabled={!preferences.enabled}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="channel-mentions">Notify on mentions only</Label>
                  <Switch
                    id="channel-mentions"
                    checked={preferences.channels[channelId]?.mentions}
                    onCheckedChange={(checked) => updatePreference(["channels", channelId, "mentions"], checked)}
                    disabled={!preferences.enabled || preferences.channels[channelId]?.muted}
                  />
                </div>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="schedule" className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center">
                <Moon className="h-4 w-4 mr-2" />
                <Label htmlFor="dnd-enabled">Do Not Disturb</Label>
              </div>
              <p className="text-sm text-muted-foreground">Mute notifications during specific hours</p>
            </div>
            <Switch
              id="dnd-enabled"
              checked={preferences.doNotDisturb.enabled}
              onCheckedChange={(checked) => updatePreference(["doNotDisturb", "enabled"], checked)}
              disabled={!preferences.enabled}
            />
          </div>

          {preferences.doNotDisturb.enabled && (
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <div className="flex items-center mb-2">
                  <Clock className="h-4 w-4 mr-2" />
                  <Label htmlFor="dnd-from" className="text-sm">
                    Start Time
                  </Label>
                </div>
                <Input
                  id="dnd-from"
                  type="time"
                  value={preferences.doNotDisturb.from}
                  onChange={(e) => updatePreference(["doNotDisturb", "from"], e.target.value)}
                  disabled={!preferences.enabled || !preferences.doNotDisturb.enabled}
                />
              </div>
              <div>
                <div className="flex items-center mb-2">
                  <Clock className="h-4 w-4 mr-2" />
                  <Label htmlFor="dnd-to" className="text-sm">
                    End Time
                  </Label>
                </div>
                <Input
                  id="dnd-to"
                  type="time"
                  value={preferences.doNotDisturb.to}
                  onChange={(e) => updatePreference(["doNotDisturb", "to"], e.target.value)}
                  disabled={!preferences.enabled || !preferences.doNotDisturb.enabled}
                />
              </div>
            </div>
          )}

          <div className="pt-4 border-t">
            <h4 className="font-medium mb-3">Weekly Schedule</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Set custom notification schedules for different days of the week
            </p>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Workdays (Mon-Fri)</Label>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All notifications</SelectItem>
                    <SelectItem value="mentions">Mentions only</SelectItem>
                    <SelectItem value="none">No notifications</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label>Weekends (Sat-Sun)</Label>
                <Select defaultValue="mentions">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All notifications</SelectItem>
                    <SelectItem value="mentions">Mentions only</SelectItem>
                    <SelectItem value="none">No notifications</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="sounds" className="p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sound-enabled">Notification Sounds</Label>
                <p className="text-sm text-muted-foreground">Play sounds for notifications</p>
              </div>
              <Switch
                id="sound-enabled"
                checked={preferences.sound}
                onCheckedChange={(checked) => updatePreference(["sound"], checked)}
                disabled={!preferences.enabled}
              />
            </div>

            {preferences.sound && (
              <NotificationSoundPlayer sounds={NOTIFICATION_SOUNDS} defaultSound="chime" defaultVolume={0.5} />
            )}
          </div>
        </TabsContent>
      </Tabs>

      <div className="p-4 border-t flex justify-end">
        <Button>Save Preferences</Button>
      </div>
    </div>
  )
}
