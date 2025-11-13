"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft,
  Plus,
  Upload,
  Video,
  FileText,
  Image,
  Link as LinkIcon,
  Save,
  Eye,
  Send,
  X,
  Check,
  Clock,
  Users,
  DollarSign,
  Globe,
  Lock,
  Unlock,
  Star,
  Target,
  BookOpen,
  Award,
  Settings,
  Trash2,
  Edit,
  Copy
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function CreateCoursePage() {
  const { toast } = useToast()
  const [isMobile, setIsMobile] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [courseData, setCourseData] = useState({
    basicInfo: {
      title: "",
      description: "",
      shortDescription: "",
      category: "",
      level: "",
      language: "English",
      price: "Free",
      originalPrice: "",
      duration: "",
      tags: [] as string[],
      featured: false
    },
    content: {
      lessons: [] as any[],
      requirements: [] as string[],
      whatYouWillLearn: [] as string[],
      certificate: true
    },
    instructor: {
      name: "",
      title: "",
      bio: "",
      avatar: "",
      experience: "",
      companies: [] as string[]
    },
    settings: {
      visibility: "public",
      enrollment: "open",
      startDate: "",
      endDate: "",
      maxStudents: "",
      allowComments: true,
      allowReviews: true
    }
  })

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const categories = [
    "Funding & Finance",
    "Marketing & Sales", 
    "Product Development",
    "Legal & Compliance",
    "Operations",
    "Leadership & Management",
    "Technology & Innovation",
    "Strategy & Planning",
    "Growth & Scaling"
  ]

  const levels = ["Beginner", "Intermediate", "Advanced", "Expert"]
  const languages = ["English", "Spanish", "French", "German", "Chinese", "Japanese"]

  const handleSave = () => {
    toast({
      title: "Course Saved",
      description: "Your course has been saved as draft.",
    })
  }

  const handlePublish = () => {
    toast({
      title: "Course Published",
      description: "Your course is now live and available to students.",
    })
  }

  const handlePreview = () => {
    toast({
      title: "Preview Mode",
      description: "Opening course preview...",
    })
  }

  const addLesson = () => {
    const newLesson = {
      id: Date.now(),
      title: "",
      description: "",
      duration: "",
      type: "video",
      isLocked: false,
      resources: []
    }
    setCourseData({
      ...courseData,
      content: {
        ...courseData.content,
        lessons: [...courseData.content.lessons, newLesson]
      }
    })
  }

  const removeLesson = (lessonId: number) => {
    setCourseData({
      ...courseData,
      content: {
        ...courseData.content,
        lessons: courseData.content.lessons.filter(lesson => lesson.id !== lessonId)
      }
    })
  }

  const addTag = (tag: string) => {
    if (tag && !courseData.basicInfo.tags.includes(tag)) {
      setCourseData({
        ...courseData,
        basicInfo: {
          ...courseData.basicInfo,
          tags: [...courseData.basicInfo.tags, tag]
        }
      })
    }
  }

  const removeTag = (tagToRemove: string) => {
    setCourseData({
      ...courseData,
      basicInfo: {
        ...courseData.basicInfo,
        tags: courseData.basicInfo.tags.filter(tag => tag !== tagToRemove)
      }
    })
  }

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
                <h1 className="text-xl font-bold text-gray-900">Create Course</h1>
                <p className="text-sm text-gray-600">Build and publish your own course</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button variant="outline" size="sm" onClick={handlePreview}>
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button size="sm" onClick={handlePublish}>
                <Send className="h-4 w-4 mr-2" />
                Publish
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Course Builder</CardTitle>
                <CardDescription>Step-by-step course creation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  currentStep === 1 ? 'bg-[#0F7377] text-white' : 'bg-gray-100 text-gray-700'
                }`} onClick={() => setCurrentStep(1)}>
                  <div className="flex items-center space-x-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                      currentStep === 1 ? 'bg-white text-[#0F7377]' : 'bg-gray-300 text-gray-600'
                    }`}>
                      1
                    </div>
                    <span className="text-sm font-medium">Basic Info</span>
                  </div>
                </div>
                
                <div className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  currentStep === 2 ? 'bg-[#0F7377] text-white' : 'bg-gray-100 text-gray-700'
                }`} onClick={() => setCurrentStep(2)}>
                  <div className="flex items-center space-x-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                      currentStep === 2 ? 'bg-white text-[#0F7377]' : 'bg-gray-300 text-gray-600'
                    }`}>
                      2
                    </div>
                    <span className="text-sm font-medium">Content</span>
                  </div>
                </div>
                
                <div className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  currentStep === 3 ? 'bg-[#0F7377] text-white' : 'bg-gray-100 text-gray-700'
                }`} onClick={() => setCurrentStep(3)}>
                  <div className="flex items-center space-x-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                      currentStep === 3 ? 'bg-white text-[#0F7377]' : 'bg-gray-300 text-gray-600'
                    }`}>
                      3
                    </div>
                    <span className="text-sm font-medium">Instructor</span>
                  </div>
                </div>
                
                <div className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  currentStep === 4 ? 'bg-[#0F7377] text-white' : 'bg-gray-100 text-gray-700'
                }`} onClick={() => setCurrentStep(4)}>
                  <div className="flex items-center space-x-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                      currentStep === 4 ? 'bg-white text-[#0F7377]' : 'bg-gray-300 text-gray-600'
                    }`}>
                      4
                    </div>
                    <span className="text-sm font-medium">Settings</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Set up the basic details of your course</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Course Title *</Label>
                    <Input
                      id="title"
                      placeholder="Enter your course title"
                      value={courseData.basicInfo.title}
                      onChange={(e) => setCourseData({
                        ...courseData,
                        basicInfo: { ...courseData.basicInfo, title: e.target.value }
                      })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="shortDescription">Short Description *</Label>
                    <Input
                      id="shortDescription"
                      placeholder="Brief description for course cards"
                      value={courseData.basicInfo.shortDescription}
                      onChange={(e) => setCourseData({
                        ...courseData,
                        basicInfo: { ...courseData.basicInfo, shortDescription: e.target.value }
                      })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Full Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Detailed description of your course"
                      rows={4}
                      value={courseData.basicInfo.description}
                      onChange={(e) => setCourseData({
                        ...courseData,
                        basicInfo: { ...courseData.basicInfo, description: e.target.value }
                      })}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select value={courseData.basicInfo.category} onValueChange={(value) => setCourseData({
                        ...courseData,
                        basicInfo: { ...courseData.basicInfo, category: value }
                      })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category.toLowerCase().replace(/\s+/g, '-')}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="level">Level *</Label>
                      <Select value={courseData.basicInfo.level} onValueChange={(value) => setCourseData({
                        ...courseData,
                        basicInfo: { ...courseData.basicInfo, level: value }
                      })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          {levels.map((level) => (
                            <SelectItem key={level} value={level.toLowerCase()}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration (hours)</Label>
                      <Input
                        id="duration"
                        type="number"
                        placeholder="e.g., 4"
                        value={courseData.basicInfo.duration}
                        onChange={(e) => setCourseData({
                          ...courseData,
                          basicInfo: { ...courseData.basicInfo, duration: e.target.value }
                        })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="price">Price</Label>
                      <Input
                        id="price"
                        placeholder="e.g., Free or $99"
                        value={courseData.basicInfo.price}
                        onChange={(e) => setCourseData({
                          ...courseData,
                          basicInfo: { ...courseData.basicInfo, price: e.target.value }
                        })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select value={courseData.basicInfo.language} onValueChange={(value) => setCourseData({
                        ...courseData,
                        basicInfo: { ...courseData.basicInfo, language: value }
                      })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {languages.map((language) => (
                            <SelectItem key={language} value={language}>
                              {language}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Tags</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {courseData.basicInfo.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                          {tag}
                          <X 
                            className="h-3 w-3 cursor-pointer" 
                            onClick={() => removeTag(tag)}
                          />
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a tag"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            addTag(e.currentTarget.value)
                            e.currentTarget.value = ''
                          }
                        }}
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={(e) => {
                          const input = e.currentTarget.previousElementSibling as HTMLInputElement
                          addTag(input.value)
                          input.value = ''
                        }}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={courseData.basicInfo.featured}
                      onChange={(e) => setCourseData({
                        ...courseData,
                        basicInfo: { ...courseData.basicInfo, featured: e.target.checked }
                      })}
                    />
                    <Label htmlFor="featured">Featured course</Label>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Content */}
            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Course Content</CardTitle>
                  <CardDescription>Add lessons and learning objectives</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Lessons</h3>
                      <Button onClick={addLesson}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Lesson
                      </Button>
                    </div>
                    
                    {courseData.content.lessons.map((lesson, index) => (
                      <div key={lesson.id} className="border rounded-lg p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Lesson {index + 1}</h4>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => removeLesson(lesson.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Lesson Title</Label>
                            <Input
                              placeholder="Enter lesson title"
                              value={lesson.title}
                              onChange={(e) => {
                                const updatedLessons = courseData.content.lessons.map(l => 
                                  l.id === lesson.id ? { ...l, title: e.target.value } : l
                                )
                                setCourseData({
                                  ...courseData,
                                  content: { ...courseData.content, lessons: updatedLessons }
                                })
                              }}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Duration (minutes)</Label>
                            <Input
                              type="number"
                              placeholder="e.g., 15"
                              value={lesson.duration}
                              onChange={(e) => {
                                const updatedLessons = courseData.content.lessons.map(l => 
                                  l.id === lesson.id ? { ...l, duration: e.target.value } : l
                                )
                                setCourseData({
                                  ...courseData,
                                  content: { ...courseData.content, lessons: updatedLessons }
                                })
                              }}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Description</Label>
                          <Textarea
                            placeholder="Describe what students will learn in this lesson"
                            rows={2}
                            value={lesson.description}
                            onChange={(e) => {
                              const updatedLessons = courseData.content.lessons.map(l => 
                                l.id === lesson.id ? { ...l, description: e.target.value } : l
                              )
                              setCourseData({
                                ...courseData,
                                content: { ...courseData.content, lessons: updatedLessons }
                              })
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">What Students Will Learn</h3>
                    <div className="space-y-2">
                      {courseData.content.whatYouWillLearn.map((item, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Input
                            value={item}
                            onChange={(e) => {
                              const updated = [...courseData.content.whatYouWillLearn]
                              updated[index] = e.target.value
                              setCourseData({
                                ...courseData,
                                content: { ...courseData.content, whatYouWillLearn: updated }
                              })
                            }}
                          />
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              const updated = courseData.content.whatYouWillLearn.filter((_, i) => i !== index)
                              setCourseData({
                                ...courseData,
                                content: { ...courseData.content, whatYouWillLearn: updated }
                              })
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setCourseData({
                            ...courseData,
                            content: { 
                              ...courseData.content, 
                              whatYouWillLearn: [...courseData.content.whatYouWillLearn, ''] 
                            }
                          })
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Learning Objective
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Requirements</h3>
                    <div className="space-y-2">
                      {courseData.content.requirements.map((requirement, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Input
                            value={requirement}
                            onChange={(e) => {
                              const updated = [...courseData.content.requirements]
                              updated[index] = e.target.value
                              setCourseData({
                                ...courseData,
                                content: { ...courseData.content, requirements: updated }
                              })
                            }}
                          />
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              const updated = courseData.content.requirements.filter((_, i) => i !== index)
                              setCourseData({
                                ...courseData,
                                content: { ...courseData.content, requirements: updated }
                              })
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setCourseData({
                            ...courseData,
                            content: { 
                              ...courseData.content, 
                              requirements: [...courseData.content.requirements, ''] 
                            }
                          })
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Requirement
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="certificate"
                      checked={courseData.content.certificate}
                      onChange={(e) => setCourseData({
                        ...courseData,
                        content: { ...courseData.content, certificate: e.target.checked }
                      })}
                    />
                    <Label htmlFor="certificate">Offer certificate upon completion</Label>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Instructor */}
            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Instructor Information</CardTitle>
                  <CardDescription>Tell students about yourself</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="instructorName">Name *</Label>
                    <Input
                      id="instructorName"
                      placeholder="Your full name"
                      value={courseData.instructor.name}
                      onChange={(e) => setCourseData({
                        ...courseData,
                        instructor: { ...courseData.instructor, name: e.target.value }
                      })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="instructorTitle">Title *</Label>
                    <Input
                      id="instructorTitle"
                      placeholder="e.g., CEO, Founder, Expert"
                      value={courseData.instructor.title}
                      onChange={(e) => setCourseData({
                        ...courseData,
                        instructor: { ...courseData.instructor, title: e.target.value }
                      })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="instructorBio">Bio *</Label>
                    <Textarea
                      id="instructorBio"
                      placeholder="Tell students about your background and expertise"
                      rows={4}
                      value={courseData.instructor.bio}
                      onChange={(e) => setCourseData({
                        ...courseData,
                        instructor: { ...courseData.instructor, bio: e.target.value }
                      })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience</Label>
                    <Input
                      id="experience"
                      placeholder="e.g., 10+ years in venture capital"
                      value={courseData.instructor.experience}
                      onChange={(e) => setCourseData({
                        ...courseData,
                        instructor: { ...courseData.instructor, experience: e.target.value }
                      })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Companies/Organizations</Label>
                    <div className="space-y-2">
                      {courseData.instructor.companies.map((company, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Input
                            value={company}
                            onChange={(e) => {
                              const updated = [...courseData.instructor.companies]
                              updated[index] = e.target.value
                              setCourseData({
                                ...courseData,
                                instructor: { ...courseData.instructor, companies: updated }
                              })
                            }}
                          />
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              const updated = courseData.instructor.companies.filter((_, i) => i !== index)
                              setCourseData({
                                ...courseData,
                                instructor: { ...courseData.instructor, companies: updated }
                              })
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setCourseData({
                            ...courseData,
                            instructor: { 
                              ...courseData.instructor, 
                              companies: [...courseData.instructor.companies, ''] 
                            }
                          })
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Company
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 4: Settings */}
            {currentStep === 4 && (
              <Card>
                <CardHeader>
                  <CardTitle>Course Settings</CardTitle>
                  <CardDescription>Configure course visibility and enrollment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Visibility</Label>
                      <Select value={courseData.settings.visibility} onValueChange={(value) => setCourseData({
                        ...courseData,
                        settings: { ...courseData.settings, visibility: value }
                      })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                          <SelectItem value="unlisted">Unlisted</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Enrollment</Label>
                      <Select value={courseData.settings.enrollment} onValueChange={(value) => setCourseData({
                        ...courseData,
                        settings: { ...courseData.settings, enrollment: value }
                      })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="open">Open</SelectItem>
                          <SelectItem value="approval">Requires Approval</SelectItem>
                          <SelectItem value="invite">Invite Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Input
                        type="date"
                        value={courseData.settings.startDate}
                        onChange={(e) => setCourseData({
                          ...courseData,
                          settings: { ...courseData.settings, startDate: e.target.value }
                        })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Input
                        type="date"
                        value={courseData.settings.endDate}
                        onChange={(e) => setCourseData({
                          ...courseData,
                          settings: { ...courseData.settings, endDate: e.target.value }
                        })}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Maximum Students</Label>
                    <Input
                      type="number"
                      placeholder="Leave empty for unlimited"
                      value={courseData.settings.maxStudents}
                      onChange={(e) => setCourseData({
                        ...courseData,
                        settings: { ...courseData.settings, maxStudents: e.target.value }
                      })}
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="allowComments"
                        checked={courseData.settings.allowComments}
                        onChange={(e) => setCourseData({
                          ...courseData,
                          settings: { ...courseData.settings, allowComments: e.target.checked }
                        })}
                      />
                      <Label htmlFor="allowComments">Allow comments</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="allowReviews"
                        checked={courseData.settings.allowReviews}
                        onChange={(e) => setCourseData({
                          ...courseData,
                          settings: { ...courseData.settings, allowReviews: e.target.checked }
                        })}
                      />
                      <Label htmlFor="allowReviews">Allow reviews</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-6">
              <Button 
                variant="outline" 
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              <Button 
                onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
                disabled={currentStep === 4}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
