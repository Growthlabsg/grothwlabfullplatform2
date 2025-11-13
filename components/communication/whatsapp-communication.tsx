"use client"

import { SelectItem } from "@/components/ui/select"

import { SelectContent } from "@/components/ui/select"

import { SelectValue } from "@/components/ui/select"

import { SelectTrigger } from "@/components/ui/select"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { ErrorBoundary } from "@/components/error-boundary"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Search,
  MoreVertical,
  Phone,
  Video,
  Paperclip,
  Smile,
  Send,
  Mic,
  ImageIcon,
  File,
  Monitor,
  ArrowLeft,
  Check,
  CheckCheck,
  Clock,
  X,
  Lock,
  Info,
  Users,
  UserPlus,
  Bell,
  Star,
  Trash2,
  Archive,
  MessageSquare,
  WifiOff,
  Camera,
  FileText,
  Music,
  Film,
  Plus,
  Settings,
  UserCircle,
  Megaphone,
  Copy,
  Edit,
  Download,
  Menu,
  StarOff,
  Play,
  ChevronDown,
  Reply,
  Forward,
  UserMinus,
  UserX,
  Layout,
  MapPin,
  BoxSelectIcon as Select,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useOnClickOutside } from "@/hooks/use-click-outside"

// Types
interface User {
  id: string
  name: string
  avatar?: string
  status?: "online" | "offline" | "typing"
  lastSeen?: string
  about?: string
  phone?: string
  email?: string
  isBlocked?: boolean
  isMuted?: boolean
}

interface Contact extends User {
  unreadCount: number
  lastMessage?: {
    content: string
    timestamp: string
    sender: string
    status?: "sending" | "sent" | "delivered" | "read"
  }
  isPinned: boolean
  isArchived?: boolean
}

interface Group {
  id: string
  name: string
  avatar?: string
  description?: string
  participants: User[]
  admins: string[]
  unreadCount: number
  lastMessage?: {
    content: string
    timestamp: string
    sender: string
    status?: "sending" | "sent" | "delivered" | "read"
  }
  isPinned: boolean
  isArchived?: boolean
  isMuted?: boolean
  createdAt: string
}

interface Message {
  id: string
  content: string
  timestamp: Date
  sender: {
    id: string
    name: string
    avatar?: string
  }
  status: "sending" | "sent" | "delivered" | "read"
  isForwarded?: boolean
  isStarred?: boolean
  replyTo?: {
    id: string
    content: string
    sender: string
  }
  mentions?: string[]
  attachments?: {
    id: string
    type: "image" | "file" | "audio" | "video" | "voice"
    url: string
    name: string
    size?: number
    thumbnail?: string
    duration?: number
  }[]
  isEncrypted: boolean
}

interface StatusUpdate {
  id: string
  user: User
  content: {
    type: "text" | "image" | "video"
    data: string
    caption?: string
  }
  timestamp: Date
  seenBy: string[]
  expiresAt: Date
}

interface BroadcastList {
  id: string
  name: string
  recipients: User[]
  lastMessage?: {
    content: string
    timestamp: string
    status?: "sending" | "sent" | "delivered" | "read"
  }
}

interface MessageTemplate {
  id: string
  name: string
  content: string
  category?: string
}

type Conversation = Contact | Group

// Mock data
const currentUser: User = {
  id: "current-user",
  name: "You",
  avatar: "/abstract-geometric-ll.png",
  status: "online",
  about: "Available",
  phone: "+1234567890",
  email: "you@example.com",
}

const mockContacts: Contact[] = [
  {
    id: "contact-1",
    name: "Sarah Chen",
    avatar: "/abstract-geometric-shapes.png",
    status: "online",
    about: "At work",
    phone: "+1987654321",
    email: "sarah@example.com",
    unreadCount: 3,
    lastMessage: {
      content: "Can we discuss the project tomorrow?",
      timestamp: "10:42 AM",
      sender: "contact-1",
      status: "read",
    },
    isPinned: true,
  },
  {
    id: "contact-2",
    name: "Alex Wong",
    avatar: "/abstract-geometric-aw.png",
    status: "offline",
    lastSeen: "Yesterday",
    about: "Busy",
    phone: "+1122334455",
    email: "alex@example.com",
    unreadCount: 0,
    lastMessage: {
      content: "I'll send you the files later",
      timestamp: "Yesterday",
      sender: "contact-2",
      status: "read",
    },
    isPinned: false,
  },
  {
    id: "contact-3",
    name: "Mei Lin",
    avatar: "/machine-learning-concept.png",
    status: "typing",
    about: "Hello there!",
    phone: "+1555666777",
    email: "mei@example.com",
    unreadCount: 0,
    lastMessage: {
      content: "The presentation looks great!",
      timestamp: "Monday",
      sender: "contact-3",
      status: "read",
    },
    isPinned: false,
  },
  {
    id: "contact-4",
    name: "David Park",
    avatar: "/abstract-geometric-dk.png",
    status: "offline",
    lastSeen: "Last week",
    about: "On vacation",
    phone: "+1888999000",
    email: "david@example.com",
    unreadCount: 0,
    lastMessage: {
      content: "Thanks for your help with the project",
      timestamp: "Last week",
      sender: "current-user",
      status: "read",
    },
    isPinned: false,
    isArchived: true,
  },
]

const mockGroups: Group[] = [
  {
    id: "group-1",
    name: "Product Team",
    avatar: "/physical-therapy-session.png",
    description: "Group for product team discussions",
    participants: [
      { id: "contact-1", name: "Sarah Chen", avatar: "/abstract-geometric-shapes.png", status: "online" },
      { id: "contact-2", name: "Alex Wong", avatar: "/abstract-geometric-aw.png", status: "offline" },
      { id: "contact-3", name: "Mei Lin", avatar: "/machine-learning-concept.png", status: "typing" },
      currentUser,
    ],
    admins: ["current-user", "contact-1"],
    unreadCount: 5,
    lastMessage: {
      content: "Alex: Let's meet at 2pm",
      timestamp: "Yesterday",
      sender: "contact-2",
      status: "delivered",
    },
    isPinned: true,
    createdAt: "2023-01-15",
  },
  {
    id: "group-2",
    name: "Marketing Team",
    avatar: "/abstract-ms-flow.png",
    description: "Group for marketing team discussions",
    participants: [
      { id: "contact-1", name: "Sarah Chen", avatar: "/abstract-geometric-shapes.png", status: "online" },
      { id: "contact-4", name: "David Park", avatar: "/abstract-geometric-dk.png", status: "offline" },
      currentUser,
    ],
    admins: ["contact-1"],
    unreadCount: 12,
    lastMessage: {
      content: "Sarah: The campaign is ready to launch",
      timestamp: "3 days ago",
      sender: "contact-1",
      status: "delivered",
    },
    isPinned: false,
    createdAt: "2023-02-20",
  },
]

const mockStatusUpdates: StatusUpdate[] = [
  {
    id: "status-1",
    user: mockContacts[0],
    content: {
      type: "text",
      data: "Working on a new project!",
    },
    timestamp: new Date(Date.now() - 3600000 * 2), // 2 hours ago
    seenBy: ["current-user"],
    expiresAt: new Date(Date.now() + 3600000 * 22), // Expires in 22 hours
  },
  {
    id: "status-2",
    user: mockContacts[1],
    content: {
      type: "image",
      data: "/app-interface-concept.png",
      caption: "New design concept",
    },
    timestamp: new Date(Date.now() - 3600000 * 5), // 5 hours ago
    seenBy: [],
    expiresAt: new Date(Date.now() + 3600000 * 19), // Expires in 19 hours
  },
  {
    id: "status-3",
    user: currentUser,
    content: {
      type: "text",
      data: "Just finished a great meeting!",
    },
    timestamp: new Date(Date.now() - 3600000 * 1), // 1 hour ago
    seenBy: [(mockContacts[0] ? mockContacts[0].id : undefined), (mockContacts[2] ? mockContacts[2].id : undefined)],
    expiresAt: new Date(Date.now() + 3600000 * 23), // Expires in 23 hours
  },
]

const mockBroadcastLists: BroadcastList[] = [
  {
    id: "broadcast-1",
    name: "Team Announcements",
    recipients: [mockContacts[0], mockContacts[1], mockContacts[2]],
    lastMessage: {
      content: "Meeting rescheduled to 3pm",
      timestamp: "Yesterday",
      status: "delivered",
    },
  },
  {
    id: "broadcast-2",
    name: "Project Updates",
    recipients: [mockContacts[0], mockContacts[3]],
    lastMessage: {
      content: "New milestone achieved!",
      timestamp: "Last week",
      status: "read",
    },
  },
]

const mockMessageTemplates: MessageTemplate[] = [
  {
    id: "template-1",
    name: "Meeting Request",
    content: "Hi, are you available for a meeting on [DATE] at [TIME]?",
    category: "Business",
  },
  {
    id: "template-2",
    name: "Thank You",
    content: "Thank you for your help with the project. I really appreciate it!",
    category: "Personal",
  },
  {
    id: "template-3",
    name: "Project Update",
    content: "Just wanted to let you know that the project is [STATUS]. Let me know if you have any questions.",
    category: "Business",
  },
]

// Mock messages for a conversation
const getMockMessages = (conversationId: string): Message[] => {
  const baseMessages: Message[] = [
    {
      id: "msg-1",
      content: "Hi there! How's the project coming along?",
      timestamp: new Date(Date.now() - 3600000 * 24), // 1 day ago
      sender: {
        id: conversationId,
        name: [...mockContacts, ...mockGroups].find((c) => c.id === conversationId)?.name || "Unknown",
        avatar: [...mockContacts, ...mockGroups].find((c) => c.id === conversationId)?.avatar,
      },
      status: "read",
      isEncrypted: true,
    },
    {
      id: "msg-2",
      content: "It's going well! I've completed the initial designs.",
      timestamp: new Date(Date.now() - 3600000 * 23), // 23 hours ago
      sender: {
        id: "current-user",
        name: "You",
      },
      status: "read",
      isEncrypted: true,
    },
    {
      id: "msg-3",
      content: "That's great! Can you share them with me?",
      timestamp: new Date(Date.now() - 3600000 * 22), // 22 hours ago
      sender: {
        id: conversationId,
        name: [...mockContacts, ...mockGroups].find((c) => c.id === conversationId)?.name || "Unknown",
        avatar: [...mockContacts, ...mockGroups].find((c) => c.id === conversationId)?.avatar,
      },
      status: "read",
      isEncrypted: true,
    },
    {
      id: "msg-4",
      content: "Sure, here they are!",
      timestamp: new Date(Date.now() - 3600000 * 21), // 21 hours ago
      sender: {
        id: "current-user",
        name: "You",
      },
      status: "read",
      attachments: [
        {
          id: "att-1",
          type: "image",
          url: "/app-interface-concept.png",
          name: "design-mockup.png",
          thumbnail: "/app-interface-concept.png",
        },
      ],
      isEncrypted: true,
    },
    {
      id: "msg-5",
      content: "These look amazing! I especially like the color scheme.",
      timestamp: new Date(Date.now() - 3600000 * 2), // 2 hours ago
      sender: {
        id: conversationId,
        name: [...mockContacts, ...mockGroups].find((c) => c.id === conversationId)?.name || "Unknown",
        avatar: [...mockContacts, ...mockGroups].find((c) => c.id === conversationId)?.avatar,
      },
      status: "read",
      isEncrypted: true,
    },
    {
      id: "msg-6",
      content: "Thanks! I spent a lot of time on that. Do you have any suggestions for improvements?",
      timestamp: new Date(Date.now() - 3600000 * 1), // 1 hour ago
      sender: {
        id: "current-user",
        name: "You",
      },
      status: "delivered",
      isEncrypted: true,
    },
    {
      id: "msg-7",
      content: "I think they're pretty solid as is. Let's discuss in our meeting tomorrow.",
      timestamp: new Date(Date.now() - 60000 * 30), // 30 minutes ago
      sender: {
        id: conversationId,
        name: [...mockContacts, ...mockGroups].find((c) => c.id === conversationId)?.name || "Unknown",
        avatar: [...mockContacts, ...mockGroups].find((c) => c.id === conversationId)?.avatar,
      },
      status: "read",
      isEncrypted: true,
    },
  ]

  // Add more messages for groups
  const isGroup = mockGroups.some((g) => g.id === conversationId)
  if (isGroup) {
    const group = mockGroups.find((g) => g.id === conversationId)
    const participants = group?.participants || []

    // Add messages from different participants
    participants.forEach((participant, index) => {
      if (participant.id !== "current-user") {
        baseMessages.push({
          id: `msg-group-${index}`,
          content: `I agree with the plan. Let's move forward with it.`,
          timestamp: new Date(Date.now() - 60000 * (15 + index * 5)), // Recent messages
          sender: {
            id: participant.id,
            name: participant.name,
            avatar: participant.avatar,
          },
          status: "read",
          isEncrypted: true,
        })
      }
    })

    // Add a message with mentions
    baseMessages.push({
      id: "msg-mention",
      content: `@${(participants[0] ? participants[0].name : undefined)} and @${(participants[1] ? participants[1].name : undefined)} please review the latest changes.`,
      timestamp: new Date(Date.now() - 60000 * 10), // 10 minutes ago
      sender: {
        id: "current-user",
        name: "You",
      },
      status: "delivered",
      mentions: [(participants[0] ? participants[0].id : undefined), (participants[1] ? participants[1].id : undefined)],
      isEncrypted: true,
    })

    // Add a reply message
    baseMessages.push({
      id: "msg-reply",
      content: "I'll take a look at it today.",
      timestamp: new Date(Date.now() - 60000 * 5), // 5 minutes ago
      sender: {
        id: (participants[0] ? participants[0].id : undefined),
        name: (participants[0] ? participants[0].name : undefined),
        avatar: (participants[0] ? participants[0].avatar : undefined),
      },
      status: "read",
      replyTo: {
        id: "msg-mention",
        content: `@${(participants[0] ? participants[0].name : undefined)} and @${(participants[1] ? participants[1].name : undefined)} please review the latest changes.`,
        sender: "You",
      },
      isEncrypted: true,
    })
  }

  // Add a voice message
  baseMessages.push({
    id: "msg-voice",
    content: "",
    timestamp: new Date(Date.now() - 60000 * 2), // 2 minutes ago
    sender: {
      id: conversationId,
      name: [...mockContacts, ...mockGroups].find((c) => c.id === conversationId)?.name || "Unknown",
      avatar: [...mockContacts, ...mockGroups].find((c) => c.id === conversationId)?.avatar,
    },
    status: "read",
    attachments: [
      {
        id: "voice-1",
        type: "voice",
        url: "#",
        name: "Voice Message",
        duration: 12, // 12 seconds
      },
    ],
    isEncrypted: true,
  })

  return baseMessages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
}

// Main component
export function WhatsAppCommunication() {
  // State
  const [activeTab, setActiveTab] = useState<"chats" | "status" | "calls">("chats")
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [messageInput, setMessageInput] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMessages, setIsLoadingMessages] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [conversations, setConversations] = useState<Conversation[]>([...mockContacts, ...mockGroups])
  const [searchQuery, setSearchQuery] = useState("")
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false)
  const [isAttachmentMenuOpen, setIsAttachmentMenuOpen] = useState(false)
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false)
  const [isCallDialogOpen, setIsCallDialogOpen] = useState(false)
  const [callType, setCallType] = useState<"audio" | "video" | null>(null)
  const [isScreenShareDialogOpen, setIsScreenShareDialogOpen] = useState(false)
  const [isStatusUpdateDialogOpen, setIsStatusUpdateDialogOpen] = useState(false)
  const [isBroadcastDialogOpen, setIsBroadcastDialogOpen] = useState(false)
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false)
  const [isGroupDialogOpen, setIsGroupDialogOpen] = useState(false)
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false)
  const [isReplyingTo, setIsReplyingTo] = useState<Message | null>(null)
  const [statusUpdates, setStatusUpdates] = useState<StatusUpdate[]>(mockStatusUpdates)
  const [broadcastLists, setBroadcastLists] = useState<BroadcastList[]>(mockBroadcastLists)
  const [messageTemplates, setMessageTemplates] = useState<MessageTemplate[]>(mockMessageTemplates)
  const [isRecordingVoice, setIsRecordingVoice] = useState(false)
  const [recordingDuration, setRecordingDuration] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showArchivedChats, setShowArchivedChats] = useState(false)
  const [mentionQuery, setMentionQuery] = useState<string | null>(null)
  const [mentionPosition, setMentionPosition] = useState<{ start: number; end: number } | null>(null)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const emojiPickerRef = useRef<HTMLDivElement>(null)
  const attachmentMenuRef = useRef<HTMLDivElement>(null)
  const messageInputRef = useRef<HTMLInputElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  // Handle clicks outside emoji picker and attachment menu
  useOnClickOutside(emojiPickerRef, () => setIsEmojiPickerOpen(false))
  useOnClickOutside(attachmentMenuRef, () => setIsAttachmentMenuOpen(false))
  useOnClickOutside(menuRef, () => setIsMenuOpen(false))

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Simulate online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  // Load messages when conversation is selected
  useEffect(() => {
    if (selectedConversation) {
      setIsLoadingMessages(true)

      // Simulate API call delay
      const timer = setTimeout(() => {
        setMessages(getMockMessages(selectedConversation.id))
        setIsLoadingMessages(false)

        // Mark messages as read
        setConversations((prev) =>
          prev.map((conv) => (conv.id === selectedConversation.id ? { ...conv, unreadCount: 0 } : conv)),
        )
      }, 800)

      return () => clearTimeout(timer)
    }
  }, [selectedConversation])

  // Scroll to bottom of messages
  useEffect(() => {
    if (!isLoadingMessages) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isLoadingMessages])

  // Handle voice recording timer
  useEffect(() => {
    let interval: number | null = null

    if (isRecordingVoice) {
      interval = setInterval(() => {
        setRecordingDuration((prev) => prev + 1)
      }, 1000)
    } else {
      setRecordingDuration(0)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRecordingVoice])

  // Filter conversations based on search query and archived status
  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch =
      conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage?.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesArchived = showArchivedChats ? conv.isArchived : !conv.isArchived
    return matchesSearch && matchesArchived
  })

  // Handle sending a message
  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedConversation) return

    // Create new message
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      content: messageInput,
      timestamp: new Date(),
      sender: {
        id: "current-user",
        name: "You",
      },
      status: "sending",
      isEncrypted: true,
      replyTo: isReplyingTo
        ? {
            id: isReplyingTo.id,
            content: isReplyingTo.content,
            sender: isReplyingTo.sender.name,
          }
        : undefined,
      mentions: mentionQuery ? extractMentions(messageInput) : undefined,
    }

    // Add message to state
    setMessages((prev) => [...prev, newMessage])
    setMessageInput("")
    setIsReplyingTo(null)
    setMentionQuery(null)
    setMentionPosition(null)

    // Simulate message sending process
    setTimeout(() => {
      setMessages((prev) => prev.map((msg) => (msg.id === newMessage.id ? { ...msg, status: "sent" } : msg)))

      setTimeout(() => {
        setMessages((prev) => prev.map((msg) => (msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg)))

        // Update last message in conversations
        setConversations((prev) =>
          prev.map((conv) =>
            conv.id === selectedConversation.id
              ? {
                  ...conv,
                  lastMessage: {
                    content: messageInput,
                    timestamp: "Just now",
                    sender: "current-user",
                    status: "delivered",
                  },
                }
              : conv,
          ),
        )

        // Simulate read receipt after some time
        setTimeout(() => {
          setMessages((prev) => prev.map((msg) => (msg.id === newMessage.id ? { ...msg, status: "read" } : msg)))

          // Update status in conversations
          setConversations((prev) =>
            prev.map((conv) =>
              conv.id === selectedConversation.id && conv.lastMessage
                ? {
                    ...conv,
                    lastMessage: {
                      ...conv.lastMessage,
                      status: "read",
                    },
                  }
                : conv,
            ),
          )
        }, 3000)
      }, 1000)
    }, 500)
  }

  // Extract mentions from message
  const extractMentions = (message: string): string[] => {
    const mentions: string[] = []
    const mentionRegex = /@(\w+)/g
    let match

    while ((match = mentionRegex.exec(message)) !== null) {
      const mentionName = match[1]
      const group = selectedConversation && "participants" in selectedConversation ? selectedConversation : null

      if (group) {
        const participant = group.participants.find((p) => p.name.toLowerCase().includes(mentionName.toLowerCase()))
        if (participant) {
          mentions.push(participant.id)
        }
      }
    }

    return mentions
  }

  // Handle emoji selection
  const handleEmojiSelect = (emoji: string) => {
    setMessageInput((prev) => prev + emoji)
    setIsEmojiPickerOpen(false)
  }

  // Handle message input change with mention detection
  const handleMessageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setMessageInput(value)

    // Check for mention
    const lastAtSymbolIndex = value.lastIndexOf("@")
    if (lastAtSymbolIndex !== -1 && (lastAtSymbolIndex === 0 || value[lastAtSymbolIndex - 1] === " ")) {
      const mentionText = value.slice(lastAtSymbolIndex + 1)
      if (mentionText.length > 0 && !mentionText.includes(" ")) {
        setMentionQuery(mentionText)
        setMentionPosition({ start: lastAtSymbolIndex, end: value.length })
      } else {
        setMentionQuery(null)
        setMentionPosition(null)
      }
    } else {
      setMentionQuery(null)
      setMentionPosition(null)
    }
  }

  // Handle mention selection
  const handleMentionSelect = (participant: User) => {
    if (mentionPosition) {
      const beforeMention = messageInput.slice(0, mentionPosition.start)
      const afterMention = messageInput.slice(mentionPosition.end)
      setMessageInput(`${beforeMention}@${participant.name} ${afterMention}`)
      setMentionQuery(null)
      setMentionPosition(null)
      messageInputRef.current?.focus()
    }
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

  // Format voice message duration
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Get message status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sending":
        return <Clock className="h-3 w-3 text-muted-foreground" />
      case "sent":
        return <Check className="h-3 w-3 text-muted-foreground" />
      case "delivered":
        return <CheckCheck className="h-3 w-3 text-muted-foreground" />
      case "read":
        return <CheckCheck className="h-3 w-3 text-blue-500" />
      default:
        return null
    }
  }

  // Handle initiating a call
  const handleInitiateCall = (type: "audio" | "video") => {
    setCallType(type)
    setIsCallDialogOpen(true)
  }

  // Handle screen sharing
  const handleScreenShare = () => {
    setIsScreenShareDialogOpen(true)
  }

  // Handle voice recording
  const handleVoiceRecording = () => {
    if (isRecordingVoice) {
      // Simulate sending voice message
      if (selectedConversation && recordingDuration > 0) {
        const newMessage: Message = {
          id: `msg-${Date.now()}`,
          content: "",
          timestamp: new Date(),
          sender: {
            id: "current-user",
            name: "You",
          },
          status: "sending",
          isEncrypted: true,
          attachments: [
            {
              id: `voice-${Date.now()}`,
              type: "voice",
              url: "#",
              name: "Voice Message",
              duration: recordingDuration,
            },
          ],
        }

        setMessages((prev) => [...prev, newMessage])

        // Simulate message sending process
        setTimeout(() => {
          setMessages((prev) => prev.map((msg) => (msg.id === newMessage.id ? { ...msg, status: "sent" } : msg)))

          setTimeout(() => {
            setMessages((prev) => prev.map((msg) => (msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg)))

            // Update last message in conversations
            setConversations((prev) =>
              prev.map((conv) =>
                conv.id === selectedConversation.id
                  ? {
                      ...conv,
                      lastMessage: {
                        content: "Voice message",
                        timestamp: "Just now",
                        sender: "current-user",
                        status: "delivered",
                      },
                    }
                  : conv,
              ),
            )
          }, 1000)
        }, 500)
      }
    }
    setIsRecordingVoice(!isRecordingVoice)
  }

  // Handle creating a status update
  const handleCreateStatus = (type: "text" | "image" | "video", data: string, caption?: string) => {
    const newStatus: StatusUpdate = {
      id: `status-${Date.now()}`,
      user: currentUser,
      content: {
        type,
        data,
        caption,
      },
      timestamp: new Date(),
      seenBy: [],
      expiresAt: new Date(Date.now() + 3600000 * 24), // Expires in 24 hours
    }

    setStatusUpdates((prev) => [newStatus, ...prev])
    setIsStatusUpdateDialogOpen(false)
  }

  // Handle creating a broadcast list
  const handleCreateBroadcast = (name: string, recipients: User[]) => {
    const newBroadcast: BroadcastList = {
      id: `broadcast-${Date.now()}`,
      name,
      recipients,
    }

    setBroadcastLists((prev) => [...prev, newBroadcast])
    setIsBroadcastDialogOpen(false)
  }

  // Handle creating a message template
  const handleCreateTemplate = (name: string, content: string, category?: string) => {
    const newTemplate: MessageTemplate = {
      id: `template-${Date.now()}`,
      name,
      content,
      category,
    }

    setMessageTemplates((prev) => [...prev, newTemplate])
    setIsTemplateDialogOpen(false)
  }

  // Handle using a message template
  const handleUseTemplate = (template: MessageTemplate) => {
    setMessageInput(template.content)
    messageInputRef.current?.focus()
  }

  // Handle archiving a conversation
  const handleArchiveConversation = (conversation: Conversation) => {
    setConversations((prev) =>
      prev.map((conv) => (conv.id === conversation.id ? { ...conv, isArchived: !conv.isArchived } : conv)),
    )
  }

  // Handle pinning a conversation
  const handlePinConversation = (conversation: Conversation) => {
    setConversations((prev) =>
      prev.map((conv) => (conv.id === conversation.id ? { ...conv, isPinned: !conv.isPinned } : conv)),
    )
  }

  // Handle deleting a conversation
  const handleDeleteConversation = (conversation: Conversation) => {
    setConversations((prev) => prev.filter((conv) => conv.id !== conversation.id))
    if (selectedConversation?.id === conversation.id) {
      setSelectedConversation(null)
    }
  }

  // Handle replying to a message
  const handleReplyToMessage = (message: Message) => {
    setIsReplyingTo(message)
    messageInputRef.current?.focus()
  }

  // Handle canceling a reply
  const handleCancelReply = () => {
    setIsReplyingTo(null)
  }

  // Handle starring a message
  const handleStarMessage = (messageId: string) => {
    setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, isStarred: !msg.isStarred } : msg)))
  }

  // Render conversation list
  const renderConversationList = () => (
    <div className="flex flex-col h-full bg-background border-r">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-primary/5">
        <div className="flex items-center">
          <Avatar className="h-10 w-10">
            <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt="Your profile" />
            <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h1 className="ml-3 font-semibold">WhatsApp</h1>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => setIsStatusUpdateDialogOpen(true)}
          >
            <Camera className="h-5 w-5" />
            <span className="sr-only">Create status</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menu</span>
          </Button>

          {isMenuOpen && (
            <div ref={menuRef} className="absolute top-16 right-4 w-56 bg-background rounded-md shadow-lg border z-50">
              <div className="py-1">
                <button type="button"
                  className="flex items-center w-full px-4 py-2 text-sm hover:bg-muted"
                  onClick={() => setIsContactDialogOpen(true)}
                >
                  <UserPlus className="h-4 w-4 mr-3" />
                  New contact
                </button>
                <button type="button"
                  className="flex items-center w-full px-4 py-2 text-sm hover:bg-muted"
                  onClick={() => setIsGroupDialogOpen(true)}
                >
                  <Users className="h-4 w-4 mr-3" />
                  New group
                </button>
                <button type="button"
                  className="flex items-center w-full px-4 py-2 text-sm hover:bg-muted"
                  onClick={() => setIsBroadcastDialogOpen(true)}
                >
                  <Megaphone className="h-4 w-4 mr-3" />
                  New broadcast
                </button>
                <button type="button"
                  className="flex items-center w-full px-4 py-2 text-sm hover:bg-muted"
                  onClick={() => setIsTemplateDialogOpen(true)}
                >
                  <FileText className="h-4 w-4 mr-3" />
                  Message templates
                </button>
                <button type="button"
                  className="flex items-center w-full px-4 py-2 text-sm hover:bg-muted"
                  onClick={() => setShowArchivedChats(!showArchivedChats)}
                >
                  <Archive className="h-4 w-4 mr-3" />
                  {showArchivedChats ? "Hide archived" : "Archived"}
                </button>
                <button type="button"
                  className="flex items-center w-full px-4 py-2 text-sm hover:bg-muted"
                  onClick={() => {
                    /* Settings dialog */
                  }}
                >
                  <Settings className="h-4 w-4 mr-3" />
                  Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <Tabs
          defaultValue="chats"
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "chats" | "status" | "calls")}
        >
          <TabsList className="w-full grid grid-cols-3 h-10">
            <TabsTrigger value="chats" className="text-sm">
              Chats
            </TabsTrigger>
            <TabsTrigger value="status" className="text-sm">
              Status
            </TabsTrigger>
            <TabsTrigger value="calls" className="text-sm">
              Calls
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Search */}
      <div className="p-2 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search or start new chat"
            className="pl-9 bg-muted"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Offline indicator */}
      {!isOnline && (
        <div className="flex items-center gap-2 p-2 bg-yellow-50 text-yellow-800 border-b">
          <WifiOff className="h-4 w-4" />
          <span className="text-sm">You're offline. Messages will be sent when you're back online.</span>
        </div>
      )}

      {/* Content based on active tab */}
      <TabsContent value="chats" className="flex-1 p-0 m-0">
        {isLoading ? (
          <div className="p-2 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-2">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-40" />
                </div>
                <Skeleton className="h-3 w-8" />
              </div>
            ))}
          </div>
        ) : (
          <ScrollArea className="h-full">
            {showArchivedChats && (
              <div className="p-2 bg-muted/30">
                <h3 className="text-sm font-medium text-muted-foreground px-2 py-1">Archived</h3>
              </div>
            )}
            <div className="p-2 space-y-1">
              {filteredConversations.length > 0 ? (
                filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={cn(
                      "flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-muted transition-colors",
                      selectedConversation?.id === conversation.id ? "bg-muted" : "",
                    )}
                    onClick={() => setSelectedConversation(conversation)}
                  >
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
                        <AvatarFallback>{conversation.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      {"status" in conversation && conversation.status === "online" && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                      )}
                      {"status" in conversation && conversation.status === "typing" && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background animate-pulse"></span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium truncate">{conversation.name}</p>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {conversation.lastMessage?.timestamp}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage?.content}</p>
                        <div className="flex items-center">
                          {conversation.isPinned && <Star className="h-3 w-3 text-muted-foreground mr-1" />}
                          {conversation.unreadCount > 0 && (
                            <span className="h-5 min-w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                              {conversation.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                  <p>No chats found</p>
                  <p className="text-sm">Try a different search term</p>
                </div>
              )}
            </div>
          </ScrollArea>
        )}
      </TabsContent>

      <TabsContent value="status" className="flex-1 p-0 m-0">
        <ScrollArea className="h-full">
          <div className="p-4">
            <div className="flex items-center mb-4">
              <div className="relative mr-3">
                <Avatar className="h-12 w-12 border-2 border-primary">
                  <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} />
                  <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="absolute bottom-0 right-0 bg-primary text-white rounded-full h-6 w-6 flex items-center justify-center border-2 border-background">
                  <Plus className="h-4 w-4" />
                </div>
              </div>
              <div>
                <p className="font-medium">My Status</p>
                <p className="text-xs text-muted-foreground">Tap to add status update</p>
              </div>
            </div>

            <h3 className="text-sm font-medium text-muted-foreground mb-2">Recent updates</h3>

            {statusUpdates
              .filter((s) => s.user.id !== currentUser.id)
              .map((status) => (
                <div key={status.id} className="flex items-center py-2">
                  <Avatar className="h-12 w-12 mr-3 border-2 border-primary">
                    <AvatarImage src={status.user.avatar || "/placeholder.svg"} alt={status.user.name} />
                    <AvatarFallback>{status.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{status.user.name}</p>
                    <p className="text-xs text-muted-foreground">{formatTimestamp(status.timestamp)}</p>
                  </div>
                </div>
              ))}
          </div>
        </ScrollArea>
      </TabsContent>

      <TabsContent value="calls" className="flex-1 p-0 m-0">
        <ScrollArea className="h-full">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium">Recent</h3>
              <Button variant="ghost" size="sm">
                <Phone className="h-4 w-4 mr-2" />
                New call
              </Button>
            </div>

            <div className="space-y-2">
              {[...mockContacts].slice(0, 3).map((contact) => (
                <div key={contact.id} className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                      <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Phone className="h-3 w-3 mr-1" />
                        <span>
                          {Math.random() > 0.5 ? "Incoming" : "Outgoing"}, {Math.floor(Math.random() * 10) + 1} minutes
                          ago
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                      <Phone className="h-4 w-4 text-primary" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                      <Video className="h-4 w-4 text-primary" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </TabsContent>

      {/* Floating action button */}
      {activeTab === "chats" && (
        <Button
          className="absolute bottom-4 right-4 h-14 w-14 rounded-full shadow-lg"
          onClick={() => setIsContactDialogOpen(true)}
        >
          <MessageSquare className="h-6 w-6" />
          <span className="sr-only">New chat</span>
        </Button>
      )}
    </div>
  )

  // Render chat interface
  const renderChatInterface = () => {
    if (!selectedConversation) {
      return (
        <div className="flex flex-col items-center justify-center h-full bg-muted/30 text-center p-6">
          <div className="mb-4">
            <MessageSquare className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-xl font-bold mb-2">WhatsApp Web</h2>
            <p className="text-muted-foreground">Send and receive messages without keeping your phone online.</p>
            <p className="text-muted-foreground">
              Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
            </p>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-center">
              <Lock className="h-4 w-4 text-muted-foreground mr-2" />
              <p className="text-sm text-muted-foreground">End-to-end encrypted</p>
            </div>
          </div>
        </div>
      )
    }

    const isGroup = "participants" in selectedConversation

    return (
      <div className="flex flex-col h-full">
        {/* Chat header */}
        <div className="flex items-center justify-between p-3 bg-primary/5 border-b">
          <div className="flex items-center">
            {!isDesktop && (
              <Button variant="ghost" size="icon" className="mr-1" onClick={() => setSelectedConversation(null)}>
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </Button>
            )}
            <Avatar className="h-10 w-10" onClick={() => setIsInfoDialogOpen(true)}>
              <AvatarImage src={selectedConversation.avatar || "/placeholder.svg"} alt={selectedConversation.name} />
              <AvatarFallback>{selectedConversation.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="ml-3 cursor-pointer" onClick={() => setIsInfoDialogOpen(true)}>
              <h2 className="font-semibold">{selectedConversation.name}</h2>
              <p className="text-xs text-muted-foreground">
                {"status" in selectedConversation && selectedConversation.status === "online"
                  ? "Online"
                  : "status" in selectedConversation && selectedConversation.status === "typing"
                    ? "Typing..."
                    : isGroup
                      ? `${(selectedConversation as Group).participants.length} participants`
                      : "lastSeen" in selectedConversation && selectedConversation.lastSeen
                        ? `Last seen ${selectedConversation.lastSeen}`
                        : "Offline"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={() => handleInitiateCall("audio")}
                  >
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
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={() => handleInitiateCall("video")}
                  >
                    <Video className="h-5 w-5" />
                    <span className="sr-only">Video call</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Video call</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <MoreVertical className="h-5 w-5" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsInfoDialogOpen(true)}>
                  <Info className="h-4 w-4 mr-2" />
                  Contact info
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleScreenShare()}>
                  <Monitor className="h-4 w-4 mr-2" />
                  Share screen
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell className="h-4 w-4 mr-2" />
                  Mute notifications
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleArchiveConversation(selectedConversation)}>
                  <Archive className="h-4 w-4 mr-2" />
                  {selectedConversation.isArchived ? "Unarchive chat" : "Archive chat"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handlePinConversation(selectedConversation)}>
                  {selectedConversation.isPinned ? (
                    <>
                      <StarOff className="h-4 w-4 mr-2" />
                      Unpin chat
                    </>
                  ) : (
                    <>
                      <Star className="h-4 w-4 mr-2" />
                      Pin chat
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => handleDeleteConversation(selectedConversation)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete chat
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-muted/20">
          {/* Encryption notice */}
          <div className="flex justify-center mb-4">
            <div className="bg-primary/5 rounded-lg px-3 py-1 text-xs text-center flex items-center">
              <Lock className="h-3 w-3 mr-1 text-green-600" />
              <span>Messages are end-to-end encrypted. No one outside this chat can read them.</span>
            </div>
          </div>

          {isLoadingMessages ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
                  <div className={`max-w-[70%] ${i % 2 === 0 ? "bg-background" : "bg-primary/10"} rounded-lg p-3`}>
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-3 w-48" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn("flex", message.sender.id === "current-user" ? "justify-end" : "justify-start")}
                >
                  <div className="max-w-[70%] group">
                    {isGroup && message.sender.id !== "current-user" && (
                      <p className="text-xs font-medium ml-2 mb-1 text-primary">{message.sender.name}</p>
                    )}
                    <div
                      className={cn(
                        "rounded-lg p-3 relative",
                        message.sender.id === "current-user"
                          ? "bg-primary/10 text-primary-foreground"
                          : "bg-background",
                      )}
                    >
                      {/* Reply indicator */}
                      {message.replyTo && (
                        <div className="bg-muted/50 p-2 rounded mb-2 border-l-2 border-primary">
                          <p className="text-xs font-medium text-primary">{message.replyTo.sender}</p>
                          <p className="text-xs truncate">{message.replyTo.content}</p>
                        </div>
                      )}

                      {/* Message content */}
                      <p className="text-sm whitespace-pre-wrap">
                        {message.mentions && isGroup
                          ? message.content.split(" ").map((word, i) => {
                              if (word.startsWith("@")) {
                                const mentionName = word.substring(1)
                                const group = selectedConversation as Group
                                const participant = group.participants.find((p) => p.name.includes(mentionName))

                                return participant ? (
                                  <span key={i} className="text-primary font-medium">
                                    {word}{" "}
                                  </span>
                                ) : (
                                  word + " "
                                )
                              }
                              return word + " "
                            })
                          : message.content}
                      </p>

                      {/* Attachments */}
                      {message.attachments && message.attachments.length > 0 && (
                        <div className="mt-2 space-y-2">
                          {message.attachments.map((attachment) => (
                            <div key={attachment.id}>
                              {attachment.type === "image" ? (
                                <div className="rounded-md overflow-hidden">
                                  <img
                                    src={attachment.url || "/placeholder.svg"}
                                    alt={attachment.name}
                                    className="max-w-full h-auto"
                                  />
                                </div>
                              ) : attachment.type === "voice" ? (
                                <div className="flex items-center gap-2 p-2 rounded-md bg-background/50">
                                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                    <Play className="h-4 w-4" />
                                  </Button>
                                  <div className="flex-1">
                                    <div className="h-1 bg-muted-foreground/30 rounded-full">
                                      <div className="h-1 w-0 bg-primary rounded-full"></div>
                                    </div>
                                  </div>
                                  <span className="text-xs text-muted-foreground">
                                    {formatDuration(attachment.duration || 0)}
                                  </span>
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
                                    <Download className="h-4 w-4 mr-1" />
                                    Download
                                  </Button>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2 p-2 rounded-md bg-background/50">
                                  <File className="h-8 w-8 text-blue-500" />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">{attachment.name}</p>
                                  </div>
                                  <Button variant="ghost" size="sm">
                                    <Download className="h-4 w-4 mr-1" />
                                    Download
                                  </Button>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Message actions on hover */}
                      <div className="absolute right-0 top-0 -mt-2 -mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 rounded-full bg-background shadow-sm"
                            >
                              <ChevronDown className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem onClick={() => handleReplyToMessage(message)}>
                              <Reply className="h-4 w-4 mr-2" />
                              Reply
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStarMessage(message.id)}>
                              {message.isStarred ? (
                                <>
                                  <StarOff className="h-4 w-4 mr-2" />
                                  Unstar
                                </>
                              ) : (
                                <>
                                  <Star className="h-4 w-4 mr-2" />
                                  Star
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Forward className="h-4 w-4 mr-2" />
                              Forward
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="h-4 w-4 mr-2" />
                              Copy
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="flex items-center justify-end mt-1 text-xs text-muted-foreground">
                      <span>{formatTimestamp(message.timestamp)}</span>
                      {message.sender.id === "current-user" && (
                        <span className="ml-1">{getStatusIcon(message.status)}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Reply indicator */}
        {isReplyingTo && (
          <div className="p-2 bg-background border-t flex items-center justify-between">
            <div className="flex-1 border-l-2 border-primary pl-2">
              <p className="text-xs font-medium text-primary">{isReplyingTo.sender.name}</p>
              <p className="text-xs truncate">{isReplyingTo.content}</p>
            </div>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleCancelReply}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Message input */}
        <div className="p-3 bg-background border-t">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
                >
                  <Smile className="h-5 w-5" />
                  <span className="sr-only">Add emoji</span>
                </Button>
                {isEmojiPickerOpen && (
                  <div ref={emojiPickerRef} className="absolute bottom-full mb-2 left-0 z-10">
                    <div className="bg-background border rounded-lg shadow-lg p-2 w-64">
                      <div className="grid grid-cols-8 gap-1">
                        {[
                          "😊",
                          "😂",
                          "❤️",
                          "👍",
                          "🙏",
                          "🔥",
                          "🎉",
                          "😍",
                          "🥰",
                          "😘",
                          "😎",
                          "🤔",
                          "😢",
                          "😭",
                          "😡",
                          "👋",
                          "🤝",
                          "👏",
                          "🙌",
                          "🤦",
                          "🤷",
                          "💪",
                          "👀",
                          "💯",
                          "✅",
                          "⭐",
                          "🌟",
                          "💫",
                          "🌈",
                          "🍕",
                          "🍔",
                          "🍟",
                          "🍩",
                          "🍦",
                          "🍷",
                          "🍺",
                          "🎂",
                          "🎁",
                        ].map((emoji, index) => (
                          <button type="button"
                            key={index}
                            className="h-8 w-8 flex items-center justify-center rounded hover:bg-muted cursor-pointer text-lg"
                            onClick={() => handleEmojiSelect(emoji)}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={() => setIsAttachmentMenuOpen(!isAttachmentMenuOpen)}
                >
                  <Paperclip className="h-5 w-5" />
                  <span className="sr-only">Attach file</span>
                </Button>
                {isAttachmentMenuOpen && (
                  <div ref={attachmentMenuRef} className="absolute bottom-full mb-2 left-0 z-10">
                    <div className="bg-background border rounded-lg shadow-lg p-2">
                      <div className="grid grid-cols-3 gap-2">
                        <Button variant="ghost" className="flex flex-col h-auto py-2 px-3 items-center">
                          <ImageIcon className="h-6 w-6 mb-1 text-blue-500" />
                          <span className="text-xs">Photos</span>
                        </Button>
                        <Button variant="ghost" className="flex flex-col h-auto py-2 px-3 items-center">
                          <File className="h-6 w-6 mb-1 text-green-500" />
                          <span className="text-xs">Document</span>
                        </Button>
                        <Button variant="ghost" className="flex flex-col h-auto py-2 px-3 items-center">
                          <Camera className="h-6 w-6 mb-1 text-red-500" />
                          <span className="text-xs">Camera</span>
                        </Button>
                        <Button variant="ghost" className="flex flex-col h-auto py-2 px-3 items-center">
                          <Music className="h-6 w-6 mb-1 text-purple-500" />
                          <span className="text-xs">Audio</span>
                        </Button>
                        <Button variant="ghost" className="flex flex-col h-auto py-2 px-3 items-center">
                          <UserCircle className="h-6 w-6 mb-1 text-yellow-500" />
                          <span className="text-xs">Contact</span>
                        </Button>
                        <Button variant="ghost" className="flex flex-col h-auto py-2 px-3 items-center">
                          <MapPin className="h-6 w-6 mb-1 text-teal-500" />
                          <span className="text-xs">Location</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Template button */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <FileText className="h-5 w-5" />
                    <span className="sr-only">Templates</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="start">
                  <div className="space-y-2">
                    <h3 className="font-medium">Message Templates</h3>
                    <div className="max-h-60 overflow-y-auto space-y-2">
                      {messageTemplates.map((template) => (
                        <div
                          key={template.id}
                          className="p-2 border rounded-md hover:bg-muted cursor-pointer"
                          onClick={() => handleUseTemplate(template)}
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium">{template.name}</h4>
                            {template.category && (
                              <Badge variant="outline" className="text-xs">
                                {template.category}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground truncate mt-1">{template.content}</p>
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => setIsTemplateDialogOpen(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create Template
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <div className="relative flex-1">
              <Input
                ref={messageInputRef}
                placeholder="Type a message"
                value={messageInput}
                onChange={handleMessageInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
                className="rounded-full"
                disabled={isRecordingVoice}
              />

              {/* Mention suggestions */}
              {mentionQuery && isGroup && (
                <div className="absolute bottom-full mb-2 left-0 w-64 bg-background border rounded-md shadow-md z-10">
                  <div className="p-2">
                    <p className="text-xs text-muted-foreground mb-2">Mention someone</p>
                    <div className="max-h-40 overflow-y-auto">
                      {(selectedConversation as Group).participants
                        .filter(
                          (p) => p.id !== "current-user" && p.name.toLowerCase().includes(mentionQuery.toLowerCase()),
                        )
                        .map((participant) => (
                          <div
                            key={participant.id}
                            className="flex items-center gap-2 p-2 hover:bg-muted rounded-md cursor-pointer"
                            onClick={() => handleMentionSelect(participant)}
                          >
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                              <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{participant.name}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {messageInput.trim() ? (
              <Button variant="ghost" size="icon" className="rounded-full" onClick={handleSendMessage}>
                <Send className="h-5 w-5" />
                <span className="sr-only">Send message</span>
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className={cn("rounded-full", isRecordingVoice && "bg-red-100 text-red-500 animate-pulse")}
                onClick={handleVoiceRecording}
              >
                <Mic className="h-5 w-5" />
                <span className="sr-only">{isRecordingVoice ? "Stop recording" : "Record voice message"}</span>
              </Button>
            )}
          </div>

          {/* Voice recording indicator */}
          {isRecordingVoice && (
            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 h-1 bg-muted-foreground/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500 animate-pulse"
                  style={{ width: `${Math.min(100, recordingDuration * 3)}%` }}
                ></div>
              </div>
              <span className="text-xs text-muted-foreground">{formatDuration(recordingDuration)}</span>
              <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={() => setIsRecordingVoice(false)}>
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Render call dialog
  const renderCallDialog = () => (
    <Dialog open={isCallDialogOpen} onOpenChange={setIsCallDialogOpen}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        <div className="relative h-[400px] bg-gradient-to-br from-primary/20 to-primary/5 flex flex-col items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 rounded-full bg-black/20 text-white hover:bg-black/30"
            onClick={() => setIsCallDialogOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>

          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage
              src={selectedConversation?.avatar || "/placeholder.svg"}
              alt={selectedConversation?.name || "Contact"}
            />
            <AvatarFallback>{selectedConversation?.name.substring(0, 2) || "CN"}</AvatarFallback>
          </Avatar>

          <h2 className="text-xl font-bold mb-2">{selectedConversation?.name || "Contact"}</h2>
          <p className="text-muted-foreground mb-8">{callType === "audio" ? "Audio calling..." : "Video calling..."}</p>

          <div className="flex gap-4">
            <Button
              variant="destructive"
              size="icon"
              className="h-12 w-12 rounded-full"
              onClick={() => setIsCallDialogOpen(false)}
            >
              <Phone className="h-5 w-5 rotate-135" />
              <span className="sr-only">End call</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )

  // Render screen share dialog
  const renderScreenShareDialog = () => (
    <Dialog open={isScreenShareDialogOpen} onOpenChange={setIsScreenShareDialogOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share your screen</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 my-4">
          <div className="border rounded-md p-3 cursor-pointer hover:bg-muted">
            <div className="aspect-video bg-muted rounded-md mb-2 flex items-center justify-center">
              <Monitor className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium">Entire Screen</p>
          </div>
          <div className="border rounded-md p-3 cursor-pointer hover:bg-muted">
            <div className="aspect-video bg-muted rounded-md mb-2 flex items-center justify-center">
              <Layout className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium">Application Window</p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsScreenShareDialogOpen(false)}>
            Cancel
          </Button>
          <Button>Share</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  // Render info dialog
  const renderInfoDialog = () => {
    const isGroup = selectedConversation && "participants" in selectedConversation

    return (
      <Dialog open={isInfoDialogOpen} onOpenChange={setIsInfoDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{isGroup ? "Group Info" : "Contact Info"}</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col items-center py-4">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage
                src={selectedConversation?.avatar || "/placeholder.svg"}
                alt={selectedConversation?.name || "Contact"}
              />
              <AvatarFallback>{selectedConversation?.name.substring(0, 2) || "CN"}</AvatarFallback>
            </Avatar>

            <h2 className="text-xl font-bold">{selectedConversation?.name}</h2>
            {!isGroup && "status" in selectedConversation && (
              <p className="text-muted-foreground">
                {selectedConversation.status === "online"
                  ? "Online"
                  : selectedConversation.status === "typing"
                    ? "Typing..."
                    : selectedConversation.lastSeen
                      ? `Last seen ${selectedConversation.lastSeen}`
                      : "Offline"}
              </p>
            )}
          </div>

          {!isGroup && "about" in selectedConversation && selectedConversation.about && (
            <div className="border-t pt-4">
              <h3 className="font-medium mb-1">About</h3>
              <p className="text-sm text-muted-foreground">{selectedConversation.about}</p>
            </div>
          )}

          {isGroup && (
            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Description</h3>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {(selectedConversation as Group).description || "No description"}
              </p>

              <h3 className="font-medium mb-2">Participants ({(selectedConversation as Group).participants.length})</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {(selectedConversation as Group).participants.map((participant) => (
                  <div key={participant.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                        <AvatarFallback>{participant.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">
                          {participant.id === "current-user" ? "You" : participant.name}
                        </p>
                        {(selectedConversation as Group).admins.includes(participant.id) && (
                          <Badge variant="outline" className="text-xs">
                            Admin
                          </Badge>
                        )}
                      </div>
                    </div>
                    {(selectedConversation as Group).admins.includes("current-user") &&
                      participant.id !== "current-user" && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Message {participant.name}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              {(selectedConversation as Group).admins.includes(participant.id) ? (
                                <>
                                  <UserMinus className="h-4 w-4 mr-2" />
                                  Remove as admin
                                </>
                              ) : (
                                <>
                                  <UserPlus className="h-4 w-4 mr-2" />
                                  Make admin
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <UserX className="h-4 w-4 mr-2" />
                              Remove from group
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="border-t pt-4 mt-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <span>Mute notifications</span>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-muted-foreground" />
                <span>Starred messages</span>
              </div>
              <Button variant="ghost" size="sm">
                View
              </Button>
            </div>
          </div>

          <div className="border-t pt-4 mt-4">
            <Button variant="destructive" className="w-full">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete chat
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  // Render status update dialog
  const renderStatusUpdateDialog = () => (
    <Dialog open={isStatusUpdateDialogOpen} onOpenChange={setIsStatusUpdateDialogOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Status Update</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="text">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="text">Text</TabsTrigger>
            <TabsTrigger value="image">Image</TabsTrigger>
            <TabsTrigger value="video">Video</TabsTrigger>
          </TabsList>

          <TabsContent value="text" className="mt-4">
            <div className="space-y-4">
              <Textarea placeholder="What's on your mind?" className="min-h-[100px]" />
              <Button onClick={() => handleCreateStatus("text", "Just updated my status!")}>Post Status</Button>
            </div>
          </TabsContent>

          <TabsContent value="image" className="mt-4">
            <div className="space-y-4">
              <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Drag and drop an image or click to browse</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Choose Image
                </Button>
              </div>
              <Textarea placeholder="Add a caption (optional)" className="min-h-[60px]" />
              <Button
                onClick={() => handleCreateStatus("image", "/app-interface-concept.png", "Check out this design!")}
              >
                Post Status
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="video" className="mt-4">
            <div className="space-y-4">
              <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                <Film className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Drag and drop a video or click to browse</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Choose Video
                </Button>
              </div>
              <Textarea placeholder="Add a caption (optional)" className="min-h-[60px]" />
              <Button onClick={() => handleCreateStatus("video", "#", "My latest project update")}>Post Status</Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )

  // Render broadcast dialog
  const renderBroadcastDialog = () => (
    <Dialog open={isBroadcastDialogOpen} onOpenChange={setIsBroadcastDialogOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Broadcast List</DialogTitle>
          <DialogDescription>
            Send messages to multiple contacts at once. Recipients will receive messages individually.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="broadcast-name">Broadcast List Name</Label>
            <Input id="broadcast-name" placeholder="e.g., Team Updates" />
          </div>

          <div className="space-y-2">
            <Label>Select Recipients</Label>
            <div className="border rounded-md p-2">
              <div className="flex flex-wrap gap-2 mb-2">
                {mockContacts.slice(0, 2).map((contact) => (
                  <Badge key={contact.id} variant="secondary" className="flex items-center gap-1">
                    {contact.name}
                    <Button variant="ghost" size="icon" className="h-4 w-4 p-0 hover:bg-transparent">
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              <Input placeholder="Search contacts" className="mt-2" />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsBroadcastDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => handleCreateBroadcast("Team Updates", mockContacts.slice(0, 3))}>
            Create Broadcast List
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  // Render contact dialog
  const renderContactDialog = () => (
    <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Contact</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="contact-name">Name</Label>
            <Input id="contact-name" placeholder="Enter contact name" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-phone">Phone Number</Label>
            <Input id="contact-phone" placeholder="+1 (555) 000-0000" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-email">Email (Optional)</Label>
            <Input id="contact-email" placeholder="email@example.com" />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsContactDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              // Add contact logic
              setIsContactDialogOpen(false)
            }}
          >
            Save Contact
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  // Render group dialog
  const renderGroupDialog = () => (
    <Dialog open={isGroupDialogOpen} onOpenChange={setIsGroupDialogOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Group</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="group-name">Group Name</Label>
            <Input id="group-name" placeholder="Enter group name" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="group-description">Description (Optional)</Label>
            <Textarea id="group-description" placeholder="What's this group about?" className="resize-none" />
          </div>

          <div className="space-y-2">
            <Label>Select Participants</Label>
            <div className="border rounded-md p-2">
              <div className="flex flex-wrap gap-2 mb-2">
                {mockContacts.slice(0, 3).map((contact) => (
                  <Badge key={contact.id} variant="secondary" className="flex items-center gap-1">
                    {contact.name}
                    <Button variant="ghost" size="icon" className="h-4 w-4 p-0 hover:bg-transparent">
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              <Input placeholder="Search contacts" className="mt-2" />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsGroupDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              // Create group logic
              setIsGroupDialogOpen(false)
            }}
          >
            Create Group
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  // Render template dialog
  const renderTemplateDialog = () => (
    <Dialog open={isTemplateDialogOpen} onOpenChange={setIsTemplateDialogOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Message Templates</DialogTitle>
          <DialogDescription>Create and manage templates for frequently used messages.</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="view">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="view">View Templates</TabsTrigger>
            <TabsTrigger value="create">Create Template</TabsTrigger>
          </TabsList>

          <TabsContent value="view" className="mt-4">
            <div className="space-y-4">
              <Input placeholder="Search templates" />

              <div className="max-h-60 overflow-y-auto space-y-2">
                {messageTemplates.map((template) => (
                  <div key={template.id} className="border rounded-md p-3">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium">{template.name}</h4>
                      {template.category && <Badge variant="outline">{template.category}</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{template.content}</p>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleUseTemplate(template)}>
                        Use
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="create" className="mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="template-name">Template Name</Label>
                <Input id="template-name" placeholder="e.g., Meeting Request" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="template-category">Category (Optional)</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="greetings">Greetings</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="template-content">Message Content</Label>
                <Textarea
                  id="template-content"
                  placeholder="Type your template message here. Use [PLACEHOLDER] for variable content."
                  className="min-h-[100px]"
                />
                <p className="text-xs text-muted-foreground">
                  Tip: Use placeholders like [NAME], [DATE], [TIME] for customizable parts.
                </p>
              </div>

              <Button
                onClick={() =>
                  handleCreateTemplate(
                    "Meeting Request",
                    "Hi, are you available for a meeting on [DATE] at [TIME]?",
                    "Business",
                  )
                }
              >
                Save Template
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )

  return (
    <ErrorBoundary>
      <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-background">
        {/* Offline indicator for desktop */}
        {!isOnline && isDesktop && (
          <div className="absolute top-4 right-4 z-50 bg-yellow-50 text-yellow-800 px-4 py-2 rounded-md shadow-md flex items-center gap-2">
            <WifiOff className="h-4 w-4" />
            <span>You're offline. Messages will be sent when you're back online.</span>
          </div>
        )}

        {/* Contact list (always visible on desktop, conditionally on mobile) */}
        <div
          className={cn(
            "h-full transition-all duration-300 ease-in-out",
            isDesktop ? "w-80" : "w-full",
            isDesktop || !selectedConversation ? "block" : "hidden",
          )}
        >
          {renderConversationList()}
        </div>

        {/* Chat interface (always visible on desktop, conditionally on mobile) */}
        <div
          className={cn(
            "flex-1 h-full transition-all duration-300 ease-in-out",
            isDesktop || selectedConversation ? "block" : "hidden",
          )}
        >
          {renderChatInterface()}
        </div>

        {/* Dialogs */}
        {renderCallDialog()}
        {renderScreenShareDialog()}
        {renderInfoDialog()}
        {renderStatusUpdateDialog()}
        {renderBroadcastDialog()}
        {renderContactDialog()}
        {renderGroupDialog()}
        {renderTemplateDialog()}
      </div>
    </ErrorBoundary>
  )
}
