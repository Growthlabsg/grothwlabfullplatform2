"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Search, 
  Filter, 
  BookOpen, 
  FileText, 
  Calculator, 
  Video, 
  Wrench, 
  CheckSquare,
  Star,
  TrendingUp,
  Clock,
  User,
  Download,
  ExternalLink,
  Bookmark,
  Share2
} from "lucide-react"
import { 
  getAllEnhancedStartupResources,
  getEnhancedResourcesByCategory,
  getEnhancedResourcesByDifficulty,
  getFeaturedEnhancedResources,
  getPopularEnhancedResources,
  searchEnhancedResources,
  getAllEnhancedCategories,
  getAllEnhancedTopics,
  type StartupResource
} from "@/lib/enhanced-startup-resources"

interface ResourceLibraryProps {
  className?: string
}

export function EnhancedResourceLibrary({ className }: ResourceLibraryProps) {
  const [resources, setResources] = useState<StartupResource[]>([])
  const [filteredResources, setFilteredResources] = useState<StartupResource[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const loadResources = async () => {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 500))
      const allResources = getAllEnhancedStartupResources()
      setResources(allResources)
      setFilteredResources(allResources)
      setLoading(false)
    }

    loadResources()
  }, [])

  useEffect(() => {
    let filtered = resources

    // Apply search filter
    if (searchQuery) {
      filtered = searchEnhancedResources(searchQuery)
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(resource =>
        resource.categories.some(cat => cat.toLowerCase() === selectedCategory.toLowerCase())
      )
    }

    // Apply difficulty filter
    if (selectedDifficulty !== "all") {
      filtered = filtered.filter(resource => resource.difficulty === selectedDifficulty)
    }

    // Apply type filter
    if (selectedType !== "all") {
      filtered = filtered.filter(resource => resource.type === selectedType)
    }

    setFilteredResources(filtered)
  }, [resources, searchQuery, selectedCategory, selectedDifficulty, selectedType])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "guide":
        return <BookOpen className="h-4 w-4" />
      case "template":
        return <FileText className="h-4 w-4" />
      case "calculator":
        return <Calculator className="h-4 w-4" />
      case "video":
      case "webinar":
        return <Video className="h-4 w-4" />
      case "tool":
        return <Wrench className="h-4 w-4" />
      case "checklist":
        return <CheckSquare className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleDownload = (resource: StartupResource) => {
    // Simulate download
    console.log(`Downloading ${resource.title}`)
    // In a real app, this would trigger an actual download
  }

  const handleBookmark = (resource: StartupResource) => {
    // Simulate bookmark
    console.log(`Bookmarking ${resource.title}`)
    // In a real app, this would save to user's bookmarks
  }

  const handleShare = (resource: StartupResource) => {
    // Simulate share
    console.log(`Sharing ${resource.title}`)
    // In a real app, this would open share dialog
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className={className}>
      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {getAllEnhancedCategories().map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="guide">Guides</SelectItem>
                <SelectItem value="template">Templates</SelectItem>
                <SelectItem value="tool">Tools</SelectItem>
                <SelectItem value="calculator">Calculators</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
                <SelectItem value="checklist">Checklists</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Results Summary */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>{filteredResources.length} resources found</span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500" />
              {getFeaturedEnhancedResources().length} featured
            </span>
            <span className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              {getPopularEnhancedResources().length} popular
            </span>
          </div>
        </div>
      </div>

      {/* Resource Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <Card key={resource.id} className="group hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-primary/10 rounded-md">
                    {getTypeIcon(resource.type)}
                  </div>
                  <div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {resource.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getDifficultyColor(resource.difficulty)}>
                        {resource.difficulty}
                      </Badge>
                      {resource.featured && (
                        <Badge className="bg-yellow-100 text-yellow-800">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                      {resource.popular && (
                        <Badge className="bg-blue-100 text-blue-800">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Popular
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleBookmark(resource)}
                    className="h-8 w-8 p-0"
                  >
                    <Bookmark className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShare(resource)}
                    className="h-8 w-8 p-0"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <CardDescription className="line-clamp-3">
                {resource.description}
              </CardDescription>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{resource.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{resource.readTime}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {resource.categories.slice(0, 2).map((category) => (
                  <Badge key={category} variant="outline" className="text-xs">
                    {category}
                  </Badge>
                ))}
                {resource.categories.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{resource.categories.length - 2} more
                  </Badge>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  className="flex-1 bg-[#0F7377] hover:bg-[#0F7377]/90"
                  onClick={() => handleDownload(resource)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  {resource.format === "interactive" ? "Open Tool" : "Download"}
                </Button>
                {resource.externalUrl && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377]/10"
                    onClick={() => window.open(resource.externalUrl, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredResources.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No resources found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search criteria or filters to find what you're looking for.
          </p>
          <Button 
            variant="outline"
            className="border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377]/10"
            onClick={() => {
              setSearchQuery("")
              setSelectedCategory("all")
              setSelectedDifficulty("all")
              setSelectedType("all")
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}

// Quick Access Components
export function FeaturedResources() {
  const featuredResources = getFeaturedEnhancedResources()

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Featured Resources</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredResources.slice(0, 6).map((resource) => (
          <Card key={resource.id} className="border-2 border-primary/20 hover:border-primary/40 transition-all">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary/10 rounded-md">
                  {getTypeIcon(resource.type)}
                </div>
                <CardTitle className="text-lg">{resource.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">{resource.description}</CardDescription>
              <div className="flex items-center justify-between">
                <Badge className={getDifficultyColor(resource.difficulty)}>
                  {resource.difficulty}
                </Badge>
                <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90">View Resource</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export function PopularResources() {
  const popularResources = getPopularEnhancedResources()

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Popular Resources</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {popularResources.slice(0, 6).map((resource) => (
          <Card key={resource.id} className="hover:shadow-lg transition-all">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-100 rounded-md">
                  {getTypeIcon(resource.type)}
                </div>
                <CardTitle className="text-lg">{resource.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">{resource.description}</CardDescription>
              <div className="flex items-center justify-between">
                <Badge className={getDifficultyColor(resource.difficulty)}>
                  {resource.difficulty}
                </Badge>
                <Button size="sm" variant="outline" className="border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377]/10">View Resource</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Helper function for type icons (moved outside component for reuse)
function getTypeIcon(type: string) {
  switch (type) {
    case "guide":
      return <BookOpen className="h-4 w-4" />
    case "template":
      return <FileText className="h-4 w-4" />
    case "calculator":
      return <Calculator className="h-4 w-4" />
    case "video":
    case "webinar":
      return <Video className="h-4 w-4" />
    case "tool":
      return <Wrench className="h-4 w-4" />
    case "checklist":
      return <CheckSquare className="h-4 w-4" />
    default:
      return <FileText className="h-4 w-4" />
  }
}

// Helper function for difficulty colors (moved outside component for reuse)
function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case "beginner":
      return "bg-green-100 text-green-800"
    case "intermediate":
      return "bg-yellow-100 text-yellow-800"
    case "advanced":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
} 