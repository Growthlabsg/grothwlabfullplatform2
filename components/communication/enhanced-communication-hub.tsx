"use client"

import React, { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  MessageSquare, 
  Search, 
  Phone, 
  Video, 
  Users, 
  Settings, 
  Hash,
  Calendar,
  X,
  Send,
  Smile,
  Paperclip,
  MoreHorizontal,
  Reply,
  Edit,
  Trash2,
  Heart,
  ThumbsUp,
  Laugh,
  Angry,
  Mic,
  MicOff,
  Plus,
  UserPlus,
  MessageCircle,
  PhoneCall,
  VideoIcon,
  Settings as SettingsIcon,
  Bell,
  BellOff,
  Pin,
  Star,
  Clock,
  CheckCircle,
  Shield,
  Circle,
  User,
  Globe,
  Maximize2,
  Minimize2,
  PanelLeft,
  PanelRight,
  GripVertical,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { useCommunication } from "@/contexts/CommunicationContext"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CreateChannelDialog } from "./create-channel-dialog"
import { EmojiPicker } from "./emoji-picker"

interface EnhancedCommunicationHubProps {
  onClose?: () => void
}

export default function EnhancedCommunicationHub({ onClose }: EnhancedCommunicationHubProps) {
  const {
    channels,
    messages,
    users,
    currentChannel,
    setCurrentChannel,
    sendMessage,
    addReaction,
    markAsRead,
    unreadCount,
    isTyping,
    currentUser
  } = useCommunication()

  // State management
  const [activeTab, setActiveTab] = useState<"chats" | "connectivity" | "meetings" | "settings">("chats")
  const [searchQuery, setSearchQuery] = useState("")
  const [messageInput, setMessageInput] = useState("")
  const [showCreateChannel, setShowCreateChannel] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [replyingTo, setReplyingTo] = useState<any>(null)
  const [editingMessage, setEditingMessage] = useState<string | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [isTypingLocal, setIsTypingLocal] = useState(false)
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [messageStatus, setMessageStatus] = useState<{ [key: string]: string }>({})
  const [showReactions, setShowReactions] = useState<string | null>(null)
  const [recordingTime, setRecordingTime] = useState(0)
  const [showFileUpload, setShowFileUpload] = useState(false)
  const [editContent, setEditContent] = useState("")
  const [showScheduleDialog, setShowScheduleDialog] = useState(false)
  const [scheduledTime, setScheduledTime] = useState("")
  const [showTranslation, setShowTranslation] = useState(false)
  const [translatedMessages, setTranslatedMessages] = useState<{ [key: string]: string }>({})
  const [showMessageSearch, setShowMessageSearch] = useState(false)
  const [messageSearchQuery, setMessageSearchQuery] = useState("")
  const [showEncryption, setShowEncryption] = useState(false)
  const [encryptedMessages, setEncryptedMessages] = useState<{ [key: string]: boolean }>({})
  const [showCreateChannelDialog, setShowCreateChannelDialog] = useState(false)
  const [showEmojiPickerDialog, setShowEmojiPickerDialog] = useState(false)
  const [showSettingsDialog, setShowSettingsDialog] = useState(false)
  const [pinnedMessages, setPinnedMessages] = useState<string[]>([])
  const [showPinnedMessages, setShowPinnedMessages] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [sidebarWidth, setSidebarWidth] = useState(320)
  const [isResizing, setIsResizing] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  
  // Infinite scroll states
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [hasMoreMessages, setHasMoreMessages] = useState(true)
  const [hasMoreChannels, setHasMoreChannels] = useState(true)
  const [hasMoreUsers, setHasMoreUsers] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
 
  const messageEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const resizeRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])
 
  // Infinite scroll functions
  const loadMoreMessages = async () => {
    if (isLoadingMore || !hasMoreMessages) return
    
    setIsLoadingMore(true)
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Generate more sample messages
      const newMessages = Array.from({ length: 10 }, (_, i) => ({
        id: `msg-${Date.now()}-${i}`,
        content: `This is a sample message ${messages.length + i + 1} for infinite scroll testing.`,
        sender: {
          id: `user-${i % 3 + 1}`,
          name: `User ${i % 3 + 1}`,
          avatar: "",
          email: `user${i % 3 + 1}@example.com`,
          role: "Member"
        },
        timestamp: new Date(Date.now() - (messages.length + i) * 60000),
        status: "delivered" as const,
        reactions: [],
        replies: []
      }))
      
      // Add messages to context
      if (currentChannel) {
        newMessages.forEach(msg => {
          sendMessage(msg.content, currentChannel.id, msg.sender.id)
        })
      }
      
      // Simulate reaching end after 50 messages
      if (messages.length + newMessages.length >= 50) {
        setHasMoreMessages(false)
      }
    } catch (error) {
      console.error("Error loading more messages:", error)
    } finally {
      setIsLoadingMore(false)
    }
  }
 
  const loadMoreChannels = async () => {
    if (isLoadingMore || !hasMoreChannels) return
    
    setIsLoadingMore(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Generate more sample channels
      const newChannels = Array.from({ length: 5 }, (_, i) => ({
        id: `channel-${Date.now()}-${i}`,
        name: `Channel ${channels.length + i + 1}`,
        type: "public" as const,
        description: `This is channel ${channels.length + i + 1} for infinite scroll testing`,
        avatar: "",
        members: [],
        unreadCount: Math.floor(Math.random() * 5)
      }))
      
      // Add channels to context (simulate adding to context)
      // In a real app, you would add these to the context
      console.log("Loading more channels:", newChannels)
      
      // Simulate reaching end after 20 channels
      if (channels.length + newChannels.length >= 20) {
        setHasMoreChannels(false)
      }
    } catch (error) {
      console.error("Error loading more channels:", error)
    } finally {
      setIsLoadingMore(false)
    }
  }
 
  const loadMoreUsers = async () => {
    if (isLoadingMore || !hasMoreUsers) return
    
    setIsLoadingMore(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 600))
      
      // Generate more sample users
      const newUsers = Array.from({ length: 8 }, (_, i) => ({
        id: `user-${Date.now()}-${i}`,
        name: `User ${users.length + i + 1}`,
        avatar: "",
        email: `user${users.length + i + 1}@example.com`,
        role: ["Founder", "Investor", "Mentor", "Developer", "Designer"][i % 5]
      }))
      
      // Add users to context (this would typically be done through an API)
      // For now, we'll just simulate the loading
      console.log("Loading more users:", newUsers)
      
      // Simulate reaching end after 30 users
      if (users.length + newUsers.length >= 30) {
        setHasMoreUsers(false)
      }
    } catch (error) {
      console.error("Error loading more users:", error)
    } finally {
      setIsLoadingMore(false)
    }
  }
 
  // Infinite scroll handlers
  const handleScroll = (e: React.UIEvent<HTMLDivElement>, type: 'messages' | 'channels' | 'users') => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
    
    // Load more when scrolled to top (for messages) or bottom (for channels/users)
    if (type === 'messages') {
      if (scrollTop === 0 && hasMoreMessages && !isLoadingMore) {
        loadMoreMessages()
      }
    } else {
      if (scrollTop + clientHeight >= scrollHeight - 100 && !isLoadingMore) {
        if (type === 'channels' && hasMoreChannels) {
          loadMoreChannels()
        } else if (type === 'users' && hasMoreUsers) {
          loadMoreUsers()
        }
      }
    }
  }
 
  // Filter channels and users based on search
  const filteredChannels = channels.filter(channel =>
    channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    channel.description?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Handle typing
  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageInput(e.target.value)
    setIsTypingLocal(true)
    
    if (typingTimeout) {
      clearTimeout(typingTimeout)
    }
    
    const timeout = setTimeout(() => {
      setIsTypingLocal(false)
    }, 1000)
    
    setTypingTimeout(timeout as any)
  }

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setSelectedFiles(prev => [...prev, ...files])
  }

  // Handle send message
  const handleSendMessage = () => {
    if (!messageInput.trim() && selectedFiles.length === 0) return

    sendMessage(messageInput)
    setMessageInput("")
    setSelectedFiles([])
    setReplyingTo(null)
    setEditingMessage(null)
    setEditContent("")
  }

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Handle reaction toggle
  const handleReactionToggle = (messageId: string, emoji: string) => {
    if (showReactions === messageId) {
      setShowReactions(null)
    } else {
      addReaction(messageId, emoji)
    }
  }

  // Get message status icon
  const getMessageStatusIcon = (status: string) => {
    switch (status) {
      case 'sending':
        return <Clock className="h-3 w-3 text-gray-400" />
      case 'sent':
        return <CheckCircle className="h-3 w-3 text-gray-400" />
      case 'delivered':
        return <CheckCircle className="h-3 w-3 text-blue-500" />
      case 'read':
        return <CheckCircle className="h-3 w-3 text-green-500" />
      case 'failed':
        return <X className="h-3 w-3 text-red-500" />
      default:
        return null
    }
  }

  // Schedule message
  const handleScheduleMessage = () => {
    if (!messageInput.trim() || !scheduledTime) return
    
    const scheduleDate = new Date(scheduledTime)
    const now = new Date()
    
    if (scheduleDate <= now) {
      alert('Please select a future time')
      return
    }
    
    console.log('Scheduling message:', messageInput, 'for', scheduledTime)
    
    setMessageInput("")
    setScheduledTime("")
    setShowScheduleDialog(false)
  }

  // Translate message
  const handleTranslateMessage = async (messageId: string, content: string) => {
    try {
      const translated = `[Translated] ${content}`
      setTranslatedMessages(prev => ({
        ...prev,
        [messageId]: translated
      }))
    } catch (error) {
      console.error('Translation failed:', error)
    }
  }

  // Encrypt/Decrypt message
  const handleEncryptMessage = (messageId: string) => {
    setEncryptedMessages(prev => ({
      ...prev,
      [messageId]: !prev[messageId]
    }))
  }

  // Search messages
  const searchFilteredMessages = messages.filter(message => 
    message.content.toLowerCase().includes(messageSearchQuery.toLowerCase()) ||
    message.sender.name?.toLowerCase().includes(messageSearchQuery.toLowerCase())
  )

  // Video/Audio call functions
  const handleVideoCall = () => {
    console.log('Starting video call')
  }

  const handleAudioCall = () => {
    console.log('Starting audio call')
  }

  // Handle create channel
  const handleCreateChannel = (channelData: any) => {
    console.log('Creating channel:', channelData)
    // TODO: Implement channel creation
  }

  // Handle emoji selection
  const handleEmojiSelect = (emoji: string) => {
    setMessageInput(prev => prev + emoji)
    setShowEmojiPickerDialog(false)
  }

  // Handle message pinning
  const handlePinMessage = (messageId: string) => {
    setPinnedMessages(prev => 
      prev.includes(messageId) 
        ? prev.filter(id => id !== messageId)
        : [...prev, messageId]
    )
  }

  // Handle message reply
  const handleReply = (message: any) => {
    setReplyingTo(message)
    setMessageInput(`Replying to ${message.sender.name}: `)
  }

  // Handle message edit
  const handleEdit = (messageId: string, content: string) => {
    setEditingMessage(messageId)
    setEditContent(content)
    setMessageInput(content)
  }

  // Handle message delete
  const handleDelete = (messageId: string) => {
    console.log('Deleting message:', messageId)
    // TODO: Implement message deletion
  }

  // Handle fullscreen toggle
  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen)
  }

  // Handle sidebar collapse
  const handleSidebarToggle = () => {
    setIsCollapsed(!isCollapsed)
  }

  // Handle resize start
  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
  }

  // Handle resize during mouse move
  useEffect(() => {
    const handleResize = (e: MouseEvent) => {
      if (!isResizing) return
      
      const newWidth = e.clientX
      if (newWidth >= 200 && newWidth <= 600) {
        setSidebarWidth(newWidth)
      }
    }

    const handleResizeEnd = () => {
      setIsResizing(false)
    }

    if (isResizing) {
      document.addEventListener('mousemove', handleResize)
      document.addEventListener('mouseup', handleResizeEnd)
      document.body.style.cursor = 'col-resize'
      document.body.style.userSelect = 'none'
    } else {
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }

    return () => {
      document.removeEventListener('mousemove', handleResize)
      document.removeEventListener('mouseup', handleResizeEnd)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
  }, [isResizing])

  // Focus input when channel changes
  useEffect(() => {
    inputRef.current?.focus()
  }, [currentChannel])

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }
  }, [])

  // Show notification for unread messages
  useEffect(() => {
    if (unreadCount > 0 && 'Notification' in window && Notification.permission === 'granted') {
      new Notification('New Message', {
        body: `You have ${unreadCount} unread messages`,
        icon: '/favicon.ico'
      })
    }
  }, [unreadCount])

  // Auto-mark messages as read when channel is active
  useEffect(() => {
    if (currentChannel) {
      markAsRead(currentChannel.id)
    }
  }, [currentChannel, markAsRead])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle fullscreen with F11
      if (e.key === 'F11') {
        e.preventDefault()
        handleFullscreenToggle()
      }
      
      // Toggle sidebar with Ctrl/Cmd + B
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault()
        handleSidebarToggle()
      }
      
      // Focus message input with Ctrl/Cmd + K
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Quick reactions
  const quickReactions = [
    { emoji: "❤️", label: "Love" },
    { emoji: "👍", label: "Like" },
    { emoji: "😂", label: "Laugh" },
    { emoji: "😮", label: "Surprised" },
    { emoji: "😢", label: "Sad" },
    { emoji: "😡", label: "Angry" }
  ]

  return (
    <div className={cn(
      "flex flex-col bg-white transition-all duration-300",
      isFullscreen ? "fixed inset-0 z-50" : "h-full w-full"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-[#0F7377] flex items-center justify-center shadow-lg">
            <MessageSquare className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">GrowthLab Chat</h2>
            <p className="text-sm text-gray-500">Connect with your team</p>
          </div>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="bg-red-500 text-white text-xs px-2 py-1 ml-2">
              {unreadCount}
            </Badge>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl"
                  onClick={() => setShowCreateChannelDialog(true)}
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>New Channel</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl"
                  onClick={() => setShowSettingsDialog(true)}
                >
                  <Settings className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Settings</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl"
                  onClick={handleSidebarToggle}
                >
                  {isCollapsed ? <PanelRight className="h-5 w-5" /> : <PanelLeft className="h-5 w-5" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{isCollapsed ? "Show Sidebar" : "Hide Sidebar"}</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl"
                  onClick={handleFullscreenToggle}
                >
                  {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-6 py-4 border-b border-gray-200 bg-white">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-4 py-3 w-full bg-gray-50 border-gray-200 focus:border-[#0F7377] focus:ring-2 focus:ring-[#0F7377]/20 rounded-xl"
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="h-full flex flex-col">
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 bg-white">
          <TabsList className="grid w-full grid-cols-4 bg-gray-100 h-14 rounded-none mx-6 my-2">
            <TabsTrigger 
              value="chats" 
              className="flex items-center justify-center space-x-2 data-[state=active]:bg-[#0F7377] data-[state=active]:text-white rounded-xl border-b-2 data-[state=active]:border-[#0F7377] data-[state=inactive]:border-transparent text-sm font-medium mx-1"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Chats</span>
            </TabsTrigger>
            <TabsTrigger 
              value="connectivity" 
              className="flex items-center justify-center space-x-2 data-[state=active]:bg-[#0F7377] data-[state=active]:text-white rounded-xl border-b-2 data-[state=active]:border-[#0F7377] data-[state=inactive]:border-transparent text-sm font-medium mx-1"
            >
              <Users className="h-4 w-4" />
              <span>Connect</span>
            </TabsTrigger>
            <TabsTrigger 
              value="meetings" 
              className="flex items-center justify-center space-x-2 data-[state=active]:bg-[#0F7377] data-[state=active]:text-white rounded-xl border-b-2 data-[state=active]:border-[#0F7377] data-[state=inactive]:border-transparent text-sm font-medium mx-1"
            >
              <VideoIcon className="h-4 w-4" />
              <span>Meetings</span>
            </TabsTrigger>
            <TabsTrigger 
              value="settings" 
              className="flex items-center justify-center space-x-2 data-[state=active]:bg-[#0F7377] data-[state=active]:text-white rounded-xl border-b-2 data-[state=active]:border-[#0F7377] data-[state=inactive]:border-transparent text-sm font-medium mx-1"
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex min-h-0 relative">
          {/* Mobile Overlay */}
          {!isCollapsed && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
              onClick={handleSidebarToggle}
            />
          )}

          {/* Sidebar */}
          <div 
            ref={sidebarRef}
            className={cn(
              "border-r border-gray-200 bg-white flex-shrink-0 flex flex-col transition-all duration-300 z-50",
              isCollapsed ? "w-0 overflow-hidden" : "",
              "sm:relative fixed sm:top-0 top-0 left-0 sm:h-auto h-full"
            )}
            style={{ 
              width: isCollapsed ? 0 : `${sidebarWidth}px`,
              minWidth: isCollapsed ? 0 : '200px',
              maxWidth: isCollapsed ? 0 : '600px'
            }}
          >
            <TabsContent value="chats" className="h-full m-0 flex flex-col">
              <ScrollArea 
                className="flex-1 h-0"
                onScroll={(e) => handleScroll(e, 'channels')}
              >
                <div className="p-6 space-y-6">
                  {/* Channels */}
                  <div className="mb-8">
                    <h3 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wide">Channels</h3>
                    <div className="space-y-2">
                      {/* Sample channels for testing */}
                      <div
                        className="flex items-start space-x-3 p-4 rounded-xl cursor-pointer hover:bg-gray-50 transition-all duration-200 group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-[#0F7377] text-white flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
                          <Hash className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 mb-1">General</p>
                          <p className="text-xs text-gray-500 leading-relaxed">General discussions for everyone</p>
                        </div>
                      </div>
                      <div
                        className="flex items-start space-x-3 p-4 rounded-xl cursor-pointer hover:bg-gray-50 transition-all duration-200 group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-[#0F7377] text-white flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
                          <Hash className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 mb-1">Mentorship</p>
                          <p className="text-xs text-gray-500 leading-relaxed">Mentorship discussions and opportunities</p>
                        </div>
                      </div>
                      <div
                        className="flex items-start space-x-3 p-4 rounded-xl cursor-pointer hover:bg-gray-50 transition-all duration-200 group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-[#0F7377] text-white flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
                          <Hash className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 mb-1">Development</p>
                          <p className="text-xs text-gray-500 leading-relaxed">Development discussions and code reviews</p>
                        </div>
                      </div>
                      <div
                        className="flex items-start space-x-3 p-4 rounded-xl cursor-pointer hover:bg-gray-50 transition-all duration-200 group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-[#0F7377] text-white flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
                          <Hash className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 mb-1">Design</p>
                          <p className="text-xs text-gray-500 leading-relaxed">Design discussions and feedback</p>
                        </div>
                      </div>
                      <div
                        className="flex items-start space-x-3 p-4 rounded-xl cursor-pointer hover:bg-gray-50 transition-all duration-200 group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-[#0F7377] text-white flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
                          <Hash className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 mb-1">Marketing</p>
                          <p className="text-xs text-gray-500 leading-relaxed">Marketing strategies and campaigns</p>
                        </div>
                      </div>
                      <div
                        className="flex items-start space-x-3 p-4 rounded-xl cursor-pointer hover:bg-gray-50 transition-all duration-200 group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-[#0F7377] text-white flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
                          <Hash className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 mb-1">Sales</p>
                          <p className="text-xs text-gray-500 leading-relaxed">Sales strategies and customer success</p>
                        </div>
                      </div>
                      <div
                        className="flex items-start space-x-3 p-4 rounded-xl cursor-pointer hover:bg-gray-50 transition-all duration-200 group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-[#0F7377] text-white flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
                          <Hash className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 mb-1">Support</p>
                          <p className="text-xs text-gray-500 leading-relaxed">Customer support and help desk</p>
                        </div>
                      </div>
                      {filteredChannels
                        .filter(channel => channel.type === "public" || (channel as any).category === "general")
                        .map((channel) => (
                        <div
                          key={channel.id}
                          className={cn(
                            "flex items-start space-x-3 p-4 rounded-xl cursor-pointer hover:bg-gray-50 transition-all duration-200 group",
                            currentChannel?.id === channel.id && "bg-[#0F7377]/10 border border-[#0F7377]/30 shadow-sm"
                          )}
                          onClick={() => {
                            setCurrentChannel(channel)
                            markAsRead(channel.id)
                          }}
                        >
                          <div className="w-10 h-10 rounded-xl bg-[#0F7377] text-white flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
                            <Hash className="h-5 w-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-sm font-semibold text-gray-900">{channel.name}</p>
                              {(channel as any).unread > 0 && (
                                <Badge variant="destructive" className="bg-red-500 text-white text-xs px-2 py-1 flex-shrink-0">
                                  {(channel as any).unread}
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed">{channel.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Direct Messages */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wide">Direct Messages</h3>
                    <div className="space-y-2">
                      {/* Sample direct messages for testing */}
                      <div
                        className="flex items-start space-x-3 p-4 rounded-xl cursor-pointer hover:bg-gray-50 transition-all duration-200 group"
                      >
                        <Avatar className="w-10 h-10 flex-shrink-0 mt-0.5">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-[#0F7377] text-white font-semibold">
                            JD
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-semibold text-gray-900">John Doe</p>
                            <Badge variant="destructive" className="bg-red-500 text-white text-xs px-2 py-1 flex-shrink-0">
                              2
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-500 leading-relaxed">Hey, how's the project going?</p>
                        </div>
                      </div>
                      <div
                        className="flex items-start space-x-3 p-4 rounded-xl cursor-pointer hover:bg-gray-50 transition-all duration-200 group"
                      >
                        <Avatar className="w-10 h-10 flex-shrink-0 mt-0.5">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-[#0F7377] text-white font-semibold">
                            JS
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 mb-1">Jane Smith</p>
                          <p className="text-xs text-gray-500 leading-relaxed">Can we schedule a meeting?</p>
                        </div>
                      </div>
                      <div
                        className="flex items-start space-x-3 p-4 rounded-xl cursor-pointer hover:bg-gray-50 transition-all duration-200 group"
                      >
                        <Avatar className="w-10 h-10 flex-shrink-0 mt-0.5">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-[#0F7377] text-white font-semibold">
                            MJ
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 mb-1">Mike Johnson</p>
                          <p className="text-xs text-gray-500 leading-relaxed">Thanks for the feedback!</p>
                        </div>
                      </div>
                      <div
                        className="flex items-start space-x-3 p-4 rounded-xl cursor-pointer hover:bg-gray-50 transition-all duration-200 group"
                      >
                        <Avatar className="w-10 h-10 flex-shrink-0 mt-0.5">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-[#0F7377] text-white font-semibold">
                            SW
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 mb-1">Sarah Wilson</p>
                          <p className="text-xs text-gray-500 leading-relaxed">Let's discuss the design</p>
                        </div>
                      </div>
                      <div
                        className="flex items-start space-x-3 p-4 rounded-xl cursor-pointer hover:bg-gray-50 transition-all duration-200 group"
                      >
                        <Avatar className="w-10 h-10 flex-shrink-0 mt-0.5">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-[#0F7377] text-white font-semibold">
                            TB
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 mb-1">Tom Brown</p>
                          <p className="text-xs text-gray-500 leading-relaxed">Great work on the presentation!</p>
                        </div>
                      </div>
                      {filteredChannels
                        .filter(channel => channel.type === "direct")
                        .map((channel) => (
                        <div
                          key={channel.id}
                          className={cn(
                            "flex items-start space-x-3 p-4 rounded-xl cursor-pointer hover:bg-gray-50 transition-all duration-200 group",
                            currentChannel?.id === channel.id && "bg-[#0F7377]/10 border border-[#0F7377]/30 shadow-sm"
                          )}
                          onClick={() => {
                            setCurrentChannel(channel)
                            markAsRead(channel.id)
                          }}
                        >
                          <Avatar className="w-10 h-10 flex-shrink-0 mt-0.5">
                            <AvatarImage src={(channel as any).avatar} />
                            <AvatarFallback className="bg-[#0F7377] text-white font-semibold">
                              {channel.name?.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-sm font-semibold text-gray-900">{channel.name}</p>
                              {(channel as any).unread > 0 && (
                                <Badge variant="destructive" className="bg-red-500 text-white text-xs px-2 py-1 flex-shrink-0">
                                  {(channel as any).unread}
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed">Direct Message</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Load more channels button */}
                  {hasMoreChannels && !isLoadingMore && (
                    <div className="flex justify-center py-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={loadMoreChannels}
                        className="text-[#0F7377] border-[#0F7377] hover:bg-[#0F7377] hover:text-white"
                      >
                        Load More Channels
                      </Button>
                    </div>
                  )}
                  
                  {/* Loading indicator for channels */}
                  {isLoadingMore && hasMoreChannels && (
                    <div className="flex justify-center py-4">
                      <div className="flex items-center space-x-2 text-gray-500">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#0F7377]"></div>
                        <span className="text-sm">Loading more channels...</span>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="connectivity" className="h-full m-0 flex flex-col">
              <ScrollArea 
                className="flex-1 h-0"
                onScroll={(e) => handleScroll(e, 'users')}
              >
                <div className="p-6 space-y-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Connect with People</h3>
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-12 pr-4 py-3 w-full bg-gray-50 border-gray-200 focus:border-[#0F7377] focus:ring-2 focus:ring-[#0F7377]/20 rounded-xl"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {/* Sample users for testing */}
                    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-start justify-between space-x-4">
                        <div className="flex items-start space-x-4 min-w-0 flex-1">
                          <Avatar className="w-12 h-12 flex-shrink-0 mt-0.5">
                            <AvatarImage src="" />
                            <AvatarFallback className="bg-[#0F7377] text-white font-semibold">
                              JD
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="text-sm font-semibold text-gray-900">John Doe</h4>
                              <Badge 
                                variant="outline" 
                                className="text-xs border-green-500 text-green-600 flex-shrink-0"
                              >
                                Online
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed">john@example.com</p>
                            <p className="text-xs text-gray-400 leading-relaxed">Founder</p>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          className="bg-[#0F7377] hover:bg-[#0F7377]/90 text-white rounded-lg px-4 py-2 h-9 flex-shrink-0 shadow-sm hover:shadow-md transition-all duration-200"
                          onClick={() => {
                            const dmChannel = {
                              id: `dm-john-doe`,
                              name: "John Doe",
                              type: "direct" as const,
                              description: "Direct Message",
                              avatar: "",
                              members: [{ id: "1", name: "John Doe", avatar: "", email: "john@example.com", role: "Founder" }],
                              unreadCount: 0
                            }
                            setCurrentChannel(dmChannel)
                            setActiveTab("chats")
                          }}
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          <span className="text-sm font-semibold">Message</span>
                        </Button>
                      </div>
                    </Card>

                    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-start justify-between space-x-4">
                        <div className="flex items-start space-x-4 min-w-0 flex-1">
                          <Avatar className="w-12 h-12 flex-shrink-0 mt-0.5">
                            <AvatarImage src="" />
                            <AvatarFallback className="bg-[#0F7377] text-white font-semibold">
                              SC
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="text-sm font-semibold text-gray-900">Sarah Chen</h4>
                              <Badge 
                                variant="outline" 
                                className="text-xs border-green-500 text-green-600 flex-shrink-0"
                              >
                                Online
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed">sarah@example.com</p>
                            <p className="text-xs text-gray-400 leading-relaxed">Investor</p>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          className="bg-[#0F7377] hover:bg-[#0F7377]/90 text-white rounded-lg px-4 py-2 h-9 flex-shrink-0 shadow-sm hover:shadow-md transition-all duration-200"
                          onClick={() => {
                            const dmChannel = {
                              id: `dm-sarah-chen`,
                              name: "Sarah Chen",
                              type: "direct" as const,
                              description: "Direct Message",
                              avatar: "",
                              members: [{ id: "2", name: "Sarah Chen", avatar: "", email: "sarah@example.com", role: "Investor" }],
                              unreadCount: 0
                            }
                            setCurrentChannel(dmChannel)
                            setActiveTab("chats")
                          }}
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          <span className="text-sm font-semibold">Message</span>
                        </Button>
                      </div>
                    </Card>

                    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-start justify-between space-x-4">
                        <div className="flex items-start space-x-4 min-w-0 flex-1">
                          <Avatar className="w-12 h-12 flex-shrink-0 mt-0.5">
                            <AvatarImage src="" />
                            <AvatarFallback className="bg-[#0F7377] text-white font-semibold">
                              DW
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="text-sm font-semibold text-gray-900">David Wong</h4>
                              <Badge 
                                variant="outline" 
                                className="text-xs border-green-500 text-green-600 flex-shrink-0"
                              >
                                Online
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed">david@example.com</p>
                            <p className="text-xs text-gray-400 leading-relaxed">Mentor</p>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          className="bg-[#0F7377] hover:bg-[#0F7377]/90 text-white rounded-lg px-4 py-2 h-9 flex-shrink-0 shadow-sm hover:shadow-md transition-all duration-200"
                          onClick={() => {
                            const dmChannel = {
                              id: `dm-david-wong`,
                              name: "David Wong",
                              type: "direct" as const,
                              description: "Direct Message",
                              avatar: "",
                              members: [{ id: "3", name: "David Wong", avatar: "", email: "david@example.com", role: "Mentor" }],
                              unreadCount: 0
                            }
                            setCurrentChannel(dmChannel)
                            setActiveTab("chats")
                          }}
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          <span className="text-sm font-semibold">Message</span>
                        </Button>
                      </div>
                    </Card>

                    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-start justify-between space-x-4">
                        <div className="flex items-start space-x-4 min-w-0 flex-1">
                          <Avatar className="w-12 h-12 flex-shrink-0 mt-0.5">
                            <AvatarImage src="" />
                            <AvatarFallback className="bg-[#0F7377] text-white font-semibold">
                              JS
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="text-sm font-semibold text-gray-900">Jane Smith</h4>
                              <Badge 
                                variant="outline" 
                                className="text-xs border-green-500 text-green-600 flex-shrink-0"
                              >
                                Online
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed">jane@example.com</p>
                            <p className="text-xs text-gray-400 leading-relaxed">Designer</p>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          className="bg-[#0F7377] hover:bg-[#0F7377]/90 text-white rounded-lg px-4 py-2 h-9 flex-shrink-0 shadow-sm hover:shadow-md transition-all duration-200"
                          onClick={() => {
                            const dmChannel = {
                              id: `dm-jane-smith`,
                              name: "Jane Smith",
                              type: "direct" as const,
                              description: "Direct Message",
                              avatar: "",
                              members: [{ id: "4", name: "Jane Smith", avatar: "", email: "jane@example.com", role: "Designer" }],
                              unreadCount: 0
                            }
                            setCurrentChannel(dmChannel)
                            setActiveTab("chats")
                          }}
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          <span className="text-sm font-semibold">Message</span>
                        </Button>
                      </div>
                    </Card>

                    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-start justify-between space-x-4">
                        <div className="flex items-start space-x-4 min-w-0 flex-1">
                          <Avatar className="w-12 h-12 flex-shrink-0 mt-0.5">
                            <AvatarImage src="" />
                            <AvatarFallback className="bg-[#0F7377] text-white font-semibold">
                              MJ
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="text-sm font-semibold text-gray-900">Mike Johnson</h4>
                              <Badge 
                                variant="outline" 
                                className="text-xs border-green-500 text-green-600 flex-shrink-0"
                              >
                                Online
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed">mike@example.com</p>
                            <p className="text-xs text-gray-400 leading-relaxed">Developer</p>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          className="bg-[#0F7377] hover:bg-[#0F7377]/90 text-white rounded-lg px-4 py-2 h-9 flex-shrink-0 shadow-sm hover:shadow-md transition-all duration-200"
                          onClick={() => {
                            const dmChannel = {
                              id: `dm-mike-johnson`,
                              name: "Mike Johnson",
                              type: "direct" as const,
                              description: "Direct Message",
                              avatar: "",
                              members: [{ id: "5", name: "Mike Johnson", avatar: "", email: "mike@example.com", role: "Developer" }],
                              unreadCount: 0
                            }
                            setCurrentChannel(dmChannel)
                            setActiveTab("chats")
                          }}
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          <span className="text-sm font-semibold">Message</span>
                        </Button>
                      </div>
                    </Card>

                    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-start justify-between space-x-4">
                        <div className="flex items-start space-x-4 min-w-0 flex-1">
                          <Avatar className="w-12 h-12 flex-shrink-0 mt-0.5">
                            <AvatarImage src="" />
                            <AvatarFallback className="bg-[#0F7377] text-white font-semibold">
                              SW
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="text-sm font-semibold text-gray-900">Sarah Wilson</h4>
                              <Badge 
                                variant="outline" 
                                className="text-xs border-green-500 text-green-600 flex-shrink-0"
                              >
                                Online
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed">sarah.wilson@example.com</p>
                            <p className="text-xs text-gray-400 leading-relaxed">Product Manager</p>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          className="bg-[#0F7377] hover:bg-[#0F7377]/90 text-white rounded-lg px-4 py-2 h-9 flex-shrink-0 shadow-sm hover:shadow-md transition-all duration-200"
                          onClick={() => {
                            const dmChannel = {
                              id: `dm-sarah-wilson`,
                              name: "Sarah Wilson",
                              type: "direct" as const,
                              description: "Direct Message",
                              avatar: "",
                              members: [{ id: "6", name: "Sarah Wilson", avatar: "", email: "sarah.wilson@example.com", role: "Product Manager" }],
                              unreadCount: 0
                            }
                            setCurrentChannel(dmChannel)
                            setActiveTab("chats")
                          }}
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          <span className="text-sm font-semibold">Message</span>
                        </Button>
                      </div>
                    </Card>

                    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-start justify-between space-x-4">
                        <div className="flex items-start space-x-4 min-w-0 flex-1">
                          <Avatar className="w-12 h-12 flex-shrink-0 mt-0.5">
                            <AvatarImage src="" />
                            <AvatarFallback className="bg-[#0F7377] text-white font-semibold">
                              TB
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="text-sm font-semibold text-gray-900">Tom Brown</h4>
                              <Badge 
                                variant="outline" 
                                className="text-xs border-green-500 text-green-600 flex-shrink-0"
                              >
                                Online
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed">tom@example.com</p>
                            <p className="text-xs text-gray-400 leading-relaxed">Marketing Lead</p>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          className="bg-[#0F7377] hover:bg-[#0F7377]/90 text-white rounded-lg px-4 py-2 h-9 flex-shrink-0 shadow-sm hover:shadow-md transition-all duration-200"
                          onClick={() => {
                            const dmChannel = {
                              id: `dm-tom-brown`,
                              name: "Tom Brown",
                              type: "direct" as const,
                              description: "Direct Message",
                              avatar: "",
                              members: [{ id: "7", name: "Tom Brown", avatar: "", email: "tom@example.com", role: "Marketing Lead" }],
                              unreadCount: 0
                            }
                            setCurrentChannel(dmChannel)
                            setActiveTab("chats")
                          }}
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          <span className="text-sm font-semibold">Message</span>
                        </Button>
                      </div>
                    </Card>

                    {filteredUsers.map((user) => (
                      <Card key={user.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex items-start justify-between space-x-4">
                          <div className="flex items-start space-x-4 min-w-0 flex-1">
                            <Avatar className="w-12 h-12 flex-shrink-0 mt-0.5">
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback className="bg-[#0F7377] text-white font-semibold">
                                {user.name?.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className="text-sm font-semibold text-gray-900">{user.name}</h4>
                                <Badge 
                                  variant="outline" 
                                  className="text-xs border-green-500 text-green-600 flex-shrink-0"
                                >
                                  Online
                                </Badge>
                              </div>
                              <p className="text-xs text-gray-500 leading-relaxed">{user.email}</p>
                              <p className="text-xs text-gray-400 leading-relaxed">{user.role}</p>
                            </div>
                          </div>
                          <Button 
                            size="sm" 
                            className="bg-[#0F7377] hover:bg-[#0F7377]/90 text-white rounded-lg px-4 py-2 h-9 flex-shrink-0 shadow-sm hover:shadow-md transition-all duration-200"
                            onClick={() => {
                              // Create a direct message channel with this user
                              const dmChannel = {
                                id: `dm-${user.id}`,
                                name: user.name,
                                type: "direct" as const,
                                description: "Direct Message",
                                avatar: user.avatar,
                                members: [user],
                                unreadCount: 0
                              }
                              setCurrentChannel(dmChannel)
                              setActiveTab("chats")
                            }}
                          >
                            <MessageCircle className="h-4 w-4 mr-2" />
                            <span className="text-sm font-semibold">Message</span>
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                  
                  {/* Load more users button */}
                  {hasMoreUsers && !isLoadingMore && (
                    <div className="flex justify-center py-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={loadMoreUsers}
                        className="text-[#0F7377] border-[#0F7377] hover:bg-[#0F7377] hover:text-white"
                      >
                        Load More Users
                      </Button>
                    </div>
                  )}
                  
                  {/* Loading indicator for users */}
                  {isLoadingMore && hasMoreUsers && (
                    <div className="flex justify-center py-4">
                      <div className="flex items-center space-x-2 text-gray-500">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#0F7377]"></div>
                        <span className="text-sm">Loading more users...</span>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="meetings" className="h-full m-0 flex flex-col">
              <ScrollArea className="flex-1 h-0">
                <div className="p-6 space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Meetings & Calls</h3>
                  
                  <div className="space-y-4">
                    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={handleVideoCall}>
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                          <Video className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">Start Video Call</h4>
                          <p className="text-sm text-gray-500">Start a new video meeting</p>
                        </div>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                          Start
                        </Button>
                      </div>
                    </Card>
                    
                    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={handleAudioCall}>
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                          <Phone className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">Start Audio Call</h4>
                          <p className="text-sm text-gray-500">Start a new audio meeting</p>
                        </div>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                          Start
                        </Button>
                      </div>
                    </Card>
                    
                    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                          <Calendar className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">Schedule Meeting</h4>
                          <p className="text-sm text-gray-500">Plan a future meeting</p>
                        </div>
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                          Schedule
                        </Button>
                      </div>
                    </Card>

                    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                          <Users className="h-6 w-6 text-orange-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">Group Meeting</h4>
                          <p className="text-sm text-gray-500">Start a group video call</p>
                        </div>
                        <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white">
                          Start
                        </Button>
                      </div>
                    </Card>

                    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                          <Star className="h-6 w-6 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">Webinar</h4>
                          <p className="text-sm text-gray-500">Host a webinar or presentation</p>
                        </div>
                        <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                          Host
                        </Button>
                      </div>
                    </Card>

                    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                          <Settings className="h-6 w-6 text-indigo-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">Meeting Settings</h4>
                          <p className="text-sm text-gray-500">Configure meeting preferences</p>
                        </div>
                        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                          Configure
                        </Button>
                      </div>
                    </Card>

                    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center">
                          <Clock className="h-6 w-6 text-teal-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">Meeting History</h4>
                          <p className="text-sm text-gray-500">View past meetings and recordings</p>
                        </div>
                        <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white">
                          View
                        </Button>
                      </div>
                    </Card>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="settings" className="h-full m-0 flex flex-col">
              <ScrollArea className="flex-1 h-0">
                <div className="p-6 space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Settings</h3>
                  
                  <div className="space-y-4">
                    <Card className="p-4">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <Bell className="h-5 w-5 mr-2 text-[#0F7377]" />
                        Notifications
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-sm font-medium text-gray-900">Message notifications</span>
                            <p className="text-xs text-gray-500">Get notified about new messages</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-sm font-medium text-gray-900">Sound notifications</span>
                            <p className="text-xs text-gray-500">Play sound for new messages</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-sm font-medium text-gray-900">Desktop notifications</span>
                            <p className="text-xs text-gray-500">Show desktop notifications</p>
                          </div>
                          <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-sm font-medium text-gray-900">Email notifications</span>
                            <p className="text-xs text-gray-500">Receive email notifications</p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </Card>
                    
                    <Card className="p-4">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <Shield className="h-5 w-5 mr-2 text-[#0F7377]" />
                        Privacy & Security
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-sm font-medium text-gray-900">Show online status</span>
                            <p className="text-xs text-gray-500">Let others see when you're online</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-sm font-medium text-gray-900">Read receipts</span>
                            <p className="text-xs text-gray-500">Show when messages are read</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-sm font-medium text-gray-900">Message encryption</span>
                            <p className="text-xs text-gray-500">Encrypt all messages</p>
                          </div>
                          <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-sm font-medium text-gray-900">Two-factor authentication</span>
                            <p className="text-xs text-gray-500">Add extra security to your account</p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </Card>

                    <Card className="p-4">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <Settings className="h-5 w-5 mr-2 text-[#0F7377]" />
                        Appearance
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-sm font-medium text-gray-900">Dark mode</span>
                            <p className="text-xs text-gray-500">Switch to dark theme</p>
                          </div>
                          <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-sm font-medium text-gray-900">Compact mode</span>
                            <p className="text-xs text-gray-500">Use compact message layout</p>
                          </div>
                          <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-sm font-medium text-gray-900">Show timestamps</span>
                            <p className="text-xs text-gray-500">Display message timestamps</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </Card>

                    <Card className="p-4">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <Globe className="h-5 w-5 mr-2 text-[#0F7377]" />
                        Language & Region
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-gray-900 mb-2 block">Language</label>
                          <Select defaultValue="en">
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="en">English</SelectItem>
                              <SelectItem value="es">Spanish</SelectItem>
                              <SelectItem value="fr">French</SelectItem>
                              <SelectItem value="de">German</SelectItem>
                              <SelectItem value="zh">Chinese</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-900 mb-2 block">Time Zone</label>
                          <Select defaultValue="utc">
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select timezone" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="utc">UTC</SelectItem>
                              <SelectItem value="est">Eastern Time</SelectItem>
                              <SelectItem value="pst">Pacific Time</SelectItem>
                              <SelectItem value="gmt">GMT</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-4">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <User className="h-5 w-5 mr-2 text-[#0F7377]" />
                        Account
                      </h4>
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full justify-start">
                          <User className="h-4 w-4 mr-2" />
                          Edit Profile
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Settings className="h-4 w-4 mr-2" />
                          Account Settings
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Shield className="h-4 w-4 mr-2" />
                          Privacy Settings
                        </Button>
                        <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                          <Circle className="h-4 w-4 mr-2" />
                          Sign Out
                        </Button>
                      </div>
                    </Card>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>
          </div>

          {/* Resize Handle */}
          {!isCollapsed && (
            <div
              ref={resizeRef}
              className={cn(
                "w-2 bg-gray-200 hover:bg-gray-300 cursor-col-resize flex-shrink-0 transition-all duration-200 group",
                isResizing && "bg-blue-300 w-3"
              )}
              onMouseDown={handleResizeStart}
            >
              <div className="w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <GripVertical className="h-4 w-4 text-gray-500" />
              </div>
            </div>
          )}

          {/* Resize Indicator */}
          {isResizing && (
            <div className="fixed top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-lg text-sm z-50">
              Width: {sidebarWidth}px
            </div>
          )}

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col bg-gray-50 min-w-0 overflow-hidden">
            {currentChannel ? (
              <>
                {/* Chat Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white shadow-sm">
                  <div className="flex items-center space-x-4">
                    {/* Mobile Sidebar Toggle */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg sm:hidden"
                      onClick={handleSidebarToggle}
                    >
                      <PanelLeft className="h-4 w-4" />
                    </Button>
                    {currentChannel.type === "direct" ? (
                      <Avatar className="w-12 h-12 flex-shrink-0">
                        <AvatarImage src={(currentChannel as any).avatar} />
                        <AvatarFallback className="bg-[#0F7377] text-white font-semibold">
                          {currentChannel.name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-[#0F7377] text-white flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Hash className="h-6 w-6" />
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{currentChannel.name}</h3>
                      <p className="text-sm text-gray-500">
                        {currentChannel.type === "direct" ? "Direct Message" : "Channel"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-10 w-10 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-xl"
                      onClick={handleAudioCall}
                    >
                      <Phone className="h-5 w-5" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-10 w-10 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl"
                      onClick={handleVideoCall}
                    >
                      <Video className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-10 w-10 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl">
                      <MoreHorizontal className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* Message Search */}
                {showMessageSearch && (
                  <div className="px-6 py-4 border-b border-gray-200 bg-white">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search messages..."
                        value={messageSearchQuery}
                        onChange={(e) => setMessageSearchQuery(e.target.value)}
                        className="pl-12 pr-12 py-3 w-full bg-gray-50 border-gray-200 focus:border-[#0F7377] focus:ring-2 focus:ring-[#0F7377]/20 rounded-xl"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 text-gray-500 hover:text-gray-700 rounded-lg"
                        onClick={() => setShowMessageSearch(false)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                  {/* Messages */}
                  <ScrollArea 
                    className="flex-1 h-0 p-6"
                    onScroll={(e) => handleScroll(e, 'messages')}
                  >
                  <div className="space-y-4">
                    {(messageSearchQuery ? searchFilteredMessages : messages).map((message) => (
                      <div key={message.id} className="flex space-x-3 group">
                        <Avatar className="w-10 h-10 flex-shrink-0">
                          <AvatarImage src={message.sender.avatar} />
                          <AvatarFallback className="bg-[#0F7377] text-white font-semibold">
                            {message.sender.name?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-sm font-semibold text-gray-900 truncate">{message.sender.name}</span>
                            <span className="text-xs text-gray-500 flex-shrink-0">
                              {format(message.timestamp, "HH:mm")}
                            </span>
                          </div>
                          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                            <div className="flex items-start justify-between">
                              <p className="text-sm text-gray-900 flex-1">
                                {encryptedMessages[message.id] ? (
                                  <span className="text-gray-500 italic">🔒 Encrypted message</span>
                                ) : translatedMessages[message.id] ? (
                                  <div>
                                    <p className="text-sm text-gray-900">{translatedMessages[message.id]}</p>
                                    <p className="text-xs text-gray-500 mt-1 italic">Original: {message.content}</p>
                                  </div>
                                ) : (
                                  message.content
                                )}
                              </p>
                              <div className="flex space-x-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 w-7 p-0 text-gray-400 hover:text-blue-600 rounded-lg"
                                  onClick={() => handleTranslateMessage(message.id, message.content)}
                                >
                                  <Globe className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 w-7 p-0 text-gray-400 hover:text-green-600 rounded-lg"
                                  onClick={() => handleEncryptMessage(message.id)}
                                >
                                  <Shield className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 w-7 p-0 text-gray-400 hover:text-purple-600 rounded-lg"
                                  onClick={() => handlePinMessage(message.id)}
                                >
                                  <Pin className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 w-7 p-0 text-gray-400 hover:text-orange-600 rounded-lg"
                                  onClick={() => handleReply(message)}
                                >
                                  <Reply className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 w-7 p-0 text-gray-400 hover:text-blue-600 rounded-lg"
                                  onClick={() => handleEdit(message.id, message.content)}
                                >
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 w-7 p-0 text-gray-400 hover:text-red-600 rounded-lg"
                                  onClick={() => handleDelete(message.id)}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                            
                            {/* Message Status */}
                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center space-x-1">
                                {getMessageStatusIcon(message.status)}
                                {message.isEdited && (
                                  <span className="text-xs text-gray-400">(edited)</span>
                                )}
                              </div>
                              <div className="flex space-x-1">
                                {quickReactions.map((reaction) => (
                                  <Button
                                    key={reaction.emoji}
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 px-2 text-xs rounded-full hover:bg-gray-100"
                                    onClick={() => handleReactionToggle(message.id, reaction.emoji)}
                                  >
                                    {reaction.emoji}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {/* Load more messages button */}
                    {hasMoreMessages && !isLoadingMore && (
                      <div className="flex justify-center py-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={loadMoreMessages}
                          className="text-[#0F7377] border-[#0F7377] hover:bg-[#0F7377] hover:text-white"
                        >
                          Load More Messages
                        </Button>
                      </div>
                    )}
                    
                    {/* Loading indicator for messages */}
                    {isLoadingMore && hasMoreMessages && (
                      <div className="flex justify-center py-4">
                        <div className="flex items-center space-x-2 text-gray-500">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#0F7377]"></div>
                          <span className="text-sm">Loading more messages...</span>
                        </div>
                      </div>
                    )}
                    
                    <div ref={messageEndRef} />
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="px-6 py-4 border-t border-gray-200 bg-white">
                  {replyingTo && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-xl border border-gray-200">
                      <p className="text-xs text-gray-500 font-medium">Replying to {replyingTo.sender.name}</p>
                      <p className="text-sm text-gray-700 truncate">{replyingTo.content}</p>
                    </div>
                  )}

                  {editingMessage && (
                    <div className="mb-4 p-3 bg-blue-50 rounded-xl border border-blue-200">
                      <p className="text-xs text-blue-600 font-medium">Editing message</p>
                    </div>
                  )}

                  {selectedFiles.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 font-medium mb-2">Selected files:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedFiles.map((file, index) => (
                          <div key={index} className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
                            <Paperclip className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-700 truncate max-w-32">{file.name}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 text-gray-500 hover:text-red-600"
                              onClick={() => setSelectedFiles(prev => prev.filter((_, i) => i !== index))}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {isTypingLocal && (
                    <div className="mb-2 text-xs text-gray-500 italic">
                      {currentUser?.name} is typing...
                    </div>
                  )}

                  <div className="flex items-center space-x-3">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-10 w-10 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl"
                            onClick={() => document.getElementById('file-upload')?.click()}
                          >
                            <Paperclip className="h-5 w-5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Attach files</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    {/* Hidden file input */}
                    <input
                      type="file"
                      multiple
                      onChange={handleFileSelect}
                      className="hidden"
                      id="file-upload"
                      accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
                    />

                    <div className="flex-1 relative">
                      <Input
                        ref={inputRef}
                        placeholder={editingMessage ? "Edit your message..." : "Type a message..."}
                        value={editingMessage ? editContent : messageInput}
                        onChange={editingMessage ? (e) => setEditContent(e.target.value) : handleTyping}
                        onKeyPress={handleKeyPress}
                        className="pr-12 pl-4 py-3 w-full bg-gray-50 border-gray-200 focus:border-[#0F7377] focus:ring-2 focus:ring-[#0F7377]/20 rounded-xl"
                      />
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 text-gray-500 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg"
                              onClick={() => setShowEmojiPickerDialog(!showEmojiPickerDialog)}
                            >
                              <Smile className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Add emoji</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsRecording(!isRecording)}
                            className={`h-10 w-10 rounded-xl ${
                              isRecording 
                                ? "text-red-600 bg-red-50 hover:bg-red-100" 
                                : "text-gray-500 hover:text-orange-600 hover:bg-orange-50"
                            }`}
                          >
                            {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>{isRecording ? "Stop recording" : "Voice message"}</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setShowScheduleDialog(true)}
                            className="h-10 w-10 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-xl"
                          >
                            <Calendar className="h-5 w-5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Schedule message</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setShowMessageSearch(!showMessageSearch)}
                            className="h-10 w-10 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl"
                          >
                            <Search className="h-5 w-5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Search messages</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            onClick={handleSendMessage} 
                            disabled={!messageInput.trim() && selectedFiles.length === 0}
                            className="bg-[#0F7377] hover:bg-[#0F7377]/90 text-white px-6 py-3 h-10 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl"
                          >
                            <Send className="h-5 w-5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Send message</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                    <MessageSquare className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Welcome to GrowthLab Chat</h3>
                  <p className="text-gray-500">Select a channel or start a conversation to begin messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Tabs>

      {/* Schedule Message Dialog */}
      {showScheduleDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Schedule Message</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <Textarea
                  value={messageInput}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessageInput(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full rounded-xl"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Schedule Time</label>
                <Input
                  type="datetime-local"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="w-full rounded-xl"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowScheduleDialog(false)}
                className="rounded-xl"
              >
                Cancel
              </Button>
              <Button
                onClick={handleScheduleMessage}
                className="bg-[#0F7377] hover:bg-[#0F7377]/90 text-white rounded-xl"
              >
                Schedule
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Create Channel Dialog */}
      <CreateChannelDialog
        open={showCreateChannelDialog}
        onOpenChange={setShowCreateChannelDialog}
        onCreateChannel={handleCreateChannel}
      />

      {/* Emoji Picker Dialog */}
      {showEmojiPickerDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-2 -right-2 z-10 h-8 w-8 text-gray-500 hover:text-gray-700 bg-white rounded-full shadow-lg"
              onClick={() => setShowEmojiPickerDialog(false)}
            >
              <X className="h-4 w-4" />
            </Button>
            <EmojiPicker
              onEmojiSelect={handleEmojiSelect}
              onClose={() => setShowEmojiPickerDialog(false)}
            />
          </div>
        </div>
      )}

      {/* Settings Dialog */}
      {showSettingsDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Settings</h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-500 hover:text-gray-700"
                onClick={() => setShowSettingsDialog(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-6">
              {/* Notifications */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">Notifications</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Message Notifications</p>
                      <p className="text-sm text-gray-500">Get notified about new messages</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Bell className="h-4 w-4 mr-2" />
                      Test
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Sound Notifications</p>
                      <p className="text-sm text-gray-500">Play sound for new messages</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <BellOff className="h-4 w-4 mr-2" />
                      Mute
                    </Button>
                  </div>
                </div>
              </div>

              {/* Privacy */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">Privacy</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Online Status</p>
                      <p className="text-sm text-gray-500">Show when you're online</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Circle className="h-4 w-4 mr-2" />
                      Online
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Read Receipts</p>
                      <p className="text-sm text-gray-500">Let others know when you read messages</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Enabled
                    </Button>
                  </div>
                </div>
              </div>

              {/* Security */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">Security</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Message Encryption</p>
                      <p className="text-sm text-gray-500">Encrypt messages for added security</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Shield className="h-4 w-4 mr-2" />
                      Enable
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-500">Add an extra layer of security</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Shield className="h-4 w-4 mr-2" />
                      Setup
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}