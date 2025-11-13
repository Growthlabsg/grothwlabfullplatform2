"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Share2, Save, BarChart4, ArrowUpRight, Info } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface ValuationData {
  id: string
  method: string
  value: number
  date: string
  details: {
    key: string
    value: string
  }[]
}

export function ValuationComparison() {
  const { toast } = useToast()
  const [selectedValuations, setSelectedValuations] = useState<string[]>(["dcf", "comparable"])
  const [viewType, setViewType] = useState<"chart" | "table">("chart")

  // Mock valuation data - in a real app, this would come from an API
  const valuationData: ValuationData[] = [
    {
      id: "dcf",
      method: "Discounted Cash Flow",
      value: 5250000,
      date: "2023-06-01",
      details: [
        { key: "Discount Rate", value: "15%" },
        { key: "Terminal Growth Rate", value: "3%" },
        { key: "Projection Period", value: "5 years" },
        { key: "Revenue CAGR", value: "25%" },
      ],
    },
    {
      id: "comparable",
      method: "Comparable Company Analysis",
      value: 4800000,
      date: "2023-06-01",
      details: [
        { key: "Revenue Multiple", value: "6.2x" },
        { key: "EBITDA Multiple", value: "12.5x" },
        { key: "Comparable Companies", value: "5" },
        { key: "Industry", value: "SaaS" },
      ],
    },
    {
      id: "vc",
      method: "VC Method",
      value: 6200000,
      date: "2023-06-01",
      details: [
        { key: "Exit Multiple", value: "10x" },
        { key: "Target ROI", value: "10x" },
        { key: "Exit Year", value: "5" },
        { key: "Expected Revenue", value: "$8M" },
      ],
    },
    {
      id: "scorecard",
      method: "Scorecard Method",
      value: 4500000,
      date: "2023-06-01",
      details: [
        { key: "Average Valuation", value: "$5M" },
        { key: "Management Score", value: "110%" },
        { key: "Market Opportunity", value: "130%" },
        { key: "Competition", value: "90%" },
      ],
    },
    {
      id: "berkus",
      method: "Berkus Method",
      value: 3750000,
      date: "2023-06-01",
      details: [
        { key: "Sound Idea", value: "$1M" },
        { key: "Prototype", value: "$750K" },
        { key: "Quality Management", value: "$1M" },
        { key: "Strategic Relationships", value: "$500K" },
        { key: "Product Rollout", value: "$500K" },
      ],
    },
  ]

  const handleValuationToggle = (id: string) => {
    setSelectedValuations((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]))
  }

  const handleSave = () => {
    toast({
      title: "Comparison Saved",
      description: "Your valuation comparison has been saved successfully.",
    })
  }

  const handleDownload = () => {
    toast({
      title: "Report Generated",
      description: "Your valuation comparison report has been generated and is downloading.",
    })
  }

  const handleShare = () => {
    toast({
      title: "Shareable Link Generated",
      description: "A link to this comparison has been copied to your clipboard.",
    })
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const filteredValuations = valuationData.filter((v) => selectedValuations.includes(v.id))
  const averageValuation =
    filteredValuations.length > 0
      ? filteredValuations.reduce((sum, v) => sum + v.value, 0) / filteredValuations.length
      : 0

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Valuation Comparison</CardTitle>
            <CardDescription>Compare different valuation methods for your startup</CardDescription>
          </div>
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
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {valuationData.map((valuation) => (
              <Button
                key={valuation.id}
                variant={selectedValuations.includes(valuation.id) ? "default" : "outline"}
                size="sm"
                onClick={() => handleValuationToggle(valuation.id)}
              >
                {valuation.method}
              </Button>
            ))}
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Average Valuation</div>
                <div className="text-2xl font-bold">{formatCurrency(averageValuation)}</div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant={viewType === "chart" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewType("chart")}
                >
                  <BarChart4 className="h-4 w-4 mr-2" />
                  Chart View
                </Button>
                <Button
                  variant={viewType === "table" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewType("table")}
                >
                  <ArrowUpRight className="h-4 w-4 mr-2" />
                  Table View
                </Button>
              </div>
            </div>
          </div>
        </div>

        {viewType === "chart" ? (
          <div className="h-64 flex items-center justify-center border rounded-lg">
            <div className="text-center text-muted-foreground">
              <BarChart4 className="h-8 w-8 mx-auto mb-2" />
              <p>Valuation Comparison Chart</p>
              <p className="text-sm">(Visualization would appear here)</p>
            </div>
          </div>
        ) : (
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3">Method</th>
                  <th className="text-left p-3">Valuation</th>
                  <th className="text-left p-3">Variance</th>
                  <th className="text-left p-3">Key Metrics</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredValuations.map((valuation) => {
                  const variance = (((valuation.value - averageValuation) / averageValuation) * 100).toFixed(1)
                  return (
                    <tr key={valuation.id} className="hover:bg-muted/50">
                      <td className="p-3 font-medium">{valuation.method}</td>
                      <td className="p-3">{formatCurrency(valuation.value)}</td>
                      <td className="p-3">
                        <Badge
                          variant="outline"
                          className={
                            Number.parseFloat(variance) > 0
                              ? "bg-green-100 text-green-800 hover:bg-green-200 border-green-200"
                              : Number.parseFloat(variance) < 0
                                ? "bg-red-100 text-red-800 hover:bg-red-200 border-red-200"
                                : ""
                          }
                        >
                          {Number.parseFloat(variance) > 0 ? "+" : ""}
                          {variance}%
                        </Badge>
                      </td>
                      <td className="p-3">
                        <div className="flex flex-wrap gap-1">
                          {valuation.details.slice(0, 2).map((detail, idx) => (
                            <Badge key={idx} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              {detail.key}: {detail.value}
                            </Badge>
                          ))}
                          {valuation.details.length > 2 && (
                            <Badge variant="outline">+{valuation.details.length - 2} more</Badge>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">Notes & Assumptions</h3>
          <div className="space-y-2">
            <div className="flex items-start">
              <Info className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                Different valuation methods may produce varying results based on their underlying assumptions.
              </p>
            </div>
            <div className="flex items-start">
              <Info className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                The average valuation is a simple mean and does not necessarily represent the most accurate valuation.
              </p>
            </div>
            <div className="flex items-start">
              <Info className="h-4 w-4 text-muted-foreground mr-2 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                Consider using multiple methods and applying appropriate weights based on your startup's specific
                situation.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Compare with Industry Benchmarks</Button>
        <Button>Generate Detailed Report</Button>
      </CardFooter>
    </Card>
  )
}
