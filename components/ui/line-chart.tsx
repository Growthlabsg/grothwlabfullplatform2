"use client"

import { Line, LineChart as RechartsLineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface LineChartProps {
  title?: string
  description?: string
  data: any
  className?: string
  showCard?: boolean
}

export function LineChart({ title, description, data, className, showCard = false }: LineChartProps) {
  const chart = (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart
        data={(data.datasets[0] ? data.datasets[0].data : undefined)?.map((value: number, index: number) => ({
          name: data.labels[index],
          value,
        }))}
        margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
      >
        <XAxis dataKey="name" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">{(payload[0] ? payload[0].payload : undefined).name}</span>
                      <span className="font-bold text-muted-foreground">{(payload[0] ? payload[0].value : undefined)}</span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={{ r: 4, strokeWidth: 2 }}
          activeDot={{ r: 6, strokeWidth: 2 }}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  )

  if (!showCard) {
    return chart
  }

  return (
    <Card className={className}>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>{chart}</CardContent>
    </Card>
  )
}
