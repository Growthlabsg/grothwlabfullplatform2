"use client"

import { useState, useEffect, useRef } from "react"
import {
  MessageSquare,
  Search,
  MoreVertical,
  Phone,
  Video,
  Send,
  Paperclip,
  Smile,
  Mic,
  Camera,
  Send as SendIcon,
  Check,
  CheckCheck,
  Clock,
  AlertCircle,
  Pin,
  Star,
  Archive,
  MicOff,
  Shield,
  Trash2,
  Edit,
  Reply,
  Forward,
  Copy,
  Users,
  Hash,
  Settings,
  Bell,
  Volume2,
  VolumeX,
  Moon,
  User,
  Plus,
  ArrowLeft,
  Menu,
  X,
  Filter,
  Bookmark,
  Calendar,
  FileText,
  Upload,
  ChevronDown,
  ChevronUp,
  StarOff,
  MoreHorizontal,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Eye,
  Download as DownloadIcon,
  Share2 as ShareIcon,
  Heart,
  ThumbsUp,
  MessageCircle,
  AtSign,
  HelpCircle,
  Headphones,
  UserCheck,
  Building2,
  GraduationCap,
  DollarSign,
  Rocket,
  Target,
  TrendingUp,
  Globe,
  Mail,
  BookOpen,
  Lightbulb,
  Award,
  Users2,
  UserPlus,
  MessageSquarePlus,
  PhoneCall,
  FileImage,
  FileVideo,
  FileAudio,
  Link,
  ExternalLink,
  ScreenShare,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Wifi,
  WifiOff,
  Signal,
  SignalHigh,
  SignalMedium,
  SignalLow,
  Battery,
  BatteryCharging,
  Power,
  PowerOff,
  RefreshCw,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Move,
  Crop,
  Scissors,
  Type,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Indent,
  Quote,
  Code,
  Link2,
  File,
  Folder,
  FolderOpen,
  FolderPlus,
  FolderMinus,
  FolderX,
  FolderCheck,
  FolderSearch,
  FolderHeart,
  FolderLock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { VisuallyHidden } from "@/components/ui/visually-hidden"
import { useMobile } from "@/hooks/use-mobile"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { SecureFileSharing } from "./secure-file-sharing"

// WhatsApp-style types
interface WhatsAppMessage {
  id: string
  content: string
  timestamp: Date
  sender: WhatsAppUser
  status: "sending" | "sent" | "delivered" | "read" | "failed"
  type: "text" | "image" | "video" | "audio" | "document" | "location" | "contact" | "sticker"
  replyTo?: WhatsAppMessage
  isForwarded?: boolean
  isEdited?: boolean
  reactions?: MessageReaction[]
  mediaUrl?: string
  fileName?: string
  fileSize?: number
  duration?: number
  location?: { lat: number; lng: number; name: string }
  contact?: { name: string; phone: string; avatar?: string }
}

interface WhatsAppUser {
  id: string
  name: string
  avatar?: string
  phone?: string
  status?: "online" | "away" | "offline" | "busy"
  lastSeen?: Date
  isTyping?: boolean
  isRecording?: boolean
}

interface WhatsAppChat {
  id: string
  name: string
  avatar?: string
  isGroup?: boolean
  members?: WhatsAppUser[]
  unreadCount: number
  lastMessage?: WhatsAppMessage
  isPinned?: boolean
  isMuted?: boolean
  isArchived?: boolean
  isBlocked?: boolean
  status?: "online" | "away" | "offline" | "busy"
  lastSeen?: Date
}

interface MessageReaction {
  emoji: string
  users: string[]
}

interface WhatsAppCall {
  id: string
  type: "audio" | "video"
  participants: WhatsAppUser[]
  startTime: Date
  endTime?: Date
  duration?: number
  status: "incoming" | "outgoing" | "missed" | "ended"
  isRecording?: boolean
}

interface WhatsAppStatus {
  id: string
  content: string
  type: "text" | "image" | "video"
  mediaUrl?: string
  timestamp: Date
  views: number
  replies: number
  isMyStatus?: boolean
}

interface WhatsAppProps {
  onClose?: () => void
  activeTab?: "chats" | "calls" | "status" | "files"
  onTabChange?: (tab: "chats" | "calls" | "status" | "files") => void
  enableFileSharing?: boolean
  securityLevels?: string[]
  className?: string
}

export function WhatsAppHub({
  onClose,
  activeTab = "chats",
  onTabChange,
  enableFileSharing = true,
  securityLevels = ["standard", "confidential", "restricted"],
  className,
}: WhatsAppProps) {
  // WhatsApp-style state
  const { isMobile } = useMobile()
  const [currentTab, setCurrentTab] = useState(activeTab)
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showArchived, setShowArchived] = useState(false)
  const [showMuted, setShowMuted] = useState(false)
  const [showBlocked, setShowBlocked] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile)
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false)
  const [showChatInfo, setShowChatInfo] = useState(false)
  const [showCallInterface, setShowCallInterface] = useState(false)
  const [callType, setCallType] = useState<"audio" | "video">("audio")
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [showStatusViewer, setShowStatusViewer] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<WhatsAppStatus | null>(null)
  const [showCreateStatus, setShowCreateStatus] = useState(false)
  const [showNotificationSettings, setShowNotificationSettings] = useState(false)
  const [showPrivacySettings, setShowPrivacySettings] = useState(false)
  const [showThemeSettings, setShowThemeSettings] = useState(false)
  const [showStorageSettings, setShowStorageSettings] = useState(false)
  const [showSecuritySettings, setShowSecuritySettings] = useState(false)
  const [showHelpSettings, setShowHelpSettings] = useState(false)
  const [showAboutSettings, setShowAboutSettings] = useState(false)

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    enabled: true,
    muted: false,
    volume: 0.5,
    sounds: {
      message: "default",
      call: "bell",
      status: "ping",
    },
    doNotDisturb: false,
    doNotDisturbSchedule: {
      enabled: false,
      startTime: "22:00",
      endTime: "08:00",
      days: [],
    },
  })

  // Privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    lastSeen: "everyone",
    profilePhoto: "everyone",
    about: "everyone",
    status: "everyone",
    readReceipts: true,
    groups: "everyone",
  })

  // Theme settings
  const [themeSettings, setThemeSettings] = useState({
    theme: "light",
    chatWallpaper: "default",
    fontSize: "medium",
    enterToSend: true,
    mediaAutoDownload: true,
  })

  // Mock data
  const currentUser: WhatsAppUser = {
    id: "user-123",
    name: "John Doe",
    avatar: "/placeholder.svg",
    phone: "+1 234 567 8900",
    status: "online",
  }

  const chats: WhatsAppChat[] = [
    {
      id: "sarah",
      name: "Sarah Chen",
      avatar: "/abstract-geometric-shapes.png",
      unreadCount: 2,
      status: "online",
      lastMessage: {
        id: "msg-1",
        content: "Looking forward to our meeting tomorrow!",
        timestamp: new Date(),
        sender: { id: "sarah", name: "Sarah Chen" },
        status: "read",
        type: "text",
      },
      isPinned: true,
    },
    {
      id: "david",
      name: "David Wong",
      avatar: "/abstract-geometric-aw.png",
      unreadCount: 0,
      status: "away",
      lastMessage: {
        id: "msg-2",
        content: "I'll send you the presentation by EOD",
        timestamp: new Date(Date.now() - 3600000),
        sender: { id: "david", name: "David Wong" },
        status: "delivered",
        type: "text",
      },
    },
    {
      id: "team-alpha",
      name: "Team Alpha",
      avatar: "/team-avatar.png",
      isGroup: true,
      unreadCount: 5,
      members: [
        { id: "alex", name: "Alex Smith", avatar: "/abstract-geometric-aw.png" },
        { id: "jane", name: "Jane Doe", avatar: "/professional-woman-diverse.png" },
        { id: "mike", name: "Mike Johnson", avatar: "/tech-professional.png" },
      ],
      lastMessage: {
        id: "msg-3",
        content: "Alex: Let's meet to discuss the new roadmap",
        timestamp: new Date(Date.now() - 1800000),
        sender: { id: "alex", name: "Alex Smith" },
        status: "read",
        type: "text",
      },
      isPinned: true,
    },
    {
      id: "jane",
      name: "Jane Smith",
      avatar: "/professional-woman-diverse.png",
      unreadCount: 0,
      status: "offline",
      lastSeen: new Date(Date.now() - 86400000),
      lastMessage: {
        id: "msg-4",
        content: "Thanks for your help yesterday!",
        timestamp: new Date(Date.now() - 86400000),
        sender: { id: "jane", name: "Jane Smith" },
        status: "read",
        type: "text",
      },
    },
  ]

  const calls: WhatsAppCall[] = [
    {
      id: "call-1",
      type: "audio",
      participants: [{ id: "sarah", name: "Sarah Chen", avatar: "/abstract-geometric-shapes.png" }],
      startTime: new Date(Date.now() - 3600000),
      endTime: new Date(Date.now() - 3300000),
      duration: 300,
      status: "ended",
    },
    {
      id: "call-2",
      type: "video",
      participants: [{ id: "david", name: "David Wong", avatar: "/abstract-geometric-aw.png" }],
      startTime: new Date(Date.now() - 7200000),
      status: "missed",
    },
  ]

  const statuses: WhatsAppStatus[] = [
    {
      id: "status-1",
      content: "Working on exciting new features! 🚀",
      type: "text",
      timestamp: new Date(Date.now() - 3600000),
      views: 12,
      replies: 3,
      isMyStatus: true,
    },
    {
      id: "status-2",
      content: "",
      type: "image",
      mediaUrl: "/abstract-geometric-shapes.png",
      timestamp: new Date(Date.now() - 7200000),
      views: 8,
      replies: 1,
      isMyStatus: false,
    },
  ]

  // Filter chats based on search and filters
  const filteredChats = chats.filter((chat) => {
    const matchesSearch = searchQuery ? chat.name.toLowerCase().includes(searchQuery.toLowerCase()) : true
    const matchesArchived = showArchived ? chat.isArchived : !chat.isArchived
    const matchesMuted = showMuted ? chat.isMuted : !chat.isMuted
    const matchesBlocked = showBlocked ? chat.isBlocked : !chat.isBlocked
    return matchesSearch && matchesArchived && matchesMuted && matchesBlocked
  })

  // Handle tab change
  const handleTabChange = (tab: "chats" | "calls" | "status" | "files") => {
    setCurrentTab(tab)
    if (onTabChange) {
      onTabChange(tab)
    }
  }

  // Handle chat selection
  const handleChatSelect = (chatId: string) => {
    setSelectedChat(chatId)
    if (isMobile) {
      setSidebarOpen(false)
    }
  }

  // Handle message sending
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return
    
    // Add message logic here
    setNewMessage("")
  }

  // Handle recording
  const handleStartRecording = () => {
    setIsRecording(true)
    setRecordingTime(0)
    // Add recording logic here
  }

  const handleStopRecording = () => {
    setIsRecording(false)
    setRecordingTime(0)
    // Add stop recording logic here
  }

  // Format duration for recording
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
  }

  // Render chat list item
  const renderChatItem = (chat: WhatsAppChat) => (
    <div
      key={chat.id}
      className={cn(
        "flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors",
        selectedChat === chat.id && "bg-gray-100 dark:bg-gray-700"
      )}
      onClick={() => handleChatSelect(chat.id)}
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
            {chat.lastMessage?.timestamp && format(chat.lastMessage.timestamp, "HH:mm")}
          </span>
        </div>
        
        <div className="flex items-center justify-between mt-1">
          <p className="text-sm text-gray-600 dark:text-gray-400 truncate flex-1">
            {chat.lastMessage?.content || "No messages yet"}
          </p>
          <div className="flex items-center gap-1 ml-2">
            {chat.isPinned && <Pin className="h-3 w-3 text-gray-400" />}
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

  // Render message bubble
  const renderMessageBubble = (message: WhatsAppMessage, isOwn: boolean) => (
    <div
      key={message.id}
      className={cn(
        "flex mb-2",
        isOwn ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-xs lg:max-w-md px-3 py-2 rounded-lg",
          isOwn
            ? "bg-green-500 text-white"
            : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        )}
      >
        {message.replyTo && (
          <div className="text-xs opacity-70 mb-1 border-l-2 pl-2">
            Replying to: {message.replyTo.content.substring(0, 30)}...
          </div>
        )}
        
        <div className="text-sm">{message.content}</div>
        
        <div className="flex items-center justify-end gap-1 mt-1">
          <span className="text-xs opacity-70">
            {format(message.timestamp, "HH:mm")}
          </span>
          {isOwn && (
            <div className="flex items-center">
              {message.status === "sending" && <Clock className="h-3 w-3" />}
              {message.status === "sent" && <Check className="h-3 w-3" />}
              {message.status === "delivered" && <CheckCheck className="h-3 w-3" />}
              {message.status === "read" && <CheckCheck className="h-3 w-3 text-blue-500" />}
              {message.status === "failed" && <AlertCircle className="h-3 w-3 text-red-500" />}
            </div>
          )}
        </div>
      </div>
    </div>
  )

  // Render chat interface
  const renderChatInterface = () => {
    const selectedChatData = chats.find(chat => chat.id === selectedChat)
    
    if (!selectedChatData) {
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Select a chat</h3>
            <p className="text-gray-500">Choose a conversation to start messaging</p>
          </div>
        </div>
      )
    }

    return (
      <div className="flex-1 flex flex-col">
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
                {selectedChatData.status === "online" ? "online" : 
                 selectedChatData.lastSeen ? `last seen ${format(selectedChatData.lastSeen, "HH:mm")}` : "offline"}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setShowCallInterface(true)}>
              <Video className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setShowCallInterface(true)}>
              <Phone className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setShowChatInfo(true)}>
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Messages area */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {/* Mock messages */}
            <div className="text-center text-sm text-gray-500">
              {format(new Date(), "MMMM d, yyyy")}
            </div>
            
            {/* Sample messages */}
            <div className="space-y-2">
              <div className="flex justify-start">
                <div className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-3 py-2 rounded-lg max-w-xs">
                  <div className="text-sm">Hey! How's it going?</div>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className="text-xs opacity-70">10:30</span>
                    <CheckCheck className="h-3 w-3 text-blue-500" />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <div className="bg-green-500 text-white px-3 py-2 rounded-lg max-w-xs">
                  <div className="text-sm">Great! Working on some exciting features 🚀</div>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className="text-xs opacity-70">10:32</span>
                    <CheckCheck className="h-3 w-3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Message input */}
        <div className="p-3 border-t bg-white dark:bg-gray-900">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
              <Smile className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="icon" onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}>
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
                onClick={isRecording ? handleStopRecording : handleStartRecording}
                className={cn(isRecording && "bg-red-500 hover:bg-red-600")}
              >
                {isRecording ? (
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    <span className="text-xs">{formatDuration(recordingTime)}</span>
                  </div>
                ) : (
                  <Mic className="h-5 w-5" />
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("flex h-full bg-gray-100 dark:bg-gray-900", className)}>
      {/* Sidebar */}
      <div className={cn(
        "w-80 border-r bg-white dark:bg-gray-800 flex flex-col",
        !sidebarOpen && "hidden"
      )}>
        {/* Header */}
        <div className="p-3 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} />
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
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

        {/* Tabs */}
        <Tabs value={currentTab} onValueChange={(value) => handleTabChange(value as any)}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="chats">Chats</TabsTrigger>
            <TabsTrigger value="calls">Calls</TabsTrigger>
            <TabsTrigger value="status">Status</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
          </TabsList>

          <TabsContent value="chats" className="flex-1">
            <ScrollArea className="h-full">
              {filteredChats.map(renderChatItem)}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="calls" className="flex-1">
            <ScrollArea className="h-full">
              <div className="p-4 text-center text-gray-500">
                <Phone className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p>No recent calls</p>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="status" className="flex-1">
            <ScrollArea className="h-full">
              <div className="p-4 text-center text-gray-500">
                <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p>No status updates</p>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="files" className="flex-1">
            <SecureFileSharing securityLevels={securityLevels as any} currentUser={currentUser} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {renderChatInterface()}
      </div>
    </div>
  )
} 