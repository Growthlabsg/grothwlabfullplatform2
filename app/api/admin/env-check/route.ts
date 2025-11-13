import { NextResponse } from "next/server"
import { env } from "@/lib/env"

export async function GET() {
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
    mockVariablesAvailable: true,
    testVariables: {
      TEST_VAR: process.env.TEST_VAR || "Not set",
      BOOL_TRUE: process.env.BOOL_TRUE === "true",
      BOOL_ONE: process.env.BOOL_ONE === "1",
      BOOL_YES: process.env.BOOL_YES === "yes",
      BOOL_ON: process.env.BOOL_ON === "on",
      BOOL_FALSE: process.env.BOOL_FALSE !== "true",
      NUM_VAR: Number.parseInt(process.env.NUM_VAR || "0", 10),
      INVALID_NUM: process.env.INVALID_NUM,
      JSON_VAR: process.env.JSON_VAR ? "Set (not shown)" : "Not set",
      INVALID_JSON: process.env.INVALID_JSON ? "Set (not shown)" : "Not set",
    },
  })
}
