"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Calendar, MessageSquare, User, Users, CheckCircle, X } from "lucide-react"
import { useNotifications } from "@/contexts/notification-context"
import { formatDistanceToNow } from "date-fns"

export default function NotificationsPage() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification } = useNotifications()

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageSquare className="h-5 w-5 text-blue-500" />
      case "event":
        return <Calendar className="h-5 w-5 text-green-500" />
      case "connection":
        return <Users className="h-5 w-5 text-purple-500" />
      case "system":
        return <Bell className="h-5 w-5 text-gray-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "message":
        return "bg-blue-500/10"
      case "event":
        return "bg-green-500/10"
      case "connection":
        return "bg-purple-500/10"
      case "system":
        return "bg-gray-500/10"
      default:
        return "bg-gray-500/10"
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Notifications</h1>
        <Button variant="outline" onClick={markAllAsRead}>Mark all as read</Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
          <TabsTrigger value="unread">
            Unread
            <Badge className="ml-2 bg-red-500 text-white">{unreadCount}</Badge>
          </TabsTrigger>
          <TabsTrigger value="mentions">Mentions</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
              <CardDescription>You have {unreadCount} unread notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {notifications.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Bell className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No notifications yet</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification?.id}
                    className={`flex items-start gap-4 p-3 rounded-lg ${
                      !notification?.read ? "bg-muted/50" : ""
                    }`}
                  >
                    <div className={`p-2 rounded-full ${getNotificationColor(notification?.type)}`}>
                      {getNotificationIcon(notification?.type)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{notification?.title || notification?.message}</p>
                      {notification?.title && (
                        <p className="text-sm text-muted-foreground">{notification?.message}</p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDistanceToNow(notification?.createdAt, { addSuffix: true })}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {!notification?.read && (
                        <Badge className="bg-red-500 text-white">New</Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsRead(notification?.id)}
                        className="h-6 w-6 p-0"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeNotification(notification?.id)}
                        className="h-6 w-6 p-0 text-red-500 hover:text-red-600"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unread">
          <Card>
            <CardHeader>
              <CardTitle>Unread Notifications</CardTitle>
              <CardDescription>You have {unreadCount} unread notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {notifications.filter(n => !n.read).length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No unread notifications</p>
                </div>
              ) : (
                notifications
                  .filter(n => !n.read)
                  .map((notification) => (
                    <div
                      key={notification?.id}
                      className="flex items-start gap-4 p-3 rounded-lg bg-muted/50"
                    >
                      <div className={`p-2 rounded-full ${getNotificationColor(notification?.type)}`}>
                        {getNotificationIcon(notification?.type)}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{notification?.title || notification?.message}</p>
                        {notification?.title && (
                          <p className="text-sm text-muted-foreground">{notification?.message}</p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatDistanceToNow(notification?.createdAt, { addSuffix: true })}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-red-500 text-white">New</Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification?.id)}
                          className="h-6 w-6 p-0"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeNotification(notification?.id)}
                          className="h-6 w-6 p-0 text-red-500 hover:text-red-600"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mentions">
          <Card>
            <CardHeader>
              <CardTitle>Mentions</CardTitle>
              <CardDescription>You have 2 mentions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4 p-3 rounded-lg bg-muted/50">
                <div className="bg-primary/10 p-2 rounded-full">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Sarah Chen mentioned you in a comment</p>
                  <p className="text-sm text-muted-foreground">"@user Great idea! Let's discuss this further."</p>
                  <p className="text-xs text-muted-foreground mt-1">5 hours ago</p>
                </div>
                <Badge className="bg-red-500 text-white">New</Badge>
              </div>

              <div className="flex items-start gap-4 p-3 rounded-lg bg-muted/50">
                <div className="bg-primary/10 p-2 rounded-full">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Alex Wong mentioned you in a post</p>
                  <p className="text-sm text-muted-foreground">"Working on an exciting project with @user"</p>
                  <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                </div>
                <Badge className="bg-red-500 text-white">New</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
