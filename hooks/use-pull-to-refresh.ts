"use client"

import { useState, useEffect, type RefObject } from "react"

interface PullToRefreshOptions {
  pullDownThreshold?: number // Pixels to pull down before triggering refresh
  maxPullDownDistance?: number // Max pixels user can pull down
  refreshingDuration?: number // Minimum duration of refreshing state in ms
  onRefresh: () => Promise<any> | void
}

export function usePullToRefresh(ref: RefObject<HTMLElement>, options: PullToRefreshOptions) {
  const { pullDownThreshold = 70, maxPullDownDistance = 120, refreshingDuration = 700, onRefresh } = options

  const [isPulling, setIsPulling] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Track touch position
  useEffect(() => {
    if (!ref.current || !window) return

    let touchStartY = 0
    let touchMoveY = 0
    let isAtTop = false

    const handleTouchStart = (e: TouchEvent) => {
      // Only enable pull to refresh when at the top of the page
      isAtTop = ref.current && window.scrollY === 0

      if (!isAtTop || isRefreshing) return

      touchStartY = (e.touches[0] ? e.touches[0].clientY : undefined)
      setIsPulling(true)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isAtTop || !isPulling || isRefreshing) return

      touchMoveY = (e.touches[0] ? e.touches[0].clientY : undefined)
      const pullDistance = touchMoveY - touchStartY

      // Only allow pulling down, not up
      if (pullDistance <= 0) {
        setPullDistance(0)
        return
      }

      // Add resistance to pulling (square root creates resistance effect)
      const resistedPull = Math.sqrt(pullDistance) * 5

      // Limit to max distance
      const limitedPull = Math.min(resistedPull, maxPullDownDistance)

      setPullDistance(limitedPull)

      // Prevent default scrolling behavior when pulling
      if (pullDistance > 5) {
        e.preventDefault()
      }
    }

    const handleTouchEnd = async () => {
      if (!isPulling || isRefreshing) return

      if (pullDistance >= pullDownThreshold) {
        // Trigger refresh
        setIsRefreshing(true)

        try {
          await onRefresh()
        } catch (error) {
          console.error("Error during refresh:", error)
        }

        // Ensure refreshing state shows for at least the minimum duration
        setTimeout(() => {
          setIsRefreshing(false)
          setPullDistance(0)
        }, refreshingDuration)
      } else {
        // Reset if not pulled enough
        setPullDistance(0)
      }

      setIsPulling(false)
    }

    // Add event listeners
    const element = ref.current
    element.addEventListener("touchstart", handleTouchStart, { passive: true })
    element.addEventListener("touchmove", handleTouchMove, { passive: false })
    element.addEventListener("touchend", handleTouchEnd)

    return () => {
      // Clean up
      if (element) {
        element.removeEventListener("touchstart", handleTouchStart)
        element.removeEventListener("touchmove", handleTouchMove)
        element.removeEventListener("touchend", handleTouchEnd)
      }
    }
  }, [
    ref,
    isPulling,
    isRefreshing,
    pullDistance,
    onRefresh,
    pullDownThreshold,
    maxPullDownDistance,
    refreshingDuration,
  ])

  return { isPulling, pullDistance, isRefreshing }
}
