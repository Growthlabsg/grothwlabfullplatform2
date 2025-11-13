"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Search, 
  Filter, 
  Users, 
  Target, 
  Star,
  MapPin,
  Calendar,
  ArrowRight,
  CheckCircle,
  MessageSquare,
  Heart,
  Zap,
  Award,
  Globe,
  Building2,
  Lightbulb,
  TrendingUp
} from "lucide-react"
import Link from "next/link"

export default function CoFounderMatchingPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSkills, setSelectedSkills] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [selectedExperience, setSelectedExperience] = useState("")

  const coFounders = [
    {
      id: 1,
      name: "Sarah Chen",
      title: "Technical Co-Founder",
      company: "TechFlow",
      image: "/cofounder-sarah.jpg",
      location: "Singapore",
      experience: "5+ years",
      skills: ["React", "Node.js", "AI/ML", "Product Management"],
      bio: "Experienced full-stack developer with a passion for building scalable products. Led technical teams at 3 successful startups.",
      matchScore: 95,
      availability: "Available",
      lookingFor: "Business Co-Founder",
      industry: "SaaS",
      previousCompanies: ["Google", "Microsoft", "StartupX"],
      education: "Computer Science, Stanford",
      languages: ["English", "Mandarin", "Japanese"],
      timezone: "SGT",
      commitment: "Full-time",
      equity: "40-60%",
      funding: "Pre-seed",
      stage: "Idea Stage"
    },
    {
      id: 2,
      name: "Marcus Johnson",
      title: "Business Co-Founder",
      company: "DataVault",
      image: "/cofounder-marcus.jpg",
      location: "Hong Kong",
      experience: "8+ years",
      skills: ["Business Strategy", "Sales", "Marketing", "Operations"],
      bio: "Serial entrepreneur with 2 successful exits. Expert in scaling B2B SaaS companies from 0 to $10M ARR.",
      matchScore: 92,
      availability: "Available",
      lookingFor: "Technical Co-Founder",
      industry: "FinTech",
      previousCompanies: ["Stripe", "PayPal", "FinTechCorp"],
      education: "MBA, Wharton",
      languages: ["English", "Cantonese"],
      timezone: "HKT",
      commitment: "Full-time",
      equity: "40-60%",
      funding: "Seed",
      stage: "MVP Stage"
    },
    {
      id: 3,
      name: "Priya Sharma",
      title: "Product Co-Founder",
      company: "GreenTech",
      image: "/cofounder-priya.jpg",
      location: "Tokyo",
      experience: "6+ years",
      skills: ["Product Design", "UX/UI", "User Research", "Data Analysis"],
      bio: "Product leader with expertise in consumer-facing applications. Designed products used by 10M+ users.",
      matchScore: 88,
      availability: "Available",
      lookingFor: "Technical Co-Founder",
      industry: "CleanTech",
      previousCompanies: ["Apple", "Tesla", "GreenStartup"],
      education: "Design, Art Center",
      languages: ["English", "Hindi", "Japanese"],
      timezone: "JST",
      commitment: "Full-time",
      equity: "30-50%",
      funding: "Pre-seed",
      stage: "Idea Stage"
    },
    {
      id: 4,
      name: "Alex Kim",
      title: "Technical Co-Founder",
      company: "AI Solutions",
      image: "/cofounder-alex.jpg",
      location: "Seoul",
      experience: "7+ years",
      skills: ["Python", "Machine Learning", "Deep Learning", "Cloud Computing"],
      bio: "AI/ML expert with PhD in Computer Science. Published researcher and former Google AI engineer.",
      matchScore: 90,
      availability: "Available",
      lookingFor: "Business Co-Founder",
      industry: "AI/ML",
      previousCompanies: ["Google", "OpenAI", "AIStartup"],
      education: "PhD Computer Science, MIT",
      languages: ["English", "Korean", "Mandarin"],
      timezone: "KST",
      commitment: "Full-time",
      equity: "40-60%",
      funding: "Seed",
      stage: "MVP Stage"
    },
    {
      id: 5,
      name: "Maria Santos",
      title: "Business Co-Founder",
      company: "EcoTech",
      image: "/cofounder-maria.jpg",
      location: "Manila",
      experience: "4+ years",
      skills: ["Business Development", "Partnerships", "Fundraising", "Strategy"],
      bio: "Business development expert with strong network in Southeast Asia. Successfully raised $5M+ in funding.",
      matchScore: 85,
      availability: "Available",
      lookingFor: "Technical Co-Founder",
      industry: "CleanTech",
      previousCompanies: ["McKinsey", "GreenCorp", "EcoStartup"],
      education: "Business, INSEAD",
      languages: ["English", "Tagalog", "Spanish"],
      timezone: "PHT",
      commitment: "Full-time",
      equity: "30-50%",
      funding: "Pre-seed",
      stage: "Idea Stage"
    },
    {
      id: 6,
      name: "James Rodriguez",
      title: "Technical Co-Founder",
      company: "EduTech Asia",
      image: "/cofounder-james.jpg",
      location: "Singapore",
      experience: "6+ years",
      skills: ["Mobile Development", "React Native", "Backend", "DevOps"],
      bio: "Full-stack developer specializing in mobile applications. Built apps with 1M+ downloads.",
      matchScore: 87,
      availability: "Available",
      lookingFor: "Business Co-Founder",
      industry: "EdTech",
      previousCompanies: ["Facebook", "Uber", "EduStartup"],
      education: "Computer Science, NUS",
      languages: ["English", "Spanish", "Mandarin"],
      timezone: "SGT",
      commitment: "Full-time",
      equity: "40-60%",
      funding: "Pre-seed",
      stage: "Idea Stage"
    }
  ]

  const skills = [
    "React", "Node.js", "Python", "AI/ML", "Product Management", "Business Strategy",
    "Sales", "Marketing", "UX/UI", "Mobile Development", "Backend", "DevOps",
    "Data Analysis", "Operations", "Fundraising", "Partnerships"
  ]

  const locations = [
    "Singapore", "Hong Kong", "Tokyo", "Seoul", "Manila", "Bangkok", "Jakarta", "Remote"
  ]

  const experienceLevels = [
    "1-2 years", "3-5 years", "5-8 years", "8+ years"
  ]

  const filteredCoFounders = coFounders.filter(coFounder => {
    const matchesSearch = searchQuery === "" || 
      coFounder.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coFounder.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coFounder.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesSkills = selectedSkills === "" || 
      coFounder.skills.some(skill => skill === selectedSkills)
    
    const matchesLocation = selectedLocation === "" || 
      coFounder.location === selectedLocation
    
    const matchesExperience = selectedExperience === "" || 
      coFounder.experience === selectedExperience
    
    return matchesSearch && matchesSkills && matchesLocation && matchesExperience
  })

  const getMatchColor = (score: number) => {
    if (score >= 90) return "bg-green-100 text-green-800"
    if (score >= 80) return "bg-yellow-100 text-yellow-800"
    if (score >= 70) return "bg-orange-100 text-orange-800"
    return "bg-red-100 text-red-800"
  }

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "Available": return "bg-green-100 text-green-800"
      case "Busy": return "bg-yellow-100 text-yellow-800"
      case "Unavailable": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto max-w-7xl px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Co-Founder Matching</h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Find your perfect co-founder to build the next unicorn together
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
        {/* Search and Filters */}
        <Card className="mb-8 border-0 shadow-lg bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search co-founders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
            </div>
              
              <Select value={selectedSkills} onValueChange={setSelectedSkills}>
                <SelectTrigger>
                  <SelectValue placeholder="Skills" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Skills</SelectItem>
                  {skills.map((skill) => (
                    <SelectItem key={skill} value={skill}>
                      {skill}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Locations</SelectItem>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedExperience} onValueChange={setSelectedExperience}>
                <SelectTrigger>
                  <SelectValue placeholder="Experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Experience</SelectItem>
                  {experienceLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">2,847+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Active Co-Founders</div>
            </CardContent>
          </Card>
          
          <Card className="text-center border-0 shadow-lg bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-[#F59E0B] to-[#F59E0B]/80 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">156</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Successful Matches</div>
              </CardContent>
            </Card>

          <Card className="text-center border-0 shadow-lg bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-[#10B981] to-[#10B981]/80 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">85%</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Success Rate</div>
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

        {/* Co-Founders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCoFounders.map((coFounder) => (
            <Card key={coFounder.id} className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white dark:bg-gray-800">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={coFounder.image} alt={coFounder.name} />
                      <AvatarFallback>{coFounder.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{coFounder.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{coFounder.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{coFounder.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={`text-xs ${getMatchColor(coFounder.matchScore)}`}>
                      {coFounder.matchScore}% Match
                    </Badge>
                    <Badge className={`text-xs mt-1 ${getAvailabilityColor(coFounder.availability)}`}>
                      {coFounder.availability}
                    </Badge>
                  </div>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {coFounder.bio}
                </p>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    {coFounder.skills.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {coFounder.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{coFounder.skills.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{coFounder.experience}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Building2 className="h-3 w-3" />
                    <span>{coFounder.industry}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="h-3 w-3" />
                    <span>{coFounder.lookingFor}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    <span>{coFounder.stage}</span>
                  </div>
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

        {filteredCoFounders.length === 0 && (
          <Card className="text-center border-0 shadow-lg bg-white dark:bg-gray-800">
            <CardContent className="p-12">
              <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No co-founders found</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">Try adjusting your search criteria or filters</p>
              <Button 
                onClick={() => {
                  setSearchQuery("")
                  setSelectedSkills("")
                  setSelectedLocation("")
                  setSelectedExperience("")
                }}
                variant="outline"
              >
                Clear All Filters
              </Button>
                </CardContent>
              </Card>
        )}

      {/* CTA Section */}
        <Card className="mt-12 border-0 shadow-lg bg-gradient-to-r from-[#0F7377] to-[#1E293B] text-white">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Find Your Co-Founder?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of entrepreneurs who have found their perfect co-founder through our platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-white" asChild>
                <Link href="/network/create-cofounder-profile">
                  Create Your Profile
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/20 text-white border-white/30 hover:bg-white/30" asChild>
                <Link href="/contact">
                  Get Help
                </Link>
            </Button>
          </div>
          </CardContent>
        </Card>
        </div>
    </div>
  )
}