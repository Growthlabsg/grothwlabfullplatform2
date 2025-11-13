"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ChevronLeft,
  Download,
  Share2,
  Save,
  Sparkles,
  Search,
  TrendingUp,
  Users,
  Target,
  BarChart3,
  PieChart,
  LineChart,
  Globe,
  Building,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Clock,
  FileText,
  Plus,
  Trash2,
  Edit,
  Eye,
  Copy,
  Zap,
  Shield,
  Lightbulb,
  Activity
} from "lucide-react"
import { MarketResearchAIService, MarketResearchData, MarketResearchInsight, IndustryData, AICompetitorAnalysis } from "@/lib/market-research-ai-service"
import { MarketResearchDashboard } from "@/components/startup/market-research-dashboard"

export default function EnhancedMarketResearchPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(false)
  const [showAIDialog, setShowAIDialog] = useState(false)

  const [marketResearchData, setMarketResearchData] = useState<MarketResearchData>({
    industry: "",
    region: "",
    targetAudience: "",
    competitors: [
      {
        id: "1",
        name: "Competitor A",
        website: "https://competitora.com",
        strengths: ["Strong brand presence", "Large customer base", "Advanced technology"],
        weaknesses: ["High pricing", "Poor customer service", "Limited features"],
        marketShare: 25,
        pricing: "Premium",
        targetMarket: "Enterprise",
        differentiation: "Focus on user experience and innovation"
      }
    ],
    marketSize: {
      totalAddressableMarket: 1000000000,
      serviceableAddressableMarket: 500000000,
      serviceableObtainableMarket: 100000000,
      marketGrowthRate: 15,
      marketTrends: [
        "Increasing adoption of digital solutions",
        "Growing demand for personalized services",
        "Rising focus on sustainability"
      ]
    },
    customerInsights: [
      {
        id: "1",
        segment: "Enterprise Customers",
        painPoints: ["Complex integration", "High costs", "Long implementation time"],
        preferences: ["Scalability", "Security", "24/7 support"],
        willingnessToPay: 2500,
        purchaseBehavior: "Long sales cycle, multiple stakeholders"
      }
    ],
    trends: [
      {
        id: "1",
        trend: "AI/ML Integration",
        impact: "high",
        timeframe: "1-2 years",
        description: "Increasing adoption of AI/ML in business processes",
        opportunities: ["Automation", "Personalization", "Predictive Analytics"]
      }
    ],
    surveys: [
      {
        id: "1",
        title: "Customer Pain Points Survey",
        questions: [
          "What are your biggest challenges in [industry]?",
          "How much would you pay for a solution to these problems?",
          "What features are most important to you?"
        ],
        responses: 45,
        completionRate: 78
      }
    ]
  })

  const [aiResults, setAiResults] = useState<{
    insights: MarketResearchInsight[]
    industryAnalysis: IndustryData
    aiRecommendations: string[]
    competitiveAnalysis: AICompetitorAnalysis[]
    marketOpportunities: string[]
  } | null>(null)

  const marketResearchAIService = MarketResearchAIService.getInstance()

  useEffect(() => {
    if (marketResearchData.industry) {
      generateAIAnalysis()
    }
  }, [marketResearchData])

  const generateAIAnalysis = async () => {
    if (!marketResearchData.industry) return

    setIsLoading(true)
    try {
      const results = await marketResearchAIService.analyzeMarketResearch(marketResearchData)
      setAiResults(results)
    } catch (error) {
      console.error('Error generating market research analysis:', error)
      toast({
        title: "Error",
        description: "Failed to generate market research analysis. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSimpleChange = (field: string, value: any) => {
    setMarketResearchData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const addCompetitor = () => {
    const newCompetitor = {
      id: Date.now().toString(),
      name: `Competitor ${marketResearchData.competitors.length + 1}`,
      website: "",
      strengths: [],
      weaknesses: [],
      marketShare: 0,
      pricing: "",
      targetMarket: "",
      differentiation: ""
    }
    setMarketResearchData(prev => ({
      ...prev,
      competitors: [...prev.competitors, newCompetitor]
    }))
  }

  const updateCompetitor = (id: string, field: string, value: any) => {
    setMarketResearchData(prev => ({
      ...prev,
      competitors: prev.competitors.map(comp => 
        comp.id === id ? { ...comp, [field]: value } : comp
      )
    }))
  }

  const removeCompetitor = (id: string) => {
    setMarketResearchData(prev => ({
      ...prev,
      competitors: prev.competitors.filter(comp => comp.id !== id)
    }))
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
          <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8">
          <Link href="/startup" className="flex items-center text-[#0F7377] hover:underline mb-4">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Startup Resources
          </Link>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-4">AI-Enhanced Market Research</h1>
              <p className="text-[#334155] max-w-3xl">
                Leverage AI-powered market intelligence to research your market, analyze competitors, and validate your business ideas with data-driven insights.
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>AI-Enhanced Market Research</CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setShowAIDialog(true)}
                    disabled={isLoading}
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    {isLoading ? "Analyzing..." : "AI Analysis"}
                  </Button>
                </div>
                <CardDescription>
                  Comprehensive market research powered by AI with competitive intelligence and strategic insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-4 mb-8">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="competitive">Competitive</TabsTrigger>
                    <TabsTrigger value="insights">AI Insights</TabsTrigger>
                    <TabsTrigger value="data">Data Input</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6">
                    {aiResults && (
                      <MarketResearchDashboard
                        insights={aiResults.insights}
                        industryAnalysis={aiResults.industryAnalysis}
                        aiRecommendations={aiResults.aiRecommendations}
                        competitiveAnalysis={aiResults.competitiveAnalysis}
                        marketOpportunities={aiResults.marketOpportunities}
                        isLoading={isLoading}
                      />
                    )}
                  </TabsContent>

                  <TabsContent value="competitive" className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Competitive Analysis</h3>
                        <Button variant="outline" size="sm" onClick={addCompetitor}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Competitor
                        </Button>
                      </div>

                      {marketResearchData.competitors.map((competitor, index) => (
                        <Card key={competitor.id}>
                          <CardHeader>
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="flex items-center space-x-2">
                                  <Shield className="h-5 w-5" />
                                  <span>Competitor {index + 1}</span>
                                </CardTitle>
                                <CardDescription>Analyze competitor strengths, weaknesses, and market position</CardDescription>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeCompetitor(competitor.id)}
                                className="h-8 w-8 text-destructive"
                                disabled={marketResearchData.competitors.length <= 1}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Company Name</Label>
                                <Input
                                  value={competitor.name}
                                  onChange={(e) => updateCompetitor(competitor.id, "name", e.target.value)}
                                  placeholder="Competitor name"
                                />
                              </div>
                              <div>
                                <Label>Website</Label>
                                <Input
                                  value={competitor.website}
                                  onChange={(e) => updateCompetitor(competitor.id, "website", e.target.value)}
                                  placeholder="https://competitor.com"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                              <div>
                                <Label>Market Share (%)</Label>
                                <Input
                                  type="number"
                                  value={competitor.marketShare}
                                  onChange={(e) => updateCompetitor(competitor.id, "marketShare", Number(e.target.value))}
                                  placeholder="0"
                                />
                              </div>
                              <div>
                                <Label>Pricing Strategy</Label>
                                <Select
                                  value={competitor.pricing}
                                  onValueChange={(value) => updateCompetitor(competitor.id, "pricing", value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select pricing" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Premium">Premium</SelectItem>
                                    <SelectItem value="Mid-market">Mid-market</SelectItem>
                                    <SelectItem value="Budget">Budget</SelectItem>
                                    <SelectItem value="Freemium">Freemium</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label>Target Market</Label>
                                <Select
                                  value={competitor.targetMarket}
                                  onValueChange={(value) => updateCompetitor(competitor.id, "targetMarket", value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select market" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Enterprise">Enterprise</SelectItem>
                                    <SelectItem value="SMB">SMB</SelectItem>
                                    <SelectItem value="Consumer">Consumer</SelectItem>
                                    <SelectItem value="B2B">B2B</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <div>
                              <Label>Key Differentiation</Label>
                              <Textarea
                                value={competitor.differentiation}
                                onChange={(e) => updateCompetitor(competitor.id, "differentiation", e.target.value)}
                                placeholder="What makes this competitor unique?"
                                rows={3}
                              />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="insights" className="space-y-6">
                    {aiResults?.insights && (
                      <div className="space-y-4">
                        {aiResults.insights.map((insight, index) => (
                          <Card key={index} className="border">
                            <CardHeader>
                              <div className="flex justify-between items-start">
                                <div className="flex items-center space-x-2">
                                  {insight.type === 'market' && <Globe className="h-5 w-5 text-blue-500" />}
                                  {insight.type === 'competitive' && <Shield className="h-5 w-5 text-orange-500" />}
                                  {insight.type === 'customer' && <Users className="h-5 w-5 text-green-500" />}
                                  <CardTitle>{insight.title}</CardTitle>
                                </div>
                                <Badge variant="outline">{insight.confidence}% Confidence</Badge>
                              </div>
                              <CardDescription>{insight.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-4">
                                <div>
                                  <Label className="text-sm font-medium">Key Metrics</Label>
                                  <div className="grid grid-cols-3 gap-4 mt-2">
                                    {insight.dataPoints.map((point, idx) => (
                                      <div key={idx} className="text-center">
                                        <div className="text-lg font-semibold">{point.value}</div>
                                        <div className="text-xs text-gray-500">{point.label}</div>
                                        <div className="text-xs text-gray-400">{point.unit}</div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Recommendations</Label>
                                  <ul className="mt-2 space-y-1">
                                    {insight.recommendations.map((rec, idx) => (
                                      <li key={idx} className="flex items-start space-x-2 text-sm">
                                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                        <span>{rec}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="data" className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="industry">Industry*</Label>
                        <Select
                          value={marketResearchData.industry}
                          onValueChange={(value) => handleSimpleChange("industry", value)}
                        >
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
                        <Label htmlFor="region">Target Region</Label>
                        <Input
                          id="region"
                          value={marketResearchData.region}
                          onChange={(e) => handleSimpleChange("region", e.target.value)}
                          placeholder="e.g. North America, Europe, Asia-Pacific"
                        />
                      </div>

                      <div>
                        <Label htmlFor="targetAudience">Target Audience</Label>
                        <Textarea
                          id="targetAudience"
                          value={marketResearchData.targetAudience}
                          onChange={(e) => handleSimpleChange("targetAudience", e.target.value)}
                          placeholder="Describe your target audience and customer segments"
                          rows={3}
                        />
                      </div>

                      <div>
                        <Label>Market Size Data</Label>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                          <div>
                            <Label className="text-sm">Total Addressable Market (TAM)</Label>
                            <div className="relative mt-1">
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                                $
                              </span>
                              <Input
                                type="number"
                                className="pl-8"
                                value={marketResearchData.marketSize.totalAddressableMarket}
                                onChange={(e) => handleSimpleChange("marketSize", {
                                  ...marketResearchData.marketSize,
                                  totalAddressableMarket: Number(e.target.value) || 0
                                })}
                                placeholder="0"
                              />
                            </div>
                          </div>
                          <div>
                            <Label className="text-sm">Serviceable Addressable Market (SAM)</Label>
                            <div className="relative mt-1">
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                                $
                              </span>
                              <Input
                                type="number"
                                className="pl-8"
                                value={marketResearchData.marketSize.serviceableAddressableMarket}
                                onChange={(e) => handleSimpleChange("marketSize", {
                                  ...marketResearchData.marketSize,
                                  serviceableAddressableMarket: Number(e.target.value) || 0
                                })}
                                placeholder="0"
                              />
                            </div>
                          </div>
                          <div>
                            <Label className="text-sm">Serviceable Obtainable Market (SOM)</Label>
                            <div className="relative mt-1">
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                                $
                              </span>
                              <Input
                                type="number"
                                className="pl-8"
                                value={marketResearchData.marketSize.serviceableObtainableMarket}
                                onChange={(e) => handleSimpleChange("marketSize", {
                                  ...marketResearchData.marketSize,
                                  serviceableObtainableMarket: Number(e.target.value) || 0
                                })}
                                placeholder="0"
                              />
                            </div>
                          </div>
                          <div>
                            <Label className="text-sm">Market Growth Rate (%)</Label>
                            <Input
                              type="number"
                              value={marketResearchData.marketSize.marketGrowthRate}
                              onChange={(e) => handleSimpleChange("marketSize", {
                                ...marketResearchData.marketSize,
                                marketGrowthRate: Number(e.target.value) || 0
                              })}
                              placeholder="0"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Market Intelligence</CardTitle>
                <CardDescription>AI-powered market analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {aiResults?.industryAnalysis && (
                  <>
                    <div>
                      <div className="text-sm font-medium">Industry</div>
                      <div className="text-lg font-bold">{aiResults.industryAnalysis.industry}</div>
                    </div>

                    <div>
                      <div className="text-sm font-medium">Market Size</div>
                      <div className="text-lg font-bold">
                        ${(aiResults.industryAnalysis.marketSize / 1000000000).toFixed(1)}B
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium">Growth Rate</div>
                      <div className="text-lg font-bold">{aiResults.industryAnalysis.growthRate}%</div>
                    </div>

                    <div>
                      <div className="text-sm font-medium">Competition Level</div>
                      <Badge variant="outline" className="capitalize">
                        {aiResults.industryAnalysis.competitionLevel}
                      </Badge>
                    </div>

                    <div>
                      <div className="text-sm font-medium mb-2">Key Trends</div>
                      <div className="space-y-1">
                        {aiResults.industryAnalysis.keyTrends.slice(0, 3).map((trend, index) => (
                          <div key={index} className="flex items-start space-x-2 text-sm">
                            <TrendingUp className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{trend}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium mb-2">Opportunities</div>
                      <div className="space-y-1">
                        {aiResults.marketOpportunities.slice(0, 2).map((opportunity, index) => (
                          <div key={index} className="flex items-start space-x-2 text-sm">
                            <Lightbulb className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span>{opportunity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <Button variant="secondary" className="w-full" onClick={() => setShowAIDialog(true)}>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate AI Analysis
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {showAIDialog && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <Card className="max-w-md w-full">
              <CardHeader>
                <CardTitle>AI Market Research Analysis</CardTitle>
                <CardDescription>
                  Our AI is analyzing your market data and generating comprehensive insights.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm">Analyzing market conditions...</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-sm">Generating competitive analysis...</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                    <span className="text-sm">Identifying market opportunities...</span>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowAIDialog(false)}>
                    Close
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    )
}