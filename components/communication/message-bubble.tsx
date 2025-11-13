"use client"

import { useState } from "react"
import type { Message as MessageType } from "@/types/communication"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { useCommunication } from "@/contexts/communication-context"
import { CheckCheck, Check, Clock, Edit, Reply, Trash2, Languages, Forward, Copy } from "lucide-react"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Button } from "@/components/ui/button"

interface MessageProps {
  message: MessageType
  onTranslateClick: () => void
}

export function Message({ message, onTranslateClick }: MessageProps) {
  const { currentUser, editMessage, deleteMessage } = useCommunication()
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(message.content)

  const isCurrentUser = message.sender.id === currentUser.id

  // Format timestamp
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
    }).format(date)
  }

  // Get status icon
  const getStatusIcon = (status: MessageType["status"]) => {
    switch (status) {
      case "sending":
        return <Clock className="h-3.5 w-3.5 text-muted-foreground" />
      case "sent":
        return <Check className="h-3.5 w-3.5 text-muted-foreground" />
      case "delivered":
        return <CheckCheck className="h-3.5 w-3.5 text-muted-foreground" />
      case "read":
        return <CheckCheck className="h-3.5 w-3.5 text-primary" />
      default:
        return null
    }
  }

  // Handle edit save
  const handleSaveEdit = () => {
    if (editedContent.trim() !== message.content) {
      editMessage(message.id, editedContent)
    }
    setIsEditing(false)
  }

  // Handle message delete
  const handleDeleteMessage = () => {
    deleteMessage(message.id)
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className={cn("flex gap-3 group", isCurrentUser ? "flex-row-reverse" : "")}>
          {!isCurrentUser && (
            <Avatar className="h-8 w-8">
              <AvatarImage src={message.sender.avatar || "/placeholder.svg"} alt={message.sender.name} />
              <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
            </Avatar>
          )}

          <div className={cn("flex flex-col max-w-[70%]", isCurrentUser ? "items-end" : "items-start")}>
            {!isCurrentUser && (
              <div className="flex items-center mb-1">
                <span className="text-sm font-medium">{message.sender.name}</span>
              </div>
            )}

            <div
              className={cn(
                "rounded-lg px-3 py-2 relative group",
                isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted",
              )}
            >
              {message.replyTo && (
                <div
                  className={cn(
                    "border-l-2 pl-2 mb-1 text-xs",
                    isCurrentUser ? "border-primary-foreground/30" : "border-primary/30",
                  )}
                >
                  <p className="font-medium">Replying to message</p>
                </div>
              )}

              {isEditing ? (
                <div className="min-w-[200px]">
                  <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="w-full p-1 bg-transparent border rounded-md text-sm mb-1"
                    autoFocus
                  />
                  <div className="flex justify-end gap-1">
                    <Button size="sm" variant="ghost" className="h-7 px-2" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button size="sm" variant="default" className="h-7 px-2" onClick={handleSaveEdit}>
                      Save
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                  {message.isEdited && <span className="text-xs ml-1 opacity-70">(edited)</span>}
                  {message.translated && (
                    <div className="text-xs mt-1 opacity-70">Translated from {message.translated.language}</div>
                  )}
                </>
              )}
            </div>

            <div
              className={cn("flex items-center mt-1 text-xs text-muted-foreground", isCurrentUser ? "justify-end" : "")}
            >
              <span>{formatTime(message.timestamp)}</span>

              {isCurrentUser && getStatusIcon(message.status)}
            </div>
          </div>
        </div>
      </ContextMenuTrigger>

      <ContextMenuContent className="w-64">
        <ContextMenuItem onClick={() => {}}>
          <Reply className="h-4 w-4 mr-2" />
          Reply
        </ContextMenuItem>
        <ContextMenuItem onClick={() => {}}>
          <Forward className="h-4 w-4 mr-2" />
          Forward
        </ContextMenuItem>
        <ContextMenuItem onClick={() => {}}>
          <Copy className="h-4 w-4 mr-2" />
          Copy
        </ContextMenuItem>
        <ContextMenuItem onClick={onTranslateClick}>
          <Languages className="h-4 w-4 mr-2" />
          Translate
        </ContextMenuItem>

        <ContextMenuSeparator />

        {isCurrentUser && (
          <>
            <ContextMenuItem onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </ContextMenuItem>
            <ContextMenuItem onClick={handleDeleteMessage} className="text-destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </ContextMenuItem>
          </>
        )}
      </ContextMenuContent>
    </ContextMenu>
  )
}
