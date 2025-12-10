"use client";

import { useParams, useRouter } from "next/navigation";
import { useGetPostQuery } from "@/lib/redux";
import { Post } from "@/components/feed/api-post";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";

function PostSkeleton() {
  return (
    <Card className="w-full">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center space-x-3">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <Skeleton className="h-48 w-full rounded-lg" />
        <div className="flex justify-between pt-4 border-t">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function SinglePostPage() {
  const params = useParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const postId = Number(params.id);

  const {
    data: post,
    isLoading,
    error,
    refetch,
  } = useGetPostQuery(postId, {
    skip: !postId || isNaN(postId),
  });

  // Handle loading state
  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-2xl mx-auto px-4 py-8">
          {/* Back button */}
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </div>
          <PostSkeleton />
        </div>
      </div>
    );
  }

  // Handle error state
  if (error || !post) {
    const errorMessage =
      (error as any)?.data?.detail || (error as any)?.status === 404
        ? "Post not found"
        : (error as any)?.status === 403
        ? "This post is private"
        : "Failed to load post";

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-2xl mx-auto px-4 py-8">
          {/* Back button */}
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </div>

          <Card className="w-full">
            <CardContent className="py-12 text-center">
              <AlertCircle className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <h2 className="text-xl font-semibold mb-2">{errorMessage}</h2>
              <p className="text-gray-500 mb-6">
                {(error as any)?.status === 404
                  ? "The post you're looking for doesn't exist or has been deleted."
                  : (error as any)?.status === 403
                  ? "You don't have permission to view this post."
                  : "There was an error loading this post. Please try again."}
              </p>
              <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={() => router.back()}>
                  Go Back
                </Button>
                <Link href="/feed">
                  <Button>Go to Feed</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Back button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Feed
          </Button>
        </div>

        {/* Post */}
        <Post
          post={post}
          onEdit={() => {}}
          onDelete={() => {
            router.push("/feed");
          }}
        />

        {/* Additional info */}
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>
            Viewing single post •{" "}
            <Link href="/feed" className="text-primary hover:underline">
              Return to Feed
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
