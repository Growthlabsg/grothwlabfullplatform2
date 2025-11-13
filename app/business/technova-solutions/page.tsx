"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Building, 
  MapPin, 
  Users, 
  Calendar, 
  Globe, 
  Mail, 
  Phone, 
  Linkedin, 
  Twitter,
  Star,
  Award,
  TrendingUp,
  Target,
  Lightbulb,
  Shield,
  Heart,
  Share2,
  ExternalLink
} from "lucide-react"

export default function TechNovaBusinessPage() {
  const [isFollowing, setIsFollowing] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const businessData = {
    id: "1",
    name: "TechNova Solutions",
    tagline: "Revolutionizing Enterprise Workflow with AI-Powered Automation",
    description: "TechNova Solutions is a cutting-edge AI company specializing in enterprise workflow automation. Our flagship product, AutoFlow AI, transforms how businesses operate by intelligently automating complex processes and decision-making workflows.",
    logo: "TN",
    industry: "Artificial Intelligence",
    foundedYear: 2021,
    companySize: "25-50 employees",
    location: "Singapore",
    website: "https://technova-solutions.com",
    email: "contact@technova-solutions.com",
    phone: "+65 6123 4567",
    linkedin: "https://linkedin.com/company/technova-solutions",
    twitter: "https://twitter.com/technova_ai",
    fundingStage: "Series A",
    totalFunding: "$8.5M",
    lastFunding: "2023",
    investors: ["Sequoia Capital", "Accel Partners", "500 Global"],
    revenue: "$2.1M ARR",
    growthRate: "340% YoY",
    customers: "150+",
    teamSize: 28,
    headquarters: "Singapore",
    offices: ["Singapore", "San Francisco"],
    mission: "To democratize AI-powered automation for businesses of all sizes, making complex workflows simple and intelligent.",
    vision: "A world where every business can leverage AI to optimize their operations and achieve unprecedented efficiency.",
    values: ["Innovation", "Excellence", "Collaboration", "Impact", "Transparency"],
    culture: {
      workEnvironment: "Hybrid-first with flexible hours",
      teamDynamics: "Collaborative and cross-functional",
      learning: "Continuous learning with $5K annual budget per employee",
      diversity: "Committed to building diverse and inclusive teams",
      benefits: ["Health Insurance", "Stock Options", "Learning Budget", "Flexible Hours", "Work from Home"]
    },
    products: [
      {
        name: "AutoFlow AI",
        description: "Enterprise workflow automation platform powered by advanced AI",
        status: "Live",
        users: "150+ companies"
      },
      {
        name: "FlowBuilder",
        description: "Visual workflow design tool for non-technical users",
        status: "Beta",
        users: "50+ companies"
      }
    ],
    achievements: [
      "Winner of Singapore AI Innovation Award 2023",
      "Featured in TechCrunch for breakthrough in workflow automation",
      "Recognized as Top 10 AI Startups in Southeast Asia",
      "ISO 27001 certified for data security"
    ],
    news: [
      {
        title: "TechNova Solutions Raises $8.5M Series A",
        date: "2023-11-15",
        source: "TechCrunch"
      },
      {
        title: "AutoFlow AI Reaches 150+ Enterprise Customers",
        date: "2024-01-10",
        source: "Company Blog"
      }
    ],
    openPositions: 2,
    recentHires: [
      { name: "Dr. Sarah Chen", role: "Head of AI Research", date: "2024-01-15" },
      { name: "Marcus Rodriguez", role: "Senior Frontend Developer", date: "2024-01-10" }
    ]
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0F7377] to-[#0F7377]/80 text-white">
        <div className="container mx-auto max-w-7xl px-4 py-12">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-6">
              <div className="h-24 w-24 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
                <span className="text-2xl font-bold text-white">{businessData.logo}</span>
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">{businessData.name}</h1>
                <p className="text-xl text-white/90 mb-4">{businessData.tagline}</p>
                <div className="flex items-center gap-6 text-white/80">
                  <span className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    {businessData.industry}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {businessData.location}
                  </span>
                  <span className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {businessData.companySize}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Founded {businessData.foundedYear}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setIsFollowing(!isFollowing)}
                className="border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-[#0F7377] font-semibold shadow-lg"
              >
                {isFollowing ? "Following" : "Follow"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsSaved(!isSaved)}
                className="border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-[#0F7377] font-semibold shadow-lg"
              >
                {isSaved ? "Saved" : "Save"}
              </Button>
              <Button
                variant="outline"
                className="border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-[#0F7377] font-semibold shadow-lg"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
                <TabsTrigger value="jobs">Jobs ({businessData.openPositions})</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About {businessData.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">{businessData.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2">Mission</h4>
                        <p className="text-gray-600">{businessData.mission}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Vision</h4>
                        <p className="text-gray-600">{businessData.vision}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Company Values</h4>
                      <div className="flex flex-wrap gap-2">
                        {businessData.values.map((value, index) => (
                          <Badge key={index} variant="outline" className="text-[#0F7377] border-[#0F7377]">
                            {value}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Key Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#0F7377]">{businessData.totalFunding}</div>
                        <div className="text-sm text-gray-600">Total Funding</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#0F7377]">{businessData.revenue}</div>
                        <div className="text-sm text-gray-600">Annual Revenue</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#0F7377]">{businessData.customers}</div>
                        <div className="text-sm text-gray-600">Customers</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#0F7377]">{businessData.growthRate}</div>
                        <div className="text-sm text-gray-600">Growth Rate</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Achievements & Recognition</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {businessData.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <Award className="h-5 w-5 text-yellow-500" />
                          <span className="text-gray-700">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="products" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Our Products</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {businessData.products.map((product, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-lg">{product.name}</h4>
                          <Badge variant={product.status === "Live" ? "default" : "secondary"}>
                            {product.status}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-2">{product.description}</p>
                        <p className="text-sm text-gray-500">{product.users}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="team" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Team Culture</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Work Environment</h4>
                        <p className="text-gray-600">{businessData.culture.workEnvironment}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Team Dynamics</h4>
                        <p className="text-gray-600">{businessData.culture.teamDynamics}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Learning & Development</h4>
                        <p className="text-gray-600">{businessData.culture.learning}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Diversity & Inclusion</h4>
                        <p className="text-gray-600">{businessData.culture.diversity}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Hires</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {businessData.recentHires.map((hire, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">{hire.name}</div>
                            <div className="text-sm text-gray-600">{hire.role}</div>
                          </div>
                          <div className="text-sm text-gray-500">{hire.date}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="jobs" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Open Positions</CardTitle>
                    <CardDescription>Join our growing team at {businessData.name}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-lg">AI Research Engineer</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                            <span className="flex items-center gap-1">
                              <Building className="h-4 w-4" />
                              Research & Development
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Full-time
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              Singapore
                            </span>
                            <span className="flex items-center gap-1">
                              <TrendingUp className="h-4 w-4" />
                              $10,000 - $15,000
                            </span>
                          </div>
                        </div>
                        <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90 text-white font-semibold">
                          Apply Now
                        </Button>
                      </div>
                      <p className="text-gray-700 mb-3">Join our AI research team to develop cutting-edge machine learning algorithms for enterprise workflow automation.</p>
                      <div className="text-xs text-gray-500">Posted 3 days ago • 28 applications</div>
                    </div>

                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-lg">Frontend Developer</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                            <span className="flex items-center gap-1">
                              <Building className="h-4 w-4" />
                              Engineering
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Full-time
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              Singapore
                            </span>
                            <span className="flex items-center gap-1">
                              <TrendingUp className="h-4 w-4" />
                              $6,500 - $9,500
                            </span>
                          </div>
                        </div>
                        <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90 text-white font-semibold">
                          Apply Now
                        </Button>
                      </div>
                      <p className="text-gray-700 mb-3">Build beautiful and intuitive user interfaces for our AutoFlow AI platform.</p>
                      <div className="text-xs text-gray-500">Posted 1 day ago • 42 applications</div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-gray-500" />
                  <a href={businessData.website} className="text-[#0F7377] hover:underline" target="_blank" rel="noopener noreferrer">
                    {businessData.website}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <a href={`mailto:${businessData.email}`} className="text-[#0F7377] hover:underline">
                    {businessData.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <a href={`tel:${businessData.phone}`} className="text-[#0F7377] hover:underline">
                    {businessData.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Linkedin className="h-4 w-4 text-gray-500" />
                  <a href={businessData.linkedin} className="text-[#0F7377] hover:underline" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Twitter className="h-4 w-4 text-gray-500" />
                  <a href={businessData.twitter} className="text-[#0F7377] hover:underline" target="_blank" rel="noopener noreferrer">
                    Twitter
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Funding Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Stage</span>
                  <span className="font-medium">{businessData.fundingStage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Raised</span>
                  <span className="font-medium">{businessData.totalFunding}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Funding</span>
                  <span className="font-medium">{businessData.lastFunding}</span>
                </div>
                <div>
                  <span className="text-gray-600 block mb-2">Investors</span>
                  <div className="space-y-1">
                    {businessData.investors.map((investor, index) => (
                      <div key={index} className="text-sm font-medium">{investor}</div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Company Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {businessData.culture.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-red-500" />
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
