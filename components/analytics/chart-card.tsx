"use client"

import { AnalyticsCard } from "./analytics-card"
import { AreaChart } from "@/components/dashboard/area-chart"
import { BarChart } from "@/components/dashboard/bar-chart"
import { PieChart } from "@/components/ui/pie-chart"

type ChartType = "area" | "bar" | "pie"

interface ChartCardProps {
  title: string
  description?: string
  tooltip?: string
  data: any[]
  type: ChartType
  xKey?: string
  yKey?: string
  categories?: string[]
  isLoading?: boolean
  className?: string
  height?: number
  colors?: string[]
}

export function ChartCard({
  title,
  description,
  tooltip,
  data,
  type,
  xKey = "x",
  yKey = "y",
  categories,
  isLoading = false,
  className,
  height = 200,
  colors,
}: ChartCardProps) {
  return (
    <AnalyticsCard
      title={title}
      description={description}
      tooltip={tooltip}
      isLoading={isLoading}
      className={className}
    >
      <div style={{ height: `${height}px` }}>
        {type === "area" && <AreaChart data={data} xKey={xKey} yKey={yKey} categories={categories} colors={colors} />}
        {type === "bar" && <BarChart data={data} xKey={xKey} yKey={yKey} categories={categories} colors={colors} />}
        {type === "pie" && <PieChart data={data} colors={colors} />}
      </div>
    </AnalyticsCard>
  )
}
