"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  AppWindow, 
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
  Download,
  Play,
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
  Upload
} from "lucide-react"
import Link from "next/link"

export default function AppStorePage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")

  const categories = [
    { id: "all", name: "All Apps", icon: <AppWindow className="w-4 h-4" /> },
    { id: "productivity", name: "Productivity", icon: <Target className="w-4 h-4" /> },
    { id: "finance", name: "Finance", icon: <DollarSign className="w-4 h-4" /> },
    { id: "marketing", name: "Marketing", icon: <TrendingUp className="w-4 h-4" /> },
    { id: "communication", name: "Communication", icon: <MessageCircle className="w-4 h-4" /> },
    { id: "analytics", name: "Analytics", icon: <BarChart3 className="w-4 h-4" /> },
    { id: "crm", name: "CRM", icon: <Users className="w-4 h-4" /> },
    { id: "ecommerce", name: "E-commerce", icon: <ShoppingCart className="w-4 h-4" /> }
  ]

  const types = [
    { id: "all", name: "All Types" },
    { id: "trial", name: "Free Trial" },
    { id: "beta", name: "Beta Testing" },
    { id: "validation", name: "Validation" },
    { id: "demo", name: "Demo" }
  ]

  const apps = [
    {
      id: 1,
      title: "GrowthLab CRM Pro",
      creator: "GrowthLab Team",
      category: "crm",
      description: "Complete customer relationship management for startups with AI-powered insights",
      type: "trial",
      trialPeriod: "30 days",
      pricing: "Free trial, $29/month after",
      rating: 4.8,
      downloads: 1247,
      views: 3420,
      likes: 156,
      featured: true,
      validation: true,
      tags: ["CRM", "Sales", "AI", "Analytics"],
      company: "GrowthLab",
      users: 500,
      feedback: 89
    },
    {
      id: 2,
      title: "Startup Analytics Dashboard",
      creator: "DataFlow Solutions",
      category: "analytics",
      description: "Real-time analytics and reporting dashboard for startup metrics and KPIs",
      type: "beta",
      trialPeriod: "14 days",
      pricing: "Free during beta, $49/month after",
      rating: 4.9,
      downloads: 892,
      views: 2156,
      likes: 203,
      featured: true,
      validation: true,
      tags: ["Analytics", "Dashboard", "KPIs", "Real-time"],
      company: "DataFlow Solutions",
      users: 300,
      feedback: 67
    },
    {
      id: 3,
      title: "Pitch Deck Builder AI",
      creator: "SlideGenius",
      category: "productivity",
      description: "AI-powered pitch deck creation tool with templates and smart suggestions",
      type: "validation",
      trialPeriod: "7 days",
      pricing: "Free for validation, $19/month after",
      rating: 4.7,
      downloads: 567,
      views: 1890,
      likes: 89,
      featured: false,
      validation: true,
      tags: ["Pitch Deck", "AI", "Presentations", "Templates"],
      company: "SlideGenius",
      users: 200,
      feedback: 45
    },
    {
      id: 4,
      title: "Social Media Manager Pro",
      creator: "SocialSync",
      category: "marketing",
      description: "Schedule and manage all your social media posts with advanced analytics",
      type: "trial",
      trialPeriod: "21 days",
      pricing: "Free trial, $39/month after",
      rating: 4.6,
      downloads: 734,
      views: 2567,
      likes: 134,
      featured: false,
      validation: false,
      tags: ["Social Media", "Scheduling", "Analytics", "Marketing"],
      company: "SocialSync",
      users: 400,
      feedback: 78
    },
    {
      id: 5,
      title: "Financial Tracker Startup",
      creator: "FinanceFlow",
      category: "finance",
      description: "Track expenses, revenue, and financial projections for startups",
      type: "demo",
      trialPeriod: "Unlimited",
      pricing: "Completely free",
      rating: 4.5,
      downloads: 445,
      views: 1678,
      likes: 78,
      featured: false,
      validation: false,
      tags: ["Finance", "Expenses", "Budgeting", "Startup"],
      company: "FinanceFlow",
      users: 150,
      feedback: 34
    },
    {
      id: 6,
      title: "Team Communication Hub",
      creator: "TeamConnect",
      category: "communication",
      description: "All-in-one team communication and collaboration platform",
      type: "beta",
      trialPeriod: "45 days",
      pricing: "Free during beta, $5/user/month after",
      rating: 4.8,
      downloads: 1023,
      views: 2987,
      likes: 167,
      featured: true,
      validation: true,
      tags: ["Communication", "Team", "Collaboration", "Real-time"],
      company: "TeamConnect",
      users: 600,
      feedback: 123
    },
    {
      id: 7,
      title: "E-commerce Platform Lite",
      creator: "ShopEasy",
      category: "ecommerce",
      description: "Lightweight e-commerce solution for small businesses and startups",
      type: "validation",
      trialPeriod: "30 days",
      pricing: "Free for validation, $99/month after",
      rating: 4.7,
      downloads: 234,
      views: 890,
      likes: 45,
      featured: false,
      validation: true,
      tags: ["E-commerce", "Online Store", "Payments", "Inventory"],
      company: "ShopEasy",
      users: 100,
      feedback: 28
    },
    {
      id: 8,
      title: "Email Marketing Suite",
      creator: "MailMaster",
      category: "marketing",
      description: "Professional email marketing campaigns with advanced automation",
      type: "trial",
      trialPeriod: "14 days",
      pricing: "Free trial, $29/month after",
      rating: 4.6,
      downloads: 678,
      views: 1456,
      likes: 92,
      featured: false,
      validation: false,
      tags: ["Email", "Marketing", "Automation", "Campaigns"],
      company: "MailMaster",
      users: 350,
      feedback: 67
    }
  ]

  const validations = [
    {
      id: 1,
      name: "User Experience Testing",
      description: "Get feedback on your app's user experience and interface design",
      participants: 45,
      duration: "2 weeks",
      reward: "$50 gift card"
    },
    {
      id: 2,
      name: "Feature Validation",
      description: "Validate new features with real users before full launch",
      participants: 32,
      duration: "1 week",
      reward: "Early access + premium features"
    },
    {
      id: 3,
      name: "Performance Testing",
      description: "Test app performance under various conditions and loads",
      participants: 28,
      duration: "3 days",
      reward: "Performance report + optimization tips"
    }
  ]

  const filteredApps = apps.filter(app => {
    const matchesCategory = selectedCategory === "all" || app.category === selectedCategory
    const matchesSearch = app.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || app.type === selectedType
    return matchesCategory && matchesSearch && matchesType
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case "trial": return "bg-green-100 text-green-800"
      case "beta": return "bg-blue-100 text-blue-800"
      case "validation": return "bg-purple-100 text-purple-800"
      case "demo": return "bg-orange-100 text-orange-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "trial": return <Play className="w-4 h-4" />
      case "beta": return <Code className="w-4 h-4" />
      case "validation": return <CheckCircle className="w-4 h-4" />
      case "demo": return <Eye className="w-4 h-4" />
      default: return <AppWindow className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F7377] to-[#1E293B]">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center">
            <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">
              <AppWindow className="w-3 h-3 mr-1" />
              Community Software & Apps
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              App Store
            </h1>
            <p className="mb-8 mx-auto max-w-3xl text-lg text-white/90 md:text-xl">
              Discover and test software from our community. Try new apps, provide feedback, 
              and help validate innovative solutions from fellow entrepreneurs and companies.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row justify-center">
              <Button size="lg" className="bg-[#F59E0B] text-white hover:bg-[#F59E0B]/90">
                <AppWindow className="w-4 h-4 mr-2" />
                Submit Your App
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Download className="w-4 h-4 mr-2" />
                Browse Apps
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#1E293B] mb-2">Platform Statistics</h2>
            <p className="text-[#64748B]">Real-time data from our app testing community</p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center group hover:scale-105 transition-transform duration-200">
              <div className="text-4xl font-bold text-[#0F7377] md:text-5xl mb-2">
                <span className="animate-pulse">150+</span>
              </div>
              <div className="text-[#1E293B] font-medium">Apps Available</div>
              <div className="text-xs text-green-600 mt-1">+12 new this month</div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-200">
              <div className="text-4xl font-bold text-[#0F7377] md:text-5xl mb-2">
                <span className="animate-pulse">2.5K+</span>
              </div>
              <div className="text-[#1E293B] font-medium">Active Testers</div>
              <div className="text-xs text-green-600 mt-1">+156 new this week</div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-200">
              <div className="text-4xl font-bold text-[#0F7377] md:text-5xl mb-2">
                <span className="animate-pulse">4.8</span>
              </div>
              <div className="text-[#1E293B] font-medium">Average Rating</div>
              <div className="text-xs text-green-600 mt-1">+0.2 from last month</div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-200">
              <div className="text-4xl font-bold text-[#0F7377] md:text-5xl mb-2">
                <span className="animate-pulse">89</span>
              </div>
              <div className="text-[#1E293B] font-medium">Validations Completed</div>
              <div className="text-xs text-green-600 mt-1">+15 this quarter</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-[#F8FAFC] py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <Tabs defaultValue="apps" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="apps">Apps & Software</TabsTrigger>
              <TabsTrigger value="validations">Validations</TabsTrigger>
              <TabsTrigger value="submit">Submit App</TabsTrigger>
            </TabsList>

            {/* Apps Tab */}
            <TabsContent value="apps" className="space-y-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-[#1E293B]">Community Apps</h2>
                  <p className="text-[#64748B]">Try and test software from our community</p>
                </div>
                <div className="flex gap-4">
                  <Input
                    placeholder="Search apps..."
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
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      {types.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredApps.map((app) => (
                  <Card key={app.id} className="group hover:shadow-lg transition-all duration-200">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <Badge className={getTypeColor(app.type)}>
                            {getTypeIcon(app.type)}
                            {app.type === "trial" ? "Free Trial" : 
                             app.type === "beta" ? "Beta Testing" :
                             app.type === "validation" ? "Validation" : "Demo"}
                          </Badge>
                          {app.validation && (
                            <Badge variant="secondary" className="bg-[#0F7377] text-white">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Validation
                            </Badge>
                          )}
                          {app.featured && (
                            <Badge variant="secondary" className="bg-[#F59E0B] text-white">
                              <Star className="w-3 h-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Eye className="w-4 h-4" />
                          {app.views}
                        </div>
                      </div>
                      <CardTitle className="text-lg group-hover:text-[#0F7377] transition-colors">
                        {app.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">{app.description}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Building2 className="w-3 h-3" />
                        {app.company}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-wrap gap-1 mb-4">
                        {app.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Trial Period:</span>
                          <span className="font-medium">{app.trialPeriod}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Pricing:</span>
                          <span className="font-medium">{app.pricing}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Active Users:</span>
                          <span className="font-medium">{app.users}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Feedback:</span>
                          <span className="font-medium">{app.feedback} reviews</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Download className="w-4 h-4" />
                            {app.downloads}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            {app.rating}
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            {app.likes}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button className="flex-1" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Try App
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Validations Tab */}
            <TabsContent value="validations" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[#1E293B] mb-4">App Validations</h2>
                <p className="text-[#64748B] mb-6">Help validate and improve apps from our community</p>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {validations.map((validation) => (
                    <Card key={validation.id} className="hover:shadow-lg transition-all duration-200">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Badge className="bg-purple-100 text-purple-800">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Validation
                          </Badge>
                          <Clock className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <CardTitle className="text-lg">{validation.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{validation.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Participants:</span>
                            <span>{validation.participants}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Duration:</span>
                            <span>{validation.duration}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Reward:</span>
                            <span className="font-medium">{validation.reward}</span>
                          </div>
                        </div>
                        <Button size="sm" className="w-full">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Join Validation
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Submit App Tab */}
            <TabsContent value="submit" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[#1E293B] mb-4">Submit Your App</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AppWindow className="w-5 h-5" />
                        Submit for Testing
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        Submit your app for community testing and validation. Get valuable feedback from real users.
                      </p>
                      <Button className="w-full">
                        <Upload className="w-4 h-4 mr-2" />
                        Submit App
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MessageCircle className="w-5 h-5" />
                        Get Support
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        Need help with app submission or validation? Our team provides guidance and support.
                      </p>
                      <Button variant="outline" className="w-full">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Contact Support
                      </Button>
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