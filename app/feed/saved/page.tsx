"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Bookmark, RefreshCw, Loader2 } from "lucide-react";
import { useGetSavedPostsQuery } from "@/lib/redux";
import { Post } from "@/components/feed/api-post";
import { useAuth } from "@/contexts/auth-context";
import { usePageContext } from "@/contexts/page-context";
import { toast } from "sonner";

export default function SavedPostsPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { activePageId, isOperatingAsPage } = usePageContext();
  const [page, setPage] = useState(1);

  const {
    data: savedPostsData,
    isLoading,
    isFetching,
    refetch,
  } = useGetSavedPostsQuery(
    {
      page,
      limit: 20,
      pageId: isOperatingAsPage ? activePageId! : undefined,
    },
    {
      skip: !user,
    }
  );

  const handleRefresh = () => {
    setPage(1);
    refetch();
    toast.success("Saved posts refreshed!");
  };

  const handleLoadMore = () => {
    if (savedPostsData?.hasNext && !isFetching) {
      setPage((prev) => prev + 1);
    }
  };

  if (authLoading) {
    return (
      <div className="container mx-auto py-6 max-w-4xl">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto py-6 max-w-4xl">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Card>
          <CardContent className="py-12 text-center">
            <Bookmark className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h2 className="text-xl font-semibold mb-2">Please Log In</h2>
            <p className="text-muted-foreground mb-4">
              You need to be logged in to view your saved posts.
            </p>
            <Button onClick={() => router.push("/login")}>Log In</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Bookmark className="h-6 w-6 text-primary" />
              My Saved Posts
            </h1>
            <p className="text-sm text-muted-foreground">
              {isOperatingAsPage
                ? "Posts saved by your business page"
                : "Posts you've saved for later"}
            </p>
          </div>
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

      {/* Posts */}
      {isLoading ? (
        <div className="space-y-4">
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
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4 mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : savedPostsData?.posts && savedPostsData.posts.length > 0 ? (
        <div className="space-y-4">
          {savedPostsData.posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}

          {/* Load More */}
          {savedPostsData.hasNext && (
            <div className="text-center py-4">
              <Button
                variant="outline"
                onClick={handleLoadMore}
                disabled={isFetching}
              >
                {isFetching ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Load More"
                )}
              </Button>
            </div>
          )}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <Bookmark className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No Saved Posts Yet</h3>
            <p className="text-muted-foreground mb-4">
              When you save posts, they'll appear here for easy access later.
            </p>
            <Button onClick={() => router.push("/feed")}>Browse Feed</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
