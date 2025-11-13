"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { 
  BookOpen, 
  Users, 
  Clock, 
  Star, 
  Play, 
  CheckCircle, 
  Lock, 
  Award,
  TrendingUp,
  Lightbulb,
  Target,
  Zap,
  GraduationCap,
  FileText,
  Video,
  Download,
  Share2,
  MessageSquare,
  Calendar,
  MapPin,
  ArrowRight,
  ChevronRight,
  Rocket,
  DollarSign,
  Building2,
  Code,
  BarChart3,
  Globe,
  Shield,
  Heart,
  Eye,
  ThumbsUp,
  MessageCircle,
  Check,
  Search,
  Filter,
  Menu,
  X,
  Bell,
  Bookmark,
  BookmarkCheck,
  Settings,
  User,
  BarChart,
  Trophy,
  Award as Certificate,
  Download as DownloadIcon,
  ExternalLink,
  ChevronDown,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal
} from "lucide-react"
import Link from "next/link"
import { LayoutWithSidebar } from "@/components/layout/layout-with-sidebar"

export default function StartupSchoolPage() {
  const { toast } = useToast()
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("popular")
  const [showFilters, setShowFilters] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [savedCourses, setSavedCourses] = useState<string[]>([])
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [selectedPrice, setSelectedPrice] = useState("all")
  const [selectedDuration, setSelectedDuration] = useState("all")
  const [showNotifications, setShowNotifications] = useState(false)
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([])
  const [completedCourses, setCompletedCourses] = useState<string[]>([])
  const [showCreateCourse, setShowCreateCourse] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showCreateCourseDialog, setShowCreateCourseDialog] = useState(false)
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false)
  const [selectedInstructor, setSelectedInstructor] = useState("all")
  const [selectedLanguage, setSelectedLanguage] = useState("all")
  const [showCoursePreview, setShowCoursePreview] = useState(false)
  const [previewCourse, setPreviewCourse] = useState(null)
  const [showLearningPath, setShowLearningPath] = useState(false)
  const [showCertificates, setShowCertificates] = useState(false)
  const [showMyProgress, setShowMyProgress] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showInstructorDashboard, setShowInstructorDashboard] = useState(false)
  const [showCourseManagement, setShowCourseManagement] = useState(false)
  const [showCommunity, setShowCommunity] = useState(false)
  const [showLiveSessions, setShowLiveSessions] = useState(false)
  const [showResources, setShowResources] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [showQuickActions, setShowQuickActions] = useState(false)
  const [showFeaturedCourses, setShowFeaturedCourses] = useState(true)
  const [showTrendingCourses, setShowTrendingCourses] = useState(true)
  const [showNewCourses, setShowNewCourses] = useState(true)
  const [showRecommendedCourses, setShowRecommendedCourses] = useState(true)

  // Screen size detection
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Load saved courses and enrollment data
  useEffect(() => {
    const saved = localStorage.getItem('savedCourses')
    if (saved) {
      setSavedCourses(JSON.parse(saved))
    }
    
    const enrolled = localStorage.getItem('enrolledCourses')
    if (enrolled) {
      setEnrolledCourses(JSON.parse(enrolled))
    }
    
    const completed = localStorage.getItem('completedCourses')
    if (completed) {
      setCompletedCourses(JSON.parse(completed))
    }
  }, [])

  const stats = [
    { label: "Courses", value: "120+", icon: BookOpen },
    { label: "Instructors", value: "40+", icon: Users },
    { label: "Students", value: "5,000+", icon: GraduationCap },
    { label: "Avg. Rating", value: "4.8/5", icon: Star },
    { label: "Certificates", value: "2,500+", icon: Award },
    { label: "Success Rate", value: "94%", icon: TrendingUp },
  ]

  const categories = [
    { id: "all", name: "All Categories", icon: <BookOpen className="h-4 w-4" /> },
    { id: "funding", name: "Funding & Finance", icon: <DollarSign className="h-4 w-4" /> },
    { id: "marketing", name: "Marketing & Sales", icon: <TrendingUp className="h-4 w-4" /> },
    { id: "product", name: "Product Development", icon: <Code className="h-4 w-4" /> },
    { id: "legal", name: "Legal & Compliance", icon: <Shield className="h-4 w-4" /> },
    { id: "operations", name: "Operations", icon: <Building2 className="h-4 w-4" /> },
    { id: "leadership", name: "Leadership & Management", icon: <Users className="h-4 w-4" /> },
    { id: "technology", name: "Technology & Innovation", icon: <Rocket className="h-4 w-4" /> },
    { id: "strategy", name: "Strategy & Planning", icon: <Target className="h-4 w-4" /> },
    { id: "growth", name: "Growth & Scaling", icon: <BarChart3 className="h-4 w-4" /> },
  ]

  const learningPaths = [
    {
      id: "founder-journey",
      title: "Founder's Journey",
      description: "Complete path from idea to IPO",
      duration: "6 months",
      courses: 15,
      level: "All Levels",
      color: "from-blue-500 to-purple-600"
    },
    {
      id: "tech-founder",
      title: "Tech Founder Track",
      description: "For technical founders building products",
      duration: "4 months",
      courses: 12,
      level: "Intermediate",
      color: "from-green-500 to-teal-600"
    },
    {
      id: "non-tech-founder",
      title: "Non-Tech Founder Track",
      description: "For business founders without technical background",
      duration: "5 months",
      courses: 14,
      level: "Beginner",
      color: "from-orange-500 to-red-600"
    },
    {
      id: "scaling-leader",
      title: "Scaling & Leadership",
      description: "Advanced leadership and scaling strategies",
      duration: "3 months",
      courses: 10,
      level: "Advanced",
      color: "from-purple-500 to-pink-600"
    }
  ]

  const courses = [
    {
      id: "funding-101",
      title: "Startup Funding Fundamentals",
      description: "Learn the basics of startup funding, from bootstrapping to Series A. Understand different funding sources and how to prepare for investor meetings.",
      duration: "4 hours",
      level: "Beginner",
      category: "funding",
      instructor: {
        name: "Sarah Chen",
        avatar: "/professional-woman-diverse.png",
        title: "Venture Capital Partner"
      },
      lessons: 12,
      students: 1247,
      rating: 4.8,
      isCompleted: true,
      progress: 100,
      tags: ["Funding", "Investors", "Pitch Deck"],
      price: "Free",
      featured: true,
      certificate: true,
      language: "English",
      lastUpdated: "2024-01-15"
    },
    {
      id: "pitch-deck-mastery",
      title: "Pitch Deck Mastery",
      description: "Create compelling pitch decks that win over investors. Learn storytelling techniques, slide design, and presentation skills.",
      duration: "6 hours",
      level: "Intermediate",
      category: "funding",
      instructor: {
        name: "David Wong",
        avatar: "/tech-professional.png",
        title: "Startup Advisor"
      },
      lessons: 18,
      students: 892,
      rating: 4.9,
      progress: 65,
      tags: ["Pitch Deck", "Presentation", "Storytelling"],
      price: "$99",
      featured: true,
      certificate: true,
      language: "English",
      lastUpdated: "2024-01-10"
    },
    {
      id: "growth-marketing",
      title: "Growth Marketing Strategies",
      description: "Master growth marketing techniques including SEO, content marketing, social media, and paid advertising for startups.",
      duration: "8 hours",
      level: "Intermediate",
      category: "marketing",
      instructor: {
        name: "Maya Singh",
        avatar: "/marketing-professional.png",
        title: "Growth Marketing Expert"
      },
      lessons: 24,
      students: 1567,
      rating: 4.7,
      progress: 30,
      tags: ["Marketing", "Growth", "Digital Marketing"],
      price: "$149",
      featured: false,
      certificate: true,
      language: "English",
      lastUpdated: "2024-01-08"
    },
    {
      id: "product-development",
      title: "Product Development Masterclass",
      description: "Build products that users love. Learn user research, prototyping, testing, and iteration methodologies.",
      duration: "10 hours",
      level: "Advanced",
      category: "product",
      instructor: {
        name: "Alex Kim",
        avatar: "/product-manager.png",
        title: "Product Director at TechCorp"
      },
      lessons: 30,
      students: 2103,
      rating: 4.9,
      progress: 0,
      tags: ["Product", "UX", "Research", "Prototyping"],
      price: "$199",
      featured: true,
      certificate: true,
      language: "English",
      lastUpdated: "2024-01-12"
    },
    {
      id: "legal-compliance",
      title: "Startup Legal Essentials",
      description: "Navigate the legal landscape of startups. Learn about incorporation, contracts, IP protection, and compliance.",
      duration: "5 hours",
      level: "Beginner",
      category: "legal",
      instructor: {
        name: "Jennifer Law",
        avatar: "/lawyer-professional.png",
        title: "Startup Attorney"
      },
      lessons: 15,
      students: 756,
      rating: 4.6,
      progress: 0,
      tags: ["Legal", "Compliance", "Contracts", "IP"],
      price: "$79",
      featured: false,
      certificate: true,
      language: "English",
      lastUpdated: "2024-01-05"
    },
    {
      id: "operations-scaling",
      title: "Operations & Scaling",
      description: "Scale your startup operations efficiently. Learn about team building, process optimization, and growth management.",
      duration: "7 hours",
      level: "Intermediate",
      category: "operations",
      instructor: {
        name: "Michael Chen",
        avatar: "/operations-manager.png",
        title: "COO at ScaleUp Inc"
      },
      lessons: 21,
      students: 1345,
      rating: 4.8,
      progress: 0,
      tags: ["Operations", "Scaling", "Team Building", "Process"],
      price: "$129",
      featured: false,
      certificate: true,
      language: "English",
      lastUpdated: "2024-01-03"
    }
  ]

  const features = [
    {
      title: "Expert-Led Curriculum",
      description: "Learn from venture partners, successful founders, and domain experts.",
      icon: GraduationCap,
    },
    {
      title: "Hands-on Projects",
      description: "Apply concepts immediately with guided exercises and templates.",
      icon: FileText,
    },
    {
      title: "Community & Mentorship",
      description: "Get feedback from peers and mentors as you build.",
      icon: Users,
    },
  ]

  // Filter and search courses
  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesLevel = selectedLevel === "all" || course.level.toLowerCase() === selectedLevel.toLowerCase()
    
    const matchesPrice = selectedPrice === "all" || 
      (selectedPrice === "free" && course.price === "Free") ||
      (selectedPrice === "paid" && course.price !== "Free")
    
    const matchesDuration = selectedDuration === "all" ||
      (selectedDuration === "short" && parseInt(course.duration) <= 2) ||
      (selectedDuration === "medium" && parseInt(course.duration) > 2 && parseInt(course.duration) <= 6) ||
      (selectedDuration === "long" && parseInt(course.duration) > 6)
    
    return matchesCategory && matchesSearch && matchesLevel && matchesPrice && matchesDuration
  })

  // Sort courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.students - a.students
      case "rating":
        return b.rating - a.rating
      case "newest":
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
      case "price-low":
        return parseFloat(a.price.replace(/[^0-9.]/g, '')) - parseFloat(b.price.replace(/[^0-9.]/g, ''))
      case "price-high":
        return parseFloat(b.price.replace(/[^0-9.]/g, '')) - parseFloat(a.price.replace(/[^0-9.]/g, ''))
      default:
        return 0
    }
  })

  // Handle course actions
  const handleSaveCourse = (courseId: string) => {
    const newSavedCourses = savedCourses.includes(courseId)
      ? savedCourses.filter(id => id !== courseId)
      : [...savedCourses, courseId]
    
    setSavedCourses(newSavedCourses)
    localStorage.setItem('savedCourses', JSON.stringify(newSavedCourses))
    
    toast({
      title: savedCourses.includes(courseId) ? "Course Removed" : "Course Saved",
      description: savedCourses.includes(courseId) 
        ? "Course removed from your saved list" 
        : "Course added to your saved list",
    })
  }

  const handleEnrollCourse = (courseId: string) => {
    toast({
      title: "Course Enrollment",
      description: "Redirecting to course enrollment page...",
    })
    // In a real app, this would redirect to enrollment
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      {isMobile && (
        <div className="lg:hidden bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-2"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Startup School</h1>
                <p className="text-xs text-gray-500">{sortedCourses.length} courses available</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-2 relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="h-5 w-5" />
                {showNotifications && (
                  <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></div>
                )}
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-2"
                onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
              >
                <Search className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-2"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Mobile Search Bar */}
          <div className="px-4 pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search courses, instructors, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 text-sm bg-gray-50 border-gray-200"
              />
            </div>
          </div>
          
          {/* Mobile Quick Actions */}
          <div className="px-4 pb-4">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              <Button size="sm" variant="outline" className="whitespace-nowrap bg-white border-gray-300 text-gray-700 hover:bg-gray-50" asChild>
                <Link href="/resources/startup-school/my-courses">
                  <BookOpen className="h-4 w-4 mr-1" />
                  My Courses
                </Link>
              </Button>
              <Button size="sm" variant="outline" className="whitespace-nowrap bg-white border-gray-300 text-gray-700 hover:bg-gray-50" asChild>
                <Link href="/resources/startup-school/certificates">
                  <Award className="h-4 w-4 mr-1" />
                  Certificates
                </Link>
              </Button>
              <Button size="sm" variant="outline" className="whitespace-nowrap bg-white border-gray-300 text-gray-700 hover:bg-gray-50" asChild>
                <Link href="/resources/startup-school/learning-paths">
                  <Target className="h-4 w-4 mr-1" />
                  Learning Paths
                </Link>
              </Button>
              <Button size="sm" variant="outline" className="whitespace-nowrap bg-white border-gray-300 text-gray-700 hover:bg-gray-50" onClick={() => setShowFilters(!showFilters)}>
                <Filter className="h-4 w-4 mr-1" />
                Filters
              </Button>
              <Button size="sm" variant="outline" className="whitespace-nowrap bg-white border-gray-300 text-gray-700 hover:bg-gray-50" asChild>
                <Link href="/resources/startup-school/analytics">
                  <BarChart className="h-4 w-4 mr-1" />
                  Analytics
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-[#0F7377] py-8 lg:py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-4 lg:mb-6 bg-[#F59E0B] text-white border-[#F59E0B] px-4 py-2 text-lg font-bold shadow-2xl">
              <GraduationCap className="w-4 h-4 mr-2" />
              Startup Education
            </Badge>
            <h1 className="mb-4 lg:mb-6 text-3xl font-black text-white lg:text-5xl xl:text-7xl" style={{textShadow: '3px 3px 6px rgba(0,0,0,0.8)'}}>
              GrowthLab Startup School
            </h1>
            <p className="mb-6 lg:mb-8 text-xl lg:text-2xl text-white font-semibold leading-relaxed" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
              Master the fundamentals of building and scaling successful startups with our comprehensive curriculum designed by industry experts and successful founders.
            </p>
            
            {/* Desktop Search */}
            {!isMobile && (
              <div className="mb-8 max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-600" />
                  <Input
                    placeholder="Search courses, instructors, or topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 py-4 text-lg bg-white border-4 border-gray-300 text-gray-900 placeholder-gray-500 focus:bg-white focus:border-blue-500 shadow-2xl"
                  />
                </div>
              </div>
            )}
            
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
              <Button size="lg" className="bg-[#F59E0B] text-white hover:bg-[#F59E0B]/90 px-8 py-4 text-lg font-bold shadow-2xl border-2 border-[#F59E0B]" asChild>
                <Link href="/signup">
                  <Rocket className="h-6 w-6 mr-2" />
                  Enroll Now
                </Link>
              </Button>
              <Button size="lg" className="bg-white text-[#0F7377] hover:bg-gray-100 px-8 py-4 text-lg font-bold shadow-2xl border-4 border-white" asChild>
                <Link href="#courses">
                  <BookOpen className="h-6 w-6 mr-2" />
                  View Courses
                </Link>
              </Button>
              <Button size="lg" className="bg-white text-[#0F7377] hover:bg-gray-100 px-8 py-4 text-lg font-bold shadow-2xl border-4 border-white" asChild>
                <Link href="/resources/startup-school/learning-paths">
                  <Target className="h-6 w-6 mr-2" />
                  Learning Paths
                </Link>
              </Button>
              <Button size="lg" className="bg-white text-[#0F7377] hover:bg-gray-100 px-8 py-4 text-lg font-bold shadow-2xl border-4 border-white" asChild>
                <Link href="/resources/startup-school/certificates">
                  <Award className="h-6 w-6 mr-2" />
                  My Certificates
                </Link>
              </Button>
              <Button size="lg" className="bg-white text-[#0F7377] hover:bg-gray-100 px-8 py-4 text-lg font-bold shadow-2xl border-4 border-white" asChild>
                <Link href="/resources/startup-school/my-courses">
                  <BookOpen className="h-6 w-6 mr-2" />
                  My Courses
                </Link>
              </Button>
            </div>
            
            {/* Quick Stats */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-4 md:p-6">
                  <div className="w-12 h-12 bg-[#0F7377]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <div className="mb-2 text-2xl md:text-3xl font-bold text-[#0F7377]">{stat.value}</div>
                  <div className="text-xs md:text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Why Choose GrowthLab Startup School?</h2>
            <p className="text-lg text-gray-600">
              Our comprehensive program combines theoretical knowledge with practical application to give you the skills needed for startup success.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="text-center border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-[#0F7377]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-[#0F7377]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Your Learning Dashboard</h2>
            <p className="text-lg text-gray-600">
              Track your progress, manage your courses, and access personalized recommendations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Link href="/resources/startup-school/my-courses">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">My Courses</h3>
                  <p className="text-sm text-gray-600 mb-3">{enrolledCourses.length} enrolled</p>
                  <div className="text-2xl font-bold text-blue-600">{completedCourses.length}</div>
                  <div className="text-xs text-gray-500">Completed</div>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/resources/startup-school/certificates">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Certificates</h3>
                  <p className="text-sm text-gray-600 mb-3">Earned certificates</p>
                  <div className="text-2xl font-bold text-green-600">{completedCourses.length}</div>
                  <div className="text-xs text-gray-500">Available</div>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/resources/startup-school/learning-paths">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Learning Paths</h3>
                  <p className="text-sm text-gray-600 mb-3">Structured tracks</p>
                  <div className="text-2xl font-bold text-purple-600">{learningPaths.length}</div>
                  <div className="text-xs text-gray-500">Available</div>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/resources/startup-school/analytics">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Analytics</h3>
                  <p className="text-sm text-gray-600 mb-3">Learning insights</p>
                  <div className="text-2xl font-bold text-orange-600">94%</div>
                  <div className="text-xs text-gray-500">Success Rate</div>
                </CardContent>
              </Card>
            </Link>
          </div>
          
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button variant="outline" className="h-16 justify-start" asChild>
              <Link href="/resources/startup-school/create-course">
                <Plus className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Create Course</div>
                  <div className="text-sm text-gray-500">Share your expertise</div>
                </div>
              </Link>
            </Button>
            
            <Button variant="outline" className="h-16 justify-start" asChild>
              <Link href="/resources/startup-school/live-sessions">
                <Video className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Live Sessions</div>
                  <div className="text-sm text-gray-500">Join live workshops</div>
                </div>
              </Link>
            </Button>
            
            <Button variant="outline" className="h-16 justify-start" asChild>
              <Link href="/resources/startup-school/community">
                <Users className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Community</div>
                  <div className="text-sm text-gray-500">Connect with peers</div>
                </div>
              </Link>
            </Button>
            
            <Button variant="outline" className="h-16 justify-start" asChild>
              <Link href="/resources/startup-school/resources">
                <FileText className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Resources</div>
                  <div className="text-sm text-gray-500">Templates & guides</div>
                </div>
              </Link>
            </Button>
            
            <Button variant="outline" className="h-16 justify-start" asChild>
              <Link href="/resources/startup-school/settings">
                <Settings className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Settings</div>
                  <div className="text-sm text-gray-500">Manage preferences</div>
                </div>
              </Link>
            </Button>
            
            <Button variant="outline" className="h-16 justify-start" asChild>
              <Link href="/resources/startup-school/help">
                <MessageCircle className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Help & Support</div>
                  <div className="text-sm text-gray-500">Get assistance</div>
                </div>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Learning Paths Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Structured Learning Paths</h2>
            <p className="text-lg text-gray-600">
              Follow curated learning paths designed by industry experts to master specific skills and advance your startup journey.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {learningPaths.map((path) => (
              <Card key={path.id} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className={`h-2 bg-gradient-to-r ${path.color}`}></div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{path.title}</h3>
                      <p className="text-gray-600 mb-4">{path.description}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {path.level}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#0F7377]">{path.courses}</div>
                      <div className="text-sm text-gray-600">Courses</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#0F7377]">{path.duration}</div>
                      <div className="text-sm text-gray-600">Duration</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-[#0F7377] hover:bg-[#0F7377]/90" asChild>
                      <Link href={`/resources/startup-school/learning-paths/${path.id}`}>
                        Start Path
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href={`/resources/startup-school/learning-paths/${path.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Filter Menu */}
      {isMobile && showMobileMenu && (
        <div className="lg:hidden bg-white border-b shadow-sm">
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Filters</h3>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                >
                  <Settings className="h-4 w-4 mr-1" />
                  Advanced
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowMobileMenu(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      <div className="flex items-center">
                        {category.icon}
                        <span className="ml-2">{category.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Advanced Filters */}
            {showAdvancedFilters && (
              <div className="space-y-4 pt-4 border-t">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                  <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                  <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Prices</SelectItem>
                      <SelectItem value="free">Free</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                  <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Durations</SelectItem>
                      <SelectItem value="short">Short (≤2 hours)</SelectItem>
                      <SelectItem value="medium">Medium (2-6 hours)</SelectItem>
                      <SelectItem value="long">Long (&gt;6 hours)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Desktop Filter Bar */}
      {!isMobile && (
        <div className="bg-white border-b">
          <div className="container mx-auto max-w-7xl px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">Category:</span>
                  <div className="flex space-x-2">
                    {categories.map((category) => (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category.id)}
                        className="text-xs"
                      >
                        {category.icon}
                        <span className="ml-1">{category.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">Sort by:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Advanced
                </Button>
                
                <Button variant="outline" size="sm" asChild>
                  <Link href="/resources/startup-school/my-courses">
                    <BookOpen className="h-4 w-4 mr-2" />
                    My Courses
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Advanced Filters */}
            {showAdvancedFilters && (
              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-700">Level:</span>
                    <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-700">Price:</span>
                    <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="free">Free</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-700">Duration:</span>
                    <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="short">Short (&le;2h)</SelectItem>
                        <SelectItem value="medium">Medium (2-6h)</SelectItem>
                        <SelectItem value="long">Long (&gt;6h)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      setSelectedLevel("all")
                      setSelectedPrice("all")
                      setSelectedDuration("all")
                      setSelectedCategory("all")
                    }}
                  >
                    Clear All
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Course Recommendations Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Recommended for You</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Based on your interests and learning history, here are courses we think you'll love.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {courses.filter(course => course.featured).slice(0, 3).map((course) => (
              <Card key={course.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="relative">
                  <div className="w-full h-48 bg-gradient-to-br from-[#0F7377] to-[#F59E0B] rounded-t-lg flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-white opacity-80" />
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-[#F59E0B] text-white">Recommended</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">{course.category}</Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600">{course.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-[#0F7377] transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>{course.duration}</span>
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-[#0F7377]">{course.price}</span>
                    <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                      Enroll Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Courses Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Trending Now</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The most popular courses this week based on enrollments and ratings.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {courses.filter(course => course.rating >= 4.8).slice(0, 4).map((course) => (
              <Card key={course.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="relative">
                  <div className="w-full h-32 bg-gradient-to-br from-[#0F7377] to-[#F59E0B] rounded-t-lg flex items-center justify-center">
                    <BookOpen className="h-12 w-12 text-white opacity-80" />
                  </div>
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-red-500 text-white text-xs">Trending</Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">{course.category}</Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span className="text-xs text-gray-600">{course.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold mb-1 group-hover:text-[#0F7377] transition-colors line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-xs mb-2 line-clamp-2">{course.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span>{course.duration}</span>
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#0F7377]">{course.price}</span>
                    <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90 text-xs px-2 py-1">
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Live Sessions & Events Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Live Sessions & Events</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join live workshops, Q&A sessions, and networking events with industry experts.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-green-500 text-white">Live Now</Badge>
                  <span className="text-sm text-gray-500">2:30 PM EST</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Startup Funding Q&A</h3>
                <p className="text-gray-600 text-sm mb-4">Get your funding questions answered by VC partners in real-time.</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-[#0F7377] rounded-full flex items-center justify-center">
                      <Users className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm text-gray-600">Sarah Chen</span>
                  </div>
                  <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                    Join Now
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-blue-500 text-white">Upcoming</Badge>
                  <span className="text-sm text-gray-500">Tomorrow 3:00 PM</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Pitch Deck Workshop</h3>
                <p className="text-gray-600 text-sm mb-4">Learn to create compelling pitch decks that win over investors.</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-[#0F7377] rounded-full flex items-center justify-center">
                      <Users className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm text-gray-600">David Wong</span>
                  </div>
                  <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                    Register
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-purple-500 text-white">This Week</Badge>
                  <span className="text-sm text-gray-500">Friday 2:00 PM</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Growth Marketing Masterclass</h3>
                <p className="text-gray-600 text-sm mb-4">Advanced growth strategies for scaling your startup.</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-[#0F7377] rounded-full flex items-center justify-center">
                      <Users className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm text-gray-600">Maya Singh</span>
                  </div>
                  <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                    Register
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center">
            <Button size="lg" className="bg-[#F59E0B] text-white hover:bg-[#F59E0B]/90" asChild>
              <Link href="/resources/startup-school/live-sessions">
                View All Sessions
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-8 lg:py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl text-center mb-8 lg:mb-12">
            <h2 className="mb-4 text-2xl lg:text-3xl font-bold text-gray-900 md:text-4xl">
              {selectedCategory === "all" ? "All Courses" : categories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <p className="text-base lg:text-lg text-gray-600">
              {sortedCourses.length} course{sortedCourses.length !== 1 ? 's' : ''} available
            </p>
          </div>
          
          {sortedCourses.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
              <Button onClick={() => {
                setSearchQuery("")
                setSelectedCategory("all")
              }}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {sortedCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                {/* Course Image/Header */}
                <div className="relative h-32 bg-gradient-to-br from-[#0F7377]/10 to-[#0F7377]/5">
                  {course.featured && (
                    <Badge className="absolute top-2 left-2 bg-[#F59E0B] text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                  <div className="absolute top-2 right-2 flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
                      onClick={() => handleSaveCourse(course.id)}
                    >
                      {savedCourses.includes(course.id) ? (
                        <BookmarkCheck className="h-4 w-4 text-[#0F7377]" />
                      ) : (
                        <Bookmark className="h-4 w-4 text-gray-500" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
                    >
                      <Share2 className="h-4 w-4 text-gray-500" />
                    </Button>
                  </div>
                  <div className="absolute bottom-2 right-2">
                    <Badge variant="secondary" className="bg-white/90 text-gray-700">
                      {course.price}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant={course.level === "Beginner" ? "default" : course.level === "Intermediate" ? "secondary" : "destructive"}>
                      {course.level}
                    </Badge>
                    {course.isCompleted && (
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        <Check className="w-3 h-3 mr-1" />
                        Completed
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
                  <CardDescription className="text-sm text-gray-600 line-clamp-2">
                    {course.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3">
                  {/* Instructor */}
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={course.instructor.avatar} />
                      <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{course.instructor.name}</p>
                      <p className="text-xs text-gray-500 truncate">{course.instructor.title}</p>
                    </div>
                  </div>

                  {/* Course Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {course.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        {course.lessons}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      {course.rating}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {course.progress !== undefined && course.progress > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {course.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {course.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{course.tags.length - 3} more
                      </Badge>
                    )}
                  </div>

                  {/* Students and Certificate */}
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Users className="h-3 w-3" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                    {course.certificate && (
                      <div className="flex items-center gap-1 text-[#0F7377]">
                        <Award className="h-3 w-3" />
                        <span className="text-xs">Certificate</span>
                      </div>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="pt-0">
                  <div className="w-full space-y-2">
                    <Button 
                      className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90"
                      onClick={() => handleEnrollCourse(course.id)}
                    >
                      {course.isCompleted ? "Review Course" : course.progress ? "Continue Learning" : "Start Learning"}
                    </Button>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        asChild
                      >
                        <Link href={`/resources/startup-school/course/${course.id}`}>
                          <Eye className="h-4 w-4 mr-1" />
                          Preview
                        </Link>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        asChild
                      >
                        <Link href={`/resources/startup-school/course/${course.id}/reviews`}>
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Reviews
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from founders who have transformed their ideas into successful businesses with our courses.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#0F7377] rounded-full flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Alex Rodriguez</h3>
                    <p className="text-sm text-gray-600">Founder, TechFlow</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  "The funding course helped me raise $2M in Series A. The pitch deck templates and investor insights were game-changers."
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  </div>
                  <Badge className="bg-green-100 text-green-800">$2M Raised</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#0F7377] rounded-full flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Sarah Kim</h3>
                    <p className="text-sm text-gray-600">CEO, GrowthLab</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  "The product development course taught me everything I needed to build a user-centric product. We now have 50K+ users."
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">50K+ Users</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#0F7377] rounded-full flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Michael Chen</h3>
                    <p className="text-sm text-gray-600">Founder, DataFlow</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  "The marketing strategies course helped me scale from 0 to $1M ARR in just 12 months. Incredible results!"
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  </div>
                  <Badge className="bg-purple-100 text-purple-800">$1M ARR</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#0F7377] py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-4xl font-black text-white md:text-5xl" style={{textShadow: '3px 3px 6px rgba(0,0,0,0.8)'}}>Ready to Start Your Journey?</h2>
            <p className="mb-8 text-xl text-white font-semibold" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
              Join thousands of founders who have already accelerated their startup journey with GrowthLab Startup School.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="bg-[#F59E0B] text-white hover:bg-[#F59E0B]/90 px-8 py-4 text-lg font-bold shadow-2xl border-2 border-[#F59E0B]" asChild>
                <Link href="/signup">Get Started Free</Link>
              </Button>
              <Button size="lg" className="bg-white text-[#0F7377] hover:bg-gray-100 px-8 py-4 text-lg font-bold shadow-2xl border-4 border-white" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
          <div className="flex items-center justify-around py-2">
            <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 h-auto py-2" asChild>
              <Link href="/resources/startup-school">
                <BookOpen className="h-5 w-5" />
                <span className="text-xs">Courses</span>
              </Link>
            </Button>
            <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 h-auto py-2" asChild>
              <Link href="/resources/startup-school/my-courses">
                <Play className="h-5 w-5" />
                <span className="text-xs">My Courses</span>
              </Link>
            </Button>
            <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 h-auto py-2" asChild>
              <Link href="/resources/startup-school/learning-paths">
                <Target className="h-5 w-5" />
                <span className="text-xs">Paths</span>
              </Link>
            </Button>
            <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 h-auto py-2" asChild>
              <Link href="/resources/startup-school/certificates">
                <Award className="h-5 w-5" />
                <span className="text-xs">Certificates</span>
              </Link>
            </Button>
            <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 h-auto py-2">
              <User className="h-5 w-5" />
              <span className="text-xs">Profile</span>
            </Button>
          </div>
        </div>
      )}

      <div className="lg:hidden h-20"></div>
    </div>
  )
}
