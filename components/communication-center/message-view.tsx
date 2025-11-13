"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { type Channel, type Section, type Message as MessageType, PlatformType } from "@/types/communication"
import { useCommunication } from "@/contexts/communication-context"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Message } from "./message"
import { MessageComposer } from "./message-composer"
import { ChannelHeader } from "./channel-header"
import {
  Phone,
  Video,
  Search,
  Calendar,
  Languages,
  Download,
  MoreVertical,
  MessageSquare,
  Info,
  Flag,
  Users,
  ImageIcon,
  FileText,
  Star,
  Volume2,
  VolumeX,
  Bell,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { SearchDialog } from "./dialogs/search-dialog"
import { ExportChatDialog } from "./dialogs/export-chat-dialog"
import { ScheduleMessageDialog } from "./dialogs/schedule-message-dialog"
import { TranslateDialog } from "./dialogs/translate-dialog"
import { Badge } from "@/components/ui/badge"

interface MessageViewProps {
  channel: Channel
  section: Section | null
}

export function MessageView({ channel, section }: MessageViewProps) {
  const { messages, sendMessage, markAsRead } = useCommunication()

  const [messageInput, setMessageInput] = useState("")
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false)
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false)
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false)
  const [isTranslateDialogOpen, setIsTranslateDialogOpen] = useState(false)
  const [messageToTranslate, setMessageToTranslate] = useState<MessageType | null>(null)
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(true)
  const [newMessageCount, setNewMessageCount] = useState(0)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const channelMessages = messages[channel.id] || []

  const isPlatformChannel = channel.platform !== PlatformType.INTERNAL

  // Scroll to bottom on initial load
  useEffect(() => {
    scrollToBottom()
    if (channel.unread > 0) {
      markAsRead(channel.id)
    }
  }, [channel.id])

  // Track when new messages arrive
  useEffect(() => {
    if (channelMessages.length > 0 && !isScrolledToBottom) {
      setNewMessageCount((prev) => prev + 1)
    } else if (isScrolledToBottom) {
      scrollToBottom()
      setNewMessageCount(0)
    }
  }, [channelMessages.length, isScrolledToBottom])

  // Handle scroll events to detect if at bottom
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (scrollAreaRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
      const atBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 10
      setIsScrolledToBottom(atBottom)

      if (atBottom && newMessageCount > 0) {
        setNewMessageCount(0)
      }
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    setIsScrolledToBottom(true)
    setNewMessageCount(0)
  }

  // Handle sending a message
  const handleSendMessage = () => {
    if (!messageInput.trim()) return

    sendMessage(channel.id, messageInput)
    setMessageInput("")
    // Ensure we scroll to the bottom after sending
    setTimeout(scrollToBottom, 100)
  }

  // Handle keydown in message input
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Open translate dialog for a message
  const handleTranslateMessage = (message: MessageType) => {
    setMessageToTranslate(message)
    setIsTranslateDialogOpen(true)
  }

  // Format date for messages
  const formatMessageDate = (messages: MessageType[]) => {
    if (messages.length === 0) return null

    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    const todayStr = today.toDateString()
    const yesterdayStr = yesterday.toDateString()

    const dates = messages
      .filter((msg, i, arr) => {
        if (i === 0) return true

        const prevDate = new Date(arr[i - 1].timestamp).toDateString()
        const currDate = new Date(msg.timestamp).toDateString()

        return prevDate !== currDate
      })
      .map((msg) => {
        const msgDate = new Date(msg.timestamp)
        const dateStr = msgDate.toDateString()

        if (dateStr === todayStr) {
          return { date: msgDate, display: "Today" }
        } else if (dateStr === yesterdayStr) {
          return { date: msgDate, display: "Yesterday" }
        } else {
          return {
            date: msgDate,
            display: msgDate.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            }),
          }
        }
      })

    return dates
  }

  const messageDates = formatMessageDate(channelMessages)

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      {/* Channel header */}
      <ChannelHeader channel={channel} section={section} onSearchClick={() => setIsSearchDialogOpen(true)} />

      {/* Message list */}
      <div className="flex-1 overflow-hidden relative">
        <ScrollArea ref={scrollAreaRef} className="h-full w-full" onScroll={handleScroll} scrollHideDelay={100}>
          <div className="p-4 space-y-4">
            {channelMessages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="bg-muted/50 p-4 rounded-full mb-4">
                  <MessageSquare className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No messages yet</h3>
                <p className="text-muted-foreground max-w-md mb-4">
                  This is the beginning of your conversation in {channel.name}. Send a message to get started!
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Users className="h-4 w-4 mr-2" />
                    Add people
                  </Button>
                  <Button variant="outline" size="sm">
                    <Info className="h-4 w-4 mr-2" />
                    Channel info
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {/* Message date markers */}
                {messageDates &&
                  messageDates.map((dateInfo, index) => {
                    const messagesBefore = channelMessages.filter((msg) => {
                      const msgDate = new Date(msg.timestamp)
                      return msgDate.toDateString() === dateInfo.date.toDateString()
                    })

                    return (
                      <div key={index} className="relative py-2 my-4">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-muted" />
                        </div>
                        <div className="relative flex justify-center">
                          <span className="bg-background px-2 text-xs text-muted-foreground">{dateInfo.display}</span>
                        </div>
                      </div>
                    )
                  })}

                {/* Messages */}
                {channelMessages.map((message, index) => (
                  <Message
                    key={message.id}
                    message={message}
                    onTranslateClick={() => handleTranslateMessage(message)}
                    showSender={index === 0 || channelMessages[index - 1].senderId !== message.senderId}
                  />
                ))}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* New messages notification */}
        {newMessageCount > 0 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <Button
              size="sm"
              className="rounded-full shadow-md flex items-center gap-1 px-3 h-8"
              onClick={scrollToBottom}
            >
              <Badge className="h-5 w-5 p-0 flex items-center justify-center rounded-full">{newMessageCount}</Badge>
              <span>new messages</span>
            </Button>
          </div>
        )}
      </div>

      {/* Message composer */}
      <div className="border-t p-3">
        {isPlatformChannel && (
          <div className="p-2 mb-2 bg-muted/50 rounded-md flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              Messages will be sent via {channel.platform === PlatformType.WHATSAPP ? "WhatsApp" : "Telegram"}
            </p>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                Switch to internal
              </Button>
            </div>
          </div>
        )}

        <MessageComposer
          value={messageInput}
          onChange={setMessageInput}
          onKeyDown={handleKeyDown}
          onSend={handleSendMessage}
          onSchedule={() => setIsScheduleDialogOpen(true)}
        />
      </div>

      {/* Action toolbar */}
      <div className="border-t py-1 px-2 flex justify-between items-center bg-background">
        <div className="flex items-center gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setIsSearchDialogOpen(true)}>
                  <Search className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Search in conversation</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setIsScheduleDialogOpen(true)}>
                  <Calendar className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Schedule message</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => setIsTranslateDialogOpen(true)}
                >
                  <Languages className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Translate conversation</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setIsExportDialogOpen(true)}>
                  <Download className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Export chat</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex items-center gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Phone className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Audio call</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Video className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Video call</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Channel Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Users className="h-4 w-4 mr-2" />
                  View participants
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Flag className="h-4 w-4 mr-2" />
                  Report channel
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Star className="h-4 w-4 mr-2" />
                  Add to favorites
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Bell className="h-4 w-4 mr-2" />
                  Notification preferences
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ImageIcon className="h-4 w-4 mr-2" />
                  View media & files
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsExportDialogOpen(true)}>
                  <FileText className="h-4 w-4 mr-2" />
                  Export chat history
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <VolumeX className="h-4 w-4 mr-2 text-destructive" />
                  <span className="text-destructive">Mute channel</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Volume2 className="h-4 w-4 mr-2" />
                  Unmute channel
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Dialogs */}
      <SearchDialog isOpen={isSearchDialogOpen} onClose={() => setIsSearchDialogOpen(false)} channelId={channel.id} />

      <ExportChatDialog isOpen={isExportDialogOpen} onClose={() => setIsExportDialogOpen(false)} channel={channel} />

      <ScheduleMessageDialog
        isOpen={isScheduleDialogOpen}
        onClose={() => setIsScheduleDialogOpen(false)}
        channelId={channel.id}
        initialMessage={messageInput}
      />

      <TranslateDialog
        isOpen={isTranslateDialogOpen}
        onClose={() => setIsTranslateDialogOpen(false)}
        message={messageToTranslate}
      />
    </div>
  )
}
