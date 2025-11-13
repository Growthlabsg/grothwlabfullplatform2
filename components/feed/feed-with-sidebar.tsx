"use client"

import { useState } from "react"
import { GrowthLabSidebar } from "@/components/sidebar/growthlab-sidebar"
import { LinkedInStyleFeedContent } from "@/components/feed/linkedin-style/feed-content"
import { LinkedInStyleRightSidebar } from "@/components/feed/linkedin-style/right-sidebar"
import { LinkedInStyleHeader } from "@/components/feed/linkedin-style/header"
import { CreatePostDialog } from "@/components/feed/create-post-dialog"
import { NotificationCenter } from "@/components/notifications/notification-center"
import { useAuth } from "@/contexts/auth-context"
import { useMobile } from "@/hooks/use-mobile"
import { MobileFeed } from "@/components/feed/mobile/mobile-feed"

export function FeedWithSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [createPostOpen, setCreatePostOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const { user } = useAuth()
  const isMobile = useMobile()

  if (!user) {
    return <div>Loading...</div>
  }

  // Show mobile view on small screens
  if (isMobile) {
    return (
      <>
        <MobileFeed />
        <CreatePostDialog open={createPostOpen} onOpenChange={setCreatePostOpen} />
        <NotificationCenter open={notificationsOpen} onOpenChange={setNotificationsOpen} />
      </>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <LinkedInStyleHeader
        onCreatePost={() => setCreatePostOpen(true)}
        onNotifications={() => setNotificationsOpen(true)}
      />
      <div className="flex flex-1 overflow-hidden">
        <GrowthLabSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          isMobile={false}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <main className={`flex-1 transition-all duration-300 ${isCollapsed ? "md:ml-16" : "md:ml-64"} relative`}>
          <div className="container mx-auto py-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              <div className="lg:col-span-9 space-y-4">
                <LinkedInStyleFeedContent onCreatePost={() => setCreatePostOpen(true)} />
              </div>

              <div className="hidden lg:block lg:col-span-3 space-y-4">
                <LinkedInStyleRightSidebar />
              </div>
            </div>
          </div>
        </main>
      </div>

      <CreatePostDialog open={createPostOpen} onOpenChange={setCreatePostOpen} />
      <NotificationCenter open={notificationsOpen} onOpenChange={setNotificationsOpen} />
    </div>
  )
}
