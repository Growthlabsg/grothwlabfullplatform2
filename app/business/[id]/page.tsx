"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  MapPin,
  Globe,
  Phone,
  Mail,
  Calendar,
  Users,
  FileText,
  Building2,
  Share2,
  MessageCircle,
  MoreHorizontal,
  CheckCircle,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Construction,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Post as ApiPost } from "@/components/feed/api-post";
import { CreatePostDialog } from "@/components/feed/api-create-post-dialog";
import {
  useGetPageQuery,
  useGetPagePostsQuery,
  useToggleFollowPageMutation,
} from "@/lib/redux/pagesApi";
import { usePageContext } from "@/contexts/page-context";
import { pluralize } from "@/lib/utils";

export default function BusinessPageView() {
  const params = useParams();
  const router = useRouter();
  const pageId = Number(params.id);
  const { activePageId, isOperatingAsPage } = usePageContext();

  const [activeTab, setActiveTab] = useState("overview");
  const [postsPage, setPostsPage] = useState(1);

  // Check if user owns this page (is operating as this page)
  const isOwnPage = isOperatingAsPage && activePageId === pageId;

  const {
    data: pageData,
    isLoading: pageLoading,
    error: pageError,
  } = useGetPageQuery(pageId);
  const {
    data: postsData,
    isLoading: postsLoading,
    isFetching: postsFetching,
  } = useGetPagePostsQuery({
    pageId,
    page: postsPage,
    limit: 10,
  });
  const [toggleFollow, { isLoading: followLoading }] =
    useToggleFollowPageMutation();

  // API returns BusinessPage directly, not wrapped in { page: ... }
  const page = pageData;
  const posts = postsData?.posts || [];

  const handleFollow = async () => {
    if (!page) return;
    try {
      await toggleFollow(pageId).unwrap();
    } catch (error) {
      console.error("Failed to toggle follow:", error);
    }
  };

  const handleMessage = () => {
    // TODO: Implement messaging
    console.log("Message page:", pageId);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: page?.businessTitle || "Business Page",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "Unknown";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  const formatNumber = (num: number | undefined | null) => {
    if (!num) return "0";
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  if (pageLoading) {
    return <PageSkeleton />;
  }

  if (pageError || !page) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Card>
          <CardContent className="py-16 text-center">
            <Building2 className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
            <p className="text-muted-foreground mb-4">
              This business page doesn&apos;t exist or may have been removed.
            </p>
            <Button onClick={() => router.push("/")}>Return Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Cover Image */}
      <div className="relative h-48 md:h-64 lg:h-80 bg-gray-200">
        {page.coverImageURL && (
          <Image
            src={page.coverImageURL}
            alt={`${page.businessTitle} cover`}
            fill
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/20" />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="absolute top-4 left-4 text-white hover:bg-white/20"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>

      {/* Profile Section */}
      <div className="container max-w-4xl mx-auto px-4">
        <div className="relative -mt-16 md:-mt-20 mb-6">
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            {/* Profile Image */}
            <div className="relative h-32 w-32 md:h-40 md:w-40 rounded-xl border-4 border-background bg-background overflow-hidden shadow-lg">
              {page.avatarURL ? (
                <Image
                  src={page.avatarURL}
                  alt={page.businessTitle}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Building2 className="h-16 w-16 text-white" />
                </div>
              )}
              {page.verificationStatus === "verified" && (
                <div className="absolute bottom-2 right-2 bg-blue-500 rounded-full p-1">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
              )}
            </div>

            {/* Page Info */}
            <div className="flex-1 pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl md:text-3xl font-bold">
                      {page.businessTitle}
                    </h1>
                    {page.verificationStatus === "verified" && (
                      <Badge
                        variant="secondary"
                        className="bg-blue-100 text-blue-700"
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  {page.tagline && (
                    <p className="text-muted-foreground mt-1">{page.tagline}</p>
                  )}
                  {page.industry && (
                    <Badge variant="outline" className="mt-2">
                      {page.industry}
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pb-2">
              <Button
                onClick={handleFollow}
                disabled={followLoading}
                variant={page.isFollowing ? "outline" : "default"}
              >
                {page.isFollowing ? "Following" : "Follow"}
              </Button>
              <Button variant="outline" onClick={handleMessage}>
                <MessageCircle className="h-4 w-4 mr-2" />
                Message
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleShare}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Page
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 mb-6 text-sm">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="font-semibold">
              {formatNumber(page.totalFollowers)}
            </span>
            <span className="text-muted-foreground">
              {pluralize(page.totalFollowers || 0, "follower")}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span className="font-semibold">
              {formatNumber(page.totalPosts)}
            </span>
            <span className="text-muted-foreground">
              {pluralize(page.totalPosts || 0, "post")}
            </span>
          </div>
          {page.teamSize && (
            <div className="flex items-center gap-1">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span className="font-semibold">{page.teamSize}</span>
              <span className="text-muted-foreground">
                {pluralize(page.teamSize || 0, "employee")}
              </span>
            </div>
          )}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="md:col-span-2 space-y-6">
                {/* Description */}
                {page.description && (
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="font-semibold mb-2">About</h3>
                      <p className="text-muted-foreground whitespace-pre-wrap">
                        {page.description}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Recent Posts */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Recent Posts</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setActiveTab("posts")}
                      >
                        View all
                      </Button>
                    </div>
                    {postsLoading ? (
                      <PostsSkeleton />
                    ) : posts.length > 0 ? (
                      <div className="space-y-4">
                        {posts.slice(0, 3).map((post) => (
                          <ApiPost key={post.id} post={post} />
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-center py-8">
                        No posts yet
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Contact Info */}
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-4">Contact</h3>
                    <div className="space-y-3">
                      {page.websiteUrl && (
                        <a
                          href={page.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                        >
                          <Globe className="h-4 w-4" />
                          {(() => {
                            try {
                              return new URL(page.websiteUrl).hostname;
                            } catch {
                              return page.websiteUrl;
                            }
                          })()}
                        </a>
                      )}
                      {page.contactPhone && (
                        <a
                          href={`tel:${page.contactPhone}`}
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                        >
                          <Phone className="h-4 w-4" />
                          {page.contactPhone}
                        </a>
                      )}
                      {page.contactEmail && (
                        <a
                          href={`mailto:${page.contactEmail}`}
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                        >
                          <Mail className="h-4 w-4" />
                          {page.contactEmail}
                        </a>
                      )}
                      {(page.primaryLocation || page.headquarterLocation) && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          {page.headquarterLocation || page.primaryLocation}
                        </div>
                      )}
                      {page.foundedYear && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          Founded {page.foundedYear}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Social Links */}
                {(page.socialFacebook ||
                  page.socialTwitter ||
                  page.socialLinkedin ||
                  page.socialInstagram) && (
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="font-semibold mb-4">Social Media</h3>
                      <div className="flex flex-wrap gap-2">
                        {page.socialFacebook && (
                          <a
                            href={page.socialFacebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                          >
                            <Facebook className="h-5 w-5 text-blue-600" />
                          </a>
                        )}
                        {page.socialTwitter && (
                          <a
                            href={page.socialTwitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                          >
                            <Twitter className="h-5 w-5 text-sky-500" />
                          </a>
                        )}
                        {page.socialLinkedin && (
                          <a
                            href={page.socialLinkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                          >
                            <Linkedin className="h-5 w-5 text-blue-700" />
                          </a>
                        )}
                        {page.socialInstagram && (
                          <a
                            href={page.socialInstagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                          >
                            <Instagram className="h-5 w-5 text-pink-600" />
                          </a>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="about" className="mt-6">
            <Card>
              <CardContent className="py-12 text-center">
                <div className="flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 flex items-center justify-center mb-4">
                    <Construction className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Coming Soon
                  </h3>
                  <p className="text-muted-foreground max-w-md">
                    Detailed company information, team members, milestones, and
                    more will be available here soon.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="posts" className="mt-6">
            {/* Create Post - Only for own page when operating as page */}
            {isOwnPage && (
              <Card className="mb-4">
                <CardContent className="p-6">
                  <CreatePostDialog />
                </CardContent>
              </Card>
            )}

            {postsLoading && !posts.length ? (
              <PostsSkeleton />
            ) : posts.length > 0 ? (
              <div className="space-y-4">
                {posts.map((post) => (
                  <ApiPost key={post.id} post={post} />
                ))}
                {postsData?.hasNext && (
                  <div className="flex justify-center pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setPostsPage((p) => p + 1)}
                      disabled={postsFetching}
                    >
                      {postsFetching ? "Loading..." : "Load More"}
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <Card>
                <CardContent className="py-16 text-center">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-semibold mb-2">No posts yet</h3>
                  <p className="text-muted-foreground">
                    {page.businessTitle} hasn&apos;t posted anything yet.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function PageSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <Skeleton className="h-48 md:h-64 lg:h-80 w-full" />
      <div className="container max-w-4xl mx-auto px-4">
        <div className="relative -mt-16 md:-mt-20 mb-6">
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            <Skeleton className="h-32 w-32 md:h-40 md:w-40 rounded-xl" />
            <div className="flex-1 pb-2 space-y-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="flex gap-2 pb-2">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-28" />
            </div>
          </div>
        </div>
        <div className="flex gap-6 mb-6">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-10 w-64 mb-6" />
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Skeleton className="h-48 w-full" />
          </div>
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    </div>
  );
}

function PostsSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-16 w-full mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
