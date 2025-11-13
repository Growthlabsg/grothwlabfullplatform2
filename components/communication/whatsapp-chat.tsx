"use client"

import { useState } from "react"
import { MessageSquare, Search, MoreVertical, Phone, Video, Send, Paperclip, Smile, Mic, Check, CheckCheck, Clock, AlertCircle, Pin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

interface Chat {
  id: string
  name: string
  avatar?: string
  unreadCount: number
  lastMessage: string
  lastTime: Date
  status: "online" | "offline"
}

interface Message {
  id: string
  content: string
  timestamp: Date
  isOwn: boolean
  status: "sent" | "delivered" | "read"
}

export function WhatsAppChat() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)

  const chats: Chat[] = [
    {
      id: "sarah",
      name: "Sarah Chen",
      avatar: "/abstract-geometric-shapes.png",
      unreadCount: 2,
      lastMessage: "Looking forward to our meeting tomorrow!",
      lastTime: new Date(),
      status: "online"
    },
    {
      id: "david",
      name: "David Wong",
      avatar: "/abstract-geometric-aw.png",
      unreadCount: 0,
      lastMessage: "I'll send you the presentation by EOD",
      lastTime: new Date(Date.now() - 3600000),
      status: "offline"
    },
    {
      id: "team-alpha",
      name: "Team Alpha",
      avatar: "/team-avatar.png",
      unreadCount: 5,
      lastMessage: "Alex: Let's meet to discuss the new roadmap",
      lastTime: new Date(Date.now() - 1800000),
      status: "online"
    }
  ]

  const messages: Message[] = [
    {
      id: "1",
      content: "Hey! How's it going?",
      timestamp: new Date(Date.now() - 3600000),
      isOwn: false,
      status: "read"
    },
    {
      id: "2",
      content: "Great! Working on some exciting features 🚀",
      timestamp: new Date(Date.now() - 3500000),
      isOwn: true,
      status: "read"
    },
    {
      id: "3",
      content: "Can we discuss the project tomorrow?",
      timestamp: new Date(Date.now() - 1800000),
      isOwn: false,
      status: "read"
    }
  ]

  const selectedChatData = chats.find(chat => chat.id === selectedChat)

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    setNewMessage("")
  }

  const renderChatItem = (chat: Chat) => (
    <div
      key={chat.id}
      className={cn(
        "flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors",
        selectedChat === chat.id && "bg-gray-100 dark:bg-gray-700"
      )}
      onClick={() => setSelectedChat(chat.id)}
    >
      <div className="relative">
        <Avatar className="h-12 w-12">
          <AvatarImage src={chat.avatar || "/placeholder.svg"} alt={chat.name} />
          <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
        </Avatar>
        {chat.status === "online" && (
          <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-sm truncate">{chat.name}</h3>
          <span className="text-xs text-gray-500">
            {format(chat.lastTime, "HH:mm")}
          </span>
        </div>
        
        <div className="flex items-center justify-between mt-1">
          <p className="text-sm text-gray-600 dark:text-gray-400 truncate flex-1">
            {chat.lastMessage}
          </p>
          <div className="flex items-center gap-1 ml-2">
            {chat.unreadCount > 0 && (
              <Badge variant="destructive" className="h-5 w-5 p-0 flex items-center justify-center text-xs">
                {chat.unreadCount}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  const renderMessageBubble = (message: Message) => (
    <div
      key={message.id}
      className={cn(
        "flex mb-2",
        message.isOwn ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-xs lg:max-w-md px-3 py-2 rounded-lg",
          message.isOwn
            ? "bg-green-500 text-white"
            : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        )}
      >
        <div className="text-sm">{message.content}</div>
        
        <div className="flex items-center justify-end gap-1 mt-1">
          <span className="text-xs opacity-70">
            {format(message.timestamp, "HH:mm")}
          </span>
          {message.isOwn && (
            <div className="flex items-center">
              {message.status === "sent" && <Check className="h-3 w-3" />}
              {message.status === "delivered" && <CheckCheck className="h-3 w-3" />}
              {message.status === "read" && <CheckCheck className="h-3 w-3 text-blue-500" />}
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex h-full bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-80 border-r bg-white dark:bg-gray-800 flex flex-col">
        {/* Header */}
        <div className="p-3 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <h2 className="font-medium">Chats</h2>
          </div>
          
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Chat list */}
        <ScrollArea className="flex-1">
          {chats.map(renderChatItem)}
        </ScrollArea>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {selectedChatData ? (
          <>
            {/* Chat header */}
            <div className="flex items-center justify-between p-3 border-b bg-white dark:bg-gray-900">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedChatData.avatar || "/placeholder.svg"} alt={selectedChatData.name} />
                  <AvatarFallback>{selectedChatData.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{selectedChatData.name}</h3>
                  <p className="text-sm text-gray-500">
                    {selectedChatData.status === "online" ? "online" : "offline"}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Video className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Phone className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                <div className="text-center text-sm text-gray-500">
                  {format(new Date(), "MMMM d, yyyy")}
                </div>
                
                <div className="space-y-2">
                  {messages.map(renderMessageBubble)}
                </div>
              </div>
            </ScrollArea>

            {/* Message input */}
            <div className="p-3 border-t bg-white dark:bg-gray-900">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Smile className="h-5 w-5" />
                </Button>
                
                <Button variant="ghost" size="icon">
                  <Paperclip className="h-5 w-5" />
                </Button>
                
                <div className="flex-1">
                  <Input
                    placeholder="Type a message"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="rounded-full"
                  />
                </div>
                
                {newMessage.trim() ? (
                  <Button size="icon" onClick={handleSendMessage}>
                    <Send className="h-5 w-5" />
                  </Button>
                ) : (
                  <Button
                    size="icon"
                    onClick={() => setIsRecording(!isRecording)}
                    className={cn(isRecording && "bg-red-500 hover:bg-red-600")}
                  >
                    <Mic className="h-5 w-5" />
                  </Button>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Select a chat</h3>
              <p className="text-gray-500">Choose a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 