import type { FounderTeam } from "./co-founder-matching"

export type ProgressMetricType =
  | "team_growth"
  | "product_development"
  | "market_validation"
  | "funding"
  | "customer_acquisition"
  | "revenue"
  | "skill_development"
  | "mentor_engagement"
  | "investor_interest"

export type ProgressMetricUnit = "percentage" | "count" | "currency" | "boolean" | "rating" | "milestone"

export type ProgressMilestoneStatus = "not_started" | "in_progress" | "completed" | "delayed"

export interface ProgressMilestone {
  id: string
  title: string
  description?: string
  dueDate?: string
  status: ProgressMilestoneStatus
  completedDate?: string
}

export interface ProgressMetricDefinition {
  id: string
  name: string
  description: string
  type: ProgressMetricType
  unit: ProgressMetricUnit
  isKey: boolean
  targetValue?: number | string
  targetDate?: string
}

export interface ProgressMetricDataPoint {
  date: string
  value: number | string | boolean
  note?: string
}

export interface ProgressMetric {
  definition: ProgressMetricDefinition
  data: ProgressMetricDataPoint[]
  milestones?: ProgressMilestone[]
}

export interface TeamProgressSnapshot {
  id: string
  teamId: string
  date: string
  metrics: Record<string, ProgressMetricDataPoint>
  notes?: string
  evaluatorId?: string
}

export interface TeamProgressData {
  teamId: string
  metricDefinitions: ProgressMetricDefinition[]
  snapshots: TeamProgressSnapshot[]
  milestones: ProgressMilestone[]
}

export interface TeamWithProgress extends FounderTeam {
  progressData?: TeamProgressData
}
