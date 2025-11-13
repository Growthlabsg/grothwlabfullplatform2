"use client"

import { useEffect, useRef, useCallback } from "react"
import { useAuth } from "@/contexts/auth-context"

interface PerformanceMetrics {
  initialLoadTime: number
  loadMoreTime: number
  interactionTime: number
  errorRate: number
  cacheHitRate: number
  scrollDepth: number
}

interface PerformanceEvent {
  type: "load" | "interaction" | "error" | "cache" | "scroll"
  timestamp: number
  duration?: number
  metadata?: Record<string, any>
}

export function useFeedPerformance() {
  const { user } = useAuth()
  const metrics = useRef<PerformanceMetrics>({
    initialLoadTime: 0,
    loadMoreTime: 0,
    interactionTime: 0,
    errorRate: 0,
    cacheHitRate: 0,
    scrollDepth: 0,
  })
  
  const events = useRef<PerformanceEvent[]>([])
  const loadStartTime = useRef<number>(0)
  const interactionStartTime = useRef<number>(0)

  // Start timing initial load
  const startLoadTimer = useCallback(() => {
    loadStartTime.current = performance.now()
  }, [])

  // End timing initial load
  const endLoadTimer = useCallback((type: "initial" | "loadMore") => {
    const duration = performance.now() - loadStartTime.current
    
    if (type === "initial") {
      metrics.current.initialLoadTime = duration
    } else {
      metrics.current.loadMoreTime = duration
    }

    events.current.push({
      type: "load",
      timestamp: Date.now(),
      duration,
      metadata: { loadType: type },
    })

    // Log performance data
    console.log(`Feed ${type} load time:`, duration.toFixed(2), "ms")
  }, [])

  // Start timing user interaction
  const startInteractionTimer = useCallback(() => {
    interactionStartTime.current = performance.now()
  }, [])

  // End timing user interaction
  const endInteractionTimer = useCallback((interactionType: string) => {
    const duration = performance.now() - interactionStartTime.current
    
    metrics.current.interactionTime = duration

    events.current.push({
      type: "interaction",
      timestamp: Date.now(),
      duration,
      metadata: { interactionType },
    })

    // Log interaction performance
    console.log(`Feed interaction (${interactionType}) time:`, duration.toFixed(2), "ms")
  }, [])

  // Track errors
  const trackError = useCallback((error: Error, context: string) => {
    metrics.current.errorRate += 1

    events.current.push({
      type: "error",
      timestamp: Date.now(),
      metadata: { 
        error: error.message,
        context,
        stack: error.stack,
      },
    })

    console.error("Feed error:", error.message, "Context:", context)
  }, [])

  // Track cache hits/misses
  const trackCacheEvent = useCallback((hit: boolean) => {
    if (hit) {
      metrics.current.cacheHitRate += 1
    }

    events.current.push({
      type: "cache",
      timestamp: Date.now(),
      metadata: { hit },
    })
  }, [])

  // Track scroll depth
  const trackScrollDepth = useCallback((depth: number) => {
    metrics.current.scrollDepth = Math.max(metrics.current.scrollDepth, depth)
  }, [])

  // Get performance report
  const getPerformanceReport = useCallback(() => {
    const totalEvents = events.current.length
    const errorEvents = events.current.filter(e => e.type === "error").length
    const cacheEvents = events.current.filter(e => e.type === "cache")
    const cacheHits = cacheEvents.filter(e => e.metadata?.hit).length
    const cacheHitRate = cacheEvents.length > 0 ? (cacheHits / cacheEvents.length) * 100 : 0

    return {
      ...metrics.current,
      totalEvents,
      errorRate: totalEvents > 0 ? (errorEvents / totalEvents) * 100 : 0,
      cacheHitRate,
      averageLoadTime: events.current
        .filter(e => e.type === "load" && e.duration)
        .reduce((sum, e) => sum + (e.duration || 0), 0) / 
        events.current.filter(e => e.type === "load").length || 0,
      averageInteractionTime: events.current
        .filter(e => e.type === "interaction" && e.duration)
        .reduce((sum, e) => sum + (e.duration || 0), 0) / 
        events.current.filter(e => e.type === "interaction").length || 0,
    }
  }, [])

  // Send performance data to analytics
  const sendPerformanceData = useCallback(() => {
    const report = getPerformanceReport()
    
    // In a real app, this would send to your analytics service
    // Example: Google Analytics, Mixpanel, etc.
    console.group("Feed Performance Report")
    console.log("Initial Load Time:", report.initialLoadTime.toFixed(2), "ms")
    console.log("Load More Time:", report.loadMoreTime.toFixed(2), "ms")
    console.log("Average Interaction Time:", report.averageInteractionTime.toFixed(2), "ms")
    console.log("Error Rate:", report.errorRate.toFixed(2), "%")
    console.log("Cache Hit Rate:", report.cacheHitRate.toFixed(2), "%")
    console.log("Scroll Depth:", report.scrollDepth, "%")
    console.log("Total Events:", report.totalEvents)
    console.groupEnd()

    // Simulate sending to analytics
    if (user) {
      // trackEvent({
      //   eventType: "feed_performance",
      //   userId: user.id,
      //   timestamp: new Date(),
      //   properties: report,
      // })
    }
  }, [getPerformanceReport, user])

  // Monitor scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollDepth = (scrollTop / documentHeight) * 100
      
      trackScrollDepth(scrollDepth)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [trackScrollDepth])

  // Send performance data periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (events.current.length > 0) {
        sendPerformanceData()
      }
    }, 60000) // Send every minute

    return () => clearInterval(interval)
  }, [sendPerformanceData])

  return {
    startLoadTimer,
    endLoadTimer,
    startInteractionTimer,
    endInteractionTimer,
    trackError,
    trackCacheEvent,
    trackScrollDepth,
    getPerformanceReport,
    sendPerformanceData,
  }
} 