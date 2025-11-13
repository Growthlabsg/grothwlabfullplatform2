"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Search, 
  Filter, 
  Calendar, 
  User, 
  ArrowRight,
  TrendingUp,
  Star,
  Eye,
  Share2,
  Bookmark
} from "lucide-react"
import Link from "next/link"

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedSort, setSelectedSort] = useState("latest")

  const newsArticles = [
    {
      id: 1,
      title: "Cohort 5 Applications Now Open",
      excerpt: "Join our next accelerator cohort and accelerate your startup journey with world-class mentorship and funding opportunities.",
      content: "We're excited to announce that applications for Cohort 5 of the GrowthLab Accelerator are now open! This 12-week intensive program is designed to help early-stage startups scale rapidly and secure funding.",
      author: "Sarah Chen",
      authorRole: "Head of Accelerator",
      date: "Dec 15, 2024",
      readTime: "5 min read",
      category: "Accelerator",
      image: "/startup-workshop.png",
      featured: true,
      views: 1247,
      likes: 89
    },
    {
      id: 2,
      title: "Sports Club Launched Successfully",
      excerpt: "Connect with fellow entrepreneurs through sports and networking in our new comprehensive sports community platform.",
      content: "We're thrilled to announce the successful launch of the GrowthLab Sports Club! This new platform allows entrepreneurs to connect, network, and build relationships through various sports activities.",
      author: "Marcus Johnson",
      authorRole: "Community Manager",
      date: "Dec 12, 2024",
      readTime: "3 min read",
      category: "Community",
      image: "/startup-team-collaboration.png",
      featured: false,
      views: 892,
      likes: 67
    },
    {
      id: 3,
      title: "$2M Investment Round Closed",
      excerpt: "Three portfolio companies successfully raised their Series A rounds, demonstrating the strength of our accelerator program.",
      content: "We're proud to announce that three of our portfolio companies have successfully closed their Series A funding rounds, raising a combined total of $2M. This achievement highlights the effectiveness of our accelerator program.",
      author: "Priya Sharma",
      authorRole: "Investment Director",
      date: "Dec 10, 2024",
      readTime: "4 min read",
      category: "Investment",
      image: "/mentorship-session.png",
      featured: false,
      views: 1567,
      likes: 124
    },
    {
      id: 4,
      title: "New Payment Integration Features",
      excerpt: "Enhanced payment capabilities for event hosting and sports club activities with Stripe integration.",
      content: "We've integrated comprehensive payment features across our platform, allowing users to accept payments for events and sports activities. This includes support for multiple currencies and flexible pricing options.",
      author: "Alex Kim",
      authorRole: "Product Manager",
      date: "Dec 8, 2024",
      readTime: "6 min read",
      category: "Product",
      image: "/startup-workshop.png",
      featured: false,
      views: 743,
      likes: 45
    },
    {
      id: 5,
      title: "Startup School Curriculum Updated",
      excerpt: "New modules added to our comprehensive startup education program covering advanced topics in scaling and growth.",
      content: "Our Startup School curriculum has been significantly expanded with new modules covering advanced scaling strategies, international expansion, and advanced fundraising techniques.",
      author: "Dr. Lisa Wang",
      authorRole: "Education Director",
      date: "Dec 5, 2024",
      readTime: "7 min read",
      category: "Education",
      image: "/mentorship-session.png",
      featured: false,
      views: 1123,
      likes: 78
    },
    {
      id: 6,
      title: "Community Milestone: 3,000 Members",
      excerpt: "We've reached a major milestone with over 3,000 active members in our growing startup community.",
      content: "We're excited to announce that our community has grown to over 3,000 active members! This milestone represents the strength and vibrancy of Asia's startup ecosystem.",
      author: "GrowthLab Team",
      authorRole: "Community Team",
      date: "Dec 3, 2024",
      readTime: "2 min read",
      category: "Community",
      image: "/startup-team-collaboration.png",
      featured: false,
      views: 2156,
      likes: 156
    }
  ]

  const categories = ["all", "Accelerator", "Community", "Investment", "Product", "Education", "Events"]

  const filteredArticles = newsArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedArticles = filteredArticles.sort((a, b) => {
    if (selectedSort === "latest") {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    } else if (selectedSort === "popular") {
      return b.views - a.views
    } else if (selectedSort === "trending") {
      return b.likes - a.likes
    }
    return 0
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto max-w-7xl px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">News & Updates</h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Stay updated with the latest happenings in our startup ecosystem
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
        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedSort} onValueChange={setSelectedSort}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="trending">Trending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Featured Article */}
        {sortedArticles.length > 0 && sortedArticles[0].featured && (
          <Card className="mb-8 border-0 shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img 
                  src={sortedArticles[0].image} 
                  alt={sortedArticles[0].title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Badge className="bg-[#0F7377] text-white">Featured</Badge>
                  <Badge variant="outline">{sortedArticles[0].category}</Badge>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {sortedArticles[0].title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
                  {sortedArticles[0].excerpt}
                </p>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{sortedArticles[0].author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{sortedArticles[0].date}</span>
                    </div>
                    <span>{sortedArticles[0].readTime}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Button size="lg" className="bg-[#0F7377] hover:bg-[#0F7377]/90 text-white">
                    Read Full Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{sortedArticles[0].views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      <span>{sortedArticles[0].likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedArticles.slice(sortedArticles[0]?.featured ? 1 : 0).map((article) => (
            <Card key={article.id} className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <div className="relative">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="h-48 w-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="outline" className="bg-white/90 text-gray-900">
                    {article.category}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="bg-white/90">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="bg-white/90">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 dark:text-white group-hover:text-[#0F7377] transition-colors">
                  {article.title}
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  {article.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{article.date}</span>
                    </div>
                  </div>
                  <span>{article.readTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{article.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      <span>{article.likes}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-[#0F7377] hover:text-[#0F7377]/80">
                    Read More
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Articles
          </Button>
        </div>
      </div>
    </div>
  )
}