"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart } from "@/components/ui/line-chart"
import { BarChart } from "@/components/ui/bar-chart"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface UserActivityProps {
  timeRange: string
}

// Mock data
const userActivityData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Active Users",
      data: [120, 145, 132, 178, 190, 210, 185],
      borderColor: "rgba(59, 130, 246, 1)",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      tension: 0.4,
    },
  ],
}

const userRetentionData = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
  datasets: [
    {
      label: "Retention Rate",
      data: [100, 85, 72, 65, 58, 52],
      borderColor: "rgba(16, 185, 129, 1)",
      backgroundColor: "rgba(16, 185, 129, 0.1)",
      tension: 0.4,
    },
  ],
}

const userSourceData = {
  labels: ["Direct", "Search", "Social", "Email", "Referral"],
  datasets: [
    {
      label: "User Source",
      data: [35, 25, 20, 15, 5],
      backgroundColor: [
        "rgba(59, 130, 246, 0.8)",
        "rgba(139, 92, 246, 0.8)",
        "rgba(16, 185, 129, 0.8)",
        "rgba(245, 158, 11, 0.8)",
        "rgba(107, 114, 128, 0.8)",
      ],
      borderColor: [
        "rgba(59, 130, 246, 1)",
        "rgba(139, 92, 246, 1)",
        "rgba(16, 185, 129, 1)",
        "rgba(245, 158, 11, 1)",
        "rgba(107, 114, 128, 1)",
      ],
      borderWidth: 1,
    },
  ],
}

export function UserActivity({ timeRange }: UserActivityProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>User Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="activity">
            <TabsList>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="retention">Retention</TabsTrigger>
              <TabsTrigger value="source">Source</TabsTrigger>
            </TabsList>
            <TabsContent value="activity" className="h-[400px] mt-4">
              <LineChart data={userActivityData} />
            </TabsContent>
            <TabsContent value="retention" className="h-[400px] mt-4">
              <LineChart data={userRetentionData} />
            </TabsContent>
            <TabsContent value="source" className="h-[400px] mt-4">
              <BarChart data={userSourceData} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Active Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                name: "John Doe",
                role: "Founder & CEO",
                avatar: "/abstract-letter-jt.png",
                posts: 24,
                comments: 87,
                likes: 156,
                lastActive: "2 hours ago",
              },
              {
                name: "Alice Smith",
                role: "Product Manager",
                avatar: "/abstract-geometric-aw.png",
                posts: 18,
                comments: 65,
                likes: 132,
                lastActive: "5 hours ago",
              },
              {
                name: "Michael Chen",
                role: "Investor",
                avatar: "/abstract-ms-flow.png",
                posts: 12,
                comments: 45,
                likes: 98,
                lastActive: "1 day ago",
              },
              {
                name: "Sarah Johnson",
                role: "Marketing Director",
                avatar: "/stylized-letters.png",
                posts: 9,
                comments: 38,
                likes: 87,
                lastActive: "2 days ago",
              },
            ].map((user, i) => (
              <div key={i} className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center">
                    <h4 className="font-medium text-sm">{user.name}</h4>
                    <Badge variant="outline" className="ml-2 text-xs">
                      {user.role}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <span>{user.posts} posts</span>
                    <span>{user.comments} comments</span>
                    <span>{user.likes} likes</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">Last active</div>
                  <div className="text-sm">{user.lastActive}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
