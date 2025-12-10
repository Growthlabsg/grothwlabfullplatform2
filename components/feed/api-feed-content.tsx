"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Users,
  Clock,
  Sparkles,
  Filter,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { useGetFeedQuery } from "@/lib/redux";
import { Post } from "./api-post";
import { CreatePostDialog } from "./api-create-post-dialog";
import { useAuth } from "@/contexts/auth-context";
import { usePageContext } from "@/contexts/page-context";
import { toast } from "sonner";

type FeedType = "recommended" | "following" | "trending" | "recent";

export function ApiFeedContent() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const { activePageId, isOperatingAsPage } = usePageContext();
  const [feedType, setFeedType] = useState<FeedType>("recommended");
  const [page, setPage] = useState(1);
  const [allPosts, setAllPosts] = useState<any[]>([]);

  // Use activePageId directly - it's set when user switches context
  // isOperatingAsPage requires activePage to be loaded, which may have timing issues
  const effectivePageId = activePageId || null;

  const {
    data: feedData,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useGetFeedQuery(
    {
      page,
      limit: 10,
      feed_type: feedType,
      pageId: effectivePageId, // Use activePageId directly
    },
    {
      skip: !user, // Skip the query if user is not authenticated
      refetchOnMountOrArgChange: true, // Refetch when arguments change (including pageId)
    }
  );

  // Ref for infinite scroll
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Update posts when new data arrives
  // For page 1, always sync with feedData to reflect optimistic updates
  // For other pages, append without duplicates
  useEffect(() => {
    if (feedData?.posts) {
      if (page === 1) {
        // Reset posts for new feed type or refresh
        setAllPosts(feedData.posts);
      } else {
        // Append new posts for pagination, avoiding duplicates
        setAllPosts((prev) => {
          const existingIds = new Set(prev.map((p) => p.id));
          const newPosts = feedData.posts.filter((p) => !existingIds.has(p.id));
          return [...prev, ...newPosts];
        });
      }
    }
  }, [feedData?.posts, page]);

  // Sync individual post updates (for optimistic updates like likes)
  // This ensures local state reflects cache changes even when not fetching new pages
  useEffect(() => {
    if (feedData?.posts && page === 1) {
      setAllPosts((prev) => {
        // Create a map of current posts for quick lookup
        const feedPostMap = new Map(feedData.posts.map((p) => [p.id, p]));

        // Update existing posts with new data from cache
        return prev.map((post) => {
          const cachedPost = feedPostMap.get(post.id);
          if (cachedPost) {
            // Merge in the updated fields (like isLiked, likesCount, etc.)
            return { ...post, ...cachedPost };
          }
          return post;
        });
      });
    }
  }, [feedData?.posts]);

  // Reset page when feed type or page context changes
  useEffect(() => {
    setPage(1);
    setAllPosts([]);
    // Note: refetchOnMountOrArgChange: true handles refetching when pageId changes
    // We don't need to manually call refetch() here
  }, [feedType, activePageId]);

  // Infinite scroll - load more when scrolling near bottom
  const loadMore = useCallback(() => {
    if (feedData?.hasNext && !isFetching) {
      setPage((prev) => prev + 1);
    }
  }, [feedData?.hasNext, isFetching]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && feedData?.hasNext && !isFetching) {
          loadMore();
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [loadMore, feedData?.hasNext, isFetching]);

  const handleRefresh = () => {
    setPage(1);
    setAllPosts([]);
    // Only call refetch if query has been started (user is authenticated)
    if (user) {
      refetch();
    }
    toast.success("Feed refreshed!");
  };

  // Separate pending posts (uploading) from regular posts
  const pendingPosts = allPosts.filter((post) => post.isPending);
  const regularPosts = allPosts.filter((post) => !post.isPending);

  const feedOptions = [
    {
      value: "recommended",
      label: "For you",
      icon: Sparkles,
      description: "AI-curated content",
    },
    {
      value: "following",
      label: "Following",
      icon: Users,
      description: "From your network",
    },
    {
      value: "trending",
      label: "Trending",
      icon: TrendingUp,
      description: "Popular right now",
    },
    {
      value: "recent",
      label: "Recent",
      icon: Clock,
      description: "Latest posts",
    },
  ];

  // Show loading state while checking authentication
  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="py-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Loading...</p>
        </CardContent>
      </Card>
    );
  }

  // Show login prompt if not authenticated
  if (!user) {
    return (
      <Card className="w-full">
        <CardContent className="py-8 text-center">
          <div className="text-gray-500 mb-4">
            <Users className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">Please log in</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              You need to be logged in to view the feed
            </p>
          </div>
          <Button onClick={() => router.push("/login")}>Log In</Button>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardContent className="py-8 text-center">
          <div className="text-red-500 mb-4">
            <TrendingDown className="h-12 w-12 mx-auto mb-2" />
            <h3 className="text-lg font-semibold">Failed to load feed</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Please check your connection and try again
            </p>
          </div>
          <Button onClick={handleRefresh} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Feed Header */}
      {/* <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold">Your Feed</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isFetching}
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${isFetching ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
          </div>

          <div className="flex items-center space-x-4">
            <Select
              value={feedType}
              onValueChange={(value: FeedType) => setFeedType(value)}
            >
              <SelectTrigger className="w-48">
                <SelectValue>
                  <div className="flex items-center space-x-2">
                    {(() => {
                      const option = feedOptions.find(
                        (opt) => opt.value === feedType
                      );
                      const Icon = option?.icon || Sparkles;
                      return (
                        <>
                          <Icon className="h-4 w-4" />
                          <span>{option?.label}</span>
                        </>
                      );
                    })()}
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {feedOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center space-x-3">
                      <option.icon className="h-4 w-4" />
                      <div>
                        <div className="font-medium">{option.label}</div>
                        <div className="text-xs text-gray-500">
                          {option.description}
                        </div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {feedData && (
              <Badge variant="outline" className="text-xs">
                {feedData.total} total posts
              </Badge>
            )}
          </div>
        </CardHeader>
      </Card> */}

      {/* <h6 className="font-bold">Your Feed</h6> */}

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Select
            value={feedType}
            onValueChange={(value: FeedType) => setFeedType(value)}
          >
            <SelectTrigger className="w-48">
              <SelectValue>
                <div className="flex items-center space-x-2">
                  {(() => {
                    const option = feedOptions.find(
                      (opt) => opt.value === feedType
                    );
                    const Icon = option?.icon || Sparkles;
                    return (
                      <>
                        <Icon className="h-4 w-4" />
                        <span>{option?.label}</span>
                      </>
                    );
                  })()}
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {feedOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex items-center space-x-3">
                    <option.icon className="h-4 w-4" />
                    <div>
                      <div className="font-medium">{option.label}</div>
                      <div className="text-xs text-gray-500">
                        {option.description}
                      </div>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* {feedData && (
            <Badge variant="outline" className="text-xs">
              {feedData.total} total posts
            </Badge>
          )} */}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={isFetching}
        >
          <RefreshCw
            className={`h-4 w-4 mr-2 ${isFetching ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      {/* Create Post */}
      <Card>
        <CardContent className="p-6">
          <CreatePostDialog />
        </CardContent>
      </Card>

      {/* Feed Content */}
      {/* Show skeleton loaders when initially loading or fetching with no posts */}
      {(isLoading || (isFetching && allPosts.length === 0)) && page === 1 ? (
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-3 w-[150px]" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-48 w-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Pending Posts (Uploading) - Always shown at top */}
          {pendingPosts.length > 0 && (
            <div className="space-y-6">
              {pendingPosts.map((post) => (
                <div key={post.id} className="relative">
                  <div className="absolute inset-0 bg-white/50 dark:bg-gray-900/50 rounded-lg z-10 flex items-center justify-center">
                    <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-lg">
                      <Loader2 className="h-4 w-4 animate-spin text-primary" />
                      <span className="text-sm font-medium">Posting...</span>
                    </div>
                  </div>
                  <Post post={post} onEdit={() => {}} onDelete={() => {}} />
                </div>
              ))}
            </div>
          )}

          {/* Regular Posts */}
          {regularPosts.length === 0 &&
          pendingPosts.length === 0 &&
          !isLoading &&
          !isFetching &&
          !loading ? (
            <Card>
              <CardContent className="py-12 text-center">
                <div className="text-gray-500 mb-4">
                  <Sparkles className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {feedType === "following"
                      ? "Start following people to see their posts here"
                      : "Be the first to create a post!"}
                  </p>
                </div>
                <CreatePostDialog
                  trigger={
                    <Button className="mt-4">Create your first post</Button>
                  }
                />
              </CardContent>
            </Card>
          ) : (
            regularPosts.map((post) => (
              <Post
                key={post.id}
                post={post}
                onEdit={(post) => {
                  // Handle edit - could open edit dialog
                  console.log("Edit post:", post);
                }}
                onDelete={(postId) => {
                  // Remove from local state
                  setAllPosts((prev) => prev.filter((p) => p.id !== postId));
                }}
              />
            ))
          )}

          {/* Infinite Scroll Trigger */}
          <div ref={loadMoreRef} className="py-4">
            {isFetching && page > 1 && (
              <div className="flex items-center justify-center gap-2 text-gray-500">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="text-sm">Loading more posts...</span>
              </div>
            )}
          </div>

          {/* End of Feed */}
          {!feedData?.hasNext && allPosts.length > 0 && (
            <div className="text-center py-8">
              <div className="text-gray-500">
                <Sparkles className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">You've reached the end of your feed</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRefresh}
                  className="mt-2"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh to see new posts
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
