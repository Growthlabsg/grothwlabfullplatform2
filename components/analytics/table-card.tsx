"use client"

import type React from "react"

import { AnalyticsCard } from "./analytics-card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Column {
  key: string
  header: string
  cell?: (row: any) => React.ReactNode
}

interface TableCardProps {
  title: string
  description?: string
  tooltip?: string
  data: any[]
  columns: Column[]
  isLoading?: boolean
  className?: string
  emptyState?: React.ReactNode
}

export function TableCard({
  title,
  description,
  tooltip,
  data,
  columns,
  isLoading = false,
  className,
  emptyState,
}: TableCardProps) {
  return (
    <AnalyticsCard
      title={title}
      description={description}
      tooltip={tooltip}
      isLoading={isLoading}
      className={className}
    >
      {data.length === 0 && emptyState ? (
        emptyState
      ) : (
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead key={column.key}>{column.header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((column) => (
                    <TableCell key={`${rowIndex}-${column.key}`}>
                      {column.cell ? column.cell(row) : row[column.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </AnalyticsCard>
  )
}
