"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, Briefcase, MessageSquare, Bell } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"

export function MobileNavigation() {
  const pathname = usePathname()
  const [notificationCount, setNotificationCount] = useState(5)
  const [messageCount, setMessageCount] = useState(3)

  // Simulate notification updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly update notification count for demo purposes
      if (Math.random() > 0.7) {
        setNotificationCount((prev) => Math.max(0, prev + (Math.random() > 0.5 ? 1 : -1)))
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t flex justify-around items-center h-16 z-50">
      <Link
        href="/feed"
        className={`flex flex-col items-center justify-center px-3 py-2 ${
          pathname === "/feed" ? "text-primary" : "text-muted-foreground"
        }`}
      >
        <Home className="h-5 w-5" />
        <span className="text-xs mt-1">Home</span>
      </Link>

      <Link
        href="/network"
        className={`flex flex-col items-center justify-center px-3 py-2 ${
          pathname === "/network" ? "text-primary" : "text-muted-foreground"
        }`}
      >
        <Users className="h-5 w-5" />
        <span className="text-xs mt-1">Network</span>
      </Link>

      <Link
        href="/jobs"
        className={`flex flex-col items-center justify-center px-3 py-2 ${
          pathname === "/jobs" ? "text-primary" : "text-muted-foreground"
        }`}
      >
        <Briefcase className="h-5 w-5" />
        <span className="text-xs mt-1">Jobs</span>
      </Link>

      <Link
        href="/chat"
        className={`flex flex-col items-center justify-center px-3 py-2 relative ${
          pathname === "/chat" ? "text-primary" : "text-muted-foreground"
        }`}
      >
        <MessageSquare className="h-5 w-5" />
        {messageCount > 0 && (
          <Badge
            className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[10px]"
            variant="destructive"
          >
            {messageCount}
          </Badge>
        )}
        <span className="text-xs mt-1">Chat</span>
      </Link>

      <Link
        href="/notifications"
        className={`flex flex-col items-center justify-center px-3 py-2 relative ${
          pathname === "/notifications" ? "text-primary" : "text-muted-foreground"
        }`}
      >
        <Bell className="h-5 w-5" />
        {notificationCount > 0 && (
          <Badge
            className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[10px]"
            variant="destructive"
          >
            {notificationCount}
          </Badge>
        )}
        <span className="text-xs mt-1">Alerts</span>
      </Link>
    </nav>
  )
}
