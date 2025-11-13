"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  Search, 
  Filter, 
  Calendar, 
  User, 
  Clock, 
  Eye, 
  Heart, 
  Share2, 
  Bookmark,
  ArrowRight,
  TrendingUp,
  Award,
  Users,
  Globe,
  Zap,
  Target,
  Lightbulb,
  Rocket,
  Building2,
  DollarSign,
  Shield,
  FileText,
  MessageSquare,
  Mail,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  ShoppingCart,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  X,
  Download,
  ExternalLink,
  Star,
  ThumbsUp,
  MessageCircle,
  BookOpen,
  BarChart3,
  PieChart,
  Activity,
  Briefcase,
  GraduationCap,
  Code,
  Database,
  Cloud,
  Smartphone,
  Monitor,
  Headphones,
  Settings,
  CheckCircle,
  Info,
  AlertTriangle,
  RefreshCw,
  Play,
  Pause,
  Volume2,
  VolumeX
} from "lucide-react"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: {
    name: string
    role: string
    company: string
    avatar: string
    linkedin?: string
    bio?: string
    expertise?: string[]
  }
  category: string
  tags: string[]
  publishDate: string
  readTime: number
  views: number
  likes: number
  comments: number
  featured: boolean
  image: string
  slug: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  type: "Article" | "Case Study" | "Tutorial" | "Interview" | "News"
  language: string
  relatedPosts?: string[]
}

interface Category {
  name: string
  count: number
  color: string
  icon: any
}

const categories: Category[] = [
  { name: "Fundraising", count: 24, color: "blue", icon: DollarSign },
  { name: "Product Development", count: 18, color: "green", icon: Target },
  { name: "Growth Marketing", count: 15, color: "purple", icon: TrendingUp },
  { name: "Team Building", count: 12, color: "orange", icon: Users },
  { name: "Fintech", count: 10, color: "yellow", icon: Building2 },
  { name: "Healthtech", count: 9, color: "red", icon: Shield },
  { name: "Legal & Compliance", count: 8, color: "teal", icon: FileText },
  { name: "Sustainability", count: 7, color: "emerald", icon: Globe },
  { name: "AI & ML", count: 6, color: "indigo", icon: Zap },
  { name: "E-commerce", count: 5, color: "pink", icon: ShoppingCart }
]

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "How We Raised $5M in a Challenging Market: A Founder's Journey",
    excerpt: "GrowthLab alumni TechSprint shares their journey of securing Series A funding during an economic downturn, including the strategies that worked and lessons learned.",
    content: "Full article content would go here...",
    author: {
      name: "Jason Lim",
      role: "Founder & CEO",
      company: "TechSprint",
      avatar: "/placeholder.svg?height=40&width=40&query=professional asian man headshot",
      linkedin: "https://linkedin.com/in/jason-lim",
      bio: "Serial entrepreneur with 10+ years in fintech. Previously founded two successful startups and led product development at major banks.",
      expertise: ["Fundraising", "Fintech", "Product Strategy", "Leadership"]
    },
    category: "Fundraising",
    tags: ["Series A", "Economic Downturn", "Investor Relations", "Pitch Deck"],
    publishDate: "2025-05-02",
    readTime: 8,
    views: 1247,
    likes: 89,
    comments: 23,
    featured: true,
    image: "/placeholder.svg?height=400&width=600&query=startup team celebrating success",
    slug: "how-we-raised-5m-in-challenging-market",
    difficulty: "Intermediate",
    type: "Case Study",
    language: "English",
    relatedPosts: ["2", "3", "4"]
  },
  {
    id: "2",
    title: "From MVP to Product-Market Fit: A Roadmap for Startups",
    excerpt: "Learn the methodical approach that helped HealthTech startup MediConnect achieve product-market fit in just 6 months.",
    content: "Full article content would go here...",
    author: {
      name: "Dr. Anita Patel",
      role: "Chief Product Officer",
      company: "MediConnect",
      avatar: "/placeholder.svg?height=40&width=40&query=professional indian woman headshot",
      linkedin: "https://linkedin.com/in/anita-patel"
    },
    category: "Product Development",
    tags: ["MVP", "Product-Market Fit", "User Research", "Iteration"],
    publishDate: "2025-04-18",
    readTime: 12,
    views: 2156,
    likes: 156,
    featured: true,
    image: "/placeholder.svg?height=400&width=600&query=product development team at whiteboard",
    slug: "mvp-to-product-market-fit-roadmap"
  },
  {
    id: "3",
    title: "Building a World-Class Team on a Startup Budget",
    excerpt: "GrowthLab mentor Sarah Tan shares strategies for attracting and retaining top talent when competing with tech giants.",
    content: "Full article content would go here...",
    author: {
      name: "Sarah Tan",
      role: "Founder & CEO",
      company: "GrowthLab",
      avatar: "/placeholder.svg?height=40&width=40&query=professional asian woman headshot",
      linkedin: "https://linkedin.com/in/sarah-tan"
    },
    category: "Team Building",
    tags: ["Hiring", "Company Culture", "Employee Retention", "Startup Culture"],
    publishDate: "2025-04-05",
    readTime: 10,
    views: 1893,
    likes: 134,
    featured: true,
    image: "/placeholder.svg?height=400&width=600&query=diverse team in startup office",
    slug: "building-world-class-team-startup-budget"
  },
  {
    id: "4",
    title: "The Rise of Embedded Finance in Southeast Asia",
    excerpt: "Explore how non-financial companies are integrating financial services into their offerings and what this means for traditional banks and fintech startups.",
    content: "Full article content would go here...",
    author: {
      name: "Michael Wong",
      role: "Former CTO",
      company: "DBS Bank",
      avatar: "/placeholder.svg?height=40&width=40&query=professional chinese man headshot",
      linkedin: "https://linkedin.com/in/michael-wong"
    },
    category: "Fintech",
    tags: ["Embedded Finance", "Banking", "Southeast Asia", "Digital Transformation"],
    publishDate: "2025-03-28",
    readTime: 15,
    views: 3421,
    likes: 234,
    featured: false,
    image: "/placeholder.svg?height=400&width=600&query=fintech mobile app interface",
    slug: "rise-of-embedded-finance-southeast-asia"
  },
  {
    id: "5",
    title: "Building a Remote-First Startup Culture",
    excerpt: "LogiTech founder shares how they built a cohesive company culture with team members across 7 countries.",
    content: "Full article content would go here...",
    author: {
      name: "Tan Wei Ming",
      role: "Founder & CEO",
      company: "LogiTech",
      avatar: "/placeholder.svg?height=40&width=40&query=professional malay man headshot",
      linkedin: "https://linkedin.com/in/tan-wei-ming"
    },
    category: "Team Building",
    tags: ["Remote Work", "Company Culture", "Distributed Teams", "Communication"],
    publishDate: "2025-03-21",
    readTime: 11,
    views: 2765,
    likes: 189,
    featured: false,
    image: "/placeholder.svg?height=400&width=600&query=remote team video conference",
    slug: "building-remote-first-startup-culture"
  },
  {
    id: "6",
    title: "Growth Marketing Strategies That Actually Work in Southeast Asia",
    excerpt: "A data-driven look at which customer acquisition channels are most effective for B2C startups in different Southeast Asian markets.",
    content: "Full article content would go here...",
    author: {
      name: "Lisa Wong",
      role: "Growth Lead",
      company: "GrowthLab",
      avatar: "/placeholder.svg?height=40&width=40&query=professional chinese woman headshot",
      linkedin: "https://linkedin.com/in/lisa-wong"
    },
    category: "Growth Marketing",
    tags: ["Growth Marketing", "Customer Acquisition", "Southeast Asia", "Data Analytics"],
    publishDate: "2025-03-15",
    readTime: 14,
    views: 3987,
    likes: 267,
    featured: false,
    image: "/placeholder.svg?height=400&width=600&query=digital marketing analytics dashboard",
    slug: "growth-marketing-strategies-southeast-asia"
  },
  {
    id: "7",
    title: "Legal Essentials for Startups: What You Need to Know",
    excerpt: "A comprehensive guide to the legal considerations for startups in Singapore, from incorporation to intellectual property protection.",
    content: "Full article content would go here...",
    author: {
      name: "Chong Li Fen",
      role: "Partner",
      company: "TechLegal LLP",
      avatar: "/placeholder.svg?height=40&width=40&query=professional chinese woman lawyer",
      linkedin: "https://linkedin.com/in/chong-li-fen"
    },
    category: "Legal & Compliance",
    tags: ["Legal", "Compliance", "Intellectual Property", "Singapore"],
    publishDate: "2025-03-08",
    readTime: 18,
    views: 1543,
    likes: 98,
    featured: false,
    image: "/placeholder.svg?height=400&width=600&query=legal documents and contracts",
    slug: "legal-essentials-startups-singapore"
  },
  {
    id: "8",
    title: "AI-Powered Customer Service: The Future of Startup Support",
    excerpt: "How early-stage startups can leverage AI to provide enterprise-level customer service without the enterprise budget.",
    content: "Full article content would go here...",
    author: {
      name: "Alex Chen",
      role: "AI Research Lead",
      company: "GrowthLab",
      avatar: "/placeholder.svg?height=40&width=40&query=professional chinese man ai researcher",
      linkedin: "https://linkedin.com/in/alex-chen"
    },
    category: "AI & ML",
    tags: ["Artificial Intelligence", "Customer Service", "Automation", "Startup Tools"],
    publishDate: "2025-03-01",
    readTime: 13,
    views: 2987,
    likes: 201,
    featured: false,
    image: "/placeholder.svg?height=400&width=600&query=ai chatbot interface",
    slug: "ai-powered-customer-service-startup-support"
  },
  {
    id: "9",
    title: "Sustainable Business Models: Profiting While Protecting the Planet",
    excerpt: "Case studies of Southeast Asian startups that have built profitable businesses around sustainability and environmental protection.",
    content: "Full article content would go here...",
    author: {
      name: "Nguyen Thi Minh",
      role: "Founder & CEO",
      company: "EcoViet",
      avatar: "/placeholder.svg?height=40&width=40&query=professional vietnamese woman headshot",
      linkedin: "https://linkedin.com/in/nguyen-thi-minh"
    },
    category: "Sustainability",
    tags: ["Sustainability", "Environmental Impact", "Circular Economy", "Green Business"],
    publishDate: "2025-02-22",
    readTime: 16,
    views: 1876,
    likes: 145,
    featured: false,
    image: "/placeholder.svg?height=400&width=600&query=sustainable business eco-friendly",
    slug: "sustainable-business-models-profiting-planet"
  },
  {
    id: "10",
    title: "E-commerce Trends in Southeast Asia: What's Next?",
    excerpt: "Analysis of emerging e-commerce trends and opportunities for startups in the rapidly growing Southeast Asian market.",
    content: "Full article content would go here...",
    author: {
      name: "Raj Mehta",
      role: "Managing Partner",
      company: "GrowthLab",
      avatar: "/placeholder.svg?height=40&width=40&query=professional indian man headshot",
      linkedin: "https://linkedin.com/in/raj-mehta"
    },
    category: "E-commerce",
    tags: ["E-commerce", "Southeast Asia", "Digital Commerce", "Market Trends"],
    publishDate: "2025-02-15",
    readTime: 12,
    views: 3245,
    likes: 223,
    featured: false,
    image: "/placeholder.svg?height=400&width=600&query=ecommerce mobile shopping",
    slug: "ecommerce-trends-southeast-asia-whats-next"
  }
]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<"latest" | "popular" | "trending">("latest")
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)
  const [showAllCategories, setShowAllCategories] = useState(false)
  const [expandedPost, setExpandedPost] = useState<string | null>(null)
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<string>>(new Set())
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set())
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [newsletterEmail, setNewsletterEmail] = useState("")
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false)

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesFeatured = !showFeaturedOnly || post.featured
    
    return matchesCategory && matchesSearch && matchesFeatured
  })

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case "latest":
        return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
      case "popular":
        return b.views - a.views
      case "trending":
        return b.likes - a.likes
      default:
        return 0
    }
  })

  const featuredPosts = blogPosts.filter(post => post.featured)
  const latestPosts = blogPosts.slice(0, 6)

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.name === category)
    return cat ? cat.color : "gray"
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const toggleBookmark = (postId: string) => {
    setBookmarkedPosts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }

  const toggleLike = (postId: string) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newsletterEmail) {
      setNewsletterSubmitted(true)
      setNewsletterEmail("")
      setTimeout(() => setNewsletterSubmitted(false), 3000)
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800"
      case "Intermediate": return "bg-yellow-100 text-yellow-800"
      case "Advanced": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Case Study": return "bg-blue-100 text-blue-800"
      case "Tutorial": return "bg-purple-100 text-purple-800"
      case "Interview": return "bg-orange-100 text-orange-800"
      case "News": return "bg-gray-100 text-gray-800"
      default: return "bg-green-100 text-green-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#0F7377] to-[#0F7377]/90 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 py-12 sm:py-16 md:py-20 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="bg-white/20 p-3 sm:p-4 rounded-full animate-pulse">
                <FileText className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              GrowthLab Blog
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-blue-100 mb-6 sm:mb-8 leading-relaxed max-w-4xl mx-auto">
              Insights, advice, and stories from the GrowthLab community. Learn from successful founders and
              industry experts about building and scaling startups in Southeast Asia.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-6 sm:mb-8">
              <div className="relative">
                <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  placeholder="Search articles, topics, or authors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm sm:text-base"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4">
                <div className="text-lg sm:text-xl font-bold">{blogPosts.length}</div>
                <div className="text-xs sm:text-sm text-blue-200">Articles</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4">
                <div className="text-lg sm:text-xl font-bold">50+</div>
                <div className="text-xs sm:text-sm text-blue-200">Authors</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4">
                <div className="text-lg sm:text-xl font-bold">15+</div>
                <div className="text-xs sm:text-sm text-blue-200">Categories</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4">
                <div className="text-lg sm:text-xl font-bold">100K+</div>
                <div className="text-xs sm:text-sm text-blue-200">Readers</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          {/* Mobile Filter Toggle */}
          <div className="flex items-center justify-between mb-3 sm:hidden">
            <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="flex items-center space-x-2 text-[#0F7377] hover:text-[#0F7377]/80"
            >
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">
                {showMobileFilters ? "Hide" : "Show"} Filters
              </span>
              {showMobileFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          <div className={`${showMobileFilters ? 'block' : 'hidden'} sm:block`}>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
              {/* Category Filter */}
              <div className="w-full lg:w-auto">
                <div className="flex items-center space-x-2 overflow-x-auto pb-2 lg:pb-0">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap text-sm ${
                      selectedCategory === "all"
                        ? "bg-[#0F7377] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    All Categories
                  </button>
                  {(showAllCategories ? categories : categories.slice(0, 6)).map((category) => (
                    <button
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap text-sm ${
                        selectedCategory === category.name
                          ? "bg-[#0F7377] text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {category.name} ({category.count})
                    </button>
                  ))}
                  {categories.length > 6 && (
                    <button
                      onClick={() => setShowAllCategories(!showAllCategories)}
                      className="px-3 sm:px-4 py-2 rounded-lg font-medium text-[#0F7377] hover:bg-[#0F7377]/10 transition-colors whitespace-nowrap text-sm flex items-center"
                    >
                      {showAllCategories ? (
                        <>
                          <Minus className="w-3 h-3 mr-1" />
                          Show Less
                        </>
                      ) : (
                        <>
                          <Plus className="w-3 h-3 mr-1" />
                          Show All
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Sort and Filter Controls */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full lg:w-auto">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured-only"
                    checked={showFeaturedOnly}
                    onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                    className="rounded border-gray-300 text-[#0F7377] focus:ring-[#0F7377]"
                  />
                  <label htmlFor="featured-only" className="text-sm text-gray-700">
                    Featured only
                  </label>
                </div>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "latest" | "popular" | "trending")}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F7377] w-full sm:w-auto"
                >
                  <option value="latest">Latest</option>
                  <option value="popular">Most Popular</option>
                  <option value="trending">Trending</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Featured Articles */}
        {featuredPosts.length > 0 && (
          <div className="mb-12 sm:mb-16">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center mb-3 sm:mb-0">
                <Award className="w-6 h-6 sm:w-8 sm:h-8 text-[#F59E0B] mr-2 sm:mr-3" />
                Featured Articles
              </h2>
              <Link href="#" className="text-[#0F7377] font-medium hover:underline flex items-center text-sm sm:text-base">
                View all featured
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {featuredPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
                  <div className="relative">
                    <div className="h-40 sm:h-48 bg-gradient-to-br from-gray-200 to-gray-300">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                      <span className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-${getCategoryColor(post.category)}-100 text-${getCategoryColor(post.category)}-800`}>
                        {post.category}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex space-x-1 sm:space-x-2">
                      <button 
                        onClick={() => toggleBookmark(post.id)}
                        className={`p-2 rounded-full transition-colors ${
                          bookmarkedPosts.has(post.id) 
                            ? "bg-[#0F7377] text-white" 
                            : "bg-white/90 hover:bg-white"
                        }`}
                      >
                        <Bookmark className={`w-3 h-3 sm:w-4 sm:h-4 ${
                          bookmarkedPosts.has(post.id) ? "text-white" : "text-gray-600"
                        }`} />
                      </button>
                      <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                        <Share2 className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                      </button>
                    </div>
                    <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(post.difficulty)}`}>
                        {post.difficulty}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      {formatDate(post.publishDate)}
                      <span className="mx-2">•</span>
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      {post.readTime} min read
                    </div>
                    
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-[#0F7377] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-700 mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3 text-sm sm:text-base">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3 sm:mb-4">
                      {post.tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-2 sm:mr-3"
                        />
                        <div>
                          <div className="font-medium text-gray-900 text-sm sm:text-base">{post.author.name}</div>
                          <div className="text-xs sm:text-sm text-gray-600">{post.author.role} at {post.author.company}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm text-gray-500">
                        <span className="flex items-center">
                          <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          {post.views.toLocaleString()}
                        </span>
                        <button 
                          onClick={() => toggleLike(post.id)}
                          className={`flex items-center ${
                            likedPosts.has(post.id) ? "text-red-500" : "text-gray-500 hover:text-red-500"
                          }`}
                        >
                          <Heart className={`w-3 h-3 sm:w-4 sm:h-4 mr-1 ${
                            likedPosts.has(post.id) ? "fill-current" : ""
                          }`} />
                          {post.likes}
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Latest Articles Grid */}
        <div className="mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center mb-2 sm:mb-0">
              <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-[#0F7377] mr-2 sm:mr-3" />
              Latest Articles
            </h2>
            <span className="text-sm sm:text-base text-gray-600">Showing {sortedPosts.length} of {blogPosts.length} articles</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {sortedPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-105 group">
                <div className="relative">
                  <div className="h-40 sm:h-48 bg-gradient-to-br from-gray-200 to-gray-300">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                    <span className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-${getCategoryColor(post.category)}-100 text-${getCategoryColor(post.category)}-800`}>
                      {post.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(post.type)}`}>
                      {post.type}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(post.difficulty)}`}>
                      {post.difficulty}
                    </span>
                  </div>
                </div>
                
                <div className="p-4 sm:p-6">
                  <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    {formatDate(post.publishDate)}
                    <span className="mx-2">•</span>
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    {post.readTime} min read
                  </div>
                  
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-[#0F7377] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-700 mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3 text-sm sm:text-base">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3 sm:mb-4">
                    {post.tags.slice(0, 2).map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full mr-2"
                      />
                      <div>
                        <div className="font-medium text-gray-900 text-xs sm:text-sm">{post.author.name}</div>
                        <div className="text-xs text-gray-600">{post.author.role}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm text-gray-500">
                      <span className="flex items-center">
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        {post.views.toLocaleString()}
                      </span>
                      <button 
                        onClick={() => toggleLike(post.id)}
                        className={`flex items-center ${
                          likedPosts.has(post.id) ? "text-red-500" : "text-gray-500 hover:text-red-500"
                        }`}
                      >
                        <Heart className={`w-3 h-3 sm:w-4 sm:h-4 mr-1 ${
                          likedPosts.has(post.id) ? "fill-current" : ""
                        }`} />
                        {post.likes}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {sortedPosts.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">No articles found</h3>
              <p className="text-sm sm:text-base text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

        {/* Categories and Newsletter Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 sticky top-24">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
                <Filter className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-[#0F7377]" />
                Categories
              </h3>
              
              <div className="space-y-2 sm:space-y-3">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`w-full flex items-center justify-between p-2 sm:p-3 rounded-lg transition-colors text-sm sm:text-base ${
                      selectedCategory === category.name
                        ? "bg-[#0F7377] text-white"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <div className="flex items-center">
                      <category.icon className={`w-3 h-3 sm:w-4 sm:h-4 mr-2 ${
                        selectedCategory === category.name ? "text-white" : "text-gray-500"
                      }`} />
                      <span className="truncate">{category.name}</span>
                    </div>
                    <span className={`text-xs sm:text-sm ml-2 ${
                      selectedCategory === category.name ? "text-white/80" : "text-gray-500"
                    }`}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter and Stats */}
          <div className="lg:col-span-3">
            {/* Newsletter */}
            <div className="bg-gradient-to-r from-[#0F7377] to-[#0F7377]/90 text-white rounded-xl p-6 sm:p-8 mb-6 sm:mb-8">
              <div className="text-center">
                <Mail className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-white/80" />
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Subscribe to Our Newsletter</h3>
                <p className="text-base sm:text-lg mb-4 sm:mb-6 text-blue-100 max-w-2xl mx-auto">
                  Get the latest insights, founder stories, and startup resources delivered straight to your inbox. 
                  We send one newsletter every two weeks.
                </p>
                
                {newsletterSubmitted ? (
                  <div className="flex items-center justify-center text-green-200">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span className="text-sm sm:text-base">Thank you for subscribing!</span>
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <input
                      type="email"
                      placeholder="Your email address"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 flex-grow focus:outline-none focus:ring-2 focus:ring-white/50 text-sm sm:text-base"
                      required
                    />
                    <button 
                      type="submit"
                      className="bg-white text-[#0F7377] px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm sm:text-base"
                    >
                      Subscribe
                    </button>
                  </form>
                )}
                
                <p className="text-xs sm:text-sm text-blue-200 mt-3">
                  Join 5,000+ founders and startup enthusiasts
                </p>
              </div>
            </div>

            {/* Blog Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="bg-white rounded-xl p-4 sm:p-6 text-center shadow-md">
                <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-[#0F7377] mx-auto mb-2 sm:mb-3" />
                <div className="text-xl sm:text-2xl font-bold text-gray-900">{blogPosts.length}</div>
                <div className="text-xs sm:text-sm text-gray-600">Total Articles</div>
              </div>
              
              <div className="bg-white rounded-xl p-4 sm:p-6 text-center shadow-md">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-[#0F7377] mx-auto mb-2 sm:mb-3" />
                <div className="text-xl sm:text-2xl font-bold text-gray-900">50+</div>
                <div className="text-xs sm:text-sm text-gray-600">Expert Authors</div>
              </div>
              
              <div className="bg-white rounded-xl p-4 sm:p-6 text-center shadow-md">
                <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-[#0F7377] mx-auto mb-2 sm:mb-3" />
                <div className="text-xl sm:text-2xl font-bold text-gray-900">15+</div>
                <div className="text-xs sm:text-sm text-gray-600">Countries Reached</div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Follow GrowthLab</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4">
                Stay connected with us on social media for real-time updates and insights.
              </p>
              
              <div className="flex space-x-3 sm:space-x-4">
                <a href="#" className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a href="#" className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors">
                  <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a href="#" className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-blue-800 text-white rounded-full hover:bg-blue-900 transition-colors">
                  <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a href="#" className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors">
                  <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
