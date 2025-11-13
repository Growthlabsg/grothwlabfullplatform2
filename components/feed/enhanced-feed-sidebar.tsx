"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"
import {
  BookmarkIcon,
  Users,
  Calendar,
  ChevronDown,
  Lightbulb,
  PlusCircle,
  BarChart2,
  Building,
  Briefcase,
  GraduationCap,
  Award,
} from "lucide-react"

export function EnhancedFeedSidebar() {
  const { user } = useAuth()
  const [profileCompleteness, setProfileCompleteness] = useState(65)
  const [profileViews, setProfileViews] = useState(128)
  const [postImpressions, setPostImpressions] = useState(1024)
  const [activeGroups, setActiveGroups] = useState([
    { id: "1", name: "Fintech Founders", members: 1243, isNew: false },
    { id: "2", name: "GrowthLab Alumni", members: 876, isNew: true },
    { id: "3", name: "Singapore Startups", members: 2541, isNew: false },
  ])
  const [userInterests, setUserInterests] = useState([
    { id: "1", name: "Startup Funding", followers: 12500 },
    { id: "2", name: "AI Technology", followers: 34200 },
    { id: "3", name: "Product Development", followers: 8900 },
  ])
  const [upcomingEvents, setUpcomingEvents] = useState([
    { id: "1", name: "Demo Day - Cohort 5", date: "July 15, 2025", time: "2:00 PM", connections: 12 },
    { id: "2", name: "Fundraising Masterclass", date: "July 22, 2025", time: "10:00 AM", connections: 5 },
  ])

  // Simulate profile view count increasing over time
  useEffect(() => {
    const timer = setInterval(() => {
      setProfileViews((prev) => prev + Math.floor(Math.random() * 3))
      setPostImpressions((prev) => prev + Math.floor(Math.random() * 10))
    }, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-0">
          <div className="relative">
            <div className="h-16 bg-[#0F7377]"></div>
            <div className="absolute left-4 top-8">
              <Avatar className="h-16 w-16 border-4 border-background">
                <AvatarImage
                  src={user?.avatarUrl || "/placeholder.svg?height=64&width=64"}
                  alt={user?.displayName || user?.email || "User"}
                />
                <AvatarFallback>
                  {user?.displayName ? user.displayName.charAt(0) : user?.email ? user.email.charAt(0) : "U"}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className="mt-10 p-4 pt-2">
            <Link href="/profile" className="font-medium hover:underline">
              {user?.displayName || user?.email || "User"}
            </Link>
            <p className="text-sm text-muted-foreground">{user?.designation || "No designation"}</p>

            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span>Profile completeness</span>
                <span>{profileCompleteness}%</span>
              </div>
              <Progress value={profileCompleteness} className="h-2" />
              {profileCompleteness < 100 && (
                <Button variant="link" size="sm" className="p-0 h-auto text-xs mt-1">
                  Complete your profile
                </Button>
              )}
            </div>
          </div>
          <Separator />
          <div className="p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Profile views</span>
              <span className="font-medium">{profileViews}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Post impressions</span>
              <span className="font-medium">{postImpressions}</span>
            </div>
            <Button variant="link" size="sm" className="p-0 h-auto text-xs mt-1" asChild>
              <Link href="/dashboard">View analytics</Link>
            </Button>
          </div>
          <Separator />
          <div className="p-4">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/saved-items">
                <BookmarkIcon className="mr-2 h-4 w-4" />
                My items
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">My Groups</CardTitle>
            <Button variant="ghost" size="sm" className="h-8 px-2 text-primary">
              <PlusCircle className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="mt-2 space-y-2">
            {activeGroups.map((group) => (
              <div key={group.id} className="flex items-center justify-between">
                <Button variant="ghost" className="w-full justify-start p-2 h-auto" asChild>
                  <Link href={`/groups/${group.id}`}>
                    <Users className="mr-2 h-4 w-4" />
                    <div className="flex flex-col items-start">
                      <span className="text-sm">{group.name}</span>
                      <span className="text-xs text-muted-foreground">{group.members.toLocaleString()} members</span>
                    </div>
                    {group.isNew && (
                      <Badge className="ml-auto bg-primary/10 text-primary text-xs px-1.5 py-0.5 rounded">New</Badge>
                    )}
                  </Link>
                </Button>
              </div>
            ))}
          </div>
          <Button variant="ghost" className="mt-2 w-full justify-start text-primary" asChild>
            <Link href="/groups">
              See all groups
              <ChevronDown className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Button variant="ghost" size="sm" className="h-8 px-2 text-primary">
              <Calendar className="mr-1 h-4 w-4" />
              Create
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="mt-2 space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.id}>
                <p className="text-sm font-medium">{event.name}</p>
                <p className="text-xs text-muted-foreground">
                  {event.date} • {event.time}
                </p>
                <div className="flex mt-1 text-xs">
                  <span className="text-primary">{event.connections} connections attending</span>
                </div>
              </div>
            ))}
          </div>
          <Button variant="ghost" className="mt-2 w-full justify-start text-primary" asChild>
            <Link href="/events">
              See all events
              <ChevronDown className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Topics You Follow</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="space-y-3">
            {userInterests.map((interest) => (
              <div key={interest.id} className="flex items-center justify-between">
                <Button variant="ghost" className="w-full justify-start p-2 h-auto" asChild>
                  <Link href={`/topics/${interest.id}`}>
                    <Lightbulb className="mr-2 h-4 w-4" />
                    <div className="flex flex-col items-start">
                      <span className="text-sm">{interest.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {interest.followers.toLocaleString()} followers
                      </span>
                    </div>
                  </Link>
                </Button>
              </div>
            ))}
          </div>
          <Button variant="ghost" className="mt-2 w-full justify-start text-primary" asChild>
            <Link href="/topics">
              Discover more topics
              <ChevronDown className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Grow your network</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0 space-y-2">
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/network/connections">
              <Users className="mr-2 h-4 w-4" />
              Connections
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/network/startups">
              <Building className="mr-2 h-4 w-4" />
              Startups
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/network/investors">
              <BarChart2 className="mr-2 h-4 w-4" />
              Investors
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/network/mentors">
              <Award className="mr-2 h-4 w-4" />
              Mentors
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/network/jobs">
              <Briefcase className="mr-2 h-4 w-4" />
              Jobs
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/network/teachers">
              <GraduationCap className="mr-2 h-4 w-4" />
              Teachers
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
