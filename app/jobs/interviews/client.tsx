"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, Clock, Filter, Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function InterviewsClient() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data for interviews
  const upcomingInterviews = [
    {
      id: 1,
      candidate: {
        name: "Alex Wong",
        avatar: "/abstract-geometric-aw.png",
        position: "Senior Software Engineer",
      },
      date: "2023-11-15",
      time: "10:00 AM",
      duration: "45 min",
      status: "confirmed",
    },
    {
      id: 2,
      candidate: {
        name: "Sarah Chen",
        avatar: "/abstract-geometric-shapes.png",
        position: "Product Manager",
      },
      date: "2023-11-16",
      time: "2:30 PM",
      duration: "60 min",
      status: "confirmed",
    },
    {
      id: 3,
      candidate: {
        name: "Michael Tan",
        avatar: "/abstract-geometric-mt.png",
        position: "UX Designer",
      },
      date: "2023-11-17",
      time: "11:15 AM",
      duration: "45 min",
      status: "pending",
    },
  ]

  const pastInterviews = [
    {
      id: 4,
      candidate: {
        name: "Jessica Lim",
        avatar: "/intertwined-letters.png",
        position: "Marketing Specialist",
      },
      date: "2023-11-10",
      time: "9:00 AM",
      duration: "30 min",
      status: "completed",
      feedback: "Strong candidate, moving to next round",
    },
    {
      id: 5,
      candidate: {
        name: "David Ng",
        avatar: "/DNA-double-helix.png",
        position: "Data Analyst",
      },
      date: "2023-11-08",
      time: "3:00 PM",
      duration: "45 min",
      status: "completed",
      feedback: "Good technical skills, concerns about culture fit",
    },
  ]

  const filteredUpcoming = upcomingInterviews.filter(
    (interview) =>
      interview.candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      interview.candidate.position.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredPast = pastInterviews.filter(
    (interview) =>
      interview.candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      interview.candidate.position.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Interview Management</h2>
          <p className="text-muted-foreground">Schedule and manage your interviews with job candidates.</p>
        </div>
        <Button className="w-full md:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Schedule Interview
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search candidates or positions..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="w-full md:w-auto">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
        <Select defaultValue="all">
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming ({filteredUpcoming.length})</TabsTrigger>
          <TabsTrigger value="past">Past ({filteredPast.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {filteredUpcoming.length > 0 ? (
            filteredUpcoming.map((interview) => (
              <Card key={interview.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage
                          src={interview.candidate.avatar || "/placeholder.svg"}
                          alt={`${interview.candidate.name} avatar`}
                        />
                        <AvatarFallback>
                          {interview.candidate.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{interview.candidate.name}</h3>
                        <p className="text-sm text-muted-foreground">{interview.candidate.position}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center text-sm">
                        <CalendarIcon className="mr-1 h-4 w-4 text-muted-foreground" />
                        {interview.date}
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                        {interview.time} ({interview.duration})
                      </div>
                      <Badge variant={interview.status === "confirmed" ? "default" : "outline"}>
                        {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Reschedule
                      </Button>
                      <Button size="sm">Join Interview</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="flex h-40 flex-col items-center justify-center p-6">
                <p className="text-center text-muted-foreground">No upcoming interviews found.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {filteredPast.length > 0 ? (
            filteredPast.map((interview) => (
              <Card key={interview.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage
                          src={interview.candidate.avatar || "/placeholder.svg"}
                          alt={`${interview.candidate.name} avatar`}
                        />
                        <AvatarFallback>
                          {interview.candidate.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{interview.candidate.name}</h3>
                        <p className="text-sm text-muted-foreground">{interview.candidate.position}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center text-sm">
                        <CalendarIcon className="mr-1 h-4 w-4 text-muted-foreground" />
                        {interview.date}
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                        {interview.time} ({interview.duration})
                      </div>
                      <Badge variant="secondary">
                        {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        View Notes
                      </Button>
                      <Button size="sm" variant="outline">
                        View Recording
                      </Button>
                    </div>
                  </div>
                  {interview.feedback && (
                    <div className="mt-4 rounded-md bg-muted p-3 text-sm">
                      <p className="font-medium">Feedback:</p>
                      <p>{interview.feedback}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="flex h-40 flex-col items-center justify-center p-6">
                <p className="text-center text-muted-foreground">No past interviews found.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
