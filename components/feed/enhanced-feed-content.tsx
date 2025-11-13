"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { EnhancedPost } from "./enhanced-post"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { useFeedOptimization } from "@/hooks/use-feed-optimization"
import { FeedErrorBoundary, useFeedErrorHandler } from "./feed-error-boundary"
import { 
  FeedSkeleton, 
  FeedLoadingSpinner, 
  FeedErrorState, 
  FeedLoadMore,
  FeedRefreshButton,
  FeedEmptyState 
} from "./feed-loading-states"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EnhancedCreatePostDialog } from "./enhanced-create-post-dialog"
import { FeedFilters } from "./feed-filters"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/contexts/auth-context"
import { useRecommendationEngine } from "@/hooks/use-recommendation-engine"
import { useUserActivity } from "@/hooks/use-user-activity"
import { useToast } from "@/components/ui/use-toast"
import { MessageSquare, Image, Link, Video } from "lucide-react"
import type { Post } from "@/types/feed"

export function EnhancedFeedContent() {
  const [activeTab, setActiveTab] = useState("relevant")
  const [sortOrder, setSortOrder] = useState<"recent" | "top">("recent")
  const [createPostOpen, setCreatePostOpen] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  
  const { user } = useAuth()
  const { getRecommendedContent } = useRecommendationEngine()
  const { trackPostView, trackPostEngagement } = useUserActivity()
  const { toast } = useToast()
  const { handleError } = useFeedErrorHandler()
  
  // Use the optimized feed hook
  const {
    posts,
    loading,
    error,
    hasMore,
    page,
    refreshing,
    loadMorePosts,
    refreshFeed,
    debouncedSearch,
    retry,
  } = useFeedOptimization(activeTab as any, {
    batchSize: 8,
    retryAttempts: 3,
    debounceDelay: 300,
  })

  const lastPostRef = useRef<HTMLDivElement>(null)

  // Optimized intersection observer callback
  const handleIntersection = useCallback(() => {
    if (!loading && hasMore) {
      loadMorePosts()
    }
  }, [loading, hasMore, loadMorePosts])

  const loadMoreRef = useIntersectionObserver(handleIntersection)

  // Track post views for analytics
  useEffect(() => {
    const visiblePosts = posts.slice(0, 5) // Track first 5 visible posts
    visiblePosts.forEach((post) => {
      trackPostView(post.id, post.author.id)
    })
  }, [posts, trackPostView])

  // Handle post engagement with error handling
  const handlePostEngagement = useCallback((postId: string, action: "like" | "comment" | "share" | "save") => {
    try {
      const post = posts.find(p => p.id === postId)
      if (!post) {
        console.error("Post not found:", postId)
        return
      }

      trackPostEngagement(postId, action, post.author.id)

      // Update local state optimistically
      // In a real app, this would be handled by a state management solution
      toast({
        title: "Engagement recorded",
        description: `Your ${action} has been recorded.`,
      })
    } catch (error) {
      console.error("Error handling post engagement:", error)
      toast({
        title: "Error",
        description: "Failed to record engagement. Please try again.",
        variant: "destructive",
      })
    }
  }, [posts, trackPostEngagement, toast])

  // Handle tab change with error handling
  const handleTabChange = useCallback((value: string) => {
    try {
      setActiveTab(value)
      // The useFeedOptimization hook will automatically reload posts
    } catch (error) {
      console.error("Error changing tab:", error)
      toast({
        title: "Error",
        description: "Failed to switch feed type. Please try again.",
        variant: "destructive",
      })
    }
  }, [toast])

  // Handle refresh with error handling
  const handleRefresh = useCallback(async () => {
    try {
      await refreshFeed()
      toast({
        title: "Feed refreshed",
        description: "Latest posts have been loaded.",
      })
    } catch (error) {
      console.error("Error refreshing feed:", error)
      toast({
        title: "Refresh failed",
        description: "Failed to refresh feed. Please try again.",
        variant: "destructive",
      })
    }
  }, [refreshFeed, toast])

  // Handle retry with error handling
  const handleRetry = useCallback(() => {
    try {
      retry()
    } catch (error) {
      console.error("Error retrying:", error)
      toast({
        title: "Retry failed",
        description: "Failed to reload posts. Please try again.",
        variant: "destructive",
      })
    }
  }, [retry, toast])

  // Handle create post
  const handleCreatePost = useCallback(() => {
    setCreatePostOpen(true)
  }, [])

  // Render loading state
  if (loading && posts.length === 0) {
    return (
      <div className="space-y-4">
        <FeedSkeleton count={3} />
      </div>
    )
  }

  // Render error state
  if (error && posts.length === 0) {
    return (
      <FeedErrorState 
        error={error} 
        onRetry={handleRetry}
        onRefresh={handleRefresh}
      />
    )
  }

  // Render empty state
  if (!loading && posts.length === 0) {
    return (
      <FeedEmptyState
        title="No posts available"
        description="Follow some people or create your first post to see content here."
        actionText="Create Post"
        onAction={handleCreatePost}
      />
    )
  }

  return (
    <FeedErrorBoundary onError={handleError}>
      <div className="space-y-4">
        {/* Create Post Card */}
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={user?.avatarUrl || "/placeholder.svg"} alt={user?.displayName || "User"} />
              <AvatarFallback>{user?.displayName ? user.displayName.charAt(0) : "U"}</AvatarFallback>
            </Avatar>
            <Button
              variant="outline"
              className="w-full justify-start text-muted-foreground h-10 px-4"
              onClick={handleCreatePost}
            >
              Start a post
            </Button>
          </div>

          <div className="flex justify-between mt-3">
            <Button variant="ghost" size="sm" onClick={handleCreatePost}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Text
            </Button>
            <Button variant="ghost" size="sm" onClick={handleCreatePost}>
              <Image className="h-4 w-4 mr-2" />
              Image
            </Button>
            <Button variant="ghost" size="sm" onClick={handleCreatePost}>
              <Video className="h-4 w-4 mr-2" />
              Video
            </Button>
            <Button variant="ghost" size="sm" onClick={handleCreatePost}>
              <Link className="h-4 w-4 mr-2" />
              Link
            </Button>
          </div>
        </Card>

        {/* Feed Controls */}
        <div className="flex items-center justify-between">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="relevant">Relevant</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex items-center gap-2">
            <FeedRefreshButton 
              onRefresh={handleRefresh} 
              refreshing={refreshing}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              Filters
            </Button>
          </div>
        </div>

        {/* Feed Filters */}
        {showFilters && (
          <FeedFilters
            sortOrder={sortOrder}
            onSortOrderChange={setSortOrder}
            onSearch={debouncedSearch}
          />
        )}

        {/* Posts */}
        <div className="space-y-4">
          {posts.map((post, index) => (
            <div key={post.id} ref={index === posts.length - 1 ? loadMoreRef : undefined}>
              <EnhancedPost
                post={post}
                onEngagement={handlePostEngagement}
                isRecommended={post.isRecommended}
              />
            </div>
          ))}
        </div>

        {/* Load More */}
        <FeedLoadMore
          loading={loading}
          hasMore={hasMore}
          onLoadMore={loadMorePosts}
        />

        {/* Loading Spinner for initial load */}
        {loading && posts.length > 0 && (
          <FeedLoadingSpinner text="Loading more posts..." />
        )}
      </div>

      {/* Create Post Dialog */}
      <EnhancedCreatePostDialog
        open={createPostOpen}
        onOpenChange={setCreatePostOpen}
        onPostCreated={({ content, attachments }) => {
          setCreatePostOpen(false)
          // Optimistically prepend a new post to the list
          const optimistic: Post = {
            id: String(Date.now()),
            author: {
              id: "current-user",
              name: "You",
              headline: "Member",
              avatar: "/placeholder.svg",
              verified: false,
            },
            content: content,
            timestamp: new Date().toISOString(),
            likes: 0,
            comments: 0,
            reposts: 0,
            tags: [],
            image: attachments[0] ?? null,
          }
          posts.unshift(optimistic)
          // Trigger refresh to reconcile with backend later if needed
          refreshFeed()
        }}
      />
    </FeedErrorBoundary>
  )
}
