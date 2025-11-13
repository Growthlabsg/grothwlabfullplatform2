"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft, 
  Mail, 
  ExternalLink, 
  Star, 
  Clock, 
  MapPin, 
  Globe, 
  Users, 
  TrendingUp, 
  Lightbulb, 
  Award, 
  MessageSquare, 
  Calendar, 
  Zap, 
  Briefcase, 
  GraduationCap,
  Share2,
  Heart,
  BookOpen,
  Target,
  CheckCircle,
  ChevronRight,
  Phone,
  FileText,
  Shield,
  Gavel,
  DollarSign,
  Users2,
  AlertCircle,
  Info,
  Download,
  ExternalLink as ExternalLinkIcon
} from "lucide-react"
import Link from "next/link"

// Mock data for individual agency
const AGENCY = {
  id: "1",
  name: "Enterprise Singapore",
  logo: "/enterprise-sg-logo.png",
  description: "Singapore's government agency championing enterprise development",
  category: "Economic Development",
  location: "Singapore",
  website: "https://www.enterprisesg.gov.sg",
  contactEmail: "info@enterprisesg.gov.sg",
  contactPhone: "+65 6898 1800",
  address: "230 Victoria Street, #09-00, Bugis Junction Towers, Singapore 188024",
  verified: true,
  rating: 4.8,
  reviews: 156,
  featured: true,
  programs: [
    {
      name: "Startup SG Founder",
      description: "Mentorship and funding for first-time entrepreneurs",
      funding: "Up to $50,000",
      duration: "6 months",
      status: "Active",
      eligibility: "First-time entrepreneurs with innovative business ideas",
      applicationProcess: "Submit business plan and pitch deck, attend interview",
      successRate: "15%",
      keyBenefits: [
        "One-on-one mentorship from experienced entrepreneurs",
        "Access to co-working spaces",
        "Networking opportunities",
        "Business development support"
      ]
    },
    {
      name: "Startup SG Tech",
      description: "Proof-of-concept and market validation grants",
      funding: "Up to $250,000",
      duration: "18 months",
      status: "Active",
      eligibility: "Tech startups with innovative solutions",
      applicationProcess: "Submit technical proposal and market analysis",
      successRate: "25%",
      keyBenefits: [
        "Technical validation support",
        "Market research funding",
        "IP protection assistance",
        "Industry partnership opportunities"
      ]
    },
    {
      name: "Startup SG Accelerator",
      description: "Accelerator program for high-potential startups",
      funding: "Up to $500,000",
      duration: "12 months",
      status: "Active",
      eligibility: "High-growth startups with proven traction",
      applicationProcess: "Submit growth metrics and expansion plans",
      successRate: "10%",
      keyBenefits: [
        "Intensive acceleration program",
        "International market access",
        "Investment readiness support",
        "Strategic partnership development"
      ]
    }
  ],
  regulations: [
    {
      name: "Business Registration Requirements",
      description: "Requirements for registering a business in Singapore",
      category: "Business Setup",
      status: "Active",
      lastUpdated: "2024-01-15",
      keyPoints: [
        "Must register with ACRA within 14 days of starting business",
        "Requires local director or resident director",
        "Minimum paid-up capital of $1",
        "Must have registered office address"
      ],
      documents: [
        "Business Registration Form",
        "Identity documents",
        "Registered office address proof",
        "Director's declaration"
      ]
    },
    {
      name: "Foreign Investment Guidelines",
      description: "Guidelines for foreign investors and companies",
      category: "Investment",
      status: "Active",
      lastUpdated: "2024-02-20",
      keyPoints: [
        "No restrictions on foreign ownership in most sectors",
        "Requires local director for private companies",
        "Certain sectors require government approval",
        "Foreign companies must register branch office"
      ],
      documents: [
        "Foreign Investment Application",
        "Company incorporation documents",
        "Director's background check",
        "Business plan and financial projections"
      ]
    },
    {
      name: "Intellectual Property Protection",
      description: "Guidelines for protecting intellectual property",
      category: "IP Protection",
      status: "Active",
      lastUpdated: "2024-01-10",
      keyPoints: [
        "Register trademarks with IPOS",
        "File patents for innovative technologies",
        "Protect trade secrets through contracts",
        "Consider copyright registration for creative works"
      ],
      documents: [
        "Trademark Application Form",
        "Patent Specification",
        "IP Assignment Agreements",
        "Confidentiality Agreements"
      ]
    },
    {
      name: "Employment Pass Regulations",
      description: "Regulations for hiring foreign talent",
      category: "Employment",
      status: "Active",
      lastUpdated: "2024-03-01",
      keyPoints: [
        "Requires minimum salary thresholds",
        "Must demonstrate local hiring efforts",
        "Quota system for certain industries",
        "Renewal requirements and conditions"
      ],
      documents: [
        "Employment Pass Application",
        "Job description and requirements",
        "Company financial statements",
        "Local hiring efforts documentation"
      ]
    }
  ],
  insights: [
    {
      title: "Build Local Partnerships First",
      description: "Focus on building strong local partnerships before expanding regionally. Local partners can help navigate regulatory requirements and provide market insights.",
      category: "Strategy",
      author: "Enterprise Singapore Team",
      date: "2024-03-15"
    },
    {
      title: "Compliance from Day One",
      description: "Ensure compliance with MAS regulations for fintech startups. Start building compliance frameworks early in your development process.",
      category: "Compliance",
      author: "Regulatory Affairs Team",
      date: "2024-03-10"
    },
    {
      title: "Leverage Government Grants",
      description: "Leverage government grants to reduce initial capital requirements. These grants can provide significant financial support for early-stage startups.",
      category: "Funding",
      author: "Grants Management Team",
      date: "2024-03-05"
    },
    {
      title: "University R&D Collaboration",
      description: "Build relationships with local universities for R&D collaboration. Universities can provide technical expertise and access to research facilities.",
      category: "Innovation",
      author: "Innovation Partnerships Team",
      date: "2024-02-28"
    }
  ],
  employeeTestimonials: [
    {
      name: "Sarah Lim",
      position: "Senior Manager, Startup Development",
      experience: "8 years",
      department: "Startup Ecosystem",
      photo: "/sarah-lim.png",
      insight: "The most successful startups are those that understand the local market first before scaling regionally. Take advantage of our mentorship programs and build strong relationships with local partners. Many startups underestimate the importance of regulatory compliance - start early and build it into your business model from day one.",
      contactEmail: "sarah.lim@enterprisesg.gov.sg",
      expertise: ["Startup Mentorship", "Market Entry Strategy", "Regulatory Compliance"],
      availability: "Available for consultation"
    },
    {
      name: "David Tan",
      position: "Director, Innovation Programs",
      experience: "12 years",
      department: "Innovation & Technology",
      photo: "/david-tan.png",
      insight: "Many startups underestimate the importance of regulatory compliance. Start early and build it into your business model from day one. The regulatory landscape is constantly evolving, so stay informed and build flexible compliance frameworks.",
      contactEmail: "david.tan@enterprisesg.gov.sg",
      expertise: ["Innovation Strategy", "Technology Commercialization", "IP Protection"],
      availability: "Available for consultation"
    },
    {
      name: "Michelle Chen",
      position: "Assistant Director, International Markets",
      experience: "10 years",
      department: "International Business",
      photo: "/michelle-chen.png",
      insight: "Singapore's strategic location makes it an ideal launchpad for regional expansion. Focus on building strong local partnerships and understanding cultural nuances in target markets.",
      contactEmail: "michelle.chen@enterprisesg.gov.sg",
      expertise: ["International Expansion", "Market Entry Strategy", "Partnership Development"],
      availability: "Available for consultation"
    }
  ],
  resources: [
    {
      name: "Startup Guide Singapore",
      description: "Comprehensive guide for starting a business in Singapore",
      type: "PDF",
      size: "2.5 MB",
      lastUpdated: "2024-03-01",
      downloadUrl: "#"
    },
    {
      name: "Funding Application Templates",
      description: "Templates for various funding application forms",
      type: "ZIP",
      size: "1.2 MB",
      lastUpdated: "2024-02-15",
      downloadUrl: "#"
    },
    {
      name: "Regulatory Compliance Checklist",
      description: "Checklist for ensuring regulatory compliance",
      type: "PDF",
      size: "800 KB",
      lastUpdated: "2024-03-10",
      downloadUrl: "#"
    },
    {
      name: "Market Research Reports",
      description: "Industry-specific market research reports",
      type: "PDF",
      size: "5.1 MB",
      lastUpdated: "2024-02-28",
      downloadUrl: "#"
    }
  ],
  upcomingEvents: [
    {
      name: "Startup SG Founder Info Session",
      date: "2024-04-15",
      time: "2:00 PM - 4:00 PM",
      location: "Enterprise Singapore Office",
      description: "Information session for the Startup SG Founder program",
      registrationUrl: "#"
    },
    {
      name: "Regulatory Compliance Workshop",
      date: "2024-04-20",
      time: "10:00 AM - 12:00 PM",
      location: "Virtual Event",
      description: "Workshop on regulatory compliance for startups",
      registrationUrl: "#"
    },
    {
      name: "International Market Entry Seminar",
      date: "2024-04-25",
      time: "3:00 PM - 5:00 PM",
      location: "Enterprise Singapore Office",
      description: "Seminar on expanding to international markets",
      registrationUrl: "#"
    }
  ]
}

export default function AgencyDetailPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8">
        <Link href="/network/government-agencies" className="flex items-center text-[#0F7377] hover:underline mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Government Agencies
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Agency Profile Card */}
        <div className="md:col-span-1">
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="h-32 w-32 relative rounded-lg overflow-hidden border border-gray-200 bg-white mx-auto mb-4">
                  <img
                    src={AGENCY.logo}
                    alt={AGENCY.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h1 className="text-2xl font-bold mb-2">{AGENCY.name}</h1>
                <p className="text-[#334155] mb-2">{AGENCY.category}</p>
                <p className="text-sm text-[#334155] mb-4">{AGENCY.location}</p>
                
                <div className="flex items-center justify-center gap-2 mb-4">
                  {AGENCY.verified && (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100">
                      <Shield className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                  {AGENCY.featured && (
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-100">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-center gap-4 text-sm text-[#334155] mb-6">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-500" />
                    {AGENCY.rating} ({AGENCY.reviews} reviews)
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-[#334155]" />
                  <span>{AGENCY.address}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-[#334155]" />
                  <span>{AGENCY.contactPhone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-[#334155]" />
                  <span>{AGENCY.contactEmail}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="h-4 w-4 text-[#334155]" />
                  <a href={AGENCY.website} target="_blank" rel="noopener noreferrer" className="text-[#0F7377] hover:underline">
                    Official Website
                  </a>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Agency
                </Button>
                <Button variant="outline" className="w-full">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Schedule Consultation
                </Button>
                <Button variant="outline" className="w-full">
                  <Heart className="h-4 w-4 mr-2" />
                  Save to Favorites
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h4 className="font-medium mb-3">Quick Stats</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Active Programs:</span>
                    <span className="font-medium">{AGENCY.programs.filter(p => p.status === "Active").length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Regulations:</span>
                    <span className="font-medium">{AGENCY.regulations.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Resources:</span>
                    <span className="font-medium">{AGENCY.resources.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Upcoming Events:</span>
                    <span className="font-medium">{AGENCY.upcomingEvents.length}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="programs">Programs</TabsTrigger>
              <TabsTrigger value="regulations">Regulations</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>About {AGENCY.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#334155] mb-4">{AGENCY.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <h4 className="font-medium mb-3">Key Programs</h4>
                      <div className="space-y-2">
                        {AGENCY.programs.slice(0, 3).map((program) => (
                          <div key={program.name} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <span className="text-sm font-medium">{program.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {program.funding}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">Key Regulations</h4>
                      <div className="space-y-2">
                        {AGENCY.regulations.slice(0, 3).map((regulation) => (
                          <div key={regulation.name} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <span className="text-sm font-medium">{regulation.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {regulation.category}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {AGENCY.upcomingEvents.map((event, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium">{event.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {new Date(event.date).toLocaleDateString()}
                          </Badge>
                        </div>
                        <p className="text-sm text-[#334155] mb-2">{event.description}</p>
                        <div className="flex items-center gap-4 text-xs text-[#334155]">
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {event.time}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {event.location}
                          </span>
                        </div>
                        <Button size="sm" className="mt-3">
                          Register
                          <ExternalLinkIcon className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resources & Downloads</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {AGENCY.resources.map((resource, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium text-sm">{resource.name}</h4>
                          <p className="text-xs text-[#334155]">{resource.description}</p>
                          <div className="flex items-center gap-4 mt-1 text-xs text-[#334155]">
                            <span>{resource.type}</span>
                            <span>{resource.size}</span>
                            <span>Updated: {resource.lastUpdated}</span>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="programs" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Available Programs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {AGENCY.programs.map((program, index) => (
                      <div key={index} className="border rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-xl font-semibold mb-2">{program.name}</h4>
                            <p className="text-[#334155] mb-3">{program.description}</p>
                          </div>
                          <Badge variant={program.status === "Active" ? "default" : "secondary"}>
                            {program.status}
                          </Badge>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <h5 className="font-medium mb-2">Program Details</h5>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Funding:</span>
                                <span className="font-medium">{program.funding}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Duration:</span>
                                <span className="font-medium">{program.duration}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Success Rate:</span>
                                <span className="font-medium">{program.successRate}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h5 className="font-medium mb-2">Eligibility</h5>
                            <p className="text-sm text-[#334155]">{program.eligibility}</p>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <h5 className="font-medium mb-2">Application Process</h5>
                          <p className="text-sm text-[#334155]">{program.applicationProcess}</p>
                        </div>
                        
                        <div className="mb-4">
                          <h5 className="font-medium mb-2">Key Benefits</h5>
                          <ul className="space-y-1">
                            {program.keyBenefits.map((benefit, idx) => (
                              <li key={idx} className="flex items-start text-sm">
                                <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <Button className="w-full">
                          Apply Now
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="regulations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Regulatory Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {AGENCY.regulations.map((regulation, index) => (
                      <div key={index} className="border rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-xl font-semibold mb-2">{regulation.name}</h4>
                            <p className="text-[#334155] mb-3">{regulation.description}</p>
                          </div>
                          <Badge variant="outline">{regulation.category}</Badge>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h5 className="font-medium mb-3">Key Points</h5>
                            <ul className="space-y-2">
                              {regulation.keyPoints.map((point, idx) => (
                                <li key={idx} className="flex items-start text-sm">
                                  <Info className="h-4 w-4 mr-2 mt-0.5 text-blue-500 flex-shrink-0" />
                                  {point}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="font-medium mb-3">Required Documents</h5>
                            <ul className="space-y-2">
                              {regulation.documents.map((doc, idx) => (
                                <li key={idx} className="flex items-start text-sm">
                                  <FileText className="h-4 w-4 mr-2 mt-0.5 text-gray-500 flex-shrink-0" />
                                  {doc}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t">
                          <div className="flex items-center justify-between text-sm text-[#334155]">
                            <span>Status: <Badge variant="outline" className="ml-1">{regulation.status}</Badge></span>
                            <span>Last Updated: {regulation.lastUpdated}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Key Insights & Guidance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {AGENCY.insights.map((insight, index) => (
                      <div key={index} className="border-l-4 border-[#0F7377] pl-4">
                        <div className="flex items-start gap-3">
                          <Lightbulb className="h-5 w-5 text-yellow-500 mt-0.5" />
                          <div>
                            <h4 className="font-medium mb-2">{insight.title}</h4>
                            <p className="text-[#334155] mb-2">{insight.description}</p>
                            <div className="flex items-center gap-4 text-xs text-[#334155]">
                              <Badge variant="outline">{insight.category}</Badge>
                              <span>By {insight.author}</span>
                              <span>{insight.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="team" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Meet Our Team</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {AGENCY.employeeTestimonials.map((employee, index) => (
                      <div key={index} className="border rounded-lg p-6">
                        <div className="flex items-start gap-4">
                          <div className="h-16 w-16 relative rounded-lg overflow-hidden border border-gray-200 bg-white flex-shrink-0">
                            <img
                              src={employee.photo}
                              alt={employee.name}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="font-semibold">{employee.name}</h4>
                                <p className="text-sm text-[#334155]">{employee.position}</p>
                                <p className="text-xs text-[#334155]">{employee.department}</p>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {employee.experience} experience
                              </Badge>
                            </div>
                            
                            <p className="text-[#334155] mb-3">{employee.insight}</p>
                            
                            <div className="mb-3">
                              <h5 className="font-medium mb-2">Expertise</h5>
                              <div className="flex flex-wrap gap-2">
                                {employee.expertise.map((exp, idx) => (
                                  <Badge key={idx} variant="secondary" className="text-xs">
                                    {exp}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline">
                                <Mail className="h-3 w-3 mr-1" />
                                Contact
                              </Button>
                              <Badge variant="outline" className="text-xs">
                                {employee.availability}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
} 