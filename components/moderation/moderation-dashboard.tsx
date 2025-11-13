import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ModerationQueue } from "./moderation-queue"
import { ReportedContent } from "./reported-content"
import { ModerationSettings } from "./moderation-settings"
import { ModerationLogs } from "./moderation-logs"

export function ModerationDashboard() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-3xl font-bold">Content Moderation</h1>
      <p className="text-muted-foreground">
        Manage and moderate content across the GrowthLab platform to maintain a positive community environment.
      </p>

      <Tabs defaultValue="queue" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="queue">Moderation Queue</TabsTrigger>
          <TabsTrigger value="reported">Reported Content</TabsTrigger>
          <TabsTrigger value="logs">Moderation Logs</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="queue">
          <ModerationQueue />
        </TabsContent>
        <TabsContent value="reported">
          <ReportedContent />
        </TabsContent>
        <TabsContent value="logs">
          <ModerationLogs />
        </TabsContent>
        <TabsContent value="settings">
          <ModerationSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}
