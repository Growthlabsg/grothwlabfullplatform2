"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Save, Eye, Calendar, Clock, MapPin, Users, DollarSign, Tag, Image, FileText, Settings } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

interface Event {
  id: number
  title: string
  description: string
  longDescription: string
  date: string
  time: string
  endTime: string
  location: string
  virtualLink: string
  maxAttendees: number
  category: string
  price: string
  currency: string
  status: "draft" | "published" | "cancelled"
  eventType: "in-person" | "online" | "hybrid"
  image: string
  tags: string[]
  requirements: string[]
  benefits: string[]
  organizer: {
    name: string
    email: string
    phone: string
  }
}

export default function EditEventPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [event, setEvent] = useState<Event | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")
  const [formData, setFormData] = useState<Partial<Event>>({})

  // Sample event data
  const sampleEvent: Event = {
    id: 1,
    title: "GrowthLab Demo Day: Cohort 4",
    description: "Join us for an exciting showcase of innovative startups from our latest accelerator cohort.",
    longDescription: "GrowthLab Demo Day is our flagship event where the most promising startups from our accelerator program showcase their innovations to investors, mentors, and the broader startup community.",
    date: "2025-04-28",
    time: "18:00",
    endTime: "21:00",
    location: "BASH, 79 Ayer Rajah Crescent, Singapore",
    virtualLink: "",
    maxAttendees: 300,
    category: "Demo Day",
    price: "0",
    currency: "SGD",
    status: "published",
    eventType: "in-person",
    image: "/startup-demo-day.png",
    tags: ["Startups", "Pitching", "Networking"],
    requirements: ["Valid ID for entry", "Business card for networking"],
    benefits: ["Network with top investors", "Discover innovative solutions"],
    organizer: {
      name: "GrowthLab Team",
      email: "events@growthlab.sg",
      phone: "+65 1234 5678"
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setEvent(sampleEvent)
      setFormData(sampleEvent)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleArrayChange = (field: string, value: string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSaving(false)
    toast({
      title: "Event Updated",
      description: "Your event has been updated successfully",
    })
  }

  const handlePublish = async () => {
    setIsSaving(true)
    
    // Simulate publish
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSaving(false)
    toast({
      title: "Event Published",
      description: "Your event is now live and visible to attendees",
    })
  }

  const handlePreview = () => {
    window.open(`/events/${event?.id}`, '_blank')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
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
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Event Not Found</h3>
            <p className="text-gray-600 mb-4">The event you're trying to edit doesn't exist.</p>
            <Button onClick={() => router.push('/events/manage')}>
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
            Edit Event
          </h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreview}
              className="p-2"
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              disabled={isSaving}
              className="p-2"
            >
              <Save className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Desktop Header */}
        <div className="hidden lg:flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Events
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Event</h1>
              <p className="text-gray-600">Update your event details and settings</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handlePreview}
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving}
            >
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? "Saving..." : "Save Draft"}
            </Button>
            <Button
              onClick={handlePublish}
              disabled={isSaving}
              className="bg-[#0F7377] hover:bg-[#0F7377]/90 text-white"
            >
              Publish Event
            </Button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>

              {/* Basic Info Tab */}
              <TabsContent value="basic" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>Essential details about your event</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="title">Event Title *</Label>
                      <Input
                        id="title"
                        value={formData.title || ""}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        placeholder="Enter event title"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Short Description *</Label>
                      <Textarea
                        id="description"
                        value={formData.description || ""}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        placeholder="Brief description of your event"
                        className="mt-1"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="longDescription">Detailed Description</Label>
                      <Textarea
                        id="longDescription"
                        value={formData.longDescription || ""}
                        onChange={(e) => handleInputChange("longDescription", e.target.value)}
                        placeholder="Detailed description of your event"
                        className="mt-1"
                        rows={5}
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor="category">Category *</Label>
                        <Select
                          value={formData.category || ""}
                          onValueChange={(value) => handleInputChange("category", value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Demo Day">Demo Day</SelectItem>
                            <SelectItem value="Networking">Networking</SelectItem>
                            <SelectItem value="Workshop">Workshop</SelectItem>
                            <SelectItem value="Pitch Night">Pitch Night</SelectItem>
                            <SelectItem value="Hackathon">Hackathon</SelectItem>
                            <SelectItem value="Fireside Chat">Fireside Chat</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="eventType">Event Type *</Label>
                        <Select
                          value={formData.eventType || ""}
                          onValueChange={(value) => handleInputChange("eventType", value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="in-person">In-Person</SelectItem>
                            <SelectItem value="online">Online</SelectItem>
                            <SelectItem value="hybrid">Hybrid</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Details Tab */}
              <TabsContent value="details" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Date & Time</CardTitle>
                    <CardDescription>When and where your event takes place</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-3">
                      <div>
                        <Label htmlFor="date">Date *</Label>
                        <Input
                          id="date"
                          type="date"
                          value={formData.date || ""}
                          onChange={(e) => handleInputChange("date", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="time">Start Time *</Label>
                        <Input
                          id="time"
                          type="time"
                          value={formData.time || ""}
                          onChange={(e) => handleInputChange("time", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="endTime">End Time *</Label>
                        <Input
                          id="endTime"
                          type="time"
                          value={formData.endTime || ""}
                          onChange={(e) => handleInputChange("endTime", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="location">Location *</Label>
                      <Input
                        id="location"
                        value={formData.location || ""}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        placeholder="Event venue or address"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="virtualLink">Virtual Link (if applicable)</Label>
                      <Input
                        id="virtualLink"
                        value={formData.virtualLink || ""}
                        onChange={(e) => handleInputChange("virtualLink", e.target.value)}
                        placeholder="Zoom, Teams, or other virtual meeting link"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="maxAttendees">Maximum Attendees</Label>
                      <Input
                        id="maxAttendees"
                        type="number"
                        value={formData.maxAttendees || ""}
                        onChange={(e) => handleInputChange("maxAttendees", parseInt(e.target.value))}
                        placeholder="Maximum number of attendees"
                        className="mt-1"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Pricing</CardTitle>
                    <CardDescription>Set your event pricing</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor="price">Price</Label>
                        <Input
                          id="price"
                          type="number"
                          value={formData.price || ""}
                          onChange={(e) => handleInputChange("price", e.target.value)}
                          placeholder="0 for free events"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="currency">Currency</Label>
                        <Select
                          value={formData.currency || ""}
                          onValueChange={(value) => handleInputChange("currency", value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="SGD">SGD</SelectItem>
                            <SelectItem value="USD">USD</SelectItem>
                            <SelectItem value="EUR">EUR</SelectItem>
                            <SelectItem value="GBP">GBP</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Event Settings</CardTitle>
                    <CardDescription>Configure your event preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="status">Event Status</Label>
                      <Select
                        value={formData.status || ""}
                        onValueChange={(value) => handleInputChange("status", value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="tags">Tags</Label>
                      <Input
                        id="tags"
                        value={formData.tags?.join(", ") || ""}
                        onChange={(e) => handleArrayChange("tags", e.target.value.split(", ").filter(tag => tag.trim()))}
                        placeholder="Enter tags separated by commas"
                        className="mt-1"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Organizer Information</CardTitle>
                    <CardDescription>Your contact details for this event</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="organizerName">Organizer Name *</Label>
                      <Input
                        id="organizerName"
                        value={formData.organizer?.name || ""}
                        onChange={(e) => handleInputChange("organizer", { ...formData.organizer, name: e.target.value })}
                        placeholder="Your name or organization"
                        className="mt-1"
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor="organizerEmail">Email *</Label>
                        <Input
                          id="organizerEmail"
                          type="email"
                          value={formData.organizer?.email || ""}
                          onChange={(e) => handleInputChange("organizer", { ...formData.organizer, email: e.target.value })}
                          placeholder="your@email.com"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="organizerPhone">Phone</Label>
                        <Input
                          id="organizerPhone"
                          value={formData.organizer?.phone || ""}
                          onChange={(e) => handleInputChange("organizer", { ...formData.organizer, phone: e.target.value })}
                          placeholder="+65 1234 5678"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Preview Tab */}
              <TabsContent value="preview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Event Preview</CardTitle>
                    <CardDescription>How your event will appear to attendees</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-xl font-bold mb-2">{formData.title || "Event Title"}</h3>
                      <p className="text-gray-600 mb-4">{formData.description || "Event description"}</p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>{formData.date || "Date"} • {formData.time || "Time"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span>{formData.location || "Location"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Users className="h-4 w-4" />
                          <span>Max {formData.maxAttendees || 0} attendees</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <DollarSign className="h-4 w-4" />
                          <span>{formData.price === "0" ? "Free" : `${formData.currency} ${formData.price}`}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Badge variant="outline">{formData.category || "Category"}</Badge>
                        <Badge variant="outline">{formData.eventType || "Type"}</Badge>
                        <Badge className={formData.status === "published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                          {formData.status || "Status"}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={handlePreview}
                  className="w-full"
                  variant="outline"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview Event
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="w-full"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? "Saving..." : "Save Draft"}
                </Button>
                <Button
                  onClick={handlePublish}
                  disabled={isSaving}
                  className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90 text-white"
                >
                  Publish Event
                </Button>
              </CardContent>
            </Card>

            {/* Event Status */}
            <Card>
              <CardHeader>
                <CardTitle>Event Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Status</span>
                    <Badge className={formData.status === "published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                      {formData.status || "Draft"}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Type</span>
                    <span className="text-sm font-medium">{formData.eventType || "In-Person"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Category</span>
                    <span className="text-sm font-medium">{formData.category || "General"}</span>
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
