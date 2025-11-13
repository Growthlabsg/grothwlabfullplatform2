"use client"

import { useState } from "react"
import { GrowthLabLayout } from "@/components/layout/growthlab-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Filter, MapPin, Star, Clock, Users, CheckCircle, ChevronDown } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export function MentorshipMatching() {
  const [searchQuery, setSearchQuery] = useState("")
  const [industryFilter, setIndustryFilter] = useState("")
  const [expertiseFilter, setExpertiseFilter] = useState("")
  const [availabilityFilter, setAvailabilityFilter] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  // Mock mentors data
  const mentors = [
    {
      id: "1",
      name: "Sarah Johnson",
      avatar: "/abstract-letter-jt.png",
      title: "Startup Advisor & Angel Investor",
      company: "Former VP at Google",
      location: "Singapore",
      rating: 4.9,
      reviews: 24,
      sessions: 56,
      availability: "Next available: Tomorrow",
      industries: ["Tech", "SaaS", "AI"],
      expertise: ["Fundraising", "Product Strategy", "Go-to-Market"],
      bio: "Former VP at Google with 15+ years of experience in tech. I've helped 20+ startups raise over $50M in funding. I specialize in product strategy, go-to-market, and fundraising.",
      price: "Free",
      verified: true,
      featured: true,
    },
    {
      id: "2",
      name: "Michael Chen",
      avatar: "/abstract-ms-flow.png",
      title: "Serial Entrepreneur & Investor",
      company: "Founder of TechVentures",
      location: "Singapore",
      rating: 4.8,
      reviews: 18,
      sessions: 42,
      availability: "Next available: This week",
      industries: ["FinTech", "E-commerce", "Marketplace"],
      expertise: ["Business Model", "Scaling", "Team Building"],
      bio: "Serial entrepreneur with 3 successful exits. I've built and scaled companies from 0 to $100M+ in revenue. I can help with business model validation, scaling strategies, and team building.",
      price: "$150/hour",
      verified: true,
      featured: false,
    },
    {
      id: "3",
      name: "Emily Wong",
      avatar: "/stylized-letters.png",
      title: "Marketing Executive",
      company: "CMO at StartupX",
      location: "Singapore",
      rating: 4.7,
      reviews: 15,
      sessions: 38,
      availability: "Next available: This week",
      industries: ["Consumer", "Retail", "Healthcare"],
      expertise: ["Marketing", "Branding", "Growth"],
      bio: "Marketing executive with experience at both startups and Fortune 500 companies. I specialize in building brands, growth marketing, and customer acquisition strategies.",
      price: "$100/hour",
      verified: true,
      featured: false,
    },
    {
      id: "4",
      name: "David Tan",
      avatar: "/abstract-geometric-aw.png",
      title: "Tech Lead & Engineering Manager",
      company: "CTO at HealthTech",
      location: "Singapore",
      rating: 4.6,
      reviews: 12,
      sessions: 30,
      availability: "Next available: Next week",
      industries: ["HealthTech", "EdTech", "DevTools"],
      expertise: ["Technical Architecture", "Engineering Leadership", "Product Development"],
      bio: "Experienced CTO and engineering leader with a background in building scalable products. I can help with technical architecture, engineering team management, and product development.",
      price: "$120/hour",
      verified: true,
      featured: false,
    },
  ]

  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch =
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.bio.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesIndustry =
      !industryFilter || mentor.industries.some((i) => i.toLowerCase() === industryFilter.toLowerCase())
    const matchesExpertise =
      !expertiseFilter || mentor.expertise.some((e) => e.toLowerCase() === expertiseFilter.toLowerCase())
    const matchesAvailability =
      !availabilityFilter || mentor.availability.toLowerCase().includes(availabilityFilter.toLowerCase())

    return matchesSearch && matchesIndustry && matchesExpertise && matchesAvailability
  })

  return (
    <GrowthLabLayout>
      <div className="container py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold">Find a Mentor</h1>
              <p className="text-muted-foreground">Connect with experienced mentors to help grow your startup</p>
            </div>
            <Button asChild>
              <Link href="/mentorship/become-mentor">Become a Mentor</Link>
            </Button>
          </div>

          <div className="mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name, expertise, or industry..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                    <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showFilters ? "rotate-180" : ""}`} />
                  </Button>
                  <Button>Search</Button>
                </div>

                {showFilters && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Industry</label>
                      <Select value={industryFilter} onValueChange={setIndustryFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Industries</SelectItem>
                          <SelectItem value="Tech">Tech</SelectItem>
                          <SelectItem value="SaaS">SaaS</SelectItem>
                          <SelectItem value="AI">AI</SelectItem>
                          <SelectItem value="FinTech">FinTech</SelectItem>
                          <SelectItem value="HealthTech">HealthTech</SelectItem>
                          <SelectItem value="E-commerce">E-commerce</SelectItem>
                          <SelectItem value="EdTech">EdTech</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Expertise</label>
                      <Select value={expertiseFilter} onValueChange={setExpertiseFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select expertise" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Expertise</SelectItem>
                          <SelectItem value="Fundraising">Fundraising</SelectItem>
                          <SelectItem value="Product Strategy">Product Strategy</SelectItem>
                          <SelectItem value="Go-to-Market">Go-to-Market</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="Scaling">Scaling</SelectItem>
                          <SelectItem value="Technical Architecture">Technical Architecture</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Availability</label>
                      <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select availability" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any Time</SelectItem>
                          <SelectItem value="Tomorrow">Available Tomorrow</SelectItem>
                          <SelectItem value="This week">Available This Week</SelectItem>
                          <SelectItem value="Next week">Available Next Week</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {filteredMentors.length > 0 ? (
              filteredMentors.map((mentor) => (
                <Card key={mentor.id} className={mentor.featured ? "border-primary" : ""}>
                  {mentor.featured && (
                    <div className="bg-primary text-primary-foreground text-center py-1 text-xs font-medium">
                      Featured Mentor
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex flex-col items-center text-center md:w-48">
                        <Avatar className="h-24 w-24 mb-3">
                          <AvatarImage src={mentor.avatar || "/placeholder.svg"} alt={mentor.name} />
                          <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <h3 className="font-medium">{mentor.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{mentor.title}</p>
                        <p className="text-xs text-muted-foreground">{mentor.company}</p>
                        <div className="flex items-center mt-2">
                          <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{mentor.location}</span>
                        </div>
                        <div className="flex items-center mt-4">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span className="ml-1 font-medium">{mentor.rating}</span>
                          <span className="text-xs text-muted-foreground ml-1">({mentor.reviews} reviews)</span>
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                          <div className="space-y-4 flex-1">
                            <div>
                              <h4 className="font-medium mb-1">About</h4>
                              <p className="text-sm text-muted-foreground">{mentor.bio}</p>
                            </div>

                            <div>
                              <h4 className="font-medium mb-1">Industry Expertise</h4>
                              <div className="flex flex-wrap gap-2">
                                {mentor.industries.map((industry, index) => (
                                  <Badge key={index} variant="secondary">
                                    {industry}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium mb-1">Areas of Focus</h4>
                              <div className="flex flex-wrap gap-2">
                                {mentor.expertise.map((expertise, index) => (
                                  <Badge key={index} variant="outline">
                                    {expertise}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="md:w-64 space-y-4">
                            <div className="bg-muted p-4 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <div className="text-sm font-medium">Session Fee</div>
                                <div className="font-bold">{mentor.price}</div>
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground mb-2">
                                <Clock className="h-4 w-4 mr-2" />
                                <span>{mentor.availability}</span>
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground mb-4">
                                <Users className="h-4 w-4 mr-2" />
                                <span>{mentor.sessions} sessions completed</span>
                              </div>
                              <Button className="w-full">Book a Session</Button>
                              <Button variant="outline" className="w-full mt-2">
                                View Profile
                              </Button>
                            </div>

                            {mentor.verified && (
                              <div className="flex items-center text-sm">
                                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                                <span>Verified Mentor</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Search className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No mentors found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search or filter criteria to find mentors that match your needs.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("")
                      setIndustryFilter("")
                      setExpertiseFilter("")
                      setAvailabilityFilter("")
                    }}
                  >
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </GrowthLabLayout>
  )
}
