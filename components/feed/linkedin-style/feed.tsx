"use client"

import { useState } from "react"
import { GrowthLabSidebar } from "@/components/sidebar/growthlab-sidebar"
import { LinkedInStyleHeader } from "./header"
import { LinkedInStyleContent } from "./content"
import { LinkedInStyleRightSidebar } from "./right-sidebar"
import { CreatePostDialog } from "../create-post-dialog"
import { useMobile } from "@/hooks/use-mobile"
import { MobileLinkedInStyleFeed } from "./mobile-feed"

export function LinkedInStyleFeed() {
  const [createPostOpen, setCreatePostOpen] = useState(false)
  const isMobile = useMobile()

  // For mobile devices, show the mobile-optimized feed
  if (isMobile) {
    return <MobileLinkedInStyleFeed />
  }

  return (
    <div className="flex flex-col min-h-screen">
      <LinkedInStyleHeader />

      <div className="flex flex-1 w-full max-w-[1920px] mx-auto">
        {/* Left Sidebar */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <GrowthLabSidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 px-4 py-6 max-w-[600px] mx-auto">
          <LinkedInStyleContent onCreatePost={() => setCreatePostOpen(true)} />
        </main>

        {/* Right Sidebar */}
        <div className="hidden lg:block w-80 flex-shrink-0">
          <LinkedInStyleRightSidebar />
        </div>
      </div>

      <CreatePostDialog open={createPostOpen} onOpenChange={setCreatePostOpen} />
    </div>
  )
}
