"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/layout/footer"
import { Line, LineChart, Bar, BarChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Download, Calendar } from "lucide-react"
import { formatCurrency, formatNumber, formatPercentage } from "@/utils/format"

// Sample data for detailed metrics
const dealFlowData = [
  { month: "Jan", newDeals: 18, inProgress: 12, closed: 5, rejected: 8 },
  { month: "Feb", newDeals: 22, inProgress: 14, closed: 6, rejected: 10 },
  { month: "Mar", newDeals: 20, inProgress: 15, closed: 7, rejected: 9 },
  { month: "Apr", newDeals: 24, inProgress: 15, closed: 8, rejected: 12 },
  { month: "May", newDeals: 28, inProgress: 18, closed: 9, rejected: 14 },
  { month: "Jun", newDeals: 32, inProgress: 20, closed: 11, rejected: 15 },
]

const dealSizeData = [
  { month: "Jan", averageDealSize: 220000, medianDealSize: 180000 },
  { month: "Feb", averageDealSize: 230000, medianDealSize: 190000 },
  { month: "Mar", averageDealSize: 240000, medianDealSize: 200000 },
  { month: "Apr", averageDealSize: 250000, medianDealSize: 210000 },
  { month: "May", averageDealSize: 260000, medianDealSize: 220000 },
  { month: "Jun", averageDealSize: 270000, medianDealSize: 230000 },
]

const conversionRateData = [
  { month: "Jan", conversionRate: 0.12, industryAverage: 0.1 },
  { month: "Feb", conversionRate: 0.13, industryAverage: 0.1 },
  { month: "Mar", conversionRate: 0.13, industryAverage: 0.11 },
  { month: "Apr", conversionRate: 0.14, industryAverage: 0.11 },
  { month: "May", conversionRate: 0.15, industryAverage: 0.11 },
  { month: "Jun", conversionRate: 0.16, industryAverage: 0.12 },
]

const industryBreakdownData = [
  { name: "Fintech", value: 35 },
  { name: "AI/ML", value: 25 },
  { name: "SaaS", value: 20 },
  { name: "E-commerce", value: 10 },
  { name: "Healthtech", value: 8 },
  { name: "Other", value: 2 },
]

const stageBreakdownData = [
  { name: "Idea", value: 15 },
  { name: "MVP", value: 30 },
  { name: "Early Traction", value: 35 },
  { name: "Growth", value: 20 },
]

export default function DetailedMetricsPage() {
  const [timeframe, setTimeframe] = useState("6m")

  return (
          <div>
          <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="text-3xl font-bold tracking-tight text-[#1E293B] md:text-4xl">Detailed Metrics</h1>

          <div className="flex items-center gap-3">
            <Select defaultValue={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[180px]">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1m">Last Month</SelectItem>
                <SelectItem value="3m">Last 3 Months</SelectItem>
                <SelectItem value="6m">Last 6 Months</SelectItem>
                <SelectItem value="1y">Last Year</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <Tabs defaultValue="deal-flow" className="w-full">
          <TabsList className="mb-6 w-full justify-start">
            <TabsTrigger value="deal-flow">Deal Flow</TabsTrigger>
            <TabsTrigger value="deal-size">Deal Size</TabsTrigger>
            <TabsTrigger value="conversion">Conversion Rate</TabsTrigger>
            <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
          </TabsList>

          <TabsContent value="deal-flow" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Deal Flow Trends</CardTitle>
                <CardDescription>Track the number of deals at each stage over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <ChartContainer
                    config={{
                      newDeals: {
                        label: "New Deals",
                        color: "hsl(var(--chart-1))",
                      },
                      inProgress: {
                        label: "In Progress",
                        color: "hsl(var(--chart-2))",
                      },
                      closed: {
                        label: "Closed",
                        color: "hsl(var(--chart-3))",
                      },
                      rejected: {
                        label: "Rejected",
                        color: "hsl(var(--chart-4))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={dealFlowData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line type="monotone" dataKey="newDeals" stroke="var(--color-newDeals)" />
                        <Line type="monotone" dataKey="inProgress" stroke="var(--color-inProgress)" />
                        <Line type="monotone" dataKey="closed" stroke="var(--color-closed)" />
                        <Line type="monotone" dataKey="rejected" stroke="var(--color-rejected)" />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm font-medium text-muted-foreground">Total New Deals</div>
                      <div className="text-2xl font-bold">{formatNumber(144)}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm font-medium text-muted-foreground">Total In Progress</div>
                      <div className="text-2xl font-bold">{formatNumber(94)}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm font-medium text-muted-foreground">Total Closed</div>
                      <div className="text-2xl font-bold">{formatNumber(46)}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm font-medium text-muted-foreground">Total Rejected</div>
                      <div className="text-2xl font-bold">{formatNumber(68)}</div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deal-size" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Deal Size Trends</CardTitle>
                <CardDescription>Track average and median deal sizes over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <ChartContainer
                    config={{
                      averageDealSize: {
                        label: "Average Deal Size",
                        color: "hsl(var(--chart-1))",
                      },
                      medianDealSize: {
                        label: "Median Deal Size",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={dealSizeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line type="monotone" dataKey="averageDealSize" stroke="var(--color-averageDealSize)" />
                        <Line type="monotone" dataKey="medianDealSize" stroke="var(--color-medianDealSize)" />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm font-medium text-muted-foreground">Average Deal Size</div>
                      <div className="text-2xl font-bold">{formatCurrency(245000)}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm font-medium text-muted-foreground">Median Deal Size</div>
                      <div className="text-2xl font-bold">{formatCurrency(205000)}</div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="conversion" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Conversion Rate Trends</CardTitle>
                <CardDescription>Track deal conversion rates compared to industry averages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <ChartContainer
                    config={{
                      conversionRate: {
                        label: "Your Conversion Rate",
                        color: "hsl(var(--chart-1))",
                      },
                      industryAverage: {
                        label: "Industry Average",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={conversionRateData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line type="monotone" dataKey="conversionRate" stroke="var(--color-conversionRate)" />
                        <Line
                          type="monotone"
                          dataKey="industryAverage"
                          stroke="var(--color-industryAverage)"
                          strokeDasharray="5 5"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm font-medium text-muted-foreground">Your Conversion Rate</div>
                      <div className="text-2xl font-bold">{formatPercentage(0.14)}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm font-medium text-muted-foreground">Industry Average</div>
                      <div className="text-2xl font-bold">{formatPercentage(0.11)}</div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="breakdown" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Industry Breakdown</CardTitle>
                  <CardDescription>Distribution of deals by industry</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ChartContainer
                      config={{
                        value: {
                          label: "Deals",
                          color: "hsl(var(--chart-1))",
                        },
                      }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={industryBreakdownData} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis dataKey="name" type="category" width={100} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="value" fill="var(--color-value)" />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Stage Breakdown</CardTitle>
                  <CardDescription>Distribution of deals by startup stage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ChartContainer
                      config={{
                        value: {
                          label: "Deals",
                          color: "hsl(var(--chart-2))",
                        },
                      }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={stageBreakdownData} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis dataKey="name" type="category" width={100} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="value" fill="var(--color-value)" />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
      
    </div>
  )
}
