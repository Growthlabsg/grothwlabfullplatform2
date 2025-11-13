"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { ProjectCreationWizard } from "@/components/growthstarter/project-creation-wizard"
import { AnalyticsDashboard } from "@/components/growthstarter/analytics-dashboard"
import { BackerManagement } from "@/components/growthstarter/backer-management"
import { SocialFeatures } from "@/components/growthstarter/social-features"
import { NotificationSystem } from "@/components/growthstarter/notification-system"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Rocket, 
  BarChart3,
  Users,
  MessageCircle,
  DollarSign,
  Eye,
  Heart,
  Share2,
  TrendingUp,
  Target,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Gift,
  Settings,
  Plus,
  Download,
  Upload,
  Bell,
  Activity
} from "lucide-react"

export default function EnhancedGrowthStarterDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) {
    return null
  }

  const projectStats = {
    totalRaised: 45620,
    totalBackers: 234,
    totalViews: 12470,
    totalLikes: 156,
    daysLeft: 12,
    goal: 25000,
    progress: 82.5
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Project Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#0F7377]">
                {formatCurrency(projectStats.totalRaised)}
              </div>
              <div className="text-sm text-muted-foreground">Total Raised</div>
              <div className="text-xs text-green-600 mt-1">+12% this week</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#0F7377]">
                {projectStats.totalBackers}
              </div>
              <div className="text-sm text-muted-foreground">Total Backers</div>
              <div className="text-xs text-green-600 mt-1">+8 new today</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#0F7377]">
                {projectStats.totalViews}
              </div>
              <div className="text-sm text-muted-foreground">Total Views</div>
              <div className="text-xs text-green-600 mt-1">+15% this week</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#0F7377]">
                {projectStats.daysLeft}
              </div>
              <div className="text-sm text-muted-foreground">Days Left</div>
              <div className="text-xs text-orange-600 mt-1">Ending soon</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardHeader>
          <CardTitle>Funding Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{projectStats.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-[#0F7377] h-3 rounded-full transition-all duration-300" 
                style={{ width: `${projectStats.progress}%` }}
              />
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {formatCurrency(projectStats.totalRaised)} raised
              </span>
              <span className="text-muted-foreground">
                of {formatCurrency(projectStats.goal)} goal
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2" onClick={() => setActiveTab("social")}>
              <Plus className="w-5 h-5" />
              <div className="text-center">
                <div className="font-medium">Create Update</div>
                <div className="text-xs text-muted-foreground">Share progress</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2" onClick={() => setActiveTab("analytics")}>
              <BarChart3 className="w-5 h-5" />
              <div className="text-center">
                <div className="font-medium">View Analytics</div>
                <div className="text-xs text-muted-foreground">Check performance</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2" onClick={() => setActiveTab("backers")}>
              <Users className="w-5 h-5" />
              <div className="text-center">
                <div className="font-medium">Manage Backers</div>
                <div className="text-xs text-muted-foreground">Track pledges</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2" onClick={() => setActiveTab("wizard")}>
              <Settings className="w-5 h-5" />
              <div className="text-center">
                <div className="font-medium">Edit Project</div>
                <div className="text-xs text-muted-foreground">Update details</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return renderOverview()
      case "wizard":
        return <ProjectCreationWizard />
      case "analytics":
        return <AnalyticsDashboard />
      case "backers":
        return <BackerManagement />
      case "social":
        return <SocialFeatures />
      case "notifications":
        return <NotificationSystem />
      default:
        return renderOverview()
    }
  }

  return (
          <div className="min-h-screen bg-[#F8FAFC]">
        <div className="container mx-auto max-w-7xl px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-[#1E293B]">GrowthStarter Dashboard</h1>
                <p className="text-[#64748B]">Manage your crowdfunding campaign</p>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Update
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="wizard">Project Wizard</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="backers">Backers</TabsTrigger>
              <TabsTrigger value="social">Social</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-6">
              {renderTabContent()}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    )
  }