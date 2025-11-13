import { type NextRequest, NextResponse } from "next/server"
import { geolocationService } from "@/lib/geolocation-service"
import { env } from "@/lib/env"

/**
 * API route for getting current location
 * Uses the mock GEOLOCATION_API_KEY in development environments
 */
export async function GET(request: NextRequest) {
  try {
    // Log that we're using the mock API key in development
    if (env.isDevelopment() && env.geolocationApiKey === "mock-geolocation-api-key-for-development") {
      console.log("Using mock geolocation API key in development")
    }

    // Get current location (will use mock data in development)
    const locationData = await geolocationService.getCurrentLocation()

    return NextResponse.json({ success: true, data: locationData })
  } catch (error) {
    console.error("Geolocation API error:", error)
    return NextResponse.json({ success: false, error: "Failed to get location data" }, { status: 500 })
  }
}

/**
 * API route for geocoding an address
 * Uses the mock GEOLOCATION_API_KEY in development environments
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { address } = body

    if (!address) {
      return NextResponse.json({ success: false, error: "Address is required" }, { status: 400 })
    }

    // Geocode the address (will use mock data in development)
    const coordinates = await geolocationService.geocodeAddress(address)

    return NextResponse.json({ success: true, data: coordinates })
  } catch (error) {
    console.error("Geocoding API error:", error)
    return NextResponse.json({ success: false, error: "Failed to geocode address" }, { status: 500 })
  }
}
