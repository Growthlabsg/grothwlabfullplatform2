"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Plus,
  MessageSquare,
  Users,
  Globe,
  Briefcase,
  Megaphone,
  Star,
  MoreVertical,
  Pin,
  Archive,
  Trash2,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

// Types for our chat data
interface ChatItem {
  id: string
  name: string
  avatar?: string
  lastMessage?: string
  timestamp: string
  unreadCount: number
  isPinned: boolean
  isOnline?: boolean
  participants?: { id: string; name: string; avatar?: string }[]
}

interface CommunicationSidebarProps {
  selectedCategory: string
  selectedChat: string | null
  onCategoryChange: (category: string) => void
  onChatSelect: (chatId: string, category: string) => void
  onNewChat: () => void
}

// Mock data for chats
const mockChats: Record<string, ChatItem[]> = {
  individual: [
    {
      id: "ind-1",
      name: "Sarah Chen",
      avatar: "/abstract-geometric-shapes.png",
      lastMessage: "Looking forward to our meeting tomorrow!",
      timestamp: "10:30 AM",
      unreadCount: 2,
      isPinned: true,
      isOnline: true,
    },
    {
      id: "ind-2",
      name: "Alex Wong",
      avatar: "/abstract-geometric-aw.png",
      lastMessage: "Can you share the presentation?",
      timestamp: "Yesterday",
      unreadCount: 0,
      isPinned: false,
      isOnline: false,
    },
    {
      id: "ind-3",
      name: "Mei Lin",
      avatar: "/machine-learning-concept.png",
      lastMessage: "I've sent the documents you requested",
      timestamp: "Yesterday",
      unreadCount: 0,
      isPinned: false,
      isOnline: true,
    },
  ],
  group: [
    {
      id: "grp-1",
      name: "Product Team",
      avatar: "/physical-therapy-session.png",
      lastMessage: "Alex: Let's discuss the new features",
      timestamp: "11:45 AM",
      unreadCount: 5,
      isPinned: true,
      participants: [
        { id: "u1", name: "Alex Wong", avatar: "/abstract-geometric-aw.png" },
        { id: "u2", name: "Sarah Chen", avatar: "/abstract-geometric-shapes.png" },
        { id: "u3", name: "Mei Lin", avatar: "/machine-learning-concept.png" },
      ],
    },
    {
      id: "grp-2",
      name: "Marketing Strategy",
      avatar: "/abstract-ms-flow.png",
      lastMessage: "Sarah: The campaign is ready to launch",
      timestamp: "Monday",
      unreadCount: 0,
      isPinned: false,
      participants: [
        { id: "u2", name: "Sarah Chen", avatar: "/abstract-geometric-shapes.png" },
        { id: "u4", name: "David Lee", avatar: "/abstract-dl.png" },
      ],
    },
  ],
  community: [
    {
      id: "com-1",
      name: "Startup Founders",
      avatar: "/abstract-sf.png",
      lastMessage: "David: Anyone looking for a technical co-founder?",
      timestamp: "2:15 PM",
      unreadCount: 3,
      isPinned: false,
      participants: [
        { id: "u4", name: "David Lee", avatar: "/abstract-dl.png" },
        { id: "u5", name: "Lisa Park", avatar: "/vinyl-record.png" },
        { id: "u6", name: "John Smith", avatar: "/javascript-code.png" },
        { id: "u7", name: "Emma Wilson", avatar: "/graffiti-ew.png" },
      ],
    },
  ],
  job: [
    {
      id: "job-1",
      name: "Frontend Developer Position",
      avatar: "/abstract-fd.png",
      lastMessage: "Lisa: We'd like to schedule an interview",
      timestamp: "Tuesday",
      unreadCount: 0,
      isPinned: true,
      participants: [
        { id: "u5", name: "Lisa Park", avatar: "/vinyl-record.png" },
        { id: "u8", name: "Michael Brown", avatar: "/monogram-mb.png" },
      ],
    },
  ],
  broadcast: [
    {
      id: "brd-1",
      name: "Company Announcements",
      avatar: "/california-golden-poppies.png",
      lastMessage: "CEO: We're excited to announce our new product launch!",
      timestamp: "Monday",
      unreadCount: 0,
      isPinned: false,
      participants: [
        { id: "u9", name: "CEO", avatar: "/ceo-portrait.png" },
        { id: "u10", name: "HR Director", avatar: "/hr-team-meeting.png" },
      ],
    },
  ],
}

export function CommunicationSidebar({
  selectedCategory,
  selectedChat,
  onCategoryChange,
  onChatSelect,
  onNewChat,
}: CommunicationSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showPinnedOnly, setShowPinnedOnly] = useState(false)

  // Filter chats based on search query and pinned status
  const filteredChats = Object.entries(mockChats).reduce(
    (acc, [category, chats]) => {
      acc[category] = chats.filter(
        (chat) =>
          (chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (chat.lastMessage && chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()))) &&
          (!showPinnedOnly || chat.isPinned),
      )
      return acc
    },
    {} as Record<string, ChatItem[]>,
  )

  // Get total unread count for a category
  const getUnreadCount = (category: string) => {
    return mockChats[category]?.reduce((sum, chat) => sum + chat.unreadCount, 0) || 0
  }

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "individual":
        return <MessageSquare className="h-4 w-4" />
      case "group":
        return <Users className="h-4 w-4" />
      case "community":
        return <Globe className="h-4 w-4" />
      case "job":
        return <Briefcase className="h-4 w-4" />
      case "broadcast":
        return <Megaphone className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  // Get category label
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "individual":
        return "Individual"
      case "group":
        return "Groups"
      case "community":
        return "Community"
      case "job":
        return "Job Related"
      case "broadcast":
        return "Broadcasts"
      default:
        return category
    }
  }

  return (
    <div className="flex flex-col h-full border-r shadow-sm">
      <div className="p-4 border-b bg-background/95 backdrop-filter backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold tracking-tight">Messages</h2>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowPinnedOnly(!showPinnedOnly)}
            className={cn(
              "h-8 w-8 p-0 rounded-full transition-colors",
              showPinnedOnly ? "bg-muted border-primary/30 text-primary" : "",
            )}
            aria-label={showPinnedOnly ? "Show all" : "Show pinned"}
          >
            <Star className={cn("h-4 w-4", showPinnedOnly ? "text-yellow-400 fill-yellow-400" : "")} />
            <span className="sr-only">{showPinnedOnly ? "Show all" : "Show pinned"}</span>
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search messages..."
            className="pl-9 rounded-full py-1.5 h-9 border-muted/70 focus-visible:ring-1 focus-visible:ring-offset-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs
        defaultValue={selectedCategory}
        value={selectedCategory}
        onValueChange={onCategoryChange}
        className="flex-1"
      >
        <div className="border-b">
          <TabsList className="w-full justify-start p-0 h-auto bg-background border-b-0 rounded-none">
            <ScrollArea orientation="horizontal" className="w-full">
              <div className="flex p-1 gap-1">
                <TabsTrigger
                  value="individual"
                  className="flex items-center gap-1 py-2 px-3 h-auto data-[state=active]:bg-muted rounded-md"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span className="hidden sm:inline">Individual</span>
                  {getUnreadCount("individual") > 0 && (
                    <Badge variant="secondary" className="ml-1 h-5 min-w-5 px-1 flex items-center justify-center">
                      {getUnreadCount("individual")}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger
                  value="group"
                  className="flex items-center gap-1 py-2 px-3 h-auto data-[state=active]:bg-muted rounded-md"
                >
                  <Users className="h-4 w-4" />
                  <span className="hidden sm:inline">Groups</span>
                  {getUnreadCount("group") > 0 && (
                    <Badge variant="secondary" className="ml-1 h-5 min-w-5 px-1 flex items-center justify-center">
                      {getUnreadCount("group")}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger
                  value="community"
                  className="flex items-center gap-1 py-2 px-3 h-auto data-[state=active]:bg-muted rounded-md"
                >
                  <Globe className="h-4 w-4" />
                  <span className="hidden sm:inline">Community</span>
                  {getUnreadCount("community") > 0 && (
                    <Badge variant="secondary" className="ml-1 h-5 min-w-5 px-1 flex items-center justify-center">
                      {getUnreadCount("community")}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger
                  value="job"
                  className="flex items-center gap-1 py-2 px-3 h-auto data-[state=active]:bg-muted rounded-md"
                >
                  <Briefcase className="h-4 w-4" />
                  <span className="hidden sm:inline">Job</span>
                  {getUnreadCount("job") > 0 && (
                    <Badge variant="secondary" className="ml-1 h-5 min-w-5 px-1 flex items-center justify-center">
                      {getUnreadCount("job")}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger
                  value="broadcast"
                  className="flex items-center gap-1 py-2 px-3 h-auto data-[state=active]:bg-muted rounded-md"
                >
                  <Megaphone className="h-4 w-4" />
                  <span className="hidden sm:inline">Broadcast</span>
                  {getUnreadCount("broadcast") > 0 && (
                    <Badge variant="secondary" className="ml-1 h-5 min-w-5 px-1 flex items-center justify-center">
                      {getUnreadCount("broadcast")}
                    </Badge>
                  )}
                </TabsTrigger>
              </div>
            </ScrollArea>
          </TabsList>
        </div>

        <div className="flex items-center justify-between p-3 border-b bg-muted/30">
          <h3 className="text-sm font-medium flex items-center gap-2">
            {getCategoryIcon(selectedCategory)}
            {getCategoryLabel(selectedCategory)}
          </h3>
          <Button
            size="sm"
            variant="ghost"
            onClick={onNewChat}
            className="h-8 bg-background hover:bg-muted rounded-full px-3"
          >
            <Plus className="h-4 w-4 mr-1" />
            New
          </Button>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {filteredChats[selectedCategory]?.length > 0 ? (
              (filteredChats[selectedCategory] ? filteredChats[selectedCategory].map : undefined)((chat) => (
                <div
                  key={chat.id}
                  className={cn(
                    "flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition-all duration-200 group",
                    selectedChat === chat.id
                      ? "bg-primary/5 hover:bg-primary/10 border border-primary/20"
                      : "hover:bg-muted/80 border border-transparent",
                  )}
                  onClick={() => onChatSelect(chat.id, selectedCategory)}
                >
                  <div className="relative">
                    <Avatar
                      className={cn("border-2", selectedChat === chat.id ? "border-primary/30" : "border-transparent")}
                    >
                      <AvatarImage src={chat.avatar || "/placeholder.svg"} alt={chat.name} />
                      <AvatarFallback>{chat.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    {chat.isOnline && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p
                        className={cn(
                          "font-medium truncate",
                          selectedChat === chat.id ? "text-primary" : "",
                          chat.unreadCount > 0 ? "font-semibold" : "",
                        )}
                      >
                        {chat.name}
                      </p>
                      <span
                        className={cn(
                          "text-xs whitespace-nowrap",
                          chat.unreadCount > 0 ? "text-primary font-medium" : "text-muted-foreground",
                        )}
                      >
                        {chat.timestamp}
                      </span>
                    </div>
                    <p
                      className={cn(
                        "text-sm truncate",
                        chat.unreadCount > 0 ? "text-foreground font-medium" : "text-muted-foreground",
                      )}
                    >
                      {chat.lastMessage}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {chat.unreadCount > 0 && (
                      <Badge
                        variant="default"
                        className="h-5 min-w-5 flex items-center justify-center rounded-full px-1.5 text-xs"
                      >
                        {chat.unreadCount}
                      </Badge>
                    )}
                    {chat.isPinned && <Pin className="h-3 w-3 text-muted-foreground" />}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
                      >
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">More options</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                        {chat.isPinned ? (
                          <>
                            <Pin className="h-4 w-4 mr-2" />
                            Unpin
                          </>
                        ) : (
                          <>
                            <Pin className="h-4 w-4 mr-2" />
                            Pin
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                        <Archive className="h-4 w-4 mr-2" />
                        Archive
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={(e) => e.stopPropagation()} className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                <p className="mb-2">No {getCategoryLabel(selectedCategory).toLowerCase()} chats found</p>
                <Button size="sm" variant="outline" onClick={onNewChat} className="rounded-full">
                  <Plus className="h-4 w-4 mr-1" />
                  Start a new chat
                </Button>
              </div>
            )}
          </div>
        </ScrollArea>
      </Tabs>
    </div>
  )
}
