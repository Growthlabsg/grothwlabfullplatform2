import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { formatCurrency, formatNumber, formatPercentage } from "@/utils/format"
import type { DealFlowMetrics as DealFlowMetricsType } from "@/types/investor-dashboard"

interface DealFlowMetricsProps {
  metrics: DealFlowMetricsType
  isLoading?: boolean
  className?: string
}

export function DealFlowMetrics({ metrics, isLoading = false, className }: DealFlowMetricsProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Deal Flow Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">New Deals</p>
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <p className="text-2xl font-bold">{formatNumber(metrics.newDeals)}</p>
            )}
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">In Progress</p>
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <p className="text-2xl font-bold">{formatNumber(metrics.inProgress)}</p>
            )}
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Closed</p>
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <p className="text-2xl font-bold">{formatNumber(metrics.closed)}</p>
            )}
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Rejected</p>
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <p className="text-2xl font-bold">{formatNumber(metrics.rejected)}</p>
            )}
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Total Deals</p>
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <p className="text-2xl font-bold">{formatNumber(metrics.totalDeals)}</p>
            )}
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Avg. Deal Size</p>
            {isLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <p className="text-2xl font-bold">{formatCurrency(metrics.averageDealSize)}</p>
            )}
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Conversion Rate</p>
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <p className="text-2xl font-bold">{formatPercentage(metrics.conversionRate)}</p>
            )}
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Avg. Days to Close</p>
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <p className="text-2xl font-bold">{formatNumber(metrics.averageDaysToClose)}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
