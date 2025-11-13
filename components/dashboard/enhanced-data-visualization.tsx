"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Activity, TrendingUp, TrendingDown } from "lucide-react"
import { AreaChart } from "@/components/dashboard/area-chart"
import { BarChartComponent } from "@/components/dashboard/bar-chart"
import { PieChartContainer, PieChartContent, PieChartItem } from "@/components/ui/pie-chart"
import { useDashboardChartData } from "@/hooks/use-real-time-dashboard"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

interface EnhancedDataVisualizationProps {
  title: string
  description?: string
  chartType: "userGrowth" | "engagement" | "funding" | "connections"
  displayType?: "area" | "bar" | "pie" | "multi"
  className?: string
  showRefresh?: boolean
  showTrend?: boolean
}

export function EnhancedDataVisualization({
  title,
  description,
  chartType,
  displayType = "area",
  className,
  showRefresh = true,
  showTrend = true,
}: EnhancedDataVisualizationProps) {
  const { chartData, loading, error, lastUpdated, refresh } = useDashboardChartData(chartType)
  const [chartDisplayType, setChartDisplayType] = useState(displayType === "multi" ? "area" : displayType)
  const [timeRange, setTimeRange] = useState("30days")
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Handle manual refresh
  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      await refresh()
    } catch (error) {
      console.error("Failed to refresh chart data:", error)
    } finally {
      setIsRefreshing(false)
    }
  }

  // Calculate trend from chart data
  const calculateTrend = () => {
    if (chartData.length < 2) return null
    
    const recent = chartData.slice(-7) // Last 7 data points
    const previous = chartData.slice(-14, -7) // Previous 7 data points
    
    if (previous.length === 0) return null
    
    const recentAvg = recent.reduce((sum, point) => sum + point.value, 0) / recent.length
    const previousAvg = previous.reduce((sum, point) => sum + point.value, 0) / previous.length
    
    if (previousAvg === 0) return null
    
    const change = ((recentAvg - previousAvg) / previousAvg) * 100
    
    return {
      value: Math.abs(change),
      isPositive: change > 0,
    }
  }

  const trend = calculateTrend()

  // Format chart data for different chart types
  const formatChartData = () => {
    if (!chartData || chartData.length === 0) return []

    // For area and bar charts, use time series data
    if (chartDisplayType === "area" || chartDisplayType === "bar") {
      return chartData.map(point => ({
        name: format(point.timestamp, "MMM d"),
        value: point.value,
        timestamp: point.timestamp,
      }))
    }

    // For pie charts, aggregate data by categories
    if (chartDisplayType === "pie") {
      const aggregated = chartData.reduce((acc, point) => {
        const month = format(point.timestamp, "MMM")
        acc[month] = (acc[month] || 0) + point.value
        return acc
      }, {} as Record<string, number>)

      return Object.entries(aggregated).map(([name, value]) => ({
        name,
        value,
      }))
    }

    return []
  }

  // Get chart title based on type
  const getChartTitle = () => {
    switch (chartType) {
      case "userGrowth":
        return "User Growth"
      case "engagement":
        return "Engagement Rate"
      case "funding":
        return "Funding Raised"
      case "connections":
        return "Network Connections"
      default:
        return title
    }
  }

  // Get value formatter based on chart type
  const getValueFormatter = (value: number) => {
    switch (chartType) {
      case "engagement":
        return `${value.toFixed(1)}%`
      case "funding":
        return `$${(value / 1000000).toFixed(1)}M`
      case "userGrowth":
      case "connections":
        if (value >= 1000000) {
          return `${(value / 1000000).toFixed(1)}M`
        }
        if (value >= 1000) {
          return `${(value / 1000).toFixed(1)}K`
        }
        return value.toString()
      default:
        return value.toString()
    }
  }

  const formattedData = formatChartData()

  return (
    <Card className={cn("transition-all duration-300", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <div>
            <CardTitle className="flex items-center gap-2">
              {getChartTitle()}
              {loading && <Activity className="h-4 w-4 animate-pulse text-muted-foreground" />}
            </CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {showTrend && trend && (
            <div className="flex items-center gap-1">
              {trend.isPositive ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              <Badge variant="secondary" className="text-xs">
                {trend.isPositive ? "+" : "-"}{trend.value.toFixed(1)}%
              </Badge>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {displayType === "multi" && (
            <Select value={chartDisplayType} onValueChange={setChartDisplayType}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Chart Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="area">Area Chart</SelectItem>
                <SelectItem value="bar">Bar Chart</SelectItem>
                <SelectItem value="pie">Pie Chart</SelectItem>
              </SelectContent>
            </Select>
          )}
          
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">Last year</SelectItem>
            </SelectContent>
          </Select>
          
          {showRefresh && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing || loading}
              className="h-8 w-8 p-0"
            >
              <RefreshCw className={cn(
                "h-4 w-4",
                (isRefreshing || loading) && "animate-spin"
              )} />
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-6">
        {error && (
          <div className="text-center py-8">
            <p className="text-sm text-red-500 mb-2">Failed to load chart data</p>
            <Button variant="outline" size="sm" onClick={handleRefresh}>
              Try Again
            </Button>
          </div>
        )}

        {loading && formattedData.length === 0 ? (
          <div className="h-[300px] flex items-center justify-center">
            <div className="text-center">
              <Activity className="h-8 w-8 animate-spin text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Loading chart data...</p>
            </div>
          </div>
        ) : formattedData.length === 0 ? (
          <div className="h-[300px] flex items-center justify-center">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">No data available</p>
            </div>
          </div>
        ) : (
          <>
            {chartDisplayType === "area" && (
              <AreaChart
                data={formattedData}
                categories={["value"]}
                index="name"
                colors={["#0F7377"]}
                valueFormatter={getValueFormatter}
                className="h-[300px]"
              />
            )}

            {chartDisplayType === "bar" && (
              <BarChartComponent
                data={formattedData}
                categories={["value"]}
                index="name"
                colors={["#0F7377"]}
                valueFormatter={getValueFormatter}
                className="h-[300px]"
              />
            )}

            {chartDisplayType === "pie" && (
              <div className="h-[300px] w-full">
                <PieChartContainer 
                  data={formattedData} 
                  valueFormatter={getValueFormatter} 
                  className="h-full"
                >
                  {formattedData.map((item: any, index: number) => (
                    <PieChartItem
                      key={item.name}
                      value={item.value}
                      color={`hsl(${index * 40}, 70%, 50%)`}
                      name={item.name}
                    />
                  ))}
                  <PieChartContent />
                </PieChartContainer>
              </div>
            )}
          </>
        )}

        {lastUpdated && (
          <div className="mt-4 pt-3 border-t text-xs text-muted-foreground">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Pre-configured chart components
export function UserGrowthChart() {
  return (
    <EnhancedDataVisualization
      title="User Growth"
      description="Platform user growth over time"
      chartType="userGrowth"
      displayType="area"
    />
  )
}

export function EngagementChart() {
  return (
    <EnhancedDataVisualization
      title="Engagement Rate"
      description="User engagement metrics"
      chartType="engagement"
      displayType="area"
    />
  )
}

export function FundingChart() {
  return (
    <EnhancedDataVisualization
      title="Funding Raised"
      description="Total funding raised over time"
      chartType="funding"
      displayType="area"
    />
  )
}

export function ConnectionsChart() {
  return (
    <EnhancedDataVisualization
      title="Network Connections"
      description="User connection growth"
      chartType="connections"
      displayType="area"
    />
  )
} 