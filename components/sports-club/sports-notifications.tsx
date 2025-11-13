"use client"

import { useState } from "react"
import { Bell, Check, ChevronRight, Calendar, Users, Activity } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  getSportsNotifications,
  getUnreadNotificationsCount,
  markAllNotificationsAsRead,
  markNotificationAsRead,
  type SportsNotification,
} from "@/lib/sports-notification-service"

interface SportsNotificationsProps {
  onCountChange?: (count: number) => void
}

export function SportsNotifications({ onCountChange }: SportsNotificationsProps) {
  const [notifications, setNotifications] = useState<SportsNotification[]>(getSportsNotifications())
  const [unreadCount, setUnreadCount] = useState<number>(getUnreadNotificationsCount())
  const [open, setOpen] = useState(false)

  // Mark all as read
  const handleMarkAllAsRead = () => {
    markAllNotificationsAsRead()

    // Update state
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
    setUnreadCount(0)

    // Notify parent
    if (onCountChange) {
      onCountChange(0)
    }
  }

  // Mark one notification as read
  const handleMarkAsRead = (notificationId: string) => {
    markNotificationAsRead(notificationId)

    // Update state
    const updatedNotifications = notifications.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
    setNotifications(updatedNotifications)

    const newUnreadCount = updatedNotifications.filter((n) => !n.read).length
    setUnreadCount(newUnreadCount)

    // Notify parent
    if (onCountChange) {
      onCountChange(newUnreadCount)
    }
  }

  // Get icon for notification type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "event":
        return <Calendar className="h-4 w-4 text-primary" />
      case "team":
        return <Users className="h-4 w-4 text-primary" />
      case "interest":
        return <Activity className="h-4 w-4 text-primary" />
      default:
        return <Bell className="h-4 w-4 text-primary" />
    }
  }

  // Format date for display
  const formatNotificationDate = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))

    if (diffMins < 60) {
      return `${diffMins} min${diffMins !== 1 ? "s" : ""} ago`
    }

    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`
    }

    const diffDays = Math.floor(diffHours / 24)
    if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`
    }

    // If older than a week, just show the date
    return date.toLocaleDateString()
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-9 relative">
          <Bell className="h-4 w-4 mr-2" />
          Notifications
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 px-1 min-w-[1.25rem] h-5 flex items-center justify-center"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[380px] p-0">
        <div className="flex items-center justify-between p-4">
          <h4 className="font-medium">Sports Notifications</h4>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" onClick={handleMarkAllAsRead}>
              <Check className="h-3.5 w-3.5 mr-1" />
              Mark all as read
            </Button>
          )}
        </div>

        <Separator />

        <ScrollArea className="h-[400px]">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-4">
              <Bell className="h-12 w-12 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No notifications yet</p>
            </div>
          ) : (
            <div>
              {notifications.map((notification) => (
                <div
                  key={notification?.id}
                  className={`flex p-4 border-b border-border transition-colors ${
                    !notification?.read ? "bg-muted/40" : ""
                  }`}
                >
                  <div className="mr-3 mt-0.5">{getNotificationIcon(notification?.type)}</div>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start">
                      <p className="font-medium text-sm">{notification?.title}</p>
                      <span className="text-xs text-muted-foreground">{formatNotificationDate(notification?.date)}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{notification?.message}</p>
                    <div className="flex justify-between items-center mt-2">
                      {notification?.actionUrl && (
                        <Button
                          variant="link"
                          size="sm"
                          className="h-auto p-0 text-xs font-normal"
                          onClick={() => {
                            window.location.href = notification?.actionUrl!
                            setOpen(false)
                          }}
                        >
                          View details
                          <ChevronRight className="h-3 w-3 ml-1" />
                        </Button>
                      )}

                      {!notification?.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs"
                          onClick={() => handleMarkAsRead(notification?.id)}
                        >
                          <Check className="h-3.5 w-3.5 mr-1" />
                          Mark as read
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <Separator />

        <div className="p-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full text-xs"
            onClick={() => {
              window.location.href = "/sports-club?tab=notifications"
              setOpen(false)
            }}
          >
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
