import type { User, Channel, Message, Attachment, PlatformType, MessageStatus } from "@/types/communication"

// Generate random date within the last week
const randomRecentDate = () => {
  const now = new Date()
  const pastDate = new Date(now.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000)
  return pastDate
}

// Mock user profiles
export const mockUsers: User[] = [
  {
    id: "user-1",
    name: "Sarah Chen",
    avatar: "/abstract-geometric-shapes.png",
    status: "online",
  },
  {
    id: "user-2",
    name: "Alex Wong",
    avatar: "/abstract-geometric-aw.png",
    status: "away",
  },
  {
    id: "user-3",
    name: "Mei Lin",
    avatar: "/machine-learning-concept.png",
    status: "offline",
    lastSeen: new Date(Date.now() - 3600000), // 1 hour ago
  },
  {
    id: "user-4",
    name: "David Park",
    avatar: "/abstract-dl.png",
    status: "busy",
  },
  {
    id: "user-5",
    name: "Lisa Chen",
    avatar: "/thoughtful-portrait.png",
    status: "online",
  },
  {
    id: "current-user",
    name: "You",
    avatar: "/vibrant-street-market.png",
    status: "online",
  },
]

// Message templates for realistic conversations
const messageTemplates = [
  "Hey, how's it going with the startup?",
  "Just checking in on the progress of the application.",
  "Can we schedule a meeting to discuss the funding proposal?",
  "I've shared the latest pitch deck with you.",
  "Have you seen the new investor that joined the platform?",
  "The mentor session yesterday was really insightful!",
  "Looking forward to the demo day next week.",
  "We need to finalize the team for the hackathon.",
  "Just submitted our application to the accelerator program.",
  "The feedback from the last pitch was really constructive.",
  "Do you have time to review my business model?",
  "I've updated the financial projections as requested.",
  "The new feature is ready for testing.",
  "Can you introduce me to that VC you mentioned?",
  "Our user growth metrics are looking promising this month.",
]

// Attachment templates
const attachmentTemplates: Partial<Attachment>[] = [
  {
    type: "image",
    name: "pitch-deck.png",
    size: 1200000,
    thumbnail: "/startup-pitch-competition.png",
  },
  {
    type: "file",
    name: "financial-projections.pdf",
    size: 2500000,
  },
  {
    type: "audio",
    name: "meeting-recording.mp3",
    size: 3400000,
    duration: 1245, // in seconds
  },
  {
    type: "video",
    name: "product-demo.mp4",
    size: 15000000,
    duration: 180, // in seconds
    thumbnail: "/product-manager-brainstorm.png",
  },
]

// Generate a channel name based on type
const generateChannelName = (type: string, index: number): string => {
  switch (type) {
    case "direct":
      return mockUsers[index % mockUsers.length]?.name || `User ${index}`
    case "group":
      return ["Product Team", "Marketing Strategy", "Funding Roundtable", "Tech Stack Discussion", "Growth Team"][
        index % 5
      ] || `Group ${index}`
    case "team":
      return ["# general", "# announcements", "# random", "# help-desk", "# introductions"][index % 5] || `# team-${index}`
    case "community":
      return ["Singapore Founders", "Fintech Innovators", "AI Enthusiasts", "Blockchain Builders", "SaaS Founders"][
        index % 5
      ] || `Community ${index}`
    case "broadcast":
      return ["Important Updates", "Event Announcements", "Funding Opportunities", "Network News", "Weekly Digest"][
        index % 5
      ] || `Broadcast ${index}`
    default:
      return `Channel ${index}`
  }
}

// Generate mock channels
export const generateMockChannels = (): Channel[] => {
  const channels: Channel[] = []

  // Direct messages
  for (let i = 0; i < 5; i++) {
    channels.push({
      id: `direct-${i}`,
      name: mockUsers[i]?.name || `User ${i}`,
      type: "direct",
      avatar: mockUsers[i]?.avatar || "/default-avatar.png",
      lastMessage: {
        content: messageTemplates[Math.floor(Math.random() * messageTemplates.length)] || "No message",
        timestamp: randomRecentDate(),
      },
      unreadCount: Math.random() > 0.7 ? Math.floor(Math.random() * 5) + 1 : 0,
      members: 2, // You and one other person
      platform:
        Math.random() > 0.7
          ? (["whatsapp", "telegram", "slack"] as PlatformType[])[Math.floor(Math.random() * 3)] || "native"
          : "native",
    })
  }

  // Group chats
  for (let i = 0; i < 3; i++) {
    channels.push({
      id: `group-${i}`,
      name: generateChannelName("group", i),
      type: "group",
      lastMessage: {
        content: messageTemplates[Math.floor(Math.random() * messageTemplates.length)] || "No message",
        timestamp: randomRecentDate(),
      },
      unreadCount: Math.random() > 0.6 ? Math.floor(Math.random() * 10) + 1 : 0,
      members: Math.floor(Math.random() * 6) + 3,
      platform: (Math.random() > 0.5 ? "whatsapp" : "native") as PlatformType,
      isPinned: i === 0,
    })
  }

  // Team channels
  for (let i = 0; i < 4; i++) {
    channels.push({
      id: `team-${i}`,
      name: generateChannelName("team", i),
      type: "team",
      description: "Team collaboration channel",
      lastMessage: {
        content: messageTemplates[Math.floor(Math.random() * messageTemplates.length)] || "No message",
        timestamp: randomRecentDate(),
      },
      unreadCount: Math.random() > 0.5 ? Math.floor(Math.random() * 8) + 1 : 0,
      members: Math.floor(Math.random() * 10) + 5,
      platform: "slack" as PlatformType,
      color: ["#FF5733", "#33FF57", "#3357FF", "#F033FF"][i % 4],
    })
  }

  // Community channels
  for (let i = 0; i < 2; i++) {
    channels.push({
      id: `community-${i}`,
      name: generateChannelName("community", i),
      type: "community",
      description: "Community discussion forum",
      lastMessage: {
        content: messageTemplates[Math.floor(Math.random() * messageTemplates.length)] || "No message",
        timestamp: randomRecentDate(),
      },
      unreadCount: Math.random() > 0.4 ? Math.floor(Math.random() * 15) + 1 : 0,
      members: Math.floor(Math.random() * 50) + 20,
      platform: "telegram" as PlatformType,
    })
  }

  // Broadcast channels
  for (let i = 0; i < 2; i++) {
    channels.push({
      id: `broadcast-${i}`,
      name: generateChannelName("broadcast", i),
      type: "broadcast",
      description: "Official announcements",
      lastMessage: {
        content: "Important update: " + messageTemplates[Math.floor(Math.random() * messageTemplates.length)],
        timestamp: randomRecentDate(),
      },
      unreadCount: Math.random() > 0.3 ? Math.floor(Math.random() * 3) + 1 : 0,
      members: Math.floor(Math.random() * 100) + 50,
      platform: "native" as PlatformType,
    })
  }

  // Sort by last message timestamp (most recent first)
  return channels.sort((a, b) => {
    if (!a.lastMessage || !b.lastMessage) return 0
    return b.lastMessage.timestamp.getTime() - a.lastMessage.timestamp.getTime()
  })
}

// Generate realistic messages with proper threading and timestamps
export const generateMockMessages = (channelId: string): Message[] => {
  const messages: Message[] = []
  const messageCount = Math.floor(Math.random() * 15) + 10

  // Determine if this is a direct channel
  const isDirect = channelId.startsWith("direct-")
  const otherUser = isDirect ? mockUsers[Number.parseInt(channelId.split("-")[1] || "0")] : null

  // Create conversation thread
  for (let i = 0; i < messageCount; i++) {
    const isOwn = Math.random() > 0.5
    const sender = isOwn ? mockUsers[5] : (otherUser || mockUsers[Math.floor(Math.random() * 5)])

    const timestamp = new Date()
    timestamp.setMinutes(timestamp.getMinutes() - (messageCount - i) * 15)

    // Randomly add attachment to some messages
    const hasAttachment = Math.random() > 0.8
    let attachments: Attachment[] | undefined

    if (hasAttachment) {
      const template = attachmentTemplates[Math.floor(Math.random() * attachmentTemplates.length)]

      if (template && template.type && template.name) {
        attachments = [
          {
            id: `att-${Date.now()}-${i}`,
            type: template.type,
            url: template.type === "image" || template.type === "video" ? template.thumbnail || "/placeholder.svg" : "#",
            name: template.name,
            size: template.size,
            duration: template.duration,
            thumbnail: template.thumbnail,
          },
        ]
      }
    }

    // Random reply to earlier message (for threads)
    let replyTo: Message["replyTo"] = undefined
    if (i > 2 && Math.random() > 0.8) {
      const replyIndex = Math.floor(Math.random() * (i - 1))
      replyTo = `msg-${channelId}-${replyIndex}`
    }

    messages.push({
      id: `msg-${channelId}-${i}`,
      channelId,
      content: messageTemplates[Math.floor(Math.random() * messageTemplates.length)] || "No message",
      sender: sender!,
      timestamp,
      status: isOwn ? (["sent", "delivered", "read"] as MessageStatus[])[Math.floor(Math.random() * 3)] || "read" : "read",
      isOwn,
      attachments,
      replyTo,
      platform: channelId.includes("slack")
        ? "slack"
        : channelId.includes("whatsapp")
          ? "whatsapp"
          : channelId.includes("telegram")
            ? "telegram"
            : "native",
    })
  }

  return messages
}
