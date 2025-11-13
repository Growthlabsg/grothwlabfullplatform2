"use client"

import { useState, useMemo } from "react"
import { 
  BookOpen, 
  FileText, 
  Video, 
  Calculator, 
  Wrench, 
  CheckSquare,
  Star,
  TrendingUp,
  Clock,
  User,
  Download,
  ExternalLink,
  Bookmark,
  Search,
  Filter,
  ArrowRight,
  Rocket,
  DollarSign,
  Target,
  Users,
  Building2,
  Lightbulb,
  Zap,
  Award,
  Globe,
  BarChart3,
  Shield,
  Calendar,
  Play,
  Mic,
  Headphones,
  Monitor,
  Smartphone,
  Laptop,
  Tablet,
  Eye,
  ThumbsUp,
  MessageSquare,
  Share2,
  BookmarkPlus,
  ChevronDown,
  ChevronUp,
  SortAsc,
  SortDesc,
  Grid3X3,
  List,
  Tag,
  Calendar as CalendarIcon,
  User2,
  Building,
  Code,
  Database,
  Cloud,
  Lock,
  Unlock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  HelpCircle,
  Settings,
  MoreHorizontal
} from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [sortBy, setSortBy] = useState("recent")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)

  // Y Combinator style library resources
  const libraryResources = [
    // Startup Fundamentals
    {
      id: "sf-1",
      title: "How to Start a Startup",
      author: "Sam Altman",
      type: "video",
      category: "fundamentals",
      difficulty: "beginner",
      duration: "45 min",
      views: 125000,
      likes: 8900,
      publishedAt: "2024-01-15",
      description: "The complete guide to starting a startup from idea to IPO, covering everything from product development to fundraising.",
      tags: ["startup", "fundamentals", "entrepreneurship", "yc"],
      featured: true,
      url: "https://youtube.com/watch?v=example1"
    },
    {
      id: "sf-2", 
      title: "The Startup Playbook",
      author: "Paul Graham",
      type: "article",
      category: "fundamentals",
      difficulty: "intermediate",
      duration: "12 min read",
      views: 89000,
      likes: 7200,
      publishedAt: "2024-01-10",
      description: "Essential strategies and tactics for building a successful startup, based on years of experience at Y Combinator.",
      tags: ["startup", "strategy", "yc", "paul-graham"],
      featured: true,
      url: "https://paulgraham.com/startup-playbook"
    },
    {
      id: "sf-3",
      title: "Product-Market Fit: The Complete Guide",
      author: "Marc Andreessen",
      type: "article", 
      category: "fundamentals",
      difficulty: "intermediate",
      duration: "18 min read",
      views: 67000,
      likes: 5400,
      publishedAt: "2024-01-08",
      description: "Understanding and achieving product-market fit is crucial for startup success. Learn the frameworks and metrics.",
      tags: ["product-market-fit", "strategy", "metrics", "fundamentals"],
      featured: false,
      url: "https://a16z.com/product-market-fit"
    },

    // Fundraising
    {
      id: "fr-1",
      title: "How to Raise Money",
      author: "Jessica Livingston",
      type: "video",
      category: "fundraising",
      difficulty: "intermediate",
      duration: "38 min",
      views: 98000,
      likes: 8100,
      publishedAt: "2024-01-12",
      description: "Complete guide to fundraising for startups, from seed to Series A and beyond. Includes pitch deck templates.",
      tags: ["fundraising", "investors", "pitch", "yc"],
      featured: true,
      url: "https://youtube.com/watch?v=example2"
    },
    {
      id: "fr-2",
      title: "Valuation Methods for Startups",
      author: "Fred Wilson",
      type: "article",
      category: "fundraising", 
      difficulty: "advanced",
      duration: "15 min read",
      views: 45000,
      likes: 3200,
      publishedAt: "2024-01-05",
      description: "Understanding startup valuation methods and how to negotiate fair terms with investors.",
      tags: ["valuation", "fundraising", "negotiation", "investors"],
      featured: false,
      url: "https://avc.com/valuation-methods"
    },
    {
      id: "fr-3",
      title: "Pitch Deck Template & Examples",
      author: "Y Combinator",
      type: "template",
      category: "fundraising",
      difficulty: "beginner",
      duration: "5 min read",
      views: 156000,
      likes: 12000,
      publishedAt: "2024-01-20",
      description: "Proven pitch deck templates and real examples from successful YC companies.",
      tags: ["pitch-deck", "template", "fundraising", "yc"],
      featured: true,
      url: "https://ycombinator.com/pitch-deck"
    },

    // Product Development
    {
      id: "pd-1",
      title: "Building Products Users Love",
      author: "Julie Zhuo",
      type: "video",
      category: "product",
      difficulty: "intermediate",
      duration: "42 min",
      views: 78000,
      likes: 6500,
      publishedAt: "2024-01-18",
      description: "Product design principles and user research methods for creating products that users can't live without.",
      tags: ["product-design", "user-research", "ux", "product"],
      featured: false,
      url: "https://youtube.com/watch?v=example3"
    },
    {
      id: "pd-2",
      title: "The Lean Startup Methodology",
      author: "Eric Ries",
      type: "article",
      category: "product",
      difficulty: "intermediate", 
      duration: "20 min read",
      views: 112000,
      likes: 8900,
      publishedAt: "2024-01-14",
      description: "Build, measure, learn cycle and validated learning for faster product development.",
      tags: ["lean-startup", "mvp", "product", "methodology"],
      featured: true,
      url: "https://leanstartup.com/methodology"
    },
    {
      id: "pd-3",
      title: "User Research Toolkit",
      author: "Nielsen Norman Group",
      type: "toolkit",
      category: "product",
      difficulty: "beginner",
      duration: "8 min read",
      views: 34000,
      likes: 2800,
      publishedAt: "2024-01-11",
      description: "Comprehensive toolkit for conducting user research and usability testing.",
      tags: ["user-research", "toolkit", "usability", "product"],
      featured: false,
      url: "https://nngroup.com/user-research-toolkit"
    },

    // Growth & Marketing
    {
      id: "gm-1",
      title: "Growth Hacking Strategies",
      author: "Sean Ellis",
      type: "video",
      category: "growth",
      difficulty: "intermediate",
      duration: "35 min",
      views: 92000,
      likes: 7800,
      publishedAt: "2024-01-16",
      description: "Proven growth hacking techniques and viral marketing strategies for startups.",
      tags: ["growth-hacking", "marketing", "viral", "growth"],
      featured: true,
      url: "https://youtube.com/watch?v=example4"
    },
    {
      id: "gm-2",
      title: "Content Marketing for Startups",
      author: "Rand Fishkin",
      type: "article",
      category: "growth",
      difficulty: "intermediate",
      duration: "14 min read", 
      views: 56000,
      likes: 4200,
      publishedAt: "2024-01-09",
      description: "Building a content marketing strategy that drives organic growth and customer acquisition.",
      tags: ["content-marketing", "seo", "growth", "marketing"],
      featured: false,
      url: "https://moz.com/content-marketing-startups"
    },
    {
      id: "gm-3",
      title: "Social Media Growth Playbook",
      author: "Buffer",
      type: "playbook",
      category: "growth",
      difficulty: "beginner",
      duration: "10 min read",
      views: 67000,
      likes: 5100,
      publishedAt: "2024-01-13",
      description: "Complete playbook for growing your startup's social media presence and engagement.",
      tags: ["social-media", "growth", "playbook", "marketing"],
      featured: false,
      url: "https://buffer.com/social-media-playbook"
    },

    // Operations & Scaling
    {
      id: "os-1",
      title: "Scaling Your Startup",
      author: "Reid Hoffman",
      type: "video",
      category: "operations",
      difficulty: "advanced",
      duration: "50 min",
      views: 68000,
      likes: 5600,
      publishedAt: "2024-01-17",
      description: "Strategies for scaling your startup from 10 to 1000 employees while maintaining culture and quality.",
      tags: ["scaling", "operations", "culture", "leadership"],
      featured: true,
      url: "https://youtube.com/watch?v=example5"
    },
    {
      id: "os-2",
      title: "Hiring for Startups",
      author: "Laszlo Bock",
      type: "article",
      category: "operations",
      difficulty: "intermediate",
      duration: "16 min read",
      views: 43000,
      likes: 3400,
      publishedAt: "2024-01-07",
      description: "Best practices for hiring top talent in competitive markets and building diverse teams.",
      tags: ["hiring", "talent", "operations", "culture"],
      featured: false,
      url: "https://workrules.net/hiring-startups"
    },
    {
      id: "os-3",
      title: "Financial Planning for Startups",
      author: "YC Finance Team",
      type: "guide",
      category: "operations",
      difficulty: "intermediate",
      duration: "12 min read",
      views: 29000,
      likes: 2200,
      publishedAt: "2024-01-06",
      description: "Essential financial planning and budgeting strategies for early-stage startups.",
      tags: ["finance", "budgeting", "planning", "operations"],
      featured: false,
      url: "https://ycombinator.com/financial-planning"
    },

    // Technology & Engineering
    {
      id: "te-1",
      title: "Tech Stack Selection Guide",
      author: "Stripe Engineering",
      type: "guide",
      category: "technology",
      difficulty: "intermediate",
      duration: "22 min read",
      views: 71000,
      likes: 5800,
      publishedAt: "2024-01-19",
      description: "How to choose the right technology stack for your startup's needs and scale.",
      tags: ["tech-stack", "engineering", "architecture", "technology"],
      featured: true,
      url: "https://stripe.com/tech-stack-guide"
    },
    {
      id: "te-2",
      title: "Building Secure Applications",
      author: "OWASP",
      type: "article",
      category: "technology",
      difficulty: "advanced",
      duration: "18 min read",
      views: 38000,
      likes: 2900,
      publishedAt: "2024-01-04",
      description: "Security best practices and common vulnerabilities in web applications.",
      tags: ["security", "web-apps", "engineering", "technology"],
      featured: false,
      url: "https://owasp.org/secure-apps"
    },
    {
      id: "te-3",
      title: "DevOps for Startups",
      author: "Docker",
      type: "tutorial",
      category: "technology",
      difficulty: "intermediate",
      duration: "25 min read",
      views: 52000,
      likes: 4100,
      publishedAt: "2024-01-03",
      description: "Setting up CI/CD pipelines and deployment strategies for startup environments.",
      tags: ["devops", "deployment", "ci-cd", "technology"],
      featured: false,
      url: "https://docker.com/devops-startups"
    }
  ]

  const categories = [
    { id: "all", label: "All Resources", count: libraryResources.length },
    { id: "fundamentals", label: "Startup Fundamentals", count: libraryResources.filter(r => r.category === "fundamentals").length },
    { id: "fundraising", label: "Fundraising", count: libraryResources.filter(r => r.category === "fundraising").length },
    { id: "product", label: "Product Development", count: libraryResources.filter(r => r.category === "product").length },
    { id: "growth", label: "Growth & Marketing", count: libraryResources.filter(r => r.category === "growth").length },
    { id: "operations", label: "Operations & Scaling", count: libraryResources.filter(r => r.category === "operations").length },
    { id: "technology", label: "Technology & Engineering", count: libraryResources.filter(r => r.category === "technology").length }
  ]

  const types = [
    { id: "all", label: "All Types" },
    { id: "article", label: "Articles" },
    { id: "video", label: "Videos" },
    { id: "template", label: "Templates" },
    { id: "toolkit", label: "Toolkits" },
    { id: "playbook", label: "Playbooks" },
    { id: "guide", label: "Guides" },
    { id: "tutorial", label: "Tutorials" }
  ]

  const difficulties = [
    { id: "all", label: "All Levels" },
    { id: "beginner", label: "Beginner" },
    { id: "intermediate", label: "Intermediate" },
    { id: "advanced", label: "Advanced" }
  ]

  const sortOptions = [
    { id: "recent", label: "Most Recent" },
    { id: "popular", label: "Most Popular" },
    { id: "trending", label: "Trending" },
    { id: "alphabetical", label: "A-Z" }
  ]

  const filteredResources = useMemo(() => {
    let filtered = libraryResources

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(resource => resource.category === selectedCategory)
    }

    // Type filter
    if (selectedType !== "all") {
      filtered = filtered.filter(resource => resource.type === selectedType)
    }

    // Difficulty filter
    if (selectedDifficulty !== "all") {
      filtered = filtered.filter(resource => resource.difficulty === selectedDifficulty)
    }

    // Sort
    switch (sortBy) {
      case "recent":
        filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        break
      case "popular":
        filtered.sort((a, b) => b.views - a.views)
        break
      case "trending":
        filtered.sort((a, b) => b.likes - a.likes)
        break
      case "alphabetical":
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
    }

    return filtered
  }, [searchQuery, selectedCategory, selectedType, selectedDifficulty, sortBy])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video": return <Play className="h-4 w-4" />
      case "article": return <FileText className="h-4 w-4" />
      case "template": return <Wrench className="h-4 w-4" />
      case "toolkit": return <Wrench className="h-4 w-4" />
      case "playbook": return <BookOpen className="h-4 w-4" />
      case "guide": return <BookOpen className="h-4 w-4" />
      case "tutorial": return <Code className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "bg-green-100 text-green-800"
      case "intermediate": return "bg-yellow-100 text-yellow-800"
      case "advanced": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M"
    if (num >= 1000) return (num / 1000).toFixed(1) + "K"
    return num.toString()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Startup Library
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Curated resources from successful entrepreneurs, investors, and industry experts. 
              Learn from the best to build your startup.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Filters</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </div>

              <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Search */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Search
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search resources..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">
                    Categories
                  </label>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center justify-between">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <Checkbox
                            checked={selectedCategory === category.id}
                            onCheckedChange={() => setSelectedCategory(category.id)}
                          />
                          <span className="text-sm text-gray-700">{category.label}</span>
                        </label>
                        <Badge variant="secondary" className="text-xs">
                          {category.count}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Type */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">
                    Type
                  </label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {types.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Difficulty */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">
                    Difficulty
                  </label>
                  <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {difficulties.map((difficulty) => (
                        <SelectItem key={difficulty.id} value={difficulty.id}>
                          {difficulty.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Sort */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">
                    Sort by
                  </label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sortOptions.map((option) => (
                        <SelectItem key={option.id} value={option.id}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  {filteredResources.length} Resources
                </h2>
                <p className="text-gray-600 mt-1">
                  {selectedCategory !== "all" && `in ${categories.find(c => c.id === selectedCategory)?.label}`}
                  {searchQuery && ` matching "${searchQuery}"`}
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
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

            {/* Resources Grid/List */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((resource) => (
                  <Card key={resource.id} className="group hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(resource.type)}
                          <Badge variant="outline" className="text-xs">
                            {resource.type}
                          </Badge>
                        </div>
                        {resource.featured && (
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        )}
                      </div>
                      <CardTitle className="text-lg leading-tight group-hover:text-[#0F7377] transition-colors">
                        {resource.title}
                      </CardTitle>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <User className="h-3 w-3" />
                        <span>{resource.author}</span>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                        {resource.description}
                      </p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Eye className="h-3 w-3" />
                            <span>{formatNumber(resource.views)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <ThumbsUp className="h-3 w-3" />
                            <span>{formatNumber(resource.likes)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{resource.duration}</span>
                          </div>
                        </div>
                        <Badge className={getDifficultyColor(resource.difficulty)}>
                          {resource.difficulty}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {resource.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {resource.tags.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{resource.tags.length - 3}
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <Button asChild size="sm" className="flex-1 mr-2">
                          <a href={resource.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Read
                          </a>
                        </Button>
                        <Button variant="outline" size="sm">
                          <BookmarkPlus className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredResources.map((resource) => (
                  <Card key={resource.id} className="group hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            {getTypeIcon(resource.type)}
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#0F7377] transition-colors">
                                  {resource.title}
                                </h3>
                                {resource.featured && (
                                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                )}
                              </div>
                              
                              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                                <div className="flex items-center space-x-1">
                                  <User className="h-3 w-3" />
                                  <span>{resource.author}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{resource.duration}</span>
                                </div>
                                <Badge className={getDifficultyColor(resource.difficulty)}>
                                  {resource.difficulty}
                                </Badge>
                              </div>
                              
                              <p className="text-gray-600 mb-3 line-clamp-2">
                                {resource.description}
                              </p>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4 text-xs text-gray-500">
                                  <div className="flex items-center space-x-1">
                                    <Eye className="h-3 w-3" />
                                    <span>{formatNumber(resource.views)} views</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <ThumbsUp className="h-3 w-3" />
                                    <span>{formatNumber(resource.likes)} likes</span>
                                  </div>
                                </div>
                                
                                <div className="flex items-center space-x-2">
                                  <Button asChild size="sm">
                                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                      <ExternalLink className="h-3 w-3 mr-1" />
                                      Read
                                    </a>
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <BookmarkPlus className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* No Results */}
            {filteredResources.length === 0 && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <Button onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("all")
                  setSelectedType("all")
                  setSelectedDifficulty("all")
                }}>
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}