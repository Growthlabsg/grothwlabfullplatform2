/**
 * This file contains mock environment variables for development and testing.
 * These values are used when the actual environment variables are not available.
 */

export const mockEnvVariables = {
  // Database connection variables
  DATABASE_URL: "postgresql://postgres:password@localhost:5432/growthlab_db",
  POSTGRES_URL: "postgresql://postgres:password@localhost:5432/growthlab_db",
  POSTGRES_PRISMA_URL: "postgresql://postgres:password@localhost:5432/growthlab_db?schema=public",
  POSTGRES_URL_NON_POOLING: "postgresql://postgres:password@localhost:5432/growthlab_db",
  DATABASE_URL_UNPOOLED: "postgresql://postgres:password@localhost:5432/growthlab_db",

  // Auth and security
  JWT_SECRET: "mock_very_secret_key_for_development_only",
  NEXTAUTH_SECRET: "mock_nextauth_secret_for_development_only",
  NEXTAUTH_URL: "http://localhost:3000",

  // API Keys for external services
  OPENAI_API_KEY: "sk-mock-openai-api-key-for-development",
  GOOGLE_MAPS_API_KEY: "mock-google-maps-api-key-for-development",
  GEOLOCATION_API_KEY: "mock-geolocation-api-key-for-development",
  STRIPE_SECRET_KEY: "sk_test_mock-stripe-secret-key-for-development",
  STRIPE_WEBHOOK_SECRET: "whsec_mock-stripe-webhook-secret-for-development",

  // Email service
  SMTP_HOST: "smtp.example.com",
  SMTP_PORT: "587",
  SMTP_USER: "test@example.com",
  SMTP_PASSWORD: "mock-smtp-password",
  EMAIL_FROM: "noreply@growthlab.sg",

  // Services and endpoints
  NEXT_PUBLIC_APP_URL: "http://localhost:3000",
  NEXT_PUBLIC_API_URL: "http://localhost:3000/api",

  // Analytics and tracking
  NEXT_PUBLIC_ANALYTICS_ID: "mock-analytics-id",
  NEXT_PUBLIC_GOOGLE_ANALYTICS: "G-MOCK12345",

  // Feature flags
  NEXT_PUBLIC_FEATURE_VALUATION_COMPARISON: "true",
  NEXT_PUBLIC_FEATURE_VALUATION_HISTORY: "true",
  NEXT_PUBLIC_FEATURE_REPORT_GENERATION: "true",
  NEXT_PUBLIC_FEATURE_INDUSTRY_BENCHMARKS: "true",
  NEXT_PUBLIC_FEATURE_FUNDING_NAVIGATOR: "true",
  NEXT_PUBLIC_FEATURE_CUSTOMER_DISCOVERY: "true",
  NEXT_PUBLIC_FEATURE_VALUATION_CALCULATOR: "true",
  NEXT_PUBLIC_FEATURE_IDEA_VALIDATION: "true",

  // Communication and integration
  NEXT_PUBLIC_SOCKET_URL: "ws://localhost:3001",
  PUSHER_APP_ID: "mock-pusher-app-id",
  PUSHER_KEY: "mock-pusher-key",
  PUSHER_SECRET: "mock-pusher-secret",
  PUSHER_CLUSTER: "ap1",

  // Storage
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "mock-cloudinary-name",
  CLOUDINARY_API_KEY: "mock-cloudinary-api-key",
  CLOUDINARY_API_SECRET: "mock-cloudinary-api-secret",

  // Singapore-specific services
  SG_GOV_API_KEY: "mock-sg-gov-api-key",
  ENTERPRISE_SG_API_KEY: "mock-enterprise-sg-api-key",

  // API timeout and rate limit settings
  API_TIMEOUT_MS: "30000",
  API_RATE_LIMIT: "100",

  // Other configuration
  NODE_ENV: "development",
  PORT: "3000",
}

/**
 * Gets a mock environment variable with type safety
 * @param key The environment variable key
 * @param fallback Optional fallback value if the mock doesn't exist
 * @returns The mock environment variable value or fallback
 */
export function getMockEnv(key: keyof typeof mockEnvVariables, fallback?: string): string {
  return mockEnvVariables[key] || fallback || ""
}

/**
 * Loads all mock environment variables into the process.env object
 * This should only be used in development or testing environments
 */
export function loadMockEnvVariables(): void {
  if (process.env.NODE_ENV === "production") {
    console.warn("Attempted to load mock environment variables in production. This is not recommended.")
    return
  }

  Object.entries(mockEnvVariables).forEach(([key, value]) => {
    if (!process.env[key]) {
      process.env[key] = value
    }
  })

  console.log("Mock environment variables loaded for development/testing")
}
