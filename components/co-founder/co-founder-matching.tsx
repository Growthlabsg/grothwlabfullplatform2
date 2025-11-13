"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import {
  Heart,
  MessageSquare,
  Star,
  Filter,
  Search,
  MapPin,
  Users,
  Briefcase,
  Target,
  Award,
  Clock,
  Globe,
  Zap,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  Lightbulb,
  Shield,
  Eye,
  Share2,
  Phone,
  Mail,
  Calendar,
  Building,
  GraduationCap,
  Languages,
  Network,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Settings,
  RefreshCw,
  Bookmark,
  MessageCircle,
  Video,
  Coffee,
  Handshake,
  Rocket,
  Sparkles,
} from "lucide-react"
import { CoFounderMatchingAlgorithm, CoFounderProfile, MatchResult } from "@/lib/co-founder-matching-algorithm"

// Mock data for demonstration
const MOCK_PROFILES: CoFounderProfile[] = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    location: "Singapore",
    experience: "expert",
    availability: "full-time",
    industry: ["FinTech", "AI/ML"],
    skills: ["programming", "data-science", "product-management", "finance"],
    interests: ["blockchain", "machine-learning", "financial-inclusion"],
    values: ["innovation", "social-impact", "excellence"],
    goals: ["build-unicorn", "global-impact", "mentor-others"],
    fundingStage: "traction",
    teamSize: "solo",
    commitment: "high",
    riskTolerance: "high",
    workStyle: "leadership",
    communication: "direct",
    timezone: "Asia/Singapore",
    languages: ["English", "Mandarin"],
    education: "Stanford University",
    previousStartups: 2,
            network: ["GrowthLab", "500 Startups"],
    preferences: {
      ageRange: [25, 40],
      experienceLevel: ["intermediate", "expert"],
      location: ["Singapore", "San Francisco"],
      availability: ["full-time"],
      skills: ["programming", "design"],
      values: ["innovation", "impact"]
    },
    compatibilityScores: {},
    lastActive: new Date(),
    isVerified: true,
    isPremium: true
  },
  {
    id: "2",
    name: "Alex Rodriguez",
    email: "alex.rodriguez@example.com",
    location: "San Francisco",
    experience: "intermediate",
    availability: "full-time",
    industry: ["SaaS", "B2B"],
    skills: ["sales", "marketing", "operations", "strategy"],
    interests: ["enterprise-software", "customer-acquisition", "scaling"],
    values: ["growth", "collaboration", "quality"],
    goals: ["scale-startup", "build-team", "market-leadership"],
    fundingStage: "mvp",
    teamSize: "2-3",
    commitment: "high",
    riskTolerance: "medium",
    workStyle: "collaborative",
    communication: "diplomatic",
    timezone: "America/Los_Angeles",
    languages: ["English", "Spanish"],
    education: "UC Berkeley",
    previousStartups: 1,
    network: ["Techstars", "Founder Institute"],
    preferences: {
      ageRange: [28, 45],
      experienceLevel: ["beginner", "intermediate"],
      location: ["San Francisco", "Remote"],
      availability: ["full-time", "part-time"],
      skills: ["programming", "design", "marketing"],
      values: ["growth", "collaboration"]
    },
    compatibilityScores: {},
    lastActive: new Date(),
    isVerified: true,
    isPremium: false
  },
  {
    id: "3",
    name: "Priya Patel",
    email: "priya.patel@example.com",
    location: "Bangalore",
    experience: "beginner",
    availability: "part-time",
    industry: ["EdTech", "Healthcare"],
    skills: ["design", "content", "research", "user-research"],
    interests: ["education-technology", "healthcare-innovation", "user-experience"],
    values: ["impact", "education", "community"],
    goals: ["help-students", "improve-healthcare", "social-impact"],
    fundingStage: "idea",
    teamSize: "solo",
    commitment: "medium",
    riskTolerance: "low",
    workStyle: "support",
    communication: "analytical",
    timezone: "Asia/Kolkata",
    languages: ["English", "Hindi"],
    education: "IIT Delhi",
    previousStartups: 0,
    network: ["Startup India"],
    preferences: {
      ageRange: [22, 35],
      experienceLevel: ["beginner", "intermediate"],
      location: ["Bangalore", "Remote"],
      availability: ["part-time", "weekends"],
      skills: ["programming", "business"],
      values: ["impact", "education"]
    },
    compatibilityScores: {},
    lastActive: new Date(),
    isVerified: false,
    isPremium: false
  }
]

export function CoFounderMatching() {
  const { toast } = useToast()
  const [currentUser, setCurrentUser] = useState<CoFounderProfile | null>(null)
  const [matches, setMatches] = useState<MatchResult[]>([])
  const [filteredMatches, setFilteredMatches] = useState<MatchResult[]>([])
  const [selectedMatch, setSelectedMatch] = useState<MatchResult | null>(null)
  const [filters, setFilters] = useState({
    minScore: 0.5,
    location: [] as string[],
    experience: [] as string[],
    availability: [] as string[],
    skills: [] as string[],
    values: [] as string[]
  })
  const [viewMode, setViewMode] = useState<"cards" | "list">("cards")
  const [sortBy, setSortBy] = useState<"compatibility" | "recent" | "location">("compatibility")

  useEffect(() => {
    // Simulate current user profile
    const userProfile = MOCK_PROFILES[0]
    setCurrentUser(userProfile)
    
    // Calculate matches
    const topMatches = CoFounderMatchingAlgorithm.getTopMatches(userProfile, MOCK_PROFILES, 20)
    setMatches(topMatches)
    setFilteredMatches(topMatches)
  }, [])

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    
    // Apply filters
    const filtered = matches.filter(match => {
      if (newFilters.minScore && match.compatibilityScore < newFilters.minScore) return false
      if (newFilters.location.length > 0) {
        if (!newFilters.location.some(loc => 
          match.profile.location.toLowerCase().includes(loc.toLowerCase())
        )) return false
      }
      if (newFilters.experience.length > 0) {
        if (!newFilters.experience.includes(match.profile.experience)) return false
      }
      if (newFilters.availability.length > 0) {
        if (!newFilters.availability.includes(match.profile.availability)) return false
      }
      if (newFilters.skills.length > 0) {
        const hasRequiredSkills = newFilters.skills.some(skill => 
          match.profile.skills.includes(skill)
        )
        if (!hasRequiredSkills) return false
      }
      if (newFilters.values.length > 0) {
        const hasRequiredValues = newFilters.values.some(value => 
          match.profile.values.includes(value)
        )
        if (!hasRequiredValues) return false
      }
      return true
    })
    
    setFilteredMatches(filtered)
  }

  const handleConnect = (match: MatchResult) => {
    toast({
      title: "Connection Request Sent",
      description: `Your connection request has been sent to ${match.profile.name}`,
    })
  }

  const handleSave = (match: MatchResult) => {
    toast({
      title: "Profile Saved",
      description: `${match.profile.name}'s profile has been saved to your favorites`,
    })
  }

  const handleShare = (match: MatchResult) => {
    const shareText = `Check out ${match.profile.name} - ${match.profile.skills.join(", ")} expert`
    navigator.clipboard.writeText(shareText)
    toast({
      title: "Profile Shared",
      description: "Profile link copied to clipboard",
    })
  }

  const getMatchQualityColor = (quality: string) => {
    switch (quality) {
      case 'excellent': return 'bg-green-100 text-green-800 border-green-200'
      case 'good': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'fair': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'poor': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getExperienceColor = (experience: string) => {
    switch (experience) {
      case 'expert': return 'bg-purple-100 text-purple-800'
      case 'intermediate': return 'bg-blue-100 text-blue-800'
      case 'beginner': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (!currentUser) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold">Find Your Co-Founder</h1>
            <p className="text-[#334155] mt-2">
              Connect with potential co-founders based on skills, values, and goals
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setViewMode(viewMode === "cards" ? "list" : "cards")}>
              {viewMode === "cards" ? "List View" : "Card View"}
            </Button>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Preferences
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#334155]">Total Matches</p>
                  <p className="text-2xl font-bold">{filteredMatches.length}</p>
                </div>
                <Users className="h-8 w-8 text-[#0F7377]" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#334155]">Excellent Matches</p>
                  <p className="text-2xl font-bold">
                    {filteredMatches.filter(m => m.matchQuality === 'excellent').length}
                  </p>
                </div>
                <Sparkles className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#334155]">Online Now</p>
                  <p className="text-2xl font-bold">
                    {filteredMatches.filter(m => 
                      new Date().getTime() - m.profile.lastActive.getTime() < 3600000
                    ).length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#334155]">Verified Profiles</p>
                  <p className="text-2xl font-bold">
                    {filteredMatches.filter(m => m.profile.isVerified).length}
                  </p>
                </div>
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Compatibility Score */}
              <div>
                <label className="text-sm font-medium mb-2 block">Minimum Compatibility</label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={filters.minScore}
                    onChange={(e) => handleFilterChange('minScore', parseFloat(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-sm font-medium">{Math.round(filters.minScore * 100)}%</span>
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="text-sm font-medium mb-2 block">Location</label>
                <div className="space-y-2">
                  {["Singapore", "San Francisco", "Bangalore", "Remote"].map((location) => (
                    <div key={location} className="flex items-center space-x-2">
                      <Checkbox
                        id={location}
                        checked={filters.location.includes(location)}
                        onCheckedChange={(checked) => {
                          const newLocations = checked 
                            ? [...filters.location, location]
                            : filters.location.filter(l => l !== location)
                          handleFilterChange('location', newLocations)
                        }}
                      />
                      <label htmlFor={location} className="text-sm">{location}</label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience Level */}
              <div>
                <label className="text-sm font-medium mb-2 block">Experience Level</label>
                <div className="space-y-2">
                  {["beginner", "intermediate", "expert"].map((exp) => (
                    <div key={exp} className="flex items-center space-x-2">
                      <Checkbox
                        id={exp}
                        checked={filters.experience.includes(exp)}
                        onCheckedChange={(checked) => {
                          const newExp = checked 
                            ? [...filters.experience, exp]
                            : filters.experience.filter(e => e !== exp)
                          handleFilterChange('experience', newExp)
                        }}
                      />
                      <label htmlFor={exp} className="text-sm capitalize">{exp}</label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div>
                <label className="text-sm font-medium mb-2 block">Availability</label>
                <div className="space-y-2">
                  {["full-time", "part-time", "weekends"].map((avail) => (
                    <div key={avail} className="flex items-center space-x-2">
                      <Checkbox
                        id={avail}
                        checked={filters.availability.includes(avail)}
                        onCheckedChange={(checked) => {
                          const newAvail = checked 
                            ? [...filters.availability, avail]
                            : filters.availability.filter(a => a !== avail)
                          handleFilterChange('availability', newAvail)
                        }}
                      />
                      <label htmlFor={avail} className="text-sm capitalize">{avail}</label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div>
                <label className="text-sm font-medium mb-2 block">Required Skills</label>
                <div className="space-y-2">
                  {["programming", "design", "marketing", "sales", "finance", "operations"].map((skill) => (
                    <div key={skill} className="flex items-center space-x-2">
                      <Checkbox
                        id={skill}
                        checked={filters.skills.includes(skill)}
                        onCheckedChange={(checked) => {
                          const newSkills = checked 
                            ? [...filters.skills, skill]
                            : filters.skills.filter(s => s !== skill)
                          handleFilterChange('skills', newSkills)
                        }}
                      />
                      <label htmlFor={skill} className="text-sm capitalize">{skill}</label>
                    </div>
                  ))}
                </div>
              </div>

              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setFilters({
                    minScore: 0.5,
                    location: [],
                    experience: [],
                    availability: [],
                    skills: [],
                    values: []
                  })
                }}
              >
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Matches Grid */}
        <div className="lg:col-span-3">
          {/* Sort and Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by name, skills, or interests..." className="pl-9" />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="compatibility">Best Matches</SelectItem>
                <SelectItem value="recent">Recently Active</SelectItem>
                <SelectItem value="location">Nearby</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Matches */}
          {viewMode === "cards" ? (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredMatches.map((match) => (
                <Card key={match.profile.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={`/api/avatar/${match.profile.id}`} />
                          <AvatarFallback>{match.profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{match.profile.name}</h3>
                            {match.profile.isVerified && (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-[#334155]">
                            <MapPin className="h-3 w-3" />
                            {match.profile.location}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleSave(match)}>
                          <Bookmark className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleShare(match)}>
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Compatibility Score */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Compatibility</span>
                        <span className="text-sm font-bold">{Math.round(match.compatibilityScore * 100)}%</span>
                      </div>
                      <Progress value={match.compatibilityScore * 100} className="h-2" />
                      <Badge 
                        variant="outline" 
                        className={`mt-2 ${getMatchQualityColor(match.matchQuality)}`}
                      >
                        {match.matchQuality.charAt(0).toUpperCase() + match.matchQuality.slice(1)} Match
                      </Badge>
                    </div>

                    {/* Skills */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">Skills</h4>
                      <div className="flex flex-wrap gap-1">
                        {match.profile.skills.slice(0, 4).map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {match.profile.skills.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{match.profile.skills.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Experience & Availability */}
                    <div className="flex items-center gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Briefcase className="h-3 w-3" />
                        <Badge variant="outline" className={getExperienceColor(match.profile.experience)}>
                          {match.profile.experience}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span className="capitalize">{match.profile.availability}</span>
                      </div>
                    </div>

                    {/* Values */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">Values</h4>
                      <div className="flex flex-wrap gap-1">
                        {match.profile.values.slice(0, 3).map((value) => (
                          <Badge key={value} variant="outline" className="text-xs">
                            {value}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="flex-1 bg-[#0F7377] hover:bg-[#0F7377]/90"
                        onClick={() => handleConnect(match)}
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Connect
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setSelectedMatch(match)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredMatches.map((match) => (
                <Card key={match.profile.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={`/api/avatar/${match.profile.id}`} />
                          <AvatarFallback>{match.profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{match.profile.name}</h3>
                            {match.profile.isVerified && (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-[#334155]">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {match.profile.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Briefcase className="h-3 w-3" />
                              {match.profile.experience}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {match.profile.availability}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-lg font-bold">{Math.round(match.compatibilityScore * 100)}%</div>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getMatchQualityColor(match.matchQuality)}`}
                          >
                            {match.matchQuality}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleSave(match)}>
                            <Bookmark className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleShare(match)}>
                            <Share2 className="h-4 w-4" />
                          </Button>
                          <Button size="sm" onClick={() => handleConnect(match)}>
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Connect
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {filteredMatches.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="mb-4">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No matches found</h3>
                  <p className="text-[#334155] mb-4">
                    Try adjusting your filters to find more potential co-founders.
                  </p>
                  <Button onClick={() => setFilters({
                    minScore: 0.5,
                    location: [],
                    experience: [],
                    availability: [],
                    skills: [],
                    values: []
                  })}>
                    Clear All Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Detailed Match Modal */}
      {selectedMatch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Detailed Match Analysis</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setSelectedMatch(null)}>
                  <XCircle className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Overview */}
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={`/api/avatar/${selectedMatch.profile.id}`} />
                  <AvatarFallback>{selectedMatch.profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-xl font-bold">{selectedMatch.profile.name}</h2>
                    {selectedMatch.profile.isVerified && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-[#334155] mb-2">{selectedMatch.profile.location}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <Briefcase className="h-3 w-3" />
                      {selectedMatch.profile.experience}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {selectedMatch.profile.availability}
                    </span>
                    <span className="flex items-center gap-1">
                      <GraduationCap className="h-3 w-3" />
                      {selectedMatch.profile.education}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#0F7377]">
                    {Math.round(selectedMatch.compatibilityScore * 100)}%
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`${getMatchQualityColor(selectedMatch.matchQuality)}`}
                  >
                    {selectedMatch.matchQuality} Match
                  </Badge>
                </div>
              </div>

              {/* Compatibility Breakdown */}
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                  <TabsTrigger value="values">Values</TabsTrigger>
                  <TabsTrigger value="goals">Goals</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-[#0F7377]">
                        {Math.round(selectedMatch.skillComplementarity * 100)}%
                      </div>
                      <div className="text-sm text-[#334155]">Skill Fit</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-[#0F7377]">
                        {Math.round(selectedMatch.valueAlignment * 100)}%
                      </div>
                      <div className="text-sm text-[#334155]">Value Alignment</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-[#0F7377]">
                        {Math.round(selectedMatch.goalAlignment * 100)}%
                      </div>
                      <div className="text-sm text-[#334155]">Goal Alignment</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-[#0F7377]">
                        {Math.round(selectedMatch.experienceFit * 100)}%
                      </div>
                      <div className="text-sm text-[#334155]">Experience Fit</div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="skills" className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-medium mb-2 text-green-700">Complementary Skills</h4>
                      <div className="space-y-1">
                        {selectedMatch.detailedBreakdown.skills.complementary.map((skill) => (
                          <Badge key={skill} className="bg-green-100 text-green-800">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2 text-blue-700">Overlapping Skills</h4>
                      <div className="space-y-1">
                        {selectedMatch.detailedBreakdown.skills.overlapping.map((skill) => (
                          <Badge key={skill} className="bg-blue-100 text-blue-800">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2 text-orange-700">Missing Skills</h4>
                      <div className="space-y-1">
                        {selectedMatch.detailedBreakdown.skills.missing.map((skill) => (
                          <Badge key={skill} className="bg-orange-100 text-orange-800">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="values" className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2 text-green-700">Aligned Values</h4>
                      <div className="space-y-1">
                        {selectedMatch.detailedBreakdown.values.aligned.map((value) => (
                          <Badge key={value} className="bg-green-100 text-green-800">
                            {value}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2 text-red-700">Potential Conflicts</h4>
                      <div className="space-y-1">
                        {selectedMatch.detailedBreakdown.values.conflicting.map((value) => (
                          <Badge key={value} className="bg-red-100 text-red-800">
                            {value}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="goals" className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2 text-green-700">Shared Goals</h4>
                      <div className="space-y-1">
                        {selectedMatch.detailedBreakdown.goals.shared.map((goal) => (
                          <Badge key={goal} className="bg-green-100 text-green-800">
                            {goal}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2 text-gray-700">Different Goals</h4>
                      <div className="space-y-1">
                        {selectedMatch.detailedBreakdown.goals.different.map((goal) => (
                          <Badge key={goal} className="bg-gray-100 text-gray-800">
                            {goal}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4 border-t">
                <Button className="flex-1 bg-[#0F7377] hover:bg-[#0F7377]/90" onClick={() => handleConnect(selectedMatch)}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Connection Request
                </Button>
                <Button variant="outline" onClick={() => handleSave(selectedMatch)}>
                  <Bookmark className="h-4 w-4 mr-2" />
                  Save Profile
                </Button>
                <Button variant="outline" onClick={() => handleShare(selectedMatch)}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
} 