"use client"

import { useState, useRef, useCallback } from "react"
import {
  MessageSquare,
  Search,
  Menu,
  Phone,
  Video,
  Plus,
  Send,
  Paperclip,
  Smile,
  MoreHorizontal,
  Hash,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"

interface Message {
  id: string
  content: string
  timestamp: Date
  sender: ChatUser
  status: "sending" | "sent" | "delivered" | "read" | "failed"
}

interface ChatUser {
  id: string
  name: string
  avatar?: string
  status?: "online" | "away" | "offline" | "busy"
}

interface Channel {
  id: string
  name: string
  unread: number
  pinned: boolean
  description?: string
  members?: number
  type?: "channel" | "direct" | "group"
  avatar?: string
  color?: string
}

interface DirectMessage {
  id: string
  name: string
  avatar?: string
  status?: "online" | "away" | "offline" | "busy"
  unread: number
  lastMessage?: string
  lastActivity?: Date
  type?: "direct" | "group"
  color?: string
}

interface WhatsAppStyleHubProps {
  onClose?: () => void
  className?: string
}

export function WhatsAppStyleHub({
  onClose,
  className,
}: WhatsAppStyleHubProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeChat, setActiveChat] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeView, setActiveView] = useState<"chats" | "channels" | "calls" | "calendar">("chats")
  const [messageInput, setMessageInput] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  // Mock data
  const channels: Channel[] = [
    {
      id: "general",
      name: "general",
      unread: 3,
      pinned: true,
      description: "General discussions for everyone",
      members: 24,
      type: "channel",
      color: "#00D4AA",
    },
    {
      id: "announcements",
      name: "announcements",
      unread: 1,
      pinned: true,
      description: "Important announcements",
      members: 24,
      type: "channel",
      color: "#FF6B6B",
    },
    {
      id: "funding",
      name: "funding",
      unread: 0,
      pinned: false,
      description: "Funding and financial discussions",
      members: 8,
      type: "channel",
      color: "#4ECDC4",
    },
  ]

  const directMessages: DirectMessage[] = [
    {
      id: "sarah-chen",
      name: "Sarah Chen",
      avatar: "/sarah-chen.png",
      status: "online",
      unread: 2,
      lastMessage: "Can we discuss the project tomorrow?",
      lastActivity: new Date(Date.now() - 1000 * 60 * 5),
      type: "direct",
      color: "#00D4AA",
    },
    {
      id: "alex-wong",
      name: "Alex Wong",
      avatar: "/alex-wong.png",
      status: "away",
      unread: 0,
      lastMessage: "Thanks for your help!",
      lastActivity: new Date(Date.now() - 1000 * 60 * 30),
      type: "direct",
      color: "#FF6B6B",
    },
  ]

  const [messages, setMessages] = useState<Record<string, Message[]>>({
    "general": [
      {
        id: "1",
        content: "Welcome to the general channel! 👋",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        sender: { id: "system", name: "System", avatar: "/system.png" },
        status: "read",
      },
      {
        id: "2",
        content: "Hi everyone! I'm excited to be part of this community.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60),
        sender: { id: "sarah-chen", name: "Sarah Chen", avatar: "/sarah-chen.png" },
        status: "read",
      },
    ],
    "sarah-chen": [
      {
        id: "1",
        content: "Hi! Can we discuss the project tomorrow?",
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        sender: { id: "sarah-chen", name: "Sarah Chen", avatar: "/sarah-chen.png" },
        status: "read",
      },
      {
        id: "2",
        content: "Sure! What time works for you?",
        timestamp: new Date(Date.now() - 1000 * 60 * 3),
        sender: { id: "current-user", name: "You", avatar: "/current-user.png" },
        status: "read",
      },
    ],
  })

  const sendMessage = useCallback((chatId: string, content: string) => {
    if (!content.trim()) return

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      content: content.trim(),
      timestamp: new Date(),
      sender: { id: "current-user", name: "You", avatar: "/current-user.png" },
      status: "sending",
    }

    setMessages(prev => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), newMessage],
    }))

    setTimeout(() => {
      setMessages(prev => ({
        ...prev,
        [chatId]: (prev[chatId] ? prev[chatId].map : undefined)(msg => 
          msg.id === newMessage.id ? { ...msg, status: "sent" } : msg
        )
      }))
    }, 1000)

    setMessageInput("")
  }, [])

  const toggleChat = useCallback((chatId: string) => {
    setActiveChat(chatId)
  }, [])

  const renderChatItem = (chat: Channel | DirectMessage) => (
    <div
      key={chat.id}
      className={cn(
        "flex items-center space-x-3 p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors",
        activeChat === chat.id && "bg-gray-100 dark:bg-gray-800"
      )}
      onClick={() => toggleChat(chat.id)}
    >
      <div className="relative">
        <Avatar className="h-12 w-12">
          <AvatarImage src={chat.avatar} />
          <AvatarFallback className="text-sm font-medium">
            {chat.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        {chat.type === "direct" && "status" in chat && chat.status === "online" && (
          <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium truncate">{chat.name}</h3>
          {chat.unread > 0 && (
            <Badge variant="secondary" className="ml-2 text-xs">
              {chat.unread}
            </Badge>
          )}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
          {"lastMessage" in chat ? chat.lastMessage || "No messages yet" : "No messages yet"}
        </p>
      </div>
    </div>
  )

  const renderMessage = (message: Message, index: number, messages: Message[]) => {
    const isOwn = message.sender.id === "current-user"
    const showAvatar = index === 0 || messages[index - 1]?.sender.id !== message.sender.id
    const showTimestamp = index === messages.length - 1 || messages[index + 1]?.sender.id !== message.sender.id

    return (
      <div
        key={message.id}
        className={cn(
          "flex items-end space-x-2 mb-2",
          isOwn && "flex-row-reverse space-x-reverse"
        )}
      >
        {showAvatar && !isOwn && (
          <Avatar className="h-8 w-8 mt-2">
            <AvatarImage src={message.sender.avatar} />
            <AvatarFallback className="text-xs">
              {message.sender.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        )}
        
        <div className={cn(
          "flex flex-col max-w-xs lg:max-w-md",
          isOwn && "items-end"
        )}>
          <div className={cn(
            "px-4 py-2 rounded-2xl",
            isOwn 
              ? "bg-green-500 text-white rounded-br-md" 
              : "bg-gray-200 dark:bg-gray-700 rounded-bl-md"
          )}>
            <p className="text-sm">{message.content}</p>
          </div>
          
          {showTimestamp && (
            <div className={cn(
              "flex items-center space-x-1 mt-1 text-xs text-gray-500",
              isOwn && "justify-end"
            )}>
              <span>{format(message.timestamp, "HH:mm")}</span>
              {isOwn && (
                <span className="ml-1">
                  {message.status === "sending" && "⏳"}
                  {message.status === "sent" && "✓"}
                  {message.status === "delivered" && "✓✓"}
                  {message.status === "read" && "✓✓"}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={cn("h-screen flex flex-col bg-white dark:bg-gray-900", className)}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-800">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/images/GrowthLab Icon (1).png" />
              <AvatarFallback>GL</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg font-semibold">GrowthLab</h1>
              <p className="text-xs text-gray-500">Communication Hub</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {sidebarOpen && (
          <div className="w-80 border-r dark:border-gray-800 flex flex-col">
            {/* Sidebar Header */}
            <div className="p-4 border-b dark:border-gray-800">
              <div className="flex items-center space-x-2 mb-4">
                <Input
                  placeholder="Search or start new chat"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button variant="ghost" size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Tabs */}
              <Tabs value={activeView} onValueChange={(value) => setActiveView(value as any)}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="chats">Chats</TabsTrigger>
                  <TabsTrigger value="channels">Channels</TabsTrigger>
                  <TabsTrigger value="calls">Calls</TabsTrigger>
                  <TabsTrigger value="calendar">Calendar</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Sidebar Content */}
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-2">
                {activeView === "chats" && (
                  <>
                    {directMessages.map(renderChatItem)}
                  </>
                )}
                
                {activeView === "channels" && (
                  <>
                    {channels.map(renderChatItem)}
                  </>
                )}
                
                {activeView === "calls" && (
                  <div className="text-center py-8">
                    <Phone className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-sm text-gray-500">No recent calls</p>
                  </div>
                )}
                
                {activeView === "calendar" && (
                  <div className="space-y-4">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border"
                    />
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Today's Events</h3>
                      <div className="text-xs text-gray-500">No events scheduled</div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        )}

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {activeChat ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between p-4 border-b dark:border-gray-800">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={activeChat} />
                    <AvatarFallback>
                      {activeChat.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-semibold">{activeChat}</h2>
                    <p className="text-xs text-gray-500">online</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Video className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Search className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-2">
                  {messages[activeChat]?.map((message, index) => 
                    renderMessage(message, index, messages[activeChat])
                  )}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="p-4 border-t dark:border-gray-800">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Smile className="h-5 w-5" />
                  </Button>
                  <Input
                    placeholder="Type a message"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        sendMessage(activeChat, messageInput)
                      }
                    }}
                    className="flex-1"
                  />
                  <Button
                    size="sm"
                    onClick={() => sendMessage(activeChat, messageInput)}
                    disabled={!messageInput.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">Welcome to GrowthLab</h3>
                <p className="text-gray-500">Select a chat to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 