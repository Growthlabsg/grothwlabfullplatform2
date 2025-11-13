"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useNotifications } from "@/contexts/notification-context"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

export function NotificationBell() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification } = useNotifications()
  const [open, setOpen] = useState(false)

  const handleNotificationClick = (id: string, actionUrl?: string) => {
    markAsRead(id)
    setOpen(false)
    if (actionUrl) {
      window.location.href = actionUrl
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 1) return "Just now"
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "bg-gray-500"
      case "medium":
        return "bg-blue-500"
      case "high":
        return "bg-yellow-500"
      case "urgent":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 p-0 text-xs text-white"
              variant="destructive"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-8 text-xs">
              Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-[300px]">
          {notifications.length === 0 ? (
            <div className="flex h-20 items-center justify-center text-sm text-muted-foreground">No notifications</div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification?.id}
                className={`flex cursor-pointer flex-col items-start gap-1 p-3 ${
                  !notification?.read ? "bg-muted/50" : ""
                }`}
                onClick={() => handleNotificationClick(notification?.id, notification?.actionUrl)}
              >
                <div className="flex w-full items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${getPriorityColor(notification?.priority)}`} />
                    <span className="font-medium">{notification?.title}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{formatDate(notification?.createdAt.toString())}</span>
                </div>
                <p className="text-sm text-muted-foreground">{notification?.message}</p>
                {notification?.actionLabel && (
                  <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                    {notification?.actionLabel}
                  </Button>
                )}
              </DropdownMenuItem>
            ))
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
