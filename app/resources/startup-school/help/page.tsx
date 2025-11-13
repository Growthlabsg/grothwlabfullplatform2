"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft,
  Search,
  HelpCircle,
  MessageCircle,
  Mail,
  Phone,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
  BookOpen,
  Video,
  FileText,
  Download,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Star,
  ThumbsUp,
  ThumbsDown,
  Send,
  Plus,
  Filter,
  Tag,
  Calendar,
  User,
  Settings,
  Bell,
  Shield,
  Lock,
  Unlock,
  Globe,
  Wifi,
  WifiOff,
  RefreshCw,
  AlertTriangle,
  XCircle,
  CheckCircle2,
  MinusCircle,
  PlusCircle
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function HelpPage() {
  const { toast } = useToast()
  const [isMobile, setIsMobile] = useState(false)
  const [activeTab, setActiveTab] = useState("faq")
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedFaqs, setExpandedFaqs] = useState<Set<number>>(new Set())
  const [contactForm, setContactForm] = useState({
    subject: "",
    message: "",
    priority: "medium",
    category: "general"
  })

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const faqs = [
    {
      id: 1,
      question: "How do I enroll in a course?",
      answer: "To enroll in a course, simply click on the course you're interested in, then click the 'Enroll Now' button. You'll be redirected to the course page where you can start learning immediately.",
      category: "Enrollment",
      helpful: 24,
      notHelpful: 2
    },
    {
      id: 2,
      question: "Can I access courses on mobile devices?",
      answer: "Yes! All our courses are fully responsive and can be accessed on any device - desktop, tablet, or mobile. You can even download course materials for offline viewing.",
      category: "Access",
      helpful: 18,
      notHelpful: 1
    },
    {
      id: 3,
      question: "How do I get a certificate?",
      answer: "To earn a certificate, you need to complete all course modules and pass the final assessment with a score of 80% or higher. Once completed, you can download your certificate from the 'My Certificates' section.",
      category: "Certificates",
      helpful: 31,
      notHelpful: 3
    },
    {
      id: 4,
      question: "What if I need help with a specific topic?",
      answer: "You can get help through multiple channels: 1) Post in the community forum, 2) Contact our support team, 3) Join live Q&A sessions, or 4) Schedule a 1-on-1 consultation with an expert.",
      category: "Support",
      helpful: 22,
      notHelpful: 1
    },
    {
      id: 5,
      question: "Can I get a refund if I'm not satisfied?",
      answer: "We offer a 30-day money-back guarantee for all paid courses. If you're not satisfied with your purchase, contact our support team within 30 days for a full refund.",
      category: "Billing",
      helpful: 15,
      notHelpful: 0
    },
    {
      id: 6,
      question: "How do I track my learning progress?",
      answer: "Your progress is automatically tracked as you complete course modules. You can view your progress in the 'My Courses' section, where you'll see completion percentages and time spent on each course.",
      category: "Progress",
      helpful: 27,
      notHelpful: 2
    }
  ]

  const categories = [
    { value: "all", label: "All Topics", count: 45 },
    { value: "enrollment", label: "Enrollment", count: 8 },
    { value: "access", label: "Access", count: 6 },
    { value: "certificates", label: "Certificates", count: 5 },
    { value: "support", label: "Support", count: 7 },
    { value: "billing", label: "Billing", count: 4 },
    { value: "progress", label: "Progress", count: 6 },
    { value: "technical", label: "Technical", count: 9 }
  ]

  const helpArticles = [
    {
      id: 1,
      title: "Getting Started with Startup School",
      description: "Complete guide to setting up your account and navigating the platform",
      category: "Getting Started",
      readTime: "5 min read",
      views: 1234,
      lastUpdated: "2024-01-15",
      isBookmarked: false
    },
    {
      id: 2,
      title: "Understanding Learning Paths",
      description: "How to choose and follow the right learning path for your goals",
      category: "Learning",
      readTime: "3 min read",
      views: 892,
      lastUpdated: "2024-01-12",
      isBookmarked: true
    },
    {
      id: 3,
      title: "Troubleshooting Common Issues",
      description: "Solutions to the most common technical problems users encounter",
      category: "Technical",
      readTime: "7 min read",
      views: 654,
      lastUpdated: "2024-01-10",
      isBookmarked: false
    },
    {
      id: 4,
      title: "Maximizing Your Learning Experience",
      description: "Tips and best practices for getting the most out of your courses",
      category: "Learning",
      readTime: "4 min read",
      views: 743,
      lastUpdated: "2024-01-08",
      isBookmarked: false
    }
  ]

  const supportChannels = [
    {
      id: 1,
      title: "Live Chat Support",
      description: "Get instant help from our support team",
      icon: <MessageCircle className="h-6 w-6" />,
      availability: "24/7",
      responseTime: "2-5 minutes",
      isAvailable: true
    },
    {
      id: 2,
      title: "Email Support",
      description: "Send us a detailed message and we'll respond within 24 hours",
      icon: <Mail className="h-6 w-6" />,
      availability: "24/7",
      responseTime: "2-24 hours",
      isAvailable: true
    },
    {
      id: 3,
      title: "Phone Support",
      description: "Speak directly with our support team",
      icon: <Phone className="h-6 w-6" />,
      availability: "Mon-Fri 9AM-6PM PST",
      responseTime: "Immediate",
      isAvailable: false
    },
    {
      id: 4,
      title: "Community Forum",
      description: "Get help from other users and experts",
      icon: <Users className="h-6 w-6" />,
      availability: "24/7",
      responseTime: "Varies",
      isAvailable: true
    }
  ]

  const toggleFaq = (faqId: number) => {
    const newExpanded = new Set(expandedFaqs)
    if (newExpanded.has(faqId)) {
      newExpanded.delete(faqId)
    } else {
      newExpanded.add(faqId)
    }
    setExpandedFaqs(newExpanded)
  }

  const handleFaqFeedback = (faqId: number, isHelpful: boolean) => {
    toast({
      title: "Thank you!",
      description: `Your feedback has been recorded.`,
    })
  }

  const handleContactSubmit = () => {
    if (contactForm.subject && contactForm.message) {
      toast({
        title: "Message Sent",
        description: "Your support request has been submitted. We'll get back to you soon!",
      })
      setContactForm({ subject: "", message: "", priority: "medium", category: "general" })
    }
  }

  const handleBookmark = (articleId: number) => {
    toast({
      title: "Bookmarked",
      description: "Article added to your bookmarks.",
    })
  }

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/resources/startup-school">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Startup School
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Help & Support</h1>
                <p className="text-sm text-gray-600">Get help and find answers to your questions</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <MessageCircle className="h-4 w-4 mr-2" />
                Live Chat
              </Button>
              <Button variant="outline" size="sm">
                <Mail className="h-4 w-4 mr-2" />
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search help articles, FAQs, or ask a question..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="articles">Help Articles</TabsTrigger>
            <TabsTrigger value="contact">Contact Support</TabsTrigger>
            <TabsTrigger value="status">System Status</TabsTrigger>
          </TabsList>

          {/* FAQ Tab */}
          <TabsContent value="faq" className="space-y-6">
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((category) => (
                <Badge
                  key={category.value}
                  variant="outline"
                  className="cursor-pointer hover:bg-blue-50"
                >
                  {category.label} ({category.count})
                </Badge>
              ))}
            </div>

            <div className="space-y-4">
              {filteredFaqs.map((faq) => (
                <Card key={faq.id} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleFaq(faq.id)}
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <Badge variant="outline">{faq.category}</Badge>
                          <span>{faq.helpful} helpful</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        {expandedFaqs.has(faq.id) ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    
                    {expandedFaqs.has(faq.id) && (
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-gray-700 mb-4">{faq.answer}</p>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-gray-600">Was this helpful?</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleFaqFeedback(faq.id, true)}
                          >
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            Yes ({faq.helpful})
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleFaqFeedback(faq.id, false)}
                          >
                            <ThumbsDown className="h-4 w-4 mr-1" />
                            No ({faq.notHelpful})
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Help Articles Tab */}
          <TabsContent value="articles" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {helpArticles.map((article) => (
                <Card key={article.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
                        <p className="text-gray-600 mb-3">{article.description}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Category</span>
                        <Badge variant="outline">{article.category}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Read Time</span>
                        <span>{article.readTime}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Views</span>
                        <span>{article.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Updated</span>
                        <span>{article.lastUpdated}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Button size="sm" className="flex-1 mr-2">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Read Article
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleBookmark(article.id)}
                      >
                        {article.isBookmarked ? (
                          <BookmarkCheck className="h-4 w-4" />
                        ) : (
                          <Bookmark className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Contact Support Tab */}
          <TabsContent value="contact" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Send us a message</CardTitle>
                  <CardDescription>We'll get back to you within 24 hours</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Subject</label>
                    <Input
                      placeholder="What can we help you with?"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Category</label>
                    <select
                      value={contactForm.category}
                      onChange={(e) => setContactForm({...contactForm, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="technical">Technical Issue</option>
                      <option value="billing">Billing Question</option>
                      <option value="course">Course Related</option>
                      <option value="account">Account Issue</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Priority</label>
                    <select
                      value={contactForm.priority}
                      onChange={(e) => setContactForm({...contactForm, priority: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Message</label>
                    <Textarea
                      placeholder="Please describe your issue or question in detail..."
                      rows={6}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    />
                  </div>
                  
                  <Button onClick={handleContactSubmit} className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </CardContent>
              </Card>

              {/* Support Channels */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Other ways to get help</h3>
                <div className="space-y-4">
                  {supportChannels.map((channel) => (
                    <Card key={channel.id} className={`border-0 shadow-lg ${channel.isAvailable ? 'bg-white' : 'bg-gray-50'}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-lg ${channel.isAvailable ? 'bg-blue-100' : 'bg-gray-100'}`}>
                            {channel.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold">{channel.title}</h4>
                            <p className="text-sm text-gray-600 mb-2">{channel.description}</p>
                            <div className="space-y-1 text-xs text-gray-500">
                              <div>Availability: {channel.availability}</div>
                              <div>Response time: {channel.responseTime}</div>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant={channel.isAvailable ? "default" : "outline"}
                            disabled={!channel.isAvailable}
                          >
                            {channel.isAvailable ? "Available" : "Unavailable"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* System Status Tab */}
          <TabsContent value="status" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Platform Status</h3>
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Operational
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">All systems are running normally</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Course Access</h3>
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Available
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">All courses are accessible</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Video Streaming</h3>
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Working
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">Video content is streaming properly</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
