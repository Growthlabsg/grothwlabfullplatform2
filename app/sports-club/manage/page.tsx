"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  Edit,
  Trash2,
  Eye,
  Plus,
  Search,
  Filter,
  MoreHorizontal
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { useSharedEvents } from "@/contexts/SharedEventsContext"

export default function ManageSportsEventsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { getSportsEvents, updateEvent, deleteEvent } = useSharedEvents()
  
  const [events, setEvents] = useState(getSportsEvents())
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  useEffect(() => {
    setEvents(getSportsEvents())
  }, [getSportsEvents])

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = filterStatus === "all" || event.status === filterStatus
    
    return matchesSearch && matchesStatus
  })

  const handleDeleteEvent = (eventId: string) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      deleteEvent(eventId)
      setEvents(getSportsEvents())
      toast({
        title: "Event Deleted",
        description: "The event has been successfully deleted.",
      })
    }
  }

  const handleToggleStatus = (eventId: string, currentStatus: string) => {
    const newStatus = currentStatus === "Open for Registration" ? "Closed" : "Open for Registration"
    updateEvent(eventId, { status: newStatus })
    setEvents(getSportsEvents())
    toast({
      title: "Event Status Updated",
      description: `Event is now ${newStatus.toLowerCase()}.`,
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/sports-club">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Sports Club
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Manage Sports Events</h1>
                <p className="text-gray-600">Manage your created sports events</p>
              </div>
            </div>
            <Button asChild className="bg-[#0F7377] hover:bg-[#0F7377]/90">
              <Link href="/sports-club/create-event">
                <Plus className="h-4 w-4 mr-2" />
                Create New Event
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
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
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium bg-white shadow-sm focus:ring-2 focus:ring-[#0F7377] focus:border-[#0F7377]"
            >
              <option value="all">All Status</option>
              <option value="Open for Registration">Open</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Events List */}
        {filteredEvents.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Events Found</h3>
              <p className="text-gray-500 mb-4">
                {searchQuery || filterStatus !== "all" 
                  ? "No events match your search criteria." 
                  : "You haven't created any sports events yet."
                }
              </p>
              <Button asChild>
                <Link href="/sports-club/create-event">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Event
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <img
                    src={event.image || `/sports-${event.sport}.png`}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge 
                    className={`absolute top-2 right-2 ${
                      event.status === "Open for Registration" 
                        ? "bg-green-500" 
                        : "bg-red-500"
                    }`}
                  >
                    {event.status}
                  </Badge>
                </div>
                
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {event.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="truncate">{event.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{event.registered || 0} / {event.capacity} participants</span>
                  </div>
                </CardContent>
                
                <div className="px-6 pb-6">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleToggleStatus(event.id, event.status || "Open for Registration")}
                    >
                      {event.status === "Open for Registration" ? "Close" : "Open"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/sports-club/edit-event/${event.id}`)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteEvent(event.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-[#0F7377]" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Events</p>
                  <p className="text-2xl font-bold text-gray-900">{events.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Open Events</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {events.filter(e => e.status === "Open for Registration").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Participants</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {events.reduce((sum, event) => sum + (event.registered || 0), 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
