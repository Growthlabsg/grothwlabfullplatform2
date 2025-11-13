"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AreaChart } from "@/components/dashboard/area-chart"
import { BarChartComponent } from "@/components/dashboard/bar-chart"
import { PieChartContainer, PieChartContent, PieChartItem } from "@/components/ui/pie-chart"

interface DataVisualizationProps {
  title: string
  description?: string
  data: any
  type?: "area" | "bar" | "pie" | "multi"
  className?: string
}

export function DataVisualization({ title, description, data, type = "area", className }: DataVisualizationProps) {
  const [chartType, setChartType] = React.useState(type === "multi" ? "area" : type)
  const [timeRange, setTimeRange] = React.useState("30days")

  // Sample data for different chart types
  const areaData = [
    { name: "Jan", value: 100 },
    { name: "Feb", value: 120 },
    { name: "Mar", value: 170 },
    { name: "Apr", value: 180 },
    { name: "May", value: 250 },
    { name: "Jun", value: 300 },
    { name: "Jul", value: 280 },
    { name: "Aug", value: 350 },
  ]

  const barData = [
    { name: "Fintech", value: 35 },
    { name: "Healthtech", value: 25 },
    { name: "Edtech", value: 20 },
    { name: "SaaS", value: 15 },
    { name: "E-commerce", value: 5 },
  ]

  const pieData = [
    { name: "Seed", value: 45 },
    { name: "Series A", value: 30 },
    { name: "Series B", value: 15 },
    { name: "Pre-seed", value: 10 },
  ]

  // Use provided data or fallback to sample data
  const chartData = data || (chartType === "area" ? areaData : chartType === "bar" ? barData : pieData)

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        <div className="flex items-center gap-2">
          {type === "multi" && (
            <Select value={chartType} onValueChange={setChartType}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Chart Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="area">Area Chart</SelectItem>
                <SelectItem value="bar">Bar Chart</SelectItem>
                <SelectItem value="pie">Pie Chart</SelectItem>
              </SelectContent>
            </Select>
          )}
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">Last year</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {chartType === "area" && (
          <AreaChart
            data={chartData}
            categories={["value"]}
            index="name"
            colors={["#0F7377"]}
            valueFormatter={(value) => `${value}`}
            className="h-[300px]"
          />
        )}

        {chartType === "bar" && (
          <BarChartComponent
            data={chartData}
            categories={["value"]}
            index="name"
            colors={["#0F7377"]}
            valueFormatter={(value) => `${value}`}
            className="h-[300px]"
          />
        )}

        {chartType === "pie" && (
          <div className="h-[300px] w-full">
            <PieChartContainer data={chartData} valueFormatter={(value) => `${value}%`} className="h-full">
              {chartData.map((item: any, index: number) => (
                <PieChartItem
                  key={item.name}
                  value={item.value}
                  color={`hsl(${index * 40}, 70%, 50%)`}
                  name={item.name}
                />
              ))}
              <PieChartContent />
            </PieChartContainer>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
