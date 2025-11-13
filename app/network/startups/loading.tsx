import { Skeleton } from "@/components/ui/skeleton"

export default function StartupDirectoryLoading() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8">
        <Skeleton className="h-10 w-64 mb-4" />
        <Skeleton className="h-5 w-full max-w-3xl mb-2" />
        <Skeleton className="h-5 w-full max-w-2xl" />
      </div>
      
      <div className="grid md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <div className="space-y-6">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
        
        <div className="md:col-span-3">
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 