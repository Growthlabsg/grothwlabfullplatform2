"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { MessageComposer } from "../communication-center/message-composer"

interface ThreadReplyProps {
  messageId: string
  originalMessage: {
    id: string
    content: string
    sender: {
      id: string
      name: string
      avatar?: string
    }
    timestamp: Date
  }
  replies: Array<{
    id: string
    content: string
    sender: {
      id: string
      name: string
      avatar?: string
    }
    timestamp: Date
  }>
  onClose: () => void
  onReply: (messageId: string, content: string) => void
  className?: string
}

export function ThreadReply({ messageId, originalMessage, replies, onClose, onReply, className }: ThreadReplyProps) {
  const [replyInput, setReplyInput] = useState("")

  const handleSendReply = () => {
    if (!replyInput.trim()) return
    onReply(messageId, replyInput)
    setReplyInput("")
  }

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date)
  }

  return (
    <div className={cn("flex flex-col h-full border-l", className)}>
      <div className="flex items-center justify-between p-3 border-b">
        <div className="flex items-center">
          <MessageSquare className="h-5 w-5 mr-2" />
          <h3 className="font-medium">Thread</h3>
          <span className="text-xs text-muted-foreground ml-2">{replies.length} replies</span>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="p-3 border-b bg-muted/30">
        <div className="flex items-start gap-3">
          <Avatar className="h-8 w-8 mt-0.5">
            <AvatarImage src={originalMessage.sender.avatar || "/placeholder.svg"} alt={originalMessage.sender.name} />
            <AvatarFallback>{originalMessage.sender.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center">
              <span className="font-medium">{originalMessage.sender.name}</span>
              <span className="text-xs text-muted-foreground ml-2">{formatTime(originalMessage.timestamp)}</span>
            </div>
            <p className="mt-1">{originalMessage.content}</p>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-3 space-y-4">
          {replies.map((reply) => (
            <div key={reply.id} className="flex items-start gap-3">
              <Avatar className="h-7 w-7 mt-0.5">
                <AvatarImage src={reply.sender.avatar || "/placeholder.svg"} alt={reply.sender.name} />
                <AvatarFallback className="text-xs">{reply.sender.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center">
                  <span className="font-medium text-sm">{reply.sender.name}</span>
                  <span className="text-xs text-muted-foreground ml-2">{formatTime(reply.timestamp)}</span>
                </div>
                <p className="mt-0.5 text-sm">{reply.content}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-3 border-t">
        <MessageComposer
          value={replyInput}
          onChange={setReplyInput}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              handleSendReply()
            }
          }}
          onSend={handleSendReply}
          onSchedule={() => {}}
        />
      </div>
    </div>
  )
}
