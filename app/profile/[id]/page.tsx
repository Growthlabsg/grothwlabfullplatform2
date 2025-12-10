"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  useGetUserProfileQuery,
  useGetUserPostsQuery,
  useToggleFollowUserMutation,
  useSendConnectionRequestMutation,
} from "@/lib/redux";
import { useAuth } from "@/contexts/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  MapPin,
  Link as LinkIcon,
  Users,
  FileText,
  UserPlus,
  UserCheck,
  Clock,
  MessageSquare,
  MoreHorizontal,
  Share2,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { Post } from "@/components/feed/api-post";
import { toast } from "sonner";

export default function UserProfilePage() {
  const params = useParams();
  const router = useRouter();
  const userId = Number(params.id);
  const { user: currentUser } = useAuth();
  const [postsPage, setPostsPage] = useState(1);

  const {
    data: profile,
    isLoading: profileLoading,
    error: profileError,
  } = useGetUserProfileQuery(userId, {
    skip: !userId || isNaN(userId),
  });

  const {
    data: postsData,
    isLoading: postsLoading,
    isFetching: postsFetching,
  } = useGetUserPostsQuery(
    { userId, page: postsPage, limit: 10 },
    { skip: !userId || isNaN(userId) }
  );

  const [toggleFollow, { isLoading: isFollowing }] =
    useToggleFollowUserMutation();
  const [sendConnectionRequest, { isLoading: isConnecting }] =
    useSendConnectionRequestMutation();

  const isOwnProfile = currentUser?.id === userId;

  const handleFollow = async () => {
    try {
      await toggleFollow(userId).unwrap();
      toast.success(
        profile?.isFollowing
          ? "Unfollowed successfully"
          : "Following successfully"
      );
    } catch (error) {
      toast.error("Failed to update follow status");
    }
  };

  const handleConnect = async () => {
    try {
      await sendConnectionRequest(userId).unwrap();
      if (profile?.connectionStatus === "none") {
        toast.success("Connection request sent");
      } else if (profile?.connectionStatus === "pending_received") {
        toast.success("Connection accepted");
      } else {
        toast.success("Connection updated");
      }
    } catch (error) {
      toast.error("Failed to update connection status");
    }
  };

  const getConnectionButtonText = () => {
    if (!profile) return "Connect";
    switch (profile.connectionStatus) {
      case "connected":
        return "Connected";
      case "pending_sent":
        return "Pending";
      case "pending_received":
        return "Accept";
      default:
        return "Connect";
    }
  };

  const getConnectionButtonIcon = () => {
    if (!profile) return <UserPlus className="h-4 w-4 mr-2" />;
    switch (profile.connectionStatus) {
      case "connected":
        return <UserCheck className="h-4 w-4 mr-2" />;
      case "pending_sent":
        return <Clock className="h-4 w-4 mr-2" />;
      case "pending_received":
        return <UserPlus className="h-4 w-4 mr-2" />;
      default:
        return <UserPlus className="h-4 w-4 mr-2" />;
    }
  };

  if (profileLoading) {
    return (
      <div className="container mx-auto py-6 max-w-4xl">
        <div className="mb-6">
          <Skeleton className="h-8 w-24" />
        </div>
        <Card>
          <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600" />
          <CardContent className="pt-0">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12 mb-6">
              <Skeleton className="h-24 w-24 rounded-full border-4 border-white" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-64" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
            <div className="flex gap-6">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-24" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (profileError || !profile) {
    return (
      <div className="container mx-auto py-6 max-w-4xl">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Card>
          <CardContent className="py-12 text-center">
            <h2 className="text-xl font-semibold mb-2">User Not Found</h2>
            <p className="text-muted-foreground mb-4">
              The user you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => router.push("/feed")}>Go to Feed</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 max-w-4xl">
      {/* Back Button */}
      <Button variant="ghost" onClick={() => router.back()} className="mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      {/* Profile Header */}
      <Card className="mb-6 overflow-hidden">
        {/* Cover Image */}
        <div
          className="h-32 sm:h-48 bg-gradient-to-r from-blue-500 to-purple-600"
          style={
            profile.coverImageURL
              ? {
                  backgroundImage: `url(${profile.coverImageURL})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : undefined
          }
        />

        <CardContent className="pt-0">
          {/* Avatar and Basic Info */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12 sm:-mt-16 mb-6">
            <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-white dark:border-gray-900 shadow-lg">
              <AvatarImage src={profile.avatarURL} />
              <AvatarFallback className="text-2xl">
                {profile.firstName[0]}
                {profile.lastName[0]}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-bold">
                  {profile.firstName} {profile.lastName}
                </h1>
                {profile.isConnected && (
                  <Badge variant="secondary" className="text-xs">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Connected
                  </Badge>
                )}
              </div>
              {profile.headline && (
                <p className="text-muted-foreground mt-1">{profile.headline}</p>
              )}
              {profile.location && (
                <p className="text-sm text-muted-foreground flex items-center mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  {profile.location}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            {!isOwnProfile && (
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={profile.isFollowing ? "outline" : "default"}
                  onClick={handleFollow}
                  disabled={isFollowing}
                >
                  {profile.isFollowing ? "Following" : "Follow"}
                </Button>
                <Button
                  variant={
                    profile.connectionStatus === "connected"
                      ? "outline"
                      : "default"
                  }
                  onClick={handleConnect}
                  disabled={
                    isConnecting || profile.connectionStatus === "pending_sent"
                  }
                >
                  {getConnectionButtonIcon()}
                  {getConnectionButtonText()}
                </Button>
                <Button variant="outline" size="icon">
                  <MessageSquare className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            )}

            {isOwnProfile && (
              <Link href="/profile">
                <Button variant="outline">Edit Profile</Button>
              </Link>
            )}
          </div>

          {/* Stats */}
          <div className="flex gap-6 text-sm border-t pt-4">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="font-semibold">{profile.totalFollowers}</span>
              <span className="text-muted-foreground">Followers</span>
            </div>
            <div className="flex items-center gap-1">
              <UserCheck className="h-4 w-4 text-muted-foreground" />
              <span className="font-semibold">{profile.totalConnections}</span>
              <span className="text-muted-foreground">Connections</span>
            </div>
            <div className="flex items-center gap-1">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="font-semibold">{profile.totalPosts}</span>
              <span className="text-muted-foreground">Posts</span>
            </div>
          </div>

          {/* Bio */}
          {profile.bio && (
            <div className="mt-4 pt-4 border-t">
              <h3 className="font-semibold mb-2">About</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {profile.bio}
              </p>
            </div>
          )}

          {/* Links */}
          {profile.linkedInUrl && (
            <div className="mt-4 pt-4 border-t">
              <a
                href={profile.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline flex items-center gap-1"
              >
                <LinkIcon className="h-4 w-4" />
                LinkedIn Profile
              </a>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tabs for Posts/Activity */}
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="posts">
          {postsLoading ? (
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
          ) : postsData?.posts && postsData.posts.length > 0 ? (
            <div className="space-y-4">
              {postsData.posts.map((post: any) => (
                <Post key={post.id} post={post} />
              ))}
              {postsData.hasNext && (
                <div className="text-center py-4">
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
              <CardContent className="py-12 text-center">
                <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="font-semibold mb-2">No Posts Yet</h3>
                <p className="text-muted-foreground">
                  {isOwnProfile
                    ? "You haven't posted anything yet."
                    : `${profile.firstName} hasn't posted anything yet.`}
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardContent className="py-12 text-center">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="font-semibold mb-2">Activity Coming Soon</h3>
              <p className="text-muted-foreground">
                User activity feed will be available soon.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
