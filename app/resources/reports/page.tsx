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

export default function ReportsPage() {
  const { toast } = useToast()
  const [isMobile, setIsMobile] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showCreateReport, setShowCreateReport] = useState(false)
  const [showTemplates, setShowTemplates] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const reportCategories = [
    { id: "all", name: "All Reports", count: 156 },
    { id: "financial", name: "Financial Reports", count: 45 },
    { id: "market", name: "Market Analysis", count: 32 },
    { id: "startup", name: "Startup Reports", count: 28 },
    { id: "industry", name: "Industry Insights", count: 25 },
    { id: "research", name: "Research Papers", count: 18 },
    { id: "trends", name: "Trend Analysis", count: 8 }
  ]

  const reports = [
    {
      id: 1,
      title: "Q4 2024 Startup Funding Report",
      description: "Comprehensive analysis of startup funding trends, top performing sectors, and investment patterns in Q4 2024.",
      category: "financial",
      type: "Quarterly Report",
      author: "GrowthLab Research Team",
      publishDate: "2024-01-15",
      pages: 45,
      downloads: 1247,
      rating: 4.8,
      views: 2891,
      likes: 156,
      status: "Published",
      isBookmarked: false,
      isPremium: false,
      tags: ["Funding", "Startups", "Q4 2024", "Investment"],
      fileSize: "12.3 MB",
      format: "PDF",
      language: "English",
      summary: "This report analyzes $2.3B in startup funding across 450+ deals, highlighting key trends in AI, fintech, and cleantech sectors.",
      keyFindings: [
        "AI startups received 35% of total funding",
        "Fintech sector saw 40% growth in deal volume",
        "Cleantech investments increased by 60%",
        "Average deal size increased by 25%"
      ]
    },
    {
      id: 2,
      title: "AI Market Trends 2024",
      description: "Deep dive into artificial intelligence market trends, emerging technologies, and future predictions for 2024.",
      category: "market",
      type: "Market Analysis",
      author: "Tech Research Institute",
      publishDate: "2024-01-10",
      pages: 67,
      downloads: 892,
      rating: 4.7,
      views: 2134,
      likes: 123,
      status: "Published",
      isBookmarked: true,
      isPremium: true,
      tags: ["AI", "Machine Learning", "Market Trends", "Technology"],
      fileSize: "18.7 MB",
      format: "PDF",
      language: "English",
      summary: "Analysis of the $150B AI market with insights into enterprise adoption, consumer applications, and regulatory landscape.",
      keyFindings: [
        "Enterprise AI adoption increased by 45%",
        "Generative AI market reached $40B",
        "AI regulation frameworks emerging globally",
        "Healthcare AI applications growing 60%"
      ]
    },
    {
      id: 3,
      title: "Startup Ecosystem Report 2024",
      description: "Comprehensive overview of global startup ecosystems, including funding, talent, and innovation metrics.",
      category: "startup",
      type: "Ecosystem Report",
      author: "Global Startup Foundation",
      publishDate: "2024-01-05",
      pages: 89,
      downloads: 567,
      rating: 4.9,
      views: 1876,
      likes: 89,
      status: "Published",
      isBookmarked: false,
      isPremium: false,
      tags: ["Startup Ecosystem", "Global", "Innovation", "Talent"],
      fileSize: "25.1 MB",
      format: "PDF",
      language: "English",
      summary: "Analysis of 50+ startup ecosystems worldwide, ranking cities by funding, talent, and innovation metrics.",
      keyFindings: [
        "Silicon Valley leads in total funding",
        "London tops European startup rankings",
        "Asian ecosystems growing fastest",
        "Remote work changing talent distribution"
      ]
    },
    {
      id: 4,
      title: "Fintech Industry Analysis",
      description: "Detailed analysis of the fintech industry, including market size, key players, and emerging trends.",
      category: "industry",
      type: "Industry Report",
      author: "Financial Research Group",
      publishDate: "2024-01-01",
      pages: 34,
      downloads: 743,
      rating: 4.6,
      views: 1456,
      likes: 67,
      status: "Published",
      isBookmarked: true,
      isPremium: true,
      tags: ["Fintech", "Banking", "Digital Payments", "Financial Services"],
      fileSize: "8.9 MB",
      format: "PDF",
      language: "English",
      summary: "Comprehensive analysis of the $300B fintech market with insights into digital banking, payments, and lending.",
      keyFindings: [
        "Digital banking adoption reached 70%",
        "Mobile payments grew 35% globally",
        "Cryptocurrency integration increasing",
        "Regulatory sandboxes expanding"
      ]
    },
    {
      id: 5,
      title: "Climate Tech Investment Trends",
      description: "Analysis of climate technology investments, focusing on renewable energy, carbon capture, and sustainability solutions.",
      category: "research",
      type: "Research Paper",
      author: "Climate Research Institute",
      publishDate: "2023-12-28",
      pages: 56,
      downloads: 456,
      rating: 4.8,
      views: 1234,
      likes: 78,
      status: "Published",
      isBookmarked: false,
      isPremium: false,
      tags: ["Climate Tech", "Sustainability", "Renewable Energy", "Investment"],
      fileSize: "15.2 MB",
      format: "PDF",
      language: "English",
      summary: "Analysis of $50B in climate tech investments with focus on renewable energy, carbon capture, and green infrastructure.",
      keyFindings: [
        "Climate tech funding increased 80%",
        "Solar and wind lead investments",
        "Carbon capture technologies emerging",
        "ESG investing driving growth"
      ]
    },
    {
      id: 6,
      title: "Remote Work Impact Study",
      description: "Comprehensive study on the impact of remote work on productivity, company culture, and business operations.",
      category: "trends",
      type: "Trend Analysis",
      author: "Workplace Research Center",
      publishDate: "2023-12-20",
      pages: 42,
      downloads: 678,
      rating: 4.5,
      views: 1678,
      likes: 94,
      status: "Published",
      isBookmarked: false,
      isPremium: false,
      tags: ["Remote Work", "Productivity", "Workplace", "Culture"],
      fileSize: "11.4 MB",
      format: "PDF",
      language: "English",
      summary: "Study of 10,000+ companies showing the impact of remote work on productivity, employee satisfaction, and business outcomes.",
      keyFindings: [
        "Productivity increased 15% on average",
        "Employee satisfaction improved 25%",
        "Office space costs reduced 40%",
        "Hiring pool expanded globally"
      ]
    }
  ]

  const templates = [
    {
      id: 1,
      title: "Financial Report Template",
      description: "Professional template for creating comprehensive financial reports with charts and analysis.",
      category: "Financial",
      downloads: 234,
      rating: 4.7,
      format: "Excel",
      fileSize: "2.1 MB"
    },
    {
      id: 2,
      title: "Market Analysis Template",
      description: "Template for conducting market research and competitive analysis with data visualization.",
      category: "Market Research",
      downloads: 189,
      rating: 4.6,
      format: "PowerPoint",
      fileSize: "5.3 MB"
    },
    {
      id: 3,
      title: "Startup Pitch Deck Template",
      description: "Modern pitch deck template for startups with customizable slides and professional design.",
      category: "Presentation",
      downloads: 456,
      rating: 4.8,
      format: "PowerPoint",
      fileSize: "8.7 MB"
    }
  ]

  const analytics = {
    totalReports: 156,
    totalDownloads: 12450,
    totalViews: 45678,
    averageRating: 4.7,
    topCategory: "Financial Reports",
    monthlyGrowth: 12.5,
    userEngagement: 78.3
  }

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || report.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleDownloadReport = (reportId: number) => {
    toast({
      title: "Report Downloaded",
      description: "Report download started successfully.",
    })
  }

  const handleBookmarkReport = (reportId: number) => {
    toast({
      title: "Report Bookmarked",
      description: "Report added to your bookmarks.",
    })
  }

  const handleViewReport = (reportId: number) => {
    toast({
      title: "Opening Report",
      description: "Loading report preview...",
    })
  }

  const handleShareReport = (reportId: number) => {
    toast({
      title: "Report Shared",
      description: "Report link copied to clipboard.",
    })
  }

  const handleLikeReport = (reportId: number) => {
    toast({
      title: "Report Liked",
      description: "Thank you for your feedback!",
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
      case "industry":
        return <Building2 className="h-5 w-5 text-orange-500" />
      case "research":
        return <BookOpen className="h-5 w-5 text-red-500" />
      case "trends":
        return <TrendingUp className="h-5 w-5 text-yellow-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published":
        return "bg-green-100 text-green-800"
      case "Draft":
        return "bg-yellow-100 text-yellow-800"
      case "Review":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
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
                <Link href="/resources">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  {isMobile ? "" : "Back to Resources"}
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Research Reports</h1>
                <p className="text-sm text-gray-600 hidden md:block">Comprehensive reports and analysis</p>
              </div>
            </div>
            
            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowCreateReport(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Report
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowTemplates(true)}>
                <FileText className="h-4 w-4 mr-2" />
                Templates
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowAnalytics(true)}>
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </Button>
              <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowCreateReport(true)}>
                <Plus className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowMobileMenu(true)}>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
              <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                <Upload className="h-4 w-4" />
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
                  <p className="text-sm text-gray-600">Total Reports</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.totalReports}</p>
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
                  <p className="text-2xl font-bold text-gray-900">{analytics.totalDownloads.toLocaleString()}</p>
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
                  <p className="text-sm text-gray-600">Total Views</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.totalViews.toLocaleString()}</p>
                </div>
                <div className="p-2 bg-green-100 rounded-lg">
                  <Eye className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Rating</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.averageRating}</p>
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
              placeholder="Search reports by title, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {reportCategories.map((category) => (
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

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Featured Reports */}
              <Card>
                <CardHeader>
                  <CardTitle>Featured Reports</CardTitle>
                  <CardDescription>Most popular and trending reports</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {reports.slice(0, 3).map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getCategoryIcon(report.category)}
                        <div className="flex-1">
                          <h4 className="font-semibold">{report.title}</h4>
                          <p className="text-sm text-gray-600">{report.description}</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                            <span>{report.type}</span>
                            <span>{report.pages} pages</span>
                            <span>{report.downloads} downloads</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                        <Button variant="ghost" size="sm" onClick={() => handleViewReport(report.id)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest reports and updates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <FileText className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">New report published</p>
                        <p className="text-xs text-gray-500">Q4 2024 Startup Funding Report</p>
                      </div>
                      <span className="text-xs text-gray-500">2 hours ago</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Download className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Report downloaded</p>
                        <p className="text-xs text-gray-500">AI Market Trends 2024</p>
                      </div>
                      <span className="text-xs text-gray-500">4 hours ago</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Star className="h-4 w-4 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Report rated</p>
                        <p className="text-xs text-gray-500">Startup Ecosystem Report 2024</p>
                      </div>
                      <span className="text-xs text-gray-500">1 day ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReports.map((report) => (
                <Card key={report.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {getCategoryIcon(report.category)}
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg group-hover:text-[#0F7377] transition-colors">
                            {report.title}
                          </h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {report.type}
                            </Badge>
                            <Badge className={getStatusColor(report.status)}>
                              {report.status}
                            </Badge>
                            {report.isPremium && (
                              <Badge className="text-xs bg-[#F59E0B] hover:bg-[#F59E0B]/90">
                                Premium
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleBookmarkReport(report.id)}>
                          {report.isBookmarked ? (
                            <BookmarkCheck className="h-4 w-4" />
                          ) : (
                            <Bookmark className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 text-sm mb-4 line-clamp-3">{report.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Author</span>
                        <span>{report.author}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Pages</span>
                        <span>{report.pages}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Downloads</span>
                        <span>{report.downloads.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Rating</span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span>{report.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>File Size</span>
                        <span>{report.fileSize}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Format</span>
                        <span>{report.format}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {report.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="space-y-2">
                      <Button 
                        size="sm" 
                        className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90"
                        onClick={() => handleDownloadReport(report.id)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewReport(report.id)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Preview
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleShareReport(report.id)}
                        >
                          <Share2 className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleLikeReport(report.id)}
                        >
                          <Heart className="h-4 w-4 mr-1" />
                          {report.likes}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                        >
                          <MessageCircleIcon className="h-4 w-4 mr-1" />
                          Discuss
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <Card key={template.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg group-hover:text-[#0F7377] transition-colors">
                          {template.title}
                        </h3>
                        <p className="text-gray-700 text-sm mb-3">{template.description}</p>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {template.category}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {template.format}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
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
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>File Size</span>
                        <span>{template.fileSize}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Button 
                        size="sm" 
                        className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Preview
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
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
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Report Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Downloads</span>
                      <span className="font-semibold">{analytics.totalDownloads.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Views</span>
                      <span className="font-semibold">{analytics.totalViews.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Average Rating</span>
                      <span className="font-semibold">{analytics.averageRating}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Monthly Growth</span>
                      <span className="font-semibold text-green-600">+{analytics.monthlyGrowth}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Financial Reports</span>
                      <span className="font-semibold">45</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Market Analysis</span>
                      <span className="font-semibold">32</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Startup Reports</span>
                      <span className="font-semibold">28</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Industry Insights</span>
                      <span className="font-semibold">25</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Engagement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Engagement Rate</span>
                      <span className="font-semibold">{analytics.userEngagement}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Return Visitors</span>
                      <span className="font-semibold">65%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Time on Page</span>
                      <span className="font-semibold">4.2 min</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Bounce Rate</span>
                      <span className="font-semibold">22%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

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
                <Button variant="outline" className="w-full justify-start" onClick={() => setShowCreateReport(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Report
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => setShowTemplates(true)}>
                  <FileText className="h-4 w-4 mr-2" />
                  Templates
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => setShowAnalytics(true)}>
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analytics
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Report
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
