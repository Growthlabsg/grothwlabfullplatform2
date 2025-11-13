"use client"

import { useState, useEffect } from "react"

export function useMobileDetection() {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setIsTablet(width >= 768 && width < 1024)
      setIsDesktop(width >= 1024)
    }

    // Initial check
    checkDevice()

    // Add event listener for window resize
    window.addEventListener("resize", checkDevice)

    // Clean up
    return () => window.removeEventListener("resize", checkDevice)
  }, [])

  return { isMobile, isTablet, isDesktop }
}
