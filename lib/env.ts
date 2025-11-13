/**
 * Environment variable utility functions with type safety
 * Uses mock environment variables in development/testing environments
 */

import { mockEnvVariables, getMockEnv } from "./mock-env-variables"

/**
 * Gets an environment variable with type safety and fallback support
 * In development/test environments, falls back to mock variables if real ones aren't set
 *
 * @param key The environment variable key to retrieve
 * @param fallback Optional fallback value if the variable doesn't exist
 * @param required Whether to throw an error if the variable is not found (default: false)
 * @returns The environment variable value
 */
export function getEnv(key: string, fallback?: string, required = false): string {
  // First try to get from actual environment
  const value = process.env[key]

  if (value) return value

  // In development or test, use mock values as fallback
  if ((process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") && key in mockEnvVariables) {
    return getMockEnv(key as keyof typeof mockEnvVariables, fallback)
  }

  // Use provided fallback
  if (fallback !== undefined) return fallback

  // Throw error if required
  if (required) {
    throw new Error(`Environment variable ${key} is required but not set`)
  }

  // Default to empty string
  return ""
}

/**
 * Gets a boolean environment variable
 * Treats '1', 'true', 'yes', and 'on' as true (case-insensitive)
 *
 * @param key The environment variable key to retrieve
 * @param defaultValue Default value if not set
 * @returns boolean value of the environment variable
 */
export function getBoolEnv(key: string, defaultValue = false): boolean {
  const value = getEnv(key, defaultValue ? "true" : "false")
  return ["1", "true", "yes", "on"].includes(value.toLowerCase())
}

/**
 * Gets a number environment variable
 *
 * @param key The environment variable key to retrieve
 * @param defaultValue Default value if not set or invalid
 * @returns number value of the environment variable
 */
export function getNumEnv(key: string, defaultValue = 0): number {
  const value = getEnv(key, String(defaultValue))
  const num = Number(value)
  return isNaN(num) ? defaultValue : num
}

/**
 * Gets a JSON environment variable
 *
 * @param key The environment variable key to retrieve
 * @param defaultValue Default value if not set or invalid
 * @returns parsed JSON value of the environment variable
 */
export function getJsonEnv<T>(key: string, defaultValue: T): T {
  const value = getEnv(key, "")
  if (!value) return defaultValue

  try {
    return JSON.parse(value) as T
  } catch (error) {
    console.error(`Failed to parse JSON from environment variable ${key}:`, error)
    return defaultValue
  }
}

/**
 * Environment variable configuration object with all needed variables
 * Provides type safety and centralized access to all environment variables
 */
export const env = {
  // Server configuration
  nodeEnv: getEnv("NODE_ENV", "development"),
  port: getNumEnv("PORT", 3000),
  appUrl: getEnv("NEXT_PUBLIC_APP_URL", "http://localhost:3000"),
  apiUrl: getEnv("NEXT_PUBLIC_API_URL", "http://localhost:3000/api"),

  // Database
  databaseUrl: getEnv("DATABASE_URL"),
  postgresUrl: getEnv("POSTGRES_URL"),
  postgresUrlNonPooling: getEnv("POSTGRES_URL_NON_POOLING"),

  // Authentication
  jwtSecret: getEnv("JWT_SECRET", "development_jwt_secret"),
  nextAuthSecret: getEnv("NEXTAUTH_SECRET", "development_nextauth_secret"),
  nextAuthUrl: getEnv("NEXTAUTH_URL", "http://localhost:3000"),

  // External APIs
  openaiApiKey: getEnv("OPENAI_API_KEY"),
  googleMapsApiKey: getEnv("GOOGLE_MAPS_API_KEY"),
  geolocationApiKey: getEnv("GEOLOCATION_API_KEY"),
  stripeSecretKey: getEnv("STRIPE_SECRET_KEY"),
  stripeWebhookSecret: getEnv("STRIPE_WEBHOOK_SECRET"),

  // Email
  smtpHost: getEnv("SMTP_HOST"),
  smtpPort: getNumEnv("SMTP_PORT", 587),
  smtpUser: getEnv("SMTP_USER"),
  smtpPassword: getEnv("SMTP_PASSWORD"),
  emailFrom: getEnv("EMAIL_FROM", "noreply@growthlab.sg"),

  // Feature flags
  features: {
    valuationComparison: getBoolEnv("NEXT_PUBLIC_FEATURE_VALUATION_COMPARISON", true),
    valuationHistory: getBoolEnv("NEXT_PUBLIC_FEATURE_VALUATION_HISTORY", true),
    reportGeneration: getBoolEnv("NEXT_PUBLIC_FEATURE_REPORT_GENERATION", true),
    industryBenchmarks: getBoolEnv("NEXT_PUBLIC_FEATURE_INDUSTRY_BENCHMARKS", true),
    fundingNavigator: getBoolEnv("NEXT_PUBLIC_FEATURE_FUNDING_NAVIGATOR", true),
    customerDiscovery: getBoolEnv("NEXT_PUBLIC_FEATURE_CUSTOMER_DISCOVERY", true),
    valuationCalculator: getBoolEnv("NEXT_PUBLIC_FEATURE_VALUATION_CALCULATOR", true),
    ideaValidation: getBoolEnv("NEXT_PUBLIC_FEATURE_IDEA_VALIDATION", true),
  },

  // Analytics
  analyticsId: getEnv("NEXT_PUBLIC_ANALYTICS_ID"),
  googleAnalyticsId: getEnv("NEXT_PUBLIC_GOOGLE_ANALYTICS"),

  // Realtime & Communication
  socketUrl: getEnv("NEXT_PUBLIC_SOCKET_URL", "ws://localhost:3001"),
  pusher: {
    appId: getEnv("PUSHER_APP_ID"),
    key: getEnv("PUSHER_KEY"),
    secret: getEnv("PUSHER_SECRET"),
    cluster: getEnv("PUSHER_CLUSTER", "ap1"),
  },

  // Storage & Media
  cloudinary: {
    cloudName: getEnv("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME"),
    apiKey: getEnv("CLOUDINARY_API_KEY"),
    apiSecret: getEnv("CLOUDINARY_API_SECRET"),
  },

  // Singapore-specific services
  sgGovApiKey: getEnv("SG_GOV_API_KEY"),
  enterpriseSgApiKey: getEnv("ENTERPRISE_SG_API_KEY"),

  // API configuration
  apiTimeout: getNumEnv("API_TIMEOUT_MS", 30000),
  apiRateLimit: getNumEnv("API_RATE_LIMIT", 100),

  // Helper method to check if running in production
  isProduction: (): boolean => getEnv("NODE_ENV") === "production",

  // Helper method to check if running in development
  isDevelopment: (): boolean => getEnv("NODE_ENV") === "development",

  // Helper method to check if running in test
  isTest: (): boolean => getEnv("NODE_ENV") === "test",
}
