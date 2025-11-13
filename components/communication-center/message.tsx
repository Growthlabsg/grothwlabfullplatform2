"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Copy,
  MessageSquarePlus,
  ThumbsUp,
  MoreHorizontal,
  Reply,
  Forward,
  Languages,
  Trash,
  AlarmClock,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { Message as MessageType } from "@/types/communication"
import { cn } from "@/lib/utils"

interface MessageProps {
  message: MessageType
  onTranslateClick: () => void
  showSender?: boolean
}

export function Message({ message, onTranslateClick, showSender = true }: MessageProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isReacted, setIsReacted] = useState(false)

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date)
  }

  const handleThumbsUp = () => {
    setIsReacted(!isReacted)
  }

  return (
    <div
      className={cn("group flex gap-2 py-1", message.isOwn ? "justify-end" : "")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!message.isOwn && showSender && (
        <Avatar className="h-8 w-8 mt-1 flex-shrink-0">
          <AvatarImage src={message.sender?.avatar || "/placeholder.svg"} alt={message.sender?.name || ""} />
          <AvatarFallback>{message.sender?.name?.charAt(0) || "?"}</AvatarFallback>
        </Avatar>
      )}

      {!message.isOwn && !showSender && <div className="w-8 flex-shrink-0"></div>}

      <div className={cn("flex flex-col max-w-[75%]", message.isOwn ? "items-end" : "items-start")}>
        {showSender && !message.isOwn && (
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium">{message.sender?.name}</span>
            <span className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</span>
          </div>
        )}

        <div className="relative">
          {/* Reply context if present */}
          {message.replyTo && (
            <div
              className={cn(
                "text-xs rounded-t-md px-3 py-2 mb-px max-w-full overflow-hidden text-ellipsis",
                message.isOwn ? "bg-primary/10 text-primary rounded-l-md" : "bg-muted/70 rounded-r-md",
              )}
            >
              <div className="font-medium mb-0.5">
                {message.replyTo.sender === "You" ? "You" : message.replyTo.sender}
              </div>
              <div className="text-muted-foreground truncate">{message.replyTo.content}</div>
            </div>
          )}

          {/* Main message bubble */}
          <div
            className={cn(
              "rounded-lg px-3 py-2 relative",
              message.replyTo
                ? message.isOwn
                  ? "rounded-tl-none bg-primary text-primary-foreground"
                  : "rounded-tr-none bg-muted"
                : message.isOwn
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted",
            )}
          >
            <p className="whitespace-pre-wrap text-sm">{message.content}</p>

            {/* Attachments */}
            {message.attachments && message.attachments.length > 0 && (
              <div className="mt-2 space-y-2">
                {message.attachments.map((attachment) => (
                  <div key={attachment.id} className="rounded-md overflow-hidden">
                    {attachment.type === "image" ? (
                      <img
                        src={attachment.url || "/placeholder.svg"}
                        alt={attachment.name || "Attachment"}
                        className="max-w-full h-auto rounded"
                      />
                    ) : attachment.type === "file" ? (
                      <div
                        className={cn(
                          "flex items-center gap-2 p-2 rounded-md",
                          message.isOwn ? "bg-primary-foreground/10" : "bg-background",
                        )}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium truncate">{attachment.name}</p>
                          {attachment.size && (
                            <p className="text-xs opacity-70">{(attachment.size / 1024 / 1024).toFixed(1)} MB</p>
                          )}
                        </div>
                        <Button size="sm" variant={message.isOwn ? "secondary" : "outline"} className="h-7 text-xs">
                          Download
                        </Button>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            )}

            {/* Message timestamp and status for own messages */}
            <div
              className={cn(
                "absolute bottom-0 transition-opacity",
                message.isOwn ? "-left-12 right-auto" : "-right-12 left-auto",
                isHovered ? "opacity-100" : "opacity-0",
              )}
            >
              <div className="flex">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={handleThumbsUp}>
                        <ThumbsUp
                          className={cn(
                            "h-3.5 w-3.5",
                            isReacted ? "fill-blue-500 text-blue-500" : "text-muted-foreground",
                          )}
                        />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">{isReacted ? "Remove reaction" : "Like"}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                        <Reply className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Reply</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                      <MoreHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align={message.isOwn ? "end" : "start"} className="w-56">
                    <DropdownMenuItem>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy text
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Forward className="h-4 w-4 mr-2" />
                      Forward
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onTranslateClick}>
                      <Languages className="h-4 w-4 mr-2" />
                      Translate
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <MessageSquarePlus className="h-4 w-4 mr-2" />
                      Save to notes
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    {message.isOwn && (
                      <>
                        <DropdownMenuItem>
                          <AlarmClock className="h-4 w-4 mr-2" />
                          Set reminder
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash className="h-4 w-4 mr-2" />
                          Delete message
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          {/* Message reactions */}
          {isReacted && (
            <div className={cn("absolute -bottom-2", message.isOwn ? "left-0" : "right-0")}>
              <div className="bg-background border rounded-full px-1 py-0.5 shadow-sm">
                <ThumbsUp className="h-3 w-3 fill-blue-500 text-blue-500" />
              </div>
            </div>
          )}
        </div>

        {/* Timestamp for own messages or non-sender non-own messages */}
        {(message.isOwn || !showSender) && (
          <div className="text-xs text-muted-foreground mt-1">
            {formatTime(message.timestamp)}

            {message.isOwn && (
              <span className="ml-1">
                {message.status === "read" ? (
                  <span className="text-blue-500">✓✓</span>
                ) : message.status === "delivered" ? (
                  <span>✓✓</span>
                ) : message.status === "sent" ? (
                  <span>✓</span>
                ) : (
                  <span>🕒</span>
                )}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
