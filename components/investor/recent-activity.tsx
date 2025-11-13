import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/utils/format"

interface Activity {
  id: string
  type: "new-deal" | "meeting" | "note" | "stage-change" | "document" | "decision"
  companyName: string
  description: string
  date: string
  user: string
}

interface RecentActivityProps {
  activities: Activity[]
  className?: string
}

export function RecentActivity({ activities, className }: RecentActivityProps) {
  const getActivityIcon = (type: string): string => {
    switch (type) {
      case "new-deal":
        return "🆕"
      case "meeting":
        return "📅"
      case "note":
        return "📝"
      case "stage-change":
        return "🔄"
      case "document":
        return "📄"
      case "decision":
        return "✅"
      default:
        return "📌"
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
            <p className="text-muted-foreground">No recent activity</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                  <span>{getActivityIcon(activity.type)}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-[#1E293B]">{activity.companyName}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(activity.date)}</p>
                  </div>
                  <p className="text-sm text-[#334155]">{activity.description}</p>
                  <p className="text-xs text-muted-foreground">By {activity.user}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
