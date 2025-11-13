'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { 
  MessageSquare, 
  Hash, 
  Video, 
  Calendar, 
  Phone, 
  Mail, 
  FileText, 
  Shield, 
  Zap, 
  Star, 
  Settings, 
  Plus, 
  Send, 
  Paperclip, 
  Smile, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Copy, 
  Flag, 
  Heart, 
  ThumbsUp, 
  Reply, 
  Forward, 
  Archive, 
  Mute, 
  Block, 
  Report, 
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
  RotateCw as RotateCwIcon, 
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
  CheckCircle, 
  AlertCircle, 
  AlertTriangle, 
  Check, 
  XCircle, 
  Info, 
  ChevronDown, 
  ChevronUp, 
  ChevronLeft, 
  ChevronRight, 
  ArrowLeft, 
  ArrowRight, 
  ArrowUp, 
  ArrowDown, 
  Download, 
  Upload, 
  Share2, 
  Lock, 
  Unlock, 
  Eye, 
  EyeOff, 
  Key, 
  ShieldCheck, 
  ShieldAlert, 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart, 
  LineChart, 
  Target, 
  Award, 
  Trophy, 
  Medal, 
  Crown, 
  Star as StarIcon, 
  Heart as HeartIcon, 
  Zap as ZapIcon, 
  Flash, 
  Sparkles, 
  Fire, 
  Droplets, 
  Cloud, 
  CloudRain, 
  CloudLightning, 
  CloudSnow, 
  Sun, 
  Moon, 
  Sunrise, 
  Sunset, 
  Globe, 
  Map, 
  Navigation, 
  Compass, 
  Home, 
  Building, 
  Building2, 
  Store, 
  ShoppingCart, 
  CreditCard, 
  DollarSign, 
  Euro, 
  PoundSterling, 
  Yen, 
  Bitcoin, 
  Wallet, 
  PiggyBank, 
  Banknote, 
  Coins, 
  Receipt, 
  Calculator, 
  Percent, 
  Minus, 
  Divide, 
  Equal, 
  AtSign, 
  Number,
  ExternalLink,
  Bell,
  Volume2,
  VolumeX,
  Moon as MoonIcon,
  BellOff,
  Minimize2,
  Maximize2,
  User,
  Mic,
  SquareMIcon as MicSquare,
  StopCircle,
  Users,
  Search,
  Menu,
  X,
  PanelLeft,
  PanelRight,
  Bookmark,
  HelpCircle,
  PersonStanding,
  Pin
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Types
interface Message {
  id: string
  content: string
  timestamp: Date
  sender: ChatUser
  status: 'sending' | 'sent' | 'delivered' | 'read' | 'failed'
  isEdited?: boolean
  platform: 'whatsapp' | 'slack' | 'email' | 'sms'
}

interface ChatUser {
  id: string
  name: string
  avatar?: string
  email?: string
  role?: string
  status?: 'online' | 'away' | 'offline' | 'busy'
  platform?: 'whatsapp' | 'slack' | 'email' | 'sms'
}

interface Channel {
  id: string
  name: string
  unread: number
  pinned: boolean
  isArchived?: boolean
  isMuted?: boolean
  description?: string
  members?: number
  lastActivity?: Date
  category?: string
  platform: 'slack' | 'whatsapp' | 'email'
}

interface DirectMessage {
  id: string
  name: string
  avatar?: string
  status?: 'online' | 'away' | 'offline' | 'busy'
  unread: number
  isGroup?: boolean
  members?: ChatUser[]
  lastMessage?: string
  lastActivity?: Date
  isPinned?: boolean
  platform: 'whatsapp' | 'slack' | 'email' | 'sms'
}

interface PlatformIntegration {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  bgColor: string
  isConnected: boolean
  status: 'online' | 'offline' | 'connecting' | 'error'
  unreadCount: number
  lastSync?: Date
}

interface WhatsAppContact {
  id: string
  name: string
  phone: string
  avatar?: string
  status?: string
  lastSeen?: Date
  isBusiness?: boolean
  unreadCount: number
}

interface SlackWorkspace {
  id: string
  name: string
  domain: string
  icon?: string
  memberCount: number
  channels: Channel[]
  isConnected: boolean
}

interface GoogleMeetMeeting {
  id: string
  title: string
  startTime: Date
  endTime: Date
  participants: string[]
  isRecurring: boolean
  link: string
  status: 'scheduled' | 'ongoing' | 'ended'
}

export function UnifiedCommunicationHub() {
  const [activeTab, setActiveTab] = useState('unified')
  const [activePlatform, setActivePlatform] = useState<'whatsapp' | 'slack' | 'meet' | 'email'>('whatsapp')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showPinnedOnly, setShowPinnedOnly] = useState(false)
  const [activeChannel, setActiveChannel] = useState<string | null>(null)
  const [activeDirectMessage, setActiveDirectMessage] = useState<string | null>(null)
  const [showCallInterface, setShowCallInterface] = useState(false)
  const [callType, setCallType] = useState<'audio' | 'video'>('audio')
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [isFullScreen, setIsFullScreen] = useState(false)

  // Platform integrations
  const platformIntegrations: PlatformIntegration[] = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: MessageSquare,
      color: 'text-green-500',
      bgColor: 'bg-green-500',
      isConnected: true,
      status: 'online',
      unreadCount: 12,
      lastSync: new Date()
    },
    {
      id: 'slack',
      name: 'Slack',
      icon: Hash,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500',
      isConnected: true,
      status: 'online',
      unreadCount: 8,
      lastSync: new Date()
    },
    {
      id: 'meet',
      name: 'Google Meet',
      icon: Video,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500',
      isConnected: true,
      status: 'online',
      unreadCount: 0,
      lastSync: new Date()
    },
    {
      id: 'email',
      name: 'Email',
      icon: Mail,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500',
      isConnected: true,
      status: 'online',
      unreadCount: 25,
      lastSync: new Date()
    }
  ]

  // WhatsApp contacts
  const whatsappContacts: WhatsAppContact[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      phone: '+65 9123 4567',
      avatar: '/abstract-geometric-shapes.png',
      status: 'Hey there! I am using WhatsApp',
      lastSeen: new Date(),
      unreadCount: 2
    },
    {
      id: '2',
      name: 'David Wong',
      phone: '+65 9234 5678',
      avatar: '/abstract-geometric-aw.png',
      status: 'Available',
      lastSeen: new Date(Date.now() - 3600000),
      unreadCount: 0
    },
    {
      id: '3',
      name: 'Team Alpha',
      phone: '+65 9345 6789',
      status: 'Group • 8 members',
      lastSeen: new Date(Date.now() - 1800000),
      unreadCount: 5,
      isBusiness: true
    }
  ]

  // Slack workspaces
  const slackWorkspaces: SlackWorkspace[] = [
    {
      id: '1',
      name: 'GrowthLab Team',
      domain: 'growthlab.slack.com',
      memberCount: 24,
      channels: [
        {
          id: 'general',
          name: 'general',
          unread: 3,
          pinned: true,
          category: 'general',
          members: 24,
          description: 'General discussions for everyone',
          platform: 'slack'
        },
        {
          id: 'announcements',
          name: 'announcements',
          unread: 1,
          pinned: true,
          category: 'general',
          members: 24,
          description: 'Important announcements',
          platform: 'slack'
        }
      ],
      isConnected: true
    }
  ]

  // Google Meet meetings
  const googleMeetMeetings: GoogleMeetMeeting[] = [
    {
      id: '1',
      title: 'Weekly Team Standup',
      startTime: new Date(Date.now() + 3600000),
      endTime: new Date(Date.now() + 5400000),
      participants: ['Sarah Chen', 'David Wong', 'Team Alpha'],
      isRecurring: true,
      link: 'https://meet.google.com/abc-defg-hij',
      status: 'scheduled'
    },
    {
      id: '2',
      title: 'Product Review Meeting',
      startTime: new Date(Date.now() + 7200000),
      endTime: new Date(Date.now() + 9000000),
      participants: ['Product Team', 'Design Team'],
      isRecurring: false,
      link: 'https://meet.google.com/xyz-uvw-rst',
      status: 'scheduled'
    }
  ]

  // Mock channels and direct messages
  const channels: Channel[] = [
    ...(slackWorkspaces[0] ? slackWorkspaces[0].channels : undefined),
    {
      id: 'whatsapp-business',
      name: 'WhatsApp Business',
      unread: 0,
      pinned: false,
      category: 'business',
      members: 12,
      description: 'Business communications',
      platform: 'whatsapp'
    }
  ]

  const directMessages: DirectMessage[] = [
    {
      id: 'sarah-whatsapp',
      name: 'Sarah Chen (WhatsApp)',
      avatar: '/abstract-geometric-shapes.png',
      status: 'online',
      unread: 2,
      lastMessage: 'Looking forward to our meeting tomorrow!',
      lastActivity: new Date(),
      isPinned: true,
      platform: 'whatsapp'
    },
    {
      id: 'david-slack',
      name: 'David Wong (Slack)',
      avatar: '/abstract-geometric-aw.png',
      status: 'away',
      unread: 0,
      lastMessage: 'I\'ll send you the presentation by EOD',
      lastActivity: new Date(Date.now() - 3600000),
      isPinned: false,
      platform: 'slack'
    }
  ]

  // Filter functions
  const filteredChannels = channels.filter((channel) => {
    const matchesSearch = searchQuery ? channel.name.toLowerCase().includes(searchQuery.toLowerCase()) : true
    const matchesPinned = showPinnedOnly ? channel.pinned : true
    const matchesPlatform = activePlatform === 'slack' ? channel.platform === 'slack' : true
    return matchesSearch && matchesPinned && matchesPlatform
  })

  const filteredDirectMessages = directMessages.filter((dm) => {
    const matchesSearch = searchQuery
      ? dm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (dm.lastMessage?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
      : true
    const matchesPinned = showPinnedOnly ? (dm.isPinned ?? false) : true
    const matchesPlatform = activePlatform === 'whatsapp' ? dm.platform === 'whatsapp' : true
    return matchesSearch && matchesPinned && matchesPlatform
  })

  const filteredWhatsappContacts = whatsappContacts.filter((contact) => {
    const matchesSearch = searchQuery
      ? contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.phone.includes(searchQuery)
      : true
    return matchesSearch
  })

  // Platform-specific content rendering
  const renderWhatsAppContent = () => (
    <div className="flex h-full">
      {/* WhatsApp Sidebar */}
      <div className="w-80 border-r flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">WhatsApp</h2>
            <Button size="sm" variant="outline">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Input
            placeholder="Search or start new chat"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {filteredWhatsappContacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted cursor-pointer"
                onClick={() => setActiveDirectMessage(contact.id)}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={contact.avatar} />
                  <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium truncate">{contact.name}</h3>
                    {contact.unreadCount > 0 && (
                      <Badge variant="destructive" className="h-5 w-5 p-0 flex items-center justify-center text-xs">
                        {contact.unreadCount}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{contact.status}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* WhatsApp Chat Area */}
      <div className="flex-1 flex flex-col">
        {activeDirectMessage ? (
          <>
            {/* Chat Header */}
            <div className="h-16 border-b flex items-center justify-between px-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={whatsappContacts.find(c => c.id === activeDirectMessage)?.avatar} />
                  <AvatarFallback>
                    {whatsappContacts.find(c => c.id === activeDirectMessage)?.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">
                    {whatsappContacts.find(c => c.id === activeDirectMessage)?.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">online</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {/* Mock messages */}
                <div className="flex justify-end">
                  <div className="bg-green-500 text-white rounded-lg px-3 py-2 max-w-xs">
                    <p>Hey! How are you doing?</p>
                    <p className="text-xs text-green-100 mt-1">12:30 PM</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-gray-200 text-gray-900 rounded-lg px-3 py-2 max-w-xs">
                    <p>Hi! I'm doing great, thanks for asking. How about you?</p>
                    <p className="text-xs text-gray-500 mt-1">12:32 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Input */}
            <div className="h-16 border-t p-4">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Input
                  placeholder="Type a message"
                  className="flex-1"
                />
                <Button variant="ghost" size="icon">
                  <Smile className="h-4 w-4" />
                </Button>
                <Button>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Select a chat</h3>
              <p className="text-muted-foreground">Choose a contact to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  const renderSlackContent = () => (
    <div className="flex h-full">
      {/* Slack Sidebar */}
      <div className="w-80 border-r flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Slack</h2>
            <Button size="sm" variant="outline">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Input
            placeholder="Search channels and messages"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {filteredChannels.map((channel) => (
              <div
                key={channel.id}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted cursor-pointer"
                onClick={() => setActiveChannel(channel.id)}
              >
                <Hash className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium truncate">#{channel.name}</h3>
                    {channel.unread > 0 && (
                      <Badge variant="destructive" className="h-5 w-5 p-0 flex items-center justify-center text-xs">
                        {channel.unread}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{channel.description}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Slack Chat Area */}
      <div className="flex-1 flex flex-col">
        {activeChannel ? (
          <>
            {/* Channel Header */}
            <div className="h-16 border-b flex items-center justify-between px-4">
              <div className="flex items-center gap-3">
                <Hash className="h-5 w-5 text-muted-foreground" />
                <div>
                  <h3 className="font-medium">#{channels.find(c => c.id === activeChannel)?.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {channels.find(c => c.id === activeChannel)?.members} members
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Channel Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {/* Mock messages */}
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">Sarah Chen</span>
                      <span className="text-xs text-muted-foreground">12:30 PM</span>
                    </div>
                    <p>Hey team! How's the project coming along?</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>DW</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">David Wong</span>
                      <span className="text-xs text-muted-foreground">12:32 PM</span>
                    </div>
                    <p>Making good progress! Should have the prototype ready by Friday.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Message Input */}
            <div className="h-16 border-t p-4">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Input
                  placeholder="Message #general"
                  className="flex-1"
                />
                <Button variant="ghost" size="icon">
                  <Smile className="h-4 w-4" />
                </Button>
                <Button>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Hash className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Select a channel</h3>
              <p className="text-muted-foreground">Choose a channel to start collaborating</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  const renderGoogleMeetContent = () => (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Google Meet</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Meeting
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {googleMeetMeetings.map((meeting) => (
          <Card key={meeting.id}>
            <CardHeader>
              <CardTitle className="text-lg">{meeting.title}</CardTitle>
              <CardDescription>
                {meeting.startTime.toLocaleDateString()} at {meeting.startTime.toLocaleTimeString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{meeting.participants.length} participants</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {meeting.isRecurring ? 'Recurring' : 'One-time'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={meeting.status === 'scheduled' ? 'default' : 'secondary'}>
                  {meeting.status}
                </Badge>
              </div>
            </CardContent>
            <div className="p-4 pt-0">
              <Button className="w-full" variant="outline">
                <Video className="h-4 w-4 mr-2" />
                Join Meeting
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderEmailContent = () => (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Email</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Compose
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Inbox</CardTitle>
            <CardDescription>25 unread messages</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">
              <Mail className="h-4 w-4 mr-2" />
              View Inbox
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Drafts</CardTitle>
            <CardDescription>3 saved drafts</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              View Drafts
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Sent</CardTitle>
            <CardDescription>156 sent messages</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">
              <Send className="h-4 w-4 mr-2" />
              View Sent
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  // Main content rendering
  const renderMainContent = () => {
    switch (activePlatform) {
      case 'whatsapp':
        return renderWhatsAppContent()
      case 'slack':
        return renderSlackContent()
      case 'meet':
        return renderGoogleMeetContent()
      case 'email':
        return renderEmailContent()
      default:
        return renderWhatsAppContent()
    }
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="h-16 border-b flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">Unified Communication Hub</h1>
          <Badge variant="secondary">All Platforms Connected</Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Platform Tabs */}
      <div className="border-b">
        <Tabs value={activePlatform} onValueChange={(value) => setActivePlatform(value as any)}>
          <TabsList className="grid w-full grid-cols-4 h-14">
            {platformIntegrations.map((platform) => (
              <TabsTrigger
                key={platform.id}
                value={platform.id as any}
                className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
              >
                <platform.icon className={cn("h-4 w-4", platform.color)} />
                <span>{platform.name}</span>
                {platform.unreadCount > 0 && (
                  <Badge variant="destructive" className="h-5 w-5 p-0 flex items-center justify-center text-xs">
                    {platform.unreadCount > 9 ? '9+' : platform.unreadCount}
                  </Badge>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {renderMainContent()}
      </div>
    </div>
  )
}
