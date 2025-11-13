"use client"

import { useState, useEffect } from "react"
import { useFounderAuth } from "@/contexts/founder-auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Crown, 
  Users, 
  Settings, 
  Activity, 
  Shield, 
  BarChart3, 
  ToggleLeft, 
  Database,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  TrendingUp,
  Target,
  Zap,
  Globe,
  Building,
  FileText,
  MessageSquare,
  Calendar,
  Video,
  Phone,
  QrCode,
  Bell,
  Heart,
  Star,
  Award,
  Rocket,
  Lightbulb,
  Briefcase,
  GraduationCap,
  Handshake,
  PiggyBank,
  ChartLine,
  Cog,
  Key,
  Eye,
  EyeOff
} from "lucide-react"
import { FounderProtectedRoute } from "@/components/founder/founder-protected-route"
import ComprehensiveFeatureControl from "@/components/founder/comprehensive-feature-control"
import EmployeeManagement from "@/components/founder/employee-management"
import LaunchPhases from "@/components/founder/launch-phases"
import PlatformControl from "@/components/founder/platform-control"
import RevenueAnalytics from "@/components/founder/revenue-analytics"
import SystemHealth from "@/components/founder/system-health"
import StrategicOverview from "@/components/founder/strategic-overview"

export default function FounderDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const { founder, getSystemStatus, getAnalytics, getRevenueMetrics } = useFounderAuth()
  
  const [systemStatus, setSystemStatus] = useState<any>(null)
  const [analytics, setAnalytics] = useState<any>(null)
  const [revenueMetrics, setRevenueMetrics] = useState<any>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [status, analyticsData, revenue] = await Promise.all([
          getSystemStatus(),
          getAnalytics(),
          getRevenueMetrics()
        ])
        setSystemStatus(status)
        setAnalytics(analyticsData)
        setRevenueMetrics(revenue)
      } catch (error) {
        console.error("Failed to load dashboard data:", error)
      }
    }

    loadData()
  }, [getSystemStatus, getAnalytics, getRevenueMetrics])

  if (!founder) return null

  return (
    <FounderProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-lg border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Crown className="h-8 w-8 text-yellow-400" />
                  <h1 className="text-2xl font-bold text-white">GrowthLab Founder</h1>
                </div>
                <Badge variant="secondary" className="bg-yellow-400/20 text-yellow-400 border-yellow-400/50">
                  Founder Access
                </Badge>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-slate-300">Welcome back,</p>
                  <p className="text-white font-medium">{founder.displayName}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-yellow-400/20 border border-yellow-400/50 flex items-center justify-center">
                  <Crown className="h-5 w-5 text-yellow-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* System Status Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-lg border-white/20 dark:border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white dark:text-gray-100">Platform Status</CardTitle>
                <div className="p-2 bg-green-500/20 rounded-full">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white dark:text-white">
                  {systemStatus?.status || "Loading..."}
                </div>
                <p className="text-xs text-slate-300 dark:text-gray-300">
                  Uptime: {systemStatus?.uptime || "Loading..."}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Active Users</CardTitle>
                <Users className="h-4 w-4 text-slate-300" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {analytics?.activeUsers?.toLocaleString() || "Loading..."}
                </div>
                <p className="text-xs text-slate-300">
                  Total: {analytics?.totalUsers?.toLocaleString() || "Loading..."}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Monthly Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-slate-300" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  ${revenueMetrics?.monthlyRecurringRevenue?.toLocaleString() || "Loading..."}
                </div>
                <p className="text-xs text-slate-300">
                  Growth: {revenueMetrics?.revenueGrowth || "Loading..."}%
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">System Load</CardTitle>
                <BarChart3 className="h-4 w-4 text-slate-300" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {systemStatus?.systemLoad || "Loading..."}
                </div>
                <p className="text-xs text-slate-300">
                  Database: {systemStatus?.databaseStatus || "Loading..."}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 mb-8">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
              <CardDescription className="text-slate-300">
                Common founder tasks and platform controls
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center space-y-2 bg-white/10 border-white/20 text-white hover:bg-white/20"
                  onClick={() => setActiveTab("features")}
                >
                  <ToggleLeft className="h-6 w-6" />
                  <span className="text-sm">Features</span>
                </Button>
                
                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center space-y-2 bg-white/10 border-white/20 text-white hover:bg-white/20"
                  onClick={() => setActiveTab("employees")}
                >
                  <Users className="h-6 w-6" />
                  <span className="text-sm">Team</span>
                </Button>
                
                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center space-y-2 bg-white/10 border-white/20 text-white hover:bg-white/20"
                  onClick={() => setActiveTab("phases")}
                >
                  <Rocket className="h-6 w-6" />
                  <span className="text-sm">Launch</span>
                </Button>
                
                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center space-y-2 bg-white/10 border-white/20 text-white hover:bg-white/20"
                  onClick={() => setActiveTab("platform")}
                >
                  <Cog className="h-6 w-6" />
                  <span className="text-sm">Platform</span>
                </Button>
                
                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center space-y-2 bg-white/10 border-white/20 text-white hover:bg-white/20"
                  onClick={() => setActiveTab("revenue")}
                >
                  <ChartLine className="h-6 w-6" />
                  <span className="text-sm">Revenue</span>
                </Button>
                
                <Button
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center space-y-2 bg-white/10 border-white/20 text-white hover:bg-white/20"
                  onClick={() => setActiveTab("strategy")}
                >
                  <Target className="h-6 w-6" />
                  <span className="text-sm">Strategy</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-8 bg-white/10 border-white/20">
              <TabsTrigger value="overview" className="text-white data-[state=active]:bg-yellow-400/20 data-[state=active]:text-yellow-400">
                Overview
              </TabsTrigger>
              <TabsTrigger value="features" className="text-white data-[state=active]:bg-yellow-400/20 data-[state=active]:text-yellow-400">
                Features
              </TabsTrigger>
              <TabsTrigger value="employees" className="text-white data-[state=active]:bg-yellow-400/20 data-[state=active]:text-yellow-400">
                Team
              </TabsTrigger>
              <TabsTrigger value="phases" className="text-white data-[state=active]:bg-yellow-400/20 data-[state=active]:text-yellow-400">
                Launch
              </TabsTrigger>
              <TabsTrigger value="platform" className="text-white data-[state=active]:bg-yellow-400/20 data-[state=active]:text-yellow-400">
                Platform
              </TabsTrigger>
              <TabsTrigger value="revenue" className="text-white data-[state=active]:bg-yellow-400/20 data-[state=active]:text-yellow-400">
                Revenue
              </TabsTrigger>
              <TabsTrigger value="strategy" className="text-white data-[state=active]:bg-yellow-400/20 data-[state=active]:text-yellow-400">
                Strategy
              </TabsTrigger>
              <TabsTrigger value="health" className="text-white data-[state=active]:bg-yellow-400/20 data-[state=active]:text-yellow-400">
                Health
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <StrategicOverview />
            </TabsContent>

            <TabsContent value="features" className="space-y-6">
              <ComprehensiveFeatureControl />
            </TabsContent>

            <TabsContent value="employees" className="space-y-6">
              <EmployeeManagement />
            </TabsContent>

            <TabsContent value="phases" className="space-y-6">
              <LaunchPhases />
            </TabsContent>

            <TabsContent value="platform" className="space-y-6">
              <PlatformControl />
            </TabsContent>

            <TabsContent value="revenue" className="space-y-6">
              <RevenueAnalytics />
            </TabsContent>

            <TabsContent value="strategy" className="space-y-6">
              <StrategicOverview />
            </TabsContent>

            <TabsContent value="health" className="space-y-6">
              <SystemHealth />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </FounderProtectedRoute>
  )
}
