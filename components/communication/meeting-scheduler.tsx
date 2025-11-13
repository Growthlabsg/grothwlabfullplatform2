"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  CalendarDays,
  Clock,
  Users,
  Video,
  Mic,
  MapPin,
  Plus,
  Search,
  X,
  AlertCircle,
  CalendarIcon,
} from "lucide-react"

interface MeetingSchedulerProps {
  className?: string
}

// Mock data for contacts
const mockContacts = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah@example.com",
    avatar: "/abstract-geometric-shapes.png",
    role: "AI Research Lead",
    company: "TechVision",
  },
  {
    id: "2",
    name: "Alex Wong",
    email: "alex@example.com",
    avatar: "/abstract-geometric-aw.png",
    role: "Founder & CEO",
    company: "FinTech Flow",
  },
  {
    id: "3",
    name: "Mei Lin",
    email: "mei@example.com",
    avatar: "/machine-learning-concept.png",
    role: "Investment Partner",
    company: "Horizon Ventures",
  },
  {
    id: "4",
    name: "David Lee",
    email: "david@example.com",
    avatar: "/thoughtful-portrait.png",
    role: "CTO",
    company: "GreenPath Logistics",
  },
  {
    id: "5",
    name: "Jessica Tan",
    email: "jessica@example.com",
    avatar: "/abstract-sgi.png",
    role: "Marketing Director",
    company: "Global Brands",
  },
]

// Mock data for meeting templates
const meetingTemplates = [
  {
    id: "1",
    name: "Quick Catch-up",
    duration: 15,
    description: "A brief 15-minute meeting to discuss quick updates",
    videoEnabled: true,
    audioEnabled: true,
  },
  {
    id: "2",
    name: "Project Sync",
    duration: 30,
    description: "Regular project sync to discuss progress and blockers",
    videoEnabled: true,
    audioEnabled: true,
  },
  {
    id: "3",
    name: "Investor Pitch",
    duration: 60,
    description: "Formal presentation to potential investors",
    videoEnabled: true,
    audioEnabled: true,
  },
  {
    id: "4",
    name: "Mentorship Session",
    duration: 45,
    description: "One-on-one mentorship and guidance session",
    videoEnabled: true,
    audioEnabled: true,
  },
]

// Mock data for scheduled meetings
const scheduledMeetings = [
  {
    id: "1",
    title: "Project Kickoff",
    date: new Date(Date.now() + 86400000), // Tomorrow
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    attendees: [mockContacts[0], mockContacts[1]],
    location: "Virtual",
    description: "Initial kickoff meeting for the new project",
  },
  {
    id: "2",
    title: "Investor Update",
    date: new Date(Date.now() + 172800000), // Day after tomorrow
    startTime: "2:00 PM",
    endTime: "3:00 PM",
    attendees: [mockContacts[2]],
    location: "Virtual",
    description: "Monthly update on project progress and metrics",
  },
  {
    id: "3",
    title: "Team Sync",
    date: new Date(Date.now() + 259200000), // 3 days from now
    startTime: "9:30 AM",
    endTime: "10:00 AM",
    attendees: [mockContacts[0], mockContacts[1], mockContacts[3]],
    location: "Virtual",
    description: "Weekly team sync to discuss progress and blockers",
  },
]

export function MeetingScheduler({ className }: MeetingSchedulerProps) {
  const [activeTab, setActiveTab] = useState("schedule")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedContacts, setSelectedContacts] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [meetingTitle, setMeetingTitle] = useState("")
  const [meetingDescription, setMeetingDescription] = useState("")
  const [startTime, setStartTime] = useState("09:00")
  const [endTime, setEndTime] = useState("09:30")
  const [meetingType, setMeetingType] = useState("virtual")
  const [location, setLocation] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  // Filter contacts based on search query
  const filteredContacts = mockContacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.role.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Toggle contact selection
  const toggleContactSelection = (contactId: string) => {
    if (selectedContacts.includes(contactId)) {
      setSelectedContacts(selectedContacts.filter((id) => id !== contactId))
    } else {
      setSelectedContacts([...selectedContacts, contactId])
    }
  }

  // Apply template
  const applyTemplate = (templateId: string) => {
    const template = meetingTemplates.find((t) => t.id === templateId)
    if (template) {
      setSelectedTemplate(templateId)
      setMeetingTitle(template.name)
      setMeetingDescription(template.description)

      // Calculate end time based on duration
      const start = new Date()
      start.setHours(Number.parseInt(startTime.split(":")[0]), Number.parseInt(startTime.split(":")[1]), 0, 0)
      const end = new Date(start.getTime() + template.duration * 60000)
      const formattedEndTime = `${end.getHours().toString().padStart(2, "0")}:${end.getMinutes().toString().padStart(2, "0")}`
      setEndTime(formattedEndTime)
    }
  }

  // Schedule meeting
  const scheduleMeeting = () => {
    // In a real app, this would send the meeting data to the server
    console.log("Scheduling meeting:", {
      title: meetingTitle,
      description: meetingDescription,
      date: selectedDate,
      startTime,
      endTime,
      attendees: selectedContacts.map((id) => mockContacts.find((contact) => contact.id === id)),
      type: meetingType,
      location: meetingType === "in-person" ? location : "Virtual",
    })

    // Reset form
    setMeetingTitle("")
    setMeetingDescription("")
    setSelectedDate(new Date())
    setStartTime("09:00")
    setEndTime("09:30")
    setSelectedContacts([])
    setMeetingType("virtual")
    setLocation("")
    setSelectedTemplate(null)

    // Switch to upcoming tab
    setActiveTab("upcoming")
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center">
          <CalendarDays className="h-5 w-5 mr-2" />
          Meeting Scheduler
        </h2>
      </div>

      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="px-4 border-b">
          <TabsList className="w-full justify-start p-0 h-auto bg-transparent border-b-0">
            <TabsTrigger value="schedule" className="text-sm py-2 px-4 h-10 data-[state=active]:bg-transparent">
              Schedule Meeting
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="text-sm py-2 px-4 h-10 data-[state=active]:bg-transparent">
              Upcoming Meetings
            </TabsTrigger>
            <TabsTrigger value="templates" className="text-sm py-2 px-4 h-10 data-[state=active]:bg-transparent">
              Templates
            </TabsTrigger>
          </TabsList>
        </div>

        <ScrollArea className="flex-1">
          <TabsContent value="schedule" className="p-4 m-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Meeting Details</CardTitle>
                    <CardDescription>Fill in the details for your meeting</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="meeting-title">Meeting Title</Label>
                      <Input
                        id="meeting-title"
                        placeholder="Enter meeting title"
                        value={meetingTitle}
                        onChange={(e) => setMeetingTitle(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="meeting-description">Description (Optional)</Label>
                      <Textarea
                        id="meeting-description"
                        placeholder="Enter meeting description"
                        value={meetingDescription}
                        onChange={(e) => setMeetingDescription(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="border rounded-md"
                        disabled={(date) => date < new Date()}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="start-time">Start Time</Label>
                        <Input
                          id="start-time"
                          type="time"
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="end-time">End Time</Label>
                        <Input id="end-time" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="meeting-type">Meeting Type</Label>
                      <Select value={meetingType} onValueChange={setMeetingType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select meeting type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="virtual">
                            <div className="flex items-center">
                              <Video className="h-4 w-4 mr-2" />
                              Virtual Meeting
                            </div>
                          </SelectItem>
                          <SelectItem value="in-person">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-2" />
                              In-Person Meeting
                            </div>
                          </SelectItem>
                          <SelectItem value="phone">
                            <div className="flex items-center">
                              <Mic className="h-4 w-4 mr-2" />
                              Phone Call
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {meetingType === "in-person" && (
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          placeholder="Enter meeting location"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label>Meeting Templates</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {meetingTemplates.map((template) => (
                          <Button
                            key={template.id}
                            variant={selectedTemplate === template.id ? "default" : "outline"}
                            className="justify-start h-auto py-2"
                            onClick={() => applyTemplate(template.id)}
                          >
                            <div className="text-left">
                              <p className="font-medium">{template.name}</p>
                              <p className="text-xs text-muted-foreground">{template.duration} min</p>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Invite Attendees</CardTitle>
                    <CardDescription>Select people to invite to your meeting</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search contacts..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      {selectedContacts.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {selectedContacts.map((contactId) => {
                            const contact = mockContacts.find((c) => c.id === contactId)
                            if (!contact) return null
                            return (
                              <Badge key={contact.id} variant="secondary" className="pl-1 pr-2 py-1">
                                <Avatar className="h-5 w-5 mr-1">
                                  <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                                  <AvatarFallback>{contact.name.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                {contact.name}
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-4 w-4 ml-1"
                                  onClick={() => toggleContactSelection(contact.id)}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </Badge>
                            )
                          })}
                        </div>
                      )}

                      <ScrollArea className="h-[300px] border rounded-md p-2">
                        {filteredContacts.length > 0 ? (
                          <div className="space-y-2">
                            {filteredContacts.map((contact) => (
                              <div
                                key={contact.id}
                                className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted cursor-pointer"
                                onClick={() => toggleContactSelection(contact.id)}
                              >
                                <Checkbox
                                  checked={selectedContacts.includes(contact.id)}
                                  onCheckedChange={() => toggleContactSelection(contact.id)}
                                />
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                                  <AvatarFallback>{contact.name.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium">{contact.name}</p>
                                  <p className="text-xs text-muted-foreground truncate">{contact.email}</p>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {contact.role}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full text-center p-4">
                            <Users className="h-10 w-10 text-muted-foreground mb-2 opacity-20" />
                            <p className="text-muted-foreground">No contacts found</p>
                          </div>
                        )}
                      </ScrollArea>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Meeting Summary</CardTitle>
                    <CardDescription>Review your meeting details before scheduling</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {meetingTitle ? (
                      <div>
                        <h3 className="text-lg font-semibold">{meetingTitle}</h3>
                        {meetingDescription && <p className="text-sm text-muted-foreground">{meetingDescription}</p>}

                        <div className="mt-4 space-y-2">
                          <div className="flex items-center">
                            <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>
                              {selectedDate?.toLocaleDateString(undefined, {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>
                              {startTime} - {endTime}
                            </span>
                          </div>
                          <div className="flex items-center">
                            {meetingType === "virtual" ? (
                              <Video className="h-4 w-4 mr-2 text-muted-foreground" />
                            ) : meetingType === "in-person" ? (
                              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                            ) : (
                              <Mic className="h-4 w-4 mr-2 text-muted-foreground" />
                            )}
                            <span>
                              {meetingType === "virtual"
                                ? "Virtual Meeting"
                                : meetingType === "in-person"
                                  ? `In-Person: ${location || "Location not specified"}`
                                  : "Phone Call"}
                            </span>
                          </div>
                          <div className="flex items-start">
                            <Users className="h-4 w-4 mr-2 text-muted-foreground mt-1" />
                            <div>
                              <span className="block mb-1">
                                {selectedContacts.length} attendee{selectedContacts.length !== 1 ? "s" : ""}
                              </span>
                              {selectedContacts.length > 0 && (
                                <div className="flex -space-x-2">
                                  {selectedContacts.slice(0, 5).map((contactId) => {
                                    const contact = mockContacts.find((c) => c.id === contactId)
                                    if (!contact) return null
                                    return (
                                      <Avatar key={contact.id} className="h-6 w-6 border-2 border-background">
                                        <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                                        <AvatarFallback>{contact.name.substring(0, 2)}</AvatarFallback>
                                      </Avatar>
                                    )
                                  })}
                                  {selectedContacts.length > 5 && (
                                    <div className="flex items-center justify-center h-6 w-6 rounded-full bg-muted text-xs">
                                      +{selectedContacts.length - 5}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center p-4">
                        <AlertCircle className="h-10 w-10 text-muted-foreground mb-2 opacity-20" />
                        <p className="text-muted-foreground">Fill in meeting details to see a summary</p>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      onClick={scheduleMeeting}
                      disabled={!meetingTitle || !selectedDate || selectedContacts.length === 0}
                    >
                      Schedule Meeting
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="p-4 m-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scheduledMeetings.map((meeting) => (
                <Card key={meeting.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{meeting.title}</CardTitle>
                        <CardDescription>
                          {meeting.date.toLocaleDateString(undefined, {
                            weekday: "long",
                            month: "short",
                            day: "numeric",
                          })}
                          , {meeting.startTime} - {meeting.endTime}
                        </CardDescription>
                      </div>
                      <Badge variant="outline">{meeting.location}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{meeting.description}</p>
                    <div className="flex items-start">
                      <Users className="h-4 w-4 mr-2 text-muted-foreground mt-1" />
                      <div>
                        <span className="block text-sm mb-1">
                          {meeting.attendees.length} attendee{meeting.attendees.length !== 1 ? "s" : ""}
                        </span>
                        <div className="flex -space-x-2">
                          {meeting.attendees.map((attendee) => (
                            <Avatar key={attendee.id} className="h-6 w-6 border-2 border-background">
                              <AvatarImage src={attendee.avatar || "/placeholder.svg"} alt={attendee.name} />
                              <AvatarFallback>{attendee.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="default" size="sm">
                      Join Meeting
                    </Button>
                  </CardFooter>
                </Card>
              ))}

              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center h-[220px] text-center p-6">
                  <Plus className="h-10 w-10 text-muted-foreground mb-2 opacity-20" />
                  <h3 className="font-medium mb-1">Schedule a New Meeting</h3>
                  <p className="text-sm text-muted-foreground mb-4">Create a new meeting with your team or clients</p>
                  <Button variant="outline" onClick={() => setActiveTab("schedule")}>
                    <Plus className="h-4 w-4 mr-2" />
                    New Meeting
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="templates" className="p-4 m-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {meetingTemplates.map((template) => (
                <Card key={template.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{template.name}</CardTitle>
                      <Badge variant="outline">{template.duration} min</Badge>
                    </div>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Video
                          className={`h-4 w-4 mr-1 ${template.videoEnabled ? "text-green-500" : "text-muted-foreground"}`}
                        />
                        <span className="text-sm">{template.videoEnabled ? "Video" : "No Video"}</span>
                      </div>
                      <div className="flex items-center">
                        <Mic
                          className={`h-4 w-4 mr-1 ${template.audioEnabled ? "text-green-500" : "text-muted-foreground"}`}
                        />
                        <span className="text-sm">{template.audioEnabled ? "Audio" : "No Audio"}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        applyTemplate(template.id)
                        setActiveTab("schedule")
                      }}
                    >
                      Use Template
                    </Button>
                  </CardFooter>
                </Card>
              ))}

              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center h-[180px] text-center p-6">
                  <Plus className="h-10 w-10 text-muted-foreground mb-2 opacity-20" />
                  <h3 className="font-medium mb-1">Create New Template</h3>
                  <p className="text-sm text-muted-foreground mb-4">Save time by creating reusable meeting templates</p>
                  <Button variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    New Template
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  )
}
