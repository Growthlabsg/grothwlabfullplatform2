"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  LineChart,
  DownloadCloud,
  Calendar,
  Filter,
  BarChart4,
  TableProperties,
  TrendingUp,
  TrendingDown,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface ValuationHistoryEntry {
  id: string
  date: string
  method: string
  value: number
  previousValue?: number
  change?: number
  changePercent?: number
  author: string
  notes?: string
  inputs: {
    [key: string]: any
  }
}

export function ValuationHistory() {
  const { toast } = useToast()
  const [period, setPeriod] = useState<string>("6m")
  const [method, setMethod] = useState<string>("all")
  const [view, setView] = useState<"chart" | "table">("chart")

  // Mock data - in a real application, this would come from an API
  const valuationHistory: ValuationHistoryEntry[] = [
    {
      id: "v8",
      date: "2023-06-01",
      method: "DCF",
      value: 5250000,
      previousValue: 5000000,
      change: 250000,
      changePercent: 5,
      author: "Sarah Chen",
      notes: "Updated growth projections based on Q2 results",
      inputs: {
        discountRate: "15%",
        terminalGrowthRate: "3%",
        projectionPeriod: "5 years",
        revenueCagr: "25%",
      },
    },
    {
      id: "v7",
      date: "2023-03-15",
      method: "Comparable",
      value: 4800000,
      previousValue: 4500000,
      change: 300000,
      changePercent: 6.7,
      author: "Michael Johnson",
      notes: "Updated comparable companies dataset with recent IPOs",
      inputs: {
        revenueMultiple: "6.2x",
        ebitdaMultiple: "12.5x",
        comparableCompanies: "5",
        industry: "SaaS",
      },
    },
    {
      id: "v6",
      date: "2023-01-10",
      method: "VC Method",
      value: 4500000,
      previousValue: 4200000,
      change: 300000,
      changePercent: 7.1,
      author: "Sarah Chen",
      notes: "Adjusted exit multiple based on market conditions",
      inputs: {
        exitMultiple: "10x",
        targetRoi: "10x",
        exitYear: "5",
        expectedRevenue: "$6M",
      },
    },
    {
      id: "v5",
      date: "2022-11-05",
      method: "DCF",
      value: 4200000,
      previousValue: 4000000,
      change: 200000,
      changePercent: 5,
      author: "James Wilson",
      notes: "Updated cash flow projections with new product launch",
      inputs: {
        discountRate: "16%",
        terminalGrowthRate: "2.5%",
        projectionPeriod: "5 years",
        revenueCagr: "22%",
      },
    },
    {
      id: "v4",
      date: "2022-09-20",
      method: "Scorecard",
      value: 4000000,
      previousValue: 3800000,
      change: 200000,
      changePercent: 5.3,
      author: "Emily Zhang",
      notes: "Improved management score after new CMO hire",
      inputs: {
        averageValuation: "$4M",
        managementScore: "110%",
        marketOpportunity: "120%",
        competition: "90%",
      },
    },
    {
      id: "v3",
      date: "2022-06-15",
      method: "Comparable",
      value: 3800000,
      previousValue: 3500000,
      change: 300000,
      changePercent: 8.6,
      author: "Michael Johnson",
      notes: "Updated with new market data",
      inputs: {
        revenueMultiple: "5.8x",
        ebitdaMultiple: "11.5x",
        comparableCompanies: "4",
        industry: "SaaS",
      },
    },
    {
      id: "v2",
      date: "2022-03-10",
      method: "DCF",
      value: 3500000,
      previousValue: 3200000,
      change: 300000,
      changePercent: 9.4,
      author: "Sarah Chen",
      notes: "Updated growth projections after seed funding",
      inputs: {
        discountRate: "18%",
        terminalGrowthRate: "2%",
        projectionPeriod: "5 years",
        revenueCagr: "18%",
      },
    },
    {
      id: "v1",
      date: "2022-01-05",
      method: "Berkus",
      value: 3200000,
      author: "James Wilson",
      notes: "Initial valuation",
      inputs: {
        soundIdea: "$800K",
        prototype: "$600K",
        qualityManagement: "$900K",
        strategicRelationships: "$500K",
        productRollout: "$400K",
      },
    },
  ]

  const filteredHistory = valuationHistory.filter((entry) => {
    if (method !== "all" && entry.method.toLowerCase() !== method.toLowerCase()) {
      return false
    }

    const entryDate = new Date(entry.date)
    const now = new Date()

    if (period === "1m") {
      const oneMonthAgo = new Date()
      oneMonthAgo.setMonth(now.getMonth() - 1)
      return entryDate >= oneMonthAgo
    } else if (period === "3m") {
      const threeMonthsAgo = new Date()
      threeMonthsAgo.setMonth(now.getMonth() - 3)
      return entryDate >= threeMonthsAgo
    } else if (period === "6m") {
      const sixMonthsAgo = new Date()
      sixMonthsAgo.setMonth(now.getMonth() - 6)
      return entryDate >= sixMonthsAgo
    } else if (period === "1y") {
      const oneYearAgo = new Date()
      oneYearAgo.setFullYear(now.getFullYear() - 1)
      return entryDate >= oneYearAgo
    } else if (period === "all") {
      return true
    }

    return true
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const handleDownload = () => {
    toast({
      title: "History Export Started",
      description: "Your valuation history is being exported and will download shortly.",
    })
  }

  const latestValuation = filteredHistory.length > 0 ? filteredHistory[0] : null
  const oldestValuation = filteredHistory.length > 0 ? filteredHistory[filteredHistory.length - 1] : null

  const overallChange =
    latestValuation && oldestValuation
      ? (((latestValuation.value - oldestValuation.value) / oldestValuation.value) * 100).toFixed(1)
      : "0"

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Valuation History</CardTitle>
            <CardDescription>Track your startup's valuation over time</CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <DownloadCloud className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground">Current Valuation</div>
              <div className="text-2xl font-bold">
                {latestValuation ? formatCurrency(latestValuation.value) : "N/A"}
              </div>
              <div className="text-sm mt-1">{latestValuation?.date ? formatDate(latestValuation.date) : ""}</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground">Overall Change</div>
              <div className="flex items-center">
                <span className="text-2xl font-bold mr-2">{overallChange}%</span>
                {Number.parseFloat(overallChange) > 0 ? (
                  <TrendingUp className="text-green-500 h-5 w-5" />
                ) : Number.parseFloat(overallChange) < 0 ? (
                  <TrendingDown className="text-red-500 h-5 w-5" />
                ) : null}
              </div>
              <div className="text-sm mt-1">
                {oldestValuation?.date ? `Since ${formatDate(oldestValuation.date)}` : ""}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground">Valuation Updates</div>
              <div className="text-2xl font-bold">{filteredHistory.length}</div>
              <div className="text-sm mt-1">
                {period === "1m"
                  ? "In the last month"
                  : period === "3m"
                    ? "In the last 3 months"
                    : period === "6m"
                      ? "In the last 6 months"
                      : period === "1y"
                        ? "In the last year"
                        : "All time"}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div>
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="w-[180px]">
                  <Calendar className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Select Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1m">Last Month</SelectItem>
                  <SelectItem value="3m">Last 3 Months</SelectItem>
                  <SelectItem value="6m">Last 6 Months</SelectItem>
                  <SelectItem value="1y">Last Year</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select value={method} onValueChange={setMethod}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="dcf">DCF</SelectItem>
                  <SelectItem value="comparable">Comparable</SelectItem>
                  <SelectItem value="vc method">VC Method</SelectItem>
                  <SelectItem value="scorecard">Scorecard</SelectItem>
                  <SelectItem value="berkus">Berkus</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant={view === "chart" ? "default" : "outline"} size="sm" onClick={() => setView("chart")}>
              <BarChart4 className="h-4 w-4 mr-2" />
              Chart
            </Button>
            <Button variant={view === "table" ? "default" : "outline"} size="sm" onClick={() => setView("table")}>
              <TableProperties className="h-4 w-4 mr-2" />
              Table
            </Button>
          </div>
        </div>

        {view === "chart" ? (
          <div className="h-64 border rounded-lg flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <LineChart className="h-8 w-8 mx-auto mb-2" />
              <p>Valuation History Chart</p>
              <p className="text-sm">(Visualization would appear here)</p>
            </div>
          </div>
        ) : (
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted text-sm">
                <tr>
                  <th className="text-left p-3">Date</th>
                  <th className="text-left p-3">Method</th>
                  <th className="text-left p-3">Valuation</th>
                  <th className="text-left p-3">Change</th>
                  <th className="text-left p-3">Author</th>
                  <th className="text-left p-3">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredHistory.map((entry) => (
                  <tr key={entry.id} className="hover:bg-muted/50">
                    <td className="p-3">{formatDate(entry.date)}</td>
                    <td className="p-3">
                      <Badge variant="outline">{entry.method}</Badge>
                    </td>
                    <td className="p-3 font-medium">{formatCurrency(entry.value)}</td>
                    <td className="p-3">
                      {entry.changePercent !== undefined ? (
                        <Badge
                          variant="outline"
                          className={
                            entry.changePercent > 0
                              ? "bg-green-100 text-green-800 border-green-200"
                              : entry.changePercent < 0
                                ? "bg-red-100 text-red-800 border-red-200"
                                : ""
                          }
                        >
                          {entry.changePercent > 0 ? "+" : ""}
                          {entry.changePercent}%
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground text-sm">Initial</span>
                      )}
                    </td>
                    <td className="p-3">{entry.author}</td>
                    <td className="p-3 text-sm text-muted-foreground truncate max-w-[200px]">{entry.notes || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">View All Valuations</Button>
        <Button>Add New Valuation</Button>
      </CardFooter>
    </Card>
  )
}
