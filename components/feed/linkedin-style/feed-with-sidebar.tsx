"use client"

import { useState, useEffect } from "react"
import { FeedContent } from "./content"
import { FeedSidebar } from "./sidebar"
import { FeedRightSidebar } from "./right-sidebar"
import { useMobile } from "@/hooks/use-mobile"
import { GrowthLabLayout } from "@/components/layout/growthlab-layout"

export function LinkedInStyleFeedWithSidebar() {
  const { isMobile } = useMobile()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null // Avoid hydration mismatch
  }

  return (
    <GrowthLabLayout>
      <div className="container py-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Left Sidebar */}
          {!isMobile && (
            <div className="md:col-span-3 lg:col-span-3">
              <div className="sticky top-20">
                <FeedSidebar />
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="md:col-span-6 lg:col-span-6">
            <FeedContent />
          </div>

          {/* Right Sidebar */}
          {!isMobile && (
            <div className="md:col-span-3 lg:col-span-3">
              <div className="sticky top-20">
                <FeedRightSidebar />
              </div>
            </div>
          )}
        </div>
      </div>
    </GrowthLabLayout>
  )
}
