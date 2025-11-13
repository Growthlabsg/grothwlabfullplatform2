"use client"

import { useState } from "react"
import { BarChart } from "@/components/ui/bar-chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownRight, Eye, ThumbsUp, MessageSquare, Share2 } from "lucide-react"

interface PostAnalyticsProps {
  dateRange: { from: Date; to: Date }
}

export function PostAnalytics({ dateRange }: PostAnalyticsProps) {
  const [selectedPost, setSelectedPost] = useState<string | null>(null)

  // Mock data - in a real app, this would come from an API
  const topPosts = [
    {
      id: "1",
      title: "10 Ways to Secure Startup Funding in Singapore",
      views: 1245,
      likes: 89,
      comments: 32,
      shares: 17,
      trend: "up",
      trendPercentage: 23,
      date: "2023-10-15",
    },
    {
      id: "2",
      title: "The Future of AI in Healthcare: Singapore's Approach",
      views: 987,
      likes: 76,
      comments: 28,
      shares: 14,
      trend: "up",
      trendPercentage: 15,
      date: "2023-10-10",
    },
    {
      id: "3",
      title: "Building a Sustainable Business Model for Your Startup",
      views: 876,
      likes: 65,
      comments: 21,
      shares: 12,
      trend: "down",
      trendPercentage: 8,
      date: "2023-10-05",
    },
    {
      id: "4",
      title: "How to Find the Perfect Co-Founder for Your Venture",
      views: 765,
      likes: 54,
      comments: 19,
      shares: 9,
      trend: "up",
      trendPercentage: 12,
      date: "2023-09-30",
    },
    {
      id: "5",
      title: "Navigating Regulatory Challenges in Singapore's Fintech Space",
      views: 654,
      likes: 43,
      comments: 15,
      shares: 7,
      trend: "down",
      trendPercentage: 5,
      date: "2023-09-25",
    },
  ]

  // Mock chart data
  const viewsData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Views",
        data: [150, 230, 380, 220, 420, 390, 450],
        backgroundColor: "rgba(15, 115, 119, 0.8)",
        borderColor: "rgba(15, 115, 119, 1)",
        borderWidth: 1,
      },
    ],
  }

  const engagementData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Likes",
        data: [25, 40, 60, 35, 70, 55, 75],
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
      },
      {
        label: "Comments",
        data: [10, 15, 25, 12, 30, 20, 35],
        backgroundColor: "rgba(139, 92, 246, 0.8)",
        borderColor: "rgba(139, 92, 246, 1)",
        borderWidth: 1,
      },
      {
        label: "Shares",
        data: [5, 8, 12, 7, 15, 10, 18],
        backgroundColor: "rgba(16, 185, 129, 0.8)",
        borderColor: "rgba(16, 185, 129, 1)",
        borderWidth: 1,
      },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">4,527</div>
              <div className="flex items-center text-green-500">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span className="text-sm">+18%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Likes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">327</div>
              <div className="flex items-center text-green-500">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span className="text-sm">+12%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Comments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">115</div>
              <div className="flex items-center text-green-500">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span className="text-sm">+7%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Shares</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">59</div>
              <div className="flex items-center text-red-500">
                <ArrowDownRight className="h-4 w-4 mr-1" />
                <span className="text-sm">-3%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Performance Over Time</CardTitle>
            <CardDescription>View trends in post performance over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="views">
              <TabsList className="mb-4">
                <TabsTrigger value="views">Views</TabsTrigger>
                <TabsTrigger value="engagement">Engagement</TabsTrigger>
              </TabsList>
              <TabsContent value="views" className="h-[300px]">
                <BarChart data={viewsData} />
              </TabsContent>
              <TabsContent value="engagement" className="h-[300px]">
                <BarChart data={engagementData} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Posts</CardTitle>
            <CardDescription>Your most viewed and engaged content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPosts.map((post) => (
                <div
                  key={post.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedPost === post.id ? "bg-primary/10" : "hover:bg-muted"
                  }`}
                  onClick={() => setSelectedPost(post.id)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-sm line-clamp-2">{post.title}</h3>
                    <Badge variant={post.trend === "up" ? "default" : "destructive"} className="ml-2 flex-shrink-0">
                      {post.trend === "up" ? "+" : "-"}
                      {post.trendPercentage}%
                    </Badge>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground gap-3">
                    <div className="flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      {post.views}
                    </div>
                    <div className="flex items-center">
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      {post.likes}
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      {post.comments}
                    </div>
                    <div className="flex items-center">
                      <Share2 className="h-3 w-3 mr-1" />
                      {post.shares}
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
