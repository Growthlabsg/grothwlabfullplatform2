"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "./auth-context"
import { useNotifications } from "./notification-context"

// Define types for our chat context
export interface Message {
  id: string
  conversationId: string
  senderId: string
  content: string
  timestamp: Date
  read: boolean
}

export interface Conversation {
  id: string
  participants: string[]
  lastMessage?: Message
  unreadCount: number
  title?: string
  isGroup: boolean
}

export interface ConnectionRequest {
  id: string
  senderId: string
  recipientId: string
  status: "pending" | "accepted" | "rejected"
  timestamp: Date
  message?: string
}

interface ChatContextType {
  conversations: Conversation[]
  activeConversation: Conversation | null
  messages: Message[]
  connectionRequests: ConnectionRequest[]
  sendMessage: (conversationId: string, content: string) => Promise<void>
  createConversation: (participantIds: string[], isGroup: boolean, title?: string) => Promise<string>
  setActiveConversation: (conversation: Conversation | null) => void
  markAsRead: (messageId: string) => Promise<void>
  sendConnectionRequest: (recipientId: string, message?: string) => Promise<void>
  respondToConnectionRequest: (requestId: string, accept: boolean) => Promise<void>
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export const useChat = () => {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider")
  }
  return context
}

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth()
  const { addNotification } = useNotifications()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [connectionRequests, setConnectionRequests] = useState<ConnectionRequest[]>([])

  // Mock data for demonstration
  useEffect(() => {
    if (user) {
      // Simulate fetching conversations from an API
      const mockConversations: Conversation[] = [
        {
          id: "conv1",
          participants: [user.id, "user2"],
          unreadCount: 2,
          isGroup: false,
        },
        {
          id: "conv2",
          participants: [user.id, "user3", "user4"],
          title: "Startup Founders",
          unreadCount: 0,
          isGroup: true,
        },
      ]

      const mockConnectionRequests: ConnectionRequest[] = [
        {
          id: "req1",
          senderId: "user5",
          recipientId: user.id,
          status: "pending",
          timestamp: new Date(),
          message: "I'd like to connect to discuss potential collaboration.",
        },
      ]

      setConversations(mockConversations)
      setConnectionRequests(mockConnectionRequests)
    }
  }, [user])

  // Load messages when active conversation changes
  useEffect(() => {
    if (activeConversation) {
      // Simulate fetching messages from an API
      const mockMessages: Message[] = [
        {
          id: "msg1",
          conversationId: activeConversation.id,
          senderId: user?.id || "",
          content: "Hello there!",
          timestamp: new Date(Date.now() - 3600000),
          read: true,
        },
        {
          id: "msg2",
          conversationId: activeConversation.id,
          senderId: activeConversation.participants.find((id) => id !== user?.id) || "",
          content: "Hi! How can I help you today?",
          timestamp: new Date(Date.now() - 1800000),
          read: false,
        },
      ]

      setMessages(mockMessages)
    }
  }, [activeConversation, user])

  const sendMessage = async (conversationId: string, content: string) => {
    // Simulate sending a message to an API
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      conversationId,
      senderId: user?.id || "",
      content,
      timestamp: new Date(),
      read: false,
    }

    setMessages((prev) => [...prev, newMessage])

    // Update the conversation with the last message
    setConversations((prev) =>
      prev.map((conv) => (conv.id === conversationId ? { ...conv, lastMessage: newMessage } : conv)),
    )

    return Promise.resolve()
  }

  const createConversation = async (participantIds: string[], isGroup: boolean, title?: string) => {
    // Simulate creating a conversation via an API
    const newConversation: Conversation = {
      id: `conv-${Date.now()}`,
      participants: [user?.id || "", ...participantIds],
      unreadCount: 0,
      isGroup,
      title,
    }

    setConversations((prev) => [...prev, newConversation])
    setActiveConversation(newConversation)

    return Promise.resolve(newConversation.id)
  }

  const markAsRead = async (messageId: string) => {
    // Simulate marking a message as read via an API
    setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, read: true } : msg)))

    // Update unread count in the conversation
    if (activeConversation) {
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === activeConversation.id ? { ...conv, unreadCount: Math.max(0, conv.unreadCount - 1) } : conv,
        ),
      )
    }

    return Promise.resolve()
  }

  const sendConnectionRequest = async (recipientId: string, message?: string) => {
    // Simulate sending a connection request via an API
    const newRequest: ConnectionRequest = {
      id: `req-${Date.now()}`,
      senderId: user?.id || "",
      recipientId,
      status: "pending",
      timestamp: new Date(),
      message,
    }

    setConnectionRequests((prev) => [...prev, newRequest])

    // Notify the user
    addNotification({
      title: "Connection Request Sent",
      message: `Your connection request has been sent.`,
      type: "success",
    })

    return Promise.resolve()
  }

  const respondToConnectionRequest = async (requestId: string, accept: boolean) => {
    // Simulate responding to a connection request via an API
    setConnectionRequests((prev) =>
      prev.map((req) => (req.id === requestId ? { ...req, status: accept ? "accepted" : "rejected" } : req)),
    )

    if (accept) {
      // If accepted, create a new conversation with the sender
      const request = connectionRequests.find((req) => req.id === requestId)
      if (request) {
        await createConversation([request.senderId], false)

        // Notify the user
        addNotification({
          title: "Connection Accepted",
          message: `You are now connected.`,
          type: "success",
        })
      }
    }

    return Promise.resolve()
  }

  const value = {
    conversations,
    activeConversation,
    messages,
    connectionRequests,
    sendMessage,
    createConversation,
    setActiveConversation,
    markAsRead,
    sendConnectionRequest,
    respondToConnectionRequest,
  }

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}
