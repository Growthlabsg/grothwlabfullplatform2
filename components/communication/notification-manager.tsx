"use client"

import React, { useEffect } from "react"
import { useCommunication } from "@/contexts/communication-context"
import { useNotificationSound } from "@/contexts/notification-sound-context"
import { RealTimeNotification } from "@/components/communication/real-time-notification"

export function NotificationManager() {
  const { currentUser, messages, channels } = useCommunication()
  const { playSound, settings } = useNotificationSound()

  // Store the message counts to detect new messages
  const [messageCounts, setMessageCounts] = React.useState<Record<string, number>>({})

  // Initialize message counts
  useEffect(() => {
    const counts: Record<string, number> = {}
    Object.keys(messages).forEach((channelId) => {
      counts[channelId] = (messages[channelId] ? messages[channelId].length : undefined)
    })
    setMessageCounts(counts)
  }, [])

  // Monitor for new messages
  useEffect(() => {
    Object.keys(messages).forEach((channelId) => {
      const newCount = (messages[channelId] ? messages[channelId].length : undefined)
      const previousCount = messageCounts[channelId] || 0

      if (newCount > previousCount) {
        // We have new messages
        const newMessages = (messages[channelId] ? messages[channelId].slice : undefined)(previousCount)

        newMessages.forEach((message) => {
          // Don't notify for own messages
          if (message.sender.id === currentUser.id) return

          // Check if it's a mention (this is a simplified check, in real app would be more robust)
          const isMention = message.content.includes(`@${currentUser.name}`)

          // Play the appropriate sound
          if (isMention) {
            playSound("mention")
          } else {
            playSound("message")
          }
        })

        // Update the message count
        setMessageCounts((prev) => ({
          ...prev,
          [channelId]: newCount,
        }))
      }
    })
  }, [messages, messageCounts, currentUser, playSound])

  return <RealTimeNotification position="top-right" maxNotifications={5} autoClose={true} autoCloseDelay={6000} />
}
