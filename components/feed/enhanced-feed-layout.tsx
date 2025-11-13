"use client"

import { useState } from "react"
import { GrowthLabSidebar } from "@/components/sidebar/growthlab-sidebar"
import { EnhancedFeedContent } from "@/components/feed/enhanced-feed-content"
import { EnhancedFeedSidebar } from "@/components/feed/enhanced-feed-sidebar"
import { EnhancedFeedRightSidebar } from "@/components/feed/enhanced-feed-right-sidebar"
import { useMediaQuery } from "@/hooks/use-media-query"
import { FeedHeader } from "@/components/feed/feed-header"

export function EnhancedFeedLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  return (
    <div className="flex min-h-screen flex-col">
      <FeedHeader toggleSidebar={() => setIsCollapsed(!isCollapsed)} isMobile={isMobile} />
      <div className="flex flex-1 overflow-hidden">
        <GrowthLabSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          isMobile={isMobile}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <main className={`flex-1 transition-all duration-300 ${isCollapsed ? "md:ml-16" : "md:ml-64"} relative`}>
          <div className="container mx-auto py-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {isDesktop && (
                <div className="lg:col-span-3 space-y-4">
                  <EnhancedFeedSidebar />
                </div>
              )}

              <div className="lg:col-span-6 space-y-4">
                <EnhancedFeedContent />
              </div>

              {isDesktop && (
                <div className="lg:col-span-3 space-y-4">
                  <EnhancedFeedRightSidebar />
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
