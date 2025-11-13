"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  Plus,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  Star,
  MessageSquare,
  Share2,
  Bookmark,
  Video,
  Phone,
  Globe,
  Building2,
  Rocket,
  DollarSign,
  GraduationCap,
  Lightbulb,
  Target,
  Zap,
  Award,
  TrendingUp,
  Code,
  Shield,
  Heart,
  Eye,
  ThumbsUp
} from "lucide-react"
import Link from "next/link"

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  duration: string
  location: string
  type: "workshop" | "networking" | "pitch" | "mentorship" | "conference" | "demo"
  attendees: number
  maxAttendees: number
  organizer: {
    name: string
    avatar: string
    title: string
  }
  isRegistered?: boolean
  isBookmarked?: boolean
  tags: string[]
}

export default function CalendarPage() {
  const [selectedMonth, setSelectedMonth] = useState(new Date())
  const [selectedType, setSelectedType] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const eventTypes = [
    { id: "all", name: "All Events", icon: <CalendarIcon className="h-4 w-4" /> },
    { id: "workshop", name: "Workshops", icon: <GraduationCap className="h-4 w-4" /> },
    { id: "networking", name: "Networking", icon: <Users className="h-4 w-4" /> },
    { id: "pitch", name: "Pitch Events", icon: <Rocket className="h-4 w-4" /> },
    { id: "mentorship", name: "Mentorship", icon: <Award className="h-4 w-4" /> },
    { id: "conference", name: "Conferences", icon: <Globe className="h-4 w-4" /> },
    { id: "demo", name: "Demo Days", icon: <Target className="h-4 w-4" /> },
  ]

  const events: Event[] = [
    {
      id: "1",
      title: "Startup Funding Workshop",
      description: "Learn the fundamentals of startup funding, from bootstrapping to Series A. Expert-led session with real case studies.",
      date: "2024-01-15",
      time: "14:00",
      duration: "3 hours",
      location: "GrowthLab HQ, Singapore",
      type: "workshop",
      attendees: 45,
      maxAttendees: 50,
      organizer: {
        name: "Sarah Chen",
        avatar: "/professional-woman-diverse.png",
        title: "Venture Capital Partner"
      },
      isRegistered: true,
      tags: ["Funding", "Workshop", "Expert-led"]
    },
    {
      id: "2",
      title: "Founder Networking Night",
      description: "Connect with fellow founders, investors, and mentors in a relaxed networking environment.",
      date: "2024-01-18",
      time: "19:00",
      duration: "2 hours",
      location: "The Working Capitol",
      type: "networking",
      attendees: 78,
      maxAttendees: 100,
      organizer: {
        name: "David Wong",
        avatar: "/tech-professional.png",
        title: "Community Manager"
      },
      isBookmarked: true,
      tags: ["Networking", "Social", "Community"]
    },
    {
      id: "3",
      title: "Pitch Perfect: Investor Edition",
      description: "Practice your pitch with real investors and get immediate feedback on your presentation.",
      date: "2024-01-22",
      time: "10:00",
      duration: "4 hours",
      location: "Online",
      type: "pitch",
      attendees: 12,
      maxAttendees: 15,
      organizer: {
        name: "Maya Singh",
        avatar: "/marketing-professional.png",
        title: "Startup Advisor"
      },
      tags: ["Pitch", "Investors", "Feedback"]
    },
    {
      id: "4",
      title: "Mentor Office Hours",
      description: "One-on-one sessions with experienced mentors covering strategy, growth, and technical challenges.",
      date: "2024-01-25",
      time: "15:00",
      duration: "1 hour",
      location: "GrowthLab HQ, Singapore",
      type: "mentorship",
      attendees: 8,
      maxAttendees: 10,
      organizer: {
        name: "Alex Thompson",
        avatar: "/abstract-geometric-aw.png",
        title: "Senior Mentor"
      },
      tags: ["Mentorship", "One-on-one", "Strategy"]
    },
    {
      id: "5",
      title: "Southeast Asia Startup Summit",
      description: "Annual conference bringing together the region's top startups, investors, and ecosystem builders.",
      date: "2024-02-01",
      time: "09:00",
      duration: "8 hours",
      location: "Marina Bay Sands",
      type: "conference",
      attendees: 450,
      maxAttendees: 500,
      organizer: {
        name: "Lisa Chen",
        avatar: "/product-manager-brainstorm.png",
        title: "Event Director"
      },
      isRegistered: true,
      tags: ["Conference", "Summit", "Regional"]
    },
    {
      id: "6",
      title: "Cohort 5 Demo Day",
      description: "Watch our latest cohort of startups pitch their solutions to investors and industry experts.",
      date: "2024-02-08",
      time: "14:00",
      duration: "5 hours",
      location: "GrowthLab HQ, Singapore",
      type: "demo",
      attendees: 120,
      maxAttendees: 150,
      organizer: {
        name: "Raj Patel",
        avatar: "/abstract-geometric-shapes.png",
        title: "Program Director"
      },
      isBookmarked: true,
      tags: ["Demo Day", "Pitch", "Cohort"]
    }
  ]

  const filteredEvents = events.filter(event => {
    const matchesType = selectedType === "all" || event.type === selectedType
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesSearch
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case "workshop": return "bg-blue-100 text-blue-800"
      case "networking": return "bg-green-100 text-green-800"
      case "pitch": return "bg-purple-100 text-purple-800"
      case "mentorship": return "bg-orange-100 text-orange-800"
      case "conference": return "bg-indigo-100 text-indigo-800"
      case "demo": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "workshop": return <GraduationCap className="h-4 w-4" />
      case "networking": return <Users className="h-4 w-4" />
      case "pitch": return <Rocket className="h-4 w-4" />
      case "mentorship": return <Award className="h-4 w-4" />
      case "conference": return <Globe className="h-4 w-4" />
      case "demo": return <Target className="h-4 w-4" />
      default: return <CalendarIcon className="h-4 w-4" />
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-8 w-8 bg-[#0F7377] rounded-lg flex items-center justify-center">
                <CalendarIcon className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">GrowthLab</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-gray-600 hover:text-[#0F7377]">Home</Link>
              <Link href="/dashboard" className="text-gray-600 hover:text-[#0F7377]">Dashboard</Link>
              <Link href="/events" className="text-gray-600 hover:text-[#0F7377]">Events</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0F7377] via-[#1E293B] to-[#0F7377] py-16 md:py-24">
        <div className="container relative mx-auto max-w-7xl px-4">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <div className="flex flex-col justify-center">
              <Badge className="mb-6 w-fit bg-white/20 text-white hover:bg-white/30">
                <CalendarIcon className="w-3 h-3 mr-2" />
                Event Calendar
              </Badge>
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                GrowthLab Events
              </h1>
              <p className="mb-8 text-lg text-white/90 md:text-xl">
                Discover workshops, networking events, pitch competitions, and more. Connect with the startup 
                community and accelerate your growth.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" className="bg-[#F59E0B] text-white hover:bg-[#F59E0B]/90" asChild>
                  <Link href="#events">Browse Events</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                  <Link href="/events">View All Events</Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[300px] w-full max-w-md overflow-hidden rounded-lg md:h-[400px]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0F7377]/20 to-[#1E293B]/20 rounded-lg"></div>
                <div className="relative h-full w-full flex items-center justify-center">
                  <CalendarIcon className="h-32 w-32 text-white/80" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-white py-8 border-b">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {eventTypes.map((type) => (
                <Button
                  key={type.id}
                  variant={selectedType === type.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(type.id)}
                  className="flex items-center gap-2"
                >
                  {type.icon}
                  {type.name}
                </Button>
              ))}
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search events..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F7377] focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#1E293B] mb-2">Upcoming Events</h2>
            <p className="text-gray-600">Discover and register for upcoming events in the startup ecosystem</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                <div className="relative">
                  <div className="h-48 bg-gradient-to-br from-[#0F7377]/20 to-[#1E293B]/20 flex items-center justify-center">
                    {getTypeIcon(event.type)}
                  </div>
                  <Badge className={`absolute top-2 left-2 ${getTypeColor(event.type)}`}>
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </Badge>
                  {event.isRegistered && (
                    <Badge className="absolute top-2 right-2 bg-green-500 text-white">
                      Registered
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-lg group-hover:text-[#0F7377] transition-colors">
                    {event.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {event.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Event Details */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <CalendarIcon className="h-4 w-4" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{event.time} • {event.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>{event.attendees}/{event.maxAttendees} attendees</span>
                    </div>
                  </div>

                  {/* Organizer */}
                  <div className="flex items-center gap-3 pt-2 border-t">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={event.organizer.avatar} />
                      <AvatarFallback>{event.organizer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{event.organizer.name}</p>
                      <p className="text-xs text-gray-500 truncate">{event.organizer.title}</p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {event.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="flex gap-2">
                  <Button className="flex-1 bg-[#0F7377] hover:bg-[#0F7377]/90">
                    {event.isRegistered ? "View Details" : "Register Now"}
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your filters to find events that match your interests.</p>
              <Button onClick={() => {
                setSelectedType("all")
                setSearchQuery("")
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#0F7377] py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Stay Connected</h2>
            <p className="mb-8 text-lg text-white/90">
              Never miss an important event. Subscribe to our newsletter and get updates on upcoming events, 
              workshops, and networking opportunities.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="bg-[#F59E0B] text-white hover:bg-[#F59E0B]/90">
                Subscribe to Newsletter
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link href="/events">View All Events</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 