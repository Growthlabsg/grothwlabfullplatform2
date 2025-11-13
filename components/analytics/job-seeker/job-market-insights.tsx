"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart } from "@/components/dashboard/area-chart"
import { BarChartComponent } from "@/components/dashboard/bar-chart"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, TrendingDown, TrendingUp } from "lucide-react"
import Link from "next/link"

interface JobMarketInsightsProps {
  timeframe: string
}

export function JobMarketInsights({ timeframe }: JobMarketInsightsProps) {
  // Mock data - in a real app, this would come from an API
  const salaryTrendData = [
    { name: "Jan", value: 7500 },
    { name: "Feb", value: 7600 },
    { name: "Mar", value: 7650 },
    { name: "Apr", value: 7700 },
    { name: "May", value: 7800 },
    { name: "Jun", value: 7900 },
    { name: "Jul", value: 8000 },
    { name: "Aug", value: 8100 },
    { name: "Sep", value: 8200 },
    { name: "Oct", value: 8300 },
    { name: "Nov", value: 8400 },
    { name: "Dec", value: 8500 },
  ]

  const demandByLocationData = [
    { name: "Singapore", value: 85 },
    { name: "Remote", value: 75 },
    { name: "Kuala Lumpur", value: 60 },
    { name: "Bangkok", value: 45 },
    { name: "Jakarta", value: 40 },
    { name: "Ho Chi Minh", value: 35 },
  ]

  const industryTrendsData = [
    { name: "Fintech", value: 92, trend: "up" },
    { name: "Healthtech", value: 88, trend: "up" },
    { name: "E-commerce", value: 75, trend: "stable" },
    { name: "Edtech", value: 72, trend: "up" },
    { name: "SaaS", value: 68, trend: "up" },
    { name: "Travel", value: 45, trend: "down" },
  ]

  const inDemandSkillsData = [
    { name: "React", value: 95, trend: "up" },
    { name: "AWS", value: 90, trend: "up" },
    { name: "TypeScript", value: 85, trend: "up" },
    { name: "Docker", value: 80, trend: "up" },
    { name: "Kubernetes", value: 75, trend: "up" },
    { name: "Node.js", value: 70, trend: "stable" },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <AreaChart
          title="Salary Trends for Your Role"
          description="Average monthly salary for Full Stack Developers"
          data={salaryTrendData}
          valuePrefix="$"
          color="#0F7377"
        />

        <BarChartComponent
          title="Job Demand by Location"
          description="Relative demand for your skills by location"
          data={demandByLocationData}
          valueSuffix="%"
          color="#0F7377"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Industry Trends</CardTitle>
            <CardDescription>Growth trends by industry for your role</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {industryTrendsData.map((industry) => (
                <div key={industry.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{industry.name}</span>
                    {industry.trend === "up" && <TrendingUp className="h-4 w-4 text-green-500" />}
                    {industry.trend === "down" && <TrendingDown className="h-4 w-4 text-red-500" />}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-slate-100">
                      {industry.value}% Demand
                    </Badge>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                      <Link href="#">
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>In-Demand Skills</CardTitle>
            <CardDescription>Most requested skills in job postings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inDemandSkillsData.map((skill) => (
                <div key={skill.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{skill.name}</span>
                    {skill.trend === "up" && <TrendingUp className="h-4 w-4 text-green-500" />}
                    {skill.trend === "down" && <TrendingDown className="h-4 w-4 text-red-500" />}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-slate-100">
                      {skill.value}% Demand
                    </Badge>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                      <Link href="#">
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Market Insights Summary</CardTitle>
          <CardDescription>Key takeaways about the current job market for your role</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-full bg-green-100 p-1">
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium">Strong demand for Full Stack Developers</h4>
                <p className="text-sm text-muted-foreground">
                  The market shows a 15% increase in job postings for Full Stack Developers over the past 6 months, with
                  particularly strong demand in Fintech and Healthtech sectors.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-full bg-green-100 p-1">
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium">Salary trends are positive</h4>
                <p className="text-sm text-muted-foreground">
                  Average salaries have increased by 8% year-over-year, with experienced developers commanding premium
                  rates, especially those with cloud and containerization skills.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-full bg-amber-100 p-1">
                <TrendingUp className="h-4 w-4 text-amber-600" />
              </div>
              <div>
                <h4 className="font-medium">Remote work opportunities expanding</h4>
                <p className="text-sm text-muted-foreground">
                  Remote job postings have increased by 25%, though many companies are adopting hybrid models that
                  require some in-office presence.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
