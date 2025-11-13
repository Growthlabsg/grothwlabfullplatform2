"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Loader2, Globe, Users, TrendingUp, Clock, Bookmark, Star, Filter, ChevronDown } from "lucide-react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { useRecommendationEngine } from "@/hooks/use-recommendation-engine"
import { useUserActivity } from "@/hooks/use-user-activity"
import { useAuth } from "@/contexts/auth-context"
import { mockPosts } from "@/lib/mock-feed-data"
import { LinkedInStylePost } from "./post"
import type { Post } from "@/types/feed"

interface LinkedInStyleFeedContentProps {
  onCreatePost: () => void
}

export function LinkedInStyleFeedContent({ onCreatePost }: LinkedInStyleFeedContentProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const [activeFilter, setActiveFilter] = useState("all")
  const [sortOrder, setSortOrder] = useState<"recent" | "top">("recent")
  const { getRecommendedContent } = useRecommendationEngine()
  const { trackPostView, trackPostEngagement } = useUserActivity()
  const { user } = useAuth()
  const lastPostRef = useRef<HTMLDivElement>(null)

  // Load initial posts
  useEffect(() => {
    loadInitialPosts()
  }, [activeFilter])

  const loadInitialPosts = async () => {
    setLoading(true)
    try {
      // Simulate API call with delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      let initialPosts: Post[] = []

      if (activeFilter === "trending") {
        // Sort by engagement metrics
        initialPosts = mockPosts
          .slice(0, 5)
          .sort((a, b) => (b.likesCount || 0) + (b.commentsCount || 0) - ((a.likesCount || 0) + (a.commentsCount || 0)))
      } else if (activeFilter === "following") {
        // Filter posts from followed users
        initialPosts = mockPosts.slice(0, 5).filter((post) => post.author.isFollowed)
      } else if (activeFilter === "recent") {
        // Sort by date
        initialPosts = mockPosts
          .slice(0, 5)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      } else if (activeFilter === "saved") {
        // Filter saved posts
        initialPosts = mockPosts.slice(0, 5).filter((post) => post.isSaved)
      } else if (activeFilter === "featured") {
        // Filter featured posts
        initialPosts = mockPosts.slice(0, 5).filter((post) => post.isFeatured)
      } else {
        // Mix of regular and recommended posts
        const regularPosts = mockPosts.slice(0, 3)
        const recommendedPosts = await getRecommendedContent(2)
        initialPosts = [...regularPosts, ...recommendedPosts]
      }

      // Apply sort order
      if (sortOrder === "recent") {
        initialPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      } else {
        initialPosts.sort(
          (a, b) => (b.likesCount || 0) + (b.commentsCount || 0) - ((a.likesCount || 0) + (a.commentsCount || 0)),
        )
      }

      setPosts(initialPosts)
      setPage(1)
      setLoading(false)
      setHasMore(mockPosts.length > 5)
    } catch (error) {
      console.error("Error loading posts:", error)
      setLoading(false)
    }
  }

  const loadMorePosts = async () => {
    if (loading || !hasMore) return

    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))

      const nextPosts = mockPosts.slice(page * 5, (page + 1) * 5)

      // Add some recommended posts every few pages
      let postsToAdd = nextPosts
      if (page % 2 === 0 && activeFilter === "all") {
        const recommendedPost = await getRecommendedContent(1)
        postsToAdd = [...nextPosts, ...recommendedPost]
      }

      // Apply sort order
      if (sortOrder === "recent") {
        postsToAdd.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      } else {
        postsToAdd.sort(
          (a, b) => (b.likesCount || 0) + (b.commentsCount || 0) - ((a.likesCount || 0) + (a.commentsCount || 0)),
        )
      }

      setPosts((prev) => [...prev, ...postsToAdd])
      setPage((prev) => prev + 1)
      setLoading(false)
      setHasMore(mockPosts.length > (page + 1) * 5)
    } catch (error) {
      console.error("Error loading more posts:", error)
      setLoading(false)
    }
  }

  // Optimized intersection observer callback
  const handleIntersection = useCallback(() => {
    if (!loading && hasMore) {
      loadMorePosts()
    }
  }, [loading, hasMore])

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
    <div className="space-y-4">
      {/* Create Post Card */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage
                src={user?.avatarUrl || "/placeholder.svg?height=40&width=40&query=abstract profile"}
                alt={user?.displayName || "User"}
              />
              <AvatarFallback>{user?.displayName ? user.displayName.charAt(0) : "U"}</AvatarFallback>
            </Avatar>
            <Button
              variant="outline"
              className="w-full justify-start text-muted-foreground h-10 px-4"
              onClick={onCreatePost}
            >
              Start a post
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Feed Filters */}
      <Card>
        <CardContent className="p-0">
          <Tabs defaultValue={activeFilter} onValueChange={setActiveFilter} className="w-full">
            <TabsList className="w-full rounded-none h-12">
              <TabsTrigger value="all" className="flex items-center gap-1 flex-1">
                <Globe className="h-4 w-4" />
                <span>All</span>
              </TabsTrigger>
              <TabsTrigger value="following" className="flex items-center gap-1 flex-1">
                <Users className="h-4 w-4" />
                <span>Following</span>
              </TabsTrigger>
              <TabsTrigger value="trending" className="flex items-center gap-1 flex-1">
                <TrendingUp className="h-4 w-4" />
                <span>Trending</span>
              </TabsTrigger>
              <TabsTrigger value="recent" className="flex items-center gap-1 flex-1">
                <Clock className="h-4 w-4" />
                <span>Recent</span>
              </TabsTrigger>
              <TabsTrigger value="saved" className="flex items-center gap-1 flex-1">
                <Bookmark className="h-4 w-4" />
                <span>Saved</span>
              </TabsTrigger>
              <TabsTrigger value="featured" className="flex items-center gap-1 flex-1">
                <Star className="h-4 w-4" />
                <span>Featured</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      {/* Filter Controls */}
      <div className="flex justify-between items-center">
        <div className="text-sm font-medium">
          {activeFilter === "all" && "All Posts"}
          {activeFilter === "following" && "Posts from People You Follow"}
          {activeFilter === "trending" && "Trending Posts"}
          {activeFilter === "recent" && "Recent Posts"}
          {activeFilter === "saved" && "Saved Posts"}
          {activeFilter === "featured" && "Featured Posts"}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filters</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => setSortOrder(sortOrder === "recent" ? "top" : "recent")}
          >
            <span className="hidden sm:inline">Sort by:</span>
            <span className="font-medium capitalize">{sortOrder}</span>
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>

      {/* Posts */}
      {loading && posts.length === 0 ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
                <div className="space-y-2 mt-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
                <div className="mt-4">
                  <Skeleton className="h-[200px] w-full rounded-md" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <h3 className="text-xl font-medium mb-2">No posts yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              Follow people or join groups to see posts in your feed
            </p>
            <Button>Discover People & Groups</Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="space-y-4">
            {posts.map((post, index) => (
              <div key={post.id} ref={index === posts.length - 1 ? lastPostRef : null}>
                <LinkedInStylePost post={post} onEngagement={(action) => handlePostEngagement(post.id, action)} />
              </div>
            ))}
          </div>

          <div ref={loadMoreRef} className="flex justify-center py-4">
            {loading && (
              <div className="flex items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" />
                <span className="text-sm text-muted-foreground">Loading more posts...</span>
              </div>
            )}
          </div>

          {!hasMore && posts.length > 0 && (
            <Card>
              <CardContent className="py-6 text-center">
                <p className="text-muted-foreground mb-2">You've reached the end of your feed</p>
                <Button variant="outline" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  Back to top
                </Button>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  )
}
