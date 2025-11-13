// Types for reputation events
export type ReputationEventType =
  | "post_created"
  | "post_like_received"
  | "post_comment_received"
  | "post_share_received"
  | "comment_created"
  | "comment_like_received"
  | "profile_view_received"
  | "connection_request_accepted"
  | "event_attended"
  | "event_organized"
  | "funding_received"
  | "mentor_session_completed"
  | "course_completed"
  | "verified_profile"
  | "reported_content"
  | "content_moderated"

export interface ReputationEvent {
  type: ReputationEventType
  userId: string
  targetId?: string
  timestamp: Date
  metadata?: Record<string, any>
}

export interface ReputationBadge {
  id: string
  name: string
  description: string
  imageUrl?: string
  criteria: string
}

export interface ReputationLevel {
  level: number
  name: string
  minPoints: number
  maxPoints: number
  benefits: string[]
  icon: string
}

export interface UserReputation {
  userId: string
  points: number
  level: number
  badges: string[]
  actions: ReputationEvent[]
}

// Reputation points for each event type
const reputationPoints: Record<ReputationEventType, number> = {
  post_created: 2,
  post_like_received: 1,
  post_comment_received: 2,
  post_share_received: 3,
  comment_created: 1,
  comment_like_received: 1,
  profile_view_received: 0.1,
  connection_request_accepted: 5,
  event_attended: 5,
  event_organized: 20,
  funding_received: 50,
  mentor_session_completed: 10,
  course_completed: 15,
  verified_profile: 30,
  reported_content: -5,
  content_moderated: -20,
}

// Mock reputation storage
const reputationEvents: ReputationEvent[] = []
const userReputationScores: Record<string, number> = {}

// Mock reputation levels
const reputationLevels: ReputationLevel[] = [
  {
    level: 1,
    name: "Newcomer",
    minPoints: 0,
    maxPoints: 99,
    benefits: ["Basic access to community features"],
    icon: "🌱",
  },
  {
    level: 2,
    name: "Contributor",
    minPoints: 100,
    maxPoints: 499,
    benefits: ["Create polls", "Post images and links", "Join exclusive groups"],
    icon: "🌿",
  },
  {
    level: 3,
    name: "Established Member",
    minPoints: 500,
    maxPoints: 999,
    benefits: ["Create events", "Highlight comments", "Early access to new features"],
    icon: "🌳",
  },
  {
    level: 4,
    name: "Trusted Member",
    minPoints: 1000,
    maxPoints: 2499,
    benefits: ["Content curation abilities", "Moderation tools", "Featured profile"],
    icon: "🏆",
  },
  {
    level: 5,
    name: "Community Leader",
    minPoints: 2500,
    maxPoints: Number.POSITIVE_INFINITY,
    benefits: [
      "Create community challenges",
      "Mentor new members",
      "Participate in platform decisions",
      "Special profile badge",
    ],
    icon: "👑",
  },
]

// Mock reputation badges
const reputationBadges: ReputationBadge[] = [
  {
    id: "first-post",
    name: "First Post",
    description: "Created your first post",
    criteria: "Create at least 1 post",
  },
  {
    id: "conversation-starter",
    name: "Conversation Starter",
    description: "Started 5 discussions that received comments",
    criteria: "Create 5 posts that receive at least 3 comments each",
  },
  {
    id: "helpful",
    name: "Helpful",
    description: "Provided valuable information to the community",
    criteria: "Receive 10 likes on your comments",
  },
  {
    id: "connected",
    name: "Connected",
    description: "Built a network of connections",
    criteria: "Connect with 10 other members",
  },
  {
    id: "content-creator",
    name: "Content Creator",
    description: "Regularly contributes quality content",
    criteria: "Create at least 20 posts with high engagement",
  },
]

// Mock user reputation data
const userReputations: Record<string, UserReputation> = {
  "user-1": {
    userId: "user-1",
    points: 350,
    level: 2,
    badges: ["first-post", "helpful"],
    actions: [
      {
        type: "post_created",
        userId: "user-1",
        timestamp: new Date("2023-11-01T10:30:00Z"),
      },
      {
        type: "post_like_received",
        userId: "user-1",
        targetId: "post-1",
        timestamp: new Date("2023-11-02T14:20:00Z"),
      },
    ],
  },
}

// Function to update reputation
export function updateReputation(event: ReputationEvent): void {
  reputationEvents.push(event)

  const points = reputationPoints[event.type] || 0
  userReputationScores[event.userId] = (userReputationScores[event.userId] || 0) + points

  // In a real app, this would update the database
  console.log(`[Reputation] Updated for user ${event.userId}: ${points} points (${event.type})`)
}

// Function to get user reputation score
export function getUserReputationScore(userId: string): number {
  return userReputationScores[userId] || 0
}

// Function to get user reputation events
export function getUserReputationEvents(userId: string): ReputationEvent[] {
  return reputationEvents.filter((event) => event.userId === userId)
}

// Function to get reputation level based on score
export function getReputationLevel(score: number): string {
  if (score < 0) return "Restricted"
  if (score < 50) return "Newcomer"
  if (score < 200) return "Regular"
  if (score < 500) return "Established"
  if (score < 1000) return "Respected"
  if (score < 2000) return "Trusted"
  return "Expert"
}

// Function to get reputation badge based on level
export function getReputationBadge(level: string): string {
  switch (level) {
    case "Restricted":
      return "🚫"
    case "Newcomer":
      return "🌱"
    case "Regular":
      return "🌟"
    case "Established":
      return "🏆"
    case "Respected":
      return "💎"
    case "Trusted":
      return "🔰"
    case "Expert":
      return "👑"
    default:
      return "❓"
  }
}

// Function to check if user has enough reputation for an action
export function hasEnoughReputationForAction(userId: string, requiredScore: number): boolean {
  const score = getUserReputationScore(userId)
  return score >= requiredScore
}

// Function to get user reputation
export function getUserReputation(userId: string): UserReputation {
  // In a real app, this would fetch from a database
  return (
    userReputations[userId] || {
      userId,
      points: 0,
      level: 1,
      badges: [],
      actions: [],
    }
  )
}

// Function to get reputation level details
export function getReputationLevelDetails(level: number): ReputationLevel | null {
  return reputationLevels.find((l) => l.level === level) || null
}

// Function to get progress to next level
export function getProgressToNextLevel(userId: string): { current: number; required: number; percentage: number } {
  const userReputation = getUserReputation(userId)
  const currentLevel = reputationLevels.find((l) => l.level === userReputation.level)
  const nextLevel = reputationLevels.find((l) => l.level === userReputation.level + 1)

  if (!currentLevel) {
    return { current: 0, required: 100, percentage: 0 }
  }

  if (!nextLevel) {
    // Max level reached
    return { current: userReputation.points, required: currentLevel.maxPoints, percentage: 100 }
  }

  const current = userReputation.points - currentLevel.minPoints
  const required = nextLevel.minPoints - currentLevel.minPoints
  const percentage = Math.min(100, Math.round((current / required) * 100))

  return { current, required, percentage }
}
