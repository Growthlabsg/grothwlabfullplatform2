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
} from "lucide-react"

export default function MarketResearchPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("competitor-analysis")
  const [showAIDialog, setShowAIDialog] = useState(false)

  // Competitor Analysis State
  const [competitors, setCompetitors] = useState([
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
  ])

  // Market Sizing State
  const [marketData, setMarketData] = useState({
    totalAddressableMarket: 1000000000,
    serviceableAddressableMarket: 500000000,
    serviceableObtainableMarket: 100000000,
    marketGrowthRate: 15,
    marketTrends: [
      "Increasing adoption of digital solutions",
      "Growing demand for personalized services",
      "Rising focus on sustainability"
    ]
  })

  // Customer Survey State
  const [surveys, setSurveys] = useState([
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
  ])

  // Trend Analysis State
  const [trends, setTrends] = useState([
    {
      id: "1",
      trend: "AI/ML Integration",
      impact: "High",
      timeframe: "1-2 years",
      description: "Increasing adoption of AI/ML in business processes",
      opportunities: ["Automation", "Personalization", "Predictive Analytics"]
    }
  ])

  const addCompetitor = () => {
    const newCompetitor = {
      id: Date.now().toString(),
      name: "",
      website: "",
      strengths: [],
      weaknesses: [],
      marketShare: 0,
      pricing: "",
      targetMarket: "",
      differentiation: ""
    }
    setCompetitors([...competitors, newCompetitor])
  }

  const updateCompetitor = (id: string, field: string, value: any) => {
    setCompetitors(competitors.map(comp => 
      comp.id === id ? { ...comp, [field]: value } : comp
    ))
  }

  const removeCompetitor = (id: string) => {
    setCompetitors(competitors.filter(comp => comp.id !== id))
  }

  const addSurvey = () => {
    const newSurvey = {
      id: Date.now().toString(),
      title: "",
      questions: [],
      responses: 0,
      completionRate: 0
    }
    setSurveys([...surveys, newSurvey])
  }

  const addTrend = () => {
    const newTrend = {
      id: Date.now().toString(),
      trend: "",
      impact: "Medium",
      timeframe: "1-2 years",
      description: "",
      opportunities: []
    }
    setTrends([...trends, newTrend])
  }

  const handleSave = () => {
    toast({
      title: "Research Saved",
      description: "Your market research data has been saved successfully.",
    })
  }

  const handleDownload = () => {
    toast({
      title: "Report Downloaded",
      description: "Market research report has been downloaded as PDF.",
    })
  }

  const handleShare = () => {
    toast({
      title: "Research Shared",
      description: "Market research has been shared with your team.",
    })
  }

  const handleAIAssist = () => {
    setShowAIDialog(true)
  }

  const calculateMarketMetrics = () => {
    const { totalAddressableMarket, serviceableAddressableMarket, serviceableObtainableMarket } = marketData
    return {
      tam: totalAddressableMarket,
      sam: serviceableAddressableMarket,
      som: serviceableObtainableMarket,
      penetrationRate: ((serviceableObtainableMarket / totalAddressableMarket) * 100).toFixed(1)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
          <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/startup" className="flex items-center text-[#0F7377] hover:underline mb-4">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Startup Resources
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Market Research Tools</h1>
              <p className="text-lg text-gray-600">
                Research your market, analyze competitors, and validate your business ideas
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave} variant="outline" className="border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377]/10">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button onClick={handleDownload} className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </Button>
              <Button onClick={handleShare} variant="outline" className="border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377]/10">
                <Share2 className="h-4 w-4 mr-2" />
                Share
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
                  <p className="text-sm text-gray-600">Competitors Analyzed</p>
                  <p className="text-2xl font-bold">{competitors.length}</p>
                </div>
                <Building className="h-8 w-8 text-[#0F7377]" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Market Size</p>
                  <p className="text-2xl font-bold">{formatCurrency(marketData.totalAddressableMarket)}</p>
                </div>
                <Globe className="h-8 w-8 text-[#0F7377]" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Surveys Created</p>
                  <p className="text-2xl font-bold">{surveys.length}</p>
                </div>
                <Users className="h-8 w-8 text-[#0F7377]" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Trends Identified</p>
                  <p className="text-2xl font-bold">{trends.length}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-[#0F7377]" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="competitor-analysis">Competitor Analysis</TabsTrigger>
            <TabsTrigger value="market-sizing">Market Sizing</TabsTrigger>
            <TabsTrigger value="customer-surveys">Customer Surveys</TabsTrigger>
            <TabsTrigger value="trend-analysis">Trend Analysis</TabsTrigger>
          </TabsList>

          {/* Competitor Analysis */}
          <TabsContent value="competitor-analysis" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Competitor Analysis</h2>
              <Button onClick={addCompetitor} className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Competitor
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {competitors.map((competitor, index) => (
                <Card key={competitor.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Competitor {index + 1}</CardTitle>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377]/10">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377]/10">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-red-500 text-red-500 hover:bg-red-50"
                          onClick={() => removeCompetitor(competitor.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Company Name</Label>
                        <Input 
                          value={competitor.name}
                          onChange={(e) => updateCompetitor(competitor.id, 'name', e.target.value)}
                          placeholder="Competitor name"
                        />
                      </div>
                      <div>
                        <Label>Website</Label>
                        <Input 
                          value={competitor.website}
                          onChange={(e) => updateCompetitor(competitor.id, 'website', e.target.value)}
                          placeholder="https://example.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label>Market Share (%)</Label>
                      <Input 
                        type="number"
                        value={competitor.marketShare}
                        onChange={(e) => updateCompetitor(competitor.id, 'marketShare', parseInt(e.target.value))}
                        placeholder="25"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Pricing Strategy</Label>
                        <Select value={competitor.pricing} onValueChange={(value) => updateCompetitor(competitor.id, 'pricing', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select pricing" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="premium">Premium</SelectItem>
                            <SelectItem value="mid-market">Mid-Market</SelectItem>
                            <SelectItem value="budget">Budget</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Target Market</Label>
                        <Select value={competitor.targetMarket} onValueChange={(value) => updateCompetitor(competitor.id, 'targetMarket', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select target market" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="enterprise">Enterprise</SelectItem>
                            <SelectItem value="sme">SME</SelectItem>
                            <SelectItem value="consumer">Consumer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label>Key Strengths</Label>
                      <Textarea 
                        value={competitor.strengths.join(', ')}
                        onChange={(e) => updateCompetitor(competitor.id, 'strengths', e.target.value.split(', '))}
                        placeholder="Enter strengths separated by commas"
                      />
                    </div>

                    <div>
                      <Label>Key Weaknesses</Label>
                      <Textarea 
                        value={competitor.weaknesses.join(', ')}
                        onChange={(e) => updateCompetitor(competitor.id, 'weaknesses', e.target.value.split(', '))}
                        placeholder="Enter weaknesses separated by commas"
                      />
                    </div>

                    <div>
                      <Label>Differentiation Strategy</Label>
                      <Textarea 
                        value={competitor.differentiation}
                        onChange={(e) => updateCompetitor(competitor.id, 'differentiation', e.target.value)}
                        placeholder="How does this competitor differentiate themselves?"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Market Sizing */}
          <TabsContent value="market-sizing" className="space-y-6">
            <h2 className="text-2xl font-bold">Market Sizing</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Market Metrics</CardTitle>
                  <CardDescription>Define your market size using the TAM, SAM, SOM framework</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Total Addressable Market (TAM)</Label>
                    <Input 
                      type="number"
                      value={marketData.totalAddressableMarket}
                      onChange={(e) => setMarketData({...marketData, totalAddressableMarket: parseInt(e.target.value)})}
                      placeholder="1000000000"
                    />
                    <p className="text-sm text-gray-500 mt-1">{formatCurrency(marketData.totalAddressableMarket)}</p>
                  </div>

                  <div>
                    <Label>Serviceable Addressable Market (SAM)</Label>
                    <Input 
                      type="number"
                      value={marketData.serviceableAddressableMarket}
                      onChange={(e) => setMarketData({...marketData, serviceableAddressableMarket: parseInt(e.target.value)})}
                      placeholder="500000000"
                    />
                    <p className="text-sm text-gray-500 mt-1">{formatCurrency(marketData.serviceableAddressableMarket)}</p>
                  </div>

                  <div>
                    <Label>Serviceable Obtainable Market (SOM)</Label>
                    <Input 
                      type="number"
                      value={marketData.serviceableObtainableMarket}
                      onChange={(e) => setMarketData({...marketData, serviceableObtainableMarket: parseInt(e.target.value)})}
                      placeholder="100000000"
                    />
                    <p className="text-sm text-gray-500 mt-1">{formatCurrency(marketData.serviceableObtainableMarket)}</p>
                  </div>

                  <div>
                    <Label>Market Growth Rate (%)</Label>
                    <Slider
                      value={[marketData.marketGrowthRate]}
                      onValueChange={(value) => setMarketData({...marketData, marketGrowthRate: value[0] || 0})}
                      max={50}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                    <p className="text-sm text-gray-500 mt-1">{marketData.marketGrowthRate}% annually</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Market Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>TAM</span>
                      <span className="font-bold">{formatCurrency(calculateMarketMetrics().tam)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>SAM</span>
                      <span className="font-bold">{formatCurrency(calculateMarketMetrics().sam)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>SOM</span>
                      <span className="font-bold">{formatCurrency(calculateMarketMetrics().som)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Penetration Rate</span>
                      <span className="font-bold">{calculateMarketMetrics().penetrationRate}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Market Trends</CardTitle>
                <CardDescription>Key trends affecting your market</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {marketData.marketTrends.map((trend, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-[#0F7377]" />
                      <span>{trend}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Customer Surveys */}
          <TabsContent value="customer-surveys" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Customer Surveys</h2>
              <Button onClick={addSurvey} className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                <Plus className="h-4 w-4 mr-2" />
                Create Survey
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {surveys.map((survey, index) => (
                <Card key={survey.id}>
                  <CardHeader>
                    <CardTitle>{survey.title || `Survey ${index + 1}`}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{survey.responses} responses</Badge>
                      <Badge variant="outline">{survey.completionRate}% completion</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label>Survey Title</Label>
                        <Input 
                          value={survey.title}
                          onChange={(e) => {
                            const newSurveys = [...surveys]
                            if (newSurveys[index]) {
                              newSurveys[index].title = e.target.value
                              setSurveys(newSurveys)
                            }
                          }}
                          placeholder="Enter survey title"
                        />
                      </div>
                      
                      <div>
                        <Label>Questions</Label>
                        <div className="space-y-2">
                          {survey.questions.map((question, qIndex) => (
                            <div key={qIndex} className="flex items-center gap-2">
                              <Textarea 
                                value={question}
                                  onChange={(e) => {
                                    const newSurveys = [...surveys]
                                    if (newSurveys[index] && (newSurveys[index] ? newSurveys[index].questions : undefined)[qIndex] !== undefined) {
                                      (newSurveys[index] ? newSurveys[index].questions : undefined)[qIndex] = e.target.value
                                      setSurveys(newSurveys)
                                    }
                                  }}
                                placeholder="Enter your question"
                                className="flex-1"
                              />
                              <Button size="sm" variant="outline" className="border-red-500 text-red-500 hover:bg-red-50">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377]/10"
                              onClick={() => {
                                const newSurveys = [...surveys]
                                if (newSurveys[index]) {
                                  (newSurveys[index] ? newSurveys[index].questions : undefined).push("")
                                  setSurveys(newSurveys)
                                }
                              }}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Question
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Trend Analysis */}
          <TabsContent value="trend-analysis" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Trend Analysis</h2>
              <Button onClick={addTrend} className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Trend
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {trends.map((trend, index) => (
                <Card key={trend.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{trend.trend || `Trend ${index + 1}`}</CardTitle>
                      <Badge className={
                        trend.impact === 'High' ? 'bg-red-100 text-red-800' :
                        trend.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }>
                        {trend.impact} Impact
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Trend Name</Label>
                      <Input 
                        value={trend.trend}
                          onChange={(e) => {
                            const newTrends = [...trends]
                            if (newTrends[index]) {
                              newTrends[index].trend = e.target.value
                              setTrends(newTrends)
                            }
                          }}
                        placeholder="Enter trend name"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Impact Level</Label>
                        <Select value={trend.impact}                         onValueChange={(value) => {
                          const newTrends = [...trends]
                          if (newTrends[index]) {
                            newTrends[index].impact = value
                            setTrends(newTrends)
                          }
                        }}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="High">High</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="Low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Timeframe</Label>
                        <Select value={trend.timeframe}                         onValueChange={(value) => {
                          const newTrends = [...trends]
                          if (newTrends[index]) {
                            newTrends[index].timeframe = value
                            setTrends(newTrends)
                          }
                        }}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0-6 months">0-6 months</SelectItem>
                            <SelectItem value="6-12 months">6-12 months</SelectItem>
                            <SelectItem value="1-2 years">1-2 years</SelectItem>
                            <SelectItem value="2+ years">2+ years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label>Description</Label>
                      <Textarea 
                        value={trend.description}
                        onChange={(e) => {
                          const newTrends = [...trends]
                          if (newTrends[index]) {
                            newTrends[index].description = e.target.value
                            setTrends(newTrends)
                          }
                        }}
                        placeholder="Describe this trend and its implications"
                      />
                    </div>

                    <div>
                      <Label>Opportunities</Label>
                      <Textarea 
                        value={trend.opportunities.join(', ')}
                        onChange={(e) => {
                          const newTrends = [...trends]
                          if (newTrends[index]) {
                            newTrends[index].opportunities = e.target.value.split(', ')
                            setTrends(newTrends)
                          }
                        }}
                        placeholder="Enter opportunities separated by commas"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* AI Assistance Dialog */}
        {showAIDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-2xl mx-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-[#0F7377]" />
                  AI Market Research Assistant
                </CardTitle>
                <CardDescription>
                  Get AI-powered insights and recommendations for your market research
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>What would you like to research?</Label>
                  <Textarea 
                    placeholder="Describe your market research needs..."
                    className="min-h-[100px]"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => setShowAIDialog(false)} variant="outline" className="border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377]/10">
                    Cancel
                  </Button>
                  <Button onClick={() => setShowAIDialog(false)} className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Get AI Insights
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    )
}
