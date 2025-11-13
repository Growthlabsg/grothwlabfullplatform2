"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { 
  Search, 
  Filter, 
  MapPin, 
  DollarSign, 
  Users, 
  Building2, 
  Star,
  MessageCircle,
  ExternalLink,
  Send,
  X,
  Plus,
  CheckCircle,
  AlertCircle,
  Shield,
  Eye,
  SortAsc,
  SortDesc,
  RefreshCw,
  Download,
  Upload,
  Bell,
  Mail,
  Phone,
  Video,
  Globe,
  LinkIcon,
  FileText,
  BarChart3,
  TrendingUp,
  Zap,
  Heart,
  Settings,
  Lock,
  User,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Bookmark,
  Share2,
  Briefcase,
  PieChart,
  TrendingDown,
  Activity,
  Handshake,
  Lightbulb,
  Target,
  Zap as ZapIcon
} from "lucide-react"
import Link from "next/link"

export default function InvestorsPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  
  // Communication Hub Integration
  const [activeConversation, setActiveConversation] = useState<any>(null)
  const [conversations, setConversations] = useState<any[]>([])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  
  // User Profile
  const [hasInvestorProfile, setHasInvestorProfile] = useState(false)
  const [userProfile, setUserProfile] = useState<any>(null)

  // Screen size detection
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Load user profile
  useEffect(() => {
    const profile = localStorage.getItem('investorProfile')
    if (profile) {
      setHasInvestorProfile(true)
      setUserProfile(JSON.parse(profile))
    }
  }, [])

  // Communication handlers
  const handleConnect = async (investor: any) => {
    try {
      const conversation = {
        id: `conv-${investor.id}`,
        participant: investor,
        lastMessage: null,
        unreadCount: 0,
        createdAt: new Date(),
        status: 'connected',
        type: 'investor'
      }
      
      setConversations(prev => {
        const existing = prev.find(conv => conv.id === conversation.id)
        if (!existing) {
          return [...prev, conversation]
        }
        return prev
      })
      
      setActiveConversation(conversation)
      
      toast({
        title: "Connection Request Sent",
        description: `Connection request sent to ${investor.name}. Conversation started.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send connection request. Please try again.",
        variant: "destructive"
      })
    }
  }

  const handleMessage = async (investor: any) => {
    try {
      const conversation = {
        id: `conv-${investor.id}`,
        participant: investor,
        lastMessage: null,
        unreadCount: 0,
        createdAt: new Date(),
        status: 'messaging',
        type: 'investor'
      }
      
      setConversations(prev => {
        const existing = prev.find(conv => conv.id === conversation.id)
        if (!existing) {
          return [...prev, conversation]
        }
        return prev
      })
      
      setActiveConversation(conversation)
      
      toast({
        title: "Conversation Started",
        description: `Started conversation with ${investor.name}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start conversation. Please try again.",
        variant: "destructive"
      })
    }
  }

  // Mock investor data
  const investors = [
    {
      id: 1,
      name: "Golden Gate Ventures",
      type: "VC Fund",
      location: "Singapore",
      focus: ["Fintech", "E-commerce", "SaaS"],
      investmentRange: "$500K - $5M",
      portfolio: 45,
      description: "Leading Southeast Asian venture capital firm focused on early-stage technology companies.",
      rating: 4.8,
      verified: true,
      image: "/placeholder.svg?height=80&width=80&query=golden gate ventures logo"
    },
    {
      id: 2,
      name: "Sequoia Capital SEA",
      type: "VC Fund",
      location: "Singapore",
      focus: ["Consumer", "Enterprise", "Healthcare"],
      investmentRange: "$1M - $50M",
      portfolio: 120,
      description: "Global venture capital firm with a strong focus on Southeast Asian startups.",
      rating: 4.9,
      verified: true,
      image: "/placeholder.svg?height=80&width=80&query=sequoia capital logo"
    },
    {
      id: 3,
      name: "500 Startups",
      type: "Accelerator",
      location: "Singapore",
      focus: ["B2B", "Marketplace", "AI/ML"],
      investmentRange: "$50K - $500K",
      portfolio: 200,
      description: "Global venture capital firm and seed accelerator with a focus on emerging markets.",
      rating: 4.7,
      verified: true,
      image: "/placeholder.svg?height=80&width=80&query=500 startups logo"
    },
    {
      id: 4,
      name: "East Ventures",
      type: "VC Fund",
      location: "Indonesia",
      focus: ["E-commerce", "Fintech", "Edtech"],
      investmentRange: "$100K - $10M",
      portfolio: 180,
      description: "Southeast Asia's leading sector-agnostic venture capital firm.",
      rating: 4.6,
      verified: true,
      image: "/placeholder.svg?height=80&width=80&query=east ventures logo"
    },
    {
      id: 5,
      name: "Vertex Ventures",
      type: "VC Fund",
      location: "Singapore",
      focus: ["Deep Tech", "Healthcare", "Enterprise"],
      investmentRange: "$500K - $20M",
      portfolio: 85,
      description: "Temasek-backed venture capital firm investing in early-stage technology companies.",
      rating: 4.5,
      verified: true,
      image: "/placeholder.svg?height=80&width=80&query=vertex ventures logo"
    },
    {
      id: 6,
      name: "Antler",
      type: "Accelerator",
      location: "Singapore",
      focus: ["AI/ML", "SaaS", "Marketplace"],
      investmentRange: "$25K - $200K",
      portfolio: 150,
      description: "Global startup generator and early-stage venture capital firm.",
      rating: 4.4,
      verified: true,
      image: "/placeholder.svg?height=80&width=80&query=antler logo"
    }
  ]

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "vc", label: "Venture Capital" },
    { value: "angel", label: "Angel Investors" },
    { value: "accelerator", label: "Accelerators" },
    { value: "incubator", label: "Incubators" },
    { value: "corporate", label: "Corporate VC" }
  ]

  const locations = [
    { value: "all", label: "All Locations" },
    { value: "singapore", label: "Singapore" },
    { value: "indonesia", label: "Indonesia" },
    { value: "malaysia", label: "Malaysia" },
    { value: "thailand", label: "Thailand" },
    { value: "vietnam", label: "Vietnam" },
    { value: "philippines", label: "Philippines" }
  ]

  const filteredInvestors = investors.filter(investor => {
    const matchesSearch = investor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         investor.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || investor.type.toLowerCase().includes(selectedCategory)
    const matchesLocation = selectedLocation === "all" || investor.location.toLowerCase().includes(selectedLocation)
    
    return matchesSearch && matchesCategory && matchesLocation
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-lg font-bold text-gray-900">Investors</h1>
          </div>
          <div className="flex items-center gap-2">
            {conversations.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveConversation(conversations[0])}
                className="relative"
              >
                <MessageCircle className="h-4 w-4" />
                {conversations.length > 1 && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#0F7377] text-white rounded-full flex items-center justify-center">
                    <span className="text-xs font-semibold">{conversations.length}</span>
                  </div>
                )}
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4">
        {/* Desktop Header */}
        <div className="hidden lg:block mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-4">Investors Network</h1>
              <p className="text-lg text-gray-600 mb-6">
                Connect with angel investors, venture capitalists, and other funding sources for your startup. 
                Find the right investors who align with your vision and growth stage.
              </p>
            </div>
            <Link href="/network/investors/create-profile">
              <Button className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                <Plus className="h-4 w-4 mr-2" />
                Create Profile
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Description */}
        <div className="lg:hidden mb-6">
          <p className="text-gray-600 text-sm">
            Connect with investors who align with your vision and growth stage.
          </p>
        </div>

        {/* User's Investor Profile Status */}
        {hasInvestorProfile && userProfile && (
          <Card className="mb-8 bg-gradient-to-r from-[#0F7377] to-[#0F7377]/90 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-full">
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Your Investor Profile</h3>
                    <p className="text-white/80 text-sm">
                      {userProfile.firstName} {userProfile.lastName} • {userProfile.company}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-500 text-white">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Active
                  </Badge>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => window.location.href = '/network/investors/create-profile'}
                  >
                    Edit Profile
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-medium">Investment Focus</p>
                  <p className="text-white/80">
                    {userProfile.industryFocus?.slice(0, 3).join(', ')}
                    {userProfile.industryFocus?.length > 3 && '...'}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Stage Focus</p>
                  <p className="text-white/80">
                    {userProfile.stageFocus?.slice(0, 2).join(', ')}
                    {userProfile.stageFocus?.length > 2 && '...'}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Investment Size</p>
                  <p className="text-white/80">{userProfile.investmentSize}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

      {/* Search and Filters */}
      </div>      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search investors by name, focus area, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => (
                <SelectItem key={location.value} value={location.value}>
                  {location.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Building2 className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Total Investors</p>
                <p className="text-2xl font-bold">{investors.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <DollarSign className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Avg. Investment</p>
                <p className="text-2xl font-bold">$2.5M</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-purple-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Portfolio Companies</p>
                <p className="text-2xl font-bold">780+</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Star className="w-8 h-8 text-yellow-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold">85%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Investors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInvestors.map((investor) => (
          <Card key={investor.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={investor.image}
                    alt={investor.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {investor.name}
                      {investor.verified && (
                        <Badge variant="secondary" className="text-xs">Verified</Badge>
                      )}
                    </CardTitle>
                    <p className="text-sm text-gray-600">{investor.type}</p>
                  </div>
                </div>
                <div className="flex items-center text-sm">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  {investor.rating}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-700">{investor.description}</p>
              
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-1" />
                {investor.location}
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <DollarSign className="w-4 h-4 mr-1" />
                {investor.investmentRange}
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <Users className="w-4 h-4 mr-1" />
                {investor.portfolio} portfolio companies
              </div>
              
              <div className="flex flex-wrap gap-1">
                {investor.focus.map((focus) => (
                  <Badge key={focus} variant="outline" className="text-xs">
                    {focus}
                  </Badge>
                ))}
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleConnect(investor)}
                >
                  <MessageCircle className="w-4 h-4 mr-1" />
                  Connect
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleMessage(investor)}
                  className="text-[#0F7377] border-[#0F7377] hover:bg-[#0F7377] hover:text-white"
                >
                  <Send className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredInvestors.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No investors found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search criteria or filters to find more investors.
          </p>
          <Button onClick={() => {
            setSearchTerm("")
            setSelectedCategory("all")
            setSelectedLocation("all")
          }}>
            Clear Filters
          </Button>
        </div>
      )}

      {/* Call to Action */}
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Connect with Investors?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Join our investor matching program and get personalized introductions to investors 
          who are actively looking for startups like yours.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Get Investor Introductions
          </Button>
          <Button size="lg" variant="outline">
            Learn About Our Process
          </Button>
        </div>
      </div>

      {/* Communication Hub Integration */}
      {activeConversation && (
        <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          {/* Conversation Header */}
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-[#0F7377] to-[#0F7377]/90 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Briefcase className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{activeConversation.participant.name}</h3>
                  <p className="text-xs text-white/80">{activeConversation.participant.type} • {activeConversation.participant.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                  onClick={() => setActiveConversation(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Conversation Content */}
          <div className="h-64 flex flex-col">
            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 bg-[#0F7377]/10 rounded-full flex items-center justify-center">
                    <Briefcase className="h-3 w-3 text-[#0F7377]" />
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                    <p className="text-sm text-gray-700">
                      Hi! I'm interested in learning more about your investment focus. 
                      Could you tell me about your typical investment criteria?
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Just now</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2 justify-end">
                  <div className="bg-[#0F7377] text-white rounded-lg p-3 max-w-xs">
                    <p className="text-sm">
                      Hello! I'd be happy to discuss our investment focus. 
                      We typically invest in {activeConversation.participant.focus?.join(', ')} companies.
                    </p>
                    <p className="text-xs text-white/80 mt-1">Just now</p>
                  </div>
                  <div className="w-6 h-6 bg-[#0F7377] rounded-full flex items-center justify-center">
                    <span className="text-xs font-semibold text-white">You</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Conversations List - Mobile */}
      {conversations.length > 0 && (
        <div className="lg:hidden fixed bottom-20 right-4 w-72 bg-white rounded-lg shadow-xl border border-gray-200 z-40">
          <div className="p-3 border-b border-gray-200">
            <h3 className="font-semibold text-sm text-gray-900">Active Conversations</h3>
          </div>
          <div className="max-h-48 overflow-y-auto">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                  activeConversation?.id === conversation.id ? 'bg-[#0F7377]/5' : ''
                }`}
                onClick={() => setActiveConversation(conversation)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#0F7377]/10 rounded-full flex items-center justify-center">
                    <Briefcase className="h-4 w-4 text-[#0F7377]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {conversation.participant.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {conversation.participant.type} • {conversation.participant.location}
                    </p>
                  </div>
                  {conversation.unreadCount > 0 && (
                    <div className="w-5 h-5 bg-[#0F7377] text-white rounded-full flex items-center justify-center">
                      <span className="text-xs font-semibold">{conversation.unreadCount}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Desktop Conversation Indicator */}
      {conversations.length > 0 && (
        <div className="hidden lg:block fixed bottom-6 right-6 z-40">
          <div className="bg-white rounded-full shadow-lg border border-gray-200 p-3">
            <Button
              variant="ghost"
              size="sm"
              className="relative"
              onClick={() => setActiveConversation(conversations[0])}
            >
              <MessageCircle className="h-6 w-6 text-[#0F7377]" />
              {conversations.length > 1 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#0F7377] text-white rounded-full flex items-center justify-center">
                  <span className="text-xs font-semibold">{conversations.length}</span>
                </div>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50">
        <div className="flex justify-around">
          <Button variant="ghost" className="flex flex-col items-center space-y-1 p-2">
            <Briefcase className="w-5 h-5 text-gray-600" />
            <span className="text-xs font-medium text-gray-600">Investors</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center space-y-1 p-2">
            <Search className="w-5 h-5 text-gray-600" />
            <span className="text-xs font-medium text-gray-600">Search</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex flex-col items-center space-y-1 p-2 relative"
            onClick={() => setActiveConversation(conversations[0])}
          >
            <MessageCircle className="w-5 h-5 text-gray-600" />
            <span className="text-xs font-medium text-gray-600">Messages</span>
            {conversations.length > 0 && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#0F7377] text-white rounded-full flex items-center justify-center">
                <span className="text-xs font-semibold">{conversations.length}</span>
              </div>
            )}
          </Button>
          <Button variant="ghost" className="flex flex-col items-center space-y-1 p-2">
            <Settings className="w-5 h-5 text-gray-600" />
            <span className="text-xs font-medium text-gray-600">Settings</span>
          </Button>
        </div>
      </div>

      {/* Bottom padding for mobile navigation */}
      <div className="lg:hidden h-20"></div>
    </div>
  )
}
