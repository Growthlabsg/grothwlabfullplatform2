"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  MessageSquare,
  MapPin,
  Users,
  Plus,
  Eye,
  Search,
  Filter,
  CheckCircle,
  Sparkles,
  Star,
  Heart,
  Bookmark,
  Share2,
  Settings,
  ChevronLeft,
  TrendingUp,
  Clock,
  Award,
  Target,
  Zap,
  Globe,
  Building,
  UserCheck,
  MessageCircle,
  Calendar,
  BarChart3,
  Filter as FilterIcon,
  SortAsc,
  SortDesc,
  RefreshCw,
  Download,
  Upload,
  Bell,
  Mail,
  Phone,
  Video,
  Send,
  ThumbsUp,
  ThumbsDown,
  Flag,
  MoreHorizontal,
  X,
  Briefcase,
  GraduationCap,
  Languages,
  Network,
  ArrowRight,
  ChevronRight,
  Lightbulb,
  Shield,
  Coffee,
  Handshake,
  Rocket,
  Linkedin,
  Github,
  Twitter
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useCofounder } from "@/contexts/CofounderContext"
import { useCommunicationActions } from "@/hooks/use-communication-actions"
import { GlobalCommunicationButton } from "@/components/communication/global-communication-button"

export default function NetworkFindCoFounderPage() {
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
  
  const { handleConnect: openCommunicationHub, handleMessage, handleChat } = useCommunicationActions()
  
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
  const [hasCoFounderProfile, setHasCoFounderProfile] = useState(false)
  const [userProfile, setUserProfile] = useState(null)
  const [activeConversation, setActiveConversation] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [showCommunicationHub, setShowCommunicationHub] = useState(false)
  const [newMessage, setNewMessage] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [selectedExperience, setSelectedExperience] = useState("all")
  const [selectedAvailability, setSelectedAvailability] = useState("all")
  const [selectedCommitment, setSelectedCommitment] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [selectedConversation, setSelectedConversation] = useState<any>(null)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    // Check if user has a co-founder profile
    const profile = localStorage.getItem('coFounderProfile')
    if (profile) {
      setHasCoFounderProfile(true)
      setUserProfile(JSON.parse(profile))
    }
  }, [])

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
        const searchableText = `${profile.name} ${profile.skills.join(' ')} ${profile.bio || ''}`.toLowerCase()
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
  }, [searchQuery, sortBy, profiles])

  const handleConnectProfile = (profile: any) => {
    sendConnectionRequest(profile.id)
    toast({
      title: "Connection Request Sent",
      description: `Your connection request has been sent to ${profile.name}. You can chat once they accept your request.`,
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




  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      sendMessage(selectedConversation.profileId, newMessage)
      setNewMessage("")
    }
  }

  return (
    <div>
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
                          <AvatarFallback>{profile.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
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
                          {profile.skills.slice(0, 4).map((skill: string) => (
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
                      
                      {/* Enhanced Action Buttons */}
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  className="flex-1 bg-[#0F7377] hover:bg-[#0F7377]/90"
                  onClick={() => handleConnectProfile(profile)}
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
                            <AvatarFallback>{profile.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
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
                            <Button size="sm" onClick={() => handleConnectProfile(profile)}>
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

      {/* Profile Detail Modal */}
      {selectedProfile && (
        <Dialog open={!!selectedProfile} onOpenChange={() => setSelectedProfile(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback>{selectedProfile.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold">{selectedProfile.name}</h2>
                    {selectedProfile.isVerified && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-[#334155] flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {selectedProfile.location}
                  </p>
                </div>
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Compatibility Score */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Compatibility Score</span>
                  <span className="text-lg font-bold">{Math.round(selectedProfile.compatibilityScore * 100)}%</span>
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
                  <h3 className="font-medium mb-2">About</h3>
                  <p className="text-sm text-gray-600">{selectedProfile.bio}</p>
                </div>
              )}

              {/* Skills */}
              <div>
                <h3 className="font-medium mb-2">Skills & Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProfile.skills.map((skill: string) => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>

              {/* Experience & Availability */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-2">Experience Level</h3>
                  <Badge variant="outline" className={getExperienceColor(selectedProfile.experience)}>
                    {selectedProfile.experience}
                  </Badge>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Availability</h3>
                  <span className="text-sm capitalize">{selectedProfile.availability}</span>
                </div>
              </div>

              {/* Looking For */}
              {selectedProfile.lookingFor && (
                <div>
                  <h3 className="font-medium mb-2">Looking For</h3>
                  <p className="text-sm text-gray-600">{selectedProfile.lookingFor}</p>
                </div>
              )}

              {/* Social Links */}
              {(selectedProfile.linkedin || selectedProfile.github || selectedProfile.twitter) && (
                <div>
                  <h3 className="font-medium mb-2">Social Links</h3>
                  <div className="flex gap-2">
                    {selectedProfile.linkedin && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={selectedProfile.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="h-4 w-4 mr-2" />
                          LinkedIn
                        </a>
                      </Button>
                    )}
                    {selectedProfile.github && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={selectedProfile.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          GitHub
                        </a>
                      </Button>
                    )}
                    {selectedProfile.twitter && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={selectedProfile.twitter} target="_blank" rel="noopener noreferrer">
                          <Twitter className="h-4 w-4 mr-2" />
                          Twitter
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <GlobalCommunicationButton
                  user={selectedProfile}
                  variant="connect"
                  className="flex-1"
                  onClick={() => setSelectedProfile(null)}
                >
                  Connect & Chat
                </GlobalCommunicationButton>
                <Button 
                  variant="outline"
                  onClick={() => handleSave(selectedProfile)}
                >
                  <Bookmark className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleShare(selectedProfile)}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Communication Hub */}
      <Dialog open={showCommunicationHub} onOpenChange={setShowCommunicationHub}>
        <DialogContent className="max-w-4xl h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Communication Hub
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex h-full">
            {/* Conversations List */}
            <div className="w-1/3 border-r pr-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Conversations</h3>
                  <Badge variant="outline">{conversations.length}</Badge>
                </div>
                
                {conversations.map((conversation: any) => (
                  <div
                    key={conversation.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedConversation?.id === conversation.id
                        ? 'bg-[#0F7377]/10 border border-[#0F7377]/20'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedConversation(conversation)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        conversation.type === 'cofounder' ? 'bg-blue-500' :
                        conversation.type === 'investor' ? 'bg-green-500' :
                        conversation.type === 'mentor' ? 'bg-purple-500' :
                        conversation.type === 'teacher' ? 'bg-orange-500' :
                        conversation.type === 'expert' ? 'bg-red-500' :
                        'bg-gray-500'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{conversation.name}</p>
                        <p className="text-xs text-gray-500 truncate">{conversation.lastMessage}</p>
                      </div>
                      {conversation.unreadCount > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {conversation.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col pl-4">
              {selectedConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="flex items-center gap-3 pb-4 border-b">
                    <div className={`w-3 h-3 rounded-full ${
                      selectedConversation.type === 'cofounder' ? 'bg-blue-500' :
                      selectedConversation.type === 'investor' ? 'bg-green-500' :
                      selectedConversation.type === 'mentor' ? 'bg-purple-500' :
                      selectedConversation.type === 'teacher' ? 'bg-orange-500' :
                      selectedConversation.type === 'expert' ? 'bg-red-500' :
                      'bg-gray-500'
                    }`} />
                    <div>
                      <h3 className="font-medium">{selectedConversation.name}</h3>
                      <p className="text-sm text-gray-500 capitalize">{selectedConversation.type}</p>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto py-4 space-y-4">
                    {selectedConversation.messages.map((message: any) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] p-3 rounded-lg ${
                            message.sender === 'me'
                              ? 'bg-[#0F7377] text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="flex gap-2 pt-4 border-t">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button onClick={handleSendMessage} size="sm">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Select a conversation to start chatting</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
