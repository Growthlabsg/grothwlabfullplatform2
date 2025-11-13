"use client"

import { useState } from "react"
import { Bell, Settings, X, Check, Clock, User, Users, MessageSquare, Heart, Repeat, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

// Mock notification data
const mockNotifications = [
  {
    id: "1",
    type: "connection",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 5),
    actor: {
      name: "Jane Smith",
      avatar: "/abstract-letter-jt.png",
      initials: "JS",
    },
    content: "accepted your connection request",
    link: "/network",
  },
  {
    id: "2",
    type: "mention",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
    actor: {
      name: "Alex Wong",
      avatar: "/abstract-geometric-aw.png",
      initials: "AW",
    },
    content: 'mentioned you in a post: "Great discussion with @user about startup funding strategies"',
    link: "/feed/post/123",
  },
  {
    id: "3",
    type: "like",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    actor: {
      name: "Michael Chen",
      avatar: "/abstract-ms-flow.png",
      initials: "MC",
    },
    content: "liked your post about startup funding",
    link: "/feed/post/456",
  },
  {
    id: "4",
    type: "comment",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
    actor: {
      name: "Sarah Johnson",
      avatar: "/stylized-letters.png",
      initials: "SJ",
    },
    content: 'commented on your post: "This is exactly what our startup needed to hear!"',
    link: "/feed/post/789",
  },
  {
    id: "5",
    type: "event",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    actor: {
      name: "GrowthLab",
      avatar: "/images/GrowthLab Icon (1).png",
      initials: "GL",
    },
    content: 'New event: "Startup Funding Workshop" is happening tomorrow',
    link: "/events",
  },
  {
    id: "6",
    type: "badge",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36),
    actor: {
      name: "GrowthLab",
      avatar: "/images/GrowthLab Icon (1).png",
      initials: "GL",
    },
    content: 'You earned the "Networking Pro" badge!',
    link: "/profile/badges",
  },
]

type NotificationType = "all" | "unread" | "mentions" | "connections" | "likes" | "comments" | "events" | "badges"

export function NotificationSystem() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [activeTab, setActiveTab] = useState<NotificationType>("all")
  const [isOpen, setIsOpen] = useState(false)
  const unreadCount = notifications.filter((n) => !n.read).length

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notification?.read
    return notification?.type === activeTab
  })

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "connection":
        return <Users className="h-4 w-4" />
      case "mention":
        return <User className="h-4 w-4" />
      case "like":
        return <Heart className="h-4 w-4" />
      case "comment":
        return <MessageSquare className="h-4 w-4" />
      case "event":
        return <Clock className="h-4 w-4" />
      case "badge":
        return <Award className="h-4 w-4" />
      case "repost":
        return <Repeat className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return `${diffInSeconds}s`
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`
    return `${Math.floor(diffInSeconds / 86400)}d`
  }

  return (
    <div className="relative">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {unreadCount}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[380px] p-0" align="end">
          <Card className="border-0 shadow-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl">Notifications</CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={markAllAsRead}
                  disabled={unreadCount === 0}
                  title="Mark all as read"
                >
                  <Check className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} title="Close">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs
                defaultValue="all"
                className="w-full"
                onValueChange={(value) => setActiveTab(value as NotificationType)}
              >
                <div className="border-b px-4">
                  <TabsList className="grid grid-cols-4 h-auto bg-transparent">
                    <TabsTrigger value="all" className="data-[state=active]:bg-muted py-2">
                      All
                    </TabsTrigger>
                    <TabsTrigger value="unread" className="data-[state=active]:bg-muted py-2">
                      Unread
                    </TabsTrigger>
                    <TabsTrigger value="mentions" className="data-[state=active]:bg-muted py-2">
                      Mentions
                    </TabsTrigger>
                    <TabsTrigger value="connections" className="data-[state=active]:bg-muted py-2">
                      Connections
                    </TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="all" className="mt-0">
                  <ScrollArea className="h-[300px]">
                    {filteredNotifications.length > 0 ? (
                      <div className="divide-y">
                        {filteredNotifications.map((notification) => (
                          <div
                            key={notification?.id}
                            className={cn(
                              "flex items-start gap-3 p-3 hover:bg-muted/50 cursor-pointer",
                              !notification?.read && "bg-muted/30",
                            )}
                            onClick={() => markAsRead(notification?.id)}
                          >
                            <Avatar className="h-10 w-10">
                              <AvatarImage
                                src={notification?.actor.avatar || "/placeholder.svg"}
                                alt={notification?.actor.name}
                              />
                              <AvatarFallback>{notification?.actor.initials}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-1">
                              <p className="text-sm">
                                <span className="font-medium">{notification?.actor.name}</span> {notification?.content}
                              </p>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs font-normal">
                                  {getNotificationIcon(notification?.type)}
                                  <span className="ml-1 capitalize">{notification?.type}</span>
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {formatTime(notification?.createdAt)}
                                </span>
                              </div>
                            </div>
                            {!notification?.read && <div className="h-2 w-2 rounded-full bg-blue-500 mt-2" />}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                        <Bell className="h-12 w-12 text-muted-foreground mb-2" />
                        <h3 className="text-lg font-medium">No notifications</h3>
                        <p className="text-sm text-muted-foreground">
                          {activeTab === "all"
                            ? "You don't have any notifications yet"
                            : `You don't have any ${activeTab} notifications`}
                        </p>
                      </div>
                    )}
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="unread" className="mt-0">
                  <ScrollArea className="h-[300px]">
                    {/* Same structure as "all" tab but filtered for unread */}
                    {/* This content is dynamically filtered based on the activeTab state */}
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="mentions" className="mt-0">
                  <ScrollArea className="h-[300px]">
                    {/* Same structure as "all" tab but filtered for mentions */}
                    {/* This content is dynamically filtered based on the activeTab state */}
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="connections" className="mt-0">
                  <ScrollArea className="h-[300px]">
                    {/* Same structure as "all" tab but filtered for connections */}
                    {/* This content is dynamically filtered based on the activeTab state */}
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-3">
              <Button variant="ghost" size="sm" asChild>
                <a href="/notifications">View all notifications</a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a href="/notifications/settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </a>
              </Button>
            </CardFooter>
          </Card>
        </PopoverContent>
      </Popover>
    </div>
  )
}
