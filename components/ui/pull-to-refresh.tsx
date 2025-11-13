"use client"

import type React from "react"

import { useRef, forwardRef, type ReactNode } from "react"
import { RefreshCw } from "lucide-react"
import { usePullToRefresh } from "@/hooks/use-pull-to-refresh"
import { cn } from "@/lib/utils"

interface PullToRefreshProps {
  onRefresh: () => Promise<any> | void
  children: ReactNode
  className?: string
  pullDownThreshold?: number
  maxPullDownDistance?: number
  refreshingDuration?: number
}

export const PullToRefresh = forwardRef<HTMLDivElement, PullToRefreshProps>(
  (
    { onRefresh, children, className, pullDownThreshold = 70, maxPullDownDistance = 120, refreshingDuration = 700 },
    forwardedRef,
  ) => {
    const localRef = useRef<HTMLDivElement>(null)
    const ref = (forwardedRef as React.RefObject<HTMLDivElement>) || localRef

    const { isPulling, pullDistance, isRefreshing } = usePullToRefresh(ref, {
      pullDownThreshold,
      maxPullDownDistance,
      refreshingDuration,
      onRefresh,
    })

    // Calculate refresh indicator rotation based on pull distance
    const rotation = isPulling ? Math.min(pullDistance * 2, 180) : 0
    // Calculate opacity based on pull distance
    const opacity = isPulling ? Math.min(pullDistance / pullDownThreshold, 1) : 0

    // Set transform for content based on pull distance
    const contentTransform = `translateY(${isPulling || isRefreshing ? pullDistance : 0}px)`

    return (
      <div ref={ref} className={cn("relative overflow-hidden touch-none", className)}>
        {/* Pull indicator */}
        <div
          className="absolute top-0 left-0 w-full flex justify-center pointer-events-none"
          style={{ opacity: isRefreshing ? 1 : opacity }}
        >
          <div
            className="p-4 rounded-full transform"
            style={{
              transform: `translateY(${pullDistance / 2 - 20}px)`,
            }}
          >
            <RefreshCw
              className={cn("h-6 w-6 text-primary transform transition-transform", isRefreshing && "animate-spin")}
              style={{
                transform: isRefreshing ? "rotate(0deg)" : `rotate(${rotation}deg)`,
              }}
            />
          </div>
        </div>

        {/* Content container */}
        <div style={{ transform: contentTransform }} className="transition-transform ease-out">
          {children}
        </div>
      </div>
    )
  },
)

PullToRefresh.displayName = "PullToRefresh"
