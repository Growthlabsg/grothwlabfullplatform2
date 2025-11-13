"use client"

import { useState, useEffect, use } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useJobs } from "@/contexts/JobContext"
import {
  Building,
  Globe,
  Users,
  TrendingUp,
  Calendar,
  MapPin,
  Mail,
  ExternalLink,
  Briefcase,
  Star,
  Share2,
  MessageSquare,
  ChevronLeft,
  Zap,
  Award,
  BarChart3,
  Layers,
  Clock,
  Heart,
  Bookmark,
  Send,
  Phone,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  DollarSign,
  Target,
  CheckCircle,
  ArrowRight,
  Eye,
  ThumbsUp,
  MessageCircle,
  Plus,
  Minus,
  ChevronDown,
  ChevronUp,
  Download,
  Upload,
  Bell,
  Settings,
  Edit,
  Trash2,
  MoreHorizontal,
  Filter,
  Search,
  SortAsc,
  SortDesc,
  Grid,
  List
} from "lucide-react"
import Link from "next/link"

// Mock business data
const MOCK_BUSINESSES = {
  "1": {
    id: "1",
    name: "TechNova Solutions",
    handle: "technova",
    description: "Leading AI-powered enterprise solutions",
    longDescription: "TechNova Solutions is a cutting-edge technology company specializing in artificial intelligence and machine learning solutions for enterprise clients. We help businesses transform their operations through innovative AI technologies.",
    industry: "Artificial Intelligence",
    size: "25-50",
    location: "Singapore",
    foundedYear: 2020,
    logo: "TN",
    coverImage: "/images/technova-cover.jpg",
    website: "https://technova.com",
    contactInfo: {
      email: "contact@technova.com",
      phone: "+65 6123 4567",
      address: "123 Innovation Drive, Singapore 123456"
    },
    followers: 2500,
    employees: 35,
    verified: true,
    featured: true,
    tagline: "Empowering businesses with AI",
    mission: "To democratize AI technology for businesses of all sizes",
    vision: "A world where AI enhances human potential",
    values: ["Innovation", "Excellence", "Collaboration", "Impact"],
    specialties: ["Machine Learning", "Natural Language Processing", "Computer Vision", "Data Analytics"],
    services: ["AI Consulting", "Custom AI Solutions", "AI Training", "Support"],
    targetAudience: "Enterprise businesses",
    businessModel: "B2B SaaS",
    fundingStage: "Series A",
    revenue: "$5M ARR",
    socialMedia: {
      linkedin: "https://linkedin.com/company/technova",
      twitter: "https://twitter.com/technova",
      facebook: "https://facebook.com/technova",
      instagram: "https://instagram.com/technova"
    },
    team: [
      {
        name: "Sarah Chen",
        role: "CEO & Co-founder",
        avatar: "/images/sarah-chen.jpg",
        bio: "Former Google AI researcher with 10+ years experience"
      },
      {
        name: "Michael Rodriguez",
        role: "CTO & Co-founder",
        avatar: "/images/michael-rodriguez.jpg",
        bio: "Ex-Microsoft engineer, AI specialist"
      }
    ],
    milestones: [
      {
        date: "2024-01-15",
        title: "Series A Funding",
        description: "Raised $10M in Series A funding led by Sequoia Capital"
      },
      {
        date: "2023-12-01",
        title: "Product Launch",
        description: "Launched our flagship AI platform for enterprise clients"
      }
    ],
    achievements: [
      "Forbes 30 Under 30",
      "Best AI Startup 2023",
      "ISO 27001 Certified"
    ]
  }
}

export default function BusinessProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { getJobsByCompany } = useJobs()
  const [activeTab, setActiveTab] = useState("overview")
  const [isFollowing, setIsFollowing] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [showAllJobs, setShowAllJobs] = useState(false)
  const [businessJobs, setBusinessJobs] = useState<any[]>([])
  const [jobsLoading, setJobsLoading] = useState(false)

  // Use React's use hook to unwrap the params Promise
  const { id: businessId } = use(params)
  const business = MOCK_BUSINESSES[businessId as keyof typeof MOCK_BUSINESSES]

  // Load jobs for this business
  useEffect(() => {
    setJobsLoading(true)
    try {
      const jobs = getJobsByCompany(businessId)
      setBusinessJobs(jobs)
    } catch (error) {
      console.error('Error loading jobs:', error)
      setBusinessJobs([])
    } finally {
      setJobsLoading(false)
    }
  }, [businessId, getJobsByCompany])

  if (!business) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Business Not Found</h1>
          <p className="text-gray-600 mb-6">The business you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/business">Back to Businesses</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="outline" asChild>
            <Link href="/business">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Businesses
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border mb-8">
          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-[#0F7377] to-[#0F7377]/80 rounded-t-lg relative">
            <div className="absolute inset-0 bg-black/20 rounded-t-lg"></div>
            <div className="absolute bottom-4 right-4">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="bg-white/90">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm" className="bg-white/90">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-white/90"
                  onClick={() => setIsFollowing(!isFollowing)}
                >
                  {isFollowing ? "Following" : "Follow"}
                </Button>
              </div>
            </div>
          </div>

          {/* Business Info */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                  <AvatarFallback className="text-2xl font-bold bg-[#0F7377] text-white">
                    {business.logo}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h1 className="text-3xl font-bold text-gray-900">{business.name}</h1>
                      {business.verified && (
                        <Badge variant="outline" className="bg-blue-100 text-blue-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-lg text-gray-600 mb-2">{business.tagline}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {business.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Building className="h-4 w-4" />
                        {business.industry}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {business.size} employees
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Founded {business.foundedYear}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-4 md:mt-0">
                    <Button variant="outline" size="sm">
                      <Bookmark className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                      <Send className="h-4 w-4 mr-2" />
                      Contact
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Followers</span>
                  <span className="font-semibold">{business.followers.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Employees</span>
                  <span className="font-semibold">{business.employees}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Founded</span>
                  <span className="font-semibold">{business.foundedYear}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Funding Stage</span>
                  <span className="font-semibold">{business.fundingStage}</span>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{business.contactInfo.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{business.contactInfo.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{business.contactInfo.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-gray-500" />
                  <a 
                    href={business.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-[#0F7377] hover:underline"
                  >
                    {business.website}
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Social Media</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <a href={business.socialMedia.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href={business.socialMedia.twitter} target="_blank" rel="noopener noreferrer">
                      <Twitter className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href={business.socialMedia.facebook} target="_blank" rel="noopener noreferrer">
                      <Facebook className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href={business.socialMedia.instagram} target="_blank" rel="noopener noreferrer">
                      <Instagram className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
                <TabsTrigger value="jobs">Jobs</TabsTrigger>
                <TabsTrigger value="milestones">Milestones</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About {business.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed mb-4">{business.longDescription}</p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2">Mission</h4>
                        <p className="text-gray-600 text-sm">{business.mission}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Vision</h4>
                        <p className="text-gray-600 text-sm">{business.vision}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Specialties</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {business.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Jobs Tab */}
              <TabsContent value="jobs" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Open Positions</CardTitle>
                    <CardDescription>Join our growing team at {business.name}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {jobsLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0F7377]"></div>
                        <span className="ml-2 text-gray-600">Loading jobs...</span>
                      </div>
                    ) : businessJobs.length === 0 ? (
                      <div className="text-center py-8">
                        <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Open Positions</h3>
                        <p className="text-gray-600 mb-4">This business doesn't have any active job postings at the moment.</p>
                        <Button asChild>
                          <Link href="/jobs/find-startup-jobs">Browse All Jobs</Link>
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {businessJobs.slice(0, showAllJobs ? businessJobs.length : 3).map((job) => (
                          <div key={job.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h4 className="font-semibold text-lg">{job.title}</h4>
                                <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                                  <span className="flex items-center gap-1">
                                    <Briefcase className="h-4 w-4" />
                                    {job.department}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    {job.type}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    {job.location}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <DollarSign className="h-4 w-4" />
                                    {job.salary}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 mb-3">
                                {job.visaSponsorship && (
                                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Visa Sponsorship
                                  </Badge>
                                )}
                                {job.featured && (
                                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                                    <Star className="h-3 w-3 mr-1" />
                                    Featured
                                  </Badge>
                                )}
                              </div>
                              <Button 
                                size="sm" 
                                className="bg-[#0F7377] hover:bg-[#0F7377]/90 text-white font-semibold"
                                asChild
                              >
                                <Link href={`/jobs/find-startup-jobs?job=${job.id}`}>
                                  Apply Now
                                </Link>
                              </Button>
                            </div>
                            <p className="text-gray-700 mb-3">{job.description}</p>
                            <div className="flex flex-wrap gap-1">
                              {job.skills.slice(0, 5).map((skill) => (
                                <Badge key={skill} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                              {job.skills.length > 5 && (
                                <Badge variant="outline" className="text-xs">
                                  +{job.skills.length - 5} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        ))}
                        
                        {businessJobs.length > 3 && !showAllJobs && (
                          <div className="text-center pt-4">
                            <Button 
                              variant="outline" 
                              onClick={() => setShowAllJobs(true)}
                            >
                              View All {businessJobs.length} Jobs
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Other tabs would go here */}
              <TabsContent value="about" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Company Values</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {business.values.map((value) => (
                        <div key={value} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-[#0F7377]" />
                          <span>{value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="team" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Our Team</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      {business.team.map((member, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">{member.name}</h4>
                            <p className="text-sm text-gray-600">{member.role}</p>
                            <p className="text-xs text-gray-500">{member.bio}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="milestones" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Company Milestones</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {business.milestones.map((milestone, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="w-3 h-3 bg-[#0F7377] rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <h4 className="font-semibold">{milestone.title}</h4>
                            <p className="text-sm text-gray-600">{milestone.description}</p>
                            <p className="text-xs text-gray-500">{new Date(milestone.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="contact" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Get in Touch</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Email</h4>
                        <a 
                          href={`mailto:${business.contactInfo.email}`}
                          className="text-[#0F7377] hover:underline"
                        >
                          {business.contactInfo.email}
                        </a>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Phone</h4>
                        <a 
                          href={`tel:${business.contactInfo.phone}`}
                          className="text-[#0F7377] hover:underline"
                        >
                          {business.contactInfo.phone}
                        </a>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Address</h4>
                        <p className="text-gray-600">{business.contactInfo.address}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
