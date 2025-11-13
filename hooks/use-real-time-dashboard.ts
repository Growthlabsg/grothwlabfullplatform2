"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { realTimeDashboardService, type DashboardData, type DashboardMetrics, type RealTimeEvent } from "@/lib/real-time-dashboard-service"

interface UseRealTimeDashboardOptions {
  autoRefresh?: boolean
  refreshInterval?: number
  enableRealTime?: boolean
}

interface UseRealTimeDashboardReturn {
  data: DashboardData | null
  metrics: DashboardMetrics | null
  recentEvents: RealTimeEvent[]
  loading: boolean
  error: string | null
  lastUpdated: Date | null
  refresh: () => Promise<void>
  isConnected: boolean
}

export function useRealTimeDashboard(options: UseRealTimeDashboardOptions = {}): UseRealTimeDashboardReturn {
  const {
    autoRefresh = true,
    refreshInterval = 30000, // 30 seconds
    enableRealTime = true,
  } = options

  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  const refreshTimeoutRef = useRef<number | null>(null)
  const unsubscribeRef = useRef<(() => void) | null>(null)

  // Initialize real-time connection
  const initializeRealTime = useCallback(() => {
    try {
      if (enableRealTime) {
        realTimeDashboardService.connectToRealTimeSource()
        setIsConnected(true)
      }
    } catch (error) {
      console.error("Failed to initialize real-time connection:", error)
      setError("Failed to connect to real-time updates")
    }
  }, [enableRealTime])

  // Subscribe to real-time updates
  const subscribeToUpdates = useCallback(() => {
    try {
      unsubscribeRef.current = realTimeDashboardService.subscribe((newData) => {
        setData(newData)
        setLastUpdated(newData.lastUpdated)
        setLoading(false)
        setError(null)
      })
    } catch (error) {
      console.error("Failed to subscribe to updates:", error)
      setError("Failed to subscribe to real-time updates")
    }
  }, [])

  // Manual refresh function
  const refresh = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const newData = await realTimeDashboardService.refreshData()
      setData(newData)
      setLastUpdated(newData.lastUpdated)
    } catch (error) {
      console.error("Failed to refresh dashboard data:", error)
      setError("Failed to refresh dashboard data")
    } finally {
      setLoading(false)
    }
  }, [])

  // Set up auto-refresh
  const setupAutoRefresh = useCallback(() => {
    if (autoRefresh && refreshInterval > 0) {
      refreshTimeoutRef.current = setInterval(refresh, refreshInterval)
    }
  }, [autoRefresh, refreshInterval, refresh])

  // Clean up auto-refresh
  const cleanupAutoRefresh = useCallback(() => {
    if (refreshTimeoutRef.current) {
      clearInterval(refreshTimeoutRef.current)
      refreshTimeoutRef.current = null
    }
  }, [])

  // Initialize on mount
  useEffect(() => {
    initializeRealTime()
    subscribeToUpdates()
    setupAutoRefresh()

    // Initial data load
    refresh()

    return () => {
      cleanupAutoRefresh()
      if (unsubscribeRef.current) {
        unsubscribeRef.current()
      }
    }
  }, [initializeRealTime, subscribeToUpdates, setupAutoRefresh, cleanupAutoRefresh, refresh])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupAutoRefresh()
      if (unsubscribeRef.current) {
        unsubscribeRef.current()
      }
    }
  }, [cleanupAutoRefresh])

  return {
    data,
    metrics: data?.metrics || null,
    recentEvents: data?.recentEvents || [],
    loading,
    error,
    lastUpdated,
    refresh,
    isConnected,
  }
}

// Specialized hooks for specific dashboard sections
export function useDashboardMetrics() {
  const { metrics, loading, error, lastUpdated, refresh } = useRealTimeDashboard()
  
  return {
    metrics,
    loading,
    error,
    lastUpdated,
    refresh,
  }
}

export function useDashboardEvents() {
  const { recentEvents, loading, error, lastUpdated, refresh } = useRealTimeDashboard()
  
  return {
    events: recentEvents,
    loading,
    error,
    lastUpdated,
    refresh,
  }
}

export function useDashboardChartData(chartType: keyof DashboardData["chartData"]) {
  const { data, loading, error, lastUpdated, refresh } = useRealTimeDashboard()
  
  return {
    chartData: data?.chartData[chartType] || [],
    loading,
    error,
    lastUpdated,
    refresh,
  }
} 