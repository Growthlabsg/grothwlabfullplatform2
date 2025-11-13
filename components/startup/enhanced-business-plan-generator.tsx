"use client"

import { useState, useEffect } from "react"
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
  Building2,
  Briefcase,
  ChartBar,
  PieChart,
  MapPin,
  Calendar,
  Award,
  Star,
  ArrowUpRight,
  Download as DownloadIcon,
  FileDown,
  Printer,
  Share2,
  Settings,
  RefreshCw,
  Play,
  Pause,
  Square,
} from "lucide-react"
import { aiService } from "@/lib/ai-config"

interface BusinessPlanSection {
  id: string
  title: string
  content: string
  completed: boolean
  aiSuggestions: string[]
  template?: string
  customFields?: { [key: string]: any }
}

interface BusinessModel {
  id: string
  name: string
  description: string
  icon: any
  sections: string[]
  aiPrompts: { [key: string]: string }
}

interface BusinessPlanData {
  companyName: string
  industry: string
  businessModel: string
  targetMarket: string
  fundingAmount: string
  timeline: string
  teamSize: string
  revenueModel: string
  competitiveAdvantage: string
  marketSize: string
  growthStrategy: string
}

export function EnhancedBusinessPlanGenerator() {
  const { toast } = useToast()
  const [activeSection, setActiveSection] = useState(0)
  const [activeTab, setActiveTab] = useState("planning")
  const [planData, setPlanData] = useState<BusinessPlanData>({
    companyName: "",
    industry: "",
    businessModel: "",
    targetMarket: "",
    fundingAmount: "",
    timeline: "",
    teamSize: "",
    revenueModel: "",
    competitiveAdvantage: "",
    marketSize: "",
    growthStrategy: "",
  })
  const [selectedTemplate, setSelectedTemplate] = useState("standard")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)

  const businessModels: BusinessModel[] = [
    {
      id: "saas",
      name: "SaaS/Software",
      description: "Software-as-a-Service with recurring revenue",
      icon: Building2,
      sections: ["executive-summary", "market-analysis", "product", "business-model", "financial-projections"],
      aiPrompts: {
        "executive-summary": "Create an executive summary for a SaaS company focusing on recurring revenue, customer acquisition costs, and lifetime value.",
        "market-analysis": "Analyze the SaaS market with focus on subscription models, customer retention, and market penetration strategies.",
        "business-model": "Detail the SaaS business model including pricing tiers, customer segments, and revenue streams."
      }
    },
    {
      id: "ecommerce",
      name: "E-commerce",
      description: "Online retail with direct-to-consumer sales",
      icon: ShoppingCart,
      sections: ["executive-summary", "market-analysis", "product", "marketing-strategy", "financial-projections"],
      aiPrompts: {
        "executive-summary": "Create an executive summary for an e-commerce business focusing on customer acquisition, conversion rates, and logistics.",
        "market-analysis": "Analyze the e-commerce market with focus on online retail trends, customer behavior, and competitive landscape.",
        "marketing-strategy": "Detail the e-commerce marketing strategy including digital marketing, social media, and customer retention."
      }
    },
    {
      id: "marketplace",
      name: "Marketplace",
      description: "Platform connecting buyers and sellers",
      icon: Globe,
      sections: ["executive-summary", "market-analysis", "platform", "network-effects", "financial-projections"],
      aiPrompts: {
        "executive-summary": "Create an executive summary for a marketplace platform focusing on network effects, user acquisition, and transaction volume.",
        "market-analysis": "Analyze the marketplace market with focus on two-sided networks, user engagement, and monetization strategies.",
        "network-effects": "Detail the network effects strategy including user acquisition, retention, and platform growth."
      }
    },
    {
      id: "consulting",
      name: "Consulting Services",
      description: "Professional services and expertise",
      icon: Briefcase,
      sections: ["executive-summary", "market-analysis", "services", "team", "financial-projections"],
      aiPrompts: {
        "executive-summary": "Create an executive summary for a consulting business focusing on expertise, client relationships, and service delivery.",
        "market-analysis": "Analyze the consulting market with focus on industry expertise, client acquisition, and service differentiation.",
        "team": "Detail the consulting team structure including expertise areas, client relationships, and service delivery capabilities."
      }
    },
    {
      id: "manufacturing",
      name: "Manufacturing",
      description: "Physical product manufacturing and distribution",
      icon: Factory,
      sections: ["executive-summary", "market-analysis", "product", "operations", "financial-projections"],
      aiPrompts: {
        "executive-summary": "Create an executive summary for a manufacturing business focusing on production capacity, supply chain, and quality control.",
        "market-analysis": "Analyze the manufacturing market with focus on production efficiency, supply chain management, and market demand.",
        "operations": "Detail the manufacturing operations including production processes, quality control, and supply chain management."
      }
    },
    {
      id: "healthcare",
      name: "Healthcare",
      description: "Healthcare services and medical technology",
      icon: Heart,
      sections: ["executive-summary", "market-analysis", "product", "regulatory", "financial-projections"],
      aiPrompts: {
        "executive-summary": "Create an executive summary for a healthcare business focusing on patient outcomes, regulatory compliance, and market access.",
        "market-analysis": "Analyze the healthcare market with focus on patient needs, regulatory requirements, and market access strategies.",
        "regulatory": "Detail the regulatory compliance strategy including FDA requirements, clinical trials, and market approval processes."
      }
    }
  ]

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
      id: "competitive-analysis",
      title: "Competitive Landscape",
      content: "",
      completed: false,
      aiSuggestions: [
        "Identify direct and indirect competitors",
        "Analyze competitive advantages and market positioning",
        "Detail your competitive strategy and differentiation"
      ]
    },
    {
      id: "product-service",
      title: "Product/Service Line",
      content: "",
      completed: false,
      aiSuggestions: [
        "Detail your product/service features and benefits",
        "Explain your development roadmap and innovation plans",
        "Describe your intellectual property and competitive moats"
      ]
    },
    {
      id: "marketing-strategy",
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
      id: "operations",
      title: "Operations Plan",
      content: "",
      completed: false,
      aiSuggestions: [
        "Detail your operational processes and workflows",
        "Explain your supply chain and vendor relationships",
        "Describe your quality control and efficiency measures"
      ]
    },
    {
      id: "team",
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
      id: "financial-projections",
      title: "Financial Projections",
      content: "",
      completed: false,
      aiSuggestions: [
        "Create detailed revenue and expense projections",
        "Include cash flow analysis and break-even analysis",
        "Provide key financial metrics and growth indicators"
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
      id: "risk-analysis",
      title: "Risk Analysis",
      content: "",
      completed: false,
      aiSuggestions: [
        "Identify key business risks and mitigation strategies",
        "Analyze market risks and competitive threats",
        "Detail contingency plans and risk management"
      ]
    },
    {
      id: "appendix",
      title: "Appendix",
      content: "",
      completed: false,
      aiSuggestions: [
        "Include supporting documents and detailed financials",
        "Add market research data and customer testimonials",
        "Provide technical specifications and legal documents"
      ]
    }
  ])

  const updateSection = (index: number, field: string, value: any) => {
    const newSections = [...sections]
    newSections[index] = { ...newSections[index], [field]: value }
    setSections(newSections)
  }

  const updatePlanData = (field: string, value: string) => {
    setPlanData(prev => ({ ...prev, [field]: value }))
  }

  const calculateCompletion = () => {
    const completedSections = sections.filter(section => section.completed).length
    return Math.round((completedSections / sections.length) * 100)
  }

  const generateComprehensivePlan = async () => {
    if (!planData.companyName || !planData.industry || !planData.businessModel) {
      toast({
        title: "Missing Information",
        description: "Please fill in the basic company information first.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    setGenerationProgress(0)

    try {
      // Generate each section with AI
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i]
        const businessModel = businessModels.find(bm => bm.id === planData.businessModel)
        
        const systemPrompt = `You are an expert business plan consultant specializing in ${planData.industry} industry. 
        Create comprehensive, professional content for the "${section.title}" section of a business plan for ${planData.companyName}.
        
        Company Details:
        - Industry: ${planData.industry}
        - Business Model: ${planData.businessModel}
        - Target Market: ${planData.targetMarket}
        - Funding Amount: ${planData.fundingAmount}
        - Revenue Model: ${planData.revenueModel}
        - Competitive Advantage: ${planData.competitiveAdvantage}
        - Market Size: ${planData.marketSize}
        - Growth Strategy: ${planData.growthStrategy}
        
        Focus on providing detailed, actionable content that would be suitable for investors and stakeholders. 
        Include specific data points, strategic insights, and professional analysis.`
        
        const aiResponse = await aiService.generateContent(
          `Create comprehensive content for the "${section.title}" section of a business plan for ${planData.companyName} in the ${planData.industry} industry.`,
          undefined,
          {
            maxTokens: 2000,
            temperature: 0.7,
            systemPrompt
          }
        )
        
        updateSection(i, 'content', aiResponse)
        updateSection(i, 'completed', true)
        setGenerationProgress(((i + 1) / sections.length) * 100)
        
        // Small delay to show progress
        await new Promise(resolve => setTimeout(resolve, 500))
      }
      
      setIsGenerating(false)
      toast({
        title: "Business Plan Generated",
        description: "Your comprehensive business plan has been generated successfully!",
      })
    } catch (error) {
      setIsGenerating(false)
      toast({
        title: "Generation Error",
        description: error instanceof Error ? error.message : "Failed to generate business plan",
        variant: "destructive",
      })
    }
  }

  const handleAIGenerate = async (sectionIndex: number, prompt: string) => {
    const section = sections[sectionIndex]
    
    try {
      const systemPrompt = `You are an expert business plan consultant. Help create comprehensive content for the "${section.title}" section of a business plan for ${planData.companyName || 'a company'} in the ${planData.industry || 'their industry'}. Focus on providing detailed, professional content that would be suitable for investors and stakeholders. Include specific details, strategic insights, and actionable information.`
      
      const aiResponse = await aiService.generateContent(
        `Create content for the "${section.title}" section of a business plan. The user's request is: "${prompt}". 
        
        Company Context:
        - Company: ${planData.companyName}
        - Industry: ${planData.industry}
        - Business Model: ${planData.businessModel}
        - Target Market: ${planData.targetMarket}
        
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

  const handleExport = (format: 'pdf' | 'docx' | 'html') => {
    toast({
      title: "Business Plan Exported",
      description: `Your business plan has been exported as ${format.toUpperCase()}.`,
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
              <h1 className="text-3xl font-bold mb-2">Advanced Business Plan Generator</h1>
              <p className="text-lg text-gray-600">
                Create comprehensive, AI-powered business plans tailored to your industry and business model
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave} variant="outline" className="border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377]/10">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button onClick={() => handleExport('pdf')} className="bg-[#0F7377] hover:bg-[#0F7377]/90">
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
                  <p className="text-2xl font-bold capitalize">{selectedTemplate}</p>
                </div>
                <FileText className="h-8 w-8 text-[#0F7377]" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="planning">Business Planning</TabsTrigger>
            <TabsTrigger value="sections">Plan Sections</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="export">Export</TabsTrigger>
          </TabsList>

          {/* Business Planning */}
          <TabsContent value="planning" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Company Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-[#0F7377]" />
                    Company Information
                  </CardTitle>
                  <CardDescription>Enter your basic company details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Company Name</Label>
                    <Input
                      value={planData.companyName}
                      onChange={(e) => updatePlanData('companyName', e.target.value)}
                      placeholder="Enter your company name"
                    />
                  </div>
                  <div>
                    <Label>Industry</Label>
                    <Select value={planData.industry} onValueChange={(value) => updatePlanData('industry', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="consulting">Consulting</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Business Model</Label>
                    <Select value={planData.businessModel} onValueChange={(value) => updatePlanData('businessModel', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select business model" />
                      </SelectTrigger>
                      <SelectContent>
                        {businessModels.map((model) => (
                          <SelectItem key={model.id} value={model.id}>
                            {model.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Target Market</Label>
                    <Textarea
                      value={planData.targetMarket}
                      onChange={(e) => updatePlanData('targetMarket', e.target.value)}
                      placeholder="Describe your target market"
                      className="min-h-[80px]"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Financial Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-[#0F7377]" />
                    Financial Information
                  </CardTitle>
                  <CardDescription>Enter your financial details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Funding Amount</Label>
                    <Input
                      value={planData.fundingAmount}
                      onChange={(e) => updatePlanData('fundingAmount', e.target.value)}
                      placeholder="e.g., $500,000"
                    />
                  </div>
                  <div>
                    <Label>Revenue Model</Label>
                    <Input
                      value={planData.revenueModel}
                      onChange={(e) => updatePlanData('revenueModel', e.target.value)}
                      placeholder="e.g., Subscription, Transaction fees"
                    />
                  </div>
                  <div>
                    <Label>Market Size</Label>
                    <Input
                      value={planData.marketSize}
                      onChange={(e) => updatePlanData('marketSize', e.target.value)}
                      placeholder="e.g., $10B TAM"
                    />
                  </div>
                  <div>
                    <Label>Growth Strategy</Label>
                    <Textarea
                      value={planData.growthStrategy}
                      onChange={(e) => updatePlanData('growthStrategy', e.target.value)}
                      placeholder="Describe your growth strategy"
                      className="min-h-[80px]"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* AI Generation */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-[#0F7377]" />
                    AI-Powered Generation
                  </CardTitle>
                  <CardDescription>Generate your complete business plan with AI</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isGenerating && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Generating Business Plan...</span>
                        <span className="text-sm text-gray-500">{Math.round(generationProgress)}%</span>
                      </div>
                      <Progress value={generationProgress} className="h-2" />
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <Button
                      onClick={generateComprehensivePlan}
                      disabled={isGenerating || !planData.companyName}
                      className="bg-[#0F7377] hover:bg-[#0F7377]/90 flex-1"
                    >
                      {isGenerating ? (
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Sparkles className="h-4 w-4 mr-2" />
                      )}
                      {isGenerating ? "Generating..." : "Generate Complete Plan"}
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">What's Included:</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Executive Summary</li>
                        <li>• Market Analysis</li>
                        <li>• Financial Projections</li>
                        <li>• Competitive Analysis</li>
                        <li>• Marketing Strategy</li>
                        <li>• Risk Assessment</li>
                      </ul>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">AI Features:</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Industry-specific content</li>
                        <li>• Market data integration</li>
                        <li>• Financial modeling</li>
                        <li>• Competitive insights</li>
                        <li>• Professional formatting</li>
                        <li>• Investor-ready content</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Plan Sections */}
          <TabsContent value="sections" className="space-y-6">
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
          </TabsContent>

          {/* Templates */}
          <TabsContent value="templates" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {businessModels.map((model) => (
                <Card key={model.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <model.icon className="h-8 w-8 text-[#0F7377]" />
                      <div>
                        <CardTitle className="text-lg">{model.name}</CardTitle>
                        <CardDescription>{model.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm font-medium">Key Sections:</Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {model.sections.slice(0, 3).map((section) => (
                            <Badge key={section} variant="outline" className="text-xs">
                              {section.replace('-', ' ')}
                            </Badge>
                          ))}
                          {model.sections.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{model.sections.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button
                        onClick={() => {
                          setPlanData(prev => ({ ...prev, businessModel: model.id }))
                          toast({
                            title: "Template Selected",
                            description: `${model.name} template has been selected.`,
                          })
                        }}
                        className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90"
                        size="sm"
                      >
                        Use Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Export */}
          <TabsContent value="export" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DownloadIcon className="h-5 w-5 text-[#0F7377]" />
                    Export Options
                  </CardTitle>
                  <CardDescription>Export your business plan in various formats</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    <Button
                      onClick={() => handleExport('pdf')}
                      className="w-full justify-start bg-[#0F7377] hover:bg-[#0F7377]/90"
                    >
                      <FileDown className="h-4 w-4 mr-2" />
                      Export as PDF
                    </Button>
                    <Button
                      onClick={() => handleExport('docx')}
                      variant="outline"
                      className="w-full justify-start border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377]/10"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Export as Word Document
                    </Button>
                    <Button
                      onClick={() => handleExport('html')}
                      variant="outline"
                      className="w-full justify-start border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377]/10"
                    >
                      <Globe className="h-4 w-4 mr-2" />
                      Export as HTML
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-[#0F7377]" />
                    Export Settings
                  </CardTitle>
                  <CardDescription>Configure export options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Include Charts</Label>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Include Financial Tables</Label>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Include Executive Summary</Label>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Include Appendix</Label>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </GrowthLabLayout>
  )
} 