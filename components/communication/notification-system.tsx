"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Bell, Calendar, MessageSquare, ThumbsUp, User, Users, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface NotificationSystemProps {
  userId?: string
  className?: string
}

// Mock notification data
const mockNotifications = {
  unread: [
    {
      id: "notif1",
      type: "message",
      title: "New message from Sarah Chen",
      description: "I've shared the pitch deck template with you. Let me know if you need any help with it.",
      time: "10 minutes ago",
      sender: {
        name: "Sarah Chen",
        avatar: "/abstract-geometric-shapes.png",
      },
      actionUrl: "/chat",
      read: false,
    },
    {
      id: "notif2",
      type: "connection",
      title: "New connection request",
      description: "Alex Wong wants to connect with you",
      time: "1 hour ago",
      sender: {
        name: "Alex Wong",
        avatar: "/abstract-geometric-aw.png",
      },
      actionUrl: "/network",
      read: false,
    },
    {
      id: "notif3",
      type: "event",
      title: "Event reminder: Pitch Practice Session",
      description: "Your pitch practice session starts in 30 minutes",
      time: "30 minutes ago",
      actionUrl: "/events",
      read: false,
    },
  ],
  read: [
    {
      id: "notif4",
      type: "mention",
      title: "You were mentioned in a post",
      description: "David Lee mentioned you in 'Fundraising Strategies for Deep Tech'",
      time: "Yesterday",
      sender: {
        name: "David Lee",
        avatar: "/thoughtful-portrait.png",
      },
      actionUrl: "/feed",
      read: true,
    },
    {
      id: "notif5",
      type: "like",
      title: "Your post received 10+ likes",
      description: "Your post 'The Future of AI in Healthcare' is getting attention",
      time: "2 days ago",
      actionUrl: "/feed",
      read: true,
    },
  ],
  mentions: [
    {
      id: "mention1",
      type: "mention",
      title: "You were mentioned in a post",
      description: "David Lee mentioned you in 'Fundraising Strategies for Deep Tech'",
      time: "Yesterday",
      sender: {
        name: "David Lee",
        avatar: "/thoughtful-portrait.png",
      },
      actionUrl: "/feed",
      read: true,
    },
    {
      id: "mention2",
      type: "mention",
      title: "You were mentioned in a comment",
      description: "Mei Lin mentioned you in a comment on 'AI in Healthcare'",
      time: "3 days ago",
      sender: {
        name: "Mei Lin",
        avatar: "/machine-learning-concept.png",
      },
      actionUrl: "/feed",
      read: true,
    },
  ],
  events: [
    {
      id: "event1",
      type: "event",
      title: "Event reminder: Pitch Practice Session",
      description: "Your pitch practice session starts in 30 minutes",
      time: "30 minutes ago",
      actionUrl: "/events",
      read: false,
    },
    {
      id: "event2",
      type: "event",
      title: "New event: Startup Networking Mixer",
      description: "A new event has been added that matches your interests",
      time: "1 day ago",
      actionUrl: "/events",
      read: true,
    },
  ],
}

export function NotificationSystem({ userId = "current-user", className }: NotificationSystemProps) {
  const [activeTab, setActiveTab] = useState("all")
  const [notifications, setNotifications] = useState(mockNotifications)
  const [showSettings, setShowSettings] = useState(false)
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    inApp: true,
    mentions: true,
    connections: true,
    messages: true,
    events: true,
    likes: true,
    comments: true,
  })

  // Get total unread count
  const unreadCount = notifications.unread.length

  // Mark notification as read
  const markAsRead = (notificationId: string) => {
    setNotifications((prev) => {
      const updatedUnread = prev.unread.filter((notif) => notif.id !== notificationId)
      const notifToMove = prev.unread.find((notif) => notif.id === notificationId)

      if (notifToMove) {
        notifToMove.read = true
        return {
          ...prev,
          unread: updatedUnread,
          read: [notifToMove, ...prev.read],
        }
      }

      return prev
    })
  }

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications((prev) => {
      const updatedUnread = prev.unread.map((notif) => ({ ...notif, read: true }))
      return {
        ...prev,
        unread: [],
        read: [...updatedUnread, ...prev.read],
      }
    })
  }

  // Delete notification
  const deleteNotification = (notificationId: string) => {
    setNotifications((prev) => {
      return {
        ...prev,
        unread: prev.unread.filter((notif) => notif.id !== notificationId),
        read: prev.read.filter((notif) => notif.id !== notificationId),
        mentions: prev.mentions.filter((notif) => notif.id !== notificationId),
        events: prev.events.filter((notif) => notif.id !== notificationId),
      }
    })
  }

  // Get notification icon based on type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageSquare className="h-5 w-5 text-blue-500" />
      case "connection":
        return <Users className="h-5 w-5 text-green-500" />
      case "event":
        return <Calendar className="h-5 w-5 text-purple-500" />
      case "mention":
        return <User className="h-5 w-5 text-amber-500" />
      case "like":
        return <ThumbsUp className="h-5 w-5 text-red-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  // Get all notifications for "all" tab
  const getAllNotifications = () => {
    return [...notifications.unread, ...notifications.read]
  }

  // Update notification settings
  const updateNotificationSetting = (key: string, value: boolean) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <div className={cn("flex flex-col h-full", className)}>
      {showSettings ? (
        <div className="flex flex-col h-full">
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="mr-2" onClick={() => setShowSettings(false)}>
                <X className="h-4 w-4" />
              </Button>
              <h2 className="text-xl font-semibold">Notification Settings</h2>
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4 space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Delivery Methods</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={notificationSettings.email}
                      onCheckedChange={(checked) => updateNotificationSetting("email", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="push-notifications">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive push notifications on your devices</p>
                    </div>
                    <Switch
                      id="push-notifications"
                      checked={notificationSettings.push}
                      onCheckedChange={(checked) => updateNotificationSetting("push", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="in-app-notifications">In-App Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications within the application</p>
                    </div>
                    <Switch
                      id="in-app-notifications"
                      checked={notificationSettings.inApp}
                      onCheckedChange={(checked) => updateNotificationSetting("inApp", checked)}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-4">Notification Types</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="mentions-notifications">Mentions</Label>
                      <p className="text-sm text-muted-foreground">When someone mentions you in a post or comment</p>
                    </div>
                    <Switch
                      id="mentions-notifications"
                      checked={notificationSettings.mentions}
                      onCheckedChange={(checked) => updateNotificationSetting("mentions", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="connections-notifications">Connection Requests</Label>
                      <p className="text-sm text-muted-foreground">When someone sends you a connection request</p>
                    </div>
                    <Switch
                      id="connections-notifications"
                      checked={notificationSettings.connections}
                      onCheckedChange={(checked) => updateNotificationSetting("connections", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="messages-notifications">Messages</Label>
                      <p className="text-sm text-muted-foreground">When you receive a new message</p>
                    </div>
                    <Switch
                      id="messages-notifications"
                      checked={notificationSettings.messages}
                      onCheckedChange={(checked) => updateNotificationSetting("messages", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="events-notifications">Events</Label>
                      <p className="text-sm text-muted-foreground">Event reminders and updates</p>
                    </div>
                    <Switch
                      id="events-notifications"
                      checked={notificationSettings.events}
                      onCheckedChange={(checked) => updateNotificationSetting("events", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="likes-notifications">Likes</Label>
                      <p className="text-sm text-muted-foreground">When someone likes your post or comment</p>
                    </div>
                    <Switch
                      id="likes-notifications"
                      checked={notificationSettings.likes}
                      onCheckedChange={(checked) => updateNotificationSetting("likes", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="comments-notifications">Comments</Label>
                      <p className="text-sm text-muted-foreground">When someone comments on your post</p>
                    </div>
                    <Switch
                      id="comments-notifications"
                      checked={notificationSettings.comments}
                      onCheckedChange={(checked) => updateNotificationSetting("comments", checked)}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-4">Notification Schedule</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="quiet-hours">Quiet Hours</Label>
                      <p className="text-sm text-muted-foreground">Mute notifications during specific hours</p>
                    </div>
                    <Switch id="quiet-hours" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="start-time" className="text-sm">
                        Start Time
                      </Label>
                      <select
                        id="start-time"
                        className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2"
                        defaultValue="22:00"
                      >
                        {Array.from({ length: 24 }).map((_, i) => (
                          <option key={i} value={`${i.toString().padStart(2, "0")}:00`}>
                            {i.toString().padStart(2, "0")}:00
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="end-time" className="text-sm">
                        End Time
                      </Label>
                      <select
                        id="end-time"
                        className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2"
                        defaultValue="07:00"
                      >
                        {Array.from({ length: 24 }).map((_, i) => (
                          <option key={i} value={`${i.toString().padStart(2, "0")}:00`}>
                            {i.toString().padStart(2, "0")}:00
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-4">Advanced Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="sound-notifications">Notification Sounds</Label>
                      <p className="text-sm text-muted-foreground">Play sounds for notifications</p>
                    </div>
                    <Switch id="sound-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="browser-notifications">Browser Notifications</Label>
                      <p className="text-sm text-muted-foreground">Show notifications in your browser</p>
                    </div>
                    <Switch id="browser-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="weekly-digest">Weekly Digest</Label>
                      <p className="text-sm text-muted-foreground">Receive a weekly summary of activity</p>
                    </div>
                    <Switch id="weekly-digest" defaultChecked />
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>

          <div className="p-4 border-t">
            <Button className="w-full" onClick={() => setShowSettings(false)}>
              Save Settings
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="text-xl font-semibold">Notifications</h2>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <Button variant="outline" size="sm" onClick={markAllAsRead}>
                  Mark all as read
                </Button>
              )}
              <Button variant="ghost" size="icon" onClick={() => setShowSettings(true)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </Button>
            </div>
          </div>

          <div className="flex border-b">
            <Button
              variant="ghost"
              className={`flex-1 rounded-none ${activeTab === "all" ? "border-b-2 border-primary" : ""}`}
              onClick={() => setActiveTab("all")}
            >
              All
            </Button>
            <Button
              variant="ghost"
              className={`flex-1 rounded-none ${activeTab === "unread" ? "border-b-2 border-primary" : ""}`}
              onClick={() => setActiveTab("unread")}
            >
              Unread
              {unreadCount > 0 && (
                <span className="ml-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {unreadCount}
                </span>
              )}
            </Button>
            <Button
              variant="ghost"
              className={`flex-1 rounded-none ${activeTab === "mentions" ? "border-b-2 border-primary" : ""}`}
              onClick={() => setActiveTab("mentions")}
            >
              Mentions
            </Button>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4">
              {activeTab === "all" && getAllNotifications().length === 0 && (
                <div className="flex flex-col items-center justify-center py-8">
                  <Bell className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
                  <p className="text-muted-foreground">No notifications yet</p>
                </div>
              )}

              {activeTab === "unread" && notifications.unread.length === 0 && (
                <div className="flex flex-col items-center justify-center py-8">
                  <Bell className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
                  <p className="text-muted-foreground">No unread notifications</p>
                </div>
              )}

              {activeTab === "mentions" && notifications.mentions.length === 0 && (
                <div className="flex flex-col items-center justify-center py-8">
                  <User className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
                  <p className="text-muted-foreground">No mentions yet</p>
                </div>
              )}

              {activeTab === "all" &&
                getAllNotifications().map((notification) => (
                  <div
                    key={notification?.id}
                    className={`border rounded-lg p-4 ${!notification?.read ? "bg-muted/30 border-primary/20" : ""}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="bg-muted rounded-full p-2">{getNotificationIcon(notification?.type)}</div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium">{notification?.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{notification?.description}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {!notification?.read && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => markAsRead(notification?.id)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-4 w-4"
                                >
                                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                </svg>
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => deleteNotification(notification?.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-xs text-muted-foreground">{notification?.time}</p>
                          <Button variant="link" size="sm" className="h-auto p-0" asChild>
                            <a href={notification?.actionUrl}>View</a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              {activeTab === "unread" &&
                notifications.unread.map((notification) => (
                  <div key={notification?.id} className="border rounded-lg p-4 bg-muted/30 border-primary/20">
                    <div className="flex items-start gap-3">
                      <div className="bg-muted rounded-full p-2">{getNotificationIcon(notification?.type)}</div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium">{notification?.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{notification?.description}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => markAsRead(notification?.id)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                              >
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                              </svg>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => deleteNotification(notification?.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-xs text-muted-foreground">{notification?.time}</p>
                          <Button variant="link" size="sm" className="h-auto p-0" asChild>
                            <a href={notification?.actionUrl}>View</a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              {activeTab === "mentions" &&
                notifications.mentions.map((notification) => (
                  <div
                    key={notification?.id}
                    className={`border rounded-lg p-4 ${!notification?.read ? "bg-muted/30 border-primary/20" : ""}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="bg-muted rounded-full p-2">
                        <User className="h-5 w-5 text-amber-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium">{notification?.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{notification?.description}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => deleteNotification(notification?.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-xs text-muted-foreground">{notification?.time}</p>
                          <Button variant="link" size="sm" className="h-auto p-0" asChild>
                            <a href={notification?.actionUrl}>View</a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  )
}
