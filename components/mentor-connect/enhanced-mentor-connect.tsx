"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
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
  Settings,
  BarChart3,
  PieChart,
  Activity,
  MessageCircle as MessageCircleIcon,
  ThumbsUp,
  ThumbsDown,
  AlertCircle,
  BookOpen,
  Lightbulb,
  Shield,
  User,
  Edit,
  Save,
  Plus,
  X,
  CheckCircle as CheckCircleIcon
} from "lucide-react"
import { MentorConnectService, User, Match, SearchFilters, SessionFeedback, FeedbackCategory } from "@/lib/mentor-connect-service"

export function EnhancedMentorConnect() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<SearchFilters>({})
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [userType, setUserType] = useState<"mentor" | "mentee" | "startup">("mentee")
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [searchResults, setSearchResults] = useState<User[]>([])
  const [matches, setMatches] = useState<Match[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("search")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  const mentorService = MentorConnectService.getInstance()

  useEffect(() => {
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

  const handleConnect = (user: User) => {
    setSelectedUser(user)
    // Handle connection logic
  }

  const handleFeedbackSubmit = (feedback: SessionFeedback) => {
    console.log("Feedback submitted:", feedback)
    setShowFeedback(false)
    // Handle feedback submission
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
              AI-powered smart matching algorithm to connect you with the perfect mentors and startups
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
                <UserProfileCard key={user.id} user={user} onConnect={handleConnect} />
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
                    <MatchCard key={match.id} match={match} />
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
          <MatchingAlgorithmComponent />
        </TabsContent>

        {/* Feedback System Tab */}
        <TabsContent value="feedback" className="space-y-8">
          <FeedbackSystemComponent 
            sessionId="session-1"
            fromUserId="mentee-1"
            toUserId="mentor-1"
            onSubmit={handleFeedbackSubmit}
          />
        </TabsContent>

        {/* Profile Builder Tab */}
        <TabsContent value="profile" className="space-y-8">
          <ProfileBuilderComponent />
        </TabsContent>
      </Tabs>

      {/* User Profile Dialog */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedUser?.name} - Profile
            </DialogTitle>
            <DialogDescription>
              Detailed profile and connection options
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedUser.avatar} />
                  <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{selectedUser.name}</h3>
                  <p className="text-muted-foreground capitalize">{selectedUser.userType}</p>
                  <p className="text-sm text-muted-foreground">{selectedUser.location}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">About</h4>
                <p className="text-muted-foreground">{selectedUser.bio}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedUser.expertise.map((exp, index) => (
                      <Badge key={index} variant="secondary">
                        {exp}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Industries</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedUser.industries.map((ind, index) => (
                      <Badge key={index} variant="outline">
                        {ind}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={() => setSelectedUser(null)} variant="outline">
                  Cancel
                </Button>
                <Button onClick={() => handleConnect(selectedUser)}>
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Connect
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

// User Profile Card Component
function UserProfileCard({ user, onConnect }: { user: User; onConnect: (user: User) => void }) {
  const [isLiked, setIsLiked] = useState(false)

  const getProfileColor = () => {
    switch (user.userType) {
      case "mentor": return "border-blue-200 bg-blue-50"
      case "mentee": return "border-green-200 bg-green-50"
      case "startup": return "border-purple-200 bg-purple-50"
      default: return "border-gray-200 bg-gray-50"
    }
  }

  const getProfileBadgeColor = () => {
    switch (user.userType) {
      case "mentor": return "bg-blue-100 text-blue-800"
      case "mentee": return "bg-green-100 text-green-800"
      case "startup": return "bg-purple-100 text-purple-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className={`hover:shadow-lg transition-all duration-300 ${getProfileColor()} border-2`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="text-lg font-semibold">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-xl font-bold">{user.name}</h3>
                <Badge className={`${getProfileBadgeColor()} font-medium`}>
                  {user.userType}
                </Badge>
                {user.isVerified && (
                  <Badge variant="outline" className="text-green-600 border-green-600 bg-green-50">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground mb-3 leading-relaxed">{user.bio}</p>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {user.location}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  {user.rating} ({user.reviewCount} reviews)
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {user.isAvailable ? "Available" : "Unavailable"}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLiked(!isLiked)}
              className={`${isLiked ? "text-red-500 bg-red-50" : "hover:bg-red-50"}`}
            >
              <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              onClick={() => onConnect(user)}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Connect
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Award className="h-4 w-4" />
                Expertise
              </h4>
              <div className="flex flex-wrap gap-2">
                {user.expertise.slice(0, 3).map((exp, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {exp}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Industries
              </h4>
              <div className="flex flex-wrap gap-2">
                {user.industries.slice(0, 2).map((ind, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {ind}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onConnect(user)}
              className="text-primary hover:bg-primary/10"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              View Full Profile
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="border-primary text-primary">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Session
              </Button>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                <MessageCircle className="h-4 w-4 mr-2" />
                Message
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Match Card Component
function MatchCard({ match }: { match: Match }) {
  return (
    <Card className="border-primary/20">
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
  )
}

// Matching Algorithm Component
function MatchingAlgorithmComponent() {
  const [weights, setWeights] = useState({
    expertise: 0.25,
    industry: 0.20,
    location: 0.15,
    availability: 0.15,
    rating: 0.15,
    goals: 0.10
  })

  const totalWeight = Object.values(weights).reduce((sum, weight) => sum + weight, 0)

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Smart Matching Algorithm
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-4">How it works</h3>
              <p className="text-muted-foreground mb-4">
                Our AI-powered algorithm analyzes multiple factors to find the perfect mentor-mentee matches. 
                Each factor is weighted based on its importance in successful mentoring relationships.
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total Weight Distribution</span>
                  <Badge variant={totalWeight === 1 ? "default" : "destructive"}>
                    {Math.round(totalWeight * 100)}%
                  </Badge>
                </div>
                {totalWeight !== 1 && (
                  <p className="text-xs text-destructive">
                    Weights should sum to 100%. Current: {Math.round(totalWeight * 100)}%
                  </p>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-4">Algorithm Performance</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Match Success Rate</span>
                  <span className="text-sm font-medium">87%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '87%' }} />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Average Match Score</span>
                  <span className="text-sm font-medium">4.2/5.0</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '84%' }} />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Response Rate</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '92%' }} />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Algorithm Weights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(weights).map(([factor, weight]) => (
              <div key={factor} className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="capitalize">{factor}</Label>
                  <Badge variant="secondary">
                    {Math.round(weight * 100)}%
                  </Badge>
                </div>
                <Slider
                  value={[weight]}
                  onValueChange={(value) => setWeights(prev => ({ ...prev, [factor]: value[0] }))}
                  max={1}
                  min={0}
                  step={0.05}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Feedback System Component
function FeedbackSystemComponent({ 
  sessionId, 
  fromUserId, 
  toUserId, 
  onSubmit 
}: { 
  sessionId: string; 
  fromUserId: string; 
  toUserId: string; 
  onSubmit: (feedback: SessionFeedback) => void 
}) {
  const [rating, setRating] = useState(5)
  const [comments, setComments] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [categories, setCategories] = useState<FeedbackCategory[]>([
    { category: "Communication", score: 5, comment: "" },
    { category: "Expertise", score: 5, comment: "" },
    { category: "Value Provided", score: 5, comment: "" },
    { category: "Punctuality", score: 5, comment: "" },
    { category: "Follow-up", score: 5, comment: "" }
  ])

  const handleCategoryChange = (index: number, score: number, comment: string) => {
    const newCategories = [...categories]
    newCategories[index] = { ...newCategories[index], score, comment }
    setCategories(newCategories)
  }

  const handleSubmit = () => {
    const feedback: SessionFeedback = {
      id: `feedback-${Date.now()}`,
      sessionId,
      fromUserId,
      toUserId,
      rating,
      comments,
      categories,
      isAnonymous,
      createdAt: new Date().toISOString()
    }

    onSubmit(feedback)
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircleIcon className="h-5 w-5" />
            Session Feedback
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label className="text-base font-medium">Overall Rating</Label>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  >
                    ★
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-medium">{rating}/5</span>
                {rating >= 4.5 ? <ThumbsUp className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-base font-medium">Detailed Feedback</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.map((category, index) => (
                <div key={category.category} className="space-y-3 p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <Label className="font-medium">{category.category}</Label>
                    <Badge variant="secondary">
                      {category.score}/5
                    </Badge>
                  </div>
                  <Slider
                    value={[category.score]}
                    onValueChange={(value) => handleCategoryChange(index, value[0], category.comment)}
                    max={5}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <Textarea
                    placeholder={`Comments about ${category.category.toLowerCase()}...`}
                    value={category.comment}
                    onChange={(e) => handleCategoryChange(index, category.score, e.target.value)}
                    className="min-h-[60px]"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-medium">Additional Comments</Label>
            <Textarea
              placeholder="Share your experience, suggestions, or any other feedback..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="anonymous"
              checked={isAnonymous}
              onCheckedChange={(checked) => setIsAnonymous(checked as boolean)}
            />
            <Label htmlFor="anonymous">Submit feedback anonymously</Label>
          </div>

          <Button onClick={handleSubmit} className="w-full">
            <MessageCircleIcon className="h-4 w-4 mr-2" />
            Submit Feedback
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

// Profile Builder Component
function ProfileBuilderComponent() {
  const [currentStep, setCurrentStep] = useState(1)
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    userType: "mentee" as "mentor" | "mentee" | "startup",
    bio: "",
    location: "",
    expertise: [] as string[],
    industries: [] as string[],
    goals: [] as string[]
  })

  const [newExpertise, setNewExpertise] = useState("")
  const [newIndustry, setNewIndustry] = useState("")
  const [newGoal, setNewGoal] = useState("")

  const handleAddExpertise = () => {
    if (newExpertise && !profile.expertise.includes(newExpertise)) {
      setProfile(prev => ({ ...prev, expertise: [...prev.expertise, newExpertise] }))
      setNewExpertise("")
    }
  }

  const handleAddIndustry = () => {
    if (newIndustry && !profile.industries.includes(newIndustry)) {
      setProfile(prev => ({ ...prev, industries: [...prev.industries, newIndustry] }))
      setNewIndustry("")
    }
  }

  const handleAddGoal = () => {
    if (newGoal && !profile.goals.includes(newGoal)) {
      setProfile(prev => ({ ...prev, goals: [...prev.goals, newGoal] }))
      setNewGoal("")
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        {[1, 2, 3, 4, 5].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
              step <= currentStep ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted border-muted-foreground'
            }`}>
              {step}
            </div>
            {step < 5 && (
              <div className={`w-16 h-0.5 mx-2 ${
                step < currentStep ? 'bg-primary' : 'bg-muted'
              }`} />
            )}
          </div>
        ))}
      </div>

      <Card>
        <CardContent className="p-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label>Full Name</Label>
                  <Input
                    value={profile.name}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-3">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>User Type</Label>
                <Select value={profile.userType} onValueChange={(value) => setProfile(prev => ({ ...prev, userType: value as any }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mentor">Mentor</SelectItem>
                    <SelectItem value="mentee">Mentee</SelectItem>
                    <SelectItem value="startup">Startup</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Bio</Label>
                <Textarea
                  value={profile.bio}
                  onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Tell us about yourself, your background, and what you're looking for..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-3">
                <Label>Location</Label>
                <Input
                  value={profile.location}
                  onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="City, Country"
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="space-y-3">
                <Label>Areas of Expertise</Label>
                <div className="flex gap-2">
                  <Input
                    value={newExpertise}
                    onChange={(e) => setNewExpertise(e.target.value)}
                    placeholder="Add expertise area"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddExpertise()}
                  />
                  <Button onClick={handleAddExpertise} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.expertise.map((exp) => (
                    <Badge key={exp} variant="secondary" className="flex items-center gap-1">
                      {exp}
                      <button type="button" onClick={() => setProfile(prev => ({ ...prev, expertise: prev.expertise.filter(e => e !== exp) }))}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label>Industries</Label>
                <div className="flex gap-2">
                  <Input
                    value={newIndustry}
                    onChange={(e) => setNewIndustry(e.target.value)}
                    placeholder="Add industry"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddIndustry()}
                  />
                  <Button onClick={handleAddIndustry} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.industries.map((ind) => (
                    <Badge key={ind} variant="outline" className="flex items-center gap-1">
                      {ind}
                      <button type="button" onClick={() => setProfile(prev => ({ ...prev, industries: prev.industries.filter(i => i !== ind) }))}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label>Goals</Label>
                <div className="flex gap-2">
                  <Input
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                    placeholder="Add a goal"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddGoal()}
                  />
                  <Button onClick={handleAddGoal} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.goals.map((goal) => (
                    <Badge key={goal} variant="default" className="flex items-center gap-1">
                      {goal}
                      <button type="button" onClick={() => setProfile(prev => ({ ...prev, goals: prev.goals.filter(g => g !== goal) }))}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            
            {currentStep < 5 ? (
              <Button onClick={() => setCurrentStep(currentStep + 1)}>
                Next
              </Button>
            ) : (
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Profile
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 