"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  ChevronLeft,
  BookOpen,
  Target,
  DollarSign,
  TrendingUp,
  Users,
  Building,
  Scale,
  Clock,
  Star,
  ArrowRight,
  Bookmark,
  Share2,
  Download,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  FileText,
  Calculator,
  Video,
  ExternalLink,
  Calendar,
  User,
  Tag
} from "lucide-react"
import { startupGuides, StartupGuide } from "@/lib/startup-guides-data"

const categoryIcons = {
  'market-research': Target,
  'business-planning': BookOpen,
  'funding': DollarSign,
  'marketing': TrendingUp,
  'scaling': Users,
  'legal': Scale,
  'operations': Building,
  'team-building': Users
}

const difficultyColors = {
  'beginner': 'bg-green-100 text-green-800',
  'intermediate': 'bg-yellow-100 text-yellow-800',
  'advanced': 'bg-red-100 text-red-800'
}

const resourceIcons = {
  'tool': FileText,
  'template': FileText,
  'checklist': CheckCircle,
  'calculator': Calculator,
  'video': Video,
  'article': BookOpen
}

export default function GuideDetailPage() {
  const params = useParams()
  const guideId = params.id as string
  const guide = startupGuides.find(g => g.id === guideId)
  const [activeSection, setActiveSection] = useState<string>("")
  const [readingProgress, setReadingProgress] = useState(0)

  if (!guide) {
    return (
              <div className="container mx-auto max-w-7xl px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Guide Not Found</h1>
            <p className="text-gray-600 mb-6">The guide you're looking for doesn't exist.</p>
            <Link href="/startup/guides">
              <Button>Back to Guides</Button>
            </Link>
          </div>
        </div>
      )
    }

  const Icon = categoryIcons[guide.category as keyof typeof categoryIcons] || BookOpen

  return (
          <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8">
          <Link href="/startup/guides" className="flex items-center text-[#0F7377] hover:underline mb-4">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Startup Guides
          </Link>
          
          {/* Guide Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-[#0F7377]/10 p-2 rounded-md">
                  <Icon className="h-6 w-6 text-[#0F7377]" />
                </div>
                <Badge variant="outline">
                  {guide.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </Badge>
                <Badge className={difficultyColors[guide.difficulty]}>
                  {guide.difficulty}
                </Badge>
                {guide.featured && (
                  <Badge className="bg-yellow-100 text-yellow-800">
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>
              <h1 className="text-4xl font-bold mb-4">{guide.title}</h1>
              <p className="text-xl text-gray-600 mb-6">{guide.description}</p>
              
              <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>By {guide.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{guide.readTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Updated {guide.lastUpdated}</span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Bookmark className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Reading Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Reading Progress</span>
              <span>{readingProgress}%</span>
            </div>
            <Progress value={readingProgress} className="h-2" />
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeSection} onValueChange={setActiveSection} className="space-y-6">
              <TabsList className="grid grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="sections">Sections</TabsTrigger>
                <TabsTrigger value="case-studies">Case Studies</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Lightbulb className="h-5 w-5 text-yellow-500" />
                      Key Takeaways
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {guide.keyTakeaways.map((takeaway, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className="bg-[#0F7377] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">
                            {index + 1}
                          </div>
                          <p className="text-sm">{takeaway}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Guide Overview</CardTitle>
                    <CardDescription>
                      This comprehensive guide covers {guide.sections.length} main sections with {guide.caseStudies.length} real-world case studies and {guide.resources.length} practical resources.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{guide.sections.length}</div>
                        <div className="text-sm text-gray-600">Sections</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{guide.caseStudies.length}</div>
                        <div className="text-sm text-gray-600">Case Studies</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">{guide.resources.length}</div>
                        <div className="text-sm text-gray-600">Resources</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="sections" className="space-y-6">
                {guide.sections.map((section, index) => (
                  <Card key={section.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center space-x-2">
                          <div className="bg-[#0F7377] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <span>{section.title}</span>
                        </CardTitle>
                      </div>
                      <CardDescription>{section.content}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Subsections */}
                      {section.subsections.map((subsection, subIndex) => (
                        <div key={subsection.id} className="border-l-4 border-[#0F7377] pl-4">
                          <h4 className="font-semibold mb-2">{subsection.title}</h4>
                          <p className="text-gray-600 mb-3">{subsection.content}</p>
                          <div className="space-y-2">
                            <h5 className="text-sm font-medium text-gray-700">Tips:</h5>
                            <ul className="space-y-1">
                              {subsection.tips.map((tip, tipIndex) => (
                                <li key={tipIndex} className="text-sm text-gray-600 flex items-start">
                                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                  {tip}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}

                      {/* Tips and Warnings */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-green-50 p-4 rounded-lg">
                          <h5 className="font-semibold text-green-800 mb-2 flex items-center">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Pro Tips
                          </h5>
                          <ul className="space-y-1">
                            {section.tips.map((tip, tipIndex) => (
                              <li key={tipIndex} className="text-sm text-green-700">• {tip}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-red-50 p-4 rounded-lg">
                          <h5 className="font-semibold text-red-800 mb-2 flex items-center">
                            <AlertTriangle className="h-4 w-4 mr-2" />
                            Warnings
                          </h5>
                          <ul className="space-y-1">
                            {section.warnings.map((warning, warningIndex) => (
                              <li key={warningIndex} className="text-sm text-red-700">• {warning}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Examples */}
                      {section.examples.map((example, exampleIndex) => (
                        <div key={exampleIndex} className="bg-blue-50 p-4 rounded-lg">
                          <h5 className="font-semibold text-blue-800 mb-2">{example.title}</h5>
                          <p className="text-sm text-blue-700 mb-2">{example.description}</p>
                          <div className="bg-white p-3 rounded border-l-4 border-blue-500">
                            <h6 className="font-medium text-blue-800 mb-1">Outcome:</h6>
                            <p className="text-sm text-blue-700 mb-2">{example.outcome}</p>
                            <h6 className="font-medium text-blue-800 mb-1">Key Lessons:</h6>
                            <ul className="space-y-1">
                              {example.lessons.map((lesson, lessonIndex) => (
                                <li key={lessonIndex} className="text-sm text-blue-700">• {lesson}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="case-studies" className="space-y-6">
                {guide.caseStudies.map((caseStudy, index) => (
                  <Card key={caseStudy.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center space-x-2">
                          <div className="bg-[#0F7377] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <span>{caseStudy.company}</span>
                        </CardTitle>
                        <Badge variant="outline">{caseStudy.year}</Badge>
                      </div>
                      <CardDescription>
                        <span className="font-medium">{caseStudy.industry}</span> • {caseStudy.company}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-red-600 mb-2">Challenge</h4>
                          <p className="text-sm text-gray-600">{caseStudy.challenge}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-green-600 mb-2">Solution</h4>
                          <p className="text-sm text-gray-600">{caseStudy.solution}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-600 mb-2">Results</h4>
                        <p className="text-sm text-gray-600">{caseStudy.results}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-purple-600 mb-2">Key Learnings</h4>
                        <ul className="space-y-1">
                          {caseStudy.keyLearnings.map((learning, learningIndex) => (
                            <li key={learningIndex} className="text-sm text-gray-600 flex items-start">
                              <Lightbulb className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                              {learning}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="resources" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {guide.resources.map((resource, index) => {
                    const ResourceIcon = resourceIcons[resource.type] || FileText
                    return (
                      <Card key={resource.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                        <CardHeader className="pb-3">
                          <div className="flex items-center space-x-2">
                            <div className="bg-[#0F7377]/10 p-2 rounded-md">
                              <ResourceIcon className="h-5 w-5 text-[#0F7377]" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{resource.title}</CardTitle>
                              <Badge variant="outline" className="text-xs capitalize">
                                {resource.type}
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                          <Button size="sm" className="w-full">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Access Resource
                          </Button>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Guide Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Guide Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-gray-500">Category</div>
                    <div className="flex items-center space-x-2 mt-1">
                      <Icon className="h-4 w-4 text-[#0F7377]" />
                      <span className="text-sm">
                        {guide.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">Difficulty</div>
                    <Badge className={`mt-1 ${difficultyColors[guide.difficulty]}`}>
                      {guide.difficulty}
                    </Badge>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">Read Time</div>
                    <div className="flex items-center space-x-2 mt-1">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{guide.readTime}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">Author</div>
                    <div className="flex items-center space-x-2 mt-1">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{guide.author}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card>
                <CardHeader>
                  <CardTitle>Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {guide.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Related Guides */}
              <Card>
                <CardHeader>
                  <CardTitle>Related Guides</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {startupGuides
                      .filter(g => g.category === guide.category && g.id !== guide.id)
                      .slice(0, 3)
                      .map((relatedGuide) => (
                        <Link key={relatedGuide.id} href={`/startup/guides/${relatedGuide.id}`}>
                          <div className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                            <div className="font-medium text-sm">{relatedGuide.title}</div>
                            <div className="text-xs text-gray-500 mt-1">{relatedGuide.readTime}</div>
                          </div>
                        </Link>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
}
