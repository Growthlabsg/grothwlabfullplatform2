"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, BarChart2, Bookmark, BriefcaseBusiness, Building, Users } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface BenchmarkData {
  id: string
  metric: string
  value: number | string
  industryAverage: number | string
  percentile?: number
  trend?: "up" | "down" | "stable"
  format?: "currency" | "percentage" | "multiple" | "ratio" | "count"
}

interface ValuationMultiple {
  id: string
  metric: string
  value: number
  range: {
    min: number
    max: number
  }
  description: string
}

export function IndustryBenchmarks() {
  const { toast } = useToast()
  const [industry, setIndustry] = useState("saas")
  const [stage, setStage] = useState("seed")
  const [region, setRegion] = useState("global")
  const [benchmarkView, setBenchmarkView] = useState("financial")

  // Mock benchmark data - in a real application, this would come from an API
  const benchmarkData: Record<string, BenchmarkData[]> = {
    financial: [
      {
        id: "revenue_growth",
        metric: "Revenue Growth Rate (YoY)",
        value: "42%",
        industryAverage: "35%",
        percentile: 65,
        trend: "up",
        format: "percentage",
      },
      {
        id: "gross_margin",
        metric: "Gross Margin",
        value: "78%",
        industryAverage: "72%",
        percentile: 70,
        trend: "stable",
        format: "percentage",
      },
      {
        id: "cac",
        metric: "Customer Acquisition Cost",
        value: "$1,200",
        industryAverage: "$1,500",
        percentile: 75,
        trend: "down",
        format: "currency",
      },
      {
        id: "ltv_cac",
        metric: "LTV/CAC Ratio",
        value: "3.2",
        industryAverage: "3.0",
        percentile: 60,
        trend: "up",
        format: "ratio",
      },
      {
        id: "burn_rate",
        metric: "Monthly Burn Rate",
        value: "$85,000",
        industryAverage: "$95,000",
        percentile: 65,
        trend: "stable",
        format: "currency",
      },
      {
        id: "runway",
        metric: "Runway (months)",
        value: "18",
        industryAverage: "14",
        percentile: 80,
        trend: "stable",
        format: "count",
      },
    ],
    valuation: [
      {
        id: "valuation_growth",
        metric: "Valuation Growth Rate (YoY)",
        value: "65%",
        industryAverage: "45%",
        percentile: 85,
        trend: "up",
        format: "percentage",
      },
      {
        id: "revenue_multiple",
        metric: "Revenue Multiple",
        value: "12.5x",
        industryAverage: "10.2x",
        percentile: 75,
        trend: "up",
        format: "multiple",
      },
      {
        id: "arpc_multiple",
        metric: "ARPC Multiple",
        value: "6.2x",
        industryAverage: "5.8x",
        percentile: 65,
        trend: "stable",
        format: "multiple",
      },
      {
        id: "valuation_per_employee",
        metric: "Valuation per Employee",
        value: "$1.2M",
        industryAverage: "$950K",
        percentile: 70,
        trend: "up",
        format: "currency",
      },
    ],
    product: [
      {
        id: "active_users",
        metric: "Monthly Active Users Growth",
        value: "28%",
        industryAverage: "22%",
        percentile: 75,
        trend: "up",
        format: "percentage",
      },
      {
        id: "retention",
        metric: "User Retention (30-day)",
        value: "42%",
        industryAverage: "38%",
        percentile: 65,
        trend: "stable",
        format: "percentage",
      },
      {
        id: "engagement",
        metric: "Daily Active / Monthly Active Users",
        value: "0.35",
        industryAverage: "0.32",
        percentile: 60,
        trend: "up",
        format: "ratio",
      },
    ],
    team: [
      {
        id: "employee_growth",
        metric: "Employee Growth Rate (YoY)",
        value: "85%",
        industryAverage: "65%",
        percentile: 80,
        trend: "up",
        format: "percentage",
      },
      {
        id: "revenue_per_employee",
        metric: "Revenue per Employee",
        value: "$250K",
        industryAverage: "$220K",
        percentile: 65,
        trend: "stable",
        format: "currency",
      },
      {
        id: "tech_ratio",
        metric: "Engineering to Non-Engineering Ratio",
        value: "2.1",
        industryAverage: "1.8",
        percentile: 70,
        trend: "stable",
        format: "ratio",
      },
    ],
  }

  const valuationMultiples: ValuationMultiple[] = [
    {
      id: "revenue_multiple",
      metric: "Revenue Multiple",
      value: 12.5,
      range: {
        min: 5,
        max: 15,
      },
      description:
        "Early-stage SaaS startups typically trade at 5-15x ARR depending on growth rate and market conditions.",
    },
    {
      id: "arpc_multiple",
      metric: "ARPC Multiple",
      value: 6.2,
      range: {
        min: 3,
        max: 8,
      },
      description: "Annual Revenue Per Customer multiple reflects customer value and retention.",
    },
    {
      id: "growth_adjusted",
      metric: "Growth-Adjusted Revenue Multiple",
      value: 0.8,
      range: {
        min: 0.4,
        max: 1.2,
      },
      description:
        "Revenue multiple divided by YoY growth rate - good for comparing companies with different growth rates.",
    },
    {
      id: "rule_of_40",
      metric: "Rule of 40 Score",
      value: 62,
      range: {
        min: 40,
        max: 80,
      },
      description: "Sum of growth rate and profit margin - should exceed 40% for SaaS companies.",
    },
  ]

  const handleDownload = () => {
    toast({
      title: "Benchmark Report Download Started",
      description: "Your benchmark comparison report is downloading.",
    })
  }

  const handleSave = () => {
    toast({
      title: "Benchmarks Saved",
      description: "These benchmark metrics have been saved to your dashboard.",
    })
  }

  const getPercentileIndicator = (percentile: number | undefined) => {
    if (!percentile) return null

    if (percentile >= 75) {
      return <Badge className="bg-green-100 text-green-800 border-green-200">Top 25%</Badge>
    } else if (percentile >= 50) {
      return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Above Average</Badge>
    } else if (percentile >= 25) {
      return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Below Average</Badge>
    } else {
      return <Badge className="bg-red-100 text-red-800 border-red-200">Bottom 25%</Badge>
    }
  }

  const getTrendIndicator = (trend: string | undefined) => {
    if (!trend) return null

    if (trend === "up") {
      return <span className="text-green-600">↑</span>
    } else if (trend === "down") {
      return <span className="text-red-600">↓</span>
    } else {
      return <span className="text-gray-600">→</span>
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Industry Benchmarks</CardTitle>
            <CardDescription>Compare your startup metrics with industry averages</CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handleSave}>
              <Bookmark className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div>
            <Select value={industry} onValueChange={setIndustry}>
              <SelectTrigger className="w-[200px]">
                <BriefcaseBusiness className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="saas">SaaS</SelectItem>
                <SelectItem value="fintech">Fintech</SelectItem>
                <SelectItem value="healthtech">Healthtech</SelectItem>
                <SelectItem value="ecommerce">E-commerce</SelectItem>
                <SelectItem value="marketplace">Marketplace</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select value={stage} onValueChange={setStage}>
              <SelectTrigger className="w-[200px]">
                <Building className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pre-seed">Pre-Seed</SelectItem>
                <SelectItem value="seed">Seed</SelectItem>
                <SelectItem value="series-a">Series A</SelectItem>
                <SelectItem value="series-b">Series B</SelectItem>
                <SelectItem value="series-c-plus">Series C+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger className="w-[200px]">
                <Users className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="global">Global</SelectItem>
                <SelectItem value="north-america">North America</SelectItem>
                <SelectItem value="europe">Europe</SelectItem>
                <SelectItem value="asia-pacific">Asia-Pacific</SelectItem>
                <SelectItem value="singapore">Singapore</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="border p-4 rounded-lg mb-6 bg-muted/50">
          <h3 className="font-medium text-lg mb-2">Benchmark Summary</h3>
          <p className="text-muted-foreground mb-4">
            {`These benchmarks are for ${
              stage === "pre-seed"
                ? "Pre-Seed"
                : stage === "seed"
                  ? "Seed"
                  : stage === "series-a"
                    ? "Series A"
                    : stage === "series-b"
                      ? "Series B"
                      : "Series C+"
            } stage `}
            {`${
              industry === "saas"
                ? "SaaS"
                : industry === "fintech"
                  ? "Fintech"
                  : industry === "healthtech"
                    ? "Healthtech"
                    : industry === "ecommerce"
                      ? "E-commerce"
                      : "Marketplace"
            } startups `}
            {`in the ${
              region === "global"
                ? "Global"
                : region === "north-america"
                  ? "North American"
                  : region === "europe"
                    ? "European"
                    : region === "asia-pacific"
                      ? "Asia-Pacific"
                      : "Singapore"
            } market.`}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-sm text-muted-foreground">Valuation Multiple Range</div>
                <div className="text-xl font-bold">5.2x - 15.8x</div>
                <div className="text-sm text-muted-foreground">Revenue</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-sm text-muted-foreground">Median Valuation</div>
                <div className="text-xl font-bold">$12.5M</div>
                <div className="text-sm text-muted-foreground">+45% YoY</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-sm text-muted-foreground">Revenue Growth</div>
                <div className="text-xl font-bold">35%</div>
                <div className="text-sm text-muted-foreground">Annual Average</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-sm text-muted-foreground">Data Sample Size</div>
                <div className="text-xl font-bold">285</div>
                <div className="text-sm text-muted-foreground">Companies</div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="metrics" className="space-y-4">
          <TabsList>
            <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
            <TabsTrigger value="multiples">Valuation Multiples</TabsTrigger>
          </TabsList>

          <TabsContent value="metrics">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-lg">Benchmark Comparison</h3>
                  <div>
                    <Select value={benchmarkView} onValueChange={setBenchmarkView}>
                      <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Select metrics" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="financial">Financial</SelectItem>
                        <SelectItem value="valuation">Valuation</SelectItem>
                        <SelectItem value="product">Product</SelectItem>
                        <SelectItem value="team">Team</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted text-sm">
                      <tr>
                        <th className="text-left p-3">Metric</th>
                        <th className="text-left p-3">Your Value</th>
                        <th className="text-left p-3">Industry Average</th>
                        <th className="text-left p-3">Percentile</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {(benchmarkData[benchmarkView] ? benchmarkData[benchmarkView].map : undefined)((benchmark) => (
                        <tr key={benchmark.id} className="hover:bg-muted/50">
                          <td className="p-3 font-medium">
                            {benchmark.metric}
                            {benchmark.trend && <span className="ml-2">{getTrendIndicator(benchmark.trend)}</span>}
                          </td>
                          <td className="p-3">{benchmark.value}</td>
                          <td className="p-3">{benchmark.industryAverage}</td>
                          <td className="p-3">{getPercentileIndicator(benchmark.percentile)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="h-64 border rounded-lg flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <BarChart2 className="h-8 w-8 mx-auto mb-2" />
                  <p>Benchmark Comparison Chart</p>
                  <p className="text-sm">(Visualization would appear here)</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="multiples">
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-lg mb-4">Valuation Multiples</h3>

                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted text-sm">
                      <tr>
                        <th className="text-left p-3">Multiple</th>
                        <th className="text-left p-3">Your Value</th>
                        <th className="text-left p-3">Industry Range</th>
                        <th className="text-left p-3">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {valuationMultiples.map((multiple) => (
                        <tr key={multiple.id} className="hover:bg-muted/50">
                          <td className="p-3 font-medium">{multiple.metric}</td>
                          <td className="p-3">
                            {multiple.id.includes("multiple")
                              ? `${multiple.value}x`
                              : multiple.id === "rule_of_40"
                                ? `${multiple.value}`
                                : `${multiple.value}`}
                          </td>
                          <td className="p-3">
                            {multiple.id.includes("multiple")
                              ? `${multiple.range.min}x - ${multiple.range.max}x`
                              : multiple.id === "rule_of_40"
                                ? `${multiple.range.min} - ${multiple.range.max}`
                                : `${multiple.range.min} - ${multiple.range.max}`}
                          </td>
                          <td className="p-3 text-sm text-muted-foreground">{multiple.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="h-64 border rounded-lg flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <BarChart2 className="h-8 w-8 mx-auto mb-2" />
                  <p>Valuation Multiples Comparison</p>
                  <p className="text-sm">(Visualization would appear here)</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
