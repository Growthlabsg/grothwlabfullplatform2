"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  ArrowLeft,
  BookOpen,
  Clock,
  Users,
  Star,
  CheckCircle,
  Play,
  Lock,
  Award,
  Target,
  TrendingUp,
  Calendar,
  Download,
  Share2,
  Eye
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

const learningPaths = [
  {
    id: "founder-journey",
    title: "Founder's Journey",
    description: "Complete path from idea to IPO",
    duration: "6 months",
    courses: 15,
    level: "All Levels",
    color: "from-blue-500 to-purple-600",
    progress: 0,
    enrolled: 1250,
    rating: 4.9,
    modules: [
      {
        id: "ideation",
        title: "Ideation & Validation",
        description: "Learn how to generate and validate startup ideas",
        courses: 3,
        duration: "3 weeks",
        completed: 0,
        total: 3
      },
      {
        id: "mvp",
        title: "MVP Development",
        description: "Build your minimum viable product",
        courses: 4,
        duration: "4 weeks",
        completed: 0,
        total: 4
      },
      {
        id: "funding",
        title: "Funding & Growth",
        description: "Secure funding and scale your startup",
        courses: 5,
        duration: "6 weeks",
        completed: 0,
        total: 5
      },
      {
        id: "scaling",
        title: "Scaling & Operations",
        description: "Scale your team and operations",
        courses: 3,
        duration: "4 weeks",
        completed: 0,
        total: 3
      }
    ]
  },
  {
    id: "tech-founder",
    title: "Tech Founder Track",
    description: "For technical founders building products",
    duration: "4 months",
    courses: 12,
    level: "Intermediate",
    color: "from-green-500 to-teal-600",
    progress: 0,
    enrolled: 890,
    rating: 4.8,
    modules: [
      {
        id: "technical-skills",
        title: "Technical Skills",
        description: "Master the technical aspects of product development",
        courses: 4,
        duration: "4 weeks",
        completed: 0,
        total: 4
      },
      {
        id: "product-management",
        title: "Product Management",
        description: "Learn product management and strategy",
        courses: 3,
        duration: "3 weeks",
        completed: 0,
        total: 3
      },
      {
        id: "business-fundamentals",
        title: "Business Fundamentals",
        description: "Understand business and market dynamics",
        courses: 3,
        duration: "3 weeks",
        completed: 0,
        total: 3
      },
      {
        id: "leadership",
        title: "Technical Leadership",
        description: "Lead technical teams and projects",
        courses: 2,
        duration: "2 weeks",
        completed: 0,
        total: 2
      }
    ]
  },
  {
    id: "non-tech-founder",
    title: "Non-Tech Founder Track",
    description: "For business founders without technical background",
    duration: "5 months",
    courses: 14,
    level: "Beginner",
    color: "from-orange-500 to-red-600",
    progress: 0,
    enrolled: 1100,
    rating: 4.7,
    modules: [
      {
        id: "business-basics",
        title: "Business Basics",
        description: "Learn fundamental business concepts",
        courses: 4,
        duration: "4 weeks",
        completed: 0,
        total: 4
      },
      {
        id: "marketing-sales",
        title: "Marketing & Sales",
        description: "Master marketing and sales strategies",
        courses: 4,
        duration: "4 weeks",
        completed: 0,
        total: 4
      },
      {
        id: "funding-finance",
        title: "Funding & Finance",
        description: "Understand funding and financial management",
        courses: 3,
        duration: "3 weeks",
        completed: 0,
        total: 3
      },
      {
        id: "team-building",
        title: "Team Building",
        description: "Build and manage your startup team",
        courses: 3,
        duration: "3 weeks",
        completed: 0,
        total: 3
      }
    ]
  },
  {
    id: "scaling-leader",
    title: "Scaling & Leadership",
    description: "Advanced leadership and scaling strategies",
    duration: "3 months",
    courses: 10,
    level: "Advanced",
    color: "from-purple-500 to-pink-600",
    progress: 0,
    enrolled: 650,
    rating: 4.9,
    modules: [
      {
        id: "leadership-fundamentals",
        title: "Leadership Fundamentals",
        description: "Master the art of leadership",
        courses: 3,
        duration: "3 weeks",
        completed: 0,
        total: 3
      },
      {
        id: "scaling-strategies",
        title: "Scaling Strategies",
        description: "Learn how to scale your business",
        courses: 3,
        duration: "3 weeks",
        completed: 0,
        total: 3
      },
      {
        id: "culture-operations",
        title: "Culture & Operations",
        description: "Build strong culture and operations",
        courses: 2,
        duration: "2 weeks",
        completed: 0,
        total: 2
      },
      {
        id: "advanced-topics",
        title: "Advanced Topics",
        description: "Advanced leadership and management topics",
        courses: 2,
        duration: "2 weeks",
        completed: 0,
        total: 2
      }
    ]
  }
]

export default function LearningPathsPage() {
  const { toast } = useToast()
  const [selectedPath, setSelectedPath] = useState<string | null>(null)
  const [enrolledPaths, setEnrolledPaths] = useState<string[]>([])

  useEffect(() => {
    const enrolled = localStorage.getItem('enrolledPaths')
    if (enrolled) {
      setEnrolledPaths(JSON.parse(enrolled))
    }
  }, [])

  const handleEnroll = (pathId: string) => {
    if (enrolledPaths.includes(pathId)) {
      toast({
        title: "Already Enrolled",
        description: "You are already enrolled in this learning path.",
      })
      return
    }

    setEnrolledPaths(prev => [...prev, pathId])
    localStorage.setItem('enrolledPaths', JSON.stringify([...enrolledPaths, pathId]))
    
    toast({
      title: "Successfully Enrolled",
      description: "You have been enrolled in this learning path. Start your journey now!",
    })
  }

  const handleStartPath = (pathId: string) => {
    if (!enrolledPaths.includes(pathId)) {
      toast({
        title: "Enrollment Required",
        description: "Please enroll in this learning path first.",
        variant: "destructive"
      })
      return
    }

    toast({
      title: "Starting Learning Path",
      description: "Redirecting to your learning path...",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/resources/startup-school">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Startup School
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Learning Paths</h1>
                <p className="text-gray-600">Structured learning journeys designed by industry experts</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Master Your Startup Journey
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Follow our carefully curated learning paths designed by successful founders, 
            investors, and industry experts to accelerate your startup success.
          </p>
        </div>

        {/* Learning Paths Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {learningPaths.map((path) => (
            <Card key={path.id} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className={`h-2 bg-gradient-to-r ${path.color}`}></div>
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{path.title}</CardTitle>
                    <CardDescription className="text-base mb-4">{path.description}</CardDescription>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {path.level}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-[#0F7377]">{path.courses}</div>
                    <div className="text-sm text-gray-600">Courses</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#0F7377]">{path.duration}</div>
                    <div className="text-sm text-gray-600">Duration</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#0F7377]">{path.enrolled}</div>
                    <div className="text-sm text-gray-600">Students</div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(path.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">{path.rating}/5</span>
                </div>

                {/* Modules */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Modules:</h4>
                  {path.modules.map((module) => (
                    <div key={module.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div>
                        <div className="font-medium text-sm">{module.title}</div>
                        <div className="text-xs text-gray-600">{module.courses} courses • {module.duration}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-600">{module.completed}/{module.total} completed</div>
                        <Progress value={(module.completed / module.total) * 100} className="w-16 h-1" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4">
                  {enrolledPaths.includes(path.id) ? (
                    <Button 
                      className="flex-1 bg-[#0F7377] hover:bg-[#0F7377]/90"
                      onClick={() => handleStartPath(path.id)}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Continue Learning
                    </Button>
                  ) : (
                    <Button 
                      className="flex-1 bg-[#0F7377] hover:bg-[#0F7377]/90"
                      onClick={() => handleEnroll(path.id)}
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      Enroll Now
                    </Button>
                  )}
                  <Button variant="outline" asChild>
                    <Link href={`/resources/startup-school/learning-paths/${path.id}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-[#0F7377] to-[#0F7377]/90 text-white border-0">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h3>
              <p className="text-lg mb-6 text-white/90">
                Join thousands of entrepreneurs who have transformed their ideas into successful businesses 
                through our structured learning paths.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-[#F59E0B] text-white hover:bg-[#F59E0B]/90" asChild>
                  <Link href="/signup">Get Started Free</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                  <Link href="/resources/startup-school">Browse All Courses</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
