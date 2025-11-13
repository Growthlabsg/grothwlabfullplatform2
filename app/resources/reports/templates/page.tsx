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
  Rocket,
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
  MousePointer,
  Calendar,
  Clock,
  Mail,
  Send,
  Upload,
  Plus,
  Edit,
  Trash2,
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
  ThumbsUp,
  ThumbsDown,
  Globe,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  BookOpen,
  Database,
  Server,
  Cloud,
  Wifi,
  WifiOff,
  Image,
  Video,
  Link as LinkIcon,
  ChevronUp,
  X,
  Users,
  MessageCircle as MessageCircleIcon,
  TrendingDown,
  PieChart,
  Activity,
  LineChart,
  BarChart,
  TrendingUp as TrendingUpIcon
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function ReportTemplatesPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showCreateTemplate, setShowCreateTemplate] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const templateCategories = [
    { id: "all", name: "All Templates", count: 45 },
    { id: "financial", name: "Financial Reports", count: 12 },
    { id: "market", name: "Market Analysis", count: 10 },
    { id: "startup", name: "Startup Reports", count: 8 },
    { id: "presentation", name: "Presentations", count: 7 },
    { id: "research", name: "Research Papers", count: 5 },
    { id: "business", name: "Business Plans", count: 3 }
  ]

  const templates = [
    {
      id: 1,
      title: "Financial Report Template",
      description: "Professional template for creating comprehensive financial reports with charts, tables, and analysis sections.",
      category: "financial",
      format: "Excel",
      fileSize: "2.1 MB",
      downloads: 234,
      rating: 4.7,
      price: 0,
      isPremium: false,
      tags: ["Financial", "Charts", "Analysis", "Excel"],
      features: [
        "Pre-built financial charts",
        "Automated calculations",
        "Professional formatting",
        "Multiple sheet layouts"
      ],
      preview: "/templates/financial-preview.png"
    },
    {
      id: 2,
      title: "Market Analysis Template",
      description: "Template for conducting market research and competitive analysis with data visualization and insights sections.",
      category: "market",
      format: "PowerPoint",
      fileSize: "5.3 MB",
      downloads: 189,
      rating: 4.6,
      price: 0,
      isPremium: false,
      tags: ["Market Research", "Analysis", "Charts", "PowerPoint"],
      features: [
        "Market research frameworks",
        "Competitive analysis charts",
        "SWOT analysis templates",
        "Data visualization tools"
      ],
      preview: "/templates/market-preview.png"
    },
    {
      id: 3,
      title: "Startup Pitch Deck Template",
      description: "Modern pitch deck template for startups with customizable slides and professional design elements.",
      category: "startup",
      format: "PowerPoint",
      fileSize: "8.7 MB",
      downloads: 456,
      rating: 4.8,
      price: 0,
      isPremium: false,
      tags: ["Pitch Deck", "Startup", "Presentation", "PowerPoint"],
      features: [
        "20+ slide layouts",
        "Customizable color schemes",
        "Icon libraries",
        "Chart templates"
      ],
      preview: "/templates/pitch-preview.png"
    },
    {
      id: 4,
      title: "Research Paper Template",
      description: "Academic research paper template with proper formatting, citations, and methodology sections.",
      category: "research",
      format: "Word",
      fileSize: "1.8 MB",
      downloads: 123,
      rating: 4.5,
      price: 0,
      isPremium: false,
      tags: ["Research", "Academic", "Citations", "Word"],
      features: [
        "APA/MLA formatting",
        "Citation management",
        "Bibliography templates",
        "Methodology sections"
      ],
      preview: "/templates/research-preview.png"
    },
    {
      id: 5,
      title: "Business Plan Template",
      description: "Comprehensive business plan template with executive summary, financial projections, and market analysis.",
      category: "business",
      format: "Word",
      fileSize: "3.2 MB",
      downloads: 167,
      rating: 4.9,
      price: 0,
      isPremium: false,
      tags: ["Business Plan", "Strategy", "Planning", "Word"],
      features: [
        "Executive summary template",
        "Financial projection sheets",
        "Market analysis framework",
        "Risk assessment tools"
      ],
      preview: "/templates/business-preview.png"
    },
    {
      id: 6,
      title: "Quarterly Report Template",
      description: "Professional quarterly report template with KPI tracking, performance metrics, and executive summary.",
      category: "financial",
      format: "Excel",
      fileSize: "4.1 MB",
      downloads: 298,
      rating: 4.7,
      price: 0,
      isPremium: false,
      tags: ["Quarterly", "KPI", "Performance", "Excel"],
      features: [
        "KPI dashboard",
        "Performance tracking",
        "Executive summary",
        "Automated calculations"
      ],
      preview: "/templates/quarterly-preview.png"
    },
    {
      id: 7,
      title: "Industry Analysis Template",
      description: "Template for conducting industry analysis with Porter's Five Forces, market sizing, and trend analysis.",
      category: "market",
      format: "PowerPoint",
      fileSize: "6.5 MB",
      downloads: 145,
      rating: 4.6,
      price: 0,
      isPremium: false,
      tags: ["Industry", "Analysis", "Porter's Five Forces", "PowerPoint"],
      features: [
        "Porter's Five Forces framework",
        "Market sizing templates",
        "Trend analysis charts",
        "Competitive landscape"
      ],
      preview: "/templates/industry-preview.png"
    },
    {
      id: 8,
      title: "Annual Report Template",
      description: "Corporate annual report template with financial statements, management discussion, and sustainability sections.",
      category: "financial",
      format: "InDesign",
      fileSize: "12.3 MB",
      downloads: 89,
      rating: 4.8,
      price: 0,
      isPremium: false,
      tags: ["Annual Report", "Corporate", "Financial", "InDesign"],
      features: [
        "Financial statement layouts",
        "Management discussion sections",
        "Sustainability reporting",
        "Professional design elements"
      ],
      preview: "/templates/annual-preview.png"
    }
  ]

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleDownloadTemplate = (templateId: number) => {
    toast({
      title: "Template Downloaded",
      description: "Template download started successfully.",
    })
  }

  const handlePreviewTemplate = (templateId: number) => {
    toast({
      title: "Opening Preview",
      description: "Loading template preview...",
    })
  }

  const handleShareTemplate = (templateId: number) => {
    toast({
      title: "Template Shared",
      description: "Template link copied to clipboard.",
    })
  }

  const handleBookmarkTemplate = (templateId: number) => {
    toast({
      title: "Template Bookmarked",
      description: "Template added to your bookmarks.",
    })
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "financial":
        return <DollarSign className="h-5 w-5 text-green-500" />
      case "market":
        return <BarChart3 className="h-5 w-5 text-blue-500" />
      case "startup":
        return <Rocket className="h-5 w-5 text-purple-500" />
      case "presentation":
        return <Presentation className="h-5 w-5 text-orange-500" />
      case "research":
        return <BookOpen className="h-5 w-5 text-red-500" />
      case "business":
        return <Building2 className="h-5 w-5 text-indigo-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "Excel":
        return <Table className="h-4 w-4 text-green-600" />
      case "PowerPoint":
        return <Presentation className="h-4 w-4 text-orange-600" />
      case "Word":
        return <FileText className="h-4 w-4 text-blue-600" />
      case "InDesign":
        return <Layout className="h-4 w-4 text-pink-600" />
      default:
        return <FileText className="h-4 w-4 text-gray-600" />
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
                <Link href="/resources/reports">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Reports
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Report Templates</h1>
                <p className="text-sm text-gray-600">Professional templates for creating reports</p>
              </div>
            </div>
            
            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowCreateTemplate(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Template
              </Button>
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Upload Template
              </Button>
              <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                <Download className="h-4 w-4 mr-2" />
                Download All
              </Button>
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowCreateTemplate(true)}>
                <Plus className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowMobileMenu(true)}>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
              <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Templates</p>
                  <p className="text-2xl font-bold text-gray-900">45</p>
                </div>
                <div className="p-2 bg-[#0F7377]/10 rounded-lg">
                  <FileText className="h-6 w-6 text-[#0F7377]" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Downloads</p>
                  <p className="text-2xl font-bold text-gray-900">1,567</p>
                </div>
                <div className="p-2 bg-[#F59E0B]/10 rounded-lg">
                  <Download className="h-6 w-6 text-[#F59E0B]" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Categories</p>
                  <p className="text-2xl font-bold text-gray-900">7</p>
                </div>
                <div className="p-2 bg-green-100 rounded-lg">
                  <Folder className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Rating</p>
                  <p className="text-2xl font-bold text-gray-900">4.7</p>
                </div>
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Star className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search templates by title, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {templateCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id ? "bg-[#0F7377] hover:bg-[#0F7377]/90" : ""}
              >
                {category.name} ({category.count})
              </Button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getCategoryIcon(template.category)}
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg group-hover:text-[#0F7377] transition-colors">
                        {template.title}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {template.format}
                        </Badge>
                        {template.isPremium && (
                          <Badge className="text-xs bg-[#F59E0B] hover:bg-[#F59E0B]/90">
                            Premium
                          </Badge>
                        )}
                        <Badge variant="secondary" className="text-xs">
                          {template.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleBookmarkTemplate(template.id)}>
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <p className="text-gray-700 text-sm mb-4 line-clamp-3">{template.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Format</span>
                    <div className="flex items-center space-x-1">
                      {getFormatIcon(template.format)}
                      <span>{template.format}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>File Size</span>
                    <span>{template.fileSize}</span>
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
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <p className="text-sm font-medium text-gray-700">Key Features:</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {template.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-center space-x-1">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {template.features.length > 3 && (
                      <li className="text-gray-500">+{template.features.length - 3} more features</li>
                    )}
                  </ul>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {template.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="space-y-2">
                  <Button 
                    size="sm" 
                    className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90"
                    onClick={() => handleDownloadTemplate(template.id)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handlePreviewTemplate(template.id)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Preview
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleShareTemplate(template.id)}
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

        {/* Mobile Menu Modal */}
        {showMobileMenu && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
            <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Menu</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowMobileMenu(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start" onClick={() => setShowCreateTemplate(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Template
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Template
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Download All
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
