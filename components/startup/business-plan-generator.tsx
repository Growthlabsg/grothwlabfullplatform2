"use client"

import { useState } from "react"
import { GrowthLabLayout } from "@/components/layout/growthlab-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { AIAssistant } from "@/components/ui/ai-assistant"
import {
  FileText,
  Save,
  Download,
  Eye,
  Plus,
  Edit,
  Copy,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Brain,
  Lightbulb,
  Target,
  TrendingUp,
  Users,
  DollarSign,
  BarChart3,
  Globe,
  Shield,
  Zap,
} from "lucide-react"
import { aiService } from "@/lib/ai-config"

interface BusinessPlanSection {
  id: string
  title: string
  content: string
  completed: boolean
  aiSuggestions: string[]
}

export function BusinessPlanGenerator() {
  const { toast } = useToast()
  const [activeSection, setActiveSection] = useState(0)
  const [sections, setSections] = useState<BusinessPlanSection[]>([
    {
      id: "executive-summary",
      title: "Executive Summary",
      content: "",
      completed: false,
      aiSuggestions: [
        "Create a compelling executive summary that captures the essence of your business",
        "Highlight the key value proposition and market opportunity",
        "Include key financial projections and funding requirements"
      ]
    },
    {
      id: "company-description",
      title: "Company Description",
      content: "",
      completed: false,
      aiSuggestions: [
        "Describe your company's mission, vision, and values",
        "Explain your business model and revenue streams",
        "Detail your competitive advantages and unique positioning"
      ]
    },
    {
      id: "market-analysis",
      title: "Market Analysis",
      content: "",
      completed: false,
      aiSuggestions: [
        "Analyze your target market size and demographics",
        "Identify market trends and growth opportunities",
        "Research competitive landscape and market positioning"
      ]
    },
    {
      id: "organization-management",
      title: "Organization & Management",
      content: "",
      completed: false,
      aiSuggestions: [
        "Outline your organizational structure and key roles",
        "Highlight team expertise and relevant experience",
        "Describe management philosophy and company culture"
      ]
    },
    {
      id: "service-product-line",
      title: "Service/Product Line",
      content: "",
      completed: false,
      aiSuggestions: [
        "Detail your product/service features and benefits",
        "Explain your development roadmap and innovation plans",
        "Describe your intellectual property and competitive moats"
      ]
    },
    {
      id: "marketing-sales",
      title: "Marketing & Sales Strategy",
      content: "",
      completed: false,
      aiSuggestions: [
        "Define your marketing channels and customer acquisition strategy",
        "Outline your sales process and revenue model",
        "Detail your pricing strategy and market positioning"
      ]
    },
    {
      id: "funding-requirements",
      title: "Funding Requirements",
      content: "",
      completed: false,
      aiSuggestions: [
        "Specify funding amount and use of funds breakdown",
        "Detail financial projections and key assumptions",
        "Explain funding timeline and investor expectations"
      ]
    },
    {
      id: "financial-projections",
      title: "Financial Projections",
      content: "",
      completed: false,
      aiSuggestions: [
        "Create detailed revenue and expense projections",
        "Include cash flow analysis and break-even analysis",
        "Provide key financial metrics and growth indicators"
      ]
    }
  ])

  const updateSection = (index: number, field: string, value: any) => {
    const newSections = [...sections]
    newSections[index] = { ...newSections[index], [field]: value }
    setSections(newSections)
  }

  const calculateCompletion = () => {
    const completedSections = sections.filter(section => section.completed).length
    return Math.round((completedSections / sections.length) * 100)
  }

  const handleAIGenerate = async (sectionIndex: number, prompt: string) => {
    const section = sections[sectionIndex]
    
    try {
      const systemPrompt = `You are an expert business plan consultant. Help create comprehensive content for the "${section.title}" section of a business plan. Focus on providing detailed, professional content that would be suitable for investors and stakeholders. Include specific details, data points, and strategic insights.`
      
      const aiResponse = await aiService.generateContent(
        `Create content for the "${section.title}" section of a business plan. The user's request is: "${prompt}". 
        
        Please provide comprehensive, professional content that covers all key aspects of this section. 
        Include specific details, strategic insights, and actionable information that would be valuable for investors.`,
        undefined,
        {
          maxTokens: 1500,
          temperature: 0.7,
          systemPrompt
        }
      )
      
      updateSection(sectionIndex, 'content', aiResponse)
      updateSection(sectionIndex, 'completed', true)
      
      toast({
        title: "AI Content Generated",
        description: `${section.title} content has been generated successfully.`,
      })
    } catch (error) {
      toast({
        title: "AI Error",
        description: error instanceof Error ? error.message : "Failed to generate content",
        variant: "destructive",
      })
    }
  }

  const handleSave = () => {
    toast({
      title: "Business Plan Saved",
      description: "Your business plan has been saved successfully.",
    })
  }

  const handleDownload = () => {
    toast({
      title: "Business Plan Downloaded",
      description: "Your business plan has been exported as PDF.",
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
              <h1 className="text-3xl font-bold mb-2">Business Plan Generator</h1>
              <p className="text-lg text-gray-600">
                Create comprehensive business plans with AI assistance
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
                  <p className="text-sm text-gray-600">Sections</p>
                  <p className="text-2xl font-bold">{sections.length}</p>
                </div>
                <FileText className="h-8 w-8 text-[#0F7377]" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">AI Enhanced</p>
                  <p className="text-2xl font-bold">Ready</p>
                </div>
                <Brain className="h-8 w-8 text-[#0F7377]" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Template</p>
                  <p className="text-2xl font-bold">Standard</p>
                </div>
                <FileText className="h-8 w-8 text-[#0F7377]" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Section Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Business Plan Sections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {sections.map((section, index) => (
                    <div
                      key={section.id}
                      className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                        activeSection === index
                          ? "border-[#0F7377] bg-[#0F7377]/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setActiveSection(index)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{section.title}</p>
                          <p className="text-xs text-gray-500">
                            {section.completed ? "Completed" : "In Progress"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {section.completed && <CheckCircle className="h-3 w-3 text-green-500" />}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Section Editor */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Section {activeSection + 1}: {sections[activeSection]?.title}</CardTitle>
                    <CardDescription>
                      {sections[activeSection]?.completed ? "Section completed" : "Complete this section to continue"}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <AIAssistant
                      title={`AI Assist - ${sections[activeSection]?.title}`}
                      placeholder={`Describe what you want to include in the ${sections[activeSection]?.title} section...`}
                      suggestions={sections[activeSection]?.aiSuggestions || []}
                      onResponse={(response) => {
                        updateSection(activeSection, 'content', response)
                        updateSection(activeSection, 'completed', true)
                      }}
                      variant="compact"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Section Content</Label>
                  <Textarea
                    value={sections[activeSection]?.content || ""}
                    onChange={(e) => updateSection(activeSection, "content", e.target.value)}
                    placeholder={`Enter content for the ${sections[activeSection]?.title} section...`}
                    className="min-h-[400px]"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => updateSection(activeSection, "completed", !sections[activeSection]?.completed)}
                    variant={sections[activeSection]?.completed ? "default" : "outline"}
                    className={sections[activeSection]?.completed ? "bg-green-600 hover:bg-green-700" : "border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377]/10"}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    {sections[activeSection]?.completed ? "Completed" : "Mark Complete"}
                  </Button>
                </div>

                {/* AI Suggestions */}
                <div>
                  <Label className="flex items-center gap-2 mb-3">
                    <Lightbulb className="h-4 w-4" />
                    AI Suggestions for {sections[activeSection]?.title}
                  </Label>
                  <div className="grid grid-cols-1 gap-2">
                    {sections[activeSection]?.aiSuggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="w-full justify-start border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377]/10"
                        onClick={() => handleAIGenerate(activeSection, suggestion)}
                      >
                        <Sparkles className="h-4 w-4 mr-2" />
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </GrowthLabLayout>
  )
} 