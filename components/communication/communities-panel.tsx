"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Plus, Users, Globe, Shield, MoreVertical } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Community {
  id: string
  name: string
  description: string
  avatar?: string
  memberCount: number
  unreadCount: number
  isVerified: boolean
  isMember: boolean
  type: "public" | "private" | "invite-only"
}

export function CommunitiesPanel() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState<"all" | "joined" | "discover">("all")

  // Mock data - in a real app this would come from a data source
  const communities: Community[] = [
    {
      id: "1",
      name: "AI Founders Network",
      description: "A community for founders building AI-powered startups",
      avatar: "/abstract-geometric-shapes.png",
      memberCount: 1250,
      unreadCount: 5,
      isVerified: true,
      isMember: true,
      type: "private",
    },
    {
      id: "2",
      name: "Seed-Stage Investor Circle",
      description: "Connect with seed-stage investors and get funding advice",
      avatar: "/abstract-ms-flow.png",
      memberCount: 850,
      unreadCount: 0,
      isVerified: true,
      isMember: true,
      type: "invite-only",
    },
    {
      id: "3",
      name: "Singapore Tech Ecosystem",
      description: "The hub for Singapore's tech startup ecosystem",
      avatar: "/singapore-startup-collaboration.png",
      memberCount: 3200,
      unreadCount: 12,
      isVerified: true,
      isMember: true,
      type: "public",
    },
    {
      id: "4",
      name: "FinTech Innovators",
      description: "Discussions on financial technology innovations",
      avatar: "/interconnected-fintech.png",
      memberCount: 1800,
      unreadCount: 0,
      isVerified: false,
      isMember: false,
      type: "public",
    },
    {
      id: "5",
      name: "Startup Mentorship Circle",
      description: "Connect with mentors and get guidance for your startup",
      avatar: "/guiding-path.png",
      memberCount: 950,
      unreadCount: 0,
      isVerified: true,
      isMember: false,
      type: "private",
    },
  ]

  // Filter communities based on search and filter
  const filteredCommunities = communities.filter((community) => {
    const matchesSearch =
      community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter =
      filter === "all" || (filter === "joined" && community.isMember) || (filter === "discover" && !community.isMember)
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-2">
      {/* Search and filter */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search communities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button variant="outline" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Filter tabs */}
      <div className="flex space-x-1 mb-2">
        <Button
          variant={filter === "all" ? "default" : "ghost"}
          size="sm"
          onClick={() => setFilter("all")}
          className="flex-1"
        >
          All
        </Button>
        <Button
          variant={filter === "joined" ? "default" : "ghost"}
          size="sm"
          onClick={() => setFilter("joined")}
          className="flex-1"
        >
          Joined
        </Button>
        <Button
          variant={filter === "discover" ? "default" : "ghost"}
          size="sm"
          onClick={() => setFilter("discover")}
          className="flex-1"
        >
          Discover
        </Button>
      </div>

      {/* Communities list */}
      <ScrollArea className="h-[300px] pr-3">
        {filteredCommunities.length > 0 ? (
          <div className="space-y-3">
            {filteredCommunities.map((community) => (
              <div key={community.id} className="flex items-start gap-3 p-2 rounded-md hover:bg-muted cursor-pointer">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={community.avatar || "/placeholder.svg"} alt={community.name} />
                  <AvatarFallback>{community.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center">
                    <p className="font-medium truncate">{community.name}</p>
                    {community.isVerified && (
                      <Badge variant="outline" className="ml-2 h-5 px-1 border-blue-500">
                        <Shield className="h-3 w-3 text-blue-500 mr-1" />
                        <span className="text-xs">Verified</span>
                      </Badge>
                    )}
                    {community.unreadCount > 0 && (
                      <Badge className="ml-2 h-5 min-w-5 flex items-center justify-center">
                        {community.unreadCount}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{community.description}</p>
                  <div className="flex items-center mt-1 text-xs text-muted-foreground">
                    <Users className="h-3 w-3 mr-1" />
                    <span>{community.memberCount.toLocaleString()} members</span>
                    <span className="mx-2">•</span>
                    <Globe className="h-3 w-3 mr-1" />
                    <span>{community.type}</span>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Community</DropdownMenuItem>
                    {community.isMember ? (
                      <>
                        <DropdownMenuItem>Mute Notifications</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Leave Community</DropdownMenuItem>
                      </>
                    ) : (
                      <DropdownMenuItem>Join Community</DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
            <p>No communities found</p>
            <p className="text-sm">Try a different search term</p>
            <Button variant="outline" size="sm" className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Create New Community
            </Button>
          </div>
        )}
      </ScrollArea>
    </div>
  )
}
