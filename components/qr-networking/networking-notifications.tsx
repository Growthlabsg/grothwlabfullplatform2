"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Bell, 
  MessageCircle, 
  Calendar, 
  Clock, 
  CheckCircle, 
  X, 
  Users,
  Star,
  Zap,
  Search
} from "lucide-react"

interface Notification {
  id: string
  type: "follow-up" | "reminder" | "connection" | "event" | "achievement"
  title: string
  message: string
  timestamp: string
  isRead: boolean
  priority: "low" | "medium" | "high"
}

interface FollowUpReminder {
  id: string
  connectionName: string
  reminderText: string
  dueDate: string
  isCompleted: boolean
}

export function NetworkingNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [followUpReminders, setFollowUpReminders] = useState<FollowUpReminder[]>([])
  const [activeTab, setActiveTab] = useState("notifications")

  useEffect(() => {
    setNotifications([
      {
        id: "1",
        type: "follow-up",
        title: "Follow up with Sarah Chen",
        message: "You met Sarah at the Startup Summit. Time to follow up on the AI partnership discussion.",
        timestamp: "2 hours ago",
        isRead: false,
        priority: "high"
      }
    ])

    setFollowUpReminders([
      {
        id: "1",
        connectionName: "Sarah Chen",
        reminderText: "Follow up on AI partnership discussion",
        dueDate: "Today",
        isCompleted: false
      }
    ])
  }, [])

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification?.id === notificationId 
          ? { ...notification, isRead: true }
          : notification
      )
    )
  }

  const unreadCount = notifications.filter(n => !n.isRead).length

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications ({unreadCount})
          </CardTitle>
          <CardDescription>
            Stay updated with your networking activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification?.id}
                className={`p-4 border rounded-lg ${
                  notification?.isRead
                    ? "bg-gray-50 dark:bg-gray-800"
                    : "bg-white dark:bg-gray-700"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {notification?.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {notification?.message}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        {notification?.priority}
                      </Badge>
                      <span className="text-xs text-gray-500">{notification?.timestamp}</span>
                    </div>
                  </div>
                  {!notification?.isRead && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => markAsRead(notification?.id)}
                    >
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Mark Read
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
