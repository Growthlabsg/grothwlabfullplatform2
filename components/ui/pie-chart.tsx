"use client"

import * as React from "react"
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface PieChartContainerProps {
  data: any[]
  valueFormatter?: (value: number) => string
  children: React.ReactNode
  className?: string
}

interface PieChartItemProps {
  value: number
  color: string
  name: string
}

interface PieChartContentProps {
  showTooltip?: boolean
  showLegend?: boolean
}

const PieChartContext = React.createContext<{
  data: any[]
  items: PieChartItemProps[]
  valueFormatter: (value: number) => string
  addItem: (item: PieChartItemProps) => void
} | null>(null)

export function PieChartContainer({
  data,
  valueFormatter = (value) => `${value}`,
  children,
  className,
}: PieChartContainerProps) {
  const [items, setItems] = React.useState<PieChartItemProps[]>([])

  const addItem = React.useCallback((item: PieChartItemProps) => {
    setItems((prev) => [...prev, item])
  }, [])

  // Reset items when data changes
  React.useEffect(() => {
    setItems([])
  }, [data])

  return (
    <PieChartContext.Provider value={{ data, items, valueFormatter, addItem }}>
      <div className={className}>{children}</div>
    </PieChartContext.Provider>
  )
}

export function PieChartItem({ value, color, name }: PieChartItemProps) {
  const context = React.useContext(PieChartContext)

  React.useEffect(() => {
    if (context) {
      context.addItem({ value, color, name })
    }
  }, [context, value, color, name])

  return null
}

export function PieChartContent({ showTooltip = true, showLegend = true }: PieChartContentProps) {
  const context = React.useContext(PieChartContext)

  if (!context) {
    return null
  }

  const { items, valueFormatter } = context

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-md shadow-md p-2 text-sm">
          <p className="font-medium">{(payload[0] ? payload[0].name : undefined)}</p>
          <p className="text-muted-foreground">{valueFormatter((payload[0] ? payload[0].value : undefined))}</p>
        </div>
      )
    }

    return null
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsPieChart>
        <Pie
          data={items}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={2}
          dataKey="value"
          nameKey="name"
          label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
          labelLine={false}
        >
          {items.map((item, index) => (
            <Cell key={`cell-${index}`} fill={item.color} />
          ))}
        </Pie>
        {showTooltip && <Tooltip content={<CustomTooltip />} />}
        {showLegend && <Legend />}
      </RechartsPieChart>
    </ResponsiveContainer>
  )
}

// Create a composite PieChart component for easier usage
export function PieChart({
  data,
  className = "h-80",
}: {
  data: Array<{ name: string; value: number; color: string }>
  className?: string
}) {
  return (
    <PieChartContainer data={data} className={className}>
      {data.map((item) => (
        <PieChartItem key={item.name} name={item.name} value={item.value} color={item.color} />
      ))}
      <PieChartContent />
    </PieChartContainer>
  )
}
