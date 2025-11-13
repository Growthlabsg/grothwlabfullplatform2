import { NotificationSoundSettings } from "@/components/communication/notification-sound-settings"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Settings, Volume2 } from "lucide-react"

export default function NotificationSoundSettingsPage() {
  return (
    <div className="container py-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-2">Notification Settings</h1>
      <p className="text-muted-foreground mb-6">Manage and customize how GrowthLab notifies you</p>

      <Tabs defaultValue="sounds" className="w-full">
        <TabsList className="w-full flex mb-6 h-12">
          <TabsTrigger value="general" className="flex-1">
            <Bell className="mr-2 h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="sounds" className="flex-1">
            <Volume2 className="mr-2 h-4 w-4" />
            Sounds & Alerts
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex-1">
            <Settings className="mr-2 h-4 w-4" />
            Advanced
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Notification Settings</CardTitle>
              <CardDescription>Control which activities trigger notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center p-8 text-muted-foreground">
                General notification settings will appear here
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sounds">
          <NotificationSoundSettings />
        </TabsContent>

        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Notification Settings</CardTitle>
              <CardDescription>Fine-tune your notification experience</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center p-8 text-muted-foreground">
                Advanced notification settings will appear here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
