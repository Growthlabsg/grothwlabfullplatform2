"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import {
  Hash,
  Users,
  Settings,
  Plus,
  MessageSquare,
  Bell,
  BellOff,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Trash2,
  Edit,
  Copy,
  Link,
  Globe,
  Building,
  User,
  UserPlus,
  UserMinus,
  Shield,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Key,
  Activity,
  TrendingUp,
  BarChart3,
  PieChart,
  Target,
  Award,
  Trophy,
  Star,
  Heart,
  Zap,
  Sparkles,
  Flame,
  Droplets,
  Cloud,
  CloudRain,
  CloudLightning,
  CloudSnow,
  Sun,
  Moon,
  Sunrise,
  Sunset,
  Map,
  Navigation,
  Compass,
  Home,
  Building2,
  Store,
  ShoppingCart,
  CreditCard,
  DollarSign,
  Euro,
  PoundSterling,
  Bitcoin,
  Wallet,
  PiggyBank,
  Banknote,
  Coins,
  Receipt,
  Calculator,
  Percent,
  TrendingDown,
  Minus,
  Divide,
  Equal,
  AtSign,
  Pin,
  FileText,
} from "lucide-react"

interface SlackChannel {
  id: string
  name: string
  description?: string
  members: number
  isPrivate: boolean
  isArchived: boolean
  lastActivity?: Date
  unreadCount: number
  topic?: string
  purpose?: string
  createdBy: string
  createdAt: Date
}

interface SlackUser {
  id: string
  name: string
  displayName: string
  avatar: string
  status: "online" | "away" | "offline" | "busy"
  isBot: boolean
  isAdmin: boolean
  timezone?: string
  email?: string
  phone?: string
  title?: string
  department?: string
  location?: string
}

interface SlackMessage {
  id: string
  channelId: string
  content: string
  sender: SlackUser
  timestamp: Date
  isEdited: boolean
  isPinned: boolean
  reactions: SlackReaction[]
  threadCount: number
  attachments: SlackAttachment[]
  blocks?: any[]
}

interface SlackReaction {
  name: string
  count: number
  users: string[]
}

interface SlackAttachment {
  id: string
  type: "image" | "file" | "video" | "audio" | "link"
  url: string
  title?: string
  description?: string
  size?: number
  duration?: number
  thumbnail?: string
}

interface SlackIntegrationProps {
  workspace: string
  onClose?: () => void
}

export function SlackIntegration({ workspace, onClose }: SlackIntegrationProps) {
  const [activeTab, setActiveTab] = useState<"channels" | "messages" | "users" | "settings">("channels")
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showArchived, setShowArchived] = useState(false)
  const [showPrivate, setShowPrivate] = useState(true)
  const [syncEnabled, setSyncEnabled] = useState(true)
  const [autoSync, setAutoSync] = useState(true)
  const [syncInterval, setSyncInterval] = useState(5)

  // Mock Slack data
  const channels: SlackChannel[] = [
    {
      id: "general",
      name: "general",
      description: "General discussions for everyone",
      members: 24,
      isPrivate: false,
      isArchived: false,
      lastActivity: new Date(Date.now() - 1000 * 60 * 30),
      unreadCount: 3,
      topic: "General discussions for the team",
      purpose: "This channel is for workspace-wide communication and announcements.",
      createdBy: "admin",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    },
    {
      id: "announcements",
      name: "announcements",
      description: "Important announcements and updates",
      members: 24,
      isPrivate: false,
      isArchived: false,
      lastActivity: new Date(Date.now() - 1000 * 60 * 60),
      unreadCount: 1,
      topic: "Important announcements",
      purpose: "Company-wide announcements and important updates.",
      createdBy: "admin",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 25),
    },
    {
      id: "random",
      name: "random",
      description: "Random conversations and fun stuff",
      members: 18,
      isPrivate: false,
      isArchived: false,
      lastActivity: new Date(Date.now() - 1000 * 60 * 15),
      unreadCount: 0,
      topic: "Random conversations",
      purpose: "A place for non-work banter and random conversations.",
      createdBy: "user1",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20),
    },
    {
      id: "project-alpha",
      name: "project-alpha",
      description: "Project Alpha development discussions",
      members: 8,
      isPrivate: true,
      isArchived: false,
      lastActivity: new Date(Date.now() - 1000 * 60 * 5),
      unreadCount: 2,
      topic: "Project Alpha",
      purpose: "Development discussions for Project Alpha.",
      createdBy: "user2",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
    },
  ]

  const users: SlackUser[] = [
    {
      id: "user1",
      name: "john.doe",
      displayName: "John Doe",
      avatar: "/john-doe.png",
      status: "online",
      isBot: false,
      isAdmin: true,
      timezone: "America/New_York",
      email: "john.doe@company.com",
      title: "Senior Developer",
      department: "Engineering",
      location: "New York",
    },
    {
      id: "user2",
      name: "jane.smith",
      displayName: "Jane Smith",
      avatar: "/jane-smith.png",
      status: "away",
      isBot: false,
      isAdmin: false,
      timezone: "America/Los_Angeles",
      email: "jane.smith@company.com",
      title: "Product Manager",
      department: "Product",
      location: "San Francisco",
    },
    {
      id: "user3",
      name: "mike.johnson",
      displayName: "Mike Johnson",
      avatar: "/mike-johnson.png",
      status: "offline",
      isBot: false,
      isAdmin: false,
      timezone: "Europe/London",
      email: "mike.johnson@company.com",
      title: "Designer",
      department: "Design",
      location: "London",
    },
  ]

  const messages: SlackMessage[] = [
    {
      id: "msg1",
      channelId: "general",
      content: "Good morning everyone! 👋",
      sender: users[0],
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      isEdited: false,
      isPinned: false,
      reactions: [
        { name: "wave", count: 3, users: ["user2", "user3", "user4"] },
        { name: "coffee", count: 1, users: ["user1"] },
      ],
      threadCount: 0,
      attachments: [],
    },
    {
      id: "msg2",
      channelId: "general",
      content: "Don't forget about the team meeting at 2 PM today!",
      sender: users[1],
      timestamp: new Date(Date.now() - 1000 * 60 * 25),
      isEdited: false,
      isPinned: true,
      reactions: [
        { name: "white_check_mark", count: 5, users: ["user1", "user2", "user3", "user4", "user5"] },
      ],
      threadCount: 2,
      attachments: [],
    },
    {
      id: "msg3",
      channelId: "general",
      content: "I've updated the project documentation. Check it out!",
      sender: users[2],
      timestamp: new Date(Date.now() - 1000 * 60 * 20),
      isEdited: true,
      isPinned: false,
      reactions: [
        { name: "eyes", count: 2, users: ["user1", "user2"] },
        { name: "thumbsup", count: 1, users: ["user3"] },
      ],
      threadCount: 0,
      attachments: [
        {
          id: "att1",
          type: "file",
          url: "/docs/project-update.pdf",
          title: "Project Update - Q1 2024",
          description: "Updated project documentation with latest changes",
          size: 2048576,
        },
      ],
    },
  ]

  const renderChannelItem = (channel: SlackChannel) => (
    <div
      key={channel.id}
      className={cn(
        "flex items-center space-x-3 p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors",
        selectedChannel === channel.id && "bg-gray-100 dark:bg-gray-800"
      )}
      onClick={() => setSelectedChannel(channel.id)}
    >
      <div className="relative">
        <div className={cn(
          "h-8 w-8 rounded flex items-center justify-center text-sm font-medium",
          channel.isPrivate ? "bg-purple-100 text-purple-600" : "bg-gray-100 text-gray-600"
        )}>
          <Hash className="h-4 w-4" />
        </div>
        {channel.unreadCount > 0 && (
          <Badge variant="secondary" className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs">
            {channel.unreadCount}
          </Badge>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium truncate">
            {channel.name}
            {channel.isPrivate && <Lock className="h-3 w-3 ml-1 text-gray-400" />}
          </h3>
          <span className="text-xs text-gray-500">{channel.members}</span>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
          {channel.description}
        </p>
      </div>
    </div>
  )

  const renderUserItem = (user: SlackUser) => (
    <div key={user.id} className="flex items-center space-x-3 p-3">
      <div className="relative">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.avatar} />
          <AvatarFallback className="text-xs">
            {user.displayName.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div className={cn(
          "absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white dark:border-gray-900",
          user.status === "online" && "bg-green-500",
          user.status === "away" && "bg-yellow-500",
          user.status === "offline" && "bg-gray-400",
          user.status === "busy" && "bg-red-500",
        )} />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium truncate">{user.displayName}</h3>
          {user.isAdmin && <Badge variant="outline" className="text-xs">Admin</Badge>}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
          {user.title} • {user.department}
        </p>
      </div>
    </div>
  )

  const renderMessage = (message: SlackMessage) => (
    <div key={message.id} className="flex space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">
      <Avatar className="h-8 w-8 mt-1">
        <AvatarImage src={message.sender.avatar} />
        <AvatarFallback className="text-xs">
          {message.sender.displayName.split(' ').map(n => n[0]).join('')}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2 mb-1">
          <span className="text-sm font-medium">{message.sender.displayName}</span>
          <span className="text-xs text-gray-500">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          {message.isEdited && <span className="text-xs text-gray-400">(edited)</span>}
          {message.isPinned && <Pin className="h-3 w-3 text-gray-400" />}
        </div>
        
        <p className="text-sm text-gray-900 dark:text-gray-100 mb-2">{message.content}</p>
        
        {message.attachments.length > 0 && (
          <div className="mb-2">
            {message.attachments.map(attachment => (
              <div key={attachment.id} className="border rounded p-2 bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium">{attachment.title}</span>
                </div>
                {attachment.description && (
                  <p className="text-xs text-gray-500 mt-1">{attachment.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
        
        {message.reactions.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {message.reactions.map(reaction => (
              <Badge key={reaction.name} variant="outline" className="text-xs">
                {reaction.name} {reaction.count}
              </Badge>
            ))}
          </div>
        )}
        
        {message.threadCount > 0 && (
          <div className="flex items-center space-x-1 mt-2 text-xs text-gray-500">
            <MessageSquare className="h-3 w-3" />
            <span>{message.threadCount} replies</span>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 bg-purple-500 rounded flex items-center justify-center">
            <Hash className="h-4 w-4 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">Slack Integration</h1>
            <p className="text-xs text-gray-500">{workspace}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Badge variant={syncEnabled ? "default" : "secondary"}>
            {syncEnabled ? "Synced" : "Not Synced"}
          </Badge>
          <Button variant="ghost" size="sm">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-80 border-r dark:border-gray-800 flex flex-col">
          <div className="p-4 border-b dark:border-gray-800">
            <Input
              placeholder="Search channels, messages, or users"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-4"
            />
            
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="channels">Channels</TabsTrigger>
                <TabsTrigger value="messages">Messages</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4 space-y-2">
              {activeTab === "channels" && (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium">Channels</h3>
                    <Button variant="ghost" size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {channels
                    .filter(channel => 
                      (showPrivate || !channel.isPrivate) &&
                      (showArchived || !channel.isArchived) &&
                      channel.name.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map(renderChannelItem)}
                </>
              )}
              
              {activeTab === "messages" && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium mb-4">Recent Messages</h3>
                  {messages
                    .filter(message => 
                      message.content.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map(renderMessage)}
                </div>
              )}
              
              {activeTab === "users" && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium mb-4">Team Members</h3>
                  {users
                    .filter(user => 
                      user.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      user.name.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map(renderUserItem)}
                </div>
              )}
              
              {activeTab === "settings" && (
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Sync Settings</CardTitle>
                      <CardDescription>Configure how Slack data is synchronized</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="sync-enabled">Enable Sync</Label>
                        <Switch
                          id="sync-enabled"
                          checked={syncEnabled}
                          onCheckedChange={setSyncEnabled}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="auto-sync">Auto Sync</Label>
                        <Switch
                          id="auto-sync"
                          checked={autoSync}
                          onCheckedChange={setAutoSync}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="sync-interval">Sync Interval (minutes)</Label>
                        <Input
                          id="sync-interval"
                          type="number"
                          value={syncInterval}
                          onChange={(e) => setSyncInterval(parseInt(e.target.value))}
                          min={1}
                          max={60}
                        />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Display Settings</CardTitle>
                      <CardDescription>Configure what channels to show</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="show-private">Show Private Channels</Label>
                        <Switch
                          id="show-private"
                          checked={showPrivate}
                          onCheckedChange={setShowPrivate}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="show-archived">Show Archived Channels</Label>
                        <Switch
                          id="show-archived"
                          checked={showArchived}
                          onCheckedChange={setShowArchived}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {selectedChannel ? (
            <div className="flex-1 flex flex-col">
              <div className="p-4 border-b dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-semibold">#{selectedChannel}</h2>
                    <p className="text-sm text-gray-500">
                      {channels.find(c => c.id === selectedChannel)?.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Bell className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages
                    .filter(message => message.channelId === selectedChannel)
                    .map(renderMessage)}
                </div>
              </ScrollArea>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Hash className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">Select a Channel</h3>
                <p className="text-gray-500">Choose a channel to view messages</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 