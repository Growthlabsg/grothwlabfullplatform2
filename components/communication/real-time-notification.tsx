"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface Notification {
  id: string
  title: string
  message: string
  type: "message" | "mention" | "reaction" | "file" | "system"
  sender?: {
    id: string
    name: string
    avatar?: string
  }
  timestamp: Date
  channelId?: string
  channelName?: string
  read: boolean
}

interface RealTimeNotificationProps {
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left"
  className?: string
  maxNotifications?: number
  autoClose?: boolean
  autoCloseDelay?: number
  onClick?: (notification: Notification) => void
  onClose?: (notificationId: string) => void
}

export function RealTimeNotification({
  position = "top-right",
  className,
  maxNotifications = 3,
  autoClose = true,
  autoCloseDelay = 5000,
  onClick,
  onClose,
}: RealTimeNotificationProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  // In a real app, this would connect to a real-time service
  useEffect(() => {
    // Mock notifications for demo purposes
    const mockNotifications: Notification[] = [
      {
        id: "notif1",
        title: "New message",
        message: "Sarah Chen: I've shared the pitch deck template with you.",
        type: "message",
        sender: {
          id: "user1",
          name: "Sarah Chen",
          avatar: "/abstract-geometric-shapes.png",
        },
        timestamp: new Date(),
        channelId: "channel1",
        channelName: "general",
        read: false,
      },
      {
        id: "notif2",
        title: "You were mentioned",
        message: "Alex Wong mentioned you in #product-team",
        type: "mention",
        sender: {
          id: "user2",
          name: "Alex Wong",
          avatar: "/abstract-geometric-aw.png",
        },
        timestamp: new Date(),
        channelId: "channel2",
        channelName: "product-team",
        read: false,
      },
      {
        id: "notif3",
        title: "File shared",
        message: "Mei Lin shared a file: Q3 Financial Report.xlsx",
        type: "file",
        sender: {
          id: "user3",
          name: "Mei Lin",
          avatar: "/machine-learning-concept.png",
        },
        timestamp: new Date(),
        channelId: "channel3",
        channelName: "finance",
        read: false,
      },
    ]

    // Show notifications with delay
    let timeout: number
    const interval = setInterval(() => {
      const randomNotif = mockNotifications[Math.floor(Math.random() * mockNotifications.length)]

      setNotifications((prev) => {
        // Limit the number of notifications
        const updated = [...prev, { ...randomNotif, id: `${randomNotif.id}-${Date.now()}` }]
        return updated.slice(-maxNotifications)
      })

      // Clear after a few notifications
      if (notifications.length >= 2) {
        clearInterval(interval)
      }
    }, 10000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [maxNotifications])

  // Auto close notifications
  useEffect(() => {
    if (!autoClose) return

    const timers: number[] = []

    notifications.forEach((notification) => {
      const timer = setTimeout(() => {
        handleClose(notification?.id)
      }, autoCloseDelay)

      timers.push(timer)
    })

    return () => {
      timers.forEach((timer) => clearTimeout(timer))
    }
  }, [notifications, autoClose, autoCloseDelay])

  const handleClose = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
    onClose?.(id)
  }

  const handleClick = (notification: Notification) => {
    onClick?.(notification)
    handleClose(notification?.id)
  }

  const getPositionClasses = () => {
    switch (position) {
      case "top-right":
        return "top-4 right-4"
      case "top-left":
        return "top-4 left-4"
      case "bottom-right":
        return "bottom-4 right-4"
      case "bottom-left":
        return "bottom-4 left-4"
      default:
        return "top-4 right-4"
    }
  }

  return (
    <div className={cn("fixed z-50 flex flex-col gap-2 w-80", getPositionClasses(), className)}>
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification?.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-background border rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-3">
              <div className="flex items-start">
                {notification?.sender && (
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarImage
                      src={notification?.sender.avatar || "/placeholder.svg"}
                      alt={notification?.sender.name}
                    />
                    <AvatarFallback>{notification?.sender.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
                <div className="flex-1 min-w-0" onClick={() => handleClick(notification)}>
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{notification?.title}</h4>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 -mr-1"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleClose(notification?.id)
                      }}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{notification?.message}</p>
                  {notification?.channelName && (
                    <p className="text-xs mt-1">
                      in <span className="font-medium">#{notification?.channelName}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
            {autoClose && (
              <div className="h-1 bg-primary/10">
                <div
                  className="h-full bg-primary transition-all"
                  style={{
                    width: "100%",
                    animation: `shrink ${autoCloseDelay}ms linear forwards`,
                  }}
                />
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  )
}
