"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useAuth } from "@/contexts/auth-context"
import type { Post } from "@/types/feed"

interface FeedCache {
  [key: string]: {
    posts: Post[]
    timestamp: number
    hasMore: boolean
  }
}

interface FeedState {
  posts: Post[]
  loading: boolean
  error: string | null
  hasMore: boolean
  page: number
  refreshing: boolean
}

interface UseFeedOptimizationOptions {
  cacheTimeout?: number // Cache timeout in milliseconds (default: 5 minutes)
  batchSize?: number // Number of posts to load per batch
  retryAttempts?: number // Number of retry attempts for failed requests
  debounceDelay?: number // Debounce delay for search/filter operations
}

export function useFeedOptimization(
  feedType: "relevant" | "trending" | "following" | "recent",
  options: UseFeedOptimizationOptions = {}
) {
  const {
    cacheTimeout = 5 * 60 * 1000, // 5 minutes
    batchSize = 10,
    retryAttempts = 3,
    debounceDelay = 300,
  } = options

  const { user } = useAuth()
  const [state, setState] = useState<FeedState>({
    posts: [],
    loading: true,
    error: null,
    hasMore: true,
    page: 1,
    refreshing: false,
  })

  const cache = useRef<FeedCache>({})
  const abortController = useRef<AbortController | null>(null)
  const retryCount = useRef(0)
  const debounceTimer = useRef<number | null>(null)

  // Generate cache key based on feed type and user
  const getCacheKey = useCallback(() => {
    return `${feedType}_${user?.id || 'anonymous'}_${state.page}`
  }, [feedType, user?.id, state.page])

  // Check if cached data is still valid
  const isCacheValid = useCallback((cacheKey: string) => {
    const cached = cache.current[cacheKey]
    if (!cached) return false
    
    const now = Date.now()
    return now - cached.timestamp < cacheTimeout
  }, [cacheTimeout])

  // Get cached data
  const getCachedData = useCallback((cacheKey: string) => {
    const cached = cache.current[cacheKey]
    if (cached && isCacheValid(cacheKey)) {
      return cached
    }
    return null
  }, [isCacheValid])

  // Set cached data
  const setCachedData = useCallback((cacheKey: string, data: { posts: Post[], hasMore: boolean }) => {
    cache.current[cacheKey] = {
      ...data,
      timestamp: Date.now(),
    }
  }, [])

  // Clear cache for specific feed type
  const clearCache = useCallback((feedTypeToClear?: string) => {
    if (feedTypeToClear) {
      Object.keys(cache.current).forEach(key => {
        if (key.startsWith(feedTypeToClear)) {
          delete cache.current[key]
        }
      })
    } else {
      cache.current = {}
    }
  }, [])

  // Simulate API call with error handling and retry logic
  const fetchPosts = useCallback(async (page: number, retryCount = 0): Promise<{ posts: Post[], hasMore: boolean }> => {
    // Cancel previous request if still pending
    if (abortController.current) {
      abortController.current.abort()
    }

    abortController.current = new AbortController()

    try {
      // Simulate API call with realistic delay
      const delay = Math.random() * 500 + 200 // 200-700ms
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(resolve, delay)
        abortController.current?.signal.addEventListener('abort', () => {
          clearTimeout(timeout)
          reject(new Error('Request aborted'))
        })
      })

      // Simulate network errors occasionally
      if (Math.random() < 0.1 && retryCount < 2) {
        throw new Error('Network error')
      }

      // Import mock data dynamically to reduce initial bundle size
      const { mockPosts } = await import('@/lib/mock-feed-data')
      
      const startIndex = (page - 1) * batchSize
      const endIndex = startIndex + batchSize
      const posts = mockPosts.slice(startIndex, endIndex)

      // Apply feed-specific filtering
      let filteredPosts = posts
      if (feedType === 'following') {
        filteredPosts = posts.filter(post => post.author.isFollowed)
      } else if (feedType === 'trending') {
        filteredPosts = posts.sort((a, b) => 
          (b.likesCount || 0) + (b.commentsCount || 0) - ((a.likesCount || 0) + (a.commentsCount || 0))
        )
      }

      return {
        posts: filteredPosts,
        hasMore: endIndex < mockPosts.length,
      }
    } catch (error) {
      if (retryCount < retryAttempts) {
        // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000))
        return fetchPosts(page, retryCount + 1)
      }
      throw error
    }
  }, [feedType, batchSize, retryAttempts])

  // Load posts with caching and error handling
  const loadPosts = useCallback(async (page: number, isRefresh = false) => {
    const cacheKey = getCacheKey()
    
    // Check cache first (except for refresh)
    if (!isRefresh) {
      const cached = getCachedData(cacheKey)
      if (cached) {
        setState(prev => ({
          ...prev,
          posts: page === 1 ? cached.posts : [...prev.posts, ...cached.posts],
          hasMore: cached.hasMore,
          loading: false,
          error: null,
        }))
        return
      }
    }

    setState(prev => ({
      ...prev,
      loading: true,
      error: null,
    }))

    try {
      const { posts: newPosts, hasMore } = await fetchPosts(page)
      
      setCachedData(cacheKey, { posts: newPosts, hasMore })
      
      setState(prev => ({
        ...prev,
        posts: page === 1 ? newPosts : [...prev.posts, ...newPosts],
        hasMore,
        page,
        loading: false,
        error: null,
      }))

      retryCount.current = 0
    } catch (error) {
      console.error('Error loading posts:', error)
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to load posts',
      }))
    }
  }, [getCacheKey, getCachedData, setCachedData, fetchPosts])

  // Load initial posts
  const loadInitialPosts = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null, page: 1 }))
    await loadPosts(1)
  }, [loadPosts])

  // Load more posts
  const loadMorePosts = useCallback(async () => {
    if (state.loading || !state.hasMore) return
    await loadPosts(state.page + 1)
  }, [state.loading, state.hasMore, state.page, loadPosts])

  // Refresh feed
  const refreshFeed = useCallback(async () => {
    setState(prev => ({ ...prev, refreshing: true }))
    clearCache(feedType)
    await loadPosts(1, true)
    setState(prev => ({ ...prev, refreshing: false }))
  }, [feedType, loadPosts, clearCache])

  // Debounced search/filter
  const debouncedSearch = useCallback((searchTerm: string) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    debounceTimer.current = setTimeout(() => {
      // Implement search logic here
      console.log('Searching for:', searchTerm)
    }, debounceDelay)
  }, [debounceDelay])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortController.current) {
        abortController.current.abort()
      }
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
    }
  }, [])

  // Load initial posts when feed type changes
  useEffect(() => {
    loadInitialPosts()
  }, [feedType, loadInitialPosts])

  return {
    ...state,
    loadMorePosts,
    refreshFeed,
    debouncedSearch,
    clearCache: () => clearCache(),
    retry: () => loadInitialPosts(),
  }
} 