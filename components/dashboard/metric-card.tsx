import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string
  description?: string
  icon?: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
}

export function MetricCard({ title, value, description, icon: Icon, trend, className }: MetricCardProps) {
  return (
    <Card className={`border-slate-200 transition-all duration-300 hover:shadow-sm ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-growthlab-gray">{title}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-growthlab-slate">{value}</div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        {trend && (
          <div className="mt-3 flex items-center text-xs">
            <span className={`mr-1 font-medium ${trend.isPositive ? "text-green-500" : "text-red-500"}`}>
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
            </span>
            <span className="text-muted-foreground">from last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
