"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart } from "@/components/ui/line-chart"
import { BarChart } from "@/components/ui/bar-chart"
import { PieChart } from "@/components/ui/pie-chart"

interface EngagementOverviewProps {
  timeRange: string
}

// Mock data
const engagementData = {
  labels: ["Jan 1", "Jan 8", "Jan 15", "Jan 22", "Jan 29", "Feb 5", "Feb 12"],
  datasets: [
    {
      label: "Likes",
      data: [45, 52, 38, 65, 48, 57, 72],
      borderColor: "rgba(59, 130, 246, 1)",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      tension: 0.4,
    },
    {
      label: "Comments",
      data: [12, 18, 15, 21, 17, 19, 24],
      borderColor: "rgba(139, 92, 246, 1)",
      backgroundColor: "rgba(139, 92, 246, 0.1)",
      tension: 0.4,
    },
    {
      label: "Shares",
      data: [5, 7, 4, 9, 6, 8, 11],
      borderColor: "rgba(16, 185, 129, 1)",
      backgroundColor: "rgba(16, 185, 129, 0.1)",
      tension: 0.4,
    },
    {
      label: "Saves",
      data: [8, 10, 6, 12, 9, 11, 15],
      borderColor: "rgba(245, 158, 11, 1)",
      backgroundColor: "rgba(245, 158, 11, 0.1)",
      tension: 0.4,
    },
  ],
}

const engagementByTimeData = {
  labels: ["6am", "9am", "12pm", "3pm", "6pm", "9pm", "12am", "3am"],
  datasets: [
    {
      label: "Engagement",
      data: [25, 120, 180, 150, 210, 190, 95, 40],
      backgroundColor: "rgba(59, 130, 246, 0.8)",
      borderColor: "rgba(59, 130, 246, 1)",
      borderWidth: 1,
    },
  ],
}

const audienceData = {
  labels: ["Founders", "Investors", "Mentors", "Students", "Others"],
  datasets: [
    {
      label: "Audience",
      data: [45, 25, 15, 10, 5],
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

export function EngagementOverview({ timeRange }: EngagementOverviewProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Engagement Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="by-time">By Time</TabsTrigger>
              <TabsTrigger value="by-audience">By Audience</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="h-[400px] mt-4">
              <LineChart data={engagementData} />
            </TabsContent>
            <TabsContent value="by-time" className="h-[400px] mt-4">
              <BarChart data={engagementByTimeData.labels.map((label, index) => ({ name: label, value: engagementByTimeData.datasets[0].data[index] }))} />
            </TabsContent>
            <TabsContent value="by-audience" className="h-[400px] mt-4">
              <PieChart data={audienceData} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="bg-muted rounded-md h-16 w-16 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium text-sm">How to secure seed funding for your startup</h4>
                    <p className="text-xs text-muted-foreground">Posted on Feb {i + 1}, 2025</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs flex items-center">
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
                          <path d="M7 10v12" />
                          <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                        </svg>
                        {120 - i * 15}
                      </span>
                      <span className="text-xs flex items-center">
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
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                        {45 - i * 8}
                      </span>
                      <span className="text-xs flex items-center">
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
                          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                          <polyline points="16 6 12 2 8 6" />
                          <line x1="12" y1="2" x2="12" y2="15" />
                        </svg>
                        {25 - i * 5}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Engagement by Content Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: "Articles", count: 12, engagement: 85 },
                { type: "Images", count: 24, engagement: 72 },
                { type: "Videos", count: 8, engagement: 92 },
                { type: "Polls", count: 5, engagement: 78 },
                { type: "Documents", count: 3, engagement: 65 },
              ].map((item, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.type}</span>
                    <span className="text-sm">{item.count} posts</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <div className="bg-primary h-full" style={{ width: `${item.engagement}%` }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Engagement rate</span>
                    <span>{item.engagement}%</span>
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
