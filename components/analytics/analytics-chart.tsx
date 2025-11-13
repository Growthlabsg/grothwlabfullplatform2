"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart } from "@/components/dashboard/area-chart"
import { BarChartComponent } from "@/components/dashboard/bar-chart"
import { PieChartContainer, PieChartContent, PieChartItem } from "@/components/ui/pie-chart"
import type { AnalyticsChartData } from "@/lib/analytics-service"

interface AnalyticsChartProps {
  chart: AnalyticsChartData
  className?: string
}

export function AnalyticsChart({ chart, className }: AnalyticsChartProps) {
  // Generate random colors for pie chart
  const generateColors = (count: number) => {
    const colors = []
    for (let i = 0; i < count; i++) {
      colors.push(`hsl(${i * (360 / count)}, 70%, 50%)`)
    }
    return colors
  }

  // Render chart based on type
  const renderChart = () => {
    switch (chart.type) {
      case "area":
        return (
          <AreaChart
            data={chart.data.map((item: any) => ({ name: item.date, value: item.value }))}
            colors={["#0F7377", "#F59E0B"]}
            valueFormatter={(value: any) => `${value}`}
            className="h-[300px]"
          />
        )

      case "bar":
        return (
          <BarChartComponent
            data={chart.data.map((item: any) => ({ name: item.date, value: item.value }))}
            colors={["#0F7377", "#F59E0B", "#10B981"]}
            valueFormatter={(value: any) => `${value}`}
            className="h-[300px]"
          />
        )

      case "pie":
      case "donut":
        return (
          <div className="h-[300px] w-full">
            <PieChartContainer data={chart.data} valueFormatter={(value) => `${value}`} className="h-full">
              {chart.data.map((item: any, index: number) => (
                <PieChartItem
                  key={item.name}
                  value={item.value}
                  color={generateColors(chart.data.length)[index] || "#0F7377"}
                  name={item.name}
                />
              ))}
              <PieChartContent />
            </PieChartContainer>
          </div>
        )

      default:
        return <div>Unsupported chart type</div>
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{chart.name}</CardTitle>
      </CardHeader>
      <CardContent>{renderChart()}</CardContent>
    </Card>
  )
}
