"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { 
  Calendar,
  Clock,
  MapPin,
  Users,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  Heart,
  Share2,
  Eye,
  ArrowLeft,
  Star,
  CheckCircle,
  AlertCircle,
  Info,
  Settings,
  Bell,
  BookOpen,
  User,
  Users2,
  Building,
  Landmark,
  Scale,
  FileText,
  TrendingUp,
  Activity,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Bookmark as BookmarkIcon,
  PieChart,
  TrendingDown,
  Activity as ActivityIcon,
  Handshake as HandshakeIcon,
  Lightbulb as LightbulbIcon,
  Target as TargetIcon,
  Zap as ZapIcon,
  GraduationCap as GraduationCapIcon,
  BookOpen as BookOpenIcon,
  Brain,
  Compass,
  Rocket as RocketIcon,
  Shield as ShieldIcon2,
  Sparkles,
  Trophy,
  UserCheck,
  Workflow,
  Headphones,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Play,
  Pause,
  StopCircle,
  Download as DownloadIcon,
  Upload as UploadIcon,
  Copy,
  Edit,
  Trash2,
  Archive,
  Flag as FlagIcon,
  MoreVertical,
  ChevronDown,
  ChevronUp,
  ArrowUp,
  ArrowDown,
  Maximize2,
  Minimize2,
  RotateCcw,
  Grid,
  List,
  Layout,
  Sidebar,
  PanelLeft,
  PanelRight,
  Split,
  Columns,
  Rows,
  Square,
  Circle,
  Triangle,
  Hexagon,
  Octagon,
  Diamond,
  Smile,
  Frown,
  Meh,
  Laugh,
  Angry,
  Glasses,
  HardHat,
  Construction,
  Wrench,
  Hammer,
  Drill,
  Ruler,
  Compass as CompassIcon,
  Map,
  Navigation,
  Route,
  MapPin as MapPinIcon,
  Pin,
  Flag as FlagIcon2,
  Crosshair,
  Target as TargetIcon2,
  Focus,
  ZoomIn,
  ZoomOut,
  Move,
  Move3D,
  Rotate3D,
  Scale as ScaleIcon,
  Expand,
  Plus as PlusIcon,
  Minus,
  Percent,
  Infinity,
  Pi,
  Sigma
} from "lucide-react"

export default function EventCalendarPage() {
  const { toast } = useToast()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [savedEvents, setSavedEvents] = useState<number[]>([])
  const [showFilters, setShowFilters] = useState(false)

  // Screen size detection
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Load saved events
  useEffect(() => {
    const saved = localStorage.getItem('savedEvents')
    if (saved) {
      setSavedEvents(JSON.parse(saved))
    }
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

  const handleRSVP = (event: any) => {
    toast({
      title: "RSVP Successful",
      description: `You've successfully RSVP'd for ${event.title}`,
    })
  }

  const handleAddToCalendar = (event: any) => {
    toast({
      title: "Added to Calendar",
      description: `${event.title} has been added to your calendar`,
    })
  }

  const handleViewDetails = (event: any) => {
    toast({
      title: "Event Details",
      description: `Loading detailed information for ${event.title}`,
    })
  }

  // Sample events data
  const events = [
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
      day: 28,
      month: 3, // April
      year: 2025
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
      day: 5,
      month: 4, // May
      year: 2025
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
      day: 12,
      month: 4, // May
      year: 2025
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
      day: 19,
      month: 4, // May
      year: 2025
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
      day: 26,
      month: 4, // May
      year: 2025
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
      day: 1,
      month: 5, // June
      year: 2025
    }
  ]

  const categories = ["all", "Demo Day", "Networking", "Workshop", "Pitch Night", "Hackathon", "Fireside Chat"]

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const getEventsForDate = (day: number, month: number, year: number) => {
    return events.filter(event => 
      event.day === day && event.month === month && event.year === year
    )
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.category.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = selectedCategory === "all" || event.category.toLowerCase() === selectedCategory.toLowerCase()
    
    return matchesSearch && matchesCategory
  })

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-24 border border-gray-200 bg-gray-50"></div>
      )
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDate(day, currentDate.getMonth(), currentDate.getFullYear())
      const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString()
      
      days.push(
        <div 
          key={day} 
          className={`h-24 border border-gray-200 p-2 cursor-pointer hover:bg-gray-50 ${
            isToday ? 'bg-blue-50 border-blue-300' : ''
          }`}
          onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
        >
          <div className={`text-sm font-medium ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
            {day}
          </div>
          <div className="mt-1 space-y-1">
            {dayEvents.slice(0, 2).map(event => (
              <div 
                key={event.id} 
                className="text-xs bg-[#0F7377] text-white px-1 py-0.5 rounded truncate"
                title={event.title}
              >
                {event.title}
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-xs text-gray-500">
                +{dayEvents.length - 2} more
              </div>
            )}
          </div>
        </div>
      )
    }

    return days
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              onClick={() => window.history.back()}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Event Calendar</h1>
              <p className="text-xs text-gray-500">{filteredEvents.length} events found</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#0F7377] to-[#0F7377]/90 text-white">
        <div className="container mx-auto px-4 py-8 lg:py-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-4 rounded-full">
                <Calendar className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-3xl lg:text-4xl xl:text-6xl font-bold mb-6">
              Event Calendar
            </h1>
            <p className="text-lg lg:text-xl xl:text-2xl text-blue-100 mb-8 leading-relaxed">
              View all upcoming events in our interactive calendar
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/events"
                className="bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Back to Events
              </Link>
              <Link
                href="/events/create"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-[#0F7377] transition-colors"
              >
                Create Event
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-md text-sm font-medium bg-white shadow-sm focus:ring-2 focus:ring-[#0F7377] focus:border-[#0F7377]"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden mb-6 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm font-medium bg-white shadow-sm focus:ring-2 focus:ring-[#0F7377] focus:border-[#0F7377]"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedCategory("all")
                    }}
                  >
                    Clear All
                  </Button>
                  <Button
                    className="flex-1 bg-[#0F7377] hover:bg-[#0F7377]/90"
                    onClick={() => setShowFilters(false)}
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Calendar Content */}
      <div className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Calendar */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-bold">
                      {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigateMonth('prev')}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigateMonth('next')}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-0">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="p-2 text-center font-semibold text-gray-600 bg-gray-50 border border-gray-200">
                        {day}
                      </div>
                    ))}
                    {renderCalendar()}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Event Details */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Event Details</CardTitle>
                  <CardDescription>
                    {selectedDate 
                      ? `Events for ${selectedDate.toLocaleDateString()}`
                      : "Select a date to view events"
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedDate ? (
                    <div className="space-y-4">
                      {getEventsForDate(selectedDate.getDate(), selectedDate.getMonth(), selectedDate.getFullYear()).map(event => (
                        <div key={event.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-gray-900">{event.title}</h3>
                            {event.featured && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                          <div className="space-y-2 text-xs text-gray-500">
                            <div className="flex items-center gap-2">
                              <Clock className="h-3 w-3" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-3 w-3" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-3 w-3" />
                              <span>{event.attendees}</span>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-3">
                            <Button
                              size="sm"
                              className="flex-1 bg-[#0F7377] hover:bg-[#0F7377]/90"
                              onClick={() => handleRSVP(event)}
                            >
                              RSVP
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleSaveEvent(event.id)}
                            >
                              <Heart className={`h-3 w-3 ${savedEvents.includes(event.id) ? 'fill-red-500 text-red-500' : ''}`} />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleShareEvent(event)}
                            >
                              <Share2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      {getEventsForDate(selectedDate.getDate(), selectedDate.getMonth(), selectedDate.getFullYear()).length === 0 && (
                        <div className="text-center text-gray-500 py-8">
                          <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                          <p>No events on this date</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>Select a date to view events</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="flex justify-around py-2">
          <Button 
            variant="ghost" 
            className="flex flex-col items-center space-y-1 p-3 text-[#0F7377] hover:bg-[#0F7377]/10 active:bg-[#0F7377]/20"
          >
            <Calendar className="w-5 h-5" />
            <span className="text-xs font-semibold">Calendar</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex flex-col items-center space-y-1 p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 active:bg-gray-200"
            onClick={() => {
              const searchInput = document.querySelector('input[placeholder="Search events..."]') as HTMLInputElement
              if (searchInput) {
                searchInput.focus()
                searchInput.scrollIntoView({ behavior: 'smooth' })
              }
            }}
          >
            <Search className="w-5 h-5" />
            <span className="text-xs font-semibold">Search</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex flex-col items-center space-y-1 p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 active:bg-gray-200 relative"
            onClick={() => {
              toast({
                title: "Saved Events",
                description: `You have ${savedEvents.length} saved events`,
              })
            }}
          >
            <Heart className="w-5 h-5" />
            <span className="text-xs font-semibold">Saved</span>
            {savedEvents.length > 0 && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {savedEvents.length}
              </div>
            )}
          </Button>
          <Button 
            variant="ghost" 
            className="flex flex-col items-center space-y-1 p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 active:bg-gray-200"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Settings className="w-5 h-5" />
            <span className="text-xs font-semibold">Filters</span>
          </Button>
        </div>
      </div>

      {/* Bottom padding for mobile navigation */}
      <div className="lg:hidden h-20"></div>
    </div>
  )
}
