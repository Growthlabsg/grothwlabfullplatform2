"use client"

import { useEffect } from "react"
import { MessageView as BaseMessageView } from "./message-view"
import { useNotificationSound } from "@/contexts/notification-sound-context"
import { useCommunication } from "@/contexts/communication-context"
import type { Channel, Section } from "@/types/communication"

interface MessageViewExtendedProps {
  channel: Channel
  section: Section | null
}

export function MessageViewExtended({ channel, section }: MessageViewExtendedProps) {
  const { playSound } = useNotificationSound()
  const { currentUser } = useCommunication()

  // Play notification sound when this channel is first viewed
  useEffect(() => {
    if (channel.unread > 0) {
      // Only play for channels with unread messages
      playSound("system")
    }
  }, [channel.id])

  return <BaseMessageView channel={channel} section={section} />
}
