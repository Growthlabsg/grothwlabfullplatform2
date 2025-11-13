import type { Channel, Message, User, ChannelType, PlatformType } from "@/types/communication"

// Define MessageStatus type
type MessageStatus = "sent" | "delivered" | "read"

// Mock users
const mockUsers: User[] = [
  {
    id: "user-1",
    name: "Alex Wong",
    avatar: "/placeholder.svg?key=q8efg",
    status: "online",
  },
  {
    id: "user-2",
    name: "Sarah Chen",
    avatar: "/placeholder.svg?key=imfrv",
    status: "away",
  },
  {
    id: "user-3",
    name: "Michael Tan",
    avatar: "/placeholder.svg?key=ir3ds",
    status: "offline",
    lastSeen: new Date(Date.now() - 3600000), // 1 hour ago
  },
  {
    id: "user-4",
    name: "Priya Singh",
    avatar: "/playstation-controller-closeup.png",
    status: "busy",
  },
  {
    id: "user-5",
    name: "David Lee",
    avatar: "/abstract-dl.png",
    status: "online",
  },
  {
    id: "current-user",
    name: "You",
    avatar: "/Abstract-Geometric-Shapes.png",
    status: "online",
  },
]

// Generate random date within the last week
const randomRecentDate = () => {
  const now = new Date()
  const pastDate = new Date(now.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000)
  return pastDate
}

// Generate random message content
const messageTemplates = [
  "Hey, how's it going with the project?",
  "Just checking in on the progress of the startup application.",
  "Can we schedule a meeting to discuss the funding proposal?",
  "I've shared the latest pitch deck with you.",
  "Have you seen the new investor that joined our platform?",
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

// Generate random channel name
const generateChannelName = (type: ChannelType, index: number): string => {
  switch (type) {
    case "direct":
      return mockUsers[index % mockUsers.length].name
    case "group":
      return `Startup Team ${index}`
    case "team":
      return `# ${["marketing", "engineering", "product", "design", "sales"][index % 5]}`
    case "community":
      return `Singapore Founders ${index}`
    case "broadcast":
      return `Announcements ${index}`
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
      name: (mockUsers[i] ? mockUsers[i].name : undefined),
      type: "direct",
      avatar: (mockUsers[i] ? mockUsers[i].avatar : undefined),
      lastMessage: {
        content: messageTemplates[Math.floor(Math.random() * messageTemplates.length)],
        timestamp: randomRecentDate(),
      },
      unreadCount: Math.random() > 0.7 ? Math.floor(Math.random() * 5) + 1 : 0,
      members: 2, // You and the other person
      platform:
        Math.random() > 0.7
          ? (["whatsapp", "telegram", "slack"] as PlatformType[])[Math.floor(Math.random() * 3)]
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
        content: messageTemplates[Math.floor(Math.random() * messageTemplates.length)],
        timestamp: randomRecentDate(),
      },
      unreadCount: Math.random() > 0.6 ? Math.floor(Math.random() * 10) + 1 : 0,
      members: Math.floor(Math.random() * 6) + 3,
      platform: Math.random() > 0.5 ? "whatsapp" : "native",
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
        content: messageTemplates[Math.floor(Math.random() * messageTemplates.length)],
        timestamp: randomRecentDate(),
      },
      unreadCount: Math.random() > 0.5 ? Math.floor(Math.random() * 8) + 1 : 0,
      members: Math.floor(Math.random() * 10) + 5,
      platform: "slack",
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
        content: messageTemplates[Math.floor(Math.random() * messageTemplates.length)],
        timestamp: randomRecentDate(),
      },
      unreadCount: Math.random() > 0.4 ? Math.floor(Math.random() * 15) + 1 : 0,
      members: Math.floor(Math.random() * 50) + 20,
      platform: "telegram",
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
      platform: "native",
    })
  }

  // Sort by last message timestamp (most recent first)
  return channels.sort((a, b) => {
    if (!a.lastMessage || !b.lastMessage) return 0
    return b.lastMessage.timestamp.getTime() - a.lastMessage.timestamp.getTime()
  })
}

// Generate mock messages for a channel
export const generateMockMessages = (channelId: string): Message[] => {
  const messages: Message[] = []
  const messageCount = Math.floor(Math.random() * 15) + 5

  // Determine if this is a direct channel
  const isDirect = channelId.startsWith("direct-")
  const otherUser = isDirect ? mockUsers[Number.parseInt(channelId.split("-")[1])] : null

  // Generate messages
  for (let i = 0; i < messageCount; i++) {
    const isOwn = Math.random() > 0.5
    const sender = isOwn ? mockUsers[5] : otherUser || mockUsers[Math.floor(Math.random() * 5)]

    const timestamp = new Date()
    timestamp.setMinutes(timestamp.getMinutes() - (messageCount - i) * 5)

    messages.push({
      id: `msg-${channelId}-${i}`,
      channelId,
      content: messageTemplates[Math.floor(Math.random() * messageTemplates.length)],
      sender,
      timestamp,
      status: isOwn ? (["sent", "delivered", "read"] as MessageStatus[])[Math.floor(Math.random() * 3)] : "read",
      isOwn,
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
