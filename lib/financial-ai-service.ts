export interface FinancialScenario {
  id: string
  name: string
  description: string
  probability: number // percentage
  revenueMultiplier: number
  costMultiplier: number
  growthRateMultiplier: number
  marketConditions: {
    competition: 'low' | 'medium' | 'high'
    marketGrowth: 'declining' | 'stable' | 'growing'
    regulatoryEnvironment: 'favorable' | 'neutral' | 'challenging'
  }
}

export interface FinancialProjection {
  year: number
  month: number
  revenue: number
  expenses: number
  cashFlow: number
  cumulativeCashFlow: number
  profitMargin: number
  burnRate: number
  runway: number
}

export interface AIFinancialInsight {
  type: 'revenue' | 'expense' | 'cash-flow' | 'market' | 'risk'
  title: string
  description: string
  impact: 'positive' | 'negative' | 'neutral'
  confidence: number // percentage
  recommendations: string[]
  dataPoints: Array<{
    label: string
    value: number
    unit: string
  }>
}

export interface MarketAnalysis {
  industry: string
  marketSize: number
  growthRate: number
  competitionLevel: 'low' | 'medium' | 'high'
  keyTrends: string[]
  risks: string[]
  opportunities: string[]
  benchmarkMetrics: {
    averageRevenueGrowth: number
    averageProfitMargin: number
    averageBurnRate: number
    averageRunway: number
  }
}

export interface FinancialData {
  companyName: string
  industry: string
  startDate: string
  revenueStreams: Array<{
    id: string
    name: string
    pricePerUnit: number
    unitsSoldMonthly: number[]
    growthRate: number
  }>
  fixedCosts: Array<{
    id: string
    name: string
    monthlyAmount: number
  }>
  variableCosts: Array<{
    id: string
    name: string
    percentOfRevenue: number
    minimumMonthlyCost: number
  }>
  oneTimeCosts: Array<{
    id: string
    name: string
    amount: number
    month: number
    year: number
  }>
  initialInvestment: number
  additionalFunding: Array<{
    id: string
    name: string
    amount: number
    month: number
    year: number
  }>
  monthlyCustomerGrowthRate: number
  churnRate: number
  averageRevenuePerCustomer: number
  taxRate: number
  includeInflation: boolean
  inflationRate: number
  discountRate: number
}

export class FinancialAIService {
  private static instance: FinancialAIService
  private marketData: Map<string, MarketAnalysis> = new Map()

  constructor() {
    this.initializeMarketData()
  }

  static getInstance(): FinancialAIService {
    if (!FinancialAIService.instance) {
      FinancialAIService.instance = new FinancialAIService()
    }
    return FinancialAIService.instance
  }

  private initializeMarketData() {
    // Initialize market data for different industries
    this.marketData.set('technology', {
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
      risks: [
        'Rapid technology changes',
        'High competition from established players',
        'Talent shortage',
        'Regulatory changes'
      ],
      opportunities: [
        'AI/ML market expansion',
        'SaaS model scalability',
        'Enterprise digital transformation',
        'Emerging markets growth'
      ],
      benchmarkMetrics: {
        averageRevenueGrowth: 15.2,
        averageProfitMargin: 12.8,
        averageBurnRate: 8.5,
        averageRunway: 18.2
      }
    })

    this.marketData.set('ecommerce', {
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
      risks: [
        'Supply chain disruptions',
        'Platform dependency',
        'Customer acquisition costs rising',
        'Regulatory compliance'
      ],
      opportunities: [
        'Emerging market expansion',
        'Omnichannel integration',
        'Subscription models',
        'Direct-to-consumer growth'
      ],
      benchmarkMetrics: {
        averageRevenueGrowth: 18.7,
        averageProfitMargin: 8.3,
        averageBurnRate: 12.1,
        averageRunway: 14.8
      }
    })

    this.marketData.set('healthcare', {
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
      risks: [
        'Regulatory complexity',
        'Long sales cycles',
        'High compliance costs',
        'Data privacy concerns'
      ],
      opportunities: [
        'Aging population',
        'Chronic disease management',
        'Mental health services',
        'Precision medicine'
      ],
      benchmarkMetrics: {
        averageRevenueGrowth: 11.4,
        averageProfitMargin: 15.6,
        averageBurnRate: 6.8,
        averageRunway: 22.1
      }
    })
  }

  async generateFinancialProjections(
    data: FinancialData,
    years: number = 5
  ): Promise<{
    projections: FinancialProjection[]
    scenarios: FinancialScenario[]
    insights: AIFinancialInsight[]
    marketAnalysis: MarketAnalysis
  }> {
    const marketAnalysis = this.getMarketAnalysis(data.industry)
    const scenarios = this.generateScenarios(data, marketAnalysis)
    const projections = this.calculateProjections(data, years)
    const insights = await this.generateInsights(data, projections, marketAnalysis)

    return {
      projections,
      scenarios,
      insights,
      marketAnalysis
    }
  }

  private getMarketAnalysis(industry: string): MarketAnalysis {
    return this.marketData.get(industry) || this.marketData.get('technology')!
  }

  private generateScenarios(data: FinancialData, marketAnalysis: MarketAnalysis): FinancialScenario[] {
    const baseGrowthRate = marketAnalysis.benchmarkMetrics.averageRevenueGrowth

    return [
      {
        id: 'best-case',
        name: 'Best Case Scenario',
        description: 'Optimistic scenario with strong market conditions and execution',
        probability: 20,
        revenueMultiplier: 1.5,
        costMultiplier: 0.8,
        growthRateMultiplier: 1.3,
        marketConditions: {
          competition: 'low',
          marketGrowth: 'growing',
          regulatoryEnvironment: 'favorable'
        }
      },
      {
        id: 'most-likely',
        name: 'Most Likely Scenario',
        description: 'Realistic scenario based on current market conditions',
        probability: 60,
        revenueMultiplier: 1.0,
        costMultiplier: 1.0,
        growthRateMultiplier: 1.0,
        marketConditions: {
          competition: 'medium',
          marketGrowth: 'stable',
          regulatoryEnvironment: 'neutral'
        }
      },
      {
        id: 'worst-case',
        name: 'Worst Case Scenario',
        description: 'Conservative scenario with challenging market conditions',
        probability: 20,
        revenueMultiplier: 0.6,
        costMultiplier: 1.3,
        growthRateMultiplier: 0.7,
        marketConditions: {
          competition: 'high',
          marketGrowth: 'declining',
          regulatoryEnvironment: 'challenging'
        }
      }
    ]
  }

  private calculateProjections(data: FinancialData, years: number): FinancialProjection[] {
    const projections: FinancialProjection[] = []
    let cumulativeCashFlow = data.initialInvestment

    for (let year = 1; year <= years; year++) {
      for (let month = 1; month <= 12; month++) {
        const monthIndex = month - 1
        const totalMonths = (year - 1) * 12 + month

        // Calculate revenue with growth
        let monthlyRevenue = 0
        data.revenueStreams.forEach(stream => {
          const baseUnits = stream.unitsSoldMonthly[monthIndex] || 0
          const growthFactor = Math.pow(1 + stream.growthRate / 100, year - 1)
          const units = baseUnits * growthFactor
          monthlyRevenue += units * stream.pricePerUnit
        })

        // Calculate expenses
        let monthlyExpenses = 0
        
        // Fixed costs
        data.fixedCosts.forEach(cost => {
          monthlyExpenses += cost.monthlyAmount
        })

        // Variable costs
        data.variableCosts.forEach(cost => {
          const variableCost = Math.max(
            monthlyRevenue * (cost.percentOfRevenue / 100),
            cost.minimumMonthlyCost
          )
          monthlyExpenses += variableCost
        })

        // One-time costs
        data.oneTimeCosts.forEach(cost => {
          if (cost.year === year && cost.month === month) {
            monthlyExpenses += cost.amount
          }
        })

        // Additional funding
        data.additionalFunding.forEach(funding => {
          if (funding.year === year && funding.month === month) {
            cumulativeCashFlow += funding.amount
          }
        })

        // Apply inflation if enabled
        if (data.includeInflation) {
          const inflationFactor = Math.pow(1 + data.inflationRate / 100, totalMonths / 12)
          monthlyExpenses *= inflationFactor
        }

        const cashFlow = monthlyRevenue - monthlyExpenses
        cumulativeCashFlow += cashFlow

        const profitMargin = monthlyRevenue > 0 ? ((monthlyRevenue - monthlyExpenses) / monthlyRevenue) * 100 : 0
        const burnRate = monthlyExpenses
        const runway = cumulativeCashFlow > 0 ? cumulativeCashFlow / burnRate : 0

        projections.push({
          year,
          month,
          revenue: monthlyRevenue,
          expenses: monthlyExpenses,
          cashFlow,
          cumulativeCashFlow,
          profitMargin,
          burnRate,
          runway
        })
      }
    }

    return projections
  }

  private async generateInsights(
    data: FinancialData,
    projections: FinancialProjection[],
    marketAnalysis: MarketAnalysis
  ): Promise<AIFinancialInsight[]> {
    const insights: AIFinancialInsight[] = []

    // Revenue insights
    const totalRevenue = projections.reduce((sum, p) => sum + p.revenue, 0)
    const avgMonthlyRevenue = totalRevenue / projections.length
    const revenueGrowth = this.calculateGrowthRate(projections.map(p => p.revenue))

    insights.push({
      type: 'revenue',
      title: 'Revenue Growth Analysis',
      description: `Your projected revenue growth of ${revenueGrowth.toFixed(1)}% is ${revenueGrowth > marketAnalysis.benchmarkMetrics.averageRevenueGrowth ? 'above' : 'below'} the industry average of ${marketAnalysis.benchmarkMetrics.averageRevenueGrowth}%.`,
      impact: revenueGrowth > marketAnalysis.benchmarkMetrics.averageRevenueGrowth ? 'positive' : 'neutral',
      confidence: 85,
      recommendations: [
        'Consider diversifying revenue streams',
        'Focus on customer retention strategies',
        'Explore pricing optimization opportunities'
      ],
      dataPoints: [
        { label: 'Projected Growth Rate', value: revenueGrowth, unit: '%' },
        { label: 'Industry Average', value: marketAnalysis.benchmarkMetrics.averageRevenueGrowth, unit: '%' },
        { label: 'Average Monthly Revenue', value: avgMonthlyRevenue, unit: 'USD' }
      ]
    })

    // Cash flow insights
    const negativeCashFlowMonths = projections.filter(p => p.cashFlow < 0).length
    const totalNegativeCashFlow = projections.filter(p => p.cashFlow < 0).reduce((sum, p) => sum + Math.abs(p.cashFlow), 0)

    insights.push({
      type: 'cash-flow',
      title: 'Cash Flow Analysis',
      description: `You have ${negativeCashFlowMonths} months with negative cash flow, requiring ${formatCurrency(totalNegativeCashFlow)} in additional funding.`,
      impact: negativeCashFlowMonths > 6 ? 'negative' : 'neutral',
      confidence: 90,
      recommendations: [
        'Secure additional funding before cash flow turns negative',
        'Optimize expense structure',
        'Accelerate revenue generation'
      ],
      dataPoints: [
        { label: 'Negative Cash Flow Months', value: negativeCashFlowMonths, unit: 'months' },
        { label: 'Total Funding Needed', value: totalNegativeCashFlow, unit: 'USD' },
        { label: 'Average Monthly Cash Flow', value: projections.reduce((sum, p) => sum + p.cashFlow, 0) / projections.length, unit: 'USD' }
      ]
    })

    // Market insights
    insights.push({
      type: 'market',
      title: 'Market Position Analysis',
      description: `Your industry (${marketAnalysis.industry}) shows ${marketAnalysis.growthRate}% annual growth with ${marketAnalysis.competitionLevel} competition levels.`,
      impact: 'neutral',
      confidence: 80,
      recommendations: [
        'Monitor key market trends closely',
        'Differentiate from competitors',
        'Prepare for regulatory changes'
      ],
      dataPoints: [
        { label: 'Market Growth Rate', value: marketAnalysis.growthRate, unit: '%' },
        { label: 'Market Size', value: marketAnalysis.marketSize / 1000000000, unit: 'Billion USD' },
        { label: 'Competition Level', value: marketAnalysis.competitionLevel === 'high' ? 3 : marketAnalysis.competitionLevel === 'medium' ? 2 : 1, unit: 'scale' }
      ]
    })

    return insights
  }

  private calculateGrowthRate(values: number[]): number {
    if (values.length < 2) return 0
    
    const firstValue = values[0]
    const lastValue = values[values.length - 1]
    
    if (firstValue === 0) return 0
    
    return ((lastValue - firstValue) / firstValue) * 100
  }
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
} 