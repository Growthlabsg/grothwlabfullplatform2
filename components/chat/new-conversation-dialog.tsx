"use client"

import { useState } from "react"
import { useChat } from "@/contexts/chat-context"
import { useAuth } from "@/contexts/auth-context"
import { Search, Users, Lock } from "lucide-react"
import { useFeatureAccess } from "@/hooks/use-feature-access"
import { UpgradeModal } from "@/components/subscription/upgrade-modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { ConversationTopic } from "@/types/chat"

interface NewConversationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NewConversationDialog({ open, onOpenChange }: NewConversationDialogProps) {
  const { createConversation, sendConnectionRequest } = useChat()
  const { user } = useAuth()
  const { useFeatureWithLimit } = useFeatureAccess()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [message, setMessage] = useState("")
  const [topic, setTopic] = useState<ConversationTopic>("general_networking")
  const [customTopic, setCustomTopic] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  
  // Check messaging limits
  const messagingFeature = useFeatureWithLimit("messagesToUnconnected", "free")

  // Mock user search results
  const searchResults = !searchQuery
    ? []
    : [
        {
          id: "user-mentor-1",
          name: "Sarah Chen",
          role: "Mentor",
          avatar: "/placeholder.svg?height=40&width=40",
          isConnected: true,
        },
        {
          id: "user-investor-1",
          name: "Michael Wong",
          role: "Investor",
          avatar: "/placeholder.svg?height=40&width=40",
          isConnected: true,
        },
        {
          id: "user-founder-2",
          name: "Lisa Tan",
          role: "Founder",
          avatar: "/placeholder.svg?height=40&width=40",
          isConnected: false,
        },
      ].filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.role.toLowerCase().includes(searchQuery.toLowerCase()),
      )

  const handleUserSelect = (userId: string) => {
    setSelectedUserId(userId)
    const user = searchResults.find((u) => u.id === userId)
    setIsConnected(user?.isConnected || false)
  }

  const handleSubmit = async () => {
    if (!selectedUserId || !message) return

    // Check messaging limits for unconnected users
    if (!isConnected && !messagingFeature.canExecute) {
      setShowUpgradeModal(true)
      return
    }

    setIsLoading(true)
    try {
      if (isConnected) {
        // Create a new conversation if already connected
        const conversation = await createConversation(
          [selectedUserId],
          topic,
          topic === "custom" ? customTopic : undefined,
        )

        // Send the initial message
        await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API delay

        onOpenChange(false)

        // Reset form
        setSearchQuery("")
        setSelectedUserId(null)
        setMessage("")
        setTopic("general_networking")
        setCustomTopic("")
      } else {
        // Send a connection request if not connected
        await sendConnectionRequest(selectedUserId, message, topic, topic === "custom" ? customTopic : undefined)

        // Increment usage for messaging unconnected users
        messagingFeature.executeFeature(() => {})

        onOpenChange(false)

        // Reset form
        setSearchQuery("")
        setSelectedUserId(null)
        setMessage("")
        setTopic("general_networking")
        setCustomTopic("")
      }
    } catch (error) {
      console.error("Error creating conversation:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const topicOptions = [
    { value: "general_networking", label: "General Networking" },
    { value: "investment_opportunity", label: "Investment Opportunity" },
    { value: "seeking_mentorship", label: "Seeking Mentorship" },
    { value: "partnership_proposal", label: "Partnership Proposal" },
    { value: "job_opportunity", label: "Job Opportunity" },
    { value: "startup_advice", label: "Startup Advice" },
    { value: "custom", label: "Custom Topic" },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>New Conversation</DialogTitle>
          <DialogDescription>Connect with other professionals in the GrowthLab community.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="user-search">Find a person</Label>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="user-search"
                placeholder="Search by name or role..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {searchQuery && (
            <div className="rounded-md border">
              <ScrollArea className="h-[200px]">
                {searchResults.length === 0 ? (
                  <div className="flex h-full items-center justify-center p-4 text-center text-sm text-muted-foreground">
                    No users found
                  </div>
                ) : (
                  <div className="space-y-1 p-2">
                    {searchResults.map((result) => (
                      <div
                        key={result.id}
                        className={`flex cursor-pointer items-center gap-3 rounded-md p-3 transition-colors ${
                          selectedUserId === result.id ? "bg-muted" : "hover:bg-muted/50"
                        }`}
                        onClick={() => handleUserSelect(result.id)}
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={result.avatar || "/placeholder.svg"} alt={result.name} />
                          <AvatarFallback>
                            {result.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{result.name}</p>
                            {result.isConnected && (
                              <Badge variant="outline" className="ml-2">
                                <Users className="mr-1 h-3 w-3" />
                                Connected
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{result.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </div>
          )}

          {selectedUserId && (
            <>
              <div className="space-y-2">
                <Label htmlFor="topic">Conversation Topic</Label>
                <Select value={topic} onValueChange={(value) => setTopic(value as ConversationTopic)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a topic" />
                  </SelectTrigger>
                  <SelectContent>
                    {topicOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {topic === "custom" && (
                <div className="space-y-2">
                  <Label htmlFor="custom-topic">Custom Topic</Label>
                  <Input
                    id="custom-topic"
                    placeholder="Enter a custom topic..."
                    value={customTopic}
                    onChange={(e) => setCustomTopic(e.target.value)}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="message">{isConnected ? "Message" : "Connection Request Message"}</Label>
                <Textarea
                  id="message"
                  placeholder={
                    isConnected
                      ? "Type your message here..."
                      : "Introduce yourself and explain why you'd like to connect..."
                  }
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  {isConnected
                    ? "This will start a new conversation."
                    : "This person will need to accept your connection request before you can message them."}
                </p>
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!selectedUserId || !message || isLoading}
            className="bg-[#0F7377] hover:bg-[#0F7377]/90"
          >
            {isLoading ? "Sending..." : isConnected ? "Start Conversation" : "Send Connection Request"}
          </Button>
        </DialogFooter>
      </DialogContent>

      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        feature="messagesToUnconnected"
        requiredTier="premium"
        currentUsage={messagingFeature.currentUsage}
        limit={messagingFeature.limit}
        message="You've reached your limit for messaging unconnected users. Upgrade to Premium for unlimited messaging and networking opportunities."
      />
    </Dialog>
  )
}
