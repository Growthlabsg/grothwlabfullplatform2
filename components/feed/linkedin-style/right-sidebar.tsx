"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Info,
  TrendingUp,
  Plus,
  Crown,
  GraduationCap,
  Building2,
  Newspaper,
  Bell,
  Check,
  Eye,
  Bookmark,
  Clock,
  Star,
  Users,
  Target,
  Zap,
  TrendingDown,
  AlertTriangle,
  Calendar,
  Globe,
  Award,
  Activity,
  MessageSquare,
  Filter,
  RefreshCw,
  BarChart3,
  Brain,
  Settings,
  Hash,
  Flame,
  Loader2,
} from "lucide-react";
import {
  mockTrendingTopics,
  mockCompanies,
  mockLearningContent,
  mockJobs,
  mockTrendingNews,
  mockPostAnalytics,
  mockContentRecommendations,
  mockNetworkingSuggestions,
  type LinkedInTrendingTopic,
  type LinkedInCompany,
  type LinkedInLearning,
  type LinkedInJob,
} from "@/lib/mock-linkedin-data";
import { toast } from "sonner";
import { useGetTrendingTopicsQuery } from "@/lib/redux/feedApi";

export function FeedRightSidebar() {
  const [topics, setTopics] =
    useState<LinkedInTrendingTopic[]>(mockTrendingTopics);
  const [companies, setCompanies] = useState<LinkedInCompany[]>(mockCompanies);
  const [learning, setLearning] =
    useState<LinkedInLearning[]>(mockLearningContent);
  const [jobs, setJobs] = useState<LinkedInJob[]>(mockJobs);
  const [followedCompanies, setFollowedCompanies] = useState<Set<string>>(
    new Set()
  );
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());
  const [showAllTopics, setShowAllTopics] = useState(false);
  const [showAllJobs, setShowAllJobs] = useState(false);
  const [showAllLearning, setShowAllLearning] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  // Fetch trending topics from API
  const {
    data: trendingTopics,
    isLoading: isTrendingLoading,
    refetch: refetchTrending,
  } = useGetTrendingTopicsQuery({ days: 7, limit: 10 });

  // Feed Preferences and Filter State
  const [filter, setFilter] = useState<
    "all" | "trending" | "recent" | "following"
  >("all");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [sortBy, setSortBy] = useState<
    "recent" | "trending" | "engagement" | "relevance"
  >("recent");
  const [timeRange, setTimeRange] = useState<
    "all" | "today" | "week" | "month"
  >("all");
  const [feedPreferences, setFeedPreferences] = useState({
    showSponsored: true,
    showPromoted: true,
    autoRefresh: false,
    smartSorting: true,
  });

  // Additional Control State
  const [viewMode, setViewMode] = useState<"feed" | "analytics">("feed");
  const [showInsights, setShowInsights] = useState(false);
  const [showAIFeatures, setShowAIFeatures] = useState(false);
  const [liveUpdates, setLiveUpdates] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleFollowCompany = (companyId: string) => {
    setFollowedCompanies((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(companyId)) {
        newSet.delete(companyId);
        toast.success("Unfollowed company");
      } else {
        newSet.add(companyId);
        toast.success("Following company");
      }
      return newSet;
    });
  };

  const handleFilterChange = (
    newFilter: "all" | "trending" | "recent" | "following"
  ) => {
    setFilter(newFilter);
    toast.success(`Filter changed to ${newFilter}`);
  };

  const toggleFeedPreference = (preference: keyof typeof feedPreferences) => {
    setFeedPreferences((prev) => ({
      ...prev,
      [preference]: !prev[preference],
    }));
    toast.success(`Feed preference updated`);
  };

  const clearFilters = () => {
    setFilter("all");
    setSortBy("recent");
    setTimeRange("all");
    toast.success("All filters cleared");
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Feed refreshed");
    }, 1000);
  };

  const handleViewModeToggle = () => {
    setViewMode(viewMode === "feed" ? "analytics" : "feed");
    toast.success(
      `Switched to ${viewMode === "feed" ? "Analytics" : "Feed"} view`
    );
  };

  const handleInsightsToggle = () => {
    setShowInsights(!showInsights);
    toast.success(`Insights ${showInsights ? "hidden" : "shown"}`);
  };

  const handleAIFeaturesToggle = () => {
    setShowAIFeatures(!showAIFeatures);
    toast.success(`AI Features ${showAIFeatures ? "disabled" : "enabled"}`);
  };

  const handleLiveUpdatesToggle = () => {
    setLiveUpdates(!liveUpdates);
    toast.success(`Live Updates ${liveUpdates ? "disabled" : "enabled"}`);
  };

  const handleSaveJob = (jobId: string) => {
    setSavedJobs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
        toast.success("Job removed from saved");
      } else {
        newSet.add(jobId);
        toast.success("Job saved successfully");
      }
      return newSet;
    });
  };

  const handleApplyJob = (jobId: string) => {
    toast.success("Application submitted successfully!");
  };

  const handleViewCompany = (companyId: string) => {
    setSelectedCompany(selectedCompany === companyId ? null : companyId);
    const company = companies.find((c) => c.id === companyId);
    toast.info(`Viewing ${company?.name}'s company page`);
  };

  const handleViewLearning = (learningId: string) => {
    const course = learning.find((l) => l.id === learningId);
    toast.info(`Starting ${course?.title}`);
  };

  const handleTopicClick = (topic: LinkedInTrendingTopic) => {
    setSelectedTopic(selectedTopic === topic.id ? null : topic.id);
    toast.info(`Searching for posts with ${topic.tag}`);
  };

  const getGrowthColor = (growth: string) => {
    const value = parseFloat(growth.replace("+", "").replace("%", ""));
    if (value > 15) return "text-green-600";
    if (value > 10) return "text-blue-600";
    if (value > 5) return "text-yellow-600";
    return "text-gray-600";
  };

  const getUrgencyColor = (urgent: boolean) => {
    return urgent ? "text-red-600" : "text-gray-600";
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
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

  const displayedTopics = showAllTopics ? topics : topics.slice(0, 4);
  const displayedJobs = showAllJobs ? jobs : jobs.slice(0, 3);
  const displayedLearning = showAllLearning ? learning : learning.slice(0, 3);

  return (
    <div className="space-y-4 max-w-full overflow-hidden">
      {/* Feed Controls */}
      {/* <Card className="bg-white border border-gray-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold flex items-center gap-2 text-gray-800">
              <Settings className="h-4 w-4" />
              Feed Controls
            </h3>
          </div>
          
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`w-full justify-start gap-2 ${showAdvancedFilters ? 'bg-blue-100 text-blue-700 border-blue-300' : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'}`}
            >
              <Filter className="h-4 w-4" />
              Advanced Filters
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="w-full justify-start gap-2 bg-white hover:bg-gray-50 text-gray-700 border-gray-300 disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleViewModeToggle}
              className="w-full justify-start gap-2 bg-white hover:bg-gray-50 text-gray-700 border-gray-300"
            >
              <BarChart3 className="h-4 w-4" />
              {viewMode === "feed" ? "Analytics" : "Feed"}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleInsightsToggle}
              className={`w-full justify-start gap-2 ${showInsights ? 'bg-purple-100 text-purple-700 border-purple-300' : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'}`}
            >
              <Target className="h-4 w-4" />
              Insights
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleAIFeaturesToggle}
              className={`w-full justify-start gap-2 ${showAIFeatures ? 'bg-purple-100 text-purple-700 border-purple-300' : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'}`}
            >
              <Brain className="h-4 w-4" />
              AI Features
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleLiveUpdatesToggle}
              className={`w-full justify-start gap-2 ${liveUpdates ? 'bg-green-100 text-green-700 border-green-300' : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'}`}
            >
              <Zap className="h-4 w-4" />
              {liveUpdates ? 'Live On' : 'Live Updates'}
            </Button>
          </div>
        </CardContent>
      </Card> */}

      {/* Feed Filter Options */}
      {/* <Card className="bg-white border border-gray-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold flex items-center gap-2 text-gray-800">
              <Filter className="h-4 w-4" />
              Feed Filters
            </h3>
          </div>

          <div className="space-y-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterChange("all")}
              className={`w-full justify-start ${
                filter === "all"
                  ? "bg-[#0F7377] hover:bg-[#0F7377]/90 text-white"
                  : "bg-white hover:bg-gray-50 text-gray-700 border-gray-300"
              }`}
            >
              All Posts
            </Button>
            <Button
              variant={filter === "trending" ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterChange("trending")}
              className={`w-full justify-start ${
                filter === "trending"
                  ? "bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-white"
                  : "bg-white hover:bg-gray-50 text-gray-700 border-gray-300"
              }`}
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Trending
            </Button>
            <Button
              variant={filter === "recent" ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterChange("recent")}
              className={`w-full justify-start ${
                filter === "recent"
                  ? "bg-[#0F7377] hover:bg-[#0F7377]/90 text-white"
                  : "bg-white hover:bg-gray-50 text-gray-700 border-gray-300"
              }`}
            >
              <Clock className="h-4 w-4 mr-2" />
              Recent
            </Button>
            <Button
              variant={filter === "following" ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterChange("following")}
              className={`w-full justify-start ${
                filter === "following"
                  ? "bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-white"
                  : "bg-white hover:bg-gray-50 text-gray-700 border-gray-300"
              }`}
            >
              <Users className="h-4 w-4 mr-2" />
              Following
            </Button>
          </div>
        </CardContent>
      </Card> */}

      {/* Feed Preferences */}
      {/* <Card className="bg-gray-50 border border-gray-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold flex items-center gap-2 text-gray-800">
              <Settings className="h-4 w-4" />
              Feed Preferences
            </h3>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="text-xs h-7 px-2"
              >
                {showAdvancedFilters ? "Hide" : "Show"} Advanced
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-xs h-7 px-2"
              >
                Clear All
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={feedPreferences.showSponsored}
                onChange={() => toggleFeedPreference("showSponsored")}
                className="rounded border-gray-300"
              />
              <span className="text-xs text-gray-600">Show Sponsored</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={feedPreferences.showPromoted}
                onChange={() => toggleFeedPreference("showPromoted")}
                className="rounded border-gray-300"
              />
              <span className="text-xs text-gray-600">Show Promoted</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={feedPreferences.autoRefresh}
                onChange={() => toggleFeedPreference("autoRefresh")}
                className="rounded border-gray-300"
              />
              <span className="text-xs text-gray-600">Auto-refresh</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={feedPreferences.smartSorting}
                onChange={() => toggleFeedPreference("smartSorting")}
                className="rounded border-gray-300"
              />
              <span className="text-xs text-gray-600">Smart sorting</span>
            </label>
          </div>

          {showAdvancedFilters && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <h4 className="font-medium text-sm text-blue-800 mb-2">
                Advanced Filters
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-blue-700 font-medium">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full text-xs border border-blue-200 rounded px-2 py-1 mt-1"
                  >
                    <option value="recent">Recent</option>
                    <option value="trending">Trending</option>
                    <option value="engagement">Engagement</option>
                    <option value="relevance">Relevance</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-blue-700 font-medium">
                    Time Range
                  </label>
                  <select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value as any)}
                    className="w-full text-xs border border-blue-200 rounded px-2 py-1 mt-1"
                  >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card> */}

      {/* Enhanced LinkedIn-style Trending Topics */}
      {/* <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-600" />
            Trending Topics
          </h3>
          <div className="space-y-2">
            {displayedTopics.map((topic) => (
              <div
                key={topic.id}
                className="p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => handleTopicClick(topic.id)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">
                    {topic.tag}
                  </span>
                  <span className="text-xs text-blue-600">
                    {topic.postCount} posts
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-green-600">
                    {topic.engagement} engagement
                  </span>
                  <span className={`text-xs ${getGrowthColor(topic.trend)}`}>
                    {topic.trend}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <Badge variant="outline" className="text-xs">
                    {topic.category}
                  </Badge>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {topic.influencerCount} influencers
                  </span>
                </div>
                {selectedTopic === topic.id && (
                  <div className="mt-2 p-2 bg-blue-50 rounded border-l-4 border-blue-400">
                    <p className="text-xs text-blue-800 font-medium">
                      Topic Insights:
                    </p>
                    <div className="space-y-2 mt-2">
                      <p className="text-xs text-blue-700 flex items-center gap-1">
                        <Target className="h-3 w-3" />
                        {topic.topPosts} top posts • {topic.growthRate}% growth
                        rate
                      </p>
                      <p className="text-xs text-blue-700 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Last updated: {topic.lastUpdated}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        <span className="text-xs text-blue-700 font-medium">
                          Related:
                        </span>
                        {topic.relatedTopics
                          .slice(0, 3)
                          .map((related, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs bg-blue-100 text-blue-800"
                            >
                              {related}
                            </Badge>
                          ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          {topics.length > 4 && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full mt-2"
              onClick={() => setShowAllTopics(!showAllTopics)}
            >
              {showAllTopics ? "Show Less" : `Show ${topics.length - 4} More`}
            </Button>
          )}
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Click on any topic to search for related posts
          </p>
        </CardContent>
      </Card> */}

      {/* Enhanced LinkedIn-style Company Insights */}
      {/* <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Building2 className="h-4 w-4 text-blue-600" />
            Company insights
          </h3>
          <div className="space-y-3">
            {companies.map((company) => (
              <div key={company.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={company.logo} alt={company.name} />
                      <AvatarFallback>
                        {company.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h4 className="text-sm font-medium text-gray-900">
                      {company.name}
                    </h4>
                    {company.verified && (
                      <Check className="h-3 w-3 text-blue-600" />
                    )}
                  </div>
                  <span className={`text-xs ${getGrowthColor(company.growth)}`}>
                    {company.growth}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  {company.industry}
                </p>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs text-blue-600">
                    {company.followers.toLocaleString()} followers
                  </span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-500">
                    {company.employeeCount} employees
                  </span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-500">
                    Founded {company.founded}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-2">
                  {company.recentUpdate}
                </p>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs text-green-600 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {company.engagementRate}% engagement
                  </span>
                  <span className="text-xs text-blue-600 flex items-center gap-1">
                    <Newspaper className="h-3 w-3" />
                    {company.recentPosts} recent posts
                  </span>
                </div>
                {selectedCompany === company.id && (
                  <div className="mt-2 p-2 bg-blue-50 rounded border-l-4 border-blue-400">
                    <p className="text-xs text-blue-800 font-medium">
                      Company Details:
                    </p>
                    <div className="space-y-2 mt-2">
                      <p className="text-xs text-blue-700 flex items-center gap-1">
                        <Globe className="h-3 w-3" />
                        {company.website}
                      </p>
                      <p className="text-xs text-blue-700 flex items-center gap-1">
                        <Building2 className="h-3 w-3" />
                        {company.headquarters}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        <span className="text-xs text-blue-700 font-medium">
                          Top Skills:
                        </span>
                        {company.topSkills.slice(0, 3).map((skill, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs bg-blue-100 text-blue-800"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex gap-2 mt-2">
                  <Button
                    size="sm"
                    variant={
                      followedCompanies.has(company.id) ? "default" : "outline"
                    }
                    className={`text-xs h-6 px-2 min-w-[70px] flex-shrink-0 ${
                      followedCompanies.has(company.id)
                        ? "bg-blue-600 hover:bg-blue-700"
                        : ""
                    }`}
                    onClick={() => handleFollowCompany(company.id)}
                  >
                    {followedCompanies.has(company.id) ? (
                      <Check className="h-3 w-3 mr-1" />
                    ) : (
                      <Plus className="h-3 w-3 mr-1" />
                    )}
                    {followedCompanies.has(company.id) ? "Following" : "Follow"}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-xs h-6 px-2 min-w-[50px] flex-shrink-0"
                    onClick={() => handleViewCompany(company.id)}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    {selectedCompany === company.id ? "Hide" : "View"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card> */}

      {/* Enhanced LinkedIn-style Learning Recommendations */}
      {/* <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-purple-600" />
            Learning for you
          </h3>
          <div className="space-y-3">
            {displayedLearning.map((course) => (
              <div key={course.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarImage src={course.thumbnail} alt={course.title} />
                    <AvatarFallback>
                      {course.title
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className="flex-1 min-w-0"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    <div style={{ marginBottom: "8px" }}>
                      <h4
                        className="text-sm font-medium text-gray-900"
                        style={{ margin: 0, padding: 0 }}
                      >
                        {course.title}
                      </h4>
                      <p
                        className="text-xs text-muted-foreground"
                        style={{ margin: 0, padding: 0 }}
                      >
                        {course.instructor}
                      </p>
                    </div>

                    <div
                      className="flex items-center gap-2"
                      style={{ marginBottom: "8px" }}
                    >
                      <span className="text-xs text-blue-600">
                        {course.duration}
                      </span>
                      <Badge
                        variant="outline"
                        className={`text-xs ${getDifficultyColor(
                          course.difficulty
                        )}`}
                      >
                        {course.difficulty}
                      </Badge>
                      {course.certificates && (
                        <Badge
                          variant="outline"
                          className="text-xs bg-green-100 text-green-800 flex items-center gap-1"
                        >
                          <Award className="h-3 w-3" />
                          Certificate
                        </Badge>
                      )}
                    </div>

                    <div
                      className="flex items-center gap-3"
                      style={{ marginBottom: "8px" }}
                    >
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i < Math.floor(course.rating)
                                ? "bg-yellow-400"
                                : "bg-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {course.rating}
                      </span>
                      <span className="text-xs text-blue-600 flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {course.enrolledStudents.toLocaleString()}
                      </span>
                    </div>

                    <div style={{ marginBottom: "8px" }}>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>{course.progress}% complete</span>
                        <span>{course.completionRate}% avg. completion</span>
                      </div>
                    </div>

                    <div
                      className="flex items-center gap-3 text-xs text-gray-600"
                      style={{ marginBottom: "8px" }}
                    >
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {course.timeSpent}
                      </span>
                      <span className="flex items-center gap-1">
                        <Target className="h-3 w-3" />
                        Next: {course.nextLesson}
                      </span>
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs h-6 px-2 w-full"
                      onClick={() => handleViewLearning(course.id)}
                      style={{ margin: 0, padding: "4px 8px" }}
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {learning.length > 3 && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full mt-3"
              onClick={() => setShowAllLearning(!showAllLearning)}
            >
              {showAllLearning
                ? "Show Less"
                : `Show ${learning.length - 3} More`}
            </Button>
          )}
        </CardContent>
      </Card> */}

      {/* Enhanced LinkedIn-style Jobs for You */}
      {/* <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Newspaper className="h-4 w-4 text-green-600" />
            Jobs for you
          </h3>
          <div className="space-y-3">
            {displayedJobs.map((job) => (
              <div key={job.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-900">
                    {job.title}
                  </h4>
                  {job.urgent && (
                    <Badge
                      variant="outline"
                      className="text-xs bg-red-100 text-red-800 border-red-300 flex items-center gap-1"
                    >
                      <AlertTriangle className="h-3 w-3" />
                      Urgent
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mb-1">
                  {job.postedDate} • {job.company} • {job.location}
                </p>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs text-blue-600">
                    {job.type} • {job.applicants} applicants
                  </span>
                  <span className="text-xs text-green-600 font-medium">
                    {job.salary}
                  </span>
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs text-gray-600 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {job.experience}
                  </span>
                  <span className="text-xs text-gray-600 flex items-center gap-1">
                    <Globe className="h-3 w-3" />
                    {job.remote ? "Remote" : "On-site"}
                  </span>
                  <span className="text-xs text-gray-600 flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    {job.companyRating}/5
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {job.skills.slice(0, 3).map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs text-gray-600 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Apply by: {job.applicationDeadline}
                  </span>
                  <span className="text-xs text-gray-600 flex items-center gap-1">
                    <Bookmark className="h-3 w-3" />
                    {job.savedCount} saved
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="default"
                    className="text-xs h-6 px-2 flex-1 min-w-0"
                    onClick={() => handleApplyJob(job.id)}
                  >
                    Apply
                  </Button>
                  <Button
                    size="sm"
                    variant={savedJobs.has(job.id) ? "default" : "outline"}
                    className={`text-xs h-6 px-2 min-w-[40px] flex-shrink-0 ${
                      savedJobs.has(job.id)
                        ? "bg-green-600 hover:bg-green-700"
                        : ""
                    }`}
                    onClick={() => handleSaveJob(job.id)}
                  >
                    {savedJobs.has(job.id) ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <Bookmark className="h-3 w-3" />
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
          {jobs.length > 3 && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full mt-3"
              onClick={() => setShowAllJobs(!showAllJobs)}
            >
              {showAllJobs ? "Show Less" : `Show ${jobs.length - 3} More`}
            </Button>
          )}
        </CardContent>
      </Card> */}

      {/* Trending Topics from API */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 dark:from-blue-950/30 dark:to-indigo-950/30 dark:border-blue-800">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold flex items-center gap-2 text-blue-800 dark:text-blue-300">
              <Flame className="h-4 w-4 text-orange-500" />
              Trending Topics
            </h3>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => refetchTrending()}
              disabled={isTrendingLoading}
            >
              <RefreshCw
                className={`h-3.5 w-3.5 ${
                  isTrendingLoading ? "animate-spin" : ""
                }`}
              />
            </Button>
          </div>

          {isTrendingLoading ? (
            <div className="flex items-center justify-center py-6">
              <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            </div>
          ) : trendingTopics && trendingTopics.length > 0 ? (
            <>
              <div className="space-y-2.5">
                {trendingTopics
                  .slice(0, showAllTopics ? 10 : 5)
                  .map((topic, index) => (
                    <div
                      key={topic.hashtag}
                      className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-blue-100/50 dark:hover:bg-blue-900/30 cursor-pointer transition-colors group"
                      onClick={() => {
                        toast.info(`Searching for #${topic.hashtag}...`);
                        // Could navigate to search with hashtag
                      }}
                    >
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-medium flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <Hash className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                          <span className="font-medium text-sm text-blue-900 dark:text-blue-200 truncate group-hover:text-blue-700 dark:group-hover:text-blue-300">
                            {topic.hashtag}
                          </span>
                          {topic.engagementScore >= 10 && (
                            <Badge className="text-[10px] px-1.5 py-0 h-4 bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300 border-0">
                              🔥 Hot
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 text-[11px] text-gray-600 dark:text-gray-400">
                          <span className="flex items-center gap-0.5">
                            <MessageSquare className="h-3 w-3" />
                            {topic.postsCount}{" "}
                            {topic.postsCount === 1 ? "post" : "posts"}
                          </span>
                          <span className="text-gray-300 dark:text-gray-600">
                            •
                          </span>
                          <span className="flex items-center gap-0.5">
                            <TrendingUp className="h-3 w-3" />
                            {topic.engagementScore} engagement
                          </span>
                          {topic.likesCount > 0 && (
                            <>
                              <span className="text-gray-300 dark:text-gray-600">
                                •
                              </span>
                              <span className="flex items-center gap-0.5 text-red-500 dark:text-red-400">
                                ❤️ {topic.likesCount}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {trendingTopics.length > 5 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full mt-3 text-blue-700 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-200 hover:bg-blue-100/50 dark:hover:bg-blue-900/30"
                  onClick={() => setShowAllTopics(!showAllTopics)}
                >
                  {showAllTopics
                    ? "Show Less"
                    : `Show ${Math.min(trendingTopics.length - 5, 5)} More`}
                </Button>
              )}
            </>
          ) : (
            <div className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
              No trending topics at the moment
            </div>
          )}
        </CardContent>
      </Card>

      {/* Enhanced Trending News */}
      {/* <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              Trending in Startups
            </h3>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Info className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-4">
            {mockTrendingNews.map((news) => (
              <div key={news.id}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-muted-foreground">
                    Trending in {news.category}
                  </span>
                  {news.featured && (
                    <Badge
                      variant="outline"
                      className="text-xs bg-yellow-100 text-yellow-800"
                    >
                      Featured
                    </Badge>
                  )}
                </div>
                <h4 className="text-sm font-medium mb-1">{news.title}</h4>
                <div className="flex items-center gap-3 mb-1">
                  <p className="text-xs text-muted-foreground">
                    {news.readers} readers
                  </p>
                  <span className="text-xs text-green-600">{news.trend}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-600">
                  <span>{news.source}</span>
                  <span>•</span>
                  <span>{news.publishedDate}</span>
                  <span>•</span>
                  <span>{news.readTime}</span>
                </div>
              </div>
            ))}
          </div>
          <Button variant="ghost" size="sm" className="w-full mt-3">
            Show more
          </Button>
        </CardContent>
      </Card> */}

      {/* Enhanced People to Connect With */}
      {/* <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-600" />
            People to Connect With
          </h3>
          <div className="space-y-4">
            {[
              {
                name: "Lisa Tan",
                role: "Product Manager at TechCorp",
                skills: ["Product", "UX"],
                avatar: "/diverse-person-portrait.png",
                mutualConnections: 4,
                strength: "high",
              },
              {
                name: "Raj Patel",
                role: "Angel Investor | Mentor",
                skills: ["Investing", "Startups"],
                avatar: "/diverse-group-conversation.png",
                mutualConnections: 6,
                strength: "medium",
              },
              {
                name: "Emma Wong",
                role: "Software Engineer at GrowthLab",
                skills: ["Engineering", "AI"],
                avatar: "/diverse-group-meeting.png",
                mutualConnections: 3,
                strength: "medium",
              },
            ].map((person, index) => (
              <div key={index} className="flex items-start gap-3">
                <Avatar>
                  <AvatarImage src={person.avatar} alt={person.name} />
                  <AvatarFallback>
                    {person.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium truncate">
                    {person.name}
                  </h4>
                  <p className="text-xs text-muted-foreground truncate">
                    {person.role}
                  </p>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs text-blue-600">
                      {person.mutualConnections} mutual connections
                    </span>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        person.strength === "high"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {person.strength} match
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {person.skills.map((skill, skillIndex) => (
                      <Badge
                        key={skillIndex}
                        variant="outline"
                        className="text-xs"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full gap-1 min-w-0"
                  >
                    <Plus className="h-3 w-3" />
                    Connect
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Button variant="ghost" size="sm" className="w-full mt-3">
            View all recommendations
          </Button>
        </CardContent>
      </Card> */}

      {/* Trending Now Section */}
      {/* <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold flex items-center gap-2 text-blue-800">
              <TrendingUp className="h-4 w-4" />
              Trending Now
            </h3>
            <Badge variant="outline" className="bg-blue-100 text-blue-800">
              Live
            </Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              "#startupfunding",
              "#AIinnovation",
              "#productmanagement",
              "#entrepreneurship",
              "#techstartup",
              "#venturecapital",
              "#growthhacking",
              "#digitaltransformation",
            ].map((hashtag, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs bg-white hover:bg-blue-100 border-blue-200 text-blue-700"
              >
                {hashtag}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card> */}

      {/* Live Activity Feed */}
      {/* <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold flex items-center gap-2 text-green-800">
              <Activity className="h-4 w-4" />
              Live Activity
            </h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-600">Live</span>
            </div>
          </div>
          <div className="space-y-2">
            {[
              {
                user: "Sarah Chen",
                action: "liked your post about funding",
                time: "2m ago",
              },
              {
                user: "Alex Wong",
                action: "commented on TechInnovate's update",
                time: "5m ago",
              },
              {
                user: "David Kumar",
                action: "shared a new video",
                time: "8m ago",
              },
              {
                user: "Lisa Tan",
                action: "joined the Product Management group",
                time: "12m ago",
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-2 bg-white rounded-lg border border-green-200"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <span className="text-sm text-gray-700">
                    <span className="font-medium">{activity.user}</span>{" "}
                    {activity.action}
                  </span>
                  <span className="text-xs text-gray-500 ml-2">
                    {activity.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card> */}

      {/* Community Poll Section */}
      {/* <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold flex items-center gap-2 text-orange-800">
              <MessageSquare className="h-4 w-4" />
              Community Poll
            </h3>
            <Badge variant="outline" className="bg-orange-100 text-orange-800">
              Live
            </Badge>
          </div>

          <div className="mb-3">
            <h4 className="font-medium text-gray-900 mb-3 text-sm">
              What's the biggest challenge you're facing in your startup
              journey?
            </h4>

            <div className="space-y-2">
              {[
                {
                  id: "funding",
                  option: "Raising funding",
                  votes: 45,
                  color: "bg-blue-500",
                },
                {
                  id: "talent",
                  option: "Finding talent",
                  votes: 32,
                  color: "bg-green-500",
                },
                {
                  id: "market",
                  option: "Market validation",
                  votes: 28,
                  color: "bg-purple-500",
                },
                {
                  id: "growth",
                  option: "Scaling growth",
                  votes: 35,
                  color: "bg-orange-500",
                },
              ].map((poll) => {
                const totalVotes = 140;
                const percentage = (poll.votes / totalVotes) * 100;

                return (
                  <div key={poll.id} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-700">
                        {poll.option}
                      </span>
                      <span className="text-xs text-gray-500">
                        {poll.votes} ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className={`${poll.color} h-1.5 rounded-full transition-all duration-300`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-xs text-gray-500 text-center">
            {140} total votes • Poll ends in 2 days
          </div>
        </CardContent>
      </Card> */}

      {/* Smart Notifications Section */}
      {/* <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold flex items-center gap-2 text-green-800">
              <Bell className="h-4 w-4" />
              Smart Notifications
            </h3>
            <Button variant="ghost" size="sm" className="text-green-600">
              <Eye className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-3 p-2 bg-white rounded-lg border border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-700">
                Sarah Chen's post about funding is trending
              </span>
              <Button
                size="sm"
                variant="outline"
                className="ml-auto text-xs h-5"
              >
                View
              </Button>
            </div>

            <div className="flex items-center gap-3 p-2 bg-white rounded-lg border border-green-200">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-xs text-gray-700">
                New connection: Lisa Tan (PM)
              </span>
              <Button
                size="sm"
                variant="outline"
                className="ml-auto text-xs h-5"
              >
                Connect
              </Button>
            </div>

            <div className="flex items-center gap-3 p-2 bg-white rounded-lg border border-green-200">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-xs text-gray-700">
                AI: Your post is performing well
              </span>
              <Button
                size="sm"
                variant="outline"
                className="ml-auto text-xs h-5"
              >
                Analyze
              </Button>
            </div>
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
}

export const LinkedInStyleRightSidebar = FeedRightSidebar;
