import { Skeleton } from "@/components/ui/skeleton"

export default function StartupProfileLoading() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8">
        <Skeleton className="h-5 w-40 mb-4" />
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <Skeleton className="h-32 w-32 rounded-lg" />
          <div className="flex-1">
            <Skeleton className="h-10 w-64 mb-2" />
            <Skeleton className="h-6 w-full max-w-2xl mb-4" />
            <div className="flex flex-wrap gap-4 mb-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-5 w-32" />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <Skeleton className="h-64 w-full rounded-lg" />
          <Skeleton className="h-48 w-full rounded-lg" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-32 w-full rounded-lg" />
          <Skeleton className="h-32 w-full rounded-lg" />
          <Skeleton className="h-32 w-full rounded-lg" />
        </div>
      </div>
    </div>
  )
} 