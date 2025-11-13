"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowRight,
  Heart,
  Share2,
  Clock,
  MapPin,
  Play,
  Bookmark,
  Search,
  ShieldCheck,
  TrendingUp,
  Rocket,
  BarChart3,
  Users,
  DollarSign,
  Star,
  Plus,
  Activity,
  Filter,
  RefreshCw,
  X,
  Flame,
  ChevronDown,
  ChevronUp,
  ThumbsUp,
  MoreHorizontal,
  Zap as Lightning,
  Globe,
  Calculator,
  Grid3X3,
  List
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ComprehensiveCreateProjectModal } from "@/components/growthstarter/comprehensive-create-project-modal"
import { EnhancedProjectDetailModal } from "@/components/growthstarter/enhanced-project-detail-modal"

export default function GrowthStarterPage() {
  const router = useRouter()
  const { user } = useAuth()

  // Enhanced state management
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [displayedCount, setDisplayedCount] = useState(6)
  const [sortBy, setSortBy] = useState("trending")
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [showProjectModal, setShowProjectModal] = useState(false)
  const [bookmarkedProjects, setBookmarkedProjects] = useState<number[]>([])
  const [likedProjects, setLikedProjects] = useState<number[]>([])
  const [showCreateProject, setShowCreateProject] = useState(false)
  const [filterBy, setFilterBy] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 100000])
  const [showTrending, setShowTrending] = useState(true)
  const [showFeatured, setShowFeatured] = useState(true)
  const [showEndingSoon, setShowEndingSoon] = useState(false)
  const [showLiveUpdates, setShowLiveUpdates] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [selectedReward, setSelectedReward] = useState<number | null>(null)
  const [showPledgeModal, setShowPledgeModal] = useState(false)
  const [pledgeAmount, setPledgeAmount] = useState("")
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState("")
  const [liveFunding, setLiveFunding] = useState(false)
  const [fundingUpdates, setFundingUpdates] = useState<any[]>([])
  const [showCreatorProfile, setShowCreatorProfile] = useState(false)
  const [selectedCreator, setSelectedCreator] = useState<any>(null)
  const [followedCreators, setFollowedCreators] = useState<number[]>([])
  const [recommendedProjects, setRecommendedProjects] = useState<any[]>([])
  const [showFundingCalculator, setShowFundingCalculator] = useState(false)
  const [showProjectGallery, setShowProjectGallery] = useState(false)
  const [selectedGalleryImage, setSelectedGalleryImage] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false)
  const [createProjectStep, setCreateProjectStep] = useState(1)
  const [uploadedImages, setUploadedImages] = useState<File[]>([])
  const [uploadedVideos, setUploadedVideos] = useState<File[]>([])
  const [uploadedDocuments, setUploadedDocuments] = useState<File[]>([])
  const [currentTag, setCurrentTag] = useState('')
  const [currentReward, setCurrentReward] = useState({ amount: 0, title: '', description: '' })
  const [currentTeamMember, setCurrentTeamMember] = useState({ name: '', role: '', bio: '', avatar: '' })
  const [currentFAQ, setCurrentFAQ] = useState({ question: '', answer: '' })
  const [currentStretchGoal, setCurrentStretchGoal] = useState({ amount: 0, title: '', description: '' })
  const [currentPerk, setCurrentPerk] = useState({ amount: 0, title: '', description: '', limited: false, limit: 0 })
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    category: 'technology',
    goal: 0,
    image: '',
    creator: 'You',
    creatorAvatar: '/placeholder.svg?height=40&width=40&query=user',
    tags: [] as string[],
    location: '',
    rewards: [] as Array<{ amount: number; title: string; description: string }>,
    // Enhanced project fields
    shortDescription: '',
    story: '',
    risks: '',
    timeline: '',
    team: [] as Array<{ name: string; role: string; bio: string; avatar: string }>,
    images: [] as string[],
    videos: [] as string[],
    faq: [] as Array<{ question: string; answer: string }>,
    updates: [] as Array<{ title: string; content: string; date: string }>,
    socialLinks: {
      website: '',
      twitter: '',
      facebook: '',
      instagram: '',
      linkedin: ''
    },
    contactEmail: '',
    phone: '',
    businessPlan: '',
    marketResearch: '',
    financialProjections: '',
    legalDocuments: [] as string[],
    campaignDuration: 30,
    launchDate: '',
    endDate: '',
    minimumPledge: 1,
    currency: 'USD',
    shippingInfo: '',
    returnPolicy: '',
    estimatedDelivery: '',
    stretchGoals: [] as Array<{ amount: number; title: string; description: string }>,
    perks: [] as Array<{ amount: number; title: string; description: string; limited: boolean; limit: number }>,
    earlyBird: false,
    earlyBirdDiscount: 0,
    referralProgram: false,
    referralReward: 0
  })

  // Type for enhanced project data
  type EnhancedProject = {
    id: number
    title: string
    description: string
    category: string
    goal: number
    raised: number
    backers: number
    daysLeft: number
    image: string
    creator: string
    creatorAvatar: string
    featured: boolean
    trending: boolean
    verified: boolean
    tags: string[]
    location: string
    rewards: Array<{ amount: number; title: string; description: string }>
    updates: number
    comments: number
    socialProof: string
    video?: string | null
    gallery: string[]
    faq: Array<{ question: string; answer: string }>
    risks: string[]
    timeline: Array<{ month: string; activity: string }>
    team: Array<{ name: string; role: string; avatar: string }>
    liveStats?: {
      currentBackers: number
      currentRaised: number
      hourlyBackers: number
      trendingScore: number
    }
  }

  // Comprehensive mock data for projects
  const projects = [
    {
      id: 1,
      title: "EcoTech Solutions",
      description: "Revolutionary green technology for sustainable living with AI-powered energy management",
      category: "technology",
      goal: 50000,
      raised: 25000,
      backers: 150,
      daysLeft: 15,
      image: "/startup-team-collaboration.png",
      creator: "Sarah Chen",
      creatorAvatar: "/sarah-chen.png",
      featured: true,
      verified: true,
      trending: true,
      tags: ["AI", "Sustainability", "Green Tech"],
      location: "San Francisco, CA",
      rewards: [
        { amount: 25, title: "Early Bird", description: "Get 20% off retail price" },
        { amount: 100, title: "Supporter", description: "Limited edition product + updates" },
        { amount: 500, title: "Investor", description: "VIP access + exclusive content" }
      ],
      updates: 12,
      comments: 45,
      socialProof: "Featured in TechCrunch"
    },
    {
      id: 2,
      title: "Artisan Coffee Roasters",
      description: "Premium coffee beans from sustainable farms across Latin America",
      category: "food",
      goal: 25000,
      raised: 18000,
      backers: 89,
      daysLeft: 22,
      image: "/startup-workshop.png",
      creator: "Mike Johnson",
      creatorAvatar: "/professional-connections.png",
      featured: false,
      verified: true,
      trending: false,
      tags: ["Coffee", "Sustainability", "Artisan"],
      location: "Portland, OR",
      rewards: [
        { amount: 15, title: "Coffee Lover", description: "1 bag of premium coffee" },
        { amount: 50, title: "Coffee Connoisseur", description: "3 bags + tasting notes" },
        { amount: 150, title: "Coffee Master", description: "Monthly subscription + equipment" }
      ],
      updates: 8,
      comments: 23,
      socialProof: "5-star rating from 200+ backers"
    },
    {
      id: 3,
      title: "Smart Home Security System",
      description: "AI-powered home security with facial recognition and mobile alerts",
      category: "technology",
      goal: 75000,
      raised: 45000,
      backers: 234,
      daysLeft: 8,
      image: "/placeholder.svg?height=400&width=600&query=smart home security",
      creator: "Alex Rodriguez",
      creatorAvatar: "/placeholder.svg?height=40&width=40&query=alex",
      featured: true,
      verified: true,
      trending: true,
      tags: ["AI", "Security", "Smart Home"],
      location: "Austin, TX",
      rewards: [
        { amount: 99, title: "Early Adopter", description: "Basic security kit" },
        { amount: 199, title: "Smart Home", description: "Complete system + installation" },
        { amount: 499, title: "Premium", description: "Professional monitoring + support" }
      ],
      updates: 15,
      comments: 67,
      socialProof: "Backed by 200+ security experts"
    },
    {
      id: 4,
      title: "Sustainable Fashion Line",
      description: "Eco-friendly clothing made from recycled materials and ethical manufacturing",
      category: "creative",
      goal: 30000,
      raised: 12000,
      backers: 78,
      daysLeft: 35,
      image: "/placeholder.svg?height=400&width=600&query=sustainable fashion",
      creator: "Emma Thompson",
      creatorAvatar: "/placeholder.svg?height=40&width=40&query=emma",
      featured: false,
      verified: true,
      trending: false,
      tags: ["Fashion", "Sustainability", "Ethical"],
      location: "New York, NY",
      rewards: [
        { amount: 35, title: "Fashion Forward", description: "1 sustainable t-shirt" },
        { amount: 75, title: "Style Setter", description: "Complete outfit + styling guide" },
        { amount: 200, title: "Fashion Icon", description: "Limited collection + personal styling" }
      ],
      updates: 6,
      comments: 34,
      socialProof: "Featured in Vogue Sustainability"
    },
    {
      id: 5,
      title: "Mental Health App",
      description: "AI-powered mental health companion with 24/7 support and personalized therapy",
      category: "health",
      goal: 100000,
      raised: 67000,
      backers: 456,
      daysLeft: 12,
      image: "/placeholder.svg?height=400&width=600&query=mental health app",
      creator: "Dr. Lisa Park",
      creatorAvatar: "/placeholder.svg?height=40&width=40&query=lisa",
      featured: true,
      verified: true,
      trending: true,
      tags: ["Health", "AI", "Mental Health"],
      location: "Los Angeles, CA",
      rewards: [
        { amount: 29, title: "Wellness Starter", description: "1 month premium access" },
        { amount: 79, title: "Mental Health Pro", description: "3 months + personal coach" },
        { amount: 199, title: "Lifetime Access", description: "Unlimited access + priority support" }
      ],
      updates: 20,
      comments: 89,
      socialProof: "Endorsed by 50+ mental health professionals"
    },
    {
      id: 6,
      title: "Urban Vertical Farm",
      description: "Revolutionary vertical farming system for urban environments with IoT monitoring",
      category: "technology",
      goal: 150000,
      raised: 89000,
      backers: 312,
      daysLeft: 18,
      image: "/placeholder.svg?height=400&width=600&query=vertical farm",
      creator: "Marcus Green",
      creatorAvatar: "/placeholder.svg?height=40&width=40&query=marcus",
      featured: false,
      verified: true,
      trending: true,
      tags: ["Agriculture", "IoT", "Urban Farming"],
      location: "Chicago, IL",
      rewards: [
        { amount: 50, title: "Garden Starter", description: "Small vertical garden kit" },
        { amount: 150, title: "Urban Farmer", description: "Complete system + seeds" },
        { amount: 500, title: "Farm Partner", description: "Commercial system + training" }
      ],
      updates: 14,
      comments: 56,
      socialProof: "Featured in National Geographic"
    },
    {
      id: 7,
      title: "Handcrafted Wooden Watches",
      description: "Luxury wooden watches made from reclaimed wood with Swiss movement",
      category: "creative",
      goal: 40000,
      raised: 28000,
      backers: 167,
      daysLeft: 25,
      image: "/placeholder.svg?height=400&width=600&query=wooden watches",
      creator: "James Wilson",
      creatorAvatar: "/placeholder.svg?height=40&width=40&query=james",
      featured: false,
      verified: true,
      trending: false,
      tags: ["Luxury", "Woodworking", "Swiss Movement"],
      location: "Seattle, WA",
      rewards: [
        { amount: 89, title: "Time Keeper", description: "Classic wooden watch" },
        { amount: 149, title: "Watch Collector", description: "Limited edition + case" },
        { amount: 299, title: "Master Craftsman", description: "Custom design + personalization" }
      ],
      updates: 10,
      comments: 41,
      socialProof: "5-star rating from 150+ customers"
    },
    {
      id: 8,
      title: "Fitness Tracker Ring",
      description: "Minimalist fitness tracking ring with advanced health monitoring and sleep analysis",
      category: "health",
      goal: 60000,
      raised: 42000,
      backers: 289,
      daysLeft: 20,
      image: "/placeholder.svg?height=400&width=600&query=fitness ring",
      creator: "Tech Innovations Inc",
      creatorAvatar: "/placeholder.svg?height=40&width=40&query=tech",
      featured: true,
      verified: true,
      trending: true,
      tags: ["Fitness", "Wearable", "Health Monitoring"],
      location: "San Diego, CA",
      rewards: [
        { amount: 79, title: "Fitness Enthusiast", description: "Basic fitness ring" },
        { amount: 129, title: "Health Pro", description: "Advanced ring + app premium" },
        { amount: 199, title: "Wellness Expert", description: "Pro ring + personal trainer access" }
      ],
      updates: 16,
      comments: 73,
      socialProof: "Backed by 100+ fitness professionals"
    },
    {
      id: 9,
      title: "Educational VR Platform",
      description: "Immersive virtual reality learning platform for students and professionals",
      category: "technology",
      goal: 120000,
      raised: 75000,
      backers: 445,
      daysLeft: 14,
      image: "/placeholder.svg?height=400&width=600&query=vr education",
      creator: "EduTech Solutions",
      creatorAvatar: "/placeholder.svg?height=40&width=40&query=edutech",
      featured: true,
      verified: true,
      trending: true,
      tags: ["VR", "Education", "Immersive Learning"],
      location: "Boston, MA",
      rewards: [
        { amount: 49, title: "Student Access", description: "1 year platform access" },
        { amount: 99, title: "Educator Pro", description: "Teacher tools + curriculum" },
        { amount: 299, title: "Institution", description: "School-wide license + support" }
      ],
      updates: 18,
      comments: 92,
      socialProof: "Used by 50+ universities worldwide"
    },
    {
      id: 10,
      title: "Artisan Chocolate Collection",
      description: "Premium handcrafted chocolates using rare cacao beans from around the world",
      category: "food",
      goal: 35000,
      raised: 19000,
      backers: 134,
      daysLeft: 30,
      image: "/placeholder.svg?height=400&width=600&query=artisan chocolate",
      creator: "Chocolate Artisans",
      creatorAvatar: "/placeholder.svg?height=40&width=40&query=chocolate",
      featured: false,
      verified: true,
      trending: false,
      tags: ["Chocolate", "Artisan", "Premium"],
      location: "Portland, OR",
      rewards: [
        { amount: 25, title: "Chocolate Lover", description: "6-piece collection" },
        { amount: 65, title: "Connoisseur", description: "12-piece collection + tasting notes" },
        { amount: 150, title: "Chocolate Master", description: "Monthly subscription + exclusive flavors" }
      ],
      updates: 7,
      comments: 28,
      socialProof: "Awarded Best Artisan Chocolate 2024"
    }
  ]

  // Enhanced project data with additional features (client-side only to avoid hydration issues)
  const [enhancedProjects, setEnhancedProjects] = useState<EnhancedProject[]>(projects as EnhancedProject[])

  // Detect client-side rendering
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return
    
    // Generate enhanced data only on client side to avoid hydration mismatch
    const enhanced: EnhancedProject[] = projects.map(project => ({
      ...project,
      video: project.id <= 5 ? `/placeholder.svg?height=400&width=600&query=${project.title.toLowerCase().replace(/\s+/g, '-')}-video` : null,
      gallery: [
        project.image,
        `/placeholder.svg?height=400&width=600&query=${project.title.toLowerCase().replace(/\s+/g, '-')}-2`,
        `/placeholder.svg?height=400&width=600&query=${project.title.toLowerCase().replace(/\s+/g, '-')}-3`
      ],
      faq: [
        {
          question: "When will this project be delivered?",
          answer: "We expect to deliver all rewards within 6-8 months of campaign completion."
        },
        {
          question: "What if the project doesn't reach its goal?",
          answer: "If we don't reach our funding goal, all pledges will be refunded automatically."
        },
        {
          question: "Can I change my pledge amount?",
          answer: "Yes, you can modify your pledge amount up until the campaign ends."
        }
      ],
      risks: [
        "Production delays due to supply chain issues",
        "Regulatory changes affecting our industry",
        "Unexpected technical challenges during development"
      ],
      timeline: [
        { month: "Month 1", activity: "Finalize design and engineering" },
        { month: "Month 2-3", activity: "Begin production and quality testing" },
        { month: "Month 4-5", activity: "Manufacturing and assembly" },
        { month: "Month 6", activity: "Quality control and packaging" },
        { month: "Month 7-8", activity: "Shipping and delivery" }
      ],
      team: [
        { name: project.creator, role: "Founder & CEO", avatar: project.creatorAvatar },
        { name: "Alex Chen", role: "CTO", avatar: "/placeholder.svg?height=40&width=40&query=alex-chen" },
        { name: "Sarah Kim", role: "Head of Design", avatar: "/placeholder.svg?height=40&width=40&query=sarah-kim" }
      ],
      liveStats: {
        currentBackers: project.backers + Math.floor(Math.random() * 50),
        currentRaised: project.raised + Math.floor(Math.random() * 10000),
        hourlyBackers: Math.floor(Math.random() * 10),
        trendingScore: Math.floor(Math.random() * 100)
      }
    }))
    setEnhancedProjects(enhanced)
  }, [isClient])

  // Live funding updates simulation (client-side only)
  useEffect(() => {
    if (liveFunding && typeof window !== 'undefined') {
      const interval = setInterval(() => {
        setFundingUpdates(prev => [
          {
            id: Date.now(),
            projectId: Math.floor(Math.random() * projects.length) + 1,
            type: "pledge",
            amount: Math.floor(Math.random() * 500) + 25,
            backer: `Backer ${Math.floor(Math.random() * 1000)}`,
            time: new Date().toLocaleTimeString()
          },
          ...prev.slice(0, 4)
        ])
      }, 3000)

      return () => clearInterval(interval)
    }
    return undefined
  }, [liveFunding, projects.length])

  // Generate recommended projects (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined' && enhancedProjects.length > 0) {
      const recommendations = enhancedProjects
        .filter(p => p.trending || p.featured)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
      setRecommendedProjects(recommendations)
    }
  }, [enhancedProjects])

  // Enhanced filtering and sorting logic
  const filteredProjects = enhancedProjects.filter(project => {
    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (project.tags || []).some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    let matchesFilter = true
    if (filterBy === "trending") matchesFilter = project.trending
    if (filterBy === "featured") matchesFilter = project.featured
    if (filterBy === "ending-soon") matchesFilter = project.daysLeft <= 7
    if (filterBy === "highly-funded") matchesFilter = (project.raised / project.goal) >= 0.8
    
    const matchesPriceRange = project.goal >= (priceRange[0] || 0) && project.goal <= (priceRange[1] || 100000)
    
    return matchesCategory && matchesSearch && matchesFilter && matchesPriceRange
  })

  // Enhanced sorting
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case "trending":
        return (b.trending ? 1 : 0) - (a.trending ? 1 : 0) || (b.liveStats?.trendingScore || 0) - (a.liveStats?.trendingScore || 0)
      case "newest":
        return b.id - a.id
      case "ending-soon":
        return a.daysLeft - b.daysLeft
      case "most-funded":
        return (b.liveStats?.currentRaised || b.raised) - (a.liveStats?.currentRaised || a.raised)
      case "most-backers":
        return (b.liveStats?.currentBackers || b.backers) - (a.liveStats?.currentBackers || a.backers)
      case "goal-low":
        return a.goal - b.goal
      case "goal-high":
        return b.goal - a.goal
      default:
        return 0
    }
  })

  const displayedProjects = sortedProjects.slice(0, displayedCount)

  // Handler functions
  const handleProjectClick = (project: any) => {
    setSelectedProject(project)
    setShowProjectModal(true)
  }

  const handleBookmark = (projectId: number) => {
    setBookmarkedProjects(prev => 
      prev.includes(projectId) 
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    )
  }

  const handleLike = (projectId: number) => {
    setLikedProjects(prev => 
      prev.includes(projectId) 
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    )
  }

  const handleShare = async (project: any) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: project.title,
          text: project.description,
          url: window.location.href
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      navigator.clipboard.writeText(`${project.title} - ${window.location.href}`)
      console.log("Project link copied to clipboard!")
    }
  }

  const handleVideoPlay = (project: any) => {
    setSelectedVideo(project.video)
    setShowVideoModal(true)
  }

  const handlePledgeSelect = (project: any, rewardIndex: number) => {
    setSelectedProject(project)
    setSelectedReward(rewardIndex)
    setShowPledgeModal(true)
  }

  const handleCreatorClick = (creator: any) => {
    setSelectedCreator(creator)
    setShowCreatorProfile(true)
  }

  const handleFollowCreator = (creatorId: number) => {
    setFollowedCreators(prev => 
      prev.includes(creatorId) 
        ? prev.filter(id => id !== creatorId)
        : [...prev, creatorId]
    )
  }

  const handleLiveFundingToggle = () => {
    setLiveFunding(!liveFunding)
    if (!liveFunding) {
      console.log("Live funding updates enabled!")
    }
  }

  const handleAnalyticsToggle = () => {
    setShowAnalytics(!showAnalytics)
  }

  const handleFundingCalculatorToggle = () => {
    setShowFundingCalculator(!showFundingCalculator)
  }

  const handleGalleryOpen = (project: any) => {
    setSelectedProject(project)
    setShowProjectGallery(true)
    setSelectedGalleryImage(0)
  }

  // Helper functions for comprehensive form
  const addTag = () => {
    if (currentTag.trim() && !newProject.tags.includes(currentTag.trim())) {
      setNewProject({ ...newProject, tags: [...newProject.tags, currentTag.trim()] })
      setCurrentTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setNewProject({ ...newProject, tags: newProject.tags.filter(tag => tag !== tagToRemove) })
  }

  const addReward = () => {
    if (currentReward.amount > 0 && currentReward.title && currentReward.description) {
      setNewProject({ ...newProject, rewards: [...newProject.rewards, currentReward] })
      setCurrentReward({ amount: 0, title: '', description: '' })
    }
  }

  const removeReward = (index: number) => {
    setNewProject({ ...newProject, rewards: newProject.rewards.filter((_, i) => i !== index) })
  }

  const addTeamMember = () => {
    if (currentTeamMember.name && currentTeamMember.role) {
      setNewProject({ ...newProject, team: [...newProject.team, currentTeamMember] })
      setCurrentTeamMember({ name: '', role: '', bio: '', avatar: '' })
    }
  }

  const removeTeamMember = (index: number) => {
    setNewProject({ ...newProject, team: newProject.team.filter((_, i) => i !== index) })
  }

  const addFAQ = () => {
    if (currentFAQ.question && currentFAQ.answer) {
      setNewProject({ ...newProject, faq: [...newProject.faq, currentFAQ] })
      setCurrentFAQ({ question: '', answer: '' })
    }
  }

  const removeFAQ = (index: number) => {
    setNewProject({ ...newProject, faq: newProject.faq.filter((_, i) => i !== index) })
  }

  const addStretchGoal = () => {
    if (currentStretchGoal.amount > 0 && currentStretchGoal.title) {
      setNewProject({ ...newProject, stretchGoals: [...newProject.stretchGoals, currentStretchGoal] })
      setCurrentStretchGoal({ amount: 0, title: '', description: '' })
    }
  }

  const removeStretchGoal = (index: number) => {
    setNewProject({ ...newProject, stretchGoals: newProject.stretchGoals.filter((_, i) => i !== index) })
  }

  const addPerk = () => {
    if (currentPerk.amount > 0 && currentPerk.title) {
      setNewProject({ ...newProject, perks: [...newProject.perks, currentPerk] })
      setCurrentPerk({ amount: 0, title: '', description: '', limited: false, limit: 0 })
    }
  }

  const removePerk = (index: number) => {
    setNewProject({ ...newProject, perks: newProject.perks.filter((_, i) => i !== index) })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setUploadedImages(prev => [...prev, ...files])
  }

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setUploadedVideos(prev => [...prev, ...files])
  }

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setUploadedDocuments(prev => [...prev, ...files])
  }

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index))
  }

  const removeVideo = (index: number) => {
    setUploadedVideos(prev => prev.filter((_, i) => i !== index))
  }

  const removeDocument = (index: number) => {
    setUploadedDocuments(prev => prev.filter((_, i) => i !== index))
  }

  const nextStep = () => {
    if (createProjectStep < 6) {
      setCreateProjectStep(createProjectStep + 1)
    }
  }

  const prevStep = () => {
    if (createProjectStep > 1) {
      setCreateProjectStep(createProjectStep - 1)
    }
  }

  const handleCreateProject = () => {
    if (newProject.title && newProject.description && newProject.goal > 0) {
      const project = {
        ...newProject,
        id: projects.length + 1,
        raised: 0,
        backers: 0,
        daysLeft: 30,
        featured: false,
        trending: false,
        verified: false,
        updates: 0,
        comments: 0,
        socialProof: "New Project"
      }
      
      // Add to projects array (in a real app, this would be an API call)
      console.log("Project created successfully!")
      
      setShowCreateProjectModal(false)
      setCreateProjectStep(1)
      setNewProject({
        title: '',
        description: '',
        category: 'technology',
        goal: 0,
        image: '',
        creator: 'You',
        creatorAvatar: '/placeholder.svg?height=40&width=40&query=user',
        tags: [],
        location: '',
        rewards: [],
        shortDescription: '',
        story: '',
        risks: '',
        timeline: '',
        team: [],
        images: [],
        videos: [],
        faq: [],
        updates: [],
        socialLinks: {
          website: '',
          twitter: '',
          facebook: '',
          instagram: '',
          linkedin: ''
        },
        contactEmail: '',
        phone: '',
        businessPlan: '',
        marketResearch: '',
        financialProjections: '',
        legalDocuments: [],
        campaignDuration: 30,
        launchDate: '',
        endDate: '',
        minimumPledge: 1,
        currency: 'USD',
        shippingInfo: '',
        returnPolicy: '',
        estimatedDelivery: '',
        stretchGoals: [],
        perks: [],
        earlyBird: false,
        earlyBirdDiscount: 0,
        referralProgram: false,
        referralReward: 0
      })
      setUploadedImages([])
      setUploadedVideos([])
      setUploadedDocuments([])
    } else {
      console.log("Please fill in all required fields")
    }
  }

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Enhanced Header */}
      <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-[#0F7377] to-[#00A884] rounded-xl flex items-center justify-center shadow-lg">
                <Rocket className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-[#0F7377] to-[#00A884] bg-clip-text text-transparent">
                  GrowthStarter
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 hidden sm:block">
                  Launch your startup with crowdfunding support
                </p>
              </div>
            </div>
            
            {/* Desktop Action Buttons */}
            <div className="hidden sm:flex items-center gap-2">
              {/* Live Funding Toggle */}
              <Button 
                onClick={handleLiveFundingToggle}
                variant="outline"
                size="sm"
                className={`relative ${
                  liveFunding 
                    ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                title="Toggle Live Updates"
              >
                <Activity className="h-4 w-4" />
                {liveFunding && <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />}
              </Button>

              {/* Analytics Toggle */}
              <Button
                onClick={handleAnalyticsToggle}
                variant="outline"
                size="sm"
                className={`${
                  showAnalytics 
                    ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                title="Platform Analytics"
              >
                <BarChart3 className="h-4 w-4" />
              </Button>

              {/* Funding Calculator */}
              <Button
                onClick={handleFundingCalculatorToggle}
                variant="outline"
                size="sm"
                className="hover:bg-gray-100 dark:hover:bg-gray-800"
                title="Funding Calculator"
              >
                <Calculator className="h-4 w-4" />
              </Button>

              {/* Create Project Button */}
              <Button 
                onClick={() => setShowCreateProjectModal(true)}
                size="sm"
                className="bg-gradient-to-r from-[#0F7377] to-[#00A884] hover:from-[#0F7377]/90 hover:to-[#00A884]/90 text-white shadow-md hover:shadow-lg transition-all duration-200"
                title="Create New Project"
              >
                <Plus className="h-4 w-4 mr-1" />
                Create Project
              </Button>
            </div>

            {/* Mobile Action Buttons */}
            <div className="flex sm:hidden items-center gap-1">
              <Button 
                onClick={handleLiveFundingToggle}
                variant="outline"
                size="sm"
                className={`p-2 ${
                  liveFunding 
                    ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                title="Live Updates"
              >
                <Activity className="h-4 w-4" />
                {liveFunding && <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />}
              </Button>

              <Button 
                onClick={() => setShowCreateProjectModal(true)}
                size="sm"
                className="bg-gradient-to-r from-[#0F7377] to-[#00A884] hover:from-[#0F7377]/90 hover:to-[#00A884]/90 text-white shadow-md hover:shadow-lg transition-all duration-200 px-3"
                title="Create Project"
              >
                <Plus className="h-4 w-4 sm:mr-1" />
                <span className="hidden xs:inline">Create</span>
              </Button>
            </div>
          </div>
        </div>
      </div>


      {/* Live Funding Updates Banner */}
      {liveFunding && fundingUpdates.length > 0 && (
        <div className="fixed top-16 left-4 right-4 z-40 bg-green-500 text-white p-3 rounded-lg shadow-lg animate-in slide-in-from-top-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="font-medium">Live Funding Activity</span>
            </div>
            <div className="text-sm">
              {fundingUpdates[0]?.backer || 'Someone'} just pledged ${fundingUpdates[0]?.amount || 0}!
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-1 w-full">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search projects, creators, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rounded-xl border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#0F7377]/20 h-10"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-1">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full sm:w-48 rounded-xl border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#0F7377]/20 h-10">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="food">Food & Beverage</SelectItem>
                  <SelectItem value="creative">Creative</SelectItem>
                  <SelectItem value="health">Health & Fitness</SelectItem>
                </SelectContent>
              </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-48 rounded-xl border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-[#0F7377]/20 h-10">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="trending">Trending</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="ending-soon">Ending Soon</SelectItem>
                    <SelectItem value="most-funded">Most Funded</SelectItem>
                    <SelectItem value="most-backers">Most Backers</SelectItem>
                    <SelectItem value="goal-low">Goal: Low to High</SelectItem>
                    <SelectItem value="goal-high">Goal: High to Low</SelectItem>
                </SelectContent>
              </Select>
              </div>
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
              <Button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                variant="outline"
                className="rounded-xl border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 h-10 px-3 sm:px-4"
              >
                <Filter className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Advanced</span>
                <span className="xs:hidden">Filter</span>
                {showAdvancedFilters ? <ChevronUp className="h-4 w-4 ml-1 sm:ml-2" /> : <ChevronDown className="h-4 w-4 ml-1 sm:ml-2" />}
              </Button>
              
              <div className="flex items-center gap-1">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                  className={`rounded-xl h-9 w-9 p-0 ${viewMode === "grid" ? "bg-[#0F7377] hover:bg-[#0F7377]/90" : ""}`}
                  title="Grid View"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                  className={`rounded-xl h-9 w-9 p-0 ${viewMode === "list" ? "bg-[#0F7377] hover:bg-[#0F7377]/90" : ""}`}
                  title="List View"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <div className="mt-6 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Filter by</label>
                  <Select value={filterBy} onValueChange={setFilterBy}>
                    <SelectTrigger className="rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Projects</SelectItem>
                      <SelectItem value="trending">Trending</SelectItem>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="ending-soon">Ending Soon</SelectItem>
                      <SelectItem value="highly-funded">Highly Funded</SelectItem>
                    </SelectContent>
                  </Select>
        </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Goal Range</label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={priceRange[0] || 0}
                      onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1] || 100000])}
                      className="rounded-lg"
                    />
                    <span className="text-gray-500">to</span>
                    <Input
                      type="number"
                      placeholder="Max"
                      value={priceRange[1] || 100000}
                      onChange={(e) => setPriceRange([priceRange[0] || 0, parseInt(e.target.value) || 100000])}
                      className="rounded-lg"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quick Filters</label>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={showTrending ? "default" : "outline"}
                      size="sm"
                      onClick={() => setShowTrending(!showTrending)}
                      className="rounded-lg text-xs"
                    >
                      <Flame className="h-3 w-3 mr-1" />
                      Trending
                    </Button>
                    <Button
                      variant={showFeatured ? "default" : "outline"}
                      size="sm"
                      onClick={() => setShowFeatured(!showFeatured)}
                      className="rounded-lg text-xs"
                    >
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </Button>
                    <Button
                      variant={showEndingSoon ? "default" : "outline"}
                      size="sm"
                      onClick={() => setShowEndingSoon(!showEndingSoon)}
                      className="rounded-lg text-xs"
                    >
                      <Clock className="h-3 w-3 mr-1" />
                      Ending Soon
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-end">
                  <Button
                    onClick={() => {
                      setFilterBy("all")
                      setPriceRange([0, 100000])
                      setShowTrending(true)
                      setShowFeatured(true)
                      setShowEndingSoon(false)
                    }}
                    variant="outline"
                    className="rounded-lg"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Clear All
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Projects Grid */}
        <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" : "space-y-4"}>
          {displayedProjects.map((project) => (
            <Card key={project.id} className={`group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg rounded-2xl overflow-hidden cursor-pointer ${
              viewMode === "list" ? "flex flex-col sm:flex-row" : ""
            }`} onClick={() => handleProjectClick(project)}>
              <div className={`relative ${viewMode === "list" ? "sm:w-64 sm:flex-shrink-0" : ""}`}>
                <Image
                  src={project.image}
                  alt={project.title}
                  width={400}
                  height={200}
                  className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                    viewMode === "list" ? "w-full h-48 sm:w-64 sm:h-48" : "w-full h-48 sm:h-52"
                  }`}
                />
                
                {/* Status Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                {project.featured && (
                    <Badge className="bg-gradient-to-r from-[#0F7377] to-[#00A884] text-white shadow-lg">
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
                  {project.trending && (
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg">
                      <Flame className="h-3 w-3 mr-1" />
                      Trending
                    </Badge>
                  )}
                </div>
                
                {/* Action Buttons */}
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                {project.verified && (
                    <div className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg">
                      <ShieldCheck className="h-4 w-4 text-green-500" />
                  </div>
                )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleBookmark(project.id)
                    }}
                    className={`p-2 rounded-full shadow-lg transition-colors ${
                      bookmarkedProjects.includes(project.id)
                        ? 'bg-[#0F7377] text-white'
                        : 'bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 hover:bg-[#0F7377] hover:text-white'
                    }`}
                  >
                    <Bookmark className="h-4 w-4" />
                  </button>
              </div>
              
                {/* Video Play Button */}
                {project.video && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleVideoPlay(project)
                    }}
                    className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-all duration-300 group"
                  >
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Play className="h-8 w-8 text-[#0F7377]" />
                    </div>
                  </button>
                )}

                {/* Live Stats Indicator */}
                {liveFunding && (
                  <div className="absolute top-3 left-3 flex items-center gap-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium animate-pulse">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    LIVE
                  </div>
                )}

                {/* Progress Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <div className="text-white">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-semibold">${project.liveStats?.currentRaised?.toLocaleString() || project.raised.toLocaleString()}</span>
                      <span className="font-semibold">{Math.round(((project.liveStats?.currentRaised || project.raised) / project.goal) * 100)}%</span>
                    </div>
                    <Progress 
                      value={((project.liveStats?.currentRaised || project.raised) / project.goal) * 100} 
                      className="h-2 bg-white/20"
                    />
                    {liveFunding && project.liveStats && (
                      <div className="flex justify-between text-xs mt-1 text-green-300">
                        <span>+{project.liveStats.hourlyBackers || 0} backers/hour</span>
                        <span>Trending: {project.liveStats.trendingScore || 0}%</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <CardHeader className={`pb-3 ${viewMode === "list" ? "sm:flex-1" : ""}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white group-hover:text-[#0F7377] transition-colors line-clamp-2">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                      {project.description}
                    </CardDescription>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-3 gap-2">
                  <div className="flex items-center gap-2">
                  <Avatar className="h-5 w-5 sm:h-6 sm:w-6">
                    <AvatarImage src={project.creatorAvatar} alt={project.creator} />
                    <AvatarFallback className="text-xs">{project.creator[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    by {project.creator}
                  </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin className="h-3 w-3" />
                    <span className="truncate">{project.location}</span>
                  </div>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {project.tags.slice(0, viewMode === "list" ? 4 : 3).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs px-2 py-1">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              
              <CardContent className={`pt-0 ${viewMode === "list" ? "sm:flex-1" : ""}`}>
                <div className="space-y-3 sm:space-y-4">
                  {/* Enhanced Stats */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                  <div>
                      <div className="text-sm sm:text-lg font-bold text-[#0F7377] dark:text-[#00A884]">
                        {Math.round(((project.liveStats?.currentRaised || project.raised) / project.goal) * 100)}%
                    </div>
                      <div className="text-xs text-gray-500">Funded</div>
                      {liveFunding && project.liveStats && (
                        <div className="text-xs text-green-500 animate-pulse">
                          +{Math.round(((project.liveStats.currentRaised || project.raised) - project.raised) / 1000)}k today
                    </div>
                      )}
                  </div>
                    <div>
                      <div className="text-sm sm:text-lg font-bold text-gray-900 dark:text-white">
                        {project.liveStats?.currentBackers || project.backers}
                    </div>
                      <div className="text-xs text-gray-500">Backers</div>
                      {liveFunding && project.liveStats && (
                        <div className="text-xs text-green-500 animate-pulse">
                          +{project.liveStats.hourlyBackers || 0}/hr
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="text-sm sm:text-lg font-bold text-gray-900 dark:text-white">
                        {project.daysLeft}
                      </div>
                      <div className="text-xs text-gray-500">Days Left</div>
                      {project.daysLeft <= 7 && (
                        <div className="text-xs text-red-500 animate-pulse">
                          Ending Soon!
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Social Proof */}
                  <div className="text-xs text-gray-500 italic line-clamp-1">
                    {project.socialProof}
                  </div>
                  
                  {/* Enhanced Actions */}
                  <div className="flex flex-col sm:flex-row gap-2 pt-2">
                    <Button 
                      className="flex-1 bg-gradient-to-r from-[#0F7377] to-[#00A884] hover:from-[#0F7377]/90 hover:to-[#00A884]/90 text-white shadow-lg hover:shadow-xl transition-all duration-200 h-9 sm:h-10"
                      onClick={(e) => {
                        e.stopPropagation()
                        console.log("Project backed successfully!")
                      }}
                    >
                      <Heart className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      <span className="text-xs sm:text-sm">Back Project</span>
                    </Button>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleLike(project.id)
                        }}
                        className={`h-9 w-9 p-0 ${
                          likedProjects.includes(project.id)
                            ? 'bg-red-50 border-red-200 text-red-600'
                            : ''
                        }`}
                        title="Like"
                      >
                        <ThumbsUp className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleShare(project)
                        }}
                        className="h-9 w-9 p-0"
                        title="Share"
                      >
                        <Share2 className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Load More */}
        {displayedCount < sortedProjects.length && (
          <div className="text-center mt-8 sm:mt-12">
            <Button 
              variant="outline"
              onClick={() => setDisplayedCount(prev => prev + 6)}
              className="border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377]/10 rounded-xl px-4 sm:px-8 py-3 h-10 sm:h-11"
            >
              <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="text-xs sm:text-sm">
                Load More ({sortedProjects.length - displayedCount} remaining)
              </span>
            </Button>
          </div>
        )}

        {/* Enhanced Empty State */}
        {sortedProjects.length === 0 && (
          <div className="text-center py-12 sm:py-16 px-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-[#0F7377] to-[#00A884] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Search className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
              No projects found
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 max-w-md mx-auto">
              Try adjusting your search criteria, filters, or browse all categories to discover amazing projects
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
                  setFilterBy("all")
                  setPriceRange([0, 100000])
              }}
                className="bg-gradient-to-r from-[#0F7377] to-[#00A884] hover:from-[#0F7377]/90 hover:to-[#00A884]/90 text-white rounded-xl px-4 sm:px-6 py-3 h-10 sm:h-11"
            >
              <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="text-xs sm:text-sm">Reset All Filters</span>
              </Button>
              <Button 
                onClick={() => setShowCreateProject(true)}
                variant="outline"
                className="border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377]/10 rounded-xl px-4 sm:px-6 py-3 h-10 sm:h-11"
              >
                <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="text-xs sm:text-sm">Create Your Project</span>
            </Button>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Project Detail Modal */}
      {showProjectModal && selectedProject && (
        <EnhancedProjectDetailModal
          project={selectedProject}
          isOpen={showProjectModal}
          onClose={() => setShowProjectModal(false)}
          onBackProject={(project, rewardIndex) => handlePledgeSelect(project, rewardIndex)}
          onShare={handleShare}
          onBookmark={handleBookmark}
          onLike={handleLike}
          isBookmarked={bookmarkedProjects.includes(selectedProject.id)}
          isLiked={likedProjects.includes(selectedProject.id)}
        />
      )}

      {/* Video Modal */}
      {showVideoModal && selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="aspect-video bg-gray-900 flex items-center justify-center">
              <div className="text-center text-white">
                <Play className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Video Preview</p>
                <p className="text-sm opacity-75">Click to play project video</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pledge Modal */}
      {showPledgeModal && selectedProject && selectedReward !== null && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Pledge to {selectedProject.title}</h3>
              <button
                onClick={() => setShowPledgeModal(false)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="font-semibold text-gray-900 dark:text-white">
                  ${selectedProject.rewards[selectedReward].amount} - {selectedProject.rewards[selectedReward].title}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {selectedProject.rewards[selectedReward].description}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Pledge Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={pledgeAmount}
                    onChange={(e) => setPledgeAmount(e.target.value)}
                    placeholder={selectedProject.rewards[selectedReward].amount.toString()}
                    className="w-full pl-8 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0F7377]/20"
                  />
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button
                  onClick={() => {
                    console.log("Pledge successful! Thank you for your support.")
                    setShowPledgeModal(false)
                  }}
                  className="flex-1 bg-[#0F7377] hover:bg-[#0F7377]/90 text-white"
                >
                  Confirm Pledge
                </Button>
                <Button
                  onClick={() => setShowPledgeModal(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Dashboard */}
      {showAnalytics && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Platform Analytics</h3>
                <button
                  onClick={() => setShowAnalytics(false)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="text-2xl font-bold text-[#0F7377] dark:text-[#00A884]">$2.4M</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Raised</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">1,247</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Active Projects</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">89%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Success Rate</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">Top Categories</h4>
                <div className="space-y-2">
                  {[
                    { name: "Technology", percentage: 45, color: "bg-blue-500" },
                    { name: "Creative", percentage: 25, color: "bg-purple-500" },
                    { name: "Health", percentage: 20, color: "bg-green-500" },
                    { name: "Food", percentage: 10, color: "bg-orange-500" }
                  ].map((category, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{category.name}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${category.color}`}
                            style={{ width: `${category.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{category.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Funding Calculator */}
      {showFundingCalculator && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Funding Calculator</h3>
              <button
                onClick={() => setShowFundingCalculator(false)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Project Goal
                </label>
                <input
                  type="number"
                  placeholder="50000"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0F7377]/20"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Campaign Duration (days)
                </label>
                <input
                  type="number"
                  placeholder="30"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0F7377]/20"
                />
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Projections</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Daily target:</span>
                    <span className="font-medium">$1,667</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Backers needed:</span>
                    <span className="font-medium">~167</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Success probability:</span>
                    <span className="font-medium text-green-600">78%</span>
                  </div>
                </div>
              </div>
              
              <Button
                onClick={() => setShowFundingCalculator(false)}
                className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90 text-white"
              >
                Calculate
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Comprehensive Create Project Modal */}
      <ComprehensiveCreateProjectModal
        isOpen={showCreateProjectModal}
        onClose={() => setShowCreateProjectModal(false)}
        onCreateProject={(projectData) => {
          const project = {
            ...projectData,
            id: projects.length + 1,
            raised: 0,
            backers: 0,
            daysLeft: projectData.campaignDuration,
            featured: false,
            trending: false,
            verified: false,
            updates: 0,
            comments: 0,
            socialProof: "Under Review",
            status: "pending_review" // Projects now go to pending review status
          }
          
          // Add to projects array (in a real app, this would be an API call)
          console.log("Project submitted for review! Our team will review it within 24-48 hours.")
          
          setShowCreateProjectModal(false)
        }}
      />
    </div>
  )
}