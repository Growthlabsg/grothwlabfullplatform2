// Types for analytics events
export interface AnalyticsEvent {
  eventType: string
  userId: string
  timestamp: Date
  properties: Record<string, any>
}

export interface AnalyticsTimeSeriesData {
  timestamp: string
  value: number
}

export interface AnalyticsMetric {
  name: string
  value: number
  changePercentage?: number
}

export interface AnalyticsReport {
  metrics: AnalyticsMetric[]
  timeSeriesData?: {
    activeUsers?: AnalyticsTimeSeriesData[]
    pageViews?: AnalyticsTimeSeriesData[]
    postViews?: AnalyticsTimeSeriesData[]
    postEngagements?: AnalyticsTimeSeriesData[]
  }
}

// Mock analytics storage
const analyticsEvents: AnalyticsEvent[] = []

// Function to track an event
export function trackEvent(event: AnalyticsEvent): void {
  analyticsEvents.push(event)

  // In a real app, this would send the event to an analytics service
  console.log(`[Analytics] Tracked event: ${event.eventType}`, event)
}

// Function to get events by type
export function getEventsByType(eventType: string): AnalyticsEvent[] {
  return analyticsEvents.filter((event) => event.eventType === eventType)
}

// Function to get events by user
export function getEventsByUser(userId: string): AnalyticsEvent[] {
  return analyticsEvents.filter((event) => event.userId === userId)
}

// Function to get events in a date range
export function getEventsByDateRange(startDate: Date, endDate: Date): AnalyticsEvent[] {
  return analyticsEvents.filter((event) => event.timestamp >= startDate && event.timestamp <= endDate)
}

// Function to get event count by type
export function getEventCountByType(eventType: string): number {
  return getEventsByType(eventType).length
}

// Function to get unique users by event type
export function getUniqueUsersByEventType(eventType: string): string[] {
  const events = getEventsByType(eventType)
  const userIds = events.map((event) => event.userId)
  return [...new Set(userIds)]
}

// Function to get event count by property value
export function getEventCountByProperty(eventType: string, propertyName: string, propertyValue: any): number {
  return analyticsEvents.filter(
    (event) => event.eventType === eventType && event.properties[propertyName] === propertyValue,
  ).length
}

// Function to get top property values by count
export function getTopPropertyValues(
  eventType: string,
  propertyName: string,
  limit = 10,
): Array<{ value: any; count: number }> {
  const events = getEventsByType(eventType)
  const valueMap = new Map<any, number>()

  events.forEach((event) => {
    const value = event.properties[propertyName]
    if (value !== undefined) {
      valueMap.set(value, (valueMap.get(value) || 0) + 1)
    }
  })

  return Array.from(valueMap.entries())
    .map(([value, count]) => ({ value, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
}

// Function to get real-time analytics
export function getRealTimeAnalytics(): AnalyticsReport {
  // In a real app, this would fetch from an analytics service
  // For now, we'll return mock data

  // Generate time series data for the last 24 hours
  const now = new Date()
  const timeSeriesData = {
    activeUsers: Array.from({ length: 24 }, (_, i) => {
      const timestamp = new Date(now)
      timestamp.setHours(now.getHours() - 23 + i)
      return {
        timestamp: timestamp.toISOString(),
        value: Math.floor(Math.random() * 100) + 50,
      }
    }),
    pageViews: Array.from({ length: 24 }, (_, i) => {
      const timestamp = new Date(now)
      timestamp.setHours(now.getHours() - 23 + i)
      return {
        timestamp: timestamp.toISOString(),
        value: Math.floor(Math.random() * 500) + 200,
      }
    }),
    postViews: Array.from({ length: 24 }, (_, i) => {
      const timestamp = new Date(now)
      timestamp.setHours(now.getHours() - 23 + i)
      return {
        timestamp: timestamp.toISOString(),
        value: Math.floor(Math.random() * 300) + 100,
      }
    }),
    postEngagements: Array.from({ length: 24 }, (_, i) => {
      const timestamp = new Date(now)
      timestamp.setHours(now.getHours() - 23 + i)
      return {
        timestamp: timestamp.toISOString(),
        value: Math.floor(Math.random() * 150) + 50,
      }
    }),
  }

  return {
    metrics: [
      {
        name: "activeUsers",
        value: 1245,
        changePercentage: 5.2,
      },
      {
        name: "pageViews",
        value: 8732,
        changePercentage: 3.7,
      },
      {
        name: "postViews",
        value: 4521,
        changePercentage: 7.1,
      },
      {
        name: "postEngagements",
        value: 2134,
        changePercentage: -2.3,
      },
      {
        name: "newUsers",
        value: 342,
        changePercentage: 12.5,
      },
      {
        name: "contentCreated",
        value: 187,
        changePercentage: 4.2,
      },
    ],
    timeSeriesData,
  }
}
