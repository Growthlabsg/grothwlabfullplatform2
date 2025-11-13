"use client"

import { useState } from "react"
import { MoreHorizontal, Reply, Forward, Archive, Bell, BellOff, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface NotificationActionsProps {
  notificationId: string
  onReply?: () => void
  onForward?: () => void
  onArchive?: () => void
  onMute?: () => void
  onUnmute?: () => void
  onDelete?: () => void
  isMuted?: boolean
}

export function NotificationActions({
  notificationId,
  onReply,
  onForward,
  onArchive,
  onMute,
  onUnmute,
  onDelete,
  isMuted = false,
}: NotificationActionsProps) {
  const [open, setOpen] = useState(false)

  const handleAction = (action: () => void) => {
    action()
    setOpen(false)
  }

  return (
    <div className="flex items-center gap-1">
      {onReply && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onReply}>
                <Reply className="h-4 w-4" />
                <span className="sr-only">Reply</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Reply</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">More actions</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {onForward && (
            <DropdownMenuItem onClick={() => handleAction(onForward)}>
              <Forward className="mr-2 h-4 w-4" />
              <span>Forward</span>
            </DropdownMenuItem>
          )}

          {onArchive && (
            <DropdownMenuItem onClick={() => handleAction(onArchive)}>
              <Archive className="mr-2 h-4 w-4" />
              <span>Archive</span>
            </DropdownMenuItem>
          )}

          {isMuted && onUnmute && (
            <DropdownMenuItem onClick={() => handleAction(onUnmute)}>
              <Bell className="mr-2 h-4 w-4" />
              <span>Unmute</span>
            </DropdownMenuItem>
          )}

          {!isMuted && onMute && (
            <DropdownMenuItem onClick={() => handleAction(onMute)}>
              <BellOff className="mr-2 h-4 w-4" />
              <span>Mute</span>
            </DropdownMenuItem>
          )}

          {onDelete && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleAction(onDelete)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
