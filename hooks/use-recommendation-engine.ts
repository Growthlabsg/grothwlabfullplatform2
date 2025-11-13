"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { getPersonalizedRecommendations } from "@/lib/enhanced-recommendation-engine"
import type { Post } from "@/types/feed"
import { mockPosts } from "@/lib/mock-feed-data"

export interface UserInterests {
  topics: string[]
  industries: string[]
  skills: string[]
}

export function useRecommendationEngine() {
  const [isLoading, setIsLoading] = useState(false)
  const [userInterests, setUserInterests] = useState<UserInterests | null>(null)
  const { user } = useAuth()

  // Load user interests on mount
  useEffect(() => {
    if (user) {
      // In a real app, this would fetch user interests from the server
      setUserInterests({
        topics: ["startup", "funding", "technology", "ai", "blockchain"],
        industries: ["fintech", "healthtech", "edtech"],
        skills: ["marketing", "product", "design"],
      })
    }
  }, [user])

  // Get recommended content
  const getRecommendedContent = async (limit = 5): Promise<Post[]> => {
    if (!user) return []

    setIsLoading(true)
    try {
      // Get personalized recommendations
      const recommendedIds = await getPersonalizedRecommendations(user.id, "post", limit, userInterests || undefined)

      // Map IDs to actual posts
      // In a real app, this would fetch the posts from the server
      const recommendedPosts = recommendedIds
        .map((id) => {
          // For demo purposes, we'll just use the mock posts and mark them as recommended
          const postIndex = Number.parseInt(id.replace("content", "")) % mockPosts.length
          return {
            ...mockPosts[postIndex],
            isRecommended: true,
          }
        })
        .filter(Boolean)

      return recommendedPosts
    } catch (error) {
      console.error("Error getting recommended content:", error)
      return []
    } finally {
      setIsLoading(false)
    }
  }

  // Get recommended connections
  const getRecommendedConnections = async (limit = 5): Promise<string[]> => {
    if (!user) return []

    setIsLoading(true)
    try {
      // Get recommended connections
      const recommendedUserIds = await getRecommendedConnections(user.id, limit)
      return recommendedUserIds
    } catch (error) {
      console.error("Error getting recommended connections:", error)
      return []
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    userInterests,
    getRecommendedContent,
    getRecommendedConnections,
  }
}
