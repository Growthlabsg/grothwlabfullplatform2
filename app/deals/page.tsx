"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  Target, 
  Calendar,
  Star,
  ArrowRight,
  Eye,
  Heart,
  Share2,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Zap,
  Building2,
  Handshake,
  Briefcase,
  Globe,
  Filter,
  Search
} from "lucide-react"
import Link from "next/link"

export default function DealsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStage, setSelectedStage] = useState("all")

  const categories = [
    { id: "all", name: "All Deals", icon: <DollarSign className="w-4 h-4" /> },
    { id: "investment", name: "Investment", icon: <TrendingUp className="w-4 h-4" /> },
    { id: "partnership", name: "Partnership", icon: <Handshake className="w-4 h-4" /> },
    { id: "acquisition", name: "Acquisition", icon: <Building2 className="w-4 h-4" /> },
    { id: "joint-venture", name: "Joint Venture", icon: <Briefcase className="w-4 h-4" /> },
    { id: "licensing", name: "Licensing", icon: <Globe className="w-4 h-4" /> }
  ]

  const stages = [
    { id: "all", name: "All Stages" },
    { id: "open", name: "Open" },
    { id: "negotiating", name: "Negotiating" },
    { id: "closing", name: "Closing" },
    { id: "closed", name: "Closed" }
  ]

  const deals = [
    {
      id: 1,
      title: "Series A Investment - TechFlow Solutions",
      category: "investment",
      description: "Leading fintech startup seeking $5M Series A investment for Southeast Asia expansion",
      stage: "open",
      value: 5000000,
      equity: 15,
      location: "Singapore",
      deadline: "2024-03-15",
      views: 1247,
      likes: 156,
      featured: true,
      company: "TechFlow Solutions",
      industry: "FinTech",
      teamSize: 25,
      revenue: 1200000,
      investors: ["Sequoia Capital", "Temasek"],
      requirements: ["Minimum investment: $100K", "Strategic value-add preferred"]
    },
    {
      id: 2,
      title: "Strategic Partnership - HealthTech Platform",
      category: "partnership",
      description: "Healthcare technology platform seeking strategic partners for regional expansion",
      stage: "negotiating",
      value: 2000000,
      equity: 0,
      location: "Malaysia",
      deadline: "2024-02-28",
      views: 892,
      likes: 203,
      featured: true,
      company: "HealthTech Platform",
      industry: "Healthcare",
      teamSize: 15,
      revenue: 800000,
      investors: ["500 Startups"],
      requirements: ["Healthcare expertise", "Regional network"]
    },
    {
      id: 3,
      title: "Acquisition Opportunity - E-commerce Startup",
      category: "acquisition",
      description: "Profitable e-commerce startup with 100K+ customers available for acquisition",
      stage: "open",
      value: 8000000,
      equity: 100,
      location: "Indonesia",
      deadline: "2024-04-01",
      views: 567,
      likes: 89,
      featured: false,
      company: "ShopLocal",
      industry: "E-commerce",
      teamSize: 30,
      revenue: 2500000,
      investors: ["East Ventures"],
      requirements: ["Full acquisition", "Operational expertise"]
    },
    {
      id: 4,
      title: "Joint Venture - AI Education Platform",
      category: "joint-venture",
      description: "AI-powered education platform seeking joint venture partners for market entry",
      stage: "closing",
      value: 3000000,
      equity: 50,
      location: "Thailand",
      deadline: "2024-03-01",
      views: 734,
      likes: 134,
      featured: false,
      company: "EduAI",
      industry: "EdTech",
      teamSize: 20,
      revenue: 1500000,
              investors: ["GrowthLab"],
      requirements: ["Education sector experience", "Local market knowledge"]
    },
    {
      id: 5,
      title: "Licensing Deal - Blockchain Solution",
      category: "licensing",
      description: "Enterprise blockchain solution available for licensing in financial services",
      stage: "open",
      value: 1000000,
      equity: 0,
      location: "Singapore",
      deadline: "2024-05-01",
      views: 445,
      likes: 78,
      featured: false,
      company: "BlockChain Pro",
      industry: "Blockchain",
      teamSize: 12,
      revenue: 600000,
      investors: ["Binance Labs"],
      requirements: ["Financial services focus", "Technical expertise"]
    },
    {
      id: 6,
      title: "Series B Investment - GreenTech Startup",
      category: "investment",
      description: "Sustainable energy startup seeking $10M Series B for international expansion",
      stage: "negotiating",
      value: 10000000,
      equity: 20,
      location: "Vietnam",
      deadline: "2024-04-15",
      views: 1023,
      likes: 167,
      featured: true,
      company: "GreenTech Solutions",
      industry: "Clean Energy",
      teamSize: 35,
      revenue: 3000000,
      investors: ["SoftBank", "GIC"],
      requirements: ["ESG focus", "International expansion experience"]
    }
  ]

  const recentDeals = [
    {
      id: 1,
      title: "FoodTech Acquisition",
      company: "FoodieTech",
      value: 15000000,
      status: "closed",
      date: "2024-01-15"
    },
    {
      id: 2,
      title: "Logistics Partnership",
      company: "LogiTech",
      value: 5000000,
      status: "closed",
      date: "2024-01-10"
    },
    {
      id: 3,
      title: "SaaS Investment",
      company: "CloudSoft",
      value: 8000000,
      status: "closed",
      date: "2024-01-05"
    }
  ]

  const filteredDeals = deals.filter(deal => {
    const matchesCategory = selectedCategory === "all" || deal.category === selectedCategory
    const matchesSearch = deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deal.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deal.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStage = selectedStage === "all" || deal.stage === selectedStage
    return matchesCategory && matchesSearch && matchesStage
  })

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "open": return "bg-green-100 text-green-800"
      case "negotiating": return "bg-yellow-100 text-yellow-800"
      case "closing": return "bg-blue-100 text-blue-800"
      case "closed": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStageIcon = (stage: string) => {
    switch (stage) {
      case "open": return <CheckCircle className="w-4 h-4" />
      case "negotiating": return <Clock className="w-4 h-4" />
      case "closing": return <AlertCircle className="w-4 h-4" />
      case "closed": return <CheckCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
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

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F7377] to-[#1E293B]">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center">
            <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">
              <DollarSign className="w-3 h-3 mr-1" />
              Investment Opportunities
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              Deals
            </h1>
            <p className="mb-8 mx-auto max-w-3xl text-lg text-white/90 md:text-xl">
              Discover exclusive investment opportunities, strategic partnerships, and business deals 
              from Asia's most promising startups and established companies.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row justify-center">
              <Button size="lg" className="bg-[#F59E0B] text-white hover:bg-[#F59E0B]/90">
                <DollarSign className="w-4 h-4 mr-2" />
                Browse Deals
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Handshake className="w-4 h-4 mr-2" />
                Submit Deal
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#0F7377] md:text-5xl">$50M+</div>
              <div className="text-[#1E293B]">Total Deal Value</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#0F7377] md:text-5xl">25+</div>
              <div className="text-[#1E293B]">Active Deals</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#0F7377] md:text-5xl">150+</div>
              <div className="text-[#1E293B]">Investors</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#0F7377] md:text-5xl">85%</div>
              <div className="text-[#1E293B]">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-[#F8FAFC] py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <Tabs defaultValue="active" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="active">Active Deals</TabsTrigger>
              <TabsTrigger value="recent">Recent Deals</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* Active Deals Tab */}
            <TabsContent value="active" className="space-y-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-[#1E293B]">Active Investment Opportunities</h2>
                  <p className="text-[#64748B]">Browse and connect with exclusive deals from our network</p>
                </div>
                <div className="flex gap-4">
                  <Input
                    placeholder="Search deals..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="All Categories" />
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
                  <Select value={selectedStage} onValueChange={setSelectedStage}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="All Stages" />
                    </SelectTrigger>
                    <SelectContent>
                      {stages.map((stage) => (
                        <SelectItem key={stage.id} value={stage.id}>
                          {stage.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredDeals.map((deal) => (
                  <Card key={deal.id} className="group hover:shadow-lg transition-all duration-200">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <Badge className={getStageColor(deal.stage)}>
                            {getStageIcon(deal.stage)}
                            {deal.stage.charAt(0).toUpperCase() + deal.stage.slice(1)}
                          </Badge>
                          {deal.featured && (
                            <Badge variant="secondary" className="bg-[#F59E0B] text-white">
                              <Star className="w-3 h-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Eye className="w-4 h-4" />
                          {deal.views}
                        </div>
                      </div>
                      <CardTitle className="text-lg group-hover:text-[#0F7377] transition-colors">
                        {deal.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">{deal.description}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Building2 className="w-3 h-3" />
                        {deal.company}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Deal Value</p>
                          <p className="text-lg font-bold text-[#0F7377]">{formatCurrency(deal.value)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Equity</p>
                          <p className="text-lg font-bold">{deal.equity}%</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Location:</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {deal.location}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Industry:</span>
                          <span>{deal.industry}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Team Size:</span>
                          <span>{deal.teamSize} people</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Revenue:</span>
                          <span>{formatCurrency(deal.revenue)}/year</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-xs text-muted-foreground mb-2">Key Investors:</p>
                        <div className="flex flex-wrap gap-1">
                          {deal.investors.slice(0, 2).map((investor, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {investor}
                            </Badge>
                          ))}
                          {deal.investors.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{deal.investors.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            {deal.likes}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {getDaysUntilDeadline(deal.deadline)} days left
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button className="flex-1" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Recent Deals Tab */}
            <TabsContent value="recent" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[#1E293B] mb-4">Recently Closed Deals</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {recentDeals.map((deal) => (
                    <Card key={deal.id} className="hover:shadow-lg transition-all duration-200">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Closed
                          </Badge>
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <CardTitle className="text-lg">{deal.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{deal.company}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="text-2xl font-bold text-[#0F7377]">
                            {formatCurrency(deal.value)}
                          </div>
                          <Button size="sm" variant="outline">
                            <ArrowRight className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Closed on {new Date(deal.date).toLocaleDateString()}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[#1E293B] mb-4">Deal Analytics</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5" />
                        Total Deal Value
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-[#0F7377]">$50.2M</div>
                      <p className="text-sm text-muted-foreground">+12% from last month</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        Success Rate
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-[#0F7377]">85%</div>
                      <p className="text-sm text-muted-foreground">+5% from last quarter</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        Active Investors
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-[#0F7377]">156</div>
                      <p className="text-sm text-muted-foreground">+23 new this month</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        Avg. Time to Close
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-[#0F7377]">45 days</div>
                      <p className="text-sm text-muted-foreground">-8 days from average</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
} 