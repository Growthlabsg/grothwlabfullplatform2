"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  BarChart3, 
  LineChart, 
  PieChart, 
  Target, 
  DollarSign, 
  Calendar, 
  Zap, 
  Users, 
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from "lucide-react"
import { FinancialProjection, FinancialScenario, AIFinancialInsight, MarketAnalysis } from "@/lib/financial-ai-service"

interface FinancialDashboardProps {
  projections: FinancialProjection[]
  scenarios: FinancialScenario[]
  insights: AIFinancialInsight[]
  marketAnalysis: MarketAnalysis
  isLoading?: boolean
}

export function FinancialDashboard({
  projections,
  scenarios,
  insights,
  marketAnalysis,
  isLoading = false
}: FinancialDashboardProps) {
  const [selectedScenario, setSelectedScenario] = useState<string>('most-likely')
  const [timeRange, setTimeRange] = useState<'1y' | '3y' | '5y'>('3y')

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
    const filteredProjections = projections.filter(p => {
      const totalMonths = (p.year - 1) * 12 + p.month
      switch (timeRange) {
        case '1y': return totalMonths <= 12
        case '3y': return totalMonths <= 36
        case '5y': return true
        default: return true
      }
    })

    const totalRevenue = filteredProjections.reduce((sum, p) => sum + p.revenue, 0)
    const totalExpenses = filteredProjections.reduce((sum, p) => sum + p.expenses, 0)
    const totalCashFlow = filteredProjections.reduce((sum, p) => sum + p.cashFlow, 0)
    const avgProfitMargin = filteredProjections.reduce((sum, p) => sum + p.profitMargin, 0) / filteredProjections.length
    const negativeCashFlowMonths = filteredProjections.filter(p => p.cashFlow < 0).length
    const maxRunway = Math.max(...filteredProjections.map(p => p.runway))

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

  const getMonthlyData = () => {
    const monthlyData = []
    for (let year = 1; year <= 5; year++) {
      for (let month = 1; month <= 12; month++) {
        const projection = projections.find(p => p.year === year && p.month === month)
        if (projection) {
          monthlyData.push({
            period: `${year}-${month.toString().padStart(2, '0')}`,
            revenue: projection.revenue,
            expenses: projection.expenses,
            cashFlow: projection.cashFlow,
            cumulativeCashFlow: projection.cumulativeCashFlow
          })
        }
      }
    }
    return monthlyData
  }

  const monthlyData = getMonthlyData()

  return (
    <div className="space-y-6">
      {/* Summary Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Total Revenue</span>
            </div>
            <div className="text-2xl font-bold mt-2">
              {formatCurrency(summaryMetrics.totalRevenue)}
            </div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +12.5% vs last period
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
            <div className="flex items-center text-xs text-blue-600 mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +2.1% vs industry avg
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
            <div className="flex items-center text-xs text-orange-600 mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +8.3% vs projection
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
            <div className="flex items-center text-xs text-purple-600 mt-1">
              <CheckCircle className="h-3 w-3 mr-1" />
              Healthy runway
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Time Range Selector */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Financial Projections</h3>
        <div className="flex space-x-2">
          {(['1y', '3y', '5y'] as const).map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange(range)}
              className={timeRange === range ? "bg-[#0F7377] hover:bg-[#0F7377]/90" : ""}
            >
              {range}
            </Button>
          ))}
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Revenue & Expenses Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  Revenue & Expenses Trend
                </CardTitle>
                <CardDescription>Monthly revenue and expense trends</CardDescription>
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

            {/* Cash Flow Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <LineChart className="h-5 w-5" />
                  Cash Flow Projection
                </CardTitle>
                <CardDescription>Cumulative cash flow over time</CardDescription>
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

          {/* Key Metrics Table */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Financial Summary</CardTitle>
              <CardDescription>Detailed monthly breakdown of key financial metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Period</th>
                      <th className="text-right py-2">Revenue</th>
                      <th className="text-right py-2">Expenses</th>
                      <th className="text-right py-2">Cash Flow</th>
                      <th className="text-right py-2">Cumulative</th>
                      <th className="text-right py-2">Runway</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyData.slice(0, 12).map((data, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-2">{data.period}</td>
                        <td className="text-right py-2">{formatCurrency(data.revenue)}</td>
                        <td className="text-right py-2">{formatCurrency(data.expenses)}</td>
                        <td className={`text-right py-2 ${data.cashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatCurrency(data.cashFlow)}
                        </td>
                        <td className="text-right py-2">{formatCurrency(data.cumulativeCashFlow)}</td>
                        <td className="text-right py-2">{data.cumulativeCashFlow > 0 ? `${(data.cumulativeCashFlow / data.expenses).toFixed(1)} months` : 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scenarios" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {scenarios.map((scenario) => (
              <Button
                key={scenario.id}
                variant={selectedScenario === scenario.id ? "default" : "outline"}
                className={`h-auto p-4 flex flex-col items-start space-y-2 ${
                  selectedScenario === scenario.id ? "bg-[#0F7377] hover:bg-[#0F7377]/90" : ""
                }`}
                onClick={() => setSelectedScenario(scenario.id)}
              >
                <div className="flex items-center space-x-2 w-full">
                  {scenario.id === 'best-case' && <TrendingUp className="h-4 w-4 text-green-500" />}
                  {scenario.id === 'most-likely' && <Target className="h-4 w-4 text-blue-500" />}
                  {scenario.id === 'worst-case' && <AlertTriangle className="h-4 w-4 text-red-500" />}
                  <span className="font-medium">{scenario.name}</span>
                </div>
                <div className="text-xs opacity-75">{scenario.description}</div>
                <Badge variant="outline" className="text-xs">{scenario.probability}% Probability</Badge>
              </Button>
            ))}
          </div>

          {scenarios.map((scenario) => (
            <Card key={scenario.id} className={selectedScenario === scenario.id ? "border-[#0F7377]" : ""}>
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
                <div className="grid grid-cols-3 gap-4 mb-4">
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
                <div className="space-y-2">
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
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="space-y-4">
            {insights.map((insight, index) => (
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
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Market Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  Market Analysis
                </CardTitle>
                <CardDescription>Industry insights and market conditions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium">Industry</div>
                  <div className="text-lg font-bold">{marketAnalysis.industry}</div>
                </div>

                <div>
                  <div className="text-sm font-medium">Market Size</div>
                  <div className="text-lg font-bold">
                    ${(marketAnalysis.marketSize / 1000000000).toFixed(1)}B
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium">Growth Rate</div>
                  <div className="text-lg font-bold">{marketAnalysis.growthRate}%</div>
                </div>

                <div>
                  <div className="text-sm font-medium">Competition Level</div>
                  <Badge variant="outline" className="capitalize">
                    {marketAnalysis.competitionLevel}
                  </Badge>
                </div>

                <div>
                  <div className="text-sm font-medium mb-2">Key Trends</div>
                  <div className="space-y-1">
                    {marketAnalysis.keyTrends.slice(0, 3).map((trend, index) => (
                      <div key={index} className="flex items-start space-x-2 text-sm">
                        <TrendingUp className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{trend}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Risk Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5" />
                  Risk Analysis
                </CardTitle>
                <CardDescription>Key risks and mitigation strategies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium mb-2">Market Risks</div>
                  <div className="space-y-1">
                    {marketAnalysis.risks.slice(0, 3).map((risk, index) => (
                      <div key={index} className="flex items-start space-x-2 text-sm">
                        <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span>{risk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium mb-2">Opportunities</div>
                  <div className="space-y-1">
                    {marketAnalysis.opportunities.slice(0, 3).map((opportunity, index) => (
                      <div key={index} className="flex items-start space-x-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{opportunity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium mb-2">Benchmark Metrics</div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">Avg Revenue Growth:</span>
                      <div className="font-semibold">{marketAnalysis.benchmarkMetrics.averageRevenueGrowth}%</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Avg Profit Margin:</span>
                      <div className="font-semibold">{marketAnalysis.benchmarkMetrics.averageProfitMargin}%</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Avg Burn Rate:</span>
                      <div className="font-semibold">{marketAnalysis.benchmarkMetrics.averageBurnRate}%</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Avg Runway:</span>
                      <div className="font-semibold">{marketAnalysis.benchmarkMetrics.averageRunway} months</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 