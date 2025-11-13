"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { format, subMonths } from "date-fns"
import type { ProgressMetricType, TeamProgressData } from "@/types/team-progress"

interface TeamProgressChartProps {
  progressData: TeamProgressData
  className?: string
}

export function TeamProgressChart({ progressData, className }: TeamProgressChartProps) {
  const [selectedMetricType, setSelectedMetricType] = useState<ProgressMetricType>("product_development")
  const [timeRange, setTimeRange] = useState<"3m" | "6m" | "1y" | "all">("6m")

  // Get metrics of the selected type
  const relevantMetrics = progressData.metricDefinitions.filter((metric) => metric.type === selectedMetricType)

  // Filter snapshots based on time range
  const getFilteredSnapshots = () => {
    const now = new Date()
    let cutoffDate: Date

    switch (timeRange) {
      case "3m":
        cutoffDate = subMonths(now, 3)
        break
      case "6m":
        cutoffDate = subMonths(now, 6)
        break
      case "1y":
        cutoffDate = subMonths(now, 12)
        break
      default:
        cutoffDate = new Date(0) // Beginning of time
    }

    return progressData.snapshots
      .filter((snapshot) => new Date(snapshot.date) >= cutoffDate)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }

  const filteredSnapshots = getFilteredSnapshots()

  // Prepare chart data
  const chartData = filteredSnapshots.map((snapshot) => {
    const dataPoint: any = {
      date: format(new Date(snapshot.date), "MMM d, yyyy"),
    }

    relevantMetrics.forEach((metric) => {
      if (snapshot.metrics[metric.id]) {
        dataPoint[metric.id] =
          metric.unit === "percentage" ? Number(snapshot.metrics[metric.id].value) : snapshot.metrics[metric.id].value
      }
    })

    return dataPoint
  })

  // Get metric name by ID
  const getMetricName = (metricId: string): string => {
    const metric = progressData.metricDefinitions.find((m) => m.id === metricId)
    return metric ? metric.name : metricId
  }

  // Get metric unit by ID
  const getMetricUnit = (metricId: string): string => {
    const metric = progressData.metricDefinitions.find((m) => m.id === metricId)
    if (!metric) return ""

    switch (metric.unit) {
      case "percentage":
        return "%"
      case "currency":
        return "$"
      case "count":
        return ""
      default:
        return ""
    }
  }

  // Format value based on unit
  const formatValue = (value: number | string, metricId: string): string => {
    const unit = getMetricUnit(metricId)

    if (typeof value === "number") {
      if (unit === "%") {
        return `${value}%`
      } else if (unit === "$") {
        return `$${value.toLocaleString()}`
      } else {
        return value.toLocaleString()
      }
    }

    return String(value)
  }

  // Get chart config for metrics
  const getChartConfig = () => {
    const config: Record<string, { label: string; color: string }> = {}

    relevantMetrics.forEach((metric, index) => {
      // Use a different color for each metric
      const colors = [
        "hsl(var(--chart-1))",
        "hsl(var(--chart-2))",
        "hsl(var(--chart-3))",
        "hsl(var(--chart-4))",
        "hsl(var(--chart-5))",
      ]

      config[metric.id] = {
        label: metric.name,
        color: colors[index % colors.length],
      }
    })

    return config
  }

  // Get metric type label
  const getMetricTypeLabel = (type: ProgressMetricType): string => {
    switch (type) {
      case "team_growth":
        return "Team Growth"
      case "product_development":
        return "Product Development"
      case "market_validation":
        return "Market Validation"
      case "funding":
        return "Funding"
      case "customer_acquisition":
        return "Customer Acquisition"
      case "revenue":
        return "Revenue"
      case "skill_development":
        return "Skill Development"
      case "mentor_engagement":
        return "Mentor Engagement"
      case "investor_interest":
        return "Investor Interest"
      default:
        return type.replace("_", " ")
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>Team Progress Over Time</CardTitle>
          <div className="flex gap-2">
            <Select
              value={selectedMetricType}
              onValueChange={(value) => setSelectedMetricType(value as ProgressMetricType)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select metric type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="team_growth">Team Growth</SelectItem>
                <SelectItem value="product_development">Product Development</SelectItem>
                <SelectItem value="market_validation">Market Validation</SelectItem>
                <SelectItem value="funding">Funding</SelectItem>
                <SelectItem value="customer_acquisition">Customer Acquisition</SelectItem>
                <SelectItem value="revenue">Revenue</SelectItem>
                <SelectItem value="skill_development">Skill Development</SelectItem>
                <SelectItem value="mentor_engagement">Mentor Engagement</SelectItem>
                <SelectItem value="investor_interest">Investor Interest</SelectItem>
              </SelectContent>
            </Select>
            <Select value={timeRange} onValueChange={(value) => setTimeRange(value as "3m" | "6m" | "1y" | "all")}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3m">3 Months</SelectItem>
                <SelectItem value="6m">6 Months</SelectItem>
                <SelectItem value="1y">1 Year</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {chartData.length === 0 ? (
          <div className="flex h-64 items-center justify-center rounded-md border border-dashed">
            <p className="text-muted-foreground">No data available for the selected time range</p>
          </div>
        ) : (
          <ChartContainer config={getChartConfig()} className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                {relevantMetrics.map((metric) => (
                  <Line
                    key={metric.id}
                    type="monotone"
                    dataKey={metric.id}
                    stroke={`var(--color-${metric.id})`}
                    name={metric.name}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
