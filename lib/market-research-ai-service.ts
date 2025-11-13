export interface MarketResearchData {
  industry: string
  region: string
  targetAudience: string
  competitors: Competitor[]
  marketSize: MarketSizeData
  customerInsights: CustomerInsight[]
  trends: MarketTrend[]
  surveys: SurveyData[]
}

export interface Competitor {
  id: string
  name: string
  website: string
  strengths: string[]
  weaknesses: string[]
  marketShare: number
  pricing: string
  targetMarket: string
  differentiation: string 
  aiAnalysis?: AICompetitorAnalysis
}

export interface AICompetitorAnalysis {
  competitivePosition: 'leader' | 'challenger' | 'niche' | 'emerging'
  threatLevel: 'high' | 'medium' | 'low'
  opportunities: string[]
  risks: string[]
  recommendedActions: string[]
  confidence: number
}

export interface MarketSizeData {
  totalAddressableMarket: number
  serviceableAddressableMarket: number
  serviceableObtainableMarket: number
  marketGrowthRate: number
  marketTrends: string[]
  aiInsights?: AIMarketInsights
}

export interface AIMarketInsights {
  marketMaturity: 'emerging' | 'growing' | 'mature' | 'declining'
  entryBarriers: 'low' | 'medium' | 'high'
  growthPotential: 'high' | 'medium' | 'low'
  competitiveIntensity: 'low' | 'medium' | 'high'
  recommendations: string[]
  confidence: number
}

export interface CustomerInsight {
  id: string
  segment: string
  painPoints: string[]
  preferences: string[]
  willingnessToPay: number
  purchaseBehavior: string
  aiAnalysis?: AICustomerAnalysis
}

export interface AICustomerAnalysis {
  segmentValue: 'high' | 'medium' | 'low'
  acquisitionCost: 'low' | 'medium' | 'high'
  lifetimeValue: 'low' | 'medium' | 'high'
  retentionPotential: 'low' | 'medium' | 'high'
  recommendations: string[]
  confidence: number
}

export interface MarketTrend {
  id: string
  trend: string
  impact: 'high' | 'medium' | 'low'
  timeframe: string
  description: string
  opportunities: string[]
  aiAnalysis?: AITrendAnalysis
}

export interface AITrendAnalysis {
  trendStrength: 'strong' | 'moderate' | 'weak'
  adoptionRate: 'fast' | 'moderate' | 'slow'
  marketRelevance: 'high' | 'medium' | 'low'
  investmentPriority: 'high' | 'medium' | 'low'
  recommendations: string[]
  confidence: number
}

export interface SurveyData {
  id: string
  title: string
  questions: string[]
  responses: number
  completionRate: number
  aiAnalysis?: AISurveyAnalysis
}

export interface AISurveyAnalysis {
  responseQuality: 'high' | 'medium' | 'low'
  keyInsights: string[]
  actionItems: string[]
  confidence: number
}

export interface MarketResearchInsight {
  type: 'competitive' | 'market' | 'customer' | 'trend' | 'survey'
  title: string
  description: string
  impact: 'positive' | 'negative' | 'neutral'
  confidence: number
  recommendations: string[]
  dataPoints: Array<{
    label: string
    value: number | string
    unit: string
  }>
}

export interface IndustryData {
  industry: string
  marketSize: number
  growthRate: number
  competitionLevel: 'low' | 'medium' | 'high'
  keyTrends: string[]
  opportunities: string[]
  risks: string[]
  benchmarkMetrics: {
    averageCustomerAcquisitionCost: number
    averageCustomerLifetimeValue: number
    averageMarketShare: number
    averageGrowthRate: number
  }
}

export class MarketResearchAIService {
  private static instance: MarketResearchAIService
  private industryData: Map<string, IndustryData> = new Map()

  constructor() {
    this.initializeIndustryData()
  }

  static getInstance(): MarketResearchAIService {
    if (!MarketResearchAIService.instance) {
      MarketResearchAIService.instance = new MarketResearchAIService()
    }
    return MarketResearchAIService.instance
  }

  private initializeIndustryData() {
    // Technology/Software Industry
    this.industryData.set('technology', {
      industry: 'Technology/Software',
      marketSize: 5000000000000, // $5T
      growthRate: 8.5,
      competitionLevel: 'high',
      keyTrends: [
        'AI/ML integration accelerating',
        'Cloud migration continuing',
        'Cybersecurity becoming critical',
        'Remote work tools in demand'
      ],
      opportunities: [
        'AI/ML market expansion',
        'SaaS model scalability',
        'Enterprise digital transformation',
        'Emerging markets growth'
      ],
      risks: [
        'Rapid technology changes',
        'High competition from established players',
        'Talent shortage',
        'Regulatory changes'
      ],
      benchmarkMetrics: {
        averageCustomerAcquisitionCost: 150,
        averageCustomerLifetimeValue: 2500,
        averageMarketShare: 2.5,
        averageGrowthRate: 15.2
      }
    })

    // E-commerce/Retail Industry
    this.industryData.set('ecommerce', {
      industry: 'E-commerce/Retail',
      marketSize: 6000000000000, // $6T
      growthRate: 12.3,
      competitionLevel: 'high',
      keyTrends: [
        'Mobile commerce growing',
        'Social commerce emerging',
        'Sustainability focus',
        'Personalization becoming key'
      ],
      opportunities: [
        'Emerging market expansion',
        'Omnichannel integration',
        'Subscription models',
        'Direct-to-consumer growth'
      ],
      risks: [
        'Supply chain disruptions',
        'Platform dependency',
        'Customer acquisition costs rising',
        'Regulatory compliance'
      ],
      benchmarkMetrics: {
        averageCustomerAcquisitionCost: 85,
        averageCustomerLifetimeValue: 1200,
        averageMarketShare: 1.8,
        averageGrowthRate: 18.7
      }
    })

    // Healthcare Industry
    this.industryData.set('healthcare', {
      industry: 'Healthcare',
      marketSize: 8000000000000, // $8T
      growthRate: 6.8,
      competitionLevel: 'medium',
      keyTrends: [
        'Digital health adoption',
        'Telemedicine growth',
        'AI in diagnostics',
        'Preventive care focus'
      ],
      opportunities: [
        'Aging population',
        'Chronic disease management',
        'Mental health services',
        'Precision medicine'
      ],
      risks: [
        'Regulatory complexity',
        'Long sales cycles',
        'High compliance costs',
        'Data privacy concerns'
      ],
      benchmarkMetrics: {
        averageCustomerAcquisitionCost: 300,
        averageCustomerLifetimeValue: 5000,
        averageMarketShare: 3.2,
        averageGrowthRate: 11.4
      }
    })
  }

  async analyzeMarketResearch(
    data: MarketResearchData
  ): Promise<{
    insights: MarketResearchInsight[]
    industryAnalysis: IndustryData
    aiRecommendations: string[]
    competitiveAnalysis: AICompetitorAnalysis[]
    marketOpportunities: string[]
  }> {
    const industryAnalysis = this.getIndustryAnalysis(data.industry)
    const insights = await this.generateInsights(data, industryAnalysis)
    const competitiveAnalysis = await this.analyzeCompetitors(data.competitors, industryAnalysis)
    const marketOpportunities = this.identifyMarketOpportunities(data, industryAnalysis)

    return {
      insights,
      industryAnalysis,
      aiRecommendations: this.generateRecommendations(data, industryAnalysis),
      competitiveAnalysis,
      marketOpportunities
    }
  }

  private getIndustryAnalysis(industry: string): IndustryData {
    return this.industryData.get(industry) || this.industryData.get('technology')!
  }

  private async generateInsights(
    data: MarketResearchData,
    industryAnalysis: IndustryData
  ): Promise<MarketResearchInsight[]> {
    const insights: MarketResearchInsight[] = []

    // Market Size Insights
    const marketSizeRatio = data.marketSize.serviceableObtainableMarket / data.marketSize.totalAddressableMarket
    insights.push({
      type: 'market',
      title: 'Market Opportunity Analysis',
      description: `Your target market represents ${(marketSizeRatio * 100).toFixed(1)}% of the total addressable market, with ${industryAnalysis.growthRate}% annual growth potential.`,
      impact: marketSizeRatio > 0.1 ? 'positive' : 'neutral',
      confidence: 85,
      recommendations: [
        'Focus on niche market segments for initial entry',
        'Develop scalable customer acquisition strategies',
        'Monitor market growth trends closely'
      ],
      dataPoints: [
        { label: 'Market Growth Rate', value: industryAnalysis.growthRate, unit: '%' },
        { label: 'Competition Level', value: industryAnalysis.competitionLevel, unit: 'scale' },
        { label: 'Market Size', value: industryAnalysis.marketSize / 1000000000, unit: 'Billion USD' }
      ]
    })

    // Competitive Analysis Insights
    const avgMarketShare = data.competitors.reduce((sum, comp) => sum + comp.marketShare, 0) / data.competitors.length
    insights.push({
      type: 'competitive',
      title: 'Competitive Landscape Analysis',
      description: `Average competitor market share is ${avgMarketShare.toFixed(1)}%, indicating ${avgMarketShare > 20 ? 'high' : avgMarketShare > 10 ? 'medium' : 'low'} market concentration.`,
      impact: avgMarketShare < 15 ? 'positive' : 'neutral',
      confidence: 80,
      recommendations: [
        'Identify underserved market segments',
        'Develop unique value propositions',
        'Focus on customer experience differentiation'
      ],
      dataPoints: [
        { label: 'Average Market Share', value: avgMarketShare, unit: '%' },
        { label: 'Number of Competitors', value: data.competitors.length, unit: 'companies' },
        { label: 'Market Concentration', value: avgMarketShare > 20 ? 'High' : avgMarketShare > 10 ? 'Medium' : 'Low', unit: 'level' }
      ]
    })

    // Customer Insights
    if (data.customerInsights.length > 0) {
      const avgWillingnessToPay = data.customerInsights.reduce((sum, insight) => sum + insight.willingnessToPay, 0) / data.customerInsights.length
      insights.push({
        type: 'customer',
        title: 'Customer Value Analysis',
        description: `Average customer willingness to pay is $${avgWillingnessToPay}, ${avgWillingnessToPay > 100 ? 'above' : 'below'} industry average of $${industryAnalysis.benchmarkMetrics.averageCustomerLifetimeValue}.`,
        impact: avgWillingnessToPay > industryAnalysis.benchmarkMetrics.averageCustomerLifetimeValue * 0.8 ? 'positive' : 'neutral',
        confidence: 75,
        recommendations: [
          'Optimize pricing strategy based on customer segments',
          'Focus on high-value customer acquisition',
          'Develop premium service offerings'
        ],
        dataPoints: [
          { label: 'Avg Willingness to Pay', value: avgWillingnessToPay, unit: 'USD' },
          { label: 'Industry Average', value: industryAnalysis.benchmarkMetrics.averageCustomerLifetimeValue, unit: 'USD' },
          { label: 'Customer Segments', value: data.customerInsights.length, unit: 'segments' }
        ]
      })
    }

    return insights
  }

  private async analyzeCompetitors(
    competitors: Competitor[],
    industryAnalysis: IndustryData
  ): Promise<AICompetitorAnalysis[]> {
    return competitors.map(competitor => {
      const threatLevel = competitor.marketShare > 20 ? 'high' : competitor.marketShare > 10 ? 'medium' : 'low'
      const competitivePosition = competitor.marketShare > 30 ? 'leader' : 
                                competitor.marketShare > 15 ? 'challenger' : 
                                competitor.marketShare > 5 ? 'niche' : 'emerging'

      return {
        competitivePosition,
        threatLevel,
        opportunities: [
          'Focus on underserved customer segments',
          'Develop superior customer experience',
          'Leverage technology advantages'
        ],
        risks: [
          'Price competition from larger players',
          'Market share erosion',
          'Customer switching costs'
        ],
        recommendedActions: [
          'Differentiate through innovation',
          'Build strong customer relationships',
          'Monitor competitor moves closely'
        ],
        confidence: 85
      }
    })
  }

  private identifyMarketOpportunities(
    data: MarketResearchData,
    industryAnalysis: IndustryData
  ): string[] {
    const opportunities = []

    // Market gap opportunities
    if (data.marketSize.serviceableObtainableMarket < data.marketSize.serviceableAddressableMarket * 0.3) {
      opportunities.push('Significant market expansion potential in underserved segments')
    }

    // Technology opportunities
    if (industryAnalysis.keyTrends.some(trend => trend.toLowerCase().includes('ai'))) {
      opportunities.push('AI/ML integration presents competitive advantage opportunities')
    }

    // Customer opportunity
    if (data.customerInsights.some(insight => insight.willingnessToPay > industryAnalysis.benchmarkMetrics.averageCustomerLifetimeValue)) {
      opportunities.push('High-value customer segments identified for premium offerings')
    }

    // Growth opportunity
    if (industryAnalysis.growthRate > 10) {
      opportunities.push('High-growth market with expansion opportunities')
    }

    return opportunities
  }

  private generateRecommendations(
    data: MarketResearchData,
    industryAnalysis: IndustryData
  ): string[] {
    const recommendations = []

    // Market entry recommendations
    if (industryAnalysis.competitionLevel === 'high') {
      recommendations.push('Focus on niche market segments for initial market entry')
      recommendations.push('Develop strong differentiation strategy')
    } else {
      recommendations.push('Consider broader market approach given lower competition')
    }

    // Customer acquisition recommendations
    if (industryAnalysis.benchmarkMetrics.averageCustomerAcquisitionCost > 200) {
      recommendations.push('Implement cost-effective customer acquisition strategies')
      recommendations.push('Focus on organic growth and referrals')
    }

    // Technology recommendations
    if (industryAnalysis.keyTrends.some(trend => trend.toLowerCase().includes('digital'))) {
      recommendations.push('Invest in digital transformation capabilities')
      recommendations.push('Leverage technology for competitive advantage')
    }

    // Growth recommendations
    if (industryAnalysis.growthRate > 10) {
      recommendations.push('Prepare for rapid scaling opportunities')
      recommendations.push('Build scalable infrastructure and processes')
    }

    return recommendations
  }

  async generateSurveyInsights(surveyData: SurveyData): Promise<AISurveyAnalysis> {
    // Simulate AI analysis of survey data
    const responseQuality = surveyData.completionRate > 80 ? 'high' : 
                           surveyData.completionRate > 60 ? 'medium' : 'low'

    return {
      responseQuality,
      keyInsights: [
        'Customer pain points clearly identified',
        'Pricing sensitivity varies by segment',
        'Feature preferences show clear patterns'
      ],
      actionItems: [
        'Address top pain points in product development',
        'Optimize pricing strategy based on survey results',
        'Prioritize features based on customer preferences'
      ],
      confidence: 80
    }
  }

  async analyzeTrends(trends: MarketTrend[]): Promise<AITrendAnalysis[]> {
    return trends.map(trend => {
      const trendStrength = trend.impact === 'high' ? 'strong' : 
                           trend.impact === 'medium' ? 'moderate' : 'weak'
      
      const adoptionRate = trend.timeframe.includes('1-2') ? 'fast' : 
                          trend.timeframe.includes('3-5') ? 'moderate' : 'slow'

      return {
        trendStrength,
        adoptionRate,
        marketRelevance: 'high',
        investmentPriority: trend.impact === 'high' ? 'high' : 'medium',
        recommendations: [
          'Monitor trend adoption closely',
          'Consider early adoption for competitive advantage',
          'Prepare for trend impact on business model'
        ],
        confidence: 75
      }
    })
  }
} 