"use client"

import { useState } from "react"
import { GrowthLabLayout } from "@/components/layout/growthlab-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Save,
  Download,
  FileText,
  ImageIcon,
  Plus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Edit,
  Copy,
  Eye,
  Layout,
  Grid,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Sparkles,
  Lightbulb,
  Wand2,
  Brain,
  MessageSquare,
  Zap,
  TrendingUp,
  Package,
  Users,
  BarChart3,
  DollarSign,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/components/ui/use-toast"
import { aiService } from "@/lib/ai-config"

export function PitchDeckBuilder() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("editor")
  const [currentSlide, setCurrentSlide] = useState(0)
  const [completionPercentage, setCompletionPercentage] = useState(35)
  const [template, setTemplate] = useState("modern")
  const [accentColor, setAccentColor] = useState("#0F7377")
  const [fontFamily, setFontFamily] = useState("inter")
  const [showAIDialog, setShowAIDialog] = useState(false)
  const [aiPrompt, setAiPrompt] = useState("")
  const [aiLoading, setAiLoading] = useState(false)
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([])

  // Mock slides data
  const [slides, setSlides] = useState([
    {
      id: "1",
      type: "cover",
      title: "TechNova",
      subtitle: "Revolutionizing Healthcare with AI",
      content: "",
      image: "/abstract-geometric-shapes.png",
      completed: true,
    },
    {
      id: "2",
      type: "problem",
      title: "The Problem",
      subtitle: "Healthcare Diagnosis Delays",
      content:
        "Medical professionals face significant challenges in diagnosing complex conditions quickly and accurately, leading to treatment delays and increased healthcare costs.",
      image: "/rising-tide-startups.png",
      completed: true,
    },
    {
      id: "3",
      type: "solution",
      title: "Our Solution",
      subtitle: "AI-Powered Diagnostic Platform",
      content:
        "TechNova's platform uses advanced machine learning algorithms to analyze medical data and provide actionable insights for healthcare professionals, reducing diagnosis time by 60%.",
      image: "/collaborative-growth.png",
      completed: true,
    },
    {
      id: "4",
      type: "market",
      title: "Market Opportunity",
      subtitle: "$50B Global Healthcare AI Market",
      content:
        "The healthcare AI market is projected to grow at 40% CAGR over the next 5 years, with diagnostic solutions representing the largest segment.",
      image: "",
      completed: false,
    },
    {
      id: "5",
      type: "product",
      title: "Product",
      subtitle: "Comprehensive AI Diagnostic Suite",
      content: "",
      image: "",
      completed: false,
    },
    {
      id: "6",
      type: "traction",
      title: "Traction",
      subtitle: "Early Validation & Partnerships",
      content: "",
      image: "",
      completed: false,
    },
    {
      id: "7",
      type: "business-model",
      title: "Business Model",
      subtitle: "SaaS + Enterprise Licensing",
      content: "",
      image: "",
      completed: false,
    },
    {
      id: "8",
      type: "team",
      title: "Team",
      subtitle: "Experienced Healthcare & AI Experts",
      content: "",
      image: "",
      completed: false,
    },
    {
      id: "9",
      type: "financials",
      title: "Financials",
      subtitle: "Projected Revenue & Growth",
      content: "",
      image: "",
      completed: false,
    },
    {
      id: "10",
      type: "funding",
      title: "Funding Ask",
      subtitle: "Raising $2.5M Seed Round",
      content: "",
      image: "",
      completed: false,
    },
  ])

  const addSlide = () => {
    const newSlide = {
      id: Date.now().toString(),
      type: "custom",
      title: "New Slide",
      subtitle: "",
      content: "",
      image: "",
      completed: false,
    }
    setSlides([...slides, newSlide])
    setCurrentSlide(slides.length)
  }

  const deleteSlide = (index: number) => {
    const newSlides = slides.filter((_, i) => i !== index)
    setSlides(newSlides)
    if (currentSlide >= newSlides.length) {
      setCurrentSlide(Math.max(0, newSlides.length - 1))
    }
  }

  const duplicateSlide = (index: number) => {
    const slideToDuplicate = slides[index]
    const newSlide = {
      ...slideToDuplicate,
      id: Date.now().toString(),
      title: `${slideToDuplicate.title} (Copy)`,
    }
    const newSlides = [...slides]
    newSlides.splice(index + 1, 0, newSlide)
    setSlides(newSlides)
  }

  const updateSlide = (index: number, field: string, value: any) => {
    const newSlides = [...slides]
    newSlides[index] = { ...newSlides[index], [field]: value }
    setSlides(newSlides)
  }

  const getSlideTypeIcon = (type: string) => {
    const icons: { [key: string]: any } = {
      cover: FileText,
      problem: AlertCircle,
      solution: Lightbulb,
      market: TrendingUp,
      product: Package,
      traction: CheckCircle,
      "business-model": DollarSign,
      team: Users,
      financials: BarChart3,
      funding: DollarSign,
      custom: FileText,
    }
    return icons[type] || FileText
  }

  // AI Assistance Functions
  const generateAIContent = async (slideType: string, prompt: string) => {
    setAiLoading(true)
    
    try {
      // Create a context-aware system prompt based on slide type
      const systemPrompts: { [key: string]: string } = {
        problem: "You are an expert pitch deck consultant. Help create compelling problem statements that clearly articulate the pain points and market gaps. Focus on quantifying the problem and explaining why existing solutions are inadequate.",
        solution: "You are an expert pitch deck consultant. Help create powerful solution descriptions that clearly explain how the solution works, its unique approach, and the key benefits it delivers. Focus on differentiation and value proposition.",
        market: "You are an expert pitch deck consultant. Help create comprehensive market analysis that includes market size, growth drivers, trends, and opportunities. Use specific data and projections when possible.",
        traction: "You are an expert pitch deck consultant. Help create compelling traction slides that highlight key metrics, achievements, partnerships, and customer validation. Focus on concrete evidence of progress.",
        financials: "You are an expert pitch deck consultant. Help create financial projections and business model explanations that are realistic and compelling. Include revenue streams, growth projections, and key assumptions.",
        product: "You are an expert pitch deck consultant. Help create product descriptions that highlight key features, benefits, and competitive advantages. Focus on user experience and technical capabilities.",
        team: "You are an expert pitch deck consultant. Help create team slides that highlight relevant experience, achievements, and why the team is uniquely qualified to execute the vision.",
        funding: "You are an expert pitch deck consultant. Help create funding ask slides that clearly state the amount needed, how it will be used, and the expected outcomes. Include use of funds breakdown.",
        "business-model": "You are an expert pitch deck consultant. Help create business model explanations that clearly show how the company makes money, pricing strategy, and revenue streams.",
        custom: "You are an expert pitch deck consultant. Help create compelling slide content that engages investors and clearly communicates the key message."
      }

      const systemPrompt = systemPrompts[slideType] || systemPrompts.custom
      
      const aiResponse = await aiService.generateContent(
        `Create content for a ${slideType} slide in a pitch deck. The user's request is: "${prompt}". 
        
        Please provide a comprehensive, professional response that would be suitable for an investor pitch deck. 
        Include specific details, data points, and compelling language that would resonate with investors.`,
        undefined, // Use default model
        {
          maxTokens: 1000,
          temperature: 0.7,
          systemPrompt
        }
      )
      
      updateSlide(currentSlide, 'content', aiResponse)
      setAiLoading(false)
      toast({
        title: "AI Content Generated",
        description: "Your slide content has been enhanced with AI assistance.",
      })
    } catch (error) {
      setAiLoading(false)
      toast({
        title: "AI Error",
        description: error instanceof Error ? error.message : "Failed to generate AI content",
        variant: "destructive",
      })
    }
  }

  const getAISuggestions = (slideType: string) => {
    const suggestions: { [key: string]: string[] } = {
      problem: [
        "Describe the pain points your target customers face",
        "Quantify the cost of the problem",
        "Explain why existing solutions are inadequate"
      ],
      solution: [
        "Explain how your solution works",
        "Highlight your unique approach",
        "Describe the key benefits and outcomes"
      ],
      market: [
        "Define your target market size",
        "Explain market growth trends",
        "Identify key market drivers"
      ],
      traction: [
        "Share key metrics and milestones",
        "Highlight customer testimonials",
        "Show partnerships and achievements"
      ],
      financials: [
        "Outline your revenue model",
        "Show projected growth",
        "Explain key financial assumptions"
      ]
    }
    return suggestions[slideType] || ["Add compelling content to this slide"]
  }

  const handleAIAssist = () => {
    setShowAIDialog(true)
    setAiSuggestions(getAISuggestions(slides[currentSlide]?.type || 'custom'))
  }

  const applyAISuggestion = (suggestion: string) => {
    setAiPrompt(suggestion)
    generateAIContent(slides[currentSlide]?.type || 'custom', suggestion)
    setShowAIDialog(false)
  }

  const calculateCompletion = () => {
    const completedSlides = slides.filter(slide => slide.completed).length
    return Math.round((completedSlides / slides.length) * 100)
  }

  const handleSave = () => {
    toast({
      title: "Pitch Deck Saved",
      description: "Your pitch deck has been saved successfully.",
    })
  }

  const handleDownload = () => {
    toast({
      title: "Pitch Deck Downloaded",
      description: "Your pitch deck has been exported as PDF.",
    })
  }

  const handlePreview = () => {
    toast({
      title: "Preview Mode",
      description: "Entering full-screen preview mode.",
    })
  }

  return (
    <GrowthLabLayout>
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Pitch Deck Builder</h1>
              <p className="text-lg text-gray-600">
                Create professional pitch decks that impress investors and communicate your vision effectively
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave} variant="outline" className="border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377]/10">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button onClick={handleDownload} className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
              <Button onClick={handlePreview} variant="outline" className="border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377]/10">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completion</p>
                  <p className="text-2xl font-bold">{calculateCompletion()}%</p>
                </div>
                <CheckCircle className="h-8 w-8 text-[#0F7377]" />
              </div>
              <Progress value={calculateCompletion()} className="mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Slides</p>
                  <p className="text-2xl font-bold">{slides.length}</p>
                </div>
                <FileText className="h-8 w-8 text-[#0F7377]" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Template</p>
                  <p className="text-2xl font-bold capitalize">{template}</p>
                </div>
                <Layout className="h-8 w-8 text-[#0F7377]" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">AI Assistant</p>
                  <p className="text-2xl font-bold">Ready</p>
                </div>
                <Sparkles className="h-8 w-8 text-[#0F7377]" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Slide Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Slides</CardTitle>
                  <Button onClick={addSlide} size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Slide
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {slides.map((slide, index) => {
                    const Icon = getSlideTypeIcon(slide.type)
                    return (
                      <div
                        key={slide.id}
                        className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                          currentSlide === index
                            ? "border-[#0F7377] bg-[#0F7377]/5"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setCurrentSlide(index)}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="h-4 w-4 text-[#0F7377]" />
                          <div className="flex-1">
                            <p className="font-medium text-sm">{slide.title}</p>
                            <p className="text-xs text-gray-500">{slide.subtitle}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {slide.completed && <CheckCircle className="h-3 w-3 text-green-500" />}
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0 text-gray-400 hover:text-[#0F7377]"
                            onClick={(e) => {
                              e.stopPropagation()
                              duplicateSlide(index)
                            }}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteSlide(index)
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Slide Editor */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Slide {currentSlide + 1}: {slides[currentSlide]?.title}</CardTitle>
                    <CardDescription>
                      {slides[currentSlide]?.subtitle || "Add a subtitle to this slide"}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleAIAssist}
                      className="bg-[#0F7377] hover:bg-[#0F7377]/90"
                      disabled={aiLoading}
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      {aiLoading ? "Generating..." : "AI Assist"}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Slide Title</Label>
                    <Input
                      value={slides[currentSlide]?.title || ""}
                      onChange={(e) => updateSlide(currentSlide, "title", e.target.value)}
                      placeholder="Enter slide title"
                    />
                  </div>
                  <div>
                    <Label>Slide Subtitle</Label>
                    <Input
                      value={slides[currentSlide]?.subtitle || ""}
                      onChange={(e) => updateSlide(currentSlide, "subtitle", e.target.value)}
                      placeholder="Enter slide subtitle"
                    />
                  </div>
                </div>

                <div>
                  <Label>Content</Label>
                  <Textarea
                    value={slides[currentSlide]?.content || ""}
                    onChange={(e) => updateSlide(currentSlide, "content", e.target.value)}
                    placeholder={
                      slides[currentSlide]?.type === "problem"
                        ? "Describe the problem your solution addresses..."
                        : slides[currentSlide]?.type === "solution"
                        ? "Explain your solution and how it addresses the problem. Highlight your unique approach."
                        : "Add content to this slide to explain your key points."
                    }
                    className="min-h-[200px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Slide Type</Label>
                    <Select
                      value={slides[currentSlide]?.type || "custom"}
                      onValueChange={(value) => updateSlide(currentSlide, "type", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cover">Cover</SelectItem>
                        <SelectItem value="problem">Problem</SelectItem>
                        <SelectItem value="solution">Solution</SelectItem>
                        <SelectItem value="market">Market</SelectItem>
                        <SelectItem value="product">Product</SelectItem>
                        <SelectItem value="traction">Traction</SelectItem>
                        <SelectItem value="business-model">Business Model</SelectItem>
                        <SelectItem value="team">Team</SelectItem>
                        <SelectItem value="financials">Financials</SelectItem>
                        <SelectItem value="funding">Funding</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Background Image</Label>
                    <Input
                      value={slides[currentSlide]?.image || ""}
                      onChange={(e) => updateSlide(currentSlide, "image", e.target.value)}
                      placeholder="Enter image URL"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => updateSlide(currentSlide, "completed", !slides[currentSlide]?.completed)}
                    variant={slides[currentSlide]?.completed ? "default" : "outline"}
                    className={slides[currentSlide]?.completed ? "bg-green-600 hover:bg-green-700" : "border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377]/10"}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    {slides[currentSlide]?.completed ? "Completed" : "Mark Complete"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AI Assistance Dialog */}
        {showAIDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-2xl mx-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-[#0F7377]" />
                  AI Pitch Deck Assistant
                </CardTitle>
                <CardDescription>
                  Get AI-powered suggestions and content for your pitch deck slides
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>What would you like AI to help you with?</Label>
                  <Textarea
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="Describe what you want to include in this slide..."
                    className="min-h-[100px]"
                  />
                </div>

                <div>
                  <Label className="flex items-center gap-2 mb-2">
                    <Lightbulb className="h-4 w-4" />
                    AI Suggestions
                  </Label>
                  <div className="space-y-2">
                    {aiSuggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="w-full justify-start border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377]/10"
                        onClick={() => applyAISuggestion(suggestion)}
                      >
                        <Wand2 className="h-4 w-4 mr-2" />
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={() => setShowAIDialog(false)} variant="outline" className="border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377]/10">
                    Cancel
                  </Button>
                  <Button 
                    onClick={() => {
                      if (aiPrompt.trim()) {
                        generateAIContent(slides[currentSlide]?.type || 'custom', aiPrompt)
                        setShowAIDialog(false)
                      }
                    }} 
                    className="bg-[#0F7377] hover:bg-[#0F7377]/90"
                    disabled={!aiPrompt.trim() || aiLoading}
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    {aiLoading ? "Generating..." : "Generate Content"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </GrowthLabLayout>
  )
}
