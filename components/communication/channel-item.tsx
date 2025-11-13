"use client"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Hash, Lock, Users } from "lucide-react"

interface ChannelItemProps {
  id: string
  name: string
  isActive: boolean
  unreadCount: number
  isPrivate?: boolean
  isGroup?: boolean
  onClick: () => void
}

export function ChannelItem({ id, name, isActive, unreadCount, isPrivate, isGroup, onClick }: ChannelItemProps) {
  const Icon = isGroup ? Users : isPrivate ? Lock : Hash

  return (
    <button type="button"
      className={cn(
        "w-full flex items-center gap-2 rounded-md px-2 py-1.5 text-sm",
        isActive ? "bg-primary/10 font-medium" : "hover:bg-muted",
      )}
      onClick={onClick}
    >
      <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
      <span className="truncate">{name}</span>
      {unreadCount > 0 && <Badge className="ml-auto shrink-0">{unreadCount}</Badge>}
    </button>
  )
}
