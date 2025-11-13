"use client"

import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"
import { AnalyticsCard } from "./analytics-card"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: string | number
  description?: string
  tooltip?: string
  change?: number
  changeLabel?: string
  isLoading?: boolean
  className?: string
  valueClassName?: string
  changeTimeframe?: string
}

export function MetricCard({
  title,
  value,
  description,
  tooltip,
  change,
  changeLabel,
  isLoading = false,
  className,
  valueClassName,
  changeTimeframe = "from previous period",
}: MetricCardProps) {
  const isPositive = change && change > 0
  const isNegative = change && change < 0
  const isNeutral = change === 0

  return (
    <AnalyticsCard
      title={title}
      description={description}
      tooltip={tooltip}
      isLoading={isLoading}
      className={className}
    >
      <div className="flex flex-col space-y-1">
        <div className={cn("text-2xl font-bold", valueClassName)}>{value}</div>
        {typeof change !== "undefined" && (
          <div className="flex items-center space-x-1">
            <div
              className={cn(
                "flex items-center text-xs",
                isPositive && "text-green-500",
                isNegative && "text-red-500",
                isNeutral && "text-gray-500",
              )}
            >
              {!isNeutral && (
                <>
                  {isPositive ? <ArrowUpIcon className="mr-1 h-3 w-3" /> : <ArrowDownIcon className="mr-1 h-3 w-3" />}
                </>
              )}
              <span>
                {isNeutral ? "No change" : `${Math.abs(change)}%`}
                {changeLabel ? ` ${changeLabel}` : ""}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">{changeTimeframe}</div>
          </div>
        )}
      </div>
    </AnalyticsCard>
  )
}
