"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Plus, Users, Calendar, CheckCheck, MoreVertical } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"

interface BroadcastList {
  id: string
  name: string
  description?: string
  avatar?: string
  recipientCount: number
  lastMessage?: string
  lastSent?: string
  scheduled?: {
    nextDate: string
    frequency: "once" | "daily" | "weekly" | "monthly"
  }
}

export function BroadcastPanel() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data - in a real app this would come from a data source
  const broadcastLists: BroadcastList[] = [
    {
      id: "1",
      name: "Team Announcements",
      description: "Important announcements for the entire team",
      avatar: "/abstract-geometric-shapes.png",
      recipientCount: 45,
      lastMessage: "Meeting rescheduled to 3pm tomorrow",
      lastSent: "Yesterday",
    },
    {
      id: "2",
      name: "Investor Updates",
      description: "Monthly updates for our investors",
      avatar: "/abstract-ms-flow.png",
      recipientCount: 12,
      lastMessage: "Q2 Financial Report and Milestones",
      lastSent: "Last month",
      scheduled: {
        nextDate: "Jul 1, 2023",
        frequency: "monthly",
      },
    },
    {
      id: "3",
      name: "Product Release Notes",
      description: "Updates about new product features and releases",
      avatar: "/interconnected-blocks.png",
      recipientCount: 1250,
      lastMessage: "New feature release: AI-powered recommendations",
      lastSent: "2 weeks ago",
      scheduled: {
        nextDate: "Next Monday",
        frequency: "weekly",
      },
    },
    {
      id: "4",
      name: "Community Newsletter",
      description: "Newsletter for our community members",
      avatar: "/singapore-startup-collaboration.png",
      recipientCount: 3200,
      lastMessage: "Upcoming events and community highlights",
      lastSent: "Last week",
      scheduled: {
        nextDate: "Next Friday",
        frequency: "weekly",
      },
    },
  ]

  // Filter broadcast lists based on search
  const filteredBroadcasts = broadcastLists.filter(
    (broadcast) =>
      broadcast.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (broadcast.description && broadcast.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (broadcast.lastMessage && broadcast.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="space-y-2">
      {/* Search and add broadcast */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search broadcasts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button variant="outline" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Broadcast lists */}
      <ScrollArea className="h-[320px] pr-3">
        {filteredBroadcasts.length > 0 ? (
          <div className="space-y-3">
            {filteredBroadcasts.map((broadcast) => (
              <div key={broadcast.id} className="flex items-start gap-3 p-2 rounded-md hover:bg-muted cursor-pointer">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={broadcast.avatar || "/placeholder.svg"} alt={broadcast.name} />
                  <AvatarFallback>{broadcast.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium truncate">{broadcast.name}</p>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {broadcast.lastSent && (
                        <span className="flex items-center">
                          <span>Sent: {broadcast.lastSent}</span>
                          <CheckCheck className="h-3 w-3 ml-1 text-green-500" />
                        </span>
                      )}
                    </span>
                  </div>
                  {broadcast.description && (
                    <p className="text-xs text-muted-foreground truncate">{broadcast.description}</p>
                  )}
                  {broadcast.lastMessage && <p className="text-sm truncate mt-1">{broadcast.lastMessage}</p>}
                  <div className="flex items-center mt-1 text-xs text-muted-foreground">
                    <Users className="h-3 w-3 mr-1" />
                    <span>{broadcast.recipientCount.toLocaleString()} recipients</span>
                    {broadcast.scheduled && (
                      <>
                        <span className="mx-2">•</span>
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>
                          Next: {broadcast.scheduled.nextDate} ({broadcast.scheduled.frequency})
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit Broadcast List</DropdownMenuItem>
                    <DropdownMenuItem>View Recipients</DropdownMenuItem>
                    <DropdownMenuItem>Send New Broadcast</DropdownMenuItem>
                    {broadcast.scheduled && <DropdownMenuItem>Edit Schedule</DropdownMenuItem>}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">Delete Broadcast List</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
            <p>No broadcast lists found</p>
            <p className="text-sm">Try a different search term</p>
            <Button variant="outline" size="sm" className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Create New Broadcast List
            </Button>
          </div>
        )}
      </ScrollArea>
    </div>
  )
}
