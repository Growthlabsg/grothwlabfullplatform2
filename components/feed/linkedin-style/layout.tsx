"use client"

import type { ReactNode } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"

interface LinkedInStyleLayoutProps {
  header: ReactNode
  sidebar: ReactNode
  rightSidebar: ReactNode
  children: ReactNode
}

export function LinkedInStyleLayout({ header, sidebar, rightSidebar, children }: LinkedInStyleLayoutProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const isTablet = useMediaQuery("(min-width: 768px)")

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="sticky top-0 z-50 bg-white border-b">{header}</div>

      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Left Sidebar - Hidden on mobile */}
          {isTablet && (
            <div className="lg:w-1/4 md:w-1/3 w-full">
              <div className="sticky top-20">{sidebar}</div>
            </div>
          )}

          {/* Main Content */}
          <div className="lg:w-2/4 md:w-2/3 w-full">{children}</div>

          {/* Right Sidebar - Hidden on mobile and tablet */}
          {isDesktop && (
            <div className="lg:w-1/4 w-full">
              <div className="sticky top-20">{rightSidebar}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
