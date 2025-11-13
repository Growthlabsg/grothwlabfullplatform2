"use client"

import { useState } from "react"
import { GrowthLabLayout } from "@/components/layout/growthlab-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Edit,
  Share2,
  Shield,
  Globe,
  MapPin,
  Calendar,
  Users,
  Building,
  Award,
  FileText,
  BarChart2,
  LinkIcon,
  Linkedin,
  Twitter,
  Facebook,
  ExternalLink,
  Mail,
  Plus,
} from "lucide-react"
import Link from "next/link"

export function StartupProfile() {
  const [activeTab, setActiveTab] = useState("overview")
  const [profileCompleteness, setProfileCompleteness] = useState(75)

  // Mock startup data
  const startup = {
    name: "TechNova",
    logo: "/abstract-geometric-shapes.png",
    tagline: "Revolutionizing the future of AI-powered healthcare",
    stage: "Seed",
    industry: "HealthTech",
    founded: "2023",
    location: "Singapore",
    website: "https://technova.ai",
    email: "contact@technova.ai",
    isVerified: true,
    description:
      "TechNova is developing cutting-edge AI solutions for healthcare providers to improve patient outcomes and reduce costs. Our platform uses machine learning algorithms to analyze medical data and provide actionable insights for healthcare professionals.",
    socialLinks: {
      linkedin: "https://linkedin.com/company/technova",
      twitter: "https://twitter.com/technova",
      facebook: "https://facebook.com/technova",
    },
    team: [
      {
        name: "John Doe",
        role: "Founder & CEO",
        avatar: "/abstract-letter-jt.png",
        linkedin: "https://linkedin.com/in/johndoe",
      },
      {
        name: "Alice Smith",
        role: "CTO",
        avatar: "/abstract-geometric-aw.png",
        linkedin: "https://linkedin.com/in/alicesmith",
      },
      {
        name: "Michael Chen",
        role: "Head of Product",
        avatar: "/abstract-ms-flow.png",
        linkedin: "https://linkedin.com/in/michaelchen",
      },
    ],
    investors: [
      {
        name: "Sequoia Capital",
        logo: "/abstract-colorful-swirls.png",
        website: "https://sequoiacap.com",
      },
      {
        name: "GrowthLab",
        logo: "/rising-tide-startups.png",
                  website: "https://growthlab.sg",
      },
    ],
    metrics: {
      funding: "$2.5M",
      employees: "12",
      customers: "8",
      revenue: "$150K ARR",
      growth: "+25% MoM",
    },
    highlights: [
              "Graduated from GrowthLab W23 batch",
      "Won the HealthTech Innovation Award 2023",
      "Featured in TechCrunch and Forbes Asia",
      "Partnerships with 3 major hospitals in Singapore",
    ],
  }

  return (
    <GrowthLabLayout>
      <div className="container py-8">
        <div className="max-w-7xl mx-auto">
          <Card className="mb-6">
            <CardContent className="p-0">
              <div className="relative">
                <div className="h-48 bg-gradient-to-r from-[#0F7377] to-[#0A5559]"></div>
                <div className="absolute left-8 -bottom-16">
                  <Avatar className="h-32 w-32 border-4 border-background">
                    <AvatarImage src={startup.logo || "/placeholder.svg"} alt={startup.name} />
                    <AvatarFallback>{startup.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="absolute right-8 bottom-4 flex gap-2">
                  <Button variant="outline" className="bg-background/80 backdrop-blur-sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </div>
              <div className="mt-20 p-8 pt-0">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-3xl font-bold">{startup.name}</h1>
                      {startup.isVerified && (
                        <Badge variant="outline" className="bg-primary/10 text-primary">
                          <Shield className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground mt-1">{startup.tagline}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" />
                        {startup.location}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        Founded {startup.founded}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Building className="h-4 w-4 mr-1" />
                        {startup.industry}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <BarChart2 className="h-4 w-4 mr-1" />
                        {startup.stage} Stage
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-4">
                      <Button variant="outline" size="sm" asChild>
                        <a href={startup.website} target="_blank" rel="noopener noreferrer">
                          <Globe className="h-4 w-4 mr-2" />
                          Website
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href={`mailto:${startup.email}`}>
                          <Mail className="h-4 w-4 mr-2" />
                          Contact
                        </a>
                      </Button>
                      {startup.socialLinks.linkedin && (
                        <Button variant="outline" size="icon" asChild>
                          <a href={startup.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                            <Linkedin className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      {startup.socialLinks.twitter && (
                        <Button variant="outline" size="icon" asChild>
                          <a href={startup.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                            <Twitter className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      {startup.socialLinks.facebook && (
                        <Button variant="outline" size="icon" asChild>
                          <a href={startup.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                            <Facebook className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <Card className="w-64">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Profile Completeness</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <Progress value={profileCompleteness} className="h-2" />
                          <p className="text-xs text-muted-foreground">{profileCompleteness}% complete</p>
                          <Button variant="outline" size="sm" className="w-full mt-2">
                            Complete Profile
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="investors">Investors</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="updates">Updates</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>About</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{startup.description}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Highlights</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {startup.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start">
                            <Award className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Team</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {startup.team.map((member, index) => (
                          <div key={index} className="flex flex-col items-center text-center p-4 border rounded-lg">
                            <Avatar className="h-16 w-16 mb-2">
                              <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <h3 className="font-medium">{member.name}</h3>
                            <p className="text-sm text-muted-foreground">{member.role}</p>
                            {member.linkedin && (
                              <Button variant="ghost" size="sm" className="mt-2" asChild>
                                <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                                  <Linkedin className="h-4 w-4 mr-2" />
                                  LinkedIn
                                </a>
                              </Button>
                            )}
                          </div>
                        ))}
                        <div className="flex flex-col items-center justify-center p-4 border rounded-lg border-dashed">
                          <Button variant="outline" size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Team Member
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Total Funding</div>
                          <div className="text-2xl font-bold">{startup.metrics.funding}</div>
                        </div>
                        <Separator />
                        <div>
                          <div className="text-sm text-muted-foreground">Employees</div>
                          <div className="text-2xl font-bold">{startup.metrics.employees}</div>
                        </div>
                        <Separator />
                        <div>
                          <div className="text-sm text-muted-foreground">Customers</div>
                          <div className="text-2xl font-bold">{startup.metrics.customers}</div>
                        </div>
                        <Separator />
                        <div>
                          <div className="text-sm text-muted-foreground">Revenue</div>
                          <div className="text-2xl font-bold">{startup.metrics.revenue}</div>
                        </div>
                        <Separator />
                        <div>
                          <div className="text-sm text-muted-foreground">Growth</div>
                          <div className="text-2xl font-bold text-green-500">{startup.metrics.growth}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Investors</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {startup.investors.map((investor, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={investor.logo || "/placeholder.svg"} alt={investor.name} />
                              <AvatarFallback>{investor.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">{investor.name}</h3>
                              <Button variant="link" size="sm" className="p-0 h-auto" asChild>
                                <a href={investor.website} target="_blank" rel="noopener noreferrer">
                                  <LinkIcon className="h-3 w-3 mr-1" />
                                  Website
                                </a>
                              </Button>
                            </div>
                          </div>
                        ))}
                        <Button variant="outline" size="sm" className="w-full">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Investor
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Links</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                          <Link href="/startup/pitch-deck-builder">
                            <FileText className="h-4 w-4 mr-2" />
                            Pitch Deck Builder
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                          <Link href="/startup/business-plan">
                            <FileText className="h-4 w-4 mr-2" />
                            Business Plan
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                          <Link href="/funding">
                            <BarChart2 className="h-4 w-4 mr-2" />
                            Funding Opportunities
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                          <Link href="/mentor">
                            <Users className="h-4 w-4 mr-2" />
                            Find Mentors
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="team">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Team Members</CardTitle>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Team Member
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {startup.team.map((member, index) => (
                      <div key={index} className="flex flex-col items-center text-center p-6 border rounded-lg">
                        <Avatar className="h-24 w-24 mb-4">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <h3 className="text-lg font-medium">{member.name}</h3>
                        <p className="text-muted-foreground">{member.role}</p>
                        <div className="flex mt-4 gap-2">
                          {member.linkedin && (
                            <Button variant="outline" size="icon" asChild>
                              <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                                <Linkedin className="h-4 w-4" />
                              </a>
                            </Button>
                          )}
                          <Button variant="outline" size="icon">
                            <Mail className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="investors">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Investors</CardTitle>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Investor
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {startup.investors.map((investor, index) => (
                      <div key={index} className="p-6 border rounded-lg">
                        <div className="flex items-center gap-4 mb-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={investor.logo || "/placeholder.svg"} alt={investor.name} />
                            <AvatarFallback>{investor.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-lg font-medium">{investor.name}</h3>
                            <Button variant="link" size="sm" className="p-0 h-auto" asChild>
                              <a href={investor.website} target="_blank" rel="noopener noreferrer">
                                <LinkIcon className="h-3 w-3 mr-1" />
                                Website
                              </a>
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Investment Round</span>
                            <span>Seed</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Investment Date</span>
                            <span>Jan 2023</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Investment Amount</span>
                            <span>$1.5M</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Documents</CardTitle>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Upload Document
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Pitch Deck", type: "pdf", size: "2.4 MB", date: "Feb 15, 2025" },
                      { name: "Business Plan", type: "docx", size: "1.8 MB", date: "Jan 28, 2025" },
                      { name: "Financial Projections", type: "xlsx", size: "3.2 MB", date: "Jan 10, 2025" },
                      { name: "Market Research", type: "pdf", size: "5.1 MB", date: "Dec 5, 2024" },
                    ].map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="bg-muted h-10 w-10 rounded-md flex items-center justify-center">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">{doc.name}</h3>
                            <p className="text-xs text-muted-foreground">
                              {doc.type.toUpperCase()} • {doc.size} • Uploaded on {doc.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4 mr-2"
                            >
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="7 10 12 15 17 10" />
                              <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="updates">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Updates</CardTitle>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Post Update
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      {
                        title: "Closed our Seed Round",
                        date: "Feb 10, 2025",
                        content:
                          "We're excited to announce that we've closed our $2.5M seed round led by Sequoia Capital with participation from GrowthLab. This funding will help us accelerate our product development and expand our team.",
                      },
                      {
                        title: "New Partnership with Singapore General Hospital",
                        date: "Jan 15, 2025",
                        content:
                          "We've partnered with Singapore General Hospital to pilot our AI diagnostic tool. This partnership will provide valuable real-world data and feedback to improve our product.",
                      },
                      {
                        title: "Product Launch",
                        date: "Dec 5, 2024",
                        content:
                          "Today we're launching the beta version of our AI diagnostic tool. We're looking for early adopters to provide feedback and help us refine the product.",
                      },
                    ].map((update, index) => (
                      <div key={index} className="border-b pb-6 last:border-0 last:pb-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium">{update.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {update.date}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">{update.content}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </GrowthLabLayout>
  )
}
