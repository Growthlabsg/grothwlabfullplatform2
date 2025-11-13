"use client"

import { useState, useEffect, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { mockPosts } from "@/lib/mock-feed-data"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { useRecommendationEngine } from "@/hooks/use-recommendation-engine"
import { useUserActivity } from "@/hooks/use-user-activity"
import { useToast } from "@/components/ui/use-toast"
import { Bell, Search, Plus, Filter, Loader2, Home, Users, Briefcase, MessageSquare, Menu } from "lucide-react"
import { MobileCreatePostDialog } from "./mobile-create-post-dialog"
import { LinkedInStylePost } from "./post"
import { Skeleton } from "@/components/ui/skeleton"
import { PullToRefresh } from "@/components/ui/pull-to-refresh"
import { useAuth } from "@/contexts/auth-context"
import type { Post } from "@/types/feed"

export function LinkedInStyleMobileFeed() {
  const [posts, setPosts] = useState<Post[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [activeTab, setActiveTab] = useState("home")
  const { getRecommendedContent } = useRecommendationEngine()
  const { trackPostView, trackPostEngagement } = useUserActivity()
  const { toast } = useToast()
  const { user } = useAuth()
  const containerRef = useRef<HTMLDivElement>(null)

  // Load initial posts with a mix of followed and recommended content
  useEffect(() => {
    loadInitialPosts()
  }, [activeTab])

  const loadInitialPosts = async () => {
    setLoading(true)
    try {
      // In a real app, this would be an API call
      // Simulate API call with delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Get a mix of regular and recommended posts based on tab
      let initialPosts: Post[] = []

      if (activeTab === "network") {
        initialPosts = mockPosts.filter((post) => post.author.isFollowed).slice(0, 5)
      } else if (activeTab === "jobs") {
        // Just use some mock posts for jobs tab (would be job posts in real app)
        initialPosts = mockPosts.filter((post) => post.tags?.includes("job")).slice(0, 5)
      } else {
        // Home tab - mix of regular and recommended
        const regularPosts = mockPosts.slice(0, 3)
        const recommendedPosts = await getRecommendedContent(2)
        initialPosts = [...regularPosts, ...recommendedPosts]
      }

      initialPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

      setPosts(initialPosts)
      setPage(1)
      setLoading(false)
      setHasMore(mockPosts.length > 5)
    } catch (error) {
      console.error("Error loading posts:", error)
      setLoading(false)
    }
  }

  // Handle pull-to-refresh
  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      // Simulate API refresh
      await new Promise((resolve) => setTimeout(resolve, 1200))

      // Reset and reload posts
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

  const loadMorePosts = async () => {
    if (loading || !hasMore) return

    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Get next batch of posts based on active tab
      let nextPosts: Post[] = []

      if (activeTab === "network") {
        nextPosts = mockPosts.filter((post) => post.author.isFollowed).slice(page * 5, (page + 1) * 5)
      } else if (activeTab === "jobs") {
        nextPosts = mockPosts.filter((post) => post.tags?.includes("job")).slice(page * 5, (page + 1) * 5)
      } else {
        // Home tab
        nextPosts = mockPosts.slice(page * 5, (page + 1) * 5)

        // Add some recommended posts every few pages
        if (page % 2 === 0) {
          const recommendedPost = await getRecommendedContent(1)
          nextPosts = [...nextPosts, ...recommendedPost]
        }
      }

      nextPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

      setPosts((prev) => [...prev, ...nextPosts])
      setPage((prev) => prev + 1)
      setLoading(false)
      setHasMore(mockPosts.length > (page + 1) * 5)
    } catch (error) {
      console.error("Error loading more posts:", error)
      setLoading(false)
    }
  }

  // Intersection observer for infinite scrolling
  const handleIntersection = () => {
    if (!loading && !isRefreshing && hasMore) {
      loadMorePosts()
    }
  }

  const loadMoreRef = useIntersectionObserver(handleIntersection)

  const handlePostEngagement = (postId: string, action: "like" | "comment" | "share" | "save" | "repost") => {
    trackPostEngagement(postId, action)

    // Update local state to reflect the engagement
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          const updatedPost = { ...post }

          if (action === "like") {
            updatedPost.isLiked = !post.isLiked
            updatedPost.likesCount = post.isLiked ? (post.likesCount || 1) - 1 : (post.likesCount || 0) + 1
          } else if (action === "save") {
            updatedPost.isSaved = !post.isSaved
          }

          return updatedPost
        }
        return post
      }),
    )
  }

  // Track post views
  useEffect(() => {
    const visiblePosts = posts.slice(0, 5) // Track first 5 visible posts
    visiblePosts.forEach((post) => {
      trackPostView(post.id)
    })
  }, [posts])

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Mobile Header */}
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 px-4 py-2 border-b shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user?.avatarUrl || "/placeholder.svg?height=32&width=32&query=abstract profile"}
              alt={user?.displayName || "User"}
            />
            <AvatarFallback>{user?.displayName ? user.displayName.charAt(0) : "U"}</AvatarFallback>
          </Avatar>
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search" className="pl-8 bg-muted/50 border-none rounded-full h-9" />
          </div>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </Button>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <PullToRefresh onRefresh={handleRefresh}>
        <div className="flex-1 pb-16" ref={containerRef}>
          {/* Create Post Card */}
          <Card className="mx-4 my-3 shadow-sm">
            <div className="p-3 flex items-center gap-3">
              <Avatar>
                <AvatarImage
                  src={user?.avatarUrl || "/placeholder.svg?height=40&width=40&query=abstract profile"}
                  alt={user?.displayName || "User"}
                />
                <AvatarFallback>{user?.displayName ? user.displayName.charAt(0) : "U"}</AvatarFallback>
              </Avatar>
              <Button
                variant="outline"
                className="flex-1 justify-start text-muted-foreground h-10 px-4 rounded-full bg-muted/50"
                onClick={() => setShowCreatePost(true)}
              >
                Start a post
              </Button>
            </div>
          </Card>

          {/* Filter Section */}
          <div className="px-4 mb-3 overflow-x-auto flex items-center space-x-2 no-scrollbar">
            <Button variant="outline" size="sm" className="rounded-full whitespace-nowrap">
              <Filter className="h-3 w-3 mr-1" />
              My Network
            </Button>
            <Button variant="outline" size="sm" className="rounded-full whitespace-nowrap">
              Trending
            </Button>
            <Button variant="outline" size="sm" className="rounded-full whitespace-nowrap">
              Tech
            </Button>
            <Button variant="outline" size="sm" className="rounded-full whitespace-nowrap">
              Startups
            </Button>
            <Button variant="outline" size="sm" className="rounded-full whitespace-nowrap">
              Finance
            </Button>
          </div>

          {/* Posts Section */}
          <div className="space-y-3 px-4">
            {loading && posts.length === 0 ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="p-3">
                      <div className="flex items-center space-x-3">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="space-y-1 flex-1">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-3 w-1/2" />
                        </div>
                      </div>
                      <div className="space-y-2 mt-3">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                      </div>
                    </div>
                    <Skeleton className="h-[200px] w-full" />
                  </Card>
                ))}
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No posts to show</p>
                <Button variant="outline" className="mt-4">
                  Discover people to follow
                </Button>
              </div>
            ) : (
              <>
                {posts.map((post) => (
                  <LinkedInStylePost
                    key={post.id}
                    post={post}
                    onEngagement={(action) => handlePostEngagement(post.id, action)}
                    mobile
                  />
                ))}

                <div ref={loadMoreRef} className="py-4 flex justify-center">
                  {loading && !isRefreshing && (
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
              </>
            )}
          </div>
        </div>
      </PullToRefresh>

      {/* Create Post Button */}
      <div className="fixed bottom-20 right-4 z-10">
        <Button
          size="icon"
          className="h-12 w-12 rounded-full shadow-lg bg-primary hover:bg-primary/90"
          onClick={() => setShowCreatePost(true)}
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-10 bg-white dark:bg-gray-800 border-t">
        <div className="flex justify-around py-2">
          <Button
            variant="ghost"
            className={`flex-col items-center px-4 py-1 ${activeTab === "home" ? "text-primary" : "text-muted-foreground"}`}
            onClick={() => setActiveTab("home")}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">Home</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex-col items-center px-4 py-1 ${activeTab === "network" ? "text-primary" : "text-muted-foreground"}`}
            onClick={() => setActiveTab("network")}
          >
            <Users className="h-5 w-5" />
            <span className="text-xs mt-1">Network</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex-col items-center px-4 py-1 ${activeTab === "post" ? "text-primary" : "text-muted-foreground"}`}
            onClick={() => setShowCreatePost(true)}
          >
            <Plus className="h-5 w-5" />
            <span className="text-xs mt-1">Post</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex-col items-center px-4 py-1 ${activeTab === "jobs" ? "text-primary" : "text-muted-foreground"}`}
            onClick={() => setActiveTab("jobs")}
          >
            <Briefcase className="h-5 w-5" />
            <span className="text-xs mt-1">Jobs</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex-col items-center px-4 py-1 ${activeTab === "messages" ? "text-primary" : "text-muted-foreground"}`}
            onClick={() => setActiveTab("messages")}
          >
            <MessageSquare className="h-5 w-5" />
            <span className="text-xs mt-1">Messages</span>
          </Button>
        </div>
      </div>

      {showCreatePost && <MobileCreatePostDialog open={showCreatePost} onOpenChange={setShowCreatePost} />}
    </div>
  )
}
