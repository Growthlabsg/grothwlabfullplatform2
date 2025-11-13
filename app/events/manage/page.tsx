"use client"

import { useState, useEffect } from "react"
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye, Users, Calendar, TrendingUp, BarChart3, Settings } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"

interface Event {
  id: number
  title: string
  description: string
  date: string
  time: string
  location: string
  attendees: number
  maxAttendees: number
  category: string
  status: "draft" | "published" | "cancelled" | "completed"
  price: string
  registrations: number
  views: number
  revenue: number
  lumaEventId: string
}

export default function EventManagementPage() {
  const { toast } = useToast()
  const [events, setEvents] = useState<Event[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(true)

  // Sample events data
  const sampleEvents: Event[] = [
    {
      id: 1,
      title: "GrowthLab Demo Day: Cohort 4",
      description: "Join us for an exciting showcase of innovative startups from our latest accelerator cohort.",
      date: "April 28, 2025",
      time: "6:00 PM - 9:00 PM SGT",
      location: "BASH, 79 Ayer Rajah Crescent, Singapore",
      attendees: 250,
      maxAttendees: 300,
      category: "Demo Day",
      status: "published",
      price: "Free",
      registrations: 180,
      views: 1250,
      revenue: 0,
      lumaEventId: "evt-demo-day-cohort-4"
    },
    {
      id: 2,
      title: "Founder Networking Mixer",
      description: "Connect with fellow entrepreneurs and investors in a relaxed networking environment.",
      date: "May 5, 2025",
      time: "7:00 PM - 9:00 PM",
      location: "GrowthLab HQ, Singapore",
      attendees: 100,
      maxAttendees: 120,
      category: "Networking",
      status: "published",
      price: "Free",
      registrations: 85,
      views: 680,
      revenue: 0,
      lumaEventId: "evt-founder-networking-mixer"
    },
    {
      id: 3,
      title: "AI for Startups Workshop",
      description: "Learn how to integrate AI into your startup and gain a competitive advantage.",
      date: "May 12, 2025",
      time: "2:00 PM - 5:00 PM",
      location: "Online",
      attendees: 50,
      maxAttendees: 50,
      category: "Workshop",
      status: "published",
      price: "SGD 50",
      registrations: 42,
      views: 890,
      revenue: 2100,
      lumaEventId: "evt-ai-workshop-startups"
    },
    {
      id: 4,
      title: "Pitch Night: FinTech Edition",
      description: "Watch innovative fintech startups pitch their ideas to a panel of investors.",
      date: "May 19, 2025",
      time: "6:30 PM - 9:30 PM",
      location: "Marina Bay Sands, Singapore",
      attendees: 200,
      maxAttendees: 250,
      category: "Pitch Night",
      status: "draft",
      price: "Free",
      registrations: 0,
      views: 45,
      revenue: 0,
      lumaEventId: "evt-pitch-night-fintech"
    },
    {
      id: 5,
      title: "Fundraising Masterclass",
      description: "Learn the ins and outs of startup fundraising from successful entrepreneurs and VCs.",
      date: "May 26, 2025",
      time: "10:00 AM - 12:00 PM",
      location: "GrowthLab HQ, Singapore",
      attendees: 30,
      maxAttendees: 30,
      category: "Workshop",
      status: "published",
      price: "SGD 100",
      registrations: 28,
      views: 420,
      revenue: 2800,
      lumaEventId: "evt-fundraising-masterclass"
    }
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setEvents(sampleEvents)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === "all" || event.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const handleCreateEvent = () => {
    toast({
      title: "Create Event",
      description: "Redirecting to event creation form...",
    })
    window.location.href = "/events/create"
  }

  const handleEditEvent = (eventId: number) => {
    toast({
      title: "Edit Event",
      description: "Redirecting to event editor...",
    })
    window.location.href = `/events/edit/${eventId}`
  }

  const handleDeleteEvent = (eventId: number) => {
    toast({
      title: "Delete Event",
      description: "Event deleted successfully",
    })
    setEvents(events.filter(event => event.id !== eventId))
  }

  const handleViewEvent = (eventId: number) => {
    window.location.href = `/events/${eventId}`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published": return "bg-green-100 text-green-800"
      case "draft": return "bg-yellow-100 text-yellow-800"
      case "cancelled": return "bg-red-100 text-red-800"
      case "completed": return "bg-blue-100 text-blue-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getTotalStats = () => {
    return {
      totalEvents: events.length,
      publishedEvents: events.filter(e => e.status === "published").length,
      totalRegistrations: events.reduce((sum, e) => sum + e.registrations, 0),
      totalRevenue: events.reduce((sum, e) => sum + e.revenue, 0),
      totalViews: events.reduce((sum, e) => sum + e.views, 0)
    }
  }

  const stats = getTotalStats()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="grid gap-4 md:grid-cols-4">
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Event Management</h1>
            <p className="text-gray-600">Manage your events and track performance</p>
          </div>
          <Button
            onClick={handleCreateEvent}
            className="bg-[#0F7377] hover:bg-[#0F7377]/90 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Event
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Events</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalEvents}</p>
                </div>
                <Calendar className="h-8 w-8 text-[#0F7377]" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Published</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.publishedEvents}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Registrations</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalRegistrations}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">SGD {stats.totalRevenue.toLocaleString()}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="events">All Events</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Recent Events */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Events</CardTitle>
                  <CardDescription>Your latest events and their performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {events.slice(0, 3).map((event) => (
                      <div key={event.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm mb-1">{event.title}</h4>
                          <p className="text-xs text-gray-600">{event.date}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(event.status)}>
                            {event.status}
                          </Badge>
                          <span className="text-xs text-gray-600">{event.registrations} registrations</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common event management tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button
                      onClick={handleCreateEvent}
                      className="w-full justify-start"
                      variant="outline"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Event
                    </Button>
                    <Button
                      onClick={() => setActiveTab("analytics")}
                      className="w-full justify-start"
                      variant="outline"
                    >
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Analytics
                    </Button>
                    <Button
                      onClick={() => setActiveTab("settings")}
                      className="w-full justify-start"
                      variant="outline"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Event Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium bg-white shadow-sm focus:ring-2 focus:ring-[#0F7377] focus:border-[#0F7377]"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* Events List */}
            <div className="space-y-4">
              {filteredEvents.map((event) => (
                <Card key={event.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                          <Badge className={getStatusColor(event.status)}>
                            {event.status}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-3">{event.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {event.date} • {event.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {event.registrations}/{event.maxAttendees} registered
                          </span>
                          <span className="flex items-center gap-1">
                            <BarChart3 className="h-4 w-4" />
                            {event.views} views
                          </span>
                          <span className="font-medium text-[#0F7377]">
                            {event.price}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewEvent(event.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditEvent(event.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => handleViewEvent(event.id)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Event
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditEvent(event.id)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Event
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDeleteEvent(event.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Event
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Event Performance</CardTitle>
                  <CardDescription>Overview of your events' performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Total Views</span>
                      <span className="text-2xl font-bold text-[#0F7377]">{stats.totalViews}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Total Registrations</span>
                      <span className="text-2xl font-bold text-blue-500">{stats.totalRegistrations}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Conversion Rate</span>
                      <span className="text-2xl font-bold text-green-500">
                        {stats.totalViews > 0 ? ((stats.totalRegistrations / stats.totalViews) * 100).toFixed(1) : 0}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                  <CardDescription>Financial performance of your events</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Total Revenue</span>
                      <span className="text-2xl font-bold text-green-500">SGD {stats.totalRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Average per Event</span>
                      <span className="text-2xl font-bold text-purple-500">
                        SGD {stats.totalEvents > 0 ? (stats.totalRevenue / stats.totalEvents).toFixed(0) : 0}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Settings</CardTitle>
                <CardDescription>Configure your event management preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Default Event Settings</label>
                    <p className="text-sm text-gray-600 mt-1">Configure default settings for new events</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Notification Preferences</label>
                    <p className="text-sm text-gray-600 mt-1">Manage how you receive event notifications</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Integration Settings</label>
                    <p className="text-sm text-gray-600 mt-1">Configure integrations with external platforms</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
