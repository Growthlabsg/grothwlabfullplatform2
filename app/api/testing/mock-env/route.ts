/**
 * API route for checking mock environment variables in development
 * This endpoint is only available in development and test environments
 */

import { type NextRequest, NextResponse } from "next/server"
import { env } from "../../../../lib/env"
import { mockEnvVariables } from "../../../../lib/mock-env-variables"

export async function GET(req: NextRequest) {
  // Only allow in development or test
  if (env.isProduction()) {
    return NextResponse.json({ error: "This endpoint is not available in production" }, { status: 403 })
  }

  // Return a safe subset of environment variables for debugging
  // Do not include sensitive values like API keys or secrets
  return NextResponse.json({
    environment: env.nodeEnv,
    features: env.features,
    apiSettings: {
      timeout: env.apiTimeout,
      rateLimit: env.apiRateLimit,
    },
    appUrl: env.appUrl,
    mockVariablesAvailable: Object.keys(mockEnvVariables).length > 0,
  })
}
