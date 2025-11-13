"use client"

import { BarChart } from "@/components/ui/bar-chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Hash, FileText, TrendingUp, Clock } from "lucide-react"

interface ContentAnalyticsProps {
  dateRange: { from: Date; to: Date }
}

export function ContentAnalytics({ dateRange }: ContentAnalyticsProps) {
  // Mock data for content types
  const contentTypeData = {
    labels: ["Text", "Image", "Video", "Link", "Poll"],
    datasets: [
      {
        label: "Engagement Rate",
        data: [3.2, 4.5, 5.8, 2.7, 3.9],
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",
          "rgba(16, 185, 129, 0.8)",
          "rgba(239, 68, 68, 0.8)",
          "rgba(139, 92, 246, 0.8)",
          "rgba(245, 158, 11, 0.8)",
        ],
        borderColor: [
          "rgba(59, 130, 246, 1)",
          "rgba(16, 185, 129, 1)",
          "rgba(239, 68, 68, 1)",
          "rgba(139, 92, 246, 1)",
          "rgba(245, 158, 11, 1)",
        ],
        borderWidth: 1,
      },
    ],
  }

  // Mock data for top hashtags
  const topHashtags = [
    { tag: "#SingaporeTech", count: 45, engagement: "High" },
    { tag: "#StartupLife", count: 38, engagement: "High" },
    { tag: "#Innovation", count: 32, engagement: "Medium" },
    { tag: "#Funding", count: 27, engagement: "High" },
    { tag: "#AI", count: 25, engagement: "Medium" },
    { tag: "#FinTech", count: 23, engagement: "Medium" },
    { tag: "#HealthTech", count: 20, engagement: "Low" },
    { tag: "#Sustainability", count: 18, engagement: "Medium" },
    { tag: "#EdTech", count: 15, engagement: "Low" },
    { tag: "#GrowthHacking", count: 12, engagement: "Medium" },
  ]

  // Mock data for content length
  const contentLengthData = {
    labels: ["Short (<100 words)", "Medium (100-300 words)", "Long (>300 words)"],
    datasets: [
      {
        label: "Average Engagement",
        data: [2.8, 4.2, 3.5],
        backgroundColor: "rgba(15, 115, 119, 0.8)",
        borderColor: "rgba(15, 115, 119, 1)",
        borderWidth: 1,
      },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Content Type Performance</CardTitle>
            <CardDescription>Engagement rates by content type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <BarChart data={contentTypeData} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content Length Performance</CardTitle>
            <CardDescription>Engagement rates by content length</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <BarChart data={contentLengthData} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Performing Hashtags</CardTitle>
          <CardDescription>Hashtags that drive the most engagement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {topHashtags.map((hashtag) => (
              <div
                key={hashtag.tag}
                className="flex flex-col items-center p-3 rounded-lg border text-center hover:bg-muted/50 transition-colors"
              >
                <Hash className="h-5 w-5 mb-2 text-primary" />
                <p className="font-medium text-sm">{hashtag.tag}</p>
                <p className="text-xs text-muted-foreground">{hashtag.count} uses</p>
                <Badge
                  variant={
                    hashtag.engagement === "High"
                      ? "default"
                      : hashtag.engagement === "Medium"
                        ? "secondary"
                        : "outline"
                  }
                  className="mt-2"
                >
                  {hashtag.engagement}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Content Recommendations</CardTitle>
          <CardDescription>Suggestions to improve your content performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 rounded-lg border bg-muted/50">
              <div className="flex items-start gap-3">
                <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Post more video content</h3>
                  <p className="text-sm text-muted-foreground">
                    Video content has 30% higher engagement than other content types. Consider creating short demo
                    videos or interviews.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-lg border bg-muted/50">
              <div className="flex items-start gap-3">
                <Hash className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Use trending hashtags</h3>
                  <p className="text-sm text-muted-foreground">
                    Include #SingaporeTech, #StartupLife, and #Funding in your posts to increase visibility.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-lg border bg-muted/50">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Optimize content length</h3>
                  <p className="text-sm text-muted-foreground">
                    Medium-length posts (100-300 words) perform best. Keep your content concise but informative.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-lg border bg-muted/50">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Post at optimal times</h3>
                  <p className="text-sm text-muted-foreground">
                    Schedule your posts for Monday and Wednesday mornings or Friday around noon for maximum engagement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
