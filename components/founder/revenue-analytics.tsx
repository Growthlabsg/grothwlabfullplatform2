"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Target, 
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  Building,
  Globe,
  Smartphone
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { RevenueMetrics, PlatformAnalytics } from "@/types/founder"
import { useFounderAuth } from "@/contexts/founder-auth-context"

// Mock revenue metrics data
const mockRevenueMetrics: RevenueMetrics = {
  id: "revenue",
  currentMonth: {
    revenue: 125000,
    growth: 15.5,
    subscriptions: 1250,
    churnRate: 2.1,
    averageRevenuePerUser: 100,
    newCustomers: 180,
    recurringRevenue: 98000
  },
  previousMonth: {
    revenue: 108000,
    growth: 12.3,
    subscriptions: 1180,
    churnRate: 2.8,
    averageRevenuePerUser: 91.5,
    newCustomers: 165,
    recurringRevenue: 85000
  },
  yearly: {
    totalRevenue: 1250000,
    growth: 28.5,
    totalSubscriptions: 12500,
    averageChurnRate: 2.4,
    totalNewCustomers: 2100,
    recurringRevenue: 980000
  },
  revenueStreams: [
    {
      name: "Premium Subscriptions",
      amount: 75000,
      percentage: 60,
      growth: 18.2,
      customers: 750
    },
    {
      name: "Enterprise Plans",
      amount: 35000,
      percentage: 28,
      growth: 22.5,
      customers: 35
    },
    {
      name: "API Access",
      amount: 15000,
      percentage: 12,
      growth: 8.7,
      customers: 465
    }
  ],
  customerSegments: [
    {
      segment: "Startups",
      revenue: 45000,
      customers: 450,
      growth: 25.3,
      averageValue: 100
    },
    {
      segment: "SMBs",
      revenue: 55000,
      customers: 550,
      growth: 18.7,
      averageValue: 100
    },
    {
      segment: "Enterprise",
      revenue: 25000,
      customers: 25,
      growth: 35.2,
      averageValue: 1000
    }
  ],
  geographicDistribution: [
    {
      region: "North America",
      revenue: 75000,
      percentage: 60,
      growth: 16.8
    },
    {
      region: "Europe",
      revenue: 35000,
      percentage: 28,
      growth: 12.4
    },
    {
      region: "Asia Pacific",
      revenue: 15000,
      percentage: 12,
      growth: 28.9
    }
  ]
}

// Mock platform analytics data
const mockPlatformAnalytics: PlatformAnalytics = {
  id: "analytics",
  userMetrics: {
    totalUsers: 25000,
    activeUsers: 18750,
    newUsersThisMonth: 2100,
    userGrowth: 9.2,
    retentionRate: 87.5,
    engagementScore: 8.4
  },
  featureUsage: {
    mostUsedFeatures: [
      { name: "Dashboard", usage: 95.2, growth: 2.1 },
      { name: "Analytics", usage: 78.6, growth: 15.3 },
      { name: "Communication", usage: 65.4, growth: 8.7 },
      { name: "Networking", usage: 58.9, growth: 12.4 },
      { name: "Resources", usage: 45.2, growth: 6.8 }
    ],
    leastUsedFeatures: [
      { name: "Advanced Reports", usage: 12.3, growth: -5.2 },
      { name: "API Integration", usage: 8.7, growth: 2.1 },
      { name: "Custom Workflows", usage: 6.4, growth: -1.8 }
    ]
  },
  performanceMetrics: {
    averageSessionDuration: 24.5,
    pagesPerSession: 8.7,
    bounceRate: 32.1,
    conversionRate: 4.8,
    customerSatisfaction: 4.6
  }
}

export default function RevenueAnalytics() {
  const { toast } = useToast()
  const [revenueMetrics] = useState<RevenueMetrics>(mockRevenueMetrics)
  const [platformAnalytics] = useState<PlatformAnalytics>(mockPlatformAnalytics)
  const [selectedPeriod, setSelectedPeriod] = useState("currentMonth")

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`
  }

  const getGrowthColor = (growth: number) => {
    return growth >= 0 ? "text-green-600" : "text-red-600"
  }

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />
  }

  const getCurrentPeriodData = () => {
    switch (selectedPeriod) {
      case "currentMonth":
        return revenueMetrics.currentMonth
      case "previousMonth":
        return revenueMetrics.previousMonth
      case "yearly":
        return revenueMetrics.yearly
      default:
        return revenueMetrics.currentMonth
    }
  }

  const currentData = getCurrentPeriodData()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Revenue Analytics</h2>
          <p className="text-muted-foreground">
            Comprehensive financial insights and business performance metrics
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Label className="text-sm">Period:</Label>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="currentMonth">Current Month</SelectItem>
              <SelectItem value="previousMonth">Previous Month</SelectItem>
              <SelectItem value="yearly">Year to Date</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(currentData.revenue || currentData.totalRevenue)}
            </div>
            <div className="flex items-center space-x-1 text-xs">
              {getGrowthIcon(currentData.growth)}
              <span className={getGrowthColor(currentData.growth)}>
                {formatPercentage(currentData.growth)}
              </span>
              <span className="text-muted-foreground">vs previous</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {currentData.subscriptions || currentData.totalSubscriptions}
            </div>
            <div className="flex items-center space-x-1 text-xs">
              {getGrowthIcon(currentData.growth)}
              <span className={getGrowthColor(currentData.growth)}>
                {formatPercentage(currentData.growth)}
              </span>
              <span className="text-muted-foreground">vs previous</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ARPU</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(currentData.averageRevenuePerUser || 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Average Revenue Per User
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(currentData.churnRate || currentData.averageChurnRate).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Monthly churn rate
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Revenue Overview</TabsTrigger>
          <TabsTrigger value="streams">Revenue Streams</TabsTrigger>
          <TabsTrigger value="customers">Customer Analysis</TabsTrigger>
          <TabsTrigger value="geography">Geographic Distribution</TabsTrigger>
          <TabsTrigger value="platform">Platform Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Revenue Growth</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Current Month</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{formatCurrency(revenueMetrics.currentMonth.revenue)}</span>
                      <Badge variant="outline" className={getGrowthColor(revenueMetrics.currentMonth.growth)}>
                        {formatPercentage(revenueMetrics.currentMonth.growth)}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Previous Month</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{formatCurrency(revenueMetrics.previousMonth.revenue)}</span>
                      <Badge variant="outline" className={getGrowthColor(revenueMetrics.previousMonth.growth)}>
                        {formatPercentage(revenueMetrics.previousMonth.growth)}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Year to Date</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{formatCurrency(revenueMetrics.yearly.totalRevenue)}</span>
                      <Badge variant="outline" className={getGrowthColor(revenueMetrics.yearly.growth)}>
                        {formatPercentage(revenueMetrics.yearly.growth)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChart className="h-5 w-5" />
                  <span>Revenue Composition</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {revenueMetrics.revenueStreams.map((stream, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full bg-${index === 0 ? 'blue' : index === 1 ? 'green' : 'purple'}-500`} />
                        <span className="text-sm">{stream.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{formatCurrency(stream.amount)}</span>
                        <Badge variant="outline">{stream.percentage}%</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="streams" className="space-y-4">
          <div className="space-y-4">
            {revenueMetrics.revenueStreams.map((stream, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{stream.name}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{stream.percentage}% of total</Badge>
                      <Badge className={getGrowthColor(stream.growth)}>
                        {formatPercentage(stream.growth)}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Revenue</p>
                      <p className="text-2xl font-bold">{formatCurrency(stream.amount)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Customers</p>
                      <p className="text-2xl font-bold">{stream.customers.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Growth</p>
                      <p className={`text-2xl font-bold ${getGrowthColor(stream.growth)}`}>
                        {formatPercentage(stream.growth)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <div className="space-y-4">
            {revenueMetrics.customerSegments.map((segment, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{segment.segment}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{formatCurrency(segment.averageValue)} avg</Badge>
                      <Badge className={getGrowthColor(segment.growth)}>
                        {formatPercentage(segment.growth)}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Revenue</p>
                      <p className="text-2xl font-bold">{formatCurrency(segment.revenue)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Customers</p>
                      <p className="text-2xl font-bold">{segment.customers.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Growth</p>
                      <p className={`text-2xl font-bold ${getGrowthColor(segment.growth)}`}>
                        {formatPercentage(segment.growth)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="geography" className="space-y-4">
          <div className="space-y-4">
            {revenueMetrics.geographicDistribution.map((region, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{region.region}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{region.percentage}% of total</Badge>
                      <Badge className={getGrowthColor(region.growth)}>
                        {formatPercentage(region.growth)}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Revenue</p>
                      <p className="text-2xl font-bold">{formatCurrency(region.revenue)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Growth</p>
                      <p className={`text-2xl font-bold ${getGrowthColor(region.growth)}`}>
                        {formatPercentage(region.growth)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="platform" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>User Metrics</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Users</p>
                    <p className="text-2xl font-bold">{platformAnalytics.userMetrics.totalUsers.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Active Users</p>
                    <p className="text-2xl font-bold">{platformAnalytics.userMetrics.activeUsers.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">New This Month</p>
                    <p className="text-2xl font-bold">{platformAnalytics.userMetrics.newUsersThisMonth.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Growth</p>
                    <p className={`text-2xl font-bold ${getGrowthColor(platformAnalytics.userMetrics.userGrowth)}`}>
                      {formatPercentage(platformAnalytics.userMetrics.userGrowth)}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Retention Rate</p>
                    <p className="text-2xl font-bold">{platformAnalytics.userMetrics.retentionRate}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Engagement Score</p>
                    <p className="text-2xl font-bold">{platformAnalytics.userMetrics.engagementScore}/10</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Performance Metrics</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Session Duration</p>
                    <p className="text-2xl font-bold">{platformAnalytics.performanceMetrics.averageSessionDuration} min</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pages/Session</p>
                    <p className="text-2xl font-bold">{platformAnalytics.performanceMetrics.pagesPerSession}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Bounce Rate</p>
                    <p className="text-2xl font-bold">{platformAnalytics.performanceMetrics.bounceRate}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Conversion Rate</p>
                    <p className="text-2xl font-bold">{platformAnalytics.performanceMetrics.conversionRate}%</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Customer Satisfaction</p>
                  <p className="text-2xl font-bold">{platformAnalytics.performanceMetrics.customerSatisfaction}/5</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Feature Usage Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-3">Most Used Features</h4>
                  <div className="space-y-2">
                    {platformAnalytics.featureUsage.mostUsedFeatures.map((feature, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm">{feature.name}</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{feature.usage}%</span>
                          <Badge variant="outline" className={getGrowthColor(feature.growth)}>
                            {formatPercentage(feature.growth)}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Least Used Features</h4>
                  <div className="space-y-2">
                    {platformAnalytics.featureUsage.leastUsedFeatures.map((feature, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm">{feature.name}</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{feature.usage}%</span>
                          <Badge variant="outline" className={getGrowthColor(feature.growth)}>
                            {formatPercentage(feature.growth)}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
