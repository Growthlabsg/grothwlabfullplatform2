"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft,
  BarChart,
  TrendingUp,
  Clock,
  BookOpen,
  Award,
  Target,
  Users,
  Calendar,
  Download,
  Share2,
  Filter,
  Eye,
  CheckCircle,
  Star,
  Trophy,
  Zap,
  Activity
} from "lucide-react"
import Link from "next/link"

export default function AnalyticsPage() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const stats = [
    {
      title: "Total Learning Time",
      value: "127 hours",
      change: "+12%",
      trend: "up",
      icon: Clock,
      color: "text-blue-600"
    },
    {
      title: "Courses Completed",
      value: "8",
      change: "+2",
      trend: "up",
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      title: "Certificates Earned",
      value: "6",
      change: "+1",
      trend: "up",
      icon: Award,
      color: "text-purple-600"
    },
    {
      title: "Learning Streak",
      value: "15 days",
      change: "+5",
      trend: "up",
      icon: Zap,
      color: "text-orange-600"
    }
  ]

  const weeklyProgress = [
    { day: "Mon", hours: 2.5 },
    { day: "Tue", hours: 3.2 },
    { day: "Wed", hours: 1.8 },
    { day: "Thu", hours: 4.1 },
    { day: "Fri", hours: 2.9 },
    { day: "Sat", hours: 3.5 },
    { day: "Sun", hours: 2.1 }
  ]

  const topCategories = [
    { name: "Funding & Finance", hours: 45, percentage: 35 },
    { name: "Marketing & Sales", hours: 32, percentage: 25 },
    { name: "Product Development", hours: 28, percentage: 22 },
    { name: "Leadership", hours: 22, percentage: 18 }
  ]

  const recentAchievements = [
    {
      title: "Funding Master",
      description: "Completed all funding courses",
      date: "2024-01-15",
      icon: Trophy,
      color: "text-yellow-600"
    },
    {
      title: "7-Day Streak",
      description: "Learned for 7 consecutive days",
      date: "2024-01-14",
      icon: Zap,
      color: "text-orange-600"
    },
    {
      title: "First Certificate",
      description: "Earned your first certificate",
      date: "2024-01-10",
      icon: Award,
      color: "text-purple-600"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/resources/startup-school">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Startup School
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Learning Analytics</h1>
                <p className="text-sm text-gray-600">Track your learning progress and achievements</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    {stat.change}
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.title}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weekly Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Learning Activity</CardTitle>
                <CardDescription>Your learning hours over the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyProgress.map((day, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="w-12 text-sm font-medium text-gray-600">{day.day}</div>
                      <div className="flex-1 mx-4">
                        <Progress value={(day.hours / 5) * 100} className="h-2" />
                      </div>
                      <div className="w-16 text-sm text-gray-600 text-right">{day.hours}h</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Learning Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Learning by Category</CardTitle>
                <CardDescription>Time spent on different course categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topCategories.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">{category.name}</span>
                        <span className="text-sm text-gray-600">{category.hours}h ({category.percentage}%)</span>
                      </div>
                      <Progress value={category.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
                <CardDescription>Your latest accomplishments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentAchievements.map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center`}>
                      <achievement.icon className={`h-5 w-5 ${achievement.color}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">{achievement.title}</h4>
                      <p className="text-xs text-gray-600">{achievement.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{achievement.date}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Learning Goals */}
            <Card>
              <CardHeader>
                <CardTitle>Learning Goals</CardTitle>
                <CardDescription>Track your progress towards goals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Complete 10 courses</span>
                    <span className="text-sm text-gray-600">8/10</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Learn 100 hours</span>
                    <span className="text-sm text-gray-600">127/100</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Earn 5 certificates</span>
                    <span className="text-sm text-gray-600">6/5</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/resources/startup-school/my-courses">
                    <BookOpen className="h-4 w-4 mr-2" />
                    View My Courses
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/resources/startup-school/certificates">
                    <Award className="h-4 w-4 mr-2" />
                    View Certificates
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/resources/startup-school/learning-paths">
                    <Target className="h-4 w-4 mr-2" />
                    Browse Learning Paths
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
