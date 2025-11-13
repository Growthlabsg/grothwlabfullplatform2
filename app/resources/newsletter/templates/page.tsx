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
  Grid,
  List,
  Download,
  Eye,
  Copy,
  Edit,
  Trash2,
  MoreHorizontal,
  Plus,
  Star,
  Heart,
  Share2,
  Bookmark,
  BookmarkCheck,
  Settings,
  HelpCircle,
  Info,
  AlertCircle,
  CheckCircle,
  XCircle,
  Award,
  Trophy,
  Medal,
  Crown,
  Gem,
  Sparkles,
  Target,
  Users,
  Calendar,
  Clock,
  Globe,
  Lock,
  Unlock,
  Bell,
  BellOff,
  Mail,
  Send,
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
  Upload,
  RefreshCw,
  Save,
  Cut,
  Paste,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Move,
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
  Lightbulb,
  Zap,
  Award as AwardIcon,
  Trophy as TrophyIcon,
  Medal as MedalIcon,
  Crown as CrownIcon,
  Gem as GemIcon,
  Sparkles as SparklesIcon
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function NewsletterTemplatesPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("all")
  const [viewMode, setViewMode] = useState("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("popular")

  const categories = [
    { id: "all", name: "All Templates", count: 24 },
    { id: "weekly", name: "Weekly Updates", count: 8 },
    { id: "monthly", name: "Monthly Reports", count: 4 },
    { id: "special", name: "Special Events", count: 3 },
    { id: "product", name: "Product Updates", count: 5 },
    { id: "industry", name: "Industry News", count: 4 }
  ]

  const templates = [
    {
      id: 1,
      name: "Weekly Digest Template",
      description: "Clean, professional template for weekly newsletters with modern design",
      category: "weekly",
      preview: "/newsletter-templates/weekly-digest.jpg",
      isPopular: true,
      isFeatured: true,
      downloads: 234,
      rating: 4.8,
      reviews: 45,
      price: "Free",
      author: "GrowthLab Team",
      lastUpdated: "2024-01-15",
      tags: ["Clean", "Professional", "Modern"],
      features: ["Responsive", "Dark Mode", "Customizable"]
    },
    {
      id: 2,
      name: "Product Announcement",
      description: "Eye-catching template for product launches and updates with bold visuals",
      category: "product",
      preview: "/newsletter-templates/product-announcement.jpg",
      isPopular: false,
      isFeatured: true,
      downloads: 156,
      rating: 4.6,
      reviews: 32,
      price: "$29",
      author: "Design Studio",
      lastUpdated: "2024-01-10",
      tags: ["Bold", "Visual", "Product"],
      features: ["Hero Section", "CTA Buttons", "Image Gallery"]
    },
    {
      id: 3,
      name: "Event Invitation",
      description: "Engaging template for event invitations and reminders with RSVP functionality",
      category: "special",
      preview: "/newsletter-templates/event-invitation.jpg",
      isPopular: true,
      isFeatured: false,
      downloads: 189,
      rating: 4.9,
      reviews: 28,
      price: "Free",
      author: "Event Pro",
      lastUpdated: "2024-01-12",
      tags: ["Event", "Invitation", "RSVP"],
      features: ["RSVP Button", "Calendar Integration", "Social Sharing"]
    },
    {
      id: 4,
      name: "Industry News Roundup",
      description: "Professional template for industry news and analysis with clean typography",
      category: "industry",
      preview: "/newsletter-templates/industry-news.jpg",
      isPopular: false,
      isFeatured: false,
      downloads: 98,
      rating: 4.4,
      reviews: 18,
      price: "$19",
      author: "News Pro",
      lastUpdated: "2024-01-08",
      tags: ["News", "Professional", "Typography"],
      features: ["Article Layout", "Image Support", "Social Links"]
    },
    {
      id: 5,
      name: "Monthly Report",
      description: "Comprehensive template for monthly reports with charts and data visualization",
      category: "monthly",
      preview: "/newsletter-templates/monthly-report.jpg",
      isPopular: true,
      isFeatured: true,
      downloads: 167,
      rating: 4.7,
      reviews: 41,
      price: "$39",
      author: "Data Studio",
      lastUpdated: "2024-01-14",
      tags: ["Report", "Data", "Charts"],
      features: ["Chart Integration", "Data Tables", "Progress Bars"]
    },
    {
      id: 6,
      name: "Startup Newsletter",
      description: "Modern template designed specifically for startup newsletters and updates",
      category: "weekly",
      preview: "/newsletter-templates/startup-newsletter.jpg",
      isPopular: true,
      isFeatured: false,
      downloads: 203,
      rating: 4.9,
      reviews: 52,
      price: "Free",
      author: "Startup Hub",
      lastUpdated: "2024-01-16",
      tags: ["Startup", "Modern", "Tech"],
      features: ["Tech Styling", "Code Blocks", "API Integration"]
    }
  ]

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedTemplates = filteredTemplates.sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.downloads - a.downloads
      case "rating":
        return b.rating - a.rating
      case "newest":
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
      case "price":
        return a.price === "Free" ? -1 : b.price === "Free" ? 1 : 0
      default:
        return 0
    }
  })

  const handleUseTemplate = (templateId: number) => {
    toast({
      title: "Using Template",
      description: "Redirecting to newsletter editor with selected template...",
    })
  }

  const handlePreview = (templateId: number) => {
    toast({
      title: "Preview",
      description: "Opening template preview...",
    })
  }

  const handleDownload = (templateId: number) => {
    toast({
      title: "Downloading",
      description: "Template download started...",
    })
  }

  const handleBookmark = (templateId: number) => {
    toast({
      title: "Bookmarked",
      description: "Template added to your bookmarks.",
    })
  }

  const handleShare = (templateId: number) => {
    toast({
      title: "Shared",
      description: "Template link copied to clipboard.",
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
                <Link href="/resources/newsletter">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Newsletters
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Newsletter Templates</h1>
                <p className="text-sm text-gray-600">Choose from professional newsletter templates</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Create Template
              </Button>
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Upload Template
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search templates..."
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
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest</option>
              <option value="price">Price: Low to High</option>
            </select>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Templates</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="free">Free</TabsTrigger>
            <TabsTrigger value="premium">Premium</TabsTrigger>
          </TabsList>

          {/* All Templates Tab */}
          <TabsContent value="all" className="space-y-6">
            {/* View Mode Toggle */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                {sortedTemplates.length} template{sortedTemplates.length !== 1 ? 's' : ''} found
              </p>
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Templates Grid/List */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedTemplates.map((template) => (
                  <Card key={template.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <div className="relative">
                      <div className="w-full h-48 bg-gradient-to-br from-[#0F7377] to-[#F59E0B] rounded-t-lg flex items-center justify-center">
                        <FileText className="h-16 w-16 text-white opacity-80" />
                      </div>
                      <div className="absolute top-4 right-4 flex space-x-2">
                        {template.isFeatured && (
                          <Badge className="bg-[#F59E0B] text-white">Featured</Badge>
                        )}
                        {template.isPopular && (
                          <Badge variant="secondary">Popular</Badge>
                        )}
                      </div>
                      <div className="absolute top-4 left-4">
                        <Badge variant="outline" className="bg-white/90">
                          {template.price}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2 group-hover:text-[#0F7377] transition-colors">
                            {template.name}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3">{template.description}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>Category</span>
                          <Badge variant="outline">{template.category}</Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>Downloads</span>
                          <span>{template.downloads.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>Rating</span>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span>{template.rating}</span>
                            <span className="text-gray-500">({template.reviews})</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>Author</span>
                          <span>{template.author}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {template.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Button
                          size="sm"
                          onClick={() => handleUseTemplate(template.id)}
                          className="bg-[#0F7377] hover:bg-[#0F7377]/90"
                        >
                          <Copy className="h-4 w-4 mr-1" />
                          Use Template
                        </Button>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePreview(template.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownload(template.id)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleBookmark(template.id)}
                          >
                            <Bookmark className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleShare(template.id)}
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {sortedTemplates.map((template) => (
                  <Card key={template.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-6">
                        <div className="w-24 h-24 bg-gradient-to-br from-[#0F7377] to-[#F59E0B] rounded-lg flex items-center justify-center">
                          <FileText className="h-12 w-12 text-white opacity-80" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-lg mb-1">{template.name}</h3>
                              <p className="text-gray-600 text-sm mb-2">{template.description}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              {template.isFeatured && (
                                <Badge className="bg-[#F59E0B] text-white">Featured</Badge>
                              )}
                              {template.isPopular && (
                                <Badge variant="secondary">Popular</Badge>
                              )}
                              <Badge variant="outline">{template.price}</Badge>
                            </div>
                          </div>
                          <div className="flex items-center space-x-6 text-sm text-gray-600 mb-3">
                            <span>Category: {template.category}</span>
                            <span>Downloads: {template.downloads.toLocaleString()}</span>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span>{template.rating} ({template.reviews})</span>
                            </div>
                            <span>By {template.author}</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mb-4">
                            {template.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            onClick={() => handleUseTemplate(template.id)}
                            className="bg-[#0F7377] hover:bg-[#0F7377]/90"
                          >
                            <Copy className="h-4 w-4 mr-1" />
                            Use Template
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePreview(template.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownload(template.id)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleBookmark(template.id)}
                          >
                            <Bookmark className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleShare(template.id)}
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Featured Tab */}
          <TabsContent value="featured" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.filter(t => t.isFeatured).map((template) => (
                <Card key={template.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="relative">
                    <div className="w-full h-48 bg-gradient-to-br from-[#0F7377] to-[#F59E0B] rounded-t-lg flex items-center justify-center">
                      <FileText className="h-16 w-16 text-white opacity-80" />
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-[#F59E0B] text-white">Featured</Badge>
                    </div>
                    <div className="absolute top-4 left-4">
                      <Badge variant="outline" className="bg-white/90">
                        {template.price}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-[#0F7377] transition-colors">
                      {template.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                    <div className="flex items-center justify-between">
                      <Button
                        size="sm"
                        onClick={() => handleUseTemplate(template.id)}
                        className="bg-[#0F7377] hover:bg-[#0F7377]/90"
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Use Template
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handlePreview(template.id)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Free Tab */}
          <TabsContent value="free" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.filter(t => t.price === "Free").map((template) => (
                <Card key={template.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="relative">
                    <div className="w-full h-48 bg-gradient-to-br from-[#0F7377] to-[#F59E0B] rounded-t-lg flex items-center justify-center">
                      <FileText className="h-16 w-16 text-white opacity-80" />
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-green-500 text-white">Free</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-[#0F7377] transition-colors">
                      {template.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                    <div className="flex items-center justify-between">
                      <Button
                        size="sm"
                        onClick={() => handleUseTemplate(template.id)}
                        className="bg-[#0F7377] hover:bg-[#0F7377]/90"
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Use Template
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handlePreview(template.id)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Premium Tab */}
          <TabsContent value="premium" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.filter(t => t.price !== "Free").map((template) => (
                <Card key={template.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="relative">
                    <div className="w-full h-48 bg-gradient-to-br from-[#0F7377] to-[#F59E0B] rounded-t-lg flex items-center justify-center">
                      <FileText className="h-16 w-16 text-white opacity-80" />
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-purple-500 text-white">Premium</Badge>
                    </div>
                    <div className="absolute top-4 left-4">
                      <Badge variant="outline" className="bg-white/90">
                        {template.price}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-[#0F7377] transition-colors">
                      {template.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                    <div className="flex items-center justify-between">
                      <Button
                        size="sm"
                        onClick={() => handleUseTemplate(template.id)}
                        className="bg-[#0F7377] hover:bg-[#0F7377]/90"
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Use Template
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handlePreview(template.id)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
