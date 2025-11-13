"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Search, 
  Filter, 
  ArrowRight,
  Star,
  Quote,
  Play,
  ExternalLink,
  ThumbsUp,
  MessageSquare
} from "lucide-react"
import Link from "next/link"

export default function TestimonialsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedType, setSelectedType] = useState("all")

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Founder & CEO",
      company: "TechFlow",
      image: "/testimonial-1.jpg",
      category: "Accelerator",
      type: "video",
      rating: 5,
      content: "GrowthLab connected me with my co-founder and helped us raise our Series A. The community and resources here are invaluable. The accelerator program gave us the structure and mentorship we needed to scale from idea to $10M ARR in just 18 months.",
      videoUrl: "https://example.com/video1",
      featured: true,
      location: "Singapore",
      industry: "SaaS",
      funding: "$2.5M Series A"
    },
    {
      id: 2,
      name: "Marcus Johnson",
      role: "CEO",
      company: "DataVault",
      image: "/testimonial-2.jpg",
      category: "Accelerator",
      type: "text",
      rating: 5,
      content: "The accelerator program transformed our business. We went from idea to $10M ARR in just 18 months. The mentorship and network we gained through GrowthLab was instrumental in our success.",
      featured: true,
      location: "Hong Kong",
      industry: "Data Analytics",
      funding: "$5M Series A"
    },
    {
      id: 3,
      name: "Priya Sharma",
      role: "CTO",
      company: "GreenTech",
      image: "/testimonial-3.jpg",
      category: "Mentorship",
      type: "video",
      rating: 5,
      content: "The mentorship program connected me with industry experts who guided our technical strategy. Game changer! The technical mentorship helped us build a scalable platform that now serves over 100,000 users.",
      videoUrl: "https://example.com/video2",
      featured: false,
      location: "Tokyo",
      industry: "CleanTech",
      funding: "$3M Seed"
    },
    {
      id: 4,
      name: "Alex Kim",
      role: "Founder",
      company: "FinTech Solutions",
      image: "/testimonial-4.jpg",
      category: "Network",
      type: "text",
      rating: 5,
      content: "The networking opportunities at GrowthLab are incredible. I found my co-founder, first customers, and key advisors all through the platform. The community is incredibly supportive and collaborative.",
      featured: false,
      location: "Seoul",
      industry: "FinTech",
      funding: "$1.8M Pre-Series A"
    },
    {
      id: 5,
      name: "Dr. Lisa Wang",
      role: "Founder & CEO",
      company: "HealthTech Innovations",
      image: "/testimonial-5.jpg",
      category: "Accelerator",
      type: "video",
      rating: 5,
      content: "As a first-time founder, GrowthLab provided the guidance and support I needed to navigate the startup world. The accelerator program helped me understand fundraising, product-market fit, and scaling strategies.",
      videoUrl: "https://example.com/video3",
      featured: false,
      location: "Singapore",
      industry: "HealthTech",
      funding: "$4.2M Series A"
    },
    {
      id: 6,
      name: "James Rodriguez",
      role: "Co-founder",
      company: "EduTech Asia",
      image: "/testimonial-6.jpg",
      category: "Network",
      type: "text",
      rating: 5,
      content: "The co-founder matching feature helped me find the perfect technical co-founder. We've been working together for 2 years now and our company is growing rapidly. The platform's matching algorithm is incredibly accurate.",
      featured: false,
      location: "Manila",
      industry: "EdTech",
      funding: "$2.1M Seed"
    },
    {
      id: 7,
      name: "Yuki Tanaka",
      role: "Founder",
      company: "AI Solutions",
      image: "/testimonial-7.jpg",
      category: "Mentorship",
      type: "video",
      rating: 5,
      content: "The technical mentorship I received through GrowthLab was invaluable. My mentor helped me understand AI/ML best practices and guided our product development. We've now raised $6M in Series A funding.",
      videoUrl: "https://example.com/video4",
      featured: false,
      location: "Tokyo",
      industry: "AI/ML",
      funding: "$6M Series A"
    },
    {
      id: 8,
      name: "Maria Santos",
      role: "CEO",
      company: "EcoTech",
      image: "/testimonial-8.jpg",
      category: "Accelerator",
      type: "text",
      rating: 5,
      content: "GrowthLab's accelerator program provided us with the structure and resources we needed to scale. The weekly check-ins, mentorship sessions, and investor connections were all crucial to our success.",
      featured: false,
      location: "Jakarta",
      industry: "CleanTech",
      funding: "$3.5M Series A"
    }
  ]

  const categories = ["all", "Accelerator", "Mentorship", "Network", "Jobs", "Events"]
  const types = ["all", "video", "text"]

  const filteredTestimonials = testimonials.filter(testimonial => {
    const matchesSearch = testimonial.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         testimonial.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         testimonial.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || testimonial.category === selectedCategory
    const matchesType = selectedType === "all" || testimonial.type === selectedType
    return matchesSearch && matchesCategory && matchesType
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto max-w-7xl px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Success Stories</h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Hear from entrepreneurs who have built successful companies with GrowthLab
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
                  placeholder="Search testimonials..."
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
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                {types.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type === "all" ? "All Types" : type === "video" ? "Video Testimonials" : "Text Testimonials"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Featured Testimonials */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Featured Stories</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {filteredTestimonials.filter(t => t.featured).map((testimonial) => (
              <Card key={testimonial.id} className="border-0 shadow-lg overflow-hidden bg-white dark:bg-gray-800">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={testimonial.image} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{testimonial.name}</h3>
                        <Badge className="bg-[#0F7377] text-white">Featured</Badge>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">{testimonial.role}, {testimonial.company}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                        <span>{testimonial.location}</span>
                        <span>•</span>
                        <span>{testimonial.industry}</span>
                        <span>•</span>
                        <span>{testimonial.funding}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative mb-6">
                    <Quote className="absolute -top-2 -left-2 h-8 w-8 text-[#0F7377]/20" />
                    <p className="text-gray-700 dark:text-gray-300 italic text-lg leading-relaxed pl-6">
                      "{testimonial.content}"
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-[#F59E0B] fill-current" />
                      ))}
                    </div>
                    {testimonial.type === "video" && (
                      <Button variant="outline" size="sm">
                        <Play className="h-4 w-4 mr-2" />
                        Watch Video
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Testimonials */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">All Stories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTestimonials.map((testimonial) => (
              <Card key={testimonial.id} className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden bg-white dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={testimonial.image} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{testimonial.role}, {testimonial.company}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">{testimonial.category}</Badge>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                    {testimonial.content}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                    <span>{testimonial.location}</span>
                    <span>{testimonial.industry}</span>
                    <span>{testimonial.funding}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 text-[#F59E0B] fill-current" />
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      {testimonial.type === "video" && (
                        <Button variant="ghost" size="sm">
                          <Play className="h-3 w-3" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <ThumbsUp className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageSquare className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-[#0F7377] to-[#1E293B] text-white border-0">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">Ready to Share Your Success Story?</h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of entrepreneurs who have built successful companies with GrowthLab
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-white" asChild>
                  <Link href="/signup">
                    Get Started Today
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-white/20 text-white border-white/30 hover:bg-white/30" asChild>
                  <Link href="/about">
                    Learn More
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
