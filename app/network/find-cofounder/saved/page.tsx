"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  MessageSquare, 
  Bookmark, 
  Share2, 
  Eye, 
  MapPin, 
  Clock, 
  Briefcase, 
  Users, 
  CheckCircle, 
  X,
  MoreHorizontal,
  Calendar,
  Star,
  Heart
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { useCommunicationActions } from "@/hooks/use-communication-actions"
import { GlobalCommunicationButton } from "@/components/communication/global-communication-button"

interface SavedProfile {
  id: string
  name: string
  location: string
  industry: string
  experience: string
  skills: string[]
  bio: string
  compatibilityScore: number
  matchQuality: "excellent" | "good" | "fair" | "poor"
  lastActive: string
  savedDate: string
  isVerified: boolean
  socialMedia: {
    linkedin?: string
    github?: string
    twitter?: string
  }
  notes?: string
  tags: string[]
}

export default function SavedProfiles() {
  const { toast } = useToast()
  const { handleConnect: openCommunicationHub } = useCommunicationActions()
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("savedDate")
  const [filterBy, setFilterBy] = useState("all")
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>([])

  const savedProfiles: SavedProfile[] = [
    {
      id: "1",
      name: "Sarah Chen",
      location: "San Francisco, CA",
      industry: "Technology",
      experience: "Expert",
      skills: ["React", "Node.js", "AWS", "Product Management"],
      bio: "Experienced full-stack developer with 8+ years in building scalable web applications. Passionate about creating user-centric products.",
      compatibilityScore: 0.94,
      matchQuality: "excellent",
      lastActive: "2 hours ago",
      savedDate: "2024-01-15",
      isVerified: true,
      socialMedia: {
        linkedin: "https://linkedin.com/in/sarahchen",
        github: "https://github.com/sarahchen"
      },
      notes: "Great technical skills, very responsive to messages",
      tags: ["technical", "responsive", "experienced"]
    },
    {
      id: "2",
      name: "Michael Rodriguez",
      location: "New York, NY",
      industry: "Fintech",
      experience: "Senior",
      skills: ["Python", "Machine Learning", "Blockchain", "Finance"],
      bio: "Fintech expert with strong background in machine learning and blockchain technology. Looking to build the next generation of financial products.",
      compatibilityScore: 0.87,
      matchQuality: "good",
      lastActive: "1 day ago",
      savedDate: "2024-01-14",
      isVerified: true,
      socialMedia: {
        linkedin: "https://linkedin.com/in/michaelrodriguez",
        twitter: "https://twitter.com/mrodriguez"
      },
      notes: "Excellent fintech knowledge, potential for B2B product",
      tags: ["fintech", "ml", "blockchain"]
    },
    {
      id: "3",
      name: "Emma Thompson",
      location: "London, UK",
      industry: "Healthcare",
      experience: "Expert",
      skills: ["Healthcare", "Regulatory", "Product Strategy", "Business Development"],
      bio: "Healthcare industry veteran with deep expertise in regulatory compliance and product strategy. Passionate about improving patient outcomes through technology.",
      compatibilityScore: 0.91,
      matchQuality: "excellent",
      lastActive: "3 hours ago",
      savedDate: "2024-01-13",
      isVerified: true,
      socialMedia: {
        linkedin: "https://linkedin.com/in/emmathompson"
      },
      notes: "Strong healthcare background, good for B2B healthcare startup",
      tags: ["healthcare", "regulatory", "strategy"]
    },
    {
      id: "4",
      name: "David Kim",
      location: "Singapore",
      industry: "SaaS",
      experience: "Senior",
      skills: ["Sales", "Marketing", "Growth", "Customer Success"],
      bio: "Growth-focused professional with proven track record in scaling SaaS companies. Expert in customer acquisition and retention strategies.",
      compatibilityScore: 0.82,
      matchQuality: "good",
      lastActive: "5 hours ago",
      savedDate: "2024-01-12",
      isVerified: false,
      socialMedia: {
        linkedin: "https://linkedin.com/in/davidkim",
        twitter: "https://twitter.com/davidkim"
      },
      notes: "Great for sales and marketing side of the business",
      tags: ["sales", "marketing", "growth"]
    },
    {
      id: "5",
      name: "Lisa Wang",
      location: "Berlin, Germany",
      industry: "AI/ML",
      experience: "Expert",
      skills: ["AI", "Machine Learning", "Computer Vision", "Research"],
      bio: "AI researcher and entrepreneur with PhD in Computer Science. Focused on applying cutting-edge AI research to solve real-world problems.",
      compatibilityScore: 0.89,
      matchQuality: "excellent",
      lastActive: "1 day ago",
      savedDate: "2024-01-11",
      isVerified: true,
      socialMedia: {
        linkedin: "https://linkedin.com/in/lisawang",
        github: "https://github.com/lisawang"
      },
      notes: "Top-tier AI expertise, perfect for AI startup",
      tags: ["ai", "research", "technical"]
    },
    {
      id: "6",
      name: "James Wilson",
      location: "Austin, TX",
      industry: "E-commerce",
      experience: "Senior",
      skills: ["E-commerce", "Operations", "Supply Chain", "Analytics"],
      bio: "E-commerce operations expert with experience scaling online businesses. Strong background in supply chain optimization and data analytics.",
      compatibilityScore: 0.78,
      matchQuality: "good",
      lastActive: "2 days ago",
      savedDate: "2024-01-10",
      isVerified: false,
      socialMedia: {
        linkedin: "https://linkedin.com/in/jameswilson"
      },
      notes: "Good for e-commerce or marketplace startup",
      tags: ["ecommerce", "operations", "analytics"]
    }
  ]

  const filteredProfiles = savedProfiles.filter(profile => {
    const matchesSearch = profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         profile.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         profile.industry.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesFilter = filterBy === "all" || 
                         (filterBy === "excellent" && profile.matchQuality === "excellent") ||
                         (filterBy === "good" && profile.matchQuality === "good") ||
                         (filterBy === "verified" && profile.isVerified)
    
    return matchesSearch && matchesFilter
  })

  const sortedProfiles = [...filteredProfiles].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name)
      case "compatibility":
        return b.compatibilityScore - a.compatibilityScore
      case "savedDate":
        return new Date(b.savedDate).getTime() - new Date(a.savedDate).getTime()
      case "lastActive":
        return new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime()
      default:
        return 0
    }
  })

  const handleConnectProfile = (profile: SavedProfile) => {
    openCommunicationHub(profile)
    toast({
      title: "Connection Request Sent",
      description: `Connection request sent to ${profile.name}`,
    })
  }

  const handleRemove = (profileId: string) => {
    toast({
      title: "Profile Removed",
      description: "Profile has been removed from your saved list",
    })
  }

  const handleBulkRemove = () => {
    toast({
      title: "Profiles Removed",
      description: `${selectedProfiles.length} profiles have been removed from your saved list`,
    })
    setSelectedProfiles([])
  }

  const handleSelectProfile = (profileId: string) => {
    setSelectedProfiles(prev => 
      prev.includes(profileId) 
        ? prev.filter(id => id !== profileId)
        : [...prev, profileId]
    )
  }

  const handleSelectAll = () => {
    if (selectedProfiles.length === sortedProfiles.length) {
      setSelectedProfiles([])
    } else {
      setSelectedProfiles(sortedProfiles.map(p => p.id))
    }
  }

  const getMatchQualityColor = (quality: string) => {
    switch (quality) {
      case "excellent":
        return "text-green-600 bg-green-50 border-green-200"
      case "good":
        return "text-blue-600 bg-blue-50 border-blue-200"
      case "fair":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "poor":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getExperienceColor = (experience: string) => {
    switch (experience) {
      case "Expert":
        return "text-purple-600 bg-purple-50 border-purple-200"
      case "Senior":
        return "text-blue-600 bg-blue-50 border-blue-200"
      case "Mid-level":
        return "text-green-600 bg-green-50 border-green-200"
      case "Junior":
        return "text-orange-600 bg-orange-50 border-orange-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" asChild>
              <Link href="/network/find-cofounder">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Find Co-founder
              </Link>
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Saved Profiles</h1>
              <p className="text-gray-600 mt-2">
                Manage your saved co-founder profiles and connections
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-sm">
                {savedProfiles.length} saved profiles
              </Badge>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search saved profiles..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="savedDate">Recently Saved</SelectItem>
                <SelectItem value="compatibility">Best Matches</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="lastActive">Recently Active</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Profiles</SelectItem>
                <SelectItem value="excellent">Excellent Matches</SelectItem>
                <SelectItem value="good">Good Matches</SelectItem>
                <SelectItem value="verified">Verified Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedProfiles.length > 0 && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-blue-800">
                  {selectedProfiles.length} profile{selectedProfiles.length > 1 ? 's' : ''} selected
                </span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleBulkRemove}>
                  <X className="h-4 w-4 mr-2" />
                  Remove Selected
                </Button>
                <Button variant="outline" size="sm" onClick={() => setSelectedProfiles([])}>
                  Clear Selection
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {sortedProfiles.map((profile) => (
            <Card key={profile.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedProfiles.includes(profile.id)}
                      onChange={() => handleSelectProfile(profile.id)}
                      className="rounded"
                    />
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-[#0F7377]/10 text-[#0F7377] font-semibold">
                        {profile.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{profile.name}</h3>
                        {profile.isVerified && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <MapPin className="h-3 w-3" />
                        {profile.location}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        Saved {new Date(profile.savedDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => handleRemove(profile.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
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

                {/* Skills */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Skills & Expertise</h4>
                  <div className="flex flex-wrap gap-1">
                    {profile.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {profile.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{profile.skills.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Bio */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {profile.bio}
                  </p>
                </div>

                {/* Tags */}
                {profile.tags.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {profile.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Notes */}
                {profile.notes && (
                  <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="text-sm font-medium text-yellow-800 mb-1">Your Notes</h4>
                    <p className="text-sm text-yellow-700">{profile.notes}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <GlobalCommunicationButton
                    user={profile}
                    variant="connect"
                    size="sm"
                    className="flex-1"
                  >
                    Connect
                  </GlobalCommunicationButton>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {/* View profile */}}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                </div>

                {/* Additional Info */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-3 w-3" />
                      <Badge variant="outline" className={`text-xs ${getExperienceColor(profile.experience)}`}>
                        {profile.experience}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{profile.industry}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{profile.lastActive}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {sortedProfiles.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="mb-4">
                <Bookmark className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No saved profiles found</h3>
                <p className="text-gray-500 mb-4">
                  {searchQuery || filterBy !== "all" 
                    ? "Try adjusting your search or filters to find saved profiles."
                    : "You haven't saved any co-founder profiles yet. Start exploring to find potential matches!"
                  }
                </p>
                {!searchQuery && filterBy === "all" && (
                  <Button asChild>
                    <Link href="/network/find-cofounder">
                      Explore Profiles
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Select All */}
        {sortedProfiles.length > 0 && (
          <div className="mt-6 flex justify-center">
            <Button variant="outline" onClick={handleSelectAll}>
              {selectedProfiles.length === sortedProfiles.length ? "Deselect All" : "Select All"}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
