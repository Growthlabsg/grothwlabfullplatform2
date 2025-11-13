"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CalendarIcon, Clock, Plus, Video, Users, Search, Edit, Trash2 } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { ScheduleMeetingDialog } from "./schedule-meeting-dialog"

// Sample data for scheduled meetings
const scheduledMeetings = [
  {
    id: "meeting1",
    title: "Investor Pitch",
    description: "Presentation of Q2 results and funding needs",
    date: new Date(Date.now() + 3600000 * 24 * 2), // 2 days from now
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    participants: [
      {
        id: "user1",
        name: "Sarah Wong",
        avatar: "/abstract-southwest.png",
      },
      {
        id: "user4",
        name: "Michael Zhang",
        avatar: "/Abstract Monochromatic Zenith.png",
      },
    ],
    host: {
      id: "currentUser",
      name: "You",
    },
  },
  {
    id: "meeting2",
    title: "Mentorship Session",
    description: "Monthly mentorship call with David",
    date: new Date(Date.now() + 3600000 * 24 * 5), // 5 days from now
    startTime: "2:00 PM",
    endTime: "3:00 PM",
    participants: [
      {
        id: "user2",
        name: "David Kumar",
        avatar: "/abstract-geometric-dk.png",
      },
    ],
    host: {
      id: "currentUser",
      name: "You",
    },
  },
  {
    id: "meeting3",
    title: "Partnership Discussion",
    description: "Exploring collaboration opportunities with EduSmart",
    date: new Date(Date.now() + 3600000 * 24 * 7), // 7 days from now
    startTime: "11:30 AM",
    endTime: "12:30 PM",
    participants: [
      {
        id: "user3",
        name: "Emily Nguyen",
        avatar: "/ancient-forest-path.png",
      },
      {
        id: "user5",
        name: "Lisa Lim",
        avatar: "/abstract-geometric-ll.png",
      },
    ],
    host: {
      id: "user3",
      name: "Emily Nguyen",
    },
  },
]

// Sample data for past meetings
const pastMeetings = [
  {
    id: "past1",
    title: "Team Sync",
    description: "Weekly team synchronization meeting",
    date: new Date(Date.now() - 3600000 * 24 * 2), // 2 days ago
    startTime: "9:00 AM",
    endTime: "10:00 AM",
    participants: [
      {
        id: "user1",
        name: "Sarah Wong",
        avatar: "/abstract-southwest.png",
      },
      {
        id: "user2",
        name: "David Kumar",
        avatar: "/abstract-geometric-dk.png",
      },
      {
        id: "user3",
        name: "Emily Nguyen",
        avatar: "/ancient-forest-path.png",
      },
    ],
    host: {
      id: "currentUser",
      name: "You",
    },
    recordingUrl: "/recordings/team-sync-2023-06-15.mp4",
  },
  {
    id: "past2",
    title: "Product Demo",
    description: "Demonstration of new features",
    date: new Date(Date.now() - 3600000 * 24 * 5), // 5 days ago
    startTime: "3:00 PM",
    endTime: "4:00 PM",
    participants: [
      {
        id: "user4",
        name: "Michael Zhang",
        avatar: "/Abstract Monochromatic Zenith.png",
      },
    ],
    host: {
      id: "currentUser",
      name: "You",
    },
    recordingUrl: "/recordings/product-demo-2023-06-12.mp4",
  },
]

export function MeetingsInterface() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [searchTerm, setSearchTerm] = useState("")
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false)

  // Filter meetings based on search term and selected date
  const filteredScheduledMeetings = scheduledMeetings.filter(
    (meeting) =>
      (meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        meeting.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!date || format(meeting.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")),
  )

  const filteredPastMeetings = pastMeetings.filter(
    (meeting) =>
      meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meeting.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h1 className="text-2xl font-bold">Meetings</h1>
        <p className="text-muted-foreground">Schedule and manage your video meetings</p>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-80 border-r p-4 hidden md:block">
          <div className="mb-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Upcoming Today</h3>
            {filteredScheduledMeetings.length > 0 ? (
              filteredScheduledMeetings.map((meeting) => (
                <div key={meeting.id} className="p-2 border rounded-md text-sm">
                  <div className="font-medium">{meeting.title}</div>
                  <div className="text-xs text-muted-foreground flex items-center mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    {meeting.startTime} - {meeting.endTime}
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center mt-1">
                    <Users className="h-3 w-3 mr-1" />
                    {meeting.participants.length + 1} participants
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No meetings scheduled for today.</p>
            )}
          </div>

          <div className="mt-6">
            <Button className="w-full" onClick={() => setIsScheduleDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Schedule Meeting
            </Button>
          </div>
        </div>

        <div className="flex-1">
          <div className="p-4">
            <div className="relative mb-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search meetings..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="upcoming" className="flex-1">
                  Upcoming Meetings
                </TabsTrigger>
                <TabsTrigger value="past" className="flex-1">
                  Past Meetings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="mt-4">
                <ScrollArea className="h-[calc(100vh-280px)]">
                  <div className="space-y-4">
                    {filteredScheduledMeetings.length > 0 ? (
                      filteredScheduledMeetings.map((meeting) => (
                        <Card key={meeting.id}>
                          <CardHeader className="pb-2">
                            <div className="flex justify-between">
                              <CardTitle>{meeting.title}</CardTitle>
                              <div className="flex gap-2">
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <CardDescription>{meeting.description}</CardDescription>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <div className="flex justify-between text-sm">
                              <div>
                                <div className="flex items-center mb-1">
                                  <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <span>{format(meeting.date, "PPP")}</span>
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <span>
                                    {meeting.startTime} - {meeting.endTime}
                                  </span>
                                </div>
                              </div>
                              <div>
                                <div className="flex items-center">
                                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <span>{meeting.participants.length + 1} participants</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <div className="w-full flex justify-between items-center">
                              <div className="flex -space-x-2">
                                {meeting.participants.map((participant) => (
                                  <div
                                    key={participant.id}
                                    className="h-8 w-8 rounded-full border-2 border-background overflow-hidden"
                                  >
                                    <img
                                      src={participant.avatar || "/placeholder.svg"}
                                      alt={participant.name}
                                      className="h-full w-full object-cover"
                                    />
                                  </div>
                                ))}
                              </div>
                              <Button>
                                <Video className="h-4 w-4 mr-2" />
                                Join Meeting
                              </Button>
                            </div>
                          </CardFooter>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No upcoming meetings found.</p>
                        <Button className="mt-4" onClick={() => setIsScheduleDialogOpen(true)}>
                          <Plus className="h-4 w-4 mr-2" />
                          Schedule Meeting
                        </Button>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="past" className="mt-4">
                <ScrollArea className="h-[calc(100vh-280px)]">
                  <div className="space-y-4">
                    {filteredPastMeetings.length > 0 ? (
                      filteredPastMeetings.map((meeting) => (
                        <Card key={meeting.id}>
                          <CardHeader className="pb-2">
                            <CardTitle>{meeting.title}</CardTitle>
                            <CardDescription>{meeting.description}</CardDescription>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <div className="flex justify-between text-sm">
                              <div>
                                <div className="flex items-center mb-1">
                                  <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <span>{format(meeting.date, "PPP")}</span>
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <span>
                                    {meeting.startTime} - {meeting.endTime}
                                  </span>
                                </div>
                              </div>
                              <div>
                                <div className="flex items-center">
                                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                                  <span>{meeting.participants.length + 1} participants</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <div className="w-full flex justify-between items-center">
                              <div className="flex -space-x-2">
                                {meeting.participants.map((participant) => (
                                  <div
                                    key={participant.id}
                                    className="h-8 w-8 rounded-full border-2 border-background overflow-hidden"
                                  >
                                    <img
                                      src={participant.avatar || "/placeholder.svg"}
                                      alt={participant.name}
                                      className="h-full w-full object-cover"
                                    />
                                  </div>
                                ))}
                              </div>
                              {meeting.recordingUrl && (
                                <Button variant="outline">
                                  <Video className="h-4 w-4 mr-2" />
                                  View Recording
                                </Button>
                              )}
                            </div>
                          </CardFooter>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No past meetings found.</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <ScheduleMeetingDialog isOpen={isScheduleDialogOpen} onClose={() => setIsScheduleDialogOpen(false)} />
    </div>
  )
}
