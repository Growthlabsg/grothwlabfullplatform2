"use client"

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/contexts/auth-context'

interface AnalyticsData {
  overview: {
    totalUsers: number
    activeUsers: number
    newUsers: number
    totalRevenue: number
    conversionRate: number
    avgSessionDuration: number
    bounceRate: number
    pageViews: number
  }
  engagement: {
    dailyActive: number[]
    weeklyGrowth: number
    monthlyGrowth: number
    userRetention: number
    sessionDuration: number
    pagesPerSession: number
  }
  demographics: Array<{
    name: string
    value: number
    color: string
  }>
  traffic: Array<{
    name: string
    value: number
    color: string
  }>
  userJourney: Array<{
    stage: string
    users: number
    conversion: number
  }>
  topPages: Array<{
    page: string
    views: number
    unique: number
    bounce: number
  }>
  realTime: {
    currentUsers: number
    activeSessions: number
    pageViews: number
    events: number
  }
}

interface UseAnalyticsReturn {
  data: AnalyticsData | null
  loading: boolean
  error: string | null
  refresh: () => void
  fetchSection: (section: string) => Promise<any>
  trackEvent: (eventName: string, eventData: any) => Promise<void>
  exportData: () => Promise<void>
}

export function useAnalytics(): UseAnalyticsReturn {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  const fetchData = useCallback(async (section?: string) => {
    if (!user) {
      setError('User not authenticated')
      return null
    }

    try {
      setLoading(true)
      setError(null)

      const url = section 
        ? `/api/analytics?section=${section}`
        : '/api/analytics?section=all'

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch analytics data')
      }

      if (section) {
        return result.data
      } else {
        setData(result.data)
        return result.data
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch analytics data'
      setError(errorMessage)
      console.error('Analytics fetch error:', err)
      return null
    } finally {
      setLoading(false)
    }
  }, [user])

  const fetchSection = useCallback(async (section: string) => {
    return await fetchData(section)
  }, [fetchData])

  const refresh = useCallback(() => {
    fetchData()
  }, [fetchData])

  const trackEvent = useCallback(async (eventName: string, eventData: any) => {
    if (!user) return

    try {
      const response = await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'track_event',
          data: {
            eventName,
            eventData,
            userId: user.id,
            timestamp: new Date().toISOString(),
          },
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Failed to track event')
      }
    } catch (err) {
      console.error('Event tracking error:', err)
    }
  }, [user])

  const exportData = useCallback(async () => {
    if (!user) return

    try {
      const response = await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'export_data',
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Failed to export data')
      }

      // Create and download CSV file
      const csvContent = convertToCSV(result.data)
      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `analytics-${new Date().toISOString().split('T')[0]}.csv`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (err) {
      console.error('Export error:', err)
    }
  }, [user])

  // Convert analytics data to CSV format
  const convertToCSV = (data: any) => {
    const rows = []
    
    // Overview data
    rows.push(['Overview Metrics'])
    rows.push(['Metric', 'Value'])
    Object.entries(data.overview).forEach(([key, value]) => {
      rows.push([key, value])
    })
    
    rows.push([])
    rows.push(['Top Pages'])
    rows.push(['Page', 'Views', 'Unique Users', 'Bounce Rate'])
    data.topPages.forEach((page: any) => {
      rows.push([page.page, page.views, page.unique, `${page.bounce}%`])
    })
    
    return rows.map(row => row.join(',')).join('\n')
  }

  // Initial data fetch
  useEffect(() => {
    if (user) {
      fetchData()
    }
  }, [user, fetchData])

  return {
    data,
    loading,
    error,
    refresh,
    fetchSection,
    trackEvent,
    exportData,
  }
}
