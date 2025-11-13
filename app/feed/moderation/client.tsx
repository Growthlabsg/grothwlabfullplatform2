"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ModerationQueue } from "@/components/feed/moderation/moderation-queue"
import { ReportedContent } from "@/components/feed/moderation/reported-content"
import { ModerationSettings } from "@/components/feed/moderation/moderation-settings"
import { ModerationLogs } from "@/components/feed/moderation/moderation-logs"

export function ContentModerationClient() {
  return (
          <div className="container py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold">Content Moderation</h1>
              <p className="text-muted-foreground">Review and manage content to maintain community standards</p>
            </div>
          </div>

          <Tabs defaultValue="queue" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
              <TabsTrigger value="queue">Moderation Queue</TabsTrigger>
              <TabsTrigger value="reported">Reported Content</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="logs">Logs</TabsTrigger>
            </TabsList>

            <TabsContent value="queue">
              <ModerationQueue />
            </TabsContent>

            <TabsContent value="reported">
              <ReportedContent />
            </TabsContent>

            <TabsContent value="settings">
              <ModerationSettings />
            </TabsContent>

            <TabsContent value="logs">
              <ModerationLogs />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    )
  }
