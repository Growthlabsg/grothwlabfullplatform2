"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RefreshCw, Activity, Users, MessageSquare, DollarSign, Calendar, Zap } from "lucide-react"
import { useDashboardEvents } from "@/hooks/use-real-time-dashboard"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"

interface RealTimeEventsProps {
  title?: string
  maxEvents?: number
  showRefresh?: boolean
  className?: string
}

export function RealTimeEvents({
  title = "Real-Time Activity",
  maxEvents = 10,
  showRefresh = true,
  className,
}: RealTimeEventsProps) {
  const { events, loading, error, lastUpdated, refresh } = useDashboardEvents()
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Handle manual refresh
  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      await refresh()
    } catch (error) {
      console.error("Failed to refresh events:", error)
    } finally {
      setIsRefreshing(false)
    }
  }

  // Get event icon and color
  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case "user_joined":
        return { icon: Users, color: "bg-blue-500" }
      case "post_created":
        return { icon: MessageSquare, color: "bg-green-500" }
      case "connection_made":
        return { icon: Zap, color: "bg-purple-500" }
      case "funding_raised":
        return { icon: DollarSign, color: "bg-yellow-500" }
      case "event_created":
        return { icon: Calendar, color: "bg-orange-500" }
      default:
        return { icon: Activity, color: "bg-gray-500" }
    }
  }

  // Get event description
  const getEventDescription = (event: any) => {
    switch (event.type) {
      case "user_joined":
        return `${event.userName} joined as ${event.data.userType}`
      case "post_created":
        return `${event.userName} created a ${event.data.postType} post`
      case "connection_made":
        return `New ${event.data.connectionType} connection made`
      case "funding_raised":
        return `$${(event.data.amount / 1000000).toFixed(1)}M raised in ${event.data.round} round`
      case "event_created":
        return `${event.data.eventType} event created with ${event.data.attendees} attendees`
      default:
        return "New activity detected"
    }
  }

  // Get event badge text
  const getEventBadge = (eventType: string) => {
    switch (eventType) {
      case "user_joined":
        return "New User"
      case "post_created":
        return "New Post"
      case "connection_made":
        return "Connection"
      case "funding_raised":
        return "Funding"
      case "event_created":
        return "Event"
      default:
        return "Activity"
    }
  }

  const displayedEvents = events.slice(0, maxEvents)

  return (
    <Card className={cn("transition-all duration-300", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          {loading && <Activity className="h-4 w-4 animate-pulse text-muted-foreground" />}
        </div>
        <div className="flex items-center gap-2">
          {showRefresh && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing || loading}
              className="h-8 w-8 p-0"
            >
              <RefreshCw className={cn(
                "h-4 w-4",
                (isRefreshing || loading) && "animate-spin"
              )} />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {error && (
          <div className="text-center py-4">
            <p className="text-sm text-red-500">Failed to load events</p>
            <Button variant="outline" size="sm" onClick={handleRefresh} className="mt-2">
              Try Again
            </Button>
          </div>
        )}

        {loading && events.length === 0 ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex items-center gap-3 animate-pulse">
                <div className="h-8 w-8 rounded-full bg-muted" />
                <div className="flex-1 space-y-1">
                  <div className="h-3 w-32 bg-muted rounded" />
                  <div className="h-2 w-24 bg-muted rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : displayedEvents.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No recent activity</p>
          </div>
        ) : (
          <div className="space-y-3">
            {displayedEvents.map((event) => {
              const { icon: Icon, color } = getEventIcon(event.type)
              
              return (
                <div
                  key={event.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center text-white",
                    color
                  )}>
                    <Icon className="h-4 w-4" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium truncate">
                        {getEventDescription(event)}
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        {getEventBadge(event.type)}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{formatDistanceToNow(event.timestamp, { addSuffix: true })}</span>
                      {event.userName && (
                        <>
                          <span>•</span>
                          <span>{event.userName}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {lastUpdated && (
          <div className="pt-3 border-t text-xs text-muted-foreground">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Specialized event components
export function UserActivityEvents() {
  return (
    <RealTimeEvents
      title="User Activity"
      maxEvents={8}
      className="h-[400px] overflow-y-auto"
    />
  )
}

export function FundingEvents() {
  return (
    <RealTimeEvents
      title="Funding Activity"
      maxEvents={6}
      className="h-[300px] overflow-y-auto"
    />
  )
}

export function ConnectionEvents() {
  return (
    <RealTimeEvents
      title="Network Activity"
      maxEvents={8}
      className="h-[400px] overflow-y-auto"
    />
  )
} 