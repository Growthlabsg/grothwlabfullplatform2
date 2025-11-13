"use client"

import { useState, useEffect } from "react"
import { Bell, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type NotificationType = "like" | "comment" | "mention" | "follow" | "system"

interface Notification {
  id: string
  type: NotificationType
  content: string
  timestamp: Date
  read: boolean
  user?: {
    name: string
    avatar?: string
  }
  link: string
}

export function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [open, setOpen] = useState(false)

  // Mock notifications - in a real app, this would come from an API
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: "1",
        type: "like",
        content: "liked your post about startup funding",
        timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
        read: false,
        user: {
          name: "Sarah Chen",
          avatar: "/abstract-geometric-shapes.png",
        },
        link: "/feed/post/1",
      },
      {
        id: "2",
        type: "comment",
        content: "commented on your post about AI in healthcare",
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        read: false,
        user: {
          name: "Alex Wong",
          avatar: "/abstract-geometric-aw.png",
        },
        link: "/feed/post/2",
      },
      {
        id: "3",
        type: "mention",
        content: "mentioned you in a comment",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        read: true,
        user: {
          name: "Mei Lin",
          avatar: "/machine-learning-concept.png",
        },
        link: "/feed/post/3#comment-5",
      },
      {
        id: "4",
        type: "follow",
        content: "started following you",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        read: true,
        user: {
          name: "David Kumar",
        },
        link: "/profile/david-kumar",
      },
      {
        id: "5",
        type: "system",
        content: "Your post has been featured in the weekly digest",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
        read: true,
        link: "/feed/digest/weekly",
      },
    ]

    setNotifications(mockNotifications)
    setUnreadCount(mockNotifications.filter((n) => !n.read).length)
  }, [])

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => {
        if (notification?.id === id && !notification?.read) {
          setUnreadCount((count) => Math.max(0, count - 1))
          return { ...notification, read: true }
        }
        return notification
      }),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        read: true,
      })),
    )
    setUnreadCount(0)
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => {
      const notification = prev.find((n) => n.id === id)
      if (notification && !notification?.read) {
        setUnreadCount((count) => Math.max(0, count - 1))
      }
      return prev.filter((notification) => notification?.id !== id)
    })
  }

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "like":
        return "❤️"
      case "comment":
        return "💬"
      case "mention":
        return "📣"
      case "follow":
        return "👤"
      case "system":
        return "🔔"
      default:
        return "📌"
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffSec = Math.floor(diffMs / 1000)
    const diffMin = Math.floor(diffSec / 60)
    const diffHour = Math.floor(diffMin / 60)
    const diffDay = Math.floor(diffHour / 24)

    if (diffSec < 60) return "just now"
    if (diffMin < 60) return `${diffMin}m ago`
    if (diffHour < 24) return `${diffHour}h ago`
    if (diffDay < 7) return `${diffDay}d ago`

    return date.toLocaleDateString()
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between p-2">
          <DropdownMenuLabel className="text-base">Notifications</DropdownMenuLabel>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-8 text-xs">
              Mark all as read
            </Button>
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="max-h-[400px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              <p>No notifications</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification?.id}
                className={cn("flex items-start gap-2 p-3 cursor-pointer", !notification?.read && "bg-muted/50")}
                onClick={() => {
                  markAsRead(notification?.id)
                  setOpen(false)
                  // In a real app, this would navigate to the notification link
                }}
              >
                <div className="flex-shrink-0 mt-1">
                  {notification?.user ? (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={notification?.user.avatar || "/placeholder.svg"} alt={notification?.user.name} />
                      <AvatarFallback>{notification?.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="h-8 w-8 flex items-center justify-center rounded-full bg-primary/10">
                      <span>{getNotificationIcon(notification?.type)}</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm">
                    {notification?.user && <span className="font-medium">{notification?.user.name} </span>}
                    {notification?.content}
                  </p>
                  <p className="text-xs text-muted-foreground">{formatTime(notification?.timestamp)}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation()
                      markAsRead(notification?.id)
                    }}
                  >
                    <Check className="h-3 w-3" />
                    <span className="sr-only">Mark as read</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeNotification(notification?.id)
                    }}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </div>
              </DropdownMenuItem>
            ))
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer">
          <a href="/notifications/settings" className="w-full text-center text-sm">
            Notification Settings
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
