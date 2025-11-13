// Define analytics data types
export type AnalyticsTimeframe = "day" | "week" | "month" | "quarter" | "year" | "all"

export type AnalyticsMetricType =
  | "users"
  | "startups"
  | "investors"
  | "mentors"
  | "events"
  | "funding"
  | "sessions"
  | "pageviews"
  | "engagement"
  | "retention"
  | "conversion"
  | "revenue"

export type AnalyticsDimension =
  | "date"
  | "user_type"
  | "location"
  | "device"
  | "referrer"
  | "industry"
  | "funding_stage"
  | "event_type"
  | "program_type"

// Define analytics data interfaces
export interface AnalyticsMetric {
  id: string
  name: string
  value: number
  previousValue?: number
  change?: number
  changePercentage?: number
  trend?: "up" | "down" | "stable"
  format?: "number" | "currency" | "percentage" | "duration"
  currency?: string
}

export interface AnalyticsChartData {
  id: string
  name: string
  data: Array<{ date: string; [key: string]: number | string }>
  categories: string[]
  type: "line" | "bar" | "area" | "pie" | "donut"
}

export interface AnalyticsTableData {
  id: string
  name: string
  columns: Array<{ id: string; name: string; format?: "number" | "currency" | "percentage" | "date" }>
  rows: Array<Record<string, any>>
}

export interface AnalyticsDashboard {
  id: string
  name: string
  description?: string
  metrics: AnalyticsMetric[]
  charts: AnalyticsChartData[]
  tables: AnalyticsTableData[]
}

export interface AnalyticsFilter {
  id: string
  name: string
  type: "select" | "multiselect" | "date" | "daterange"
  options?: Array<{ id: string; name: string }>
  value?: any
}

// Analytics service class
export class AnalyticsService {
  /**
   * Get analytics dashboard data
   * @param dashboardId Dashboard ID
   * @param timeframe Timeframe
   * @param filters Filters
   * @returns Promise<AnalyticsDashboard> Dashboard data
   */
  static async getDashboard(
    dashboardId: string,
    timeframe: AnalyticsTimeframe = "month",
    filters: Record<string, any> = {},
  ): Promise<AnalyticsDashboard> {
    try {
      // In a real app, this would call an API to get dashboard data

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Generate dashboard data based on dashboard ID
      switch (dashboardId) {
        case "platform_overview":
          return this.getPlatformOverviewDashboard(timeframe, filters)
        case "startup_metrics":
          return this.getStartupMetricsDashboard(timeframe, filters)
        case "investor_insights":
          return this.getInvestorInsightsDashboard(timeframe, filters)
        case "event_analytics":
          return this.getEventAnalyticsDashboard(timeframe, filters)
        case "funding_analytics":
          return this.getFundingAnalyticsDashboard(timeframe, filters)
        default:
          return this.getPlatformOverviewDashboard(timeframe, filters)
      }
    } catch (error) {
      console.error("Failed to get analytics dashboard:", error)
      throw error
    }
  }

  /**
   * Get available analytics dashboards
   * @returns Promise<Array<{ id: string; name: string; description?: string }>> Dashboards
   */
  static async getAvailableDashboards(): Promise<Array<{ id: string; name: string; description?: string }>> {
    try {
      // In a real app, this would call an API to get available dashboards

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Return mock dashboards
      return [
        {
          id: "platform_overview",
          name: "Platform Overview",
          description: "Key metrics and trends across the GrowthLab platform",
        },
        {
          id: "startup_metrics",
          name: "Startup Metrics",
          description: "Detailed analytics on startup performance and growth",
        },
        {
          id: "investor_insights",
          name: "Investor Insights",
          description: "Investment trends and investor activity analysis",
        },
        {
          id: "event_analytics",
          name: "Event Analytics",
          description: "Attendance, engagement, and feedback for events",
        },
        {
          id: "funding_analytics",
          name: "Funding Analytics",
          description: "Funding rounds, investments, and capital flow analysis",
        },
      ]
    } catch (error) {
      console.error("Failed to get available dashboards:", error)
      return []
    }
  }

  /**
   * Get available analytics filters
   * @param dashboardId Dashboard ID
   * @returns Promise<AnalyticsFilter[]> Filters
   */
  static async getAvailableFilters(dashboardId: string): Promise<AnalyticsFilter[]> {
    try {
      // In a real app, this would call an API to get available filters

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Return mock filters
      return [
        {
          id: "timeframe",
          name: "Timeframe",
          type: "select",
          options: [
            { id: "day", name: "Last 24 hours" },
            { id: "week", name: "Last 7 days" },
            { id: "month", name: "Last 30 days" },
            { id: "quarter", name: "Last 90 days" },
            { id: "year", name: "Last 12 months" },
            { id: "all", name: "All time" },
          ],
          value: "month",
        },
        {
          id: "user_type",
          name: "User Type",
          type: "multiselect",
          options: [
            { id: "startup", name: "Startup" },
            { id: "investor", name: "Investor" },
            { id: "mentor", name: "Mentor" },
            { id: "corporate", name: "Corporate" },
            { id: "government", name: "Government" },
          ],
        },
        {
          id: "industry",
          name: "Industry",
          type: "multiselect",
          options: [
            { id: "fintech", name: "Fintech" },
            { id: "healthtech", name: "Healthtech" },
            { id: "edtech", name: "Edtech" },
            { id: "ecommerce", name: "E-commerce" },
            { id: "saas", name: "SaaS" },
            { id: "ai", name: "AI/ML" },
            { id: "blockchain", name: "Blockchain" },
            { id: "cleantech", name: "Cleantech" },
          ],
        },
        {
          id: "date_range",
          name: "Custom Date Range",
          type: "daterange",
        },
      ]
    } catch (error) {
      console.error("Failed to get available filters:", error)
      return []
    }
  }

  /**
   * Export analytics data
   * @param dashboardId Dashboard ID
   * @param format Export format (csv, excel, pdf)
   * @param timeframe Timeframe
   * @param filters Filters
   * @returns Promise<string> Export URL
   */
  static async exportData(
    dashboardId: string,
    format: "csv" | "excel" | "pdf",
    timeframe: AnalyticsTimeframe = "month",
    filters: Record<string, any> = {},
  ): Promise<string> {
    try {
      // In a real app, this would call an API to export data

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Return mock export URL
      return `https://api.growthlab.sg/analytics/export/${dashboardId}?format=${format}&timeframe=${timeframe}`
    } catch (error) {
      console.error("Failed to export analytics data:", error)
      throw error
    }
  }

  /**
   * Track analytics event
   * @param eventName Event name
   * @param properties Event properties
   */
  static async trackEvent(eventName: string, properties: Record<string, any> = {}): Promise<void> {
    try {
      // In a real app, this would call an API to track an event
      console.log(`Tracking event: ${eventName}`, properties)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 200))
    } catch (error) {
      console.error("Failed to track event:", error)
    }
  }

  /**
   * Generate platform overview dashboard
   * @param timeframe Timeframe
   * @param filters Filters
   * @returns AnalyticsDashboard Dashboard data
   */
  private static getPlatformOverviewDashboard(
    timeframe: AnalyticsTimeframe,
    filters: Record<string, any>,
  ): AnalyticsDashboard {
    // Generate metrics
    const metrics: AnalyticsMetric[] = [
      {
        id: "total_users",
        name: "Total Users",
        value: 5842,
        previousValue: 5210,
        change: 632,
        changePercentage: 12.1,
        trend: "up",
        format: "number",
      },
      {
        id: "active_users",
        name: "Active Users",
        value: 3218,
        previousValue: 2950,
        change: 268,
        changePercentage: 9.1,
        trend: "up",
        format: "number",
      },
      {
        id: "total_startups",
        name: "Total Startups",
        value: 428,
        previousValue: 392,
        change: 36,
        changePercentage: 9.2,
        trend: "up",
        format: "number",
      },
      {
        id: "total_investors",
        name: "Total Investors",
        value: 156,
        previousValue: 142,
        change: 14,
        changePercentage: 9.9,
        trend: "up",
        format: "number",
      },
      {
        id: "total_mentors",
        name: "Total Mentors",
        value: 89,
        previousValue: 78,
        change: 11,
        changePercentage: 14.1,
        trend: "up",
        format: "number",
      },
      {
        id: "total_events",
        name: "Total Events",
        value: 124,
        previousValue: 112,
        change: 12,
        changePercentage: 10.7,
        trend: "up",
        format: "number",
      },
      {
        id: "total_funding",
        name: "Total Funding",
        value: 28500000,
        previousValue: 24200000,
        change: 4300000,
        changePercentage: 17.8,
        trend: "up",
        format: "currency",
        currency: "SGD",
      },
      {
        id: "avg_engagement",
        name: "Avg. Engagement",
        value: 42.5,
        previousValue: 38.2,
        change: 4.3,
        changePercentage: 11.3,
        trend: "up",
        format: "percentage",
      },
    ]

    // Generate charts
    const charts: AnalyticsChartData[] = [
      {
        id: "user_growth",
        name: "User Growth",
        data: [
          { date: "2023-01", users: 4200 },
          { date: "2023-02", users: 4350 },
          { date: "2023-03", users: 4500 },
          { date: "2023-04", users: 4680 },
          { date: "2023-05", users: 4820 },
          { date: "2023-06", users: 4950 },
          { date: "2023-07", users: 5100 },
          { date: "2023-08", users: 5210 },
          { date: "2023-09", users: 5380 },
          { date: "2023-10", users: 5520 },
          { date: "2023-11", users: 5680 },
          { date: "2023-12", users: 5842 },
        ],
        categories: ["users"],
        type: "area",
      },
      {
        id: "user_types",
        name: "User Types",
        data: [
          { date: "2023-12", name: "Startups", value: 428 },
          { date: "2023-12", name: "Investors", value: 156 },
          { date: "2023-12", name: "Mentors", value: 89 },
          { date: "2023-12", name: "Corporates", value: 42 },
          { date: "2023-12", name: "Government", value: 18 },
          { date: "2023-12", name: "Others", value: 67 },
        ],
        categories: ["value"],
        type: "pie",
      },
      {
        id: "event_attendance",
        name: "Event Attendance",
        data: [
          { date: "2023-01", attendance: 320 },
          { date: "2023-02", attendance: 380 },
          { date: "2023-03", attendance: 420 },
          { date: "2023-04", attendance: 390 },
          { date: "2023-05", attendance: 450 },
          { date: "2023-06", attendance: 520 },
          { date: "2023-07", attendance: 480 },
          { date: "2023-08", attendance: 510 },
          { date: "2023-09", attendance: 550 },
          { date: "2023-10", attendance: 620 },
          { date: "2023-11", attendance: 580 },
          { date: "2023-12", attendance: 650 },
        ],
        categories: ["attendance"],
        type: "bar",
      },
      {
        id: "funding_rounds",
        name: "Funding Rounds",
        data: [
          { date: "2023-01", seed: 3, seriesA: 1, seriesB: 0 },
          { date: "2023-02", seed: 2, seriesA: 0, seriesB: 1 },
          { date: "2023-03", seed: 4, seriesA: 2, seriesB: 0 },
          { date: "2023-04", seed: 3, seriesA: 1, seriesB: 0 },
          { date: "2023-05", seed: 5, seriesA: 0, seriesB: 1 },
          { date: "2023-06", seed: 4, seriesA: 2, seriesB: 0 },
          { date: "2023-07", seed: 6, seriesA: 1, seriesB: 1 },
          { date: "2023-08", seed: 3, seriesA: 2, seriesB: 0 },
          { date: "2023-09", seed: 5, seriesA: 1, seriesB: 1 },
          { date: "2023-10", seed: 4, seriesA: 3, seriesB: 0 },
          { date: "2023-11", seed: 6, seriesA: 2, seriesB: 1 },
          { date: "2023-12", seed: 5, seriesA: 2, seriesB: 2 },
        ],
        categories: ["seed", "seriesA", "seriesB"],
        type: "bar",
      },
    ]

    // Generate tables
    const tables: AnalyticsTableData[] = [
      {
        id: "top_startups",
        name: "Top Startups by Engagement",
        columns: [
          { id: "rank", name: "Rank" },
          { id: "name", name: "Startup Name" },
          { id: "industry", name: "Industry" },
          { id: "engagement", name: "Engagement Score", format: "percentage" },
          { id: "growth", name: "Growth", format: "percentage" },
        ],
        rows: [
          { rank: 1, name: "FinTech Flow", industry: "Fintech", engagement: 92.4, growth: 15.2 },
          { rank: 2, name: "MediHealth AI", industry: "Healthtech", engagement: 88.7, growth: 12.8 },
          { rank: 3, name: "EduSmart", industry: "Edtech", engagement: 86.5, growth: 18.3 },
          { rank: 4, name: "GreenPath Logistics", industry: "Cleantech", engagement: 84.2, growth: 21.5 },
          { rank: 5, name: "BlockSecure", industry: "Blockchain", engagement: 82.8, growth: 16.7 },
        ],
      },
      {
        id: "recent_funding",
        name: "Recent Funding Rounds",
        columns: [
          { id: "date", name: "Date", format: "date" },
          { id: "startup", name: "Startup" },
          { id: "round", name: "Round" },
          { id: "amount", name: "Amount", format: "currency" },
          { id: "investors", name: "Lead Investors" },
        ],
        rows: [
          {
            date: "2023-12-15",
            startup: "FinTech Flow",
            round: "Series A",
            amount: 5000000,
            investors: "SG Ventures, Asia Growth Fund",
          },
          {
            date: "2023-12-08",
            startup: "GreenPath Logistics",
            round: "Seed",
            amount: 1200000,
            investors: "EcoInvest, Green Future Capital",
          },
          {
            date: "2023-11-30",
            startup: "MediHealth AI",
            round: "Series B",
            amount: 12000000,
            investors: "HealthTech Partners, Global Innovation Fund",
          },
          {
            date: "2023-11-22",
            startup: "BlockSecure",
            round: "Seed",
            amount: 800000,
            investors: "Crypto Ventures, SG Angels",
          },
          {
            date: "2023-11-15",
            startup: "EduSmart",
            round: "Series A",
            amount: 4500000,
            investors: "Education First Fund, Tech Innovators",
          },
        ],
      },
    ]

    return {
      id: "platform_overview",
      name: "Platform Overview",
      description: "Key metrics and trends across the GrowthLab platform",
      metrics,
      charts,
      tables,
    }
  }

  /**
   * Generate startup metrics dashboard
   * @param timeframe Timeframe
   * @param filters Filters
   * @returns AnalyticsDashboard Dashboard data
   */
  private static getStartupMetricsDashboard(
    timeframe: AnalyticsTimeframe,
    filters: Record<string, any>,
  ): AnalyticsDashboard {
    // Implementation similar to platform overview dashboard
    // This would be a complete implementation in a real app
    return {
      id: "startup_metrics",
      name: "Startup Metrics",
      description: "Detailed analytics on startup performance and growth",
      metrics: [],
      charts: [],
      tables: [],
    }
  }

  /**
   * Generate investor insights dashboard
   * @param timeframe Timeframe
   * @param filters Filters
   * @returns AnalyticsDashboard Dashboard data
   */
  private static getInvestorInsightsDashboard(
    timeframe: AnalyticsTimeframe,
    filters: Record<string, any>,
  ): AnalyticsDashboard {
    // Implementation similar to platform overview dashboard
    // This would be a complete implementation in a real app
    return {
      id: "investor_insights",
      name: "Investor Insights",
      description: "Investment trends and investor activity analysis",
      metrics: [],
      charts: [],
      tables: [],
    }
  }

  /**
   * Generate event analytics dashboard
   * @param timeframe Timeframe
   * @param filters Filters
   * @returns AnalyticsDashboard Dashboard data
   */
  private static getEventAnalyticsDashboard(
    timeframe: AnalyticsTimeframe,
    filters: Record<string, any>,
  ): AnalyticsDashboard {
    // Implementation similar to platform overview dashboard
    // This would be a complete implementation in a real app
    return {
      id: "event_analytics",
      name: "Event Analytics",
      description: "Attendance, engagement, and feedback for events",
      metrics: [],
      charts: [],
      tables: [],
    }
  }

  /**
   * Generate funding analytics dashboard
   * @param timeframe Timeframe
   * @param filters Filters
   * @returns AnalyticsDashboard Dashboard data
   */
  private static getFundingAnalyticsDashboard(
    timeframe: AnalyticsTimeframe,
    filters: Record<string, any>,
  ): AnalyticsDashboard {
    // Implementation similar to platform overview dashboard
    // This would be a complete implementation in a real app
    return {
      id: "funding_analytics",
      name: "Funding Analytics",
      description: "Funding rounds, investments, and capital flow analysis",
      metrics: [],
      charts: [],
      tables: [],
    }
  }
}
