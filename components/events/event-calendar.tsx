"use client"

import { useState, useEffect } from "react"
import { Calendar, Plus, Users, Clock, MapPin, Star, Heart, Share2, Eye, ExternalLink } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"

export function EventCalendar() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [showCreateEvent, setShowCreateEvent] = useState(false)
  const [savedEvents, setSavedEvents] = useState<number[]>([])

  // Sample events data with Luma integration
  const events = [
    {
      id: 1,
      title: "GrowthLab Demo Day: Cohort 4",
      description: "Join us for an exciting showcase of innovative startups from our latest accelerator cohort.",
      date: "2025-04-28",
      time: "6:00 PM - 9:00 PM SGT",
      location: "BASH, 79 Ayer Rajah Crescent, Singapore",
      attendees: 250,
      category: "Demo Day",
      featured: true,
      price: "Free",
      status: "Open for RSVP",
      lumaEventId: "evt-demo-day-cohort-4",
      image: "/startup-demo-day.png"
    },
    {
      id: 2,
      title: "Founder Networking Mixer",
      description: "Connect with fellow entrepreneurs and investors in a relaxed networking environment.",
      date: "2025-05-05",
      time: "7:00 PM - 9:00 PM",
      location: "GrowthLab HQ, Singapore",
      attendees: 100,
      category: "Networking",
      featured: false,
      price: "Free",
      status: "Open for RSVP",
      lumaEventId: "evt-founder-networking-mixer",
      image: "/networking-event.png"
    },
    {
      id: 3,
      title: "AI for Startups Workshop",
      description: "Learn how to integrate AI into your startup and gain a competitive advantage.",
      date: "2025-05-12",
      time: "2:00 PM - 5:00 PM",
      location: "Online",
      attendees: 50,
      category: "Workshop",
      featured: false,
      price: "SGD 50",
      status: "Open for Registration",
      lumaEventId: "evt-ai-workshop-startups",
      image: "/ai-workshop.png"
    },
    {
      id: 4,
      title: "Pitch Night: FinTech Edition",
      description: "Watch innovative fintech startups pitch their ideas to a panel of investors.",
      date: "2025-05-19",
      time: "6:30 PM - 9:30 PM",
      location: "Marina Bay Sands, Singapore",
      attendees: 200,
      category: "Pitch Night",
      featured: true,
      price: "Free",
      status: "Open for RSVP",
      lumaEventId: "evt-pitch-night-fintech",
      image: "/pitch-night.png"
    },
    {
      id: 5,
      title: "Fundraising Masterclass",
      description: "Learn the ins and outs of startup fundraising from successful entrepreneurs and VCs.",
      date: "2025-05-26",
      time: "10:00 AM - 12:00 PM",
      location: "GrowthLab HQ, Singapore",
      attendees: 30,
      category: "Workshop",
      featured: false,
      price: "SGD 100",
      status: "Open for Registration",
      lumaEventId: "evt-fundraising-masterclass",
      image: "/fundraising-masterclass.png"
    },
    {
      id: 6,
      title: "Startup Hackathon 2025",
      description: "48-hour hackathon to build innovative solutions for real-world problems.",
      date: "2025-06-01",
      time: "9:00 AM - 9:00 PM",
      location: "Singapore University of Technology and Design",
      attendees: 500,
      category: "Hackathon",
      featured: true,
      price: "Free",
      status: "Open for Registration",
      lumaEventId: "evt-startup-hackathon-2025",
      image: "/hackathon.png"
    }
  ]

  useEffect(() => {
    // Simulate loading time for the calendar
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Load saved events
  useEffect(() => {
    const saved = localStorage.getItem('savedEvents')
    if (saved) {
      setSavedEvents(JSON.parse(saved))
    }
  }, [])

  const handleIframeError = () => {
    setHasError(true)
    setIsLoading(false)
  }

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

  const handleShareEvent = (event: any) => {
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

  const handleCreateEvent = () => {
    setShowCreateEvent(true)
    toast({
      title: "Create Event",
      description: "Redirecting to event creation form...",
    })
    // Redirect to create event page
    window.location.href = "/events/create"
  }

  const getEventsForDate = (date: string) => {
    return events.filter(event => event.date === date)
  }

  const getUpcomingEvents = () => {
    const today = new Date().toISOString().split('T')[0]
    return events.filter(event => event.date >= today).slice(0, 3)
  }

  const renderLumaButton = (event: any) => {
    return (
      <button
        className="luma-checkout--button bg-[#0F7377] hover:bg-[#0F7377]/90 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
        type="button"
        data-luma-action="checkout"
        data-luma-event-id={event.lumaEventId}
        onClick={() => {
          toast({
            title: "Redirecting to Registration",
            description: `Opening registration for ${event.title}`,
          })
        }}
      >
        <Calendar className="h-4 w-4" />
        Register for Event
      </button>
    )
  }

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Event Calendar</h2>
          <p className="text-gray-600">Discover and register for upcoming events</p>
        </div>
        <Button
          onClick={handleCreateEvent}
          className="bg-[#0F7377] hover:bg-[#0F7377]/90 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Event
        </Button>
      </div>

      {/* Luma Calendar Integration */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-[#0F7377]" />
            Live Event Calendar
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading && (
            <div className="flex h-[450px] items-center justify-center bg-slate-50 p-4">
              <div className="space-y-4 text-center">
                <Skeleton className="mx-auto h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="mx-auto h-4 w-40" />
                  <Skeleton className="mx-auto h-4 w-60" />
                </div>
              </div>
            </div>
          )}

          {!isLoading && hasError && (
            <div className="flex h-[450px] flex-col items-center justify-center bg-slate-50 p-8 text-center">
              <Calendar className="mb-4 h-12 w-12 text-[#0F7377]" />
              <h3 className="mb-2 text-xl font-bold text-[#1E293B]">Calendar Temporarily Unavailable</h3>
              <p className="mb-4 text-[#334155]">
                We're experiencing issues loading our event calendar. Please check back soon or view our upcoming events
                below.
              </p>
              <a
                href="https://lu.ma/growthlab"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-[#0F7377] px-4 py-2 text-white hover:bg-[#0F7377]/90"
              >
                View on Lu.ma
              </a>
            </div>
          )}

          <iframe
            src="https://lu.ma/embed/calendar/cal-KNN5iOtlTsVqaaf/events"
            width="100%"
            height="450"
            frameBorder="0"
            style={{
              border: "1px solid #bfcbda88",
              borderRadius: "4px",
              display: isLoading || hasError ? "none" : "block",
            }}
            allowFullScreen
            aria-hidden="false"
            tabIndex={0}
            onError={handleIframeError}
            onLoad={() => setIsLoading(false)}
          ></iframe>
        </CardContent>
      </Card>

      {/* Featured Events with Luma Integration */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {getUpcomingEvents().map((event) => (
          <Card key={event.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg group">
            <div className="relative h-48 w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-[#0F7377] to-[#0F7377]/80"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              {event.featured && (
                <Badge className="absolute left-4 top-4 bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-white font-medium shadow-sm">
                  <Star className="h-3 w-3 mr-1" />
                  Featured
                </Badge>
              )}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-lg font-bold mb-1 line-clamp-2">{event.title}</h3>
                <p className="text-blue-100 text-sm line-clamp-2">{event.description}</p>
              </div>
            </div>
            
            <CardContent className="p-4">
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4 text-[#0F7377]" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4 text-[#0F7377]" />
                  <span className="line-clamp-1">{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="h-4 w-4 text-[#0F7377]" />
                  <span>{event.attendees}+ attendees</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <Badge variant="outline" className="text-xs">
                  {event.category}
                </Badge>
                <Badge className={event.price === "Free" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}>
                  {event.price}
                </Badge>
              </div>

              {/* Luma Registration Button */}
              <div className="mb-3">
                {renderLumaButton(event)}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSaveEvent(event.id)}
                  className="flex-1"
                >
                  <Heart className={`h-3 w-3 mr-1 ${savedEvents.includes(event.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  Save
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShareEvent(event)}
                  className="flex-1"
                >
                  <Share2 className="h-3 w-3 mr-1" />
                  Share
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  <Eye className="h-3 w-3 mr-1" />
                  Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View All Events */}
      <div className="text-center">
        <Button
          variant="outline"
          className="px-8 py-3"
          onClick={() => window.location.href = "/events"}
        >
          View All Events
          <ExternalLink className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
