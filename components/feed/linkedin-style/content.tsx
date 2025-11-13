"use client"

import { useState, useEffect, useMemo } from "react"
import { Post } from "./post"
import { CreatePostDialog } from "../create-post-dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, TrendingUp, Filter, Users, Calendar, Award, Crown, RefreshCw, BarChart3, Target, Zap, TrendingDown, Eye, Clock, Star, Activity, Globe, Bell, Settings, Bookmark, Share2, MessageCircle, Heart, ThumbsUp, Brain, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Post as PostType } from "@/types/feed"
import { 
  mockTrendingTopics, 
  mockPostAnalytics, 
  mockContentRecommendations,
  mockNetworkingSuggestions 
} from "@/lib/mock-linkedin-data"
import { toast } from "sonner"
import { Card, CardContent } from "@/components/ui/card"

const mockPosts: PostType[] = [
  {
    id: "1",
    author: {
      id: "user1",
      name: "Sarah Chen",
      headline: "Founder & CEO at TechInnovate",
      avatar: "/sarah-chen.png",
      verified: true,
    },
    content: "🚀 Excited to announce that TechInnovate has secured $2M in seed funding! This milestone represents not just financial backing, but a vote of confidence in our vision to revolutionize healthcare through AI.\n\nLooking forward to expanding our team and accelerating product development. Special thanks to our amazing team, mentors at GrowthLab, and all the supporters who believed in us from day one.\n\n#startup #funding #entrepreneurship #healthtech #AI #innovation",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    likes: 128,
    comments: 32,
    reposts: 18,
    tags: ["startup", "funding", "entrepreneurship", "healthtech", "AI", "innovation"],
    images: ["/startup-team-collaboration.png", "/funding-meeting.png", "/singapore-office-building.png"],
    engagement: {
      views: 1250,
      reach: 890,
      clicks: 45,
      saves: 23
    },
    aiInsights: {
      sentiment: "positive",
      keyTopics: ["funding", "AI", "healthcare"],
      suggestedActions: ["congratulate", "connect", "share"],
      engagementPrediction: "high"
    }
  },
  {
    id: "2",
    author: {
      id: "user2",
      name: "Alex Wong",
      headline: "Senior Software Engineer at GrowthLab",
      avatar: "/alex-wong.png",
      verified: false,
    },
    content: "Just published a comprehensive guide on building scalable microservices with Node.js and Docker! 🐳\n\nKey takeaways:\n• Container orchestration best practices\n• Service mesh implementation\n• Performance optimization techniques\n• Monitoring and observability\n\nCheck it out and let me know your thoughts! Always happy to discuss architecture decisions.\n\n#programming #microservices #nodejs #docker #softwareengineering #tech",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    likes: 75,
    comments: 14,
    reposts: 8,
    tags: ["programming", "microservices", "nodejs", "docker", "softwareengineering", "tech"],
    images: ["/machine-learning-concept.png"],
    aiInsights: {
      sentiment: "neutral",
      keyTopics: ["programming", "microservices", "docker", "tech"],
      suggestedActions: ["bookmark", "comment", "share"],
      engagementPrediction: "medium"
    }
  },
  {
    id: "3",
    author: {
      id: "user3",
      name: "Enterprise Singapore",
      headline: "Government Agency",
      avatar: "/enterprise-sg-logo.png",
      verified: true,
    },
    content: "📢 Applications for the Startup SG Founder grant are now open!\n\nEligible first-time entrepreneurs can receive a startup capital grant of S$50,000 to kickstart their business ideas. This program is designed to support innovative startups in their early stages.\n\nKey eligibility criteria:\n• First-time entrepreneur\n• Singapore citizen or PR\n• Innovative business concept\n• Strong market potential\n\nApply before June 30th, 2024. Don't miss this opportunity to turn your startup dreams into reality!\n\n#startupsg #funding #entrepreneurship #singapore #grants #innovation",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    likes: 210,
    comments: 45,
    reposts: 87,
    tags: ["startupsg", "funding", "entrepreneurship", "singapore", "grants", "innovation"],
    images: ["/singapore-office-building.png"],
    aiInsights: {
      sentiment: "positive",
      keyTopics: ["funding", "startup", "singapore", "grants"],
      suggestedActions: ["apply", "share", "bookmark"],
      engagementPrediction: "high"
    }
  },
  {
    id: "4",
    author: {
      id: "user4",
      name: "Dr. Emily Chen",
      headline: "AI Research Lead at TechCorp",
      avatar: "/sarah-chen.png",
      verified: true,
    },
    content: "🎯 Just completed our AI-powered diagnostic tool for early cancer detection! The results are incredible - 95% accuracy in identifying early-stage cancers.\n\nThis breakthrough could save thousands of lives. Proud of our team's dedication to using AI for good.\n\n#AI #healthcare #innovation #cancerresearch #techforgood #machinelearning",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    likes: 342,
    comments: 89,
    reposts: 156,
    tags: ["AI", "healthcare", "innovation", "cancerresearch", "techforgood", "machinelearning"],
    images: ["/healthcare-professional.png"],
    aiInsights: {
      sentiment: "very-positive",
      keyTopics: ["AI", "healthcare", "cancer", "innovation"],
      suggestedActions: ["congratulate", "share", "connect"],
      engagementPrediction: "very-high"
    }
  },
  {
    id: "5",
    author: {
      id: "user5",
      name: "Marcus Rodriguez",
      headline: "Product Manager at StartupXYZ",
      avatar: "/alex-wong.png",
      verified: false,
    },
    content: "🚀 Our new fintech app just hit 100,000 users! 🎉\n\nWhat started as a simple idea has grown into something amazing. The journey has been incredible - from late-night coding sessions to user feedback calls.\n\nKey learnings:\n• Listen to your users\n• Iterate fast\n• Build for scale from day one\n\n#fintech #startup #product #growth #users #success",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    likes: 198,
    comments: 67,
    reposts: 45,
    tags: ["fintech", "startup", "product", "growth", "users", "success"],
    images: ["/fintech-flow.png"],
    aiInsights: {
      sentiment: "positive",
      keyTopics: ["fintech", "startup", "growth", "success"],
      suggestedActions: ["congratulate", "learn", "connect"],
      engagementPrediction: "high"
    }
  },
  {
    id: "6",
    author: {
      id: "user6",
      name: "Sarah Kim",
      headline: "UX Designer at DesignStudio",
      avatar: "/diverse-group-meeting.png",
      verified: false,
    },
    content: "✨ Just launched our new design system! 🎨\n\nAfter months of research and testing, we've created a comprehensive design system that will make our products more consistent and user-friendly.\n\nFeatures:\n• 50+ reusable components\n• Accessibility-first approach\n• Dark mode support\n• Mobile-responsive design\n\n#design #UX #designsystem #productdesign #accessibility #innovation",
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    likes: 156,
    comments: 34,
    reposts: 23,
    tags: ["design", "UX", "designsystem", "productdesign", "accessibility", "innovation"],
    images: ["/startup-workshop.png"],
    aiInsights: {
      sentiment: "positive",
      keyTopics: ["design", "UX", "accessibility", "innovation"],
      suggestedActions: ["learn", "bookmark", "share"],
      engagementPrediction: "medium"
    }
  },
  {
    id: "7",
    author: {
      id: "user7",
      name: "David Kumar",
      headline: "Startup Mentor & Investor",
      avatar: "/diverse-person-portrait.png",
      verified: true,
    },
    content: "🎥 Just recorded a comprehensive guide on startup fundraising! 📈\n\nIn this 15-minute video, I cover:\n• How to prepare your pitch deck\n• What investors look for\n• Common fundraising mistakes to avoid\n• Tips for successful investor meetings\n\nPerfect for first-time founders! Check it out and let me know what you think.\n\n#startup #fundraising #pitchdeck #investors #mentorship #video",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    likes: 267,
    comments: 78,
    reposts: 92,
    tags: ["startup", "fundraising", "pitchdeck", "investors", "mentorship", "video"],
    video: "/startup-fundraising-guide.mp4",
    engagement: {
      views: 2100,
      reach: 1500,
      clicks: 89,
      saves: 45
    },
    aiInsights: {
      sentiment: "informative",
      keyTopics: ["fundraising", "mentorship", "video"],
      suggestedActions: ["watch", "share", "bookmark"],
      engagementPrediction: "very-high"
    }
  },
  {
    id: "8",
    author: {
      id: "user8",
      name: "GrowthLab AI",
      headline: "AI Assistant | GrowthLab",
      avatar: "/abstract-geometric-shapes.png",
      verified: true,
    },
    content: "🤖 AI-Powered Insights: Your feed is now enhanced with intelligent recommendations!\n\n✨ New features:\n• Smart content curation based on your interests\n• Real-time sentiment analysis\n• Engagement predictions\n• Personalized topic suggestions\n\nTry asking me anything about your posts or network! I'm here to help you grow. 🚀\n\n#AI #insights #growth #automation #smartfeed",
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    likes: 89,
    comments: 23,
    reposts: 34,
    tags: ["AI", "insights", "growth", "automation", "smartfeed"],
    engagement: {
      views: 450,
      reach: 320,
      clicks: 67,
      saves: 12
    },
    aiInsights: {
      sentiment: "excited",
      keyTopics: ["AI", "features", "growth"],
      suggestedActions: ["try", "explore", "feedback"],
      engagementPrediction: "medium"
    }
  },
  {
    id: "9",
    author: {
      id: "user9",
      name: "Lisa Tan",
      headline: "Product Manager at TechCorp",
      avatar: "/diverse-group-meeting.png",
      verified: false,
    },
    content: "📊 Just completed our Q4 product analytics review! Here are the key insights:\n\n🎯 User engagement up 35%\n📈 Conversion rate improved by 22%\n⏱️ Average session time increased by 18%\n💬 User satisfaction score: 4.7/5\n\nKey learnings:\n• Personalization drives engagement\n• Mobile-first approach is crucial\n• User feedback loops are essential\n\nWhat metrics do you track for product success? Would love to hear your thoughts!\n\n#productmanagement #analytics #growth #metrics #userengagement",
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    likes: 156,
    comments: 45,
    reposts: 28,
    tags: ["productmanagement", "analytics", "growth", "metrics", "userengagement"],
    engagement: {
      views: 890,
      reach: 650,
      clicks: 34,
      saves: 19
    },
    aiInsights: {
      sentiment: "analytical",
      keyTopics: ["analytics", "product", "growth"],
      suggestedActions: ["engage", "share", "discuss"],
      engagementPrediction: "high"
    }
  },
  {
    id: "10",
    author: {
      id: "user10",
      name: "Raj Patel",
      headline: "Angel Investor | Mentor",
      avatar: "/diverse-group-conversation.png",
      verified: true,
    },
    content: "💡 Investment Tip: The best startups I've invested in share these 3 characteristics:\n\n1️⃣ **Clear Problem-Solution Fit**\nThey solve a real, painful problem that people are willing to pay for.\n\n2️⃣ **Strong Founder-Market Fit**\nThe founders deeply understand their market and have relevant experience.\n\n3️⃣ **Scalable Business Model**\nThe unit economics work and there's a clear path to profitability.\n\nWhat other factors do you consider when evaluating startups? Let's discuss! 🤝\n\n#investing #startups #mentorship #advice #entrepreneurship",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    likes: 234,
    comments: 67,
    reposts: 89,
    tags: ["investing", "startups", "mentorship", "advice", "entrepreneurship"],
    engagement: {
      views: 1200,
      reach: 900,
      clicks: 56,
      saves: 34
    },
    aiInsights: {
      sentiment: "educational",
      keyTopics: ["investing", "startups", "advice"],
      suggestedActions: ["discuss", "connect", "learn"],
      engagementPrediction: "very-high"
    }
  }
]

export function FeedContent() {
  const [posts, setPosts] = useState<PostType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [feedPreferences, setFeedPreferences] = useState({
    showSponsored: true,
    showPromoted: true,
    autoRefresh: false,
    compactView: false,
    showAnalytics: false,
    smartSorting: true,
    contentDiversity: true,
    engagementFocus: false
  })
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [viewMode, setViewMode] = useState<"feed" | "analytics">("feed")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<"recent" | "trending" | "engagement" | "relevance">("recent")
  const [timeRange, setTimeRange] = useState<"all" | "today" | "week" | "month">("all")
  const [showInsights, setShowInsights] = useState(false)
  const [aiInsights, setAiInsights] = useState({
    totalEngagement: 0,
    topPerformingPost: null as PostType | null,
    trendingTopics: [] as string[],
    suggestedConnections: [] as any[],
    contentRecommendations: [] as any[],
    engagementTrends: {
      likes: 0,
      comments: 0,
      shares: 0,
      views: 0
    }
  })
  const [showAIFeatures, setShowAIFeatures] = useState(false)
  const [activePoll, setActivePoll] = useState<string | null>(null)
  const [pollVotes, setPollVotes] = useState<Record<string, number>>({})
  const [liveUpdates, setLiveUpdates] = useState(false)
  const [smartNotifications, setSmartNotifications] = useState(true)

  useEffect(() => {
    const loadPosts = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setPosts(mockPosts)
        
        // Calculate AI insights
        const totalEngagement = mockPosts.reduce((sum, post) => 
          sum + post.likes + post.comments + post.reposts, 0
        )
        
        const topPerformingPost = mockPosts.reduce((top, post) => 
          (post.likes + post.comments + post.reposts) > 
          (top.likes + top.comments + top.reposts) ? post : top
        )
        
        const trendingTopics = Array.from(
          new Set(mockPosts.flatMap(post => post.tags || []))
        ).slice(0, 5)
        
        setAiInsights({
          totalEngagement,
          topPerformingPost,
          trendingTopics,
          suggestedConnections: [],
          contentRecommendations: [],
          engagementTrends: {
            likes: mockPosts.reduce((sum, post) => sum + post.likes, 0),
            comments: mockPosts.reduce((sum, post) => sum + post.comments, 0),
            shares: mockPosts.reduce((sum, post) => sum + post.reposts, 0),
            views: mockPosts.reduce((sum, post) => sum + (post.engagement?.views || 0), 0)
          }
        })
      } catch (err) {
        setError("Failed to load posts")
      } finally {
        setLoading(false)
      }
    }
    loadPosts()
  }, [])

  // Live updates simulation
  useEffect(() => {
    if (liveUpdates) {
      const interval = setInterval(() => {
        setPosts(prevPosts => 
          prevPosts.map(post => ({
            ...post,
            likes: post.likes + Math.floor(Math.random() * 3),
            comments: post.comments + Math.floor(Math.random() * 2),
            reposts: post.reposts + Math.floor(Math.random() * 2)
          }))
        )
      }, 5000)
      
      return () => clearInterval(interval)
    }
    return undefined
  }, [liveUpdates])

  const filteredPosts = useMemo(() => {
    let filtered = [...posts]

    // Search filtering
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(post => 
        post.content.toLowerCase().includes(query) ||
        post.author.name.toLowerCase().includes(query) ||
        post.tags?.some(tag => tag.toLowerCase().includes(query))
      )
    }

    // Tag filtering
    if (selectedTags.length > 0) {
      filtered = filtered.filter(post => 
        post.tags?.some(tag => selectedTags.includes(tag))
      )
    }

    // Time range filtering
    if (timeRange !== "all") {
      const now = new Date()
      const ranges = {
        today: 24 * 60 * 60 * 1000,
        week: 7 * 24 * 60 * 60 * 1000,
        month: 30 * 24 * 60 * 60 * 1000
      }
      filtered = filtered.filter(post => 
        now.getTime() - new Date(post.timestamp).getTime() <= ranges[timeRange as keyof typeof ranges]
      )
    }

    // Main filtering
    switch (filter) {
      case "trending":
        filtered.sort((a, b) => (b.likes + b.comments + b.reposts) - (a.likes + a.comments + a.reposts))
        break
      case "recent":
        filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        break
      case "following":
        filtered = filtered.filter(post => post.author.verified)
        break
    }

    // Smart sorting
    if (feedPreferences.smartSorting) {
      filtered.sort((a, b) => {
        const aScore = (a.likes * 2) + (a.comments * 3) + (a.reposts * 2) + (a.author.verified ? 10 : 0)
        const bScore = (b.likes * 2) + (b.comments * 3) + (b.reposts * 2) + (b.author.verified ? 10 : 0)
        return bScore - aScore
      })
    }

    // Additional sorting
    switch (sortBy) {
      case "engagement":
        filtered.sort((a, b) => (b.likes + b.comments + b.reposts) - (a.likes + a.comments + a.reposts))
        break
      case "relevance":
        // Relevance based on user's interests and search query
        if (searchQuery.trim()) {
          filtered.sort((a, b) => {
            const aRelevance = a.content.toLowerCase().split(searchQuery.toLowerCase()).length - 1
            const bRelevance = b.content.toLowerCase().split(searchQuery.toLowerCase()).length - 1
            return bRelevance - aRelevance
          })
        }
        break
    }

    return filtered
  }, [posts, filter, searchQuery, selectedTags, timeRange, feedPreferences.smartSorting, sortBy])

  const handlePostCreated = ({ text, tags, images, video }: { text: string; tags: string[]; images: string[]; video: string | null }) => {
    const newPost: PostType = {
      id: String(Date.now()),
      author: {
        id: "current-user",
        name: "You",
        headline: "GrowthLab Member",
        avatar: "/placeholder-user.jpg",
        verified: false,
      },
      content: text,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: 0,
      reposts: 0,
      tags: tags.length ? tags : undefined,
      images: images.length ? images : undefined,
      video: video || undefined,
    }
    setPosts((prev) => [newPost, ...prev])
    toast.success("Post created successfully!")
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success("Feed refreshed!")
    } finally {
      setIsRefreshing(false)
    }
  }

  const toggleFeedPreference = (key: keyof typeof feedPreferences) => {
    setFeedPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
    const labels = {
      showSponsored: 'Sponsored content',
      showPromoted: 'Promoted content',
      autoRefresh: 'Auto-refresh',
      compactView: 'Compact view',
      showAnalytics: 'Analytics display',
      smartSorting: 'Smart sorting',
      contentDiversity: 'Content diversity',
      engagementFocus: 'Engagement focus'
    }
    toast.success(`${labels[key]} ${feedPreferences[key] ? 'disabled' : 'enabled'}`)
  }

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter)
    toast.info(`Filtered by ${newFilter}`)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim()) {
      toast.info(`Searching for: ${query}`)
    } else {
      toast.info("Search cleared")
    }
  }

  const handleTagFilter = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const clearFilters = () => {
    setSelectedTags([])
    setTimeRange("all")
    setSortBy("recent")
    toast.success("All filters cleared")
  }

  const getAnalyticsView = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-blue-800">Post Analytics</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-blue-700">Total Views</span>
                <span className="font-semibold text-blue-800">{mockPostAnalytics.totalViews.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-blue-700">Unique Views</span>
                <span className="font-semibold text-blue-800">{mockPostAnalytics.uniqueViews.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-blue-700">Engagement Rate</span>
                <span className="font-semibold text-blue-800">{mockPostAnalytics.engagementRate}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-5 w-5 text-green-600" />
              <h3 className="font-semibold text-green-800">Performance</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-green-700">Click Rate</span>
                <span className="font-semibold text-green-800">{mockPostAnalytics.clickThroughRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-green-700">Time Spent</span>
                <span className="font-semibold text-green-800">{mockPostAnalytics.timeSpent}s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-green-700">Top Posts</span>
                <span className="font-semibold text-green-800">{mockPostAnalytics.topPerformingPosts}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <h3 className="font-semibold text-purple-800">Growth</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-purple-700">Audience Growth</span>
                <span className="font-semibold text-purple-800">+{mockPostAnalytics.audienceGrowth}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-purple-700">Best Times</span>
                <span className="font-semibold text-purple-800">{mockPostAnalytics.bestPostingTimes[0]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-purple-700">Top Content</span>
                <span className="font-semibold text-purple-800">{mockPostAnalytics.topPerformingContent[0]}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3">Content Recommendations</h3>
          <div className="space-y-3">
            {mockContentRecommendations.map((rec) => (
              <div key={rec.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    {rec.type === "article" && <Globe className="h-5 w-5 text-blue-600" />}
                    {rec.type === "video" && <Eye className="h-5 w-5 text-red-600" />}
                    {rec.type === "podcast" && <Activity className="h-5 w-5 text-purple-600" />}
                  </div>
                  <div>
                    <h4 className="font-medium">{rec.title}</h4>
                    <p className="text-sm text-muted-foreground">{rec.author} • {rec.relevance}% match</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <Zap className="h-4 w-4 mr-1" />
                  Follow
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-lg border bg-card p-6 shadow-sm space-y-4">
            <div className="flex items-start gap-3">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border bg-card p-8 text-center">
        <h3 className="text-xl font-semibold mb-3">Failed to load posts</h3>
        <p className="text-muted-foreground mb-6">{error}</p>
        <Button onClick={() => window.location.reload()} className="bg-[#0F7377] hover:bg-[#0F7377]/90 text-white">
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Top Controls Bar */}
      <div className="bg-white border rounded-lg p-4 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 gap-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search posts, people, or topics..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 pr-4"
              />
            </div>
          </div>
        </div>
        
      </div>




      {/* Tag Filters */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
          <span className="text-sm text-blue-800 font-medium">Filtering by tags:</span>
          {selectedTags.map(tag => (
            <Badge 
              key={tag} 
              variant="outline" 
              className="text-xs bg-blue-100 text-blue-800 cursor-pointer hover:bg-red-100"
              onClick={() => handleTagFilter(tag)}
            >
              #{tag} ×
            </Badge>
          ))}
        </div>
      )}

      {/* AI-Powered Features Section */}
      {showAIFeatures && (
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-purple-800">
                <Brain className="h-5 w-5" />
                AI-Powered Insights
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAIFeatures(false)}
                className="text-purple-600"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-white rounded-lg p-4 border border-purple-200">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">Total Engagement</span>
                </div>
                <div className="text-2xl font-bold text-green-600">
                  {aiInsights.totalEngagement.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">+12% from last week</div>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-purple-200">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">Top Post</span>
                </div>
                <div className="text-sm font-medium text-gray-900 truncate">
                  {aiInsights.topPerformingPost?.content.substring(0, 50)}...
                </div>
                <div className="text-xs text-gray-500">
                  {aiInsights.topPerformingPost?.likes} likes
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-purple-200">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm font-medium">Trending Topics</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {aiInsights.trendingTopics.slice(0, 3).map((topic, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      #{topic}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <h4 className="font-medium mb-3 text-gray-900">Engagement Trends</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-red-500">
                    {aiInsights.engagementTrends.likes}
                  </div>
                  <div className="text-xs text-gray-500">Likes</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-500">
                    {aiInsights.engagementTrends.comments}
                  </div>
                  <div className="text-xs text-gray-500">Comments</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-500">
                    {aiInsights.engagementTrends.shares}
                  </div>
                  <div className="text-xs text-gray-500">Shares</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-500">
                    {aiInsights.engagementTrends.views}
                  </div>
                  <div className="text-xs text-gray-500">Views</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}



      {/* Create Post Dialog */}
      <CreatePostDialog
        className="bg-card"
        onPostCreated={handlePostCreated}
      />

      {/* Content Display */}
      {viewMode === "analytics" ? (
        getAnalyticsView()
      ) : (
        <>
          {/* Posts Display */}
          {filteredPosts.length === 0 ? (
            <div className="rounded-lg border bg-card p-8 text-center">
              <h3 className="text-xl font-semibold mb-3">No posts found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery ? "Try adjusting your search terms" : "Follow people or join groups to see posts in your feed"}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Results Summary */}
              <div className="text-sm text-muted-foreground px-2">
                Showing {filteredPosts.length} of {posts.length} posts
                {filter !== "all" && ` (filtered by ${filter})`}
                {searchQuery && ` matching "${searchQuery}"`}
                {selectedTags.length > 0 && ` with tags: ${selectedTags.join(', ')}`}
                {timeRange !== "all" && ` from ${timeRange}`}
              </div>
              
              {/* Enhanced Posts with AI Insights */}
              {filteredPosts.map((post) => (
                <div key={post.id} className="relative">
                  <Post 
                    post={post}
                    onUpdate={() => {}}
                    onDelete={() => {}}
                  />
                  
                  {/* AI Insights Overlay */}
                  {post.aiInsights && (
                    <div className="mt-2 p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="h-4 w-4 text-purple-600" />
                        <span className="text-sm font-medium text-purple-800">AI Insights</span>
                        <Badge variant="outline" className="text-xs bg-purple-100 text-purple-800">
                          {post.aiInsights.sentiment}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <span className="text-xs text-purple-700 font-medium">Key Topics:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {post.aiInsights.keyTopics.map((topic, index) => (
                              <Badge key={index} variant="outline" className="text-xs bg-purple-100 text-purple-800">
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-xs text-purple-700 font-medium">Suggested Actions:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {post.aiInsights.suggestedActions.map((action, index) => (
                              <Button key={index} size="sm" variant="outline" className="text-xs h-6 px-2">
                                {action}
                              </Button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-xs text-purple-700 font-medium">Engagement Prediction:</span>
                          <div className="mt-1">
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                post.aiInsights.engagementPrediction === 'very-high' ? 'bg-green-100 text-green-800' :
                                post.aiInsights.engagementPrediction === 'high' ? 'bg-blue-100 text-blue-800' :
                                post.aiInsights.engagementPrediction === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {post.aiInsights.engagementPrediction}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export const LinkedInStyleContent = FeedContent
