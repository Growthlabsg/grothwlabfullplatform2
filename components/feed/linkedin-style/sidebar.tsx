"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Bookmark,
  Users,
  Award,
  TrendingUp,
  Calendar,
  Building2,
  Check,
  Plus,
  Eye,
  Clock,
  Star,
  Target,
  Activity,
  Globe,
  Zap,
  X,
} from "lucide-react";
import {
  mockSkillsToEndorse,
  mockQuickStats,
  mockEvents,
  mockGroups,
  mockPostAnalytics,
  mockContentRecommendations,
  mockNetworkingSuggestions,
  type LinkedInSkill,
} from "@/lib/mock-linkedin-data";
import { toast } from "sonner";
import { usePageContext } from "@/contexts/page-context";
import {
  useGetUserStatsQuery,
  useGetPageStatsQuery,
  useSendConnectionRequestMutation,
  useCancelConnectionRequestMutation,
  useGetConnectionRecommendationsQuery,
  type ConnectionRecommendation,
} from "@/lib/redux";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { pluralize } from "@/lib/utils";

export function FeedSidebar() {
  const { activePageId, activePage, isOperatingAsPage } = usePageContext();
  const router = useRouter();

  // Connection request mutations
  const [sendConnectionRequest] = useSendConnectionRequestMutation();
  const [cancelConnectionRequest] = useCancelConnectionRequestMutation();

  // Fetch user stats when operating as user
  const { data: userStatsData, isLoading: isLoadingUserStats } =
    useGetUserStatsQuery(undefined, {
      skip: isOperatingAsPage,
    });

  // Fetch page stats when operating as page
  const { data: pageStatsData, isLoading: isLoadingPageStats } =
    useGetPageStatsQuery(activePageId!, {
      skip: !isOperatingAsPage || !activePageId,
    });

  // Fetch connection recommendations (only for users, not pages)
  const { data: recommendations, isLoading: isLoadingRecommendations } =
    useGetConnectionRecommendationsQuery(
      { recommendationType: "all", limit: 10 },
      { skip: isOperatingAsPage }
    );

  const [skills, setSkills] = useState<LinkedInSkill[]>(mockSkillsToEndorse);
  const [showAllPeople, setShowAllPeople] = useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [showAllRecommendations, setShowAllRecommendations] = useState(false);
  const [dismissedIds, setDismissedIds] = useState<number[]>([]);
  // Track pending connection requests (optimistic UI)
  const [pendingRequestIds, setPendingRequestIds] = useState<number[]>([]);

  const isLoadingStats = isOperatingAsPage
    ? isLoadingPageStats
    : isLoadingUserStats;

  // Filter out dismissed recommendations
  const filteredRecommendations =
    recommendations?.filter((rec) => !dismissedIds.includes(rec.id)) || [];

  const displayedPeople = showAllPeople
    ? filteredRecommendations
    : filteredRecommendations.slice(0, 3);

  const handleConnect = async (personId: number) => {
    // Optimistic update - immediately show as pending
    setPendingRequestIds((prev) => [...prev, personId]);
    toast.success("Connection request sent!");

    try {
      await sendConnectionRequest({
        connectionRequestReceiverID: personId,
      }).unwrap();
      // Keep the user in the list with "Pending" state
    } catch (error: any) {
      // Revert optimistic update on error
      setPendingRequestIds((prev) => prev.filter((id) => id !== personId));
      const message =
        error?.data?.detail || "Failed to send connection request";
      toast.error(message);
    }
  };

  const handleDismiss = (personId: number) => {
    setDismissedIds((prev) => [...prev, personId]);
  };

  const handleViewProfile = (personId: number) => {
    // Navigate to the user's profile page
    router.push(`/profile/${personId}`);
  };

  const handleJoinEvent = (eventId: string) => {
    toast.success("Joined event successfully!");
  };

  const handleJoinGroup = (groupId: string) => {
    toast.success("Joined group successfully!");
  };

  const handleFollowRecommendation = (recommendationId: string) => {
    toast.success("Content recommendation followed!");
  };

  const getOnlineStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      case "offline":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  const getConnectionStrengthColor = (strength: number) => {
    if (strength >= 4) return "text-green-600";
    if (strength >= 3) return "text-blue-600";
    if (strength >= 2) return "text-yellow-600";
    return "text-gray-500";
  };

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case "expert":
        return "text-red-600";
      case "intermediate":
        return "text-blue-600";
      case "beginner":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const displayedSkills = showAllSkills ? skills : skills.slice(0, 2);
  const displayedContentRecommendations = showAllRecommendations
    ? mockContentRecommendations
    : mockContentRecommendations.slice(0, 2);

  return (
    <div className="space-y-4 max-w-full overflow-hidden">
      {/* Profile Card */}
      <Card>
        {isLoadingStats ? (
          // Skeleton loader for profile card
          <div>
            <Skeleton className="h-24 w-full rounded-t-lg" />
            <CardContent className="pt-12 pb-4">
              <div className="absolute -mt-16 ml-0">
                <Skeleton className="h-20 w-20 rounded-full" />
              </div>
              <div className="space-y-3 mt-6">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-48" />
                <div className="pt-2 border-t space-y-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            </CardContent>
          </div>
        ) : (
          <>
            <div className="relative h-24 w-full bg-gradient-to-r from-primary/30 to-primary/10 rounded-t-lg">
              {isOperatingAsPage && pageStatsData?.page?.coverImageURL ? (
                <img
                  src={pageStatsData.page.coverImageURL}
                  alt="Cover"
                  className="w-full h-full object-cover rounded-t-lg"
                />
              ) : userStatsData?.user?.coverImageURL ? (
                <img
                  src={userStatsData.user.coverImageURL}
                  alt="Cover"
                  className="w-full h-full object-cover rounded-t-lg"
                />
              ) : null}
              <div className="absolute -bottom-10 left-4">
                <Avatar className="h-20 w-20 border-4 border-background">
                  <AvatarImage
                    src={
                      isOperatingAsPage
                        ? pageStatsData?.page?.avatarURL ||
                          activePage?.avatarURL
                        : userStatsData?.user?.avatarURL ||
                          "/abstract-geometric-shapes.png"
                    }
                    alt={isOperatingAsPage ? activePage?.businessTitle : "User"}
                  />
                  <AvatarFallback>
                    {isOperatingAsPage
                      ? activePage?.businessTitle
                          ?.substring(0, 2)
                          .toUpperCase() || "BP"
                      : userStatsData?.user?.firstName?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
            <CardContent className="pt-12 pb-4">
              <div className="space-y-3">
                <div>
                  {isOperatingAsPage ? (
                    <Link
                      href={`/business/${activePageId}`}
                      className="hover:underline"
                    >
                      <h3 className="font-semibold text-lg">
                        {pageStatsData?.page?.businessTitle ||
                          activePage?.businessTitle ||
                          "Business Page"}
                      </h3>
                    </Link>
                  ) : (
                    <Link href="/profile" className="hover:underline">
                      <h3 className="font-semibold text-lg">
                        {userStatsData?.user
                          ? `${userStatsData.user.firstName} ${userStatsData.user.lastName}`
                          : "Your Name"}
                      </h3>
                    </Link>
                  )}
                  <p className="text-sm text-muted-foreground">
                    {isOperatingAsPage
                      ? pageStatsData?.page?.headline || "Business Page"
                      : userStatsData?.user?.headline || "Add a headline"}
                  </p>
                </div>
                <div className="pt-2 border-t">
                  {isOperatingAsPage ? (
                    // Page stats
                    <>
                      <div className="flex justify-between text-sm py-1">
                        <span className="text-muted-foreground">
                          Page views
                        </span>
                        <span className="font-medium text-primary">
                          {pageStatsData?.stats?.pageViews || 0}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm py-1">
                        <span className="text-muted-foreground">
                          Post impressions
                        </span>
                        <span className="font-medium text-primary">
                          {pageStatsData?.stats?.postImpressions || 0}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm py-1">
                        <span className="text-muted-foreground">
                          Search appearances
                        </span>
                        <span className="font-medium text-primary">
                          {pageStatsData?.stats?.searchAppearances || 0}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm py-1">
                        <span className="text-muted-foreground">Followers</span>
                        <span className="font-medium text-primary">
                          {pageStatsData?.stats?.totalFollowers || 0}
                        </span>
                      </div>
                    </>
                  ) : (
                    // User stats
                    <>
                      <div className="flex justify-between text-sm py-1">
                        <span className="text-muted-foreground">
                          Profile views
                        </span>
                        <span className="font-medium text-primary">
                          {userStatsData?.stats?.profileViews || 0}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm py-1">
                        <span className="text-muted-foreground">
                          Post impressions
                        </span>
                        <span className="font-medium text-primary">
                          {userStatsData?.stats?.postImpressions || 0}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm py-1">
                        <span className="text-muted-foreground">
                          Search appearances
                        </span>
                        <span className="font-medium text-primary">
                          {userStatsData?.stats?.searchAppearances || 0}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm py-1">
                        <span className="text-muted-foreground">
                          Connections
                        </span>
                        <span className="font-medium text-primary">
                          {userStatsData?.stats?.totalConnections || 0}
                        </span>
                      </div>
                    </>
                  )}
                </div>
                <div className="pt-2 border-t">
                  <Link
                    href="/feed/saved"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center cursor-pointer"
                  >
                    <Bookmark className="h-4 w-4 inline-block mr-2" />
                    <span>My items</span>
                  </Link>
                </div>
              </div>
            </CardContent>
          </>
        )}
      </Card>

      {/* Enhanced LinkedIn-style Quick Stats */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-blue-600" />
            Quick Stats
          </h3>
          {isLoadingStats ? (
            <div className="space-y-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex items-center justify-between py-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-12" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between py-1">
                <span className="text-sm text-muted-foreground">
                  Total Posts
                </span>
                <span className="font-semibold text-blue-600">
                  {isOperatingAsPage
                    ? pageStatsData?.stats?.totalPosts || 0
                    : userStatsData?.stats?.totalPosts || 0}
                </span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-sm text-muted-foreground">
                  Total Likes
                </span>
                <span className="font-semibold text-green-600">
                  {isOperatingAsPage
                    ? pageStatsData?.stats?.totalLikes || 0
                    : userStatsData?.stats?.totalLikes || 0}
                </span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-sm text-muted-foreground">
                  Total Comments
                </span>
                <span className="font-semibold text-purple-600">
                  {isOperatingAsPage
                    ? pageStatsData?.stats?.totalComments || 0
                    : userStatsData?.stats?.totalComments || 0}
                </span>
              </div>
              {!isOperatingAsPage && (
                <div className="flex items-center justify-between py-1">
                  <span className="text-sm text-muted-foreground">
                    Verified Connections
                  </span>
                  <span className="font-semibold text-orange-600">
                    {userStatsData?.stats?.verifiedConnections || 0}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between py-1">
                <span className="text-sm text-muted-foreground">
                  Weekly Growth
                </span>
                <span className="font-semibold text-green-600">
                  +
                  {isOperatingAsPage
                    ? pageStatsData?.stats?.weeklyGrowth || 0
                    : userStatsData?.stats?.weeklyGrowth || 0}
                  %
                </span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-sm text-muted-foreground">
                  Engagement Rate
                </span>
                <span className="font-semibold text-blue-600">
                  {isOperatingAsPage
                    ? pageStatsData?.stats?.engagementRate || 0
                    : userStatsData?.stats?.engagementRate || 0}
                  %
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Enhanced LinkedIn-style People You May Know - Only show for users, not pages */}
      {!isOperatingAsPage && (
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-600" />
              People you may know
            </h3>
            {isLoadingRecommendations ? (
              // Skeleton loader for people cards
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
                      <div className="flex-1 min-w-0 space-y-2">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-3 w-36" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Skeleton className="h-7 flex-1 rounded" />
                      <Skeleton className="h-7 flex-1 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : displayedPeople.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No recommendations available
              </p>
            ) : (
              <div className="space-y-3">
                {displayedPeople.map((person) => (
                  <div
                    key={person.id}
                    className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg relative group"
                  >
                    {/* Dismiss button */}
                    <button
                      onClick={() => handleDismiss(person.id)}
                      className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Dismiss"
                    >
                      <X className="h-3 w-3 text-gray-400" />
                    </button>

                    {/* Person Info - Clickable Avatar and Name */}
                    <div className="flex items-start gap-3">
                      <Link
                        href={`/profile/${person.id}`}
                        className="relative flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={person.avatarURL || undefined}
                            alt={`${person.firstName} ${person.lastName}`}
                          />
                          <AvatarFallback>
                            {person.firstName?.[0]}
                            {person.lastName?.[0]}
                          </AvatarFallback>
                        </Avatar>
                      </Link>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1 mb-1">
                          <Link
                            href={`/profile/${person.id}`}
                            className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate hover:text-blue-600 hover:underline cursor-pointer"
                          >
                            {person.firstName} {person.lastName}
                          </Link>
                          {person.isVerified && (
                            <Check className="h-3 w-3 text-blue-600 flex-shrink-0" />
                          )}
                        </div>
                        {person.headline && (
                          <p className="text-xs text-muted-foreground truncate mb-1">
                            {person.headline}
                          </p>
                        )}
                        {person.mutualConnectionsCount > 0 && (
                          <p className="text-xs text-blue-600 mb-1">
                            {person.mutualConnectionsCount} mutual{" "}
                            {pluralize(
                              person.mutualConnectionsCount,
                              "connection"
                            )}
                          </p>
                        )}
                        {person.connectionReason && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {person.connectionReason}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Mutual Connections Preview */}
                    {person.mutualConnections &&
                      person.mutualConnections.length > 0 && (
                        <div className="flex items-center gap-1 mt-2 ml-13">
                          <div className="flex -space-x-2">
                            {person.mutualConnections
                              .slice(0, 3)
                              .map((mutual) => (
                                <Avatar
                                  key={mutual.id}
                                  className="h-5 w-5 border-2 border-white dark:border-gray-800"
                                >
                                  <AvatarImage
                                    src={mutual.avatarURL || undefined}
                                  />
                                  <AvatarFallback className="text-[8px]">
                                    {mutual.firstName?.[0]}
                                    {mutual.lastName?.[0]}
                                  </AvatarFallback>
                                </Avatar>
                              ))}
                          </div>
                        </div>
                      )}

                    {/* Action Buttons - At the bottom in flex layout */}
                    <div className="flex gap-2 mt-3">
                      {pendingRequestIds.includes(person.id) ? (
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 text-xs h-8 text-muted-foreground"
                          disabled
                        >
                          <Clock className="h-3 w-3 mr-1" />
                          Pending
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 text-xs h-8"
                          onClick={() => handleConnect(person.id)}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Connect
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="flex-1 text-xs h-8"
                        onClick={() => handleViewProfile(person.id)}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {!isLoadingRecommendations &&
              filteredRecommendations.length > 3 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full mt-3"
                  onClick={() => setShowAllPeople(!showAllPeople)}
                >
                  {showAllPeople
                    ? "Show Less"
                    : `Show ${filteredRecommendations.length - 3} More`}
                </Button>
              )}
          </CardContent>
        </Card>
      )}

      {/* Enhanced LinkedIn-style Skills to Endorse */}
      {/* <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Award className="h-4 w-4 text-orange-600" />
            Skills you can endorse
          </h3>
          <div className="space-y-3">
            {displayedSkills.map((skill) => (
              <div key={skill.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      {skill.personName}
                    </p>
                    <p className="text-xs text-muted-foreground mb-2">
                      {skill.skill}
                    </p>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-xs text-blue-600">
                        {skill.mutualConnections} mutual {pluralize(skill.mutualConnections, "connection")}
                      </p>
                      <Badge
                        variant="outline"
                        className={`text-xs ${getSkillLevelColor(
                          skill.skillLevel
                        )}`}
                      >
                        {skill.skillLevel}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        {skill.endorsementCount} endorsements
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Building2 className="h-3 w-3" />
                        {skill.category}
                      </span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant={skill.endorsed ? "default" : "outline"}
                    className={`text-xs h-7 px-2 flex-shrink-0 whitespace-nowrap min-w-[70px] ${
                      skill.endorsed ? "bg-green-600 hover:bg-green-700" : ""
                    }`}
                    onClick={() => handleEndorse(skill.id)}
                    disabled={skill.endorsed}
                  >
                    {skill.endorsed ? (
                      <Check className="h-3 w-3 mr-1" />
                    ) : (
                      <Plus className="h-3 w-3 mr-1" />
                    )}
                    {skill.endorsed ? "Endorsed" : "Endorse"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
          {skills.length > 2 && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full mt-2"
              onClick={() => setShowAllSkills(!showAllSkills)}
            >
              {showAllSkills ? "Show Less" : `Show ${skills.length - 2} More`}
            </Button>
          )}
        </CardContent>
      </Card> */}

      {/* Content Recommendations */}
      {/* <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Zap className="h-4 w-4 text-yellow-600" />
            Recommended for you
          </h3>
          <div className="space-y-3">
            {displayedContentRecommendations.map((rec) => (
              <div key={rec.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    {rec.type === "article" && (
                      <Globe className="h-4 w-4 text-blue-600" />
                    )}
                    {rec.type === "video" && (
                      <Eye className="h-4 w-4 text-red-600" />
                    )}
                    {rec.type === "podcast" && (
                      <Activity className="h-4 w-4 text-purple-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">
                      {rec.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {rec.author}
                    </p>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs text-blue-600">
                        {rec.type === "article" ? rec.readTime : rec.duration}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {rec.category}
                      </Badge>
                      <span className="text-xs text-green-600">
                        {rec.relevance}% match
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{rec.reason}</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs h-6 px-2 w-full min-w-0"
                  onClick={() => handleFollowRecommendation(rec.id)}
                >
                  Follow
                </Button>
              </div>
            ))}
          </div>
          {mockContentRecommendations.length > 2 && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full mt-3"
              onClick={() => setShowAllRecommendations(!showAllRecommendations)}
            >
              {showAllRecommendations
                ? "Show Less"
                : `Show ${mockContentRecommendations.length - 2} More`}
            </Button>
          )}
        </CardContent>
      </Card> */}

      {/* Enhanced Recent Events */}
      {/* <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-blue-600" />
            Upcoming Events
          </h3>
          <div className="space-y-3">
            {mockEvents.map((event) => (
              <div key={event.id} className="flex items-start gap-3">
                <div className="bg-primary/10 text-primary rounded-md p-2 flex flex-col items-center justify-center min-w-[48px]">
                  <span className="text-xs font-medium">
                    {event.date === "Tomorrow"
                      ? "TOM"
                      : event.date?.split(" ")[0]?.toUpperCase() || ""}
                  </span>
                  <span className="text-lg font-bold">
                    {event.date === "Tomorrow"
                      ? "24"
                      : event.date?.split(" ")[1] || ""}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{event.title}</h4>
                  <p className="text-xs text-muted-foreground">
                    {event.time} • {event.location}
                  </p>
                  <p className="text-xs text-blue-600">
                    {event.attendees} attending
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <Badge
                      variant="outline"
                      className="text-xs bg-secondary/10 text-secondary-foreground"
                    >
                      {event.category}
                    </Badge>
                    {event.featured && (
                      <Badge
                        variant="outline"
                        className="text-xs bg-yellow-100 text-yellow-800"
                      >
                        Featured
                      </Badge>
                    )}
                    {event.virtual && (
                      <Badge
                        variant="outline"
                        className="text-xs bg-purple-100 text-purple-800"
                      >
                        Virtual
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-gray-600 flex items-center gap-1">
                      <Building2 className="h-3 w-3" />
                      {event.organizer}
                    </span>
                    <span className="text-xs text-gray-600 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {event.price}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 text-xs h-6 px-2 min-w-[50px]"
                    onClick={() => handleJoinEvent(event.id)}
                  >
                    Join
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Button variant="ghost" size="sm" className="w-full mt-2">
            View all events
          </Button>
        </CardContent>
      </Card> */}

      {/* Enhanced Groups */}
      {/* <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-600" />
              Groups
            </h3>
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <Users className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-3">
            {mockGroups.map((group) => (
              <div key={group.id} className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={group.avatar} alt={group.name} />
                  <AvatarFallback>
                    {group.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="text-sm font-medium">{group.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {group.members.toLocaleString()} members
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-blue-600 flex items-center gap-1">
                      <Activity className="h-3 w-3" />
                      {group.activeMembers} active
                    </span>
                    <span className="text-xs text-gray-600 flex items-center gap-1">
                      <Globe className="h-3 w-3" />
                      {group.privacy}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    {group.recentActivity}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs h-6 px-2 min-w-[50px] flex-shrink-0"
                  onClick={() => handleJoinGroup(group.id)}
                >
                  Join
                </Button>
              </div>
            ))}
          </div>
          <Button variant="ghost" size="sm" className="w-full mt-2">
            See all groups
          </Button>
        </CardContent>
      </Card> */}
    </div>
  );
}

export const LinkedInStyleSidebar = FeedSidebar;

export const Sidebar = FeedSidebar;
