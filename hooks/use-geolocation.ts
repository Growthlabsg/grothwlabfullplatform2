"use client"

import { useState, useEffect } from "react"
import type { Coordinates, LocationData } from "@/lib/geolocation-service"

/**
 * Hook for getting the user's current location
 * Works with both real and mock geolocation data without affecting UI/UX
 */
export function useGeolocation() {
  const [location, setLocation] = useState<LocationData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLocation = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch("/api/geolocation")

        if (!response.ok) {
          throw new Error("Failed to fetch location data")
        }

        const result = await response.json()

        if (result.success) {
          setLocation(result.data)
        } else {
          throw new Error(result.error || "Unknown error")
        }
      } catch (err) {
        console.error("Geolocation error:", err)
        setError(err instanceof Error ? err.message : "Unknown error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchLocation()
  }, [])

  /**
   * Geocode an address to get coordinates
   */
  const geocodeAddress = async (address: string): Promise<Coordinates | null> => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/geolocation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address }),
      })

      if (!response.ok) {
        throw new Error("Failed to geocode address")
      }

      const result = await response.json()

      if (result.success) {
        return result.data
      } else {
        throw new Error(result.error || "Unknown error")
      }
    } catch (err) {
      console.error("Geocoding error:", err)
      setError(err instanceof Error ? err.message : "Unknown error occurred")
      return null
    } finally {
      setLoading(false)
    }
  }

  return {
    location,
    loading,
    error,
    geocodeAddress,
  }
}
