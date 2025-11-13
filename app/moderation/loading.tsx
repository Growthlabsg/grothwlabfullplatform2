import { Skeleton } from "@/components/ui/skeleton"

export default function ModerationLoading() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="h-4 w-full max-w-2xl" />

      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-[600px] w-full" />
      </div>
    </div>
  )
}
