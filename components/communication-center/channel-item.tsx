"use client"

import type { Channel } from "@/types/communication"
import { Hash, User, Users, Radio, Bell, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
} from "@/components/ui/context-menu"

interface ChannelItemProps {
  channel: Channel
  isActive: boolean
  onClick: () => void
}

export function ChannelItem({ channel, isActive, onClick }: ChannelItemProps) {
  const getChannelIcon = () => {
    // Platform-specific icons
    // Remove channel.platform

    // Type-specific icons
    switch (channel.type) {
      case "channel":
        return channel.icon ? <Hash className="h-4 w-4" /> : <Hash className="h-4 w-4" />
      case "direct":
        return <User className="h-4 w-4" />
      case "group":
        return <Users className="h-4 w-4" />
      case "broadcast":
        return <Radio className="h-4 w-4" />
      default:
        return <Hash className="h-4 w-4" />
    }
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={cn(
                  "flex items-center justify-between py-1.5 px-2 rounded-md text-sm group cursor-pointer",
                  isActive ? "bg-accent text-accent-foreground font-medium" : "hover:bg-muted hover:text-foreground",
                )}
                onClick={onClick}
              >
                <div className="flex items-center min-w-0 flex-1">
                  <span className="mr-2">{getChannelIcon()}</span>
                  <span className="truncate">{channel.name}</span>
                </div>

                <div className="flex items-center space-x-1">
                  {channel.isPinned && <Star className="h-3 w-3 text-muted-foreground" />}

                  {channel.isMuted && <Bell className="h-3 w-3 text-muted-foreground" />}

                  {channel.unreadCount > 0 && (
                    <Badge variant="default" className="ml-auto h-5 min-w-5 px-1 flex items-center justify-center">
                      {channel.unreadCount > 99 ? "99+" : channel.unreadCount}
                    </Badge>
                  )}
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right" className="max-w-xs">
              <div>
                <p className="font-medium">{channel.name}</p>
                {channel.description && <p className="text-xs text-muted-foreground">{channel.description}</p>}
                {channel.members && <p className="text-xs mt-1">{channel.members.length} members</p>}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </ContextMenuTrigger>

      <ContextMenuContent className="w-64">
        <ContextMenuItem className="cursor-pointer">
          <Star className="h-4 w-4 mr-2" />
          {channel.isPinned ? "Unpin" : "Pin"}
        </ContextMenuItem>
        <ContextMenuItem className="cursor-pointer">
          <Bell className="h-4 w-4 mr-2" />
          {channel.isMuted ? "Unmute" : "Mute"}
        </ContextMenuItem>
        <ContextMenuItem className="cursor-pointer">Mark as read</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem className="cursor-pointer text-destructive">
          {channel.isArchived ? "Unarchive" : "Archive"}
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
