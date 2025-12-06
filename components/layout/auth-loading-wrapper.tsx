"use client";

import { useAppSelector } from "@/lib/redux";
import { Skeleton } from "@/components/ui/skeleton";

interface AuthLoadingWrapperProps {
  children: React.ReactNode;
}

function FullPageSkeleton() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Skeleton */}
      <div className="h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-6 w-32" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-9 w-64 hidden md:block" />
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Skeleton */}
        <div className="hidden md:flex flex-col w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4 gap-4">
          {/* Logo area */}
          <div className="flex items-center gap-3 mb-4">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <Skeleton className="h-5 w-24" />
          </div>

          {/* Search */}
          <Skeleton className="h-9 w-full rounded-md" />

          {/* Nav items */}
          <div className="space-y-2 mt-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 py-2">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* User profile area */}
          <div className="flex items-center gap-3 p-2 border-t border-gray-200 dark:border-gray-800 pt-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1">
              <Skeleton className="h-4 w-24 mb-1" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
        </div>

        {/* Main Content Skeleton */}
        <main className="flex-1 flex flex-col p-6 gap-6">
          {/* Page header */}
          <div className="flex items-center justify-between">
            <div>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-64" />
            </div>
            <Skeleton className="h-10 w-32" />
          </div>

          {/* Content cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4"
              >
                <Skeleton className="h-32 w-full rounded-md mb-4" />
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export function AuthLoadingWrapper({ children }: AuthLoadingWrapperProps) {
  const isLoading = useAppSelector((state) => state.auth.isLoading);

  if (isLoading) {
    return <FullPageSkeleton />;
  }

  return <>{children}</>;
}
