"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { ArrowLeft, Search, Filter, Calendar, Clock, MapPin, Users, Star, Heart, Share2, Eye } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { LumaIntegration } from "@/components/events/luma-integration"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"

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
  tags: string[]
}

export default function EventCategoryPage() {
  const params = useParams()
  const { toast } = useToast()
  const [events, setEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [savedEvents, setSavedEvents] = useState<number[]>([])

  const category = params.category as string
  const categoryName = category.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())

  // Sample events data
  const sampleEvents: Event[] = [
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
      lumaEventId: "evt-demo-day-cohort-4",
      tags: ["Startups", "Pitching", "Networking"]
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
      lumaEventId: "evt-founder-networking-mixer",
      tags: ["Networking", "Entrepreneurs", "Investors"]
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
      lumaEventId: "evt-ai-workshop-startups",
      tags: ["AI", "Technology", "Learning"]
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
      lumaEventId: "evt-pitch-night-fintech",
      tags: ["FinTech", "Pitching", "Investment"]
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
      lumaEventId: "evt-fundraising-masterclass",
      tags: ["Fundraising", "Investment", "Business"]
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
      lumaEventId: "evt-startup-hackathon-2025",
      tags: ["Hackathon", "Innovation", "Technology"]
    }
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      // Filter events by category
      const categoryEvents = sampleEvents.filter(event => 
        event.category.toLowerCase().replace(" ", "-") === category
      )
      setEvents(categoryEvents)
      setFilteredEvents(categoryEvents)
      setIsLoading(false)
    }, 1000)

    // Load saved events
    const saved = localStorage.getItem('savedEvents')
    if (saved) {
      setSavedEvents(JSON.parse(saved))
    }

    return () => clearTimeout(timer)
  }, [category])

  // Filter events based on search
  useEffect(() => {
    if (searchQuery) {
      const filtered = events.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
      setFilteredEvents(filtered)
    } else {
      setFilteredEvents(events)
    }
  }, [searchQuery, events])

  const handleSaveEvent = (eventId: number) => {
    const newSaved = savedEvents.includes(eventId)
      ? savedEvents.filter(id => id !== eventId)
      : [...savedEvents, eventId]
    
    setSavedEvents(newSaved)
    localStorage.setItem('savedEvents', JSON.stringify(newSaved))
    
    toast({
      title: savedEvents.includes(eventId) ? "Removed from Saved" : "Added to Saved",
      description: savedEvents.includes(eventId) 
        ? "Event removed from your saved list" 
        : "Event added to your saved list",
    })
  }

  const handleShareEvent = (event: Event) => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link Copied",
        description: "Event link copied to clipboard",
      })
    }
  }

  const handleViewDetails = (eventId: number) => {
    window.location.href = `/events/${eventId}`
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.history.back()}
            className="p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-gray-900 truncate flex-1">
            {categoryName} Events
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Desktop Header */}
        <div className="hidden lg:flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Events
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{categoryName} Events</h1>
              <p className="text-gray-600">{filteredEvents.length} events found in this category</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder={`Search ${categoryName.toLowerCase()} events...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Events */}
        {filteredEvents.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Events Found</h3>
              <p className="text-gray-600 mb-4">
                {searchQuery 
                  ? `No ${categoryName.toLowerCase()} events match your search criteria.`
                  : `No ${categoryName.toLowerCase()} events available at the moment.`
                }
              </p>
              <div className="flex gap-3 justify-center">
                <Button
                  onClick={() => setSearchQuery("")}
                  variant="outline"
                >
                  Clear Search
                </Button>
                <Button
                  onClick={() => window.location.href = "/events"}
                  className="bg-[#0F7377] hover:bg-[#0F7377]/90 text-white"
                >
                  View All Events
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
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
                  attendees: parseInt(event.attendees.replace(/[^\d]/g, '')) || 0,
                  category: event.category,
                  featured: event.featured
                }}
                variant="card"
                showDetails={true}
              />
            ))}
          </div>
        )}

        {/* Related Categories */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore Other Categories</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {["Demo Day", "Networking", "Workshop", "Pitch Night", "Hackathon", "Fireside Chat"]
              .filter(cat => cat !== categoryName)
              .map((cat) => (
                <Link
                  key={cat}
                  href={`/events/category/${cat.toLowerCase().replace(" ", "-")}`}
                  className="block"
                >
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-gray-900 mb-2">{cat}</h3>
                      <p className="text-sm text-gray-600">
                        Discover {cat.toLowerCase()} events in the community
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
