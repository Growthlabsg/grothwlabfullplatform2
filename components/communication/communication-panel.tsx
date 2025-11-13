"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Star, MoreVertical, Check, CheckCheck, Clock } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Contact {
  id: string
  name: string
  avatar?: string
  lastMessage?: string
  timestamp: string
  unreadCount: number
  isPinned: boolean
  isOnline?: boolean
  platform?: "whatsapp" | "telegram" | "slack" | "linkedin" | "native"
  lastMessageStatus?: "sending" | "sent" | "delivered" | "read"
}

interface CommunicationPanelProps {
  type: "chats" | "teams" | "communities" | "broadcast" | "jobs"
}

export function CommunicationPanel({ type }: CommunicationPanelProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showPinned, setShowPinned] = useState(false)

  // Mock data - in a real app this would come from a data source
  const contacts: Contact[] = [
    {
      id: "1",
      name: "Sarah Chen",
      avatar: "/abstract-geometric-shapes.png",
      lastMessage: "Looking forward to our meeting tomorrow!",
      timestamp: "10:30 AM",
      unreadCount: 2,
      isPinned: true,
      isOnline: true,
      platform: "native",
      lastMessageStatus: "read",
    },
    {
      id: "2",
      name: "Alex Wong",
      avatar: "/abstract-geometric-aw.png",
      lastMessage: "Can you share the presentation?",
      timestamp: "Yesterday",
      unreadCount: 0,
      isPinned: false,
      isOnline: false,
      platform: "whatsapp",
      lastMessageStatus: "delivered",
    },
    {
      id: "3",
      name: "Mei Lin",
      avatar: "/machine-learning-concept.png",
      lastMessage: "I've sent the documents you requested",
      timestamp: "Yesterday",
      unreadCount: 0,
      isPinned: false,
      isOnline: true,
      platform: "telegram",
      lastMessageStatus: "read",
    },
    {
      id: "4",
      name: "Investor Connect",
      avatar: "/abstract-ms-flow.png",
      lastMessage: "David: The campaign is ready to launch",
      timestamp: "Monday",
      unreadCount: 5,
      isPinned: true,
      platform: "slack",
      lastMessageStatus: "sent",
    },
  ]

  // Filter contacts based on search and pinned status
  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (contact.lastMessage && contact.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesPinned = showPinned ? contact.isPinned : true
    return matchesSearch && matchesPinned
  })

  // Get message status icon
  const getStatusIcon = (status?: string) => {
    if (!status) return null

    switch (status) {
      case "sending":
        return <Clock className="h-3 w-3 text-muted-foreground" />
      case "sent":
        return <Check className="h-3 w-3 text-muted-foreground" />
      case "delivered":
        return <CheckCheck className="h-3 w-3 text-muted-foreground" />
      case "read":
        return <CheckCheck className="h-3 w-3 text-blue-500" />
      default:
        return null
    }
  }

  // Get platform badge
  const getPlatformBadge = (platform?: string) => {
    if (!platform || platform === "native") return null

    const colors = {
      whatsapp: "bg-green-500",
      telegram: "bg-blue-500",
      slack: "bg-purple-500",
      linkedin: "bg-blue-700",
    }

    return (
      <div
        className={`h-2 w-2 rounded-full ${colors[platform as keyof typeof colors]} absolute bottom-0 right-0 border border-white dark:border-gray-800`}
      ></div>
    )
  }

  return (
    <div className="space-y-2">
      {/* Search and filter */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          className={showPinned ? "bg-muted" : ""}
          onClick={() => setShowPinned(!showPinned)}
        >
          <Star className="h-4 w-4" />
        </Button>
      </div>

      {/* Contact list */}
      <div className="space-y-1">
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact) => (
            <div key={contact.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted cursor-pointer">
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                  <AvatarFallback>{contact.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                {contact.isOnline && (
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                )}
                {getPlatformBadge(contact.platform)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium truncate">{contact.name}</p>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{contact.timestamp}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
                  <div className="flex items-center">
                    {contact.isPinned && <Star className="h-3 w-3 text-muted-foreground mr-1" />}
                    {contact.unreadCount > 0 && (
                      <Badge className="h-5 min-w-5 flex items-center justify-center">{contact.unreadCount}</Badge>
                    )}
                    {contact.lastMessageStatus && getStatusIcon(contact.lastMessageStatus)}
                  </div>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                  <DropdownMenuItem>Mark as Read</DropdownMenuItem>
                  <DropdownMenuItem>{contact.isPinned ? "Unpin" : "Pin"}</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">Delete Chat</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
            <p>No conversations found</p>
            <p className="text-sm">Try a different search term</p>
          </div>
        )}
      </div>
    </div>
  )
}
