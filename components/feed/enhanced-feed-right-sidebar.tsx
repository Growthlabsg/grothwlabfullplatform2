"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { TrendingUp, Users, Info, Plus, X } from "lucide-react"
import Link from "next/link"

export function EnhancedFeedRightSidebar() {
  const [trendingTopics, setTrendingTopics] = useState([
    { id: "1", name: "StartupFunding", count: 1243, isHot: true },
    { id: "2", name: "AITech", count: 876, isHot: true },
    { id: "3", name: "SingaporeTech", count: 2541, isHot: false },
    { id: "4", name: "GrowthHacking", count: 654, isHot: false },
    { id: "5", name: "VentureCapital", count: 1876, isHot: false },
  ])

  const [suggestedConnections, setSuggestedConnections] = useState([
    {
      id: "1",
      name: "John Doe",
      role: "Investor at Sequoia Capital",
      avatar: "/abstract-colorful-swirls.png",
      mutualConnections: 12,
    },
    {
      id: "2",
      name: "Alice Smith",
      role: "Mentor & Startup Advisor",
      avatar: "/rising-tide-startups.png",
      mutualConnections: 8,
    },
    {
      id: "3",
      name: "David Chen",
      role: "Founder & CEO at TechNova",
      avatar: "/collaborative-growth.png",
      mutualConnections: 5,
    },
  ])

  const [upcomingEvents, setUpcomingEvents] = useState([
    {
      id: "1",
      title: "Startup Pitch Night",
      date: "MAY 15",
      time: "6:00 PM",
      location: "Virtual",
      attendees: 87,
    },
    {
      id: "2",
      title: "Funding Workshop",
      date: "MAY 22",
      time: "2:00 PM",
      location: "GrowthLab HQ",
      attendees: 42,
    },
  ])

  const dismissConnection = (id: string) => {
    setSuggestedConnections((prev) => prev.filter((conn) => conn.id !== id))
  }

  return (
    <div className="w-full space-y-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h3 className="font-semibold">Trending in Your Network</h3>
          </div>
          <div className="space-y-3">
            {trendingTopics.map((topic, index) => (
              <div key={topic.id} className="group">
                {index > 0 && <Separator className="my-2" />}
                <div className="flex items-start">
                  <div className="font-medium text-sm mr-2">#{index + 1}</div>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <a
                        href={`/topics/${topic.name}`}
                        className="font-medium text-sm hover:text-primary hover:underline"
                      >
                        #{topic.name}
                      </a>
                      {topic.isHot && (
                        <Badge variant="outline" className="ml-2 bg-red-50 text-red-600 hover:bg-red-50 border-red-200">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Hot
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{topic.count.toLocaleString()} posts</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button variant="link" className="px-0 mt-2 text-sm">
            View all trending topics
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            <CardTitle className="text-sm font-medium">People to Connect</CardTitle>
            <Button variant="ghost" size="icon" className="h-5 w-5 ml-auto rounded-full">
              <Info className="h-3 w-3" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="space-y-4">
            {suggestedConnections.map((connection) => (
              <div key={connection.id} className="flex items-start justify-between group">
                <div className="flex items-start gap-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={connection.avatar || "/placeholder.svg"} alt={connection.name} />
                    <AvatarFallback>{connection.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium group-hover:text-primary group-hover:underline">
                      {connection.name}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-2">{connection.role}</p>
                    <p className="text-xs text-primary mt-1">{connection.mutualConnections} mutual connections</p>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-muted-foreground"
                    onClick={() => dismissConnection(connection.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Button variant="link" className="px-0 mt-2 text-sm" asChild>
            <Link href="/network/connections">View more</Link>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-start gap-3">
                <div className="bg-muted rounded-md p-2 text-center min-w-[50px]">
                  <div className="text-xs">{event.date.split(" ")[0]}</div>
                  <div className="font-bold">{event.date.split(" ")[1]}</div>
                </div>
                <div>
                  <p className="text-sm font-medium">{event.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {event.time} • {event.location}
                  </p>
                  <p className="text-xs text-primary mt-1">{event.attendees} people attending</p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="link" className="px-0 mt-2 text-sm" asChild>
            <Link href="/events">View all events</Link>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Trending Topics</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" size="sm" className="rounded-full">
              #StartupFunding
            </Button>
            <Button variant="secondary" size="sm" className="rounded-full">
              #AITech
            </Button>
            <Button variant="secondary" size="sm" className="rounded-full">
              #SingaporeTech
            </Button>
            <Button variant="secondary" size="sm" className="rounded-full">
              #GrowthHacking
            </Button>
            <Button variant="secondary" size="sm" className="rounded-full">
              #VentureCapital
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
