/**
 * Mock database setup for testing
 * Sets up an in-memory database for testing with realistic data structures
 */

import { mockEnvVariables } from "../lib/mock-env-variables"

// Mock database tables and schemas
interface MockDatabase {
  users: any[]
  startups: any[]
  valuations: any[]
  benchmarks: any[]
  fundingSources: any[]
  customerDiscovery: any[]
  surveys: any[]
  interviews: any[]
  ideaValidation: any[]
  marketResearch: any[]
}

// Create the mock database with initial state
export const mockDb: MockDatabase = {
  users: [
    {
      id: "1",
      name: "Test User",
      email: "test@example.com",
      role: "founder",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Investor User",
      email: "investor@example.com",
      role: "investor",
      createdAt: new Date().toISOString(),
    },
    {
      id: "3",
      name: "Mentor User",
      email: "mentor@example.com",
      role: "mentor",
      createdAt: new Date().toISOString(),
    },
  ],

  startups: [
    {
      id: "1",
      name: "Test Startup",
      userId: "1",
      industry: "Technology",
      stage: "Seed",
      description: "A test startup for development",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Another Startup",
      userId: "1",
      industry: "FinTech",
      stage: "Series A",
      description: "Another test startup",
      createdAt: new Date().toISOString(),
    },
  ],

  valuations: [
    {
      id: "1",
      startupId: "1",
      method: "DCF",
      value: 5000000,
      date: new Date().toISOString(),
      notes: "Discounted Cash Flow valuation",
    },
    {
      id: "2",
      startupId: "1",
      method: "Comparable",
      value: 5500000,
      date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      notes: "Comparable companies valuation",
    },
    {
      id: "3",
      startupId: "2",
      method: "VC Method",
      value: 8000000,
      date: new Date().toISOString(),
      notes: "Venture Capital method valuation",
    },
  ],

  benchmarks: [
    {
      id: "1",
      industry: "Technology",
      stage: "Seed",
      metric: "Valuation",
      average: 3000000,
      median: 2500000,
      min: 1000000,
      max: 10000000,
      updatedAt: new Date().toISOString(),
    },
    {
      id: "2",
      industry: "FinTech",
      stage: "Series A",
      metric: "Valuation",
      average: 15000000,
      median: 12000000,
      min: 8000000,
      max: 30000000,
      updatedAt: new Date().toISOString(),
    },
    {
      id: "3",
      industry: "Technology",
      stage: "Seed",
      metric: "Revenue Multiple",
      average: 10,
      median: 8,
      min: 5,
      max: 20,
      updatedAt: new Date().toISOString(),
    },
  ],

  fundingSources: [
    {
      id: "1",
      name: "Angel Investment",
      description: "Investment from individual angel investors",
      eligibilityCriteria: "Early-stage startups with MVP and some traction",
      applicationProcess: "Pitch to angel networks or individual angels",
      benefits: "Smart money, mentorship, faster decision making",
      drawbacks: "Smaller ticket sizes, potential for many investors to manage",
    },
    {
      id: "2",
      name: "Venture Capital",
      description: "Investment from VC firms in exchange for equity",
      eligibilityCriteria: "High-growth startups with significant market potential",
      applicationProcess: "Pitch deck submission, multiple rounds of interviews",
      benefits: "Larger funding amounts, business expertise, network access",
      drawbacks: "Dilution of ownership, potential loss of control",
    },
    {
      id: "3",
      name: "Enterprise Singapore Grants",
      description: "Government grants for Singapore-based startups",
      eligibilityCriteria: "Singapore-registered businesses with innovative solutions",
      applicationProcess: "Online application, business plan submission, interviews",
      benefits: "Non-dilutive funding, government backing, additional resources",
      drawbacks: "Lengthy application process, reporting requirements",
    },
  ],

  customerDiscovery: [
    {
      id: "1",
      startupId: "1",
      stage: "Problem Validation",
      targetAudience: "Small business owners",
      insightsGained: "Pain points around financial management identified",
      nextSteps: "Conduct 10 more interviews to validate findings",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      startupId: "2",
      stage: "Solution Validation",
      targetAudience: "Corporate finance teams",
      insightsGained: "Positive feedback on proposed solution",
      nextSteps: "Build MVP based on feedback",
      createdAt: new Date().toISOString(),
    },
  ],

  surveys: [
    {
      id: "1",
      startupId: "1",
      title: "Small Business Financial Challenges",
      questions: JSON.stringify([
        {
          type: "multiple-choice",
          question: "What is your biggest financial challenge?",
          options: ["Cash flow", "Bookkeeping", "Tax compliance", "Other"],
        },
        { type: "rating", question: "How satisfied are you with your current financial tools?", scale: 5 },
      ]),
      responses: 24,
      createdAt: new Date().toISOString(),
    },
  ],

  interviews: [
    {
      id: "1",
      startupId: "1",
      participantInfo: "Small business owner, 5-10 employees, retail sector",
      summary: "Struggles with cash flow forecasting and bookkeeping",
      keyInsights: "Wants simple dashboard with cash flow alerts",
      audioRecording: "https://example.com/recording1.mp3",
      transcript: "Partial transcript of interview...",
      createdAt: new Date().toISOString(),
    },
  ],

  ideaValidation: [
    {
      id: "1",
      startupId: "1",
      idea: "Cash flow management tool for small businesses",
      status: "Validated",
      validationMethods: JSON.stringify(["interviews", "survey", "landing page"]),
      marketSize: "TAM: $5B, SAM: $1B, SOM: $100M",
      competitiveLandscape: "Few solutions specifically for small businesses",
      nextSteps: "Build MVP focusing on cash flow alerts",
      createdAt: new Date().toISOString(),
    },
  ],

  marketResearch: [
    {
      id: "1",
      startupId: "1",
      researchQuestion: "What are the main financial tools used by small businesses?",
      findings: "Excel (60%), QuickBooks (25%), Other solutions (15%)",
      methodology: "Survey of 100 small business owners",
      implications: "Opportunity to replace Excel with more specialized solution",
      createdAt: new Date().toISOString(),
    },
  ],
}

/**
 * Mock database query functions
 */

// Generic query function with delay to simulate real database
export async function mockQuery<T>(table: keyof MockDatabase, filter?: (item: any) => boolean): Promise<T[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  if (!mockDb[table]) {
    throw new Error(`Table ${table} not found in mock database`)
  }

  if (filter) {
    return (mockDb[table] ? mockDb[table].filter : undefined)(filter) as T[]
  }

  return mockDb[table] as T[]
}

// Get by ID
export async function mockGetById<T>(table: keyof MockDatabase, id: string): Promise<T | null> {
  const results = await mockQuery<T>(table, (item) => item.id === id)
  return results.length > 0 ? results[0] : null
}

// Insert
export async function mockInsert<T>(table: keyof MockDatabase, data: any): Promise<T> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  if (!mockDb[table]) {
    throw new Error(`Table ${table} not found in mock database`)
  }

  const newItem = {
    id: String((mockDb[table] ? mockDb[table].length : undefined) + 1),
    ...data,
    createdAt: data.createdAt || new Date().toISOString(),
  }

  (mockDb[table] ? mockDb[table].push : undefined)(newItem)
  return newItem as T
}

// Update
export async function mockUpdate<T>(table: keyof MockDatabase, id: string, data: any): Promise<T | null> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  if (!mockDb[table]) {
    throw new Error(`Table ${table} not found in mock database`)
  }

  const index = (mockDb[table] ? mockDb[table].findIndex : undefined)((item) => item.id === id)
  if (index === -1) return null

  const updatedItem = {
    ...mockDb[table][index],
    ...data,
    updatedAt: new Date().toISOString(),
  }

  mockDb[table][index] = updatedItem
  return updatedItem as T
}

// Delete
export async function mockDelete(table: keyof MockDatabase, id: string): Promise<boolean> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  if (!mockDb[table]) {
    throw new Error(`Table ${table} not found in mock database`)
  }

  const index = (mockDb[table] ? mockDb[table].findIndex : undefined)((item) => item.id === id)
  if (index === -1) return false

  (mockDb[table] ? mockDb[table].splice : undefined)(index, 1)
  return true
}

/**
 * Setup mock database environment
 */
export function setupMockDb() {
  // Override environment variables with mock values
  process.env.DATABASE_URL = mockEnvVariables.DATABASE_URL
  process.env.POSTGRES_URL = mockEnvVariables.POSTGRES_URL

  // Return cleanup function
  return () => {
    // Reset mock database to initial state if needed
    Object.keys(mockDb).forEach((key) => {
      mockDb[key as keyof MockDatabase] = []
    })
  }
}

/**
 * Export mock database for direct use in tests
 */
export { mockDb as db }
