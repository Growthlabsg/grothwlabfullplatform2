"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Search, Filter, MapPin, Calendar, Clock, Users, Star, Heart, Share2, Eye, ChevronLeft, ChevronRight, SortAsc, SortDesc } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LumaIntegration } from "@/components/events/luma-integration"
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
  tags: string[]
  distance?: number
}

export default function EventSearchPage() {
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [events, setEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || "")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [selectedDate, setSelectedDate] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isLoading, setIsLoading] = useState(true)
  const [savedEvents, setSavedEvents] = useState<number[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const eventsPerPage = 12

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
      tags: ["Startups", "Pitching", "Networking"],
      distance: 2.5
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
      tags: ["Networking", "Entrepreneurs", "Investors"],
      distance: 1.2
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
      tags: ["AI", "Technology", "Learning"],
      distance: 0
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
      tags: ["FinTech", "Pitching", "Investment"],
      distance: 5.8
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
      tags: ["Fundraising", "Investment", "Business"],
      distance: 1.2
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
      tags: ["Hackathon", "Innovation", "Technology"],
      distance: 8.3
    },
    {
      id: 7,
      title: "Blockchain & Web3 Summit",
      description: "Explore the latest trends and opportunities in blockchain and Web3 technologies.",
      date: "June 15, 2025",
      time: "9:00 AM - 6:00 PM",
      location: "Suntec Singapore",
      attendees: "300+ Attendees Expected",
      category: "Conference",
      featured: false,
      image: "/blockchain-summit.png",
      price: "SGD 150",
      status: "Open for Registration",
      lumaEventId: "evt-blockchain-summit",
      tags: ["Blockchain", "Web3", "Technology"],
      distance: 3.7
    },
    {
      id: 8,
      title: "Women in Tech Leadership",
      description: "Empowering women leaders in technology through networking and mentorship.",
      date: "June 22, 2025",
      time: "6:00 PM - 8:00 PM",
      location: "Google Singapore",
      attendees: "150+ Attendees Expected",
      category: "Networking",
      featured: false,
      image: "/women-in-tech.png",
      price: "Free",
      status: "Open for RSVP",
      lumaEventId: "evt-women-in-tech",
      tags: ["Women", "Leadership", "Technology"],
      distance: 4.1
    }
  ]

  const categories = ["all", "Demo Day", "Networking", "Workshop", "Pitch Night", "Hackathon", "Conference", "Fireside Chat"]
  const locations = ["all", "Singapore", "Online", "Marina Bay", "Downtown", "Orchard", "Sentosa"]
  const dateRanges = ["all", "today", "tomorrow", "this-week", "next-week", "this-month", "next-month"]

  useEffect(() => {
    const timer = setTimeout(() => {
      setEvents(sampleEvents)
      setIsLoading(false)
    }, 1000)

    // Load saved events
    const saved = localStorage.getItem('savedEvents')
    if (saved) {
      setSavedEvents(JSON.parse(saved))
    }

    return () => clearTimeout(timer)
  }, [])

  // Filter and sort events
  useEffect(() => {
    let filtered = events

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(event => event.category === selectedCategory)
    }

    // Location filter
    if (selectedLocation !== "all") {
      if (selectedLocation === "Online") {
        filtered = filtered.filter(event => event.location === "Online")
      } else {
        filtered = filtered.filter(event => 
          event.location.toLowerCase().includes(selectedLocation.toLowerCase())
        )
      }
    }

    // Date filter
    if (selectedDate !== "all") {
      const today = new Date()
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)
      
      filtered = filtered.filter(event => {
        const eventDate = new Date(event.date)
        switch (selectedDate) {
          case "today":
            return eventDate.toDateString() === today.toDateString()
          case "tomorrow":
            return eventDate.toDateString() === tomorrow.toDateString()
          case "this-week":
            const weekStart = new Date(today)
            weekStart.setDate(today.getDate() - today.getDay())
            const weekEnd = new Date(weekStart)
            weekEnd.setDate(weekStart.getDate() + 6)
            return eventDate >= weekStart && eventDate <= weekEnd
          case "next-week":
            const nextWeekStart = new Date(today)
                nextWeekStart.setDate(today.getDate() + (7 - today.getDay()))
            const nextWeekEnd = new Date(nextWeekStart)
            nextWeekEnd.setDate(nextWeekStart.getDate() + 6)
            return eventDate >= nextWeekStart && eventDate <= nextWeekEnd
          default:
            return true
        }
      })
    }

    // Sort events
    filtered.sort((a, b) => {
      let comparison = 0
      switch (sortBy) {
        case "date":
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime()
          break
        case "title":
          comparison = a.title.localeCompare(b.title)
          break
        case "price":
          const priceA = a.price === "Free" ? 0 : parseInt(a.price.replace(/[^\d]/g, ''))
          const priceB = b.price === "Free" ? 0 : parseInt(b.price.replace(/[^\d]/g, ''))
          comparison = priceA - priceB
          break
        case "distance":
          comparison = (a.distance || 0) - (b.distance || 0)
          break
        case "featured":
          comparison = (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
          break
        default:
          comparison = 0
      }
      return sortOrder === "asc" ? comparison : -comparison
    })

    setFilteredEvents(filtered)
    setCurrentPage(1)
  }, [events, searchQuery, selectedCategory, selectedLocation, selectedDate, sortBy, sortOrder])

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

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage)
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  )

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
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="p-2"
          >
            <Filter className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Desktop Header */}
        <div className="hidden lg:block mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Search Events</h1>
          <p className="text-gray-600">Find the perfect events for you</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-lg">Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search events..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#0F7377] focus:border-[#0F7377]"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat === "all" ? "All Categories" : cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Location</label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#0F7377] focus:border-[#0F7377]"
                  >
                    {locations.map(loc => (
                      <option key={loc} value={loc}>
                        {loc === "all" ? "All Locations" : loc}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date Filter */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Date</label>
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#0F7377] focus:border-[#0F7377]"
                  >
                    {dateRanges.map(date => (
                      <option key={date} value={date}>
                        {date === "all" ? "All Dates" : date.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort Options */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Sort By</label>
                  <div className="space-y-2">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#0F7377] focus:border-[#0F7377]"
                    >
                      <option value="date">Date</option>
                      <option value="title">Title</option>
                      <option value="price">Price</option>
                      <option value="distance">Distance</option>
                      <option value="featured">Featured</option>
                    </select>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                      className="w-full"
                    >
                      {sortOrder === "asc" ? <SortAsc className="h-4 w-4 mr-2" /> : <SortDesc className="h-4 w-4 mr-2" />}
                      {sortOrder === "asc" ? "Ascending" : "Descending"}
                    </Button>
                  </div>
                </div>

                {/* View Mode */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">View</label>
                  <div className="flex gap-2">
                    <Button
                      variant={viewMode === "grid" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="flex-1"
                    >
                      Grid
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="flex-1"
                    >
                      List
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {filteredEvents.length} Events Found
                </h2>
                <p className="text-gray-600">
                  {searchQuery && `Search results for "${searchQuery}"`}
                </p>
              </div>
              <div className="hidden lg:flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  Grid
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  List
                </Button>
              </div>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <Card className="lg:hidden mb-6">
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat}>
                            {cat === "all" ? "All Categories" : cat}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Location</label>
                      <select
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      >
                        {locations.map(loc => (
                          <option key={loc} value={loc}>
                            {loc === "all" ? "All Locations" : loc}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Date</label>
                      <select
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      >
                        {dateRanges.map(date => (
                          <option key={date} value={date}>
                            {date === "all" ? "All Dates" : date.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Events Grid/List */}
            {paginatedEvents.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Events Found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search criteria or filters
                  </p>
                  <Button
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedCategory("all")
                      setSelectedLocation("all")
                      setSelectedDate("all")
                    }}
                    variant="outline"
                  >
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                {viewMode === "grid" ? (
                  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {paginatedEvents.map((event) => (
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
                ) : (
                  <div className="space-y-4">
                    {paginatedEvents.map((event) => (
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
                        variant="default"
                        showDetails={true}
                      />
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-8">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    
                    <div className="flex gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const page = i + 1
                        return (
                          <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                            className="w-8 h-8 p-0"
                          >
                            {page}
                          </Button>
                        )
                      })}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
