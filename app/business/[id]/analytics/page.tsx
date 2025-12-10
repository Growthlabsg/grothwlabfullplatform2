"use client";

import { use } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Target,
  Globe,
  Clock,
} from "lucide-react";
import { useGetPageQuery, useGetPageAnalyticsQuery } from "@/lib/redux";
import { toast } from "sonner";

interface PageAnalyticsProps {
  params: Promise<{ id: string }>;
}

// Mock data for analytics - replace with real API data
const mockAnalytics = {
  overview: {
    pageViews: 12543,
    pageViewsChange: 12.5,
    followers: 1247,
    followersChange: 8.3,
    postImpressions: 45678,
    postImpressionsChange: -2.1,
    engagementRate: 4.7,
    engagementRateChange: 0.8,
  },
  visitors: {
    total: 8234,
    unique: 5621,
    returning: 2613,
    avgTimeOnPage: "2m 34s",
    bounceRate: 42.3,
  },
  topPosts: [
    {
      id: 1,
      title: "Announcing our new product launch!",
      likes: 234,
      comments: 45,
      shares: 12,
      views: 1234,
    },
    {
      id: 2,
      title: "Behind the scenes at our office",
      likes: 189,
      comments: 32,
      shares: 8,
      views: 987,
    },
    {
      id: 3,
      title: "Tips for startup success",
      likes: 156,
      comments: 28,
      shares: 15,
      views: 876,
    },
  ],
  demographics: {
    locations: [
      { name: "Singapore", percentage: 45 },
      { name: "United States", percentage: 22 },
      { name: "United Kingdom", percentage: 12 },
      { name: "India", percentage: 8 },
      { name: "Others", percentage: 13 },
    ],
    industries: [
      { name: "Technology", percentage: 38 },
      { name: "Finance", percentage: 24 },
      { name: "Marketing", percentage: 15 },
      { name: "Healthcare", percentage: 10 },
      { name: "Others", percentage: 13 },
    ],
  },
  activity: {
    postsThisMonth: 12,
    commentsReceived: 156,
    mentionsReceived: 34,
    messagesReceived: 89,
  },
};

function StatCard({
  title,
  value,
  change,
  icon: Icon,
  suffix = "",
}: {
  title: string;
  value: number | string;
  change?: number;
  icon: any;
  suffix?: string;
}) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          {change !== undefined && (
            <Badge
              variant="outline"
              className={
                isPositive
                  ? "text-green-600 border-green-200 bg-green-50"
                  : isNegative
                  ? "text-red-600 border-red-200 bg-red-50"
                  : ""
              }
            >
              {isPositive ? (
                <ArrowUpRight className="h-3 w-3 mr-1" />
              ) : isNegative ? (
                <ArrowDownRight className="h-3 w-3 mr-1" />
              ) : null}
              {Math.abs(change)}%
            </Badge>
          )}
        </div>
        <div className="mt-4">
          <p className="text-2xl font-bold">
            {typeof value === "number" ? value.toLocaleString() : value}
            {suffix}
          </p>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function PageAnalyticsPage({ params }: PageAnalyticsProps) {
  const { id } = use(params);
  const pageId = parseInt(id);

  const { data: page, isLoading: isLoadingPage } = useGetPageQuery(pageId);
  const { data: analytics, isLoading: isLoadingAnalytics } =
    useGetPageAnalyticsQuery(pageId);

  const isLoading = isLoadingPage || isLoadingAnalytics;

  // Use real analytics if available, otherwise use mock data
  const data = analytics || mockAnalytics;

  if (isLoading) {
    return (
      <div className="container max-w-6xl mx-auto py-8 px-4">
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <Skeleton className="h-[400px]" />
      </div>
    );
  }

  if (!page) {
    return (
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <Card className="p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">Page not found</h2>
          <p className="text-muted-foreground mb-4">
            The page you're looking for doesn't exist or you don't have access.
          </p>
          <Button asChild>
            <Link href="/business">Back to Business Pages</Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/business/${pageId}`}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Page
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <BarChart3 className="h-6 w-6" />
              Analytics
            </h1>
            <p className="text-muted-foreground">
              Performance insights for {page.businessTitle}
            </p>
          </div>
        </div>
        <Select defaultValue="30days">
          <SelectTrigger className="w-40">
            <Calendar className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="90days">Last 90 days</SelectItem>
            <SelectItem value="year">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Page Views"
          value={mockAnalytics.overview.pageViews}
          change={mockAnalytics.overview.pageViewsChange}
          icon={Eye}
        />
        <StatCard
          title="Followers"
          value={mockAnalytics.overview.followers}
          change={mockAnalytics.overview.followersChange}
          icon={Users}
        />
        <StatCard
          title="Post Impressions"
          value={mockAnalytics.overview.postImpressions}
          change={mockAnalytics.overview.postImpressionsChange}
          icon={Activity}
        />
        <StatCard
          title="Engagement Rate"
          value={mockAnalytics.overview.engagementRate}
          change={mockAnalytics.overview.engagementRateChange}
          icon={Target}
          suffix="%"
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Visitor Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Visitor Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-muted-foreground">
                      Total Visitors
                    </span>
                    <span className="font-semibold">
                      {mockAnalytics.visitors.total.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-muted-foreground">
                      Unique Visitors
                    </span>
                    <span className="font-semibold">
                      {mockAnalytics.visitors.unique.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-muted-foreground">
                      Returning Visitors
                    </span>
                    <span className="font-semibold">
                      {mockAnalytics.visitors.returning.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-muted-foreground">
                      Avg. Time on Page
                    </span>
                    <span className="font-semibold">
                      {mockAnalytics.visitors.avgTimeOnPage}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-muted-foreground">Bounce Rate</span>
                    <span className="font-semibold">
                      {mockAnalytics.visitors.bounceRate}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Page Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-muted-foreground">
                      Posts This Month
                    </span>
                    <span className="font-semibold">
                      {mockAnalytics.activity.postsThisMonth}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-muted-foreground">
                      Comments Received
                    </span>
                    <span className="font-semibold">
                      {mockAnalytics.activity.commentsReceived}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-muted-foreground">Mentions</span>
                    <span className="font-semibold">
                      {mockAnalytics.activity.mentionsReceived}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-muted-foreground">
                      Messages Received
                    </span>
                    <span className="font-semibold">
                      {mockAnalytics.activity.messagesReceived}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Content Tab */}
        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Posts</CardTitle>
              <CardDescription>
                Your best performing content this period
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAnalytics.topPosts.map((post, index) => (
                  <div
                    key={post.id}
                    className="flex items-center gap-4 p-4 border rounded-lg"
                  >
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-primary/10 rounded-full text-primary font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{post.title}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {post.views.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          {post.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="h-3 w-3" />
                          {post.comments}
                        </span>
                        <span className="flex items-center gap-1">
                          <Share2 className="h-3 w-3" />
                          {post.shares}
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Post
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Audience Tab */}
        <TabsContent value="audience" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Location Demographics */}
            <Card>
              <CardHeader>
                <CardTitle>Audience by Location</CardTitle>
                <CardDescription>Where your followers are from</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockAnalytics.demographics.locations.map((location) => (
                    <div key={location.name} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{location.name}</span>
                        <span className="font-medium">
                          {location.percentage}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${location.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Industry Demographics */}
            <Card>
              <CardHeader>
                <CardTitle>Audience by Industry</CardTitle>
                <CardDescription>
                  Industries your followers work in
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockAnalytics.demographics.industries.map((industry) => (
                    <div key={industry.name} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{industry.name}</span>
                        <span className="font-medium">
                          {industry.percentage}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full transition-all"
                          style={{ width: `${industry.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
