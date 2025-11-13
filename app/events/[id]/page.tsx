"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Calendar, Clock, MapPin, Users, Star, Heart, Share2, ArrowLeft, ExternalLink, CheckCircle, AlertCircle, User, Mail, Phone } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LumaIntegration } from "@/components/events/luma-integration"
import { useToast } from "@/components/ui/use-toast"

interface Event {
  id: number
  title: string
  description: string
  longDescription: string
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
  organizer: {
    name: string
    avatar: string
    bio: string
    contact: string
  }
  agenda: Array<{
    time: string
    title: string
    description: string
    speaker?: string
  }>
  speakers: Array<{
    name: string
    title: string
    company: string
    avatar: string
    bio: string
  }>
  requirements: string[]
  benefits: string[]
  tags: string[]
}

export default function EventDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [event, setEvent] = useState<Event | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [savedEvents, setSavedEvents] = useState<number[]>([])
  const [activeTab, setActiveTab] = useState("overview")

  // Sample event data
  const sampleEvent: Event = {
    id: 1,
    title: "GrowthLab Demo Day: Cohort 4",
    description: "Join us for an exciting showcase of innovative startups from our latest accelerator cohort.",
    longDescription: "GrowthLab Demo Day is our flagship event where the most promising startups from our accelerator program showcase their innovations to investors, mentors, and the broader startup community. This exclusive event features live pitches, networking opportunities, and the chance to discover the next generation of unicorn companies. With over 250 attendees expected, including top-tier VCs, successful entrepreneurs, and industry experts, this is an event you don't want to miss.",
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
    organizer: {
      name: "GrowthLab Team",
      avatar: "/growthlab-logo.png",
      bio: "GrowthLab is Singapore's leading startup accelerator, helping entrepreneurs build and scale their businesses.",
      contact: "events@growthlab.sg"
    },
    agenda: [
      {
        time: "6:00 PM - 6:30 PM",
        title: "Registration & Networking",
        description: "Welcome drinks and networking session"
      },
      {
        time: "6:30 PM - 7:00 PM",
        title: "Opening Remarks",
        description: "Welcome address by GrowthLab leadership",
        speaker: "Sarah Chen, CEO"
      },
      {
        time: "7:00 PM - 8:30 PM",
        title: "Startup Pitches",
        description: "Live pitches from Cohort 4 startups"
      },
      {
        time: "8:30 PM - 9:00 PM",
        title: "Networking & Closing",
        description: "Connect with founders and investors"
      }
    ],
    speakers: [
      {
        name: "Sarah Chen",
        title: "CEO",
        company: "GrowthLab",
        avatar: "/sarah-chen.jpg",
        bio: "Serial entrepreneur with 15+ years in the startup ecosystem"
      },
      {
        name: "David Lim",
        title: "Partner",
        company: "Sequoia Capital",
        avatar: "/david-lim.jpg",
        bio: "Leading investor in Southeast Asian startups"
      },
      {
        name: "Priya Sharma",
        title: "Founder",
        company: "TechFlow",
        avatar: "/priya-sharma.jpg",
        bio: "Successful entrepreneur and GrowthLab alumna"
      }
    ],
    requirements: [
      "Valid ID for entry",
      "Business card for networking",
      "Smartphone for event app"
    ],
    benefits: [
      "Network with top investors and entrepreneurs",
      "Discover innovative startup solutions",
      "Learn from successful founders",
      "Access to exclusive startup ecosystem"
    ],
    tags: ["Startups", "Pitching", "Networking", "Investment", "Innovation"]
  }

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setEvent(sampleEvent)
      setIsLoading(false)
    }, 1000)

    // Load saved events
    const saved = localStorage.getItem('savedEvents')
    if (saved) {
      setSavedEvents(JSON.parse(saved))
    }

    return () => clearTimeout(timer)
  }, [])

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

  const handleShareEvent = () => {
    if (navigator.share) {
      navigator.share({
        title: event?.title,
        text: event?.description,
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

  const handleAddToCalendar = () => {
    toast({
      title: "Added to Calendar",
      description: "Event added to your calendar",
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded mb-6"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Event Not Found</h3>
            <p className="text-gray-600 mb-4">The event you're looking for doesn't exist.</p>
            <Button onClick={() => router.push('/events')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Events
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-gray-900 truncate flex-1 mx-3">
            {event.title}
          </h1>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSaveEvent(event.id)}
              className="p-2"
            >
              <Heart className={`h-5 w-5 ${savedEvents.includes(event.id) ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShareEvent}
              className="p-2"
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Desktop Header */}
        <div className="hidden lg:flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Events
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event Header */}
            <Card className="overflow-hidden">
              <div className="relative h-64 lg:h-80 w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-[#0F7377] to-[#0F7377]/80"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                {event.featured && (
                  <Badge className="absolute left-4 top-4 bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-white font-medium shadow-sm">
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h1 className="text-2xl lg:text-3xl font-bold mb-2">{event.title}</h1>
                  <p className="text-blue-100 text-lg">{event.description}</p>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-5 w-5 text-[#0F7377]" />
                    <span className="font-medium">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-5 w-5 text-[#0F7377]" />
                    <span className="font-medium">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-5 w-5 text-[#0F7377]" />
                    <span className="font-medium">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="h-5 w-5 text-[#0F7377]" />
                    <span className="font-medium">{event.attendees}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {event.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Luma Registration Button */}
                <div className="mb-6">
                  <LumaIntegration
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
                    showDetails={false}
                    className="w-full"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    onClick={handleAddToCalendar}
                    className="flex-1"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Add to Calendar
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleSaveEvent(event.id)}
                    className="flex-1"
                  >
                    <Heart className={`h-4 w-4 mr-2 ${savedEvents.includes(event.id) ? 'fill-red-500 text-red-500' : ''}`} />
                    {savedEvents.includes(event.id) ? 'Saved' : 'Save'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleShareEvent}
                    className="flex-1"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Event Details Tabs */}
            <Card>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="agenda">Agenda</TabsTrigger>
                  <TabsTrigger value="speakers">Speakers</TabsTrigger>
                  <TabsTrigger value="info">Info</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">About This Event</h3>
                      <p className="text-gray-600 leading-relaxed">{event.longDescription}</p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">What You'll Learn</h3>
                      <ul className="space-y-2">
                        {event.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="agenda" className="p-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold mb-4">Event Agenda</h3>
                    {event.agenda.map((item, index) => (
                      <div key={index} className="flex gap-4 p-4 border border-gray-200 rounded-lg">
                        <div className="flex-shrink-0 w-24 text-sm font-medium text-[#0F7377]">
                          {item.time}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                          <p className="text-gray-600 text-sm mb-1">{item.description}</p>
                          {item.speaker && (
                            <p className="text-[#0F7377] text-sm font-medium">{item.speaker}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="speakers" className="p-6">
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold mb-4">Featured Speakers</h3>
                    {event.speakers.map((speaker, index) => (
                      <div key={index} className="flex gap-4 p-4 border border-gray-200 rounded-lg">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={speaker.avatar} alt={speaker.name} />
                          <AvatarFallback>{speaker.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{speaker.name}</h4>
                          <p className="text-[#0F7377] font-medium text-sm mb-1">{speaker.title} at {speaker.company}</p>
                          <p className="text-gray-600 text-sm">{speaker.bio}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="info" className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Event Requirements</h3>
                      <ul className="space-y-2">
                        {event.requirements.map((requirement, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600">{requirement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Organizer</h3>
                      <div className="flex gap-4 p-4 border border-gray-200 rounded-lg">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={event.organizer.avatar} alt={event.organizer.name} />
                          <AvatarFallback>{event.organizer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{event.organizer.name}</h4>
                          <p className="text-gray-600 text-sm mb-2">{event.organizer.bio}</p>
                          <div className="flex items-center gap-2 text-sm text-[#0F7377]">
                            <Mail className="h-4 w-4" />
                            <span>{event.organizer.contact}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Event Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-[#0F7377]" />
                  <div>
                    <p className="font-medium">{event.date}</p>
                    <p className="text-sm text-gray-600">{event.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-[#0F7377]" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-gray-600">{event.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-[#0F7377]" />
                  <div>
                    <p className="font-medium">Attendees</p>
                    <p className="text-sm text-gray-600">{event.attendees}</p>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <Badge className={event.price === "Free" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}>
                    {event.price}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Related Events */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Related Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <h4 className="font-medium text-sm mb-1">Founder Networking Mixer</h4>
                    <p className="text-xs text-gray-600">May 5, 2025</p>
                  </div>
                  <div className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <h4 className="font-medium text-sm mb-1">AI for Startups Workshop</h4>
                    <p className="text-xs text-gray-600">May 12, 2025</p>
                  </div>
                  <div className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <h4 className="font-medium text-sm mb-1">Pitch Night: FinTech Edition</h4>
                    <p className="text-xs text-gray-600">May 19, 2025</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
