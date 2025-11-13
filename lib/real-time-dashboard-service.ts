"use client"

import { EventSourcePolyfill } from "event-source-polyfill"

export interface DashboardMetrics {
  totalUsers: number
  activeUsers: number
  totalPosts: number
  totalConnections: number
  totalStartups: number
  totalInvestors: number
  totalMentors: number
  totalEvents: number
  totalFunding: number
  engagementRate: number
  growthRate: number
  conversionRate: number
}

export interface RealTimeEvent {
  id: string
  type: "user_joined" | "post_created" | "connection_made" | "funding_raised" | "event_created"
  timestamp: Date
  userId?: string
  userName?: string
  data: Record<string, any>
}

export interface ChartDataPoint {
  timestamp: Date
  value: number
  category?: string
}

export interface DashboardData {
  metrics: DashboardMetrics
  recentEvents: RealTimeEvent[]
  chartData: {
    userGrowth: ChartDataPoint[]
    engagement: ChartDataPoint[]
    funding: ChartDataPoint[]
    connections: ChartDataPoint[]
  }
  lastUpdated: Date
}

class RealTimeDashboardService {
  private eventSource: EventSourcePolyfill | null = null
  private subscribers: Set<(data: DashboardData) => void> = new Set()
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectDelay = 1000
  private isConnected = false

  // Initial mock data
  private currentData: DashboardData = {
    metrics: {
      totalUsers: 1247,
      activeUsers: 89,
      totalPosts: 3421,
      totalConnections: 5678,
      totalStartups: 234,
      totalInvestors: 156,
      totalMentors: 89,
      totalEvents: 45,
      totalFunding: 12500000,
      engagementRate: 78.5,
      growthRate: 12.3,
      conversionRate: 4.2,
    },
    recentEvents: [],
    chartData: {
      userGrowth: [],
      engagement: [],
      funding: [],
      connections: [],
    },
    lastUpdated: new Date(),
  }

  constructor() {
    this.initializeMockData()
    this.startRealTimeUpdates()
  }

  private initializeMockData() {
    // Generate mock chart data for the last 30 days
    const now = new Date()
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    this.currentData.chartData = {
      userGrowth: this.generateTimeSeriesData(thirtyDaysAgo, now, 1000, 1400),
      engagement: this.generateTimeSeriesData(thirtyDaysAgo, now, 60, 85),
      funding: this.generateTimeSeriesData(thirtyDaysAgo, now, 8000000, 15000000),
      connections: this.generateTimeSeriesData(thirtyDaysAgo, now, 4000, 7000),
    }

    // Generate mock recent events
    this.currentData.recentEvents = this.generateMockEvents()
  }

  private generateTimeSeriesData(
    startDate: Date,
    endDate: Date,
    minValue: number,
    maxValue: number
  ): ChartDataPoint[] {
    const data: ChartDataPoint[] = []
    const timeDiff = endDate.getTime() - startDate.getTime()
    const dayDiff = timeDiff / (24 * 60 * 60 * 1000)

    for (let i = 0; i <= dayDiff; i++) {
      const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000)
      const progress = i / dayDiff
      const value = minValue + (maxValue - minValue) * progress + (Math.random() - 0.5) * (maxValue - minValue) * 0.1

      data.push({
        timestamp: date,
        value: Math.round(value),
      })
    }

    return data
  }

  private generateMockEvents(): RealTimeEvent[] {
    const eventTypes: RealTimeEvent["type"][] = [
      "user_joined",
      "post_created",
      "connection_made",
      "funding_raised",
      "event_created",
    ]

    const events: RealTimeEvent[] = []
    const now = new Date()

    for (let i = 0; i < 10; i++) {
      const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)]
      const timestamp = new Date(now.getTime() - Math.random() * 24 * 60 * 60 * 1000)

      events.push({
        id: `event_${i}`,
        type: eventType,
        timestamp,
        userId: `user_${Math.floor(Math.random() * 1000)}`,
        userName: `User ${Math.floor(Math.random() * 1000)}`,
        data: this.generateEventData(eventType),
      })
    }

    return events.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  }

  private generateEventData(eventType: RealTimeEvent["type"]): Record<string, any> {
    switch (eventType) {
      case "user_joined":
        return {
          userType: ["startup", "investor", "mentor"][Math.floor(Math.random() * 3)],
          location: ["Singapore", "Malaysia", "Indonesia", "Thailand"][Math.floor(Math.random() * 4)],
        }
      case "post_created":
        return {
          postType: ["text", "image", "video", "link"][Math.floor(Math.random() * 4)],
          hashtags: ["startup", "funding", "innovation"][Math.floor(Math.random() * 3)],
        }
      case "connection_made":
        return {
          connectionType: ["startup-investor", "startup-mentor", "investor-investor"][Math.floor(Math.random() * 3)],
        }
      case "funding_raised":
        return {
          amount: Math.floor(Math.random() * 1000000) + 100000,
          round: ["seed", "series-a", "series-b"][Math.floor(Math.random() * 3)],
        }
      case "event_created":
        return {
          eventType: ["workshop", "pitch", "networking"][Math.floor(Math.random() * 3)],
          attendees: Math.floor(Math.random() * 100) + 10,
        }
      default:
        return {}
    }
  }

  private startRealTimeUpdates() {
    // Simulate real-time updates every 5 seconds
    setInterval(() => {
      this.updateMetrics()
      this.addRandomEvent()
      this.updateChartData()
      this.notifySubscribers()
    }, 5000)
  }

  private updateMetrics() {
    // Simulate metric changes
    const changeFactor = 0.98 + Math.random() * 0.04 // ±2% change

    this.currentData.metrics = {
      ...this.currentData.metrics,
      activeUsers: Math.round(this.currentData.metrics.activeUsers * changeFactor),
      totalPosts: this.currentData.metrics.totalPosts + Math.floor(Math.random() * 3),
      totalConnections: this.currentData.metrics.totalConnections + Math.floor(Math.random() * 5),
      engagementRate: Math.max(0, Math.min(100, this.currentData.metrics.engagementRate + (Math.random() - 0.5) * 2)),
      growthRate: Math.max(0, this.currentData.metrics.growthRate + (Math.random() - 0.5) * 1),
      conversionRate: Math.max(0, Math.min(100, this.currentData.metrics.conversionRate + (Math.random() - 0.5) * 0.5)),
    }

    this.currentData.lastUpdated = new Date()
  }

  private addRandomEvent() {
    const eventTypes: RealTimeEvent["type"][] = [
      "user_joined",
      "post_created",
      "connection_made",
      "funding_raised",
      "event_created",
    ]

    const newEvent: RealTimeEvent = {
      id: `event_${Date.now()}`,
      type: eventTypes[Math.floor(Math.random() * eventTypes.length)],
      timestamp: new Date(),
      userId: `user_${Math.floor(Math.random() * 1000)}`,
      userName: `User ${Math.floor(Math.random() * 1000)}`,
      data: this.generateEventData(eventTypes[Math.floor(Math.random() * eventTypes.length)]),
    }

    this.currentData.recentEvents.unshift(newEvent)
    
    // Keep only the last 20 events
    if (this.currentData.recentEvents.length > 20) {
      this.currentData.recentEvents = this.currentData.recentEvents.slice(0, 20)
    }
  }

  private updateChartData() {
    const now = new Date()
    
    // Add new data points to charts
    Object.keys(this.currentData.chartData).forEach((key) => {
      const chartData = this.currentData.chartData[key as keyof typeof this.currentData.chartData]
      
      // Ensure chartData is an array
      if (Array.isArray(chartData)) {
        const lastPoint = chartData[chartData.length - 1]
        
        if (lastPoint) {
          const changeFactor = 0.95 + Math.random() * 0.1 // ±5% change
          const newValue = Math.round(lastPoint.value * changeFactor)
          
          chartData.push({
            timestamp: now,
            value: newValue,
          })

          // Keep only the last 30 days of data
          const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
          this.currentData.chartData[key as keyof typeof this.currentData.chartData] = chartData.filter(
            point => point.timestamp >= thirtyDaysAgo
          )
        }
      }
    })
  }

  private notifySubscribers() {
    this.subscribers.forEach(callback => {
      try {
        callback(this.currentData)
      } catch (error) {
        console.error("Error in dashboard subscriber callback:", error)
      }
    })
  }

  // Public API
  public subscribe(callback: (data: DashboardData) => void): () => void {
    this.subscribers.add(callback)
    
    // Immediately call with current data
    callback(this.currentData)
    
    // Return unsubscribe function
    return () => {
      this.subscribers.delete(callback)
    }
  }

  public getCurrentData(): DashboardData {
    return this.currentData
  }

  public async refreshData(): Promise<DashboardData> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    this.updateMetrics()
    this.updateChartData()
    this.notifySubscribers()
    
    return this.currentData
  }

  public getMetrics(): DashboardMetrics {
    return this.currentData.metrics
  }

  public getRecentEvents(): RealTimeEvent[] {
    return this.currentData.recentEvents
  }

  public getChartData(chartType: keyof DashboardData["chartData"]) {
    return this.currentData.chartData[chartType]
  }

  public getLastUpdated(): Date {
    return this.currentData.lastUpdated
  }

  // Connect to real WebSocket/SSE if available
  public connectToRealTimeSource(url?: string) {
    if (this.eventSource) {
      this.eventSource.close()
    }

    try {
      // In a real implementation, this would connect to your backend
      // this.eventSource = new EventSourcePolyfill(url || '/api/dashboard/stream')
      
      // For now, we'll use the mock implementation
      console.log("Real-time connection established (mock)")
      this.isConnected = true
    } catch (error) {
      console.error("Failed to connect to real-time source:", error)
      this.handleReconnect()
    }
  }

  private handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      setTimeout(() => {
        this.connectToRealTimeSource()
      }, this.reconnectDelay * this.reconnectAttempts)
    }
  }

  public disconnect() {
    if (this.eventSource) {
      this.eventSource.close()
      this.eventSource = null
    }
    this.isConnected = false
    this.subscribers.clear()
  }
}

// Export singleton instance
export const realTimeDashboardService = new RealTimeDashboardService() 