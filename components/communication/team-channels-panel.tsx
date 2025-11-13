"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Hash, Lock, Users, Bell, BellOff, MoreVertical } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Channel {
  id: string
  name: string
  description?: string
  unreadCount: number
  isPrivate: boolean
  isMuted: boolean
  memberCount: number
  lastActivity?: string
}

interface TeamSection {
  id: string
  name: string
  channels: Channel[]
}

export function TeamChannelsPanel() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data - in a real app this would come from a data source
  const teamSections: TeamSection[] = [
    {
      id: "general",
      name: "General",
      channels: [
        {
          id: "general",
          name: "general",
          description: "Company-wide announcements and work-based matters",
          unreadCount: 2,
          isPrivate: false,
          isMuted: false,
          memberCount: 45,
          lastActivity: "10 min ago",
        },
        {
          id: "random",
          name: "random",
          description: "Non-work banter and water cooler conversation",
          unreadCount: 0,
          isPrivate: false,
          isMuted: true,
          memberCount: 42,
          lastActivity: "2 hours ago",
        },
      ],
    },
    {
      id: "projects",
      name: "Projects",
      channels: [
        {
          id: "project-alpha",
          name: "project-alpha",
          description: "Discussion for Project Alpha",
          unreadCount: 5,
          isPrivate: true,
          isMuted: false,
          memberCount: 12,
          lastActivity: "Just now",
        },
        {
          id: "project-beta",
          name: "project-beta",
          description: "Discussion for Project Beta",
          unreadCount: 0,
          isPrivate: false,
          isMuted: false,
          memberCount: 18,
          lastActivity: "Yesterday",
        },
      ],
    },
    {
      id: "departments",
      name: "Departments",
      channels: [
        {
          id: "engineering",
          name: "engineering",
          description: "Engineering team discussions",
          unreadCount: 0,
          isPrivate: false,
          isMuted: false,
          memberCount: 15,
          lastActivity: "3 hours ago",
        },
        {
          id: "marketing",
          name: "marketing",
          description: "Marketing team discussions",
          unreadCount: 0,
          isPrivate: false,
          isMuted: false,
          memberCount: 8,
          lastActivity: "Yesterday",
        },
        {
          id: "leadership",
          name: "leadership",
          description: "Leadership team discussions",
          unreadCount: 3,
          isPrivate: true,
          isMuted: false,
          memberCount: 5,
          lastActivity: "1 hour ago",
        },
      ],
    },
  ]

  // Filter channels based on search
  const filteredSections = teamSections
    .map((section) => ({
      ...section,
      channels: section.channels.filter(
        (channel) =>
          channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (channel.description && channel.description.toLowerCase().includes(searchQuery.toLowerCase())),
      ),
    }))
    .filter((section) => section.channels.length > 0)

  return (
    <div className="space-y-2">
      {/* Search and add channel */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search channels..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button variant="outline" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Channel list */}
      <ScrollArea className="h-[320px] pr-3">
        {filteredSections.length > 0 ? (
          <div className="space-y-4">
            {filteredSections.map((section) => (
              <div key={section.id} className="space-y-1">
                <h3 className="text-sm font-medium text-muted-foreground px-2">{section.name}</h3>
                {section.channels.map((channel) => (
                  <div
                    key={channel.id}
                    className="flex items-center gap-2 p-2 rounded-md hover:bg-muted cursor-pointer"
                  >
                    <div className="text-muted-foreground">
                      {channel.isPrivate ? <Lock className="h-4 w-4" /> : <Hash className="h-4 w-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center">
                        <p className="font-medium truncate">{channel.name}</p>
                        {channel.unreadCount > 0 && (
                          <Badge className="ml-2 h-5 min-w-5 flex items-center justify-center">
                            {channel.unreadCount}
                          </Badge>
                        )}
                      </div>
                      {channel.description && (
                        <p className="text-xs text-muted-foreground truncate">{channel.description}</p>
                      )}
                    </div>
                    <div className="flex items-center">
                      {channel.isMuted ? (
                        <BellOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Bell className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100" />
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Users className="h-4 w-4 mr-2" />
                            View Members ({channel.memberCount})
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            {channel.isMuted ? (
                              <>
                                <Bell className="h-4 w-4 mr-2" />
                                Unmute Channel
                              </>
                            ) : (
                              <>
                                <BellOff className="h-4 w-4 mr-2" />
                                Mute Channel
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Leave Channel</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
            <p>No channels found</p>
            <p className="text-sm">Try a different search term</p>
            <Button variant="outline" size="sm" className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Create New Channel
            </Button>
          </div>
        )}
      </ScrollArea>
    </div>
  )
}
