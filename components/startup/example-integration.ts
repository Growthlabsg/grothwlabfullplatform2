import { env } from "../../lib/env"

// Example of using the environment variables without changing UI/UX
export function getApiEndpoint() {
  // This uses the environment variable (or mock fallback) without changing UI
  return `${env.apiUrl}/startup/data`
}

export function isFeatureEnabled(featureName: keyof typeof env.features) {
  // Uses feature flags from environment (or mock values) without UI changes
  return env.features[featureName]
}

export function getAnalyticsConfig() {
  // Using environment variables for analytics configuration
  return {
    analyticsId: env.analyticsId,
    googleAnalyticsId: env.googleAnalyticsId,
    enabled: env.isProduction() || env.isDevelopment(), // Disable in test
  }
}

export function getDatabaseConfig() {
  // Database configuration from environment variables
  return {
    url: env.databaseUrl,
    postgresUrl: env.postgresUrl,
    postgresUrlNonPooling: env.postgresUrlNonPooling,
  }
}

// These functions can be used in your components without changing their UI/UX
