"use client"

import { MetricCard } from "@/components/dashboard/metric-card"
import { Calendar, Clock, Star, Users } from "lucide-react"

export function DashboardMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Sessions This Month"
        value="12"
        description="3 scheduled, 9 completed"
        icon={Calendar}
        trend={{ value: 20, isPositive: true }}
      />
      <MetricCard
        title="Active Mentees"
        value="8"
        description="2 new this month"
        icon={Users}
        trend={{ value: 33, isPositive: true }}
      />
      <MetricCard
        title="Avg. Session Rating"
        value="4.8"
        description="From 42 sessions"
        icon={Star}
        trend={{ value: 0.3, isPositive: true }}
      />
      <MetricCard
        title="Hours Contributed"
        value="24"
        description="This month"
        icon={Clock}
        trend={{ value: 15, isPositive: true }}
      />
    </div>
  )
}
