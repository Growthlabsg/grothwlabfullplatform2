import { Skeleton } from "@/components/ui/skeleton"
import { Footer } from "@/components/layout/footer"

export default function InvestorDashboardLoading() {
  return (
          <div>
          <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="text-3xl font-bold tracking-tight text-[#1E293B] md:text-4xl">Investor Dashboard</h1>
          <Skeleton className="h-9 w-32" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="md:col-span-2 lg:col-span-2">
            <Skeleton className="h-[250px] w-full rounded-lg" />
          </div>
          <Skeleton className="h-[250px] w-full rounded-lg" />
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-[300px] w-full rounded-lg md:col-span-2 lg:col-span-2" />
          <div className="space-y-6 md:col-span-1 lg:col-span-1">
            <Skeleton className="h-[140px] w-full rounded-lg" />
            <Skeleton className="h-[140px] w-full rounded-lg" />
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Skeleton className="h-[300px] w-full rounded-lg" />
          <Skeleton className="h-[300px] w-full rounded-lg" />
        </div>

        <div className="mt-6">
          <Skeleton className="h-[200px] w-full rounded-lg" />
        </div>
      </div>

      <Footer />
    </div>
  )
}
