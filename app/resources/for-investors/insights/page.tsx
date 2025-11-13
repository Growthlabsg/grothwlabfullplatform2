"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft,
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Target,
  Users,
  Building2,
  Globe,
  Shield,
  Award,
  Trophy,
  Medal,
  Crown,
  Gem,
  Sparkles,
  Star,
  Heart,
  Eye,
  MousePointer,
  Calendar,
  Clock,
  Mail,
  Send,
  Download,
  Upload,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  Settings,
  HelpCircle,
  Info,
  AlertCircle,
  CheckCircle,
  XCircle,
  Lightbulb,
  Zap,
  FileText,
  Image,
  Video,
  Link as LinkIcon,
  ChevronDown,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw,
  RotateCw,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  MessageCircle,
  Reply,
  Flag,
  Archive,
  Tag,
  Folder,
  FolderOpen,
  RefreshCw,
  Save,
  Copy,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Move,
  Grid,
  List,
  Layout,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Quote,
  Link2,
  Unlink,
  Table,
  Columns,
  Rows,
  PlusCircle,
  MinusCircle,
  XCircle as XCircleIcon,
  CheckCircle2,
  AlertTriangle,
  User,
  UserPlus,
  UserMinus,
  UserCheck,
  UserX,
  Bell,
  BellOff,
  Lock,
  Unlock,
  ExternalLink,
  Share2,
  Bookmark,
  BookmarkCheck,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  BookOpen,
  Rocket,
  Code2,
  Database,
  Server,
  Cloud,
  Wifi,
  WifiOff
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function MarketInsightsPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("trends")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: "All Insights", count: 24 },
    { id: "market-research", name: "Market Research", count: 8 },
    { id: "sector-analysis", name: "Sector Analysis", count: 6 },
    { id: "regulatory", name: "Regulatory", count: 4 },
    { id: "trends", name: "Trends", count: 6 }
  ]

  const marketInsights = [
    {
      id: 1,
      title: "AI Investment Trends Q1 2024",
      description: "Comprehensive analysis of AI startup funding patterns, market opportunities, and emerging technologies driving the next wave of innovation.",
      category: "market-research",
      publishDate: "2024-01-15",
      author: "Investment Team",
      readTime: "8 min",
      views: 1247,
      likes: 89,
      tags: ["AI", "Market Analysis", "Trends", "Q1 2024"],
      content: "The AI sector continues to show strong growth with $12.4B invested in Q1 2024, representing a 23% increase from Q4 2023...",
      featured: true,
      premium: false
    },
    {
      id: 2,
      title: "CleanTech Sector Outlook 2024",
      description: "Growth opportunities in renewable energy, sustainability, and environmental technology investments.",
      category: "sector-analysis",
      publishDate: "2024-01-10",
      author: "Research Team",
      readTime: "12 min",
      views: 892,
      likes: 67,
      tags: ["CleanTech", "Sustainability", "Energy", "2024 Outlook"],
      content: "CleanTech investments reached $8.9B in 2023, with significant growth in energy storage and carbon capture technologies...",
      featured: true,
      premium: false
    },
    {
      id: 3,
      title: "FinTech Regulatory Update",
      description: "Impact of new regulations on FinTech investments and compliance requirements for portfolio companies.",
      category: "regulatory",
      publishDate: "2024-01-08",
      author: "Legal Team",
      readTime: "6 min",
      views: 634,
      likes: 45,
      tags: ["FinTech", "Regulation", "Compliance", "Legal"],
      content: "New regulatory frameworks are reshaping the FinTech landscape, with implications for investment strategies...",
      featured: false,
      premium: true
    },
    {
      id: 4,
      title: "Healthcare Innovation Trends",
      description: "Emerging technologies in healthcare, including AI diagnostics, telemedicine, and personalized medicine.",
      category: "sector-analysis",
      publishDate: "2024-01-05",
      author: "Healthcare Team",
      readTime: "10 min",
      views: 756,
      likes: 52,
      tags: ["Healthcare", "Innovation", "AI", "Telemedicine"],
      content: "Healthcare technology investments are accelerating, with AI-powered diagnostics leading the charge...",
      featured: false,
      premium: false
    },
    {
      id: 5,
      title: "Cybersecurity Market Analysis",
      description: "Growing threats and opportunities in cybersecurity, including zero-trust architecture and AI-powered security.",
      category: "market-research",
      publishDate: "2024-01-03",
      author: "Security Team",
      readTime: "9 min",
      views: 543,
      likes: 38,
      tags: ["Cybersecurity", "Zero Trust", "AI Security", "Threats"],
      content: "Cybersecurity spending is expected to reach $200B by 2025, driven by increasing cyber threats...",
      featured: false,
      premium: true
    },
    {
      id: 6,
      title: "ESG Investment Guidelines",
      description: "Environmental, Social, and Governance factors in investment decision-making and portfolio management.",
      category: "regulatory",
      publishDate: "2024-01-01",
      author: "ESG Team",
      readTime: "7 min",
      views: 421,
      likes: 29,
      tags: ["ESG", "Sustainability", "Governance", "Investment"],
      content: "ESG considerations are becoming increasingly important in investment decisions, with regulatory pressure mounting...",
      featured: false,
      premium: false
    }
  ]

  const marketData = [
    {
      sector: "AI/ML",
      totalFunding: "$12.4B",
      dealCount: 342,
      avgDealSize: "$36.3M",
      growth: "+23%",
      trend: "up"
    },
    {
      sector: "CleanTech",
      totalFunding: "$8.9B",
      dealCount: 156,
      avgDealSize: "$57.1M",
      growth: "+18%",
      trend: "up"
    },
    {
      sector: "FinTech",
      totalFunding: "$6.2B",
      dealCount: 234,
      avgDealSize: "$26.5M",
      growth: "+12%",
      trend: "up"
    },
    {
      sector: "HealthTech",
      totalFunding: "$5.8B",
      dealCount: 189,
      avgDealSize: "$30.7M",
      growth: "+31%",
      trend: "up"
    },
    {
      sector: "Cybersecurity",
      totalFunding: "$4.1B",
      dealCount: 98,
      avgDealSize: "$41.8M",
      growth: "+27%",
      trend: "up"
    }
  ]

  const filteredInsights = marketInsights.filter(insight => {
    const matchesSearch = insight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         insight.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         insight.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || insight.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleViewInsight = (insightId: number) => {
    toast({
      title: "Opening Insight",
      description: "Loading market insight details...",
    })
  }

  const handleDownloadInsight = (insightId: number) => {
    toast({
      title: "Downloading Insight",
      description: "Market insight download started...",
    })
  }

  const handleBookmarkInsight = (insightId: number) => {
    toast({
      title: "Bookmarked",
      description: "Insight added to your bookmarks.",
    })
  }

  const handleShareInsight = (insightId: number) => {
    toast({
      title: "Shared",
      description: "Insight link copied to clipboard.",
    })
  }

  const handleLikeInsight = (insightId: number) => {
    toast({
      title: "Liked",
      description: "Thank you for your feedback!",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/resources/for-investors">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to For Investors
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Market Insights</h1>
                <p className="text-sm text-gray-600">Research, analysis, and market intelligence</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Create Insight
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Market Data Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {marketData.map((data, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{data.sector}</p>
                    <p className="text-xl font-bold text-gray-900">{data.totalFunding}</p>
                    <p className="text-xs text-gray-500">{data.dealCount} deals</p>
                    <p className={`text-xs ${data.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {data.growth}
                    </p>
                  </div>
                  <div className="p-2 bg-[#0F7377]/10 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-[#0F7377]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="research">Research</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Trends Tab */}
          <TabsContent value="trends" className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search market insights..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name} ({category.count})
                    </option>
                  ))}
                </select>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>

            {/* Featured Insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredInsights
                .filter(insight => insight.featured)
                .map((insight) => (
                <Card key={insight.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className="bg-[#F59E0B] text-white">Featured</Badge>
                          {insight.premium && (
                            <Badge variant="outline">Premium</Badge>
                          )}
                        </div>
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-[#0F7377] transition-colors">
                          {insight.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">{insight.description}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Author</span>
                        <span>{insight.author}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Published</span>
                        <span>{insight.publishDate}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Read Time</span>
                        <span>{insight.readTime}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Views</span>
                        <span>{insight.views.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {insight.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Button 
                        size="sm" 
                        className="bg-[#0F7377] hover:bg-[#0F7377]/90"
                        onClick={() => handleViewInsight(insight.id)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Read More
                      </Button>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleLikeInsight(insight.id)}
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleBookmarkInsight(insight.id)}
                        >
                          <Bookmark className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleShareInsight(insight.id)}
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* All Insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredInsights
                .filter(insight => !insight.featured)
                .map((insight) => (
                <Card key={insight.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline">{insight.category}</Badge>
                          {insight.premium && (
                            <Badge variant="outline">Premium</Badge>
                          )}
                        </div>
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-[#0F7377] transition-colors">
                          {insight.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">{insight.description}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Author</span>
                        <span>{insight.author}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Published</span>
                        <span>{insight.publishDate}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Read Time</span>
                        <span>{insight.readTime}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Views</span>
                        <span>{insight.views.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {insight.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Button 
                        size="sm" 
                        className="bg-[#0F7377] hover:bg-[#0F7377]/90"
                        onClick={() => handleViewInsight(insight.id)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Read More
                      </Button>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleLikeInsight(insight.id)}
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleBookmarkInsight(insight.id)}
                        >
                          <Bookmark className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleShareInsight(insight.id)}
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Research Tab */}
          <TabsContent value="research" className="space-y-6">
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Research Reports</h3>
              <p className="text-gray-500 mb-4">In-depth research reports and market studies</p>
              <Button className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                <FileText className="h-4 w-4 mr-2" />
                Browse Reports
              </Button>
            </div>
          </TabsContent>

          {/* Analysis Tab */}
          <TabsContent value="analysis" className="space-y-6">
            <div className="text-center py-12">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Market Analysis</h3>
              <p className="text-gray-500 mb-4">Detailed market analysis and sector deep-dives</p>
              <Button className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Analysis
              </Button>
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div className="text-center py-12">
              <Download className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Downloadable Reports</h3>
              <p className="text-gray-500 mb-4">Access comprehensive market reports and data</p>
              <Button className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                <Download className="h-4 w-4 mr-2" />
                Download Reports
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
