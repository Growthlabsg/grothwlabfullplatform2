"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { Calendar, ChevronDown, ChevronUp, FileText, User } from "lucide-react"
import type { TeamProgressData } from "@/types/team-progress"

interface TeamProgressSnapshotsProps {
  progressData: TeamProgressData
  className?: string
}

export function TeamProgressSnapshots({ progressData, className }: TeamProgressSnapshotsProps) {
  const [expandedSnapshots, setExpandedSnapshots] = useState<string[]>([])

  // Toggle snapshot expansion
  const toggleSnapshot = (snapshotId: string) => {
    if (expandedSnapshots.includes(snapshotId)) {
      setExpandedSnapshots(expandedSnapshots.filter((id) => id !== snapshotId))
    } else {
      setExpandedSnapshots([...expandedSnapshots, snapshotId])
    }
  }

  // Format metric value
  const formatMetricValue = (value: any, unit: string): string => {
    if (value === undefined) return "N/A"

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

  // Get metric name and unit by ID
  const getMetricInfo = (metricId: string): { name: string; unit: string } => {
    const metric = progressData.metricDefinitions.find((m) => m.id === metricId)
    return {
      name: metric?.name || metricId,
      unit: metric?.unit || "count",
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Progress Snapshots</CardTitle>
      </CardHeader>
      <CardContent>
        {progressData.snapshots.length === 0 ? (
          <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
            <p className="text-muted-foreground">No progress snapshots available</p>
          </div>
        ) : (
          <div className="space-y-4">
            {progressData.snapshots
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((snapshot) => {
                const isExpanded = expandedSnapshots.includes(snapshot.id)

                return (
                  <div key={snapshot.id} className="rounded-lg border">
                    <div
                      className="flex cursor-pointer items-center justify-between p-4"
                      onClick={() => toggleSnapshot(snapshot.id)}
                    >
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-[#0F7377]" />
                        <h3 className="font-medium">{format(new Date(snapshot.date), "MMMM d, yyyy")}</h3>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </Button>
                    </div>

                    {isExpanded && (
                      <div className="border-t p-4">
                        <div className="mb-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                          {Object.entries(snapshot.metrics).map(([metricId, metricData]) => {
                            const { name, unit } = getMetricInfo(metricId)

                            return (
                              <div key={metricId} className="rounded-md border p-3">
                                <h4 className="text-sm font-medium">{name}</h4>
                                <p className="mt-1 text-lg font-semibold">
                                  {formatMetricValue(metricData.value, unit)}
                                </p>
                                {metricData.note && (
                                  <p className="mt-1 text-xs text-muted-foreground">{metricData.note}</p>
                                )}
                              </div>
                            )
                          })}
                        </div>

                        {snapshot.notes && (
                          <div className="mt-4 rounded-md bg-slate-50 p-3">
                            <div className="mb-1 flex items-center gap-2">
                              <FileText className="h-4 w-4 text-[#0F7377]" />
                              <h4 className="text-sm font-medium">Notes</h4>
                            </div>
                            <p className="text-sm">{snapshot.notes}</p>
                          </div>
                        )}

                        {snapshot.evaluatorId && (
                          <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                            <User className="h-3 w-3" />
                            <span>Evaluated by: {snapshot.evaluatorId}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
