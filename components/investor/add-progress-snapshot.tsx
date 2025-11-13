"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import type { TeamProgressData } from "@/types/team-progress"

interface AddProgressSnapshotProps {
  progressData: TeamProgressData
  onAddSnapshot: (snapshot: TeamProgressSnapshot) => void
  className?: string
}

export function AddProgressSnapshot({ progressData, onAddSnapshot, className }: AddProgressSnapshotProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<{
    metrics: Record<string, { value: string; note: string }>
    notes: string
  }>({
    metrics: {},
    notes: "",
  })

  // Initialize form data with metric definitions
  const initializeForm = () => {
    const initialMetrics: Record<string, { value: string; note: string }> = {}
    progressData.metricDefinitions.forEach((metric) => {
      initialMetrics[metric.id] = {
        value: "",
        note: "",
      }
    })

    setFormData({
      metrics: initialMetrics,
      notes: "",
    })
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Create new snapshot object
    const newSnapshot = {
      id: `snapshot-${Date.now()}`,
      teamId: progressData.teamId,
      date: new Date().toISOString(),
      metrics: formData.metrics,
      notes: formData.notes,
      evaluatorId: "current-user", // In a real app, this would be the current user's ID
    }

    onAddSnapshot(newSnapshot)
    setOpen(false)
  }

  // Handle metric value change
  const handleMetricChange = (metricId: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      metrics: {
        ...prev.metrics,
        [metricId]: {
          ...prev.metrics[metricId],
          value,
        },
      },
    }))
  }

  // Handle metric note change
  const handleMetricNoteChange = (metricId: string, note: string) => {
    setFormData((prev) => ({
      ...prev,
      metrics: {
        ...prev.metrics,
        [metricId]: {
          ...prev.metrics[metricId],
          note,
        },
      },
    }))
  }

  // Handle notes change
  const handleNotesChange = (notes: string) => {
    setFormData((prev) => ({
      ...prev,
      notes,
    }))
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Track Team Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-muted-foreground">
          Add a new progress snapshot to track how this team is developing over time.
        </p>

        <Dialog
          open={open}
          onOpenChange={(newOpen) => {
            setOpen(newOpen)
            if (newOpen) initializeForm()
          }}
        >
          <DialogTrigger asChild>
            <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">
              <Plus className="mr-2 h-4 w-4" />
              Add Progress Snapshot
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add Progress Snapshot</DialogTitle>
              <DialogDescription>Record the current progress of the team across various metrics.</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6 py-4">
              <div className="space-y-4">
                {progressData.metricDefinitions.map((metric) => (
                  <div key={metric.id} className="space-y-2">
                    <Label htmlFor={`metric-${metric.id}`}>
                      {metric.name}
                      {metric.unit === "percentage" && " (%)"}
                      {metric.unit === "currency" && " ($)"}
                      {metric.unit === "rating" && " (0-10)"}
                    </Label>
                    <Input
                      id={`metric-${metric.id}`}
                      type={metric.unit === "boolean" ? "checkbox" : "text"}
                      placeholder={`Enter ${metric.name.toLowerCase()}`}
                      value={formData.metrics[metric.id]?.value || ""}
                      onChange={(e) =>
                        handleMetricChange(
                          metric.id,
                          metric.unit === "boolean" ? e.target.checked.toString() : e.target.value,
                        )
                      }
                    />
                    <Input
                      placeholder="Optional note about this metric"
                      value={formData.metrics[metric.id]?.note || ""}
                      onChange={(e) => handleMetricNoteChange(metric.id, e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">{metric.description}</p>
                  </div>
                ))}

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add any additional observations or notes about the team's progress"
                    value={formData.notes}
                    onChange={(e) => handleNotesChange(e.target.value)}
                    rows={4}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                  Save Snapshot
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
