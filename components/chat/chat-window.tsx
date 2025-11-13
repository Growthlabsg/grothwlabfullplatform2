"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Paperclip, Smile } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "other"
  timestamp: Date
}

interface ChatWindowProps {
  conversationId?: string
  recipientName?: string
  recipientAvatar?: string
}

export function ChatWindow({ conversationId, recipientName = "Contact", recipientAvatar }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! How can I help you today?",
      sender: "other",
      timestamp: new Date(Date.now() - 60000)
    }
  ])
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "user",
      timestamp: new Date()
    }

    setMessages(prev => [...prev, message])
    setNewMessage("")

    // Simulate response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        content: "Thanks for your message! I'll get back to you soon.",
        sender: "other",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, response])
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="flex items-center gap-3 p-4 border-b bg-white">
        <Avatar className="h-10 w-10">
          <AvatarImage src={recipientAvatar} />
          <AvatarFallback>{recipientName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold text-gray-900">{recipientName}</h3>
          <p className="text-sm text-gray-500">Online</p>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === "user" ? "text-blue-100" : "text-gray-500"
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4 border-t bg-white">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
            <Smile className="h-4 w-4" />
          </Button>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button onClick={handleSendMessage} size="sm">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
