"use client"

import { useState, useRef, useEffect } from "react"
import { format } from "date-fns"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"
import { useNotifications } from "@/contexts/notification-context"
import {
  X, Search, MessageSquare, Phone, Video, MoreHorizontal, Camera, Plus,
  Send, Mic, Play, CheckCheck, ImageIcon, File, MapPin, Calendar, Settings,
  Bell, Pin, Users, Globe, Languages, Monitor, Share2, Volume2,
  VolumeX, VideoOff, VideoIcon, Download, MessageCircle,
  Hash, Lock, Crown, Star, Shield, Eye, EyeOff, Settings2, UserPlus,
  UserMinus, Ban, AlertCircle, CheckCircle, Clock, Zap, RefreshCw, Filter,
  Sparkles, Droplets, Cloud, Sun, Moon, Sunrise, Sunset, Globe2, Map,
  Navigation, Compass, Home, Building, Store, ShoppingCart, CreditCard,
  DollarSign, Euro, PoundSterling, Bitcoin, Wallet, PiggyBank, Banknote,
  Coins, Receipt, Calculator, Percent, Minus, Divide, Equal, Hash as HashIcon,
  AtSign, ExternalLink, Volume, Circle, Square, CircleDot, Maximize2, Minimize2,
  Brain, Info, Briefcase, User
} from "lucide-react"

// Open-source translation API (LibreTranslate) endpoint
const LIBRE_TRANSLATE_URL = process.env.NEXT_PUBLIC_LIBRE_TRANSLATE_URL || "https://libretranslate.com"

interface WhatsAppMessage {
  id: string
  content: string
  timestamp: Date
  isRead: boolean
  isFromMe: boolean
  type: "text" | "voice" | "image" | "file" | "video" | "location"
  reactions?: Array<{ type: string; count: number }>
  replyTo?: string
  forwarded?: boolean
  attachment?: {
    name: string
    size: number
    type: string
    url: string
  }
  translatedContent?: string
  originalLanguage?: string
  targetLanguage?: string
}

interface WhatsAppChat {
  id: string
  name: string
  avatar: string
  lastMessage: string
  timestamp: Date
  unreadCount: number
  isOnline: boolean
  isTyping: boolean
  isMuted: boolean
  isPinned: boolean
  messages: WhatsAppMessage[]
  isChannel?: boolean
  isGroup?: boolean
  participants?: number
  isPrivate?: boolean
}

interface WhatsAppModalHubProps {
  isOpen: boolean
  onClose: () => void
  className?: string
}

export function WhatsAppModalHub({ isOpen, onClose, className }: WhatsAppModalHubProps) {
  // Add error boundary state
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Error boundary effect
  useEffect(() => {
    console.log('Communication hub mounted')
    
    const handleError = (error: ErrorEvent) => {
      console.error('Communication hub error caught:', error)
      setHasError(true)
      setErrorMessage(error.message)
    }

    window.addEventListener('error', handleError)
    
    return () => {
      console.log('Communication hub unmounting')
      window.removeEventListener('error', handleError)
    }
  }, [])
  // User context
  const { user } = useAuth()
  const { addNotification: addGlobalNotification } = useNotifications()
  
  // Core state
  const [activeTab, setActiveTab] = useState("chats")
  const [activeChat, setActiveChat] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [messageInput, setMessageInput] = useState("")
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false)
  
  // New chat/group creation state
  const [showNewChatMenu, setShowNewChatMenu] = useState(false)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [createType, setCreateType] = useState<"chat" | "group" | "community" | "broadcast">("chat")
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([])
  const [newChatName, setNewChatName] = useState("")
  const [newChatDescription, setNewChatDescription] = useState("")
  
  // Enhanced connectivity state
  const [showConnectivityPanel, setShowConnectivityPanel] = useState(false)
  const [showUserDiscovery, setShowUserDiscovery] = useState(false)
  const [showConnectionRequests, setShowConnectionRequests] = useState(false)
  const [showNetworkStats, setShowNetworkStats] = useState(false)
  const [pendingConnections, setPendingConnections] = useState<string[]>([])
  const [hubConnectedUsers, setHubConnectedUsers] = useState<string[]>([])
  const [hubNetworkStatus, setHubNetworkStatus] = useState<"online" | "offline" | "connecting">("online")
  const [syncStatus, setSyncStatus] = useState<"synced" | "syncing" | "error">("synced")
  
  // Voice recording state
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const recordingIntervalRef = useRef<number | null>(null)
  
  // Voice message playback state
  const [isPlayingVoiceMessage, setIsPlayingVoiceMessage] = useState(false)
  const [currentVoiceMessageDuration, setCurrentVoiceMessageDuration] = useState(0)
  const voiceMessageIntervalRef = useRef<number | null>(null)
  
  // Call state
  const [isInCall, setIsInCall] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [isRecordingCall, setIsRecordingCall] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const callIntervalRef = useRef<number | null>(null)
  
  // Translation state
  const [showTranslation, setShowTranslation] = useState(false)
  const [targetLanguage, setTargetLanguage] = useState("en")
  
  // Enhanced features state
  const [showReactions, setShowReactions] = useState<string | null>(null)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [showFileUpload, setShowFileUpload] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [dragOver, setDragOver] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [securityConfirmOpen, setSecurityConfirmOpen] = useState(false)
  const [filesPendingConfirm, setFilesPendingConfirm] = useState<File[]>([])
  
  // Message reactions
  const [messageReactions, setMessageReactions] = useState<Record<string, Array<{ type: string; count: number; users: string[] }>>>({})
  
  // Enhanced call features
  const [callQuality, setCallQuality] = useState("HD")
  const [networkStatus, setNetworkStatus] = useState("Good")
  const [batteryLevel, setBatteryLevel] = useState(85)
  
  // Notification hub state (using global notifications now)
  const [showNotificationHub, setShowNotificationHub] = useState(false)
  
  // Use global notification system instead of local one
  const addNotification = (type: "success" | "warning" | "error" | "info", message: string) => {
    addGlobalNotification({
      type: type as "success" | "warning" | "error" | "info",
      message,
      title: type.charAt(0).toUpperCase() + type.slice(1)
    })
  }

  // Test notification function
  const testNotification = () => {
    addNotification("info", "This is a test notification from the communication hub!")
  }
  
  // Dynamic sizing state (slightly wider and taller for elegance)
  const [modalSize, setModalSize] = useState({ width: 560, height: 600 })
  const [isResizing, setIsResizing] = useState(false)
  const resizeRef = useRef<HTMLDivElement>(null)
  
  // Calendar and Events
  const [calendarEvents, setCalendarEvents] = useState([
    {
      id: "1",
      title: "Investor Pitch Meeting",
      date: new Date(Date.now() + 1000 * 60 * 60 * 2),
      type: "meeting",
      attendees: ["Sarah Chen", "TechFlow Team"],
      description: "Series A pitch presentation"
    },
    {
      id: "2",
      title: "GrowthLab Accelerator Workshop",
      date: new Date(Date.now() + 1000 * 60 * 60 * 24),
      type: "event",
      attendees: ["All Members"],
      description: "Building scalable business models"
    },
    {
      id: "3",
      title: "Mentor Session - John Smith",
      date: new Date(Date.now() + 1000 * 60 * 60 * 48),
      type: "mentorship",
      attendees: ["You", "John Smith"],
      description: "1:1 strategy session"
    }
  ])
  
  // Video Meeting State
  const [isInVideoMeeting, setIsInVideoMeeting] = useState(false)
  const [meetingParticipants, setMeetingParticipants] = useState<string[]>([])
  const [isRecordingMeeting, setIsRecordingMeeting] = useState(false)
  const [meetingSummary, setMeetingSummary] = useState("")
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false)
  const [localStream, setLocalStream] = useState<MediaStream | null>(null)
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([])
  const localVideoRef = useRef<HTMLVideoElement | null>(null)

  // Group creation state
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false)
  const [newGroupName, setNewGroupName] = useState("")
  const [selectedGroupMemberIds, setSelectedGroupMemberIds] = useState<string[]>([])

  // Device and hub settings state
  const [availableDevices, setAvailableDevices] = useState<MediaDeviceInfo[]>([])
  const [selectedCameraId, setSelectedCameraId] = useState<string | null>(null)
  const [selectedMicrophoneId, setSelectedMicrophoneId] = useState<string | null>(null)
  const [selectedSpeakerId, setSelectedSpeakerId] = useState<string | null>(null)
  const [autoTranslateEnabled, setAutoTranslateEnabled] = useState<boolean>(false)
  const [showTypingIndicatorEnabled, setShowTypingIndicatorEnabled] = useState<boolean>(true)
  const [defaultTab, setDefaultTab] = useState<string>("chats")

  // Load and persist hub settings
  // (moved below fileSecurityLevel declaration)

  // Apply default tab whenever the hub opens
  useEffect(() => {
    if (isOpen && defaultTab) {
      setActiveTab(defaultTab)
    }
  }, [isOpen, defaultTab])

  const refreshMediaDevices = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices()
      setAvailableDevices(devices)
    } catch (e) {
      console.error("Failed to enumerate devices", e)
      addNotification("error", "Could not list media devices")
    }
  }
  
  // Secure File Sharing Protocols
  const [fileSecurityLevel, setFileSecurityLevel] = useState<"standard" | "confidential" | "restricted">("standard")
  const [pendingFileSecurityLevel, setPendingFileSecurityLevel] = useState<"standard" | "confidential" | "restricted">("standard")
  const [fileAccessLog, setFileAccessLog] = useState<Array<{
    fileId: string
    fileName: string
    accessedBy: string
    accessTime: Date
    securityLevel: string
    action: "view" | "download" | "edit" | "upload"
  }>>([])
  
  // Load and persist settings (including default file security) AFTER declarations
  useEffect(() => {
    try {
      const saved = localStorage.getItem("gl_hub_settings")
      if (saved) {
        const parsed = JSON.parse(saved)
        setSelectedCameraId(parsed.selectedCameraId ?? null)
        setSelectedMicrophoneId(parsed.selectedMicrophoneId ?? null)
        setSelectedSpeakerId(parsed.selectedSpeakerId ?? null)
        setAutoTranslateEnabled(!!parsed.autoTranslateEnabled)
        setShowTypingIndicatorEnabled(parsed.showTypingIndicatorEnabled !== false)
        setDefaultTab(parsed.defaultTab || "chats")
        if (parsed.fileSecurityLevel) setFileSecurityLevel(parsed.fileSecurityLevel)
      }
    } catch {}
  }, [])

  useEffect(() => {
    try {
      const payload = {
        selectedCameraId,
        selectedMicrophoneId,
        selectedSpeakerId,
        autoTranslateEnabled,
        showTypingIndicatorEnabled,
        defaultTab,
        fileSecurityLevel
      }
      localStorage.setItem("gl_hub_settings", JSON.stringify(payload))
    } catch (error) {
      console.error('Error saving settings to localStorage:', error)
    }
  }, [selectedCameraId, selectedMicrophoneId, selectedSpeakerId, autoTranslateEnabled, showTypingIndicatorEnabled, defaultTab, fileSecurityLevel])

  // Keep pending security level aligned with default when default changes
  useEffect(() => {
    try {
      setPendingFileSecurityLevel(fileSecurityLevel)
    } catch (error) {
      console.error('Error setting pending file security level:', error)
    }
  }, [fileSecurityLevel])

  // Connected Users for Calls
  const [connectedUsers, setConnectedUsers] = useState([
    { id: "1", name: "Sarah Chen", avatar: "/sarah-chen.png", isOnline: true },
    { id: "2", name: "John Smith", avatar: "/alex-wong.png", isOnline: true },
    { id: "3", name: "TechFlow Team", avatar: "/team-avatar.png", isOnline: true },
    { id: "4", name: "Investor Network", avatar: "/placeholder-logo.png", isOnline: false }
  ])
  
  // Channels for Team Collaboration
  const [channels, setChannels] = useState([
    {
      id: "1",
      name: "TechFlow Development",
      description: "Product development discussions",
      members: 12,
      isPrivate: false,
      messages: []
    },
    {
      id: "2",
      name: "Marketing Strategy",
      description: "Marketing campaigns and strategies",
      members: 8,
      isPrivate: false,
      messages: []
    },
    {
      id: "3",
      name: "Investor Relations",
      description: "Investor communications and updates",
      members: 5,
      isPrivate: true,
      messages: []
    }
  ])
  
  // AI features
  const [aiAssistant, setAiAssistant] = useState(false)
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([])
  const [isGeneratingResponse, setIsGeneratingResponse] = useState(false)
  const [isTranslating, setIsTranslating] = useState(false)
  
  // Enhanced UI state
  const [isTyping, setIsTyping] = useState(false)
  const [typingTimeout, setTypingTimeout] = useState<number | null>(null)
  const [messageStatus, setMessageStatus] = useState<"sending" | "sent" | "delivered" | "read">("sent")
  
  // Team collaboration state
  const [showTeamChannels, setShowTeamChannels] = useState(false)
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null)
  
  const messageInputRef = useRef<HTMLInputElement>(null)

  // Enhanced GrowthLab Platform Data with User & Business Integration
  const [chats, setChats] = useState<WhatsAppChat[]>([
    // Personal communications
    {
      id: "personal-1",
      name: "Sarah Chen",
      avatar: "/sarah-chen.png",
      lastMessage: "Great! Let's schedule the meeting for tomorrow",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      unreadCount: 2,
      isOnline: true,
      isTyping: false,
      isMuted: false,
      isPinned: true,
      isGroup: false,
      messages: [
        {
          id: "1",
          content: "Hi! How's the project going?",
          timestamp: new Date(Date.now() - 1000 * 60 * 10),
          isRead: true,
          isFromMe: false,
          type: "text"
        },
        {
          id: "2",
          content: "It's going well! We're on track for the deadline",
          timestamp: new Date(Date.now() - 1000 * 60 * 8),
          isRead: true,
          isFromMe: true,
          type: "text"
        },
        {
          id: "3",
          content: "Great! Let's schedule the meeting for tomorrow",
          timestamp: new Date(Date.now() - 1000 * 60 * 5),
          isRead: false,
          isFromMe: false,
          type: "text"
        }
      ]
    },
    // Business communications
    {
      id: "business-1",
      name: "GrowthLab",
      avatar: "/placeholder-logo.png",
      lastMessage: "Partnership discussion scheduled",
      timestamp: new Date(Date.now() - 1000 * 60 * 12),
      unreadCount: 1,
      isOnline: false,
      isTyping: false,
      isMuted: false,
      isPinned: true,
      isGroup: false,
      messages: [
        {
          id: "1",
          content: "Hi! We're interested in discussing a potential partnership.",
          timestamp: new Date(Date.now() - 1000 * 60 * 20),
          isRead: true,
          isFromMe: false,
          type: "text"
        },
        {
          id: "2",
          content: "That sounds great! I'd love to learn more about your startup ecosystem.",
          timestamp: new Date(Date.now() - 1000 * 60 * 15),
          isRead: true,
          isFromMe: true,
          type: "text"
        },
        {
          id: "3",
          content: "Partnership discussion scheduled",
          timestamp: new Date(Date.now() - 1000 * 60 * 12),
          isRead: false,
          isFromMe: false,
          type: "text"
        }
      ]
    },
    // Team collaboration
    {
      id: "team-1",
      name: "HealthTech Team",
      avatar: "/team-avatar.png",
      lastMessage: "Pitch deck updated with new metrics",
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      unreadCount: 5,
      isOnline: true,
      isTyping: true,
      isMuted: false,
      isPinned: true,
      isGroup: true,
      participants: 8,
      messages: [
        {
          id: "1",
          content: "Team meeting at 3 PM today",
          timestamp: new Date(Date.now() - 1000 * 60 * 30),
          isRead: true,
          isFromMe: false,
          type: "text"
        },
        {
          id: "2",
          content: "Pitch deck updated with new metrics",
          timestamp: new Date(Date.now() - 1000 * 60 * 15),
          isRead: false,
          isFromMe: false,
          type: "file",
          attachment: {
            name: "HealthTech_Pitch_Deck_v2.pdf",
            size: 2048576,
            type: "application/pdf",
            url: "/files/pitch-deck.pdf"
          }
        }
      ]
    },
    // Investor communications
    {
      id: "investor-1",
      name: "Sequoia Capital",
      avatar: "/investor-avatar.png",
      lastMessage: "Due diligence call scheduled",
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      unreadCount: 1,
      isOnline: false,
      isTyping: false,
      isMuted: false,
      isPinned: false,
      isGroup: false,
      messages: [
        {
          id: "1",
          content: "We're interested in your Series A round",
          timestamp: new Date(Date.now() - 1000 * 60 * 50),
          isRead: true,
          isFromMe: false,
          type: "text"
        },
        {
          id: "2",
          content: "Thank you! We'd love to discuss this further.",
          timestamp: new Date(Date.now() - 1000 * 60 * 48),
          isRead: true,
          isFromMe: true,
          type: "text"
        },
        {
          id: "3",
          content: "Due diligence call scheduled",
          timestamp: new Date(Date.now() - 1000 * 60 * 45),
          isRead: false,
          isFromMe: false,
          type: "text"
        }
      ]
    },
    // Business channels
    {
      id: "channel-1",
      name: "Startup Ecosystem",
      avatar: "/investor-avatar.png",
      lastMessage: "New funding opportunities available",
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      unreadCount: 3,
      isOnline: false,
      isTyping: false,
      isMuted: false,
      isPinned: false,
      isChannel: true,
      participants: 156,
      messages: [
        {
          id: "1",
          content: "Interested in your Series A round",
          timestamp: new Date(Date.now() - 1000 * 60 * 45),
          isRead: false,
          isFromMe: false,
          type: "text"
        }
      ]
    },
    {
      id: "4",
      name: "Mentor Connect",
      avatar: "/mentor-avatar.png",
      lastMessage: "Available for 1:1 session tomorrow",
      timestamp: new Date(Date.now() - 1000 * 60 * 120),
      unreadCount: 0,
      isOnline: true,
      isTyping: false,
      isMuted: true,
      isPinned: false,
      isGroup: false,
      messages: [
        {
          id: "1",
          content: "Available for 1:1 session tomorrow",
          timestamp: new Date(Date.now() - 1000 * 60 * 120),
          isRead: true,
          isFromMe: false,
          type: "text"
        }
      ]
    },
    {
      id: "5",
      name: "GrowthLab Support",
      avatar: "/support-avatar.png",
      lastMessage: "Your account has been upgraded to Pro",
      timestamp: new Date(Date.now() - 1000 * 60 * 180),
      unreadCount: 0,
      isOnline: true,
      isTyping: false,
      isMuted: false,
      isPinned: false,
      isChannel: true,
      participants: 2847,
      messages: [
        {
          id: "1",
          content: "Your account has been upgraded to Pro",
          timestamp: new Date(Date.now() - 1000 * 60 * 180),
          isRead: true,
          isFromMe: false,
          type: "text"
        }
      ]
    }
  ])

  const activeChatData = chats.find(chat => chat.id === activeChat)
  const activeChatMessages = activeChatData?.messages || []

  // Filter chats based on user context and business pages
  const getUserChats = () => {
    if (!user) return chats
    
    // Filter chats based on user's business pages and connections
    return chats.filter(chat => {
      // Personal chats - always show
      if (chat.id.startsWith('personal-')) return true
      
      // Business chats - show if user has business pages
      if (chat.id.startsWith('business-')) return true
      
      // Team chats - show if user is part of the team
      if (chat.id.startsWith('team-')) return true
      
      // Investor chats - show if user has funding discussions
      if (chat.id.startsWith('investor-')) return true
      
      // Channel chats - show if user is subscribed
      if (chat.id.startsWith('channel-')) return true
      
      return true
    })
  }

  const filteredChats = getUserChats()

  // Enhanced mock data for available participants with connectivity info
  const availableParticipants = [
    { 
      id: "1", 
      name: "Sarah Chen", 
      avatar: "/sarah-chen.png", 
      email: "sarah@healthtech.co", 
      isOnline: true,
      lastSeen: new Date(Date.now() - 1000 * 60 * 5),
      status: "Available",
      role: "Founder",
      company: "HealthTech",
      mutualConnections: 12,
      isConnected: true
    },
    { 
      id: "2", 
      name: "Michael Tan", 
      avatar: "/alex-wong.png", 
      email: "michael@techflow.com", 
      isOnline: false,
      lastSeen: new Date(Date.now() - 1000 * 60 * 30),
      status: "In a meeting",
      role: "CTO",
      company: "TechFlow",
      mutualConnections: 8,
      isConnected: true
    },
    { 
      id: "3", 
      name: "Priya Patel", 
      avatar: "/maria-garcia.png", 
      email: "priya@startupxyz.com", 
      isOnline: true,
      lastSeen: new Date(Date.now() - 1000 * 60 * 2),
      status: "Available",
      role: "Product Manager",
      company: "StartupXYZ",
      mutualConnections: 15,
      isConnected: false
    },
    { 
      id: "4", 
      name: "David Kim", 
      avatar: "/david-tan.png", 
      email: "david@innovate.co", 
      isOnline: true,
      lastSeen: new Date(Date.now() - 1000 * 60 * 1),
      status: "Available",
      role: "Investor",
      company: "Innovate Capital",
      mutualConnections: 25,
      isConnected: true
    },
    { 
      id: "5", 
      name: "Lisa Wong", 
      avatar: "/sarah-lim.png", 
      email: "lisa@growthlab.sg", 
      isOnline: false,
      lastSeen: new Date(Date.now() - 1000 * 60 * 120),
      status: "Away",
      role: "Community Manager",
      company: "GrowthLab",
      mutualConnections: 45,
      isConnected: true
    },
    { 
      id: "6", 
      name: "Alex Rodriguez", 
      avatar: "/alex-wong.png", 
      email: "alex@venture.com", 
      isOnline: true,
      lastSeen: new Date(Date.now() - 1000 * 60 * 1),
      status: "Available",
      role: "Venture Partner",
      company: "Venture Capital",
      mutualConnections: 18,
      isConnected: false
    },
    { 
      id: "7", 
      name: "Emma Thompson", 
      avatar: "/maria-garcia.png", 
      email: "emma@scaleup.io", 
      isOnline: true,
      lastSeen: new Date(Date.now() - 1000 * 60 * 1),
      status: "Available",
      role: "CEO",
      company: "ScaleUp",
      mutualConnections: 22,
      isConnected: true
    },
    { 
      id: "8", 
      name: "James Wilson", 
      avatar: "/david-tan.png", 
      email: "james@accelerate.co", 
      isOnline: false,
      lastSeen: new Date(Date.now() - 1000 * 60 * 60),
      status: "Busy",
      role: "Mentor",
      company: "Accelerate",
      mutualConnections: 35,
      isConnected: false
    }
  ]

  // Enhanced connectivity functions
  const handleConnectUser = (userId: string) => {
    if (!hubConnectedUsers.includes(userId)) {
      setHubConnectedUsers(prev => [...prev, userId])
      addNotification("success", "Connection request sent successfully")
    }
  }

  const handleDisconnectUser = (userId: string) => {
    setHubConnectedUsers(prev => prev.filter(id => id !== userId))
    addNotification("info", "User disconnected")
  }

  const handleAcceptConnection = (userId: string) => {
    setPendingConnections(prev => prev.filter(id => id !== userId))
    setHubConnectedUsers(prev => [...prev, userId])
    addNotification("success", "Connection accepted")
  }

  const handleRejectConnection = (userId: string) => {
    setPendingConnections(prev => prev.filter(id => id !== userId))
    addNotification("info", "Connection request rejected")
  }

  const syncAllConnections = async () => {
    setSyncStatus("syncing")
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSyncStatus("synced")
      addNotification("success", "All connections synchronized")
    } catch (error) {
      setSyncStatus("error")
      addNotification("error", "Sync failed. Please try again.")
    }
  }

  const discoverNewUsers = async () => {
    setShowUserDiscovery(true)
    addNotification("info", "Discovering new users...")
  }

  const getNetworkStats = () => {
    return {
      totalUsers: availableParticipants.length,
      connectedUsers: hubConnectedUsers.length,
      pendingConnections: pendingConnections.length,
      onlineUsers: availableParticipants.filter(p => p.isOnline).length,
      networkHealth: hubNetworkStatus === "online" ? "Excellent" : "Poor"
    }
  }

  // Functions for new chat/group creation
  const handleCreateNew = (type: "chat" | "group" | "community" | "broadcast") => {
    setCreateType(type)
    setShowCreateDialog(true)
    setShowNewChatMenu(false)
    setSelectedParticipants([])
    setNewChatName("")
    setNewChatDescription("")
  }

  const handleParticipantToggle = (participantId: string) => {
    setSelectedParticipants(prev => 
      prev.includes(participantId) 
        ? prev.filter(id => id !== participantId)
        : [...prev, participantId]
    )
  }

  const createNewChat = () => {
    if (!newChatName.trim()) {
      addNotification("error", "Please enter a name for the chat")
      return
    }

    if (createType === "chat" && selectedParticipants.length === 0) {
      addNotification("error", "Please select at least one participant")
      return
    }

    if (createType === "group" && selectedParticipants.length < 2) {
      addNotification("error", "Please select at least 2 participants for a group")
      return
    }

    const newChat: WhatsAppChat = {
      id: `new-${Date.now()}`,
      name: newChatName,
      avatar: createType === "group" ? "/team-avatar.png" : 
              createType === "community" ? "/community-avatar.png" : 
              createType === "broadcast" ? "/broadcast-avatar.png" : "/sarah-chen.png",
      lastMessage: "",
      timestamp: new Date(),
      unreadCount: 0,
      isOnline: false,
      isTyping: false,
      isMuted: false,
      isPinned: false,
      isGroup: createType === "group",
      isChannel: createType === "community",
      participants: selectedParticipants.length,
      messages: []
    }

    setChats(prev => [newChat, ...prev])
    setActiveChat(newChat.id)
    setShowCreateDialog(false)
    setSelectedParticipants([])
    setNewChatName("")
    setNewChatDescription("")

         addNotification("success", `${createType.charAt(0).toUpperCase() + createType.slice(1)} "${newChatName}" created successfully`)
   }

  // Voice recording functions
  const startRecording = () => {
    console.log("Starting voice recording")
    setIsRecording(true)
    setRecordingTime(0)
    recordingIntervalRef.current = window.setInterval(() => {
      setRecordingTime(prev => prev + 1)
    }, 1000)
  }

  const stopRecording = () => {
    console.log("Stopping voice recording")
    setIsRecording(false)
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current)
    }
    setRecordingTime(0)
  }

  const playVoiceMessage = (duration: number) => {
    console.log("Playing voice message")
    setIsPlayingVoiceMessage(true)
    setCurrentVoiceMessageDuration(0)
    voiceMessageIntervalRef.current = window.setInterval(() => {
      setCurrentVoiceMessageDuration(prev => {
        if (prev >= duration) {
          setIsPlayingVoiceMessage(false)
          if (voiceMessageIntervalRef.current) {
            clearInterval(voiceMessageIntervalRef.current)
          }
          return 0
        }
        return prev + 1
      })
    }, 1000)
  }

  const pauseVoiceMessage = () => {
    setIsPlayingVoiceMessage(false)
    if (voiceMessageIntervalRef.current) {
      clearInterval(voiceMessageIntervalRef.current)
    }
  }

  // Enhanced call functions for investors and mentors
  const startCall = async (type: "audio" | "video") => {
    console.log(`Starting ${type} call`)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: type === "video"
      })
      setLocalStream(stream)
    } catch (err) {
      console.error("Call media permission error:", err)
      addNotification("error", "Please allow microphone/camera to start the call.")
      return
    }

    setIsInCall(true)
    setIsVideoOff(type === "audio")
    setCallDuration(0)
    
    // Enhanced call quality based on chat type
    const chatData = activeChatData
    if (chatData?.isChannel && chatData.name.includes("Investor")) {
      setCallQuality("HD+")
      setNetworkStatus("Excellent")
    } else if (chatData?.name.includes("Mentor")) {
      setCallQuality("HD")
      setNetworkStatus("Good")
    } else {
      setCallQuality("HD")
      setNetworkStatus("Good")
    }
    
    callIntervalRef.current = window.setInterval(() => {
      setCallDuration(prev => prev + 1)
    }, 1000)
  }

  const endCall = () => {
    console.log("Ending call")
    setIsInCall(false)
    setIsMuted(false)
    setIsVideoOff(false)
    setIsScreenSharing(false)
    setIsRecordingCall(false)
    if (callIntervalRef.current) {
      clearInterval(callIntervalRef.current)
    }
    setCallDuration(0)
    // Stop local media when ending a call
    localStream?.getTracks().forEach(t => t.stop())
    setLocalStream(null)
  }

  const toggleMute = () => {
    console.log("Toggling mute")
    setIsMuted(!isMuted)
  }

  const toggleVideo = () => {
    console.log("Toggling video")
    setIsVideoOff(!isVideoOff)
  }



  const toggleCallRecording = () => {
    console.log("Toggling call recording")
    setIsRecordingCall(!isRecordingCall)
  }



  // Enhanced message functions with user and business integration
  const sendMessage = () => {
    console.log("Sending message")
    if (messageInput.trim() && activeChat) {
      setMessageStatus("sending")
      
      const newMessage: WhatsAppMessage = {
        id: Date.now().toString(),
        content: messageInput,
        timestamp: new Date(),
        isRead: false,
        isFromMe: true,
        type: "text"
      }
      
      // Update chat with new message
      const updatedChats = chats.map(chat => 
        chat.id === activeChat 
          ? { ...chat, messages: [...chat.messages, newMessage] }
          : chat
      )
      
      setChats(updatedChats)
      setMessageInput("")
      
      // Simulate message delivery status
      setTimeout(() => setMessageStatus("sent"), 500)
      setTimeout(() => setMessageStatus("delivered"), 1500)
      setTimeout(() => setMessageStatus("read"), 3000)
      
      // Business page integration - link messages to user's business pages
      if (user && activeChat.startsWith('business-')) {
        console.log(`Business communication from ${user.email} to ${activeChatData?.name}`)
        addNotification("info", `Message sent to business: ${activeChatData?.name}`)
      }
      
      // Team collaboration integration
      if (activeChat.startsWith('team-')) {
        console.log(`Team collaboration message in ${activeChatData?.name}`)
        addNotification("info", `Team message sent to: ${activeChatData?.name}`)
      }
      
      // Investor communication tracking
      if (activeChat.startsWith('investor-')) {
        console.log(`Investor communication: ${activeChatData?.name}`)
        addNotification("info", `Investor message sent to: ${activeChatData?.name}`)
      }
      
      if (messageInputRef.current) {
        messageInputRef.current.focus()
      }
    }
  }

  // Enhanced secure file upload functionality with protocols
  const actuallySendFiles = (filesArr: File[]) => {
    try {
      if (!activeChat) {
        addNotification("warning", "Select a chat to send files")
        return
      }
      if (!filesArr || !filesArr.length) {
        addNotification("warning", "No files selected")
        return
      }
      
      let successCount = 0
      let errorCount = 0
      
      filesArr.forEach((file, index) => {
        try {
          // File size validation (50MB limit)
          if (file.size > 50 * 1024 * 1024) {
            addNotification("error", `${file.name} is too large. Maximum size is 50MB.`)
            errorCount++
            return
          }
          
          // File type validation for security
          const allowedTypes = [
            'image/jpeg', 'image/png', 'image/gif', 'image/webp',
            'video/mp4', 'video/avi', 'video/mov',
            'application/pdf', 'application/msword', 
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'text/plain', 'application/zip', 'application/x-zip-compressed'
          ]
          
          if (!allowedTypes.includes(file.type)) {
            addNotification("error", `${file.name} is not a supported file type.`)
            errorCount++
            return
          }
          
          // Generate secure file ID
          const fileId = `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
          const levelToUse = pendingFileSecurityLevel || fileSecurityLevel
          const encryptedFileName = `${levelToUse}_${Date.now()}_${file.name}`
          
          // Log file access for tracking
          const accessLog = {
            fileId,
            fileName: file.name,
            accessedBy: "You",
            accessTime: new Date(),
            securityLevel: levelToUse,
            action: "upload" as const
          }
          
          setFileAccessLog(prev => [...prev, accessLog])
          
          const newMessage: WhatsAppMessage = {
            id: (Date.now() + index).toString(),
            content: `Sent ${file.name} (${levelToUse.toUpperCase()})`,
            timestamp: new Date(),
            isRead: false,
            isFromMe: true,
            type: "file",
            attachment: {
              name: file.name,
              size: file.size,
              type: file.type,
              url: URL.createObjectURL(file)
            }
          }

          setChats(prevChats => 
            prevChats.map(chat => 
              chat.id === activeChat 
                ? {
                    ...chat,
                    messages: [...chat.messages, newMessage],
                    lastMessage: `Sent ${file.name} (${levelToUse.toUpperCase()})`,
                    timestamp: new Date(),
                    unreadCount: 0
                  }
                : chat
            )
          )
          successCount++
        } catch (err) {
          console.error(`Failed to process file ${file.name}:`, err)
          addNotification("error", `Could not process ${file.name}`)
          errorCount++
        }
      })
      
      // Final success/error notification
      if (successCount > 0) {
        addNotification("success", `Successfully sent ${successCount} file(s) with ${pendingFileSecurityLevel} security`)
      }
      if (errorCount > 0) {
        addNotification("warning", `${errorCount} file(s) could not be sent`)
      }
      
      setSelectedFiles([])
      setShowFileUpload(false)
      setSecurityConfirmOpen(false)
      setFilesPendingConfirm([])
    } catch (error) {
      console.error('Critical error in actuallySendFiles:', error)
      addNotification('error', 'Failed to send files. Please try again.')
      setSelectedFiles([])
      setShowFileUpload(false)
      setSecurityConfirmOpen(false)
      setFilesPendingConfirm([])
    }
  }

  const handleFileUpload = (files: FileList | null) => {
    console.log('=== FILE UPLOAD START ===')
    console.log('Files received:', files?.length || 0)
    console.log('Active chat:', activeChat || 'none')
    
    try {
      if (!files) {
        console.log('No files provided to handleFileUpload')
        return
      }
      
      if (!activeChat) {
        console.log('No active chat selected')
        addNotification("warning", "Please select a chat first")
        return
      }
      
      const arr = Array.from(files)
      console.log(`Processing ${arr.length} files:`, arr.map(f => ({ name: f.name, size: f.size, type: f.type })))
      
      // Validate files before showing security dialog
      const validFiles: File[] = []
      const errors: string[] = []
      
      arr.forEach((file, index) => {
        try {
          console.log(`Validating file ${index + 1}:`, file.name)
          
          // File size validation (50MB limit)
          if (file.size > 50 * 1024 * 1024) {
            const error = `${file.name} is too large. Maximum size is 50MB.`
            console.log('File size error:', error)
            errors.push(error)
            return
          }
          
          // File type validation for security
          const allowedTypes = [
            'image/jpeg', 'image/png', 'image/gif', 'image/webp',
            'video/mp4', 'video/avi', 'video/mov',
            'application/pdf', 'application/msword', 
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'text/plain', 'application/zip', 'application/x-zip-compressed'
          ]
          
          if (!allowedTypes.includes(file.type)) {
            const error = `${file.name} is not a supported file type.`
            console.log('File type error:', error)
            errors.push(error)
            return
          }
          
          validFiles.push(file)
          console.log(`File ${file.name} validated successfully`)
        } catch (fileError) {
          console.error(`Error validating file ${file.name}:`, fileError)
          errors.push(`Could not validate ${file.name}`)
        }
      })
      
      console.log(`Validation complete. Valid files: ${validFiles.length}, Errors: ${errors.length}`)
      
      // Show errors if any
      errors.forEach(error => {
        console.log('Showing error notification:', error)
        addNotification("error", error)
      })
      
      if (validFiles.length === 0) {
        console.log('No valid files after validation')
        addNotification("warning", "No valid files selected.")
        return
      }
      
      console.log(`Setting up ${validFiles.length} valid files for upload`)
      
      // Set state in a safe way
      try {
        setSelectedFiles(validFiles)
        console.log('Selected files set successfully')
      } catch (stateError) {
        console.error('Error setting selected files:', stateError)
      }
      
      try {
        setFilesPendingConfirm(validFiles)
        console.log('Files pending confirm set successfully')
      } catch (stateError) {
        console.error('Error setting files pending confirm:', stateError)
      }
      
      try {
        setSecurityConfirmOpen(true)
        console.log('Security confirm dialog opened successfully')
      } catch (stateError) {
        console.error('Error opening security confirm dialog:', stateError)
      }
      
      try {
        setShowAttachmentMenu(false)
        console.log('Attachment menu closed successfully')
      } catch (stateError) {
        console.error('Error closing attachment menu:', stateError)
      }
      
      addNotification("info", `${validFiles.length} file(s) selected. Choose security level.`)
      console.log('=== FILE UPLOAD SUCCESS ===')
      
    } catch (error) {
      console.error('=== FILE UPLOAD CRITICAL ERROR ===', error)
      addNotification('error', 'Failed to process files. Please try again.')
      
      // Reset states to prevent UI issues
      try {
        setSelectedFiles([])
        setFilesPendingConfirm([])
        setSecurityConfirmOpen(false)
        setShowAttachmentMenu(false)
        console.log('States reset after error')
      } catch (resetError) {
        console.error('Error resetting states:', resetError)
      }
    }
  }

  // Track file access
  const trackFileAccess = (fileId: string, fileName: string, action: "view" | "download" | "edit") => {
    const accessLog = {
      fileId,
      fileName,
      accessedBy: "You",
      accessTime: new Date(),
      securityLevel: fileSecurityLevel,
      action
    }
    
    setFileAccessLog(prev => [...prev, accessLog])
    
    // For confidential and restricted files, show access notification
    if (fileSecurityLevel === "confidential" || fileSecurityLevel === "restricted") {
      console.log(`File access tracked: ${fileName} - ${action} by You at ${new Date().toISOString()}`)
    }
  }

  // Secure file download
  const downloadFile = (fileUrl: string, fileName: string) => {
    const link = document.createElement('a')
    link.href = fileUrl
    link.download = fileName
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Message reactions
  const addReaction = (messageId: string, reactionType: string) => {
    setMessageReactions(prev => {
      const existing = prev[messageId] || []
      const reactionIndex = existing.findIndex(r => r.type === reactionType)
      
      if (reactionIndex >= 0) {
        const updated = [...existing]
        updated[reactionIndex] = {
          ...updated[reactionIndex],
          count: (updated[reactionIndex] ? updated[reactionIndex].count : undefined) + 1,
          users: [...(updated[reactionIndex] ? updated[reactionIndex].users : undefined), "You"]
        }
        return { ...prev, [messageId]: updated }
      } else {
        return { 
          ...prev, 
          [messageId]: [...existing, { type: reactionType, count: 1, users: ["You"] }]
        }
      }
    })
  }

  // Enhanced Google Translate integration
  const translateMessage = async (messageId: string, targetLang: string = "en") => {
    setIsTranslating(true)
    
    try {
      // Find the message to translate
      const message = activeChatData?.messages.find(m => m.id === messageId)
      if (!message) return
      
      // Prefer open-source LibreTranslate; fallback to simulated translation
      const translatedText = await translateTextViaLibreTranslate(message.content, targetLang).catch(async () => {
        return simulateGoogleTranslate(message.content, targetLang)
      })
      
      // Update the message with translation
      setChats(prevChats => 
        prevChats.map(chat => 
          chat.id === activeChat 
            ? {
                ...chat,
                messages: chat.messages.map(msg => 
                  msg.id === messageId 
                    ? { ...msg, translatedContent: translatedText, targetLanguage: targetLang }
                    : msg
                )
              }
            : chat
        )
      )
    } catch (error) {
      console.error("Translation failed:", error)
    } finally {
      setIsTranslating(false)
    }
  }

  // Open-source translation via LibreTranslate
  const translateTextViaLibreTranslate = async (text: string, targetLang: string): Promise<string> => {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)
    try {
      const res = await fetch(`${LIBRE_TRANSLATE_URL}/translate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q: text, source: "auto", target: targetLang, format: "text" }),
        signal: controller.signal,
      })
      if (!res.ok) {
        throw new Error(`LibreTranslate error: ${res.status}`)
      }
      const data = await res.json() as { translatedText?: string }
      if (!data.translatedText) throw new Error("No translatedText returned")
      return data.translatedText
    } finally {
      clearTimeout(timeout)
    }
  }

  // Simulate Google Translate API
  const simulateGoogleTranslate = async (text: string, targetLang: string): Promise<string> => {
    // In a real implementation, you would use the Google Translate API
    // For now, we'll simulate translations
    const translations: Record<string, Record<string, string>> = {
      "Hello, how are you?": {
        "es": "Hola, ¿cómo estás?",
        "fr": "Bonjour, comment allez-vous?",
        "de": "Hallo, wie geht es dir?",
        "it": "Ciao, come stai?",
        "pt": "Olá, como você está?",
        "ja": "こんにちは、お元気ですか？",
        "ko": "안녕하세요, 어떻게 지내세요?",
        "zh": "你好，你好吗？",
        "ar": "مرحبا، كيف حالك؟",
        "hi": "नमस्ते, आप कैसे हैं?"
      },
      "Great! Let's schedule the meeting for tomorrow": {
        "es": "¡Excelente! Programemos la reunión para mañana",
        "fr": "Parfait ! Programmons la réunion pour demain",
        "de": "Großartig! Lassen Sie uns das Meeting für morgen planen",
        "it": "Perfetto! Programmiamo la riunione per domani",
        "pt": "Ótimo! Vamos agendar a reunião para amanhã",
        "ja": "素晴らしい！明日会議をスケジュールしましょう",
        "ko": "훌륭합니다! 내일 회의를 일정에 잡아보겠습니다",
        "zh": "太好了！让我们安排明天的会议",
        "ar": "ممتاز! دعنا نجدول الاجتماع غداً",
        "hi": "बहुत अच्छा! आइए कल के लिए मीटिंग शेड्यूल करें"
      }
    }
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Return translation if available, otherwise return original text
    return translations[text]?.[targetLang] || `[Translated to ${targetLang}: ${text}]`
  }

  // AI assistant response generation with real context
  const generateAIResponse = async (message: string) => {
    setIsGeneratingResponse(true)
    
    try {
      // Analyze message context and generate appropriate response
      const context = activeChatData?.messages.slice(-3).map(m => m.content).join(" ") || ""
      const response = await generateContextualResponse(message, context)
      
      const aiMessage: WhatsAppMessage = {
        id: Date.now().toString(),
        content: response,
        timestamp: new Date(),
        isRead: false,
        isFromMe: false,
        type: "text"
      }

      setChats(prevChats => 
        prevChats.map(chat => 
          chat.id === activeChat 
            ? {
                ...chat,
                messages: [...chat.messages, aiMessage],
                lastMessage: response,
                timestamp: new Date()
              }
            : chat
        )
      )
    } catch (error) {
      console.error("AI response generation failed:", error)
    } finally {
      setIsGeneratingResponse(false)
    }
  }

  // Typing indicator for other party (simulated)
  useEffect(() => {
    if (!activeChat) return
    // simulate other party typing shortly after you type
    if (isTyping) {
      const id = setTimeout(() => {
        setChats(prev => prev.map(c => c.id === activeChat ? { ...c, isTyping: true } : c))
        setTimeout(() => setChats(prev => prev.map(c => c.id === activeChat ? { ...c, isTyping: false } : c)), 1500)
      }, 600)
      return () => clearTimeout(id)
    }
  }, [isTyping, activeChat])

  // Generate contextual AI responses
  const generateContextualResponse = async (message: string, context: string): Promise<string> => {
    // Simulate AI analysis and response generation
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const messageLower = message.toLowerCase()
    const contextLower = context.toLowerCase()
    
    if (messageLower.includes("meeting") || messageLower.includes("schedule")) {
      return "I can help you schedule that meeting. What time works best for everyone?"
    } else if (messageLower.includes("project") || messageLower.includes("deadline")) {
      return "Great progress! Let me know if you need any resources or support to meet the deadline."
    } else if (messageLower.includes("funding") || messageLower.includes("investment")) {
      return "That's exciting! I can connect you with our investor network. Would you like to prepare a pitch deck?"
    } else if (messageLower.includes("mentor") || messageLower.includes("advice")) {
      return "I'd be happy to connect you with a mentor in that field. What specific area are you looking for guidance on?"
    } else if (messageLower.includes("startup") || messageLower.includes("business")) {
      return "That sounds like a promising opportunity! Have you considered our accelerator program?"
    } else {
      const responses = [
        "That's a great point! Here's what I think...",
        "Based on the context, I'd suggest...",
        "Interesting perspective. Consider this approach...",
        "Let me help you with that. Here's my recommendation...",
        "That's an excellent question. Here's my take on it...",
        "I appreciate you sharing that. Here's what I recommend...",
        "That's a valid concern. Let me suggest a solution...",
        "Great observation! Here's how we can approach this..."
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    }
  }

  // Video Meeting Functions
  const requestMeetingMedia = async (): Promise<MediaStream | null> => {
    try {
      const constraints: MediaStreamConstraints = {
        video: selectedCameraId ? { deviceId: { exact: selectedCameraId } } : true,
        audio: selectedMicrophoneId ? { deviceId: { exact: selectedMicrophoneId } } : true
      }
      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      setLocalStream(stream)
      return stream
    } catch (err) {
      console.error("Media permission denied or failed:", err)
      addNotification("error", "Please allow camera and microphone permissions to start a meeting.")
      return null
    }
  }

  const startVideoMeeting = async (participants: string[]) => {
    const stream = await requestMeetingMedia()
    if (!stream) return
    setIsInVideoMeeting(true)
    setMeetingParticipants(participants)
    addNotification("success", `Video meeting started with ${participants.join(", ")}`)
    console.log("Starting video meeting with:", participants)
  }

  const endVideoMeeting = () => {
    setIsInVideoMeeting(false)
    setMeetingParticipants([])
    if (isRecordingMeeting) {
      mediaRecorderRef.current?.stop()
    }
    screenStream?.getTracks().forEach(t => t.stop())
    localStream?.getTracks().forEach(t => t.stop())
    setScreenStream(null)
    setLocalStream(null)
    setIsScreenSharing(false)
    setIsRecordingMeeting(false)
    addNotification("info", "Video meeting ended")
    console.log("Ending video meeting")
  }

  const toggleScreenSharing = async () => {
    if (!isInVideoMeeting) return
    if (!isScreenSharing) {
      try {
        // @ts-ignore - getDisplayMedia is available on modern browsers
        const displayStream: MediaStream = await (navigator.mediaDevices as any).getDisplayMedia({ video: true })
        setScreenStream(displayStream)
        setIsScreenSharing(true)
        addNotification("info", "Screen sharing started")
      } catch (err) {
        console.error("Screen share failed:", err)
        addNotification("warning", "Screen sharing was cancelled or failed")
      }
    } else {
      screenStream?.getTracks().forEach(t => t.stop())
      setScreenStream(null)
      setIsScreenSharing(false)
      addNotification("info", "Screen sharing stopped")
    }
  }

  const toggleMeetingRecording = () => {
    if (!isInVideoMeeting) return
    if (!isRecordingMeeting) {
      if (!localStream) {
        addNotification("error", "No media stream available to record")
        return
      }
      try {
        const recorder = new MediaRecorder(localStream)
        mediaRecorderRef.current = recorder
        setRecordedChunks([])
        recorder.ondataavailable = (e: BlobEvent) => {
          if (e.data && e.data.size > 0) setRecordedChunks(prev => [...prev, e.data])
        }
        recorder.onstop = () => {
          const blob = new Blob(recordedChunks, { type: "video/webm" })
          const url = URL.createObjectURL(blob)
          const a = document.createElement("a")
          a.href = url
          a.download = `meeting-recording-${Date.now()}.webm`
          a.click()
          URL.revokeObjectURL(url)
        }
        recorder.start()
        setIsRecordingMeeting(true)
        addNotification("warning", "Meeting recording started")
      } catch (err) {
        console.error("Recording failed:", err)
        addNotification("error", "Recording failed to start")
      }
    } else {
      mediaRecorderRef.current?.stop()
      setIsRecordingMeeting(false)
      addNotification("info", "Meeting recording stopped")
    }
  }

  // Attach local stream to preview video
  useEffect(() => {
    if (localVideoRef.current && localStream) {
      try {
        // @ts-ignore - assignable in browsers
        localVideoRef.current.srcObject = localStream
        localVideoRef.current.play().catch(() => {})
      } catch {}
    }
  }, [localStream])

  // Auto-translate incoming messages when enabled (demo: translate any non-me messages without translatedContent)
  useEffect(() => {
    if (!autoTranslateEnabled) return
    const pending = activeChatData?.messages.filter(m => !m.isFromMe && !m.translatedContent)
    if (!pending || pending.length === 0) return
    // translate the most recent pending message to targetLanguage
    const last = pending[pending.length - 1]
    translateMessage(last.id, targetLanguage)
  }, [autoTranslateEnabled, activeChat, activeChatData?.messages, targetLanguage])



  // AI Meeting Summary Generation
  const generateMeetingSummary = async () => {
    setIsGeneratingSummary(true)
    addNotification("info", "Generating AI meeting summary...")
    
    try {
      // Simulate AI meeting summary generation
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      const summary = `Meeting Summary - ${new Date().toLocaleDateString()}
      
Key Points Discussed:
• Product roadmap and timeline updates
• Marketing strategy for Q2 2024
• Investor pitch preparation
• Team collaboration improvements

Action Items:
• Schedule follow-up meeting with investors
• Update pitch deck with new metrics
• Implement feedback from mentor session

Next Steps:
• Review and approve marketing budget
• Prepare for Series A funding round
• Schedule team retrospective meeting

Participants: ${meetingParticipants.join(", ")}
Duration: ${formatCallDuration(callDuration)}
Recording: ${isRecordingMeeting ? "Yes" : "No"}`

      setMeetingSummary(summary)
      addNotification("success", "AI meeting summary generated successfully!")
    } catch (error) {
      console.error("Meeting summary generation failed:", error)
      addNotification("error", "Failed to generate meeting summary")
    } finally {
      setIsGeneratingSummary(false)
    }
  }

  const handleTyping = () => {
    setIsTyping(true)
    if (typingTimeout) {
      clearTimeout(typingTimeout)
    }
    const newTimeout = setTimeout(() => setIsTyping(false), 2000)
    setTypingTimeout(newTimeout)
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    
    if (diffInHours < 24) {
      return format(date, "HH:mm")
    } else if (diffInHours < 48) {
      return "yesterday"
    }
    return format(date, "dd/MM")
  }

  const formatCallDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Handle key press for sending message
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (selectedFiles.length > 0) {
        setFilesPendingConfirm(selectedFiles)
        setSecurityConfirmOpen(true)
        return
      }
      sendMessage()
    }
  }

  // Resize functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing || !resizeRef.current) return
    
    const rect = resizeRef.current.getBoundingClientRect()
    const newWidth = Math.max(420, Math.min(1000, e.clientX - rect.left))
    const newHeight = Math.max(400, Math.min(900, e.clientY - rect.top))
    
    setModalSize({ width: newWidth, height: newHeight })
  }

  const handleMouseUp = () => {
    setIsResizing(false)
  }

  // Add resize event listeners
  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizing])

  // Cleanup intervals on unmount
  useEffect(() => {
    return () => {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current)
      }
      if (voiceMessageIntervalRef.current) {
        clearInterval(voiceMessageIntervalRef.current)
      }
      if (callIntervalRef.current) {
        clearInterval(callIntervalRef.current)
      }
    }
  }, [])

  if (!isOpen) return null

  // Error recovery
  if (hasError) {
    return (
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 max-w-md mx-4">
          <h3 className="text-lg font-semibold text-red-600 mb-2">Communication Hub Error</h3>
          <p className="text-gray-600 mb-4">
            An error occurred in the communication hub. Please refresh the page to continue.
          </p>
          <div className="flex gap-2">
            <Button 
              onClick={() => {
                setHasError(false)
                setErrorMessage(null)
                // Reset all critical states
                setSecurityConfirmOpen(false)
                setFilesPendingConfirm([])
                setSelectedFiles([])
                setPendingFileSecurityLevel("standard")
              }}
              className="bg-[#00A884] hover:bg-[#00A884]/90"
            >
              Try Again
            </Button>
            <Button 
              variant="outline"
              onClick={() => {
                window.location.reload()
              }}
            >
              Refresh Page
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Prevent closing the main hub when dialogs are open
  const handleMainHubClick = (e: React.MouseEvent) => {
    console.log('Main hub clicked, dialogs open:', { showUserDiscovery, showCreateDialog, securityConfirmOpen })
    if (showUserDiscovery || showCreateDialog || securityConfirmOpen) {
      e.stopPropagation()
      return
    }
    e.stopPropagation()
  }

  return (
    <div 
      className={cn("fixed inset-0 z-50 bg-black/50 backdrop-blur-sm", className)} 
      data-modal="whatsapp-hub"
      onClick={handleMainHubClick}
      onPointerDown={(e) => e.stopPropagation()}
      onError={(e) => {
        console.error('Communication hub error:', e)
        setHasError(true)
        setErrorMessage('An error occurred in the communication hub')
      }}
    >
            {/* Confirm file security modal */}
      <Dialog 
        open={securityConfirmOpen} 
        onOpenChange={(open) => {
          try {
            if (!open) {
              setSecurityConfirmOpen(false)
              setFilesPendingConfirm([])
              setSelectedFiles([])
            }
          } catch (error) {
            console.error('Error in dialog onOpenChange:', error)
            setSecurityConfirmOpen(false)
            setFilesPendingConfirm([])
            setSelectedFiles([])
          }
        }}
      >
        <DialogContent 
          className="sm:max-w-md z-[60]"
          onPointerDownOutside={(e) => {
            e.preventDefault()
            e.stopPropagation()
            try {
              setSecurityConfirmOpen(false)
              setFilesPendingConfirm([])
              setSelectedFiles([])
            } catch (error) {
              console.error('Error in dialog pointer down outside:', error)
              setSecurityConfirmOpen(false)
            }
          }}
          onEscapeKeyDown={(e) => {
            e.preventDefault()
            e.stopPropagation()
            try {
              setSecurityConfirmOpen(false)
              setFilesPendingConfirm([])
              setSelectedFiles([])
            } catch (error) {
              console.error('Error in dialog escape key:', error)
              setSecurityConfirmOpen(false)
            }
          }}
        >
          <DialogHeader>
            <DialogTitle>Choose file security</DialogTitle>
            <DialogDescription>
              Select a security level for {filesPendingConfirm.length} file{filesPendingConfirm.length === 1 ? '' : 's'} before sending.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-wrap gap-2">
            {(["standard","confidential","restricted"] as const).map((lvl) => (
              <Button
                key={lvl}
                variant={pendingFileSecurityLevel === lvl ? "default" : "outline"}
                size="sm"
                className={`rounded-full h-8 px-3 ${pendingFileSecurityLevel === lvl ? "bg-[#00A884] text-white" : ""}`}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  console.log(`Security button clicked: ${lvl}`)
                  try {
                    // Validate the security level before setting
                    if (lvl === "standard" || lvl === "confidential" || lvl === "restricted") {
                      console.log(`Setting security level to: ${lvl}`)
                      setPendingFileSecurityLevel(lvl)
                      console.log(`Security level set to: ${lvl}`)
                      // Add a small delay to ensure state is updated
                      setTimeout(() => {
                        console.log(`Current pending security level: ${pendingFileSecurityLevel}`)
                      }, 100)
                    } else {
                      console.error('Invalid security level:', lvl)
                      addNotification('error', 'Invalid security level selected.')
                    }
                  } catch (error) {
                    console.error('Error setting security level:', error)
                    addNotification('error', 'Failed to set security level. Please try again.')
                    // Force reset on error
                    setPendingFileSecurityLevel("standard")
                  }
                }}
              >
                {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
              </Button>
            ))}
          </div>
          <div className="mt-4 border-t pt-3">
            <div className="text-xs text-gray-600 mb-2">Files to send ({filesPendingConfirm.length})</div>
            <div className="max-h-40 overflow-auto space-y-2">
              {(filesPendingConfirm.length ? filesPendingConfirm : selectedFiles).map((f, idx) => (
                <div key={idx} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    {f.type.startsWith('image/') ? (
                      <ImageIcon className="h-5 w-5 text-blue-500" />
                    ) : f.type.startsWith('video/') ? (
                      <VideoIcon className="h-5 w-5 text-red-500" />
                    ) : f.type.includes('pdf') ? (
                      <File className="h-5 w-5 text-red-600" />
                    ) : f.type.includes('word') || f.type.includes('document') ? (
                      <File className="h-5 w-5 text-blue-600" />
                    ) : f.type.includes('excel') || f.type.includes('spreadsheet') ? (
                      <File className="h-5 w-5 text-green-600" />
                    ) : (
                      <File className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-800 truncate">{f.name}</div>
                    <div className="text-xs text-gray-500">
                      {(f.size / 1024 / 1024).toFixed(1)} MB • {f.type.split('/')[1]?.toUpperCase() || 'FILE'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              className="rounded-full" 
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                try {
                  setFilesPendingConfirm([])
                  setSelectedFiles([])
                  setSecurityConfirmOpen(false)
                  console.log('Security dialog cancelled')
                } catch (error) {
                  console.error('Error cancelling security dialog:', error)
                  addNotification('error', 'Failed to cancel. Please try again.')
                  setSecurityConfirmOpen(false)
                }
              }}
            >
              Cancel
            </Button>
            <Button 
              className="rounded-full bg-[#00A884]" 
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                try {
                  const filesToSend = filesPendingConfirm.length ? filesPendingConfirm : selectedFiles
                  console.log(`Sending ${filesToSend.length} files with ${pendingFileSecurityLevel} security`)
                  actuallySendFiles(filesToSend)
                  setFilesPendingConfirm([])
                  setSelectedFiles([])
                  setSecurityConfirmOpen(false)
                } catch (error) {
                  console.error('Error in Send button:', error)
                  addNotification('error', 'Failed to send files. Please try again.')
                  setFilesPendingConfirm([])
                  setSelectedFiles([])
                  setSecurityConfirmOpen(false)
                }
              }}
            >
              Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
        <div 
          ref={resizeRef}
          className={cn(
            "relative bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-100 transition-all duration-300 ease-in-out transform",
            isFullScreen 
              ? "fixed inset-0 m-0 w-full h-full rounded-none border-none" 
              : "absolute bottom-8 right-8"
          )}
        style={{
          width: isFullScreen ? '100vw' : `${modalSize.width}px`,
          height: isFullScreen ? '100vh' : `${modalSize.height}px`,
          minWidth: isFullScreen ? '100vw' : '420px',
          maxWidth: isFullScreen ? '100vw' : '1000px',
          minHeight: isFullScreen ? '100vh' : '400px',
          maxHeight: isFullScreen ? '100vh' : '900px',
          right: isFullScreen ? '0' : '32px',
          left: isFullScreen ? '0' : 'auto',
          top: isFullScreen ? '0' : 'auto',
          bottom: isFullScreen ? '0' : 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >


        
        {/* Header - Perfect Alignment */}
        <div className="relative z-20 bg-gradient-to-r from-[#00A884] to-[#008F72] text-white p-4 flex items-center justify-between rounded-t-3xl">
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose} 
              className="text-white hover:bg-white/20 rounded-full transition-colors duration-200 h-8 w-8 p-0 flex items-center justify-center"
            >
              <X className="h-4 w-4" />
            </Button>
            <h1 className="text-lg font-semibold leading-none">Chats</h1>
          </div>
            <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsFullScreen(!isFullScreen)}
                className="text-white hover:bg-white/20 rounded-full transition-colors duration-200 h-9 w-9 p-0 flex items-center justify-center"
              title={isFullScreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullScreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
                className="text-white hover:bg-white/20 rounded-full transition-colors duration-200 h-9 w-9 p-0 flex items-center justify-center"
            >
              <Camera className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowNewChatMenu(!showNewChatMenu)}
              className="text-white hover:bg-white/20 rounded-full transition-colors duration-200 h-9 w-9 p-0 flex items-center justify-center"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* New Chat Menu */}
        {showNewChatMenu && (
          <div className="absolute top-16 right-4 bg-white rounded-lg shadow-lg border border-gray-200 z-30 min-w-48">
            <div className="p-2">
              <div className="text-sm font-medium text-gray-700 px-3 py-2">New</div>
              <div className="space-y-1">
                <button type="button"
                  onClick={() => handleCreateNew("chat")}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md flex items-center gap-3"
                >
                  <MessageSquare className="h-4 w-4 text-[#00A884]" />
                  <span className="text-sm">New Chat</span>
                </button>
                <button type="button"
                  onClick={() => handleCreateNew("group")}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md flex items-center gap-3"
                >
                  <Users className="h-4 w-4 text-[#00A884]" />
                  <span className="text-sm">New Group</span>
                </button>
                <button type="button"
                  onClick={() => handleCreateNew("community")}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md flex items-center gap-3"
                >
                  <Hash className="h-4 w-4 text-[#00A884]" />
                  <span className="text-sm">New Community</span>
                </button>
                <button type="button"
                  onClick={() => handleCreateNew("broadcast")}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md flex items-center gap-3"
                >
                  <Share2 className="h-4 w-4 text-[#00A884]" />
                  <span className="text-sm">New Broadcast</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Create New Chat/Group Dialog */}
        <Dialog 
          open={showCreateDialog} 
          onOpenChange={(open) => {
            if (!open) {
              setShowCreateDialog(false)
            }
          }}
        >
          <DialogContent 
            className="sm:max-w-md z-[60]"
            onPointerDownOutside={(e) => {
              e.preventDefault()
              setShowCreateDialog(false)
            }}
            onEscapeKeyDown={(e) => {
              e.preventDefault()
              setShowCreateDialog(false)
            }}
          >
            <DialogHeader>
              <DialogTitle>
                {createType === "chat" && "New Chat"}
                {createType === "group" && "New Group"}
                {createType === "community" && "New Community"}
                {createType === "broadcast" && "New Broadcast"}
              </DialogTitle>
              <DialogDescription>
                {createType === "chat" && "Start a conversation with someone"}
                {createType === "group" && "Create a group for team collaboration"}
                {createType === "community" && "Create a community for discussions"}
                {createType === "broadcast" && "Send messages to multiple people"}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="chat-name">Name</Label>
                <Input
                  id="chat-name"
                  placeholder={
                    createType === "chat" ? "Enter contact name" :
                    createType === "group" ? "Enter group name" :
                    createType === "community" ? "Enter community name" :
                    "Enter broadcast name"
                  }
                  value={newChatName}
                  onChange={(e) => setNewChatName(e.target.value)}
                />
              </div>
              
              {(createType === "group" || createType === "community") && (
                <div>
                  <Label htmlFor="chat-description">Description (Optional)</Label>
                  <Textarea
                    id="chat-description"
                    placeholder="Enter description..."
                    value={newChatDescription}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewChatDescription(e.target.value)}
                    rows={3}
                  />
                </div>
              )}

              <div>
                <Label>Select Participants</Label>
                <div className="max-h-48 overflow-y-auto border rounded-md p-2 space-y-2">
                  {availableParticipants.map((participant) => (
                    <div
                      key={participant.id}
                      className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md cursor-pointer"
                      onClick={() => handleParticipantToggle(participant.id)}
                    >
                      <input
                        type="checkbox"
                        checked={selectedParticipants.includes(participant.id)}
                        onChange={() => {}}
                        className="rounded"
                      />
                      <Avatar className="h-8 w-8">
                        <AvatarImage 
                          src={participant.avatar} 
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder-user.jpg"
                          }}
                        />
                        <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{participant.name}</span>
                          {participant.isOnline && (
                            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                          )}
                        </div>
                        <span className="text-xs text-gray-500">{participant.email}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {selectedParticipants.length} participant{selectedParticipants.length !== 1 ? 's' : ''} selected
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setShowCreateDialog(false)
                }}
              >
                Cancel
              </Button>
              <Button 
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  createNewChat()
                }} 
                className="bg-[#00A884] hover:bg-[#00A884]/90"
              >
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* User Discovery Dialog */}
        <Dialog 
          open={showUserDiscovery} 
          onOpenChange={(open) => {
            if (!open) {
              setShowUserDiscovery(false)
            }
          }}
        >
          <DialogContent 
            className="sm:max-w-2xl z-[60]"
            onPointerDownOutside={(e) => {
              e.preventDefault()
              setShowUserDiscovery(false)
            }}
            onEscapeKeyDown={(e) => {
              e.preventDefault()
              setShowUserDiscovery(false)
            }}
          >
            <DialogHeader>
              <DialogTitle>Discover New Users</DialogTitle>
              <DialogDescription>
                Connect with other GrowthLab users to expand your network
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Search users by name, role, or company..."
                  className="flex-1"
                />
                <Button variant="outline">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>

              <div className="max-h-96 overflow-y-auto space-y-2">
                {availableParticipants.filter(p => !hubConnectedUsers.includes(p.id) && !pendingConnections.includes(p.id)).map((participant) => (
                  <div
                    key={participant.id}
                    className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="relative flex-shrink-0">
                      <Avatar className="h-12 w-12">
                        <AvatarImage 
                          src={participant.avatar} 
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder-user.jpg"
                          }}
                        />
                        <AvatarFallback className="bg-[#00A884] text-white font-medium">
                          {participant.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      {participant.isOnline && (
                        <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold">{participant.name}</h3>
                        <span className="text-xs text-gray-500">{participant.role}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{participant.company}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>{participant.mutualConnections} mutual connections</span>
                        <span>{participant.status}</span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleConnectUser(participant.id)}
                      className="flex-shrink-0"
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Connect
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setShowUserDiscovery(false)
                }}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Enhanced Resize Handle */}
            {!isFullScreen && (
              <div
                className="absolute bottom-14 right-3 w-8 h-8 cursor-se-resize flex items-center justify-center group"
                onMouseDown={handleMouseDown}
                title="Drag to resize"
              >
                <div className="w-6 h-6 border-r-2 border-b-2 border-white/50 rounded-br-lg group-hover:border-white/80 transition-colors duration-200"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="w-2 h-2 bg-white/30 rounded-full"></div>
                </div>
              </div>
            )}

            {/* Note: Fullscreen toggle handled in header to avoid overlap */}

            {/* Meeting controls moved into Meetings tab */}

        {/* Search Bar - Consistent Spacing */}
        <div className={cn("p-3 md:p-4 bg-white border-y border-gray-100", isFullScreen && "mt-14")}> 
          <div className="relative max-w-3xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            <Input
              placeholder="Search or start new chat"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 bg-white border-gray-200 rounded-full focus:ring-2 focus:ring-[#00A884]/20 transition-all duration-200 text-sm"
            />
          </div>
        </div>

        {/* Enhanced Tab Navigation */}
        <div className="flex border-b border-gray-100 bg-white">
          <button type="button"
            onClick={() => setActiveTab("chats")}
            className={cn(
              "flex-1 py-3 px-4 text-sm font-medium transition-colors duration-200",
              activeTab === "chats" 
                ? "text-[#00A884] border-b-2 border-[#00A884]" 
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            <div className="flex items-center justify-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>Chats</span>
            </div>
          </button>
          <button type="button"
            onClick={() => setActiveTab("connectivity")}
            className={cn(
              "flex-1 py-3 px-4 text-sm font-medium transition-colors duration-200",
              activeTab === "connectivity" 
                ? "text-[#00A884] border-b-2 border-[#00A884]" 
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            <div className="flex items-center justify-center gap-2">
              <Users className="h-4 w-4" />
              <span>Connectivity</span>
              {pendingConnections.length > 0 && (
                <Badge variant="destructive" className="h-5 w-5 p-0 text-xs">
                  {pendingConnections.length}
                </Badge>
              )}
            </div>
          </button>
          <button type="button"
            onClick={() => setActiveTab("meetings")}
            className={cn(
              "flex-1 py-3 px-4 text-sm font-medium transition-colors duration-200",
              activeTab === "meetings" 
                ? "text-[#00A884] border-b-2 border-[#00A884]" 
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            <div className="flex items-center justify-center gap-2">
              <Video className="h-4 w-4" />
              <span>Meetings</span>
            </div>
          </button>
          <button type="button"
            onClick={() => setActiveTab("settings")}
            className={cn(
              "flex-1 py-3 px-4 text-sm font-medium transition-colors duration-200",
              activeTab === "settings" 
                ? "text-[#00A884] border-b-2 border-[#00A884]" 
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            <div className="flex items-center justify-center gap-2">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </div>
          </button>
        </div>

        {/* Main Content - Perfect Alignment */}
        <div className="flex-1 overflow-hidden">
          {isInCall ? (
            // Call Interface
            <div className="flex flex-col h-full bg-gray-900 text-white">
              {/* Call Header */}
              <div className="p-4 border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={endCall}
                      className="text-white hover:bg-red-500/20 rounded-full transition-colors duration-200 h-8 w-8 p-0 flex items-center justify-center"
                    >
                      <Phone className="h-4 w-4" />
                    </Button>
                    <div>
                      <h3 className="font-semibold text-sm">{activeChatData?.name}</h3>
                      <p className="text-xs text-gray-400">{formatCallDuration(callDuration)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {/* Call Quality Indicators */}
                    <div className="flex items-center space-x-1 text-green-400">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-xs">{callQuality}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-blue-400">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-xs">{networkStatus}</span>
                    </div>
                    {isRecordingCall && (
                      <div className="flex items-center space-x-1 text-red-400">
                        <CircleDot className="h-3 w-3 animate-pulse" />
                        <span className="text-xs">Recording</span>
                      </div>
                    )}
                    {/* Battery indicator */}
                    <div className="flex items-center space-x-1 text-yellow-400">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span className="text-xs">{batteryLevel}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call Controls */}
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mb-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={activeChatData?.avatar} />
                      <AvatarFallback className="bg-[#00A884] text-white">{activeChatData?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{activeChatData?.name}</h3>
                  <p className="text-sm text-gray-400">{isVideoOff ? "Audio Call" : "Video Call"}</p>
                </div>
              </div>

              {/* Enhanced Call Action Buttons */}
              <div className="p-4 border-t border-gray-700">
                <div className="flex items-center justify-around">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleMute}
                    className={cn(
                      "rounded-full transition-all duration-200 h-12 w-12 p-0 flex items-center justify-center transform hover:scale-110 shadow-lg",
                      isMuted ? "bg-red-500 hover:bg-red-600 ring-2 ring-red-300" : "bg-gray-700 hover:bg-gray-600"
                    )}
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleVideo}
                    className={cn(
                      "rounded-full transition-all duration-200 h-12 w-12 p-0 flex items-center justify-center transform hover:scale-110 shadow-lg",
                      isVideoOff ? "bg-red-500 hover:bg-red-600 ring-2 ring-red-300" : "bg-gray-700 hover:bg-gray-600"
                    )}
                    title={isVideoOff ? "Turn on video" : "Turn off video"}
                  >
                    {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleScreenSharing}
                    className={cn(
                      "rounded-full transition-all duration-200 h-12 w-12 p-0 flex items-center justify-center transform hover:scale-110 shadow-lg",
                      isScreenSharing ? "bg-blue-500 hover:bg-blue-600 ring-2 ring-blue-300" : "bg-gray-700 hover:bg-gray-600"
                    )}
                    title={isScreenSharing ? "Stop sharing" : "Share screen"}
                  >
                    <Monitor className="h-5 w-5" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleCallRecording}
                    className={cn(
                      "rounded-full transition-all duration-200 h-12 w-12 p-0 flex items-center justify-center transform hover:scale-110 shadow-lg",
                      isRecordingCall ? "bg-red-500 hover:bg-red-600 ring-2 ring-red-300 animate-pulse" : "bg-gray-700 hover:bg-gray-600"
                    )}
                    title={isRecordingCall ? "Stop recording" : "Record call"}
                  >
                    <CircleDot className="h-5 w-5" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={endCall}
                    className="bg-red-500 hover:bg-red-600 rounded-full transition-all duration-200 h-12 w-12 p-0 flex items-center justify-center transform hover:scale-110 shadow-lg ring-2 ring-red-300"
                    title="End call"
                  >
                    <Phone className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          ) : activeChat ? (
            // Chat View - Aligned Elements
            <div className="flex flex-col h-full">
              {/* Chat Header - Consistent Alignment */}
              <div className="bg-white border-b border-gray-100 p-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setActiveChat(null)}
                    className="hover:bg-gray-100 rounded-full transition-colors duration-200 h-8 w-8 p-0 flex items-center justify-center"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <Avatar className="h-8 w-8 ring-2 ring-[#00A884]/20 flex-shrink-0">
                    <AvatarImage src={activeChatData?.avatar} />
                    <AvatarFallback className="bg-[#00A884] text-white text-sm font-medium">{activeChatData?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm truncate">{activeChatData?.name}</h3>
                    <p className="text-xs text-gray-500 truncate">
                      {activeChatData?.isOnline ? "online" : "last seen recently"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => startCall("audio")}
                    className="hover:bg-gray-100 rounded-full transition-colors duration-200 h-8 w-8 p-0 flex items-center justify-center"
                  >
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => startCall("video")}
                    className="hover:bg-gray-100 rounded-full transition-colors duration-200 h-8 w-8 p-0 flex items-center justify-center"
                  >
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="hover:bg-gray-100 rounded-full transition-colors duration-200 h-8 w-8 p-0 flex items-center justify-center"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Messages - Perfect Alignment */}
              <ScrollArea className="flex-1">
                <div className="p-4 space-y-3">
                  {activeChatData?.messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex",
                        message.isFromMe ? "justify-end" : "justify-start"
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-xs lg:max-w-md px-3 py-2 rounded-2xl shadow-sm",
                          message.isFromMe
                            ? "bg-[#00A884] text-white"
                            : "bg-gray-100 text-gray-900"
                        )}
                      >
                        {message.type === "voice" && (
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => playVoiceMessage(30)}
                              className="p-1 hover:bg-white/20 rounded-full h-6 w-6 flex items-center justify-center"
                            >
                              <Play className="h-3 w-3" />
                            </Button>
                            <div className="flex-1 bg-white/20 rounded-full h-1">
                              <div className="bg-white h-1 rounded-full" style={{ width: "60%" }} />
                            </div>
                            <span className="text-xs">0:30</span>
                          </div>
                        )}
                        {message.type === "image" && (
                          <div className="space-y-2">
                            <div className="w-48 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                              <ImageIcon className="h-8 w-8 text-gray-400" />
                            </div>
                            <p className="text-xs opacity-75">Photo</p>
                          </div>
                        )}
                        {message.type === "file" && message.attachment && (
                          <div className="space-y-2">
                            <div className="w-48 p-3 bg-gray-100 rounded-lg">
                              <div className="flex items-center space-x-2">
                                <File className="h-6 w-6 text-gray-500" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-medium truncate">{message.attachment.name}</p>
                                  <p className="text-xs text-gray-500">
                                    {(message.attachment.size / 1024 / 1024).toFixed(1)} MB
                                  </p>
                                </div>
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => downloadFile(message.attachment!.url, message.attachment!.name)}
                                className="w-full mt-2 text-xs"
                              >
                                <Download className="h-3 w-3 mr-1" />
                                Download
                              </Button>
                            </div>
                          </div>
                        )}
                        {message.type === "text" && (
                          <div>
                            <p className="text-sm leading-relaxed">{message.content}</p>
                            {message.translatedContent && showTranslation && (
                              <div className="mt-2 p-2 bg-white/10 rounded-lg">
                                <div className="flex items-center space-x-1 mb-1">
                                  <Globe className="h-3 w-3" />
                                  <span className="text-xs opacity-75">Translation</span>
                                </div>
                                <p className="text-xs">{message.translatedContent}</p>
                              </div>
                            )}
                          </div>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center space-x-1">
                            <span className="text-xs opacity-75">
                              {format(message.timestamp, "HH:mm")}
                            </span>
                            {message.isFromMe && (
                              <div className="flex items-center space-x-1">
                                {messageStatus === "sending" && (
                                  <div className="flex space-x-1">
                                    <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse"></div>
                                    <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.1s'}}></div>
                                    <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                                  </div>
                                )}
                                {messageStatus === "sent" && (
                                  <CheckCheck className="h-3 w-3 text-gray-400" />
                                )}
                                {messageStatus === "delivered" && (
                                  <div className="flex">
                                    <CheckCheck className="h-3 w-3 text-gray-400" />
                                    <CheckCheck className="h-3 w-3 text-gray-400 -ml-1" />
                                  </div>
                                )}
                                {messageStatus === "read" && (
                                  <div className="flex">
                                    <CheckCheck className="h-3 w-3 text-blue-400" />
                                    <CheckCheck className="h-3 w-3 text-blue-400 -ml-1" />
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                          
                          {/* Message Reactions */}
                          <div className="flex items-center space-x-1">
                            {messageReactions[message.id]?.map((reaction, index) => (
                              <div
                                key={index}
                                className="bg-white/20 rounded-full px-2 py-1 text-xs flex items-center space-x-1"
                                title={`${reaction.users.join(', ')}`}
                              >
                                <span>{reaction.type}</span>
                                <span className="text-xs opacity-75">{reaction.count}</span>
                              </div>
                            ))}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setShowReactions(showReactions === message.id ? null : message.id)}
                              className="h-6 w-6 p-0 hover:bg-white/20 rounded-full"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        
                        {/* Reaction Picker */}
                        {showReactions === message.id && (
                          <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 p-2">
                            <div className="flex space-x-1">
                              {['👍', '❤️', '😂', '😮', '😢', '😡'].map((emoji) => (
                                <Button
                                  key={emoji}
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    addReaction(message.id, emoji)
                                    setShowReactions(null)
                                  }}
                                  className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full text-lg"
                                >
                                  {emoji}
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}
                        {message.translatedContent && !showTranslation && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowTranslation(true)}
                            className="mt-1 p-1 hover:bg-white/10 rounded text-xs"
                          >
                            <Globe className="h-3 w-3 mr-1" />
                            Translate
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Message Input - Aligned Components */}
              <div className="p-3 bg-gray-50/50 border-t border-gray-100">
                <div className="flex items-center space-x-2 pr-2 md:pr-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                    className="text-gray-500 hover:bg-gray-100 rounded-full transition-colors duration-200 h-8 w-8 p-0 flex items-center justify-center"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  
                  {/* AI Assistant Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (messageInput.trim()) {
                        generateAIResponse(messageInput)
                      }
                    }}
                    disabled={isGeneratingResponse || !messageInput.trim()}
                    className={cn(
                      "rounded-full transition-colors duration-200 h-8 w-8 p-0 flex items-center justify-center",
                      isGeneratingResponse 
                        ? "text-gray-400 cursor-not-allowed" 
                        : "text-[#00A884] hover:bg-[#00A884]/10"
                    )}
                    title="Get AI assistance"
                  >
                    {isGeneratingResponse ? (
                      <div className="animate-spin">
                        <Zap className="h-4 w-4" />
                      </div>
                    ) : (
                      <Zap className="h-4 w-4" />
                    )}
                  </Button>
                   <div 
                     className="flex-1 relative min-w-0"
                     onDragOver={(e) => {
                       e.preventDefault()
                       e.stopPropagation()
                       setDragOver(true)
                     }}
                     onDragLeave={(e) => {
                       e.preventDefault()
                       e.stopPropagation()
                       setDragOver(false)
                     }}
                     onDrop={(e) => {
                       e.preventDefault()
                       e.stopPropagation()
                       setDragOver(false)
                       try {
                         if (e.dataTransfer.files.length > 0) {
                           handleFileUpload(e.dataTransfer.files)
                         }
                       } catch (error) {
                         console.error('Error in drag and drop:', error)
                         addNotification('error', 'Failed to process dropped files.')
                       }
                     }}
                   >
                    <Input
                      ref={messageInputRef}
                      value={messageInput}
                      onChange={(e) => {
                        setMessageInput(e.target.value)
                        handleTyping()
                      }}
                      onKeyPress={handleKeyPress}
                      placeholder={dragOver ? "Drop files here" : "Type a message or drag files here"}
                      className={cn(
                        "rounded-full pr-12 py-2 focus:ring-2 focus:ring-[#00A884]/20 transition-all duration-200 text-sm",
                        dragOver && "ring-2 ring-[#00A884] bg-[#00A884]/5"
                      )}
                    />
                    
                    {/* Enhanced Typing Indicator */}
                    {isTyping && (
                      <div className="absolute -top-8 left-0 bg-gray-800 text-white text-xs px-2 py-1 rounded-md animate-pulse flex items-center space-x-1">
                        <div className="flex space-x-1">
                          <div className="w-1 h-1 bg-white rounded-full animate-bounce"></div>
                          <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                        <span className="ml-1">typing...</span>
                      </div>
                    )}
                    
                    {isRecording && (
                      <div className="absolute inset-0 bg-red-500 text-white rounded-full flex items-center justify-center text-sm animate-pulse">
                        <Mic className="h-4 w-4 mr-2" />
                        {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, '0')}
                      </div>
                    )}
                  </div>
                   {isRecording ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={stopRecording}
                       className="text-red-500 hover:bg-red-50 rounded-full transition-all duration-200 h-10 w-10 p-0 flex items-center justify-center transform hover:scale-110"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                       onClick={() => {
                         if (!activeChat) {
                           addNotification("warning", "Select a chat to send files or messages")
                           return
                         }
                         if (selectedFiles.length > 0) {
                           setPendingFileSecurityLevel(fileSecurityLevel)
                           setFilesPendingConfirm(selectedFiles)
                           setSecurityConfirmOpen(true)
                           return
                         }
                         return messageInput.trim() ? sendMessage() : startRecording()
                       }}
                      className={cn(
                         "rounded-full transition-all duration-200 h-10 w-10 p-0 flex items-center justify-center transform hover:scale-110",
                        messageInput.trim() 
                          ? "text-[#00A884] hover:bg-[#00A884]/10" 
                          : "text-gray-500 hover:bg-gray-100"
                      )}
                    >
                      {messageInput.trim() ? (
                        <Send className="h-4 w-4" />
                      ) : (
                        <Mic className="h-4 w-4" />
                      )}
                    </Button>
                  )}
                </div>

                {/* Enhanced Attachment Menu */}
                {showAttachmentMenu && (
                  <div className="mt-2 p-3 bg-white rounded-xl border border-gray-200 shadow-lg">
                    {/* Security selection is now shown in a confirmation dialog after file pick */}
                    <div className="grid grid-cols-4 gap-3">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => {
                          console.log('Photo button clicked')
                          try {
                            const input = document.createElement('input')
                            input.type = 'file'
                            input.accept = 'image/*'
                            input.multiple = true
                            input.onchange = (e) => {
                              console.log('Photo input change event triggered')
                              try {
                                const target = e.target as HTMLInputElement
                                if (target.files) {
                                  console.log('Photo files selected:', target.files.length)
                                  handleFileUpload(target.files)
                                } else {
                                  console.log('No photo files selected')
                                }
                              } catch (error) {
                                console.error('Error in photo input change handler:', error)
                                addNotification('error', 'Failed to process selected files.')
                              }
                            }
                            input.click()
                            console.log('Photo input clicked')
                          } catch (error) {
                            console.error('Error creating photo input:', error)
                            addNotification('error', 'Failed to open file selector.')
                          }
                        }}
                        className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200 h-auto"
                      >
                        <ImageIcon className="h-5 w-5 mb-1 text-[#00A884]" />
                        <span className="text-xs">Photo</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => {
                          console.log('Video button clicked')
                          try {
                            const input = document.createElement('input')
                            input.type = 'file'
                            input.accept = 'video/*'
                            input.multiple = true
                            input.onchange = (e) => {
                              console.log('Video input change event triggered')
                              try {
                                const target = e.target as HTMLInputElement
                                if (target.files) {
                                  console.log('Video files selected:', target.files.length)
                                  handleFileUpload(target.files)
                                } else {
                                  console.log('No video files selected')
                                }
                              } catch (error) {
                                console.error('Error in video input change handler:', error)
                                addNotification('error', 'Failed to process selected files.')
                              }
                            }
                            input.click()
                            console.log('Video input clicked')
                          } catch (error) {
                            console.error('Error creating video input:', error)
                            addNotification('error', 'Failed to open file selector.')
                          }
                        }}
                        className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200 h-auto"
                      >
                        <VideoIcon className="h-5 w-5 mb-1 text-[#00A884]" />
                        <span className="text-xs">Video</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => {
                          console.log('Document button clicked')
                          try {
                            const input = document.createElement('input')
                            input.type = 'file'
                            input.accept = '.pdf,.doc,.docx,.txt,.xlsx,.xls'
                            input.multiple = true
                            input.onchange = (e) => {
                              console.log('Document input change event triggered')
                              try {
                                const target = e.target as HTMLInputElement
                                if (target.files) {
                                  console.log('Document files selected:', target.files.length)
                                  handleFileUpload(target.files)
                                } else {
                                  console.log('No document files selected')
                                }
                              } catch (error) {
                                console.error('Error in document input change handler:', error)
                                addNotification('error', 'Failed to process selected files.')
                              }
                            }
                            input.click()
                            console.log('Document input clicked')
                          } catch (error) {
                            console.error('Error creating document input:', error)
                            addNotification('error', 'Failed to open file selector.')
                          }
                        }}
                        className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200 h-auto"
                      >
                        <File className="h-5 w-5 mb-1 text-[#00A884]" />
                        <span className="text-xs">Document</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => {
                          // Simulate location sharing
                          const locationMessage: WhatsAppMessage = {
                            id: Date.now().toString(),
                            content: "📍 Shared location",
                            timestamp: new Date(),
                            isRead: false,
                            isFromMe: true,
                            type: "location"
                          }
                          
                          setChats(prevChats => 
                            prevChats.map(chat => 
                              chat.id === activeChat 
                                ? {
                                    ...chat,
                                    messages: [...chat.messages, locationMessage],
                                    lastMessage: "📍 Shared location",
                                    timestamp: new Date(),
                                    unreadCount: 0
                                  }
                                : chat
                            )
                          )
                          setShowAttachmentMenu(false)
                        }}
                        className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200 h-auto"
                      >
                        <MapPin className="h-5 w-5 mb-1 text-[#00A884]" />
                        <span className="text-xs">Location</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => {
                          // Simulate contact sharing
                          const contactMessage: WhatsAppMessage = {
                            id: Date.now().toString(),
                            content: "👤 Shared contact",
                            timestamp: new Date(),
                            isRead: false,
                            isFromMe: true,
                            type: "text"
                          }
                          
                          setChats(prevChats => 
                            prevChats.map(chat => 
                              chat.id === activeChat 
                                ? {
                                    ...chat,
                                    messages: [...chat.messages, contactMessage],
                                    lastMessage: "👤 Shared contact",
                                    timestamp: new Date(),
                                    unreadCount: 0
                                  }
                                : chat
                            )
                          )
                          setShowAttachmentMenu(false)
                        }}
                        className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200 h-auto"
                      >
                        <UserPlus className="h-5 w-5 mb-1 text-[#00A884]" />
                        <span className="text-xs">Contact</span>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Main Content Based on Active Tab
            <div className="flex flex-col h-full">
              {activeTab === "chats" && (
                // Chat List View - Perfect Alignment
                <div className="flex flex-col h-full">
                  <ScrollArea className="flex-1">
                    <div className="space-y-0">
                      {filteredChats.map((chat) => (
                        <div
                          key={chat.id}
                          className="flex items-center space-x-3 p-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200 border-b border-gray-50 last:border-b-0"
                          onClick={() => {
                            console.log("Chat selected:", chat.id)
                            setActiveChat(chat.id)
                          }}
                        >
                          <div className="relative flex-shrink-0">
                                                  <Avatar className="h-10 w-10 ring-2 ring-[#00A884]/20">
                        <AvatarImage src={chat.avatar} onError={(e) => {
                          e.currentTarget.src = "/placeholder-user.jpg"
                        }} />
                        <AvatarFallback className="bg-[#00A884] text-white text-sm font-medium">{chat.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                            {chat.isOnline && (
                              <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white" />
                            )}
                            {chat.isChannel && (
                              <div className="absolute -top-1 -right-1 h-4 w-4 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                                <Hash className="h-2 w-2 text-white" />
                              </div>
                            )}
                            {chat.isGroup && (
                              <div className="absolute -top-1 -right-1 h-4 w-4 bg-purple-500 rounded-full border-2 border-white flex items-center justify-center">
                                <Users className="h-2 w-2 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold text-sm truncate">{chat.name}</h3>
                              <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{formatTime(chat.timestamp)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-gray-500 truncate flex items-center flex-1">
                                {chat.isTyping && (
                                  <span className="text-[#00A884] mr-2 text-xs font-medium">typing...</span>
                                )}
                                <span className="truncate">{chat.lastMessage}</span>
                              </p>
                              <div className="flex items-center space-x-2 flex-shrink-0 ml-3">
                                {chat.isMuted && <Bell className="h-3 w-3 text-gray-400" />}
                                {chat.isPinned && <Pin className="h-3 w-3 text-gray-400" />}
                                {chat.isChannel && <Hash className="h-3 w-3 text-blue-500" />}
                                {chat.isGroup && <Users className="h-3 w-3 text-purple-500" />}
                                {chat.unreadCount > 0 && (
                                  <Badge className="bg-[#00A884] text-white text-xs rounded-full min-w-[18px] h-5 px-1">
                                    {chat.unreadCount}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <div className="p-3 border-t bg-white">
                    <Button
                      variant="outline"
                      className="w-full rounded-full h-10"
                      onClick={() => {
                        setIsCreateGroupOpen(true)
                        refreshMediaDevices()
                      }}
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Create Group
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === "connectivity" && (
                // Enhanced Connectivity Tab
                <div className="flex flex-col h-full">
                  {/* Network Status Header */}
                  <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-[#00A884]/10 to-[#008F72]/10">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-lg">Network Connectivity</h3>
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          hubNetworkStatus === "online" ? "bg-green-500" : 
                          hubNetworkStatus === "connecting" ? "bg-yellow-500" : "bg-red-500"
                        )} />
                        <span className="text-sm font-medium capitalize">{hubNetworkStatus}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-3 rounded-lg border">
                        <div className="flex items-center gap-2 mb-1">
                          <Users className="h-4 w-4 text-[#00A884]" />
                          <span className="text-sm font-medium">Connected</span>
                        </div>
                        <span className="text-2xl font-bold text-[#00A884]">{hubConnectedUsers.length}</span>
                      </div>
                      <div className="bg-white p-3 rounded-lg border">
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="h-4 w-4 text-orange-500" />
                          <span className="text-sm font-medium">Pending</span>
                        </div>
                        <span className="text-2xl font-bold text-orange-500">{pendingConnections.length}</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={discoverNewUsers}
                        className="flex-1"
                      >
                        <UserPlus className="h-4 w-4 mr-2" />
                        Discover Users
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={syncAllConnections}
                        className="flex-1"
                        disabled={syncStatus === "syncing"}
                      >
                        <RefreshCw className={cn("h-4 w-4 mr-2", syncStatus === "syncing" && "animate-spin")} />
                        {syncStatus === "syncing" ? "Syncing..." : "Sync All"}
                      </Button>
                    </div>
                  </div>

                  {/* Connected Users Section */}
                  <div className="flex-1 overflow-hidden">
                    <div className="p-4 border-b border-gray-100">
                      <h4 className="font-semibold text-sm mb-2">Connected Users</h4>
                      <p className="text-xs text-gray-500">People you can communicate with</p>
                    </div>
                    <ScrollArea className="flex-1">
                      <div className="space-y-0">
                        {availableParticipants.filter(p => hubConnectedUsers.includes(p.id)).map((participant) => (
                          <div
                            key={participant.id}
                            className="flex items-center space-x-3 p-3 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-50 last:border-b-0"
                          >
                            <div className="relative flex-shrink-0">
                              <Avatar className="h-10 w-10">
                                <AvatarImage 
                                  src={participant.avatar} 
                                  onError={(e) => {
                                    e.currentTarget.src = "/placeholder-user.jpg"
                                  }}
                                />
                                <AvatarFallback className="bg-[#00A884] text-white text-sm font-medium">
                                  {participant.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              {participant.isOnline && (
                                <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <h3 className="font-semibold text-sm truncate">{participant.name}</h3>
                                <span className="text-xs text-gray-500">{participant.role}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <p className="text-xs text-gray-500 truncate">{participant.company}</p>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-gray-400">{participant.mutualConnections} mutual</span>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDisconnectUser(participant.id)}
                                    className="h-6 w-6 p-0 text-red-500 hover:text-red-600"
                                  >
                                    <UserMinus className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        {hubConnectedUsers.length === 0 && (
                          <div className="p-8 text-center">
                            <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-sm text-gray-500">No connected users yet</p>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={discoverNewUsers}
                              className="mt-3"
                            >
                              Discover Users
                            </Button>
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </div>

                  {/* Pending Connections */}
                  {pendingConnections.length > 0 && (
                    <div className="border-t border-gray-100">
                      <div className="p-4 border-b border-gray-100">
                        <h4 className="font-semibold text-sm mb-2">Pending Connections</h4>
                        <p className="text-xs text-gray-500">Connection requests waiting for approval</p>
                      </div>
                      <ScrollArea className="max-h-32">
                        <div className="space-y-0">
                          {availableParticipants.filter(p => pendingConnections.includes(p.id)).map((participant) => (
                            <div
                              key={participant.id}
                              className="flex items-center space-x-3 p-3 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-50 last:border-b-0"
                            >
                              <Avatar className="h-8 w-8">
                                <AvatarImage 
                                  src={participant.avatar} 
                                  onError={(e) => {
                                    e.currentTarget.src = "/placeholder-user.jpg"
                                  }}
                                />
                                <AvatarFallback className="bg-orange-500 text-white text-xs font-medium">
                                  {participant.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-sm truncate">{participant.name}</h3>
                                <p className="text-xs text-gray-500 truncate">{participant.company}</p>
                              </div>
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleAcceptConnection(participant.id)}
                                  className="h-6 w-6 p-0 text-green-500 hover:text-green-600"
                                >
                                  <CheckCircle className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleRejectConnection(participant.id)}
                                  className="h-6 w-6 p-0 text-red-500 hover:text-red-600"
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "calls" && (
                // Connected Users for Calls
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-semibold text-lg">Connected Users</h3>
                    <p className="text-sm text-gray-500">Call only people you're connected to</p>
                  </div>
                  <ScrollArea className="flex-1">
                    <div className="space-y-0">
                      {connectedUsers.map((user) => (
                        <div
                          key={user.id}
                          className="flex items-center space-x-3 p-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200 border-b border-gray-50 last:border-b-0"
                        >
                          <div className="relative flex-shrink-0">
                            <Avatar className="h-10 w-10 ring-2 ring-[#00A884]/20">
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback className="bg-[#00A884] text-white text-sm font-medium">{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {user.isOnline && (
                              <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm truncate">{user.name}</h3>
                            <p className="text-sm text-gray-500">{user.isOnline ? "Online" : "Offline"}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => startCall("audio")}
                              className="h-10 w-10 p-0 rounded-full bg-[#00A884] text-white hover:bg-[#00A884]/90"
                            >
                              <Phone className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => startCall("video")}
                              className="h-10 w-10 p-0 rounded-full bg-blue-500 text-white hover:bg-blue-600"
                            >
                              <Video className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setIsCreateGroupOpen(true)
                                setSelectedGroupMemberIds(prev => Array.from(new Set([...prev, user.id])))
                              }}
                              className="h-10 px-3 rounded-full"
                            >
                              <Users className="h-4 w-4 mr-1" /> Add to Group
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              )}

              {activeTab === "meetings" && (
                // Video Meetings
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-semibold text-lg">Video Meetings</h3>
                    <p className="text-sm text-gray-500">Schedule and join virtual meetings</p>
                  </div>
                  <div className="flex-1 p-4">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Button
                          onClick={() => startVideoMeeting(["Sarah Chen", "TechFlow Team"])}
                          className="w-full bg-[#00A884] text-white hover:bg-[#00A884]/90"
                        >
                          <Video className="h-4 w-4 mr-2" />
                          Start Instant Meeting
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => addNotification("info", "Scheduling UI coming soon")}
                          className="w-full rounded-full"
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          Schedule a Meeting
                        </Button>
                      </div>

                      {isInVideoMeeting && (
                        <div className="space-y-3 rounded-lg border p-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Live Meeting</span>
                            <span className="text-xs text-gray-500">{formatCallDuration(callDuration)}</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={toggleScreenSharing}
                              className={cn(
                                "h-9 px-3 rounded-full",
                                isScreenSharing ? "bg-orange-500/20 text-orange-600" : "bg-gray-100 text-gray-700"
                              )}
                            >
                              <Monitor className="h-4 w-4 mr-2" />
                              {isScreenSharing ? "Stop Sharing" : "Share Screen"}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={toggleMeetingRecording}
                              className={cn(
                                "h-9 px-3 rounded-full",
                                isRecordingMeeting ? "bg-red-500/20 text-red-600 animate-pulse" : "bg-gray-100 text-gray-700"
                              )}
                            >
                              <CircleDot className="h-4 w-4 mr-2" />
                              {isRecordingMeeting ? "Recording" : "Record"}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={generateMeetingSummary}
                              disabled={isGeneratingSummary}
                              className="h-9 px-3 rounded-full bg-gray-100 text-gray-700"
                            >
                              {isGeneratingSummary ? (
                                <div className="h-4 w-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mr-2" />
                              ) : (
                                <Sparkles className="h-4 w-4 mr-2" />
                              )}
                              {isGeneratingSummary ? "Generating..." : "AI Summary"}
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={endVideoMeeting}
                              className="h-9 px-3 rounded-full"
                            >
                              End Meeting
                            </Button>
                          </div>
                          {/* Local preview (optional) */}
                          <video ref={localVideoRef} muted playsInline className="mt-2 w-full max-h-48 rounded-lg bg-black" />
                        </div>
                      )}

                      <div className="space-y-3">
                        <h4 className="font-medium text-sm">Meeting Features:</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center space-x-2">
                            <Monitor className="h-4 w-4 text-blue-500" />
                            <span>Screen Sharing</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CircleDot className="h-4 w-4 text-red-500" />
                            <span>Recording</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Sparkles className="h-4 w-4 text-purple-500" />
                            <span>AI Meeting Summary</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "channels" && (
                // Team Channels
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-semibold text-lg">Team Channels</h3>
                    <p className="text-sm text-gray-500">Collaborate with your team</p>
                  </div>
                  <ScrollArea className="flex-1">
                    <div className="space-y-0">
                      {channels.map((channel) => (
                        <div
                          key={channel.id}
                          className="flex items-center space-x-3 p-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200 border-b border-gray-50 last:border-b-0"
                        >
                          <div className="relative flex-shrink-0">
                            <Avatar className="h-10 w-10 ring-2 ring-[#00A884]/20">
                              <AvatarFallback className="bg-purple-500 text-white text-sm font-medium">#{channel.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {channel.isPrivate && (
                              <div className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                                <Lock className="h-2 w-2 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm truncate">#{channel.name}</h3>
                            <p className="text-sm text-gray-500">{channel.description}</p>
                            <p className="text-xs text-gray-400">{channel.members} members</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              )}

                             {activeTab === "calendar" && (
                 // Calendar and Events
                 <div className="flex flex-col h-full">
                   <div className="p-4 border-b border-gray-100">
                     <h3 className="font-semibold text-lg">Calendar & Events</h3>
                     <p className="text-sm text-gray-500">Your appointments and GrowthLab events</p>
                   </div>
                   <ScrollArea className="flex-1">
                     <div className="space-y-0">
                       {calendarEvents.map((event) => (
                         <div
                           key={event.id}
                           className="flex items-center space-x-3 p-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200 border-b border-gray-50 last:border-b-0"
                         >
                           <div className="relative flex-shrink-0">
                             <div className="h-10 w-10 rounded-full bg-[#00A884] flex items-center justify-center">
                               <Calendar className="h-5 w-5 text-white" />
                             </div>
                           </div>
                           <div className="flex-1 min-w-0">
                             <h3 className="font-semibold text-sm truncate">{event.title}</h3>
                             <p className="text-sm text-gray-500">{event.description}</p>
                             <p className="text-xs text-gray-400">{formatTime(event.date)} • {event.attendees.join(", ")}</p>
                           </div>
                         </div>
                       ))}
                     </div>
                   </ScrollArea>
                 </div>
               )}

               {activeTab === "settings" && (
                 // Settings and Configuration
                 <div className="flex flex-col h-full">
                   <div className="p-4 border-b border-gray-100">
                     <h3 className="font-semibold text-lg">Settings & Preferences</h3>
                     <p className="text-sm text-gray-500">Customize your communication experience</p>
                   </div>
                   <ScrollArea className="flex-1">
                     <div className="p-4 space-y-6">
                        {/* Devices */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-sm text-gray-700">Devices</h4>
                            <Button size="sm" variant="outline" onClick={refreshMediaDevices} className="h-8 px-2">Refresh</Button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div>
                              <label className="text-xs text-gray-500">Camera</label>
                              <select
                                className="mt-1 w-full border rounded px-2 py-1 text-sm"
                                value={selectedCameraId ?? ""}
                                onChange={e => setSelectedCameraId(e.target.value || null)}
                              >
                                <option value="">Default</option>
                                {availableDevices.filter(d => d.kind === "videoinput").map(d => (
                                  <option key={d.deviceId} value={d.deviceId}>{d.label || `Camera ${d.deviceId.slice(0,6)}`}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="text-xs text-gray-500">Microphone</label>
                              <select
                                className="mt-1 w-full border rounded px-2 py-1 text-sm"
                                value={selectedMicrophoneId ?? ""}
                                onChange={e => setSelectedMicrophoneId(e.target.value || null)}
                              >
                                <option value="">Default</option>
                                {availableDevices.filter(d => d.kind === "audioinput").map(d => (
                                  <option key={d.deviceId} value={d.deviceId}>{d.label || `Mic ${d.deviceId.slice(0,6)}`}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="text-xs text-gray-500">Speakers</label>
                              <select
                                className="mt-1 w-full border rounded px-2 py-1 text-sm"
                                value={selectedSpeakerId ?? ""}
                                onChange={e => setSelectedSpeakerId(e.target.value || null)}
                              >
                                <option value="">Default</option>
                                {availableDevices.filter(d => d.kind === "audiooutput").map(d => (
                                  <option key={d.deviceId} value={d.deviceId}>{d.label || `Speaker ${d.deviceId.slice(0,6)}`}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* File Security Settings */}
                        <div className="space-y-3">
                          <h4 className="font-medium text-sm text-gray-700">File Security Level (default)</h4>
                          <div className="flex flex-wrap gap-2">
                            {(["standard","confidential","restricted"] as const).map((lvl) => (
                              <Button
                                key={lvl}
                                variant={fileSecurityLevel === lvl ? "default" : "outline"}
                                size="sm"
                                className={`rounded-full h-8 px-3 ${fileSecurityLevel === lvl ? "bg-[#00A884] text-white" : ""}`}
                                onClick={() => setFileSecurityLevel(lvl)}
                              >
                                {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
                              </Button>
                            ))}
                          </div>
                          <p className="text-xs text-gray-500">This sets your default. You can still change it per file from the attachment menu.</p>
                        </div>

                       {/* Notification Settings */}
                       <div className="space-y-3">
                         <h4 className="font-medium text-sm text-gray-700">Notifications</h4>
                         <div className="space-y-2">
                           <label className="flex items-center space-x-2 cursor-pointer">
                             <input type="checkbox" defaultChecked className="text-[#00A884]" />
                             <span className="text-sm">Message notifications</span>
                           </label>
                           <label className="flex items-center space-x-2 cursor-pointer">
                             <input type="checkbox" defaultChecked className="text-[#00A884]" />
                             <span className="text-sm">Call notifications</span>
                           </label>
                           <label className="flex items-center space-x-2 cursor-pointer">
                              <input type="checkbox" checked={autoTranslateEnabled} onChange={e => setAutoTranslateEnabled(e.target.checked)} className="text-[#00A884]" />
                             <span className="text-sm">Meeting reminders</span>
                           </label>
                           <label className="flex items-center space-x-2 cursor-pointer">
                              <input type="checkbox" checked={showTypingIndicatorEnabled} onChange={e => setShowTypingIndicatorEnabled(e.target.checked)} className="text-[#00A884]" />
                              <span className="text-sm">Show typing indicator</span>
                           </label>
                         </div>
                       </div>

                       {/* Privacy Settings */}
                       <div className="space-y-3">
                         <h4 className="font-medium text-sm text-gray-700">Privacy</h4>
                         <div className="space-y-2">
                           <label className="flex items-center space-x-2 cursor-pointer">
                             <input type="checkbox" defaultChecked className="text-[#00A884]" />
                             <span className="text-sm">Show online status</span>
                           </label>
                           <label className="flex items-center space-x-2 cursor-pointer">
                             <input type="checkbox" defaultChecked className="text-[#00A884]" />
                             <span className="text-sm">Allow file downloads</span>
                           </label>
                           <label className="flex items-center space-x-2 cursor-pointer">
                              <input type="checkbox" checked={autoTranslateEnabled} onChange={e => setAutoTranslateEnabled(e.target.checked)} className="text-[#00A884]" />
                              <span className="text-sm">Auto-translate messages</span>
                           </label>
                         </div>
                       </div>

                        {/* Default Tab */}
                        <div className="space-y-3">
                          <h4 className="font-medium text-sm text-gray-700">Default Tab</h4>
                          <select
                            className="w-full border rounded px-2 py-1 text-sm"
                            value={defaultTab}
                            onChange={e => setDefaultTab(e.target.value)}
                          >
                            <option value="chats">Chats</option>
                            <option value="calls">Calls</option>
                            <option value="meetings">Meetings</option>
                            <option value="channels">Channels</option>
                            <option value="calendar">Calendar</option>
                            <option value="settings">Settings</option>
                          </select>
                        </div>

                                               {/* File Access Log */}
                        <div className="space-y-3">
                          <h4 className="font-medium text-sm text-gray-700">Recent File Access</h4>
                          <div className="space-y-2 max-h-32 overflow-y-auto">
                            {fileAccessLog.slice(-5).map((log, index) => (
                              <div key={index} className="text-xs p-2 bg-gray-50 rounded">
                                <div className="flex justify-between">
                                  <span className="font-medium">{log?.fileName}</span>
                                  <span className="text-gray-500">{log?.action}</span>
                                </div>
                                <div className="text-gray-500">
                                  {log?.accessedBy} • {formatTime(log?.accessTime)} • {log?.securityLevel}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Test Notifications */}
                        <div className="space-y-3">
                          <h4 className="font-medium text-sm text-gray-700">Test Notifications</h4>
                          <div className="flex flex-wrap gap-2">
                            <Button
                              size="sm"
                              onClick={() => addNotification("success", "Success notification test!")}
                              className="bg-green-500 hover:bg-green-600 text-white text-xs"
                            >
                              Success
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => addNotification("warning", "Warning notification test!")}
                              className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs"
                            >
                              Warning
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => addNotification("error", "Error notification test!")}
                              className="bg-red-500 hover:bg-red-600 text-white text-xs"
                            >
                              Error
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => addNotification("info", "Info notification test!")}
                              className="bg-blue-500 hover:bg-blue-600 text-white text-xs"
                            >
                              Info
                            </Button>
                          </div>
                        </div>
                     </div>
                   </ScrollArea>
                 </div>
               )}

              {/* Enhanced Bottom Navigation */}
              <div className="sticky bottom-0 z-30 bg-white/95 backdrop-blur border-t border-gray-100 p-2">
                <div className="grid grid-cols-6 gap-2 items-center max-w-lg mx-auto">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn("w-full flex flex-col items-center rounded-full transition-colors duration-200 h-auto p-2", activeTab === "chats" && "text-[#00A884] bg-[#00A884]/10")}
                    onClick={() => {
                      console.log("Tab switched to: chats")
                      setActiveTab("chats")
                    }}
                  >
                    <MessageSquare className="h-4 w-4 mb-1" />
                    <span className="text-[11px]">Chats</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn("w-full flex flex-col items-center rounded-full transition-colors duration-200 h-auto p-2", activeTab === "calls" && "text-[#00A884] bg-[#00A884]/10")}
                    onClick={() => setActiveTab("calls")}
                  >
                    <Phone className="h-4 w-4 mb-1" />
                    <span className="text-[11px]">Calls</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn("w-full flex flex-col items-center rounded-full transition-colors duration-200 h-auto p-2", activeTab === "meetings" && "text-[#00A884] bg-[#00A884]/10")}
                    onClick={() => setActiveTab("meetings")}
                  >
                    <Video className="h-4 w-4 mb-1" />
                    <span className="text-[11px]">Meetings</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn("w-full flex flex-col items-center rounded-full transition-colors duration-200 h-auto p-2", activeTab === "channels" && "text-[#00A884] bg-[#00A884]/10")}
                    onClick={() => setActiveTab("channels")}
                  >
                    <Hash className="h-4 w-4 mb-1" />
                    <span className="text-[11px]">Channels</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn("w-full flex flex-col items-center rounded-full transition-colors duration-200 h-auto p-2", activeTab === "calendar" && "text-[#00A884] bg-[#00A884]/10")}
                    onClick={() => setActiveTab("calendar")}
                  >
                    <Calendar className="h-4 w-4 mb-1" />
                    <span className="text-[11px]">Calendar</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn("w-full flex flex-col items-center rounded-full transition-colors duration-200 h-auto p-2", activeTab === "settings" && "text-[#00A884] bg-[#00A884]/10")}
                    onClick={() => setActiveTab("settings")}
                  >
                    <Settings className="h-4 w-4 mb-1" />
                    <span className="text-[11px]">Settings</span>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 