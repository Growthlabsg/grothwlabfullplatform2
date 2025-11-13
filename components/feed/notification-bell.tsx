"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { useNotifications } from "@/contexts/notification-context"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"

export function NotificationBell() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications()
  const [open, setOpen] = useState(false)

  const handleNotificationClick = (id: string) => {
    markAsRead(id)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-medium">Notifications</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs h-8">
              Mark all as read
            </Button>
          )}
        </div>
        {notifications.length > 0 ? (
          <>
            <ScrollArea className="h-[300px]">
              <div className="flex flex-col">
                {notifications.map((notification) => (
                  <div
                    key={notification?.id}
                    className={cn(
                      "p-4 border-b last:border-0 cursor-pointer hover:bg-muted/50 transition-colors",
                      !notification?.read && "bg-muted/20",
                    )}
                    onClick={() => handleNotificationClick(notification?.id)}
                  >
                    {notification?.link ? (
                      <Link href={notification?.link} className="block">
                        <NotificationItem notification={notification} />
                      </Link>
                    ) : (
                      <NotificationItem notification={notification} />
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-2 border-t text-center">
              <Link
                href="/notifications"
                className="text-sm text-primary hover:underline"
                onClick={() => setOpen(false)}
              >
                View all notifications
              </Link>
            </div>
          </>
        ) : (
          <div className="p-8 text-center text-muted-foreground">
            <p>No notifications yet</p>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}

function NotificationItem({ notification }: { notification: any }) {
  return (
    <>
      {notification?.title && <h4 className="font-medium text-sm">{notification?.title}</h4>}
      <p className="text-sm text-muted-foreground">{notification?.message}</p>
      <p className="text-xs text-muted-foreground mt-1">
        {formatDistanceToNow(new Date(notification?.createdAt), { addSuffix: true })}
      </p>
    </>
  )
}
