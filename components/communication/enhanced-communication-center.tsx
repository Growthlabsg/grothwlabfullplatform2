"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useEnhancedCommunication } from "@/contexts/enhanced-communication-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Search,
  MessageSquare,
  Users,
  Globe,
  Briefcase,
  Megaphone,
  Phone,
  Video,
  Paperclip,
  Smile,
  Send,
  MoreVertical,
  Archive,
  Pin,
  Trash2,
  X,
  Filter,
  Plus,
  Menu,
  ArrowLeft,
  ExternalLink,
  Clock,
  Check,
} from "lucide-react"
import type { Message } from "@/types/communication"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"

// Helper component for message bubble
function MessageBubble({ message }: { message: Message }) {
  const isOwn = message.isOwn

  // Format time
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date)
  }

  // Get status icon
  const getStatusIcon = (status: Message["status"]) => {
    switch (status) {
      case "sending":
        return <Clock className="h-3.5 w-3.5 text-muted-foreground" />
      case "sent":
        return <Check className="h-3.5 w-3.5 text-muted-foreground" />
      case "delivered":
        return (
          <div className="flex">
            <Check className="h-3.5 w-3.5 text-muted-foreground" />
            <Check className="h-3.5 w-3.5 text-muted-foreground -ml-1" />
          </div>
        )
      case "read":
        return (
          <div className="flex">
            <Check className="h-3.5 w-3.5 text-primary" />
            <Check className="h-3.5 w-3.5 text-primary -ml-1" />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className={cn("flex gap-3 mb-4 group", isOwn ? "flex-row-reverse" : "")}>
      {!isOwn && (
        <Avatar className="h-8 w-8 mt-1">
          <AvatarImage src={message.sender.avatar || "/placeholder.svg"} alt={message.sender.name} />
          <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
        </Avatar>
      )}

      <div className={cn("flex flex-col max-w-[70%]", isOwn ? "items-end" : "items-start")}>
        {!isOwn && <span className="text-sm font-medium mb-1">{message.sender.name}</span>}

        <div
          className={cn(
            "rounded-lg px-3 py-2 relative group",
            isOwn ? "bg-primary text-primary-foreground" : "bg-muted",
          )}
        >
          {message.replyTo && (
            <div
              className={cn(
                "border-l-2 pl-2 mb-1 text-xs",
                isOwn ? "border-primary-foreground/30" : "border-primary/30",
              )}
            >
              <p className="font-medium">{message.replyTo.sender}</p>
              <p className="opacity-80 truncate">{message.replyTo.content}</p>
            </div>
          )}

          <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>

          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-2">
              {message.attachments.map((attachment) => (
                <div key={attachment.id} className="mt-1">
                  {attachment.type === "image" && (
                    <div className="rounded-md overflow-hidden mt-1">
                      <img
                        src={attachment.url || "/placeholder.svg"}
                        alt={attachment.name}
                        className="max-w-full h-auto rounded"
                      />
                    </div>
                  )}
                  {attachment.type === "file" && (
                    <div className="flex items-center gap-2 p-2 mt-1 bg-background/30 rounded">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate">{attachment.name}</p>
                        {attachment.size && (
                          <p className="text-xs opacity-70">{(attachment.size / 1024 / 1024).toFixed(1)} MB</p>
                        )}
                      </div>
                      <Button size="sm" variant="secondary" className="h-7 text-xs">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Open
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={cn("flex items-center mt-1 text-xs text-muted-foreground", isOwn ? "justify-end" : "")}>
          <span>{formatTime(message.timestamp)}</span>
          {isOwn && <span className="ml-1">{getStatusIcon(message.status)}</span>}
        </div>
      </div>
    </div>
  )
}

// Empty state component
function EmptyState() {
  const { setSelectedChannel, channels } = useEnhancedCommunication()

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      <div className="relative rounded-full bg-primary/10 p-6 mb-4">
        <MessageSquare className="h-8 w-8 text-primary opacity-80" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Your messages</h2>
      <p className="text-muted-foreground max-w-md mb-6">
        Connect with your network, collaborate on projects, and share ideas through direct messages or group chats.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Button onClick={() => channels.length > 0 && setSelectedChannel(channels[0])}>
          <MessageSquare className="h-4 w-4 mr-2" />
          Start a conversation
        </Button>
        <Button variant="outline">
          <Users className="h-4 w-4 mr-2" />
          Create a group
        </Button>
      </div>
    </div>
  )
}

// Main communication center component
export function EnhancedCommunicationCenter() {
  const {
    sections,
    channels,
    channelsBySectionId,
    messages,
    activeSection,
    selectedChannel,
    composerContent,
    loading,
    setActiveSection,
    setSelectedChannel,
    setComposerContent,
    sendMessage,
    loadMoreMessages,
    loadingMoreMessages,
    hasMoreMessages,
    pinChannel,
    archiveChannel,
  } = useEnhancedCommunication()

  const [searchQuery, setSearchQuery] = useState("")
  const [showPinnedOnly, setShowPinnedOnly] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  // Automatically close sidebar on mobile when a channel is selected
  useEffect(() => {
    if (selectedChannel && !isDesktop) {
      setIsSidebarOpen(false)
    }
  }, [selectedChannel, isDesktop])

  // Set default active section if none is selected
  useEffect(() => {
    if (!activeSection && sections.length > 0) {
      setActiveSection(sections[0])
    }
  }, [sections, activeSection, setActiveSection])

  // Scroll to bottom of messages when new messages arrive
  useEffect(() => {
    if (selectedChannel && messages[selectedChannel.id]?.length > 0 && !loadingMoreMessages) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    }
  }, [selectedChannel, messages, loadingMoreMessages])

  // Handle scroll to load more messages
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop } = e.currentTarget
    if (scrollTop === 0 && hasMoreMessages && !loadingMoreMessages) {
      loadMoreMessages()
    }
  }

  // Filter channels by search and pinned status
  const getFilteredChannels = () => {
    if (!activeSection) return []

    const sectionChannels = channelsBySectionId[activeSection.id] || []

    return sectionChannels.filter((channel) => {
      // Filter by search
      const matchesSearch = searchQuery
        ? channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (channel.lastMessage?.content?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
        : true

      // Filter by pinned
      const matchesPinned = showPinnedOnly ? channel.isPinned : true

      return matchesSearch && matchesPinned
    })
  }

  // Handle sending a message
  const handleSendMessage = () => {
    if (composerContent.trim() && selectedChannel) {
      sendMessage(composerContent)
    }
  }

  // Get the total unread count for a section
  const getUnreadCount = (sectionId: string) => {
    return (channelsBySectionId[sectionId] || []).reduce((count, channel) => count + channel.unreadCount, 0)
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-background">
      {/* Mobile menu toggle */}
      {selectedChannel && !isDesktop && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 z-30 lg:hidden rounded-full"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "h-full border-r transition-all duration-300 ease-in-out bg-background",
          isSidebarOpen ? "w-80 translate-x-0" : "w-0 -translate-x-full lg:w-80 lg:translate-x-0",
          isDesktop ? "relative" : "absolute z-20",
        )}
      >
        {isSidebarOpen && (
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold tracking-tight">Messages</h2>
                <div className="flex items-center gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowPinnedOnly(!showPinnedOnly)}
                    className={cn(
                      "h-8 w-8 p-0 rounded-full",
                      showPinnedOnly ? "bg-muted border-primary/20 text-primary" : "",
                    )}
                    title={showPinnedOnly ? "Show all" : "Show pinned"}
                  >
                    <Pin className={cn("h-4 w-4", showPinnedOnly ? "text-primary fill-primary/20" : "")} />
                    <span className="sr-only">{showPinnedOnly ? "Show all" : "Show pinned"}</span>
                  </Button>
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0 rounded-full" title="Filter">
                    <Filter className="h-4 w-4" />
                    <span className="sr-only">Filter</span>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0 rounded-full">
                        <Plus className="h-4 w-4" />
                        <span className="sr-only">New</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuItem>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        New message
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Users className="h-4 w-4 mr-2" />
                        Create group
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Megaphone className="h-4 w-4 mr-2" />
                        New broadcast
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search messages..."
                  className="pl-9 rounded-full py-1.5 h-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b">
              <Tabs
                defaultValue={sections[0]?.id}
                value={activeSection?.id}
                onValueChange={(value) => {
                  const section = sections.find((s) => s.id === value)
                  if (section) setActiveSection(section)
                }}
              >
                <TabsList className="w-full justify-start p-0 h-auto bg-background border-b-0 rounded-none">
                  <ScrollArea orientation="horizontal" className="w-full">
                    <div className="flex p-1 gap-1">
                      {sections.map((section) => (
                        <TabsTrigger
                          key={section.id}
                          value={section.id}
                          className="flex items-center gap-1 py-2 px-3 h-auto data-[state=active]:bg-muted rounded-md"
                        >
                          {section.id === "direct" && <MessageSquare className="h-4 w-4" />}
                          {section.id === "group" && <Users className="h-4 w-4" />}
                          {section.id === "team" && <Briefcase className="h-4 w-4" />}
                          {section.id === "community" && <Globe className="h-4 w-4" />}
                          {section.id === "broadcast" && <Megaphone className="h-4 w-4" />}
                          <span className="hidden sm:inline">{section.name}</span>
                          {getUnreadCount(section.id) > 0 && (
                            <Badge variant="secondary" className="ml-1 h-5 min-w-5 px-1">
                              {getUnreadCount(section.id)}
                            </Badge>
                          )}
                        </TabsTrigger>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsList>
              </Tabs>
            </div>

            {/* Channel list */}
            <div className="flex-1 overflow-auto">
              {loading ? (
                <div className="p-4 space-y-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3 p-2">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-40" />
                      </div>
                      <Skeleton className="h-3 w-8" />
                    </div>
                  ))}
                </div>
              ) : getFilteredChannels().length > 0 ? (
                <div className="p-2 space-y-1">
                  {getFilteredChannels().map((channel) => (
                    <div
                      key={channel.id}
                      className={cn(
                        "flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition-all duration-200 group",
                        selectedChannel?.id === channel.id
                          ? "bg-primary/5 hover:bg-primary/10 border border-primary/20"
                          : "hover:bg-muted/80 border border-transparent",
                      )}
                      onClick={() => setSelectedChannel(channel)}
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={channel.avatar || "/placeholder.svg"} alt={channel.name} />
                        <AvatarFallback>{channel.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p
                            className={cn(
                              "font-medium truncate",
                              selectedChannel?.id === channel.id ? "text-primary" : "",
                              channel.unreadCount > 0 ? "font-semibold" : "",
                            )}
                          >
                            {channel.name}
                          </p>
                          <span
                            className={cn(
                              "text-xs whitespace-nowrap",
                              channel.unreadCount > 0 ? "text-primary font-medium" : "text-muted-foreground",
                            )}
                          >
                            {channel.lastMessage?.timestamp instanceof Date
                              ? new Intl.DateTimeFormat("en-US", {
                                  hour: "numeric",
                                  minute: "numeric",
                                }).format(channel.lastMessage.timestamp)
                              : "New"}
                          </span>
                        </div>
                        <p
                          className={cn(
                            "text-sm truncate",
                            channel.unreadCount > 0 ? "text-foreground font-medium" : "text-muted-foreground",
                          )}
                        >
                          {channel.lastMessage?.content || "No messages yet"}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        {channel.unreadCount > 0 && (
                          <Badge
                            variant="default"
                            className="h-5 min-w-5 flex items-center justify-center rounded-full px-1.5 text-xs"
                          >
                            {channel.unreadCount}
                          </Badge>
                        )}
                        {channel.isPinned && <Pin className="h-3 w-3 text-muted-foreground" />}
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">More options</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation()
                              pinChannel(channel.id)
                            }}
                          >
                            <Pin className="h-4 w-4 mr-2" />
                            {channel.isPinned ? "Unpin" : "Pin"}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation()
                              archiveChannel(channel.id)
                            }}
                          >
                            <Archive className="h-4 w-4 mr-2" />
                            {channel.isArchived ? "Unarchive" : "Archive"}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()} className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                  <p className="text-muted-foreground mb-2">No channels found</p>
                  {searchQuery && (
                    <Button variant="ghost" size="sm" onClick={() => setSearchQuery("")}>
                      <X className="h-4 w-4 mr-1" />
                      Clear search
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {selectedChannel ? (
          <>
            {/* Channel header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center">
                {!isDesktop && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mr-2 lg:hidden"
                    onClick={() => setSelectedChannel(null)}
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                )}
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={selectedChannel.avatar || "/placeholder.svg"} alt={selectedChannel.name} />
                  <AvatarFallback>{selectedChannel.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold">{selectedChannel.name}</h2>
                  <p className="text-xs text-muted-foreground">
                    {selectedChannel.members} {selectedChannel.members === 1 ? "member" : "members"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Phone className="h-5 w-5" />
                        <span className="sr-only">Audio call</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Audio call</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Video className="h-5 w-5" />
                        <span className="sr-only">Video call</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Video call</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-5 w-5" />
                      <span className="sr-only">More options</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Search className="h-4 w-4 mr-2" />
                      Search in conversation
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => pinChannel(selectedChannel.id)}>
                      <Pin className="h-4 w-4 mr-2" />
                      {selectedChannel.isPinned ? "Unpin chat" : "Pin chat"}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => archiveChannel(selectedChannel.id)}>
                      <Archive className="h-4 w-4 mr-2" />
                      {selectedChannel.isArchived ? "Unarchive chat" : "Archive chat"}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete chat
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea ref={scrollAreaRef} className="flex-1 p-4" onScroll={handleScroll}>
              {/* Loading older messages indicator */}
              {loadingMoreMessages && (
                <div className="flex justify-center py-2">
                  <p className="text-sm text-muted-foreground">Loading older messages...</p>
                </div>
              )}

              {/* Messages */}
              {messages[selectedChannel.id]?.length > 0 ? (
                <div className="space-y-1">
                  {messages[selectedChannel.id]?.map((message) => (
                    <MessageBubble key={message.id} message={message} />
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                  <p className="text-muted-foreground mb-2">No messages yet</p>
                  <p className="text-sm text-muted-foreground">Start the conversation by sending a message below</p>
                </div>
              )}
            </ScrollArea>

            {/* Composer */}
            <div className="p-4 border-t">
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Paperclip className="h-5 w-5" />
                        <span className="sr-only">Attach file</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Attach file</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Smile className="h-5 w-5" />
                        <span className="sr-only">Add emoji</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Add emoji</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <div className="relative flex-1">
                  <Input
                    placeholder="Type a message..."
                    value={composerContent}
                    onChange={(e) => setComposerContent(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                  />
                </div>
                <Button onClick={handleSendMessage} disabled={!composerContent.trim()}>
                  <Send className="h-5 w-5" />
                  <span className="sr-only">Send message</span>
                </Button>
              </div>
            </div>
          </>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  )
}
