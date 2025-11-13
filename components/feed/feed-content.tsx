"use client"

import { useState, useEffect, useCallback } from "react"
import { Post } from "@/components/feed/post"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { Loader2 } from "lucide-react"
import type { Post as PostType } from "@/types/feed"
import { mockPosts } from "@/lib/mock-feed-data"
import { useRecommendationEngine } from "@/hooks/use-recommendation-engine"
import { useUserActivity } from "@/hooks/use-user-activity"

export function FeedContent() {
  const [posts, setPosts] = useState<PostType[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const { getRecommendedContent } = useRecommendationEngine()
  const { trackPostView, trackPostEngagement } = useUserActivity()

  // Load initial posts with a mix of followed and recommended content
  useEffect(() => {
    loadInitialPosts()
  
  }, [])

  const loadInitialPosts = async () => {
    setLoading(true)
    try {
      // In a real app, this would be an API call
      // Simulate API call with delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Get a mix of regular and recommended posts
      const regularPosts = mockPosts.slice(0, 3)
      const recommendedPosts = await getRecommendedContent(2)

      const mixedPosts = [...regularPosts, ...recommendedPosts].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )

      setPosts(mixedPosts)
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
      if (page % 2 === 0) {
        const recommendedPost = await getRecommendedContent(1)
        postsToAdd = [...nextPosts, ...recommendedPost]
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

  // Optimized intersection observer callback with useCallback
  const handleIntersection = useCallback(() => {
    if (!loading && hasMore) {
      loadMorePosts()
    }
  }, [loading, hasMore])

  const loadMoreRef = useIntersectionObserver(handleIntersection)

  const handlePostEngagement = (postId: string, action: "like" | "comment" | "share" | "save") => {
    trackPostEngagement(postId, action)

    // Update local state to reflect the engagement
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          const updatedPost = { ...post }

          if (action === "like") {
            updatedPost.isLiked = !post.isLiked
            updatedPost.likesCount = post.isLiked ? post.likesCount - 1 : post.likesCount + 1
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
    <div className="space-y-6">
      {loading && posts.length === 0 ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20 bg-muted/30 rounded-lg">
          <h3 className="font-medium text-lg mb-2">No posts yet</h3>
          <p className="text-muted-foreground">Follow people or join groups to see posts in your feed</p>
        </div>
      ) : (
        <>
          {posts.map((post) => (
            <Post key={post.id} post={post} onEngagement={(action) => handlePostEngagement(post.id, action)} />
          ))}

          <div ref={loadMoreRef} className="flex justify-center py-4">
            {loading && (
              <div className="flex items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <span className="ml-2 text-sm text-muted-foreground">Loading more posts...</span>
              </div>
            )}
          </div>

          {!hasMore && posts.length > 0 && (
            <div className="text-center py-4 text-muted-foreground">You've reached the end of your feed</div>
          )}
        </>
      )}
    </div>
  )
}
