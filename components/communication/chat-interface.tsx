"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Send,
  Phone,
  Video,
  Paperclip,
  Smile,
  MoreVertical,
  Monitor,
  ImageIcon,
  File,
  Mic,
  Pin,
  Archive,
  Trash2,
  Info,
  Check,
  Clock,
} from "lucide-react"
import { EmojiPicker } from "./emoji-picker"
import { FileUploadDialog } from "./file-upload-dialog"
import { AudioCallDialog } from "./audio-call-dialog"
import { VideoCallDialog } from "./video-call-dialog"
import { ScreenShareDialog } from "./screen-share-dialog"
import { ChatInfoDialog } from "./chat-info-dialog"
import { cn } from "@/lib/utils"

interface ChatInterfaceProps {
  chatId: string
  category: string
}

// Mock message type
interface Message {
  id: string
  senderId: string
  senderName: string
  senderAvatar?: string
  content: string
  timestamp: Date
  status: "sending" | "sent" | "delivered" | "read"
  attachments?: {
    id: string
    type: "image" | "file" | "audio"
    url: string
    name: string
    size?: number
  }[]
}

// Mock chat data
const mockChatData: Record<
  string,
  {
    id: string
    name: string
    avatar?: string
    participants: { id: string; name: string; avatar?: string }[]
    isGroup: boolean
    messages: Message[]
  }
> = {
  "ind-1": {
    id: "ind-1",
    name: "Sarah Chen",
    avatar: "/avatars/7.png",
    participants: [
      { id: "user-1", name: "Sarah Chen", avatar: "/avatars/7.png" },
      { id: "current-user", name: "You" },
    ],
    isGroup: false,
    messages: [
      {
        id: "msg-1",
        senderId: "user-1",
        senderName: "Sarah Chen",
        senderAvatar: "/avatars/7.png",
        content: "Hi there! How's the project coming along?",
        timestamp: new Date(Date.now() - 3600000 * 24), // 1 day ago
        status: "read",
      },
      {
        id: "msg-2",
        senderId: "current-user",
        senderName: "You",
        content: "It's going well! I've completed the initial designs.",
        timestamp: new Date(Date.now() - 3600000 * 23), // 23 hours ago
        status: "read",
      },
      {
        id: "msg-3",
        senderId: "user-1",
        senderName: "Sarah Chen",
        senderAvatar: "/avatars/7.png",
        content: "That's great! Can you share them with me?",
        timestamp: new Date(Date.now() - 3600000 * 22), // 22 hours ago
        status: "read",
      },
      {
        id: "msg-4",
        senderId: "current-user",
        senderName: "You",
        content: "Sure, here they are!",
        timestamp: new Date(Date.now() - 3600000 * 21), // 21 hours ago
        status: "read",
        attachments: [
          {
            id: "att-1",
            type: "image",
            url: "/design-mockup.png",
            name: "design-mockup.png",
          },
        ],
      },
      {
        id: "msg-5",
        senderId: "user-1",
        senderName: "Sarah Chen",
        senderAvatar: "/avatars/7.png",
        content: "These look amazing! I especially like the color scheme.",
        timestamp: new Date(Date.now() - 3600000 * 2), // 2 hours ago
        status: "read",
      },
      {
        id: "msg-6",
        senderId: "current-user",
        senderName: "You",
        content: "Thanks! I spent a lot of time on that. Do you have any suggestions for improvements?",
        timestamp: new Date(Date.now() - 3600000 * 1), // 1 hour ago
        status: "delivered",
      },
      {
        id: "msg-7",
        senderId: "user-1",
        senderName: "Sarah Chen",
        senderAvatar: "/avatars/7.png",
        content: "I think they're pretty solid as is. Let's discuss in our meeting tomorrow.",
        timestamp: new Date(Date.now() - 60000 * 30), // 30 minutes ago
        status: "read",
      },
    ],
  },
  "grp-1": {
    id: "grp-1",
    name: "Product Team",
    avatar: "/avatars/8.png",
    participants: [
      { id: "user-1", name: "Sarah Chen", avatar: "/avatars/7.png" },
      { id: "user-2", name: "Alex Wong", avatar: "/avatars/9.png" },
      { id: "user-3", name: "Mei Lin", avatar: "/avatars/10.png" },
      { id: "current-user", name: "You" },
    ],
    isGroup: true,
    messages: [
      {
        id: "msg-1",
        senderId: "user-2",
        senderName: "Alex Wong",
        senderAvatar: "/avatars/9.png",
        content: "Hey team, let's discuss the new features for the next sprint.",
        timestamp: new Date(Date.now() - 3600000 * 5), // 5 hours ago
        status: "read",
      },
      {
        id: "msg-2",
        senderId: "user-1",
        senderName: "Sarah Chen",
        senderAvatar: "/avatars/7.png",
        content: "I think we should prioritize the user authentication improvements.",
        timestamp: new Date(Date.now() - 3600000 * 4), // 4 hours ago
        status: "read",
      },
      {
        id: "msg-3",
        senderId: "user-3",
        senderName: "Mei Lin",
        senderAvatar: "/avatars/10.png",
        content: "Agreed. We've been getting a lot of feedback about that.",
        timestamp: new Date(Date.now() - 3600000 * 3), // 3 hours ago
        status: "read",
      },
      {
        id: "msg-4",
        senderId: "current-user",
        senderName: "You",
        content: "I've already started working on some designs for that. Here's what I have so far:",
        timestamp: new Date(Date.now() - 3600000 * 2), // 2 hours ago
        status: "read",
        attachments: [
          {
            id: "att-1",
            type: "file",
            url: "#",
            name: "authentication-flow.pdf",
            size: 2400000, // 2.4 MB
          },
        ],
      },
      {
        id: "msg-5",
        senderId: "user-2",
        senderName: "Alex Wong",
        senderAvatar: "/avatars/9.png",
        content:
          "This looks great! I think we can implement this in the next sprint. Let's discuss the technical details tomorrow.",
        timestamp: new Date(Date.now() - 3600000 * 1), // 1 hour ago
        status: "read",
      },
    ],
  },
}

export function ChatInterface({ chatId, category }: ChatInterfaceProps) {
  const [messageInput, setMessageInput] = useState("")
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false)
  const [isFileUploadOpen, setIsFileUploadOpen] = useState(false)
  const [isAudioCallOpen, setIsAudioCallOpen] = useState(false)
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false)
  const [isScreenShareOpen, setIsScreenShareOpen] = useState(false)
  const [isChatInfoOpen, setIsChatInfoOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const chatData = mockChatData[chatId]

  // Scroll to bottom of messages when messages change
  useEffect(() => {
    scrollToBottom()
  }, [chatData?.messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Handle sending a message
  const handleSendMessage = () => {
    if (!messageInput.trim()) return

    // In a real app, this would send the message to the server
    console.log("Sending message:", messageInput)

    // Clear input
    setMessageInput("")
  }

  // Handle emoji selection
  const handleEmojiSelect = (emoji: string) => {
    setMessageInput((prev) => prev + emoji)
    setIsEmojiPickerOpen(false)
  }

  // Format timestamp
  const formatTimestamp = (date: Date) => {
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    } else if (diffInHours < 48) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" })
    }
  }

  // Get message status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sending":
        return <Clock className="h-3 w-3 text-muted-foreground" />
      case "sent":
        return <Check className="h-3 w-3 text-muted-foreground" />
      case "delivered":
        return (
          <div className="flex">
            <Check className="h-3 w-3 text-muted-foreground" />
            <Check className="h-3 w-3 text-muted-foreground -ml-1" />
          </div>
        )
      case "read":
        return (
          <div className="flex">
            <Check className="h-3 w-3 text-blue-500" />
            <Check className="h-3 w-3 text-blue-500 -ml-1" />
          </div>
        )
      default:
        return null
    }
  }

  if (!chatData) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Chat not found</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={chatData.avatar || "/placeholder.svg"} alt={chatData.name} />
            <AvatarFallback>{chatData.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">{chatData.name}</h2>
            <p className="text-xs text-muted-foreground">
              {chatData.isGroup ? `${chatData.participants.length} participants` : "Online"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={() => setIsAudioCallOpen(true)}>
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
                <Button variant="ghost" size="icon" onClick={() => setIsVideoCallOpen(true)}>
                  <Video className="h-5 w-5" />
                  <span className="sr-only">Video call</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Video call</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={() => setIsScreenShareOpen(true)}>
                  <Monitor className="h-5 w-5" />
                  <span className="sr-only">Screen share</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Screen share</TooltipContent>
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
              <DropdownMenuItem onClick={() => setIsChatInfoOpen(true)}>
                <Info className="h-4 w-4 mr-2" />
                Chat info
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Pin className="h-4 w-4 mr-2" />
                Pin chat
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Archive className="h-4 w-4 mr-2" />
                Archive chat
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
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {chatData.messages.map((message) => (
            <div
              key={message.id}
              className={cn("flex", message.senderId === "current-user" ? "justify-end" : "justify-start")}
            >
              <div className="flex max-w-[80%]">
                {message.senderId !== "current-user" && (
                  <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                    <AvatarImage src={message.senderAvatar || "/placeholder.svg"} alt={message.senderName} />
                    <AvatarFallback>{message.senderName.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                )}
                <div>
                  {chatData.isGroup && message.senderId !== "current-user" && (
                    <p className="text-xs font-medium mb-1">{message.senderName}</p>
                  )}
                  <div
                    className={cn(
                      "rounded-lg p-3",
                      message.senderId === "current-user" ? "bg-primary text-primary-foreground" : "bg-muted",
                    )}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>

                    {message.attachments && message.attachments.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {message.attachments.map((attachment) => (
                          <div key={attachment.id}>
                            {attachment.type === "image" ? (
                              <div className="rounded-md overflow-hidden">
                                <ImageIcon
                                  src={attachment.url || "/placeholder.svg"}
                                  alt={attachment.name}
                                  className="max-w-full h-auto"
                                />
                              </div>
                            ) : attachment.type === "file" ? (
                              <div className="flex items-center gap-2 p-2 rounded-md bg-background/50">
                                <File className="h-8 w-8 text-blue-500" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium truncate">{attachment.name}</p>
                                  {attachment.size && (
                                    <p className="text-xs text-muted-foreground">
                                      {(attachment.size / 1024 / 1024).toFixed(1)} MB
                                    </p>
                                  )}
                                </div>
                                <Button variant="ghost" size="sm">
                                  Download
                                </Button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 p-2 rounded-md bg-background/50">
                                <Mic className="h-8 w-8 text-blue-500" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium truncate">{attachment.name}</p>
                                </div>
                                <Button variant="ghost" size="sm">
                                  Play
                                </Button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center mt-1 text-xs text-muted-foreground">
                    <span>{formatTimestamp(message.timestamp)}</span>
                    {message.senderId === "current-user" && (
                      <span className="ml-2 flex items-center">{getStatusIcon(message.status)}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Message input */}
      <div className="p-4 border-t">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={() => setIsFileUploadOpen(true)}>
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
                  <Button variant="ghost" size="icon" onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}>
                    <Smile className="h-5 w-5" />
                    <span className="sr-only">Add emoji</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Add emoji</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="relative flex-1">
            <Input
              placeholder="Type a message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
              className="pr-10"
            />
            {isEmojiPickerOpen && (
              <div className="absolute bottom-full mb-2">
                <EmojiPicker onEmojiSelect={handleEmojiSelect} onClose={() => setIsEmojiPickerOpen(false)} />
              </div>
            )}
          </div>

          <Button onClick={handleSendMessage} disabled={!messageInput.trim()}>
            <Send className="h-5 w-5" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </div>

      {/* Dialogs */}
      <FileUploadDialog open={isFileUploadOpen} onOpenChange={setIsFileUploadOpen} />
      <AudioCallDialog open={isAudioCallOpen} onOpenChange={setIsAudioCallOpen} recipient={chatData} />
      <VideoCallDialog open={isVideoCallOpen} onOpenChange={setIsVideoCallOpen} recipient={chatData} />
      <ScreenShareDialog open={isScreenShareOpen} onOpenChange={setIsScreenShareOpen} recipient={chatData} />
      <ChatInfoDialog open={isChatInfoOpen} onOpenChange={setIsChatInfoOpen} chatData={chatData} />
    </div>
  )
}
