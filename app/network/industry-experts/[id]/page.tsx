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
  ChevronRight
} from "lucide-react"
import Link from "next/link"

// Mock data for individual expert
const EXPERT = {
  id: "1",
  name: "Dr. Sarah Chen",
  avatar: "/fintech-expert.png",
  title: "Chief Technology Officer",
  company: "FinTech Innovations Ltd",
  industry: "Financial Technology",
  location: "Singapore",
  yearsExperience: "15+ years",
  expertise: ["Blockchain", "Digital Payments", "RegTech", "AI in Finance"],
  bio: "Leading fintech expert with experience in building scalable payment solutions and regulatory technology. Former VP at major banks with deep knowledge of Southeast Asian markets.",
  detailedBio: `Dr. Sarah Chen is a seasoned fintech executive with over 15 years of experience in the financial technology sector. She has led technology teams at major banks and fintech startups, specializing in payment systems, regulatory technology, and blockchain applications.

Her expertise spans across digital payments, regulatory compliance, and artificial intelligence applications in finance. She has successfully launched multiple fintech products that have served millions of users across Southeast Asia.

Dr. Chen holds a PhD in Computer Science from Stanford University and has been recognized as one of the top 50 women in fintech by FinTech Magazine.`,
  insights: [
    {
      title: "Regulatory Compliance First",
      description: "Always build with compliance in mind from day one. It's much harder to retrofit regulatory requirements later.",
      category: "Strategy"
    },
    {
      title: "Partnership Approach",
      description: "Build strong relationships with traditional financial institutions. They can be your biggest allies or competitors.",
      category: "Partnerships"
    },
    {
      title: "Security Investment",
      description: "Invest heavily in security and fraud prevention early. The cost of a security breach far exceeds prevention costs.",
      category: "Security"
    },
    {
      title: "Local Market Understanding",
      description: "Deeply understand local payment preferences and behaviors. What works in one market may not work in another.",
      category: "Market Research"
    }
  ],
  contactEmail: "sarah.chen@fintechinnovations.com",
  linkedin: "https://linkedin.com/in/sarahchen",
  website: "https://fintechinnovations.com",
  verified: true,
  rating: 4.9,
  reviews: 127,
  availability: "Available for consultation",
  hourlyRate: "$500",
  languages: ["English", "Mandarin", "Malay"],
  certifications: ["CFA", "CISSP", "AWS Solutions Architect"],
  featured: true,
  services: [
    {
      title: "Fintech Strategy Consulting",
      description: "Help startups develop comprehensive fintech strategies",
      duration: "2-4 weeks",
      price: "$5,000"
    },
    {
      title: "Regulatory Compliance Review",
      description: "Review and optimize compliance frameworks",
      duration: "1-2 weeks", 
      price: "$3,000"
    },
    {
      title: "Technical Architecture Review",
      description: "Review and improve technical architecture",
      duration: "1 week",
      price: "$2,500"
    }
  ],
  testimonials: [
    {
      name: "Alex Tan",
      company: "PayTech Solutions",
      rating: 5,
      comment: "Dr. Chen helped us navigate complex regulatory requirements and build a robust compliance framework. Her expertise was invaluable."
    },
    {
      name: "Maria Santos",
      company: "DigitalPay",
      rating: 5,
      comment: "Sarah's strategic guidance helped us scale our payment platform from 10K to 1M users. Highly recommended!"
    },
    {
      name: "David Kim",
      company: "BlockchainPay",
      rating: 4,
      comment: "Excellent technical knowledge and practical advice. She helped us avoid costly mistakes in our fintech journey."
    }
  ],
  education: [
    {
      degree: "PhD in Computer Science",
      institution: "Stanford University",
      year: "2010"
    },
    {
      degree: "MBA",
      institution: "Harvard Business School", 
      year: "2008"
    },
    {
      degree: "BS in Computer Science",
      institution: "MIT",
      year: "2006"
    }
  ],
  experience: [
    {
      title: "Chief Technology Officer",
      company: "FinTech Innovations Ltd",
      duration: "2020 - Present",
      description: "Leading technology strategy and product development for fintech solutions"
    },
    {
      title: "VP of Engineering",
      company: "Digital Bank Asia",
      duration: "2015 - 2020", 
      description: "Managed engineering teams and launched multiple digital banking products"
    },
    {
      title: "Senior Software Engineer",
      company: "TechCorp",
      duration: "2010 - 2015",
      description: "Developed scalable payment systems and blockchain applications"
    }
  ]
}

export default function ExpertProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8">
        <Link href="/network/industry-experts" className="flex items-center text-[#0F7377] hover:underline mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Industry Experts
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Expert Profile Card */}
        <div className="md:col-span-1">
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="h-32 w-32 relative rounded-lg overflow-hidden border border-gray-200 bg-white mx-auto mb-4">
                  <img
                    src={EXPERT.avatar}
                    alt={EXPERT.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h1 className="text-2xl font-bold mb-2">{EXPERT.name}</h1>
                <p className="text-[#334155] mb-2">{EXPERT.title}</p>
                <p className="text-sm text-[#334155] mb-4">{EXPERT.company}</p>
                
                <div className="flex items-center justify-center gap-2 mb-4">
                  {EXPERT.verified && (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100">
                      <Award className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                  {EXPERT.featured && (
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-100">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-center gap-4 text-sm text-[#334155] mb-6">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-500" />
                    {EXPERT.rating} ({EXPERT.reviews} reviews)
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-[#334155]" />
                  <span>{EXPERT.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-[#334155]" />
                  <span>{EXPERT.yearsExperience}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Zap className="h-4 w-4 text-[#334155]" />
                  <span>{EXPERT.hourlyRate}/hr</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-[#334155]" />
                  <span>{EXPERT.availability}</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Expert
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
                <h4 className="font-medium mb-3">Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {EXPERT.languages.map((language) => (
                    <Badge key={language} variant="secondary" className="text-xs">
                      {language}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-medium mb-3">Certifications</h4>
                <div className="flex flex-wrap gap-2">
                  {EXPERT.certifications.map((cert) => (
                    <Badge key={cert} variant="outline" className="text-xs">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>About {EXPERT.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#334155] mb-4">{EXPERT.detailedBio}</p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <h4 className="font-medium mb-3">Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {EXPERT.expertise.map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">Industry</h4>
                      <Badge variant="outline">{EXPERT.industry}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {EXPERT.education.map((edu, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <GraduationCap className="h-5 w-5 text-[#0F7377] mt-0.5" />
                        <div>
                          <p className="font-medium">{edu.degree}</p>
                          <p className="text-sm text-[#334155]">{edu.institution}</p>
                          <p className="text-xs text-[#334155]">{edu.year}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {EXPERT.experience.map((exp, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Briefcase className="h-5 w-5 text-[#0F7377] mt-0.5" />
                        <div>
                          <p className="font-medium">{exp.title}</p>
                          <p className="text-sm text-[#334155]">{exp.company}</p>
                          <p className="text-xs text-[#334155]">{exp.duration}</p>
                          <p className="text-sm text-[#334155] mt-1">{exp.description}</p>
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
                  <CardTitle>Key Insights & Lessons</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {EXPERT.insights.map((insight, index) => (
                      <div key={index} className="border-l-4 border-[#0F7377] pl-4">
                        <div className="flex items-start gap-3">
                          <Lightbulb className="h-5 w-5 text-yellow-500 mt-0.5" />
                          <div>
                            <h4 className="font-medium mb-2">{insight.title}</h4>
                            <p className="text-[#334155] mb-2">{insight.description}</p>
                            <Badge variant="outline" className="text-xs">
                              {insight.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="services" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Consulting Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {EXPERT.services.map((service, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium">{service.title}</h4>
                          <Badge variant="outline">{service.price}</Badge>
                        </div>
                        <p className="text-[#334155] mb-3">{service.description}</p>
                        <div className="flex items-center gap-4 text-sm text-[#334155]">
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {service.duration}
                          </span>
                        </div>
                        <Button className="mt-3" size="sm">
                          Book Service
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Client Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {EXPERT.testimonials.map((review, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-medium">{review.name}</p>
                            <p className="text-sm text-[#334155]">{review.company}</p>
                          </div>
                          <div className="flex items-center">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-500" />
                            ))}
                          </div>
                        </div>
                        <p className="text-[#334155]">{review.comment}</p>
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