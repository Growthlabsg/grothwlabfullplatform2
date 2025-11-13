"use client"


import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
  Plus,
  Eye,
  Linkedin,
  Github,
  Twitter,
} from "lucide-react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useCofounder } from "@/contexts/CofounderContext"

export default function CoFounderMatchingPage() {
  const { toast } = useToast()
  const { 
    profiles, 
    savedProfiles, 
    connectionRequests, 
    conversations,
    saveProfile, 
    unsaveProfile, 
    sendConnectionRequest, 
    sendMessage,
    isProfileSaved,
    hasConnectionRequest,
    getConversation
  } = useCofounder()
  const [filteredProfiles, setFilteredProfiles] = useState(profiles)
  const [selectedProfile, setSelectedProfile] = useState<any>(null)
  const [showCreateProfile, setShowCreateProfile] = useState(false)
  const [showProfileDetails, setShowProfileDetails] = useState(false)
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"cards" | "list">("cards")
  const [sortBy, setSortBy] = useState<"compatibility" | "recent" | "location" | "name">("compatibility")
  const [filters, setFilters] = useState({
    minScore: 0.5,
    location: [] as string[],
    experience: [] as string[],
    availability: [] as string[],
    skills: [] as string[],
    values: [] as string[],
    industry: [] as string[],
    commitment: [] as string[],
    timezone: [] as string[],
    languages: [] as string[]
  })

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    applyFilters(newFilters)
  }

  const applyFilters = (filterSettings: any) => {
    let filtered = profiles.filter(profile => {
      // Search query filter
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase()
        const searchableText = `${profile.name} ${profile.skills.join(' ')} ${profile.values.join(' ')} ${profile.bio || ''} ${profile.lookingFor || ''}`.toLowerCase()
        if (!searchableText.includes(searchLower)) return false
      }

      // Compatibility score filter
      if (filterSettings.minScore && profile.compatibilityScore < filterSettings.minScore) return false

      // Location filter
      if (filterSettings.location.length > 0) {
        if (!filterSettings.location.some((loc: string) => 
          profile.location.toLowerCase().includes(loc.toLowerCase())
        )) return false
      }

      // Experience filter
      if (filterSettings.experience.length > 0) {
        if (!filterSettings.experience.includes(profile.experience)) return false
      }

      // Availability filter
      if (filterSettings.availability.length > 0) {
        if (!filterSettings.availability.includes(profile.availability)) return false
      }

      // Skills filter
      if (filterSettings.skills.length > 0) {
        const hasRequiredSkills = filterSettings.skills.some((skill: string) => 
          profile.skills.includes(skill)
        )
        if (!hasRequiredSkills) return false
      }

      // Values filter
      if (filterSettings.values.length > 0) {
        const hasRequiredValues = filterSettings.values.some((value: string) => 
          profile.values.includes(value)
        )
        if (!hasRequiredValues) return false
      }

      // Industry filter
      if (filterSettings.industry.length > 0) {
        const hasRequiredIndustry = filterSettings.industry.some((industry: string) => 
          profile.industry && profile.industry.includes(industry)
        )
        if (!hasRequiredIndustry) return false
      }

      // Commitment filter
      if (filterSettings.commitment.length > 0) {
        if (!filterSettings.commitment.includes(profile.commitment)) return false
      }

      // Timezone filter
      if (filterSettings.timezone.length > 0) {
        if (!filterSettings.timezone.includes(profile.timezone)) return false
      }

      // Languages filter
      if (filterSettings.languages.length > 0) {
        const hasRequiredLanguage = filterSettings.languages.some((language: string) => 
          profile.languages && profile.languages.includes(language)
        )
        if (!hasRequiredLanguage) return false
      }

      return true
    })

    // Apply sorting
    filtered = sortProfiles(filtered, sortBy)
    
    setFilteredProfiles(filtered)
  }

  const sortProfiles = (profilesToSort: any[], sortType: string) => {
    switch (sortType) {
      case "compatibility":
        return [...profilesToSort].sort((a, b) => b.compatibilityScore - a.compatibilityScore)
      case "recent":
        return [...profilesToSort].sort((a, b) => new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime())
      case "location":
        return [...profilesToSort].sort((a, b) => a.location.localeCompare(b.location))
      case "name":
        return [...profilesToSort].sort((a, b) => a.name.localeCompare(b.name))
      default:
        return profilesToSort
    }
  }

  // Apply filters when search query changes
  useEffect(() => {
    applyFilters(filters)
  }, [searchQuery, sortBy])

  const handleConnect = (profile: any) => {
    sendConnectionRequest(profile.id)
    toast({
      title: "Connection Request Sent",
      description: `Your connection request has been sent to ${profile.name}`,
    })
  }

  const handleSave = (profile: any) => {
    if (isProfileSaved(profile.id)) {
      unsaveProfile(profile.id)
      toast({
        title: "Profile Unsaved",
        description: `${profile.name}'s profile has been removed from your favorites`,
      })
    } else {
      saveProfile(profile.id)
      toast({
        title: "Profile Saved",
        description: `${profile.name}'s profile has been saved to your favorites`,
      })
    }
  }

  const handleShare = (profile: any) => {
    const shareText = `Check out ${profile.name} - ${profile.skills.join(", ")} expert`
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

    return (
    <div>
      <div className="container mx-auto max-w-7xl px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold">Find Your Co-Founder (Jobs Portal)</h1>
            <p className="text-[#334155] mt-2">
              Connect with potential co-founders based on skills, values, and goals
            </p>
          </div>
              <div className="flex items-center gap-2">
                <Button 
                  className="bg-[#0F7377] hover:bg-[#0F7377]/90"
                  onClick={() => setShowCreateProfile(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Profile
                </Button>
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
                    <p className="text-2xl font-bold">{filteredProfiles.length}</p>
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
                      {filteredProfiles.filter(p => p.matchQuality === 'excellent').length}
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
                      {filteredProfiles.length}
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
                      {filteredProfiles.filter(p => p.isVerified).length}
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
                      values: [],
                      industry: [],
                      commitment: [],
                      timezone: [],
                      languages: []
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
            {/* Enhanced Sort and Search */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search by name, skills, interests, or bio..." 
                  className="pl-9" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as "compatibility" | "recent" | "location" | "name")}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compatibility">Best Matches</SelectItem>
                  <SelectItem value="recent">Recently Active</SelectItem>
                  <SelectItem value="location">Nearby</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                variant="outline" 
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Advanced Filters
              </Button>
            </div>

            {/* Advanced Filters Panel */}
            {showAdvancedFilters && (
              <Card className="mb-6">
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Industry Focus</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {["AI", "Fintech", "Healthcare", "Edtech", "SaaS", "Blockchain"].map((industry) => (
                          <Badge 
                            key={industry}
                            variant={filters.industry.includes(industry) ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => {
                              const newIndustries = filters.industry.includes(industry)
                                ? filters.industry.filter(i => i !== industry)
                                : [...filters.industry, industry]
                              handleFilterChange("industry", newIndustries)
                            }}
                          >
                            {industry}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Commitment Level</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {["high", "medium", "low"].map((level) => (
                          <Badge 
                            key={level}
                            variant={filters.commitment.includes(level) ? "default" : "outline"}
                            className="cursor-pointer capitalize"
                            onClick={() => {
                              const newCommitment = filters.commitment.includes(level)
                                ? filters.commitment.filter(c => c !== level)
                                : [...filters.commitment, level]
                              handleFilterChange("commitment", newCommitment)
                            }}
                          >
                            {level}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Languages</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {["English", "Spanish", "Mandarin", "French", "Hindi"].map((lang) => (
                          <Badge 
                            key={lang}
                            variant={filters.languages.includes(lang) ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => {
                              const newLanguages = filters.languages.includes(lang)
                                ? filters.languages.filter(l => l !== lang)
                                : [...filters.languages, lang]
                              handleFilterChange("languages", newLanguages)
                            }}
                          >
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Matches */}
            {viewMode === "cards" ? (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredProfiles.map((profile) => (
                  <Card key={profile.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{profile.name}</h3>
                              {profile.isVerified && (
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-[#334155]">
                              <MapPin className="h-3 w-3" />
                              {profile.location}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleSave(profile)}>
                            <Bookmark className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleShare(profile)}>
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Compatibility Score */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Compatibility</span>
                          <span className="text-sm font-bold">{Math.round(profile.compatibilityScore * 100)}%</span>
                        </div>
                        <Progress value={profile.compatibilityScore * 100} className="h-2" />
                        <Badge 
                          variant="outline" 
                          className={`mt-2 ${getMatchQualityColor(profile.matchQuality)}`}
                        >
                          {profile.matchQuality.charAt(0).toUpperCase() + profile.matchQuality.slice(1)} Match
                        </Badge>
              </div>
              
                      {/* Enhanced Profile Info */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-medium">Skills & Expertise</h4>
                          <Badge variant="outline" className={`text-xs ${getExperienceColor(profile.experience)}`}>
                            {profile.experience}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {profile.skills.slice(0, 4).map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                    </Badge>
                  ))}
                          {profile.skills.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                              +{profile.skills.length - 4} more
                    </Badge>
                  )}
                </div>
              </div>
              
                      {/* Experience & Availability */}
                      <div className="flex items-center gap-4 mb-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Briefcase className="h-3 w-3" />
                          <Badge variant="outline" className={getExperienceColor(profile.experience)}>
                            {profile.experience}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span className="capitalize">{profile.availability}</span>
                        </div>
                      </div>

                      {/* Industry & Looking For */}
                      {profile.industry && (
                        <div className="mb-3">
                          <h4 className="text-sm font-medium mb-2">Industry Focus</h4>
                          <div className="flex flex-wrap gap-1">
                            {profile.industry.slice(0, 2).map((industry) => (
                              <Badge key={industry} variant="outline" className="text-xs bg-blue-50 text-blue-700">
                                {industry}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Bio Preview */}
                      {profile.bio && (
                        <div className="mb-3">
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {profile.bio}
                          </p>
                        </div>
                      )}
                      
                      {/* Looking For */}
                      {profile.lookingFor && (
                        <div className="mb-3">
                          <h4 className="text-sm font-medium mb-1">Looking For</h4>
                          <p className="text-sm text-gray-600 line-clamp-1">
                            {profile.lookingFor}
                          </p>
                        </div>
                      )}
                      
                      {/* Values */}
                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-2">Values</h4>
                        <div className="flex flex-wrap gap-1">
                          {profile.values.slice(0, 3).map((value) => (
                            <Badge key={value} variant="outline" className="text-xs">
                              {value}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      {/* Enhanced Action Buttons */}
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="flex-1 bg-[#0F7377] hover:bg-[#0F7377]/90"
                          onClick={() => handleConnect(profile)}
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                  Connect
                </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setSelectedProfile(profile)}
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
                {filteredProfiles.map((profile) => (
                  <Card key={profile.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{profile.name}</h3>
                              {profile.isVerified && (
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-[#334155]">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {profile.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Briefcase className="h-3 w-3" />
                                {profile.experience}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {profile.availability}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-lg font-bold">{Math.round(profile.compatibilityScore * 100)}%</div>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${getMatchQualityColor(profile.matchQuality)}`}
                            >
                              {profile.matchQuality}
                            </Badge>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon" onClick={() => handleSave(profile)}>
                              <Bookmark className="h-4 w-4" />
          </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleShare(profile)}>
                              <Share2 className="h-4 w-4" />
          </Button>
                            <Button size="sm" onClick={() => handleConnect(profile)}>
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

            {filteredProfiles.length === 0 && (
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
                      values: [],
                      industry: [],
                      commitment: [],
                      timezone: [],
                      languages: []
                    })}>
                      Clear All Filters
                    </Button>
              </div>
            </CardContent>
          </Card>
            )}
          </div>
        </div>
      </div>

      {/* Profile Creation Modal */}
      <Dialog open={showCreateProfile} onOpenChange={setShowCreateProfile}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Create Your Co-Founder Profile</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Basic Details Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Basic Details</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input id="firstName" placeholder="Enter your first name" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input id="lastName" placeholder="Enter your last name" />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" placeholder="your.email@example.com" />
              </div>

              <div>
                <Label htmlFor="linkedin">LinkedIn URL *</Label>
                <Input id="linkedin" placeholder="https://linkedin.com/in/yourprofile" />
                <div className="flex items-center space-x-2 mt-2">
                  <Checkbox id="noLinkedin" />
                  <Label htmlFor="noLinkedin" className="text-sm">I don't have a LinkedIn profile</Label>
                </div>
              </div>

              <div>
                <Label htmlFor="location">Location *</Label>
                <Input id="location" placeholder="What country and city are you in?" />
              </div>

              <div>
                <Label htmlFor="introduction">Introduce yourself! *</Label>
                <Textarea 
                  id="introduction" 
                  placeholder="Write a paragraph or two about your background and what you're looking for. Cover your professional accomplishments and interests, but it's ok to get a little personal here as well!"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="video">(Optional) 1-minute video introducing yourself</Label>
                <Input id="video" type="file" accept="video/*" />
              </div>

              <div>
                <Label htmlFor="accomplishment1">Impressive accomplishment *</Label>
                <Input id="accomplishment1" placeholder="For example, an academic or professional achievement, an award you've won, or something impressive you've built." />
              </div>

              <div>
                <Label htmlFor="accomplishment2">Impressive accomplishment *</Label>
                <Input id="accomplishment2" placeholder="For example, an academic or professional achievement, an award you've won, or something impressive you've built." />
              </div>

              <div>
                <Label htmlFor="employment">Employment: employers, position / titles, and dates. Use a separate line for each job, most recent first. *</Label>
                <Textarea 
                  id="employment" 
                  placeholder="Company Name - Position - Start Date to End Date"
                  rows={4}
                />
              </div>

              <div>
                <Label>Are you technical? *</Label>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="technical-yes" name="technical" value="yes" />
                    <Label htmlFor="technical-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="technical-no" name="technical" value="no" />
                    <Label htmlFor="technical-no">No</Label>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-1">You are a programmer, scientist or engineer who can build the product without outside assistance.</p>
              </div>

              <div>
                <Label htmlFor="scheduling">(Optional) Scheduling URL (Calendly, Cal, or Google Calendar)</Label>
                <Input id="scheduling" placeholder="https://calendly.com/yourname" />
              </div>

              <div>
                <Label htmlFor="twitter">(Optional) Twitter URL</Label>
                <Input id="twitter" placeholder="https://twitter.com/yourhandle" />
                <p className="text-sm text-gray-600 mt-1">Only your matches will be able to see your Twitter.</p>
              </div>

              <div>
                <Label htmlFor="instagram">(Optional) Instagram URL</Label>
                <Input id="instagram" placeholder="https://instagram.com/yourhandle" />
                <p className="text-sm text-gray-600 mt-1">Only your matches will be able to see your Instagram.</p>
              </div>

              <div>
                <Label htmlFor="hearAbout">How did you hear about GrowthLab Co-Founder Matching?</Label>
                <Input id="hearAbout" placeholder="e.g., Social media, friend, search engine, etc." />
              </div>
            </div>

            {/* Additional Details Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Additional Details</h3>
              
              <div>
                <Label>Do you already have a startup or idea that you're set on? *</Label>
                <div className="space-y-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="idea-committed" name="idea" value="committed" />
                    <Label htmlFor="idea-committed">Yes, I'm committed to an idea and I want a co-founder who can help me build it</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="idea-open" name="idea" value="open" />
                    <Label htmlFor="idea-open">I have some ideas, but I'm also open to exploring other ideas</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="idea-none" name="idea" value="none" />
                    <Label htmlFor="idea-none">No, I could help a co-founder with their existing idea or explore new ideas together</Label>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="companyName">What is the name of your company or project? *</Label>
                <Input id="companyName" placeholder="Enter company or project name" />
              </div>

              <div>
                <Label htmlFor="companyDescription">Describe your company or project in a few sentences. *</Label>
                <Textarea 
                  id="companyDescription" 
                  placeholder="Describe your startup idea, target market, and value proposition..."
                  rows={3}
                />
                <p className="text-sm text-gray-600 mt-1">Characters used: <span id="charCount">0</span> (out of 500, minimum 10)</p>
              </div>

              <div>
                <Label htmlFor="progress">(Optional) How long have you been working on this and what progress have you made?</Label>
                <Textarea 
                  id="progress" 
                  placeholder="Describe your progress, milestones achieved, and current status..."
                  rows={3}
                />
                <p className="text-sm text-gray-600 mt-1">Characters used: <span id="progressCharCount">0</span> (out of 500)</p>
              </div>

              <div>
                <Label htmlFor="funding">(Optional) If you've already raised funding for this startup, who invested and how much have you raised?</Label>
                <Input id="funding" placeholder="e.g., GrowthLab - $125k, Angel investors - $50k" />
              </div>

              <div>
                <Label>Do you already have a co-founder? *</Label>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="cofounder-yes" name="cofounder" value="yes" />
                    <Label htmlFor="cofounder-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="cofounder-no" name="cofounder" value="no" />
                    <Label htmlFor="cofounder-no">No</Label>
                  </div>
                </div>
              </div>

                <div>
                <Label>When do you want to start working on a startup full-time? *</Label>
                <div className="space-y-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="timing-now" name="timing" value="now" />
                    <Label htmlFor="timing-now">I'm already full-time on my startup</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="timing-soon" name="timing" value="soon" />
                    <Label htmlFor="timing-soon">I'm ready to go full-time as soon as I meet the right co-founder</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="timing-year" name="timing" value="year" />
                    <Label htmlFor="timing-year">I'm planning to go full-time in the next year</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="timing-unsure" name="timing" value="unsure" />
                    <Label htmlFor="timing-unsure">I don't have any specific plans yet</Label>
                  </div>
                </div>
              </div>

              <div>
                <Label>Which areas of a startup are you willing to take responsibility for? *</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {['Product', 'Engineering', 'Design', 'Sales & Marketing', 'Operations', 'Finance', 'Legal', 'HR'].map((area) => (
                    <div key={area} className="flex items-center space-x-2">
                      <Checkbox id={`area-${area.toLowerCase().replace(/\s+/g, '-')}`} />
                      <Label htmlFor={`area-${area.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm">{area}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Which topics and industries are you interested in? *</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {[
                    'Agriculture/Agtech', 'Artificial Intelligence', 'Augmented Reality/VR', 'B2B/Enterprise',
                    'Biomedical/Biotech', 'Blockchain', 'Climate/Sustainability', 'Consumer', 'E-Commerce',
                    'Developer Tools', 'Education/Edtech', 'Energy', 'Entertainment', 'Financial/Fintech',
                    'Food/Beverage', 'Gaming', 'Government', 'Hardware', 'Hard Tech', 'Health/Wellness',
                    'Healthcare', 'Marketplace', 'Media', 'Mobile', 'Real Estate', 'Retail', 'SaaS',
                    'Security', 'Social', 'Transportation', 'Travel', 'Other'
                  ].map((industry) => (
                    <div key={industry} className="flex items-center space-x-2">
                      <Checkbox id={`industry-${industry.toLowerCase().replace(/[\/\s]+/g, '-')}`} />
                      <Label htmlFor={`industry-${industry.toLowerCase().replace(/[\/\s]+/g, '-')}`} className="text-sm">{industry}</Label>
                    </div>
                  ))}
        </div>
      </div>
    </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <Button variant="outline" onClick={() => setShowCreateProfile(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                toast({
                  title: "Profile Created Successfully!",
                  description: "Your co-founder profile has been created and is now visible to potential matches.",
                })
                setShowCreateProfile(false)
              }}>
                Create Profile
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Detailed Profile Modal */}
      <Dialog open={showProfileDetails} onOpenChange={setShowProfileDetails}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Co-Founder Profile</DialogTitle>
          </DialogHeader>
          
          {selectedProfile && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-lg">{selectedProfile.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="text-xl font-bold">{selectedProfile.name}</h2>
                      {selectedProfile.isVerified && (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                      {selectedProfile.isPremium && (
                        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                          <Star className="h-3 w-3 mr-1" />
                          Premium
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {selectedProfile.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {selectedProfile.timezone}
                      </span>
                      <span className="flex items-center gap-1">
                        <Globe className="h-3 w-3" />
                        {selectedProfile.languages?.join(', ')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleSave(selectedProfile)}>
                    <Bookmark className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleShare(selectedProfile)}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Compatibility Score */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Compatibility Score</h3>
                  <span className="text-2xl font-bold text-[#0F7377]">{Math.round(selectedProfile.compatibilityScore * 100)}%</span>
                </div>
                <Progress value={selectedProfile.compatibilityScore * 100} className="h-3" />
                <Badge 
                  variant="outline" 
                  className={`mt-2 ${getMatchQualityColor(selectedProfile.matchQuality)}`}
                >
                  {selectedProfile.matchQuality.charAt(0).toUpperCase() + selectedProfile.matchQuality.slice(1)} Match
                </Badge>
              </div>

              {/* Bio */}
              {selectedProfile.bio && (
                <div>
                  <h3 className="font-semibold mb-2">About</h3>
                  <p className="text-gray-700">{selectedProfile.bio}</p>
                </div>
              )}

              {/* Looking For */}
              {selectedProfile.lookingFor && (
                <div>
                  <h3 className="font-semibold mb-2">Looking For</h3>
                  <p className="text-gray-700">{selectedProfile.lookingFor}</p>
                </div>
              )}

              {/* Skills & Experience */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Skills & Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                                         {selectedProfile.skills.map((skill: string) => (
                       <Badge key={skill} variant="secondary">
                         {skill}
                       </Badge>
                     ))}
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <Badge variant="outline" className={getExperienceColor(selectedProfile.experience)}>
                      {selectedProfile.experience} Level
                    </Badge>
                    <Badge variant="outline">
                      {selectedProfile.availability} Available
                    </Badge>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Values & Goals</h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Values</h4>
                      <div className="flex flex-wrap gap-2">
                                               {selectedProfile.values.map((value: string) => (
                         <Badge key={value} variant="outline">
                           {value}
                         </Badge>
                       ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Goals</h4>
                      <div className="flex flex-wrap gap-2">
                                               {selectedProfile.goals.map((goal: string) => (
                         <Badge key={goal} variant="outline" className="bg-green-50 text-green-700">
                           {goal}
                         </Badge>
                       ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Industry & Achievements */}
              <div className="grid md:grid-cols-2 gap-6">
                {selectedProfile.industry && (
                  <div>
                    <h3 className="font-semibold mb-3">Industry Focus</h3>
                    <div className="flex flex-wrap gap-2">
                                           {selectedProfile.industry.map((industry: string) => (
                       <Badge key={industry} variant="outline" className="bg-blue-50 text-blue-700">
                         {industry}
                       </Badge>
                     ))}
                    </div>
                  </div>
                )}

                {selectedProfile.achievements && (
                  <div>
                    <h3 className="font-semibold mb-3">Achievements</h3>
                    <div className="space-y-2">
                                             {selectedProfile.achievements.map((achievement: string, index: number) => (
                         <div key={index} className="flex items-center gap-2">
                           <Award className="h-4 w-4 text-yellow-600" />
                           <span className="text-sm">{achievement}</span>
                         </div>
                       ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Education & Background */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Education & Background</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-gray-600" />
                      <span className="text-sm">{selectedProfile.education}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-gray-600" />
                      <span className="text-sm">{selectedProfile.previousStartups} previous startups</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-gray-600" />
                      <span className="text-sm capitalize">{selectedProfile.commitment} commitment</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Contact & Links</h3>
                  <div className="space-y-2">
                    {selectedProfile.linkedin && (
                      <div className="flex items-center gap-2">
                        <Linkedin className="h-4 w-4 text-blue-600" />
                        <a href={selectedProfile.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                          LinkedIn Profile
                        </a>
                      </div>
                    )}
                    {selectedProfile.github && (
                      <div className="flex items-center gap-2">
                        <Github className="h-4 w-4 text-gray-800" />
                        <a href={selectedProfile.github} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:underline">
                          GitHub Profile
                        </a>
                      </div>
                    )}
                    {selectedProfile.twitter && (
                      <div className="flex items-center gap-2">
                        <Twitter className="h-4 w-4 text-blue-400" />
                        <a href={selectedProfile.twitter} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-400 hover:underline">
                          Twitter Profile
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-6 border-t">
                <Button variant="outline" onClick={() => setShowProfileDetails(false)}>
                  Close
                </Button>
                <Button 
                  className="bg-[#0F7377] hover:bg-[#0F7377]/90"
                  onClick={() => {
                    handleConnect(selectedProfile)
                    setShowProfileDetails(false)
                  }}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Connection Request
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
