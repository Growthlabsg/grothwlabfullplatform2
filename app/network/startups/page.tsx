"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Search, 
  Filter, 
  MapPin, 
  Building, 
  Users, 
  TrendingUp, 
  Eye, 
  Lightbulb, 
  Target, 
  Globe, 
  Mail, 
  ArrowUpRight, 
  ChevronRight,
  Rocket,
  Award,
  Download,
  Star,
  TrendingDown,
  Calendar,
  DollarSign,
  SortAsc,
  SortDesc,
  ExternalLink,
  Heart,
  Share2
} from "lucide-react"
import Link from "next/link"

// Mock data for startups
const STARTUPS = [
  {
    id: "1",
    name: "TechNova Solutions",
    logo: "/Tennessee_Landscape.png",
    description: "AI-powered solutions for enterprise workflow automation and digital transformation",
    industry: "Artificial Intelligence",
    stage: "Series A",
    size: "11-50",
    location: "Singapore",
    funding: "$2.5M",
    employees: 25,
    views: 1240,
    growthRate: "45%",
    tags: ["AI", "Enterprise", "SaaS", "Automation"],
    hiring: true,
    openPositions: 8,
    partnerships: true,
    visaSponsorship: false,
    verified: true,
    foundedYear: 2020,
    website: "https://technova.sg",
    socialMedia: {
      linkedin: "https://linkedin.com/company/technova-solutions",
      twitter: "https://twitter.com/technova_sg"
    },
    keyMetrics: {
      customers: 150,
      revenue: 2500000,
      growth: 45
    },
    founders: ["Sarah Chen", "Michael Wong"],
    investors: ["Sequoia Capital", "Temasek"],
    featured: true,
    trending: true
  },
  {
    id: "2",
    name: "FinFlow Pro",
    logo: "/fintech-flow.png",
    description: "Next-generation financial technology platform for SMEs with integrated payment solutions",
    industry: "Financial Technology",
    stage: "Seed",
    size: "1-10",
    location: "Singapore",
    funding: "$500K",
    employees: 8,
    views: 890,
    growthRate: "120%",
    tags: ["FinTech", "SME", "Payments", "Banking"],
    hiring: false,
    openPositions: 0,
    partnerships: false,
    visaSponsorship: true,
    verified: false,
    foundedYear: 2022,
    website: "https://finflowpro.com",
    socialMedia: {
      linkedin: "https://linkedin.com/company/finflow-pro"
    },
    keyMetrics: {
      customers: 50,
      revenue: 500000,
      growth: 120
    },
    founders: ["David Lim", "Priya Sharma"],
    investors: ["500 Startups", "Local Angels"],
    featured: false,
    trending: false
  },
  {
    id: "3",
    name: "HealthTech Innovations",
    logo: "/machine-learning-concept.png",
    description: "Revolutionary healthcare technology solutions powered by AI and machine learning",
    industry: "Healthcare Technology",
    stage: "Series B",
    size: "51-200",
    location: "Singapore",
    funding: "$8.2M",
    employees: 120,
    views: 2100,
    growthRate: "78%",
    tags: ["Healthcare", "AI", "Telemedicine", "Diagnostics"],
    hiring: true,
    openPositions: 15,
    partnerships: true,
    visaSponsorship: true,
    verified: true,
    foundedYear: 2019,
    website: "https://healthtechinnovations.sg",
    socialMedia: {
      linkedin: "https://linkedin.com/company/healthtech-innovations",
      twitter: "https://twitter.com/healthtech_sg"
    },
    keyMetrics: {
      customers: 500,
      revenue: 8200000,
      growth: 78
    },
    founders: ["Dr. James Tan", "Dr. Lisa Ng"],
    investors: ["Temasek", "GIC", "Vertex Ventures"],
    featured: true,
    trending: true
  },
  {
    id: "4",
    name: "GreenTech Solutions",
    logo: "/placeholder.svg?height=64&width=64&query=green energy",
    description: "Sustainable technology solutions for carbon footprint reduction and renewable energy",
    industry: "Clean Technology",
    stage: "Series A",
    size: "11-50",
    location: "Singapore",
    funding: "$3.8M",
    employees: 35,
    views: 1560,
    growthRate: "92%",
    tags: ["CleanTech", "Sustainability", "Renewable Energy", "Carbon"],
    hiring: true,
    openPositions: 12,
    partnerships: true,
    visaSponsorship: true,
    verified: true,
    foundedYear: 2021,
    website: "https://greentech.sg",
    socialMedia: {
      linkedin: "https://linkedin.com/company/greentech-solutions",
      twitter: "https://twitter.com/greentech_sg"
    },
    keyMetrics: {
      customers: 200,
      revenue: 3800000,
      growth: 92
    },
    founders: ["Alex Chen", "Maria Rodriguez"],
    investors: ["Temasek", "EDB Investments"],
    featured: true,
    trending: false
  },
  {
    id: "5",
    name: "EduTech Academy",
    logo: "/placeholder.svg?height=64&width=64&query=education",
    description: "Interactive online learning platform with AI-powered personalized education",
    industry: "Education Technology",
    stage: "Seed",
    size: "1-10",
    location: "Singapore",
    funding: "$800K",
    employees: 12,
    views: 980,
    growthRate: "65%",
    tags: ["EdTech", "Online Learning", "AI", "Personalization"],
    hiring: true,
    openPositions: 5,
    partnerships: false,
    visaSponsorship: false,
    verified: false,
    foundedYear: 2022,
    website: "https://edutechacademy.com",
    socialMedia: {
      linkedin: "https://linkedin.com/company/edutech-academy"
    },
    keyMetrics: {
      customers: 1000,
      revenue: 800000,
      growth: 65
    },
    founders: ["Dr. Jennifer Lee", "Tom Wilson"],
    investors: ["500 Startups", "Local VCs"],
    featured: false,
    trending: true
  },
  {
    id: "6",
    name: "LogiFlow Systems",
    logo: "/placeholder.svg?height=64&width=64&query=logistics",
    description: "Smart logistics and supply chain management platform for e-commerce businesses",
    industry: "Logistics & Transportation",
    stage: "Series A",
    size: "11-50",
    location: "Singapore",
    funding: "$4.2M",
    employees: 28,
    views: 1340,
    growthRate: "58%",
    tags: ["Logistics", "Supply Chain", "E-commerce", "Automation"],
    hiring: true,
    openPositions: 7,
    partnerships: true,
    visaSponsorship: true,
    verified: true,
    foundedYear: 2020,
    website: "https://logiflow.sg",
    socialMedia: {
      linkedin: "https://linkedin.com/company/logiflow-systems"
    },
    keyMetrics: {
      customers: 300,
      revenue: 4200000,
      growth: 58
    },
    founders: ["Robert Kim", "Anna Zhang"],
    investors: ["Temasek", "GIC"],
    featured: false,
    trending: false
  },
  {
    id: "7",
    name: "AgriTech Innovations",
    logo: "/placeholder.svg?height=64&width=64&query=agriculture",
    description: "Smart farming solutions using IoT and AI for sustainable agriculture",
    industry: "Agricultural Technology",
    stage: "Pre-seed",
    size: "1-10",
    location: "Singapore",
    funding: "$200K",
    employees: 6,
    views: 650,
    growthRate: "180%",
    tags: ["AgriTech", "IoT", "Smart Farming", "Sustainability"],
    hiring: true,
    openPositions: 3,
    partnerships: false,
    visaSponsorship: false,
    verified: false,
    foundedYear: 2023,
    website: "https://agritechinnovations.com",
    socialMedia: {
      linkedin: "https://linkedin.com/company/agritech-innovations"
    },
    keyMetrics: {
      customers: 25,
      revenue: 200000,
      growth: 180
    },
    founders: ["Dr. Peter Tan", "Sarah Johnson"],
    investors: ["Government Grants", "Angel Investors"],
    featured: false,
    trending: true
  },
  {
    id: "8",
    name: "CyberShield Security",
    logo: "/placeholder.svg?height=64&width=64&query=cybersecurity",
    description: "Advanced cybersecurity solutions for enterprise protection and threat detection",
    industry: "Cybersecurity",
    stage: "Series B",
    size: "51-200",
    location: "Singapore",
    funding: "$12.5M",
    employees: 85,
    views: 2890,
    growthRate: "95%",
    tags: ["Cybersecurity", "Enterprise", "Threat Detection", "AI"],
    hiring: true,
    openPositions: 20,
    partnerships: true,
    visaSponsorship: true,
    verified: true,
    foundedYear: 2018,
    website: "https://cybershield.sg",
    socialMedia: {
      linkedin: "https://linkedin.com/company/cybershield-security",
      twitter: "https://twitter.com/cybershield_sg"
    },
    keyMetrics: {
      customers: 400,
      revenue: 12500000,
      growth: 95
    },
    founders: ["Dr. Michael Chen", "Lisa Wang"],
    investors: ["Temasek", "GIC", "Sequoia Capital"],
    featured: true,
    trending: true
  }
]

export default function StartupDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([])
  const [selectedStages, setSelectedStages] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false)
  const [showHiringOnly, setShowHiringOnly] = useState(false)
  const [showPartnershipsOnly, setShowPartnershipsOnly] = useState(false)
  const [sortBy, setSortBy] = useState("trending")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)
  const [showTrendingOnly, setShowTrendingOnly] = useState(false)

  const handleIndustryToggle = (industry: string) => {
    setSelectedIndustries(prev => 
      prev.includes(industry) 
        ? prev.filter(i => i !== industry)
        : [...prev, industry]
    )
  }

  const handleStageToggle = (stage: string) => {
    setSelectedStages(prev => 
      prev.includes(stage) 
        ? prev.filter(s => s !== stage)
        : [...prev, stage]
    )
  }

  const handleSizeToggle = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size)
        : [...prev, size]
    )
  }

  const clearAllFilters = () => {
    setSearchQuery("")
    setSelectedIndustries([])
    setSelectedStages([])
    setSelectedSizes([])
    setShowVerifiedOnly(false)
    setShowHiringOnly(false)
    setShowPartnershipsOnly(false)
    setShowFeaturedOnly(false)
    setShowTrendingOnly(false)
    setSortBy("trending")
    setSortOrder("desc")
  }

  const filteredStartups = STARTUPS.filter(startup => {
    const matchesSearch = startup.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         startup.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         startup.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesIndustry = selectedIndustries.length === 0 || selectedIndustries.includes(startup.industry)
    const matchesStage = selectedStages.length === 0 || selectedStages.includes(startup.stage)
    const matchesSize = selectedSizes.length === 0 || selectedSizes.includes(startup.size)
    const matchesVerified = !showVerifiedOnly || startup.verified
    const matchesHiring = !showHiringOnly || startup.hiring
    const matchesPartnerships = !showPartnershipsOnly || startup.partnerships
    const matchesFeatured = !showFeaturedOnly || startup.featured
    const matchesTrending = !showTrendingOnly || startup.trending

    return matchesSearch && matchesIndustry && matchesStage && matchesSize && 
           matchesVerified && matchesHiring && matchesPartnerships && matchesFeatured && matchesTrending
  })

  // Sort startups based on selected criteria
  const sortedStartups = [...filteredStartups].sort((a, b) => {
    let aValue: any, bValue: any

    switch (sortBy) {
      case "name":
        aValue = a.name.toLowerCase()
        bValue = b.name.toLowerCase()
        break
      case "funding":
        aValue = parseFloat(a.funding.replace(/[$,M]/g, ""))
        bValue = parseFloat(b.funding.replace(/[$,M]/g, ""))
        break
      case "growth":
        aValue = parseFloat(a.growthRate.replace("%", ""))
        bValue = parseFloat(b.growthRate.replace("%", ""))
        break
      case "views":
        aValue = a.views
        bValue = b.views
        break
      case "employees":
        aValue = a.employees
        bValue = b.employees
        break
      case "founded":
        aValue = a.foundedYear
        bValue = b.foundedYear
        break
      case "trending":
        aValue = a.trending ? 1 : 0
        bValue = b.trending ? 1 : 0
        break
      case "featured":
        aValue = a.featured ? 1 : 0
        bValue = b.featured ? 1 : 0
        break
      default:
        aValue = a.name.toLowerCase()
        bValue = b.name.toLowerCase()
    }

    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  const hasActiveFilters = searchQuery || selectedIndustries.length > 0 || 
                          selectedStages.length > 0 || selectedSizes.length > 0 || 
                          showVerifiedOnly || showHiringOnly || showPartnershipsOnly ||
                          showFeaturedOnly || showTrendingOnly

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Startup Directory</h1>
            <p className="text-[#334155] max-w-3xl">
              Discover innovative startups across Singapore and connect with founders, investors, and industry experts.
              Filter by industry, funding stage, and more to find the perfect match for your interests.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={clearAllFilters} disabled={!hasActiveFilters}>
              Clear Filters
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#334155]">Total Startups</p>
                  <p className="text-2xl font-bold">{STARTUPS.length}</p>
                </div>
                <Rocket className="h-8 w-8 text-[#0F7377]" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#334155]">Hiring Now</p>
                  <p className="text-2xl font-bold">{STARTUPS.filter(s => s.hiring).length}</p>
                </div>
                <Target className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#334155]">Verified</p>
                  <p className="text-2xl font-bold">{STARTUPS.filter(s => s.verified).length}</p>
                </div>
                <Award className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#334155]">Open Positions</p>
                  <p className="text-2xl font-bold">{STARTUPS.reduce((sum, s) => sum + s.openPositions, 0)}</p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <div className="sticky top-24 space-y-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Filters</h3>
                  {hasActiveFilters && (
                    <Badge variant="secondary" className="text-xs">
                      {sortedStartups.length} results
                    </Badge>
                  )}
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Industry</label>
                    <div className="space-y-2">
                      {["Artificial Intelligence", "Financial Technology", "Healthcare Technology", "Education Technology", "Clean Technology", "Logistics & Transportation", "Agricultural Technology", "Cybersecurity"].map((industry) => (
                        <div key={industry} className="flex items-center space-x-2">
                          <Checkbox
                            id={industry}
                            checked={selectedIndustries.includes(industry)}
                            onCheckedChange={() => handleIndustryToggle(industry)}
                          />
                          <label htmlFor={industry} className="text-sm">
                            {industry}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Funding Stage</label>
                    <div className="space-y-2">
                      {["Pre-seed", "Seed", "Series A", "Series B", "Series C", "IPO"].map((stage) => (
                        <div key={stage} className="flex items-center space-x-2">
                          <Checkbox
                            id={stage}
                            checked={selectedStages.includes(stage)}
                            onCheckedChange={() => handleStageToggle(stage)}
                          />
                          <label htmlFor={stage} className="text-sm">
                            {stage}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Company Size</label>
                    <div className="space-y-2">
                      {["1-10", "11-50", "51-200", "201-500", "500+"].map((size) => (
                        <div key={size} className="flex items-center space-x-2">
                          <Checkbox
                            id={size}
                            checked={selectedSizes.includes(size)}
                            onCheckedChange={() => handleSizeToggle(size)}
                          />
                          <label htmlFor={size} className="text-sm">
                            {size}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="verified"
                        checked={showVerifiedOnly}
                        onCheckedChange={(checked) => setShowVerifiedOnly(checked as boolean)}
                      />
                      <label htmlFor="verified" className="text-sm">Verified Only</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="hiring"
                        checked={showHiringOnly}
                        onCheckedChange={(checked) => setShowHiringOnly(checked as boolean)}
                      />
                      <label htmlFor="hiring" className="text-sm">Hiring Now</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="partnerships"
                        checked={showPartnershipsOnly}
                        onCheckedChange={(checked) => setShowPartnershipsOnly(checked as boolean)}
                      />
                      <label htmlFor="partnerships" className="text-sm">Open to Partnerships</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="featured"
                        checked={showFeaturedOnly}
                        onCheckedChange={(checked) => setShowFeaturedOnly(checked as boolean)}
                      />
                      <label htmlFor="featured" className="text-sm">Featured Only</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="trending"
                        checked={showTrendingOnly}
                        onCheckedChange={(checked) => setShowTrendingOnly(checked as boolean)}
                      />
                      <label htmlFor="trending" className="text-sm">Trending Only</label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="mb-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search startups by name, description, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Advanced Filters
              </Button>
            </div>
            
            {/* Sorting Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Sort by:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#0F7377]"
                  >
                    <option value="trending">Trending</option>
                    <option value="featured">Featured</option>
                    <option value="name">Name</option>
                    <option value="funding">Funding</option>
                    <option value="growth">Growth Rate</option>
                    <option value="views">Views</option>
                    <option value="employees">Employees</option>
                    <option value="founded">Founded Year</option>
                  </select>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                  className="gap-2"
                >
                  {sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
                  {sortOrder === "asc" ? "Ascending" : "Descending"}
                </Button>
              </div>
              <div className="text-sm text-gray-600">
                Showing {sortedStartups.length} of {STARTUPS.length} startups
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {sortedStartups.map((startup) => (
              <Card key={startup.id} className={`hover:shadow-lg transition-all duration-300 ${startup.featured ? 'ring-2 ring-[#0F7377] ring-opacity-20' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="h-20 w-20 relative rounded-xl overflow-hidden border border-gray-200 bg-white flex-shrink-0 shadow-sm">
                      <img
                        src={startup.logo}
                        alt={startup.name}
                        className="object-cover w-full h-full"
                      />
                      {startup.featured && (
                        <div className="absolute -top-1 -right-1">
                          <Star className="h-5 w-5 text-yellow-500 fill-current" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-bold text-gray-900">{startup.name}</h3>
                          {startup.verified && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100 text-xs">
                              <Award className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                          {startup.trending && (
                            <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-100 text-xs">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              Trending
                            </Badge>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="gap-1">
                            <Heart className="h-3 w-3" />
                            Save
                          </Button>
                          <Button size="sm" variant="outline" className="gap-1">
                            <Share2 className="h-3 w-3" />
                            Share
                          </Button>
                          <Button size="sm" variant="outline" className="gap-1">
                            <Mail className="h-3 w-3" />
                            Contact
                          </Button>
                          <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90" asChild>
                            <Link href={`/network/startups/${startup.id}`}>
                              View Profile
                              <ArrowUpRight className="ml-1 h-3 w-3" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4 leading-relaxed">{startup.description}</p>
                      
                      {/* Key Metrics */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-lg font-bold text-[#0F7377]">{startup.funding}</div>
                          <div className="text-xs text-gray-600">Total Funding</div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-lg font-bold text-green-600">{startup.growthRate}</div>
                          <div className="text-xs text-gray-600">Growth Rate</div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-lg font-bold text-blue-600">{startup.employees}</div>
                          <div className="text-xs text-gray-600">Employees</div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="text-lg font-bold text-purple-600">{startup.views}</div>
                          <div className="text-xs text-gray-600">Profile Views</div>
                        </div>
                      </div>

                      {/* Company Info */}
                      <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Building className="h-4 w-4" />
                          {startup.industry}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {startup.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Founded {startup.foundedYear}
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          {startup.stage}
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {startup.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs bg-gray-50 hover:bg-gray-100">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Action Badges */}
                      <div className="flex flex-wrap gap-2 items-center justify-between">
                        <div className="flex items-center gap-2">
                          {startup.hiring && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100 text-xs">
                              <Target className="h-3 w-3 mr-1" />
                              {startup.openPositions} positions
                            </Badge>
                          )}
                          {startup.partnerships && (
                            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-100 text-xs">
                              <Globe className="h-3 w-3 mr-1" />
                              Partnerships
                            </Badge>
                          )}
                          {startup.visaSponsorship && (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-100 text-xs">
                              <Globe className="h-3 w-3 mr-1" />
                              Visa Sponsorship
                            </Badge>
                          )}
                        </div>
                        {startup.website && (
                          <Button size="sm" variant="ghost" asChild>
                            <a href={startup.website} target="_blank" rel="noopener noreferrer" className="gap-1">
                              Website
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {sortedStartups.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="mb-4">
                    <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No startups found</h3>
                    <p className="text-[#334155] mb-4">
                      Try adjusting your search criteria or filters to find more startups.
                    </p>
                    <Button onClick={clearAllFilters} variant="outline">
                      Clear All Filters
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {sortedStartups.length > 0 && (
              <div className="flex justify-center mt-8">
                <Button variant="outline" className="gap-2">
                  View More Startups
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
