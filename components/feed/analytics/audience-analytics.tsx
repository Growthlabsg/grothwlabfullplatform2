"use client"

import { PieChartContainer, PieChartContent, PieChartItem } from "@/components/ui/pie-chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"

interface AudienceAnalyticsProps {
  dateRange: { from: Date; to: Date }
}

export function AudienceAnalytics({ dateRange }: AudienceAnalyticsProps) {
  // Mock data for audience demographics
  const demographicsData = [
    { name: "Founders", value: 45, color: "bg-blue-500" },
    { name: "Investors", value: 25, color: "bg-green-500" },
    { name: "Mentors", value: 15, color: "bg-purple-500" },
    { name: "Service Providers", value: 10, color: "bg-yellow-500" },
    { name: "Others", value: 5, color: "bg-gray-500" },
  ]

  // Mock data for audience locations
  const locationsData = [
    { name: "Singapore", value: 60, color: "bg-red-500" },
    { name: "Malaysia", value: 15, color: "bg-blue-500" },
    { name: "Indonesia", value: 10, color: "bg-green-500" },
    { name: "Vietnam", value: 8, color: "bg-purple-500" },
    { name: "Others", value: 7, color: "bg-gray-500" },
  ]

  // Mock data for audience industries
  const industriesData = [
    { name: "Technology", value: 40, color: "bg-blue-500" },
    { name: "Finance", value: 20, color: "bg-green-500" },
    { name: "Healthcare", value: 15, color: "bg-purple-500" },
    { name: "Education", value: 10, color: "bg-yellow-500" },
    { name: "Others", value: 15, color: "bg-gray-500" },
  ]

  // Mock data for top followers
  const topFollowers = [
    {
      id: "1",
      name: "Sarah Chen",
      role: "Founder & CEO",
      company: "TechInnovate",
      followers: 1245,
      avatar: "/abstract-geometric-shapes.png",
    },
    {
      id: "2",
      name: "Alex Wong",
      role: "Angel Investor",
      company: "SG Ventures",
      followers: 987,
      avatar: "/abstract-geometric-aw.png",
    },
    {
      id: "3",
      name: "Mei Lin",
      role: "CTO",
      company: "HealthTech Solutions",
      followers: 876,
      avatar: "/machine-learning-concept.png",
    },
    {
      id: "4",
      name: "David Kumar",
      role: "Startup Mentor",
      company: "GrowthLab",
      followers: 765,
    },
    {
      id: "5",
      name: "Lisa Tan",
      role: "VC Partner",
      company: "East Ventures",
      followers: 654,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Audience Demographics</CardTitle>
            <CardDescription>Breakdown of your audience by role</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[300px]">
              <PieChartContainer data={demographicsData} valueFormatter={(value) => `${value}%`}>
                {demographicsData.map((item) => (
                  <PieChartItem key={item.name} name={item.name} value={item.value} color={item.color} />
                ))}
                <PieChartContent />
              </PieChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Audience Locations</CardTitle>
            <CardDescription>Where your audience is based</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[300px]">
              <PieChartContainer data={locationsData} valueFormatter={(value) => `${value}%`}>
                {locationsData.map((item) => (
                  <PieChartItem key={item.name} name={item.name} value={item.value} color={item.color} />
                ))}
                <PieChartContent />
              </PieChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Audience Industries</CardTitle>
            <CardDescription>Industries your audience works in</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[300px]">
              <PieChartContainer data={industriesData} valueFormatter={(value) => `${value}%`}>
                {industriesData.map((item) => (
                  <PieChartItem key={item.name} name={item.name} value={item.value} color={item.color} />
                ))}
                <PieChartContent />
              </PieChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Followers</CardTitle>
          <CardDescription>Your most influential followers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topFollowers.map((follower) => (
              <div key={follower.id} className="flex items-start gap-3 p-3 rounded-lg border">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                  {follower.avatar ? (
                    <img
                      src={follower.avatar || "/placeholder.svg"}
                      alt={follower.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-lg font-semibold">{follower.name.charAt(0)}</span>
                  )}
                </div>
                <div>
                  <h3 className="font-medium">{follower.name}</h3>
                  <p className="text-sm text-muted-foreground">{follower.role}</p>
                  <p className="text-sm text-muted-foreground">{follower.company}</p>
                  <div className="flex items-center mt-1 text-xs">
                    <Users className="h-3 w-3 mr-1" />
                    <span>{follower.followers} followers</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
