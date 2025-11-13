"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Loader2, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FeedSkeletonProps {
  count?: number
  className?: string
}

export function FeedSkeleton({ count = 3, className = "" }: FeedSkeletonProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="animate-pulse">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex gap-2 pt-2">
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-8 w-16" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

interface FeedLoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  text?: string
  className?: string
}

export function FeedLoadingSpinner({ 
  size = "md", 
  text = "Loading posts...", 
  className = "" 
}: FeedLoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  }

  return (
    <div className={`flex flex-col items-center justify-center py-8 ${className}`}>
      <Loader2 className={`${sizeClasses[size]} animate-spin text-muted-foreground mb-2`} />
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  )
}

interface FeedRefreshButtonProps {
  onRefresh: () => void
  refreshing?: boolean
  className?: string
}

export function FeedRefreshButton({ 
  onRefresh, 
  refreshing = false, 
  className = "" 
}: FeedRefreshButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onRefresh}
      disabled={refreshing}
      className={className}
    >
      <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
      {refreshing ? "Refreshing..." : "Refresh Feed"}
    </Button>
  )
}

interface FeedEmptyStateProps {
  title?: string
  description?: string
  actionText?: string
  onAction?: () => void
  icon?: React.ReactNode
}

export function FeedEmptyState({
  title = "No posts yet",
  description = "Follow some people or create your first post to see content here.",
  actionText = "Create Post",
  onAction,
  icon,
}: FeedEmptyStateProps) {
  return (
    <div className="text-center py-12">
      {icon && <div className="mb-4">{icon}</div>}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4 max-w-md mx-auto">{description}</p>
      {onAction && (
        <Button onClick={onAction} variant="default">
          {actionText}
        </Button>
      )}
    </div>
  )
}

interface FeedErrorStateProps {
  error: string
  onRetry?: () => void
  onRefresh?: () => void
}

export function FeedErrorState({ error, onRetry, onRefresh }: FeedErrorStateProps) {
  return (
    <div className="text-center py-8">
      <div className="mb-4">
        <div className="mx-auto w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
          <RefreshCw className="h-6 w-6 text-destructive" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Unable to load posts</h3>
        <p className="text-muted-foreground mb-4">{error}</p>
      </div>
      <div className="flex gap-2 justify-center">
        {onRetry && (
          <Button onClick={onRetry} variant="default">
            Try Again
          </Button>
        )}
        {onRefresh && (
          <Button onClick={onRefresh} variant="outline">
            Refresh
          </Button>
        )}
      </div>
    </div>
  )
}

interface FeedLoadMoreProps {
  loading: boolean
  hasMore: boolean
  onLoadMore: () => void
  className?: string
}

export function FeedLoadMore({ loading, hasMore, onLoadMore, className = "" }: FeedLoadMoreProps) {
  if (!hasMore) {
    return (
      <div className={`text-center py-8 text-muted-foreground ${className}`}>
        <p className="text-sm">You've reached the end of your feed</p>
      </div>
    )
  }

  return (
    <div className={`text-center py-4 ${className}`}>
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm text-muted-foreground">Loading more posts...</span>
        </div>
      ) : (
        <Button onClick={onLoadMore} variant="outline" size="sm">
          Load More Posts
        </Button>
      )}
    </div>
  )
}

// Progressive loading indicator
export function FeedProgressiveLoader({ 
  current, 
  total, 
  className = "" 
}: { 
  current: number
  total: number
  className?: string 
}) {
  const percentage = Math.min((current / total) * 100, 100)

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between text-xs text-muted-foreground mb-1">
        <span>Loading posts...</span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-1">
        <div
          className="bg-primary h-1 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
} 