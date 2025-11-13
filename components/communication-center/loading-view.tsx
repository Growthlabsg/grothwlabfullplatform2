import { Skeleton } from "@/components/ui/skeleton"

export function LoadingView() {
  return (
    <div className="h-screen flex">
      {/* Sidebar skeleton */}
      <div className="w-64 border-r border-border bg-card">
        <div className="p-4 border-b">
          <Skeleton className="h-6 w-40" />
        </div>

        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <Skeleton className="h-9 w-9 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        </div>

        <div className="p-3">
          <Skeleton className="h-9 w-full" />
        </div>

        <div className="p-2 space-y-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between px-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4 rounded-full" />
              </div>

              <div className="space-y-1 px-3">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <Skeleton key={idx} className="h-7 w-full" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main content skeleton */}
      <div className="flex-1 flex flex-col">
        <div className="h-12 border-b flex items-center justify-between px-4">
          <div className="flex items-center space-x-3">
            <Skeleton className="h-8 w-8 rounded-md" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-40" />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {Array.from({ length: 3 }).map((_, idx) => (
              <Skeleton key={idx} className="h-8 w-8 rounded-full" />
            ))}
          </div>
        </div>

        <div className="flex-1 p-4 space-y-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className={`flex gap-3 ${index % 2 === 0 ? "" : "justify-end"}`}>
              {index % 2 === 0 && <Skeleton className="h-8 w-8 rounded-full" />}

              <div className={`space-y-2 ${index % 2 === 0 ? "" : "items-end"}`}>
                {index % 2 === 0 && <Skeleton className="h-3 w-24" />}
                <Skeleton className={`h-16 w-64 rounded-lg`} />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          ))}
        </div>

        <div className="border-t p-4">
          <Skeleton className="h-32 w-full rounded-lg" />
        </div>

        <div className="border-t p-2 flex justify-between items-center">
          <div className="flex items-center space-x-1">
            {Array.from({ length: 4 }).map((_, idx) => (
              <Skeleton key={idx} className="h-8 w-8 rounded-full" />
            ))}
          </div>

          <div className="flex items-center space-x-1">
            {Array.from({ length: 3 }).map((_, idx) => (
              <Skeleton key={idx} className="h-8 w-8 rounded-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
