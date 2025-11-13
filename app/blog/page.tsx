"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Calendar, User, ArrowRight, TrendingUp, Lightbulb, Rocket, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function BlogPage() {
  const featuredPosts = [
    {
      id: 1,
      title: "The Future of AI in Southeast Asian Startups",
      excerpt: "Discover how artificial intelligence is transforming the startup landscape across Southeast Asia and what founders need to know to stay ahead.",
      author: "Dr. Sarah Chen",
      date: "March 15, 2024",
      category: "Technology",
      readTime: "8 min read",
      image: "/startup-workshop.png",
      featured: true
    },
    {
      id: 2,
      title: "Funding Strategies for Series A: A Complete Guide",
      excerpt: "Navigate the complex world of Series A funding with proven strategies, investor expectations, and common pitfalls to avoid.",
      author: "Alex Wong",
      date: "March 12, 2024",
      category: "Funding",
      readTime: "12 min read",
      image: "/funding-meeting.png",
      featured: true
    },
    {
      id: 3,
      title: "Building a Strong Co-Founder Relationship",
      excerpt: "Learn the essential elements of successful co-founder partnerships and how to build a relationship that lasts through the startup journey.",
      author: "Maria Johnson",
      date: "March 10, 2024",
      category: "Leadership",
      readTime: "10 min read",
      image: "/startup-team-collaboration.png",
      featured: true
    }
  ]

  const recentPosts = [
    {
      id: 4,
      title: "Market Research Tools Every Startup Should Use",
      excerpt: "Essential market research tools and techniques to validate your startup idea and understand your target market.",
      author: "Tech Team",
      date: "March 8, 2024",
      category: "Strategy",
      readTime: "6 min read",
      image: "/mentorship-session.png"
    },
    {
      id: 5,
      title: "The Rise of Fintech in Emerging Markets",
      excerpt: "Exploring the rapid growth of financial technology startups in emerging markets and the opportunities they present.",
      author: "Finance Insights",
      date: "March 5, 2024",
      category: "Industry",
      readTime: "7 min read",
      image: "/fintech-flow.png"
    },
    {
      id: 6,
      title: "Customer Acquisition Strategies That Actually Work",
      excerpt: "Real-world customer acquisition strategies from successful startups that have scaled from zero to millions of users.",
      author: "Growth Lab",
      date: "March 3, 2024",
      category: "Growth",
      readTime: "9 min read",
      image: "/network-event.png"
    }
  ]

  const categories = [
    { name: "Technology", count: 24, icon: Rocket },
    { name: "Funding", count: 18, icon: TrendingUp },
    { name: "Leadership", count: 15, icon: Users },
    { name: "Strategy", count: 22, icon: Lightbulb },
    { name: "Growth", count: 19, icon: TrendingUp },
    { name: "Industry", count: 16, icon: Rocket }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <section className="bg-gradient-to-r from-[#0F7377] to-[#1E293B] py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center">
            <Badge className="mb-4 bg-white/20 text-white border border-white/20">
              <Lightbulb className="w-3 h-3 mr-2" />
              Startup Insights
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              GrowthLab Blog
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Expert insights, startup strategies, and industry trends to help you build and scale your business
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input 
                placeholder="Search articles..." 
                className="pl-10 pr-4 py-3 bg-white/20 border-white/30 text-white placeholder-white/70"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#1E293B] dark:text-white mb-4">Featured Articles</h2>
            <p className="text-lg text-[#64748B] dark:text-gray-300">Handpicked content from our expert contributors</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {featuredPosts.map((post) => (
              <Card key={post.id} className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <div className="relative">
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    width={400}
                    height={192}
                    className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-[#F59E0B] text-white">{post.category}</Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-[#0F7377] text-white">Featured</Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-[#0F7377] transition-colors duration-300 text-gray-900 dark:text-white">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3 text-gray-600 dark:text-gray-300">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-[#64748B] dark:text-gray-400 mb-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {post.date}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#64748B] dark:text-gray-400">{post.readTime}</span>
                    <Button variant="ghost" className="group-hover:text-[#0F7377] group-hover:bg-[#0F7377]/10">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#1E293B] dark:text-white mb-4">Browse by Category</h2>
            <p className="text-lg text-[#64748B] dark:text-gray-300">Find content that matches your interests</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Card key={category.name} className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#0F7377] to-[#1E293B] rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        <category.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-[#1E293B] dark:text-white group-hover:text-[#0F7377] transition-colors duration-300">
                          {category.name}
                        </h3>
                        <p className="text-sm text-[#64748B] dark:text-gray-400">{category.count} articles</p>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-[#64748B] dark:text-gray-400 group-hover:text-[#0F7377] group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#1E293B] mb-4">Latest Articles</h2>
            <p className="text-lg text-[#64748B]">Stay updated with our newest content</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <Card key={post.id} className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden">
                <div className="relative">
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    width={400}
                    height={160}
                    className="h-40 w-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-[#0F7377] text-white">{post.category}</Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg group-hover:text-[#0F7377] transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-[#64748B] mb-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {post.date}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#64748B]">{post.readTime}</span>
                    <Button variant="ghost" className="group-hover:text-[#0F7377] group-hover:bg-[#0F7377]/10">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button className="bg-[#0F7377] hover:bg-[#0F7377]/90 text-white" asChild>
              <Link href="/resources" className="flex items-center mx-auto">
                View All Resources
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-r from-[#0F7377] to-[#1E293B]">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-lg text-white/90 mb-8">
            Get the latest startup insights and industry trends delivered to your inbox
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              placeholder="Enter your email" 
              className="flex-1 bg-white/20 border-white/30 text-white placeholder-white/70"
            />
            <Button className="bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-white">
              Subscribe
            </Button>
          </div>
          
          <p className="text-sm text-white/70 mt-4">
            No spam, unsubscribe at any time
          </p>
        </div>
      </section>
    </div>
  )
}
