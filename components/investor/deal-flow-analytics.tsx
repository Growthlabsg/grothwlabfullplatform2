"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface DealFlowAnalyticsProps {
  className?: string
}

export function DealFlowAnalytics({ className }: DealFlowAnalyticsProps) {
  const monthlyData = [
    { name: "Jan", deals: 12, closed: 2 },
    { name: "Feb", deals: 18, closed: 3 },
    { name: "Mar", deals: 15, closed: 2 },
    { name: "Apr", deals: 22, closed: 4 },
    { name: "May", deals: 28, closed: 5 },
    { name: "Jun", deals: 24, closed: 3 },
  ]

  const industryData = [
    { name: "FinTech", deals: 24, closed: 5 },
    { name: "HealthTech", deals: 18, closed: 3 },
    { name: "EdTech", deals: 12, closed: 2 },
    { name: "SaaS", deals: 30, closed: 6 },
    { name: "AI/ML", deals: 22, closed: 4 },
    { name: "E-commerce", deals: 15, closed: 2 },
  ]

  const stageData = [
    { name: "Pre-Seed", deals: 35, closed: 4 },
    { name: "Seed", deals: 42, closed: 8 },
    { name: "Series A", deals: 18, closed: 3 },
    { name: "Series B", deals: 8, closed: 1 },
    { name: "Series C", deals: 3, closed: 0 },
  ]

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Deal Flow Analytics</CardTitle>
        <CardDescription>Analyze your deal flow by time, industry, and stage</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="monthly" className="w-full">
          <TabsList className="mb-4 w-full justify-start">
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="industry">By Industry</TabsTrigger>
            <TabsTrigger value="stage">By Stage</TabsTrigger>
          </TabsList>

          <TabsContent value="monthly" className="mt-0">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={monthlyData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="deals" name="Total Deals" fill="#0F7377" />
                <Bar dataKey="closed" name="Closed Deals" fill="#F59E0B" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="industry" className="mt-0">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={industryData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="deals" name="Total Deals" fill="#0F7377" />
                <Bar dataKey="closed" name="Closed Deals" fill="#F59E0B" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="stage" className="mt-0">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={stageData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="deals" name="Total Deals" fill="#0F7377" />
                <Bar dataKey="closed" name="Closed Deals" fill="#F59E0B" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
