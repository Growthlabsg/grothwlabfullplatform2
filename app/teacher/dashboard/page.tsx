"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Footer } from "@/components/layout/footer"
import { PlusCircle, FileText, Users, MessageSquare, Star, Clock } from "lucide-react"

// Sample data for courses
const courses = [
  {
    id: "course-1",
    title: "Startup Fundraising Masterclass",
    description: "Learn how to raise capital for your startup from seed to Series A",
    students: 42,
    lessons: 8,
    duration: "4 weeks",
    rating: 4.8,
    status: "active",
    progress: 75,
    image: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "course-2",
    title: "Product-Market Fit Workshop",
    description: "Strategies and frameworks to achieve product-market fit",
    students: 38,
    lessons: 6,
    duration: "3 weeks",
    rating: 4.7,
    status: "active",
    progress: 100,
    image: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "course-3",
    title: "Growth Marketing for Startups",
    description: "Customer acquisition strategies for early-stage startups",
    students: 0,
    lessons: 10,
    duration: "5 weeks",
    rating: 0,
    status: "draft",
    progress: 40,
    image: "/placeholder.svg?height=100&width=200",
  },
]

// Sample data for students
const students = [
  {
    id: "student-1",
    name: "Alex Wong",
    email: "alex@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    company: "FinTech Innovators",
    progress: 85,
    lastActive: "2 hours ago",
    courses: ["course-1", "course-2"],
  },
  {
    id: "student-2",
    name: "Sarah Chen",
    email: "sarah@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    company: "AI Solutions",
    progress: 62,
    lastActive: "1 day ago",
    courses: ["course-1"],
  },
  {
    id: "student-3",
    name: "Raj Patel",
    email: "raj@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    company: "EcoTech",
    progress: 94,
    lastActive: "3 hours ago",
    courses: ["course-2"],
  },
  {
    id: "student-4",
    name: "Lisa Kim",
    email: "lisa@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    company: "Health Innovations",
    progress: 45,
    lastActive: "5 days ago",
    courses: ["course-1", "course-2"],
  },
]

// Sample data for feedback
const feedback = [
  {
    id: "feedback-1",
    studentName: "Alex Wong",
    studentAvatar: "/placeholder.svg?height=40&width=40",
    courseTitle: "Startup Fundraising Masterclass",
    rating: 5,
    comment:
      "Incredibly valuable content. The templates for pitch decks and financial models were exactly what I needed.",
    date: "2025-04-10",
  },
  {
    id: "feedback-2",
    studentName: "Sarah Chen",
    studentAvatar: "/placeholder.svg?height=40&width=40",
    courseTitle: "Startup Fundraising Masterclass",
    rating: 4,
    comment: "Great course overall. Would have liked more examples from Southeast Asian startups.",
    date: "2025-04-08",
  },
  {
    id: "feedback-3",
    studentName: "Raj Patel",
    studentAvatar: "/placeholder.svg?height=40&width=40",
    courseTitle: "Product-Market Fit Workshop",
    rating: 5,
    comment: "The frameworks shared in this course helped us pivot our product and find our ideal customer segment.",
    date: "2025-04-05",
  },
]

export default function TeacherDashboardPage() {
  const [activeTab, setActiveTab] = useState("courses")

  return (
    <div>
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="text-3xl font-bold tracking-tight text-[#1E293B] md:text-4xl">Teacher Dashboard</h1>

          <Button className="bg-[#0F7377] hover:bg-[#0F7377]/90">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Course
          </Button>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="flex items-center p-6">
              <div className="mr-4 rounded-full bg-[#0F7377]/10 p-3">
                <FileText className="h-6 w-6 text-[#0F7377]" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Courses</p>
                <p className="text-2xl font-bold">{courses.filter((c) => c.status === "active").length}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <div className="mr-4 rounded-full bg-[#0F7377]/10 p-3">
                <Users className="h-6 w-6 text-[#0F7377]" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">{students.length}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <div className="mr-4 rounded-full bg-[#0F7377]/10 p-3">
                <Star className="h-6 w-6 text-[#0F7377]" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Average Rating</p>
                <p className="text-2xl font-bold">4.8</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="courses" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 w-full justify-start">
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <Badge variant={course.status === "active" ? "default" : "outline"}>
                        {course.status === "active" ? "Active" : "Draft"}
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4 grid grid-cols-3 gap-2 text-sm">
                      <div className="flex flex-col items-center">
                        <Users className="mb-1 h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{course.students}</span>
                        <span className="text-xs text-muted-foreground">Students</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <FileText className="mb-1 h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{course.lessons}</span>
                        <span className="text-xs text-muted-foreground">Lessons</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <Clock className="mb-1 h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{course.duration}</span>
                        <span className="text-xs text-muted-foreground">Duration</span>
                      </div>
                    </div>

                    {course.status === "active" ? (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Course Progress</span>
                          <span className="font-medium">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Completion Status</span>
                          <span className="font-medium">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                    )}

                    <div className="mt-4 flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                        {course.status === "active" ? "Manage" : "Publish"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="students" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Students</CardTitle>
                <CardDescription>Manage your students and track their progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {students.map((student) => (
                    <div key={student.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                          <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">{student.company}</p>
                        </div>
                      </div>

                      <div className="hidden md:block">
                        <p className="text-sm text-muted-foreground">
                          Enrolled in {student.courses.length} course{student.courses.length !== 1 ? "s" : ""}
                        </p>
                      </div>

                      <div className="hidden md:block">
                        <p className="text-sm text-muted-foreground">Last active: {student.lastActive}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <p className="text-sm font-medium">{student.progress}%</p>
                          <p className="text-xs text-muted-foreground">Progress</p>
                        </div>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="hidden sm:inline-flex">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Student Feedback</CardTitle>
                <CardDescription>Review feedback from your students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {feedback.map((item) => (
                    <div key={item.id} className="rounded-lg border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={item.studentAvatar || "/placeholder.svg"} alt={item.studentName} />
                            <AvatarFallback>{item.studentName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{item.studentName}</span>
                        </div>
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < item.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="mb-1 text-sm font-medium">{item.courseTitle}</p>
                      <p className="text-sm text-muted-foreground">{item.comment}</p>
                      <div className="mt-2 text-right text-xs text-muted-foreground">
                        {new Date(item.date).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  )
}
