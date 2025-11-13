export interface ShareRecipient {
  id: string
  name: string
  email: string
  role?: string
  avatar?: string
}

export interface ShareableContent {
  id: string
  type: "recording" | "transcript" | "summary"
  title: string
  date: Date
  ownerId: string
  sharedWith: ShareRecipient[]
  url: string
  size?: number
  duration?: number
  thumbnailUrl?: string
}

// Mock function to share content with specific recipients
export async function shareContent(
  contentId: string,
  contentType: "recording" | "transcript" | "summary",
  recipients: ShareRecipient[],
  customMessage?: string,
): Promise<boolean> {
  console.log(`Sharing ${contentType} (${contentId}) with ${recipients.length} recipients`)

  // In a real implementation, this would call an API to share the content
  // and send notifications to recipients

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return true
}

// Mock function to get a list of possible recipients to share with
export async function getShareRecipients(): Promise<ShareRecipient[]> {
  // In a real implementation, this would fetch contacts, team members, etc.

  // Mock data
  return [
    {
      id: "user1",
      name: "Sarah Wong",
      email: "sarah.wong@example.com",
      role: "Investor",
      avatar: "/abstract-southwest.png",
    },
    {
      id: "user2",
      name: "David Kumar",
      email: "david.kumar@example.com",
      role: "Mentor",
      avatar: "/abstract-geometric-dk.png",
    },
    {
      id: "user3",
      name: "Emily Nguyen",
      email: "emily.nguyen@example.com",
      role: "Founder",
      avatar: "/ancient-forest-path.png",
    },
    {
      id: "user4",
      name: "Michael Zhang",
      email: "michael.zhang@example.com",
      role: "Investor",
      avatar: "/Abstract Monochromatic Zenith.png",
    },
    {
      id: "user5",
      name: "Lisa Lim",
      email: "lisa.lim@example.com",
      role: "Mentor",
      avatar: "/abstract-geometric-ll.png",
    },
  ]
}

// Get shareable link that can be sent via email, messaging, etc.
export function getShareableLink(contentId: string, contentType: string, expiryHours?: number): string {
  // In a real implementation, this would generate a secure, time-limited link
  const expiryParam = expiryHours ? `&expires=${expiryHours}h` : ""
  return `https://app.growthlab.sg/shared/${contentType}/${contentId}?source=share${expiryParam}`
}
