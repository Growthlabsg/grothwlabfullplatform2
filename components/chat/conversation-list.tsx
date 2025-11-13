"use client"

import type React from "react"

import { useState } from "react"
import { useChat } from "@/contexts/chat-context"
import { useAuth } from "@/contexts/auth-context"
import { formatDistanceToNow } from "date-fns"
import { Search, Plus, Archive } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { NewConversationDialog } from "@/components/chat/new-conversation-dialog"
import type { Conversation } from "@/types/chat"

export function ConversationList() {
  const { conversations, activeConversation, setActiveConversation, archiveConversation } = useChat()
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [showNewConversationDialog, setShowNewConversationDialog] = useState(false)

  // Filter conversations based on search query
  const filteredConversations = conversations
    .filter((conv) => !conv.isArchived)
    .filter((conv) => {
      if (!searchQuery) return true

      // In a real app, you would search by participant name
      // For demo purposes, we'll just search by conversation ID
      return conv.id.toLowerCase().includes(searchQuery.toLowerCase())
    })
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())

  const getTopicLabel = (topic?: string) => {
    if (!topic) return null

    const topicMap: Record<string, string> = {
      investment_opportunity: "Investment",
      seeking_mentorship: "Mentorship",
      partnership_proposal: "Partnership",
      general_networking: "Networking",
      job_opportunity: "Job",
      startup_advice: "Advice",
      custom: "Custom",
    }

    return topicMap[topic] || topic
  }

  const getParticipantId = (conversation: Conversation) => {
    if (!user) return ""
    return conversation.participants.find((id) => id !== user.id) || ""
  }

  // Mock function to get participant name
  const getParticipantName = (participantId: string) => {
    const mockNames: Record<string, string> = {
      "user-mentor-1": "Sarah Chen (Mentor)",
      "user-investor-1": "Michael Wong (Investor)",
      "user-founder-1": "Raj Patel (Founder)",
    }

    return mockNames[participantId] || "Unknown User"
  }

  // Mock function to get participant avatar
  const getParticipantAvatar = (participantId: string) => {
    return `/placeholder.svg?height=40&width=40`
  }

  const handleArchive = (e: React.MouseEvent, conversationId: string) => {
    e.stopPropagation()
    archiveConversation(conversationId)
  }

  return (
    <div className="flex h-full flex-col border-r">
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="text-lg font-semibold">Messages</h2>
        <Button variant="ghost" size="icon" onClick={() => setShowNewConversationDialog(true)} title="New Conversation">
          <Plus className="h-5 w-5" />
        </Button>
      </div>

      <div className="border-b p-4">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        {filteredConversations.length === 0 ? (
          <div className="flex h-32 items-center justify-center text-center text-sm text-muted-foreground">
            {searchQuery ? "No conversations found" : "No conversations yet"}
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {filteredConversations.map((conversation) => {
              const participantId = getParticipantId(conversation)
              const participantName = getParticipantName(participantId)
              const participantAvatar = getParticipantAvatar(participantId)
              const isActive = activeConversation?.id === conversation.id

              return (
                <div
                  key={conversation.id}
                  className={`flex cursor-pointer items-start gap-3 rounded-md p-3 transition-colors ${
                    isActive ? "bg-muted" : "hover:bg-muted/50"
                  }`}
                  onClick={() => setActiveConversation(conversation.id)}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={participantAvatar || "/placeholder.svg"} alt={participantName} />
                    <AvatarFallback>
                      {participantName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-1 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <p className="truncate font-medium">{participantName}</p>
                      <p className="whitespace-nowrap text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(conversation.updatedAt), { addSuffix: true })}
                      </p>
                    </div>

                    {conversation.topic && (
                      <Badge variant="outline" className="mb-1 text-xs">
                        {getTopicLabel(conversation.topic)}
                      </Badge>
                    )}

                    <p className="truncate text-sm text-muted-foreground">
                      {conversation.lastMessage?.content || "No messages yet"}
                    </p>

                    <div className="flex items-center justify-between">
                      {conversation.unreadCount > 0 && (
                        <Badge className="bg-[#0F7377]">{conversation.unreadCount}</Badge>
                      )}

                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-auto h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                        onClick={(e) => handleArchive(e, conversation.id)}
                        title="Archive Conversation"
                      >
                        <Archive className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </ScrollArea>

      <NewConversationDialog open={showNewConversationDialog} onOpenChange={setShowNewConversationDialog} />
    </div>
  )
}
