"use client"

import { useResponsive } from "@/hooks/use-responsive"

/**
 * A debugging component to visualize the current breakpoint
 * Only use this during development
 */
export function ResponsiveDebugger() {
  const { isMobile, isTablet, isDesktop, isLargeDesktop, breakpoint, orientation } = useResponsive()

  // Only show in development
  if (process.env.NODE_ENV === "production") return null

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-2 rounded-md text-xs z-50 font-mono">
      <div>Breakpoint: {breakpoint}</div>
      <div>
        {isMobile && "Mobile "}
        {isTablet && "Tablet "}
        {isDesktop && "Desktop "}
        {isLargeDesktop && "Large Desktop "}
      </div>
      <div>Orientation: {orientation}</div>
    </div>
  )
}
