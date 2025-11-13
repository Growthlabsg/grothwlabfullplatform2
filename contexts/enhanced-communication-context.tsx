"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import type { Channel, Message, User, PlatformType, ScheduledMessage, Section } from "@/types/communication"
import { generateMockChannels, generateMockMessages, mockUsers } from "@/lib/mock-communication-data"

interface EnhancedCommunicationContextType {
  // Core data
  currentUser: User
  channels: Channel[]
  channelsBySectionId: Record<string, Channel[]>
  messages: Record<string, Message[]>
  sections: Section[]
  loading: boolean

  // UI state
  activeSection: Section | null
  selectedChannel: Channel | null
  composerContent: string
  platformIntegrations: PlatformType[]
  scheduledMessages: ScheduledMessage[]

  // Pagination
  loadingMoreMessages: boolean
  hasMoreMessages: boolean

  // Actions
  setActiveSection: (section: Section | null) => void
  setSelectedChannel: (channel: Channel | null) => void
  setComposerContent: (content: string) => void
  sendMessage: (content: string, attachments?: any[]) => Promise<void>
  editMessage: (messageId: string, newContent: string) => void
  deleteMessage: (messageId: string) => void
  markAsRead: (channelId: string) => void
  loadMoreMessages: () => Promise<void>
  pinChannel: (channelId: string) => void
  archiveChannel: (channelId: string) => void
  createChannel: (name: string, type: string, members: string[]) => Promise<void>
  scheduleMessage: (content: string, channelId: string, scheduledTime: Date) => Promise<void>
  loadAllChannels: () => void
}

const defaultSections: Section[] = [
  { id: "direct", name: "Direct Messages", type: "direct" },
  { id: "group", name: "Group Chats", type: "group" },
  { id: "team", name: "Team Channels", type: "team" },
  { id: "community", name: "Community", type: "community" },
  { id: "broadcast", name: "Broadcast", type: "broadcast" },
]

const EnhancedCommunicationContext = createContext<EnhancedCommunicationContextType | undefined>(undefined)

export function EnhancedCommunicationProvider({ children }: { children: React.ReactNode }) {
  // Core data state
  const [currentUser] = useState<User>(mockUsers[5])
  const [channels, setChannels] = useState<Channel[]>([])
  const [messages, setMessages] = useState<Record<string, Message[]>>({})
  const [sections] = useState<Section[]>(defaultSections)
  const [loading, setLoading] = useState<boolean>(true)

  // UI state
  const [activeSection, setActiveSection] = useState<Section | null>(null)
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null)
  const [composerContent, setComposerContent] = useState<string>("")
  const [platformIntegrations, setPlatformIntegrations] = useState<PlatformType[]>([])
  const [scheduledMessages, setScheduledMessages] = useState<ScheduledMessage[]>([])

  // Pagination
  const [loadingMoreMessages, setLoadingMoreMessages] = useState<boolean>(false)
  const [hasMoreMessages, setHasMoreMessages] = useState<boolean>(true)

  // Group channels by section for easy access
  const channelsBySectionId = channels.reduce(
    (acc, channel) => {
      const sectionId =
        channel.type === "direct"
          ? "direct"
          : channel.type === "group"
            ? "group"
            : channel.type === "team"
              ? "team"
              : channel.type === "community"
                ? "community"
                : "broadcast"

      if (!acc[sectionId]) {
        acc[sectionId] = []
      }

      (acc[sectionId] ? acc[sectionId].push : undefined)(channel)
      return acc
    },
    {} as Record<string, Channel[]>,
  )

  // Load mock channels
  useEffect(() => {
    const loadChannels = async () => {
      setLoading(true)
      try {
        // In a real app, this would be an API call
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const mockChannels = generateMockChannels()
        setChannels(mockChannels)
      } catch (error) {
        console.error("Failed to load channels:", error)
      } finally {
        setLoading(false)
      }
    }

    loadChannels()
  }, [])

  // Load messages when a channel is selected
  useEffect(() => {
    if (selectedChannel) {
      const loadMessages = async () => {
        try {
          // In a real app, this would be an API call
          // Simulate network delay
          await new Promise((resolve) => setTimeout(resolve, 800))
          const mockMessages = generateMockMessages(selectedChannel.id)
          setMessages((prev) => ({
            ...prev,
            [selectedChannel.id]: mockMessages,
          }))

          // Mark channel as read
          markAsRead(selectedChannel.id)
        } catch (error) {
          console.error("Failed to load messages:", error)
        }
      }

      if (!messages[selectedChannel.id]) {
        loadMessages()
      }
    }
  }, [selectedChannel])

  // Send a message
  const sendMessage = useCallback(
    async (content: string, attachments: any[] = []) => {
      if (!selectedChannel || !content.trim()) return

      // Create new message
      const newMessage: Message = {
        id: `msg-${Date.now()}`,
        channelId: selectedChannel.id,
        content,
        sender: currentUser,
        timestamp: new Date(),
        status: "sending",
        isOwn: true,
        attachments: attachments.map((att, i) => ({
          id: `att-${Date.now()}-${i}`,
          ...att,
        })),
        platform: selectedChannel.platform,
      }

      // Optimistically add to state
      setMessages((prev) => ({
        ...prev,
        [selectedChannel.id]: [...(prev[selectedChannel.id] || []), newMessage],
      }))

      // Clear input
      setComposerContent("")

      // Simulate sending process
      setTimeout(() => {
        setMessages((prev) => ({
          ...prev,
          [selectedChannel.id]: prev[selectedChannel.id].map((msg) =>
            msg.id === newMessage.id ? { ...msg, status: "sent" } : msg,
          ),
        }))

        // Update channel's last message
        setChannels((prev) =>
          prev.map((channel) =>
            channel.id === selectedChannel.id
              ? {
                  ...channel,
                  lastMessage: { content, timestamp: new Date() },
                }
              : channel,
          ),
        )

        // Simulate delivery confirmation
        setTimeout(() => {
          setMessages((prev) => ({
            ...prev,
            [selectedChannel.id]: prev[selectedChannel.id].map((msg) =>
              msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg,
            ),
          }))

          // Simulate read receipt after some time
          setTimeout(() => {
            setMessages((prev) => ({
              ...prev,
              [selectedChannel.id]: prev[selectedChannel.id].map((msg) =>
                msg.id === newMessage.id ? { ...msg, status: "read" } : msg,
              ),
            }))
          }, 3000)
        }, 1500)
      }, 1000)
    },
    [selectedChannel, currentUser],
  )

  // Edit a message
  const editMessage = useCallback((messageId: string, newContent: string) => {
    setMessages((prev) => {
      const updated = { ...prev }

      // Find the channel containing this message
      Object.keys(updated).forEach((channelId) => {
        const messageIndex = (updated[channelId] ? updated[channelId].findIndex : undefined)((msg) => msg.id === messageId)
        if (messageIndex !== -1) {
          updated[channelId] = [...updated[channelId]]
          updated[channelId][messageIndex] = {
            ...updated[channelId][messageIndex],
            content: newContent,
            // isEdited: true,
          }
        }
      })

      return updated
    })
  }, [])

  // Delete a message
  const deleteMessage = useCallback((messageId: string) => {
    setMessages((prev) => {
      const updated = { ...prev }

      // Find the channel containing this message
      Object.keys(updated).forEach((channelId) => {
        const messageIndex = (updated[channelId] ? updated[channelId].findIndex : undefined)((msg) => msg.id === messageId)
        if (messageIndex !== -1) {
          updated[channelId] = (updated[channelId] ? updated[channelId].filter : undefined)((msg) => msg.id !== messageId)
        }
      })

      return updated
    })
  }, [])

  // Mark channel as read
  const markAsRead = useCallback((channelId: string) => {
    setChannels((prev) => prev.map((channel) => (channel.id === channelId ? { ...channel, unreadCount: 0 } : channel)))
  }, [])

  // Load more messages (pagination)
  const loadMoreMessages = useCallback(async () => {
    if (!selectedChannel || loadingMoreMessages || !hasMoreMessages) return

    setLoadingMoreMessages(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Get existing messages for this channel
      const existingMessages = messages[selectedChannel.id] || []

      // In a real app, you'd fetch older messages based on the oldest message you have
      // Here we'll simulate by adding 5 more messages
      const oldestTimestamp = existingMessages.length > 0 ? (existingMessages[0] ? existingMessages[0].timestamp : undefined) : new Date()

      const olderMessages: Message[] = []

      for (let i = 0; i < 5; i++) {
        const timestamp = new Date(oldestTimestamp)
        timestamp.setMinutes(timestamp.getMinutes() - (i + 1) * 30)

        const isOwn = Math.random() > 0.5
        const sender = isOwn ? currentUser : mockUsers[Math.floor(Math.random() * 5)]

        olderMessages.push({
          id: `msg-older-${Date.now()}-${i}`,
          channelId: selectedChannel.id,
          content: messageTemplates[Math.floor(Math.random() * messageTemplates.length)],
          sender,
          timestamp,
          status: isOwn ? "read" : "read",
          isOwn,
          platform: selectedChannel.platform,
        })
      }

      // Add older messages to the beginning
      setMessages((prev) => ({
        ...prev,
        [selectedChannel.id]: [...olderMessages, ...(prev[selectedChannel.id] || [])],
      }))

      // Randomly decide if we have more messages
      setHasMoreMessages(Math.random() > 0.3)
    } catch (error) {
      console.error("Failed to load more messages:", error)
    } finally {
      setLoadingMoreMessages(false)
    }
  }, [selectedChannel, messages, loadingMoreMessages, hasMoreMessages, currentUser])

  // Pin/unpin a channel
  const pinChannel = useCallback((channelId: string) => {
    setChannels((prev) =>
      prev.map((channel) => (channel.id === channelId ? { ...channel, isPinned: !channel.isPinned } : channel)),
    )
  }, [])

  // Archive/unarchive a channel
  const archiveChannel = useCallback((channelId: string) => {
    setChannels((prev) =>
      prev.map((channel) => (channel.id === channelId ? { ...channel, isArchived: !channel.isArchived } : channel)),
    )
  }, [])

  // Create a new channel
  const createChannel = useCallback(async (name: string, type: string, memberIds: string[]) => {
    // In a real app, this would be an API call
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const newChannel: Channel = {
      id: `${type}-${Date.now()}`,
      name,
      type: type as any,
      unreadCount: 0,
      members: memberIds.length + 1, // +1 for current user
      platform: "native",
      lastMessage: {
        content: "Channel created",
        timestamp: new Date(),
      },
    }

    setChannels((prev) => [newChannel, ...prev])
    return
  }, [])

  // Schedule a message
  const scheduleMessage = useCallback(async (content: string, channelId: string, scheduledTime: Date) => {
    // In a real app, this would be an API call
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newScheduledMessage: ScheduledMessage = {
      id: `scheduled-${Date.now()}`,
      content,
      channelId,
      scheduledTime,
    }

    setScheduledMessages((prev) => [...prev, newScheduledMessage])
  }, [])

  // Reload all channels
  const loadAllChannels = useCallback(() => {
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      const mockChannels = generateMockChannels()
      setChannels(mockChannels)
      setLoading(false)
    }, 1000)
  }, [])

  // Message templates for mock data
  const messageTemplates = [
    "Hey, how's it going with the project?",
    "Just checking in on the progress of the startup application.",
    "Can we schedule a meeting to discuss the funding proposal?",
    "I've shared the latest pitch deck with you.",
    "Have you seen the new investor that joined our platform?",
    "The mentor session yesterday was really insightful!",
    "Looking forward to the demo day next week.",
    "We need to finalize the team for the hackathon.",
    "Just submitted our application to the accelerator program.",
    "The feedback from the last pitch was really constructive.",
    "Do you have time to review my business model?",
    "I've updated the financial projections as requested.",
    "The new feature is ready for testing.",
    "Can you introduce me to that VC you mentioned?",
    "Our user growth metrics are looking promising this month.",
  ]

  const value = {
    currentUser,
    channels,
    channelsBySectionId,
    messages,
    sections,
    loading,
    activeSection,
    selectedChannel,
    composerContent,
    platformIntegrations,
    scheduledMessages,
    loadingMoreMessages,
    hasMoreMessages,
    setActiveSection,
    setSelectedChannel,
    setComposerContent,
    sendMessage,
    editMessage,
    deleteMessage,
    markAsRead,
    loadMoreMessages,
    pinChannel,
    archiveChannel,
    createChannel,
    scheduleMessage,
    loadAllChannels,
  }

  return <EnhancedCommunicationContext.Provider value={value}>{children}</EnhancedCommunicationContext.Provider>
}

export function useEnhancedCommunication() {
  const context = useContext(EnhancedCommunicationContext)
  if (context === undefined) {
    throw new Error("useEnhancedCommunication must be used within a EnhancedCommunicationProvider")
  }
  return context
}
