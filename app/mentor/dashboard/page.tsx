import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardMetrics } from "@/components/mentor/dashboard-metrics"
import { UpcomingSessions } from "@/components/mentor/upcoming-sessions"
import { MenteeList } from "@/components/mentor/mentee-list"
import { AvailabilityManager } from "@/components/mentor/availability-manager"
import { SessionNotes } from "@/components/mentor/session-notes"
import { ResourceLibrary } from "@/components/mentor/resource-library"

export const metadata: Metadata = {
  title: "Mentor Dashboard | GrowthLab.sg",
  description: "Manage your mentor profile, sessions, and mentees",
}

export default function MentorDashboardPage() {
  return (
          <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#1E293B] md:text-4xl">Mentor Dashboard</h1>
            <p className="text-lg text-[#334155]">Manage your mentoring relationships and track your impact</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Last updated: May 7, 2025</span>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="mentees">Mentees</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <DashboardMetrics />

            <div className="grid gap-8 md:grid-cols-2">
              <UpcomingSessions />
              <MenteeList />
            </div>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-8">
            <div className="grid gap-8 md:grid-cols-2">
              <UpcomingSessions />
              <AvailabilityManager />
            </div>
            <SessionNotes />
          </TabsContent>

          <TabsContent value="mentees" className="space-y-8">
            <MenteeList />

            <div className="rounded-md border p-4">
              <h3 className="mb-4 text-lg font-semibold">Mentee Success Stories</h3>
              <p className="text-muted-foreground">
                This section will display success stories and achievements from your mentees.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-8">
            <ResourceLibrary />
          </TabsContent>
        </Tabs>
      </div>
    )
}
