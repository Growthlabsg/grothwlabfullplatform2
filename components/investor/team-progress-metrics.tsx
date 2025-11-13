"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertTriangle,
  ArrowUpRight,
  Calendar,
  Check,
  Clock,
  Flag,
  HelpCircle,
  Milestone,
  Target,
  TrendingDown,
  TrendingUp,
  X,
} from "lucide-react"
import { format } from "date-fns"
import type { ProgressMetricDefinition, TeamProgressData } from "@/types/team-progress"

interface TeamProgressMetricsProps {
  progressData: TeamProgressData
  className?: string
}

export function TeamProgressMetrics({ progressData, className }: TeamProgressMetricsProps) {
  const [activeTab, setActiveTab] = useState<"key_metrics" | "milestones">("key_metrics")

  // Get the latest snapshot
  const latestSnapshot =
    progressData.snapshots.length > 0
      ? progressData.snapshots.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]
      : null

  // Get the previous snapshot (for trend calculation)
  const previousSnapshot =
    progressData.snapshots.length > 1
      ? progressData.snapshots.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[1]
      : null

  // Get key metrics
  const keyMetrics = progressData.metricDefinitions.filter((metric) => metric.isKey)

  // Calculate trend for a metric
  const calculateTrend = (metricId: string): "up" | "down" | "neutral" => {
    if (!latestSnapshot || !previousSnapshot) return "neutral"

    const latest = latestSnapshot.metrics[metricId]?.value
    const previous = previousSnapshot.metrics[metricId]?.value

    if (latest === undefined || previous === undefined) return "neutral"

    if (typeof latest === "number" && typeof previous === "number") {
      if (latest > previous) return "up"
      if (latest < previous) return "down"
    }

    return "neutral"
  }

  // Format metric value
  const formatMetricValue = (value: any, metric: ProgressMetricDefinition): string => {
    if (value === undefined) return "N/A"

    switch (metric.unit) {
      case "percentage":
        return `${value}%`
      case "currency":
        return `$${Number(value).toLocaleString()}`
      case "count":
        return Number(value).toLocaleString()
      case "boolean":
        return value ? "Yes" : "No"
      case "rating":
        return `${value}/10`
      case "milestone":
        return String(value)
      default:
        return String(value)
    }
  }

  // Calculate progress percentage for a metric
  const calculateProgress = (metric: ProgressMetricDefinition): number => {
    if (!latestSnapshot || !metric.targetValue) return 0

    const latest = latestSnapshot.metrics[metric.id]?.value

    if (latest === undefined) return 0

    if (typeof latest === "number" && typeof metric.targetValue === "number") {
      return Math.min(100, (latest / metric.targetValue) * 100)
    }

    return 0
  }

  // Get trend icon
  const getTrendIcon = (trend: "up" | "down" | "neutral") => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <ArrowUpRight className="h-4 w-4 text-gray-400" />
    }
  }

  // Get milestone status badge
  const getMilestoneStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case "in_progress":
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
      case "delayed":
        return <Badge className="bg-amber-100 text-amber-800">Delayed</Badge>
      case "not_started":
        return <Badge className="bg-gray-100 text-gray-800">Not Started</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>
    }
  }

  // Get milestone status icon
  const getMilestoneStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <Check className="h-5 w-5 text-green-500" />
      case "in_progress":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "delayed":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
      case "not_started":
        return <X className="h-5 w-5 text-gray-400" />
      default:
        return <HelpCircle className="h-5 w-5 text-gray-400" />
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>Team Progress Metrics</CardTitle>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "key_metrics" | "milestones")}>
            <TabsList>
              <TabsTrigger value="key_metrics">Key Metrics</TabsTrigger>
              <TabsTrigger value="milestones">Milestones</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <TabsContent value="key_metrics" className="mt-0">
          {keyMetrics.length === 0 ? (
            <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
              <p className="text-muted-foreground">No key metrics defined</p>
            </div>
          ) : (
            <div className="space-y-4">
              {keyMetrics.map((metric) => {
                const latestValue = latestSnapshot?.metrics[metric.id]?.value
                const trend = calculateTrend(metric.id)
                const progress = calculateProgress(metric)

                return (
                  <div key={metric.id} className="rounded-lg border p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-[#0F7377]" />
                        <h3 className="font-medium">{metric.name}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        {getTrendIcon(trend)}
                        <span
                          className={`text-sm ${trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : ""}`}
                        >
                          {latestValue !== undefined ? formatMetricValue(latestValue, metric) : "N/A"}
                        </span>
                      </div>
                    </div>

                    {metric.targetValue && (
                      <div className="mt-2">
                        <div className="mb-1 flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Progress to target</span>
                          <span className="font-medium">
                            {formatMetricValue(latestValue, metric)} / {formatMetricValue(metric.targetValue, metric)}
                          </span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>
                    )}

                    <p className="mt-2 text-xs text-muted-foreground">{metric.description}</p>

                    {metric.targetDate && (
                      <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>Target date: {format(new Date(metric.targetDate), "MMM d, yyyy")}</span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="milestones" className="mt-0">
          {progressData.milestones.length === 0 ? (
            <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
              <p className="text-muted-foreground">No milestones defined</p>
            </div>
          ) : (
            <div className="space-y-4">
              {progressData.milestones
                .sort((a, b) => {
                  // Sort by status (not started, in progress, delayed, completed)
                  const statusOrder = {
                    in_progress: 0,
                    delayed: 1,
                    not_started: 2,
                    completed: 3,
                  }

                  const statusA = statusOrder[a.status as keyof typeof statusOrder] || 4
                  const statusB = statusOrder[b.status as keyof typeof statusOrder] || 4

                  if (statusA !== statusB) return statusA - statusB

                  // Then sort by due date
                  if (a.dueDate && b.dueDate) {
                    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
                  }

                  return 0
                })
                .map((milestone) => (
                  <div key={milestone.id} className="rounded-lg border p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Milestone className="h-4 w-4 text-[#0F7377]" />
                        <h3 className="font-medium">{milestone.title}</h3>
                      </div>
                      {getMilestoneStatusBadge(milestone.status)}
                    </div>

                    {milestone.description && <p className="mt-2 text-sm text-[#334155]">{milestone.description}</p>}

                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
                      {milestone.dueDate && (
                        <div className="flex items-center gap-1">
                          <Flag className="h-3 w-3" />
                          <span>Due: {format(new Date(milestone.dueDate), "MMM d, yyyy")}</span>
                        </div>
                      )}

                      {milestone.completedDate && (
                        <div className="flex items-center gap-1">
                          <Check className="h-3 w-3 text-green-500" />
                          <span>Completed: {format(new Date(milestone.completedDate), "MMM d, yyyy")}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </TabsContent>
      </CardContent>
    </Card>
  )
}
