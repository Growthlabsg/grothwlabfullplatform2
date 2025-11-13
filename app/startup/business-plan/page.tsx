"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { ChevronLeft, Plus, Trash2, Download, FileText, Share2, Save, Sparkles } from "lucide-react"

export default function BusinessPlanGeneratorPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("executive-summary")
  const [showAIDialog, setShowAIDialog] = useState(false)
  const [aiPrompt, setAiPrompt] = useState("")
  const [aiSection, setAiSection] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const [businessPlan, setBusinessPlan] = useState({
    // Executive Summary
    companyName: "",
    businessDescription: "",
    mission: "",
    vision: "",
    objectives: [""],

    // Company Description
    legalStructure: "",
    location: "",
    history: "",
    managementTeam: [{ name: "", role: "", experience: "" }],

    // Market Analysis
    industryOverview: "",
    targetMarket: "",
    marketSize: "",
    marketTrends: "",
    customerProfile: "",

    // Competitive Analysis
    competitors: [{ name: "", strengths: "", weaknesses: "", advantages: "" }],
    competitiveAdvantage: "",

    // Products and Services
    productDescription: "",
    valueProposition: "",
    pricingStrategy: "",
    intellectualProperty: "",
    researchDevelopment: "",

    // Marketing and Sales
    marketingStrategy: "",
    salesStrategy: "",
    promotionChannels: [""],
    customerAcquisition: "",
    customerRetention: "",

    // Operations
    facilities: "",
    equipment: "",
    productionProcess: "",
    suppliers: "",
    inventory: "",
    qualityControl: "",

    // Organization and Management
    organizationalStructure: "",
    keyRoles: [{ title: "", responsibilities: "", requiredSkills: "" }],
    advisors: "",
    professionalServices: "",

    // Financial Plan
    startupCosts: "",
    operatingCosts: "",
    breakEvenAnalysis: "",
    salesForecast: "",
    profitLossProjection: "",
    cashFlowProjection: "",
    balanceSheetProjection: "",
    fundingRequirements: "",
    fundingUse: "",
    exitStrategy: "",

    // Implementation Plan
    milestones: [{ title: "", description: "", targetDate: "", budget: "", responsible: "" }],
    timeline: "",
    riskAnalysis: [{ risk: "", impact: "", probability: "", mitigation: "" }],

    // Appendix
    marketResearch: "",
    financialStatements: "",
    legalDocuments: "",
    resumes: "",
    otherDocuments: "",
  })

  const handleChange = (section: string, field: string, value: string) => {
    setBusinessPlan((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section as keyof typeof prev] as object || {}),
        [field]: value,
      },
    }))
  }

  const handleSimpleChange = (field: string, value: string) => {
    setBusinessPlan((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleArrayChange = (field: string, index: number, value: string) => {
    setBusinessPlan((prev) => {
      const newArray = [...(prev[field as keyof typeof prev] as string[])]
      newArray[index] = value
      return {
        ...prev,
        [field]: newArray,
      }
    })
  }

  const handleAddArrayItem = (field: string) => {
    setBusinessPlan((prev) => ({
      ...prev,
      [field]: [...(prev[field as keyof typeof prev] as string[]), ""],
    }))
  }

  const handleRemoveArrayItem = (field: string, index: number) => {
    setBusinessPlan((prev) => {
      const newArray = [...(prev[field as keyof typeof prev] as string[])]
      newArray.splice(index, 1)
      return {
        ...prev,
        [field]: newArray,
      }
    })
  }

  const handleObjectArrayChange = (field: string, index: number, objectField: string, value: string) => {
    setBusinessPlan((prev) => {
      const array = prev[field as keyof typeof prev] as any[]
      const newArray = array.map((item, i) => {
        if (i === index) {
          return { ...item, [objectField]: value }
        }
        return item
      })
      return {
        ...prev,
        [field]: newArray,
      }
    })
  }

  const handleAddObjectArrayItem = (field: string, template: any) => {
    setBusinessPlan((prev) => ({
      ...prev,
      [field]: [...(prev[field as keyof typeof prev] as any[]), template],
    }))
  }

  const handleRemoveObjectArrayItem = (field: string, index: number) => {
    setBusinessPlan((prev) => {
      const newArray = [...(prev[field as keyof typeof prev] as any[])]
      newArray.splice(index, 1)
      return {
        ...prev,
        [field]: newArray,
      }
    })
  }

  const handleSave = () => {
    // In a real app, this would save to a database
    toast({
      title: "Business Plan Saved",
      description: "Your business plan has been saved successfully.",
    })
  }

  const handleDownload = () => {
    // In a real app, this would generate a PDF or Word document
    toast({
      title: "Business Plan Downloaded",
      description: "Your business plan has been downloaded as a Word document.",
    })
  }

  const handleShare = () => {
    // In a real app, this would open a sharing dialog
    toast({
      title: "Share Link Generated",
      description: "A shareable link to your business plan has been copied to your clipboard.",
    })
  }

  const handleAIAssist = (section: string) => {
    setAiSection(section)
    setShowAIDialog(true)
  }

  const applyAIAssistance = () => {
    // In a real app, this would call an AI service
    toast({
      title: "AI Assistance Applied",
      description: `Your ${aiSection} has been enhanced with AI assistance.`,
    })

    // Simulate AI-generated content
    if (aiSection === "businessDescription") {
      handleSimpleChange(
        "businessDescription",
        businessPlan.businessDescription +
          "\n\nOur innovative approach combines cutting-edge technology with exceptional customer service to deliver unparalleled value in the market.",
      )
    } else if (aiSection === "marketAnalysis") {
      handleChange(
        "Market Analysis",
        "industryOverview",
        "The industry is experiencing rapid growth with a CAGR of 15% over the next five years. Key drivers include technological advancements, changing consumer preferences, and increasing demand for sustainable solutions.",
      )
    }

    setShowAIDialog(false)
    setAiPrompt("")
  }

  const getCompletionPercentage = () => {
    // Count filled fields
    let filledFields = 0
    let totalFields = 0

    Object.entries(businessPlan).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.length > 0) {
          if (typeof value[0] === "object") {
            // Object array
            value.forEach((item) => {
              Object.values(item).forEach((fieldValue) => {
                totalFields++
                if (fieldValue && fieldValue.toString().trim() !== "") {
                  filledFields++
                }
              })
            })
          } else {
            // String array
            totalFields += value.length
            value.forEach((item) => {
              if (item && typeof item === 'string' && item.trim() !== "") {
                filledFields++
              }
            })
          }
        }
      } else if (typeof value === "object") {
        // Object
        Object.values(value).forEach((fieldValue) => {
          totalFields++
          if (fieldValue && fieldValue.toString().trim() !== "") {
            filledFields++
          }
        })
      } else {
        // Simple field
        totalFields++
        if (value && value.toString().trim() !== "") {
          filledFields++
        }
      }
    })

    return Math.round((filledFields / totalFields) * 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <Link href="/startup" className="flex items-center text-[#0F7377] hover:underline">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Link>
          <h1 className="text-lg font-bold text-gray-900">Business Plan</h1>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <FileText className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-6 lg:py-12">
        {/* Desktop Header */}
        <div className="hidden lg:block mb-8">
          <Link href="/startup" className="flex items-center text-[#0F7377] hover:underline mb-4">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Startup Resources
          </Link>
          <h1 className="text-3xl font-bold mb-4">Business Plan Generator</h1>
          <p className="text-[#334155] max-w-3xl">
            Create a comprehensive business plan that outlines your business model, market analysis, and growth
            strategy. Our step-by-step generator helps you build a professional business plan to guide your startup's
            journey.
          </p>
        </div>

        {/* Mobile Description */}
        <div className="lg:hidden mb-6">
          <p className="text-sm text-gray-600">
            Create a comprehensive business plan with step-by-step guidance and AI assistance.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Business Plan Builder</CardTitle>
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
                <CardDescription>Fill out each section to create your comprehensive business plan</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-5 mb-8">
                    <TabsTrigger value="executive-summary">Executive Summary</TabsTrigger>
                    <TabsTrigger value="company">Company</TabsTrigger>
                    <TabsTrigger value="market">Market</TabsTrigger>
                    <TabsTrigger value="operations">Operations</TabsTrigger>
                    <TabsTrigger value="financials">Financials</TabsTrigger>
                  </TabsList>

                  <TabsContent value="executive-summary" className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label htmlFor="companyName">Company Name*</Label>
                        <Button variant="ghost" size="sm" onClick={() => handleAIAssist("businessDescription")}>
                          <Sparkles className="h-4 w-4 mr-1" />
                          AI Assist
                        </Button>
                      </div>
                      <Input
                        id="companyName"
                        value={businessPlan.companyName}
                        onChange={(e) => handleSimpleChange("companyName", e.target.value)}
                        placeholder="e.g. TechNova Solutions"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label htmlFor="businessDescription">Business Description*</Label>
                        <Button variant="ghost" size="sm" onClick={() => handleAIAssist("businessDescription")}>
                          <Sparkles className="h-4 w-4 mr-1" />
                          AI Assist
                        </Button>
                      </div>
                      <Textarea
                        id="businessDescription"
                        value={businessPlan.businessDescription}
                        onChange={(e) => handleSimpleChange("businessDescription", e.target.value)}
                        placeholder="Describe what your business does and the problem it solves..."
                        rows={4}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Provide a clear, concise description of your business and its core offerings.
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="mission">Mission Statement*</Label>
                      <Textarea
                        id="mission"
                        value={businessPlan.mission}
                        onChange={(e) => handleSimpleChange("mission", e.target.value)}
                        placeholder="Your company's purpose and reason for existing..."
                        rows={3}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Define your company's purpose and the impact you aim to make.
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="vision">Vision Statement*</Label>
                      <Textarea
                        id="vision"
                        value={businessPlan.vision}
                        onChange={(e) => handleSimpleChange("vision", e.target.value)}
                        placeholder="Your long-term vision for the company..."
                        rows={3}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Describe what you want your company to become in the future.
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label>Business Objectives*</Label>
                        <Button variant="outline" size="sm" onClick={() => handleAddArrayItem("objectives")}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Objective
                        </Button>
                      </div>

                      <div className="space-y-3">
                        {businessPlan.objectives.map((objective, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              value={objective}
                              onChange={(e) => handleArrayChange("objectives", index, e.target.value)}
                              placeholder={`Objective ${index + 1}`}
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveArrayItem("objectives", index)}
                              className="h-10 w-10 text-destructive"
                              disabled={businessPlan.objectives.length <= 1}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Remove objective</span>
                            </Button>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        List specific, measurable goals your business aims to achieve.
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="company" className="space-y-6">
                    <div>
                      <Label htmlFor="legalStructure">Legal Structure*</Label>
                      <Select
                        value={businessPlan.legalStructure}
                        onValueChange={(value) => handleSimpleChange("legalStructure", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select legal structure" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sole-proprietorship">Sole Proprietorship</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="llc">Limited Liability Company (LLC)</SelectItem>
                          <SelectItem value="corporation">Corporation</SelectItem>
                          <SelectItem value="s-corporation">S Corporation</SelectItem>
                          <SelectItem value="b-corporation">B Corporation</SelectItem>
                          <SelectItem value="non-profit">Non-Profit</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground mt-1">
                        Choose the legal structure that best suits your business needs.
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="location">Business Location*</Label>
                      <Input
                        id="location"
                        value={businessPlan.location}
                        onChange={(e) => handleSimpleChange("location", e.target.value)}
                        placeholder="e.g. Singapore, Remote, Multiple locations"
                      />
                    </div>

                    <div>
                      <Label htmlFor="history">Company History</Label>
                      <Textarea
                        id="history"
                        value={businessPlan.history}
                        onChange={(e) => handleSimpleChange("history", e.target.value)}
                        placeholder="Brief history of your company, including when it was founded and key milestones..."
                        rows={3}
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <Label>Management Team*</Label>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleAddObjectArrayItem("managementTeam", { name: "", role: "", experience: "" })
                          }
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Team Member
                        </Button>
                      </div>

                      <div className="space-y-4">
                        {businessPlan.managementTeam.map((member, index) => (
                          <Card key={index} className="border border-muted">
                            <CardContent className="p-4 space-y-4">
                              <div className="flex justify-between items-start">
                                <h4 className="font-medium">Team Member</h4>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleRemoveObjectArrayItem("managementTeam", index)}
                                  className="h-8 w-8 text-destructive"
                                  disabled={businessPlan.managementTeam.length <= 1}
                                >
                                  <Trash2 className="h-4 w-4" />
                                  <span className="sr-only">Remove team member</span>
                                </Button>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor={`member-name-${index}`}>Name</Label>
                                  <Input
                                    id={`member-name-${index}`}
                                    value={member.name}
                                    onChange={(e) =>
                                      handleObjectArrayChange("managementTeam", index, "name", e.target.value)
                                    }
                                    placeholder="e.g. Jane Doe"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor={`member-role-${index}`}>Role</Label>
                                  <Input
                                    id={`member-role-${index}`}
                                    value={member.role}
                                    onChange={(e) =>
                                      handleObjectArrayChange("managementTeam", index, "role", e.target.value)
                                    }
                                    placeholder="e.g. CEO & Co-founder"
                                  />
                                </div>
                              </div>

                              <div>
                                <Label htmlFor={`member-experience-${index}`}>Experience</Label>
                                <Textarea
                                  id={`member-experience-${index}`}
                                  value={member.experience}
                                  onChange={(e) =>
                                    handleObjectArrayChange("managementTeam", index, "experience", e.target.value)
                                  }
                                  placeholder="Brief background and relevant experience..."
                                  rows={2}
                                />
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="market" className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Label htmlFor="industryOverview">Industry Overview*</Label>
                        <Button variant="ghost" size="sm" onClick={() => handleAIAssist("marketAnalysis")}>
                          <Sparkles className="h-4 w-4 mr-1" />
                          AI Assist
                        </Button>
                      </div>
                      <Textarea
                        id="industryOverview"
                        value={businessPlan.industryOverview}
                        onChange={(e) => handleChange("Market Analysis", "industryOverview", e.target.value)}
                        placeholder="Describe the current state of your industry, including size, growth rate, trends, and outlook..."
                        rows={4}
                      />
                    </div>

                    <div>
                      <Label htmlFor="targetMarket">Target Market*</Label>
                      <Textarea
                        id="targetMarket"
                        value={businessPlan.targetMarket}
                        onChange={(e) => handleChange("Market Analysis", "targetMarket", e.target.value)}
                        placeholder="Define your target market segments and their characteristics..."
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="marketSize">Market Size*</Label>
                      <Textarea
                        id="marketSize"
                        value={businessPlan.marketSize}
                        onChange={(e) => handleChange("Market Analysis", "marketSize", e.target.value)}
                        placeholder="Quantify your total addressable market (TAM), serviceable addressable market (SAM), and serviceable obtainable market (SOM)..."
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="customerProfile">Customer Profile*</Label>
                      <Textarea
                        id="customerProfile"
                        value={businessPlan.customerProfile}
                        onChange={(e) => handleChange("Market Analysis", "customerProfile", e.target.value)}
                        placeholder="Describe your ideal customer, including demographics, psychographics, behaviors, and needs..."
                        rows={3}
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <Label>Competitive Analysis*</Label>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleAddObjectArrayItem("competitors", {
                              name: "",
                              strengths: "",
                              weaknesses: "",
                              advantages: "",
                            })
                          }
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Competitor
                        </Button>
                      </div>

                      <div className="space-y-4">
                        {businessPlan.competitors.map((competitor, index) => (
                          <Card key={index} className="border border-muted">
                            <CardContent className="p-4 space-y-4">
                              <div className="flex justify-between items-start">
                                <h4 className="font-medium">Competitor Details</h4>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleRemoveObjectArrayItem("competitors", index)}
                                  className="h-8 w-8 text-destructive"
                                  disabled={businessPlan.competitors.length <= 1}
                                >
                                  <Trash2 className="h-4 w-4" />
                                  <span className="sr-only">Remove competitor</span>
                                </Button>
                              </div>

                              <div>
                                <Label htmlFor={`competitor-name-${index}`}>Competitor Name</Label>
                                <Input
                                  id={`competitor-name-${index}`}
                                  value={competitor.name}
                                  onChange={(e) =>
                                    handleObjectArrayChange("competitors", index, "name", e.target.value)
                                  }
                                  placeholder="e.g. CompetitorX"
                                />
                              </div>

                              <div>
                                <Label htmlFor={`competitor-strengths-${index}`}>Strengths</Label>
                                <Textarea
                                  id={`competitor-strengths-${index}`}
                                  value={competitor.strengths}
                                  onChange={(e) =>
                                    handleObjectArrayChange("competitors", index, "strengths", e.target.value)
                                  }
                                  placeholder="What are they good at?"
                                  rows={2}
                                />
                              </div>

                              <div>
                                <Label htmlFor={`competitor-weaknesses-${index}`}>Weaknesses</Label>
                                <Textarea
                                  id={`competitor-weaknesses-${index}`}
                                  value={competitor.weaknesses}
                                  onChange={(e) =>
                                    handleObjectArrayChange("competitors", index, "weaknesses", e.target.value)
                                  }
                                  placeholder="Where do they fall short?"
                                  rows={2}
                                />
                              </div>

                              <div>
                                <Label htmlFor={`competitor-advantages-${index}`}>Your Advantages</Label>
                                <Textarea
                                  id={`competitor-advantages-${index}`}
                                  value={competitor.advantages}
                                  onChange={(e) =>
                                    handleObjectArrayChange("competitors", index, "advantages", e.target.value)
                                  }
                                  placeholder="How do you differentiate from this competitor?"
                                  rows={2}
                                />
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="operations" className="space-y-6">
                    <div>
                      <Label htmlFor="productDescription">Product/Service Description*</Label>
                      <Textarea
                        id="productDescription"
                        value={businessPlan.productDescription}
                        onChange={(e) => handleChange("Products and Services", "productDescription", e.target.value)}
                        placeholder="Describe your products or services in detail, including features, benefits, and unique selling points..."
                        rows={4}
                      />
                    </div>

                    <div>
                      <Label htmlFor="valueProposition">Value Proposition*</Label>
                      <Textarea
                        id="valueProposition"
                        value={businessPlan.valueProposition}
                        onChange={(e) => handleChange("Products and Services", "valueProposition", e.target.value)}
                        placeholder="Explain the unique value your product or service provides to customers..."
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="pricingStrategy">Pricing Strategy*</Label>
                      <Textarea
                        id="pricingStrategy"
                        value={businessPlan.pricingStrategy}
                        onChange={(e) => handleChange("Products and Services", "pricingStrategy", e.target.value)}
                        placeholder="Describe your pricing model, strategy, and how it compares to competitors..."
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="marketingStrategy">Marketing Strategy*</Label>
                      <Textarea
                        id="marketingStrategy"
                        value={businessPlan.marketingStrategy}
                        onChange={(e) => handleChange("Marketing and Sales", "marketingStrategy", e.target.value)}
                        placeholder="Outline your marketing strategy, including positioning, messaging, and branding..."
                        rows={4}
                      />
                    </div>

                    <div>
                      <Label htmlFor="salesStrategy">Sales Strategy*</Label>
                      <Textarea
                        id="salesStrategy"
                        value={businessPlan.salesStrategy}
                        onChange={(e) => handleChange("Marketing and Sales", "salesStrategy", e.target.value)}
                        placeholder="Describe your sales process, channels, and team structure..."
                        rows={3}
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label>Promotion Channels</Label>
                        <Button variant="outline" size="sm" onClick={() => handleAddArrayItem("promotionChannels")}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Channel
                        </Button>
                      </div>

                      <div className="space-y-3">
                        {businessPlan.promotionChannels.map((channel, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              value={channel}
                              onChange={(e) => handleArrayChange("promotionChannels", index, e.target.value)}
                              placeholder={`Channel ${index + 1} (e.g. Social Media, Email, Content Marketing)`}
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveArrayItem("promotionChannels", index)}
                              className="h-10 w-10 text-destructive"
                              disabled={businessPlan.promotionChannels.length <= 1}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Remove channel</span>
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="operationalProcess">Operational Process</Label>
                      <Textarea
                        id="operationalProcess"
                        value={businessPlan.productionProcess}
                        onChange={(e) => handleChange("Operations", "productionProcess", e.target.value)}
                        placeholder="Describe your operational or production process, from inputs to delivery..."
                        rows={4}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="financials" className="space-y-6">
                    <div>
                      <Label htmlFor="startupCosts">Startup Costs*</Label>
                      <Textarea
                        id="startupCosts"
                        value={businessPlan.startupCosts}
                        onChange={(e) => handleChange("Financial Plan", "startupCosts", e.target.value)}
                        placeholder="List all one-time costs needed to start your business..."
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="operatingCosts">Operating Costs*</Label>
                      <Textarea
                        id="operatingCosts"
                        value={businessPlan.operatingCosts}
                        onChange={(e) => handleChange("Financial Plan", "operatingCosts", e.target.value)}
                        placeholder="Detail your monthly operating expenses..."
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="salesForecast">Sales Forecast*</Label>
                      <Textarea
                        id="salesForecast"
                        value={businessPlan.salesForecast}
                        onChange={(e) => handleChange("Financial Plan", "salesForecast", e.target.value)}
                        placeholder="Project your sales for the next 1-3 years..."
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="breakEvenAnalysis">Break-Even Analysis*</Label>
                      <Textarea
                        id="breakEvenAnalysis"
                        value={businessPlan.breakEvenAnalysis}
                        onChange={(e) => handleChange("Financial Plan", "breakEvenAnalysis", e.target.value)}
                        placeholder="Calculate when your business will become profitable..."
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="fundingRequirements">Funding Requirements</Label>
                      <Textarea
                        id="fundingRequirements"
                        value={businessPlan.fundingRequirements}
                        onChange={(e) => handleChange("Financial Plan", "fundingRequirements", e.target.value)}
                        placeholder="Specify how much funding you need and why..."
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="fundingUse">Use of Funds</Label>
                      <Textarea
                        id="fundingUse"
                        value={businessPlan.fundingUse}
                        onChange={(e) => handleChange("Financial Plan", "fundingUse", e.target.value)}
                        placeholder="Explain how you will use the funding..."
                        rows={3}
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <Label>Risk Analysis</Label>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleAddObjectArrayItem("riskAnalysis", {
                              risk: "",
                              impact: "",
                              probability: "",
                              mitigation: "",
                            })
                          }
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Risk
                        </Button>
                      </div>

                      <div className="space-y-4">
                        {businessPlan.riskAnalysis.map((risk, index) => (
                          <Card key={index} className="border border-muted">
                            <CardContent className="p-4 space-y-4">
                              <div className="flex justify-between items-start">
                                <h4 className="font-medium">Risk Assessment</h4>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleRemoveObjectArrayItem("riskAnalysis", index)}
                                  className="h-8 w-8 text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                  <span className="sr-only">Remove risk</span>
                                </Button>
                              </div>

                              <div>
                                <Label htmlFor={`risk-name-${index}`}>Risk Description</Label>
                                <Input
                                  id={`risk-name-${index}`}
                                  value={risk.risk}
                                  onChange={(e) =>
                                    handleObjectArrayChange("riskAnalysis", index, "risk", e.target.value)
                                  }
                                  placeholder="e.g. Market competition increases"
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor={`risk-impact-${index}`}>Impact</Label>
                                  <Select
                                    value={risk.impact}
                                    onValueChange={(value) =>
                                      handleObjectArrayChange("riskAnalysis", index, "impact", value)
                                    }
                                  >
                                    <SelectTrigger id={`risk-impact-${index}`}>
                                      <SelectValue placeholder="Select impact" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="low">Low</SelectItem>
                                      <SelectItem value="medium">Medium</SelectItem>
                                      <SelectItem value="high">High</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label htmlFor={`risk-probability-${index}`}>Probability</Label>
                                  <Select
                                    value={risk.probability}
                                    onValueChange={(value) =>
                                      handleObjectArrayChange("riskAnalysis", index, "probability", value)
                                    }
                                  >
                                    <SelectTrigger id={`risk-probability-${index}`}>
                                      <SelectValue placeholder="Select probability" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="low">Low</SelectItem>
                                      <SelectItem value="medium">Medium</SelectItem>
                                      <SelectItem value="high">High</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              <div>
                                <Label htmlFor={`risk-mitigation-${index}`}>Mitigation Strategy</Label>
                                <Textarea
                                  id={`risk-mitigation-${index}`}
                                  value={risk.mitigation}
                                  onChange={(e) =>
                                    handleObjectArrayChange("riskAnalysis", index, "mitigation", e.target.value)
                                  }
                                  placeholder="How will you address this risk?"
                                  rows={2}
                                />
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-1">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Business Plan Progress</CardTitle>
                  <CardDescription>Track your completion status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-sm font-medium">Completion Status</p>
                        <p className="text-sm font-medium">{getCompletionPercentage()}%</p>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-[#0F7377]" style={{ width: `${getCompletionPercentage()}%` }}></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div
                          className={`w-4 h-4 rounded-full mr-2 ${businessPlan.companyName ? "bg-green-500" : "bg-gray-300"}`}
                        ></div>
                        <p className="text-sm">Executive Summary</p>
                      </div>
                      <div className="flex items-center">
                        <div
                          className={`w-4 h-4 rounded-full mr-2 ${businessPlan.legalStructure ? "bg-green-500" : "bg-gray-300"}`}
                        ></div>
                        <p className="text-sm">Company Description</p>
                      </div>
                      <div className="flex items-center">
                        <div
                          className={`w-4 h-4 rounded-full mr-2 ${businessPlan.industryOverview ? "bg-green-500" : "bg-gray-300"}`}
                        ></div>
                        <p className="text-sm">Market Analysis</p>
                      </div>
                      <div className="flex items-center">
                        <div
                          className={`w-4 h-4 rounded-full mr-2 ${businessPlan.productDescription ? "bg-green-500" : "bg-gray-300"}`}
                        ></div>
                        <p className="text-sm">Products & Services</p>
                      </div>
                      <div className="flex items-center">
                        <div
                          className={`w-4 h-4 rounded-full mr-2 ${businessPlan.marketingStrategy ? "bg-green-500" : "bg-gray-300"}`}
                        ></div>
                        <p className="text-sm">Marketing & Sales</p>
                      </div>
                      <div className="flex items-center">
                        <div
                          className={`w-4 h-4 rounded-full mr-2 ${businessPlan.productionProcess ? "bg-green-500" : "bg-gray-300"}`}
                        ></div>
                        <p className="text-sm">Operations</p>
                      </div>
                      <div className="flex items-center">
                        <div
                          className={`w-4 h-4 rounded-full mr-2 ${businessPlan.startupCosts ? "bg-green-500" : "bg-gray-300"}`}
                        ></div>
                        <p className="text-sm">Financial Plan</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tips & Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium">Current Section Tips</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {activeTab === "executive-summary" &&
                          "Keep your executive summary clear and concise. It should highlight the most compelling aspects of your business plan."}
                        {activeTab === "company" &&
                          "Provide a detailed overview of your company structure and the team that will execute your vision."}
                        {activeTab === "market" &&
                          "Use concrete data to define your market size and competitive landscape. Be realistic but ambitious."}
                        {activeTab === "operations" &&
                          "Explain your business operations in simple terms. Focus on how you deliver value to customers."}
                        {activeTab === "financials" &&
                          "Be realistic with your financial projections. Investors value honesty and thoughtful planning."}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium">Helpful Resources</h4>
                      <ul className="text-sm text-muted-foreground mt-1 space-y-2">
                        <li>
                          <Link href="#" className="text-[#0F7377] hover:underline flex items-center">
                            <FileText className="h-3 w-3 mr-2" />
                            Business Plan Templates
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="text-[#0F7377] hover:underline flex items-center">
                            <FileText className="h-3 w-3 mr-2" />
                            Financial Projection Templates
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="text-[#0F7377] hover:underline flex items-center">
                            <FileText className="h-3 w-3 mr-2" />
                            Market Research Guide
                          </Link>
                        </li>
                        <li>
                          <Link href="#" className="text-[#0F7377] hover:underline flex items-center">
                            <FileText className="h-3 w-3 mr-2" />
                            Competitive Analysis Framework
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Need Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our team of business advisors can review your business plan and provide personalized feedback.
                  </p>
                  <Button variant="outline" className="w-full">
                    Request Expert Review
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* AI Assistance Dialog */}
      {showAIDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">AI Assistance</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="ai-prompt">What would you like help with?</Label>
                <Textarea
                  id="ai-prompt"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder={`E.g., Help me write a compelling ${aiSection}...`}
                  rows={4}
                />
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <Button variant="outline" onClick={() => setShowAIDialog(false)}>
                  Cancel
                </Button>
                <Button className="bg-[#0F7377] hover:bg-[#0F7377]/90" onClick={applyAIAssistance}>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
