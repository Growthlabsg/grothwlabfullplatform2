"use client"

import { useState, useEffect } from "react"
import { Calendar, Users, TrendingUp, AlertTriangle, QrCode, Share2, Heart, Clock, MapPin, Star, BarChart3, Activity } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QRCheckIn } from "@/components/events/qr-checkin"
import { VirtualNameCard } from "@/components/events/virtual-name-card"
import { DemeritSystem } from "@/components/events/demerit-system"
import { useAttendance, AttendanceProvider } from "@/contexts/AttendanceContext"
import { useToast } from "@/components/ui/use-toast"

interface EventStats {
  totalEventsHosted: number
  totalEventsAttended: number
  totalConnections: number
  totalDemeritPoints: number
  upcomingEvents: number
  recentConnections: number
}

interface RecentEvent {
  id: number
  title: string
  date: string
  type: 'hosted' | 'attended'
  status: 'upcoming' | 'completed' | 'cancelled'
  attendees?: number
  connections?: number
}

function EventsDashboardPageContent() {
  const { toast } = useToast()
  const { 
    userDemeritPoints, 
    isRestricted, 
    getMyNameCards, 
    getReceivedNameCards,
    attendanceRecords 
  } = useAttendance()
  
  const [activeTab, setActiveTab] = useState("overview")
  const [stats, setStats] = useState<EventStats>({
    totalEventsHosted: 0,
    totalEventsAttended: 0,
    totalConnections: 0,
    totalDemeritPoints: userDemeritPoints,
    upcomingEvents: 0,
    recentConnections: 0
  })
  const [recentEvents, setRecentEvents] = useState<RecentEvent[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Sample data
  const sampleEvents: RecentEvent[] = [
    {
      id: 1,
      title: "GrowthLab Demo Day: Cohort 4",
      date: "2025-04-28",
      type: 'attended',
      status: 'upcoming',
      attendees: 250,
      connections: 5
    },
    {
      id: 2,
      title: "Founder Networking Mixer",
      date: "2025-05-05",
      type: 'hosted',
      status: 'upcoming',
      attendees: 100,
      connections: 12
    },
    {
      id: 3,
      title: "AI for Startups Workshop",
      date: "2025-05-12",
      type: 'attended',
      status: 'completed',
      attendees: 50,
      connections: 3
    },
    {
      id: 4,
      title: "Pitch Night: FinTech Edition",
      date: "2025-05-19",
      type: 'attended',
      status: 'completed',
      attendees: 200,
      connections: 8
    }
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      // Calculate stats
      const myCards = getMyNameCards()
      const receivedCards = getReceivedNameCards()
      const totalConnections = myCards.filter(c => c.connectionStatus === 'accepted').length + 
                              receivedCards.filter(c => c.connectionStatus === 'accepted').length
      
      const hostedEvents = sampleEvents.filter(e => e.type === 'hosted')
      const attendedEvents = sampleEvents.filter(e => e.type === 'attended')
      const upcomingEvents = sampleEvents.filter(e => e.status === 'upcoming').length
      
      setStats({
        totalEventsHosted: hostedEvents.length,
        totalEventsAttended: attendedEvents.length,
        totalConnections,
        totalDemeritPoints: userDemeritPoints,
        upcomingEvents,
        recentConnections: totalConnections
      })
      
      setRecentEvents(sampleEvents)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [userDemeritPoints, getMyNameCards, getReceivedNameCards])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'hosted':
        return 'bg-purple-100 text-purple-800'
      case 'attended':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Events Dashboard</h1>
          <p className="text-gray-600">Manage your events, connections, and attendance</p>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Events Hosted</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalEventsHosted}</p>
                </div>
                <Calendar className="h-8 w-8 text-[#0F7377]" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Events Attended</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalEventsAttended}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Connections Made</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalConnections}</p>
                </div>
                <Heart className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Demerit Points</p>
                  <p className={`text-2xl font-bold ${
                    stats.totalDemeritPoints >= 10 ? 'text-red-600' : 
                    stats.totalDemeritPoints >= 7 ? 'text-yellow-600' : 
                    'text-green-600'
                  }`}>
                    {stats.totalDemeritPoints}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Restriction Alert */}
        {isRestricted && (
          <Card className="mb-8 border-red-200 bg-red-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-red-600" />
                <div>
                  <h3 className="font-semibold text-red-800">Account Restricted</h3>
                  <p className="text-red-700">
                    You cannot attend events due to demerit points. Submit an appeal to restore your account.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="events">My Events</TabsTrigger>
            <TabsTrigger value="checkin">Check-in</TabsTrigger>
            <TabsTrigger value="networking">Networking</TabsTrigger>
            <TabsTrigger value="demerits">Demerits</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Recent Events */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-[#0F7377]" />
                    Recent Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentEvents.slice(0, 5).map((event) => (
                      <div
                        key={event.id}
                        className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{event.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={getTypeColor(event.type)}>
                              {event.type === 'hosted' ? 'Hosted' : 'Attended'}
                            </Badge>
                            <Badge className={getStatusColor(event.status)}>
                              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                            </Badge>
                            <span className="text-sm text-gray-600">{formatDate(event.date)}</span>
                          </div>
                          {event.attendees && (
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                {event.attendees} attendees
                              </span>
                              {event.connections && (
                                <span className="flex items-center gap-1">
                                  <Heart className="h-4 w-4" />
                                  {event.connections} connections
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-[#0F7377]" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button
                      onClick={() => window.location.href = "/events/create"}
                      className="w-full justify-start"
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Create New Event
                    </Button>
                    <Button
                      onClick={() => window.location.href = "/events/search"}
                      variant="outline"
                      className="w-full justify-start"
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Find Events
                    </Button>
                    <Button
                      onClick={() => setActiveTab("networking")}
                      variant="outline"
                      className="w-full justify-start"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      View Connections
                    </Button>
                    <Button
                      onClick={() => setActiveTab("demerits")}
                      variant="outline"
                      className="w-full justify-start"
                    >
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Check Demerits
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* My Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Hosted Events */}
              <Card>
                <CardHeader>
                  <CardTitle>Events I'm Hosting</CardTitle>
                  <CardDescription>Events you've created and are managing</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentEvents.filter(e => e.type === 'hosted').map((event) => (
                      <div
                        key={event.id}
                        className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{event.title}</h4>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className={getStatusColor(event.status)}>
                                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                              </Badge>
                              <span className="text-sm text-gray-600">{formatDate(event.date)}</span>
                            </div>
                            {event.attendees && (
                              <div className="mt-2 text-sm text-gray-600">
                                {event.attendees} registered attendees
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              Manage
                            </Button>
                            <Button size="sm">
                              View
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Attended Events */}
              <Card>
                <CardHeader>
                  <CardTitle>Events I'm Attending</CardTitle>
                  <CardDescription>Events you've registered for</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentEvents.filter(e => e.type === 'attended').map((event) => (
                      <div
                        key={event.id}
                        className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{event.title}</h4>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className={getStatusColor(event.status)}>
                                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                              </Badge>
                              <span className="text-sm text-gray-600">{formatDate(event.date)}</span>
                            </div>
                            {event.connections && (
                              <div className="mt-2 text-sm text-gray-600">
                                {event.connections} connections made
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              Details
                            </Button>
                            {event.status === 'upcoming' && (
                              <Button size="sm">
                                Check-in
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Check-in Tab */}
          <TabsContent value="checkin" className="space-y-6">
            <QRCheckIn
              eventId={1}
              eventTitle="GrowthLab Demo Day: Cohort 4"
              eventDate="April 28, 2025"
              eventTime="6:00 PM - 9:00 PM SGT"
              eventLocation="BASH, 79 Ayer Rajah Crescent, Singapore"
              isHost={true}
            />
          </TabsContent>

          {/* Networking Tab */}
          <TabsContent value="networking" className="space-y-6">
            <VirtualNameCard
              eventId={1}
              eventTitle="GrowthLab Demo Day: Cohort 4"
              eventDate="April 28, 2025"
              eventLocation="BASH, 79 Ayer Rajah Crescent, Singapore"
            />
          </TabsContent>

          {/* Demerits Tab */}
          <TabsContent value="demerits" className="space-y-6">
            <DemeritSystem showAppealForm={true} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default function EventsDashboardPage() {
  return (
    <AttendanceProvider>
      <EventsDashboardPageContent />
    </AttendanceProvider>
  )
}
