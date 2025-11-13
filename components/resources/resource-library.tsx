"use client"

import { useState } from "react"
import { GrowthLabLayout } from "@/components/layout/growthlab-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Filter,
  FileText,
  Video,
  BookOpen,
  Download,
  ExternalLink,
  Bookmark,
  Calendar,
  Clock,
  ChevronDown,
  Star,
  Play,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export function ResourceLibrary() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [topicFilter, setTopicFilter] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [savedResources, setSavedResources] = useState<string[]>([])

  // Mock resources data
  const resources = [
    {
      id: "1",
      title: "The Ultimate Guide to Startup Fundraising",
      type: "guide",
      format: "pdf",
      thumbnail: "/abstract-colorful-swirls.png",
      description: "A comprehensive guide to raising capital for your startup, from pre-seed to Series A.",
      author: "GrowthLab Team",
      date: "Feb 15, 2025",
      readTime: "15 min read",
      categories: ["Fundraising", "Finance"],
      topics: ["Pitch Deck", "Term Sheet", "Valuation"],
      featured: true,
      popular: true,
    },
    {
      id: "2",
      title: "How to Build a Winning Pitch Deck",
      type: "template",
      format: "pptx",
      thumbnail: "/rising-tide-startups.png",
      description: "A customizable pitch deck template with examples from successful startups.",
      author: "Sarah Johnson",
      date: "Jan 28, 2025",
      readTime: "10 min read",
      categories: ["Fundraising", "Pitch"],
      topics: ["Pitch Deck", "Presentation"],
      featured: false,
      popular: true,
    },
    {
      id: "3",
      title: "Product-Market Fit: A Founder's Guide",
      type: "guide",
      format: "pdf",
      thumbnail: "/collaborative-growth.png",
      description: "Learn how to validate your product and find product-market fit.",
      author: "Michael Chen",
      date: "Jan 15, 2025",
      readTime: "20 min read",
      categories: ["Product", "Strategy"],
      topics: ["Validation", "Customer Development", "MVP"],
      featured: true,
      popular: false,
    },
    {
      id: "4",
      title: "Financial Modeling for Startups",
      type: "template",
      format: "xlsx",
      thumbnail: "/abstract-geometric-shapes.png",
      description: "A financial model template for startups with 3-year projections.",
      author: "David Tan",
      date: "Dec 10, 2024",
      readTime: "12 min read",
      categories: ["Finance", "Planning"],
      topics: ["Financial Projections", "Cash Flow", "Runway"],
      featured: false,
      popular: true,
    },
    {
      id: "5",
      title: "Building a Strong Founding Team",
      type: "video",
      format: "mp4",
      thumbnail: "/abstract-letter-jt.png",
      description: "Learn how to find the right co-founders and build a strong founding team.",
      author: "Emily Wong",
      date: "Nov 28, 2024",
      readTime: "25 min watch",
      categories: ["Team", "Leadership"],
      topics: ["Co-founders", "Equity Split", "Team Building"],
      featured: false,
      popular: false,
    },
    {
      id: "6",
      title: "Growth Marketing Strategies for Startups",
      type: "webinar",
      format: "mp4",
      thumbnail: "/abstract-ms-flow.png",
      description: "Learn effective growth marketing strategies for early-stage startups.",
      author: "Alex Lee",
      date: "Nov 15, 2024",
      readTime: "45 min watch",
      categories: ["Marketing", "Growth"],
      topics: ["Customer Acquisition", "Retention", "Metrics"],
      featured: false,
      popular: true,
    },
  ]

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.author.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory =
      !categoryFilter || resource.categories.some((c) => c.toLowerCase() === categoryFilter.toLowerCase())
    const matchesTopic = !topicFilter || resource.topics.some((t) => t.toLowerCase() === topicFilter.toLowerCase())

    if (activeTab === "all") return matchesSearch && matchesCategory && matchesTopic
    if (activeTab === "guides") return resource.type === "guide" && matchesSearch && matchesCategory && matchesTopic
    if (activeTab === "templates")
      return resource.type === "template" && matchesSearch && matchesCategory && matchesTopic
    if (activeTab === "videos")
      return (
        (resource.type === "video" || resource.type === "webinar") && matchesSearch && matchesCategory && matchesTopic
      )
    if (activeTab === "saved")
      return savedResources.includes(resource.id) && matchesSearch && matchesCategory && matchesTopic

    return false
  })

  const toggleSaveResource = (id: string) => {
    if (savedResources.includes(id)) {
      setSavedResources(savedResources.filter((resourceId) => resourceId !== id))
    } else {
      setSavedResources([...savedResources, id])
    }
  }

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "guide":
        return <BookOpen className="h-5 w-5" />
      case "template":
        return <FileText className="h-5 w-5" />
      case "video":
      case "webinar":
        return <Video className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  return (
    <GrowthLabLayout>
      <div className="container py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold">Resource Library</h1>
              <p className="text-muted-foreground">
                Access a comprehensive library of resources for your startup journey
              </p>
            </div>
            <Button asChild>
              <Link href="/resources/request">Request a Resource</Link>
            </Button>
          </div>

          <div className="mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search resources..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                    <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showFilters ? "rotate-180" : ""}`} />
                  </Button>
                  <Button>Search</Button>
                </div>

                {showFilters && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Category</label>
                      <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          <SelectItem value="Fundraising">Fundraising</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                          <SelectItem value="Product">Product</SelectItem>
                          <SelectItem value="Strategy">Strategy</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="Team">Team</SelectItem>
                          <SelectItem value="Leadership">Leadership</SelectItem>
                          <SelectItem value="Growth">Growth</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Topic</label>
                      <Select value={topicFilter} onValueChange={setTopicFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select topic" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Topics</SelectItem>
                          <SelectItem value="Pitch Deck">Pitch Deck</SelectItem>
                          <SelectItem value="Term Sheet">Term Sheet</SelectItem>
                          <SelectItem value="Valuation">Valuation</SelectItem>
                          <SelectItem value="MVP">MVP</SelectItem>
                          <SelectItem value="Customer Acquisition">Customer Acquisition</SelectItem>
                          <SelectItem value="Financial Projections">Financial Projections</SelectItem>
                          <SelectItem value="Team Building">Team Building</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList>
              <TabsTrigger value="all">All Resources</TabsTrigger>
              <TabsTrigger value="guides">Guides</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="saved">Saved</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              {filteredResources.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredResources.map((resource) => (
                    <Card key={resource.id} className={resource.featured ? "border-primary" : ""}>
                      {resource.featured && (
                        <div className="bg-primary text-primary-foreground text-center py-1 text-xs font-medium">
                          Featured Resource
                        </div>
                      )}
                      <div className="relative">
                        <img
                          src={resource.thumbnail || "/placeholder.svg"}
                          alt={resource.title}
                          className="w-full h-48 object-cover"
                        />
                        {(resource.type === "video" || resource.type === "webinar") && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-black/50 rounded-full p-3">
                              <Play className="h-8 w-8 text-white" />
                            </div>
                          </div>
                        )}
                        <div className="absolute top-2 right-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-background/80 backdrop-blur-sm"
                            onClick={() => toggleSaveResource(resource.id)}
                          >
                            <Bookmark
                              className={`h-4 w-4 ${savedResources.includes(resource.id) ? "fill-primary text-primary" : ""}`}
                            />
                          </Button>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs capitalize">
                            {getResourceIcon(resource.type)}
                            <span className="ml-1">{resource.type}</span>
                          </Badge>
                          <Badge variant="outline" className="text-xs uppercase">
                            {resource.format}
                          </Badge>
                          {resource.popular && (
                            <Badge variant="secondary" className="text-xs">
                              <Star className="h-3 w-3 mr-1 fill-current" />
                              Popular
                            </Badge>
                          )}
                        </div>
                        <h3 className="font-medium mb-1">{resource.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{resource.description}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                          <div>By {resource.author}</div>
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {resource.date}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            {resource.readTime}
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" asChild>
                              <Link href={`/resources/preview/${resource.id}`}>
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Preview
                              </Link>
                            </Button>
                            <Button size="sm" asChild>
                              <Link href={`/resources/download/${resource.id}`}>
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                      <Search className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No resources found</h3>
                    <p className="text-muted-foreground mb-4">
                      {activeTab === "saved"
                        ? "You haven't saved any resources yet."
                        : "Try adjusting your search or filter criteria to find resources that match your needs."}
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchQuery("")
                        setCategoryFilter("")
                        setTopicFilter("")
                        if (activeTab === "saved") setActiveTab("all")
                      }}
                    >
                      {activeTab === "saved" ? "Browse Resources" : "Clear Filters"}
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </GrowthLabLayout>
  )
}
