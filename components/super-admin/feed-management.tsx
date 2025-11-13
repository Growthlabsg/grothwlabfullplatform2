"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  MessageSquare, 
  Edit, 
  Save, 
  Eye, 
  RefreshCw, 
  Plus,
  Trash2,
  Copy,
  Globe,
  Settings,
  TrendingUp,
  Users,
  Shield,
  Filter,
  Hash,
  Clock,
  Heart,
  MessageCircle,
  Share2,
  Flag,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Zap,
  BarChart3,
  Bot,
  Sparkles,
  Brain
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface FeedPost {
  id: string
  author: string
  authorId: string
  content: string
  type: "text" | "image" | "video" | "link" | "poll"
  status: "published" | "pending" | "flagged" | "removed"
  category: string
  tags: string[]
  likes: number
  comments: number
  shares: number
  views: number
  createdAt: string
  isTrending: boolean
  isPinned: boolean
  isSponsored: boolean
  moderationNotes?: string
}

interface FeedCategory {
  id: string
  name: string
  description: string
  enabled: boolean
  order: number
  color: string
  icon: string
  postCount: number
}

interface TrendingTopic {
  id: string
  name: string
  hashtag: string
  postCount: number
  engagement: number
  trend: "rising" | "stable" | "declining"
  enabled: boolean
  lastUpdated: string
}

interface FeedAlgorithm {
  id: string
  name: string
  description: string
  enabled: boolean
  priority: number
  config: Record<string, any>
}

export function FeedManagement() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("posts")
  const [isEditing, setIsEditing] = useState(false)

  // Feed posts state
  const [posts, setPosts] = useState<FeedPost[]>([
    {
      id: "1",
      author: "Sarah Chen",
      authorId: "user1",
      content: "Just launched our new AI-powered startup! Looking for feedback from the community. #AI #Startup #Innovation",
      type: "text",
      status: "published",
      category: "startup-updates",
      tags: ["AI", "Startup", "Innovation"],
      likes: 45,
      comments: 12,
      shares: 8,
      views: 234,
      createdAt: "2024-01-20T10:30:00Z",
      isTrending: true,
      isPinned: false,
      isSponsored: false
    },
    {
      id: "2",
      author: "Alex Wong",
      authorId: "user2",
      content: "Excited to share our funding milestone! Raised $2M in seed funding. Thanks to all our supporters! 🚀",
      type: "text",
      status: "published",
      category: "funding",
      tags: ["Funding", "Milestone", "Success"],
      likes: 89,
      comments: 23,
      shares: 15,
      views: 567,
      createdAt: "2024-01-20T09:15:00Z",
      isTrending: true,
      isPinned: true,
      isSponsored: false
    },
    {
      id: "3",
      author: "Mei Lin",
      authorId: "user3",
      content: "Looking for a technical co-founder for our fintech startup. DM me if you're interested! #CoFounder #Fintech",
      type: "text",
      status: "pending",
      category: "networking",
      tags: ["CoFounder", "Fintech", "Networking"],
      likes: 12,
      comments: 5,
      shares: 2,
      views: 89,
      createdAt: "2024-01-20T08:45:00Z",
      isTrending: false,
      isPinned: false,
      isSponsored: false
    }
  ])

  // Feed categories state
  const [categories, setCategories] = useState<FeedCategory[]>([
    {
      id: "1",
      name: "Startup Updates",
      description: "Latest news and updates from startups",
      enabled: true,
      order: 1,
      color: "#0F7377",
      icon: "🚀",
      postCount: 156
    },
    {
      id: "2",
      name: "Funding",
      description: "Funding announcements and investment news",
      enabled: true,
      order: 2,
      color: "#10B981",
      icon: "💰",
      postCount: 89
    },
    {
      id: "3",
      name: "Networking",
      description: "Co-founder matching and networking",
      enabled: true,
      order: 3,
      color: "#3B82F6",
      icon: "🤝",
      postCount: 234
    },
    {
      id: "4",
      name: "Tech Trends",
      description: "Latest technology trends and insights",
      enabled: true,
      order: 4,
      color: "#8B5CF6",
      icon: "⚡",
      postCount: 123
    },
    {
      id: "5",
      name: "Mentorship",
      description: "Mentorship opportunities and advice",
      enabled: false,
      order: 5,
      color: "#F59E0B",
      icon: "🎓",
      postCount: 67
    }
  ])

  // Trending topics state
  const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>([
    {
      id: "1",
      name: "AI Startups",
      hashtag: "#AIStartups",
      postCount: 156,
      engagement: 2340,
      trend: "rising",
      enabled: true,
      lastUpdated: "2024-01-20T12:00:00Z"
    },
    {
      id: "2",
      name: "Fintech Innovation",
      hashtag: "#FintechInnovation",
      postCount: 89,
      engagement: 1234,
      trend: "stable",
      enabled: true,
      lastUpdated: "2024-01-20T11:30:00Z"
    },
    {
      id: "3",
      name: "Sustainability",
      hashtag: "#Sustainability",
      postCount: 67,
      engagement: 890,
      trend: "declining",
      enabled: false,
      lastUpdated: "2024-01-20T10:00:00Z"
    }
  ])

  // Feed algorithms state
  const [algorithms, setAlgorithms] = useState<FeedAlgorithm[]>([
    {
      id: "1",
      name: "Engagement-Based Ranking",
      description: "Rank posts based on likes, comments, and shares",
      enabled: true,
      priority: 1,
      config: {
        likeWeight: 0.4,
        commentWeight: 0.3,
        shareWeight: 0.3,
        timeDecay: 0.1
      }
    },
    {
      id: "2",
      name: "Category Relevance",
      description: "Show posts from user's preferred categories",
      enabled: true,
      priority: 2,
      config: {
        categoryBoost: 1.5,
        userPreferenceWeight: 0.8
      }
    },
    {
      id: "3",
      name: "Trending Topics",
      description: "Boost posts with trending hashtags",
      enabled: true,
      priority: 3,
      config: {
        trendingBoost: 2.0,
        minEngagement: 100
      }
    }
  ])

  const handleSave = (section: string) => {
    toast({
      title: "Changes Saved",
      description: `${section} has been updated successfully.`,
    })
    setIsEditing(false)
  }

  const handlePublish = () => {
    toast({
      title: "Published",
      description: "All feed changes have been published.",
    })
  }

  const handleRevert = () => {
    toast({
      title: "Reverted",
      description: "All changes have been reverted to the last published version.",
    })
    setIsEditing(false)
  }

  const approvePost = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, status: "published" } : post
    ))
    toast({
      title: "Post Approved",
      description: "Post has been published to the feed.",
    })
  }

  const rejectPost = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, status: "removed" } : post
    ))
    toast({
      title: "Post Rejected",
      description: "Post has been removed from the feed.",
    })
  }

  const togglePostStatus = (postId: string, status: "published" | "pending" | "flagged" | "removed") => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, status } : post
    ))
  }

  const addNewCategory = () => {
    const newCategory: FeedCategory = {
      id: Date.now().toString(),
      name: "New Category",
      description: "Category description",
      enabled: true,
      order: categories.length + 1,
      color: "#6B7280",
      icon: "📝",
      postCount: 0
    }
    setCategories([...categories, newCategory])
  }

  const removeCategory = (id: string) => {
    setCategories(categories.filter(c => c.id !== id))
  }

  const addNewTrendingTopic = () => {
    const newTopic: TrendingTopic = {
      id: Date.now().toString(),
      name: "New Topic",
      hashtag: "#NewTopic",
      postCount: 0,
      engagement: 0,
      trend: "stable",
      enabled: true,
      lastUpdated: new Date().toISOString()
    }
    setTrendingTopics([...trendingTopics, newTopic])
  }

  const removeTrendingTopic = (id: string) => {
    setTrendingTopics(trendingTopics.filter(t => t.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <MessageSquare className="w-6 h-6" />
            Feed Management
          </h2>
          <p className="text-muted-foreground">
            Control all aspects of the platform feed including posts, moderation, categories, and algorithms
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handleRevert}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Revert
          </Button>
          <Button onClick={handlePublish}>
            <Globe className="w-4 h-4 mr-2" />
            Publish Changes
          </Button>
        </div>
      </div>

      {/* Feed Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{posts.length}</div>
            <p className="text-xs text-muted-foreground">
              {posts.filter(p => p.status === "published").length} published
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{posts.filter(p => p.status === "pending").length}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting moderation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trending Posts</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{posts.filter(p => p.isTrending).length}</div>
            <p className="text-xs text-muted-foreground">
              High engagement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Hash className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.filter(c => c.enabled).length}</div>
            <p className="text-xs text-muted-foreground">
              Active categories
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="ai-generator">AI Generator</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="algorithms">Algorithms</TabsTrigger>
          <TabsTrigger value="moderation">Moderation</TabsTrigger>
        </TabsList>

        {/* Posts Tab */}
        <TabsContent value="posts" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Feed Posts Management</CardTitle>
                <Button onClick={() => setIsEditing(!isEditing)}>
                  <Edit className="w-4 h-4 mr-2" />
                  {isEditing ? "Cancel" : "Edit"}
                </Button>
              </div>
              <CardDescription>Manage and moderate all feed posts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {posts.map((post, index) => (
                  <div key={post.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Badge variant={post.status === "published" ? "default" : "secondary"}>
                          {post.status}
                        </Badge>
                        {post.isTrending && <Badge variant="outline">🔥 Trending</Badge>}
                        {post.isPinned && <Badge variant="outline">📌 Pinned</Badge>}
                        {post.isSponsored && <Badge variant="outline">💼 Sponsored</Badge>}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                        {isEditing && (
                          <div className="flex gap-1">
                            <Button variant="outline" size="sm" onClick={() => togglePostStatus(post.id, "published")}>
                              <CheckCircle className="w-3 h-3" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => togglePostStatus(post.id, "flagged")}>
                              <Flag className="w-3 h-3" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => togglePostStatus(post.id, "removed")}>
                              <XCircle className="w-3 h-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium">{post.author}</span>
                        <Badge variant="outline">{post.category}</Badge>
                      </div>
                      <p className="text-sm">{post.content}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span>❤️ {post.likes}</span>
                        <span>💬 {post.comments}</span>
                        <span>📤 {post.shares}</span>
                        <span>👁️ {post.views}</span>
                      </div>
                    </div>

                    {isEditing && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <Label className="text-xs">Status</Label>
                          <Select
                            value={post.status}
                            onValueChange={(value: "published" | "pending" | "flagged" | "removed") => 
                              togglePostStatus(post.id, value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="published">Published</SelectItem>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="flagged">Flagged</SelectItem>
                              <SelectItem value="removed">Removed</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Category</Label>
                          <Select
                            value={post.category}
                            onValueChange={(value) => {
                              const newPosts = [...posts]
                              (newPosts[index] ? newPosts[index].category : undefined) = value
                              setPosts(newPosts)
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map(cat => (
                                <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Tags</Label>
                          <Input
                            value={post.tags.join(", ")}
                            onChange={(e) => {
                              const newPosts = [...posts]
                              (newPosts[index] ? newPosts[index].tags : undefined) = e.target.value.split(", ").filter(t => t.trim())
                              setPosts(newPosts)
                            }}
                            placeholder="tag1, tag2, tag3"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {isEditing && (
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                  <Button onClick={() => handleSave("Posts")}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Generator Tab */}
        <TabsContent value="ai-generator" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Bot className="w-5 h-5" />
                  AI Post Generator
                </CardTitle>
                <Button variant="outline" onClick={() => window.open('/feed/ai-generator', '_blank')}>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Open AI Generator
                </Button>
              </div>
              <CardDescription>
                Generate engaging posts using AI-powered content creation with ChatGPT, Grok, or Claude
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg text-center">
                  <Bot className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                  <h4 className="font-medium mb-1">OpenAI GPT-4</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Advanced language model for high-quality content generation
                  </p>
                  <Badge variant="outline">Connected</Badge>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <Brain className="w-8 h-8 mx-auto mb-2 text-green-500" />
                  <h4 className="font-medium mb-1">Grok AI</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Real-time AI with current events and trending topics
                  </p>
                  <Badge variant="outline">Available</Badge>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <Sparkles className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                  <h4 className="font-medium mb-1">Anthropic Claude</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Thoughtful and strategic business content generation
                  </p>
                  <Badge variant="outline">Available</Badge>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium mb-2">AI Post Generation Features:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Industry-specific content templates</li>
                  <li>• Engagement optimization algorithms</li>
                  <li>• Trending topic integration</li>
                  <li>• Multi-language support</li>
                  <li>• Hashtag generation</li>
                  <li>• Optimal posting time suggestions</li>
                  <li>• Content performance scoring</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Categories Tab */}
        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Feed Categories</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={addNewCategory}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Category
                  </Button>
                  <Button onClick={() => setIsEditing(!isEditing)}>
                    <Edit className="w-4 h-4 mr-2" />
                    {isEditing ? "Cancel" : "Edit"}
                  </Button>
                </div>
              </div>
              <CardDescription>Manage feed categories and their settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categories.map((category, index) => (
                  <div key={category.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{category.icon}</span>
                        <div>
                          <h4 className="font-medium">{category.name}</h4>
                          <p className="text-sm text-muted-foreground">{category.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Switch
                          checked={category.enabled}
                          onCheckedChange={(checked) => {
                            const newCategories = [...categories]
                            (newCategories[index] ? newCategories[index].enabled : undefined) = checked
                            setCategories(newCategories)
                          }}
                        />
                        {isEditing && (
                          <Button variant="outline" size="sm" onClick={() => removeCategory(category.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    {isEditing && (
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                        <div className="space-y-1">
                          <Label className="text-xs">Name</Label>
                          <Input
                            value={category.name}
                            onChange={(e) => {
                              const newCategories = [...categories]
                              (newCategories[index] ? newCategories[index].name : undefined) = e.target.value
                              setCategories(newCategories)
                            }}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Description</Label>
                          <Input
                            value={category.description}
                            onChange={(e) => {
                              const newCategories = [...categories]
                              (newCategories[index] ? newCategories[index].description : undefined) = e.target.value
                              setCategories(newCategories)
                            }}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Order</Label>
                          <Input
                            type="number"
                            value={category.order}
                            onChange={(e) => {
                              const newCategories = [...categories]
                              (newCategories[index] ? newCategories[index].order : undefined) = parseInt(e.target.value)
                              setCategories(newCategories)
                            }}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Color</Label>
                          <Input
                            type="color"
                            value={category.color}
                            onChange={(e) => {
                              const newCategories = [...categories]
                              (newCategories[index] ? newCategories[index].color : undefined) = e.target.value
                              setCategories(newCategories)
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {isEditing && (
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                  <Button onClick={() => handleSave("Categories")}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trending Tab */}
        <TabsContent value="trending" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Trending Topics</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={addNewTrendingTopic}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Topic
                  </Button>
                  <Button onClick={() => setIsEditing(!isEditing)}>
                    <Edit className="w-4 h-4 mr-2" />
                    {isEditing ? "Cancel" : "Edit"}
                  </Button>
                </div>
              </div>
              <CardDescription>Manage trending topics and hashtags</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trendingTopics.map((topic, index) => (
                  <div key={topic.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Badge variant={topic.trend === "rising" ? "default" : topic.trend === "stable" ? "secondary" : "destructive"}>
                          {topic.trend === "rising" ? "📈 Rising" : topic.trend === "stable" ? "➡️ Stable" : "📉 Declining"}
                        </Badge>
                        <div>
                          <h4 className="font-medium">{topic.name}</h4>
                          <p className="text-sm text-muted-foreground">{topic.hashtag}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Switch
                          checked={topic.enabled}
                          onCheckedChange={(checked) => {
                            const newTopics = [...trendingTopics]
                            (newTopics[index] ? newTopics[index].enabled : undefined) = checked
                            setTrendingTopics(newTopics)
                          }}
                        />
                        {isEditing && (
                          <Button variant="outline" size="sm" onClick={() => removeTrendingTopic(topic.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{topic.postCount}</div>
                        <div className="text-xs text-muted-foreground">Posts</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{topic.engagement}</div>
                        <div className="text-xs text-muted-foreground">Engagement</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">
                          Updated: {new Date(topic.lastUpdated).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    {isEditing && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <Label className="text-xs">Name</Label>
                          <Input
                            value={topic.name}
                            onChange={(e) => {
                              const newTopics = [...trendingTopics]
                              (newTopics[index] ? newTopics[index].name : undefined) = e.target.value
                              setTrendingTopics(newTopics)
                            }}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Hashtag</Label>
                          <Input
                            value={topic.hashtag}
                            onChange={(e) => {
                              const newTopics = [...trendingTopics]
                              (newTopics[index] ? newTopics[index].hashtag : undefined) = e.target.value
                              setTrendingTopics(newTopics)
                            }}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Trend</Label>
                          <Select
                            value={topic.trend}
                            onValueChange={(value: "rising" | "stable" | "declining") => {
                              const newTopics = [...trendingTopics]
                              (newTopics[index] ? newTopics[index].trend : undefined) = value
                              setTrendingTopics(newTopics)
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="rising">Rising</SelectItem>
                              <SelectItem value="stable">Stable</SelectItem>
                              <SelectItem value="declining">Declining</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {isEditing && (
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                  <Button onClick={() => handleSave("Trending topics")}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Algorithms Tab */}
        <TabsContent value="algorithms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Feed Algorithms</CardTitle>
              <CardDescription>Configure how posts are ranked and displayed in the feed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {algorithms.map((algorithm, index) => (
                  <div key={algorithm.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{algorithm.name}</h4>
                        <p className="text-sm text-muted-foreground">{algorithm.description}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Switch
                          checked={algorithm.enabled}
                          onCheckedChange={(checked) => {
                            const newAlgorithms = [...algorithms]
                            (newAlgorithms[index] ? newAlgorithms[index].enabled : undefined) = checked
                            setAlgorithms(newAlgorithms)
                          }}
                        />
                        <Badge variant="outline">Priority: {algorithm.priority}</Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Configuration</Label>
                        <div className="mt-2 space-y-2">
                          {Object.entries(algorithm.config).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">{key}:</span>
                              <span className="text-sm font-mono">{JSON.stringify(value)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Priority</Label>
                        <div className="mt-2">
                          <Input
                            type="number"
                            value={algorithm.priority}
                            onChange={(e) => {
                              const newAlgorithms = [...algorithms]
                              (newAlgorithms[index] ? newAlgorithms[index].priority : undefined) = parseInt(e.target.value)
                              setAlgorithms(newAlgorithms)
                            }}
                            min="1"
                            max="10"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Moderation Tab */}
        <TabsContent value="moderation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Moderation</CardTitle>
              <CardDescription>Moderation settings and automated content filtering</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Automated Moderation</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-flag">Auto-flag suspicious content</Label>
                      <Switch id="auto-flag" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="spam-filter">Spam filtering</Label>
                      <Switch id="spam-filter" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="toxicity-check">Toxicity detection</Label>
                      <Switch id="toxicity-check" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="duplicate-check">Duplicate content check</Label>
                      <Switch id="duplicate-check" defaultChecked />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Moderation Rules</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="require-approval">Require approval for new users</Label>
                      <Switch id="require-approval" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-remove">Auto-remove flagged content</Label>
                      <Switch id="auto-remove" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="user-reporting">Enable user reporting</Label>
                      <Switch id="user-reporting" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="moderation-queue">Moderation queue</Label>
                      <Switch id="moderation-queue" defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <Button onClick={handlePublish} className="w-full">
                  <Shield className="w-4 h-4 mr-2" />
                  Update Moderation Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
