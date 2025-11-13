"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import type { Channel, Message, Section, User, PlatformType } from "@/types/communication"

interface CommunicationContextType {
  currentUser: User
  sections: Section[]
  channels: Record<string, Channel[]>
  messages: Record<string, Message[]>
  loading: boolean
  platformIntegrations: PlatformType[]
  activeSection: Section | null
  selectedChannel: Channel | null
  setActiveSection: (section: Section | null) => void
  setSelectedChannel: (channel: Channel | null) => void
  sendMessage: (channelId: string, content: string) => Promise<void>
  editMessage: (messageId: string, newContent: string) => void
  deleteMessage: (messageId: string) => void
  integrateWithPlatform: (platform: PlatformType, credentials?: any) => Promise<void>
  removePlatformIntegration: (platform: PlatformType) => Promise<void>
  createChannel: (
    name: string,
    description: string,
    section: Section,
    isPrivate: boolean,
    members: string[],
  ) => Promise<void>
}

// Mock data for sections
const mockSections: Section[] = [
  { id: "team", name: "Team Channels", type: "team" },
  { id: "direct", name: "Direct Messages", type: "direct" },
  { id: "group", name: "Group Chats", type: "group" },
  { id: "community", name: "Community", type: "community" },
  { id: "broadcast", name: "Broadcasts", type: "broadcast" },
  { id: "whatsapp", name: "WhatsApp", type: "whatsapp" },
  { id: "telegram", name: "Telegram", type: "telegram" },
]

// Mock current user
const mockCurrentUser: User = {
  id: "user-1",
  name: "John Doe",
  avatar: "/vibrant-street-market.png",
  status: "online",
}

// Mock channels
const mockChannels: Record<string, Channel[]> = {
  team: [
    {
      id: "channel-1",
      name: "general",
      type: "team",
      unreadCount: 0,
      members: 24,
      platform: "native",
      lastMessage: {
        content: "Welcome to the general channel!",
        timestamp: new Date(),
      },
    },
    {
      id: "channel-2",
      name: "announcements",
      type: "team",
      unreadCount: 3,
      members: 24,
      platform: "native",
      lastMessage: {
        content: "New features coming soon!",
        timestamp: new Date(),
      },
    },
  ],
  direct: [
    {
      id: "dm-1",
      name: "Sarah Chen",
      type: "direct",
      unreadCount: 2,
      members: 2,
      platform: "native",
      lastMessage: {
        content: "Can we discuss the project tomorrow?",
        timestamp: new Date(),
      },
    },
    {
      id: "dm-2",
      name: "Alex Wong",
      type: "direct",
      unreadCount: 0,
      members: 2,
      platform: "native",
      lastMessage: {
        content: "Thanks for your help!",
        timestamp: new Date(),
      },
    },
  ],
  group: [
    {
      id: "group-1",
      name: "Product Team",
      type: "group",
      unreadCount: 5,
      members: 8,
      platform: "native",
      lastMessage: {
        content: "Meeting at 2pm tomorrow",
        timestamp: new Date(),
      },
    },
  ],
  community: [],
  broadcast: [],
  whatsapp: [],
  telegram: [],
}

// Mock messages
const mockMessages: Record<string, Message[]> = {
  "channel-1": [
    {
      id: "msg-1",
      channelId: "channel-1",
      content: "Welcome to the general channel!",
      sender: {
        id: "admin",
        name: "Admin",
        avatar: "/abstract-admin-interface.png",
      },
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      status: "read",
      isOwn: false,
    },
    {
      id: "msg-2",
      channelId: "channel-1",
      content: "Thanks for having me!",
      sender: mockCurrentUser,
      timestamp: new Date(Date.now() - 82800000), // 23 hours ago
      status: "read",
      isOwn: true,
    },
  ],
  "dm-1": [
    {
      id: "msg-3",
      channelId: "dm-1",
      content: "Hi, how are you?",
      sender: {
        id: "user-2",
        name: "Sarah Chen",
        avatar: "/thoughtful-portrait.png",
      },
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      status: "read",
      isOwn: false,
    },
    {
      id: "msg-4",
      channelId: "dm-1",
      content: "I'm good, thanks! How about you?",
      sender: mockCurrentUser,
      timestamp: new Date(Date.now() - 3540000), // 59 minutes ago
      status: "read",
      isOwn: true,
    },
    {
      id: "msg-5",
      channelId: "dm-1",
      content: "Can we discuss the project tomorrow?",
      sender: {
        id: "user-2",
        name: "Sarah Chen",
        avatar: "/thoughtful-portrait.png",
      },
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      status: "delivered",
      isOwn: false,
    },
  ],
}

const CommunicationContext = createContext<CommunicationContextType | undefined>(undefined)

export function CommunicationProvider({ children }: { children: ReactNode }) {
  const [sections] = useState<Section[]>(mockSections)
  const [channels] = useState<Record<string, Channel[]>>(mockChannels)
  const [messages, setMessages] = useState<Record<string, Message[]>>(mockMessages)
  const [loading, setLoading] = useState(false)
  const [platformIntegrations, setPlatformIntegrations] = useState<PlatformType[]>([])
  const [activeSection, setActiveSection] = useState<Section | null>(null)
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null)

  // Send a message
  const sendMessage = useCallback(async (channelId: string, content: string) => {
    if (!content.trim()) return

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      channelId,
      content,
      sender: mockCurrentUser,
      timestamp: new Date(),
      status: "sent",
      isOwn: true,
    }

    setMessages((prev) => ({
      ...prev,
      [channelId]: [...(prev[channelId] || []), newMessage],
    }))

    // Simulate message status updates
    setTimeout(() => {
      setMessages((prev) => ({
        ...prev,
        [channelId]: (prev[channelId] ? prev[channelId].map : undefined)((msg) => (msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg)),
      }))

      setTimeout(() => {
        setMessages((prev) => ({
          ...prev,
          [channelId]: (prev[channelId] ? prev[channelId].map : undefined)((msg) => (msg.id === newMessage.id ? { ...msg, status: "read" } : msg)),
        }))
      }, 2000)
    }, 1000)
  }, [])

  // Edit a message
  const editMessage = useCallback((messageId: string, newContent: string) => {
    setMessages((prev) => {
      const newMessages = { ...prev }

      // Find the channel that contains this message
      for (const channelId in newMessages) {
        const messageIndex = (newMessages[channelId] ? newMessages[channelId].findIndex : undefined)((msg) => msg.id === messageId)
        if (messageIndex !== -1) {
          newMessages[channelId] = [...newMessages[channelId]]
          newMessages[channelId][messageIndex] = {
            ...newMessages[channelId][messageIndex],
            content: newContent,
            // isEdited: true,
          }
          break
        }
      }

      return newMessages
    })
  }, [])

  // Delete a message
  const deleteMessage = useCallback((messageId: string) => {
    setMessages((prev) => {
      const newMessages = { ...prev }

      // Find the channel that contains this message
      for (const channelId in newMessages) {
        const messageIndex = (newMessages[channelId] ? newMessages[channelId].findIndex : undefined)((msg) => msg.id === messageId)
        if (messageIndex !== -1) {
          newMessages[channelId] = (newMessages[channelId] ? newMessages[channelId].filter : undefined)((msg) => msg.id !== messageId)
          break
        }
      }

      return newMessages
    })
  }, [])

  // Integrate with a platform
  const integrateWithPlatform = useCallback(async (platform: PlatformType, credentials?: any) => {
    console.log(`Integrating with ${platform}`, credentials)
    setPlatformIntegrations((prev) => [...prev, platform])
    return Promise.resolve()
  }, [])

  // Remove a platform integration
  const removePlatformIntegration = useCallback(async (platform: PlatformType) => {
    console.log(`Removing integration with ${platform}`)
    setPlatformIntegrations((prev) => prev.filter((p) => p !== platform))
    return Promise.resolve()
  }, [])

  // Create a new channel
  const createChannel = useCallback(
    async (name: string, description: string, section: Section, isPrivate: boolean, members: string[]) => {
      console.log(`Creating channel ${name} in section ${section.name}`)
      // In a real app, this would make an API call
      return Promise.resolve()
    },
    [],
  )

  const value = {
    currentUser: mockCurrentUser,
    sections,
    channels,
    messages,
    loading,
    platformIntegrations,
    activeSection,
    selectedChannel,
    setActiveSection,
    setSelectedChannel,
    sendMessage,
    editMessage,
    deleteMessage,
    integrateWithPlatform,
    removePlatformIntegration,
    createChannel,
  }

  return <CommunicationContext.Provider value={value}>{children}</CommunicationContext.Provider>
}

export function useCommunication() {
  const context = useContext(CommunicationContext)
  if (context === undefined) {
    throw new Error("useCommunication must be used within a CommunicationProvider")
  }
  return context
}
