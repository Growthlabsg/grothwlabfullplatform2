"use client"

import { Button } from "@/components/ui/button"
import { MessageSquare, Plus, Users } from "lucide-react"

interface EmptyStateProps {
  onNewChat: () => void
}

export function EmptyState({ onNewChat }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      <div className="flex justify-center mb-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <MessageSquare className="h-8 w-8 text-primary opacity-80" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <Plus className="h-5 w-5 text-primary" />
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-2 tracking-tight">Start a conversation</h2>
      <p className="text-muted-foreground max-w-md mb-6">
        Connect with your team members, collaborate on projects, and share ideas through direct messages or group chats.
      </p>
      <div className="flex gap-4">
        <Button onClick={onNewChat} className="gap-2">
          <MessageSquare className="h-4 w-4" />
          New message
        </Button>
        <Button variant="outline" onClick={onNewChat} className="gap-2">
          <Users className="h-4 w-4" />
          Create group
        </Button>
      </div>
    </div>
  )
}
