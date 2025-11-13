"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart } from "@/components/ui/bar-chart"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

interface ContentPerformanceProps {
  timeRange: string
}

// Mock data
const contentPerformanceData = {
  labels: ["Article 1", "Article 2", "Article 3", "Article 4", "Article 5", "Article 6"],
  datasets: [
    {
      label: "Views",
      data: [1200, 950, 1500, 800, 1300, 1100],
      backgroundColor: "rgba(59, 130, 246, 0.8)",
      borderColor: "rgba(59, 130, 246, 1)",
      borderWidth: 1,
    },
  ],
}

const contentEngagementData = {
  labels: ["Article 1", "Article 2", "Article 3", "Article 4", "Article 5", "Article 6"],
  datasets: [
    {
      label: "Likes",
      data: [120, 95, 150, 80, 130, 110],
      backgroundColor: "rgba(59, 130, 246, 0.8)",
      borderColor: "rgba(59, 130, 246, 1)",
      borderWidth: 1,
    },
    {
      label: "Comments",
      data: [45, 32, 65, 28, 52, 38],
      backgroundColor: "rgba(139, 92, 246, 0.8)",
      borderColor: "rgba(139, 92, 246, 1)",
      borderWidth: 1,
    },
    {
      label: "Shares",
      data: [25, 18, 35, 15, 28, 22],
      backgroundColor: "rgba(16, 185, 129, 0.8)",
      borderColor: "rgba(16, 185, 129, 1)",
      borderWidth: 1,
    },
  ],
}

export function ContentPerformance({ timeRange }: ContentPerformanceProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Content Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="views">
            <TabsList>
              <TabsTrigger value="views">Views</TabsTrigger>
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
            </TabsList>
            <TabsContent value="views" className="h-[400px] mt-4">
              <BarChart data={contentPerformanceData.map((item: any) => ({ name: item.name || item.label || item.date, value: item.value || item.data || 0 }))} />
            </TabsContent>
            <TabsContent value="engagement" className="h-[400px] mt-4">
              <BarChart data={contentEngagementData} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Content Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[
              {
                title: "How to secure seed funding for your startup",
                date: "Feb 10, 2025",
                views: 1245,
                likes: 120,
                comments: 45,
                shares: 25,
                image: "/abstract-colorful-swirls.png",
                trending: true,
              },
              {
                title: "5 essential metrics every startup founder should track",
                date: "Feb 5, 2025",
                views: 980,
                likes: 95,
                comments: 32,
                shares: 18,
                image: "/rising-tide-startups.png",
                trending: false,
              },
              {
                title: "Building a strong founding team: What to look for in co-founders",
                date: "Jan 28, 2025",
                views: 1520,
                likes: 150,
                comments: 65,
                shares: 35,
                image: "/collaborative-growth.png",
                trending: true,
              },
            ].map((content, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <img
                    src={content.image || "/placeholder.svg"}
                    alt={content.title}
                    className="h-20 w-20 object-cover rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{content.title}</h4>
                    {content.trending && (
                      <Badge variant="outline" className="bg-red-50 text-red-600 hover:bg-red-50 border-red-200">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3 w-3 mr-1"
                        >
                          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                          <polyline points="17 6 23 6 23 12" />
                        </svg>
                        Trending
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">Posted on {content.date}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-sm flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 mr-1"
                      >
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      {content.views.toLocaleString()}
                    </span>
                    <span className="text-sm flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 mr-1"
                      >
                        <path d="M7 10v12" />
                        <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                      </svg>
                      {content.likes}
                    </span>
                    <span className="text-sm flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 mr-1"
                      >
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      {content.comments}
                    </span>
                    <span className="text-sm flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 mr-1"
                      >
                        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                        <polyline points="16 6 12 2 8 6" />
                        <line x1="12" y1="2" x2="12" y2="15" />
                      </svg>
                      {content.shares}
                    </span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="flex-shrink-0">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
