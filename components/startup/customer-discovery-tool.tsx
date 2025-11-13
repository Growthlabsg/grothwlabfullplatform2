"use client"

import { useState } from "react"
import Link from "next/link"
import { GrowthLabLayout } from "@/components/layout/growthlab-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  ChevronLeft,
  Users,
  FileText,
  BarChart,
  PieChart,
  LineChart,
  Sparkles,
  Check,
  Plus,
  Trash2,
  Download,
  Share2,
  Save,
  MessageSquare,
  UserPlus,
  ClipboardList,
  Search,
  Eye,
  Copy,
  Edit,
  BarChart4,
  Lightbulb,
} from "lucide-react"

export function CustomerDiscoveryTool() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("surveys")
  const [surveyTitle, setSurveyTitle] = useState("")
  const [surveyDescription, setSurveyDescription] = useState("")
  const [questions, setQuestions] = useState([{ id: "q1", type: "multiple-choice", text: "", options: ["", ""] }])
  const [interviewQuestions, setInterviewQuestions] = useState([{ id: "iq1", text: "", category: "problem" }])
  const [personas, setPersonas] = useState([
    {
      id: "p1",
      name: "",
      age: "",
      occupation: "",
      goals: "",
      painPoints: "",
      description: "",
    },
  ])
  const [surveyCreated, setSurveyCreated] = useState(false)
  const [interviewGuideCreated, setInterviewGuideCreated] = useState(false)
  const [personaCreated, setPersonaCreated] = useState(false)

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: `q${questions.length + 1}`,
        type: "multiple-choice",
        text: "",
        options: ["", ""],
      },
    ])
  }

  const handleRemoveQuestion = (index: number) => {
    if (questions.length <= 1) return
    const newQuestions = [...questions]
    newQuestions.splice(index, 1)
    setQuestions(newQuestions)
  }

  const handleQuestionChange = (index: number, field: string, value: any) => {
    const newQuestions = [...questions]
    newQuestions[index] = { ...newQuestions[index], [field]: value }
    setQuestions(newQuestions)
  }

  const handleOptionChange = (questionIndex: number, optionIndex: number, value: string) => {
    const newQuestions = [...questions]
    (newQuestions[questionIndex] ? newQuestions[questionIndex].options : undefined)[optionIndex] = value
    setQuestions(newQuestions)
  }

  const handleAddOption = (questionIndex: number) => {
    const newQuestions = [...questions]
    (newQuestions[questionIndex] ? newQuestions[questionIndex].options : undefined).push("")
    setQuestions(newQuestions)
  }

  const handleRemoveOption = (questionIndex: number, optionIndex: number) => {
    if ((questions[questionIndex] ? questions[questionIndex].options : undefined).length <= 2) return
    const newQuestions = [...questions]
    (newQuestions[questionIndex] ? newQuestions[questionIndex].options : undefined).splice(optionIndex, 1)
    setQuestions(newQuestions)
  }

  const handleAddInterviewQuestion = () => {
    setInterviewQuestions([
      ...interviewQuestions,
      {
        id: `iq${interviewQuestions.length + 1}`,
        text: "",
        category: "problem",
      },
    ])
  }

  const handleRemoveInterviewQuestion = (index: number) => {
    if (interviewQuestions.length <= 1) return
    const newQuestions = [...interviewQuestions]
    newQuestions.splice(index, 1)
    setInterviewQuestions(newQuestions)
  }

  const handleInterviewQuestionChange = (index: number, field: string, value: any) => {
    const newQuestions = [...interviewQuestions]
    newQuestions[index] = { ...newQuestions[index], [field]: value }
    setInterviewQuestions(newQuestions)
  }

  const handleAddPersona = () => {
    setPersonas([
      ...personas,
      {
        id: `p${personas.length + 1}`,
        name: "",
        age: "",
        occupation: "",
        goals: "",
        painPoints: "",
        description: "",
      },
    ])
  }

  const handleRemovePersona = (index: number) => {
    if (personas.length <= 1) return
    const newPersonas = [...personas]
    newPersonas.splice(index, 1)
    setPersonas(newPersonas)
  }

  const handlePersonaChange = (index: number, field: string, value: any) => {
    const newPersonas = [...personas]
    newPersonas[index] = { ...newPersonas[index], [field]: value }
    setPersonas(newPersonas)
  }

  const createSurvey = () => {
    if (!surveyTitle) {
      toast({
        title: "Survey Title Required",
        description: "Please provide a title for your survey.",
        variant: "destructive",
      })
      return
    }

    if (questions.some((q) => !q.text)) {
      toast({
        title: "Incomplete Questions",
        description: "Please fill out all question texts.",
        variant: "destructive",
      })
      return
    }

    setSurveyCreated(true)
    toast({
      title: "Survey Created",
      description: "Your survey has been created successfully.",
    })
  }

  const createInterviewGuide = () => {
    if (interviewQuestions.some((q) => !q.text)) {
      toast({
        title: "Incomplete Questions",
        description: "Please fill out all interview questions.",
        variant: "destructive",
      })
      return
    }

    setInterviewGuideCreated(true)
    toast({
      title: "Interview Guide Created",
      description: "Your interview guide has been created successfully.",
    })
  }

  const createPersona = () => {
    if (personas.some((p) => !p.name || !p.description)) {
      toast({
        title: "Incomplete Persona",
        description: "Please fill out at least the name and description for each persona.",
        variant: "destructive",
      })
      return
    }

    setPersonaCreated(true)
    toast({
      title: "Persona Created",
      description: "Your customer persona has been created successfully.",
    })
  }

  const handleSave = () => {
    toast({
      title: "Saved Successfully",
      description: "Your work has been saved to your account.",
    })
  }

  const handleDownload = () => {
    toast({
      title: "Downloaded Successfully",
      description: "Your file has been downloaded.",
    })
  }

  const handleShare = () => {
    toast({
      title: "Share Link Generated",
      description: "A shareable link has been copied to your clipboard.",
    })
  }

  return (
    <GrowthLabLayout>
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8">
          <Link href="/startup" className="flex items-center text-[#0F7377] hover:underline mb-4">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Startup Resources
          </Link>
          <h1 className="text-3xl font-bold mb-4">Customer Discovery Tool</h1>
          <p className="text-[#334155] max-w-3xl">
            Conduct user research, collect feedback, and validate your product with real users. Our customer discovery
            tool helps you understand your target audience and build products they'll love.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Customer Discovery Tool</CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={handleSave}>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleDownload}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleShare}>
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
                <CardDescription>
                  Create surveys, conduct user interviews, and build customer personas to understand your users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-4 mb-8">
                    <TabsTrigger value="surveys">Surveys</TabsTrigger>
                    <TabsTrigger value="interviews">Interviews</TabsTrigger>
                    <TabsTrigger value="personas">Personas</TabsTrigger>
                    <TabsTrigger value="insights">Insights</TabsTrigger>
                  </TabsList>

                  <TabsContent value="surveys" className="space-y-6">
                    {surveyCreated ? (
                      <div className="space-y-6">
                        <div className="bg-muted p-6 rounded-lg">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-xl font-bold">{surveyTitle}</h3>
                              <p className="text-muted-foreground mt-1">{surveyDescription}</p>
                            </div>
                            <Badge className="bg-green-100 text-green-800">
                              <Check className="h-3 w-3 mr-1" />
                              Created
                            </Badge>
                          </div>

                          <div className="space-y-6 mt-6">
                            {questions.map((question, index) => (
                              <div key={question.id} className="border rounded-md p-4">
                                <h4 className="font-medium mb-2">
                                  Question {index + 1}: {question.text}
                                </h4>
                                {question.type === "multiple-choice" && (
                                  <div className="space-y-2 ml-4">
                                    {question.options.map((option, optionIndex) => (
                                      <div key={optionIndex} className="flex items-center space-x-2">
                                        <RadioGroupItem
                                          value={`q${index}-o${optionIndex}`}
                                          id={`q${index}-o${optionIndex}`}
                                          disabled
                                        />
                                        <Label htmlFor={`q${index}-o${optionIndex}`}>{option}</Label>
                                      </div>
                                    ))}
                                  </div>
                                )}
                                {question.type === "text" && (
                                  <div className="ml-4">
                                    <Textarea disabled placeholder="Respondent's answer will appear here" />
                                  </div>
                                )}
                                {question.type === "rating" && (
                                  <div className="flex space-x-2 ml-4">
                                    {[1, 2, 3, 4, 5].map((rating) => (
                                      <div
                                        key={rating}
                                        className="w-10 h-10 rounded-md border flex items-center justify-center text-muted-foreground"
                                      >
                                        {rating}
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-between">
                          <Button variant="outline" onClick={() => setSurveyCreated(false)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Survey
                          </Button>
                          <div className="space-x-2">
                            <Button variant="outline">
                              <Copy className="h-4 w-4 mr-2" />
                              Copy Link
                            </Button>
                            <Button>
                              <Eye className="h-4 w-4 mr-2" />
                              Preview Survey
                            </Button>
                          </div>
                        </div>

                        <div className="border rounded-md p-6">
                          <h3 className="text-lg font-medium mb-4">Distribution Options</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card className="border-2 hover:border-[#0F7377] transition-all">
                              <CardHeader className="pb-2">
                                <CardTitle className="text-base">Email</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-sm text-muted-foreground">Send survey to your email list</p>
                              </CardContent>
                              <CardFooter>
                                <Button variant="outline" size="sm" className="w-full">
                                  Set Up
                                </Button>
                              </CardFooter>
                            </Card>
                            <Card className="border-2 hover:border-[#0F7377] transition-all">
                              <CardHeader className="pb-2">
                                <CardTitle className="text-base">Website Embed</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-sm text-muted-foreground">Add to your website or app</p>
                              </CardContent>
                              <CardFooter>
                                <Button variant="outline" size="sm" className="w-full">
                                  Get Code
                                </Button>
                              </CardFooter>
                            </Card>
                            <Card className="border-2 hover:border-[#0F7377] transition-all">
                              <CardHeader className="pb-2">
                                <CardTitle className="text-base">Social Media</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-sm text-muted-foreground">Share on social platforms</p>
                              </CardContent>
                              <CardFooter>
                                <Button variant="outline" size="sm" className="w-full">
                                  Share
                                </Button>
                              </CardFooter>
                            </Card>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div>
                          <Label htmlFor="survey-title">Survey Title*</Label>
                          <Input
                            id="survey-title"
                            value={surveyTitle}
                            onChange={(e) => setSurveyTitle(e.target.value)}
                            placeholder="e.g. Product Feedback Survey"
                          />
                        </div>

                        <div>
                          <Label htmlFor="survey-description">Survey Description</Label>
                          <Textarea
                            id="survey-description"
                            value={surveyDescription}
                            onChange={(e) => setSurveyDescription(e.target.value)}
                            placeholder="Briefly describe the purpose of this survey..."
                            rows={3}
                          />
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <Label>Questions</Label>
                            <Button variant="outline" size="sm" onClick={handleAddQuestion}>
                              <Plus className="h-4 w-4 mr-2" />
                              Add Question
                            </Button>
                          </div>

                          <div className="space-y-6">
                            {questions.map((question, index) => (
                              <div key={question.id} className="border rounded-md p-4">
                                <div className="flex justify-between items-center mb-4">
                                  <h4 className="font-medium">Question {index + 1}</h4>
                                  {questions.length > 1 && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleRemoveQuestion(index)}
                                      className="text-destructive"
                                    >
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      Remove
                                    </Button>
                                  )}
                                </div>

                                <div className="space-y-4">
                                  <div>
                                    <Label htmlFor={`question-text-${index}`}>Question Text*</Label>
                                    <Input
                                      id={`question-text-${index}`}
                                      value={question.text}
                                      onChange={(e) => handleQuestionChange(index, "text", e.target.value)}
                                      placeholder="e.g. How satisfied are you with our product?"
                                    />
                                  </div>

                                  <div>
                                    <Label htmlFor={`question-type-${index}`}>Question Type</Label>
                                    <Select
                                      value={question.type}
                                      onValueChange={(value) => handleQuestionChange(index, "type", value)}
                                    >
                                      <SelectTrigger id={`question-type-${index}`}>
                                        <SelectValue placeholder="Select question type" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                                        <SelectItem value="text">Text Response</SelectItem>
                                        <SelectItem value="rating">Rating Scale</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  {question.type === "multiple-choice" && (
                                    <div>
                                      <div className="flex justify-between items-center mb-2">
                                        <Label>Options</Label>
                                        <Button variant="outline" size="sm" onClick={() => handleAddOption(index)}>
                                          <Plus className="h-4 w-4 mr-2" />
                                          Add Option
                                        </Button>
                                      </div>

                                      {question.options.map((option, optionIndex) => (
                                        <div key={optionIndex} className="flex items-center space-x-2 mb-2">
                                          <Input
                                            value={option}
                                            onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                                            placeholder={`Option ${optionIndex + 1}`}
                                          />
                                          {question.options.length > 2 && (
                                            <Button
                                              variant="ghost"
                                              size="icon"
                                              onClick={() => handleRemoveOption(index, optionIndex)}
                                              className="text-destructive"
                                            >
                                              <Trash2 className="h-4 w-4" />
                                            </Button>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4">
                          <Button onClick={createSurvey}>
                            <FileText className="h-4 w-4 mr-2" />
                            Create Survey
                          </Button>
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="interviews" className="space-y-6">
                    {interviewGuideCreated ? (
                      <div className="space-y-6">
                        <div className="bg-muted p-6 rounded-lg">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-xl font-bold">User Interview Guide</h3>
                              <p className="text-muted-foreground mt-1">
                                A structured guide for conducting effective user interviews
                              </p>
                            </div>
                            <Badge className="bg-green-100 text-green-800">
                              <Check className="h-3 w-3 mr-1" />
                              Created
                            </Badge>
                          </div>

                          <div className="space-y-6 mt-6">
                            <div>
                              <h4 className="font-medium mb-2">Introduction Script</h4>
                              <div className="bg-white p-3 rounded-md text-sm">
                                <p>
                                  "Thank you for taking the time to speak with me today. I'm conducting research to
                                  better understand [research goal]. This conversation will take about [time] minutes.
                                  Everything you share will be kept confidential and used only for product improvement
                                  purposes. There are no right or wrong answers - I'm interested in your honest thoughts
                                  and experiences."
                                </p>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium mb-2">Questions</h4>
                              <div className="space-y-4">
                                {interviewQuestions.map((question, index) => (
                                  <div key={question.id} className="bg-white dark:bg-gray-800 p-3 rounded-md border border-gray-200 dark:border-gray-700">
                                    <div className="flex items-start">
                                      <Badge
                                        variant="outline"
                                        className={
                                          question.category === "problem"
                                            ? "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-700"
                                            : question.category === "solution"
                                              ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-700"
                                              : "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-700"
                                        }
                                      >
                                        {question.category === "problem"
                                          ? "Problem"
                                          : question.category === "solution"
                                            ? "Solution"
                                            : "Background"}
                                      </Badge>
                                      <p className="ml-3 text-gray-900 dark:text-white">{question.text}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium mb-2">Closing Script</h4>
                              <div className="bg-white p-3 rounded-md text-sm">
                                <p>
                                  "Thank you so much for sharing your insights with me today. Your feedback is
                                  incredibly valuable and will help us improve our product. Do you have any questions
                                  for me before we wrap up? If you think of anything else you'd like to share, please
                                  feel free to reach out."
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between">
                          <Button variant="outline" onClick={() => setInterviewGuideCreated(false)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Interview Guide
                          </Button>
                          <div className="space-x-2">
                            <Button variant="outline" onClick={handleDownload}>
                              <Download className="h-4 w-4 mr-2" />
                              Download Guide
                            </Button>
                            <Button>
                              <UserPlus className="h-4 w-4 mr-2" />
                              Schedule Interviews
                            </Button>
                          </div>
                        </div>

                        <div className="border rounded-md p-6">
                          <h3 className="text-lg font-medium mb-4">Interview Management</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card className="border-2 hover:border-[#0F7377] transition-all">
                              <CardHeader className="pb-2">
                                <CardTitle className="text-base">Participant Recruitment</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-sm text-muted-foreground">Find and schedule participants</p>
                              </CardContent>
                              <CardFooter>
                                <Button variant="outline" size="sm" className="w-full">
                                  Recruit
                                </Button>
                              </CardFooter>
                            </Card>
                            <Card className="border-2 hover:border-[#0F7377] transition-all">
                              <CardHeader className="pb-2">
                                <CardTitle className="text-base">Note Taking</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-sm text-muted-foreground">Structured interview notes</p>
                              </CardContent>
                              <CardFooter>
                                <Button variant="outline" size="sm" className="w-full">
                                  Create Template
                                </Button>
                              </CardFooter>
                            </Card>
                            <Card className="border-2 hover:border-[#0F7377] transition-all">
                              <CardHeader className="pb-2">
                                <CardTitle className="text-base">Recording & Transcription</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-sm text-muted-foreground">Capture and analyze interviews</p>
                              </CardContent>
                              <CardFooter>
                                <Button variant="outline" size="sm" className="w-full">
                                  Set Up
                                </Button>
                              </CardFooter>
                            </Card>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div>
                          <Label>Interview Guide Setup</Label>
                          <p className="text-sm text-muted-foreground mt-1 mb-4">
                            Create a structured guide for conducting user interviews. Add questions that will help you
                            understand your users' needs, pain points, and goals.
                          </p>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <Label>Interview Questions</Label>
                            <Button variant="outline" size="sm" onClick={handleAddInterviewQuestion}>
                              <Plus className="h-4 w-4 mr-2" />
                              Add Question
                            </Button>
                          </div>

                          <div className="space-y-4">
                            {interviewQuestions.map((question, index) => (
                              <div key={question.id} className="border rounded-md p-4">
                                <div className="flex justify-between items-center mb-4">
                                  <h4 className="font-medium">Question {index + 1}</h4>
                                  {interviewQuestions.length > 1 && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleRemoveInterviewQuestion(index)}
                                      className="text-destructive"
                                    >
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      Remove
                                    </Button>
                                  )}
                                </div>

                                <div className="space-y-4">
                                  <div>
                                    <Label htmlFor={`interview-question-${index}`}>Question Text*</Label>
                                    <Input
                                      id={`interview-question-${index}`}
                                      value={question.text}
                                      onChange={(e) => handleInterviewQuestionChange(index, "text", e.target.value)}
                                      placeholder="e.g. What challenges do you face when trying to..."
                                    />
                                  </div>

                                  <div>
                                    <Label htmlFor={`question-category-${index}`}>Question Category</Label>
                                    <Select
                                      value={question.category}
                                      onValueChange={(value) => handleInterviewQuestionChange(index, "category", value)}
                                    >
                                      <SelectTrigger id={`question-category-${index}`}>
                                        <SelectValue placeholder="Select category" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="background">Background/Context</SelectItem>
                                        <SelectItem value="problem">Problem Exploration</SelectItem>
                                        <SelectItem value="solution">Solution Validation</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4">
                          <Button onClick={createInterviewGuide}>
                            <FileText className="h-4 w-4 mr-2" />
                            Create Interview Guide
                          </Button>
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="personas" className="space-y-6">
                    {personaCreated ? (
                      <div className="space-y-6">
                        <div className="bg-muted p-6 rounded-lg">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-xl font-bold">Customer Personas</h3>
                              <p className="text-muted-foreground mt-1">
                                Detailed profiles of your target customer segments
                              </p>
                            </div>
                            <Badge className="bg-green-100 text-green-800">
                              <Check className="h-3 w-3 mr-1" />
                              Created
                            </Badge>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            {personas.map((persona, index) => (
                              <div key={persona.id} className="bg-white rounded-md overflow-hidden border">
                                <div className="bg-[#0F7377]/10 p-4">
                                  <h4 className="font-bold text-lg">{persona.name}</h4>
                                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                                    <span>{persona.age}</span>
                                    {persona.age && persona.occupation && <span className="mx-2">•</span>}
                                    <span>{persona.occupation}</span>
                                  </div>
                                </div>
                                <div className="p-4 space-y-3">
                                  <div>
                                    <h5 className="text-sm font-medium">Description</h5>
                                    <p className="text-sm text-muted-foreground">{persona.description}</p>
                                  </div>
                                  <div>
                                    <h5 className="text-sm font-medium">Goals</h5>
                                    <p className="text-sm text-muted-foreground">{persona.goals}</p>
                                  </div>
                                  <div>
                                    <h5 className="text-sm font-medium">Pain Points</h5>
                                    <p className="text-sm text-muted-foreground">{persona.painPoints}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-between">
                          <Button variant="outline" onClick={() => setPersonaCreated(false)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Personas
                          </Button>
                          <div className="space-x-2">
                            <Button variant="outline" onClick={handleDownload}>
                              <Download className="h-4 w-4 mr-2" />
                              Download Personas
                            </Button>
                            <Button onClick={handleAddPersona}>
                              <Plus className="h-4 w-4 mr-2" />
                              Add Another Persona
                            </Button>
                          </div>
                        </div>

                        <div className="border rounded-md p-6">
                          <h3 className="text-lg font-medium mb-4">Using Your Personas</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card className="border-2 hover:border-[#0F7377] transition-all">
                              <CardHeader className="pb-2">
                                <CardTitle className="text-base">Product Development</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-sm text-muted-foreground">Guide feature prioritization</p>
                              </CardContent>
                              <CardFooter>
                                <Button variant="outline" size="sm" className="w-full">
                                  Learn More
                                </Button>
                              </CardFooter>
                            </Card>
                            <Card className="border-2 hover:border-[#0F7377] transition-all">
                              <CardHeader className="pb-2">
                                <CardTitle className="text-base">Marketing Strategy</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-sm text-muted-foreground">Craft targeted messaging</p>
                              </CardContent>
                              <CardFooter>
                                <Button variant="outline" size="sm" className="w-full">
                                  Learn More
                                </Button>
                              </CardFooter>
                            </Card>
                            <Card className="border-2 hover:border-[#0F7377] transition-all">
                              <CardHeader className="pb-2">
                                <CardTitle className="text-base">User Experience</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-sm text-muted-foreground">Design for specific needs</p>
                              </CardContent>
                              <CardFooter>
                                <Button variant="outline" size="sm" className="w-full">
                                  Learn More
                                </Button>
                              </CardFooter>
                            </Card>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div>
                          <Label>Customer Persona Creation</Label>
                          <p className="text-sm text-muted-foreground mt-1 mb-4">
                            Create detailed profiles of your target customers to better understand their needs, goals,
                            and pain points.
                          </p>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <Label>Personas</Label>
                            <Button variant="outline" size="sm" onClick={handleAddPersona}>
                              <Plus className="h-4 w-4 mr-2" />
                              Add Persona
                            </Button>
                          </div>

                          <div className="space-y-6">
                            {personas.map((persona, index) => (
                              <div key={persona.id} className="border rounded-md p-4">
                                <div className="flex justify-between items-center mb-4">
                                  <h4 className="font-medium">Persona {index + 1}</h4>
                                  {personas.length > 1 && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleRemovePersona(index)}
                                      className="text-destructive"
                                    >
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      Remove
                                    </Button>
                                  )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <Label htmlFor={`persona-name-${index}`}>Name*</Label>
                                    <Input
                                      id={`persona-name-${index}`}
                                      value={persona.name}
                                      onChange={(e) => handlePersonaChange(index, "name", e.target.value)}
                                      placeholder="e.g. Marketing Manager Mary"
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor={`persona-age-${index}`}>Age Range</Label>
                                    <Input
                                      id={`persona-age-${index}`}
                                      value={persona.age}
                                      onChange={(e) => handlePersonaChange(index, "age", e.target.value)}
                                      placeholder="e.g. 25-34"
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor={`persona-occupation-${index}`}>Occupation</Label>
                                    <Input
                                      id={`persona-occupation-${index}`}
                                      value={persona.occupation}
                                      onChange={(e) => handlePersonaChange(index, "occupation", e.target.value)}
                                      placeholder="e.g. Marketing Manager"
                                    />
                                  </div>
                                </div>

                                <div className="mt-4 space-y-4">
                                  <div>
                                    <Label htmlFor={`persona-description-${index}`}>Description*</Label>
                                    <Textarea
                                      id={`persona-description-${index}`}
                                      value={persona.description}
                                      onChange={(e) => handlePersonaChange(index, "description", e.target.value)}
                                      placeholder="Describe this persona in a few sentences..."
                                      rows={3}
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor={`persona-goals-${index}`}>Goals</Label>
                                    <Textarea
                                      id={`persona-goals-${index}`}
                                      value={persona.goals}
                                      onChange={(e) => handlePersonaChange(index, "goals", e.target.value)}
                                      placeholder="What are this persona's main goals and objectives?"
                                      rows={3}
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor={`persona-pain-points-${index}`}>Pain Points</Label>
                                    <Textarea
                                      id={`persona-pain-points-${index}`}
                                      value={persona.painPoints}
                                      onChange={(e) => handlePersonaChange(index, "painPoints", e.target.value)}
                                      placeholder="What challenges or frustrations does this persona face?"
                                      rows={3}
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4">
                          <Button onClick={createPersona}>
                            <Users className="h-4 w-4 mr-2" />
                            Create Personas
                          </Button>
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="insights" className="space-y-6">
                    <div className="bg-muted p-6 rounded-lg">
                      <h3 className="text-xl font-bold mb-4">Customer Insights Dashboard</h3>
                      <p className="text-muted-foreground mb-6">
                        Analyze feedback and discover patterns to inform your product decisions
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">Survey Responses</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-3xl font-bold">24</div>
                            <p className="text-sm text-muted-foreground">Total responses collected</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">Interviews Conducted</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-3xl font-bold">8</div>
                            <p className="text-sm text-muted-foreground">User interviews completed</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">Key Insights</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-3xl font-bold">12</div>
                            <p className="text-sm text-muted-foreground">Actionable insights identified</p>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium mb-3">Feature Priority Matrix</h4>
                          <div className="bg-white p-4 rounded-md h-64 flex items-center justify-center">
                            <BarChart4 className="h-8 w-8 text-muted-foreground" />
                            <span className="ml-2 text-muted-foreground">Feature Priority Chart</span>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-3">Pain Point Analysis</h4>
                          <div className="bg-white p-4 rounded-md h-64 flex items-center justify-center">
                            <PieChart className="h-8 w-8 text-muted-foreground" />
                            <span className="ml-2 text-muted-foreground">Pain Point Distribution Chart</span>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-3">Sentiment Trends</h4>
                          <div className="bg-white p-4 rounded-md h-64 flex items-center justify-center">
                            <LineChart className="h-8 w-8 text-muted-foreground" />
                            <span className="ml-2 text-muted-foreground">Sentiment Trend Chart</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-md p-6">
                      <h3 className="text-lg font-medium mb-4">Key Insights</h3>
                      <div className="space-y-4">
                        <div className="bg-white p-4 rounded-md border">
                          <div className="flex items-start">
                            <div className="bg-[#0F7377]/10 p-2 rounded-full mr-3">
                              <Lightbulb className="h-5 w-5 text-[#0F7377]" />
                            </div>
                            <div>
                              <h4 className="font-medium">Users struggle with onboarding process</h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                75% of new users reported confusion during the first-time setup process, particularly
                                around account configuration.
                              </p>
                              <div className="flex items-center mt-2">
                                <Badge variant="outline" className="mr-2">
                                  Onboarding
                                </Badge>
                                <Badge variant="outline" className="mr-2">
                                  UX
                                </Badge>
                                <Badge variant="outline">High Priority</Badge>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-md border">
                          <div className="flex items-start">
                            <div className="bg-[#0F7377]/10 p-2 rounded-full mr-3">
                              <Lightbulb className="h-5 w-5 text-[#0F7377]" />
                            </div>
                            <div>
                              <h4 className="font-medium">Mobile experience needs improvement</h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                Users accessing the platform on mobile devices report significantly lower satisfaction
                                scores (NPS of 2 vs 8 on desktop).
                              </p>
                              <div className="flex items-center mt-2">
                                <Badge variant="outline" className="mr-2">
                                  Mobile
                                </Badge>
                                <Badge variant="outline" className="mr-2">
                                  Responsive Design
                                </Badge>
                                <Badge variant="outline">Medium Priority</Badge>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white p-4 rounded-md border">
                          <div className="flex items-start">
                            <div className="bg-[#0F7377]/10 p-2 rounded-full mr-3">
                              <Lightbulb className="h-5 w-5 text-[#0F7377]" />
                            </div>
                            <div>
                              <h4 className="font-medium">Integration capabilities highly requested</h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                92% of power users expressed interest in integrations with other tools in their
                                workflow, particularly CRM systems.
                              </p>
                              <div className="flex items-center mt-2">
                                <Badge variant="outline" className="mr-2">
                                  Integrations
                                </Badge>
                                <Badge variant="outline" className="mr-2">
                                  API
                                </Badge>
                                <Badge variant="outline">High Priority</Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <Button variant="outline" className="w-full">
                          View All Insights
                        </Button>
                      </div>
                    </div>

                    <div className="border rounded-md p-6">
                      <h3 className="text-lg font-medium mb-4">Recommended Actions</h3>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <div className="bg-[#0F7377]/10 p-1 rounded-full mr-3">
                            <Check className="h-4 w-4 text-[#0F7377]" />
                          </div>
                          <div>
                            <h4 className="font-medium">Simplify the onboarding flow</h4>
                            <p className="text-sm text-muted-foreground">
                              Reduce steps and add better guidance for new users
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="bg-[#0F7377]/10 p-1 rounded-full mr-3">
                            <Check className="h-4 w-4 text-[#0F7377]" />
                          </div>
                          <div>
                            <h4 className="font-medium">Optimize mobile experience</h4>
                            <p className="text-sm text-muted-foreground">
                              Redesign key screens for better mobile usability
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="bg-[#0F7377]/10 p-1 rounded-full mr-3">
                            <Check className="h-4 w-4 text-[#0F7377]" />
                          </div>
                          <div>
                            <h4 className="font-medium">Develop integration capabilities</h4>
                            <p className="text-sm text-muted-foreground">
                              Prioritize CRM integrations based on user feedback
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="bg-[#0F7377]/10 p-1 rounded-full mr-3">
                            <Check className="h-4 w-4 text-[#0F7377]" />
                          </div>
                          <div>
                            <h4 className="font-medium">Conduct follow-up research</h4>
                            <p className="text-sm text-muted-foreground">
                              Schedule additional interviews focused on specific pain points
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <Button className="w-full">Create Action Plan</Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Discovery Tools</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  <div
                    className={`flex items-center p-3 hover:bg-muted/50 transition-colors cursor-pointer ${
                      activeTab === "surveys" ? "bg-muted/50" : ""
                    }`}
                    onClick={() => setActiveTab("surveys")}
                  >
                    <div className="bg-[#0F7377]/10 p-2 rounded-md mr-3">
                      <ClipboardList className="h-5 w-5 text-[#0F7377]" />
                    </div>
                    <div>
                      <h3 className="font-medium">Surveys</h3>
                      <p className="text-sm text-muted-foreground">Create and distribute surveys</p>
                    </div>
                  </div>
                  <div
                    className={`flex items-center p-3 hover:bg-muted/50 transition-colors cursor-pointer ${
                      activeTab === "interviews" ? "bg-muted/50" : ""
                    }`}
                    onClick={() => setActiveTab("interviews")}
                  >
                    <div className="bg-[#0F7377]/10 p-2 rounded-md mr-3">
                      <MessageSquare className="h-5 w-5 text-[#0F7377]" />
                    </div>
                    <div>
                      <h3 className="font-medium">Interviews</h3>
                      <p className="text-sm text-muted-foreground">Conduct user interviews</p>
                    </div>
                  </div>
                  <div
                    className={`flex items-center p-3 hover:bg-muted/50 transition-colors cursor-pointer ${
                      activeTab === "personas" ? "bg-muted/50" : ""
                    }`}
                    onClick={() => setActiveTab("personas")}
                  >
                    <div className="bg-[#0F7377]/10 p-2 rounded-md mr-3">
                      <Users className="h-5 w-5 text-[#0F7377]" />
                    </div>
                    <div>
                      <h3 className="font-medium">Personas</h3>
                      <p className="text-sm text-muted-foreground">Create customer personas</p>
                    </div>
                  </div>
                  <div
                    className={`flex items-center p-3 hover:bg-muted/50 transition-colors cursor-pointer ${
                      activeTab === "insights" ? "bg-muted/50" : ""
                    }`}
                    onClick={() => setActiveTab("insights")}
                  >
                    <div className="bg-[#0F7377]/10 p-2 rounded-md mr-3">
                      <BarChart className="h-5 w-5 text-[#0F7377]" />
                    </div>
                    <div>
                      <h3 className="font-medium">Insights</h3>
                      <p className="text-sm text-muted-foreground">Analyze feedback data</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Templates</CardTitle>
                <CardDescription>Ready-to-use templates to save time</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  <div className="p-3 hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <ClipboardList className="h-4 w-4 mr-2 text-muted-foreground" />
                        <h3 className="font-medium text-sm">Product Feedback Survey</h3>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-3 hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <ClipboardList className="h-4 w-4 mr-2 text-muted-foreground" />
                        <h3 className="font-medium text-sm">Market Research Survey</h3>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-3 hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-2 text-muted-foreground" />
                        <h3 className="font-medium text-sm">Problem Interview Guide</h3>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-3 hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-2 text-muted-foreground" />
                        <h3 className="font-medium text-sm">Solution Interview Guide</h3>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-3 hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                        <h3 className="font-medium text-sm">B2B Customer Persona</h3>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-3 hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                        <h3 className="font-medium text-sm">B2C Customer Persona</h3>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Research Assistant</CardTitle>
                <CardDescription>Get AI-powered help with your research</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Ask about customer research..." className="pl-10" />
                  </div>
                  <Button className="w-full">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate AI Insights
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resources</CardTitle>
                <CardDescription>Helpful guides and articles</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  <Link href="#" className="block p-3 hover:bg-muted/50 transition-colors">
                    <h3 className="font-medium text-sm">How to Ask Better Survey Questions</h3>
                    <p className="text-xs text-muted-foreground mt-1">5 min read</p>
                  </Link>
                  <Link href="#" className="block p-3 hover:bg-muted/50 transition-colors">
                    <h3 className="font-medium text-sm">User Interview Best Practices</h3>
                    <p className="text-xs text-muted-foreground mt-1">7 min read</p>
                  </Link>
                  <Link href="#" className="block p-3 hover:bg-muted/50 transition-colors">
                    <h3 className="font-medium text-sm">Creating Effective Customer Personas</h3>
                    <p className="text-xs text-muted-foreground mt-1">10 min read</p>
                  </Link>
                  <Link href="#" className="block p-3 hover:bg-muted/50 transition-colors">
                    <h3 className="font-medium text-sm">From Insights to Action: Making Data-Driven Decisions</h3>
                    <p className="text-xs text-muted-foreground mt-1">12 min read</p>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </GrowthLabLayout>
  )
}
