/**
 * Script to load mock environment variables for development
 * Run with: npx ts-node scripts/load-mock-env.ts
 */

import { loadMockEnvVariables } from "../lib/mock-env-variables"
import { writeFileSync } from "fs"
import { join } from "path"
import { mockEnvVariables } from "../lib/mock-env-variables"

// Create .env.local file with mock variables
function createLocalEnvFile() {
  const envContent = Object.entries(mockEnvVariables)
    .map(([key, value]) => `${key}=${value}`)
    .join("\n")

  try {
    writeFileSync(join(process.cwd(), ".env.local"), envContent)
    console.log("✅ Created .env.local file with mock environment variables")
  } catch (error) {
    console.error("Failed to create .env.local file:", error)
  }
}

// Main function
function main() {
  console.log("Loading mock environment variables...")

  // Load the mock variables into process.env
  loadMockEnvVariables()

  // Create .env.local file
  createLocalEnvFile()

  console.log("✅ Mock environment setup complete")
  console.log("Environment variables are now available for development")
  console.log("\nNOTE: These are MOCK values for development only.")
  console.log("DO NOT use these values in production!")
}

// Run the main function
main()
