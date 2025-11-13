"use client"

import { EnhancedFeedContent } from "@/components/feed/linkedin-style/enhanced-feed-content"
import { EnhancedRightSidebar } from "@/components/feed/linkedin-style/enhanced-right-sidebar"
import { Header } from "@/components/feed/linkedin-style/header"
import { Sidebar } from "@/components/feed/linkedin-style/sidebar"
import { useMobile } from "@/hooks/use-mobile"

export default function EnhancedLinkedInClient() {
  const isMobile = useMobile()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-4">
          {!isMobile && (
            <div className="w-64 shrink-0 hidden md:block">
              <Sidebar />
            </div>
          )}
          <div className="flex-1">
            <EnhancedFeedContent />
          </div>
          {!isMobile && <EnhancedRightSidebar />}
        </div>
      </div>
    </div>
  )
}
