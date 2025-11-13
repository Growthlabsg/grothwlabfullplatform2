"use client"

import { useState } from "react"
import { LinkedInStyleHeader } from "@/components/feed/linkedin-style/header"
import { LinkedInStyleSidebar } from "@/components/feed/linkedin-style/sidebar"
import { LinkedInStyleRightSidebar } from "@/components/feed/linkedin-style/right-sidebar"
import { CreatePostDialog } from "@/components/feed/create-post-dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { useEffect } from "react"
import { mockPosts } from "@/lib/mock-feed-data"
import { LinkedInStylePost } from "@/components/feed/linkedin-style/post"
import { Loader2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import type { Post } from "@/types/feed"

interface LinkedInStyleFeedClientProps {
  isMobile?: boolean
  onCreatePost?: () => void
}

export function LinkedInStyleFeedClient({ isMobile, onCreatePost }: LinkedInStyleFeedClientProps = {}) {
  const [showCreatePost, setShowCreatePost] = useState(false)
  const { user } = useAuth()

  // If this is being rendered as part of the mobile view, just return the content
  if (isMobile) {
    return <LinkedInStyleFeedContent isMobile={true} onCreatePost={onCreatePost} />
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <LinkedInStyleHeader onCreatePost={() => setShowCreatePost(true)} />

      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-5">
        {/* Left Sidebar with User Profile */}
        <div className="hidden md:block md:col-span-1 lg:col-span-2">
          <LinkedInStyleSidebar user={user} />
        </div>

        {/* Main Content */}
        <div className="md:col-span-2 lg:col-span-3">
          <LinkedInStyleFeedContent onCreatePost={() => setShowCreatePost(true)} />
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block lg:col-span-2">
          <LinkedInStyleRightSidebar />
        </div>
      </div>

      <CreatePostDialog open={showCreatePost} onOpenChange={setShowCreatePost} />
    </div>
  )
}

// Extract the feed content to be reusable between desktop and mobile
export function LinkedInStyleFeedContent({
  isMobile,
  onCreatePost,
}: { isMobile?: boolean; onCreatePost?: () => void }) {
  const [activeTab, setActiveTab] = useState("all")
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const { user } = useAuth()
  const [showCreatePost, setShowCreatePost] = useState(false)

  // Load initial posts
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      try {
        setPosts(mockPosts.slice(0, 5))
      } catch (error) {
        console.error("Error loading posts:", error)
      } finally {
        setLoading(false)
        setHasMore(mockPosts.length > 5)
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [activeTab])

  // Load more posts
  const loadMorePosts = () => {
    if (loading || !hasMore) return

    setLoading(true)
    setTimeout(() => {
      try {
        const newPosts = mockPosts.slice(page * 5, (page + 1) * 5)
        setPosts((prev) => [...prev, ...newPosts])
        setPage((prev) => prev + 1)
        setHasMore(mockPosts.length > (page + 1) * 5)
      } catch (error) {
        console.error("Error loading more posts:", error)
      } finally {
        setLoading(false)
      }
    }, 1000)
  }

  // Get user avatar or fallback
  const userAvatar = user?.avatarUrl || "/abstract-headscape.png"
  const userInitial = user?.displayName?.charAt(0) || user?.email?.charAt(0) || "U"

  return (
    <div className="space-y-4">
      {/* Create Post Card */}
      <Card className={isMobile ? "shadow-sm" : ""}>
        <CardContent className={`${isMobile ? "p-3" : "p-4"}`}>
          <div className="flex items-center gap-3">
            <Avatar className={isMobile ? "h-8 w-8" : "h-10 w-10"}>
              <AvatarImage src={userAvatar || "/placeholder.svg"} alt={user?.displayName || "User"} />
              <AvatarFallback>{userInitial}</AvatarFallback>
            </Avatar>
            <Button
              variant="outline"
              className={`w-full justify-start text-muted-foreground ${isMobile ? "h-9 text-sm" : "h-10"}`}
              onClick={onCreatePost || (() => setShowCreatePost(true))}
            >
              Start a post
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Feed Filters */}
      <Card className={isMobile ? "shadow-sm" : ""}>
        <CardContent className="p-0">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className={`w-full rounded-none ${isMobile ? "h-10" : "h-12"}`}>
              <TabsTrigger value="all" className={`flex-1 ${isMobile ? "text-xs" : ""}`}>
                All
              </TabsTrigger>
              <TabsTrigger value="following" className={`flex-1 ${isMobile ? "text-xs" : ""}`}>
                Following
              </TabsTrigger>
              <TabsTrigger value="trending" className={`flex-1 ${isMobile ? "text-xs" : ""}`}>
                Trending
              </TabsTrigger>
              <TabsTrigger value="recent" className={`flex-1 ${isMobile ? "text-xs" : ""}`}>
                Recent
              </TabsTrigger>
              <TabsTrigger value="saved" className={`flex-1 ${isMobile ? "text-xs" : ""}`}>
                Saved
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      {/* Posts */}
      {loading && posts.length === 0 ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className={isMobile ? "shadow-sm" : ""}>
              <CardContent className={`${isMobile ? "p-3" : "p-4"}`}>
                <div className="flex items-center space-x-3">
                  <Skeleton className={`${isMobile ? "h-8 w-8" : "h-12 w-12"} rounded-full`} />
                  <div className="space-y-1 flex-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
                <div className="space-y-2 mt-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
                <div className="mt-4">
                  <Skeleton className={`${isMobile ? "h-32" : "h-40"} w-full rounded-md`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : posts.length > 0 ? (
        <div className="space-y-4">
          {posts.map((post) => (
            <LinkedInStylePost key={post.id} post={post} isMobile={isMobile} />
          ))}

          {hasMore && (
            <div className="flex justify-center py-4">
              <Button
                variant="outline"
                onClick={loadMorePosts}
                disabled={loading}
                className={`${isMobile ? "text-sm" : ""}`}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Load more"
                )}
              </Button>
            </div>
          )}
        </div>
      ) : (
        <Card className={isMobile ? "shadow-sm" : ""}>
          <CardContent className={`flex flex-col items-center justify-center py-12 ${isMobile ? "p-4" : "p-6"}`}>
            <h3 className={`font-medium ${isMobile ? "text-lg" : "text-xl"} mb-2`}>No posts yet</h3>
            <p className={`text-muted-foreground text-center mb-4 ${isMobile ? "text-sm" : ""}`}>
              Follow people or join groups to see posts in your feed
            </p>
            <Button>Discover People & Groups</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
