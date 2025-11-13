"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart } from "@/components/dashboard/area-chart"
import { BarChartComponent } from "@/components/dashboard/bar-chart"
import { Badge } from "@/components/ui/badge"
import { TrendingDown, TrendingUp } from "lucide-react"

interface HiringTrendsProps {
  timeframe: string
}

export function HiringTrends({ timeframe }: HiringTrendsProps) {
  // Mock data - in a real app, this would come from an API
  const hiringVolumeData = [
    { name: "Q1 2024", value: 8 },
    { name: "Q2 2024", value: 12 },
    { name: "Q3 2024", value: 10 },
    { name: "Q4 2024", value: 15 },
    { name: "Q1 2025", value: 14 },
    { name: "Q2 2025", value: 18 },
  ]

  const timeToHireTrendData = [
    { name: "Q1 2024", value: 42 },
    { name: "Q2 2024", value: 38 },
    { name: "Q3 2024", value: 36 },
    { name: "Q4 2024", value: 34 },
    { name: "Q1 2025", value: 32 },
    { name: "Q2 2025", value: 30 },
  ]

  const hiringByDepartmentData = [
    { name: "Engineering", value: 45 },
    { name: "Product", value: 20 },
    { name: "Design", value: 15 },
    { name: "Marketing", value: 10 },
    { name: "Sales", value: 8 },
    { name: "Operations", value: 2 },
  ]

  const salaryTrendsData = [
    { name: "Engineering", value: 8500, trend: "up" },
    { name: "Product", value: 9200, trend: "up" },
    { name: "Design", value: 7800, trend: "up" },
    { name: "Marketing", value: 6500, trend: "stable" },
    { name: "Sales", value: 7200, trend: "up" },
    { name: "Operations", value: 5800, trend: "stable" },
  ]

  const candidateMarketTrends = [
    {
      trend: "Remote Work Expectations",
      description: "75% of candidates expect some form of remote work flexibility",
      impact: "High",
      recommendation: "Highlight remote/hybrid options in job descriptions",
    },
    {
      trend: "Increased Salary Expectations",
      description: "Salary expectations have increased by 12% year-over-year",
      impact: "High",
      recommendation: "Review compensation packages to remain competitive",
    },
    {
      trend: "Focus on Work-Life Balance",
      description: "68% of candidates prioritize work-life balance over higher pay",
      impact: "Medium",
      recommendation: "Emphasize company culture and benefits in job postings",
    },
    {
      trend: "Demand for Growth Opportunities",
      description: "82% of candidates seek clear career progression paths",
      impact: "Medium",
      recommendation: "Outline potential career paths during interviews",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <AreaChart
          title="Hiring Volume Trend"
          description="Number of new hires by quarter"
          data={hiringVolumeData}
          color="#0F7377"
        />

        <AreaChart
          title="Time to Hire Trend"
          description="Average days to hire by quarter"
          data={timeToHireTrendData}
          valueSuffix=" days"
          color="#0F7377"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <BarChartComponent
          title="Hiring by Department"
          description="Percentage of hires by department"
          data={hiringByDepartmentData}
          valueSuffix="%"
          color="#0F7377"
        />

        <Card>
          <CardHeader>
            <CardTitle>Salary Trends</CardTitle>
            <CardDescription>Average monthly salary by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {salaryTrendsData.map((dept) => (
                <div key={dept.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{dept.name}</span>
                    {dept.trend === "up" && <TrendingUp className="h-4 w-4 text-green-500" />}
                    {dept.trend === "down" && <TrendingDown className="h-4 w-4 text-red-500" />}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">${dept.value.toLocaleString()}</span>
                    {dept.trend === "up" && (
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        +5.2%
                      </Badge>
                    )}
                    {dept.trend === "stable" && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        +1.8%
                      </Badge>
                    )}
                    {dept.trend === "down" && (
                      <Badge variant="outline" className="bg-red-50 text-red-700">
                        -2.3%
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Candidate Market Trends</CardTitle>
          <CardDescription>Current trends affecting candidate expectations and hiring</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {candidateMarketTrends.map((trend, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{trend.trend}</h4>
                  <Badge
                    variant="outline"
                    className={
                      trend.impact === "High"
                        ? "bg-red-50 text-red-700"
                        : trend.impact === "Medium"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-blue-50 text-blue-700"
                    }
                  >
                    {trend.impact} Impact
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{trend.description}</p>
                <div className="flex items-center gap-2 pt-1">
                  <Badge variant="secondary">Recommendation</Badge>
                  <span className="text-sm">{trend.recommendation}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
