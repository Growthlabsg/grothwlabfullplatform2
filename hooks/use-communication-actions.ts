"use client"

import { useCommunication } from "@/contexts/CommunicationContext"
import { useToast } from "@/components/ui/use-toast"

export function useCommunicationActions() {
  const { openHub, setCurrentChannel, createChannel, sendMessage } = useCommunication()
  const { toast } = useToast()

  // Handle connect action - sends connection request only
  const handleConnect = (user: any) => {
    if (!user) return

    const userName = user.name || user.fullName || "Unknown User"
    
    toast({
      title: "Connection Request Sent",
      description: `Your connection request has been sent to ${userName}. You can chat once they accept your request.`,
    })
  }

  // Handle message action - opens communication hub with specific user (only if connected)
  const handleMessage = (user: any) => {
    if (!user) return

    const userName = user.name || user.fullName || "Unknown User"
    
    // Check if user is connected (in a real app, this would check the connection status)
    const isConnected = user.isConnected || user.connectionStatus === 'connected'
    
    if (!isConnected) {
      toast({
        title: "Connection Required",
        description: `You need to connect with ${userName} first before you can send messages.`,
        variant: "destructive"
      })
      return
    }

    const channelId = `dm-${user.id}`
    
    // Open the communication hub
    openHub()
    
    // Switch to the direct message channel
    setCurrentChannel({
      id: channelId,
      name: userName,
      type: "direct",
      members: [user],
      unreadCount: 0,
      isPinned: false,
      isMuted: false,
      isArchived: false
    })

    toast({
      title: "Opening Chat",
      description: `Opening chat with ${userName} in the Communication Hub.`,
    })
  }

  // Handle chat action - opens communication hub
  const handleChat = () => {
    openHub()
    toast({
      title: "Communication Hub",
      description: "Opening the Communication Hub for all your messaging needs.",
    })
  }

  // Handle group chat action - opens communication hub with group
  const handleGroupChat = (groupName: string, members: any[] = []) => {
    const channelId = `group-${Date.now()}`
    
    // Open the communication hub
    openHub()
    
    // Create or switch to the group channel
    setCurrentChannel({
      id: channelId,
      name: groupName,
      type: "public",
      members: members,
      unreadCount: 0,
      isPinned: false,
      isMuted: false,
      isArchived: false
    })

    toast({
      title: "Group Chat Created",
      description: `Created group chat "${groupName}" in the Communication Hub.`,
    })
  }

  // Handle send message action - sends message to current channel
  const handleSendMessage = (content: string, recipientId?: string) => {
    if (!content.trim()) return

    // Send message through communication context
    sendMessage(content, undefined, recipientId)
    
    toast({
      title: "Message Sent",
      description: "Your message has been sent through the Communication Hub.",
    })
  }

  return {
    handleConnect,
    handleMessage,
    handleChat,
    handleGroupChat,
    handleSendMessage
  }
}
