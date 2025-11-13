"use client"

import { useEffect, useState } from "react"
import { useMediaQuery } from "react-responsive"

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"

export interface ResponsiveConfig {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isLargeDesktop: boolean
  breakpoint: Breakpoint
  orientation: "portrait" | "landscape"
}

/**
 * A hook that provides responsive design information
 */
export function useResponsive(): ResponsiveConfig {
  // Use safe defaults for server-side rendering
  const [mounted, setMounted] = useState(false)

  // Media queries using the useMediaQuery hook
  const isMobileQuery = useMediaQuery({ maxWidth: 639 })
  const isTabletQuery = useMediaQuery({ minWidth: 640, maxWidth: 1023 })
  const isDesktopQuery = useMediaQuery({ minWidth: 1024, maxWidth: 1535 })
  const isLargeDesktopQuery = useMediaQuery({ minWidth: 1536 })
  const isPortraitQuery = useMediaQuery({ orientation: "portrait" })

  // These ensure values are only used client-side to prevent hydration mismatch
  const isMobile = mounted ? isMobileQuery : false
  const isTablet = mounted ? isTabletQuery : false
  const isDesktop = mounted ? isDesktopQuery : false
  const isLargeDesktop = mounted ? isLargeDesktopQuery : false
  const isPortrait = mounted ? isPortraitQuery : true

  // Determine current breakpoint
  let breakpoint: Breakpoint = "md"
  if (mounted) {
    if (isMobile) breakpoint = "xs"
    else if (isTablet) breakpoint = "sm"
    else if (isDesktop) breakpoint = "lg"
    else if (isLargeDesktop) breakpoint = "xl"
  }

  // Effect to set mounted state
  useEffect(() => {
    setMounted(true)
  }, [])

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    breakpoint,
    orientation: isPortrait ? "portrait" : "landscape",
  }
}
