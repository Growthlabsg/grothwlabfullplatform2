"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  Clock, 
  Users, 
  CheckCircle, 
  ChevronDown,
  Heart,
  MessageCircle,
  Calendar,
  Award,
  TrendingUp,
  Target,
  Users2,
  Building2,
  GraduationCap,
  Briefcase,
  Globe,
  Zap,
  Brain,
  User
} from "lucide-react"
import { MentorConnectService } from "@/lib/mentor-connect-service"
import { User as UserType, Match, SearchFilters } from "@/lib/mentor-connect-service"
import { MentorProfileCard } from "./mentor-profile-card"
import { SessionFeedback } from "@/lib/mentor-connect-service"

export function MentorConnectClient() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<SearchFilters>({})
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [userType, setUserType] = useState<"mentor" | "mentee" | "startup">("mentee")
  const [currentUser, setCurrentUser] = useState<UserType | null>(null)
  const [searchResults, setSearchResults] = useState<UserType[]>([])
  const [matches, setMatches] = useState<Match[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("search")

  const mentorService = MentorConnectService.getInstance()

  useEffect(() => {
    // Initialize with sample user
    initializeUser()
  }, [])

  const initializeUser = async () => {
    const sampleUser = await mentorService.getUserById("mentee-1")
    setCurrentUser(sampleUser)
  }

  const handleSearch = async () => {
    setIsLoading(true)
    try {
      const results = await mentorService.searchUsers(filters)
      setSearchResults(results)
    } catch (error) {
      console.error("Search failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFindMatches = async () => {
    if (!currentUser) return
    
    setIsLoading(true)
    try {
      const userMatches = await mentorService.findMatches(currentUser.id, filters)
      setMatches(userMatches)
    } catch (error) {
      console.error("Matching failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const clearFilters = () => {
    setFilters({})
    setSearchQuery("")
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#1E293B] md:text-4xl">
              Mentor Connect
            </h1>
            <p className="text-lg text-[#334155] mt-2">
              Smart matching algorithm to connect you with the perfect mentors and startups
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setActiveTab("profile")}>
              <Users2 className="h-4 w-4 mr-2" />
              Build Profile
            </Button>
            <Button onClick={() => setActiveTab("matches")}>
              <Heart className="h-4 w-4 mr-2" />
              View Matches
            </Button>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="search">Search & Connect</TabsTrigger>
          <TabsTrigger value="matches">Smart Matches</TabsTrigger>
          <TabsTrigger value="algorithm">Matching Algorithm</TabsTrigger>
          <TabsTrigger value="feedback">Feedback System</TabsTrigger>
          <TabsTrigger value="profile">Profile Builder</TabsTrigger>
        </TabsList>

        {/* Search & Connect Tab */}
        <TabsContent value="search" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Find Your Perfect Match
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Search Bar */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, expertise, industry, or location..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Advanced Filters
                  <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showAdvancedFilters ? "rotate-180" : ""}`} />
                </Button>
                <Button onClick={handleSearch} disabled={isLoading}>
                  {isLoading ? "Searching..." : "Search"}
                </Button>
              </div>

              {/* Advanced Filters */}
              {showAdvancedFilters && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 border rounded-lg bg-muted/50">
                  <div className="space-y-2">
                    <Label>User Type</Label>
                    <Select value={filters.userType} onValueChange={(value) => handleFilterChange("userType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="All types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mentor">Mentors</SelectItem>
                        <SelectItem value="mentee">Mentees</SelectItem>
                        <SelectItem value="startup">Startups</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Expertise</Label>
                    <Select onValueChange={(value) => handleFilterChange("expertise", [value])}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select expertise" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fundraising">Fundraising</SelectItem>
                        <SelectItem value="business-strategy">Business Strategy</SelectItem>
                        <SelectItem value="technical-architecture">Technical Architecture</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="product-development">Product Development</SelectItem>
                        <SelectItem value="team-building">Team Building</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Industry</Label>
                    <Select onValueChange={(value) => handleFilterChange("industries", [value])}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="saas">SaaS</SelectItem>
                        <SelectItem value="fintech">FinTech</SelectItem>
                        <SelectItem value="healthtech">HealthTech</SelectItem>
                        <SelectItem value="ai-ml">AI/ML</SelectItem>
                        <SelectItem value="e-commerce">E-commerce</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Minimum Rating</Label>
                    <Select onValueChange={(value) => handleFilterChange("rating", parseInt(value))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="4.5">4.5+ Stars</SelectItem>
                        <SelectItem value="4.0">4.0+ Stars</SelectItem>
                        <SelectItem value="3.5">3.5+ Stars</SelectItem>
                        <SelectItem value="3.0">3.0+ Stars</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input 
                      placeholder="City, Country"
                      onChange={(e) => handleFilterChange("location", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Price Range</Label>
                    <Select onValueChange={(value) => handleFilterChange("priceRange", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any price" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="free">Free</SelectItem>
                        <SelectItem value="low">Low ($0-$50)</SelectItem>
                        <SelectItem value="medium">Medium ($50-$200)</SelectItem>
                        <SelectItem value="high">High ($200+)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Verification</Label>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="verified"
                        checked={filters.isVerified}
                        onCheckedChange={(checked) => handleFilterChange("isVerified", checked)}
                      />
                      <Label htmlFor="verified">Verified only</Label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Availability</Label>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="available"
                        checked={filters.isAvailable}
                        onCheckedChange={(checked) => handleFilterChange("isAvailable", checked)}
                      />
                      <Label htmlFor="available">Available now</Label>
                    </div>
                  </div>

                  <div className="flex items-end">
                    <Button variant="outline" onClick={clearFilters} className="w-full">
                      Clear Filters
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Search Results */}
          <div className="grid gap-6">
            {searchResults.length > 0 ? (
              searchResults.map((user) => (
                <MentorProfileCard key={user.id} user={user} />
              ))
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Search className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No results found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search criteria or use our smart matching algorithm.
                  </p>
                  <Button onClick={handleFindMatches}>
                    <Zap className="h-4 w-4 mr-2" />
                    Use Smart Matching
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Smart Matches Tab */}
        <TabsContent value="matches" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Your Smart Matches
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={handleFindMatches} disabled={isLoading} className="mb-4">
                {isLoading ? "Finding matches..." : "Find Smart Matches"}
              </Button>

              {matches.length > 0 ? (
                <div className="space-y-6">
                  {matches.map((match) => (
                    <Card key={match.id} className="border-primary/20">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="text-2xl font-bold text-primary">
                              {Math.round(match.matchScore * 100)}%
                            </div>
                            <div>
                              <div className="font-medium">Match Score</div>
                              <div className="text-sm text-muted-foreground">
                                {match.matchReasons.length} compatibility factors
                              </div>
                            </div>
                          </div>
                          <Button size="sm">Connect</Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium mb-2">Why this match?</h4>
                            <ul className="space-y-1">
                              {match.matchReasons.map((reason, index) => (
                                <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                                  <CheckCircle className="h-3 w-3 text-green-500" />
                                  {reason}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">Compatibility Factors</h4>
                            <div className="space-y-2">
                              {match.compatibilityFactors.map((factor, index) => (
                                <div key={index} className="flex items-center justify-between">
                                  <span className="text-sm">{factor.factor}</span>
                                  <div className="flex items-center gap-2">
                                    <div className="w-20 bg-muted rounded-full h-2">
                                      <div 
                                        className="bg-primary h-2 rounded-full" 
                                        style={{ width: `${factor.score * 100}%` }}
                                      />
                                    </div>
                                    <span className="text-xs text-muted-foreground">
                                      {Math.round(factor.score * 100)}%
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No matches yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Use our smart matching algorithm to find your perfect mentor or mentee.
                  </p>
                  <Button onClick={handleFindMatches}>
                    Find Matches
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Matching Algorithm Tab */}
        <TabsContent value="algorithm" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Smart Matching Algorithm
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our AI-powered algorithm analyzes multiple factors including expertise, industry experience, 
                location, availability, and goals to find the perfect mentor-mentee matches.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Feedback System Tab */}
        <TabsContent value="feedback" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Session Feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Rate your mentoring sessions and provide detailed feedback to help improve the matching algorithm.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Profile Builder Tab */}
        <TabsContent value="profile" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Builder
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Create a comprehensive profile with your expertise, experience, goals, and preferences 
                to help the algorithm find better matches.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 