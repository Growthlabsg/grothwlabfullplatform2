// Mock connection service for the GrowthLab platform
// This would be replaced with actual API calls in a production environment

export interface Connection {
  id: string
  name: string
  role: string
  company: string
  avatar?: string
  isOnline: boolean
  connectionStrength: number
  lastInteraction?: Date
  tags?: string[]
  mutualConnections?: number
}

export interface ConnectionRequest {
  id: string
  userId: string
  name: string
  role: string
  company: string
  avatar?: string
  message?: string
  timestamp: Date
}

// Mock data
const mockConnections: Connection[] = [
  {
    id: "user-1",
    name: "Alex Wong",
    role: "Founder & CEO",
    company: "TechNova",
    avatar: "/diverse-group.png",
    isOnline: true,
    connectionStrength: 85,
    lastInteraction: new Date(Date.now() - 86400000 * 2), // 2 days ago
    tags: ["Startup", "AI", "Funding"],
    mutualConnections: 12,
  },
  {
    id: "user-2",
    name: "Sarah Chen",
    role: "Investment Manager",
    company: "Singapore Ventures",
    avatar: "/professional-woman-diverse.png",
    isOnline: false,
    connectionStrength: 70,
    lastInteraction: new Date(Date.now() - 86400000 * 5), // 5 days ago
    tags: ["Investor", "VC", "Mentor"],
    mutualConnections: 8,
  },
  {
    id: "user-3",
    name: "Raj Patel",
    role: "CTO",
    company: "DataSphere",
    avatar: "/tech-professional.png",
    isOnline: true,
    connectionStrength: 90,
    lastInteraction: new Date(Date.now() - 86400000), // 1 day ago
    tags: ["Technical", "Data Science", "Scaling"],
    mutualConnections: 15,
  },
  {
    id: "user-4",
    name: "Michelle Tan",
    role: "Marketing Director",
    company: "GrowthHackers",
    avatar: "/marketing-professional.png",
    isOnline: false,
    connectionStrength: 65,
    lastInteraction: new Date(Date.now() - 86400000 * 10), // 10 days ago
    tags: ["Marketing", "Growth", "Strategy"],
    mutualConnections: 5,
  },
  {
    id: "user-5",
    name: "David Kim",
    role: "Angel Investor",
    company: "Independent",
    avatar: "/investor-meeting.png",
    isOnline: false,
    connectionStrength: 50,
    lastInteraction: new Date(Date.now() - 86400000 * 30), // 30 days ago
    tags: ["Investor", "Advisor", "Early Stage"],
    mutualConnections: 3,
  },
]

const mockConnectionRequests: ConnectionRequest[] = [
  {
    id: "req-1",
    userId: "user-6",
    name: "Jessica Lee",
    role: "Product Manager",
    company: "InnovateSG",
    avatar: "/product-manager-brainstorm.png",
    message: "Hi! I saw your presentation at the recent tech conference and would love to connect.",
    timestamp: new Date(Date.now() - 86400000), // 1 day ago
  },
  {
    id: "req-2",
    userId: "user-7",
    name: "Michael Zhang",
    role: "Software Engineer",
    company: "CodeCraft",
    avatar: "/software-engineer-workspace.png",
    message: "We're both in the AI space and I think we could collaborate on some interesting projects.",
    timestamp: new Date(Date.now() - 86400000 * 3), // 3 days ago
  },
]

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Connection service
export const connectionService = {
  // Get all connections for a user
  getConnections: async (userId: string): Promise<Connection[]> => {
    await delay(800) // Simulate network delay
    return mockConnections
  },

  // Get connection details
  getConnection: async (connectionId: string): Promise<Connection | null> => {
    await delay(500)
    const connection = mockConnections.find((c) => c.id === connectionId)
    return connection || null
  },

  // Update connection strength (e.g., after interactions)
  updateConnectionStrength: async (connectionId: string, newStrength: number): Promise<boolean> => {
    await delay(600)
    const connectionIndex = mockConnections.findIndex((c) => c.id === connectionId)
    if (connectionIndex >= 0) {
      if (mockConnections[connectionIndex]) {
        mockConnections[connectionIndex].connectionStrength = newStrength
      }
      return true
    }
    return false
  },

  // Get pending connection requests
  getConnectionRequests: async (): Promise<ConnectionRequest[]> => {
    await delay(700)
    return mockConnectionRequests
  },

  // Accept a connection request
  acceptConnectionRequest: async (requestId: string): Promise<boolean> => {
    await delay(800)
    const requestIndex = mockConnectionRequests.findIndex((r) => r.id === requestId)
    if (requestIndex >= 0) {
      const request = mockConnectionRequests[requestIndex]

      // Add to connections
      mockConnections.push({
        id: request.userId,
        name: request.name,
        role: request.role,
        company: request.company,
        avatar: request.avatar,
        isOnline: Math.random() > 0.5, // Random online status
        connectionStrength: 40, // Initial connection strength
        lastInteraction: new Date(),
        mutualConnections: Math.floor(Math.random() * 10), // Random mutual connections
      })

      // Remove from requests
      mockConnectionRequests.splice(requestIndex, 1)
      return true
    }
    return false
  },

  // Reject a connection request
  rejectConnectionRequest: async (requestId: string): Promise<boolean> => {
    await delay(600)
    const requestIndex = mockConnectionRequests.findIndex((r) => r.id === requestId)
    if (requestIndex >= 0) {
      mockConnectionRequests.splice(requestIndex, 1)
      return true
    }
    return false
  },

  // Check if users are connected
  areUsersConnected: async (userId1: string, userId2: string): Promise<boolean> => {
    await delay(400)
    return mockConnections.some((c) => c.id === userId2)
  },

  // Check if user is following another user
  isFollowing: async (targetUserId: string): Promise<boolean> => {
    await delay(400)
    // In this mock, we'll just return true for some IDs
    return ["user-8", "user-9", "user-10"].includes(targetUserId)
  },

  // Send a connection request
  sendConnectionRequest: async (userId: string, message?: string): Promise<boolean> => {
    await delay(900)
    // In a real app, this would create a request in the database
    return true
  },

  // Follow a user (one-way connection)
  followUser: async (userId: string): Promise<boolean> => {
    await delay(700)
    // In a real app, this would create a follow relationship
    return true
  },

  // Unfollow a user
  unfollowUser: async (userId: string): Promise<boolean> => {
    await delay(600)
    // In a real app, this would remove a follow relationship
    return true
  },
}

// Export individual functions as named exports
export const {
  getConnections,
  getConnection,
  updateConnectionStrength,
  getConnectionRequests,
  acceptConnectionRequest,
  rejectConnectionRequest,
  areUsersConnected,
  isFollowing,
  sendConnectionRequest,
  followUser,
  unfollowUser,
} = connectionService
