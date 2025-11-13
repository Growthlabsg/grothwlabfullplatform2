"use client"

import * as React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  ArrowRight,
  Heart,
  Share2,
  Clock,
  MapPin,
  Play,
  Bookmark,
  ShieldCheck,
  TrendingUp,
  Star,
  Users,
  DollarSign,
  Calendar,
  Globe,
  MessageCircle,
  ThumbsUp,
  MoreHorizontal,
  X,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Info,
  Target,
  Award,
  Zap,
  Eye,
  BarChart3,
  TrendingDown,
  ArrowUp,
  ArrowDown,
  Flame,
  Rocket,
  Gift,
  Truck,
  Shield,
  CreditCard,
  Lock,
  Bell,
  Mail,
  Phone,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Youtube,
  Github,
  Link as LinkIcon
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface EnhancedProject {
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
  // Enhanced fields
  shortDescription?: string
  story?: string
  risks?: string
  timeline?: string
  team?: Array<{ name: string; role: string; bio: string; avatar: string }>
  images?: string[]
  videos?: string[]
  faq?: Array<{ question: string; answer: string }>
  updates?: Array<{ title: string; content: string; date: string }>
  socialLinks?: {
    website: string
    twitter: string
    facebook: string
    instagram: string
    linkedin: string
  }
  contactEmail?: string
  phone?: string
  businessPlan?: string
  marketResearch?: string
  financialProjections?: string
  legalDocuments?: string[]
  campaignDuration?: number
  launchDate?: string
  endDate?: string
  minimumPledge?: number
  currency?: string
  shippingInfo?: string
  returnPolicy?: string
  estimatedDelivery?: string
  stretchGoals?: Array<{ amount: number; title: string; description: string }>
  perks?: Array<{ amount: number; title: string; description: string; limited: boolean; limit: number }>
  earlyBird?: boolean
  earlyBirdDiscount?: number
  referralProgram?: boolean
  referralReward?: number
}

interface EnhancedProjectDetailModalProps {
  project: EnhancedProject
  isOpen: boolean
  onClose: () => void
  onBackProject: (project: EnhancedProject, rewardIndex: number) => void
  onShare: (project: EnhancedProject) => void
  onBookmark: (projectId: number) => void
  onLike: (projectId: number) => void
  isBookmarked: boolean
  isLiked: boolean
}

export function EnhancedProjectDetailModal({
  project,
  isOpen,
  onClose,
  onBackProject,
  onShare,
  onBookmark,
  onLike,
  isBookmarked,
  isLiked
}: EnhancedProjectDetailModalProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [selectedReward, setSelectedReward] = useState<number | null>(null)
  const [showPledgeModal, setShowPledgeModal] = useState(false)
  const [pledgeAmount, setPledgeAmount] = useState("")
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [showGallery, setShowGallery] = useState(false)
  const [selectedGalleryImage, setSelectedGalleryImage] = useState(0)
  const [showFAQ, setShowFAQ] = useState(false)
  const [showRisks, setShowRisks] = useState(false)
  const [showTimeline, setShowTimeline] = useState(false)
  const [showTeam, setShowTeam] = useState(false)
  const [showUpdates, setShowUpdates] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [showStretchGoals, setShowStretchGoals] = useState(false)
  const [showPerks, setShowPerks] = useState(false)
  const [showSocialProof, setShowSocialProof] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [showShipping, setShowShipping] = useState(false)
  const [showLegal, setShowLegal] = useState(false)
  const [showBackerList, setShowBackerList] = useState(false)
  const [showCreatorProfile, setShowCreatorProfile] = useState(false)
  const [showSimilarProjects, setShowSimilarProjects] = useState(false)
  const [showReport, setShowReport] = useState(false)
  const [showShareOptions, setShowShareOptions] = useState(false)
  const [showFullStory, setShowFullStory] = useState(false)
  const [showFullRisks, setShowFullRisks] = useState(false)
  const [showFullTimeline, setShowFullTimeline] = useState(false)
  const [showFullTeam, setShowFullTeam] = useState(false)
  const [showFullFAQ, setShowFullFAQ] = useState(false)
  const [showFullUpdates, setShowFullUpdates] = useState(false)
  const [showFullComments, setShowFullComments] = useState(false)
  const [showFullStretchGoals, setShowFullStretchGoals] = useState(false)
  const [showFullPerks, setShowFullPerks] = useState(false)
  const [showFullSocialProof, setShowFullSocialProof] = useState(false)
  const [showFullAnalytics, setShowFullAnalytics] = useState(false)
  const [showFullShipping, setShowFullShipping] = useState(false)
  const [showFullLegal, setShowFullLegal] = useState(false)
  const [showFullBackerList, setShowFullBackerList] = useState(false)
  const [showFullCreatorProfile, setShowFullCreatorProfile] = useState(false)
  const [showFullSimilarProjects, setShowFullSimilarProjects] = useState(false)
  const [showFullReport, setShowFullReport] = useState(false)
  const [showFullShareOptions, setShowFullShareOptions] = useState(false)

  if (!isOpen) return null

  const fundingPercentage = Math.round((project.raised / project.goal) * 100)
  const daysLeft = project.daysLeft
  const isUrgent = daysLeft <= 7
  const isFullyFunded = fundingPercentage >= 100

  const handleRewardSelect = (rewardIndex: number) => {
    setSelectedReward(rewardIndex)
    setShowPledgeModal(true)
  }

  const handlePledge = () => {
    if (selectedReward !== null) {
      onBackProject(project, selectedReward)
      setShowPledgeModal(false)
      setPledgeAmount("")
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Enhanced Header Navigation */}
        <div className="sticky top-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <ArrowRight className="h-5 w-5 text-gray-600 dark:text-gray-300 rotate-180" />
                </button>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#0F7377] to-[#00A884] rounded-lg flex items-center justify-center">
                    <Rocket className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-white">GrowthStarter</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => onShare(project)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <Share2 className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </button>
                <button 
                  onClick={() => onBookmark(project.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    isBookmarked 
                      ? 'bg-[#0F7377] text-white' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  <Bookmark className="h-5 w-5" />
                </button>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  <MoreHorizontal className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section with Enhanced Design */}
        <div className="relative">
          <div className="relative h-96 md:h-[600px] overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              width={1400}
              height={600}
              className="w-full h-full object-cover"
            />
            
            {/* Enhanced Overlay with Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            
            {/* Project Status Badges */}
            <div className="absolute top-6 left-6 flex flex-col gap-2">
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
              {project.verified && (
                <div className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  <ShieldCheck className="h-4 w-4" />
                  Verified
                </div>
              )}
            </div>

            {/* Video Play Button */}
            {project.video && (
              <button
                onClick={() => setShowVideoModal(true)}
                className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-all duration-300 group"
              >
                <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                  <Play className="h-10 w-10 text-[#0F7377] ml-1" />
                </div>
              </button>
            )}

            {/* Gallery Button */}
            {project.gallery && project.gallery.length > 1 && (
              <button
                onClick={() => setShowGallery(true)}
                className="absolute top-6 right-6 bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white px-4 py-2 rounded-lg shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
              >
                <Eye className="h-4 w-4" />
                View Gallery ({project.gallery.length})
              </button>
            )}
          </div>
          
          {/* Enhanced Project Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Avatar className="h-12 w-12 border-2 border-white">
                    <AvatarImage src={project.creatorAvatar} alt={project.creator} />
                    <AvatarFallback className="text-lg font-bold">{project.creator[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-white font-semibold text-lg">by {project.creator}</div>
                    <div className="text-white/80 text-sm">{project.location}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-white/80">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{project.daysLeft} days left</span>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                {project.title}
              </h1>
              
              <p className="text-xl text-white/90 mb-6 max-w-3xl leading-relaxed">
                {project.shortDescription || project.description}
              </p>

              {/* Enhanced Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-3xl font-bold text-white">
                    ${project.raised.toLocaleString()}
                  </div>
                  <div className="text-white/80 text-sm">
                    raised of ${project.goal.toLocaleString()} goal
                  </div>
                  <div className="text-white/60 text-xs mt-1">
                    {fundingPercentage}% funded
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-3xl font-bold text-white">
                    {project.backers.toLocaleString()}
                  </div>
                  <div className="text-white/80 text-sm">backers</div>
                  {project.liveStats && (
                    <div className="text-green-300 text-xs mt-1 animate-pulse">
                      +{project.liveStats.hourlyBackers || 0} this hour
                    </div>
                  )}
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-3xl font-bold text-white">
                    {project.daysLeft}
                  </div>
                  <div className="text-white/80 text-sm">days left</div>
                  {isUrgent && (
                    <div className="text-red-300 text-xs mt-1 animate-pulse">
                      Ending Soon!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Project Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Enhanced Tabs Navigation */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-8 overflow-x-auto">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="story">Story</TabsTrigger>
                  <TabsTrigger value="updates">Updates</TabsTrigger>
                  <TabsTrigger value="faq">FAQ</TabsTrigger>
                  <TabsTrigger value="risks">Risks</TabsTrigger>
                  <TabsTrigger value="comments">Comments</TabsTrigger>
                  <TabsTrigger value="backers">Backers</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-8">
                  {/* Project Description */}
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">About this project</h2>
                    <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
                      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                        {project.description}
                      </p>
                      
                      {/* Extended Project Details */}
                      <div className="space-y-8">
                        <div>
                          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">The Problem</h3>
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            Traditional solutions in this space are outdated and inefficient. We've identified key pain points that our innovative approach directly addresses, creating a more sustainable and effective solution for users worldwide.
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Our Solution</h3>
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            Our cutting-edge technology combines the latest innovations with user-friendly design, creating a product that not only meets current needs but anticipates future requirements. We've spent months researching and developing this solution.
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">How It Works</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                              <div className="w-16 h-16 bg-[#0F7377] rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-white font-bold text-xl">1</span>
                              </div>
                              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Order</h4>
                              <p className="text-gray-600 dark:text-gray-400">Choose your reward tier and place your order</p>
                            </div>
                            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                              <div className="w-16 h-16 bg-[#0F7377] rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-white font-bold text-xl">2</span>
                              </div>
                              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Production</h4>
                              <p className="text-gray-600 dark:text-gray-400">We manufacture your product with care</p>
                            </div>
                            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                              <div className="w-16 h-16 bg-[#0F7377] rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-white font-bold text-xl">3</span>
                              </div>
                              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Delivery</h4>
                              <p className="text-gray-600 dark:text-gray-400">Receive your product and enjoy!</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Project Gallery */}
                  {project.gallery && project.gallery.length > 0 && (
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Project Gallery</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {project.gallery.slice(0, 6).map((image, index) => (
                          <div key={index} className="aspect-square rounded-lg overflow-hidden cursor-pointer group">
                            <Image
                              src={image}
                              alt={`${project.title} gallery ${index + 1}`}
                              width={300}
                              height={300}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Team Section */}
                  {project.team && project.team.length > 0 && (
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Meet the Team</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {project.team.map((member, index) => (
                          <div key={index} className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                            <Avatar className="h-20 w-20 mx-auto mb-4">
                              <AvatarImage src={member.avatar} alt={member.name} />
                              <AvatarFallback className="text-2xl">{member.name[0]}</AvatarFallback>
                            </Avatar>
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{member.name}</h4>
                            <p className="text-[#0F7377] dark:text-[#00A884] font-medium mb-2">{member.role}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{member.bio}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Stretch Goals */}
                  {project.stretchGoals && project.stretchGoals.length > 0 && (
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Stretch Goals</h3>
                      <div className="space-y-4">
                        {project.stretchGoals.map((goal, index) => (
                          <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{goal.title}</h4>
                              <Badge variant="outline" className="text-[#0F7377] border-[#0F7377]">
                                ${goal.amount.toLocaleString()}
                              </Badge>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 mb-3">{goal.description}</p>
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div 
                                  className="h-2 bg-gradient-to-r from-[#0F7377] to-[#00A884] rounded-full"
                                  style={{ width: `${Math.min((project.raised / goal.amount) * 100, 100)}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {Math.round((project.raised / goal.amount) * 100)}%
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Social Proof */}
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Why Backers Trust This Project</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <ShieldCheck className="h-6 w-6 text-green-500" />
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Verified Creator</h4>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                          This creator has successfully completed previous campaigns and has a proven track record of delivering on promises.
                        </p>
                      </div>
                      
                      <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <Award className="h-6 w-6 text-blue-500" />
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Award Winning</h4>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                          This project has received recognition from industry experts and has been featured in major publications.
                        </p>
                      </div>
                      
                      <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <Users className="h-6 w-6 text-purple-500" />
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Community Support</h4>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                          Over {project.backers} backers have already pledged their support, showing strong community interest.
                        </p>
                      </div>
                      
                      <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <TrendingUp className="h-6 w-6 text-orange-500" />
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Trending Project</h4>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                          This project is currently trending and gaining momentum with new backers joining daily.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Similar Projects */}
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Similar Projects You Might Like</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { title: "Smart Home Automation", creator: "Tech Innovations", raised: 45000, goal: 50000, image: "/placeholder.svg?height=200&width=300&query=smart home" },
                        { title: "Sustainable Energy Solutions", creator: "GreenTech Co", raised: 78000, goal: 100000, image: "/placeholder.svg?height=200&width=300&query=sustainable energy" },
                        { title: "AI-Powered Health Monitor", creator: "HealthTech Labs", raised: 32000, goal: 40000, image: "/placeholder.svg?height=200&width=300&query=health monitor" },
                        { title: "Eco-Friendly Transportation", creator: "Mobility Solutions", raised: 56000, goal: 75000, image: "/placeholder.svg?height=200&width=300&query=transportation" }
                      ].map((similarProject, index) => (
                        <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-lg transition-shadow cursor-pointer">
                          <div className="flex gap-4">
                            <Image
                              src={similarProject.image}
                              alt={similarProject.title}
                              width={80}
                              height={80}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{similarProject.title}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">by {similarProject.creator}</p>
                              <div className="flex items-center gap-2 mb-2">
                                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                  <div 
                                    className="h-2 bg-[#0F7377] rounded-full"
                                    style={{ width: `${(similarProject.raised / similarProject.goal) * 100}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  {Math.round((similarProject.raised / similarProject.goal) * 100)}%
                                </span>
                              </div>
                              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                                <span>${similarProject.raised.toLocaleString()}</span>
                                <span>${similarProject.goal.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Story Tab */}
                <TabsContent value="story" className="space-y-6">
                  <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                      {project.story || "This is where the project creator tells their story, the inspiration behind the project, and why they're passionate about bringing this idea to life."}
                    </p>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded-r-lg">
                      <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-3">Why This Matters</h3>
                      <p className="text-blue-800 dark:text-blue-200">
                        We believe this project will make a real difference in people's lives and contribute to a better future for everyone.
                      </p>
                    </div>
                  </div>
                </TabsContent>

                {/* Updates Tab */}
                <TabsContent value="updates" className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Project Updates</h2>
                  <div className="space-y-6">
                    {project.updates && project.updates.length > 0 ? (
                      project.updates.map((update, index) => (
                        <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-[#0F7377] rounded-full flex items-center justify-center">
                              <span className="text-white font-bold">{index + 1}</span>
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900 dark:text-white text-lg">{update.title}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">{update.date}</div>
                            </div>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{update.content}</p>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Bell className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No updates yet</h3>
                        <p className="text-gray-600 dark:text-gray-400">Check back later for project updates!</p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                {/* FAQ Tab */}
                <TabsContent value="faq" className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {project.faq && project.faq.length > 0 ? (
                      project.faq.map((faq, index) => (
                        <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">{faq.question}</h3>
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                          <MessageCircle className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No FAQ yet</h3>
                        <p className="text-gray-600 dark:text-gray-400">Check back later for frequently asked questions!</p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                {/* Risks Tab */}
                <TabsContent value="risks" className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Risks and Challenges</h2>
                  <div className="space-y-4">
                    {project.risks && project.risks.length > 0 ? (
                      project.risks.map((risk, index) => (
                        <div key={index} className="border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6">
                          <div className="flex items-start gap-3">
                            <AlertCircle className="h-6 w-6 text-orange-500 mt-1 flex-shrink-0" />
                            <div>
                              <h3 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">Risk {index + 1}</h3>
                              <p className="text-orange-800 dark:text-orange-200 leading-relaxed">{risk}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Shield className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No risks identified</h3>
                        <p className="text-gray-600 dark:text-gray-400">This project appears to have minimal risks.</p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                {/* Comments Tab */}
                <TabsContent value="comments" className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Comments ({project.comments})</h2>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="font-semibold text-gray-900 dark:text-white">John Doe</span>
                            <span className="text-sm text-gray-500">2 days ago</span>
                            <Badge variant="secondary" className="text-xs">Backer</Badge>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                            This looks amazing! I've been waiting for something like this. Can't wait to get my hands on it!
                          </p>
                          <div className="flex items-center gap-4">
                            <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                              <ThumbsUp className="h-4 w-4" />
                              <span>12</span>
                            </button>
                            <button className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                              Reply
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>SM</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="font-semibold text-gray-900 dark:text-white">Sarah Miller</span>
                            <span className="text-sm text-gray-500">1 week ago</span>
                            <Badge variant="secondary" className="text-xs">Backer</Badge>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                            Great project! I love the sustainable approach. When do you expect to ship?
                          </p>
                          <div className="flex items-center gap-4">
                            <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                              <ThumbsUp className="h-4 w-4" />
                              <span>8</span>
                            </button>
                            <button className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                              Reply
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Backers Tab */}
                <TabsContent value="backers" className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Backers ({project.backers})</h2>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Users className="h-4 w-4 mr-2" />
                        Export List
                      </Button>
                      <Button variant="outline" size="sm">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Analytics
                      </Button>
                    </div>
                  </div>

                  {/* Backer Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                      <div className="text-2xl font-bold text-[#0F7377] dark:text-[#00A884]">{project.backers}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Total Backers</div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">${Math.round(project.raised / project.backers).toLocaleString()}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Avg. Pledge</div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">24</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">New This Week</div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">89%</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Return Backers</div>
                    </div>
                  </div>

                  {/* Recent Backers */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Backers</h3>
                    <div className="space-y-3">
                      {[
                        { name: "Alex Chen", amount: 500, time: "2 hours ago", avatar: "AC", verified: true },
                        { name: "Maria Rodriguez", amount: 150, time: "4 hours ago", avatar: "MR", verified: false },
                        { name: "David Kim", amount: 75, time: "6 hours ago", avatar: "DK", verified: true },
                        { name: "Sarah Johnson", amount: 200, time: "8 hours ago", avatar: "SJ", verified: false },
                        { name: "Michael Brown", amount: 1000, time: "1 day ago", avatar: "MB", verified: true },
                        { name: "Lisa Wang", amount: 300, time: "1 day ago", avatar: "LW", verified: true },
                        { name: "James Wilson", amount: 50, time: "2 days ago", avatar: "JW", verified: false },
                        { name: "Emma Davis", amount: 250, time: "2 days ago", avatar: "ED", verified: true }
                      ].map((backer, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback>{backer.avatar}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-gray-900 dark:text-white">{backer.name}</span>
                                {backer.verified && (
                                  <ShieldCheck className="h-4 w-4 text-green-500" />
                                )}
                              </div>
                              <div className="text-sm text-gray-500">{backer.time}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-gray-900 dark:text-white">${backer.amount}</div>
                            <div className="text-sm text-gray-500">Pledged</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Analytics Tab */}
                <TabsContent value="analytics" className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Project Analytics</h2>
                  
                  {/* Key Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-r from-[#0F7377] to-[#00A884] rounded-xl p-6 text-white">
                      <div className="text-3xl font-bold mb-2">${project.raised.toLocaleString()}</div>
                      <div className="text-sm opacity-90">Total Raised</div>
                      <div className="text-xs opacity-75 mt-1">+12% from last week</div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                      <div className="text-3xl font-bold mb-2">{project.backers}</div>
                      <div className="text-sm opacity-90">Total Backers</div>
                      <div className="text-xs opacity-75 mt-1">+8% from last week</div>
                    </div>
                    <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
                      <div className="text-3xl font-bold mb-2">{fundingPercentage}%</div>
                      <div className="text-sm opacity-90">Funded</div>
                      <div className="text-xs opacity-75 mt-1">On track to reach goal</div>
                    </div>
                  </div>

                  {/* Funding Progress Chart */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Funding Progress</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Week 1</span>
                        <span className="text-gray-600 dark:text-gray-400">Week 2</span>
                        <span className="text-gray-600 dark:text-gray-400">Week 3</span>
                        <span className="text-gray-600 dark:text-gray-400">Week 4</span>
                      </div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#0F7377] to-[#00A884] rounded-full" style={{ width: `${fundingPercentage}%` }}></div>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                        <span>$0</span>
                        <span>${project.goal.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Geographic Distribution */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Backers by Location</h3>
                    <div className="space-y-3">
                      {[
                        { country: "United States", percentage: 45, amount: Math.round(project.raised * 0.45) },
                        { country: "Canada", percentage: 20, amount: Math.round(project.raised * 0.20) },
                        { country: "United Kingdom", percentage: 15, amount: Math.round(project.raised * 0.15) },
                        { country: "Australia", percentage: 10, amount: Math.round(project.raised * 0.10) },
                        { country: "Other", percentage: 10, amount: Math.round(project.raised * 0.10) }
                      ].map((location, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-4 h-4 bg-[#0F7377] rounded-full"></div>
                            <span className="text-gray-900 dark:text-white">{location.country}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div 
                                className="h-2 bg-[#0F7377] rounded-full"
                                style={{ width: `${location.percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-400 w-16 text-right">
                              ${location.amount.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Referral Sources */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Traffic Sources</h3>
                    <div className="space-y-3">
                      {[
                        { source: "Direct", percentage: 35, visitors: 1240 },
                        { source: "Social Media", percentage: 28, visitors: 992 },
                        { source: "Search Engines", percentage: 20, visitors: 708 },
                        { source: "Email Campaigns", percentage: 12, visitors: 425 },
                        { source: "Referrals", percentage: 5, visitors: 177 }
                      ].map((source, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                            <span className="text-gray-900 dark:text-white">{source.source}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div 
                                className="h-2 bg-blue-500 rounded-full"
                                style={{ width: `${source.percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-400 w-16 text-right">
                              {source.visitors}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Column - Enhanced Pledge Options */}
            <div className="space-y-6">
              {/* Pledge Card */}
              <div className="sticky top-24">
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-xl">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                      ${project.raised.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      raised of ${project.goal.toLocaleString()} goal
                    </div>
                    <Progress 
                      value={fundingPercentage} 
                      className="h-3 mb-4"
                    />
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>{project.backers} backers</span>
                      <span>{project.daysLeft} days left</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Choose your reward</h3>
                  
                  <div className="space-y-4">
                    {project.rewards.map((reward, index) => (
                      <div key={index} className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                        index === 0 
                          ? 'border-[#0F7377] bg-[#0F7377]/5 dark:bg-[#0F7377]/10' 
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`} onClick={() => handleRewardSelect(index)}>
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                              ${reward.amount}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {reward.title}
                            </div>
                          </div>
                          {index === 0 && (
                            <Badge className="bg-[#0F7377] text-white text-xs">
                              Popular
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                          {reward.description}
                        </p>
                        <Button 
                          className={`w-full ${
                            index === 0 
                              ? 'bg-[#0F7377] hover:bg-[#0F7377]/90 text-white' 
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                          }`}
                        >
                          {index === 0 ? 'Select This Reward' : 'Select'}
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                      <p className="mb-3">All pledges include:</p>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Free worldwide shipping
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          30-day money-back guarantee
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          Lifetime customer support
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Additional Project Info */}
                  <div className="mt-6 space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <Shield className="h-4 w-4 text-green-500" />
                        Project Security
                      </h4>
                      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          Identity verified
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          Bank account verified
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          Tax information provided
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <Truck className="h-4 w-4 text-blue-500" />
                        Shipping Info
                      </h4>
                      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <div>Estimated delivery: {project.estimatedDelivery || "Q2 2024"}</div>
                        <div>Shipping to: Worldwide</div>
                        <div>Handling time: 2-3 business days</div>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-purple-500" />
                        Timeline
                      </h4>
                      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <div>Campaign ends: {project.daysLeft} days</div>
                        <div>Production starts: After funding</div>
                        <div>First shipments: {project.estimatedDelivery || "Q2 2024"}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pledge Modal */}
      {showPledgeModal && selectedReward !== null && (
        <div className="fixed inset-0 z-60 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Pledge to {project.title}</h3>
              <button
                onClick={() => setShowPledgeModal(false)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                <div className="font-semibold text-gray-900 dark:text-white text-lg">
                  ${project.rewards[selectedReward].amount} - {project.rewards[selectedReward].title}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {project.rewards[selectedReward].description}
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
                    placeholder={project.rewards[selectedReward].amount.toString()}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0F7377]/20 focus:border-[#0F7377]"
                  />
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button
                  onClick={handlePledge}
                  className="flex-1 bg-[#0F7377] hover:bg-[#0F7377]/90 text-white py-3"
                >
                  Confirm Pledge
                </Button>
                <Button
                  onClick={() => setShowPledgeModal(false)}
                  variant="outline"
                  className="flex-1 py-3"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {showVideoModal && project.video && (
        <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl overflow-hidden">
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

      {/* Gallery Modal */}
      {showGallery && project.gallery && (
        <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-6xl bg-white dark:bg-gray-800 rounded-2xl overflow-hidden">
            <button
              onClick={() => setShowGallery(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Project Gallery</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {project.gallery.map((image, index) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden cursor-pointer group">
                    <Image
                      src={image}
                      alt={`${project.title} gallery ${index + 1}`}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
