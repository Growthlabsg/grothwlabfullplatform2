"use client"

import { useState } from "react"
import { EnhancedFeedHeader } from "@/components/feed/enhanced-feed-header"
import { EnhancedFeedContent } from "@/components/feed/enhanced-feed-content"
import { EnhancedFeedSidebar } from "@/components/feed/enhanced-feed-sidebar"
import { EnhancedFeedRightSidebar } from "@/components/feed/enhanced-feed-right-sidebar"
import { NotificationCenter } from "@/components/notifications/notification-center"
import { ConnectionRecommendations } from "@/components/connections/connection-recommendations"
import { SavedPostsDrawer } from "@/components/feed/saved-posts-drawer"
import { PostScheduler } from "@/components/feed/post-scheduler"
import { useMediaQuery } from "@/hooks/use-media-query"

export function EnhancedFeedClient() {
  const [savedPostsOpen, setSavedPostsOpen] = useState(false)
  const [postSchedulerOpen, setPostSchedulerOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  return (
    <div className="container mx-auto py-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {isDesktop && (
          <div className="lg:col-span-3 space-y-4">
            <EnhancedFeedSidebar onOpenSavedPosts={() => setSavedPostsOpen(true)} />
          </div>
        )}

        <div className="lg:col-span-6 space-y-4">
          <EnhancedFeedHeader
            onOpenScheduler={() => setPostSchedulerOpen(true)}
            onOpenNotifications={() => setNotificationsOpen(true)}
          />
          <EnhancedFeedContent />
        </div>

        {isDesktop && (
          <div className="lg:col-span-3 space-y-4">
            <EnhancedFeedRightSidebar />
            <ConnectionRecommendations />
          </div>
        )}
      </div>

      <SavedPostsDrawer open={savedPostsOpen} onOpenChange={setSavedPostsOpen} />
      <PostScheduler open={postSchedulerOpen} onOpenChange={setPostSchedulerOpen} />
      <NotificationCenter open={notificationsOpen} onOpenChange={setNotificationsOpen} />
    </div>
  )
}
