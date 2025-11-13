import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function SportsClubLoading() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Skeleton className="h-10 w-[300px]" />
          <Skeleton className="h-4 w-[400px]" />
        </div>
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>

      <Skeleton className="h-10 w-full" />

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-[250px]" />
          <Skeleton className="h-4 w-[350px]" />
        </CardHeader>
        <CardContent className="space-y-4">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-6 w-[200px]" />
                <Skeleton className="h-20 w-full" />
              </div>
            ))}
        </CardContent>
      </Card>
    </div>
  )
}
