"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { 
  ArrowLeft,
  BookOpen,
  Play,
  Clock,
  CheckCircle,
  Lock,
  Star,
  Search,
  Filter,
  Calendar,
  Award,
  Download,
  Share2,
  Eye,
  Bookmark,
  BookmarkCheck
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

const myCourses = [
  {
    id: "funding-101",
    title: "Startup Funding Fundamentals",
    description: "Learn the basics of startup funding, from bootstrapping to Series A.",
    duration: "4 hours",
    progress: 75,
    status: "in-progress",
    lastAccessed: "2024-01-15",
    instructor: "Sarah Chen",
    rating: 4.8,
    lessons: 12,
    completedLessons: 9,
    nextLesson: "Pitch Deck Creation",
    category: "funding",
    price: "$149",
    certificate: true,
    saved: true
  },
  {
    id: "product-development",
    title: "Product Development Masterclass",
    description: "Build products that users love. Learn user research, prototyping, and testing.",
    duration: "10 hours",
    progress: 30,
    status: "in-progress",
    lastAccessed: "2024-01-20",
    instructor: "Alex Kim",
    rating: 4.9,
    lessons: 30,
    completedLessons: 9,
    nextLesson: "User Research Methods",
    category: "product",
    price: "$199",
    certificate: true,
    saved: false
  },
  {
    id: "legal-compliance",
    title: "Startup Legal Essentials",
    description: "Navigate the legal landscape of startups. Learn about incorporation and contracts.",
    duration: "5 hours",
    progress: 100,
    status: "completed",
    lastAccessed: "2024-01-25",
    instructor: "Jennifer Law",
    rating: 4.6,
    lessons: 15,
    completedLessons: 15,
    nextLesson: null,
    category: "legal",
    price: "$79",
    certificate: true,
    saved: true
  },
  {
    id: "operations-scaling",
    title: "Operations & Scaling",
    description: "Scale your startup operations efficiently. Learn team building and process optimization.",
    duration: "7 hours",
    progress: 0,
    status: "not-started",
    lastAccessed: null,
    instructor: "Michael Chen",
    rating: 4.8,
    lessons: 21,
    completedLessons: 0,
    nextLesson: "Introduction to Operations",
    category: "operations",
    price: "$129",
    certificate: true,
    saved: false
  }
]

export default function MyCoursesPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [sortBy, setSortBy] = useState("recent")
  const [savedCourses, setSavedCourses] = useState<string[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('savedCourses')
    if (saved) {
      setSavedCourses(JSON.parse(saved))
    }
  }, [])

  const filteredCourses = myCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || course.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === "recent") {
      if (!a.lastAccessed && !b.lastAccessed) return 0
      if (!a.lastAccessed) return 1
      if (!b.lastAccessed) return -1
      return new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime()
    } else if (sortBy === "progress") {
      return b.progress - a.progress
    } else if (sortBy === "title") {
      return a.title.localeCompare(b.title)
    }
    return 0
  })

  const handleSaveCourse = (courseId: string) => {
    const isSaved = savedCourses.includes(courseId)
    if (isSaved) {
      setSavedCourses(prev => prev.filter(id => id !== courseId))
      toast({
        title: "Course Removed",
        description: "Course has been removed from your saved courses.",
      })
    } else {
      setSavedCourses(prev => [...prev, courseId])
      toast({
        title: "Course Saved",
        description: "Course has been added to your saved courses.",
      })
    }
    localStorage.setItem('savedCourses', JSON.stringify(savedCourses))
  }

  const handleContinueCourse = (courseId: string) => {
    toast({
      title: "Continuing Course",
      description: "Redirecting to your course...",
    })
  }

  const handleStartCourse = (courseId: string) => {
    toast({
      title: "Starting Course",
      description: "Welcome to your new course!",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "in-progress":
        return "bg-blue-500"
      case "not-started":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed"
      case "in-progress":
        return "In Progress"
      case "not-started":
        return "Not Started"
      default:
        return "Unknown"
    }
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
                <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
                <p className="text-gray-600">Your enrolled courses and learning progress</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/resources/startup-school">
                  Browse More Courses
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search your courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium bg-white shadow-sm focus:ring-2 focus:ring-[#0F7377] focus:border-[#0F7377]"
            >
              <option value="all">All Courses</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="not-started">Not Started</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium bg-white shadow-sm focus:ring-2 focus:ring-[#0F7377] focus:border-[#0F7377]"
            >
              <option value="recent">Recently Accessed</option>
              <option value="progress">Progress</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-[#0F7377]" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Courses</p>
                  <p className="text-2xl font-bold text-gray-900">{myCourses.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Play className="h-8 w-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">In Progress</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {myCourses.filter(c => c.status === 'in-progress').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {myCourses.filter(c => c.status === 'completed').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Award className="h-8 w-8 text-yellow-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Certificates</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {myCourses.filter(c => c.status === 'completed' && c.certificate).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Courses Grid */}
        {sortedCourses.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Courses Found</h3>
              <p className="text-gray-500 mb-4">
                {searchQuery || filterStatus !== "all" 
                  ? "No courses match your search criteria." 
                  : "You haven't enrolled in any courses yet. Start learning today!"
                }
              </p>
              <Button asChild>
                <Link href="/resources/startup-school">
                  Browse Courses
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="relative h-32 bg-gradient-to-br from-[#0F7377]/10 to-[#0F7377]/5">
                  <div className="absolute top-2 left-2">
                    <Badge className={`${getStatusColor(course.status)} text-white`}>
                      {getStatusText(course.status)}
                    </Badge>
                  </div>
                  <div className="absolute top-2 right-2 flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
                      onClick={() => handleSaveCourse(course.id)}
                    >
                      {course.saved ? (
                        <BookmarkCheck className="h-4 w-4 text-[#0F7377]" />
                      ) : (
                        <Bookmark className="h-4 w-4 text-gray-500" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
                    >
                      <Share2 className="h-4 w-4 text-gray-500" />
                    </Button>
                  </div>
                  <div className="absolute bottom-2 right-2">
                    <Badge variant="outline" className="bg-white/80">
                      {course.category}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Instructor: {course.instructor}</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      {course.rating}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                    <div className="text-xs text-gray-500">
                      {course.completedLessons} of {course.lessons} lessons completed
                    </div>
                  </div>
                  
                  {course.nextLesson && (
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Next:</span> {course.nextLesson}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {course.duration}
                    </div>
                    {course.lastAccessed && (
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(course.lastAccessed).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    {course.status === "completed" ? (
                      <Button className="flex-1 bg-green-600 hover:bg-green-700" asChild>
                        <Link href={`/resources/startup-school/course/${course.id}`}>
                          <Award className="h-4 w-4 mr-2" />
                          View Certificate
                        </Link>
                      </Button>
                    ) : course.status === "in-progress" ? (
                      <Button 
                        className="flex-1 bg-[#0F7377] hover:bg-[#0F7377]/90"
                        onClick={() => handleContinueCourse(course.id)}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Continue
                      </Button>
                    ) : (
                      <Button 
                        className="flex-1 bg-[#0F7377] hover:bg-[#0F7377]/90"
                        onClick={() => handleStartCourse(course.id)}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Start Course
                      </Button>
                    )}
                    <Button variant="outline" asChild>
                      <Link href={`/resources/startup-school/course/${course.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-[#0F7377] to-[#0F7377]/90 text-white border-0">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Continue Your Learning Journey</h3>
              <p className="text-lg mb-6 text-white/90">
                Discover new courses and learning paths to expand your startup knowledge and skills.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-[#F59E0B] text-white hover:bg-[#F59E0B]/90" asChild>
                  <Link href="/resources/startup-school">Browse All Courses</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                  <Link href="/resources/startup-school/learning-paths">View Learning Paths</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
