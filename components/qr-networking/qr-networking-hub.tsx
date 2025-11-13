"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  QrCode, 
  QrCodeIcon, 
  Camera, 
  Users, 
  Calendar, 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Globe, 
  Linkedin, 
  Twitter, 
  MessageCircle, 
  Bell, 
  Tag, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Share2, 
  CheckCircle, 
  X,
  UserPlus,
  History,
  BarChart3,
  Settings,
  Zap
} from "lucide-react"
import { QRCodeSVG } from "qrcode.react"
import { useAuth } from "@/contexts/auth-context"

// Mock TranslatableText component for now
const TranslatableText = ({ children }: { children: React.ReactNode }) => <>{children}</>

interface Connection {
  id: string
  name: string
  email: string
  company: string
  position: string
  avatar: string
  eventName: string
  eventDate: string
  meetingTime: string
  tags: string[]
  notes: string
  selfie?: string
  followUpReminder?: string
  lastContact?: string
}

interface Event {
  id: string
  name: string
  date: string
  time: string
  location: string
  description: string
  attendees: number
  maxAttendees: number
  status: "upcoming" | "ongoing" | "completed"
  checkIns: number
}

export function QRNetworkingHub() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("profile")
  const [connections, setConnections] = useState<Connection[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [showQRScanner, setShowQRScanner] = useState(false)
  const [showSelfieCamera, setShowSelfieCamera] = useState(false)
  const [selectedConnection, setSelectedConnection] = useState<Connection | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showAddConnection, setShowAddConnection] = useState(false)

  // Mock data for demonstration
  useEffect(() => {
    setConnections([
      {
        id: "1",
        name: "Sarah Chen",
        email: "sarah@startup.com",
        company: "TechFlow Solutions",
        position: "CEO & Founder",
        avatar: "/sarah-chen.png",
        eventName: "Singapore Startup Summit 2024",
        eventDate: "Dec 15, 2024",
        meetingTime: "2:30 PM",
        tags: ["SaaS", "AI", "Female Founder"],
        notes: "Discussed potential partnership for AI integration",
        lastContact: "Dec 16, 2024"
      },
      {
        id: "2",
        name: "David Kumar",
        email: "david@fintech.com",
        company: "FinTech Pro",
        position: "CTO",
        avatar: "/alex-wong.png",
        eventName: "FinTech Networking Night",
        eventDate: "Dec 10, 2024",
        meetingTime: "7:15 PM",
        tags: ["FinTech", "Technology", "CTO"],
        notes: "Interested in blockchain solutions",
        lastContact: "Dec 12, 2024"
      }
    ])

    setEvents([
      {
        id: "1",
        name: "Singapore Startup Summit 2024",
        date: "Dec 15, 2024",
        time: "2:00 PM - 6:00 PM",
        location: "Marina Bay Sands",
        description: "Annual startup networking event with investors and founders",
        attendees: 45,
        maxAttendees: 100,
        status: "completed",
        checkIns: 42
      },
      {
        id: "2",
        name: "FinTech Networking Night",
        date: "Dec 10, 2024",
        time: "7:00 PM - 10:00 PM",
        location: "Raffles Place",
        description: "Exclusive fintech networking event",
        attendees: 28,
        maxAttendees: 50,
        status: "completed",
        checkIns: 25
      }
    ])
  }, [])

  const availableTags = [
    "SaaS", "AI", "FinTech", "Healthcare", "E-commerce", "EdTech", "Female Founder", 
    "CTO", "CEO", "Investor", "Mentor", "Developer", "Designer", "Marketing"
  ]

  const generateProfileQR = () => {
    if (!user) return ""
    
    const profileData = {
      userId: user.id,
      name: user.name,
      email: user.email,
      company: user.company || "GrowthLab",
      position: user.position || "Member",
      profileUrl: `${window.location.origin}/profile/${user.id}`,
      timestamp: new Date().toISOString()
    }
    
    return JSON.stringify(profileData)
  }

  const handleQRScan = (qrData: string) => {
    try {
      const profileData = JSON.parse(qrData)
      setSelectedConnection({
        id: profileData.userId,
        name: profileData.name,
        email: profileData.email,
        company: profileData.company,
        position: profileData.position,
        avatar: profileData.avatar || "",
        eventName: "Manual Connection",
        eventDate: new Date().toLocaleDateString(),
        meetingTime: new Date().toLocaleTimeString(),
        tags: [],
        notes: "",
        lastContact: new Date().toLocaleDateString()
      })
      setShowAddConnection(true)
    } catch (error) {
      console.error("Invalid QR code data:", error)
    }
  }

  const addConnection = (connection: Omit<Connection, 'id'>) => {
    const newConnection: Connection = {
      ...connection,
      id: Date.now().toString()
    }
    setConnections(prev => [newConnection, ...prev])
    setShowAddConnection(false)
    setSelectedConnection(null)
  }

  const filteredConnections = connections.filter(connection => {
    const matchesSearch = connection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         connection.company.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => connection.tags.includes(tag))
    return matchesSearch && matchesTags
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
              <QrCode className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                QR Networking Hub
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mt-1">
                Connect, Check-in, and Network with QR Codes
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <Button 
            className="h-20 flex-col gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            onClick={() => setShowQRScanner(true)}
          >
            <QrCodeIcon className="h-6 w-6" />
            <TranslatableText>Scan QR Code</TranslatableText>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-20 flex-col gap-2"
            onClick={() => setActiveTab("profile")}
          >
            <QrCode className="h-6 w-6" />
            <TranslatableText>My QR Code</TranslatableText>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-20 flex-col gap-2"
            onClick={() => setActiveTab("events")}
          >
            <Calendar className="h-6 w-6" />
            <TranslatableText>Event Check-ins</TranslatableText>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-20 flex-col gap-2"
            onClick={() => setActiveTab("connections")}
          >
            <Users className="h-6 w-6" />
            <TranslatableText>My Connections</TranslatableText>
          </Button>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white dark:bg-gray-800 p-1 rounded-xl shadow-lg">
            <TabsTrigger value="profile" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              <QrCode className="h-4 w-4 mr-2" />
              <TranslatableText>Profile</TranslatableText>
            </TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              <Calendar className="h-4 w-4 mr-2" />
              <TranslatableText>Events</TranslatableText>
            </TabsTrigger>
            <TabsTrigger value="connections" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              <Users className="h-4 w-4 mr-2" />
              <TranslatableText>Connections</TranslatableText>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              <BarChart3 className="h-4 w-4 mr-2" />
              <TranslatableText>Analytics</TranslatableText>
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              <Settings className="h-4 w-4 mr-2" />
              <TranslatableText>Settings</TranslatableText>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab - QR Code Generation */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* QR Code Card */}
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
                    <QrCode className="h-5 w-5" />
                    <TranslatableText>Your Profile QR Code</TranslatableText>
                  </CardTitle>
                  <CardDescription className="text-blue-700 dark:text-blue-300">
                    <TranslatableText>Scan this code to share your profile</TranslatableText>
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="bg-white p-6 rounded-lg inline-block">
                    <QRCodeSVG 
                      value={generateProfileQR()} 
                      size={200}
                      level="H"
                      includeMargin={true}
                    />
                  </div>
                  <div className="flex gap-2 justify-center">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      <TranslatableText>Download</TranslatableText>
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Share2 className="h-4 w-4" />
                      <TranslatableText>Share</TranslatableText>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Profile Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5" />
                    <TranslatableText>Profile Information</TranslatableText>
                  </CardTitle>
                  <CardDescription>
                    <TranslatableText>Your digital business card details</TranslatableText>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={user?.avatar} />
                      <AvatarFallback className="text-lg font-bold">
                        {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {user?.name || 'Your Name'}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {user?.position || 'Position'} at {user?.company || 'Company'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {user?.email || 'email@example.com'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {user?.phone || '+65 1234 5678'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {user?.website || 'www.example.com'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Events Tab - Event Management and Check-ins */}
          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <TranslatableText>Event Management</TranslatableText>
                </CardTitle>
                <CardDescription>
                  <TranslatableText>Manage your events and track check-ins</TranslatableText>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {events.map((event) => (
                    <div key={event.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{event.name}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {event.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {event.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {event.location}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{event.description}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={event.status === "completed" ? "default" : "secondary"}>
                            {event.status}
                          </Badge>
                          <div className="text-sm text-gray-500 mt-1">
                            {event.checkIns}/{event.attendees} checked in
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline">
                          <QrCode className="h-4 w-4 mr-2" />
                          <TranslatableText>Event QR</TranslatableText>
                        </Button>
                        <Button size="sm" variant="outline">
                          <Users className="h-4 w-4 mr-2" />
                          <TranslatableText>Attendees</TranslatableText>
                        </Button>
                        <Button size="sm" variant="outline">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          <TranslatableText>Analytics</TranslatableText>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Connections Tab - Connection Management */}
          <TabsContent value="connections" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  <TranslatableText>Search & Filter Connections</TranslatableText>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Label htmlFor="search">Search connections</Label>
                    <Input
                      id="search"
                      placeholder="Search by name, company, or event..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex-1">
                    <Label>Filter by tags</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {availableTags.map((tag) => (
                        <Badge
                          key={tag}
                          variant={selectedTags.includes(tag) ? "default" : "outline"}
                          className="cursor-pointer hover:scale-105 transition-transform"
                          onClick={() => {
                            if (selectedTags.includes(tag)) {
                              setSelectedTags(selectedTags.filter(t => t !== tag))
                            } else {
                              setSelectedTags([...selectedTags, tag])
                            }
                          }}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Connections List */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      <TranslatableText>My Connections</TranslatableText>
                    </CardTitle>
                    <CardDescription>
                      <TranslatableText>{filteredConnections.length} connections found</TranslatableText>
                    </CardDescription>
                  </div>
                  <Button onClick={() => setShowQRScanner(true)}>
                    <QrCodeIcon className="h-4 w-4 mr-2" />
                    <TranslatableText>Add Connection</TranslatableText>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredConnections.map((connection) => (
                    <div key={connection.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 hover:shadow-md transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={connection.avatar} />
                          <AvatarFallback className="text-sm font-bold">
                            {connection.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">{connection.name}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {connection.position} at {connection.company}
                              </p>
                            </div>
                            <div className="text-right text-sm text-gray-500">
                              <div>Met at: {connection.eventName}</div>
                              <div>{connection.eventDate} at {connection.meetingTime}</div>
                            </div>
                          </div>
                          
                          <div className="flex gap-1">
                            {connection.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          
                          {connection.notes && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-2 rounded">
                              {connection.notes}
                            </p>
                          )}
                          
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>Last contact: {connection.lastContact}</span>
                            {connection.followUpReminder && (
                              <Badge variant="outline" className="text-xs">
                                Follow-up: {connection.followUpReminder}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <Button size="sm" variant="outline">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          <TranslatableText>Message</TranslatableText>
                        </Button>
                        <Button size="sm" variant="outline">
                          <Bell className="h-4 w-4 mr-2" />
                          <TranslatableText>Set Reminder</TranslatableText>
                        </Button>
                        <Button size="sm" variant="outline">
                          <Tag className="h-4 w-4 mr-2" />
                          <TranslatableText>Add Tags</TranslatableText>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <TranslatableText>Total Connections</TranslatableText>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">{connections.length}</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <TranslatableText>People you've connected with</TranslatableText>
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-green-600" />
                    <TranslatableText>Events Attended</TranslatableText>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">{events.length}</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <TranslatableText>Events you've participated in</TranslatableText>
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Tag className="h-5 w-5 text-purple-600" />
                    <TranslatableText>Top Tags</TranslatableText>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {availableTags.slice(0, 3).map((tag, index) => (
                      <div key={tag} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">{tag}</span>
                        <Badge variant="outline">{Math.floor(Math.random() * 10) + 1}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  <TranslatableText>QR Networking Settings</TranslatableText>
                </CardTitle>
                <CardDescription>
                  <TranslatableText>Customize your networking experience</TranslatableText>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Auto-save selfies</Label>
                    <p className="text-xs text-gray-500">Automatically save selfies taken during connections</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Follow-up reminders</Label>
                    <p className="text-xs text-gray-500">Set default reminder times for new connections</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Privacy settings</Label>
                    <p className="text-xs text-gray-500">Control what information is shared in your QR code</p>
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
