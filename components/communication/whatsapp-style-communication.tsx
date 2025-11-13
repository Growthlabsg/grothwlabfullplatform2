"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Camera,
  ChevronRight,
  ImageIcon,
  Mic,
  MoreVertical,
  Phone,
  Plus,
  Search,
  Send,
  Settings,
  Smile,
  Video,
  Check,
  CheckCheck,
  Clock,
  ArrowLeft,
  Paperclip,
  Lock,
  Users,
  MessageSquare,
  FileText,
  File,
  Download,
  Play,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { format, isToday, isYesterday } from "date-fns"
import { type Socket, io } from "socket.io-client"

// Types
interface Contact {
  id: string
  name: string
  avatar?: string
  lastMessage?: string
  time?: string
  unread?: number
  status?: "online" | "offline" | "typing"
  lastSeen?: string
  isMuted?: boolean
  isPinned?: boolean
  isArchived?: boolean
}

interface Message {
  id: string
  senderId: string
  senderName: string
  content: string
  timestamp: Date
  status: "sending" | "sent" | "delivered" | "read"
  attachments?: {
    id: string
    type: "image" | "video" | "audio" | "file"
    url: string
    name: string
    size?: number
  }[]
}

interface CallHistory {
  id: string
  contactId: string
  type: "incoming" | "outgoing" | "missed" | "video"
  timestamp: Date
  duration?: string
}

interface Group {
  id: string
  name: string
  avatar?: string
  participants: string[]
  createdAt: Date
  lastMessage?: string
  time?: string
  unread?: number
}

export function WhatsAppStyleCommunication() {
  const [activeTab, setActiveTab] = useState<"chats" | "status" | "calls">("chats")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [showContactInfo, setShowContactInfo] = useState(false)
  const [messages, setMessages] = useState<Record<string, Message[]>>({})
  const [messageInput, setMessageInput] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [showAttachmentOptions, setShowAttachmentOptions] = useState(false)
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [typingUsers, setTypingUsers] = useState<Record<string, boolean>>({})
  const typingTimeoutRef = useRef<Record<string, number>>({})
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<Message[]>([])
  const [groups, setGroups] = useState<Group[]>([
    {
      id: "group1",
      name: "Family Group",
      avatar: "/abstract-geometric-shapes.png",
      participants: ["1", "2", "3", "current-user"],
      createdAt: new Date(2023, 5, 15),
      lastMessage: "When are we meeting?",
      time: "Yesterday",
      unread: 2,
    },
    {
      id: "group2",
      name: "Work Team",
      avatar: "/abstract-geometric-aw.png",
      participants: ["4", "5", "6", "current-user"],
      createdAt: new Date(2023, 4, 10),
      lastMessage: "Meeting at 3pm",
      time: "10:30 AM",
    },
  ])
  const [showCreateGroup, setShowCreateGroup] = useState(false)
  const [newGroupName, setNewGroupName] = useState("")
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([])
  const [showMediaGallery, setShowMediaGallery] = useState(false)
  const [mediaItems, setMediaItems] = useState<{ id: string; url: string; type: string; date: Date }[]>([])

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messageInputRef = useRef<HTMLInputElement>(null)

  // Mock data
  const contacts: Contact[] = [
    {
      id: "1",
      name: "Martin Randolph",
      avatar: "/abstract-geometric-shapes.png",
      lastMessage: "Yes, 2pm is awesome",
      time: "11/19/19",
      status: "online",
      lastSeen: "Just now",
    },
    {
      id: "2",
      name: "Andrew Parker",
      avatar: "/abstract-geometric-aw.png",
      lastMessage: "What kind of strategy is better?",
      time: "11/16/19",
      status: "offline",
      lastSeen: "Yesterday",
    },
    {
      id: "3",
      name: "Karen Castillo",
      avatar: "/machine-learning-concept.png",
      lastMessage: "0:14",
      time: "11/15/19",
      status: "offline",
      lastSeen: "2 days ago",
    },
    {
      id: "4",
      name: "Maximillian Jacobson",
      avatar: "/abstract-geometric-dk.png",
      lastMessage: "Bro, I have a good idea!",
      time: "10/30/19",
      status: "offline",
      lastSeen: "Last week",
    },
    {
      id: "5",
      name: "Martha Craig",
      avatar: "/abstract-geometric-shapes.png",
      lastMessage: "Photo",
      time: "10/28/19",
      status: "typing",
      lastSeen: "Just now",
      unread: 1,
    },
    {
      id: "6",
      name: "Tabitha Potter",
      avatar: "/abstract-geometric-ll.png",
      lastMessage: "Actually I wanted to check with you about your online business plan on our…",
      time: "8/25/19",
      status: "offline",
      lastSeen: "Last month",
    },
    {
      id: "7",
      name: "Maisy Humphrey",
      avatar: "/abstract-ms-flow.png",
      lastMessage: "Welcome, to make design process faster, look at Pixsellz",
      time: "8/20/19",
      status: "offline",
      lastSeen: "Last month",
    },
    {
      id: "8",
      name: "Kieron Dotson",
      avatar: "/abstract-geometric-aw.png",
      lastMessage: "Ok, have a good trip!",
      time: "7/29/19",
      status: "offline",
      lastSeen: "2 months ago",
    },
  ]

  const callHistory: CallHistory[] = [
    {
      id: "call1",
      contactId: "1",
      type: "outgoing",
      timestamp: new Date(2019, 9, 13), // 10/13/19
      duration: "2:34",
    },
    {
      id: "call2",
      contactId: "3",
      type: "outgoing",
      timestamp: new Date(2019, 9, 11), // 10/11/19
      duration: "1:15",
    },
    {
      id: "call3",
      contactId: "8",
      type: "outgoing",
      timestamp: new Date(2019, 9, 8), // 10/8/19
      duration: "0:45",
    },
    {
      id: "call4",
      contactId: "3",
      type: "missed",
      timestamp: new Date(2019, 8, 30), // 9/30/19
    },
    {
      id: "call5",
      contactId: "4",
      type: "incoming",
      timestamp: new Date(2019, 8, 24), // 9/24/19
      duration: "3:12",
    },
    {
      id: "call6",
      contactId: "8",
      type: "outgoing",
      timestamp: new Date(2019, 8, 16), // 9/16/19
      duration: "1:45",
    },
    {
      id: "call7",
      contactId: "8",
      type: "outgoing",
      timestamp: new Date(2019, 8, 15), // 9/15/19
      duration: "0:32",
    },
    {
      id: "call8",
      contactId: "7",
      type: "incoming",
      timestamp: new Date(2019, 8, 10), // 9/10/19
      duration: "4:20",
    },
  ]

  // Initialize mock messages
  useEffect(() => {
    const mockMessages: Record<string, Message[]> = {
      "5": [
        {
          id: "msg1",
          senderId: "5",
          senderName: "Martha Craig",
          content: "I will write from Japan",
          timestamp: new Date(2023, 6, 26, 17, 47), // July 26, 17:47
          status: "read",
        },
        {
          id: "msg2",
          senderId: "current-user",
          senderName: "You",
          content: "Good bye!",
          timestamp: new Date(2023, 6, 26, 17, 47), // July 26, 17:47
          status: "read",
        },
        {
          id: "msg3",
          senderId: "current-user",
          senderName: "You",
          content: "Good morning!",
          timestamp: new Date(2023, 6, 27, 10, 10), // July 27, 10:10
          status: "read",
        },
        {
          id: "msg4",
          senderId: "5",
          senderName: "Martha Craig",
          content: "Japan looks amazing!",
          timestamp: new Date(2023, 6, 27, 10, 10), // July 27, 10:10
          status: "read",
        },
        {
          id: "msg5",
          senderId: "current-user",
          senderName: "You",
          content: "IMG_0475",
          timestamp: new Date(2023, 6, 27, 10, 15), // July 27, 10:15
          status: "read",
          attachments: [
            {
              id: "att1",
              type: "image",
              url: "/serene-japanese-valley.png",
              name: "IMG_0475.png",
              size: 2.4 * 1024 * 1024, // 2.4 MB
            },
          ],
        },
        {
          id: "msg6",
          senderId: "current-user",
          senderName: "You",
          content: "IMG_0481",
          timestamp: new Date(2023, 6, 27, 10, 15), // July 27, 10:15
          status: "read",
          attachments: [
            {
              id: "att2",
              type: "image",
              url: "/bustling-tokyo-intersection.png",
              name: "IMG_0481.png",
              size: 2.8 * 1024 * 1024, // 2.8 MB
            },
          ],
        },
        {
          id: "msg7",
          senderId: "current-user",
          senderName: "You",
          content: "Do you know what time is it?",
          timestamp: new Date(2023, 6, 27, 11, 40), // July 27, 11:40
          status: "delivered",
        },
        {
          id: "msg8",
          senderId: "5",
          senderName: "Martha Craig",
          content: "It's morning in Tokyo 😎",
          timestamp: new Date(2023, 6, 27, 11, 43), // July 27, 11:43
          status: "read",
        },
        {
          id: "msg9",
          senderId: "current-user",
          senderName: "You",
          content: "What is the most popular meal in Japan?",
          timestamp: new Date(2023, 6, 27, 11, 45), // July 27, 11:45
          status: "delivered",
        },
        {
          id: "msg10",
          senderId: "5",
          senderName: "Martha Craig",
          content: "Do you like it?",
          timestamp: new Date(2023, 6, 27, 11, 45), // July 27, 11:45
          status: "read",
        },
        {
          id: "msg11",
          senderId: "current-user",
          senderName: "You",
          content: "I think top two are:",
          timestamp: new Date(2023, 6, 27, 11, 50), // July 27, 11:50
          status: "delivered",
        },
        {
          id: "msg12",
          senderId: "current-user",
          senderName: "You",
          content: "IMG_0483",
          timestamp: new Date(2023, 6, 27, 11, 51), // July 27, 11:51
          status: "delivered",
          attachments: [
            {
              id: "att3",
              type: "image",
              url: "/assorted-sushi-platter.png",
              name: "IMG_0483.png",
              size: 2.8 * 1024 * 1024, // 2.8 MB
            },
          ],
        },
        {
          id: "msg13",
          senderId: "current-user",
          senderName: "You",
          content: "IMG_0484",
          timestamp: new Date(2023, 6, 27, 11, 51), // July 27, 11:51
          status: "sent",
          attachments: [
            {
              id: "att4",
              type: "image",
              url: "/steaming-ramen-bowl.png",
              name: "IMG_0484.png",
              size: 2.6 * 1024 * 1024, // 2.6 MB
            },
          ],
        },
      ],
    }

    setMessages(mockMessages)
  }, [])

  // Socket connection for real-time messaging
  useEffect(() => {
    // In a real app, this would connect to your actual WebSocket server
    const newSocket = io("https://api.example.com", {
      autoConnect: false,
      transports: ["websocket"],
    })

    newSocket.on("connect", () => {
      console.log("Socket connected")
      setIsConnected(true)
    })

    newSocket.on("disconnect", () => {
      console.log("Socket disconnected")
      setIsConnected(false)
    })

    newSocket.on("message", (message: Message) => {
      setMessages((prev) => ({
        ...prev,
        [message.senderId]: [...(prev[message.senderId] || []), message],
      }))
    })

    newSocket.on("typing", ({ userId, isTyping }: { userId: string; isTyping: boolean }) => {
      setTypingUsers((prev) => ({
        ...prev,
        [userId]: isTyping,
      }))

      // Clear typing indicator after 3 seconds
      if (isTyping && typingTimeoutRef.current[userId]) {
        clearTimeout(typingTimeoutRef.current[userId])
      }

      if (isTyping) {
        typingTimeoutRef.current[userId] = setTimeout(() => {
          setTypingUsers((prev) => ({
            ...prev,
            [userId]: false,
          }))
        }, 3000)
      }
    })

    newSocket.connect()
    setSocket(newSocket)

    return () => {
      Object.values(typingTimeoutRef.current).forEach(clearTimeout)
      newSocket.disconnect()
    }
  }, [])

  // Scroll to bottom when messages change
  useEffect(() => {
    if (selectedChat) {
      scrollToBottom()
    }
  }, [selectedChat, messages])

  // Handle recording timer
  useEffect(() => {
    let interval: number | null = null

    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    } else {
      setRecordingTime(0)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRecording])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedChat) return

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: "current-user",
      senderName: "You",
      content: messageInput,
      timestamp: new Date(),
      status: "sending",
    }

    setMessages((prev) => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), newMessage],
    }))

    setMessageInput("")

    // Simulate message status updates
    setTimeout(() => {
      setMessages((prev) => ({
        ...prev,
        [selectedChat]: (prev[selectedChat] ? prev[selectedChat].map : undefined)((msg) => (msg.id === newMessage.id ? { ...msg, status: "sent" } : msg)),
      }))

      setTimeout(() => {
        setMessages((prev) => ({
          ...prev,
          [selectedChat]: (prev[selectedChat] ? prev[selectedChat].map : undefined)((msg) =>
            msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg,
          ),
        }))

        // 50% chance of being read immediately
        if (Math.random() < 0.5) {
          setTimeout(() => {
            setMessages((prev) => ({
              ...prev,
              [selectedChat]: (prev[selectedChat] ? prev[selectedChat].map : undefined)((msg) =>
                msg.id === newMessage.id ? { ...msg, status: "read" } : msg,
              ),
            }))
          }, 2000)
        }
      }, 1000)
    }, 500)
  }

  const handleStartRecording = () => {
    setIsRecording(true)
  }

  const handleStopRecording = () => {
    if (recordingTime > 0 && selectedChat) {
      // Create a voice message
      const newMessage: Message = {
        id: `msg-${Date.now()}`,
        senderId: "current-user",
        senderName: "You",
        content: `Voice message (${formatRecordingTime(recordingTime)})`,
        timestamp: new Date(),
        status: "sending",
        attachments: [
          {
            id: `voice-${Date.now()}`,
            type: "audio",
            url: "#",
            name: `Voice message (${formatRecordingTime(recordingTime)})`,
          },
        ],
      }

      setMessages((prev) => ({
        ...prev,
        [selectedChat]: [...(prev[selectedChat] || []), newMessage],
      }))

      // Simulate message status updates
      setTimeout(() => {
        setMessages((prev) => ({
          ...prev,
          [selectedChat]: (prev[selectedChat] ? prev[selectedChat].map : undefined)((msg) =>
            msg.id === newMessage.id ? { ...msg, status: "sent" } : msg,
          ),
        }))

        setTimeout(() => {
          setMessages((prev) => ({
            ...prev,
            [selectedChat]: (prev[selectedChat] ? prev[selectedChat].map : undefined)((msg) =>
              msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg,
            ),
          }))
        }, 1000)
      }, 500)
    }

    setIsRecording(false)
  }

  const formatRecordingTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const formatMessageTime = (date: Date) => {
    if (isToday(date)) {
      return format(date, "HH:mm")
    } else if (isYesterday(date)) {
      return "Yesterday"
    } else {
      return format(date, "MMM d")
    }
  }

  const formatCallDate = (date: Date) => {
    return format(date, "M/d/yy")
  }

  const getMessageStatusIcon = (status: string) => {
    switch (status) {
      case "sending":
        return <Clock className="h-3 w-3 text-gray-400" />
      case "sent":
        return <Check className="h-3 w-3 text-gray-400" />
      case "delivered":
        return <CheckCheck className="h-3 w-3 text-gray-400" />
      case "read":
        return <CheckCheck className="h-3 w-3 text-blue-500" />
      default:
        return null
    }
  }

  const getCallIcon = (type: string) => {
    switch (type) {
      case "incoming":
        return <Phone className="h-4 w-4 text-green-500 rotate-90" />
      case "outgoing":
        return <Phone className="h-4 w-4 text-green-500 -rotate-90" />
      case "missed":
        return <Phone className="h-4 w-4 text-red-500 rotate-90" />
      case "video":
        return <Video className="h-4 w-4 text-blue-500" />
      default:
        return <Phone className="h-4 w-4" />
    }
  }

  const getContactById = (id: string) => {
    return contacts.find((contact) => contact.id === id)
  }

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (contact.lastMessage && contact.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesSearch
  })

  const filteredCalls = callHistory.filter((call) => {
    const contact = getContactById(call.contactId)
    return contact && contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  })

  const selectedContact = selectedChat ? getContactById(selectedChat) : null
  const chatMessages = selectedChat ? messages[selectedChat] || [] : []

  const searchMessages = useCallback(
    (query: string) => {
      if (!query.trim()) {
        setSearchResults([])
        return
      }

      const results: Message[] = []
      Object.values(messages).forEach((chatMessages) => {
        chatMessages.forEach((message) => {
          if (message.content.toLowerCase().includes(query.toLowerCase())) {
            results.push(message)
          }
        })
      })

      setSearchResults(results)
    },
    [messages],
  )

  const collectMediaItems = useCallback(() => {
    const items: { id: string; url: string; type: string; date: Date }[] = []

    Object.values(messages).forEach((chatMessages) => {
      chatMessages.forEach((message) => {
        if (message.attachments) {
          message.attachments.forEach((attachment) => {
            if (attachment.type === "image" || attachment.type === "video") {
              items.push({
                id: attachment.id,
                url: attachment.url || "/placeholder.svg",
                type: attachment.type,
                date: message.timestamp,
              })
            }
          })
        }
      })
    })

    // Sort by date, newest first
    items.sort((a, b) => b.date.getTime() - a.date.getTime())

    setMediaItems(items)
  }, [messages])

  return (
    <div className="flex h-full bg-gray-100 dark:bg-gray-900">
      {/* Main container with iPhone-like frame */}
      <div className="w-full max-w-md mx-auto h-[700px] bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col">
        {/* Status bar */}
        <div className="h-6 bg-gray-200 dark:bg-gray-700 flex items-center justify-between px-4 text-xs">
          <span>9:41</span>
          <div className="flex items-center space-x-1">
            <div className="h-2 w-2 rounded-full bg-black dark:bg-white"></div>
            <div className="h-2 w-2 rounded-full bg-black dark:bg-white"></div>
            <div className="h-2 w-2 rounded-full bg-black dark:bg-white"></div>
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Message search dialog */}
          {isSearching && (
            <div className="absolute inset-0 bg-white dark:bg-gray-900 z-10 flex flex-col">
              <div className="flex items-center p-2 border-b border-gray-200 dark:border-gray-700">
                <Button variant="ghost" size="icon" className="h-8 w-8 mr-2" onClick={() => setIsSearching(false)}>
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <Input
                  type="search"
                  placeholder="Search messages"
                  className="flex-1"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    searchMessages(e.target.value)
                  }}
                  autoFocus
                />
              </div>

              <ScrollArea className="flex-1">
                {searchResults.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <Search className="h-12 w-12 mb-2 opacity-50" />
                    <p>No messages found</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {searchResults.map((message) => {
                      const contact = contacts.find((c) => c.id === message.senderId) || {
                        name: message.senderName,
                        avatar: undefined,
                      }

                      return (
                        <div
                          key={message.id}
                          className="p-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                          onClick={() => {
                            setSelectedChat(message.senderId)
                            setIsSearching(false)
                            // Highlight the message somehow
                          }}
                        >
                          <div className="flex items-center mb-1">
                            <Avatar className="h-6 w-6 mr-2">
                              <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                              <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{contact.name}</span>
                            <span className="text-xs text-gray-500 ml-auto">
                              {formatMessageTime(message.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{message.content}</p>
                        </div>
                      )
                    })}
                  </div>
                )}
              </ScrollArea>
            </div>
          )}
          {/* Create group dialog */}
          {showCreateGroup && (
            <div className="absolute inset-0 bg-white dark:bg-gray-900 z-10 flex flex-col">
              <div className="flex items-center p-2 border-b border-gray-200 dark:border-gray-700">
                <Button variant="ghost" size="icon" className="h-8 w-8 mr-2" onClick={() => setShowCreateGroup(false)}>
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <h2 className="text-lg font-medium">New Group</h2>
              </div>

              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <Avatar className="h-16 w-16 mr-4">
                    <AvatarFallback className="bg-green-100 dark:bg-green-800 text-green-600 dark:text-green-200">
                      <Users className="h-8 w-8" />
                    </AvatarFallback>
                  </Avatar>
                  <Input
                    type="text"
                    placeholder="Group name"
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="p-2">
                <h3 className="text-sm font-medium text-gray-500 mb-2 px-2">
                  Participants: {selectedParticipants.length}
                </h3>

                {selectedParticipants.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4 px-2">
                    {selectedParticipants.map((id) => {
                      const contact = contacts.find((c) => c.id === id)
                      if (!contact) return null

                      return (
                        <div
                          key={id}
                          className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full pl-1 pr-2 py-1"
                        >
                          <Avatar className="h-6 w-6 mr-1">
                            <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                            <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{contact.name}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5 ml-1"
                            onClick={() => setSelectedParticipants((prev) => prev.filter((p) => p !== id))}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                )}

                <ScrollArea className="h-[calc(100vh-250px)]">
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {contacts.map((contact) => (
                      <div
                        key={contact.id}
                        className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                        onClick={() => {
                          setSelectedParticipants((prev) =>
                            prev.includes(contact.id) ? prev.filter((id) => id !== contact.id) : [...prev, contact.id],
                          )
                        }}
                      >
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                          <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-medium">{contact.name}</h3>
                          <p className="text-xs text-gray-500">
                            {contact.status === "online" ? "online" : contact.lastSeen}
                          </p>
                        </div>
                        {selectedParticipants.includes(contact.id) && <Check className="h-5 w-5 text-green-500" />}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-700">
                <Button
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                  disabled={!newGroupName.trim() || selectedParticipants.length === 0}
                  onClick={() => {
                    // Create new group
                    const newGroup: Group = {
                      id: `group-${Date.now()}`,
                      name: newGroupName,
                      participants: [...selectedParticipants, "current-user"],
                      createdAt: new Date(),
                    }

                    setGroups((prev) => [...prev, newGroup])
                    setShowCreateGroup(false)
                    setNewGroupName("")
                    setSelectedParticipants([])
                  }}
                >
                  Create Group
                </Button>
              </div>
            </div>
          )}
          {/* Media gallery */}
          {showMediaGallery && (
            <div className="absolute inset-0 bg-white dark:bg-gray-900 z-10 flex flex-col">
              <div className="flex items-center p-2 border-b border-gray-200 dark:border-gray-700">
                <Button variant="ghost" size="icon" className="h-8 w-8 mr-2" onClick={() => setShowMediaGallery(false)}>
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <h2 className="text-lg font-medium">Media Gallery</h2>
              </div>

              <ScrollArea className="flex-1 p-2">
                {mediaItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <ImageIcon className="h-12 w-12 mb-2 opacity-50" />
                    <p>No media found</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-1">
                    {mediaItems.map((item) => (
                      <div
                        key={item.id}
                        className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden"
                      >
                        {item.type === "image" ? (
                          <img
                            src={item.url || "/placeholder.svg"}
                            alt="Media"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="relative w-full h-full">
                            <img
                              src={item.url || "/placeholder.svg"}
                              alt="Video thumbnail"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="h-10 w-10 rounded-full bg-black/50 flex items-center justify-center">
                                <Play className="h-5 w-5 text-white" />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </div>
          )}

          {selectedChat ? (
            /* Chat view */
            <div className="flex-1 flex flex-col">
              {/* Chat header */}
              <div className="flex items-center justify-between p-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 mr-1"
                    onClick={() => {
                      setSelectedChat(null)
                      setShowContactInfo(false)
                    }}
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage
                      src={selectedContact?.avatar || "/placeholder.svg"}
                      alt={selectedContact?.name || ""}
                    />
                    <AvatarFallback>{selectedContact?.name.charAt(0) || "?"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{selectedContact?.name}</p>
                    <p className="text-xs text-gray-500">
                      {selectedContact?.status === "typing"
                        ? "typing..."
                        : selectedContact?.status === "online"
                          ? "online"
                          : selectedContact?.lastSeen}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Video className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Phone className="h-5 w-5" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuItem onClick={() => setShowContactInfo(true)}>Contact info</DropdownMenuItem>
                      <DropdownMenuItem>Select messages</DropdownMenuItem>
                      <DropdownMenuItem>Mute notifications</DropdownMenuItem>
                      <DropdownMenuItem>Clear messages</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-500">Block</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Messages area */}
              {showContactInfo ? (
                /* Contact info view */
                <div className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4">
                  <div className="flex flex-col items-center mb-6">
                    <Avatar className="h-24 w-24 mb-3">
                      <AvatarImage
                        src={selectedContact?.avatar || "/placeholder.svg"}
                        alt={selectedContact?.name || ""}
                      />
                      <AvatarFallback className="text-2xl">{selectedContact?.name.charAt(0) || "?"}</AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-bold">{selectedContact?.name}</h2>
                    <p className="text-sm text-gray-500">{selectedContact?.lastSeen}</p>
                  </div>

                  <Card className="mb-4">
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-medium">Media, Links, and Docs</h3>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden">
                          <img src="/serene-japanese-valley.png" alt="Media" className="w-full h-full object-cover" />
                        </div>
                        <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden">
                          <img
                            src="/bustling-tokyo-intersection.png"
                            alt="Media"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden">
                          <img src="/assorted-sushi-platter.png" alt="Media" className="w-full h-full object-cover" />
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">12 items</p>
                    </div>
                  </Card>

                  <Card className="mb-4">
                    <div className="p-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Mute notifications</h3>
                        <div className="flex items-center">
                          <span className="text-sm text-gray-500 mr-2">No</span>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="mb-4">
                    <div className="p-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Starred Messages</h3>
                        <div className="flex items-center">
                          <span className="text-sm text-gray-500 mr-2">None</span>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="mb-4">
                    <div className="p-4">
                      <h3 className="font-medium mb-2">Encryption</h3>
                      <div className="flex items-start">
                        <Lock className="h-4 w-4 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                        <p className="text-sm text-gray-500">
                          Messages to this chat and calls are secured with end-to-end encryption. Tap to verify.
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              ) : (
                /* Chat messages view */
                <ScrollArea className="flex-1 bg-gray-100 dark:bg-gray-900">
                  <div className="p-3 space-y-2">
                    {/* Encryption notice */}
                    <div className="flex justify-center mb-4">
                      <div className="bg-gray-200 dark:bg-gray-800 rounded-lg px-3 py-1 text-xs text-center flex items-center">
                        <Lock className="h-3 w-3 mr-1 text-gray-500" />
                        <span className="text-gray-500">Messages are end-to-end encrypted</span>
                      </div>
                    </div>

                    {/* Date separator */}
                    <div className="flex justify-center mb-4">
                      <div className="bg-gray-200 dark:bg-gray-800 rounded-lg px-3 py-1 text-xs text-center">
                        <span className="text-gray-500">Fri, Jul 26</span>
                      </div>
                    </div>

                    {/* Messages */}
                    {chatMessages.map((message) => (
                      <div
                        key={message.id}
                        className={cn("flex", message.senderId === "current-user" ? "justify-end" : "justify-start")}
                      >
                        <div
                          className={cn(
                            "max-w-[75%] rounded-lg p-2",
                            message.senderId === "current-user"
                              ? "bg-[#dcf8c6] dark:bg-green-800"
                              : "bg-white dark:bg-gray-800",
                          )}
                        >
                          {message.content}

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
                                      <div className="flex justify-between items-center text-xs text-gray-500 mt-1">
                                        <span>{attachment.name}</span>
                                        {attachment.size && (
                                          <span>{(attachment.size / (1024 * 1024)).toFixed(1)} MB</span>
                                        )}
                                      </div>
                                    </div>
                                  ) : attachment.type === "audio" ? (
                                    <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-md p-2">
                                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                        <Play className="h-4 w-4" />
                                      </Button>
                                      <div className="flex-1 mx-2">
                                        <div className="h-1 bg-gray-300 dark:bg-gray-600 rounded-full">
                                          <div className="h-1 w-0 bg-green-500 rounded-full"></div>
                                        </div>
                                      </div>
                                      <span className="text-xs text-gray-500">0:00</span>
                                    </div>
                                  ) : (
                                    <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-md p-2">
                                      <File className="h-8 w-8 text-blue-500 mr-2" />
                                      <div className="flex-1">
                                        <p className="text-sm font-medium">{attachment.name}</p>
                                        {attachment.size && (
                                          <p className="text-xs text-gray-500">
                                            {(attachment.size / (1024 * 1024)).toFixed(1)} MB
                                          </p>
                                        )}
                                      </div>
                                      <Button variant="ghost" size="sm">
                                        <Download className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Message timestamp and status */}
                          <div className="flex justify-end items-center mt-1 space-x-1">
                            <span className="text-[10px] text-gray-500">{formatMessageTime(message.timestamp)}</span>
                            {message.senderId === "current-user" && <span>{getMessageStatusIcon(message.status)}</span>}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              )}

              {/* Message input */}
              {!showContactInfo && (
                <div className="p-2 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    <div className="flex space-x-1 mr-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-full"
                        onClick={() => setShowAttachmentOptions(!showAttachmentOptions)}
                      >
                        <Paperclip className="h-5 w-5 text-gray-500" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
                        <Camera className="h-5 w-5 text-gray-500" />
                      </Button>
                    </div>

                    <div className="relative flex-1">
                      <Input
                        ref={messageInputRef}
                        type="text"
                        placeholder="Type a message"
                        className="rounded-full bg-white dark:bg-gray-700 pl-4 pr-10 py-2 h-10"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            handleSendMessage()
                          }
                        }}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full"
                      >
                        <Smile className="h-5 w-5 text-gray-500" />
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-full ml-2 bg-green-500 hover:bg-green-600 text-white"
                      onClick={messageInput ? handleSendMessage : undefined}
                      onMouseDown={!messageInput ? handleStartRecording : undefined}
                      onMouseUp={!messageInput ? handleStopRecording : undefined}
                      onTouchStart={!messageInput ? handleStartRecording : undefined}
                      onTouchEnd={!messageInput ? handleStopRecording : undefined}
                    >
                      {messageInput ? <Send className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                    </Button>
                  </div>

                  {/* Recording indicator */}
                  {isRecording && (
                    <div className="mt-2 flex items-center justify-between bg-red-100 dark:bg-red-900/30 rounded-full px-4 py-1">
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse mr-2"></div>
                        <span className="text-sm text-red-500">Recording {formatRecordingTime(recordingTime)}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 text-red-500 hover:bg-red-200 dark:hover:bg-red-900/50 p-0 px-2"
                        onClick={() => setIsRecording(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}

                  {/* Attachment options */}
                  {showAttachmentOptions && (
                    <div className="mt-2 grid grid-cols-4 gap-2 p-2 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
                      <Button variant="ghost" className="flex flex-col h-auto py-2 px-1 items-center">
                        <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-1">
                          <FileText className="h-5 w-5 text-purple-500" />
                        </div>
                        <span className="text-xs">Document</span>
                      </Button>
                      <Button variant="ghost" className="flex flex-col h-auto py-2 px-1 items-center">
                        <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-1">
                          <Camera className="h-5 w-5 text-red-500" />
                        </div>
                        <span className="text-xs">Camera</span>
                      </Button>
                      <Button variant="ghost" className="flex flex-col h-auto py-2 px-1 items-center">
                        <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-1">
                          <ImageIcon className="h-5 w-5 text-blue-500" />
                        </div>
                        <span className="text-xs">Gallery</span>
                      </Button>
                      <Button variant="ghost" className="flex flex-col h-auto py-2 px-1 items-center">
                        <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-1">
                          <Mic className="h-5 w-5 text-amber-500" />
                        </div>
                        <span className="text-xs">Audio</span>
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* Main list view */
            <div className="flex-1 flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-2 bg-[#075E54] dark:bg-green-800 text-white">
                <div className="flex-1">
                  <h1 className="text-xl font-bold">WhatsApp</h1>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white"
                    onClick={() => {
                      setIsSearching(true)
                      setSearchQuery("")
                      setSearchResults([])
                    }}
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-white">
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setShowCreateGroup(true)}>New group</DropdownMenuItem>
                      <DropdownMenuItem>New broadcast</DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          collectMediaItems()
                          setShowMediaGallery(true)
                        }}
                      >
                        Media gallery
                      </DropdownMenuItem>
                      <DropdownMenuItem>Starred messages</DropdownMenuItem>
                      <DropdownMenuItem>Settings</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Tabs */}
              <Tabs defaultValue="chats" value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
                <div className="bg-[#075E54] dark:bg-green-800 text-white">
                  <TabsList className="w-full grid grid-cols-3 bg-transparent h-12">
                    <TabsTrigger
                      value="chats"
                      className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-white text-white"
                    >
                      CHATS
                    </TabsTrigger>
                    <TabsTrigger
                      value="status"
                      className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-white text-white"
                    >
                      STATUS
                    </TabsTrigger>
                    <TabsTrigger
                      value="calls"
                      className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-white text-white"
                    >
                      CALLS
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="chats" className="flex-1 m-0 p-0">
                  <div className="p-2 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center">
                      <Button variant="ghost" className="text-sm text-gray-500 font-normal">
                        Broadcast Lists
                      </Button>
                      <Button variant="ghost" className="text-sm text-gray-500 font-normal">
                        New Group
                      </Button>
                    </div>
                  </div>

                  <ScrollArea className="flex-1">
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                      {/* Groups */}
                      {groups.map((group) => (
                        <div
                          key={group.id}
                          className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                          onClick={() => setSelectedChat(group.id)}
                        >
                          <Avatar className="h-12 w-12 mr-3">
                            <AvatarImage src={group.avatar || "/placeholder.svg"} alt={group.name} />
                            <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline">
                              <h3 className="font-medium truncate">{group.name}</h3>
                              <span className="text-xs text-gray-500">{group.time}</span>
                            </div>
                            <p
                              className={cn(
                                "text-sm truncate",
                                group.unread ? "text-black dark:text-white font-medium" : "text-gray-500",
                              )}
                            >
                              {group.lastMessage}
                            </p>
                          </div>
                          {group.unread && group.unread > 0 && (
                            <Badge className="ml-2 bg-green-500 hover:bg-green-600">{group.unread}</Badge>
                          )}
                        </div>
                      ))}

                      {/* Contacts */}
                      {filteredContacts.map((contact) => (
                        <div
                          key={contact.id}
                          className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                          onClick={() => setSelectedChat(contact.id)}
                        >
                          <Avatar className="h-12 w-12 mr-3">
                            <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                            <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline">
                              <h3 className="font-medium truncate">{contact.name}</h3>
                              <span className="text-xs text-gray-500">{contact.time}</span>
                            </div>
                            <p
                              className={cn(
                                "text-sm truncate",
                                contact.unread ? "text-black dark:text-white font-medium" : "text-gray-500",
                              )}
                            >
                              {contact.status === "typing" ? (
                                <span className="text-green-500">typing...</span>
                              ) : (
                                contact.lastMessage
                              )}
                            </p>
                          </div>
                          {contact.unread && contact.unread > 0 && (
                            <Badge className="ml-2 bg-green-500 hover:bg-green-600">{contact.unread}</Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="status" className="flex-1 m-0 p-0">
                  <ScrollArea className="h-full">
                    <div className="p-4">
                      <div className="flex items-center mb-4">
                        <div className="relative mr-3">
                          <Avatar className="h-14 w-14 border-2 border-gray-200 dark:border-gray-700">
                            <AvatarImage src="/abstract-geometric-shapes.png" alt="Your status" />
                            <AvatarFallback>YS</AvatarFallback>
                          </Avatar>
                          <div className="absolute bottom-0 right-0 h-6 w-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800">
                            <Plus className="h-4 w-4 text-white" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium">My Status</h3>
                          <p className="text-xs text-gray-500">Tap to add status update</p>
                        </div>
                      </div>

                      <h4 className="text-sm font-medium text-gray-500 mb-2">Recent updates</h4>

                      <div className="space-y-3">
                        {contacts.slice(0, 3).map((contact) => (
                          <div key={contact.id} className="flex items-center">
                            <Avatar className="h-12 w-12 mr-3 ring-2 ring-green-500">
                              <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                              <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">{contact.name}</h3>
                              <p className="text-xs text-gray-500">Today, 10:30 AM</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="calls" className="flex-1 m-0 p-0">
                  <div className="p-2 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        <Button variant="ghost" className="text-sm text-gray-500 font-normal">
                          All
                        </Button>
                        <Button variant="ghost" className="text-sm text-gray-500 font-normal">
                          Missed
                        </Button>
                      </div>
                    </div>
                  </div>

                  <ScrollArea className="flex-1">
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                      {filteredCalls.map((call) => {
                        const contact = getContactById(call.contactId)
                        if (!contact) return null

                        return (
                          <div key={call.id} className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-800">
                            <Avatar className="h-12 w-12 mr-3">
                              <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                              <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-baseline">
                                <h3 className="font-medium truncate">{contact.name}</h3>
                                <span className="text-xs text-gray-500">{formatCallDate(call.timestamp)}</span>
                              </div>
                              <div className="flex items-center text-sm text-gray-500">
                                {getCallIcon(call.type)}
                                <span className="ml-1">{call.type === "missed" ? "Missed" : call.type}</span>
                              </div>
                            </div>
                            <Button variant="ghost" size="icon" className="h-10 w-10 text-green-500">
                              <Phone className="h-5 w-5" />
                            </Button>
                          </div>
                        )
                      })}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>

        {/* Bottom navigation */}
        <div className="h-14 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex items-center justify-around">
          <Button variant="ghost" className="flex flex-col h-full items-center justify-center">
            <MessageSquare className={cn("h-6 w-6", activeTab === "chats" ? "text-green-500" : "text-gray-500")} />
            <span className="text-xs mt-1">Chats</span>
          </Button>
          <Button variant="ghost" className="flex flex-col h-full items-center justify-center">
            <Users className={cn("h-6 w-6", activeTab === "status" ? "text-green-500" : "text-gray-500")} />
            <span className="text-xs mt-1">Status</span>
          </Button>
          <Button variant="ghost" className="flex flex-col h-full items-center justify-center">
            <Phone className={cn("h-6 w-6", activeTab === "calls" ? "text-green-500" : "text-gray-500")} />
            <span className="text-xs mt-1">Calls</span>
          </Button>
          <Button variant="ghost" className="flex flex-col h-full items-center justify-center">
            <Camera className="h-6 w-6 text-gray-500" />
            <span className="text-xs mt-1">Camera</span>
          </Button>
          <Button variant="ghost" className="flex flex-col h-full items-center justify-center">
            <Settings className="h-6 w-6 text-gray-500" />
            <span className="text-xs mt-1">Settings</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
