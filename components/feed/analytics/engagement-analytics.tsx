"use client"

import { LineChart } from "@/components/ui/line-chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, ThumbsUp, MessageSquare, Share2 } from "lucide-react"

interface EngagementAnalyticsProps {
  dateRange: { from: Date; to: Date }
}

export function EngagementAnalytics({ dateRange }: EngagementAnalyticsProps) {
  // Mock data for engagement over time
  const engagementData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Likes",
        data: [25, 40, 60, 35, 70, 55, 75],
        borderColor: "rgba(59, 130, 246, 1)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
      },
      {
        label: "Comments",
        data: [10, 15, 25, 12, 30, 20, 35],
        borderColor: "rgba(139, 92, 246, 1)",
        backgroundColor: "rgba(139, 92, 246, 0.1)",
        tension: 0.4,
      },
      {
        label: "Shares",
        data: [5, 8, 12, 7, 15, 10, 18],
        borderColor: "rgba(16, 185, 129, 1)",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        tension: 0.4,
      },
    ],
  }

  // Mock data for optimal posting times
  const optimalTimes = [
    { day: "Monday", time: "9:00 AM - 11:00 AM", engagement: "High" },
    { day: "Tuesday", time: "1:00 PM - 3:00 PM", engagement: "Medium" },
    { day: "Wednesday", time: "8:00 AM - 10:00 AM", engagement: "High" },
    { day: "Thursday", time: "2:00 PM - 4:00 PM", engagement: "Medium" },
    { day: "Friday", time: "11:00 AM - 1:00 PM", engagement: "High" },
    { day: "Saturday", time: "10:00 AM - 12:00 PM", engagement: "Low" },
    { day: "Sunday", time: "7:00 PM - 9:00 PM", engagement: "Medium" },
  ]

  // Mock data for top engagers
  const topEngagers = [
    {
      id: "1",
      name: "Sarah Chen",
      likes: 24,
      comments: 12,
      shares: 5,
      avatar: "/abstract-geometric-shapes.png",
    },
    {
      id: "2",
      name: "Alex Wong",
      likes: 18,
      comments: 9,
      shares: 3,
      avatar: "/abstract-geometric-aw.png",
    },
    {
      id: "3",
      name: "Mei Lin",
      likes: 15,
      comments: 7,
      shares: 2,
      avatar: "/machine-learning-concept.png",
    },
    {
      id: "4",
      name: "David Kumar",
      likes: 12,
      comments: 5,
      shares: 1,
    },
    {
      id: "5",
      name: "Lisa Tan",
      likes: 10,
      comments: 4,
      shares: 1,
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Engagement Over Time</CardTitle>
          <CardDescription>Track likes, comments, and shares over the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <LineChart data={engagementData} />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Optimal Posting Times</CardTitle>
            <CardDescription>When your audience is most active</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {optimalTimes.map((item) => (
                <div key={item.day} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{item.day}</p>
                      <p className="text-sm text-muted-foreground">{item.time}</p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      item.engagement === "High" ? "default" : item.engagement === "Medium" ? "secondary" : "outline"
                    }
                  >
                    {item.engagement}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Engagers</CardTitle>
            <CardDescription>Users who interact with your content the most</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topEngagers.map((engager) => (
                <div key={engager.id} className="flex items-start gap-3 p-3 rounded-lg border">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                    {engager.avatar ? (
                      <img
                        src={engager.avatar || "/placeholder.svg"}
                        alt={engager.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-lg font-semibold">{engager.name.charAt(0)}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{engager.name}</h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        {engager.likes}
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        {engager.comments}
                      </div>
                      <div className="flex items-center">
                        <Share2 className="h-3 w-3 mr-1" />
                        {engager.shares}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
