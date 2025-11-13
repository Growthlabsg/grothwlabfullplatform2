"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  RefreshCw, 
  Activity, 
  TrendingUp, 
  Users, 
  DollarSign, 
  MessageSquare,
  Calendar,
  Zap,
  Globe,
  Target,
  BarChart3,
  Settings
} from "lucide-react"
import { 
  UserMetricCard,
  ActiveUsersMetricCard,
  EngagementMetricCard,
  GrowthMetricCard,
  FundingMetricCard,
  ConversionMetricCard
} from "./enhanced-metric-card"
import { RealTimeEvents, UserActivityEvents, FundingEvents, ConnectionEvents } from "./real-time-events"
import { 
  UserGrowthChart,
  EngagementChart,
  FundingChart,
  ConnectionsChart
} from "./enhanced-data-visualization"
import { useRealTimeDashboard } from "@/hooks/use-real-time-dashboard"
import { cn } from "@/lib/utils"

interface EnhancedDashboardLayoutProps {
  title?: string
  description?: string
  showMetrics?: boolean
  showCharts?: boolean
  showEvents?: boolean
  className?: string
}

export function EnhancedDashboardLayout({
  title = "Dashboard",
  description = "Real-time platform overview",
  showMetrics = true,
  showCharts = true,
  showEvents = true,
  className,
}: EnhancedDashboardLayoutProps) {
  const { data, loading, error, lastUpdated, refresh, isConnected } = useRealTimeDashboard({
    autoRefresh: true,
    refreshInterval: 30000, // 30 seconds
    enableRealTime: true,
  })

  const [activeTab, setActiveTab] = useState("overview")
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Handle manual refresh
  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      await refresh()
    } catch (error) {
      console.error("Failed to refresh dashboard:", error)
    } finally {
      setIsRefreshing(false)
    }
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Connection Status */}
          <div className="flex items-center gap-2">
            <div className={cn(
              "h-2 w-2 rounded-full",
              isConnected ? "bg-green-500" : "bg-red-500"
            )} />
            <span className="text-sm text-muted-foreground">
              {isConnected ? "Live" : "Offline"}
            </span>
          </div>
          
          {/* Last Updated */}
          {lastUpdated && (
            <span className="text-sm text-muted-foreground">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </span>
          )}
          
          {/* Refresh Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing || loading}
          >
            <RefreshCw className={cn(
              "h-4 w-4 mr-2",
              (isRefreshing || loading) && "animate-spin"
            )} />
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </Button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-red-600">
              <Activity className="h-4 w-4" />
              <span className="text-sm font-medium">Dashboard Error</span>
            </div>
            <p className="text-sm text-red-600 mt-1">{error}</p>
            <Button variant="outline" size="sm" onClick={handleRefresh} className="mt-2">
              Try Again
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {showMetrics && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <UserMetricCard />
              <ActiveUsersMetricCard />
              <EngagementMetricCard />
              <GrowthMetricCard />
              <FundingMetricCard />
              <ConversionMetricCard />
            </div>
          )}

          {showCharts && (
            <div className="grid gap-6 md:grid-cols-2">
              <UserGrowthChart />
              <EngagementChart />
            </div>
          )}

          {showEvents && (
            <div className="grid gap-6 md:grid-cols-2">
              <UserActivityEvents />
              <FundingEvents />
            </div>
          )}
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <UserGrowthChart />
            <EngagementChart />
            <FundingChart />
            <ConnectionsChart />
          </div>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <UserActivityEvents />
            <ConnectionEvents />
            <FundingEvents />
            <RealTimeEvents 
              title="All Activity"
              maxEvents={15}
              className="md:col-span-2"
            />
          </div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Performance Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">92.5%</div>
                <p className="text-sm text-muted-foreground mt-1">
                  Platform performance score
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Response Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">245ms</div>
                <p className="text-sm text-muted-foreground mt-1">
                  Average response time
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Uptime
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">99.9%</div>
                <p className="text-sm text-muted-foreground mt-1">
                  Platform uptime
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <EngagementChart />
            <ConnectionsChart />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Specialized dashboard layouts
export function AdminDashboard() {
  return (
    <EnhancedDashboardLayout
      title="Admin Dashboard"
      description="Platform administration and monitoring"
      showMetrics={true}
      showCharts={true}
      showEvents={true}
    />
  )
}

export function InvestorDashboard() {
  return (
    <EnhancedDashboardLayout
      title="Investor Dashboard"
      description="Investment opportunities and portfolio overview"
      showMetrics={true}
      showCharts={true}
      showEvents={true}
    />
  )
}

export function StartupDashboard() {
  return (
    <EnhancedDashboardLayout
      title="Startup Dashboard"
      description="Your startup metrics and growth"
      showMetrics={true}
      showCharts={true}
      showEvents={true}
    />
  )
}

export function MentorDashboard() {
  return (
    <EnhancedDashboardLayout
      title="Mentor Dashboard"
      description="Mentorship activities and impact"
      showMetrics={true}
      showCharts={true}
      showEvents={true}
    />
  )
} 