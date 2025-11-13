"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft,
  Play,
  Clock,
  CheckCircle,
  Star,
  Users,
  BookOpen,
  Award,
  Share2,
  Bookmark,
  BookmarkCheck,
  ThumbsUp,
  Lock,
  Video
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function CourseDetailPage() {
  const params = useParams()
  const { toast } = useToast()
  const [course, setCourse] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    const mockCourse = {
      id: params.id,
      title: "Startup Funding Fundamentals",
      description: "Learn the basics of startup funding, from bootstrapping to Series A.",
      longDescription: "This comprehensive course covers everything you need to know about startup funding.",
      duration: "4 hours",
      level: "Beginner",
      category: "funding",
      instructor: {
        name: "Sarah Chen",
        avatar: "/professional-woman-diverse.png",
        title: "Venture Capital Partner",
        bio: "Sarah is a partner at TechVentures, where she has led investments in over 50 startups.",
        experience: "10+ years in venture capital",
        companies: ["TechVentures", "Goldman Sachs", "Stanford MBA"]
      },
      lessons: 12,
      students: 1247,
      rating: 4.8,
      reviews: [
        {
          id: 1,
          user: "Alex Johnson",
          avatar: "/user-1.png",
          rating: 5,
          date: "2024-01-10",
          comment: "Excellent course! Sarah's insights on funding are invaluable.",
          helpful: 12
        }
      ],
      price: "Free",
      originalPrice: "$199",
      discount: "100%",
      featured: true,
      certificate: true,
      language: "English",
      lastUpdated: "2024-01-15",
      tags: ["Funding", "Investors", "Pitch Deck", "Financial Planning"],
      requirements: [
        "Basic understanding of business concepts",
        "No prior funding experience required"
      ],
      whatYouWillLearn: [
        "Different types of startup funding",
        "How to prepare for investor meetings",
        "Creating compelling pitch decks"
      ],
      curriculum: [
        {
          id: 1,
          title: "Introduction to Startup Funding",
          duration: "15 minutes",
          type: "video",
          description: "Overview of the funding landscape.",
          isCompleted: true,
          isLocked: false,
          resources: ["PDF Guide", "Template"]
        }
      ],
      progress: 33,
      enrolled: false,
      saved: false
    }
    
    setCourse(mockCourse)
    setIsEnrolled(mockCourse.enrolled)
    setIsSaved(mockCourse.saved)
  }, [params.id])

  const handleEnroll = () => {
    setIsEnrolled(!isEnrolled)
    toast({
      title: isEnrolled ? "Unenrolled" : "Enrolled Successfully",
      description: isEnrolled ? "You have been unenrolled from this course." : "Welcome to the course! Start learning now.",
    })
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
    toast({
      title: isSaved ? "Removed from Saved" : "Saved to Library",
      description: isSaved ? "Course removed from your saved courses." : "Course saved to your library.",
    })
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0F7377] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/resources/startup-school">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Courses
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{course.title}</h1>
                <p className="text-sm text-gray-600">{course.category} • {course.level}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleSave}>
                {isSaved ? <BookmarkCheck className="h-4 w-4 mr-2" /> : <Bookmark className="h-4 w-4 mr-2" />}
                {isSaved ? "Saved" : "Save"}
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <div className="relative h-64 bg-gradient-to-br from-[#0F7377]/10 to-[#0F7377]/5">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
                  <p className="text-lg opacity-90">{course.description}</p>
                </div>
                {course.featured && (
                  <Badge className="absolute top-4 left-4 bg-[#F59E0B] text-white">
                    <Star className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    {course.lessons} lessons
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {course.students.toLocaleString()} students
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    {course.rating} ({course.reviews.length} reviews)
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {course.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About This Course</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">{course.longDescription}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>What You'll Learn</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {course.whatYouWillLearn.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {course.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-[#0F7377] rounded-full mt-2 flex-shrink-0"></div>
                          <span>{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="curriculum" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Curriculum</CardTitle>
                    <CardDescription>
                      {course.curriculum.length} lessons • {course.duration}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {course.curriculum.map((lesson) => (
                      <div key={lesson.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0">
                            {lesson.isCompleted ? (
                              <CheckCircle className="h-6 w-6 text-green-500" />
                            ) : lesson.isLocked ? (
                              <Lock className="h-6 w-6 text-gray-400" />
                            ) : (
                              <Play className="h-6 w-6 text-[#0F7377]" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{lesson.title}</h4>
                            <p className="text-sm text-gray-600">{lesson.description}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-xs text-gray-500 flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {lesson.duration}
                              </span>
                              <span className="text-xs text-gray-500 flex items-center gap-1">
                                <Video className="h-3 w-3" />
                                {lesson.type}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {lesson.resources && lesson.resources.length > 0 && (
                            <Badge variant="outline" className="text-xs">
                              {lesson.resources.length} resources
                            </Badge>
                          )}
                          {!lesson.isLocked && (
                            <Button size="sm" variant="outline">
                              {lesson.isCompleted ? "Review" : "Start"}
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="instructor" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Meet Your Instructor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-4">
                      <img
                        src={course.instructor.avatar}
                        alt={course.instructor.name}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold">{course.instructor.name}</h3>
                        <p className="text-[#0F7377] font-medium">{course.instructor.title}</p>
                        <p className="text-gray-600 mt-2">{course.instructor.bio}</p>
                        <div className="mt-4">
                          <p className="text-sm font-medium text-gray-900">Experience</p>
                          <p className="text-sm text-gray-600">{course.instructor.experience}</p>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm font-medium text-gray-900">Companies</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {course.instructor.companies.map((company, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {company}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Student Reviews</CardTitle>
                    <CardDescription>
                      {course.reviews.length} reviews • Average rating: {course.rating}/5
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {course.reviews.map((review) => (
                      <div key={review.id} className="border-b pb-4 last:border-b-0">
                        <div className="flex items-start gap-3">
                          <img
                            src={review.avatar}
                            alt={review.user}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium">{review.user}</h4>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-500">{review.date}</span>
                            </div>
                            <p className="text-gray-700 mb-2">{review.comment}</p>
                            <div className="flex items-center gap-4">
                              <Button variant="ghost" size="sm">
                                <ThumbsUp className="h-4 w-4 mr-1" />
                                Helpful ({review.helpful})
                              </Button>
                              <Button variant="ghost" size="sm">
                                Reply
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-[#0F7377] mb-2">{course.price}</div>
                  {course.originalPrice && (
                    <div className="text-lg text-gray-500 line-through">{course.originalPrice}</div>
                  )}
                  {course.discount && (
                    <Badge className="bg-green-100 text-green-800 mt-2">
                      {course.discount} off
                    </Badge>
                  )}
                </div>
                <Button className="w-full mb-4" size="lg" onClick={handleEnroll}>
                  {isEnrolled ? "Continue Learning" : "Enroll Now"}
                </Button>
                <div className="text-center text-sm text-gray-600">
                  {course.certificate && (
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Award className="h-4 w-4" />
                      Certificate of Completion
                    </div>
                  )}
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="h-4 w-4" />
                    Lifetime access
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Course Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Students</span>
                  <span className="font-medium">{course.students.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{course.rating}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Reviews</span>
                  <span className="font-medium">{course.reviews.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Language</span>
                  <span className="font-medium">{course.language}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Updated</span>
                  <span className="font-medium">{course.lastUpdated}</span>
                </div>
              </CardContent>
            </Card>

            {isEnrolled && (
              <Card>
                <CardHeader>
                  <CardTitle>Your Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Overall Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                    <div className="text-sm text-gray-600">
                      {course.curriculum.filter(lesson => lesson.isCompleted).length} of {course.curriculum.length} lessons completed
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
