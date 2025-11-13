"use client"

import { useState, useEffect } from "react"

export function useMediaQuery(query: string): boolean {
  // Initialize with false to avoid hydration mismatch
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    // Only run on client side
    if (typeof window !== "undefined") {
      const media = window.matchMedia(query)

      // Set initial value
      setMatches(media.matches)

      // Define listener function
      const listener = (e: MediaQueryListEvent) => {
        setMatches(e.matches)
      }

      // Add listener
      media.addEventListener("change", listener)

      // Clean up
      return () => {
        media.removeEventListener("change", listener)
      }
    }

    return undefined
  }, [query])

  return matches
}
