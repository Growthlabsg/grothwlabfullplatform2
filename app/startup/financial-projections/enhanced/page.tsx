"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  ChevronLeft, 
  Plus, 
  Trash2, 
  Download, 
  Save, 
  Share2, 
  Sparkles, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  CheckCircle,
  Info,
  BarChart3,
  PieChart,
  LineChart,
  Target,
  DollarSign,
  Users,
  Calendar,
  Zap
} from "lucide-react"
import { FinancialAIService, FinancialData, FinancialProjection, FinancialScenario, AIFinancialInsight, MarketAnalysis } from "@/lib/financial-ai-service"

export default function EnhancedFinancialProjectionsPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("overview")
  const [projectionYears, setProjectionYears] = useState(5)
  const [isLoading, setIsLoading] = useState(false)
  const [showAIDialog, setShowAIDialog] = useState(false)

  const [financialData, setFinancialData] = useState<FinancialData>({
    companyName: "",
    industry: "",
    startDate: "",
    revenueStreams: [
      {
        id: "stream1",
        name: "Product/Service 1",
        pricePerUnit: 0,
        unitsSoldMonthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        growthRate: 5,
      },
    ],
    fixedCosts: [
      { id: "fixed1", name: "Rent", monthlyAmount: 0 },
      { id: "fixed2", name: "Salaries", monthlyAmount: 0 },
      { id: "fixed3", name: "Insurance", monthlyAmount: 0 },
    ],
    variableCosts: [
      {
        id: "var1",
        name: "Cost of Goods Sold",
        percentOfRevenue: 30,
        minimumMonthlyCost: 0,
      },
    ],
    oneTimeCosts: [{ id: "onetime1", name: "Equipment", amount: 0, month: 1, year: 1 }],
    initialInvestment: 0,
    additionalFunding: [{ id: "funding1", name: "Seed Round", amount: 0, month: 1, year: 1 }],
    monthlyCustomerGrowthRate: 5,
    churnRate: 2,
    averageRevenuePerCustomer: 0,
    taxRate: 20,
    includeInflation: false,
    inflationRate: 2,
    discountRate: 10,
  })

  const [aiResults, setAiResults] = useState<{
    projections: FinancialProjection[]
    scenarios: FinancialScenario[]
    insights: AIFinancialInsight[]
    marketAnalysis: MarketAnalysis
  } | null>(null)

  const financialAIService = FinancialAIService.getInstance()

  useEffect(() => {
    if (financialData.companyName && financialData.industry) {
      generateAIProjections()
    }
  }, [financialData, projectionYears])

  const generateAIProjections = async () => {
    if (!financialData.companyName || !financialData.industry) return

    setIsLoading(true)
    try {
      const results = await financialAIService.generateFinancialProjections(financialData, projectionYears)
      setAiResults(results)
    } catch (error) {
      console.error('Error generating projections:', error)
      toast({
        title: "Error",
        description: "Failed to generate financial projections. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSimpleChange = (field: string, value: any) => {
    setFinancialData((prev) => ({
      ...prev,
      [field]: value,
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

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`
  }

  const getImpactIcon = (impact: 'positive' | 'negative' | 'neutral') => {
    switch (impact) {
      case 'positive':
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case 'negative':
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <Info className="h-4 w-4 text-blue-500" />
    }
  }

  const getImpactColor = (impact: 'positive' | 'negative' | 'neutral') => {
    switch (impact) {
      case 'positive':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'negative':
        return 'text-red-600 bg-red-50 border-red-200'
      default:
        return 'text-blue-600 bg-blue-50 border-blue-200'
    }
  }

  const calculateSummaryMetrics = () => {
    if (!aiResults) return null

    const projections = aiResults.projections
    const totalRevenue = projections.reduce((sum, p) => sum + p.revenue, 0)
    const totalExpenses = projections.reduce((sum, p) => sum + p.expenses, 0)
    const totalCashFlow = projections.reduce((sum, p) => sum + p.cashFlow, 0)
    const avgProfitMargin = projections.reduce((sum, p) => sum + p.profitMargin, 0) / projections.length
    const negativeCashFlowMonths = projections.filter(p => p.cashFlow < 0).length
    const maxRunway = Math.max(...projections.map(p => p.runway))

    return {
      totalRevenue,
      totalExpenses,
      totalCashFlow,
      avgProfitMargin,
      negativeCashFlowMonths,
      maxRunway
    }
  }

  const summaryMetrics = calculateSummaryMetrics()

  return (
          <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8">
          <Link href="/startup" className="flex items-center text-[#0F7377] hover:underline mb-4">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Startup Resources
          </Link>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-4">AI-Enhanced Financial Projections</h1>
              <p className="text-[#334155] max-w-3xl">
                Leverage AI-driven insights to create comprehensive financial projections with scenario analysis, 
                market intelligence, and data-driven recommendations for your startup's financial future.
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
                  <CardTitle>AI-Enhanced Financial Projections</CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setShowAIDialog(true)}
                    disabled={isLoading}
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    {isLoading ? "Analyzing..." : "AI Insights"}
                  </Button>
                </div>
                <CardDescription>
                  Comprehensive financial analysis powered by AI with market intelligence and scenario planning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <Label>Projection Period (Years)</Label>
                  <div className="flex items-center space-x-4 mt-2">
                    {[1, 3, 5].map((years) => (
                      <Button
                        key={years}
                        variant={projectionYears === years ? "default" : "outline"}
                        onClick={() => setProjectionYears(years)}
                        className={projectionYears === years ? "bg-[#0F7377] hover:bg-[#0F7377]/90" : ""}
                      >
                        {years} Year{years > 1 ? 's' : ''}
                      </Button>
                    ))}
                  </div>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-4 mb-8">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
                    <TabsTrigger value="insights">AI Insights</TabsTrigger>
                    <TabsTrigger value="data">Data Input</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6">
                    {summaryMetrics && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-2">
                              <DollarSign className="h-4 w-4 text-green-500" />
                              <span className="text-sm font-medium">Total Revenue</span>
                            </div>
                            <div className="text-2xl font-bold mt-2">
                              {formatCurrency(summaryMetrics.totalRevenue)}
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-2">
                              <Target className="h-4 w-4 text-blue-500" />
                              <span className="text-sm font-medium">Profit Margin</span>
                            </div>
                            <div className="text-2xl font-bold mt-2">
                              {formatPercentage(summaryMetrics.avgProfitMargin)}
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4 text-orange-500" />
                              <span className="text-sm font-medium">Cash Flow</span>
                            </div>
                            <div className="text-2xl font-bold mt-2">
                              {formatCurrency(summaryMetrics.totalCashFlow)}
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-2">
                              <Zap className="h-4 w-4 text-purple-500" />
                              <span className="text-sm font-medium">Runway</span>
                            </div>
                            <div className="text-2xl font-bold mt-2">
                              {summaryMetrics.maxRunway.toFixed(1)} months
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}

                    {aiResults && (
                      <div className="space-y-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                              <BarChart3 className="h-5 w-5" />
                              Revenue & Expenses Trend
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                              <div className="text-center">
                                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                                <p className="text-gray-500">Revenue & Expenses Chart</p>
                                <p className="text-sm text-gray-400">Interactive chart showing monthly trends</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                              <LineChart className="h-5 w-5" />
                              Cash Flow Projection
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                              <div className="text-center">
                                <LineChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                                <p className="text-gray-500">Cash Flow Chart</p>
                                <p className="text-sm text-gray-400">Cumulative cash flow over time</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="scenarios" className="space-y-6">
                    {aiResults?.scenarios && (
                      <div className="space-y-4">
                        {aiResults.scenarios.map((scenario) => (
                          <Card key={scenario.id}>
                            <CardHeader>
                              <div className="flex justify-between items-start">
                                <div>
                                  <CardTitle className="flex items-center space-x-2">
                                    {scenario.id === 'best-case' && <TrendingUp className="h-5 w-5 text-green-500" />}
                                    {scenario.id === 'most-likely' && <Target className="h-5 w-5 text-blue-500" />}
                                    {scenario.id === 'worst-case' && <AlertTriangle className="h-5 w-5 text-red-500" />}
                                    <span>{scenario.name}</span>
                                  </CardTitle>
                                  <CardDescription>{scenario.description}</CardDescription>
                                </div>
                                <Badge variant="outline">{scenario.probability}% Probability</Badge>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="grid grid-cols-3 gap-4">
                                <div>
                                  <Label className="text-sm">Revenue Multiplier</Label>
                                  <div className="text-lg font-semibold">{scenario.revenueMultiplier}x</div>
                                </div>
                                <div>
                                  <Label className="text-sm">Cost Multiplier</Label>
                                  <div className="text-lg font-semibold">{scenario.costMultiplier}x</div>
                                </div>
                                <div>
                                  <Label className="text-sm">Growth Rate</Label>
                                  <div className="text-lg font-semibold">{scenario.growthRateMultiplier}x</div>
                                </div>
                              </div>
                              <div className="mt-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>Competition:</span>
                                  <Badge variant="outline" className="capitalize">{scenario.marketConditions.competition}</Badge>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Market Growth:</span>
                                  <Badge variant="outline" className="capitalize">{scenario.marketConditions.marketGrowth}</Badge>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Regulatory:</span>
                                  <Badge variant="outline" className="capitalize">{scenario.marketConditions.regulatoryEnvironment}</Badge>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="insights" className="space-y-6">
                    {aiResults?.insights && (
                      <div className="space-y-4">
                        {aiResults.insights.map((insight, index) => (
                          <Card key={index} className={`border ${getImpactColor(insight.impact)}`}>
                            <CardHeader>
                              <div className="flex justify-between items-start">
                                <div className="flex items-center space-x-2">
                                  {getImpactIcon(insight.impact)}
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
                        <Label htmlFor="companyName">Company Name*</Label>
                        <Input
                          id="companyName"
                          value={financialData.companyName}
                          onChange={(e) => handleSimpleChange("companyName", e.target.value)}
                          placeholder="e.g. TechNova Solutions"
                        />
                      </div>

                      <div>
                        <Label htmlFor="industry">Industry*</Label>
                        <Select
                          value={financialData.industry}
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
                        <Label htmlFor="initialInvestment">Initial Investment*</Label>
                        <div className="relative mt-1">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                            $
                          </span>
                          <Input
                            id="initialInvestment"
                            type="number"
                            className="pl-8"
                            value={financialData.initialInvestment}
                            onChange={(e) =>
                              handleSimpleChange("initialInvestment", Number.parseFloat(e.target.value) || 0)
                            }
                            placeholder="0"
                          />
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
                {aiResults?.marketAnalysis && (
                  <>
                    <div>
                      <div className="text-sm font-medium">Industry</div>
                      <div className="text-lg font-bold">{aiResults.marketAnalysis.industry}</div>
                    </div>

                    <div>
                      <div className="text-sm font-medium">Market Size</div>
                      <div className="text-lg font-bold">
                        ${(aiResults.marketAnalysis.marketSize / 1000000000).toFixed(1)}B
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium">Growth Rate</div>
                      <div className="text-lg font-bold">{aiResults.marketAnalysis.growthRate}%</div>
                    </div>

                    <div>
                      <div className="text-sm font-medium">Competition Level</div>
                      <Badge variant="outline" className="capitalize">
                        {aiResults.marketAnalysis.competitionLevel}
                      </Badge>
                    </div>

                    <div>
                      <div className="text-sm font-medium mb-2">Key Trends</div>
                      <div className="space-y-1">
                        {aiResults.marketAnalysis.keyTrends.slice(0, 3).map((trend, index) => (
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
                        {aiResults.marketAnalysis.opportunities.slice(0, 2).map((opportunity, index) => (
                          <div key={index} className="flex items-start space-x-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span>{opportunity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <Button variant="secondary" className="w-full" onClick={() => setShowAIDialog(true)}>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate AI Insights
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {showAIDialog && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <Card className="max-w-md w-full">
              <CardHeader>
                <CardTitle>AI Financial Analysis</CardTitle>
                <CardDescription>
                  Our AI is analyzing your financial data and market conditions to provide comprehensive insights.
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
                    <span className="text-sm">Generating scenario analysis...</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                    <span className="text-sm">Calculating risk metrics...</span>
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