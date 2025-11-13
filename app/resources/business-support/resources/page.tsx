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
  FileText,
  Download,
  Eye,
  Star,
  Heart,
  Share2,
  Bookmark,
  BookmarkCheck,
  MoreHorizontal,
  Settings,
  HelpCircle,
  Info,
  AlertCircle,
  CheckCircle,
  XCircle,
  Lightbulb,
  Zap,
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
  MessageSquare,
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
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  BookOpen,
  Rocket,
  Database,
  Server,
  Cloud,
  Wifi,
  WifiOff,
  Globe,
  Clock,
  Mail,
  Send,
  Upload,
  Plus,
  Edit,
  Trash2,
  X,
  Target,
  TrendingUp,
  BarChart3,
  Building2,
  DollarSign,
  Award,
  Trophy,
  Medal,
  Crown,
  Gem,
  Sparkles,
  ThumbsUp,
  ThumbsDown,
  Calendar,
  Users
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function ResourcesPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [sortBy, setSortBy] = useState("popularity")
  const [showFilters, setShowFilters] = useState(false)

  const categories = [
    { id: "all", name: "All Categories", count: 156 },
    { id: "planning", name: "Business Planning", count: 45 },
    { id: "funding", name: "Funding & Finance", count: 32 },
    { id: "legal", name: "Legal & Compliance", count: 28 },
    { id: "marketing", name: "Marketing & Sales", count: 25 },
    { id: "operations", name: "Operations", count: 18 },
    { id: "technology", name: "Technology", count: 8 }
  ]

  const resourceTypes = [
    { id: "all", name: "All Types", count: 156 },
    { id: "templates", name: "Templates", count: 67 },
    { id: "guides", name: "Guides", count: 45 },
    { id: "checklists", name: "Checklists", count: 28 },
    { id: "tools", name: "Tools", count: 16 }
  ]

  const resources = [
    {
      id: 1,
      title: "Business Plan Template",
      description: "Comprehensive business plan template with financial projections, market analysis, and executive summary sections.",
      type: "Template",
      category: "Planning",
      downloads: 1247,
      rating: 4.8,
      fileSize: "2.3 MB",
      format: "PDF",
      tags: ["Business Plan", "Financial Projections", "Market Analysis"],
      isBookmarked: false,
      isPremium: false,
      author: "GrowthLab Team",
      lastUpdated: "2024-01-15"
    },
    {
      id: 2,
      title: "Funding Guide 2024",
      description: "Complete guide to funding options, grants, and investor relations for startups and growing businesses.",
      type: "Guide",
      category: "Funding",
      downloads: 892,
      rating: 4.7,
      fileSize: "5.1 MB",
      format: "PDF",
      tags: ["Funding", "Grants", "Investors", "Startups"],
      isBookmarked: true,
      isPremium: false,
      author: "GrowthLab Team",
      lastUpdated: "2024-01-10"
    },
    {
      id: 3,
      title: "Legal Requirements Checklist",
      description: "Essential legal requirements checklist for new businesses and startups to ensure compliance.",
      type: "Checklist",
      category: "Legal",
      downloads: 567,
      rating: 4.6,
      fileSize: "1.2 MB",
      format: "PDF",
      tags: ["Legal", "Compliance", "Startups", "Requirements"],
      isBookmarked: false,
      isPremium: false,
      author: "Legal Team",
      lastUpdated: "2024-01-08"
    },
    {
      id: 4,
      title: "Marketing Strategy Template",
      description: "Step-by-step marketing strategy template to help you create and execute effective marketing campaigns.",
      type: "Template",
      category: "Marketing",
      downloads: 743,
      rating: 4.9,
      fileSize: "3.4 MB",
      format: "PDF",
      tags: ["Marketing", "Strategy", "Campaigns", "Digital"],
      isBookmarked: true,
      isPremium: true,
      author: "Marketing Team",
      lastUpdated: "2024-01-12"
    },
    {
      id: 5,
      title: "Financial Projections Calculator",
      description: "Interactive Excel tool to create detailed financial projections and cash flow forecasts for your business.",
      type: "Tool",
      category: "Funding",
      downloads: 456,
      rating: 4.5,
      fileSize: "8.7 MB",
      format: "Excel",
      tags: ["Financial", "Projections", "Calculator", "Excel"],
      isBookmarked: false,
      isPremium: true,
      author: "Finance Team",
      lastUpdated: "2024-01-05"
    },
    {
      id: 6,
      title: "Operations Manual Template",
      description: "Comprehensive operations manual template to document processes, procedures, and best practices.",
      type: "Template",
      category: "Operations",
      downloads: 234,
      rating: 4.4,
      fileSize: "4.2 MB",
      format: "Word",
      tags: ["Operations", "Manual", "Processes", "Procedures"],
      isBookmarked: false,
      isPremium: false,
      author: "Operations Team",
      lastUpdated: "2024-01-03"
    },
    {
      id: 7,
      title: "Startup Legal Guide",
      description: "Comprehensive legal guide covering entity formation, contracts, IP protection, and compliance requirements.",
      type: "Guide",
      category: "Legal",
      downloads: 678,
      rating: 4.7,
      fileSize: "6.8 MB",
      format: "PDF",
      tags: ["Legal", "Startups", "Contracts", "IP Protection"],
      isBookmarked: true,
      isPremium: true,
      author: "Legal Team",
      lastUpdated: "2024-01-01"
    },
    {
      id: 8,
      title: "Technology Stack Checklist",
      description: "Essential technology stack checklist for startups to choose the right tools and platforms.",
      type: "Checklist",
      category: "Technology",
      downloads: 189,
      rating: 4.3,
      fileSize: "0.8 MB",
      format: "PDF",
      tags: ["Technology", "Stack", "Tools", "Platforms"],
      isBookmarked: false,
      isPremium: false,
      author: "Tech Team",
      lastUpdated: "2023-12-28"
    }
  ]

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || resource.category.toLowerCase() === selectedCategory
    const matchesType = selectedType === "all" || resource.type.toLowerCase() === selectedType
    return matchesSearch && matchesCategory && matchesType
  })

  const handleDownloadResource = (resourceId: number) => {
    toast({
      title: "Resource Downloaded",
      description: "Resource download started successfully.",
    })
  }

  const handleBookmarkResource = (resourceId: number) => {
    toast({
      title: "Resource Bookmarked",
      description: "Resource added to your bookmarks.",
    })
  }

  const handlePreviewResource = (resourceId: number) => {
    toast({
      title: "Opening Preview",
      description: "Loading resource preview...",
    })
  }

  const handleShareResource = (resourceId: number) => {
    toast({
      title: "Resource Shared",
      description: "Resource link copied to clipboard.",
    })
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Template":
        return <FileText className="h-5 w-5 text-blue-500" />
      case "Guide":
        return <BookOpen className="h-5 w-5 text-green-500" />
      case "Checklist":
        return <CheckCircle className="h-5 w-5 text-orange-500" />
      case "Tool":
        return <Settings className="h-5 w-5 text-purple-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "PDF":
        return <FileText className="h-4 w-4 text-red-500" />
      case "Excel":
        return <BarChart3 className="h-4 w-4 text-green-500" />
      case "Word":
        return <FileText className="h-4 w-4 text-blue-500" />
      default:
        return <FileText className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/resources/business-support">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Business Support
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Business Resources</h1>
                <p className="text-sm text-gray-600">Templates, guides, and tools for your business</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                <Upload className="h-4 w-4 mr-2" />
                Upload Resource
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="space-y-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search resources by title, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-white rounded-lg border">
              <div>
                <label className="text-sm font-medium text-gray-700">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name} ({category.count})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {resourceTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name} ({type.count})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="popularity">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="recent">Most Recent</option>
                  <option value="downloads">Most Downloaded</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Format</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="all">All Formats</option>
                  <option value="pdf">PDF</option>
                  <option value="excel">Excel</option>
                  <option value="word">Word</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <Card key={resource.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getTypeIcon(resource.type)}
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg group-hover:text-[#0F7377] transition-colors">
                        {resource.title}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {resource.type}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {resource.category}
                        </Badge>
                        {resource.isPremium && (
                          <Badge className="text-xs bg-[#F59E0B] hover:bg-[#F59E0B]/90">
                            Premium
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleBookmarkResource(resource.id)}>
                      {resource.isBookmarked ? (
                        <BookmarkCheck className="h-4 w-4" />
                      ) : (
                        <Bookmark className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                
                <p className="text-gray-700 text-sm mb-4 line-clamp-3">{resource.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Downloads</span>
                    <span>{resource.downloads.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Rating</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span>{resource.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>File Size</span>
                    <span>{resource.fileSize}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Format</span>
                    <div className="flex items-center space-x-1">
                      {getFormatIcon(resource.format)}
                      <span>{resource.format}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Author</span>
                    <span>{resource.author}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {resource.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="space-y-2">
                  <Button 
                    size="sm" 
                    className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90"
                    onClick={() => handleDownloadResource(resource.id)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handlePreviewResource(resource.id)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Preview
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleShareResource(resource.id)}
                    >
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            <RefreshCw className="h-4 w-4 mr-2" />
            Load More Resources
          </Button>
        </div>
      </div>
    </div>
  )
}
