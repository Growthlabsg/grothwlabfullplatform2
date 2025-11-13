"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Star, 
  Crown, 
  Zap, 
  Users, 
  MessageSquare, 
  Briefcase, 
  Calendar, 
  FileText, 
  Phone, 
  Search,
  TrendingUp,
  BarChart3,
  Settings,
  CreditCard,
  Check,
  ArrowRight,
  ChevronRight,
  Bell,
  Menu,
  X,
  Eye,
  Download,
  Share2,
  Bookmark,
  ThumbsUp,
  MessageCircle,
  MoreHorizontal,
  TrendingDown,
  RefreshCw,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
  Battery,
  BatteryLow,
  Sun,
  Moon,
  Monitor,
  Smartphone,
  Tablet,
  DollarSign,
  Target,
  Award,
  Globe,
  Heart,
  Lightbulb,
  Shield,
  Gift,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Activity,
  User,
  Building2,
  GraduationCap,
  Rocket
} from "lucide-react"
import { useSubscription } from "@/contexts/subscription-context"
import { useFeatureAccess } from "@/hooks/use-feature-access"
import { UpgradeModal } from "@/components/subscription/upgrade-modal"
import Link from "next/link"
import { toast } from "sonner"

interface UsageMetric {
  key: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  description: string
  category: string
  currentUsage: number
  limit: number
  percentage: number
  remaining: number
  status: string
  trend: "up" | "down" | "neutral"
}

interface Notification {
  id: string
  title: string
  message: string
  time: string
  type: "info" | "success" | "warning" | "error"
  read: boolean
}

interface QuickStat {
  title: string
  value: string
  change: string
  trend: "up" | "down" | "neutral"
  icon: React.ReactNode
  color: string
}

export default function SubscriptionDashboardPage() {
  const { 
    currentTier, 
    getCurrentUsage, 
    getFeatureLimit, 
    getUsagePercentage,
    getRemainingUsage,
    getAvailablePlans
  } = useSubscription()
  
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [upgradeFeature, setUpgradeFeature] = useState("")
  const [upgradeTier, setUpgradeTier] = useState<"free" | "premium" | "enterprise">("premium")
  const [activeTab, setActiveTab] = useState("overview")
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Usage Alert",
      message: "You've used 80% of your connection requests this month",
      time: "2 minutes ago",
      type: "warning",
      read: false
    },
    {
      id: "2",
      title: "Plan Update",
      message: "Your premium plan has been renewed successfully",
      time: "1 hour ago",
      type: "success",
      read: false
    },
    {
      id: "3",
      title: "Feature Available",
      message: "New AI-powered features are now available in your plan",
      time: "2 hours ago",
      type: "info",
      read: true
    }
  ])

  const plans = getAvailablePlans()
  const currentPlan = plans.find(plan => plan.tier === currentTier)

  const quickStats: QuickStat[] = [
    {
      title: "Total Usage",
      value: "78%",
      change: "+12.5%",
      trend: "up",
      icon: <BarChart3 className="w-5 h-5" />,
      color: "text-blue-600"
    },
    {
      title: "Features Used",
      value: "12/15",
      change: "+2 this month",
      trend: "up",
      icon: <CheckCircle className="w-5 h-5" />,
      color: "text-green-600"
    },
    {
      title: "Savings",
      value: "$45",
      change: "vs individual plans",
      trend: "up",
      icon: <DollarSign className="w-5 h-5" />,
      color: "text-purple-600"
    },
    {
      title: "Next Billing",
      value: "Dec 15",
      change: "Auto-renewal",
      trend: "neutral",
      icon: <Calendar className="w-5 h-5" />,
      color: "text-orange-600"
    }
  ]

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case "premium": return <Star className="w-5 h-5 text-yellow-500" />
      case "enterprise": return <Crown className="w-5 h-5 text-purple-500" />
      default: return <Zap className="w-5 h-5 text-blue-500" />
    }
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "premium": return "bg-yellow-500"
      case "enterprise": return "bg-purple-500"
      default: return "bg-blue-500"
    }
  }

  const getTierName = (tier: string) => {
    return tier.charAt(0).toUpperCase() + tier.slice(1)
  }

  const handleUpgrade = (feature: string, tier: "free" | "premium" | "enterprise") => {
    setUpgradeFeature(feature)
    setUpgradeTier(tier)
    setShowUpgradeModal(true)
  }

  const handleUpdatePaymentMethod = () => {
    toast.info("Redirecting to payment method settings...")
    setTimeout(() => {
      window.location.href = '/settings/subscription#payment'
    }, 1000)
  }

  const handleViewInvoices = () => {
    toast.info("Opening billing history...")
    setTimeout(() => {
      window.location.href = '/settings/subscription#billing'
    }, 1000)
  }

  const handleManageBilling = () => {
    toast.info("Redirecting to billing settings...")
    setTimeout(() => {
      window.location.href = '/settings/subscription'
    }, 1000)
  }

  const handleChangePassword = () => {
    toast.info("Redirecting to security settings...")
    setTimeout(() => {
      window.location.href = '/settings/subscription#security'
    }, 1000)
  }

  const handlePrivacySettings = () => {
    toast.info("Redirecting to privacy settings...")
    setTimeout(() => {
      window.location.href = '/settings/subscription#privacy'
    }, 1000)
  }

  const handleExportData = () => {
    toast.info("Preparing data export...")
    const data = {
      subscription: currentPlan,
      usage: getCurrentUsage,
      timestamp: new Date().toISOString()
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'subscription-data.json'
    a.click()
    URL.revokeObjectURL(url)
    toast.success("Data exported successfully!")
  }

  const handleDownloadReports = () => {
    toast.info("Generating usage report...")
    const report = `Subscription Report\n\nPlan: ${currentPlan?.name}\nTier: ${currentTier}\nGenerated: ${new Date().toLocaleDateString()}`
    const blob = new Blob([report], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'subscription-report.txt'
    a.click()
    URL.revokeObjectURL(url)
    toast.success("Report downloaded successfully!")
  }

  const handleToggleAutoRenewal = () => {
    toast.success("Auto-renewal setting updated!")
  }

  const handleToggleEmailNotifications = () => {
    toast.success("Email notification settings updated!")
  }

  const handleToggleUsageAlerts = () => {
    toast.success("Usage alert settings updated!")
  }

  const featureMetrics = [
    {
      key: "connectionRequests",
      label: "Connection Requests",
      icon: Users,
      description: "Send connection requests to other professionals",
      category: "networking"
    },
    {
      key: "messagesToUnconnected",
      label: "Messages to Unconnected",
      icon: MessageSquare,
      description: "Message users you haven't connected with yet",
      category: "communication"
    },
    {
      key: "jobApplications",
      label: "Job Applications",
      icon: Briefcase,
      description: "Apply to job opportunities",
      category: "career"
    },
    {
      key: "eventRegistrations",
      label: "Event Registrations",
      icon: Calendar,
      description: "Register for events and workshops",
      category: "learning"
    },
    {
      key: "downloadableTemplates",
      label: "Downloadable Templates",
      icon: FileText,
      description: "Download startup templates and resources",
      category: "resources"
    },
    {
      key: "callMinutes",
      label: "Call Minutes",
      icon: Phone,
      description: "Make calls through the platform",
      category: "communication"
    }
  ]

  const getUsageStatus = (usage: number, limit: number) => {
    if (limit === -1) return "unlimited"
    if (usage >= limit) return "limit-reached"
    if (usage >= limit * 0.8) return "approaching-limit"
    return "normal"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "limit-reached": return "text-red-600"
      case "approaching-limit": return "text-yellow-600"
      case "unlimited": return "text-green-600"
      default: return "text-gray-600"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "limit-reached": return "🔴"
      case "approaching-limit": return "🟡"
      case "unlimited": return "🟢"
      default: return "⚪"
    }
  }

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Subscription Dashboard
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Notifications Panel */}
      {showNotifications && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-50">
          <div className="bg-white dark:bg-gray-800 h-full max-w-sm w-full ml-auto shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Notifications
              </h2>
              <button
                onClick={() => setShowNotifications(false)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg border ${
                    notification.read 
                      ? 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600' 
                      : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                  }`}
                  onClick={() => markNotificationAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full ${notification.type === 'success' ? 'bg-green-100 text-green-600' : notification.type === 'warning' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                      <Bell className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {notification.title}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-50">
          <div className="bg-white dark:bg-gray-800 h-full max-w-sm w-full shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Menu
              </h2>
              <button
                onClick={() => setShowMobileMenu(false)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-2">
              <Link
                href="/subscription/plans"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                onClick={() => setShowMobileMenu(false)}
              >
                <CreditCard className="w-5 h-5 text-blue-600" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">
                    View All Plans
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Compare subscription options
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-blue-600" />
              </Link>
              <Link
                href="/settings/subscription"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 border border-green-200 dark:border-green-800"
                onClick={() => setShowMobileMenu(false)}
              >
                <Settings className="w-5 h-5 text-green-600" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">
                    Manage Subscription
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Update billing and settings
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-green-600" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0F7377] to-[#0F7377]/90 py-12 lg:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              {getTierIcon(currentTier)}
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
                {getTierName(currentTier)} Plan Dashboard
              </h1>
            </div>
            <p className="text-lg sm:text-xl text-white/90 mb-6 drop-shadow-md">
              Track your usage, understand your limits, and unlock your startup's full potential
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/subscription/plans">
                <Button size="lg" className="bg-white text-[#0F7377] hover:bg-gray-100 w-full sm:w-auto shadow-lg font-semibold">
                  <CreditCard className="w-4 h-4 mr-2" />
                  View All Plans
                </Button>
              </Link>
              <Link href="/settings/subscription">
                <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-[#0F7377] w-full sm:w-auto bg-white/20 backdrop-blur-sm shadow-lg font-semibold">
                  <Settings className="w-4 h-4 mr-2" />
                  Manage Subscription
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-7xl px-4 py-6 lg:py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {quickStats.map((stat, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                  <div className="flex items-center mt-1">
                    {stat.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    ) : stat.trend === 'down' ? (
                      <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                    ) : (
                      <Activity className="w-4 h-4 text-gray-500 mr-1" />
                    )}
                    <span className={`text-sm font-medium ${
                      stat.trend === 'up' ? 'text-green-600' : 
                      stat.trend === 'down' ? 'text-red-600' : 
                      'text-gray-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-full ${stat.color} bg-opacity-10`}>
                  {stat.icon}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="overview" className="text-sm">Overview</TabsTrigger>
            <TabsTrigger value="usage" className="text-sm">Usage</TabsTrigger>
            <TabsTrigger value="billing" className="text-sm">Billing</TabsTrigger>
            <TabsTrigger value="settings" className="text-sm">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
      {/* Current Plan Status */}
            <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#0F7377] mb-6 text-center">
              Your Current Plan
            </h2>
            
            <Card className="border-2 border-[#0F7377]/20 bg-gradient-to-r from-[#0F7377]/5 to-[#1E293B]/5">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center gap-3 mb-2">
                  {getTierIcon(currentTier)}
                  <CardTitle className="text-2xl text-[#0F7377]">
                    {currentPlan?.name || getTierName(currentTier)}
                  </CardTitle>
                </div>
                  <div className="text-gray-600 dark:text-gray-300">
                  {currentTier === "free" && "Basic access to GrowthLab features"}
                  {currentTier === "premium" && "Advanced features for active users"}
                  {currentTier === "enterprise" && "Enterprise features for teams and organizations"}
                </div>
              </CardHeader>
              <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-[#0F7377]">
                      ${currentPlan?.price || 0}
                    </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                      per {currentPlan?.billingCycle || "month"}
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#0F7377]">
                      {currentPlan?.features?.length || 0}
                    </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Features</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#0F7377]">
                      {currentTier === "free" ? "Limited" : currentTier === "premium" ? "Unlimited" : "Enterprise"}
                    </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Access</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

            {/* Feature Overview */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featureMetrics.slice(0, 6).map((metric) => {
                const currentUsage = getCurrentUsage(metric.key)
                const limit = getFeatureLimit(metric.key)
                const percentage = getUsagePercentage(metric.key)
                const remaining = getRemainingUsage(metric.key)
                const status = getUsageStatus(currentUsage, limit)
                const Icon = metric.icon

                return (
                  <Card key={metric.key} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className="w-5 h-5 text-[#0F7377]" />
                          <CardTitle className="text-lg">{metric.label}</CardTitle>
                        </div>
                        <span className={`text-sm font-medium ${getStatusColor(status)}`}>
                          {getStatusIcon(status)}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-gray-600 dark:text-gray-300">{metric.description}</p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-300">Usage</span>
                          <span className="font-medium">
                            {currentUsage}/{limit === -1 ? "∞" : limit}
                          </span>
                        </div>
                        
                        {limit !== -1 && (
                          <>
                            <Progress 
                              value={percentage} 
                              className="h-2"
                            />
                            
                            {status !== "unlimited" && (
                              <div className="text-xs text-gray-500 text-center">
                                {status === "limit-reached" 
                                  ? "Limit reached" 
                                  : status === "approaching-limit"
                                  ? `${remaining} remaining`
                                  : `${remaining} remaining`
                                }
                              </div>
                            )}
                          </>
                        )}
                      </div>

                      {status === "limit-reached" && (
                        <Button 
                          onClick={() => handleUpgrade(metric.key, "premium")}
                          className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90 text-white font-semibold shadow-lg"
                        >
                          <Star className="w-4 h-4 mr-2" />
                          Upgrade to Premium
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="usage" className="mt-6">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Detailed Usage Analytics
              </h2>
              
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {featureMetrics.map((metric) => {
                  const currentUsage = getCurrentUsage(metric.key)
                  const limit = getFeatureLimit(metric.key)
                  const percentage = getUsagePercentage(metric.key)
                  const remaining = getRemainingUsage(metric.key)
                  const status = getUsageStatus(currentUsage, limit)
                  const Icon = metric.icon

                  return (
                    <Card key={metric.key} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Icon className="w-5 h-5 text-[#0F7377]" />
                            <CardTitle className="text-lg">{metric.label}</CardTitle>
                          </div>
                          <span className={`text-sm font-medium ${getStatusColor(status)}`}>
                            {getStatusIcon(status)}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-gray-600 dark:text-gray-300">{metric.description}</p>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-300">Usage</span>
                            <span className="font-medium">
                              {currentUsage}/{limit === -1 ? "∞" : limit}
                            </span>
                          </div>
                          
                          {limit !== -1 && (
                            <>
                              <Progress 
                                value={percentage} 
                                className="h-2"
                              />
                              
                              {status !== "unlimited" && (
                                <div className="text-xs text-gray-500 text-center">
                                  {status === "limit-reached" 
                                    ? "Limit reached" 
                                    : status === "approaching-limit"
                                    ? `${remaining} remaining`
                                    : `${remaining} remaining`
                                  }
                                </div>
                              )}
                            </>
                          )}
                        </div>

                        {status === "limit-reached" && (
                          <Button 
                            onClick={() => handleUpgrade(metric.key, "premium")}
                            className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90 text-white font-semibold shadow-lg"
                          >
                            <Star className="w-4 h-4 mr-2" />
                            Upgrade to Premium
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="billing" className="mt-6">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Billing & Payment
              </h2>
              
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                      <CreditCard className="h-5 w-5" />
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Card ending in 4242</span>
                        <Badge variant="secondary">Active</Badge>
                      </div>
                      <Button variant="outline" className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200" onClick={handleUpdatePaymentMethod}>
                        <CreditCard className="w-4 h-4 mr-2" />
                        Update Payment Method
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                      <Calendar className="h-5 w-5" />
                      Billing History
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Last payment</span>
                        <span className="text-sm font-medium">Nov 15, 2024</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Amount</span>
                        <span className="text-sm font-medium">${currentPlan?.price || 0}</span>
                      </div>
                      <Button variant="outline" className="w-full bg-green-50 hover:bg-green-100 text-green-700 border-green-200" onClick={handleViewInvoices}>
                        <FileText className="w-4 h-4 mr-2" />
                        View All Invoices
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                      <Settings className="h-5 w-5" />
                      Billing Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Auto-renewal</span>
                        <button 
                          onClick={handleToggleAutoRenewal}
                          className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 hover:bg-blue-700 transition-colors"
                        >
                          <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6 transition-transform" />
                        </button>
                      </div>
                      <Button variant="outline" className="w-full bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200" onClick={handleManageBilling}>
                        <Settings className="w-4 h-4 mr-2" />
                        Manage Billing
                      </Button>
                    </div>
                  </CardContent>
                </Card>
          </div>
        </div>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Subscription Settings
              </h2>
              
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                      <Settings className="h-5 w-5" />
                      General Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Email Notifications</span>
                        <button 
                          onClick={handleToggleEmailNotifications}
                          className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 hover:bg-blue-700 transition-colors"
                        >
                          <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6 transition-transform" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Usage Alerts</span>
                        <button 
                          onClick={handleToggleUsageAlerts}
                          className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600 hover:bg-blue-700 transition-colors"
                        >
                          <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                      <Shield className="h-5 w-5" />
                      Privacy & Security
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Button variant="outline" className="w-full justify-start bg-red-50 hover:bg-red-100 text-red-700 border-red-200" onClick={handleChangePassword}>
                        <Shield className="h-4 w-4 mr-2" />
                        Change Password
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-orange-50 hover:bg-orange-100 text-orange-700 border-orange-200" onClick={handlePrivacySettings}>
                        <Settings className="h-4 w-4 mr-2" />
                        Privacy Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                      <Download className="h-5 w-5" />
                      Data & Export
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Button variant="outline" className="w-full justify-start bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200" onClick={handleExportData}>
                        <Download className="h-4 w-4 mr-2" />
                        Export Data
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-teal-50 hover:bg-teal-100 text-teal-700 border-teal-200" onClick={handleDownloadReports}>
                        <FileText className="h-4 w-4 mr-2" />
                        Download Reports
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>

      {/* Upgrade Recommendations */}
      {currentTier === "free" && (
          <div className="mt-12">
              <h2 className="text-2xl font-bold text-[#0F7377] mb-6 text-center">
                Ready to Accelerate Your Growth?
              </h2>
              
            <div className="grid gap-6 sm:grid-cols-2">
                <Card className="border-2 border-yellow-300 bg-gradient-to-r from-yellow-50 to-orange-50">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Star className="w-8 h-8 text-yellow-500" />
                      <div>
                        <CardTitle className="text-xl text-yellow-800">Premium Plan</CardTitle>
                        <p className="text-yellow-700">Perfect for active users</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-3xl font-bold text-yellow-800">$29<span className="text-lg">/month</span></div>
                    <ul className="space-y-2 text-sm text-yellow-700">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        Unlimited connections and messages
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        Advanced search filters
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        Full course access
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        Priority support
                      </li>
                    </ul>
                    <Button 
                      onClick={() => handleUpgrade("premium", "premium")}
                      className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold shadow-lg"
                    >
                      <Star className="w-4 h-4 mr-2" />
                      Upgrade to Premium
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2 border-purple-300 bg-gradient-to-r from-purple-50 to-indigo-50">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Crown className="w-8 h-8 text-purple-500" />
                      <div>
                        <CardTitle className="text-xl text-purple-800">Enterprise Plan</CardTitle>
                        <p className="text-purple-700">For teams and organizations</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-3xl font-bold text-purple-800">$99<span className="text-lg">/month</span></div>
                    <ul className="space-y-2 text-sm text-purple-700">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        Everything in Premium
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        AI-powered features
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        Team management
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        Dedicated support
                      </li>
                    </ul>
                    <Button 
                      onClick={() => handleUpgrade("enterprise", "enterprise")}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-lg"
                    >
                      <Crown className="w-4 h-4 mr-2" />
                      Upgrade to Enterprise
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
        )}
          </div>

      {/* Upgrade Modal */}
      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        feature={upgradeFeature}
        requiredTier={upgradeTier}
        message={`Upgrade to ${getTierName(upgradeTier)} to unlock ${upgradeFeature.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} and accelerate your startup's growth.`}
      />
    </div>
  )
}