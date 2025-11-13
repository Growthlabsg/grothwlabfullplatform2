"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface TypingIndicatorProps {
  channelId: string
  className?: string
}

export function TypingIndicator({ channelId, className }: TypingIndicatorProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [typingUsers, setTypingUsers] = useState<string[]>([])

  // In a real app, this would connect to a real-time service
  useEffect(() => {
    // Simulate typing events for demo purposes
    const interval = setInterval(() => {
      const shouldShow = Math.random() > 0.7
      if (shouldShow) {
        const users = ["Sarah Chen", "Alex Wong"].filter(() => Math.random() > 0.5)
        setTypingUsers(users)
        setIsVisible(users.length > 0)
      } else {
        setIsVisible(false)
        setTypingUsers([])
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [channelId])

  if (!isVisible) return null

  return (
    <div className={cn("flex items-center h-6 px-2 text-xs text-muted-foreground", className)}>
      <div className="flex space-x-1 mr-2">
        <span className="animate-bounce delay-0">•</span>
        <span className="animate-bounce delay-150">•</span>
        <span className="animate-bounce delay-300">•</span>
      </div>
      <span>
        {typingUsers.length === 1 ? `${typingUsers[0]} is typing...` : `${typingUsers.join(" and ")} are typing...`}
      </span>
    </div>
  )
}
