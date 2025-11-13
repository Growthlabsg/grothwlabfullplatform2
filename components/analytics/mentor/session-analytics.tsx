"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MetricCard } from "@/components/dashboard/metric-card"
import { AreaChart } from "@/components/dashboard/area-chart"
import { BarChartComponent } from "@/components/dashboard/bar-chart"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Users, Video } from "lucide-react"
import Link from "next/link"

interface SessionAnalyticsProps {
  timeframe: string
}

export function SessionAnalytics({ timeframe }: SessionAnalyticsProps) {
  // Mock data - in a real app, this would come from an API
  const sessionMetrics = [
    {
      title: "Total Sessions",
      value: "48",
      description: "Sessions conducted",
      icon: Calendar,
      trend: { value: 8, isPositive: true },
    },
    {
      title: "Total Hours",
      value: "86",
      description: "Mentoring hours",
      icon: Clock,
      trend: { value: 12, isPositive: true },
    },
    {
      title: "Avg. Duration",
      value: "1.8h",
      description: "Per session",
      icon: Clock,
      trend: { value: 0.2, isPositive: true },
    },
    {
      title: "Attendance Rate",
      value: "94%",
      description: "Session attendance",
      icon: Users,
      trend: { value: 2, isPositive: true },
    },
  ]

  const sessionsOverTimeData = [
    { name: "Jan", value: 3 },
    { name: "Feb", value: 4 },
    { name: "Mar", value: 5 },
    { name: "Apr", value: 4 },
    { name: "May", value: 6 },
    { name: "Jun", value: 5 },
    { name: "Jul", value: 4 },
    { name: "Aug", value: 5 },
    { name: "Sep", value: 6 },
    { name: "Oct", value: 7 },
    { name: "Nov", value: 6 },
    { name: "Dec", value: 4 },
  ]

  const sessionTypeData = [
    { name: "1-on-1 Calls", value: 65 },
    { name: "Group Sessions", value: 20 },
    { name: "In-person Meetings", value: 10 },
    { name: "Text/Email", value: 5 },
  ]

  const recentSessions = [
    {
      menteeName: "Jason Lim",
      date: "May 10, 2025",
      duration: "1.5 hours",
      type: "Video Call",
      topics: ["Pitch Deck Review", "Investor Strategy", "Financial Projections"],
      notes:
        "Reviewed pitch deck and suggested improvements. Discussed potential investors and prepared for upcoming meetings.",
    },
    {
      menteeName: "Aisha Rahman",
      date: "May 8, 2025",
      duration: "1 hour",
      type: "Video Call",
      topics: ["Leadership Challenges", "Team Management", "Career Growth"],
      notes: "Discussed challenges with new team members. Provided guidance on delegation and team building.",
    },
    {
      menteeName: "Mark Chen",
      date: "May 5, 2025",
      duration: "2 hours",
      type: "In-person",
      topics: ["Product Launch", "Marketing Strategy", "User Acquisition"],
      notes:
        "Reviewed product launch timeline and marketing materials. Suggested improvements to user acquisition strategy.",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {sessionMetrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            description={metric.description}
            icon={metric.icon}
            trend={metric.trend}
          />
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <AreaChart
          title="Sessions Over Time"
          description="Number of mentoring sessions per month"
          data={sessionsOverTimeData}
          color="#0F7377"
        />

        <BarChartComponent
          title="Session Types"
          description="Breakdown of session formats"
          data={sessionTypeData}
          valueSuffix="%"
          color="#0F7377"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Sessions</CardTitle>
          <CardDescription>Details of your most recent mentoring sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {recentSessions.map((session, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium">{session.menteeName}</h3>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {session.date}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {session.duration}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-1.5 mb-2">
                        <Badge variant="secondary" className="flex items-center gap-1">
                          {session.type === "Video Call" ? <Video className="h-3 w-3" /> : null}
                          {session.type}
                        </Badge>
                      </div>

                      <div className="mb-2">
                        <p className="text-sm text-muted-foreground mb-1">Topics Covered:</p>
                        <div className="flex flex-wrap gap-1.5">
                          {session.topics.map((topic, tIndex) => (
                            <Badge key={tIndex} variant="outline" className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Notes:</span> {session.notes}
                      </p>
                    </div>

                    <div className="flex gap-2 shrink-0">
                      <Button variant="outline" size="sm" asChild>
                        <Link href="#">View Details</Link>
                      </Button>
                      <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90" asChild>
                        <Link href="#">Add Notes</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
