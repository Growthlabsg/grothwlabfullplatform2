"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Smile } from "lucide-react"
import { cn } from "@/lib/utils"

interface MessageReactionsProps {
  messageId: string
  reactions: Array<{
    emoji: string
    count: number
    users: Array<{
      id: string
      name: string
    }>
    hasReacted: boolean
  }>
  onReact: (messageId: string, emoji: string) => void
  className?: string
}

const COMMON_EMOJIS = ["👍", "❤️", "😂", "😮", "😢", "👏", "🔥", "🎉"]

export function MessageReactions({ messageId, reactions, onReact, className }: MessageReactionsProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleReact = (emoji: string) => {
    onReact(messageId, emoji)
    setIsOpen(false)
  }

  return (
    <div className={cn("flex flex-wrap gap-1", className)}>
      {reactions.map((reaction) => (
        <TooltipProvider key={reaction.emoji}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={reaction.hasReacted ? "secondary" : "outline"}
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={() => onReact(messageId, reaction.emoji)}
              >
                <span className="mr-1">{reaction.emoji}</span>
                <span>{reaction.count}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-xs">
              {reaction.users
                .slice(0, 3)
                .map((user) => user.name)
                .join(", ")}
              {reaction.users.length > 3 && ` and ${reaction.users.length - 3} more`}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-7 w-7 p-0">
            <Smile className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2" align="start">
          <div className="flex gap-1">
            {COMMON_EMOJIS.map((emoji) => (
              <button type="button"
                key={emoji}
                className="text-lg hover:bg-muted p-1 rounded-md transition-colors"
                onClick={() => handleReact(emoji)}
              >
                {emoji}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
