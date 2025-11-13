"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"
import {
  ChevronLeft,
  Download,
  Share2,
  Save,
  Calculator,
  BarChart,
  LineChart,
  PieChart,
  Info,
  HelpCircle,
  ArrowRight,
} from "lucide-react"

export function ValuationCalculator() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("dcf-method")

  // DCF Method State
  const [dcfInputs, setDcfInputs] = useState({
    projectedRevenue: 500000,
    growthRate: 20,
    profitMargin: 15,
    discountRate: 25,
    years: 5,
  })

  // Comparable Method State
  const [comparableInputs, setComparableInputs] = useState({
    revenue: 500000,
    revenueMultiple: 3,
    ebitda: 100000,
    ebitdaMultiple: 10,
    userCount: 10000,
    userMultiple: 50,
    industry: "saas",
  })

  // Scorecard Method State
  const [scorecardInputs, setScoreCardInputs] = useState({
    baseValuation: 1000000,
    teamScore: 100,
    marketScore: 100,
    productScore: 100,
    competitionScore: 100,
    tractionScore: 100,
    businessModelScore: 100,
  })

  // Calculate DCF Valuation
  const calculateDcfValuation = () => {
    let valuation = 0
    let currentRevenue = dcfInputs.projectedRevenue

    for (let i = 1; i <= dcfInputs.years; i++) {
      const profit = currentRevenue * (dcfInputs.profitMargin / 100)
      const discountFactor = Math.pow(1 + dcfInputs.discountRate / 100, i)
      valuation += profit / discountFactor
      currentRevenue *= 1 + dcfInputs.growthRate / 100
    }

    // Terminal value calculation (simplified)
    const terminalProfit = currentRevenue * (dcfInputs.profitMargin / 100)
    const terminalValue = terminalProfit / (dcfInputs.discountRate / 100 - (dcfInputs.growthRate / 100) * 0.5)
    const discountedTerminalValue = terminalValue / Math.pow(1 + dcfInputs.discountRate / 100, dcfInputs.years)

    valuation += discountedTerminalValue

    return Math.round(valuation)
  }

  // Calculate Comparable Valuation
  const calculateComparableValuation = () => {
    const revenueValuation = comparableInputs.revenue * comparableInputs.revenueMultiple
    const ebitdaValuation = comparableInputs.ebitda * comparableInputs.ebitdaMultiple
    const userValuation = comparableInputs.userCount * comparableInputs.userMultiple

    // Weight the different methods based on industry
    let weights = { revenue: 0.4, ebitda: 0.4, user: 0.2 }

    if (comparableInputs.industry === "saas") {
      weights = { revenue: 0.5, ebitda: 0.3, user: 0.2 }
    } else if (comparableInputs.industry === "marketplace") {
      weights = { revenue: 0.3, ebitda: 0.3, user: 0.4 }
    } else if (comparableInputs.industry === "consumer") {
      weights = { revenue: 0.2, ebitda: 0.2, user: 0.6 }
    }

    const weightedValuation =
      revenueValuation * weights.revenue + ebitdaValuation * weights.ebitda + userValuation * weights.user

    return Math.round(weightedValuation)
  }

  // Calculate Scorecard Valuation
  const calculateScorecardValuation = () => {
    const weights = {
      team: 0.3,
      market: 0.25,
      product: 0.15,
      competition: 0.1,
      traction: 0.1,
      businessModel: 0.1,
    }

    const weightedScore =
      (scorecardInputs.teamScore / 100) * weights.team +
      (scorecardInputs.marketScore / 100) * weights.market +
      (scorecardInputs.productScore / 100) * weights.product +
      (scorecardInputs.competitionScore / 100) * weights.competition +
      (scorecardInputs.tractionScore / 100) * weights.traction +
      (scorecardInputs.businessModelScore / 100) * weights.businessModel

    return Math.round(scorecardInputs.baseValuation * weightedScore)
  }

  // Calculate Final Valuation (average of all methods)
  const calculateFinalValuation = () => {
    const dcfVal = calculateDcfValuation()
    const comparableVal = calculateComparableValuation()
    const scorecardVal = calculateScorecardValuation()

    return Math.round((dcfVal + comparableVal + scorecardVal) / 3)
  }

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value)
  }

  // Handle save
  const handleSave = () => {
    toast({
      title: "Valuation Saved",
      description: "Your startup valuation has been saved to your account.",
    })
  }

  // Handle download
  const handleDownload = () => {
    toast({
      title: "Valuation Report Downloaded",
      description: "Your startup valuation report has been downloaded as a PDF.",
    })
  }

  // Handle share
  const handleShare = () => {
    toast({
      title: "Share Link Generated",
      description: "A shareable link to your startup valuation has been copied to your clipboard.",
    })
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8">
        <Link href="/startup" className="flex items-center text-[#0F7377] hover:underline mb-4">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Startup Resources
        </Link>
        <h1 className="text-3xl font-bold mb-4">Startup Valuation Calculator</h1>
        <p className="text-[#334155] max-w-3xl">
          Estimate your startup's valuation using multiple methodologies. This calculator provides a framework to help
          you understand potential valuation ranges based on financial projections, market comparables, and qualitative
          factors.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Valuation Calculator</CardTitle>
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
              <CardDescription>Calculate your startup's valuation using different methodologies</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 mb-8">
                  <TabsTrigger value="dcf-method">DCF Method</TabsTrigger>
                  <TabsTrigger value="comparable-method">Comparable Method</TabsTrigger>
                  <TabsTrigger value="scorecard-method">Scorecard Method</TabsTrigger>
                </TabsList>

                {/* DCF Method */}
                <TabsContent value="dcf-method" className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Discounted Cash Flow Method</h3>
                      <Button variant="outline" size="sm" className="flex items-center">
                        <HelpCircle className="h-4 w-4 mr-2" />
                        How it works
                      </Button>
                    </div>
                    <p className="text-muted-foreground">
                      The DCF method calculates the present value of projected future cash flows.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="projectedRevenue">Projected Annual Revenue</Label>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">$</span>
                          <Input
                            id="projectedRevenue"
                            type="number"
                            value={dcfInputs.projectedRevenue}
                            onChange={(e) => setDcfInputs({ ...dcfInputs, projectedRevenue: Number(e.target.value) })}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="growthRate">Annual Growth Rate (%)</Label>
                          <span className="text-sm font-medium">{dcfInputs.growthRate}%</span>
                        </div>
                        <Slider
                          id="growthRate"
                          min={0}
                          max={100}
                          step={1}
                          value={[dcfInputs.growthRate]}
                          onValueChange={(value) => setDcfInputs({ ...dcfInputs, growthRate: value[0] })}
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="profitMargin">Profit Margin (%)</Label>
                          <span className="text-sm font-medium">{dcfInputs.profitMargin}%</span>
                        </div>
                        <Slider
                          id="profitMargin"
                          min={0}
                          max={100}
                          step={1}
                          value={[dcfInputs.profitMargin]}
                          onValueChange={(value) => setDcfInputs({ ...dcfInputs, profitMargin: value[0] })}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="discountRate">Discount Rate (%)</Label>
                          <span className="text-sm font-medium">{dcfInputs.discountRate}%</span>
                        </div>
                        <Slider
                          id="discountRate"
                          min={5}
                          max={50}
                          step={1}
                          value={[dcfInputs.discountRate]}
                          onValueChange={(value) => setDcfInputs({ ...dcfInputs, discountRate: value[0] })}
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="years">Projection Years</Label>
                          <span className="text-sm font-medium">{dcfInputs.years} years</span>
                        </div>
                        <Slider
                          id="years"
                          min={1}
                          max={10}
                          step={1}
                          value={[dcfInputs.years]}
                          onValueChange={(value) => setDcfInputs({ ...dcfInputs, years: value[0] })}
                        />
                      </div>

                      <div className="pt-4">
                        <div className="bg-muted p-4 rounded-md">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">DCF Valuation</span>
                            <span className="text-lg font-bold text-[#0F7377]">
                              {formatCurrency(calculateDcfValuation())}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Based on projected cash flows over {dcfInputs.years} years with a {dcfInputs.discountRate}%
                            discount rate.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <Button onClick={() => setActiveTab("comparable-method")}>
                      Next Method
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>

                {/* Comparable Method */}
                <TabsContent value="comparable-method" className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Comparable Company Analysis</h3>
                      <Button variant="outline" size="sm" className="flex items-center">
                        <HelpCircle className="h-4 w-4 mr-2" />
                        How it works
                      </Button>
                    </div>
                    <p className="text-muted-foreground">
                      This method values your startup based on multiples from comparable companies in your industry.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="industry">Industry</Label>
                        <Select
                          value={comparableInputs.industry}
                          onValueChange={(value) => setComparableInputs({ ...comparableInputs, industry: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="saas">SaaS / Software</SelectItem>
                            <SelectItem value="marketplace">Marketplace / Platform</SelectItem>
                            <SelectItem value="consumer">Consumer / D2C</SelectItem>
                            <SelectItem value="hardware">Hardware / IoT</SelectItem>
                            <SelectItem value="biotech">Biotech / Healthcare</SelectItem>
                            <SelectItem value="fintech">Fintech</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="revenue">Annual Revenue</Label>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">$</span>
                          <Input
                            id="revenue"
                            type="number"
                            value={comparableInputs.revenue}
                            onChange={(e) =>
                              setComparableInputs({ ...comparableInputs, revenue: Number(e.target.value) })
                            }
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="revenueMultiple">Revenue Multiple</Label>
                          <span className="text-sm font-medium">{comparableInputs.revenueMultiple}x</span>
                        </div>
                        <Slider
                          id="revenueMultiple"
                          min={1}
                          max={20}
                          step={0.1}
                          value={[comparableInputs.revenueMultiple]}
                          onValueChange={(value) =>
                            setComparableInputs({ ...comparableInputs, revenueMultiple: value[0] })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="ebitda">Annual EBITDA</Label>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">$</span>
                          <Input
                            id="ebitda"
                            type="number"
                            value={comparableInputs.ebitda}
                            onChange={(e) =>
                              setComparableInputs({ ...comparableInputs, ebitda: Number(e.target.value) })
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="ebitdaMultiple">EBITDA Multiple</Label>
                          <span className="text-sm font-medium">{comparableInputs.ebitdaMultiple}x</span>
                        </div>
                        <Slider
                          id="ebitdaMultiple"
                          min={1}
                          max={30}
                          step={0.1}
                          value={[comparableInputs.ebitdaMultiple]}
                          onValueChange={(value) =>
                            setComparableInputs({ ...comparableInputs, ebitdaMultiple: value[0] })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="userCount">Active Users/Customers</Label>
                        <Input
                          id="userCount"
                          type="number"
                          value={comparableInputs.userCount}
                          onChange={(e) =>
                            setComparableInputs({ ...comparableInputs, userCount: Number(e.target.value) })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="userMultiple">Value per User</Label>
                          <span className="text-sm font-medium">${comparableInputs.userMultiple}</span>
                        </div>
                        <Slider
                          id="userMultiple"
                          min={1}
                          max={500}
                          step={1}
                          value={[comparableInputs.userMultiple]}
                          onValueChange={(value) =>
                            setComparableInputs({ ...comparableInputs, userMultiple: value[0] })
                          }
                        />
                      </div>

                      <div className="pt-4">
                        <div className="bg-muted p-4 rounded-md">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Comparable Valuation</span>
                            <span className="text-lg font-bold text-[#0F7377]">
                              {formatCurrency(calculateComparableValuation())}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Based on industry multiples for revenue, EBITDA, and users.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <Button variant="outline" onClick={() => setActiveTab("dcf-method")}>
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Previous Method
                    </Button>
                    <Button onClick={() => setActiveTab("scorecard-method")}>
                      Next Method
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>

                {/* Scorecard Method */}
                <TabsContent value="scorecard-method" className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Scorecard Method</h3>
                      <Button variant="outline" size="sm" className="flex items-center">
                        <HelpCircle className="h-4 w-4 mr-2" />
                        How it works
                      </Button>
                    </div>
                    <p className="text-muted-foreground">
                      This method values your startup based on qualitative factors compared to a baseline valuation.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="baseValuation">Base Valuation</Label>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">$</span>
                          <Input
                            id="baseValuation"
                            type="number"
                            value={scorecardInputs.baseValuation}
                            onChange={(e) =>
                              setScoreCardInputs({ ...scorecardInputs, baseValuation: Number(e.target.value) })
                            }
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Average pre-money valuation for pre-revenue startups in your region and sector
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="teamScore">Team (30%)</Label>
                          <span className="text-sm font-medium">{scorecardInputs.teamScore}%</span>
                        </div>
                        <Slider
                          id="teamScore"
                          min={0}
                          max={200}
                          step={5}
                          value={[scorecardInputs.teamScore]}
                          onValueChange={(value) => setScoreCardInputs({ ...scorecardInputs, teamScore: value[0] })}
                        />
                        <p className="text-xs text-muted-foreground">
                          Quality, completeness, and experience of the founding team
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="marketScore">Market Opportunity (25%)</Label>
                          <span className="text-sm font-medium">{scorecardInputs.marketScore}%</span>
                        </div>
                        <Slider
                          id="marketScore"
                          min={0}
                          max={200}
                          step={5}
                          value={[scorecardInputs.marketScore]}
                          onValueChange={(value) => setScoreCardInputs({ ...scorecardInputs, marketScore: value[0] })}
                        />
                        <p className="text-xs text-muted-foreground">
                          Size, growth rate, and accessibility of the target market
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="productScore">Product/Technology (15%)</Label>
                          <span className="text-sm font-medium">{scorecardInputs.productScore}%</span>
                        </div>
                        <Slider
                          id="productScore"
                          min={0}
                          max={200}
                          step={5}
                          value={[scorecardInputs.productScore]}
                          onValueChange={(value) => setScoreCardInputs({ ...scorecardInputs, productScore: value[0] })}
                        />
                        <p className="text-xs text-muted-foreground">
                          Quality, uniqueness, and IP protection of the product
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="competitionScore">Competitive Environment (10%)</Label>
                          <span className="text-sm font-medium">{scorecardInputs.competitionScore}%</span>
                        </div>
                        <Slider
                          id="competitionScore"
                          min={0}
                          max={200}
                          step={5}
                          value={[scorecardInputs.competitionScore]}
                          onValueChange={(value) =>
                            setScoreCardInputs({ ...scorecardInputs, competitionScore: value[0] })
                          }
                        />
                        <p className="text-xs text-muted-foreground">
                          Strength of existing competitors and barriers to entry
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="tractionScore">Traction/Milestones (10%)</Label>
                          <span className="text-sm font-medium">{scorecardInputs.tractionScore}%</span>
                        </div>
                        <Slider
                          id="tractionScore"
                          min={0}
                          max={200}
                          step={5}
                          value={[scorecardInputs.tractionScore]}
                          onValueChange={(value) => setScoreCardInputs({ ...scorecardInputs, tractionScore: value[0] })}
                        />
                        <p className="text-xs text-muted-foreground">
                          Customer adoption, revenue growth, and milestone achievement
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="businessModelScore">Business Model (10%)</Label>
                          <span className="text-sm font-medium">{scorecardInputs.businessModelScore}%</span>
                        </div>
                        <Slider
                          id="businessModelScore"
                          min={0}
                          max={200}
                          step={5}
                          value={[scorecardInputs.businessModelScore]}
                          onValueChange={(value) =>
                            setScoreCardInputs({ ...scorecardInputs, businessModelScore: value[0] })
                          }
                        />
                        <p className="text-xs text-muted-foreground">
                          Path to profitability, unit economics, and scalability
                        </p>
                      </div>

                      <div className="pt-4">
                        <div className="bg-muted p-4 rounded-md">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Scorecard Valuation</span>
                            <span className="text-lg font-bold text-[#0F7377]">
                              {formatCurrency(calculateScorecardValuation())}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Based on qualitative factors compared to a baseline valuation of{" "}
                            {formatCurrency(scorecardInputs.baseValuation)}.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <Button variant="outline" onClick={() => setActiveTab("comparable-method")}>
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Previous Method
                    </Button>
                    <Button
                      onClick={() => {
                        toast({
                          title: "Valuation Complete",
                          description: "Your startup valuation has been calculated using all three methods.",
                        })
                      }}
                    >
                      Calculate Final Valuation
                      <Calculator className="ml-2 h-4 w-4" />
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
              <CardTitle>Final Valuation</CardTitle>
              <CardDescription>Combined result from all methods</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex flex-col items-center justify-center py-6">
                  <span className="text-3xl font-bold text-[#0F7377]">{formatCurrency(calculateFinalValuation())}</span>
                  <span className="text-sm text-muted-foreground mt-2">Estimated Valuation</span>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span>DCF Method</span>
                    <span className="font-medium">{formatCurrency(calculateDcfValuation())}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Comparable Method</span>
                    <span className="font-medium">{formatCurrency(calculateComparableValuation())}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Scorecard Method</span>
                    <span className="font-medium">{formatCurrency(calculateScorecardValuation())}</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Average Valuation</span>
                      <span className="font-bold">{formatCurrency(calculateFinalValuation())}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Valuation Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-center justify-center p-4">
                <div className="w-full h-40 bg-muted rounded-md flex items-center justify-center">
                  <PieChart className="h-10 w-10 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-2 mt-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-[#0F7377] mr-2"></div>
                  <span className="text-sm">DCF Method (33%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-[#10B981] mr-2"></div>
                  <span className="text-sm">Comparable Method (33%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-[#6366F1] mr-2"></div>
                  <span className="text-sm">Scorecard Method (33%)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Valuation Resources</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                <Link href="#" className="block p-3 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center">
                    <div className="bg-[#0F7377]/10 p-2 rounded-md mr-3">
                      <BarChart className="h-5 w-5 text-[#0F7377]" />
                    </div>
                    <div>
                      <h3 className="font-medium">Valuation Guide</h3>
                      <p className="text-sm text-muted-foreground">Learn about startup valuation methods</p>
                    </div>
                  </div>
                </Link>
                <Link href="#" className="block p-3 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center">
                    <div className="bg-[#0F7377]/10 p-2 rounded-md mr-3">
                      <LineChart className="h-5 w-5 text-[#0F7377]" />
                    </div>
                    <div>
                      <h3 className="font-medium">Industry Benchmarks</h3>
                      <p className="text-sm text-muted-foreground">Compare with industry standards</p>
                    </div>
                  </div>
                </Link>
                <Link href="#" className="block p-3 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center">
                    <div className="bg-[#0F7377]/10 p-2 rounded-md mr-3">
                      <Info className="h-5 w-5 text-[#0F7377]" />
                    </div>
                    <div>
                      <h3 className="font-medium">Investor Expectations</h3>
                      <p className="text-sm text-muted-foreground">What investors look for in valuations</p>
                    </div>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Valuation Disclaimer</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This calculator provides an estimate based on the information you provide. Actual valuations may vary
                significantly based on market conditions, investor sentiment, and other factors. Always consult with
                financial advisors before making investment decisions.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
