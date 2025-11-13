"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft,
  Search,
  Filter,
  Download,
  FileText,
  Video,
  Image,
  Link as LinkIcon,
  BookOpen,
  Code,
  BarChart3,
  Users,
  Target,
  Zap,
  Star,
  Clock,
  Eye,
  ThumbsUp,
  Share2,
  Bookmark,
  BookmarkCheck,
  Plus,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  FileSpreadsheet,
  Presentation,
  Database,
  Settings,
  Globe,
  Lock,
  Unlock,
  TrendingUp,
  Award,
  CheckCircle,
  AlertCircle,
  Info
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function ResourcesPage() {
  const { toast } = useToast()
  const [isMobile, setIsMobile] = useState(false)
  const [activeTab, setActiveTab] = useState("templates")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const categories = [
    { value: "all", label: "All Resources", count: 156 },
    { value: "templates", label: "Templates", count: 45 },
    { value: "guides", label: "Guides", count: 32 },
    { value: "tools", label: "Tools", count: 28 },
    { value: "checklists", label: "Checklists", count: 24 },
    { value: "frameworks", label: "Frameworks", count: 18 },
    { value: "worksheets", label: "Worksheets", count: 9 }
  ]

  const templates = [
    {
      id: 1,
      title: "Startup Pitch Deck Template",
      description: "Professional pitch deck template with 15 essential slides for fundraising",
      type: "Presentation",
      category: "templates",
      downloads: 1247,
      rating: 4.8,
      price: "Free",
      tags: ["Pitch Deck", "Fundraising", "Investors"],
      fileSize: "2.4 MB",
      format: "PPTX",
      isBookmarked: false,
      isDownloaded: false,
      author: "GrowthLab Team",
      lastUpdated: "2024-01-15",
      preview: "/pitch-deck-preview.png"
    },
    {
      id: 2,
      title: "Business Model Canvas",
      description: "Interactive business model canvas for strategic planning and validation",
      type: "Worksheet",
      category: "templates",
      downloads: 892,
      rating: 4.9,
      price: "Free",
      tags: ["Business Model", "Strategy", "Planning"],
      fileSize: "1.2 MB",
      format: "PDF",
      isBookmarked: true,
      isDownloaded: true,
      author: "Strategy Experts",
      lastUpdated: "2024-01-10",
      preview: "/business-model-preview.png"
    },
    {
      id: 3,
      title: "Financial Projections Template",
      description: "Comprehensive financial model template with 3-year projections",
      type: "Spreadsheet",
      category: "templates",
      downloads: 654,
      rating: 4.7,
      price: "Premium",
      tags: ["Financials", "Projections", "Modeling"],
      fileSize: "3.1 MB",
      format: "XLSX",
      isBookmarked: false,
      isDownloaded: false,
      author: "Finance Team",
      lastUpdated: "2024-01-12",
      preview: "/financial-model-preview.png"
    }
  ]

  const guides = [
    {
      id: 1,
      title: "Complete Guide to Startup Funding",
      description: "Step-by-step guide covering all funding stages from pre-seed to IPO",
      type: "Guide",
      category: "guides",
      downloads: 2156,
      rating: 4.9,
      price: "Free",
      tags: ["Funding", "Investors", "Venture Capital"],
      fileSize: "4.2 MB",
      format: "PDF",
      isBookmarked: true,
      isDownloaded: false,
      author: "Funding Experts",
      lastUpdated: "2024-01-08",
      preview: "/funding-guide-preview.png"
    },
    {
      id: 2,
      title: "Product-Market Fit Playbook",
      description: "Comprehensive playbook for achieving and measuring product-market fit",
      type: "Guide",
      category: "guides",
      downloads: 1834,
      rating: 4.8,
      price: "Free",
      tags: ["Product", "Market Fit", "Validation"],
      fileSize: "3.8 MB",
      format: "PDF",
      isBookmarked: false,
      isDownloaded: true,
      author: "Product Team",
      lastUpdated: "2024-01-05",
      preview: "/pmf-playbook-preview.png"
    }
  ]

  const tools = [
    {
      id: 1,
      title: "Startup Metrics Calculator",
      description: "Calculate key startup metrics including CAC, LTV, churn rate, and more",
      type: "Tool",
      category: "tools",
      downloads: 987,
      rating: 4.6,
      price: "Free",
      tags: ["Metrics", "Analytics", "Calculation"],
      fileSize: "1.5 MB",
      format: "XLSX",
      isBookmarked: false,
      isDownloaded: false,
      author: "Analytics Team",
      lastUpdated: "2024-01-14",
      preview: "/metrics-calculator-preview.png"
    },
    {
      id: 2,
      title: "Competitive Analysis Framework",
      description: "Structured framework for analyzing competitors and market positioning",
      type: "Tool",
      category: "tools",
      downloads: 743,
      rating: 4.7,
      price: "Free",
      tags: ["Competition", "Analysis", "Strategy"],
      fileSize: "2.1 MB",
      format: "PDF",
      isBookmarked: true,
      isDownloaded: false,
      author: "Strategy Team",
      lastUpdated: "2024-01-11",
      preview: "/competitive-analysis-preview.png"
    }
  ]

  const checklists = [
    {
      id: 1,
      title: "Pre-Launch Checklist",
      description: "Essential checklist to ensure your startup is ready for launch",
      type: "Checklist",
      category: "checklists",
      downloads: 1456,
      rating: 4.8,
      price: "Free",
      tags: ["Launch", "Preparation", "Checklist"],
      fileSize: "0.8 MB",
      format: "PDF",
      isBookmarked: false,
      isDownloaded: true,
      author: "Launch Team",
      lastUpdated: "2024-01-13",
      preview: "/pre-launch-checklist-preview.png"
    },
    {
      id: 2,
      title: "Investor Meeting Preparation",
      description: "Comprehensive checklist for preparing and conducting investor meetings",
      type: "Checklist",
      category: "checklists",
      downloads: 892,
      rating: 4.9,
      price: "Free",
      tags: ["Investors", "Meetings", "Preparation"],
      fileSize: "1.1 MB",
      format: "PDF",
      isBookmarked: true,
      isDownloaded: false,
      author: "Investment Team",
      lastUpdated: "2024-01-09",
      preview: "/investor-meeting-checklist-preview.png"
    }
  ]

  const frameworks = [
    {
      id: 1,
      title: "Lean Startup Methodology",
      description: "Complete framework for building and scaling startups using lean principles",
      type: "Framework",
      category: "frameworks",
      downloads: 2134,
      rating: 4.9,
      price: "Free",
      tags: ["Lean Startup", "Methodology", "Validation"],
      fileSize: "3.2 MB",
      format: "PDF",
      isBookmarked: true,
      isDownloaded: false,
      author: "Methodology Team",
      lastUpdated: "2024-01-07",
      preview: "/lean-startup-framework-preview.png"
    },
    {
      id: 2,
      title: "Growth Hacking Framework",
      description: "Systematic approach to rapid growth through experimentation and optimization",
      type: "Framework",
      category: "frameworks",
      downloads: 1678,
      rating: 4.7,
      price: "Free",
      tags: ["Growth", "Hacking", "Experimentation"],
      fileSize: "2.9 MB",
      format: "PDF",
      isBookmarked: false,
      isDownloaded: true,
      author: "Growth Team",
      lastUpdated: "2024-01-06",
      preview: "/growth-hacking-framework-preview.png"
    }
  ]

  const worksheets = [
    {
      id: 1,
      title: "Customer Persona Worksheet",
      description: "Interactive worksheet for creating detailed customer personas",
      type: "Worksheet",
      category: "worksheets",
      downloads: 756,
      rating: 4.6,
      price: "Free",
      tags: ["Personas", "Customers", "Research"],
      fileSize: "1.8 MB",
      format: "PDF",
      isBookmarked: false,
      isDownloaded: false,
      author: "Research Team",
      lastUpdated: "2024-01-04",
      preview: "/customer-persona-worksheet-preview.png"
    },
    {
      id: 2,
      title: "Value Proposition Canvas",
      description: "Structured worksheet for defining and refining your value proposition",
      type: "Worksheet",
      category: "worksheets",
      downloads: 634,
      rating: 4.8,
      price: "Free",
      tags: ["Value Proposition", "Canvas", "Strategy"],
      fileSize: "1.4 MB",
      format: "PDF",
      isBookmarked: true,
      isDownloaded: false,
      author: "Strategy Team",
      lastUpdated: "2024-01-03",
      preview: "/value-proposition-canvas-preview.png"
    }
  ]

  const allResources = [
    ...templates,
    ...guides,
    ...tools,
    ...checklists,
    ...frameworks,
    ...worksheets
  ]

  const filteredResources = allResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleDownload = (resourceId: number) => {
    toast({
      title: "Download Started",
      description: "Your resource is being downloaded.",
    })
  }

  const handleBookmark = (resourceId: number) => {
    toast({
      title: "Bookmarked",
      description: "Resource added to your bookmarks.",
    })
  }

  const handleShare = (resourceId: number) => {
    toast({
      title: "Shared",
      description: "Resource link copied to clipboard.",
    })
  }

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(section)) {
      newExpanded.delete(section)
    } else {
      newExpanded.add(section)
    }
    setExpandedSections(newExpanded)
  }

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "Presentation":
        return <Presentation className="h-5 w-5" />
      case "Spreadsheet":
        return <FileSpreadsheet className="h-5 w-5" />
      case "Worksheet":
        return <FileText className="h-5 w-5" />
      case "Guide":
        return <BookOpen className="h-5 w-5" />
      case "Tool":
        return <Settings className="h-5 w-5" />
      case "Checklist":
        return <CheckCircle className="h-5 w-5" />
      case "Framework":
        return <Target className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
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
                <Link href="/resources/startup-school">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Startup School
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Resources</h1>
                <p className="text-sm text-gray-600">Templates, guides, and tools for startup success</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Upload Resource
              </Button>
              <Button variant="outline" size="sm">
                <Bookmark className="h-4 w-4 mr-2" />
                My Bookmarks
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search resources..."
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
                  <option key={category.value} value={category.value}>
                    {category.label} ({category.count})
                  </option>
                ))}
              </select>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Resources</p>
                  <p className="text-2xl font-bold">156</p>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Downloads</p>
                  <p className="text-2xl font-bold">12.4K</p>
                </div>
                <Download className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Bookmarks</p>
                  <p className="text-2xl font-bold">89</p>
                </div>
                <Bookmark className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Rating</p>
                  <p className="text-2xl font-bold">4.8</p>
                </div>
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="guides">Guides</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
            <TabsTrigger value="checklists">Checklists</TabsTrigger>
            <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
            <TabsTrigger value="worksheets">Worksheets</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>

          {/* Resources Grid */}
          <TabsContent value={activeTab} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <Card key={resource.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          {getResourceIcon(resource.type)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{resource.title}</h3>
                          <p className="text-sm text-gray-600">{resource.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {resource.price === "Free" ? (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            Free
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-blue-600 border-blue-600">
                            Premium
                          </Badge>
                        )}
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{resource.description}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {resource.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
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
                        <span>Size</span>
                        <span>{resource.fileSize}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Format</span>
                        <span>{resource.format}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleDownload(resource.id)}
                          className="flex-1"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleBookmark(resource.id)}
                        >
                          {resource.isBookmarked ? (
                            <BookmarkCheck className="h-4 w-4" />
                          ) : (
                            <Bookmark className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleShare(resource.id)}
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
        </Tabs>
      </div>
    </div>
  )
}
