import type {
  BusinessPage,
  BusinessPageAnalytics,
  BusinessPageMember,
  BusinessPageRole,
  CreateBusinessPageFormData,
} from "@/types/business-page"

// Mock data for business pages
const mockBusinessPages: BusinessPage[] = [
  {
    id: "bp1",
    name: "GrowthLab",
    handle: "growthlab-singapore",
    description:
      "Empowering startups and entrepreneurs in Singapore with resources, networking, and funding opportunities.",
    industry: "Business Development",
    size: "11-50 employees",
    website: "https://growthlab.sg",
    logo: "/images/growthlab-logo.png",
    coverImage: "/singapore-startup-collaboration.png",
    location: "Singapore",
    foundedYear: 2018,
    followers: 5280,
    admins: ["user1"],
    employees: 32,
    createdAt: new Date(2018, 5, 15).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "bp2",
    name: "Tech Innovators Hub",
    handle: "tech-innovators",
    description: "A community of tech innovators building the future of technology in Southeast Asia.",
    industry: "Information Technology",
    size: "2-10 employees",
    website: "https://techinnovators.asia",
    logo: "/abstract-geometric-shapes.png",
    coverImage: "/interconnected-world.png",
    location: "Singapore",
    foundedYear: 2020,
    followers: 1245,
    admins: ["user1"],
    employees: 8,
    createdAt: new Date(2020, 2, 10).toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

// Mock data for business page members
const mockBusinessPageMembers: BusinessPageMember[] = [
  {
    userId: "user1",
    businessPageId: "bp1",
    role: "admin",
    joinedAt: new Date(2018, 5, 15).toISOString(),
  },
  {
    userId: "user1",
    businessPageId: "bp2",
    role: "admin",
    joinedAt: new Date(2020, 2, 10).toISOString(),
  },
]

// Mock analytics data
const mockAnalytics: Record<string, BusinessPageAnalytics> = {
  bp1: {
    followers: {
      total: 5280,
      growth: 12.5,
      history: [
        { date: "2023-01", count: 4200 },
        { date: "2023-02", count: 4350 },
        { date: "2023-03", count: 4500 },
        { date: "2023-04", count: 4700 },
        { date: "2023-05", count: 4900 },
        { date: "2023-06", count: 5100 },
        { date: "2023-07", count: 5280 },
      ],
    },
    engagement: {
      impressions: 28500,
      clicks: 3200,
      reactions: 1850,
      comments: 420,
      shares: 380,
    },
    demographics: {
      industries: [
        { name: "Technology", percentage: 45 },
        { name: "Finance", percentage: 20 },
        { name: "Education", percentage: 15 },
        { name: "Healthcare", percentage: 10 },
        { name: "Other", percentage: 10 },
      ],
      jobTitles: [
        { title: "Software Engineer", percentage: 25 },
        { title: "Founder", percentage: 20 },
        { title: "Product Manager", percentage: 15 },
        { title: "Marketing", percentage: 10 },
        { title: "Other", percentage: 30 },
      ],
      locations: [
        { location: "Singapore", percentage: 65 },
        { location: "Malaysia", percentage: 10 },
        { location: "Indonesia", percentage: 8 },
        { location: "Thailand", percentage: 7 },
        { location: "Other", percentage: 10 },
      ],
    },
  },
  bp2: {
    followers: {
      total: 1245,
      growth: 25.8,
      history: [
        { date: "2023-01", count: 800 },
        { date: "2023-02", count: 850 },
        { date: "2023-03", count: 920 },
        { date: "2023-04", count: 1000 },
        { date: "2023-05", count: 1080 },
        { date: "2023-06", count: 1150 },
        { date: "2023-07", count: 1245 },
      ],
    },
    engagement: {
      impressions: 12500,
      clicks: 1800,
      reactions: 950,
      comments: 210,
      shares: 180,
    },
    demographics: {
      industries: [
        { name: "Technology", percentage: 60 },
        { name: "Finance", percentage: 15 },
        { name: "Education", percentage: 10 },
        { name: "Healthcare", percentage: 5 },
        { name: "Other", percentage: 10 },
      ],
      jobTitles: [
        { title: "Software Engineer", percentage: 35 },
        { title: "Founder", percentage: 25 },
        { title: "Product Manager", percentage: 15 },
        { title: "Marketing", percentage: 5 },
        { title: "Other", percentage: 20 },
      ],
      locations: [
        { location: "Singapore", percentage: 70 },
        { location: "Malaysia", percentage: 8 },
        { location: "Indonesia", percentage: 7 },
        { location: "Thailand", percentage: 5 },
        { location: "Other", percentage: 10 },
      ],
    },
  },
}

export const BusinessPageService = {
  // Get all business pages for a user
  getUserBusinessPages: async (userId: string): Promise<BusinessPage[]> => {
    // In a real app, this would be a database query
    const userMemberships = mockBusinessPageMembers.filter((member) => member.userId === userId)
    const businessPageIds = userMemberships.map((member) => member.businessPageId)
    return mockBusinessPages.filter((page) => businessPageIds.includes(page.id))
  },

  // Get all business pages for startup directory
  getAllBusinessPages: async (): Promise<BusinessPage[]> => {
    // In a real app, this would be a database query
    return mockBusinessPages
  },

  // Get a single business page by ID
  getBusinessPageById: async (id: string): Promise<BusinessPage | null> => {
    // In a real app, this would be a database query
    const page = mockBusinessPages.find((page) => page.id === id)
    return page || null
  },

  // Get a single business page by handle
  getBusinessPageByHandle: async (handle: string): Promise<BusinessPage | null> => {
    // In a real app, this would be a database query
    const page = mockBusinessPages.find((page) => page.handle === handle)
    return page || null
  },

  // Create a new business page
  createBusinessPage: async (userId: string, data: CreateBusinessPageFormData): Promise<BusinessPage> => {
    // In a real app, this would be a database insert
    const newPage: BusinessPage = {
      id: `bp${mockBusinessPages.length + 1}`,
      ...data,
      followers: 0,
      admins: [userId],
      employees: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Add the user as an admin
    const newMember: BusinessPageMember = {
      userId,
      businessPageId: newPage.id,
      role: "admin",
      joinedAt: new Date().toISOString(),
    }

    // In a real app, these would be database transactions
    mockBusinessPages.push(newPage)
    mockBusinessPageMembers.push(newMember)

    return newPage
  },

  // Update a business page
  updateBusinessPage: async (id: string, data: Partial<BusinessPage>): Promise<BusinessPage | null> => {
    // In a real app, this would be a database update
    const pageIndex = mockBusinessPages.findIndex((page) => page.id === id)
    if (pageIndex === -1) return null

    const updatedPage = {
      ...mockBusinessPages[pageIndex],
      ...data,
      updatedAt: new Date().toISOString(),
    }

    mockBusinessPages[pageIndex] = updatedPage
    return updatedPage
  },

  // Delete a business page
  deleteBusinessPage: async (id: string): Promise<boolean> => {
    // In a real app, this would be a database delete
    const pageIndex = mockBusinessPages.findIndex((page) => page.id === id)
    if (pageIndex === -1) return false

    mockBusinessPages.splice(pageIndex, 1)

    // Also remove all memberships
    const memberIndices = mockBusinessPageMembers
      .map((member, index) => (member.businessPageId === id ? index : -1))
      .filter((index) => index !== -1)
      .sort((a, b) => b - a) // Sort in descending order to remove from end first

    memberIndices.forEach((index) => {
      mockBusinessPageMembers.splice(index, 1)
    })

    return true
  },

  // Get user's role for a business page
  getUserRole: async (userId: string, businessPageId: string): Promise<BusinessPageRole | null> => {
    // In a real app, this would be a database query
    const membership = mockBusinessPageMembers.find(
      (member) => member.userId === userId && member.businessPageId === businessPageId,
    )
    return membership ? membership.role : null
  },

  // Add a member to a business page
  addMember: async (userId: string, businessPageId: string, role: BusinessPageRole): Promise<BusinessPageMember> => {
    // In a real app, this would be a database insert
    const newMember: BusinessPageMember = {
      userId,
      businessPageId,
      role,
      joinedAt: new Date().toISOString(),
    }

    mockBusinessPageMembers.push(newMember)
    return newMember
  },

  // Update a member's role
  updateMemberRole: async (
    userId: string,
    businessPageId: string,
    role: BusinessPageRole,
  ): Promise<BusinessPageMember | null> => {
    // In a real app, this would be a database update
    const memberIndex = mockBusinessPageMembers.findIndex(
      (member) => member.userId === userId && member.businessPageId === businessPageId,
    )
    if (memberIndex === -1) return null

    const updatedMember = {
      ...mockBusinessPageMembers[memberIndex],
      role,
    }

    mockBusinessPageMembers[memberIndex] = updatedMember
    return updatedMember
  },

  // Remove a member from a business page
  removeMember: async (userId: string, businessPageId: string): Promise<boolean> => {
    // In a real app, this would be a database delete
    const memberIndex = mockBusinessPageMembers.findIndex(
      (member) => member.userId === userId && member.businessPageId === businessPageId,
    )
    if (memberIndex === -1) return false

    mockBusinessPageMembers.splice(memberIndex, 1)
    return true
  },

  // Get analytics for a business page
  getAnalytics: async (businessPageId: string): Promise<BusinessPageAnalytics | null> => {
    // In a real app, this would be a database query or analytics service call
    return mockAnalytics[businessPageId] || null
  },
}
