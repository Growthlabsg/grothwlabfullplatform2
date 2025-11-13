"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Search, 
  Users, 
  Star,
  MapPin,
  Calendar,
  ArrowRight,
  CheckCircle,
  MessageSquare,
  Heart,
  Award,
  Globe,
  Building2,
  Lightbulb,
  Target,
  Clock
} from "lucide-react"
import Link from "next/link"

export default function MentorshipPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const mentors = [
    {
      id: 1,
      name: "Sarah Chen",
      title: "Former VP, Google",
      company: "TechFlow",
      image: "/mentor-sarah.jpg",
      location: "Singapore",
      experience: "15+ years",
      rating: 4.9,
      sessions: 150,
      specialties: ["Product Strategy", "Leadership", "Scaling"],
      bio: "Former VP at Google with 15+ years in tech. Helped 50+ startups scale from idea to IPO.",
      availability: "Available",
      price: "SGD 200/hour",
      languages: ["English", "Mandarin"],
      industry: "SaaS",
      previousCompanies: ["Google", "Microsoft", "StartupX"],
      education: "MBA, Stanford",
      timezone: "SGT",
      featured: true
    },
    {
      id: 2,
      name: "Marcus Johnson",
      title: "Serial Entrepreneur",
      company: "DataVault",
      image: "/mentor-marcus.jpg",
      location: "Hong Kong",
      experience: "12+ years",
      rating: 4.8,
      sessions: 120,
      specialties: ["Business Strategy", "Fundraising", "Operations"],
      bio: "Serial entrepreneur with 3 successful exits. Expert in B2B SaaS scaling and fundraising.",
      availability: "Available",
      price: "SGD 180/hour",
      languages: ["English", "Cantonese"],
      industry: "FinTech",
      previousCompanies: ["Stripe", "PayPal", "FinTechCorp"],
      education: "MBA, Wharton",
      timezone: "HKT",
      featured: true
    },
    {
      id: 3,
      name: "Priya Sharma",
      title: "Product Leader",
      company: "GreenTech",
      image: "/mentor-priya.jpg",
      location: "Tokyo",
      experience: "10+ years",
      rating: 4.9,
      sessions: 90,
      specialties: ["Product Design", "UX/UI", "User Research"],
      bio: "Product leader with expertise in consumer-facing applications. Designed products used by 10M+ users.",
      availability: "Available",
      price: "SGD 160/hour",
      languages: ["English", "Hindi", "Japanese"],
      industry: "CleanTech",
      previousCompanies: ["Apple", "Tesla", "GreenStartup"],
      education: "Design, Art Center",
      timezone: "JST",
      featured: false
    }
  ]

  const filteredMentors = mentors.filter(mentor => 
    searchQuery === "" || 
    mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mentor.specialties.some(specialty => specialty.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto max-w-7xl px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Mentorship Program</h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Connect with experienced mentors to accelerate your startup journey
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" asChild>
                <Link href="/" className="flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Search */}
        <Card className="mb-8 border-0 shadow-lg bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search mentors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <Card className="text-center border-0 shadow-lg bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-[#0F7377] to-[#1E293B] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">100+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Expert Mentors</div>
            </CardContent>
          </Card>
          
          <Card className="text-center border-0 shadow-lg bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-[#F59E0B] to-[#F59E0B]/80 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">4.9</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Average Rating</div>
            </CardContent>
          </Card>
          
          <Card className="text-center border-0 shadow-lg bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-[#10B981] to-[#10B981]/80 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">500+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Sessions Completed</div>
            </CardContent>
          </Card>
          
          <Card className="text-center border-0 shadow-lg bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-[#8B5CF6] to-[#8B5CF6]/80 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">12+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Countries</div>
            </CardContent>
          </Card>
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor) => (
            <Card key={mentor.id} className={`group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white dark:bg-gray-800 ${mentor.featured ? 'ring-2 ring-[#0F7377]/20' : ''}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={mentor.image} alt={mentor.name} />
                      <AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{mentor.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{mentor.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{mentor.location}</span>
                      </div>
                    </div>
                  </div>
                  {mentor.featured && (
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  )}
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {mentor.bio}
                </p>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Specialties</h4>
                  <div className="flex flex-wrap gap-1">
                    {mentor.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    <span>{mentor.rating}/5.0</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{mentor.sessions} sessions</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Building2 className="h-3 w-3" />
                    <span>{mentor.industry}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="h-3 w-3" />
                    <span>{mentor.experience}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm">
                    <span className="text-gray-600 dark:text-gray-300">Price: </span>
                    <span className="font-semibold text-gray-900 dark:text-white">{mentor.price}</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    {mentor.availability}
                  </Badge>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 bg-[#0F7377] hover:bg-[#0F7377]/90 text-white">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Connect
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Heart className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMentors.length === 0 && (
          <Card className="text-center border-0 shadow-lg bg-white dark:bg-gray-800">
            <CardContent className="p-12">
              <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No mentors found</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">Try adjusting your search criteria</p>
              <Button 
                onClick={() => setSearchQuery("")}
                variant="outline"
              >
                Clear Search
              </Button>
            </CardContent>
          </Card>
        )}

        {/* CTA Section */}
        <Card className="mt-12 border-0 shadow-lg bg-gradient-to-r from-[#0F7377] to-[#1E293B] text-white">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Find Your Mentor?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Connect with experienced mentors who can help you navigate your startup journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-white" asChild>
                <Link href="/mentor-connect">
                  Find a Mentor
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/20 text-white border-white/30 hover:bg-white/30" asChild>
                <Link href="/contact">
                  Become a Mentor
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}