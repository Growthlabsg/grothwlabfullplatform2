"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart3, TrendingUp, Target, Award, Users, Calendar, MapPin, Star,
  Trophy, Activity, Zap, Clock, CheckCircle, XCircle, Filter, Download,
  Eye, TrendingDown, Minus, Plus, Medal, Flag, Timer, Users2
} from "lucide-react"

interface AnalyticsData {
  overview: {
    totalEvents: number
    totalParticipants: number
    averageAttendance: number
    totalPoints: number
    winRate: number
    totalAchievements: number
  }
  popularSports: {
    sport: string
    participants: number
    events: number
    averageRating: number
    trend: "up" | "down" | "stable"
  }[]
  participationTrends: {
    month: string
    events: number
    participants: number
    averageRating: number
  }[]
  topPerformers: {
    name: string
    avatar: string
    sport: string
    points: number
    events: number
    winRate: number
    achievements: number
    rating: number
    trend: "up" | "down" | "stable"
  }[]
  teamStats: {
    name: string
    sport: string
    members: number
    totalEvents: number
    wins: number
    losses: number
    winRate: number
    totalPoints: number
    averageRating: number
  }[]
  locationPerformance: {
    location: string
    events: number
    averageRating: number
    totalParticipants: number
    topSport: string
  }[]
  achievementDistribution: {
    category: string
    count: number
    percentage: number
    icon: string
  }[]
  recentActivity: {
    type: string
    description: string
    timestamp: string
    user: string
    avatar: string
    impact: "positive" | "negative" | "neutral"
  }[]
}

export function SportsAnalytics() {
  const [timePeriod, setTimePeriod] = useState("3months")
  const [selectedSport, setSelectedSport] = useState("all")
  const [viewMode, setViewMode] = useState("overview")

  // Enhanced mock data with realistic analytics
  const analyticsData: AnalyticsData = {
    overview: {
      totalEvents: 156,
      totalParticipants: 2847,
      averageAttendance: 87.5,
      totalPoints: 45230,
      winRate: 73.2,
      totalAchievements: 892
    },
    popularSports: [
      { sport: "Soccer", participants: 456, events: 48, averageRating: 4.7, trend: "up" },
      { sport: "Basketball", participants: 342, events: 36, averageRating: 4.5, trend: "up" },
      { sport: "Running", participants: 298, events: 24, averageRating: 4.8, trend: "stable" },
      { sport: "Tennis", participants: 187, events: 18, averageRating: 4.3, trend: "down" },
      { sport: "Swimming", participants: 156, events: 12, averageRating: 4.6, trend: "up" }
    ],
    participationTrends: [
      { month: "Jan", events: 12, participants: 234, averageRating: 4.4 },
      { month: "Feb", events: 14, participants: 267, averageRating: 4.5 },
      { month: "Mar", events: 16, participants: 298, averageRating: 4.6 },
      { month: "Apr", events: 18, participants: 312, averageRating: 4.7 },
      { month: "May", events: 20, participants: 345, averageRating: 4.8 },
      { month: "Jun", events: 22, participants: 378, averageRating: 4.9 }
    ],
    topPerformers: [
      { name: "Alex Wong", avatar: "👨‍💼", sport: "Soccer", points: 2450, events: 24, winRate: 87.5, achievements: 12, rating: 4.9, trend: "up" },
      { name: "Sarah Chen", avatar: "👩‍💼", sport: "Basketball", points: 2180, events: 22, winRate: 81.8, achievements: 10, rating: 4.8, trend: "up" },
      { name: "David Kumar", avatar: "👨‍💼", sport: "Running", points: 1950, events: 18, winRate: 94.4, achievements: 8, rating: 4.7, trend: "stable" },
      { name: "Mei Lin", avatar: "👩‍💼", sport: "Tennis", points: 1820, events: 16, winRate: 75.0, achievements: 6, rating: 4.6, trend: "down" },
      { name: "James Lee", avatar: "👨‍💼", sport: "Swimming", points: 1680, events: 14, winRate: 85.7, achievements: 5, rating: 4.5, trend: "up" }
    ],
    teamStats: [
      { name: "Startup Strikers", sport: "Soccer", members: 22, totalEvents: 24, wins: 18, losses: 4, winRate: 75.0, totalPoints: 1250, averageRating: 4.8 },
      { name: "Tech Titans", sport: "Basketball", members: 15, totalEvents: 20, wins: 15, losses: 3, winRate: 83.3, totalPoints: 980, averageRating: 4.7 },
      { name: "Innovation United", sport: "Soccer", members: 20, totalEvents: 22, wins: 16, losses: 5, winRate: 72.7, totalPoints: 1120, averageRating: 4.6 },
      { name: "Startup Sprinters", sport: "Running", members: 12, totalEvents: 18, wins: 15, losses: 2, winRate: 88.9, totalPoints: 890, averageRating: 4.9 }
    ],
    locationPerformance: [
      { location: "Singapore Sports Hub", events: 68, averageRating: 4.7, totalParticipants: 1234, topSport: "Soccer" },
      { location: "Bishan Sports Hall", events: 42, averageRating: 4.5, totalParticipants: 756, topSport: "Basketball" },
      { location: "Marina Bay", events: 28, averageRating: 4.8, totalParticipants: 456, topSport: "Running" },
      { location: "East Coast Park", events: 18, averageRating: 4.4, totalParticipants: 234, topSport: "Cycling" }
    ],
    achievementDistribution: [
      { category: "Performance", count: 356, percentage: 40, icon: "🏆" },
      { category: "Participation", count: 267, percentage: 30, icon: "🎯" },
      { category: "Leadership", count: 178, percentage: 20, icon: "👑" },
      { category: "Sportsmanship", count: 89, percentage: 10, icon: "🤝" }
    ],
    recentActivity: [
      { type: "achievement", description: "Alex Wong won 'Player of the Month' in Soccer", timestamp: "2 hours ago", user: "Alex Wong", avatar: "👨‍💼", impact: "positive" },
      { type: "event", description: "New tournament 'Startup Cup 2024' created", timestamp: "4 hours ago", user: "Sarah Chen", avatar: "👩‍💼", impact: "positive" },
      { type: "team", description: "Tech Titans Basketball team reached 15 members", timestamp: "6 hours ago", user: "Mei Lin", avatar: "👩‍💼", impact: "positive" },
      { type: "performance", description: "David Kumar completed marathon in 3:45:22", timestamp: "1 day ago", user: "David Kumar", avatar: "👨‍💼", impact: "positive" }
    ]
  }

  const getWinRateColor = (rate: number) => {
    if (rate >= 80) return "text-green-600"
    if (rate >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-green-600"
    if (rating >= 4.0) return "text-yellow-600"
    return "text-red-600"
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="h-4 w-4 text-green-600" />
      case "down": return <TrendingDown className="h-4 w-4 text-red-600" />
      default: return <Minus className="h-4 w-4 text-gray-600" />
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "positive": return "text-green-600"
      case "negative": return "text-red-600"
      default: return "text-gray-600"
    }
  }

  const filteredTopPerformers = selectedSport === "all" 
    ? analyticsData.topPerformers 
    : analyticsData.topPerformers.filter(p => p.sport.toLowerCase() === selectedSport.toLowerCase())

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Sports Analytics</h2>
          <p className="text-gray-600 mt-2">Comprehensive insights into sports club performance and trends</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Detailed View
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Select value={timePeriod} onValueChange={setTimePeriod}>
          <SelectTrigger className="w-40">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Time Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1month">Last Month</SelectItem>
            <SelectItem value="3months">Last 3 Months</SelectItem>
            <SelectItem value="6months">Last 6 Months</SelectItem>
            <SelectItem value="1year">Last Year</SelectItem>
            <SelectItem value="all">All Time</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedSport} onValueChange={setSelectedSport}>
          <SelectTrigger className="w-40">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Sport" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sports</SelectItem>
            <SelectItem value="soccer">Soccer</SelectItem>
            <SelectItem value="basketball">Basketball</SelectItem>
            <SelectItem value="running">Running</SelectItem>
            <SelectItem value="tennis">Tennis</SelectItem>
            <SelectItem value="swimming">Swimming</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-2 border-blue-100 hover:border-blue-200 transition-all">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-blue-600 flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Total Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{analyticsData.overview.totalEvents}</div>
            <p className="text-sm text-gray-600 mt-1">Events organized this period</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-100 hover:border-green-200 transition-all">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-green-600 flex items-center gap-2">
              <Users className="h-5 w-5" />
              Total Participants
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{analyticsData.overview.totalParticipants.toLocaleString()}</div>
            <p className="text-sm text-gray-600 mt-1">Unique participants</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-100 hover:border-purple-200 transition-all">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-purple-600 flex items-center gap-2">
              <Target className="h-5 w-5" />
              Average Attendance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">{analyticsData.overview.averageAttendance}%</div>
            <p className="text-sm text-gray-600 mt-1">Event participation rate</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-orange-100 hover:border-orange-200 transition-all">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-orange-600 flex items-center gap-2">
              <Star className="h-5 w-5" />
              Total Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">{analyticsData.overview.totalPoints.toLocaleString()}</div>
            <p className="text-sm text-gray-600 mt-1">Points earned by members</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-red-100 hover:border-red-200 transition-all">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-red-600 flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Win Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{analyticsData.overview.winRate}%</div>
            <p className="text-sm text-gray-600 mt-1">Overall success rate</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-indigo-100 hover:border-indigo-200 transition-all">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-indigo-600 flex items-center gap-2">
              <Award className="h-5 w-5" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-indigo-600">{analyticsData.overview.totalAchievements}</div>
            <p className="text-sm text-gray-600 mt-1">Awards unlocked</p>
          </CardContent>
        </Card>
      </div>

      {/* Popular Sports & Participation Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-2 border-gray-100">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              Popular Sports
            </CardTitle>
            <CardDescription>Most participated sports this period</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {analyticsData.popularSports.map((sport, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">
                    {sport.sport === "Soccer" ? "⚽" : sport.sport === "Basketball" ? "🏀" : 
                     sport.sport === "Running" ? "🏃‍♂️" : sport.sport === "Tennis" ? "🎾" : "🏊‍♂️"}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{sport.sport}</div>
                    <div className="text-sm text-gray-600">{sport.participants} participants</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <div className="text-lg font-semibold text-gray-900">{sport.averageRating}</div>
                    {getTrendIcon(sport.trend)}
                  </div>
                  <div className="text-sm text-gray-600">{sport.events} events</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-2 border-gray-100">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Participation Trends
            </CardTitle>
            <CardDescription>Monthly participation patterns</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {analyticsData.participationTrends.map((trend, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="font-medium text-gray-900">{trend.month}</div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-sm font-medium text-blue-600">{trend.events}</div>
                    <div className="text-xs text-gray-600">Events</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-green-600">{trend.participants}</div>
                    <div className="text-xs text-gray-600">Participants</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-purple-600">{trend.averageRating}</div>
                    <div className="text-xs text-gray-600">Rating</div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Top Performers & Team Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-2 border-gray-100">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-600" />
              Top Performers
            </CardTitle>
            <CardDescription>Highest-rated participants this period</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {filteredTopPerformers.slice(0, 5).map((performer, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{performer.avatar}</div>
                  <div>
                    <div className="font-medium text-gray-900">{performer.name}</div>
                    <div className="text-sm text-gray-600">{performer.sport}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <div className="text-lg font-semibold text-gray-900">{performer.points.toLocaleString()}</div>
                    {getTrendIcon(performer.trend)}
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className={getWinRateColor(performer.winRate)}>{performer.winRate}%</span> win rate
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className={getRatingColor(performer.rating)}>{performer.rating}</span> rating
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-2 border-gray-100">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
              <Users2 className="h-5 w-5 text-blue-600" />
              Team Performance
            </CardTitle>
            <CardDescription>Top performing teams</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {analyticsData.teamStats.map((team, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">
                    {team.sport === "Soccer" ? "⚽" : team.sport === "Basketball" ? "🏀" : "🏃‍♂️"}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{team.name}</div>
                    <div className="text-sm text-gray-600">{team.sport} • {team.members} members</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-900">{team.totalPoints.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">
                    <span className={getWinRateColor(team.winRate)}>{team.winRate}%</span> win rate
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className={getRatingColor(team.averageRating)}>{team.averageRating}</span> rating
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Location Stats & Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-2 border-gray-100">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-green-600" />
              Location Performance
            </CardTitle>
            <CardDescription>Venue effectiveness and popularity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {analyticsData.locationPerformance.map((location, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{location.location}</div>
                  <div className="text-sm text-gray-600">Top: {location.topSport}</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-900">{location.events}</div>
                  <div className="text-sm text-gray-600">
                    <span className={getRatingColor(location.averageRating)}>{location.averageRating}</span> rating
                  </div>
                  <div className="text-sm text-gray-600">{location.totalParticipants} participants</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-2 border-gray-100">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
              <Award className="h-5 w-5 text-purple-600" />
              Achievement Distribution
            </CardTitle>
            <CardDescription>Types of achievements unlocked</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {analyticsData.achievementDistribution.map((achievement, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div>
                    <div className="font-medium text-gray-900">{achievement.category}</div>
                    <div className="text-sm text-gray-600">{achievement.count} achievements</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-900">{achievement.percentage}%</div>
                  <div className="text-sm text-gray-600">of total</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-2 border-gray-100">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
            <Activity className="h-5 w-5 text-indigo-600" />
            Recent Activity
          </CardTitle>
          <CardDescription>Latest updates and achievements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {analyticsData.recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl">{activity.avatar}</div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">{activity.description}</div>
                <div className="text-sm text-gray-600">
                  by {activity.user} • {activity.timestamp}
                </div>
              </div>
              <div className={`text-sm font-medium ${getImpactColor(activity.impact)}`}>
                {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-2 border-gray-100">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-600" />
            Quick Actions
          </CardTitle>
          <CardDescription>Common analytics tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <BarChart3 className="h-6 w-6" />
              <span className="text-sm">Generate Report</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Download className="h-6 w-6" />
              <span className="text-sm">Export Data</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <TrendingUp className="h-6 w-6" />
              <span className="text-sm">View Trends</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Target className="h-6 w-6" />
              <span className="text-sm">Set Goals</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
