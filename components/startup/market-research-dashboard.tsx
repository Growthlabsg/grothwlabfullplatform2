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
  Users, 
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Search,
  Globe,
  Building,
  Eye,
  Zap,
  Shield,
  Lightbulb
} from "lucide-react"
import { 
  MarketResearchInsight, 
  IndustryData, 
  AICompetitorAnalysis,
  MarketResearchData 
} from "@/lib/market-research-ai-service"

interface MarketResearchDashboardProps {
  insights: MarketResearchInsight[]
  industryAnalysis: IndustryData
  aiRecommendations: string[]
  competitiveAnalysis: AICompetitorAnalysis[]
  marketOpportunities: string[]
  isLoading?: boolean
}

export function MarketResearchDashboard({
  insights,
  industryAnalysis,
  aiRecommendations,
  competitiveAnalysis,
  marketOpportunities,
  isLoading = false
}: MarketResearchDashboardProps) {
  const [selectedInsight, setSelectedInsight] = useState<string>('market')
  const [activeTab, setActiveTab] = useState<'overview' | 'competitive' | 'insights' | 'opportunities'>('overview')

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

  const getCompetitionLevelColor = (level: 'low' | 'medium' | 'high') => {
    switch (level) {
      case 'low':
        return 'text-green-600 bg-green-50'
      case 'medium':
        return 'text-yellow-600 bg-yellow-50'
      case 'high':
        return 'text-red-600 bg-red-50'
    }
  }

  const getThreatLevelColor = (level: 'high' | 'medium' | 'low') => {
    switch (level) {
      case 'high':
        return 'text-red-600 bg-red-50'
      case 'medium':
        return 'text-yellow-600 bg-yellow-50'
      case 'low':
        return 'text-green-600 bg-green-50'
    }
  }

  return (
    <div className="space-y-6">
      {/* Summary Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Market Size</span>
            </div>
            <div className="text-2xl font-bold mt-2">
              ${(industryAnalysis.marketSize / 1000000000).toFixed(1)}B
            </div>
            <div className="flex items-center text-xs text-blue-600 mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              {industryAnalysis.growthRate}% growth
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Growth Rate</span>
            </div>
            <div className="text-2xl font-bold mt-2">
              {formatPercentage(industryAnalysis.growthRate)}
            </div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              Above average
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Building className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium">Competition</span>
            </div>
            <div className="text-2xl font-bold mt-2 capitalize">
              {industryAnalysis.competitionLevel}
            </div>
            <div className={`flex items-center text-xs mt-1 ${getCompetitionLevelColor(industryAnalysis.competitionLevel)}`}>
              <Eye className="h-3 w-3 mr-1" />
              Market concentration
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Lightbulb className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium">Opportunities</span>
            </div>
            <div className="text-2xl font-bold mt-2">
              {marketOpportunities.length}
            </div>
            <div className="flex items-center text-xs text-purple-600 mt-1">
              <Zap className="h-3 w-3 mr-1" />
              Identified
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="space-y-6">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="competitive">Competitive</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Industry Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  Industry Analysis
                </CardTitle>
                <CardDescription>Market intelligence and industry benchmarks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium">Industry</div>
                  <div className="text-lg font-bold">{industryAnalysis.industry}</div>
                </div>

                <div>
                  <div className="text-sm font-medium">Market Size</div>
                  <div className="text-lg font-bold">
                    ${(industryAnalysis.marketSize / 1000000000).toFixed(1)}B
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium">Growth Rate</div>
                  <div className="text-lg font-bold">{industryAnalysis.growthRate}%</div>
                </div>

                <div>
                  <div className="text-sm font-medium">Competition Level</div>
                  <Badge variant="outline" className={`capitalize ${getCompetitionLevelColor(industryAnalysis.competitionLevel)}`}>
                    {industryAnalysis.competitionLevel}
                  </Badge>
                </div>

                <div>
                  <div className="text-sm font-medium mb-2">Key Trends</div>
                  <div className="space-y-1">
                    {industryAnalysis.keyTrends.slice(0, 3).map((trend, index) => (
                      <div key={index} className="flex items-start space-x-2 text-sm">
                        <TrendingUp className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{trend}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Benchmark Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  Benchmark Metrics
                </CardTitle>
                <CardDescription>Industry performance benchmarks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium">Avg CAC</div>
                    <div className="text-lg font-bold">${industryAnalysis.benchmarkMetrics.averageCustomerAcquisitionCost}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Avg LTV</div>
                    <div className="text-lg font-bold">${industryAnalysis.benchmarkMetrics.averageCustomerLifetimeValue}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Avg Market Share</div>
                    <div className="text-lg font-bold">{industryAnalysis.benchmarkMetrics.averageMarketShare}%</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Avg Growth</div>
                    <div className="text-lg font-bold">{industryAnalysis.benchmarkMetrics.averageGrowthRate}%</div>
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium mb-2">Risks</div>
                  <div className="space-y-1">
                    {industryAnalysis.risks.slice(0, 3).map((risk, index) => (
                      <div key={index} className="flex items-start space-x-2 text-sm">
                        <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span>{risk}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="competitive" className="space-y-6">
          <div className="space-y-4">
            {competitiveAnalysis.map((analysis, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <Shield className="h-5 w-5" />
                        <span>Competitor {index + 1} Analysis</span>
                      </CardTitle>
                      <CardDescription>AI-powered competitive intelligence</CardDescription>
                    </div>
                    <Badge variant="outline">{analysis.confidence}% Confidence</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label className="text-sm">Position</Label>
                      <div className="text-lg font-semibold capitalize">{analysis.competitivePosition}</div>
                    </div>
                    <div>
                      <Label className="text-sm">Threat Level</Label>
                      <Badge variant="outline" className={`capitalize ${getThreatLevelColor(analysis.threatLevel)}`}>
                        {analysis.threatLevel}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Opportunities</Label>
                      <ul className="mt-2 space-y-1">
                        {analysis.opportunities.map((opportunity, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{opportunity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Risks</Label>
                      <ul className="mt-2 space-y-1">
                        {analysis.risks.map((risk, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-sm">
                            <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                            <span>{risk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Recommended Actions</Label>
                      <ul className="mt-2 space-y-1">
                        {analysis.recommendedActions.map((action, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-sm">
                            <Lightbulb className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span>{action}</span>
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

        <TabsContent value="opportunities" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Market Opportunities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="h-5 w-5" />
                  Market Opportunities
                </CardTitle>
                <CardDescription>AI-identified market opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {marketOpportunities.map((opportunity, index) => (
                    <div key={index} className="flex items-start space-x-2 p-3 bg-green-50 rounded-lg">
                      <Lightbulb className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{opportunity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5" />
                  AI Recommendations
                </CardTitle>
                <CardDescription>Strategic recommendations based on analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {aiRecommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-start space-x-2 p-3 bg-blue-50 rounded-lg">
                      <Zap className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{recommendation}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 