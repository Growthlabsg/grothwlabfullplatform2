"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { GrowthLabLayout } from "@/components/layout/growthlab-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import {
  ChevronLeft,
  Search,
  BarChart,
  Users,
  Target,
  Globe,
  TrendingUp,
  Download,
  Share2,
  Save,
  FileText,
  PieChart,
  LineChart,
  ArrowRight,
  Sparkles,
} from "lucide-react"

export function MarketResearchTools() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("market-sizing")
  const [industry, setIndustry] = useState("")
  const [region, setRegion] = useState("")
  const [targetAudience, setTargetAudience] = useState("")
  const [competitors, setCompetitors] = useState([""])
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [analysisComplete, setAnalysisComplete] = useState(false)

  const handleAddCompetitor = () => {
    setCompetitors([...competitors, ""])
  }

  const handleCompetitorChange = (index: number, value: string) => {
    const newCompetitors = [...competitors]
    newCompetitors[index] = value
    setCompetitors(newCompetitors)
  }

  const handleRemoveCompetitor = (index: number) => {
    const newCompetitors = [...competitors]
    newCompetitors.splice(index, 1)
    setCompetitors(newCompetitors)
  }

  const runAnalysis = () => {
    setAnalysisProgress(0)
    setAnalysisComplete(false)

    // Simulate analysis progress
    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setAnalysisComplete(true)
          return 100
        }
        return prev + 5
      })
    }, 200)
  }

  const handleSave = () => {
    toast({
      title: "Analysis Saved",
      description: "Your market research analysis has been saved successfully.",
    })
  }

  const handleDownload = () => {
    toast({
      title: "Analysis Downloaded",
      description: "Your market research analysis has been downloaded as a PDF.",
    })
  }

  const handleShare = () => {
    toast({
      title: "Share Link Generated",
      description: "A shareable link to your market research analysis has been copied to your clipboard.",
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
          <h1 className="text-3xl font-bold mb-4">Market Research Tools</h1>
          <p className="text-[#334155] max-w-3xl">
            Research your market, analyze competitors, and validate your business ideas with our comprehensive suite of
            market research tools.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Market Research Analysis</CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={handleSave} disabled={!analysisComplete}>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleDownload} disabled={!analysisComplete}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleShare} disabled={!analysisComplete}>
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
                <CardDescription>
                  Analyze your market, competitors, and target audience to make data-driven decisions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-4 mb-8">
                    <TabsTrigger value="market-sizing">Market Sizing</TabsTrigger>
                    <TabsTrigger value="competitor-analysis">Competitor Analysis</TabsTrigger>
                    <TabsTrigger value="target-audience">Target Audience</TabsTrigger>
                    <TabsTrigger value="trends">Trends</TabsTrigger>
                  </TabsList>

                  <TabsContent value="market-sizing" className="space-y-6">
                    <div>
                      <Label htmlFor="industry">Industry*</Label>
                      <Select value={industry} onValueChange={setIndustry}>
                        <SelectTrigger id="industry">
                          <SelectValue placeholder="Select your industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technology">Technology/Software</SelectItem>
                          <SelectItem value="ecommerce">E-commerce/Retail</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="finance">Financial Services</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="food">Food & Beverage</SelectItem>
                          <SelectItem value="services">Professional Services</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="region">Region*</Label>
                      <Select value={region} onValueChange={setRegion}>
                        <SelectTrigger id="region">
                          <SelectValue placeholder="Select target region" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="global">Global</SelectItem>
                          <SelectItem value="north-america">North America</SelectItem>
                          <SelectItem value="europe">Europe</SelectItem>
                          <SelectItem value="asia-pacific">Asia-Pacific</SelectItem>
                          <SelectItem value="latin-america">Latin America</SelectItem>
                          <SelectItem value="middle-east">Middle East & Africa</SelectItem>
                          <SelectItem value="singapore">Singapore</SelectItem>
                          <SelectItem value="southeast-asia">Southeast Asia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="market-description">Market Description*</Label>
                      <Textarea
                        id="market-description"
                        placeholder="Describe your specific market segment in detail..."
                        rows={4}
                      />
                    </div>

                    <div>
                      <Label htmlFor="timeframe">Timeframe</Label>
                      <Select defaultValue="5-years">
                        <SelectTrigger id="timeframe">
                          <SelectValue placeholder="Select timeframe" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-year">1 Year</SelectItem>
                          <SelectItem value="3-years">3 Years</SelectItem>
                          <SelectItem value="5-years">5 Years</SelectItem>
                          <SelectItem value="10-years">10 Years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="pt-4">
                      <Button onClick={runAnalysis} disabled={!industry || !region}>
                        <BarChart className="h-4 w-4 mr-2" />
                        Run Market Size Analysis
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="competitor-analysis" className="space-y-6">
                    <div>
                      <Label htmlFor="industry-competitor">Industry*</Label>
                      <Select value={industry} onValueChange={setIndustry}>
                        <SelectTrigger id="industry-competitor">
                          <SelectValue placeholder="Select your industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technology">Technology/Software</SelectItem>
                          <SelectItem value="ecommerce">E-commerce/Retail</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="finance">Financial Services</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="food">Food & Beverage</SelectItem>
                          <SelectItem value="services">Professional Services</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label>Competitors*</Label>
                        <Button variant="outline" size="sm" onClick={handleAddCompetitor}>
                          Add Competitor
                        </Button>
                      </div>

                      {competitors.map((competitor, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                          <Input
                            value={competitor}
                            onChange={(e) => handleCompetitorChange(index, e.target.value)}
                            placeholder={`Competitor ${index + 1} name`}
                          />
                          {competitors.length > 1 && (
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleRemoveCompetitor(index)}
                              className="shrink-0"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                              >
                                <path d="M3 6h18"></path>
                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                              </svg>
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>

                    <div>
                      <Label htmlFor="comparison-factors">Comparison Factors</Label>
                      <Textarea
                        id="comparison-factors"
                        placeholder="Enter factors to compare (e.g., pricing, features, market share)..."
                        rows={3}
                      />
                    </div>

                    <div className="pt-4">
                      <Button onClick={runAnalysis} disabled={!industry || competitors.some((c) => !c.trim())}>
                        <Target className="h-4 w-4 mr-2" />
                        Run Competitor Analysis
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="target-audience" className="space-y-6">
                    <div>
                      <Label htmlFor="target-audience-description">Target Audience Description*</Label>
                      <Textarea
                        id="target-audience-description"
                        value={targetAudience}
                        onChange={(e) => setTargetAudience(e.target.value)}
                        placeholder="Describe your target audience in detail (demographics, behaviors, needs)..."
                        rows={4}
                      />
                    </div>

                    <div>
                      <Label htmlFor="audience-size">Estimated Audience Size</Label>
                      <Input id="audience-size" placeholder="e.g., 10,000" />
                    </div>

                    <div>
                      <Label htmlFor="audience-location">Primary Location</Label>
                      <Select defaultValue="global">
                        <SelectTrigger id="audience-location">
                          <SelectValue placeholder="Select primary location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="global">Global</SelectItem>
                          <SelectItem value="north-america">North America</SelectItem>
                          <SelectItem value="europe">Europe</SelectItem>
                          <SelectItem value="asia-pacific">Asia-Pacific</SelectItem>
                          <SelectItem value="latin-america">Latin America</SelectItem>
                          <SelectItem value="middle-east">Middle East & Africa</SelectItem>
                          <SelectItem value="singapore">Singapore</SelectItem>
                          <SelectItem value="southeast-asia">Southeast Asia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="audience-pain-points">Pain Points</Label>
                      <Textarea
                        id="audience-pain-points"
                        placeholder="What problems does your target audience face?"
                        rows={3}
                      />
                    </div>

                    <div className="pt-4">
                      <Button onClick={runAnalysis} disabled={!targetAudience.trim()}>
                        <Users className="h-4 w-4 mr-2" />
                        Analyze Target Audience
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="trends" className="space-y-6">
                    <div>
                      <Label htmlFor="trends-industry">Industry*</Label>
                      <Select value={industry} onValueChange={setIndustry}>
                        <SelectTrigger id="trends-industry">
                          <SelectValue placeholder="Select your industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technology">Technology/Software</SelectItem>
                          <SelectItem value="ecommerce">E-commerce/Retail</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="finance">Financial Services</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="food">Food & Beverage</SelectItem>
                          <SelectItem value="services">Professional Services</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="trends-region">Region*</Label>
                      <Select value={region} onValueChange={setRegion}>
                        <SelectTrigger id="trends-region">
                          <SelectValue placeholder="Select target region" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="global">Global</SelectItem>
                          <SelectItem value="north-america">North America</SelectItem>
                          <SelectItem value="europe">Europe</SelectItem>
                          <SelectItem value="asia-pacific">Asia-Pacific</SelectItem>
                          <SelectItem value="latin-america">Latin America</SelectItem>
                          <SelectItem value="middle-east">Middle East & Africa</SelectItem>
                          <SelectItem value="singapore">Singapore</SelectItem>
                          <SelectItem value="southeast-asia">Southeast Asia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="trends-keywords">Keywords</Label>
                      <Input
                        id="trends-keywords"
                        placeholder="Enter keywords related to your industry (comma separated)"
                      />
                    </div>

                    <div>
                      <Label htmlFor="trends-timeframe">Timeframe</Label>
                      <Select defaultValue="5-years">
                        <SelectTrigger id="trends-timeframe">
                          <SelectValue placeholder="Select timeframe" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-year">1 Year</SelectItem>
                          <SelectItem value="3-years">3 Years</SelectItem>
                          <SelectItem value="5-years">5 Years</SelectItem>
                          <SelectItem value="10-years">10 Years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="pt-4">
                      <Button onClick={runAnalysis} disabled={!industry || !region}>
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Analyze Market Trends
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>

                {analysisProgress > 0 && (
                  <div className="mt-8 space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Analysis Progress</span>
                      <span>{analysisProgress}%</span>
                    </div>
                    <Progress value={analysisProgress} className="h-2" />
                  </div>
                )}

                {analysisComplete && (
                  <div className="mt-8 space-y-6">
                    <div className="bg-muted p-4 rounded-lg">
                      <h3 className="text-lg font-medium mb-2">Analysis Results</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Here are the key insights from your market research analysis:
                      </p>

                      {activeTab === "market-sizing" && (
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium">Total Addressable Market (TAM)</h4>
                            <div className="flex items-center justify-between">
                              <p className="text-2xl font-bold">$4.5B</p>
                              <Badge>+12% YoY</Badge>
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium">Serviceable Available Market (SAM)</h4>
                            <div className="flex items-center justify-between">
                              <p className="text-2xl font-bold">$1.2B</p>
                              <Badge>+15% YoY</Badge>
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium">Serviceable Obtainable Market (SOM)</h4>
                            <div className="flex items-center justify-between">
                              <p className="text-2xl font-bold">$120M</p>
                              <Badge>+18% YoY</Badge>
                            </div>
                          </div>

                          <div className="pt-4">
                            <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center">
                              <BarChart className="h-8 w-8 text-muted-foreground" />
                              <span className="ml-2 text-muted-foreground">Market Size Chart</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === "competitor-analysis" && (
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium">Competitive Landscape</h4>
                            <p className="text-sm text-muted-foreground">
                              Analysis of {competitors.filter((c) => c.trim()).length} competitors in the{" "}
                              {industry === "technology"
                                ? "Technology/Software"
                                : industry === "ecommerce"
                                  ? "E-commerce/Retail"
                                  : industry === "healthcare"
                                    ? "Healthcare"
                                    : industry}{" "}
                              industry.
                            </p>
                          </div>

                          <div className="pt-4">
                            <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center">
                              <PieChart className="h-8 w-8 text-muted-foreground" />
                              <span className="ml-2 text-muted-foreground">Competitive Analysis Chart</span>
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium">Key Differentiators</h4>
                            <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1 mt-2">
                              <li>Pricing strategy differences</li>
                              <li>Feature comparison</li>
                              <li>Market positioning</li>
                              <li>Customer satisfaction ratings</li>
                            </ul>
                          </div>
                        </div>
                      )}

                      {activeTab === "target-audience" && (
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium">Audience Demographics</h4>
                            <p className="text-sm text-muted-foreground">
                              Primary audience: 25-45 year old professionals in urban areas with above-average income.
                            </p>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium">Behavioral Insights</h4>
                            <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1 mt-2">
                              <li>Tech-savvy early adopters</li>
                              <li>Value convenience and efficiency</li>
                              <li>Research extensively before purchasing</li>
                              <li>Brand loyal when satisfied</li>
                            </ul>
                          </div>

                          <div className="pt-4">
                            <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center">
                              <Users className="h-8 w-8 text-muted-foreground" />
                              <span className="ml-2 text-muted-foreground">Audience Segmentation Chart</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === "trends" && (
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium">Market Growth Trends</h4>
                            <div className="flex items-center justify-between">
                              <p className="text-2xl font-bold">+15.7%</p>
                              <Badge>5-Year CAGR</Badge>
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium">Emerging Trends</h4>
                            <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1 mt-2">
                              <li>Increased adoption of AI and machine learning</li>
                              <li>Shift toward subscription-based models</li>
                              <li>Growing emphasis on sustainability</li>
                              <li>Integration with emerging technologies</li>
                            </ul>
                          </div>

                          <div className="pt-4">
                            <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center">
                              <LineChart className="h-8 w-8 text-muted-foreground" />
                              <span className="ml-2 text-muted-foreground">Market Trends Chart</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Research Tools</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  <Link
                    href="#"
                    className="flex items-center p-3 hover:bg-muted/50 transition-colors"
                    onClick={() => setActiveTab("market-sizing")}
                  >
                    <div className="bg-[#0F7377]/10 p-2 rounded-md mr-3">
                      <BarChart className="h-5 w-5 text-[#0F7377]" />
                    </div>
                    <div>
                      <h3 className="font-medium">Market Sizing</h3>
                      <p className="text-sm text-muted-foreground">Calculate your total addressable market</p>
                    </div>
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center p-3 hover:bg-muted/50 transition-colors"
                    onClick={() => setActiveTab("competitor-analysis")}
                  >
                    <div className="bg-[#0F7377]/10 p-2 rounded-md mr-3">
                      <Target className="h-5 w-5 text-[#0F7377]" />
                    </div>
                    <div>
                      <h3 className="font-medium">Competitor Analysis</h3>
                      <p className="text-sm text-muted-foreground">Analyze your competition</p>
                    </div>
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center p-3 hover:bg-muted/50 transition-colors"
                    onClick={() => setActiveTab("target-audience")}
                  >
                    <div className="bg-[#0F7377]/10 p-2 rounded-md mr-3">
                      <Users className="h-5 w-5 text-[#0F7377]" />
                    </div>
                    <div>
                      <h3 className="font-medium">Target Audience</h3>
                      <p className="text-sm text-muted-foreground">Define your ideal customer</p>
                    </div>
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center p-3 hover:bg-muted/50 transition-colors"
                    onClick={() => setActiveTab("trends")}
                  >
                    <div className="bg-[#0F7377]/10 p-2 rounded-md mr-3">
                      <TrendingUp className="h-5 w-5 text-[#0F7377]" />
                    </div>
                    <div>
                      <h3 className="font-medium">Market Trends</h3>
                      <p className="text-sm text-muted-foreground">Identify emerging trends</p>
                    </div>
                  </Link>
                  <Link href="#" className="flex items-center p-3 hover:bg-muted/50 transition-colors">
                    <div className="bg-[#0F7377]/10 p-2 rounded-md mr-3">
                      <Globe className="h-5 w-5 text-[#0F7377]" />
                    </div>
                    <div>
                      <h3 className="font-medium">Geographic Analysis</h3>
                      <p className="text-sm text-muted-foreground">Explore regional market data</p>
                    </div>
                  </Link>
                  <Link href="#" className="flex items-center p-3 hover:bg-muted/50 transition-colors">
                    <div className="bg-[#0F7377]/10 p-2 rounded-md mr-3">
                      <FileText className="h-5 w-5 text-[#0F7377]" />
                    </div>
                    <div>
                      <h3 className="font-medium">Industry Reports</h3>
                      <p className="text-sm text-muted-foreground">Access detailed industry reports</p>
                    </div>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Research Assistant</CardTitle>
                <CardDescription>Get AI-powered insights for your market research</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input className="pl-10" placeholder="Ask about your market..." />
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
                <CardTitle>Recent Searches</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  <div className="p-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">SaaS Market Analysis</h3>
                      <Badge variant="outline">Technology</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Global market sizing for SaaS products</p>
                  </div>
                  <div className="p-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">FinTech Competitors</h3>
                      <Badge variant="outline">Finance</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Analysis of top 5 FinTech competitors</p>
                  </div>
                  <div className="p-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Healthcare Trends</h3>
                      <Badge variant="outline">Healthcare</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Emerging trends in healthcare technology</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Additional Research Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <div className="relative h-40">
                <Image src="/market-research-data.png" alt="Market Research Data" fill className="object-cover" />
              </div>
              <CardHeader>
                <CardTitle>Industry Reports Library</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Access a comprehensive library of industry reports, market analyses, and trend forecasts.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Browse Reports
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <div className="relative h-40">
                <Image src="/customer-survey-feedback.png" alt="Customer Survey" fill className="object-cover" />
              </div>
              <CardHeader>
                <CardTitle>Survey Builder</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Create professional surveys to collect feedback from your target audience and validate your ideas.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Create Survey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <div className="relative h-40">
                <Image
                  src="/placeholder.svg?height=200&width=400&query=expert%20consultation%20meeting"
                  alt="Expert Consultation"
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>Expert Consultation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Book a session with industry experts who can provide insights and answer your specific questions.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Book Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </GrowthLabLayout>
  )
}
