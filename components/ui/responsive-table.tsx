"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { useResponsive } from "@/hooks/use-responsive"
import { ChevronDown, ChevronUp } from "lucide-react"

interface Column<T> {
  header: string
  accessorKey: keyof T
  cell?: (item: T) => React.ReactNode
  className?: string
}

interface ResponsiveTableProps<T> {
  data: T[]
  columns: Column<T>[]
  className?: string
  rowClassName?: string
  keyField: keyof T
  emptyMessage?: string
}

export function ResponsiveTable<T>({
  data,
  columns,
  className,
  rowClassName,
  keyField,
  emptyMessage = "No data available",
}: ResponsiveTableProps<T>) {
  const { isMobile } = useResponsive()
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({})

  const toggleRow = (key: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  if (data.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">{emptyMessage}</div>
  }

  // Mobile card view
  if (isMobile) {
    return (
      <div className={cn("space-y-4", className)}>
        {data.map((item) => {
          const key = String(item[keyField])
          const isExpanded = expandedRows[key]

          return (
            <div key={key} className={cn("border rounded-lg overflow-hidden bg-card", rowClassName)}>
              <div className="p-4 flex justify-between items-center cursor-pointer" onClick={() => toggleRow(key)}>
                <div className="font-medium">
                  {/* Display the first column value as the card title */}
                  {(columns[0] ? columns[0].cell : undefined) ? (columns[0] ? columns[0].cell : undefined)(item) : String(item[(columns[0] ? columns[0].accessorKey : undefined)])}
                </div>
                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>

              {isExpanded && (
                <div className="border-t p-4 space-y-2">
                  {columns.slice(1).map((column) => (
                    <div key={String(column.accessorKey)} className="grid grid-cols-2 gap-2">
                      <div className="text-sm font-medium text-muted-foreground">{column.header}</div>
                      <div className="text-sm">
                        {column.cell ? column.cell(item) : String(item[column.accessorKey])}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  // Desktop table view
  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            {columns.map((column) => (
              <th
                key={String(column.accessorKey)}
                className={cn("px-4 py-3 text-left text-sm font-medium text-muted-foreground", column.className)}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={String(item[keyField])}
              className={cn("border-b hover:bg-muted/50 transition-colors", rowClassName)}
            >
              {columns.map((column) => (
                <td key={String(column.accessorKey)} className={cn("px-4 py-3 text-sm", column.className)}>
                  {column.cell ? column.cell(item) : String(item[column.accessorKey])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
