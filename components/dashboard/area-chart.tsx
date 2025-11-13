"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface AreaChartProps {
  title: string
  description?: string
  data: Array<{ name: string; value: number }>
  className?: string
  valuePrefix?: string
  valueSuffix?: string
  color?: string
}

export function AreaChart({
  title,
  description,
  data,
  className,
  valuePrefix = "",
  valueSuffix = "",
  color = "#0F7377",
}: AreaChartProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 0,
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
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            {(payload[0] ? payload[0].payload : undefined).name}
                          </span>
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
            <Line
              type="monotone"
              dataKey="value"
              strokeWidth={2}
              activeDot={{
                r: 6,
                style: { fill: color, opacity: 0.8 },
              }}
              stroke={color}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
