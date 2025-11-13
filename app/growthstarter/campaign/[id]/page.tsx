"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Rocket, 
  Users, 
  DollarSign, 
  Calendar,
  Star,
  TrendingUp,
  Target,
  Lightbulb,
  Zap,
  ArrowRight,
  Heart,
  Eye,
  Share2,
  Clock,
  CheckCircle,
  MessageCircle,
  Globe,
  Shield,
  Gift,
  AlertCircle,
  User,
  Building2,
  Code,
  BarChart3,
  ShoppingCart,
  CreditCard,
  FileText,
  Handshake,
  Briefcase,
  MapPin,
  Clock as ClockIcon,
  AlertCircle as AlertCircleIcon,
  Upload,
  Bell,
  Settings,
  Edit,
  Camera,
  Video,
  Image,
  Link as LinkIcon,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Copy,
  MoreHorizontal,
  ThumbsUp,
  ThumbsDown,
  Reply,
  Send,
  Filter,
  Search,
  Download,
  PieChart,
  TrendingUp as TrendingUpIcon,
  TrendingDown,
  Activity,
  Target as TargetIcon,
  Award,
  Gift as GiftIcon,
  Users as UsersIcon,
  MessageSquare,
  Bell as BellIcon,
  Share as ShareIcon,
  Heart as HeartIcon,
  Eye as EyeIcon,
  BarChart3 as BarChart3Icon,
  Calendar as CalendarIcon,
  CheckCircle as CheckCircleIcon,
  StarOff,
  StarHalf,
  Play
} from "lucide-react"
import Link from "next/link"

export default function CampaignPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [comment, setComment] = useState("")
  const [showComments, setShowComments] = useState(true)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) {
    return null
  }

  // Mock campaign data
  const campaign = {
    id: params.id,
    title: "EcoTech - Smart Home Energy Monitor",
    creator: "Sarah Chen",
    description: "Revolutionary IoT device that monitors and optimizes home energy consumption in real-time",
    goal: 25000,
    raised: 18750,
    backers: 234,
    daysLeft: 12,
    status: "funding",
    location: "Singapore",
    image: "/ecotech-project.jpg",
    video: "/ecotech-video.mp4",
    category: "Technology",
    rewards: [
      { amount: 50, description: "Early Bird - Basic Monitor", claimed: 45, total: 50, available: 5 },
      { amount: 100, description: "Premium Monitor + App Access", claimed: 23, total: 30, available: 7 },
      { amount: 200, description: "Complete Smart Home Kit", claimed: 12, total: 20, available: 8 }
    ],
    updates: [
      {
        id: 1,
        title: "Prototype Testing Complete!",
        content: "We've successfully completed prototype testing and the results are amazing!",
        date: "2024-01-15",
        author: "Sarah Chen",
        likes: 45,
        comments: 12
      },
      {
        id: 2,
        title: "Manufacturing Partner Secured",
        content: "Great news! We've partnered with a leading manufacturer in Singapore.",
        date: "2024-01-10",
        author: "Sarah Chen",
        likes: 32,
        comments: 8
      }
    ],
    comments: [
      {
        id: 1,
        author: "John Doe",
        avatar: "/john-doe.jpg",
        content: "This looks amazing! Can't wait to get my hands on one.",
        date: "2024-01-16",
        likes: 15,
        replies: 3
      },
      {
        id: 2,
        author: "Jane Smith",
        avatar: "/jane-smith.jpg",
        content: "Will this work with existing smart home systems?",
        date: "2024-01-15",
        likes: 8,
        replies: 1
      }
    ],
    kpis: {
      conversionRate: 12.5,
      avgPledge: 80.12,
      socialShares: 156,
      emailSignups: 89,
      websiteVisits: 1247,
      engagementRate: 8.7
    },
    budget: {
      marketing: 35,
      development: 40,
      manufacturing: 15,
      operations: 10
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getProgressPercentage = (raised: number, goal: number) => {
    return Math.min((raised / goal) * 100, 100)
  }

  const renderRewardCard = (reward: any) => (
    <Card key={reward.amount} className="hover:shadow-lg transition-all duration-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-lg font-bold">
            {formatCurrency(reward.amount)}
          </Badge>
          <span className="text-sm text-muted-foreground">
            {reward.claimed} of {reward.total} claimed
          </span>
        </div>
        <CardTitle className="text-lg">{reward.description}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Available:</span>
            <span className="font-medium">{reward.available} left</span>
          </div>
          <Progress value={(reward.claimed / reward.total) * 100} className="h-2" />
        </div>
        <Button className="w-full mt-4" disabled={reward.available === 0}>
          {reward.available === 0 ? "Fully Claimed" : "Select This Reward"}
        </Button>
      </CardContent>
    </Card>
  )

  const renderUpdateCard = (update: any) => (
    <Card key={update.id} className="mb-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src={campaign.creator} />
              <AvatarFallback>{campaign.creator.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{update.author}</p>
              <p className="text-sm text-muted-foreground">{update.date}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
        <CardTitle className="text-lg">{update.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{update.content}</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Button variant="ghost" size="sm">
            <ThumbsUp className="w-4 h-4 mr-2" />
            {update.likes}
          </Button>
          <Button variant="ghost" size="sm">
            <MessageSquare className="w-4 h-4 mr-2" />
            {update.comments}
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const renderCommentCard = (comment: any) => (
    <Card key={comment.id} className="mb-4">
      <CardContent className="pt-4">
        <div className="flex items-start gap-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={comment.avatar} />
            <AvatarFallback>{comment.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="font-medium">{comment.author}</p>
                <p className="text-sm text-muted-foreground">{comment.date}</p>
              </div>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-muted-foreground mb-3">{comment.content}</p>
            <div className="flex items-center gap-4 text-sm">
              <Button variant="ghost" size="sm">
                <ThumbsUp className="w-4 h-4 mr-2" />
                {comment.likes}
              </Button>
              <Button variant="ghost" size="sm">
                <Reply className="w-4 h-4 mr-2" />
                Reply
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Video/Image */}
      <section className="relative h-96 bg-gradient-to-br from-[#0F7377] to-[#1E293B]">
        <div className="absolute inset-0">
          <div className="w-full h-full bg-black/20 flex items-center justify-center">
            <div className="text-center text-white">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Play className="w-6 h-6 mr-2" />
                Watch Campaign Video
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Navigation */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-6">
              <Button variant="ghost" onClick={() => setActiveTab("overview")}>
                Campaign
              </Button>
              <Button variant="ghost" onClick={() => setActiveTab("updates")}>
                Updates
              </Button>
              <Button variant="ghost" onClick={() => setActiveTab("comments")}>
                Comments
              </Button>
              <Button variant="ghost" onClick={() => setActiveTab("community")}>
                Community
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Heart className="w-4 h-4 mr-2" />
                Follow
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Campaign Overview */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="updates">Updates</TabsTrigger>
                <TabsTrigger value="comments">Comments</TabsTrigger>
                <TabsTrigger value="community">Community</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                {/* Project Story */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">About this project</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-lg leading-relaxed">
                      {campaign.description}
                    </p>
                    <p className="text-muted-foreground">
                      Our revolutionary IoT device monitors and optimizes home energy consumption in real-time, 
                      helping you save money and reduce your carbon footprint. With advanced AI algorithms and 
                      seamless integration with existing smart home systems, EcoTech provides unprecedented 
                      insights into your energy usage patterns.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-[#0F7377]">12</div>
                        <div className="text-sm text-muted-foreground">Months in Development</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-[#0F7377]">3</div>
                        <div className="text-sm text-muted-foreground">Prototype Iterations</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Rewards */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Rewards</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {campaign.rewards.map(renderRewardCard)}
                    </div>
                  </CardContent>
                </Card>

                {/* Updates */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Updates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {campaign.updates.map(renderUpdateCard)}
                    </div>
                  </CardContent>
                </Card>

                {/* Comments */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Comments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <Textarea
                            placeholder="Add a comment..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="min-h-[80px]"
                          />
                          <div className="flex justify-end mt-2">
                            <Button size="sm">
                              <Send className="w-4 h-4 mr-2" />
                              Post Comment
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        {campaign.comments.map(renderCommentCard)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Updates Tab */}
              <TabsContent value="updates" className="space-y-6">
                <div className="space-y-4">
                  {campaign.updates.map(renderUpdateCard)}
                </div>
              </TabsContent>

              {/* Comments Tab */}
              <TabsContent value="comments" className="space-y-6">
                <div className="space-y-4">
                  {campaign.comments.map(renderCommentCard)}
                </div>
              </TabsContent>

              {/* Community Tab */}
              <TabsContent value="community" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Community</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Join the conversation with other backers and the project creator.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Campaign Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Campaign Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#0F7377]">
                    {formatCurrency(campaign.raised)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    raised of {formatCurrency(campaign.goal)} goal
                  </div>
                </div>
                <Progress value={getProgressPercentage(campaign.raised, campaign.goal)} className="h-3" />
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold">{campaign.backers}</div>
                    <div className="text-sm text-muted-foreground">Backers</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold">{campaign.daysLeft}</div>
                    <div className="text-sm text-muted-foreground">Days to go</div>
                  </div>
                </div>
                <Button className="w-full" size="lg">
                  <Heart className="w-4 h-4 mr-2" />
                  Back this project
                </Button>
              </CardContent>
            </Card>

            {/* Creator Info */}
            <Card>
              <CardHeader>
                <CardTitle>About the creator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={campaign.creator} />
                    <AvatarFallback>{campaign.creator.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{campaign.creator}</div>
                    <div className="text-sm text-muted-foreground">{campaign.location}</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Experienced entrepreneur with a passion for sustainable technology solutions.
                </p>
                <Button variant="outline" className="w-full">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Contact Creator
                </Button>
              </CardContent>
            </Card>

            {/* Social Sharing */}
            <Card>
              <CardHeader>
                <CardTitle>Share this project</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm">
                    <Facebook className="w-4 h-4 mr-2" />
                    Facebook
                  </Button>
                  <Button variant="outline" size="sm">
                    <Twitter className="w-4 h-4 mr-2" />
                    Twitter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Instagram className="w-4 h-4 mr-2" />
                    Instagram
                  </Button>
                  <Button variant="outline" size="sm">
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </Button>
                </div>
                <div className="flex gap-2 mt-4">
                  <Input value={`https://growthlab.sg/campaign/${campaign.id}`} readOnly />
                  <Button variant="outline" size="sm">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 