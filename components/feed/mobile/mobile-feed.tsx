"use client"

import { useState, useEffect, useRef } from "react"
import { MobilePost } from "./mobile-post"
import { MobileNavigation } from "./mobile-navigation"
import { MobileCreatePost } from "./mobile-create-post"
import { MobileHeader } from "./mobile-header"
import { Button } from "@/components/ui/button"
import { Plus, Loader2, Filter } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockPosts } from "@/lib/mock-feed-data"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { Skeleton } from "@/components/ui/skeleton"
import { PullToRefresh } from "@/components/ui/pull-to-refresh"
import { useToast } from "@/components/ui/use-toast"
import type { Post as PostType } from "@/types/feed"

export function MobileFeed() {
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [activeTab, setActiveTab] = useState("for-you")
  const [posts, setPosts] = useState<PostType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  // Load initial posts
  useEffect(() => {
    loadInitialPosts()
  }, [activeTab])

  const loadInitialPosts = async () => {
    setIsLoading(true)
    try {
      // Simulate API call with delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Get posts based on active tab
      let initialPosts = mockPosts.slice(0, 5)

      if (activeTab === "following") {
        initialPosts = mockPosts.filter((post) => post.author.isFollowed).slice(0, 5)
      } else if (activeTab === "trending") {
        initialPosts = [...mockPosts]
          .sort((a, b) => (b.likesCount || 0) + (b.commentsCount || 0) - ((a.likesCount || 0) + (a.commentsCount || 0)))
          .slice(0, 5)
      }

      setPosts(initialPosts)
      setPage(1)
      setHasMore(mockPosts.length > 5)
    } catch (error) {
      console.error("Error loading posts:", error)
      toast({
        title: "Error",
        description: "Failed to load posts. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle refresh (pull-to-refresh)
  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Reset page and reload posts
      setPage(1)
      await loadInitialPosts()

      toast({
        title: "Feed refreshed",
        description: "Latest posts have been loaded",
      })
    } catch (error) {
      console.error("Error refreshing feed:", error)
      toast({
        title: "Refresh failed",
        description: "Failed to refresh feed. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsRefreshing(false)
    }
  }

  // Load more posts when scrolling
  const loadMorePosts = async () => {
    if (isLoading || !hasMore) return

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))

      const nextPosts = mockPosts.slice(page * 5, (page + 1) * 5)
      setPosts((prev) => [...prev, ...nextPosts])
      setPage((prev) => prev + 1)
      setIsLoading(false)
      setHasMore(mockPosts.length > (page + 1) * 5)
    } catch (error) {
      console.error("Error loading more posts:", error)
      setIsLoading(false)
    }
  }

  // Intersection observer for infinite scrolling
  const handleIntersection = () => {
    if (!isLoading && !isRefreshing && hasMore) {
      loadMorePosts()
    }
  }

  const loadMoreRef = useIntersectionObserver(handleIntersection)

  return (
    <div className="flex flex-col min-h-screen pb-16">
      <MobileHeader />

      <div className="px-4 py-2 border-b">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="for-you">For You</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex items-center justify-between px-4 py-2">
        <span className="text-sm font-medium">
          {activeTab === "for-you"
            ? "Recommended for you"
            : activeTab === "following"
              ? "People you follow"
              : "Trending content"}
        </span>
        <Button variant="outline" size="sm" className="h-8">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      <PullToRefresh onRefresh={handleRefresh}>
        <main className="flex-1 p-4" ref={containerRef}>
          {isLoading && posts.length === 0 ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 space-y-3">
                  <div className="flex items-center space-x-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-1 flex-1">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-40 w-full rounded-md" />
                </div>
              ))}
            </div>
          ) : posts.length > 0 ? (
            <div className="space-y-4">
              {posts.map((post, index) => (
                <MobilePost key={post.id} post={post} />
              ))}

              <div ref={loadMoreRef} className="py-4 flex justify-center">
                {isLoading && !isRefreshing && (
                  <div className="flex items-center">
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    <span className="text-sm text-muted-foreground">Loading more...</span>
                  </div>
                )}
              </div>

              {!hasMore && (
                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground">You've reached the end</p>
                  <Button variant="link" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                    Back to top
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No posts to show</p>
              <Button variant="outline" className="mt-4">
                Discover people to follow
              </Button>
            </div>
          )}
        </main>
      </PullToRefresh>

      <div className="fixed bottom-20 right-4 z-10">
        <Button size="icon" className="h-14 w-14 rounded-full shadow-lg" onClick={() => setShowCreatePost(true)}>
          <Plus className="h-6 w-6" />
        </Button>
      </div>

      {showCreatePost && <MobileCreatePost onClose={() => setShowCreatePost(false)} />}

      <MobileNavigation />
    </div>
  )
}
