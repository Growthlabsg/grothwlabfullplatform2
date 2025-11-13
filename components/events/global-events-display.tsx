"use client"

import { useState, useEffect } from "react"
import { Calendar, Plus, Search, Filter, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { LumaIntegration } from "./luma-integration"
import { useToast } from "@/components/ui/use-toast"

interface Event {
  id: number
  title: string
  description: string
  date: string
  time: string
  location: string
  attendees: string
  category: string
  featured: boolean
  image: string
  price: string
  status: string
  lumaEventId: string
}

interface GlobalEventsDisplayProps {
  title?: string
  description?: string
  showCreateButton?: boolean
  maxEvents?: number
  category?: string
  featuredOnly?: boolean
  variant?: 'grid' | 'list' | 'compact'
  className?: string
}

export function GlobalEventsDisplay({
  title = "Upcoming Events",
  description = "Discover and register for upcoming events",
  showCreateButton = true,
  maxEvents = 6,
  category,
  featuredOnly = false,
  variant = 'grid',
  className = ""
}: GlobalEventsDisplayProps) {
  const { toast } = useToast()
  const [events, setEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(category || "all")
  const [isLoading, setIsLoading] = useState(true)

  // Load events from localStorage or use default events
  useEffect(() => {
    const loadEvents = () => {
      const savedEvents = localStorage.getItem('platformEvents')
      if (savedEvents) {
        const parsedEvents = JSON.parse(savedEvents)
        setEvents(parsedEvents)
        setIsLoading(false)
      } else {
        // Default events with Luma integration
        const defaultEvents: Event[] = [
          {
            id: 1,
            title: "GrowthLab Demo Day: Cohort 4",
            description: "Join us for an exciting showcase of innovative startups from our latest accelerator cohort.",
            date: "April 28, 2025",
            time: "6:00 PM - 9:00 PM SGT",
            location: "BASH, 79 Ayer Rajah Crescent, Singapore",
            attendees: "250+ Attendees Expected",
            category: "Demo Day",
            featured: true,
            image: "/startup-demo-day.png",
            price: "Free",
            status: "Open for RSVP",
            lumaEventId: "evt-demo-day-cohort-4"
          },
          {
            id: 2,
            title: "Founder Networking Mixer",
            description: "Connect with fellow entrepreneurs and investors in a relaxed networking environment.",
            date: "May 5, 2025",
            time: "7:00 PM - 9:00 PM",
            location: "GrowthLab HQ, Singapore",
            attendees: "100+ Attendees Expected",
            category: "Networking",
            featured: false,
            image: "/networking-event.png",
            price: "Free",
            status: "Open for RSVP",
            lumaEventId: "evt-founder-networking-mixer"
          },
          {
            id: 3,
            title: "AI for Startups Workshop",
            description: "Learn how to integrate AI into your startup and gain a competitive advantage.",
            date: "May 12, 2025",
            time: "2:00 PM - 5:00 PM",
            location: "Online",
            attendees: "50+ Attendees Expected",
            category: "Workshop",
            featured: false,
            image: "/ai-workshop.png",
            price: "SGD 50",
            status: "Open for Registration",
            lumaEventId: "evt-ai-workshop-startups"
          },
          {
            id: 4,
            title: "Pitch Night: FinTech Edition",
            description: "Watch innovative fintech startups pitch their ideas to a panel of investors.",
            date: "May 19, 2025",
            time: "6:30 PM - 9:30 PM",
            location: "Marina Bay Sands, Singapore",
            attendees: "200+ Attendees Expected",
            category: "Pitch Night",
            featured: true,
            image: "/pitch-night.png",
            price: "Free",
            status: "Open for RSVP",
            lumaEventId: "evt-pitch-night-fintech"
          },
          {
            id: 5,
            title: "Fundraising Masterclass",
            description: "Learn the ins and outs of startup fundraising from successful entrepreneurs and VCs.",
            date: "May 26, 2025",
            time: "10:00 AM - 12:00 PM",
            location: "GrowthLab HQ, Singapore",
            attendees: "30+ Attendees Expected",
            category: "Workshop",
            featured: false,
            image: "/fundraising-masterclass.png",
            price: "SGD 100",
            status: "Open for Registration",
            lumaEventId: "evt-fundraising-masterclass"
          },
          {
            id: 6,
            title: "Startup Hackathon 2025",
            description: "48-hour hackathon to build innovative solutions for real-world problems.",
            date: "June 1-2, 2025",
            time: "9:00 AM - 9:00 PM",
            location: "Singapore University of Technology and Design",
            attendees: "500+ Attendees Expected",
            category: "Hackathon",
            featured: true,
            image: "/hackathon.png",
            price: "Free",
            status: "Open for Registration",
            lumaEventId: "evt-startup-hackathon-2025"
          }
        ]
        setEvents(defaultEvents)
        localStorage.setItem('platformEvents', JSON.stringify(defaultEvents))
        setIsLoading(false)
      }
    }

    loadEvents()
  }, [])

  // Filter events based on search, category, and featured status
  useEffect(() => {
    let filtered = events

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(event =>
        event.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    }

    // Filter by featured status
    if (featuredOnly) {
      filtered = filtered.filter(event => event.featured)
    }

    // Limit number of events
    filtered = filtered.slice(0, maxEvents)

    setFilteredEvents(filtered)
  }, [events, searchQuery, selectedCategory, featuredOnly, maxEvents])

  const categories = ["all", "Demo Day", "Networking", "Workshop", "Pitch Night", "Hackathon", "Fireside Chat"]

  const handleCreateEvent = () => {
    toast({
      title: "Create Event",
      description: "Redirecting to event creation form...",
    })
    window.location.href = "/events/create"
  }

  const handleViewAllEvents = () => {
    window.location.href = "/events"
  }

  if (isLoading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <p className="text-gray-600">{description}</p>
          </div>
          {showCreateButton && (
            <Button disabled className="bg-[#0F7377] hover:bg-[#0F7377]/90 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          )}
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="h-48 bg-gray-200 animate-pulse"></div>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <p className="text-gray-600">{description}</p>
        </div>
        {showCreateButton && (
          <Button
            onClick={handleCreateEvent}
            className="bg-[#0F7377] hover:bg-[#0F7377]/90 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Event
          </Button>
        )}
      </div>

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
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium bg-white shadow-sm focus:ring-2 focus:ring-[#0F7377] focus:border-[#0F7377]"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat === "all" ? "All Categories" : cat}
            </option>
          ))}
        </select>
      </div>

      {/* Events Display */}
      {filteredEvents.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Events Found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery ? "No events match your search criteria." : "No events available at the moment."}
            </p>
            {showCreateButton && (
              <Button
                onClick={handleCreateEvent}
                className="bg-[#0F7377] hover:bg-[#0F7377]/90 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create First Event
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <>
          {variant === 'grid' && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((event) => (
                <LumaIntegration
                  key={event.id}
                  event={{
                    id: event.lumaEventId,
                    title: event.title,
                    description: event.description,
                    date: event.date,
                    time: event.time,
                    location: event.location,
                    price: event.price,
                    status: event.status,
                    attendees: event.attendees,
                    category: event.category,
                    featured: event.featured
                  }}
                  variant="card"
                  showDetails={true}
                />
              ))}
            </div>
          )}

          {variant === 'list' && (
            <div className="space-y-4">
              {filteredEvents.map((event) => (
                <LumaIntegration
                  key={event.id}
                  event={{
                    id: event.lumaEventId,
                    title: event.title,
                    description: event.description,
                    date: event.date,
                    time: event.time,
                    location: event.location,
                    price: event.price,
                    status: event.status,
                    attendees: event.attendees,
                    category: event.category,
                    featured: event.featured
                  }}
                  variant="default"
                  showDetails={true}
                />
              ))}
            </div>
          )}

          {variant === 'compact' && (
            <div className="space-y-3">
              {filteredEvents.map((event) => (
                <LumaIntegration
                  key={event.id}
                  event={{
                    id: event.lumaEventId,
                    title: event.title,
                    description: event.description,
                    date: event.date,
                    time: event.time,
                    location: event.location,
                    price: event.price,
                    status: event.status,
                    attendees: event.attendees,
                    category: event.category,
                    featured: event.featured
                  }}
                  variant="compact"
                  showDetails={false}
                />
              ))}
            </div>
          )}

          {/* View All Events Button */}
          {filteredEvents.length >= maxEvents && (
            <div className="text-center">
              <Button
                variant="outline"
                onClick={handleViewAllEvents}
                className="px-8 py-3"
              >
                View All Events
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
