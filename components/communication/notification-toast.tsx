"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import {
  MessageSquare,
  Phone,
  Video,
  X,
  User,
  Bell,
  Check,
  Clock,
  AlertCircle,
  Info,
  Star,
  Download,
  Share2,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Mic,
  Camera,
  File,
  Calendar,
  MapPin,
  Users,
  Settings,
  Shield,
  Lock,
  Eye,
  Key,
  Activity,
  TrendingUp,
  BarChart3,
  PieChart,
  LineChart,
  Target,
  Award,
  Trophy,
  Medal,
  Crown,
  Zap,
  Zap,
  Sparkles,
  Flame,
  Droplets,
  Cloud,
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
  Store,
  ShoppingCart,
  CreditCard,
  DollarSign,
  Euro,
  PoundSterling,
  DollarSign,
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
  Hash,
  AtSign,
  Hash,
  ExternalLink,
  Volume
} from "lucide-react"

interface NotificationToastProps {
  type: "message" | "call" | "mention" | "reaction" | "file" | "calendar" | "voice" | "video" | "security" | "system"
  title: string
  message: string
  sender?: {
    name: string
    avatar?: string
  }
  timestamp: Date
  onDismiss: () => void
  onAction?: () => void
  className?: string
  priority?: "low" | "medium" | "high" | "urgent"
  actions?: Array<{
    label: string
    action: () => void
    variant?: "default" | "outline" | "destructive"
  }>
}

export function NotificationToast({
  type,
  title,
  message,
  sender,
  timestamp,
  onDismiss,
  onAction,
  className,
  priority = "medium",
  actions = []
}: NotificationToastProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onDismiss, 300)
    }, 5000)

    return () => clearTimeout(timer)
  }, [onDismiss])

  const getIcon = () => {
    switch (type) {
      case "message": return <MessageSquare className="h-4 w-4" />
      case "call": return <Phone className="h-4 w-4" />
      case "mention": return <AtSign className="h-4 w-4" />
      case "reaction": return <Star className="h-4 w-4" />
      case "file": return <File className="h-4 w-4" />
      case "calendar": return <Calendar className="h-4 w-4" />
      case "voice": return <Mic className="h-4 w-4" />
      case "video": return <Video className="h-4 w-4" />
      case "security": return <Shield className="h-4 w-4" />
      case "system": return <Settings className="h-4 w-4" />
      default: return <Bell className="h-4 w-4" />
    }
  }

  const getColor = () => {
    switch (priority) {
      case "urgent": return "border-red-500 bg-red-50"
      case "high": return "border-orange-500 bg-orange-50"
      case "medium": return "border-blue-500 bg-blue-50"
      case "low": return "border-gray-500 bg-gray-50"
      default: return "border-blue-500 bg-blue-50"
    }
  }

  const getTypeColor = () => {
    switch (type) {
      case "message": return "text-blue-600"
      case "call": return "text-green-600"
      case "mention": return "text-purple-600"
      case "reaction": return "text-yellow-600"
      case "file": return "text-gray-600"
      case "calendar": return "text-indigo-600"
      case "voice": return "text-pink-600"
      case "video": return "text-red-600"
      case "security": return "text-orange-600"
      case "system": return "text-gray-600"
      default: return "text-gray-600"
    }
  }

  return (
    <div
      className={cn(
        "fixed top-4 right-4 z-50 w-80 max-w-sm bg-white rounded-lg shadow-lg border transition-all duration-300",
        getColor(),
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0",
        className
      )}
    >
      <div className="p-4">
        <div className="flex items-start space-x-3">
          {sender?.avatar ? (
            <Avatar className="h-8 w-8">
              <AvatarImage src={sender.avatar} />
              <AvatarFallback>{sender.name.charAt(0)}</AvatarFallback>
            </Avatar>
          ) : (
            <div className={cn("h-8 w-8 rounded-full flex items-center justify-center", getTypeColor())}>
              {getIcon()}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-gray-900 truncate">{title}</h4>
              <div className="flex items-center space-x-1">
                <Badge variant="outline" className="text-xs">
                  {priority}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onDismiss}
                  className="h-4 w-4 p-0 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{message}</p>

            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-gray-500">
                {format(timestamp, "HH:mm")}
              </span>
              {onAction && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onAction}
                  className="text-xs h-6 px-2"
                >
                  View
                </Button>
              )}
            </div>

            {actions.length > 0 && (
              <div className="mt-3 pt-2 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  {actions.map((action, index) => (
                    <Button
                      key={index}
                      variant={action.variant || "outline"}
                      size="sm"
                      onClick={action.action}
                      className="text-xs h-6 px-2"
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

interface NotificationManagerProps {
  notifications: Array<{
    id: string
    type: "message" | "call" | "mention" | "reaction" | "file" | "calendar" | "voice" | "video" | "security" | "system"
    title: string
    message: string
    sender?: {
      name: string
      avatar?: string
    }
    timestamp: Date
    priority?: "low" | "medium" | "high" | "urgent"
    actions?: Array<{
      label: string
      action: () => void
      variant?: "default" | "outline" | "destructive"
    }>
  }>
  onDismiss: (id: string) => void
  onAction?: (id: string) => void
}

export function NotificationManager({ notifications, onDismiss, onAction }: NotificationManagerProps) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification, index) => (
        <NotificationToast
          key={notification?.id}
          type={notification?.type}
          title={notification?.title}
          message={notification?.message}
          sender={notification?.sender}
          timestamp={notification?.timestamp}
          priority={notification?.priority}
          actions={notification?.actions}
          onDismiss={() => onDismiss(notification?.id)}
          onAction={onAction ? () => onAction(notification?.id) : undefined}
          className="animate-in slide-in-from-right duration-300"
          style={{ animationDelay: `${index * 100}ms` }}
        />
      ))}
    </div>
  )
}

// Mock notification data for testing
export const mockNotifications = [
  {
    id: "1",
    type: "message" as const,
    title: "New message from Sarah Chen",
    message: "Hey! How's the project going? I have some updates to share.",
    sender: {
      name: "Sarah Chen",
      avatar: "/sarah-chen.png"
    },
    timestamp: new Date(),
    priority: "medium" as const,
    actions: [
      {
        label: "Reply",
        action: () => console.log("Reply to Sarah"),
        variant: "default" as const
      },
      {
        label: "Mark as read",
        action: () => console.log("Mark as read"),
        variant: "outline" as const
      }
    ]
  },
  {
    id: "2",
    type: "call" as const,
    title: "Incoming call from Alex Wong",
    message: "Alex is calling you. Tap to answer or decline.",
    sender: {
      name: "Alex Wong",
      avatar: "/alex-wong.png"
    },
    timestamp: new Date(),
    priority: "high" as const,
    actions: [
      {
        label: "Answer",
        action: () => console.log("Answer call"),
        variant: "default" as const
      },
      {
        label: "Decline",
        action: () => console.log("Decline call"),
        variant: "destructive" as const
      }
    ]
  },
  {
    id: "3",
    type: "file" as const,
    title: "File shared by Maria Garcia",
    message: "Maria shared 'presentation.pdf' in Team Chat",
    sender: {
      name: "Maria Garcia",
      avatar: "/maria-garcia.png"
    },
    timestamp: new Date(),
    priority: "low" as const,
    actions: [
      {
        label: "Download",
        action: () => console.log("Download file"),
        variant: "outline" as const
      },
      {
        label: "View",
        action: () => console.log("View file"),
        variant: "outline" as const
      }
    ]
  }
] 