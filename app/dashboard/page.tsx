"use client"

import { useState, useEffect } from "react"
import { EnhancedDashboardLayout } from "@/components/dashboard/enhanced-dashboard-layout"
import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  BarChart3, 
  Users, 
  Rocket, 
  DollarSign, 
  GraduationCap, 
  Building2,
  User,
  Settings,
  Activity,
  TrendingUp,
  Target,
  Award,
  Globe,
  MessageSquare,
  Calendar,
  FileText,
  Briefcase,
  Heart,
  Star,
  Zap,
  Lightbulb,
  Shield,
  Gift,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  ArrowRight,
  ChevronRight,
  Bell,
  Search,
  Filter,
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
  Tablet
} from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

interface DashboardCard {
  title: string
  description: string
  icon: React.ReactNode
  href: string
  badge?: string
  color: string
  stats?: string
  trend?: "up" | "down" | "neutral"
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

export default function DashboardPage() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("overview")
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [hasCoFounderProfile, setHasCoFounderProfile] = useState(false)
  
  // Check if user has a co-founder profile
  useEffect(() => {
    // In a real app, this would check localStorage or make an API call
    const profileExists = localStorage.getItem('coFounderProfile')
    setHasCoFounderProfile(!!profileExists)
  }, [])
  
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "New Connection Request",
      message: "Sarah Chen wants to connect with you",
      time: "2 minutes ago",
      type: "info",
      read: false
    },
    {
      id: "2",
      title: "Project Update",
      message: "Your startup application has been reviewed",
      time: "1 hour ago",
      type: "success",
      read: false
    },
    {
      id: "3",
      title: "Meeting Reminder",
      message: "Mentor session with John Doe in 30 minutes",
      time: "2 hours ago",
      type: "warning",
      read: true
    }
  ])

  const quickStats: QuickStat[] = [
    {
      title: "Total Users",
      value: "12,847",
      change: "+12.5%",
      trend: "up",
      icon: <Users className="w-5 h-5" />,
      color: "text-blue-600"
    },
    {
      title: "Active Projects",
      value: "342",
      change: "+8.3%",
      trend: "up",
      icon: <Rocket className="w-5 h-5" />,
      color: "text-green-600"
    },
    {
      title: "Revenue",
      value: "$2.4M",
      change: "+15.2%",
      trend: "up",
      icon: <DollarSign className="w-5 h-5" />,
      color: "text-purple-600"
    },
    {
      title: "Engagement",
      value: "94.2%",
      change: "+2.1%",
      trend: "up",
      icon: <Heart className="w-5 h-5" />,
      color: "text-pink-600"
    }
  ]

  const dashboardCards: DashboardCard[] = [
    {
      title: "Analytics & Insights",
      description: "View real-time metrics, trends, and performance analytics",
      icon: <BarChart3 className="h-6 w-6" />,
      href: "/analytics",
      badge: "Live",
      color: "from-blue-500 to-blue-600",
      stats: "1.2K views",
      trend: "up"
    },
    {
      title: "Admin Console",
      description: "Manage users, permissions, and platform settings",
      icon: <Shield className="h-6 w-6" />,
      href: "/admin/dashboard",
      badge: "Admin",
      color: "from-purple-500 to-purple-600",
      stats: "24 users",
      trend: "up"
    },
    {
      title: "Investor Desk",
      description: "Discover deals and track portfolio activity",
      icon: <DollarSign className="h-6 w-6" />,
      href: "/investor/dashboard",
      badge: "Investor",
      color: "from-green-500 to-green-600",
      stats: "$2.4M raised",
      trend: "up"
    },
    {
      title: "Mentor Hub",
      description: "Support startups and manage mentorship sessions",
      icon: <GraduationCap className="h-6 w-6" />,
      href: "/mentor/dashboard",
      badge: "Mentor",
      color: "from-orange-500 to-orange-600",
      stats: "15 sessions",
      trend: "up"
    },
    {
      title: "Educator Hub",
      description: "Courses, classes, and student engagement tools",
      icon: <User className="h-6 w-6" />,
      href: "/teacher/dashboard",
      badge: "Teacher",
      color: "from-indigo-500 to-indigo-600",
      stats: "8 courses",
      trend: "up"
    },
    {
      title: "Growthstarter",
      description: "Launch and manage crowdfunding campaigns",
      icon: <Rocket className="h-6 w-6" />,
      href: "/growthstarter/dashboard",
      badge: "Crowdfunding",
      color: "from-pink-500 to-pink-600",
      stats: "5 campaigns",
      trend: "up"
    },
    {
      title: "Startup HQ",
      description: "Operate your startup and track progress",
      icon: <Building2 className="h-6 w-6" />,
      href: "/startup/dashboard",
      badge: "Startup",
      color: "from-emerald-500 to-emerald-600",
      stats: "3 startups",
      trend: "up"
    },
    {
      title: "My Businesses",
      description: "Manage multiple business pages and showcase them",
      icon: <Building2 className="h-6 w-6" />,
      href: "/business",
      badge: "New",
      color: "from-teal-500 to-teal-600",
      stats: "2 businesses",
      trend: "up"
    },
    {
      title: "Super Admin",
      description: "Global configuration and platform controls",
      icon: <Settings className="h-6 w-6" />,
      href: "/super-admin",
      badge: "Super Admin",
      color: "from-red-500 to-red-600",
      stats: "Full access",
      trend: "neutral"
    }
  ]

  const recentActivities = [
    {
      id: "1",
      type: "connection",
      title: "New connection request",
      description: "Sarah Chen wants to connect with you",
      time: "2 minutes ago",
      icon: <Users className="w-4 h-4" />,
      color: "bg-blue-100 text-blue-600"
    },
    {
      id: "2",
      type: "project",
      title: "Project update",
      description: "Your startup application has been reviewed",
      time: "1 hour ago",
      icon: <Rocket className="w-4 h-4" />,
      color: "bg-green-100 text-green-600"
    },
    {
      id: "3",
      type: "meeting",
      title: "Meeting reminder",
      description: "Mentor session with John Doe in 30 minutes",
      time: "2 hours ago",
      icon: <Calendar className="w-4 h-4" />,
      color: "bg-orange-100 text-orange-600"
    },
    {
      id: "4",
      type: "notification",
      title: "System notification",
      description: "New features available in your dashboard",
      time: "3 hours ago",
      icon: <Bell className="w-4 h-4" />,
      color: "bg-purple-100 text-purple-600"
    }
  ]

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
              Dashboard
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
              {dashboardCards.map((card, index) => (
                <Link
                  key={index}
                  href={card.href}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${card.color} text-white`}>
                    {card.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {card.title}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {card.description}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto max-w-7xl px-4 py-6 lg:py-8">
        {/* Desktop Header */}
        <div className="hidden lg:block mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
                {t("dashboard.title")}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {t("dashboard.subtitle")}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
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
                {showNotifications && (
                  <div className="absolute right-0 top-12 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Notifications
                      </h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
                            notification.read ? '' : 'bg-blue-50 dark:bg-blue-900/20'
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
                )}
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

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
            <TabsTrigger value="analytics" className="text-sm">Analytics</TabsTrigger>
            <TabsTrigger value="activity" className="text-sm">Activity</TabsTrigger>
            <TabsTrigger value="settings" className="text-sm">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            {/* Real-Time Overview Section */}
            <div className="mb-8">
              <EnhancedDashboardLayout
                title="Platform Overview"
                description="Real-time platform metrics and activity"
                showMetrics={true}
                showCharts={true}
                showEvents={true}
                className="mb-8"
              />
            </div>

            {/* Dashboard Cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {dashboardCards.map((card, index) => (
                <Link key={index} href={card.href} className="group">
                  <Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-105 border-gray-200 dark:border-gray-700">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className={`p-3 rounded-lg bg-gradient-to-r ${card.color} text-white`}>
                          {card.icon}
                        </div>
                        <div className="flex items-center space-x-2">
                          {card.badge && (
                            <Badge variant="secondary" className="text-xs">
                              {card.badge}
                            </Badge>
                          )}
                          {card.trend === 'up' && (
                            <TrendingUp className="w-4 h-4 text-green-500" />
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        {card.description}
                      </p>
                      {card.stats && (
                        <p className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                          {card.stats}
                        </p>
                      )}
                      <div className="flex items-center text-sm text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                        <span>Access Dashboard</span>
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Co-founder Profile Status */}
            <div className="mt-12">
              <Card className="bg-gradient-to-r from-[#0F7377] to-[#0F7377]/90 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/20 rounded-full">
                        <Users className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Co-founder Profile</h3>
                        <p className="text-white/80 text-sm">
                          {hasCoFounderProfile 
                            ? "Your co-founder profile is active and discoverable" 
                            : "Create your co-founder profile to find potential partners"
                          }
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {hasCoFounderProfile ? (
                        <Badge className="bg-green-500 text-white">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="border-white text-white">
                          Inactive
                        </Badge>
                      )}
                      <Button 
                        variant={hasCoFounderProfile ? "secondary" : "default"}
                        size="sm"
                        onClick={() => window.location.href = hasCoFounderProfile ? '/network/find-cofounder' : '/network/find-cofounder/create-profile'}
                      >
                        {hasCoFounderProfile ? 'View Profile' : 'Create Profile'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
                Quick Actions
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Button variant="outline" className="h-20 flex-col gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                  <Plus className="h-6 w-6" />
                  <span>Create Post</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 hover:bg-green-50 dark:hover:bg-green-900/20">
                  <Users className="h-6 w-6" />
                  <span>Find Connections</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 hover:bg-orange-50 dark:hover:bg-orange-900/20">
                  <Calendar className="h-6 w-6" />
                  <span>Schedule Meeting</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 hover:bg-purple-50 dark:hover:bg-purple-900/20">
                  <MessageSquare className="h-6 w-6" />
                  <span>Start Chat</span>
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Analytics Dashboard
              </h2>
              <AnalyticsDashboard />
            </div>
          </TabsContent>

          <TabsContent value="activity" className="mt-6">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Recent Activity
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                      <Activity className="h-5 w-5" />
                      Platform Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentActivities.map((activity) => (
                        <div key={activity.id} className="flex items-center gap-3">
                          <div className={`p-2 rounded-full ${activity.color}`}>
                            {activity.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {activity.title}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {activity.description}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {activity.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                      <TrendingUp className="h-5 w-5" />
                      Growth Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-300">User Growth</span>
                        <span className="text-sm font-medium text-green-600">+12.5%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Engagement</span>
                        <span className="text-sm font-medium text-blue-600">+8.3%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Connections</span>
                        <span className="text-sm font-medium text-purple-600">+15.2%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                      <Target className="h-5 w-5" />
                      Goals Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Monthly Users</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">85%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Engagement Rate</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">92%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Settings
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
                        <span className="text-sm text-gray-600 dark:text-gray-300">Dark Mode</span>
                        <button
                          onClick={() => setDarkMode(!darkMode)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            darkMode ? 'bg-blue-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              darkMode ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Notifications</span>
                        <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                          <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
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
                      <Button variant="outline" className="w-full justify-start">
                        <Shield className="h-4 w-4 mr-2" />
                        Change Password
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
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
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="h-4 w-4 mr-2" />
                        Export Data
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
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
      </div>
    </div>
  )
}