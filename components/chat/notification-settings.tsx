"use client"

import { useChat } from "@/contexts/chat-context"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function NotificationSettings() {
  const { notificationSettings, updateNotificationSettings } = useChat()

  const handleToggleChange = (key: keyof typeof notificationSettings) => {
    updateNotificationSettings({ [key]: !notificationSettings[key] })
  }

  const handleDigestFrequencyChange = (value: string) => {
    updateNotificationSettings({
      emailDigestFrequency: value as "never" | "daily" | "weekly",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
        <CardDescription>Manage how you receive notifications and updates.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Email Notifications</h3>

          <div className="flex items-center justify-between">
            <Label htmlFor="email-new-message" className="flex-1">
              Email me when I receive a new message
            </Label>
            <Switch
              id="email-new-message"
              checked={notificationSettings.emailOnNewMessage}
              onCheckedChange={() => handleToggleChange("emailOnNewMessage")}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="email-connection-request" className="flex-1">
              Email me when I receive a connection request
            </Label>
            <Switch
              id="email-connection-request"
              checked={notificationSettings.emailOnConnectionRequest}
              onCheckedChange={() => handleToggleChange("emailOnConnectionRequest")}
            />
          </div>

          <div className="space-y-2">
            <Label>Email digest frequency</Label>
            <RadioGroup
              value={notificationSettings.emailDigestFrequency}
              onValueChange={handleDigestFrequencyChange}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="never" id="digest-never" />
                <Label htmlFor="digest-never">Never</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="daily" id="digest-daily" />
                <Label htmlFor="digest-daily">Daily</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="weekly" id="digest-weekly" />
                <Label htmlFor="digest-weekly">Weekly</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">In-App Notifications</h3>

          <div className="flex items-center justify-between">
            <Label htmlFor="in-app-notifications" className="flex-1">
              Show in-app notifications
            </Label>
            <Switch
              id="in-app-notifications"
              checked={notificationSettings.inAppNotifications}
              onCheckedChange={() => handleToggleChange("inAppNotifications")}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="desktop-notifications" className="flex-1">
              Show desktop notifications
            </Label>
            <Switch
              id="desktop-notifications"
              checked={notificationSettings.desktopNotifications}
              onCheckedChange={() => handleToggleChange("desktopNotifications")}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
