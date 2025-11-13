"use client"

import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface BarChartProps {
  title?: string
  description?: string
  data: Array<{ name: string; value: number }>
  className?: string
  valuePrefix?: string
  valueSuffix?: string
  color?: string
  showCard?: boolean
}

export function BarChart({
  title,
  description,
  data,
  className,
  valuePrefix = "",
  valueSuffix = "",
  color = "#0F7377",
  showCard = true,
}: BarChartProps) {
  const chart = (
    <ResponsiveContainer width="100%" height={240}>
      <RechartsBarChart
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: 10,
          bottom: 20,
        }}
      >
        <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={10} stroke="#888888" fontSize={12} />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          stroke="#888888"
          fontSize={12}
          tickFormatter={(value) => `${valuePrefix}${value}${valueSuffix}`}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">{(payload[0] ? payload[0].payload : undefined).name}</span>
                      <span className="font-bold text-muted-foreground">
                        {valuePrefix}
                        {(payload[0] ? payload[0].value : undefined)}
                        {valueSuffix}
                      </span>
                    </div>
                  </div>
                </div>
              )
            }

            return null
          }}
        />
        <Bar dataKey="value" radius={[4, 4, 0, 0]} fill={color} barSize={30} />
      </RechartsBarChart>
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
