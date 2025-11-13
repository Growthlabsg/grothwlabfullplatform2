"use client"

import { SelectItem } from "@/components/ui/select"

import { SelectContent } from "@/components/ui/select"

import { SelectValue } from "@/components/ui/select"

import { SelectTrigger } from "@/components/ui/select"

import { Select } from "@/components/ui/select"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import {
  ChevronLeft,
  Download,
  Share2,
  Save,
  Lightbulb,
  Users,
  Target,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  FileText,
  MessageSquare,
  BarChart,
  Search,
  PlusCircle,
  Trash2,
  HelpCircle,
} from "lucide-react"

export function IdeaValidationToolkit() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("problem-validation")

  // Problem Validation State
  const [problemStatement, setProblemStatement] = useState("")
  const [targetAudience, setTargetAudience] = useState("")
  const [painPoints, setPainPoints] = useState([{ id: 1, text: "", severity: "medium", frequency: "sometimes" }])
  const [existingSolutions, setExistingSolutions] = useState("")
  const [marketSize, setMarketSize] = useState("")

  // Solution Validation State
  const [solutionDescription, setSolutionDescription] = useState("")
  const [valueProposition, setValueProposition] = useState("")
  const [uniqueSellingPoints, setUniqueSellingPoints] = useState([{ id: 1, text: "" }])
  const [competitiveAdvantages, setCompetitiveAdvantages] = useState("")

  // Market Validation State
  const [customerSegments, setCustomerSegments] = useState([
    { id: 1, name: "", description: "", size: "", willingness: "medium" },
  ])
  const [marketTrends, setMarketTrends] = useState("")
  const [competitorAnalysis, setCompetitorAnalysis] = useState([
    { id: 1, name: "", strengths: "", weaknesses: "", marketShare: "" },
  ])

  // Validation Methods State
  const [validationMethods, setValidationMethods] = useState({
    customerInterviews: true,
    surveys: false,
    landingPage: false,
    prototype: false,
    preorders: false,
    crowdfunding: false,
    betaTesters: false,
    socialMediaEngagement: false,
  })

  // Add a new pain point
  const addPainPoint = () => {
    const newId = painPoints.length > 0 ? Math.max(...painPoints.map((p) => p.id)) + 1 : 1
    setPainPoints([...painPoints, { id: newId, text: "", severity: "medium", frequency: "sometimes" }])
  }

  // Remove a pain point
  const removePainPoint = (id: number) => {
    setPainPoints(painPoints.filter((p) => p.id !== id))
  }

  // Update a pain point
  const updatePainPoint = (id: number, field: string, value: string) => {
    setPainPoints(
      painPoints.map((p) => {
        if (p.id === id) {
          return { ...p, [field]: value }
        }
        return p
      }),
    )
  }

  // Add a new unique selling point
  const addUniqueSellingPoint = () => {
    const newId = uniqueSellingPoints.length > 0 ? Math.max(...uniqueSellingPoints.map((p) => p.id)) + 1 : 1
    setUniqueSellingPoints([...uniqueSellingPoints, { id: newId, text: "" }])
  }

  // Remove a unique selling point
  const removeUniqueSellingPoint = (id: number) => {
    setUniqueSellingPoints(uniqueSellingPoints.filter((p) => p.id !== id))
  }

  // Update a unique selling point
  const updateUniqueSellingPoint = (id: number, text: string) => {
    setUniqueSellingPoints(
      uniqueSellingPoints.map((p) => {
        if (p.id === id) {
          return { ...p, text }
        }
        return p
      }),
    )
  }

  // Add a new customer segment
  const addCustomerSegment = () => {
    const newId = customerSegments.length > 0 ? Math.max(...customerSegments.map((s) => s.id)) + 1 : 1
    setCustomerSegments([
      ...customerSegments,
      { id: newId, name: "", description: "", size: "", willingness: "medium" },
    ])
  }

  // Remove a customer segment
  const removeCustomerSegment = (id: number) => {
    setCustomerSegments(customerSegments.filter((s) => s.id !== id))
  }

  // Update a customer segment
  const updateCustomerSegment = (id: number, field: string, value: string) => {
    setCustomerSegments(
      customerSegments.map((s) => {
        if (s.id === id) {
          return { ...s, [field]: value }
        }
        return s
      }),
    )
  }

  // Add a new competitor
  const addCompetitor = () => {
    const newId = competitorAnalysis.length > 0 ? Math.max(...competitorAnalysis.map((c) => c.id)) + 1 : 1
    setCompetitorAnalysis([
      ...competitorAnalysis,
      { id: newId, name: "", strengths: "", weaknesses: "", marketShare: "" },
    ])
  }

  // Remove a competitor
  const removeCompetitor = (id: number) => {
    setCompetitorAnalysis(competitorAnalysis.filter((c) => c.id !== id))
  }

  // Update a competitor
  const updateCompetitor = (id: number, field: string, value: string) => {
    setCompetitorAnalysis(
      competitorAnalysis.map((c) => {
        if (c.id === id) {
          return { ...c, [field]: value }
        }
        return c
      }),
    )
  }

  // Toggle validation method
  const toggleValidationMethod = (method: string) => {
    setValidationMethods({
      ...validationMethods,
      [method]: !validationMethods[method as keyof typeof validationMethods],
    })
  }

  // Calculate completion percentage for each section
  const calculateProblemCompletion = () => {
    let total = 0
    let completed = 0

    // Problem statement
    total += 1
    if (problemStatement.length > 10) completed += 1

    // Target audience
    total += 1
    if (targetAudience.length > 10) completed += 1

    // Pain points
    total += 1
    if (painPoints.length > 0 && painPoints.some((p) => p.text.length > 5)) completed += 1

    // Existing solutions
    total += 1
    if (existingSolutions.length > 10) completed += 1

    // Market size
    total += 1
    if (marketSize.length > 5) completed += 1

    return (completed / total) * 100
  }

  const calculateSolutionCompletion = () => {
    let total = 0
    let completed = 0

    // Solution description
    total += 1
    if (solutionDescription.length > 10) completed += 1

    // Value proposition
    total += 1
    if (valueProposition.length > 10) completed += 1

    // Unique selling points
    total += 1
    if (uniqueSellingPoints.length > 0 && uniqueSellingPoints.some((p) => p.text.length > 5)) completed += 1

    // Competitive advantages
    total += 1
    if (competitiveAdvantages.length > 10) completed += 1

    return (completed / total) * 100
  }

  const calculateMarketCompletion = () => {
    let total = 0
    let completed = 0

    // Customer segments
    total += 1
    if (customerSegments.length > 0 && customerSegments.some((s) => s.name.length > 3)) completed += 1

    // Market trends
    total += 1
    if (marketTrends.length > 10) completed += 1

    // Competitor analysis
    total += 1
    if (competitorAnalysis.length > 0 && competitorAnalysis.some((c) => c.name.length > 3)) completed += 1

    return (completed / total) * 100
  }

  const calculateMethodsCompletion = () => {
    const selectedMethods = Object.values(validationMethods).filter(Boolean).length
    return selectedMethods > 0 ? (selectedMethods / Object.keys(validationMethods).length) * 100 : 0
  }

  const calculateOverallCompletion = () => {
    return (
      (calculateProblemCompletion() +
        calculateSolutionCompletion() +
        calculateMarketCompletion() +
        calculateMethodsCompletion()) /
      4
    )
  }

  // Handle save
  const handleSave = () => {
    toast({
      title: "Validation Plan Saved",
      description: "Your idea validation plan has been saved to your account.",
    })
  }

  // Handle download
  const handleDownload = () => {
    toast({
      title: "Validation Plan Downloaded",
      description: "Your idea validation plan has been downloaded as a PDF.",
    })
  }

  // Handle share
  const handleShare = () => {
    toast({
      title: "Share Link Generated",
      description: "A shareable link to your idea validation plan has been copied to your clipboard.",
    })
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8">
        <Link href="/startup" className="flex items-center text-[#0F7377] hover:underline mb-4">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Startup Resources
        </Link>
        <h1 className="text-3xl font-bold mb-4">Idea Validation Toolkit</h1>
        <p className="text-[#334155] max-w-3xl">
          Validate your business idea systematically by identifying the problem, defining your solution, understanding
          your market, and planning validation methods. This toolkit helps you reduce risk and increase your chances of
          success.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Idea Validation Plan</CardTitle>
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
              <CardDescription>Create a comprehensive plan to validate your business idea</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-4 mb-8">
                  <TabsTrigger value="problem-validation">Problem</TabsTrigger>
                  <TabsTrigger value="solution-validation">Solution</TabsTrigger>
                  <TabsTrigger value="market-validation">Market</TabsTrigger>
                  <TabsTrigger value="validation-methods">Methods</TabsTrigger>
                </TabsList>

                {/* Problem Validation */}
                <TabsContent value="problem-validation" className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Problem Validation</h3>
                      <Button variant="outline" size="sm" className="flex items-center">
                        <HelpCircle className="h-4 w-4 mr-2" />
                        How to validate a problem
                      </Button>
                    </div>
                    <p className="text-muted-foreground">
                      Define the problem you're solving and who experiences it. This is the foundation of your business
                      idea.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-3">
                      <Label htmlFor="problem-statement">Problem Statement</Label>
                      <Textarea
                        id="problem-statement"
                        placeholder="Describe the problem you're solving in detail..."
                        value={problemStatement}
                        onChange={(e) => setProblemStatement(e.target.value)}
                        className="min-h-[100px]"
                      />
                      <p className="text-sm text-muted-foreground">
                        Clearly articulate the problem, why it matters, and how it affects people or businesses.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="target-audience">Target Audience</Label>
                      <Textarea
                        id="target-audience"
                        placeholder="Describe who experiences this problem..."
                        value={targetAudience}
                        onChange={(e) => setTargetAudience(e.target.value)}
                      />
                      <p className="text-sm text-muted-foreground">
                        Define the specific group of people or businesses that experience this problem.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Pain Points</Label>
                        <Button variant="ghost" size="sm" onClick={addPainPoint} className="h-8 px-2">
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Add Pain Point
                        </Button>
                      </div>

                      <div className="space-y-4">
                        {painPoints.map((painPoint) => (
                          <div key={painPoint.id} className="space-y-3 p-4 border rounded-md">
                            <div className="flex justify-between">
                              <Label htmlFor={`pain-point-${painPoint.id}`}>Pain Point Description</Label>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removePainPoint(painPoint.id)}
                                className="h-6 px-2 text-red-500 hover:text-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <Textarea
                              id={`pain-point-${painPoint.id}`}
                              placeholder="Describe a specific pain point..."
                              value={painPoint.text}
                              onChange={(e) => updatePainPoint(painPoint.id, "text", e.target.value)}
                            />

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor={`severity-${painPoint.id}`}>Severity</Label>
                                <Select
                                  id={`severity-${painPoint.id}`}
                                  value={painPoint.severity}
                                  onValueChange={(value) => updatePainPoint(painPoint.id, "severity", value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select severity" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="low">Low</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="high">High</SelectItem>
                                    <SelectItem value="critical">Critical</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor={`frequency-${painPoint.id}`}>Frequency</Label>
                                <Select
                                  id={`frequency-${painPoint.id}`}
                                  value={painPoint.frequency}
                                  onValueChange={(value) => updatePainPoint(painPoint.id, "frequency", value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select frequency" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="rarely">Rarely</SelectItem>
                                    <SelectItem value="sometimes">Sometimes</SelectItem>
                                    <SelectItem value="often">Often</SelectItem>
                                    <SelectItem value="constantly">Constantly</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="existing-solutions">Existing Solutions</Label>
                      <Textarea
                        id="existing-solutions"
                        placeholder="Describe how people currently solve this problem..."
                        value={existingSolutions}
                        onChange={(e) => setExistingSolutions(e.target.value)}
                      />
                      <p className="text-sm text-muted-foreground">
                        Identify current alternatives and workarounds people use to address this problem.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="market-size">Market Size Estimate</Label>
                      <Textarea
                        id="market-size"
                        placeholder="Estimate how many people or businesses experience this problem..."
                        value={marketSize}
                        onChange={(e) => setMarketSize(e.target.value)}
                      />
                      <p className="text-sm text-muted-foreground">
                        Provide a rough estimate of how many potential customers have this problem.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <Button onClick={() => setActiveTab("solution-validation")}>
                      Next: Solution Validation
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>

                {/* Solution Validation */}
                <TabsContent value="solution-validation" className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Solution Validation</h3>
                      <Button variant="outline" size="sm" className="flex items-center">
                        <HelpCircle className="h-4 w-4 mr-2" />
                        How to validate a solution
                      </Button>
                    </div>
                    <p className="text-muted-foreground">
                      Define your solution and how it addresses the problem better than existing alternatives.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-3">
                      <Label htmlFor="solution-description">Solution Description</Label>
                      <Textarea
                        id="solution-description"
                        placeholder="Describe your solution in detail..."
                        value={solutionDescription}
                        onChange={(e) => setSolutionDescription(e.target.value)}
                        className="min-h-[100px]"
                      />
                      <p className="text-sm text-muted-foreground">
                        Clearly explain how your product or service works and how it solves the problem.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="value-proposition">Value Proposition</Label>
                      <Textarea
                        id="value-proposition"
                        placeholder="Describe the value your solution provides..."
                        value={valueProposition}
                        onChange={(e) => setValueProposition(e.target.value)}
                      />
                      <p className="text-sm text-muted-foreground">
                        Articulate the specific benefits customers will receive from your solution.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Unique Selling Points</Label>
                        <Button variant="ghost" size="sm" onClick={addUniqueSellingPoint} className="h-8 px-2">
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Add USP
                        </Button>
                      </div>

                      <div className="space-y-4">
                        {uniqueSellingPoints.map((usp) => (
                          <div key={usp.id} className="space-y-3 p-4 border rounded-md">
                            <div className="flex justify-between">
                              <Label htmlFor={`usp-${usp.id}`}>Unique Selling Point</Label>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeUniqueSellingPoint(usp.id)}
                                className="h-6 px-2 text-red-500 hover:text-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <Textarea
                              id={`usp-${usp.id}`}
                              placeholder="Describe what makes your solution unique..."
                              value={usp.text}
                              onChange={(e) => updateUniqueSellingPoint(usp.id, e.target.value)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="competitive-advantages">Competitive Advantages</Label>
                      <Textarea
                        id="competitive-advantages"
                        placeholder="Describe your advantages over existing solutions..."
                        value={competitiveAdvantages}
                        onChange={(e) => setCompetitiveAdvantages(e.target.value)}
                      />
                      <p className="text-sm text-muted-foreground">
                        Explain why your solution is better than existing alternatives.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <Button variant="outline" onClick={() => setActiveTab("problem-validation")}>
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Previous: Problem Validation
                    </Button>
                    <Button onClick={() => setActiveTab("market-validation")}>
                      Next: Market Validation
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>

                {/* Market Validation */}
                <TabsContent value="market-validation" className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Market Validation</h3>
                      <Button variant="outline" size="sm" className="flex items-center">
                        <HelpCircle className="h-4 w-4 mr-2" />
                        How to validate a market
                      </Button>
                    </div>
                    <p className="text-muted-foreground">
                      Understand your target market, customer segments, and competitive landscape.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Customer Segments</Label>
                        <Button variant="ghost" size="sm" onClick={addCustomerSegment} className="h-8 px-2">
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Add Segment
                        </Button>
                      </div>

                      <div className="space-y-4">
                        {customerSegments.map((segment) => (
                          <div key={segment.id} className="space-y-3 p-4 border rounded-md">
                            <div className="flex justify-between">
                              <Label htmlFor={`segment-name-${segment.id}`}>Segment Name</Label>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeCustomerSegment(segment.id)}
                                className="h-6 px-2 text-red-500 hover:text-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <Input
                              id={`segment-name-${segment.id}`}
                              placeholder="E.g., Small Business Owners"
                              value={segment.name}
                              onChange={(e) => updateCustomerSegment(segment.id, "name", e.target.value)}
                            />

                            <div className="space-y-2">
                              <Label htmlFor={`segment-description-${segment.id}`}>Description</Label>
                              <Textarea
                                id={`segment-description-${segment.id}`}
                                placeholder="Describe this customer segment..."
                                value={segment.description}
                                onChange={(e) => updateCustomerSegment(segment.id, "description", e.target.value)}
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor={`segment-size-${segment.id}`}>Estimated Size</Label>
                                <Input
                                  id={`segment-size-${segment.id}`}
                                  placeholder="E.g., 500,000 businesses"
                                  value={segment.size}
                                  onChange={(e) => updateCustomerSegment(segment.id, "size", e.target.value)}
                                />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor={`willingness-${segment.id}`}>Willingness to Pay</Label>
                                <Select
                                  id={`willingness-${segment.id}`}
                                  value={segment.willingness}
                                  onValueChange={(value) => updateCustomerSegment(segment.id, "willingness", value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select willingness" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="low">Low</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="high">High</SelectItem>
                                    <SelectItem value="very-high">Very High</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="market-trends">Market Trends</Label>
                      <Textarea
                        id="market-trends"
                        placeholder="Describe relevant market trends and dynamics..."
                        value={marketTrends}
                        onChange={(e) => setMarketTrends(e.target.value)}
                      />
                      <p className="text-sm text-muted-foreground">
                        Identify trends that could impact your business positively or negatively.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Competitor Analysis</Label>
                        <Button variant="ghost" size="sm" onClick={addCompetitor} className="h-8 px-2">
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Add Competitor
                        </Button>
                      </div>

                      <div className="space-y-4">
                        {competitorAnalysis.map((competitor) => (
                          <div key={competitor.id} className="space-y-3 p-4 border rounded-md">
                            <div className="flex justify-between">
                              <Label htmlFor={`competitor-name-${competitor.id}`}>Competitor Name</Label>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeCompetitor(competitor.id)}
                                className="h-6 px-2 text-red-500 hover:text-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <Input
                              id={`competitor-name-${competitor.id}`}
                              placeholder="E.g., Competitor Inc."
                              value={competitor.name}
                              onChange={(e) => updateCompetitor(competitor.id, "name", e.target.value)}
                            />

                            <div className="space-y-2">
                              <Label htmlFor={`competitor-strengths-${competitor.id}`}>Strengths</Label>
                              <Textarea
                                id={`competitor-strengths-${competitor.id}`}
                                placeholder="List their key strengths..."
                                value={competitor.strengths}
                                onChange={(e) => updateCompetitor(competitor.id, "strengths", e.target.value)}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor={`competitor-weaknesses-${competitor.id}`}>Weaknesses</Label>
                              <Textarea
                                id={`competitor-weaknesses-${competitor.id}`}
                                placeholder="List their key weaknesses..."
                                value={competitor.weaknesses}
                                onChange={(e) => updateCompetitor(competitor.id, "weaknesses", e.target.value)}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor={`competitor-market-share-${competitor.id}`}>Market Share/Position</Label>
                              <Input
                                id={`competitor-market-share-${competitor.id}`}
                                placeholder="E.g., 15% market share, market leader"
                                value={competitor.marketShare}
                                onChange={(e) => updateCompetitor(competitor.id, "marketShare", e.target.value)}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <Button variant="outline" onClick={() => setActiveTab("solution-validation")}>
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Previous: Solution Validation
                    </Button>
                    <Button onClick={() => setActiveTab("validation-methods")}>
                      Next: Validation Methods
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>

                {/* Validation Methods */}
                <TabsContent value="validation-methods" className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Validation Methods</h3>
                      <Button variant="outline" size="sm" className="flex items-center">
                        <HelpCircle className="h-4 w-4 mr-2" />
                        How to choose methods
                      </Button>
                    </div>
                    <p className="text-muted-foreground">
                      Select the methods you'll use to validate your business idea with real customers.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="customer-interviews"
                          checked={validationMethods.customerInterviews}
                          onCheckedChange={() => toggleValidationMethod("customerInterviews")}
                        />
                        <div className="grid gap-1.5">
                          <Label htmlFor="customer-interviews" className="text-base font-medium">
                            Customer Interviews
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Conduct in-depth interviews with potential customers to understand their needs and pain
                            points.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="surveys"
                          checked={validationMethods.surveys}
                          onCheckedChange={() => toggleValidationMethod("surveys")}
                        />
                        <div className="grid gap-1.5">
                          <Label htmlFor="surveys" className="text-base font-medium">
                            Surveys and Questionnaires
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Collect quantitative data from a larger sample of potential customers.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="landing-page"
                          checked={validationMethods.landingPage}
                          onCheckedChange={() => toggleValidationMethod("landingPage")}
                        />
                        <div className="grid gap-1.5">
                          <Label htmlFor="landing-page" className="text-base font-medium">
                            Landing Page Testing
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Create a landing page to gauge interest and collect email sign-ups.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="prototype"
                          checked={validationMethods.prototype}
                          onCheckedChange={() => toggleValidationMethod("prototype")}
                        />
                        <div className="grid gap-1.5">
                          <Label htmlFor="prototype" className="text-base font-medium">
                            Prototype Testing
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Build a simple prototype and get feedback from potential users.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="preorders"
                          checked={validationMethods.preorders}
                          onCheckedChange={() => toggleValidationMethod("preorders")}
                        />
                        <div className="grid gap-1.5">
                          <Label htmlFor="preorders" className="text-base font-medium">
                            Pre-orders or Letters of Intent
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Secure pre-orders or commitments from potential customers.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="crowdfunding"
                          checked={validationMethods.crowdfunding}
                          onCheckedChange={() => toggleValidationMethod("crowdfunding")}
                        />
                        <div className="grid gap-1.5">
                          <Label htmlFor="crowdfunding" className="text-base font-medium">
                            Crowdfunding Campaign
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Launch a crowdfunding campaign to validate demand and raise funds.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="beta-testers"
                          checked={validationMethods.betaTesters}
                          onCheckedChange={() => toggleValidationMethod("betaTesters")}
                        />
                        <div className="grid gap-1.5">
                          <Label htmlFor="beta-testers" className="text-base font-medium">
                            Beta Testing Program
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Recruit early users to test your product and provide feedback.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="social-media"
                          checked={validationMethods.socialMediaEngagement}
                          onCheckedChange={() => toggleValidationMethod("socialMediaEngagement")}
                        />
                        <div className="grid gap-1.5">
                          <Label htmlFor="social-media" className="text-base font-medium">
                            Social Media Engagement
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Test your idea through social media content and measure engagement.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <Button variant="outline" onClick={() => setActiveTab("market-validation")}>
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Previous: Market Validation
                    </Button>
                    <Button
                      onClick={() => {
                        toast({
                          title: "Validation Plan Complete",
                          description: "Your idea validation plan has been created successfully.",
                        })
                      }}
                    >
                      Complete Validation Plan
                      <CheckCircle2 className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Validation Progress</CardTitle>
              <CardDescription>Track your idea validation progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Problem Validation</span>
                  <span className="text-sm text-muted-foreground">{Math.round(calculateProblemCompletion())}%</span>
                </div>
                <Progress value={calculateProblemCompletion()} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Solution Validation</span>
                  <span className="text-sm text-muted-foreground">{Math.round(calculateSolutionCompletion())}%</span>
                </div>
                <Progress value={calculateSolutionCompletion()} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Market Validation</span>
                  <span className="text-sm text-muted-foreground">{Math.round(calculateMarketCompletion())}%</span>
                </div>
                <Progress value={calculateMarketCompletion()} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Validation Methods</span>
                  <span className="text-sm text-muted-foreground">{Math.round(calculateMethodsCompletion())}%</span>
                </div>
                <Progress value={calculateMethodsCompletion()} className="h-2" />
              </div>

              <div className="pt-2 border-t">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Overall Completion</span>
                  <span className="font-bold text-[#0F7377]">{Math.round(calculateOverallCompletion())}%</span>
                </div>
                <Progress value={calculateOverallCompletion()} className="h-2 mt-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Validation Resources</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                <Link href="#" className="block p-3 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center">
                    <div className="bg-[#0F7377]/10 p-2 rounded-md mr-3">
                      <MessageSquare className="h-5 w-5 text-[#0F7377]" />
                    </div>
                    <div>
                      <h3 className="font-medium">Customer Interview Guide</h3>
                      <p className="text-sm text-muted-foreground">Learn how to conduct effective interviews</p>
                    </div>
                  </div>
                </Link>
                <Link href="#" className="block p-3 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center">
                    <div className="bg-[#0F7377]/10 p-2 rounded-md mr-3">
                      <ClipboardList className="h-5 w-5 text-[#0F7377]" />
                    </div>
                    <div>
                      <h3 className="font-medium">Survey Question Templates</h3>
                      <p className="text-sm text-muted-foreground">Ready-to-use survey questions</p>
                    </div>
                  </div>
                </Link>
                <Link href="#" className="block p-3 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center">
                    <div className="bg-[#0F7377]/10 p-2 rounded-md mr-3">
                      <Search className="h-5 w-5 text-[#0F7377]" />
                    </div>
                    <div>
                      <h3 className="font-medium">Market Research Tools</h3>
                      <p className="text-sm text-muted-foreground">Tools to research your market</p>
                    </div>
                  </div>
                </Link>
                <Link href="#" className="block p-3 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center">
                    <div className="bg-[#0F7377]/10 p-2 rounded-md mr-3">
                      <FileText className="h-5 w-5 text-[#0F7377]" />
                    </div>
                    <div>
                      <h3 className="font-medium">Validation Case Studies</h3>
                      <p className="text-sm text-muted-foreground">Learn from successful validations</p>
                    </div>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Validation Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-start">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md mr-3 mt-0.5">
                    <Lightbulb className="h-5 w-5 text-[#0F7377]" />
                  </div>
                  <div>
                    <h3 className="font-medium">Focus on the problem first</h3>
                    <p className="text-sm text-muted-foreground">
                      Validate that the problem exists before investing in a solution.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-start">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md mr-3 mt-0.5">
                    <Users className="h-5 w-5 text-[#0F7377]" />
                  </div>
                  <div>
                    <h3 className="font-medium">Talk to real customers</h3>
                    <p className="text-sm text-muted-foreground">
                      Don't rely solely on feedback from friends and family.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-start">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md mr-3 mt-0.5">
                    <Target className="h-5 w-5 text-[#0F7377]" />
                  </div>
                  <div>
                    <h3 className="font-medium">Test specific hypotheses</h3>
                    <p className="text-sm text-muted-foreground">Break down your idea into testable assumptions.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-start">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md mr-3 mt-0.5">
                    <BarChart className="h-5 w-5 text-[#0F7377]" />
                  </div>
                  <div>
                    <h3 className="font-medium">Measure willingness to pay</h3>
                    <p className="text-sm text-muted-foreground">
                      Validate not just interest, but willingness to pay for your solution.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
