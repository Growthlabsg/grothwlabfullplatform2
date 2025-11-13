"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft,
  Video,
  Calendar,
  Clock,
  Users,
  Play,
  Pause,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Share2,
  MessageSquare,
  Hand,
  Settings,
  Bell,
  Star,
  BookOpen,
  Target,
  Globe,
  Lock,
  Unlock,
  ExternalLink,
  Download,
  Plus,
  Filter,
  Search
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function LiveSessionsPage() {
  const { toast } = useToast()
  const [isMobile, setIsMobile] = useState(false)
  const [activeTab, setActiveTab] = useState("upcoming")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "funding", name: "Funding & Finance" },
    { id: "marketing", name: "Marketing & Sales" },
    { id: "product", name: "Product Development" },
    { id: "leadership", name: "Leadership" },
    { id: "technology", name: "Technology" }
  ]

  const liveSessions = [
    {
      id: 1,
      title: "Pitch Deck Masterclass",
      description: "Learn how to create compelling pitch decks that win over investors",
      instructor: {
        name: "Sarah Chen",
        avatar: "/professional-woman-diverse.png",
        title: "Venture Capital Partner"
      },
      date: "2024-01-20",
      time: "14:00",
      duration: "90 minutes",
      category: "funding",
      attendees: 45,
      maxAttendees: 100,
      status: "upcoming",
      price: "Free",
      featured: true,
      tags: ["Pitch Deck", "Investors", "Presentation"]
    },
    {
      id: 2,
      title: "Growth Marketing Strategies",
      description: "Master growth marketing techniques for startup success",
      instructor: {
        name: "Maya Singh",
        avatar: "/marketing-professional.png",
        title: "Growth Marketing Expert"
      },
      date: "2024-01-22",
      time: "16:00",
      duration: "60 minutes",
      category: "marketing",
      attendees: 23,
      maxAttendees: 50,
      status: "upcoming",
      price: "$29",
      featured: false,
      tags: ["Marketing", "Growth", "Digital Marketing"]
    },
    {
      id: 3,
      title: "Product Development Workshop",
      description: "Build products that users love with proven methodologies",
      instructor: {
        name: "Alex Kim",
        avatar: "/product-manager.png",
        title: "Product Director"
      },
      date: "2024-01-18",
      time: "10:00",
      duration: "120 minutes",
      category: "product",
      attendees: 67,
      maxAttendees: 75,
      status: "live",
      price: "Free",
      featured: true,
      tags: ["Product", "UX", "Development"]
    },
    {
      id: 4,
      title: "Leadership in Startups",
      description: "Essential leadership skills for startup founders and managers",
      instructor: {
        name: "Michael Chen",
        avatar: "/operations-manager.png",
        title: "COO at ScaleUp Inc"
      },
      date: "2024-01-15",
      time: "15:00",
      duration: "75 minutes",
      category: "leadership",
      attendees: 89,
      maxAttendees: 100,
      status: "completed",
      price: "$49",
      featured: false,
      tags: ["Leadership", "Management", "Team Building"]
    }
  ]

  const filteredSessions = liveSessions.filter(session => {
    const matchesSearch = session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         session.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         session.instructor.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || session.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleJoinSession = (sessionId: number) => {
    toast({
      title: "Joining Session",
      description: "Redirecting to live session...",
    })
  }

  const handleRegister = (sessionId: number) => {
    toast({
      title: "Registration Successful",
      description: "You have been registered for this session.",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "bg-red-100 text-red-800 border-red-200"
      case "upcoming":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "completed":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/resources/startup-school">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Startup School
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Live Sessions</h1>
                <p className="text-sm text-gray-600">Join live workshops and interactive sessions</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Create Session
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                My Sessions
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search sessions, instructors, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="live">Live Now</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSessions.filter(session => session.status === "upcoming").map((session) => (
                <Card key={session.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  {session.featured && (
                    <div className="bg-[#F59E0B] text-white text-xs font-medium px-3 py-1 text-center">
                      Featured
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{session.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{session.description}</p>
                      </div>
                      <Badge className={getStatusColor(session.status)}>
                        {session.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-3 mb-4">
                      <img
                        src={session.instructor.avatar}
                        alt={session.instructor.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium">{session.instructor.name}</p>
                        <p className="text-xs text-gray-600">{session.instructor.title}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(session.date).toLocaleDateString()} at {session.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        {session.duration}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-2" />
                        {session.attendees}/{session.maxAttendees} attendees
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {session.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-[#0F7377]">
                        {session.price}
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => handleRegister(session.id)}
                        className="bg-[#0F7377] hover:bg-[#0F7377]/90"
                      >
                        Register
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="live" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSessions.filter(session => session.status === "live").map((session) => (
                <Card key={session.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="bg-red-500 text-white text-xs font-medium px-3 py-1 text-center">
                    LIVE NOW
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{session.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{session.description}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-red-600 font-medium">LIVE</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 mb-4">
                      <img
                        src={session.instructor.avatar}
                        alt={session.instructor.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium">{session.instructor.name}</p>
                        <p className="text-xs text-gray-600">{session.instructor.title}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-2" />
                        {session.attendees} watching now
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        Started {session.time}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {session.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button 
                      className="w-full bg-red-600 hover:bg-red-700"
                      onClick={() => handleJoinSession(session.id)}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Join Live Session
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSessions.filter(session => session.status === "completed").map((session) => (
                <Card key={session.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{session.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{session.description}</p>
                      </div>
                      <Badge className={getStatusColor(session.status)}>
                        {session.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-3 mb-4">
                      <img
                        src={session.instructor.avatar}
                        alt={session.instructor.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium">{session.instructor.name}</p>
                        <p className="text-xs text-gray-600">{session.instructor.title}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(session.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-2" />
                        {session.attendees} attended
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {session.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-[#0F7377]">
                        {session.price}
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Watch Recording
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
