import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface ProgressCardProps {
  title: string
  value: number
  max: number
  description?: string
  formatValue?: (value: number) => string
  formatMax?: (max: number) => string
  className?: string
}

export function ProgressCard({
  title,
  value,
  max,
  description,
  formatValue = (v) => v.toString(),
  formatMax = (m) => m.toString(),
  className,
}: ProgressCardProps) {
  const percentage = Math.min(Math.round((value / max) * 100), 100)

  // Determine color based on percentage
  const getProgressColor = () => {
    if (percentage < 30) return "bg-red-500"
    if (percentage < 70) return "bg-amber-500"
    return "bg-green-500"
  }

  return (
    <Card className={`border-slate-200 transition-all duration-300 hover:shadow-sm ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-growthlab-gray">{title}</CardTitle>
        {description && <CardDescription className="text-xs">{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-bold text-growthlab-slate">{formatValue(value)}</span>
          <span className="text-sm text-muted-foreground">of {formatMax(max)}</span>
        </div>
        <Progress value={percentage} className={`h-2 ${getProgressColor()}`} />
        <div className="mt-2 text-xs text-muted-foreground">{percentage}% complete</div>
      </CardContent>
    </Card>
  )
}
