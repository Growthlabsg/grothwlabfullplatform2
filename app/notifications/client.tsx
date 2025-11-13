"use client"

import { useState, useEffect } from "react"
import { Bell, Check, Clock, Info, MessageSquare, Trash2, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"

// Define notification types
type NotificationType = "message" | "connection" | "event" | "system" | "mention"

interface Notification {
  id: string
  type: NotificationType
  title: string
  description: string
  timestamp: string
  read: boolean
  actionUrl?: string
  sender?: {
    id: string
    name: string
    avatar?: string
  }
}

// Mock notifications data
const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "notif-1",
    type: "message",
    title: "New message from John Doe",
    description: "Hey, I'd like to discuss your startup idea further. Are you available for a call tomorrow?",
    timestamp: "2023-04-19T10:30:00Z",
    read: false,
    actionUrl: "/chat/john-doe",
    sender: {
      id: "user-1",
      name: "John Doe",
      avatar: "/green-tractor-field.png",
    },
  },
  {
    id: "notif-2",
    type: "connection",
    title: "Connection request accepted",
    description: "Sarah Lee has accepted your connection request. You can now message each other.",
    timestamp: "2023-04-18T15:45:00Z",
    read: false,
    actionUrl: "/profile/sarah-lee",
    sender: {
      id: "user-2",
      name: "Sarah Lee",
      avatar: "/abstract-geometric-sl.png",
    },
  },
  {
    id: "notif-3",
    type: "event",
    title: "Upcoming event reminder",
    description: "The 'Startup Pitch Night' event starts in 2 hours. Don't forget to join!",
    timestamp: "2023-04-18T09:00:00Z",
    read: true,
    actionUrl: "/events/startup-pitch-night",
  },
  {
    id: "notif-4",
    type: "system",
    title: "Profile verification complete",
    description: "Your profile has been verified. You now have access to all features of GrowthLab.",
    timestamp: "2023-04-17T14:20:00Z",
    read: true,
  },
  {
    id: "notif-5",
    type: "mention",
    title: "You were mentioned in a discussion",
    description: "Alex Wong mentioned you in the 'Singapore Startup Ecosystem' discussion.",
    timestamp: "2023-04-17T11:10:00Z",
    read: false,
    actionUrl: "/community/discussions/singapore-startup-ecosystem",
    sender: {
      id: "user-3",
      name: "Alex Wong",
      avatar: "/abstract-geometric-aw.png",
    },
  },
]

export default function NotificationsClient() {
  const { toast } = useToast()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [activeTab, setActiveTab] = useState<string>("all")
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading notifications
  useEffect(() => {
    const timer = setTimeout(() => {
      setNotifications(MOCK_NOTIFICATIONS)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Filter notifications based on active tab
  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notification?.read
    return notification?.type === activeTab
  })

  // Mark notification as read
  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => {
        if (notification?.id === id) {
          return { ...notification, read: true }
        }
        return notification
      }),
    )
    toast({
      title: "Notification marked as read",
      description: "The notification has been marked as read.",
    })
  }

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        read: true,
      })),
    )
    toast({
      title: "All notifications marked as read",
      description: "All notifications have been marked as read.",
    })
  }

  // Delete notification
  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification?.id !== id))
    toast({
      title: "Notification deleted",
      description: "The notification has been deleted.",
    })
  }

  // Get notification icon based on type
  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "message":
        return <MessageSquare className="h-5 w-5 text-blue-500" />
      case "connection":
        return <User className="h-5 w-5 text-green-500" />
      case "event":
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "system":
        return <Info className="h-5 w-5 text-purple-500" />
      case "mention":
        return <Bell className="h-5 w-5 text-red-500" />
      default:
        return <Bell className="h-5 w-5" />
    }
  }

  // Format timestamp to relative time
  const formatRelativeTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) {
      return "just now"
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60)
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600)
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`
    } else {
      const days = Math.floor(diffInSeconds / 86400)
      return `${days} ${days === 1 ? "day" : "days"} ago`
    }
  }

  // Count unread notifications
  const unreadCount = notifications.filter((notification) => !notification?.read).length

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Your Notifications</h2>
          <p className="text-muted-foreground">
            You have {unreadCount} unread {unreadCount === 1 ? "notification" : "notifications"}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={markAllAsRead} disabled={unreadCount === 0}>
            <Check className="h-4 w-4 mr-2" />
            Mark all as read
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-6">
          <TabsTrigger value="all">
            All
            {notifications.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {notifications.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="unread">
            Unread
            {unreadCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="message">Messages</TabsTrigger>
          <TabsTrigger value="connection">Connections</TabsTrigger>
          <TabsTrigger value="event">Events</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader className="flex flex-row items-start gap-4 pb-2">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-5 w-40 mb-2" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardContent>
                  <CardFooter>
                    <Skeleton className="h-9 w-24 mr-2" />
                    <Skeleton className="h-9 w-24" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No notifications</h3>
              <p className="text-muted-foreground">
                {activeTab === "all"
                  ? "You don't have any notifications yet."
                  : activeTab === "unread"
                    ? "You don't have any unread notifications."
                    : `You don't have any ${activeTab} notifications.`}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <Card
                  key={notification?.id}
                  className={notification?.read ? "bg-card" : "bg-muted/20 border-l-4 border-l-primary"}
                >
                  <CardHeader className="flex flex-row items-start gap-4 pb-2">
                    <div className="flex-shrink-0">
                      {notification?.sender?.avatar ? (
                        <img
                          src={notification?.sender.avatar || "/placeholder.svg"}
                          alt={notification?.sender.name}
                          className="h-10 w-10 rounded-full"
                        />
                      ) : (
                        getNotificationIcon(notification?.type)
                      )}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-base">{notification?.title}</CardTitle>
                      <CardDescription>{formatRelativeTime(notification?.timestamp)}</CardDescription>
                    </div>
                    {!notification?.read && (
                      <Badge variant="default" className="ml-2">
                        New
                      </Badge>
                    )}
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm">{notification?.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex gap-2">
                      {notification?.actionUrl && (
                        <Button variant="default" size="sm" asChild>
                          <a href={notification?.actionUrl}>View</a>
                        </Button>
                      )}
                      {!notification?.read && (
                        <Button variant="outline" size="sm" onClick={() => markAsRead(notification?.id)}>
                          <Check className="h-4 w-4 mr-2" />
                          Mark as read
                        </Button>
                      )}
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => deleteNotification(notification?.id)}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
