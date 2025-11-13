"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MetricCard } from "@/components/dashboard/metric-card"
import { AreaChart } from "@/components/dashboard/area-chart"
import { BarChartComponent } from "@/components/dashboard/bar-chart"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, BookOpen, FileText, ThumbsUp, Eye } from "lucide-react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface ContentAnalyticsProps {
  timeframe: string
}

export function ContentAnalytics({ timeframe }: ContentAnalyticsProps) {
  // Mock data - in a real app, this would come from an API
  const contentMetrics = [
    {
      title: "Total Content",
      value: "248",
      description: "Pieces of content",
      icon: FileText,
      trend: { value: 12, isPositive: true },
    },
    {
      title: "Total Views",
      value: "45.2K",
      description: "Content views",
      icon: Eye,
      trend: { value: 8, isPositive: true },
    },
    {
      title: "Engagement Rate",
      value: "18.5%",
      description: "Avg. engagement",
      icon: ThumbsUp,
      trend: { value: 2.5, isPositive: true },
    },
    {
      title: "Courses",
      value: "24",
      description: "Active courses",
      icon: BookOpen,
      trend: { value: 3, isPositive: true },
    },
  ]

  const contentViewsData = [
    { name: "Jan", value: 2500 },
    { name: "Feb", value: 3200 },
    { name: "Mar", value: 3800 },
    { name: "Apr", value: 4100 },
    { name: "May", value: 4500 },
    { name: "Jun", value: 5200 },
    { name: "Jul", value: 4800 },
    { name: "Aug", value: 5500 },
    { name: "Sep", value: 6200 },
    { name: "Oct", value: 6800 },
    { name: "Nov", value: 7200 },
    { name: "Dec", value: 7500 },
  ]

  const contentTypeData = [
    { name: "Guides", value: 35 },
    { name: "Courses", value: 25 },
    { name: "Articles", value: 20 },
    { name: "Videos", value: 15 },
    { name: "Podcasts", value: 5 },
  ]

  const topPerformingContent = [
    {
      title: "Startup Funding Guide",
      type: "Guide",
      views: 12500,
      engagement: "24.8%",
      completionRate: "78%",
      publishDate: "2025-01-15",
    },
    {
      title: "Pitch Deck Masterclass",
      type: "Course",
      views: 8700,
      engagement: "32.5%",
      completionRate: "65%",
      publishDate: "2025-02-10",
    },
    {
      title: "Finding the Right Co-Founder",
      type: "Article",
      views: 7200,
      engagement: "18.2%",
      completionRate: "92%",
      publishDate: "2025-03-05",
    },
    {
      title: "Financial Projections for Startups",
      type: "Guide",
      views: 6800,
      engagement: "21.5%",
      completionRate: "74%",
      publishDate: "2025-03-20",
    },
    {
      title: "Investor Pitch Strategies",
      type: "Video",
      views: 5900,
      engagement: "28.7%",
      completionRate: "82%",
      publishDate: "2025-04-12",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {contentMetrics.map((metric, index) => (
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
          title="Content Views Over Time"
          description="Total views across all content"
          data={contentViewsData}
          color="#0F7377"
        />

        <BarChartComponent
          title="Content by Type"
          description="Distribution of content by type"
          data={contentTypeData}
          valueSuffix="%"
          color="#0F7377"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Performing Content</CardTitle>
          <CardDescription>Content with the highest engagement and views</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Engagement</TableHead>
                <TableHead>Completion</TableHead>
                <TableHead>Published</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topPerformingContent.map((content, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{content.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{content.type}</Badge>
                  </TableCell>
                  <TableCell>{content.views.toLocaleString()}</TableCell>
                  <TableCell>{content.engagement}</TableCell>
                  <TableCell>{content.completionRate}</TableCell>
                  <TableCell>{new Date(content.publishDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                      <Link href="#">
                        <ArrowUpRight className="h-4 w-4" />
                        <span className="sr-only">View details</span>
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Content Insights</CardTitle>
          <CardDescription>Key insights to improve your content strategy</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <h3 className="font-medium">Guides and courses drive the most engagement</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Guides and courses have 30% higher engagement rates than other content types. Consider creating more
                structured, in-depth content to increase user engagement.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="font-medium">Funding-related content performs best</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Content related to startup funding and investor relations receives 45% more views than other topics.
                Consider expanding your funding-related content library.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="font-medium">Video content has highest completion rates</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Video content has an average completion rate of 82%, compared to 65% for text-based content. Consider
                incorporating more video elements in your content strategy.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
