"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import type { TeamWithProgress } from "@/types/team-progress"
import { Skeleton } from "@/components/ui/skeleton"

interface TeamProgressCardProps {
  teams: TeamWithProgress[]
  isLoading?: boolean
  className?: string
}

export function TeamProgressCard({ teams, isLoading = false, className }: TeamProgressCardProps) {
  // Get teams with progress data
  // const teamsWithProgress = teams.filter((team) => team.progressData)

  // Get stage label
  const getStageLabel = (stage: string): string => {
    switch (stage) {
      case "ideation":
        return "Ideation"
      case "mvp":
        return "MVP"
      case "validation":
        return "Validation"
      case "scaling":
        return "Scaling"
      default:
        return stage
    }
  }

  // Get stage color
  const getStageColor = (stage: string): string => {
    switch (stage) {
      case "ideation":
        return "bg-blue-100 text-blue-800"
      case "mvp":
        return "bg-purple-100 text-purple-800"
      case "validation":
        return "bg-amber-100 text-amber-800"
      case "scaling":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Get latest snapshot for a team
  const getLatestSnapshot = (team: TeamWithProgress) => {
    if (!team.progressData || team.progressData.snapshots.length === 0) return null

    return team.progressData.snapshots.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]
  }

  // Get key metrics for a team
  const getKeyMetrics = (team: TeamWithProgress) => {
    if (!team.progressData) return []

    return team.progressData.metricDefinitions.filter((metric) => metric.isKey)
  }

  // Get metric value from latest snapshot
  const getMetricValue = (team: TeamWithProgress, metricId: string) => {
    const latestSnapshot = getLatestSnapshot(team)
    if (!latestSnapshot) return null

    return latestSnapshot.metrics[metricId]?.value
  }

  // Format metric value
  const formatMetricValue = (value: any, unit: string): string => {
    if (value === undefined || value === null) return "N/A"

    switch (unit) {
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
  const calculateProgress = (team: TeamWithProgress, metricId: string): number => {
    if (!team.progressData) return 0

    const metric = team.progressData.metricDefinitions.find((m) => m.id === metricId)
    if (!metric || !metric.targetValue) return 0

    const value = getMetricValue(team, metricId)
    if (value === null || value === undefined) return 0

    if (typeof value === "number" && typeof metric.targetValue === "number") {
      return Math.min(100, (value / metric.targetValue) * 100)
    }

    return 0
  }

  // Get upcoming milestones for a team
  const getUpcomingMilestones = (team: TeamWithProgress) => {
    if (!team.progressData) return []

    return team.progressData.milestones
      .filter((milestone) => milestone.status !== "completed")
      .sort((a, b) => {
        if (!a.dueDate) return 1
        if (!b.dueDate) return -1
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      })
      .slice(0, 2)
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Team Progress Tracking</CardTitle>
        <CardDescription>Monitor the progress of founding teams</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading ? (
            <>
              <Skeleton className="h-20 w-full rounded-md" />
              <Skeleton className="h-20 w-full rounded-md" />
            </>
          ) : (
            teams.map((team) => {
              const latestSnapshot = team.progressData.snapshots[team.progressData.snapshots.length - 1]
              const productCompletion = latestSnapshot.metrics.product_completion?.value || 0
              const pilotCustomers = latestSnapshot.metrics.pilot_customers?.value || 0

              return (
                <div key={team.id} className="rounded-md border p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-medium">{team.founders.map((f) => f.name).join(" & ")}</h3>
                    <span className="text-xs text-muted-foreground">{team.industry}</span>
                  </div>
                  <p className="mb-3 text-sm text-muted-foreground line-clamp-2">{team.idea}</p>
                  <div className="mb-2 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Product: </span>
                      <span className="font-medium">{productCompletion}%</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Customers: </span>
                      <span className="font-medium">{pilotCustomers}</span>
                    </div>
                  </div>
                  <Link href={`/investor/co-founder-matching/${team.id}/progress`}>
                    <Button variant="link" className="h-auto p-0 text-xs text-[#0F7377]">
                      View Progress <ChevronRight className="ml-1 h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              )
            })
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Link href="/investor/co-founder-matching" className="w-full">
          <Button variant="outline" className="w-full">
            View All Teams
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
