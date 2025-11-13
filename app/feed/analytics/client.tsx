"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PostAnalytics } from "@/components/feed/analytics/post-analytics"
import { AudienceAnalytics } from "@/components/feed/analytics/audience-analytics"
import { EngagementAnalytics } from "@/components/feed/analytics/engagement-analytics"
import { ContentAnalytics } from "@/components/feed/analytics/content-analytics"

export function FeedAnalyticsClient() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    to: new Date(),
  })

  return (
          <div className="container py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold">Feed Analytics</h1>
              <p className="text-muted-foreground">
                Gain insights into your content performance and audience engagement
              </p>
            </div>
          </div>

          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="audience">Audience</TabsTrigger>
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
            </TabsList>

            <TabsContent value="posts">
              <PostAnalytics dateRange={dateRange} />
            </TabsContent>

            <TabsContent value="audience">
              <AudienceAnalytics dateRange={dateRange} />
            </TabsContent>

            <TabsContent value="engagement">
              <EngagementAnalytics dateRange={dateRange} />
            </TabsContent>

            <TabsContent value="content">
              <ContentAnalytics dateRange={dateRange} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    )
  }
