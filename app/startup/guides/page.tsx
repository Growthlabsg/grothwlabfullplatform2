"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ChevronLeft,
  Search,
  BookOpen,
  Target,
  DollarSign,
  TrendingUp,
  Users,
  Building,
  Scale,
  Zap,
  Clock,
  Star,
  ArrowRight,
  Filter,
  Bookmark,
  Share2,
  Download
} from "lucide-react"
import { startupGuides, StartupGuide } from "@/lib/startup-guides-data"

const categoryIcons = {
  'market-research': Target,
  'business-planning': BookOpen,
  'funding': DollarSign,
  'marketing': TrendingUp,
  'scaling': Users,
  'legal': Scale,
  'operations': Building,
  'team-building': Users
}

const difficultyColors = {
  'beginner': 'bg-green-100 text-green-800',
  'intermediate': 'bg-yellow-100 text-yellow-800',
  'advanced': 'bg-red-100 text-red-800'
}

export default function StartupGuidesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all")
  const [activeTab, setActiveTab] = useState("all")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const filteredGuides = startupGuides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         guide.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         guide.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = selectedCategory === "all" || guide.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === "all" || guide.difficulty === selectedDifficulty
    
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const featuredGuides = startupGuides.filter(guide => guide.featured)
  const categories = Array.from(new Set(startupGuides.map(guide => guide.category)))

  return (
          <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8">
          <Link href="/startup" className="flex items-center text-[#0F7377] hover:underline mb-4">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Startup Resources
          </Link>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-4">Startup Guides Hub</h1>
              <p className="text-[#334155] max-w-3xl">
                Comprehensive guides covering all aspects of launching and managing a startup. From market research to scaling operations, find everything you need to build a successful business.
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Bookmark className="h-4 w-4 mr-2" />
                Save Guides
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search guides by title, description, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="all">All Guides</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGuides.map((guide) => (
                <GuideCard key={guide.id} guide={guide} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="featured" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredGuides.map((guide) => (
                <GuideCard key={guide.id} guide={guide} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="popular" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {startupGuides.slice(0, 6).map((guide) => (
                <GuideCard key={guide.id} guide={guide} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recent" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {startupGuides.slice(0, 6).map((guide) => (
                <GuideCard key={guide.id} guide={guide} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Guide Categories Overview */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Guide Categories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category) => {
              const Icon = categoryIcons[category as keyof typeof categoryIcons] || BookOpen
              const guidesInCategory = startupGuides.filter(guide => guide.category === category)
              
              return (
                <Card key={category} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-2">
                      <div className="bg-[#0F7377]/10 p-2 rounded-md">
                        <Icon className="h-5 w-5 text-[#0F7377]" />
                      </div>
                      <CardTitle className="text-lg">
                        {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-3">
                      {guidesInCategory.length} comprehensive guide{guidesInCategory.length !== 1 ? 's' : ''}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {guidesInCategory.length} guides
                      </Badge>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    )
}

function GuideCard({ guide }: { guide: StartupGuide }) {
  const Icon = categoryIcons[guide.category as keyof typeof categoryIcons] || BookOpen

  return (
    <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-[#0F7377]/10 p-2 rounded-md">
              <Icon className="h-5 w-5 text-[#0F7377]" />
            </div>
            <div>
              <CardTitle className="text-lg leading-tight">{guide.title}</CardTitle>
              <div className="flex items-center space-x-2 mt-2">
                <Badge className={`text-xs ${difficultyColors[guide.difficulty]}`}>
                  {guide.difficulty}
                </Badge>
                {guide.featured && (
                  <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
        <CardDescription className="mt-3">
          {guide.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium text-sm mb-2">Key Takeaways:</h4>
          <ul className="space-y-1">
            {guide.keyTakeaways.slice(0, 3).map((takeaway, index) => (
              <li key={index} className="text-xs text-gray-600 flex items-start">
                <span className="text-[#0F7377] mr-1">•</span>
                {takeaway}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-2">
            <Clock className="h-3 w-3" />
            <span>{guide.readTime}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>{guide.sections.length} sections</span>
            <span>•</span>
            <span>{guide.caseStudies.length} case studies</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {guide.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {guide.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{guide.tags.length - 3} more
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="text-xs text-gray-500">
            By {guide.author}
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="h-8">
              <Bookmark className="h-3 w-3" />
            </Button>
            <Button size="sm" className="h-8 bg-[#0F7377] hover:bg-[#0F7377]/90">
              <ArrowRight className="h-3 w-3 mr-1" />
              Read Guide
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
