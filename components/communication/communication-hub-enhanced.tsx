"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import {
  MessageSquare,
  Phone,
  Video,
  FileText,
  Users,
  Settings,
  Search,
  Plus,
  Send,
  Paperclip,
  Smile,
  Mic,
  Lock,
  ShieldCheck,
  ShieldAlert,
  Activity,
  Eye,
  Download,
  Share2,
  Heart,
  ThumbsUp,
  Reply,
  MoreHorizontal,
  Edit,
  Trash2,
  Copy,
  Flag,
  Bell,
  BellOff,
  Pin,
  Star,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Zap,
  Key,
  EyeOff,
  FileLock,
  FileCheck,
  MessageCircle,
  Hash,
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
  Shield,
  Globe,
  Mail,
  Calendar,
  BookOpen,
  Lightbulb,
  Award,
  Users2,
  UserPlus,
  MessageSquarePlus,
  PhoneCall,
  VideoIcon,
  FileImage,
  FileVideo,
  FileAudio,
  Link,
  ExternalLink,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Camera,
  CameraOff,
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
  Outdent,
  Quote,
  Code,
  Link2,
  Image,
  Music,
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
import { cn } from "@/lib/utils"
import { useCommunication } from "@/hooks/use-communication"

interface Message {
  id: string
  sender: string
  content: string
  timestamp: Date
  type: "text" | "file" | "image" | "audio" | "video"
  securityLevel?: "standard" | "confidential" | "restricted"
  reactions?: Reaction[]
  replyTo?: string
  isEdited?: boolean
  isPinned?: boolean
  isEncrypted?: boolean
  readBy?: string[]
  status?: "sending" | "sent" | "delivered" | "read" | "failed"
  threadCount?: number
}

interface Reaction {
  emoji: string
  count: number
  users: string[]
}

interface FileAccess {
  id: string
  fileName: string
  userName: string
  action: "view" | "download" | "share" | "edit" | "delete"
  timestamp: Date
  securityLevel: "standard" | "confidential" | "restricted"
  status: "success" | "denied" | "warning"
  encryptionStatus?: "encrypted" | "decrypted" | "pending"
  fileSize?: number
  fileType?: string
}

interface SecurityEvent {
  id: string
  type: "access_attempt" | "encryption" | "decryption" | "security_alert" | "compliance_check"
  description: string
  timestamp: Date
  severity: "low" | "medium" | "high" | "critical"
  userId?: string
  fileId?: string
  ipAddress?: string
  location?: string
}

interface StakeholderChannel {
  id: string
  name: string
  type: "support" | "mentorship" | "investor" | "startup" | "employee" | "partner"
  icon: any
  description: string
  unreadCount: number
  isActive: boolean
  priority: "high" | "medium" | "low"
}

export function CommunicationHubEnhanced() {
  const {
    messages,
    sendMessage,
    addReaction,
    togglePinMessage,
    editMessage,
    deleteMessage,
    addToThread,
    markAsRead,
    isTyping,
    onlineUsers,
    encryptionEnabled,
    securityAlerts,
    handleTyping,
    setEncryptionEnabled,
  } = useCommunication()

  const [activeTab, setActiveTab] = useState("chat")
  const [newMessage, setNewMessage] = useState("")
  const [replyTo, setReplyTo] = useState<string | null>(null)
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null)
  const [messageSearch, setMessageSearch] = useState("")
  const [showSecurityPanel, setShowSecurityPanel] = useState(false)
  const [currentChannel, setCurrentChannel] = useState("general")
  const [showQuickActions, setShowQuickActions] = useState(false)
  const [showSupportPanel, setShowSupportPanel] = useState(false)
  const [showStakeholderChannels, setShowStakeholderChannels] = useState(true)
  const [callStatus, setCallStatus] = useState<"idle" | "connecting" | "connected" | "ended">("idle")
  const [videoStatus, setVideoStatus] = useState<"idle" | "connecting" | "connected" | "ended">("idle")
  const [screenShare, setScreenShare] = useState(false)
  const [muted, setMuted] = useState(false)
  const [cameraOff, setCameraOff] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Stakeholder channels for centralized communication
  const stakeholderChannels: StakeholderChannel[] = [
    {
      id: "support",
      name: "GrowthLab Support",
      type: "support",
      icon: Headphones,
      description: "Get help from our support team",
      unreadCount: 3,
      isActive: true,
      priority: "high"
    },
    {
      id: "mentorship",
      name: "Mentor Connect",
      type: "mentorship",
      icon: GraduationCap,
      description: "Connect with industry mentors",
      unreadCount: 1,
      isActive: true,
      priority: "high"
    },
    {
      id: "investors",
      name: "Investor Relations",
      type: "investor",
      icon: DollarSign,
      description: "Connect with potential investors",
      unreadCount: 0,
      isActive: true,
      priority: "medium"
    },
    {
      id: "startups",
      name: "Startup Network",
      type: "startup",
      icon: Rocket,
      description: "Connect with fellow startups",
      unreadCount: 5,
      isActive: true,
      priority: "medium"
    },
    {
      id: "employees",
      name: "GrowthLab Team",
      type: "employee",
      icon: Building2,
      description: "Internal team communications",
      unreadCount: 2,
      isActive: true,
      priority: "high"
    },
    {
      id: "partners",
      name: "Partner Network",
      type: "partner",
      icon: Globe,
      description: "Connect with our partners",
      unreadCount: 0,
      isActive: true,
      priority: "medium"
    }
  ]

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Simulate real-time typing indicator
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        handleTyping(currentChannel, true)
        setTimeout(() => handleTyping(currentChannel, false), 3000)
      }
    }, 10000)
    return () => clearInterval(interval)
  }, [currentChannel, handleTyping])

  const getSecurityIcon = (level: string) => {
    switch (level) {
      case "standard":
        return <ShieldCheck className="h-4 w-4 text-green-500" />
      case "confidential":
        return <Lock className="h-4 w-4 text-amber-500" />
      case "restricted":
        return <ShieldAlert className="h-4 w-4 text-red-500" />
      default:
        return <ShieldCheck className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      success: "bg-green-100 text-green-800",
      denied: "bg-red-100 text-red-800",
      warning: "bg-yellow-100 text-yellow-800"
    }
    return <Badge className={cn("text-xs", variants[status as keyof typeof variants])}>{status}</Badge>
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "low":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "medium":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "high":
        return <ShieldAlert className="h-4 w-4 text-orange-500" />
      case "critical":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50 border-red-200"
      case "medium":
        return "text-amber-600 bg-amber-50 border-amber-200"
      case "low":
        return "text-green-600 bg-green-50 border-green-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      sendMessage(currentChannel, newMessage, replyTo || undefined)
      setNewMessage("")
      setReplyTo(null)
    }
  }

  const handleReaction = (messageId: string, emoji: string) => {
    addReaction(messageId, emoji)
  }

  const handleReply = (messageId: string) => {
    setReplyTo(messageId)
    const message = messages[currentChannel]?.find(m => m.id === messageId)
    if (message) {
      setNewMessage(`Replying to ${message.sender.name}: `)
    }
  }

  const handleEditMessage = (messageId: string, newContent: string) => {
    editMessage(messageId, newContent)
    setSelectedMessage(null)
  }

  const handleDeleteMessage = (messageId: string) => {
    deleteMessage(messageId)
    setSelectedMessage(null)
  }

  const handlePinMessage = (messageId: string) => {
    togglePinMessage(currentChannel, messageId)
  }

  const handleFileUpload = (file: File) => {
    const messageId = sendMessage(currentChannel, file.name)
    // Simulate file processing
    setTimeout(() => {
      // Update message status
    }, 2000)
  }

  const handleStartCall = () => {
    setCallStatus("connecting")
    setTimeout(() => setCallStatus("connected"), 2000)
  }

  const handleStartVideo = () => {
    setVideoStatus("connecting")
    setTimeout(() => setVideoStatus("connected"), 2000)
  }

  const handleScreenShare = () => {
    setScreenShare(!screenShare)
  }

  const handleMuteToggle = () => {
    setMuted(!muted)
  }

  const handleCameraToggle = () => {
    setCameraOff(!cameraOff)
  }

  const handleSupportRequest = () => {
    setShowSupportPanel(true)
    setCurrentChannel("support")
  }

  const currentMessages = messages[currentChannel] || []
  const filteredMessages = currentMessages.filter(msg => 
    messageSearch === "" || 
    msg.content.toLowerCase().includes(messageSearch.toLowerCase()) ||
    msg.sender.name.toLowerCase().includes(messageSearch.toLowerCase())
  )

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">GrowthLab Communication Hub</h1>
            <p className="text-sm text-muted-foreground">
              Centralized platform for all stakeholder communications
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {securityAlerts > 0 && (
              <Badge variant="destructive" className="flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                {securityAlerts}
              </Badge>
            )}
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowSecurityPanel(!showSecurityPanel)}
              className="flex items-center gap-2"
            >
              <Activity className="h-4 w-4" />
              Security
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowQuickActions(!showQuickActions)}
              className="flex items-center gap-2"
            >
              <Zap className="h-4 w-4" />
              Quick Actions
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowStakeholderChannels(!showStakeholderChannels)}
              className="flex items-center gap-2"
            >
              <Users2 className="h-4 w-4" />
              Stakeholders
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Actions Panel */}
      {showQuickActions && (
        <div className="border-b p-4 bg-blue-50">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-blue-900">Quick Actions</h3>
            <Button variant="ghost" size="sm" onClick={() => setShowQuickActions(false)}>
              <XCircle className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleSupportRequest}
              className="flex items-center gap-2"
            >
              <Headphones className="h-4 w-4" />
              Get Support
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleStartCall}
              className="flex items-center gap-2"
            >
              <Phone className="h-4 w-4" />
              Start Call
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleStartVideo}
              className="flex items-center gap-2"
            >
              <Video className="h-4 w-4" />
              Video Call
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Share Files
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2"
            >
              <Users className="h-4 w-4" />
              Create Team
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2"
            >
              <Calendar className="h-4 w-4" />
              Schedule Meeting
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2"
            >
              <BookOpen className="h-4 w-4" />
              Resources
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2"
            >
              <HelpCircle className="h-4 w-4" />
              Help Center
            </Button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-80 border-r bg-gray-50 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-4">
              <Input 
                placeholder="Search messages, files, people..." 
                className="flex-1" 
                value={messageSearch}
                onChange={(e) => setMessageSearch(e.target.value)}
              />
              <Button variant="ghost" size="sm">
                <Search className="h-4 w-4" />
              </Button>
            </div>

            {/* Stakeholder Channels */}
            {showStakeholderChannels && (
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3 text-gray-700">Stakeholder Channels</h3>
                <div className="space-y-2">
                  {stakeholderChannels.map((channel) => (
                    <Button
                      key={channel.id}
                      variant={currentChannel === channel.id ? "default" : "ghost"}
                      className={cn(
                        "w-full justify-start h-auto p-3",
                        currentChannel === channel.id && "bg-blue-100 text-blue-900"
                      )}
                      onClick={() => setCurrentChannel(channel.id)}
                    >
                      <div className="flex items-center w-full">
                        <channel.icon className="h-4 w-4 mr-3" />
                        <div className="flex-1 text-left">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{channel.name}</span>
                            {channel.unreadCount > 0 && (
                              <Badge variant="secondary" className="ml-2">
                                {channel.unreadCount}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{channel.description}</p>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Button
                variant={activeTab === "chat" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("chat")}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat
              </Button>
              <Button
                variant={activeTab === "calls" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("calls")}
              >
                <Phone className="h-4 w-4 mr-2" />
                Calls
              </Button>
              <Button
                variant={activeTab === "video" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("video")}
              >
                <Video className="h-4 w-4 mr-2" />
                Video Calls
              </Button>
              <Button
                variant={activeTab === "files" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("files")}
              >
                <FileText className="h-4 w-4 mr-2" />
                Files
              </Button>
              <Button
                variant={activeTab === "teams" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("teams")}
              >
                <Users className="h-4 w-4 mr-2" />
                Teams
              </Button>
            </div>

            {/* Online Users */}
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-2">Online ({onlineUsers.length})</h3>
              <div className="space-y-1">
                {onlineUsers.map((user, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>{user}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Status */}
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-2">Security Status</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  {encryptionEnabled ? (
                    <Key className="h-4 w-4 text-green-500" />
                  ) : (
                    <EyeOff className="h-4 w-4 text-red-500" />
                  )}
                  <span>Encryption: {encryptionEnabled ? "Enabled" : "Disabled"}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <ShieldCheck className="h-4 w-4 text-green-500" />
                  <span>Security: Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Area */}
        <div className="flex-1 flex flex-col">
          {activeTab === "chat" && (
            <div className="flex-1 flex flex-col">
              {/* Chat Header */}
              <div className="border-b p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-semibold">
                      {stakeholderChannels.find(c => c.id === currentChannel)?.name || "Team Chat"}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {onlineUsers.length} members online
                      {isTyping[currentChannel] && <span className="text-blue-500 ml-2">• Someone is typing...</span>}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleStartCall}
                      className={cn(
                        callStatus === "connected" && "bg-green-100 text-green-700 border-green-300"
                      )}
                    >
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleStartVideo}
                      className={cn(
                        videoStatus === "connected" && "bg-green-100 text-green-700 border-green-300"
                      )}
                    >
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex group",
                      message.isOwn ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-xs lg:max-w-md px-4 py-2 rounded-lg relative",
                        message.isOwn
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100"
                      )}
                    >
                      {/* Message Header */}
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium">{message.sender.name}</span>
                        {message.securityLevel && getSecurityIcon(message.securityLevel)}
                        {message.isEncrypted && <Key className="h-3 w-3 text-green-500" />}
                        {message.isPinned && <Pin className="h-3 w-3 text-amber-500" />}
                        {message.isEdited && (
                          <span className="text-xs opacity-70">(edited)</span>
                        )}
                        {message.status && (
                          <span className="text-xs opacity-70">
                            {message.status === "sending" && <Clock className="h-3 w-3" />}
                            {message.status === "sent" && <CheckCircle className="h-3 w-3" />}
                            {message.status === "delivered" && <CheckCircle className="h-3 w-3" />}
                            {message.status === "read" && <CheckCircle className="h-3 w-3" />}
                          </span>
                        )}
                      </div>

                      {/* Reply Context */}
                      {message.replyTo && (
                        <div className="text-xs opacity-70 mb-1 border-l-2 pl-2">
                          Replying to message
                        </div>
                      )}

                      {/* Message Content */}
                      <div className="flex items-center space-x-2">
                        {message.attachments?.some(a => a.type === "file") && <FileText className="h-4 w-4" />}
                        <span>{message.content}</span>
                      </div>

                      {/* Message Footer */}
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs opacity-70">
                          {format(message.timestamp, "HH:mm")}
                        </span>
                        
                        {/* Message Actions */}
                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => handleReaction(message.id, "👍")}
                          >
                            👍
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => handleReaction(message.id, "❤️")}
                          >
                            ❤️
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => handleReply(message.id)}
                          >
                            <Reply className="h-3 w-3" />
                          </Button>
                          {message.isOwn && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => setSelectedMessage(message.id)}
                            >
                              <MoreHorizontal className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* Reactions */}
                      {message.reactions && message.reactions.length > 0 && (
                        <div className="flex items-center space-x-1 mt-2">
                          {message.reactions.map((reaction, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {reaction.emoji} {reaction.count}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Thread Indicator */}
                      {message.threadCount && message.threadCount > 0 && (
                        <div className="mt-2 text-xs opacity-70">
                          {message.threadCount} replies
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="border-t p-4">
                {replyTo && (
                  <div className="mb-2 p-2 bg-gray-100 rounded-lg flex items-center justify-between">
                    <span className="text-sm">Replying to message</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setReplyTo(null)}
                    >
                      <XCircle className="h-3 w-3" />
                    </Button>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Smile className="h-4 w-4" />
                  </Button>
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button variant="ghost" size="sm">
                    <Mic className="h-4 w-4" />
                  </Button>
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "calls" && (
            <div className="flex-1 p-4">
              <div className="text-center py-8">
                <Phone className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Voice Calls</h3>
                <p className="text-muted-foreground mb-4">
                  Start secure voice calls with your team members and stakeholders
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={handleStartCall} className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Start Call
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Schedule Call
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "video" && (
            <div className="flex-1 p-4">
              <div className="text-center py-8">
                <Video className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Video Calls</h3>
                <p className="text-muted-foreground mb-4">
                  Start secure video calls with screen sharing capabilities
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={handleStartVideo} className="flex items-center gap-2">
                    <Video className="h-4 w-4" />
                    Start Video Call
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <ScreenShare className="h-4 w-4" />
                    Screen Share
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "files" && (
            <div className="flex-1 p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Secure File Sharing</h2>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Upload File
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center text-green-600">
                        <ShieldCheck className="h-5 w-5 mr-2" />
                        Standard
                      </CardTitle>
                      <CardDescription>Basic protection for non-sensitive files</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm space-y-2">
                        <li className="flex items-start">
                          <ShieldCheck className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>Basic access controls</span>
                        </li>
                        <li className="flex items-start">
                          <ShieldCheck className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                          <span>Basic tracking of file access</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center text-amber-600">
                        <Lock className="h-5 w-5 mr-2" />
                        Confidential
                      </CardTitle>
                      <CardDescription>Enhanced protection with comprehensive tracking</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm space-y-2">
                        <li className="flex items-start">
                          <Lock className="h-4 w-4 text-amber-500 mr-2 mt-0.5" />
                          <span>Enhanced access controls</span>
                        </li>
                        <li className="flex items-start">
                          <Lock className="h-4 w-4 text-amber-500 mr-2 mt-0.5" />
                          <span>Comprehensive tracking and logging</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center text-red-600">
                        <ShieldAlert className="h-5 w-5 mr-2" />
                        Restricted
                      </CardTitle>
                      <CardDescription>Maximum protection with strict access controls</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="text-sm space-y-2">
                        <li className="flex items-start">
                          <ShieldAlert className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
                          <span>Maximum security controls</span>
                        </li>
                        <li className="flex items-start">
                          <ShieldAlert className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
                          <span>Watermarking and document protection</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {activeTab === "teams" && (
            <div className="flex-1 p-4">
              <div className="text-center py-8">
                <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Team Management</h3>
                <p className="text-muted-foreground mb-4">
                  Manage your teams and collaboration groups
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Create Team
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    Invite Members
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