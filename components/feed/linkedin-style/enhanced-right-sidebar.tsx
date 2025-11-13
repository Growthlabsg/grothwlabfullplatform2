"use client"

import { useState } from "react"
import Link from "next/link"
import { Building, Plus, User, UserPlus, Globe, BookOpen } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ProfileEnhancementCard } from "@/components/profile/profile-enhancement-card"
import { CreateBusinessPageDialog } from "@/components/business/create-business-page-dialog"
import { useAuth } from "@/contexts/auth-context"

export function EnhancedRightSidebar() {
  const { user } = useAuth()
  const [showCreateBusinessDialog, setShowCreateBusinessDialog] = useState(false)

  return (
    <div className="w-full md:w-72 lg:w-80 xl:w-96 space-y-4">
      {/* Profile Card */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Your Profile</CardTitle>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/profile">
                <User className="h-4 w-4" />
                <span className="sr-only">View profile</span>
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pb-3">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user?.avatarUrl || "/placeholder.svg"} alt={user?.displayName || "User"} />
              <AvatarFallback>{user?.displayName?.[0] || "U"}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{user?.displayName || "Guest User"}</p>
              <p className="text-sm text-muted-foreground line-clamp-1">{user?.designation || "No headline"}</p>
            </div>
          </div>

          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Profile views</span>
              <span className="font-medium">142</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Connection requests</span>
              <span className="font-medium">3</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <Button variant="outline" size="sm" className="w-full" asChild>
            <Link href="/profile/edit">Edit Profile</Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Profile Enhancement Card */}
      <ProfileEnhancementCard />

      {/* Business Pages Card */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Your Business Pages</CardTitle>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/business">
                <Building className="h-4 w-4" />
                <span className="sr-only">View business pages</span>
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pb-3">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/images/GrowthLab Icon (1).png" alt="GrowthLab" />
                <AvatarFallback>GL</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">GrowthLab</p>
                <p className="text-xs text-muted-foreground">5,280 followers</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/abstract-geometric-shapes.png" alt="Tech Innovators Hub" />
                <AvatarFallback>TI</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">Tech Innovators Hub</p>
                <p className="text-xs text-muted-foreground">1,245 followers</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <Button variant="outline" size="sm" className="w-full" onClick={() => setShowCreateBusinessDialog(true)}>
            <Plus className="mr-2 h-3 w-3" />
            Create Business Page
          </Button>
        </CardFooter>
      </Card>

      {/* Network Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Grow your network</CardTitle>
          <CardDescription>People you may know in Singapore</CardDescription>
        </CardHeader>
        <CardContent className="pb-3">
          <div className="space-y-4">
            {[
              {
                name: "Sarah Wong",
                headline: "Product Manager at TechCorp",
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
                mutual: 12,
              },
              {
                name: "David Lim",
                headline: "Software Engineer at StartupX",
                avatar: "/tech-professional.png",
                mutual: 8,
              },
              {
                name: "Michelle Tan",
                headline: "Marketing Director at AgencyPlus",
                avatar: "/marketing-professional.png",
                mutual: 5,
              },
            ].map((person, i) => (
              <div key={i} className="flex space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={person.avatar || "/placeholder.svg"} alt={person.name} />
                  <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{person.name}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">{person.headline}</p>
                  <p className="text-xs text-muted-foreground mt-1">{person.mutual} mutual connections</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    <UserPlus className="mr-2 h-3 w-3" />
                    Connect
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <Button variant="link" size="sm" className="w-full" asChild>
            <Link href="/network">View all recommendations</Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Events Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent className="pb-3">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <h3 className="font-medium text-sm">Startup Workshop Series</h3>
                <Badge variant="outline" className="text-xs">
                  3 days
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">Learn essential strategies for early-stage startups</p>
              <div className="flex items-center text-xs text-muted-foreground">
                <Globe className="mr-1 h-3 w-3" />
                <span>Online Event</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between">
                <h3 className="font-medium text-sm">Tech Meetup: AI for Startups</h3>
                <Badge variant="outline" className="text-xs">
                  1 week
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">Explore how AI can transform your startup</p>
              <div className="flex items-center text-xs text-muted-foreground">
                <Building className="mr-1 h-3 w-3" />
                <span>GrowthLab HQ, Singapore</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <Button variant="link" size="sm" className="w-full" asChild>
            <Link href="/events">View all events</Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Resources Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Resources for You</CardTitle>
        </CardHeader>
        <CardContent className="pb-3">
          <div className="space-y-3">
            <Link href="/resources/legal-documents" className="block group">
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 p-2 rounded-md group-hover:bg-primary/20 transition-colors">
                  <BookOpen className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm group-hover:text-primary transition-colors">
                    Startup Legal Templates
                  </p>
                  <p className="text-xs text-muted-foreground">Free legal documents for your business</p>
                </div>
              </div>
            </Link>

            <Link href="/resources/pitch-deck" className="block group">
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 p-2 rounded-md group-hover:bg-primary/20 transition-colors">
                  <BookOpen className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm group-hover:text-primary transition-colors">Pitch Deck Guide</p>
                  <p className="text-xs text-muted-foreground">Create a compelling investor presentation</p>
                </div>
              </div>
            </Link>
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <Button variant="link" size="sm" className="w-full" asChild>
            <Link href="/resources">View all resources</Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Create Business Page Dialog */}
      <CreateBusinessPageDialog open={showCreateBusinessDialog} onOpenChange={setShowCreateBusinessDialog} />
    </div>
  )
}
