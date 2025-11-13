"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import type { Channel, Message, Section, PlatformType } from "@/types/communication"
import { generateMockChannels, generateMockMessages } from "@/lib/mock-data-generator"

export function useCommunication() {
  const [sections, setSections] = useState<Section[]>([
    { id: "team", name: "Team Channels", type: "team" },
    { id: "direct", name: "Direct Messages", type: "direct" },
    { id: "group", name: "Group Chats", type: "group" },
    { id: "community", name: "Community", type: "community" },
    { id: "broadcast", name: "Broadcasts", type: "broadcast" },
    { id: "whatsapp", name: "WhatsApp", type: "whatsapp" },
    { id: "telegram", name: "Telegram", type: "telegram" },
  ])

  const [channels, setChannels] = useState<Record<string, Channel[]>>({})
  const [messages, setMessages] = useState<Record<string, EnhancedMessage[]>>({})
  const [loading, setLoading] = useState(true)
  const [platformIntegrations, setPlatformIntegrations] = useState<PlatformType[]>(["slack"])
  const [isTyping, setIsTyping] = useState<Record<string, boolean>>({})
  const [onlineUsers, setOnlineUsers] = useState<string[]>([])
  const [messageReactions, setMessageReactions] = useState<Record<string, any[]>>({})
  const [pinnedMessages, setPinnedMessages] = useState<Record<string, string[]>>({})
  const [encryptionEnabled, setEncryptionEnabled] = useState(true)
  const [securityAlerts, setSecurityAlerts] = useState(0)
  const [messageThreads, setMessageThreads] = useState<Record<string, EnhancedMessage[]>>({})
  const typingTimeoutRef = useRef<number>()

  const currentUser = {
    id: "current-user",
    name: "Alex Wong",
    avatar: "/placeholder.svg?key=sur73",
  }

  // Enhanced message interface with reactions and threading
  interface EnhancedMessage extends Message {
    reactions?: Array<{
      emoji: string
      count: number
      users: string[]
      timestamp: Date
    }>
    isPinned?: boolean
    isEdited?: boolean
    isEncrypted?: boolean
    threadCount?: number
    replyTo?: string
    readBy?: string[]
  }

  // Simulate real-time typing indicators
  const handleTyping = useCallback((channelId: string, isTyping: boolean) => {
    setIsTyping(prev => ({ ...prev, [channelId]: isTyping }))
    
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }
    
    if (isTyping) {
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(prev => ({ ...prev, [channelId]: false }))
      }, 3000)
    }
  }, [])

  // Enhanced message sending with reactions and threading
  const sendMessage = useCallback((channelId: string, content: string, replyTo?: string) => {
    const newMessage: EnhancedMessage = {
      id: `msg-${Date.now()}`,
      channelId,
      content,
      sender: {
        id: "current-user",
        name: "You",
        avatar: "/placeholder.svg?key=sur73",
      },
      timestamp: new Date(),
      status: "sending",
      isOwn: true,
      isEncrypted: encryptionEnabled,
      replyTo,
      readBy: ["You"]
    }

    setMessages((prev) => ({
      ...prev,
      [channelId]: [...(prev[channelId] || []), newMessage],
    }))

    // Simulate message delivery
    setTimeout(() => {
      setMessages((prev) => ({
        ...prev,
        [channelId]: (prev[channelId] ? prev[channelId].map : undefined)(msg => 
          msg.id === newMessage.id ? { ...msg, status: "sent" } : msg
        )
      }))
    }, 1000)

    // Simulate message read
    setTimeout(() => {
      setMessages((prev) => ({
        ...prev,
        [channelId]: (prev[channelId] ? prev[channelId].map : undefined)(msg => 
          msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg
        )
      }))
    }, 2000)

    return newMessage.id
  }, [encryptionEnabled])

  // Add reaction to message
  const addReaction = useCallback((messageId: string, emoji: string) => {
    setMessages((prev) => {
      const newMessages = { ...prev }
      
      for (const channelId in newMessages) {
        const messageIndex = (newMessages[channelId] ? newMessages[channelId].findIndex : undefined)((m) => m.id === messageId)
        if (messageIndex !== -1) {
          const message = newMessages[channelId][messageIndex] as EnhancedMessage
          const existingReaction = message.reactions?.find(r => r.emoji === emoji)
          
          if (existingReaction) {
            existingReaction.count++
            if (!existingReaction.users.includes("You")) {
              existingReaction.users.push("You")
            }
          } else {
            message.reactions = [...(message.reactions || []), { emoji, count: 1, users: ["You"], timestamp: new Date() }]
          }
          
          newMessages[channelId] = [...newMessages[channelId]]
          newMessages[channelId][messageIndex] = message
          break
        }
      }
      
      return newMessages
    })
  }, [])

  // Pin/unpin message
  const togglePinMessage = useCallback((channelId: string, messageId: string) => {
    setMessages((prev) => {
      const newMessages = { ...prev }
      const messageIndex = (newMessages[channelId] ? newMessages[channelId].findIndex : undefined)((m) => m.id === messageId)
      
      if (messageIndex !== -1) {
        const message = newMessages[channelId][messageIndex] as EnhancedMessage
        message.isPinned = !message.isPinned
        
        newMessages[channelId] = [...newMessages[channelId]]
        newMessages[channelId][messageIndex] = message
      }
      
      return newMessages
    })
  }, [])

  // Edit message
  const editMessage = useCallback((messageId: string, newContent: string) => {
    setMessages((prev) => {
      const newMessages = { ...prev }

      for (const channelId in newMessages) {
        const messageIndex = (newMessages[channelId] ? newMessages[channelId].findIndex : undefined)((m) => m.id === messageId)
        if (messageIndex !== -1) {
          const message = newMessages[channelId][messageIndex] as EnhancedMessage
          message.content = newContent
          message.isEdited = true
          
          newMessages[channelId] = [...newMessages[channelId]]
          newMessages[channelId][messageIndex] = message
          break
        }
      }

      return newMessages
    })
  }, [])

  // Delete message
  const deleteMessage = useCallback((messageId: string) => {
    setMessages((prev) => {
      const newMessages = { ...prev }

      for (const channelId in newMessages) {
        const messageIndex = (newMessages[channelId] ? newMessages[channelId].findIndex : undefined)((m) => m.id === messageId)
        if (messageIndex !== -1) {
          newMessages[channelId] = (newMessages[channelId] ? newMessages[channelId].filter : undefined)((m) => m.id !== messageId)
          break
        }
      }

      return newMessages
    })
  }, [])

  // Add message to thread
  const addToThread = useCallback((parentMessageId: string, content: string) => {
    const threadMessage: EnhancedMessage = {
      id: `thread-${Date.now()}`,
      channelId: "thread",
      content,
      sender: {
        id: "current-user",
        name: "You",
        avatar: "/placeholder.svg?key=sur73",
      },
      timestamp: new Date(),
      status: "sent",
      isOwn: true,
      replyTo: parentMessageId
    }

    setMessageThreads((prev) => ({
      ...prev,
      [parentMessageId]: [...(prev[parentMessageId] || []), threadMessage]
    }))
  }, [])

  // Mark message as read
  const markAsRead = useCallback((messageId: string) => {
    setMessages((prev) => {
      const newMessages = { ...prev }

      for (const channelId in newMessages) {
        const messageIndex = (newMessages[channelId] ? newMessages[channelId].findIndex : undefined)((m) => m.id === messageId)
        if (messageIndex !== -1) {
          const message = newMessages[channelId][messageIndex] as EnhancedMessage
          if (!message.readBy?.includes("You")) {
            message.readBy = [...(message.readBy || []), "You"]
            message.status = "read"
            
            newMessages[channelId] = [...newMessages[channelId]]
            newMessages[channelId][messageIndex] = message
          }
          break
        }
      }

      return newMessages
    })
  }, [])

  // Simulate real-time online users
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineUsers(["Sarah Chen", "David Wong", "Michelle Lee", "You"])
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Simulate security alerts
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        setSecurityAlerts(prev => prev + 1)
      }
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  // Fetch channels
  const fetchChannels = useCallback(() => {
    setLoading(true)
    setTimeout(() => {
      const mockChannels = generateMockChannels()
      const channelsBySection: Record<string, Channel[]> = {}

      mockChannels.forEach((channel) => {
        const sectionId = getSectionIdForChannel(channel)
        if (!channelsBySection[sectionId]) {
          channelsBySection[sectionId] = []
        }
        (channelsBySection[sectionId] ? channelsBySection[sectionId].push : undefined)(channel)
      })

      setChannels(channelsBySection)
      setLoading(false)
    }, 1000)
  }, [])

  // Get section ID for a channel
  const getSectionIdForChannel = (channel: Channel): string => {
    if (channel.platform === "whatsapp") return "whatsapp"
    if (channel.platform === "telegram") return "telegram"
    return channel.type
  }

  // Fetch messages for a channel
  const fetchMessages = useCallback((channelId: string) => {
    setLoading(true)
    setTimeout(() => {
      const mockMessages = generateMockMessages(channelId)
      setMessages((prev) => ({
        ...prev,
        [channelId]: mockMessages,
      }))
      setLoading(false)
    }, 800)
  }, [])

  // Load initial data
  useEffect(() => {
    fetchChannels()
  }, [fetchChannels])

  return {
    sections,
    channels,
    messages,
    loading,
    currentUser,
    platformIntegrations,
    isTyping,
    onlineUsers,
    messageReactions,
    pinnedMessages,
    encryptionEnabled,
    securityAlerts,
    messageThreads,
    fetchChannels,
    fetchMessages,
    sendMessage,
    editMessage,
    deleteMessage,
    addReaction,
    togglePinMessage,
    addToThread,
    markAsRead,
    handleTyping,
    setEncryptionEnabled,
  }
}
