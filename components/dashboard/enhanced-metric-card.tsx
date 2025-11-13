"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RefreshCw, TrendingUp, TrendingDown, Activity } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { useDashboardMetrics } from "@/hooks/use-real-time-dashboard"
import { cn } from "@/lib/utils"

interface EnhancedMetricCardProps {
  title: string
  metricKey: keyof import("@/lib/real-time-dashboard-service").DashboardMetrics
  description?: string
  icon?: LucideIcon
  formatValue?: (value: number) => string
  showTrend?: boolean
  showRefresh?: boolean
  className?: string
  color?: "default" | "success" | "warning" | "danger"
}

export function EnhancedMetricCard({
  title,
  metricKey,
  description,
  icon: Icon,
  formatValue,
  showTrend = true,
  showRefresh = true,
  className,
  color = "default",
}: EnhancedMetricCardProps) {
  const { metrics, loading, error, lastUpdated, refresh } = useDashboardMetrics()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [previousValue, setPreviousValue] = useState<number | null>(null)

  const currentValue = metrics?.[metricKey] || 0

  // Track previous value for trend calculation
  useEffect(() => {
    if (currentValue !== previousValue && previousValue !== null) {
      setPreviousValue(currentValue)
    } else if (previousValue === null) {
      setPreviousValue(currentValue)
    }
  }, [currentValue, previousValue])

  // Calculate trend
  const calculateTrend = () => {
    if (!previousValue || previousValue === 0) return null
    
    const change = ((currentValue - previousValue) / previousValue) * 100
    return {
      value: Math.abs(change),
      isPositive: change > 0,
    }
  }

  const trend = calculateTrend()

  // Format value
  const formatDisplayValue = (value: number) => {
    if (formatValue) {
      return formatValue(value)
    }

    // Default formatting based on metric type
    if (metricKey.includes("Rate")) {
      return `${value.toFixed(1)}%`
    }
    if (metricKey.includes("Funding")) {
      return `$${(value / 1000000).toFixed(1)}M`
    }
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`
    }
    return value.toString()
  }

  // Handle manual refresh
  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      await refresh()
    } catch (error) {
      console.error("Failed to refresh metric:", error)
    } finally {
      setIsRefreshing(false)
    }
  }

  // Color variants
  const colorVariants = {
    default: "border-slate-200",
    success: "border-green-200 bg-green-50/50",
    warning: "border-yellow-200 bg-yellow-50/50",
    danger: "border-red-200 bg-red-50/50",
  }

  const trendColorVariants = {
    default: "text-slate-600",
    success: "text-green-600",
    warning: "text-yellow-600",
    danger: "text-red-600",
  }

  return (
    <Card className={cn(
      "transition-all duration-300 hover:shadow-sm",
      colorVariants[color],
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <CardTitle className="text-sm font-medium text-growthlab-gray">{title}</CardTitle>
          {loading && <Activity className="h-3 w-3 animate-pulse text-muted-foreground" />}
        </div>
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
          {showRefresh && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing || loading}
              className="h-6 w-6 p-0"
            >
              <RefreshCw className={cn(
                "h-3 w-3",
                (isRefreshing || loading) && "animate-spin"
              )} />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="text-2xl font-bold text-growthlab-slate">
              {loading ? (
                <div className="h-8 w-20 animate-pulse bg-muted rounded" />
              ) : error ? (
                <span className="text-red-500">Error</span>
              ) : (
                formatDisplayValue(currentValue)
              )}
            </div>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          
          {showTrend && trend && (
            <div className="flex items-center gap-1">
              {trend.isPositive ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              <span className={cn(
                "text-xs font-medium",
                trend.isPositive ? "text-green-600" : "text-red-600"
              )}>
                {trend.value.toFixed(1)}%
              </span>
            </div>
          )}
        </div>

        {lastUpdated && (
          <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
            {error && (
              <Badge variant="destructive" className="text-xs">
                Error
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Pre-configured metric cards for common use cases
export function UserMetricCard() {
  return (
    <EnhancedMetricCard
      title="Total Users"
      metricKey="totalUsers"
      description="Registered users on the platform"
      color="success"
    />
  )
}

export function ActiveUsersMetricCard() {
  return (
    <EnhancedMetricCard
      title="Active Users"
      metricKey="activeUsers"
      description="Users active in the last 24 hours"
      color="default"
    />
  )
}

export function EngagementMetricCard() {
  return (
    <EnhancedMetricCard
      title="Engagement Rate"
      metricKey="engagementRate"
      description="Average user engagement"
      color="success"
    />
  )
}

export function GrowthMetricCard() {
  return (
    <EnhancedMetricCard
      title="Growth Rate"
      metricKey="growthRate"
      description="Monthly user growth"
      color="success"
    />
  )
}

export function FundingMetricCard() {
  return (
    <EnhancedMetricCard
      title="Total Funding"
      metricKey="totalFunding"
      description="Total funding raised"
      color="success"
      formatValue={(value) => `$${(value / 1000000).toFixed(1)}M`}
    />
  )
}

export function ConversionMetricCard() {
  return (
    <EnhancedMetricCard
      title="Conversion Rate"
      metricKey="conversionRate"
      description="Lead to user conversion"
      color="warning"
    />
  )
} 