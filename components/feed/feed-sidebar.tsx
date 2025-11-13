"use client"

import type { User } from "@/types/auth"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { BookmarkIcon, Users, Calendar, ChevronDown, Lightbulb, PlusCircle } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Progress } from "@/components/ui/progress"

interface FeedSidebarProps {
  user: User
}

export function FeedSidebar({ user }: FeedSidebarProps) {
  const [profileCompleteness, setProfileCompleteness] = useState(65)
  const [userGroups, setUserGroups] = useState([
    { id: "1", name: "Fintech Founders", members: 1243, isNew: false },
    { id: "2", name: "GrowthLab Alumni", members: 876, isNew: true },
    { id: "3", name: "Singapore Startups", members: 2541, isNew: false },
  ])

  const [userInterests, setUserInterests] = useState([
    { id: "1", name: "Startup Funding", followers: 12500 },
    { id: "2", name: "AI Technology", followers: 34200 },
    { id: "3", name: "Product Development", followers: 8900 },
  ])

  // Simulate profile view count increasing over time
  const [profileViews, setProfileViews] = useState(128)
  const [postImpressions, setPostImpressions] = useState(1024)

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
                  src={user.avatarUrl || "/placeholder.svg?height=64&width=64"}
                  alt={user.displayName || user.email}
                />
                <AvatarFallback>{user.displayName ? user.displayName.charAt(0) : user.email.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className="mt-10 p-4 pt-2">
            <Link href="/profile" className="font-medium hover:underline">
              {user.displayName || user.email}
            </Link>
            <p className="text-sm text-muted-foreground">{user.designation || "No designation"}</p>

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
            <Button variant="link" size="sm" className="p-0 h-auto text-xs mt-1">
              View analytics
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
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">My Groups</h3>
            <Button variant="ghost" size="sm" className="h-8 px-2 text-primary">
              <PlusCircle className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-2 space-y-2">
            {userGroups.map((group) => (
              <div key={group.id} className="flex items-center justify-between">
                <Button variant="ghost" className="w-full justify-start p-2 h-auto" asChild>
                  <Link href={`/groups/${group.id}`}>
                    <Users className="mr-2 h-4 w-4" />
                    <div className="flex flex-col items-start">
                      <span className="text-sm">{group.name}</span>
                      <span className="text-xs text-muted-foreground">{group.members.toLocaleString()} members</span>
                    </div>
                    {group.isNew && (
                      <span className="ml-auto bg-primary/10 text-primary text-xs px-1.5 py-0.5 rounded">New</span>
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
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Upcoming Events</h3>
            <Button variant="ghost" size="sm" className="h-8 px-2 text-primary">
              <Calendar className="mr-1 h-4 w-4" />
              Create
            </Button>
          </div>
          <div className="mt-2 space-y-3">
            <div>
              <p className="text-sm font-medium">Demo Day - Cohort 5</p>
              <p className="text-xs text-muted-foreground">July 15, 2025 • 2:00 PM</p>
              <div className="flex mt-1 text-xs">
                <span className="text-primary">12 connections attending</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">Fundraising Masterclass</p>
              <p className="text-xs text-muted-foreground">July 22, 2025 • 10:00 AM</p>
              <div className="flex mt-1 text-xs">
                <span className="text-primary">5 connections attending</span>
              </div>
            </div>
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
        <CardContent className="p-4">
          <h3 className="font-medium mb-2">Topics You Follow</h3>
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
    </div>
  )
}
