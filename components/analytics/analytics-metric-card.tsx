"use client"
import { ArrowDown, ArrowUp, Minus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import type { AnalyticsMetric } from "@/lib/analytics-service"

interface AnalyticsMetricCardProps {
  metric: AnalyticsMetric
  className?: string
}

export function AnalyticsMetricCard({ metric, className }: AnalyticsMetricCardProps) {
  const { formatCurrency } = useLanguage()

  // Format value based on metric format
  const formatValue = (value: number, format?: string, currency?: string) => {
    switch (format) {
      case "currency":
        return formatCurrency(value, currency || "SGD")
      case "percentage":
        return `${value.toFixed(1)}%`
      case "duration":
        return `${value.toFixed(1)} min`
      default:
        return value.toLocaleString()
    }
  }

  // Get trend indicator
  const getTrendIndicator = () => {
    if (!metric.trend || metric.trend === "stable") {
      return <Minus className="h-4 w-4 text-muted-foreground" />
    }

    if (metric.trend === "up") {
      return <ArrowUp className="h-4 w-4 text-green-500" />
    }

    return <ArrowDown className="h-4 w-4 text-red-500" />
  }

  // Get trend color
  const getTrendColor = () => {
    if (!metric.trend || metric.trend === "stable") {
      return "text-muted-foreground"
    }

    if (metric.trend === "up") {
      return "text-green-500"
    }

    return "text-red-500"
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatValue(metric.value, metric.format, metric.currency)}</div>

        {metric.changePercentage !== undefined && (
          <p className="flex items-center gap-1 mt-1 text-xs">
            <span className="flex items-center gap-0.5">
              {getTrendIndicator()}
              <span className={getTrendColor()}>
                {metric.changePercentage > 0 ? "+" : ""}
                {metric.changePercentage.toFixed(1)}%
              </span>
            </span>
            <span className="text-muted-foreground">from previous period</span>
          </p>
        )}
      </CardContent>
    </Card>
  )
}
