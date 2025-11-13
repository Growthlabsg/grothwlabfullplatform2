"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"

// Types
interface User {
  id: string
  name: string
  avatar?: string
  email?: string
  status?: "online" | "away" | "offline" | "busy"
  role?: string
}

interface Message {
  id: string
  content: string
  timestamp: Date
  sender: User
  recipient?: User
  channelId?: string
  status: "sending" | "sent" | "delivered" | "read" | "failed"
  isEdited?: boolean
  reactions?: { emoji: string; users: string[] }[]
  replyTo?: string
  threadId?: string
}

interface Channel {
  id: string
  name: string
  type: "public" | "private" | "direct"
  description?: string
  members: User[]
  unreadCount: number
  lastMessage?: Message
  isPinned?: boolean
  isMuted?: boolean
  isArchived?: boolean
}

interface CommunicationState {
  // Current state
  currentChannel: Channel | null
  currentUser: User | null
  isOnline: boolean
  
  // Data
  channels: Channel[]
  messages: Message[]
  users: User[]
  
  // UI state
  isHubOpen: boolean
  unreadCount: number
  isTyping: { [channelId: string]: User[] }
  
  // Settings
  notifications: {
    enabled: boolean
    sound: boolean
    desktop: boolean
  }
}

interface CommunicationActions {
  // Channel management
  setCurrentChannel: (channel: Channel | null) => void
  createChannel: (name: string, type: "public" | "private", members: User[]) => Channel
  joinChannel: (channelId: string) => void
  leaveChannel: (channelId: string) => void
  pinChannel: (channelId: string) => void
  muteChannel: (channelId: string) => void
  archiveChannel: (channelId: string) => void
  
  // Messaging
  sendMessage: (content: string, channelId?: string, recipientId?: string) => void
  editMessage: (messageId: string, content: string) => void
  deleteMessage: (messageId: string) => void
  addReaction: (messageId: string, emoji: string) => void
  removeReaction: (messageId: string, emoji: string) => void
  replyToMessage: (messageId: string, content: string) => void
  
  // User management
  setCurrentUser: (user: User) => void
  updateUserStatus: (status: "online" | "away" | "offline" | "busy") => void
  startTyping: (channelId: string) => void
  stopTyping: (channelId: string) => void
  
  // UI management
  openHub: () => void
  closeHub: () => void
  markAsRead: (channelId: string) => void
  
  // Settings
  updateNotifications: (settings: Partial<CommunicationState["notifications"]>) => void
}

type CommunicationContextType = CommunicationState & CommunicationActions

const CommunicationContext = createContext<CommunicationContextType | undefined>(undefined)

// Mock data
const mockUsers: User[] = [
  {
    id: "user-1",
    name: "John Doe",
    avatar: "/abstract-geometric-shapes.png",
    email: "john@example.com",
    status: "online",
    role: "Founder"
  },
  {
    id: "user-2",
    name: "Sarah Chen",
    avatar: "/abstract-geometric-aw.png",
    email: "sarah@example.com",
    status: "away",
    role: "Investor"
  },
  {
    id: "user-3",
    name: "David Wong",
    avatar: "/professional-woman-diverse.png",
    email: "david@example.com",
    status: "online",
    role: "Mentor"
  },
  {
    id: "user-4",
    name: "Jane Smith",
    avatar: "/tech-professional.png",
    email: "jane@example.com",
    status: "offline",
    role: "Developer"
  }
]

const mockChannels: Channel[] = [
  {
    id: "general",
    name: "General",
    type: "public",
    description: "General discussions for everyone",
    members: mockUsers,
    unreadCount: 3,
    isPinned: true,
    lastMessage: {
      id: "msg-1",
      content: "Welcome to GrowthLab! 🚀",
      timestamp: new Date(Date.now() - 3600000),
      sender: mockUsers[0] || { id: "unknown", name: "Unknown User", email: "", role: "" },
      status: "read"
    }
  },
  {
    id: "funding",
    name: "Funding",
    type: "private",
    description: "Funding discussions and opportunities",
    members: mockUsers.slice(0, 3),
    unreadCount: 1,
    isPinned: false,
    lastMessage: {
      id: "msg-2",
      content: "New funding round announced!",
      timestamp: new Date(Date.now() - 7200000),
      sender: mockUsers[1] || { id: "unknown", name: "Unknown User", email: "", role: "" },
      status: "read"
    }
  },
  {
    id: "mentorship",
    name: "Mentorship",
    type: "public",
    description: "Mentorship discussions and opportunities",
    members: mockUsers,
    unreadCount: 0,
    isPinned: false,
    lastMessage: {
      id: "msg-3",
      content: "Looking for a mentor in fintech",
      timestamp: new Date(Date.now() - 86400000),
      sender: mockUsers[2] || { id: "unknown", name: "Unknown User", email: "", role: "" },
      status: "read"
    }
  }
]

const mockMessages: Message[] = [
  {
    id: "msg-1",
    content: "Welcome to GrowthLab! 🚀",
    timestamp: new Date(Date.now() - 3600000),
    sender: mockUsers[0] || { id: "unknown", name: "Unknown User", email: "", role: "" },
    channelId: "general",
    status: "read"
  },
  {
    id: "msg-2",
    content: "New funding round announced!",
    timestamp: new Date(Date.now() - 7200000),
    sender: mockUsers[1] || { id: "unknown", name: "Unknown User", email: "", role: "" },
    channelId: "funding",
    status: "read"
  },
  {
    id: "msg-3",
    content: "Looking for a mentor in fintech",
    timestamp: new Date(Date.now() - 86400000),
    sender: mockUsers[2] || { id: "unknown", name: "Unknown User", email: "", role: "" },
    channelId: "mentorship",
    status: "read"
  }
]

export function CommunicationProvider({ children }: { children: React.ReactNode }) {
  // State
  const [currentChannel, setCurrentChannel] = useState<Channel | null>(null)
  const [currentUser, setCurrentUser] = useState<User | null>(mockUsers[0] || null)
  const [isOnline, setIsOnline] = useState(true)
  const [channels, setChannels] = useState<Channel[]>(mockChannels)
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [isHubOpen, setIsHubOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(4)
  const [isTyping, setIsTyping] = useState<{ [channelId: string]: User[] }>({})
  const [notifications, setNotifications] = useState({
    enabled: true,
    sound: true,
    desktop: true
  })

  // Calculate total unread count
  useEffect(() => {
    const total = channels.reduce((sum, channel) => sum + channel.unreadCount, 0)
    setUnreadCount(total)
  }, [channels])

  // Channel management
  const createChannel = useCallback((name: string, type: "public" | "private", members: User[]) => {
    const newChannel: Channel = {
      id: `channel-${Date.now()}`,
      name,
      type,
      members,
      unreadCount: 0,
      isPinned: false,
      isMuted: false,
      isArchived: false
    }
    setChannels(prev => [...prev, newChannel])
    return newChannel
  }, [])

  const joinChannel = useCallback((channelId: string) => {
    setChannels(prev => prev.map(channel => 
      channel.id === channelId 
        ? { ...channel, members: [...channel.members, currentUser!] }
        : channel
    ))
  }, [currentUser])

  const leaveChannel = useCallback((channelId: string) => {
    setChannels(prev => prev.map(channel => 
      channel.id === channelId 
        ? { ...channel, members: channel.members.filter(member => member.id !== currentUser?.id) }
        : channel
    ))
  }, [currentUser])

  const pinChannel = useCallback((channelId: string) => {
    setChannels(prev => prev.map(channel => 
      channel.id === channelId 
        ? { ...channel, isPinned: !channel.isPinned }
        : channel
    ))
  }, [])

  const muteChannel = useCallback((channelId: string) => {
    setChannels(prev => prev.map(channel => 
      channel.id === channelId 
        ? { ...channel, isMuted: !channel.isMuted }
        : channel
    ))
  }, [])

  const archiveChannel = useCallback((channelId: string) => {
    setChannels(prev => prev.map(channel => 
      channel.id === channelId 
        ? { ...channel, isArchived: !channel.isArchived }
        : channel
    ))
  }, [])

  // Messaging
  const sendMessage = useCallback((content: string, channelId?: string, recipientId?: string) => {
    if (!currentUser) return

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      content,
      timestamp: new Date(),
      sender: currentUser,
      channelId,
      recipient: recipientId ? { id: recipientId } as User : undefined,
      status: "sending"
    }

    setMessages(prev => [...prev, newMessage])

    // Update channel's last message and unread count
    if (channelId) {
      setChannels(prev => prev.map(channel => 
        channel.id === channelId 
          ? { 
              ...channel, 
              lastMessage: newMessage,
              unreadCount: channel.members.some(member => member.id === currentUser.id) 
                ? channel.unreadCount 
                : channel.unreadCount + 1
            }
          : channel
      ))
    }

    // Simulate message delivery
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === newMessage.id 
          ? { ...msg, status: "sent" }
          : msg
      ))
    }, 1000)
  }, [currentUser])

  const editMessage = useCallback((messageId: string, content: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, content, isEdited: true }
        : msg
    ))
  }, [])

  const deleteMessage = useCallback((messageId: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId))
  }, [])

  const addReaction = useCallback((messageId: string, emoji: string) => {
    if (!currentUser) return

    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const existingReaction = msg.reactions?.find(r => r.emoji === emoji)
        if (existingReaction) {
          if (!existingReaction.users.includes(currentUser.id)) {
            existingReaction.users.push(currentUser.id)
          }
        } else {
          const reactions = msg.reactions || []
          reactions.push({ emoji, users: [currentUser.id] })
          return { ...msg, reactions }
        }
      }
      return msg
    }))
  }, [currentUser])

  const removeReaction = useCallback((messageId: string, emoji: string) => {
    if (!currentUser) return

    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const reactions = msg.reactions?.map(r => 
          r.emoji === emoji 
            ? { ...r, users: r.users.filter(id => id !== currentUser.id) }
            : r
        ).filter(r => r.users.length > 0) || []
        return { ...msg, reactions }
      }
      return msg
    }))
  }, [currentUser])

  const replyToMessage = useCallback((messageId: string, content: string) => {
    if (!currentUser) return

    const replyToMessage = messages.find(msg => msg.id === messageId)
    if (!replyToMessage) return

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      content,
      timestamp: new Date(),
      sender: currentUser,
      channelId: replyToMessage.channelId,
      recipient: replyToMessage.recipient,
      replyTo: messageId,
      status: "sending"
    }

    setMessages(prev => [...prev, newMessage])
  }, [currentUser, messages])

  // User management
  const updateUserStatus = useCallback((status: "online" | "away" | "offline" | "busy") => {
    if (!currentUser) return

    setCurrentUser(prev => prev ? { ...prev, status } : null)
    setUsers(prev => prev.map(user => 
      user.id === currentUser.id 
        ? { ...user, status }
        : user
    ))
  }, [currentUser])

  const startTyping = useCallback((channelId: string) => {
    if (!currentUser) return

    setIsTyping(prev => ({
      ...prev,
      [channelId]: [...(prev[channelId] || []).filter(user => user.id !== currentUser.id), currentUser]
    }))

    // Auto stop typing after 3 seconds
    setTimeout(() => {
      stopTyping(channelId)
    }, 3000)
  }, [currentUser])

  const stopTyping = useCallback((channelId: string) => {
    if (!currentUser) return

    setIsTyping(prev => ({
      ...prev,
      [channelId]: (prev[channelId] || []).filter(user => user.id !== currentUser.id)
    }))
  }, [currentUser])

  // UI management
  const openHub = useCallback(() => {
    setIsHubOpen(true)
  }, [])

  const closeHub = useCallback(() => {
    setIsHubOpen(false)
  }, [])

  const markAsRead = useCallback((channelId: string) => {
    setChannels(prev => prev.map(channel => 
      channel.id === channelId 
        ? { ...channel, unreadCount: 0 }
        : channel
    ))
  }, [])

  // Settings
  const updateNotifications = useCallback((settings: Partial<CommunicationState["notifications"]>) => {
    setNotifications(prev => ({ ...prev, ...settings }))
  }, [])

  const value: CommunicationContextType = {
    // State
    currentChannel,
    currentUser,
    isOnline,
    channels,
    messages,
    users,
    isHubOpen,
    unreadCount,
    isTyping,
    notifications,

    // Actions
    setCurrentChannel,
    createChannel,
    joinChannel,
    leaveChannel,
    pinChannel,
    muteChannel,
    archiveChannel,
    sendMessage,
    editMessage,
    deleteMessage,
    addReaction,
    removeReaction,
    replyToMessage,
    setCurrentUser,
    updateUserStatus,
    startTyping,
    stopTyping,
    openHub,
    closeHub,
    markAsRead,
    updateNotifications
  }

  return (
    <CommunicationContext.Provider value={value}>
      {children}
    </CommunicationContext.Provider>
  )
}

export function useCommunication() {
  const context = useContext(CommunicationContext)
  if (context === undefined) {
    throw new Error("useCommunication must be used within a CommunicationProvider")
  }
  return context
}
