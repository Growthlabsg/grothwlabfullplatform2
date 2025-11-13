/**
 * Utility functions for testing
 */

import { setupMockDb, mockDb } from "../__tests__/mock-db-setup"
import { loadMockEnvVariables } from "./mock-env-variables"

/**
 * Sets up a test environment with mock database and environment variables
 * @returns A cleanup function to call in afterEach or afterAll
 */
export function setupTestEnvironment() {
  // Load mock environment variables
  loadMockEnvVariables()

  // Setup mock database
  const cleanupDb = setupMockDb()

  // Return composite cleanup function
  return () => {
    cleanupDb()
  }
}

/**
 * Creates a mock API request object for testing
 * @param options Request options
 * @returns Mock request object
 */
export function createMockRequest(options: {
  method?: string
  url?: string
  headers?: Record<string, string>
  query?: Record<string, string>
  cookies?: Record<string, string>
  body?: any
}) {
  return {
    method: options.method || "GET",
    url: options.url || "http://localhost:3000/api/test",
    headers: {
      "content-type": "application/json",
      ...options.headers,
    },
    query: options.query || {},
    cookies: options.cookies || {},
    body: options.body,
  }
}

/**
 * Creates a mock API response object for testing
 * @returns Mock response object with helper methods to check what was returned
 */
export function createMockResponse() {
  const res = {
    statusCode: 200,
    headers: {} as Record<string, string>,
    body: null as any,

    status(code: number) {
      this.statusCode = code
      return this
    },

    json(data: any) {
      this.body = data
      this.headers["content-type"] = "application/json"
      return this
    },

    send(data: any) {
      this.body = data
      return this
    },

    setHeader(name: string, value: string) {
      this.headers[name.toLowerCase()] = value
      return this
    },

    getHeader(name: string) {
      return this.headers[name.toLowerCase()]
    },

    cookie(name: string, value: string, options?: any) {
      const cookieHeader = `${name}=${value}${
        options
          ? "; " +
            Object.entries(options)
              .map(([k, v]) => `${k}=${v}`)
              .join("; ")
          : ""
      }`
      this.setHeader(
        "set-cookie",
        this.getHeader("set-cookie") ? this.getHeader("set-cookie") + ", " + cookieHeader : cookieHeader,
      )
      return this
    },

    end() {
      return this
    },
  }

  return res
}

/**
 * Mock Next.js authentication session for testing protected routes
 * @param role User role for the mock session
 * @returns Mock session object
 */
export function mockAuthSession(role: "user" | "admin" | "founder" | "investor" | "mentor" = "user") {
  return {
    user: {
      id: "1",
      name: "Test User",
      email: "test@example.com",
      role,
    },
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  }
}

/**
 * Export mock database for direct use in tests
 */
export { mockDb }
