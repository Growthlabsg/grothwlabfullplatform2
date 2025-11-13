"use client"

import { useState } from "react"
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
import { ChevronLeft, Plus, Trash2, Download, Save, Share2, Sparkles } from "lucide-react"

export default function FinancialProjectionsPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("revenue")
  const [projectionYears, setProjectionYears] = useState(3)
  const [showAIDialog, setShowAIDialog] = useState(false)

  const [financialData, setFinancialData] = useState({
    // Company Info
    companyName: "",
    industry: "",
    startDate: "",

    // Revenue
    revenueStreams: [
      {
        id: "stream1",
        name: "Product/Service 1",
        pricePerUnit: 0,
        unitsSoldMonthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        growthRate: 5, // percentage
      },
    ],

    // Expenses
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

    // Funding
    initialInvestment: 0,
    additionalFunding: [{ id: "funding1", name: "Seed Round", amount: 0, month: 1, year: 1 }],

    // Growth Assumptions
    monthlyCustomerGrowthRate: 5, // percentage
    churnRate: 2, // percentage
    averageRevenuePerCustomer: 0,

    // Tax
    taxRate: 20, // percentage

    // Advanced Settings
    includeInflation: false,
    inflationRate: 2, // percentage
    discountRate: 10, // percentage for NPV calculations
  })

  const handleChange = (section: string, field: string, value: any) => {
    setFinancialData((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section as keyof typeof prev] as object || {}),
        [field]: value,
      },
    }))
  }

  const handleSimpleChange = (field: string, value: any) => {
    setFinancialData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleRevenueStreamChange = (index: number, field: string, value: any) => {
    setFinancialData((prev) => {
      const newStreams = [...prev.revenueStreams]
        newStreams[index] = {
          ...newStreams[index],
          [field]: value,
        }
      return {
        ...prev,
        revenueStreams: newStreams,
      }
    })
  }

  const handleMonthlySalesChange = (streamIndex: number, monthIndex: number, value: number) => {
    setFinancialData((prev) => {
      const newStreams = [...prev.revenueStreams]
      const newMonthlySales = [...(newStreams[streamIndex]?.unitsSoldMonthly || [])]
      newMonthlySales[monthIndex] = value
      if (newStreams[streamIndex]) {
        newStreams[streamIndex] = {
          ...newStreams[streamIndex],
          unitsSoldMonthly: newMonthlySales,
        }
      }
      return {
        ...prev,
        revenueStreams: newStreams,
      }
    })
  }

  const handleAddRevenueStream = () => {
    setFinancialData((prev) => ({
      ...prev,
      revenueStreams: [
        ...prev.revenueStreams,
        {
          id: `stream${Date.now()}`,
          name: `Product/Service ${prev.revenueStreams.length + 1}`,
          pricePerUnit: 0,
          unitsSoldMonthly: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          growthRate: 5,
        },
      ],
    }))
  }

  const handleRemoveRevenueStream = (index: number) => {
    setFinancialData((prev) => {
      const newStreams = [...prev.revenueStreams]
      newStreams.splice(index, 1)
      return {
        ...prev,
        revenueStreams: newStreams,
      }
    })
  }

  const handleFixedCostChange = (index: number, field: string, value: any) => {
    setFinancialData((prev) => {
      const newCosts = [...prev.fixedCosts]
      if (newCosts[index]) {
        newCosts[index] = {
          ...newCosts[index],
          [field]: value,
        }
      }
      return {
        ...prev,
        fixedCosts: newCosts,
      }
    })
  }

  const handleAddFixedCost = () => {
    setFinancialData((prev) => ({
      ...prev,
      fixedCosts: [
        ...prev.fixedCosts,
        {
          id: `fixed${Date.now()}`,
          name: `Fixed Cost ${prev.fixedCosts.length + 1}`,
          monthlyAmount: 0,
        },
      ],
    }))
  }

  const handleRemoveFixedCost = (index: number) => {
    setFinancialData((prev) => {
      const newCosts = [...prev.fixedCosts]
      newCosts.splice(index, 1)
      return {
        ...prev,
        fixedCosts: newCosts,
      }
    })
  }

  const handleVariableCostChange = (index: number, field: string, value: any) => {
    setFinancialData((prev) => {
      const newCosts = [...prev.variableCosts]
      if (newCosts[index]) {
        newCosts[index] = {
          ...newCosts[index],
          [field]: value,
        }
      }
      return {
        ...prev,
        variableCosts: newCosts,
      }
    })
  }

  const handleAddVariableCost = () => {
    setFinancialData((prev) => ({
      ...prev,
      variableCosts: [
        ...prev.variableCosts,
        {
          id: `var${Date.now()}`,
          name: `Variable Cost ${prev.variableCosts.length + 1}`,
          percentOfRevenue: 10,
          minimumMonthlyCost: 0,
        },
      ],
    }))
  }

  const handleRemoveVariableCost = (index: number) => {
    setFinancialData((prev) => {
      const newCosts = [...prev.variableCosts]
      newCosts.splice(index, 1)
      return {
        ...prev,
        variableCosts: newCosts,
      }
    })
  }

  const handleOneTimeCostChange = (index: number, field: string, value: any) => {
    setFinancialData((prev) => {
      const newCosts = [...prev.oneTimeCosts]
      if (newCosts[index]) {
        newCosts[index] = {
          ...newCosts[index],
          [field]: value,
        }
      }
      return {
        ...prev,
        oneTimeCosts: newCosts,
      }
    })
  }

  const handleAddOneTimeCost = () => {
    setFinancialData((prev) => ({
      ...prev,
      oneTimeCosts: [
        ...prev.oneTimeCosts,
        {
          id: `onetime${Date.now()}`,
          name: `One-time Cost ${prev.oneTimeCosts.length + 1}`,
          amount: 0,
          month: 1,
          year: 1,
        },
      ],
    }))
  }

  const handleRemoveOneTimeCost = (index: number) => {
    setFinancialData((prev) => {
      const newCosts = [...prev.oneTimeCosts]
      newCosts.splice(index, 1)
      return {
        ...prev,
        oneTimeCosts: newCosts,
      }
    })
  }

  const handleFundingChange = (index: number, field: string, value: any) => {
    setFinancialData((prev) => {
      const newFunding = [...prev.additionalFunding]
        newFunding[index] = {
          ...newFunding[index],
          [field]: value,
        }
      return {
        ...prev,
        additionalFunding: newFunding,
      }
    })
  }

  const handleAddFunding = () => {
    setFinancialData((prev) => ({
      ...prev,
      additionalFunding: [
        ...prev.additionalFunding,
        {
          id: `funding${Date.now()}`,
          name: `Funding Round ${prev.additionalFunding.length + 1}`,
          amount: 0,
          month: 1,
          year: 1,
        },
      ],
    }))
  }

  const handleRemoveFunding = (index: number) => {
    setFinancialData((prev) => {
      const newFunding = [...prev.additionalFunding]
      newFunding.splice(index, 1)
      return {
        ...prev,
        additionalFunding: newFunding,
      }
    })
  }

  const calculateTotalRevenue = () => {
    // This is a simplified calculation for the UI
    // In a real app, this would be more complex with growth rates applied over time
    let totalMonthlyRevenue = 0

    financialData.revenueStreams.forEach((stream) => {
      const averageMonthlySales = stream.unitsSoldMonthly.reduce((sum, units) => sum + units, 0) / 12
      totalMonthlyRevenue += averageMonthlySales * stream.pricePerUnit
    })

    return totalMonthlyRevenue * 12 * projectionYears
  }

  const calculateTotalExpenses = () => {
    // This is a simplified calculation for the UI
    const monthlyFixedCosts = financialData.fixedCosts.reduce((sum, cost) => sum + cost.monthlyAmount, 0)
    const annualFixedCosts = monthlyFixedCosts * 12 * projectionYears

    // Estimate variable costs based on revenue
    const totalRevenue = calculateTotalRevenue()
    const variableCostsPercentage =
      financialData.variableCosts.reduce((sum, cost) => sum + cost.percentOfRevenue, 0) /
      financialData.variableCosts.length
    const variableCosts = totalRevenue * (variableCostsPercentage / 100)

    // Add one-time costs
    const oneTimeCosts = financialData.oneTimeCosts.reduce((sum, cost) => sum + cost.amount, 0)

    return annualFixedCosts + variableCosts + oneTimeCosts
  }

  const calculateNetProfit = () => {
    const totalRevenue = calculateTotalRevenue()
    const totalExpenses = calculateTotalExpenses()
    const profit = totalRevenue - totalExpenses
    const tax = profit > 0 ? profit * (financialData.taxRate / 100) : 0
    return profit - tax
  }

  const calculateBreakEvenPoint = () => {
    // Simplified break-even calculation
    const monthlyFixedCosts = financialData.fixedCosts.reduce((sum, cost) => sum + cost.monthlyAmount, 0)

    let totalContributionMargin = 0
    financialData.revenueStreams.forEach((stream) => {
      const averageMonthlySales = stream.unitsSoldMonthly.reduce((sum, units) => sum + units, 0) / 12
      const revenue = averageMonthlySales * stream.pricePerUnit

      // Calculate variable costs for this stream
      let variableCost = 0
      financialData.variableCosts.forEach((cost) => {
        variableCost += revenue * (cost.percentOfRevenue / 100)
      })

      const contributionMargin = revenue > 0 ? (revenue - variableCost) / revenue : 0
      totalContributionMargin += contributionMargin
    })

    // Average contribution margin across all streams
    const avgContributionMargin = totalContributionMargin / financialData.revenueStreams.length

    // Break-even formula: Fixed Costs / Contribution Margin
    return avgContributionMargin > 0 ? monthlyFixedCosts / avgContributionMargin : 0
  }

  const handleSave = () => {
    toast({
      title: "Financial Projections Saved",
      description: "Your financial projections have been saved successfully.",
    })
  }

  const handleDownload = () => {
    toast({
      title: "Financial Projections Downloaded",
      description: "Your financial projections have been downloaded as an Excel file.",
    })
  }

  const handleShare = () => {
    toast({
      title: "Share Link Generated",
      description: "A shareable link to your financial projections has been copied to your clipboard.",
    })
  }

  const handleAIAssist = () => {
    setShowAIDialog(true)
  }

  const applyAIAssistance = () => {
    // In a real app, this would call an AI service
    toast({
      title: "AI Assistance Applied",
      description:
        "Your financial projections have been enhanced with industry benchmarks and realistic growth patterns.",
    })

    // Simulate AI-generated improvements
    setFinancialData((prev) => ({
      ...prev,
      revenueStreams: [
        {
          ...prev.revenueStreams[0],
          pricePerUnit: 99,
          unitsSoldMonthly: [10, 12, 15, 18, 22, 26, 31, 37, 44, 53, 64, 77],
          growthRate: 8,
        },
        ...prev.revenueStreams.slice(1),
      ],
      fixedCosts: [
        { id: "fixed1", name: "Rent", monthlyAmount: 2500 },
        { id: "fixed2", name: "Salaries", monthlyAmount: 15000 },
        { id: "fixed3", name: "Insurance", monthlyAmount: 800 },
      ],
      variableCosts: [
        {
          id: "var1",
          name: "Cost of Goods Sold",
          percentOfRevenue: 35,
          minimumMonthlyCost: 500,
        },
      ],
      monthlyCustomerGrowthRate: 7,
      churnRate: 3,
    }))

    setShowAIDialog(false)
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
              <h1 className="text-3xl font-bold mb-4">Financial Projections Tool</h1>
              <p className="text-[#334155] max-w-3xl">
                Build realistic financial projections for your startup with our easy-to-use tool. Create revenue forecasts,
                expense budgets, and cash flow projections to guide your business decisions and attract investors.
              </p>
            </div>
            <div className="flex flex-col space-y-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open('/startup/financial-projections/enhanced', '_blank')}
                className="bg-[#0F7377] text-white hover:bg-[#0F7377]/90"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Try AI-Enhanced Version
              </Button>
              <p className="text-xs text-gray-500 text-center">New AI-powered insights</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Financial Projections Builder</CardTitle>
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
                <CardDescription>
                  Build your financial projections by entering your revenue, expenses, and growth assumptions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <Label>Projection Period (Years)</Label>
                  <div className="flex items-center space-x-4 mt-2">
                    <Button
                      variant={projectionYears === 1 ? "default" : "outline"}
                      onClick={() => setProjectionYears(1)}
                      className={projectionYears === 1 ? "bg-[#0F7377] hover:bg-[#0F7377]/90" : ""}
                    >
                      1 Year
                    </Button>
                    <Button
                      variant={projectionYears === 3 ? "default" : "outline"}
                      onClick={() => setProjectionYears(3)}
                      className={projectionYears === 3 ? "bg-[#0F7377] hover:bg-[#0F7377]/90" : ""}
                    >
                      3 Years
                    </Button>
                    <Button
                      variant={projectionYears === 5 ? "default" : "outline"}
                      onClick={() => setProjectionYears(5)}
                      className={projectionYears === 5 ? "bg-[#0F7377] hover:bg-[#0F7377]/90" : ""}
                    >
                      5 Years
                    </Button>
                  </div>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-5 mb-8">
                    <TabsTrigger value="company">Company</TabsTrigger>
                    <TabsTrigger value="revenue">Revenue</TabsTrigger>
                    <TabsTrigger value="expenses">Expenses</TabsTrigger>
                    <TabsTrigger value="funding">Funding</TabsTrigger>
                    <TabsTrigger value="assumptions">Assumptions</TabsTrigger>
                  </TabsList>

                  <TabsContent value="company" className="space-y-6">
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
                      <Label htmlFor="startDate">Business Start Date*</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={financialData.startDate}
                        onChange={(e) => handleSimpleChange("startDate", e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="initialInvestment">Initial Investment/Capital*</Label>
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
                      <p className="text-xs text-muted-foreground mt-1">
                        Enter the amount of capital you're starting with
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="revenue" className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Revenue Streams</h3>
                      <Button variant="outline" size="sm" onClick={handleAddRevenueStream}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Revenue Stream
                      </Button>
                    </div>

                    <div className="space-y-6">
                      {financialData.revenueStreams.map((stream, index) => (
                        <Card key={stream.id} className="border border-muted">
                          <CardContent className="p-4 space-y-4">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium">Revenue Stream {index + 1}</h4>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveRevenueStream(index)}
                                className="h-8 w-8 text-destructive"
                                disabled={financialData.revenueStreams.length <= 1}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Remove revenue stream</span>
                              </Button>
                            </div>

                            <div>
                              <Label htmlFor={`stream-name-${index}`}>Name</Label>
                              <Input
                                id={`stream-name-${index}`}
                                value={stream.name}
                                onChange={(e) => handleRevenueStreamChange(index, "name", e.target.value)}
                                placeholder="e.g. Product Subscription"
                              />
                            </div>

                            <div>
                              <Label htmlFor={`price-per-unit-${index}`}>Price Per Unit</Label>
                              <div className="relative mt-1">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                                  $
                                </span>
                                <Input
                                  id={`price-per-unit-${index}`}
                                  type="number"
                                  className="pl-8"
                                  value={stream.pricePerUnit}
                                  onChange={(e) =>
                                    handleRevenueStreamChange(
                                      index,
                                      "pricePerUnit",
                                      Number.parseFloat(e.target.value) || 0,
                                    )
                                  }
                                  placeholder="0"
                                />
                              </div>
                            </div>

                            <div>
                              <Label htmlFor={`growth-rate-${index}`}>Annual Growth Rate (%)</Label>
                              <div className="flex items-center space-x-4">
                                <Slider
                                  id={`growth-rate-${index}`}
                                  min={0}
                                  max={100}
                                  step={1}
                                  value={[stream.growthRate]}
                                  onValueChange={(value) => handleRevenueStreamChange(index, "growthRate", value[0])}
                                  className="flex-1"
                                />
                                <span className="w-12 text-right">{stream.growthRate}%</span>
                              </div>
                            </div>

                            <div>
                              <Label>Monthly Units Sold (Year 1)</Label>
                              <div className="grid grid-cols-4 gap-2 mt-2">
                                {stream.unitsSoldMonthly.map((units, monthIndex) => (
                                  <div key={monthIndex}>
                                    <Label htmlFor={`units-${index}-${monthIndex}`} className="text-xs">
                                      {new Date(0, monthIndex).toLocaleString("default", { month: "short" })}
                                    </Label>
                                    <Input
                                      id={`units-${index}-${monthIndex}`}
                                      type="number"
                                      value={units}
                                      onChange={(e) =>
                                        handleMonthlySalesChange(
                                          index,
                                          monthIndex,
                                          Number.parseInt(e.target.value) || 0,
                                        )
                                      }
                                      className="mt-1"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="expenses" className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">Fixed Costs</h3>
                        <Button variant="outline" size="sm" onClick={handleAddFixedCost}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Fixed Cost
                        </Button>
                      </div>

                      <div className="space-y-4">
                        {financialData.fixedCosts.map((cost, index) => (
                          <div key={cost.id} className="border border-muted p-4 rounded-md">
                            <div className="flex justify-between items-center">
                              <div>
                                <Label htmlFor={`fixed-cost-name-${index}`}>Name</Label>
                                <Input
                                  id={`fixed-cost-name-${index}`}
                                  value={cost.name}
                                  onChange={(e) => handleFixedCostChange(index, "name", e.target.value)}
                                  placeholder="e.g. Rent"
                                />
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveFixedCost(index)}
                                className="h-8 w-8 text-destructive"
                                disabled={financialData.fixedCosts.length <= 1}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Remove fixed cost</span>
                              </Button>
                            </div>

                            <div>
                              <Label htmlFor={`fixed-cost-amount-${index}`}>Monthly Amount</Label>
                              <div className="relative mt-1">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                                  $
                                </span>
                                <Input
                                  id={`fixed-cost-amount-${index}`}
                                  type="number"
                                  className="pl-8"
                                  value={cost.monthlyAmount}
                                  onChange={(e) =>
                                    handleFixedCostChange(
                                      index,
                                      "monthlyAmount",
                                      Number.parseFloat(e.target.value) || 0,
                                    )
                                  }
                                  placeholder="0"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">Variable Costs</h3>
                        <Button variant="outline" size="sm" onClick={handleAddVariableCost}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Variable Cost
                        </Button>
                      </div>

                      <div className="space-y-4">
                        {financialData.variableCosts.map((cost, index) => (
                          <div key={cost.id} className="border border-muted p-4 rounded-md">
                            <div className="flex justify-between items-center">
                              <div>
                                <Label htmlFor={`variable-cost-name-${index}`}>Name</Label>
                                <Input
                                  id={`variable-cost-name-${index}`}
                                  value={cost.name}
                                  onChange={(e) => handleVariableCostChange(index, "name", e.target.value)}
                                  placeholder="e.g. Cost of Goods Sold"
                                />
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveVariableCost(index)}
                                className="h-8 w-8 text-destructive"
                                disabled={financialData.variableCosts.length <= 1}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Remove variable cost</span>
                              </Button>
                            </div>

                            <div>
                              <Label htmlFor={`variable-cost-percent-${index}`}>Percent of Revenue (%)</Label>
                              <div className="flex items-center space-x-4">
                                <Slider
                                  id={`variable-cost-percent-${index}`}
                                  min={0}
                                  max={100}
                                  step={1}
                                  value={[cost.percentOfRevenue]}
                                  onValueChange={(value) =>
                                    handleVariableCostChange(index, "percentOfRevenue", value[0])
                                  }
                                  className="flex-1"
                                />
                                <span className="w-12 text-right">{cost.percentOfRevenue}%</span>
                              </div>
                            </div>

                            <div>
                              <Label htmlFor={`variable-cost-min-${index}`}>Minimum Monthly Cost</Label>
                              <div className="relative mt-1">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                                  $
                                </span>
                                <Input
                                  id={`variable-cost-min-${index}`}
                                  type="number"
                                  className="pl-8"
                                  value={cost.minimumMonthlyCost}
                                  onChange={(e) =>
                                    handleVariableCostChange(
                                      index,
                                      "minimumMonthlyCost",
                                      Number.parseFloat(e.target.value) || 0,
                                    )
                                  }
                                  placeholder="0"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">One-time Costs</h3>
                        <Button variant="outline" size="sm" onClick={handleAddOneTimeCost}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add One-time Cost
                        </Button>
                      </div>

                      <div className="space-y-4">
                        {financialData.oneTimeCosts.map((cost, index) => (
                          <div key={cost.id} className="border border-muted p-4 rounded-md">
                            <div className="flex justify-between items-center">
                              <div>
                                <Label htmlFor={`onetime-cost-name-${index}`}>Name</Label>
                                <Input
                                  id={`onetime-cost-name-${index}`}
                                  value={cost.name}
                                  onChange={(e) => handleOneTimeCostChange(index, "name", e.target.value)}
                                  placeholder="e.g. Equipment Purchase"
                                />
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveOneTimeCost(index)}
                                className="h-8 w-8 text-destructive"
                                disabled={financialData.oneTimeCosts.length <= 1}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Remove one-time cost</span>
                              </Button>
                            </div>

                            <div>
                              <Label htmlFor={`onetime-cost-amount-${index}`}>Amount</Label>
                              <div className="relative mt-1">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                                  $
                                </span>
                                <Input
                                  id={`onetime-cost-amount-${index}`}
                                  type="number"
                                  className="pl-8"
                                  value={cost.amount}
                                  onChange={(e) =>
                                    handleOneTimeCostChange(index, "amount", Number.parseFloat(e.target.value) || 0)
                                  }
                                  placeholder="0"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor={`onetime-cost-month-${index}`}>Month</Label>
                                <Input
                                  id={`onetime-cost-month-${index}`}
                                  type="number"
                                  min="1"
                                  max="12"
                                  value={cost.month}
                                  onChange={(e) =>
                                    handleOneTimeCostChange(index, "month", Number.parseInt(e.target.value) || 1)
                                  }
                                  placeholder="1"
                                />
                              </div>
                              <div>
                                <Label htmlFor={`onetime-cost-year-${index}`}>Year</Label>
                                <Input
                                  id={`onetime-cost-year-${index}`}
                                  type="number"
                                  value={cost.year}
                                  onChange={(e) =>
                                    handleOneTimeCostChange(index, "year", Number.parseInt(e.target.value) || 1)
                                  }
                                  placeholder="1"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="funding" className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">Additional Funding Rounds</h3>
                        <Button variant="outline" size="sm" onClick={handleAddFunding}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Funding Round
                        </Button>
                      </div>

                      <div className="space-y-4">
                        {financialData.additionalFunding.map((funding, index) => (
                          <div key={funding.id} className="border border-muted p-4 rounded-md">
                            <div className="flex justify-between items-center">
                              <div>
                                <Label htmlFor={`funding-name-${index}`}>Name</Label>
                                <Input
                                  id={`funding-name-${index}`}
                                  value={funding.name}
                                  onChange={(e) => handleFundingChange(index, "name", e.target.value)}
                                  placeholder="e.g. Series A"
                                />
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveFunding(index)}
                                className="h-8 w-8 text-destructive"
                                disabled={financialData.additionalFunding.length <= 1}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Remove funding round</span>
                              </Button>
                            </div>

                            <div>
                              <Label htmlFor={`funding-amount-${index}`}>Amount</Label>
                              <div className="relative mt-1">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                                  $
                                </span>
                                <Input
                                  id={`funding-amount-${index}`}
                                  type="number"
                                  className="pl-8"
                                  value={funding.amount}
                                  onChange={(e) =>
                                    handleFundingChange(index, "amount", Number.parseFloat(e.target.value) || 0)
                                  }
                                  placeholder="0"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor={`funding-month-${index}`}>Month</Label>
                                <Input
                                  id={`funding-month-${index}`}
                                  type="number"
                                  min="1"
                                  max="12"
                                  value={funding.month}
                                  onChange={(e) =>
                                    handleFundingChange(index, "month", Number.parseInt(e.target.value) || 1)
                                  }
                                  placeholder="1"
                                />
                              </div>
                              <div>
                                <Label htmlFor={`funding-year-${index}`}>Year</Label>
                                <Input
                                  id={`funding-year-${index}`}
                                  type="number"
                                  value={funding.year}
                                  onChange={(e) =>
                                    handleFundingChange(index, "year", Number.parseInt(e.target.value) || 1)
                                  }
                                  placeholder="1"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="assumptions" className="space-y-6">
                    <div>
                      <Label htmlFor="customerGrowthRate">Monthly Customer Growth Rate (%)</Label>
                      <div className="flex items-center space-x-4">
                        <Slider
                          id="customerGrowthRate"
                          min={0}
                          max={20}
                          step={0.5}
                          value={[financialData.monthlyCustomerGrowthRate]}
                          onValueChange={(value) => handleSimpleChange("monthlyCustomerGrowthRate", value[0])}
                          className="flex-1"
                        />
                        <span className="w-12 text-right">{financialData.monthlyCustomerGrowthRate}%</span>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="churnRate">Customer Churn Rate (%)</Label>
                      <div className="flex items-center space-x-4">
                        <Slider
                          id="churnRate"
                          min={0}
                          max={10}
                          step={0.5}
                          value={[financialData.churnRate]}
                          onValueChange={(value) => handleSimpleChange("churnRate", value[0])}
                          className="flex-1"
                        />
                        <span className="w-12 text-right">{financialData.churnRate}%</span>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="averageRevenuePerCustomer">Average Revenue Per Customer</Label>
                      <div className="relative mt-1">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                          $
                        </span>
                        <Input
                          id="averageRevenuePerCustomer"
                          type="number"
                          className="pl-8"
                          value={financialData.averageRevenuePerCustomer}
                          onChange={(e) =>
                            handleSimpleChange("averageRevenuePerCustomer", Number.parseFloat(e.target.value) || 0)
                          }
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="taxRate">Tax Rate (%)</Label>
                      <div className="flex items-center space-x-4">
                        <Slider
                          id="taxRate"
                          min={0}
                          max={50}
                          step={1}
                          value={[financialData.taxRate]}
                          onValueChange={(value) => handleSimpleChange("taxRate", value[0])}
                          className="flex-1"
                        />
                        <span className="w-12 text-right">{financialData.taxRate}%</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="includeInflation" className="peer-disabled:cursor-not-allowed">
                        Include Inflation?
                      </Label>
                      <Switch
                        id="includeInflation"
                        checked={financialData.includeInflation}
                        onCheckedChange={(checked) => handleSimpleChange("includeInflation", checked)}
                      />
                    </div>

                    {financialData.includeInflation && (
                      <div>
                        <Label htmlFor="inflationRate">Inflation Rate (%)</Label>
                        <div className="flex items-center space-x-4">
                          <Slider
                            id="inflationRate"
                            min={0}
                            max={10}
                            step={0.5}
                            value={[financialData.inflationRate]}
                            onValueChange={(value) => handleSimpleChange("inflationRate", value[0])}
                            className="flex-1"
                          />
                          <span className="w-12 text-right">{financialData.inflationRate}%</span>
                        </div>
                      </div>
                    )}

                    <div>
                      <Label htmlFor="discountRate">Discount Rate (%) (for NPV)</Label>
                      <div className="flex items-center space-x-4">
                        <Slider
                          id="discountRate"
                          min={0}
                          max={20}
                          step={0.5}
                          value={[financialData.discountRate]}
                          onValueChange={(value) => handleSimpleChange("discountRate", value[0])}
                          className="flex-1"
                        />
                        <span className="w-12 text-right">{financialData.discountRate}%</span>
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
                <CardTitle>Financial Summary</CardTitle>
                <CardDescription>Key metrics from your projections</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium">Total Revenue (Over {projectionYears} Years)</div>
                  <div className="text-2xl font-bold">{formatCurrency(calculateTotalRevenue())}</div>
                </div>

                <div>
                  <div className="text-sm font-medium">Total Expenses (Over {projectionYears} Years)</div>
                  <div className="text-2xl font-bold">{formatCurrency(calculateTotalExpenses())}</div>
                </div>

                <div>
                  <div className="text-sm font-medium">Net Profit (Over {projectionYears} Years)</div>
                  <div className="text-2xl font-bold">{formatCurrency(calculateNetProfit())}</div>
                </div>

                <div>
                  <div className="text-sm font-medium">Break-Even Point (Monthly Revenue)</div>
                  <div className="text-2xl font-bold">{formatCurrency(calculateBreakEvenPoint())}</div>
                </div>

                <Button variant="secondary" className="w-full" onClick={handleAIAssist}>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Get AI Assistance
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {showAIDialog && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <Card className="max-w-md w-full">
              <CardHeader>
                <CardTitle>AI Assistance</CardTitle>
                <CardDescription>
                  Let our AI enhance your financial projections with industry benchmarks and realistic growth patterns.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Our AI will analyze your inputs and suggest improvements based on industry data and best practices.
                  This can help you create more realistic and compelling financial projections.
                </p>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowAIDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={applyAIAssistance}>Apply AI Assistance</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    )
}
