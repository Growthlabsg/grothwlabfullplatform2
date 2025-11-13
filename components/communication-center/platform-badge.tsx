"use client"

import type { PlatformType } from "@/types/communication"
import { cn } from "@/lib/utils"
import { Slack, Send, MessageCircle } from "lucide-react"

interface PlatformBadgeProps {
  platform: PlatformType
  className?: string
}

export function PlatformBadge({ platform, className }: PlatformBadgeProps) {
  let icon
  let bgColor
  let textColor

  switch (platform) {
    case "slack":
      icon = <Slack className="h-3.5 w-3.5" />
      bgColor = "bg-purple-500"
      textColor = "text-white"
      break
    case "whatsapp":
      icon = <MessageCircle className="h-3.5 w-3.5" />
      bgColor = "bg-green-500"
      textColor = "text-white"
      break
    case "telegram":
      icon = <Send className="h-3.5 w-3.5" />
      bgColor = "bg-blue-500"
      textColor = "text-white"
      break
    default:
      return null
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold",
        bgColor,
        textColor,
        className,
      )}
    >
      {icon}
    </div>
  )
}
